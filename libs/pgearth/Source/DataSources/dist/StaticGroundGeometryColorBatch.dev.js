"use strict";

define(["../Core/AssociativeArray", "../Core/Color", "../Core/defined", "../Core/DistanceDisplayCondition", "../Core/DistanceDisplayConditionGeometryInstanceAttribute", "../Core/ShowGeometryInstanceAttribute", "../Scene/GroundPrimitive", "./BoundingSphereState", "./Property"], function (o, b, P, D, A, _, I, n, S) {
  "use strict";

  var T = new b(),
      O = new D(),
      G = new D();

  function a(t, i, e, s, r) {
    this.primitives = t, this.zIndex = r, this.classificationType = i, this.color = e, this.key = s, this.createPrimitive = !1, this.waitingOnCreate = !1, this.primitive = void 0, this.oldPrimitive = void 0, this.geometry = new o(), this.updaters = new o(), this.updatersWithAttributes = new o(), this.attributes = new o(), this.subscriptions = new o(), this.showsUpdated = new o(), this.itemsToRemove = [], this.isDirty = !1;
  }

  a.prototype.add = function (r, t) {
    var o,
        i = r.id;
    this.createPrimitive = !0, this.geometry.set(i, t), this.updaters.set(i, r), r.hasConstantFill && r.fillMaterialProperty.isConstant && S.isConstant(r.distanceDisplayConditionProperty) ? (o = this).subscriptions.set(i, r.entity.definitionChanged.addEventListener(function (t, i, e, s) {
      "isShowing" === i && o.showsUpdated.set(r.id, r);
    })) : this.updatersWithAttributes.set(i, r);
  }, a.prototype.remove = function (t) {
    var i = t.id;

    if (this.createPrimitive = this.geometry.remove(i) || this.createPrimitive, this.updaters.remove(i)) {
      this.updatersWithAttributes.remove(i);
      var e = this.subscriptions.get(i);
      return P(e) && (e(), this.subscriptions.remove(i), this.showsUpdated.remove(i)), !0;
    }

    return !1;
  };
  var B = new Array(4);

  function t(t, i) {
    this._batches = new o(), this._primitives = t, this._classificationType = i;
  }

  return a.prototype.update = function (t) {
    var i = !0,
        e = 0,
        s = this.primitive,
        r = this.primitives;

    if (this.createPrimitive) {
      var o,
          n = this.geometry.values;
      0 < n.length ? (P(s) && (P(this.oldPrimitive) ? r.remove(s) : this.oldPrimitive = s), s = new I({
        show: !1,
        asynchronous: !0,
        geometryInstances: n,
        classificationType: this.classificationType
      }), r.add(s, this.zIndex), i = !1) : (P(s) && (r.remove(s), s = void 0), o = this.oldPrimitive, P(o) && (r.remove(o), this.oldPrimitive = void 0)), this.attributes.removeAll(), this.primitive = s, this.createPrimitive = !1, this.waitingOnCreate = !0;
    } else if (P(s) && s.ready) {
      s.show = !0, P(this.oldPrimitive) && (r.remove(this.oldPrimitive), this.oldPrimitive = void 0);

      for (var a = this.updatersWithAttributes.values, h = a.length, l = this.waitingOnCreate, v = 0; v < h; v++) {
        var d,
            u,
            p,
            m,
            c = a[v],
            y = this.geometry.get(c.id),
            g = this.attributes.get(y.id.id);
        P(g) || (g = s.getGeometryInstanceAttributes(y.id), this.attributes.set(y.id.id, g)), c.fillMaterialProperty.isConstant && !l || (d = c.fillMaterialProperty.color, u = S.getValueOrDefault(d, t, b.WHITE, T), b.equals(g._lastColor, u) || (g._lastColor = b.clone(u, g._lastColor), p = this.color, m = u.toBytes(B), p[0] === m[0] && p[1] === m[1] && p[2] === m[2] && p[3] === m[3] || (this.itemsToRemove[e++] = c)));
        var f = c.entity.isShowing && (c.hasConstantFill || c.isFilled(t));
        f !== (1 === g.show[0]) && (g.show = _.toValue(f, g.show));
        var w,
            C = c.distanceDisplayConditionProperty;
        S.isConstant(C) || (w = S.getValueOrDefault(C, t, G, O), D.equals(w, g._lastDistanceDisplayCondition) || (g._lastDistanceDisplayCondition = D.clone(w, g._lastDistanceDisplayCondition), g.distanceDisplayCondition = A.toValue(w, g.distanceDisplayCondition)));
      }

      this.updateShows(s), this.waitingOnCreate = !1;
    } else P(s) && !s.ready && (i = !1);

    return this.itemsToRemove.length = e, i;
  }, a.prototype.updateShows = function (t) {
    for (var i = this.showsUpdated.values, e = i.length, s = 0; s < e; s++) {
      var r = i[s],
          o = this.geometry.get(r.id),
          n = this.attributes.get(o.id.id);
      P(n) || (n = t.getGeometryInstanceAttributes(o.id), this.attributes.set(o.id.id, n));
      var a = r.entity.isShowing;
      a !== (1 === n.show[0]) && (n.show = _.toValue(a, n.show), o.attributes.show.value[0] = n.show[0]);
    }

    this.showsUpdated.removeAll();
  }, a.prototype.contains = function (t) {
    return this.updaters.contains(t.id);
  }, a.prototype.getBoundingSphere = function (t, i) {
    var e = this.primitive;
    if (!e.ready) return n.PENDING;
    var s = e.getBoundingSphere(t.entity);
    return P(s) ? (s.clone(i), n.DONE) : n.FAILED;
  }, a.prototype.removeAllPrimitives = function () {
    var t = this.primitives,
        i = this.primitive;
    P(i) && (t.remove(i), this.primitive = void 0, this.geometry.removeAll(), this.updaters.removeAll());
    var e = this.oldPrimitive;
    P(e) && (t.remove(e), this.oldPrimitive = void 0);
  }, t.prototype.add = function (t, i) {
    var e,
        s = i.createFillGeometryInstance(t),
        r = this._batches,
        o = S.getValueOrDefault(i.zIndex, 0),
        n = new Uint32Array(s.attributes.color.value.buffer)[0] + ":" + o;
    return r.contains(n) ? e = r.get(n) : (e = new a(this._primitives, this._classificationType, s.attributes.color.value, n, o), r.set(n, e)), e.add(i, s), e;
  }, t.prototype.remove = function (t) {
    for (var i = this._batches.values, e = i.length, s = 0; s < e; ++s) {
      if (i[s].remove(t)) return;
    }
  }, t.prototype.update = function (t) {
    for (var i, e = !0, s = this._batches, r = s.values, o = r.length, n = 0; n < o; ++n) {
      e = r[n].update(t) && e;
    }

    for (n = 0; n < o; ++n) {
      for (var a = r[n], h = a.itemsToRemove, l = h.length, v = 0; v < l; v++) {
        i = h[v], a.remove(i);
        var d = this.add(t, i);
        a.isDirty = !0, d.isDirty = !0;
      }
    }

    var u = r.slice(),
        p = u.length;

    for (n = 0; n < p; ++n) {
      var m = u[n];
      m.isDirty && (e = u[n].update(t) && e, m.isDirty = !1), 0 === m.geometry.length && s.remove(m.key);
    }

    return e;
  }, t.prototype.getBoundingSphere = function (t, i) {
    for (var e = this._batches.values, s = e.length, r = 0; r < s; ++r) {
      var o = e[r];
      if (o.contains(t)) return o.getBoundingSphere(t, i);
    }

    return n.FAILED;
  }, t.prototype.removeAllPrimitives = function () {
    for (var t = this._batches.values, i = t.length, e = 0; e < i; ++e) {
      t[e].removeAllPrimitives();
    }
  }, t;
});