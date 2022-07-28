"use strict";

define(["./AttributeCompression", "./barycentricCoordinates", "./BoundingSphere", "./Cartesian2", "./Cartesian3", "./Cartesian4", "./Cartographic", "./ComponentDatatype", "./defaultValue", "./defined", "./DeveloperError", "./EncodedCartesian3", "./GeographicProjection", "./Geometry", "./GeometryAttribute", "./GeometryType", "./IndexDatatype", "./Intersect", "./IntersectionTests", "./Math", "./Matrix3", "./Matrix4", "./Plane", "./PrimitiveType", "./Tipsify"], function (x, N, O, M, _, U, e, G, v, H, C, y, m, E, F, i, I, n, Y, Z, a, L, o, k, s) {
  "use strict";

  var t = {};

  function u(e, t, r, i, n) {
    e[t++] = r, e[t++] = i, e[t++] = i, e[t++] = n, e[t++] = n, e[t] = r;
  }

  function f(e) {
    var t,
        r = {};

    for (var i in e) {
      e.hasOwnProperty(i) && H(e[i]) && H(e[i].values) && (t = e[i], r[i] = new F({
        componentDatatype: t.componentDatatype,
        componentsPerAttribute: t.componentsPerAttribute,
        normalize: t.normalize,
        values: []
      }));
    }

    return r;
  }

  t.toWireframe = function (e) {
    if (!H(e)) throw new C("geometry is required.");
    var t = e.indices;

    if (H(t)) {
      switch (e.primitiveType) {
        case k.TRIANGLES:
          e.indices = function (e) {
            for (var t = e.length, r = t / 3 * 6, i = I.createTypedArray(t, r), n = 0, a = 0; a < t; a += 3, n += 6) {
              u(i, n, e[a], e[a + 1], e[a + 2]);
            }

            return i;
          }(t);

          break;

        case k.TRIANGLE_STRIP:
          e.indices = function (e) {
            var t = e.length;

            if (3 <= t) {
              var r = 6 * (t - 2),
                  i = I.createTypedArray(t, r);
              u(i, 0, e[0], e[1], e[2]);

              for (var n = 6, a = 3; a < t; ++a, n += 6) {
                u(i, n, e[a - 1], e[a], e[a - 2]);
              }

              return i;
            }

            return new Uint16Array();
          }(t);

          break;

        case k.TRIANGLE_FAN:
          e.indices = function (e) {
            if (0 < e.length) {
              for (var t = e.length - 1, r = 6 * (t - 1), i = I.createTypedArray(t, r), n = e[0], a = 0, o = 1; o < t; ++o, a += 6) {
                u(i, a, n, e[o], e[o + 1]);
              }

              return i;
            }

            return new Uint16Array();
          }(t);

          break;

        default:
          throw new C("geometry.primitiveType must be TRIANGLES, TRIANGLE_STRIP, or TRIANGLE_FAN.");
      }

      e.primitiveType = k.LINES;
    }

    return e;
  }, t.createLineSegmentsForVectors = function (e, t, r) {
    if (t = v(t, "normal"), !H(e)) throw new C("geometry is required.");
    if (!H(e.attributes.position)) throw new C("geometry.attributes.position is required.");
    if (!H(e.attributes[t])) throw new C("geometry.attributes must have an attribute with the same name as the attributeName parameter, " + t + ".");
    r = v(r, 1e4);

    for (var i, n = e.attributes.position.values, a = e.attributes[t].values, o = n.length, s = new Float64Array(2 * o), u = 0, p = 0; p < o; p += 3) {
      s[u++] = n[p], s[u++] = n[p + 1], s[u++] = n[p + 2], s[u++] = n[p] + a[p] * r, s[u++] = n[p + 1] + a[p + 1] * r, s[u++] = n[p + 2] + a[p + 2] * r;
    }

    var l = e.boundingSphere;
    return H(l) && (i = new O(l.center, l.radius + r)), new E({
      attributes: {
        position: new F({
          componentDatatype: G.DOUBLE,
          componentsPerAttribute: 3,
          values: s
        })
      },
      primitiveType: k.LINES,
      boundingSphere: i
    });
  }, t.createAttributeLocations = function (e) {
    if (!H(e)) throw new C("geometry is required.");

    for (var t = ["position", "positionHigh", "positionLow", "position3DHigh", "position3DLow", "position2DHigh", "position2DLow", "pickColor", "normal", "st", "tangent", "bitangent", "extrudeDirection", "compressedAttributes"], r = e.attributes, i = {}, n = 0, a = t.length, o = 0; o < a; ++o) {
      var s = t[o];
      H(r[s]) && (i[s] = n++);
    }

    for (var u in r) {
      r.hasOwnProperty(u) && !H(i[u]) && (i[u] = n++);
    }

    return i;
  }, t.reorderForPreVertexCache = function (e) {
    if (!H(e)) throw new C("geometry is required.");
    var t = E.computeNumberOfVertices(e),
        r = e.indices;

    if (H(r)) {
      for (var i = new Int32Array(t), n = 0; n < t; n++) {
        i[n] = -1;
      }

      for (var a, o = r, s = o.length, u = I.createTypedArray(t, s), p = 0, l = 0, v = 0; p < s;) {
        -1 !== (a = i[o[p]]) ? u[l] = a : (i[a = o[p]] = v, u[l] = v, ++v), ++p, ++l;
      }

      e.indices = u;
      var y = e.attributes;

      for (var c in y) {
        if (y.hasOwnProperty(c) && H(y[c]) && H(y[c].values)) {
          for (var m = y[c], f = m.values, h = 0, d = m.componentsPerAttribute, b = G.createTypedArray(m.componentDatatype, v * d); h < t;) {
            var w = i[h];
            if (-1 !== w) for (var g = 0; g < d; g++) {
              b[d * w + g] = f[d * h + g];
            }
            ++h;
          }

          m.values = b;
        }
      }
    }

    return e;
  }, t.reorderForPostVertexCache = function (e, t) {
    if (!H(e)) throw new C("geometry is required.");
    var r = e.indices;

    if (e.primitiveType === k.TRIANGLES && H(r)) {
      for (var i = r.length, n = 0, a = 0; a < i; a++) {
        r[a] > n && (n = r[a]);
      }

      e.indices = s.tipsify({
        indices: r,
        maximumIndex: n,
        cacheSize: t
      });
    }

    return e;
  }, t.fitToUnsignedShortIndices = function (e) {
    if (!H(e)) throw new C("geometry is required.");
    if (H(e.indices) && e.primitiveType !== k.TRIANGLES && e.primitiveType !== k.LINES && e.primitiveType !== k.POINTS) throw new C("geometry.primitiveType must equal to PrimitiveType.TRIANGLES, PrimitiveType.LINES, or PrimitiveType.POINTS.");
    var t = [],
        r = E.computeNumberOfVertices(e);

    if (H(e.indices) && r >= Z.SIXTY_FOUR_KILOBYTES) {
      var i,
          n = [],
          a = [],
          o = 0,
          s = f(e.attributes),
          u = e.indices,
          p = u.length;
      e.primitiveType === k.TRIANGLES ? i = 3 : e.primitiveType === k.LINES ? i = 2 : e.primitiveType === k.POINTS && (i = 1);

      for (var l = 0; l < p; l += i) {
        for (var v = 0; v < i; ++v) {
          var y = u[l + v],
              c = n[y];
          H(c) || (c = o++, n[y] = c, function (e, t, r) {
            for (var i in t) {
              if (t.hasOwnProperty(i) && H(t[i]) && H(t[i].values)) for (var n = t[i], a = 0; a < n.componentsPerAttribute; ++a) {
                e[i].values.push(n.values[r * n.componentsPerAttribute + a]);
              }
            }
          }(s, e.attributes, y)), a.push(c);
        }

        o + i >= Z.SIXTY_FOUR_KILOBYTES && (t.push(new E({
          attributes: s,
          indices: a,
          primitiveType: e.primitiveType,
          boundingSphere: e.boundingSphere,
          boundingSphereCV: e.boundingSphereCV
        })), n = [], a = [], o = 0, s = f(e.attributes));
      }

      0 !== a.length && t.push(new E({
        attributes: s,
        indices: a,
        primitiveType: e.primitiveType,
        boundingSphere: e.boundingSphere,
        boundingSphereCV: e.boundingSphereCV
      }));
    } else t.push(e);

    return t;
  };
  var h = new _(),
      d = new e();

  t.projectTo2D = function (e, t, r, i, n) {
    if (!H(e)) throw new C("geometry is required.");
    if (!H(t)) throw new C("attributeName is required.");
    if (!H(r)) throw new C("attributeName3D is required.");
    if (!H(i)) throw new C("attributeName2D is required.");
    if (!H(e.attributes[t])) throw new C("geometry must have attribute matching the attributeName argument: " + t + ".");
    if (e.attributes[t].componentDatatype !== G.DOUBLE) throw new C("The attribute componentDatatype must be ComponentDatatype.DOUBLE.");

    for (var a = e.attributes[t], o = (n = H(n) ? n : new m()).ellipsoid, s = a.values, u = new Float64Array(s.length), p = 0, l = 0; l < s.length; l += 3) {
      var v = _.fromArray(s, l, h),
          y = o.cartesianToCartographic(v, d);

      if (!H(y)) throw new C("Could not project point (" + v.x + ", " + v.y + ", " + v.z + ") to 2D.");
      var c = n.project(y, h);
      u[p++] = c.x, u[p++] = c.y, u[p++] = c.z;
    }

    return e.attributes[r] = a, e.attributes[i] = new F({
      componentDatatype: G.DOUBLE,
      componentsPerAttribute: 3,
      values: u
    }), delete e.attributes[t], e;
  };

  var c = {
    high: 0,
    low: 0
  };

  t.encodeAttribute = function (e, t, r, i) {
    if (!H(e)) throw new C("geometry is required.");
    if (!H(t)) throw new C("attributeName is required.");
    if (!H(r)) throw new C("attributeHighName is required.");
    if (!H(i)) throw new C("attributeLowName is required.");
    if (!H(e.attributes[t])) throw new C("geometry must have attribute matching the attributeName argument: " + t + ".");
    if (e.attributes[t].componentDatatype !== G.DOUBLE) throw new C("The attribute componentDatatype must be ComponentDatatype.DOUBLE.");

    for (var n = e.attributes[t], a = n.values, o = a.length, s = new Float32Array(o), u = new Float32Array(o), p = 0; p < o; ++p) {
      y.encode(a[p], c), s[p] = c.high, u[p] = c.low;
    }

    var l = n.componentsPerAttribute;
    return e.attributes[r] = new F({
      componentDatatype: G.FLOAT,
      componentsPerAttribute: l,
      values: s
    }), e.attributes[i] = new F({
      componentDatatype: G.FLOAT,
      componentsPerAttribute: l,
      values: u
    }), delete e.attributes[t], e;
  };

  var p = new _();

  function l(e, t) {
    if (H(t)) for (var r = t.values, i = r.length, n = 0; n < i; n += 3) {
      _.unpack(r, n, p), L.multiplyByPoint(e, p, p), _.pack(p, r, n);
    }
  }

  function b(e, t) {
    if (H(t)) for (var r = t.values, i = r.length, n = 0; n < i; n += 3) {
      _.unpack(r, n, p), a.multiplyByVector(e, p, p), p = _.normalize(p, p), _.pack(p, r, n);
    }
  }

  var w = new L(),
      g = new a();

  t.transformToWorldCoordinates = function (e) {
    if (!H(e)) throw new C("instance is required.");
    var t = e.modelMatrix;
    if (L.equals(t, L.IDENTITY)) return e;
    var r = e.geometry.attributes;
    l(t, r.position), l(t, r.prevPosition), l(t, r.nextPosition), (H(r.normal) || H(r.tangent) || H(r.bitangent)) && (L.inverse(t, w), L.transpose(w, w), L.getRotation(w, g), b(g, r.normal), b(g, r.tangent), b(g, r.bitangent));
    var i = e.geometry.boundingSphere;
    return H(i) && (e.geometry.boundingSphere = O.transform(i, t, i)), e.modelMatrix = L.clone(L.IDENTITY), e;
  };

  var z = new _();

  function A(e, t) {
    var r,
        i,
        n = e.length,
        a = e[0].modelMatrix,
        o = H(e[0][t].indices),
        s = e[0][t].primitiveType;

    for (m = 1; m < n; ++m) {
      if (!L.equals(e[m].modelMatrix, a)) throw new C("All instances must have the same modelMatrix.");
      if (H(e[m][t].indices) !== o) throw new C("All instance geometries must have an indices or not have one.");
      if (e[m][t].primitiveType !== s) throw new C("All instance geometries must have the same primitiveType.");
    }

    var u,
        p,
        l,
        v,
        y = function (e, t) {
      var r,
          i = e.length,
          n = {},
          a = e[0][t].attributes;

      for (r in a) {
        if (a.hasOwnProperty(r) && H(a[r]) && H(a[r].values)) {
          for (var o = a[r], s = o.values.length, u = !0, p = 1; p < i; ++p) {
            var l = e[p][t].attributes[r];

            if (!H(l) || o.componentDatatype !== l.componentDatatype || o.componentsPerAttribute !== l.componentsPerAttribute || o.normalize !== l.normalize) {
              u = !1;
              break;
            }

            s += l.values.length;
          }

          u && (n[r] = new F({
            componentDatatype: o.componentDatatype,
            componentsPerAttribute: o.componentsPerAttribute,
            normalize: o.normalize,
            values: G.createTypedArray(o.componentDatatype, s)
          }));
        }
      }

      return n;
    }(e, t);

    for (r in y) {
      if (y.hasOwnProperty(r)) for (u = y[r].values, m = A = 0; m < n; ++m) {
        for (l = (p = e[m][t].attributes[r].values).length, i = 0; i < l; ++i) {
          u[A++] = p[i];
        }
      }
    }

    if (o) {
      for (var c = 0, m = 0; m < n; ++m) {
        c += e[m][t].indices.length;
      }

      var f = E.computeNumberOfVertices(new E({
        attributes: y,
        primitiveType: k.POINTS
      })),
          h = I.createTypedArray(f, c),
          d = 0,
          b = 0;

      for (m = 0; m < n; ++m) {
        for (var w = e[m][t].indices, g = w.length, A = 0; A < g; ++A) {
          h[d++] = b + w[A];
        }

        b += E.computeNumberOfVertices(e[m][t]);
      }

      v = h;
    }

    var T,
        P = new _(),
        x = 0;

    for (m = 0; m < n; ++m) {
      if (T = e[m][t].boundingSphere, !H(T)) {
        P = void 0;
        break;
      }

      _.add(T.center, P, P);
    }

    if (H(P)) for (_.divideByScalar(P, n, P), m = 0; m < n; ++m) {
      T = e[m][t].boundingSphere;
      var S = _.magnitude(_.subtract(T.center, P, z)) + T.radius;
      x < S && (x = S);
    }
    return new E({
      attributes: y,
      indices: v,
      primitiveType: s,
      boundingSphere: H(P) ? new O(P, x) : void 0
    });
  }

  t.combineInstances = function (e) {
    if (!H(e) || e.length < 1) throw new C("instances is required and must have length greater than zero.");

    for (var t = [], r = [], i = e.length, n = 0; n < i; ++n) {
      var a = e[n];
      H(a.geometry) ? t.push(a) : H(a.westHemisphereGeometry) && H(a.eastHemisphereGeometry) && r.push(a);
    }

    var o = [];
    return 0 < t.length && o.push(A(t, "geometry")), 0 < r.length && (o.push(A(r, "westHemisphereGeometry")), o.push(A(r, "eastHemisphereGeometry"))), o;
  };

  var T = new _(),
      P = new _(),
      S = new _(),
      D = new _();

  t.computeNormal = function (e) {
    if (!H(e)) throw new C("geometry is required.");
    if (!H(e.attributes.position) || !H(e.attributes.position.values)) throw new C("geometry.attributes.position.values is required.");
    if (!H(e.indices)) throw new C("geometry.indices is required.");
    if (e.indices.length < 2 || e.indices.length % 3 != 0) throw new C("geometry.indices length must be greater than 0 and be a multiple of 3.");
    if (e.primitiveType !== k.TRIANGLES) throw new C("geometry.primitiveType must be PrimitiveType.TRIANGLES.");

    for (var t = e.indices, r = e.attributes, i = r.position.values, n = r.position.values.length / 3, a = t.length, o = new Array(n), s = new Array(a / 3), u = new Array(a), p = 0; p < n; p++) {
      o[p] = {
        indexOffset: 0,
        count: 0,
        currentCount: 0
      };
    }

    var l = 0;

    for (p = 0; p < a; p += 3) {
      var v = t[p],
          y = t[p + 1],
          c = t[p + 2],
          m = 3 * v,
          f = 3 * y,
          h = 3 * c;
      P.x = i[m], P.y = i[1 + m], P.z = i[2 + m], S.x = i[f], S.y = i[1 + f], S.z = i[2 + f], D.x = i[h], D.y = i[1 + h], D.z = i[2 + h], o[v].count++, o[y].count++, o[c].count++, _.subtract(S, P, S), _.subtract(D, P, D), s[l] = _.cross(S, D, new _()), l++;
    }

    var d = 0;

    for (p = 0; p < n; p++) {
      o[p].indexOffset += d, d += o[p].count;
    }

    for (p = l = 0; p < a; p += 3) {
      var b = (A = o[t[p]]).indexOffset + A.currentCount;
      u[b] = l, A.currentCount++, u[b = (A = o[t[p + 1]]).indexOffset + A.currentCount] = l, A.currentCount++, u[b = (A = o[t[p + 2]]).indexOffset + A.currentCount] = l, A.currentCount++, l++;
    }

    var w = new Float32Array(3 * n);

    for (p = 0; p < n; p++) {
      var g = 3 * p,
          A = o[p];

      if (_.clone(_.ZERO, T), 0 < A.count) {
        for (l = 0; l < A.count; l++) {
          _.add(T, s[u[A.indexOffset + l]], T);
        }

        _.equalsEpsilon(_.ZERO, T, Z.EPSILON10) && _.clone(s[u[A.indexOffset]], T);
      }

      _.equalsEpsilon(_.ZERO, T, Z.EPSILON10) && (T.z = 1), _.normalize(T, T), w[g] = T.x, w[1 + g] = T.y, w[2 + g] = T.z;
    }

    return e.attributes.normal = new F({
      componentDatatype: G.FLOAT,
      componentsPerAttribute: 3,
      values: w
    }), e;
  };

  var B = new _(),
      V = new _(),
      W = new _();

  t.computeTangentAndBitangent = function (e) {
    if (!H(e)) throw new C("geometry is required.");
    var t = e.attributes,
        r = e.indices;
    if (!H(t.position) || !H(t.position.values)) throw new C("geometry.attributes.position.values is required.");
    if (!H(t.normal) || !H(t.normal.values)) throw new C("geometry.attributes.normal.values is required.");
    if (!H(t.st) || !H(t.st.values)) throw new C("geometry.attributes.st.values is required.");
    if (!H(r)) throw new C("geometry.indices is required.");
    if (r.length < 2 || r.length % 3 != 0) throw new C("geometry.indices length must be greater than 0 and be a multiple of 3.");
    if (e.primitiveType !== k.TRIANGLES) throw new C("geometry.primitiveType must be PrimitiveType.TRIANGLES.");

    for (var i = e.attributes.position.values, n = e.attributes.normal.values, a = e.attributes.st.values, o = e.attributes.position.values.length / 3, s = r.length, u = new Array(3 * o), p = 0; p < u.length; p++) {
      u[p] = 0;
    }

    for (p = 0; p < s; p += 3) {
      var l,
          v = r[p],
          y = r[p + 1],
          c = r[p + 2],
          m = 3 * y,
          f = 3 * c,
          h = 2 * v,
          d = 2 * y,
          b = 2 * c,
          w = i[l = 3 * v],
          g = i[l + 1],
          A = i[l + 2],
          T = a[h],
          P = a[1 + h],
          x = a[1 + d] - P,
          S = a[1 + b] - P,
          N = 1 / ((a[d] - T) * S - (a[b] - T) * x),
          O = (S * (i[m] - w) - x * (i[f] - w)) * N,
          E = (S * (i[m + 1] - g) - x * (i[f + 1] - g)) * N,
          I = (S * (i[m + 2] - A) - x * (i[f + 2] - A)) * N;
      u[l] += O, u[l + 1] += E, u[l + 2] += I, u[m] += O, u[m + 1] += E, u[m + 2] += I, u[f] += O, u[f + 1] += E, u[f + 2] += I;
    }

    var L = new Float32Array(3 * o),
        z = new Float32Array(3 * o);

    for (p = 0; p < o; p++) {
      m = (l = 3 * p) + 1, f = l + 2;

      var D = _.fromArray(n, l, B),
          q = _.fromArray(u, l, W),
          R = _.dot(D, q);

      _.multiplyByScalar(D, R, V), _.normalize(_.subtract(q, V, q), q), L[l] = q.x, L[m] = q.y, L[f] = q.z, _.normalize(_.cross(D, q, q), q), z[l] = q.x, z[m] = q.y, z[f] = q.z;
    }

    return e.attributes.tangent = new F({
      componentDatatype: G.FLOAT,
      componentsPerAttribute: 3,
      values: L
    }), e.attributes.bitangent = new F({
      componentDatatype: G.FLOAT,
      componentsPerAttribute: 3,
      values: z
    }), e;
  };

  var q = new M(),
      R = new _(),
      j = new _(),
      X = new _(),
      K = new M();

  function J(e) {
    switch (e.primitiveType) {
      case k.TRIANGLE_FAN:
        return function (e) {
          var t = E.computeNumberOfVertices(e);
          if (t < 3) throw new C("The number of vertices must be at least three.");
          var r = I.createTypedArray(t, 3 * (t - 2));
          r[0] = 1, r[1] = 0, r[2] = 2;

          for (var i = 3, n = 3; n < t; ++n) {
            r[i++] = n - 1, r[i++] = 0, r[i++] = n;
          }

          return e.indices = r, e.primitiveType = k.TRIANGLES, e;
        }(e);

      case k.TRIANGLE_STRIP:
        return function (e) {
          var t = E.computeNumberOfVertices(e);
          if (t < 3) throw new C("The number of vertices must be at least 3.");
          var r = I.createTypedArray(t, 3 * (t - 2));
          r[0] = 0, r[1] = 1, r[2] = 2, 3 < t && (r[3] = 0, r[4] = 2, r[5] = 3);

          for (var i = 6, n = 3; n < t - 1; n += 2) {
            r[i++] = n, r[i++] = n - 1, r[i++] = n + 1, n + 2 < t && (r[i++] = n, r[i++] = n + 1, r[i++] = n + 2);
          }

          return e.indices = r, e.primitiveType = k.TRIANGLES, e;
        }(e);

      case k.TRIANGLES:
        return function (e) {
          if (H(e.indices)) return e;
          var t = E.computeNumberOfVertices(e);
          if (t < 3) throw new C("The number of vertices must be at least three.");
          if (t % 3 != 0) throw new C("The number of vertices must be a multiple of three.");

          for (var r = I.createTypedArray(t, t), i = 0; i < t; ++i) {
            r[i] = i;
          }

          return e.indices = r, e;
        }(e);

      case k.LINE_STRIP:
        return function (e) {
          var t = E.computeNumberOfVertices(e);
          if (t < 2) throw new C("The number of vertices must be at least two.");
          var r = I.createTypedArray(t, 2 * (t - 1));
          r[0] = 0, r[1] = 1;

          for (var i = 2, n = 2; n < t; ++n) {
            r[i++] = n - 1, r[i++] = n;
          }

          return e.indices = r, e.primitiveType = k.LINES, e;
        }(e);

      case k.LINE_LOOP:
        return function (e) {
          var t = E.computeNumberOfVertices(e);
          if (t < 2) throw new C("The number of vertices must be at least two.");
          var r = I.createTypedArray(t, 2 * t);
          r[0] = 0, r[1] = 1;

          for (var i = 2, n = 2; n < t; ++n) {
            r[i++] = n - 1, r[i++] = n;
          }

          return r[i++] = t - 1, r[i] = 0, e.indices = r, e.primitiveType = k.LINES, e;
        }(e);

      case k.LINES:
        return function (e) {
          if (H(e.indices)) return e;
          var t = E.computeNumberOfVertices(e);
          if (t < 2) throw new C("The number of vertices must be at least two.");
          if (t % 2 != 0) throw new C("The number of vertices must be a multiple of 2.");

          for (var r = I.createTypedArray(t, t), i = 0; i < t; ++i) {
            r[i] = i;
          }

          return e.indices = r, e;
        }(e);
    }

    return e;
  }

  function Q(e, t) {
    Math.abs(e.y) < Z.EPSILON6 && (e.y = t ? -Z.EPSILON6 : Z.EPSILON6);
  }

  t.compressVertices = function (e) {
    if (!H(e)) throw new C("geometry is required.");
    var t = e.attributes.extrudeDirection;

    if (H(t)) {
      for (var r = t.values, i = r.length / 3, n = new Float32Array(2 * i), a = 0, o = 0; o < i; ++o) {
        _.fromArray(r, 3 * o, R), _.equals(R, _.ZERO) ? a += 2 : (K = x.octEncodeInRange(R, 65535, K), n[a++] = K.x, n[a++] = K.y);
      }

      return e.attributes.compressedAttributes = new F({
        componentDatatype: G.FLOAT,
        componentsPerAttribute: 2,
        values: n
      }), delete e.attributes.extrudeDirection, e;
    }

    var s = e.attributes.normal,
        u = e.attributes.st,
        p = H(s),
        l = H(u);
    if (!p && !l) return e;
    var v,
        y,
        c,
        m,
        f = e.attributes.tangent,
        h = e.attributes.bitangent,
        d = H(f),
        b = H(h);
    p && (v = s.values), l && (y = u.values), d && (c = f.values), b && (m = h.values);
    var w = i = (p ? v.length : y.length) / (p ? 3 : 2),
        g = l && p ? 2 : 1;
    w *= g += d || b ? 1 : 0;
    var A = new Float32Array(w),
        T = 0;

    for (o = 0; o < i; ++o) {
      l && (M.fromArray(y, 2 * o, q), A[T++] = x.compressTextureCoordinates(q));
      var P = 3 * o;
      p && H(c) && H(m) ? (_.fromArray(v, P, R), _.fromArray(c, P, j), _.fromArray(m, P, X), x.octPack(R, j, X, q), A[T++] = q.x, A[T++] = q.y) : (p && (_.fromArray(v, P, R), A[T++] = x.octEncodeFloat(R)), d && (_.fromArray(c, P, R), A[T++] = x.octEncodeFloat(R)), b && (_.fromArray(m, P, R), A[T++] = x.octEncodeFloat(R)));
    }

    return e.attributes.compressedAttributes = new F({
      componentDatatype: G.FLOAT,
      componentsPerAttribute: g,
      values: A
    }), p && delete e.attributes.normal, l && delete e.attributes.st, b && delete e.attributes.bitangent, d && delete e.attributes.tangent, e;
  };

  var $ = new _();

  function ee(e, t, r, i) {
    _.add(e, _.multiplyByScalar(_.subtract(t, e, $), e.y / (e.y - t.y), $), r), _.clone(r, i), Q(r, !0), Q(i, !1);
  }

  var te = new _(),
      re = new _(),
      ie = new _(),
      ne = new _(),
      ae = {
    positions: new Array(7),
    indices: new Array(9)
  };

  function oe(e, t, r) {
    if (!(0 <= e.x || 0 <= t.x || 0 <= r.x)) {
      !function (e, t, r) {
        if (0 !== e.y && 0 !== t.y && 0 !== r.y) return Q(e, e.y < 0), Q(t, t.y < 0), Q(r, r.y < 0);
        var i = Math.abs(e.y),
            n = Math.abs(t.y),
            a = Math.abs(r.y),
            o = n < i ? a < i ? Z.sign(e.y) : Z.sign(r.y) : a < n ? Z.sign(t.y) : Z.sign(r.y),
            s = o < 0;
        Q(e, s), Q(t, s), Q(r, s);
      }(e, t, r);
      var i = e.y < 0,
          n = t.y < 0,
          a = r.y < 0,
          o = 0;
      o += i ? 1 : 0, o += n ? 1 : 0, o += a ? 1 : 0;
      var s = ae.indices;
      1 == o ? (s[1] = 3, s[2] = 4, s[5] = 6, s[7] = 6, s[8] = 5, i ? (ee(e, t, te, ie), ee(e, r, re, ne), s[0] = 0, s[3] = 1, s[4] = 2, s[6] = 1) : n ? (ee(t, r, te, ie), ee(t, e, re, ne), s[0] = 1, s[3] = 2, s[4] = 0, s[6] = 2) : a && (ee(r, e, te, ie), ee(r, t, re, ne), s[0] = 2, s[3] = 0, s[4] = 1, s[6] = 0)) : 2 == o && (s[2] = 4, s[4] = 4, s[5] = 3, s[7] = 5, s[8] = 6, i ? n ? a || (ee(r, e, te, ie), ee(r, t, re, ne), s[0] = 0, s[1] = 1, s[3] = 0, s[6] = 2) : (ee(t, r, te, ie), ee(t, e, re, ne), s[0] = 2, s[1] = 0, s[3] = 2, s[6] = 1) : (ee(e, t, te, ie), ee(e, r, re, ne), s[0] = 1, s[1] = 2, s[3] = 1, s[6] = 0));
      var u = ae.positions;
      return u[0] = e, u[1] = t, u[2] = r, u.length = 3, 1 != o && 2 != o || (u[3] = te, u[4] = re, u[5] = ie, u[6] = ne, u.length = 7), ae;
    }
  }

  function se(e, t) {
    var r,
        i = e.attributes;

    if (0 !== i.position.values.length) {
      for (var n in i) {
        i.hasOwnProperty(n) && H(i[n]) && H(i[n].values) && ((r = i[n]).values = G.createTypedArray(r.componentDatatype, r.values));
      }

      var a = E.computeNumberOfVertices(e);
      return e.indices = I.createTypedArray(a, e.indices), t && (e.boundingSphere = O.fromVertices(i.position.values)), e;
    }
  }

  function ue(e) {
    var t,
        r = e.attributes,
        i = {};

    for (var n in r) {
      r.hasOwnProperty(n) && H(r[n]) && H(r[n].values) && (t = r[n], i[n] = new F({
        componentDatatype: t.componentDatatype,
        componentsPerAttribute: t.componentsPerAttribute,
        normalize: t.normalize,
        values: []
      }));
    }

    return new E({
      attributes: i,
      indices: [],
      primitiveType: e.primitiveType
    });
  }

  function pe(e, t, r) {
    var i = H(e.geometry.boundingSphere);
    t = se(t, i), r = se(r, i), H(r) && !H(t) ? e.geometry = r : !H(r) && H(t) ? e.geometry = t : (e.westHemisphereGeometry = t, e.eastHemisphereGeometry = r, e.geometry = void 0);
  }

  function r(y, c) {
    var m = new y(),
        f = new y(),
        h = new y();
    return function (e, t, r, i, n, a, o, s) {
      var u = y.fromArray(n, e * c, m),
          p = y.fromArray(n, t * c, f),
          l = y.fromArray(n, r * c, h);
      y.multiplyByScalar(u, i.x, u), y.multiplyByScalar(p, i.y, p), y.multiplyByScalar(l, i.z, l);
      var v = y.add(u, p, u);
      y.add(v, l, v), s && y.normalize(v, v), y.pack(v, a, o * c);
    };
  }

  var le = r(U, 4),
      ve = r(_, 3),
      ye = r(M, 2),
      ce = function ce(e, t, r, i, n, a, o) {
    var s = n[e] * i.x,
        u = n[t] * i.y,
        p = n[r] * i.z;
    a[o] = s + u + p > Z.EPSILON6 ? 1 : 0;
  },
      me = new _(),
      fe = new _(),
      he = new _(),
      de = new _();

  function be(e, t, r, i, n, a, o, s, u, p, l, v, y, c, m, f) {
    if (H(a) || H(o) || H(s) || H(u) || H(p) || 0 !== c) {
      var h,
          d,
          b,
          w,
          g = _.fromArray(n, 3 * e, me),
          A = _.fromArray(n, 3 * t, fe),
          T = _.fromArray(n, 3 * r, he),
          P = N(i, g, A, T, de);

      if (H(a) && ve(e, t, r, P, a, v.normal.values, f, !0), H(p) && (h = _.fromArray(p, 3 * e, me), d = _.fromArray(p, 3 * t, fe), b = _.fromArray(p, 3 * r, he), _.multiplyByScalar(h, P.x, h), _.multiplyByScalar(d, P.y, d), _.multiplyByScalar(b, P.z, b), _.equals(h, _.ZERO) && _.equals(d, _.ZERO) && _.equals(b, _.ZERO) ? ((w = me).x = 0, w.y = 0, w.z = 0) : (w = _.add(h, d, h), _.add(w, b, w), _.normalize(w, w)), _.pack(w, v.extrudeDirection.values, 3 * f)), H(l) && ce(e, t, r, P, l, v.applyOffset.values, f), H(o) && ve(e, t, r, P, o, v.tangent.values, f, !0), H(s) && ve(e, t, r, P, s, v.bitangent.values, f, !0), H(u) && ye(e, t, r, P, u, v.st.values, f), 0 < c) for (var x = 0; x < c; x++) {
        var S = y[x];
        !function (e, t, r, i, n, a, o) {
          var s = a.componentsPerAttribute,
              u = a.values,
              p = o.values;

          switch (s) {
            case 4:
              le(e, t, r, i, u, p, n, !1);
              break;

            case 3:
              ve(e, t, r, i, u, p, n, !1);
              break;

            case 2:
              ye(e, t, r, i, u, p, n, !1);
              break;

            default:
              p[n] = u[e] * i.x + u[t] * i.y + u[r] * i.z;
          }
        }(e, t, r, P, f, m[S], v[S]);
      }
    }
  }

  function we(e, t, r, i, n, a) {
    var o = e.position.values.length / 3;
    if (-1 === n) return e.position.values.push(a.x, a.y, a.z), t.push(o), o;
    var s = i[n],
        u = r[s];
    return -1 === u ? (r[s] = o, e.position.values.push(a.x, a.y, a.z), t.push(o), o) : (t.push(u), u);
  }

  var ge = {
    position: !0,
    normal: !0,
    bitangent: !0,
    tangent: !0,
    st: !0,
    extrudeDirection: !0,
    applyOffset: !0
  };

  function Ae(e) {
    var t = e.geometry,
        r = t.attributes,
        i = r.position.values,
        n = H(r.normal) ? r.normal.values : void 0,
        a = H(r.bitangent) ? r.bitangent.values : void 0,
        o = H(r.tangent) ? r.tangent.values : void 0,
        s = H(r.st) ? r.st.values : void 0,
        u = H(r.extrudeDirection) ? r.extrudeDirection.values : void 0,
        p = H(r.applyOffset) ? r.applyOffset.values : void 0,
        l = t.indices,
        v = [];

    for (var y in r) {
      r.hasOwnProperty(y) && !ge[y] && H(r[y]) && v.push(y);
    }

    var c,
        m,
        f = v.length,
        h = ue(t),
        d = ue(t),
        b = [];
    b.length = i.length / 3;
    var w = [];

    for (w.length = i.length / 3, A = 0; A < b.length; ++A) {
      b[A] = -1, w[A] = -1;
    }

    for (var g = l.length, A = 0; A < g; A += 3) {
      var T = l[A],
          P = l[A + 1],
          x = l[A + 2],
          S = _.fromArray(i, 3 * T),
          N = _.fromArray(i, 3 * P),
          O = _.fromArray(i, 3 * x),
          E = oe(S, N, O);

      if (H(E) && 3 < E.positions.length) for (var I = E.positions, L = E.indices, z = L.length, D = 0; D < z; ++D) {
        var q = L[D],
            R = I[q],
            G = R.y < 0 ? (c = d.attributes, m = d.indices, b) : (c = h.attributes, m = h.indices, w);
        be(T, P, x, R, i, n, o, a, s, u, p, c, v, f, r, we(c, m, G, l, q < 3 ? A + q : -1, R));
      } else H(E) && (S = E.positions[0], N = E.positions[1], O = E.positions[2]), G = S.y < 0 ? (c = d.attributes, m = d.indices, b) : (c = h.attributes, m = h.indices, w), be(T, P, x, S, i, n, o, a, s, u, p, c, v, f, r, we(c, m, G, l, A, S)), be(T, P, x, N, i, n, o, a, s, u, p, c, v, f, r, we(c, m, G, l, A + 1, N)), be(T, P, x, O, i, n, o, a, s, u, p, c, v, f, r, we(c, m, G, l, A + 2, O));
    }

    pe(e, d, h);
  }

  var Te = o.fromPointNormal(_.ZERO, _.UNIT_Y),
      Pe = new _(),
      xe = new _();

  function Se(e, t, r, i, n, a, o) {
    var s;
    H(o) && (s = _.fromArray(i, 3 * e, me), _.equalsEpsilon(s, r, Z.EPSILON10) ? a.applyOffset.values[n] = o[e] : a.applyOffset.values[n] = o[t]);
  }

  function Ne(e) {
    var t,
        r = e.geometry,
        i = r.attributes,
        n = i.position.values,
        a = H(i.applyOffset) ? i.applyOffset.values : void 0,
        o = r.indices,
        s = ue(r),
        u = ue(r),
        p = o.length,
        l = [];
    l.length = n.length / 3;
    var v = [];

    for (v.length = n.length / 3, t = 0; t < l.length; ++t) {
      l[t] = -1, v[t] = -1;
    }

    for (t = 0; t < p; t += 2) {
      var y = o[t],
          c = o[t + 1],
          m = _.fromArray(n, 3 * y, me),
          f = _.fromArray(n, 3 * c, fe);

      Math.abs(m.y) < Z.EPSILON6 && (m.y < 0 ? m.y = -Z.EPSILON6 : m.y = Z.EPSILON6), Math.abs(f.y) < Z.EPSILON6 && (f.y < 0 ? f.y = -Z.EPSILON6 : f.y = Z.EPSILON6);
      var h,
          d,
          b,
          w,
          g,
          A = s.attributes,
          T = s.indices,
          P = v,
          x = u.attributes,
          S = u.indices,
          N = l,
          O = Y.lineSegmentPlane(m, f, Te, he);
      H(O) ? (h = _.multiplyByScalar(_.UNIT_Y, 5 * Z.EPSILON9, Pe), m.y < 0 && (_.negate(h, h), A = u.attributes, T = u.indices, P = l, x = s.attributes, S = s.indices, N = v), d = _.add(O, h, xe), Se(y, c, m, n, we(A, T, P, o, t, m), A, a), Se(y, c, d, n, we(A, T, P, o, -1, d), A, a), _.negate(h, h), _.add(O, h, d), Se(y, c, d, n, we(x, S, N, o, -1, d), x, a), Se(y, c, f, n, we(x, S, N, o, t + 1, f), x, a)) : (g = m.y < 0 ? (b = u.attributes, w = u.indices, l) : (b = s.attributes, w = s.indices, v), Se(y, c, m, n, we(b, w, g, o, t, m), b, a), Se(y, c, f, n, we(b, w, g, o, t + 1, f), b, a));
    }

    pe(e, u, s);
  }

  var Oe = new M(),
      Ee = new M(),
      Ie = new _(),
      Le = new _(),
      ze = new _(),
      De = new _(),
      qe = new _(),
      Re = new _(),
      Ge = new U();

  function Ce(e) {
    for (var t = e.attributes, r = t.position.values, i = t.prevPosition.values, n = t.nextPosition.values, a = r.length, o = 0; o < a; o += 3) {
      var s,
          u,
          p = _.unpack(r, o, Ie);

      0 < p.x || (s = _.unpack(i, o, Le), (p.y < 0 && 0 < s.y || 0 < p.y && s.y < 0) && (0 < o - 3 ? (i[o] = r[o - 3], i[o + 1] = r[o - 2], i[o + 2] = r[o - 1]) : _.pack(p, i, o)), u = _.unpack(n, o, ze), (p.y < 0 && 0 < u.y || 0 < p.y && u.y < 0) && (o + 3 < a ? (n[o] = r[o + 3], n[o + 1] = r[o + 4], n[o + 2] = r[o + 5]) : _.pack(p, n, o)));
    }
  }

  var Fe = 5 * Z.EPSILON9,
      ke = Z.EPSILON6;
  return t.splitLongitude = function (e) {
    if (!H(e)) throw new C("instance is required.");
    var t = e.geometry,
        r = t.boundingSphere;
    if (H(r) && (0 < r.center.x - r.radius || O.intersectPlane(r, o.ORIGIN_ZX_PLANE) !== n.INTERSECTING)) return e;
    if (t.geometryType !== i.NONE) switch (t.geometryType) {
      case i.POLYLINES:
        !function (e) {
          for (var t, r = e.geometry, i = r.attributes, n = i.position.values, a = i.prevPosition.values, o = i.nextPosition.values, s = i.expandAndWidth.values, u = H(i.st) ? i.st.values : void 0, p = H(i.color) ? i.color.values : void 0, l = ue(r), v = ue(r), y = !1, c = n.length / 3, m = 0; m < c; m += 4) {
            var f = m,
                h = m + 2,
                d = _.fromArray(n, 3 * f, Ie),
                b = _.fromArray(n, 3 * h, Le);

            if (Math.abs(d.y) < ke) for (d.y = ke * (b.y < 0 ? -1 : 1), n[3 * m + 1] = d.y, n[3 * (m + 1) + 1] = d.y, G = 3 * f; G < 3 * f + 12; G += 3) {
              a[G] = n[3 * m], a[G + 1] = n[3 * m + 1], a[G + 2] = n[3 * m + 2];
            }
            if (Math.abs(b.y) < ke) for (b.y = ke * (d.y < 0 ? -1 : 1), n[3 * (m + 2) + 1] = b.y, n[3 * (m + 3) + 1] = b.y, G = 3 * f; G < 3 * f + 12; G += 3) {
              o[G] = n[3 * (m + 2)], o[G + 1] = n[3 * (m + 2) + 1], o[G + 2] = n[3 * (m + 2) + 2];
            }
            var w = l.attributes,
                g = l.indices,
                A = v.attributes,
                T = v.indices,
                P = Y.lineSegmentPlane(d, b, Te, De);

            if (H(P)) {
              y = !0;

              var x = _.multiplyByScalar(_.UNIT_Y, Fe, qe);

              d.y < 0 && (_.negate(x, x), w = v.attributes, g = v.indices, A = l.attributes, T = l.indices);

              var S = _.add(P, x, Re);

              w.position.values.push(d.x, d.y, d.z, d.x, d.y, d.z), w.position.values.push(S.x, S.y, S.z), w.position.values.push(S.x, S.y, S.z), w.prevPosition.values.push(a[3 * f], a[3 * f + 1], a[3 * f + 2]), w.prevPosition.values.push(a[3 * f + 3], a[3 * f + 4], a[3 * f + 5]), w.prevPosition.values.push(d.x, d.y, d.z, d.x, d.y, d.z), w.nextPosition.values.push(S.x, S.y, S.z), w.nextPosition.values.push(S.x, S.y, S.z), w.nextPosition.values.push(S.x, S.y, S.z), w.nextPosition.values.push(S.x, S.y, S.z), _.negate(x, x), _.add(P, x, S), A.position.values.push(S.x, S.y, S.z), A.position.values.push(S.x, S.y, S.z), A.position.values.push(b.x, b.y, b.z, b.x, b.y, b.z), A.prevPosition.values.push(S.x, S.y, S.z), A.prevPosition.values.push(S.x, S.y, S.z), A.prevPosition.values.push(S.x, S.y, S.z), A.prevPosition.values.push(S.x, S.y, S.z), A.nextPosition.values.push(b.x, b.y, b.z, b.x, b.y, b.z), A.nextPosition.values.push(o[3 * h], o[3 * h + 1], o[3 * h + 2]), A.nextPosition.values.push(o[3 * h + 3], o[3 * h + 4], o[3 * h + 5]);
              var N = M.fromArray(s, 2 * f, Oe),
                  O = Math.abs(N.y);
              w.expandAndWidth.values.push(-1, O, 1, O), w.expandAndWidth.values.push(-1, -O, 1, -O), A.expandAndWidth.values.push(-1, O, 1, O), A.expandAndWidth.values.push(-1, -O, 1, -O);

              var E = _.magnitudeSquared(_.subtract(P, d, ze));

              if (E /= _.magnitudeSquared(_.subtract(b, d, ze)), H(p)) {
                for (var I = U.fromArray(p, 4 * f, Ge), L = U.fromArray(p, 4 * h, Ge), z = Z.lerp(I.x, L.x, E), D = Z.lerp(I.y, L.y, E), q = Z.lerp(I.z, L.z, E), R = Z.lerp(I.w, L.w, E), G = 4 * f; G < 4 * f + 8; ++G) {
                  w.color.values.push(p[G]);
                }

                for (w.color.values.push(z, D, q, R), w.color.values.push(z, D, q, R), A.color.values.push(z, D, q, R), A.color.values.push(z, D, q, R), G = 4 * h; G < 4 * h + 8; ++G) {
                  A.color.values.push(p[G]);
                }
              }

              if (H(u)) {
                var C = M.fromArray(u, 2 * f, Oe),
                    F = M.fromArray(u, 2 * (m + 3), Ee),
                    k = Z.lerp(C.x, F.x, E);

                for (G = 2 * f; G < 2 * f + 4; ++G) {
                  w.st.values.push(u[G]);
                }

                for (w.st.values.push(k, C.y), w.st.values.push(k, F.y), A.st.values.push(k, C.y), A.st.values.push(k, F.y), G = 2 * h; G < 2 * h + 4; ++G) {
                  A.st.values.push(u[G]);
                }
              }

              t = w.position.values.length / 3 - 4, g.push(t, t + 2, t + 1), g.push(t + 1, t + 2, t + 3), t = A.position.values.length / 3 - 4, T.push(t, t + 2, t + 1), T.push(t + 1, t + 2, t + 3);
            } else {
              var B,
                  V = d.y < 0 ? (B = v.attributes, v.indices) : (B = l.attributes, l.indices);

              for (B.position.values.push(d.x, d.y, d.z), B.position.values.push(d.x, d.y, d.z), B.position.values.push(b.x, b.y, b.z), B.position.values.push(b.x, b.y, b.z), G = 3 * m; G < 3 * m + 12; ++G) {
                B.prevPosition.values.push(a[G]), B.nextPosition.values.push(o[G]);
              }

              for (G = 2 * m; G < 2 * m + 8; ++G) {
                B.expandAndWidth.values.push(s[G]), H(u) && B.st.values.push(u[G]);
              }

              if (H(p)) for (G = 4 * m; G < 4 * m + 16; ++G) {
                B.color.values.push(p[G]);
              }
              t = B.position.values.length / 3 - 4, V.push(t, t + 2, t + 1), V.push(t + 1, t + 2, t + 3);
            }
          }

          y && (Ce(v), Ce(l)), pe(e, v, l);
        }(e);
        break;

      case i.TRIANGLES:
        Ae(e);
        break;

      case i.LINES:
        Ne(e);
    } else J(t), t.primitiveType === k.TRIANGLES ? Ae(e) : t.primitiveType === k.LINES && Ne(e);
    return e;
  }, t;
});