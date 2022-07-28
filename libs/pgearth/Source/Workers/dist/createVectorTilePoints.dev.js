"use strict";

define(["../Core/AttributeCompression", "../Core/Cartesian3", "../Core/Cartographic", "../Core/Ellipsoid", "../Core/Math", "../Core/Rectangle", "./createTaskProcessorWorker"], function (b, y, A, x, D, F, r) {
  "use strict";

  var R = 32767,
      T = new A(),
      z = new y(),
      B = new F(),
      E = new x(),
      L = {
    min: void 0,
    max: void 0
  };
  return r(function (r, e) {
    var a = new Uint16Array(r.positions);
    !function (r) {
      r = new Float64Array(r);
      var e = 0;
      L.min = r[e++], L.max = r[e++], F.unpack(r, e, B), e += F.packedLength, x.unpack(r, e, E);
    }(r.packedBuffer);
    var n = B,
        o = E,
        t = L.min,
        i = L.max,
        s = a.length / 3,
        u = a.subarray(0, s),
        c = a.subarray(s, 2 * s),
        p = a.subarray(2 * s, 3 * s);
    b.zigZagDeltaDecode(u, c, p);

    for (var f = new Float64Array(a.length), l = 0; l < s; ++l) {
      var C = u[l],
          h = c[l],
          d = p[l],
          g = D.lerp(n.west, n.east, C / R),
          m = D.lerp(n.south, n.north, h / R),
          v = D.lerp(t, i, d / R),
          w = A.fromRadians(g, m, v, T),
          k = o.cartographicToCartesian(w, z);
      y.pack(k, f, 3 * l);
    }

    return e.push(f.buffer), {
      positions: f.buffer
    };
  });
});