"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "./createMaterialPropertyDescriptor", "./createPropertyDescriptor"], function (t, o, i, s, n, e, h) {
  "use strict";

  function l(i) {
    this._show = void 0, this._showSubscription = void 0, this._material = void 0, this._materialSubscription = void 0, this._positions = void 0, this._positionsSubscription = void 0, this._minimumHeights = void 0, this._minimumHeightsSubscription = void 0, this._maximumHeights = void 0, this._maximumHeightsSubscription = void 0, this._granularity = void 0, this._granularitySubscription = void 0, this._fill = void 0, this._fillSubscription = void 0, this._outline = void 0, this._outlineSubscription = void 0, this._outlineColor = void 0, this._outlineColorSubscription = void 0, this._outlineWidth = void 0, this._outlineWidthSubscription = void 0, this._shadows = void 0, this._shadowsSubscription = void 0, this._distanceDisplayCondition = void 0, this._distanceDisplayConditionSubscription = void 0, this._definitionChanged = new n(), this.merge(t(i, t.EMPTY_OBJECT));
  }

  return i(l.prototype, {
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    show: h("show"),
    material: e("material"),
    positions: h("positions"),
    minimumHeights: h("minimumHeights"),
    maximumHeights: h("maximumHeights"),
    granularity: h("granularity"),
    fill: h("fill"),
    outline: h("outline"),
    outlineColor: h("outlineColor"),
    outlineWidth: h("outlineWidth"),
    shadows: h("shadows"),
    distanceDisplayCondition: h("distanceDisplayCondition")
  }), l.prototype.clone = function (i) {
    return o(i) ? (i.show = this.show, i.material = this.material, i.positions = this.positions, i.minimumHeights = this.minimumHeights, i.maximumHeights = this.maximumHeights, i.granularity = this.granularity, i.fill = this.fill, i.outline = this.outline, i.outlineColor = this.outlineColor, i.outlineWidth = this.outlineWidth, i.shadows = this.shadows, i.distanceDisplayCondition = this.distanceDisplayCondition, i) : new l(this);
  }, l.prototype.merge = function (i) {
    if (!o(i)) throw new s("source is required.");
    this.show = t(this.show, i.show), this.material = t(this.material, i.material), this.positions = t(this.positions, i.positions), this.minimumHeights = t(this.minimumHeights, i.minimumHeights), this.maximumHeights = t(this.maximumHeights, i.maximumHeights), this.granularity = t(this.granularity, i.granularity), this.fill = t(this.fill, i.fill), this.outline = t(this.outline, i.outline), this.outlineColor = t(this.outlineColor, i.outlineColor), this.outlineWidth = t(this.outlineWidth, i.outlineWidth), this.shadows = t(this.shadows, i.shadows), this.distanceDisplayCondition = t(this.distanceDisplayCondition, i.distanceDisplayCondition);
  }, l;
});