"use strict";

define(["../Core/AssociativeArray", "../Core/Cartesian3", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/defined", "../Core/DistanceDisplayCondition", "../Core/DistanceDisplayConditionGeometryInstanceAttribute", "../Core/OffsetGeometryInstanceAttribute", "../Core/ShowGeometryInstanceAttribute", "../Scene/PerInstanceColorAppearance", "../Scene/Primitive", "./BoundingSphereState", "./Property"], function (r, P, _, b, A, D, O, B, S, I, G, l, V) {
  "use strict";

  var W = new _(),
      E = new D(),
      R = new D(),
      T = P.ZERO,
      U = new P();

  function n(t, e, i, s) {
    this.translucent = e, this.width = i, this.shadows = s, this.primitives = t, this.createPrimitive = !1, this.waitingOnCreate = !1, this.primitive = void 0, this.oldPrimitive = void 0, this.geometry = new r(), this.updaters = new r(), this.updatersWithAttributes = new r(), this.attributes = new r(), this.itemsToRemove = [], this.subscriptions = new r(), this.showsUpdated = new r();
  }

  function t(t, e, i) {
    this._primitives = t, this._scene = e, this._shadows = i, this._solidBatches = new r(), this._translucentBatches = new r();
  }

  return n.prototype.add = function (r, t) {
    var o,
        e = r.id;
    this.createPrimitive = !0, this.geometry.set(e, t), this.updaters.set(e, r), r.hasConstantOutline && r.outlineColorProperty.isConstant && V.isConstant(r.distanceDisplayConditionProperty) && V.isConstant(r.terrainOffsetProperty) ? (o = this).subscriptions.set(e, r.entity.definitionChanged.addEventListener(function (t, e, i, s) {
      "isShowing" === e && o.showsUpdated.set(r.id, r);
    })) : this.updatersWithAttributes.set(e, r);
  }, n.prototype.remove = function (t) {
    var e = t.id;

    if (this.createPrimitive = this.geometry.remove(e) || this.createPrimitive, this.updaters.remove(e)) {
      this.updatersWithAttributes.remove(e);
      var i = this.subscriptions.get(e);
      return A(i) && (i(), this.subscriptions.remove(e), this.showsUpdated.remove(e)), !0;
    }

    return !1;
  }, n.prototype.update = function (t) {
    var e = !0,
        i = 0,
        s = this.primitive,
        r = this.primitives;

    if (this.createPrimitive) {
      var o,
          n = this.geometry.values;
      0 < n.length ? (A(s) && (A(this.oldPrimitive) ? r.remove(s) : this.oldPrimitive = s), s = new G({
        show: !1,
        asynchronous: !0,
        geometryInstances: n,
        appearance: new I({
          flat: !0,
          translucent: this.translucent,
          renderState: {
            lineWidth: this.width
          }
        }),
        shadows: this.shadows
      }), r.add(s), e = !1) : (A(s) && (r.remove(s), s = void 0), o = this.oldPrimitive, A(o) && (r.remove(o), this.oldPrimitive = void 0)), this.attributes.removeAll(), this.primitive = s, this.createPrimitive = !1, this.waitingOnCreate = !0;
    } else if (A(s) && s.ready) {
      s.show = !0, A(this.oldPrimitive) && (r.remove(this.oldPrimitive), this.oldPrimitive = void 0);

      for (var a = this.updatersWithAttributes.values, h = a.length, l = this.waitingOnCreate, u = 0; u < h; u++) {
        var d,
            v,
            c = a[u],
            p = this.geometry.get(c.id),
            m = this.attributes.get(p.id.id);
        A(m) || (m = s.getGeometryInstanceAttributes(p.id), this.attributes.set(p.id.id, m)), c.outlineColorProperty.isConstant && !l || (d = c.outlineColorProperty, v = V.getValueOrDefault(d, t, _.WHITE, W), _.equals(m._lastColor, v) || (m._lastColor = _.clone(v, m._lastColor), m.color = b.toValue(v, m.color), (this.translucent && 255 === m.color[3] || !this.translucent && 255 !== m.color[3]) && (this.itemsToRemove[i++] = c)));
        var f = c.entity.isShowing && (c.hasConstantOutline || c.isOutlineVisible(t));
        f !== (1 === m.show[0]) && (m.show = S.toValue(f, m.show));
        var g,
            y = c.distanceDisplayConditionProperty;
        V.isConstant(y) || (g = V.getValueOrDefault(y, t, R, E), D.equals(g, m._lastDistanceDisplayCondition) || (m._lastDistanceDisplayCondition = D.clone(g, m._lastDistanceDisplayCondition), m.distanceDisplayCondition = O.toValue(g, m.distanceDisplayCondition)));
        var w,
            C = c.terrainOffsetProperty;
        V.isConstant(C) || (w = V.getValueOrDefault(C, t, T, U), P.equals(w, m._lastOffset) || (m._lastOffset = P.clone(w, m._lastOffset), m.offset = B.toValue(w, m.offset)));
      }

      this.updateShows(s), this.waitingOnCreate = !1;
    } else A(s) && !s.ready && (e = !1);

    return this.itemsToRemove.length = i, e;
  }, n.prototype.updateShows = function (t) {
    for (var e = this.showsUpdated.values, i = e.length, s = 0; s < i; s++) {
      var r = e[s],
          o = this.geometry.get(r.id),
          n = this.attributes.get(o.id.id);
      A(n) || (n = t.getGeometryInstanceAttributes(o.id), this.attributes.set(o.id.id, n));
      var a = r.entity.isShowing;
      a !== (1 === n.show[0]) && (n.show = S.toValue(a, n.show), o.attributes.show.value[0] = n.show[0]);
    }

    this.showsUpdated.removeAll();
  }, n.prototype.contains = function (t) {
    return this.updaters.contains(t.id);
  }, n.prototype.getBoundingSphere = function (t, e) {
    var i = this.primitive;
    if (!i.ready) return l.PENDING;
    var s = i.getGeometryInstanceAttributes(t.entity);
    return !A(s) || !A(s.boundingSphere) || A(s.show) && 0 === s.show[0] ? l.FAILED : (s.boundingSphere.clone(e), l.DONE);
  }, n.prototype.removeAllPrimitives = function () {
    var t = this.primitives,
        e = this.primitive;
    A(e) && (t.remove(e), this.primitive = void 0, this.geometry.removeAll(), this.updaters.removeAll());
    var i = this.oldPrimitive;
    A(i) && (t.remove(i), this.oldPrimitive = void 0);
  }, t.prototype.add = function (t, e) {
    var i,
        s,
        r = e.createOutlineGeometryInstance(t),
        o = this._scene.clampLineWidth(e.outlineWidth);

    255 === r.attributes.color.value[3] ? (s = (i = this._solidBatches).get(o), A(s) || (s = new n(this._primitives, !1, o, this._shadows), i.set(o, s))) : (s = (i = this._translucentBatches).get(o), A(s) || (s = new n(this._primitives, !0, o, this._shadows), i.set(o, s))), s.add(e, r);
  }, t.prototype.remove = function (t) {
    for (var e = this._solidBatches.values, i = e.length, s = 0; s < i; s++) {
      if (e[s].remove(t)) return;
    }

    var r = this._translucentBatches.values,
        o = r.length;

    for (s = 0; s < o; s++) {
      if (r[s].remove(t)) return;
    }
  }, t.prototype.update = function (t) {
    var e,
        i,
        s,
        r,
        o,
        n = this._solidBatches.values,
        a = n.length,
        h = this._translucentBatches.values,
        l = h.length,
        u = !0,
        d = !1;

    do {
      for (d = !1, i = 0; i < a; i++) {
        u = (r = n[i]).update(t);
        var v = (o = r.itemsToRemove).length;
        if (0 < v) for (d = !0, e = 0; e < v; e++) {
          s = o[e], r.remove(s), this.add(t, s);
        }
      }

      for (i = 0; i < l; i++) {
        u = (r = h[i]).update(t);
        var c = (o = r.itemsToRemove).length;
        if (0 < c) for (d = !0, e = 0; e < c; e++) {
          s = o[e], r.remove(s), this.add(t, s);
        }
      }
    } while (d);

    return u;
  }, t.prototype.getBoundingSphere = function (t, e) {
    for (var i = this._solidBatches.values, s = i.length, r = 0; r < s; r++) {
      var o = i[r];
      if (o.contains(t)) return o.getBoundingSphere(t, e);
    }

    var n = this._translucentBatches.values,
        a = n.length;

    for (r = 0; r < a; r++) {
      var h = n[r];
      if (h.contains(t)) return h.getBoundingSphere(t, e);
    }

    return l.FAILED;
  }, t.prototype.removeAllPrimitives = function () {
    for (var t = this._solidBatches.values, e = t.length, i = 0; i < e; i++) {
      t[i].removeAllPrimitives();
    }

    var s = this._translucentBatches.values,
        r = s.length;

    for (i = 0; i < r; i++) {
      s[i].removeAllPrimitives();
    }
  }, t;
});