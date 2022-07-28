"use strict";

define(["../Core/Color", "../Core/defined", "../Core/Math", "../Core/destroyObject", "../Renderer/ClearCommand", "../Renderer/Framebuffer", "../Renderer/Texture"], function (_, b, c, e, h, g, d) {
  "use strict";

  function t(e) {
    this._collection = e, this._framebuffers = [], this._stageNameToFramebuffer = {}, this._width = void 0, this._height = void 0, this._updateDependencies = !1;
  }

  function m(e) {
    for (; b(e.length);) {
      e = e.get(e.length - 1);
    }

    return e.name;
  }

  function v(e, t, r, o, i) {
    if (!o.enabled || !o._isSupported(t)) return i;
    var a = r[o.name] = {};
    b(i) && (a[m(e.getStageByName(i))] = !0);
    var n = o.uniforms;
    if (b(n)) for (var f = Object.getOwnPropertyNames(n), u = f.length, s = 0; s < u; ++s) {
      var l,
          p = n[f[s]];
      "string" == typeof p && (l = e.getStageByName(p), b(l) && (a[m(l)] = !0));
    }
    return o.name;
  }

  function x(e, t, r, o, i) {
    if (b(o.enabled) && !o.enabled || b(o._isSupported) && !o._isSupported(t)) return i;

    for (var a, n, f = i, u = !b(o.inputPreviousStageTexture) || o.inputPreviousStageTexture, s = i, l = o.length, p = 0; p < l; ++p) {
      var c = o.get(p),
          s = (b(c.length) ? x : v)(e, t, r, c, i);
      u && (i = s);
    }

    if (u) for (a = 1; a < l; ++a) {
      n = m(o.get(a)), b(r[n]) || (r[n] = {}), r[n][f] = !0;
    } else for (a = 1; a < l; ++a) {
      for (var h = r[n = m(o.get(a))], g = 0; g < a; ++g) {
        h[m(o.get(g))] = !0;
      }
    }
    return s;
  }

  function p(e, t) {
    var r,
        o,
        i,
        a,
        n,
        f,
        u,
        s,
        l = (r = e._collection, o = t, s = {}, b(r.ambientOcclusion) ? (i = r.ambientOcclusion, a = r.bloom, n = r._tonemapping, f = r.fxaa, u = x(r, o, s, i, void 0), u = v(r, o, s, n, u = x(r, o, s, a, u)), v(r, o, s, f, u = x(r, o, s, r, u))) : x(r, o, s, r, void 0), s);

    for (var p in l) {
      l.hasOwnProperty(p) && (e._stageNameToFramebuffer[p] = function (e, t, r) {
        for (var o, i = e._collection.getStageByName(t), a = i._textureScale, n = i._forcePowerOfTwo, f = i._pixelFormat, u = i._pixelDatatype, s = i._clearColor, l = e._framebuffers, p = l.length, c = 0; c < p; ++c) {
          if (a === (o = l[c]).textureScale && n === o.forcePowerOfTwo && f === o.pixelFormat && u === o.pixelDatatype && _.equals(s, o.clearColor)) {
            for (var h = o.stages, g = h.length, d = !1, m = 0; m < g; ++m) {
              if (r[h[m]]) {
                d = !0;
                break;
              }
            }

            if (!d) break;
          }
        }

        return b(o) && c < p ? o.stages.push(t) : (o = {
          textureScale: a,
          forcePowerOfTwo: n,
          pixelFormat: f,
          pixelDatatype: u,
          clearColor: s,
          stages: [t],
          buffer: void 0,
          clear: void 0
        }, l.push(o)), o;
      }(e, p, l[p]));
    }
  }

  function w(e) {
    for (var t = e._framebuffers, r = t.length, o = 0; o < r; ++o) {
      var i = t[o];
      i.buffer = i.buffer && i.buffer.destroy(), i.buffer = void 0;
    }
  }

  return t.prototype.updateDependencies = function () {
    this._updateDependencies = !0;
  }, t.prototype.update = function (e) {
    var t,
        r,
        o,
        i = this._collection,
        a = this._updateDependencies,
        n = b(i.ambientOcclusion) && i.ambientOcclusion.enabled && i.ambientOcclusion._isSupported(e),
        f = b(i.bloom) && i.bloom.enabled && i.bloom._isSupported(e),
        u = b(i._tonemapping) && i._tonemapping.enabled && i._tonemapping._isSupported(e),
        s = b(i.fxaa) && i.fxaa.enabled && i.fxaa._isSupported(e),
        l = !b(i._activeStages) || 0 < i._activeStages.length || n || f || u || s;

    (a || !l && 0 < this._framebuffers.length) && (w(this), this._framebuffers.length = 0, this._stageNameToFramebuffer = {}, this._width = void 0, this._height = void 0), (a || l) && (0 === this._framebuffers.length && p(this, e), t = e.drawingBufferWidth, r = e.drawingBufferHeight, o = this._width !== t || this._height !== r, (a || o) && (this._width = t, this._height = r, this._updateDependencies = !1, w(this), function (e, t) {
      for (var r = e._width, o = e._height, i = e._framebuffers, a = i.length, n = 0; n < a; ++n) {
        var f = i[n],
            u = f.textureScale,
            s = Math.ceil(r * u),
            l = Math.ceil(o * u),
            p = Math.min(s, l);
        f.forcePowerOfTwo && (c.isPowerOfTwo(p) || (p = c.nextPowerOfTwo(p)), l = s = p), f.buffer = new g({
          context: t,
          colorTextures: [new d({
            context: t,
            width: s,
            height: l,
            pixelFormat: f.pixelFormat,
            pixelDatatype: f.pixelDatatype
          })]
        }), f.clear = new h({
          color: f.clearColor,
          framebuffer: f.buffer
        });
      }
    }(this, e)));
  }, t.prototype.clear = function (e) {
    for (var t = this._framebuffers, r = 0; r < t.length; ++r) {
      t[r].clear.execute(e);
    }
  }, t.prototype.getStageByName = function (e) {
    return this._collection.getStageByName(e);
  }, t.prototype.getOutputTexture = function (e) {
    return this._collection.getOutputTexture(e);
  }, t.prototype.getFramebuffer = function (e) {
    var t = this._stageNameToFramebuffer[e];
    if (b(t)) return t.buffer;
  }, t.prototype.isDestroyed = function () {
    return !1;
  }, t.prototype.destroy = function () {
    return w(this), e(this);
  }, t;
});