"use strict";

define(["../Core/Cartesian3", "../Core/Math", "../Core/Matrix4", "../Core/WebGLConstants"], function (e, t, n, i) {
  "use strict";

  var a = new e();

  function r(e) {
    this._size = e.size, this._datatype = e.datatype, this.getValue = e.getValue;
  }

  if ("undefined" == typeof WebGLRenderingContext) return {};
  var o = {};
  return o[i.FLOAT] = "float", o[i.FLOAT_VEC2] = "vec2", o[i.FLOAT_VEC3] = "vec3", o[i.FLOAT_VEC4] = "vec4", o[i.INT] = "int", o[i.INT_VEC2] = "ivec2", o[i.INT_VEC3] = "ivec3", o[i.INT_VEC4] = "ivec4", o[i.BOOL] = "bool", o[i.BOOL_VEC2] = "bvec2", o[i.BOOL_VEC3] = "bvec3", o[i.BOOL_VEC4] = "bvec4", o[i.FLOAT_MAT2] = "mat2", o[i.FLOAT_MAT3] = "mat3", o[i.FLOAT_MAT4] = "mat4", o[i.SAMPLER_2D] = "sampler2D", o[i.SAMPLER_CUBE] = "samplerCube", r.prototype.getDeclaration = function (e) {
    var t = "uniform " + o[this._datatype] + " " + e,
        n = this._size;
    return t += 1 === n ? ";" : "[" + n.toString() + "];";
  }, {
    czm_viewport: new r({
      size: 1,
      datatype: i.FLOAT_VEC4,
      getValue: function getValue(e) {
        return e.viewportCartesian4;
      }
    }),
    czm_viewportOrthographic: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.viewportOrthographic;
      }
    }),
    czm_viewportTransformation: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.viewportTransformation;
      }
    }),
    czm_globeDepthTexture: new r({
      size: 1,
      datatype: i.SAMPLER_2D,
      getValue: function getValue(e) {
        return e.globeDepthTexture;
      }
    }),
    czm_model: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.model;
      }
    }),
    czm_inverseModel: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.inverseModel;
      }
    }),
    czm_view: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.view;
      }
    }),
    czm_view3D: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.view3D;
      }
    }),
    czm_viewRotation: new r({
      size: 1,
      datatype: i.FLOAT_MAT3,
      getValue: function getValue(e) {
        return e.viewRotation;
      }
    }),
    czm_viewRotation3D: new r({
      size: 1,
      datatype: i.FLOAT_MAT3,
      getValue: function getValue(e) {
        return e.viewRotation3D;
      }
    }),
    czm_inverseView: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.inverseView;
      }
    }),
    czm_inverseView3D: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.inverseView3D;
      }
    }),
    czm_inverseViewRotation: new r({
      size: 1,
      datatype: i.FLOAT_MAT3,
      getValue: function getValue(e) {
        return e.inverseViewRotation;
      }
    }),
    czm_inverseViewRotation3D: new r({
      size: 1,
      datatype: i.FLOAT_MAT3,
      getValue: function getValue(e) {
        return e.inverseViewRotation3D;
      }
    }),
    czm_projection: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.projection;
      }
    }),
    czm_inverseProjection: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.inverseProjection;
      }
    }),
    czm_infiniteProjection: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.infiniteProjection;
      }
    }),
    czm_modelView: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.modelView;
      }
    }),
    czm_modelView3D: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.modelView3D;
      }
    }),
    czm_modelViewRelativeToEye: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.modelViewRelativeToEye;
      }
    }),
    czm_inverseModelView: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.inverseModelView;
      }
    }),
    czm_inverseModelView3D: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.inverseModelView3D;
      }
    }),
    czm_viewProjection: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.viewProjection;
      }
    }),
    czm_inverseViewProjection: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.inverseViewProjection;
      }
    }),
    czm_modelViewProjection: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.modelViewProjection;
      }
    }),
    czm_inverseModelViewProjection: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.inverseModelViewProjection;
      }
    }),
    czm_modelViewProjectionRelativeToEye: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.modelViewProjectionRelativeToEye;
      }
    }),
    czm_modelViewInfiniteProjection: new r({
      size: 1,
      datatype: i.FLOAT_MAT4,
      getValue: function getValue(e) {
        return e.modelViewInfiniteProjection;
      }
    }),
    czm_orthographicIn3D: new r({
      size: 1,
      datatype: i.FLOAT,
      getValue: function getValue(e) {
        return e.orthographicIn3D ? 1 : 0;
      }
    }),
    czm_normal: new r({
      size: 1,
      datatype: i.FLOAT_MAT3,
      getValue: function getValue(e) {
        return e.normal;
      }
    }),
    czm_normal3D: new r({
      size: 1,
      datatype: i.FLOAT_MAT3,
      getValue: function getValue(e) {
        return e.normal3D;
      }
    }),
    czm_inverseNormal: new r({
      size: 1,
      datatype: i.FLOAT_MAT3,
      getValue: function getValue(e) {
        return e.inverseNormal;
      }
    }),
    czm_inverseNormal3D: new r({
      size: 1,
      datatype: i.FLOAT_MAT3,
      getValue: function getValue(e) {
        return e.inverseNormal3D;
      }
    }),
    czm_eyeHeight2D: new r({
      size: 1,
      datatype: i.FLOAT_VEC2,
      getValue: function getValue(e) {
        return e.eyeHeight2D;
      }
    }),
    czm_entireFrustum: new r({
      size: 1,
      datatype: i.FLOAT_VEC2,
      getValue: function getValue(e) {
        return e.entireFrustum;
      }
    }),
    czm_currentFrustum: new r({
      size: 1,
      datatype: i.FLOAT_VEC2,
      getValue: function getValue(e) {
        return e.currentFrustum;
      }
    }),
    czm_frustumPlanes: new r({
      size: 1,
      datatype: i.FLOAT_VEC4,
      getValue: function getValue(e) {
        return e.frustumPlanes;
      }
    }),
    czm_log2FarDistance: new r({
      size: 1,
      datatype: i.FLOAT,
      getValue: function getValue(e) {
        return e.log2FarDistance;
      }
    }),
    czm_log2FarPlusOne: new r({
      size: 1,
      datatype: i.FLOAT,
      getValue: function getValue(e) {
        return e.log2FarPlusOne;
      }
    }),
    czm_log2NearDistance: new r({
      size: 1,
      datatype: i.FLOAT,
      getValue: function getValue(e) {
        return e.log2NearDistance;
      }
    }),
    czm_sunPositionWC: new r({
      size: 1,
      datatype: i.FLOAT_VEC3,
      getValue: function getValue(e) {
        return e.sunPositionWC;
      }
    }),
    czm_sunPositionColumbusView: new r({
      size: 1,
      datatype: i.FLOAT_VEC3,
      getValue: function getValue(e) {
        return e.sunPositionColumbusView;
      }
    }),
    czm_sunDirectionEC: new r({
      size: 1,
      datatype: i.FLOAT_VEC3,
      getValue: function getValue(e) {
        return e.sunDirectionEC;
      }
    }),
    czm_sunDirectionWC: new r({
      size: 1,
      datatype: i.FLOAT_VEC3,
      getValue: function getValue(e) {
        return e.sunDirectionWC;
      }
    }),
    czm_moonDirectionEC: new r({
      size: 1,
      datatype: i.FLOAT_VEC3,
      getValue: function getValue(e) {
        return e.moonDirectionEC;
      }
    }),
    czm_encodedCameraPositionMCHigh: new r({
      size: 1,
      datatype: i.FLOAT_VEC3,
      getValue: function getValue(e) {
        return e.encodedCameraPositionMCHigh;
      }
    }),
    czm_encodedCameraPositionMCLow: new r({
      size: 1,
      datatype: i.FLOAT_VEC3,
      getValue: function getValue(e) {
        return e.encodedCameraPositionMCLow;
      }
    }),
    czm_viewerPositionWC: new r({
      size: 1,
      datatype: i.FLOAT_VEC3,
      getValue: function getValue(e) {
        return n.getTranslation(e.inverseView, a);
      }
    }),
    czm_frameNumber: new r({
      size: 1,
      datatype: i.FLOAT,
      getValue: function getValue(e) {
        return e.frameState.frameNumber;
      }
    }),
    czm_morphTime: new r({
      size: 1,
      datatype: i.FLOAT,
      getValue: function getValue(e) {
        return e.frameState.morphTime;
      }
    }),
    czm_sceneMode: new r({
      size: 1,
      datatype: i.FLOAT,
      getValue: function getValue(e) {
        return e.frameState.mode;
      }
    }),
    czm_pass: new r({
      size: 1,
      datatype: i.FLOAT,
      getValue: function getValue(e) {
        return e.pass;
      }
    }),
    czm_backgroundColor: new r({
      size: 1,
      datatype: i.FLOAT_VEC4,
      getValue: function getValue(e) {
        return e.backgroundColor;
      }
    }),
    czm_brdfLut: new r({
      size: 1,
      datatype: i.SAMPLER_2D,
      getValue: function getValue(e) {
        return e.brdfLut;
      }
    }),
    czm_environmentMap: new r({
      size: 1,
      datatype: i.SAMPLER_CUBE,
      getValue: function getValue(e) {
        return e.environmentMap;
      }
    }),
    czm_specularEnvironmentMaps: new r({
      size: 1,
      datatype: i.SAMPLER_2D,
      getValue: function getValue(e) {
        return e.specularEnvironmentMaps;
      }
    }),
    czm_specularEnvironmentMapSize: new r({
      size: 1,
      datatype: i.FLOAT_VEC2,
      getValue: function getValue(e) {
        return e.specularEnvironmentMapsDimensions;
      }
    }),
    czm_specularEnvironmentMapsMaximumLOD: new r({
      size: 1,
      datatype: i.FLOAT,
      getValue: function getValue(e) {
        return e.specularEnvironmentMapsMaximumLOD;
      }
    }),
    czm_sphericalHarmonicCoefficients: new r({
      size: 9,
      datatype: i.FLOAT_VEC3,
      getValue: function getValue(e) {
        return e.sphericalHarmonicCoefficients;
      }
    }),
    czm_temeToPseudoFixed: new r({
      size: 1,
      datatype: i.FLOAT_MAT3,
      getValue: function getValue(e) {
        return e.temeToPseudoFixedMatrix;
      }
    }),
    czm_resolutionScale: new r({
      size: 1,
      datatype: i.FLOAT,
      getValue: function getValue(e) {
        return e.resolutionScale;
      }
    }),
    czm_fogDensity: new r({
      size: 1,
      datatype: i.FLOAT,
      getValue: function getValue(e) {
        return e.fogDensity;
      }
    }),
    czm_imagerySplitPosition: new r({
      size: 1,
      datatype: i.FLOAT,
      getValue: function getValue(e) {
        return e.imagerySplitPosition;
      }
    }),
    czm_geometricToleranceOverMeter: new r({
      size: 1,
      datatype: i.FLOAT,
      getValue: function getValue(e) {
        return e.geometricToleranceOverMeter;
      }
    }),
    czm_minimumDisableDepthTestDistance: new r({
      size: 1,
      datatype: i.FLOAT,
      getValue: function getValue(e) {
        return e.minimumDisableDepthTestDistance;
      }
    }),
    czm_invertClassificationColor: new r({
      size: 1,
      datatype: i.FLOAT_VEC4,
      getValue: function getValue(e) {
        return e.invertClassificationColor;
      }
    }),
    czm_gamma: new r({
      size: 1,
      datatype: i.FLOAT,
      getValue: function getValue(e) {
        return e.gamma;
      }
    }),
    czm_sunColor: new r({
      size: 1,
      datatype: i.FLOAT_VEC3,
      getValue: function getValue(e) {
        return e.sunColor;
      }
    })
  };
});