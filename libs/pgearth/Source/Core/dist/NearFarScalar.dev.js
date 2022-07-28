"use strict";

define(["./defaultValue", "./defined", "./DeveloperError"], function (u, n, t) {
  "use strict";

  function f(e, r, a, n) {
    this.near = u(e, 0), this.nearValue = u(r, 0), this.far = u(a, 1), this.farValue = u(n, 0);
  }

  return f.clone = function (e, r) {
    if (n(e)) return n(r) ? (r.near = e.near, r.nearValue = e.nearValue, r.far = e.far, r.farValue = e.farValue, r) : new f(e.near, e.nearValue, e.far, e.farValue);
  }, f.packedLength = 4, f.pack = function (e, r, a) {
    if (!n(e)) throw new t("value is required");
    if (!n(r)) throw new t("array is required");
    return a = u(a, 0), r[a++] = e.near, r[a++] = e.nearValue, r[a++] = e.far, r[a] = e.farValue, r;
  }, f.unpack = function (e, r, a) {
    if (!n(e)) throw new t("array is required");
    return r = u(r, 0), n(a) || (a = new f()), a.near = e[r++], a.nearValue = e[r++], a.far = e[r++], a.farValue = e[r], a;
  }, f.equals = function (e, r) {
    return e === r || n(e) && n(r) && e.near === r.near && e.nearValue === r.nearValue && e.far === r.far && e.farValue === r.farValue;
  }, f.prototype.clone = function (e) {
    return f.clone(this, e);
  }, f.prototype.equals = function (e) {
    return f.equals(this, e);
  }, f;
});