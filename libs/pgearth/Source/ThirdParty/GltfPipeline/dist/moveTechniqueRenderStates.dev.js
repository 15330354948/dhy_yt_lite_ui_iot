"use strict";

define(["./addExtensionsUsed", "./ForEach", "../../Core/defaultValue", "../../Core/defined", "../../Core/WebGLConstants"], function (t, a, o, s, d) {
  "use strict";

  var c = [d.FUNC_ADD, d.FUNC_ADD],
      O = [d.ONE, d.ZERO, d.ONE, d.ZERO];

  function _(e, n) {
    var t = e.enable;
    return s(t) && -1 < t.indexOf(n);
  }

  var E = [d.ZERO, d.ONE, d.SRC_COLOR, d.ONE_MINUS_SRC_COLOR, d.SRC_ALPHA, d.ONE_MINUS_SRC_ALPHA, d.DST_ALPHA, d.ONE_MINUS_DST_ALPHA, d.DST_COLOR, d.ONE_MINUS_DST_COLOR];
  return function (e) {
    var r = {},
        u = {},
        n = e.techniques;
    return s(n) && (a.technique(e, function (e, n) {
      var t,
          a,
          i = e.states;
      s(i) && (t = u[n] = {}, _(i, d.BLEND) && (t.alphaMode = "BLEND", a = i.functions, s(a) && (s(a.blendEquationSeparate) || s(a.blendFuncSeparate)) && (r[n] = {
        blendEquation: o(a.blendEquationSeparate, c),
        blendFactors: function (e, n) {
          if (!s(e)) return n;

          for (var t = 0; t < 4; t++) {
            if (-1 === E.indexOf(e[t])) return n;
          }

          return e;
        }(a.blendFuncSeparate, O)
      })), _(i, d.CULL_FACE) || (t.doubleSided = !0), delete e.states);
    }), 0 < Object.keys(r).length && (s(e.extensions) || (e.extensions = {}), t(e, "KHR_blend")), a.material(e, function (t) {
      var e, n;
      s(t.technique) && (e = u[t.technique], a.objectLegacy(e, function (e, n) {
        t[n] = e;
      }), n = r[t.technique], s(n) && (s(t.extensions) || (t.extensions = {}), t.extensions.KHR_blend = n));
    })), e;
  };
});