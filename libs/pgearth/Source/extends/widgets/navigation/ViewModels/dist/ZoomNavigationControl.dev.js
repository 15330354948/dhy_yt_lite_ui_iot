"use strict";

define(["../../../../Core/defined", "../../../../Core/Ray", "../../../../Core/IntersectionTests", "../../../../Core/Cartesian3", "../../../../Scene/SceneMode", "./NavigationControl", "../Core/Utils"], function (h, p, d, u, C, i, m) {
  "use strict";

  function t(t, e) {
    i.apply(this, arguments), this.name = e ? "放大" : "缩小", this.svgColor = "#000", this.text = e ? "+" : "-", this.cssClass = "navigation-control-icon-zoom-" + (e ? "in" : "out"), this.relativeAmount = 2, e && (this.relativeAmount = 1 / this.relativeAmount);
  }

  t.prototype.relativeAmount = 1, (t.prototype = Object.create(i.prototype)).activate = function () {
    this.zoom(this.relativeAmount);
  };
  var v = new u();
  return t.prototype.zoom = function (t) {
    if (this.isActive = !0, h(this.terria)) {
      var e = this.terria.scene,
          i = e.screenSpaceCameraController;
      if (!i.enableInputs || !i.enableZoom) return;
      var o,
          r,
          a,
          n = e.camera;

      switch (e.mode) {
        case C.MORPHING:
          break;

        case C.SCENE2D:
          n.zoomIn(n.positionCartographic.height * (1 - this.relativeAmount));
          break;

        default:
          r = h(this.terria.trackedEntity) ? new u() : m.getCameraFocus(this.terria, !1), a = h(r) ? {
            direction: n.direction,
            up: n.up
          } : (o = new p(n.worldToCameraCoordinatesPoint(e.globe.ellipsoid.cartographicToCartesian(n.positionCartographic)), n.directionWC), r = d.grazingAltitudeLocation(o, e.globe.ellipsoid), {
            heading: n.heading,
            pitch: n.pitch,
            roll: n.roll
          });
          var s = u.subtract(n.position, r, v),
              c = u.multiplyByScalar(s, t, s),
              l = u.add(r, c, r);
          h(this.terria.trackedEntity) || e.mode == C.COLUMBUS_VIEW ? n.position = l : n.flyTo({
            destination: l,
            orientation: a,
            duration: .5,
            convert: !1
          });
      }
    }

    this.isActive = !1;
  }, t;
});