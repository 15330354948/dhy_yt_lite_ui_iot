"use strict";

define(["../Core/Check", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "./TextureMagnificationFilter", "./TextureMinificationFilter", "./TextureWrap"], function (o, m, f, i, l, p, u, s) {
  "use strict";

  function t(i) {
    i = m(i, m.EMPTY_OBJECT);
    var t = m(i.wrapS, s.CLAMP_TO_EDGE),
        r = m(i.wrapT, s.CLAMP_TO_EDGE),
        n = m(i.minificationFilter, u.LINEAR),
        e = m(i.magnificationFilter, p.LINEAR),
        a = f(i.maximumAnisotropy) ? i.maximumAnisotropy : 1;
    if (!s.validate(t)) throw new l("Invalid sampler.wrapS.");
    if (!s.validate(r)) throw new l("Invalid sampler.wrapT.");
    if (!u.validate(n)) throw new l("Invalid sampler.minificationFilter.");
    if (!p.validate(e)) throw new l("Invalid sampler.magnificationFilter.");
    o.typeOf.number.greaterThanOrEquals("maximumAnisotropy", a, 1), this._wrapS = t, this._wrapT = r, this._minificationFilter = n, this._magnificationFilter = e, this._maximumAnisotropy = a;
  }

  return i(t.prototype, {
    wrapS: {
      get: function get() {
        return this._wrapS;
      }
    },
    wrapT: {
      get: function get() {
        return this._wrapT;
      }
    },
    minificationFilter: {
      get: function get() {
        return this._minificationFilter;
      }
    },
    magnificationFilter: {
      get: function get() {
        return this._magnificationFilter;
      }
    },
    maximumAnisotropy: {
      get: function get() {
        return this._maximumAnisotropy;
      }
    }
  }), t.equals = function (i, t) {
    return i === t || f(i) && f(t) && i._wrapS === t._wrapS && i._wrapT === t._wrapT && i._minificationFilter === t._minificationFilter && i._magnificationFilter === t._magnificationFilter && i._maximumAnisotropy === t._maximumAnisotropy;
  }, t;
});