"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "./createMaterialPropertyDescriptor", "./createPropertyDescriptor"], function (t, e, i, s, o, n, h) {
  "use strict";

  function l(i) {
    this._heightReference = void 0, this._length = void 0, this._lengthSubscription = void 0, this._topRadius = void 0, this._topRadiusSubscription = void 0, this._bottomRadius = void 0, this._bottomRadiusSubscription = void 0, this._numberOfVerticalLines = void 0, this._numberOfVerticalLinesSubscription = void 0, this._slices = void 0, this._slicesSubscription = void 0, this._show = void 0, this._showSubscription = void 0, this._material = void 0, this._materialSubscription = void 0, this._fill = void 0, this._fillSubscription = void 0, this._outline = void 0, this._outlineSubscription = void 0, this._outlineColor = void 0, this._outlineColorSubscription = void 0, this._outlineWidth = void 0, this._outlineWidthSubscription = void 0, this._shadows = void 0, this._shadowsSubscription = void 0, this._distanceDisplayCondition = void 0, this._distanceDisplayConditionSubscription = void 0, this._definitionChanged = new o(), this.merge(t(i, t.EMPTY_OBJECT));
  }

  return i(l.prototype, {
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    heightReference: h("heightReference"),
    length: h("length"),
    topRadius: h("topRadius"),
    bottomRadius: h("bottomRadius"),
    numberOfVerticalLines: h("numberOfVerticalLines"),
    slices: h("slices"),
    show: h("show"),
    material: n("material"),
    fill: h("fill"),
    outline: h("outline"),
    outlineColor: h("outlineColor"),
    outlineWidth: h("outlineWidth"),
    shadows: h("shadows"),
    distanceDisplayCondition: h("distanceDisplayCondition")
  }), l.prototype.clone = function (i) {
    return e(i) ? (i.heightReference = this.heightReference, i.bottomRadius = this.bottomRadius, i.length = this.length, i.topRadius = this.topRadius, i.show = this.show, i.material = this.material, i.numberOfVerticalLines = this.numberOfVerticalLines, i.slices = this.slices, i.fill = this.fill, i.outline = this.outline, i.outlineColor = this.outlineColor, i.outlineWidth = this.outlineWidth, i.shadows = this.shadows, i.distanceDisplayCondition = this.distanceDisplayCondition, i) : new l(this);
  }, l.prototype.merge = function (i) {
    if (!e(i)) throw new s("source is required.");
    this.heightReference = t(this.heightReference, i.heightReference), this.bottomRadius = t(this.bottomRadius, i.bottomRadius), this.length = t(this.length, i.length), this.topRadius = t(this.topRadius, i.topRadius), this.show = t(this.show, i.show), this.material = t(this.material, i.material), this.numberOfVerticalLines = t(this.numberOfVerticalLines, i.numberOfVerticalLines), this.slices = t(this.slices, i.slices), this.fill = t(this.fill, i.fill), this.outline = t(this.outline, i.outline), this.outlineColor = t(this.outlineColor, i.outlineColor), this.outlineWidth = t(this.outlineWidth, i.outlineWidth), this.shadows = t(this.shadows, i.shadows), this.distanceDisplayCondition = t(this.distanceDisplayCondition, i.distanceDisplayCondition);
  }, l;
});