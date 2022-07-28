"use strict";

define(["./addToArray", "./ForEach", "./getAccessorByteStride", "../../Core/defaultValue", "../../Core/defined", "../../Core/WebGLConstants"], function (a, c, s, u, l, o) {
  "use strict";

  function f(e) {
    l(e) && (e.texCoord = u(e.texCoord, 0));
  }

  return function (r) {
    c.accessor(r, function (e) {
      l(e.bufferView) && (e.byteOffset = u(e.byteOffset, 0));
    }), c.bufferView(r, function (e) {
      l(e.buffer) && (e.byteOffset = u(e.byteOffset, 0));
    }), c.mesh(r, function (e) {
      c.meshPrimitive(e, function (e) {
        e.mode = u(e.mode, o.TRIANGLES), l(e.material) || (l(r.materials) || (r.materials = []), e.material = a(r.materials, {
          name: "default"
        }));
      });
    }), c.accessorContainingVertexAttributeData(r, function (e) {
      var a,
          t = r.accessors[e],
          n = t.bufferView;
      t.normalized = u(t.normalized, !1), l(n) && ((a = r.bufferViews[n]).byteStride = s(r, t), a.target = o.ARRAY_BUFFER);
    }), c.accessorContainingIndexData(r, function (e) {
      var a = r.accessors[e].bufferView;
      l(a) && (r.bufferViews[a].target = o.ELEMENT_ARRAY_BUFFER);
    }), c.material(r, function (e) {
      var a = u(e.extensions, u.EMPTY_OBJECT),
          t = a.KHR_materials_common;

      if (l(t)) {
        var n = t.technique,
            r = l(t.values) ? t.values : {};
        return (t.values = r).ambient = l(r.ambient) ? r.ambient : [0, 0, 0, 1], r.emission = l(r.emission) ? r.emission : [0, 0, 0, 1], r.transparency = u(r.transparency, 1), r.transparent = u(r.transparent, !1), r.doubleSided = u(r.doubleSided, !1), void ("CONSTANT" !== n && (r.diffuse = l(r.diffuse) ? r.diffuse : [0, 0, 0, 1], "LAMBERT" !== n && (r.specular = l(r.specular) ? r.specular : [0, 0, 0, 1], r.shininess = u(r.shininess, 0))));
      }

      e.emissiveFactor = u(e.emissiveFactor, [0, 0, 0]), e.alphaMode = u(e.alphaMode, "OPAQUE"), e.doubleSided = u(e.doubleSided, !1), "MASK" === e.alphaMode && (e.alphaCutoff = u(e.alphaCutoff, .5));
      var i = a.KHR_techniques_webgl;
      l(i) && c.materialValue(e, function (e) {
        l(e.index) && f(e);
      }), f(e.emissiveTexture), f(e.normalTexture), f(e.occlusionTexture);
      var s = e.pbrMetallicRoughness;
      l(s) && (s.baseColorFactor = u(s.baseColorFactor, [1, 1, 1, 1]), s.metallicFactor = u(s.metallicFactor, 1), s.roughnessFactor = u(s.roughnessFactor, 1), f(s.baseColorTexture), f(s.metallicRoughnessTexture));
      var o = a.pbrSpecularGlossiness;
      l(o) && (o.diffuseFactor = u(o.diffuseFactor, [1, 1, 1, 1]), o.specularFactor = u(o.specularFactor, [1, 1, 1]), o.glossinessFactor = u(o.glossinessFactor, 1), f(o.specularGlossinessTexture));
    }), c.animation(r, function (e) {
      c.animationSampler(e, function (e) {
        e.interpolation = u(e.interpolation, "LINEAR");
      });
    });
    var e,
        i,
        t = (e = r, i = {}, c.animation(e, function (e) {
      c.animationChannel(e, function (e) {
        var a = e.target,
            t = a.node,
            n = a.path;
        "translation" !== n && "rotation" !== n && "scale" !== n || (i[t] = !0);
      });
    }), i);
    return c.node(r, function (e, a) {
      l(t[a]) || l(e.translation) || l(e.rotation) || l(e.scale) ? (e.translation = u(e.translation, [0, 0, 0]), e.rotation = u(e.rotation, [0, 0, 0, 1]), e.scale = u(e.scale, [1, 1, 1])) : e.matrix = u(e.matrix, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }), c.sampler(r, function (e) {
      e.wrapS = u(e.wrapS, o.REPEAT), e.wrapT = u(e.wrapT, o.REPEAT);
    }), l(r.scenes) && !l(r.scene) && (r.scene = 0), r;
  };
});