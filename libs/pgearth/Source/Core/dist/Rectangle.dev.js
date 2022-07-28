"use strict";

define(["./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Ellipsoid", "./freezeObject", "./Math"], function (s, f, O, p, t, d, e, m) {
  "use strict";

  function w(t, e, n, a) {
    this.west = O(t, 0), this.south = O(e, 0), this.east = O(n, 0), this.north = O(a, 0);
  }

  t(w.prototype, {
    width: {
      get: function get() {
        return w.computeWidth(this);
      }
    },
    height: {
      get: function get() {
        return w.computeHeight(this);
      }
    }
  }), w.packedLength = 4, w.pack = function (t, e, n) {
    return f.typeOf.object("value", t), f.defined("array", e), n = O(n, 0), e[n++] = t.west, e[n++] = t.south, e[n++] = t.east, e[n] = t.north, e;
  }, w.unpack = function (t, e, n) {
    return f.defined("array", t), e = O(e, 0), p(n) || (n = new w()), n.west = t[e++], n.south = t[e++], n.east = t[e++], n.north = t[e], n;
  }, w.computeWidth = function (t) {
    f.typeOf.object("rectangle", t);
    var e = t.east,
        n = t.west;
    return e < n && (e += m.TWO_PI), e - n;
  }, w.computeHeight = function (t) {
    return f.typeOf.object("rectangle", t), t.north - t.south;
  }, w.fromDegrees = function (t, e, n, a, r) {
    return t = m.toRadians(O(t, 0)), e = m.toRadians(O(e, 0)), n = m.toRadians(O(n, 0)), a = m.toRadians(O(a, 0)), p(r) ? (r.west = t, r.south = e, r.east = n, r.north = a, r) : new w(t, e, n, a);
  }, w.fromRadians = function (t, e, n, a, r) {
    return p(r) ? (r.west = O(t, 0), r.south = O(e, 0), r.east = O(n, 0), r.north = O(a, 0), r) : new w(t, e, n, a);
  }, w.fromCartographicArray = function (t, e) {
    f.defined("cartographics", t);

    for (var n = Number.MAX_VALUE, a = -Number.MAX_VALUE, r = Number.MAX_VALUE, o = -Number.MAX_VALUE, s = Number.MAX_VALUE, u = -Number.MAX_VALUE, i = 0, h = t.length; i < h; i++) {
      var c = t[i],
          n = Math.min(n, c.longitude),
          a = Math.max(a, c.longitude),
          s = Math.min(s, c.latitude),
          u = Math.max(u, c.latitude),
          l = 0 <= c.longitude ? c.longitude : c.longitude + m.TWO_PI,
          r = Math.min(r, l),
          o = Math.max(o, l);
    }

    return o - r < a - n && (n = r, (a = o) > m.PI && (a -= m.TWO_PI), n > m.PI && (n -= m.TWO_PI)), p(e) ? (e.west = n, e.south = s, e.east = a, e.north = u, e) : new w(n, s, a, u);
  }, w.fromCartesianArray = function (t, e, n) {
    f.defined("cartesians", t), e = O(e, d.WGS84);

    for (var a = Number.MAX_VALUE, r = -Number.MAX_VALUE, o = Number.MAX_VALUE, s = -Number.MAX_VALUE, u = Number.MAX_VALUE, i = -Number.MAX_VALUE, h = 0, c = t.length; h < c; h++) {
      var l = e.cartesianToCartographic(t[h]),
          a = Math.min(a, l.longitude),
          r = Math.max(r, l.longitude),
          u = Math.min(u, l.latitude),
          i = Math.max(i, l.latitude),
          g = 0 <= l.longitude ? l.longitude : l.longitude + m.TWO_PI,
          o = Math.min(o, g),
          s = Math.max(s, g);
    }

    return s - o < r - a && (a = o, (r = s) > m.PI && (r -= m.TWO_PI), a > m.PI && (a -= m.TWO_PI)), p(n) ? (n.west = a, n.south = u, n.east = r, n.north = i, n) : new w(a, u, r, i);
  }, w.clone = function (t, e) {
    if (p(t)) return p(e) ? (e.west = t.west, e.south = t.south, e.east = t.east, e.north = t.north, e) : new w(t.west, t.south, t.east, t.north);
  }, w.equalsEpsilon = function (t, e, n) {
    return f.typeOf.number("absoluteEpsilon", n), t === e || p(t) && p(e) && Math.abs(t.west - e.west) <= n && Math.abs(t.south - e.south) <= n && Math.abs(t.east - e.east) <= n && Math.abs(t.north - e.north) <= n;
  }, w.prototype.clone = function (t) {
    return w.clone(this, t);
  }, w.prototype.equals = function (t) {
    return w.equals(this, t);
  }, w.equals = function (t, e) {
    return t === e || p(t) && p(e) && t.west === e.west && t.south === e.south && t.east === e.east && t.north === e.north;
  }, w.prototype.equalsEpsilon = function (t, e) {
    return f.typeOf.number("epsilon", e), w.equalsEpsilon(this, t, e);
  }, w.validate = function (t) {
    f.typeOf.object("rectangle", t);
    var e = t.north;
    f.typeOf.number.greaterThanOrEquals("north", e, -m.PI_OVER_TWO), f.typeOf.number.lessThanOrEquals("north", e, m.PI_OVER_TWO);
    var n = t.south;
    f.typeOf.number.greaterThanOrEquals("south", n, -m.PI_OVER_TWO), f.typeOf.number.lessThanOrEquals("south", n, m.PI_OVER_TWO);
    var a = t.west;
    f.typeOf.number.greaterThanOrEquals("west", a, -Math.PI), f.typeOf.number.lessThanOrEquals("west", a, Math.PI);
    var r = t.east;
    f.typeOf.number.greaterThanOrEquals("east", r, -Math.PI), f.typeOf.number.lessThanOrEquals("east", r, Math.PI);
  }, w.southwest = function (t, e) {
    return f.typeOf.object("rectangle", t), p(e) ? (e.longitude = t.west, e.latitude = t.south, e.height = 0, e) : new s(t.west, t.south);
  }, w.northwest = function (t, e) {
    return f.typeOf.object("rectangle", t), p(e) ? (e.longitude = t.west, e.latitude = t.north, e.height = 0, e) : new s(t.west, t.north);
  }, w.northeast = function (t, e) {
    return f.typeOf.object("rectangle", t), p(e) ? (e.longitude = t.east, e.latitude = t.north, e.height = 0, e) : new s(t.east, t.north);
  }, w.southeast = function (t, e) {
    return f.typeOf.object("rectangle", t), p(e) ? (e.longitude = t.east, e.latitude = t.south, e.height = 0, e) : new s(t.east, t.south);
  }, w.center = function (t, e) {
    f.typeOf.object("rectangle", t);
    var n = t.east,
        a = t.west;
    n < a && (n += m.TWO_PI);
    var r = m.negativePiToPi(.5 * (a + n)),
        o = .5 * (t.south + t.north);
    return p(e) ? (e.longitude = r, e.latitude = o, e.height = 0, e) : new s(r, o);
  }, w.intersection = function (t, e, n) {
    f.typeOf.object("rectangle", t), f.typeOf.object("otherRectangle", e);
    var a = t.east,
        r = t.west,
        o = e.east,
        s = e.west;
    a < r && 0 < o ? a += m.TWO_PI : o < s && 0 < a && (o += m.TWO_PI), a < r && s < 0 ? s += m.TWO_PI : o < s && r < 0 && (r += m.TWO_PI);
    var u = m.negativePiToPi(Math.max(r, s)),
        i = m.negativePiToPi(Math.min(a, o));

    if (!((t.west < t.east || e.west < e.east) && i <= u)) {
      var h = Math.max(t.south, e.south),
          c = Math.min(t.north, e.north);
      if (!(c <= h)) return p(n) ? (n.west = u, n.south = h, n.east = i, n.north = c, n) : new w(u, h, i, c);
    }
  }, w.simpleIntersection = function (t, e, n) {
    f.typeOf.object("rectangle", t), f.typeOf.object("otherRectangle", e);
    var a = Math.max(t.west, e.west),
        r = Math.max(t.south, e.south),
        o = Math.min(t.east, e.east),
        s = Math.min(t.north, e.north);
    if (!(s <= r || o <= a)) return p(n) ? (n.west = a, n.south = r, n.east = o, n.north = s, n) : new w(a, r, o, s);
  }, w.union = function (t, e, n) {
    f.typeOf.object("rectangle", t), f.typeOf.object("otherRectangle", e), p(n) || (n = new w());
    var a = t.east,
        r = t.west,
        o = e.east,
        s = e.west;
    a < r && 0 < o ? a += m.TWO_PI : o < s && 0 < a && (o += m.TWO_PI), a < r && s < 0 ? s += m.TWO_PI : o < s && r < 0 && (r += m.TWO_PI);
    var u = m.convertLongitudeRange(Math.min(r, s)),
        i = m.convertLongitudeRange(Math.max(a, o));
    return n.west = u, n.south = Math.min(t.south, e.south), n.east = i, n.north = Math.max(t.north, e.north), n;
  }, w.expand = function (t, e, n) {
    return f.typeOf.object("rectangle", t), f.typeOf.object("cartographic", e), p(n) || (n = new w()), n.west = Math.min(t.west, e.longitude), n.south = Math.min(t.south, e.latitude), n.east = Math.max(t.east, e.longitude), n.north = Math.max(t.north, e.latitude), n;
  }, w.contains = function (t, e) {
    f.typeOf.object("rectangle", t), f.typeOf.object("cartographic", e);
    var n = e.longitude,
        a = e.latitude,
        r = t.west,
        o = t.east;
    return o < r && (o += m.TWO_PI, n < 0 && (n += m.TWO_PI)), (r < n || m.equalsEpsilon(n, r, m.EPSILON14)) && (n < o || m.equalsEpsilon(n, o, m.EPSILON14)) && a >= t.south && a <= t.north;
  };
  var l = new s();
  return w.subsample = function (t, e, n, a) {
    f.typeOf.object("rectangle", t), e = O(e, d.WGS84), n = O(n, 0), p(a) || (a = []);
    var r = 0,
        o = t.north,
        s = t.south,
        u = t.east,
        i = t.west,
        h = l;
    h.height = n, h.longitude = i, h.latitude = o, a[r] = e.cartographicToCartesian(h, a[r]), r++, h.longitude = u, a[r] = e.cartographicToCartesian(h, a[r]), r++, h.latitude = s, a[r] = e.cartographicToCartesian(h, a[r]), r++, h.longitude = i, a[r] = e.cartographicToCartesian(h, a[r]), r++, h.latitude = o < 0 ? o : 0 < s ? s : 0;

    for (var c = 1; c < 8; ++c) {
      h.longitude = -Math.PI + c * m.PI_OVER_TWO, w.contains(t, h) && (a[r] = e.cartographicToCartesian(h, a[r]), r++);
    }

    return 0 === h.latitude && (h.longitude = i, a[r] = e.cartographicToCartesian(h, a[r]), r++, h.longitude = u, a[r] = e.cartographicToCartesian(h, a[r]), r++), a.length = r, a;
  }, w.MAX_VALUE = e(new w(-Math.PI, -m.PI_OVER_TWO, Math.PI, m.PI_OVER_TWO)), w;
});