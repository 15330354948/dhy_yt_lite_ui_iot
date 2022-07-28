"use strict";

define(["../Core/buildModuleUrl", "../Core/createGuid", "../Core/Color", "../Core/defined", "../Core/defineProperties", "../Core/deprecationWarning", "../Core/destroyObject", "../Core/Ellipsoid", "../Shaders/PostProcessStages/AcesTonemapping", "../Shaders/PostProcessStages/AmbientOcclusionGenerate", "../Shaders/PostProcessStages/AmbientOcclusionModulate", "../Shaders/PostProcessStages/BlackAndWhite", "../Shaders/PostProcessStages/BloomComposite", "../Shaders/PostProcessStages/Brightness", "../Shaders/PostProcessStages/ContrastBias", "../Shaders/PostProcessStages/DepthOfField", "../Shaders/PostProcessStages/DepthView", "../Shaders/PostProcessStages/EdgeDetection", "../Shaders/PostProcessStages/FilmicTonemapping", "../Shaders/PostProcessStages/FXAA", "../Shaders/PostProcessStages/GaussianBlur1D", "../Shaders/PostProcessStages/LensFlare", "../Shaders/PostProcessStages/ModifiedReinhardTonemapping", "../Shaders/PostProcessStages/NightVision", "../Shaders/PostProcessStages/ReinhardTonemapping", "../Shaders/PostProcessStages/Silhouette", "../Shaders/PostProcessStages/Rain", "../Shaders/PostProcessStages/Snow", "../ThirdParty/Shaders/FXAA3_11", "./AutoExposure", "./PostProcessStage", "./PostProcessStageComposite", "./PostProcessStageSampleMode"], function (I, F, j, H, u, r, t, A, D, E, i, C, G, l, z, k, p, m, v, x, e, w, h, n, f, c, a, J, K, b, s, q, g) {
  var d = {};

  function B(Q) {
    var S = 1;
    var R = 2;
    var N = 1;
    var P = "#define USE_STEP_SIZE\n" + e;
    var O = new s({
      name: Q + "_x_direction",
      fragmentShader: P,
      uniforms: {
        delta: S,
        sigma: R,
        stepSize: N,
        direction: 0
      },
      sampleMode: g.LINEAR
    });
    var M = new s({
      name: Q + "_y_direction",
      fragmentShader: P,
      uniforms: {
        delta: S,
        sigma: R,
        stepSize: N,
        direction: 1
      },
      sampleMode: g.LINEAR
    });
    var L = {};
    u(L, {
      delta: {
        get: function get() {
          return O.uniforms.delta;
        },
        set: function set(T) {
          var V = O.uniforms;
          var U = M.uniforms;
          V.delta = U.delta = T;
        }
      },
      sigma: {
        get: function get() {
          return O.uniforms.sigma;
        },
        set: function set(T) {
          var V = O.uniforms;
          var U = M.uniforms;
          V.sigma = U.sigma = T;
        }
      },
      stepSize: {
        get: function get() {
          return O.uniforms.stepSize;
        },
        set: function set(T) {
          var V = O.uniforms;
          var U = M.uniforms;
          V.stepSize = U.stepSize = T;
        }
      }
    });
    return new q({
      name: Q,
      stages: [O, M],
      uniforms: L
    });
  }

  d.createBlurStage = function () {
    return B("czm_blur");
  };

  d.createDepthOfFieldStage = function () {
    var N = B("czm_depth_of_field_blur");
    var M = new s({
      name: "czm_depth_of_field_composite",
      fragmentShader: k,
      uniforms: {
        focalDistance: 5,
        blurTexture: N.name
      }
    });
    var L = {};
    u(L, {
      focalDistance: {
        get: function get() {
          return M.uniforms.focalDistance;
        },
        set: function set(O) {
          M.uniforms.focalDistance = O;
        }
      },
      delta: {
        get: function get() {
          return N.uniforms.delta;
        },
        set: function set(O) {
          N.uniforms.delta = O;
        }
      },
      sigma: {
        get: function get() {
          return N.uniforms.sigma;
        },
        set: function set(O) {
          N.uniforms.sigma = O;
        }
      },
      stepSize: {
        get: function get() {
          return N.uniforms.stepSize;
        },
        set: function set(O) {
          N.uniforms.stepSize = O;
        }
      }
    });
    return new q({
      name: "czm_depth_of_field",
      stages: [N, M],
      inputPreviousStageTexture: false,
      uniforms: L
    });
  };

  d.isDepthOfFieldSupported = function (L) {
    return L.context.depthTexture;
  };

  d.createEdgeDetectionStage = function () {
    var L = F();
    return new s({
      name: "czm_edge_detection_" + L,
      fragmentShader: m,
      uniforms: {
        length: 0.25,
        color: j.clone(j.BLACK)
      }
    });
  };

  d.isEdgeDetectionSupported = function (L) {
    return L.context.depthTexture;
  };

  function o(O) {
    if (!H(O)) {
      return d.createEdgeDetectionStage();
    }

    var M = new q({
      name: "czm_edge_detection_multiple",
      stages: O,
      inputPreviousStageTexture: false
    });
    var N = {};
    var R = "";
    var Q = "";

    for (var P = 0; P < O.length; ++P) {
      R += "uniform sampler2D edgeTexture" + P + "; \n";
      Q += "        vec4 edge" + P + " = texture2D(edgeTexture" + P + ", v_textureCoordinates); \n" + "        if (edge" + P + ".a > 0.0) \n" + "        { \n" + "            color = edge" + P + "; \n" + "            break; \n" + "        } \n";
      N["edgeTexture" + P] = O[P].name;
    }

    var L = R + "varying vec2 v_textureCoordinates; \n" + "void main() { \n" + "    vec4 color = vec4(0.0); \n" + "    for (int i = 0; i < " + O.length + "; i++) \n" + "    { \n" + Q + "    } \n" + "    gl_FragColor = color; \n" + "} \n";
    var S = new s({
      name: "czm_edge_detection_combine",
      fragmentShader: L,
      uniforms: N
    });
    return new q({
      name: "czm_edge_detection_composite",
      stages: [M, S]
    });
  }

  d.createSilhouetteStage = function (M) {
    var L = o(M);
    var N = new s({
      name: "czm_silhouette_color_edges",
      fragmentShader: c,
      uniforms: {
        silhouetteTexture: L.name
      }
    });
    return new q({
      name: "czm_silhouette",
      stages: [L, N],
      inputPreviousStageTexture: false,
      uniforms: L.uniforms
    });
  };

  d.isSilhouetteSupported = function (L) {
    return L.context.depthTexture;
  };

  d.createBloomStage = function () {
    var O = new s({
      name: "czm_bloom_contrast_bias",
      fragmentShader: z,
      uniforms: {
        contrast: 128,
        brightness: -0.3
      }
    });
    var P = B("czm_bloom_blur");
    var N = new q({
      name: "czm_bloom_contrast_bias_blur",
      stages: [O, P]
    });
    var M = new s({
      name: "czm_bloom_generate_composite",
      fragmentShader: G,
      uniforms: {
        glowOnly: false,
        bloomTexture: N.name
      }
    });
    var L = {};
    u(L, {
      glowOnly: {
        get: function get() {
          return M.uniforms.glowOnly;
        },
        set: function set(Q) {
          M.uniforms.glowOnly = Q;
        }
      },
      contrast: {
        get: function get() {
          return O.uniforms.contrast;
        },
        set: function set(Q) {
          O.uniforms.contrast = Q;
        }
      },
      brightness: {
        get: function get() {
          return O.uniforms.brightness;
        },
        set: function set(Q) {
          O.uniforms.brightness = Q;
        }
      },
      delta: {
        get: function get() {
          return P.uniforms.delta;
        },
        set: function set(Q) {
          P.uniforms.delta = Q;
        }
      },
      sigma: {
        get: function get() {
          return P.uniforms.sigma;
        },
        set: function set(Q) {
          P.uniforms.sigma = Q;
        }
      },
      stepSize: {
        get: function get() {
          return P.uniforms.stepSize;
        },
        set: function set(Q) {
          P.uniforms.stepSize = Q;
        }
      }
    });
    return new q({
      name: "czm_bloom",
      stages: [N, M],
      inputPreviousStageTexture: false,
      uniforms: L
    });
  };

  d.createAmbientOcclusionStage = function () {
    var M = new s({
      name: "czm_ambient_occlusion_generate",
      fragmentShader: E,
      uniforms: {
        intensity: 3,
        bias: 0.1,
        lengthCap: 0.26,
        stepSize: 1.95,
        frustumLength: 1000,
        randomTexture: undefined
      }
    });
    var P = B("czm_ambient_occlusion_blur");
    P.uniforms.stepSize = 0.86;
    var N = new q({
      name: "czm_ambient_occlusion_generate_blur",
      stages: [M, P]
    });
    var O = new s({
      name: "czm_ambient_occlusion_composite",
      fragmentShader: i,
      uniforms: {
        ambientOcclusionOnly: false,
        ambientOcclusionTexture: N.name
      }
    });
    var L = {};
    u(L, {
      intensity: {
        get: function get() {
          return M.uniforms.intensity;
        },
        set: function set(Q) {
          M.uniforms.intensity = Q;
        }
      },
      bias: {
        get: function get() {
          return M.uniforms.bias;
        },
        set: function set(Q) {
          M.uniforms.bias = Q;
        }
      },
      lengthCap: {
        get: function get() {
          return M.uniforms.lengthCap;
        },
        set: function set(Q) {
          M.uniforms.lengthCap = Q;
        }
      },
      stepSize: {
        get: function get() {
          return M.uniforms.stepSize;
        },
        set: function set(Q) {
          M.uniforms.stepSize = Q;
        }
      },
      frustumLength: {
        get: function get() {
          return M.uniforms.frustumLength;
        },
        set: function set(Q) {
          M.uniforms.frustumLength = Q;
        }
      },
      randomTexture: {
        get: function get() {
          return M.uniforms.randomTexture;
        },
        set: function set(Q) {
          M.uniforms.randomTexture = Q;
        }
      },
      delta: {
        get: function get() {
          return P.uniforms.delta;
        },
        set: function set(Q) {
          P.uniforms.delta = Q;
        }
      },
      sigma: {
        get: function get() {
          return P.uniforms.sigma;
        },
        set: function set(Q) {
          P.uniforms.sigma = Q;
        }
      },
      blurStepSize: {
        get: function get() {
          return P.uniforms.stepSize;
        },
        set: function set(Q) {
          P.uniforms.stepSize = Q;
        }
      },
      ambientOcclusionOnly: {
        get: function get() {
          return O.uniforms.ambientOcclusionOnly;
        },
        set: function set(Q) {
          O.uniforms.ambientOcclusionOnly = Q;
        }
      }
    });
    return new q({
      name: "czm_ambient_occlusion",
      stages: [N, O],
      inputPreviousStageTexture: false,
      uniforms: L
    });
  };

  d.isAmbientOcclusionSupported = function (L) {
    return L.context.depthTexture;
  };

  var y = "#define FXAA_QUALITY_PRESET 39 \n" + K + "\n" + x;

  d.createFXAAStage = function () {
    return new s({
      name: "czm_FXAA",
      fragmentShader: y,
      sampleMode: g.LINEAR
    });
  };

  d.createAcesTonemappingStage = function (M) {
    var L = M ? "#define AUTO_EXPOSURE\n" : "";
    L += D;
    return new s({
      name: "czm_aces",
      fragmentShader: L,
      uniforms: {
        autoExposure: undefined
      }
    });
  };

  d.createFilmicTonemappingStage = function (M) {
    var L = M ? "#define AUTO_EXPOSURE\n" : "";
    L += v;
    return new s({
      name: "czm_filmic",
      fragmentShader: L,
      uniforms: {
        autoExposure: undefined
      }
    });
  };

  d.createReinhardTonemappingStage = function (M) {
    var L = M ? "#define AUTO_EXPOSURE\n" : "";
    L += f;
    return new s({
      name: "czm_reinhard",
      fragmentShader: L,
      uniforms: {
        autoExposure: undefined
      }
    });
  };

  d.createModifiedReinhardTonemappingStage = function (M) {
    var L = M ? "#define AUTO_EXPOSURE\n" : "";
    L += h;
    return new s({
      name: "czm_modified_reinhard",
      fragmentShader: L,
      uniforms: {
        white: j.WHITE,
        autoExposure: undefined
      }
    });
  };

  d.createAutoExposureStage = function () {
    return new b();
  };

  d.createBlackAndWhiteStage = function () {
    return new s({
      name: "czm_black_and_white",
      fragmentShader: C,
      uniforms: {
        gradations: 5
      }
    });
  };

  d.createBrightnessStage = function () {
    return new s({
      name: "czm_brightness",
      fragmentShader: l,
      uniforms: {
        brightness: 0.5
      }
    });
  };

  d.createNightVisionStage = function () {
    return new s({
      name: "czm_night_vision",
      fragmentShader: n
    });
  };

  d.createDepthViewStage = function () {
    return new s({
      name: "czm_depth_view",
      fragmentShader: p
    });
  };

  d.createLensFlareStage = function () {
    return new s({
      name: "czm_lens_flare",
      fragmentShader: w,
      uniforms: {
        dirtTexture: I("Assets/Textures/LensFlare/DirtMask.jpg"),
        starTexture: I("Assets/Textures/LensFlare/StarBurst.jpg"),
        intensity: 2,
        distortion: 10,
        ghostDispersal: 0.4,
        haloWidth: 0.4,
        earthRadius: A.WGS84.maximumRadius
      }
    });
  };

  d.createSnowStage = function () {
    var L = new s({
      name: "czm_snow",
      fragmentShader: J
    });
    return L;
  };

  d.createRainStage = function () {
    var L = new s({
      name: "czm_rain",
      fragmentShader: a
    });
    return L;
  };

  return d;
});