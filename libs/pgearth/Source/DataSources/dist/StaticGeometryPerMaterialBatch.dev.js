"use strict";

define(["../Core/AssociativeArray", "../Core/Cartesian3", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/defined", "../Core/DistanceDisplayCondition", "../Core/DistanceDisplayConditionGeometryInstanceAttribute", "../Core/OffsetGeometryInstanceAttribute", "../Core/ShowGeometryInstanceAttribute", "../Scene/Primitive", "./BoundingSphereState", "./ColorMaterialProperty", "./MaterialProperty", "./Property"], function (n, C, F, M, b, A, _, D, S, I, o, T, V, O) {
  "use strict";

  var G = new A(),
      E = new A(),
      q = C.ZERO,
      U = new C();

  function h(t, e, i, r, a, s, o) {
    this.primitives = t, this.appearanceType = e, this.materialProperty = i, this.depthFailAppearanceType = r, this.depthFailMaterialProperty = a, this.closed = s, this.shadows = o, this.updaters = new n(), this.createPrimitive = !0, this.primitive = void 0, this.oldPrimitive = void 0, this.geometry = new n(), this.material = void 0, this.depthFailMaterial = void 0, this.updatersWithAttributes = new n(), this.attributes = new n(), this.invalidated = !1, this.removeMaterialSubscription = i.definitionChanged.addEventListener(h.prototype.onMaterialChanged, this), this.subscriptions = new n(), this.showsUpdated = new n();
  }

  h.prototype.onMaterialChanged = function () {
    this.invalidated = !0;
  }, h.prototype.isMaterial = function (t) {
    var e = this.materialProperty,
        i = t.fillMaterialProperty,
        r = this.depthFailMaterialProperty,
        a = t.depthFailMaterialProperty;
    if (i === e && a === r) return !0;
    var s = b(e) && e.equals(i);
    return s = (!b(r) && !b(a) || b(r) && r.equals(a)) && s;
  }, h.prototype.add = function (t, a) {
    var s,
        e = a.id;
    this.updaters.set(e, a), this.geometry.set(e, a.createFillGeometryInstance(t)), a.hasConstantFill && a.fillMaterialProperty.isConstant && O.isConstant(a.distanceDisplayConditionProperty) && O.isConstant(a.terrainOffsetProperty) ? (s = this).subscriptions.set(e, a.entity.definitionChanged.addEventListener(function (t, e, i, r) {
      "isShowing" === e && s.showsUpdated.set(a.id, a);
    })) : this.updatersWithAttributes.set(e, a), this.createPrimitive = !0;
  }, h.prototype.remove = function (t) {
    var e = t.id;

    if (this.createPrimitive = this.geometry.remove(e) || this.createPrimitive, this.updaters.remove(e)) {
      this.updatersWithAttributes.remove(e);
      var i = this.subscriptions.get(e);
      return b(i) && (i(), this.subscriptions.remove(e), this.showsUpdated.remove(e)), !0;
    }

    return !1;
  };
  var W = new F();

  function t(t, e, i, r, a) {
    this._items = [], this._primitives = t, this._appearanceType = e, this._depthFailAppearanceType = i, this._closed = r, this._shadows = a;
  }

  return h.prototype.update = function (t) {
    var e,
        i,
        r = !0,
        a = this.primitive,
        s = this.primitives,
        o = this.geometry.values;
    if (this.createPrimitive) 0 < o.length ? (b(a) && (b(this.oldPrimitive) ? s.remove(a) : this.oldPrimitive = a), this.material = V.getValue(t, this.materialProperty, this.material), b(this.depthFailMaterialProperty) && (this.depthFailMaterial = V.getValue(t, this.depthFailMaterialProperty, this.depthFailMaterial), e = new this.depthFailAppearanceType({
      material: this.depthFailMaterial,
      translucent: this.depthFailMaterial.isTranslucent(),
      closed: this.closed
    })), a = new I({
      show: !1,
      asynchronous: !0,
      geometryInstances: o,
      appearance: new this.appearanceType({
        material: this.material,
        translucent: this.material.isTranslucent(),
        closed: this.closed
      }),
      depthFailAppearance: e,
      shadows: this.shadows
    }), s.add(a), r = !1) : (b(a) && (s.remove(a), a = void 0), i = this.oldPrimitive, b(i) && (s.remove(i), this.oldPrimitive = void 0)), this.attributes.removeAll(), this.primitive = a, this.createPrimitive = !1;else if (b(a) && a.ready) {
      a.show = !0, b(this.oldPrimitive) && (s.remove(this.oldPrimitive), this.oldPrimitive = void 0), this.material = V.getValue(t, this.materialProperty, this.material), this.primitive.appearance.material = this.material, !b(this.depthFailAppearanceType) || this.depthFailMaterialProperty instanceof T || (this.depthFailMaterial = V.getValue(t, this.depthFailMaterialProperty, this.depthFailMaterial), this.primitive.depthFailAppearance.material = this.depthFailMaterial);

      for (var n = this.updatersWithAttributes.values, h = n.length, l = 0; l < h; l++) {
        var p,
            d,
            u = n[l],
            v = u.entity,
            c = this.geometry.get(u.id),
            y = this.attributes.get(c.id.id);
        b(y) || (y = a.getGeometryInstanceAttributes(c.id), this.attributes.set(c.id.id, y)), b(this.depthFailAppearanceType) && this.depthFailMaterialProperty instanceof T && !u.depthFailMaterialProperty.isConstant && (p = u.depthFailMaterialProperty.color, d = O.getValueOrDefault(p, t, F.WHITE, W), F.equals(y._lastDepthFailColor, d) || (y._lastDepthFailColor = F.clone(d, y._lastDepthFailColor), y.depthFailColor = M.toValue(d, y.depthFailColor)));
        var m = v.isShowing && (u.hasConstantFill || u.isFilled(t));
        m !== (1 === y.show[0]) && (y.show = S.toValue(m, y.show));
        var f,
            g = u.distanceDisplayConditionProperty;
        O.isConstant(g) || (f = O.getValueOrDefault(g, t, E, G), A.equals(f, y._lastDistanceDisplayCondition) || (y._lastDistanceDisplayCondition = A.clone(f, y._lastDistanceDisplayCondition), y.distanceDisplayCondition = _.toValue(f, y.distanceDisplayCondition)));
        var P,
            w = u.terrainOffsetProperty;
        O.isConstant(w) || (P = O.getValueOrDefault(w, t, q, U), C.equals(P, y._lastOffset) || (y._lastOffset = C.clone(P, y._lastOffset), y.offset = D.toValue(P, y.offset)));
      }

      this.updateShows(a);
    } else b(a) && !a.ready && (r = !1);
    return r;
  }, h.prototype.updateShows = function (t) {
    for (var e = this.showsUpdated.values, i = e.length, r = 0; r < i; r++) {
      var a = e[r],
          s = a.entity,
          o = this.geometry.get(a.id),
          n = this.attributes.get(o.id.id);
      b(n) || (n = t.getGeometryInstanceAttributes(o.id), this.attributes.set(o.id.id, n));
      var h = s.isShowing;
      h !== (1 === n.show[0]) && (n.show = S.toValue(h, n.show), o.attributes.show.value[0] = n.show[0]);
    }

    this.showsUpdated.removeAll();
  }, h.prototype.contains = function (t) {
    return this.updaters.contains(t.id);
  }, h.prototype.getBoundingSphere = function (t, e) {
    var i = this.primitive;
    if (!i.ready) return o.PENDING;
    var r = i.getGeometryInstanceAttributes(t.entity);
    return !b(r) || !b(r.boundingSphere) || b(r.show) && 0 === r.show[0] ? o.FAILED : (r.boundingSphere.clone(e), o.DONE);
  }, h.prototype.destroy = function () {
    var t = this.primitive,
        e = this.primitives;
    b(t) && e.remove(t);
    var i = this.oldPrimitive;
    b(i) && e.remove(i), this.removeMaterialSubscription();
  }, t.prototype.add = function (t, e) {
    for (var i = this._items, r = i.length, a = 0; a < r; a++) {
      var s = i[a];
      if (s.isMaterial(e)) return void s.add(t, e);
    }

    var o = new h(this._primitives, this._appearanceType, e.fillMaterialProperty, this._depthFailAppearanceType, e.depthFailMaterialProperty, this._closed, this._shadows);
    o.add(t, e), i.push(o);
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

        for (var a = r.updaters.values, s = a.length, o = 0; o < s; o++) {
          this.add(t, a[o]);
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
    for (var i = this._items, r = i.length, a = 0; a < r; a++) {
      var s = i[a];
      if (s.contains(t)) return s.getBoundingSphere(t, e);
    }

    return o.FAILED;
  }, t.prototype.removeAllPrimitives = function () {
    for (var t = this._items, e = t.length, i = 0; i < e; i++) {
      t[i].destroy();
    }

    this._items.length = 0;
  }, t;
});