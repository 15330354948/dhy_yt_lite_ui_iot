"use strict";

define(["../../Source/Core/createGuid", "../../Source/Core/Check", "../../Source/Core/AssociativeArray", "../../Source/Core/RuntimeError"], function (e, i, t, r) {
  function s(i) {
    this._items = new t(), this.id = i && i.id || e(), this.items = this._items._array, this.length = this._items.length;
  }

  return s.prototype.findPrimitiveById = function (e) {
    return i.typeOf.string("id", e), this._items.get(e);
  }, s.prototype.add = function (e) {
    i.typeOf.object("primitive", e);
    var t = e.id,
        s = this._items;
    if (s.contains(t)) throw new r("A primitive with id " + t + " already exist in this collection");
    return s.set(t, e), this.viewer ? (this.viewer.scene.primitives.add(e), this.viewer.scene.requestRender(), e) : e;
  }, s.prototype.remove = function (e) {
    if (i.typeOf.object("primitive", e)) this._items.remove(e.id);else {
      if (!i.typeOf.string("primitive", e)) throw new Error("type error");

      this._items.remove(e);
    }
  }, s;
});