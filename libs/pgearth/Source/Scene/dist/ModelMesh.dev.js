"use strict";

define(["../Core/defineProperties"], function (t) {
  "use strict";

  function e(t, e, i) {
    for (var n = [], r = t.primitives, a = r.length, s = 0; s < a; ++s) {
      var o = r[s];
      n[s] = e[o.material];
    }

    this._name = t.name, this._materials = n, this._id = i;
  }

  return t(e.prototype, {
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
    materials: {
      get: function get() {
        return this._materials;
      }
    }
  }), e;
});