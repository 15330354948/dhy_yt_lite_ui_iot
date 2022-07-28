"use strict";

define(["../Core/arrayFill", "../Core/Check", "../Core/combine", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/Event", "../Core/getTimestamp", "../Core/JulianDate", "../Core/Math", "../Core/Matrix4", "../Core/Resource", "../ThirdParty/when", "./ClippingPlaneCollection", "./PointCloud", "./PointCloudEyeDomeLighting", "./PointCloudShading", "./SceneMode", "./ShadowMode"], function (t, i, m, d, T, e, n, r, h, E, c, g, p, a, o, _, s, l, A, u) {
  "use strict";

  function f(e) {
    e = d(e, d.EMPTY_OBJECT), i.typeOf.object("options.clock", e.clock), i.typeOf.object("options.intervals", e.intervals), this.show = d(e.show, !0), this.modelMatrix = g.clone(d(e.modelMatrix, g.IDENTITY)), this.shadows = d(e.shadows, u.ENABLED), this.maximumMemoryUsage = d(e.maximumMemoryUsage, 256), this.shading = new l(e.shading), this.style = e.style, this.frameFailed = new r(), this.frameChanged = new r(), this._clock = e.clock, this._intervals = e.intervals, this._clippingPlanes = void 0, this.clippingPlanes = e.clippingPlanes, this._pointCloudEyeDomeLighting = new s(), this._loadTimestamp = void 0, this._clippingPlanesState = 0, this._styleDirty = !1, this._pickId = void 0, this._totalMemoryUsageInBytes = 0, this._frames = [], this._previousInterval = void 0, this._nextInterval = void 0, this._lastRenderedFrame = void 0, this._clockMultiplier = 0, this._readyPromise = a.defer(), this._runningSum = 0, this._runningLength = 0, this._runningIndex = 0, this._runningSamples = t(new Array(5), 0), this._runningAverage = 0;
  }

  function y(e) {
    return "uniform vec4 czm_pickColor;\n" + e;
  }

  function v() {
    return "czm_pickColor";
  }

  e(f.prototype, {
    clippingPlanes: {
      get: function get() {
        return this._clippingPlanes;
      },
      set: function set(e) {
        o.setOwner(e, this, "_clippingPlanes");
      }
    },
    totalMemoryUsageInBytes: {
      get: function get() {
        return this._totalMemoryUsageInBytes;
      }
    },
    boundingSphere: {
      get: function get() {
        if (T(this._lastRenderedFrame)) return this._lastRenderedFrame.pointCloud.boundingSphere;
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise.promise;
      }
    }
  }), f.prototype.makeStyleDirty = function () {
    this._styleDirty = !0;
  }, f.prototype._getAverageLoadTime = function () {
    return 0 === this._runningLength ? .05 : this._runningAverage;
  };
  var R = new E();

  function N(e) {
    var t = e._clock,
        i = t.canAnimate && t.shouldAnimate,
        n = t.multiplier;
    return i ? n : 0;
  }

  function B(e, t) {
    return e._intervals.indexOf(t.start);
  }

  function C(i, e, t) {
    var n,
        r,
        a,
        o,
        s,
        l = B(i, e),
        u = i._frames,
        d = u[l];
    return T(d) || (n = e.data.transform, r = T(n) ? g.fromArray(n) : void 0, a = e.data.uri, d = {
      pointCloud: void 0,
      transform: r,
      timestamp: h(),
      sequential: !0,
      ready: !1,
      touchedFrameNumber: t.frameNumber
    }, u[l] = d, p.fetchArrayBuffer({
      url: a
    }).then(function (e) {
      var t;
      return d.pointCloud = new _({
        arrayBuffer: e,
        cull: !0,
        fragmentShaderLoaded: y,
        uniformMapLoaded: (t = i, function (e) {
          return m(e, {
            czm_pickColor: function czm_pickColor() {
              return t._pickId.color;
            }
          });
        }),
        pickIdLoaded: v
      }), d.pointCloud.readyPromise;
    }).otherwise((o = i, s = a, function (e) {
      var t = T(e.message) ? e.message : e.toString();
      0 < o.frameFailed.numberOfListeners ? o.frameFailed.raiseEvent({
        uri: s,
        message: t
      }) : (console.log("A frame failed to load: " + s), console.log("Error: " + t));
    }))), d;
  }

  function P(e, t, i, n) {
    t.touchedFrameNumber < n.frameNumber - 1 && (t.sequential = !1);
    var r,
        a,
        o,
        s,
        l,
        u = t.pointCloud;
    T(u) && !t.ready && (a = (r = n.commandList).length, O(e, t, i, n), u.ready && (t.ready = !0, e._totalMemoryUsageInBytes += u.geometryByteLength, r.length = a, t.sequential && (o = (h() - t.timestamp) / 1e3, l = o, (s = e)._runningSum += l, s._runningSum -= s._runningSamples[s._runningIndex], s._runningSamples[s._runningIndex] = l, s._runningLength = Math.min(s._runningLength + 1, s._runningSamples.length), s._runningIndex = (s._runningIndex + 1) % s._runningSamples.length, s._runningAverage = s._runningSum / s._runningLength))), t.touchedFrameNumber = n.frameNumber;
  }

  var I = new g();
  var S = new l();

  function O(e, t, i, n) {
    var r,
        a,
        o,
        s = d(e.shading, S),
        l = t.pointCloud,
        u = d(t.transform, g.IDENTITY);
    l.modelMatrix = g.multiplyTransformation(e.modelMatrix, u, I), l.style = e.style, l.time = i.timeSinceLoad, l.shadows = e.shadows, l.clippingPlanes = e._clippingPlanes, l.isClipped = i.isClipped, l.attenuation = s.attenuation, l.backFaceCulling = s.backFaceCulling, l.normalShading = s.normalShading, l.geometricError = (r = l, a = e.shading, T(a) && T(a.baseResolution) ? a.baseResolution : T(r.boundingSphere) ? c.cbrt(r.boundingSphere.volume() / r.pointsLength) : 0), l.geometricErrorScale = s.geometricErrorScale, l.maximumAttenuation = (o = e.shading, T(o) && T(o.maximumAttenuation) ? o.maximumAttenuation : 10), l.update(n), t.touchedFrameNumber = n.frameNumber;
  }

  function U(e, t, i, n) {
    P(e, C(e, t, n), i, n);
  }

  function j(e, t) {
    for (var i = e._frames, n = i.length, r = 0; r < n; ++r) {
      var a,
          o = i[r];
      T(o) && (T(t) && !t(o) || (a = o.pointCloud, o.ready && (e._totalMemoryUsageInBytes -= a.geometryByteLength), T(a) && a.destroy(), o === e._lastRenderedFrame && (e._lastRenderedFrame = void 0), i[r] = void 0));
    }
  }

  function q(e, t, i, n, r) {
    return T(i) && (i.ready || (U(e, t, n, r), i.ready));
  }

  var z = {
    timeSinceLoad: 0,
    isClipped: !1,
    clippingPlanesDirty: !1
  };
  return f.prototype.update = function (e) {
    var t, i, n, r, a, o, s, l, u, d, m, h, c, g, p, _, f, y, v, C, P, I, S, b, k, L, M, x, w, F, D;

    e.mode !== A.MORPHING && this.show && (T(this._pickId) || (this._pickId = e.context.createPickId({
      primitive: this
    })), T(this._loadTimestamp) || (this._loadTimestamp = E.clone(e.time)), t = Math.max(1e3 * E.secondsDifference(e.time, this._loadTimestamp), 0), i = this._clippingPlanes, n = 0, r = !1, (a = T(i) && i.enabled) && (i.update(e), n = i.clippingPlanesState), this._clippingPlanesState !== n && (this._clippingPlanesState = n, r = !0), o = this._styleDirty, this._styleDirty = !1, (r || o) && function (e, t, i) {
      for (var n = e._frames, r = n.length, a = 0; a < r; ++a) {
        var o = n[a];
        T(o) && T(o.pointCloud) && (o.pointCloud.clippingPlanesDirty = t, o.pointCloud.styleDirty = i);
      }
    }(this, r, o), z.timeSinceLoad = t, z.isClipped = a, s = this.shading, l = this._pointCloudEyeDomeLighting, d = (u = e.commandList).length, m = this._previousInterval, h = this._nextInterval, p = (g = this)._intervals, _ = g._clock.currentTime, f = p.indexOf(_), c = p.get(f), T(c) && (y = !1, C = 0 === (v = N(this)), v !== this._clockMultiplier && (y = !0, this._clockMultiplier = v), T(m) && !C || (m = c), (!T(h) || y || (I = c, S = h, b = N(P = this), k = B(P, I), L = B(P, S), 0 <= b ? L <= k : k <= L)) && (h = function (e, t) {
      var i = e._intervals,
          n = e._clock,
          r = N(e);

      if (0 !== r) {
        var a = e._getAverageLoadTime(),
            o = E.addSeconds(n.currentTime, a * r, R),
            s = i.indexOf(o);

        return s === B(e, t) && (0 <= r ? ++s : --s), i.get(s);
      }
    }(this, c)), M = function (e, t) {
      var i = B(e, t),
          n = e._frames[i];
      if (T(n) && n.ready) return n;
    }(this, m = function (e, t, i, n, r) {
      var a,
          o,
          s = e._intervals,
          l = e._frames,
          u = B(e, i),
          d = B(e, t);

      if (d <= u) {
        for (a = u; d <= a; --a) {
          if (q(e, o = s.get(a), l[a], n, r)) return o;
        }
      } else for (a = u; a <= d; ++a) {
        if (q(e, o = s.get(a), l[a], n, r)) return o;
      }

      return t;
    }(this, m, c, z, e)), T(M) || (U(this, m, z, e), M = this._lastRenderedFrame), T(M) && O(this, M, z, e), T(h) && U(this, h, z, e), x = this, T(M) && !T(this._lastRenderedFrame) && e.afterRender.push(function () {
      x._readyPromise.resolve(x);
    }), T(M) && M !== this._lastRenderedFrame && 0 < x.frameChanged.numberOfListeners && e.afterRender.push(function () {
      x.frameChanged.raiseEvent(x);
    }), this._previousInterval = m, this._nextInterval = h, this._lastRenderedFrame = M, w = this._totalMemoryUsageInBytes, 1024 * this.maximumMemoryUsage * 1024 < w && j(this, (F = e, function (e) {
      return e.touchedFrameNumber < F.frameNumber;
    })), D = u.length - d, T(s) && s.attenuation && s.eyeDomeLighting && 0 < D && l.update(e, d, s)));
  }, f.prototype.isDestroyed = function () {
    return !1;
  }, f.prototype.destroy = function () {
    return j(this), this._clippingPlanes = this._clippingPlanes && this._clippingPlanes.destroy(), this._pickId = this._pickId && this._pickId.destroy(), n(this);
  }, f;
});