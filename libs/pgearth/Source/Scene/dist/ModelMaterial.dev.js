"use strict";

define(["../Core/defined", "../Core/defineProperties", "../Core/DeveloperError"], function (r, e, a) {
  "use strict";

  function t(e, t, i) {
    this._name = t.name, this._id = i, this._uniformMap = e._uniformMaps[i], this._technique = void 0, this._program = void 0, this._values = void 0;
  }

  return e(t.prototype, {
    name: {
      get: function get() {
        return this._name;
      }
    },
    id: {
      get: function get() {
        return this._id;
      }
    }
  }), t.prototype.setValue = function (e, t) {
    if (!r(e)) throw new a("name is required.");
    var i = "u_" + e,
        n = this._uniformMap.values[i];
    if (!r(n)) throw new a("name must match a parameter name in the material's technique that is targetable and not optimized out.");
    n.value = n.clone(t, n.value);
  }, t.prototype.getValue = function (e) {
    if (!r(e)) throw new a("name is required.");
    var t = "u_" + e,
        i = this._uniformMap.values[t];
    if (r(i)) return i.value;
  }, t;
});