"use strict";

define(["../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Color", "../Core/defined", "../Core/DeveloperError", "../Core/FeatureDetection", "../Core/Matrix2", "../Core/Matrix3", "../Core/Matrix4", "../Core/RuntimeError"], function (a, n, o, e, i, s, t, l, u, h, r) {
  "use strict";

  if (!t.supportsTypedArrays()) return {};

  function v(t, e, i, s) {
    this.name = i, this.value = void 0, this._value = 0, this._gl = t, this._location = s;
  }

  function _(t, e, i, s) {
    this.name = i, this.value = void 0, this._value = new a(), this._gl = t, this._location = s;
  }

  function c(t, e, i, s) {
    this.name = i, this.value = void 0, this._value = void 0, this._gl = t, this._location = s;
  }

  function f(t, e, i, s) {
    this.name = i, this.value = void 0, this._value = void 0, this._gl = t, this._location = s;
  }

  function p(t, e, i, s) {
    this.name = i, this.value = void 0, this._gl = t, this._location = s, this.textureUnitIndex = void 0;
  }

  function m(t, e, i, s) {
    this.name = i, this.value = void 0, this._value = 0, this._gl = t, this._location = s;
  }

  function y(t, e, i, s) {
    this.name = i, this.value = void 0, this._value = new a(), this._gl = t, this._location = s;
  }

  function d(t, e, i, s) {
    this.name = i, this.value = void 0, this._value = new n(), this._gl = t, this._location = s;
  }

  function g(t, e, i, s) {
    this.name = i, this.value = void 0, this._value = new o(), this._gl = t, this._location = s;
  }

  v.prototype.set = function () {
    this.value !== this._value && (this._value = this.value, this._gl.uniform1f(this._location, this.value));
  }, _.prototype.set = function () {
    var t = this.value;
    a.equals(t, this._value) || (a.clone(t, this._value), this._gl.uniform2f(this._location, t.x, t.y));
  }, c.prototype.set = function () {
    var t = this.value;
    if (i(t.red)) e.equals(t, this._value) || (this._value = e.clone(t, this._value), this._gl.uniform3f(this._location, t.red, t.green, t.blue));else {
      if (!i(t.x)) throw new s('Invalid vec3 value for uniform "' + this.name + '".');
      n.equals(t, this._value) || (this._value = n.clone(t, this._value), this._gl.uniform3f(this._location, t.x, t.y, t.z));
    }
  }, f.prototype.set = function () {
    var t = this.value;
    if (i(t.red)) e.equals(t, this._value) || (this._value = e.clone(t, this._value), this._gl.uniform4f(this._location, t.red, t.green, t.blue, t.alpha));else {
      if (!i(t.x)) throw new s('Invalid vec4 value for uniform "' + this.name + '".');
      o.equals(t, this._value) || (this._value = o.clone(t, this._value), this._gl.uniform4f(this._location, t.x, t.y, t.z, t.w));
    }
  }, p.prototype.set = function () {
    var t = this._gl;
    t.activeTexture(t.TEXTURE0 + this.textureUnitIndex);
    var e = this.value;
    t.bindTexture(e._target, e._texture);
  }, p.prototype._setSampler = function (t) {
    return this.textureUnitIndex = t, this._gl.uniform1i(this._location, t), t + 1;
  }, m.prototype.set = function () {
    this.value !== this._value && (this._value = this.value, this._gl.uniform1i(this._location, this.value));
  }, y.prototype.set = function () {
    var t = this.value;
    a.equals(t, this._value) || (a.clone(t, this._value), this._gl.uniform2i(this._location, t.x, t.y));
  }, d.prototype.set = function () {
    var t = this.value;
    n.equals(t, this._value) || (n.clone(t, this._value), this._gl.uniform3i(this._location, t.x, t.y, t.z));
  }, g.prototype.set = function () {
    var t = this.value;
    o.equals(t, this._value) || (o.clone(t, this._value), this._gl.uniform4i(this._location, t.x, t.y, t.z, t.w));
  };
  var w = new Float32Array(4);

  function C(t, e, i, s) {
    this.name = i, this.value = void 0, this._value = new l(), this._gl = t, this._location = s;
  }

  C.prototype.set = function () {
    var t;
    l.equalsArray(this.value, this._value, 0) || (l.clone(this.value, this._value), t = l.toArray(this.value, w), this._gl.uniformMatrix2fv(this._location, !1, t));
  };

  var x = new Float32Array(9);

  function A(t, e, i, s) {
    this.name = i, this.value = void 0, this._value = new u(), this._gl = t, this._location = s;
  }

  A.prototype.set = function () {
    var t;
    u.equalsArray(this.value, this._value, 0) || (u.clone(this.value, this._value), t = u.toArray(this.value, x), this._gl.uniformMatrix3fv(this._location, !1, t));
  };

  var T = new Float32Array(16);

  function E(t, e, i, s) {
    this.name = i, this.value = void 0, this._value = new h(), this._gl = t, this._location = s;
  }

  return E.prototype.set = function () {
    var t;
    h.equalsArray(this.value, this._value, 0) || (h.clone(this.value, this._value), t = h.toArray(this.value, T), this._gl.uniformMatrix4fv(this._location, !1, t));
  }, function (t, e, i, s) {
    switch (e.type) {
      case t.FLOAT:
        return new v(t, 0, i, s);

      case t.FLOAT_VEC2:
        return new _(t, 0, i, s);

      case t.FLOAT_VEC3:
        return new c(t, 0, i, s);

      case t.FLOAT_VEC4:
        return new f(t, 0, i, s);

      case t.SAMPLER_2D:
      case t.SAMPLER_CUBE:
        return new p(t, 0, i, s);

      case t.INT:
      case t.BOOL:
        return new m(t, 0, i, s);

      case t.INT_VEC2:
      case t.BOOL_VEC2:
        return new y(t, 0, i, s);

      case t.INT_VEC3:
      case t.BOOL_VEC3:
        return new d(t, 0, i, s);

      case t.INT_VEC4:
      case t.BOOL_VEC4:
        return new g(t, 0, i, s);

      case t.FLOAT_MAT2:
        return new C(t, 0, i, s);

      case t.FLOAT_MAT3:
        return new A(t, 0, i, s);

      case t.FLOAT_MAT4:
        return new E(t, 0, i, s);

      default:
        throw new r("Unrecognized uniform type: " + e.type + ' for uniform "' + i + '".');
    }
  };
});