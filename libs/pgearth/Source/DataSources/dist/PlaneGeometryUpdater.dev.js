"use strict";

define(["../Core/Cartesian2", "../Core/Cartesian3", "../Core/Check", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/defined", "../Core/DeveloperError", "../Core/DistanceDisplayConditionGeometryInstanceAttribute", "../Core/GeometryInstance", "../Core/Iso8601", "../Core/Math", "../Core/Matrix3", "../Core/Matrix4", "../Core/PlaneGeometry", "../Core/PlaneOutlineGeometry", "../Core/Quaternion", "../Core/ShowGeometryInstanceAttribute", "../Scene/MaterialAppearance", "../Scene/PerInstanceColorAppearance", "./ColorMaterialProperty", "./DynamicGeometryUpdater", "./GeometryUpdater", "./Property"], function (y, h, u, C, f, _, w, g, P, i, v, M, V, D, c, O, b, r, a, I, s, o, E) {
  "use strict";

  var l = new h(),
      U = new C();

  function n(e) {
    this.id = e, this.vertexFormat = void 0, this.plane = void 0, this.dimensions = void 0;
  }

  function e(e, t) {
    o.call(this, {
      entity: e,
      scene: t,
      geometryOptions: new n(e),
      geometryPropertyName: "plane",
      observedPropertyNames: ["availability", "position", "orientation", "plane"]
    }), this._onEntityPropertyChanged(e, "plane", e.plane, void 0);
  }

  function t(e, t, o) {
    s.call(this, e, t, o);
  }

  _(Object.create) && ((e.prototype = Object.create(o.prototype)).constructor = e), e.prototype.createFillGeometryInstance = function (e) {
    if (u.defined("time", e), !this._fillEnabled) throw new w("This instance does not represent a filled geometry.");

    var t,
        o = this._entity,
        n = o.isAvailable(e),
        i = new b(n && o.isShowing && this._showProperty.getValue(e) && this._fillProperty.getValue(e)),
        r = this._distanceDisplayConditionProperty.getValue(e),
        a = g.fromDistanceDisplayCondition(r),
        s = this._materialProperty instanceof I ? (_(this._materialProperty.color) && (this._materialProperty.color.isConstant || n) && (t = this._materialProperty.color.getValue(e, U)), _(t) || (t = C.WHITE), {
      show: i,
      distanceDisplayCondition: a,
      color: f.fromColor(t)
    }) : {
      show: i,
      distanceDisplayCondition: a
    },
        l = o.plane,
        p = this._options,
        c = o.computeModelMatrix(e),
        d = E.getValueOrDefault(l.plane, e, p.plane),
        m = E.getValueOrUndefined(l.dimensions, e, p.dimensions),
        c = F(p.plane = d, p.dimensions = m, c, this._scene.mapProjection.ellipsoid, c);

    return new P({
      id: o,
      geometry: new D(this._options),
      modelMatrix: c,
      attributes: s
    });
  }, e.prototype.createOutlineGeometryInstance = function (e) {
    if (u.defined("time", e), !this._outlineEnabled) throw new w("This instance does not represent an outlined geometry.");

    var t = this._entity,
        o = t.isAvailable(e),
        n = E.getValueOrDefault(this._outlineColorProperty, e, C.BLACK, U),
        i = this._distanceDisplayConditionProperty.getValue(e),
        r = t.plane,
        a = this._options,
        s = t.computeModelMatrix(e),
        l = E.getValueOrDefault(r.plane, e, a.plane),
        p = E.getValueOrUndefined(r.dimensions, e, a.dimensions),
        s = F(a.plane = l, a.dimensions = p, s, this._scene.mapProjection.ellipsoid, s);

    return new P({
      id: t,
      geometry: new c(),
      modelMatrix: s,
      attributes: {
        show: new b(o && t.isShowing && this._showProperty.getValue(e) && this._showOutlineProperty.getValue(e)),
        color: f.fromColor(n),
        distanceDisplayCondition: g.fromDistanceDisplayCondition(i)
      }
    });
  }, e.prototype._isHidden = function (e, t) {
    return !_(t.plane) || !_(t.dimensions) || !_(e.position) || o.prototype._isHidden.call(this, e, t);
  }, e.prototype._getIsClosed = function (e) {
    return !1;
  }, e.prototype._isDynamic = function (e, t) {
    return !(e.position.isConstant && E.isConstant(e.orientation) && t.plane.isConstant && t.dimensions.isConstant && E.isConstant(t.outlineWidth));
  }, e.prototype._setStaticOptions = function (e, t) {
    var o = this._materialProperty instanceof I,
        n = this._options;
    n.vertexFormat = o ? a.VERTEX_FORMAT : r.MaterialSupport.TEXTURED.vertexFormat, n.plane = t.plane.getValue(i.MINIMUM_VALUE, n.plane), n.dimensions = t.dimensions.getValue(i.MINIMUM_VALUE, n.dimensions);
  }, e.DynamicGeometryUpdater = t, _(Object.create) && ((t.prototype = Object.create(s.prototype)).constructor = t), t.prototype._isHidden = function (e, t, o) {
    var n = this._options,
        i = E.getValueOrUndefined(e.position, o, l);
    return !_(i) || !_(n.plane) || !_(n.dimensions) || s.prototype._isHidden.call(this, e, t, o);
  }, t.prototype._setOptions = function (e, t, o) {
    var n = this._options;
    n.plane = E.getValueOrDefault(t.plane, o, n.plane), n.dimensions = E.getValueOrUndefined(t.dimensions, o, n.dimensions);
  };
  var A = new h(),
      x = new h(),
      G = new h(),
      S = new h(),
      T = new h(),
      N = new O(),
      j = new M();

  function F(e, t, o, n, i) {
    var r = e.normal,
        a = e.distance,
        s = h.multiplyByScalar(r, -a, G),
        s = V.multiplyByPoint(o, s, s),
        l = V.multiplyByPointAsVector(o, r, S);
    h.normalize(l, l);
    var p = n.geodeticSurfaceNormal(s, x);
    v.equalsEpsilon(Math.abs(h.dot(p, l)), 1, v.EPSILON8) && (p = h.clone(h.UNIT_Z, p));
    var c = h.cross(p, l, A),
        p = h.cross(l, c, p);
    h.normalize(c, c), h.normalize(p, p);
    var d = j;
    M.setColumn(d, 0, c, d), M.setColumn(d, 1, p, d), M.setColumn(d, 2, l, d);
    var m = O.fromRotationMatrix(d, N),
        u = y.clone(t, T);
    return u.z = 1, V.fromTranslationQuaternionRotationScale(s, m, u, i);
  }

  return e.createPrimitiveMatrix = F, e;
});