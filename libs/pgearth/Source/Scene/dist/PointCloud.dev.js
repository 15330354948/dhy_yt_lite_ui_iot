"use strict";

define(["../Core/arraySlice", "../Core/BoundingSphere", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Math", "../Core/Check", "../Core/Color", "../Core/combine", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/FeatureDetection", "../Core/getStringFromTypedArray", "../Core/Matrix4", "../Core/oneTimeWarning", "../Core/OrthographicFrustum", "../Core/Plane", "../Core/PrimitiveType", "../Core/RuntimeError", "../Core/Transforms", "../Renderer/Buffer", "../Renderer/BufferUsage", "../Renderer/DrawCommand", "../Renderer/Pass", "../Renderer/RenderState", "../Renderer/ShaderProgram", "../Renderer/ShaderSource", "../Renderer/VertexArray", "../ThirdParty/when", "./BlendingState", "./PGEarth3DTileBatchTable", "./PGEarth3DTileFeature", "./PGEarth3DTileFeatureTable", "./DracoLoader", "./getClipAndStyleCode", "./getClippingFunction", "./SceneMode", "./ShadowMode", "./StencilConstants"], function (Q, U, te, g, u, t, re, oe, Y, ne, ie, e, r, o, Z, ae, n, se, i, q, de, S, V, H, k, W, j, le, a, J, s, K, X, d, $, v, ce, _e, ue, T, ee) {
  "use strict";

  if (!o.supportsTypedArrays()) return {};
  var he = {
    NEEDS_DECODE: 0,
    DECODING: 1,
    READY: 2,
    FAILED: 3
  };

  function l(e) {
    t.typeOf.object("options", e), t.typeOf.object("options.arrayBuffer", e.arrayBuffer), this._parsedContent = void 0, this._drawCommand = void 0, this._isTranslucent = !1, this._styleTranslucent = !1, this._constantColor = re.clone(re.DARKGRAY), this._highlightColor = re.clone(re.WHITE), this._pointSize = 1, this._rtcCenter = void 0, this._quantizedVolumeScale = void 0, this._quantizedVolumeOffset = void 0, this._styleableShaderAttributes = void 0, this._isQuantized = !1, this._isOctEncoded16P = !1, this._isRGB565 = !1, this._hasColors = !1, this._hasNormals = !1, this._hasBatchIds = !1, this._decodingState = he.READY, this._dequantizeInShader = !0, this._isQuantizedDraco = !1, this._isOctEncodedDraco = !1, this._quantizedRange = 0, this._octEncodedRange = 0, this.backFaceCulling = !1, this._backFaceCulling = !1, this.normalShading = !0, this._normalShading = !0, this._opaqueRenderState = void 0, this._translucentRenderState = void 0, this._mode = void 0, this._ready = !1, this._readyPromise = s.defer(), this._pointsLength = 0, this._geometryByteLength = 0, this._vertexShaderLoaded = e.vertexShaderLoaded, this._fragmentShaderLoaded = e.fragmentShaderLoaded, this._uniformMapLoaded = e.uniformMapLoaded, this._batchTableLoaded = e.batchTableLoaded, this._pickIdLoaded = e.pickIdLoaded, this._opaquePass = ne(e.opaquePass, W.OPAQUE), this._cull = ne(e.cull, !0), this.style = void 0, this._style = void 0, this.styleDirty = !1, this.modelMatrix = ae.clone(ae.IDENTITY), this._modelMatrix = ae.clone(ae.IDENTITY), this.time = 0, this.shadows = T.ENABLED, this._boundingSphere = void 0, this.clippingPlanes = void 0, this.isClipped = !1, this.clippingPlanesDirty = !1, this.clippingPlanesOriginMatrix = void 0, this.attenuation = !1, this._attenuation = !1, this.geometricError = 0, this.geometricErrorScale = 1, this.maximumAttenuation = this._pointSize, function (e, t) {
      var r = t.arrayBuffer,
          o = ne(t.byteOffset, 0),
          n = new Uint8Array(r),
          i = new DataView(r);
      o += me;
      var a = i.getUint32(o, !0);
      if (1 !== a) throw new de("Only Point Cloud tile version 1 is supported.  Version " + a + " is not.");
      o += me, o += me;
      var s = i.getUint32(o, !0);
      if (0 === s) throw new de("Feature table must have a byte length greater than zero");
      o += me;
      var d = i.getUint32(o, !0);
      o += me;
      var l = i.getUint32(o, !0);
      o += me;

      var c = i.getUint32(o, !0),
          _ = Z(n, o += me, s),
          u = JSON.parse(_);

      o += s;
      var h,
          m,
          p = new Uint8Array(r, o, d);
      {
        var f;
        o += d, 0 < l && (f = Z(n, o, l), h = JSON.parse(f), o += l, 0 < c && (m = new Uint8Array(r, o, c), o += c));
      }
      var y = new $(u, p),
          g = y.getGlobalProperty("POINTS_LENGTH");
      if (y.featuresLength = g, !ie(g)) throw new de("Feature table global property: POINTS_LENGTH must be defined");
      var S,
          v,
          T,
          E,
          A = y.getGlobalProperty("RTC_CENTER", Y.FLOAT, 3);
      ie(A) && (e._rtcCenter = te.unpack(A));
      var C,
          I,
          b,
          P,
          O,
          N = !1,
          D = !1,
          R = !1,
          B = !1,
          L = !1,
          w = !1,
          z = !1,
          x = !1,
          G = ie(u.extensions) ? u.extensions["3DTILES_draco_point_compression"] : void 0,
          M = ie(h) && ie(h.extensions) ? h.extensions["3DTILES_draco_point_compression"] : void 0;
      ie(M) && (b = M.properties);

      if (ie(G)) {
        I = G.properties;
        var F = G.byteOffset,
            U = G.byteLength;
        if (!ie(I) || !ie(F) || !ie(U)) throw new de("Draco properties, byteOffset, and byteLength must be defined");
        C = Q(p, F, F + U), N = ie(I.POSITION), D = ie(I.RGB) || ie(I.RGBA), R = ie(I.NORMAL), B = ie(I.BATCH_ID), w = ie(I.RGBA), e._decodingState = he.NEEDS_DECODE;
      }

      ie(C) && (P = {
        buffer: C,
        featureTableProperties: I,
        batchTableProperties: b,
        properties: oe(I, b),
        dequantizeInShader: e._dequantizeInShader
      });
      if (!N) if (ie(u.POSITION)) S = y.getPropertyArray("POSITION", Y.FLOAT, 3), N = !0;else if (ie(u.POSITION_QUANTIZED)) {
        S = y.getPropertyArray("POSITION_QUANTIZED", Y.UNSIGNED_SHORT, 3), N = L = !0;
        var q = y.getGlobalProperty("QUANTIZED_VOLUME_SCALE", Y.FLOAT, 3);
        if (!ie(q)) throw new de("Global property: QUANTIZED_VOLUME_SCALE must be defined for quantized positions.");
        e._quantizedVolumeScale = te.unpack(q), e._quantizedRange = 65535;
        var V = y.getGlobalProperty("QUANTIZED_VOLUME_OFFSET", Y.FLOAT, 3);
        if (!ie(V)) throw new de("Global property: QUANTIZED_VOLUME_OFFSET must be defined for quantized positions.");
        e._quantizedVolumeOffset = te.unpack(V);
      }
      D || (ie(u.RGBA) ? (v = y.getPropertyArray("RGBA", Y.UNSIGNED_BYTE, 4), D = w = !0) : ie(u.RGB) ? (v = y.getPropertyArray("RGB", Y.UNSIGNED_BYTE, 3), D = !0) : ie(u.RGB565) && (v = y.getPropertyArray("RGB565", Y.UNSIGNED_SHORT, 1), D = z = !0));
      R || (ie(u.NORMAL) ? (T = y.getPropertyArray("NORMAL", Y.FLOAT, 3), R = !0) : ie(u.NORMAL_OCT16P) && (T = y.getPropertyArray("NORMAL_OCT16P", Y.UNSIGNED_BYTE, 2), R = x = !0));
      B || ie(u.BATCH_ID) && (E = y.getPropertyArray("BATCH_ID", Y.UNSIGNED_SHORT, 1), B = !0);
      if (!N) throw new de("Either POSITION or POSITION_QUANTIZED must be defined.");
      {
        var H;
        ie(u.CONSTANT_RGBA) && (H = y.getGlobalProperty("CONSTANT_RGBA", Y.UNSIGNED_BYTE, 4), e._constantColor = re.fromBytes(H[0], H[1], H[2], H[3], e._constantColor));
      }

      if (B) {
        var k = y.getGlobalProperty("BATCH_LENGTH");
        if (!ie(k)) throw new de("Global property: BATCH_LENGTH must be defined when BATCH_ID is defined.");
        ie(m) && (m = new Uint8Array(m)), ie(e._batchTableLoaded) && e._batchTableLoaded(k, h, m);
      }

      !B && ie(m) && (O = X.getBinaryProperties(g, h, m));
      e._parsedContent = {
        positions: S,
        colors: v,
        normals: T,
        batchIds: E,
        styleableProperties: O,
        draco: P
      }, e._pointsLength = g, e._isQuantized = L, e._isOctEncoded16P = x, e._isRGB565 = z, e._isTranslucent = w, e._hasColors = D, e._hasNormals = R, e._hasBatchIds = B;
    }(this, e);
  }

  e(l.prototype, {
    pointsLength: {
      get: function get() {
        return this._pointsLength;
      }
    },
    geometryByteLength: {
      get: function get() {
        return this._geometryByteLength;
      }
    },
    ready: {
      get: function get() {
        return this._ready;
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise.promise;
      }
    },
    color: {
      get: function get() {
        return re.clone(this._highlightColor);
      },
      set: function set(e) {
        this._highlightColor = re.clone(e, this._highlightColor);
      }
    },
    boundingSphere: {
      get: function get() {
        if (ie(this._drawCommand)) return this._drawCommand.boundingVolume;
      },
      set: function set(e) {
        this._boundingSphere = U.clone(e);
      }
    }
  });
  var me = Uint32Array.BYTES_PER_ELEMENT;
  var h,
      m = new te(),
      p = new te(),
      f = new te();

  function pe(e) {
    for (var t = e.length / 3, r = Math.min(t, 20), o = function (e) {
      if (!ie(h)) {
        u.setRandomNumberSeed(0), h = new Array(e);

        for (var t = 0; t < e; ++t) {
          h[t] = u.nextRandomNumber();
        }
      }

      return h;
    }(20), n = Number.MAX_VALUE, i = -Number.MAX_VALUE, a = te.fromElements(n, n, n, m), s = te.fromElements(i, i, i, p), d = 0; d < r; ++d) {
      var l = Math.floor(o[d] * t),
          c = te.unpack(e, 3 * l, f);
      te.minimumByComponent(a, c, a), te.maximumByComponent(s, c, s);
    }

    var _ = U.fromCornerPoints(a, s);

    return _.radius += u.EPSILON2, _;
  }

  function fe(e, t) {
    var r = Y.fromTypedArray(e);
    return r === Y.INT || r === Y.UNSIGNED_INT || r === Y.DOUBLE ? (n("Cast pnts property to floats", 'Point cloud property "' + t + '" will be casted to a float array because INT, UNSIGNED_INT, and DOUBLE are not valid WebGL vertex attribute types. Some precision may be lost.'), new Float32Array(e)) : e;
  }

  var ye = new g(),
      ge = new g(),
      Se = new re(),
      ve = new ae();
  var Te = ["POSITION", "COLOR", "NORMAL", "POSITION_ABSOLUTE"];

  function Ee(e, t) {
    for (var r = /czm_tiles3d_style_(\w+)/g, o = r.exec(e); null !== o;) {
      var n = o[1];
      -1 === t.indexOf(n) && t.push(n), o = r.exec(e);
    }
  }

  function Ae(e, t) {
    for (var r = e.numberOfAttributes, o = 0; o < r; ++o) {
      var n = e.getAttribute(o);
      if (n.index === t) return n;
    }
  }

  function Ce(e) {
    for (var t = Te.length, r = 0; r < t; ++r) {
      var o = Te[r],
          n = "czm_tiles3d_style_" + o,
          i = o.toLowerCase();
      e = e.replace(new RegExp(n + "(\\W)", "g"), i + "$1");
    }

    return e.replace("()", "(vec3 position, vec3 position_absolute, vec4 color, vec3 normal)");
  }

  function E(e, t, r) {
    var o,
        n,
        i,
        a,
        s,
        d,
        l = t.context,
        c = ie(r),
        _ = e._isQuantized,
        u = e._isQuantizedDraco,
        h = e._isOctEncoded16P,
        m = e._isOctEncodedDraco,
        p = e._isRGB565,
        f = e._isTranslucent,
        y = e._hasColors,
        g = e._hasNormals,
        S = e._hasBatchIds,
        v = e._backFaceCulling,
        T = e._normalShading,
        E = e._drawCommand.vertexArray,
        A = e.clippingPlanes,
        C = e._attenuation,
        I = f;
    c && (i = {
      translucent: !1
    }, a = r.getColorShaderFunction("getColorFromStyle", "czm_tiles3d_style_", i), s = r.getShowShaderFunction("getShowFromStyle", "czm_tiles3d_style_", i), d = r.getPointSizeShaderFunction("getPointSizeFromStyle", "czm_tiles3d_style_", i), ie(a) && i.translucent && (I = !0)), e._styleTranslucent = I;
    var b = ie(a),
        P = ie(s),
        O = ie(d),
        N = e.isClipped,
        D = [];
    b && (Ee(a, D), a = Ce(a)), P && (Ee(s, D), s = Ce(s)), O && (Ee(d, D), d = Ce(d));
    var R = 0 <= D.indexOf("COLOR"),
        B = 0 <= D.indexOf("NORMAL"),
        L = D.filter(function (e) {
      return -1 === Te.indexOf(e);
    });
    if (B && !g) throw new de("Style references the NORMAL semantic but the point cloud does not have normals");
    var w,
        z = e._styleableShaderAttributes;

    for (o in z) {
      z.hasOwnProperty(o) && (n = z[o], w = 0 <= L.indexOf(o), Ae(E, n.location).enabled = w);
    }

    var x = y && (!b || R);
    y && (Ae(E, 1).enabled = x);
    var G = g && (T || v || B);
    g && (Ae(E, 2).enabled = G);
    var M = {
      a_position: 0
    };
    x && (M.a_color = 1), G && (M.a_normal = 2), S && (M.a_batchId = 3);

    for (var F, U, q, V, H, k, Q, Y = "", Z = L.length, W = 0; W < Z; ++W) {
      if (n = z[o = L[W]], !ie(n)) throw new de('Style references a property "' + o + '" that does not exist or is not styleable.');
      var j = n.componentCount,
          J = "czm_tiles3d_style_" + o,
          K = 1 === j ? "float" : "vec" + j;
      Y += "attribute " + K + " " + J + "; \n", M[J] = n.location;
    }

    F = e, q = (U = t).context, V = F._isQuantized, H = F._isQuantizedDraco, k = F._isOctEncodedDraco, Q = {
      u_pointSizeAndTimeAndGeometricErrorAndDepthMultiplier: function u_pointSizeAndTimeAndGeometricErrorAndDepthMultiplier() {
        var e,
            t,
            r = ye;
        return r.x = F._attenuation ? F.maximumAttenuation : F._pointSize, r.y = F.time, F._attenuation && (e = U.camera.frustum, t = U.mode === ue.SCENE2D || e instanceof se ? Number.POSITIVE_INFINITY : q.drawingBufferHeight / U.camera.frustum.sseDenominator, r.z = F.geometricError * F.geometricErrorScale, r.w = t), r;
      },
      u_highlightColor: function u_highlightColor() {
        return F._highlightColor;
      },
      u_constantColor: function u_constantColor() {
        return F._constantColor;
      },
      u_clippingPlanes: function u_clippingPlanes() {
        var e = F.clippingPlanes;
        return F.isClipped ? e.texture : q.defaultTexture;
      },
      u_clippingPlanesEdgeStyle: function u_clippingPlanesEdgeStyle() {
        var e = F.clippingPlanes;
        if (!ie(e)) return re.TRANSPARENT;
        var t = re.clone(e.edgeColor, Se);
        return t.alpha = e.edgeWidth, t;
      },
      u_clippingPlanesMatrix: function u_clippingPlanesMatrix() {
        var e = F.clippingPlanes;
        if (!ie(e)) return ae.IDENTITY;
        var t = ne(F.clippingPlanesOriginMatrix, F._modelMatrix);
        return ae.multiply(q.uniformState.view3D, t, ve), ae.multiply(ve, e.modelMatrix, ve);
      }
    }, (V || H || k) && (Q = oe(Q, {
      u_quantizedVolumeScaleAndOctEncodedRange: function u_quantizedVolumeScaleAndOctEncodedRange() {
        var e,
            t = ge;
        return ie(F._quantizedVolumeScale) && (e = te.clone(F._quantizedVolumeScale, t), te.divideByScalar(e, F._quantizedRange, t)), t.w = F._octEncodedRange, t;
      }
    })), ie(F._uniformMapLoaded) && (Q = F._uniformMapLoaded(Q)), F._drawCommand.uniformMap = Q;
    var X = "attribute vec3 a_position; \nvarying vec4 v_color; \nuniform vec4 u_pointSizeAndTimeAndGeometricErrorAndDepthMultiplier; \nuniform vec4 u_constantColor; \nuniform vec4 u_highlightColor; \n";
    X += "float u_pointSize; \nfloat u_time; \n", C && (X += "float u_geometricError; \nfloat u_depthMultiplier; \n"), X += Y, x && (X += f ? "attribute vec4 a_color; \n" : p ? "attribute float a_color; \nconst float SHIFT_RIGHT_11 = 1.0 / 2048.0; \nconst float SHIFT_RIGHT_5 = 1.0 / 32.0; \nconst float SHIFT_LEFT_11 = 2048.0; \nconst float SHIFT_LEFT_5 = 32.0; \nconst float NORMALIZE_6 = 1.0 / 64.0; \nconst float NORMALIZE_5 = 1.0 / 32.0; \n" : "attribute vec3 a_color; \n"), G && (X += h || m ? "attribute vec2 a_normal; \n" : "attribute vec3 a_normal; \n"), S && (X += "attribute float a_batchId; \n"), (_ || u || m) && (X += "uniform vec4 u_quantizedVolumeScaleAndOctEncodedRange; \n"), b && (X += a), P && (X += s), O && (X += d), X += "void main() \n{ \n    u_pointSize = u_pointSizeAndTimeAndGeometricErrorAndDepthMultiplier.x; \n    u_time = u_pointSizeAndTimeAndGeometricErrorAndDepthMultiplier.y; \n", C && (X += "    u_geometricError = u_pointSizeAndTimeAndGeometricErrorAndDepthMultiplier.z; \n    u_depthMultiplier = u_pointSizeAndTimeAndGeometricErrorAndDepthMultiplier.w; \n"), X += x ? f ? "    vec4 color = a_color; \n" : p ? "    float compressed = a_color; \n    float r = floor(compressed * SHIFT_RIGHT_11); \n    compressed -= r * SHIFT_LEFT_11; \n    float g = floor(compressed * SHIFT_RIGHT_5); \n    compressed -= g * SHIFT_LEFT_5; \n    float b = compressed; \n    vec3 rgb = vec3(r * NORMALIZE_5, g * NORMALIZE_6, b * NORMALIZE_5); \n    vec4 color = vec4(rgb, 1.0); \n" : "    vec4 color = vec4(a_color, 1.0); \n" : "    vec4 color = u_constantColor; \n", X += _ || u ? "    vec3 position = a_position * u_quantizedVolumeScaleAndOctEncodedRange.xyz; \n" : "    vec3 position = a_position; \n", X += "    vec3 position_absolute = vec3(czm_model * vec4(position, 1.0)); \n", G ? (X += h ? "    vec3 normal = czm_octDecode(a_normal); \n" : m ? "    vec3 normal = czm_octDecode(a_normal, u_quantizedVolumeScaleAndOctEncodedRange.w).zxy; \n" : "    vec3 normal = a_normal; \n", X += "    vec3 normalEC = czm_normal * normal; \n") : X += "    vec3 normal = vec3(1.0); \n", b && (X += "    color = getColorFromStyle(position, position_absolute, color, normal); \n"), P && (X += "    float show = float(getShowFromStyle(position, position_absolute, color, normal)); \n"), X += O ? "    gl_PointSize = getPointSizeFromStyle(position, position_absolute, color, normal); \n" : C ? "    vec4 positionEC = czm_modelView * vec4(position, 1.0); \n    float depth = -positionEC.z; \n    gl_PointSize = min((u_geometricError / depth) * u_depthMultiplier, u_pointSize); \n" : "    gl_PointSize = u_pointSize; \n", X += "    color = color * u_highlightColor; \n", G && T && (X += "    float diffuseStrength = czm_getLambertDiffuse(czm_sunDirectionEC, normalEC); \n    diffuseStrength = max(diffuseStrength, 0.4); \n    color.xyz *= diffuseStrength; \n"), X += "    v_color = color; \n    gl_Position = czm_modelViewProjection * vec4(position, 1.0); \n", G && v && (X += "    float visible = step(-normalEC.z, 0.0); \n    gl_Position *= visible; \n    gl_PointSize *= visible; \n"), P && (X += "    gl_Position *= show; \n    gl_PointSize *= show; \n"), X += "} \n";
    var $ = "varying vec4 v_color; \n";
    N && ($ += "uniform sampler2D u_clippingPlanes; \nuniform mat4 u_clippingPlanesMatrix; \nuniform vec4 u_clippingPlanesEdgeStyle; \n", $ += "\n", $ += _e(A, l), $ += "\n"), $ += "void main() \n{ \n    gl_FragColor = czm_gammaCorrect(v_color); \n", N && ($ += ce("u_clippingPlanes", "u_clippingPlanesMatrix", "u_clippingPlanesEdgeStyle")), $ += "} \n", ie(e._vertexShaderLoaded) && (X = e._vertexShaderLoaded(X)), ie(e._fragmentShaderLoaded) && ($ = e._fragmentShaderLoaded($));
    var ee = e._drawCommand;
    ie(ee.shaderProgram) && ee.shaderProgram.destroy(), ee.shaderProgram = le.fromCache({
      context: l,
      vertexShaderSource: X,
      fragmentShaderSource: $,
      attributeLocations: M
    });

    try {
      ee.shaderProgram._bind();
    } catch (e) {
      throw new de("Error generating style shader: this may be caused by a type mismatch, index out-of-bounds, or other syntax error.");
    }
  }

  var A = new g(),
      C = new te();
  return l.prototype.update = function (e) {
    var m,
        t,
        p,
        f,
        r,
        o,
        n,
        i,
        a,
        s,
        d,
        l,
        c,
        _,
        u,
        h,
        y = e.context;

    t = y, (m = this)._decodingState !== he.READY ? m._decodingState === he.NEEDS_DECODE && (p = m._parsedContent, f = p.draco, r = v.decodePointCloud(f, t), ie(r) && (m._decodingState = he.DECODING, r.then(function (e) {
      m._decodingState = he.READY;
      var t,
          r,
          o = ie(e.POSITION) ? e.POSITION.array : void 0,
          n = ie(e.RGB) ? e.RGB.array : void 0,
          i = ie(e.RGBA) ? e.RGBA.array : void 0,
          a = ie(e.NORMAL) ? e.NORMAL.array : void 0,
          s = ie(e.BATCH_ID) ? e.BATCH_ID.array : void 0,
          d = ie(o) && ie(e.POSITION.data.quantization),
          l = ie(a) && ie(e.NORMAL.data.quantization);
      d && (r = (t = e.POSITION.data.quantization).range, m._quantizedVolumeScale = te.fromElements(r, r, r), m._quantizedVolumeOffset = te.unpack(t.minValues), m._quantizedRange = (1 << t.quantizationBits) - 1, m._isQuantizedDraco = !0), l && (m._octEncodedRange = (1 << e.NORMAL.data.quantization.quantizationBits) - 1, m._isOctEncodedDraco = !0);
      var c,
          _ = p.styleableProperties,
          u = f.batchTableProperties;

      for (var h in u) {
        u.hasOwnProperty(h) && (c = e[h], ie(_) || (_ = {}), _[h] = {
          typedArray: c.array,
          componentCount: c.data.componentsPerAttribute
        });
      }

      p.positions = ne(o, p.positions), p.colors = ne(ne(i, n), p.colors), p.normals = ne(a, p.normals), p.batchIds = ne(s, p.batchIds), p.styleableProperties = _;
    }).otherwise(function (e) {
      m._decodingState = he.FAILED, m._readyPromise.reject(e);
    }))) : (o = !1, n = !ae.equals(this._modelMatrix, this.modelMatrix), this._mode !== e.mode && (this._mode = e.mode, n = !0), ie(this._drawCommand) || (function (e, t) {
      var r = t.context,
          o = e._parsedContent,
          n = e._pointsLength,
          i = o.positions,
          a = o.colors,
          s = o.normals,
          d = o.batchIds,
          l = o.styleableProperties,
          c = ie(l),
          _ = e._isQuantized,
          u = e._isQuantizedDraco,
          h = e._isOctEncoded16P,
          m = e._isOctEncodedDraco,
          p = e._quantizedRange,
          f = e._octEncodedRange,
          y = e._isRGB565,
          g = e._isTranslucent,
          S = e._hasColors,
          v = e._hasNormals,
          T = e._hasBatchIds,
          E = [],
          A = {};

      if (e._styleableShaderAttributes = A, c) {
        var C,
            I,
            b,
            P,
            O,
            N,
            D = 4;

        for (var R in l) {
          l.hasOwnProperty(R) && (I = fe((C = l[R]).typedArray, R), b = C.componentCount, P = Y.fromTypedArray(I), O = V.createVertexBuffer({
            context: r,
            typedArray: I,
            usage: H.STATIC_DRAW
          }), e._geometryByteLength += O.sizeInBytes, N = {
            index: D,
            vertexBuffer: O,
            componentsPerAttribute: b,
            componentDatatype: P,
            normalize: !1,
            offsetInBytes: 0,
            strideInBytes: 0
          }, E.push(N), A[R] = {
            location: D,
            componentCount: b
          }, ++D);
        }
      }

      var B,
          L,
          w,
          z = V.createVertexBuffer({
        context: r,
        typedArray: i,
        usage: H.STATIC_DRAW
      });
      e._geometryByteLength += z.sizeInBytes, S && (B = V.createVertexBuffer({
        context: r,
        typedArray: a,
        usage: H.STATIC_DRAW
      }), e._geometryByteLength += B.sizeInBytes), v && (L = V.createVertexBuffer({
        context: r,
        typedArray: s,
        usage: H.STATIC_DRAW
      }), e._geometryByteLength += L.sizeInBytes), T && (d = fe(d, "batchIds"), w = V.createVertexBuffer({
        context: r,
        typedArray: d,
        usage: H.STATIC_DRAW
      }), e._geometryByteLength += w.sizeInBytes);
      var x,
          G = [];
      P = _ ? Y.UNSIGNED_SHORT : u ? p <= 255 ? Y.UNSIGNED_BYTE : Y.UNSIGNED_SHORT : Y.FLOAT, G.push({
        index: 0,
        vertexBuffer: z,
        componentsPerAttribute: 3,
        componentDatatype: P,
        normalize: !1,
        offsetInBytes: 0,
        strideInBytes: 0
      }), e._cull && (e._boundingSphere = _ || u ? U.fromCornerPoints(te.ZERO, e._quantizedVolumeScale) : pe(i)), S && (y ? G.push({
        index: 1,
        vertexBuffer: B,
        componentsPerAttribute: 1,
        componentDatatype: Y.UNSIGNED_SHORT,
        normalize: !1,
        offsetInBytes: 0,
        strideInBytes: 0
      }) : (x = g ? 4 : 3, G.push({
        index: 1,
        vertexBuffer: B,
        componentsPerAttribute: x,
        componentDatatype: Y.UNSIGNED_BYTE,
        normalize: !0,
        offsetInBytes: 0,
        strideInBytes: 0
      }))), v && (P = h ? (b = 2, Y.UNSIGNED_BYTE) : m ? (b = 2, f <= 255 ? Y.UNSIGNED_BYTE : Y.UNSIGNED_SHORT) : (b = 3, Y.FLOAT), G.push({
        index: 2,
        vertexBuffer: L,
        componentsPerAttribute: b,
        componentDatatype: P,
        normalize: !1,
        offsetInBytes: 0,
        strideInBytes: 0
      })), T && G.push({
        index: 3,
        vertexBuffer: w,
        componentsPerAttribute: 1,
        componentDatatype: Y.fromTypedArray(d),
        normalize: !1,
        offsetInBytes: 0,
        strideInBytes: 0
      }), c && (G = G.concat(E));
      var M = new J({
        context: r,
        attributes: G
      }),
          F = {
        depthTest: {
          enabled: !0
        }
      };
      e._opaquePass === W.PGEARTH_3D_TILE && (F.stencilTest = ee.setPGEarth3DTileBit(), F.stencilMask = ee.PGEARTH_3D_TILE_MASK), e._opaqueRenderState = j.fromCache(F), e._translucentRenderState = j.fromCache({
        depthTest: {
          enabled: !0
        },
        depthMask: !1,
        blending: K.ALPHA_BLEND
      }), e._drawCommand = new k({
        boundingVolume: new U(),
        cull: e._cull,
        modelMatrix: new ae(),
        primitiveType: q.POINTS,
        vertexArray: M,
        count: n,
        shaderProgram: void 0,
        uniformMap: void 0,
        renderState: g ? e._translucentRenderState : e._opaqueRenderState,
        pass: g ? W.TRANSLUCENT : e._opaquePass,
        owner: e,
        castShadows: !1,
        receiveShadows: !1,
        pickId: e._pickIdLoaded()
      });
    }(this, e), o = n = !0, this._ready = !0, this._readyPromise.resolve(this), this._parsedContent = void 0), n && (ae.clone(this.modelMatrix, this._modelMatrix), i = this._drawCommand.modelMatrix, ae.clone(this._modelMatrix, i), ie(this._rtcCenter) && ae.multiplyByTranslation(i, this._rtcCenter, i), ie(this._quantizedVolumeOffset) && ae.multiplyByTranslation(i, this._quantizedVolumeOffset, i), e.mode !== ue.SCENE3D && (a = e.mapProjection, s = ae.getColumn(i, 3, A), g.equals(s, g.UNIT_W) || S.basisTo2D(a, i, i)), d = this._drawCommand.boundingVolume, U.clone(this._boundingSphere, d), this._cull && (l = d.center, ae.multiplyByPoint(i, l, l), c = ae.getScale(i, C), d.radius *= te.maximumComponent(c))), this.clippingPlanesDirty && (o = !(this.clippingPlanesDirty = !1)), this._attenuation !== this.attenuation && (this._attenuation = this.attenuation, o = !0), this.backFaceCulling !== this._backFaceCulling && (this._backFaceCulling = this.backFaceCulling, o = !0), this.normalShading !== this._normalShading && (this._normalShading = this.normalShading, o = !0), this._style === this.style && !this.styleDirty || (this._style = this.style, o = !(this.styleDirty = !1)), o && E(this, e, this._style), this._drawCommand.castShadows = T.castShadows(this.shadows), this._drawCommand.receiveShadows = T.receiveShadows(this.shadows), _ = this._highlightColor.alpha < 1 || this._constantColor.alpha < 1 || this._styleTranslucent, this._drawCommand.renderState = _ ? this._translucentRenderState : this._opaqueRenderState, this._drawCommand.pass = _ ? W.TRANSLUCENT : this._opaquePass, u = e.commandList, ((h = e.passes).render || h.pick) && u.push(this._drawCommand));
  }, l.prototype.isDestroyed = function () {
    return !1;
  }, l.prototype.destroy = function () {
    var e = this._drawCommand;
    return ie(e) && (e.vertexArray = e.vertexArray && e.vertexArray.destroy(), e.shaderProgram = e.shaderProgram && e.shaderProgram.destroy()), r(this);
  }, l;
});