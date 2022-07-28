"use strict";

define(["../../DataSources/GeoJsonDataSource", "../../Core/defined", "../../Core/combine", "../../Core/freezeObject", "../../ThirdParty/Uri", "../../Core/objectToQuery", "../../Core/queryToObject", "../../Core/defaultValue", "../../Core/DeveloperError"], function (u, s, a, e, c, f, l, p, r) {
  var h = e({
    service: "WFS",
    version: "1.0.0",
    request: "GetFeature"
  });

  function t(e) {
    if (!s(e.url)) throw new r("url is required");
    this.options = e;
  }

  return t.prototype.execute = function (e) {
    var r,
        t,
        o = new c(this.options.url),
        n = l(p(o.query, ""));
    n = a(h, n), s(this.options.maxFeatures) && (n.maxFeatures = this.options.maxFeatures), e.where && (r = "filter", t = e.where, s(n[r]) || (n[r] = t)), o.query = f(n);
    var i = o.toString();

    this.getUrl = function () {
      return i;
    };

    e.outFields;
    return new u.load(i, this.options);
  }, t.prototype.insidePolygon = function (e, r) {
    for (var t = r[0], o = r[1], n = !1, i = 0, u = e.length - 1; i < e.length; u = i++) {
      var s = e[i][0],
          a = e[i][1],
          c = e[u][0],
          f = e[u][1];
      o < a != o < f && t < (c - s) * (o - a) / (f - a) + s && (n = !n);
    }

    return n;
  }, t.prototype.pointInsideCircle = function (e, r, t) {
    if (0 === t) return !1;
    var o = r[0] - e[0],
        n = r[1] - e[1];
    return o * o + n * n <= t * t;
  }, t;
});