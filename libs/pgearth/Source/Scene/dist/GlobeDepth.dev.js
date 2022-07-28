"use strict";

define(["../Core/BoundingRectangle", "../Core/Color", "../Core/defined", "../Core/destroyObject", "../Core/PixelFormat", "../Renderer/ClearCommand", "../Renderer/Framebuffer", "../Renderer/PixelDatatype", "../Renderer/RenderState", "../Renderer/ShaderSource", "../Renderer/Sampler", "../Renderer/Texture", "../Renderer/TextureWrap", "../Renderer/TextureMagnificationFilter", "../Renderer/TextureMinificationFilter", "../Shaders/PostProcessStages/DepthViewPacked", "../Shaders/PostProcessStages/PassThrough", "../Shaders/PostProcessStages/PassThroughDepth", "./StencilConstants", "./StencilFunction", "./StencilOperation"], function (n, h, c, t, f, s, l, D, u, m, T, C, x, y, b, e, d, _, g, w, S) {
  "use strict";

  function r() {
    this._colorTexture = void 0, this._depthStencilTexture = void 0, this._globeDepthTexture = void 0, this._tempGlobeDepthTexture = void 0, this._tempCopyDepthTexture = void 0, this.framebuffer = void 0, this._copyDepthFramebuffer = void 0, this._tempCopyDepthFramebuffer = void 0, this._updateDepthFramebuffer = void 0, this._clearColorCommand = void 0, this._copyColorCommand = void 0, this._copyDepthCommand = void 0, this._tempCopyDepthCommand = void 0, this._updateDepthCommand = void 0, this._viewport = new n(), this._rs = void 0, this._rsUpdate = void 0, this._useScissorTest = !1, this._scissorRectangle = void 0, this._useLogDepth = void 0, this._useHdr = void 0, this._debugGlobeDepthViewportCommand = void 0;
  }

  function v(e) {
    e._colorTexture = e._colorTexture && !e._colorTexture.isDestroyed() && e._colorTexture.destroy(), e._depthStencilTexture = e._depthStencilTexture && !e._depthStencilTexture.isDestroyed() && e._depthStencilTexture.destroy(), e._globeDepthTexture = e._globeDepthTexture && !e._globeDepthTexture.isDestroyed() && e._globeDepthTexture.destroy();
  }

  function E(e) {
    e.framebuffer = e.framebuffer && !e.framebuffer.isDestroyed() && e.framebuffer.destroy(), e._copyDepthFramebuffer = e._copyDepthFramebuffer && !e._copyDepthFramebuffer.isDestroyed() && e._copyDepthFramebuffer.destroy();
  }

  function F(e) {
    e._tempCopyDepthFramebuffer = e._tempCopyDepthFramebuffer && !e._tempCopyDepthFramebuffer.isDestroyed() && e._tempCopyDepthFramebuffer.destroy(), e._updateDepthFramebuffer = e._updateDepthFramebuffer && !e._updateDepthFramebuffer.isDestroyed() && e._updateDepthFramebuffer.destroy(), e._tempGlobeDepthTexture = e._tempGlobeDepthTexture && !e._tempGlobeDepthTexture.isDestroyed() && e._tempGlobeDepthTexture.destroy();
  }

  function i(e, t, r, o, p) {
    var a,
        i,
        n,
        h,
        s,
        u,
        m,
        d = e._colorTexture,
        _ = !c(d) || d.width !== r || d.height !== o || p !== e._useHdr;

    c(e.framebuffer) && !_ || (v(e), E(e), n = e, h = t, s = r, u = o, m = p ? h.halfFloatingPointTexture ? D.HALF_FLOAT : D.FLOAT : D.UNSIGNED_BYTE, n._colorTexture = new C({
      context: h,
      width: s,
      height: u,
      pixelFormat: f.RGBA,
      pixelDatatype: m,
      sampler: new T({
        wrapS: x.CLAMP_TO_EDGE,
        wrapT: x.CLAMP_TO_EDGE,
        minificationFilter: b.NEAREST,
        magnificationFilter: y.NEAREST
      })
    }), n._depthStencilTexture = new C({
      context: h,
      width: s,
      height: u,
      pixelFormat: f.DEPTH_STENCIL,
      pixelDatatype: D.UNSIGNED_INT_24_8
    }), n._globeDepthTexture = new C({
      context: h,
      width: s,
      height: u,
      pixelFormat: f.RGBA,
      pixelDatatype: D.UNSIGNED_BYTE,
      sampler: new T({
        wrapS: x.CLAMP_TO_EDGE,
        wrapT: x.CLAMP_TO_EDGE,
        minificationFilter: b.NEAREST,
        magnificationFilter: y.NEAREST
      })
    }), i = t, (a = e).framebuffer = new l({
      context: i,
      colorTextures: [a._colorTexture],
      depthStencilTexture: a._depthStencilTexture,
      destroyAttachments: !1
    }), a._copyDepthFramebuffer = new l({
      context: i,
      colorTextures: [a._globeDepthTexture],
      destroyAttachments: !1
    }));
  }

  function P(e, t, r, o, p) {
    e._viewport.width = r, e._viewport.height = o;
    var a = !n.equals(e._viewport, p.viewport),
        i = a !== e._useScissorTest;
    e._useScissorTest = a, n.equals(e._scissorRectangle, p.viewport) || (e._scissorRectangle = n.clone(p.viewport, e._scissorRectangle), i = !0), c(e._rs) && n.equals(e._viewport, e._rs.viewport) && !i || (e._rs = u.fromCache({
      viewport: e._viewport,
      scissorTest: {
        enabled: e._useScissorTest,
        rectangle: e._scissorRectangle
      }
    }), e._rsUpdate = u.fromCache({
      viewport: e._viewport,
      scissorTest: {
        enabled: e._useScissorTest,
        rectangle: e._scissorRectangle
      },
      stencilTest: {
        enabled: !0,
        frontFunction: w.EQUAL,
        frontOperation: {
          fail: S.KEEP,
          zFail: S.KEEP,
          zPass: S.KEEP
        },
        backFunction: w.NEVER,
        reference: g.PGEARTH_3D_TILE_MASK,
        mask: g.PGEARTH_3D_TILE_MASK
      }
    })), c(e._copyDepthCommand) || (e._copyDepthCommand = t.createViewportQuadCommand(_, {
      uniformMap: {
        u_depthTexture: function u_depthTexture() {
          return e._depthStencilTexture;
        }
      },
      owner: e
    })), e._copyDepthCommand.framebuffer = e._copyDepthFramebuffer, e._copyDepthCommand.renderState = e._rs, c(e._copyColorCommand) || (e._copyColorCommand = t.createViewportQuadCommand(d, {
      uniformMap: {
        colorTexture: function colorTexture() {
          return e._colorTexture;
        }
      },
      owner: e
    })), c(e._tempCopyDepthCommand) || (e._tempCopyDepthCommand = t.createViewportQuadCommand(_, {
      uniformMap: {
        u_depthTexture: function u_depthTexture() {
          return e._tempCopyDepthTexture;
        }
      },
      owner: e
    })), e._tempCopyDepthCommand.framebuffer = e._tempCopyDepthFramebuffer, e._tempCopyDepthCommand.renderState = e._rs, c(e._updateDepthCommand) || (e._updateDepthCommand = t.createViewportQuadCommand(d, {
      uniformMap: {
        colorTexture: function colorTexture() {
          return e._tempGlobeDepthTexture;
        }
      },
      owner: e
    })), e._updateDepthCommand.framebuffer = e._updateDepthFramebuffer, e._updateDepthCommand.renderState = e._rsUpdate, c(e._clearColorCommand) || (e._clearColorCommand = new s({
      color: new h(0, 0, 0, 0),
      stencil: 0,
      owner: e
    })), e._clearColorCommand.framebuffer = e.framebuffer;
  }

  return r.prototype.executeDebugGlobeDepth = function (e, t, r) {
    var o, p, a, i, n;
    p = e, a = t, i = r, c((o = this)._debugGlobeDepthViewportCommand) && i === o._useLogDepth || (n = new m({
      defines: [i ? "LOG_DEPTH" : ""],
      sources: ["uniform sampler2D u_depthTexture;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\n    float z_window = czm_unpackDepth(texture2D(u_depthTexture, v_textureCoordinates));\n    z_window = czm_reverseLogDepth(z_window); \n    float n_range = czm_depthRange.near;\n    float f_range = czm_depthRange.far;\n    float z_ndc = (2.0 * z_window - n_range - f_range) / (f_range - n_range);\n    float scale = pow(z_ndc * 0.5 + 0.5, 8.0);\n    gl_FragColor = vec4(mix(vec3(0.0), vec3(1.0), scale), 1.0);\n}\n"]
    }), o._debugGlobeDepthViewportCommand = p.createViewportQuadCommand(n, {
      uniformMap: {
        u_depthTexture: function u_depthTexture() {
          return o._globeDepthTexture;
        }
      },
      owner: o
    }), o._useLogDepth = i), o._debugGlobeDepthViewportCommand.execute(p, a);
  }, r.prototype.update = function (e, t, r, o) {
    var p = r.width,
        a = r.height;
    i(this, e, p, a, o), P(this, e, p, a, t), e.uniformState.globeDepthTexture = void 0, this._useHdr = o;
  }, r.prototype.executeCopyDepth = function (e, t) {
    c(this._copyDepthCommand) && (this._copyDepthCommand.execute(e, t), e.uniformState.globeDepthTexture = this._globeDepthTexture);
  }, r.prototype.executeUpdateDepth = function (e, t, r) {
    var o,
        p,
        a,
        i,
        n,
        h,
        s,
        u = t.framebuffer.depthStencilTexture;
    r || u !== this._depthStencilTexture ? c(this._updateDepthCommand) && (c(this._updateDepthFramebuffer) && this._updateDepthFramebuffer.depthStencilTexture === u && this._updateDepthFramebuffer.getColorTexture(0) === this._globeDepthTexture || (o = this._globeDepthTexture.width, p = this._globeDepthTexture.height, F(this), i = e, n = o, h = p, s = t, (a = this)._tempGlobeDepthTexture = new C({
      context: i,
      width: n,
      height: h,
      pixelFormat: f.RGBA,
      pixelDatatype: D.UNSIGNED_BYTE,
      sampler: new T({
        wrapS: x.CLAMP_TO_EDGE,
        wrapT: x.CLAMP_TO_EDGE,
        minificationFilter: b.NEAREST,
        magnificationFilter: y.NEAREST
      })
    }), a._tempCopyDepthFramebuffer = new l({
      context: i,
      colorTextures: [a._tempGlobeDepthTexture],
      destroyAttachments: !1
    }), a._updateDepthFramebuffer = new l({
      context: i,
      colorTextures: [a._globeDepthTexture],
      depthStencilTexture: s.framebuffer.depthStencilTexture,
      destroyAttachments: !1
    }), P(this, e, o, p, t)), this._tempCopyDepthTexture = u, this._tempCopyDepthCommand.execute(e, t), this._updateDepthCommand.execute(e, t)) : c(this._copyDepthCommand) && this._copyDepthCommand.execute(e, t);
  }, r.prototype.executeCopyColor = function (e, t) {
    c(this._copyColorCommand) && this._copyColorCommand.execute(e, t);
  }, r.prototype.clear = function (e, t, r) {
    var o = this._clearColorCommand;
    c(o) && (h.clone(r, o.color), o.execute(e, t));
  }, r.prototype.isDestroyed = function () {
    return !1;
  }, r.prototype.destroy = function () {
    v(this), E(this), F(this), c(this._copyColorCommand) && (this._copyColorCommand.shaderProgram = this._copyColorCommand.shaderProgram.destroy()), c(this._copyDepthCommand) && (this._copyDepthCommand.shaderProgram = this._copyDepthCommand.shaderProgram.destroy());
    var e = this._debugGlobeDepthViewportCommand;
    return c(e) && (e.shaderProgram = e.shaderProgram.destroy()), t(this);
  }, r;
});