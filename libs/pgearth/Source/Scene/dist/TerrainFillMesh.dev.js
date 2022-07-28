"use strict";

define(["../Core/AttributeCompression", "../Core/binarySearch", "../Core/BoundingSphere", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Cartographic", "../Core/defined", "../Core/HeightmapTerrainData", "../Core/Math", "../Core/DeveloperError", "../Core/OrientedBoundingBox", "../Core/Queue", "../Core/Rectangle", "../Core/TileEdge", "../Core/TerrainEncoding", "../Core/TerrainMesh", "../Core/WebMercatorProjection", "./GlobeSurfaceTile", "./TileSelectionResult"], function (le, U, de, ce, ue, t, e, Te, ge, q, c, me, r, R, ve, fe, we, Se, Me, u) {
  "use strict";

  function T(e) {
    this.tile = e, this.frameLastUpdated = void 0, this.westMeshes = [], this.westTiles = [], this.southMeshes = [], this.southTiles = [], this.eastMeshes = [], this.eastTiles = [], this.northMeshes = [], this.northTiles = [], this.southwestMesh = void 0, this.southwestTile = void 0, this.southeastMesh = void 0, this.southeastTile = void 0, this.northwestMesh = void 0, this.northwestTile = void 0, this.northeastMesh = void 0, this.northeastTile = void 0, this.changedThisFrame = !0, this.visitedFrame = void 0, this.enqueuedFrame = void 0, this.mesh = void 0, this.vertexArray = void 0, this.waterMaskTexture = void 0, this.waterMaskTranslationAndScale = new t();
  }

  T.prototype.update = function (e, t, r) {
    this.changedThisFrame && (w(e, t, this.tile, r), this.changedThisFrame = !1);
  }, T.prototype.destroy = function (e) {
    Te(this.vertexArray) && (Te(e) ? e.push(this.vertexArray) : Me._freeVertexArray(this.vertexArray, e), this.vertexArray = void 0), Te(this.waterMaskTexture) && (--this.waterMaskTexture.referenceCount, 0 === this.waterMaskTexture.referenceCount && this.waterMaskTexture.destroy(), this.waterMaskTexture = void 0);
  };
  var S = new r();

  function M(e, t, r, s, a, i, o, h, n) {
    if (void 0 !== s) {
      for (var l = s; l && (l._lastSelectionResultFrame !== a || u.wasKicked(l._lastSelectionResult) || u.originalResult(l._lastSelectionResult) === u.CULLED);) {
        if (o) return;
        var d = l.parent;
        if (i >= ve.NORTHWEST && void 0 !== d) switch (i) {
          case ve.NORTHWEST:
            l = l === d.northwestChild ? d : void 0;
            break;

          case ve.NORTHEAST:
            l = l === d.northeastChild ? d : void 0;
            break;

          case ve.SOUTHWEST:
            l = l === d.southwestChild ? d : void 0;
            break;

          case ve.SOUTHEAST:
            l = l === d.southeastChild ? d : void 0;
        } else l = d;
      }

      if (void 0 !== l) {
        if (l._lastSelectionResult === u.RENDERED) return !Te(l.data.vertexArray) && void function (e, t, r, s, a, i, o, h) {
          var n = s.data;
          if (void 0 === n.fill) n.fill = new T(s);else if (n.fill.visitedFrame === i) return;
          n.fill.enqueuedFrame !== i && (n.fill.enqueuedFrame = i, n.fill.changedThisFrame = !1, o.enqueue(s));
          !function (e, t, r, s, a, i) {
            var o,
                h,
                n,
                l,
                d,
                c,
                u,
                T = s.data.fill,
                g = r.data.fill;
            o = Te(g) ? (g.visitedFrame = t.frameNumber, g.changedThisFrame && (w(e, t, r, i), g.changedThisFrame = !1), r.data.fill.mesh) : r.data.mesh;

            switch (a) {
              case ve.WEST:
                h = T.westMeshes, n = T.westTiles;
                break;

              case ve.SOUTH:
                h = T.southMeshes, n = T.southTiles;
                break;

              case ve.EAST:
                h = T.eastMeshes, n = T.eastTiles;
                break;

              case ve.NORTH:
                h = T.northMeshes, n = T.northTiles;
                break;

              case ve.NORTHWEST:
                return T.changedThisFrame = T.changedThisFrame || T.northwestMesh !== o, T.northwestMesh = o, T.northwestTile = r;

              case ve.NORTHEAST:
                return T.changedThisFrame = T.changedThisFrame || T.northeastMesh !== o, T.northeastMesh = o, T.northeastTile = r;

              case ve.SOUTHWEST:
                return T.changedThisFrame = T.changedThisFrame || T.southwestMesh !== o, T.southwestMesh = o, T.southwestTile = r;

              case ve.SOUTHEAST:
                return T.changedThisFrame = T.changedThisFrame || T.southeastMesh !== o, T.southeastMesh = o, T.southeastTile = r;
            }

            if (r.level <= s.level) return T.changedThisFrame = T.changedThisFrame || h[0] !== o || 1 !== h.length, h[0] = o, n[0] = r, h.length = 1, n.length = 1;
            var m,
                v = r.rectangle,
                f = s.rectangle;

            switch (a) {
              case ve.WEST:
                for (m = (f.north - f.south) * q.EPSILON5, l = 0; l < n.length && (c = n[l], u = c.rectangle, !q.greaterThan(v.north, u.south, m)); ++l) {
                  ;
                }

                for (d = l; d < n.length && (c = n[d], u = c.rectangle, !q.greaterThanOrEquals(v.south, u.north, m)); ++d) {
                  ;
                }

                break;

              case ve.SOUTH:
                for (m = (f.east - f.west) * q.EPSILON5, l = 0; l < n.length && (c = n[l], u = c.rectangle, !q.lessThan(v.west, u.east, m)); ++l) {
                  ;
                }

                for (d = l; d < n.length && (c = n[d], u = c.rectangle, !q.lessThanOrEquals(v.east, u.west, m)); ++d) {
                  ;
                }

                break;

              case ve.EAST:
                for (m = (f.north - f.south) * q.EPSILON5, l = 0; l < n.length && (c = n[l], u = c.rectangle, !q.lessThan(v.south, u.north, m)); ++l) {
                  ;
                }

                for (d = l; d < n.length && (c = n[d], u = c.rectangle, !q.lessThanOrEquals(v.north, u.south, m)); ++d) {
                  ;
                }

                break;

              case ve.NORTH:
                for (m = (f.east - f.west) * q.EPSILON5, l = 0; l < n.length && (c = n[l], u = c.rectangle, !q.greaterThan(v.east, u.west, m)); ++l) {
                  ;
                }

                for (d = l; d < n.length && (c = n[d], u = c.rectangle, !q.greaterThanOrEquals(v.west, u.east, m)); ++d) {
                  ;
                }

            }

            d - l == 1 ? (T.changedThisFrame = T.changedThisFrame || h[l] !== o, h[l] = o, n[l] = r) : (T.changedThisFrame = !0, h.splice(l, d - l, o), n.splice(l, d - l, r));
          }(e, t, r, s, a, h);
        }(e, t, r, l, i, a, h, n);
        if (u.originalResult(s._lastSelectionResult) !== u.CULLED) switch (i) {
          case ve.WEST:
            M(e, t, r, s.northwestChild, a, i, !0, h, n), M(e, t, r, s.southwestChild, a, i, !0, h, n);
            break;

          case ve.EAST:
            M(e, t, r, s.southeastChild, a, i, !0, h, n), M(e, t, r, s.northeastChild, a, i, !0, h, n);
            break;

          case ve.SOUTH:
            M(e, t, r, s.southwestChild, a, i, !0, h, n), M(e, t, r, s.southeastChild, a, i, !0, h, n);
            break;

          case ve.NORTH:
            M(e, t, r, s.northeastChild, a, i, !0, h, n), M(e, t, r, s.northwestChild, a, i, !0, h, n);
            break;

          case ve.NORTHWEST:
            M(e, t, r, s.northwestChild, a, i, !0, h, n);
            break;

          case ve.NORTHEAST:
            M(e, t, r, s.northeastChild, a, i, !0, h, n);
            break;

          case ve.SOUTHWEST:
            M(e, t, r, s.southwestChild, a, i, !0, h, n);
            break;

          case ve.SOUTHEAST:
            M(e, t, r, s.southeastChild, a, i, !0, h, n);
            break;

          default:
            throw new c("Invalid edge");
        }
      }
    }
  }

  T.updateFillTiles = function (e, t, r, s) {
    var a = e._quadtree,
        i = a._levelZeroTiles,
        o = a._lastSelectionFrameNumber,
        h = S;
    h.clear();

    for (var n = 0; n < t.length; ++n) {
      var l = t[n];
      Te(l.data.vertexArray) && h.enqueue(t[n]);
    }

    for (var d = h.dequeue(); void 0 !== d;) {
      var c = d.findTileToWest(i),
          u = d.findTileToSouth(i),
          T = d.findTileToEast(i),
          g = d.findTileToNorth(i);
      M(e, r, d, c, o, ve.EAST, !1, h, s), M(e, r, d, u, o, ve.NORTH, !1, h, s), M(e, r, d, T, o, ve.WEST, !1, h, s), M(e, r, d, g, o, ve.SOUTH, !1, h, s);
      var m = c.findTileToNorth(i),
          v = c.findTileToSouth(i),
          f = T.findTileToNorth(i),
          w = T.findTileToSouth(i);
      M(e, r, d, m, o, ve.SOUTHEAST, !1, h, s), M(e, r, d, f, o, ve.SOUTHWEST, !1, h, s), M(e, r, d, v, o, ve.NORTHEAST, !1, h, s), M(e, r, d, w, o, ve.NORTHWEST, !1, h, s), d = h.dequeue();
    }
  };

  var Ee = new e(),
      xe = new e(),
      D = new ue(),
      Ne = new ue(),
      Oe = new ce(),
      B = new ce(),
      Ce = new ce();

  function s() {
    this.height = 0, this.encodedNormal = new ce();
  }

  function He(e, t, r, s, a, i, o, h, n) {
    if (Te(a)) return a;
    var l,
        d,
        c,
        u = Te(i) && Te(o) ? .5 * (i.height + o.height) : Te(i) ? i.height : Te(o) ? o.height : Te(h) ? h.height : (l = e.tile.data.tileBoundingRegion, c = d = 0, Te(l) && (d = l.minimumHeight, c = l.maximumHeight), .5 * (d + c));
    return g(0, t, 0, 0, u, n), n;
  }

  var Ae = {
    minimumHeight: 0,
    maximumHeight: 0
  },
      ye = new s(),
      Ie = new s(),
      be = new s(),
      We = new s(),
      pe = "undefined" != typeof Uint8Array ? new Uint8Array(81) : void 0;

  function w(e, t, r, s) {
    Me.initialize(r, e.terrainProvider, e._imageryLayers);
    var a,
        i,
        o,
        h,
        n,
        l,
        d,
        c,
        u = r.data,
        T = u.fill,
        g = r.rectangle,
        m = r.tilingScheme.ellipsoid,
        v = Re(T, m, 0, 1, T.northwestTile, T.northwestMesh, T.northTiles, T.northMeshes, T.westTiles, T.westMeshes, be),
        f = Re(T, m, 0, 0, T.southwestTile, T.southwestMesh, T.westTiles, T.westMeshes, T.southTiles, T.southMeshes, ye),
        w = Re(T, m, 1, 0, T.southeastTile, T.southeastMesh, T.southTiles, T.southMeshes, T.eastTiles, T.eastMeshes, Ie),
        v = He(T, m, 0, 1, v, f, S = Re(T, m, 1, 1, T.northeastTile, T.northeastMesh, T.eastTiles, T.eastMeshes, T.northTiles, T.northMeshes, We), w, be),
        f = He(T, m, 0, 0, f, v, w, S, ye),
        w = He(T, m, 1, 1, w, f, S, v, Ie),
        S = He(T, m, 1, 1, S, w, v, f, We),
        M = f.height,
        E = w.height,
        x = v.height,
        N = S.height,
        O = Math.min(M, E, x, N),
        C = Math.max(M, E, x, N),
        H = .5 * (O + C),
        A = e.getLevelMaximumGeometricError(r.level),
        y = m.maximumRadius - A,
        I = 4 * Math.acos(y / m.maximumRadius);

    if (I *= 1.5, g.width > I && C - O <= A) {
      var b = new ge({
        width: 9,
        height: 9,
        buffer: pe,
        structure: {
          heightOffset: C
        }
      });
      T.mesh = b._createMeshSync(r.tilingScheme, r.x, r.y, r.level, 1);
    } else {
      var W = new fe(void 0, void 0, void 0, void 0, !0, !0),
          p = xe;
      p.longitude = .5 * (g.east + g.west), p.latitude = .5 * (g.north + g.south), p.height = H, W.center = m.cartographicToCartesian(p, W.center);

      for (var k = 5, R = T.westMeshes, F = 0, L = R.length; F < L; ++F) {
        k += R[F].eastIndicesNorthToSouth.length;
      }

      for (F = 0, L = (R = T.southMeshes).length; F < L; ++F) {
        k += R[F].northIndicesWestToEast.length;
      }

      for (F = 0, L = (R = T.eastMeshes).length; F < L; ++F) {
        k += R[F].westIndicesSouthToNorth.length;
      }

      for (F = 0, L = (R = T.northMeshes).length; F < L; ++F) {
        k += R[F].southIndicesEastToWest.length;
      }

      var P = Ae;
      P.minimumHeight = O, P.maximumHeight = C;

      var _ = W.getStride(),
          U = new Float32Array(k * _),
          q = 0,
          D = q,
          B = q = Fe(T, 0, W, U, q = ke(m, g, W, U, q, 0, 1, v.height, v.encodedNormal, 1, P), T.westTiles, T.westMeshes, ve.EAST, P),
          V = q = Fe(T, 0, W, U, q = ke(m, g, W, U, q, 0, 0, f.height, f.encodedNormal, 0, P), T.southTiles, T.southMeshes, ve.NORTH, P),
          z = q = Fe(T, 0, W, U, q = ke(m, g, W, U, q, 1, 0, w.height, w.encodedNormal, 0, P), T.eastTiles, T.eastMeshes, ve.WEST, P);

      q = Fe(T, 0, W, U, q = ke(m, g, W, U, q, 1, 1, S.height, S.encodedNormal, 1, P), T.northTiles, T.northMeshes, ve.SOUTH, P), O = P.minimumHeight, C = P.maximumHeight;
      var G = me.fromRectangle(g, O, C, r.tilingScheme.ellipsoid),
          X = Se.geodeticLatitudeToMercatorAngle(g.south),
          Y = 1 / (Se.geodeticLatitudeToMercatorAngle(g.north) - X),
          j = (Se.geodeticLatitudeToMercatorAngle(p.latitude) - X) * Y;
      m.geodeticSurfaceNormalCartographic(Ee, Ne);
      var K = le.octEncode(Ne, Oe),
          Q = q;
      W.encode(U, q * _, G.center, ce.fromElements(.5, .5, Ce), H, K, j);
      var Z,
          J,
          $ = ++q,
          ee = 3 * ($ - 1);
      J = ee * ($ < 256 ? 1 : 2) <= (U.length - $ * _) * Float32Array.BYTES_PER_ELEMENT ? (Z = $ * _ * Float32Array.BYTES_PER_ELEMENT, new ($ < 256 ? Uint8Array : Uint16Array)(U.buffer, Z, ee)) : new ($ < 256 ? Uint8Array : Uint16Array)(ee), U = new Float32Array(U.buffer, 0, $ * _);
      var te = 0;

      for (F = 0; F < $ - 2; ++F) {
        J[te++] = Q, J[te++] = F, J[te++] = F + 1;
      }

      J[te++] = Q, J[te++] = F, J[te++] = 0;
      var re = [];

      for (F = B; D <= F; --F) {
        re.push(F);
      }

      var se = [];

      for (F = V; B <= F; --F) {
        se.push(F);
      }

      var ae = [];

      for (F = z; V <= F; --F) {
        ae.push(F);
      }

      var ie = [];

      for (ie.push(0), F = Q - 1; z <= F; --F) {
        ie.push(F);
      }

      T.mesh = new we(W.center, U, J, O, C, de.fromOrientedBoundingBox(G), (a = e, i = G.center, o = g, h = C, l = a.quadtree._occluders.ellipsoid, d = l.ellipsoid, c = Le, ue.fromRadians(o.west, o.south, h, d, c[0]), ue.fromRadians(o.east, o.south, h, d, c[1]), ue.fromRadians(o.west, o.north, h, d, c[2]), ue.fromRadians(o.east, o.north, h, d, c[3]), l.computeHorizonCullingPoint(i, c, n)), W.getStride(), G, W, t.terrainExaggeration, re, se, ae, ie);
    }

    var oe = t.context;
    Te(T.vertexArray) && (Te(s) ? s.push(T.vertexArray) : Me._freeVertexArray(T.vertexArray)), T.vertexArray = Me._createVertexArrayForMesh(oe, T.mesh), u.processImagery(r, e.terrainProvider, t, !0);
    var he,
        ne = T.waterMaskTexture;
    T.waterMaskTexture = void 0, e.terrainProvider.hasWaterMask && (he = u._findAncestorTileWithTerrainData(r), Te(he) && Te(he.data.waterMaskTexture) && (T.waterMaskTexture = he.data.waterMaskTexture, ++T.waterMaskTexture.referenceCount, u._computeWaterMaskTranslationAndScale(r, he, T.waterMaskTranslationAndScale))), Te(ne) && (--ne.referenceCount, 0 === ne.referenceCount && ne.destroy());
  }

  function ke(e, t, r, s, a, i, o, h, n, l, d) {
    var c = Ee;
    c.longitude = q.lerp(t.west, t.east, i), c.latitude = q.lerp(t.south, t.north, o), c.height = h;
    var u = e.cartographicToCartesian(c, D),
        T = B;
    return T.x = i, T.y = o, r.encode(s, a * r.getStride(), u, T, h, n, l), d.minimumHeight = Math.min(d.minimumHeight, h), d.maximumHeight = Math.max(d.maximumHeight, h), a + 1;
  }

  var F = new R();

  function V(e, t, r, s) {
    var a = e.rectangle,
        i = t.rectangle;
    0 === t.x && 1 === r.x && e.x === e.tilingScheme.getNumberOfXTilesAtLevel(e.level) - 1 ? ((a = R.clone(e.rectangle, F)).west -= q.TWO_PI, a.east -= q.TWO_PI) : 0 === e.x && 0 === r.x && t.x === t.tilingScheme.getNumberOfXTilesAtLevel(t.level) - 1 && ((a = R.clone(e.rectangle, F)).west += q.TWO_PI, a.east += q.TWO_PI);
    var o = a.east - a.west,
        h = (i.west - a.west) / o,
        n = (i.east - a.west) / o,
        l = a.north - a.south,
        d = (i.south - a.south) / l,
        c = (i.north - a.south) / l,
        u = (r.x - h) / (n - h),
        T = (r.y - d) / (c - d);
    return Math.abs(u) < Math.EPSILON5 ? u = 0 : Math.abs(u - 1) < Math.EPSILON5 && (u = 1), Math.abs(T) < Math.EPSILON5 ? T = 0 : Math.abs(T - 1) < Math.EPSILON5 && (T = 1), s.x = u, s.y = T, s;
  }

  var z = new ce();

  function G(e, t, r, s, a) {
    var i,
        o = e.encoding,
        h = e.vertices;
    a.height = o.decodeHeight(h, t), o.hasVertexNormals ? o.getOctEncodedNormal(h, t, a.encodedNormal) : ((i = a.encodedNormal).x = 0, i.y = 0);
  }

  var X = new ce(),
      Y = new ue();

  function g(e, t, r, s, a, i) {
    i.height = a;
    var o = t.geodeticSurfaceNormalCartographic(Ee, D);
    le.octEncode(o, i.encodedNormal);
  }

  function Re(e, t, r, s, a, i, o, h, n, l, d) {
    var c;
    return v(e, t, h, o, !1, r, s, d) || v(e, t, l, n, !0, r, s, d) ? d : j(a, i) ? (G(i, 0 === r ? 0 === s ? i.eastIndicesNorthToSouth[0] : i.southIndicesEastToWest[0] : 0 === s ? i.northIndicesWestToEast[0] : i.westIndicesSouthToNorth[0], 0, 0, d), d) : (c = 0 === r ? 0 === s ? m(e.westMeshes, e.westTiles, ve.EAST, e.southMeshes, e.southTiles, ve.NORTH, r, s) : m(e.northMeshes, e.northTiles, ve.SOUTH, e.westMeshes, e.westTiles, ve.EAST, r, s) : 0 === s ? m(e.southMeshes, e.southTiles, ve.NORTH, e.eastMeshes, e.eastTiles, ve.WEST, r, s) : m(e.eastMeshes, e.eastTiles, ve.WEST, e.northMeshes, e.northTiles, ve.SOUTH, r, s), Te(c) ? (g(0, t, 0, 0, c, d), d) : void 0);
  }

  function m(e, t, r, s, a, i, o, h) {
    var n = d(e, t, !1, r),
        l = d(s, a, !0, i);
    return Te(n) && Te(l) ? .5 * (n + l) : Te(n) ? n : l;
  }

  function Fe(e, t, r, s, a, i, o, h, n) {
    for (var l = 0; l < i.length; ++l) {
      a = function (e, t, r, s, a, i, o, h) {
        var n = a.rectangle;
        o === ve.EAST && 0 === e.tile.x ? ((n = R.clone(a.rectangle, F)).west -= q.TWO_PI, n.east -= q.TWO_PI) : o === ve.WEST && 0 === a.x && ((n = R.clone(a.rectangle, F)).west += q.TWO_PI, n.east += q.TWO_PI);
        var l,
            d,
            c,
            u,
            T = e.tile.rectangle;
        0 < s && (t.decodeTextureCoordinates(r, s - 1, Ce), l = Ce.x, d = Ce.y);

        switch (o) {
          case ve.WEST:
            c = i.westIndicesSouthToNorth, u = !1;
            break;

          case ve.NORTH:
            c = i.northIndicesWestToEast, u = !0;
            break;

          case ve.EAST:
            c = i.eastIndicesNorthToSouth, u = !1;
            break;

          case ve.SOUTH:
            c = i.southIndicesEastToWest, u = !0;
        }

        var g,
            m,
            v = a,
            f = e.tile,
            w = i.encoding,
            S = i.vertices,
            M = t.getStride();
        w.hasWebMercatorT && (g = Se.geodeticLatitudeToMercatorAngle(T.south), m = 1 / (Se.geodeticLatitudeToMercatorAngle(T.north) - g));

        for (var E, x = 0; x < c.length; ++x) {
          var N = c[x],
              O = w.decodeTextureCoordinates(S, N, Ce);
          V(v, f, O, O);
          var C,
              H,
              A,
              y,
              I,
              b,
              W = O.x,
              p = O.y,
              k = u ? W : p;
          k < 0 || 1 < k || Math.abs(W - l) < q.EPSILON5 && Math.abs(p - d) < q.EPSILON5 || (C = Math.abs(W) < q.EPSILON5 || Math.abs(W - 1) < q.EPSILON5, H = Math.abs(p) < q.EPSILON5 || Math.abs(p - 1) < q.EPSILON5, C && H || (A = w.decodePosition(S, N, D), y = w.decodeHeight(S, N), w.hasVertexNormals ? E = w.getOctEncodedNormal(S, N, Oe) : ((E = Oe).x = 0, E.y = 0), I = p, w.hasWebMercatorT && (b = q.lerp(T.south, T.north, p), I = (Se.geodeticLatitudeToMercatorAngle(b) - g) * m), t.encode(r, s * M, A, O, y, E, I), h.minimumHeight = Math.min(h.minimumHeight, y), h.maximumHeight = Math.max(h.maximumHeight, y), ++s));
        }

        return s;
      }(e, r, s, a, i[l], o[l], h, n);
    }

    return a;
  }

  function d(e, t, r, s) {
    for (var a, i, o = r ? (a = 0, i = e.length, 1) : (a = e.length - 1, i = -1), h = a; h !== i; h += o) {
      var n,
          l = e[h];

      if (j(t[h], l)) {
        switch (s) {
          case ve.WEST:
            n = l.westIndicesSouthToNorth;
            break;

          case ve.SOUTH:
            n = l.southIndicesEastToWest;
            break;

          case ve.EAST:
            n = l.eastIndicesNorthToSouth;
            break;

          case ve.NORTH:
            n = l.northIndicesWestToEast;
        }

        var d = n[r ? 0 : n.length - 1];
        if (Te(d)) return l.encoding.decodeHeight(l.vertices, d);
      }
    }
  }

  function j(e, t) {
    return Te(t) && (!Te(e.data.fill) || !e.data.fill.changedThisFrame);
  }

  function v(s, e, t, r, a, i, o, h) {
    var n,
        l,
        d,
        c,
        u,
        T,
        g,
        m,
        v,
        f,
        w,
        S,
        M,
        E,
        x,
        N,
        O,
        C,
        H,
        A,
        y,
        I,
        b,
        W,
        p,
        k,
        R,
        F,
        L = r[a ? 0 : t.length - 1],
        P = t[a ? 0 : t.length - 1];

    if (j(L, P) && (d = 0 === i ? 0 === o ? (n = a ? P.northIndicesWestToEast : P.eastIndicesNorthToSouth, l = a) : (n = a ? P.eastIndicesNorthToSouth : P.southIndicesEastToWest, l = !a, !1) : 0 === o ? (n = a ? P.westIndicesSouthToNorth : P.northIndicesWestToEast, l = !a, !0) : (n = a ? P.southIndicesEastToWest : P.westIndicesSouthToNorth, !(l = a)), 0 < n.length)) {
      u = n[c = a ? 0 : n.length - 1], P.encoding.decodeTextureCoordinates(P.vertices, u, Ce);

      var _ = V(L, s.tile, Ce, Ce);

      if (_.x === i && _.y === o) return G(P, u, 0, 0, h), !0;
      if (!((c = U(n, l ? i : o, function (e, t) {
        P.encoding.decodeTextureCoordinates(P.vertices, e, Ce);
        var r = V(L, s.tile, Ce, Ce);
        return d ? l ? r.x - i : r.y - o : l ? i - r.x : o - r.y;
      })) < 0)) return G(P, n[c], 0, 0, h), !0;
      if (0 < (c = ~c) && c < n.length) return T = e, g = L, m = s.tile, v = P, f = n[c - 1], w = n[c], S = i, M = o, E = l, x = h, y = v.encoding, I = v.vertices, b = V(g, m, y.decodeTextureCoordinates(I, f, Ce), Ce), W = V(g, m, y.decodeTextureCoordinates(I, w, B), B), p = E ? (S - b.x) / (W.x - b.x) : (M - b.y) / (W.y - b.y), k = y.decodeHeight(I, f), R = y.decodeHeight(I, w), F = m.rectangle, Ee.longitude = q.lerp(F.west, F.east, S), Ee.latitude = q.lerp(F.south, F.north, M), x.height = Ee.height = q.lerp(k, R, p), y.hasVertexNormals ? (N = y.getOctEncodedNormal(I, f, z), O = y.getOctEncodedNormal(I, w, X), C = le.octDecode(N.x, N.y, D), H = le.octDecode(O.x, O.y, Y), A = ue.lerp(C, H, p, D), ue.normalize(A, A)) : A = T.geodeticSurfaceNormalCartographic(Ee, D), le.octEncode(A, x.encodedNormal), !0;
    }

    return !1;
  }

  var Le = [new ue(), new ue(), new ue(), new ue()];
  return T;
});