"use strict";

define(["../Core/Cartesian3", "../Core/Color", "../Core/defined", "../Core/destroyObject", "../Core/FeatureDetection", "../Core/PixelFormat", "../Core/PrimitiveType", "../Renderer/ClearCommand", "../Renderer/DrawCommand", "../Renderer/Framebuffer", "../Renderer/Pass", "../Renderer/PixelDatatype", "../Renderer/RenderState", "../Renderer/Sampler", "../Renderer/ShaderSource", "../Renderer/Texture", "../Renderer/TextureMagnificationFilter", "../Renderer/TextureMinificationFilter", "../Renderer/TextureWrap", "../Scene/BlendingState", "../Scene/StencilConstants", "../Shaders/PostProcessStages/PointCloudEyeDomeLighting"], function (e, S, T, r, t, w, l, v, g, x, E, B, D, o, C, G, n, a, i, P, y, R) {
  "use strict";

  function d() {
    this._framebuffer = void 0, this._colorGBuffer = void 0, this._depthGBuffer = void 0, this._depthTexture = void 0, this._drawCommand = void 0, this._clearCommand = void 0, this._strength = 1, this._radius = 1;
  }

  function b() {
    return new o({
      wrapS: i.CLAMP_TO_EDGE,
      wrapT: i.CLAMP_TO_EDGE,
      minificationFilter: a.NEAREST,
      magnificationFilter: n.NEAREST
    });
  }

  function A(e) {
    var r = e._framebuffer;
    T(r) && (e._colorGBuffer.destroy(), e._depthGBuffer.destroy(), e._depthTexture.destroy(), r.destroy(), e._framebuffer = void 0, e._colorGBuffer = void 0, e._depthGBuffer = void 0, e._depthTexture = void 0, e._drawCommand = void 0, e._clearCommand = void 0);
  }

  var L = new e();

  function N(e, r) {
    var t,
        o,
        n,
        a,
        i,
        d,
        s,
        f,
        u,
        h,
        c,
        _,
        m = r.drawingBufferWidth,
        p = r.drawingBufferHeight,
        l = e._colorGBuffer,
        g = !1,
        C = T(l) && (l.width !== m || l.height !== p);

    return T(l) && !C || (A(e), d = e, f = (s = r).drawingBufferWidth, u = s.drawingBufferHeight, h = new G({
      context: s,
      width: f,
      height: u,
      pixelFormat: w.RGBA,
      pixelDatatype: B.UNSIGNED_BYTE,
      sampler: b()
    }), c = new G({
      context: s,
      width: f,
      height: u,
      pixelFormat: w.RGBA,
      pixelDatatype: B.UNSIGNED_BYTE,
      sampler: b()
    }), _ = new G({
      context: s,
      width: f,
      height: u,
      pixelFormat: w.DEPTH_COMPONENT,
      pixelDatatype: B.UNSIGNED_INT,
      sampler: b()
    }), d._framebuffer = new x({
      context: s,
      colorTextures: [h, c],
      depthTexture: _,
      destroyAttachments: !1
    }), d._colorGBuffer = h, d._depthGBuffer = c, d._depthTexture = _, t = e, o = r, n = R, a = {
      u_pointCloud_colorGBuffer: function u_pointCloud_colorGBuffer() {
        return t._colorGBuffer;
      },
      u_pointCloud_depthGBuffer: function u_pointCloud_depthGBuffer() {
        return t._depthGBuffer;
      },
      u_distancesAndEdlStrength: function u_distancesAndEdlStrength() {
        return L.x = t._radius / o.drawingBufferWidth, L.y = t._radius / o.drawingBufferHeight, L.z = t._strength, L;
      }
    }, i = D.fromCache({
      blending: P.ALPHA_BLEND,
      depthMask: !0,
      depthTest: {
        enabled: !0
      },
      stencilTest: y.setPGEarth3DTileBit(),
      stencilMask: y.PGEARTH_3D_TILE_MASK
    }), t._drawCommand = o.createViewportQuadCommand(n, {
      uniformMap: a,
      renderState: i,
      pass: E.PGEARTH_3D_TILE,
      owner: t
    }), t._clearCommand = new v({
      framebuffer: t._framebuffer,
      color: new S(0, 0, 0, 0),
      depth: 1,
      renderState: D.fromCache(),
      pass: E.PGEARTH_3D_TILE,
      owner: t
    }), g = !0), g;
  }

  function F(e) {
    return e.drawBuffers && e.fragmentDepth;
  }

  return d.isSupported = F, d.prototype.update = function (e, r, t) {
    if (F(e.context)) {
      this._strength = t.eyeDomeLightingStrength, this._radius = t.eyeDomeLightingRadius;

      for (var o, n, a, i, d, s = N(this, e.context), f = e.commandList, u = f.length, h = r; h < u; ++h) {
        var c,
            _ = f[h];
        _.primitiveType === l.POINTS && _.pass !== E.TRANSLUCENT && (c = _.derivedCommands.pointCloudProcessor, T(c) && !_.dirty && !s && c.framebuffer === this._framebuffer || (c = g.shallowClone(_), (_.derivedCommands.pointCloudProcessor = c).framebuffer = this._framebuffer, c.shaderProgram = (o = e.context, n = _.shaderProgram, d = i = a = void 0, d = o.shaderCache.getDerivedShaderProgram(n, "EC"), T(d) || (a = n._attributeLocations, (i = n.fragmentShaderSource.clone()).sources = i.sources.map(function (e) {
          return e = (e = C.replaceMain(e, "czm_point_cloud_post_process_main")).replace(/gl_FragColor/g, "gl_FragData[0]");
        }), i.sources.unshift("#extension GL_EXT_draw_buffers : enable \n"), i.sources.push("void main() \n{ \n    czm_point_cloud_post_process_main(); \n    gl_FragData[1] = czm_packDepth(gl_FragCoord.z); \n}"), d = o.shaderCache.createDerivedShaderProgram(n, "EC", {
          vertexShaderSource: n.vertexShaderSource,
          fragmentShaderSource: i,
          attributeLocations: a
        })), d), c.castShadows = !1, c.receiveShadows = !1), f[h] = c);
      }

      var m = this._clearCommand,
          p = this._drawCommand;
      f.push(p), f.push(m);
    }
  }, d.prototype.isDestroyed = function () {
    return !1;
  }, d.prototype.destroy = function () {
    return A(this), r(this);
  }, d;
});