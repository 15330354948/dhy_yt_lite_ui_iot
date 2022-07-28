"use strict";

define(["../Core/AssociativeArray", "../Core/ColorGeometryInstanceAttribute", "../Core/defined", "../Core/DistanceDisplayCondition", "../Core/DistanceDisplayConditionGeometryInstanceAttribute", "../Core/ShowGeometryInstanceAttribute", "../Core/RectangleCollisionChecker", "../Scene/ClassificationType", "../Scene/GroundPrimitive", "../Scene/ShadowVolumeAppearance", "./BoundingSphereState", "./ColorMaterialProperty", "./MaterialProperty", "./Property"], function (a, t, y, g, f, C, n, e, w, p, h, r, P, b) {
  "use strict";

  var S = new g(),
      D = new g();

  function d(t, e, i, r, s, o) {
    this.primitives = t, this.classificationType = e, this.appearanceType = i, this.materialProperty = r, this.updaters = new a(), this.createPrimitive = !0, this.primitive = void 0, this.oldPrimitive = void 0, this.geometry = new a(), this.material = void 0, this.updatersWithAttributes = new a(), this.attributes = new a(), this.invalidated = !1, this.removeMaterialSubscription = r.definitionChanged.addEventListener(d.prototype.onMaterialChanged, this), this.subscriptions = new a(), this.showsUpdated = new a(), this.usingSphericalTextureCoordinates = s, this.zIndex = o, this.rectangleCollisionCheck = new n();
  }

  function i(t, e, i) {
    this._items = [], this._primitives = t, this._classificationType = e, this._appearanceType = i;
  }

  return d.prototype.onMaterialChanged = function () {
    this.invalidated = !0;
  }, d.prototype.overlapping = function (t) {
    return this.rectangleCollisionCheck.collides(t);
  }, d.prototype.isMaterial = function (t) {
    var e = this.materialProperty,
        i = t.fillMaterialProperty;
    return i === e || i instanceof r && e instanceof r || y(e) && e.equals(i);
  }, d.prototype.add = function (t, s, e) {
    var o,
        i = s.id;
    this.updaters.set(i, s), this.geometry.set(i, e), this.rectangleCollisionCheck.insert(i, e.geometry.rectangle), s.hasConstantFill && s.fillMaterialProperty.isConstant && b.isConstant(s.distanceDisplayConditionProperty) ? (o = this).subscriptions.set(i, s.entity.definitionChanged.addEventListener(function (t, e, i, r) {
      "isShowing" === e && o.showsUpdated.set(s.id, s);
    })) : this.updatersWithAttributes.set(i, s), this.createPrimitive = !0;
  }, d.prototype.remove = function (t) {
    var e = t.id,
        i = this.geometry.get(e);

    if (this.createPrimitive = this.geometry.remove(e) || this.createPrimitive, this.updaters.remove(e)) {
      this.rectangleCollisionCheck.remove(e, i.geometry.rectangle), this.updatersWithAttributes.remove(e);
      var r = this.subscriptions.get(e);
      return y(r) && (r(), this.subscriptions.remove(e)), !0;
    }

    return !1;
  }, d.prototype.update = function (t) {
    var e,
        i = !0,
        r = this.primitive,
        s = this.primitives,
        o = this.geometry.values;
    if (this.createPrimitive) 0 < o.length ? (y(r) && (y(this.oldPrimitive) ? s.remove(r) : this.oldPrimitive = r), this.material = P.getValue(t, this.materialProperty, this.material), r = new w({
      show: !1,
      asynchronous: !0,
      geometryInstances: o,
      appearance: new this.appearanceType({
        material: this.material
      }),
      classificationType: this.classificationType
    }), s.add(r, this.zIndex), i = !1) : (y(r) && (s.remove(r), r = void 0), e = this.oldPrimitive, y(e) && (s.remove(e), this.oldPrimitive = void 0)), this.attributes.removeAll(), this.primitive = r, this.createPrimitive = !1;else if (y(r) && r.ready) {
      r.show = !0, y(this.oldPrimitive) && (s.remove(this.oldPrimitive), this.oldPrimitive = void 0), this.material = P.getValue(t, this.materialProperty, this.material), this.primitive.appearance.material = this.material;

      for (var a = this.updatersWithAttributes.values, n = a.length, h = 0; h < n; h++) {
        var l = a[h],
            p = l.entity,
            d = this.geometry.get(l.id),
            u = this.attributes.get(d.id.id);
        y(u) || (u = r.getGeometryInstanceAttributes(d.id), this.attributes.set(d.id.id, u));
        var c = p.isShowing && (l.hasConstantFill || l.isFilled(t));
        c !== (1 === u.show[0]) && (u.show = C.toValue(c, u.show));
        var v,
            m = l.distanceDisplayConditionProperty;
        b.isConstant(m) || (v = b.getValueOrDefault(m, t, D, S), g.equals(v, u._lastDistanceDisplayCondition) || (u._lastDistanceDisplayCondition = g.clone(v, u._lastDistanceDisplayCondition), u.distanceDisplayCondition = f.toValue(v, u.distanceDisplayCondition)));
      }

      this.updateShows(r);
    } else y(r) && !r.ready && (i = !1);
    return i;
  }, d.prototype.updateShows = function (t) {
    for (var e = this.showsUpdated.values, i = e.length, r = 0; r < i; r++) {
      var s = e[r],
          o = s.entity,
          a = this.geometry.get(s.id),
          n = this.attributes.get(a.id.id);
      y(n) || (n = t.getGeometryInstanceAttributes(a.id), this.attributes.set(a.id.id, n));
      var h = o.isShowing;
      h !== (1 === n.show[0]) && (n.show = C.toValue(h, n.show), a.attributes.show.value[0] = n.show[0]);
    }

    this.showsUpdated.removeAll();
  }, d.prototype.contains = function (t) {
    return this.updaters.contains(t.id);
  }, d.prototype.getBoundingSphere = function (t, e) {
    var i = this.primitive;
    if (!i.ready) return h.PENDING;
    var r = i.getGeometryInstanceAttributes(t.entity);
    return !y(r) || !y(r.boundingSphere) || y(r.show) && 0 === r.show[0] ? h.FAILED : (r.boundingSphere.clone(e), h.DONE);
  }, d.prototype.destroy = function () {
    var t = this.primitive,
        e = this.primitives;
    y(t) && e.remove(t);
    var i = this.oldPrimitive;
    y(i) && e.remove(i), this.removeMaterialSubscription();
  }, i.prototype.add = function (t, e) {
    for (var i = this._items, r = i.length, s = e.createFillGeometryInstance(t), o = p.shouldUseSphericalCoordinates(s.geometry.rectangle), a = b.getValueOrDefault(e.zIndex, 0), n = 0; n < r; ++n) {
      var h = i[n];
      if (h.isMaterial(e) && h.usingSphericalTextureCoordinates === o && h.zIndex === a && !h.overlapping(s.geometry.rectangle)) return void h.add(t, e, s);
    }

    var l = new d(this._primitives, this._classificationType, this._appearanceType, e.fillMaterialProperty, o, a);
    l.add(t, e, s), i.push(l);
  }, i.prototype.remove = function (t) {
    for (var e = this._items, i = e.length - 1; 0 <= i; i--) {
      var r = e[i];

      if (r.remove(t)) {
        0 === r.updaters.length && (e.splice(i, 1), r.destroy());
        break;
      }
    }
  }, i.prototype.update = function (t) {
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
  }, i.prototype.getBoundingSphere = function (t, e) {
    for (var i = this._items, r = i.length, s = 0; s < r; s++) {
      var o = i[s];
      if (o.contains(t)) return o.getBoundingSphere(t, e);
    }

    return h.FAILED;
  }, i.prototype.removeAllPrimitives = function () {
    for (var t = this._items, e = t.length, i = 0; i < e; i++) {
      t[i].destroy();
    }

    this._items.length = 0;
  }, i;
});