"use strict";

define(["../../Source/Core/Check", "../../Source/Core/AssociativeArray", "../../Source/Core/RuntimeError"], function (e, t, i) {
  function r(e) {
    this.viewer = e, this._items = new t(), this.items = this._items._array, this.length = this.items.length;
  }

  return r.prototype.add = function (t) {
    e.typeOf.object("graphic", t);
    var r = t.id,
        n = this._items;
    if (n.contains(r)) throw new i("A Graphic with id " + r + "already exist in this collection");
    return n.set(r, t), this.viewer.entities.add(t);
  }, r.prototype.remove = function (t) {
    return e.typeOf.object("graphic", t), this._items.remove(t.id), this.viewer.entities.remove(t);
  }, r.prototype.findGraphicById = function (t) {
    return e.typeOf.string("id", t), this._items.get(t);
  }, r;
});