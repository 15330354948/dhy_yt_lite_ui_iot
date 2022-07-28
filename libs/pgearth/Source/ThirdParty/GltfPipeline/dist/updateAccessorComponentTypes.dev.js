"use strict";

define(["./addBuffer", "./ForEach", "./readAccessorPacked", "../../Core/ComponentDatatype", "../../Core/WebGLConstants"], function (o, e, a, s, c) {
  "use strict";

  function T(e, n, r) {
    var t = s.createTypedArray(r, a(e, n)),
        c = new Uint8Array(t.buffer);
    n.bufferView = o(e, c), n.componentType = r, n.byteOffset = 0;
  }

  return function (r) {
    var t;
    return e.accessorWithSemantic(r, "JOINTS_0", function (e) {
      var n = r.accessors[e];
      (t = n.componentType) === c.BYTE ? T(r, n, s.UNSIGNED_BYTE) : t !== c.UNSIGNED_BYTE && t !== c.UNSIGNED_SHORT && T(r, n, s.UNSIGNED_SHORT);
    }), e.accessorWithSemantic(r, "WEIGHTS_0", function (e) {
      var n = r.accessors[e];
      (t = n.componentType) === c.BYTE ? T(r, n, s.UNSIGNED_BYTE) : t === c.SHORT && T(r, n, s.UNSIGNED_SHORT);
    }), r;
  };
});