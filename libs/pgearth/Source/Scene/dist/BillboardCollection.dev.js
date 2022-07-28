"use strict";

define(["../Core/AttributeCompression", "../Core/BoundingSphere", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Color", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/EncodedCartesian3", "../Core/IndexDatatype", "../Core/Math", "../Core/Matrix4", "../Core/WebGLConstants", "../Renderer/Buffer", "../Renderer/BufferUsage", "../Renderer/ContextLimits", "../Renderer/DrawCommand", "../Renderer/Pass", "../Renderer/RenderState", "../Renderer/ShaderProgram", "../Renderer/ShaderSource", "../Renderer/VertexArrayFacade", "../Shaders/BillboardCollectionFS", "../Shaders/BillboardCollectionVS", "./Billboard", "./BlendingState", "./BlendOption", "./HeightReference", "./HorizontalOrigin", "./SceneMode", "./TextureAtlas", "./VerticalOrigin"], function (P, ie, e, y, E, d, v, ae, t, i, L, u, r, U, se, re, l, h, ne, oe, de, le, he, _e, _, ce, ue, c, pe, fe, C, V, be, xe, w) {
  "use strict";

  var me,
      Te,
      Ae = c.SHOW_INDEX,
      De = c.POSITION_INDEX,
      Ce = c.PIXEL_OFFSET_INDEX,
      Se = c.EYE_OFFSET_INDEX,
      ye = c.HORIZONTAL_ORIGIN_INDEX,
      Ee = c.VERTICAL_ORIGIN_INDEX,
      ve = c.SCALE_INDEX,
      ge = c.IMAGE_INDEX_INDEX,
      Ie = c.COLOR_INDEX,
      Oe = c.ROTATION_INDEX,
      Ne = c.ALIGNED_AXIS_INDEX,
      Re = c.SCALE_BY_DISTANCE_INDEX,
      Be = c.TRANSLUCENCY_BY_DISTANCE_INDEX,
      Pe = c.PIXEL_OFFSET_SCALE_BY_DISTANCE_INDEX,
      Le = c.DISTANCE_DISPLAY_CONDITION,
      Ue = c.DISABLE_DEPTH_DISTANCE,
      p = c.TEXTURE_COORDINATE_BOUNDS,
      Ve = c.NUMBER_OF_PROPERTIES,
      we = {
    positionHighAndScale: 0,
    positionLowAndRotation: 1,
    compressedAttribute0: 2,
    compressedAttribute1: 3,
    compressedAttribute2: 4,
    eyeOffset: 5,
    scaleByDistance: 6,
    pixelOffsetScaleByDistance: 7,
    compressedAttribute3: 8,
    textureCoordinateBoundsOrLabelTranslate: 9,
    a_batchId: 10
  },
      Me = {
    direction: 0,
    positionHighAndScale: 1,
    positionLowAndRotation: 2,
    compressedAttribute0: 3,
    compressedAttribute1: 4,
    compressedAttribute2: 5,
    eyeOffset: 6,
    scaleByDistance: 7,
    pixelOffsetScaleByDistance: 8,
    compressedAttribute3: 9,
    textureCoordinateBoundsOrLabelTranslate: 10,
    a_batchId: 11
  };

  function a(e) {
    e = v(e, v.EMPTY_OBJECT), this._scene = e.scene, this._batchTable = e.batchTable, this._textureAtlas = void 0, this._textureAtlasGUID = void 0, this._destroyTextureAtlas = !0, this._sp = void 0, this._spTranslucent = void 0, this._rsOpaque = void 0, this._rsTranslucent = void 0, this._vaf = void 0, this._billboards = [], this._billboardsToUpdate = [], this._billboardsToUpdateIndex = 0, this._billboardsRemoved = !1, this._createVertexArray = !1, this._shaderRotation = !1, this._compiledShaderRotation = !1, this._shaderAlignedAxis = !1, this._compiledShaderAlignedAxis = !1, this._shaderScaleByDistance = !1, this._compiledShaderScaleByDistance = !1, this._shaderTranslucencyByDistance = !1, this._compiledShaderTranslucencyByDistance = !1, this._shaderPixelOffsetScaleByDistance = !1, this._compiledShaderPixelOffsetScaleByDistance = !1, this._shaderDistanceDisplayCondition = !1, this._compiledShaderDistanceDisplayCondition = !1, this._shaderDisableDepthDistance = !1, this._compiledShaderDisableDepthDistance = !1, this._shaderClampToGround = !1, this._compiledShaderClampToGround = !1, this._propertiesChanged = new Uint32Array(Ve), this._maxSize = 0, this._maxEyeOffset = 0, this._maxScale = 1, this._maxPixelOffset = 0, this._allHorizontalCenter = !0, this._allVerticalCenter = !0, this._allSizedInMeters = !0, this._baseVolume = new ie(), this._baseVolumeWC = new ie(), this._baseVolume2D = new ie(), this._boundingVolume = new ie(), this._boundingVolumeDirty = !1, this._colorCommands = [], this.modelMatrix = se.clone(v(e.modelMatrix, se.IDENTITY)), this._modelMatrix = se.clone(se.IDENTITY), this.debugShowBoundingVolume = v(e.debugShowBoundingVolume, !1), this.blendOption = v(e.blendOption, fe.OPAQUE_AND_TRANSLUCENT), this._blendOption = void 0, this._mode = be.SCENE3D, this._buffersUsage = [h.STATIC_DRAW, h.STATIC_DRAW, h.STATIC_DRAW, h.STATIC_DRAW, h.STATIC_DRAW, h.STATIC_DRAW, h.STATIC_DRAW, h.STATIC_DRAW, h.STATIC_DRAW, h.STATIC_DRAW, h.STATIC_DRAW, h.STATIC_DRAW, h.STATIC_DRAW, h.STATIC_DRAW, h.STATIC_DRAW, h.STATIC_DRAW], this._highlightColor = E.clone(E.WHITE);
    var t = this;
    this._uniforms = {
      u_atlas: function u_atlas() {
        return t._textureAtlas.texture;
      },
      u_highlightColor: function u_highlightColor() {
        return t._highlightColor;
      }
    };
    var i = this._scene;
    ae(i) && ae(i.terrainProviderChanged) && (this._removeCallbackFunc = i.terrainProviderChanged.addEventListener(function () {
      for (var e = this._billboards, t = e.length, i = 0; i < t; ++i) {
        e[i]._updateClamping();
      }
    }, this));
  }

  function s(e) {
    for (var t = e.length, i = 0; i < t; ++i) {
      e[i] && e[i]._destroy();
    }
  }

  function He(e) {
    if (e._billboardsRemoved) {
      e._billboardsRemoved = !1;

      for (var t = [], i = e._billboards, a = i.length, s = 0, r = 0; s < a; ++s) {
        var n = i[s];
        n && (n._index = r++, t.push(n));
      }

      e._billboards = t;
    }
  }

  function Fe(e) {
    var t = e.cache.billboardCollection_indexBufferBatched;
    if (ae(t)) return t;

    for (var i = new Uint16Array(98298), a = 0, s = 0; a < 98298; a += 6, s += 4) {
      i[a] = s, i[a + 1] = s + 1, i[a + 2] = s + 2, i[a + 3] = s + 0, i[a + 4] = s + 2, i[a + 5] = s + 3;
    }

    return (t = l.createIndexBuffer({
      context: e,
      typedArray: i,
      usage: h.STATIC_DRAW,
      indexDatatype: r.UNSIGNED_SHORT
    })).vertexArrayDestroyable = !1, e.cache.billboardCollection_indexBufferBatched = t;
  }

  function Ge(e) {
    var t = e.cache.billboardCollection_indexBufferInstanced;
    return ae(t) ? t : ((t = l.createIndexBuffer({
      context: e,
      typedArray: new Uint16Array([0, 1, 2, 0, 2, 3]),
      usage: h.STATIC_DRAW,
      indexDatatype: r.UNSIGNED_SHORT
    })).vertexArrayDestroyable = !1, e.cache.billboardCollection_indexBufferInstanced = t);
  }

  function We(e, t, i, a, s) {
    var r,
        n,
        o = [{
      index: me.positionHighAndScale,
      componentsPerAttribute: 4,
      componentDatatype: d.FLOAT,
      usage: i[De]
    }, {
      index: me.positionLowAndRotation,
      componentsPerAttribute: 4,
      componentDatatype: d.FLOAT,
      usage: i[De]
    }, {
      index: me.compressedAttribute0,
      componentsPerAttribute: 4,
      componentDatatype: d.FLOAT,
      usage: i[Ce]
    }, {
      index: me.compressedAttribute1,
      componentsPerAttribute: 4,
      componentDatatype: d.FLOAT,
      usage: i[Be]
    }, {
      index: me.compressedAttribute2,
      componentsPerAttribute: 4,
      componentDatatype: d.FLOAT,
      usage: i[Ie]
    }, {
      index: me.eyeOffset,
      componentsPerAttribute: 4,
      componentDatatype: d.FLOAT,
      usage: i[Se]
    }, {
      index: me.scaleByDistance,
      componentsPerAttribute: 4,
      componentDatatype: d.FLOAT,
      usage: i[Re]
    }, {
      index: me.pixelOffsetScaleByDistance,
      componentsPerAttribute: 4,
      componentDatatype: d.FLOAT,
      usage: i[Pe]
    }, {
      index: me.compressedAttribute3,
      componentsPerAttribute: 4,
      componentDatatype: d.FLOAT,
      usage: i[Le]
    }, {
      index: me.textureCoordinateBoundsOrLabelTranslate,
      componentsPerAttribute: 4,
      componentDatatype: d.FLOAT,
      usage: i[p]
    }];
    return a && o.push({
      index: me.direction,
      componentsPerAttribute: 2,
      componentDatatype: d.FLOAT,
      vertexBuffer: (n = (r = e).cache.billboardCollection_vertexBufferInstanced, ae(n) ? n : ((n = l.createVertexBuffer({
        context: r,
        typedArray: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
        usage: h.STATIC_DRAW
      })).vertexArrayDestroyable = !1, r.cache.billboardCollection_vertexBufferInstanced = n))
    }), ae(s) && o.push({
      index: me.a_batchId,
      componentsPerAttribute: 1,
      componentDatatyps: d.FLOAT,
      bufferUsage: h.STATIC_DRAW
    }), new _(e, o, a ? t : 4 * t, a);
  }

  t(a.prototype, {
    length: {
      get: function get() {
        return He(this), this._billboards.length;
      }
    },
    textureAtlas: {
      get: function get() {
        return this._textureAtlas;
      },
      set: function set(e) {
        this._textureAtlas !== e && (this._textureAtlas = this._destroyTextureAtlas && this._textureAtlas && this._textureAtlas.destroy(), this._textureAtlas = e, this._createVertexArray = !0);
      }
    },
    destroyTextureAtlas: {
      get: function get() {
        return this._destroyTextureAtlas;
      },
      set: function set(e) {
        this._destroyTextureAtlas = e;
      }
    }
  }), a.prototype.add = function (e) {
    var t = new c(e, this);
    return t._index = this._billboards.length, this._billboards.push(t), this._createVertexArray = !0, t;
  }, a.prototype.remove = function (e) {
    return !!this.contains(e) && (this._billboards[e._index] = null, this._billboardsRemoved = !0, this._createVertexArray = !0, e._destroy(), !0);
  }, a.prototype.removeAll = function () {
    s(this._billboards), this._billboards = [], this._billboardsToUpdate = [], this._billboardsToUpdateIndex = 0, this._billboardsRemoved = !1, this._createVertexArray = !0;
  }, a.prototype._updateBillboard = function (e, t) {
    e._dirty || (this._billboardsToUpdate[this._billboardsToUpdateIndex++] = e), ++this._propertiesChanged[t];
  }, a.prototype.contains = function (e) {
    return ae(e) && e._billboardCollection === this;
  }, a.prototype.get = function (e) {
    if (!ae(e)) throw new L("index is required.");
    return He(this), this._billboards[e];
  }, a.prototype.computeNewBuffersUsage = function () {
    for (var e = this._buffersUsage, t = !1, i = this._propertiesChanged, a = 0; a < Ve; ++a) {
      var s = 0 === i[a] ? h.STATIC_DRAW : h.STREAM_DRAW,
          t = t || e[a] !== s;
      e[a] = s;
    }

    return t;
  };
  var f = new u();

  function ze(e, t, i, a, s) {
    var r,
        n = a[me.positionHighAndScale],
        o = a[me.positionLowAndRotation],
        d = s._getActualPosition();

    e._mode === be.SCENE3D && (ie.expand(e._baseVolume, d, e._baseVolume), e._boundingVolumeDirty = !0), u.fromCartesian(d, f);
    var l = s.scale,
        h = s.rotation;
    0 !== h && (e._shaderRotation = !0), e._maxScale = Math.max(e._maxScale, l);
    var _ = f.high,
        c = f.low;
    e._instanced ? (n(r = s._index, _.x, _.y, _.z, l), o(r, c.x, c.y, c.z, h)) : (n((r = 4 * s._index) + 0, _.x, _.y, _.z, l), n(r + 1, _.x, _.y, _.z, l), n(r + 2, _.x, _.y, _.z, l), n(r + 3, _.x, _.y, _.z, l), o(r + 0, c.x, c.y, c.z, h), o(r + 1, c.x, c.y, c.z, h), o(r + 2, c.x, c.y, c.z, h), o(r + 3, c.x, c.y, c.z, h));
  }

  var M = new e(),
      H = 32768,
      g = 65536,
      S = 4096,
      F = 256,
      G = 128,
      W = 32,
      z = 8,
      X = 4,
      Y = 1 / 256,
      k = 0,
      Q = 2,
      K = 3,
      q = 1;

  function Xe(e, t, i, a, s) {
    var r,
        n = a[me.compressedAttribute0],
        o = s.pixelOffset,
        d = o.x,
        l = o.y,
        h = s._translate,
        _ = h.x,
        c = h.y;
    e._maxPixelOffset = Math.max(e._maxPixelOffset, Math.abs(d + _), Math.abs(-l + c));
    var u = s.horizontalOrigin,
        p = s._verticalOrigin,
        f = s.show && s.clusterShow;
    0 === s.color.alpha && (f = !1), p === w.BASELINE && (p = w.BOTTOM), e._allHorizontalCenter = e._allHorizontalCenter && u === V.CENTER, e._allVerticalCenter = e._allVerticalCenter && p === w.CENTER;
    var b = 0,
        x = 0,
        m = 0,
        T = 0,
        A = s._imageIndex;

    if (-1 !== A) {
      var D = i[A];
      if (!ae(D)) throw new L("Invalid billboard image index: " + A);
      b = D.x, x = D.y, m = D.width, T = D.height;
    }

    var C = b + m,
        S = x + T,
        y = Math.floor(U.clamp(d, -H, H) + H) * G;
    y += (u + 1) * W, y += (p + 1) * z, y += (f ? 1 : 0) * X;
    var E = Math.floor(U.clamp(l, -H, H) + H) * F,
        v = Math.floor(U.clamp(_, -H, H) + H) * F,
        g = (U.clamp(c, -H, H) + H) * Y,
        I = Math.floor(g);
    E += I, v += Math.floor((g - I) * F), M.x = b, M.y = x;
    var O = P.compressTextureCoordinates(M);
    M.x = C;
    var N = P.compressTextureCoordinates(M);
    M.y = S;
    var R = P.compressTextureCoordinates(M);
    M.x = b;
    var B = P.compressTextureCoordinates(M);
    e._instanced ? n(r = s._index, y, E, v, O) : (n((r = 4 * s._index) + 0, y + k, E, v, O), n(r + 1, y + Q, E, v, N), n(r + 2, y + K, E, v, R), n(r + 3, y + q, E, v, B));
  }

  function Ye(e, t, i, a, s) {
    var r,
        n = a[me.compressedAttribute1],
        o = s.alignedAxis;
    y.equals(o, y.ZERO) || (e._shaderAlignedAxis = !0);
    var d = 0,
        l = 1,
        h = 1,
        _ = 1,
        c = s.translucencyByDistance;
    ae(c) && (d = c.near, l = c.nearValue, h = c.far, _ = c.farValue, 1 === l && 1 === _ || (e._shaderTranslucencyByDistance = !0));
    var u = 0,
        p = s._imageIndex;

    if (-1 !== p) {
      var f = i[p];
      if (!ae(f)) throw new L("Invalid billboard image index: " + p);
      u = f.width;
    }

    var b = e._textureAtlas.texture.width,
        x = Math.round(v(s.width, b * u));
    e._maxSize = Math.max(e._maxSize, x);
    var m = U.clamp(x, 0, g),
        T = 0;
    Math.abs(y.magnitudeSquared(o) - 1) < U.EPSILON6 && (T = P.octEncodeFloat(o)), l = U.clamp(l, 0, 1), m = m * F + (l = 1 === l ? 255 : 255 * l | 0), _ = U.clamp(_, 0, 1), T = T * F + (_ = 1 === _ ? 255 : 255 * _ | 0), e._instanced ? n(r = s._index, m, T, d, h) : (n((r = 4 * s._index) + 0, m, T, d, h), n(r + 1, m, T, d, h), n(r + 2, m, T, d, h), n(r + 3, m, T, d, h));
  }

  function ke(e, t, i, a, s) {
    var r,
        n = a[me.compressedAttribute2],
        o = s.color,
        d = ae(e._batchTable) ? E.WHITE : s.getPickId(t).color,
        l = s.sizeInMeters ? 1 : 0,
        h = Math.abs(y.magnitudeSquared(s.alignedAxis) - 1) < U.EPSILON6 ? 1 : 0;
    e._allSizedInMeters = e._allSizedInMeters && 1 == l;
    var _ = 0,
        c = s._imageIndex;

    if (-1 !== c) {
      var u = i[c];
      if (!ae(u)) throw new L("Invalid billboard image index: " + c);
      _ = u.height;
    }

    var p = e._textureAtlas.texture.dimensions,
        f = Math.round(v(s.height, p.y * _));
    e._maxSize = Math.max(e._maxSize, f);
    var b = v(s._labelHorizontalOrigin, -2),
        x = f * X + (b += 2),
        m = E.floatToByte(o.red),
        T = E.floatToByte(o.green),
        A = E.floatToByte(o.blue),
        D = m * g + T * F + A,
        m = E.floatToByte(d.red),
        T = E.floatToByte(d.green),
        A = E.floatToByte(d.blue),
        C = m * g + T * F + A,
        S = E.floatToByte(o.alpha) * g + E.floatToByte(d.alpha) * F;
    S += 2 * l + h, e._instanced ? n(r = s._index, D, C, S, x) : (n((r = 4 * s._index) + 0, D, C, S, x), n(r + 1, D, C, S, x), n(r + 2, D, C, S, x), n(r + 3, D, C, S, x));
  }

  function Qe(e, t, i, a, s) {
    var r = a[me.eyeOffset],
        n = s.eyeOffset,
        o = n.z;

    if (s._heightReference !== C.NONE && (o *= 1.005), e._maxEyeOffset = Math.max(e._maxEyeOffset, Math.abs(n.x), Math.abs(n.y), Math.abs(o)), e._instanced) {
      var d = 0,
          l = 0,
          h = s._imageIndex;

      if (-1 !== h) {
        var _ = i[h];
        if (!ae(_)) throw new L("Invalid billboard image index: " + h);
        d = _.width, l = _.height;
      }

      M.x = d, M.y = l;
      var c,
          u = P.compressTextureCoordinates(M);
      r(c = s._index, n.x, n.y, o, u);
    } else r((c = 4 * s._index) + 0, n.x, n.y, o, 0), r(c + 1, n.x, n.y, o, 0), r(c + 2, n.x, n.y, o, 0), r(c + 3, n.x, n.y, o, 0);
  }

  function Ke(e, t, i, a, s) {
    var r,
        n = a[me.scaleByDistance],
        o = 0,
        d = 1,
        l = 1,
        h = 1,
        _ = s.scaleByDistance;
    ae(_) && (o = _.near, d = _.nearValue, l = _.far, h = _.farValue, 1 === d && 1 === h || (e._shaderScaleByDistance = !0)), e._instanced ? n(r = s._index, o, d, l, h) : (n((r = 4 * s._index) + 0, o, d, l, h), n(r + 1, o, d, l, h), n(r + 2, o, d, l, h), n(r + 3, o, d, l, h));
  }

  function qe(e, t, i, a, s) {
    var r,
        n = a[me.pixelOffsetScaleByDistance],
        o = 0,
        d = 1,
        l = 1,
        h = 1,
        _ = s.pixelOffsetScaleByDistance;
    ae(_) && (o = _.near, d = _.nearValue, l = _.far, h = _.farValue, 1 === d && 1 === h || (e._shaderPixelOffsetScaleByDistance = !0)), e._instanced ? n(r = s._index, o, d, l, h) : (n((r = 4 * s._index) + 0, o, d, l, h), n(r + 1, o, d, l, h), n(r + 2, o, d, l, h), n(r + 3, o, d, l, h));
  }

  function Ze(e, t, i, a, s) {
    var r,
        n = a[me.compressedAttribute3],
        o = 0,
        d = Number.MAX_VALUE,
        l = s.distanceDisplayCondition;
    ae(l) && (o = l.near, d = l.far, o *= o, d *= d, e._shaderDistanceDisplayCondition = !0);
    var h,
        _ = s.disableDepthTestDistance,
        c = s.heightReference === C.CLAMP_TO_GROUND && e._scene.context.depthTexture;
    if (ae(_) || (_ = c ? 5e3 : 0), _ *= _, (c || 0 < _) && (e._shaderDisableDepthDistance = !0, _ === Number.POSITIVE_INFINITY && (_ = -1)), ae(s._labelDimensions)) m = s._labelDimensions.x, h = s._labelDimensions.y;else {
      var u = 0,
          p = 0,
          f = s._imageIndex;

      if (-1 !== f) {
        var b = i[f];
        if (!ae(b)) throw new L("Invalid billboard image index: " + f);
        u = b.height, p = b.width;
      }

      h = Math.round(v(s.height, e._textureAtlas.texture.dimensions.y * u));
      var x = e._textureAtlas.texture.width,
          m = Math.round(v(s.width, x * p));
    }
    var T = Math.floor(U.clamp(m, 0, S)),
        A = Math.floor(U.clamp(h, 0, S)),
        D = T * S + A;
    e._instanced ? n(r = s._index, o, d, _, D) : (n((r = 4 * s._index) + 0, o, d, _, D), n(r + 1, o, d, _, D), n(r + 2, o, d, _, D), n(r + 3, o, d, _, D));
  }

  function je(e, t, i, a, s) {
    var r;
    s.heightReference === C.CLAMP_TO_GROUND && (e._shaderClampToGround = e._scene.context.depthTexture);
    var n = a[me.textureCoordinateBoundsOrLabelTranslate];

    if (0 < ne.maximumVertexTextureImageUnits) {
      var o = 0,
          d = 0;
      return ae(s._labelTranslate) && (o = s._labelTranslate.x, d = s._labelTranslate.y), void (e._instanced ? n(r = s._index, o, d, 0, 0) : (n((r = 4 * s._index) + 0, o, d, 0, 0), n(r + 1, o, d, 0, 0), n(r + 2, o, d, 0, 0), n(r + 3, o, d, 0, 0)));
    }

    var l = 0,
        h = 0,
        _ = 0,
        c = 0,
        u = s._imageIndex;

    if (-1 !== u) {
      var p = i[u];
      if (!ae(p)) throw new L("Invalid billboard image index: " + u);
      l = p.x, h = p.y, _ = p.width, c = p.height;
    }

    var f = l + _,
        b = h + c;
    e._instanced ? n(r = s._index, l, h, f, b) : (n((r = 4 * s._index) + 0, l, h, f, b), n(r + 1, l, h, f, b), n(r + 2, l, h, f, b), n(r + 3, l, h, f, b));
  }

  function Je(e, t, i, a, s) {
    var r, n, o, d, l, h;
    ze(e, 0, 0, a, s), Xe(e, 0, i, a, s), Ye(e, 0, i, a, s), ke(e, t, i, a, s), Qe(e, 0, i, a, s), Ke(e, 0, 0, a, s), qe(e, 0, 0, a, s), Ze(e, 0, i, a, s), je(e, 0, i, a, s), n = a, o = s, ae((r = e)._batchTable) && (d = n[me.a_batchId], l = o._batchIndex, r._instanced ? d(h = o._index, l) : (d((h = 4 * o._index) + 0, l), d(h + 1, l), d(h + 2, l), d(h + 3, l)));
  }

  function $e(e, t, i, a, s, r) {
    var n;
    a.mode === be.SCENE3D ? (n = e._baseVolume, e._boundingVolumeDirty = !0) : n = e._baseVolume2D;

    for (var o = [], d = 0; d < i; ++d) {
      var l = t[d],
          h = l.position,
          _ = c._computeActualPosition(l, h, a, s);

      ae(_) && (l._setActualPosition(_), r ? o.push(_) : ie.expand(n, _, n));
    }

    r && ie.fromPoints(o, n);
  }

  var et = [];
  return a.prototype.update = function (e) {
    He(this);
    var t = this._billboards,
        i = t.length,
        a = e.context;
    this._instanced = a.instancedArrays, me = this._instanced ? Me : we, Te = this._instanced ? Ge : Fe;
    var s = this._textureAtlas;

    if (!ae(s)) {
      s = this._textureAtlas = new xe({
        context: a
      });

      for (var r = 0; r < i; ++r) {
        t[r]._loadImage();
      }
    }

    var n,
        o,
        d,
        l,
        h,
        _,
        c = s.textureCoordinates;

    if (0 !== c.length) {
      n = this, d = (o = e).mode, l = n._billboards, h = n._billboardsToUpdate, _ = n._modelMatrix, n._createVertexArray || n._mode !== d || d !== be.SCENE3D && !se.equals(_, n.modelMatrix) ? (n._mode = d, se.clone(n.modelMatrix, _), n._createVertexArray = !0, d !== be.SCENE3D && d !== be.SCENE2D && d !== be.COLUMBUS_VIEW || $e(n, l, l.length, o, _, !0)) : d === be.MORPHING ? $e(n, l, l.length, o, _, !0) : d !== be.SCENE2D && d !== be.COLUMBUS_VIEW || $e(n, h, n._billboardsToUpdateIndex, o, _, !1), i = (t = this._billboards).length;
      var u = this._billboardsToUpdate,
          p = this._billboardsToUpdateIndex,
          f = this._propertiesChanged,
          b = s.guid,
          x = this._createVertexArray || this._textureAtlasGUID !== b;
      this._textureAtlasGUID = b;
      var m = e.passes,
          T = m.pick;

      if (x || !T && this.computeNewBuffersUsage()) {
        this._createVertexArray = !1;

        for (var A = 0; A < Ve; ++A) {
          f[A] = 0;
        }

        if (this._vaf = this._vaf && this._vaf.destroy(), 0 < i) {
          this._vaf = We(a, i, this._buffersUsage, this._instanced, this._batchTable), E = this._vaf.writers;

          for (var D = 0; D < i; ++D) {
            var C = this._billboards[D];
            C._dirty = !1, Je(this, a, c, E, C);
          }

          this._vaf.commit(Te(a));
        }

        this._billboardsToUpdateIndex = 0;
      } else if (0 < p) {
        var S = et;
        S.length = 0, (f[De] || f[Oe] || f[ve]) && S.push(ze), (f[ge] || f[Ce] || f[ye] || f[Ee] || f[Ae]) && (S.push(Xe), this._instanced && S.push(Qe)), (f[ge] || f[Ne] || f[Be]) && (S.push(Ye), S.push(ke)), (f[ge] || f[Ie]) && S.push(ke), f[Se] && S.push(Qe), f[Re] && S.push(Ke), f[Pe] && S.push(qe), (f[Le] || f[Ue] || f[ge] || f[De]) && S.push(Ze), (f[ge] || f[De]) && S.push(je);
        var y = S.length,
            E = this._vaf.writers;

        if (.1 < p / i) {
          for (var v = 0; v < p; ++v) {
            var g = u[v];
            g._dirty = !1;

            for (var I = 0; I < y; ++I) {
              S[I](this, a, c, E, g);
            }
          }

          this._vaf.commit(Te(a));
        } else {
          for (var O = 0; O < p; ++O) {
            var N = u[O];
            N._dirty = !1;

            for (var R = 0; R < y; ++R) {
              S[R](this, a, c, E, N);
            }

            this._instanced ? this._vaf.subCommit(N._index, 1) : this._vaf.subCommit(4 * N._index, 4);
          }

          this._vaf.endSubCommits();
        }

        this._billboardsToUpdateIndex = 0;
      }

      if (1.5 * i < p && (u.length = i), ae(this._vaf) && ae(this._vaf.va)) {
        this._boundingVolumeDirty && (this._boundingVolumeDirty = !1, ie.transform(this._baseVolume, this.modelMatrix, this._baseVolumeWC));
        var B,
            P = se.IDENTITY;

        (function (e, t, i) {
          var a = 1;
          e._allSizedInMeters && 0 === e._maxPixelOffset || (a = t.camera.getPixelSize(i, t.context.drawingBufferWidth, t.context.drawingBufferHeight));
          var s = a * e._maxScale * e._maxSize * 2;
          e._allHorizontalCenter && e._allVerticalCenter && (s *= .5);
          var r = a * e._maxPixelOffset + e._maxEyeOffset;
          i.radius += s + r;
        })(this, e, B = e.mode === be.SCENE3D ? (P = this.modelMatrix, ie.clone(this._baseVolumeWC, this._boundingVolume)) : ie.clone(this._baseVolume2D, this._boundingVolume));

        var L,
            U,
            V,
            w,
            M,
            H,
            F = this._blendOption !== this.blendOption;
        this._blendOption = this.blendOption, F && (this._blendOption === fe.OPAQUE || this._blendOption === fe.OPAQUE_AND_TRANSLUCENT ? this._rsOpaque = le.fromCache({
          depthTest: {
            enabled: !0,
            func: re.LESS
          },
          depthMask: !0
        }) : this._rsOpaque = void 0, L = this._blendOption === fe.TRANSLUCENT, this._blendOption === fe.TRANSLUCENT || this._blendOption === fe.OPAQUE_AND_TRANSLUCENT ? this._rsTranslucent = le.fromCache({
          depthTest: {
            enabled: !0,
            func: L ? re.LEQUAL : re.LESS
          },
          depthMask: L,
          blending: pe.ALPHA_BLEND
        }) : this._rsTranslucent = void 0), this._shaderDisableDepthDistance = this._shaderDisableDepthDistance || 0 !== e.minimumDisableDepthTestDistance;
        var G,
            W = 0 < ne.maximumVertexTextureImageUnits;
        !F && this._shaderRotation === this._compiledShaderRotation && this._shaderAlignedAxis === this._compiledShaderAlignedAxis && this._shaderScaleByDistance === this._compiledShaderScaleByDistance && this._shaderTranslucencyByDistance === this._compiledShaderTranslucencyByDistance && this._shaderPixelOffsetScaleByDistance === this._compiledShaderPixelOffsetScaleByDistance && this._shaderDistanceDisplayCondition === this._compiledShaderDistanceDisplayCondition && this._shaderDisableDepthDistance === this._compiledShaderDisableDepthDistance && this._shaderClampToGround === this._compiledShaderClampToGround || (U = ue, V = ce, H = [], ae(this._batchTable) && (H.push("VECTOR_TILE"), U = this._batchTable.getVertexShaderCallback(!1, "a_batchId", void 0)(U), V = this._batchTable.getFragmentShaderCallback(!1, void 0)(V)), w = new _e({
          defines: H,
          sources: [U]
        }), this._instanced && w.defines.push("INSTANCED"), this._shaderRotation && w.defines.push("ROTATION"), this._shaderAlignedAxis && w.defines.push("ALIGNED_AXIS"), this._shaderScaleByDistance && w.defines.push("EYE_DISTANCE_SCALING"), this._shaderTranslucencyByDistance && w.defines.push("EYE_DISTANCE_TRANSLUCENCY"), this._shaderPixelOffsetScaleByDistance && w.defines.push("EYE_DISTANCE_PIXEL_OFFSET"), this._shaderDistanceDisplayCondition && w.defines.push("DISTANCE_DISPLAY_CONDITION"), this._shaderDisableDepthDistance && w.defines.push("DISABLE_DEPTH_DISTANCE"), this._shaderClampToGround && (W ? w.defines.push("VERTEX_DEPTH_CHECK") : w.defines.push("FRAGMENT_DEPTH_CHECK")), G = ae(this._batchTable) ? "VECTOR_TILE" : "", this._blendOption === fe.OPAQUE_AND_TRANSLUCENT && (M = new _e({
          defines: ["OPAQUE", G],
          sources: [V]
        }), this._shaderClampToGround && (W ? M.defines.push("VERTEX_DEPTH_CHECK") : M.defines.push("FRAGMENT_DEPTH_CHECK")), this._sp = he.replaceCache({
          context: a,
          shaderProgram: this._sp,
          vertexShaderSource: w,
          fragmentShaderSource: M,
          attributeLocations: me
        }), M = new _e({
          defines: ["TRANSLUCENT", G],
          sources: [V]
        }), this._shaderClampToGround && (W ? M.defines.push("VERTEX_DEPTH_CHECK") : M.defines.push("FRAGMENT_DEPTH_CHECK")), this._spTranslucent = he.replaceCache({
          context: a,
          shaderProgram: this._spTranslucent,
          vertexShaderSource: w,
          fragmentShaderSource: M,
          attributeLocations: me
        })), this._blendOption === fe.OPAQUE && (M = new _e({
          defines: [G],
          sources: [V]
        }), this._shaderClampToGround && (W ? M.defines.push("VERTEX_DEPTH_CHECK") : M.defines.push("FRAGMENT_DEPTH_CHECK")), this._sp = he.replaceCache({
          context: a,
          shaderProgram: this._sp,
          vertexShaderSource: w,
          fragmentShaderSource: M,
          attributeLocations: me
        })), this._blendOption === fe.TRANSLUCENT && (M = new _e({
          defines: [G],
          sources: [V]
        }), this._shaderClampToGround && (W ? M.defines.push("VERTEX_DEPTH_CHECK") : M.defines.push("FRAGMENT_DEPTH_CHECK")), this._spTranslucent = he.replaceCache({
          context: a,
          shaderProgram: this._spTranslucent,
          vertexShaderSource: w,
          fragmentShaderSource: M,
          attributeLocations: me
        })), this._compiledShaderRotation = this._shaderRotation, this._compiledShaderAlignedAxis = this._shaderAlignedAxis, this._compiledShaderScaleByDistance = this._shaderScaleByDistance, this._compiledShaderTranslucencyByDistance = this._shaderTranslucencyByDistance, this._compiledShaderPixelOffsetScaleByDistance = this._shaderPixelOffsetScaleByDistance, this._compiledShaderDistanceDisplayCondition = this._shaderDistanceDisplayCondition, this._compiledShaderDisableDepthDistance = this._shaderDisableDepthDistance, this._compiledShaderClampToGround = this._shaderClampToGround);
        var z = e.commandList;

        if (m.render || m.pick) {
          var X = this._colorCommands,
              Y = this._blendOption === fe.OPAQUE,
              k = this._blendOption === fe.OPAQUE_AND_TRANSLUCENT,
              Q = this._vaf.va,
              K = Q.length,
              q = this._uniforms,
              Z = ae(this._batchTable) ? (q = this._batchTable.getUniformMapCallback()(q), this._batchTable.getPickId()) : "v_pickColor";
          X.length = K;

          for (var j = k ? 2 * K : K, J = 0; J < j; ++J) {
            var $ = X[J];
            ae($) || ($ = X[J] = new oe());
            var ee = Y || k && J % 2 == 0;
            $.pass = ee || !k ? de.OPAQUE : de.TRANSLUCENT, $.owner = this;
            var te = k ? Math.floor(J / 2) : J;
            $.boundingVolume = B, $.modelMatrix = P, $.count = Q[te].indicesCount, $.shaderProgram = ee ? this._sp : this._spTranslucent, $.uniformMap = q, $.vertexArray = Q[te].va, $.renderState = ee ? this._rsOpaque : this._rsTranslucent, $.debugShowBoundingVolume = this.debugShowBoundingVolume, $.pickId = Z, this._instanced && ($.count = 6, $.instanceCount = i), z.push($);
          }
        }
      }
    }
  }, a.prototype.isDestroyed = function () {
    return !1;
  }, a.prototype.destroy = function () {
    return ae(this._removeCallbackFunc) && (this._removeCallbackFunc(), this._removeCallbackFunc = void 0), this._textureAtlas = this._destroyTextureAtlas && this._textureAtlas && this._textureAtlas.destroy(), this._sp = this._sp && this._sp.destroy(), this._spTranslucent = this._spTranslucent && this._spTranslucent.destroy(), this._vaf = this._vaf && this._vaf.destroy(), s(this._billboards), i(this);
  }, a;
});