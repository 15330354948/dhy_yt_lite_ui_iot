"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "./createPropertyDescriptor"], function (e, t, i, s, n, h) {
  "use strict";

  function o(i) {
    this._image = void 0, this._imageSubscription = void 0, this._imageSubRegion = void 0, this._imageSubRegionSubscription = void 0, this._width = void 0, this._widthSubscription = void 0, this._height = void 0, this._heightSubscription = void 0, this._scale = void 0, this._scaleSubscription = void 0, this._rotation = void 0, this._rotationSubscription = void 0, this._alignedAxis = void 0, this._alignedAxisSubscription = void 0, this._horizontalOrigin = void 0, this._horizontalOriginSubscription = void 0, this._verticalOrigin = void 0, this._verticalOriginSubscription = void 0, this._color = void 0, this._colorSubscription = void 0, this._eyeOffset = void 0, this._eyeOffsetSubscription = void 0, this._heightReference = void 0, this._heightReferenceSubscription = void 0, this._pixelOffset = void 0, this._pixelOffsetSubscription = void 0, this._show = void 0, this._showSubscription = void 0, this._scaleByDistance = void 0, this._scaleByDistanceSubscription = void 0, this._translucencyByDistance = void 0, this._translucencyByDistanceSubscription = void 0, this._pixelOffsetScaleByDistance = void 0, this._pixelOffsetScaleByDistanceSubscription = void 0, this._sizeInMeters = void 0, this._sizeInMetersSubscription = void 0, this._distanceDisplayCondition = void 0, this._distanceDisplayConditionSubscription = void 0, this._disableDepthTestDistance = void 0, this._disableDepthTestDistanceSubscription = void 0, this._definitionChanged = new n(), this.merge(e(i, e.EMPTY_OBJECT));
  }

  return i(o.prototype, {
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    image: h("image"),
    imageSubRegion: h("imageSubRegion"),
    scale: h("scale"),
    rotation: h("rotation"),
    alignedAxis: h("alignedAxis"),
    horizontalOrigin: h("horizontalOrigin"),
    verticalOrigin: h("verticalOrigin"),
    color: h("color"),
    eyeOffset: h("eyeOffset"),
    heightReference: h("heightReference"),
    pixelOffset: h("pixelOffset"),
    show: h("show"),
    width: h("width"),
    height: h("height"),
    scaleByDistance: h("scaleByDistance"),
    translucencyByDistance: h("translucencyByDistance"),
    pixelOffsetScaleByDistance: h("pixelOffsetScaleByDistance"),
    sizeInMeters: h("sizeInMeters"),
    distanceDisplayCondition: h("distanceDisplayCondition"),
    disableDepthTestDistance: h("disableDepthTestDistance")
  }), o.prototype.clone = function (i) {
    return t(i) ? (i.color = this._color, i.eyeOffset = this._eyeOffset, i.heightReference = this._heightReference, i.horizontalOrigin = this._horizontalOrigin, i.image = this._image, i.imageSubRegion = this._imageSubRegion, i.pixelOffset = this._pixelOffset, i.scale = this._scale, i.rotation = this._rotation, i.alignedAxis = this._alignedAxis, i.show = this._show, i.verticalOrigin = this._verticalOrigin, i.width = this._width, i.height = this._height, i.scaleByDistance = this._scaleByDistance, i.translucencyByDistance = this._translucencyByDistance, i.pixelOffsetScaleByDistance = this._pixelOffsetScaleByDistance, i.sizeInMeters = this._sizeInMeters, i.distanceDisplayCondition = this._distanceDisplayCondition, i.disableDepthTestDistance = this._disableDepthTestDistance, i) : new o(this);
  }, o.prototype.merge = function (i) {
    if (!t(i)) throw new s("source is required.");
    this.color = e(this._color, i.color), this.eyeOffset = e(this._eyeOffset, i.eyeOffset), this.heightReference = e(this._heightReference, i.heightReference), this.horizontalOrigin = e(this._horizontalOrigin, i.horizontalOrigin), this.image = e(this._image, i.image), this.imageSubRegion = e(this._imageSubRegion, i.imageSubRegion), this.pixelOffset = e(this._pixelOffset, i.pixelOffset), this.scale = e(this._scale, i.scale), this.rotation = e(this._rotation, i.rotation), this.alignedAxis = e(this._alignedAxis, i.alignedAxis), this.show = e(this._show, i.show), this.verticalOrigin = e(this._verticalOrigin, i.verticalOrigin), this.width = e(this._width, i.width), this.height = e(this._height, i.height), this.scaleByDistance = e(this._scaleByDistance, i.scaleByDistance), this.translucencyByDistance = e(this._translucencyByDistance, i.translucencyByDistance), this.pixelOffsetScaleByDistance = e(this._pixelOffsetScaleByDistance, i.pixelOffsetScaleByDistance), this.sizeInMeters = e(this._sizeInMeters, i.sizeInMeters), this.distanceDisplayCondition = e(this._distanceDisplayCondition, i.distanceDisplayCondition), this.disableDepthTestDistance = e(this._disableDepthTestDistance, i.disableDepthTestDistance);
  }, o;
});