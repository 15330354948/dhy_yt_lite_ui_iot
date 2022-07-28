"use strict";

define(["./WebGLConstants"], function (r) {
  "use strict";

  return function (e) {
    switch (e) {
      case r.FLOAT:
        return "float";

      case r.FLOAT_VEC2:
        return "vec2";

      case r.FLOAT_VEC3:
        return "vec3";

      case r.FLOAT_VEC4:
        return "vec4";

      case r.FLOAT_MAT2:
        return "mat2";

      case r.FLOAT_MAT3:
        return "mat3";

      case r.FLOAT_MAT4:
        return "mat4";

      case r.SAMPLER_2D:
        return "sampler2D";

      case r.BOOL:
        return "bool";
    }
  };
});