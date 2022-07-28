"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "./createPropertyDescriptor"], function (e, t, i, s, n, o) {
  "use strict";

  function h(i) {
    this._color = void 0, this._colorSubscription = void 0, this._pixelSize = void 0, this._pixelSizeSubscription = void 0, this._outlineColor = void 0, this._outlineColorSubscription = void 0, this._outlineWidth = void 0, this._outlineWidthSubscription = void 0, this._show = void 0, this._showSubscription = void 0, this._scaleByDistance = void 0, this._scaleByDistanceSubscription = void 0, this._translucencyByDistance = void 0, this._translucencyByDistanceSubscription = void 0, this._heightReference = void 0, this._heightReferenceSubscription = void 0, this._distanceDisplayCondition = void 0, this._distanceDisplayConditionSubscription = void 0, this._disableDepthTestDistance = void 0, this._disableDepthTestDistanceSubscription = void 0, this._definitionChanged = new n(), this.merge(e(i, e.EMPTY_OBJECT));
  }

  return i(h.prototype, {
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    color: o("color"),
    pixelSize: o("pixelSize"),
    outlineColor: o("outlineColor"),
    outlineWidth: o("outlineWidth"),
    show: o("show"),
    scaleByDistance: o("scaleByDistance"),
    translucencyByDistance: o("translucencyByDistance"),
    heightReference: o("heightReference"),
    distanceDisplayCondition: o("distanceDisplayCondition"),
    disableDepthTestDistance: o("disableDepthTestDistance")
  }), h.prototype.clone = function (i) {
    return t(i) ? (i.color = this.color, i.pixelSize = this.pixelSize, i.outlineColor = this.outlineColor, i.outlineWidth = this.outlineWidth, i.show = this.show, i.scaleByDistance = this.scaleByDistance, i.translucencyByDistance = this._translucencyByDistance, i.heightReference = this.heightReference, i.distanceDisplayCondition = this.distanceDisplayCondition, i.disableDepthTestDistance = this.disableDepthTestDistance, i) : new h(this);
  }, h.prototype.merge = function (i) {
    if (!t(i)) throw new s("source is required.");
    this.color = e(this.color, i.color), this.pixelSize = e(this.pixelSize, i.pixelSize), this.outlineColor = e(this.outlineColor, i.outlineColor), this.outlineWidth = e(this.outlineWidth, i.outlineWidth), this.show = e(this.show, i.show), this.scaleByDistance = e(this.scaleByDistance, i.scaleByDistance), this.translucencyByDistance = e(this._translucencyByDistance, i.translucencyByDistance), this.heightReference = e(this.heightReference, i.heightReference), this.distanceDisplayCondition = e(this.distanceDisplayCondition, i.distanceDisplayCondition), this.disableDepthTestDistance = e(this.disableDepthTestDistance, i.disableDepthTestDistance);
  }, h;
});