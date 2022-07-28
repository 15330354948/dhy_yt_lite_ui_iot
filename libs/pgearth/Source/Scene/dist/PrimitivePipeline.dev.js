"use strict";

define(["../Core/BoundingSphere", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/DeveloperError", "../Core/Ellipsoid", "../Core/FeatureDetection", "../Core/GeographicProjection", "../Core/Geometry", "../Core/GeometryAttribute", "../Core/GeometryAttributes", "../Core/GeometryPipeline", "../Core/IndexDatatype", "../Core/Matrix4", "../Core/OffsetGeometryInstanceAttribute", "../Core/WebMercatorProjection"], function (S, G, b, C, k, f, e, m, w, A, O, x, V, D, h, d) {
  "use strict";

  if (!e.supportsTypedArrays()) return {};

  function P(e, t) {
    var r = e.attributes,
        n = r.position,
        o = n.values.length / n.componentsPerAttribute;
    r.batchId = new A({
      componentDatatype: G.FLOAT,
      componentsPerAttribute: 1,
      values: new Float32Array(o)
    });

    for (var i = r.batchId.values, a = 0; a < o; ++a) {
      i[a] = t;
    }
  }

  function v(e) {
    var t,
        r,
        n = e.instances,
        o = e.projection,
        i = e.elementIndexUintSupported,
        a = e.scene3DOnly,
        s = e.vertexCacheOptimize,
        c = e.compressVertices,
        p = e.modelMatrix,
        u = n.length;

    for (v = 0; v < u; ++v) {
      if (C(n[v].geometry)) {
        r = n[v].geometry.primitiveType;
        break;
      }
    }

    for (v = 1; v < u; ++v) {
      if (C(n[v].geometry) && n[v].geometry.primitiveType !== r) throw new k("All instance geometries must have the same primitiveType.");
    }

    if (!function (e, t, r) {
      var n = !r,
          o = e.length;
      if (!n && 1 < o) for (var i = e[0].modelMatrix, a = 1; a < o; ++a) {
        if (!D.equals(i, e[a].modelMatrix)) {
          n = !0;
          break;
        }
      }
      if (n) for (a = 0; a < o; ++a) {
        C(e[a].geometry) && x.transformToWorldCoordinates(e[a]);
      } else D.multiplyTransformation(t, e[0].modelMatrix, t);
    }(n, p, a), !a) for (v = 0; v < u; ++v) {
      C(n[v].geometry) && x.splitLongitude(n[v]);
    }
    if (!function (e) {
      for (var t = e.length, r = 0; r < t; ++r) {
        var n = e[r];
        C(n.geometry) ? P(n.geometry, r) : C(n.westHemisphereGeometry) && C(n.eastHemisphereGeometry) && (P(n.westHemisphereGeometry, r), P(n.eastHemisphereGeometry, r));
      }
    }(n), s) for (v = 0; v < u; ++v) {
      var f = n[v];
      C(f.geometry) ? (x.reorderForPostVertexCache(f.geometry), x.reorderForPreVertexCache(f.geometry)) : C(f.westHemisphereGeometry) && C(f.eastHemisphereGeometry) && (x.reorderForPostVertexCache(f.westHemisphereGeometry), x.reorderForPreVertexCache(f.westHemisphereGeometry), x.reorderForPostVertexCache(f.eastHemisphereGeometry), x.reorderForPreVertexCache(f.eastHemisphereGeometry));
    }
    var m = x.combineInstances(n);

    for (u = m.length, v = 0; v < u; ++v) {
      var h,
          d,
          l,
          g = (t = m[v]).attributes;
      if (a) for (h in g) {
        g.hasOwnProperty(h) && g[h].componentDatatype === G.DOUBLE && x.encodeAttribute(t, h, h + "3DHigh", h + "3DLow");
      } else for (h in g) {
        g.hasOwnProperty(h) && g[h].componentDatatype === G.DOUBLE && (d = h + "3D", l = h + "2D", x.projectTo2D(t, h, d, l, o), C(t.boundingSphere) && "position" === h && (t.boundingSphereCV = S.fromVertices(t.attributes.position2D.values)), x.encodeAttribute(t, d, d + "High", d + "Low"), x.encodeAttribute(t, l, l + "High", l + "Low"));
      }
      c && x.compressVertices(t);
    }

    if (!i) {
      for (var y = [], u = m.length, v = 0; v < u; ++v) {
        t = m[v], y = y.concat(x.fitToUnsignedShortIndices(t));
      }

      m = y;
    }

    return m;
  }

  function L(e, t, r, n) {
    var o,
        i,
        a,
        s,
        c = n.length - 1;
    s = 0 <= c ? (i = (o = n[c]).offset + o.count, r[a = o.index].indices.length) : r[a = i = 0].indices.length;

    for (var p = e.length, u = 0; u < p; ++u) {
      var f,
          m = e[u][t];
      C(m) && (s < i + (f = m.indices.length) && (i = 0, s = r[++a].indices.length), n.push({
        index: a,
        offset: i,
        count: f
      }), i += f);
    }
  }

  var l = {};

  function o(e, t) {
    for (var r = e.length, n = 0; n < r; ++n) {
      !function (e, t) {
        var r,
            n = e.attributes;

        for (var o in n) {
          n.hasOwnProperty(o) && (r = n[o], C(r) && C(r.values) && t.push(r.values.buffer));
        }

        C(e.indices) && t.push(e.indices.buffer);
      }(e[n], t);
    }
  }

  function i(e) {
    var t = e.length,
        r = 1 + (S.packedLength + 1) * t,
        n = new Float32Array(r),
        o = 0;
    n[o++] = t;

    for (var i = 0; i < t; ++i) {
      var a = e[i];
      C(a) ? (n[o++] = 1, S.pack(e[i], n, o)) : n[o++] = 0, o += S.packedLength;
    }

    return n;
  }

  function t(e) {
    for (var t = new Array(e[0]), r = 0, n = 1; n < e.length;) {
      1 === e[n++] && (t[r] = S.unpack(e, n)), ++r, n += S.packedLength;
    }

    return t;
  }

  return l.combineGeometry = function (e) {
    var t,
        r,
        n,
        o,
        i,
        a,
        s,
        c = e.instances,
        p = c.length,
        u = !1;
    0 < p && (0 < (t = v(e)).length && (r = x.createAttributeLocations(t[0]), e.createPickOffsets && (L(i = c, "geometry", a = t, s = []), L(i, "westHemisphereGeometry", a, s), L(i, "eastHemisphereGeometry", a, s), n = s)), C(c[0].attributes) && C(c[0].attributes.offset) && (o = new Array(p), u = !0));

    for (var f = new Array(p), m = new Array(p), h = 0; h < p; ++h) {
      var d = c[h],
          l = d.geometry;
      C(l) && (f[h] = l.boundingSphere, m[h] = l.boundingSphereCV, u && (o[h] = d.geometry.offsetAttribute));
      var g = d.eastHemisphereGeometry,
          y = d.westHemisphereGeometry;
      C(g) && C(y) && (C(g.boundingSphere) && C(y.boundingSphere) && (f[h] = S.union(g.boundingSphere, y.boundingSphere)), C(g.boundingSphereCV) && C(y.boundingSphereCV) && (m[h] = S.union(g.boundingSphereCV, y.boundingSphereCV)));
    }

    return {
      geometries: t,
      modelMatrix: e.modelMatrix,
      attributeLocations: r,
      pickOffsets: n,
      offsetInstanceExtend: o,
      boundingSpheres: f,
      boundingSpheresCV: m
    };
  }, l.packCreateGeometryResults = function (e, t) {
    var r = new Float64Array(function (e) {
      for (var t = 1, r = e.length, n = 0; n < r; n++) {
        var o = e[n];

        if (++t, C(o)) {
          var i = o.attributes;

          for (var a in t += 7 + 2 * S.packedLength + (C(o.indices) ? o.indices.length : 0), i) {
            i.hasOwnProperty(a) && C(i[a]) && (t += 5 + i[a].values.length);
          }
        }
      }

      return t;
    }(e)),
        n = [],
        o = {},
        i = e.length,
        a = 0;
    r[a++] = i;

    for (var s = 0; s < i; s++) {
      var c = e[s],
          p = C(c);

      if (r[a++] = p ? 1 : 0, p) {
        r[a++] = c.primitiveType, r[a++] = c.geometryType, r[a++] = b(c.offsetAttribute, -1);
        var u = C(c.boundingSphere) ? 1 : 0;
        (r[a++] = u) && S.pack(c.boundingSphere, r, a), a += S.packedLength;
        var f = C(c.boundingSphereCV) ? 1 : 0;
        (r[a++] = f) && S.pack(c.boundingSphereCV, r, a), a += S.packedLength;
        var m = c.attributes,
            h = [];

        for (var d in m) {
          m.hasOwnProperty(d) && C(m[d]) && (h.push(d), C(o[d]) || (o[d] = n.length, n.push(d)));
        }

        r[a++] = h.length;

        for (var l = 0; l < h.length; l++) {
          var g = h[l],
              y = m[g];
          r[a++] = o[g], r[a++] = y.componentDatatype, r[a++] = y.componentsPerAttribute, r[a++] = y.normalize ? 1 : 0, r[a++] = y.values.length, r.set(y.values, a), a += y.values.length;
        }

        var v = C(c.indices) ? c.indices.length : 0;
        0 < (r[a++] = v) && (r.set(c.indices, a), a += v);
      }
    }

    return t.push(r.buffer), {
      stringTable: n,
      packedData: r
    };
  }, l.unpackCreateGeometryResults = function (e) {
    for (var t = e.stringTable, r = e.packedData, n = new Array(r[0]), o = 0, i = 1; i < r.length;) {
      if (1 === r[i++]) {
        var a,
            s,
            c = r[i++],
            p = r[i++],
            u = r[i++];
        -1 === u && (u = void 0), 1 === r[i++] && (a = S.unpack(r, i)), i += S.packedLength, 1 === r[i++] && (s = S.unpack(r, i)), i += S.packedLength;
        var f = new O(),
            m = r[i++];

        for (x = 0; x < m; x++) {
          for (var h = t[r[i++]], d = r[i++], l = r[i++], g = 0 !== r[i++], y = r[i++], v = G.createTypedArray(d, y), b = 0; b < y; b++) {
            v[b] = r[i++];
          }

          f[h] = new A({
            componentDatatype: d,
            componentsPerAttribute: l,
            normalize: g,
            values: v
          });
        }

        if (0 < (y = r[i++])) for (var C = v.length / l, k = V.createTypedArray(C, y), x = 0; x < y; x++) {
          k[x] = r[i++];
        }
        n[o++] = new w({
          primitiveType: c,
          geometryType: p,
          boundingSphere: a,
          boundingSphereCV: s,
          indices: k,
          attributes: f,
          offsetAttribute: u
        });
      } else n[o++] = void 0;
    }

    return n;
  }, l.packCombineGeometryParameters = function (e, t) {
    for (var r = e.createGeometryResults, n = r.length, o = 0; o < n; o++) {
      t.push(r[o].packedData.buffer);
    }

    return {
      createGeometryResults: e.createGeometryResults,
      packedInstances: function (e, t) {
        var r = e.length,
            n = new Float64Array(1 + 19 * r),
            o = 0;
        n[o++] = r;

        for (var i = 0; i < r; i++) {
          var a,
              s = e[i];
          D.pack(s.modelMatrix, n, o), o += D.packedLength, C(s.attributes) && C(s.attributes.offset) && (a = s.attributes.offset.value, n[o] = a[0], n[o + 1] = a[1], n[o + 2] = a[2]), o += 3;
        }

        return t.push(n.buffer), n;
      }(e.instances, t),
      ellipsoid: e.ellipsoid,
      isGeographic: e.projection instanceof m,
      elementIndexUintSupported: e.elementIndexUintSupported,
      scene3DOnly: e.scene3DOnly,
      vertexCacheOptimize: e.vertexCacheOptimize,
      compressVertices: e.compressVertices,
      modelMatrix: e.modelMatrix,
      createPickOffsets: e.createPickOffsets
    };
  }, l.unpackCombineGeometryParameters = function (e) {
    for (var t = function (e) {
      for (var t = e, r = new Array(t[0]), n = 0, o = 1; o < t.length;) {
        var i,
            a = D.unpack(t, o);
        o += D.packedLength, C(t[o]) && (i = {
          offset: new h(t[o], t[o + 1], t[o + 2])
        }), o += 3, r[n++] = {
          modelMatrix: a,
          attributes: i
        };
      }

      return r;
    }(e.packedInstances), r = e.createGeometryResults, n = r.length, o = 0, i = 0; i < n; i++) {
      for (var a = l.unpackCreateGeometryResults(r[i]), s = a.length, c = 0; c < s; c++) {
        var p = a[c];
        t[o].geometry = p, ++o;
      }
    }

    var u = f.clone(e.ellipsoid);
    return {
      instances: t,
      ellipsoid: u,
      projection: new (e.isGeographic ? m : d)(u),
      elementIndexUintSupported: e.elementIndexUintSupported,
      scene3DOnly: e.scene3DOnly,
      vertexCacheOptimize: e.vertexCacheOptimize,
      compressVertices: e.compressVertices,
      modelMatrix: D.clone(e.modelMatrix),
      createPickOffsets: e.createPickOffsets
    };
  }, l.packCombineGeometryResults = function (e, t) {
    C(e.geometries) && o(e.geometries, t);
    var r = i(e.boundingSpheres),
        n = i(e.boundingSpheresCV);
    return t.push(r.buffer, n.buffer), {
      geometries: e.geometries,
      attributeLocations: e.attributeLocations,
      modelMatrix: e.modelMatrix,
      pickOffsets: e.pickOffsets,
      offsetInstanceExtend: e.offsetInstanceExtend,
      boundingSpheres: r,
      boundingSpheresCV: n
    };
  }, l.unpackCombineGeometryResults = function (e) {
    return {
      geometries: e.geometries,
      attributeLocations: e.attributeLocations,
      modelMatrix: e.modelMatrix,
      pickOffsets: e.pickOffsets,
      offsetInstanceExtend: e.offsetInstanceExtend,
      boundingSpheres: t(e.boundingSpheres),
      boundingSpheresCV: t(e.boundingSpheresCV)
    };
  }, l;
});