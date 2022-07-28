"use strict";

define(["./Cartesian3", "./defined", "./DeveloperError", "./Math"], function (C, D, F, I) {
  "use strict";

  var L = new C(),
      N = new C();
  return function (e, r, i, n, t) {
    if (!D(e)) throw new F("cartesian is required.");
    if (!D(r)) throw new F("oneOverRadii is required.");
    if (!D(i)) throw new F("oneOverRadiiSquared is required.");
    if (!D(n)) throw new F("centerToleranceSquared is required.");
    var a = e.x,
        d = e.y,
        u = e.z,
        o = r.x,
        w = r.y,
        s = r.z,
        f = a * a * o * o,
        c = d * d * w * w,
        h = u * u * s * s,
        v = f + c + h,
        y = Math.sqrt(1 / v),
        l = C.multiplyByScalar(e, y, L);
    if (v < n) return isFinite(y) ? C.clone(l, t) : void 0;
    var q = i.x,
        x = i.y,
        z = i.z,
        S = N;
    S.x = l.x * q * 2, S.y = l.y * x * 2, S.z = l.z * z * 2;
    var m,
        M,
        O,
        g,
        p,
        E,
        R,
        b = (1 - y) * C.magnitude(e) / (.5 * C.magnitude(S)),
        B = 0;

    do {
      B = (m = f * (p = (M = 1 / (1 + (b -= B) * q)) * M) + c * (E = (O = 1 / (1 + b * x)) * O) + h * (R = (g = 1 / (1 + b * z)) * g) - 1) / (-2 * (f * (p * M) * q + c * (E * O) * x + h * (R * g) * z));
    } while (Math.abs(m) > I.EPSILON12);

    return D(t) ? (t.x = a * M, t.y = d * O, t.z = u * g, t) : new C(a * M, d * O, u * g);
  };
});