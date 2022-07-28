"use strict";

define(["./BoundingSphere", "./Cartesian3", "./ComponentDatatype", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./IndexDatatype", "./Math", "./PrimitiveType", "./WallGeometryLibrary"], function (P, G, T, u, b, p, l, D, S, q, C, I, N, O) {
  "use strict";

  var B = new G(),
      R = new G();

  function g(i) {
    var e = (i = u(i, u.EMPTY_OBJECT)).positions,
        t = i.maximumHeights,
        r = i.minimumHeights;
    if (!b(e)) throw new p("options.positions is required.");
    if (b(t) && t.length !== e.length) throw new p("options.positions and options.maximumHeights must have the same length.");
    if (b(r) && r.length !== e.length) throw new p("options.positions and options.minimumHeights must have the same length.");
    var n = u(i.granularity, I.RADIANS_PER_DEGREE),
        o = u(i.ellipsoid, l.WGS84);
    this._positions = e, this._minimumHeights = r, this._maximumHeights = t, this._granularity = n, this._ellipsoid = l.clone(o), this._workerName = "createWallOutlineGeometry";
    var a = 1 + e.length * G.packedLength + 2;
    b(r) && (a += r.length), b(t) && (a += t.length), this.packedLength = a + l.packedLength + 1;
  }

  g.pack = function (i, e, t) {
    if (!b(i)) throw new p("value is required");
    if (!b(e)) throw new p("array is required");
    var r;
    t = u(t, 0);
    var n = i._positions,
        o = n.length;

    for (e[t++] = o, r = 0; r < o; ++r, t += G.packedLength) {
      G.pack(n[r], e, t);
    }

    var a = i._minimumHeights,
        o = b(a) ? a.length : 0;
    if (e[t++] = o, b(a)) for (r = 0; r < o; ++r) {
      e[t++] = a[r];
    }
    var s = i._maximumHeights;
    if (o = b(s) ? s.length : 0, e[t++] = o, b(s)) for (r = 0; r < o; ++r) {
      e[t++] = s[r];
    }
    return l.pack(i._ellipsoid, e, t), e[t += l.packedLength] = i._granularity, e;
  };

  var d = l.clone(l.UNIT_SPHERE),
      f = {
    positions: void 0,
    minimumHeights: void 0,
    maximumHeights: void 0,
    ellipsoid: d,
    granularity: void 0
  };
  return g.unpack = function (i, e, t) {
    if (!b(i)) throw new p("array is required");
    e = u(e, 0);

    for (var r, n, o = i[e++], a = new Array(o), s = 0; s < o; ++s, e += G.packedLength) {
      a[s] = G.unpack(i, e);
    }

    if (0 < (o = i[e++])) for (r = new Array(o), s = 0; s < o; ++s) {
      r[s] = i[e++];
    }
    if (0 < (o = i[e++])) for (n = new Array(o), s = 0; s < o; ++s) {
      n[s] = i[e++];
    }
    var m = l.unpack(i, e, d),
        h = i[e += l.packedLength];
    return b(t) ? (t._positions = a, t._minimumHeights = r, t._maximumHeights = n, t._ellipsoid = l.clone(m, t._ellipsoid), t._granularity = h, t) : (f.positions = a, f.minimumHeights = r, f.maximumHeights = n, f.granularity = h, new g(f));
  }, g.fromConstantHeights = function (i) {
    var e = (i = u(i, u.EMPTY_OBJECT)).positions;
    if (!b(e)) throw new p("options.positions is required.");
    var t = i.minimumHeight,
        r = i.maximumHeight,
        n = b(t),
        o = b(r);
    if (n || o) for (var a = e.length, s = n ? new Array(a) : void 0, m = o ? new Array(a) : void 0, h = 0; h < a; ++h) {
      n && (s[h] = t), o && (m[h] = r);
    }
    return new g({
      positions: e,
      maximumHeights: m,
      minimumHeights: s,
      ellipsoid: i.ellipsoid
    });
  }, g.createGeometry = function (i) {
    var e = i._positions,
        t = i._minimumHeights,
        r = i._maximumHeights,
        n = i._granularity,
        o = i._ellipsoid,
        a = O.computePositions(o, e, r, t, n, !1);

    if (b(a)) {
      var s = a.bottomPositions,
          m = a.topPositions,
          h = m.length,
          u = 2 * h,
          p = new Float64Array(u),
          l = 0;

      for (h /= 3, _ = 0; _ < h; ++_) {
        var g = 3 * _,
            d = G.fromArray(m, g, B),
            f = G.fromArray(s, g, R);
        p[l++] = f.x, p[l++] = f.y, p[l++] = f.z, p[l++] = d.x, p[l++] = d.y, p[l++] = d.z;
      }

      for (var y = new q({
        position: new S({
          componentDatatype: T.DOUBLE,
          componentsPerAttribute: 3,
          values: p
        })
      }), v = u / 3, u = 2 * v - 4 + v, c = C.createTypedArray(v, u), w = 0, _ = 0; _ < v - 2; _ += 2) {
        var H,
            A,
            E = _,
            k = _ + 2,
            x = G.fromArray(p, 3 * E, B),
            L = G.fromArray(p, 3 * k, R);
        G.equalsEpsilon(x, L, I.EPSILON10) || (H = _ + 1, A = _ + 3, c[w++] = H, c[w++] = E, c[w++] = H, c[w++] = A, c[w++] = E, c[w++] = k);
      }

      return c[w++] = v - 2, c[w++] = v - 1, new D({
        attributes: y,
        indices: c,
        primitiveType: N.LINES,
        boundingSphere: new P.fromVertices(p)
      });
    }
  }, g;
});