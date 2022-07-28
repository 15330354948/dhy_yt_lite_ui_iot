"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "./createMaterialPropertyDescriptor", "./createPropertyDescriptor"], function (t, e, i, o, s, n, r) {
  "use strict";

  function a(i) {
    this._material = void 0, this._materialSubscription = void 0, this._show = void 0, this._showSubscription = void 0, this._width = void 0, this._widthSubscription = void 0, this._resolution = void 0, this._resolutionSubscription = void 0, this._leadTime = void 0, this._leadTimeSubscription = void 0, this._trailTime = void 0, this._trailTimeSubscription = void 0, this._distanceDisplayCondition = void 0, this._distanceDisplayConditionSubscription = void 0, this._definitionChanged = new s(), this.merge(t(i, t.EMPTY_OBJECT));
  }

  return i(a.prototype, {
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    show: r("show"),
    material: n("material"),
    width: r("width"),
    resolution: r("resolution"),
    leadTime: r("leadTime"),
    trailTime: r("trailTime"),
    distanceDisplayCondition: r("distanceDisplayCondition")
  }), a.prototype.clone = function (i) {
    return e(i) ? (i.material = this.material, i.width = this.width, i.resolution = this.resolution, i.show = this.show, i.leadTime = this.leadTime, i.trailTime = this.trailTime, i.distanceDisplayCondition = this.distanceDisplayCondition, i) : new a(this);
  }, a.prototype.merge = function (i) {
    if (!e(i)) throw new o("source is required.");
    this.material = t(this.material, i.material), this.width = t(this.width, i.width), this.resolution = t(this.resolution, i.resolution), this.show = t(this.show, i.show), this.leadTime = t(this.leadTime, i.leadTime), this.trailTime = t(this.trailTime, i.trailTime), this.distanceDisplayCondition = t(this.distanceDisplayCondition, i.distanceDisplayCondition);
  }, a;
});