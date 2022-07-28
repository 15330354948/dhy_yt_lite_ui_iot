"use strict";

define(["../Core/Cartesian3", "../Core/Color", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/IndexDatatype", "../Core/Matrix4", "../Core/PrimitiveType", "../Renderer/Buffer", "../Renderer/BufferUsage", "../Renderer/DrawCommand", "../Renderer/Pass", "../Renderer/RenderState", "../Renderer/ShaderProgram", "../Renderer/ShaderSource", "../Renderer/VertexArray", "../Shaders/ShadowVolumeFS", "../Shaders/VectorTileVS", "./BlendingState", "./PGEarth3DTileFeature", "./ClassificationType", "./DepthFunction", "./Expression", "./StencilConstants", "./StencilFunction", "./StencilOperation", "./Vector3DTileBatch"], function (s, C, f, b, E, e, t, u, T, m, p, I, g, A, S, v, P, y, R, L, r, i, D, a, d, n, o, c, x) {
  "use strict";

  function _(e) {
    e = b(e, b.EMPTY_OBJECT), this._batchTable = e.batchTable, this._batchIds = e.batchIds, this._positions = e.positions, this._vertexBatchIds = e.vertexBatchIds, this._indices = e.indices, this._indexCounts = e.indexCounts, this._indexOffsets = e.indexOffsets, this._batchedIndices = e.batchedIndices, this._boundingVolume = e.boundingVolume, this._boundingVolumes = e.boundingVolumes, this._center = b(e.center, s.ZERO), this._va = void 0, this._sp = void 0, this._spStencil = void 0, this._spPick = void 0, this._uniformMap = void 0, this._vaSwap = void 0, this._rsStencilPreloadPass = void 0, this._rsStencilPreloadPass3DTiles = void 0, this._rsStencilDepthPass = void 0, this._rsStencilDepthPass3DTiles = void 0, this._rsColorPass = void 0, this._rsPickPass = void 0, this._rsWireframe = void 0, this._commands = [], this._commandsIgnoreShow = [], this._pickCommands = [], this._constantColor = C.clone(C.WHITE), this._highlightColor = this._constantColor, this._batchDirty = !0, this._pickCommandsDirty = !0, this._framesSinceLastRebatch = 0, this._updatingAllCommands = !1, this._trianglesLength = this._indices.length / 3, this._geometryByteLength = this._indices.byteLength + this._positions.byteLength + this._vertexBatchIds.byteLength, this.debugWireframe = !1, this._debugWireframe = this.debugWireframe, this._wireframeDirty = !1, this.forceRebatch = !1, this.classificationType = b(e.classificationType, D.BOTH), this._vertexShaderSource = e._vertexShaderSource, this._fragmentShaderSource = e._fragmentShaderSource, this._attributeLocations = e._attributeLocations, this._uniformMap = e._uniformMap, this._pickId = e._pickId, this._modelMatrix = e._modelMatrix, this._boundingSphere = e._boundingSphere, this._batchIdLookUp = {};

    for (var t = this._batchIds.length, r = 0; r < t; ++r) {
      var a = this._batchIds[r];
      this._batchIdLookUp[a] = r;
    }
  }

  e(_.prototype, {
    trianglesLength: {
      get: function get() {
        return this._trianglesLength;
      }
    },
    geometryByteLength: {
      get: function get() {
        return this._geometryByteLength;
      }
    }
  });
  var N = {
    position: 0,
    a_batchId: 1
  };

  function w(e) {
    var t = e ? o.EQUAL : o.ALWAYS;
    return {
      colorMask: {
        red: !1,
        green: !1,
        blue: !1,
        alpha: !1
      },
      stencilTest: {
        enabled: !0,
        frontFunction: t,
        frontOperation: {
          fail: c.KEEP,
          zFail: c.DECREMENT_WRAP,
          zPass: c.DECREMENT_WRAP
        },
        backFunction: t,
        backOperation: {
          fail: c.KEEP,
          zFail: c.INCREMENT_WRAP,
          zPass: c.INCREMENT_WRAP
        },
        reference: n.PGEARTH_3D_TILE_MASK,
        mask: n.PGEARTH_3D_TILE_MASK
      },
      stencilMask: n.CLASSIFICATION_MASK,
      depthTest: {
        enabled: !1
      },
      depthMask: !1
    };
  }

  function M(e) {
    var t = e ? o.EQUAL : o.ALWAYS;
    return {
      colorMask: {
        red: !1,
        green: !1,
        blue: !1,
        alpha: !1
      },
      stencilTest: {
        enabled: !0,
        frontFunction: t,
        frontOperation: {
          fail: c.KEEP,
          zFail: c.KEEP,
          zPass: c.INCREMENT_WRAP
        },
        backFunction: t,
        backOperation: {
          fail: c.KEEP,
          zFail: c.KEEP,
          zPass: c.DECREMENT_WRAP
        },
        reference: n.PGEARTH_3D_TILE_MASK,
        mask: n.PGEARTH_3D_TILE_MASK
      },
      stencilMask: n.CLASSIFICATION_MASK,
      depthTest: {
        enabled: !0,
        func: a.LESS_OR_EQUAL
      },
      depthMask: !1
    };
  }

  var k = {
    stencilTest: {
      enabled: !0,
      frontFunction: o.NOT_EQUAL,
      frontOperation: {
        fail: c.KEEP,
        zFail: c.KEEP,
        zPass: c.DECREMENT_WRAP
      },
      backFunction: o.NOT_EQUAL,
      backOperation: {
        fail: c.KEEP,
        zFail: c.KEEP,
        zPass: c.DECREMENT_WRAP
      },
      reference: 0,
      mask: n.CLASSIFICATION_MASK
    },
    stencilMask: n.CLASSIFICATION_MASK,
    depthTest: {
      enabled: !1
    },
    depthMask: !1,
    blending: r.ALPHA_BLEND
  },
      O = {
    stencilTest: {
      enabled: !0,
      frontFunction: o.NOT_EQUAL,
      frontOperation: {
        fail: c.KEEP,
        zFail: c.KEEP,
        zPass: c.DECREMENT_WRAP
      },
      backFunction: o.NOT_EQUAL,
      backOperation: {
        fail: c.KEEP,
        zFail: c.KEEP,
        zPass: c.DECREMENT_WRAP
      },
      reference: 0,
      mask: n.CLASSIFICATION_MASK
    },
    stencilMask: n.CLASSIFICATION_MASK,
    depthTest: {
      enabled: !1
    },
    depthMask: !1
  };
  var F = new T(),
      W = new s();

  function l(e, t, r, a, s, n, i) {
    for (var o = e.constructor.BYTES_PER_ELEMENT, c = n.length, d = 0; d < c; ++d) {
      var _ = i[n[d]],
          h = a[_],
          l = s[_],
          f = new e.constructor(e.buffer, o * h, l);
      t.set(f, r), a[_] = r, r += l;
    }

    return r;
  }

  function B(e, t, r, a, s, n, i) {
    for (var o = e.bytesPerIndex, c = n.length, d = 0; d < c; ++d) {
      var _ = i[n[d]],
          h = a[_],
          l = s[_];
      t.copyFromBuffer(e, h * o, r * o, l * o), a[_] = r, r += l;
    }

    return r;
  }

  function h(e, t) {
    return t.color.toRgba() - e.color.toRgba();
  }

  function V(e, t) {
    if (!e._batchDirty) return !1;

    for (var r = e._batchedIndices, a = r.length, s = !1, n = {}, i = 0; i < a; ++i) {
      var o = r[i].color.toRgba();

      if (E(n[o])) {
        s = !0;
        break;
      }

      n[o] = !0;
    }

    return s ? s && !e.forceRebatch && e._framesSinceLastRebatch < 120 ? void ++e._framesSinceLastRebatch : (r.sort(h), (t.webgl2 ? function (e, t) {
      var r = e._indexOffsets,
          a = e._indexCounts,
          s = e._batchIdLookUp,
          n = t.pop(),
          i = [n],
          o = e._va.indexBuffer,
          c = e._vaSwap.indexBuffer,
          d = B(o, c, 0, r, a, n.batchIds, s);

      for (n.offset = 0, n.count = d; 0 < t.length;) {
        var _,
            h = t.pop();

        C.equals(h.color, n.color) ? (d = B(o, c, d, r, a, h.batchIds, s), n.batchIds = n.batchIds.concat(h.batchIds), n.count = d - n.offset) : (d = B(o, c, _ = d, r, a, h.batchIds, s), h.offset = _, h.count = d - _, i.push(h), n = h);
      }

      var l = e._va;
      e._va = e._vaSwap, e._vaSwap = l, e._batchedIndices = i;
    } : function (e, t) {
      var r = e._indices,
          a = e._indexOffsets,
          s = e._indexCounts,
          n = e._batchIdLookUp,
          i = new r.constructor(r.length),
          o = t.pop(),
          c = [o],
          d = l(r, i, 0, a, s, o.batchIds, n);

      for (o.offset = 0, o.count = d; 0 < t.length;) {
        var _,
            h = t.pop();

        C.equals(h.color, o.color) ? (d = l(r, i, d, a, s, h.batchIds, n), o.batchIds = o.batchIds.concat(h.batchIds), o.count = d - o.offset) : (d = l(r, i, _ = d, a, s, h.batchIds, n), h.offset = _, h.count = d - _, c.push(h), o = h);
      }

      e._va.indexBuffer.copyFromArrayView(i), e._indices = i, e._batchedIndices = c;
    })(e, r), e._framesSinceLastRebatch = 0, e._batchDirty = !1, e._pickCommandsDirty = !0, e._wireframeDirty = !0) : e._batchDirty = !1;
  }

  _.prototype.createFeatures = function (e, t) {
    for (var r = this._batchIds, a = r.length, s = 0; s < a; ++s) {
      var n = r[s];
      t[n] = new i(e, n);
    }
  }, _.prototype.applyDebugSettings = function (e, t) {
    this._highlightColor = e ? t : this._constantColor;
  };
  var H = new C(),
      K = C.WHITE,
      z = /\$/;

  function G(e, t, r, a) {
    for (var s, n = e.classificationType, i = n !== D.PGEARTH_3D_TILE, o = n !== D.TERRAIN, c = t.commandList, d = r.length, _ = 0; _ < d; ++_) {
      i && ((s = r[_]).pass = A.TERRAIN_CLASSIFICATION, c.push(s)), o && ((s = r[_].derivedCommands.tileset).pass = A.PGEARTH_3D_TILE_CLASSIFICATION, c.push(s));
    }

    if (t.invertClassification && E(a)) for (d = a.length, _ = 0; _ < d; ++_) {
      c.push(a[_]);
    }
  }

  return _.prototype.applyStyle = function (e, t) {
    if (E(e)) {
      var r = e.color,
          a = r instanceof d && !z.test(r.expression);
      this._updatingAllCommands = a;
      var s = this._batchIds,
          n = s.length;

      for (c = 0; c < n; ++c) {
        var i = t[s[c]];
        i.color = E(e.color) ? e.color.evaluateColor(i, H) : K, i.show = !E(e.show) || e.show.evaluate(i);
      }

      if (a) {
        for (var o = this._batchedIndices, n = o.length, c = 0; c < n; ++c) {
          o[c].color = C.clone(C.WHITE);
        }

        this._updatingAllCommands = !1, this._batchDirty = !0;
      }
    } else !function (e, t) {
      e._updatingAllCommands = !0;

      for (var r = e._batchIds, a = r.length, s = 0; s < a; ++s) {
        var n = t[r[s]];
        n.show = !0, n.color = C.WHITE;
      }

      var i = e._batchedIndices,
          a = i.length;

      for (s = 0; s < a; ++s) {
        i[s].color = C.clone(C.WHITE);
      }

      e._updatingAllCommands = !1, e._batchDirty = !0;
    }(this, t);
  }, _.prototype.updateCommands = function (e, t) {
    if (!this._updatingAllCommands) {
      var r = this._batchIdLookUp,
          a = r[e];

      if (E(a)) {
        for (var s = this._indexOffsets, n = this._indexCounts, i = s[a], o = n[a], c = this._batchedIndices, d = c.length, _ = 0; _ < d; ++_) {
          var h = c[_].offset,
              l = c[_].count;
          if (h <= i && i < h + l) break;
        }

        c.push(new x({
          color: C.clone(t),
          offset: i,
          count: o,
          batchIds: [e]
        }));

        for (var f = [], u = [], m = c[_].batchIds, p = m.length, I = 0; I < p; ++I) {
          var S = m[I];
          S !== e && (s[r[S]] < i ? f.push(S) : u.push(S));
        }

        0 !== u.length && c.push(new x({
          color: C.clone(c[_].color),
          offset: i + o,
          count: c[_].offset + c[_].count - (i + o),
          batchIds: u
        })), 0 !== f.length ? (c[_].count = i - c[_].offset, c[_].batchIds = f) : c.splice(_, 1), this._batchDirty = !0;
      }
    }
  }, _.prototype.update = function (e) {
    var t,
        r,
        a,
        s,
        n,
        i,
        o,
        c,
        d,
        _,
        h = e.context;

    r = h, E((t = this)._va) || (a = p.createVertexBuffer({
      context: r,
      typedArray: t._positions,
      usage: I.STATIC_DRAW
    }), s = p.createVertexBuffer({
      context: r,
      typedArray: t._vertexBatchIds,
      usage: I.STATIC_DRAW
    }), n = p.createIndexBuffer({
      context: r,
      typedArray: t._indices,
      usage: I.DYNAMIC_DRAW,
      indexDatatype: 2 === t._indices.BYTES_PER_ELEMENT ? u.UNSIGNED_SHORT : u.UNSIGNED_INT
    }), i = [{
      index: 0,
      vertexBuffer: a,
      componentDatatype: f.fromTypedArray(t._positions),
      componentsPerAttribute: 3
    }, {
      index: 1,
      vertexBuffer: s,
      componentDatatype: f.fromTypedArray(t._vertexBatchIds),
      componentsPerAttribute: 1
    }], t._va = new y({
      context: r,
      attributes: i,
      indexBuffer: n
    }), r.webgl2 && (t._vaSwap = new y({
      context: r,
      attributes: i,
      indexBuffer: p.createIndexBuffer({
        context: r,
        sizeInBytes: n.sizeInBytes,
        usage: I.DYNAMIC_DRAW,
        indexDatatype: n.indexDatatype
      })
    })), t._batchedPositions = void 0, t._transferrableBatchIds = void 0, t._vertexBatchIds = void 0, t._verticesPromise = void 0), function (e, t) {
      if (!E(e._sp)) {
        var r = e._batchTable,
            a = b(e._attributeLocations, N),
            s = e._pickId,
            n = e._vertexShaderSource,
            i = e._fragmentShaderSource;
        if (E(n)) return e._sp = v.fromCache({
          context: t,
          vertexShaderSource: n,
          fragmentShaderSource: i,
          attributeLocations: a
        }), e._spStencil = e._sp, i = (i = P.replaceMain(i, "czm_non_pick_main")) + "void main() \n{ \n    czm_non_pick_main(); \n    gl_FragColor = " + s + "; \n} \n", e._spPick = v.fromCache({
          context: t,
          vertexShaderSource: n,
          fragmentShaderSource: i,
          attributeLocations: a
        });

        var o = r.getVertexShaderCallback(!1, "a_batchId", void 0)(L),
            c = r.getFragmentShaderCallback()(R, !1, void 0),
            s = r.getPickId(),
            d = new P({
          sources: [o]
        }),
            _ = new P({
          defines: ["VECTOR_TILE"],
          sources: [c]
        });

        e._sp = v.fromCache({
          context: t,
          vertexShaderSource: d,
          fragmentShaderSource: _,
          attributeLocations: a
        }), d = new P({
          sources: [L]
        }), _ = new P({
          defines: ["VECTOR_TILE"],
          sources: [R]
        }), e._spStencil = v.fromCache({
          context: t,
          vertexShaderSource: d,
          fragmentShaderSource: _,
          attributeLocations: a
        }), c = (c = P.replaceMain(c, "czm_non_pick_main")) + "\nvoid main() \n{ \n    czm_non_pick_main(); \n    gl_FragColor = " + s + "; \n} \n";
        var h = new P({
          sources: [o]
        }),
            l = new P({
          defines: ["VECTOR_TILE"],
          sources: [c]
        });
        e._spPick = v.fromCache({
          context: t,
          vertexShaderSource: h,
          fragmentShaderSource: l,
          attributeLocations: a
        });
      }
    }(this, h), E((o = this)._rsStencilPreloadPass) || (o._rsStencilPreloadPass = S.fromCache(w(!1)), o._rsStencilPreloadPass3DTiles = S.fromCache(w(!0)), o._rsStencilDepthPass = S.fromCache(M(!1)), o._rsStencilDepthPass3DTiles = S.fromCache(M(!0)), o._rsColorPass = S.fromCache(k), o._rsPickPass = S.fromCache(O)), d = h, E((c = this)._uniformMap) || (_ = {
      u_modifiedModelViewProjection: function u_modifiedModelViewProjection() {
        var e = d.uniformState.view,
            t = d.uniformState.projection;
        return T.clone(e, F), T.multiplyByPoint(F, c._center, W), T.setTranslation(F, W, F), T.multiply(t, F, F), F;
      },
      u_highlightColor: function u_highlightColor() {
        return c._highlightColor;
      }
    }, c._uniformMap = c._batchTable.getUniformMapCallback()(_));
    var l = e.passes;
    l.render && (function (e, t) {
      var r = V(e, t),
          a = e._commands,
          s = e._batchedIndices,
          n = s.length,
          i = 3 * n;

      if (!E(a) || r || a.length !== i) {
        a.length = i;

        for (var o = e._va, c = e._sp, d = b(e._modelMatrix, T.IDENTITY), _ = e._uniformMap, h = e._boundingVolume, l = 0; l < n; ++l) {
          var f = s[l].offset,
              u = s[l].count,
              m = a[3 * l];
          E(m) || (m = a[3 * l] = new g({
            owner: e
          })), m.vertexArray = o, m.modelMatrix = d, m.offset = f, m.count = u, m.renderState = e._rsStencilPreloadPass, m.shaderProgram = c, m.uniformMap = _, m.boundingVolume = h, m.cull = !1, m.pass = A.TERRAIN_CLASSIFICATION;
          var p = g.shallowClone(m, m.derivedCommands.tileset);
          p.renderState = e._rsStencilPreloadPass3DTiles, p.pass = A.PGEARTH_3D_TILE_CLASSIFICATION, m.derivedCommands.tileset = p;
          var I = a[3 * l + 1];
          E(I) || (I = a[3 * l + 1] = new g({
            owner: e
          })), I.vertexArray = o, I.modelMatrix = d, I.offset = f, I.count = u, I.renderState = e._rsStencilDepthPass, I.shaderProgram = c, I.uniformMap = _, I.boundingVolume = h, I.cull = !1, I.pass = A.TERRAIN_CLASSIFICATION;
          var S = g.shallowClone(I, I.derivedCommands.tileset);
          S.renderState = e._rsStencilDepthPass3DTiles, S.pass = A.PGEARTH_3D_TILE_CLASSIFICATION, I.derivedCommands.tileset = S;
          var C = a[3 * l + 2];
          E(C) || (C = a[3 * l + 2] = new g({
            owner: e
          })), C.vertexArray = o, C.modelMatrix = d, C.offset = f, C.count = u, C.renderState = e._rsColorPass, C.shaderProgram = c, C.uniformMap = _, C.boundingVolume = h, C.cull = !1, C.pass = A.TERRAIN_CLASSIFICATION;
          var v = g.shallowClone(C, C.derivedCommands.tileset);
          v.pass = A.PGEARTH_3D_TILE_CLASSIFICATION, C.derivedCommands.tileset = v;
        }

        e._commandsDirty = !0;
      }
    }(this, h), function (e, t) {
      if (e.classificationType !== D.TERRAIN && t.invertClassification && (!E(e._commandsIgnoreShow) || e._commandsDirty)) {
        for (var r = e._commands, a = e._commandsIgnoreShow, s = e._spStencil, n = r.length, i = a.length = n / 3 * 2, o = 0, c = 0; c < i; c += 2) {
          var d = a[c] = g.shallowClone(r[o], a[c]);
          d.shaderProgram = s, d.pass = A.PGEARTH_3D_TILE_CLASSIFICATION_IGNORE_SHOW, (d = a[c + 1] = g.shallowClone(r[o + 1], a[c + 1])).shaderProgram = s, d.pass = A.PGEARTH_3D_TILE_CLASSIFICATION_IGNORE_SHOW, o += 3;
        }

        e._commandsDirty = !1;
      }
    }(this, e), function (e) {
      var t, r;

      if (!(e.debugWireframe === e._debugWireframe && !(e.debugWireframe && e._wireframeDirty))) {
        E(e._rsWireframe) || (e._rsWireframe = S.fromCache({})), r = e.debugWireframe ? (t = e._rsWireframe, m.LINES) : (t = e._rsColorPass, m.TRIANGLES);

        for (var a = e._commands, s = a.length, n = 0; n < s; n += 3) {
          var i = a[n + 2];
          i.renderState = t, i.primitiveType = r;
        }

        e._debugWireframe = e.debugWireframe, e._wireframeDirty = !1;
      }
    }(this), this._debugWireframe ? function (e, t) {
      for (var r = e.commandList, a = t.length, s = 0; s < a; s += 3) {
        var n = t[s + 2];
        n.pass = A.OPAQUE, r.push(n);
      }
    }(e, this._commands) : G(this, e, this._commands, this._commandsIgnoreShow)), l.pick && (function (e) {
      if (e._pickCommandsDirty) {
        var t = e._indexOffsets.length,
            r = e._pickCommands;
        r.length = 3 * t;

        for (var a = e._va, s = e._spStencil, n = e._spPick, i = b(e._modelMatrix, T.IDENTITY), o = e._uniformMap, c = 0; c < t; ++c) {
          var d = e._indexOffsets[c],
              _ = e._indexCounts[c],
              h = E(e._boundingVolumes) ? e._boundingVolumes[c] : e.boundingVolume,
              l = r[3 * c];
          E(l) || (l = r[3 * c] = new g({
            owner: e,
            pickOnly: !0
          })), l.vertexArray = a, l.modelMatrix = i, l.offset = d, l.count = _, l.renderState = e._rsStencilPreloadPass, l.shaderProgram = s, l.uniformMap = o, l.boundingVolume = h, l.pass = A.TERRAIN_CLASSIFICATION;
          var f = g.shallowClone(l, l.derivedCommands.tileset);
          f.renderState = e._rsStencilPreloadPass3DTiles, f.pass = A.PGEARTH_3D_TILE_CLASSIFICATION, l.derivedCommands.tileset = f;
          var u = r[3 * c + 1];
          E(u) || (u = r[3 * c + 1] = new g({
            owner: e,
            pickOnly: !0
          })), u.vertexArray = a, u.modelMatrix = i, u.offset = d, u.count = _, u.renderState = e._rsStencilDepthPass, u.shaderProgram = s, u.uniformMap = o, u.boundingVolume = h, u.pass = A.TERRAIN_CLASSIFICATION;
          var m = g.shallowClone(u, u.derivedCommands.tileset);
          m.renderState = e._rsStencilDepthPass3DTiles, m.pass = A.PGEARTH_3D_TILE_CLASSIFICATION, u.derivedCommands.tileset = m;
          var p = r[3 * c + 2];
          E(p) || (p = r[3 * c + 2] = new g({
            owner: e,
            pickOnly: !0
          })), p.vertexArray = a, p.modelMatrix = i, p.offset = d, p.count = _, p.renderState = e._rsPickPass, p.shaderProgram = n, p.uniformMap = o, p.boundingVolume = h, p.pass = A.TERRAIN_CLASSIFICATION;
          var I = g.shallowClone(p, p.derivedCommands.tileset);
          I.pass = A.PGEARTH_3D_TILE_CLASSIFICATION, p.derivedCommands.tileset = I;
        }

        e._pickCommandsDirty = !1;
      }
    }(this), G(this, e, this._pickCommands));
  }, _.prototype.isDestroyed = function () {
    return !1;
  }, _.prototype.destroy = function () {
    return this._va = this._va && this._va.destroy(), this._sp = this._sp && this._sp.destroy(), this._spPick = this._spPick && this._spPick.destroy(), this._vaSwap = this._vaSwap && this._vaSwap.destroy(), t(this);
  }, _;
});