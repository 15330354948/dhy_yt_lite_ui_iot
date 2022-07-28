"use strict";

define(["./arrayFill", "./arrayRemoveDuplicates", "./BoundingSphere", "./Cartesian3", "./Check", "./ComponentDatatype", "./CornerType", "./CorridorGeometryLibrary", "./defaultValue", "./defined", "./Ellipsoid", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryOffsetAttribute", "./IndexDatatype", "./Math", "./PolygonPipeline", "./PrimitiveType"], function (w, g, y, M, f, R, j, F, c, V, v, b, Y, q, E, J, A, T, _) {
  "use strict";

  var W = new M(),
      z = new M(),
      K = new M();

  function P(t, e) {
    var i,
        r = [],
        o = t.positions,
        n = t.corners,
        s = t.endPositions,
        a = new q(),
        u = 0,
        h = 0,
        l = 0;

    for (D = 0; D < o.length; D += 2) {
      u += i = o[D].length - 3, l += i / 3 * 4, h += o[D + 1].length - 3;
    }

    for (u += 3, h += 3, D = 0; D < n.length; D++) {
      x = n[D];
      var p = n[D].leftPositions;
      V(p) ? u += i = p.length : h += i = n[D].rightPositions.length, l += i / 3 * 2;
    }

    var d,
        f = V(s);
    f && (u += d = s[0].length - 3, h += d, l += 4 * (d /= 3));

    var c,
        g,
        y,
        v,
        b,
        A,
        _ = u + h,
        m = new Float64Array(_),
        w = 0,
        E = _ - 1,
        T = d / 2,
        P = J.createTypedArray(_ / 3, l + 4),
        O = 0;

    if (P[O++] = w / 3, P[O++] = (E - 2) / 3, f) {
      r.push(w / 3), A = W, b = z;

      for (var k = s[0], D = 0; D < T; D++) {
        A = M.fromArray(k, 3 * (T - 1 - D), A), b = M.fromArray(k, 3 * (T + D), b), F.addAttribute(m, b, w), F.addAttribute(m, A, void 0, E), v = (g = w / 3) + 1, y = (c = (E - 2) / 3) - 1, P[O++] = c, P[O++] = y, P[O++] = g, P[O++] = v, w += 3, E -= 3;
      }
    }

    var G = 0,
        N = o[G++],
        H = o[G++];

    for (m.set(N, w), m.set(H, E - H.length + 1), i = H.length - 3, r.push(w / 3, (E - 2) / 3), D = 0; D < i; D += 3) {
      v = (g = w / 3) + 1, y = (c = (E - 2) / 3) - 1, P[O++] = c, P[O++] = y, P[O++] = g, P[O++] = v, w += 3, E -= 3;
    }

    for (D = 0; D < n.length; D++) {
      var L,
          x,
          S,
          I = (x = n[D]).leftPositions,
          B = x.rightPositions,
          C = K;

      if (V(I)) {
        for (E -= 3, S = y, r.push(v), L = 0; L < I.length / 3; L++) {
          C = M.fromArray(I, 3 * L, C), P[O++] = S - L - 1, P[O++] = S - L, F.addAttribute(m, C, void 0, E), E -= 3;
        }

        r.push(S - Math.floor(I.length / 6)), e === j.BEVELED && r.push((E - 2) / 3 + 1), w += 3;
      } else {
        for (w += 3, S = v, r.push(y), L = 0; L < B.length / 3; L++) {
          C = M.fromArray(B, 3 * L, C), P[O++] = S + L, P[O++] = S + L + 1, F.addAttribute(m, C, w), w += 3;
        }

        r.push(S + Math.floor(B.length / 6)), e === j.BEVELED && r.push(w / 3 - 1), E -= 3;
      }

      for (N = o[G++], H = o[G++], N.splice(0, 3), H.splice(H.length - 3, 3), m.set(N, w), m.set(H, E - H.length + 1), i = H.length - 3, L = 0; L < H.length; L += 3) {
        g = (v = w / 3) - 1, c = (y = (E - 2) / 3) + 1, P[O++] = c, P[O++] = y, P[O++] = g, P[O++] = v, w += 3, E -= 3;
      }

      w -= 3, E += 3, r.push(w / 3, (E - 2) / 3);
    }

    if (f) {
      w += 3, E -= 3, A = W, b = z;
      var U = s[1];

      for (D = 0; D < T; D++) {
        A = M.fromArray(U, 3 * (d - D - 1), A), b = M.fromArray(U, 3 * D, b), F.addAttribute(m, A, void 0, E), F.addAttribute(m, b, w), g = (v = w / 3) - 1, c = (y = (E - 2) / 3) + 1, P[O++] = c, P[O++] = y, P[O++] = g, P[O++] = v, w += 3, E -= 3;
      }

      r.push(w / 3);
    } else r.push(w / 3, (E - 2) / 3);

    return P[O++] = w / 3, P[O++] = (E - 2) / 3, a.position = new Y({
      componentDatatype: R.DOUBLE,
      componentsPerAttribute: 3,
      values: m
    }), {
      attributes: a,
      indices: P,
      wallIndices: r
    };
  }

  function m(t) {
    var e = (t = c(t, c.EMPTY_OBJECT)).positions,
        i = t.width;
    f.typeOf.object("options.positions", e), f.typeOf.number("options.width", i);
    var r = c(t.height, 0),
        o = c(t.extrudedHeight, r);
    this._positions = e, this._ellipsoid = v.clone(c(t.ellipsoid, v.WGS84)), this._width = i, this._height = Math.max(r, o), this._extrudedHeight = Math.min(r, o), this._cornerType = c(t.cornerType, j.ROUNDED), this._granularity = c(t.granularity, A.RADIANS_PER_DEGREE), this._offsetAttribute = t.offsetAttribute, this._workerName = "createCorridorOutlineGeometry", this.packedLength = 1 + e.length * M.packedLength + v.packedLength + 6;
  }

  m.pack = function (t, e, i) {
    f.typeOf.object("value", t), f.typeOf.object("array", e), i = c(i, 0);
    var r = t._positions,
        o = r.length;
    e[i++] = o;

    for (var n = 0; n < o; ++n, i += M.packedLength) {
      M.pack(r[n], e, i);
    }

    return v.pack(t._ellipsoid, e, i), i += v.packedLength, e[i++] = t._width, e[i++] = t._height, e[i++] = t._extrudedHeight, e[i++] = t._cornerType, e[i++] = t._granularity, e[i] = c(t._offsetAttribute, -1), e;
  };

  var O = v.clone(v.UNIT_SPHERE),
      k = {
    positions: void 0,
    ellipsoid: O,
    width: void 0,
    height: void 0,
    extrudedHeight: void 0,
    cornerType: void 0,
    granularity: void 0,
    offsetAttribute: void 0
  };
  return m.unpack = function (t, e, i) {
    f.typeOf.object("array", t), e = c(e, 0);

    for (var r = t[e++], o = new Array(r), n = 0; n < r; ++n, e += M.packedLength) {
      o[n] = M.unpack(t, e);
    }

    var s = v.unpack(t, e, O);
    e += v.packedLength;
    var a = t[e++],
        u = t[e++],
        h = t[e++],
        l = t[e++],
        p = t[e++],
        d = t[e];
    return V(i) ? (i._positions = o, i._ellipsoid = v.clone(s, i._ellipsoid), i._width = a, i._height = u, i._extrudedHeight = h, i._cornerType = l, i._granularity = p, i._offsetAttribute = -1 === d ? void 0 : d, i) : (k.positions = o, k.width = a, k.height = u, k.extrudedHeight = h, k.cornerType = l, k.granularity = p, k.offsetAttribute = -1 === d ? void 0 : d, new m(k));
  }, m.createGeometry = function (t) {
    var e = t._positions,
        i = t._width,
        r = t._ellipsoid,
        e = function (t, e) {
      for (var i = 0; i < t.length; i++) {
        t[i] = e.scaleToGeodeticSurface(t[i], t[i]);
      }

      return t;
    }(e, r),
        o = g(e, M.equalsEpsilon);

    if (!(o.length < 2 || i <= 0)) {
      var n,
          s,
          a,
          u,
          h = t._height,
          l = t._extrudedHeight,
          p = !A.equalsEpsilon(h, l, 0, A.EPSILON2),
          d = {
        ellipsoid: r,
        positions: o,
        width: i,
        cornerType: t._cornerType,
        granularity: t._granularity,
        saveAttributes: !1
      };
      p ? (d.height = h, d.extrudedHeight = l, d.offsetAttribute = t._offsetAttribute, u = function (t) {
        var e = t.ellipsoid,
            i = P(F.computePositions(t), t.cornerType),
            r = i.wallIndices,
            o = t.height,
            n = t.extrudedHeight,
            s = i.attributes,
            a = i.indices,
            u = (d = s.position.values).length;
        (f = new Float64Array(u)).set(d);
        var h,
            l,
            p = new Float64Array(2 * u),
            d = T.scaleToGeodeticHeight(d, o, e),
            f = T.scaleToGeodeticHeight(f, n, e);
        p.set(d), p.set(f, u), s.position.values = p, u /= 3, V(t.offsetAttribute) && (l = new Uint8Array(2 * u), l = t.offsetAttribute === E.TOP ? w(l, 1, 0, u) : (h = t.offsetAttribute === E.NONE ? 0 : 1, w(l, h)), s.applyOffset = new Y({
          componentDatatype: R.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: l
        }));
        var c = a.length,
            g = J.createTypedArray(p.length / 3, 2 * (c + r.length));
        g.set(a);

        for (var y, v, b = c, A = 0; A < c; A += 2) {
          var _ = a[A],
              m = a[A + 1];
          g[b++] = _ + u, g[b++] = m + u;
        }

        for (A = 0; A < r.length; A++) {
          v = (y = r[A]) + u, g[b++] = y, g[b++] = v;
        }

        return {
          attributes: s,
          indices: g
        };
      }(d)) : ((u = P(F.computePositions(d), d.cornerType)).attributes.position.values = T.scaleToGeodeticHeight(u.attributes.position.values, h, r), V(t._offsetAttribute) && (n = u.attributes.position.values.length, s = new Uint8Array(n / 3), a = t._offsetAttribute === E.NONE ? 0 : 1, w(s, a), u.attributes.applyOffset = new Y({
        componentDatatype: R.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: s
      })));
      var f = u.attributes,
          c = y.fromVertices(f.position.values, void 0, 3);
      return new b({
        attributes: f,
        indices: u.indices,
        primitiveType: _.LINES,
        boundingSphere: c,
        offsetAttribute: t._offsetAttribute
      });
    }
  }, m;
});