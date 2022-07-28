"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "./createMaterialPropertyDescriptor", "./createPropertyDescriptor"], function (t, o, i, s, n, e, l) {
  "use strict";

  function h(i) {
    this._plane = void 0, this._planeSubscription = void 0, this._dimensions = void 0, this._dimensionsSubscription = void 0, this._show = void 0, this._showSubscription = void 0, this._fill = void 0, this._fillSubscription = void 0, this._material = void 0, this._materialSubscription = void 0, this._outline = void 0, this._outlineSubscription = void 0, this._outlineColor = void 0, this._outlineColorSubscription = void 0, this._outlineWidth = void 0, this._outlineWidthSubscription = void 0, this._shadows = void 0, this._shadowsSubscription = void 0, this._distanceDisplayCondition = void 0, this._distanceDisplayConditionSubscription = void 0, this._definitionChanged = new n(), this.merge(t(i, t.EMPTY_OBJECT));
  }

  return i(h.prototype, {
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    show: l("show"),
    plane: l("plane"),
    dimensions: l("dimensions"),
    material: e("material"),
    fill: l("fill"),
    outline: l("outline"),
    outlineColor: l("outlineColor"),
    outlineWidth: l("outlineWidth"),
    shadows: l("shadows"),
    distanceDisplayCondition: l("distanceDisplayCondition")
  }), h.prototype.clone = function (i) {
    return o(i) ? (i.plane = this.plane, i.dimensions = this.dimensions, i.show = this.show, i.material = this.material, i.fill = this.fill, i.outline = this.outline, i.outlineColor = this.outlineColor, i.outlineWidth = this.outlineWidth, i.shadows = this.shadows, i.distanceDisplayCondition = this.distanceDisplayCondition, i) : new h(this);
  }, h.prototype.merge = function (i) {
    if (!o(i)) throw new s("source is required.");
    this.plane = t(this.plane, i.plane), this.dimensions = t(this.dimensions, i.dimensions), this.show = t(this.show, i.show), this.material = t(this.material, i.material), this.fill = t(this.fill, i.fill), this.outline = t(this.outline, i.outline), this.outlineColor = t(this.outlineColor, i.outlineColor), this.outlineWidth = t(this.outlineWidth, i.outlineWidth), this.shadows = t(this.shadows, i.shadows), this.distanceDisplayCondition = t(this.distanceDisplayCondition, i.distanceDisplayCondition);
  }, h;
});