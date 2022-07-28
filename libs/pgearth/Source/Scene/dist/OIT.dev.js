"use strict";

define(["../Core/BoundingRectangle", "../Core/Color", "../Core/defined", "../Core/destroyObject", "../Core/PixelFormat", "../Core/WebGLConstants", "../Renderer/ClearCommand", "../Renderer/DrawCommand", "../Renderer/Framebuffer", "../Renderer/PixelDatatype", "../Renderer/RenderState", "../Renderer/ShaderSource", "../Renderer/Texture", "../Shaders/AdjustTranslucentFS", "../Shaders/CompositeOITFS", "./BlendEquation", "./BlendFunction"], function (h, n, v, e, _, p, a, w, C, f, g, T, S, x, F, t, r) {
  "use strict";

  function o(e) {
    this._translucentMultipassSupport = !1, this._translucentMRTSupport = !1;
    var t = e.colorBufferFloat && e.depthTexture;
    this._translucentMRTSupport = e.drawBuffers && t, this._translucentMultipassSupport = !this._translucentMRTSupport && t, this._opaqueFBO = void 0, this._opaqueTexture = void 0, this._depthStencilTexture = void 0, this._accumulationTexture = void 0, this._translucentFBO = void 0, this._alphaFBO = void 0, this._adjustTranslucentFBO = void 0, this._adjustAlphaFBO = void 0, this._opaqueClearCommand = new a({
      color: new n(0, 0, 0, 0),
      owner: this
    }), this._translucentMRTClearCommand = new a({
      color: new n(0, 0, 0, 1),
      owner: this
    }), this._translucentMultipassClearCommand = new a({
      color: new n(0, 0, 0, 0),
      owner: this
    }), this._alphaClearCommand = new a({
      color: new n(1, 1, 1, 1),
      owner: this
    }), this._translucentRenderStateCache = {}, this._alphaRenderStateCache = {}, this._compositeCommand = void 0, this._adjustTranslucentCommand = void 0, this._adjustAlphaCommand = void 0, this._viewport = new h(), this._rs = void 0, this._useScissorTest = !1, this._scissorRectangle = void 0, this._useHDR = !1;
  }

  function O(e) {
    e._accumulationTexture = e._accumulationTexture && !e._accumulationTexture.isDestroyed() && e._accumulationTexture.destroy(), e._revealageTexture = e._revealageTexture && !e._revealageTexture.isDestroyed() && e._revealageTexture.destroy();
  }

  function R(e) {
    e._translucentFBO = e._translucentFBO && !e._translucentFBO.isDestroyed() && e._translucentFBO.destroy(), e._alphaFBO = e._alphaFBO && !e._alphaFBO.isDestroyed() && e._alphaFBO.destroy(), e._adjustTranslucentFBO = e._adjustTranslucentFBO && !e._adjustTranslucentFBO.isDestroyed() && e._adjustTranslucentFBO.destroy(), e._adjustAlphaFBO = e._adjustAlphaFBO && !e._adjustAlphaFBO.isDestroyed() && e._adjustAlphaFBO.destroy();
  }

  function B(e) {
    O(e), R(e);
  }

  o.prototype.update = function (e, t, a, r) {
    var n, o, s, u, d, i, m, c, l;
    this.isSupported() && (this._opaqueFBO = a, this._opaqueTexture = a.getColorTexture(0), this._depthStencilTexture = a.depthStencilTexture, n = this._opaqueTexture.width, o = this._opaqueTexture.height, s = this._accumulationTexture, (u = !v(s) || s.width !== n || s.height !== o || r !== this._useHDR) && function (e, t, a, r) {
      O(e), e._accumulationTexture = new S({
        context: t,
        width: a,
        height: r,
        pixelFormat: _.RGBA,
        pixelDatatype: f.FLOAT
      });
      var n = new Float32Array(a * r * 4);
      e._revealageTexture = new S({
        context: t,
        pixelFormat: _.RGBA,
        pixelDatatype: f.FLOAT,
        source: {
          arrayBufferView: n,
          width: a,
          height: r
        },
        flipY: !1
      });
    }(this, e, n, o), (v(this._translucentFBO) && !u || function (e, t) {
      R(e);
      var a,
          r,
          n,
          o,
          s = p.FRAMEBUFFER_COMPLETE,
          u = !0;
      return e._translucentMRTSupport && (e._translucentFBO = new C({
        context: t,
        colorTextures: [e._accumulationTexture, e._revealageTexture],
        depthStencilTexture: e._depthStencilTexture,
        destroyAttachments: !1
      }), e._adjustTranslucentFBO = new C({
        context: t,
        colorTextures: [e._accumulationTexture, e._revealageTexture],
        destroyAttachments: !1
      }), e._translucentFBO.status === s && e._adjustTranslucentFBO.status === s || (R(e), e._translucentMRTSupport = !1)), e._translucentMRTSupport || (e._translucentFBO = new C({
        context: t,
        colorTextures: [e._accumulationTexture],
        depthStencilTexture: e._depthStencilTexture,
        destroyAttachments: !1
      }), e._alphaFBO = new C({
        context: t,
        colorTextures: [e._revealageTexture],
        depthStencilTexture: e._depthStencilTexture,
        destroyAttachments: !1
      }), e._adjustTranslucentFBO = new C({
        context: t,
        colorTextures: [e._accumulationTexture],
        destroyAttachments: !1
      }), e._adjustAlphaFBO = new C({
        context: t,
        colorTextures: [e._revealageTexture],
        destroyAttachments: !1
      }), a = e._translucentFBO.status === s, r = e._alphaFBO.status === s, n = e._adjustTranslucentFBO.status === s, o = e._adjustAlphaFBO.status === s, a && r && n && o || (B(e), u = e._translucentMultipassSupport = !1)), u;
    }(this, e)) && (this._useHDR = r, v((d = this)._compositeCommand) || (i = new T({
      sources: [F]
    }), this._translucentMRTSupport && i.defines.push("MRT"), m = {
      u_opaque: function u_opaque() {
        return d._opaqueTexture;
      },
      u_accumulation: function u_accumulation() {
        return d._accumulationTexture;
      },
      u_revealage: function u_revealage() {
        return d._revealageTexture;
      }
    }, this._compositeCommand = e.createViewportQuadCommand(i, {
      uniformMap: m,
      owner: this
    })), v(this._adjustTranslucentCommand) || (this._translucentMRTSupport ? (i = new T({
      defines: ["MRT"],
      sources: [x]
    }), m = {
      u_bgColor: function u_bgColor() {
        return d._translucentMRTClearCommand.color;
      },
      u_depthTexture: function u_depthTexture() {
        return d._depthStencilTexture;
      }
    }, this._adjustTranslucentCommand = e.createViewportQuadCommand(i, {
      uniformMap: m,
      owner: this
    })) : this._translucentMultipassSupport && (i = new T({
      sources: [x]
    }), m = {
      u_bgColor: function u_bgColor() {
        return d._translucentMultipassClearCommand.color;
      },
      u_depthTexture: function u_depthTexture() {
        return d._depthStencilTexture;
      }
    }, this._adjustTranslucentCommand = e.createViewportQuadCommand(i, {
      uniformMap: m,
      owner: this
    }), m = {
      u_bgColor: function u_bgColor() {
        return d._alphaClearCommand.color;
      },
      u_depthTexture: function u_depthTexture() {
        return d._depthStencilTexture;
      }
    }, this._adjustAlphaCommand = e.createViewportQuadCommand(i, {
      uniformMap: m,
      owner: this
    }))), this._viewport.width = n, this._viewport.height = o, l = (c = !h.equals(this._viewport, t.viewport)) !== this._useScissorTest, this._useScissorTest = c, h.equals(this._scissorRectangle, t.viewport) || (this._scissorRectangle = h.clone(t.viewport, this._scissorRectangle), l = !0), v(this._rs) && h.equals(this._viewport, this._rs.viewport) && !l || (this._rs = g.fromCache({
      viewport: this._viewport,
      scissorTest: {
        enabled: this._useScissorTest,
        rectangle: this._scissorRectangle
      }
    })), v(this._compositeCommand) && (this._compositeCommand.renderState = this._rs), this._adjustTranslucentCommand && (this._adjustTranslucentCommand.renderState = this._rs), v(this._adjustAlphaCommand) && (this._adjustAlphaCommand.renderState = this._rs)));
  };

  var A = {
    enabled: !0,
    color: new n(0, 0, 0, 0),
    equationRgb: t.ADD,
    equationAlpha: t.ADD,
    functionSourceRgb: r.ONE,
    functionDestinationRgb: r.ONE,
    functionSourceAlpha: r.ZERO,
    functionDestinationAlpha: r.ONE_MINUS_SOURCE_ALPHA
  },
      b = {
    enabled: !0,
    color: new n(0, 0, 0, 0),
    equationRgb: t.ADD,
    equationAlpha: t.ADD,
    functionSourceRgb: r.ONE,
    functionDestinationRgb: r.ONE,
    functionSourceAlpha: r.ONE,
    functionDestinationAlpha: r.ONE
  },
      D = {
    enabled: !0,
    color: new n(0, 0, 0, 0),
    equationRgb: t.ADD,
    equationAlpha: t.ADD,
    functionSourceRgb: r.ZERO,
    functionDestinationRgb: r.ONE_MINUS_SOURCE_ALPHA,
    functionSourceAlpha: r.ZERO,
    functionDestinationAlpha: r.ONE_MINUS_SOURCE_ALPHA
  };

  function j(e, t, a, r) {
    var n,
        o = a[r.id];
    return v(o) || ((n = g.getState(r)).depthMask = !1, n.blending = t, o = g.fromCache(n), a[r.id] = o), o;
  }

  function M(e, t, a, r) {
    var n,
        o,
        s = e.shaderCache.getDerivedShaderProgram(t, a);
    return v(s) || (n = t._attributeLocations, (o = t.fragmentShaderSource.clone()).sources = o.sources.map(function (e) {
      return e = (e = (e = (e = T.replaceMain(e, "czm_translucent_main")).replace(/gl_FragColor/g, "czm_gl_FragColor")).replace(/\bdiscard\b/g, "czm_discard = true")).replace(/czm_phong/g, "czm_translucentPhong");
    }), o.sources.splice(0, 0, (-1 !== r.indexOf("gl_FragData") ? "#extension GL_EXT_draw_buffers : enable \n" : "") + "vec4 czm_gl_FragColor;\nbool czm_discard = false;\n"), o.sources.push("void main()\n{\n    czm_translucent_main();\n    if (czm_discard)\n    {\n        discard;\n    }\n" + r + "}\n"), s = e.shaderCache.createDerivedShaderProgram(t, a, {
      vertexShaderSource: t.vertexShaderSource,
      fragmentShaderSource: o,
      attributeLocations: n
    })), s;
  }

  return o.prototype.createDerivedCommands = function (e, t, a) {
    var r, n, o, s, u, d, i, m, c, l, h, _, p, C, f, g, T, S;

    return v(a) || (a = {}), this._translucentMRTSupport ? (v(a.translucentCommand) && (r = a.translucentCommand.shaderProgram, n = a.translucentCommand.renderState), a.translucentCommand = w.shallowClone(e, a.translucentCommand), v(r) && a.shaderProgramId === e.shaderProgram.id ? (a.translucentCommand.shaderProgram = r, a.translucentCommand.renderState = n) : (a.translucentCommand.shaderProgram = (T = t, S = e.shaderProgram, M(T, S, "translucentMRT", "    vec3 Ci = czm_gl_FragColor.rgb * czm_gl_FragColor.a;\n    float ai = czm_gl_FragColor.a;\n    float wzi = czm_alphaWeight(ai);\n    gl_FragData[0] = vec4(Ci * wzi, ai);\n    gl_FragData[1] = vec4(ai * wzi);\n")), a.translucentCommand.renderState = (f = this, g = e.renderState, j(0, A, f._translucentRenderStateCache, g)), a.shaderProgramId = e.shaderProgram.id)) : (v(a.translucentCommand) && (o = a.translucentCommand.shaderProgram, s = a.translucentCommand.renderState, u = a.alphaCommand.shaderProgram, d = a.alphaCommand.renderState), a.translucentCommand = w.shallowClone(e, a.translucentCommand), a.alphaCommand = w.shallowClone(e, a.alphaCommand), v(o) && a.shaderProgramId === e.shaderProgram.id ? (a.translucentCommand.shaderProgram = o, a.translucentCommand.renderState = s, a.alphaCommand.shaderProgram = u, a.alphaCommand.renderState = d) : (a.translucentCommand.shaderProgram = (p = t, C = e.shaderProgram, M(p, C, "translucentMultipass", "    vec3 Ci = czm_gl_FragColor.rgb * czm_gl_FragColor.a;\n    float ai = czm_gl_FragColor.a;\n    float wzi = czm_alphaWeight(ai);\n    gl_FragColor = vec4(Ci, ai) * wzi;\n")), a.translucentCommand.renderState = (h = this, _ = e.renderState, j(0, b, h._translucentRenderStateCache, _)), a.alphaCommand.shaderProgram = (c = t, l = e.shaderProgram, M(c, l, "alphaMultipass", "    float ai = czm_gl_FragColor.a;\n    gl_FragColor = vec4(ai);\n")), a.alphaCommand.renderState = (i = this, m = e.renderState, j(0, D, i._alphaRenderStateCache, m)), a.shaderProgramId = e.shaderProgram.id)), a;
  }, o.prototype.executeCommands = function (e, t, a, r, n) {
    (this._translucentMRTSupport ? function (e, t, a, r, n, o) {
      var s = t.context,
          u = t.frameState.useLogDepth,
          d = t._hdr,
          i = r.framebuffer,
          m = n.length,
          c = t.frameState.shadowState.lightShadowsEnabled;
      r.framebuffer = e._adjustTranslucentFBO, e._adjustTranslucentCommand.execute(s, r);
      var l,
          h = e._opaqueFBO;
      r.framebuffer = e._translucentFBO;

      for (var _ = 0; _ < m; ++_) {
        l = n[_], l = u ? l.derivedCommands.logDepth.command : l, l = d ? l.derivedCommands.hdr.command : l, a(c && l.receiveShadows ? l.derivedCommands.oit.shadows.translucentCommand : l.derivedCommands.oit.translucentCommand, t, s, r, h);
      }

      v(o) && (l = o.unclassifiedCommand, a(c && l.receiveShadows ? l.derivedCommands.oit.shadows.translucentCommand : l.derivedCommands.oit.translucentCommand, t, s, r, h)), r.framebuffer = i;
    } : function (e, t, a, r, n, o) {
      var s,
          u,
          d = t.context,
          i = t.frameState.useLogDepth,
          m = t._hdr,
          c = r.framebuffer,
          l = n.length,
          h = t.frameState.shadowState.lightShadowsEnabled;
      r.framebuffer = e._adjustTranslucentFBO, e._adjustTranslucentCommand.execute(d, r), r.framebuffer = e._adjustAlphaFBO, e._adjustAlphaCommand.execute(d, r);
      var _ = e._opaqueFBO;

      for (r.framebuffer = e._translucentFBO, u = 0; u < l; ++u) {
        s = n[u], s = i ? s.derivedCommands.logDepth.command : s, s = m ? s.derivedCommands.hdr.command : s, a(h && s.receiveShadows ? s.derivedCommands.oit.shadows.translucentCommand : s.derivedCommands.oit.translucentCommand, t, d, r, _);
      }

      for (v(o) && (s = o.unclassifiedCommand, a(h && s.receiveShadows ? s.derivedCommands.oit.shadows.translucentCommand : s.derivedCommands.oit.translucentCommand, t, d, r, _)), r.framebuffer = e._alphaFBO, u = 0; u < l; ++u) {
        s = n[u], s = i ? s.derivedCommands.logDepth.command : s, s = m ? s.derivedCommands.hdr.command : s, a(h && s.receiveShadows ? s.derivedCommands.oit.shadows.alphaCommand : s.derivedCommands.oit.alphaCommand, t, d, r, _);
      }

      v(o) && (s = o.unclassifiedCommand, a(h && s.receiveShadows ? s.derivedCommands.oit.shadows.alphaCommand : s.derivedCommands.oit.alphaCommand, t, d, r, _)), r.framebuffer = c;
    })(this, e, t, a, r, n);
  }, o.prototype.execute = function (e, t) {
    this._compositeCommand.execute(e, t);
  }, o.prototype.clear = function (e, t, a) {
    var r = t.framebuffer;
    t.framebuffer = this._opaqueFBO, n.clone(a, this._opaqueClearCommand.color), this._opaqueClearCommand.execute(e, t), t.framebuffer = this._translucentFBO, (this._translucentMRTSupport ? this._translucentMRTClearCommand : this._translucentMultipassClearCommand).execute(e, t), this._translucentMultipassSupport && (t.framebuffer = this._alphaFBO, this._alphaClearCommand.execute(e, t)), t.framebuffer = r;
  }, o.prototype.isSupported = function () {
    return this._translucentMRTSupport || this._translucentMultipassSupport;
  }, o.prototype.isDestroyed = function () {
    return !1;
  }, o.prototype.destroy = function () {
    return B(this), v(this._compositeCommand) && (this._compositeCommand.shaderProgram = this._compositeCommand.shaderProgram && this._compositeCommand.shaderProgram.destroy()), v(this._adjustTranslucentCommand) && (this._adjustTranslucentCommand.shaderProgram = this._adjustTranslucentCommand.shaderProgram && this._adjustTranslucentCommand.shaderProgram.destroy()), v(this._adjustAlphaCommand) && (this._adjustAlphaCommand.shaderProgram = this._adjustAlphaCommand.shaderProgram && this._adjustAlphaCommand.shaderProgram.destroy()), e(this);
  }, o;
});