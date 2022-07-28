"use strict";

var fragmentShaderSource = "uniform vec4 u_bgColor;\nvoid main()\n{\n    gl_FragColor = u_bgColor;\n\n    czm_writeLogDepth();\n}";
var vertexShaderSource = "attribute vec3 position;\nvoid main()\n{\n    gl_Position = czm_modelViewProjection * vec4(position.xyz,1.0);\n\n    czm_vertexLogDepth();\n}";
var shaderSource2 = "uniform sampler2D u_colorTexture;\nuniform sampler2D u_resultTexture;\nuniform vec4 u_visibleAreaColor;\nuniform vec4 u_hiddenAreaColor;\nuniform bool u_valid;\nvarying vec2 v_textureCoordinates;\n\nvoid main()\n{\n    vec4 color = texture2D(u_colorTexture, v_textureCoordinates);\n    if (u_valid && true) {\n        vec4 viewshedColor = vec4(0.0);\n        // result.x: 0-不在可视域范围内，0.5-不可见，1.0-可见。\n        vec4 result = texture2D(u_resultTexture, v_textureCoordinates);\n        if (result.x > 0.9)\n            viewshedColor = u_visibleAreaColor;\n        else if (result.x > 0.4)\n            viewshedColor = u_hiddenAreaColor;\n        color.rgb = color.rgb*(1.0-viewshedColor.a) + viewshedColor.rgb*viewshedColor.a;\n    }\n    gl_FragColor = color;\n}";
var shaderSource = "precision highp float;\nuniform sampler2D u_sceneDepthTexture;\nuniform sampler2D u_depthTexture;\nuniform sampler2D u_lastResultTexture;\nuniform mat4 u_textureViewMatrix;\nuniform mat4 u_textureProjMatrix;\nuniform float u_farDist;\nuniform vec4 u_visibleAreaColor;\nuniform vec4 u_hiddenAreaColor;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\n    // result.x: 0-不在可视域范围内，0.5-不可见，1.0-可见。\n    vec4 result = texture2D(u_lastResultTexture, v_textureCoordinates);\n    // 可见就直接赋值为可见。\n    if (result.x != 1.0) {\n        float sceneDepth = czm_unpackDepth(texture2D(u_sceneDepthTexture, v_textureCoordinates));\n        sceneDepth = sceneDepth>0.0 ? sceneDepth : 1.0;\n        vec4 projPos = vec4(v_textureCoordinates*2.0-1.0, sceneDepth*2.0-1.0, 1.0);\n        vec4 texViewPos = u_textureViewMatrix * projPos;\n        vec4 texProjPos = u_textureProjMatrix * texViewPos;\n        texProjPos /= texProjPos.w;\n        texProjPos.xyz = texProjPos.xyz * 0.5 + 0.5;\n\n        // 计算最远距离的深度\n        texViewPos /= texViewPos.w;\n        texViewPos.xyz *= u_farDist / length(texViewPos.xyz);\n        vec4 farPos = u_textureProjMatrix * texViewPos;\n        float farDepth = farPos.z / farPos.w;\n        farDepth = farDepth * 0.5 + 0.5;\n        farDepth = min(farDepth, 1.0);\n\n        if (texProjPos.x > 0.0 && texProjPos.x < 1.0 &&\n            texProjPos.y > 0.0 && texProjPos.y < 1.0 &&\n            texProjPos.z > 0.5 && texProjPos.z < farDepth) {\n            float depth = texture2D(u_depthTexture, texProjPos.xy).r;\n            if (depth < 1.0 && depth - texProjPos.z < -1.0e-5) {\n                result.x = 0.5;\n            } else {\n                result.x = 1.0;\n            }\n        }\n    }\n    gl_FragColor = result;}";
define(["../../../Core/Cartesian3", "../../../Core/Check", "../../../Core/Color", "../../../Core/Matrix4", "../../../Core/defined", "../../../Core/Math", "../../../Core/createGuid", "../../../Core/Transforms", "../../../Core/defineProperties", "../../../Core/PixelFormat", "../../../Core/BoundingRectangle", "../../../Core/BoundingSphere", "../../../Core/ComponentDatatype", "../../../Core/IndexDatatype", "../../../Core/PrimitiveType", "../../../Core/Intersect", "../../../Core/destroyObject", "../../../Renderer/VertexArray", "../../../Renderer/PixelDatatype", "../../../Renderer/RenderState", "../../../Renderer/ClearCommand", "../../../Renderer/ShaderSource", "../../../Renderer/Framebuffer", "../../../Renderer/Texture", "../../../Renderer/Sampler", "../../../Renderer/TextureMinificationFilter", "../../../Renderer/TextureMagnificationFilter", "../../../Renderer/PassState", "../../../Renderer/Buffer", "../../../Renderer/BufferUsage", "../../../Renderer/ShaderProgram", "../../../Renderer/DrawCommand", "../../../Renderer/Pass", "../../../Scene/BlendingState", "../../../Scene/Camera"], function (r, j, m, q, C, c, A, G, t, d, I, l, f, b, e, H, s, k, F, o, v, K, B, n, z, y, x, a, J, w, i, g, E, p, D) {
  function h(N, M) {
    j["typeOf"]["object"]("scene", N);
    this._scene = N;
    this._viewerPosition = new r(0, 0, 0);
    this._direction = 0;
    this._pitch = 0;
    this._horizontalFov = 60;
    this._verticalFov = 60;
    this._distance = 0;
    this._visibleAreaColor = new m(0, 1, 0, 0.5);
    this._hiddenAreaColor = new m(1, 0, 0, 0.5);
    this._targetPoint = new r(0, 0, 0);
    this._modelMatrix = new q();
    this._lineColor = m.YELLOW;
    this._hintLineUpdated = false;
    this._initialized = false;
    this._cameraUpdated = false;
    this._indices = void 0;
    this._positions = void 0;
    this._drawLineCommand = void 0;
    this._depthPassState = void 0;
    this._depthCamera = void 0;
    this._textureViewMatrix = new q();
    this._textureProjMatrix = new q();
    this._resultFrameBuffer = [];
    this._resultTextures = [];
    this._lastResultTexture = void 0;
    this._parentViewshed = void 0;
    this._childViewsheds = [];
    this._analysisCommand = void 0;
    this._mapDrawCommand = void 0;
    this._boundingVolume = void 0;
    this._valid = false;
    this._name = M;
    C(this._name) || (this._name = A());
    this._ready = true;
    this.enabled = true;
    this._enabled = true;
    var L = this._scene.postProcessStages._activeStages;
    L.map(function (O) {
      if (O instanceof h && M === O._name) {
        O.destroy();
      }
    });

    this._scene.postProcessStages.add(this);
  }

  function u(O, P, L, M) {
    if (P["_valid"]) {
      var N = O["_lastResultTexture"] !== O["_resultTextures"][0] ? O["_resultFrameBuffer"][0] : O["_resultFrameBuffer"][1];
      L["framebuffer"] = N, L["execute"](M), C(P["_analysisCommand"]) || (P["_analysisCommand"] = function (T, U, Q) {
        var R = o.fromCache({
          depthTest: {
            enabled: false
          },
          depthMask: false
        }),
            S = new K({
          sources: [shaderSource]
        }),
            V = {
          u_sceneDepthTexture: function u_sceneDepthTexture() {
            return T["_scene"]["_view"]["pickDepths"][0]["_depthTexture"];
          },
          u_depthTexture: function u_depthTexture() {
            return T["_depthPassState"]["framebuffer"]["depthStencilTexture"];
          },
          u_lastResultTexture: function u_lastResultTexture() {
            return U["_lastResultTexture"];
          },
          u_textureViewMatrix: function u_textureViewMatrix() {
            return T["_textureViewMatrix"];
          },
          u_textureProjMatrix: function u_textureProjMatrix() {
            return T["_textureProjMatrix"];
          },
          u_farDist: function u_farDist() {
            return T["_distance"];
          }
        };
        return Q.createViewportQuadCommand(S, {
          renderState: R,
          uniformMap: V,
          owner: T
        });
      }(P, O, M)), P._analysisCommand.framebuffer = N, M.draw(P._analysisCommand), O._lastResultTexture = N.getColorTexture(0);
    }
  }

  t(h["prototype"], {
    viewerPosition: {
      get: function get() {
        return this["_viewerPosition"];
      },
      set: function set(L) {
        this["_viewerPosition"] = L;
        this["_cameraUpdated"] = false;
      }
    },
    direction: {
      get: function get() {
        return this["_direction"];
      },
      set: function set(L) {
        this["_direction"] = L;
        this["_cameraUpdated"] = false;
      }
    },
    pitch: {
      get: function get() {
        return this["_pitch"];
      },
      set: function set(L) {
        this["_pitch"] = L, this["_cameraUpdated"] = false;
      }
    },
    horizontalFov: {
      get: function get() {
        return this["_horizontalFov"];
      },
      set: function set(L) {
        this["_horizontalFov"] = L, this["_cameraUpdated"] = false, this["_hintLineUpdated"] = false;
      }
    },
    verticalFov: {
      get: function get() {
        return this["_verticalFov"];
      },
      set: function set(L) {
        this["_verticalFov"] = L, this["_cameraUpdated"] = false, this["_hintLineUpdated"] = false;
      }
    },
    distance: {
      get: function get() {
        return this["_distance"];
      },
      set: function set(L) {
        this["_distance"] = L, this["_cameraUpdated"] = false, this["_hintLineUpdated"] = false;
      }
    },
    visibleAreaColor: {
      get: function get() {
        return this["_visibleAreaColor"];
      },
      set: function set(L) {
        this["_visibleAreaColor"] = L;
      }
    },
    hiddenAreaColor: {
      get: function get() {
        return this["_hiddenAreaColor"];
      },
      set: function set(L) {
        this["_hiddenAreaColor"] = L;
      }
    },
    lineColor: {
      get: function get() {
        return this["_lineColor"];
      },
      set: function set(L) {
        this["_lineColor"] = L;
      }
    },
    outputTexture: {
      get: function get() {
        return C(this["_parentViewshed"]) ? this["_parentViewshed"]["outputTexture"] : this["_lastResultTexture"];
      }
    },
    ready: {
      get: function get() {
        return this["_ready"];
      }
    },
    name: {
      get: function get() {
        return this["_name"];
      }
    }
  });

  h.prototype.setPoseByTargetPoint = function (M) {
    this.distance = r.distance(this._viewerPosition, M);

    if (0 !== this["distance"]) {
      var N = new r(),
          L = G.eastNorthUpToFixedFrame(this._viewerPosition);
      q.inverse(L, L), q.multiplyByPoint(L, M, N), r.normalize(N, N), this.direction = c.toDegrees(Math.atan2(N.x, N.y)), this.pitch = c.toDegrees(Math.asin(N.z));
    }
  };

  h["prototype"]["attachViewshed"] = function (L) {
    return !(!C(L) || C(L["_parentViewshed"])) && (this["_childViewsheds"]["push"](L), L["_parentViewshed"] = this, true);
  };

  h["prototype"]["detachViewshed"] = function (M) {
    if (!C(M)) {
      return false;
    }

    for (var N = this["_childViewsheds"]["length"], L = 0; L < N; ++L) {
      if (this["_childViewsheds"][L] === M) {
        return M["_childViewsheds"]["splice"](L, 1), !(M["_parentViewshed"] = void 0);
      }
    }

    return false;
  };

  h["prototype"]["locateToViewer"] = function () {
    this["_scene"]["camera"]["setView"]({
      destination: this["_depthCamera"]["position"],
      orientation: {
        direction: this["_depthCamera"]["direction"],
        up: this["_depthCamera"]["up"]
      }
    });
  };

  h.prototype.update = function (O, P) {
    if (0 !== this._distance) {
      var L = this._scene.frameState;

      if (this._initialized || function (aa) {
        aa._positions = new Float32Array(633);
        aa._indices = new Uint16Array(408);
        var W = aa._indices,
            T = 0;
        W[T++] = 0;
        W[T++] = 1;
        W[T++] = 0;
        W[T++] = 21;
        W[T++] = 0;
        W[T++] = 85;
        W[T++] = 0;
        W[T++] = 105;

        for (var Z = 0, S = 0; S < 5; ++S) {
          Z++;

          for (var U = 0; U < 20; ++U) {
            W[T++] = Z++;
            W[T++] = Z;
          }
        }

        Z++;

        for (var Y = 0; Y < 20; ++Y) {
          for (var X = 0; X < 5; ++X) {
            W[T++] = Z;
            W[T++] = 5 + Z++;
          }
        }

        var R = aa._scene._context;
        C(aa._depthCamera) || (aa._depthCamera = new D(aa._scene));

        if (!C(aa._depthPassState)) {
          var V = new B({
            context: R,
            depthStencilTexture: new n({
              context: R,
              width: 2048,
              height: 2048,
              pixelFormat: d.DEPTH_STENCIL,
              pixelDatatype: F.UNSIGNED_INT_24_8
            })
          });
          aa._depthPassState = new a(R);
          aa._depthPassState.viewport = new I(0, 0, 2048, 2048);
          aa._depthPassState.framebuffer = V;
        }

        aa._initialized = true;
      }(this), this._cameraUpdated || function (R) {
        R._depthCamera.frustum.near = 0.001 * R._distance;
        R._depthCamera.frustum.far = R._distance;
        R._depthCamera.frustum.fov = c.toRadians(Math.max(R._horizontalFov, R._verticalFov));
        R._depthCamera.frustum.aspectRatio = R._horizontalFov / R._verticalFov;

        R._depthCamera.setView({
          destination: R._viewerPosition,
          orientation: {
            heading: c.toRadians(R._direction),
            pitch: c.toRadians(R._pitch)
          }
        });

        R._modelMatrix = R._depthCamera.inverseViewMatrix;
        R._cameraUpdated = true;
      }(this), this._hintLineUpdated || function (ac, at) {
        var aj,
            ai,
            au,
            W,
            ao = ac._positions,
            ak = c.toRadians(ac._horizontalFov),
            Y = c.toRadians(ac._verticalFov),
            az = Math.tan(0.5 * ak),
            aa = Math.tan(0.5 * Y);
        ai = ac._distance * az;
        W = ac._distance * aa;
        aj = -ai;
        au = -W;
        var Z = new r(aj, au, -ac._distance),
            R = new r(ai, W, 0);
        q.multiplyByPoint(ac._modelMatrix, Z, Z);
        q.multiplyByPoint(ac._modelMatrix, R, R);
        var ar = l.fromCornerPoints(Z, R);
        ac._boundingVolume = ar;
        var S = 0;
        ao[S++] = 0;
        ao[S++] = 0;
        ao[S++] = 0;

        for (var av, ae, ag = Math.PI - 0.5 * ak, am = ak / 4, X = 0; X < 5; ++X) {
          av = ag + X * am;
          aq = Math.atan(W / (ac._distance / Math.cos(av)));
          aA = -aq;
          ah = aq / 10;

          for (var U = 0; U < 21; ++U) {
            ae = aA + U * ah;
            ao[S++] = ac._distance * Math.cos(ae) * Math.sin(av);
            ao[S++] = ac._distance * Math.sin(ae);
            ao[S++] = ac._distance * Math.cos(ae) * Math.cos(av);
          }
        }

        am = ak / 20;

        for (var ax = 0; ax < 21; ++ax) {
          av = ag + ax * am;
          var ab = W / (ac._distance / Math.cos(av)),
              aq = Math.atan(ab),
              aA = -aq,
              ah = aq / 2;

          for (var an = 0; an < 5; ++an) {
            ae = aA + an * ah;
            ao[S++] = ac._distance * Math.cos(ae) * Math.sin(av);
            ao[S++] = ac._distance * Math.sin(ae);
            ao[S++] = ac._distance * Math.cos(ae) * Math.cos(av);
          }
        }

        var aw = at.context,
            V = J.createIndexBuffer({
          context: aw,
          typedArray: new Uint32Array(ac._indices),
          usage: w.STATIC_DRAW,
          indexDatatype: b.UNSIGNED_INT
        }),
            ap = J.createVertexBuffer({
          context: aw,
          typedArray: f.createTypedArray(f.FLOAT, ac._positions),
          usage: w.STATIC_DRAW
        }),
            al = [];
        al.push({
          index: 0,
          vertexBuffer: ap,
          componentDatatype: f.FLOAT,
          componentsPerAttribute: 3,
          normalize: false
        });
        var T = new k({
          context: aw,
          attributes: al,
          indexBuffer: V
        });

        if (C(ac._drawLineCommand)) {
          ac._drawLineCommand.vertexArray.destroy();

          ac._drawLineCommand.vertexArray = T;
          ac._drawLineCommand.modelMatrix = ac._modelMatrix;
          ac._drawLineCommand.boundingVolume = ar;
        } else {
          var af = i.fromCache({
            context: aw,
            vertexShaderSource: vertexShaderSource,
            fragmentShaderSource: fragmentShaderSource
          }),
              ay = o.fromCache({
            depthTest: {
              enabled: true
            }
          }),
              ad = {
            u_bgColor: function u_bgColor() {
              return ac._lineColor;
            }
          };
          ac._drawLineCommand = new g({
            boundingVolume: ar,
            modelMatrix: ac._modelMatrix,
            primitiveType: e.LINES,
            vertexArray: T,
            shaderProgram: af,
            castShadows: false,
            receiveShadows: false,
            uniformMap: ad,
            renderState: ay,
            pass: E.OPAQUE
          });
        }

        ac._hintLineUpdated = true;
      }(this, L), C(this._boundingVolume) && L.cullingVolume.computeVisibility(this._boundingVolume) === H.OUTSIDE) {
        this._valid = false;
      } else {
        this._valid = true;

        if (C(this._drawLineCommand)) {
          L.commandList.push(this._drawLineCommand);
          var M = this._scene.frustumCommandsList[0],
              N = this._drawLineCommand.pass,
              Q = M.indices[N]++;
          M.commands[N][Q] = this._drawLineCommand;
        }

        !function (R) {
          q.multiply(R._scene.camera.workingFrustums[0].projectionMatrix, R._scene.camera.viewMatrix, R._textureViewMatrix);
          q.inverse(R._textureViewMatrix, R._textureViewMatrix);
          q.multiply(R._depthCamera.viewMatrix, R._textureViewMatrix, R._textureViewMatrix);
          q.clone(R._depthCamera.frustum.projectionMatrix, R._textureProjMatrix);
          var S = new v({
            depth: 1,
            framebuffer: R._depthPassState.framebuffer
          });
          !function (af, Y, V, ad) {
            var U = af.frameState,
                W = af.context,
                ac = W.uniformState;
            ac.updateCamera(ad);
            Y.execute(af.context, V);
            var aa = ad.frustum.computeCullingVolume(ad.positionWC, ad.directionWC, ad.upWC),
                ae = U.commandList,
                X = ae.length;

            for (var Z = 0; Z < X; ++Z) {
              var ab = ae[Z];

              if ((ab.pass === E.GLOBE || ab.pass === E.PGEARTH_3D_TILE || ab.pass === E.OPAQUE || ab.pass === E.TRANSLUCENT) && af.isVisible(ab, aa)) {
                ac.updatePass(ab.pass);
                var T = ab = ab.derivedCommands.depth;
                C(T) && C(T.depthOnlyCommand) && T.depthOnlyCommand.execute(W, V);
              }
            }

            ac.updateCamera(af.camera);
            ac.updateFrustum(af.camera.workingFrustums[0]);
          }(R._scene, S, R._depthPassState, R._depthCamera);
        }(this);
      }
    } else {
      this["_valid"] = false;
    }
  };

  h.prototype.execute = function (N, Q, P, V) {
    if (!C(this._parentViewshed)) {
      var O = N.uniformState.viewport,
          M = O.width,
          X = O.height;

      if (0 === this._resultTextures.length || this._resultTextures[0].width !== M || this._resultTextures[0].height !== X) {
        this._resultTextures = [];
        this._resultFrameBuffer = [];
        var U = new z({
          minificationFilter: y.NEAREST,
          magnificationFilter: x.NEAREST
        });

        for (var W = 0; W < 2; ++W) {
          var T = new n({
            context: N,
            width: M,
            height: X,
            pixelFormat: d.RGBA,
            pixelDatatype: F.UNSIGNED_BYTE,
            sampler: U
          });

          this._resultTextures.push(T);

          var R = new B({
            context: N,
            colorTextures: [T]
          });

          this._resultFrameBuffer.push(R);
        }
      }

      var S = new v({
        color: m.BLACK,
        framebuffer: this._resultFrameBuffer[0]
      });
      S.execute(N);
      this._lastResultTexture = this._resultTextures[0];
      u(this, this, S, N);

      for (W = 0; W < this._childViewsheds.length; ++W) {
        u(this, this._childViewsheds[W], S, N);
      }

      C(this._mapDrawCommand) || (this._mapDrawCommand = function (ac, ab) {
        var Y = o.fromCache({
          depthTest: {
            enabled: false
          },
          depthMask: false,
          blending: p.ALPHA_BLEND
        }),
            Z = new K({
          sources: [shaderSource2]
        }),
            aa = {
          u_colorTexture: function u_colorTexture() {},
          u_valid: function u_valid() {
            for (var ad = 0; ad < ac._childViewsheds.length; ++ad) {
              if (ac._childViewsheds[ad]._valid) {
                return true;
              }
            }

            return ac._valid;
          },
          u_resultTexture: function u_resultTexture() {
            return ac._lastResultTexture;
          },
          u_visibleAreaColor: function u_visibleAreaColor() {
            return ac["_visibleAreaColor"];
          },
          u_hiddenAreaColor: function u_hiddenAreaColor() {
            return ac["_hiddenAreaColor"];
          }
        };
        return ab.createViewportQuadCommand(Z, {
          renderState: Y,
          uniformMap: aa,
          owner: ac
        });
      }(this, N));
      this._mapDrawCommand.uniformMap.u_colorTexture() !== Q && (this._mapDrawCommand.uniformMap.u_colorTexture = function () {
        return Q;
      });
      var L = this._lastResultTexture !== this._resultTextures[0] ? this._resultFrameBuffer[0] : this._resultFrameBuffer[1];
      S.framebuffer = L;
      S.execute(N);
      this._mapDrawCommand.framebuffer = L;
      N.draw(this._mapDrawCommand);
      this._lastResultTexture = L.getColorTexture(0);
    }
  };

  h.prototype._isSupported = function (L) {
    return true;
  };

  h.prototype.destroy = function () {
    return this._scene.postProcessStages.remove(this), s(this);
  };

  return h;
});