"use strict";

define(["../Core/BoundingSphere", "../Core/BoxGeometry", "../Core/Cartesian3", "../Core/combine", "../Core/defaultValue", "../Core/defined", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Matrix4", "../Core/VertexFormat", "../Renderer/BufferUsage", "../Renderer/DrawCommand", "../Renderer/Pass", "../Renderer/RenderState", "../Renderer/ShaderProgram", "../Renderer/ShaderSource", "../Renderer/VertexArray", "../Shaders/EllipsoidFS", "../Shaders/EllipsoidVS", "./BlendingState", "./CullFace", "./Material", "./SceneMode"], function (g, f, v, x, t, L, e, y, E, T, C, r, P, k, b, w, I, M, D, O, R, s, N) {
  "use strict";

  var G = {
    position: 0
  };

  function i(e) {
    e = t(e, t.EMPTY_OBJECT), this.center = v.clone(t(e.center, v.ZERO)), this._center = new v(), this.radii = v.clone(e.radii), this._radii = new v(), this._oneOverEllipsoidRadiiSquared = new v(), this._boundingSphere = new g(), this.modelMatrix = E.clone(t(e.modelMatrix, E.IDENTITY)), this._modelMatrix = new E(), this._computedModelMatrix = new E(), this.show = t(e.show, !0), this.material = t(e.material, s.fromType(s.ColorType)), this._material = void 0, this._translucent = void 0, this.id = e.id, this._id = void 0, this.debugShowBoundingVolume = t(e.debugShowBoundingVolume, !1), this.onlySunLighting = t(e.onlySunLighting, !1), this._onlySunLighting = !1, this._depthTestEnabled = t(e.depthTestEnabled, !0), this._useLogDepth = !1, this._sp = void 0, this._rs = void 0, this._va = void 0, this._pickSP = void 0, this._pickId = void 0, this._colorCommand = new r({
      owner: t(e._owner, this)
    }), this._pickCommand = new r({
      owner: t(e._owner, this),
      pickOnly: !0
    });
    var i = this;
    this._uniforms = {
      u_radii: function u_radii() {
        return i.radii;
      },
      u_oneOverEllipsoidRadiiSquared: function u_oneOverEllipsoidRadiiSquared() {
        return i._oneOverEllipsoidRadiiSquared;
      }
    }, this._pickUniforms = {
      czm_pickColor: function czm_pickColor() {
        return i._pickId.color;
      }
    };
  }

  var A = "#ifdef GL_EXT_frag_depth \n#extension GL_EXT_frag_depth : enable \n#endif \n\n";
  return i.prototype.update = function (e) {
    if (this.show && e.mode === N.SCENE3D && L(this.center) && L(this.radii)) {
      if (!L(this.material)) throw new y("this.material must be defined.");
      var i = e.context,
          t = this.material.isTranslucent(),
          r = this._translucent !== t;
      L(this._rs) && !r || (this._translucent = t, this._rs = k.fromCache({
        cull: {
          enabled: !0,
          face: R.FRONT
        },
        depthTest: {
          enabled: this._depthTestEnabled
        },
        depthMask: !t && i.fragmentDepth,
        blending: t ? O.ALPHA_BLEND : void 0
      })), L(this._va) || (this._va = function (e) {
        var i = e.cache.ellipsoidPrimitive_vertexArray;
        if (L(i)) return i;
        var t = f.createGeometry(f.fromDimensions({
          dimensions: new v(2, 2, 2),
          vertexFormat: T.POSITION_ONLY
        })),
            i = I.fromGeometry({
          context: e,
          geometry: t,
          attributeLocations: G,
          bufferUsage: C.STATIC_DRAW,
          interleave: !0
        });
        return e.cache.ellipsoidPrimitive_vertexArray = i;
      }(i));
      var s,
          n = !1,
          o = this.radii;
      v.equals(this._radii, o) || (v.clone(o, this._radii), (s = this._oneOverEllipsoidRadiiSquared).x = 1 / (o.x * o.x), s.y = 1 / (o.y * o.y), s.z = 1 / (o.z * o.z), n = !0), E.equals(this.modelMatrix, this._modelMatrix) && v.equals(this.center, this._center) || (E.clone(this.modelMatrix, this._modelMatrix), v.clone(this.center, this._center), E.multiplyByTranslation(this.modelMatrix, this.center, this._computedModelMatrix), n = !0), n && (v.clone(v.ZERO, this._boundingSphere.center), this._boundingSphere.radius = v.maximumComponent(o), g.transform(this._boundingSphere, this._computedModelMatrix, this._boundingSphere));
      var h = this._material !== this.material;
      this._material = this.material, this._material.update(i);
      var a = this.onlySunLighting !== this._onlySunLighting;
      this._onlySunLighting = this.onlySunLighting;
      var d = e.useLogDepth,
          u = this._useLogDepth !== d;
      this._useLogDepth = d;

      var _,
          c,
          l = this._colorCommand;

      (h || a || r || u) && (_ = new w({
        sources: [D]
      }), c = new w({
        sources: [this.material.shaderSource, M]
      }), this.onlySunLighting && c.defines.push("ONLY_SUN_LIGHTING"), !t && i.fragmentDepth && c.defines.push("WRITE_DEPTH"), this._useLogDepth && (_.defines.push("LOG_DEPTH", "DISABLE_GL_POSITION_LOG_DEPTH"), c.defines.push("LOG_DEPTH"), c.sources.push(A)), this._sp = b.replaceCache({
        context: i,
        shaderProgram: this._sp,
        vertexShaderSource: _,
        fragmentShaderSource: c,
        attributeLocations: G
      }), l.vertexArray = this._va, l.renderState = this._rs, l.shaderProgram = this._sp, l.uniformMap = x(this._uniforms, this.material._uniforms), l.executeInClosestFrustum = t);
      var p,
          m = e.commandList,
          S = e.passes;
      S.render && (l.boundingVolume = this._boundingSphere, l.debugShowBoundingVolume = this.debugShowBoundingVolume, l.modelMatrix = this._computedModelMatrix, l.pass = t ? P.TRANSLUCENT : P.OPAQUE, m.push(l)), S.pick && (p = this._pickCommand, L(this._pickId) && this._id === this.id || (this._id = this.id, this._pickId = this._pickId && this._pickId.destroy(), this._pickId = i.createPickId({
        primitive: this,
        id: this.id
      })), (h || a || !L(this._pickSP) || u) && (_ = new w({
        sources: [D]
      }), c = new w({
        sources: [this.material.shaderSource, M],
        pickColorQualifier: "uniform"
      }), this.onlySunLighting && c.defines.push("ONLY_SUN_LIGHTING"), !t && i.fragmentDepth && c.defines.push("WRITE_DEPTH"), this._useLogDepth && (_.defines.push("LOG_DEPTH"), c.defines.push("LOG_DEPTH"), c.sources.push(A)), this._pickSP = b.replaceCache({
        context: i,
        shaderProgram: this._pickSP,
        vertexShaderSource: _,
        fragmentShaderSource: c,
        attributeLocations: G
      }), p.vertexArray = this._va, p.renderState = this._rs, p.shaderProgram = this._pickSP, p.uniformMap = x(x(this._uniforms, this._pickUniforms), this.material._uniforms), p.executeInClosestFrustum = t), p.boundingVolume = this._boundingSphere, p.modelMatrix = this._computedModelMatrix, p.pass = t ? P.TRANSLUCENT : P.OPAQUE, m.push(p));
    }
  }, i.prototype.isDestroyed = function () {
    return !1;
  }, i.prototype.destroy = function () {
    return this._sp = this._sp && this._sp.destroy(), this._pickSP = this._pickSP && this._pickSP.destroy(), this._pickId = this._pickId && this._pickId.destroy(), e(this);
  }, i;
});