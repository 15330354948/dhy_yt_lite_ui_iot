"use strict";

define(["./SceneMode"], function (e) {
  "use strict";

  return function (i, s, t) {
    this.context = i, this.commandList = [], this.shadowMaps = [], this.brdfLutGenerator = void 0, this.environmentMap = void 0, this.sphericalHarmonicCoefficients = void 0, this.specularEnvironmentMaps = void 0, this.specularEnvironmentMapsMaximumLOD = void 0, this.mode = e.SCENE3D, this.morphTime = e.getMorphTime(e.SCENE3D), this.frameNumber = 0, this.newFrame = !1, this.time = void 0, this.jobScheduler = t, this.mapProjection = void 0, this.camera = void 0, this.cullingVolume = void 0, this.occluder = void 0, this.maximumScreenSpaceError = void 0, this.passes = {
      render: !1,
      pick: !1,
      depth: !1,
      postProcess: !1,
      offscreen: !1
    }, this.creditDisplay = s, this.afterRender = [], this.scene3DOnly = !1, this.fog = {
      enabled: !1,
      density: void 0,
      sse: void 0,
      minimumBrightness: void 0
    }, this.terrainExaggeration = 1, this.shadowState = {
      shadowsEnabled: !0,
      lightShadowsEnabled: !0,
      shadowMaps: [],
      lightShadowMaps: [],
      nearPlane: 1,
      farPlane: 5e3,
      closestObjectSize: 1e3,
      lastDirtyTime: 0,
      outOfView: !0
    }, this.imagerySplitPosition = 0, this.frustumSplits = [], this.backgroundColor = void 0, this.sunColor = void 0, this.minimumDisableDepthTestDistance = void 0, this.invertClassification = !1, this.invertClassificationColor = void 0, this.useLogDepth = !1, this.tilesetPassState = void 0;
  };
});