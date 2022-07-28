"use strict";

define(["../Core/freezeObject", "../Core/WebGLConstants"], function (_, N) {
  "use strict";

  var S = {
    UNSIGNED_BYTE: N.UNSIGNED_BYTE,
    UNSIGNED_SHORT: N.UNSIGNED_SHORT,
    UNSIGNED_INT: N.UNSIGNED_INT,
    FLOAT: N.FLOAT,
    HALF_FLOAT: N.HALF_FLOAT_OES,
    UNSIGNED_INT_24_8: N.UNSIGNED_INT_24_8,
    UNSIGNED_SHORT_4_4_4_4: N.UNSIGNED_SHORT_4_4_4_4,
    UNSIGNED_SHORT_5_5_5_1: N.UNSIGNED_SHORT_5_5_5_1,
    UNSIGNED_SHORT_5_6_5: N.UNSIGNED_SHORT_5_6_5,
    isPacked: function isPacked(_) {
      return _ === S.UNSIGNED_INT_24_8 || _ === S.UNSIGNED_SHORT_4_4_4_4 || _ === S.UNSIGNED_SHORT_5_5_5_1 || _ === S.UNSIGNED_SHORT_5_6_5;
    },
    sizeInBytes: function sizeInBytes(_) {
      switch (_) {
        case S.UNSIGNED_BYTE:
          return 1;

        case S.UNSIGNED_SHORT:
        case S.UNSIGNED_SHORT_4_4_4_4:
        case S.UNSIGNED_SHORT_5_5_5_1:
        case S.UNSIGNED_SHORT_5_6_5:
        case S.HALF_FLOAT:
          return 2;

        case S.UNSIGNED_INT:
        case S.FLOAT:
        case S.UNSIGNED_INT_24_8:
          return 4;
      }
    },
    validate: function validate(_) {
      return _ === S.UNSIGNED_BYTE || _ === S.UNSIGNED_SHORT || _ === S.UNSIGNED_INT || _ === S.FLOAT || _ === S.HALF_FLOAT || _ === S.UNSIGNED_INT_24_8 || _ === S.UNSIGNED_SHORT_4_4_4_4 || _ === S.UNSIGNED_SHORT_5_5_5_1 || _ === S.UNSIGNED_SHORT_5_6_5;
    }
  };
  return _(S);
});