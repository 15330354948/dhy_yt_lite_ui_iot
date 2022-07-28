"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

define(function () {
  "use strict";

  function N(t, s) {
    if (t[s]) return t[s];

    for (var i, a = Object.keys(t), h = s.toLowerCase().replace(Q, ""), e = -1; ++e < a.length;) {
      if ((i = a[e]).toLowerCase().replace(Q, "") === h) return t[i];
    }
  }

  function e(t) {
    if ("string" != typeof t) throw new Error("not a string");
    this.text = t.trim(), this.level = 0, this.place = 0, this.root = null, this.stack = [], this.currentObject = null, this.state = H;
  }

  function h(t, s, i) {
    Array.isArray(s) && (i.unshift(s), s = null);
    var a = s ? {} : t,
        h = i.reduce(function (t, s) {
      return n(s, t), t;
    }, a);
    s && (t[s] = h);
  }

  function n(t, s) {
    if (Array.isArray(t)) {
      var i,
          a = t.shift();
      if ("PARAMETER" === a && (a = t.shift()), 1 === t.length) return Array.isArray(t[0]) ? (s[a] = {}, void n(t[0], s[a])) : void (s[a] = t[0]);
      if (t.length) {
        if ("TOWGS84" !== a) switch (Array.isArray(a) || (s[a] = {}), a) {
          case "UNIT":
          case "PRIMEM":
          case "VERT_DATUM":
            return s[a] = {
              name: t[0].toLowerCase(),
              convert: t[1]
            }, void (3 === t.length && n(t[2], s[a]));

          case "SPHEROID":
          case "ELLIPSOID":
            return s[a] = {
              name: t[0],
              a: t[1],
              rf: t[2]
            }, void (4 === t.length && n(t[3], s[a]));

          case "PROJECTEDCRS":
          case "PROJCRS":
          case "GEOGCS":
          case "GEOCCS":
          case "PROJCS":
          case "LOCAL_CS":
          case "GEODCRS":
          case "GEODETICCRS":
          case "GEODETICDATUM":
          case "EDATUM":
          case "ENGINEERINGDATUM":
          case "VERT_CS":
          case "VERTCRS":
          case "VERTICALCRS":
          case "COMPD_CS":
          case "COMPOUNDCRS":
          case "ENGINEERINGCRS":
          case "ENGCRS":
          case "FITTED_CS":
          case "LOCAL_DATUM":
          case "DATUM":
            return t[0] = ["name", t[0]], void h(s, a, t);

          default:
            for (i = -1; ++i < t.length;) {
              if (!Array.isArray(t[i])) return n(t, s[a]);
            }

            return h(s, a, t);
        } else s[a] = t;
      } else s[a] = !0;
    } else s[t] = !0;
  }

  function i(t) {
    return t * $;
  }

  function r(e) {
    function t(t) {
      return t * (e.to_meter || 1);
    }

    "GEOGCS" === e.type ? e.projName = "longlat" : "LOCAL_CS" === e.type ? (e.projName = "identity", e.local = !0) : "object" == _typeof(e.PROJECTION) ? e.projName = Object.keys(e.PROJECTION)[0] : e.projName = e.PROJECTION, e.UNIT && (e.units = e.UNIT.name.toLowerCase(), "metre" === e.units && (e.units = "meter"), e.UNIT.convert && ("GEOGCS" === e.type ? e.DATUM && e.DATUM.SPHEROID && (e.to_meter = e.UNIT.convert * e.DATUM.SPHEROID.a) : e.to_meter = e.UNIT.convert));
    var s = e.GEOGCS;
    "GEOGCS" === e.type && (s = e), s && (s.DATUM ? e.datumCode = s.DATUM.name.toLowerCase() : e.datumCode = s.name.toLowerCase(), "d_" === e.datumCode.slice(0, 2) && (e.datumCode = e.datumCode.slice(2)), "new_zealand_geodetic_datum_1949" !== e.datumCode && "new_zealand_1949" !== e.datumCode || (e.datumCode = "nzgd49"), "wgs_1984" === e.datumCode && ("Mercator_Auxiliary_Sphere" === e.PROJECTION && (e.sphere = !0), e.datumCode = "wgs84"), "_ferro" === e.datumCode.slice(-6) && (e.datumCode = e.datumCode.slice(0, -6)), "_jakarta" === e.datumCode.slice(-8) && (e.datumCode = e.datumCode.slice(0, -8)), ~e.datumCode.indexOf("belge") && (e.datumCode = "rnb72"), s.DATUM && s.DATUM.SPHEROID && (e.ellps = s.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk"), "international" === e.ellps.toLowerCase().slice(0, 13) && (e.ellps = "intl"), e.a = s.DATUM.SPHEROID.a, e.rf = parseFloat(s.DATUM.SPHEROID.rf, 10)), ~e.datumCode.indexOf("osgb_1936") && (e.datumCode = "osgb36"), ~e.datumCode.indexOf("osni_1952") && (e.datumCode = "osni52"), (~e.datumCode.indexOf("tm65") || ~e.datumCode.indexOf("geodetic_datum_of_1965")) && (e.datumCode = "ire65"), "ch1903+" === e.datumCode && (e.datumCode = "ch1903")), e.b && !isFinite(e.b) && (e.b = e.a);
    [["standard_parallel_1", "Standard_Parallel_1"], ["standard_parallel_2", "Standard_Parallel_2"], ["false_easting", "False_Easting"], ["false_northing", "False_Northing"], ["central_meridian", "Central_Meridian"], ["latitude_of_origin", "Latitude_Of_Origin"], ["latitude_of_origin", "Central_Parallel"], ["scale_factor", "Scale_Factor"], ["k0", "scale_factor"], ["latitude_of_center", "Latitude_Of_Center"], ["latitude_of_center", "Latitude_of_center"], ["lat0", "latitude_of_center", i], ["longitude_of_center", "Longitude_Of_Center"], ["longitude_of_center", "Longitude_of_center"], ["longc", "longitude_of_center", i], ["x0", "false_easting", t], ["y0", "false_northing", t], ["long0", "central_meridian", i], ["lat0", "latitude_of_origin", i], ["lat0", "standard_parallel_1", i], ["lat1", "standard_parallel_1", i], ["lat2", "standard_parallel_2", i], ["azimuth", "Azimuth"], ["alpha", "azimuth", i], ["srsCode", "name"]].forEach(function (t) {
      return s = e, a = (i = t)[0], h = i[1], void (!(a in s) && h in s && (s[a] = s[h], 3 === i.length && (s[a] = i[2](s[a]))));
      var s, i, a, h;
    }), e.long0 || !e.longc || "Albers_Conic_Equal_Area" !== e.projName && "Lambert_Azimuthal_Equal_Area" !== e.projName || (e.long0 = e.longc), e.lat_ts || !e.lat1 || "Stereographic_South_Pole" !== e.projName && "Polar Stereographic (variant B)" !== e.projName || (e.lat0 = i(0 < e.lat1 ? 90 : -90), e.lat_ts = e.lat1);
  }

  function a(t) {
    var s = this;

    if (2 === arguments.length) {
      var i = arguments[1];
      "string" == typeof i ? "+" === i.charAt(0) ? a[t] = W(arguments[1]) : a[t] = tt(arguments[1]) : a[t] = i;
    } else if (1 === arguments.length) {
      if (Array.isArray(t)) return t.map(function (t) {
        Array.isArray(t) ? a.apply(s, t) : a(t);
      });

      if ("string" == typeof t) {
        if (t in a) return a[t];
      } else "EPSG" in t ? a["EPSG:" + t.EPSG] = t : "ESRI" in t ? a["ESRI:" + t.ESRI] = t : "IAU2000" in t ? a["IAU2000:" + t.IAU2000] = t : console.log(t);

      return;
    }
  }

  function S(t) {
    return "string" == typeof t ? t in a ? a[t] : (s = t, nt.some(function (t) {
      return -1 < s.indexOf(t);
    }) ? tt(t) : "+" === t[0] ? W(t) : void 0) : t;
    var s;
  }

  function t(t) {
    return t;
  }

  function s(t, s) {
    var i = Mt.length;
    return t.names ? ((Mt[i] = t).names.forEach(function (t) {
      lt[t.toLowerCase()] = i;
    }), this) : (console.log(s), !0);
  }

  function k(t, s) {
    if (!(this instanceof k)) return new k(t);

    s = s || function (t) {
      if (t) throw t;
    };

    var i,
        a,
        h,
        e,
        n,
        r,
        o,
        l,
        M,
        c,
        u,
        f,
        m,
        p,
        d,
        _,
        y,
        x,
        g,
        b,
        v,
        w,
        A,
        C,
        E,
        P = S(t);

    "object" == _typeof(P) && (i = k.projections.get(P.projName)) ? (!P.datumCode || "none" === P.datumCode || (a = N(mt, P.datumCode)) && (P.datum_params = a.towgs84 ? a.towgs84.split(",") : null, P.ellps = a.ellipse, P.datumName = a.datumName ? a.datumName : P.datumCode), P.k0 = P.k0 || 1, P.axis = P.axis || "enu", P.ellps = P.ellps || "wgs84", b = P.a, v = P.b, w = P.rf, A = P.ellps, C = P.sphere, b || (b = (E = (E = N(ut, A)) || ft).a, v = E.b, w = E.rf), w && !v && (v = (1 - 1 / w) * b), (0 === w || Math.abs(b - v) < D) && (C = !0, v = b), m = (h = {
      a: b,
      b: v,
      rf: w,
      sphere: C
    }).a, p = h.b, d = P.R_A, x = ((_ = m * m) - (y = p * p)) / _, g = 0, d ? (_ = (m *= 1 - x * (L + x * (z + x * T))) * m, x = 0) : g = Math.sqrt(x), e = {
      es: x,
      e: g,
      ep2: (_ - y) / y
    }, n = P.datum || (r = P.datumCode, o = P.datum_params, l = h.a, M = h.b, c = e.es, u = e.ep2, (f = {}).datum_type = void 0 === r || "none" === r ? O : R, o && (f.datum_params = o.map(parseFloat), 0 === f.datum_params[0] && 0 === f.datum_params[1] && 0 === f.datum_params[2] || (f.datum_type = q), 3 < f.datum_params.length && (0 === f.datum_params[3] && 0 === f.datum_params[4] && 0 === f.datum_params[5] && 0 === f.datum_params[6] || (f.datum_type = I, f.datum_params[3] *= G, f.datum_params[4] *= G, f.datum_params[5] *= G, f.datum_params[6] = f.datum_params[6] / 1e6 + 1))), f.a = l, f.b = M, f.es = c, f.ep2 = u, f), rt(this, P), rt(this, i), this.a = h.a, this.b = h.b, this.rf = h.rf, this.sphere = h.sphere, this.es = e.es, this.e = e.e, this.ep2 = e.ep2, this.datum = n, this.init(), s(null, this)) : s(t);
  }

  function o(t) {
    return t === q || t === I;
  }

  function l(t) {
    if ("function" == typeof Number.isFinite) {
      if (Number.isFinite(t)) return;
      throw new TypeError("coordinates must be finite numbers");
    }

    if ("number" != typeof t || t != t || !isFinite(t)) throw new TypeError("coordinates must be finite numbers");
  }

  function M(t, s, i) {
    var a, h, e;
    return Array.isArray(i) && (i = _t(i)), yt(i), t.datum && s.datum && (e = s, ((h = t).datum.datum_type === q || h.datum.datum_type === I) && "WGS84" !== e.datumCode || (e.datum.datum_type === q || e.datum.datum_type === I) && "WGS84" !== h.datumCode) && (i = M(t, a = new k("WGS84"), i), t = a), "enu" !== t.axis && (i = dt(t, !1, i)), i = "longlat" === t.projName ? {
      x: i.x * A,
      y: i.y * A
    } : (t.to_meter && (i = {
      x: i.x * t.to_meter,
      y: i.y * t.to_meter
    }), t.inverse(i)), t.from_greenwich && (i.x += t.from_greenwich), i = pt(t.datum, s.datum, i), s.from_greenwich && (i = {
      x: i.x - s.from_greenwich,
      y: i.y
    }), "longlat" === s.projName ? i = {
      x: i.x * C,
      y: i.y * C
    } : (i = s.forward(i), s.to_meter && (i = {
      x: i.x / s.to_meter,
      y: i.y / s.to_meter
    })), "enu" !== s.axis ? dt(s, !0, i) : i;
  }

  function c(t, s, i) {
    var a, h, e;
    return Array.isArray(i) ? (a = M(t, s, i), 3 === i.length ? [a.x, a.y, a.z] : [a.x, a.y]) : (h = M(t, s, i), 2 === (e = Object.keys(i)).length || e.forEach(function (t) {
      "x" !== t && "y" !== t && (h[t] = i[t]);
    }), h);
  }

  function u(t) {
    return t instanceof k ? t : t.oProj ? t.oProj : k(t);
  }

  function f(s, i, t) {
    s = u(s);
    var a,
        h = !1;
    return void 0 === i ? (i = s, s = xt, h = !0) : void 0 === i.x && !Array.isArray(i) || (t = i, i = s, s = xt, h = !0), i = u(i), t ? c(s, i, t) : (a = {
      forward: function forward(t) {
        return c(s, i, t);
      },
      inverse: function inverse(t) {
        return c(i, s, t);
      }
    }, h && (a.oProj = i), a);
  }

  function m(t, s) {
    return s = s || 5, i = function (t) {
      var s,
          i,
          a,
          h,
          e,
          n,
          r,
          o,
          l = t.lat,
          M = t.lon,
          c = .00669438,
          u = d(l),
          f = d(M);
      o = Math.floor((M + 180) / 6) + 1, 180 === M && (o = 60), 56 <= l && l < 64 && 3 <= M && M < 12 && (o = 32), 72 <= l && l < 84 && (0 <= M && M < 9 ? o = 31 : 9 <= M && M < 21 ? o = 33 : 21 <= M && M < 33 ? o = 35 : 33 <= M && M < 42 && (o = 37)), r = d(6 * (o - 1) - 180 + 3), s = c / (1 - c), i = 6378137 / Math.sqrt(1 - c * Math.sin(u) * Math.sin(u)), a = Math.tan(u) * Math.tan(u), h = s * Math.cos(u) * Math.cos(u), e = Math.cos(u) * (f - r), n = 6378137 * (.9983242984503243 * u - .002514607064228144 * Math.sin(2 * u) + 2639046602129982e-21 * Math.sin(4 * u) - 35 * c * c * c / 3072 * Math.sin(6 * u));
      var m = .9996 * i * (e + (1 - a + h) * e * e * e / 6 + (5 - 18 * a + a * a + 72 * h - 58 * s) * e * e * e * e * e / 120) + 5e5,
          p = .9996 * (n + i * Math.tan(u) * (e * e / 2 + (5 - a + 9 * h + 4 * h * h) * e * e * e * e / 24 + (61 - 58 * a + a * a + 600 * h - 330 * s) * e * e * e * e * e * e / 720));
      return l < 0 && (p += 1e7), {
        northing: Math.round(p),
        easting: Math.round(m),
        zoneNumber: o,
        zoneLetter: function (t) {
          var s = "Z";
          return t <= 84 && 72 <= t ? s = "X" : t < 72 && 64 <= t ? s = "W" : t < 64 && 56 <= t ? s = "V" : t < 56 && 48 <= t ? s = "U" : t < 48 && 40 <= t ? s = "T" : t < 40 && 32 <= t ? s = "S" : t < 32 && 24 <= t ? s = "R" : t < 24 && 16 <= t ? s = "Q" : t < 16 && 8 <= t ? s = "P" : t < 8 && 0 <= t ? s = "N" : t < 0 && -8 <= t ? s = "M" : t < -8 && -16 <= t ? s = "L" : t < -16 && -24 <= t ? s = "K" : t < -24 && -32 <= t ? s = "J" : t < -32 && -40 <= t ? s = "H" : t < -40 && -48 <= t ? s = "G" : t < -48 && -56 <= t ? s = "F" : t < -56 && -64 <= t ? s = "E" : t < -64 && -72 <= t ? s = "D" : t < -72 && -80 <= t && (s = "C"), s;
        }(l)
      };
    }({
      lat: t[1],
      lon: t[0]
    }), a = s, h = "00000" + i.easting, e = "00000" + i.northing, i.zoneNumber + i.zoneLetter + function (t, s, i) {
      var a = y(i),
          h = Math.floor(t / 1e5),
          e = Math.floor(s / 1e5) % 20;
      return function (t, s, i) {
        var a = i - 1,
            h = bt.charCodeAt(a),
            e = vt.charCodeAt(a),
            n = h + t - 1,
            r = e + s,
            o = !1;
        return Pt < n && (n = n - Pt + wt - 1, o = !0), (n === At || h < At && At < n || (At < n || h < At) && o) && n++, (n === Ct || h < Ct && Ct < n || (Ct < n || h < Ct) && o) && ++n === At && n++, Pt < n && (n = n - Pt + wt - 1), o = Et < r && (r = r - Et + wt - 1, !0), (r === At || e < At && At < r || (At < r || e < At) && o) && r++, (r === Ct || e < Ct && Ct < r || (Ct < r || e < Ct) && o) && ++r === At && r++, Et < r && (r = r - Et + wt - 1), String.fromCharCode(n) + String.fromCharCode(r);
      }(h, e, a);
    }(i.easting, i.northing, i.zoneNumber) + h.substr(h.length - 5, a) + e.substr(e.length - 5, a);
    var i, a, h, e;
  }

  function p(t) {
    var s = w(_(t.toUpperCase()));
    return s.lat && s.lon ? [s.lon, s.lat] : [(s.left + s.right) / 2, (s.top + s.bottom) / 2];
  }

  function d(t) {
    return t * (Math.PI / 180);
  }

  function v(t) {
    return t / Math.PI * 180;
  }

  function w(t) {
    var s = t.northing,
        i = t.easting,
        a = t.zoneLetter,
        h = t.zoneNumber;
    if (h < 0 || 60 < h) return null;

    var e,
        n,
        r,
        o,
        l,
        M,
        c,
        u,
        f,
        m = 6378137,
        p = .00669438,
        d = (1 - Math.sqrt(1 - p)) / (1 + Math.sqrt(1 - p)),
        _ = i - 5e5,
        y = s;

    a < "N" && (y -= 1e7), c = 6 * (h - 1) - 180 + 3, e = p / (1 - p), f = (u = y / .9996 / 6367449.145945056) + (3 * d / 2 - 27 * d * d * d / 32) * Math.sin(2 * u) + (21 * d * d / 16 - 55 * d * d * d * d / 32) * Math.sin(4 * u) + 151 * d * d * d / 96 * Math.sin(6 * u), n = m / Math.sqrt(1 - p * Math.sin(f) * Math.sin(f)), r = Math.tan(f) * Math.tan(f), o = e * Math.cos(f) * Math.cos(f), l = m * (1 - p) / Math.pow(1 - p * Math.sin(f) * Math.sin(f), 1.5), M = _ / (.9996 * n);
    var x,
        g = v(g = f - n * Math.tan(f) / l * (M * M / 2 - (5 + 3 * r + 10 * o - 4 * o * o - 9 * e) * M * M * M * M / 24 + (61 + 90 * r + 298 * o + 45 * r * r - 252 * e - 3 * o * o) * M * M * M * M * M * M / 720)),
        b = c + v(b = (M - (1 + 2 * r + o) * M * M * M / 6 + (5 - 2 * o + 28 * r - 3 * o * o + 8 * e + 24 * r * r) * M * M * M * M * M / 120) / Math.cos(f));
    return t.accuracy ? {
      top: (x = w({
        northing: t.northing + t.accuracy,
        easting: t.easting + t.accuracy,
        zoneLetter: t.zoneLetter,
        zoneNumber: t.zoneNumber
      })).lat,
      right: x.lon,
      bottom: g,
      left: b
    } : {
      lat: g,
      lon: b
    };
  }

  function y(t) {
    var s = t % gt;
    return 0 === s && (s = gt), s;
  }

  function _(t) {
    if (t && 0 === t.length) throw "MGRSPoint coverting from nothing";

    for (var s, i = t.length, a = null, h = "", e = 0; !/[A-Z]/.test(s = t.charAt(e));) {
      if (2 <= e) throw "MGRSPoint bad conversion from: " + t;
      h += s, e++;
    }

    var n = parseInt(h, 10);
    if (0 === e || i < e + 3) throw "MGRSPoint bad conversion from: " + t;
    var r = t.charAt(e++);
    if (r <= "A" || "B" === r || "Y" === r || "Z" <= r || "I" === r || "O" === r) throw "MGRSPoint zone letter " + r + " not handled: " + t;
    a = t.substring(e, e += 2);

    for (var o = y(n), l = function (t, s) {
      for (var i = bt.charCodeAt(s - 1), a = 1e5, h = !1; i !== t.charCodeAt(0);) {
        if (++i === At && i++, i === Ct && i++, Pt < i) {
          if (h) throw "Bad character: " + t;
          i = wt, h = !0;
        }

        a += 1e5;
      }

      return a;
    }(a.charAt(0), o), M = function (t, s) {
      if ("V" < t) throw "MGRSPoint given invalid Northing " + t;

      for (var i = vt.charCodeAt(s - 1), a = 0, h = !1; i !== t.charCodeAt(0);) {
        if (++i === At && i++, i === Ct && i++, Et < i) {
          if (h) throw "Bad character: " + t;
          i = wt, h = !0;
        }

        a += 1e5;
      }

      return a;
    }(a.charAt(1), o); M < function (t) {
      var s;

      switch (t) {
        case "C":
          s = 11e5;
          break;

        case "D":
          s = 2e6;
          break;

        case "E":
          s = 28e5;
          break;

        case "F":
          s = 37e5;
          break;

        case "G":
          s = 46e5;
          break;

        case "H":
          s = 55e5;
          break;

        case "J":
          s = 64e5;
          break;

        case "K":
          s = 73e5;
          break;

        case "L":
          s = 82e5;
          break;

        case "M":
          s = 91e5;
          break;

        case "N":
          s = 0;
          break;

        case "P":
          s = 8e5;
          break;

        case "Q":
          s = 17e5;
          break;

        case "R":
          s = 26e5;
          break;

        case "S":
          s = 35e5;
          break;

        case "T":
          s = 44e5;
          break;

        case "U":
          s = 53e5;
          break;

        case "V":
          s = 62e5;
          break;

        case "W":
          s = 7e6;
          break;

        case "X":
          s = 79e5;
          break;

        default:
          s = -1;
      }

      if (0 <= s) return s;
      throw "Invalid zone letter: " + t;
    }(r);) {
      M += 2e6;
    }

    var c = i - e;
    if (c % 2 != 0) throw "MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + t;
    var u,
        f,
        m,
        p = c / 2,
        d = 0,
        _ = 0;
    return 0 < p && (u = 1e5 / Math.pow(10, p), f = t.substring(e, e + p), d = parseFloat(f) * u, m = t.substring(e + p), _ = parseFloat(m) * u), {
      easting: d + l,
      northing: _ + M,
      zoneLetter: r,
      zoneNumber: n,
      accuracy: u
    };
  }

  function x(t, s, i) {
    if (!(this instanceof x)) return new x(t, s, i);
    var a;
    Array.isArray(t) ? (this.x = t[0], this.y = t[1], this.z = t[2] || 0) : "object" == _typeof(t) ? (this.x = t.x, this.y = t.y, this.z = t.z || 0) : "string" == typeof t && void 0 === s ? (a = t.split(","), this.x = parseFloat(a[0], 10), this.y = parseFloat(a[1], 10), this.z = parseFloat(a[2], 10) || 0) : (this.x = t, this.y = s, this.z = i || 0), console.warn("proj4.Point will be removed in version 3, use proj4.toPoint");
  }

  function g(t, s, i, a) {
    var h;
    return t < D ? (a.value = Rs.AREA_0, h = 0) : (h = Math.atan2(s, i), Math.abs(h) <= E ? a.value = Rs.AREA_0 : E < h && h <= j + E ? (a.value = Rs.AREA_1, h -= j) : j + E < h || h <= -(j + E) ? (a.value = Rs.AREA_2, h = 0 <= h ? h - B : h + B) : (a.value = Rs.AREA_3, h += j)), h;
  }

  function b(t, s) {
    var i = t + s;
    return i < -B ? i += P : +B < i && (i -= P), i;
  }

  var q = 1,
      I = 2,
      R = 4,
      O = 5,
      G = 484813681109536e-20,
      j = Math.PI / 2,
      L = .16666666666666666,
      z = .04722222222222222,
      T = .022156084656084655,
      D = 1e-10,
      A = .017453292519943295,
      C = 57.29577951308232,
      E = Math.PI / 4,
      P = 2 * Math.PI,
      B = 3.14159265359,
      U = {
    greenwich: 0,
    lisbon: -9.131906111111,
    paris: 2.337229166667,
    bogota: -74.080916666667,
    madrid: -3.687938888889,
    rome: 12.452333333333,
    bern: 7.439583333333,
    jakarta: 106.807719444444,
    ferro: -17.666666666667,
    brussels: 4.367975,
    stockholm: 18.058277777778,
    athens: 23.7163375,
    oslo: 10.722916666667
  },
      F = {
    ft: {
      to_meter: .3048
    },
    "us-ft": {
      to_meter: 1200 / 3937
    }
  },
      Q = /[\s_\-\/\(\)]/g,
      W = function W(t) {
    var s,
        i,
        a,
        h = {},
        e = t.split("+").map(function (t) {
      return t.trim();
    }).filter(function (t) {
      return t;
    }).reduce(function (t, s) {
      var i = s.split("=");
      return i.push(!0), t[i[0].toLowerCase()] = i[1], t;
    }, {}),
        n = {
      proj: "projName",
      datum: "datumCode",
      rf: function rf(t) {
        h.rf = parseFloat(t);
      },
      lat_0: function lat_0(t) {
        h.lat0 = t * A;
      },
      lat_1: function lat_1(t) {
        h.lat1 = t * A;
      },
      lat_2: function lat_2(t) {
        h.lat2 = t * A;
      },
      lat_ts: function lat_ts(t) {
        h.lat_ts = t * A;
      },
      lon_0: function lon_0(t) {
        h.long0 = t * A;
      },
      lon_1: function lon_1(t) {
        h.long1 = t * A;
      },
      lon_2: function lon_2(t) {
        h.long2 = t * A;
      },
      alpha: function alpha(t) {
        h.alpha = parseFloat(t) * A;
      },
      lonc: function lonc(t) {
        h.longc = t * A;
      },
      x_0: function x_0(t) {
        h.x0 = parseFloat(t);
      },
      y_0: function y_0(t) {
        h.y0 = parseFloat(t);
      },
      k_0: function k_0(t) {
        h.k0 = parseFloat(t);
      },
      k: function k(t) {
        h.k0 = parseFloat(t);
      },
      a: function a(t) {
        h.a = parseFloat(t);
      },
      b: function b(t) {
        h.b = parseFloat(t);
      },
      r_a: function r_a() {
        h.R_A = !0;
      },
      zone: function zone(t) {
        h.zone = parseInt(t, 10);
      },
      south: function south() {
        h.utmSouth = !0;
      },
      towgs84: function towgs84(t) {
        h.datum_params = t.split(",").map(function (t) {
          return parseFloat(t);
        });
      },
      to_meter: function to_meter(t) {
        h.to_meter = parseFloat(t);
      },
      units: function units(t) {
        h.units = t;
        var s = N(F, t);
        s && (h.to_meter = s.to_meter);
      },
      from_greenwich: function from_greenwich(t) {
        h.from_greenwich = t * A;
      },
      pm: function pm(t) {
        var s = N(U, t);
        h.from_greenwich = (s || parseFloat(t)) * A;
      },
      nadgrids: function nadgrids(t) {
        "@null" === t ? h.datumCode = "none" : h.nadgrids = t;
      },
      axis: function axis(t) {
        var s = "ewnsud";
        3 === t.length && -1 !== s.indexOf(t.substr(0, 1)) && -1 !== s.indexOf(t.substr(1, 1)) && -1 !== s.indexOf(t.substr(2, 1)) && (h.axis = t);
      }
    };

    for (s in e) {
      i = e[s], s in n ? "function" == typeof (a = n[s]) ? a(i) : h[a] = i : h[s] = i;
    }

    return "string" == typeof h.datumCode && "WGS84" !== h.datumCode && (h.datumCode = h.datumCode.toLowerCase()), h;
  },
      H = 1,
      X = /\s/,
      J = /[A-Za-z]/,
      K = /[A-Za-z84]/,
      V = /[,\]]/,
      Z = /[\d\.E\-\+]/;

  e.prototype.readCharicter = function () {
    var t = this.text[this.place++];
    if (4 !== this.state) for (; X.test(t);) {
      if (this.place >= this.text.length) return;
      t = this.text[this.place++];
    }

    switch (this.state) {
      case H:
        return this.neutral(t);

      case 2:
        return this.keyword(t);

      case 4:
        return this.quoted(t);

      case 5:
        return this.afterquote(t);

      case 3:
        return this.number(t);

      case -1:
        return;
    }
  }, e.prototype.afterquote = function (t) {
    if ('"' === t) return this.word += '"', void (this.state = 4);
    if (V.test(t)) return this.word = this.word.trim(), void this.afterItem(t);
    throw new Error("havn't handled \"" + t + '" in afterquote yet, index ' + this.place);
  }, e.prototype.afterItem = function (t) {
    return "," === t ? (null !== this.word && this.currentObject.push(this.word), this.word = null, void (this.state = H)) : "]" === t ? (this.level--, null !== this.word && (this.currentObject.push(this.word), this.word = null), this.state = H, this.currentObject = this.stack.pop(), void (this.currentObject || (this.state = -1))) : void 0;
  }, e.prototype.number = function (t) {
    if (!Z.test(t)) {
      if (V.test(t)) return this.word = parseFloat(this.word), void this.afterItem(t);
      throw new Error("havn't handled \"" + t + '" in number yet, index ' + this.place);
    }

    this.word += t;
  }, e.prototype.quoted = function (t) {
    return '"' === t ? void (this.state = 5) : void (this.word += t);
  }, e.prototype.keyword = function (t) {
    if (K.test(t)) this.word += t;else {
      if ("[" === t) {
        var s = [];
        return s.push(this.word), this.level++, null === this.root ? this.root = s : this.currentObject.push(s), this.stack.push(this.currentObject), this.currentObject = s, void (this.state = H);
      }

      if (!V.test(t)) throw new Error("havn't handled \"" + t + '" in keyword yet, index ' + this.place);
      this.afterItem(t);
    }
  }, e.prototype.neutral = function (t) {
    if (J.test(t)) return this.word = t, void (this.state = 2);
    if ('"' === t) return this.word = "", void (this.state = 4);
    if (Z.test(t)) return this.word = t, void (this.state = 3);
    if (!V.test(t)) throw new Error("havn't handled \"" + t + '" in neutral yet, index ' + this.place);
    this.afterItem(t);
  }, e.prototype.output = function () {
    for (; this.place < this.text.length;) {
      this.readCharicter();
    }

    if (-1 === this.state) return this.root;
    throw new Error('unable to parse string "' + this.text + '". State is ' + this.state);
  };

  var Y,
      $ = .017453292519943295,
      tt = function tt(t) {
    var s = new e(t).output(),
        i = s.shift(),
        a = s.shift();
    s.unshift(["name", a]), s.unshift(["type", i]);
    var h = {};
    return n(s, h), r(h), h;
  };

  (Y = a)("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"), Y("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees"), Y("EPSG:3857", "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"), Y.WGS84 = Y["EPSG:4326"], Y["EPSG:3785"] = Y["EPSG:3857"], Y.GOOGLE = Y["EPSG:3857"], Y["EPSG:900913"] = Y["EPSG:3857"], Y["EPSG:102113"] = Y["EPSG:3857"];

  function st(t, s, i) {
    var a = t * s;
    return i / Math.sqrt(1 - a * a);
  }

  function it(t) {
    return t < 0 ? -1 : 1;
  }

  function at(t) {
    return Math.abs(t) <= B ? t : t - it(t) * P;
  }

  function ht(t, s, i) {
    var a = t * i,
        h = .5 * t,
        a = Math.pow((1 - a) / (1 + a), h);
    return Math.tan(.5 * (j - s)) / a;
  }

  function et(t, s) {
    for (var i, a, h = .5 * t, e = j - 2 * Math.atan(s), n = 0; n <= 15; n++) {
      if (i = t * Math.sin(e), e += a = j - 2 * Math.atan(s * Math.pow((1 - i) / (1 + i), h)) - e, Math.abs(a) <= 1e-10) return e;
    }

    return -9999;
  }

  var nt = ["PROJECTEDCRS", "PROJCRS", "GEOGCS", "GEOCCS", "PROJCS", "LOCAL_CS", "GEODCRS", "GEODETICCRS", "GEODETICDATUM", "ENGCRS", "ENGINEERINGCRS"],
      rt = function rt(t, s) {
    var i, a;
    if (t = t || {}, !s) return t;

    for (a in s) {
      void 0 !== (i = s[a]) && (t[a] = i);
    }

    return t;
  },
      ot = [{
    init: function init() {
      var t = this.b / this.a;
      this.es = 1 - t * t, "x0" in this || (this.x0 = 0), "y0" in this || (this.y0 = 0), this.e = Math.sqrt(this.es), this.lat_ts ? this.sphere ? this.k0 = Math.cos(this.lat_ts) : this.k0 = st(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) : this.k0 || (this.k ? this.k0 = this.k : this.k0 = 1);
    },
    forward: function forward(t) {
      var s,
          i,
          a,
          h,
          e = t.x,
          n = t.y;
      return 90 < n * C && n * C < -90 && 180 < e * C && e * C < -180 || Math.abs(Math.abs(n) - j) <= D ? null : (h = this.sphere ? (a = this.x0 + this.a * this.k0 * at(e - this.long0), this.y0 + this.a * this.k0 * Math.log(Math.tan(E + .5 * n))) : (s = Math.sin(n), i = ht(this.e, n, s), a = this.x0 + this.a * this.k0 * at(e - this.long0), this.y0 - this.a * this.k0 * Math.log(i)), t.x = a, t.y = h, t);
    },
    inverse: function inverse(t) {
      var s,
          i = t.x - this.x0,
          a = t.y - this.y0;
      if (this.sphere) h = j - 2 * Math.atan(Math.exp(-a / (this.a * this.k0)));else {
        var h,
            e = Math.exp(-a / (this.a * this.k0));
        if (-9999 === (h = et(this.e, e))) return null;
      }
      return s = at(this.long0 + i / (this.a * this.k0)), t.x = s, t.y = h, t;
    },
    names: ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"]
  }, {
    init: function init() {},
    forward: t,
    inverse: t,
    names: ["longlat", "identity"]
  }],
      lt = {},
      Mt = [],
      ct = {
    start: function start() {
      ot.forEach(s);
    },
    add: s,
    get: function get(t) {
      if (!t) return !1;
      var s = t.toLowerCase();
      return void 0 !== lt[s] && Mt[lt[s]] ? Mt[lt[s]] : void 0;
    }
  },
      ut = {
    MERIT: {
      a: 6378137,
      rf: 298.257,
      ellipseName: "MERIT 1983"
    },
    SGS85: {
      a: 6378136,
      rf: 298.257,
      ellipseName: "Soviet Geodetic System 85"
    },
    GRS80: {
      a: 6378137,
      rf: 298.257222101,
      ellipseName: "GRS 1980(IUGG, 1980)"
    },
    IAU76: {
      a: 6378140,
      rf: 298.257,
      ellipseName: "IAU 1976"
    },
    airy: {
      a: 6377563.396,
      b: 6356256.91,
      ellipseName: "Airy 1830"
    },
    APL4: {
      a: 6378137,
      rf: 298.25,
      ellipseName: "Appl. Physics. 1965"
    },
    NWL9D: {
      a: 6378145,
      rf: 298.25,
      ellipseName: "Naval Weapons Lab., 1965"
    },
    mod_airy: {
      a: 6377340.189,
      b: 6356034.446,
      ellipseName: "Modified Airy"
    },
    andrae: {
      a: 6377104.43,
      rf: 300,
      ellipseName: "Andrae 1876 (Den., Iclnd.)"
    },
    aust_SA: {
      a: 6378160,
      rf: 298.25,
      ellipseName: "Australian Natl & S. Amer. 1969"
    },
    GRS67: {
      a: 6378160,
      rf: 298.247167427,
      ellipseName: "GRS 67(IUGG 1967)"
    },
    bessel: {
      a: 6377397.155,
      rf: 299.1528128,
      ellipseName: "Bessel 1841"
    },
    bess_nam: {
      a: 6377483.865,
      rf: 299.1528128,
      ellipseName: "Bessel 1841 (Namibia)"
    },
    clrk66: {
      a: 6378206.4,
      b: 6356583.8,
      ellipseName: "Clarke 1866"
    },
    clrk80: {
      a: 6378249.145,
      rf: 293.4663,
      ellipseName: "Clarke 1880 mod."
    },
    clrk58: {
      a: 6378293.645208759,
      rf: 294.2606763692654,
      ellipseName: "Clarke 1858"
    },
    CPM: {
      a: 6375738.7,
      rf: 334.29,
      ellipseName: "Comm. des Poids et Mesures 1799"
    },
    delmbr: {
      a: 6376428,
      rf: 311.5,
      ellipseName: "Delambre 1810 (Belgium)"
    },
    engelis: {
      a: 6378136.05,
      rf: 298.2566,
      ellipseName: "Engelis 1985"
    },
    evrst30: {
      a: 6377276.345,
      rf: 300.8017,
      ellipseName: "Everest 1830"
    },
    evrst48: {
      a: 6377304.063,
      rf: 300.8017,
      ellipseName: "Everest 1948"
    },
    evrst56: {
      a: 6377301.243,
      rf: 300.8017,
      ellipseName: "Everest 1956"
    },
    evrst69: {
      a: 6377295.664,
      rf: 300.8017,
      ellipseName: "Everest 1969"
    },
    evrstSS: {
      a: 6377298.556,
      rf: 300.8017,
      ellipseName: "Everest (Sabah & Sarawak)"
    },
    fschr60: {
      a: 6378166,
      rf: 298.3,
      ellipseName: "Fischer (Mercury Datum) 1960"
    },
    fschr60m: {
      a: 6378155,
      rf: 298.3,
      ellipseName: "Fischer 1960"
    },
    fschr68: {
      a: 6378150,
      rf: 298.3,
      ellipseName: "Fischer 1968"
    },
    helmert: {
      a: 6378200,
      rf: 298.3,
      ellipseName: "Helmert 1906"
    },
    hough: {
      a: 6378270,
      rf: 297,
      ellipseName: "Hough"
    },
    intl: {
      a: 6378388,
      rf: 297,
      ellipseName: "International 1909 (Hayford)"
    },
    kaula: {
      a: 6378163,
      rf: 298.24,
      ellipseName: "Kaula 1961"
    },
    lerch: {
      a: 6378139,
      rf: 298.257,
      ellipseName: "Lerch 1979"
    },
    mprts: {
      a: 6397300,
      rf: 191,
      ellipseName: "Maupertius 1738"
    },
    new_intl: {
      a: 6378157.5,
      b: 6356772.2,
      ellipseName: "New International 1967"
    },
    plessis: {
      a: 6376523,
      rf: 6355863,
      ellipseName: "Plessis 1817 (France)"
    },
    krass: {
      a: 6378245,
      rf: 298.3,
      ellipseName: "Krassovsky, 1942"
    },
    SEasia: {
      a: 6378155,
      b: 6356773.3205,
      ellipseName: "Southeast Asia"
    },
    walbeck: {
      a: 6376896,
      b: 6355834.8467,
      ellipseName: "Walbeck"
    },
    WGS60: {
      a: 6378165,
      rf: 298.3,
      ellipseName: "WGS 60"
    },
    WGS66: {
      a: 6378145,
      rf: 298.25,
      ellipseName: "WGS 66"
    },
    WGS7: {
      a: 6378135,
      rf: 298.26,
      ellipseName: "WGS 72"
    }
  },
      ft = ut.WGS84 = {
    a: 6378137,
    rf: 298.257223563,
    ellipseName: "WGS 84"
  };

  ut.sphere = {
    a: 6370997,
    b: 6370997,
    ellipseName: "Normal Sphere (r=6370997)"
  };
  var mt = {
    wgs84: {
      towgs84: "0,0,0",
      ellipse: "WGS84",
      datumName: "WGS84"
    },
    ch1903: {
      towgs84: "674.374,15.056,405.346",
      ellipse: "bessel",
      datumName: "swiss"
    },
    ggrs87: {
      towgs84: "-199.87,74.79,246.62",
      ellipse: "GRS80",
      datumName: "Greek_Geodetic_Reference_System_1987"
    },
    nad83: {
      towgs84: "0,0,0",
      ellipse: "GRS80",
      datumName: "North_American_Datum_1983"
    },
    nad27: {
      nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
      ellipse: "clrk66",
      datumName: "North_American_Datum_1927"
    },
    potsdam: {
      towgs84: "606.0,23.0,413.0",
      ellipse: "bessel",
      datumName: "Potsdam Rauenberg 1950 DHDN"
    },
    carthage: {
      towgs84: "-263.0,6.0,431.0",
      ellipse: "clark80",
      datumName: "Carthage 1934 Tunisia"
    },
    hermannskogel: {
      towgs84: "653.0,-212.0,449.0",
      ellipse: "bessel",
      datumName: "Hermannskogel"
    },
    osni52: {
      towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
      ellipse: "airy",
      datumName: "Irish National"
    },
    ire65: {
      towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
      ellipse: "mod_airy",
      datumName: "Ireland 1965"
    },
    rassadiran: {
      towgs84: "-133.63,-157.5,-158.62",
      ellipse: "intl",
      datumName: "Rassadiran"
    },
    nzgd49: {
      towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
      ellipse: "intl",
      datumName: "New Zealand Geodetic Datum 1949"
    },
    osgb36: {
      towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
      ellipse: "airy",
      datumName: "Airy 1830"
    },
    s_jtsk: {
      towgs84: "589,76,480",
      ellipse: "bessel",
      datumName: "S-JTSK (Ferro)"
    },
    beduaram: {
      towgs84: "-106,-87,188",
      ellipse: "clrk80",
      datumName: "Beduaram"
    },
    gunung_segara: {
      towgs84: "-403,684,41",
      ellipse: "bessel",
      datumName: "Gunung Segara Jakarta"
    },
    rnb72: {
      towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
      ellipse: "intl",
      datumName: "Reseau National Belge 1972"
    }
  };
  k.projections = ct, k.projections.start();

  var pt = function pt(t, s, i) {
    return h = s, ((a = t).datum_type !== h.datum_type || a.a !== h.a || 5e-11 < Math.abs(a.es - h.es) || (a.datum_type === q ? a.datum_params[0] !== h.datum_params[0] || a.datum_params[1] !== h.datum_params[1] || a.datum_params[2] !== h.datum_params[2] : a.datum_type === I && (a.datum_params[0] !== h.datum_params[0] || a.datum_params[1] !== h.datum_params[1] || a.datum_params[2] !== h.datum_params[2] || a.datum_params[3] !== h.datum_params[3] || a.datum_params[4] !== h.datum_params[4] || a.datum_params[5] !== h.datum_params[5] || a.datum_params[6] !== h.datum_params[6]))) && t.datum_type !== O && s.datum_type !== O && (t.es !== s.es || t.a !== s.a || o(t.datum_type) || o(s.datum_type)) ? (i = function (t, s, i) {
      var a,
          h,
          e,
          n,
          r = t.x,
          o = t.y,
          l = t.z ? t.z : 0;
      if (o < -j && -1.001 * j < o) o = -j;else if (j < o && o < 1.001 * j) o = j;else if (o < -j || j < o) return null;
      return r > Math.PI && (r -= 2 * Math.PI), h = Math.sin(o), n = Math.cos(o), e = h * h, {
        x: ((a = i / Math.sqrt(1 - s * e)) + l) * n * Math.cos(r),
        y: (a + l) * n * Math.sin(r),
        z: (a * (1 - s) + l) * h
      };
    }(i, t.es, t.a), o(t.datum_type) && (i = function (t, s, i) {
      if (s === q) return {
        x: t.x + i[0],
        y: t.y + i[1],
        z: t.z + i[2]
      };

      if (s === I) {
        var a = i[0],
            h = i[1],
            e = i[2],
            n = i[3],
            r = i[4],
            o = i[5],
            l = i[6];
        return {
          x: l * (t.x - o * t.y + r * t.z) + a,
          y: l * (o * t.x + t.y - n * t.z) + h,
          z: l * (-r * t.x + n * t.y + t.z) + e
        };
      }
    }(i, t.datum_type, t.datum_params)), o(s.datum_type) && (i = function (t, s, i) {
      if (s === q) return {
        x: t.x - i[0],
        y: t.y - i[1],
        z: t.z - i[2]
      };

      if (s === I) {
        var a = i[0],
            h = i[1],
            e = i[2],
            n = i[3],
            r = i[4],
            o = i[5],
            l = i[6],
            M = (t.x - a) / l,
            c = (t.y - h) / l,
            u = (t.z - e) / l;
        return {
          x: M + o * c - r * u,
          y: -o * M + c + n * u,
          z: r * M - n * c + u
        };
      }
    }(i, s.datum_type, s.datum_params)), function (t, s, i, a) {
      var h,
          e,
          n,
          r,
          o,
          l,
          M,
          c,
          u,
          f,
          m,
          p,
          d,
          _ = 1e-12,
          y = t.x,
          x = t.y,
          g = t.z ? t.z : 0,
          b = Math.sqrt(y * y + x * x),
          v = Math.sqrt(y * y + x * x + g * g);

      if (b / i < _) {
        if (p = 0, v / i < _) return d = -a, {
          x: t.x,
          y: t.y,
          z: t.z
        };
      } else p = Math.atan2(x, y);

      for (h = g / v, l = (e = b / v) * (1 - s) * (n = 1 / Math.sqrt(1 - s * (2 - s) * e * e)), M = h * n, m = 0; m++, r = s * (o = i / Math.sqrt(1 - s * M * M)) / (o + (d = b * l + g * M - o * (1 - s * M * M))), f = (u = h * (n = 1 / Math.sqrt(1 - r * (2 - r) * e * e))) * l - (c = e * (1 - r) * n) * M, l = c, M = u, 1e-24 < f * f && m < 30;) {
        ;
      }

      return {
        x: p,
        y: Math.atan(u / Math.abs(c)),
        z: d
      };
    }(i, s.es, s.a, s.b)) : i;
    var a, h;
  },
      dt = function dt(t, s, i) {
    for (var a, h, e = i.x, n = i.y, r = i.z || 0, o = {}, l = 0; l < 3; l++) {
      if (!s || 2 !== l || void 0 !== i.z) switch (h = 0 === l ? (a = e, "x") : 1 === l ? (a = n, "y") : (a = r, "z"), t.axis[l]) {
        case "e":
          o[h] = a;
          break;

        case "w":
          o[h] = -a;
          break;

        case "n":
          o[h] = a;
          break;

        case "s":
          o[h] = -a;
          break;

        case "u":
          void 0 !== i[h] && (o.z = a);
          break;

        case "d":
          void 0 !== i[h] && (o.z = -a);
          break;

        default:
          return null;
      }
    }

    return o;
  },
      _t = function _t(t) {
    var s = {
      x: t[0],
      y: t[1]
    };
    return 2 < t.length && (s.z = t[2]), 3 < t.length && (s.m = t[3]), s;
  },
      yt = function yt(t) {
    l(t.x), l(t.y);
  },
      xt = k("WGS84"),
      gt = 6,
      bt = "AJSAJS",
      vt = "AFAFAF",
      wt = 65,
      At = 73,
      Ct = 79,
      Et = 86,
      Pt = 90,
      Nt = {
    forward: m,
    inverse: function inverse(t) {
      var s = w(_(t.toUpperCase()));
      return s.lat && s.lon ? [s.lon, s.lat, s.lon, s.lat] : [s.left, s.bottom, s.right, s.top];
    },
    toPoint: p
  };

  x.fromMGRS = function (t) {
    return new x(p(t));
  }, x.prototype.toMGRS = function (t) {
    return m([this.x, this.y], t);
  };

  function St(t) {
    var s = [];
    s[0] = 1 - t * (.25 + t * (.046875 + t * (Jt + t * Kt))), s[1] = t * (.75 - t * (.046875 + t * (Jt + t * Kt)));
    var i = t * t;
    return s[2] = i * (.46875 - t * (.013020833333333334 + .007120768229166667 * t)), i *= t, s[3] = i * (.3645833333333333 - .005696614583333333 * t), s[4] = i * t * .3076171875, s;
  }

  function kt(t, s, i, a) {
    return i *= s, s *= s, a[0] * t - i * (a[1] + s * (a[2] + s * (a[3] + s * a[4])));
  }

  function qt(t, s, i) {
    for (var a = 1 / (1 - s), h = t, e = 20; e; --e) {
      var n = Math.sin(h),
          r = 1 - s * n * n;
      if (h -= r = (kt(h, n, Math.cos(h), i) - t) * (r * Math.sqrt(r)) * a, Math.abs(r) < D) return h;
    }

    return h;
  }

  function It(t) {
    var s = Math.exp(t);
    return (s - 1 / s) / 2;
  }

  function Rt(t, s) {
    t = Math.abs(t), s = Math.abs(s);
    var i = Math.max(t, s),
        a = Math.min(t, s) / (i || 1);
    return i * Math.sqrt(1 + Math.pow(a, 2));
  }

  function Ot(t, s) {
    for (var i, a = 2 * Math.cos(2 * s), h = t.length - 1, e = t[h], n = 0; 0 <= --h;) {
      i = a * e - n + t[h], n = e, e = i;
    }

    return s + i * Math.sin(2 * s);
  }

  function Gt(t, s, i) {
    for (var a, h, e, n, r = Math.sin(s), o = Math.cos(s), l = It(i), M = (e = i, ((n = Math.exp(e)) + 1 / n) / 2), c = 2 * o * M, u = -2 * r * l, f = t.length - 1, m = t[f], p = 0, d = 0, _ = 0; 0 <= --f;) {
      a = d, h = p, m = c * (d = m) - a - u * (p = _) + t[f], _ = u * d - h + c * p;
    }

    return [(c = r * M) * m - (u = o * l) * _, c * _ + u * m];
  }

  function jt(t, s) {
    return Math.pow((1 - t) / (1 + t), s);
  }

  function Lt(t, s, i, a, h) {
    return t * h - s * Math.sin(2 * h) + i * Math.sin(4 * h) - a * Math.sin(6 * h);
  }

  function zt(t) {
    return 1 - .25 * t * (1 + t / 16 * (3 + 1.25 * t));
  }

  function Tt(t) {
    return .375 * t * (1 + .25 * t * (1 + .46875 * t));
  }

  function Dt(t) {
    return .05859375 * t * t * (1 + .75 * t);
  }

  function Bt(t) {
    return t * t * t * (35 / 3072);
  }

  function Ut(t, s, i) {
    var a = s * i;
    return t / Math.sqrt(1 - a * a);
  }

  function Ft(t) {
    return Math.abs(t) < j ? t : t - it(t) * Math.PI;
  }

  function Qt(t, s, i, a, h) {
    for (var e, n = t / s, r = 0; r < 15; r++) {
      if (n += e = (t - (s * n - i * Math.sin(2 * n) + a * Math.sin(4 * n) - h * Math.sin(6 * n))) / (s - 2 * i * Math.cos(2 * n) + 4 * a * Math.cos(4 * n) - 6 * h * Math.cos(6 * n)), Math.abs(e) <= 1e-10) return n;
    }

    return NaN;
  }

  function Wt(t, s) {
    var i;
    return 1e-7 < t ? (1 - t * t) * (s / (1 - (i = t * s) * i) - .5 / t * Math.log((1 - i) / (1 + i))) : 2 * s;
  }

  function Ht(t) {
    return 1 < Math.abs(t) && (t = 1 < t ? 1 : -1), Math.asin(t);
  }

  var Xt,
      Jt = .01953125,
      Kt = .01068115234375,
      Vt = {
    init: function init() {
      this.x0 = void 0 !== this.x0 ? this.x0 : 0, this.y0 = void 0 !== this.y0 ? this.y0 : 0, this.long0 = void 0 !== this.long0 ? this.long0 : 0, this.lat0 = void 0 !== this.lat0 ? this.lat0 : 0, this.es && (this.en = St(this.es), this.ml0 = kt(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en));
    },
    forward: function forward(t) {
      var s = t.x,
          i = t.y,
          a = at(s - this.long0),
          h = Math.sin(i),
          e = Math.cos(i);

      if (this.es) {
        var n = e * a,
            r = Math.pow(n, 2),
            o = this.ep2 * Math.pow(e, 2),
            l = Math.pow(o, 2),
            M = Math.abs(e) > D ? Math.tan(i) : 0,
            c = Math.pow(M, 2),
            u = Math.pow(c, 2),
            f = 1 - this.es * Math.pow(h, 2);
        n /= Math.sqrt(f);
        var m = kt(i, h, e, this.en),
            p = this.a * (this.k0 * n * (1 + r / 6 * (1 - c + o + r / 20 * (5 - 18 * c + u + 14 * o - 58 * c * o + r / 42 * (61 + 179 * u - u * c - 479 * c))))) + this.x0,
            d = this.a * (this.k0 * (m - this.ml0 + h * a * n / 2 * (1 + r / 12 * (5 - c + 9 * o + 4 * l + r / 30 * (61 + u - 58 * c + 270 * o - 330 * c * o + r / 56 * (1385 + 543 * u - u * c - 3111 * c)))))) + this.y0;
      } else {
        var _ = e * Math.sin(a);

        if (Math.abs(Math.abs(_) - 1) < D) return 93;

        if (p = .5 * this.a * this.k0 * Math.log((1 + _) / (1 - _)) + this.x0, d = e * Math.cos(a) / Math.sqrt(1 - Math.pow(_, 2)), 1 <= (_ = Math.abs(d))) {
          if (D < _ - 1) return 93;
          d = 0;
        } else d = Math.acos(d);

        i < 0 && (d = -d), d = this.a * this.k0 * (d - this.lat0) + this.y0;
      }

      return t.x = p, t.y = d, t;
    },
    inverse: function inverse(t) {
      var s,
          i,
          a,
          h,
          e,
          n,
          r,
          o,
          l,
          M,
          c,
          u,
          f,
          m,
          p,
          d,
          _,
          y = (t.x - this.x0) * (1 / this.a),
          x = (t.y - this.y0) * (1 / this.a);

      return f = this.es ? (l = this.ml0 + x / this.k0, s = qt(l, this.es, this.en), Math.abs(s) < j ? (i = Math.sin(s), a = Math.cos(s), h = Math.abs(a) > D ? Math.tan(s) : 0, e = this.ep2 * Math.pow(a, 2), n = Math.pow(e, 2), r = Math.pow(h, 2), o = Math.pow(r, 2), l = 1 - this.es * Math.pow(i, 2), M = y * Math.sqrt(l) / this.k0, u = s - (l *= h) * (c = Math.pow(M, 2)) / (1 - this.es) * .5 * (1 - c / 12 * (5 + 3 * r - 9 * e * r + e - 4 * n - c / 30 * (61 + 90 * r - 252 * e * r + 45 * o + 46 * e - c / 56 * (1385 + 3633 * r + 4095 * o + 1574 * o * r)))), at(this.long0 + M * (1 - c / 6 * (1 + 2 * r + e - c / 20 * (5 + 28 * r + 24 * o + 8 * e * r + 6 * e - c / 42 * (61 + 662 * r + 1320 * o + 720 * o * r)))) / a)) : (u = j * it(x), 0)) : (p = .5 * ((m = Math.exp(y / this.k0)) - 1 / m), d = this.lat0 + x / this.k0, _ = Math.cos(d), l = Math.sqrt((1 - Math.pow(_, 2)) / (1 + Math.pow(p, 2))), u = Math.asin(l), x < 0 && (u = -u), 0 == p && 0 === _ ? 0 : at(Math.atan2(p, _) + this.long0)), t.x = f, t.y = u, t;
    },
    names: ["Transverse_Mercator", "Transverse Mercator", "tmerc"]
  },
      Zt = {
    init: function init() {
      if (void 0 === this.es || this.es <= 0) throw new Error("incorrect elliptical usage");
      this.x0 = void 0 !== this.x0 ? this.x0 : 0, this.y0 = void 0 !== this.y0 ? this.y0 : 0, this.long0 = void 0 !== this.long0 ? this.long0 : 0, this.lat0 = void 0 !== this.lat0 ? this.lat0 : 0, this.cgb = [], this.cbg = [], this.utg = [], this.gtu = [];
      var t = this.es / (1 + Math.sqrt(1 - this.es)),
          s = t / (2 - t),
          i = s;
      this.cgb[0] = s * (2 + s * (-2 / 3 + s * (s * (116 / 45 + s * (26 / 45 + -2854 / 675 * s)) - 2))), this.cbg[0] = s * (s * (2 / 3 + s * (4 / 3 + s * (-82 / 45 + s * (32 / 45 + 4642 / 4725 * s)))) - 2), i *= s, this.cgb[1] = i * (7 / 3 + s * (s * (-227 / 45 + s * (2704 / 315 + 2323 / 945 * s)) - 1.6)), this.cbg[1] = i * (5 / 3 + s * (-16 / 15 + s * (-13 / 9 + s * (904 / 315 + -1522 / 945 * s)))), i *= s, this.cgb[2] = i * (56 / 15 + s * (-136 / 35 + s * (-1262 / 105 + 73814 / 2835 * s))), this.cbg[2] = i * (-26 / 15 + s * (34 / 21 + s * (1.6 + -12686 / 2835 * s))), i *= s, this.cgb[3] = i * (4279 / 630 + s * (-332 / 35 + -399572 / 14175 * s)), this.cbg[3] = i * (1237 / 630 + s * (-24832 / 14175 * s - 2.4)), i *= s, this.cgb[4] = i * (4174 / 315 + -144838 / 6237 * s), this.cbg[4] = i * (-734 / 315 + 109598 / 31185 * s), i *= s, this.cgb[5] = i * (601676 / 22275), this.cbg[5] = i * (444337 / 155925), i = Math.pow(s, 2), this.Qn = this.k0 / (1 + s) * (1 + i * (.25 + i * (1 / 64 + i / 256))), this.utg[0] = s * (s * (2 / 3 + s * (-37 / 96 + s * (1 / 360 + s * (81 / 512 + -96199 / 604800 * s)))) - .5), this.gtu[0] = s * (.5 + s * (-2 / 3 + s * (5 / 16 + s * (41 / 180 + s * (-127 / 288 + 7891 / 37800 * s))))), this.utg[1] = i * (-1 / 48 + s * (-1 / 15 + s * (437 / 1440 + s * (-46 / 105 + 1118711 / 3870720 * s)))), this.gtu[1] = i * (13 / 48 + s * (s * (557 / 1440 + s * (281 / 630 + -1983433 / 1935360 * s)) - .6)), i *= s, this.utg[2] = i * (-17 / 480 + s * (37 / 840 + s * (209 / 4480 + -5569 / 90720 * s))), this.gtu[2] = i * (61 / 240 + s * (-103 / 140 + s * (15061 / 26880 + 167603 / 181440 * s))), i *= s, this.utg[3] = i * (-4397 / 161280 + s * (11 / 504 + 830251 / 7257600 * s)), this.gtu[3] = i * (49561 / 161280 + s * (-179 / 168 + 6601661 / 7257600 * s)), i *= s, this.utg[4] = i * (-4583 / 161280 + 108847 / 3991680 * s), this.gtu[4] = i * (34729 / 80640 + -3418889 / 1995840 * s), i *= s, this.utg[5] = -.03233083094085698 * i, this.gtu[5] = .6650675310896665 * i;
      var a = Ot(this.cbg, this.lat0);

      this.Zb = -this.Qn * (a + function (t, s) {
        for (var i, a = 2 * Math.cos(s), h = t.length - 1, e = t[h], n = 0; --h >= 0;) {
          i = -n + a * e + t[h], n = e, e = i;
        }

        return Math.sin(s) * i;
      }(this.gtu, 2 * a));
    },
    forward: function forward(t) {
      var s,
          i,
          a = at(t.x - this.long0),
          h = t.y,
          h = Ot(this.cbg, h),
          e = Math.sin(h),
          n = Math.cos(h),
          r = Math.sin(a),
          o = Math.cos(a);
      h = Math.atan2(e, o * n), a = Math.atan2(r * n, Rt(e, n * o)), s = Math.tan(a), i = function (t) {
        var s = 1 + t,
            i = s - 1;
        return 0 === i ? t : t * Math.log(s) / i;
      }((i = Math.abs(s)) * (1 + i / (Rt(1, i) + 1))), a = s < 0 ? -i : i;
      var l,
          M,
          c = Gt(this.gtu, 2 * h, 2 * a);
      return h += c[0], a += c[1], M = Math.abs(a) <= 2.623395162778 ? (l = this.a * (this.Qn * a) + this.x0, this.a * (this.Qn * h + this.Zb) + this.y0) : l = 1 / 0, t.x = l, t.y = M, t;
    },
    inverse: function inverse(t) {
      var s,
          i,
          a,
          h,
          e,
          n,
          r,
          o = (t.x - this.x0) * (1 / this.a),
          l = (t.y - this.y0) * (1 / this.a);
      return l = (l - this.Zb) / this.Qn, o /= this.Qn, r = Math.abs(o) <= 2.623395162778 ? (l += (s = Gt(this.utg, 2 * l, 2 * o))[0], o += s[1], o = Math.atan(It(o)), i = Math.sin(l), a = Math.cos(l), h = Math.sin(o), e = Math.cos(o), l = Math.atan2(i * e, Rt(h, e * a)), o = Math.atan2(h, e * a), n = at(o + this.long0), Ot(this.cgb, l)) : n = 1 / 0, t.x = n, t.y = r, t;
    },
    names: ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc"]
  },
      Yt = {
    init: function init() {
      var t = function (t, s) {
        if (void 0 === t) {
          if (t = Math.floor(30 * (at(s) + Math.PI) / Math.PI) + 1, t < 0) return 0;
          if (t > 60) return 60;
        }

        return t;
      }(this.zone, this.long0);

      if (void 0 === t) throw new Error("unknown utm zone");
      this.lat0 = 0, this.long0 = (6 * Math.abs(t) - 183) * A, this.x0 = 5e5, this.y0 = this.utmSouth ? 1e7 : 0, this.k0 = .9996, Zt.init.apply(this), this.forward = Zt.forward, this.inverse = Zt.inverse;
    },
    names: ["Universal Transverse Mercator System", "utm"],
    dependsOn: "etmerc"
  },
      $t = {
    init: function init() {
      var t = Math.sin(this.lat0),
          s = Math.cos(this.lat0);
      s *= s, this.rc = Math.sqrt(1 - this.es) / (1 - this.es * t * t), this.C = Math.sqrt(1 + this.es * s * s / (1 - this.es)), this.phic0 = Math.asin(t / this.C), this.ratexp = .5 * this.C * this.e, this.K = Math.tan(.5 * this.phic0 + E) / (Math.pow(Math.tan(.5 * this.lat0 + E), this.C) * jt(this.e * t, this.ratexp));
    },
    forward: function forward(t) {
      var s = t.x,
          i = t.y;
      return t.y = 2 * Math.atan(this.K * Math.pow(Math.tan(.5 * i + E), this.C) * jt(this.e * Math.sin(i), this.ratexp)) - j, t.x = this.C * s, t;
    },
    inverse: function inverse(t) {
      for (var s = t.x / this.C, i = t.y, a = Math.pow(Math.tan(.5 * i + E) / this.K, 1 / this.C), h = 20; 0 < h && (i = 2 * Math.atan(a * jt(this.e * Math.sin(t.y), -.5 * this.e)) - j, !(Math.abs(i - t.y) < 1e-14)); --h) {
        t.y = i;
      }

      return h ? (t.x = s, t.y = i, t) : null;
    },
    names: ["gauss"]
  },
      ts = {
    init: function init() {
      $t.init.apply(this), this.rc && (this.sinc0 = Math.sin(this.phic0), this.cosc0 = Math.cos(this.phic0), this.R2 = 2 * this.rc, this.title || (this.title = "Oblique Stereographic Alternative"));
    },
    forward: function forward(t) {
      var s, i, a, h;
      return t.x = at(t.x - this.long0), $t.forward.apply(this, [t]), s = Math.sin(t.y), i = Math.cos(t.y), a = Math.cos(t.x), h = this.k0 * this.R2 / (1 + this.sinc0 * s + this.cosc0 * i * a), t.x = h * i * Math.sin(t.x), t.y = h * (this.cosc0 * s - this.sinc0 * i * a), t.x = this.a * t.x + this.x0, t.y = this.a * t.y + this.y0, t;
    },
    inverse: function inverse(t) {
      var s, i, a, h, e, n;
      return t.x = (t.x - this.x0) / this.a, t.y = (t.y - this.y0) / this.a, t.x /= this.k0, t.y /= this.k0, n = (s = Math.sqrt(t.x * t.x + t.y * t.y)) ? (i = 2 * Math.atan2(s, this.R2), a = Math.sin(i), h = Math.cos(i), e = Math.asin(h * this.sinc0 + t.y * a * this.cosc0 / s), Math.atan2(t.x * a, s * this.cosc0 * h - t.y * this.sinc0 * a)) : (e = this.phic0, 0), t.x = n, t.y = e, $t.inverse.apply(this, [t]), t.x = at(t.x + this.long0), t;
    },
    names: ["Stereographic_North_Pole", "Oblique_Stereographic", "Polar_Stereographic", "sterea", "Oblique Stereographic Alternative"]
  },
      ss = {
    init: function init() {
      this.coslat0 = Math.cos(this.lat0), this.sinlat0 = Math.sin(this.lat0), this.sphere ? 1 === this.k0 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= D && (this.k0 = .5 * (1 + it(this.lat0) * Math.sin(this.lat_ts))) : (Math.abs(this.coslat0) <= D && (0 < this.lat0 ? this.con = 1 : this.con = -1), this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e)), 1 === this.k0 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= D && (this.k0 = .5 * this.cons * st(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / ht(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts))), this.ms1 = st(this.e, this.sinlat0, this.coslat0), this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - j, this.cosX0 = Math.cos(this.X0), this.sinX0 = Math.sin(this.X0));
    },
    forward: function forward(t) {
      var s,
          i,
          a,
          h,
          e,
          n,
          r = t.x,
          o = t.y,
          l = Math.sin(o),
          M = Math.cos(o),
          c = at(r - this.long0);
      return Math.abs(Math.abs(r - this.long0) - Math.PI) <= D && Math.abs(o + this.lat0) <= D ? (t.x = NaN, t.y = NaN) : this.sphere ? (s = 2 * this.k0 / (1 + this.sinlat0 * l + this.coslat0 * M * Math.cos(c)), t.x = this.a * s * M * Math.sin(c) + this.x0, t.y = this.a * s * (this.coslat0 * l - this.sinlat0 * M * Math.cos(c)) + this.y0) : (i = 2 * Math.atan(this.ssfn_(o, l, this.e)) - j, h = Math.cos(i), a = Math.sin(i), Math.abs(this.coslat0) <= D ? (e = ht(this.e, o * this.con, this.con * l), n = 2 * this.a * this.k0 * e / this.cons, t.x = this.x0 + n * Math.sin(r - this.long0), t.y = this.y0 - this.con * n * Math.cos(r - this.long0)) : (Math.abs(this.sinlat0) < D ? (s = 2 * this.a * this.k0 / (1 + h * Math.cos(c)), t.y = s * a) : (s = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * a + this.cosX0 * h * Math.cos(c))), t.y = s * (this.cosX0 * a - this.sinX0 * h * Math.cos(c)) + this.y0), t.x = s * h * Math.sin(c) + this.x0)), t;
    },
    inverse: function inverse(t) {
      t.x -= this.x0, t.y -= this.y0;
      var s,
          i,
          a,
          h = Math.sqrt(t.x * t.x + t.y * t.y);

      if (this.sphere) {
        var e = 2 * Math.atan(h / (.5 * this.a * this.k0)),
            n = this.long0,
            r = this.lat0;
        return h <= D || (r = Math.asin(Math.cos(e) * this.sinlat0 + t.y * Math.sin(e) * this.coslat0 / h), n = at(Math.abs(this.coslat0) < D ? 0 < this.lat0 ? this.long0 + Math.atan2(t.x, -1 * t.y) : this.long0 + Math.atan2(t.x, t.y) : this.long0 + Math.atan2(t.x * Math.sin(e), h * this.coslat0 * Math.cos(e) - t.y * this.sinlat0 * Math.sin(e)))), t.x = n, t.y = r, t;
      }

      if (Math.abs(this.coslat0) <= D) {
        if (h <= D) return r = this.lat0, n = this.long0, t.x = n, t.y = r, t;
        t.x *= this.con, t.y *= this.con, s = h * this.cons / (2 * this.a * this.k0), r = this.con * et(this.e, s), n = this.con * at(this.con * this.long0 + Math.atan2(t.x, -1 * t.y));
      } else i = 2 * Math.atan(h * this.cosX0 / (2 * this.a * this.k0 * this.ms1)), n = this.long0, h <= D ? a = this.X0 : (a = Math.asin(Math.cos(i) * this.sinX0 + t.y * Math.sin(i) * this.cosX0 / h), n = at(this.long0 + Math.atan2(t.x * Math.sin(i), h * this.cosX0 * Math.cos(i) - t.y * this.sinX0 * Math.sin(i)))), r = -1 * et(this.e, Math.tan(.5 * (j + a)));

      return t.x = n, t.y = r, t;
    },
    names: ["stere", "Stereographic_South_Pole", "Polar Stereographic (variant B)"],
    ssfn_: function ssfn_(t, s, i) {
      return s *= i, Math.tan(.5 * (j + t)) * Math.pow((1 - s) / (1 + s), .5 * i);
    }
  },
      is = {
    init: function init() {
      var t = this.lat0;
      this.lambda0 = this.long0;
      var s = Math.sin(t),
          i = this.a,
          a = 1 / this.rf,
          h = 2 * a - Math.pow(a, 2),
          e = this.e = Math.sqrt(h);
      this.R = this.k0 * i * Math.sqrt(1 - h) / (1 - h * Math.pow(s, 2)), this.alpha = Math.sqrt(1 + h / (1 - h) * Math.pow(Math.cos(t), 4)), this.b0 = Math.asin(s / this.alpha);
      var n = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2)),
          r = Math.log(Math.tan(Math.PI / 4 + t / 2)),
          o = Math.log((1 + e * s) / (1 - e * s));
      this.K = n - this.alpha * r + this.alpha * e / 2 * o;
    },
    forward: function forward(t) {
      var s = Math.log(Math.tan(Math.PI / 4 - t.y / 2)),
          i = this.e / 2 * Math.log((1 + this.e * Math.sin(t.y)) / (1 - this.e * Math.sin(t.y))),
          a = -this.alpha * (s + i) + this.K,
          h = 2 * (Math.atan(Math.exp(a)) - Math.PI / 4),
          e = this.alpha * (t.x - this.lambda0),
          n = Math.atan(Math.sin(e) / (Math.sin(this.b0) * Math.tan(h) + Math.cos(this.b0) * Math.cos(e))),
          r = Math.asin(Math.cos(this.b0) * Math.sin(h) - Math.sin(this.b0) * Math.cos(h) * Math.cos(e));
      return t.y = this.R / 2 * Math.log((1 + Math.sin(r)) / (1 - Math.sin(r))) + this.y0, t.x = this.R * n + this.x0, t;
    },
    inverse: function inverse(t) {
      for (var s = t.x - this.x0, i = t.y - this.y0, a = s / this.R, h = 2 * (Math.atan(Math.exp(i / this.R)) - Math.PI / 4), e = Math.asin(Math.cos(this.b0) * Math.sin(h) + Math.sin(this.b0) * Math.cos(h) * Math.cos(a)), n = Math.atan(Math.sin(a) / (Math.cos(this.b0) * Math.cos(a) - Math.sin(this.b0) * Math.tan(h))), r = this.lambda0 + n / this.alpha, o = 0, l = e, M = -1e3, c = 0; 1e-7 < Math.abs(l - M);) {
        if (20 < ++c) return;
        o = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + e / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(l)) / 2)), M = l, l = 2 * Math.atan(Math.exp(o)) - Math.PI / 2;
      }

      return t.x = r, t.y = l, t;
    },
    names: ["somerc"]
  },
      as = {
    init: function init() {
      this.no_off = this.no_off || !1, this.no_rot = this.no_rot || !1, isNaN(this.k0) && (this.k0 = 1);
      var t = Math.sin(this.lat0),
          s = Math.cos(this.lat0),
          i = this.e * t;
      this.bl = Math.sqrt(1 + this.es / (1 - this.es) * Math.pow(s, 4)), this.al = this.a * this.bl * this.k0 * Math.sqrt(1 - this.es) / (1 - i * i);
      var a,
          h,
          e,
          n,
          r,
          o,
          l,
          M,
          c,
          u,
          f = ht(this.e, this.lat0, t),
          m = this.bl / s * Math.sqrt((1 - this.es) / (1 - i * i));
      m * m < 1 && (m = 1), isNaN(this.longc) ? (a = ht(this.e, this.lat1, Math.sin(this.lat1)), h = ht(this.e, this.lat2, Math.sin(this.lat2)), 0 <= this.lat0 ? this.el = (m + Math.sqrt(m * m - 1)) * Math.pow(f, this.bl) : this.el = (m - Math.sqrt(m * m - 1)) * Math.pow(f, this.bl), e = Math.pow(a, this.bl), n = Math.pow(h, this.bl), o = .5 * ((r = this.el / e) - 1 / r), l = (this.el * this.el - n * e) / (this.el * this.el + n * e), M = (n - e) / (n + e), c = at(this.long1 - this.long2), this.long0 = .5 * (this.long1 + this.long2) - Math.atan(l * Math.tan(.5 * this.bl * c) / M) / this.bl, this.long0 = at(this.long0), u = at(this.long1 - this.long0), this.gamma0 = Math.atan(Math.sin(this.bl * u) / o), this.alpha = Math.asin(m * Math.sin(this.gamma0))) : (r = 0 <= this.lat0 ? m + Math.sqrt(m * m - 1) : m - Math.sqrt(m * m - 1), this.el = r * Math.pow(f, this.bl), o = .5 * (r - 1 / r), this.gamma0 = Math.asin(Math.sin(this.alpha) / m), this.long0 = this.longc - Math.asin(Math.min(o * Math.tan(this.gamma0), 1)) / this.bl), this.no_off ? this.uc = 0 : 0 <= this.lat0 ? this.uc = this.al / this.bl * Math.atan2(Math.sqrt(m * m - 1), Math.cos(this.alpha)) : this.uc = -1 * this.al / this.bl * Math.atan2(Math.sqrt(m * m - 1), Math.cos(this.alpha));
    },
    forward: function forward(t) {
      var s,
          i,
          a,
          h,
          e,
          n,
          r,
          o,
          l,
          M = t.x,
          c = t.y,
          u = at(M - this.long0);
      return l = Math.abs(Math.abs(c) - j) <= D ? (s = 0 < c ? -1 : 1, o = this.al / this.bl * Math.log(Math.tan(E + s * this.gamma0 * .5)), -1 * s * j * this.al / this.bl) : (i = ht(this.e, c, Math.sin(c)), h = .5 * ((a = this.el / Math.pow(i, this.bl)) - 1 / a), e = .5 * (a + 1 / a), n = Math.sin(this.bl * u), r = (h * Math.sin(this.gamma0) - n * Math.cos(this.gamma0)) / e, o = Math.abs(Math.abs(r) - 1) <= D ? Number.POSITIVE_INFINITY : .5 * this.al * Math.log((1 - r) / (1 + r)) / this.bl, Math.abs(Math.cos(this.bl * u)) <= D ? this.al * this.bl * u : this.al * Math.atan2(h * Math.cos(this.gamma0) + n * Math.sin(this.gamma0), Math.cos(this.bl * u)) / this.bl), this.no_rot ? (t.x = this.x0 + l, t.y = this.y0 + o) : (l -= this.uc, t.x = this.x0 + o * Math.cos(this.alpha) + l * Math.sin(this.alpha), t.y = this.y0 + l * Math.cos(this.alpha) - o * Math.sin(this.alpha)), t;
    },
    inverse: function inverse(t) {
      var s, i;
      this.no_rot ? (i = t.y - this.y0, s = t.x - this.x0) : (i = (t.x - this.x0) * Math.cos(this.alpha) - (t.y - this.y0) * Math.sin(this.alpha), s = (t.y - this.y0) * Math.cos(this.alpha) + (t.x - this.x0) * Math.sin(this.alpha), s += this.uc);
      var a = Math.exp(-1 * this.bl * i / this.al),
          h = .5 * (a - 1 / a),
          e = .5 * (a + 1 / a),
          n = Math.sin(this.bl * s / this.al),
          r = (n * Math.cos(this.gamma0) + h * Math.sin(this.gamma0)) / e,
          o = Math.pow(this.el / Math.sqrt((1 + r) / (1 - r)), 1 / this.bl);
      return Math.abs(r - 1) < D ? (t.x = this.long0, t.y = j) : Math.abs(1 + r) < D ? (t.x = this.long0, t.y = -1 * j) : (t.y = et(this.e, o), t.x = at(this.long0 - Math.atan2(h * Math.cos(this.gamma0) - n * Math.sin(this.gamma0), Math.cos(this.bl * s / this.al)) / this.bl)), t;
    },
    names: ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "omerc"]
  },
      hs = {
    init: function init() {
      var t, s, i, a, h, e, n, r, o, l;
      this.lat2 || (this.lat2 = this.lat1), this.k0 || (this.k0 = 1), this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, Math.abs(this.lat1 + this.lat2) < D || (t = this.b / this.a, this.e = Math.sqrt(1 - t * t), s = Math.sin(this.lat1), i = Math.cos(this.lat1), a = st(this.e, s, i), h = ht(this.e, this.lat1, s), e = Math.sin(this.lat2), n = Math.cos(this.lat2), r = st(this.e, e, n), o = ht(this.e, this.lat2, e), l = ht(this.e, this.lat0, Math.sin(this.lat0)), Math.abs(this.lat1 - this.lat2) > D ? this.ns = Math.log(a / r) / Math.log(h / o) : this.ns = s, isNaN(this.ns) && (this.ns = s), this.f0 = a / (this.ns * Math.pow(h, this.ns)), this.rh = this.a * this.f0 * Math.pow(l, this.ns), this.title || (this.title = "Lambert Conformal Conic"));
    },
    forward: function forward(t) {
      var s = t.x,
          i = t.y;
      Math.abs(2 * Math.abs(i) - Math.PI) <= D && (i = it(i) * (j - 2 * D));
      var a,
          h,
          e = Math.abs(Math.abs(i) - j);
      if (D < e) a = ht(this.e, i, Math.sin(i)), h = this.a * this.f0 * Math.pow(a, this.ns);else {
        if ((e = i * this.ns) <= 0) return null;
        h = 0;
      }
      var n = this.ns * at(s - this.long0);
      return t.x = this.k0 * (h * Math.sin(n)) + this.x0, t.y = this.k0 * (this.rh - h * Math.cos(n)) + this.y0, t;
    },
    inverse: function inverse(t) {
      var s,
          i,
          a,
          h,
          e = (t.x - this.x0) / this.k0,
          n = this.rh - (t.y - this.y0) / this.k0,
          r = 0 < this.ns ? (s = Math.sqrt(e * e + n * n), 1) : (s = -Math.sqrt(e * e + n * n), -1),
          o = 0;

      if (0 !== s && (o = Math.atan2(r * e, r * n)), 0 !== s || 0 < this.ns) {
        if (r = 1 / this.ns, i = Math.pow(s / (this.a * this.f0), r), -9999 === (a = et(this.e, i))) return null;
      } else a = -j;

      return h = at(o / this.ns + this.long0), t.x = h, t.y = a, t;
    },
    names: ["Lambert Tangential Conformal Conic Projection", "Lambert_Conformal_Conic", "Lambert_Conformal_Conic_2SP", "lcc"]
  },
      es = {
    init: function init() {
      this.a = 6377397.155, this.es = .006674372230614, this.e = Math.sqrt(this.es), this.lat0 || (this.lat0 = .863937979737193), this.long0 || (this.long0 = .4334234309119251), this.k0 || (this.k0 = .9999), this.s45 = .785398163397448, this.s90 = 2 * this.s45, this.fi0 = this.lat0, this.e2 = this.es, this.e = Math.sqrt(this.e2), this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2)), this.uq = 1.04216856380474, this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa), this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2), this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g, this.k1 = this.k0, this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2)), this.s0 = 1.37008346281555, this.n = Math.sin(this.s0), this.ro0 = this.k1 * this.n0 / Math.tan(this.s0), this.ad = this.s90 - this.uq;
    },
    forward: function forward(t) {
      var s = t.x,
          i = t.y,
          a = at(s - this.long0),
          h = Math.pow((1 + this.e * Math.sin(i)) / (1 - this.e * Math.sin(i)), this.alfa * this.e / 2),
          e = 2 * (Math.atan(this.k * Math.pow(Math.tan(i / 2 + this.s45), this.alfa) / h) - this.s45),
          n = -a * this.alfa,
          r = Math.asin(Math.cos(this.ad) * Math.sin(e) + Math.sin(this.ad) * Math.cos(e) * Math.cos(n)),
          o = Math.asin(Math.cos(e) * Math.sin(n) / Math.cos(r)),
          l = this.n * o,
          M = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(r / 2 + this.s45), this.n);
      return t.y = M * Math.cos(l), t.x = M * Math.sin(l), this.czech || (t.y *= -1, t.x *= -1), t;
    },
    inverse: function inverse(t) {
      var s,
          i,
          a,
          h,
          e,
          n,
          r,
          o = t.x;
      t.x = t.y, t.y = o, this.czech || (t.y *= -1, t.x *= -1), e = Math.sqrt(t.x * t.x + t.y * t.y), h = Math.atan2(t.y, t.x) / Math.sin(this.s0), a = 2 * (Math.atan(Math.pow(this.ro0 / e, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45), s = Math.asin(Math.cos(this.ad) * Math.sin(a) - Math.sin(this.ad) * Math.cos(a) * Math.cos(h)), i = Math.asin(Math.cos(a) * Math.sin(h) / Math.cos(s)), t.x = this.long0 - i / this.alfa, n = s;

      for (var l = r = 0; t.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(s / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(n)) / (1 - this.e * Math.sin(n)), this.e / 2)) - this.s45), Math.abs(n - t.y) < 1e-10 && (r = 1), n = t.y, l += 1, 0 === r && l < 15;) {
        ;
      }

      return 15 <= l ? null : t;
    },
    names: ["Krovak", "krovak"]
  },
      ns = {
    init: function init() {
      this.sphere || (this.e0 = zt(this.es), this.e1 = Tt(this.es), this.e2 = Dt(this.es), this.e3 = Bt(this.es), this.ml0 = this.a * Lt(this.e0, this.e1, this.e2, this.e3, this.lat0));
    },
    forward: function forward(t) {
      var s,
          i,
          a,
          h,
          e,
          n,
          r,
          o,
          l,
          M = t.x,
          c = t.y,
          M = at(M - this.long0);
      return l = this.sphere ? (o = this.a * Math.asin(Math.cos(c) * Math.sin(M)), this.a * (Math.atan2(Math.tan(c), Math.cos(M)) - this.lat0)) : (s = Math.sin(c), i = Math.cos(c), a = Ut(this.a, this.e, s), h = Math.tan(c) * Math.tan(c), o = a * (e = M * Math.cos(c)) * (1 - (n = e * e) * h * (1 / 6 - (8 - h + 8 * (r = this.es * i * i / (1 - this.es))) * n / 120)), this.a * Lt(this.e0, this.e1, this.e2, this.e3, c) - this.ml0 + a * s / i * n * (.5 + (5 - h + 6 * r) * n / 24)), t.x = o + this.x0, t.y = l + this.y0, t;
    },
    inverse: function inverse(t) {
      t.x -= this.x0, t.y -= this.y0;
      var s = t.x / this.a,
          i = t.y / this.a;
      if (this.sphere) var a = i + this.lat0,
          h = Math.asin(Math.sin(a) * Math.cos(s)),
          e = Math.atan2(Math.tan(s), Math.cos(a));else {
        var n = this.ml0 / this.a + i,
            r = Qt(n, this.e0, this.e1, this.e2, this.e3);
        if (Math.abs(Math.abs(r) - j) <= D) return t.x = this.long0, t.y = j, i < 0 && (t.y *= -1), t;
        var o = Ut(this.a, this.e, Math.sin(r)),
            l = o * o * o / this.a / this.a * (1 - this.es),
            M = Math.pow(Math.tan(r), 2),
            c = s * this.a / o,
            u = c * c;
        h = r - o * Math.tan(r) / l * c * c * (.5 - (1 + 3 * M) * c * c / 24), e = c * (1 - u * (M / 3 + (1 + 3 * M) * M * u / 15)) / Math.cos(r);
      }
      return t.x = at(e + this.long0), t.y = Ft(h), t;
    },
    names: ["Cassini", "Cassini_Soldner", "cass"]
  },
      rs = .3333333333333333,
      os = .17222222222222222,
      ls = .10257936507936508,
      Ms = .06388888888888888,
      cs = .0664021164021164,
      us = .016415012942191543,
      fs = {
    init: function init() {
      var t,
          s,
          i,
          a,
          h = Math.abs(this.lat0);
      if (Math.abs(h - j) < D ? this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE : Math.abs(h) < D ? this.mode = this.EQUIT : this.mode = this.OBLIQ, 0 < this.es) switch (this.qp = Wt(this.e, 1), this.mmf = .5 / (1 - this.es), this.apa = (s = this.es, (a = [])[0] = s * rs, i = s * s, a[0] += i * os, a[1] = i * Ms, i *= s, a[0] += i * ls, a[1] += i * cs, a[2] = i * us, a), this.mode) {
        case this.N_POLE:
        case this.S_POLE:
          this.dd = 1;
          break;

        case this.EQUIT:
          this.rq = Math.sqrt(.5 * this.qp), this.dd = 1 / this.rq, this.xmf = 1, this.ymf = .5 * this.qp;
          break;

        case this.OBLIQ:
          this.rq = Math.sqrt(.5 * this.qp), t = Math.sin(this.lat0), this.sinb1 = Wt(this.e, t) / this.qp, this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1), this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * t * t) * this.rq * this.cosb1), this.ymf = (this.xmf = this.rq) / this.dd, this.xmf *= this.dd;
      } else this.mode === this.OBLIQ && (this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0));
    },
    forward: function forward(t) {
      var s,
          i,
          a,
          h,
          e,
          n,
          r,
          o,
          l,
          M,
          c = t.x,
          u = t.y,
          c = at(c - this.long0);

      if (this.sphere) {
        if (e = Math.sin(u), M = Math.cos(u), a = Math.cos(c), this.mode === this.OBLIQ || this.mode === this.EQUIT) {
          if ((i = this.mode === this.EQUIT ? 1 + M * a : 1 + this.sinph0 * e + this.cosph0 * M * a) <= D) return null;
          s = (i = Math.sqrt(2 / i)) * M * Math.sin(c), i *= this.mode === this.EQUIT ? e : this.cosph0 * e - this.sinph0 * M * a;
        } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
          if (this.mode === this.N_POLE && (a = -a), Math.abs(u + this.phi0) < D) return null;
          i = E - .5 * u, s = (i = 2 * (this.mode === this.S_POLE ? Math.cos(i) : Math.sin(i))) * Math.sin(c), i *= a;
        }
      } else {
        switch (l = o = r = 0, a = Math.cos(c), h = Math.sin(c), e = Math.sin(u), n = Wt(this.e, e), this.mode !== this.OBLIQ && this.mode !== this.EQUIT || (r = n / this.qp, o = Math.sqrt(1 - r * r)), this.mode) {
          case this.OBLIQ:
            l = 1 + this.sinb1 * r + this.cosb1 * o * a;
            break;

          case this.EQUIT:
            l = 1 + o * a;
            break;

          case this.N_POLE:
            l = j + u, n = this.qp - n;
            break;

          case this.S_POLE:
            l = u - j, n = this.qp + n;
        }

        if (Math.abs(l) < D) return null;

        switch (this.mode) {
          case this.OBLIQ:
          case this.EQUIT:
            l = Math.sqrt(2 / l), i = this.mode === this.OBLIQ ? this.ymf * l * (this.cosb1 * r - this.sinb1 * o * a) : (l = Math.sqrt(2 / (1 + o * a))) * r * this.ymf, s = this.xmf * l * o * h;
            break;

          case this.N_POLE:
          case this.S_POLE:
            0 <= n ? (s = (l = Math.sqrt(n)) * h, i = a * (this.mode === this.S_POLE ? l : -l)) : s = i = 0;
        }
      }

      return t.x = this.a * s + this.x0, t.y = this.a * i + this.y0, t;
    },
    inverse: function inverse(t) {
      t.x -= this.x0, t.y -= this.y0;
      var s,
          i,
          a,
          h,
          e,
          n,
          r,
          o,
          l,
          M = t.x / this.a,
          c = t.y / this.a;

      if (this.sphere) {
        var u,
            f = 0,
            m = 0,
            p = Math.sqrt(M * M + c * c);
        if (1 < (u = .5 * p)) return null;

        switch (u = 2 * Math.asin(u), this.mode !== this.OBLIQ && this.mode !== this.EQUIT || (m = Math.sin(u), f = Math.cos(u)), this.mode) {
          case this.EQUIT:
            u = Math.abs(p) <= D ? 0 : Math.asin(c * m / p), M *= m, c = f * p;
            break;

          case this.OBLIQ:
            u = Math.abs(p) <= D ? this.phi0 : Math.asin(f * this.sinph0 + c * m * this.cosph0 / p), M *= m * this.cosph0, c = (f - Math.sin(u) * this.sinph0) * p;
            break;

          case this.N_POLE:
            c = -c, u = j - u;
            break;

          case this.S_POLE:
            u -= j;
        }

        s = 0 !== c || this.mode !== this.EQUIT && this.mode !== this.OBLIQ ? Math.atan2(M, c) : 0;
      } else {
        if (n = 0, this.mode === this.OBLIQ || this.mode === this.EQUIT) {
          if (M /= this.dd, c *= this.dd, (e = Math.sqrt(M * M + c * c)) < D) return t.x = 0, t.y = this.phi0, t;
          a = 2 * Math.asin(.5 * e / this.rq), i = Math.cos(a), M *= a = Math.sin(a), c = this.mode === this.OBLIQ ? (n = i * this.sinb1 + c * a * this.cosb1 / e, h = this.qp * n, e * this.cosb1 * i - c * this.sinb1 * a) : (n = c * a / e, h = this.qp * n, e * i);
        } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
          if (this.mode === this.N_POLE && (c = -c), !(h = M * M + c * c)) return t.x = 0, t.y = this.phi0, t;
          n = 1 - h / this.qp, this.mode === this.S_POLE && (n = -n);
        }

        s = Math.atan2(M, c), r = Math.asin(n), o = this.apa, l = r + r, u = r + o[0] * Math.sin(l) + o[1] * Math.sin(l + l) + o[2] * Math.sin(l + l + l);
      }

      return t.x = at(this.long0 + s), t.y = u, t;
    },
    names: ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"],
    S_POLE: 1,
    N_POLE: 2,
    EQUIT: 3,
    OBLIQ: 4
  },
      ms = {
    init: function init() {
      Math.abs(this.lat1 + this.lat2) < D || (this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e3 = Math.sqrt(this.es), this.sin_po = Math.sin(this.lat1), this.cos_po = Math.cos(this.lat1), this.t1 = this.sin_po, this.con = this.sin_po, this.ms1 = st(this.e3, this.sin_po, this.cos_po), this.qs1 = Wt(this.e3, this.sin_po, this.cos_po), this.sin_po = Math.sin(this.lat2), this.cos_po = Math.cos(this.lat2), this.t2 = this.sin_po, this.ms2 = st(this.e3, this.sin_po, this.cos_po), this.qs2 = Wt(this.e3, this.sin_po, this.cos_po), this.sin_po = Math.sin(this.lat0), this.cos_po = Math.cos(this.lat0), this.t3 = this.sin_po, this.qs0 = Wt(this.e3, this.sin_po, this.cos_po), Math.abs(this.lat1 - this.lat2) > D ? this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1) : this.ns0 = this.con, this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1, this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0);
    },
    forward: function forward(t) {
      var s = t.x,
          i = t.y;
      this.sin_phi = Math.sin(i), this.cos_phi = Math.cos(i);
      var a = Wt(this.e3, this.sin_phi, this.cos_phi),
          h = this.a * Math.sqrt(this.c - this.ns0 * a) / this.ns0,
          e = this.ns0 * at(s - this.long0),
          n = h * Math.sin(e) + this.x0,
          r = this.rh - h * Math.cos(e) + this.y0;
      return t.x = n, t.y = r, t;
    },
    inverse: function inverse(t) {
      var s, i, a, h, e, n;
      return t.x -= this.x0, t.y = this.rh - t.y + this.y0, a = 0 <= this.ns0 ? (s = Math.sqrt(t.x * t.x + t.y * t.y), 1) : (s = -Math.sqrt(t.x * t.x + t.y * t.y), -1), (h = 0) !== s && (h = Math.atan2(a * t.x, a * t.y)), a = s * this.ns0 / this.a, n = this.sphere ? Math.asin((this.c - a * a) / (2 * this.ns0)) : (i = (this.c - a * a) / this.ns0, this.phi1z(this.e3, i)), e = at(h / this.ns0 + this.long0), t.x = e, t.y = n, t;
    },
    names: ["Albers_Conic_Equal_Area", "Albers", "aea"],
    phi1z: function phi1z(t, s) {
      var i,
          a,
          h,
          e,
          n = Ht(.5 * s);
      if (t < D) return n;

      for (var r = t * t, o = 1; o <= 25; o++) {
        if (n += e = .5 * (h = 1 - (a = t * (i = Math.sin(n))) * a) * h / Math.cos(n) * (s / (1 - r) - i / h + .5 / t * Math.log((1 - a) / (1 + a))), Math.abs(e) <= 1e-7) return n;
      }

      return null;
    }
  },
      ps = {
    init: function init() {
      this.sin_p14 = Math.sin(this.lat0), this.cos_p14 = Math.cos(this.lat0), this.infinity_dist = 1e3 * this.a, this.rc = 1;
    },
    forward: function forward(t) {
      var s,
          i = t.x,
          a = t.y,
          h = at(i - this.long0),
          e = Math.sin(a),
          n = Math.cos(a),
          r = Math.cos(h),
          o = this.sin_p14 * e + this.cos_p14 * n * r,
          l = 0 < o || Math.abs(o) <= D ? (s = this.x0 + this.a * n * Math.sin(h) / o, this.y0 + this.a * (this.cos_p14 * e - this.sin_p14 * n * r) / o) : (s = this.x0 + this.infinity_dist * n * Math.sin(h), this.y0 + this.infinity_dist * (this.cos_p14 * e - this.sin_p14 * n * r));
      return t.x = s, t.y = l, t;
    },
    inverse: function inverse(t) {
      var s, i, a, h, e, n;
      return t.x = (t.x - this.x0) / this.a, t.y = (t.y - this.y0) / this.a, t.x /= this.k0, t.y /= this.k0, e = (s = Math.sqrt(t.x * t.x + t.y * t.y)) ? (h = Math.atan2(s, this.rc), i = Math.sin(h), a = Math.cos(h), n = Ht(a * this.sin_p14 + t.y * i * this.cos_p14 / s), e = Math.atan2(t.x * i, s * this.cos_p14 * a - t.y * this.sin_p14 * i), at(this.long0 + e)) : (n = this.phic0, 0), t.x = e, t.y = n, t;
    },
    names: ["gnom"]
  },
      ds = {
    init: function init() {
      this.sphere || (this.k0 = st(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)));
    },
    forward: function forward(t) {
      var s,
          i,
          a,
          h = t.x,
          e = t.y,
          n = at(h - this.long0);
      return a = this.sphere ? (i = this.x0 + this.a * n * Math.cos(this.lat_ts), this.y0 + this.a * Math.sin(e) / Math.cos(this.lat_ts)) : (s = Wt(this.e, Math.sin(e)), i = this.x0 + this.a * this.k0 * n, this.y0 + this.a * s * .5 / this.k0), t.x = i, t.y = a, t;
    },
    inverse: function inverse(t) {
      var s, i;
      return t.x -= this.x0, t.y -= this.y0, this.sphere ? (s = at(this.long0 + t.x / this.a / Math.cos(this.lat_ts)), i = Math.asin(t.y / this.a * Math.cos(this.lat_ts))) : (i = function (t, s) {
        var i = 1 - (1 - t * t) / (2 * t) * Math.log((1 - t) / (1 + t));
        if (Math.abs(Math.abs(s) - i) < 1e-6) return s < 0 ? -1 * j : j;

        for (var a, h, e, n, r = Math.asin(.5 * s), o = 0; o < 30; o++) {
          if (h = Math.sin(r), e = Math.cos(r), n = t * h, a = Math.pow(1 - n * n, 2) / (2 * e) * (s / (1 - t * t) - h / (1 - n * n) + .5 / t * Math.log((1 - n) / (1 + n))), r += a, Math.abs(a) <= 1e-10) return r;
        }

        return NaN;
      }(this.e, 2 * t.y * this.k0 / this.a), s = at(this.long0 + t.x / (this.a * this.k0))), t.x = s, t.y = i, t;
    },
    names: ["cea"]
  },
      _s = {
    init: function init() {
      this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.lat_ts = this.lat_ts || 0, this.title = this.title || "Equidistant Cylindrical (Plate Carre)", this.rc = Math.cos(this.lat_ts);
    },
    forward: function forward(t) {
      var s = t.x,
          i = t.y,
          a = at(s - this.long0),
          h = Ft(i - this.lat0);
      return t.x = this.x0 + this.a * a * this.rc, t.y = this.y0 + this.a * h, t;
    },
    inverse: function inverse(t) {
      var s = t.x,
          i = t.y;
      return t.x = at(this.long0 + (s - this.x0) / (this.a * this.rc)), t.y = Ft(this.lat0 + (i - this.y0) / this.a), t;
    },
    names: ["Equirectangular", "Equidistant_Cylindrical", "eqc"]
  },
      ys = {
    init: function init() {
      this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e = Math.sqrt(this.es), this.e0 = zt(this.es), this.e1 = Tt(this.es), this.e2 = Dt(this.es), this.e3 = Bt(this.es), this.ml0 = this.a * Lt(this.e0, this.e1, this.e2, this.e3, this.lat0);
    },
    forward: function forward(t) {
      var s,
          i,
          a,
          h = t.x,
          e = t.y,
          n = at(h - this.long0),
          r = n * Math.sin(e);
      return a = this.sphere ? Math.abs(e) <= D ? (i = this.a * n, -1 * this.a * this.lat0) : (i = this.a * Math.sin(r) / Math.tan(e), this.a * (Ft(e - this.lat0) + (1 - Math.cos(r)) / Math.tan(e))) : Math.abs(e) <= D ? (i = this.a * n, -1 * this.ml0) : (i = (s = Ut(this.a, this.e, Math.sin(e)) / Math.tan(e)) * Math.sin(r), this.a * Lt(this.e0, this.e1, this.e2, this.e3, e) - this.ml0 + s * (1 - Math.cos(r))), t.x = i + this.x0, t.y = a + this.y0, t;
    },
    inverse: function inverse(t) {
      var s,
          i,
          a,
          h,
          e,
          n,
          r,
          o,
          l = t.x - this.x0,
          M = t.y - this.y0;
      if (this.sphere) {
        if (Math.abs(M + this.a * this.lat0) <= D) s = at(l / this.a + this.long0), i = 0;else {
          for (var c, u = this.lat0 + M / this.a, f = l * l / this.a / this.a + u * u, m = u, p = 20; p; --p) {
            if (m += a = -1 * (u * (m * (c = Math.tan(m)) + 1) - m - .5 * (m * m + f) * c) / ((m - u) / c - 1), Math.abs(a) <= D) {
              i = m;
              break;
            }
          }

          s = at(this.long0 + Math.asin(l * Math.tan(m) / this.a) / Math.sin(i));
        }
      } else if (Math.abs(M + this.ml0) <= D) i = 0, s = at(this.long0 + l / this.a);else {
        for (u = (this.ml0 + M) / this.a, f = l * l / this.a / this.a + u * u, m = u, p = 20; p; --p) {
          if (o = this.e * Math.sin(m), h = Math.sqrt(1 - o * o) * Math.tan(m), e = this.a * Lt(this.e0, this.e1, this.e2, this.e3, m), n = this.e0 - 2 * this.e1 * Math.cos(2 * m) + 4 * this.e2 * Math.cos(4 * m) - 6 * this.e3 * Math.cos(6 * m), m -= a = (u * (h * (r = e / this.a) + 1) - r - .5 * h * (r * r + f)) / (this.es * Math.sin(2 * m) * (r * r + f - 2 * u * r) / (4 * h) + (u - r) * (h * n - 2 / Math.sin(2 * m)) - n), Math.abs(a) <= D) {
            i = m;
            break;
          }
        }

        h = Math.sqrt(1 - this.es * Math.pow(Math.sin(i), 2)) * Math.tan(i), s = at(this.long0 + Math.asin(l * h / this.a) / Math.sin(i));
      }
      return t.x = s, t.y = i, t;
    },
    names: ["Polyconic", "poly"]
  },
      xs = {
    init: function init() {
      this.A = [], this.A[1] = .6399175073, this.A[2] = -.1358797613, this.A[3] = .063294409, this.A[4] = -.02526853, this.A[5] = .0117879, this.A[6] = -.0055161, this.A[7] = .0026906, this.A[8] = -.001333, this.A[9] = 67e-5, this.A[10] = -34e-5, this.B_re = [], this.B_im = [], this.B_re[1] = .7557853228, this.B_im[1] = 0, this.B_re[2] = .249204646, this.B_im[2] = .003371507, this.B_re[3] = -.001541739, this.B_im[3] = .04105856, this.B_re[4] = -.10162907, this.B_im[4] = .01727609, this.B_re[5] = -.26623489, this.B_im[5] = -.36249218, this.B_re[6] = -.6870983, this.B_im[6] = -1.1651967, this.C_re = [], this.C_im = [], this.C_re[1] = 1.3231270439, this.C_im[1] = 0, this.C_re[2] = -.577245789, this.C_im[2] = -.007809598, this.C_re[3] = .508307513, this.C_im[3] = -.112208952, this.C_re[4] = -.15094762, this.C_im[4] = .18200602, this.C_re[5] = 1.01418179, this.C_im[5] = 1.64497696, this.C_re[6] = 1.9660549, this.C_im[6] = 2.5127645, this.D = [], this.D[1] = 1.5627014243, this.D[2] = .5185406398, this.D[3] = -.03333098, this.D[4] = -.1052906, this.D[5] = -.0368594, this.D[6] = .007317, this.D[7] = .0122, this.D[8] = .00394, this.D[9] = -.0013;
    },
    forward: function forward(t) {
      for (var s = t.x, i = t.y - this.lat0, a = s - this.long0, h = i / G * 1e-5, e = a, n = 1, r = 0, o = 1; o <= 10; o++) {
        n *= h, r += this.A[o] * n;
      }

      var l,
          M = r,
          c = e,
          u = 1,
          f = 0,
          m = 0,
          p = 0;

      for (o = 1; o <= 6; o++) {
        l = f * M + u * c, u = u * M - f * c, f = l, m = m + this.B_re[o] * u - this.B_im[o] * f, p = p + this.B_im[o] * u + this.B_re[o] * f;
      }

      return t.x = p * this.a + this.x0, t.y = m * this.a + this.y0, t;
    },
    inverse: function inverse(t) {
      var s,
          i = t.x,
          a = t.y,
          h = i - this.x0,
          e = (a - this.y0) / this.a,
          n = h / this.a,
          r = 1,
          o = 0,
          l = 0,
          M = 0;

      for (_ = 1; _ <= 6; _++) {
        s = o * e + r * n, r = r * e - o * n, o = s, l = l + this.C_re[_] * r - this.C_im[_] * o, M = M + this.C_im[_] * r + this.C_re[_] * o;
      }

      for (var c = 0; c < this.iterations; c++) {
        for (var u, f = l, m = M, p = e, d = n, _ = 2; _ <= 6; _++) {
          u = m * l + f * M, f = f * l - m * M, m = u, p += (_ - 1) * (this.B_re[_] * f - this.B_im[_] * m), d += (_ - 1) * (this.B_im[_] * f + this.B_re[_] * m);
        }

        f = 1, m = 0;
        var y = this.B_re[1],
            x = this.B_im[1];

        for (_ = 2; _ <= 6; _++) {
          u = m * l + f * M, f = f * l - m * M, m = u, y += _ * (this.B_re[_] * f - this.B_im[_] * m), x += _ * (this.B_im[_] * f + this.B_re[_] * m);
        }

        var g = y * y + x * x,
            l = (p * y + d * x) / g,
            M = (d * y - p * x) / g;
      }

      var b = l,
          v = M,
          w = 1,
          A = 0;

      for (_ = 1; _ <= 9; _++) {
        w *= b, A += this.D[_] * w;
      }

      var C = this.lat0 + A * G * 1e5,
          E = this.long0 + v;
      return t.x = E, t.y = C, t;
    },
    names: ["New_Zealand_Map_Grid", "nzmg"]
  },
      gs = {
    init: function init() {},
    forward: function forward(t) {
      var s = t.x,
          i = t.y,
          a = at(s - this.long0),
          h = this.x0 + this.a * a,
          e = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + i / 2.5)) * 1.25;
      return t.x = h, t.y = e, t;
    },
    inverse: function inverse(t) {
      t.x -= this.x0, t.y -= this.y0;
      var s = at(this.long0 + t.x / this.a),
          i = 2.5 * (Math.atan(Math.exp(.8 * t.y / this.a)) - Math.PI / 4);
      return t.x = s, t.y = i, t;
    },
    names: ["Miller_Cylindrical", "mill"]
  },
      bs = {
    init: function init() {
      this.sphere ? (this.n = 1, this.m = 0, this.es = 0, this.C_y = Math.sqrt((this.m + 1) / this.n), this.C_x = this.C_y / (this.m + 1)) : this.en = St(this.es);
    },
    forward: function forward(t) {
      var s = t.x,
          i = t.y,
          s = at(s - this.long0);

      if (this.sphere) {
        if (this.m) for (var a = this.n * Math.sin(i), h = 20; h; --h) {
          var e = (this.m * i + Math.sin(i) - a) / (this.m + Math.cos(i));
          if (i -= e, Math.abs(e) < D) break;
        } else i = 1 !== this.n ? Math.asin(this.n * Math.sin(i)) : i;
        l = this.a * this.C_x * s * (this.m + Math.cos(i)), o = this.a * this.C_y * i;
      } else var n = Math.sin(i),
          r = Math.cos(i),
          o = this.a * kt(i, n, r, this.en),
          l = this.a * s * r / Math.sqrt(1 - this.es * n * n);

      return t.x = l, t.y = o, t;
    },
    inverse: function inverse(t) {
      var s, i, a, h;
      return t.x -= this.x0, a = t.x / this.a, t.y -= this.y0, s = t.y / this.a, this.sphere ? (s /= this.C_y, a /= this.C_x * (this.m + Math.cos(s)), this.m ? s = Ht((this.m * s + Math.sin(s)) / this.n) : 1 !== this.n && (s = Ht(Math.sin(s) / this.n)), a = at(a + this.long0), s = Ft(s)) : (s = qt(t.y / this.a, this.es, this.en), (h = Math.abs(s)) < j ? (h = Math.sin(s), i = this.long0 + t.x * Math.sqrt(1 - this.es * h * h) / (this.a * Math.cos(s)), a = at(i)) : h - D < j && (a = this.long0)), t.x = a, t.y = s, t;
    },
    names: ["Sinusoidal", "sinu"]
  },
      vs = {
    init: function init() {},
    forward: function forward(t) {
      for (var s = t.x, i = t.y, a = at(s - this.long0), h = i, e = Math.PI * Math.sin(i);;) {
        var n = -(h + Math.sin(h) - e) / (1 + Math.cos(h));
        if (h += n, Math.abs(n) < D) break;
      }

      h /= 2, Math.PI / 2 - Math.abs(i) < D && (a = 0);
      var r = .900316316158 * this.a * a * Math.cos(h) + this.x0,
          o = 1.4142135623731 * this.a * Math.sin(h) + this.y0;
      return t.x = r, t.y = o, t;
    },
    inverse: function inverse(t) {
      var s, i;
      t.x -= this.x0, t.y -= this.y0, i = t.y / (1.4142135623731 * this.a), .999999999999 < Math.abs(i) && (i = .999999999999), s = Math.asin(i);
      var a = at(this.long0 + t.x / (.900316316158 * this.a * Math.cos(s)));
      a < -Math.PI && (a = -Math.PI), a > Math.PI && (a = Math.PI), i = (2 * s + Math.sin(2 * s)) / Math.PI, 1 < Math.abs(i) && (i = 1);
      var h = Math.asin(i);
      return t.x = a, t.y = h, t;
    },
    names: ["Mollweide", "moll"]
  },
      ws = {
    init: function init() {
      Math.abs(this.lat1 + this.lat2) < D || (this.lat2 = this.lat2 || this.lat1, this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e = Math.sqrt(this.es), this.e0 = zt(this.es), this.e1 = Tt(this.es), this.e2 = Dt(this.es), this.e3 = Bt(this.es), this.sinphi = Math.sin(this.lat1), this.cosphi = Math.cos(this.lat1), this.ms1 = st(this.e, this.sinphi, this.cosphi), this.ml1 = Lt(this.e0, this.e1, this.e2, this.e3, this.lat1), Math.abs(this.lat1 - this.lat2) < D ? this.ns = this.sinphi : (this.sinphi = Math.sin(this.lat2), this.cosphi = Math.cos(this.lat2), this.ms2 = st(this.e, this.sinphi, this.cosphi), this.ml2 = Lt(this.e0, this.e1, this.e2, this.e3, this.lat2), this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1)), this.g = this.ml1 + this.ms1 / this.ns, this.ml0 = Lt(this.e0, this.e1, this.e2, this.e3, this.lat0), this.rh = this.a * (this.g - this.ml0));
    },
    forward: function forward(t) {
      var s,
          i,
          a = t.x,
          h = t.y;
      i = this.sphere ? this.a * (this.g - h) : (s = Lt(this.e0, this.e1, this.e2, this.e3, h), this.a * (this.g - s));
      var e = this.ns * at(a - this.long0),
          n = this.x0 + i * Math.sin(e),
          r = this.y0 + this.rh - i * Math.cos(e);
      return t.x = n, t.y = r, t;
    },
    inverse: function inverse(t) {
      var s, i;
      t.x -= this.x0, t.y = this.rh - t.y + this.y0, s = 0 <= this.ns ? (i = Math.sqrt(t.x * t.x + t.y * t.y), 1) : (i = -Math.sqrt(t.x * t.x + t.y * t.y), -1);
      var a = 0;
      if (0 !== i && (a = Math.atan2(s * t.x, s * t.y)), this.sphere) return n = at(this.long0 + a / this.ns), e = Ft(this.g - i / this.a), t.x = n, t.y = e, t;
      var h = this.g - i / this.a,
          e = Qt(h, this.e0, this.e1, this.e2, this.e3),
          n = at(this.long0 + a / this.ns);
      return t.x = n, t.y = e, t;
    },
    names: ["Equidistant_Conic", "eqdc"]
  },
      As = {
    init: function init() {
      this.R = this.a;
    },
    forward: function forward(t) {
      var s,
          i = t.x,
          a = t.y,
          h = at(i - this.long0);
      Math.abs(a) <= D && (s = this.x0 + this.R * h, d = this.y0);
      var e = Ht(2 * Math.abs(a / Math.PI));
      (Math.abs(h) <= D || Math.abs(Math.abs(a) - j) <= D) && (s = this.x0, d = 0 <= a ? this.y0 + Math.PI * this.R * Math.tan(.5 * e) : this.y0 + Math.PI * this.R * -Math.tan(.5 * e));
      var n = .5 * Math.abs(Math.PI / h - h / Math.PI),
          r = n * n,
          o = Math.sin(e),
          l = Math.cos(e),
          M = l / (o + l - 1),
          c = M * M,
          u = M * (2 / o - 1),
          f = u * u,
          m = Math.PI * this.R * (n * (M - f) + Math.sqrt(r * (M - f) * (M - f) - (f + r) * (c - f))) / (f + r);
      h < 0 && (m = -m), s = this.x0 + m;
      var p = r + M,
          m = Math.PI * this.R * (u * p - n * Math.sqrt((f + r) * (1 + r) - p * p)) / (f + r),
          d = 0 <= a ? this.y0 + m : this.y0 - m;
      return t.x = s, t.y = d, t;
    },
    inverse: function inverse(t) {
      var s, i, a, h, e, n, r, o, l, M, c, u;
      return t.x -= this.x0, t.y -= this.y0, c = Math.PI * this.R, e = (a = t.x / c) * a + (h = t.y / c) * h, c = 3 * (h * h / (o = -2 * (n = -Math.abs(h) * (1 + e)) + 1 + 2 * h * h + e * e) + (2 * (r = n - 2 * h * h + a * a) * r * r / o / o / o - 9 * n * r / o / o) / 27) / (l = (n - r * r / 3 / o) / o) / (M = 2 * Math.sqrt(-l / 3)), 1 < Math.abs(c) && (c = 0 <= c ? 1 : -1), u = Math.acos(c) / 3, i = 0 <= t.y ? (-M * Math.cos(u + Math.PI / 3) - r / 3 / o) * Math.PI : -(-M * Math.cos(u + Math.PI / 3) - r / 3 / o) * Math.PI, s = Math.abs(a) < D ? this.long0 : at(this.long0 + Math.PI * (e - 1 + Math.sqrt(1 + 2 * (a * a - h * h) + e * e)) / 2 / a), t.x = s, t.y = i, t;
    },
    names: ["Van_der_Grinten_I", "VanDerGrinten", "vandg"]
  },
      Cs = {
    init: function init() {
      this.sin_p12 = Math.sin(this.lat0), this.cos_p12 = Math.cos(this.lat0);
    },
    forward: function forward(t) {
      var s,
          i,
          a,
          h,
          e,
          n,
          r,
          o,
          l,
          M,
          c,
          u,
          f,
          m,
          p,
          d,
          _,
          y,
          x,
          g,
          b,
          v,
          w = t.x,
          A = t.y,
          C = Math.sin(t.y),
          E = Math.cos(t.y),
          P = at(w - this.long0);

      return this.sphere ? Math.abs(this.sin_p12 - 1) <= D ? (t.x = this.x0 + this.a * (j - A) * Math.sin(P), t.y = this.y0 - this.a * (j - A) * Math.cos(P)) : Math.abs(this.sin_p12 + 1) <= D ? (t.x = this.x0 + this.a * (j + A) * Math.sin(P), t.y = this.y0 + this.a * (j + A) * Math.cos(P)) : (y = this.sin_p12 * C + this.cos_p12 * E * Math.cos(P), _ = (d = Math.acos(y)) / Math.sin(d), t.x = this.x0 + this.a * _ * E * Math.sin(P), t.y = this.y0 + this.a * _ * (this.cos_p12 * C - this.sin_p12 * E * Math.cos(P))) : (s = zt(this.es), i = Tt(this.es), a = Dt(this.es), h = Bt(this.es), Math.abs(this.sin_p12 - 1) <= D ? (e = this.a * Lt(s, i, a, h, j), n = this.a * Lt(s, i, a, h, A), t.x = this.x0 + (e - n) * Math.sin(P), t.y = this.y0 - (e - n) * Math.cos(P)) : Math.abs(this.sin_p12 + 1) <= D ? (e = this.a * Lt(s, i, a, h, j), n = this.a * Lt(s, i, a, h, A), t.x = this.x0 + (e + n) * Math.sin(P), t.y = this.y0 + (e + n) * Math.cos(P)) : (r = C / E, o = Ut(this.a, this.e, this.sin_p12), l = Ut(this.a, this.e, C), M = Math.atan((1 - this.es) * r + this.es * o * this.sin_p12 / (l * E)), x = 0 === (c = Math.atan2(Math.sin(P), this.cos_p12 * Math.tan(M) - this.sin_p12 * Math.cos(P))) ? Math.asin(this.cos_p12 * Math.sin(M) - this.sin_p12 * Math.cos(M)) : Math.abs(Math.abs(c) - Math.PI) <= D ? -Math.asin(this.cos_p12 * Math.sin(M) - this.sin_p12 * Math.cos(M)) : Math.asin(Math.sin(P) * Math.cos(M) / Math.sin(c)), u = this.e * this.sin_p12 / Math.sqrt(1 - this.es), d = o * x * (1 - (g = x * x) * (p = (f = this.e * this.cos_p12 * Math.cos(c) / Math.sqrt(1 - this.es)) * f) * (1 - p) / 6 + (b = g * x) / 8 * (m = u * f) * (1 - 2 * p) + (v = b * x) / 120 * (p * (4 - 7 * p) - 3 * u * u * (1 - 7 * p)) - v * x / 48 * m), t.x = this.x0 + d * Math.sin(c), t.y = this.y0 + d * Math.cos(c))), t;
    },
    inverse: function inverse(t) {
      var s, i, a, h, e, n, r, o, l, M, c, u, f, m, p, d, _, y, x, g, b, v;

      if (t.x -= this.x0, t.y -= this.y0, this.sphere) {
        if ((s = Math.sqrt(t.x * t.x + t.y * t.y)) > 2 * j * this.a) return;
        return i = s / this.a, a = Math.sin(i), h = Math.cos(i), e = this.long0, Math.abs(s) <= D ? n = this.lat0 : (n = Ht(h * this.sin_p12 + t.y * a * this.cos_p12 / s), r = Math.abs(this.lat0) - j, e = at(Math.abs(r) <= D ? 0 <= this.lat0 ? this.long0 + Math.atan2(t.x, -t.y) : this.long0 - Math.atan2(-t.x, t.y) : this.long0 + Math.atan2(t.x * a, s * this.cos_p12 * h - t.y * this.sin_p12 * a))), t.x = e, t.y = n, t;
      }

      return o = zt(this.es), l = Tt(this.es), M = Dt(this.es), c = Bt(this.es), Math.abs(this.sin_p12 - 1) <= D ? (u = this.a * Lt(o, l, M, c, j), s = Math.sqrt(t.x * t.x + t.y * t.y), n = Qt((u - s) / this.a, o, l, M, c), e = at(this.long0 + Math.atan2(t.x, -1 * t.y))) : Math.abs(this.sin_p12 + 1) <= D ? (u = this.a * Lt(o, l, M, c, j), s = Math.sqrt(t.x * t.x + t.y * t.y), n = Qt((s - u) / this.a, o, l, M, c), e = at(this.long0 + Math.atan2(t.x, t.y))) : (s = Math.sqrt(t.x * t.x + t.y * t.y), p = Math.atan2(t.x, t.y), f = Ut(this.a, this.e, this.sin_p12), d = Math.cos(p), y = -(_ = this.e * this.cos_p12 * d) * _ / (1 - this.es), x = 3 * this.es * (1 - y) * this.sin_p12 * this.cos_p12 * d / (1 - this.es), v = 1 - y * (b = (g = s / f) - y * (1 + y) * Math.pow(g, 3) / 6 - x * (1 + 3 * y) * Math.pow(g, 4) / 24) * b / 2 - g * b * b * b / 6, m = Math.asin(this.sin_p12 * Math.cos(b) + this.cos_p12 * Math.sin(b) * d), e = at(this.long0 + Math.asin(Math.sin(p) * Math.sin(b) / Math.cos(m))), n = Math.atan((1 - this.es * v * this.sin_p12 / Math.sin(m)) * Math.tan(m) / (1 - this.es))), t.x = e, t.y = n, t;
    },
    names: ["Azimuthal_Equidistant", "aeqd"]
  },
      Es = {
    init: function init() {
      this.sin_p14 = Math.sin(this.lat0), this.cos_p14 = Math.cos(this.lat0);
    },
    forward: function forward(t) {
      var s,
          i,
          a = t.x,
          h = t.y,
          e = at(a - this.long0),
          n = Math.sin(h),
          r = Math.cos(h),
          o = Math.cos(e),
          l = this.sin_p14 * n + this.cos_p14 * r * o;
      return (0 < l || Math.abs(l) <= D) && (s = this.a * r * Math.sin(e), i = this.y0 + this.a * (this.cos_p14 * n - this.sin_p14 * r * o)), t.x = s, t.y = i, t;
    },
    inverse: function inverse(t) {
      var s, i, a, h, e, n, r;
      return t.x -= this.x0, t.y -= this.y0, s = Math.sqrt(t.x * t.x + t.y * t.y), i = Ht(s / this.a), a = Math.sin(i), h = Math.cos(i), n = this.long0, Math.abs(s) <= D ? r = this.lat0 : (r = Ht(h * this.sin_p14 + t.y * a * this.cos_p14 / s), e = Math.abs(this.lat0) - j, n = Math.abs(e) <= D ? at(0 <= this.lat0 ? this.long0 + Math.atan2(t.x, -t.y) : this.long0 - Math.atan2(-t.x, t.y)) : at(this.long0 + Math.atan2(t.x * a, s * this.cos_p14 * h - t.y * this.sin_p14 * a))), t.x = n, t.y = r, t;
    },
    names: ["ortho"]
  },
      Ps = 1,
      Ns = 2,
      Ss = 3,
      ks = 4,
      qs = 5,
      Is = 6,
      Rs = {
    AREA_0: 1,
    AREA_1: 2,
    AREA_2: 3,
    AREA_3: 4
  },
      Os = {
    init: function init() {
      this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.lat_ts = this.lat_ts || 0, this.title = this.title || "Quadrilateralized Spherical Cube", this.lat0 >= j - E / 2 ? this.face = qs : this.lat0 <= -(j - E / 2) ? this.face = Is : Math.abs(this.long0) <= E ? this.face = Ps : Math.abs(this.long0) <= j + E ? this.face = 0 < this.long0 ? Ns : ks : this.face = Ss, 0 !== this.es && (this.one_minus_f = 1 - (this.a - this.b) / this.a, this.one_minus_f_squared = this.one_minus_f * this.one_minus_f);
    },
    forward: function forward(t) {
      var s,
          i,
          a,
          h,
          e,
          n,
          r,
          o,
          l,
          M,
          c,
          u,
          f = {
        x: 0,
        y: 0
      },
          m = {
        value: 0
      };
      return t.x -= this.long0, s = 0 !== this.es ? Math.atan(this.one_minus_f_squared * Math.tan(t.y)) : t.y, i = t.x, this.face === qs ? (h = j - s, a = E <= i && i <= j + E ? (m.value = Rs.AREA_0, i - j) : j + E < i || i <= -(j + E) ? (m.value = Rs.AREA_1, 0 < i ? i - B : i + B) : -(j + E) < i && i <= -E ? (m.value = Rs.AREA_2, i + j) : (m.value = Rs.AREA_3, i)) : this.face === Is ? (h = j + s, a = E <= i && i <= j + E ? (m.value = Rs.AREA_0, -i + j) : i < E && -E <= i ? (m.value = Rs.AREA_1, -i) : i < -E && -(j + E) <= i ? (m.value = Rs.AREA_2, -i - j) : (m.value = Rs.AREA_3, 0 < i ? -i + B : -i - B)) : (this.face === Ns ? i = b(i, +j) : this.face === Ss ? i = b(i, +B) : this.face === ks && (i = b(i, -j)), M = Math.sin(s), c = Math.cos(s), u = Math.sin(i), r = c * Math.cos(i), o = c * u, l = M, this.face === Ps ? a = g(h = Math.acos(r), l, o, m) : this.face === Ns ? a = g(h = Math.acos(o), l, -r, m) : this.face === Ss ? a = g(h = Math.acos(-r), l, -o, m) : this.face === ks ? a = g(h = Math.acos(-o), l, r, m) : (h = a = 0, m.value = Rs.AREA_0)), n = Math.atan(12 / B * (a + Math.acos(Math.sin(a) * Math.cos(E)) - j)), e = Math.sqrt((1 - Math.cos(h)) / (Math.cos(n) * Math.cos(n)) / (1 - Math.cos(Math.atan(1 / Math.cos(a))))), m.value === Rs.AREA_1 ? n += j : m.value === Rs.AREA_2 ? n += B : m.value === Rs.AREA_3 && (n += 1.5 * B), f.x = e * Math.cos(n), f.y = e * Math.sin(n), f.x = f.x * this.a + this.x0, f.y = f.y * this.a + this.y0, t.x = f.x, t.y = f.y, t;
    },
    inverse: function inverse(t) {
      var s,
          i,
          a,
          h,
          e,
          n,
          r,
          o,
          l,
          M,
          c,
          u,
          f,
          m,
          p,
          d = {
        lam: 0,
        phi: 0
      },
          _ = {
        value: 0
      };
      return t.x = (t.x - this.x0) / this.a, t.y = (t.y - this.y0) / this.a, i = Math.atan(Math.sqrt(t.x * t.x + t.y * t.y)), s = Math.atan2(t.y, t.x), 0 <= t.x && t.x >= Math.abs(t.y) ? _.value = Rs.AREA_0 : 0 <= t.y && t.y >= Math.abs(t.x) ? (_.value = Rs.AREA_1, s -= j) : t.x < 0 && -t.x >= Math.abs(t.y) ? (_.value = Rs.AREA_2, s = s < 0 ? s + B : s - B) : (_.value = Rs.AREA_3, s += j), M = B / 12 * Math.tan(s), e = Math.sin(M) / (Math.cos(M) - 1 / Math.sqrt(2)), n = Math.atan(e), (r = 1 - (a = Math.cos(s)) * a * (h = Math.tan(i)) * h * (1 - Math.cos(Math.atan(1 / Math.cos(n))))) < -1 ? r = -1 : 1 < r && (r = 1), this.face === qs ? (o = Math.acos(r), d.phi = j - o, _.value === Rs.AREA_0 ? d.lam = n + j : _.value === Rs.AREA_1 ? d.lam = n < 0 ? n + B : n - B : _.value === Rs.AREA_2 ? d.lam = n - j : d.lam = n) : this.face === Is ? (o = Math.acos(r), d.phi = o - j, _.value === Rs.AREA_0 ? d.lam = -n + j : _.value === Rs.AREA_1 ? d.lam = -n : _.value === Rs.AREA_2 ? d.lam = -n - j : d.lam = n < 0 ? -n - B : -n + B) : (c = 1 <= (M = (l = r) * l) ? 0 : Math.sqrt(1 - M) * Math.sin(n), u = 1 <= (M += c * c) ? 0 : Math.sqrt(1 - M), _.value === Rs.AREA_1 ? (M = u, u = -c, c = M) : _.value === Rs.AREA_2 ? (u = -u, c = -c) : _.value === Rs.AREA_3 && (M = u, u = c, c = -M), this.face === Ns ? (M = l, l = -u, u = M) : this.face === Ss ? (l = -l, u = -u) : this.face === ks && (M = l, l = u, u = -M), d.phi = Math.acos(-c) - j, d.lam = Math.atan2(u, l), this.face === Ns ? d.lam = b(d.lam, -j) : this.face === Ss ? d.lam = b(d.lam, -B) : this.face === ks && (d.lam = b(d.lam, +j))), 0 !== this.es && (f = d.phi < 0 ? 1 : 0, m = Math.tan(d.phi), p = this.b / Math.sqrt(m * m + this.one_minus_f_squared), d.phi = Math.atan(Math.sqrt(this.a * this.a - p * p) / (this.one_minus_f * p)), f && (d.phi = -d.phi)), d.lam += this.long0, t.x = d.lam, t.y = d.phi, t;
    },
    names: ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"]
  };
  return f.defaultDatum = "WGS84", f.Proj = k, f.WGS84 = new f.Proj("WGS84"), f.Point = x, f.toPoint = _t, f.defs = a, f.transform = M, f.mgrs = Nt, f.version = "2.4.5-alpha", (Xt = f).Proj.projections.add(Vt), Xt.Proj.projections.add(Zt), Xt.Proj.projections.add(Yt), Xt.Proj.projections.add(ts), Xt.Proj.projections.add(ss), Xt.Proj.projections.add(is), Xt.Proj.projections.add(as), Xt.Proj.projections.add(hs), Xt.Proj.projections.add(es), Xt.Proj.projections.add(ns), Xt.Proj.projections.add(fs), Xt.Proj.projections.add(ms), Xt.Proj.projections.add(ps), Xt.Proj.projections.add(ds), Xt.Proj.projections.add(_s), Xt.Proj.projections.add(ys), Xt.Proj.projections.add(xs), Xt.Proj.projections.add(gs), Xt.Proj.projections.add(bs), Xt.Proj.projections.add(vs), Xt.Proj.projections.add(ws), Xt.Proj.projections.add(As), Xt.Proj.projections.add(Cs), Xt.Proj.projections.add(Es), Xt.Proj.projections.add(Os), f;
});