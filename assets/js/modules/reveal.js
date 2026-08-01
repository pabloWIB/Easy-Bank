/**
 * reveal.js — fades sections in as they enter the viewport.
 * Replaces the previous per-section scroll handlers with one IntersectionObserver.
 */
(function (namespace) {
  "use strict";

  var OPTIONS = {
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.1
  };

  var show = function (element) {
    element.classList.add("is-visible");
  };

  namespace.initReveal = function () {
    var targets = document.querySelectorAll("[data-reveal]");

    if (!targets.length) {
      return;
    }

    // Without observer support every section is shown straight away.
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(targets, show);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }
        show(entry.target);
        observer.unobserve(entry.target);
      });
    }, OPTIONS);

    Array.prototype.forEach.call(targets, function (element) {
      observer.observe(element);
    });
  };
})((window.EasyBank = window.EasyBank || {}));
