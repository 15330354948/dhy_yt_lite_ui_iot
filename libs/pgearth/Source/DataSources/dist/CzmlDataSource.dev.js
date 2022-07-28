"use strict";

define(["../Core/ArcType", "../Core/BoundingRectangle", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartographic", "../Core/ClockRange", "../Core/ClockStep", "../Core/Color", "../Core/CornerType", "../Core/createGuid", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/DistanceDisplayCondition", "../Core/Ellipsoid", "../Core/Event", "../Core/ExtrapolationType", "../Core/getFilenameFromUri", "../Core/HermitePolynomialApproximation", "../Core/isArray", "../Core/Iso8601", "../Core/JulianDate", "../Core/LagrangePolynomialApproximation", "../Core/LinearApproximation", "../Core/Math", "../Core/NearFarScalar", "../Core/Quaternion", "../Core/Rectangle", "../Core/ReferenceFrame", "../Core/Resource", "../Core/RuntimeError", "../Core/Spherical", "../Core/TimeInterval", "../Core/TimeIntervalCollection", "../Scene/ColorBlendMode", "../Scene/HeightReference", "../Scene/HorizontalOrigin", "../Scene/LabelStyle", "../Scene/ShadowMode", "../Scene/VerticalOrigin", "../ThirdParty/Uri", "../ThirdParty/when", "./BillboardGraphics", "./BoxGraphics", "./CallbackProperty", "./CheckerboardMaterialProperty", "./ColorMaterialProperty", "./CompositeMaterialProperty", "./CompositePositionProperty", "./CompositeProperty", "./ConstantPositionProperty", "./ConstantProperty", "./CorridorGraphics", "./CylinderGraphics", "./DataSource", "./DataSourceClock", "./EllipseGraphics", "./EllipsoidGraphics", "./EntityCluster", "./EntityCollection", "./GridMaterialProperty", "./ImageMaterialProperty", "./LabelGraphics", "./ModelGraphics", "./NodeTransformationProperty", "./PathGraphics", "./PointGraphics", "./PolygonGraphics", "./PolylineArrowMaterialProperty", "./PolylineDashMaterialProperty", "./PolylineGlowMaterialProperty", "./PolylineGraphics", "./PolylineOutlineMaterialProperty", "./PositionPropertyArray", "./PropertyArray", "./PropertyBag", "./RectangleGraphics", "./ReferenceProperty", "./Rotation", "./SampledPositionProperty", "./SampledProperty", "./StripeMaterialProperty", "./StripeOrientation", "./TimeIntervalCollectionPositionProperty", "./TimeIntervalCollectionProperty", "./VelocityOrientationProperty", "./VelocityVectorProperty", "./WallGraphics"], function (u, h, p, C, e, c, d, m, s, f, b, P, r, a, v, y, o, l, g, n, w, I, O, t, i, T, N, D, R, k, x, B, S, M, _, A, L, E, z, G, H, W, F, V, U, j, X, q, J, Z, Y, K, Q, $, ee, re, oe, ne, te, ie, ae, le, se, ce, de, ue, fe, he, pe, me, ve, ye, ge, we, Ce, be, Pe, Ie, Oe, Te, Ne, De, Re, ke, xe, Be, Se, Me, _e) {
  "use strict";

  function Ae() {}

  var Le;

  function Ee(e, r) {
    return "#" === r[0] && (r = Le + r), Oe.fromString(e, r);
  }

  function ze(e, r, o) {
    if (P(o.reference)) return Ee(r, o.reference);

    if (P(o.velocityReference)) {
      var n = Ee(r, o.velocityReference);

      switch (e) {
        case C:
        case Ae:
          return new Me(n, e === Ae);

        case D:
          return new Se(n);
      }
    }

    throw new B(JSON.stringify(o) + " is not valid CZML.");
  }

  Ae.packedLength = C.packedLength, Ae.unpack = C.unpack, Ae.pack = C.pack;
  var Ge = new C(),
      He = new S(),
      We = new e(),
      Fe = new M(),
      Ve = new D();

  function Ue(e, r) {
    var o = b(e.uri, e);
    return P(r) ? r.getDerivedResource({
      url: o
    }) : x.createIfNeeded(o);
  }

  function je(e) {
    var r = e.cartesian;
    if (P(r)) return r;
    var o = e.cartesianVelocity;
    if (P(o)) return o;
    var n = e.unitCartesian;
    if (P(n)) return n;
    var t = e.unitSpherical;
    if (P(t)) return function (e) {
      var r = e.length;
      if (He.magnitude = 1, 2 === r) return He.clock = e[0], He.cone = e[1], C.fromSpherical(He, Ge), [Ge.x, Ge.y, Ge.z];

      for (var o = new Array(r / 3 * 4), n = 0, t = 0; n < r; n += 3, t += 4) {
        o[t] = e[n], He.clock = e[n + 1], He.cone = e[n + 2], C.fromSpherical(He, Ge), o[t + 1] = Ge.x, o[t + 2] = Ge.y, o[t + 3] = Ge.z;
      }

      return o;
    }(t);
    var i = e.spherical;
    if (P(i)) return function (e) {
      var r = e.length;
      if (3 === r) return He.clock = e[0], He.cone = e[1], He.magnitude = e[2], C.fromSpherical(He, Ge), [Ge.x, Ge.y, Ge.z];

      for (var o = new Array(r), n = 0; n < r; n += 4) {
        o[n] = e[n], He.clock = e[n + 1], He.cone = e[n + 2], He.magnitude = e[n + 3], C.fromSpherical(He, Ge), o[n + 1] = Ge.x, o[n + 2] = Ge.y, o[n + 3] = Ge.z;
      }

      return o;
    }(i);
    var a = e.cartographicRadians;
    if (P(a)) return function (e) {
      var r = e.length;
      if (3 === r) return We.longitude = e[0], We.latitude = e[1], We.height = e[2], y.WGS84.cartographicToCartesian(We, Ge), [Ge.x, Ge.y, Ge.z];

      for (var o = new Array(r), n = 0; n < r; n += 4) {
        o[n] = e[n], We.longitude = e[n + 1], We.latitude = e[n + 2], We.height = e[n + 3], y.WGS84.cartographicToCartesian(We, Ge), o[n + 1] = Ge.x, o[n + 2] = Ge.y, o[n + 3] = Ge.z;
      }

      return o;
    }(a);
    var l = e.cartographicDegrees;
    if (P(l)) return function (e) {
      var r = e.length;
      if (3 === r) return We.longitude = T.toRadians(e[0]), We.latitude = T.toRadians(e[1]), We.height = e[2], y.WGS84.cartographicToCartesian(We, Ge), [Ge.x, Ge.y, Ge.z];

      for (var o = new Array(r), n = 0; n < r; n += 4) {
        o[n] = e[n], We.longitude = T.toRadians(e[n + 1]), We.latitude = T.toRadians(e[n + 2]), We.height = e[n + 3], y.WGS84.cartographicToCartesian(We, Ge), o[n + 1] = Ge.x, o[n + 2] = Ge.y, o[n + 3] = Ge.z;
      }

      return o;
    }(l);
    throw new B(JSON.stringify(e) + " is not a valid CZML interval.");
  }

  function Xe(e, r) {
    C.unpack(e, r, Ge), C.normalize(Ge, Ge), C.pack(Ge, e, r);
  }

  function qe(e, r) {
    D.unpack(e, r, Ve), D.normalize(Ve, Ve), D.pack(Ve, e, r);
  }

  function Je(e) {
    return "boolean" == typeof e ? Boolean : "number" == typeof e ? Number : "string" == typeof e ? String : e.hasOwnProperty("array") ? Array : e.hasOwnProperty("boolean") ? Boolean : e.hasOwnProperty("boundingRectangle") ? h : e.hasOwnProperty("cartesian2") ? p : e.hasOwnProperty("cartesian") || e.hasOwnProperty("spherical") || e.hasOwnProperty("cartographicRadians") || e.hasOwnProperty("cartographicDegrees") ? C : e.hasOwnProperty("unitCartesian") || e.hasOwnProperty("unitSpherical") ? Ae : e.hasOwnProperty("rgba") || e.hasOwnProperty("rgbaf") ? m : e.hasOwnProperty("arcType") ? u : e.hasOwnProperty("colorBlendMode") ? A : e.hasOwnProperty("cornerType") ? s : e.hasOwnProperty("heightReference") ? L : e.hasOwnProperty("horizontalOrigin") ? E : e.hasOwnProperty("date") ? O : e.hasOwnProperty("labelStyle") ? z : e.hasOwnProperty("number") ? Number : e.hasOwnProperty("nearFarScalar") ? N : e.hasOwnProperty("distanceDisplayCondition") ? v : e.hasOwnProperty("object") || e.hasOwnProperty("value") ? Object : e.hasOwnProperty("unitQuaternion") ? D : e.hasOwnProperty("shadowMode") ? G : e.hasOwnProperty("string") ? String : e.hasOwnProperty("stripeOrientation") ? ke : e.hasOwnProperty("wsen") || e.hasOwnProperty("wsenDegrees") ? R : e.hasOwnProperty("uri") ? W : e.hasOwnProperty("verticalOrigin") ? H : Object;
  }

  function Ze(e, r, o) {
    switch (e) {
      case u:
        return u[b(r.arcType, r)];

      case Array:
        return r.array;

      case Boolean:
        return b(r["boolean"], r);

      case h:
        return r.boundingRectangle;

      case p:
        return r.cartesian2;

      case C:
        return je(r);

      case Ae:
        return function (e) {
          var r = je(e);
          if (3 === r.length) return Xe(r, 0), r;

          for (var o = 1; o < r.length; o += 4) {
            Xe(r, o);
          }

          return r;
        }(r);

      case m:
        return function (e) {
          var r = e.rgbaf;
          if (P(r)) return r;
          var o = e.rgba;

          if (P(o)) {
            var n = o.length;
            if (n === m.packedLength) return [m.byteToFloat(o[0]), m.byteToFloat(o[1]), m.byteToFloat(o[2]), m.byteToFloat(o[3])];
            r = new Array(n);

            for (var t = 0; t < n; t += 5) {
              r[t] = o[t], r[t + 1] = m.byteToFloat(o[t + 1]), r[t + 2] = m.byteToFloat(o[t + 2]), r[t + 3] = m.byteToFloat(o[t + 3]), r[t + 4] = m.byteToFloat(o[t + 4]);
            }

            return r;
          }
        }(r);

      case A:
        return A[b(r.colorBlendMode, r)];

      case s:
        return s[b(r.cornerType, r)];

      case L:
        return L[b(r.heightReference, r)];

      case E:
        return E[b(r.horizontalOrigin, r)];

      case Image:
        return Ue(r, o);

      case O:
        return O.fromIso8601(b(r.date, r));

      case z:
        return z[b(r.labelStyle, r)];

      case Number:
        return b(r.number, r);

      case N:
        return r.nearFarScalar;

      case v:
        return r.distanceDisplayCondition;

      case Object:
        return b(b(r.object, r.value), r);

      case D:
        return function (e) {
          var r = e.unitQuaternion;

          if (P(r)) {
            if (4 === r.length) return qe(r, 0), r;

            for (var o = 1; o < r.length; o += 5) {
              qe(r, o);
            }
          }

          return r;
        }(r);

      case Te:
        return b(r.number, r);

      case G:
        return G[b(b(r.shadowMode, r.shadows), r)];

      case String:
        return b(r.string, r);

      case ke:
        return ke[b(r.stripeOrientation, r)];

      case R:
        return function (e) {
          var r = e.wsen;
          if (P(r)) return r;
          var o = e.wsenDegrees;

          if (P(o)) {
            var n = o.length;
            if (n === R.packedLength) return [T.toRadians(o[0]), T.toRadians(o[1]), T.toRadians(o[2]), T.toRadians(o[3])];
            r = new Array(n);

            for (var t = 0; t < n; t += 5) {
              r[t] = o[t], r[t + 1] = T.toRadians(o[t + 1]), r[t + 2] = T.toRadians(o[t + 2]), r[t + 3] = T.toRadians(o[t + 3]), r[t + 4] = T.toRadians(o[t + 4]);
            }

            return r;
          }
        }(r);

      case W:
        return Ue(r, o);

      case H:
        return H[b(r.verticalOrigin, r)];

      default:
        throw new B(e);
    }
  }

  var Ye = {
    HERMITE: n,
    LAGRANGE: t,
    LINEAR: i
  };

  function Ke(e, r) {
    var o = e.interpolationAlgorithm;
    (P(o) || P(e.interpolationDegree)) && r.setInterpolationOptions({
      interpolationAlgorithm: Ye[o],
      interpolationDegree: e.interpolationDegree
    });
    var n = e.forwardExtrapolationType;
    P(n) && (r.forwardExtrapolationType = l[n]);
    var t = e.forwardExtrapolationDuration;
    P(t) && (r.forwardExtrapolationDuration = t);
    var i = e.backwardExtrapolationType;
    P(i) && (r.backwardExtrapolationType = l[i]);
    var a = e.backwardExtrapolationDuration;
    P(a) && (r.backwardExtrapolationDuration = a);
  }

  var Qe = {
    iso8601: void 0
  };

  function $e(e, r, o, n, t, i, a) {
    var l,
        s,
        c,
        d,
        u = n.interval;
    P(u) ? (Qe.iso8601 = u, l = M.fromIso8601(Qe), P(t) && (l = M.intersect(l, t, Fe))) : P(t) && (l = t);
    var f = !P(n.reference) && !P(n.velocityReference),
        h = P(l) && !l.equals(I.MAXIMUM_INTERVAL);
    if (!0 === n["delete"]) return h ? function e(r, o) {
      {
        if (r instanceof De) return void r.removeSamples(o);
        if (r instanceof Be) return void r.intervals.removeInterval(o);

        if (r instanceof Y) {
          for (var n = r.intervals, t = 0; t < n.length; ++t) {
            var i = M.intersect(n.get(t), o, Fe);
            i.isEmpty || e(i.data, o);
          }

          return void n.removeInterval(o);
        }
      }
    }(r[o], l) : void (r[o] = void 0);
    var p = !1;
    f && (c = Ze(e, n, i), s = b(e.packedLength, 1), d = b(c.length, 1), p = !P(n.array) && "string" != typeof c && s < d && e !== Object);
    var m = "function" == typeof e.unpack && e !== Te;

    if (p || h) {
      var v,
          y = r[o],
          g = n.epoch;
      if (P(g) && (v = O.fromIso8601(g)), p && !h) return y instanceof De || (y = new De(e), r[o] = y), y.addSamplesPackedArray(c, v), void Ke(n, y);
      if (!p && h) return (l = l.clone()).data = f ? m ? e.unpack(c, 0) : c : ze(e, a, n), P(y) || (y = new (f ? Be : Y)(), r[o] = y), f && y instanceof Be || (y instanceof Y || ((C = I.MAXIMUM_INTERVAL.clone()).data = y, y = new Y(), (r[o] = y).intervals.addInterval(C)), f && (l.data = new Q(l.data))), void y.intervals.addInterval(l);
      P(y) || (y = new Y(), r[o] = y), y instanceof Y || ((C = I.MAXIMUM_INTERVAL.clone()).data = y, y = new Y(), (r[o] = y).intervals.addInterval(C));
      var w = y.intervals,
          C = w.findInterval(l);
      P(C) && C.data instanceof De || ((C = l.clone()).data = new De(e), w.addInterval(C)), C.data.addSamplesPackedArray(c, v), Ke(n, C.data);
    } else r[o] = f ? new Q(m ? e.unpack(c, 0) : c) : ze(e, a, n);
  }

  function er(e, r, o, n, t, i, a) {
    if (P(n)) if (w(n)) for (var l = 0, s = n.length; l < s; l++) {
      $e(e, r, o, n[l], t, i, a);
    } else $e(e, r, o, n, t, i, a);
  }

  function rr(e, r, o, n, t, i) {
    var a,
        l = o.interval;
    P(l) ? (Qe.iso8601 = l, a = M.fromIso8601(Qe), P(n) && (a = M.intersect(a, n, Fe))) : P(n) && (a = n);
    var s,
        c,
        d = P(o.cartesianVelocity) ? 1 : 0,
        u = C.packedLength * (1 + d),
        f = !P(o.reference),
        h = P(a) && !a.equals(I.MAXIMUM_INTERVAL);
    if (!0 === o["delete"]) return h ? function e(r, o) {
      {
        if (r instanceof Ne) return void r.removeSamples(o);
        if (r instanceof xe) return void r.intervals.removeInterval(o);

        if (r instanceof Z) {
          for (var n = r.intervals, t = 0; t < n.length; ++t) {
            var i = M.intersect(n.get(t), o, Fe);
            i.isEmpty || e(i.data, o);
          }

          return void n.removeInterval(o);
        }
      }
    }(e[r], a) : void (e[r] = void 0);
    var p = !1;

    if (f && (P(o.referenceFrame) && (c = k[o.referenceFrame]), c = b(c, k.FIXED), s = je(o), p = u < b(s.length, 1)), p || h) {
      var m,
          v = e[r],
          y = o.epoch;
      if (P(y) && (m = O.fromIso8601(y)), p && !h) return v instanceof Ne && (!P(c) || v.referenceFrame === c) || (v = new Ne(c, d), e[r] = v), v.addSamplesPackedArray(s, m), void Ke(o, v);
      if (!p && h) return (a = a.clone()).data = f ? C.unpack(s) : Ee(i, o.reference), P(v) || (v = new (f ? xe : Z)(c), e[r] = v), f && v instanceof xe && P(c) && v.referenceFrame === c || (v instanceof Z || ((w = I.MAXIMUM_INTERVAL.clone()).data = v, v = new Z(v.referenceFrame), (e[r] = v).intervals.addInterval(w)), f && (a.data = new K(a.data, c))), void v.intervals.addInterval(a);
      P(v) ? v instanceof Z || ((w = I.MAXIMUM_INTERVAL.clone()).data = v, v = new Z(v.referenceFrame), (e[r] = v).intervals.addInterval(w)) : (v = new Z(c), e[r] = v);
      var g = v.intervals,
          w = g.findInterval(a);
      P(w) && w.data instanceof Ne && (!P(c) || w.data.referenceFrame === c) || ((w = a.clone()).data = new Ne(c, d), g.addInterval(w)), w.data.addSamplesPackedArray(s, m), Ke(o, w.data);
    } else e[r] = f ? new K(C.unpack(s), c) : Ee(i, o.reference);
  }

  function or(e, r, o, n, t, i) {
    if (P(o)) if (w(o)) for (var a = 0, l = o.length; a < l; a++) {
      rr(e, r, o[a], n, 0, i);
    } else rr(e, r, o, n, 0, i);
  }

  function nr(e, r, o, n, t, i) {
    var a,
        l = o.interval;
    P(l) ? (Qe.iso8601 = l, a = M.fromIso8601(Qe), P(n) && (a = M.intersect(a, n, Fe))) : P(n) && (a = n);
    var s,
        c,
        d,
        u,
        f = e[r];
    P(a) ? (f instanceof J || (f = new J(), e[r] = f), d = (c = f.intervals).findInterval({
      start: a.start,
      stop: a.stop
    }), P(d) ? s = d.data : (d = a.clone(), c.addInterval(d))) : s = f, P(o.solidColor) ? (s instanceof q || (s = new q()), u = o.solidColor, er(m, s, "color", u.color, void 0, void 0, i)) : P(o.grid) ? (s instanceof le || (s = new le()), u = o.grid, er(m, s, "color", u.color, void 0, t, i), er(Number, s, "cellAlpha", u.cellAlpha, void 0, t, i), er(p, s, "lineCount", u.lineCount, void 0, t, i), er(p, s, "lineThickness", u.lineThickness, void 0, t, i), er(p, s, "lineOffset", u.lineOffset, void 0, t, i)) : P(o.image) ? (s instanceof se || (s = new se()), u = o.image, er(Image, s, "image", u.image, void 0, t, i), er(p, s, "repeat", u.repeat, void 0, t, i), er(m, s, "color", u.color, void 0, t, i), er(Boolean, s, "transparent", u.transparent, void 0, t, i)) : P(o.stripe) ? (s instanceof Re || (s = new Re()), u = o.stripe, er(ke, s, "orientation", u.orientation, void 0, t, i), er(m, s, "evenColor", u.evenColor, void 0, t, i), er(m, s, "oddColor", u.oddColor, void 0, t, i), er(Number, s, "offset", u.offset, void 0, t, i), er(Number, s, "repeat", u.repeat, void 0, t, i)) : P(o.polylineOutline) ? (s instanceof we || (s = new we()), u = o.polylineOutline, er(m, s, "color", u.color, void 0, t, i), er(m, s, "outlineColor", u.outlineColor, void 0, t, i), er(Number, s, "outlineWidth", u.outlineWidth, void 0, t, i)) : P(o.polylineGlow) ? (s instanceof ye || (s = new ye()), u = o.polylineGlow, er(m, s, "color", u.color, void 0, t, i), er(Number, s, "glowPower", u.glowPower, void 0, t, i), er(Number, s, "taperPower", u.taperPower, void 0, t, i)) : P(o.polylineArrow) ? (s instanceof me || (s = new me()), u = o.polylineArrow, er(m, s, "color", u.color, void 0, void 0, i)) : P(o.polylineDash) ? (s instanceof ve || (s = new ve()), u = o.polylineDash, er(m, s, "color", u.color, void 0, void 0, i), er(m, s, "gapColor", u.gapColor, void 0, void 0, i), er(Number, s, "dashLength", u.dashLength, void 0, t, i), er(Number, s, "dashPattern", u.dashPattern, void 0, t, i)) : P(o.checkerboard) && (s instanceof X || (s = new X()), u = o.checkerboard, er(m, s, "evenColor", u.evenColor, void 0, t, i), er(m, s, "oddColor", u.oddColor, void 0, t, i), er(p, s, "repeat", u.repeat, void 0, t, i)), P(d) ? d.data = s : e[r] = s;
  }

  function tr(e, r, o, n, t, i) {
    if (P(o)) if (w(o)) for (var a = 0, l = o.length; a < l; a++) {
      nr(e, r, o[a], n, t, i);
    } else nr(e, r, o, n, t, i);
  }

  function ir(e, r, o, n) {
    var t,
        i,
        a,
        l = o.references;
    P(l) ? (t = l.map(function (e) {
      return Ee(n, e);
    }), a = o.interval, P(a) ? (a = M.fromIso8601(a), e[r] instanceof Z || (a.data = new be(t), (i = new Y()).intervals.addInterval(a), e[r] = i)) : e[r] = new be(t)) : er(Array, e, r, o, void 0, void 0, n);
  }

  function ar(e, r, o, n) {
    if (P(o)) if (w(o)) for (var t = 0, i = o.length; t < i; ++t) {
      ir(e, r, o[t], n);
    } else ir(e, r, o, n);
  }

  function lr(e, r, o, n) {
    var t, i, a;
    P(o.references) ? (t = o.references.map(function (e) {
      return Ee(n, e);
    }), a = o.interval, P(a) ? (a = M.fromIso8601(a), e[r] instanceof Z || (a.data = new Ce(t), (i = new Z()).intervals.addInterval(a), e[r] = i)) : e[r] = new Ce(t)) : (P(o.cartesian) ? o.array = C.unpackArray(o.cartesian) : P(o.cartographicRadians) ? o.array = C.fromRadiansArrayHeights(o.cartographicRadians) : P(o.cartographicDegrees) && (o.array = C.fromDegreesArrayHeights(o.cartographicDegrees)), P(o.array) && er(Array, e, r, o, void 0, void 0, n));
  }

  function sr(e, r, o, n) {
    if (P(o)) if (w(o)) for (var t = 0, i = o.length; t < i; t++) {
      lr(e, r, o[t], n);
    } else lr(e, r, o, n);
  }

  function cr(e, r, o, n, t) {
    var i,
        a = r.interval;
    P(a) ? (Qe.iso8601 = a, i = M.fromIso8601(Qe), P(o) && (i = M.intersect(i, o, Fe))) : P(o) && (i = o);

    for (var l = e.nodeTransformations, s = Object.keys(r), c = 0, d = s.length; c < d; ++c) {
      var u,
          f,
          h = s[c];
      "interval" !== h && (u = r[h], P(u) && (P(l) || (e.nodeTransformations = l = new Pe()), l.hasProperty(h) || l.addProperty(h), f = l[h], P(f) || (l[h] = f = new ue()), er(C, f, "translation", u.translation, i, n, t), er(D, f, "rotation", u.rotation, i, n, t), er(C, f, "scale", u.scale, i, n, t)));
    }
  }

  function dr(e) {
    return e ? u.GEODESIC : u.NONE;
  }

  function ur(e, r, o, n, t) {
    var i = e.id;
    if (P(i) || (i = f()), Le = i, !P(t._version) && "document" !== i) throw new B("The first CZML packet is required to be the document object.");
    if (!0 === e["delete"]) r.removeById(i);else if ("document" === i) !function (e, r) {
      var o = e.version;

      if (P(o) && "string" == typeof o) {
        var n = o.split(".");

        if (2 === n.length) {
          if ("1" !== n[0]) throw new B("PGEarth only supports CZML version 1.");
          r._version = o;
        }
      }

      if (!P(r._version)) throw new B("CZML version information invalid.  It is expected to be a property on the document object in the <Major>.<Minor> version format.");
      var t = r._documentPacket;
      P(e.name) && (t.name = e.name);
      var i,
          a = e.clock;
      P(a) && (i = t.clock, P(i) ? (i.interval = b(a.interval, i.interval), i.currentTime = b(a.currentTime, i.currentTime), i.range = b(a.range, i.range), i.step = b(a.step, i.step), i.multiplier = b(a.multiplier, i.multiplier)) : t.clock = {
        interval: a.interval,
        currentTime: a.currentTime,
        range: a.range,
        step: a.step,
        multiplier: a.multiplier
      });
    }(e, t);else {
      var a = r.getOrCreateEntity(i),
          l = e.parent;
      P(l) && (a.parent = r.getOrCreateEntity(l));

      for (var s = o.length - 1; -1 < s; s--) {
        o[s](a, e, r, n);
      }
    }
    Le = void 0;
  }

  function fr(r, e, o, n) {
    if (!P(e)) throw new a("czml is required.");
    var t = e,
        i = (o = b(o, b.EMPTY_OBJECT)).sourceUri;
    return ("string" == typeof e || e instanceof x) && (t = (e = x.createIfNeeded(e)).fetchJson(), i = b(i, e.clone())), i = x.createIfNeeded(i), re.setLoading(r, !0), F(t, function (e) {
      return function (e, r, o, n) {
        re.setLoading(e, !0);
        var t = e._entityCollection;
        n && (e._version = void 0, e._documentPacket = new hr(), t.removeAll());

        pr._processCzml(r, t, o, void 0, e);

        var i = function (e) {
          var r,
              o = e._documentPacket.clock;
          if (P(o)) return P(e._clock) ? t = e._clock.clone() : ((t = new oe()).startTime = I.MINIMUM_VALUE.clone(), t.stopTime = I.MAXIMUM_VALUE.clone(), t.currentTime = I.MINIMUM_VALUE.clone(), t.clockRange = c.LOOP_STOP, t.clockStep = d.SYSTEM_CLOCK_MULTIPLIER, t.multiplier = 1), P(o.interval) && (Qe.iso8601 = o.interval, r = M.fromIso8601(Qe), t.startTime = r.start, t.stopTime = r.stop), P(o.currentTime) && (t.currentTime = O.fromIso8601(o.currentTime)), P(o.range) && (t.clockRange = b(c[o.range], c.LOOP_STOP)), P(o.step) && (t.clockStep = b(d[o.step], d.SYSTEM_CLOCK_MULTIPLIER)), P(o.multiplier) && (t.multiplier = o.multiplier), !t.equals(e._clock) && (e._clock = t.clone(e._clock), !0);

          if (!P(e._clock)) {
            var n = e._entityCollection.computeAvailability();

            if (!n.start.equals(I.MINIMUM_VALUE)) {
              var t,
                  i = n.start,
                  a = n.stop,
                  l = O.secondsDifference(a, i),
                  s = Math.round(l / 120);
              return (t = new oe()).startTime = O.clone(i), t.stopTime = O.clone(a), t.clockRange = c.LOOP_STOP, t.multiplier = s, t.currentTime = O.clone(i), t.clockStep = d.SYSTEM_CLOCK_MULTIPLIER, e._clock = t, !0;
            }
          }

          return !1;
        }(e),
            a = e._documentPacket;

        P(a.name) && e._name !== a.name ? (e._name = a.name, i = !0) : !P(e._name) && P(o) && (e._name = g(o.getUrlComponent()), i = !0);
        re.setLoading(e, !1), i && e._changed.raiseEvent(e);
        return e;
      }(r, e, i, n);
    }).otherwise(function (e) {
      return re.setLoading(r, !1), r._error.raiseEvent(r, e), console.log(e), F.reject(e);
    });
  }

  function hr() {
    this.name = void 0, this.clock = void 0;
  }

  function pr(e) {
    this._name = e, this._changed = new o(), this._error = new o(), this._isLoading = !1, this._loading = new o(), this._clock = void 0, this._documentPacket = new hr(), this._version = void 0, this._entityCollection = new ae(this), this._entityCluster = new ie();
  }

  return pr.load = function (e, r) {
    return new pr().load(e, r);
  }, r(pr.prototype, {
    name: {
      get: function get() {
        return this._name;
      }
    },
    clock: {
      get: function get() {
        return this._clock;
      }
    },
    entities: {
      get: function get() {
        return this._entityCollection;
      }
    },
    isLoading: {
      get: function get() {
        return this._isLoading;
      }
    },
    changedEvent: {
      get: function get() {
        return this._changed;
      }
    },
    errorEvent: {
      get: function get() {
        return this._error;
      }
    },
    loadingEvent: {
      get: function get() {
        return this._loading;
      }
    },
    show: {
      get: function get() {
        return this._entityCollection.show;
      },
      set: function set(e) {
        this._entityCollection.show = e;
      }
    },
    clustering: {
      get: function get() {
        return this._entityCluster;
      },
      set: function set(e) {
        if (!P(e)) throw new a("value must be defined.");
        this._entityCluster = e;
      }
    }
  }), pr.updaters = [function (e, r, o, n) {
    var t,
        i,
        a,
        l,
        s,
        c,
        d,
        u,
        f = r.billboard;
    P(f) && (i = f.interval, P(i) && (Qe.iso8601 = i, t = M.fromIso8601(Qe)), a = e.billboard, P(a) || (e.billboard = a = new V()), er(Boolean, a, "show", f.show, t, n, o), er(Image, a, "image", f.image, t, n, o), er(Number, a, "scale", f.scale, t, n, o), er(p, a, "pixelOffset", f.pixelOffset, t, n, o), er(C, a, "eyeOffset", f.eyeOffset, t, n, o), er(E, a, "horizontalOrigin", f.horizontalOrigin, t, n, o), er(H, a, "verticalOrigin", f.verticalOrigin, t, n, o), er(L, a, "heightReference", f.heightReference, t, n, o), er(m, a, "color", f.color, t, n, o), er(Te, a, "rotation", f.rotation, t, n, o), l = a, s = f.alignedAxis, c = t, d = n, u = o, P(s) && er(Ae, l, "alignedAxis", s, c, d, u), er(Boolean, a, "sizeInMeters", f.sizeInMeters, t, n, o), er(Number, a, "width", f.width, t, n, o), er(Number, a, "height", f.height, t, n, o), er(N, a, "scaleByDistance", f.scaleByDistance, t, n, o), er(N, a, "translucencyByDistance", f.translucencyByDistance, t, n, o), er(N, a, "pixelOffsetScaleByDistance", f.pixelOffsetScaleByDistance, t, n, o), er(h, a, "imageSubRegion", f.imageSubRegion, t, n, o), er(v, a, "distanceDisplayCondition", f.distanceDisplayCondition, t, n, o), er(Number, a, "disableDepthTestDistance", f.disableDepthTestDistance, t, n, o));
  }, function (e, r, o, n) {
    var t,
        i,
        a,
        l = r.box;
    P(l) && (i = l.interval, P(i) && (Qe.iso8601 = i, t = M.fromIso8601(Qe)), a = e.box, P(a) || (e.box = a = new U()), er(Boolean, a, "show", l.show, t, n, o), er(C, a, "dimensions", l.dimensions, t, n, o), er(Boolean, a, "fill", l.fill, t, n, o), tr(a, "material", l.material, t, n, o), er(Boolean, a, "outline", l.outline, t, n, o), er(m, a, "outlineColor", l.outlineColor, t, n, o), er(Number, a, "outlineWidth", l.outlineWidth, t, n, o), er(G, a, "shadows", l.shadows, t, n, o), er(v, a, "distanceDisplayCondition", l.distanceDisplayCondition, t, n, o));
  }, function (e, r, o, n) {
    var t,
        i,
        a,
        l = r.corridor;
    P(l) && (i = l.interval, P(i) && (Qe.iso8601 = i, t = M.fromIso8601(Qe)), a = e.corridor, P(a) || (e.corridor = a = new $()), er(Boolean, a, "show", l.show, t, n, o), sr(a, "positions", l.positions, o), er(Number, a, "width", l.width, t, n, o), er(Number, a, "height", l.height, t, n, o), er(Number, a, "extrudedHeight", l.extrudedHeight, t, n, o), er(L, a, "heightReference", l.heightReference, t, n, o), er(L, a, "extrudedHeightReference", l.extrudedHeightReference, t, n, o), er(s, a, "cornerType", l.cornerType, t, n, o), er(Number, a, "granularity", l.granularity, t, n, o), er(Boolean, a, "fill", l.fill, t, n, o), tr(a, "material", l.material, t, n, o), er(Boolean, a, "outline", l.outline, t, n, o), er(m, a, "outlineColor", l.outlineColor, t, n, o), er(Number, a, "outlineWidth", l.outlineWidth, t, n, o), er(G, a, "shadows", l.shadows, t, n, o), er(v, a, "distanceDisplayCondition", l.distanceDisplayCondition, t, n, o), er(Number, a, "zIndex", l.zIndex, t, n, o));
  }, function (e, r, o, n) {
    var t,
        i,
        a,
        l = r.cylinder;
    P(l) && (i = l.interval, P(i) && (Qe.iso8601 = i, t = M.fromIso8601(Qe)), a = e.cylinder, P(a) || (e.cylinder = a = new ee()), er(Boolean, a, "show", l.show, t, n, o), er(Number, a, "length", l.length, t, n, o), er(Number, a, "topRadius", l.topRadius, t, n, o), er(Number, a, "bottomRadius", l.bottomRadius, t, n, o), er(Boolean, a, "fill", l.fill, t, n, o), tr(a, "material", l.material, t, n, o), er(Boolean, a, "outline", l.outline, t, n, o), er(m, a, "outlineColor", l.outlineColor, t, n, o), er(Number, a, "outlineWidth", l.outlineWidth, t, n, o), er(Number, a, "numberOfVerticalLines", l.numberOfVerticalLines, t, n, o), er(Number, a, "slices", l.slices, t, n, o), er(G, a, "shadows", l.shadows, t, n, o), er(v, a, "distanceDisplayCondition", l.distanceDisplayCondition, t, n, o));
  }, function (e, r, o, n) {
    var t,
        i,
        a,
        l = r.ellipse;
    P(l) && (i = l.interval, P(i) && (Qe.iso8601 = i, t = M.fromIso8601(Qe)), a = e.ellipse, P(a) || (e.ellipse = a = new ne()), er(Boolean, a, "show", l.show, t, n, o), er(Number, a, "semiMajorAxis", l.semiMajorAxis, t, n, o), er(Number, a, "semiMinorAxis", l.semiMinorAxis, t, n, o), er(Number, a, "height", l.height, t, n, o), er(Number, a, "extrudedHeight", l.extrudedHeight, t, n, o), er(L, a, "heightReference", l.heightReference, t, n, o), er(L, a, "extrudedHeightReference", l.extrudedHeightReference, t, n, o), er(Te, a, "rotation", l.rotation, t, n, o), er(Te, a, "stRotation", l.stRotation, t, n, o), er(Number, a, "granularity", l.granularity, t, n, o), er(Boolean, a, "fill", l.fill, t, n, o), tr(a, "material", l.material, t, n, o), er(Boolean, a, "outline", l.outline, t, n, o), er(m, a, "outlineColor", l.outlineColor, t, n, o), er(Number, a, "outlineWidth", l.outlineWidth, t, n, o), er(Number, a, "numberOfVerticalLines", l.numberOfVerticalLines, t, n, o), er(G, a, "shadows", l.shadows, t, n, o), er(v, a, "distanceDisplayCondition", l.distanceDisplayCondition, t, n, o), er(Number, a, "zIndex", l.zIndex, t, n, o));
  }, function (e, r, o, n) {
    var t,
        i,
        a,
        l = r.ellipsoid;
    P(l) && (i = l.interval, P(i) && (Qe.iso8601 = i, t = M.fromIso8601(Qe)), a = e.ellipsoid, P(a) || (e.ellipsoid = a = new te()), er(Boolean, a, "show", l.show, t, n, o), er(C, a, "radii", l.radii, t, n, o), er(Boolean, a, "fill", l.fill, t, n, o), tr(a, "material", l.material, t, n, o), er(Boolean, a, "outline", l.outline, t, n, o), er(m, a, "outlineColor", l.outlineColor, t, n, o), er(Number, a, "outlineWidth", l.outlineWidth, t, n, o), er(Number, a, "stackPartitions", l.stackPartitions, t, n, o), er(Number, a, "slicePartitions", l.slicePartitions, t, n, o), er(Number, a, "subdivisions", l.subdivisions, t, n, o), er(G, a, "shadows", l.shadows, t, n, o), er(v, a, "distanceDisplayCondition", l.distanceDisplayCondition, t, n, o));
  }, function (e, r, o, n) {
    var t,
        i,
        a,
        l = r.label;
    P(l) && (i = l.interval, P(i) && (Qe.iso8601 = i, t = M.fromIso8601(Qe)), a = e.label, P(a) || (e.label = a = new ce()), er(Boolean, a, "show", l.show, t, n, o), er(String, a, "text", l.text, t, n, o), er(String, a, "font", l.font, t, n, o), er(z, a, "style", l.style, t, n, o), er(Number, a, "scale", l.scale, t, n, o), er(Boolean, a, "showBackground", l.showBackground, t, n, o), er(m, a, "backgroundColor", l.backgroundColor, t, n, o), er(p, a, "backgroundPadding", l.backgroundPadding, t, n, o), er(p, a, "pixelOffset", l.pixelOffset, t, n, o), er(C, a, "eyeOffset", l.eyeOffset, t, n, o), er(E, a, "horizontalOrigin", l.horizontalOrigin, t, n, o), er(H, a, "verticalOrigin", l.verticalOrigin, t, n, o), er(L, a, "heightReference", l.heightReference, t, n, o), er(m, a, "fillColor", l.fillColor, t, n, o), er(m, a, "outlineColor", l.outlineColor, t, n, o), er(Number, a, "outlineWidth", l.outlineWidth, t, n, o), er(N, a, "translucencyByDistance", l.translucencyByDistance, t, n, o), er(N, a, "pixelOffsetScaleByDistance", l.pixelOffsetScaleByDistance, t, n, o), er(N, a, "scaleByDistance", l.scaleByDistance, t, n, o), er(v, a, "distanceDisplayCondition", l.distanceDisplayCondition, t, n, o), er(Number, a, "disableDepthTestDistance", l.disableDepthTestDistance, t, n, o));
  }, function (e, r, o, n) {
    var t = r.model;

    if (P(t)) {
      var i,
          a = t.interval;
      P(a) && (Qe.iso8601 = a, i = M.fromIso8601(Qe));
      var l = e.model;
      P(l) || (e.model = l = new de()), er(Boolean, l, "show", t.show, i, n, o), er(W, l, "uri", t.gltf, i, n, o), er(Number, l, "scale", t.scale, i, n, o), er(Number, l, "minimumPixelSize", t.minimumPixelSize, i, n, o), er(Number, l, "maximumScale", t.maximumScale, i, n, o), er(Boolean, l, "incrementallyLoadTextures", t.incrementallyLoadTextures, i, n, o), er(Boolean, l, "runAnimations", t.runAnimations, i, n, o), er(Boolean, l, "clampAnimations", t.clampAnimations, i, n, o), er(G, l, "shadows", t.shadows, i, n, o), er(L, l, "heightReference", t.heightReference, i, n, o), er(m, l, "silhouetteColor", t.silhouetteColor, i, n, o), er(Number, l, "silhouetteSize", t.silhouetteSize, i, n, o), er(m, l, "color", t.color, i, n, o), er(A, l, "colorBlendMode", t.colorBlendMode, i, n, o), er(Number, l, "colorBlendAmount", t.colorBlendAmount, i, n, o), er(v, l, "distanceDisplayCondition", t.distanceDisplayCondition, i, n, o);
      var s = t.nodeTransformations;
      if (P(s)) if (w(s)) for (var c = 0, d = s.length; c < d; c++) {
        cr(l, s[c], i, n, o);
      } else cr(l, s, i, n, o);
    }
  }, function (e, r, o, n) {
    e.name = b(r.name, e.name);
  }, function (e, r, o, n) {
    var t = r.description;
    P(t) && er(String, e, "description", t, void 0, n, o);
  }, function (e, r, o, n) {
    var t,
        i,
        a,
        l = r.path;
    P(l) && (i = l.interval, P(i) && (Qe.iso8601 = i, t = M.fromIso8601(Qe)), a = e.path, P(a) || (e.path = a = new fe()), er(Boolean, a, "show", l.show, t, n, o), er(Number, a, "width", l.width, t, n, o), er(Number, a, "resolution", l.resolution, t, n, o), er(Number, a, "leadTime", l.leadTime, t, n, o), er(Number, a, "trailTime", l.trailTime, t, n, o), tr(a, "material", l.material, t, n, o), er(v, a, "distanceDisplayCondition", l.distanceDisplayCondition, t, n, o));
  }, function (e, r, o, n) {
    var t,
        i,
        a,
        l = r.point;
    P(l) && (i = l.interval, P(i) && (Qe.iso8601 = i, t = M.fromIso8601(Qe)), a = e.point, P(a) || (e.point = a = new he()), er(Boolean, a, "show", l.show, t, n, o), er(Number, a, "pixelSize", l.pixelSize, t, n, o), er(L, a, "heightReference", l.heightReference, t, n, o), er(m, a, "color", l.color, t, n, o), er(m, a, "outlineColor", l.outlineColor, t, n, o), er(Number, a, "outlineWidth", l.outlineWidth, t, n, o), er(N, a, "scaleByDistance", l.scaleByDistance, t, n, o), er(N, a, "translucencyByDistance", l.translucencyByDistance, t, n, o), er(v, a, "distanceDisplayCondition", l.distanceDisplayCondition, t, n, o), er(Number, a, "disableDepthTestDistance", l.disableDepthTestDistance, t, n, o));
  }, function (e, r, o, n) {
    var t,
        i,
        a,
        l = r.polygon;
    P(l) && (i = l.interval, P(i) && (Qe.iso8601 = i, t = M.fromIso8601(Qe)), a = e.polygon, P(a) || (e.polygon = a = new pe()), er(Boolean, a, "show", l.show, t, n, o), sr(a, "hierarchy", l.positions, o), er(Number, a, "height", l.height, t, n, o), er(Number, a, "extrudedHeight", l.extrudedHeight, t, n, o), er(L, a, "heightReference", l.heightReference, t, n, o), er(L, a, "extrudedHeightReference", l.extrudedHeightReference, t, n, o), er(Te, a, "stRotation", l.stRotation, t, n, o), er(Number, a, "granularity", l.granularity, t, n, o), er(Boolean, a, "fill", l.fill, t, n, o), tr(a, "material", l.material, t, n, o), er(Boolean, a, "outline", l.outline, t, n, o), er(m, a, "outlineColor", l.outlineColor, t, n, o), er(Number, a, "outlineWidth", l.outlineWidth, t, n, o), er(Boolean, a, "perPositionHeight", l.perPositionHeight, t, n, o), er(Boolean, a, "closeTop", l.closeTop, t, n, o), er(Boolean, a, "closeBottom", l.closeBottom, t, n, o), er(u, a, "arcType", l.arcType, t, n, o), er(G, a, "shadows", l.shadows, t, n, o), er(v, a, "distanceDisplayCondition", l.distanceDisplayCondition, t, n, o), er(Number, a, "zIndex", l.zIndex, t, n, o));
  }, function (e, r, o, n) {
    var t,
        i,
        a,
        l,
        s,
        c,
        d = r.polyline;
    P(d) && (i = d.interval, P(i) && (Qe.iso8601 = i, t = M.fromIso8601(Qe)), a = e.polyline, P(a) || (e.polyline = a = new ge()), er(Boolean, a, "show", d.show, t, n, o), sr(a, "positions", d.positions, o), er(Number, a, "width", d.width, t, n, o), er(Number, a, "granularity", d.granularity, t, n, o), tr(a, "material", d.material, t, n, o), tr(a, "depthFailMaterial", d.depthFailMaterial, t, n, o), er(u, a, "arcType", d.arcType, t, n, o), er(Boolean, a, "clampToGround", d.clampToGround, t, n, o), er(G, a, "shadows", d.shadows, t, n, o), er(v, a, "distanceDisplayCondition", d.distanceDisplayCondition, t, n, o), er(Number, a, "zIndex", d.zIndex, t, n, o), P(d.followSurface) && !P(d.arcType) && (l = {}, er(Boolean, l, "followSurface", d.followSurface, t, n, o), a.arcType = (c = dr, new j(function (e, r) {
      return c(s.getValue(e, r));
    }, (s = l.followSurface).isConstant))));
  }, function (e, r, o, n) {
    var t = r.properties;
    if (P(t)) for (var i in P(e.properties) || (e.properties = new Pe()), t) {
      if (t.hasOwnProperty(i)) {
        e.properties.hasProperty(i) || e.properties.addProperty(i);
        var a = t[i];
        if (w(a)) for (var l = 0, s = a.length; l < s; l++) {
          $e(Je(a[l]), e.properties, i, a[l], void 0, n, o);
        } else $e(Je(a), e.properties, i, a, void 0, n, o);
      }
    }
  }, function (e, r, o, n) {
    var t,
        i,
        a,
        l = r.rectangle;
    P(l) && (i = l.interval, P(i) && (Qe.iso8601 = i, t = M.fromIso8601(Qe)), a = e.rectangle, P(a) || (e.rectangle = a = new Ie()), er(Boolean, a, "show", l.show, t, n, o), er(R, a, "coordinates", l.coordinates, t, n, o), er(Number, a, "height", l.height, t, n, o), er(Number, a, "extrudedHeight", l.extrudedHeight, t, n, o), er(L, a, "heightReference", l.heightReference, t, n, o), er(L, a, "extrudedHeightReference", l.extrudedHeightReference, t, n, o), er(Te, a, "rotation", l.rotation, t, n, o), er(Te, a, "stRotation", l.stRotation, t, n, o), er(Number, a, "granularity", l.granularity, t, n, o), er(Boolean, a, "fill", l.fill, t, n, o), tr(a, "material", l.material, t, n, o), er(Boolean, a, "outline", l.outline, t, n, o), er(m, a, "outlineColor", l.outlineColor, t, n, o), er(Number, a, "outlineWidth", l.outlineWidth, t, n, o), er(G, a, "shadows", l.shadows, t, n, o), er(v, a, "distanceDisplayCondition", l.distanceDisplayCondition, t, n, o), er(Number, a, "zIndex", l.zIndex, t, n, o));
  }, function (e, r, o, n) {
    var t = r.position;
    P(t) && or(e, "position", t, void 0, 0, o);
  }, function (e, r, o, n) {
    var t = r.viewFrom;
    P(t) && er(C, e, "viewFrom", t, void 0, n, o);
  }, function (e, r, o, n) {
    var t,
        i,
        a,
        l = r.wall;
    P(l) && (i = l.interval, P(i) && (Qe.iso8601 = i, t = M.fromIso8601(Qe)), a = e.wall, P(a) || (e.wall = a = new _e()), er(Boolean, a, "show", l.show, t, n, o), sr(a, "positions", l.positions, o), ar(a, "minimumHeights", l.minimumHeights, o), ar(a, "maximumHeights", l.maximumHeights, o), er(Number, a, "granularity", l.granularity, t, n, o), er(Boolean, a, "fill", l.fill, t, n, o), tr(a, "material", l.material, t, n, o), er(Boolean, a, "outline", l.outline, t, n, o), er(m, a, "outlineColor", l.outlineColor, t, n, o), er(Number, a, "outlineWidth", l.outlineWidth, t, n, o), er(G, a, "shadows", l.shadows, t, n, o), er(v, a, "distanceDisplayCondition", l.distanceDisplayCondition, t, n, o));
  }, function (e, r, o, n) {
    var t = r.orientation;
    P(t) && er(D, e, "orientation", t, void 0, n, o);
  }, function (e, r, o, n) {
    var t,
        i,
        a = r.availability;

    if (P(a)) {
      if (w(a)) for (var l = a.length, s = 0; s < l; s++) {
        P(i) || (i = new _()), Qe.iso8601 = a[s], t = M.fromIso8601(Qe), i.addInterval(t);
      } else Qe.iso8601 = a, t = M.fromIso8601(Qe), (i = new _()).addInterval(t);
      e.availability = i;
    }
  }], pr.prototype.process = function (e, r) {
    return fr(this, e, r, !1);
  }, pr.prototype.load = function (e, r) {
    return fr(this, e, r, !0);
  }, pr.processPacketData = er, pr.processPositionPacketData = or, pr.processMaterialPacketData = tr, pr._processCzml = function (e, r, o, n, t) {
    if (n = P(n) ? n : pr.updaters, w(e)) for (var i = 0, a = e.length; i < a; i++) {
      ur(e[i], r, n, o, t);
    } else ur(e, r, n, o, t);
  }, pr;
});