"use strict";

define(["../Core/ArcType", "../Core/BoundingSphere", "../Core/Check", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/DistanceDisplayCondition", "../Core/DistanceDisplayConditionGeometryInstanceAttribute", "../Core/Event", "../Core/GeometryInstance", "../Core/GroundPolylineGeometry", "../Core/Iso8601", "../Core/oneTimeWarning", "../Core/PolylineGeometry", "../Core/PolylinePipeline", "../Core/ShowGeometryInstanceAttribute", "../DataSources/Entity", "../Scene/ClassificationType", "../Scene/GroundPolylinePrimitive", "../Scene/PolylineCollection", "../Scene/PolylineColorAppearance", "../Scene/PolylineMaterialAppearance", "../Scene/ShadowMode", "./BoundingSphereState", "./ColorMaterialProperty", "./ConstantProperty", "./MaterialProperty", "./Property"], function (u, n, o, a, l, f, v, e, i, d, t, h, r, y, p, P, C, c, _, g, s, m, w, E, T, D, M, I, O, V, b, G) {
  "use strict";

  var U = new V(0),
      A = {},
      S = new a(),
      F = new O(a.WHITE),
      N = new V(!0),
      x = new V(M.DISABLED),
      L = new V(new t()),
      z = new V(m.BOTH);

  function B() {
    this.vertexFormat = void 0, this.positions = void 0, this.width = void 0, this.arcType = void 0, this.granularity = void 0;
  }

  function H() {
    this.positions = void 0, this.width = void 0, this.arcType = void 0, this.granularity = void 0;
  }

  function R(e, t) {
    if (!v(e)) throw new d("entity is required");
    if (!v(t)) throw new d("scene is required");
    this._entity = e, this._scene = t, this._entitySubscription = e.definitionChanged.addEventListener(R.prototype._onEntityPropertyChanged, this), this._fillEnabled = !1, this._dynamic = !1, this._geometryChanged = new r(), this._showProperty = void 0, this._materialProperty = void 0, this._shadowsProperty = void 0, this._distanceDisplayConditionProperty = void 0, this._classificationTypeProperty = void 0, this._depthFailMaterialProperty = void 0, this._geometryOptions = new B(), this._groundGeometryOptions = new H(), this._id = "polyline-" + e.id, this._clampToGround = !1, this._supportsPolylinesOnTerrain = s.supportsPolylinesOnTerrain(t), this._zIndex = 0, this._onEntityPropertyChanged(e, "polyline", e.polyline, void 0);
  }

  e(R.prototype, {
    id: {
      get: function get() {
        return this._id;
      }
    },
    entity: {
      get: function get() {
        return this._entity;
      }
    },
    fillEnabled: {
      get: function get() {
        return this._fillEnabled;
      }
    },
    hasConstantFill: {
      get: function get() {
        return !this._fillEnabled || !v(this._entity.availability) && G.isConstant(this._showProperty);
      }
    },
    fillMaterialProperty: {
      get: function get() {
        return this._materialProperty;
      }
    },
    depthFailMaterialProperty: {
      get: function get() {
        return this._depthFailMaterialProperty;
      }
    },
    outlineEnabled: {
      value: !1
    },
    hasConstantOutline: {
      value: !0
    },
    outlineColorProperty: {
      value: void 0
    },
    shadowsProperty: {
      get: function get() {
        return this._shadowsProperty;
      }
    },
    distanceDisplayConditionProperty: {
      get: function get() {
        return this._distanceDisplayConditionProperty;
      }
    },
    classificationTypeProperty: {
      get: function get() {
        return this._classificationTypeProperty;
      }
    },
    isDynamic: {
      get: function get() {
        return this._dynamic;
      }
    },
    isClosed: {
      value: !1
    },
    geometryChanged: {
      get: function get() {
        return this._geometryChanged;
      }
    },
    arcType: {
      get: function get() {
        return this._arcType;
      }
    },
    clampToGround: {
      get: function get() {
        return this._clampToGround && this._supportsPolylinesOnTerrain;
      }
    },
    zIndex: {
      get: function get() {
        return this._zIndex;
      }
    }
  }), R.prototype.isOutlineVisible = function (e) {
    return !1;
  }, R.prototype.isFilled = function (e) {
    var t = this._entity,
        i = this._fillEnabled && t.isAvailable(e) && this._showProperty.getValue(e);

    return f(i, !1);
  }, R.prototype.createFillGeometryInstance = function (e) {
    if (!v(e)) throw new d("time is required.");
    if (!this._fillEnabled) throw new d("This instance does not represent a filled geometry.");

    var t,
        i = this._entity,
        r = i.isAvailable(e),
        n = new g(r && i.isShowing && this._showProperty.getValue(e)),
        o = this._distanceDisplayConditionProperty.getValue(e),
        s = {
      show: n,
      distanceDisplayCondition: h.fromDistanceDisplayCondition(o)
    };

    return this._materialProperty instanceof O && (v(this._materialProperty.color) && (this._materialProperty.color.isConstant || r) && (t = this._materialProperty.color.getValue(e, S)), v(t) || (t = a.WHITE), s.color = l.fromColor(t)), this.clampToGround ? new y({
      id: i,
      geometry: new p(this._groundGeometryOptions),
      attributes: s
    }) : (v(this._depthFailMaterialProperty) && this._depthFailMaterialProperty instanceof O && (v(this._depthFailMaterialProperty.color) && (this._depthFailMaterialProperty.color.isConstant || r) && (t = this._depthFailMaterialProperty.color.getValue(e, S)), v(t) || (t = a.WHITE), s.depthFailColor = l.fromColor(t)), new y({
      id: i,
      geometry: new c(this._geometryOptions),
      attributes: s
    }));
  }, R.prototype.createOutlineGeometryInstance = function (e) {
    throw new d("This instance does not represent an outlined geometry.");
  }, R.prototype.isDestroyed = function () {
    return !1;
  }, R.prototype.destroy = function () {
    this._entitySubscription(), i(this);
  }, R.prototype._onEntityPropertyChanged = function (e, t, i, r) {
    if ("availability" === t || "polyline" === t) {
      var n = this._entity.polyline;

      if (v(n)) {
        var o = n.positions,
            s = n.show;
        if (v(s) && s.isConstant && !s.getValue(P.MINIMUM_VALUE) || !v(o)) this._fillEnabled && (this._fillEnabled = !1, this._geometryChanged.raiseEvent(this));else {
          var a = n.zIndex,
              l = f(n.material, F),
              d = l instanceof O;
          this._materialProperty = l, this._depthFailMaterialProperty = n.depthFailMaterial, this._showProperty = f(s, N), this._shadowsProperty = f(n.shadows, x), this._distanceDisplayConditionProperty = f(n.distanceDisplayCondition, L), this._classificationTypeProperty = f(n.classificationType, z), this._fillEnabled = !0, this._zIndex = f(a, U);
          var h = n.width,
              y = n.arcType,
              p = n.clampToGround,
              u = n.granularity;

          if (o.isConstant && G.isConstant(h) && G.isConstant(y) && G.isConstant(u) && G.isConstant(p) && G.isConstant(a)) {
            var c,
                _ = this._geometryOptions,
                g = o.getValue(P.MINIMUM_VALUE, _.positions);
            if (!v(g) || g.length < 2) return void (this._fillEnabled && (this._fillEnabled = !1, this._geometryChanged.raiseEvent(this)));
            c = d && (!v(this._depthFailMaterialProperty) || this._depthFailMaterialProperty instanceof O) ? T.VERTEX_FORMAT : D.VERTEX_FORMAT, _.vertexFormat = c, _.positions = g, _.width = v(h) ? h.getValue(P.MINIMUM_VALUE) : void 0, _.arcType = v(y) ? y.getValue(P.MINIMUM_VALUE) : void 0, _.granularity = v(u) ? u.getValue(P.MINIMUM_VALUE) : void 0;
            var m = this._groundGeometryOptions;
            m.positions = g, m.width = _.width, m.arcType = _.arcType, m.granularity = _.granularity, this._clampToGround = !!v(p) && p.getValue(P.MINIMUM_VALUE), !this._clampToGround && v(a) && C("Entity polylines must have clampToGround: true when using zIndex.  zIndex will be ignored."), this._dynamic = !1, this._geometryChanged.raiseEvent(this);
          } else this._dynamic || (this._dynamic = !0, this._geometryChanged.raiseEvent(this));
        }
      } else this._fillEnabled && (this._fillEnabled = !1, this._geometryChanged.raiseEvent(this));
    }
  }, R.prototype.createDynamicUpdater = function (e, t) {
    if (o.defined("primitives", e), o.defined("groundPrimitives", t), !this._dynamic) throw new d("This instance does not represent dynamic geometry.");
    return new q(e, t, this);
  };
  var W = {
    positions: void 0,
    granularity: void 0,
    height: void 0,
    ellipsoid: void 0
  };

  function q(e, t, i) {
    this._line = void 0, this._primitives = e, this._groundPrimitives = t, this._groundPolylinePrimitive = void 0, this._material = void 0, this._geometryUpdater = i, this._positions = [];
  }

  function X(e) {
    if (v(e._line)) return e._line;
    var t = e._geometryUpdater._scene.id,
        i = A[t],
        r = e._primitives;
    !v(i) || i.isDestroyed() ? (i = new E(), A[t] = i, r.add(i)) : r.contains(i) || r.add(i);
    var n = i.add();
    return n.id = e._geometryUpdater._entity, e._line = n;
  }

  return q.prototype.update = function (e) {
    var t = this._geometryUpdater,
        i = t._entity,
        r = i.polyline,
        n = r.positions,
        o = G.getValueOrUndefined(n, e, this._positions);
    t._clampToGround = G.getValueOrDefault(r._clampToGround, e, !1), t._groundGeometryOptions.positions = o, t._groundGeometryOptions.width = G.getValueOrDefault(r._width, e, 1), t._groundGeometryOptions.arcType = G.getValueOrDefault(r._arcType, e, u.GEODESIC), t._groundGeometryOptions.granularity = G.getValueOrDefault(r._granularity, e, 9999);
    var s = this._groundPrimitives;

    if (v(this._groundPolylinePrimitive) && (s.remove(this._groundPolylinePrimitive), this._groundPolylinePrimitive = void 0), t.clampToGround) {
      if (!i.isShowing || !i.isAvailable(e) || !G.getValueOrDefault(r._show, e, !0)) return;
      if (!v(o) || o.length < 2) return;
      var a,
          l,
          d = t.fillMaterialProperty;
      return d instanceof O ? l = new T() : (a = b.getValue(e, d, this._material), l = new D({
        material: a,
        translucent: a.isTranslucent()
      }), this._material = a), this._groundPolylinePrimitive = s.add(new w({
        geometryInstances: t.createFillGeometryInstance(e),
        appearance: l,
        classificationType: t.classificationTypeProperty.getValue(e),
        asynchronous: !1
      }), G.getValueOrUndefined(t.zIndex, e)), void (v(this._line) && (this._line.show = !1));
    }

    var h,
        y,
        p = X(this);
    !(i.isShowing && i.isAvailable(e) && G.getValueOrDefault(r._show, e, !0)) || !v(o) || o.length < 2 ? p.show = !1 : (h = u.GEODESIC, h = G.getValueOrDefault(r._arcType, e, h), y = t._scene.globe, h !== u.NONE && v(y) && (W.ellipsoid = y.ellipsoid, W.positions = o, W.granularity = G.getValueOrUndefined(r._granularity, e), W.height = _.extractHeights(o, y.ellipsoid), o = _.generateCartesianArc(W)), p.show = !0, p.positions = o.slice(), p.material = b.getValue(e, t.fillMaterialProperty, p.material), p.width = G.getValueOrDefault(r._width, e, 1), p.distanceDisplayCondition = G.getValueOrUndefined(r._distanceDisplayCondition, e, p.distanceDisplayCondition));
  }, q.prototype.getBoundingSphere = function (e) {
    if (o.defined("result", e), this._geometryUpdater.clampToGround) {
      var t = this._groundPolylinePrimitive;

      if (v(t) && t.show && t.ready) {
        var i = t.getGeometryInstanceAttributes(this._geometryUpdater._entity);
        if (v(i) && v(i.boundingSphere)) return n.clone(i.boundingSphere, e), I.DONE;
      }

      return v(t) && !t.ready ? I.PENDING : I.DONE;
    }

    var r = X(this);
    return r.show && 0 < r.positions.length ? (n.fromPoints(r.positions, e), I.DONE) : I.FAILED;
  }, q.prototype.isDestroyed = function () {
    return !1;
  }, q.prototype.destroy = function () {
    var e = this._geometryUpdater._scene.id,
        t = A[e];
    v(t) && (t.remove(this._line), 0 === t.length && (this._primitives.removeAndDestroy(t), delete A[e])), v(this._groundPolylinePrimitive) && this._groundPrimitives.remove(this._groundPolylinePrimitive), i(this);
  }, R;
});