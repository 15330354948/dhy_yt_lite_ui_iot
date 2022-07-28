"use strict";

define(["./getAccessorByteStride", "./getComponentReader", "./numberOfComponentsForType", "../../Core/arrayFill", "../../Core/ComponentDatatype", "../../Core/defined"], function (m, C, d, O, V, g) {
  "use strict";

  return function (e, r) {
    var t = m(e, r),
        f = V.getSizeInBytes(r.componentType),
        n = d(r.type),
        o = r.count,
        i = new Array(n * o);
    if (!g(r.bufferView)) return O(i, 0), i;

    for (var u = e.bufferViews[r.bufferView], a = e.buffers[u.buffer].extras._pipeline.source, s = r.byteOffset + u.byteOffset + a.byteOffset, y = new DataView(a.buffer), p = new Array(n), b = C(r.componentType), c = 0; c < o; ++c) {
      b(y, s, n, f, p);

      for (var w = 0; w < n; ++w) {
        i[c * n + w] = p[w];
      }

      s += t;
    }

    return i;
  };
});