"use strict";

define(["../Core/AssociativeArray", "../Core/BoundingSphere", "../Core/Check", "../Core/defaultValue", "../Core/defined", "../Core/destroyObject", "../Core/Event", "../Core/EventHelper", "../Scene/ClassificationType", "../Scene/MaterialAppearance", "../Scene/PerInstanceColorAppearance", "../Scene/ShadowMode", "./BoundingSphereState", "./BoxGeometryUpdater", "./ColorMaterialProperty", "./CorridorGeometryUpdater", "./CylinderGeometryUpdater", "./DynamicGeometryBatch", "./EllipseGeometryUpdater", "./EllipsoidGeometryUpdater", "./Entity", "./PlaneGeometryUpdater", "./PolygonGeometryUpdater", "./PolylineVolumeGeometryUpdater", "./RectangleGeometryUpdater", "./StaticGeometryColorBatch", "./StaticGeometryPerMaterialBatch", "./StaticGroundGeometryColorBatch", "./StaticGroundGeometryPerMaterialBatch", "./StaticOutlineGeometryBatch", "./WallGeometryUpdater"], function (l, _, y, c, s, n, h, d, p, u, v, f, g, e, a, t, r, m, o, i, B, C, E, w, O, S, b, M, P, A, G) {
  "use strict";

  var U = [],
      j = [e, r, t, o, i, C, E, w, O, G];

  function D(e, t) {
    this.entity = e, this.scene = t;
    var r = new Array(j.length),
        o = new h();

    function i(e) {
      o.raiseEvent(e);
    }

    for (var s = new d(), n = 0; n < r.length; n++) {
      var a = new j[n](e, t);
      s.add(a.geometryChanged, i), r[n] = a;
    }

    this.updaters = r, this.geometryChanged = o, this.eventHelper = s, this._removeEntitySubscription = e.definitionChanged.addEventListener(D.prototype._onEntityPropertyChanged, this);
  }

  function N(e, t, r, o) {
    y.defined("scene", e), y.defined("entityCollection", t), r = c(r, e.primitives), o = c(o, e.groundPrimitives), this._scene = e, this._primitives = r, this._groundPrimitives = o, this._entityCollection = void 0, this._addedObjects = new l(), this._removedObjects = new l(), this._changedObjects = new l();
    var i = f.NUMBER_OF_SHADOW_MODES;
    this._outlineBatches = new Array(2 * i), this._closedColorBatches = new Array(2 * i), this._closedMaterialBatches = new Array(2 * i), this._openColorBatches = new Array(2 * i), this._openMaterialBatches = new Array(2 * i);
    var s,
        n = B.supportsMaterialsforEntitiesOnTerrain(e);

    for (this._supportsMaterialsforEntitiesOnTerrain = n, s = 0; s < i; ++s) {
      this._outlineBatches[s] = new A(r, e, s, !1), this._outlineBatches[i + s] = new A(r, e, s, !0), this._closedColorBatches[s] = new S(r, v, void 0, !0, s, !0), this._closedColorBatches[i + s] = new S(r, v, void 0, !0, s, !1), this._closedMaterialBatches[s] = new b(r, u, void 0, !0, s, !0), this._closedMaterialBatches[i + s] = new b(r, u, void 0, !0, s, !1), this._openColorBatches[s] = new S(r, v, void 0, !1, s, !0), this._openColorBatches[i + s] = new S(r, v, void 0, !1, s, !1), this._openMaterialBatches[s] = new b(r, u, void 0, !1, s, !0), this._openMaterialBatches[i + s] = new b(r, u, void 0, !1, s, !1);
    }

    var a = p.NUMBER_OF_CLASSIFICATION_TYPES,
        h = new Array(a),
        d = [];
    if (n) for (s = 0; s < a; ++s) {
      d.push(new P(o, s, u)), h[s] = new P(o, s, v);
    } else for (s = 0; s < a; ++s) {
      h[s] = new M(o, s);
    }
    this._groundColorBatches = h, this._groundMaterialBatches = d, this._dynamicBatch = new m(r, o), this._batches = this._outlineBatches.concat(this._closedColorBatches, this._closedMaterialBatches, this._openColorBatches, this._openMaterialBatches, this._groundColorBatches, this._groundMaterialBatches, this._dynamicBatch), this._subscriptions = new l(), this._updaterSets = new l(), (this._entityCollection = t).collectionChanged.addEventListener(N.prototype._onCollectionChanged, this), this._onCollectionChanged(t, t.values, U);
  }

  D.prototype._onEntityPropertyChanged = function (e, t, r, o) {
    for (var i = this.updaters, s = 0; s < i.length; s++) {
      i[s]._onEntityPropertyChanged(e, t, r, o);
    }
  }, D.prototype.forEach = function (e) {
    for (var t = this.updaters, r = 0; r < t.length; r++) {
      e(t[r]);
    }
  }, D.prototype.destroy = function () {
    this.eventHelper.removeAll();

    for (var e = this.updaters, t = 0; t < e.length; t++) {
      e[t].destroy();
    }

    this._removeEntitySubscription(), n(this);
  }, N.prototype.update = function (t) {
    y.defined("time", t);

    for (var e, r, o, i = this._addedObjects, s = i.values, n = this._removedObjects, a = n.values, h = this._changedObjects, d = h.values, l = this, c = d.length - 1; -1 < c; c--) {
      r = (e = d[c]).id, (o = this._updaterSets.get(r)).entity === e ? o.forEach(function (e) {
        l._removeUpdater(e), l._insertUpdaterIntoBatch(t, e);
      }) : (a.push(e), s.push(e));
    }

    for (c = a.length - 1; -1 < c; c--) {
      r = (e = a[c]).id, (o = this._updaterSets.get(r)).forEach(this._removeUpdater.bind(this)), o.destroy(), this._updaterSets.remove(r), this._subscriptions.get(r)(), this._subscriptions.remove(r);
    }

    for (c = s.length - 1; -1 < c; c--) {
      r = (e = s[c]).id, o = new D(e, this._scene), this._updaterSets.set(r, o), o.forEach(function (e) {
        l._insertUpdaterIntoBatch(t, e);
      }), this._subscriptions.set(r, o.geometryChanged.addEventListener(N._onGeometryChanged, this));
    }

    i.removeAll(), n.removeAll(), h.removeAll();
    var p = !0,
        _ = this._batches,
        u = _.length;

    for (c = 0; c < u; c++) {
      p = _[c].update(t) && p;
    }

    return p;
  };
  var I = [],
      T = new _();
  return N.prototype.getBoundingSphere = function (e, t) {
    y.defined("entity", e), y.defined("result", t);

    for (var r = I, o = T, i = 0, s = g.DONE, n = this._batches, a = n.length, h = e.id, d = this._updaterSets.get(h).updaters, l = 0; l < d.length; l++) {
      for (var c = d[l], p = 0; p < a; p++) {
        if ((s = n[p].getBoundingSphere(c, o)) === g.PENDING) return g.PENDING;
        s === g.DONE && (r[i] = _.clone(o, r[i]), i++);
      }
    }

    return 0 === i ? g.FAILED : (r.length = i, _.fromBoundingSpheres(r, t), g.DONE);
  }, N.prototype.isDestroyed = function () {
    return !1;
  }, N.prototype.destroy = function () {
    this._entityCollection.collectionChanged.removeEventListener(N.prototype._onCollectionChanged, this), this._addedObjects.removeAll(), this._removedObjects.removeAll();

    for (var e = this._batches, t = e.length, r = 0; r < t; r++) {
      e[r].removeAllPrimitives();
    }

    var o = this._subscriptions.values,
        t = o.length;

    for (r = 0; r < t; r++) {
      o[r]();
    }

    this._subscriptions.removeAll();

    var i = this._updaterSets.values;

    for (t = i.length, r = 0; r < t; r++) {
      i[r].destroy();
    }

    return this._updaterSets.removeAll(), n(this);
  }, N.prototype._removeUpdater = function (e) {
    for (var t = this._batches, r = t.length, o = 0; o < r; o++) {
      t[o].remove(e);
    }
  }, N.prototype._insertUpdaterIntoBatch = function (e, t) {
    var r, o, i;
    t.isDynamic ? this._dynamicBatch.add(e, t) : ((t.outlineEnabled || t.fillEnabled) && (r = t.shadowsProperty.getValue(e)), o = f.NUMBER_OF_SHADOW_MODES, t.outlineEnabled && (s(t.terrainOffsetProperty) ? this._outlineBatches[o + r].add(e, t) : this._outlineBatches[r].add(e, t)), t.fillEnabled && (t.onTerrain ? (i = t.classificationTypeProperty.getValue(e), t.fillMaterialProperty instanceof a ? this._groundColorBatches[i].add(e, t) : this._groundMaterialBatches[i].add(e, t)) : t.isClosed ? t.fillMaterialProperty instanceof a ? s(t.terrainOffsetProperty) ? this._closedColorBatches[o + r].add(e, t) : this._closedColorBatches[r].add(e, t) : s(t.terrainOffsetProperty) ? this._closedMaterialBatches[o + r].add(e, t) : this._closedMaterialBatches[r].add(e, t) : t.fillMaterialProperty instanceof a ? s(t.terrainOffsetProperty) ? this._openColorBatches[o + r].add(e, t) : this._openColorBatches[r].add(e, t) : s(t.terrainOffsetProperty) ? this._openMaterialBatches[o + r].add(e, t) : this._openMaterialBatches[r].add(e, t)));
  }, N._onGeometryChanged = function (e) {
    var t = this._removedObjects,
        r = this._changedObjects,
        o = e.entity,
        i = o.id;
    s(t.get(i)) || s(r.get(i)) || r.set(i, o);
  }, N.prototype._onCollectionChanged = function (e, t, r) {
    for (var o, i, s = this._addedObjects, n = this._removedObjects, a = this._changedObjects, h = r.length - 1; -1 < h; h--) {
      o = (i = r[h]).id, s.remove(o) || (n.set(o, i), a.remove(o));
    }

    for (h = t.length - 1; -1 < h; h--) {
      o = (i = t[h]).id, n.remove(o) ? a.set(o, i) : s.set(o, i);
    }
  }, N;
});