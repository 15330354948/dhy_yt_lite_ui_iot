"use strict";

define(["../Core/Cartesian3", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/LinearSpline", "../Core/Matrix4", "../Core/Quaternion", "../Core/QuaternionSpline", "../Core/WebGLConstants", "../Core/WeightSpline", "../ThirdParty/GltfPipeline/getAccessorByteStride", "../ThirdParty/GltfPipeline/numberOfComponentsForType", "./AttributeType"], function (C, m, A, h, l, w, g, v, V, O, T, d, S) {
  "use strict";

  function e() {}

  var s = /^data\:/i;

  function L(e, t) {
    var r = e.gltf,
        n = r.buffers,
        f = r.bufferViews[t.bufferView],
        i = n[f.buffer],
        a = f.byteOffset + t.byteOffset,
        o = t.count * d(t.type),
        u = s.test(i.uri) ? "" : i.uri;
    return e.cacheKey + "//" + u + "/" + a + "/" + o;
  }

  var P = {};

  e.getAnimationParameterValues = function (e, t) {
    var r = L(e, t),
        n = P[r];

    if (!h(n)) {
      for (var f = e.gltf, i = f.buffers, a = f.bufferViews[t.bufferView], o = i[a.buffer].extras._pipeline.source, u = t.componentType, s = t.type, c = d(s), p = t.count, y = T(f, t), n = new Array(p), b = A(t.byteOffset, 0), l = a.byteOffset + b, v = 0; v < p; v++) {
        var w = m.createArrayBufferView(u, o.buffer, o.byteOffset + l, c);
        "SCALAR" === s ? n[v] = w[0] : "VEC3" === s ? n[v] = C.fromArray(w) : "VEC4" === s && (n[v] = g.unpack(w)), l += y;
      }

      h(e.cacheKey) && (P[r] = n);
    }

    return n;
  };

  var B = {};

  function K(e) {
    this._value = e;
  }

  K.prototype.evaluate = function (e, t) {
    return this._value;
  }, K.prototype.wrapTime = function (e) {
    return 0;
  }, K.prototype.clampTime = function (e) {
    return 0;
  }, e.getAnimationSpline = function (e, t, r, n, f, i, a, o) {
    var u,
        s,
        c,
        p,
        y = (u = t, s = n, e.cacheKey + "//" + u + "/" + s),
        b = B[y];
    return h(b) || (p = o, 1 === (c = i).length && 1 === p.length ? b = new K(p[0]) : "LINEAR" === f.interpolation && ("translation" === a || "scale" === a ? b = new l({
      times: c,
      points: p
    }) : "rotation" === a ? b = new v({
      times: c,
      points: p
    }) : "weights" === a && (b = new O({
      times: c,
      weights: p
    }))), h(e.cacheKey) && (B[y] = b)), b;
  };
  var _ = {};
  return e.getSkinInverseBindMatrices = function (e, t) {
    var r = L(e, t),
        n = _[r];

    if (!h(n)) {
      var f = e.gltf,
          i = f.buffers,
          a = f.bufferViews[t.bufferView],
          o = i[a.buffer].extras._pipeline.source,
          u = t.componentType,
          s = t.type,
          c = t.count,
          p = T(f, t),
          y = a.byteOffset + t.byteOffset,
          b = d(s),
          n = new Array(c);
      if (u === V.FLOAT && s === S.MAT4) for (var l = 0; l < c; ++l) {
        var v = m.createArrayBufferView(u, o.buffer, o.byteOffset + y, b);
        n[l] = w.fromArray(v), y += p;
      }
      _[r] = n;
    }

    return n;
  }, e;
});