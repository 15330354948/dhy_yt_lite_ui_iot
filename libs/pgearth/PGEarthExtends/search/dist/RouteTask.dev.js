"use strict";

define(["../../Source/Core/defaultValue", "../../Source/Core/defined", "../../Source/Core/Resource", "../../Source/ThirdParty/Uri", "../../Source/Core/objectToQuery", "../../Source/Core/queryToObject", "../../Source/Core/DeveloperError", "./RouteParameters"], function (r, e, t, o, u, i, n, a) {
  var l = function l(r) {
    if (!e(r.url)) throw new n("url is required");
    if (!e(r.layer)) throw new n("layer is required");
    this._url = r.url, this._layer = r.layer;
  };

  return l.prototype.solve = function (l) {
    if (!l instanceof a) throw new n("parameters must be RouteParameters");
    var c = l.getStart(),
        s = l.getEnd(),
        y = new o(this._url);
    y.path = y.getPath() + "/" + this._layer;
    var f = i(r(y.query, ""));

    function h(r, t) {
      e(f[r]) || (f[r] = t);
    }

    h("x1", c.x), h("y1", c.y), h("x2", s.x), h("y2", s.y), y.query = u(f);
    var S = y.toString();
    return this._url = S, t.fetchJson({
      url: S
    });
  }, l.getUrl = function () {
    return this._url;
  }, l;
});