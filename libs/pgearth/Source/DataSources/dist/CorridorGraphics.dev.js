"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "./createMaterialPropertyDescriptor", "./createPropertyDescriptor"], function (t, e, i, o, s, h, n) {
  "use strict";

  function r(i) {
    this._show = void 0, this._showSubscription = void 0, this._material = void 0, this._materialSubscription = void 0, this._positions = void 0, this._positionsSubscription = void 0, this._height = void 0, this._heightSubscription = void 0, this._heightReference = void 0, this._heightReferenceSubscription = void 0, this._extrudedHeight = void 0, this._extrudedHeightSubscription = void 0, this._extrudedHeightReference = void 0, this._extrudedHeightReferenceSubscription = void 0, this._granularity = void 0, this._granularitySubscription = void 0, this._width = void 0, this._widthSubscription = void 0, this._cornerType = void 0, this._cornerTypeSubscription = void 0, this._fill = void 0, this._fillSubscription = void 0, this._outline = void 0, this._outlineSubscription = void 0, this._outlineColor = void 0, this._outlineColorSubscription = void 0, this._outlineWidth = void 0, this._outlineWidthSubscription = void 0, this._shadows = void 0, this._shadowsSubscription = void 0, this._distanceDisplayCondition = void 0, this._distanceDisplayConditionSubscription = void 0, this._classificationType = void 0, this._classificationTypeSubscription = void 0, this._zIndex = void 0, this._zIndexSubscription = void 0, this._definitionChanged = new s(), this.merge(t(i, t.EMPTY_OBJECT));
  }

  return i(r.prototype, {
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    show: n("show"),
    material: h("material"),
    positions: n("positions"),
    height: n("height"),
    heightReference: n("heightReference"),
    extrudedHeight: n("extrudedHeight"),
    extrudedHeightReference: n("extrudedHeightReference"),
    granularity: n("granularity"),
    width: n("width"),
    fill: n("fill"),
    outline: n("outline"),
    outlineColor: n("outlineColor"),
    outlineWidth: n("outlineWidth"),
    cornerType: n("cornerType"),
    shadows: n("shadows"),
    distanceDisplayCondition: n("distanceDisplayCondition"),
    classificationType: n("classificationType"),
    zIndex: n("zIndex")
  }), r.prototype.clone = function (i) {
    return e(i) ? (i.show = this.show, i.material = this.material, i.positions = this.positions, i.height = this.height, i.heightReference = this.heightReference, i.extrudedHeight = this.extrudedHeight, i.extrudedHeightReference = this.extrudedHeightReference, i.granularity = this.granularity, i.width = this.width, i.fill = this.fill, i.outline = this.outline, i.outlineColor = this.outlineColor, i.outlineWidth = this.outlineWidth, i.cornerType = this.cornerType, i.shadows = this.shadows, i.distanceDisplayCondition = this.distanceDisplayCondition, i.classificationType = this.classificationType, i.zIndex = this.zIndex, i) : new r(this);
  }, r.prototype.merge = function (i) {
    if (!e(i)) throw new o("source is required.");
    this.show = t(this.show, i.show), this.material = t(this.material, i.material), this.positions = t(this.positions, i.positions), this.height = t(this.height, i.height), this.heightReference = t(this.heightReference, i.heightReference), this.extrudedHeight = t(this.extrudedHeight, i.extrudedHeight), this.extrudedHeightReference = t(this.extrudedHeightReference, i.extrudedHeightReference), this.granularity = t(this.granularity, i.granularity), this.width = t(this.width, i.width), this.fill = t(this.fill, i.fill), this.outline = t(this.outline, i.outline), this.outlineColor = t(this.outlineColor, i.outlineColor), this.outlineWidth = t(this.outlineWidth, i.outlineWidth), this.cornerType = t(this.cornerType, i.cornerType), this.shadows = t(this.shadows, i.shadows), this.distanceDisplayCondition = t(this.distanceDisplayCondition, i.distanceDisplayCondition), this.classificationType = t(this.classificationType, i.classificationType), this.zIndex = t(this.zIndex, i.zIndex);
  }, r;
});