"use strict";

define(["../Core/Cartesian3", "../Core/Check", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DistanceDisplayCondition", "../Core/DistanceDisplayConditionGeometryInstanceAttribute", "../Core/EllipsoidGeometry", "../Core/EllipsoidOutlineGeometry", "../Core/GeometryInstance", "../Core/GeometryOffsetAttribute", "../Core/Iso8601", "../Core/OffsetGeometryInstanceAttribute", "../Core/Matrix4", "../Core/ShowGeometryInstanceAttribute", "../Scene/HeightReference", "../Scene/MaterialAppearance", "../Scene/PerInstanceColorAppearance", "../Scene/Primitive", "../Scene/SceneMode", "./heightReferenceOnEntityPropertyChanged", "./ColorMaterialProperty", "./DynamicGeometryUpdater", "./GeometryUpdater", "./MaterialProperty", "./Property"], function (U, I, S, E, x, N, t, G, R, d, l, u, L, s, F, W, k, H, j, T, z, q, e, c, o, i, B, K) {
  "use strict";

  var X = new c(S.WHITE),
      Z = U.ZERO,
      J = new U(),
      Q = new U(),
      Y = new S(),
      $ = new U(1, 1, 1);

  function r(t) {
    this.id = t, this.vertexFormat = void 0, this.radii = void 0, this.stackPartitions = void 0, this.slicePartitions = void 0, this.subdivisions = void 0, this.offsetAttribute = void 0;
  }

  function n(t, e) {
    i.call(this, {
      entity: t,
      scene: e,
      geometryOptions: new r(t),
      geometryPropertyName: "ellipsoid",
      observedPropertyNames: ["availability", "position", "orientation", "ellipsoid"]
    }), this._onEntityPropertyChanged(t, "ellipsoid", t.ellipsoid, void 0);
  }

  function a(t, e, i) {
    o.call(this, t, e, i), this._scene = t._scene, this._modelMatrix = new W(), this._attributes = void 0, this._outlineAttributes = void 0, this._lastSceneMode = void 0, this._lastShow = void 0, this._lastOutlineShow = void 0, this._lastOutlineWidth = void 0, this._lastOutlineColor = void 0, this._lastOffset = new U(), this._material = {};
  }

  return N(Object.create) && ((n.prototype = Object.create(i.prototype)).constructor = n), t(n.prototype, {
    terrainOffsetProperty: {
      get: function get() {
        return this._terrainOffsetProperty;
      }
    }
  }), n.prototype.createFillGeometryInstance = function (t, e, i) {
    I.defined("time", t);

    var o,
        s,
        r = this._entity,
        n = r.isAvailable(t),
        a = new k(n && r.isShowing && this._showProperty.getValue(t) && this._fillProperty.getValue(t)),
        l = this._distanceDisplayConditionProperty.getValue(t),
        h = {
      show: a,
      distanceDisplayCondition: R.fromDistanceDisplayCondition(l),
      color: void 0,
      offset: void 0
    };

    return this._materialProperty instanceof c && (N(this._materialProperty.color) && (this._materialProperty.color.isConstant || n) && (s = this._materialProperty.color.getValue(t, Y)), N(s) || (s = S.WHITE), o = E.fromColor(s), h.color = o), N(this._options.offsetAttribute) && (h.offset = F.fromCartesian3(K.getValueOrDefault(this._terrainOffsetProperty, t, Z, J))), new u({
      id: r,
      geometry: new d(this._options),
      modelMatrix: e ? void 0 : r.computeModelMatrixForHeightReference(t, r.ellipsoid.heightReference, .5 * this._options.radii.z, this._scene.mapProjection.ellipsoid, i),
      attributes: h
    });
  }, n.prototype.createOutlineGeometryInstance = function (t, e, i) {
    I.defined("time", t);

    var o = this._entity,
        s = o.isAvailable(t),
        r = K.getValueOrDefault(this._outlineColorProperty, t, S.BLACK, Y),
        n = this._distanceDisplayConditionProperty.getValue(t),
        a = {
      show: new k(s && o.isShowing && this._showProperty.getValue(t) && this._showOutlineProperty.getValue(t)),
      color: E.fromColor(r),
      distanceDisplayCondition: R.fromDistanceDisplayCondition(n),
      offset: void 0
    };

    return N(this._options.offsetAttribute) && (a.offset = F.fromCartesian3(K.getValueOrDefault(this._terrainOffsetProperty, t, Z, J))), new u({
      id: o,
      geometry: new l(this._options),
      modelMatrix: e ? void 0 : o.computeModelMatrixForHeightReference(t, o.ellipsoid.heightReference, .5 * this._options.radii.z, this._scene.mapProjection.ellipsoid, i),
      attributes: a
    });
  }, n.prototype._computeCenter = function (t, e) {
    return K.getValueOrUndefined(this._entity.position, t, e);
  }, n.prototype._isHidden = function (t, e) {
    return !N(t.position) || !N(e.radii) || i.prototype._isHidden.call(this, t, e);
  }, n.prototype._isDynamic = function (t, e) {
    return !(t.position.isConstant && K.isConstant(t.orientation) && e.radii.isConstant && K.isConstant(e.stackPartitions) && K.isConstant(e.slicePartitions) && K.isConstant(e.outlineWidth) && K.isConstant(e.subdivisions));
  }, n.prototype._setStaticOptions = function (t, e) {
    var i = K.getValueOrDefault(e.heightReference, s.MINIMUM_VALUE, H.NONE),
        o = this._options;
    o.vertexFormat = this._materialProperty instanceof c ? T.VERTEX_FORMAT : j.MaterialSupport.TEXTURED.vertexFormat, o.radii = e.radii.getValue(s.MINIMUM_VALUE, o.radii), o.stackPartitions = K.getValueOrUndefined(e.stackPartitions, s.MINIMUM_VALUE), o.slicePartitions = K.getValueOrUndefined(e.slicePartitions, s.MINIMUM_VALUE), o.subdivisions = K.getValueOrUndefined(e.subdivisions, s.MINIMUM_VALUE), o.offsetAttribute = i !== H.NONE ? L.ALL : void 0;
  }, n.prototype._onEntityPropertyChanged = e, n.DynamicGeometryUpdater = a, N(Object.create) && ((a.prototype = Object.create(o.prototype)).constructor = a), a.prototype.update = function (t) {
    I.defined("time", t);
    var e = this._entity,
        i = e.ellipsoid;
    if (!e.isShowing || !e.isAvailable(t) || !K.getValueOrDefault(i.show, t, !0)) return N(this._primitive) && (this._primitive.show = !1), void (N(this._outlinePrimitive) && (this._outlinePrimitive.show = !1));
    var o = K.getValueOrUndefined(i.radii, t, Q),
        s = N(o) ? e.computeModelMatrixForHeightReference(t, i.heightReference, .5 * o.z, this._scene.mapProjection.ellipsoid, this._modelMatrix) : void 0;
    if (!N(s) || !N(o)) return N(this._primitive) && (this._primitive.show = !1), void (N(this._outlinePrimitive) && (this._outlinePrimitive.show = !1));

    var r,
        n,
        a,
        l,
        h,
        d,
        u,
        c,
        p = K.getValueOrDefault(i.fill, t, !0),
        f = K.getValueOrDefault(i.outline, t, !1),
        _ = K.getValueOrClonedDefault(i.outlineColor, t, S.BLACK, Y),
        y = B.getValue(t, x(i.material, X), this._material),
        m = K.getValueOrUndefined(i.stackPartitions, t),
        v = K.getValueOrUndefined(i.slicePartitions, t),
        C = K.getValueOrUndefined(i.subdivisions, t),
        g = K.getValueOrDefault(i.outlineWidth, t, 1),
        O = K.getValueOrDefault(i.heightReference, t, H.NONE),
        P = O !== H.NONE ? L.ALL : void 0,
        w = this._scene.mode,
        V = w === q.SCENE3D && O === H.NONE,
        M = this._options,
        D = this._geometryUpdater.shadowsProperty.getValue(t),
        b = this._geometryUpdater.distanceDisplayConditionProperty.getValue(t),
        A = K.getValueOrDefault(this._geometryUpdater.terrainOffsetProperty, t, Z, J);

    !V || this._lastSceneMode !== w || !N(this._primitive) || M.stackPartitions !== m || M.slicePartitions !== v || M.subdivisions !== C || this._lastOutlineWidth !== g || M.offsetAttribute !== P ? ((r = this._primitives).removeAndDestroy(this._primitive), r.removeAndDestroy(this._outlinePrimitive), this._primitive = void 0, this._outlinePrimitive = void 0, this._lastSceneMode = w, this._lastOutlineWidth = g, M.stackPartitions = m, M.slicePartitions = v, M.subdivisions = C, M.offsetAttribute = P, M.radii = V ? $ : o, n = new j({
      material: y,
      translucent: y.isTranslucent(),
      closed: !0
    }), M.vertexFormat = n.vertexFormat, a = this._geometryUpdater.createFillGeometryInstance(t, V, this._modelMatrix), this._primitive = r.add(new z({
      geometryInstances: a,
      appearance: n,
      asynchronous: !1,
      shadows: D
    })), l = this._geometryUpdater.createOutlineGeometryInstance(t, V, this._modelMatrix), this._outlinePrimitive = r.add(new z({
      geometryInstances: l,
      appearance: new T({
        flat: !0,
        translucent: 255 !== l.attributes.color.value[3],
        renderState: {
          lineWidth: this._geometryUpdater._scene.clampLineWidth(g)
        }
      }),
      asynchronous: !1,
      shadows: D
    })), this._lastShow = p, this._lastOutlineShow = f, this._lastOutlineColor = S.clone(_, this._lastOutlineColor), this._lastDistanceDisplayCondition = b, this._lastOffset = U.clone(A, this._lastOffset)) : this._primitive.ready && (h = this._primitive, d = this._outlinePrimitive, h.show = !0, d.show = !0, h.appearance.material = y, u = this._attributes, N(u) || (u = h.getGeometryInstanceAttributes(e), this._attributes = u), p !== this._lastShow && (u.show = k.toValue(p, u.show), this._lastShow = p), c = this._outlineAttributes, N(c) || (c = d.getGeometryInstanceAttributes(e), this._outlineAttributes = c), f !== this._lastOutlineShow && (c.show = k.toValue(f, c.show), this._lastOutlineShow = f), S.equals(_, this._lastOutlineColor) || (c.color = E.toValue(_, c.color), S.clone(_, this._lastOutlineColor)), G.equals(b, this._lastDistanceDisplayCondition) || (u.distanceDisplayCondition = R.toValue(b, u.distanceDisplayCondition), c.distanceDisplayCondition = R.toValue(b, c.distanceDisplayCondition), G.clone(b, this._lastDistanceDisplayCondition)), U.equals(A, this._lastOffset) || (u.offset = F.toValue(A, u.offset), c.offset = F.toValue(A, u.offset), U.clone(A, this._lastOffset))), V && (o.x = Math.max(o.x, .001), o.y = Math.max(o.y, .001), o.z = Math.max(o.z, .001), s = W.multiplyByScale(s, o, s), this._primitive.modelMatrix = s, this._outlinePrimitive.modelMatrix = s);
  }, n;
});