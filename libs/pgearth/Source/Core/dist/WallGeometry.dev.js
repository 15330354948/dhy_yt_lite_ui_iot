"use strict";

define(["./BoundingSphere", "./Cartesian3", "./ComponentDatatype", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./IndexDatatype", "./Math", "./PrimitiveType", "./VertexFormat", "./WallGeometryLibrary"], function (Z, j, K, u, Q, h, g, X, $, ee, te, ie, ne, c, re) {
  "use strict";

  var oe = new j(),
      ae = new j(),
      se = new j(),
      me = new j(),
      le = new j(),
      pe = new j(),
      ue = new j(),
      he = new j();

  function v(e) {
    var t = (e = u(e, u.EMPTY_OBJECT)).positions,
        i = e.maximumHeights,
        n = e.minimumHeights;
    if (!Q(t)) throw new h("options.positions is required.");
    if (Q(i) && i.length !== t.length) throw new h("options.positions and options.maximumHeights must have the same length.");
    if (Q(n) && n.length !== t.length) throw new h("options.positions and options.minimumHeights must have the same length.");
    var r = u(e.vertexFormat, c.DEFAULT),
        o = u(e.granularity, ie.RADIANS_PER_DEGREE),
        a = u(e.ellipsoid, g.WGS84);
    this._positions = t, this._minimumHeights = n, this._maximumHeights = i, this._vertexFormat = c.clone(r), this._granularity = o, this._ellipsoid = g.clone(a), this._workerName = "createWallGeometry";
    var s = 1 + t.length * j.packedLength + 2;
    Q(n) && (s += n.length), Q(i) && (s += i.length), this.packedLength = s + g.packedLength + c.packedLength + 1;
  }

  v.pack = function (e, t, i) {
    if (!Q(e)) throw new h("value is required");
    if (!Q(t)) throw new h("array is required");
    var n;
    i = u(i, 0);
    var r = e._positions,
        o = r.length;

    for (t[i++] = o, n = 0; n < o; ++n, i += j.packedLength) {
      j.pack(r[n], t, i);
    }

    var a = e._minimumHeights,
        o = Q(a) ? a.length : 0;
    if (t[i++] = o, Q(a)) for (n = 0; n < o; ++n) {
      t[i++] = a[n];
    }
    var s = e._maximumHeights;
    if (o = Q(s) ? s.length : 0, t[i++] = o, Q(s)) for (n = 0; n < o; ++n) {
      t[i++] = s[n];
    }
    return g.pack(e._ellipsoid, t, i), i += g.packedLength, c.pack(e._vertexFormat, t, i), t[i += c.packedLength] = e._granularity, t;
  };

  var y = g.clone(g.UNIT_SPHERE),
      d = new c(),
      w = {
    positions: void 0,
    minimumHeights: void 0,
    maximumHeights: void 0,
    ellipsoid: y,
    vertexFormat: d,
    granularity: void 0
  };
  return v.unpack = function (e, t, i) {
    if (!Q(e)) throw new h("array is required");
    t = u(t, 0);

    for (var n, r, o = e[t++], a = new Array(o), s = 0; s < o; ++s, t += j.packedLength) {
      a[s] = j.unpack(e, t);
    }

    if (0 < (o = e[t++])) for (n = new Array(o), s = 0; s < o; ++s) {
      n[s] = e[t++];
    }
    if (0 < (o = e[t++])) for (r = new Array(o), s = 0; s < o; ++s) {
      r[s] = e[t++];
    }
    var m = g.unpack(e, t, y);
    t += g.packedLength;
    var l = c.unpack(e, t, d),
        p = e[t += c.packedLength];
    return Q(i) ? (i._positions = a, i._minimumHeights = n, i._maximumHeights = r, i._ellipsoid = g.clone(m, i._ellipsoid), i._vertexFormat = c.clone(l, i._vertexFormat), i._granularity = p, i) : (w.positions = a, w.minimumHeights = n, w.maximumHeights = r, w.granularity = p, new v(w));
  }, v.fromConstantHeights = function (e) {
    var t = (e = u(e, u.EMPTY_OBJECT)).positions;
    if (!Q(t)) throw new h("options.positions is required.");
    var i = e.minimumHeight,
        n = e.maximumHeight,
        r = Q(i),
        o = Q(n);
    if (r || o) for (var a = t.length, s = r ? new Array(a) : void 0, m = o ? new Array(a) : void 0, l = 0; l < a; ++l) {
      r && (s[l] = i), o && (m[l] = n);
    }
    return new v({
      positions: t,
      maximumHeights: m,
      minimumHeights: s,
      ellipsoid: e.ellipsoid,
      vertexFormat: e.vertexFormat
    });
  }, v.createGeometry = function (e) {
    var t = e._positions,
        i = e._minimumHeights,
        n = e._maximumHeights,
        r = e._vertexFormat,
        o = e._granularity,
        a = e._ellipsoid,
        s = re.computePositions(a, t, n, i, o, !0);

    if (Q(s)) {
      for (var m = s.bottomPositions, l = s.topPositions, p = s.numCorners, u = l.length, h = 2 * u, g = r.position ? new Float64Array(h) : void 0, c = r.normal ? new Float32Array(h) : void 0, v = r.tangent ? new Float32Array(h) : void 0, y = r.bitangent ? new Float32Array(h) : void 0, d = r.st ? new Float32Array(h / 3 * 2) : void 0, w = 0, f = 0, A = 0, _ = 0, x = 0, H = he, b = ue, E = pe, F = !0, L = 0, k = 1 / ((u /= 3) - t.length + 1), T = 0; T < u; ++T) {
        var P,
            D,
            z,
            G,
            O,
            S = 3 * T,
            q = j.fromArray(l, S, oe),
            C = j.fromArray(m, S, ae);
        r.position && (g[w++] = C.x, g[w++] = C.y, g[w++] = C.z, g[w++] = q.x, g[w++] = q.y, g[w++] = q.z), r.st && (d[x++] = L, d[x++] = 0, d[x++] = L, d[x++] = 1), (r.normal || r.tangent || r.bitangent) && (D = j.clone(j.ZERO, le), z = a.scaleToGeodeticSurface(j.fromArray(l, S, ae), ae), T + 1 < u && (P = a.scaleToGeodeticSurface(j.fromArray(l, 3 + S, se), se), D = j.fromArray(l, 3 + S, le)), F && (G = j.subtract(D, q, me), O = j.subtract(z, q, oe), H = j.normalize(j.cross(O, G, H), H), F = !1), j.equalsEpsilon(P, z, ie.EPSILON10) ? F = !0 : (L += k, r.tangent && (b = j.normalize(j.subtract(P, z, b), b)), r.bitangent && (E = j.normalize(j.cross(H, b, E), E))), r.normal && (c[f++] = H.x, c[f++] = H.y, c[f++] = H.z, c[f++] = H.x, c[f++] = H.y, c[f++] = H.z), r.tangent && (v[_++] = b.x, v[_++] = b.y, v[_++] = b.z, v[_++] = b.x, v[_++] = b.y, v[_++] = b.z), r.bitangent && (y[A++] = E.x, y[A++] = E.y, y[A++] = E.z, y[A++] = E.x, y[A++] = E.y, y[A++] = E.z));
      }

      var I = new ee();
      r.position && (I.position = new $({
        componentDatatype: K.DOUBLE,
        componentsPerAttribute: 3,
        values: g
      })), r.normal && (I.normal = new $({
        componentDatatype: K.FLOAT,
        componentsPerAttribute: 3,
        values: c
      })), r.tangent && (I.tangent = new $({
        componentDatatype: K.FLOAT,
        componentsPerAttribute: 3,
        values: v
      })), r.bitangent && (I.bitangent = new $({
        componentDatatype: K.FLOAT,
        componentsPerAttribute: 3,
        values: y
      })), r.st && (I.st = new $({
        componentDatatype: K.FLOAT,
        componentsPerAttribute: 2,
        values: d
      }));
      var N = h / 3;
      h -= 6 * (p + 1);
      var R = te.createTypedArray(N, h),
          B = 0;

      for (T = 0; T < N - 2; T += 2) {
        var M,
            U,
            V = T,
            W = T + 2,
            J = j.fromArray(g, 3 * V, oe),
            Y = j.fromArray(g, 3 * W, ae);
        j.equalsEpsilon(J, Y, ie.EPSILON10) || (M = T + 1, U = T + 3, R[B++] = M, R[B++] = V, R[B++] = U, R[B++] = U, R[B++] = V, R[B++] = W);
      }

      return new X({
        attributes: I,
        indices: R,
        primitiveType: ne.TRIANGLES,
        boundingSphere: new Z.fromVertices(g)
      });
    }
  }, v;
});