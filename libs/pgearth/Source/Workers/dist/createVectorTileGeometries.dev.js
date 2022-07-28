"use strict";

define(["../Core/BoundingSphere", "../Core/BoxGeometry", "../Core/Cartesian3", "../Core/Color", "../Core/CylinderGeometry", "../Core/defined", "../Core/EllipsoidGeometry", "../Core/IndexDatatype", "../Core/Matrix4", "../Scene/Vector3DTileBatch", "./createTaskProcessorWorker"], function (V, P, q, F, D, _, N, W, Y, S, e) {
  "use strict";

  var d = new q(),
      o = Y.packedLength + q.packedLength,
      c = Y.packedLength + 2,
      s = Y.packedLength + q.packedLength,
      l = q.packedLength + 1,
      u = {
    modelMatrix: new Y(),
    boundingVolume: new V()
  };

  function j(e, n) {
    var t = n * o,
        r = q.unpack(e, t, d);
    t += q.packedLength;
    var a = Y.unpack(e, t, u.modelMatrix);
    Y.multiplyByScale(a, r, a);
    var i = u.boundingVolume;
    return q.clone(q.ZERO, i.center), i.radius = Math.sqrt(3), u;
  }

  function z(e, n) {
    var t = n * c,
        r = e[t++],
        a = e[t++],
        i = q.fromElements(r, r, a, d),
        o = Y.unpack(e, t, u.modelMatrix);
    Y.multiplyByScale(o, i, o);
    var s = u.boundingVolume;
    return q.clone(q.ZERO, s.center), s.radius = Math.sqrt(2), u;
  }

  function H(e, n) {
    var t = n * s,
        r = q.unpack(e, t, d);
    t += q.packedLength;
    var a = Y.unpack(e, t, u.modelMatrix);
    Y.multiplyByScale(a, r, a);
    var i = u.boundingVolume;
    return q.clone(q.ZERO, i.center), i.radius = 1, u;
  }

  function J(e, n) {
    var t = n * l,
        r = e[t++],
        a = q.unpack(e, t, d),
        i = Y.fromTranslation(a, u.modelMatrix);
    Y.multiplyByUniformScale(i, r, i);
    var o = u.boundingVolume;
    return q.clone(q.ZERO, o.center), o.radius = 1, u;
  }

  var R = new q();

  function K(e, n, t, r, a) {
    if (_(n)) {
      for (var i = t.length, o = r.attributes.position.values, s = r.indices, d = e.positions, c = e.vertexBatchIds, l = e.indices, u = e.batchIds, f = e.batchTableColors, h = e.batchedIndices, p = e.indexOffsets, b = e.indexCounts, v = e.boundingVolumes, g = e.modelMatrix, y = e.center, m = e.positionOffset, x = e.batchIdIndex, k = e.indexOffset, I = e.batchedIndicesOffset, w = 0; w < i; ++w) {
        var B = a(n, w),
            A = B.modelMatrix;
        Y.multiply(g, A, A);

        for (var C = t[w], O = o.length, L = 0; L < O; L += 3) {
          var U = q.unpack(o, L, R);
          Y.multiplyByPoint(A, U, U), q.subtract(U, y, U), q.pack(U, d, 3 * m + L), c[x++] = C;
        }

        for (var E = s.length, M = 0; M < E; ++M) {
          l[k + M] = s[M] + m;
        }

        var T = w + I;
        h[T] = new S({
          offset: k,
          count: E,
          color: F.fromRgba(f[C]),
          batchIds: [C]
        }), u[T] = C, p[T] = k, b[T] = E, v[T] = V.transform(B.boundingVolume, A), m += O / 3, k += E;
      }

      e.positionOffset = m, e.batchIdIndex = x, e.indexOffset = k, e.batchedIndicesOffset += i;
    }
  }

  var Q = new q(),
      X = new Y();

  function $(e, n, t) {
    var r = t.length,
        a = 2 + r * V.packedLength + 1 + function (e) {
      for (var n = e.length, t = 0, r = 0; r < n; ++r) {
        t += F.packedLength + 3 + e[r].batchIds.length;
      }

      return t;
    }(n),
        i = new Float64Array(a),
        o = 0;

    i[o++] = e, i[o++] = r;

    for (var s = 0; s < r; ++s) {
      V.pack(t[s], i, o), o += V.packedLength;
    }

    var d = n.length;
    i[o++] = d;

    for (var c = 0; c < d; ++c) {
      var l = n[c];
      F.pack(l.color, i, o), o += F.packedLength, i[o++] = l.offset, i[o++] = l.count;
      var u = l.batchIds,
          f = u.length;
      i[o++] = f;

      for (var h = 0; h < f; ++h) {
        i[o++] = u[h];
      }
    }

    return i;
  }

  return e(function (e, n) {
    var t = _(e.boxes) ? new Float32Array(e.boxes) : void 0,
        r = _(e.boxBatchIds) ? new Uint16Array(e.boxBatchIds) : void 0,
        a = _(e.cylinders) ? new Float32Array(e.cylinders) : void 0,
        i = _(e.cylinderBatchIds) ? new Uint16Array(e.cylinderBatchIds) : void 0,
        o = _(e.ellipsoids) ? new Float32Array(e.ellipsoids) : void 0,
        s = _(e.ellipsoidBatchIds) ? new Uint16Array(e.ellipsoidBatchIds) : void 0,
        d = _(e.spheres) ? new Float32Array(e.spheres) : void 0,
        c = _(e.sphereBatchIds) ? new Uint16Array(e.sphereBatchIds) : void 0,
        l = _(t) ? r.length : 0,
        u = _(a) ? i.length : 0,
        f = _(o) ? s.length : 0,
        h = _(d) ? c.length : 0,
        p = P.getUnitBox(),
        b = D.getUnitCylinder(),
        v = N.getUnitEllipsoid(),
        g = p.attributes.position.values,
        y = b.attributes.position.values,
        m = v.attributes.position.values,
        x = g.length * l;
    x += y.length * u, x += m.length * (f + h);
    var k = p.indices,
        I = b.indices,
        w = v.indices,
        B = k.length * l;
    B += I.length * u, B += w.length * (f + h);
    var A,
        C,
        O,
        L = new Float32Array(x),
        U = new Uint16Array(x / 3),
        E = W.createTypedArray(x / 3, B),
        M = l + u + f + h,
        T = new Uint16Array(M),
        V = new Array(M),
        F = new Uint32Array(M),
        S = new Uint32Array(M),
        R = new Array(M);
    A = e.packedBuffer, C = new Float64Array(A), O = 0, q.unpack(C, O, Q), O += q.packedLength, Y.unpack(C, O, X);
    var Z = {
      batchTableColors: new Uint32Array(e.batchTableColors),
      positions: L,
      vertexBatchIds: U,
      indices: E,
      batchIds: T,
      batchedIndices: V,
      indexOffsets: F,
      indexCounts: S,
      boundingVolumes: R,
      positionOffset: 0,
      batchIdIndex: 0,
      indexOffset: 0,
      batchedIndicesOffset: 0,
      modelMatrix: X,
      center: Q
    };
    K(Z, t, r, p, j), K(Z, a, i, b, z), K(Z, o, s, v, H), K(Z, d, c, v, J);
    var G = $(E.BYTES_PER_ELEMENT, V, R);
    return n.push(L.buffer, U.buffer, E.buffer), n.push(T.buffer, F.buffer, S.buffer), n.push(G.buffer), {
      positions: L.buffer,
      vertexBatchIds: U.buffer,
      indices: E.buffer,
      indexOffsets: F.buffer,
      indexCounts: S.buffer,
      batchIds: T.buffer,
      packedBuffer: G.buffer
    };
  });
});