"use strict";

define(["../../Core/BoundingSphere", "../../Core/Cartesian2", "../../Core/Cartesian3", "../../Core/Cartesian4", "../../Core/Color", "../../Core/defaultValue", "../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/getMagic", "../../Core/getTimestamp", "../../Core/Intersect", "../../Core/JulianDate", "../../Core/Matrix3", "../../Core/Matrix4", "../../Core/Rectangle", "../../Core/Request", "../../Core/RequestState", "../../Core/RequestType", "../../Core/Resource", "../../Core/PixelFormat", "../../Core/Plane", "../../Core/PrimitiveType", "../../Core/IndexDatatype", "../../Core/ComponentDatatype", "../../Renderer/Buffer", "../../Renderer/BufferUsage", "../../Renderer/DrawCommand", "../../Renderer/Pass", "../../Renderer/RenderState", "../../Renderer/VertexArray", "../../Renderer/ShaderProgram", "../../Renderer/Texture", "../../Scene/BlendingState", "../../Scene/ClippingPlaneCollection", "../../Scene/CullFace", "../../Scene/Material", "../../Scene/ShadowMode", "../../Scene/StencilConstants", "../../Shaders/PageLODNodeFS", "../../Shaders/PageLODNodeVS", "../../ThirdParty/when", "./PGUtility", "./PGELoadStatus", "./PGERangeMode", "./PGNodeMaterial", "./PGMath", "../../Core/TaskProcessor"], function (aZ, aK, aQ, aV, aM, aP, a4, aL, aS, aJ, a1, a0, aW, a5, aO, aR, aY, aX, aI, aF, aj, ay, aG, aA, aH, am, a2, ai, aC, aw, az, ak, au, ap, aq, an, aT, ao, ax, aU, aE, aB, ag, ah, af, av, aN, ac) {
  function ad(b, d, a, c) {
    this.type = "PageLODNode";
    this.children = [];
    this.childRanges = [];
    this.pageLOD = null;
    this.parent = null;
    this.root = null;
    this.strDataPath = "";
    this.bNormalRendered = !1;
    this.bInFrustumTestOk = !1;
    this.bdSphere = new aZ();
    this.btLoadStatus = ah.PG_UNLOAD;
    this.enRangeMode = 0;
    this.lastAccessFrame = 0;
    this.lastAccessTime = 0;
    this.bHasGeometry = !1;
    this.arryMaterials = [];
    this.arryMaterialUsed = [];
    this.dataBuffer = null;
    this.distToEyeSquare = 0;
    this.dMemUsed = 0;
    this.frameState = void 0;
    this._nodeCommands = [];
    this._distanceToCamera = 0;
    this._bRGB = !0;
  }

  function al(b, a) {
    return function () {
      for (var c = a4(b.parent) ? b.parent : b, d = c.bdSphere; d.radius <= 0 && a4(c.parent);) {
        d = c.parent.bdSphere, c = c.parent;
      }

      return aQ.distanceSquared(aO.multiplyByPoint(b.pageLOD.getLocalViewMatrix(), d.center, new aQ()), a.camera.positionWC);
    };
  }

  function ab() {
    if (!a4(ae) && !aa) {
      var a = window.indexedDB.open("ModelCacheDB");
      a.onerror = function (b) {
        console.log(b.currentTarget.error.message);
      }, a.onsuccess = function (b) {
        ae = b.target.result;
      }, a.onupgradeneeded = function (c) {
        var b = c.target.result;
        b.objectStoreNames.contains("PageLODStore") || b.createObjectStore("PageLODStore", {
          keyPath: "url"
        });
      }, aa = !0;
    }

    return ae;
  }

  function ar(f, j, c) {
    var h = new aF({
      url: f.pageLOD.url
    });
    var g = h.queryParameters ? h.queryParameters.serviceName : "";
    var d = f.strDataPath,
        a = new aY({
      throttle: false,
      throttleByServer: false,
      type: aI.OTHER,
      priorityFunction: al(f, j)
    });
    d && (d = d.replace(".lob", "." + f.pageLOD.pageType));
    var b = new aF({
      url: d,
      templateValues: {
        s: f.pageLOD._subdomains[Math.trunc(Math.random() * f.pageLOD._subdomains.length)]
      },
      request: a,
      queryParameters: {
        serviceName: g,
        uuid: f.pageLOD._uuid
      }
    }),
        k = b.fetchArrayBuffer();
    a4(k) ? aB(k, function (e) {
      if (f.dataBuffer = e, f.setLoadStatus(ah.PG_NET_LOADED), c) {
        var i = ab().transaction(["PageLODStore"], "readwrite").objectStore("PageLODStore").add({
          url: d,
          data: e
        });

        i.onerror = function (l) {
          console.log(l.currentTarget.error.message);
        };
      }
    }, function () {
      if (a.state === aX.CANCELLED) {
        return f.dataBuffer = void 0, void f.setLoadStatus(ah.PG_UNLOAD);
      }

      if (f.setLoadStatus(ah.PG_FAILED), c) {
        var e = ab().transaction(["PageLODStore"], "readwrite").objectStore("PageLODStore").add({
          url: d,
          data: null
        });

        e.onerror = function (i) {
          console.log(i.currentTarget.error.message);
        };
      }
    }) : f.setLoadStatus(ah.PG_UNLOAD);
  }

  function at(b, a) {
    return 0 === a._distanceToCamera && 0 === b._distanceToCamera ? 0 : b._distanceToCamera - a._distanceToCamera;
  }

  var aD = {
    MODELVIEW: function MODELVIEW(a) {
      return function () {
        return a.modelView;
      };
    }
  };
  aL(ad.prototype, {
    boundingSphere: {
      get: function get() {
        return this.bdSphere;
      }
    },
    nodeCommands: {
      get: function get() {
        return this._nodeCommands;
      }
    }
  });
  var a3 = new ac("parserLob");
  ad.prototype.setInFrustumTestOk = function (a) {
    this.bInFrustumTestOk = a;
  }, ad.prototype.isInFrustumTestOk = function () {
    return this.bInFrustumTestOk;
  }, ad.prototype.setLoadStatus = function (a) {
    this.btLoadStatus = a;
  }, ad.prototype.hasGeometry = function () {
    return this.bHasGeometry;
  }, ad.prototype.setHasGeometry = function (a) {
    this.bHasGeometry = a;
  }, ad.prototype.getLoadStatus = function () {
    return this.btLoadStatus;
  }, ad.prototype.setLastAccessTime = function (a) {
    this.lastAccessTime = a;
  }, ad.prototype.getLastAccessTime = function () {
    return this.lastAccessTime;
  }, ad.prototype.setLastAccessFrame = function (a) {
    this.lastAccessFrame = a;
  }, ad.prototype.getLastAccessFrame = function () {
    return this.lastAccessFrame;
  }, ad.prototype.addNode = function (a) {
    this.children.push(a), a.pageLOD = this.pageLOD, a.root = this.root, a.parent = this, a._bRGB = this._bRGB, a.frameState = this.frameState;
  }, ad.prototype.loadTexture = function (g, c, j) {
    if (g.status = ah.PG_LOADING, a4(g.imgBlob)) {
      var b = {};
      b.arrayBufferView = aH.createArrayBufferView(aH.BYTE, g.imgBlob, 0, g.imgBlob.length), g.texture = new au({
        context: this.frameState.context,
        width: g.width,
        height: g.height,
        source: b,
        pixelFormat: g.pixelFormat
      }), this.pageLOD._texturesByteLength += g.texture.sizeInBytes, g.imgBlob = null, g.status = ah.PG_LOADED;
    } else {
      var f = new aY({
        throttle: false,
        throttleByServer: false,
        type: aI.OTHER,
        priorityFunction: al(this, this._frameState)
      }),
          h = new aF({
        url: g.imgUrl,
        templateValues: {
          s: this.pageLOD._subdomains[Math.trunc(Math.random() * this.pageLOD._subdomains.length)]
        },
        request: f
      }),
          d = h.fetchImage();

      if (a4(d)) {
        var a = this;
        aB(d, function (e) {
          window.URL.revokeObjectURL(e.src), g.texture = new au({
            context: a.frameState.context,
            width: e.width,
            height: e.height,
            source: e
          }), a.pageLOD._texturesByteLength += g.texture.sizeInBytes, g.bImgBlobUrl && window.URL.revokeObjectURL(g.imgUrl), g.imgUrl = "", g.status = ah.PG_LOADED;
        }, function () {
          return f.state === aX.CANCELLED ? void (g.status = ah.PG_UNLOAD) : (g.bImgBlobUrl && window.URL.revokeObjectURL(g.imgUrl), void (g.status = ah.PG_FAILED));
        });
      } else {
        g.status = ah.PG_UNLOAD;
      }
    }
  };
  var ae = void 0,
      aa = !1;
  return ad.prototype.netLoad = function (d) {
    this.setLoadStatus(ah.PG_NET_LOADING);
    var b = this.strDataPath,
        f = this,
        a = this.pageLOD.useStorage && a4(ab());

    if (a) {
      var c = ab().transaction(["PageLODStore"]).objectStore("PageLODStore").get(b);
      c.onerror = function (g) {
        console.log(g.currentTarget.error.message);
      }, c.onsuccess = function (e) {
        var g = e.target.result;
        a4(g) ? a4(g.data) ? (f.dataBuffer = g.data, f.setLoadStatus(ah.PG_NET_LOADED)) : f.setLoadStatus(ah.PG_FAILED) : ar(f, d, a);
      };
    } else {
      ar(f, d, a);
    }
  }, ad.prototype.load = function (f) {
    if (f.curNodeParseThreadNum > f.maxNodeParseThreadNum) {
      var c = a1(),
          h = c - f._lastNodeParseTime;
      return void (h > 5000 && (f.curNodeParseThreadNum = 0));
    }

    if (f._lastNodeParseTime = a1(), null == this.dataBuffer) {
      return void this.setLoadStatus(ah.PG_LOADED);
    }

    var b = this.strDataPath.substring(this.strDataPath.lastIndexOf("."), this.strDataPath.length).toLowerCase(),
        g = !1;
    (".lobz" == b || this.pageLOD._compress) && (g = !0), ".lobz" != b && "BGR" == this.pageLOD._pixelFormat && (this._bRGB = !1);
    var d = a3.scheduleTask({
      dataBuffer: this.dataBuffer,
      isLobz: g
    });

    if (a4(d)) {
      this.setLoadStatus(ah.PG_LOADING);
      var a = this;
      a.frameState = f, f.curNodeParseThreadNum++;
      return aB(d, function (m) {
        var v = m.data;

        if (null != v && void 0 != v) {
          var k,
              l = a.strDataPath;
          k = l.substr(0, l.lastIndexOf("/") + 1);

          for (var j = v.arryMaterials.length, w = 0; w < j; w++) {
            var r = v.arryMaterials[w],
                q = new av();
            "" != r.imgUrl ? r.bUrl ? q.imgUrl = k + r.imgUrl : q.imgUrl = r.imgUrl : null != r.imgBlob && ("compressed" == r.eftype ? (q.imgBlob = r.imgBlob, q.width = r.width, q.height = r.height, q.pixelFormat = r.pixelFormat, q.imgUrl = "compressed") : (q.imgUrl = window.URL.createObjectURL(r.imgBlob), r.imgBlob = null, q.bImgBlobUrl = !0)), q.color = new aM(r.diffuseR, r.diffuseG, r.diffuseB), "" == q.imgUrl && (q.status = ah.PG_LOADED), a.arryMaterials.push(q);
          }

          if (a.parse(v, a.arryMaterials, k), !a4(a.parent) && a.bdSphere.radius <= 0) {
            for (var j = a.children.length, w = 0; w < j; w++) {
              var p = a.children[w];
              aN.expandSphere(a.bdSphere, p.bdSphere);
            }
          }
        }

        v = null, m.data = null, a.dataBuffer = null, a.setLoadStatus(ah.PG_LOADED), a.frameState.curNodeParseThreadNum--;
      });
    }
  }, ad.prototype.parse = function (M, H, J) {
    if (null != M && void 0 !== M) {
      var D = 0,
          L = M.children.length;

      for (D = 0; D < L; D++) {
        var z = new ad();
        this.addNode(z), z.parse(M.children[D], H, J);
      }

      if (this.enRangeMode = M.enRangeMode, M.childRanges.length > 0) {
        for (L = M.childRanges.length / 2, D = 0; D < L; D++) {
          var U = new aK();
          U.x = M.childRanges[2 * D], U.y = M.childRanges[2 * D + 1], this.childRanges.push(U);
        }
      }

      if ("" == this.strDataPath && "" != M.strDataPath && (this.strDataPath = J + M.strDataPath), M.bdSphere.length > 0) {
        var R = new aQ(M.bdSphere[0], M.bdSphere[1], M.bdSphere[2]);

        if (a4(this.pageLOD._srs) && M.bdSphere[3] > 0) {
          R.x += this.pageLOD._metaOrg[0], R.y += this.pageLOD._metaOrg[1], R.z += this.pageLOD._metaOrg[2];

          var N = this.pageLOD._srs.inverse([R.x, R.y]),
              W = aQ.fromDegrees(N[0], N[1], R.z),
              K = aO.inverse(this.pageLOD.m_matLocal, new aO());

          aO.multiplyByPoint(K, W, R);
        }

        this.bdSphere = new aZ(R, M.bdSphere[3]), aN.expandSphere(this.pageLOD._boundingSphere, this.bdSphere);
      }

      this.dMemUsed = 0;

      for (var Q = M.nodeMeshes.length, O = aO.inverse(this.pageLOD.m_matLocal, new aO()), t = new aZ(), k = new aQ(), e = new aQ(), B = 0; B < Q; B++) {
        for (var n = M.nodeMeshes[B], F = n.verts.length, D = 0; D < F; D += 3) {
          var N = new aQ();

          if (N.x = n.verts[D], N.y = n.verts[D + 1], N.z = n.verts[D + 2], a4(this.pageLOD._srs)) {
            N.x += this.pageLOD._metaOrg[0], N.y += this.pageLOD._metaOrg[1], N.z += this.pageLOD._metaOrg[2];

            var p = this.pageLOD._srs.inverse([N.x, N.y]),
                W = aQ.fromDegrees(p[0], p[1], N.z);

            aO.multiplyByPoint(O, W, N);
          }

          0 == D && (N.clone(k), N.clone(e)), k.x > N.x && (k.x = N.x), k.y > N.y && (k.y = N.y), k.z > N.z && (k.z = N.z), e.x < N.x && (e.x = N.x), e.y < N.y && (e.y = N.y), e.z < N.z && (e.z = N.z), n.verts[D] = N.x, n.verts[D + 1] = N.y, n.verts[D + 2] = N.z;
        }

        var j = new aQ(0.5 * (k.x + e.x), 0.5 * (k.y + e.y), 0.5 * (k.z + e.z)),
            V = 0.5 * aQ.distance(k, e),
            a = new aZ(j, V),
            I = this.createCommand(n, H, a);
        I.mesh = n, this.nodeCommands.push(I), aN.expandSphere(t, a);
      }

      for (var q = this; "" == q.strDataPath && a4(q.parent);) {
        q = q.parent;
      }

      a4(q) && "" != q.strDataPath && aN.expandSphere(q.bdSphere, t), aN.expandSphere(this.pageLOD._boundingSphere, q.bdSphere), M.nodeMeshes = null, this.pageLOD._geometryByteLength += this.dMemUsed, "" == this.strDataPath && (this.btLoadStatus = ah.PG_LOADED);
    }
  }, ad.prototype.createCommand = function (z, g, a) {
    var e,
        A = this.frameState.context,
        j = this.createVertexArray(z, g),
        y = (this.pageLOD.getModelViewMatrix(), this.pageLOD.getLocalViewMatrix());
    e = aZ.transform(a, y, e);
    var w = ak.fromCache({
      context: A,
      vertexShaderSource: aE,
      fragmentShaderSource: aU
    }),
        v = aw.fromCache({
      depthTest: {
        enabled: !0
      },
      cull: {
        enabled: !0,
        face: an.BACK
      },
      blending: ap.PRE_MULTIPLIED_ALPHA_BLEND,
      stencilTest: ax.setPGEarth3DTileBit(),
      stencilMask: ax.PGEARTH_3D_TILE_MASK
    }),
        k = ao.castShadows(this.pageLOD.shadows),
        x = ao.receiveShadows(this.pageLOD.shadows),
        b = g[z.matIndex],
        i = this,
        q = {
      u_texture: function u_texture() {
        return void 0 == b.texture ? i.pageLOD._defautTexture : b.texture;
      },
      u_bgColor: function u_bgColor() {
        return b.color;
      },
      u_polygonTexture: function u_polygonTexture() {
        return void 0 == i.pageLOD._polygonDepth ? i.pageLOD._defautTexture : i.pageLOD._polygonDepth._colorTexture;
      },
      u_polygonBounds: function u_polygonBounds() {
        return i.pageLOD._flattenBounds;
      },
      u_bFlatten: function u_bFlatten() {
        return void 0 != i.pageLOD._polygonDepth;
      },
      u_useClip: function u_useClip() {
        for (var d = i.pageLOD._clipPolygons.length, c = 0; c < d; ++c) {
          var f = i.pageLOD._clipPolygons[c];

          if (!a4(f.show) || f.show) {
            return !0;
          }
        }

        return !1;
      },
      u_clipTexture: function u_clipTexture() {
        return a4(i.pageLOD._clipFramebuffer) ? i.pageLOD._clipFramebuffer.getColorTexture(0) : i.pageLOD._defautTexture;
      },
      u_clipBounds: function u_clipBounds() {
        return a4(i.pageLOD._clipBounds) ? i.pageLOD._clipBounds : aV.ZERO;
      },
      u_usePit: function u_usePit() {
        return i.pageLOD._pitPolygons.length > 0;
      },
      u_pitTexture: function u_pitTexture() {
        return a4(i.pageLOD._pitFramebuffer) ? i.pageLOD._pitFramebuffer.getColorTexture(0) : i.pageLOD._defautTexture;
      },
      u_pitBounds: function u_pitBounds() {
        return a4(i.pageLOD._pitBounds) ? i.pageLOD._pitBounds : aV.ZERO;
      },
      u_useColorTable: function u_useColorTable() {
        return a4(i.pageLOD._colorTexture);
      },
      u_colorTexture: function u_colorTexture() {
        return a4(i.pageLOD._colorTexture) ? i.pageLOD._colorTexture : i.pageLOD._defautTexture;
      },
      u_colorRange: function u_colorRange() {
        return i.pageLOD._colorRange;
      },
      u_displayMode: function u_displayMode() {
        return i.pageLOD._displayMode;
      },
      u_transparency: function u_transparency() {
        return i.pageLOD._transparency;
      },
      u_bRGB: function u_bRGB() {
        return i._bRGB;
      },
      u_useOverlay: function u_useOverlay() {
        return a4(i.pageLOD._overlayImageLayer) && i.pageLOD._overlayImageLayer.show;
      },
      u_overlayBounds: function u_overlayBounds() {
        return a4(i.pageLOD._overlayBounds) ? i.pageLOD._overlayBounds : aV.ZERO;
      },
      u_overlayTexture: function u_overlayTexture() {
        return a4(i.pageLOD._overlayFramebuffer) ? i.pageLOD._overlayFramebuffer.getColorTexture(0) : i.pageLOD._defautTexture;
      },
      u_useClippingPlane: function u_useClippingPlane() {
        return i.pageLOD._clippingPlanes.length > 0;
      },
      u_clippingPlanes: function u_clippingPlanes() {
        return i.pageLOD._packedClippingPlanes;
      }
    };
    return q.u_modelViewMatrix = aD.MODELVIEW(A.uniformState), new ai({
      boundingVolume: e,
      modelMatrix: y,
      primitiveType: aG.TRIANGLES,
      vertexArray: j,
      shaderProgram: w,
      castShadows: k,
      receiveShadows: x,
      uniformMap: q,
      renderState: v,
      pass: aC.PGEARTH_3D_TILE
    });
  }, ad.prototype.createVertexArray = function (j, q) {
    var f,
        h = this.frameState.context,
        a = [];

    if (null != j.verts && j.matIndex >= 0 && j.matIndex < q.length) {
      if (null != j.indices) {
        var b = j.indices;
        a4(b) && (f = am.createIndexBuffer({
          context: h,
          typedArray: new Uint32Array(b),
          usage: a2.STATIC_DRAW,
          indexDatatype: aA.UNSIGNED_INT
        })), this.dMemUsed += 2 * j.indices.length;
      }

      var v = aH.FLOAT,
          g = am.createVertexBuffer({
        context: h,
        typedArray: aH.createTypedArray(v, j.verts),
        usage: a2.STATIC_DRAW
      });
      this.dMemUsed += 4 * j.verts.length, a.push({
        index: 0,
        vertexBuffer: g,
        componentDatatype: v,
        componentsPerAttribute: 3,
        normalize: !1
      });

      for (var p = j.uvs.length, m = 0; m < p; m++) {
        if (null != j.uvs[m] && void 0 != j.uvs[m]) {
          var g = am.createVertexBuffer({
            context: h,
            typedArray: aH.createTypedArray(v, j.uvs[m]),
            usage: a2.STATIC_DRAW
          });
          a.push({
            index: 1,
            vertexBuffer: g,
            componentDatatype: v,
            componentsPerAttribute: 2,
            normalize: !1
          }), this.dMemUsed += 4 * j.uvs[m].length;
        }
      }

      var k = q[j.matIndex];
      this.arryMaterialUsed.push(k), this.setHasGeometry(!0), this.pageLOD.addNodeCount(1);
    }

    return new az({
      context: h,
      attributes: a,
      indexBuffer: f
    });
  }, ad.prototype.distanceToCamera = function (b, a) {
    return Math.max(0, aQ.distance(b.center, a.camera.positionWC) - b.radius);
  }, ad.prototype.checkInFrustum = function (b) {
    if (this.setInFrustumTestOk(!1), this.bdSphere.radius > 0) {
      var c,
          a = this.pageLOD.getLocalViewMatrix();

      if (c = aZ.transform(this.bdSphere, a, c), this._distanceToCamera = this.distanceToCamera(c, b), b.cullingVolume.computeVisibility(c) == a0.OUTSIDE) {
        return !1;
      }
    }

    return this.setInFrustumTestOk(!0), !0;
  }, ad.prototype.isGrandchildrenSafeDel = function () {
    if (this.getLoadStatus() != ah.PG_UNLOAD && this.getLoadStatus() != ah.PG_NET_LOADED && this.getLoadStatus() != ah.PG_LOADED) {
      return !1;
    }

    if (this.hasLoadingMaterial()) {
      return !1;
    }

    for (var b = 0, a = this.children.length; b < a; b++) {
      if (!this.children[b].isGrandchildrenSafeDel()) {
        return !1;
      }
    }

    return !0;
  }, ad.prototype.isAllMaterialLoaded = function () {
    for (var b = 0, a = this.arryMaterialUsed.length; b < a; b++) {
      if (this.arryMaterialUsed[b].status != ah.PG_LOADED) {
        return !1;
      }
    }

    return !0;
  }, ad.prototype.hasLoadingMaterial = function () {
    for (var b = 0, a = this.arryMaterialUsed.length; b < a; b++) {
      if (this.arryMaterialUsed[b].status != ah.PG_UNLOAD && this.arryMaterialUsed[b].status != ah.PG_LOADED) {
        return !0;
      }
    }

    return !1;
  }, ad.prototype.calcNodeCount = function () {
    var b = 0;
    this.hasGeometry() && (b += 1);

    for (var a = 0, c = this.children.length; a < c; a++) {
      b += this.children[a].calcNodeCount();
    }

    return b;
  }, ad.prototype.unloadChildren = function () {
    var d = 0,
        b = this.children.length;

    for (d = 0; d < b; d++) {
      this.children[d].unloadChildren();
    }

    for (this.children.splice(0, b), this.childRanges.splice(0, this.childRanges.length), this.arryMaterialUsed.splice(0, this.arryMaterialUsed.length); this.arryMaterials.length > 0;) {
      var g = this.arryMaterials.pop();

      if (null != g && void 0 != g.texture) {
        var a = g.texture;
        null != a && void 0 != a && (this.pageLOD._texturesByteLength -= a.sizeInBytes, a.destroy()), g.texture = null;
      }
    }

    for (var c = this._nodeCommands.length - 1; c >= 0; c--) {
      var f = this._nodeCommands[c];
      f.vertexArray = f.vertexArray && f.vertexArray.destroy(), f.shaderProgram = f.shaderProgram && f.shaderProgram.destroy();
    }

    this._nodeCommands = [], this.pageLOD._geometryByteLength -= this.dMemUsed, this.dMemUsed = 0, this.bHasGeometry = !1, this.dataBuffer = null, this.setLoadStatus(ah.PG_UNLOAD);
  }, ad.prototype.checkAllGroupChildLoaded = function (h) {
    for (var d = 0, k = this.children.length; d < k; d++) {
      var c = this.children[d];

      if (null != c && c.checkInFrustum(h) && c.children.length > 1) {
        c.setInFrustumTestOk(!0);
        var g = c.children[0];

        if (g && "" == g.strDataPath && !g.isAllMaterialLoaded()) {
          for (var j = g.arryMaterialUsed.length, b = 0; b < j; b++) {
            var f = g.arryMaterialUsed[b];
            f.status == ah.PG_UNLOAD && g.loadTexture(f, this.pageLOD);
          }

          return !1;
        }
      }
    }

    return !0;
  }, ad.prototype.updateBoundingVolume = function () {
    if (null != this && void 0 !== this) {
      var d = 0,
          h = this.children.length;

      for (d = 0; d < h; d++) {
        this.children[d].updateBoundingVolume();
      }

      var c = this.isAllMaterialLoaded();

      for (h = this.nodeCommands.length, d = 0; d < h; d++) {
        var f = this.nodeCommands[d];

        if (void 0 != f && c) {
          for (var g = a4(this.parent) ? this.parent : this, e = g.bdSphere; e.radius < 0 && a4(g.parent);) {
            e = g.parent.bdSphere, g = g.parent;
          }

          var a,
              b = this.pageLOD.getLocalViewMatrix();
          a = aZ.transform(e, b, a), f._boundingVolume = a;
        }
      }
    }
  }, ad.prototype.update = function (k) {
    this.frameState = k;
    var w = k.camera;

    if (this.bNormalRendered = !1, !this.checkInFrustum(k)) {
      return !1;
    }

    if (this.setLastAccessTime(this.pageLOD.getLastAccessTime()), this.setLastAccessFrame(this.pageLOD.getLastAccessFrame()), "" != this.strDataPath && (this.getLoadStatus() == ah.PG_UNLOAD && this.netLoad(k), this.getLoadStatus() == ah.PG_NET_LOADED && this.load(k), this.getLoadStatus() != ah.PG_LOADED)) {
      return this.pageLOD.curLoadingNode++, !1;
    }

    this._timeSinceLoad = Math.max(1000 * aW.secondsDifference(aW.now(), this.pageLOD._loadTimestamp), 0), this._timeSinceLoad > 10;
    var g = 0;
    this.childRanges.length > 0 && (this.enRangeMode == af.RM_DISTANCE_FROM_EYE_POINT ? this.bdSphere.radius > 0 && (g = aN.computeDistFromEye(this.bdSphere.center, this.pageLOD.getModelViewMatrix())) : this.enRangeMode == af.RM_PIXEL_SIZE_ON_SCREEN && this.bdSphere.radius > 0 && (g = 0.5 * aN.computeSpherePixelSize(this.bdSphere, this.pageLOD.getPixelSizeVector())));
    var j = this.checkAllGroupChildLoaded(k),
        b = this.children.length;

    if (this.children.sort(at), this.childRanges.length > 0) {
      for (var f = 0; f < b; f++) {
        var q = this.children[f];

        if (f < this.childRanges.length) {
          var x = this.childRanges[f];
          q && g >= x.x && g < x.y && q.update(k) && (this.bNormalRendered = !0);
        } else {
          q && q.update(w) && (this.bNormalRendered = !0);
        }
      }

      !this.bNormalRendered && b > 0 && (q = this.children[0], q && q.update(k) && (this.bNormalRendered = !0));
    } else {
      for (f = 0; f < b; f++) {
        var q = this.children[f];
        q && j && q.update(k) && (this.bNormalRendered = !0);
      }
    }

    var h = !1,
        v = this.isAllMaterialLoaded();

    if (!this.bNormalRendered) {
      for (b = this.arryMaterialUsed.length, f = 0; f < b; f++) {
        var p = this.arryMaterialUsed[f];
        p.status == ah.PG_UNLOAD && this.loadTexture(p, this.pageLOD);
      }
    }

    k.context, this.arryMaterialUsed.length;

    for (b = this.nodeCommands.length, f = 0; f < b; f++) {
      var m = this.nodeCommands[f];
      void 0 != m && (m.mesh.boundingVolume = m._boundingVolume, this.pageLOD.NodeMesh.push(m.mesh), v && (this.pageLOD._transparency < 1 ? m.pass = aC.TRANSLUCENT : m.pass = aC.PGEARTH_3D_TILE, this.frameState.commandList.push(m), h = !0));
    }

    return h ? (this.bNormalRendered = !0, !0) : this.bNormalRendered;
  }, ad;
});