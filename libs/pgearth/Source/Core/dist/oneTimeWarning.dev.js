"use strict";

define(["./defaultValue", "./defined", "./DeveloperError"], function (i, r, n) {
  "use strict";

  var o = {};

  function e(e, t) {
    if (!r(e)) throw new n("identifier is required.");
    r(o[e]) || (o[e] = !0, console.warn(i(t, e)));
  }

  return e.geometryOutlines = "Entity geometry outlines are unsupported on terrain. Outlines will be disabled. To enable outlines, disable geometry terrain clamping by explicitly setting height to 0.", e.geometryZIndex = "Entity geometry with zIndex are unsupported when height or extrudedHeight are defined.  zIndex will be ignored", e.geometryHeightReference = "Entity corridor, ellipse, polygon or rectangle with heightReference must also have a defined height.  heightReference will be ignored", e.geometryExtrudedHeightReference = "Entity corridor, ellipse, polygon or rectangle with extrudedHeightReference must also have a defined extrudedHeight.  extrudedHeightReference will be ignored", e;
});