"use strict";

define(["../Core/arraySlice", "../Core/Cartesian3", "../Core/Color", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/Ellipsoid", "../Core/FeatureDetection", "../Core/IndexDatatype", "../Core/Matrix4", "../Core/Rectangle", "../Core/TaskProcessor", "../Renderer/Buffer", "../Renderer/BufferUsage", "../Renderer/DrawCommand", "../Renderer/Pass", "../Renderer/RenderState", "../Renderer/ShaderProgram", "../Renderer/ShaderSource", "../Renderer/VertexArray", "../Shaders/PolylineCommon", "../Shaders/Vector3DTilePolylinesVS", "../ThirdParty/when", "./BlendingState", "./PGEarth3DTileFeature"], function (k, E, s, V, t, W, e, r, H, g, F, m, N, i, O, M, v, y, b, x, P, U, A, C, G, T, a) {
  "use strict";

  function o(e) {
    this._positions = e.positions, this._widths = e.widths, this._counts = e.counts, this._batchIds = e.batchIds, this._ellipsoid = t(e.ellipsoid, H.WGS84), this._minimumHeight = e.minimumHeight, this._maximumHeight = e.maximumHeight, this._center = e.center, this._rectangle = e.rectangle, this._boundingVolume = e.boundingVolume, this._batchTable = e.batchTable, this._va = void 0, this._sp = void 0, this._rs = void 0, this._uniformMap = void 0, this._command = void 0, this._transferrableBatchIds = void 0, this._packedBuffer = void 0, this._currentPositions = void 0, this._previousPositions = void 0, this._nextPositions = void 0, this._expandAndWidth = void 0, this._vertexBatchIds = void 0, this._indices = void 0, this._constantColor = s.clone(s.WHITE), this._highlightColor = this._constantColor, this._trianglesLength = 0, this._geometryByteLength = 0, this._ready = !1, this._readyPromise = G.defer(), this._verticesPromise = void 0;
  }

  e(o.prototype, {
    trianglesLength: {
      get: function get() {
        return this._trianglesLength;
      }
    },
    geometryByteLength: {
      get: function get() {
        return this._geometryByteLength;
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise.promise;
      }
    }
  });
  var Y = new i("createVectorTilePolylines"),
      j = {
    previousPosition: 0,
    currentPosition: 1,
    nextPosition: 2,
    expandAndWidth: 3,
    a_batchId: 4
  };

  function I(r, e) {
    if (!W(r._va)) {
      if (!W(r._verticesPromise)) {
        var t = r._positions,
            i = r._widths,
            o = r._counts,
            n = r._transferrableBatchIds,
            s = r._packedBuffer;
        W(s) || (t = r._positions = k(t), i = r._widths = k(i), o = r._counts = k(o), n = r._transferrableBatchIds = k(r._batchIds), s = r._packedBuffer = (_ = (c = r)._rectangle, u = c._minimumHeight, p = c._maximumHeight, f = c._ellipsoid, l = c._center, g = 2 + N.packedLength + H.packedLength + E.packedLength, m = new Float64Array(g), v = 0, m[v++] = u, m[v++] = p, N.pack(_, m, v), v += N.packedLength, H.pack(f, m, v), v += H.packedLength, E.pack(l, m, v), m));
        var a = [t.buffer, i.buffer, o.buffer, n.buffer, s.buffer],
            d = {
          positions: t.buffer,
          widths: i.buffer,
          counts: o.buffer,
          batchIds: n.buffer,
          packedBuffer: s.buffer
        },
            h = r._verticesPromise = Y.scheduleTask(d, a);
        if (!W(h)) return;
        G(h, function (e) {
          r._currentPositions = new Float32Array(e.currentPositions), r._previousPositions = new Float32Array(e.previousPositions), r._nextPositions = new Float32Array(e.nextPositions), r._expandAndWidth = new Float32Array(e.expandAndWidth), r._vertexBatchIds = new Uint16Array(e.batchIds);
          var t = e.indexDatatype;
          r._indices = new (t === F.UNSIGNED_SHORT ? Uint16Array : Uint32Array)(e.indices), r._ready = !0;
        });
      }

      var c, _, u, p, f, l, g, m, v, y, b, x, P, A, C, T, I, B, S, L, w, D, R;

      r._ready && !W(r._va) && (y = r._currentPositions, b = r._previousPositions, x = r._nextPositions, P = r._expandAndWidth, A = r._vertexBatchIds, C = r._indices, T = b.byteLength + y.byteLength + x.byteLength, T += P.byteLength + A.byteLength + C.byteLength, r._trianglesLength = C.length / 3, r._geometryByteLength = T, I = O.createVertexBuffer({
        context: e,
        typedArray: b,
        usage: M.STATIC_DRAW
      }), B = O.createVertexBuffer({
        context: e,
        typedArray: y,
        usage: M.STATIC_DRAW
      }), S = O.createVertexBuffer({
        context: e,
        typedArray: x,
        usage: M.STATIC_DRAW
      }), L = O.createVertexBuffer({
        context: e,
        typedArray: P,
        usage: M.STATIC_DRAW
      }), w = O.createVertexBuffer({
        context: e,
        typedArray: A,
        usage: M.STATIC_DRAW
      }), D = O.createIndexBuffer({
        context: e,
        typedArray: C,
        usage: M.STATIC_DRAW,
        indexDatatype: 2 === C.BYTES_PER_ELEMENT ? F.UNSIGNED_SHORT : F.UNSIGNED_INT
      }), R = [{
        index: j.previousPosition,
        vertexBuffer: I,
        componentDatatype: V.FLOAT,
        componentsPerAttribute: 3
      }, {
        index: j.currentPosition,
        vertexBuffer: B,
        componentDatatype: V.FLOAT,
        componentsPerAttribute: 3
      }, {
        index: j.nextPosition,
        vertexBuffer: S,
        componentDatatype: V.FLOAT,
        componentsPerAttribute: 3
      }, {
        index: j.expandAndWidth,
        vertexBuffer: L,
        componentDatatype: V.FLOAT,
        componentsPerAttribute: 2
      }, {
        index: j.a_batchId,
        vertexBuffer: w,
        componentDatatype: V.UNSIGNED_SHORT,
        componentsPerAttribute: 1
      }], r._va = new U({
        context: e,
        attributes: R,
        indexBuffer: D
      }), r._positions = void 0, r._widths = void 0, r._counts = void 0, r._ellipsoid = void 0, r._minimumHeight = void 0, r._maximumHeight = void 0, r._rectangle = void 0, r._transferrableBatchIds = void 0, r._packedBuffer = void 0, r._currentPositions = void 0, r._previousPositions = void 0, r._nextPositions = void 0, r._expandAndWidth = void 0, r._vertexBatchIds = void 0, r._indices = void 0, r._readyPromise.resolve());
    }
  }

  var B = new m(),
      S = new E();
  o.prototype.createFeatures = function (e, t) {
    for (var r = this._batchIds, i = r.length, o = 0; o < i; ++o) {
      var n = r[o];
      t[n] = new a(e, n);
    }
  }, o.prototype.applyDebugSettings = function (e, t) {
    this._highlightColor = e ? t : this._constantColor;
  };
  var d = new s(),
      h = s.WHITE;
  return o.prototype.applyStyle = function (e, t) {
    if (W(e)) for (var r = this._batchIds, i = r.length, o = 0; o < i; ++o) {
      var n = t[r[o]];
      n.color = W(e.color) ? e.color.evaluateColor(n, d) : h, n.show = !W(e.show) || e.show.evaluate(n);
    } else !function (e, t) {
      for (var r = e._batchIds, i = r.length, o = 0; o < i; ++o) {
        var n = t[r[o]];
        n.show = !0, n.color = s.WHITE;
      }
    }(this, t);
  }, o.prototype.update = function (e) {
    var t,
        r,
        i,
        o,
        n,
        s,
        a,
        d,
        h,
        c,
        _,
        u,
        p,
        f,
        l = e.context;

    I(this, l), r = l, W((t = this)._uniformMap) || (t._uniformMap = {
      u_modifiedModelView: function u_modifiedModelView() {
        var e = r.uniformState.view;
        return m.clone(e, B), m.multiplyByPoint(B, t._center, S), m.setTranslation(B, S, B), B;
      },
      u_highlightColor: function u_highlightColor() {
        return t._highlightColor;
      }
    }), o = l, W((i = this)._sp) || (s = (n = i._batchTable).getVertexShaderCallback(!1, "a_batchId", void 0)(C), a = n.getFragmentShaderCallback()("uniform vec4 u_highlightColor; \nvoid main()\n{\n    gl_FragColor = u_highlightColor;\n}\n", !1, void 0), d = new P({
      defines: ["VECTOR_TILE", g.isInternetExplorer() ? "" : "CLIP_POLYLINE"],
      sources: [A, s]
    }), h = new P({
      defines: ["VECTOR_TILE"],
      sources: [a]
    }), i._sp = x.fromCache({
      context: o,
      vertexShaderSource: d,
      fragmentShaderSource: h,
      attributeLocations: j
    })), W((c = this)._rs) || (c._rs = b.fromCache({
      blending: T.ALPHA_BLEND,
      depthMask: !1,
      depthTest: {
        enabled: !0
      },
      polygonOffset: {
        enabled: !0,
        factor: -5,
        units: -5
      }
    })), !this._ready || ((_ = e.passes).render || _.pick) && (p = e, W((u = this)._command) || (f = u._batchTable.getUniformMapCallback()(u._uniformMap), u._command = new v({
      owner: u,
      vertexArray: u._va,
      renderState: u._rs,
      shaderProgram: u._sp,
      uniformMap: f,
      boundingVolume: u._boundingVolume,
      pass: y.TRANSLUCENT,
      pickId: u._batchTable.getPickId()
    })), p.commandList.push(u._command));
  }, o.prototype.isDestroyed = function () {
    return !1;
  }, o.prototype.destroy = function () {
    return this._va = this._va && this._va.destroy(), this._sp = this._sp && this._sp.destroy(), r(this);
  }, o;
});