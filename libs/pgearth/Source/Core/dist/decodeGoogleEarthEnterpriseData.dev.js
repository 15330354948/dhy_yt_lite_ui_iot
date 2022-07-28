"use strict";

define(["./Check", "./RuntimeError"], function (U, c) {
  "use strict";

  var w = 1953029805,
      y = 2917034100;

  function b(t, e) {
    if (b.passThroughDataForTesting) return e;
    U.typeOf.object("key", t), U.typeOf.object("data", e);
    var n = t.byteLength;
    if (0 === n || n % 4 != 0) throw new c("The length of key must be greater than 0 and a multiple of 4.");
    var i = new DataView(e),
        r = i.getUint32(0, !0);
    if (r === w || r === y) return e;

    for (var a, g = new DataView(t), o = 0, f = e.byteLength, s = f - f % 8, h = n, u = 8; o < s;) {
      for (a = u = (u + 8) % 24; o < s && a < h;) {
        i.setUint32(o, i.getUint32(o, !0) ^ g.getUint32(a, !0), !0), i.setUint32(o + 4, i.getUint32(o + 4, !0) ^ g.getUint32(a + 4, !0), !0), o += 8, a += 24;
      }
    }

    if (o < f) for (h <= a && (a = u = (u + 8) % 24); o < f;) {
      i.setUint8(o, i.getUint8(o) ^ g.getUint8(a)), o++, a++;
    }
  }

  return b.passThroughDataForTesting = !1, b;
});