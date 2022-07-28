"use strict";

define(["../../Core/defaultValue", "../../Core/defined", "../../Core/Resource", "../../ThirdParty/Uri", "../../Core/objectToQuery", "../../Core/queryToObject", "../../Core/DeveloperError", "./RouteParameters"], function (a, l, s, y, f, h, c, d) {
  function r(r) {
    if (!l(r.url)) throw new c("url is required");
    if (!l(r.layer)) throw new c("layer is required");
    this._url = r.url, this._layer = r.layer;
  }

  return r.prototype.solve = function (r) {
    if (!r instanceof d) throw new c("parameters must be RouteParameters");
    var e = r.getStart(),
        t = r.getEnd(),
        o = new y(this._url);
    o.path = o.getPath() + "/" + this._layer;
    var u = h(a(o.query, ""));

    function i(r, e) {
      l(u[r]) || (u[r] = e);
    }

    i("x1", e.x), i("y1", e.y), i("x2", t.x), i("y2", t.y), o.query = f(u);
    var n = o.toString();
    return this._url = n, s.fetchJson({
      url: n
    });
  }, r.getUrl = function () {
    return this._url;
  }, r;
});