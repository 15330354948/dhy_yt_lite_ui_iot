"use strict";

define(["../Core/BoundingSphere", "../Core/Check", "../Core/defined", "../Core/destroyObject", "../Core/DeveloperError", "../Scene/GroundPrimitive", "../Scene/MaterialAppearance", "../Scene/PerInstanceColorAppearance", "../Scene/Primitive", "./BoundingSphereState", "./ColorMaterialProperty", "./MaterialProperty", "./Property"], function (n, v, g, i, s, f, P, w, I, a, S, U, A) {
  "use strict";

  function e(e, t, i) {
    v.defined("geometryUpdater", e), v.defined("primitives", t), v.defined("orderedGroundPrimitives", i), this._primitives = t, this._orderedGroundPrimitives = i, this._primitive = void 0, this._outlinePrimitive = void 0, this._geometryUpdater = e, this._options = e._options, this._entity = e._entity, this._material = void 0;
  }

  return e.prototype._isHidden = function (e, t, i) {
    return !e.isShowing || !e.isAvailable(i) || !A.getValueOrDefault(t.show, i, !0);
  }, e.prototype._setOptions = s.throwInstantiationError, e.prototype.update = function (e) {
    v.defined("time", e);
    var t = this._geometryUpdater,
        i = t._onTerrain,
        r = this._primitives,
        o = this._orderedGroundPrimitives;
    i ? o.remove(this._primitive) : (r.removeAndDestroy(this._primitive), r.removeAndDestroy(this._outlinePrimitive), this._outlinePrimitive = void 0), this._primitive = void 0;
    var n,
        s,
        a,
        d,
        p,
        h,
        l,
        m,
        u,
        y,
        _ = this._entity,
        c = _[this._geometryUpdater._geometryPropertyName];
    this._setOptions(_, c, e), this._isHidden(_, c, e) || (n = this._geometryUpdater.shadowsProperty.getValue(e), s = this._options, g(c.fill) && !c.fill.getValue(e) || (d = (a = t.fillMaterialProperty) instanceof S, p = t._getIsClosed(s), m = d ? new w({
      closed: p,
      flat: i && !t._supportsMaterialsforEntitiesOnTerrain
    }) : (h = U.getValue(e, a, this._material), this._material = h, new P({
      material: h,
      translucent: h.isTranslucent(),
      closed: p
    })), i ? (s.vertexFormat = w.VERTEX_FORMAT, this._primitive = o.add(new f({
      geometryInstances: this._geometryUpdater.createFillGeometryInstance(e),
      appearance: m,
      asynchronous: !1,
      shadows: n,
      classificationType: this._geometryUpdater.classificationTypeProperty.getValue(e)
    }), A.getValueOrUndefined(this._geometryUpdater.zIndex, e))) : (s.vertexFormat = m.vertexFormat, l = this._geometryUpdater.createFillGeometryInstance(e), d && (m.translucent = 255 !== l.attributes.color.value[3]), this._primitive = r.add(new I({
      geometryInstances: l,
      appearance: m,
      asynchronous: !1,
      shadows: n
    })))), !i && g(c.outline) && c.outline.getValue(e) && (u = this._geometryUpdater.createOutlineGeometryInstance(e), y = A.getValueOrDefault(c.outlineWidth, e, 1), this._outlinePrimitive = r.add(new I({
      geometryInstances: u,
      appearance: new w({
        flat: !0,
        translucent: 255 !== u.attributes.color.value[3],
        renderState: {
          lineWidth: t._scene.clampLineWidth(y)
        }
      }),
      asynchronous: !1,
      shadows: n
    }))));
  }, e.prototype.getBoundingSphere = function (e) {
    if (!g(e)) throw new s("result is required.");
    var t,
        i = this._entity,
        r = this._primitive,
        o = this._outlinePrimitive;
    return g(r) && r.show && r.ready && (t = r.getGeometryInstanceAttributes(i), g(t) && g(t.boundingSphere)) || g(o) && o.show && o.ready && (t = o.getGeometryInstanceAttributes(i), g(t) && g(t.boundingSphere)) ? (n.clone(t.boundingSphere, e), a.DONE) : g(r) && !r.ready || g(o) && !o.ready ? a.PENDING : a.FAILED;
  }, e.prototype.isDestroyed = function () {
    return !1;
  }, e.prototype.destroy = function () {
    var e = this._primitives,
        t = this._orderedGroundPrimitives;
    this._geometryUpdater._onTerrain ? t.remove(this._primitive) : e.removeAndDestroy(this._primitive), e.removeAndDestroy(this._outlinePrimitive), i(this);
  }, e;
});