"use strict";

define(["../../Core/ComponentDatatype"], function (n) {
  "use strict";

  return function (t) {
    switch (t) {
      case n.BYTE:
        return function (t, n, r, e, o) {
          for (var a = 0; a < r; ++a) {
            o[a] = t.getInt8(n + a * e);
          }
        };

      case n.UNSIGNED_BYTE:
        return function (t, n, r, e, o) {
          for (var a = 0; a < r; ++a) {
            o[a] = t.getUint8(n + a * e);
          }
        };

      case n.SHORT:
        return function (t, n, r, e, o) {
          for (var a = 0; a < r; ++a) {
            o[a] = t.getInt16(n + a * e, !0);
          }
        };

      case n.UNSIGNED_SHORT:
        return function (t, n, r, e, o) {
          for (var a = 0; a < r; ++a) {
            o[a] = t.getUint16(n + a * e, !0);
          }
        };

      case n.INT:
        return function (t, n, r, e, o) {
          for (var a = 0; a < r; ++a) {
            o[a] = t.getInt32(n + a * e, !0);
          }
        };

      case n.UNSIGNED_INT:
        return function (t, n, r, e, o) {
          for (var a = 0; a < r; ++a) {
            o[a] = t.getUint32(n + a * e, !0);
          }
        };

      case n.FLOAT:
        return function (t, n, r, e, o) {
          for (var a = 0; a < r; ++a) {
            o[a] = t.getFloat32(n + a * e, !0);
          }
        };

      case n.DOUBLE:
        return function (t, n, r, e, o) {
          for (var a = 0; a < r; ++a) {
            o[a] = t.getFloat64(n + a * e, !0);
          }
        };
    }
  };
});