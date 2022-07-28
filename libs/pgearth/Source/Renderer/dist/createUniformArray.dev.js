"use strict";

define(["../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Color", "../Core/defined", "../Core/DeveloperError", "../Core/Matrix2", "../Core/Matrix3", "../Core/Matrix4", "../Core/RuntimeError"], function (o, l, h, u, v, _, c, f, g, i) {
  "use strict";

  function n(t, e, r, a) {
    var i = a.length;
    this.name = r, this.value = new Array(i), this._value = new Float32Array(i), this._gl = t, this._location = a[0];
  }

  function s(t, e, r, a) {
    var i = a.length;
    this.name = r, this.value = new Array(i), this._value = new Float32Array(2 * i), this._gl = t, this._location = a[0];
  }

  function y(t, e, r, a) {
    var i = a.length;
    this.name = r, this.value = new Array(i), this._value = new Float32Array(3 * i), this._gl = t, this._location = a[0];
  }

  function A(t, e, r, a) {
    var i = a.length;
    this.name = r, this.value = new Array(i), this._value = new Float32Array(4 * i), this._gl = t, this._location = a[0];
  }

  function w(t, e, r, a) {
    var i = a.length;
    this.name = r, this.value = new Array(i), this._value = new Float32Array(i), this._gl = t, this._locations = a, this.textureUnitIndex = void 0;
  }

  function p(t, e, r, a) {
    var i = a.length;
    this.name = r, this.value = new Array(i), this._value = new Int32Array(i), this._gl = t, this._location = a[0];
  }

  function m(t, e, r, a) {
    var i = a.length;
    this.name = r, this.value = new Array(i), this._value = new Int32Array(2 * i), this._gl = t, this._location = a[0];
  }

  function C(t, e, r, a) {
    var i = a.length;
    this.name = r, this.value = new Array(i), this._value = new Int32Array(3 * i), this._gl = t, this._location = a[0];
  }

  function T(t, e, r, a) {
    var i = a.length;
    this.name = r, this.value = new Array(i), this._value = new Int32Array(4 * i), this._gl = t, this._location = a[0];
  }

  function x(t, e, r, a) {
    var i = a.length;
    this.name = r, this.value = new Array(i), this._value = new Float32Array(4 * i), this._gl = t, this._location = a[0];
  }

  function d(t, e, r, a) {
    var i = a.length;
    this.name = r, this.value = new Array(i), this._value = new Float32Array(9 * i), this._gl = t, this._location = a[0];
  }

  function E(t, e, r, a) {
    var i = a.length;
    this.name = r, this.value = new Array(i), this._value = new Float32Array(16 * i), this._gl = t, this._location = a[0];
  }

  return n.prototype.set = function () {
    for (var t = this.value, e = t.length, r = this._value, a = !1, i = 0; i < e; ++i) {
      var n = t[i];
      n !== r[i] && (r[i] = n, a = !0);
    }

    a && this._gl.uniform1fv(this._location, r);
  }, s.prototype.set = function () {
    for (var t = this.value, e = t.length, r = this._value, a = !1, i = 0, n = 0; n < e; ++n) {
      var s = t[n];
      o.equalsArray(s, r, i) || (o.pack(s, r, i), a = !0), i += 2;
    }

    a && this._gl.uniform2fv(this._location, r);
  }, y.prototype.set = function () {
    for (var t = this.value, e = t.length, r = this._value, a = !1, i = 0, n = 0; n < e; ++n) {
      var s = t[n];
      if (v(s.red)) s.red === r[i] && s.green === r[i + 1] && s.blue === r[i + 2] || (r[i] = s.red, r[i + 1] = s.green, r[i + 2] = s.blue, a = !0);else {
        if (!v(s.x)) throw new _("Invalid vec3 value.");
        l.equalsArray(s, r, i) || (l.pack(s, r, i), a = !0);
      }
      i += 3;
    }

    a && this._gl.uniform3fv(this._location, r);
  }, A.prototype.set = function () {
    for (var t = this.value, e = t.length, r = this._value, a = !1, i = 0, n = 0; n < e; ++n) {
      var s = t[n];
      if (v(s.red)) u.equalsArray(s, r, i) || (u.pack(s, r, i), a = !0);else {
        if (!v(s.x)) throw new _("Invalid vec4 value.");
        h.equalsArray(s, r, i) || (h.pack(s, r, i), a = !0);
      }
      i += 4;
    }

    a && this._gl.uniform4fv(this._location, r);
  }, w.prototype.set = function () {
    for (var t = this._gl, e = t.TEXTURE0 + this.textureUnitIndex, r = this.value, a = r.length, i = 0; i < a; ++i) {
      var n = r[i];
      t.activeTexture(e + i), t.bindTexture(n._target, n._texture);
    }
  }, w.prototype._setSampler = function (t) {
    this.textureUnitIndex = t;

    for (var e = this._locations, r = e.length, a = 0; a < r; ++a) {
      var i = t + a;

      this._gl.uniform1i(e[a], i);
    }

    return t + r;
  }, p.prototype.set = function () {
    for (var t = this.value, e = t.length, r = this._value, a = !1, i = 0; i < e; ++i) {
      var n = t[i];
      n !== r[i] && (r[i] = n, a = !0);
    }

    a && this._gl.uniform1iv(this._location, r);
  }, m.prototype.set = function () {
    for (var t = this.value, e = t.length, r = this._value, a = !1, i = 0, n = 0; n < e; ++n) {
      var s = t[n];
      o.equalsArray(s, r, i) || (o.pack(s, r, i), a = !0), i += 2;
    }

    a && this._gl.uniform2iv(this._location, r);
  }, C.prototype.set = function () {
    for (var t = this.value, e = t.length, r = this._value, a = !1, i = 0, n = 0; n < e; ++n) {
      var s = t[n];
      l.equalsArray(s, r, i) || (l.pack(s, r, i), a = !0), i += 3;
    }

    a && this._gl.uniform3iv(this._location, r);
  }, T.prototype.set = function () {
    for (var t = this.value, e = t.length, r = this._value, a = !1, i = 0, n = 0; n < e; ++n) {
      var s = t[n];
      h.equalsArray(s, r, i) || (h.pack(s, r, i), a = !0), i += 4;
    }

    a && this._gl.uniform4iv(this._location, r);
  }, x.prototype.set = function () {
    for (var t = this.value, e = t.length, r = this._value, a = !1, i = 0, n = 0; n < e; ++n) {
      var s = t[n];
      c.equalsArray(s, r, i) || (c.pack(s, r, i), a = !0), i += 4;
    }

    a && this._gl.uniformMatrix2fv(this._location, !1, r);
  }, d.prototype.set = function () {
    for (var t = this.value, e = t.length, r = this._value, a = !1, i = 0, n = 0; n < e; ++n) {
      var s = t[n];
      f.equalsArray(s, r, i) || (f.pack(s, r, i), a = !0), i += 9;
    }

    a && this._gl.uniformMatrix3fv(this._location, !1, r);
  }, E.prototype.set = function () {
    for (var t = this.value, e = t.length, r = this._value, a = !1, i = 0, n = 0; n < e; ++n) {
      var s = t[n];
      g.equalsArray(s, r, i) || (g.pack(s, r, i), a = !0), i += 16;
    }

    a && this._gl.uniformMatrix4fv(this._location, !1, r);
  }, function (t, e, r, a) {
    switch (e.type) {
      case t.FLOAT:
        return new n(t, 0, r, a);

      case t.FLOAT_VEC2:
        return new s(t, 0, r, a);

      case t.FLOAT_VEC3:
        return new y(t, 0, r, a);

      case t.FLOAT_VEC4:
        return new A(t, 0, r, a);

      case t.SAMPLER_2D:
      case t.SAMPLER_CUBE:
        return new w(t, 0, r, a);

      case t.INT:
      case t.BOOL:
        return new p(t, 0, r, a);

      case t.INT_VEC2:
      case t.BOOL_VEC2:
        return new m(t, 0, r, a);

      case t.INT_VEC3:
      case t.BOOL_VEC3:
        return new C(t, 0, r, a);

      case t.INT_VEC4:
      case t.BOOL_VEC4:
        return new T(t, 0, r, a);

      case t.FLOAT_MAT2:
        return new x(t, 0, r, a);

      case t.FLOAT_MAT3:
        return new d(t, 0, r, a);

      case t.FLOAT_MAT4:
        return new E(t, 0, r, a);

      default:
        throw new i("Unrecognized uniform type: " + e.type + ' for uniform "' + r + '".');
    }
  };
});