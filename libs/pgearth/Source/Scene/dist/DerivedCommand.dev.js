"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Renderer/DrawCommand", "../Renderer/RenderState", "../Renderer/ShaderSource"], function (e, g, s, f, l) {
  "use strict";

  function r() {}

  var u = /\bgl_FragDepthEXT\b/,
      p = /\bdiscard\b/;

  r.createDepthOnlyDerivedCommand = function (e, r, a, n) {
    var d, o, t, m, i, h, c;
    return g(n) || (n = {}), g(n.depthOnlyCommand) && (d = n.depthOnlyCommand.shaderProgram, o = n.depthOnlyCommand.renderState), n.depthOnlyCommand = s.shallowClone(r, n.depthOnlyCommand), g(d) && n.shaderProgramId === r.shaderProgram.id ? (n.depthOnlyCommand.shaderProgram = d, n.depthOnlyCommand.renderState = o) : (n.depthOnlyCommand.shaderProgram = function (e, r) {
      var a = e.shaderCache.getDerivedShaderProgram(r, "depthOnly");

      if (!g(a)) {
        for (var n = r._attributeLocations, d = r.fragmentShaderSource, o = !1, t = d.sources, m = t.length, i = 0; i < m; ++i) {
          if (u.test(t[i]) || p.test(t[i])) {
            o = !0;
            break;
          }
        }

        var h = !1,
            c = d.defines,
            m = c.length;

        for (i = 0; i < m; ++i) {
          if ("LOG_DEPTH" === c[i]) {
            h = !0;
            break;
          }
        }

        o || h ? !o && h && (d = new l({
          defines: ["LOG_DEPTH"],
          sources: ["#ifdef GL_EXT_frag_depth \n#extension GL_EXT_frag_depth : enable \n#endif \n\nvoid main() \n{ \n    gl_FragColor = vec4(1.0); \n    czm_writeLogDepth(); \n} \n"]
        })) : d = new l({
          sources: ["void main() \n{ \n    gl_FragColor = vec4(1.0); \n} \n"]
        }), a = e.shaderCache.createDerivedShaderProgram(r, "depthOnly", {
          vertexShaderSource: r.vertexShaderSource,
          fragmentShaderSource: d,
          attributeLocations: n
        });
      }

      return a;
    }(a, r.shaderProgram), n.depthOnlyCommand.renderState = (t = e, m = r.renderState, h = t._depthOnlyRenderStateCache, c = h[m.id], g(c) || ((i = f.getState(m)).depthMask = !0, i.colorMask = {
      red: !1,
      green: !1,
      blue: !1,
      alpha: !1
    }, c = f.fromCache(i), h[m.id] = c), c), n.shaderProgramId = r.shaderProgram.id), n;
  };

  var S = /\s+czm_writeLogDepth\(/,
      _ = /\s+czm_vertexLogDepth\(/,
      C = /\s*#extension\s+GL_EXT_frag_depth\s*:\s*enable/;
  return r.createLogDepthCommand = function (e, r, a) {
    var n;
    return g(a) || (a = {}), g(a.command) && (n = a.command.shaderProgram), a.command = s.shallowClone(e, a.command), g(n) && a.shaderProgramId === e.shaderProgram.id ? a.command.shaderProgram = n : (a.command.shaderProgram = function (e, r) {
      var a = e.shaderCache.getDerivedShaderProgram(r, "logDepth");

      if (!g(a)) {
        var n = r._attributeLocations,
            d = r.vertexShaderSource.clone(),
            o = r.fragmentShaderSource.clone();
        d.defines = g(d.defines) ? d.defines.slice(0) : [], d.defines.push("LOG_DEPTH"), o.defines = g(o.defines) ? o.defines.slice(0) : [], o.defines.push("LOG_DEPTH");

        for (var t = !1, m = d.sources, i = m.length, h = 0; h < i; ++h) {
          if (_.test(m[h])) {
            t = !0;
            break;
          }
        }

        if (!t) {
          for (h = 0; h < i; ++h) {
            m[h] = l.replaceMain(m[h], "czm_log_depth_main");
          }

          m.push("\n\nvoid main() \n{ \n    czm_log_depth_main(); \n    czm_vertexLogDepth(); \n} \n");
        }

        var c = !0,
            t = !1,
            i = (m = o.sources).length;

        for (h = 0; h < i; ++h) {
          S.test(m[h]) && (t = !0), C.test(m[h]) && (c = !1);
        }

        var s = "";

        if (c && (s += "#ifdef GL_EXT_frag_depth \n#extension GL_EXT_frag_depth : enable \n#endif \n\n"), !t) {
          for (h = 0; h < i; h++) {
            m[h] = l.replaceMain(m[h], "czm_log_depth_main");
          }

          s += "\nvoid main() \n{ \n    czm_log_depth_main(); \n    czm_writeLogDepth(); \n} \n";
        }

        m.push(s), a = e.shaderCache.createDerivedShaderProgram(r, "logDepth", {
          vertexShaderSource: d,
          fragmentShaderSource: o,
          attributeLocations: n
        });
      }

      return a;
    }(r, e.shaderProgram), a.shaderProgramId = e.shaderProgram.id), a;
  }, r.createPickDerivedCommand = function (e, r, a, n) {
    var d, o, t, m, i, h, c;
    return g(n) || (n = {}), g(n.pickCommand) && (d = n.pickCommand.shaderProgram, o = n.pickCommand.renderState), n.pickCommand = s.shallowClone(r, n.pickCommand), g(d) && n.shaderProgramId === r.shaderProgram.id ? (n.pickCommand.shaderProgram = d, n.pickCommand.renderState = o) : (n.pickCommand.shaderProgram = function (e, r, a) {
      var n = e.shaderCache.getDerivedShaderProgram(r, "pick");

      if (!g(n)) {
        for (var d = r._attributeLocations, o = r.fragmentShaderSource, t = o.sources, m = t.length, i = "void main() \n{ \n    czm_non_pick_main(); \n    if (gl_FragColor.a == 0.0) { \n        discard; \n    } \n    gl_FragColor = " + a + "; \n} \n", h = new Array(m + 1), c = 0; c < m; ++c) {
          h[c] = l.replaceMain(t[c], "czm_non_pick_main");
        }

        h[m] = i, o = new l({
          sources: h,
          defines: o.defines
        }), n = e.shaderCache.createDerivedShaderProgram(r, "pick", {
          vertexShaderSource: r.vertexShaderSource,
          fragmentShaderSource: o,
          attributeLocations: d
        });
      }

      return n;
    }(a, r.shaderProgram, r.pickId), n.pickCommand.renderState = (t = e, m = r.renderState, h = t._pickRenderStateCache, c = h[m.id], g(c) || ((i = f.getState(m)).blending.enabled = !1, i.depthMask = !0, c = f.fromCache(i), h[m.id] = c), c), n.shaderProgramId = r.shaderProgram.id), n;
  }, r.createHdrCommand = function (e, r, a) {
    var n, d, o, t, m, i, h;
    return g(a) || (a = {}), g(a.command) && (n = a.command.shaderProgram), a.command = s.shallowClone(e, a.command), g(n) && a.shaderProgramId === e.shaderProgram.id ? a.command.shaderProgram = n : (a.command.shaderProgram = (d = r, o = e.shaderProgram, h = d.shaderCache.getDerivedShaderProgram(o, "HDR"), g(h) || (t = o._attributeLocations, m = o.vertexShaderSource.clone(), i = o.fragmentShaderSource.clone(), m.defines = g(m.defines) ? m.defines.slice(0) : [], m.defines.push("HDR"), i.defines = g(i.defines) ? i.defines.slice(0) : [], i.defines.push("HDR"), h = d.shaderCache.createDerivedShaderProgram(o, "HDR", {
      vertexShaderSource: m,
      fragmentShaderSource: i,
      attributeLocations: t
    })), h), a.shaderProgramId = e.shaderProgram.id), a;
  }, r;
});