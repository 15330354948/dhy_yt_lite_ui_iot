"use strict";

define(["../Core/Cartesian3", "../Core/Cartographic", "../Core/Check", "../Core/defined", "../Core/destroyObject", "../Core/EasingFunction", "../Core/Math", "../Core/Matrix4", "../Core/OrthographicFrustum", "../Core/OrthographicOffCenterFrustum", "../Core/PerspectiveFrustum", "../Core/Ray", "../Core/ScreenSpaceEventHandler", "../Core/ScreenSpaceEventType", "../Core/Transforms", "./Camera", "./SceneMode"], function (g, e, t, w, o, T, d, M, m, i, r, n, s, c, v, R, l) {
  "use strict";

  function u(e) {
    t.typeOf.object("scene", e), this._scene = e, this._currentTweens = [], this._morphHandler = void 0, this._morphCancelled = !1, this._completeMorph = void 0, this._morphToOrthographic = !1;
  }

  u.prototype.completeMorph = function () {
    w(this._completeMorph) && this._completeMorph();
  }, u.prototype.morphTo2D = function (e, t) {
    w(this._completeMorph) && this._completeMorph();
    var o = this._scene;
    this._previousMode = o.mode, this._morphToOrthographic = o.camera.frustum instanceof m, this._previousMode !== l.SCENE2D && this._previousMode !== l.MORPHING && (this._scene.morphStart.raiseEvent(this, this._previousMode, l.SCENE2D, !0), o._mode = l.MORPHING, o.camera._setTransform(M.IDENTITY), this._previousMode === l.COLUMBUS_VIEW ? function (e, t) {
      t *= .5;
      var o = e._scene,
          i = o.camera,
          r = g.clone(i.position, ee),
          n = g.clone(i.direction, te),
          s = g.clone(i.up, oe),
          c = g.negate(g.UNIT_Z, re),
          u = g.clone(g.UNIT_Y, ne),
          p = ie;
      {
        var a, m, h;
        0 < t ? (g.clone(g.ZERO, ie), p.z = 5 * o.mapProjection.ellipsoid.maximumRadius) : (g.clone(r, ie), a = ce, M.multiplyByPoint(R.TRANSFORM_2D, r, a.origin), M.multiplyByPointAsVector(R.TRANSFORM_2D, n, a.direction), m = o.globe, w(m) && (h = m.pickWorldCoordinates(a, o, ue), w(h) && (M.multiplyByPoint(R.TRANSFORM_2D_INVERSE, h, p), p.z += g.distance(r, p))));
      }
      var d = se;
      d.right = .5 * p.z, d.left = -d.right, d.top = d.right * (o.drawingBufferHeight / o.drawingBufferWidth), d.bottom = -d.top;
      var l = pe;
      l.position = p, l.direction = c, l.up = u, l.frustum = d;
      var f = Me(l);

      function _(e, t) {
        e.position.z = t;
      }

      B(e, f);
      var v = o.tweens.add({
        duration: t,
        easingFunction: T.QUARTIC_OUT,
        startObject: {
          time: 0
        },
        stopObject: {
          time: 1
        },
        update: function update(e) {
          K(r, p, e.time, i.position), K(n, c, e.time, i.direction), K(s, u, e.time, i.up), g.cross(i.direction, i.up, i.right), g.normalize(i.right, i.right), i._adjustOrthographicFrustum(!0);
        },
        complete: function complete() {
          $(e, t, l, _, f);
        }
      });

      e._currentTweens.push(v);
    }(this, e) : function (e, t, o) {
      t *= .5;
      var i = e._scene,
          r = i.camera,
          n = me;
      {
        var s, c, u, p, a, m, h;
        0 < t ? (g.clone(g.ZERO, n.position), n.position.z = 5 * o.maximumRadius, g.negate(g.UNIT_Z, n.direction), g.clone(g.UNIT_Y, n.up)) : (o.cartesianToCartographic(r.positionWC, ae), i.mapProjection.project(ae, n.position), g.negate(g.UNIT_Z, n.direction), g.clone(g.UNIT_Y, n.up), s = le, g.clone(n.position2D, s.origin), c = g.clone(r.directionWC, s.direction), u = o.scaleToGeodeticSurface(r.positionWC, _e), p = v.eastNorthUpToFixedFrame(u, o, fe), M.inverseTransformation(p, p), M.multiplyByPointAsVector(p, c, c), M.multiplyByPointAsVector(R.TRANSFORM_2D, c, c), a = i.globe, w(a) && (m = a.pickWorldCoordinates(s, i, de), w(m) && (h = g.distance(n.position2D, m), m.x += h, g.clone(m, n.position2D))));
      }

      function d(e, t) {
        e.position.x = t;
      }

      M.multiplyByPoint(R.TRANSFORM_2D, n.position, n.position2D), M.multiplyByPointAsVector(R.TRANSFORM_2D, n.direction, n.direction2D), M.multiplyByPointAsVector(R.TRANSFORM_2D, n.up, n.up2D);
      var l = n.frustum;
      l.right = .5 * n.position.z, l.left = -l.right, l.top = l.right * (i.drawingBufferHeight / i.drawingBufferWidth), l.bottom = -l.top;
      var f = he;
      M.multiplyByPoint(R.TRANSFORM_2D_INVERSE, n.position2D, f.position), g.clone(n.direction, f.direction), g.clone(n.up, f.up), f.frustum = l;

      var _ = Me(f);

      B(e, _), ge(e, t, n, function () {
        $(e, t, n, d, _);
      });
    }(this, e, t), 0 === e && w(this._completeMorph) && this._completeMorph());
  };

  var f = new g(),
      _ = new g(),
      E = new g(),
      C = new g(),
      O = new g(),
      D = new g(),
      N = new g(),
      y = new e(),
      S = new M(),
      I = new r(),
      A = new m(),
      U = {
    position: void 0,
    direction: void 0,
    up: void 0,
    position2D: void 0,
    direction2D: void 0,
    up2D: void 0,
    frustum: void 0
  };

  u.prototype.morphToColumbusView = function (e, t) {
    w(this._completeMorph) && this._completeMorph();
    var o,
        i,
        r,
        n,
        s,
        c,
        u,
        p,
        a,
        m,
        h = this._scene;
    this._previousMode = h.mode, this._previousMode !== l.COLUMBUS_VIEW && this._previousMode !== l.MORPHING && (this._scene.morphStart.raiseEvent(this, this._previousMode, l.COLUMBUS_VIEW, !0), h.camera._setTransform(M.IDENTITY), o = f, i = _, r = E, 0 < e ? (o.x = 0, o.y = -1, o.z = 1, o = g.multiplyByScalar(g.normalize(o, o), 5 * t.maximumRadius, o), g.negate(g.normalize(o, i), i), g.cross(g.UNIT_X, i, r)) : (n = h.camera, this._previousMode === l.SCENE2D ? (g.clone(n.position, o), o.z = n.frustum.right - n.frustum.left, g.negate(g.UNIT_Z, i), g.clone(g.UNIT_Y, r)) : (g.clone(n.positionWC, o), g.clone(n.directionWC, i), g.clone(n.upWC, r), s = t.scaleToGeodeticSurface(o, N), c = v.eastNorthUpToFixedFrame(s, t, S), M.inverseTransformation(c, c), h.mapProjection.project(t.cartesianToCartographic(o, y), o), M.multiplyByPointAsVector(c, i, i), M.multiplyByPointAsVector(c, r, r))), this._morphToOrthographic ? ((u = A).width = h.camera.frustum.right - h.camera.frustum.left, u.aspectRatio = h.drawingBufferWidth / h.drawingBufferHeight) : ((u = I).aspectRatio = h.drawingBufferWidth / h.drawingBufferHeight, u.fov = d.toRadians(60)), (p = U).position = o, p.direction = i, p.up = r, p.frustum = u, m = p, B(this, a = function a(e) {
      var t = e._scene;
      t._mode = l.COLUMBUS_VIEW, t.morphTime = l.getMorphTime(l.COLUMBUS_VIEW), P(e);
      var o = t.camera;
      e._previousModeMode === l.MORPHING && !e._morphCancelled || (e._morphCancelled = !1, g.clone(m.position, o.position), g.clone(m.direction, o.direction), g.clone(m.up, o.up), g.cross(o.direction, o.up, o.right), g.normalize(o.right, o.right));
      var i = o.frustum;
      t.frameState.useLogDepth && (i.near = .1, i.far = 1e10);
      var r = w(e._completeMorph);
      e._completeMorph = void 0, t.camera.update(t.mode), e._scene.morphComplete.raiseEvent(e, e._previousMode, l.COLUMBUS_VIEW, r);
    }), this._previousMode === l.SCENE2D ? function (r, n, s, c) {
      n *= .5;
      var u = r._scene,
          p = u.camera,
          a = g.clone(s.position, X),
          m = g.clone(s.direction, q),
          h = g.clone(s.up, J);

      function e() {
        p.frustum = s.frustum.clone();
        var t = g.clone(p.position, Q),
            o = g.clone(p.direction, Y),
            i = g.clone(p.up, k);
        t.z = a.z;
        var e = u.tweens.add({
          duration: n,
          easingFunction: T.QUARTIC_OUT,
          startObject: {
            time: 0
          },
          stopObject: {
            time: 1
          },
          update: function update(e) {
            K(t, a, e.time, p.position), K(o, m, e.time, p.direction), K(i, h, e.time, p.up), g.cross(p.direction, p.up, p.right), g.normalize(p.right, p.right);
          },
          complete: function complete() {
            c(r);
          }
        });

        r._currentTweens.push(e);
      }

      u._mode = l.MORPHING, r._morphToOrthographic ? e() : ve(r, 0, s, e);
    }(this, e, p, a) : (p.position2D = M.multiplyByPoint(R.TRANSFORM_2D, o, C), p.direction2D = M.multiplyByPointAsVector(R.TRANSFORM_2D, i, O), p.up2D = M.multiplyByPointAsVector(R.TRANSFORM_2D, r, D), h._mode = l.MORPHING, ge(this, e, p, a)), 0 === e && w(this._completeMorph) && this._completeMorph());
  };

  var h = {
    position: new g(),
    direction: new g(),
    up: new g(),
    frustum: void 0
  },
      p = new r();

  function B(e, t) {
    var o;
    e._scene.completeMorphOnUserInput && (e._morphHandler = new s(e._scene.canvas, !1), o = function o() {
      e._morphCancelled = !0, e._scene.camera.cancelFlight(), t(e);
    }, e._completeMorph = o, e._morphHandler.setInputAction(o, c.LEFT_DOWN), e._morphHandler.setInputAction(o, c.MIDDLE_DOWN), e._morphHandler.setInputAction(o, c.RIGHT_DOWN), e._morphHandler.setInputAction(o, c.WHEEL));
  }

  function P(e) {
    for (var t = e._currentTweens, o = 0; o < t.length; ++o) {
      t[o].cancelTween();
    }

    e._currentTweens.length = 0, e._morphHandler = e._morphHandler && e._morphHandler.destroy();
  }

  u.prototype.morphTo3D = function (e, t) {
    w(this._completeMorph) && this._completeMorph();
    var o,
        i,
        r,
        n,
        s = this._scene;
    this._previousMode = s.mode, this._previousMode !== l.SCENE3D && this._previousMode !== l.MORPHING && (this._scene.morphStart.raiseEvent(this, this._previousMode, l.SCENE3D, !0), s._mode = l.MORPHING, s.camera._setTransform(M.IDENTITY), this._previousMode === l.SCENE2D ? function (e, t, o) {
      t /= 3;
      var i,
          r,
          n = e._scene,
          s = n.camera;
      0 < t ? (i = h, g.fromDegrees(0, 0, 5 * o.maximumRadius, o, i.position), g.negate(i.position, i.direction), g.normalize(i.direction, i.direction), g.clone(g.UNIT_Z, i.up)) : (s.position.z = s.frustum.right - s.frustum.left, i = a(e, o));
      e._morphToOrthographic ? ((r = Z).aspectRatio = n.drawingBufferWidth / n.drawingBufferHeight, r.width = s.frustum.right - s.frustum.left) : ((r = p).aspectRatio = n.drawingBufferWidth / n.drawingBufferHeight, r.fov = d.toRadians(60));
      i.frustum = r;
      var c,
          u = Te(i);
      B(e, u), c = e._morphToOrthographic ? function () {
        L(e, t, i, u);
      } : function () {
        ve(e, t, i, function () {
          L(e, t, i, u);
        });
      };
      0 < t ? (n._mode = l.SCENE2D, s.flyTo({
        duration: t,
        destination: g.fromDegrees(0, 0, 5 * o.maximumRadius, o, X),
        complete: function complete() {
          n._mode = l.MORPHING, c();
        }
      })) : c();
    }(this, e, t) : (0 < e ? (o = h, g.fromDegrees(0, 0, 5 * t.maximumRadius, t, o.position), g.negate(o.position, o.direction), g.normalize(o.direction, o.direction), g.clone(g.UNIT_Z, o.up)) : o = a(this, t), (r = s.camera).frustum instanceof m ? i = r.frustum.clone() : ((i = p).aspectRatio = s.drawingBufferWidth / s.drawingBufferHeight, i.fov = d.toRadians(60)), o.frustum = i, B(this, n = Te(o)), L(this, e, o, n)), 0 === e && w(this._completeMorph) && this._completeMorph());
  }, u.prototype.isDestroyed = function () {
    return !1;
  }, u.prototype.destroy = function () {
    return P(this), o(this);
  };
  var F = new e(),
      H = new g(),
      V = new M();

  function a(e, t) {
    var o = e._scene,
        i = o.camera,
        r = h,
        n = r.position,
        s = r.direction,
        c = r.up,
        u = o.mapProjection.unproject(i.position, F);
    t.cartographicToCartesian(u, n);
    var p = t.scaleToGeodeticSurface(n, H),
        a = v.eastNorthUpToFixedFrame(p, t, V);
    return M.multiplyByPointAsVector(a, i.direction, s), M.multiplyByPointAsVector(a, i.up, c), r;
  }

  var j = new g(),
      z = new g(),
      W = new g(),
      b = new g(),
      G = new g(),
      x = new g();

  function L(e, t, o, i) {
    t *= .5;
    var r = e._scene,
        n = r.camera,
        s = g.clone(n.position, j),
        c = g.clone(n.direction, z),
        u = g.clone(n.up, W),
        p = M.multiplyByPoint(R.TRANSFORM_2D_INVERSE, o.position, b),
        a = M.multiplyByPointAsVector(R.TRANSFORM_2D_INVERSE, o.direction, G),
        m = M.multiplyByPointAsVector(R.TRANSFORM_2D_INVERSE, o.up, x);
    var h = r.tweens.add({
      duration: t,
      easingFunction: T.QUARTIC_OUT,
      startObject: {
        time: 0
      },
      stopObject: {
        time: 1
      },
      update: function update(e) {
        K(s, p, e.time, n.position), K(c, a, e.time, n.direction), K(u, m, e.time, n.up), g.cross(n.direction, n.up, n.right), g.normalize(n.right, n.right);
      },
      complete: function complete() {
        we(e, r, 0, 1, t, i);
      }
    });

    e._currentTweens.push(h);
  }

  var Z = new m(),
      Q = new g(),
      Y = new g(),
      k = new g(),
      X = new g(),
      q = new g(),
      J = new g();

  function K(e, t, o, i) {
    return g.lerp(e, t, o, i);
  }

  function $(e, t, o, i, r) {
    var n,
        s,
        c,
        u,
        p = e._scene,
        a = p.camera;
    a.frustum instanceof m || (n = a.frustum.fov, s = .5 * d.RADIANS_PER_DEGREE, c = o.position.z * Math.tan(.5 * n), a.frustum.far = c / Math.tan(.5 * s) + 1e7, u = p.tweens.add({
      duration: t,
      easingFunction: T.QUARTIC_OUT,
      startObject: {
        time: 0
      },
      stopObject: {
        time: 1
      },
      update: function update(e) {
        a.frustum.fov = d.lerp(n, s, e.time);
        var t = c / Math.tan(.5 * a.frustum.fov);
        i(a, t);
      },
      complete: function complete() {
        a.frustum = o.frustum.clone(), r(e);
      }
    }), e._currentTweens.push(u));
  }

  var ee = new g(),
      te = new g(),
      oe = new g(),
      ie = new g(),
      re = new g(),
      ne = new g(),
      se = new i(),
      ce = new n(),
      ue = new g(),
      pe = {
    position: void 0,
    direction: void 0,
    up: void 0,
    frustum: void 0
  };

  var ae = new e(),
      me = {
    position: new g(),
    direction: new g(),
    up: new g(),
    position2D: new g(),
    direction2D: new g(),
    up2D: new g(),
    frustum: new i()
  },
      he = {
    position: new g(),
    direction: new g(),
    up: new g(),
    frustum: void 0
  },
      de = new g(),
      le = new n(),
      fe = new M(),
      _e = new g();

  function ve(e, t, o, i) {
    var r = e._scene,
        n = r.camera,
        s = n.frustum.right - n.frustum.left;
    n.frustum = o.frustum.clone();
    var c = n.frustum.fov,
        u = .5 * d.RADIANS_PER_DEGREE,
        p = s * Math.tan(.5 * c);
    n.frustum.far = p / Math.tan(.5 * u) + 1e7, n.frustum.fov = u;
    var a = r.tweens.add({
      duration: t,
      easingFunction: T.QUARTIC_OUT,
      startObject: {
        time: 0
      },
      stopObject: {
        time: 1
      },
      update: function update(e) {
        n.frustum.fov = d.lerp(u, c, e.time), n.position.z = p / Math.tan(.5 * n.frustum.fov);
      },
      complete: function complete() {
        i(e);
      }
    });

    e._currentTweens.push(a);
  }

  function ge(e, t, o, i) {
    var r = e._scene,
        n = r.camera,
        s = g.clone(n.position, Q),
        c = g.clone(n.direction, Y),
        u = g.clone(n.up, k),
        p = g.clone(o.position2D, X),
        a = g.clone(o.direction2D, q),
        m = g.clone(o.up2D, J);
    var h = r.tweens.add({
      duration: t,
      easingFunction: T.QUARTIC_OUT,
      startObject: {
        time: 0
      },
      stopObject: {
        time: 1
      },
      update: function update(e) {
        K(s, p, e.time, n.position), K(c, a, e.time, n.direction), K(u, m, e.time, n.up), g.cross(n.direction, n.up, n.right), g.normalize(n.right, n.right), n._adjustOrthographicFrustum(!0);
      },
      complete: function complete() {
        we(e, r, 1, 0, t, i);
      }
    });

    e._currentTweens.push(h);
  }

  function we(e, t, o, i, r, n) {
    var s = {
      object: t,
      property: "morphTime",
      startValue: o,
      stopValue: i,
      duration: r,
      easingFunction: T.QUARTIC_OUT
    };
    w(n) && (s.complete = function () {
      n(e);
    });
    var c = t.tweens.addProperty(s);

    e._currentTweens.push(c);
  }

  function Te(n) {
    return function (e) {
      var t = e._scene;
      t._mode = l.SCENE3D, t.morphTime = l.getMorphTime(l.SCENE3D), P(e);
      var o = t.camera;
      e._previousMode === l.MORPHING && !e._morphCancelled || (e._morphCancelled = !1, g.clone(n.position, o.position), g.clone(n.direction, o.direction), g.clone(n.up, o.up), g.cross(o.direction, o.up, o.right), g.normalize(o.right, o.right), o.frustum = n.frustum.clone());
      var i = o.frustum;
      t.frameState.useLogDepth && (i.near = .1, i.far = 1e10);
      var r = w(e._completeMorph);
      e._completeMorph = void 0, t.camera.update(t.mode), e._scene.morphComplete.raiseEvent(e, e._previousMode, l.SCENE3D, r);
    };
  }

  function Me(r) {
    return function (e) {
      var t = e._scene;
      t._mode = l.SCENE2D, t.morphTime = l.getMorphTime(l.SCENE2D), P(e);
      var o = t.camera;
      g.clone(r.position, o.position), o.position.z = 2 * t.mapProjection.ellipsoid.maximumRadius, g.clone(r.direction, o.direction), g.clone(r.up, o.up), g.cross(o.direction, o.up, o.right), g.normalize(o.right, o.right), o.frustum = r.frustum.clone();
      var i = w(e._completeMorph);
      e._completeMorph = void 0, t.camera.update(t.mode), e._scene.morphComplete.raiseEvent(e, e._previousMode, l.SCENE2D, i);
    };
  }

  return u;
});