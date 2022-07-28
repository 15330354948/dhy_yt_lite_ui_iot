"use strict";

define(["../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Cartographic", "../Core/defaultValue", "../Core/defined", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Ellipsoid", "../Core/HeadingPitchRoll", "../Core/IntersectionTests", "../Core/isArray", "../Core/KeyboardEventModifier", "../Core/Math", "../Core/Matrix3", "../Core/Matrix4", "../Core/OrthographicFrustum", "../Core/Plane", "../Core/Quaternion", "../Core/Ray", "../Core/Transforms", "./CameraEventAggregator", "./CameraEventType", "./MapMode2D", "./SceneMode", "./SceneTransforms", "./TweenCollection"], function (ei, oi, i, e, y, ni, t, o, W, n, Z, u, a, ai, B, U, ri, F, D, A, L, r, s, m, si, li, l) {
  "use strict";

  function c(i) {
    if (!ni(i)) throw new o("scene is required.");
    this.enableInputs = !0, this.enableTranslate = !0, this.enableZoom = !0, this.enableRotate = !0, this.enableTilt = !0, this.enableLook = !0, this.inertiaSpin = .9, this.inertiaTranslate = .9, this.inertiaZoom = .8, this.maximumMovementRatio = .1, this.bounceAnimationTime = 3, this.minimumZoomDistance = 1, this.maximumZoomDistance = Number.POSITIVE_INFINITY, this.translateEventTypes = s.LEFT_DRAG, this.zoomEventTypes = [s.WHEEL, s.MIDDLE_DRAG, s.PINCH], this.rotateEventTypes = s.LEFT_DRAG, this.tiltEventTypes = [s.RIGHT_DRAG, s.PINCH, {
      eventType: s.LEFT_DRAG,
      modifier: a.CTRL
    }, {
      eventType: s.RIGHT_DRAG,
      modifier: a.CTRL
    }], this.lookEventTypes = {
      eventType: s.LEFT_DRAG,
      modifier: a.SHIFT
    }, this.minimumPickingTerrainHeight = 15e4, this._minimumPickingTerrainHeight = this.minimumPickingTerrainHeight, this.minimumCollisionTerrainHeight = 15e3, this._minimumCollisionTerrainHeight = this.minimumCollisionTerrainHeight, this.minimumTrackBallHeight = 75e5, this._minimumTrackBallHeight = this.minimumTrackBallHeight, this.enableCollisionDetection = !0, this._scene = i, this._globe = void 0, this._ellipsoid = void 0, this._aggregator = new r(i.canvas), this._lastInertiaSpinMovement = void 0, this._lastInertiaZoomMovement = void 0, this._lastInertiaTranslateMovement = void 0, this._lastInertiaTiltMovement = void 0, this._tweens = new l(), this._tween = void 0, this._horizontalRotationAxis = void 0, this._tiltCenterMousePosition = new ei(-1, -1), this._tiltCenter = new oi(), this._rotateMousePosition = new ei(-1, -1), this._rotateStartPosition = new oi(), this._strafeStartPosition = new oi(), this._zoomMouseStart = new ei(-1, -1), this._zoomWorldPosition = new oi(), this._useZoomWorldPosition = !1, this._tiltCVOffMap = !1, this._looking = !1, this._rotating = !1, this._strafing = !1, this._zoomingOnVector = !1, this._rotatingZoom = !1;
    var t = i.mapProjection;
    this._maxCoord = t.project(new e(Math.PI, ai.PI_OVER_TWO)), this._zoomFactor = 5, this._rotateFactor = void 0, this._rotateRateRangeAdjustment = void 0, this._maximumRotateRate = 1.77, this._minimumRotateRate = 2e-4, this._minimumZoomRate = 20, this._maximumZoomRate = 5906376272e3;
  }

  var p = .4;

  function h(i, t, e, o, n, a, r) {
    var s = a[r];
    ni(s) || (s = a[r] = {
      startPosition: new ei(),
      endPosition: new ei(),
      motion: new ei(),
      active: !1
    });

    var l,
        m = i.getButtonPressTime(t, e),
        c = i.getButtonReleaseTime(t, e),
        d = m && c && (c.getTime() - m.getTime()) / 1e3,
        _ = new Date(),
        g = c && (_.getTime() - c.getTime()) / 1e3;

    if (m && c && d < p) {
      var u = function (i, t) {
        if (i < 0) return 0;
        var e = 25 * (1 - t);
        return Math.exp(-e * i);
      }(g, o);

      if (s.active) s.startPosition = ei.clone(s.endPosition, s.startPosition), s.endPosition = ei.multiplyByScalar(s.motion, u, s.endPosition), s.endPosition = ei.add(s.startPosition, s.endPosition, s.endPosition), s.motion = ei.clone(ei.ZERO, s.motion);else {
        var h = i.getLastMovement(t, e);
        if (!ni(h) || (l = h, ei.equalsEpsilon(l.startPosition, l.endPosition, ai.EPSILON14))) return;
        s.motion.x = .5 * (h.endPosition.x - h.startPosition.x), s.motion.y = .5 * (h.endPosition.y - h.startPosition.y), s.startPosition = ei.clone(h.startPosition, s.startPosition), s.endPosition = ei.multiplyByScalar(s.motion, u, s.endPosition), s.endPosition = ei.add(s.startPosition, s.endPosition, s.endPosition), s.active = !0;
      }
      if (isNaN(s.endPosition.x) || isNaN(s.endPosition.y) || ei.distance(s.startPosition, s.endPosition) < .5) return void (s.active = !1);
      i.isButtonDown(t, e) || n(a, i.getStartMousePosition(t, e), s);
    } else s.active = !1;
  }

  var v = [];

  function d(i, t, e, o, n, a) {
    if (ni(e)) {
      var r = i._aggregator;
      u(e) || (v[0] = e, e = v);

      for (var s = e.length, l = 0; l < s; ++l) {
        var m = e[l],
            c = ni(m.eventType) ? m.eventType : m,
            d = m.modifier,
            _ = r.isMoving(c, d) && r.getMovement(c, d),
            g = r.getStartMousePosition(c, d);

        i.enableInputs && t && (_ ? o(i, g, _) : n < 1 && h(r, c, d, n, o, i, a));
      }
    }
  }

  var mi = new A(),
      ci = new oi(),
      di = new ei(),
      _i = new oi(),
      gi = new ei(),
      ui = new oi(),
      hi = new oi(),
      pi = new oi(),
      vi = new oi(),
      Pi = new oi(),
      Ti = new oi(),
      yi = new oi(),
      fi = new oi(),
      wi = new oi(),
      Ri = new oi(),
      Ci = new oi(),
      Ei = new oi(),
      Mi = new oi(),
      xi = new oi(),
      Ii = new oi(),
      zi = new oi(),
      Si = new oi(),
      ki = new oi(),
      bi = {
    orientation: new n()
  };

  function g(i, t, e, o, n, a) {
    var r = 1;
    ni(a) && (r = ai.clamp(Math.abs(a), .25, 1));
    var s = i.minimumZoomDistance * r,
        l = i.maximumZoomDistance,
        m = o * (n - s),
        m = ai.clamp(m, i._minimumZoomRate, i._maximumZoomRate),
        c = (e.endPosition.y - e.startPosition.y) / i._scene.canvas.clientHeight,
        d = m * (c = Math.min(c, i.maximumMovementRatio));

    if (!(0 < d && Math.abs(n - s) < 1 || d < 0 && Math.abs(n - l) < 1)) {
      n - d < s ? d = n - s - 1 : l < n - d && (d = n - l);
      var _ = i._scene,
          g = _.camera,
          u = _.mode,
          h = bi.orientation;
      if (h.heading = g.heading, h.pitch = g.pitch, h.roll = g.roll, g.frustum instanceof ri) 0 < Math.abs(d) && (g.zoomIn(d), g._adjustOrthographicFrustum());else {
        var p,
            v = ei.equals(t, i._zoomMouseStart),
            P = i._zoomingOnVector,
            T = i._rotatingZoom;

        if (v || (i._zoomMouseStart = ei.clone(t, i._zoomMouseStart), ni(i._globe) && (p = u === si.SCENE2D ? (p = g.getPickRay(t, mi).origin, oi.fromElements(p.y, p.z, p.x)) : Ni(i, t, ci)), ni(p) ? (i._useZoomWorldPosition = !0, i._zoomWorldPosition = oi.clone(p, i._zoomWorldPosition)) : i._useZoomWorldPosition = !1, P = i._zoomingOnVector = !1, T = i._rotatingZoom = !1), i._useZoomWorldPosition) {
          var y,
              f,
              w = u === si.COLUMBUS_VIEW;

          if (g.positionCartographic.height < 2e6 && (T = !0), !v || T) {
            if (u === si.SCENE2D) {
              var R,
                  C,
                  E,
                  M = i._zoomWorldPosition,
                  x = g.position;
              !oi.equals(M, x) && g.positionCartographic.height < 2 * i._maxCoord.x && (R = g.position.x, C = oi.subtract(M, x, _i), oi.normalize(C, C), E = oi.distance(M, x) * d / (.5 * g.getMagnitude()), g.move(C, .5 * E), (g.position.x < 0 && 0 < R || 0 < g.position.x && R < 0) && (p = g.getPickRay(t, mi).origin, p = oi.fromElements(p.y, p.z, p.x), i._zoomWorldPosition = oi.clone(p, i._zoomWorldPosition)));
            } else if (u === si.SCENE3D) {
              var I = oi.normalize(g.position, Pi);
              if (g.positionCartographic.height < 3e3 && Math.abs(oi.dot(g.direction, I)) < .6) w = !0;else {
                var z = _.canvas,
                    S = gi;
                S.x = z.clientWidth / 2, S.y = z.clientHeight / 2;
                var k,
                    b,
                    N,
                    A,
                    H,
                    O,
                    W = Ni(i, S, ui);

                if (ni(W) && g.positionCartographic.height < 1e6) {
                  var Z = yi;
                  oi.clone(g.position, Z);
                  var B = i._zoomWorldPosition,
                      U = Ti,
                      U = oi.normalize(B, U);
                  if (oi.dot(U, I) < 0) return;
                  var F = Ii,
                      D = Ri;
                  oi.clone(g.direction, D), oi.add(Z, oi.multiplyByScalar(D, 1e3, zi), F);
                  var L = Ci,
                      q = Ei;
                  oi.subtract(B, Z, L), oi.normalize(L, q);
                  var V = oi.dot(I, q);
                  if (0 <= V) return void (i._zoomMouseStart.x = -1);
                  var j = Math.acos(-V),
                      G = oi.magnitude(Z),
                      Y = oi.magnitude(B),
                      X = G - d,
                      Q = oi.magnitude(L),
                      K = Math.asin(ai.clamp(Q / Y * Math.sin(j), -1, 1)) - Math.asin(ai.clamp(X / Y * Math.sin(j), -1, 1)) + j,
                      J = fi;
                  oi.normalize(Z, J);
                  var $ = wi,
                      $ = oi.cross(q, J, $);
                  $ = oi.normalize($, $), oi.normalize(oi.cross(J, $, zi), D), oi.multiplyByScalar(oi.normalize(F, zi), oi.magnitude(F) - d, F), oi.normalize(Z, Z), oi.multiplyByScalar(Z, X, Z);
                  var ii = Mi;
                  oi.multiplyByScalar(oi.add(oi.multiplyByScalar(J, Math.cos(K) - 1, Si), oi.multiplyByScalar(D, Math.sin(K), ki), zi), X, ii), oi.add(Z, ii, Z), oi.normalize(F, J), oi.normalize(oi.cross(J, $, zi), D);
                  var ti = xi;
                  return oi.multiplyByScalar(oi.add(oi.multiplyByScalar(J, Math.cos(K) - 1, Si), oi.multiplyByScalar(D, Math.sin(K), ki), zi), oi.magnitude(F), ti), oi.add(F, ti, F), oi.clone(Z, g.position), oi.normalize(oi.subtract(F, Z, zi), g.direction), oi.clone(g.direction, g.direction), oi.cross(g.direction, g.up, g.right), oi.cross(g.right, g.direction, g.up), void g.setView(bi);
                }

                ni(W) ? (k = oi.normalize(W, hi), b = oi.normalize(i._zoomWorldPosition, pi), 0 < (N = oi.dot(b, k)) && N < 1 && (A = ai.acosClamped(N), H = oi.cross(b, k, vi), O = d / (Math.abs(A) > ai.toRadians(20) ? .75 * g.positionCartographic.height : g.positionCartographic.height - d), g.rotate(H, A * O))) : w = !0;
              }
            }

            i._rotatingZoom = !w;
          }

          !v && w || P ? (y = li.wgs84ToWindowCoordinates(_, i._zoomWorldPosition, di), f = (u !== si.COLUMBUS_VIEW && ei.equals(t, i._zoomMouseStart) && ni(y) ? g.getPickRay(y, mi) : g.getPickRay(t, mi)).direction, u !== si.COLUMBUS_VIEW && u !== si.SCENE2D || oi.fromElements(f.y, f.z, f.x, f), g.move(f, d), i._zoomingOnVector = !0) : g.zoomIn(d), g.setView(bi);
        } else g.zoomIn(d);
      }
    }
  }

  var _ = new A(),
      P = new A(),
      T = new oi();

  function f(i, t, e) {
    var o = i._scene.camera,
        n = o.getPickRay(e.startPosition, _).origin,
        a = o.getPickRay(e.endPosition, P).origin,
        n = oi.fromElements(n.y, n.z, n.x, n),
        a = oi.fromElements(a.y, a.z, a.x, a),
        r = oi.subtract(n, a, T),
        s = oi.magnitude(r);
    0 < s && (oi.normalize(r, r), o.move(r, s));
  }

  function w(i, t, e) {
    ni(e.distance) && (e = e.distance);
    var o = i._scene.camera;
    g(i, t, e, i._zoomFactor, o.getMagnitude());
  }

  var R = new ei(),
      C = new ei();

  function E(i, t, e) {
    var o, n, a, r, s, l, m, c, d, _;

    ni(e.angleAndHeight) ? function (i, t) {
      var e = i._rotateFactor * i._rotateRateRangeAdjustment;
      e > i._maximumRotateRate && (e = i._maximumRotateRate);
      e < i._minimumRotateRate && (e = i._minimumRotateRate);
      var o = i._scene,
          n = o.camera,
          a = o.canvas,
          r = (t.endPosition.x - t.startPosition.x) / a.clientWidth;
      r = Math.min(r, i.maximumMovementRatio);
      var s = e * r * Math.PI * 4;
      n.twistRight(s);
    }(i, e.angleAndHeight) : (n = (o = i._scene).camera, r = (a = o.canvas).clientWidth, s = a.clientHeight, (l = R).x = 2 / r * e.startPosition.x - 1, l.y = 2 / s * (s - e.startPosition.y) - 1, l = ei.normalize(l, l), (m = C).x = 2 / r * e.endPosition.x - 1, m.y = 2 / s * (s - e.endPosition.y) - 1, m = ei.normalize(m, m), c = ai.acosClamped(l.x), l.y < 0 && (c = ai.TWO_PI - c), d = ai.acosClamped(m.x), m.y < 0 && (d = ai.TWO_PI - d), _ = d - c, n.twistRight(_));
  }

  var M = new A(),
      x = new oi(),
      I = new oi();

  function Ni(i, t, e) {
    var o,
        n = i._scene,
        a = i._globe,
        r = n.camera;

    if (ni(a)) {
      n.pickPositionSupported && (o = n.pickPositionWorldCoordinates(t, x));
      var s = r.getPickRay(t, M),
          l = a.pickWorldCoordinates(s, n, I);
      return (ni(o) ? oi.distance(o, r.positionWC) : Number.POSITIVE_INFINITY) < (ni(l) ? oi.distance(l, r.positionWC) : Number.POSITIVE_INFINITY) ? oi.clone(o, e) : oi.clone(l, e);
    }
  }

  var z = new A(),
      S = new A(),
      k = new oi(),
      b = new oi(),
      N = new oi(),
      H = new oi(),
      O = new F(oi.UNIT_X, 0),
      q = new ei(),
      V = new ei();

  function j(i, t, e) {
    if (oi.equals(t, i._translateMousePosition) || (i._looking = !1), oi.equals(t, i._strafeMousePosition) || (i._strafing = !1), i._looking) At(i, 0, e);else if (i._strafing) Xi(i, 0, e);else {
      var o,
          n = i._scene.camera,
          a = ei.clone(e.startPosition, q),
          r = ei.clone(e.endPosition, V),
          s = n.getPickRay(a, z),
          l = oi.clone(oi.ZERO, H),
          m = oi.UNIT_X;
      if (n.position.z < i._minimumPickingTerrainHeight && (o = Ni(i, a, k), ni(o) && (l.x = o.x)), l.x > n.position.z && ni(o)) return oi.clone(o, i._strafeStartPosition), i._strafing = !0, Xi(i, 0, e), void (i._strafeMousePosition = ei.clone(t, i._strafeMousePosition));

      var c = F.fromPointNormal(l, m, O),
          s = n.getPickRay(a, z),
          d = Z.rayPlane(s, c, k),
          _ = n.getPickRay(r, S),
          g = Z.rayPlane(_, c, b);

      if (!ni(d) || !ni(g)) return i._looking = !0, At(i, 0, e), void ei.clone(t, i._translateMousePosition);
      var u = oi.subtract(d, g, N),
          h = u.x;
      u.x = u.y, u.y = u.z, u.z = h;
      var p = oi.magnitude(u);
      p > ai.EPSILON6 && (oi.normalize(u, u), n.move(u, p));
    }
  }

  var G = new ei(),
      Y = new A(),
      X = new oi(),
      Q = new oi(),
      K = new U(),
      J = new U(),
      $ = new oi(),
      ii = new F(oi.UNIT_X, 0),
      ti = new oi(),
      Ai = new e(),
      Hi = new U(),
      Oi = new D(),
      Wi = new B(),
      Zi = new oi();

  function Bi(i, t, e) {
    var o, n, a;
    ni(e.angleAndHeight) && (e = e.angleAndHeight), ei.equals(t, i._tiltCenterMousePosition) || (i._tiltCVOffMap = !1, i._looking = !1), i._looking ? At(i, 0, e) : (o = i._scene.camera, n = i._maxCoord, a = Math.abs(o.position.x) - n.x < 0 && Math.abs(o.position.y) - n.y < 0, i._tiltCVOffMap || !a || o.position.z > i._minimumPickingTerrainHeight ? (i._tiltCVOffMap = !0, function (i, t, e) {
      var o = i._scene,
          n = o.camera,
          a = o.canvas,
          r = G;
      r.x = a.clientWidth / 2, r.y = a.clientHeight / 2;

      var s,
          l = n.getPickRay(r, Y),
          m = oi.UNIT_X,
          c = l.origin,
          d = l.direction,
          _ = oi.dot(m, d);

      Math.abs(_) > ai.EPSILON6 && (s = -oi.dot(m, c) / _);
      if (!ni(s) || s <= 0) return i._looking = !0, At(i, 0, e), ei.clone(t, i._tiltCenterMousePosition);
      var g = oi.multiplyByScalar(d, s, X);
      oi.add(c, g, g);
      var u = o.mapProjection,
          h = u.ellipsoid;
      oi.fromElements(g.y, g.z, g.x, g);
      var p = u.unproject(g, Ai);
      h.cartographicToCartesian(p, g);
      var v = L.eastNorthUpToFixedFrame(g, h, K),
          P = i._globe,
          T = i._ellipsoid;
      i._globe = void 0, i._ellipsoid = W.UNIT_SPHERE, i._rotateFactor = 1, i._rotateRateRangeAdjustment = 1;
      var y = U.clone(n.transform, Hi);
      n._setTransform(v), et(i, 0, e, oi.UNIT_Z), n._setTransform(y), i._globe = P;
      var f = (i._ellipsoid = T).maximumRadius;
      i._rotateFactor = 1 / f, i._rotateRateRangeAdjustment = f;
    }(i, t, e)) : function (i, t, e) {
      var o,
          n,
          a,
          r = i._scene,
          s = r.camera,
          l = oi.UNIT_X;
      if (ei.equals(t, i._tiltCenterMousePosition)) o = oi.clone(i._tiltCenter, X);else {
        if (s.position.z < i._minimumPickingTerrainHeight && (o = Ni(i, t, X)), !ni(o)) {
          var m = (n = s.getPickRay(t, Y)).origin,
              c = n.direction,
              d = oi.dot(l, c);
          if (Math.abs(d) > ai.EPSILON6 && (a = -oi.dot(l, m) / d), !ni(a) || a <= 0) return i._looking = !0, At(i, 0, e), ei.clone(t, i._tiltCenterMousePosition);
          o = oi.multiplyByScalar(c, a, X), oi.add(m, o, o);
        }

        ei.clone(t, i._tiltCenterMousePosition), oi.clone(o, i._tiltCenter);
      }
      var _ = r.canvas,
          g = G;
      g.x = _.clientWidth / 2, g.y = i._tiltCenterMousePosition.y, n = s.getPickRay(g, Y);
      var u = oi.clone(oi.ZERO, $);
      u.x = o.x;
      var h = F.fromPointNormal(u, l, ii),
          p = Z.rayPlane(n, h, Q),
          v = s._projection,
          P = v.ellipsoid;
      oi.fromElements(o.y, o.z, o.x, o);
      var T = v.unproject(o, Ai);
      P.cartographicToCartesian(T, o);
      var y,
          f = L.eastNorthUpToFixedFrame(o, P, K);
      y = ni(p) ? (oi.fromElements(p.y, p.z, p.x, p), T = v.unproject(p, Ai), P.cartographicToCartesian(T, p), L.eastNorthUpToFixedFrame(p, P, J)) : f;
      var w = i._globe,
          R = i._ellipsoid;
      i._globe = void 0, i._ellipsoid = W.UNIT_SPHERE, i._rotateFactor = 1, i._rotateRateRangeAdjustment = 1;
      var C = oi.UNIT_Z,
          E = U.clone(s.transform, Hi);

      s._setTransform(f);

      var M = oi.cross(oi.UNIT_Z, oi.normalize(s.position, ti), ti),
          x = oi.dot(s.right, M);
      {
        var I;
        et(i, 0, e, C, !1, !0), s._setTransform(y), x < 0 ? (e.startPosition.y > e.endPosition.y && (C = void 0), I = s.constrainedAxis, s.constrainedAxis = void 0, et(i, 0, e, C, !0, !1), s.constrainedAxis = I) : et(i, 0, e, C, !0, !1);
      }
      {
        var z;
        ni(s.constrainedAxis) && (z = oi.cross(s.direction, s.constrainedAxis, Zi), oi.equalsEpsilon(z, oi.ZERO, ai.EPSILON6) || (oi.dot(z, s.right) < 0 && oi.negate(z, z), oi.cross(z, s.direction, s.up), oi.cross(s.direction, s.up, s.right), oi.normalize(s.up, s.up), oi.normalize(s.right, s.right)));
      }
      s._setTransform(E), i._globe = w;
      var S = (i._ellipsoid = R).maximumRadius;
      i._rotateFactor = 1 / S, i._rotateRateRangeAdjustment = S;
      var k = oi.clone(s.positionWC, ti);
      {
        var b, N, A, H, O;
        s._adjustHeightForTerrain(), oi.equals(s.positionWC, k) || (s._setTransform(y), s.worldToCameraCoordinatesPoint(k, k), b = oi.magnitudeSquared(k), oi.magnitudeSquared(s.position) > b && (oi.normalize(s.position, s.position), oi.multiplyByScalar(s.position, Math.sqrt(b), s.position)), N = oi.angleBetween(k, s.position), A = oi.cross(k, s.position, k), oi.normalize(A, A), H = D.fromAxisAngle(A, N, Oi), O = B.fromQuaternion(H, Wi), B.multiplyByVector(O, s.direction, s.direction), B.multiplyByVector(O, s.up, s.up), oi.cross(s.direction, s.up, s.right), oi.cross(s.right, s.direction, s.up), s._setTransform(E));
      }
    }(i, t, e));
  }

  var Ui = new ei(),
      Fi = new A(),
      Di = new oi();

  function Li(i, t, e) {
    ni(e.distance) && (e = e.distance);
    var o = i._scene,
        n = o.camera,
        a = o.canvas,
        r = Ui;
    r.x = a.clientWidth / 2, r.y = a.clientHeight / 2;

    var s,
        l,
        m,
        c,
        d,
        _ = n.getPickRay(r, Fi);

    n.position.z < i._minimumPickingTerrainHeight && (s = Ni(i, r, Di)), d = ni(s) ? oi.distance(_.origin, s) : (l = oi.UNIT_X, m = _.origin, c = _.direction, -oi.dot(l, m) / oi.dot(l, c)), g(i, t, e, i._zoomFactor, d);
  }

  var qi = new A(),
      Vi = new F(oi.UNIT_X, 0),
      ji = new oi(),
      Gi = new oi(),
      Yi = new oi();

  function Xi(i, t, e) {
    var o,
        n,
        a,
        r,
        s,
        l = i._scene,
        m = l.camera,
        c = Ni(i, e.startPosition, Yi);
    ni(c) && (o = e.endPosition, n = m.getPickRay(o, qi), a = oi.clone(m.direction, Gi), l.mode === si.COLUMBUS_VIEW && oi.fromElements(a.z, a.x, a.y, a), r = F.fromPointNormal(c, a, Vi), s = Z.rayPlane(n, r, ji), ni(s) && (a = oi.subtract(c, s, a), l.mode === si.COLUMBUS_VIEW && oi.fromElements(a.y, a.z, a.x, a), oi.add(m.position, a, m.position)));
  }

  var Qi = new oi(),
      Ki = new e(),
      Ji = new oi(),
      $i = new W(),
      it = new oi();

  function tt(i, t, e) {
    var o,
        n,
        a,
        r,
        s,
        l,
        m,
        c,
        d = i._scene.camera;
    U.equals(d.transform, U.IDENTITY) ? (a = i._ellipsoid.geodeticSurfaceNormal(d.position, it), r = i._ellipsoid.cartesianToCartographic(d.positionWC, Ki).height, s = i._globe, ni(s) && r < i._minimumPickingTerrainHeight && (c = Ni(i, e.startPosition, Yi), ni(c) && (l = d.getPickRay(e.startPosition, M), m = i._ellipsoid.geodeticSurfaceNormal(c), Math.abs(oi.dot(l.direction, m)) < .05 && !i._looking && (i._rotating = !1, i._strafing = !0))), ei.equals(t, i._rotateMousePosition) ? i._looking ? At(i, 0, e, a) : i._rotating ? et(i, 0, e) : i._strafing ? (oi.clone(c, i._strafeStartPosition), Xi(i, 0, e)) : (o = oi.magnitude(i._rotateStartPosition), (n = Ji).x = n.y = n.z = o, dt(i, 0, e, W.fromCartesian3(n, $i))) : (i._looking = !1, i._rotating = !1, i._strafing = !1, ni(s) && r < i._minimumPickingTerrainHeight ? ni(c) ? oi.magnitude(d.position) < oi.magnitude(c) ? (oi.clone(c, i._strafeStartPosition), i._strafing = !0, Xi(i, 0, e)) : (o = oi.magnitude(c), (n = Ji).x = n.y = n.z = o, dt(i, 0, e, W.fromCartesian3(n, $i)), oi.clone(c, i._rotateStartPosition)) : (i._looking = !0, At(i, 0, e, a)) : ni(d.pickEllipsoid(e.startPosition, i._ellipsoid, Qi)) ? (dt(i, 0, e, i._ellipsoid), oi.clone(Qi, i._rotateStartPosition)) : r > i._minimumTrackBallHeight ? (i._rotating = !0, et(i, 0, e)) : (i._looking = !0, At(i, 0, e, a)), ei.clone(t, i._rotateMousePosition))) : et(i, 0, e);
  }

  function et(i, t, e, o, n, a) {
    n = y(n, !1), a = y(a, !1);
    var r = i._scene,
        s = r.camera,
        l = r.canvas,
        m = s.constrainedAxis;
    ni(o) && (s.constrainedAxis = o);
    var c = oi.magnitude(s.position),
        d = i._rotateFactor * (c - i._rotateRateRangeAdjustment);
    d > i._maximumRotateRate && (d = i._maximumRotateRate), d < i._minimumRotateRate && (d = i._minimumRotateRate);

    var _ = (e.startPosition.x - e.endPosition.x) / l.clientWidth,
        g = (e.startPosition.y - e.endPosition.y) / l.clientHeight,
        _ = Math.min(_, i.maximumMovementRatio),
        g = Math.min(g, i.maximumMovementRatio),
        u = d * _ * Math.PI * 2,
        h = d * g * Math.PI;

    n || s.rotateRight(u), a || s.rotateUp(h), s.constrainedAxis = m;
  }

  var ot = i.clone(i.UNIT_W),
      nt = i.clone(i.UNIT_W),
      at = new oi(),
      rt = new oi(),
      st = new oi(),
      lt = new oi(),
      mt = new ei(),
      ct = new ei();

  function dt(i, t, e, o) {
    var n,
        a,
        r,
        s,
        l,
        m,
        c,
        d,
        _,
        g,
        u,
        h,
        p,
        v,
        P,
        T,
        y,
        f,
        w,
        R,
        C,
        E,
        M = i._scene.camera,
        x = ei.clone(e.startPosition, mt),
        I = ei.clone(e.endPosition, ct),
        z = M.pickEllipsoid(x, o, ot),
        S = M.pickEllipsoid(I, o, nt);

    if (!ni(z) || !ni(S)) return i._rotating = !0, void et(i, 0, e);
    z = M.worldToCameraCoordinates(z, z), S = M.worldToCameraCoordinates(S, S), ni(M.constrainedAxis) ? (n = M.constrainedAxis, a = oi.mostOrthogonalAxis(n, at), oi.cross(a, n, a), oi.normalize(a, a), r = oi.cross(n, a, rt), s = oi.magnitude(z), l = oi.dot(n, z), m = Math.acos(l / s), c = oi.multiplyByScalar(n, l, st), oi.subtract(z, c, c), oi.normalize(c, c), d = oi.magnitude(S), _ = oi.dot(n, S), g = Math.acos(_ / d), u = oi.multiplyByScalar(n, _, lt), oi.subtract(S, u, u), oi.normalize(u, u), h = Math.acos(oi.dot(c, a)), oi.dot(c, r) < 0 && (h = ai.TWO_PI - h), p = Math.acos(oi.dot(u, a)), oi.dot(u, r) < 0 && (p = ai.TWO_PI - p), v = h - p, P = oi.equalsEpsilon(n, M.position, ai.EPSILON2) ? M.right : oi.cross(n, M.position, at), T = oi.cross(n, P, at), y = oi.dot(T, oi.subtract(z, n, rt)), f = oi.dot(T, oi.subtract(S, n, rt)), w = 0 < y && 0 < f ? g - m : 0 < y && f <= 0 ? 0 < oi.dot(M.position, n) ? -m - g : m + g : m - g, M.rotateRight(v), M.rotateUp(w)) : (oi.normalize(z, z), oi.normalize(S, S), R = oi.dot(z, S), C = oi.cross(z, S, at), R < 1 && !oi.equalsEpsilon(C, oi.ZERO, ai.EPSILON14) && (E = Math.acos(R), M.rotate(C, E)));
  }

  var _t = new oi(),
      gt = new e();

  function ut(i, t, e) {
    ni(e.distance) && (e = e.distance);
    var o = i._ellipsoid,
        n = i._scene,
        a = n.camera,
        r = n.canvas,
        s = Ui;
    s.x = r.clientWidth / 2, s.y = r.clientHeight / 2;
    var l,
        m,
        c = a.getPickRay(s, Fi),
        d = o.cartesianToCartographic(a.position, gt).height;
    d < i._minimumPickingTerrainHeight && (l = Ni(i, s, Di)), m = ni(l) ? oi.distance(c.origin, l) : d;

    var _ = oi.normalize(a.position, _t);

    g(i, t, e, i._zoomFactor, m, oi.dot(_, a.direction));
  }

  var ht = new ei(),
      pt = new A(),
      vt = new oi(),
      Pt = new oi(),
      Tt = new U(),
      yt = new U(),
      ft = new U(),
      wt = new D(),
      Rt = new B(),
      Ct = new e(),
      Et = new oi();

  function Mt(i, t, e) {
    var o,
        n,
        a = i._scene.camera;
    U.equals(a.transform, U.IDENTITY) && (ni(e.angleAndHeight) && (e = e.angleAndHeight), ei.equals(t, i._tiltCenterMousePosition) || (i._tiltOnEllipsoid = !1, i._looking = !1), i._looking ? (o = i._ellipsoid.geodeticSurfaceNormal(a.position, Et), At(i, 0, e, o)) : (n = i._ellipsoid.cartesianToCartographic(a.position, Ct), i._tiltOnEllipsoid || n.height > i._minimumCollisionTerrainHeight ? (i._tiltOnEllipsoid = !0, function (i, t, e) {
      var o = i._ellipsoid,
          n = i._scene,
          a = n.camera,
          r = .25 * i.minimumZoomDistance,
          s = o.cartesianToCartographic(a.positionWC, xt).height;
      if (s - r - 1 < ai.EPSILON3 && e.endPosition.y - e.startPosition.y < 0) return;
      var l = n.canvas,
          m = ht;
      m.x = l.clientWidth / 2, m.y = l.clientHeight / 2;

      var c,
          d = a.getPickRay(m, pt),
          _ = Z.rayEllipsoid(d, o);

      if (ni(_)) c = A.getPoint(d, _.start, vt);else {
        if (!(s > i._minimumTrackBallHeight)) {
          i._looking = !0;

          var g = i._ellipsoid.geodeticSurfaceNormal(a.position, Et);

          return At(i, 0, e, g), ei.clone(t, i._tiltCenterMousePosition);
        }

        var u = Z.grazingAltitudeLocation(d, o);
        if (!ni(u)) return;
        var h = o.cartesianToCartographic(u, Ct);
        h.height = 0, c = o.cartographicToCartesian(h, vt);
      }
      var p = L.eastNorthUpToFixedFrame(c, o, Tt),
          v = i._globe,
          P = i._ellipsoid;
      i._globe = void 0, i._ellipsoid = W.UNIT_SPHERE, i._rotateFactor = 1, i._rotateRateRangeAdjustment = 1;
      var T = U.clone(a.transform, ft);
      a._setTransform(p), et(i, 0, e, oi.UNIT_Z), a._setTransform(T), i._globe = v;
      var y = (i._ellipsoid = P).maximumRadius;
      i._rotateFactor = 1 / y, i._rotateRateRangeAdjustment = y;
    }(i, t, e)) : function (i, t, e) {
      var o,
          n,
          a,
          r = i._ellipsoid,
          s = i._scene,
          l = s.camera;
      if (ei.equals(t, i._tiltCenterMousePosition)) o = oi.clone(i._tiltCenter, vt);else {
        if (o = Ni(i, t, vt), !ni(o)) {
          var m;
          if (n = l.getPickRay(t, pt), a = Z.rayEllipsoid(n, r), !ni(a)) return r.cartesianToCartographic(l.position, Ct).height <= i._minimumTrackBallHeight && (i._looking = !0, m = i._ellipsoid.geodeticSurfaceNormal(l.position, Et), At(i, 0, e, m), ei.clone(t, i._tiltCenterMousePosition));
          o = A.getPoint(n, a.start, vt);
        }

        ei.clone(t, i._tiltCenterMousePosition), oi.clone(o, i._tiltCenter);
      }
      var c = s.canvas,
          d = ht;
      d.x = c.clientWidth / 2, d.y = i._tiltCenterMousePosition.y, n = l.getPickRay(d, pt);

      var _ = oi.magnitude(o),
          g = oi.fromElements(_, _, _, Ji),
          u = W.fromCartesian3(g, $i);

      if (a = Z.rayEllipsoid(n, u), !ni(a)) return;
      var h = oi.magnitude(n.origin) > _ ? a.start : a.stop,
          p = A.getPoint(n, h, Pt),
          v = L.eastNorthUpToFixedFrame(o, r, Tt),
          P = L.eastNorthUpToFixedFrame(p, u, yt),
          T = i._globe,
          y = i._ellipsoid;
      i._globe = void 0, i._ellipsoid = W.UNIT_SPHERE, i._rotateFactor = 1, i._rotateRateRangeAdjustment = 1;
      var f = oi.UNIT_Z,
          w = U.clone(l.transform, ft);

      l._setTransform(v);

      var R = oi.cross(p, l.positionWC, Zi),
          C = oi.dot(l.rightWC, R);
      {
        var E;
        et(i, 0, e, f, !1, !0), l._setTransform(P), C < 0 ? (e.startPosition.y > e.endPosition.y && (f = void 0), E = l.constrainedAxis, l.constrainedAxis = void 0, et(i, 0, e, f, !0, !1), l.constrainedAxis = E) : et(i, 0, e, f, !0, !1);
      }
      {
        var M;
        ni(l.constrainedAxis) && (M = oi.cross(l.direction, l.constrainedAxis, Zi), oi.equalsEpsilon(M, oi.ZERO, ai.EPSILON6) || (oi.dot(M, l.right) < 0 && oi.negate(M, M), oi.cross(M, l.direction, l.up), oi.cross(l.direction, l.up, l.right), oi.normalize(l.up, l.up), oi.normalize(l.right, l.right)));
      }
      l._setTransform(w), i._globe = T;
      var x = (i._ellipsoid = y).maximumRadius;
      i._rotateFactor = 1 / x, i._rotateRateRangeAdjustment = x;
      var I = oi.clone(l.positionWC, Zi);
      {
        var z, S, k, b, N;
        l._adjustHeightForTerrain(), oi.equals(l.positionWC, I) || (l._setTransform(P), l.worldToCameraCoordinatesPoint(I, I), z = oi.magnitudeSquared(I), oi.magnitudeSquared(l.position) > z && (oi.normalize(l.position, l.position), oi.multiplyByScalar(l.position, Math.sqrt(z), l.position)), S = oi.angleBetween(I, l.position), k = oi.cross(I, l.position, I), oi.normalize(k, k), b = D.fromAxisAngle(k, S, wt), N = B.fromQuaternion(b, Rt), B.multiplyByVector(N, l.direction, l.direction), B.multiplyByVector(N, l.up, l.up), oi.cross(l.direction, l.up, l.right), oi.cross(l.right, l.direction, l.up), l._setTransform(w));
      }
    }(i, t, e)));
  }

  var xt = new e();
  var It = new ei(),
      zt = new ei(),
      St = new A(),
      kt = new A(),
      bt = new oi(),
      Nt = new oi();

  function At(i, t, e, o) {
    var n = i._scene.camera,
        a = It;
    a.x = e.startPosition.x, a.y = 0;
    var r = zt;
    r.x = e.endPosition.x, r.y = 0;
    var s,
        l,
        m = n.getPickRay(a, St),
        c = n.getPickRay(r, kt),
        d = 0;
    n.frustum instanceof ri ? (s = m.origin, l = c.origin, oi.add(n.direction, s, s), oi.add(n.direction, l, l), oi.subtract(s, n.position, s), oi.subtract(l, n.position, l), oi.normalize(s, s), oi.normalize(l, l)) : (s = m.direction, l = c.direction);

    var _ = oi.dot(s, l);

    _ < 1 && (d = Math.acos(_)), d = e.startPosition.x > e.endPosition.x ? -d : d;
    var g,
        u,
        h,
        p,
        v,
        P,
        T = i._horizontalRotationAxis;
    ni(o) ? n.look(o, -d) : ni(T) ? n.look(T, -d) : n.lookLeft(d), a.x = 0, a.y = e.startPosition.y, r.x = 0, r.y = e.endPosition.y, m = n.getPickRay(a, St), c = n.getPickRay(r, kt), d = 0, n.frustum instanceof ri ? (s = m.origin, l = c.origin, oi.add(n.direction, s, s), oi.add(n.direction, l, l), oi.subtract(s, n.position, s), oi.subtract(l, n.position, l), oi.normalize(s, s), oi.normalize(l, l)) : (s = m.direction, l = c.direction), (_ = oi.dot(s, l)) < 1 && (d = Math.acos(_)), d = e.startPosition.y > e.endPosition.y ? -d : d, o = y(o, T), ni(o) ? (g = n.direction, u = oi.negate(o, bt), h = oi.equalsEpsilon(g, o, ai.EPSILON2), p = oi.equalsEpsilon(g, u, ai.EPSILON2), h || p ? (h && d < 0 || p && 0 < d) && n.look(n.right, -d) : (_ = oi.dot(g, o), v = ai.acosClamped(_), 0 < d && v < d && (d = v - ai.EPSILON4), _ = oi.dot(g, u), v = ai.acosClamped(_), d < 0 && v < -d && (d = -v + ai.EPSILON4), P = oi.cross(o, g, Nt), n.look(P, d))) : n.lookUp(d);
  }

  return c.prototype.update = function () {
    U.equals(this._scene.camera.transform, U.IDENTITY) ? (this._globe = this._scene.globe, this._ellipsoid = ni(this._globe) ? this._globe.ellipsoid : this._scene.mapProjection.ellipsoid) : (this._globe = void 0, this._ellipsoid = W.UNIT_SPHERE), this._minimumCollisionTerrainHeight = this.minimumCollisionTerrainHeight * this._scene.terrainExaggeration, this._minimumPickingTerrainHeight = this.minimumPickingTerrainHeight * this._scene.terrainExaggeration, this._minimumTrackBallHeight = this.minimumTrackBallHeight * this._scene.terrainExaggeration;
    var i = this._ellipsoid.maximumRadius;
    this._rotateFactor = 1 / i, this._rotateRateRangeAdjustment = i;
    var t,
        e,
        o,
        n,
        a,
        r,
        s,
        l = this._scene.mode;
    l === si.SCENE2D ? (s = (r = this)._scene.mapMode2D === m.ROTATE, U.equals(U.IDENTITY, r._scene.camera.transform) ? (d(r, r.enableTranslate, r.translateEventTypes, f, r.inertiaTranslate, "_lastInertiaTranslateMovement"), d(r, r.enableZoom, r.zoomEventTypes, w, r.inertiaZoom, "_lastInertiaZoomMovement"), s && d(r, r.enableRotate, r.tiltEventTypes, E, r.inertiaSpin, "_lastInertiaTiltMovement")) : (d(r, r.enableZoom, r.zoomEventTypes, w, r.inertiaZoom, "_lastInertiaZoomMovement"), s && d(r, r.enableRotate, r.translateEventTypes, E, r.inertiaSpin, "_lastInertiaSpinMovement"))) : l === si.COLUMBUS_VIEW ? (this._horizontalRotationAxis = oi.UNIT_Z, a = (e = this)._scene.camera, U.equals(U.IDENTITY, a.transform) ? (o = e._tweens, e._aggregator.anyButtonDown && o.removeAll(), d(e, e.enableTilt, e.tiltEventTypes, Bi, e.inertiaSpin, "_lastInertiaTiltMovement"), d(e, e.enableTranslate, e.translateEventTypes, j, e.inertiaTranslate, "_lastInertiaTranslateMovement"), d(e, e.enableZoom, e.zoomEventTypes, Li, e.inertiaZoom, "_lastInertiaZoomMovement"), d(e, e.enableLook, e.lookEventTypes, At), e._aggregator.anyButtonDown || ni(e._lastInertiaZoomMovement) && e._lastInertiaZoomMovement.active || ni(e._lastInertiaTranslateMovement) && e._lastInertiaTranslateMovement.active || o.contains(e._tween) || (n = a.createCorrectPositionTween(e.bounceAnimationTime), ni(n) && (e._tween = o.add(n))), o.update()) : (d(e, e.enableRotate, e.rotateEventTypes, et, e.inertiaSpin, "_lastInertiaSpinMovement"), d(e, e.enableZoom, e.zoomEventTypes, ut, e.inertiaZoom, "_lastInertiaZoomMovement"))) : l === si.SCENE3D && (this._horizontalRotationAxis = void 0, d(t = this, t.enableRotate, t.rotateEventTypes, tt, t.inertiaSpin, "_lastInertiaSpinMovement"), d(t, t.enableZoom, t.zoomEventTypes, ut, t.inertiaZoom, "_lastInertiaZoomMovement"), d(t, t.enableTilt, t.tiltEventTypes, Mt, t.inertiaSpin, "_lastInertiaTiltMovement"), d(t, t.enableLook, t.lookEventTypes, At)), this._aggregator.reset();
  }, c.prototype.isDestroyed = function () {
    return !1;
  }, c.prototype.destroy = function () {
    return this._tweens.removeAll(), this._aggregator = this._aggregator && this._aggregator.destroy(), t(this);
  }, c;
});