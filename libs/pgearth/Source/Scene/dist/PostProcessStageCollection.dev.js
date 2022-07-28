"use strict";

define(["../Core/arraySlice", "../Core/Check", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/PixelFormat", "../Renderer/PixelDatatype", "../Renderer/Sampler", "../Renderer/Texture", "../Renderer/TextureMagnificationFilter", "../Renderer/TextureMinificationFilter", "../Renderer/TextureWrap", "../Shaders/PostProcessStages/PassThrough", "./PostProcessStageLibrary", "./PostProcessStageTextureCache", "./Tonemapper"], function (i, s, e, b, t, a, h, E, C, T, S, R, A, w, r, d, _, l) {
  "use strict";

  var g = [];

  function o() {
    var e = d.createFXAAStage(),
        t = d.createAmbientOcclusionStage(),
        a = d.createBloomStage();
    this._autoExposureEnabled = !1, this._autoExposure = d.createAutoExposureStage(), this._tonemapping = void 0, this._tonemapper = void 0, this.tonemapper = l.ACES;
    var r = this._tonemapping;
    t.enabled = !1, a.enabled = !1, r.enabled = !1;
    var i = new _(this),
        o = {},
        n = g;

    for (n.push(e, t, a, r); 0 < n.length;) {
      var s = n.pop();
      (o[s.name] = s)._textureCache = i;
      var h = s.length;
      if (b(h)) for (var u = 0; u < h; ++u) {
        n.push(s.get(u));
      }
    }

    this._stages = [], this._activeStages = [], this._previousActiveStages = [], this._randomTexture = void 0;
    var p = this;
    t.uniforms.randomTexture = function () {
      return p._randomTexture;
    }, this._ao = t, this._bloom = a, this._fxaa = e, this._lastLength = void 0, this._aoEnabled = void 0, this._bloomEnabled = void 0, this._tonemappingEnabled = void 0, this._fxaaEnabled = void 0, this._stagesRemoved = !1, this._textureCacheDirty = !1, this._stageNames = o, this._textureCache = i;
  }

  function D(e) {
    if (e._stagesRemoved) {
      e._stagesRemoved = !1;

      for (var t = [], a = e._stages, r = a.length, i = 0, o = 0; i < r; ++i) {
        var n = a[i];
        n && (n._index = o++, t.push(n));
      }

      e._stages = t;
    }
  }

  function v(e) {
    for (; b(e.length);) {
      e = e.get(e.length - 1);
    }

    return e.outputTexture;
  }

  function y(e, t, a, r, i) {
    if (b(e.execute)) e.execute(t, a, r, i);else {
      var o,
          n = e.length;
      if (e.inputPreviousStageTexture) for (y(e.get(0), t, a, r, i), o = 1; o < n; ++o) {
        y(e.get(o), t, v(e.get(o - 1)), r, i);
      } else for (o = 0; o < n; ++o) {
        y(e.get(o), t, a, r, i);
      }
    }
  }

  return t(o.prototype, {
    ready: {
      get: function get() {
        for (var e = !1, t = this._stages, a = t.length - 1; 0 <= a; --a) {
          var r = t[a],
              e = e || r.ready && r.enabled;
        }

        var i = this._fxaa,
            o = this._ao,
            n = this._bloom,
            s = this._tonemapping;
        return e = (e = (e = (e = e || i.ready && i.enabled) || o.ready && o.enabled) || n.ready && n.enabled) || s.ready && s.enabled;
      }
    },
    fxaa: {
      get: function get() {
        return this._fxaa;
      }
    },
    ambientOcclusion: {
      get: function get() {
        return this._ao;
      }
    },
    bloom: {
      get: function get() {
        return this._bloom;
      }
    },
    length: {
      get: function get() {
        return D(this), this._stages.length;
      }
    },
    outputTexture: {
      get: function get() {
        var e = this._fxaa;
        if (e.enabled && e.ready) return this.getOutputTexture(e.name);

        for (var t = this._stages, a = t.length - 1; 0 <= a; --a) {
          var r = t[a];
          if (b(r) && r.ready && r.enabled) return this.getOutputTexture(r.name);
        }

        var i = this._tonemapping;
        if (i.enabled && i.ready) return this.getOutputTexture(i.name);
        var o = this._bloom;
        if (o.enabled && o.ready) return this.getOutputTexture(o.name);
        var n = this._ao;
        return n.enabled && n.ready ? this.getOutputTexture(n.name) : void 0;
      }
    },
    hasSelected: {
      get: function get() {
        for (var e = i(this._stages); 0 < e.length;) {
          var t = e.pop();

          if (b(t)) {
            if (b(t.selected)) return !0;
            var a = t.length;
            if (b(a)) for (var r = 0; r < a; ++r) {
              e.push(t.get(r));
            }
          }
        }

        return !1;
      }
    },
    tonemapper: {
      get: function get() {
        return this._tonemapper;
      },
      set: function set(e) {
        if (this._tonemapper !== e) {
          if (!l.validate(e)) throw new h("tonemapper was set to an invalid value.");
          b(this._tonemapping) && (delete this._stageNames[this._tonemapping.name], this._tonemapping.destroy());
          var t,
              a,
              r = this._autoExposureEnabled;

          switch (e) {
            case l.REINHARD:
              t = d.createReinhardTonemappingStage(r);
              break;

            case l.MODIFIED_REINHARD:
              t = d.createModifiedReinhardTonemappingStage(r);
              break;

            case l.FILMIC:
              t = d.createFilmicTonemappingStage(r);
              break;

            default:
              t = d.createAcesTonemappingStage(r);
          }

          r && (a = this._autoExposure, t.uniforms.autoExposure = function () {
            return a.outputTexture;
          }), this._tonemapper = e, this._tonemapping = t, b(this._stageNames) && ((this._stageNames[t.name] = t)._textureCache = this._textureCache), this._textureCacheDirty = !0;
        }
      }
    }
  }), o.prototype.add = function (e) {
    s.typeOf.object("stage", e);
    var t = this._stageNames,
        a = g;

    for (a.push(e); 0 < a.length;) {
      var r = a.pop();
      if (b(t[r.name])) throw new h(r.name + " has already been added to the collection or does not have a unique name.");
      (t[r.name] = r)._textureCache = this._textureCache;
      var i = r.length;
      if (b(i)) for (var o = 0; o < i; ++o) {
        a.push(r.get(o));
      }
    }

    var n = this._stages;
    return e._index = n.length, n.push(e), this._textureCacheDirty = !0, e;
  }, o.prototype.remove = function (e) {
    if (!this.contains(e)) return !1;
    var t = this._stageNames,
        a = g;

    for (a.push(e); 0 < a.length;) {
      var r = a.pop();
      delete t[r.name];
      var i = r.length;
      if (b(i)) for (var o = 0; o < i; ++o) {
        a.push(r.get(o));
      }
    }

    return this._stages[e._index] = void 0, this._stagesRemoved = !0, this._textureCacheDirty = !0, e._index = void 0, e._textureCache = void 0, e.destroy(), !0;
  }, o.prototype.contains = function (e) {
    return b(e) && b(e._index) && e._textureCache === this._textureCache;
  }, o.prototype.get = function (e) {
    D(this);
    var t = this._stages,
        a = t.length;
    return s.typeOf.number.greaterThanOrEquals("stages length", a, 0), s.typeOf.number.greaterThanOrEquals("index", e, 0), s.typeOf.number.lessThan("index", e, a), t[e];
  }, o.prototype.removeAll = function () {
    for (var e = this._stages, t = e.length, a = 0; a < t; ++a) {
      this.remove(e[a]);
    }

    e.length = 0;
  }, o.prototype.getStageByName = function (e) {
    return this._stageNames[e];
  }, o.prototype.update = function (e, t, a) {
    D(this);
    var r = this._activeStages,
        i = this._activeStages = this._previousActiveStages;
    this._previousActiveStages = r;
    var o,
        n = this._stages,
        s = i.length = n.length,
        h = 0;

    for (y = 0; y < s; ++y) {
      (o = n[y]).ready && o.enabled && o._isSupported(e) && (i[h++] = o);
    }

    var u = (i.length = h) !== r.length;
    if (!u) for (y = 0; y < h; ++y) {
      if (i[y] !== r[y]) {
        u = !0;
        break;
      }
    }
    var p = this._ao,
        d = this._bloom,
        _ = this._autoExposure,
        l = this._tonemapping,
        g = this._fxaa;
    l.enabled = a;

    var c = p.enabled && p._isSupported(e),
        f = d.enabled && d._isSupported(e),
        m = l.enabled && l._isSupported(e),
        x = g.enabled && g._isSupported(e);

    if ((u || this._textureCacheDirty || h !== this._lastLength || c !== this._aoEnabled || f !== this._bloomEnabled || m !== this._tonemappingEnabled || x !== this._fxaaEnabled) && (this._textureCache.updateDependencies(), this._lastLength = h, this._aoEnabled = c, this._bloomEnabled = f, this._tonemappingEnabled = m, this._fxaaEnabled = x, this._textureCacheDirty = !1), b(this._randomTexture) && !c && (this._randomTexture.destroy(), this._randomTexture = void 0), !b(this._randomTexture) && c) {
      s = 196608;

      for (var v = new Uint8Array(s), y = 0; y < s; y += 3) {
        v[y] = Math.floor(255 * Math.random());
      }

      this._randomTexture = new S({
        context: e,
        pixelFormat: E.RGB,
        pixelDatatype: C.UNSIGNED_BYTE,
        source: {
          arrayBufferView: v,
          width: 256,
          height: 256
        },
        sampler: new T({
          wrapS: w.REPEAT,
          wrapT: w.REPEAT,
          minificationFilter: A.NEAREST,
          magnificationFilter: R.NEAREST
        })
      });
    }

    for (this._textureCache.update(e), g.update(e, t), p.update(e, t), d.update(e, t), l.update(e, t), this._autoExposureEnabled && _.update(e, t), s = n.length, y = 0; y < s; ++y) {
      n[y].update(e, t);
    }
  }, o.prototype.clear = function (e) {
    this._textureCache.clear(e), this._autoExposureEnabled && this._autoExposure.clear(e);
  }, o.prototype.getOutputTexture = function (e) {
    var t = this.getStageByName(e);
    if (b(t)) return v(t);
  }, o.prototype.execute = function (e, t, a, r) {
    var i = this._activeStages,
        o = i.length,
        n = this._fxaa,
        s = this._ao,
        h = this._bloom,
        u = this._autoExposure,
        p = this._tonemapping,
        d = s.enabled && s._isSupported(e),
        _ = h.enabled && h._isSupported(e),
        l = this._autoExposureEnabled,
        g = p.enabled && p._isSupported(e),
        c = n.enabled && n._isSupported(e);

    if (c || d || _ || g || 0 !== o) {
      var f = t;
      d && s.ready && (y(s, e, f, a, r), f = v(s)), _ && h.ready && (y(h, e, f, a, r), f = v(h)), l && u.ready && y(u, e, f, a, r), g && p.ready && (y(p, e, f, a, r), f = v(p));
      var m = f;

      if (0 < o) {
        y(i[0], e, f, a, r);

        for (var x = 1; x < o; ++x) {
          y(i[x], e, v(i[x - 1]), a, r);
        }

        m = v(i[o - 1]);
      }

      c && n.ready && y(n, e, m, a, r);
    }
  }, o.prototype.copy = function (e, t) {
    var a;
    b(this._copyColorCommand) || ((a = this)._copyColorCommand = e.createViewportQuadCommand(r, {
      uniformMap: {
        colorTexture: function colorTexture() {
          return a.outputTexture;
        }
      },
      owner: this
    })), this._copyColorCommand.framebuffer = t, this._copyColorCommand.execute(e);
  }, o.prototype.isDestroyed = function () {
    return !1;
  }, o.prototype.destroy = function () {
    return this._fxaa.destroy(), this._ao.destroy(), this._bloom.destroy(), this._autoExposure.destroy(), this._tonemapping.destroy(), this.removeAll(), this._textureCache = this._textureCache && this._textureCache.destroy(), a(this);
  }, o;
});