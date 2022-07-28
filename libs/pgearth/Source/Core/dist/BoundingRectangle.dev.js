"use strict";

define(["./Cartesian2", "./Cartographic", "./Check", "./defaultValue", "./defined", "./GeographicProjection", "./Intersect", "./Rectangle"], function (r, t, a, o, f, e, c, u) {
  "use strict";

  function x(t, e, h, i) {
    this.x = o(t, 0), this.y = o(e, 0), this.width = o(h, 0), this.height = o(i, 0);
  }

  x.packedLength = 4, x.pack = function (t, e, h) {
    return a.typeOf.object("value", t), a.defined("array", e), h = o(h, 0), e[h++] = t.x, e[h++] = t.y, e[h++] = t.width, e[h] = t.height, e;
  }, x.unpack = function (t, e, h) {
    return a.defined("array", t), e = o(e, 0), f(h) || (h = new x()), h.x = t[e++], h.y = t[e++], h.width = t[e++], h.height = t[e], h;
  }, x.fromPoints = function (t, e) {
    if (f(e) || (e = new x()), !f(t) || 0 === t.length) return e.x = 0, e.y = 0, e.width = 0, e.height = 0, e;

    for (var h = t.length, i = t[0].x, n = t[0].y, r = t[0].x, o = t[0].y, a = 1; a < h; a++) {
      var c = t[a],
          u = c.x,
          y = c.y,
          i = Math.min(u, i),
          r = Math.max(u, r),
          n = Math.min(y, n),
          o = Math.max(y, o);
    }

    return e.x = i, e.y = n, e.width = r - i, e.height = o - n, e;
  };
  var y = new e(),
      d = new t(),
      g = new t();
  return x.fromRectangle = function (t, e, h) {
    if (f(h) || (h = new x()), !f(t)) return h.x = 0, h.y = 0, h.width = 0, h.height = 0, h;
    var i = (e = o(e, y)).project(u.southwest(t, d)),
        n = e.project(u.northeast(t, g));
    return r.subtract(n, i, n), h.x = i.x, h.y = i.y, h.width = n.x, h.height = n.y, h;
  }, x.clone = function (t, e) {
    if (f(t)) return f(e) ? (e.x = t.x, e.y = t.y, e.width = t.width, e.height = t.height, e) : new x(t.x, t.y, t.width, t.height);
  }, x.union = function (t, e, h) {
    a.typeOf.object("left", t), a.typeOf.object("right", e), f(h) || (h = new x());
    var i = Math.min(t.x, e.x),
        n = Math.min(t.y, e.y),
        r = Math.max(t.x + t.width, e.x + e.width),
        o = Math.max(t.y + t.height, e.y + e.height);
    return h.x = i, h.y = n, h.width = r - i, h.height = o - n, h;
  }, x.expand = function (t, e, h) {
    a.typeOf.object("rectangle", t), a.typeOf.object("point", e), h = x.clone(t, h);
    var i = e.x - h.x,
        n = e.y - h.y;
    return i > h.width ? h.width = i : i < 0 && (h.width -= i, h.x = e.x), n > h.height ? h.height = n : n < 0 && (h.height -= n, h.y = e.y), h;
  }, x.intersect = function (t, e) {
    a.typeOf.object("left", t), a.typeOf.object("right", e);
    var h = t.x,
        i = t.y,
        n = e.x,
        r = e.y;
    return h > n + e.width || h + t.width < n || i + t.height < r || i > r + e.height ? c.OUTSIDE : c.INTERSECTING;
  }, x.equals = function (t, e) {
    return t === e || f(t) && f(e) && t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
  }, x.prototype.clone = function (t) {
    return x.clone(this, t);
  }, x.prototype.intersect = function (t) {
    return x.intersect(this, t);
  }, x.prototype.equals = function (t) {
    return x.equals(this, t);
  }, x;
});