"use strict";

define(["../Core/ArcType", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "./createMaterialPropertyDescriptor", "./createPropertyDescriptor"], function (i, t, s, o, a, e, n, r) {
  "use strict";

  function h(i) {
    this._show = void 0, this._showSubscription = void 0, this._material = void 0, this._materialSubscription = void 0, this._depthFailMaterial = void 0, this._depthFailMaterialSubscription = void 0, this._positions = void 0, this._positionsSubscription = void 0, this._arcType = void 0, this._arcTypeSubscription = void 0, this._clampToGround = void 0, this._clampToGroundSubscription = void 0, this._granularity = void 0, this._granularitySubscription = void 0, this._widthSubscription = void 0, this._width = void 0, this._widthSubscription = void 0, this._shadows = void 0, this._shadowsSubscription = void 0, this._distanceDisplayCondition = void 0, this._distanceDisplayConditionSubscription = void 0, this._classificationType = void 0, this._classificationTypeSubscription = void 0, this._zIndex = void 0, this._zIndexSubscription = void 0, this._definitionChanged = new e(), this.merge(t(i, t.EMPTY_OBJECT));
  }

  return o(h.prototype, {
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    show: r("show"),
    material: n("material"),
    depthFailMaterial: n("depthFailMaterial"),
    positions: r("positions"),
    width: r("width"),
    arcType: r("arcType"),
    clampToGround: r("clampToGround"),
    granularity: r("granularity"),
    shadows: r("shadows"),
    distanceDisplayCondition: r("distanceDisplayCondition"),
    classificationType: r("classificationType"),
    zIndex: r("zIndex")
  }), h.prototype.clone = function (i) {
    return s(i) ? (i.show = this.show, i.material = this.material, i.depthFailMaterial = this.depthFailMaterial, i.positions = this.positions, i.width = this.width, i.arcType = this.arcType, i.clampToGround = this.clampToGround, i.granularity = this.granularity, i.shadows = this.shadows, i.distanceDisplayCondition = this.distanceDisplayCondition, i.classificationType = this.classificationType, i.zIndex = this.zIndex, i) : new h(this);
  }, h.prototype.merge = function (i) {
    if (!s(i)) throw new a("source is required.");
    this.show = t(this.show, i.show), this.material = t(this.material, i.material), this.depthFailMaterial = t(this.depthFailMaterial, i.depthFailMaterial), this.positions = t(this.positions, i.positions), this.width = t(this.width, i.width), this.arcType = t(this.arcType, i.arcType), this.clampToGround = t(this.clampToGround, i.clampToGround), this.granularity = t(this.granularity, i.granularity), this.shadows = t(this.shadows, i.shadows), this.distanceDisplayCondition = t(this.distanceDisplayCondition, i.distanceDisplayCondition), this.classificationType = t(this.classificationType, i.classificationType), this.zIndex = t(this.zIndex, i.zIndex);
  }, h;
});