"use strict";

define(["../Core/defaultValue", "./PointCloudEyeDomeLighting"], function (i, t) {
  "use strict";

  function e(e) {
    var t = i(e, {});
    this.attenuation = i(t.attenuation, !1), this.geometricErrorScale = i(t.geometricErrorScale, 1), this.maximumAttenuation = t.maximumAttenuation, this.baseResolution = t.baseResolution, this.eyeDomeLighting = i(t.eyeDomeLighting, !0), this.eyeDomeLightingStrength = i(t.eyeDomeLightingStrength, 1), this.eyeDomeLightingRadius = i(t.eyeDomeLightingRadius, 1), this.backFaceCulling = i(t.backFaceCulling, !1), this.normalShading = i(t.normalShading, !0);
  }

  return e.isSupported = function (e) {
    return t.isSupported(e.context);
  }, e;
});