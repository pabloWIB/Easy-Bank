/**
 * main.js — single entry point.
 * Loaded after assets/js/modules/*.js, which register onto the EasyBank namespace.
 */
(function (namespace) {
  "use strict";

  function start() {
    if (typeof namespace.initNav === "function") {
      namespace.initNav();
    }

    if (typeof namespace.initReveal === "function") {
      namespace.initReveal();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})((window.EasyBank = window.EasyBank || {}));
