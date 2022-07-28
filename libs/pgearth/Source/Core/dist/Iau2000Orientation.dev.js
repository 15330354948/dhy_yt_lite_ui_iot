"use strict";

define(["./defined", "./IauOrientationParameters", "./JulianDate", "./Math", "./TimeConstants"], function (K, Q, V, W, X) {
  "use strict";

  var E = {},
      Z = -.0529921,
      $ = -.1059842,
      EE = 13.0120009,
      RE = 13.3407154,
      tE = .9856003,
      aE = 26.4057084,
      nE = 13.064993,
      AE = .3287146,
      DE = 1.7484877,
      _E = -.1589763,
      sE = .0036096,
      oE = .1643573,
      hE = 12.9590088,
      iE = new V();

  return E.ComputeMoon = function (E, R) {
    K(E) || (E = V.now()), iE = V.addSeconds(E, 32.184, iE);

    var t = V.totalDays(iE) - 2451545,
        a = t / X.DAYS_PER_JULIAN_CENTURY,
        n = (125.045 + Z * t) * W.RADIANS_PER_DEGREE,
        A = (250.089 + $ * t) * W.RADIANS_PER_DEGREE,
        D = (260.008 + EE * t) * W.RADIANS_PER_DEGREE,
        _ = (176.625 + RE * t) * W.RADIANS_PER_DEGREE,
        s = (357.529 + tE * t) * W.RADIANS_PER_DEGREE,
        o = (311.589 + aE * t) * W.RADIANS_PER_DEGREE,
        h = (134.963 + nE * t) * W.RADIANS_PER_DEGREE,
        i = (276.617 + AE * t) * W.RADIANS_PER_DEGREE,
        M = (34.226 + DE * t) * W.RADIANS_PER_DEGREE,
        e = (15.134 + _E * t) * W.RADIANS_PER_DEGREE,
        c = (119.743 + sE * t) * W.RADIANS_PER_DEGREE,
        I = (239.961 + oE * t) * W.RADIANS_PER_DEGREE,
        N = (25.053 + hE * t) * W.RADIANS_PER_DEGREE,
        P = Math.sin(n),
        S = Math.sin(A),
        G = Math.sin(D),
        r = Math.sin(_),
        u = Math.sin(s),
        d = Math.sin(o),
        f = Math.sin(h),
        l = Math.sin(i),
        m = Math.sin(M),
        w = Math.sin(e),
        C = Math.sin(c),
        v = Math.sin(I),
        J = Math.sin(N),
        T = Math.cos(n),
        U = Math.cos(A),
        Y = Math.cos(D),
        g = Math.cos(_),
        p = Math.cos(s),
        y = Math.cos(o),
        L = Math.cos(h),
        O = Math.cos(i),
        b = Math.cos(M),
        j = Math.cos(e),
        k = Math.cos(c),
        q = Math.cos(I),
        x = Math.cos(N),
        z = (269.9949 + .0031 * a - 3.8787 * P - .1204 * S + .07 * G - .0172 * r + .0072 * d - .0052 * w + .0043 * J) * W.RADIANS_PER_DEGREE,
        B = (66.5392 + .013 * a + 1.5419 * T + .0239 * U - .0278 * Y + .0068 * g - .0029 * y + 9e-4 * L + 8e-4 * j - 9e-4 * x) * W.RADIANS_PER_DEGREE,
        F = (38.3213 + 13.17635815 * t - 14e-13 * t * t + 3.561 * P + .1208 * S - .0642 * G + .0158 * r + .0252 * u - .0066 * d - .0047 * f - .0046 * l + .0028 * m + .0052 * w + .004 * C + .0019 * v - .0044 * J) * W.RADIANS_PER_DEGREE,
        H = (13.17635815 - 2 * t * 14e-13 + 3.561 * T * Z + .1208 * U * $ - .0642 * Y * EE + .0158 * g * RE + .0252 * p * tE - .0066 * y * aE - .0047 * L * nE - .0046 * O * AE + .0028 * b * DE + .0052 * j * _E + .004 * k * sE + .0019 * q * oE - .0044 * x * hE) / 86400 * W.RADIANS_PER_DEGREE;

    return K(R) || (R = new Q()), R.rightAscension = z, R.declination = B, R.rotation = F, R.rotationRate = H, R;
  }, E;
});