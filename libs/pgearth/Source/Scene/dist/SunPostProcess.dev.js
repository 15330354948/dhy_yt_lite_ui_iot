"use strict";

define(["../Core/BoundingRectangle", "../Core/Cartesian2", "../Core/Cartesian4", "../Core/defined", "../Core/destroyObject", "../Core/Math", "../Core/Matrix4", "../Core/Transforms", "../Shaders/PostProcessStages/AdditiveBlend", "../Shaders/PostProcessStages/BrightPass", "../Shaders/PostProcessStages/GaussianBlur1D", "../Shaders/PostProcessStages/PassThrough", "./PostProcessStage", "./PostProcessStageComposite", "./PostProcessStageSampleMode", "./PostProcessStageTextureCache", "./SceneFramebuffer"], function (P, v, e, o, t, T, b, M, i, u, c, f, h, g, d, m, p) {
  "use strict";

  function r() {
    this._sceneFramebuffer = new p();
    var e = .125,
        t = new Array(6);
    t[0] = new h({
      fragmentShader: f,
      textureScale: e,
      forcePowerOfTwo: !0,
      sampleMode: d.LINEAR
    });
    var r = t[1] = new h({
      fragmentShader: u,
      uniforms: {
        avgLuminance: .5,
        threshold: .25,
        offset: .1
      },
      textureScale: e,
      forcePowerOfTwo: !0
    }),
        o = this;
    this._delta = 1, this._sigma = 2, this._blurStep = new v(), t[2] = new h({
      fragmentShader: c,
      uniforms: {
        step: function step() {
          return o._blurStep.x = o._blurStep.y = 1 / r.outputTexture.width, o._blurStep;
        },
        delta: function delta() {
          return o._delta;
        },
        sigma: function sigma() {
          return o._sigma;
        },
        direction: 0
      },
      textureScale: e,
      forcePowerOfTwo: !0
    }), t[3] = new h({
      fragmentShader: c,
      uniforms: {
        step: function step() {
          return o._blurStep.x = o._blurStep.y = 1 / r.outputTexture.width, o._blurStep;
        },
        delta: function delta() {
          return o._delta;
        },
        sigma: function sigma() {
          return o._sigma;
        },
        direction: 1
      },
      textureScale: e,
      forcePowerOfTwo: !0
    }), t[4] = new h({
      fragmentShader: f,
      sampleMode: d.LINEAR
    }), this._uCenter = new v(), this._uRadius = void 0, t[5] = new h({
      fragmentShader: i,
      uniforms: {
        center: function center() {
          return o._uCenter;
        },
        radius: function radius() {
          return o._uRadius;
        },
        colorTexture2: function colorTexture2() {
          return o._sceneFramebuffer.getFramebuffer().getColorTexture(0);
        }
      }
    }), this._stages = new g({
      stages: t
    });

    for (var n = new m(this), a = t.length, s = 0; s < a; ++s) {
      t[s]._textureCache = n;
    }

    this._textureCache = n, this.length = t.length;
  }

  r.prototype.get = function (e) {
    return this._stages.get(e);
  }, r.prototype.getStageByName = function (e) {
    for (var t = this._stages.length, r = 0; r < t; ++r) {
      var o = this._stages.get(r);

      if (o.name === e) return o;
    }
  };
  var R = new e(),
      F = new v(),
      B = new v(),
      L = new b();
  return r.prototype.clear = function (e, t, r) {
    this._sceneFramebuffer.clear(e, t, r), this._textureCache.clear(e);
  }, r.prototype.update = function (e) {
    var t = e.context,
        r = e.viewport,
        o = this._sceneFramebuffer;
    o.update(t, r);
    var n = o.getFramebuffer();
    return this._textureCache.update(t), this._stages.update(t, !1), function (e, t, r) {
      var o = t.uniformState,
          n = o.sunPositionWC,
          a = o.view,
          s = o.viewProjection,
          i = o.projection,
          u = b.computeViewportTransformation(r, 0, 1, L),
          c = b.multiplyByPoint(a, n, R),
          f = M.pointToGLWindowCoordinates(s, u, n, F);
      c.x += T.SOLAR_RADIUS;
      var h = M.pointToGLWindowCoordinates(i, u, c, c),
          g = 30 * v.magnitude(v.subtract(h, f, h)) * 2,
          d = B;
      d.x = g, d.y = g, e._uCenter = v.clone(f, e._uCenter), e._uRadius = .15 * Math.max(d.x, d.y);

      var m = t.drawingBufferWidth,
          p = t.drawingBufferHeight,
          l = e._stages,
          _ = l.get(0),
          w = _.outputTexture.width,
          x = _.outputTexture.height,
          C = new P();

      C.width = w, C.height = x, u = b.computeViewportTransformation(C, 0, 1, L), f = M.pointToGLWindowCoordinates(s, u, n, F), d.x *= w / m, d.y *= x / p;
      var S = _.scissorRectangle;
      S.x = Math.max(f.x - .5 * d.x, 0), S.y = Math.max(f.y - .5 * d.y, 0), S.width = Math.min(d.x, m), S.height = Math.min(d.y, p);

      for (var y = 1; y < 4; ++y) {
        P.clone(S, l.get(y).scissorRectangle);
      }
    }(this, t, r), n;
  }, r.prototype.execute = function (e) {
    var t = this._sceneFramebuffer.getFramebuffer().getColorTexture(0),
        r = this._stages,
        o = r.length;

    r.get(0).execute(e, t);

    for (var n = 1; n < o; ++n) {
      r.get(n).execute(e, r.get(n - 1).outputTexture);
    }
  }, r.prototype.copy = function (e, t) {
    var r;
    o(this._copyColorCommand) || ((r = this)._copyColorCommand = e.createViewportQuadCommand(f, {
      uniformMap: {
        colorTexture: function colorTexture() {
          return r._stages.get(r._stages.length - 1).outputTexture;
        }
      },
      owner: this
    })), this._copyColorCommand.framebuffer = t, this._copyColorCommand.execute(e);
  }, r.prototype.isDestroyed = function () {
    return !1;
  }, r.prototype.destroy = function () {
    return this._textureCache.destroy(), this._stages.destroy(), t(this);
  }, r;
});