"use strict";

define(["../Core/Cartesian3", "../Core/ComponentDatatype", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/IndexDatatype", "../Core/loadKTX", "../Core/PixelFormat", "../Renderer/Buffer", "../Renderer/BufferUsage", "../Renderer/ComputeCommand", "../Renderer/CubeMap", "../Renderer/PixelDatatype", "../Renderer/ShaderProgram", "../Renderer/Texture", "../Renderer/VertexArray", "../Shaders/OctahedralProjectionAtlasFS", "../Shaders/OctahedralProjectionFS", "../Shaders/OctahedralProjectionVS", "../ThirdParty/when"], function (e, M, S, t, r, C, P, b, B, F, L, D, R, O, I, j, V, Y, H, i) {
  "use strict";

  function U(e) {
    this._url = e, this._cubeMapBuffers = void 0, this._cubeMaps = void 0, this._texture = void 0, this._mipTextures = void 0, this._va = void 0, this._sp = void 0, this._maximumMipmapLevel = void 0, this._loading = !1, this._ready = !1, this._readyPromise = i.defer();
  }

  t(U.prototype, {
    url: {
      get: function get() {
        return this._url;
      }
    },
    texture: {
      get: function get() {
        return this._texture;
      }
    },
    maximumMipmapLevel: {
      get: function get() {
        return this._maximumMipmapLevel;
      }
    },
    ready: {
      get: function get() {
        return this._ready;
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise.promise;
      }
    }
  }), U.isSupported = function (e) {
    return e.colorBufferHalfFloat && e.halfFloatingPointTexture || e.floatingPointTexture && e.colorBufferFloat;
  };

  for (var a = new e(1, 0, 0), o = new e(0, 0, 1), n = new e(-1, 0, 0), s = new e(0, 0, -1), u = new e(0, 1, 0), h = [u, n, o, new e(0, -1, 0), a, u, s, u, u], p = h.length, W = new Float32Array(3 * p), d = 0, _ = 0; _ < p; ++_, d += 3) {
    e.pack(h[_], W, d);
  }

  var G = new Float32Array([-1, 1, -1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, -1, -1, -1, 1, -1]),
      N = new Uint16Array([0, 1, 2, 2, 3, 1, 7, 6, 1, 3, 6, 1, 2, 5, 4, 3, 4, 2, 4, 8, 6, 3, 4, 6]);

  function X(e) {
    return function () {
      return e;
    };
  }

  function k(e) {
    var t, r;
    e._va = e._va && e._va.destroy(), e._sp = e._sp && e._sp.destroy();
    var i = e._cubeMaps;
    if (S(i)) for (r = i.length, t = 0; t < r; ++t) {
      i[t].destroy();
    }
    var a = e._mipTextures;
    if (S(a)) for (r = a.length, t = 0; t < r; ++t) {
      a[t].destroy();
    }
    e._va = void 0, e._sp = void 0, e._cubeMaps = void 0, e._cubeMapBuffers = void 0, e._mipTextures = void 0;
  }

  return U.prototype.update = function (e) {
    var t = e.context;

    if (U.isSupported(t) && (S(this._texture) && S(this._va) && k(this), !S(this._texture))) {
      if (!S(this._texture) && !this._loading) {
        var r = t.textureCache.getTexture(this._url);
        if (S(r)) return k(this), this._texture = r, this._maximumMipmapLevel = this._texture.maximumMipmapLevel, this._ready = !0, void this._readyPromise.resolve();
      }

      var i,
          a,
          o,
          n,
          s,
          u,
          h = this._cubeMapBuffers;

      if (S(h) || this._loading || (P((i = this)._url).then(function (e) {
        i._cubeMapBuffers = e, i._loading = !1;
      }), this._loading = !0), S(this._cubeMapBuffers)) {
        this._va = (a = t, o = B.createVertexBuffer({
          context: a,
          typedArray: G,
          usage: F.STATIC_DRAW
        }), n = B.createVertexBuffer({
          context: a,
          typedArray: W,
          usage: F.STATIC_DRAW
        }), s = B.createIndexBuffer({
          context: a,
          typedArray: N,
          usage: F.STATIC_DRAW,
          indexDatatype: C.UNSIGNED_SHORT
        }), u = [{
          index: 0,
          vertexBuffer: o,
          componentsPerAttribute: 2,
          componentDatatype: M.FLOAT
        }, {
          index: 1,
          vertexBuffer: n,
          componentsPerAttribute: 3,
          componentDatatype: M.FLOAT
        }], new j({
          context: a,
          attributes: u,
          indexBuffer: s
        })), this._sp = O.fromCache({
          context: t,
          vertexShaderSource: H,
          fragmentShaderSource: Y,
          attributeLocations: {
            position: 0,
            cubeMapCoordinates: 1
          }
        });
        var p = Math.min(h.length, 6);
        this._maximumMipmapLevel = p - 1;

        for (var d = this._cubeMaps = new Array(p), _ = this._mipTextures = new Array(p), f = 2 * h[0].positiveX.width, x = {
          originalSize: function originalSize() {
            return f;
          }
        }, m = t.halfFloatingPointTexture ? R.HALF_FLOAT : R.FLOAT, c = b.RGBA, v = 0; v < p; ++v) {
          var l = h[v].positiveY;
          h[v].positiveY = h[v].negativeY, h[v].negativeY = l;
          var y = d[v] = new D({
            context: t,
            source: h[v]
          }),
              g = 2 * d[v].width,
              A = _[v] = new I({
            context: t,
            width: g,
            height: g,
            pixelDatatype: m,
            pixelFormat: c
          }),
              T = new L({
            vertexArray: this._va,
            shaderProgram: this._sp,
            uniformMap: {
              cubeMap: X(y)
            },
            outputTexture: A,
            persists: !0,
            owner: this
          });
          e.commandList.push(T), x["texture" + v] = X(A);
        }

        this._texture = new I({
          context: t,
          width: 1.5 * f + 2,
          height: f,
          pixelDatatype: m,
          pixelFormat: c
        }), this._texture.maximumMipmapLevel = this._maximumMipmapLevel, t.textureCache.addTexture(this._url, this._texture);
        var w = new L({
          fragmentShaderSource: V,
          uniformMap: x,
          outputTexture: this._texture,
          persists: !1,
          owner: this
        });
        e.commandList.push(w), this._ready = !0, this._readyPromise.resolve();
      }
    }
  }, U.prototype.isDestroyed = function () {
    return !1;
  }, U.prototype.destroy = function () {
    return k(this), this._texture = this._texture && this._texture.destroy(), r(this);
  }, U;
});