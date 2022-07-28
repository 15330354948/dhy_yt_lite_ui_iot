"use strict";

define(["./Cartesian2", "./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./DeveloperError", "./GeometryOffsetAttribute", "./GeometryType", "./Matrix2", "./Matrix3", "./Matrix4", "./PrimitiveType", "./Quaternion", "./Rectangle", "./Transforms"], function (O, P, M, a, e, o, u, t, r, S, _, F, i, B, G, Y) {
  "use strict";

  function n(t) {
    t = e(t, e.EMPTY_OBJECT), a.typeOf.object("options.attributes", t.attributes), this.attributes = t.attributes, this.indices = t.indices, this.primitiveType = e(t.primitiveType, i.TRIANGLES), this.boundingSphere = t.boundingSphere, this.geometryType = e(t.geometryType, r.NONE), this.boundingSphereCV = t.boundingSphereCV, this.offsetAttribute = t.offsetAttribute;
  }

  n.computeNumberOfVertices = function (t) {
    a.typeOf.object("geometry", t);
    var e = -1;

    for (var r in t.attributes) {
      if (t.attributes.hasOwnProperty(r) && o(t.attributes[r]) && o(t.attributes[r].values)) {
        var i = t.attributes[r],
            n = i.values.length / i.componentsPerAttribute;
        if (e !== n && -1 !== e) throw new u("All attribute lists must have the same number of attributes.");
        e = n;
      }
    }

    return e;
  };

  var k = new M(),
      R = new P(),
      j = new F(),
      Q = [new M(), new M(), new M()],
      U = [new O(), new O(), new O()],
      D = [new O(), new O(), new O()],
      J = new P(),
      L = new B(),
      Z = new F(),
      q = new S();
  return n._textureCoordinateRotationPoints = function (t, e, r, i) {
    var n = G.center(i, k),
        a = M.toCartesian(n, r, R),
        o = Y.eastNorthUpToFixedFrame(a, r, j),
        u = F.inverse(o, j),
        s = U,
        y = Q;
    y[0].longitude = i.west, y[0].latitude = i.south, y[1].longitude = i.west, y[1].latitude = i.north, y[2].longitude = i.east, y[2].latitude = i.south;

    for (var m = J, p = 0; p < 3; p++) {
      M.toCartesian(y[p], r, m), m = F.multiplyByPointAsVector(u, m, m), s[p].x = m.x, s[p].y = m.y;
    }

    var b = B.fromAxisAngle(P.UNIT_Z, -e, L),
        f = _.fromQuaternion(b, Z),
        h = t.length,
        l = Number.POSITIVE_INFINITY,
        c = Number.POSITIVE_INFINITY,
        w = Number.NEGATIVE_INFINITY,
        x = Number.NEGATIVE_INFINITY;

    for (p = 0; p < h; p++) {
      m = F.multiplyByPointAsVector(u, t[p], m), m = _.multiplyByVector(f, m, m), l = Math.min(l, m.x), c = Math.min(c, m.y), w = Math.max(w, m.x), x = Math.max(x, m.y);
    }

    var I = S.fromRotation(e, q),
        N = D;
    N[0].x = l, N[0].y = c, N[1].x = l, N[1].y = x, N[2].x = w, N[2].y = c;
    var T = s[0],
        v = s[2].x - T.x,
        d = s[1].y - T.y;

    for (p = 0; p < 3; p++) {
      var g = N[p];
      S.multiplyByVector(I, g, g), g.x = (g.x - T.x) / v, g.y = (g.y - T.y) / d;
    }

    var A = N[0],
        V = N[1],
        E = N[2],
        C = new Array(6);
    return O.pack(A, C), O.pack(V, C, 2), O.pack(E, C, 4), C;
  }, n;
});