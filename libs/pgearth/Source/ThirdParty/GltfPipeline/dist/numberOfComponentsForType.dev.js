"use strict";

define([], function () {
  "use strict";

  return function (e) {
    switch (e) {
      case "SCALAR":
        return 1;

      case "VEC2":
        return 2;

      case "VEC3":
        return 3;

      case "VEC4":
      case "MAT2":
        return 4;

      case "MAT3":
        return 9;

      case "MAT4":
        return 16;
    }
  };
});