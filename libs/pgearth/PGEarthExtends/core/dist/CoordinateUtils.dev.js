"use strict";

define(["../../Source/Core/defaultValue", "../../Source/ThirdParty/proj4"], function (o, n) {
  function r() {}

  return r.WGS84ToCGCS2000 = function (r, t, e, u) {
    var a = o(e, "+proj=longlat +datum=WGS84 +no_defs"),
        d = o(u, "+proj=longlat +ellps=GRS80 +no_defs");
    return n(a, d, [r, t]);
  }, r.WGS_49NToWGS84 = function (r, t, e, u) {
    var a = o(e, "+proj=utm +zone=49 +datum=WGS84 +units=m +no_defs"),
        d = o(u, "+proj=longlat +datum=WGS84 +no_defs");
    return n(a, d, [r, t]);
  }, r;
});