"use strict";

define(["../../Core/defaultValue", "../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/DeveloperError", "../../Core/EventHelper", "../../Core/Fullscreen", "../../Core/OrthographicFrustum", "../../ThirdParty/knockout", "../../ThirdParty/NoSleep", "../createCommand", "../getElement"], function (l, c, e, t, s, a, d, u, m, h, f, v) {
  "use strict";

  function k() {
    var e = window.screen;
    c(e) && (c(e.unlockOrientation) ? e.unlockOrientation() : c(e.mozUnlockOrientation) ? e.mozUnlockOrientation() : c(e.msUnlockOrientation) ? e.msUnlockOrientation() : c(e.orientation && e.orientation.unlock) && e.orientation.unlock());
  }

  function p(e, t, n, o) {
    var i, r, l;
    o() || (n() ? (t.useWebVR = !1, e._locked && (k(), e._locked = !1), e._noSleep.disable(), d.exitFullscreen(), n(!1)) : (d.fullscreen || d.requestFullscreen(e._vrElement), e._noSleep.enable(), e._locked || (e._locked = (r = !(i = "landscape"), l = window.screen, c(l) && (c(l.lockOrientation) ? r = l.lockOrientation(i) : c(l.mozLockOrientation) ? r = l.mozLockOrientation(i) : c(l.msLockOrientation) ? r = l.msLockOrientation(i) : c(l.orientation && l.orientation.lock) && (r = l.orientation.lock(i))), r)), n(t.useWebVR = !0)));
  }

  function n(e, t) {
    if (!c(e)) throw new s("scene is required.");
    var n = this,
        o = m.observable(d.enabled),
        i = m.observable(!1);
    this.isVRMode = void 0, m.defineProperty(this, "isVRMode", {
      get: function get() {
        return i();
      }
    }), this.isVREnabled = void 0, m.defineProperty(this, "isVREnabled", {
      get: function get() {
        return o();
      },
      set: function set(e) {
        o(e && d.enabled);
      }
    }), this.tooltip = void 0, m.defineProperty(this, "tooltip", function () {
      return o() ? i() ? "Exit VR mode" : "Enter VR mode" : "VR mode is unavailable";
    });
    var r = m.observable(!1);
    this._isOrthographic = void 0, m.defineProperty(this, "_isOrthographic", {
      get: function get() {
        return r();
      }
    }), this._eventHelper = new a(), this._eventHelper.add(e.preRender, function () {
      r(e.camera.frustum instanceof u);
    }), this._locked = !1, this._noSleep = new h(), this._command = f(function () {
      p(n, e, i, r);
    }, m.getObservable(this, "isVREnabled")), this._vrElement = l(v(t), document.body), this._callback = function () {
      !d.fullscreen && i() && (e.useWebVR = !1, n._locked && (k(), n._locked = !1), n._noSleep.disable(), i(!1));
    }, document.addEventListener(d.changeEventName, this._callback);
  }

  return e(n.prototype, {
    vrElement: {
      get: function get() {
        return this._vrElement;
      },
      set: function set(e) {
        if (!(e instanceof Element)) throw new s("value must be a valid Element.");
        this._vrElement = e;
      }
    },
    command: {
      get: function get() {
        return this._command;
      }
    }
  }), n.prototype.isDestroyed = function () {
    return !1;
  }, n.prototype.destroy = function () {
    this._eventHelper.removeAll(), document.removeEventListener(d.changeEventName, this._callback), t(this);
  }, n;
});