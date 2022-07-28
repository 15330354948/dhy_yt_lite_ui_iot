"use strict";

define(["../ThirdParty/when", "./Cartesian2", "./Cartesian3", "./Cartesian4", "./Cartographic", "./Check", "./defaultValue", "./defined", "./DeveloperError", "./EarthOrientationParameters", "./EarthOrientationParametersSample", "./Ellipsoid", "./HeadingPitchRoll", "./Iau2006XysData", "./Iau2006XysSample", "./JulianDate", "./Math", "./Matrix3", "./Matrix4", "./Quaternion", "./TimeConstants"], function (s, n, d, i, e, u, l, S, N, t, r, w, c, o, a, D, M, g, m, h, q) {
  "use strict";

  var _ = {},
      p = {
    up: {
      south: "east",
      north: "west",
      west: "south",
      east: "north"
    },
    down: {
      south: "west",
      north: "east",
      west: "north",
      east: "south"
    },
    south: {
      up: "west",
      down: "east",
      west: "down",
      east: "up"
    },
    north: {
      up: "east",
      down: "west",
      west: "up",
      east: "down"
    },
    west: {
      up: "north",
      down: "south",
      north: "down",
      south: "up"
    },
    east: {
      up: "south",
      down: "north",
      north: "up",
      south: "down"
    }
  },
      f = {
    north: [-1, 0, 0],
    east: [0, 1, 0],
    up: [0, 0, 1],
    south: [1, 0, 0],
    west: [0, -1, 0],
    down: [0, 0, -1]
  },
      y = {},
      x = {
    east: new d(),
    north: new d(),
    up: new d(),
    west: new d(),
    south: new d(),
    down: new d()
  },
      T = new d(),
      F = new d(),
      P = new d();
  _.localFrameToFixedFrameGenerator = function (i, s) {
    if (!p.hasOwnProperty(i) || !p[i].hasOwnProperty(s)) throw new N("firstAxis and secondAxis must be east, north, up, west, south or down.");
    var e,
        u = p[i][s],
        t = i + s;
    return S(y[t]) ? e = y[t] : (e = function e(_e, t, r) {
      if (!S(_e)) throw new N("origin is required.");
      var o, a, n;
      return S(r) || (r = new m()), M.equalsEpsilon(_e.x, 0, M.EPSILON14) && M.equalsEpsilon(_e.y, 0, M.EPSILON14) ? (o = M.sign(_e.z), d.unpack(f[i], 0, T), "east" !== i && "west" !== i && d.multiplyByScalar(T, o, T), d.unpack(f[s], 0, F), "east" !== s && "west" !== s && d.multiplyByScalar(F, o, F), d.unpack(f[u], 0, P), "east" !== u && "west" !== u && d.multiplyByScalar(P, o, P)) : ((t = l(t, w.WGS84)).geodeticSurfaceNormal(_e, x.up), a = x.up, (n = x.east).x = -_e.y, n.y = _e.x, n.z = 0, d.normalize(n, x.east), d.cross(a, n, x.north), d.multiplyByScalar(x.up, -1, x.down), d.multiplyByScalar(x.east, -1, x.west), d.multiplyByScalar(x.north, -1, x.south), T = x[i], F = x[s], P = x[u]), r[0] = T.x, r[1] = T.y, r[2] = T.z, r[3] = 0, r[4] = F.x, r[5] = F.y, r[6] = F.z, r[7] = 0, r[8] = P.x, r[9] = P.y, r[10] = P.z, r[11] = 0, r[12] = _e.x, r[13] = _e.y, r[14] = _e.z, r[15] = 1, r;
    }, y[t] = e), e;
  }, _.eastNorthUpToFixedFrame = _.localFrameToFixedFrameGenerator("east", "north"), _.northEastDownToFixedFrame = _.localFrameToFixedFrameGenerator("north", "east"), _.northUpEastToFixedFrame = _.localFrameToFixedFrameGenerator("north", "up"), _.northWestUpToFixedFrame = _.localFrameToFixedFrameGenerator("north", "west");
  var v = new h(),
      E = new d(1, 1, 1),
      R = new m();

  _.headingPitchRollToFixedFrame = function (e, t, r, o, a) {
    u.typeOf.object("HeadingPitchRoll", t), o = l(o, _.eastNorthUpToFixedFrame);
    var n = h.fromHeadingPitchRoll(t, v),
        i = m.fromTranslationQuaternionRotationScale(d.ZERO, n, E, R);
    return a = o(e, r, a), m.multiply(a, i, a);
  };

  var O = new m(),
      C = new g();

  _.headingPitchRollQuaternion = function (e, t, r, o, a) {
    u.typeOf.object("HeadingPitchRoll", t);

    var n = _.headingPitchRollToFixedFrame(e, t, r, o, O),
        i = m.getRotation(n, C);

    return h.fromRotationMatrix(i, a);
  };

  var z = new d(1, 1, 1),
      I = new d(),
      U = new m(),
      W = new m(),
      A = new g(),
      G = new h();

  _.fixedFrameToHeadingPitchRoll = function (e, t, r, o) {
    u.defined("transform", e), t = l(t, w.WGS84), r = l(r, _.eastNorthUpToFixedFrame), S(o) || (o = new c());
    var a = m.getTranslation(e, I);
    if (d.equals(a, d.ZERO)) return o.heading = 0, o.pitch = 0, o.roll = 0, o;
    var n = m.inverseTransformation(r(a, t, U), U),
        i = m.setScale(e, z, W),
        i = m.setTranslation(i, d.ZERO, i),
        n = m.multiply(n, i, n),
        s = h.fromRotationMatrix(m.getRotation(n, A), G),
        s = h.normalize(s, s);
    return c.fromQuaternion(s, o);
  };

  var B = M.TWO_PI / 86400,
      b = new D();
  _.computeTemeToPseudoFixedMatrix = function (e, t) {
    if (!S(e)) throw new N("date is required.");
    var r = (b = D.addSeconds(e, -D.computeTaiMinusUtc(e), b)).dayNumber,
        o = b.secondsOfDay,
        a = r - 2451545,
        n = 43200 <= o ? (.5 + a) / q.DAYS_PER_JULIAN_CENTURY : (a - .5) / q.DAYS_PER_JULIAN_CENTURY,
        i = (24110.54841 + n * (8640184.812866 + n * (.093104 + -62e-7 * n))) * B % M.TWO_PI + (72921158553e-15 + 11772758384668e-32 * (r - 2451545.5)) * ((o + .5 * q.SECONDS_PER_DAY) % q.SECONDS_PER_DAY),
        s = Math.cos(i),
        u = Math.sin(i);
    return S(t) ? (t[0] = s, t[1] = -u, t[2] = 0, t[3] = u, t[4] = s, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t) : new g(s, u, 0, -u, s, 0, 0, 0, 1);
  }, _.iau2006XysData = new o(), _.earthOrientationParameters = t.NONE;
  var L = 32.184;
  _.preloadIcrfFixed = function (e) {
    var t = e.start.dayNumber,
        r = e.start.secondsOfDay + L,
        o = e.stop.dayNumber,
        a = e.stop.secondsOfDay + L,
        n = _.iau2006XysData.preload(t, r, o, a),
        i = _.earthOrientationParameters.getPromiseToLoad();

    return s.all([n, i]);
  }, _.computeIcrfToFixedMatrix = function (e, t) {
    if (!S(e)) throw new N("date is required.");
    S(t) || (t = new g());

    var r = _.computeFixedToIcrfMatrix(e, t);

    if (S(r)) return g.transpose(r, t);
  };
  var Y = new a(0, 0, 0),
      j = new r(0, 0, 0, 0, 0, 0),
      X = new g(),
      Z = new g();

  _.computeFixedToIcrfMatrix = function (e, t) {
    if (!S(e)) throw new N("date is required.");
    S(t) || (t = new g());

    var r = _.earthOrientationParameters.compute(e, j);

    if (S(r)) {
      var o = e.dayNumber,
          a = e.secondsOfDay + L,
          n = _.iau2006XysData.computeXysRadians(o, a, Y);

      if (S(n)) {
        var i = n.x + r.xPoleOffset,
            s = n.y + r.yPoleOffset,
            u = 1 / (1 + Math.sqrt(1 - i * i - s * s)),
            l = X;
        l[0] = 1 - u * i * i, l[3] = -u * i * s, l[6] = i, l[1] = -u * i * s, l[4] = 1 - u * s * s, l[7] = s, l[2] = -i, l[5] = -s, l[8] = 1 - u * (i * i + s * s);
        var w = g.fromRotationZ(-n.s, Z),
            d = g.multiply(l, w, X),
            c = e.dayNumber - 2451545,
            m = (e.secondsOfDay - D.computeTaiMinusUtc(e) + r.ut1MinusUtc) / q.SECONDS_PER_DAY,
            h = (h = .779057273264 + m + .00273781191135448 * (c + m)) % 1 * M.TWO_PI,
            p = g.fromRotationZ(h, Z),
            f = g.multiply(d, p, X),
            y = Math.cos(r.xPoleWander),
            x = Math.cos(r.yPoleWander),
            T = Math.sin(r.xPoleWander),
            F = Math.sin(r.yPoleWander),
            P = o - 2451545 + a / q.SECONDS_PER_DAY,
            v = -47e-6 * (P /= 36525) * M.RADIANS_PER_DEGREE / 3600,
            E = Math.cos(v),
            R = Math.sin(v),
            O = Z;
        return O[0] = y * E, O[1] = y * R, O[2] = T, O[3] = -x * R + F * T * E, O[4] = x * E + F * T * R, O[5] = -F * y, O[6] = -F * R - x * T * E, O[7] = F * E - x * T * R, O[8] = x * y, g.multiply(f, O, t);
      }
    }
  };

  var H = new i();
  _.pointToWindowCoordinates = function (e, t, r, o) {
    return (o = _.pointToGLWindowCoordinates(e, t, r, o)).y = 2 * t[5] - o.y, o;
  }, _.pointToGLWindowCoordinates = function (e, t, r, o) {
    if (!S(e)) throw new N("modelViewProjectionMatrix is required.");
    if (!S(t)) throw new N("viewportTransformation is required.");
    if (!S(r)) throw new N("point is required.");
    S(o) || (o = new n());
    var a = H;
    return m.multiplyByVector(e, i.fromElements(r.x, r.y, r.z, 1, a), a), i.multiplyByScalar(a, 1 / a.w, a), m.multiplyByVector(t, a, a), n.fromCartesian4(a, o);
  };
  var V = new d(),
      k = new d(),
      Q = new d();

  _.rotationMatrixFromPositionVelocity = function (e, t, r, o) {
    if (!S(e)) throw new N("position is required.");
    if (!S(t)) throw new N("velocity is required.");
    var a = l(r, w.WGS84).geodeticSurfaceNormal(e, V),
        n = d.cross(t, a, k);
    d.equalsEpsilon(n, d.ZERO, M.EPSILON6) && (n = d.clone(d.UNIT_X, n));
    var i = d.cross(n, t, Q);
    return d.normalize(i, i), d.cross(t, i, n), d.negate(n, n), d.normalize(n, n), S(o) || (o = new g()), o[0] = t.x, o[1] = t.y, o[2] = t.z, o[3] = n.x, o[4] = n.y, o[5] = n.z, o[6] = i.x, o[7] = i.y, o[8] = i.z, o;
  };

  var J = new m(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1),
      K = new e(),
      $ = new d(),
      ee = new d(),
      te = new g(),
      re = new m(),
      oe = new m();
  return _.basisTo2D = function (e, t, r) {
    if (!S(e)) throw new N("projection is required.");
    if (!S(t)) throw new N("matrix is required.");
    if (!S(r)) throw new N("result is required.");
    var o = m.getTranslation(t, ee),
        a = e.ellipsoid,
        n = a.cartesianToCartographic(o, K),
        i = e.project(n, $);
    d.fromElements(i.z, i.x, i.y, i);

    var s = _.eastNorthUpToFixedFrame(o, a, re),
        u = m.inverseTransformation(s, oe),
        l = m.getRotation(t, te),
        w = m.multiplyByMatrix3(u, l, r);

    return m.multiply(J, w, r), m.setTranslation(r, i, r), r;
  }, _.wgs84To2DModelMatrix = function (e, t, r) {
    if (!S(e)) throw new N("projection is required.");
    if (!S(t)) throw new N("center is required.");
    if (!S(r)) throw new N("result is required.");

    var o = e.ellipsoid,
        a = _.eastNorthUpToFixedFrame(t, o, re),
        n = m.inverseTransformation(a, oe),
        i = o.cartesianToCartographic(t, K),
        s = e.project(i, $);

    d.fromElements(s.z, s.x, s.y, s);
    var u = m.fromTranslation(s, re);
    return m.multiply(J, n, r), m.multiply(u, r, r), r;
  }, _;
});