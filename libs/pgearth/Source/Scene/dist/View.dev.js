"use strict";

define(["../Core/BoundingRectangle", "../Core/Cartesian3", "../Core/CullingVolume", "../Core/defined", "../Core/getTimestamp", "../Core/Interval", "../Core/Math", "../Core/Matrix4", "../Core/OrthographicFrustum", "../Core/OrthographicOffCenterFrustum", "../Renderer/ClearCommand", "../Renderer/Pass", "../Renderer/PassState", "./Camera", "./FrustumCommands", "./GlobeDepth", "./OIT", "./PickDepthFramebuffer", "./PickFramebuffer", "./SceneFramebuffer", "./SceneMode", "./ShadowMap"], function (f, n, t, P, r, e, U, h, a, s, I, R, l, p, c, d, M, b, g, F, B, X) {
  "use strict";

  function i(t, e, a) {
    var r,
        s,
        i = t.context,
        o = [],
        u = e.frustum.near,
        m = e.frustum.far,
        n = t.logarithmicDepthBuffer ? t.logarithmicDepthFarToNearRatio : t.farToNearRatio;
    q(u, m, n, Math.ceil(Math.log(m / u) / Math.log(n)), t.logarithmicDepthBuffer, o, !1, void 0), i.depthTexture && (r = new d()), t._useOIT && i.depthTexture && (s = new M(i));
    var h = new l(i);
    h.viewport = f.clone(a), this.camera = e, this._cameraClone = p.clone(e), this._cameraStartFired = !1, this._cameraMovedTime = void 0, this.viewport = a, this.passState = h, this.pickFramebuffer = new g(i), this.pickDepthFramebuffer = new b(), this.sceneFramebuffer = new F(), this.globeDepth = r, this.oit = s, this.pickDepths = [], this.debugGlobeDepths = [], this.frustumCommandsList = o, this.debugFrustumStatistics = void 0, this.updateFrustums = !1;
  }

  var v = new n(),
      S = new n();

  function o(t, e, a) {
    var r,
        s,
        i,
        o,
        u,
        m = 1 / Math.max(1, (r = t.position, s = e.position, i = Math.max(Math.abs(r.x), Math.abs(s.x)), o = Math.max(Math.abs(r.y), Math.abs(s.y)), u = Math.max(Math.abs(r.z), Math.abs(s.z)), Math.max(Math.max(i, o), u)));
    return n.multiplyByScalar(t.position, m, v), n.multiplyByScalar(e.position, m, S), n.equalsEpsilon(v, S, a) && n.equalsEpsilon(t.direction, e.direction, a) && n.equalsEpsilon(t.up, e.up, a) && n.equalsEpsilon(t.right, e.right, a) && h.equalsEpsilon(t.transform, e.transform, a) && t.frustum.equalsEpsilon(e.frustum, a);
  }

  function q(t, e, a, r, s, i, o, u) {
    i.length = r;

    for (var m, n, h = 0; h < r; ++h) {
      o ? (m = Math.min(e - u, t + h * u), n = Math.min(e, m + u)) : (n = a * (m = Math.max(t, Math.pow(a, h) * t)), s || (n = Math.min(e, n)));
      var f = i[h];
      P(f) ? (f.near = m, f.far = n) : f = i[h] = new c(m, n);
    }
  }

  i.prototype.checkForCameraUpdates = function (t) {
    var e = this.camera,
        a = this._cameraClone;
    return o(e, a, U.EPSILON15) ? (this._cameraStartFired && r() - this._cameraMovedTime > t.cameraEventWaitTime && (e.moveEnd.raiseEvent(), this._cameraStartFired = !1), !1) : (this._cameraStartFired || (e.moveStart.raiseEvent(), this._cameraStartFired = !0), this._cameraMovedTime = r(), p.clone(e, a), !0);
  };

  var G = new t(),
      z = new e();
  return i.prototype.createPotentiallyVisibleSet = function (t) {
    var e = t.frameState,
        a = e.camera,
        r = a.directionWC,
        s = a.positionWC,
        i = t._computeCommandList,
        o = t._overlayCommandList,
        u = e.commandList;
    t.debugShowFrustums && (this.debugFrustumStatistics = {
      totalCommands: 0,
      commandsInFrustums: {}
    });

    for (var m = this.frustumCommandsList, n = m.length, h = R.NUMBER_OF_PASSES, f = 0; f < n; ++f) {
      for (var l = 0; l < h; ++l) {
        m[f].indices[l] = 0;
      }
    }

    i.length = 0, o.length = 0;

    for (var p = Number.MAX_VALUE, c = -Number.MAX_VALUE, d = !1, M = e.shadowState.shadowsEnabled, b = Number.MAX_VALUE, g = -Number.MAX_VALUE, F = Number.MAX_VALUE, v = e.mode === B.SCENE3D ? e.occluder : void 0, S = e.cullingVolume, C = G.planes, E = 0; E < 5; ++E) {
      C[E] = S.planes[E];
    }

    S = G;

    for (var D = u.length, w = 0; w < D; ++w) {
      var _ = u[w],
          x = _.pass;
      if (x === R.COMPUTE) i.push(_);else if (x === R.OVERLAY) o.push(_);else {
        var y,
            L = _.boundingVolume;

        if (P(L)) {
          if (!t.isVisible(_, S, v)) continue;
          z = L.computePlaneDistances(s, r, z), p = Math.min(p, z.start), c = Math.max(c, z.stop), M && _.receiveShadows && z.start < X.MAXIMUM_DISTANCE && !(x === R.GLOBE && z.start < -100 && 100 < z.stop) && (y = z.stop - z.start, x !== R.GLOBE && z.start < 100 && (F = Math.min(F, y)), b = Math.min(b, z.start), g = Math.max(g, z.stop));
        } else z.start = a.frustum.near, z.stop = a.frustum.far, d = !(_ instanceof I);

        !function (t, e, a, r) {
          t.debugShowFrustums && (a.debugOverlappingFrustums = 0);

          for (var s, i = e.frustumCommandsList, o = i.length, u = 0; u < o; ++u) {
            var m = i[u],
                n = m.near,
                h = m.far;

            if (!(r.start > h)) {
              if (r.stop < n) break;
              var f = a.pass,
                  l = m.indices[f]++;
              if (m.commands[f][l] = a, t.debugShowFrustums && (a.debugOverlappingFrustums |= 1 << u), a.executeInClosestFrustum) break;
            }
          }

          t.debugShowFrustums && ((s = e.debugFrustumStatistics.commandsInFrustums)[a.debugOverlappingFrustums] = P(s[a.debugOverlappingFrustums]) ? s[a.debugOverlappingFrustums] + 1 : 1, ++e.debugFrustumStatistics.totalCommands), t.updateDerivedCommands(a);
        }(t, this, _, z);
      }
    }

    d ? (p = a.frustum.near, c = a.frustum.far) : (p = Math.min(Math.max(p, a.frustum.near), a.frustum.far), c = Math.max(Math.min(c, a.frustum.far), p), M && (b = Math.min(Math.max(b, a.frustum.near), a.frustum.far), g = Math.max(Math.min(g, a.frustum.far), b))), M && (e.shadowState.nearPlane = b, e.shadowState.farPlane = g, e.shadowState.closestObjectSize = F);
    var A,
        O = t.mode === B.SCENE2D,
        T = e.useLogDepth,
        N = T ? t.logarithmicDepthFarToNearRatio : t.farToNearRatio;
    t.useSingleFrustum && (N = Number.MAX_VALUE), A = O ? (c = Math.min(c, a.position.z + t.nearToFarDistance2D), p = Math.min(p, c), Math.ceil(Math.max(1, c - p) / t.nearToFarDistance2D)) : Math.ceil(Math.log(c / p) / Math.log(N)), (this.updateFrustums || p !== Number.MAX_VALUE && (A !== n || 0 !== m.length && (p < m[0].near || c > m[n - 1].far && (T || !U.equalsEpsilon(c, m[n - 1].far, U.EPSILON8))))) && (this.updateFrustums = !1, q(p, c, N, A, T, m, O, t.nearToFarDistance2D), this.createPotentiallyVisibleSet(t));
    var k = e.frustumSplits;
    k.length = A + 1;

    for (var V = 0; V < A; ++V) {
      k[V] = m[V].near, V === A - 1 && (k[V + 1] = m[V].far);
    }
  }, i.prototype.destroy = function () {
    this.pickFramebuffer = this.pickFramebuffer && this.pickFramebuffer.destroy(), this.pickDepthFramebuffer = this.pickDepthFramebuffer && this.pickDepthFramebuffer.destroy(), this.sceneFramebuffer = this.sceneFramebuffer && this.sceneFramebuffer.destroy(), this.globeDepth = this.globeDepth && this.globeDepth.destroy(), this.oit = this.oit && this.oit.destroy();

    for (var t = this.pickDepths, e = this.debugGlobeDepths, a = t.length, r = 0; r < a; ++r) {
      t[r].destroy();
    }

    for (a = e.length, r = 0; r < a; ++r) {
      e[r].destroy();
    }
  }, i;
});