"use strict";

define(["./addExtensionsUsed", "./addExtensionsRequired", "./addToArray", "./ForEach", "../../Core/defined"], function (n, t, l, g, r) {
  "use strict";

  return function (o) {
    var d,
        c,
        e = o.techniques,
        h = {},
        m = {};
    return r(e) && (d = {
      programs: [],
      shaders: [],
      techniques: []
    }, c = o.glExtensionsUsed, delete o.glExtensionsUsed, g.technique(o, function (t, e) {
      var s,
          r = {
        name: t.name,
        program: void 0,
        attributes: {},
        uniforms: {}
      };
      g.techniqueAttribute(t, function (e, n) {
        s = t.parameters[e], r.attributes[n] = {
          semantic: s.semantic
        };
      }), g.techniqueUniform(t, function (e, n) {
        s = t.parameters[e], r.uniforms[n] = {
          count: s.count,
          node: s.node,
          type: s.type,
          semantic: s.semantic,
          value: s.value
        }, h[e] = n;
      });
      var n = o.programs[t.program],
          a = {
        name: n.name,
        fragmentShader: void 0,
        vertexShader: void 0,
        glExtensions: c
      },
          i = o.shaders[n.fragmentShader];
      a.fragmentShader = l(d.shaders, i, !0);
      var u = o.shaders[n.vertexShader];
      a.vertexShader = l(d.shaders, u, !0), r.program = l(d.programs, a), m[e] = l(d.techniques, r);
    }), 0 < d.techniques.length && (r(o.extensions) || (o.extensions = {}), o.extensions.KHR_techniques_webgl = d, n(o, "KHR_techniques_webgl"), t(o, "KHR_techniques_webgl"))), g.material(o, function (e) {
      var s;
      r(e.technique) && (s = {
        technique: m[e.technique]
      }, g.objectLegacy(e.values, function (e, n) {
        r(s.values) || (s.values = {});
        var t = h[n];
        s.values[t] = e;
      }), r(e.extensions) || (e.extensions = {}), e.extensions.KHR_techniques_webgl = s), delete e.technique, delete e.values;
    }), delete o.techniques, delete o.programs, delete o.shaders, o;
  };
});