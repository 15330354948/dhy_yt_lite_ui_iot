"use strict";

define(["../Core/Cartesian3", "../Core/defined", "../Core/Intersect", "../Core/ManagedArray", "../Core/Math", "./PGEarth3DTileOptimizationHint", "./PGEarth3DTileRefine"], function (e, C, a, t, r, u, k) {
  "use strict";

  function i() {}

  function x(e) {
    return e._visible && e._inRequestVolume;
  }

  var E = {
    stack: new t(),
    stackMaximumLength: 0
  },
      y = {
    stack: new t(),
    stackMaximumLength: 0
  },
      L = {
    stack: new t(),
    stackMaximumLength: 0
  },
      b = {
    stack: new t(),
    stackMaximumLength: 0,
    ancestorStack: new t(),
    ancestorStackMaximumLength: 0
  },
      m = 2;

  function T(e) {
    return e._skipLevelOfDetail;
  }

  function p(e, t, r) {
    var i;
    t.contentVisibility(r) !== a.OUTSIDE && ((i = t.content).featurePropertiesDirty ? (i.featurePropertiesDirty = !1, t.lastStyleTime = 0, e._selectedTilesToStyle.push(t)) : t._selectedFrame < r.frameNumber - 1 && e._selectedTilesToStyle.push(t), t._selectedFrame = r.frameNumber, e._selectedTiles.push(t));
  }

  function F(e, t, r) {
    var i;
    T(e) ? (i = t.contentAvailable ? t : t._ancestorWithContentAvailable, C(i) ? i._shouldSelect = !0 : function (e, t, r) {
      var i = L.stack;

      for (i.push(t); 0 < i.length;) {
        L.stackMaximumLength = Math.max(L.stackMaximumLength, i.length);

        for (var a = i.pop().children, n = a.length, o = 0; o < n; ++o) {
          var c = a[o];
          x(c) && (c.contentAvailable ? (A(e, c, r), P(e, c, r), p(e, c, r)) : c._depth - t._depth < m && i.push(c));
        }
      }
    }(e, t, r)) : t.contentAvailable && p(e, t, r);
  }

  function P(e, t, r) {
    t._touchedFrame !== r.frameNumber && (e._cache.touch(t), t._touchedFrame = r.frameNumber);
  }

  function D(e, t, r) {
    var i;
    t._requestedFrame !== r.frameNumber && (R(t) || t.contentExpired) && (!function (e, t, r) {
      if (!e.cullRequestsWhileMoving) return 1;
      var i = t.boundingSphere,
          a = Math.max(2 * i.radius, 1),
          n = r.camera,
          o = 0 !== n.positionWCDeltaMagnitude ? n.positionWCDeltaMagnitude : n.positionWCDeltaMagnitudeLastFrame;
      return e.cullRequestsWhileMovingMultiplier * o / a < 1;
    }(e, t, r) || (i = r.camera.timeSinceMoved < e.foveatedTimeDelay, t.priorityDeferred && i || (t._requestedFrame = r.frameNumber, e._requestedTiles.push(t))));
  }

  function h(e, t, r) {
    t._updatedVisibilityFrame !== e._updatedVisibilityFrame && (t.updateVisibility(r), t._updatedVisibilityFrame = e._updatedVisibilityFrame);
  }

  function _(e, t, r) {
    if (h(e, t, r), x(t)) {
      var i = 0 < t.children.length;

      if (t.hasTilesetContent && i) {
        var a = t.children[0];
        return _(e, a, r), void (t._visible = a._visible);
      }

      if (n = e, c = r, m = (o = t).parent, !(C(m) && !m.hasTilesetContent && m.refine === k.ADD && o.getScreenSpaceError(c, !0) <= n._maximumScreenSpaceError)) {
        var n,
            o,
            c,
            m,
            s = t.refine === k.REPLACE,
            l = t._optimChildrenWithinParent === u.USE_OPTIMIZATION;
        return s && l && i && !function (e, t, r) {
          for (var i = !1, a = t.children, n = a.length, o = 0; o < n; ++o) {
            var c = a[o];
            h(e, c, r), i = i || x(c);
          }

          return i;
        }(e, t, r) && (++e._statistics.numberOfTilesCulledWithChildrenUnion, void (t._visible = !1));
      }

      t._visible = !1;
    }
  }

  function A(e, t, r) {
    var i, a;
    _(e, t, r), t.updateExpiration(), t._wasMinPriorityChild = !1, t._priorityHolder = t, a = t, (i = e)._maximumPriority.distance = Math.max(a._priorityHolder._distanceToCamera, i._maximumPriority.distance), i._minimumPriority.distance = Math.min(a._priorityHolder._distanceToCamera, i._minimumPriority.distance), i._maximumPriority.depth = Math.max(a._depth, i._maximumPriority.depth), i._minimumPriority.depth = Math.min(a._depth, i._minimumPriority.depth), i._maximumPriority.foveatedFactor = Math.max(a._priorityHolder._foveatedFactor, i._maximumPriority.foveatedFactor), i._minimumPriority.foveatedFactor = Math.min(a._priorityHolder._foveatedFactor, i._minimumPriority.foveatedFactor), i._maximumPriority.reverseScreenSpaceError = Math.max(a._priorityReverseScreenSpaceError, i._maximumPriority.reverseScreenSpaceError), i._minimumPriority.reverseScreenSpaceError = Math.min(a._priorityReverseScreenSpaceError, i._minimumPriority.reverseScreenSpaceError), t._shouldSelect = !1, t._finalResolution = !0;
  }

  function W(e) {
    return e.hasEmptyContent || e.hasTilesetContent;
  }

  function R(e) {
    return !W(e) && e.contentUnloaded;
  }

  function v(e, t) {
    return 0 === t._distanceToCamera && 0 === e._distanceToCamera ? t._centerZDepth - e._centerZDepth : t._distanceToCamera - e._distanceToCamera;
  }

  function N(e, t, r, i) {
    for (var a = t.refine === k.REPLACE, n = t.children, o = n.length, c = 0; c < o; ++c) {
      A(e, n[c], i);
    }

    n.sort(v);

    var m,
        s,
        l = !T(e) && a && !W(t),
        u = !0,
        h = !1,
        _ = -1,
        d = Number.MAX_VALUE;

    for (c = 0; c < o; ++c) {
      x(s = n[c]) ? (r.push(s), s._foveatedFactor < d && (_ = c, d = s._foveatedFactor), h = !0) : (l || e.loadSiblings) && (s._foveatedFactor < d && (_ = c, d = s._foveatedFactor), D(e, s, i), P(e, s, i)), l && (m = !!s._inRequestVolume && (W(s) ? function (e, t, r) {
        var i = !0,
            a = y.stack;
        a.push(t);

        for (; 0 < a.length;) {
          y.stackMaximumLength = Math.max(y.stackMaximumLength, a.length);
          var n = a.pop(),
              o = n.children,
              c = o.length,
              m = W(n) && q(e, n);
          if (m || n.contentAvailable || (i = !1), A(e, n, r), x(n) || (D(e, n, r), P(e, n, r)), m) for (var s = 0; s < c; ++s) {
            var l = o[s];
            a.push(l);
          }
        }

        return i;
      }(e, s, i) : s.contentAvailable), u = u && m);
    }

    if (h || (u = !1), -1 !== _ && !T(e) && a) {
      var p = n[_];
      p._wasMinPriorityChild = !0;
      var f = (t._wasMinPriorityChild || t === e.root) && d <= t._priorityHolder._foveatedFactor ? t._priorityHolder : t;

      for (f._foveatedFactor = Math.min(p._foveatedFactor, f._foveatedFactor), f._distanceToCamera = Math.min(p._distanceToCamera, f._distanceToCamera), c = 0; c < o; ++c) {
        (s = n[c])._priorityHolder = f;
      }
    }

    return u;
  }

  function q(e, t) {
    return 0 !== t.children.length && (t.hasTilesetContent ? !t.contentExpired : t._screenSpaceError > e._maximumScreenSpaceError);
  }

  function V(e, t, r, i, a) {
    var n,
        o,
        c,
        m,
        s,
        l,
        u,
        h,
        _,
        d = E.stack;

    for (d.push(t); 0 < d.length;) {
      E.stackMaximumLength = Math.max(E.stackMaximumLength, d.length);
      var p = d.pop();
      !function (e, t) {
        e._ancestorWithContent = void 0, e._ancestorWithContentAvailable = void 0;
        var r,
            i = e.parent;
        C(i) && (r = !R(i) || i._requestedFrame === t.frameNumber, e._ancestorWithContent = r ? i : i._ancestorWithContent, e._ancestorWithContentAvailable = i.contentAvailable ? i : i._ancestorWithContentAvailable);
      }(p, a);
      var f = (h = p, _ = r, !T(u = e) || !u.immediatelyLoadDesiredLevelOfDetail && (!C(h._ancestorWithContent) || (0 === h._screenSpaceError ? h.parent._screenSpaceError > _ : h._screenSpaceError > _))),
          v = p.refine === k.ADD,
          S = p.refine === k.REPLACE,
          g = p.parent,
          M = !C(g) || g._refines,
          x = !1;
      q(e, p) && (x = N(e, p, d, a) && M);
      var y = !x && M;
      W(p) ? (l = p, e._emptyTiles.push(l), D(e, p, a), y && F(e, p, a)) : v ? (F(e, p, a), D(e, p, a)) : S && (f ? (D(e, p, a), y && F(e, p, a)) : y ? (F(e, p, a), D(e, p, a)) : (c = e, s = (m = p)._ancestorWithContent, !c.immediatelyLoadDesiredLevelOfDetail && (m._priorityProgressiveResolutionScreenSpaceErrorLeaf || C(s) && m._screenSpaceError < s._screenSpaceError / c.skipScreenSpaceErrorFactor && m._depth > s._depth + c.skipLevels) && D(e, p, a))), n = p, o = a, ++e._statistics.visited, n._visitedFrame = o.frameNumber, P(e, p, a), p._refines = x;
    }
  }

  function H(e, t, r) {
    var i,
        a = b.stack,
        n = b.ancestorStack;

    for (a.push(t); 0 < a.length || 0 < n.length;) {
      if (b.stackMaximumLength = Math.max(b.stackMaximumLength, a.length), b.ancestorStackMaximumLength = Math.max(b.ancestorStackMaximumLength, n.length), 0 < n.length) {
        var o = n.peek();

        if (o._stackLength === a.length) {
          n.pop(), o !== i && (o._finalResolution = !1), p(e, o, r);
          continue;
        }
      }

      var c = a.pop();

      if (C(c)) {
        var m = c.refine === k.ADD,
            s = c._shouldSelect,
            l = c.children,
            u = l.length,
            h = q(e, c);
        if (s) if (m) p(e, c, r);else {
          if (c._selectionDepth = n.length, 0 < c._selectionDepth && (e._hasMixedContent = !0), i = c, !h) {
            p(e, c, r);
            continue;
          }

          n.push(c), c._stackLength = a.length;
        }
        if (h) for (var _ = 0; _ < u; ++_) {
          var d = l[_];
          x(d) && a.push(d);
        }
      }
    }
  }

  return i.selectTiles = function (e, t) {
    if (e._requestedTiles.length = 0, !e.debugFreezeFrame) {
      e._selectedTiles.length = 0, e._selectedTilesToStyle.length = 0, e._emptyTiles.length = 0, e._hasMixedContent = !1;

      var r,
          i,
          a,
          n,
          o,
          c,
          m,
          s,
          l,
          u,
          h,
          _,
          d,
          p,
          f,
          v = e.root;

      if (A(e, v, t), x(v) && !(v.getScreenSpaceError(t, !0) <= e._maximumScreenSpaceError)) {
        T(e) ? e.immediatelyLoadDesiredLevelOfDetail ? (c = e, m = v, s = t, l = Number.MAX_VALUE, u = c._maximumScreenSpaceError, V(c, m, l, 0, s), H(c, m, s)) : (r = e, i = v, a = t, n = Math.max(r.baseScreenSpaceError, r.maximumScreenSpaceError), o = r.maximumScreenSpaceError, V(r, i, n, 0, a), H(r, i, a)) : (_ = v, d = t, p = (h = e)._maximumScreenSpaceError, f = h._maximumScreenSpaceError, V(h, _, p, 0, d)), E.stack.trim(E.stackMaximumLength), y.stack.trim(y.stackMaximumLength), L.stack.trim(L.stackMaximumLength), b.stack.trim(b.stackMaximumLength), b.ancestorStack.trim(b.ancestorStackMaximumLength);

        for (var S = e._requestedTiles, g = S.length, M = 0; M < g; ++M) {
          S[M].updatePriority();
        }
      }
    }
  }, i;
});