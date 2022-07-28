"use strict";

define(["../Core/ArcType", "../Core/Cartesian3", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/destroyObject", "../Core/GeometryInstance", "../Core/Matrix4", "../Core/PolylineGeometry", "./PolylineColorAppearance", "./Primitive"], function (o, h, s, t, d, i, n, l, m, a, p) {
  "use strict";

  function e(i) {
    i = t(i, t.EMPTY_OBJECT), this.length = t(i.length, 1e7), this._length = void 0, this.width = t(i.width, 2), this._width = void 0, this.show = t(i.show, !0), this.modelMatrix = l.clone(t(i.modelMatrix, l.IDENTITY)), this._modelMatrix = new l(), this.id = i.id, this._id = void 0, this._primitive = void 0;
  }

  return e.prototype.update = function (i) {
    var t, e, r;
    this.show && (d(this._primitive) && l.equals(this._modelMatrix, this.modelMatrix) && this._length === this.length && this._width === this.width && this._id === this.id || (this._modelMatrix = l.clone(this.modelMatrix, this._modelMatrix), this._length = this.length, this._width = this.width, this._id = this.id, d(this._primitive) && this._primitive.destroy(), 0 === this.modelMatrix[12] && 0 === this.modelMatrix[13] && 0 === this.modelMatrix[14] && (this.modelMatrix[14] = .01), t = new n({
      geometry: new m({
        positions: [h.ZERO, h.UNIT_X],
        width: this.width,
        vertexFormat: a.VERTEX_FORMAT,
        colors: [s.RED, s.RED],
        arcType: o.NONE
      }),
      modelMatrix: l.multiplyByUniformScale(this.modelMatrix, this.length, new l()),
      id: this.id,
      pickPrimitive: this
    }), e = new n({
      geometry: new m({
        positions: [h.ZERO, h.UNIT_Y],
        width: this.width,
        vertexFormat: a.VERTEX_FORMAT,
        colors: [s.GREEN, s.GREEN],
        arcType: o.NONE
      }),
      modelMatrix: l.multiplyByUniformScale(this.modelMatrix, this.length, new l()),
      id: this.id,
      pickPrimitive: this
    }), r = new n({
      geometry: new m({
        positions: [h.ZERO, h.UNIT_Z],
        width: this.width,
        vertexFormat: a.VERTEX_FORMAT,
        colors: [s.BLUE, s.BLUE],
        arcType: o.NONE
      }),
      modelMatrix: l.multiplyByUniformScale(this.modelMatrix, this.length, new l()),
      id: this.id,
      pickPrimitive: this
    }), this._primitive = new p({
      geometryInstances: [t, e, r],
      appearance: new a(),
      asynchronous: !1
    })), this._primitive.update(i));
  }, e.prototype.isDestroyed = function () {
    return !1;
  }, e.prototype.destroy = function () {
    return this._primitive = this._primitive && this._primitive.destroy(), i(this);
  }, e;
});