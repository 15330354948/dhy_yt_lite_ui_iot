"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "./createMaterialPropertyDescriptor", "./createPropertyDescriptor"], function (t, s, i, o, e, n, h) {
  "use strict";

  function r(i) {
    this._heightReference = void 0, this._show = void 0, this._showSubscription = void 0, this._radii = void 0, this._radiiSubscription = void 0, this._material = void 0, this._materialSubscription = void 0, this._stackPartitions = void 0, this._stackPartitionsSubscription = void 0, this._slicePartitions = void 0, this._slicePartitionsSubscription = void 0, this._subdivisions = void 0, this._subdivisionsSubscription = void 0, this._fill = void 0, this._fillSubscription = void 0, this._outline = void 0, this._outlineSubscription = void 0, this._outlineColor = void 0, this._outlineColorSubscription = void 0, this._outlineWidth = void 0, this._outlineWidthSubscription = void 0, this._shadows = void 0, this._shadowsSubscription = void 0, this._distanceDisplayCondition = void 0, this._distanceDisplayConditionSubscription = void 0, this._definitionChanged = new e(), this.merge(t(i, t.EMPTY_OBJECT));
  }

  return i(r.prototype, {
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    heightReference: h("heightReference"),
    show: h("show"),
    radii: h("radii"),
    material: n("material"),
    fill: h("fill"),
    outline: h("outline"),
    outlineColor: h("outlineColor"),
    outlineWidth: h("outlineWidth"),
    stackPartitions: h("stackPartitions"),
    slicePartitions: h("slicePartitions"),
    subdivisions: h("subdivisions"),
    shadows: h("shadows"),
    distanceDisplayCondition: h("distanceDisplayCondition")
  }), r.prototype.clone = function (i) {
    return s(i) ? (i.heightReference = this.heightReference, i.show = this.show, i.radii = this.radii, i.material = this.material, i.fill = this.fill, i.outline = this.outline, i.outlineColor = this.outlineColor, i.outlineWidth = this.outlineWidth, i.stackPartitions = this.stackPartitions, i.slicePartitions = this.slicePartitions, i.subdivisions = this.subdivisions, i.shadows = this.shadows, i.distanceDisplayCondition = this.distanceDisplayCondition, i) : new r(this);
  }, r.prototype.merge = function (i) {
    if (!s(i)) throw new o("source is required.");
    this.heightReference = t(this.heightReference, i.heightReference), this.show = t(this.show, i.show), this.radii = t(this.radii, i.radii), this.material = t(this.material, i.material), this.fill = t(this.fill, i.fill), this.outline = t(this.outline, i.outline), this.outlineColor = t(this.outlineColor, i.outlineColor), this.outlineWidth = t(this.outlineWidth, i.outlineWidth), this.stackPartitions = t(this.stackPartitions, i.stackPartitions), this.slicePartitions = t(this.slicePartitions, i.slicePartitions), this.subdivisions = t(this.subdivisions, i.subdivisions), this.shadows = t(this.shadows, i.shadows), this.distanceDisplayCondition = t(this.distanceDisplayCondition, i.distanceDisplayCondition);
  }, r;
});