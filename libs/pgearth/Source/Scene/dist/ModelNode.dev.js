"use strict";

define(["../Core/defineProperties", "../Core/Matrix4"], function (t, o) {
  "use strict";

  function i(t, i, e, r, n) {
    this._model = t, this._runtimeNode = e, this._name = i.name, this._id = r, this.useMatrix = !1, this._show = !0, this._matrix = o.clone(n), this._originalMatrix = o.clone(n);
  }

  return t(i.prototype, {
    name: {
      get: function get() {
        return this._name;
      }
    },
    id: {
      get: function get() {
        return this._id;
      }
    },
    show: {
      get: function get() {
        return this._show;
      },
      set: function set(t) {
        this._show !== t && (this._show = t, this._model._perNodeShowDirty = !0);
      }
    },
    matrix: {
      get: function get() {
        return this._matrix;
      },
      set: function set(t) {
        this._matrix = o.clone(t, this._matrix), this.useMatrix = !0;
        var i = this._model;
        i._pgEarthAnimationsDirty = !0, this._runtimeNode.dirtyNumber = i._maxDirtyNumber;
      }
    },
    originalMatrix: {
      get: function get() {
        return this._originalMatrix;
      }
    }
  }), i.prototype.setMatrix = function (t) {
    o.clone(t, this._matrix);
  }, i;
});