"use strict";

define(["../Core/defaultValue", "../Core/AssociativeArray", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/defined", "../Core/DistanceDisplayCondition", "../Core/DistanceDisplayConditionGeometryInstanceAttribute", "../Core/ShowGeometryInstanceAttribute", "../Scene/GroundPolylinePrimitive", "../Scene/PolylineColorAppearance", "../Scene/PolylineMaterialAppearance", "./BoundingSphereState", "./ColorMaterialProperty", "./MaterialProperty", "./Property"], function (r, a, g, P, w, C, b, D, _, n, A, h, l, S, I) {
  "use strict";

  var G = new g(),
      M = new C(),
      T = new C();

  function d(t, e, i, r, s) {
    var o = i instanceof l ? n : A;
    this.orderedGroundPrimitives = t, this.classificationType = e, this.appearanceType = o, this.materialProperty = i, this.updaters = new a(), this.createPrimitive = !0, this.primitive = void 0, this.oldPrimitive = void 0, this.geometry = new a(), this.material = void 0, this.updatersWithAttributes = new a(), this.attributes = new a(), this.invalidated = !1, this.removeMaterialSubscription = i.definitionChanged.addEventListener(d.prototype.onMaterialChanged, this), this.subscriptions = new a(), this.showsUpdated = new a(), this.zIndex = r, this._asynchronous = s;
  }

  function t(t, e, i) {
    this._items = [], this._orderedGroundPrimitives = t, this._classificationType = e, this._asynchronous = r(i, !0);
  }

  return d.prototype.onMaterialChanged = function () {
    this.invalidated = !0;
  }, d.prototype.isMaterial = function (t) {
    var e = this.materialProperty,
        i = t.fillMaterialProperty;
    return i === e || i instanceof l && e instanceof l || w(e) && e.equals(i);
  }, d.prototype.add = function (t, s, e) {
    var o,
        i = s.id;
    this.updaters.set(i, s), this.geometry.set(i, e), s.hasConstantFill && s.fillMaterialProperty.isConstant && I.isConstant(s.distanceDisplayConditionProperty) ? (o = this).subscriptions.set(i, s.entity.definitionChanged.addEventListener(function (t, e, i, r) {
      "isShowing" === e && o.showsUpdated.set(s.id, s);
    })) : this.updatersWithAttributes.set(i, s), this.createPrimitive = !0;
  }, d.prototype.remove = function (t) {
    var e = t.id;

    if (this.createPrimitive = this.geometry.remove(e) || this.createPrimitive, this.updaters.remove(e)) {
      this.updatersWithAttributes.remove(e);
      var i = this.subscriptions.get(e);
      return w(i) && (i(), this.subscriptions.remove(e)), !0;
    }

    return !1;
  }, d.prototype.update = function (t) {
    var e,
        i = !0,
        r = this.primitive,
        s = this.orderedGroundPrimitives,
        o = this.geometry.values;
    if (this.createPrimitive) 0 < o.length ? (w(r) && (w(this.oldPrimitive) ? s.remove(r) : this.oldPrimitive = r), r = new _({
      show: !1,
      asynchronous: this._asynchronous,
      geometryInstances: o,
      appearance: new this.appearanceType(),
      classificationType: this.classificationType
    }), this.appearanceType === A && (this.material = S.getValue(t, this.materialProperty, this.material), r.appearance.material = this.material), s.add(r, this.zIndex), i = !1) : (w(r) && (s.remove(r), r = void 0), e = this.oldPrimitive, w(e) && (s.remove(e), this.oldPrimitive = void 0)), this.attributes.removeAll(), this.primitive = r, this.createPrimitive = !1;else if (w(r) && r.ready) {
      r.show = !0, w(this.oldPrimitive) && (s.remove(this.oldPrimitive), this.oldPrimitive = void 0), this.appearanceType === A && (this.material = S.getValue(t, this.materialProperty, this.material), this.primitive.appearance.material = this.material);

      for (var a = this.updatersWithAttributes.values, n = a.length, h = 0; h < n; h++) {
        var l,
            d,
            p = a[h],
            u = p.entity,
            v = this.geometry.get(p.id),
            c = this.attributes.get(v.id.id);
        w(c) || (c = r.getGeometryInstanceAttributes(v.id), this.attributes.set(v.id.id, c)), p.fillMaterialProperty.isConstant || (l = p.fillMaterialProperty.color, d = I.getValueOrDefault(l, t, g.WHITE, G), g.equals(c._lastColor, d) || (c._lastColor = g.clone(d, c._lastColor), c.color = P.toValue(d, c.color)));
        var y = u.isShowing && (p.hasConstantFill || p.isFilled(t));
        y !== (1 === c.show[0]) && (c.show = D.toValue(y, c.show));
        var m,
            f = p.distanceDisplayConditionProperty;
        I.isConstant(f) || (m = I.getValueOrDefault(f, t, T, M), C.equals(m, c._lastDistanceDisplayCondition) || (c._lastDistanceDisplayCondition = C.clone(m, c._lastDistanceDisplayCondition), c.distanceDisplayCondition = b.toValue(m, c.distanceDisplayCondition)));
      }

      this.updateShows(r);
    } else w(r) && !r.ready && (i = !1);
    return i;
  }, d.prototype.updateShows = function (t) {
    for (var e = this.showsUpdated.values, i = e.length, r = 0; r < i; r++) {
      var s = e[r],
          o = s.entity,
          a = this.geometry.get(s.id),
          n = this.attributes.get(a.id.id);
      w(n) || (n = t.getGeometryInstanceAttributes(a.id), this.attributes.set(a.id.id, n));
      var h = o.isShowing;
      h !== (1 === n.show[0]) && (n.show = D.toValue(h, n.show), a.attributes.show.value[0] = n.show[0]);
    }

    this.showsUpdated.removeAll();
  }, d.prototype.contains = function (t) {
    return this.updaters.contains(t.id);
  }, d.prototype.getBoundingSphere = function (t, e) {
    var i = this.primitive;
    if (!i.ready) return h.PENDING;
    var r = i.getGeometryInstanceAttributes(t.entity);
    return !w(r) || !w(r.boundingSphere) || w(r.show) && 0 === r.show[0] ? h.FAILED : (r.boundingSphere.clone(e), h.DONE);
  }, d.prototype.destroy = function () {
    var t = this.primitive,
        e = this.orderedGroundPrimitives;
    w(t) && e.remove(t);
    var i = this.oldPrimitive;
    w(i) && e.remove(i), this.removeMaterialSubscription();
  }, t.prototype.add = function (t, e) {
    for (var i = this._items, r = i.length, s = e.createFillGeometryInstance(t), o = I.getValueOrDefault(e.zIndex, 0), a = 0; a < r; ++a) {
      var n = i[a];
      if (n.isMaterial(e) && n.zIndex === o) return void n.add(t, e, s);
    }

    var h = new d(this._orderedGroundPrimitives, this._classificationType, e.fillMaterialProperty, o, this._asynchronous);
    h.add(t, e, s), i.push(h);
  }, t.prototype.remove = function (t) {
    for (var e = this._items, i = e.length - 1; 0 <= i; i--) {
      var r = e[i];

      if (r.remove(t)) {
        0 === r.updaters.length && (e.splice(i, 1), r.destroy());
        break;
      }
    }
  }, t.prototype.update = function (t) {
    for (var e = this._items, i = e.length - 1; 0 <= i; i--) {
      var r = e[i];

      if (r.invalidated) {
        e.splice(i, 1);

        for (var s = r.updaters.values, o = s.length, a = 0; a < o; a++) {
          this.add(t, s[a]);
        }

        r.destroy();
      }
    }

    var n = !0;

    for (i = 0; i < e.length; i++) {
      n = e[i].update(t) && n;
    }

    return n;
  }, t.prototype.getBoundingSphere = function (t, e) {
    for (var i = this._items, r = i.length, s = 0; s < r; s++) {
      var o = i[s];
      if (o.contains(t)) return o.getBoundingSphere(t, e);
    }

    return h.FAILED;
  }, t.prototype.removeAllPrimitives = function () {
    for (var t = this._items, e = t.length, i = 0; i < e; i++) {
      t[i].destroy();
    }

    this._items.length = 0;
  }, t;
});