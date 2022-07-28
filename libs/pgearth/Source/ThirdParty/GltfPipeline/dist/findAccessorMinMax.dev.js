"use strict";

define(["./getAccessorByteStride", "./getComponentReader", "./numberOfComponentsForType", "../../Core/arrayFill", "../../Core/ComponentDatatype", "../../Core/defined"], function (V, d, O, v, x, F) {
  "use strict";

  return function (e, r) {
    var t = e.bufferViews,
        n = e.buffers,
        f = r.bufferView,
        a = O(r.type);
    if (!F(r.bufferView)) return {
      min: v(new Array(a), 0),
      max: v(new Array(a), 0)
    };

    for (var o = v(new Array(a), Number.POSITIVE_INFINITY), i = v(new Array(a), Number.NEGATIVE_INFINITY), u = t[f], y = n[u.buffer].extras._pipeline.source, m = r.count, s = V(e, r), b = r.byteOffset + u.byteOffset + y.byteOffset, p = r.componentType, w = x.getSizeInBytes(p), I = new DataView(y.buffer), c = new Array(a), A = d(p), N = 0; N < m; N++) {
      A(I, b, a, w, c);

      for (var C = 0; C < a; C++) {
        var T = c[C];
        o[C] = Math.min(o[C], T), i[C] = Math.max(i[C], T);
      }

      b += s;
    }

    return {
      min: o,
      max: i
    };
  };
});