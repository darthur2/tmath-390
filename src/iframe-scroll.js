(function () {
  "use strict";

  if (window.self === window.top) {
    return;
  }

  var storageKey =
    "tmath390:iframe-scroll:" +
    window.location.pathname +
    window.location.search;
  var hashPrefix = "#tmath390-scroll=";
  var maxAge = 2 * 60 * 60 * 1000;
  var saveDelay = 100;
  var guardDelay = 750;
  var saveTimer = null;
  var lastGoodY = 0;
  var lastUserInputAt = 0;
  var userInteracted = false;

  function readHashY() {
    var match = window.location.hash.match(/^#tmath390-scroll=(\d+)$/);
    if (!match) {
      return null;
    }

    var value = parseInt(match[1], 10);
    return isFinite(value) && value >= 0 ? value : null;
  }

  function readStored() {
    var sessionValue = null;
    var localValue = null;
    var namedValue = null;

    try {
      sessionValue = window.sessionStorage.getItem(storageKey);
    } catch (error) {}

    try {
      localValue = window.localStorage.getItem(storageKey);
    } catch (error) {}

    try {
      namedValue = window.name && JSON.parse(window.name);
    } catch (error) {}

    var candidates = [sessionValue, localValue];

    for (var i = 0; i < candidates.length; i += 1) {
      if (!candidates[i]) {
        continue;
      }
      try {
        var parsed = JSON.parse(candidates[i]);
        if (parsed && parsed.key === storageKey) {
          return parsed;
        }
      } catch (error) {}
    }

    if (namedValue && namedValue.key === storageKey) {
      return namedValue;
    }

    var hashY = readHashY();
    if (hashY !== null) {
      return { key: storageKey, y: hashY, t: Date.now() };
    }

    return null;
  }

  function writeHashY(y) {
    var hash = hashPrefix + Math.round(y);

    try {
      if (window.location.hash !== hash) {
        window.history.replaceState(null, "", hash);
      }
    } catch (error) {}
  }

  function writeStored(y) {
    var value = JSON.stringify({
      key: storageKey,
      y: Math.round(y),
      t: Date.now()
    });

    try {
      window.sessionStorage.setItem(storageKey, value);
    } catch (error) {}

    try {
      window.localStorage.setItem(storageKey, value);
    } catch (error) {}

    try {
      window.name = value;
    } catch (error) {}

    writeHashY(y);
  }

  function savedPosition() {
    if (lastGoodY > 0) {
      return lastGoodY;
    }

    var stored = readStored();
    if (stored && stored.key === storageKey) {
      return stored.y;
    }

    return 0;
  }

  function save() {
    writeStored(savedPosition());
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

  function isUserInputRecent() {
    return Date.now() - lastUserInputAt < guardDelay;
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
    if (stored.t && Date.now() - stored.t > maxAge) {
      return;
    }

    lastGoodY = stored.y;

    if (Math.abs(window.scrollY - stored.y) >= 2) {
      window.scrollTo(0, stored.y);
    }
  }

  function restoreAfterLayout() {
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(restore);
    });
    window.setTimeout(restore, 300);
    window.setTimeout(restore, 1000);
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
    lastUserInputAt = Date.now();
  }

  function handleScroll() {
    var y = window.scrollY || window.pageYOffset || 0;

    if (
      y < 1 &&
      lastGoodY > 80 &&
      !isUserInputRecent()
    ) {
      window.scrollTo(0, lastGoodY);
      return;
    }

    lastGoodY = y;
    scheduleSave();
  }

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  var initialStored = readStored();
  if (
    initialStored &&
    initialStored.key === storageKey &&
    isFinite(initialStored.y) &&
    initialStored.y >= 0
  ) {
    lastGoodY = initialStored.y;
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
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
