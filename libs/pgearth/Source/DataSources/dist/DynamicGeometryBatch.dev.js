"use strict";

define(["../Core/AssociativeArray", "../Core/defined", "./BoundingSphereState"], function (i, r, n) {
  "use strict";

  function e(e, t) {
    this._primitives = e, this._orderedGroundPrimitives = t, this._dynamicUpdaters = new i();
  }

  return e.prototype.add = function (e, t) {
    this._dynamicUpdaters.set(t.id, t.createDynamicUpdater(this._primitives, this._orderedGroundPrimitives));
  }, e.prototype.remove = function (e) {
    var t = e.id,
        i = this._dynamicUpdaters.get(t);

    r(i) && (this._dynamicUpdaters.remove(t), i.destroy());
  }, e.prototype.update = function (e) {
    for (var t = this._dynamicUpdaters.values, i = 0, r = t.length; i < r; i++) {
      t[i].update(e);
    }

    return !0;
  }, e.prototype.removeAllPrimitives = function () {
    for (var e = this._dynamicUpdaters.values, t = 0, i = e.length; t < i; t++) {
      e[t].destroy();
    }

    this._dynamicUpdaters.removeAll();
  }, e.prototype.getBoundingSphere = function (e, t) {
    return e = this._dynamicUpdaters.get(e.id), r(e) && r(e.getBoundingSphere) ? e.getBoundingSphere(t) : n.FAILED;
  }, e;
});