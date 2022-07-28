"use strict";

define(["./hasExtension", "../../Core/defined", "../../Core/isArray"], function (n, c, i) {
  "use strict";

  function v() {}

  return v.objectLegacy = function (e, r) {
    if (c(e)) for (var n in e) {
      if (e.hasOwnProperty(n)) {
        var t = r(e[n], n);
        if (c(t)) return t;
      }
    }
  }, v.object = function (e, r) {
    if (c(e)) for (var n = e.length, t = 0; t < n; t++) {
      var i = r(e[t], t);
      if (c(i)) return i;
    }
  }, v.topLevel = function (e, r, n) {
    var t = e[r];
    return c(t) && !i(t) ? v.objectLegacy(t, n) : v.object(t, n);
  }, v.accessor = function (e, r) {
    return v.topLevel(e, "accessors", r);
  }, v.accessorWithSemantic = function (e, t, i) {
    var u = {};
    return v.mesh(e, function (e) {
      return v.meshPrimitive(e, function (e) {
        var n = v.meshPrimitiveAttribute(e, function (e, r) {
          if (0 === r.indexOf(t) && !c(u[e]) && (u[e] = !0, n = i(e), c(n))) return n;
        });
        return c(n) ? n : v.meshPrimitiveTarget(e, function (e) {
          return v.meshPrimitiveTargetAttribute(e, function (e, r) {
            if (0 === r.indexOf(t) && !c(u[e]) && (u[e] = !0, n = i(e), c(n))) return n;
          });
        });
      });
    });
  }, v.accessorContainingVertexAttributeData = function (e, n) {
    var t = {};
    return v.mesh(e, function (e) {
      return v.meshPrimitive(e, function (e) {
        var r = v.meshPrimitiveAttribute(e, function (e) {
          if (!c(t[e]) && (t[e] = !0, r = n(e), c(r))) return r;
        });
        return c(r) ? r : v.meshPrimitiveTarget(e, function (e) {
          return v.meshPrimitiveTargetAttribute(e, function (e) {
            if (!c(t[e]) && (t[e] = !0, r = n(e), c(r))) return r;
          });
        });
      });
    });
  }, v.accessorContainingIndexData = function (e, t) {
    var i = {};
    return v.mesh(e, function (e) {
      return v.meshPrimitive(e, function (e) {
        var r = e.indices;

        if (c(r) && !c(i[r])) {
          i[r] = !0;
          var n = t(r);
          if (c(n)) return n;
        }
      });
    });
  }, v.animation = function (e, r) {
    return v.topLevel(e, "animations", r);
  }, v.animationChannel = function (e, r) {
    var n = e.channels;
    return v.object(n, r);
  }, v.animationSampler = function (e, r) {
    var n = e.samplers;
    return v.object(n, r);
  }, v.buffer = function (e, r) {
    return v.topLevel(e, "buffers", r);
  }, v.bufferView = function (e, r) {
    return v.topLevel(e, "bufferViews", r);
  }, v.camera = function (e, r) {
    return v.topLevel(e, "cameras", r);
  }, v.image = function (e, r) {
    return v.topLevel(e, "images", r);
  }, v.compressedImage = function (e, r) {
    if (c(e.extras)) {
      var n = e.extras.compressedImage3DTiles;

      for (var t in n) {
        if (n.hasOwnProperty(t)) {
          var i = r(n[t], t);
          if (c(i)) return i;
        }
      }
    }
  }, v.material = function (e, r) {
    return v.topLevel(e, "materials", r);
  }, v.materialValue = function (e, r) {
    var n = e.values;

    for (var t in c(e.extensions) && c(e.extensions.KHR_techniques_webgl) && (n = e.extensions.KHR_techniques_webgl.values), n) {
      if (n.hasOwnProperty(t)) {
        var i = r(n[t], t);
        if (c(i)) return i;
      }
    }
  }, v.mesh = function (e, r) {
    return v.topLevel(e, "meshes", r);
  }, v.meshPrimitive = function (e, r) {
    var n = e.primitives;
    if (c(n)) for (var t = n.length, i = 0; i < t; i++) {
      var u = r(n[i], i);
      if (c(u)) return u;
    }
  }, v.meshPrimitiveAttribute = function (e, r) {
    var n = e.attributes;

    for (var t in n) {
      if (n.hasOwnProperty(t)) {
        var i = r(n[t], t);
        if (c(i)) return i;
      }
    }
  }, v.meshPrimitiveTarget = function (e, r) {
    var n = e.targets;
    if (c(n)) for (var t = n.length, i = 0; i < t; ++i) {
      var u = r(n[i], i);
      if (c(u)) return u;
    }
  }, v.meshPrimitiveTargetAttribute = function (e, r) {
    for (var n in e) {
      if (e.hasOwnProperty(n)) {
        var t = r(e[n], n);
        if (c(t)) return t;
      }
    }
  }, v.node = function (e, r) {
    return v.topLevel(e, "nodes", r);
  }, v.nodeInTree = function (e, r, n) {
    var t = e.nodes;
    if (c(t)) for (var i = r.length, u = 0; u < i; u++) {
      var o = r[u],
          a = t[o];

      if (c(a)) {
        var f = n(a, o);
        if (c(f)) return f;
        var s = a.children;
        if (c(s) && (f = v.nodeInTree(e, s, n), c(f))) return f;
      }
    }
  }, v.nodeInScene = function (e, r, n) {
    var t = r.nodes;
    if (c(t)) return v.nodeInTree(e, t, n);
  }, v.program = function (e, r) {
    return n(e, "KHR_techniques_webgl") ? v.object(e.extensions.KHR_techniques_webgl.programs, r) : v.topLevel(e, "programs", r);
  }, v.sampler = function (e, r) {
    return v.topLevel(e, "samplers", r);
  }, v.scene = function (e, r) {
    return v.topLevel(e, "scenes", r);
  }, v.shader = function (e, r) {
    return n(e, "KHR_techniques_webgl") ? v.object(e.extensions.KHR_techniques_webgl.shaders, r) : v.topLevel(e, "shaders", r);
  }, v.skin = function (e, r) {
    return v.topLevel(e, "skins", r);
  }, v.techniqueAttribute = function (e, r) {
    var n = e.attributes;

    for (var t in n) {
      if (n.hasOwnProperty(t)) {
        var i = r(n[t], t);
        if (c(i)) return i;
      }
    }
  }, v.techniqueUniform = function (e, r) {
    var n = e.uniforms;

    for (var t in n) {
      if (n.hasOwnProperty(t)) {
        var i = r(n[t], t);
        if (c(i)) return i;
      }
    }
  }, v.techniqueParameter = function (e, r) {
    var n = e.parameters;

    for (var t in n) {
      if (n.hasOwnProperty(t)) {
        var i = r(n[t], t);
        if (c(i)) return i;
      }
    }
  }, v.technique = function (e, r) {
    return n(e, "KHR_techniques_webgl") ? v.object(e.extensions.KHR_techniques_webgl.techniques, r) : v.topLevel(e, "techniques", r);
  }, v.texture = function (e, r) {
    return v.topLevel(e, "textures", r);
  }, v;
});