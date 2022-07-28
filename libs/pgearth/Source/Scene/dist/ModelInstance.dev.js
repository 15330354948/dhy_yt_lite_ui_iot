"use strict";

define(["../Core/defineProperties", "../Core/Matrix4"], function (i, n) {
  "use strict";

  function t(i, t, e) {
    this.primitive = i, this._modelMatrix = n.clone(t), this._instanceId = e;
  }

  return i(t.prototype, {
    instanceId: {
      get: function get() {
        return this._instanceId;
      }
    },
    model: {
      get: function get() {
        return this.primitive._model;
      }
    },
    modelMatrix: {
      get: function get() {
        return n.clone(this._modelMatrix);
      },
      set: function set(i) {
        n.clone(i, this._modelMatrix), this.primitive.expandBoundingSphere(this._modelMatrix), this.primitive._dirty = !0;
      }
    }
  }), t;
});