"use strict";

define(["./defaultValue", "./defined", "./defineProperties", "./DeveloperError"], function (t, i, r, a) {
  "use strict";

  function u(r, e) {
    r = t(r, 0), this._near = r, e = t(e, Number.MAX_VALUE), this._far = e;
  }

  return r(u.prototype, {
    near: {
      get: function get() {
        return this._near;
      },
      set: function set(r) {
        this._near = r;
      }
    },
    far: {
      get: function get() {
        return this._far;
      },
      set: function set(r) {
        this._far = r;
      }
    }
  }), u.packedLength = 2, u.pack = function (r, e, n) {
    if (!i(r)) throw new a("value is required");
    if (!i(e)) throw new a("array is required");
    return n = t(n, 0), e[n++] = r.near, e[n] = r.far, e;
  }, u.unpack = function (r, e, n) {
    if (!i(r)) throw new a("array is required");
    return e = t(e, 0), i(n) || (n = new u()), n.near = r[e++], n.far = r[e], n;
  }, u.equals = function (r, e) {
    return r === e || i(r) && i(e) && r.near === e.near && r.far === e.far;
  }, u.clone = function (r, e) {
    if (i(r)) return i(e) || (e = new u()), e.near = r.near, e.far = r.far, e;
  }, u.prototype.clone = function (r) {
    return u.clone(this, r);
  }, u.prototype.equals = function (r) {
    return u.equals(this, r);
  }, u;
});