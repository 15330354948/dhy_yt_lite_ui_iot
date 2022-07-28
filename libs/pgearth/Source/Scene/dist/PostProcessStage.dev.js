"use strict";

define(["../Core/BoundingRectangle", "../Core/Check", "../Core/Color", "../Core/combine", "../Core/createGuid", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Math", "../Core/PixelFormat", "../Core/Resource", "../Renderer/PassState", "../Renderer/PixelDatatype", "../Renderer/RenderState", "../Renderer/Sampler", "../Renderer/ShaderSource", "../Renderer/Texture", "../Renderer/TextureMagnificationFilter", "../Renderer/TextureMinificationFilter", "../Renderer/TextureWrap", "../ThirdParty/when", "./PostProcessStageSampleMode"], function (_, s, f, a, c, d, p, u, e, l, t, m, g, h, T, x, S, v, y, w, C, E, D, I) {
  "use strict";

  function r(e) {
    var t = (e = d(e, d.EMPTY_OBJECT)).fragmentShader,
        r = d(e.textureScale, 1),
        n = d(e.pixelFormat, m.RGBA);
    if (s.typeOf.string("options.fragmentShader", t), s.typeOf.number.greaterThan("options.textureScale", r, 0), s.typeOf.number.lessThanOrEquals("options.textureScale", r, 1), !m.isColorFormat(n)) throw new l("options.pixelFormat must be a color format.");
    this._fragmentShader = t, this._uniforms = e.uniforms, this._textureScale = r, this._forcePowerOfTwo = d(e.forcePowerOfTwo, !1), this._sampleMode = d(e.sampleMode, I.NEAREST), this._pixelFormat = n, this._pixelDatatype = d(e.pixelDatatype, T.UNSIGNED_BYTE), this._clearColor = d(e.clearColor, f.BLACK), this._uniformMap = void 0, this._command = void 0, this._colorTexture = void 0, this._depthTexture = void 0, this._idTexture = void 0, this._actualUniforms = {}, this._dirtyUniforms = [], this._texturesToRelease = [], this._texturesToCreate = [], this._texturePromise = void 0;
    var i = new h();
    i.scissorTest = {
      enabled: !0,
      rectangle: p(e.scissorRectangle) ? _.clone(e.scissorRectangle) : new _()
    }, this._passState = i, this._ready = !1;
    var o = e.name;
    p(o) || (o = c()), this._name = o, this._logDepthChanged = void 0, this._useLogDepth = void 0, this._selectedIdTexture = void 0, this._selected = void 0, this._selectedShadow = void 0, this._parentSelected = void 0, this._parentSelectedShadow = void 0, this._combinedSelected = void 0, this._combinedSelectedShadow = void 0, this._selectedLength = 0, this._parentSelectedLength = 0, this._selectedDirty = !0, this._textureCache = void 0, this._index = void 0, this.enabled = !0, this._enabled = !0;
  }

  u(r.prototype, {
    ready: {
      get: function get() {
        return this._ready;
      }
    },
    name: {
      get: function get() {
        return this._name;
      }
    },
    fragmentShader: {
      get: function get() {
        return this._fragmentShader;
      }
    },
    uniforms: {
      get: function get() {
        return this._uniforms;
      }
    },
    textureScale: {
      get: function get() {
        return this._textureScale;
      }
    },
    forcePowerOfTwo: {
      get: function get() {
        return this._forcePowerOfTwo;
      }
    },
    sampleMode: {
      get: function get() {
        return this._sampleMode;
      }
    },
    pixelFormat: {
      get: function get() {
        return this._pixelFormat;
      }
    },
    pixelDatatype: {
      get: function get() {
        return this._pixelDatatype;
      }
    },
    clearColor: {
      get: function get() {
        return this._clearColor;
      }
    },
    scissorRectangle: {
      get: function get() {
        return this._passState.scissorTest.rectangle;
      }
    },
    outputTexture: {
      get: function get() {
        if (p(this._textureCache)) {
          var e = this._textureCache.getFramebuffer(this._name);

          if (p(e)) return e.getColorTexture(0);
        }
      }
    },
    selected: {
      get: function get() {
        return this._selected;
      },
      set: function set(e) {
        this._selected = e;
      }
    },
    parentSelected: {
      get: function get() {
        return this._parentSelected;
      },
      set: function set(e) {
        this._parentSelected = e;
      }
    }
  });
  var n = /uniform\s+sampler2D\s+depthTexture/g;

  function b(e) {
    if (!p(e._uniformMap)) {
      var t,
          r = {},
          n = {},
          i = e._uniforms,
          o = e._actualUniforms;

      for (var s in i) {
        i.hasOwnProperty(s) && ("function" != typeof i[s] ? (r[s] = function (t, r) {
          return function () {
            var e = t._actualUniforms[r];
            return "function" == typeof e ? e() : e;
          };
        }(e, s), n[s] = function (i, o, s) {
          var e = o[s];
          return ("string" == typeof e || e instanceof HTMLCanvasElement || e instanceof HTMLImageElement || e instanceof HTMLVideoElement || e instanceof ImageData) && i._dirtyUniforms.push(s), {
            get: function get() {
              return o[s];
            },
            set: function set(e) {
              var t = o[s];
              o[s] = e;
              var r = i._actualUniforms,
                  n = r[s];
              p(n) && n !== t && n instanceof y && !p(i._textureCache.getStageByName(s)) && (i._texturesToRelease.push(n), delete r[s], delete r[s + "Dimensions"]), t instanceof y && i._texturesToRelease.push(t), "string" == typeof e || e instanceof HTMLCanvasElement || e instanceof HTMLImageElement || e instanceof HTMLVideoElement || e instanceof ImageData ? i._dirtyUniforms.push(s) : r[s] = e;
            }
          };
        }(e, i, s)) : (r[s] = i[s], n[s] = i[s]), o[s] = i[s], ("string" == typeof (t = r[s]()) || t instanceof y || t instanceof HTMLImageElement || t instanceof HTMLCanvasElement || t instanceof HTMLVideoElement) && (r[s + "Dimensions"] = function (t, r) {
          return function () {
            var e = t[r]();
            if (p(e)) return e.dimensions;
          };
        }(r, s)));
      }

      e._uniforms = {}, u(e._uniforms, n), e._uniformMap = a(r, {
        colorTexture: function colorTexture() {
          return e._colorTexture;
        },
        colorTextureDimensions: function colorTextureDimensions() {
          return e._colorTexture.dimensions;
        },
        depthTexture: function depthTexture() {
          return e._depthTexture;
        },
        depthTextureDimensions: function depthTextureDimensions() {
          return e._depthTexture.dimensions;
        },
        czm_idTexture: function czm_idTexture() {
          return e._idTexture;
        },
        czm_selectedIdTexture: function czm_selectedIdTexture() {
          return e._selectedIdTexture;
        },
        czm_selectedIdTextureStep: function czm_selectedIdTextureStep() {
          return 1 / e._selectedIdTexture.width;
        }
      });
    }
  }

  function R(e, t) {
    var r,
        n = e._texturesToRelease,
        i = n.length;

    for (h = 0; h < i; ++h) {
      r = (r = n[h]) && r.destroy();
    }

    n.length = 0;
    var o = e._texturesToCreate,
        i = o.length;

    for (h = 0; h < i; ++h) {
      var s = o[h],
          a = s.name,
          c = s.source;
      e._actualUniforms[a] = new y({
        context: t,
        source: c
      });
    }

    o.length = 0;
    var d = e._dirtyUniforms;

    if (0 !== d.length || p(e._texturePromise)) {
      if (0 !== d.length && !p(e._texturePromise)) {
        i = d.length;

        for (var u = e._uniforms, l = [], h = 0; h < i; ++h) {
          var _,
              f = u[a = d[h]],
              m = e._textureCache.getStageByName(f);

          p(m) ? e._actualUniforms[a] = function (e, t) {
            return function () {
              return e._textureCache.getOutputTexture(t);
            };
          }(e, f) : "string" == typeof f ? (_ = new g({
            url: f
          }), l.push(_.fetchImage().then(function (t, r) {
            return function (e) {
              t._texturesToCreate.push({
                name: r,
                source: e
              });
            };
          }(e, a)))) : e._texturesToCreate.push({
            name: a,
            source: f
          });
        }

        (d.length = 0) < l.length ? (e._ready = !1, e._texturePromise = D.all(l).then(function () {
          e._ready = !0, e._texturePromise = void 0;
        })) : e._ready = !0;
      }
    } else e._ready = !0;
  }

  function L(e) {
    p(e._command) && (e._command.shaderProgram = e._command.shaderProgram && e._command.shaderProgram.destroy(), e._command = void 0), e._selectedIdTexture = e._selectedIdTexture && e._selectedIdTexture.destroy();
    var t = e._textureCache;

    if (p(t)) {
      var r = e._uniforms,
          n = e._actualUniforms;

      for (var i in n) {
        n.hasOwnProperty(i) && n[i] instanceof y && (p(t.getStageByName(r[i])) || n[i].destroy(), e._dirtyUniforms.push(i));
      }
    }
  }

  return r.prototype._isSupported = function (e) {
    return !n.test(this._fragmentShader) || e.depthTexture;
  }, r.prototype.update = function (e, t) {
    var r, n, i, o, s, a, c, d, u, l, h;
    this.enabled === this._enabled || this.enabled || L(this), this._enabled = this.enabled, this._enabled && (this._logDepthChanged = t !== this._useLogDepth, this._useLogDepth = t, this._selectedDirty = function (e) {
      var t = p(e._selected) ? e._selected.length : 0,
          r = p(e._parentSelected) ? e._parentSelected : 0,
          n = (n = e._selected !== e._selectedShadow || t !== e._selectedLength) || e._parentSelected !== e._parentSelectedShadow || r !== e._parentSelectedLength;

      if (p(e._selected) && p(e._parentSelected) ? e._combinedSelected = e._selected.concat(e._parentSelected) : p(e._parentSelected) ? e._combinedSelected = e._parentSelected : e._combinedSelected = e._selected, !n && p(e._combinedSelected)) {
        if (!p(e._combinedSelectedShadow)) return !0;
        t = e._combinedSelected.length;

        for (var i = 0; i < t; ++i) {
          if (e._combinedSelected[i] !== e._combinedSelectedShadow[i]) return !0;
        }
      }

      return n;
    }(this), this._selectedShadow = this._selected, this._parentSelectedShadow = this._parentSelected, this._combinedSelectedShadow = this._combinedSelected, this._selectedLength = p(this._selected) ? this._selected.length : 0, this._parentSelectedLength = p(this._parentSelected) ? this._parentSelected.length : 0, function (e, t) {
      if (e._selectedDirty) {
        e._selectedIdTexture = e._selectedIdTexture && e._selectedIdTexture.destroy(), e._selectedIdTexture = void 0;
        var r = e._combinedSelected;

        if (p(r)) {
          for (var n, i, o = 0, s = r.length, a = 0; a < s; ++a) {
            n = r[a], p(n.pickIds) ? o += n.pickIds.length : p(n.pickId) && ++o;
          }

          if (0 === s || 0 === o) {
            var c = new Uint8Array(4);
            return c[0] = 255, c[1] = 255, c[2] = 255, c[3] = 255, e._selectedIdTexture = new y({
              context: t,
              pixelFormat: m.RGBA,
              pixelDatatype: T.UNSIGNED_BYTE,
              source: {
                arrayBufferView: c,
                width: 1,
                height: 1
              },
              sampler: new S({
                wrapS: E.CLAMP_TO_EDGE,
                wrapT: E.CLAMP_TO_EDGE,
                minificationFilter: C.NEAREST,
                magnificationFilter: w.NEAREST
              })
            });
          }

          var d = 0,
              u = new Uint8Array(4 * o);

          for (a = 0; a < s; ++a) {
            if (n = r[a], p(n.pickIds)) for (var l = n.pickIds, h = l.length, _ = 0; _ < h; ++_) {
              i = l[_].color, u[d] = f.floatToByte(i.red), u[d + 1] = f.floatToByte(i.green), u[d + 2] = f.floatToByte(i.blue), u[d + 3] = f.floatToByte(i.alpha), d += 4;
            } else p(n.pickId) && (i = n.pickId.color, u[d] = f.floatToByte(i.red), u[d + 1] = f.floatToByte(i.green), u[d + 2] = f.floatToByte(i.blue), u[d + 3] = f.floatToByte(i.alpha), d += 4);
          }

          e._selectedIdTexture = new y({
            context: t,
            pixelFormat: m.RGBA,
            pixelDatatype: T.UNSIGNED_BYTE,
            source: {
              arrayBufferView: u,
              width: o,
              height: 1
            },
            sampler: new S({
              wrapS: E.CLAMP_TO_EDGE,
              wrapT: E.CLAMP_TO_EDGE,
              minificationFilter: C.NEAREST,
              magnificationFilter: w.NEAREST
            })
          });
        }
      }
    }(this, e), b(this), R(this, e), n = e, p((r = this)._command) && !r._logDepthChanged && !r._selectedDirty || (i = r._fragmentShader, p(r._selectedIdTexture) && (i = "#define CZM_SELECTED_FEATURE \nuniform sampler2D czm_idTexture; \nuniform sampler2D czm_selectedIdTexture; \nuniform float czm_selectedIdTextureStep; \nvarying vec2 v_textureCoordinates; \nbool czm_selected(vec2 offset) \n{ \n    bool selected = false;\n    vec4 id = texture2D(czm_idTexture, v_textureCoordinates + offset); \n    for (int i = 0; i < " + r._selectedIdTexture.width + "; ++i) \n    { \n        vec4 selectedId = texture2D(czm_selectedIdTexture, vec2(float(i) * czm_selectedIdTextureStep, 0.5)); \n        if (all(equal(id, selectedId))) \n        { \n            return true; \n        } \n    } \n    return false; \n} \n\nbool czm_selected() \n{ \n    return czm_selected(vec2(0.0)); \n} \n\n" + (i = i.replace(/varying\s+vec2\s+v_textureCoordinates;/g, ""))), o = new v({
      defines: [r._useLogDepth ? "LOG_DEPTH" : ""],
      sources: [i]
    }), r._command = n.createViewportQuadCommand(o, {
      uniformMap: r._uniformMap,
      owner: r
    })), c = (s = this)._sampleMode === I.LINEAR ? (a = C.LINEAR, w.LINEAR) : (a = C.NEAREST, w.NEAREST), d = s._sampler, p(d) && d.minificationFilter === a && d.magnificationFilter === c || (s._sampler = new S({
      wrapS: E.CLAMP_TO_EDGE,
      wrapT: E.CLAMP_TO_EDGE,
      minificationFilter: a,
      magnificationFilter: c
    })), this._selectedDirty = !1, this._ready && (u = this._textureCache.getFramebuffer(this._name), this._command.framebuffer = u, p(u) && ((l = u.getColorTexture(0)).width === e.drawingBufferWidth && l.height === e.drawingBufferHeight || (h = this._renderState, p(h) && l.width === h.viewport.width && l.height === h.viewport.height || (this._renderState = x.fromCache({
      viewport: new _(0, 0, l.width, l.height)
    }))), this._command.renderState = h)));
  }, r.prototype.execute = function (e, t, r, n) {
    var i;
    p(this._command) && p(this._command.framebuffer) && this._ready && this._enabled && (this._colorTexture = t, this._depthTexture = r, this._idTexture = n, S.equals(this._colorTexture.sampler, this._sampler) || (this._colorTexture.sampler = this._sampler), i = 0 < this.scissorRectangle.width && 0 < this.scissorRectangle.height ? this._passState : void 0, p(i) && (i.context = e), this._command.execute(e, i));
  }, r.prototype.isDestroyed = function () {
    return !1;
  }, r.prototype.destroy = function () {
    return L(this), e(this);
  }, r;
});