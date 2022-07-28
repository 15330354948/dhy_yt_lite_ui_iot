"use strict";

define(["../Core/arraySlice", "../Core/BoundingSphere", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Color", "../Core/combine", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/FeatureDetection", "../Core/IndexDatatype", "../Core/Matrix4", "../Core/PrimitiveType", "../Core/RuntimeError", "../Core/Transforms", "../Core/WebGLConstants", "../ThirdParty/GltfPipeline/addDefaults", "../ThirdParty/GltfPipeline/ForEach", "../ThirdParty/GltfPipeline/getAccessorByteStride", "../ThirdParty/GltfPipeline/numberOfComponentsForType", "../ThirdParty/GltfPipeline/parseGlb", "../ThirdParty/GltfPipeline/updateVersion", "../ThirdParty/when", "./Axis", "./ClassificationType", "./ModelLoadResources", "./ModelUtility", "./processModelMaterialsCommon", "./processPbrMaterials", "./SceneMode", "./Vector3DTileBatch", "./Vector3DTilePrimitive"], function (W, q, F, y, z, H, Y, d, k, e, t, r, b, J, j, X, u, v, T, f, C, g, x, h, c, _, E, i, S, Z, m, l, A, Q, K) {
  "use strict";

  if (!b.supportsTypedArrays()) return {};
  var n = new F(),
      O = Z.ModelState;

  function o(e) {
    var t = (e = d(e, d.EMPTY_OBJECT)).gltf;
    if (t instanceof ArrayBuffer && (t = new Uint8Array(t)), !(t instanceof Uint8Array)) throw new u("Only binary glTF is supported as a classifier.");
    t = h(t), c(t), f(t), m(t), l(t), C.buffer(t, function (e) {
      if (!k(e.extras._pipeline.source)) throw new u("Buffer data must be embedded in the binary gltf.");
    });
    var i = t.nodes,
        r = t.meshes,
        n = i[0].mesh;
    if (1 !== i.length || !k(n)) throw new u("Only one node is supported for classification and it must have a mesh.");
    if (1 !== r.length) throw new u("Only one mesh is supported when using b3dm for classification.");
    var o = r[0].primitives;
    if (1 !== o.length) throw new u("Only one primitive per mesh is supported when using b3dm for classification.");
    var s = o[0].attributes.POSITION;
    if (!k(s)) throw new u("The mesh must have a position attribute.");
    var a = o[0].attributes._BATCHID;
    if (!k(a)) throw new u("The mesh must have a batch id attribute.");
    this._gltf = t, this.show = d(e.show, !0), this.modelMatrix = j.clone(d(e.modelMatrix, j.IDENTITY)), this._modelMatrix = j.clone(this.modelMatrix), this._ready = !1, this._readyPromise = _.defer(), this.debugShowBoundingVolume = d(e.debugShowBoundingVolume, !1), this._debugShowBoundingVolume = !1, this.debugWireframe = d(e.debugWireframe, !1), this._debugWireframe = !1, this._classificationType = e.classificationType, this._vertexShaderLoaded = e.vertexShaderLoaded, this._classificationShaderLoaded = e.classificationShaderLoaded, this._uniformMapLoaded = e.uniformMapLoaded, this._pickIdLoaded = e.pickIdLoaded, this._ignoreCommands = d(e.ignoreCommands, !1), this._upAxis = d(e.upAxis, E.Y), this._batchTable = e.batchTable, this._computedModelMatrix = new j(), this._initialRadius = void 0, this._boundingSphere = void 0, this._scaledBoundingSphere = new q(), this._state = O.NEEDS_LOAD, this._loadResources = void 0, this._mode = void 0, this._dirty = !1, this._nodeMatrix = new j(), this._primitive = void 0, this._extensionsUsed = void 0, this._extensionsRequired = void 0, this._quantizedUniforms = void 0, this._buffers = {}, this._vertexArray = void 0, this._shaderProgram = void 0, this._uniformMap = void 0, this._geometryByteLength = 0, this._trianglesLength = 0, this._rtcCenter = void 0, this._rtcCenterEye = void 0, this._rtcCenter3D = void 0, this._rtcCenter2D = void 0;
  }

  function L(e, t) {
    return k(t) && (e = t(e)), e;
  }

  function I(e) {
    var t = e.gltf,
        i = Z.getAttributeOrUniformBySemantic(t, "POSITION"),
        r = Z.getAttributeOrUniformBySemantic(t, "_BATCHID"),
        n = {};
    n[i] = 0, n[r] = 1;

    var o,
        s,
        a,
        d,
        u,
        f,
        h,
        c = Z.getAttributeOrUniformBySemantic(t, "MODELVIEWPROJECTION"),
        _ = k(c) ? (o = "uniform mat4 " + c + ";\n", c + " * vec4(" + i + ", 1.0)") : (s = Z.getAttributeOrUniformBySemantic(t, "PROJECTION"), a = Z.getAttributeOrUniformBySemantic(t, "MODELVIEW"), k(a) || (a = Z.getAttributeOrUniformBySemantic(t, "PGEARTH_RTC_MODELVIEW")), o = "uniform mat4 " + a + ";\nuniform mat4 " + s + ";\n", s + " * " + a + " * vec4(" + i + ", 1.0)"),
        m = "attribute vec3 " + i + ";\nattribute float " + r + ";\n" + o + "void main() {\n" + ("    vec4 positionInClipCoords = " + _ + ";\n") + "    gl_Position = czm_depthClampFarPlane(positionInClipCoords);\n}\n";

    e.extensionsUsed.WEB3D_quantized_attributes && (d = m, f = (u = e).gltf.meshes[0].primitives[0], h = Z.modifyShaderForQuantizedAttributes(u.gltf, f, d), u._quantizedUniforms = h.uniforms, m = h.shader);
    var l = L(m, e._vertexShaderLoaded),
        p = L("#ifdef GL_EXT_frag_depth\n#extension GL_EXT_frag_depth : enable\n#endif\nvoid main() \n{ \n    gl_FragColor = vec4(1.0); \n    czm_writeDepthClampedToFarPlane();\n}\n", e._classificationShaderLoaded),
        l = Z.modifyVertexShaderForLogDepth(l, _),
        p = Z.modifyFragmentShaderForLogDepth(p);
    e._shaderProgram = {
      vertexShaderSource: l,
      fragmentShaderSource: p,
      attributeLocations: n
    };
  }

  e(o.prototype, {
    gltf: {
      get: function get() {
        return this._gltf;
      }
    },
    boundingSphere: {
      get: function get() {
        if (this._state !== O.LOADED) throw new r("The model is not loaded.  Use ClassificationModel.readyPromise or wait for ClassificationModel.ready to be true.");
        var e = this.modelMatrix,
            t = j.getScale(e, n),
            i = this._scaledBoundingSphere;
        return i.center = F.multiplyComponents(this._boundingSphere.center, t, i.center), i.radius = F.maximumComponent(t) * this._initialRadius, k(this._rtcCenter) && F.add(this._rtcCenter, i.center, i.center), i;
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
    dirty: {
      get: function get() {
        return this._dirty;
      }
    },
    extensionsUsed: {
      get: function get() {
        return k(this._extensionsUsed) || (this._extensionsUsed = Z.getUsedExtensions(this.gltf)), this._extensionsUsed;
      }
    },
    extensionsRequired: {
      get: function get() {
        return k(this._extensionsRequired) || (this._extensionsRequired = Z.getRequiredExtensions(this.gltf)), this._extensionsRequired;
      }
    },
    upAxis: {
      get: function get() {
        return this._upAxis;
      }
    },
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
    texturesByteLength: {
      get: function get() {
        return 0;
      }
    },
    classificationType: {
      get: function get() {
        return this._classificationType;
      }
    }
  });
  var P = {
    PROJECTION: function PROJECTION(e, t) {
      return Z.getGltfSemanticUniforms().PROJECTION(e, t);
    },
    MODELVIEW: function MODELVIEW(e, t) {
      return Z.getGltfSemanticUniforms().MODELVIEW(e, t);
    },
    PGEARTH_RTC_MODELVIEW: function PGEARTH_RTC_MODELVIEW(e, t) {
      return Z.getGltfSemanticUniforms().PGEARTH_RTC_MODELVIEW(e, t);
    },
    MODELVIEWPROJECTION: function MODELVIEWPROJECTION(e, t) {
      return Z.getGltfSemanticUniforms().MODELVIEWPROJECTION(e, t);
    }
  };

  function B(e) {
    var t,
        i,
        r,
        n,
        o,
        s = e._batchTable,
        a = e._uniformMap,
        d = e._vertexArray,
        u = e.gltf,
        f = u.accessors,
        h = u.meshes[0].primitives[0],
        c = f[h.indices],
        _ = h.attributes.POSITION,
        m = Z.getAccessorMinMax(u, _),
        l = q.fromCornerPoints(F.fromArray(m.min), F.fromArray(m.max));
    i = k(c) ? (t = c.count, c.byteOffset / J.getSizeInBytes(c.componentType)) : (t = f[h.attributes.POSITION].count, 0), e._trianglesLength += function (e, t) {
      switch (e.mode) {
        case X.TRIANGLES:
          return t / 3;

        case X.TRIANGLE_STRIP:
        case X.TRIANGLE_FAN:
          return Math.max(t - 2, 0);

        default:
          return 0;
      }
    }(h, t), k(e._uniformMapLoaded) && (a = e._uniformMapLoaded(a)), e.extensionsUsed.WEB3D_quantized_attributes && (n = e, o = h, r = Z.createUniformsForQuantizedAttributes(n.gltf, o, n._quantizedUniforms), a = H(a, r));
    var p,
        g,
        y,
        b = d.attributes.POSITION,
        v = b.componentDatatype,
        T = b.vertexBuffer,
        C = T.byteOffset,
        x = T.byteLength / Y.getSizeInBytes(v),
        E = Y.createArrayBufferView(v, T.buffer, C, x),
        v = (b = d.attributes._BATCHID).componentDatatype,
        C = (T = b.vertexBuffer).byteOffset,
        x = T.byteLength / Y.getSizeInBytes(v),
        S = Y.createArrayBufferView(v, T.buffer, C, x),
        A = d.indexBuffer.typedArray,
        O = d.indexBuffer.indexDatatype === J.UNSIGNED_SHORT ? new Uint16Array(A.buffer, A.byteOffset, A.byteLength / Uint16Array.BYTES_PER_ELEMENT) : new Uint32Array(A.buffer, A.byteOffset, A.byteLength / Uint32Array.BYTES_PER_ELEMENT),
        E = W(E),
        L = [],
        I = [],
        P = [],
        B = [],
        M = (S = W(S))[(O = W(O, i, i + t))[0]];
    L.push(M), P.push(0);

    for (var D = O.length, w = 1; w < D; ++w) {
      (p = S[O[w]]) !== M && (y = w - (g = P[P.length - 1]), L.push(p), I.push(y), P.push(w), B.push(new Q({
        offset: g,
        count: y,
        batchIds: [M],
        color: z.WHITE
      })), M = p);
    }

    y = D - (g = P[P.length - 1]), I.push(y), B.push(new Q({
      offset: g,
      count: y,
      batchIds: [M],
      color: z.WHITE
    }));
    var R = e._shaderProgram,
        U = R.vertexShaderSource,
        V = R.fragmentShaderSource,
        N = R.attributeLocations,
        G = k(e._pickIdLoaded) ? e._pickIdLoaded() : void 0;
    e._primitive = new K({
      classificationType: e._classificationType,
      positions: E,
      indices: O,
      indexOffsets: P,
      indexCounts: I,
      batchIds: L,
      vertexBatchIds: S,
      batchedIndices: B,
      batchTable: s,
      boundingVolume: new q(),
      _vertexShaderSource: U,
      _fragmentShaderSource: V,
      _attributeLocations: N,
      _uniformMap: a,
      _pickId: G,
      _modelMatrix: new j(),
      _boundingSphere: l
    }), e._buffers = void 0, e._vertexArray = void 0, e._shaderProgram = void 0, e._uniformMap = void 0;
  }

  function M(e, t) {
    var i,
        n,
        o,
        s,
        r,
        a,
        d,
        u,
        f,
        h,
        c,
        _,
        m,
        l,
        p = t.context;

    Z.checkSupportedGlExtensions(e.gltf.glExtensionsUsed, p), function (e) {
      var t = e._loadResources;

      if (0 === t.pendingBufferLoads) {
        for (var i, r, n, o, s, a, d, u, f, h, c, _ = t.vertexBuffersToCreate, m = t.indexBuffersToCreate; 0 < _.length;) {
          i = _.dequeue(), n = void 0, n = (r = e)._loadResources, o = r.gltf.bufferViews[i], s = n.getBuffer(o), r._buffers[i] = s, r._geometryByteLength += s.byteLength;
        }

        for (; 0 < m.length;) {
          var l = m.dequeue();
          a = l.id, d = l.componentType, f = void 0, f = (u = e)._loadResources, h = u.gltf.bufferViews[a], c = {
            typedArray: f.getBuffer(h),
            indexDatatype: d
          }, u._buffers[a] = c, u._geometryByteLength += c.typedArray.byteLength;
        }
      }
    }(e), I(e), (i = e)._loadResources.finishedBuffersCreation() && !k(i._vertexArray) && (n = i._buffers, o = i.gltf, s = o.accessors, r = o.meshes[0].primitives[0], a = {
      POSITION: 0,
      _BATCHID: 1
    }, d = {}, C.meshPrimitiveAttribute(r, function (e, t) {
      var i,
          r = a[t];
      k(r) && (i = s[e], d[t] = {
        index: r,
        vertexBuffer: n[i.bufferView],
        componentsPerAttribute: x(i.type),
        componentDatatype: i.componentType,
        offsetInBytes: i.byteOffset,
        strideInBytes: g(o, i)
      });
    }), k(r.indices) && (u = s[r.indices], f = n[u.bufferView]), i._vertexArray = {
      attributes: d,
      indexBuffer: f
    }), c = p, k((h = e)._uniformMap) || (_ = {}, C.technique(h.gltf, function (e) {
      C.techniqueUniform(e, function (e, t) {
        k(e.semantic) && k(P[e.semantic]) && (_[t] = P[e.semantic](c.uniformState, h));
      });
    }), h._uniformMap = _), (m = e)._loadResources.finished() && (k(m._primitive) || (l = m.gltf.nodes[0], m._nodeMatrix = Z.getTransform(l, m._nodeMatrix), B(m)));
  }

  var D = new y(),
      w = new j();
  return o.prototype.updateCommands = function (e, t) {
    this._primitive.updateCommands(e, t);
  }, o.prototype.update = function (e) {
    var t, i, r, n, o, s, a, d, u, f, h, c, _, m, l, p, g;

    e.mode !== A.MORPHING && (b.supportsWebP.initialized ? (t = b.supportsWebP(), this._state === O.NEEDS_LOAD && k(this.gltf) && (this._state = O.LOADING, this._state !== O.FAILED && (i = this.gltf.extensions, k(i) && k(i.PGEARTH_RTC) && (r = F.fromArray(i.PGEARTH_RTC.center), F.equals(r, F.ZERO) || (this._rtcCenter3D = r, o = (n = e.mapProjection).ellipsoid.cartesianToCartographic(this._rtcCenter3D), s = n.project(o), F.fromElements(s.z, s.x, s.y, s), this._rtcCenter2D = s, this._rtcCenterEye = new F(), this._rtcCenter = this._rtcCenter3D)), this._loadResources = new S(), Z.parseBuffers(this))), a = this._loadResources, d = !1, this._state === O.LOADING && (0 === a.pendingBufferLoads && (Z.checkSupportedExtensions(this.extensionsRequired, t), f = (u = this).gltf, h = u._loadResources, C.buffer(f, function (e, t) {
      h.buffers[t] = e.extras._pipeline.source;
    }), function (e) {
      var i = e.gltf.bufferViews,
          r = e._loadResources.vertexBuffersToCreate;
      C.bufferView(e.gltf, function (e, t) {
        e.target === T.ARRAY_BUFFER && r.enqueue(t);
      });
      var n = e._loadResources.indexBuffersToCreate,
          o = {};
      C.accessor(e.gltf, function (e) {
        var t = e.bufferView;
        i[t].target !== T.ELEMENT_ARRAY_BUFFER || k(o[t]) || (o[t] = !0, n.enqueue({
          id: t,
          componentType: e.componentType
        }));
      });
    }(this), this._boundingSphere = Z.computeBoundingSphere(this), this._initialRadius = this._boundingSphere.radius, M(this, e)), a.finished() && (this._state = O.LOADED, d = !0)), k(a) && this._state === O.LOADED && (d || M(this, e), a.finished() && (this._loadResources = void 0)), ((c = this.show) && this._state === O.LOADED || d) && (this._dirty = !1, _ = this.modelMatrix, m = e.mode !== this._mode, this._mode = e.mode, ((l = !j.equals(this._modelMatrix, _) || m) || d) && (j.clone(_, this._modelMatrix), p = this._computedModelMatrix, j.clone(_, p), this._upAxis === E.Y ? j.multiplyTransformation(p, E.Y_UP_TO_Z_UP, p) : this._upAxis === E.X && j.multiplyTransformation(p, E.X_UP_TO_Z_UP, p)), (l || d) && (function (e, t, i, r) {
      var n,
          o,
          s,
          a = e._computedModelMatrix;
      e._mode === A.SCENE3D || e._ignoreCommands || (n = j.getColumn(a, 3, D), y.equals(n, y.UNIT_W) ? (o = e.boundingSphere.center, s = v.wgs84To2DModelMatrix(r, o, w), a = j.multiply(s, a, w), k(e._rtcCenter) && (j.setTranslation(a, y.UNIT_W, a), e._rtcCenter = e._rtcCenter2D)) : (a = v.basisTo2D(r, a, w), e._rtcCenter = e._rtcCenter3D));
      var d = e._primitive;
      (t || i) && (j.multiplyTransformation(a, e._nodeMatrix, d._modelMatrix), q.transform(d._boundingSphere, d._modelMatrix, d._boundingVolume), k(e._rtcCenter) && F.add(e._rtcCenter, d._boundingVolume.center, d._boundingVolume.center));
    }(this, l, d, e.mapProjection), this._dirty = !0)), d ? (g = this, e.afterRender.push(function () {
      g._ready = !0, g._readyPromise.resolve(g);
    })) : c && !this._ignoreCommands && (this._primitive.debugShowBoundingVolume = this.debugShowBoundingVolume, this._primitive.debugWireframe = this.debugWireframe, this._primitive.update(e))) : b.supportsWebP.initialize());
  }, o.prototype.isDestroyed = function () {
    return !1;
  }, o.prototype.destroy = function () {
    return this._primitive = this._primitive && this._primitive.destroy(), t(this);
  }, o;
});