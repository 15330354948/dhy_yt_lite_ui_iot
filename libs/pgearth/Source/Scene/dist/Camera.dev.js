"use strict";

define(["../Core/BoundingSphere", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Cartographic", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/EasingFunction", "../Core/Ellipsoid", "../Core/EllipsoidGeodesic", "../Core/Event", "../Core/getTimestamp", "../Core/HeadingPitchRange", "../Core/HeadingPitchRoll", "../Core/Intersect", "../Core/IntersectionTests", "../Core/Math", "../Core/Matrix3", "../Core/Matrix4", "../Core/OrthographicFrustum", "../Core/OrthographicOffCenterFrustum", "../Core/PerspectiveFrustum", "../Core/Quaternion", "../Core/Ray", "../Core/Rectangle", "../Core/Transforms", "./CameraFlightPath", "./MapMode2D", "./SceneMode", "../extends/core/ExpendUtil"], function (p, C, L, w, e, v, b, t, d, s, f, z, r, W, m, i, g, h, U, T, y, j, c, a, E, u, _, I, l, P, O, x) {
  "use strict";

  function M(t) {
    if (!b(t)) throw new d("scene is required.");
    this._scene = t, this._transform = y.clone(y.IDENTITY), this._invTransform = y.clone(y.IDENTITY), this._actualTransform = y.clone(y.IDENTITY), this._actualInvTransform = y.clone(y.IDENTITY), this._transformChanged = !1, this.position = new L(), this._position = new L(), this._positionWC = new L(), this._positionCartographic = new e(), this._oldPositionWC = void 0, this.positionWCDeltaMagnitude = 0, this.positionWCDeltaMagnitudeLastFrame = 0, this.timeSinceMoved = 0, this._lastMovedTimestamp = 0, this.direction = new L(), this._direction = new L(), this._directionWC = new L(), this.up = new L(), this._up = new L(), this._upWC = new L(), this.right = new L(), this._right = new L(), this._rightWC = new L(), this.frustum = new a(), this.frustum.aspectRatio = t.drawingBufferWidth / t.drawingBufferHeight, this.frustum.fov = U.toRadians(60), this.workingFrustums = [], this.defaultMoveAmount = 1e5, this.defaultLookAmount = Math.PI / 60, this.defaultRotateAmount = Math.PI / 3600, this.defaultZoomAmount = 1e5, this.constrainedAxis = void 0, this.maximumZoomFactor = 1.5, this._moveStart = new r(), this._moveEnd = new r(), this._changed = new r(), this._changedPosition = void 0, this._changedDirection = void 0, this._changedFrustum = void 0, this.percentageChanged = .5, this._viewMatrix = new y(), this._invViewMatrix = new y(), S(this), this._mode = O.SCENE3D, this._modeChanged = !0;
    var i = t.mapProjection;
    this._projection = i, this._maxCoord = i.project(new e(Math.PI, U.PI_OVER_TWO)), this._max2Dfrustum = void 0, this._suspendTerrainAdjustment = !1, Xt(this, M.DEFAULT_VIEW_RECTANGLE, this.position, !0);
    var o = L.magnitude(this.position);
    o += o * M.DEFAULT_VIEW_FACTOR, L.normalize(this.position, this.position), L.multiplyByScalar(this.position, o, this.position);
  }

  function S(t) {
    y.computeView(t._position, t._direction, t._up, t._right, t._viewMatrix), y.multiply(t._viewMatrix, t._actualInvTransform, t._viewMatrix), y.inverseTransformation(t._viewMatrix, t._invViewMatrix);
  }

  M.TRANSFORM_2D = new y(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1), M.TRANSFORM_2D_INVERSE = y.inverseTransformation(M.TRANSFORM_2D, new y()), M.DEFAULT_VIEW_RECTANGLE = _.fromDegrees(100, -20, 120, 90), M.DEFAULT_VIEW_FACTOR = .5, M.DEFAULT_OFFSET = new m(0, -U.PI_OVER_FOUR, 0), M.prototype.hasCurrentFlight = function () {
    return b(this._currentFlight) && b(this._scene.preloadFlightCamera);
  }, M.prototype._updateCameraChanged = function () {
    var t,
        i,
        o = this;

    if (b((t = o)._oldPositionWC) ? (t.positionWCDeltaMagnitudeLastFrame = t.positionWCDeltaMagnitude, i = L.subtract(t.positionWC, t._oldPositionWC, t._oldPositionWC), t.positionWCDeltaMagnitude = L.magnitude(i), t._oldPositionWC = L.clone(t.positionWC, t._oldPositionWC), 0 < t.positionWCDeltaMagnitude ? (t.timeSinceMoved = 0, t._lastMovedTimestamp = W()) : t.timeSinceMoved = Math.max(W() - t._lastMovedTimestamp, 0) / 1e3) : t._oldPositionWC = L.clone(t.positionWC, t._oldPositionWC), 0 !== o._changed.numberOfListeners) {
      var e = o.percentageChanged;

      if (o._mode !== O.SCENE2D) {
        if (!b(o._changedDirection)) return o._changedPosition = L.clone(o.positionWC, o._changedPosition), void (o._changedDirection = L.clone(o.directionWC, o._changedDirection));
        var r = U.acosClamped(L.dot(o.directionWC, o._changedDirection)),
            n = b(o.frustum.fovy) ? r / (.5 * o.frustum.fovy) : r,
            a = L.distance(o.positionWC, o._changedPosition) / o.positionCartographic.height;
        (e < n || e < a) && (o._changed.raiseEvent(Math.max(n, a)), o._changedPosition = L.clone(o.positionWC, o._changedPosition), o._changedDirection = L.clone(o.directionWC, o._changedDirection));
      } else {
        if (!b(o._changedFrustum)) return o._changedPosition = L.clone(o.position, o._changedPosition), void (o._changedFrustum = o.frustum.clone());

        var s,
            h,
            u = o.position,
            c = o._changedPosition,
            d = o.frustum,
            m = o._changedFrustum,
            l = u.x + d.left,
            p = u.x + d.right,
            f = c.x + m.left,
            g = c.x + m.right,
            _ = u.y + d.bottom,
            C = u.y + d.top,
            v = c.y + m.bottom,
            w = c.y + m.top,
            T = Math.max(l, f),
            y = Math.min(p, g),
            E = Math.max(_, v),
            I = Math.min(C, w);

        e < (h = y <= T || C <= E ? 1 : 1 - (y - T) * (I - E) / (((s = l < f && g < p && _ < v && w < C ? d : m).right - s.left) * (s.top - s.bottom))) && (o._changed.raiseEvent(h), o._changedPosition = L.clone(o.position, o._changedPosition), o._changedFrustum = o.frustum.clone(o._changedFrustum));
      }
    }
  };
  var N = new y(),
      D = new e();

  M.prototype._adjustHeightForTerrain = function () {
    var t = this._scene,
        i = t.screenSpaceCameraController,
        o = i.enableCollisionDetection,
        e = i.minimumCollisionTerrainHeight,
        r = i.minimumZoomDistance;

    if (!this._suspendTerrainAdjustment && o) {
      var n = this._mode,
          a = t.globe;

      if (b(a) && n !== O.SCENE2D && n !== O.MORPHING) {
        var s,
            h,
            u = a.ellipsoid,
            c = t.mapProjection;
        y.equals(this.transform, y.IDENTITY) || (s = y.clone(this.transform, N), h = L.magnitude(this.position), this._setTransform(y.IDENTITY));
        var d = D;
        n === O.SCENE3D ? u.cartesianToCartographic(this.position, d) : c.unproject(this.position, d);
        var m = !1;

        if (d.height < e) {
          var l = a.getHeight(d);

          if (b(l) && (l += r, d.height < l)) {
            if (x.underEarth.enable && d.height > l - x.underEarth.enableDepth) return;
            d.height = l, n === O.SCENE3D ? u.cartographicToCartesian(d, this.position) : c.project(d, this.position), m = !0;
          }
        }

        b(s) && (this._setTransform(s), m && (L.normalize(this.position, this.position), L.negate(this.position, this.direction), L.multiplyByScalar(this.position, Math.max(h, r), this.position), L.normalize(this.direction, this.direction), L.cross(this.direction, this.up, this.right), L.cross(this.right, this.direction, this.up)));
      }
    }
  };

  var R = new e(),
      A = new L(),
      F = new L(),
      V = new w(),
      B = new w(),
      q = new w(),
      H = new w(),
      k = new w();
  var Y = new L();

  function n(t) {
    var i = t._mode,
        o = !1,
        e = 0;
    i === O.SCENE2D && (o = (e = t.frustum.right - t.frustum.left) !== t._positionCartographic.height);
    var r = t._position,
        n = !L.equals(r, t.position) || o;
    n && (r = L.clone(t.position, t._position));
    var a = t._direction,
        s = !L.equals(a, t.direction);
    s && (L.normalize(t.direction, t.direction), a = L.clone(t.direction, t._direction));
    var h = t._up,
        u = !L.equals(h, t.up);
    u && (L.normalize(t.up, t.up), h = L.clone(t.up, t._up));
    var c = t._right,
        d = !L.equals(c, t.right);
    d && (L.normalize(t.right, t.right), c = L.clone(t.right, t._right));
    var m,
        l = t._transformChanged || t._modeChanged;
    t._transformChanged = !1, l && (y.inverseTransformation(t._transform, t._invTransform), t._mode === O.COLUMBUS_VIEW || t._mode === O.SCENE2D ? y.equals(y.IDENTITY, t._transform) ? y.clone(M.TRANSFORM_2D, t._actualTransform) : t._mode === O.COLUMBUS_VIEW ? (m = t, I.basisTo2D(m._projection, m._transform, m._actualTransform)) : function (t) {
      var i = t._projection,
          o = i.ellipsoid,
          e = y.getColumn(t._transform, 3, V),
          r = o.cartesianToCartographic(e, R),
          n = i.project(r, A),
          a = B;
      a.x = n.z, a.y = n.x, a.z = n.y, a.w = 1;
      var s = w.clone(w.UNIT_X, k),
          h = w.add(y.getColumn(t._transform, 0, F), e, F);
      o.cartesianToCartographic(h, r), i.project(r, n);
      var u = q;
      u.x = n.z, u.y = n.x, u.z = n.y, u.w = 0, L.subtract(u, a, u), u.x = 0;
      var c,
          d = H;
      L.magnitudeSquared(u) > U.EPSILON10 ? L.cross(s, u, d) : (c = w.add(y.getColumn(t._transform, 1, F), e, F), o.cartesianToCartographic(c, r), i.project(r, n), d.x = n.z, d.y = n.x, d.z = n.y, d.w = 0, L.subtract(d, a, d), d.x = 0, L.magnitudeSquared(d) < U.EPSILON10 && (w.clone(w.UNIT_Y, u), w.clone(w.UNIT_Z, d))), L.cross(d, s, u), L.normalize(u, u), L.cross(s, u, d), L.normalize(d, d), y.setColumn(t._actualTransform, 0, u, t._actualTransform), y.setColumn(t._actualTransform, 1, d, t._actualTransform), y.setColumn(t._actualTransform, 2, s, t._actualTransform), y.setColumn(t._actualTransform, 3, a, t._actualTransform);
    }(t) : y.clone(t._transform, t._actualTransform), y.inverseTransformation(t._actualTransform, t._actualInvTransform), t._modeChanged = !1);

    var p,
        f,
        g,
        _,
        C,
        v = t._actualTransform;

    (n || l) && (t._positionWC = y.multiplyByPoint(v, r, t._positionWC), i === O.SCENE3D || i === O.MORPHING ? t._positionCartographic = t._projection.ellipsoid.cartesianToCartographic(t._positionWC, t._positionCartographic) : ((p = Y).x = t._positionWC.y, p.y = t._positionWC.z, p.z = t._positionWC.x, i === O.SCENE2D && (p.z = e), t._projection.unproject(p, t._positionCartographic))), (s || u || d) && (f = L.dot(a, L.cross(h, c, Y)), Math.abs(1 - f) > U.EPSILON2 && (g = 1 / L.magnitudeSquared(h), _ = L.dot(h, a) * g, C = L.multiplyByScalar(a, _, Y), h = L.normalize(L.subtract(h, C, t._up), t._up), L.clone(h, t.up), c = L.cross(a, h, t._right), L.clone(c, t.right))), (s || l) && (t._directionWC = y.multiplyByPointAsVector(v, a, t._directionWC), L.normalize(t._directionWC, t._directionWC)), (u || l) && (t._upWC = y.multiplyByPointAsVector(v, h, t._upWC), L.normalize(t._upWC, t._upWC)), (d || l) && (t._rightWC = y.multiplyByPointAsVector(v, c, t._rightWC), L.normalize(t._rightWC, t._rightWC)), (n || s || u || d || l) && S(t);
  }

  function G(t, i) {
    var o = U.equalsEpsilon(Math.abs(t.z), 1, U.EPSILON3) ? Math.atan2(i.y, i.x) - U.PI_OVER_TWO : Math.atan2(t.y, t.x) - U.PI_OVER_TWO;
    return U.TWO_PI - U.zeroToTwoPi(o);
  }

  function Z(t) {
    return U.PI_OVER_TWO - U.acosClamped(t.z);
  }

  function Q(t, i, o) {
    var e = 0;
    return U.equalsEpsilon(Math.abs(t.z), 1, U.EPSILON3) || (e = Math.atan2(-o.z, i.z), e = U.zeroToTwoPi(e + U.TWO_PI)), e;
  }

  var X = new y(),
      J = new y();
  t(M.prototype, {
    transform: {
      get: function get() {
        return this._transform;
      }
    },
    inverseTransform: {
      get: function get() {
        return n(this), this._invTransform;
      }
    },
    viewMatrix: {
      get: function get() {
        return n(this), this._viewMatrix;
      }
    },
    inverseViewMatrix: {
      get: function get() {
        return n(this), this._invViewMatrix;
      }
    },
    positionCartographic: {
      get: function get() {
        return n(this), this._positionCartographic;
      }
    },
    positionWC: {
      get: function get() {
        return n(this), this._positionWC;
      }
    },
    directionWC: {
      get: function get() {
        return n(this), this._directionWC;
      }
    },
    upWC: {
      get: function get() {
        return n(this), this._upWC;
      }
    },
    rightWC: {
      get: function get() {
        return n(this), this._rightWC;
      }
    },
    heading: {
      get: function get() {
        if (this._mode !== O.MORPHING) {
          var t = this._projection.ellipsoid,
              i = y.clone(this._transform, X),
              o = I.eastNorthUpToFixedFrame(this.positionWC, t, J);

          this._setTransform(o);

          var e = G(this.direction, this.up);
          return this._setTransform(i), e;
        }
      }
    },
    pitch: {
      get: function get() {
        if (this._mode !== O.MORPHING) {
          var t = this._projection.ellipsoid,
              i = y.clone(this._transform, X),
              o = I.eastNorthUpToFixedFrame(this.positionWC, t, J);

          this._setTransform(o);

          var e = Z(this.direction);
          return this._setTransform(i), e;
        }
      }
    },
    roll: {
      get: function get() {
        if (this._mode !== O.MORPHING) {
          var t = this._projection.ellipsoid,
              i = y.clone(this._transform, X),
              o = I.eastNorthUpToFixedFrame(this.positionWC, t, J);

          this._setTransform(o);

          var e = Q(this.direction, this.up, this.right);
          return this._setTransform(i), e;
        }
      }
    },
    moveStart: {
      get: function get() {
        return this._moveStart;
      }
    },
    moveEnd: {
      get: function get() {
        return this._moveEnd;
      }
    },
    changed: {
      get: function get() {
        return this._changed;
      }
    }
  }), M.prototype.update = function (t) {
    if (!b(t)) throw new d("mode is required.");
    if (t === O.SCENE2D && !(this.frustum instanceof c)) throw new d("An OrthographicOffCenterFrustum is required in 2D.");
    if (!(t !== O.SCENE3D && t !== O.COLUMBUS_VIEW || this.frustum instanceof a || this.frustum instanceof j)) throw new d("A PerspectiveFrustum or OrthographicFrustum is required in 3D and Columbus view");
    var i = !1;

    if (t !== this._mode && (this._mode = t, this._modeChanged = t !== O.MORPHING, i = this._mode === O.SCENE2D), i) {
      var o = this._max2Dfrustum = this.frustum.clone();
      if (!(o instanceof c)) throw new d("The camera frustum is expected to be orthographic for 2D camera control.");
      var e = o.top / o.right;
      o.right = 2 * this._maxCoord.x, o.left = -o.right, o.top = e * o.right, o.bottom = -o.top;
    }

    this._mode === O.SCENE2D && Ct(this, this.position);
    var r = this._scene.globe,
        n = !b(r) || r._surface.tileProvider.ready && 0 === r._surface._tileLoadQueueHigh.length && 0 === r._surface._tileLoadQueueMedium.length && 0 === r._surface._tileLoadQueueLow.length && 0 === r._surface._debug.tilesWaitingForChildren;
    this._suspendTerrainAdjustment && (this._suspendTerrainAdjustment = !n), n && this._adjustHeightForTerrain();
  };
  var K = new L(),
      $ = new L(),
      tt = new L();

  M.prototype._setTransform = function (t) {
    var i = L.clone(this.positionWC, K),
        o = L.clone(this.upWC, $),
        e = L.clone(this.directionWC, tt);
    y.clone(t, this._transform), this._transformChanged = !0, n(this);
    var r = this._actualInvTransform;
    y.multiplyByPoint(r, i, this.position), y.multiplyByPointAsVector(r, e, this.direction), y.multiplyByPointAsVector(r, o, this.up), L.cross(this.direction, this.up, this.right), n(this);
  };

  var it = new C(),
      ot = new u(),
      et = new L(),
      rt = new L();

  M.prototype._adjustOrthographicFrustum = function (t) {
    var i, o, e, r, n, a, s, h, u;
    this.frustum instanceof j && (!t && this._positionCartographic.height < 15e4 || (y.equals(y.IDENTITY, this.transform) ? (o = (i = this._scene).globe, b(o) && ((r = it).x = i.drawingBufferWidth / 2, r.y = i.drawingBufferHeight / 2, n = this.getPickRay(r, ot), h = o.pickWorldCoordinates(n, i, et), i.pickPositionSupported && (e = i.pickPositionWorldCoordinates(r, rt)), b(h) && b(e) ? (a = b(e) ? L.distance(e, this.positionWC) : Number.POSITIVE_INFINITY, s = b(h) ? L.distance(h, this.positionWC) : Number.POSITIVE_INFINITY, this.frustum.width = Math.min(a, s)) : b(e) ? this.frustum.width = L.distance(e, this.positionWC) : b(h) && (this.frustum.width = L.distance(h, this.positionWC))), b(o) && (b(h) || b(e)) || (u = Math.max(this.positionCartographic.height, 0), this.frustum.width = u)) : this.frustum.width = L.magnitude(this.position)));
  };

  var nt = new L(),
      at = new y(),
      st = new y(),
      ht = new E(),
      ut = new T(),
      ct = new e();
  var dt = new L(),
      mt = new L(),
      lt = new L();

  function pt(t, i, o, e) {
    var r,
        n,
        a,
        s = L.clone(o.direction, dt),
        h = L.clone(o.up, mt);
    t._scene.mode === O.SCENE3D && (r = t._projection.ellipsoid, n = I.eastNorthUpToFixedFrame(i, r, X), a = y.inverseTransformation(n, J), y.multiplyByPointAsVector(a, s, s), y.multiplyByPointAsVector(a, h, h));
    var u = L.cross(s, h, lt);
    return e.heading = G(s, h), e.pitch = Z(s), e.roll = Q(s, h, u), e;
  }

  var ft = {
    destination: void 0,
    orientation: {
      direction: void 0,
      up: void 0,
      heading: void 0,
      pitch: void 0,
      roll: void 0
    },
    convert: void 0,
    endTransform: void 0
  },
      gt = new i();

  M.prototype.setView = function (t) {
    t = v(t, v.EMPTY_OBJECT);
    var i,
        o,
        e,
        r,
        n,
        a,
        s,
        h,
        u,
        c,
        d,
        m,
        l,
        p,
        f,
        g = v(t.orientation, v.EMPTY_OBJECT),
        _ = this._mode;
    _ !== O.MORPHING && (b(t.endTransform) && this._setTransform(t.endTransform), i = v(t.convert, !0), o = v(t.destination, L.clone(this.positionWC, nt)), b(o) && b(o.west) && (o = this.getRectangleCameraCoordinates(o, nt), i = !1), b(g.direction) && (g = pt(this, o, g, ft.orientation)), gt.heading = v(g.heading, 0), gt.pitch = v(g.pitch, -U.PI_OVER_TWO), gt.roll = v(g.roll, 0), this._suspendTerrainAdjustment = !0, _ === O.SCENE3D ? function (t, i, o) {
      var e = y.clone(t.transform, at),
          r = I.eastNorthUpToFixedFrame(i, t._projection.ellipsoid, st);
      t._setTransform(r), L.clone(L.ZERO, t.position), o.heading = o.heading - U.PI_OVER_TWO;
      var n = E.fromHeadingPitchRoll(o, ht),
          a = T.fromQuaternion(n, ut);
      T.getColumn(a, 0, t.direction), T.getColumn(a, 2, t.up), L.cross(t.direction, t.up, t.right), t._setTransform(e), t._adjustOrthographicFrustum(!0);
    }(this, o, gt) : _ === O.SCENE2D ? (e = this, r = o, n = gt, a = i, f = y.clone(e.transform, at), e._setTransform(y.IDENTITY), L.equals(r, e.positionWC) || (a && (h = (s = e._projection).ellipsoid.cartesianToCartographic(r, ct), r = s.project(h, nt)), C.clone(r, e.position), c = -(u = .5 * -r.z), d = e.frustum, u < c && (m = d.top / d.right, d.right = c, d.left = u, d.top = d.right * m, d.bottom = -d.top)), e._scene.mapMode2D === P.ROTATE && (n.heading = n.heading - U.PI_OVER_TWO, n.pitch = -U.PI_OVER_TWO, n.roll = 0, l = E.fromHeadingPitchRoll(n, ht), p = T.fromQuaternion(l, ut), T.getColumn(p, 2, e.up), L.cross(e.direction, e.up, e.right)), e._setTransform(f)) : function (t, i, o, e) {
      var r,
          n,
          a = y.clone(t.transform, at);
      t._setTransform(y.IDENTITY), L.equals(i, t.positionWC) || (e && (n = (r = t._projection).ellipsoid.cartesianToCartographic(i, ct), i = r.project(n, nt)), L.clone(i, t.position)), o.heading = o.heading - U.PI_OVER_TWO;
      var s = E.fromHeadingPitchRoll(o, ht),
          h = T.fromQuaternion(s, ut);
      T.getColumn(h, 0, t.direction), T.getColumn(h, 2, t.up), L.cross(t.direction, t.up, t.right), t._setTransform(a), t._adjustOrthographicFrustum(!0);
    }(this, o, gt, i));
  };

  var _t = new L();

  function Ct(t, i) {
    var o,
        e = t._scene.mapMode2D === P.ROTATE,
        r = t._maxCoord.x,
        n = t._maxCoord.y,
        a = e ? -(o = r) : (o = i.x - 2 * r, i.x + 2 * r);
    i.x > r && (i.x = o), i.x < -r && (i.x = a), i.y > n && (i.y = n), i.y < -n && (i.y = -n);
  }

  M.prototype.flyHome = function (t) {
    var i,
        o,
        e,
        r,
        n = this._mode;
    n === O.MORPHING && this._scene.completeMorph(), n === O.SCENE2D ? this.flyTo({
      destination: M.DEFAULT_VIEW_RECTANGLE,
      duration: t,
      endTransform: y.IDENTITY
    }) : n === O.SCENE3D ? (i = this.getRectangleCameraCoordinates(M.DEFAULT_VIEW_RECTANGLE), o = L.magnitude(i), o += o * M.DEFAULT_VIEW_FACTOR, L.normalize(i, i), L.multiplyByScalar(i, o, i), this.flyTo({
      destination: i,
      duration: t,
      endTransform: y.IDENTITY
    })) : n === O.COLUMBUS_VIEW && (e = this._projection.ellipsoid.maximumRadius, r = new L(0, -1, 1), r = L.multiplyByScalar(L.normalize(r, r), 5 * e, r), this.flyTo({
      destination: r,
      duration: t,
      orientation: {
        heading: 0,
        pitch: -Math.acos(L.normalize(r, _t).z),
        roll: 0
      },
      endTransform: y.IDENTITY,
      convert: !1
    }));
  }, M.prototype.worldToCameraCoordinates = function (t, i) {
    if (!b(t)) throw new d("cartesian is required.");
    return b(i) || (i = new w()), n(this), y.multiplyByVector(this._actualInvTransform, t, i);
  }, M.prototype.worldToCameraCoordinatesPoint = function (t, i) {
    if (!b(t)) throw new d("cartesian is required.");
    return b(i) || (i = new L()), n(this), y.multiplyByPoint(this._actualInvTransform, t, i);
  }, M.prototype.worldToCameraCoordinatesVector = function (t, i) {
    if (!b(t)) throw new d("cartesian is required.");
    return b(i) || (i = new L()), n(this), y.multiplyByPointAsVector(this._actualInvTransform, t, i);
  }, M.prototype.cameraToWorldCoordinates = function (t, i) {
    if (!b(t)) throw new d("cartesian is required.");
    return b(i) || (i = new w()), n(this), y.multiplyByVector(this._actualTransform, t, i);
  }, M.prototype.cameraToWorldCoordinatesPoint = function (t, i) {
    if (!b(t)) throw new d("cartesian is required.");
    return b(i) || (i = new L()), n(this), y.multiplyByPoint(this._actualTransform, t, i);
  }, M.prototype.cameraToWorldCoordinatesVector = function (t, i) {
    if (!b(t)) throw new d("cartesian is required.");
    return b(i) || (i = new L()), n(this), y.multiplyByPointAsVector(this._actualTransform, t, i);
  };
  var vt = new L();
  M.prototype.move = function (t, i) {
    if (!b(t)) throw new d("direction is required.");
    var o = this.position;
    L.multiplyByScalar(t, i, vt), L.add(o, vt, o), this._mode === O.SCENE2D && Ct(this, o), this._adjustOrthographicFrustum(!0);
  }, M.prototype.moveForward = function (t) {
    t = v(t, this.defaultMoveAmount), this._mode === O.SCENE2D ? Mt(this, t) : this.move(this.direction, t);
  }, M.prototype.moveBackward = function (t) {
    t = v(t, this.defaultMoveAmount), this._mode === O.SCENE2D ? Mt(this, -t) : this.move(this.direction, -t);
  }, M.prototype.moveUp = function (t) {
    t = v(t, this.defaultMoveAmount), this.move(this.up, t);
  }, M.prototype.moveDown = function (t) {
    t = v(t, this.defaultMoveAmount), this.move(this.up, -t);
  }, M.prototype.moveRight = function (t) {
    t = v(t, this.defaultMoveAmount), this.move(this.right, t);
  }, M.prototype.moveLeft = function (t) {
    t = v(t, this.defaultMoveAmount), this.move(this.right, -t);
  }, M.prototype.lookLeft = function (t) {
    t = v(t, this.defaultLookAmount), this._mode !== O.SCENE2D && this.look(this.up, -t);
  }, M.prototype.lookRight = function (t) {
    t = v(t, this.defaultLookAmount), this._mode !== O.SCENE2D && this.look(this.up, t);
  }, M.prototype.lookUp = function (t) {
    t = v(t, this.defaultLookAmount), this._mode !== O.SCENE2D && this.look(this.right, -t);
  }, M.prototype.lookDown = function (t) {
    t = v(t, this.defaultLookAmount), this._mode !== O.SCENE2D && this.look(this.right, t);
  };
  var wt = new E(),
      Tt = new T();
  M.prototype.look = function (t, i) {
    if (!b(t)) throw new d("axis is required.");
    var o = v(i, this.defaultLookAmount),
        e = E.fromAxisAngle(t, -o, wt),
        r = T.fromQuaternion(e, Tt),
        n = this.direction,
        a = this.up,
        s = this.right;
    T.multiplyByVector(r, n, n), T.multiplyByVector(r, a, a), T.multiplyByVector(r, s, s);
  }, M.prototype.twistLeft = function (t) {
    t = v(t, this.defaultLookAmount), this.look(this.direction, t);
  }, M.prototype.twistRight = function (t) {
    t = v(t, this.defaultLookAmount), this.look(this.direction, -t);
  };
  var yt = new E(),
      Et = new T();
  M.prototype.rotate = function (t, i) {
    if (!b(t)) throw new d("axis is required.");
    var o = v(i, this.defaultRotateAmount),
        e = E.fromAxisAngle(t, -o, yt),
        r = T.fromQuaternion(e, Et);
    T.multiplyByVector(r, this.position, this.position), T.multiplyByVector(r, this.direction, this.direction), T.multiplyByVector(r, this.up, this.up), L.cross(this.direction, this.up, this.right), L.cross(this.right, this.direction, this.up), this._adjustOrthographicFrustum(!1);
  }, M.prototype.rotateDown = function (t) {
    o(this, t = v(t, this.defaultRotateAmount));
  }, M.prototype.rotateUp = function (t) {
    o(this, -(t = v(t, this.defaultRotateAmount)));
  };
  var It = new L(),
      Wt = new L(),
      Pt = new L(),
      Ot = new L();

  function o(t, i) {
    var o,
        e,
        r,
        n,
        a,
        s,
        h,
        u = t.position;
    b(t.constrainedAxis) && !L.equalsEpsilon(t.position, L.ZERO, U.EPSILON2) ? (o = L.normalize(u, It), e = L.equalsEpsilon(o, t.constrainedAxis, U.EPSILON2), r = L.equalsEpsilon(o, L.negate(t.constrainedAxis, Ot), U.EPSILON2), e || r ? (e && i < 0 || r && 0 < i) && t.rotate(t.right, i) : (n = L.normalize(t.constrainedAxis, Wt), a = L.dot(o, n), s = U.acosClamped(a), 0 < i && s < i && (i = s - U.EPSILON4), a = L.dot(o, L.negate(n, Ot)), s = U.acosClamped(a), i < 0 && s < -i && (i = -s + U.EPSILON4), h = L.cross(n, o, Pt), t.rotate(h, i))) : t.rotate(t.right, i);
  }

  function xt(t, i) {
    b(t.constrainedAxis) ? t.rotate(t.constrainedAxis, i) : t.rotate(t.up, i);
  }

  function Mt(t, i) {
    var o,
        e,
        r,
        n,
        a,
        s,
        h,
        u = t.frustum;
    if (!(u instanceof c && b(u.left) && b(u.right) && b(u.bottom) && b(u.top))) throw new d("The camera frustum is expected to be orthographic for 2D camera control.");
    i *= .5, Math.abs(u.top) + Math.abs(u.bottom) > Math.abs(u.left) + Math.abs(u.right) ? (e = u.top - i, r = u.bottom + i, n = t._maxCoord.y, t._scene.mapMode2D === P.ROTATE && (n *= t.maximumZoomFactor), n < r && (e = -(r = n)), e <= r && (r = -(e = 1)), o = u.right / u.top, u.top = e, u.bottom = r, u.right = u.top * o, u.left = -u.right) : (a = u.right - i, s = u.left + i, h = t._maxCoord.x, t._scene.mapMode2D === P.ROTATE && (h *= t.maximumZoomFactor), h < a && (s = -(a = h)), a <= s && (s = -(a = 1)), o = u.top / u.right, u.right = a, u.left = s, u.top = u.right * o, u.bottom = -u.top);
  }

  function St(t, i) {
    t.move(t.direction, i);
  }

  M.prototype.rotateRight = function (t) {
    xt(this, -(t = v(t, this.defaultRotateAmount)));
  }, M.prototype.rotateLeft = function (t) {
    xt(this, t = v(t, this.defaultRotateAmount));
  }, M.prototype.zoomIn = function (t) {
    t = v(t, this.defaultZoomAmount), (this._mode === O.SCENE2D ? Mt : St)(this, t);
  }, M.prototype.zoomOut = function (t) {
    t = v(t, this.defaultZoomAmount), (this._mode === O.SCENE2D ? Mt : St)(this, -t);
  }, M.prototype.getMagnitude = function () {
    return this._mode === O.SCENE3D ? L.magnitude(this.position) : this._mode === O.COLUMBUS_VIEW ? Math.abs(this.position.z) : this._mode === O.SCENE2D ? Math.max(this.frustum.right - this.frustum.left, this.frustum.top - this.frustum.bottom) : void 0;
  };
  var Nt = new y();

  M.prototype.lookAt = function (t, i) {
    if (!b(t)) throw new d("target is required");
    if (!b(i)) throw new d("offset is required");
    if (this._mode === O.MORPHING) throw new d("lookAt is not supported while morphing.");
    var o = I.eastNorthUpToFixedFrame(t, f.WGS84, Nt);
    this.lookAtTransform(o, i);
  };

  var Dt = new L(),
      Rt = new E(),
      At = new E(),
      Ft = new T();

  function Vt(t, i, o) {
    i = U.clamp(i, -U.PI_OVER_TWO, U.PI_OVER_TWO), t = U.zeroToTwoPi(t) - U.PI_OVER_TWO;
    var e = E.fromAxisAngle(L.UNIT_Y, -i, Rt),
        r = E.fromAxisAngle(L.UNIT_Z, -t, At),
        n = E.multiply(r, e, r),
        a = T.fromQuaternion(n, Ft),
        s = L.clone(L.UNIT_X, Dt);
    return T.multiplyByVector(a, s, s), L.negate(s, s), L.multiplyByScalar(s, o, s), s;
  }

  M.prototype.lookAtTransform = function (t, i) {
    if (!b(t)) throw new d("transform is required");
    if (this._mode === O.MORPHING) throw new d("lookAtTransform is not supported while morphing.");

    if (this._setTransform(t), b(i)) {
      var o = b(i.heading) ? Vt(i.heading, i.pitch, i.range) : i;

      if (this._mode === O.SCENE2D) {
        C.clone(C.ZERO, this.position), L.negate(o, this.up), this.up.z = 0, L.magnitudeSquared(this.up) < U.EPSILON10 && L.clone(L.UNIT_Y, this.up), L.normalize(this.up, this.up), this._setTransform(y.IDENTITY), L.negate(L.UNIT_Z, this.direction), L.cross(this.direction, this.up, this.right), L.normalize(this.right, this.right);
        var e = this.frustum,
            r = e.top / e.right;
        return e.right = .5 * L.magnitude(o), e.left = -e.right, e.top = r * e.right, e.bottom = -e.top, void this._setTransform(t);
      }

      L.clone(o, this.position), L.negate(this.position, this.direction), L.normalize(this.direction, this.direction), L.cross(this.direction, L.UNIT_Z, this.right), L.magnitudeSquared(this.right) < U.EPSILON10 && L.clone(L.UNIT_X, this.right), L.normalize(this.right, this.right), L.cross(this.right, this.direction, this.up), L.normalize(this.up, this.up), this._adjustOrthographicFrustum(!0);
    }
  };

  var Bt,
      Lt = new e(),
      bt = new e(),
      zt = new L(),
      Ut = new L(),
      jt = new L(),
      qt = new L(),
      Ht = new L(),
      kt = new L(),
      Yt = new L(),
      Gt = new L(),
      Zt = {
    direction: new L(),
    right: new L(),
    up: new L()
  };

  function Qt(t, i, o, e) {
    return Math.abs(L.dot(i, o)) / e - L.dot(t, o);
  }

  function Xt(t, i, o, e) {
    var r = t._projection.ellipsoid,
        n = e ? t : Zt,
        a = i.north,
        s = i.south,
        h = i.east,
        u = i.west;
    h < u && (h += U.TWO_PI);
    var c,
        d,
        m,
        l = .5 * (u + h),
        p = s < -U.PI_OVER_TWO + U.RADIANS_PER_DEGREE && a > U.PI_OVER_TWO - U.RADIANS_PER_DEGREE ? 0 : ((c = Lt).longitude = l, c.latitude = a, c.height = 0, (d = bt).longitude = l, d.latitude = s, d.height = 0, b(m = Bt) && m.ellipsoid === r || (Bt = m = new z(void 0, void 0, r)), m.setEndPoints(c, d), m.interpolateUsingFraction(.5, Lt).latitude),
        f = Lt;
    f.longitude = l, f.latitude = p, f.height = 0;
    var g = r.cartographicToCartesian(f, Yt),
        _ = Lt;
    _.longitude = h, _.latitude = a;
    var C = r.cartographicToCartesian(_, zt);
    _.longitude = u;
    var v = r.cartographicToCartesian(_, jt);
    _.longitude = l;
    var w = r.cartographicToCartesian(_, Ht);
    _.latitude = s;
    var T = r.cartographicToCartesian(_, kt);
    _.longitude = h;
    var y = r.cartographicToCartesian(_, qt);
    _.longitude = u;
    var E = r.cartographicToCartesian(_, Ut);
    L.subtract(v, g, v), L.subtract(y, g, y), L.subtract(C, g, C), L.subtract(E, g, E), L.subtract(w, g, w), L.subtract(T, g, T);
    var I = r.geodeticSurfaceNormal(g, n.direction);
    L.negate(I, I);
    var W = L.cross(I, L.UNIT_Z, n.right);
    L.normalize(W, W);
    var P,
        O,
        x,
        M,
        S,
        N,
        D,
        R,
        A,
        F,
        V,
        B = L.cross(W, I, n.up);
    return t.frustum instanceof j ? (P = Math.max(L.distance(C, v), L.distance(y, E)), (N = (O = Math.max(L.distance(C, y), L.distance(v, E))) * (S = t.frustum._offCenterFrustum.right / t.frustum._offCenterFrustum.top)) < P ? M = (x = P) / S : (M = O, x = N), V = Math.max(x, M)) : (D = Math.tan(.5 * t.frustum.fovy), R = t.frustum.aspectRatio * D, V = Math.max(Qt(I, B, v, D), Qt(I, B, y, D), Qt(I, B, C, D), Qt(I, B, E, D), Qt(I, B, w, D), Qt(I, B, T, D), Qt(I, W, v, R), Qt(I, W, y, R), Qt(I, W, C, R), Qt(I, W, E, R), Qt(I, W, w, R), Qt(I, W, T, R)), s < 0 && 0 < a && ((A = Lt).longitude = u, A.latitude = 0, A.height = 0, F = r.cartographicToCartesian(A, Gt), L.subtract(F, g, F), V = Math.max(V, Qt(I, B, F, D), Qt(I, W, F, R)), A.longitude = h, F = r.cartographicToCartesian(A, Gt), L.subtract(F, g, F), V = Math.max(V, Qt(I, B, F, D), Qt(I, W, F, R)))), L.add(g, L.multiplyByScalar(I, -V, Gt), o);
  }

  var Jt = new e(),
      Kt = new L(),
      $t = new L();
  var ti = new e(),
      ii = new L(),
      oi = new L();

  M.prototype.getRectangleCameraCoordinates = function (t, i) {
    if (!b(t)) throw new d("rectangle is required");
    var o = this._mode;
    return b(i) || (i = new L()), o === O.SCENE3D ? Xt(this, t, i) : o === O.COLUMBUS_VIEW ? function (t, i, o) {
      var e = t._projection;
      i.west > i.east && (i = _.MAX_VALUE);
      var r = t._actualTransform,
          n = t._actualInvTransform,
          a = Jt;
      a.longitude = i.east, a.latitude = i.north;
      var s = e.project(a, Kt);
      y.multiplyByPoint(r, s, s), y.multiplyByPoint(n, s, s), a.longitude = i.west, a.latitude = i.south;
      var h,
          u,
          c,
          d,
          m = e.project(a, $t);
      return y.multiplyByPoint(r, m, m), y.multiplyByPoint(n, m, m), o.x = .5 * (s.x - m.x) + m.x, o.y = .5 * (s.y - m.y) + m.y, b(t.frustum.fovy) ? (h = Math.tan(.5 * t.frustum.fovy), u = t.frustum.aspectRatio * h, o.z = .5 * Math.max((s.x - m.x) / u, (s.y - m.y) / h)) : (c = s.x - m.x, d = s.y - m.y, o.z = Math.max(c, d)), o;
    }(this, t, i) : o === O.SCENE2D ? function (t, i, o) {
      var e = t._projection;
      i.west > i.east && (i = _.MAX_VALUE);
      var r = ti;
      r.longitude = i.east, r.latitude = i.north;
      var n = e.project(r, ii);
      r.longitude = i.west, r.latitude = i.south;
      var a,
          s,
          h = e.project(r, oi),
          u = .5 * Math.abs(n.x - h.x),
          c = .5 * Math.abs(n.y - h.y),
          d = t.frustum.right / t.frustum.top,
          m = c * d;
      return m < u ? s = (a = u) / d : (s = c, a = m), c = Math.max(2 * a, 2 * s), o.x = .5 * (n.x - h.x) + h.x, o.y = .5 * (n.y - h.y) + h.y, (r = e.unproject(o, r)).height = c, o = e.project(r, o);
    }(this, t, i) : void 0;
  };

  var ei = new u();
  var ri = new u();
  var ni = new u();

  M.prototype.pickEllipsoid = function (t, i, o) {
    if (!b(t)) throw new d("windowPosition is required.");
    var e = this._scene.canvas;

    if (0 !== e.clientWidth && 0 !== e.clientHeight) {
      if (b(o) || (o = new L()), i = v(i, f.WGS84), this._mode === O.SCENE3D) o = function (t, i, o, e) {
        o = v(o, f.WGS84);
        var r = t.getPickRay(i, ei),
            n = h.rayEllipsoid(r, o);

        if (n) {
          var a = 0 < n.start ? n.start : n.stop;
          return u.getPoint(r, a, e);
        }
      }(this, t, i, o);else if (this._mode === O.SCENE2D) o = function (t, i, o, e) {
        var r = t.getPickRay(i, ri).origin,
            r = L.fromElements(r.y, r.z, 0, r),
            n = o.unproject(r);
        if (!(n.latitude < -U.PI_OVER_TWO || n.latitude > U.PI_OVER_TWO)) return o.ellipsoid.cartographicToCartesian(n, e);
      }(this, t, this._projection, o);else {
        if (this._mode !== O.COLUMBUS_VIEW) return;

        o = function (t, i, o, e) {
          var r = t.getPickRay(i, ni),
              n = -r.origin.x / r.direction.x;
          u.getPoint(r, n, e);
          var a = o.unproject(new L(e.y, e.z, 0));
          if (!(a.latitude < -U.PI_OVER_TWO || a.latitude > U.PI_OVER_TWO || a.longitude < -Math.PI || a.longitude > Math.PI)) return o.ellipsoid.cartographicToCartesian(a, e);
        }(this, t, this._projection, o);
      }
      return o;
    }
  };

  var ai = new L(),
      si = new L(),
      hi = new L();
  var ui = new L();

  M.prototype.getPickRay = function (t, i) {
    if (!b(t)) throw new d("windowPosition is required.");
    b(i) || (i = new u());
    var o = this.frustum;
    return (b(o.aspectRatio) && b(o.fov) && b(o.near) ? function (t, i, o) {
      var e = t._scene.canvas,
          r = e.clientWidth,
          n = e.clientHeight,
          a = Math.tan(.5 * t.frustum.fovy),
          s = t.frustum.aspectRatio * a,
          h = t.frustum.near,
          u = 2 / r * i.x - 1,
          c = 2 / n * (n - i.y) - 1,
          d = t.positionWC;
      L.clone(d, o.origin);
      var m = L.multiplyByScalar(t.directionWC, h, ai);
      L.add(d, m, m);
      var l = L.multiplyByScalar(t.rightWC, u * h * s, si),
          p = L.multiplyByScalar(t.upWC, c * h * a, hi),
          f = L.add(m, l, o.direction);
      return L.add(f, p, f), L.subtract(f, d, f), L.normalize(f, f), o;
    } : function (t, i, o) {
      var e = t._scene.canvas,
          r = e.clientWidth,
          n = e.clientHeight,
          a = t.frustum;
      b(a._offCenterFrustum) && (a = a._offCenterFrustum);
      var s = 2 / r * i.x - 1;
      s *= .5 * (a.right - a.left);
      var h = 2 / n * (n - i.y) - 1;
      h *= .5 * (a.top - a.bottom);
      var u = o.origin;
      return L.clone(t.position, u), L.multiplyByScalar(t.right, s, ui), L.add(ui, u, u), L.multiplyByScalar(t.up, h, ui), L.add(ui, u, u), L.clone(t.directionWC, o.direction), t._mode !== O.COLUMBUS_VIEW && t._mode !== O.SCENE2D || L.fromElements(o.origin.z, o.origin.x, o.origin.y, o.origin), o;
    })(this, t, i);
  };

  var ci = new L(),
      di = new L();

  M.prototype.distanceToBoundingSphere = function (t) {
    if (!b(t)) throw new d("boundingSphere is required.");
    var i = L.subtract(this.positionWC, t.center, ci),
        o = L.multiplyByScalar(this.directionWC, L.dot(i, this.directionWC), di);
    return Math.max(0, L.magnitude(o) - t.radius);
  };

  var mi = new C();

  function li(o, e, t, i, r, n) {
    var a = L.clone(e);
    return t.y > i ? a.y -= t.y - i : t.y < -i && (a.y += -i - t.y), t.z > r ? a.z -= t.z - r : t.z < -r && (a.z += -r - t.z), {
      easingFunction: s.EXPONENTIAL_OUT,
      startObject: {
        time: 0
      },
      stopObject: {
        time: 1
      },
      duration: n,
      update: function update(t) {
        var i = L.lerp(e, a, t.time, new L());
        o.worldToCameraCoordinatesPoint(i, o.position);
      }
    };
  }

  M.prototype.getPixelSize = function (t, i, o) {
    if (!b(t)) throw new d("boundingSphere is required.");
    if (!b(i)) throw new d("drawingBufferWidth is required.");
    if (!b(o)) throw new d("drawingBufferHeight is required.");
    var e = this.distanceToBoundingSphere(t),
        r = this.frustum.getPixelDimensions(i, o, e, mi);
    return Math.max(r.x, r.y);
  };

  var pi = new L(),
      fi = new L(),
      gi = new L(),
      _i = new L();

  M.prototype.createCorrectPositionTween = function (t) {
    if (!b(t)) throw new d("duration is required.");
    if (this._mode === O.COLUMBUS_VIEW) return function (t, i) {
      var o = t.position,
          e = t.direction,
          r = t.worldToCameraCoordinatesVector(L.UNIT_X, pi),
          n = -L.dot(r, o) / L.dot(r, e),
          a = L.add(o, L.multiplyByScalar(e, n, fi), fi);
      t.cameraToWorldCoordinatesPoint(a, a), o = t.cameraToWorldCoordinatesPoint(t.position, gi);
      var s = Math.tan(.5 * t.frustum.fovy),
          h = t.frustum.aspectRatio * s,
          u = L.magnitude(L.subtract(o, a, _i)),
          c = h * u,
          d = s * u,
          m = t._maxCoord.x,
          l = t._maxCoord.y,
          p = Math.max(c - m, m),
          f = Math.max(d - l, l);

      if (o.z < -p || o.z > p || o.y < -f || o.y > f) {
        var g = a.y < -p || a.y > p,
            _ = a.z < -f || a.z > f;

        if (g || _) return li(t, o, a, p, f, i);
      }
    }(this, t);
  };

  var Ci = new L(),
      vi = {
    destination: void 0,
    heading: void 0,
    pitch: void 0,
    roll: void 0,
    duration: void 0,
    complete: void 0,
    cancel: void 0,
    endTransform: void 0,
    maximumHeight: void 0,
    easingFunction: void 0
  };
  M.prototype.cancelFlight = function () {
    b(this._currentFlight) && (this._currentFlight.cancelTween(), this._currentFlight = void 0);
  }, M.prototype.flyTo = function (t) {
    var i = (t = v(t, v.EMPTY_OBJECT)).destination;
    if (!b(i)) throw new d("destination is required.");

    if (this._mode !== O.MORPHING) {
      this.cancelFlight();
      var o = v(t.orientation, v.EMPTY_OBJECT);

      if (b(o.direction) && (o = pt(this, i, o, ft.orientation)), b(t.duration) && t.duration <= 0) {
        var e = ft;
        return e.destination = t.destination, e.orientation.heading = o.heading, e.orientation.pitch = o.pitch, e.orientation.roll = o.roll, e.convert = t.convert, e.endTransform = t.endTransform, this.setView(e), void ("function" == typeof t.complete && t.complete());
      }

      var r = b(i.west);
      r && (i = this.getRectangleCameraCoordinates(i, Ci));
      var n = this;
      vi.destination = i, vi.heading = o.heading, vi.pitch = o.pitch, vi.roll = o.roll, vi.duration = t.duration, vi.complete = function () {
        s === n._currentFlight && (n._currentFlight = void 0), b(t.complete) && t.complete();
      }, vi.cancel = t.cancel, vi.endTransform = t.endTransform, vi.convert = !r && t.convert, vi.maximumHeight = t.maximumHeight, vi.pitchAdjustHeight = t.pitchAdjustHeight, vi.flyOverLongitude = t.flyOverLongitude, vi.flyOverLongitudeWeight = t.flyOverLongitudeWeight, vi.easingFunction = t.easingFunction;
      var a = this._scene,
          s = a.tweens.add(l.createTween(a, vi));
      this._currentFlight = s;
      var h = this._scene.preloadFlightCamera;
      this._mode !== O.SCENE2D ? (b(h) || (h = M.clone(this)), h.setView({
        destination: i,
        orientation: o
      }), this._scene.preloadFlightCullingVolume = h.frustum.computeCullingVolume(h.positionWC, h.directionWC, h.upWC)) : h = void 0;
    }
  };

  function wi(t, i, o) {
    b(o) || (o = m.clone(M.DEFAULT_OFFSET));
    var e,
        r,
        n,
        a,
        s,
        h = t._scene.screenSpaceCameraController.minimumZoomDistance,
        u = t._scene.screenSpaceCameraController.maximumZoomDistance,
        c = o.range;
    return b(c) && 0 !== c || (0 === (e = i.radius) ? o.range = 100 : t.frustum instanceof j || t._mode === O.SCENE2D ? o.range = function (t, i) {
      var o,
          e,
          r = t.frustum;
      b(r._offCenterFrustum) && (r = r._offCenterFrustum);
      var n = r.right / r.top,
          a = i * n;
      return a < i ? e = (o = i) / n : (e = i, o = a), 1.5 * Math.max(o, e);
    }(t, e) : o.range = (r = e, n = t.frustum, a = Math.tan(.5 * n.fovy), s = n.aspectRatio * a, Math.max(r / s, r / a)), o.range = U.clamp(o.range, h, u)), o;
  }

  M.prototype.viewBoundingSphere = function (t, i) {
    if (!b(t)) throw new d("boundingSphere is required.");
    if (this._mode === O.MORPHING) throw new d("viewBoundingSphere is not supported while morphing.");
    i = wi(this, t, i), this.lookAt(t.center, i);
  };

  var Ti = new y(),
      yi = new L(),
      Ei = new L(),
      Ii = new L(),
      Wi = new L(),
      Pi = new w(),
      Oi = new E(),
      xi = new T();

  M.prototype.flyToBoundingSphere = function (t, i) {
    if (!b(t)) throw new d("boundingSphere is required.");
    i = v(i, v.EMPTY_OBJECT);
    var o = this._mode === O.SCENE2D || this._mode === O.COLUMBUS_VIEW;

    this._setTransform(y.IDENTITY);

    var e,
        r,
        n,
        a,
        s,
        h = wi(this, t, i.offset),
        u = o ? L.multiplyByScalar(L.UNIT_Z, h.range, yi) : Vt(h.heading, h.pitch, h.range),
        c = I.eastNorthUpToFixedFrame(t.center, f.WGS84, Ti);
    y.multiplyByPoint(c, u, u), o || (a = L.subtract(t.center, u, Ei), L.normalize(a, a), e = y.multiplyByPointAsVector(c, L.UNIT_Z, Ii), 1 - Math.abs(L.dot(a, e)) < U.EPSILON6 && (r = E.fromAxisAngle(a, h.heading, Oi), n = T.fromQuaternion(r, xi), L.fromCartesian4(y.getColumn(c, 1, Pi), e), T.multiplyByVector(n, e, e)), s = L.cross(a, e, Wi), L.cross(s, a, e), L.normalize(e, e)), this.flyTo({
      destination: u,
      orientation: {
        direction: a,
        up: e
      },
      duration: i.duration,
      complete: i.complete,
      cancel: i.cancel,
      endTransform: i.endTransform,
      maximumHeight: i.maximumHeight,
      easingFunction: i.easingFunction,
      flyOverLongitude: i.flyOverLongitude,
      flyOverLongitudeWeight: i.flyOverLongitudeWeight,
      pitchAdjustHeight: i.pitchAdjustHeight
    });
  };

  var Mi = new L(),
      Si = new L(),
      Ni = new L(),
      Di = new L(),
      Ri = [new L(), new L(), new L(), new L()];
  var Ai = new C(),
      Fi = new L(),
      Vi = [new e(), new e(), new e(), new e()];

  function Bi(t, i, o, e, r, n) {
    Ai.x = t, Ai.y = i;
    var a = e.pickEllipsoid(Ai, r, Fi);
    return b(a) ? (Vi[o] = r.cartesianToCartographic(a, Vi[o]), 1) : (Vi[o] = r.cartesianToCartographic(n[o], Vi[o]), 0);
  }

  return M.prototype.computeViewRectangle = function (t, i) {
    t = v(t, f.WGS84);
    var o = this.frustum.computeCullingVolume(this.positionWC, this.directionWC, this.upWC),
        e = new p(L.ZERO, t.maximumRadius);

    if (o.computeVisibility(e) !== g.OUTSIDE) {
      var r = this._scene.canvas,
          n = r.clientWidth,
          a = r.clientHeight,
          s = 0,
          h = function (t, i) {
        var o,
            e = i.radii,
            r = t.positionWC,
            n = L.multiplyComponents(i.oneOverRadii, r, Mi),
            a = L.magnitude(n),
            s = L.normalize(n, Si),
            h = L.equalsEpsilon(s, L.UNIT_Z, U.EPSILON10) ? (o = new L(0, 1, 0), new L(0, 0, 1)) : (o = L.normalize(L.cross(L.UNIT_Z, s, Ni), Ni), L.normalize(L.cross(s, o, Di), Di)),
            u = Math.sqrt(L.magnitudeSquared(n) - 1),
            c = L.multiplyByScalar(s, 1 / a, Mi),
            d = u / a,
            m = L.multiplyByScalar(o, d, Si),
            l = L.multiplyByScalar(h, d, Ni),
            p = L.add(c, l, Ri[0]);
        L.subtract(p, m, p), L.multiplyComponents(e, p, p);
        var f = L.subtract(c, l, Ri[1]);
        L.subtract(f, m, f), L.multiplyComponents(e, f, f);
        var g = L.subtract(c, l, Ri[2]);
        L.add(g, m, g), L.multiplyComponents(e, g, g);

        var _ = L.add(c, l, Ri[3]);

        return L.add(_, m, _), L.multiplyComponents(e, _, _), Ri;
      }(this, t);

      if (s += Bi(0, 0, 0, this, t, h), s += Bi(0, a, 1, this, t, h), s += Bi(n, a, 2, this, t, h), (s += Bi(n, 0, 3, this, t, h)) < 2) return _.MAX_VALUE;
      i = _.fromCartographicArray(Vi, i);

      for (var u = 0, c = Vi[3].longitude, d = 0; d < 4; ++d) {
        var m = Vi[d].longitude,
            l = Math.abs(m - c);
        l > U.PI ? u += U.TWO_PI - l : u += l, c = m;
      }

      return U.equalsEpsilon(Math.abs(u), U.TWO_PI, U.EPSILON9) && (i.west = -U.PI, i.east = U.PI, 0 <= Vi[0].latitude ? i.north = U.PI_OVER_TWO : i.south = -U.PI_OVER_TWO), i;
    }
  }, M.prototype.switchToPerspectiveFrustum = function () {
    var t;
    this._mode === O.SCENE2D || this.frustum instanceof a || (t = this._scene, this.frustum = new a(), this.frustum.aspectRatio = t.drawingBufferWidth / t.drawingBufferHeight, this.frustum.fov = U.toRadians(60));
  }, M.prototype.switchToOrthographicFrustum = function () {
    var t, i;
    this._mode === O.SCENE2D || this.frustum instanceof j || (t = this._scene, this.frustum = new j(), this.frustum.aspectRatio = t.drawingBufferWidth / t.drawingBufferHeight, this.frustum.width = L.magnitude(this.position), i = this.frustum.projectionMatrix, b(i) && this._adjustOrthographicFrustum(!0));
  }, M.clone = function (t, i) {
    return b(i) || (i = new M(t._scene)), L.clone(t.position, i.position), L.clone(t.direction, i.direction), L.clone(t.up, i.up), L.clone(t.right, i.right), y.clone(t._transform, i.transform), i._transformChanged = !0, i.frustum = t.frustum.clone(), i;
  }, M;
});