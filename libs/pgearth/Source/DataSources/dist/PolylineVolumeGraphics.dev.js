"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "./createMaterialPropertyDescriptor", "./createPropertyDescriptor"], function (t, o, i, s, e, n, h) {
  "use strict";

  function r(i) {
    this._show = void 0, this._showSubscription = void 0, this._material = void 0, this._materialSubscription = void 0, this._positions = void 0, this._positionsSubscription = void 0, this._shape = void 0, this._shapeSubscription = void 0, this._granularity = void 0, this._granularitySubscription = void 0, this._cornerType = void 0, this._cornerTypeSubscription = void 0, this._fill = void 0, this._fillSubscription = void 0, this._outline = void 0, this._outlineSubscription = void 0, this._outlineColor = void 0, this._outlineColorSubscription = void 0, this._outlineWidth = void 0, this._outlineWidthSubscription = void 0, this._shadows = void 0, this._shadowsSubscription = void 0, this._distanceDisplayCondition = void 0, this._distanceDisplayConditionSubsription = void 0, this._definitionChanged = new e(), this.merge(t(i, t.EMPTY_OBJECT));
  }

  return i(r.prototype, {
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    show: h("show"),
    material: n("material"),
    positions: h("positions"),
    shape: h("shape"),
    granularity: h("granularity"),
    fill: h("fill"),
    outline: h("outline"),
    outlineColor: h("outlineColor"),
    outlineWidth: h("outlineWidth"),
    cornerType: h("cornerType"),
    shadows: h("shadows"),
    distanceDisplayCondition: h("distanceDisplayCondition")
  }), r.prototype.clone = function (i) {
    return o(i) ? (i.show = this.show, i.material = this.material, i.positions = this.positions, i.shape = this.shape, i.granularity = this.granularity, i.fill = this.fill, i.outline = this.outline, i.outlineColor = this.outlineColor, i.outlineWidth = this.outlineWidth, i.cornerType = this.cornerType, i.shadows = this.shadows, i.distanceDisplayCondition = this.distanceDisplayCondition, i) : new r(this);
  }, r.prototype.merge = function (i) {
    if (!o(i)) throw new s("source is required.");
    this.show = t(this.show, i.show), this.material = t(this.material, i.material), this.positions = t(this.positions, i.positions), this.shape = t(this.shape, i.shape), this.granularity = t(this.granularity, i.granularity), this.fill = t(this.fill, i.fill), this.outline = t(this.outline, i.outline), this.outlineColor = t(this.outlineColor, i.outlineColor), this.outlineWidth = t(this.outlineWidth, i.outlineWidth), this.cornerType = t(this.cornerType, i.cornerType), this.shadows = t(this.shadows, i.shadows), this.distanceDisplayCondition = t(this.distanceDisplayCondition, i.distanceDisplayCondition);
  }, r;
});