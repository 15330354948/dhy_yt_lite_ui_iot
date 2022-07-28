"use strict";

define(["../Core/AssociativeArray", "../Core/Cartesian3", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/defined", "../Core/DistanceDisplayCondition", "../Core/DistanceDisplayConditionGeometryInstanceAttribute", "../Core/OffsetGeometryInstanceAttribute", "../Core/ShowGeometryInstanceAttribute", "../Scene/Primitive", "./BoundingSphereState", "./ColorMaterialProperty", "./MaterialProperty", "./Property"], function (h, I, M, b, A, D, S, T, O, V, o, E, G, W) {
  "use strict";

  var q = new M(),
      L = new D(),
      R = new D(),
      U = I.ZERO,
      B = new I();

  function l(t, e, i, s, r, a, o) {
    var n;
    this.translucent = e, this.appearanceType = i, this.depthFailAppearanceType = s, this.depthFailMaterialProperty = r, this.depthFailMaterial = void 0, this.closed = a, this.shadows = o, this.primitives = t, this.createPrimitive = !1, this.waitingOnCreate = !1, this.primitive = void 0, this.oldPrimitive = void 0, this.geometry = new h(), this.updaters = new h(), this.updatersWithAttributes = new h(), this.attributes = new h(), this.subscriptions = new h(), this.showsUpdated = new h(), this.itemsToRemove = [], this.invalidated = !1, A(r) && (n = r.definitionChanged.addEventListener(l.prototype.onMaterialChanged, this)), this.removeMaterialSubscription = n;
  }

  function t(t, e, i, s, r) {
    this._solidItems = [], this._translucentItems = [], this._primitives = t, this._appearanceType = e, this._depthFailAppearanceType = i, this._closed = s, this._shadows = r;
  }

  function e(t, e) {
    for (var i = t.length - 1; 0 <= i; i--) {
      var s = t[i];
      if (s.remove(e)) return 0 === s.updaters.length && (t.splice(i, 1), s.destroy()), 1;
    }
  }

  function r(t, e, i) {
    for (var s = !1, r = e.length, a = 0; a < r; ++a) {
      var o = e[a],
          n = o.itemsToRemove,
          h = n.length;
      if (0 < h) for (a = 0; a < h; a++) {
        var l = n[a];
        o.remove(l), t.add(i, l), s = !0;
      }
    }

    return s;
  }

  function a(t, e, i, s) {
    for (var r = e.length, a = r - 1; 0 <= a; a--) {
      var o = e[a];

      if (o.invalidated) {
        e.splice(a, 1);

        for (var n = o.updaters.values, h = n.length, l = 0; l < h; l++) {
          t.add(i, n[l]);
        }

        o.destroy();
      }
    }

    for (r = e.length, a = 0; a < r; ++a) {
      s = e[a].update(i) && s;
    }

    return s;
  }

  function s(t, e, i) {
    for (var s = t.length, r = 0; r < s; r++) {
      var a = t[r];
      if (a.contains(e)) return a.getBoundingSphere(e, i);
    }

    return o.FAILED;
  }

  function i(t) {
    for (var e = t.length, i = 0; i < e; i++) {
      t[i].destroy();
    }

    t.length = 0;
  }

  return l.prototype.onMaterialChanged = function () {
    this.invalidated = !0;
  }, l.prototype.isMaterial = function (t) {
    var e = this.depthFailMaterialProperty,
        i = t.depthFailMaterialProperty;
    return i === e || !!A(e) && e.equals(i);
  }, l.prototype.add = function (r, t) {
    var a,
        e = r.id;
    this.createPrimitive = !0, this.geometry.set(e, t), this.updaters.set(e, r), r.hasConstantFill && r.fillMaterialProperty.isConstant && W.isConstant(r.distanceDisplayConditionProperty) && W.isConstant(r.terrainOffsetProperty) ? (a = this).subscriptions.set(e, r.entity.definitionChanged.addEventListener(function (t, e, i, s) {
      "isShowing" === e && a.showsUpdated.set(r.id, r);
    })) : this.updatersWithAttributes.set(e, r);
  }, l.prototype.remove = function (t) {
    var e = t.id;

    if (this.createPrimitive = this.geometry.remove(e) || this.createPrimitive, this.updaters.remove(e)) {
      this.updatersWithAttributes.remove(e);
      var i = this.subscriptions.get(e);
      return A(i) && (i(), this.subscriptions.remove(e), this.showsUpdated.remove(e)), !0;
    }

    return !1;
  }, l.prototype.update = function (t) {
    var e = !0,
        i = 0,
        s = this.primitive,
        r = this.primitives;

    if (this.createPrimitive) {
      var a,
          o,
          n = this.geometry.values;
      0 < n.length ? (A(s) && (A(this.oldPrimitive) ? r.remove(s) : this.oldPrimitive = s), A(this.depthFailAppearanceType) && (A(this.depthFailMaterialProperty) && (this.depthFailMaterial = G.getValue(t, this.depthFailMaterialProperty, this.depthFailMaterial)), a = new this.depthFailAppearanceType({
        material: this.depthFailMaterial,
        translucent: this.translucent,
        closed: this.closed
      })), s = new V({
        show: !1,
        asynchronous: !0,
        geometryInstances: n,
        appearance: new this.appearanceType({
          translucent: this.translucent,
          closed: this.closed
        }),
        depthFailAppearance: a,
        shadows: this.shadows
      }), r.add(s), e = !1) : (A(s) && (r.remove(s), s = void 0), o = this.oldPrimitive, A(o) && (r.remove(o), this.oldPrimitive = void 0)), this.attributes.removeAll(), this.primitive = s, this.createPrimitive = !1, this.waitingOnCreate = !0;
    } else if (A(s) && s.ready) {
      s.show = !0, A(this.oldPrimitive) && (r.remove(this.oldPrimitive), this.oldPrimitive = void 0), !A(this.depthFailAppearanceType) || this.depthFailMaterialProperty instanceof E || (this.depthFailMaterial = G.getValue(t, this.depthFailMaterialProperty, this.depthFailMaterial), this.primitive.depthFailAppearance.material = this.depthFailMaterial);

      for (var h = this.updatersWithAttributes.values, l = h.length, p = this.waitingOnCreate, d = 0; d < l; d++) {
        var u,
            c,
            v,
            m,
            y = h[d],
            f = this.geometry.get(y.id),
            g = this.attributes.get(f.id.id);
        A(g) || (g = s.getGeometryInstanceAttributes(f.id), this.attributes.set(f.id.id, g)), y.fillMaterialProperty.isConstant && !p || (u = y.fillMaterialProperty.color, c = W.getValueOrDefault(u, t, M.WHITE, q), M.equals(g._lastColor, c) || (g._lastColor = M.clone(c, g._lastColor), g.color = b.toValue(c, g.color), (this.translucent && 255 === g.color[3] || !this.translucent && 255 !== g.color[3]) && (this.itemsToRemove[i++] = y))), A(this.depthFailAppearanceType) && y.depthFailMaterialProperty instanceof E && (!y.depthFailMaterialProperty.isConstant || p) && (v = y.depthFailMaterialProperty.color, m = W.getValueOrDefault(v, t, M.WHITE, q), M.equals(g._lastDepthFailColor, m) || (g._lastDepthFailColor = M.clone(m, g._lastDepthFailColor), g.depthFailColor = b.toValue(m, g.depthFailColor)));
        var C = y.entity.isShowing && (y.hasConstantFill || y.isFilled(t));
        C !== (1 === g.show[0]) && (g.show = O.toValue(C, g.show));
        var w,
            F = y.distanceDisplayConditionProperty;
        W.isConstant(F) || (w = W.getValueOrDefault(F, t, R, L), D.equals(w, g._lastDistanceDisplayCondition) || (g._lastDistanceDisplayCondition = D.clone(w, g._lastDistanceDisplayCondition), g.distanceDisplayCondition = S.toValue(w, g.distanceDisplayCondition)));
        var P,
            _ = y.terrainOffsetProperty;
        W.isConstant(_) || (P = W.getValueOrDefault(_, t, U, B), I.equals(P, g._lastOffset) || (g._lastOffset = I.clone(P, g._lastOffset), g.offset = T.toValue(P, g.offset)));
      }

      this.updateShows(s), this.waitingOnCreate = !1;
    } else A(s) && !s.ready && (e = !1);

    return this.itemsToRemove.length = i, e;
  }, l.prototype.updateShows = function (t) {
    for (var e = this.showsUpdated.values, i = e.length, s = 0; s < i; s++) {
      var r = e[s],
          a = this.geometry.get(r.id),
          o = this.attributes.get(a.id.id);
      A(o) || (o = t.getGeometryInstanceAttributes(a.id), this.attributes.set(a.id.id, o));
      var n = r.entity.isShowing;
      n !== (1 === o.show[0]) && (o.show = O.toValue(n, o.show), a.attributes.show.value[0] = o.show[0]);
    }

    this.showsUpdated.removeAll();
  }, l.prototype.contains = function (t) {
    return this.updaters.contains(t.id);
  }, l.prototype.getBoundingSphere = function (t, e) {
    var i = this.primitive;
    if (!i.ready) return o.PENDING;
    var s = i.getGeometryInstanceAttributes(t.entity);
    return !A(s) || !A(s.boundingSphere) || A(s.show) && 0 === s.show[0] ? o.FAILED : (s.boundingSphere.clone(e), o.DONE);
  }, l.prototype.destroy = function () {
    var t = this.primitive,
        e = this.primitives;
    A(t) && e.remove(t);
    var i = this.oldPrimitive;
    A(i) && e.remove(i), A(this.removeMaterialSubscription) && this.removeMaterialSubscription();
  }, t.prototype.add = function (t, e) {
    for (var i, s = e.createFillGeometryInstance(t), r = 255 === s.attributes.color.value[3] ? (i = this._solidItems, !1) : (i = this._translucentItems, !0), a = i.length, o = 0; o < a; o++) {
      var n = i[o];
      if (n.isMaterial(e)) return void n.add(e, s);
    }

    var h = new l(this._primitives, r, this._appearanceType, this._depthFailAppearanceType, e.depthFailMaterialProperty, this._closed, this._shadows);
    h.add(e, s), i.push(h);
  }, t.prototype.remove = function (t) {
    e(this._solidItems, t) || e(this._translucentItems, t);
  }, t.prototype.update = function (t) {
    var e = a(this, this._solidItems, t, !0),
        e = a(this, this._translucentItems, t, e) && e,
        i = r(this, this._solidItems, t),
        s = r(this, this._translucentItems, t);
    return (i || s) && (e = a(this, this._solidItems, t, e) && e, e = a(this, this._translucentItems, t, e) && e), e;
  }, t.prototype.getBoundingSphere = function (t, e) {
    var i = s(this._solidItems, t, e);
    return i === o.FAILED ? s(this._translucentItems, t, e) : i;
  }, t.prototype.removeAllPrimitives = function () {
    i(this._solidItems), i(this._translucentItems);
  }, t;
});