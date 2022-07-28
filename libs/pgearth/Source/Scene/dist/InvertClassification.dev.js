"use strict";

define(["../Core/Color", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/PixelFormat", "../Renderer/ClearCommand", "../Renderer/Framebuffer", "../Renderer/PixelDatatype", "../Renderer/RenderState", "../Renderer/Sampler", "../Renderer/ShaderSource", "../Renderer/Texture", "../Renderer/TextureMagnificationFilter", "../Renderer/TextureMinificationFilter", "../Renderer/TextureWrap", "../Shaders/PostProcessStages/PassThrough", "./BlendingState", "./StencilConstants", "./StencilFunction", "./StencilOperation"], function (t, u, e, i, l, r, c, m, _, p, C, x, T, b, v, g, s, n, a, o) {
  "use strict";

  function d() {
    this.previousFramebuffer = void 0, this._previousFramebuffer = void 0, this._texture = void 0, this._classifiedTexture = void 0, this._depthStencilTexture = void 0, this._fbo = void 0, this._fboClassified = void 0, this._rsUnclassified = void 0, this._rsClassified = void 0, this._unclassifiedCommand = void 0, this._classifiedCommand = void 0, this._translucentCommand = void 0, this._clearColorCommand = new r({
      color: new t(0, 0, 0, 0),
      owner: this
    }), this._clearCommand = new r({
      color: new t(0, 0, 0, 0),
      depth: 1,
      stencil: 0
    });
    var e = this;
    this._uniformMap = {
      colorTexture: function colorTexture() {
        return e._texture;
      },
      depthTexture: function depthTexture() {
        return e._depthStencilTexture;
      },
      classifiedTexture: function classifiedTexture() {
        return e._classifiedTexture;
      }
    };
  }

  e(d.prototype, {
    unclassifiedCommand: {
      get: function get() {
        return this._unclassifiedCommand;
      }
    }
  });
  var E = {
    depthMask: !(d.isTranslucencySupported = function (e) {
      return e.depthTexture && e.fragmentDepth;
    }),
    stencilTest: {
      enabled: !0,
      frontFunction: a.EQUAL,
      frontOperation: {
        fail: o.KEEP,
        zFail: o.KEEP,
        zPass: o.KEEP
      },
      backFunction: a.NEVER,
      reference: 0,
      mask: n.CLASSIFICATION_MASK
    },
    blending: s.ALPHA_BLEND
  },
      S = {
    depthMask: !1,
    stencilTest: {
      enabled: !0,
      frontFunction: a.NOT_EQUAL,
      frontOperation: {
        fail: o.KEEP,
        zFail: o.KEEP,
        zPass: o.KEEP
      },
      backFunction: a.NEVER,
      reference: 0,
      mask: n.CLASSIFICATION_MASK
    },
    blending: s.ALPHA_BLEND
  },
      F = {
    depthMask: !0,
    depthTest: {
      enabled: !0
    },
    stencilTest: n.setPGEarth3DTileBit(),
    stencilMask: n.PGEARTH_3D_TILE_MASK,
    blending: s.ALPHA_BLEND
  };
  return d.prototype.update = function (e) {
    var t = this._texture,
        i = !u(t) || this.previousFramebuffer !== this._previousFramebuffer;
    this._previousFramebuffer = this.previousFramebuffer;
    var r,
        s,
        n,
        a,
        o,
        d = e.drawingBufferWidth,
        f = e.drawingBufferHeight,
        h = !u(t) || t.width !== d || t.height !== f;
    (h || i) && (this._texture = this._texture && this._texture.destroy(), this._classifiedTexture = this._classifiedTexture && this._classifiedTexture.destroy(), this._depthStencilTexture = this._depthStencilTexture && this._depthStencilTexture.destroy(), this._texture = new x({
      context: e,
      width: d,
      height: f,
      pixelFormat: l.RGBA,
      pixelDatatype: m.UNSIGNED_BYTE,
      sampler: new p({
        wrapS: v.CLAMP_TO_EDGE,
        wrapT: v.CLAMP_TO_EDGE,
        minificationFilter: b.LINEAR,
        magnificationFilter: T.LINEAR
      })
    }), u(this._previousFramebuffer) || (this._classifiedTexture = new x({
      context: e,
      width: d,
      height: f,
      pixelFormat: l.RGBA,
      pixelDatatype: m.UNSIGNED_BYTE,
      sampler: new p({
        wrapS: v.CLAMP_TO_EDGE,
        wrapT: v.CLAMP_TO_EDGE,
        minificationFilter: b.LINEAR,
        magnificationFilter: T.LINEAR
      })
    }), this._depthStencilTexture = new x({
      context: e,
      width: d,
      height: f,
      pixelFormat: l.DEPTH_STENCIL,
      pixelDatatype: m.UNSIGNED_INT_24_8
    }))), u(this._fbo) && !h && !i || (this._fbo = this._fbo && this._fbo.destroy(), this._fboClassified = this._fboClassified && this._fboClassified.destroy(), u(this._previousFramebuffer) ? (r = this._previousFramebuffer.depthStencilTexture, s = this._previousFramebuffer.depthStencilRenderbuffer) : r = this._depthStencilTexture, this._fbo = new c({
      context: e,
      colorTextures: [this._texture],
      depthStencilTexture: r,
      depthStencilRenderbuffer: s,
      destroyAttachments: !1
    }), u(this._previousFramebuffer) || (this._fboClassified = new c({
      context: e,
      colorTextures: [this._classifiedTexture],
      depthStencilTexture: r,
      destroyAttachments: !1
    }))), u(this._rsUnclassified) || (this._rsUnclassified = _.fromCache(E), this._rsClassified = _.fromCache(S), this._rsDefault = _.fromCache(F)), u(this._unclassifiedCommand) && !i || (u(this._unclassifiedCommand) && (this._unclassifiedCommand.shaderProgram = this._unclassifiedCommand.shaderProgram && this._unclassifiedCommand.shaderProgram.destroy(), this._classifiedCommand.shaderProgram = this._classifiedCommand.shaderProgram && this._classifiedCommand.shaderProgram.destroy()), n = u(this._previousFramebuffer) ? "uniform sampler2D colorTexture;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\n    vec4 color = texture2D(colorTexture, v_textureCoordinates);\n    if (color.a == 0.0)\n    {\n        discard;\n    }\n#ifdef UNCLASSIFIED\n    gl_FragColor = color * czm_invertClassificationColor;\n#else\n    gl_FragColor = color;\n#endif\n}\n" : "#extension GL_EXT_frag_depth : enable\nuniform sampler2D colorTexture;\nuniform sampler2D depthTexture;\nuniform sampler2D classifiedTexture;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\n    vec4 color = texture2D(colorTexture, v_textureCoordinates);\n    if (color.a == 0.0)\n    {\n        discard;\n    }\n    bool isClassified = all(equal(texture2D(classifiedTexture, v_textureCoordinates), vec4(0.0)));\n#ifdef UNCLASSIFIED\n    vec4 highlightColor = czm_invertClassificationColor;\n    if (isClassified)\n    {\n        discard;\n    }\n#else\n    vec4 highlightColor = vec4(1.0);\n    if (!isClassified)\n    {\n        discard;\n    }\n#endif\n    gl_FragColor = color * highlightColor;\n    gl_FragDepthEXT = texture2D(depthTexture, v_textureCoordinates).r;\n}\n", a = new C({
      defines: ["UNCLASSIFIED"],
      sources: [n]
    }), o = new C({
      sources: [n]
    }), this._unclassifiedCommand = e.createViewportQuadCommand(a, {
      renderState: u(this._previousFramebuffer) ? this._rsUnclassified : this._rsDefault,
      uniformMap: this._uniformMap,
      owner: this
    }), this._classifiedCommand = e.createViewportQuadCommand(o, {
      renderState: u(this._previousFramebuffer) ? this._rsClassified : this._rsDefault,
      uniformMap: this._uniformMap,
      owner: this
    }), u(this._translucentCommand) && (this._translucentCommand.shaderProgram = this._translucentCommand.shaderProgram && this._translucentCommand.shaderProgram.destroy()), u(this._previousFramebuffer) || (this._translucentCommand = e.createViewportQuadCommand(g, {
      renderState: this._rsUnclassified,
      uniformMap: this._uniformMap,
      owner: this
    })));
  }, d.prototype.clear = function (e, t) {
    var i = t.framebuffer;
    u(this._previousFramebuffer) ? (t.framebuffer = this._fbo, this._clearColorCommand.execute(e, t)) : (t.framebuffer = this._fbo, this._clearCommand.execute(e, t), t.framebuffer = this._fboClassified, this._clearCommand.execute(e, t)), t.framebuffer = i;
  }, d.prototype.executeClassified = function (e, t) {
    var i;
    u(this._previousFramebuffer) || (i = t.framebuffer, t.framebuffer = this._fboClassified, this._translucentCommand.execute(e, t), t.framebuffer = i), this._classifiedCommand.execute(e, t);
  }, d.prototype.executeUnclassified = function (e, t) {
    this._unclassifiedCommand.execute(e, t);
  }, d.prototype.isDestroyed = function () {
    return !1;
  }, d.prototype.destroy = function () {
    return this._fbo = this._fbo && this._fbo.destroy(), this._texture = this._texture && this._texture.destroy(), this._depthStencilTexture = this._depthStencilTexture && this._depthStencilTexture.destroy(), u(this._unclassifiedCommand) && (this._unclassifiedCommand.shaderProgram = this._unclassifiedCommand.shaderProgram && this._unclassifiedCommand.shaderProgram.destroy(), this._classifiedCommand.shaderProgram = this._classifiedCommand.shaderProgram && this._classifiedCommand.shaderProgram.destroy()), i(this);
  }, d;
});