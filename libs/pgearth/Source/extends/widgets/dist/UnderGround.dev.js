"use strict";

define(["../../Core/defined", "../../Core/DeveloperError", "../../Core/clone", "../../Core/defaultValue", "../core/ExpendUtil"], function (s, a, t, i, h) {
  function e(t, e) {
    if (!s(t)) throw new a("viewer is required.");
    this._viewer = t;
    var r = i(e, {});
    this._depth = i(r.depth, 500), this._alpha = i(r.alpha, .5), this.enable = i(r.enable, !1), this.cameraZoom = function () {
      var e = t.scene.camera.pitch;
      t.scene.screenSpaceCameraController.enableZoom = !(0 < e);
    };
  }

  return e.prototype._updateImageryLayersAlpha = function (e) {
    if (h.underEarth.enable) for (var t = this._viewer.imageryLayers._layers, r = 0, s = t.length; r < s; r++) {
      t[r].alpha = e;
    }
  }, e.prototype._historyOpts = function () {
    var e = {};
    e.alpha = t(this._viewer.imageryLayers._layers[0] && this._viewer.imageryLayers._layers[0].alpha), e.highDynamicRange = t(this._viewer.scene.highDynamicRange), e.skyShow = t(this._viewer.scene.skyAtmosphere.show), e.skyBoxShow = t(this._viewer.scene.skyBox.show), e.depthTest = t(this._viewer.scene.globe.depthTestAgainstTerrain), this._viewer.scene.globe._surface && this._viewer.scene.globe._surface._tileProvider && this._viewer.scene.globe._surface._tileProvider._renderState && (e.blending = t(this._viewer.scene.globe._surface._tileProvider._renderState.blending)), this._oldViewOpts = e;
  }, e.prototype.activate = function () {
    var e;
    this._enable || (this._enable = !0, this._historyOpts(), e = this._viewer, h.underEarth.cullFace = !1, h.underEarth.enable = !0, h.underEarth.enableDepth = this._depth, h.underEarth.enableSkirt = !0, e.scene.globe.depthTestAgainstTerrain = !0, e.scene.highDynamicRange = !1, e.scene.skyAtmosphere.show = !1, e.scene.skyBox.show = !1, this._updateImageryLayersAlpha(this._alpha), viewer.scene.camera.changed.addEventListener(this.cameraZoom));
  }, e.prototype.disable = function () {
    var e;
    this._enable && (this._enable = !1, this._updateImageryLayersAlpha(this._oldViewOpts.alpha), e = this._viewer, h.underEarth.cullFace = void 0, h.underEarth.enable = !1, h.underEarth.enableDepth = 0, h.underEarth.enableSkirt = !1, e.scene.globe.depthTestAgainstTerrain = this._oldViewOpts.depthTest, e.scene.skyBox.show = this._oldViewOpts.skyBoxShow, e.scene.highDynamicRange = this._oldViewOpts.highDynamicRange, e.scene.skyAtmosphere.show = this._oldViewOpts.skyShow, e.scene.camera.changed.removeEventListener(this.cameraZoom));
  }, e.prototype.destroy = function () {
    this._viewer.scene.camera.changed.removeEventListener(this.cameraZoom), delete this._viewer, delete this._alpha, delete this._depth, delete this._enable, delete this._oldViewOpts, delete this.cameraZoom;
  }, e;
});