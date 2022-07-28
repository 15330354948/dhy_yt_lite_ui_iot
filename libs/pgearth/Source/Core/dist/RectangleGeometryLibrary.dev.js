"use strict";

define(["./Cartesian3", "./Cartographic", "./defined", "./DeveloperError", "./GeographicProjection", "./Math", "./Matrix2", "./Rectangle"], function (R, n, p, G, t, I, P, m) {
  "use strict";

  var M = Math.cos,
      v = Math.sin,
      W = Math.sqrt,
      r = {
    computePosition: function computePosition(n, t, r, a, o, e, s) {
      var i,
          g = t.radiiSquared,
          h = n.nwCorner,
          u = n.boundingRectangle,
          c = h.latitude - n.granYCos * a + o * n.granXSin,
          l = M(c),
          C = v(c),
          S = g.z * C,
          d = h.longitude + a * n.granYSin + o * n.granXCos,
          w = l * M(d),
          X = l * v(d),
          Y = g.x * w,
          O = g.y * X,
          _ = W(Y * w + O * X + S * C);

      e.x = Y / _, e.y = O / _, e.z = S / _, r && (i = n.stNwCorner, p(i) ? (c = i.latitude - n.stGranYCos * a + o * n.stGranXSin, d = i.longitude + a * n.stGranYSin + o * n.stGranXCos, s.x = (d - n.stWest) * n.lonScalar, s.y = (c - n.stSouth) * n.latScalar) : (s.x = (d - u.west) * n.lonScalar, s.y = (c - u.south) * n.latScalar));
    }
  },
      f = new P(),
      T = new R(),
      x = new n(),
      E = new R(),
      V = new t();

  function y(n, t, r, a, o, e, s) {
    var i = Math.cos(t),
        g = a * i,
        h = r * i,
        u = Math.sin(t),
        c = a * u,
        l = r * u;
    T = V.project(n, T), T = R.subtract(T, E, T);
    var C = P.fromRotation(t, f);
    T = P.multiplyByVector(C, T, T), T = R.add(T, E, T), --e, --s;
    var S = (n = V.unproject(T, n)).latitude,
        d = S + e * l,
        w = S - g * s,
        X = S - g * s + e * l,
        Y = Math.max(S, d, w, X),
        O = Math.min(S, d, w, X),
        _ = n.longitude,
        p = _ + e * h,
        M = _ + s * c,
        v = _ + s * c + e * h;
    return {
      north: Y,
      south: O,
      east: Math.max(_, p, M, v),
      west: Math.min(_, p, M, v),
      granYCos: g,
      granYSin: c,
      granXCos: h,
      granXSin: l,
      nwCorner: n
    };
  }

  return r.computeOptions = function (n, t, r, a, o, e, s) {
    var i = n.east,
        g = n.west,
        h = n.north,
        u = n.south,
        c = !1,
        l = !1;
    h === I.PI_OVER_TWO && (c = !0), u === -I.PI_OVER_TWO && (l = !0);

    var C,
        S,
        d,
        w = h - u,
        X = (C = i < g ? I.TWO_PI - g + i : i - g) / ((S = Math.ceil(C / t) + 1) - 1),
        Y = w / ((d = Math.ceil(w / t) + 1) - 1),
        O = m.northwest(n, e),
        _ = m.center(n, x);

    0 === r && 0 === a || (_.longitude < O.longitude && (_.longitude += I.TWO_PI), E = V.project(_, E));
    var p,
        M,
        v = Y,
        R = X,
        P = m.clone(n, o),
        W = {
      granYCos: v,
      granYSin: 0,
      granXCos: R,
      granXSin: 0,
      nwCorner: O,
      boundingRectangle: P,
      width: S,
      height: d,
      northCap: c,
      southCap: l
    };

    if (0 !== r) {
      var f = y(O, r, X, Y, 0, S, d),
          h = f.north,
          u = f.south,
          i = f.east,
          g = f.west;
      if (h < -I.PI_OVER_TWO || h > I.PI_OVER_TWO || u < -I.PI_OVER_TWO || u > I.PI_OVER_TWO) throw new G("Rotated rectangle is invalid.  It crosses over either the north or south pole.");
      W.granYCos = f.granYCos, W.granYSin = f.granYSin, W.granXCos = f.granXCos, W.granXSin = f.granXSin, P.north = h, P.south = u, P.east = i, P.west = g;
    }

    return 0 !== a && (r -= a, M = y(p = m.northwest(P, s), r, X, Y, 0, S, d), W.stGranYCos = M.granYCos, W.stGranXCos = M.granXCos, W.stGranYSin = M.granYSin, W.stGranXSin = M.granXSin, W.stNwCorner = p, W.stWest = M.west, W.stSouth = M.south), W;
  }, r;
});