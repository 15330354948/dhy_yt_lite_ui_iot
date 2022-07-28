"use strict";

define(["./Cartesian3", "./defaultValue", "./defined", "./Quaternion"], function (a, i, n, s) {
  "use strict";

  function t(t, n, e) {
    this.translation = a.clone(i(t, l)), this.rotation = s.clone(i(n, r)), this.scale = a.clone(i(e, o));
  }

  var o = new a(1, 1, 1),
      l = a.ZERO,
      r = s.IDENTITY;
  return t.prototype.equals = function (t) {
    return this === t || n(t) && a.equals(this.translation, t.translation) && s.equals(this.rotation, t.rotation) && a.equals(this.scale, t.scale);
  }, t;
});