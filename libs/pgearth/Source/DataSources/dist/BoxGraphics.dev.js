"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "./createMaterialPropertyDescriptor", "./createPropertyDescriptor"], function (t, e, i, o, s, n, h) {
  "use strict";

  function l(i) {
    this._heightReference = void 0, this._dimensions = void 0, this._dimensionsSubscription = void 0, this._show = void 0, this._showSubscription = void 0, this._fill = void 0, this._fillSubscription = void 0, this._material = void 0, this._materialSubscription = void 0, this._outline = void 0, this._outlineSubscription = void 0, this._outlineColor = void 0, this._outlineColorSubscription = void 0, this._outlineWidth = void 0, this._outlineWidthSubscription = void 0, this._shadows = void 0, this._shadowsSubscription = void 0, this._distanceDisplayCondition = void 0, this._distanceDisplayConditionSubscription = void 0, this._definitionChanged = new s(), this.merge(t(i, t.EMPTY_OBJECT));
  }

  return i(l.prototype, {
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    heightReference: h("heightReference"),
    show: h("show"),
    dimensions: h("dimensions"),
    material: n("material"),
    fill: h("fill"),
    outline: h("outline"),
    outlineColor: h("outlineColor"),
    outlineWidth: h("outlineWidth"),
    shadows: h("shadows"),
    distanceDisplayCondition: h("distanceDisplayCondition")
  }), l.prototype.clone = function (i) {
    return e(i) ? (i.heightReference = this.heightReference, i.dimensions = this.dimensions, i.show = this.show, i.material = this.material, i.fill = this.fill, i.outline = this.outline, i.outlineColor = this.outlineColor, i.outlineWidth = this.outlineWidth, i.shadows = this.shadows, i.distanceDisplayCondition = this.distanceDisplayCondition, i) : new l(this);
  }, l.prototype.merge = function (i) {
    if (!e(i)) throw new o("source is required.");
    this.heightReference = t(this.heightReference, i.heightReference), this.dimensions = t(this.dimensions, i.dimensions), this.show = t(this.show, i.show), this.material = t(this.material, i.material), this.fill = t(this.fill, i.fill), this.outline = t(this.outline, i.outline), this.outlineColor = t(this.outlineColor, i.outlineColor), this.outlineWidth = t(this.outlineWidth, i.outlineWidth), this.shadows = t(this.shadows, i.shadows), this.distanceDisplayCondition = t(this.distanceDisplayCondition, i.distanceDisplayCondition);
  }, l;
});