"use strict";

define(["../Core/BoundingSphere", "../Core/combine", "../Core/defined", "../Core/EasingFunction"], function (h, e, c, a) {
  "use strict";

  function i(i, t, e) {
    this.type = "KmlTourFlyTo", this.blocking = !0, this.activeCamera = null, this.activeCallback = null, this.duration = i, this.view = e, this.flyToMode = t;
  }

  return i.prototype.play = function (t, i, e) {
    var a;
    this.activeCamera = i, c(t) && null !== t && ((a = this).activeCallback = function (i) {
      delete a.activeCallback, delete a.activeCamera, t(!c(i) && i);
    });
    var n,
        o = this.getCameraOptions(e);
    this.view.headingPitchRoll ? i.flyTo(o) : this.view.headingPitchRange && (n = new h(this.view.position), i.flyToBoundingSphere(n, o));
  }, i.prototype.stop = function () {
    c(this.activeCamera) && this.activeCamera.cancelFlight(), c(this.activeCallback) && this.activeCallback(!0);
  }, i.prototype.getCameraOptions = function (i) {
    var t = {
      duration: this.duration
    };
    return c(this.activeCallback) && (t.complete = this.activeCallback), "smooth" === this.flyToMode && (t.easingFunction = a.LINEAR_NONE), this.view.headingPitchRoll ? (t.destination = this.view.position, t.orientation = this.view.headingPitchRoll) : this.view.headingPitchRange && (t.offset = this.view.headingPitchRange), c(i) && (t = e(t, i)), t;
  }, i;
});