"use strict";

define(["../../Core/AxisAlignedBoundingBox", "../../Core/BoundingRectangle", "../../Core/BoundingSphere", "../../Core/buildModuleUrl", "../../Core/Cartesian2", "../../Core/Cartesian3", "../../Core/Cartesian4", "../../Core/Cartographic", "../../Core/Check", "../../Core/Color", "../../Core/ComponentDatatype", "../../Core/defaultValue", "../../Core/defined", "../../Core/defineProperties", "../../Core/DeveloperError", "../../Core/destroyObject", "../../Core/Event", "../../Core/getBaseUri", "../../Core/getExtensionFromUri", "../../Core/Geometry", "../../Core/GeometryAttribute", "../../Core/GeometryAttributes", "../../Core/isArray", "../../Core/isDataUri", "../../Core/Intersect", "../../Core/JulianDate", "../../Core/Math", "../../Core/Matrix4", "../../Core/OrthographicOffCenterFrustum", "../../Core/PerspectiveFrustum", "../../Core/PixelFormat", "../../Core/Plane", "../../Core/PolygonGeometry", "../../Core/PrimitiveType", "../../Core/Rectangle", "../../Core/RequestType", "../../Core/Resource", "../../Core/TaskProcessor", "../../Core/Transforms", "../../Renderer/Buffer", "../../Renderer/BufferUsage", "../../Renderer/ClearCommand", "../../Renderer/DrawCommand", "../../Renderer/Framebuffer", "../../Renderer/Pass", "../../Renderer/PassState", "../../Renderer/PixelDatatype", "../../Renderer/RenderState", "../../Renderer/Sampler", "../../Renderer/ShaderProgram", "../../Renderer/ShaderSource", "../../Renderer/Texture", "../../Renderer/TextureMagnificationFilter", "../../Renderer/TextureMinificationFilter", "../../Renderer/TextureWrap", "../../Renderer/VertexArray", "../../Scene/ClippingPlaneCollection", "../../Scene/CullFace", "../../Scene/ShadowMode", "../../Shaders/PolygonDepthFS", "../../Shaders/PolygonDepthVS", "../../ThirdParty/proj4", "../../ThirdParty/when", "./epsg2proj4", "./PGELoadStatus", "./PGMath", "./PGPageLODNode", "./PGPolygonDepth", "./PGUtility", "../../Core/createGuid"], function (E, L, I, s, M, V, N, u, e, R, U, o, O, t, r, i, a, l, h, z, G, j, m, d, c, p, y, W, q, _, k, H, b, X, f, n, g, v, J, x, Y, Z, K, Q, $, ee, te, re, w, oe, ie, ne, T, C, P, ae, S, se, B, D, F, le, A, ue, he, me, de, ce, pe, ye) {
  "use strict";

  function _e(e) {
    var t,
        r = (e = o(e, o.EMPTY_OBJECT)).url;
    "json" === h(r) ? t = l(r, !0) : d(r) ? t = "" : (t = r, g.createIfNeeded(t).getDerivedResource({
      url: ""
    }).url), this._url = r, this.name = e.name, this._maximumMemoryUsage = o(e.maximumMemoryUsage, 1073741824), this._readyPromise = A.defer(), this.shadows = o(e.shadows, B.ENABLED), this.show = o(e.show, !0), this.nodes = [], this.frustum = new _(), this.viewPort = new N(), this.matLocal = new W(), this.matLocalInvert = new W(), this.matVPW = new W(), this.pixelSizeVector = new N(), this.lastAccessFrame = 0, this.lastAccessTime = 0, this.maxHttpRequestNum = 2, this.curHttpRequestNum = 0, this.maxTexRequestNum = 2, this.curTexRequestNum = 0, this.maxNodeParseThreadNum = 2, this.curNodeParseThreadNum = 0, this.curLoadingNode = 0, this._boundingSphere = new I(), this._boundingBox = new E(), this._position = e.position, this._ready = !1, this._srs = void 0, this._metaOrg = void 0, this._texturesByteLength = 0, this._geometryByteLength = 0, this._defautTexture = void 0, this._flattenPolygons = [], this._flattenBounds = new N(), this._polygonDepth = void 0, this._needUpateFlatten = !1, this._clippingPlanes = new S(), this._packedClippingPlanes = [], this._clipPolygons = [], this._clipBounds = new N(), this._clipDirty = !1, this._clipFramebuffer = void 0, this._pitPolygons = [], this._pitBounds = new N(), this._pitDirty = !1, this._pitFramebuffer = void 0, this._colorTable = void 0, this._colorTexture = void 0, this._colorRange = new M(), this._displayMode = 2, this._overlayImageLayer = void 0, this._overlayBounds = void 0, this._overlayRect = void 0, this._tilesInOverlay = [], this._overlayFramebuffer = void 0, this._overlayVertShaderSource = void 0, this._overlayFragShaderSource = void 0, this._overlayShaderPrograms = [], this._overlayTileCommand = void 0, this._overlayTileUniforms = [], this._lastViewMatrix = void 0, this._lastProjectionMatrix = void 0, this._loadTimestamp = void 0, this._compress = !1, this._type = "pageLOD", this._uuid = ye(), this.pageType = "", this._baseUrl = null, this.NodeMesh = [], this._progressEvent = new a(), this.nodeCount = 0, this._distanceToCamera = 0, this._tileVisibleDistance = o(e.tileVisibleDistance, 2e6), this._transparency = 1, this._pixelFormat = "RGB", this.useStorage = !1, this._subdomains = e.subdomains, m(this._subdomains) ? this._subdomains = this._subdomains.slice() : O(this._subdomains) && 0 < this._subdomains.length ? this._subdomains = this._subdomains.split("") : this._subdomains = ["a", "b", "c"];
    var n = this;
    A(e.url).then(function (e) {
      var t = g.createIfNeeded(e);
      return t.setQueryParameters({
        uuid: n._uuid
      }), t.fetchJson();
    }).then(function (i) {
      A(e.url).then(function (e) {
        var t,
            r = new g({
          url: e,
          templateValues: {
            s: n._subdomains[0]
          },
          queryParameters: {
            uuid: n._uuid
          }
        });
        "json" === (r = r.getDerivedResource({
          url: i.data
        })).extension ? t = r.getBaseUri(!0) : r.isDataUri && (t = ""), n._baseUrl = t || e;
        var o = r.fetchJson();
        O(o) && A(o, function (e) {
          return n.isDestroyed() ? A.reject("tileset is destroyed") : (n.loadNode(n._baseUrl, e), void n._readyPromise.resolve(n));
        }, function (e) {
          n._readyPromise.reject(e);
        });
      });
    });
  }

  function fe(e, t) {
    !O(e._overlayImageLayer) || !e._overlayImageLayer.show || e._boundingSphere.radius <= 0 || (function (e, t) {
      var r = t.camera;

      if (!W.equals(e._lastViewMatrix, r.viewMatrix) || !W.equals(e._lastProjectionMatrix, r.frustum.projectionMatrix)) {
        e._lastViewMatrix = r.viewMatrix.clone(e._lastViewMatrix), e._lastProjectionMatrix = r.frustum.projectionMatrix.clone(e._lastProjectionMatrix);
        var o = new W();
        W.inverse(e.m_matLocal, o);
        var i = e._boundingBox.minimum.z,
            n = t.cullingVolume.planes,
            a = new H(V.UNIT_Z, 0);
        H.fromCartesian4(n[0], a), H.transform(a, o, a);
        var s = [a.normal.x, a.normal.y, a.normal.z * i + a.distance];
        H.fromCartesian4(n[1], a), H.transform(a, o, a);
        var l = [a.normal.x, a.normal.y, a.normal.z * i + a.distance];
        H.fromCartesian4(n[2], a), H.transform(a, o, a);
        var u = [a.normal.x, a.normal.y, a.normal.z * i + a.distance];
        H.fromCartesian4(n[3], a), H.transform(a, o, a);
        var h = [a.normal.x, a.normal.y, a.normal.z * i + a.distance],
            m = [],
            d = u[0] * s[1] - u[1] * s[0];
        m[0] = new M((s[2] * u[1] - s[1] * u[2]) / d, (s[0] * u[2] - s[2] * u[0]) / d), d = u[0] * l[1] - u[1] * l[0], m[1] = new M((l[2] * u[1] - l[1] * u[2]) / d, (l[0] * u[2] - l[2] * u[0]) / d);
        var c = r.frustum._offCenterFrustum,
            p = new V(c.left, c.bottom, c.near);
        W.multiplyByPoint(r.inverseViewMatrix, p, p), W.multiplyByPoint(o, p, p), (m[0].x - p.x) * (m[1].y - p.y) - (m[0].y - p.y) * (m[1].x - p.x) < 0 && (u[2] = -u[0] * p.x - u[1] * p.y, d = u[0] * s[1] - u[1] * s[0], m[0].x = (s[2] * u[1] - s[1] * u[2]) / d, m[0].y = (s[0] * u[2] - s[2] * u[0]) / d, d = u[0] * l[1] - u[1] * l[0], m[1].x = (l[2] * u[1] - l[1] * u[2]) / d, m[1].y = (l[0] * u[2] - l[2] * u[0]) / d);
        var y = !0;
        0 == h[0] && 0 == h[1] || (d = h[0] * l[1] - h[1] * l[0], m[2] = new M((l[2] * h[1] - l[1] * h[2]) / d, (l[0] * h[2] - l[2] * h[0]) / d), 0 <= (m[0].x - m[2].x) * (m[1].y - m[2].y) - (m[0].y - m[2].y) * (m[1].x - m[2].x) && (y = !1)), y && (H.fromCartesian4(n[5], a), H.transform(a, o, a), h = [a.normal.x, a.normal.y, a.normal.z * i + a.distance], d = h[0] * l[1] - h[1] * l[0], m[2].x = (l[2] * h[1] - l[1] * h[2]) / d, m[2].y = (l[0] * h[2] - l[2] * h[0]) / d), d = h[0] * s[1] - h[1] * s[0], m[3] = new M((s[2] * h[1] - s[1] * h[2]) / d, (s[0] * h[2] - s[2] * h[0]) / d);

        for (var _ = [], f = [e._boundingBox.minimum.x, e._boundingBox.minimum.y, e._boundingBox.maximum.x, e._boundingBox.maximum.y], g = [f[0], f[1], f[2], f[1], f[2], f[3], f[0], f[3]], v = 0; v < 4; ++v) {
          for (var x = 0; x < 4; ++x) {
            var w = m[x],
                T = m[x + 1 < 4 ? x + 1 : 0];
            if ((w.x - g[2 * v]) * (T.y - g[2 * v + 1]) - (w.y - g[2 * v + 1]) * (T.x - g[2 * v]) < 0) break;
          }

          4 == x && _.push(new M(g[2 * v], g[2 * v + 1]));
        }

        if (4 == _.length) e._overlayBounds = N.fromElements(f[0], f[3], f[2], f[1], e._overlayBounds);else {
          for (var b = new M(), C = new M(), P = [u, l, h, s], v = 0, S = m.length; v < S; ++v) {
            var B,
                D,
                F,
                A,
                R,
                w = m[v],
                T = m[v + 1 < S ? v + 1 : 0];
            w.x >= f[0] && w.x <= f[2] && w.y >= f[1] && w.y <= f[3] && (_.push(w), T.x >= f[0] && T.x <= f[2] && T.y >= f[1] && T.y <= f[3]) || (0 != (B = P[v])[1] && ((D = new M(f[0], -(B[0] * f[0] + B[2]) / B[1])).y > f[1] && D.y < f[3] && (M.subtract(D, w, b), M.subtract(D, T, C), M.dot(b, C) <= 0 && _.push(D)), (F = new M(f[2], -(B[0] * f[2] + B[2]) / B[1])).y > f[1] && F.y < f[3] && (M.subtract(F, w, b), M.subtract(F, T, C), M.dot(b, C) <= 0 && _.push(F))), 0 != B[0] && ((A = new M(-(B[1] * f[1] + B[2]) / B[0], f[1])).x > f[0] && A.x < f[3] && (M.subtract(A, w, b), M.subtract(A, T, C), M.dot(b, C) <= 0 && _.push(A)), (R = new M(-(B[1] * f[3] + B[2]) / B[0], f[3])).x > f[0] && R.x < f[3] && (M.subtract(R, w, b), M.subtract(R, T, C), M.dot(b, C) <= 0 && _.push(R))));
          }

          var U = L.fromPoints(_);
          e._overlayBounds = N.fromElements(U.x, U.y + U.height, U.x + U.width, U.y, e._overlayBounds);
        }
      }
    }(e, t), e._overlayBounds.z - e._overlayBounds.x <= 1e-6 || e._overlayBounds.y - e._overlayBounds.w <= 1e-6 || (function (e, t, r) {
      if (r._tilesInOverlay.length = 0, O(e._levelZeroTiles)) {
        var o = [],
            i = new V(r._overlayBounds.x, r._overlayBounds.w, 0);
        W.multiplyByPoint(r.m_matLocal, i, i), o.push(u.fromCartesian(i)), V.fromElements(r._overlayBounds.x, r._overlayBounds.y, 0, i), W.multiplyByPoint(r.m_matLocal, i, i), o.push(u.fromCartesian(i)), V.fromElements(r._overlayBounds.z, r._overlayBounds.w, 0, i), W.multiplyByPoint(r.m_matLocal, i, i), o.push(u.fromCartesian(i)), V.fromElements(r._overlayBounds.z, r._overlayBounds.y, 0, i), W.multiplyByPoint(r.m_matLocal, i, i), o.push(u.fromCartesian(i)), r._overlayRect = f.fromCartographicArray(o, r._overlayRect);

        for (var n, a = e._levelZeroTiles, s = 0, l = a.length; s < l; ++s) {
          (n = a[s]).renderable && O(f.intersection(r._overlayRect, n.rectangle, xe)) && ge(e, t, n, r);
        }
      }
    }(t.camera._scene.globe._surface, t, e), 0 != e._tilesInOverlay.length && function (e, t) {
      var r = t.context,
          o = r.uniformState,
          i = new q();
      i.left = e._overlayBounds.x, i.top = e._overlayBounds.y, i.right = e._overlayBounds.z, i.bottom = e._overlayBounds.w, o.updateFrustum(i);
      {
        var n;
        O(e._overlayFramebuffer) || (n = new ne({
          context: r,
          width: 4096,
          height: 4096,
          pixelFormat: k.RGBA,
          pixelDatatype: te.UNSIGNED_BYTE
        }), e._overlayFramebuffer = new Q({
          context: r,
          colorTextures: [n],
          destroyAttachments: !1
        }));
      }
      var a = new ee(r);
      a.framebuffer = e._overlayFramebuffer, a.viewport = new L(0, 0, 4096, 4096);
      var s = re.fromCache({
        depthTest: {
          enabled: !1
        },
        cull: {
          enabled: !0,
          face: se.BACK
        }
      });
      {
        var l;
        O(e._overlayVertShaderSource) || (l = new ie(), l.sources.push("attribute float position;\nuniform vec4 u_rectVertexes[4];\nvarying vec2 texCoord;\n\nvoid main()\n{\n    int index = int(position);\n    vec4 pos = vec4(u_rectVertexes[index].xy, 0.0, 1.0);\n    gl_Position = czm_projection*pos;\n\n    texCoord = u_rectVertexes[index].zw;\n\n}"), e._overlayVertShaderSource = l);
      }
      {
        O(e._overlayFragShaderSource) || (D = new ie(), D.sources.push("uniform sampler2D u_textures[TEXTURE_UNITS];\nuniform vec4 u_texCoordRects[TEXTURE_UNITS];\nuniform vec4 u_texOffsetAndScales[TEXTURE_UNITS];\nuniform float u_texAlpha[TEXTURE_UNITS];\nvarying vec2 texCoord;\n\nvec4 sampleAndBlend(\n    vec4 previousColor,\n    sampler2D textureToSample,\n    vec2 tileTextureCoordinates,\n    vec4 textureCoordinateRectangle,\n    vec4 textureCoordinateTranslationAndScale,\n    float textureAlpha)\n{\n    // This crazy step stuff sets the alpha to 0.0 if this following condition is true:\n    //    tileTextureCoordinates.s < textureCoordinateRectangle.s ||\n    //    tileTextureCoordinates.s > textureCoordinateRectangle.p ||\n    //    tileTextureCoordinates.t < textureCoordinateRectangle.t ||\n    //    tileTextureCoordinates.t > textureCoordinateRectangle.q\n    // In other words, the alpha is zero if the fragment is outside the rectangle\n    // covered by this texture.  Would an actual 'if' yield better performance?\n    vec2 alphaMultiplier = step(textureCoordinateRectangle.st, tileTextureCoordinates);\n    textureAlpha = textureAlpha * alphaMultiplier.x * alphaMultiplier.y;\n\n    alphaMultiplier = step(vec2(0.0), textureCoordinateRectangle.pq - tileTextureCoordinates);\n    textureAlpha = textureAlpha * alphaMultiplier.x * alphaMultiplier.y;\n\n    vec2 translation = textureCoordinateTranslationAndScale.xy;\n    vec2 scale = textureCoordinateTranslationAndScale.zw;\n    vec2 textureCoordinates = tileTextureCoordinates * scale + translation;\n    vec4 value = texture2D(textureToSample, textureCoordinates);\n    vec3 color = value.rgb;\n    float alpha = value.a;\n\n    float sourceAlpha = alpha * textureAlpha;\n    float outAlpha = mix(previousColor.a, 1.0, sourceAlpha);\n    vec3 outColor = mix(previousColor.rgb * previousColor.a, color, sourceAlpha) / outAlpha;\n    return vec4(outColor, outAlpha);\n}\n\nvoid main()\n{\n    vec4 color = vec4(0.0);\n    for (int i = 0; i < TEXTURE_UNITS; ++i) {\n        color = sampleAndBlend(color, u_textures[i], texCoord,           u_texCoordRects[i], u_texOffsetAndScales[i], u_texAlpha[i]);\n    };\n    gl_FragColor = color;\n}"), e._overlayFragShaderSource = D);
      }
      {
        var u, h, m, d, c;
        O(e._overlayTileCommand) || (O(e._overlayTileUniforms.rectVertexes) || (e._overlayTileUniforms.rectVertexes = []), u = {
          u_rectVertexes: function u_rectVertexes() {
            return e._overlayTileUniforms.rectVertexes;
          },
          u_textures: function u_textures() {
            return e._overlayTileUniforms.textures;
          },
          u_texCoordRects: function u_texCoordRects() {
            return e._overlayTileUniforms.texCoordRects;
          },
          u_texOffsetAndScales: function u_texOffsetAndScales() {
            return e._overlayTileUniforms.texOffsetAndScales;
          },
          u_texAlpha: function u_texAlpha() {
            return e._overlayTileUniforms.texAlpha;
          }
        }, h = new G({
          componentDatatype: U.FLOAT,
          componentsPerAttribute: 1,
          values: new Float32Array([0, 1, 2, 0, 2, 3])
        }), m = new j({
          position: h
        }), d = new z({
          attributes: m
        }), c = ae.fromGeometry({
          context: r,
          geometry: d,
          bufferUsage: Y.STATIC_DRAW,
          interleave: !0
        }), e._overlayTileCommand = new K({
          primitiveType: X.TRIANGLES,
          vertexArray: c,
          uniformMap: u,
          renderState: s,
          pass: $.PGEARTH_3D_TILE
        }));
      }
      new Z({
        color: new R(1, 1, 1, 0)
      }).execute(r, a);
      var p = new W();
      W.inverse(e.m_matLocal, p);

      for (var y = 0, _ = e._tilesInOverlay.length; y < _; ++y) {
        var f = e._tilesInOverlay[y],
            g = f.rectangle,
            v = V.fromRadians(g.west, g.south, 0);
        W.multiplyByPoint(p, v, v);
        var x = V.fromRadians(g.east, g.south, 0);
        W.multiplyByPoint(p, x, x);
        var w = V.fromRadians(g.east, g.north, 0);
        W.multiplyByPoint(p, w, w);
        var T = V.fromRadians(g.west, g.north, 0);
        W.multiplyByPoint(p, T, T), e._overlayTileUniforms.textures = [], e._overlayTileUniforms.texCoordRects = [], e._overlayTileUniforms.texOffsetAndScales = [], e._overlayTileUniforms.texAlpha = [];

        for (var b = f.data.imagery, C = 0, P = b.length; C < P; ++C) {
          var S = b[C],
              B = S.readyImagery;
          O(B) && 0 !== B.imageryLayer.alpha && B.imageryLayer == e._overlayImageLayer && (e._overlayTileUniforms.textures.push(S.useWebMercatorT ? B.textureWebMercator : B.texture), e._overlayTileUniforms.texCoordRects.push(S.textureCoordinateRectangle), e._overlayTileUniforms.texOffsetAndScales.push(S.textureTranslationAndScale), e._overlayTileUniforms.texAlpha.push(B.imageryLayer.alpha));
        }

        var D,
            F,
            A = e._overlayTileUniforms.textures.length;
        0 != A && (e._overlayTileUniforms.rectVertexes[0] = N.fromElements(v.x, v.y, 0, 0, e._overlayTileUniforms.rectVertexes[0]), e._overlayTileUniforms.rectVertexes[1] = N.fromElements(x.x, x.y, 1, 0, e._overlayTileUniforms.rectVertexes[1]), e._overlayTileUniforms.rectVertexes[2] = N.fromElements(w.x, w.y, 1, 1, e._overlayTileUniforms.rectVertexes[2]), e._overlayTileUniforms.rectVertexes[3] = N.fromElements(T.x, T.y, 0, 1, e._overlayTileUniforms.rectVertexes[3]), O(e._overlayShaderPrograms[A]) || ((D = e._overlayFragShaderSource.clone()).defines.push("TEXTURE_UNITS " + A), F = oe.fromCache({
          context: r,
          vertexShaderSource: e._overlayVertShaderSource,
          fragmentShaderSource: D
        }), e._overlayShaderPrograms[A] = F), e._overlayTileCommand.shaderProgram = e._overlayShaderPrograms[A], o.updatePass(e._overlayTileCommand.pass), e._overlayTileCommand.execute(r, a));
      }
    }(e, t)));
  }

  function ge(e, t, r, o) {
    if (i = t, n = r, a = e._tileProvider.getLevelMaximumGeometricError(n.level), s = n._distance, l = i.context.drawingBufferHeight, u = i.camera.frustum.sseDenominator, a * l / (s * u) < e.maximumScreenSpaceError) return o._tilesInOverlay.push(r), 0;

    var i,
        n,
        a,
        s,
        l,
        u,
        h,
        m,
        d,
        c,
        p,
        y,
        _,
        f,
        g,
        v = r.southwestChild,
        x = r.southeastChild,
        w = r.northwestChild,
        T = r.northeastChild,
        b = v.renderable && x.renderable && w.renderable && T.renderable,
        C = v.upsampledFromParent && x.upsampledFromParent && w.upsampledFromParent && T.upsampledFromParent;

    !b || C ? o._tilesInOverlay.push(r) : (h = e, m = v, d = x, c = w, p = T, _ = o, f = (y = t).camera.positionCartographic, g = h._tileProvider, f.longitude < m.rectangle.east ? f.latitude < m.rectangle.north ? (ve(h, m, 0, y, _), ve(h, d, 0, y, _), ve(h, c, 0, y, _), ve(h, p, 0, y, _)) : (ve(h, c, 0, y, _), ve(h, m, 0, y, _), ve(h, p, 0, y, _), ve(h, d, 0, y, _)) : f.latitude < m.rectangle.north ? (ve(h, d, 0, y, _), ve(h, m, 0, y, _), ve(h, p, 0, y, _), ve(h, c, 0, y, _)) : (ve(h, p, 0, y, _), ve(h, c, 0, y, _), ve(h, d, 0, y, _), ve(h, m, 0, y, _)));
  }

  function ve(e, t, r, o, i) {
    O(f.intersection(i._overlayRect, t.rectangle, xe)) && ge(e, o, t, i);
  }

  t(_e.prototype, {
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
    url: {
      get: function get() {
        return this._url;
      }
    },
    basePath: {
      get: function get() {
        return this._basePath;
      }
    },
    progressEvent: {
      get: function get() {
        return this._progressEvent;
      }
    },
    origin: {
      get: function get() {
        return this._position;
      },
      set: function set(e) {
        var t;
        this._position = e, O(this._srs) && (t = this._srs.forward([this.origin.x, this.origin.y]), this._metaOrg[0] = t[0], this._metaOrg[1] = t[1], this._metaOrg[2] = this.origin.z);
        var r = V.fromDegrees(this._position.x, this._position.y, this._position.z);
        this.m_matLocal = J.eastNorthUpToFixedFrame(r, void 0, this.m_matLocal);
        var o = new V();
        W.multiplyByPoint(this.m_matLocal, this._boundingBox.center, o), this.tileBoundingSphere.center = o;

        for (var i = this.nodes.length, n = 0; n < i; ++n) {
          this.nodes[n].updateBoundingVolume();
        }
      }
    },
    flattenPolygons: {
      get: function get() {
        return this._flattenPolygons;
      }
    },
    pitPolygons: {
      get: function get() {
        return this._pitPolygons;
      }
    },
    maximumMemoryUsage: {
      get: function get() {
        return this._maximumMemoryUsage;
      },
      set: function set(e) {
        this._maximumMemoryUsage = e;
      }
    },
    transparency: {
      get: function get() {
        return this._transparency;
      },
      set: function set(e) {
        this._transparency = e;
      }
    },
    boundingSphere: {
      get: function get() {
        return this._boundingSphere;
      }
    },
    boundingBox: {
      get: function get() {
        return this._boundingBox;
      }
    },
    totalMemoryUsageInBytes: {
      get: function get() {
        return this._texturesByteLength + this._geometryByteLength;
      }
    }
  }), _e.prototype.getModelViewMatrix = function () {
    return this.matVPW;
  }, _e.prototype.getLocalViewMatrix = function () {
    return this.m_matLocal;
  }, _e.prototype.setLastAccessTime = function (e) {
    this.lastAccessTime = e;
  }, _e.prototype.getLastAccessTime = function () {
    return this.lastAccessTime;
  }, _e.prototype.setLastAccessFrame = function (e) {
    this.lastAccessFrame = e;
  }, _e.prototype.getLastAccessFrame = function () {
    return this.lastAccessFrame;
  }, _e.prototype.getPixelSizeVector = function () {
    return this.pixelSizeVector;
  }, _e.prototype.setPixelSizeVector = function (e) {
    this.pixelSizeVector = e;
  }, _e.prototype.addNode = function (e) {
    this.nodes.push(e), e.pageLOD = this, e.root = e;
  }, _e.prototype.addNodeCount = function (e) {
    this.nodeCount += e;
  }, _e.prototype.addReleaseCount = function (e) {
    this.nodeCount -= e;
  }, _e.prototype.loadNode = function (e, t) {
    var r = this,
        o = t.DataDefine;

    if (void 0 !== o) {
      O(r._position) || (r._position = new V(), r._position.x = parseFloat(o.Position.x), r._position.y = parseFloat(o.Position.y), r._position.z = parseFloat(o.Position.z)), r._compress = Boolean(o.compress);
      var i,
          n,
          a,
          s,
          l,
          u,
          h,
          m,
          d = V.fromDegrees(this._position.x, this._position.y, this._position.z);
      r.m_matLocal = J.eastNorthUpToFixedFrame(d, void 0, r.m_matLocal), O(o.Range) && (i = parseFloat(o.Range.West), n = parseFloat(o.Range.East), a = parseFloat(o.Range.South), s = parseFloat(o.Range.North), l = parseFloat(o.Range.MinZ), u = parseFloat(o.Range.MaxZ), U = new V(i + (n - i) / 2, a + (s - a) / 2, l + (u - l) / 2), W.multiplyByPoint(r.m_matLocal, U, U), h = new V(i, a, l), m = new V(n, s, u), L = V.distance(m, h), r.tileBoundingSphere = new I(U, L), C = new V(i, a, l), P = new V(n, s, u), r._boundingBox = new E(C, P));

      for (var c = o.NodeList.Node.length, p = 0; p < c; p++) {
        var y = o.NodeList.Node[p];
        "" != y && (0 === p && (r.pageType = y.substring(y.lastIndexOf(".") + 1)), (A = new de()).strDataPath = pe.getAbsolutePath(pe.getDir(e), y), r.addNode(A));
      }

      r._ready = !0;
    } else if (null != t.root) {
      var _,
          f,
          g,
          v,
          x,
          w = t.root;

      if (void 0 !== w) {
        O(r._position) ? O(r._srs) && (_ = r._srs.forward([this._position.x, this._position.y]), this.pageLOD._metaOrg[0] = _[0], this.pageLOD._metaOrg[1] = _[1], this.pageLOD._metaOrg[2] = this.pageLOD.origin.z) : (r._position = new V(), O(w.MetaData) ? (O(w.MetaData.EPSG) && (f = "EPSG:" + w.MetaData.EPSG, g = ue[f], r._srs = le(g)), v = w.MetaData.Origin, r._metaOrg = v, x = r._srs.inverse([v[0], v[1]]), r._position.x = parseFloat(x[0]), r._position.y = parseFloat(x[1]), r._position.z = parseFloat(v[2])) : (r._position.x = parseFloat(w.position.x), r._position.y = parseFloat(w.position.y), r._position.z = parseFloat(w.position.z))), O(w.pixelFormat) && (r._pixelFormat = w.pixelFormat), r._compress = Boolean(w.compress);
        var T,
            b,
            C,
            P,
            S,
            B,
            D,
            F,
            d = V.fromDegrees(this._position.x, this._position.y, this._position.z);
        r.m_matLocal = J.eastNorthUpToFixedFrame(d, void 0, r.m_matLocal), O(w.boundingVolume) && (T = W.inverse(r.m_matLocal, new W()), O(w.boundingVolume.sphere) && (R = w.boundingVolume.sphere, U = new V(R[0], R[1], R[2]), L = R[3], F = U.clone(), O(r._srs) && (F.x += r._metaOrg[0], F.y += r._metaOrg[1], F.z += r._metaOrg[2], B = r._srs.inverse([F.x, F.y]), D = V.fromDegrees(B[0], B[1], F.z), W.multiplyByPoint(T, D, F)), r._boundingSphere = new I(F, L), W.multiplyByPoint(r.m_matLocal, F, F), r.tileBoundingSphere = new I(F, L)), O(w.boundingVolume.box) && (b = w.boundingVolume.box, U = new V(b[0], b[1], b[2]), C = new V(b[0] - b[3], b[1] - b[7], b[2] - b[11]), P = new V(b[0] + b[3], b[1] + b[7], b[2] + b[11]), r._boundingBox = new E(C, P, U), L = Math.max(b[3], Math.max(b[7], b[11])), S = U.clone(), O(r._srs) && (S.x += r._metaOrg[0], S.y += r._metaOrg[1], S.z += r._metaOrg[2], B = r._srs.inverse([S.x, S.y]), D = V.fromDegrees(B[0], B[1], S.z), W.multiplyByPoint(T, D, S)), r._boundingSphere = new I(S, L), F = new V(), W.multiplyByPoint(r.m_matLocal, S, F), r.tileBoundingSphere = new I(F, L)));

        for (c = w.children.length, p = 0; p < c; p++) {
          var A,
              R,
              U,
              L,
              M = w.children[p];
          null != M && (A = new de(), void 0 !== M.boundingVolume && (R = M.boundingVolume.sphere, U = new V(R[0], R[1], R[2]), L = R[3], A.bdSphere = new I(U, L)), 0 === p && (r.pageType = M.content.url.substring(M.content.url.lastIndexOf(".") + 1)), A.strDataPath = pe.getAbsolutePath(pe.getDir(e), M.content.url), A.bRootTile = !0, r.addNode(A));
        }
      }
    }

    r._ready = !0;
  }, _e.prototype.cleanRedundantNodes = function (e, t) {
    if (this.totalMemoryUsageInBytes < this.maximumMemoryUsage) return !1;
    if (null == e) return !1;
    if (e.getLoadStatus() != he.PG_LOADED) return !1;

    for (var r = 0, o = e.children.length; r < o; r++) {
      this.cleanRedundantNodes(e.children[r], t);
    }

    if (this.totalMemoryUsageInBytes < this.maximumMemoryUsage) return !1;
    if (!t && e == e.root) return !1;
    if ("" == e.strDataPath) return !1;
    var i = this.getLastAccessFrame() - e.getLastAccessFrame();
    return this.getLastAccessTime(), e.getLastAccessTime(), !(i < 1 || !e.isGrandchildrenSafeDel() || (e.unloadChildren(), 0));
  }, _e.prototype.cleanNodes = function (e, t, r) {
    if (r.totalMemoryUsageInBytes < r.maximumMemoryUsage) return !1;
    if (null == e) return !1;
    if (e.getLoadStatus() != he.PG_LOADED) return !1;

    for (var o = 0, i = e.children.length; o < i; o++) {
      this.cleanNodes(e.children[o], t, r);
    }

    if (r.totalMemoryUsageInBytes < r.maximumMemoryUsage) return !1;
    if (!t && e == e.root) return !1;
    if ("" == e.strDataPath) return !1;
    var n = this.getLastAccessFrame() - e.getLastAccessFrame();
    if (this.getLastAccessTime(), e.getLastAccessTime(), n < 1) return !1;

    if (e.isGrandchildrenSafeDel()) {
      var a = this.totalMemoryUsageInBytes;
      return e.unloadChildren(), r.totalMemoryUsageInBytes -= a - this.totalMemoryUsageInBytes, !0;
    }

    return !1;
  }, _e.prototype.updateMatrix = function (e) {
    var t = e.camera,
        r = e.context,
        o = t._viewMatrix;
    W.multiply(o, this.m_matLocal, this.matVPW), this.viewPort.z = r.drawingBufferWidth, this.viewPort.w = r.drawingBufferHeight, this.pixelSizeVector = me.computePixelSizeVector(this.viewPort, t.frustum.projectionMatrix, this.matVPW);
  }, _e.prototype.distanceToCamera = function (e, t) {
    return Math.max(0, V.distance(e.center, t.camera.positionWC) - e.radius);
  }, _e.prototype.update = function (e) {
    if (this._frameState = e, this.show && this.ready) {
      if (this.curLoadingNode = 0, this.updateMatrix(e), 0 < this._boundingSphere.radius) {
        var t = I.transform(this._boundingSphere, this.m_matLocal, t);
        if (this._distanceToCamera = this.distanceToCamera(t, e), this._distanceToCamera > this._tileVisibleDistance) return e.totalMemoryUsageInBytes += this.totalMemoryUsageInBytes, !1;
        if (e.cullingVolume.computeVisibility(t) == c.OUTSIDE) return e.totalMemoryUsageInBytes += this.totalMemoryUsageInBytes, !1;
      }

      var r,
          o,
          i,
          n,
          a = this;
      O(this._defautTexture) || ((r = document.createElement("img")).src = s("Assets/Textures/noImage.jpg"), r.onload = function (e, t) {
        a._defautTexture = new ne({
          context: a._frameState.context,
          width: r.width,
          height: r.height,
          source: r
        });
      }), 0 < this._clippingPlanes.length && (o = e.context.uniformState.view, function (e, t, r) {
        var o = e.length,
            i = 0;

        for (O(r) ? (i = r.length, r.length = o) : r = new Array(o), l = i; l < o; ++l) {
          r[l] = new N();
        }

        for (var n = new W(), a = W.multiply(t, e.modelMatrix, n), s = new H(V.UNIT_X, 0), l = 0; l < o; ++l) {
          var u = e.get(l),
              h = r[l];
          V.clone(u.normal, s.normal), s.distance = u.distance, H.transform(s, a, s), V.clone(s.normal, h), h.w = s.distance;
        }
      }(this._clippingPlanes, o, this._packedClippingPlanes)), this._needUpateFlatten && (this.initFlattenPolygon(e), this._needUpateFlatten = !1), O(this._polygonDepth) && this._polygonDepth.update(e), function (e, t) {
        if (e._clipDirty && 0 != e._clipPolygons.length) {
          var r = t.context,
              o = r.uniformState,
              i = re.fromCache({
            depthTest: {
              enabled: !1
            },
            cull: {
              enabled: !0,
              face: se.BACK
            }
          }),
              n = oe.fromCache({
            context: r,
            vertexShaderSource: "attribute vec3 position;\nvoid main()\n{\n    vec4 pos = vec4(position.xy, 0.0, 1.0);\n    gl_Position = czm_projection*pos;\n\n}",
            fragmentShaderSource: "void main()\n{\n      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}"
          }),
              a = new W();
          W.inverse(e.m_matLocal, a);

          for (var s = [], l = [], u = 0; u < e._clipPolygons.length; ++u) {
            var h = e._clipPolygons[u];

            if (!O(h.show) || h.show) {
              for (var m = b.createGeometry(h), d = m.attributes.position.values, c = 0, p = d.length / 3; c < p; ++c) {
                var y = new V(0, 0, 0);
                y.x = d[3 * c], y.y = d[3 * c + 1], y.z = d[3 * c + 2], W.multiplyByPoint(a, y, y), l.push(y), m.attributes.position.values[3 * c] = y.x, m.attributes.position.values[3 * c + 1] = y.y, m.attributes.position.values[3 * c + 2] = y.z;
              }

              var _ = new I(),
                  _ = I.transform(m.boundingSphere, a, _);

              m.boundingSphere = _;
              var f = ae.fromGeometry({
                context: r,
                geometry: m,
                bufferUsage: Y.STATIC_DRAW,
                interleave: !0
              }),
                  g = new K({
                boundingVolume: _,
                primitiveType: X.TRIANGLES,
                vertexArray: f,
                shaderProgram: n,
                renderState: i,
                pass: $.PGEARTH_3D_TILE
              });
              s.push(g);
            }
          }

          var v,
              x = new L();
          L.fromPoints(l, x), e._clipBounds.x = x.x - x.width / 4096, e._clipBounds.y = x.y + x.height + x.height / 4096, e._clipBounds.z = x.x + x.width + x.width / 4096, e._clipBounds.w = x.y - x.height / 4096, O(e._clipFramebuffer) || (v = new ne({
            context: r,
            width: 4096,
            height: 4096,
            pixelFormat: k.RGB,
            pixelDatatype: te.UNSIGNED_BYTE
          }), e._clipFramebuffer = new Q({
            context: r,
            colorTextures: [v],
            destroyAttachments: !1
          }));
          var w = new q();
          w.left = e._clipBounds.x, w.top = e._clipBounds.y, w.right = e._clipBounds.z, w.bottom = e._clipBounds.w, o.updateFrustum(w);
          var T = new ee(r);
          T.framebuffer = e._clipFramebuffer, T.viewport = new L(0, 0, 4096, 4096), new Z({
            color: new R(0, 0, 0, 0)
          }).execute(r, T);

          for (u = 0; u < s.length; u++) {
            g = s[u];
            o.updatePass(g.pass), g.execute(r, T);
          }

          e._clipDirty = !1;
        }
      }(this, e), function (e, t) {
        if (e._pitDirty && 0 != e._pitPolygons.length) {
          var r = t.context,
              o = r.uniformState,
              i = re.fromCache({
            depthTest: {
              enabled: !1
            },
            cull: {
              enabled: !0,
              face: se.BACK
            }
          }),
              n = oe.fromCache({
            context: r,
            vertexShaderSource: "attribute vec3 position;\nvoid main()\n{\n    vec4 pos = vec4(position.xy, 0.0, 1.0);\n    gl_Position = czm_projection*pos;\n\n}",
            fragmentShaderSource: "void main()\n{\n      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}"
          }),
              a = new W();
          W.inverse(e.m_matLocal, a);

          for (var s = [], l = [], u = 0; u < e._pitPolygons.length; ++u) {
            var h = e._pitPolygons[u];

            if (!O(h.show) || h.show) {
              for (var m = b.createGeometry(h), d = m.attributes.position.values, c = 0, p = d.length / 3; c < p; ++c) {
                var y = new V(0, 0, 0);
                y.x = d[3 * c], y.y = d[3 * c + 1], y.z = d[3 * c + 2], W.multiplyByPoint(a, y, y), l.push(y), m.attributes.position.values[3 * c] = y.x, m.attributes.position.values[3 * c + 1] = y.y, m.attributes.position.values[3 * c + 2] = y.z;
              }

              var _ = new I(),
                  _ = I.transform(m.boundingSphere, a, _);

              m.boundingSphere = _;
              var f = ae.fromGeometry({
                context: r,
                geometry: m,
                bufferUsage: Y.STATIC_DRAW,
                interleave: !0
              }),
                  g = new K({
                boundingVolume: _,
                primitiveType: X.TRIANGLES,
                vertexArray: f,
                shaderProgram: n,
                renderState: i,
                pass: $.PGEARTH_3D_TILE
              });
              s.push(g);
            }
          }

          var v,
              x = new L();
          L.fromPoints(l, x), e._pitBounds.x = x.x - x.width / 4096, e._pitBounds.y = x.y + x.height + x.height / 4096, e._pitBounds.z = x.x + x.width + x.width / 4096, e._pitBounds.w = x.y - x.height / 4096, O(e._pitFramebuffer) || (v = new ne({
            context: r,
            width: 4096,
            height: 4096,
            pixelFormat: k.RGB,
            pixelDatatype: te.UNSIGNED_BYTE
          }), e._pitFramebuffer = new Q({
            context: r,
            colorTextures: [v],
            destroyAttachments: !1
          }));
          var w = new q();
          w.left = e._pitBounds.x, w.top = e._pitBounds.y, w.right = e._pitBounds.z, w.bottom = e._pitBounds.w, o.updateFrustum(w);
          var T = new ee(r);
          T.framebuffer = e._pitFramebuffer, T.viewport = new L(0, 0, 4096, 4096), new Z({
            color: new R(0, 0, 0, 0)
          }).execute(r, T);

          for (u = 0; u < s.length; u++) {
            g = s[u];
            o.updatePass(g.pass), g.execute(r, T);
          }

          e._pitDirty = !1;
        }
      }(this, e), !O(this._colorTexture) && O(this._colorTable) && (i = this._colorTable.generateImage(1024), this._colorTexture = new ne({
        context: e.context,
        source: i,
        width: 1024,
        height: 1,
        pixelFormat: k.RGBA,
        pixelDatatype: te.UNSIGNED_BYTE,
        sampler: new w({
          wrapS: P.CLAMP_TO_EDGE,
          wrapT: P.CLAMP_TO_EDGE,
          minificationFilter: C.LINEAR,
          magnificationFilter: T.LINEAR
        })
      })), fe(this, e), this.NodeMesh = [], this.nodes, this._loadTimestamp = p.now(), this.lastAccessTime = new Date().getTime(), ++this.lastAccessFrame, e.commandList.length, this.selectTiles(e), e.totalMemoryUsageInBytes += this.totalMemoryUsageInBytes, 0 < this.nodeCount && (n = 1 - this.curLoadingNode / this.nodeCount, n = y.clamp(n, 0, 1), this._progressEvent.raiseEvent(n));
    }
  }, _e.prototype.selectTiles = function (e) {
    for (var t = 0, r = this.nodes.length; t < r; t++) {
      var o,
          i = this.nodes[t];
      i.checkInFrustum(e) && (0 < i.bdSphere.radius ? (o = I.transform(i.bdSphere, this.m_matLocal, o), e.cullingVolume.computeVisibility(o) != c.OUTSIDE && i._distanceToCamera < this._tileVisibleDistance && e._selectedTiles.push(i)) : e._selectedTiles.push(i));
    }
  }, _e.prototype.isDestroyed = function () {
    return !1;
  }, _e.prototype.initFlattenPolygon = function (e) {
    if (0 != this._flattenPolygons.length) {
      O(this._polygonDepth) || (this._polygonDepth = new ce()), this._polygonDepth._flattenPolygonDrawCommonds = [];
      var t = {
        position: 0
      },
          r = new W();
      W.inverse(this.m_matLocal, r);

      for (var o = new L(), i = [], n = 0; n < this._flattenPolygons.length; n++) {
        var a = this._flattenPolygons[n];

        if (!O(a.show) || a.show) {
          for (var s, l = e.context, u = b.createGeometry(a), h = u.attributes.position.values, m = 0; m < h.length / 3; m++) {
            var d = new V(0, 0, 0);
            d.x = h[3 * m], d.y = h[3 * m + 1], d.z = h[3 * m + 2], new V(), W.multiplyByPoint(r, d, d), i.push(d), u.attributes.position.values[3 * m] = d.x, u.attributes.position.values[3 * m + 1] = d.y, u.attributes.position.values[3 * m + 2] = d.z;
          }

          s = I.transform(u.boundingSphere, r, s), u.boundingSphere = s;
          var c = ae.fromGeometry({
            context: l,
            geometry: u,
            attributeLocations: t,
            bufferUsage: Y.STATIC_DRAW,
            interleave: !0
          }),
              p = oe.fromCache({
            context: l,
            vertexShaderSource: F,
            fragmentShaderSource: D
          }),
              y = new re();
          y.depthTest.enabled = !0, y.cull.enabled = !0, y.cull.face = se.BACK;

          var _ = new K({
            boundingVolume: s,
            modelMatrix: new W(),
            primitiveType: X.TRIANGLES,
            vertexArray: c,
            shaderProgram: p,
            uniformMap: {},
            renderState: y,
            pass: $.PGEARTH_3D_TILE
          });

          this._polygonDepth._flattenPolygonDrawCommonds.push(_);
        }
      }

      L.fromPoints(i, o), this._flattenBounds.x = o.x, this._flattenBounds.y = o.y + o.height, this._flattenBounds.z = o.x + o.width, this._flattenBounds.w = o.y, this._polygonDepth.updateFrustum(this._flattenBounds.x, this._flattenBounds.y, this._flattenBounds.z, this._flattenBounds.w);
    } else this._polygonDepth._flattenPolygonDrawCommonds = [];
  }, _e.prototype.updateFlatten = function () {
    this._needUpateFlatten = !0;
  }, _e.prototype.cleanflattenPolygon = function () {
    this._polygonDepth._flattenPolygonDrawCommonds = [], this._polygonDepth.destroy(), this._polygonDepth = void 0, this._flattenPolygons = [], this._flattenBounds = new N();
  }, _e.prototype.toJSON = function () {
    var e = {};
    return O(this.name) ? e.name = this.name : e.name = this._url, e.position = this._position, e.type = this._type, e.url = this._url, e.subdomains = this._subdomains, e.shadows = this.shadows, e.show = o(this.show, !0), e;
  }, _e.prototype.release = function (e) {
    for (var t = 0, r = this.nodes.length; t < r; t++) {
      this.cleanNodes(this.nodes[t], !1, e);
    }
  }, _e.prototype.destroy = function () {
    for (var e = 0, t = this.nodes.length; e < t; e++) {
      this.nodes[e].unloadChildren();
    }

    return this.cleanClipPolygons(), this.cleanPitPolygons(), this.setColorTable(null), this.setOverlayImageLayer(null), i(this);
  }, _e.prototype.setClipppingPlanes = function (e) {
    this._clippingPlanes = e;
  }, _e.prototype.addClipPolygon = function (e) {
    this._clipPolygons.push(e), this._clipDirty = !0;
  }, _e.prototype.updateClip = function () {
    this._clipDirty = !0;
  }, _e.prototype.cleanClipPolygons = function () {
    this._clipPolygons.length = 0, this._clipDirty = !1, N.fromElements(0, 0, 0, 0, this._clipBounds), this._clipFramebuffer = this._clipFramebuffer && !this._clipFramebuffer.isDestroyed() && this._clipFramebuffer.destroy();
  }, _e.prototype.updatePit = function () {
    this._pitDirty = !0;
  }, _e.prototype.cleanPitPolygons = function () {
    this._pitPolygons.length = 0, this._pitDirty = !1, N.fromElements(0, 0, 0, 0, this._pitBounds), this._pitFramebuffer = this._pitFramebuffer && !this._pitFramebuffer.isDestroyed() && this._pitFramebuffer.destroy();
  }, _e.prototype.setColorTable = function (e) {
    O(this._colorTable) && this._colorTable.destroy(), this._colorTable = e, O(e) && 0 < e.length && (this._colorRange.x = e._elements[0].key, this._colorRange.y = e._elements[e.length - 1].key), this._colorTexture = this._colorTexture && !this._colorTexture.isDestroyed() && this._colorTexture.destroy();
  }, _e.prototype.setDisplayMode = function (e) {
    this._displayMode = e;
  }, _e.prototype.setOverlayImageLayer = function (e) {
    this._overlayImageLayer = e, O(e) || (this._overlayBounds = void 0, this._overlayRect = void 0, this._tilesInOverlay.length = 0, this._overlayFramebuffer = this._overlayFramebuffer && !this._overlayFramebuffer.isDestroyed() && this._overlayFramebuffer.destroy(), this._overlayVertShaderSource = void 0, this._overlayFragShaderSource = void 0, this._overlayShaderPrograms.length = 0, this._overlayTileCommand = void 0, this._overlayTileUniforms.length = 0, this._lastViewMatrix = void 0, this._lastProjectionMatrix = void 0);
  };
  var xe = new f();
  return _e;
});