"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "./Appearance"], function (u, s, e, l, v) {
  "use strict";

  function t(e) {
    var t = (e = u(e, u.EMPTY_OBJECT)).attributeName,
        r = e.perInstanceAttribute;
    if (!s(t)) throw new l("options.attributeName is required.");
    s(r) || (r = !1);
    var n,
        a = u(e.glslDatatype, "vec3"),
        o = "v_" + t;
    if ("normal" === t || "tangent" === t || "bitangent" === t) n = "vec4 getColor() { return vec4((" + o + " + vec3(1.0)) * 0.5, 1.0); }\n";else switch ("st" === t && (a = "vec2"), a) {
      case "float":
        n = "vec4 getColor() { return vec4(vec3(" + o + "), 1.0); }\n";
        break;

      case "vec2":
        n = "vec4 getColor() { return vec4(" + o + ", 0.0, 1.0); }\n";
        break;

      case "vec3":
        n = "vec4 getColor() { return vec4(" + o + ", 1.0); }\n";
        break;

      case "vec4":
        n = "vec4 getColor() { return " + o + "; }\n";
        break;

      default:
        throw new l("options.glslDatatype must be float, vec2, vec3, or vec4.");
    }
    var i = "attribute vec3 position3DHigh;\nattribute vec3 position3DLow;\nattribute float batchId;\n" + (r ? "" : "attribute " + a + " " + t + ";\n") + "varying " + a + " " + o + ";\nvoid main()\n{\nvec4 p = czm_translateRelativeToEye(position3DHigh, position3DLow);\n" + (r ? o + " = czm_batchTable_" + t + "(batchId);\n" : o + " = " + t + ";\n") + "gl_Position = czm_modelViewProjectionRelativeToEye * p;\n}",
        c = "varying " + a + " " + o + ";\n" + n + "\nvoid main()\n{\ngl_FragColor = getColor();\n}";
    this.material = void 0, this.translucent = u(e.translucent, !1), this._vertexShaderSource = u(e.vertexShaderSource, i), this._fragmentShaderSource = u(e.fragmentShaderSource, c), this._renderState = v.getDefaultRenderState(!1, !1, e.renderState), this._closed = u(e.closed, !1), this._attributeName = t, this._glslDatatype = a;
  }

  return e(t.prototype, {
    vertexShaderSource: {
      get: function get() {
        return this._vertexShaderSource;
      }
    },
    fragmentShaderSource: {
      get: function get() {
        return this._fragmentShaderSource;
      }
    },
    renderState: {
      get: function get() {
        return this._renderState;
      }
    },
    closed: {
      get: function get() {
        return this._closed;
      }
    },
    attributeName: {
      get: function get() {
        return this._attributeName;
      }
    },
    glslDatatype: {
      get: function get() {
        return this._glslDatatype;
      }
    }
  }), t.prototype.getFragmentShaderSource = v.prototype.getFragmentShaderSource, t.prototype.isTranslucent = v.prototype.isTranslucent, t.prototype.getRenderState = v.prototype.getRenderState, t;
});