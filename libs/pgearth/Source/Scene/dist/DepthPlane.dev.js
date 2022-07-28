"use strict";

define(["../Core/BoundingSphere", "../Core/Cartesian3", "../Core/ComponentDatatype", "../Core/defined", "../Core/FeatureDetection", "../Core/Geometry", "../Core/GeometryAttribute", "../Core/PrimitiveType", "../Renderer/BufferUsage", "../Renderer/DrawCommand", "../Renderer/Pass", "../Renderer/RenderState", "../Renderer/ShaderProgram", "../Renderer/ShaderSource", "../Renderer/VertexArray", "../Shaders/DepthPlaneFS", "../Shaders/DepthPlaneVS", "./SceneMode"], function (d, v, p, u, e, m, h, c, _, l, y, f, S, C, g, D, b, L) {
  "use strict";

  function t() {
    this._rs = void 0, this._sp = void 0, this._va = void 0, this._command = void 0, this._mode = void 0, this._useLogDepth = !1;
  }

  var w = e.supportsTypedArrays() ? new Float32Array(12) : [],
      A = new v(),
      P = new v(),
      E = new v(),
      R = new v();
  return t.prototype.update = function (e) {
    var t, r, o, s, a, i, n;
    this._mode = e.mode, e.mode === L.SCENE3D && (t = e.context, r = e.mapProjection.ellipsoid, o = e.useLogDepth, u(this._command) || (this._rs = f.fromCache({
      cull: {
        enabled: !0
      },
      depthTest: {
        enabled: !0
      },
      colorMask: {
        red: !1,
        green: !1,
        blue: !1,
        alpha: !1
      }
    }), this._command = new l({
      renderState: this._rs,
      boundingVolume: new d(v.ZERO, r.maximumRadius),
      pass: y.OPAQUE,
      owner: this
    })), u(this._sp) && this._useLogDepth === o || (this._useLogDepth = o, s = new C({
      sources: [b]
    }), a = new C({
      sources: [D]
    }), o && (a.sources.push("#ifdef GL_EXT_frag_depth \n#extension GL_EXT_frag_depth : enable \n#endif \n\n"), a.defines.push("LOG_DEPTH"), s.defines.push("LOG_DEPTH"), s.defines.push("DISABLE_GL_POSITION_LOG_DEPTH")), this._sp = S.replaceCache({
      shaderProgram: this._sp,
      context: t,
      vertexShaderSource: s,
      fragmentShaderSource: a,
      attributeLocations: {
        position: 0
      }
    }), this._command.shaderProgram = this._sp), i = function (e, t) {
      var r = e.radii,
          o = t.camera.positionWC,
          s = v.multiplyComponents(e.oneOverRadii, o, A),
          a = v.magnitude(s),
          i = v.normalize(s, P),
          n = v.normalize(v.cross(v.UNIT_Z, s, E), E),
          d = v.normalize(v.cross(i, n, R), R),
          p = Math.sqrt(v.magnitudeSquared(s) - 1),
          u = v.multiplyByScalar(i, 1 / a, A),
          m = p / a,
          h = v.multiplyByScalar(n, m, P),
          c = v.multiplyByScalar(d, m, E),
          _ = v.add(u, c, R);

      v.subtract(_, h, _), v.multiplyComponents(r, _, _), v.pack(_, w, 0);
      var l = v.subtract(u, c, R);
      v.subtract(l, h, l), v.multiplyComponents(r, l, l), v.pack(l, w, 3);
      var y = v.add(u, c, R);
      v.add(y, h, y), v.multiplyComponents(r, y, y), v.pack(y, w, 6);
      var f = v.subtract(u, c, R);
      return v.add(f, h, f), v.multiplyComponents(r, f, f), v.pack(f, w, 9), w;
    }(r, e), u(this._va) ? this._va.getAttribute(0).vertexBuffer.copyFromArrayView(i) : (n = new m({
      attributes: {
        position: new h({
          componentDatatype: p.FLOAT,
          componentsPerAttribute: 3,
          values: i
        })
      },
      indices: [0, 1, 2, 2, 1, 3],
      primitiveType: c.TRIANGLES
    }), this._va = g.fromGeometry({
      context: t,
      geometry: n,
      attributeLocations: {
        position: 0
      },
      bufferUsage: _.DYNAMIC_DRAW
    }), this._command.vertexArray = this._va));
  }, t.prototype.execute = function (e, t) {
    this._mode === L.SCENE3D && this._command.execute(e, t);
  }, t.prototype.isDestroyed = function () {
    return !1;
  }, t.prototype.destroy = function () {
    this._sp = this._sp && this._sp.destroy(), this._va = this._va && this._va.destroy();
  }, t;
});