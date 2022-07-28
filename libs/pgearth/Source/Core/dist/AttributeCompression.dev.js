"use strict";

define(["./Cartesian2", "./Cartesian3", "./Check", "./defined", "./DeveloperError", "./Math"], function (e, d, f, i, u, c) {
  "use strict";

  var s = {
    octEncodeInRange: function octEncodeInRange(e, n, t) {
      f.defined("vector", e), f.defined("result", t);
      var o,
          r,
          a = d.magnitudeSquared(e);
      if (Math.abs(a - 1) > c.EPSILON6) throw new u("vector must be normalized.");
      return t.x = e.x / (Math.abs(e.x) + Math.abs(e.y) + Math.abs(e.z)), t.y = e.y / (Math.abs(e.x) + Math.abs(e.y) + Math.abs(e.z)), e.z < 0 && (o = t.x, r = t.y, t.x = (1 - Math.abs(r)) * c.signNotZero(o), t.y = (1 - Math.abs(o)) * c.signNotZero(r)), t.x = c.toSNorm(t.x, n), t.y = c.toSNorm(t.y, n), t;
    },
    octEncode: function octEncode(e, n) {
      return s.octEncodeInRange(e, 255, n);
    }
  },
      t = new e(),
      n = new Uint8Array(1);

  function o(e) {
    return n[0] = e, n[0];
  }

  s.octEncodeToCartesian4 = function (e, n) {
    return s.octEncodeInRange(e, 65535, t), n.x = o(t.x * (1 / 256)), n.y = o(t.x), n.z = o(t.y * (1 / 256)), n.w = o(t.y), n;
  }, s.octDecodeInRange = function (e, n, t, o) {
    if (f.defined("result", o), e < 0 || t < e || n < 0 || t < n) throw new u("x and y must be unsigned normalized integers between 0 and " + t);
    var r;
    return o.x = c.fromSNorm(e, t), o.y = c.fromSNorm(n, t), o.z = 1 - (Math.abs(o.x) + Math.abs(o.y)), o.z < 0 && (r = o.x, o.x = (1 - Math.abs(o.y)) * c.signNotZero(r), o.y = (1 - Math.abs(r)) * c.signNotZero(o.y)), d.normalize(o, o);
  }, s.octDecode = function (e, n, t) {
    return s.octDecodeInRange(e, n, 255, t);
  }, s.octDecodeFromCartesian4 = function (e, n) {
    f.typeOf.object("encoded", e), f.typeOf.object("result", n);
    var t = e.x,
        o = e.y,
        r = e.z,
        a = e.w;
    if (t < 0 || 255 < t || o < 0 || 255 < o || r < 0 || 255 < r || a < 0 || 255 < a) throw new u("x, y, z, and w must be unsigned normalized integers between 0 and 255");
    var d = 256 * t + o,
        c = 256 * r + a;
    return s.octDecodeInRange(d, c, 65535, n);
  }, s.octPackFloat = function (e) {
    return f.defined("encoded", e), 256 * e.x + e.y;
  };
  var l = new e();

  function h(e) {
    return e >> 1 ^ -(1 & e);
  }

  return s.octEncodeFloat = function (e) {
    return s.octEncode(e, l), s.octPackFloat(l);
  }, s.octDecodeFloat = function (e, n) {
    f.defined("value", e);
    var t = e / 256,
        o = Math.floor(t),
        r = 256 * (t - o);
    return s.octDecode(o, r, n);
  }, s.octPack = function (e, n, t, o) {
    f.defined("v1", e), f.defined("v2", n), f.defined("v3", t), f.defined("result", o);
    var r = s.octEncodeFloat(e),
        a = s.octEncodeFloat(n),
        d = s.octEncode(t, l);
    return o.x = 65536 * d.x + r, o.y = 65536 * d.y + a, o;
  }, s.octUnpack = function (e, n, t, o) {
    f.defined("packed", e), f.defined("v1", n), f.defined("v2", t), f.defined("v3", o);
    var r = e.x / 65536,
        a = Math.floor(r),
        d = 65536 * (r - a),
        r = e.y / 65536,
        c = Math.floor(r),
        i = 65536 * (r - c);
    s.octDecodeFloat(d, n), s.octDecodeFloat(i, t), s.octDecode(a, c, o);
  }, s.compressTextureCoordinates = function (e) {
    return f.defined("textureCoordinates", e), 4096 * (4095 * e.x | 0) + (4095 * e.y | 0);
  }, s.decompressTextureCoordinates = function (e, n) {
    f.defined("compressed", e), f.defined("result", n);
    var t = e / 4096,
        o = Math.floor(t);
    return n.x = o / 4095, n.y = (e - 4096 * o) / 4095, n;
  }, s.zigZagDeltaDecode = function (e, n, t) {
    f.defined("uBuffer", e), f.defined("vBuffer", n), f.typeOf.number.equals("uBuffer.length", "vBuffer.length", e.length, n.length), i(t) && f.typeOf.number.equals("uBuffer.length", "heightBuffer.length", e.length, t.length);

    for (var o = e.length, r = 0, a = 0, d = 0, c = 0; c < o; ++c) {
      r += h(e[c]), a += h(n[c]), e[c] = r, n[c] = a, i(t) && (d += h(t[c]), t[c] = d);
    }
  }, s;
});