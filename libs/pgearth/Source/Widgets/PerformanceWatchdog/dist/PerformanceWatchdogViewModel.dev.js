"use strict";

define(["../../Core/defaultValue", "../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/DeveloperError", "../../Scene/FrameRateMonitor", "../../ThirdParty/knockout", "../createCommand"], function (a, r, e, s, i, o, n, m) {
  "use strict";

  function t(e) {
    if (!r(e) || !r(e.scene)) throw new i("options.scene is required.");
    this._scene = e.scene, this.lowFrameRateMessage = a(e.lowFrameRateMessage, "This application appears to be performing poorly on your system.  Please try using a different web browser or updating your video drivers."), this.lowFrameRateMessageDismissed = !1, this.showingLowFrameRateMessage = !1, n.track(this, ["lowFrameRateMessage", "lowFrameRateMessageDismissed", "showingLowFrameRateMessage"]);
    var s = this;
    this._dismissMessage = m(function () {
      s.showingLowFrameRateMessage = !1, s.lowFrameRateMessageDismissed = !0;
    });
    var t = o.fromScene(e.scene);
    this._unsubscribeLowFrameRate = t.lowFrameRate.addEventListener(function () {
      s.lowFrameRateMessageDismissed || (s.showingLowFrameRateMessage = !0);
    }), this._unsubscribeNominalFrameRate = t.nominalFrameRate.addEventListener(function () {
      s.showingLowFrameRateMessage = !1;
    });
  }

  return e(t.prototype, {
    scene: {
      get: function get() {
        return this._scene;
      }
    },
    dismissMessage: {
      get: function get() {
        return this._dismissMessage;
      }
    }
  }), t.prototype.destroy = function () {
    return this._unsubscribeLowFrameRate(), this._unsubscribeNominalFrameRate(), s(this);
  }, t;
});