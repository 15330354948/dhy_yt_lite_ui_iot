"use strict";

define(["../Core/AttributeCompression", "../Core/Cartesian3", "../Core/Cartographic", "../Core/Ellipsoid", "../Core/IndexDatatype", "../Core/Math", "../Core/Rectangle", "./createTaskProcessorWorker"], function (G, M, W, z, H, O, Y, r) {
  "use strict";

  var Z = 32767,
      j = new W(),
      q = new M();
  var J = new Y(),
      K = new z(),
      Q = new M(),
      V = {
    min: void 0,
    max: void 0
  };
  var X = new M(),
      $ = new M(),
      rr = new M(),
      ar = new M(),
      er = new M();
  return r(function (r, a) {
    var e = new Uint16Array(r.positions),
        n = new Uint16Array(r.widths),
        t = new Uint32Array(r.counts),
        o = new Uint16Array(r.batchIds);
    !function (r) {
      r = new Float64Array(r);
      var a = 0;
      V.min = r[a++], V.max = r[a++], Y.unpack(r, a, J), a += Y.packedLength, z.unpack(r, a, K), a += z.packedLength, M.unpack(r, a, Q);
    }(r.packedBuffer);

    for (var u = Q, c = function (r, a, e, n, t) {
      var o = r.length / 3,
          u = r.subarray(0, o),
          c = r.subarray(o, 2 * o),
          i = r.subarray(2 * o, 3 * o);
      G.zigZagDeltaDecode(u, c, i);

      for (var s = new Float32Array(r.length), f = 0; f < o; ++f) {
        var p = u[f],
            b = c[f],
            d = i[f],
            w = O.lerp(a.west, a.east, p / Z),
            k = O.lerp(a.south, a.north, b / Z),
            y = O.lerp(e, n, d / Z),
            h = W.fromRadians(w, k, y, j),
            l = t.cartographicToCartesian(h, q);
        M.pack(l, s, 3 * f);
      }

      return s;
    }(e, J, V.min, V.max, K), i = c.length / 3, s = 4 * i - 4, f = new Float32Array(3 * s), p = new Float32Array(3 * s), b = new Float32Array(3 * s), d = new Float32Array(2 * s), w = new Uint16Array(s), k = 0, y = 0, h = 0, l = 0, v = t.length, A = 0; A < v; ++A) {
      for (var g, C, m, E = t[A], x = n[A], T = o[A], U = 0; U < E; ++U) {
        0 === U ? (g = M.unpack(c, 3 * l, X), C = M.unpack(c, 3 * (l + 1), $), m = M.subtract(g, C, rr), M.add(g, m, m)) : m = M.unpack(c, 3 * (l + U - 1), rr);
        var D,
            F,
            I,
            N = M.unpack(c, 3 * (l + U), ar);
        U === E - 1 ? (D = M.unpack(c, 3 * (l + E - 1), X), F = M.unpack(c, 3 * (l + E - 2), $), I = M.subtract(D, F, er), M.add(D, I, I)) : I = M.unpack(c, 3 * (l + U + 1), er), M.subtract(m, u, m), M.subtract(N, u, N), M.subtract(I, u, I);

        for (var P = U === E - 1 ? 2 : 4, R = 0 === U ? 2 : 0; R < P; ++R) {
          M.pack(N, f, k), M.pack(m, p, k), M.pack(I, b, k), k += 3;
          var S = R - 2 < 0 ? -1 : 1;
          d[y++] = R % 2 * 2 - 1, d[y++] = S * x, w[h++] = T;
        }
      }

      l += E;
    }

    var _ = H.createTypedArray(s, 6 * i - 6),
        L = 0,
        B = 0,
        v = i - 1;

    for (A = 0; A < v; ++A) {
      _[B++] = L, _[B++] = L + 2, _[B++] = L + 1, _[B++] = L + 1, _[B++] = L + 2, _[B++] = L + 3, L += 4;
    }

    return a.push(f.buffer, p.buffer, b.buffer), a.push(d.buffer, w.buffer, _.buffer), {
      indexDatatype: 2 === _.BYTES_PER_ELEMENT ? H.UNSIGNED_SHORT : H.UNSIGNED_INT,
      currentPositions: f.buffer,
      previousPositions: p.buffer,
      nextPositions: b.buffer,
      expandAndWidth: d.buffer,
      batchIds: w.buffer,
      indices: _.buffer
    };
  });
});