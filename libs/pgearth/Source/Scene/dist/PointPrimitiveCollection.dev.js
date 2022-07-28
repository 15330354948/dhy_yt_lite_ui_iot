"use strict";

define(["../Core/BoundingSphere", "../Core/Color", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/EncodedCartesian3", "../Core/Math", "../Core/Matrix4", "../Core/PrimitiveType", "../Core/WebGLConstants", "../Renderer/BufferUsage", "../Renderer/ContextLimits", "../Renderer/DrawCommand", "../Renderer/Pass", "../Renderer/RenderState", "../Renderer/ShaderProgram", "../Renderer/ShaderSource", "../Renderer/VertexArrayFacade", "../Shaders/PointPrimitiveCollectionFS", "../Shaders/PointPrimitiveCollectionVS", "./BlendingState", "./BlendOption", "./PointPrimitive", "./SceneMode"], function (ee, m, te, i, ie, e, t, s, c, l, se, ne, re, r, oe, ae, he, de, _e, pe, ce, le, ue, me, De, u, Te) {
  "use strict";

  var ve = u.SHOW_INDEX,
      Se = u.POSITION_INDEX,
      fe = u.COLOR_INDEX,
      Ae = u.OUTLINE_COLOR_INDEX,
      ye = u.OUTLINE_WIDTH_INDEX,
      Ce = u.PIXEL_SIZE_INDEX,
      Pe = u.SCALE_BY_DISTANCE_INDEX,
      be = u.TRANSLUCENCY_BY_DISTANCE_INDEX,
      Ee = u.DISTANCE_DISPLAY_CONDITION_INDEX,
      xe = u.DISABLE_DEPTH_DISTANCE_INDEX,
      ge = u.NUMBER_OF_PROPERTIES,
      Ne = {
    positionHighAndSize: 0,
    positionLowAndOutline: 1,
    compressedAttribute0: 2,
    compressedAttribute1: 3,
    scaleByDistance: 4,
    distanceDisplayConditionAndDisableDepth: 5
  };

  function n(e) {
    e = i(e, i.EMPTY_OBJECT), this._sp = void 0, this._spTranslucent = void 0, this._rsOpaque = void 0, this._rsTranslucent = void 0, this._vaf = void 0, this._pointPrimitives = [], this._pointPrimitivesToUpdate = [], this._pointPrimitivesToUpdateIndex = 0, this._pointPrimitivesRemoved = !1, this._createVertexArray = !1, this._shaderScaleByDistance = !1, this._compiledShaderScaleByDistance = !1, this._shaderTranslucencyByDistance = !1, this._compiledShaderTranslucencyByDistance = !1, this._shaderDistanceDisplayCondition = !1, this._compiledShaderDistanceDisplayCondition = !1, this._shaderDisableDepthDistance = !1, this._compiledShaderDisableDepthDistance = !1, this._propertiesChanged = new Uint32Array(ge), this._maxPixelSize = 1, this._baseVolume = new ee(), this._baseVolumeWC = new ee(), this._baseVolume2D = new ee(), this._boundingVolume = new ee(), this._boundingVolumeDirty = !1, this._colorCommands = [], this.modelMatrix = se.clone(i(e.modelMatrix, se.IDENTITY)), this._modelMatrix = se.clone(se.IDENTITY), this.debugShowBoundingVolume = i(e.debugShowBoundingVolume, !1), this.blendOption = i(e.blendOption, De.OPAQUE_AND_TRANSLUCENT), this._blendOption = void 0, this._mode = Te.SCENE3D, this._maxTotalPointSize = 1, this._buffersUsage = [r.STATIC_DRAW, r.STATIC_DRAW, r.STATIC_DRAW, r.STATIC_DRAW, r.STATIC_DRAW, r.STATIC_DRAW, r.STATIC_DRAW, r.STATIC_DRAW, r.STATIC_DRAW];
    var t = this;
    this._uniforms = {
      u_maxTotalPointSize: function u_maxTotalPointSize() {
        return t._maxTotalPointSize;
      }
    };
  }

  function o(e) {
    for (var t = e.length, i = 0; i < t; ++i) {
      e[i] && e[i]._destroy();
    }
  }

  function Ie(e) {
    if (e._pointPrimitivesRemoved) {
      e._pointPrimitivesRemoved = !1;

      for (var t = [], i = e._pointPrimitives, s = i.length, n = 0, r = 0; n < s; ++n) {
        var o = i[n];
        o && (o._index = r++, t.push(o));
      }

      e._pointPrimitives = t;
    }
  }

  e(n.prototype, {
    length: {
      get: function get() {
        return Ie(this), this._pointPrimitives.length;
      }
    }
  }), n.prototype.add = function (e) {
    var t = new u(e, this);
    return t._index = this._pointPrimitives.length, this._pointPrimitives.push(t), this._createVertexArray = !0, t;
  }, n.prototype.remove = function (e) {
    return !!this.contains(e) && (this._pointPrimitives[e._index] = null, this._pointPrimitivesRemoved = !0, this._createVertexArray = !0, e._destroy(), !0);
  }, n.prototype.removeAll = function () {
    o(this._pointPrimitives), this._pointPrimitives = [], this._pointPrimitivesToUpdate = [], this._pointPrimitivesToUpdateIndex = 0, this._pointPrimitivesRemoved = !1, this._createVertexArray = !0;
  }, n.prototype._updatePointPrimitive = function (e, t) {
    e._dirty || (this._pointPrimitivesToUpdate[this._pointPrimitivesToUpdateIndex++] = e), ++this._propertiesChanged[t];
  }, n.prototype.contains = function (e) {
    return ie(e) && e._pointPrimitiveCollection === this;
  }, n.prototype.get = function (e) {
    if (!ie(e)) throw new s("index is required.");
    return Ie(this), this._pointPrimitives[e];
  }, n.prototype.computeNewBuffersUsage = function () {
    for (var e = this._buffersUsage, t = !1, i = this._propertiesChanged, s = 0; s < ge; ++s) {
      var n = 0 === i[s] ? r.STATIC_DRAW : r.STREAM_DRAW,
          t = t || e[s] !== n;
      e[s] = n;
    }

    return t;
  };
  var D = new c();

  function Oe(e, t, i, s) {
    var n = s._index,
        r = s._getActualPosition();

    e._mode === Te.SCENE3D && (ee.expand(e._baseVolume, r, e._baseVolume), e._boundingVolumeDirty = !0), c.fromCartesian(r, D);
    var o = s.pixelSize,
        a = s.outlineWidth;
    e._maxPixelSize = Math.max(e._maxPixelSize, o + a);
    var h = i[Ne.positionHighAndSize],
        d = D.high;
    h(n, d.x, d.y, d.z, o);
    var _ = i[Ne.positionLowAndOutline],
        p = D.low;

    _(n, p.x, p.y, p.z, a);
  }

  var T = 65536,
      v = 256;

  function Be(e, t, i, s) {
    var n = s._index,
        r = s.color,
        o = s.getPickId(t).color,
        a = s.outlineColor,
        h = m.floatToByte(r.red),
        d = m.floatToByte(r.green),
        _ = m.floatToByte(r.blue),
        p = h * T + d * v + _,
        h = m.floatToByte(a.red),
        d = m.floatToByte(a.green),
        _ = m.floatToByte(a.blue),
        c = h * T + d * v + _;

    h = m.floatToByte(o.red), d = m.floatToByte(o.green), _ = m.floatToByte(o.blue);
    var l = h * T + d * v + _,
        u = m.floatToByte(r.alpha) * T + m.floatToByte(a.alpha) * v + m.floatToByte(o.alpha);
    (0, i[Ne.compressedAttribute0])(n, p, c, l, u);
  }

  function Ue(e, t, i, s) {
    var n = s._index,
        r = 0,
        o = 1,
        a = 1,
        h = 1,
        d = s.translucencyByDistance;
    ie(d) && (r = d.near, o = d.nearValue, a = d.far, h = d.farValue, 1 === o && 1 === h || (e._shaderTranslucencyByDistance = !0));

    var _ = s.show && s.clusterShow;

    0 === s.color.alpha && 0 === s.outlineColor.alpha && (_ = !1), o = l.clamp(o, 0, 1);
    var p = (_ ? 1 : 0) * v + (o = 1 === o ? 255 : 255 * o | 0);
    h = 1 === (h = l.clamp(h, 0, 1)) ? 255 : 255 * h | 0, (0, i[Ne.compressedAttribute1])(n, p, h, r, a);
  }

  function Le(e, t, i, s) {
    var n = s._index,
        r = i[Ne.scaleByDistance],
        o = 0,
        a = 1,
        h = 1,
        d = 1,
        _ = s.scaleByDistance;
    ie(_) && (o = _.near, a = _.nearValue, h = _.far, d = _.farValue, 1 === a && 1 === d || (e._shaderScaleByDistance = !0)), r(n, o, a, h, d);
  }

  function Re(e, t, i, s) {
    var n = s._index,
        r = i[Ne.distanceDisplayConditionAndDisableDepth],
        o = 0,
        a = Number.MAX_VALUE,
        h = s.distanceDisplayCondition;
    ie(h) && (o = h.near, a = h.far, o *= o, a *= a, e._shaderDistanceDisplayCondition = !0);
    var d = s.disableDepthTestDistance;
    0 < (d *= d) && (e._shaderDisableDepthDistance = !0, d === Number.POSITIVE_INFINITY && (d = -1)), r(n, o, a, d);
  }

  function Ve(e, t, i, s, n, r) {
    var o;
    s.mode === Te.SCENE3D ? (o = e._baseVolume, e._boundingVolumeDirty = !0) : o = e._baseVolume2D;

    for (var a = [], h = 0; h < i; ++h) {
      var d = t[h],
          _ = d.position,
          p = u._computeActualPosition(_, s, n);

      ie(p) && (d._setActualPosition(p), r ? a.push(p) : ee.expand(o, p, o));
    }

    r && ee.fromPoints(a, o);
  }

  var we = [];
  return n.prototype.update = function (e) {
    var t, i, s, n, r, o;
    Ie(this), this._maxTotalPointSize = oe.maximumAliasedPointSize, t = this, s = (i = e).mode, n = t._pointPrimitives, r = t._pointPrimitivesToUpdate, o = t._modelMatrix, t._createVertexArray || t._mode !== s || s !== Te.SCENE3D && !se.equals(o, t.modelMatrix) ? (t._mode = s, se.clone(t.modelMatrix, o), t._createVertexArray = !0, s !== Te.SCENE3D && s !== Te.SCENE2D && s !== Te.COLUMBUS_VIEW || Ve(t, n, n.length, i, o, !0)) : s === Te.MORPHING ? Ve(t, n, n.length, i, o, !0) : s !== Te.SCENE2D && s !== Te.COLUMBUS_VIEW || Ve(t, r, t._pointPrimitivesToUpdateIndex, i, o, !1);

    var a,
        h,
        d,
        _,
        p,
        c,
        l,
        u = this._pointPrimitives.length,
        m = this._pointPrimitivesToUpdate,
        D = this._pointPrimitivesToUpdateIndex,
        T = this._propertiesChanged,
        v = this._createVertexArray,
        S = e.context,
        f = e.passes,
        A = f.pick;

    if (v || !A && this.computeNewBuffersUsage()) {
      this._createVertexArray = !1;

      for (var y = 0; y < ge; ++y) {
        T[y] = 0;
      }

      if (this._vaf = this._vaf && this._vaf.destroy(), 0 < u) {
        this._vaf = (p = S, c = u, l = this._buffersUsage, new ce(p, [{
          index: Ne.positionHighAndSize,
          componentsPerAttribute: 4,
          componentDatatype: te.FLOAT,
          usage: l[Se]
        }, {
          index: Ne.positionLowAndShow,
          componentsPerAttribute: 4,
          componentDatatype: te.FLOAT,
          usage: l[Se]
        }, {
          index: Ne.compressedAttribute0,
          componentsPerAttribute: 4,
          componentDatatype: te.FLOAT,
          usage: l[fe]
        }, {
          index: Ne.compressedAttribute1,
          componentsPerAttribute: 4,
          componentDatatype: te.FLOAT,
          usage: l[be]
        }, {
          index: Ne.scaleByDistance,
          componentsPerAttribute: 4,
          componentDatatype: te.FLOAT,
          usage: l[Pe]
        }, {
          index: Ne.distanceDisplayConditionAndDisableDepth,
          componentsPerAttribute: 3,
          componentDatatype: te.FLOAT,
          usage: l[Ee]
        }], c)), x = this._vaf.writers;

        for (var C = 0; C < u; ++C) {
          var P = this._pointPrimitives[C];
          P._dirty = !1, h = S, Oe(a = this, 0, d = x, _ = P), Be(0, h, d, _), Ue(a, 0, d, _), Le(a, 0, d, _), Re(a, 0, d, _);
        }

        this._vaf.commit();
      }

      this._pointPrimitivesToUpdateIndex = 0;
    } else if (0 < D) {
      var b = we;
      b.length = 0, (T[Se] || T[ye] || T[Ce]) && b.push(Oe), (T[fe] || T[Ae]) && b.push(Be), (T[ve] || T[be]) && b.push(Ue), T[Pe] && b.push(Le), (T[Ee] || T[xe]) && b.push(Re);
      var E = b.length,
          x = this._vaf.writers;

      if (.1 < D / u) {
        for (var g = 0; g < D; ++g) {
          var N = m[g];
          N._dirty = !1;

          for (var I = 0; I < E; ++I) {
            b[I](this, S, x, N);
          }
        }

        this._vaf.commit();
      } else {
        for (var O = 0; O < D; ++O) {
          var B = m[O];
          B._dirty = !1;

          for (var U = 0; U < E; ++U) {
            b[U](this, S, x, B);
          }

          this._vaf.subCommit(B._index, 1);
        }

        this._vaf.endSubCommits();
      }

      this._pointPrimitivesToUpdateIndex = 0;
    }

    if (1.5 * u < D && (m.length = u), ie(this._vaf) && ie(this._vaf.va)) {
      this._boundingVolumeDirty && (this._boundingVolumeDirty = !1, ee.transform(this._baseVolume, this.modelMatrix, this._baseVolumeWC));
      var L,
          R,
          V,
          w,
          M = se.IDENTITY,
          W = e.mode === Te.SCENE3D ? (M = this.modelMatrix, ee.clone(this._baseVolumeWC, this._boundingVolume)) : ee.clone(this._baseVolume2D, this._boundingVolume);
      L = this, V = W, w = (R = e).camera.getPixelSize(V, R.context.drawingBufferWidth, R.context.drawingBufferHeight) * L._maxPixelSize, V.radius += w;
      var z,
          Y,
          Q = this._blendOption !== this.blendOption;
      this._blendOption = this.blendOption, Q && (this._blendOption === De.OPAQUE || this._blendOption === De.OPAQUE_AND_TRANSLUCENT ? this._rsOpaque = de.fromCache({
        depthTest: {
          enabled: !0,
          func: re.LEQUAL
        },
        depthMask: !0
      }) : this._rsOpaque = void 0, this._blendOption === De.TRANSLUCENT || this._blendOption === De.OPAQUE_AND_TRANSLUCENT ? this._rsTranslucent = de.fromCache({
        depthTest: {
          enabled: !0,
          func: re.LEQUAL
        },
        depthMask: !1,
        blending: me.ALPHA_BLEND
      }) : this._rsTranslucent = void 0), this._shaderDisableDepthDistance = this._shaderDisableDepthDistance || 0 !== e.minimumDisableDepthTestDistance, (Q || this._shaderScaleByDistance && !this._compiledShaderScaleByDistance || this._shaderTranslucencyByDistance && !this._compiledShaderTranslucencyByDistance || this._shaderDistanceDisplayCondition && !this._compiledShaderDistanceDisplayCondition || this._shaderDisableDepthDistance !== this._compiledShaderDisableDepthDistance) && (z = new pe({
        sources: [ue]
      }), this._shaderScaleByDistance && z.defines.push("EYE_DISTANCE_SCALING"), this._shaderTranslucencyByDistance && z.defines.push("EYE_DISTANCE_TRANSLUCENCY"), this._shaderDistanceDisplayCondition && z.defines.push("DISTANCE_DISPLAY_CONDITION"), this._shaderDisableDepthDistance && z.defines.push("DISABLE_DEPTH_DISTANCE"), this._blendOption === De.OPAQUE_AND_TRANSLUCENT && (Y = new pe({
        defines: ["OPAQUE"],
        sources: [le]
      }), this._sp = _e.replaceCache({
        context: S,
        shaderProgram: this._sp,
        vertexShaderSource: z,
        fragmentShaderSource: Y,
        attributeLocations: Ne
      }), Y = new pe({
        defines: ["TRANSLUCENT"],
        sources: [le]
      }), this._spTranslucent = _e.replaceCache({
        context: S,
        shaderProgram: this._spTranslucent,
        vertexShaderSource: z,
        fragmentShaderSource: Y,
        attributeLocations: Ne
      })), this._blendOption === De.OPAQUE && (Y = new pe({
        sources: [le]
      }), this._sp = _e.replaceCache({
        context: S,
        shaderProgram: this._sp,
        vertexShaderSource: z,
        fragmentShaderSource: Y,
        attributeLocations: Ne
      })), this._blendOption === De.TRANSLUCENT && (Y = new pe({
        sources: [le]
      }), this._spTranslucent = _e.replaceCache({
        context: S,
        shaderProgram: this._spTranslucent,
        vertexShaderSource: z,
        fragmentShaderSource: Y,
        attributeLocations: Ne
      })), this._compiledShaderScaleByDistance = this._shaderScaleByDistance, this._compiledShaderTranslucencyByDistance = this._shaderTranslucencyByDistance, this._compiledShaderDistanceDisplayCondition = this._shaderDistanceDisplayCondition, this._compiledShaderDisableDepthDistance = this._shaderDisableDepthDistance);
      var X = e.commandList;

      if (f.render || A) {
        var F,
            H = this._colorCommands,
            k = this._blendOption === De.OPAQUE,
            q = this._blendOption === De.OPAQUE_AND_TRANSLUCENT,
            G = (F = this._vaf.va).length;
        H.length = G;

        for (var j = q ? 2 * G : G, J = 0; J < j; ++J) {
          var Z = k || q && J % 2 == 0,
              K = H[J];
          ie(K) || (K = H[J] = new ae()), K.primitiveType = ne.POINTS, K.pass = Z || !q ? he.OPAQUE : he.TRANSLUCENT, K.owner = this;
          var $ = q ? Math.floor(J / 2) : J;
          K.boundingVolume = W, K.modelMatrix = M, K.shaderProgram = Z ? this._sp : this._spTranslucent, K.uniformMap = this._uniforms, K.vertexArray = F[$].va, K.renderState = Z ? this._rsOpaque : this._rsTranslucent, K.debugShowBoundingVolume = this.debugShowBoundingVolume, K.pickId = "v_pickColor", X.push(K);
        }
      }
    }
  }, n.prototype.isDestroyed = function () {
    return !1;
  }, n.prototype.destroy = function () {
    return this._sp = this._sp && this._sp.destroy(), this._spTranslucent = this._spTranslucent && this._spTranslucent.destroy(), this._spPick = this._spPick && this._spPick.destroy(), this._vaf = this._vaf && this._vaf.destroy(), o(this._pointPrimitives), t(this);
  }, n;
});