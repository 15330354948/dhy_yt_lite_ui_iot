"use strict";

define(["../Core/BoundingSphere", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/ComponentDatatype", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/IndexDatatype", "../Core/Math", "../Core/Matrix4", "../Core/PixelFormat", "../Core/PrimitiveType", "../Renderer/Buffer", "../Renderer/BufferUsage", "../Renderer/ComputeCommand", "../Renderer/DrawCommand", "../Renderer/PixelDatatype", "../Renderer/RenderState", "../Renderer/ShaderProgram", "../Renderer/Texture", "../Renderer/VertexArray", "../Shaders/SunFS", "../Shaders/SunTextureFS", "../Shaders/SunVS", "./BlendingState", "./SceneMode", "./SceneTransforms"], function (F, L, M, e, P, b, t, r, V, E, I, N, i, U, z, H, o, W, O, G, j, Y, k, q, J, K, Q, X) {
  "use strict";

  function n() {
    this.show = !0, this._drawCommand = new o({
      primitiveType: i.TRIANGLES,
      boundingVolume: new F(),
      owner: this
    }), this._commands = {
      drawCommand: this._drawCommand,
      computeCommand: void 0
    }, this._boundingVolume = new F(), this._boundingVolume2D = new F(), this._texture = void 0, this._drawingBufferWidth = void 0, this._drawingBufferHeight = void 0, this._radiusTS = void 0, this._size = void 0, this.glowFactor = 1, this._glowFactorDirty = !1, this._useHdr = void 0;
    var e = this;
    this._uniformMap = {
      u_texture: function u_texture() {
        return e._texture;
      },
      u_size: function u_size() {
        return e._size;
      }
    };
  }

  t(n.prototype, {
    glowFactor: {
      get: function get() {
        return this._glowFactor;
      },
      set: function set(e) {
        e = Math.max(e, 0), this._glowFactor = e, this._glowFactorDirty = !0;
      }
    }
  });
  var Z = new L(),
      $ = new L(),
      ee = new e(),
      te = new e();
  return n.prototype.update = function (e, t, r) {
    if (this.show) {
      var i = e.mode;

      if (i !== Q.SCENE2D && i !== Q.MORPHING && e.passes.render) {
        var o,
            n,
            a,
            s,
            u = e.context,
            d = t.viewport.width,
            h = t.viewport.height;
        b(this._texture) && d === this._drawingBufferWidth && h === this._drawingBufferHeight && !this._glowFactorDirty && r === this._useHdr || (this._texture = this._texture && this._texture.destroy(), this._drawingBufferWidth = d, this._drawingBufferHeight = h, this._glowFactorDirty = !1, this._useHdr = r, o = Math.max(d, h), o = Math.pow(2, Math.ceil(Math.log(o) / Math.log(2)) - 2), o = Math.max(1, o), n = r ? u.halfFloatingPointTexture ? W.HALF_FLOAT : W.FLOAT : W.UNSIGNED_BYTE, this._texture = new j({
          context: u,
          width: o,
          height: o,
          pixelFormat: N.RGBA,
          pixelDatatype: n
        }), this._glowLengthTS = 5 * this._glowFactor, this._radiusTS = 1 / (1 + 2 * this._glowLengthTS) * .5, s = {
          u_radiusTS: function u_radiusTS() {
            return a._radiusTS;
          }
        }, (a = this)._commands.computeCommand = new H({
          fragmentShaderSource: q,
          outputTexture: this._texture,
          uniformMap: s,
          persists: !1,
          owner: this,
          postExecute: function postExecute() {
            a._commands.computeCommand = void 0;
          }
        }));

        var m,
            c,
            _,
            g,
            f,
            w = this._drawCommand;

        b(w.vertexArray) || (m = {
          direction: 0
        }, (c = new Uint8Array(8))[0] = 0, c[1] = 0, c[2] = 255, c[3] = 0, c[4] = 255, c[5] = 255, c[6] = 0, c[7] = 255, _ = U.createVertexBuffer({
          context: u,
          typedArray: c,
          usage: z.STATIC_DRAW
        }), g = [{
          index: m.direction,
          vertexBuffer: _,
          componentsPerAttribute: 2,
          normalize: !0,
          componentDatatype: P.UNSIGNED_BYTE
        }], f = U.createIndexBuffer({
          context: u,
          typedArray: new Uint16Array([0, 1, 2, 0, 2, 3]),
          usage: z.STATIC_DRAW,
          indexDatatype: V.UNSIGNED_SHORT
        }), w.vertexArray = new Y({
          context: u,
          attributes: g,
          indexBuffer: f
        }), w.shaderProgram = G.fromCache({
          context: u,
          vertexShaderSource: J,
          fragmentShaderSource: k,
          attributeLocations: m
        }), w.renderState = O.fromCache({
          blending: K.ALPHA_BLEND
        }), w.uniformMap = this._uniformMap);
        var p = u.uniformState.sunPositionWC,
            x = u.uniformState.sunPositionColumbusView,
            S = this._boundingVolume,
            l = this._boundingVolume2D;
        M.clone(p, S.center), l.center.x = x.z, l.center.y = x.x, l.center.z = x.y, S.radius = E.SOLAR_RADIUS + E.SOLAR_RADIUS * this._glowLengthTS, l.radius = S.radius, i === Q.SCENE3D ? F.clone(S, w.boundingVolume) : i === Q.COLUMBUS_VIEW && F.clone(l, w.boundingVolume);
        var y = X.computeActualWgs84Position(e, p, te),
            C = M.magnitude(M.subtract(y, e.camera.position, te)),
            v = u.uniformState.projection,
            A = ee;
        A.x = 0, A.y = 0, A.z = -C, A.w = 1;
        var T = I.multiplyByVector(v, A, te),
            D = X.clipToGLWindowCoordinates(t.viewport, T, Z);
        A.x = E.SOLAR_RADIUS;
        var R = I.multiplyByVector(v, A, te),
            B = X.clipToGLWindowCoordinates(t.viewport, R, $);
        return this._size = Math.ceil(L.magnitude(L.subtract(B, D, te))), this._size = 2 * this._size * (1 + 2 * this._glowLengthTS), this._commands;
      }
    }
  }, n.prototype.isDestroyed = function () {
    return !1;
  }, n.prototype.destroy = function () {
    var e = this._drawCommand;
    return e.vertexArray = e.vertexArray && e.vertexArray.destroy(), e.shaderProgram = e.shaderProgram && e.shaderProgram.destroy(), this._texture = this._texture && this._texture.destroy(), r(this);
  }, n;
});