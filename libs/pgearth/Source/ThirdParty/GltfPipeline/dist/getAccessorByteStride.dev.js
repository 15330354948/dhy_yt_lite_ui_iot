"use strict";

define(["./numberOfComponentsForType", "../../Core/ComponentDatatype", "../../Core/defined"], function (i, f, o) {
  "use strict";

  return function (e, t) {
    var r = t.bufferView;

    if (o(r)) {
      var n = e.bufferViews[r];
      if (o(n.byteStride) && 0 < n.byteStride) return n.byteStride;
    }

    return f.getSizeInBytes(t.componentType) * i(t.type);
  };
});