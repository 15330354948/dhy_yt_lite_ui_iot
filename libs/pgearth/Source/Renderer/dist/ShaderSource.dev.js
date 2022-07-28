"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/DeveloperError", "../Renderer/modernizeShader", "../Shaders/Builtin/CzmBuiltins", "./AutomaticUniforms"], function (r, h, m, g, n, e) {
  "use strict";

  function v(n) {
    return (n = n.replace(/\/\/.*/g, "")).replace(/\/\*\*[\s\S]*?\*\//gm, function (n) {
      for (var e = n.match(/\n/gm).length, r = "", i = 0; i < e; ++i) {
        r += "\n";
      }

      return r;
    });
  }

  function a(n, e, r) {
    for (var i, o = 0; o < r.length; ++o) {
      r[o].name === n && (i = r[o]);
    }

    return h(i) || (i = {
      name: n,
      glslSource: e = v(e),
      dependsOn: [],
      requiredBy: [],
      evaluated: !1
    }, r.push(i)), i;
  }

  function _(n) {
    var e = [],
        r = a("main", n, e);
    !function r(i, o) {
      var t;
      i.evaluated || (i.evaluated = !0, t = i.glslSource.match(/\bczm_[a-zA-Z0-9_]*/g), h(t) && null !== t && (t = t.filter(function (n, e) {
        return t.indexOf(n) === e;
      })).forEach(function (n) {
        var e;
        n !== i.name && C._czmBuiltinsAndUniforms.hasOwnProperty(n) && (e = a(n, C._czmBuiltinsAndUniforms[n], o), i.dependsOn.push(e), e.requiredBy.push(i), r(e, o));
      }));
    }(r, e), function (n) {
      for (var e = [], r = []; 0 < n.length;) {
        var i = n.pop();
        r.push(i), 0 === i.requiredBy.length && e.push(i);
      }

      for (; 0 < e.length;) {
        var o = e.shift();
        n.push(o);

        for (var t = 0; t < o.dependsOn.length; ++t) {
          var a = o.dependsOn[t],
              u = a.requiredBy.indexOf(o);
          a.requiredBy.splice(u, 1), 0 === a.requiredBy.length && e.push(a);
        }
      }

      for (var l = [], c = 0; c < r.length; ++c) {
        0 !== r[c].requiredBy.length && l.push(r[c]);
      }

      if (0 !== l.length) {
        for (var s = "A circular dependency was found in the following built-in functions/structs/constants: \n", f = 0; f < l.length; ++f) {
          s = s + l[f].name + "\n";
        }

        throw new m(s);
      }
    }(e);

    for (var i = "", o = e.length - 1; 0 <= o; --o) {
      i = i + e[o].glslSource + "\n";
    }

    return i.replace(r.glslSource, "");
  }

  function i(n, e, r) {
    var i,
        o,
        t = "",
        a = n.sources;
    if (h(a)) for (f = 0, i = a.length; f < i; ++f) {
      t += "\n#line 0\n" + a[f];
    }
    t = (t = v(t)).replace(/#version\s+(.*?)\n/gm, function (n, e) {
      if (h(o) && o !== e) throw new m("inconsistent versions found: " + o + " and " + e);
      return o = e, "\n";
    });
    var u = [];
    t = (t = t.replace(/#extension.*\n/gm, function (n) {
      return u.push(n), "\n";
    })).replace(/precision\s(lowp|mediump|highp)\s(float|int);/, "");
    var l = n.pickColorQualifier;
    h(l) && (t = C.createPickFragmentShaderSource(t, l));
    var c = "";
    h(o) && (c = "#version " + o + "\n");

    for (var s = u.length, f = 0; f < s; f++) {
      c += u[f];
    }

    e && (c += "#ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n#else\n    precision mediump float;\n#endif\n\n");
    var d = n.defines;
    if (h(d)) for (f = 0, i = d.length; f < i; ++f) {
      var p = d[f];
      0 !== p.length && (c += "#define " + p + "\n");
    }
    return r.webgl2 && (c += "#define OUTPUT_DECLARATION\n\n"), r.textureFloatLinear && (c += "#define OES_texture_float_linear\n\n"), n.includeBuiltIns && (c += _(t)), c += "\n#line 0\n", c += t, r.webgl2 && (c = g(c, e, !0)), c;
  }

  function C(n) {
    var e = (n = r(n, r.EMPTY_OBJECT)).pickColorQualifier;
    if (h(e) && "uniform" !== e && "varying" !== e) throw new m("options.pickColorQualifier must be 'uniform' or 'varying'.");
    this.defines = h(n.defines) ? n.defines.slice(0) : [], this.sources = h(n.sources) ? n.sources.slice(0) : [], this.pickColorQualifier = e, this.includeBuiltIns = r(n.includeBuiltIns, !0);
  }

  for (var o in C.prototype.clone = function () {
    return new C({
      sources: this.sources,
      defines: this.defines,
      pickColorQualifier: this.pickColorQualifier,
      includeBuiltIns: this.includeBuiltIns
    });
  }, C.replaceMain = function (n, e) {
    return e = "void " + e + "()", n.replace(/void\s+main\s*\(\s*(?:void)?\s*\)/g, e);
  }, C.prototype.createCombinedVertexShader = function (n) {
    return i(this, !1, n);
  }, C.prototype.createCombinedFragmentShader = function (n) {
    return i(this, !0, n);
  }, C._czmBuiltinsAndUniforms = {}, n) {
    n.hasOwnProperty(o) && (C._czmBuiltinsAndUniforms[o] = n[o]);
  }

  for (var t in e) {
    var u;
    !e.hasOwnProperty(t) || "function" == typeof (u = e[t]).getDeclaration && (C._czmBuiltinsAndUniforms[t] = u.getDeclaration(t));
  }

  C.createPickVertexShaderSource = function (n) {
    return C.replaceMain(n, "czm_old_main") + "\nattribute vec4 pickColor; \nvarying vec4 czm_pickColor; \nvoid main() \n{ \n    czm_old_main(); \n    czm_pickColor = pickColor; \n}";
  }, C.createPickFragmentShaderSource = function (n, e) {
    return C.replaceMain(n, "czm_old_main") + "\n" + (e + " vec4 czm_pickColor; \nvoid main() \n{ \n    czm_old_main(); \n    if (gl_FragColor.a == 0.0) { \n       discard; \n    } \n    gl_FragColor = czm_pickColor; \n}");
  }, C.findVarying = function (n, e) {
    for (var r = n.sources, i = e.length, o = 0; o < i; ++o) {
      for (var t = e[o], a = r.length, u = 0; u < a; ++u) {
        if (-1 !== r[u].indexOf(t)) return t;
      }
    }
  };
  var l = ["v_normalEC", "v_normal"];

  C.findNormalVarying = function (n) {
    return C.findVarying(n, l);
  };

  var c = ["v_positionEC"];
  return C.findPositionVarying = function (n) {
    return C.findVarying(n, c);
  }, C;
});