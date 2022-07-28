"use strict";

define(["./Cartesian3", "./defined", "./Iau2000Orientation", "./JulianDate", "./Math", "./Matrix3", "./Quaternion"], function (u, c, t, s, f, h, M) {
  "use strict";

  function n(n) {
    c(n) && "function" == typeof n || (n = t.ComputeMoon), this._computeFunction = n;
  }

  var w = new u(),
      y = new u(),
      p = new u();
  var v = new h(),
      x = new M();
  return n.prototype.evaluate = function (n, t) {
    c(n) || (n = s.now());

    var o = this._computeFunction(n),
        e = function (n, t, o) {
      var e = w;
      e.x = Math.cos(n + f.PI_OVER_TWO), e.y = Math.sin(n + f.PI_OVER_TWO), e.z = 0;
      var i = Math.cos(t),
          a = p;
      a.x = i * Math.cos(n), a.y = i * Math.sin(n), a.z = Math.sin(t);
      var r = u.cross(a, e, y);
      return c(o) || (o = new h()), o[0] = e.x, o[1] = r.x, o[2] = a.x, o[3] = e.y, o[4] = r.y, o[5] = a.y, o[6] = e.z, o[7] = r.z, o[8] = a.z, o;
    }(o.rightAscension, o.declination, t),
        i = f.zeroToTwoPi(o.rotation),
        a = M.fromAxisAngle(u.UNIT_Z, i, x),
        r = h.fromQuaternion(M.conjugate(a, a), v);

    return h.multiply(r, e, e);
  }, n;
});