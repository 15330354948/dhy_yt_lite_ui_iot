"use strict";

define(["../Core/Cartesian2", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/PixelFormat", "../Renderer/ClearCommand", "../Renderer/Framebuffer", "../Renderer/PixelDatatype", "../Renderer/Sampler", "../Renderer/Texture", "../Renderer/TextureMagnificationFilter", "../Renderer/TextureMinificationFilter", "../Renderer/TextureWrap"], function (e, i, t, a, n, r, c, u, l, h, d, x, _, p, v) {
  "use strict";

  function o() {
    this._uniformMap = void 0, this._command = void 0, this._colorTexture = void 0, this._depthTexture = void 0, this._ready = !1, this._name = "czm_autoexposure", this._logDepthChanged = void 0, this._useLogDepth = void 0, this._framebuffers = void 0, this._previousLuminance = void 0, this._commands = void 0, this._clearCommand = void 0, this._minMaxLuminance = new e(), this.enabled = !0, this._enabled = !0, this.minimumLuminance = .1, this.maximumLuminance = 10;
  }

  function g(e) {
    var t = e._framebuffers;

    if (a(t)) {
      for (var n = t.length, r = 0; r < n; ++r) {
        t[r].destroy();
      }

      e._framebuffers = void 0, e._previousLuminance.destroy(), e._previousLuminance = void 0;
    }
  }

  function f(e) {
    var t = e._commands;

    if (a(t)) {
      for (var n = t.length, r = 0; r < n; ++r) {
        t[r].shaderProgram.destroy();
      }

      e._commands = void 0;
    }
  }

  function s(e, t) {
    f(e);

    for (var n, r, o = e._framebuffers, i = o.length, a = new Array(i), u = 0; u < i; ++u) {
      a[u] = t.createViewportQuadCommand((r = void 0, r = "uniform sampler2D colorTexture; \nvarying vec2 v_textureCoordinates; \nfloat sampleTexture(vec2 offset) { \n", r += 0 === (n = u) ? "    vec4 color = texture2D(colorTexture, v_textureCoordinates + offset); \n    return czm_luminance(color.rgb); \n" : "    return texture2D(colorTexture, v_textureCoordinates + offset).r; \n", r += "}\n\n", r += "uniform vec2 colorTextureDimensions; \nuniform vec2 minMaxLuminance; \nuniform sampler2D previousLuminance; \nvoid main() { \n    float color = 0.0; \n    float xStep = 1.0 / colorTextureDimensions.x; \n    float yStep = 1.0 / colorTextureDimensions.y; \n    int count = 0; \n    for (int i = 0; i < 3; ++i) { \n        for (int j = 0; j < 3; ++j) { \n            vec2 offset; \n            offset.x = -xStep + float(i) * xStep; \n            offset.y = -yStep + float(j) * yStep; \n            if (offset.x < 0.0 || offset.x > 1.0 || offset.y < 0.0 || offset.y > 1.0) { \n                continue; \n            } \n            color += sampleTexture(offset); \n            ++count; \n        } \n    } \n    if (count > 0) { \n        color /= float(count); \n    } \n", n === i - 1 && (r += "    float previous = texture2D(previousLuminance, vec2(0.5)).r; \n    color = clamp(color, minMaxLuminance.x, minMaxLuminance.y); \n    color = previous + (color - previous) / (60.0 * 1.5); \n    color = clamp(color, minMaxLuminance.x, minMaxLuminance.y); \n"), r += "    gl_FragColor = vec4(color); \n} \n"), {
        framebuffer: o[u],
        uniformMap: function (e, t) {
          var n, r;
          return (r = 0 === t ? {
            colorTexture: function colorTexture() {
              return e._colorTexture;
            },
            colorTextureDimensions: function colorTextureDimensions() {
              return e._colorTexture.dimensions;
            }
          } : (n = e._framebuffers[t - 1].getColorTexture(0), {
            colorTexture: function colorTexture() {
              return n;
            },
            colorTextureDimensions: function colorTextureDimensions() {
              return n.dimensions;
            }
          })).minMaxLuminance = function () {
            return e._minMaxLuminance;
          }, r.previousLuminance = function () {
            return e._previousLuminance.getColorTexture(0);
          }, r;
        }(e, u)
      });
    }

    e._commands = a;
  }

  return n(o.prototype, {
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
    outputTexture: {
      get: function get() {
        var e = this._framebuffers;
        if (a(e)) return e[e.length - 1].getColorTexture(0);
      }
    }
  }), o.prototype.clear = function (e) {
    var t = this._framebuffers;

    if (a(t)) {
      var n = this._clearCommand;
      a(n) || (n = this._clearCommand = new u({
        color: new i(0, 0, 0, 0),
        framebuffer: void 0
      }));

      for (var r = t.length, o = 0; o < r; ++o) {
        n.framebuffer = t[o], n.execute(e);
      }
    }
  }, o.prototype.update = function (e) {
    var t = e.drawingBufferWidth,
        n = e.drawingBufferHeight;
    t === this._width && n === this._height || (this._width = t, this._height = n, function (e, t) {
      g(e);

      for (var n = e._width, r = e._height, o = c.RGBA, i = t.halfFloatingPointTexture ? h.HALF_FLOAT : h.FLOAT, a = new d({
        wrapS: v.CLAMP_TO_EDGE,
        wrapT: v.CLAMP_TO_EDGE,
        minificationFilter: p.NEAREST,
        magnificationFilter: _.NEAREST
      }), u = Math.ceil(Math.log(Math.max(n, r)) / Math.log(3)), f = new Array(u), s = 0; s < u; ++s) {
        n = Math.max(Math.ceil(n / 3), 1), r = Math.max(Math.ceil(r / 3), 1), f[s] = new l({
          context: t,
          colorTextures: [new x({
            context: t,
            width: n,
            height: r,
            pixelFormat: o,
            pixelDatatype: i,
            sampler: a
          })]
        });
      }

      var m = f[u - 1].getColorTexture(0);
      e._previousLuminance = new l({
        context: t,
        colorTextures: [new x({
          context: t,
          width: m.width,
          height: m.height,
          pixelFormat: o,
          pixelDatatype: i,
          sampler: a
        })]
      }), e._framebuffers = f;
    }(this, e), s(this, e), this._ready || (this._ready = !0)), this._minMaxLuminance.x = this.minimumLuminance, this._minMaxLuminance.y = this.maximumLuminance;
    var r = this._framebuffers,
        o = r[r.length - 1];
    r[r.length - 1] = this._previousLuminance, this._commands[this._commands.length - 1].framebuffer = this._previousLuminance, this._previousLuminance = o;
  }, o.prototype.execute = function (e, t) {
    this._colorTexture = t;
    var n = this._commands;
    if (a(n)) for (var r = n.length, o = 0; o < r; ++o) {
      n[o].execute(e);
    }
  }, o.prototype.isDestroyed = function () {
    return !1;
  }, o.prototype.destroy = function () {
    return g(this), f(this), r(this);
  }, o;
});