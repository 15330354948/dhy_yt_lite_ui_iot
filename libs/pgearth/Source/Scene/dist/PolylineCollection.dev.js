"use strict";

define(["../Core/BoundingSphere", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Cartographic", "../Core/Color", "../Core/combine", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/EncodedCartesian3", "../Core/FeatureDetection", "../Core/IndexDatatype", "../Core/Intersect", "../Core/Math", "../Core/Matrix4", "../Core/Plane", "../Core/RuntimeError", "../Renderer/Buffer", "../Renderer/BufferUsage", "../Renderer/ContextLimits", "../Renderer/DrawCommand", "../Renderer/Pass", "../Renderer/RenderState", "../Renderer/ShaderProgram", "../Renderer/ShaderSource", "../Renderer/Texture", "../Renderer/VertexArray", "../Shaders/PolylineCommon", "../Shaders/PolylineFS", "../Shaders/PolylineVS", "./BatchTable", "./BlendingState", "./Material", "./Polyline", "./SceneMode"], function (M, C, k, H, e, Y, U, z, o, q, t, n, r, W, a, G, i, K, D, s, P, j, J, B, F, X, I, l, h, u, Q, d, p, c, S, w, Z, _, $) {
  "use strict";

  var L = _.SHOW_INDEX,
      N = _.WIDTH_INDEX,
      R = _.POSITION_INDEX,
      O = _.MATERIAL_INDEX,
      V = _.POSITION_SIZE_INDEX,
      ee = _.DISTANCE_DISPLAY_CONDITION,
      te = _.NUMBER_OF_PROPERTIES,
      oe = {
    texCoordExpandAndBatchIndex: 0,
    position3DHigh: 1,
    position3DLow: 2,
    position2DHigh: 3,
    position2DLow: 4,
    prevPosition3DHigh: 5,
    prevPosition3DLow: 6,
    prevPosition2DHigh: 7,
    prevPosition2DLow: 8,
    nextPosition3DHigh: 9,
    nextPosition3DLow: 10,
    nextPosition2DHigh: 11,
    nextPosition2DLow: 12
  };

  function f(e) {
    e = o(e, o.EMPTY_OBJECT), this.modelMatrix = D.clone(o(e.modelMatrix, D.IDENTITY)), this._modelMatrix = D.clone(D.IDENTITY), this.debugShowBoundingVolume = o(e.debugShowBoundingVolume, !1), this._opaqueRS = void 0, this._translucentRS = void 0, this._colorCommands = [], this._polylinesUpdated = !1, this._polylinesRemoved = !1, this._createVertexArray = !1, this._propertiesChanged = new Uint32Array(te), this._polylines = [], this._polylineBuckets = {}, this._positionBufferUsage = {
      bufferUsage: J.STATIC_DRAW,
      frameCount: 0
    }, this._mode = void 0, this._polylinesToUpdate = [], this._vertexArrays = [], this._positionBuffer = void 0, this._texCoordExpandAndBatchIndexBuffer = void 0, this._batchTable = void 0, this._createBatchTable = !1, this._useHighlightColor = !1, this._highlightColor = Y.clone(Y.WHITE);
    var t = this;
    this._uniformMap = {
      u_highlightColor: function u_highlightColor() {
        return t._highlightColor;
      }
    };
  }

  t(f.prototype, {
    length: {
      get: function get() {
        return pe(this), this._polylines.length;
      }
    }
  }), f.prototype.add = function (e) {
    var t = new _(e, this);
    return t._index = this._polylines.length, this._polylines.push(t), this._createVertexArray = !0, this._createBatchTable = !0, t;
  }, f.prototype.remove = function (e) {
    if (this.contains(e)) {
      this._polylines[e._index] = void 0;

      var t,
          o = this._polylinesToUpdate.indexOf(e);

      return -1 !== o && this._polylinesToUpdate.splice(o, 1), this._polylinesRemoved = !0, this._createVertexArray = !0, this._createBatchTable = !0, q(e._bucket) && ((t = e._bucket).shaderProgram = t.shaderProgram && t.shaderProgram.destroy()), e._destroy(), !0;
    }

    return !1;
  }, f.prototype.removeAll = function () {
    ce(this), m(this), this._polylineBuckets = {}, this._polylinesRemoved = !1, this._polylines.length = 0, this._polylinesToUpdate.length = 0, this._createVertexArray = !0;
  }, f.prototype.contains = function (e) {
    return q(e) && e._polylineCollection === this;
  }, f.prototype.get = function (e) {
    if (!q(e)) throw new r("index is required.");
    return pe(this), this._polylines[e];
  };
  var ne = new W(),
      re = new H(),
      ie = new C();

  f.prototype.update = function (e) {
    if (pe(this), 0 !== this._polylines.length) {
      var t, o;
      t = this, o = e.mode, t._mode === o && D.equals(t._modelMatrix, t.modelMatrix) || (t._mode = o, t._modelMatrix = D.clone(t.modelMatrix), t._createVertexArray = !0);
      var n,
          r = e.context,
          i = e.mapProjection,
          s = this._propertiesChanged;

      if (this._createBatchTable) {
        if (0 === B.maximumVertexTextureImageUnits) throw new P("Vertex texture fetch support is required to render polylines. The maximum number of vertex texture image units must be greater than zero.");
        !function (e, t) {
          q(e._batchTable) && e._batchTable.destroy();
          var o = [{
            functionName: "batchTable_getWidthAndShow",
            componentDatatype: z.UNSIGNED_BYTE,
            componentsPerAttribute: 2
          }, {
            functionName: "batchTable_getPickColor",
            componentDatatype: z.UNSIGNED_BYTE,
            componentsPerAttribute: 4,
            normalize: !0
          }, {
            functionName: "batchTable_getCenterHigh",
            componentDatatype: z.FLOAT,
            componentsPerAttribute: 3
          }, {
            functionName: "batchTable_getCenterLowAndRadius",
            componentDatatype: z.FLOAT,
            componentsPerAttribute: 4
          }, {
            functionName: "batchTable_getDistanceDisplayCondition",
            componentDatatype: z.FLOAT,
            componentsPerAttribute: 2
          }];
          e._batchTable = new S(t, o, e._polylines.length);
        }(this, r), this._createBatchTable = !1;
      }

      if (this._createVertexArray || function (e) {
        var t = !1,
            o = e._propertiesChanged,
            n = e._positionBufferUsage;
        o[R] ? (n.bufferUsage !== J.STREAM_DRAW && (t = !0, n.bufferUsage = J.STREAM_DRAW), n.frameCount = 100) : n.bufferUsage !== J.STATIC_DRAW && (0 === n.frameCount ? (t = !0, n.bufferUsage = J.STATIC_DRAW) : n.frameCount--);
        return t;
      }(this)) he(this, r, i);else if (this._polylinesUpdated) {
        var a = this._polylinesToUpdate;
        if (this._mode !== $.SCENE3D) for (var l = a.length, h = 0; h < l; ++h) {
          (n = a[h]).update();
        }
        if (s[V] || s[O]) he(this, r, i);else for (var u = a.length, d = this._polylineBuckets, p = 0; p < u; ++p) {
          s = (n = a[p])._propertiesChanged;

          var c,
              _,
              f,
              m,
              y,
              g = n._bucket,
              b = 0;

          for (var x in d) {
            if (d.hasOwnProperty(x)) {
              if (d[x] === g) {
                s[R] && g.writeUpdate(b, n, this._positionBuffer, i);
                break;
              }

              b += d[x].lengthOfPositions;
            }
          }

          (s[L] || s[N]) && this._batchTable.setBatchedAttribute(n._index, 0, new C(n._width, n._show)), 2 < this._batchTable.attributes.length && ((s[R] || s[V]) && (c = e.mode === $.SCENE2D ? n._boundingVolume2D : n._boundingVolumeWC, _ = W.fromCartesian(c.center, ne), f = H.fromElements(_.low.x, _.low.y, _.low.z, c.radius, re), this._batchTable.setBatchedAttribute(n._index, 2, _.high), this._batchTable.setBatchedAttribute(n._index, 3, f)), s[ee] && ((m = ie).x = 0, m.y = Number.MAX_VALUE, y = n.distanceDisplayCondition, q(y) && (m.x = y.near, m.y = y.far), this._batchTable.setBatchedAttribute(n._index, 4, m))), n._clean();
        }
        a.length = 0, this._polylinesUpdated = !1;
      }
      s = this._propertiesChanged;

      for (var v = 0; v < te; ++v) {
        s[v] = 0;
      }

      var T = D.IDENTITY;
      e.mode === $.SCENE3D && (T = this.modelMatrix);
      var A = e.passes,
          E = 0 !== e.morphTime;
      q(this._opaqueRS) && this._opaqueRS.depthTest.enabled === E || (this._opaqueRS = I.fromCache({
        depthMask: E,
        depthTest: {
          enabled: E
        }
      })), q(this._translucentRS) && this._translucentRS.depthTest.enabled === E || (this._translucentRS = I.fromCache({
        blending: w.ALPHA_BLEND,
        depthMask: !E,
        depthTest: {
          enabled: E
        }
      })), this._batchTable.update(e), (A.render || A.pick) && function (e, t, o, n) {
        for (var r, i, s, a, l, h = t.context, u = t.commandList, d = o.length, p = 0, c = !0, _ = e._vertexArrays, f = e.debugShowBoundingVolume, m = e._batchTable.getUniformMapCallback(), y = _.length, g = 0; g < y; ++g) {
          for (var b = _[g], x = b.buckets, v = x.length, T = 0; T < v; ++T) {
            for (var A = x[T], E = A.offset, C = A.bucket.shaderProgram, D = A.bucket.polylines, P = D.length, B = 0, I = 0; I < P; ++I) {
              var S,
                  w = D[I],
                  L = function (e) {
                var t = Z._uniformList[e.type],
                    o = t.length;
                de.length = 2 * o;

                for (var n = 0, r = 0; r < o; ++r) {
                  var i = t[r];
                  de[n] = i, de[n + 1] = e._uniforms[i](), n += 2;
                }

                return e.type + ":" + JSON.stringify(de, ue);
              }(w._material);

              L !== r && (q(r) && 0 < B && (S = i.isTranslucent(), d <= p ? (s = new F({
                owner: e
              }), o.push(s)) : s = o[p], ++p, a = U(m(i._uniforms), e._uniformMap), s.boundingVolume = M.clone(se, s.boundingVolume), s.modelMatrix = n, s.shaderProgram = C, s.vertexArray = b.va, s.renderState = S ? e._translucentRS : e._opaqueRS, s.pass = S ? X.TRANSLUCENT : X.OPAQUE, s.debugShowBoundingVolume = f, s.pickId = "v_pickColor", s.uniformMap = a, s.count = B, s.offset = E, E += B, c = !(B = 0), u.push(s)), (i = w._material).update(h), r = L);

              for (var N = w._locatorBuckets, R = N.length, O = 0; O < R; ++O) {
                var V = N[O];
                V.locator === A && (B += V.count);
              }

              t.mode === $.SCENE3D ? l = w._boundingVolumeWC : t.mode === $.COLUMBUS_VIEW ? l = w._boundingVolume2D : t.mode === $.SCENE2D ? q(w._boundingVolume2D) && ((l = M.clone(w._boundingVolume2D, ae)).center.x = 0) : q(w._boundingVolumeWC) && q(w._boundingVolume2D) && (l = M.union(w._boundingVolumeWC, w._boundingVolume2D, ae)), c ? (c = !1, M.clone(l, se)) : M.union(l, se, se);
            }

            q(r) && 0 < B && (d <= p ? (s = new F({
              owner: e
            }), o.push(s)) : s = o[p], ++p, a = U(m(i._uniforms), e._uniformMap), s.boundingVolume = M.clone(se, s.boundingVolume), s.modelMatrix = n, s.shaderProgram = C, s.vertexArray = b.va, s.renderState = i.isTranslucent() ? e._translucentRS : e._opaqueRS, s.pass = i.isTranslucent() ? X.TRANSLUCENT : X.OPAQUE, s.debugShowBoundingVolume = f, s.pickId = "v_pickColor", s.uniformMap = a, s.count = B, s.offset = E, c = !0, u.push(s)), r = void 0;
          }
        }

        o.length = p;
      }(this, e, this._colorCommands, T);
    }
  };

  var se = new M(),
      ae = new M();
  f.prototype.isDestroyed = function () {
    return !1;
  }, f.prototype.destroy = function () {
    return _e(this), ce(this), m(this), this._batchTable = this._batchTable && this._batchTable.destroy(), n(this);
  };
  var le = [0, 0, 0];

  function he(e, t, o) {
    e._createVertexArray = !1, ce(e), _e(e), function (e) {
      for (var t = e._mode, o = e._modelMatrix, n = e._polylineBuckets = {}, r = e._polylines, i = r.length, s = 0; s < i; ++s) {
        var a,
            l,
            h = r[s];
        1 < h._actualPositions.length && (h.update(), a = h.material, l = n[a.type], q(l) || (l = n[a.type] = new fe(a, t, o)), l.addPolyline(h));
      }
    }(e);
    var n,
        r,
        i = [[]],
        s = i[0],
        a = e._batchTable,
        l = e._useHighlightColor,
        h = [0],
        u = 0,
        d = [[]],
        p = 0,
        c = e._polylineBuckets;

    for (n in c) {
      c.hasOwnProperty(n) && ((r = c[n]).updateShader(t, a, l), p += r.lengthOfPositions);
    }

    if (0 < p) {
      var _,
          f,
          m = e._mode,
          y = new Float32Array(6 * p * 3),
          g = new Float32Array(4 * p),
          b = 0,
          x = 0,
          v = 0;

      for (n in c) {
        c.hasOwnProperty(n) && ((r = c[n]).write(y, g, b, x, v, a, t, o), m === $.MORPHING && (q(_) || (_ = new Float32Array(6 * p * 3)), r.writeForMorph(_, b)), b += 6 * (f = r.lengthOfPositions) * 3, x += 4 * f, v += 4 * f, u = r.updateIndices(i, h, d, u));
      }

      var T,
          A = e._positionBufferUsage.bufferUsage,
          E = J.STATIC_DRAW;
      e._positionBuffer = j.createVertexBuffer({
        context: t,
        typedArray: y,
        usage: A
      }), q(_) && (T = j.createVertexBuffer({
        context: t,
        typedArray: _,
        usage: A
      })), e._texCoordExpandAndBatchIndexBuffer = j.createVertexBuffer({
        context: t,
        typedArray: g,
        usage: E
      });

      for (var C, D, P, B, I, S, w, L, N, R, O, V, M, U, F, k = 3 * Float32Array.BYTES_PER_ELEMENT, H = 4 * Float32Array.BYTES_PER_ELEMENT, Y = 0, W = i.length, X = 0; X < W; ++X) {
        0 < (s = i[X]).length && (C = new Uint16Array(s), D = j.createIndexBuffer({
          context: t,
          typedArray: C,
          usage: J.STATIC_DRAW,
          indexDatatype: G.UNSIGNED_SHORT
        }), Y += h[X], L = k + (w = k + (S = k + (I = k + (B = k + (P = 6 * (X * (k * K.SIXTY_FOUR_KILOBYTES) - Y * k)))))), N = X * (H * K.SIXTY_FOUR_KILOBYTES) - Y * H, R = [{
          index: oe.position3DHigh,
          componentsPerAttribute: 3,
          componentDatatype: z.FLOAT,
          offsetInBytes: P,
          strideInBytes: 6 * k
        }, {
          index: oe.position3DLow,
          componentsPerAttribute: 3,
          componentDatatype: z.FLOAT,
          offsetInBytes: B,
          strideInBytes: 6 * k
        }, {
          index: oe.position2DHigh,
          componentsPerAttribute: 3,
          componentDatatype: z.FLOAT,
          offsetInBytes: P,
          strideInBytes: 6 * k
        }, {
          index: oe.position2DLow,
          componentsPerAttribute: 3,
          componentDatatype: z.FLOAT,
          offsetInBytes: B,
          strideInBytes: 6 * k
        }, {
          index: oe.prevPosition3DHigh,
          componentsPerAttribute: 3,
          componentDatatype: z.FLOAT,
          offsetInBytes: I,
          strideInBytes: 6 * k
        }, {
          index: oe.prevPosition3DLow,
          componentsPerAttribute: 3,
          componentDatatype: z.FLOAT,
          offsetInBytes: S,
          strideInBytes: 6 * k
        }, {
          index: oe.prevPosition2DHigh,
          componentsPerAttribute: 3,
          componentDatatype: z.FLOAT,
          offsetInBytes: I,
          strideInBytes: 6 * k
        }, {
          index: oe.prevPosition2DLow,
          componentsPerAttribute: 3,
          componentDatatype: z.FLOAT,
          offsetInBytes: S,
          strideInBytes: 6 * k
        }, {
          index: oe.nextPosition3DHigh,
          componentsPerAttribute: 3,
          componentDatatype: z.FLOAT,
          offsetInBytes: w,
          strideInBytes: 6 * k
        }, {
          index: oe.nextPosition3DLow,
          componentsPerAttribute: 3,
          componentDatatype: z.FLOAT,
          offsetInBytes: L,
          strideInBytes: 6 * k
        }, {
          index: oe.nextPosition2DHigh,
          componentsPerAttribute: 3,
          componentDatatype: z.FLOAT,
          offsetInBytes: w,
          strideInBytes: 6 * k
        }, {
          index: oe.nextPosition2DLow,
          componentsPerAttribute: 3,
          componentDatatype: z.FLOAT,
          offsetInBytes: L,
          strideInBytes: 6 * k
        }, {
          index: oe.texCoordExpandAndBatchIndex,
          componentsPerAttribute: 4,
          componentDatatype: z.FLOAT,
          vertexBuffer: e._texCoordExpandAndBatchIndexBuffer,
          offsetInBytes: N
        }], U = m === $.SCENE3D ? (O = e._positionBuffer, V = "vertexBuffer", M = le, "value") : (M = (V = m === $.SCENE2D || m === $.COLUMBUS_VIEW ? (O = le, "value") : (O = T, "vertexBuffer"), e._positionBuffer), "vertexBuffer"), R[0][V] = O, R[1][V] = O, R[2][U] = M, R[3][U] = M, R[4][V] = O, R[5][V] = O, R[6][U] = M, R[7][U] = M, R[8][V] = O, R[9][V] = O, R[10][U] = M, R[11][U] = M, F = new Q({
          context: t,
          attributes: R,
          indexBuffer: D
        }), e._vertexArrays.push({
          va: F,
          buckets: d[X]
        }));
      }
    }
  }

  function ue(e, t) {
    return t instanceof u ? t.id : t;
  }

  var de = [];

  function pe(e) {
    if (e._polylinesRemoved) {
      e._polylinesRemoved = !1;

      for (var t = [], o = e._polylines.length, n = 0, r = 0; n < o; ++n) {
        var i = e._polylines[n];
        q(i) && (i._index = r++, t.push(i));
      }

      e._polylines = t;
    }
  }

  function ce(e) {
    for (var t, o = e._polylines, n = o.length, r = 0; r < n; ++r) {
      q(o[r]) && (t = o[r]._bucket, q(t) && (t.shaderProgram = t.shaderProgram && t.shaderProgram.destroy()));
    }
  }

  function _e(e) {
    for (var t = e._vertexArrays.length, o = 0; o < t; ++o) {
      e._vertexArrays[o].va.destroy();
    }

    e._vertexArrays.length = 0;
  }

  function m(e) {
    for (var t = e._polylines, o = t.length, n = 0; n < o; ++n) {
      q(t[n]) && t[n]._destroy();
    }
  }

  function x(e, t, o) {
    this.count = e, this.offset = t, this.bucket = o;
  }

  function fe(e, t, o) {
    this.polylines = [], this.lengthOfPositions = 0, this.material = e, this.shaderProgram = void 0, this.mode = t, this.modelMatrix = o;
  }

  function y(e) {
    return k.dot(k.UNIT_X, e._boundingVolume.center) < 0 || e._boundingVolume.intersectPlane(s.ORIGIN_ZX_PLANE) === i.INTERSECTING;
  }

  f.prototype._updatePolyline = function (e, t) {
    this._polylinesUpdated = !0, e._dirty || this._polylinesToUpdate.push(e), ++this._propertiesChanged[t];
  }, fe.prototype.addPolyline = function (e) {
    this.polylines.push(e), e._actualLength = this.getPolylinePositionsLength(e), this.lengthOfPositions += e._actualLength, e._bucket = this;
  }, fe.prototype.updateShader = function (e, t, o) {
    var n, r, i, s;
    q(this.shaderProgram) || (n = ["DISTANCE_DISPLAY_CONDITION"], o && n.push("VECTOR_TILE"), -1 !== this.material.shaderSource.search(/varying\s+float\s+v_polylineAngle;/g) && n.push("POLYLINE_DASH"), a.isInternetExplorer() || n.push("CLIP_POLYLINE"), r = new h({
      defines: n,
      sources: ["varying vec4 v_pickColor;\n", this.material.shaderSource, p]
    }), i = t.getVertexShaderCallback()(c), s = new h({
      defines: n,
      sources: [d, i]
    }), this.shaderProgram = l.fromCache({
      context: e,
      vertexShaderSource: s,
      fragmentShaderSource: r,
      attributeLocations: oe
    }));
  }, fe.prototype.getPolylinePositionsLength = function (e) {
    if (this.mode === $.SCENE3D || !y(e)) return 4 * (n = e._actualPositions.length) - 4;

    for (var t = 0, o = e._segments.lengths, n = o.length, r = 0; r < n; ++r) {
      t += 4 * o[r] - 4;
    }

    return t;
  };
  var me = new k(),
      ye = new k(),
      ge = new k(),
      be = new k(),
      xe = new H(),
      ve = new C();

  fe.prototype.write = function (e, t, o, n, r, i, s, a) {
    for (var l = this.mode, h = a.ellipsoid.maximumRadius * K.PI, u = this.polylines, d = u.length, p = 0; p < d; ++p) {
      for (var c, _ = u[p], f = _.width, m = _.show && 0 < f, y = _._index, g = this.getSegments(_, a), b = g.positions, x = g.lengths, v = b.length, T = _.getPickId(s).color, A = 0, E = 0, C = 0; C < v; ++C) {
        0 === C ? _._loop ? c = b[v - 2] : (c = be, k.subtract(b[0], b[1], c), k.add(b[0], c, c)) : c = b[C - 1], k.clone(c, ye), k.clone(b[C], me), C === v - 1 ? _._loop ? c = b[1] : (c = be, k.subtract(b[v - 1], b[v - 2], c), k.add(b[v - 1], c, c)) : c = b[C + 1], k.clone(c, ge);
        var D = x[A];
        C === E + D && (E += D, ++A);
        var P = C - E == 0,
            B = C === E + x[A] - 1;
        l === $.SCENE2D && (ye.z = 0, me.z = 0, ge.z = 0), l !== $.SCENE2D && l !== $.MORPHING || (P || B) && h - Math.abs(me.x) < 1 && ((me.x < 0 && 0 < ye.x || 0 < me.x && ye.x < 0) && k.clone(me, ye), (me.x < 0 && 0 < ge.x || 0 < me.x && ge.x < 0) && k.clone(me, ge));

        for (var I = B ? 2 : 4, S = P ? 2 : 0; S < I; ++S) {
          W.writeElements(me, e, o), W.writeElements(ye, e, o + 6), W.writeElements(ge, e, o + 12);
          var w = S - 2 < 0 ? -1 : 1;
          t[r] = C / (v - 1), t[r + 1] = S % 2 * 2 - 1, t[r + 2] = w, t[r + 3] = y, o += 18, r += 4;
        }
      }

      var L = xe;
      L.x = Y.floatToByte(T.red), L.y = Y.floatToByte(T.green), L.z = Y.floatToByte(T.blue), L.w = Y.floatToByte(T.alpha);
      var N = ve;
      N.x = f, N.y = m ? 1 : 0;
      var R = l === $.SCENE2D ? _._boundingVolume2D : _._boundingVolumeWC,
          O = W.fromCartesian(R.center, ne),
          V = O.high,
          M = H.fromElements(O.low.x, O.low.y, O.low.z, R.radius, re),
          U = ie;
      U.x = 0, U.y = Number.MAX_VALUE;
      var F = _.distanceDisplayCondition;
      q(F) && (U.x = F.near, U.y = F.far), i.setBatchedAttribute(y, 0, N), i.setBatchedAttribute(y, 1, L), 2 < i.attributes.length && (i.setBatchedAttribute(y, 2, V), i.setBatchedAttribute(y, 3, M), i.setBatchedAttribute(y, 4, U));
    }
  };

  var v = new k(),
      T = new k(),
      A = new k(),
      E = new k();

  fe.prototype.writeForMorph = function (e, t) {
    for (var o = this.modelMatrix, n = this.polylines, r = n.length, i = 0; i < r; ++i) {
      for (var s, a = n[i], l = a._segments.positions, h = a._segments.lengths, u = l.length, d = 0, p = 0, c = 0; c < u; ++c) {
        0 === c ? a._loop ? s = l[u - 2] : (s = E, k.subtract(l[0], l[1], s), k.add(l[0], s, s)) : s = l[c - 1], s = D.multiplyByPoint(o, s, T);

        var _,
            f = D.multiplyByPoint(o, l[c], v);

        c === u - 1 ? a._loop ? _ = l[1] : (_ = E, k.subtract(l[u - 1], l[u - 2], _), k.add(l[u - 1], _, _)) : _ = l[c + 1], _ = D.multiplyByPoint(o, _, A);
        var m = h[d];
        c === p + m && (p += m, ++d);

        for (var y = c - p == 0, g = c === p + h[d] - 1 ? 2 : 4, b = y ? 2 : 0; b < g; ++b) {
          W.writeElements(f, e, t), W.writeElements(s, e, t + 6), W.writeElements(_, e, t + 12), t += 18;
        }
      }
    }
  };

  var Te = new Array(1);
  fe.prototype.updateIndices = function (e, t, o, n) {
    var r = o.length - 1,
        i = new x(0, n, this);
    o[r].push(i);
    var s = 0,
        a = e[e.length - 1],
        l = 0;
    0 < a.length && (l = a[a.length - 1] + 1);

    for (var h = this.polylines, u = h.length, d = 0; d < u; ++d) {
      var p,
          c = h[d];

      if (c._locatorBuckets = [], this.mode === $.SCENE3D) {
        p = Te;
        var _ = c._actualPositions.length;
        if (!(0 < _)) continue;
        p[0] = _;
      } else p = c._segments.lengths;

      var f = p.length;

      if (0 < f) {
        for (var m = 0, y = 0; y < f; ++y) {
          for (var g = p[y] - 1, b = 0; b < g; ++b) {
            l + 4 > K.SIXTY_FOUR_KILOBYTES && (c._locatorBuckets.push({
              locator: i,
              count: m
            }), m = 0, t.push(4), a = [], e.push(a), l = 0, i.count = s, i = new x(n = s = 0, 0, this), o[++r] = [i]), a.push(l, l + 2, l + 1), a.push(l + 1, l + 2, l + 3), m += 6, s += 6, n += 6, l += 4;
          }
        }

        c._locatorBuckets.push({
          locator: i,
          count: m
        }), l + 4 > K.SIXTY_FOUR_KILOBYTES && (t.push(0), a = [], e.push(a), l = 0, i.count = s, i = new x(s = n = 0, 0, this), o[++r] = [i]);
      }

      c._clean();
    }

    return i.count = s, n;
  }, fe.prototype.getPolylineStartIndex = function (e) {
    for (var t = this.polylines, o = 0, n = t.length, r = 0; r < n; ++r) {
      var i = t[r];
      if (i === e) break;
      o += i._actualLength;
    }

    return o;
  };
  var Ae,
      g = {
    positions: void 0,
    lengths: void 0
  },
      b = new Array(1),
      Ee = new k(),
      Ce = new e();
  return fe.prototype.getSegments = function (e, t) {
    var o = e._actualPositions;
    if (this.mode === $.SCENE3D) return b[0] = o.length, g.positions = o, g.lengths = b, g;
    y(e) && (o = e._segments.positions);

    for (var n, r, i = t.ellipsoid, s = [], a = this.modelMatrix, l = o.length, h = Ee, u = 0; u < l; ++u) {
      n = o[u], h = D.multiplyByPoint(a, n, h), s.push(t.project(i.cartesianToCartographic(h, Ce)));
    }

    return 0 < s.length && (e._boundingVolume2D = M.fromPoints(s, e._boundingVolume2D), r = e._boundingVolume2D.center, e._boundingVolume2D.center = new k(r.z, r.x, r.y)), g.positions = s, g.lengths = e._segments.lengths, g;
  }, fe.prototype.writeUpdate = function (e, t, o, n) {
    var r = this.mode,
        i = n.ellipsoid.maximumRadius * K.PI;

    if (f = t._actualLength) {
      e += this.getPolylineStartIndex(t);
      var s = Ae,
          a = 6 * f * 3;
      !q(s) || s.length < a ? s = Ae = new Float32Array(a) : s.length > a && (s = new Float32Array(s.buffer, 0, a));

      for (var l, h = this.getSegments(t, n), u = h.positions, d = h.lengths, p = 0, c = 0, _ = 0, f = u.length, m = 0; m < f; ++m) {
        0 === m ? t._loop ? l = u[f - 2] : (l = be, k.subtract(u[0], u[1], l), k.add(u[0], l, l)) : l = u[m - 1], k.clone(l, ye), k.clone(u[m], me), m === f - 1 ? t._loop ? l = u[1] : (l = be, k.subtract(u[f - 1], u[f - 2], l), k.add(u[f - 1], l, l)) : l = u[m + 1], k.clone(l, ge);
        var y = d[c];
        m === _ + y && (_ += y, ++c);
        var g = m - _ == 0,
            b = m === _ + d[c] - 1;
        r === $.SCENE2D && (ye.z = 0, me.z = 0, ge.z = 0), r !== $.SCENE2D && r !== $.MORPHING || (g || b) && i - Math.abs(me.x) < 1 && ((me.x < 0 && 0 < ye.x || 0 < me.x && ye.x < 0) && k.clone(me, ye), (me.x < 0 && 0 < ge.x || 0 < me.x && ge.x < 0) && k.clone(me, ge));

        for (var x = b ? 2 : 4, v = g ? 2 : 0; v < x; ++v) {
          W.writeElements(me, s, p), W.writeElements(ye, s, p + 6), W.writeElements(ge, s, p + 12), p += 18;
        }
      }

      o.copyFromArrayView(s, 18 * Float32Array.BYTES_PER_ELEMENT * e);
    }
  }, f;
});