"use strict";

define(["./defined", "./defineProperties"], function (t, e) {
  "use strict";

  var s,
      o = {
    requestFullscreen: void 0,
    exitFullscreen: void 0,
    fullscreenEnabled: void 0,
    fullscreenElement: void 0,
    fullscreenchange: void 0,
    fullscreenerror: void 0
  },
      l = {};
  return e(l, {
    element: {
      get: function get() {
        if (l.supportsFullscreen()) return document[o.fullscreenElement];
      }
    },
    changeEventName: {
      get: function get() {
        if (l.supportsFullscreen()) return o.fullscreenchange;
      }
    },
    errorEventName: {
      get: function get() {
        if (l.supportsFullscreen()) return o.fullscreenerror;
      }
    },
    enabled: {
      get: function get() {
        if (l.supportsFullscreen()) return document[o.fullscreenEnabled];
      }
    },
    fullscreen: {
      get: function get() {
        if (l.supportsFullscreen()) return null !== l.element;
      }
    }
  }), l.supportsFullscreen = function () {
    if (t(s)) return s;
    s = !1;
    var e = document.body;
    if ("function" == typeof e.requestFullscreen) return o.requestFullscreen = "requestFullscreen", o.exitFullscreen = "exitFullscreen", o.fullscreenEnabled = "fullscreenEnabled", o.fullscreenElement = "fullscreenElement", o.fullscreenchange = "fullscreenchange", o.fullscreenerror = "fullscreenerror", s = !0;

    for (var n = ["webkit", "moz", "o", "ms", "khtml"], l = 0, r = n.length; l < r; ++l) {
      var u,
          c = n[l];
      "function" != typeof e[u = c + "RequestFullscreen"] && "function" != typeof e[u = c + "RequestFullScreen"] || (o.requestFullscreen = u, s = !0), u = c + "ExitFullscreen", "function" == typeof document[u] ? o.exitFullscreen = u : (u = c + "CancelFullScreen", "function" == typeof document[u] && (o.exitFullscreen = u)), u = c + "FullscreenEnabled", void 0 !== document[u] ? o.fullscreenEnabled = u : (u = c + "FullScreenEnabled", void 0 !== document[u] && (o.fullscreenEnabled = u)), u = c + "FullscreenElement", void 0 !== document[u] ? o.fullscreenElement = u : (u = c + "FullScreenElement", void 0 !== document[u] && (o.fullscreenElement = u)), u = c + "fullscreenchange", void 0 !== document["on" + u] && ("ms" === c && (u = "MSFullscreenChange"), o.fullscreenchange = u), u = c + "fullscreenerror", void 0 !== document["on" + u] && ("ms" === c && (u = "MSFullscreenError"), o.fullscreenerror = u);
    }

    return s;
  }, l.requestFullscreen = function (e, n) {
    l.supportsFullscreen() && e[o.requestFullscreen]({
      vrDisplay: n
    });
  }, l.exitFullscreen = function () {
    l.supportsFullscreen() && document[o.exitFullscreen]();
  }, l;
});