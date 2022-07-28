"use strict";

define(["../Core/CompressedTextureBuffer", "../Core/defined", "../Core/PixelFormat", "../Core/RuntimeError", "../ThirdParty/crunch", "./createTaskProcessorWorker"], function (h, w, A, l, p, r) {
  "use strict";

  var v,
      T,
      e = 1,
      t = 2,
      U = {};
  U[0] = A.RGB_DXT1, U[e] = A.RGBA_DXT3, U[t] = A.RGBA_DXT5;
  var g = 0;
  return r(function (r, e) {
    var t = r.byteLength,
        n = new Uint8Array(r),
        o = p._malloc(t);

    !function (r, e, t, n) {
      for (var o = t / 4, f = n % 4, a = new Uint32Array(r.buffer, 0, (n - f) / 4), s = new Uint32Array(e.buffer), _ = 0; _ < a.length; _++) {
        s[o + _] = a[_];
      }

      for (_ = n - f; _ < n; _++) {
        e[t + _] = r[_];
      }
    }(n, p.HEAPU8, o, t);

    var f = p._crn_get_dxt_format(o, t),
        a = U[f];

    if (!w(a)) throw new l("Unsupported compressed format.");

    for (var s = p._crn_get_levels(o, t), _ = p._crn_get_width(o, t), c = p._crn_get_height(o, t), i = 0, u = 0; u < s; ++u) {
      i += A.compressedTextureSizeInBytes(a, _ >> u, c >> u);
    }

    g < i && (w(v) && p._free(v), v = p._malloc(i), T = new Uint8Array(p.HEAPU8.buffer, v, i), g = i), p._crn_decompress(o, t, v, i, 0, s), p._free(o);
    var d = A.compressedTextureSizeInBytes(a, _, c),
        m = T.subarray(0, d),
        y = new Uint8Array(d);
    return y.set(m, 0), e.push(y.buffer), new h(a, _, c, y);
  });
});