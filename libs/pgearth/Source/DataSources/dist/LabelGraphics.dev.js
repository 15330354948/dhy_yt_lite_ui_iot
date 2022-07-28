"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "./createPropertyDescriptor"], function (t, e, i, s, o, n) {
  "use strict";

  function h(i) {
    this._text = void 0, this._textSubscription = void 0, this._font = void 0, this._fontSubscription = void 0, this._style = void 0, this._styleSubscription = void 0, this._fillColor = void 0, this._fillColorSubscription = void 0, this._outlineColor = void 0, this._outlineColorSubscription = void 0, this._outlineWidth = void 0, this._outlineWidthSubscription = void 0, this._horizontalOrigin = void 0, this._horizontalOriginSubscription = void 0, this._verticalOrigin = void 0, this._verticalOriginSubscription = void 0, this._eyeOffset = void 0, this._eyeOffsetSubscription = void 0, this._heightReference = void 0, this._heightReferenceSubscription = void 0, this._pixelOffset = void 0, this._pixelOffsetSubscription = void 0, this._scale = void 0, this._scaleSubscription = void 0, this._show = void 0, this._showSubscription = void 0, this._showBackground = void 0, this._showBackgroundSubscription = void 0, this._backgroundColor = void 0, this._backgroundColorSubscription = void 0, this._backgroundPadding = void 0, this._backgroundPaddingSubscription = void 0, this._translucencyByDistance = void 0, this._translucencyByDistanceSubscription = void 0, this._pixelOffsetScaleByDistance = void 0, this._pixelOffsetScaleByDistanceSubscription = void 0, this._scaleByDistance = void 0, this._scaleByDistanceSubscription = void 0, this._distanceDisplayCondition = void 0, this._distanceDisplayConditionSubscription = void 0, this._disableDepthTestDistance = void 0, this._disableDepthTestDistanceSubscription = void 0, this._definitionChanged = new o(), this.merge(t(i, t.EMPTY_OBJECT));
  }

  return i(h.prototype, {
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    text: n("text"),
    font: n("font"),
    style: n("style"),
    fillColor: n("fillColor"),
    outlineColor: n("outlineColor"),
    outlineWidth: n("outlineWidth"),
    horizontalOrigin: n("horizontalOrigin"),
    verticalOrigin: n("verticalOrigin"),
    eyeOffset: n("eyeOffset"),
    heightReference: n("heightReference"),
    pixelOffset: n("pixelOffset"),
    scale: n("scale"),
    show: n("show"),
    showBackground: n("showBackground"),
    backgroundColor: n("backgroundColor"),
    backgroundPadding: n("backgroundPadding"),
    translucencyByDistance: n("translucencyByDistance"),
    pixelOffsetScaleByDistance: n("pixelOffsetScaleByDistance"),
    scaleByDistance: n("scaleByDistance"),
    distanceDisplayCondition: n("distanceDisplayCondition"),
    disableDepthTestDistance: n("disableDepthTestDistance")
  }), h.prototype.clone = function (i) {
    return e(i) ? (i.text = this.text, i.font = this.font, i.show = this.show, i.style = this.style, i.fillColor = this.fillColor, i.outlineColor = this.outlineColor, i.outlineWidth = this.outlineWidth, i.showBackground = this.showBackground, i.backgroundColor = this.backgroundColor, i.backgroundPadding = this.backgroundPadding, i.scale = this.scale, i.horizontalOrigin = this.horizontalOrigin, i.verticalOrigin = this.verticalOrigin, i.eyeOffset = this.eyeOffset, i.heightReference = this.heightReference, i.pixelOffset = this.pixelOffset, i.translucencyByDistance = this.translucencyByDistance, i.pixelOffsetScaleByDistance = this.pixelOffsetScaleByDistance, i.scaleByDistance = this.scaleByDistance, i.distanceDisplayCondition = this.distanceDisplayCondition, i.disableDepthTestDistance = this.disableDepthTestDistance, i) : new h(this);
  }, h.prototype.merge = function (i) {
    if (!e(i)) throw new s("source is required.");
    this.text = t(this.text, i.text), this.font = t(this.font, i.font), this.show = t(this.show, i.show), this.style = t(this.style, i.style), this.fillColor = t(this.fillColor, i.fillColor), this.outlineColor = t(this.outlineColor, i.outlineColor), this.outlineWidth = t(this.outlineWidth, i.outlineWidth), this.showBackground = t(this.showBackground, i.showBackground), this.backgroundColor = t(this.backgroundColor, i.backgroundColor), this.backgroundPadding = t(this.backgroundPadding, i.backgroundPadding), this.scale = t(this.scale, i.scale), this.horizontalOrigin = t(this.horizontalOrigin, i.horizontalOrigin), this.verticalOrigin = t(this.verticalOrigin, i.verticalOrigin), this.eyeOffset = t(this.eyeOffset, i.eyeOffset), this.heightReference = t(this.heightReference, i.heightReference), this.pixelOffset = t(this.pixelOffset, i.pixelOffset), this.translucencyByDistance = t(this.translucencyByDistance, i.translucencyByDistance), this.pixelOffsetScaleByDistance = t(this.pixelOffsetScaleByDistance, i.pixelOffsetScaleByDistance), this.scaleByDistance = t(this.scaleByDistance, i.scaleByDistance), this.distanceDisplayCondition = t(this.distanceDisplayCondition, i.distanceDisplayCondition), this.disableDepthTestDistance = t(this.disableDepthTestDistance, i.disableDepthTestDistance);
  }, h;
});