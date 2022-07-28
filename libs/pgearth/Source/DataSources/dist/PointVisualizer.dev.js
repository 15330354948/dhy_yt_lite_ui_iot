"use strict";

define(["../Core/AssociativeArray", "../Core/Cartesian3", "../Core/Color", "../Core/defined", "../Core/destroyObject", "../Core/DeveloperError", "../Core/DistanceDisplayCondition", "../Core/NearFarScalar", "../Scene/createBillboardPointCallback", "../Scene/HeightReference", "./BoundingSphereState", "./Property"], function (t, b, w, V, o, P, e, i, S, B, n, N) {
  "use strict";

  var q = w.WHITE,
      E = w.BLACK,
      W = new w(),
      x = new b(),
      U = new w(),
      z = new i(),
      A = new i(),
      T = new e();

  function s(e) {
    this.entity = e, this.pointPrimitive = void 0, this.billboard = void 0, this.color = void 0, this.outlineColor = void 0, this.pixelSize = void 0, this.outlineWidth = void 0;
  }

  function r(e, i) {
    if (!V(e)) throw new P("entityCluster is required.");
    if (!V(i)) throw new P("entityCollection is required.");
    i.collectionChanged.addEventListener(r.prototype._onCollectionChanged, this), this._cluster = e, this._entityCollection = i, this._items = new t(), this._onCollectionChanged(i, i.values, [], []);
  }

  function I(e, i, t) {
    if (V(e)) {
      var o = e.pointPrimitive;
      if (V(o)) return e.pointPrimitive = void 0, void t.removePoint(i);
      var n = e.billboard;
      V(n) && (e.billboard = void 0, t.removeBillboard(i));
    }
  }

  return r.prototype.update = function (e) {
    if (!V(e)) throw new P("time is required.");

    for (var i = this._items.values, t = this._cluster, o = 0, n = i.length; o < n; o++) {
      var r,
          l,
          a,
          s,
          u,
          d,
          c,
          h,
          p,
          f,
          g,
          C = i[o],
          _ = C.entity,
          v = _._point,
          D = C.pointPrimitive,
          y = C.billboard,
          m = N.getValueOrDefault(v._heightReference, e, B.NONE),
          O = _.isShowing && _.isAvailable(e) && N.getValueOrDefault(v._show, e, !0);
      O && (r = N.getValueOrUndefined(_._position, e, x), O = V(r)), O ? (N.isConstant(_._position) || (t._clusterDirty = !0), l = g = !1, m === B.NONE || V(y) ? m !== B.NONE || V(D) || (V(y) && (I(C, _, t), y = void 0), (D = t.getPoint(_)).id = _, C.pointPrimitive = D) : (V(D) && (I(C, _, t), D = void 0), (y = t.getBillboard(_)).id = _, y.image = void 0, C.billboard = y, g = !0, l = b.equals(y.position, r) && y.heightReference === m), V(D) ? (D.show = !0, D.position = r, D.scaleByDistance = N.getValueOrUndefined(v._scaleByDistance, e, z), D.translucencyByDistance = N.getValueOrUndefined(v._translucencyByDistance, e, A), D.color = N.getValueOrDefault(v._color, e, q, W), D.outlineColor = N.getValueOrDefault(v._outlineColor, e, E, U), D.outlineWidth = N.getValueOrDefault(v._outlineWidth, e, 0), D.pixelSize = N.getValueOrDefault(v._pixelSize, e, 1), D.distanceDisplayCondition = N.getValueOrUndefined(v._distanceDisplayCondition, e, T), D.disableDepthTestDistance = N.getValueOrDefault(v._disableDepthTestDistance, e, 0)) : V(y) && (y.show = !0, y.position = r, y.scaleByDistance = N.getValueOrUndefined(v._scaleByDistance, e, z), y.translucencyByDistance = N.getValueOrUndefined(v._translucencyByDistance, e, A), y.distanceDisplayCondition = N.getValueOrUndefined(v._distanceDisplayCondition, e, T), y.disableDepthTestDistance = N.getValueOrDefault(v._disableDepthTestDistance, e, 0), y.heightReference = m, a = N.getValueOrDefault(v._color, e, q, W), s = N.getValueOrDefault(v._outlineColor, e, E, U), u = Math.round(N.getValueOrDefault(v._outlineWidth, e, 0)), d = Math.max(1, Math.round(N.getValueOrDefault(v._pixelSize, e, 1))), (g = 0 < u ? (y.scale = 1, g || u !== C.outlineWidth || d !== C.pixelSize || !w.equals(a, C.color) || !w.equals(s, C.outlineColor)) : (y.scale = d / 50, d = 50, g || u !== C.outlineWidth || !w.equals(a, C.color) || !w.equals(s, C.outlineColor))) && (C.color = w.clone(a, C.color), C.outlineColor = w.clone(s, C.outlineColor), C.pixelSize = d, C.outlineWidth = u, c = a.alpha, h = a.toCssColorString(), p = s.toCssColorString(), f = JSON.stringify([h, d, p, u]), y.setImage(f, S(c, h, p, u, d))), l && y._updateClamping())) : I(C, _, t);
    }

    return !0;
  }, r.prototype.getBoundingSphere = function (e, i) {
    if (!V(e)) throw new P("entity is required.");
    if (!V(i)) throw new P("result is required.");

    var t = this._items.get(e.id);

    if (!V(t) || !V(t.pointPrimitive) && !V(t.billboard)) return n.FAILED;
    if (V(t.pointPrimitive)) i.center = b.clone(t.pointPrimitive.position, i.center);else {
      var o = t.billboard;
      if (!V(o._clampedPosition)) return n.PENDING;
      i.center = b.clone(o._clampedPosition, i.center);
    }
    return i.radius = 0, n.DONE;
  }, r.prototype.isDestroyed = function () {
    return !1;
  }, r.prototype.destroy = function () {
    this._entityCollection.collectionChanged.removeEventListener(r.prototype._onCollectionChanged, this);

    for (var e = this._entityCollection.values, i = 0; i < e.length; i++) {
      this._cluster.removePoint(e[i]);
    }

    return o(this);
  }, r.prototype._onCollectionChanged = function (e, i, t, o) {
    for (var n, r = this._items, l = this._cluster, a = i.length - 1; -1 < a; a--) {
      n = i[a], V(n._point) && V(n._position) && r.set(n.id, new s(n));
    }

    for (a = o.length - 1; -1 < a; a--) {
      n = o[a], V(n._point) && V(n._position) ? r.contains(n.id) || r.set(n.id, new s(n)) : (I(r.get(n.id), n, l), r.remove(n.id));
    }

    for (a = t.length - 1; -1 < a; a--) {
      n = t[a], I(r.get(n.id), n, l), r.remove(n.id);
    }
  }, r;
});