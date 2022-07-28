"use strict";

define(["../../../Core/Cartesian4", "../../../Core/Cartesian3", "../../../Core/Cartesian2", "../../../Core/Ray", "../../../Core/defined", "../../../Core/Ellipsoid", "../../../Scene/PGEarth3DTileset"], function (e, i, n, r, s, t, o) {
  var c = new i();

  function a(e) {
    this.viewer = e, this.scene = e.scene;
  }

  return a.prototype.pickGlobe = function (e, i, n) {
    var r = this.viewer.scene.camera.getPickRay(e),
        s = this.viewer.scene.globe.pick(r, this.viewer.scene),
        t = this.scene.pickPosition(e);
    this.scene.pick(e);
    return this.viewer.scene.pickPositionSupported && this.viewer.scene.pickPositionWorldCoordinates(e, c), t || s;
  }, a;
});