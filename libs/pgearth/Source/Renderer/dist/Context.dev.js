"use strict";

define(["../Core/Check", "../Core/clone", "../Core/Color", "../Core/ComponentDatatype", "../Core/createGuid", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Geometry", "../Core/GeometryAttribute", "../Core/Matrix4", "../Core/PixelFormat", "../Core/PrimitiveType", "../Core/RuntimeError", "../Core/WebGLConstants", "../Shaders/ViewportQuadVS", "./BufferUsage", "./ClearCommand", "./ContextLimits", "./CubeMap", "./DrawCommand", "./PassState", "./PixelDatatype", "./RenderState", "./ShaderCache", "./ShaderProgram", "./Texture", "./TextureCache", "./UniformState", "./VertexArray"], function (I, B, O, r, R, M, L, e, a, h, i, n, f, _, c, P, U, o, s, t, D, u, d, G, l, N, V, m, g, W, X, p) {
  "use strict";

  function x(e, t, r, a) {
    for (var i = function (e, t) {
      var r = "WebGL Error:  ";

      switch (t) {
        case e.INVALID_ENUM:
          r += "INVALID_ENUM";
          break;

        case e.INVALID_VALUE:
          r += "INVALID_VALUE";
          break;

        case e.INVALID_OPERATION:
          r += "INVALID_OPERATION";
          break;

        case e.OUT_OF_MEMORY:
          r += "OUT_OF_MEMORY";
          break;

        case e.CONTEXT_LOST_WEBGL:
          r += "CONTEXT_LOST_WEBGL lost";
          break;

        default:
          r += "Unknown (" + t + ")";
      }

      return r;
    }(e, a) + ": " + t.name + "(", n = 0; n < r.length; ++n) {
      0 !== n && (i += ", "), i += r[n];
    }

    return i += ");";
  }

  function E(e, t, r) {
    var a = e.getError();
    if (a !== e.NO_ERROR) throw new P(x(e, t, r, a));
  }

  function b(r, a) {
    if (!L(a)) return r;
    var e = {};

    for (var t in r) {
      var i = r[t];
      i instanceof Function ? e[t] = function (t) {
        return function () {
          var e = t.apply(r, arguments);
          return a(r, t, arguments), e;
        };
      }(i) : Object.defineProperty(e, t, function (t, r, a) {
        return {
          get: function get() {
            var e = t[r];
            return a(t, "get: " + r, e), t[r];
          },
          set: function set(e) {
            t[r] = e, a(t, "set: " + r, e);
          }
        };
      }(r, t, a));
    }

    return e;
  }

  function k(e, t) {
    for (var r = t.length, a = 0; a < r; ++a) {
      var i = e.getExtension(t[a]);
      if (i) return i;
    }
  }

  function T(e, t) {
    if ("undefined" == typeof WebGLRenderingContext) throw new P("The browser does not support WebGL.  Visit http://get.webgl.org.");
    I.defined("canvas", e), this._canvas = e, t = B(t, !0), (t = M(t, {})).allowTextureFilterAnisotropic = M(t.allowTextureFilterAnisotropic, !0);
    var r = M(t.webgl, {});
    r.alpha = M(r.alpha, !1), r.stencil = M(r.stencil, !0);
    var a,
        i = M(t.requestWebgl2, !1) && "undefined" != typeof WebGL2RenderingContext,
        n = !1,
        o = t.getWebGLStub;
    if (L(o)) a = o(e, r);else if (i && (a = e.getContext("webgl2", r) || e.getContext("experimental-webgl2", r) || void 0, L(a) && (n = !0)), L(a) || (a = e.getContext("webgl", r) || e.getContext("experimental-webgl", r) || void 0), !L(a)) throw new P("The browser supports WebGL, but initialization failed.");
    this._originalGLContext = a, this._gl = a, this._webgl2 = n, this._id = R(), this.validateFramebuffer = !1, this.validateShaderProgram = !1, this.logShaderCompilation = !1, this._throwOnWebGLError = !1, this._shaderCache = new V(this), this._textureCache = new W();
    var s = a;
    this._stencilBits = s.getParameter(s.STENCIL_BITS), D._maximumCombinedTextureImageUnits = s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS), D._maximumCubeMapSize = s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE), D._maximumFragmentUniformVectors = s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS), D._maximumTextureImageUnits = s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS), D._maximumRenderbufferSize = s.getParameter(s.MAX_RENDERBUFFER_SIZE), D._maximumTextureSize = s.getParameter(s.MAX_TEXTURE_SIZE), D._maximumVaryingVectors = s.getParameter(s.MAX_VARYING_VECTORS), D._maximumVertexAttributes = s.getParameter(s.MAX_VERTEX_ATTRIBS), D._maximumVertexTextureImageUnits = s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS), D._maximumVertexUniformVectors = s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS);
    var u = s.getParameter(s.ALIASED_LINE_WIDTH_RANGE);
    D._minimumAliasedLineWidth = u[0], D._maximumAliasedLineWidth = u[1];

    var _ = s.getParameter(s.ALIASED_POINT_SIZE_RANGE);

    D._minimumAliasedPointSize = _[0], D._maximumAliasedPointSize = _[1];
    var h = s.getParameter(s.MAX_VIEWPORT_DIMS);
    D._maximumViewportWidth = h[0], D._maximumViewportHeight = h[1];
    var f = s.getShaderPrecisionFormat(s.FRAGMENT_SHADER, s.HIGH_FLOAT);
    D._highpFloatSupported = 0 !== f.precision;
    var c = s.getShaderPrecisionFormat(s.FRAGMENT_SHADER, s.HIGH_INT);
    D._highpIntSupported = 0 !== c.rangeMax, this._antialias = s.getContextAttributes().antialias, this._standardDerivatives = !!k(s, ["OES_standard_derivatives"]), this._blendMinmax = !!k(s, ["EXT_blend_minmax"]), this._elementIndexUint = !!k(s, ["OES_element_index_uint"]), this._depthTexture = !!k(s, ["WEBGL_depth_texture", "WEBKIT_WEBGL_depth_texture"]), this._fragDepth = !!k(s, ["EXT_frag_depth"]), this._debugShaders = k(s, ["WEBGL_debug_shaders"]), this._textureFloat = !!k(s, ["OES_texture_float"]), this._textureHalfFloat = !!k(s, ["OES_texture_half_float"]), this._textureFloatLinear = !!k(s, ["OES_texture_float_linear"]), this._textureHalfFloatLinear = !!k(s, ["OES_texture_half_float_linear"]), this._colorBufferFloat = !!k(s, ["EXT_color_buffer_float", "WEBGL_color_buffer_float"]), this._colorBufferHalfFloat = !!k(s, ["EXT_color_buffer_half_float"]), this._s3tc = !!k(s, ["WEBGL_compressed_texture_s3tc", "MOZ_WEBGL_compressed_texture_s3tc", "WEBKIT_WEBGL_compressed_texture_s3tc"]), this._pvrtc = !!k(s, ["WEBGL_compressed_texture_pvrtc", "WEBKIT_WEBGL_compressed_texture_pvrtc"]), this._etc1 = !!k(s, ["WEBGL_compressed_texture_etc1"]);
    var d,
        l,
        m,
        g,
        p,
        x,
        E,
        b,
        T,
        A,
        w,
        v = t.allowTextureFilterAnisotropic ? k(s, ["EXT_texture_filter_anisotropic", "WEBKIT_EXT_texture_filter_anisotropic"]) : void 0;
    this._textureFilterAnisotropic = v, D._maximumTextureFilterAnisotropy = L(v) ? s.getParameter(v.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 1, n ? (g = this, p = function p() {
      return g._gl.createVertexArray();
    }, x = function x(e) {
      g._gl.bindVertexArray(e);
    }, E = function E(e) {
      g._gl.deleteVertexArray(e);
    }, b = function b(e, t, r, a, i) {
      s.drawElementsInstanced(e, t, r, a, i);
    }, T = function T(e, t, r, a) {
      s.drawArraysInstanced(e, t, r, a);
    }, A = function A(e, t) {
      s.vertexAttribDivisor(e, t);
    }, w = function w(e) {
      s.drawBuffers(e);
    }) : (d = k(s, ["OES_vertex_array_object"]), L(d) && (p = function p() {
      return d.createVertexArrayOES();
    }, x = function x(e) {
      d.bindVertexArrayOES(e);
    }, E = function E(e) {
      d.deleteVertexArrayOES(e);
    }), l = k(s, ["ANGLE_instanced_arrays"]), L(l) && (b = function b(e, t, r, a, i) {
      l.drawElementsInstancedANGLE(e, t, r, a, i);
    }, T = function T(e, t, r, a) {
      l.drawArraysInstancedANGLE(e, t, r, a);
    }, A = function A(e, t) {
      l.vertexAttribDivisorANGLE(e, t);
    }), m = k(s, ["WEBGL_draw_buffers"]), L(m) && (w = function w(e) {
      m.drawBuffersWEBGL(e);
    })), this.glCreateVertexArray = p, this.glBindVertexArray = x, this.glDeleteVertexArray = E, this.glDrawElementsInstanced = b, this.glDrawArraysInstanced = T, this.glVertexAttribDivisor = A, this.glDrawBuffers = w, this._vertexArrayObject = !!d, this._instancedArrays = !!l, this._drawBuffers = !!m, D._maximumDrawBuffers = this.drawBuffers ? s.getParameter(U.MAX_DRAW_BUFFERS) : 1, D._maximumColorAttachments = this.drawBuffers ? s.getParameter(U.MAX_COLOR_ATTACHMENTS) : 1, this._clearColor = new O(0, 0, 0, 0), this._clearDepth = 1, this._clearStencil = 0;
    var C = new X(),
        y = new G(this),
        F = N.fromCache();
    this._defaultPassState = y, this._defaultRenderState = F, this._defaultTexture = void 0, this._defaultCubeMap = void 0, this._us = C, this._currentRenderState = F, this._currentPassState = y, this._currentFramebuffer = void 0, this._maxFrameTextureUnitIndex = 0, this._vertexAttribDivisors = [], this._previousDrawInstanced = !1;

    for (var S = 0; S < D._maximumVertexAttributes; S++) {
      this._vertexAttribDivisors.push(0);
    }

    this._pickObjects = {}, this._nextPickColor = new Uint32Array(1), this.options = t, this.cache = {}, N.apply(s, F, y);
  }

  var A,
      w = {};

  function v(e, t, r, a) {
    var i = e._currentRenderState,
        n = e._currentPassState;
    e._currentRenderState = t, e._currentPassState = r, N.partialApply(e._gl, i, t, n, r, a);
  }

  function C(e, t) {
    var r, a;
    t !== e._currentFramebuffer && (e._currentFramebuffer = t, r = A, L(t) ? (t._bind(), function (e) {
      if (e.validateFramebuffer) {
        var t,
            r = e._gl,
            a = r.checkFramebufferStatus(r.FRAMEBUFFER);

        if (a !== r.FRAMEBUFFER_COMPLETE) {
          switch (a) {
            case r.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
              t = "Framebuffer is not complete.  Incomplete attachment: at least one attachment point with a renderbuffer or texture attached has its attached object no longer in existence or has an attached image with a width or height of zero, or the color attachment point has a non-color-renderable image attached, or the depth attachment point has a non-depth-renderable image attached, or the stencil attachment point has a non-stencil-renderable image attached.  Color-renderable formats include GL_RGBA4, GL_RGB5_A1, and GL_RGB565. GL_DEPTH_COMPONENT16 is the only depth-renderable format. GL_STENCIL_INDEX8 is the only stencil-renderable format.";
              break;

            case r.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
              t = "Framebuffer is not complete.  Incomplete dimensions: not all attached images have the same width and height.";
              break;

            case r.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
              t = "Framebuffer is not complete.  Missing attachment: no images are attached to the framebuffer.";
              break;

            case r.FRAMEBUFFER_UNSUPPORTED:
              t = "Framebuffer is not complete.  Unsupported: the combination of internal formats of the attached images violates an implementation-dependent set of restrictions.";
          }

          throw new h(t);
        }
      }
    }(e), r = t._getActiveColorAttachments()) : (a = e._gl).bindFramebuffer(a.FRAMEBUFFER, null), e.drawBuffers && e.glDrawBuffers(r));
  }

  e(T.prototype, {
    id: {
      get: function get() {
        return this._id;
      }
    },
    webgl2: {
      get: function get() {
        return this._webgl2;
      }
    },
    canvas: {
      get: function get() {
        return this._canvas;
      }
    },
    shaderCache: {
      get: function get() {
        return this._shaderCache;
      }
    },
    textureCache: {
      get: function get() {
        return this._textureCache;
      }
    },
    uniformState: {
      get: function get() {
        return this._us;
      }
    },
    stencilBits: {
      get: function get() {
        return this._stencilBits;
      }
    },
    stencilBuffer: {
      get: function get() {
        return 8 <= this._stencilBits;
      }
    },
    antialias: {
      get: function get() {
        return this._antialias;
      }
    },
    standardDerivatives: {
      get: function get() {
        return this._standardDerivatives || this._webgl2;
      }
    },
    blendMinmax: {
      get: function get() {
        return this._blendMinmax || this._webgl2;
      }
    },
    elementIndexUint: {
      get: function get() {
        return this._elementIndexUint || this._webgl2;
      }
    },
    depthTexture: {
      get: function get() {
        return this._depthTexture || this._webgl2;
      }
    },
    floatingPointTexture: {
      get: function get() {
        return this._webgl2 || this._textureFloat;
      }
    },
    halfFloatingPointTexture: {
      get: function get() {
        return this._webgl2 || this._textureHalfFloat;
      }
    },
    textureFloatLinear: {
      get: function get() {
        return this._textureFloatLinear;
      }
    },
    textureHalfFloatLinear: {
      get: function get() {
        return this._webgl2 && this._textureFloatLinear || !this._webgl2 && this._textureHalfFloatLinear;
      }
    },
    textureFilterAnisotropic: {
      get: function get() {
        return !!this._textureFilterAnisotropic;
      }
    },
    s3tc: {
      get: function get() {
        return this._s3tc;
      }
    },
    pvrtc: {
      get: function get() {
        return this._pvrtc;
      }
    },
    etc1: {
      get: function get() {
        return this._etc1;
      }
    },
    vertexArrayObject: {
      get: function get() {
        return this._vertexArrayObject || this._webgl2;
      }
    },
    fragmentDepth: {
      get: function get() {
        return this._fragDepth || this._webgl2;
      }
    },
    instancedArrays: {
      get: function get() {
        return this._instancedArrays || this._webgl2;
      }
    },
    colorBufferFloat: {
      get: function get() {
        return this._colorBufferFloat;
      }
    },
    colorBufferHalfFloat: {
      get: function get() {
        return this._webgl2 && this._colorBufferFloat || !this._webgl2 && this._colorBufferHalfFloat;
      }
    },
    drawBuffers: {
      get: function get() {
        return this._drawBuffers || this._webgl2;
      }
    },
    debugShaders: {
      get: function get() {
        return this._debugShaders;
      }
    },
    throwOnWebGLError: {
      get: function get() {
        return this._throwOnWebGLError;
      },
      set: function set(e) {
        this._throwOnWebGLError = e, this._gl = b(this._originalGLContext, e ? E : void 0);
      }
    },
    defaultTexture: {
      get: function get() {
        return void 0 === this._defaultTexture && (this._defaultTexture = new g({
          context: this,
          source: {
            width: 1,
            height: 1,
            arrayBufferView: new Uint8Array([255, 255, 255, 255])
          },
          flipY: !1
        })), this._defaultTexture;
      }
    },
    defaultCubeMap: {
      get: function get() {
        var e;
        return void 0 === this._defaultCubeMap && (e = {
          width: 1,
          height: 1,
          arrayBufferView: new Uint8Array([255, 255, 255, 255])
        }, this._defaultCubeMap = new u({
          context: this,
          source: {
            positiveX: e,
            negativeX: e,
            positiveY: e,
            negativeY: e,
            positiveZ: e,
            negativeZ: e
          },
          flipY: !1
        })), this._defaultCubeMap;
      }
    },
    drawingBufferHeight: {
      get: function get() {
        return this._gl.drawingBufferHeight;
      }
    },
    drawingBufferWidth: {
      get: function get() {
        return this._gl.drawingBufferWidth;
      }
    },
    defaultFramebuffer: {
      get: function get() {
        return w;
      }
    }
  }), "undefined" != typeof WebGLRenderingContext && (A = [U.BACK]);
  var y = new t();
  T.prototype.clear = function (e, t) {
    e = M(e, y), t = M(t, this._defaultPassState);
    var r = this._gl,
        a = 0,
        i = e.color,
        n = e.depth,
        o = e.stencil;
    L(i) && (O.equals(this._clearColor, i) || (O.clone(i, this._clearColor), r.clearColor(i.red, i.green, i.blue, i.alpha)), a |= r.COLOR_BUFFER_BIT), L(n) && (n !== this._clearDepth && (this._clearDepth = n, r.clearDepth(n)), a |= r.DEPTH_BUFFER_BIT), L(o) && (o !== this._clearStencil && (this._clearStencil = o, r.clearStencil(o)), a |= r.STENCIL_BUFFER_BIT), v(this, M(e.renderState, this._defaultRenderState), t, !0), C(this, M(e.framebuffer, t.framebuffer)), r.clear(a);
  }, T.prototype.draw = function (e, t, r, a) {
    I.defined("drawCommand", e), I.defined("drawCommand.shaderProgram", e._shaderProgram), t = M(t, this._defaultPassState);
    var i = M(e._framebuffer, t.framebuffer),
        n = M(e._renderState, this._defaultRenderState);
    r = M(r, e._shaderProgram), a = M(a, e._uniformMap), function (e, t, r, a, i) {
      if (L(t) && i.depthTest && i.depthTest.enabled && !t.hasDepthAttachment) throw new h("The depth test can not be enabled (drawCommand.renderState.depthTest.enabled) because the framebuffer (drawCommand.framebuffer) does not have a depth or depth-stencil renderbuffer.");
      C(e, t), v(e, i, r, !1), a._bind(), e._maxFrameTextureUnitIndex = Math.max(e._maxFrameTextureUnitIndex, a.maximumTextureUnitIndex);
    }(this, i, t, r, n), function (e, t, r, a) {
      var i = t._primitiveType,
          n = t._vertexArray,
          o = t._offset,
          s = t._count,
          u = t.instanceCount;
      if (!c.validate(i)) throw new h("drawCommand.primitiveType is required and must be valid.");
      if (I.defined("drawCommand.vertexArray", n), I.typeOf.number.greaterThanOrEquals("drawCommand.offset", o, 0), L(s) && I.typeOf.number.greaterThanOrEquals("drawCommand.count", s, 0), I.typeOf.number.greaterThanOrEquals("drawCommand.instanceCount", u, 0), 0 < u && !e.instancedArrays) throw new h("Instanced arrays extension is not supported");
      e._us.model = M(t._modelMatrix, f.IDENTITY), r._setUniforms(a, e._us, e.validateShaderProgram), n._bind();
      var _ = n.indexBuffer;
      L(_) ? (o *= _.bytesPerIndex, s = M(s, _.numberOfIndices), 0 === u ? e._gl.drawElements(i, s, _.indexDatatype, o) : e.glDrawElementsInstanced(i, s, _.indexDatatype, o, u)) : (s = M(s, n.numberOfVertices), 0 === u ? e._gl.drawArrays(i, o, s) : e.glDrawArraysInstanced(i, o, s, u)), n._unBind();
    }(this, e, r, a);
  }, T.prototype.endFrame = function () {
    var e = this._gl;
    e.useProgram(null), this._currentFramebuffer = void 0, e.bindFramebuffer(e.FRAMEBUFFER, null), this.drawBuffers && this.glDrawBuffers(A);

    for (var t = this._maxFrameTextureUnitIndex, r = this._maxFrameTextureUnitIndex = 0; r < t; ++r) {
      e.activeTexture(e.TEXTURE0 + r), e.bindTexture(e.TEXTURE_2D, null), e.bindTexture(e.TEXTURE_CUBE_MAP, null);
    }
  }, T.prototype.readPixels = function (e) {
    var t = this._gl;
    e = M(e, M.EMPTY_OBJECT);
    var r = Math.max(M(e.x, 0), 0),
        a = Math.max(M(e.y, 0), 0),
        i = M(e.width, t.drawingBufferWidth),
        n = M(e.height, t.drawingBufferHeight),
        o = e.framebuffer;
    I.typeOf.number.greaterThan("readState.width", i, 0), I.typeOf.number.greaterThan("readState.height", n, 0);
    var s = l.UNSIGNED_BYTE;
    L(o) && 0 < o.numberOfColorAttachments && (s = o.getColorTexture(0).pixelDatatype);

    var u = _.createTypedArray(_.RGBA, s, i, n);

    return C(this, o), t.readPixels(r, a, i, n, _.RGBA, s, u), u;
  };
  var F = {
    position: 0,
    textureCoordinates: 1
  };

  function S(e, t, r) {
    this._pickObjects = e, this.key = t, this.color = r;
  }

  return T.prototype.getViewportQuadVertexArray = function () {
    var e,
        t = this.cache.viewportQuad_vertexArray;
    return L(t) || (e = new i({
      attributes: {
        position: new n({
          componentDatatype: r.FLOAT,
          componentsPerAttribute: 2,
          values: [-1, -1, 1, -1, 1, 1, -1, 1]
        }),
        textureCoordinates: new n({
          componentDatatype: r.FLOAT,
          componentsPerAttribute: 2,
          values: [0, 0, 1, 0, 1, 1, 0, 1]
        })
      },
      indices: new Uint16Array([0, 1, 2, 0, 2, 3]),
      primitiveType: c.TRIANGLES
    }), t = p.fromGeometry({
      context: this,
      geometry: e,
      attributeLocations: F,
      bufferUsage: s.STATIC_DRAW,
      interleave: !0
    }), this.cache.viewportQuad_vertexArray = t), t;
  }, T.prototype.createViewportQuadCommand = function (e, t) {
    return t = M(t, M.EMPTY_OBJECT), new d({
      vertexArray: this.getViewportQuadVertexArray(),
      primitiveType: c.TRIANGLES,
      renderState: t.renderState,
      shaderProgram: m.fromCache({
        context: this,
        vertexShaderSource: o,
        fragmentShaderSource: e,
        attributeLocations: F
      }),
      uniformMap: t.uniformMap,
      owner: t.owner,
      framebuffer: t.framebuffer,
      pass: t.pass
    });
  }, T.prototype.getObjectByPickColor = function (e) {
    return I.defined("pickColor", e), this._pickObjects[e.toRgba()];
  }, e(S.prototype, {
    object: {
      get: function get() {
        return this._pickObjects[this.key];
      },
      set: function set(e) {
        this._pickObjects[this.key] = e;
      }
    }
  }), S.prototype.destroy = function () {
    delete this._pickObjects[this.key];
  }, T.prototype.createPickId = function (e) {
    I.defined("object", e), ++this._nextPickColor[0];
    var t = this._nextPickColor[0];
    if (0 === t) throw new P("Out of unique Pick IDs.");
    return this._pickObjects[t] = e, new S(this._pickObjects, t, O.fromRgba(t));
  }, T.prototype.isDestroyed = function () {
    return !1;
  }, T.prototype.destroy = function () {
    var e,
        t = this.cache;

    for (var r in t) {
      t.hasOwnProperty(r) && (e = t[r], L(e.destroy) && e.destroy());
    }

    return this._shaderCache = this._shaderCache.destroy(), this._textureCache = this._textureCache.destroy(), this._defaultTexture = this._defaultTexture && this._defaultTexture.destroy(), this._defaultCubeMap = this._defaultCubeMap && this._defaultCubeMap.destroy(), a(this);
  }, T;
});