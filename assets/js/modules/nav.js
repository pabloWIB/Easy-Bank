/**
 * nav.js — sticky header behaviour and the mobile menu.
 * Registers on the shared EasyBank namespace; main.js is the entry point.
 */
(function (namespace) {
  "use strict";

  var DESKTOP_QUERY = "(min-width: 768px)";
  var COMPACT_OFFSET = 110;

  /** Shrinks the header once the page has scrolled past the hero edge. */
  function initHeaderScroll(header) {
    var ticking = false;

    var update = function () {
      header.classList.toggle("is-compact", window.scrollY > COMPACT_OFFSET);
      ticking = false;
    };

    var onScroll = function () {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
  }

  /** Wires the burger button to the overlay menu. */
  function initMobileMenu(toggle, menu) {
    var root = document.documentElement;
    var desktop = window.matchMedia(DESKTOP_QUERY);

    var isOpen = function () {
      return toggle.getAttribute("aria-expanded") === "true";
    };

    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.setAttribute("aria-hidden", String(!open));
      menu.classList.toggle("is-open", open);
      root.classList.toggle("has-menu-open", open);
    };

    toggle.addEventListener("click", function () {
      setOpen(!isOpen());
    });

    // Delegated: closes on any link inside the panel, and on the backdrop.
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a") || event.target === menu) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    if (typeof desktop.addEventListener === "function") {
      desktop.addEventListener("change", function (event) {
        if (event.matches && isOpen()) {
          setOpen(false);
        }
      });
    }

    setOpen(false);
  }

  namespace.initNav = function () {
    var header = document.querySelector("[data-site-header]");
    var toggle = document.querySelector("[data-nav-toggle]");
    var menu = document.querySelector("[data-mobile-menu]");

    if (header) {
      initHeaderScroll(header);
    }

    if (toggle && menu) {
      initMobileMenu(toggle, menu);
    }
  };
})((window.EasyBank = window.EasyBank || {}));
