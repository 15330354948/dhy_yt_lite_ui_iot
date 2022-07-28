"use strict";

define(["../Core/ApproximateTerrainHeights", "../Core/BoundingSphere", "../Core/Check", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/EventHelper", "../Scene/GroundPolylinePrimitive", "../Scene/GroundPrimitive", "../Scene/OrderedGroundPrimitiveCollection", "../Scene/PrimitiveCollection", "./BillboardVisualizer", "./BoundingSphereState", "./CustomDataSource", "./GeometryVisualizer", "./LabelVisualizer", "./ModelVisualizer", "./PathVisualizer", "./PointVisualizer", "./PolylineVisualizer"], function (u, p, m, h, f, e, r, _, S, g, d, D, o, C, y, a, n, s, l, c, v) {
  "use strict";

  function P(e) {
    m.typeOf.object("options", e), m.typeOf.object("options.scene", e.scene), m.typeOf.object("options.dataSourceCollection", e.dataSourceCollection), g.initializeTerrainHeights(), S.initializeTerrainHeights();
    var i = e.scene,
        t = e.dataSourceCollection;
    this._eventHelper = new _(), this._eventHelper.add(t.dataSourceAdded, this._onDataSourceAdded, this), this._eventHelper.add(t.dataSourceRemoved, this._onDataSourceRemoved, this), this._eventHelper.add(t.dataSourceMoved, this._onDataSourceMoved, this), this._dataSourceCollection = t, this._scene = i, this._visualizersCallback = h(e.visualizersCallback, P.defaultVisualizersCallback);
    var r = !1,
        o = new D(),
        a = new D();
    0 < t.length && (i.primitives.add(o), i.groundPrimitives.add(a), r = !0), this._primitives = o, this._groundPrimitives = a;

    for (var n = 0, s = t.length; n < s; n++) {
      this._onDataSourceAdded(t, t.get(n));
    }

    var d,
        u,
        l,
        c,
        v = new y();
    this._onDataSourceAdded(void 0, v), this._defaultDataSource = v, r || (d = this, u = function u() {
      i.primitives.add(o), i.groundPrimitives.add(a), l(), c(), d._removeDefaultDataSoureListener = void 0, d._removeDataSourceCollectionListener = void 0;
    }, l = v.entities.collectionChanged.addEventListener(u), c = t.dataSourceAdded.addEventListener(u)), this._removeDefaultDataSoureListener = l, this._removeDataSourceCollectionListener = c, this._ready = !1;
  }

  P.defaultVisualizersCallback = function (e, i, t) {
    var r = t.entities;
    return [new o(i, r), new a(e, r, t._primitives, t._groundPrimitives), new n(i, r), new s(e, r), new c(i, r), new l(e, r), new v(e, r, t._primitives, t._groundPrimitives)];
  }, e(P.prototype, {
    scene: {
      get: function get() {
        return this._scene;
      }
    },
    dataSources: {
      get: function get() {
        return this._dataSourceCollection;
      }
    },
    defaultDataSource: {
      get: function get() {
        return this._defaultDataSource;
      }
    },
    ready: {
      get: function get() {
        return this._ready;
      }
    }
  }), P.prototype.isDestroyed = function () {
    return !1;
  }, P.prototype.destroy = function () {
    this._eventHelper.removeAll();

    for (var e = this._dataSourceCollection, i = 0, t = e.length; i < t; ++i) {
      this._onDataSourceRemoved(this._dataSourceCollection, e.get(i));
    }

    return this._onDataSourceRemoved(void 0, this._defaultDataSource), f(this._removeDefaultDataSoureListener) ? (this._removeDefaultDataSoureListener(), this._removeDataSourceCollectionListener()) : (this._scene.primitives.remove(this._primitives), this._scene.groundPrimitives.remove(this._groundPrimitives)), r(this);
  }, P.prototype.update = function (e) {
    if (m.defined("time", e), !u.initialized) return this._ready = !1;

    for (var i, t, r, o = !0, a = this._dataSourceCollection, n = a.length, s = 0; s < n; s++) {
      var d = a.get(s);

      for (f(d.update) && (o = d.update(e) && o), r = (t = d._visualizers).length, i = 0; i < r; i++) {
        o = t[i].update(e) && o;
      }
    }

    for (r = (t = this._defaultDataSource._visualizers).length, i = 0; i < r; i++) {
      o = t[i].update(e) && o;
    }

    return this._ready = o;
  };
  var z = [],
      w = new p();
  return P.prototype.getBoundingSphere = function (e, i, t) {
    if (m.defined("entity", e), m.typeOf.bool("allowPartial", i), m.defined("result", t), !this._ready) return C.PENDING;
    var r = this._defaultDataSource;

    if (!r.entities.contains(e)) {
      r = void 0;

      for (var o = this._dataSourceCollection, a = o.length, n = 0; n < a; n++) {
        var s = o.get(n);

        if (s.entities.contains(e)) {
          r = s;
          break;
        }
      }
    }

    if (!f(r)) return C.FAILED;
    var d = z,
        u = w,
        l = 0,
        c = C.DONE,
        v = r._visualizers,
        h = v.length;

    for (n = 0; n < h; n++) {
      var _ = v[n];

      if (f(_.getBoundingSphere)) {
        if (c = v[n].getBoundingSphere(e, u), !i && c === C.PENDING) return C.PENDING;
        c === C.DONE && (d[l] = p.clone(u, d[l]), l++);
      }
    }

    return 0 === l ? C.FAILED : (d.length = l, p.fromBoundingSpheres(d, t), C.DONE);
  }, P.prototype._onDataSourceAdded = function (e, i) {
    var t = this._scene,
        r = this._primitives,
        o = this._groundPrimitives,
        a = r.add(new D()),
        n = o.add(new d());
    i._primitives = a, i._groundPrimitives = n;
    var s = i.clustering;
    s._initialize(t), a.add(s), i._visualizers = this._visualizersCallback(t, s, i);
  }, P.prototype._onDataSourceRemoved = function (e, i) {
    var t = this._primitives,
        r = this._groundPrimitives,
        o = i._primitives,
        a = i._groundPrimitives,
        n = i.clustering;
    o.remove(n);

    for (var s = i._visualizers, d = s.length, u = 0; u < d; u++) {
      s[u].destroy();
    }

    t.remove(o), r.remove(a), i._visualizers = void 0;
  }, P.prototype._onDataSourceMoved = function (e, i, t) {
    var r = this._primitives,
        o = this._groundPrimitives,
        a = e._primitives,
        n = e._groundPrimitives;
    i === t + 1 ? (r.raise(a), o.raise(n)) : i === t - 1 ? (r.lower(a), o.lower(n)) : 0 === i ? (r.lowerToBottom(a), o.lowerToBottom(n), r.raise(a), o.raise(n)) : (r.raiseToTop(a), o.raiseToTop(n));
  }, P;
});