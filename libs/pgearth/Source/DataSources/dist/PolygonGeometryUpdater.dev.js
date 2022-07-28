"use strict";

define(["../Core/ApproximateTerrainHeights", "../Core/ArcType", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Check", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/CoplanarPolygonGeometry", "../Core/CoplanarPolygonOutlineGeometry", "../Core/defined", "../Core/DeveloperError", "../Core/DistanceDisplayConditionGeometryInstanceAttribute", "../Core/EllipsoidTangentPlane", "../Core/GeometryInstance", "../Core/GeometryOffsetAttribute", "../Core/isArray", "../Core/Iso8601", "../Core/oneTimeWarning", "../Core/OffsetGeometryInstanceAttribute", "../Core/PolygonGeometry", "../Core/PolygonHierarchy", "../Core/PolygonOutlineGeometry", "../Core/Rectangle", "../Core/ShowGeometryInstanceAttribute", "../Scene/GroundPrimitive", "../Scene/HeightReference", "../Scene/MaterialAppearance", "../Scene/PerInstanceColorAppearance", "./ColorMaterialProperty", "./DynamicGeometryUpdater", "./GeometryUpdater", "./GroundGeometryUpdater", "./Property"], function (u, y, f, e, l, h, p, s, g, m, d, c, C, O, t, _, P, V, M, H, v, U, o, I, i, E, A, D, T, r, n, w, G) {
  "use strict";

  var N = "Entity polygons cannot have both height and perPositionHeight.  height will be ignored",
      b = "heightReference is not supported for entity polygons with perPositionHeight. heightReference will be ignored",
      x = new h(),
      R = e.ZERO,
      L = new e(),
      S = new o(),
      B = [],
      j = new f();

  function a(e) {
    this.id = e, this.vertexFormat = void 0, this.polygonHierarchy = void 0, this.perPositionHeight = void 0, this.closeTop = void 0, this.closeBottom = void 0, this.height = void 0, this.extrudedHeight = void 0, this.granularity = void 0, this.stRotation = void 0, this.offsetAttribute = void 0, this.arcType = void 0;
  }

  function F(e, t) {
    w.call(this, {
      entity: e,
      scene: t,
      geometryOptions: new a(e),
      geometryPropertyName: "polygon",
      observedPropertyNames: ["availability", "polygon"]
    }), this._onEntityPropertyChanged(e, "polygon", e.polygon, void 0);
  }

  function W(e, t, o) {
    r.call(this, e, t, o);
  }

  return m(Object.create) && ((F.prototype = Object.create(w.prototype)).constructor = F), F.prototype.createFillGeometryInstance = function (e) {
    if (l.defined("time", e), !this._fillEnabled) throw new d("This instance does not represent a filled geometry.");
    var t,
        o,
        i = this._entity,
        r = i.isAvailable(e),
        n = this._options,
        a = {
      show: new I(r && i.isShowing && this._showProperty.getValue(e) && this._fillProperty.getValue(e)),
      distanceDisplayCondition: c.fromDistanceDisplayCondition(this._distanceDisplayConditionProperty.getValue(e)),
      offset: void 0,
      color: void 0
    };
    return this._materialProperty instanceof T && (m(this._materialProperty.color) && (this._materialProperty.color.isConstant || r) && (t = this._materialProperty.color.getValue(e, x)), m(t) || (t = h.WHITE), a.color = p.fromColor(t)), m(n.offsetAttribute) && (a.offset = M.fromCartesian3(G.getValueOrDefault(this._terrainOffsetProperty, e, R, L))), o = new (n.perPositionHeight && !m(n.extrudedHeight) ? s : H)(n), new O({
      id: i,
      geometry: o,
      attributes: a
    });
  }, F.prototype.createOutlineGeometryInstance = function (e) {
    if (l.defined("time", e), !this._outlineEnabled) throw new d("This instance does not represent an outlined geometry.");

    var t,
        o = this._entity,
        i = o.isAvailable(e),
        r = this._options,
        n = G.getValueOrDefault(this._outlineColorProperty, e, h.BLACK, x),
        a = this._distanceDisplayConditionProperty.getValue(e),
        s = {
      show: new I(i && o.isShowing && this._showProperty.getValue(e) && this._showOutlineProperty.getValue(e)),
      color: p.fromColor(n),
      distanceDisplayCondition: c.fromDistanceDisplayCondition(a),
      offset: void 0
    };

    return m(r.offsetAttribute) && (s.offset = M.fromCartesian3(G.getValueOrDefault(this._terrainOffsetProperty, e, R, L))), t = new (r.perPositionHeight && !m(r.extrudedHeight) ? g : U)(r), new O({
      id: o,
      geometry: t,
      attributes: s
    });
  }, F.prototype._computeCenter = function (e, t) {
    var o = G.getValueOrUndefined(this._entity.polygon.hierarchy, e);

    if (m(o) && !_(o) && (o = o.positions), 0 !== o.length) {
      for (var i = this._scene.mapProjection.ellipsoid, r = C.fromPoints(o, i), n = r.projectPointsOntoPlane(o, B), a = n.length, s = 0, l = a - 1, h = new f(), p = 0; p < a; l = p++) {
        var u = n[p],
            y = n[l],
            g = u.x * y.y - y.x * u.y,
            d = f.add(u, y, j),
            d = f.multiplyByScalar(d, g, d),
            h = f.add(h, d, h);
        s += g;
      }

      var c = 1 / (3 * s);
      return h = f.multiplyByScalar(h, c, h), r.projectPointOntoEllipsoid(h, t);
    }
  }, F.prototype._isHidden = function (e, t) {
    return !m(t.hierarchy) || n.prototype._isHidden.call(this, e, t);
  }, F.prototype._isOnTerrain = function (e, t) {
    var o = w.prototype._isOnTerrain.call(this, e, t),
        i = t.perPositionHeight,
        r = m(i) && (!i.isConstant || i.getValue(P.MINIMUM_VALUE));

    return o && !r;
  }, F.prototype._isDynamic = function (e, t) {
    return !t.hierarchy.isConstant || !G.isConstant(t.height) || !G.isConstant(t.extrudedHeight) || !G.isConstant(t.granularity) || !G.isConstant(t.stRotation) || !G.isConstant(t.outlineWidth) || !G.isConstant(t.perPositionHeight) || !G.isConstant(t.closeTop) || !G.isConstant(t.closeBottom) || !G.isConstant(t.zIndex) || !G.isConstant(t.arcType) || this._onTerrain && !G.isConstant(this._materialProperty);
  }, F.prototype._setStaticOptions = function (e, t) {
    var o = this._materialProperty instanceof T,
        i = this._options;
    i.vertexFormat = o ? D.VERTEX_FORMAT : A.MaterialSupport.TEXTURED.vertexFormat;
    var r = t.hierarchy.getValue(P.MINIMUM_VALUE);
    _(r) && (r = new v(r));
    var n,
        a = G.getValueOrUndefined(t.height, P.MINIMUM_VALUE),
        s = G.getValueOrDefault(t.heightReference, P.MINIMUM_VALUE, E.NONE),
        l = G.getValueOrUndefined(t.extrudedHeight, P.MINIMUM_VALUE),
        h = G.getValueOrDefault(t.extrudedHeightReference, P.MINIMUM_VALUE, E.NONE),
        p = G.getValueOrDefault(t.perPositionHeight, P.MINIMUM_VALUE, !1),
        a = w.getGeometryHeight(a, s);
    p ? (m(a) && (a = void 0, V(N)), s !== E.NONE && p && (a = void 0, V(b))) : (m(l) && !m(a) && (a = 0), n = w.computeGeometryOffsetAttribute(a, s, l, h)), i.polygonHierarchy = r, i.granularity = G.getValueOrUndefined(t.granularity, P.MINIMUM_VALUE), i.stRotation = G.getValueOrUndefined(t.stRotation, P.MINIMUM_VALUE), i.perPositionHeight = p, i.closeTop = G.getValueOrDefault(t.closeTop, P.MINIMUM_VALUE, !0), i.closeBottom = G.getValueOrDefault(t.closeBottom, P.MINIMUM_VALUE, !0), i.offsetAttribute = n, i.height = a, i.arcType = G.getValueOrDefault(t.arcType, P.MINIMUM_VALUE, y.GEODESIC), (l = w.getGeometryExtrudedHeight(l, h)) === w.CLAMP_TO_GROUND && (l = u.getMinimumMaximumHeights(H.computeRectangle(i, S)).minimumTerrainHeight), i.extrudedHeight = l;
  }, F.prototype._getIsClosed = function (e) {
    var t = e.height,
        o = e.extrudedHeight,
        i = m(o) && o !== t;
    return !e.perPositionHeight && (!i && 0 === t || i && e.closeTop && e.closeBottom);
  }, F.DynamicGeometryUpdater = W, m(Object.create) && ((W.prototype = Object.create(r.prototype)).constructor = W), W.prototype._isHidden = function (e, t, o) {
    return !m(this._options.polygonHierarchy) || r.prototype._isHidden.call(this, e, t, o);
  }, W.prototype._setOptions = function (e, t, o) {
    var i = this._options,
        r = G.getValueOrUndefined(t.hierarchy, o);
    _(r) ? i.polygonHierarchy = new v(r) : i.polygonHierarchy = r;
    var n,
        a = G.getValueOrUndefined(t.height, o),
        s = G.getValueOrDefault(t.heightReference, o, E.NONE),
        l = G.getValueOrDefault(t.extrudedHeightReference, o, E.NONE),
        h = G.getValueOrUndefined(t.extrudedHeight, o),
        p = G.getValueOrUndefined(t.perPositionHeight, o),
        a = w.getGeometryHeight(a, l);
    p ? (m(a) && (a = void 0, V(N)), s !== E.NONE && p && (a = void 0, V(b))) : (m(h) && !m(a) && (a = 0), n = w.computeGeometryOffsetAttribute(a, s, h, l)), i.granularity = G.getValueOrUndefined(t.granularity, o), i.stRotation = G.getValueOrUndefined(t.stRotation, o), i.perPositionHeight = G.getValueOrUndefined(t.perPositionHeight, o), i.closeTop = G.getValueOrDefault(t.closeTop, o, !0), i.closeBottom = G.getValueOrDefault(t.closeBottom, o, !0), i.offsetAttribute = n, i.height = a, i.arcType = G.getValueOrDefault(t.arcType, o, y.GEODESIC), (h = w.getGeometryExtrudedHeight(h, l)) === w.CLAMP_TO_GROUND && (h = u.getMinimumMaximumHeights(H.computeRectangle(i, S)).minimumTerrainHeight), i.extrudedHeight = h;
  }, F;
});