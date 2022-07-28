"use strict";

define(["../../Source/DataSources/GeoJsonDataSource", "../../Source/Core/defined", "../../Source/Core/combine", "../../Source/Core/freezeObject", "../../Source/ThirdParty/Uri", "../../Source/Core/objectToQuery", "../../Source/Core/queryToObject", "../../Source/Core/defaultValue", "../../Source/Core/DeveloperError"], function (e, r, o, t, n, u, i, a, s) {
  var c = t({
    service: "WFS",
    version: "1.0.0",
    request: "GetFeature",
    outputFormat: "application/json"
  });

  function p(e) {
    if (!r(e.url)) throw new s("url is required");
    if (!r(e.layer)) throw new s("layer is required");
    this.options = e;
  }

  return p.prototype.execute = function (t) {
    var s = new n(this.options.url),
        p = i(a(s.query, ""));
    p = o(c, p);

    function l(e, o) {
      r(p[e]) || (p[e] = o);
    }

    r(this.options.maxFeatures) && (p.maxFeatures = this.options.maxFeatures), l("typeName", this.options.layer), t.where && l("CQL_FILTER", t.where), s.query = u(p);
    var f = s.toString();

    this.getUrl = function () {
      return f;
    };

    t.outFields;
    return new e.load(f, this.options);
  }, p.prototype.insidePolygon = function (e, r) {
    for (var o = r[0], t = r[1], n = !1, u = 0, i = e.length - 1; u < e.length; i = u++) {
      var a = e[u][0],
          s = e[u][1],
          c = e[i][0],
          p = e[i][1];
      s > t != p > t && o < (c - a) * (t - s) / (p - s) + a && (n = !n);
    }

    return n;
  }, p.prototype.pointInsideCircle = function (e, r, o) {
    if (0 === o) return !1;
    var t = r[0] - e[0],
        n = r[1] - e[1];
    return t * t + n * n <= o * o;
  }, p;
});