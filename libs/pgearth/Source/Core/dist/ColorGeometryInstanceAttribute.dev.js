"use strict";

define(["./Color", "./ComponentDatatype", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError"], function (n, e, u, o, t, r) {
  "use strict";

  function a(e, t, o, r) {
    e = u(e, 1), t = u(t, 1), o = u(o, 1), r = u(r, 1), this.value = new Uint8Array([n.floatToByte(e), n.floatToByte(t), n.floatToByte(o), n.floatToByte(r)]);
  }

  return t(a.prototype, {
    componentDatatype: {
      get: function get() {
        return e.UNSIGNED_BYTE;
      }
    },
    componentsPerAttribute: {
      get: function get() {
        return 4;
      }
    },
    normalize: {
      get: function get() {
        return !0;
      }
    }
  }), a.fromColor = function (e) {
    if (!o(e)) throw new r("color is required.");
    return new a(e.red, e.green, e.blue, e.alpha);
  }, a.toValue = function (e, t) {
    if (!o(e)) throw new r("color is required.");
    return o(t) ? e.toBytes(t) : new Uint8Array(e.toBytes());
  }, a.equals = function (e, t) {
    return e === t || o(e) && o(t) && e.value[0] === t.value[0] && e.value[1] === t.value[1] && e.value[2] === t.value[2] && e.value[3] === t.value[3];
  }, a;
});