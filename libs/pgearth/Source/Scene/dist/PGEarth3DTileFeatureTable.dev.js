"use strict";

define(["../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined"], function (y, n, u) {
  "use strict";

  function e(e, t) {
    this.json = e, this.buffer = t, this._cachedTypedArrays = {}, this.featuresLength = 0;
  }

  function p(e, t, r, f, n, o) {
    var s = e._cachedTypedArrays,
        a = s[t];
    return u(a) || (a = y.createArrayBufferView(r, e.buffer.buffer, e.buffer.byteOffset + o, n * f), s[t] = a), a;
  }

  return e.prototype.getGlobalProperty = function (e, t, r) {
    var f = this.json[e];
    if (u(f)) return u(f.byteOffset) ? p(this, e, t = n(t, y.UNSIGNED_INT), r = n(r, 1), 1, f.byteOffset) : f;
  }, e.prototype.getPropertyArray = function (e, t, r) {
    var f,
        n,
        o,
        s,
        a,
        i = this.json[e];
    if (u(i)) return u(i.byteOffset) ? (u(i.componentType) && (t = y.fromName(i.componentType)), p(this, e, t, r, this.featuresLength, i.byteOffset)) : (f = e, n = t, o = i, s = this._cachedTypedArrays, a = s[f], u(a) || (a = y.createTypedArray(n, o), s[f] = a), a);
  }, e.prototype.getProperty = function (e, t, r, f, n) {
    var o = this.json[e];

    if (u(o)) {
      var s = this.getPropertyArray(e, t, r);
      if (1 === r) return s[f];

      for (var a = 0; a < r; ++a) {
        n[a] = s[r * f + a];
      }

      return n;
    }
  }, e;
});