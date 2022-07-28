"use strict";

define(["../Core/Cartesian3", "../Core/Cartesian4", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/Ellipsoid", "../Core/EllipsoidGeometry", "../Core/GeometryPipeline", "../Core/Math", "../Core/VertexFormat", "../Renderer/BufferUsage", "../Renderer/DrawCommand", "../Renderer/RenderState", "../Renderer/ShaderProgram", "../Renderer/ShaderSource", "../Renderer/VertexArray", "../Shaders/SkyAtmosphereFS", "../Shaders/SkyAtmosphereVS", "./BlendingState", "./CullFace", "./SceneMode"], function (d, o, s, u, e, r, i, y, C, _, l, A, a, f, F, k, R, x, g, v, E, O) {
  "use strict";

  function t(e) {
    e = s(e, i.WGS84), this.show = !0, this._ellipsoid = e, this._command = new a({
      owner: this
    }), this._spSkyFromSpace = void 0, this._spSkyFromAtmosphere = void 0, this._spSkyFromSpaceColorCorrect = void 0, this._spSkyFromAtmosphereColorCorrect = void 0, this.hueShift = 0, this.saturationShift = 0, this.brightnessShift = 0, this._hueSaturationBrightness = new d();
    var r = new o();
    r.w = 0, r.y = d.maximumComponent(d.multiplyByScalar(e.radii, 1.025, new d())), r.z = e.maximumRadius, this._cameraAndRadiiAndDynamicAtmosphereColor = r;
    var t = this;
    this._command.uniformMap = {
      u_cameraAndRadiiAndDynamicAtmosphereColor: function u_cameraAndRadiiAndDynamicAtmosphereColor() {
        return t._cameraAndRadiiAndDynamicAtmosphereColor;
      },
      u_hsbShift: function u_hsbShift() {
        return t._hueSaturationBrightness.x = t.hueShift, t._hueSaturationBrightness.y = t.saturationShift, t._hueSaturationBrightness.z = t.brightnessShift, t._hueSaturationBrightness;
      }
    };
  }

  return e(t.prototype, {
    ellipsoid: {
      get: function get() {
        return this._ellipsoid;
      }
    }
  }), t.prototype.setDynamicAtmosphereColor = function (e) {
    this._cameraAndRadiiAndDynamicAtmosphereColor.w = e ? 1 : 0;
  }, t.prototype.update = function (e) {
    if (this.show) {
      var r = e.mode;

      if ((r === O.SCENE3D || r === O.MORPHING) && e.passes.render) {
        var t,
            o,
            s,
            i = this._command;
        u(i.vertexArray) || (t = e.context, o = y.createGeometry(new y({
          radii: d.multiplyByScalar(this._ellipsoid.radii, 1.025, new d()),
          slicePartitions: 256,
          stackPartitions: 256,
          vertexFormat: l.POSITION_ONLY
        })), i.vertexArray = R.fromGeometry({
          context: t,
          geometry: o,
          attributeLocations: C.createAttributeLocations(o),
          bufferUsage: A.STATIC_DRAW
        }), i.renderState = f.fromCache({
          cull: {
            enabled: !0,
            face: E.FRONT
          },
          blending: v.ALPHA_BLEND,
          depthMask: !1
        }), s = new k({
          defines: ["SKY_FROM_SPACE"],
          sources: [g]
        }), this._spSkyFromSpace = F.fromCache({
          context: t,
          vertexShaderSource: s,
          fragmentShaderSource: x
        }), s = new k({
          defines: ["SKY_FROM_ATMOSPHERE"],
          sources: [g]
        }), this._spSkyFromAtmosphere = F.fromCache({
          context: t,
          vertexShaderSource: s,
          fragmentShaderSource: x
        }));
        var a,
            n,
            h,
            m,
            S = (a = this, !(_.equalsEpsilon(a.hueShift, 0, _.EPSILON7) && _.equalsEpsilon(a.saturationShift, 0, _.EPSILON7) && _.equalsEpsilon(a.brightnessShift, 0, _.EPSILON7)));
        !S || u(this._spSkyFromSpaceColorCorrect) && u(this._spSkyFromAtmosphereColorCorrect) || (n = e.context, h = new k({
          defines: ["SKY_FROM_SPACE"],
          sources: [g]
        }), m = new k({
          defines: ["COLOR_CORRECT"],
          sources: [x]
        }), this._spSkyFromSpaceColorCorrect = F.fromCache({
          context: n,
          vertexShaderSource: h,
          fragmentShaderSource: m
        }), h = new k({
          defines: ["SKY_FROM_ATMOSPHERE"],
          sources: [g]
        }), this._spSkyFromAtmosphereColorCorrect = F.fromCache({
          context: n,
          vertexShaderSource: h,
          fragmentShaderSource: m
        }));
        var c = e.camera.positionWC,
            p = d.magnitude(c);
        return (this._cameraAndRadiiAndDynamicAtmosphereColor.x = p) > this._cameraAndRadiiAndDynamicAtmosphereColor.y ? i.shaderProgram = S ? this._spSkyFromSpaceColorCorrect : this._spSkyFromSpace : i.shaderProgram = S ? this._spSkyFromAtmosphereColorCorrect : this._spSkyFromAtmosphere, i;
      }
    }
  }, t.prototype.isDestroyed = function () {
    return !1;
  }, t.prototype.destroy = function () {
    var e = this._command;
    return e.vertexArray = e.vertexArray && e.vertexArray.destroy(), this._spSkyFromSpace = this._spSkyFromSpace && this._spSkyFromSpace.destroy(), this._spSkyFromAtmosphere = this._spSkyFromAtmosphere && this._spSkyFromAtmosphere.destroy(), this._spSkyFromSpaceColorCorrect = this._spSkyFromSpaceColorCorrect && this._spSkyFromSpaceColorCorrect.destroy(), this._spSkyFromAtmosphereColorCorrect = this._spSkyFromAtmosphereColorCorrect && this._spSkyFromAtmosphereColorCorrect.destroy(), r(this);
  }, t;
});