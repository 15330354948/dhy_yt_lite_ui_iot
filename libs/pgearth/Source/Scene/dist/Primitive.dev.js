"use strict";

define(["../Core/BoundingSphere", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Cartographic", "../Core/clone", "../Core/Color", "../Core/combine", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/EncodedCartesian3", "../Core/FeatureDetection", "../Core/Geometry", "../Core/GeometryAttribute", "../Core/GeometryAttributes", "../Core/GeometryOffsetAttribute", "../Core/Intersect", "../Core/isArray", "../Core/Matrix4", "../Core/Plane", "../Core/RuntimeError", "../Core/subdivideArray", "../Core/TaskProcessor", "../Renderer/BufferUsage", "../Renderer/ContextLimits", "../Renderer/DrawCommand", "../Renderer/Pass", "../Renderer/RenderState", "../Renderer/ShaderProgram", "../Renderer/ShaderSource", "../Renderer/VertexArray", "../ThirdParty/when", "./BatchTable", "./CullFace", "./DepthFunction", "./PrimitivePipeline", "./PrimitiveState", "./SceneMode", "./ShadowMode"], function (S, n, C, r, e, o, w, h, I, A, x, T, i, D, z, t, c, p, d, a, v, F, y, P, u, O, E, _, l, b, f, s, m, g, R, k, B, M, L, V, N, G, H) {
  "use strict";

  function U(e) {
    if (e = A(e, A.EMPTY_OBJECT), this.geometryInstances = e.geometryInstances, this.appearance = e.appearance, this._appearance = void 0, this._material = void 0, this.depthFailAppearance = e.depthFailAppearance, this._depthFailAppearance = void 0, this._depthFailMaterial = void 0, this.modelMatrix = y.clone(A(e.modelMatrix, y.IDENTITY)), this._modelMatrix = new y(), this.show = A(e.show, !0), this._vertexCacheOptimize = A(e.vertexCacheOptimize, !1), this._interleave = A(e.interleave, !1), this._releaseGeometryInstances = A(e.releaseGeometryInstances, !0), this._allowPicking = A(e.allowPicking, !0), this._asynchronous = A(e.asynchronous, !0), this._compressVertices = A(e.compressVertices, !0), this.cull = A(e.cull, !0), this.debugShowBoundingVolume = A(e.debugShowBoundingVolume, !1), this.rtcCenter = e.rtcCenter, x(this.rtcCenter) && (!x(this.geometryInstances) || F(this.geometryInstances) && 1 !== this.geometryInstances)) throw new D("Relative-to-center rendering only supports one geometry instance.");
    this.shadows = A(e.shadows, H.DISABLED), this._translucent = void 0, this._state = N.READY, this._geometries = [], this._error = void 0, this._numberOfInstances = 0, this._boundingSpheres = [], this._boundingSphereWC = [], this._boundingSphereCV = [], this._boundingSphere2D = [], this._boundingSphereMorph = [], this._perInstanceAttributeCache = [], this._instanceIds = [], this._lastPerInstanceAttributeIndex = 0, this._va = [], this._attributeLocations = void 0, this._primitiveType = void 0, this._frontFaceRS = void 0, this._backFaceRS = void 0, this._sp = void 0, this._depthFailAppearance = void 0, this._spDepthFail = void 0, this._frontFaceDepthFailRS = void 0, this._backFaceDepthFailRS = void 0, this._pickIds = [], this._colorCommands = [], this._pickCommands = [], this._readOnlyInstanceAttributes = e._readOnlyInstanceAttributes, this._createBoundingVolumeFunction = e._createBoundingVolumeFunction, this._createRenderStatesFunction = e._createRenderStatesFunction, this._createShaderProgramFunction = e._createShaderProgramFunction, this._createCommandsFunction = e._createCommandsFunction, this._updateAndQueueCommandsFunction = e._updateAndQueueCommandsFunction, this._createPickOffsets = e._createPickOffsets, this._pickOffsets = void 0, this._createGeometryResults = void 0, this._ready = !1, this._readyPromise = k.defer(), this._batchTable = void 0, this._batchTableAttributeIndices = void 0, this._offsetInstanceExtend = void 0, this._batchTableOffsetAttribute2DIndex = void 0, this._batchTableOffsetsUpdated = !1, this._instanceBoundingSpheres = void 0, this._instanceBoundingSpheresCV = void 0, this._tempBoundingSpheres = void 0, this._recomputeBoundingSpheres = !1, this._batchTableBoundingSpheresUpdated = !1, this._batchTableBoundingSphereAttributeIndices = void 0;
  }

  T(U.prototype, {
    vertexCacheOptimize: {
      get: function get() {
        return this._vertexCacheOptimize;
      }
    },
    interleave: {
      get: function get() {
        return this._interleave;
      }
    },
    releaseGeometryInstances: {
      get: function get() {
        return this._releaseGeometryInstances;
      }
    },
    allowPicking: {
      get: function get() {
        return this._allowPicking;
      }
    },
    asynchronous: {
      get: function get() {
        return this._asynchronous;
      }
    },
    compressVertices: {
      get: function get() {
        return this._compressVertices;
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
    }
  });
  var q = new n(),
      j = new C(),
      W = new r();

  function $(e) {
    var t = e.length;
    return 1 === t ? e[0] : 2 === t ? n.unpack(e, 0, q) : 3 === t ? C.unpack(e, 0, j) : 4 === t ? r.unpack(e, 0, W) : void 0;
  }

  function Y(e, t) {
    var n = e.geometryInstances,
        r = F(n) ? n : [n],
        i = r.length;

    if (0 !== i) {
      for (var a, o, s, c = function (e) {
        var t,
            n = e.length,
            r = [],
            i = e[0].attributes;

        for (t in i) {
          if (i.hasOwnProperty(t) && x(i[t])) {
            for (var a = i[t], o = !0, s = 1; s < n; ++s) {
              var c = e[s].attributes[t];

              if (!x(c) || a.componentDatatype !== c.componentDatatype || a.componentsPerAttribute !== c.componentsPerAttribute || a.normalize !== c.normalize) {
                o = !1;
                break;
              }
            }

            o && r.push(t);
          }
        }

        return r;
      }(r), h = c.length, p = [], d = {}, u = {}, l = r[0].attributes, _ = 0; _ < h; ++_) {
        s = l[o = c[_]], d[o] = _, p.push({
          functionName: "czm_batchTable_" + o,
          componentDatatype: s.componentDatatype,
          componentsPerAttribute: s.componentsPerAttribute,
          normalize: s.normalize
        });
      }

      -1 !== c.indexOf("distanceDisplayCondition") && (p.push({
        functionName: "czm_batchTable_boundingSphereCenter3DHigh",
        componentDatatype: I.FLOAT,
        componentsPerAttribute: 3
      }, {
        functionName: "czm_batchTable_boundingSphereCenter3DLow",
        componentDatatype: I.FLOAT,
        componentsPerAttribute: 3
      }, {
        functionName: "czm_batchTable_boundingSphereCenter2DHigh",
        componentDatatype: I.FLOAT,
        componentsPerAttribute: 3
      }, {
        functionName: "czm_batchTable_boundingSphereCenter2DLow",
        componentDatatype: I.FLOAT,
        componentsPerAttribute: 3
      }, {
        functionName: "czm_batchTable_boundingSphereRadius",
        componentDatatype: I.FLOAT,
        componentsPerAttribute: 1
      }), u.center3DHigh = p.length - 5, u.center3DLow = p.length - 4, u.center2DHigh = p.length - 3, u.center2DLow = p.length - 2, u.radius = p.length - 1), -1 !== c.indexOf("offset") && (p.push({
        functionName: "czm_batchTable_offset2D",
        componentDatatype: I.FLOAT,
        componentsPerAttribute: 3
      }), a = p.length - 1), p.push({
        functionName: "czm_batchTable_pickColor",
        componentDatatype: I.UNSIGNED_BYTE,
        componentsPerAttribute: 4,
        normalize: !0
      });
      var m = p.length,
          b = new B(t, p, i);

      for (_ = 0; _ < i; ++_) {
        for (var f = r[_], l = f.attributes, g = 0; g < h; ++g) {
          var v = $((s = l[o = c[g]]).value),
              y = d[o];
          b.setBatchedAttribute(_, y, v);
        }

        var S = {
          primitive: A(f.pickPrimitive, e)
        };
        x(f.id) && (S.id = f.id);
        var C = t.createPickId(S);

        e._pickIds.push(C);

        var T = C.color,
            D = W;
        D.x = w.floatToByte(T.red), D.y = w.floatToByte(T.green), D.z = w.floatToByte(T.blue), D.w = w.floatToByte(T.alpha), b.setBatchedAttribute(_, m - 1, D);
      }

      e._batchTable = b, e._batchTableAttributeIndices = d, e._batchTableBoundingSphereAttributeIndices = u, e._batchTableOffsetAttribute2DIndex = a;
    }
  }

  function Z(e) {
    var t,
        n,
        r,
        i,
        a = e.attributes,
        o = new d();

    for (var s in a) {
      a.hasOwnProperty(s) && x(a[s]) && (o[s] = (t = a[s], n = void 0, n = F(t.values) ? t.values.slice(0) : new t.values.constructor(t.values), new p({
        componentDatatype: t.componentDatatype,
        componentsPerAttribute: t.componentsPerAttribute,
        normalize: t.normalize,
        values: n
      })));
    }

    return x(e.indices) && (r = e.indices, i = F(r) ? r.slice(0) : new r.constructor(r)), new c({
      attributes: o,
      indices: i,
      primitiveType: e.primitiveType,
      boundingSphere: S.clone(e.boundingSphere)
    });
  }

  var X = /attribute\s+vec(?:3|4)\s+(.*)3DHigh;/g;

  function Q(e) {
    return g.replaceMain(e, "czm_non_pick_main") + "\nvarying vec4 v_pickColor; \nvoid main() \n{ \n    czm_non_pick_main(); \n    v_pickColor = czm_batchTable_pickColor(batchId); \n}";
  }

  function K(e) {
    return "varying vec4 v_pickColor;\n" + e;
  }

  function J(e, t) {
    if (!e.compressVertices) return t;
    var n = -1 !== t.search(/attribute\s+vec3\s+normal;/g),
        r = -1 !== t.search(/attribute\s+vec2\s+st;/g);
    if (!n && !r) return t;
    var i = -1 !== t.search(/attribute\s+vec3\s+tangent;/g),
        a = -1 !== t.search(/attribute\s+vec3\s+bitangent;/g),
        o = r && n ? 2 : 1,
        s = "compressedAttributes",
        c = "attribute " + (1 < (o += i || a ? 1 : 0) ? "vec" + o : "float") + " " + s + ";",
        h = "",
        p = "";
    r && (h += "vec2 st;\n", p += "    st = czm_decompressTextureCoordinates(" + (1 < o ? s + ".x" : s) + ");\n"), n && i && a ? (h += "vec3 normal;\nvec3 tangent;\nvec3 bitangent;\n", p += "    czm_octDecode(" + s + "." + (r ? "yz" : "xy") + ", normal, tangent, bitangent);\n") : (n && (h += "vec3 normal;\n", p += "    normal = czm_octDecode(" + s + (1 < o ? "." + (r ? "y" : "x") : "") + ");\n"), i && (h += "vec3 tangent;\n", p += "    tangent = czm_octDecode(" + s + "." + (r && n ? "z" : "y") + ");\n"), a && (h += "vec3 bitangent;\n", p += "    bitangent = czm_octDecode(" + s + "." + (r && n ? "z" : "y") + ");\n"));
    var d = t;
    return d = (d = (d = (d = d.replace(/attribute\s+vec3\s+normal;/g, "")).replace(/attribute\s+vec2\s+st;/g, "")).replace(/attribute\s+vec3\s+tangent;/g, "")).replace(/attribute\s+vec3\s+bitangent;/g, ""), [c, h, d = g.replaceMain(d, "czm_non_compressed_main"), "void main() \n{ \n" + p + "    czm_non_compressed_main(); \n}"].join("\n");
  }

  function ee(e, t) {
    var n = e.vertexAttributes;

    for (var r in n) {
      if (n.hasOwnProperty(r) && !x(t[r])) throw new D("Appearance/Geometry mismatch.  The appearance requires vertex shader attribute input '" + r + "', which was not computed as part of the Geometry.  Use the appearance's vertexFormat property when constructing the geometry.");
    }
  }

  U._modifyShaderPosition = function (e, t, n) {
    for (var r, i = "", a = "", o = ""; null !== (r = X.exec(t));) {
      var s = r[1],
          c = "vec4 czm_compute" + s[0].toUpperCase() + s.substr(1) + "()";
      "vec4 czm_computePosition()" != c && (i += c + ";\n"), x(e.rtcCenter) ? (i += "uniform mat4 u_modifiedModelView;\n", a += "attribute vec4 position;\n", o += c + "\n{\n    return u_modifiedModelView * position;\n}\n\n", t = (t = (t = (t = t.replace(/attribute\s+vec(?:3|4)\s+position3DHigh;/g, "")).replace(/attribute\s+vec(?:3|4)\s+position3DLow;/g, "")).replace(/czm_modelViewRelativeToEye\s+\*\s+/g, "")).replace(/czm_modelViewProjectionRelativeToEye/g, "czm_projection")) : n ? o += c + "\n{\n    return czm_translateRelativeToEye(" + s + "3DHigh, " + s + "3DLow);\n}\n\n" : (a += "attribute vec3 " + s + "2DHigh;\nattribute vec3 " + s + "2DLow;\n", o += c + "\n{\n    vec4 p;\n    if (czm_morphTime == 1.0)\n    {\n        p = czm_translateRelativeToEye(" + s + "3DHigh, " + s + "3DLow);\n    }\n    else if (czm_morphTime == 0.0)\n    {\n        p = czm_translateRelativeToEye(" + s + "2DHigh.zxy, " + s + "2DLow.zxy);\n    }\n    else\n    {\n        p = czm_columbusViewMorph(\n                czm_translateRelativeToEye(" + s + "2DHigh.zxy, " + s + "2DLow.zxy),\n                czm_translateRelativeToEye(" + s + "3DHigh, " + s + "3DLow),\n                czm_morphTime);\n    }\n    return p;\n}\n\n");
    }

    return [i, a, t, o].join("\n");
  }, U._appendShowToShader = function (e, t) {
    if (!x(e._batchTableAttributeIndices.show)) return t;
    return g.replaceMain(t, "czm_non_show_main") + "\nvoid main() \n{ \n    czm_non_show_main(); \n    gl_Position *= czm_batchTable_show(batchId); \n}";
  }, U._updateColorAttribute = function (e, t, n) {
    if (!x(e._batchTableAttributeIndices.color) && !x(e._batchTableAttributeIndices.depthFailColor)) return t;
    if (-1 === t.search(/attribute\s+vec4\s+color;/g)) return t;
    if (n && !x(e._batchTableAttributeIndices.depthFailColor)) throw new D("A depthFailColor per-instance attribute is required when using a depth fail appearance that uses a color attribute.");
    var r = (r = t).replace(/attribute\s+vec4\s+color;/g, "");
    return r = n ? r.replace(/(\b)color(\b)/g, "$1czm_batchTable_depthFailColor(batchId)$2") : r.replace(/(\b)color(\b)/g, "$1czm_batchTable_color(batchId)$2");
  }, U._updatePickColorAttribute = function (e) {
    return e.replace(/attribute\s+vec4\s+pickColor;/g, "").replace(/(\b)pickColor(\b)/g, "$1czm_batchTable_pickColor(batchId)$2");
  }, U._appendOffsetToShader = function (e, t) {
    if (!x(e._batchTableAttributeIndices.offset)) return t;
    var n = t.replace(/attribute\s+float\s+batchId;/g, "attribute float batchId;\nattribute float applyOffset;");
    return n = n.replace(/vec4\s+([A-Za-z0-9_]+)\s+=\s+czm_computePosition\(\);/g, "vec4 $1 = czm_computePosition();\n    if (czm_sceneMode == czm_sceneMode3D)\n    {\n        $1 = $1 + vec4(czm_batchTable_offset(batchId) * applyOffset, 0.0);    }\n    else\n    {\n        $1 = $1 + vec4(czm_batchTable_offset2D(batchId) * applyOffset, 0.0);    }\n");
  }, U._appendDistanceDisplayConditionToShader = function (e, t, n) {
    if (!x(e._batchTableAttributeIndices.distanceDisplayCondition)) return t;
    var r = "void main() \n{ \n    czm_non_distanceDisplayCondition_main(); \n    vec2 distanceDisplayCondition = czm_batchTable_distanceDisplayCondition(batchId);\n    vec3 boundingSphereCenter3DHigh = czm_batchTable_boundingSphereCenter3DHigh(batchId);\n    vec3 boundingSphereCenter3DLow = czm_batchTable_boundingSphereCenter3DLow(batchId);\n    float boundingSphereRadius = czm_batchTable_boundingSphereRadius(batchId);\n";
    return r += n ? "    vec4 centerRTE = czm_translateRelativeToEye(boundingSphereCenter3DHigh, boundingSphereCenter3DLow);\n" : "    vec3 boundingSphereCenter2DHigh = czm_batchTable_boundingSphereCenter2DHigh(batchId);\n    vec3 boundingSphereCenter2DLow = czm_batchTable_boundingSphereCenter2DLow(batchId);\n    vec4 centerRTE;\n    if (czm_morphTime == 1.0)\n    {\n        centerRTE = czm_translateRelativeToEye(boundingSphereCenter3DHigh, boundingSphereCenter3DLow);\n    }\n    else if (czm_morphTime == 0.0)\n    {\n        centerRTE = czm_translateRelativeToEye(boundingSphereCenter2DHigh.zxy, boundingSphereCenter2DLow.zxy);\n    }\n    else\n    {\n        centerRTE = czm_columbusViewMorph(\n                czm_translateRelativeToEye(boundingSphereCenter2DHigh.zxy, boundingSphereCenter2DLow.zxy),\n                czm_translateRelativeToEye(boundingSphereCenter3DHigh, boundingSphereCenter3DLow),\n                czm_morphTime);\n    }\n", g.replaceMain(t, "czm_non_distanceDisplayCondition_main") + "\n" + (r += "    float radiusSq = boundingSphereRadius * boundingSphereRadius; \n    float distanceSq; \n    if (czm_sceneMode == czm_sceneMode2D) \n    { \n        distanceSq = czm_eyeHeight2D.y - radiusSq; \n    } \n    else \n    { \n        distanceSq = dot(centerRTE.xyz, centerRTE.xyz) - radiusSq; \n    } \n    distanceSq = max(distanceSq, 0.0); \n    float nearSq = distanceDisplayCondition.x * distanceDisplayCondition.x; \n    float farSq = distanceDisplayCondition.y * distanceDisplayCondition.y; \n    float show = (distanceSq >= nearSq && distanceSq <= farSq) ? 1.0 : 0.0; \n    gl_Position *= show; \n}");
  };
  var te,
      ne = Math.max(t.hardwareConcurrency - 1, 1),
      re = new E("combineGeometry", Number.POSITIVE_INFINITY);

  function ie(e, t) {
    for (var n, r, i = F(e.geometryInstances) ? e.geometryInstances : [e.geometryInstances], a = e._numberOfInstances = i.length, o = new Array(a), s = e._instanceIds, c = 0, h = 0; h < a; h++) {
      var p = (n = i[h]).geometry,
          d = x(p.attributes) && x(p.primitiveType) ? Z(p) : p.constructor.createGeometry(p);
      o[c++] = {
        geometry: d,
        attributes: (r = n).attributes,
        modelMatrix: y.clone(r.modelMatrix),
        pickPrimitive: r.pickPrimitive,
        id: r.id
      }, s.push(n.id);
    }

    o.length = c;

    var u = t.scene3DOnly,
        l = t.mapProjection,
        _ = V.combineGeometry({
      instances: o,
      ellipsoid: l.ellipsoid,
      projection: l,
      elementIndexUintSupported: t.context.elementIndexUint,
      scene3DOnly: u,
      vertexCacheOptimize: e.vertexCacheOptimize,
      compressVertices: e.compressVertices,
      modelMatrix: e.modelMatrix,
      createPickOffsets: e._createPickOffsets
    });

    e._geometries = _.geometries, e._attributeLocations = _.attributeLocations, e.modelMatrix = y.clone(_.modelMatrix, e.modelMatrix), e._pickOffsets = _.pickOffsets, e._offsetInstanceExtend = _.offsetInstanceExtend, e._instanceBoundingSpheres = _.boundingSpheres, e._instanceBoundingSpheresCV = _.boundingSpheresCV, x(e._geometries) && 0 < e._geometries.length ? (e._recomputeBoundingSpheres = !0, e._state = N.COMBINED) : Te(e, t, N.FAILED, void 0);
  }

  var ae = new z(),
      oe = new e(),
      se = new C(),
      ce = new S();
  var he = new C(),
      pe = new C();

  function de(e, t) {
    if (x(e._batchTableAttributeIndices.offset) && !e._batchTableOffsetsUpdated && !t.scene3DOnly) {
      for (var n = e._batchTableOffsetAttribute2DIndex, r = t.mapProjection, i = r.ellipsoid, a = e._batchTable, o = e._instanceBoundingSpheres, s = o.length, c = 0; c < s; ++c) {
        var h,
            p,
            d,
            u,
            l,
            _,
            m,
            b,
            f,
            g = o[c];

        x(g) && (h = a.getBatchedAttribute(c, e._batchTableAttributeIndices.offset), C.equals(h, C.ZERO) ? a.setBatchedAttribute(c, n, C.ZERO) : (p = e.modelMatrix, x(p) && (g = S.transform(g, p, ce)), d = g.center, d = i.scaleToGeodeticSurface(d, pe), _ = i.cartesianToCartographic(d, oe), u = r.project(_, se), l = C.add(h, d, he), _ = i.cartesianToCartographic(l, _), m = r.project(_, he), f = (b = C.subtract(m, u, he)).x, b.x = b.z, b.z = b.y, b.y = f, a.setBatchedAttribute(c, n, b)));
      }

      e._batchTableOffsetsUpdated = !0;
    }
  }

  function ue(e, t, n, r) {
    var i,
        a = n.getRenderState();
    r ? ((i = o(a, !1)).cull = {
      enabled: !0,
      face: M.BACK
    }, e._frontFaceRS = s.fromCache(i), i.cull.face = M.FRONT, e._backFaceRS = s.fromCache(i)) : (e._frontFaceRS = s.fromCache(a), e._backFaceRS = e._frontFaceRS), i = o(a, !1), x(e._depthFailAppearance) && (i.depthTest.enabled = !1), x(e._depthFailAppearance) && (a = e._depthFailAppearance.getRenderState(), (i = o(a, !1)).depthTest.func = L.GREATER, r ? (i.cull = {
      enabled: !0,
      face: M.BACK
    }, e._frontFaceDepthFailRS = s.fromCache(i), i.cull.face = M.FRONT, e._backFaceDepthFailRS = s.fromCache(i)) : (e._frontFaceDepthFailRS = s.fromCache(i), e._backFaceDepthFailRS = e._frontFaceRS));
  }

  function le(e, t, n) {
    var r = t.context,
        i = e._attributeLocations,
        a = e._batchTable.getVertexShaderCallback()(n.vertexShaderSource),
        a = U._appendOffsetToShader(e, a);

    a = U._appendShowToShader(e, a), a = Q(a = U._appendDistanceDisplayConditionToShader(e, a, t.scene3DOnly)), a = J(e, a = U._updateColorAttribute(e, a, !1)), a = U._modifyShaderPosition(e, a, t.scene3DOnly);
    var o,
        s,
        c,
        h = K(h = n.getFragmentShaderSource());
    e._sp = m.replaceCache({
      context: r,
      shaderProgram: e._sp,
      vertexShaderSource: a,
      fragmentShaderSource: h,
      attributeLocations: i
    }), ee(e._sp, i), x(e._depthFailAppearance) && (a = e._batchTable.getVertexShaderCallback()(e._depthFailAppearance.vertexShaderSource), a = U._appendShowToShader(e, a), a = Q(a = U._appendDistanceDisplayConditionToShader(e, a, t.scene3DOnly)), a = J(e, a = U._updateColorAttribute(e, a, !0)), a = U._modifyShaderPosition(e, a, t.scene3DOnly), s = a, c = g.replaceMain(s, "czm_non_depth_clamp_main"), a = c += "varying float v_WindowZ;\nvoid main() {\n    czm_non_depth_clamp_main();\n    vec4 position = gl_Position;\n    v_WindowZ = (0.5 * (position.z / position.w) + 0.5) * position.w;\n    position.z = min(position.z, position.w);\n    gl_Position = position;\n}\n", h = K(h = e._depthFailAppearance.getFragmentShaderSource()), o = h, h = "#ifdef GL_EXT_frag_depth\n#extension GL_EXT_frag_depth : enable\n#endif\n" + g.replaceMain(o, "czm_non_depth_clamp_main") + "varying float v_WindowZ;\nvoid main() {\n    czm_non_depth_clamp_main();\n#if defined(GL_EXT_frag_depth) && !defined(LOG_DEPTH)\n    gl_FragDepthEXT = min(v_WindowZ * gl_FragCoord.w, 1.0);\n#endif\n}\n", e._spDepthFail = m.replaceCache({
      context: r,
      shaderProgram: e._spDepthFail,
      vertexShaderSource: a,
      fragmentShaderSource: h,
      attributeLocations: i
    }), ee(e._spDepthFail, i));
  }

  var _e = new y(),
      me = new C();

  function be(t, e, n, r) {
    var i = x(n) ? n._uniforms : void 0,
        a = {},
        o = e.uniforms;
    if (x(o)) for (var s in o) {
      if (o.hasOwnProperty(s)) {
        if (x(i) && x(i[s])) throw new D("Appearance and material have a uniform with the same name: " + s);

        a[s] = function (e, t) {
          return function () {
            return e[t];
          };
        }(o, s);
      }
    }

    var c = h(a, i),
        c = t._batchTable.getUniformMapCallback()(c);

    return x(t.rtcCenter) && (c.u_modifiedModelView = function () {
      var e = r.context.uniformState.view;
      return y.multiply(e, t._modelMatrix, _e), y.multiplyByPoint(_e, t.rtcCenter, me), y.setTranslation(_e, me, _e), _e;
    }), c;
  }

  function fe(e, t, n, r, i, a, o, s) {
    var c,
        h = be(e, t, n, s);
    x(e._depthFailAppearance) && (c = be(e, e._depthFailAppearance, e._depthFailAppearance.material, s));
    var p = r ? f.TRANSLUCENT : f.OPAQUE,
        d = i ? 2 : 1;
    d *= x(e._depthFailAppearance) ? 2 : 1, a.length = e._va.length * d;

    for (var u, l = a.length, _ = 0, m = 0; m < l; ++m) {
      i && (u = a[m], x(u) || (u = a[m] = new b({
        owner: e,
        primitiveType: e._primitiveType
      })), u.vertexArray = e._va[_], u.renderState = e._backFaceRS, u.shaderProgram = e._sp, u.uniformMap = h, u.pass = p, ++m), u = a[m], x(u) || (u = a[m] = new b({
        owner: e,
        primitiveType: e._primitiveType
      })), u.vertexArray = e._va[_], u.renderState = e._frontFaceRS, u.shaderProgram = e._sp, u.uniformMap = h, u.pass = p, x(e._depthFailAppearance) && (i && (u = a[++m], x(u) || (u = a[m] = new b({
        owner: e,
        primitiveType: e._primitiveType
      })), u.vertexArray = e._va[_], u.renderState = e._backFaceDepthFailRS, u.shaderProgram = e._spDepthFail, u.uniformMap = c, u.pass = p), u = a[++m], x(u) || (u = a[m] = new b({
        owner: e,
        primitiveType: e._primitiveType
      })), u.vertexArray = e._va[_], u.renderState = e._frontFaceDepthFailRS, u.shaderProgram = e._spDepthFail, u.uniformMap = c, u.pass = p), ++_;
    }
  }

  function ge(e, t, n, r, i, a, o, s) {
    if (t.mode !== G.SCENE3D && !y.equals(i, y.IDENTITY)) throw new D("Primitive.modelMatrix is only supported in 3D mode.");
    var c;
    U._updateBoundingVolumes(e, t, i), t.mode === G.SCENE3D ? c = e._boundingSphereWC : t.mode === G.COLUMBUS_VIEW ? c = e._boundingSphereCV : t.mode === G.SCENE2D && x(e._boundingSphere2D) ? c = e._boundingSphere2D : x(e._boundingSphereMorph) && (c = e._boundingSphereMorph);
    var h = t.commandList,
        p = t.passes;

    if (p.render || p.pick) {
      var d = e.allowPicking,
          u = H.castShadows(e.shadows),
          l = H.receiveShadows(e.shadows),
          _ = n.length,
          m = s ? 2 : 1;
      m *= x(e._depthFailAppearance) ? 2 : 1;

      for (var b = 0; b < _; ++b) {
        var f = Math.floor(b / m),
            g = n[b];
        g.modelMatrix = i, g.boundingVolume = c[f], g.cull = a, g.debugShowBoundingVolume = o, g.castShadows = u, g.receiveShadows = l, g.pickId = d ? "v_pickColor" : void 0, h.push(g);
      }
    }
  }

  U._updateBoundingVolumes = function (e, t, n, r) {
    var i, a, o;
    if (r || !y.equals(n, e._modelMatrix)) for (y.clone(n, e._modelMatrix), a = e._boundingSpheres.length, i = 0; i < a; ++i) {
      o = e._boundingSpheres[i], x(o) && (e._boundingSphereWC[i] = S.transform(o, n, e._boundingSphereWC[i]), t.scene3DOnly || (e._boundingSphere2D[i] = S.clone(e._boundingSphereCV[i], e._boundingSphere2D[i]), e._boundingSphere2D[i].center.x = 0, e._boundingSphereMorph[i] = S.union(e._boundingSphereWC[i], e._boundingSphereCV[i])));
    }
    var s = e.appearance.pixelSize;
    if (x(s)) for (a = e._boundingSpheres.length, i = 0; i < a; ++i) {
      o = e._boundingSpheres[i];
      var c = e._boundingSphereWC[i],
          h = t.camera.getPixelSize(o, t.context.drawingBufferWidth, t.context.drawingBufferHeight) * s;
      c.radius = o.radius + h;
    }
  }, U.prototype.update = function (e) {
    if (!(!x(this.geometryInstances) && 0 === this._va.length || x(this.geometryInstances) && F(this.geometryInstances) && 0 === this.geometryInstances.length || !x(this.appearance) || e.mode !== G.SCENE3D && e.scene3DOnly || !e.passes.render && !e.passes.pick)) {
      if (x(this._error)) throw this._error;
      if (x(this.rtcCenter) && !e.scene3DOnly) throw new D("RTC rendering is only available for 3D only scenes.");

      if (this._state !== N.FAILED) {
        var t,
            n,
            r,
            i,
            a,
            o,
            s,
            c,
            h = e.context;

        if (x(this._batchTable) || Y(this, h), 0 < this._batchTable.attributes.length) {
          if (0 === l.maximumVertexTextureImageUnits) throw new u("Vertex texture fetch support is required to render primitives with per-instance attributes. The maximum number of vertex texture image units must be greater than zero.");

          this._batchTable.update(e);
        }

        this._state !== N.COMPLETE && this._state !== N.COMBINED && (this.asynchronous ? function (n, r) {
          var e,
              t,
              i,
              a,
              o,
              s,
              c = n._instanceIds;

          if (n._state === N.READY) {
            i = F(n.geometryInstances) ? n.geometryInstances : [n.geometryInstances];

            for (var h, p = n._numberOfInstances = i.length, d = [], u = [], l = 0; l < p; ++l) {
              if (e = i[l].geometry, c.push(i[l].id), !x(e._workerName)) throw new D("_workerName must be defined for asynchronous geometry.");
              u.push({
                moduleName: e._workerName,
                geometry: e
              });
            }

            if (!x(te)) for (te = new Array(ne), l = 0; l < ne; l++) {
              te[l] = new E("createGeometry", Number.POSITIVE_INFINITY);
            }

            for (u = O(u, ne), l = 0; l < u.length; l++) {
              var _ = 0,
                  m = u[l],
                  b = m.length;

              for (v = 0; v < b; ++v) {
                e = (h = m[v]).geometry, x(e.constructor.pack) && (h.offset = _, _ += A(e.constructor.packedLength, e.packedLength));
              }

              if (0 < _) for (var f = new Float64Array(_), g = [f.buffer], v = 0; v < b; ++v) {
                e = (h = m[v]).geometry, x(e.constructor.pack) && (e.constructor.pack(e, f, h.offset), h.geometry = f);
              }
              d.push(te[l].scheduleTask({
                subTasks: u[l]
              }, g));
            }

            n._state = N.CREATING, k.all(d, function (e) {
              n._createGeometryResults = e, n._state = N.CREATED;
            }).otherwise(function (e) {
              Te(n, r, N.FAILED, e);
            });
          } else {
            n._state === N.CREATED && (t = [], i = F(n.geometryInstances) ? n.geometryInstances : [n.geometryInstances], a = r.scene3DOnly, o = r.mapProjection, s = re.scheduleTask(V.packCombineGeometryParameters({
              createGeometryResults: n._createGeometryResults,
              instances: i,
              ellipsoid: o.ellipsoid,
              projection: o,
              elementIndexUintSupported: r.context.elementIndexUint,
              scene3DOnly: a,
              vertexCacheOptimize: n.vertexCacheOptimize,
              compressVertices: n.compressVertices,
              modelMatrix: n.modelMatrix,
              createPickOffsets: n._createPickOffsets
            }, t), t), n._createGeometryResults = void 0, n._state = N.COMBINING, k(s, function (e) {
              var t = V.unpackCombineGeometryResults(e);
              n._geometries = t.geometries, n._attributeLocations = t.attributeLocations, n.modelMatrix = y.clone(t.modelMatrix, n.modelMatrix), n._pickOffsets = t.pickOffsets, n._offsetInstanceExtend = t.offsetInstanceExtend, n._instanceBoundingSpheres = t.boundingSpheres, n._instanceBoundingSpheresCV = t.boundingSpheresCV, x(n._geometries) && 0 < n._geometries.length ? (n._recomputeBoundingSpheres = !0, n._state = N.COMBINED) : Te(n, r, N.FAILED, void 0);
            }).otherwise(function (e) {
              Te(n, r, N.FAILED, e);
            }));
          }
        } : ie)(this, e), this._state === N.COMBINED && (function (e, t) {
          if (x(e._batchTableAttributeIndices.distanceDisplayCondition) && !e._batchTableBoundingSpheresUpdated) {
            for (var n = e._batchTableBoundingSphereAttributeIndices, r = n.center3DHigh, i = n.center3DLow, a = n.center2DHigh, o = n.center2DLow, s = n.radius, c = t.mapProjection, h = c.ellipsoid, p = e._batchTable, d = e._instanceBoundingSpheres, u = d.length, l = 0; l < u; ++l) {
              var _,
                  m,
                  b,
                  f,
                  g,
                  v,
                  y = d[l];

              x(y) && (_ = e.modelMatrix, x(_) && (y = S.transform(y, _, ce)), m = y.center, b = y.radius, v = z.fromCartesian(m, ae), p.setBatchedAttribute(l, r, v.high), p.setBatchedAttribute(l, i, v.low), t.scene3DOnly || (f = h.cartesianToCartographic(m, oe), g = c.project(f, se), v = z.fromCartesian(g, ae), p.setBatchedAttribute(l, a, v.high), p.setBatchedAttribute(l, o, v.low)), p.setBatchedAttribute(l, s, b));
            }

            e._batchTableBoundingSpheresUpdated = !0;
          }
        }(this, e), de(this, e), function (e, t) {
          for (var n = e._attributeLocations, r = e._geometries, i = t.scene3DOnly, a = t.context, o = [], s = r.length, c = 0; c < s; ++c) {
            var h,
                p,
                d,
                u,
                l = r[c];
            o.push(R.fromGeometry({
              context: a,
              geometry: l,
              attributeLocations: n,
              bufferUsage: _.STATIC_DRAW,
              interleave: e._interleave
            })), x(e._createBoundingVolumeFunction) ? e._createBoundingVolumeFunction(t, l) : (e._boundingSpheres.push(S.clone(l.boundingSphere)), e._boundingSphereWC.push(new S()), i || (p = (h = l.boundingSphereCV.center).x, d = h.y, u = h.z, h.x = u, h.y = p, h.z = d, e._boundingSphereCV.push(S.clone(l.boundingSphereCV)), e._boundingSphere2D.push(new S()), e._boundingSphereMorph.push(new S())));
          }

          e._va = o, e._primitiveType = r[0].primitiveType, e.releaseGeometryInstances && (e.geometryInstances = void 0), e._geometries = void 0, Te(e, t, N.COMPLETE, void 0);
        }(this, e)), this.show && this._state === N.COMPLETE && (this._batchTableOffsetsUpdated || de(this, e), this._recomputeBoundingSpheres && function (e, t) {
          var n = e._batchTableAttributeIndices.offset;

          if (e._recomputeBoundingSpheres && x(n)) {
            var r = e._offsetInstanceExtend,
                i = e._instanceBoundingSpheres,
                a = i.length,
                o = e._tempBoundingSpheres;

            if (!x(o)) {
              for (o = new Array(a), u = 0; u < a; u++) {
                o[u] = new S();
              }

              e._tempBoundingSpheres = o;
            }

            for (u = 0; u < a; ++u) {
              var s = o[u],
                  c = e._batchTable.getBatchedAttribute(u, n, new C());

              Se(s = i[u].clone(s), c, r[u]);
            }

            for (var h = [], p = [], d = [], u = 0; u < a; ++u) {
              var l = o[u];
              0 < l.center.x - l.radius || S.intersectPlane(l, P.ORIGIN_ZX_PLANE) !== v.INTERSECTING ? h.push(l) : (p.push(l), d.push(l));
            }

            var _ = h[0],
                m = d[0],
                b = p[0];

            for (u = 1; u < h.length; u++) {
              _ = S.union(_, h[u]);
            }

            for (u = 1; u < d.length; u++) {
              m = S.union(m, d[u]);
            }

            for (u = 1; u < p.length; u++) {
              b = S.union(b, p[u]);
            }

            var f = [];

            for (x(_) && f.push(_), x(m) && f.push(m), x(b) && f.push(b), u = 0; u < f.length; u++) {
              var g = f[u].clone(e._boundingSpheres[u]);
              e._boundingSpheres[u] = g, e._boundingSphereCV[u] = S.projectTo2D(g, t.mapProjection, e._boundingSphereCV[u]);
            }

            U._updateBoundingVolumes(e, t, e.modelMatrix, !0), e._recomputeBoundingSpheres = !1;
          } else e._recomputeBoundingSpheres = !1;
        }(this, e), n = (t = this.appearance).material, i = r = !1, this._appearance !== t ? (this._appearance = t, this._material = n, i = r = !0) : this._material !== n && (this._material = n, i = !0), a = this.depthFailAppearance, o = x(a) ? a.material : void 0, this._depthFailAppearance !== a ? (this._depthFailAppearance = a, this._depthFailMaterial = o, i = r = !0) : this._depthFailMaterial !== o && (this._depthFailMaterial = o, i = !0), s = this._appearance.isTranslucent(), this._translucent !== s && (this._translucent = s, r = !0), x(this._material) && this._material.update(h), c = t.closed && s, r && A(this._createRenderStatesFunction, ue)(this, h, t, c), i && A(this._createShaderProgramFunction, le)(this, e, t), (r || i) && A(this._createCommandsFunction, fe)(this, t, n, s, c, this._colorCommands, this._pickCommands, e), A(this._updateAndQueueCommandsFunction, ge)(this, e, this._colorCommands, this._pickCommands, this.modelMatrix, this.cull, this.debugShowBoundingVolume, c));
      }
    }
  };
  var ve = new S(),
      ye = new S();

  function Se(e, t, n) {
    var r, i;
    return n === a.TOP ? (r = S.clone(e, ve), (i = S.clone(e, ye)).center = C.add(i.center, t, i.center), e = S.union(r, i, e)) : n === a.ALL && (e.center = C.add(e.center, t, e.center)), e;
  }

  var Ce = new C();

  function Te(e, t, n, r) {
    e._error = r, e._state = n, t.afterRender.push(function () {
      e._ready = e._state === N.COMPLETE || e._state === N.FAILED, x(r) ? e._readyPromise.reject(r) : e._readyPromise.resolve(e);
    });
  }

  return U.prototype.getGeometryInstanceAttributes = function (e) {
    if (!x(e)) throw new D("id is required");
    if (!x(this._batchTable)) throw new D("must call update before calling getGeometryInstanceAttributes");

    for (var t = -1, n = this._lastPerInstanceAttributeIndex, r = this._instanceIds, i = r.length, a = 0; a < i; ++a) {
      var o = (n + a) % i;

      if (e === r[o]) {
        t = o;
        break;
      }
    }

    if (-1 !== t) {
      var s = this._perInstanceAttributeCache[t];
      if (x(s)) return s;
      var c,
          h,
          p,
          d,
          u,
          l = this._batchTable,
          _ = this._batchTableAttributeIndices,
          s = {},
          m = {};

      for (var b in _) {
        if (_.hasOwnProperty(b)) {
          var f = _[b];
          m[b] = {
            get: function (i, a, o) {
              return function () {
                var e = i.getBatchedAttribute(a, o),
                    t = i.attributes[o],
                    n = t.componentsPerAttribute,
                    r = I.createTypedArray(t.componentDatatype, n);
                return x(e.constructor.pack) ? e.constructor.pack(e, r, 0) : r[0] = e, r;
              };
            }(l, t, f)
          };
          var g = !0,
              v = this._readOnlyInstanceAttributes;

          if (g && x(v)) {
            i = v.length;

            for (var y = 0; y < i; ++y) {
              if (b === v[y]) {
                g = !1;
                break;
              }
            }
          }

          g && (m[b].set = function (n, r, i, a, o) {
            return function (e) {
              if (!x(e) || !x(e.length) || e.length < 1 || 4 < e.length) throw new D("value must be and array with length between 1 and 4.");
              var t = $(e);
              n.setBatchedAttribute(r, i, t), "offset" === o && (a._recomputeBoundingSpheres = !0, a._batchTableOffsetsUpdated = !1);
            };
          }(l, t, f, this, b));
        }
      }

      return c = this, p = t, (h = m).boundingSphere = {
        get: function get() {
          var e,
              t,
              n = c._instanceBoundingSpheres[p];
          return x(n) && (n = n.clone(), e = c.modelMatrix, t = h.offset, x(t) && Se(n, C.fromArray(t.get(), 0, Ce), c._offsetInstanceExtend[p]), x(e) && (n = S.transform(n, e))), n;
        }
      }, h.boundingSphereCV = {
        get: function get() {
          return c._instanceBoundingSpheresCV[p];
        }
      }, d = this, u = t, m.pickId = {
        get: function get() {
          return d._pickIds[u];
        }
      }, T(s, m), this._lastPerInstanceAttributeIndex = t, this._perInstanceAttributeCache[t] = s;
    }
  }, U.prototype.isDestroyed = function () {
    return !1;
  }, U.prototype.destroy = function () {
    this._sp = this._sp && this._sp.destroy(), this._pickSP = this._pickSP && this._pickSP.destroy();

    for (var e = this._va, t = e.length, n = 0; n < t; ++n) {
      e[n].destroy();
    }

    this._va = void 0;
    var r = this._pickIds;

    for (t = r.length, n = 0; n < t; ++n) {
      r[n].destroy();
    }

    return this._pickIds = void 0, this._batchTable = this._batchTable && this._batchTable.destroy(), this._instanceIds = void 0, this._perInstanceAttributeCache = void 0, this._attributeLocations = void 0, i(this);
  }, U;
});