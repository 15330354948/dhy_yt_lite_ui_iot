"use strict";

define(["../Core/AssociativeArray", "../Core/BoundingSphere", "../Core/Check", "../Core/defaultValue", "../Core/defined", "../Core/destroyObject", "../Scene/ClassificationType", "../Scene/PolylineColorAppearance", "../Scene/PolylineMaterialAppearance", "../Scene/ShadowMode", "./BoundingSphereState", "./ColorMaterialProperty", "./DynamicGeometryBatch", "./PolylineGeometryUpdater", "./StaticGeometryColorBatch", "./StaticGeometryPerMaterialBatch", "./StaticGroundPolylinePerMaterialBatch"], function (a, d, p, h, c, s, l, _, u, v, y, g, m, f, B, C, b) {
  "use strict";

  var O = [];

  function S(e, t) {
    for (var i = e._batches, r = i.length, s = 0; s < r; s++) {
      i[s].remove(t);
    }
  }

  function w(e, t, i) {
    var r, s, o, n;
    i.isDynamic ? e._dynamicBatch.add(t, i) : i.clampToGround && i.fillEnabled ? (r = i.classificationTypeProperty.getValue(t), e._groundBatches[r].add(t, i)) : (i.fillEnabled && (s = i.shadowsProperty.getValue(t)), o = 0, c(i.depthFailMaterialProperty) && (o = i.depthFailMaterialProperty instanceof g ? 1 : 2), c(s) && (n = s + o * v.NUMBER_OF_SHADOW_MODES), i.fillEnabled && (i.fillMaterialProperty instanceof g ? e._colorBatches[n].add(t, i) : e._materialBatches[n].add(t, i)));
  }

  function A(e, t, i, r) {
    var s;
    p.defined("scene", e), p.defined("entityCollection", t), r = h(r, e.groundPrimitives), i = h(i, e.primitives), this._scene = e, this._primitives = i, this._entityCollection = void 0, this._addedObjects = new a(), this._removedObjects = new a(), this._changedObjects = new a();
    var o = v.NUMBER_OF_SHADOW_MODES;

    for (this._colorBatches = new Array(3 * o), this._materialBatches = new Array(3 * o), s = 0; s < o; ++s) {
      this._colorBatches[s] = new B(i, _, void 0, !1, s), this._materialBatches[s] = new C(i, u, void 0, !1, s), this._colorBatches[s + o] = new B(i, _, _, !1, s), this._materialBatches[s + o] = new C(i, u, _, !1, s), this._colorBatches[s + 2 * o] = new B(i, _, u, !1, s), this._materialBatches[s + 2 * o] = new C(i, u, u, !1, s);
    }

    this._dynamicBatch = new m(i, r);
    var n = l.NUMBER_OF_CLASSIFICATION_TYPES;

    for (this._groundBatches = new Array(n), s = 0; s < n; ++s) {
      this._groundBatches[s] = new b(r, s);
    }

    this._batches = this._colorBatches.concat(this._materialBatches, this._dynamicBatch, this._groundBatches), this._subscriptions = new a(), this._updaters = new a(), (this._entityCollection = t).collectionChanged.addEventListener(A.prototype._onCollectionChanged, this), this._onCollectionChanged(t, t.values, O);
  }

  A.prototype.update = function (e) {
    p.defined("time", e);

    for (var t, i, r, s = this._addedObjects, o = s.values, n = this._removedObjects, a = n.values, h = this._changedObjects, c = h.values, d = c.length - 1; -1 < d; d--) {
      i = (t = c[d]).id, (r = this._updaters.get(i)).entity === t ? (S(this, r), w(this, e, r)) : (a.push(t), o.push(t));
    }

    for (d = a.length - 1; -1 < d; d--) {
      i = (t = a[d]).id, r = this._updaters.get(i), S(this, r), r.destroy(), this._updaters.remove(i), this._subscriptions.get(i)(), this._subscriptions.remove(i);
    }

    for (d = o.length - 1; -1 < d; d--) {
      i = (t = o[d]).id, r = new f(t, this._scene), this._updaters.set(i, r), w(this, e, r), this._subscriptions.set(i, r.geometryChanged.addEventListener(A._onGeometryChanged, this));
    }

    s.removeAll(), n.removeAll(), h.removeAll();
    var l = !0,
        _ = this._batches,
        u = _.length;

    for (d = 0; d < u; d++) {
      l = _[d].update(e) && l;
    }

    return l;
  };

  var E = [],
      P = new d();
  return A.prototype.getBoundingSphere = function (e, t) {
    p.defined("entity", e), p.defined("result", t);

    for (var i = E, r = P, s = 0, o = y.DONE, n = this._batches, a = n.length, h = this._updaters.get(e.id), c = 0; c < a; c++) {
      if ((o = n[c].getBoundingSphere(h, r)) === y.PENDING) return y.PENDING;
      o === y.DONE && (i[s] = d.clone(r, i[s]), s++);
    }

    return 0 === s ? y.FAILED : (i.length = s, d.fromBoundingSpheres(i, t), y.DONE);
  }, A.prototype.isDestroyed = function () {
    return !1;
  }, A.prototype.destroy = function () {
    this._entityCollection.collectionChanged.removeEventListener(A.prototype._onCollectionChanged, this), this._addedObjects.removeAll(), this._removedObjects.removeAll();

    for (var e = this._batches, t = e.length, i = 0; i < t; i++) {
      e[i].removeAllPrimitives();
    }

    var r = this._subscriptions.values,
        t = r.length;

    for (i = 0; i < t; i++) {
      r[i]();
    }

    return this._subscriptions.removeAll(), s(this);
  }, A._onGeometryChanged = function (e) {
    var t = this._removedObjects,
        i = this._changedObjects,
        r = e.entity,
        s = r.id;
    c(t.get(s)) || c(i.get(s)) || i.set(s, r);
  }, A.prototype._onCollectionChanged = function (e, t, i) {
    for (var r, s, o = this._addedObjects, n = this._removedObjects, a = this._changedObjects, h = i.length - 1; -1 < h; h--) {
      r = (s = i[h]).id, o.remove(r) || (n.set(r, s), a.remove(r));
    }

    for (h = t.length - 1; -1 < h; h--) {
      r = (s = t[h]).id, n.remove(r) ? a.set(r, s) : o.set(r, s);
    }
  }, A;
});