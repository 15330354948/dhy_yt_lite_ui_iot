"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "./createMaterialPropertyDescriptor", "./createPropertyDescriptor"], function (t, e, i, o, s, h, n) {
  "use strict";

  function r(i) {
    this._show = void 0, this._showSubscription = void 0, this._material = void 0, this._materialSubscription = void 0, this._hierarchy = void 0, this._hierarchySubscription = void 0, this._height = void 0, this._heightSubscription = void 0, this._heightReference = void 0, this._heightReferenceSubscription = void 0, this._extrudedHeight = void 0, this._extrudedHeightSubscription = void 0, this._extrudedHeightReference = void 0, this._extrudedHeightReferenceSubscription = void 0, this._granularity = void 0, this._granularitySubscription = void 0, this._stRotation = void 0, this._stRotationSubscription = void 0, this._perPositionHeight = void 0, this._perPositionHeightSubscription = void 0, this._outline = void 0, this._outlineSubscription = void 0, this._outlineColor = void 0, this._outlineColorSubscription = void 0, this._outlineWidth = void 0, this._outlineWidthSubscription = void 0, this._fill = void 0, this._fillSubscription = void 0, this._closeTop = void 0, this._closeTopSubscription = void 0, this._closeBottom = void 0, this._closeBottomSubscription = void 0, this._shadows = void 0, this._shadowsSubscription = void 0, this._distanceDisplayCondition = void 0, this._distanceDisplayConditionSubscription = void 0, this._classificationType = void 0, this._classificationTypeSubscription = void 0, this._arcType = void 0, this._arcTypeSubscription = void 0, this._zIndex = void 0, this._zIndexSubscription = void 0, this._definitionChanged = new s(), this.merge(t(i, t.EMPTY_OBJECT));
  }

  return i(r.prototype, {
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    show: n("show"),
    material: h("material"),
    hierarchy: n("hierarchy"),
    height: n("height"),
    heightReference: n("heightReference"),
    extrudedHeight: n("extrudedHeight"),
    extrudedHeightReference: n("extrudedHeightReference"),
    granularity: n("granularity"),
    stRotation: n("stRotation"),
    fill: n("fill"),
    outline: n("outline"),
    outlineColor: n("outlineColor"),
    outlineWidth: n("outlineWidth"),
    perPositionHeight: n("perPositionHeight"),
    closeTop: n("closeTop"),
    closeBottom: n("closeBottom"),
    shadows: n("shadows"),
    distanceDisplayCondition: n("distanceDisplayCondition"),
    classificationType: n("classificationType"),
    arcType: n("arcType"),
    zIndex: n("zIndex")
  }), r.prototype.clone = function (i) {
    return e(i) ? (i.show = this.show, i.material = this.material, i.hierarchy = this.hierarchy, i.height = this.height, i.heightReference = this.heightReference, i.extrudedHeight = this.extrudedHeight, i.extrudedHeightReference = this.extrudedHeightReference, i.granularity = this.granularity, i.stRotation = this.stRotation, i.fill = this.fill, i.outline = this.outline, i.outlineColor = this.outlineColor, i.outlineWidth = this.outlineWidth, i.perPositionHeight = this.perPositionHeight, i.closeTop = this.closeTop, i.closeBottom = this.closeBottom, i.shadows = this.shadows, i.distanceDisplayCondition = this.distanceDisplayCondition, i.classificationType = this.classificationType, i.arcType = this.arcType, i.zIndex = this.zIndex, i) : new r(this);
  }, r.prototype.merge = function (i) {
    if (!e(i)) throw new o("source is required.");
    this.show = t(this.show, i.show), this.material = t(this.material, i.material), this.hierarchy = t(this.hierarchy, i.hierarchy), this.height = t(this.height, i.height), this.heightReference = t(this.heightReference, i.heightReference), this.extrudedHeight = t(this.extrudedHeight, i.extrudedHeight), this.extrudedHeightReference = t(this.extrudedHeightReference, i.extrudedHeightReference), this.granularity = t(this.granularity, i.granularity), this.stRotation = t(this.stRotation, i.stRotation), this.fill = t(this.fill, i.fill), this.outline = t(this.outline, i.outline), this.outlineColor = t(this.outlineColor, i.outlineColor), this.outlineWidth = t(this.outlineWidth, i.outlineWidth), this.perPositionHeight = t(this.perPositionHeight, i.perPositionHeight), this.closeTop = t(this.closeTop, i.closeTop), this.closeBottom = t(this.closeBottom, i.closeBottom), this.shadows = t(this.shadows, i.shadows), this.distanceDisplayCondition = t(this.distanceDisplayCondition, i.distanceDisplayCondition), this.classificationType = t(this.classificationType, i.classificationType), this.arcType = t(this.arcType, i.arcType), this.zIndex = t(this.zIndex, i.zIndex);
  }, r;
});