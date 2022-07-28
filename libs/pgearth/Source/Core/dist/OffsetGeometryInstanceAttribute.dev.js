"use strict";

define(["./Check", "./ComponentDatatype", "./defaultValue", "./defined", "./defineProperties"], function (n, e, r, o, t) {
  "use strict";

  function u(e, t, n) {
    e = r(e, 0), t = r(t, 0), n = r(n, 0), this.value = new Float32Array([e, t, n]);
  }

  return t(u.prototype, {
    componentDatatype: {
      get: function get() {
        return e.FLOAT;
      }
    },
    componentsPerAttribute: {
      get: function get() {
        return 3;
      }
    },
    normalize: {
      get: function get() {
        return !1;
      }
    }
  }), u.fromCartesian3 = function (e) {
    return n.defined("offset", e), new u(e.x, e.y, e.z);
  }, u.toValue = function (e, t) {
    return n.defined("offset", e), o(t) || (t = new Float32Array([e.x, e.y, e.z])), t[0] = e.x, t[1] = e.y, t[2] = e.z, t;
  }, u;
});