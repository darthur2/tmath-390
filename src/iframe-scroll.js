(function () {
  "use strict";

  if (window.self === window.top) {
    return;
  }

  var storageKey =
    "tmath390:iframe-scroll:" +
    window.location.pathname +
    window.location.search;
  var maxAge = 2 * 60 * 60 * 1000;
  var saveDelay = 100;
  var saveTimer = null;
  var userInteracted = false;

  function readStored() {
    try {
      var sessionValue = window.sessionStorage.getItem(storageKey);
      if (sessionValue) {
        return JSON.parse(sessionValue);
      }
    } catch (error) {}

    try {
      var localValue = window.localStorage.getItem(storageKey);
      if (localValue) {
        return JSON.parse(localValue);
      }
    } catch (error) {}

    try {
      var namedValue = window.name && JSON.parse(window.name);
      if (namedValue && namedValue.key === storageKey) {
        return namedValue;
      }
    } catch (error) {}

    return null;
  }

  function writeStored(value) {
    try {
      window.sessionStorage.setItem(storageKey, value);
      return;
    } catch (error) {}

    try {
      window.localStorage.setItem(storageKey, value);
      return;
    } catch (error) {}

    try {
      if (!window.name || window.name.indexOf('{"key":"tmath390:') === 0) {
        window.name = value;
      }
    } catch (error) {}
  }

  function save() {
    writeStored(
      JSON.stringify({
        key: storageKey,
        y: window.scrollY || window.pageYOffset || 0,
        t: Date.now()
      })
    );
  }

  function scheduleSave() {
    if (saveTimer !== null) {
      return;
    }

    saveTimer = window.setTimeout(function () {
      saveTimer = null;
      save();
    }, saveDelay);
  }

  function restore() {
    if (userInteracted) {
      return;
    }

    var stored = readStored();
    if (!stored || stored.key !== storageKey) {
      return;
    }
    if (!isFinite(stored.y) || stored.y < 0) {
      return;
    }
    if (Date.now() - stored.t > maxAge) {
      return;
    }
    if (Math.abs(window.scrollY - stored.y) < 2) {
      return;
    }

    window.scrollTo(0, stored.y);
  }

  function restoreAfterLayout() {
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(restore);
    });
    window.setTimeout(restore, 250);
    window.setTimeout(restore, 750);
  }

  function restoreWhenMathJaxIsReady() {
    var attempts = 0;

    function check() {
      if (window.MathJax && window.MathJax.Hub && window.MathJax.Hub.Queue) {
        window.MathJax.Hub.Queue(restore);
        return;
      }
      if (attempts < 40) {
        attempts += 1;
        window.setTimeout(check, 250);
      }
    }

    check();
  }

  function markInteraction() {
    userInteracted = true;
  }

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  window.addEventListener("scroll", scheduleSave, { passive: true });
  window.addEventListener("wheel", markInteraction, { passive: true });
  window.addEventListener("touchmove", markInteraction, { passive: true });
  window.addEventListener("pointerdown", markInteraction);
  window.addEventListener("keydown", markInteraction);
  window.addEventListener("pagehide", save);
  window.addEventListener("beforeunload", save);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      save();
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", restoreAfterLayout);
  } else {
    restoreAfterLayout();
  }

  window.addEventListener("load", restoreAfterLayout);
  restoreWhenMathJaxIsReady();
})();
