"use strict";

define(["../../Core/defaultValue", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/DeveloperError", "../../Core/Fullscreen", "../../ThirdParty/knockout", "../createCommand", "../getElement"], function (r, e, t, n, s, i, o, c) {
  "use strict";

  function l(e) {
    var t = this,
        n = i.observable(s.fullscreen),
        l = i.observable(s.enabled);
    this.isFullscreen = void 0, i.defineProperty(this, "isFullscreen", {
      get: function get() {
        return n();
      }
    }), this.isFullscreenEnabled = void 0, i.defineProperty(this, "isFullscreenEnabled", {
      get: function get() {
        return l();
      },
      set: function set(e) {
        l(e && s.enabled);
      }
    }), this.tooltip = void 0, i.defineProperty(this, "tooltip", function () {
      return this.isFullscreenEnabled ? n() ? "Exit full screen" : "Full screen" : "Full screen unavailable";
    }), this._command = o(function () {
      s.fullscreen ? s.exitFullscreen() : s.requestFullscreen(t._fullscreenElement);
    }, i.getObservable(this, "isFullscreenEnabled")), this._fullscreenElement = r(c(e), document.body), this._callback = function () {
      n(s.fullscreen);
    }, document.addEventListener(s.changeEventName, this._callback);
  }

  return e(l.prototype, {
    fullscreenElement: {
      get: function get() {
        return this._fullscreenElement;
      },
      set: function set(e) {
        if (!(e instanceof Element)) throw new n("value must be a valid Element.");
        this._fullscreenElement = e;
      }
    },
    command: {
      get: function get() {
        return this._command;
      }
    }
  }), l.prototype.isDestroyed = function () {
    return !1;
  }, l.prototype.destroy = function () {
    document.removeEventListener(s.changeEventName, this._callback), t(this);
  }, l;
});