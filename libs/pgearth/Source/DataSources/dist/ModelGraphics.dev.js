"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "./createPropertyDescriptor", "./NodeTransformationProperty", "./PropertyBag", "../Core/createGuid"], function (e, s, i, n, o, t, r, h, l) {
  "use strict";

  function a(i) {
    return new r(i);
  }

  function d(i) {
    this._show = void 0, this._showSubscription = void 0, this._scale = void 0, this._scaleSubscription = void 0, this._minimumPixelSize = void 0, this._minimumPixelSizeSubscription = void 0, this._maximumScale = void 0, this._maximumScaleSubscription = void 0, this._incrementallyLoadTextures = void 0, this._incrementallyLoadTexturesSubscription = void 0, this._shadows = void 0, this._shadowsSubscription = void 0, this._uri = void 0, this._uriSubscription = void 0, this._runAnimations = void 0, this._clampAnimations = void 0, this._runAnimationsSubscription = void 0, this._nodeTransformations = void 0, this._nodeTransformationsSubscription = void 0, this._heightReference = void 0, this._heightReferenceSubscription = void 0, this._distanceDisplayCondition = void 0, this._distanceDisplayConditionSubscription = void 0, this._silhouetteColor = void 0, this._silhouetteColorSubscription = void 0, this._silhouetteSize = void 0, this._silhouetteSizeSubscription = void 0, this._color = void 0, this._colorSubscription = void 0, this._colorBlendMode = void 0, this._colorBlendModeSubscription = void 0, this._colorBlendAmount = void 0, this._colorBlendAmountSubscription = void 0, this._clippingPlanes = void 0, this._clippingPlanesSubscription = void 0, this._imageBasedLightingFactor = void 0, this._imageBasedLightingFactorSubscription = void 0, this._lightColor = void 0, this._lightColorSubscription = void 0, this._definitionChanged = new o(), this.merge(e(i, e.EMPTY_OBJECT));
  }

  return i(d.prototype, {
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    show: t("show"),
    scale: t("scale"),
    minimumPixelSize: t("minimumPixelSize"),
    maximumScale: t("maximumScale"),
    incrementallyLoadTextures: t("incrementallyLoadTextures"),
    shadows: t("shadows"),
    uri: t("uri"),
    runAnimations: t("runAnimations"),
    clampAnimations: t("clampAnimations"),
    nodeTransformations: t("nodeTransformations", void 0, function (i) {
      return new h(i, a);
    }),
    heightReference: t("heightReference"),
    distanceDisplayCondition: t("distanceDisplayCondition"),
    silhouetteColor: t("silhouetteColor"),
    silhouetteSize: t("silhouetteSize"),
    color: t("color"),
    colorBlendMode: t("colorBlendMode"),
    colorBlendAmount: t("colorBlendAmount"),
    clippingPlanes: t("clippingPlanes"),
    imageBasedLightingFactor: t("imageBasedLightingFactor"),
    lightColor: t("lightColor")
  }), d.prototype.clone = function (i) {
    return s(i) ? (i.show = this.show, i.scale = this.scale, i.minimumPixelSize = this.minimumPixelSize, i.maximumScale = this.maximumScale, i.incrementallyLoadTextures = this.incrementallyLoadTextures, i.shadows = this.shadows, i.uri = this.uri, i.runAnimations = this.runAnimations, i.clampAnimations = this.clampAnimations, i.nodeTransformations = this.nodeTransformations, i.heightReference = this._heightReference, i.distanceDisplayCondition = this.distanceDisplayCondition, i.silhouetteColor = this.silhouetteColor, i.silhouetteSize = this.silhouetteSize, i.color = this.color, i.colorBlendMode = this.colorBlendMode, i.colorBlendAmount = this.colorBlendAmount, i.clippingPlanes = this.clippingPlanes, i.imageBasedLightingFactor = this.imageBasedLightingFactor, i.lightColor = this.lightColor, i) : new d(this);
  }, d.prototype.merge = function (i) {
    if (!s(i)) throw new n("source is required.");
    i.uri && "string" == typeof i.uri && -1 === i.uri.indexOf("uuid") && (i.uri = -1 !== i.uri.indexOf("?") ? i.uri + "&uuid=" + l() : i.uri + "?uuid=" + l()), this.show = e(this.show, i.show), this.scale = e(this.scale, i.scale), this.minimumPixelSize = e(this.minimumPixelSize, i.minimumPixelSize), this.maximumScale = e(this.maximumScale, i.maximumScale), this.incrementallyLoadTextures = e(this.incrementallyLoadTextures, i.incrementallyLoadTextures), this.shadows = e(this.shadows, i.shadows), this.uri = e(this.uri, i.uri), this.runAnimations = e(this.runAnimations, i.runAnimations), this.clampAnimations = e(this.clampAnimations, i.clampAnimations), this.heightReference = e(this.heightReference, i.heightReference), this.distanceDisplayCondition = e(this.distanceDisplayCondition, i.distanceDisplayCondition), this.silhouetteColor = e(this.silhouetteColor, i.silhouetteColor), this.silhouetteSize = e(this.silhouetteSize, i.silhouetteSize), this.color = e(this.color, i.color), this.colorBlendMode = e(this.colorBlendMode, i.colorBlendMode), this.colorBlendAmount = e(this.colorBlendAmount, i.colorBlendAmount), this.clippingPlanes = e(this.clippingPlanes, i.clippingPlanes), this.imageBasedLightingFactor = e(this.imageBasedLightingFactor, i.imageBasedLightingFactor), this.lightColor = e(this.lightColor, i.lightColor);
    var o,
        t = i.nodeTransformations;
    s(t) && (o = this.nodeTransformations, s(o) ? o.merge(t) : this.nodeTransformations = new h(t, a));
  }, d;
});