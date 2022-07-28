"use strict";

define(["../Core/Cartesian2", "../Core/Cartesian3", "../Core/Check", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties"], function (i, t, e, o, s, r, n) {
  "use strict";

  var a = new i(1, 1);

  function l(e) {
    e = s(e, s.EMPTY_OBJECT), this.mass = s(e.mass, 1), this.position = t.clone(s(e.position, t.ZERO)), this.velocity = t.clone(s(e.velocity, t.ZERO)), this.life = s(e.life, Number.MAX_VALUE), this.image = e.image, this.startColor = o.clone(s(e.startColor, o.WHITE)), this.endColor = o.clone(s(e.endColor, o.WHITE)), this.startScale = s(e.startScale, 1), this.endScale = s(e.endScale, 1), this.imageSize = i.clone(s(e.imageSize, a)), this._age = 0, this._normalizedAge = 0, this._billboard = void 0;
  }

  n(l.prototype, {
    age: {
      get: function get() {
        return this._age;
      }
    },
    normalizedAge: {
      get: function get() {
        return this._normalizedAge;
      }
    }
  });
  var h = new t();
  return l.prototype.update = function (e, i) {
    return t.multiplyByScalar(this.velocity, e, h), t.add(this.position, h, this.position), r(i) && i(this, e), this._age += e, this.life === Number.MAX_VALUE ? this._normalizedAge = 0 : this._normalizedAge = this._age / this.life, this._age <= this.life;
  }, l;
});