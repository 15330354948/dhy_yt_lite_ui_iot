"use strict";

define(["../Core/BoundingRectangle", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Cartographic", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/EncodedCartesian3", "../Core/Math", "../Core/Matrix3", "../Core/Matrix4", "../Core/OrthographicFrustum", "../Core/Simon1994PlanetaryPositions", "../Core/Transforms", "../Scene/SceneMode", "./Sampler"], function (o, _, w, e, i, h, c, d, t, n, y, l, f, a, u, p, g, r) {
  "use strict";

  function s() {
    this.globeDepthTexture = void 0, this.gamma = void 0, this._viewport = new o(), this._viewportCartesian4 = new e(), this._viewportDirty = !1, this._viewportOrthographicMatrix = f.clone(f.IDENTITY), this._viewportTransformation = f.clone(f.IDENTITY), this._model = f.clone(f.IDENTITY), this._view = f.clone(f.IDENTITY), this._inverseView = f.clone(f.IDENTITY), this._projection = f.clone(f.IDENTITY), this._infiniteProjection = f.clone(f.IDENTITY), this._entireFrustum = new _(), this._currentFrustum = new _(), this._frustumPlanes = new e(), this._log2FarDistance = void 0, this._log2FarPlusOne = void 0, this._log2NearDistance = void 0, this._frameState = void 0, this._temeToPseudoFixed = l.clone(f.IDENTITY), this._view3DDirty = !0, this._view3D = new f(), this._inverseView3DDirty = !0, this._inverseView3D = new f(), this._inverseModelDirty = !0, this._inverseModel = new f(), this._inverseTransposeModelDirty = !0, this._inverseTransposeModel = new l(), this._viewRotation = new l(), this._inverseViewRotation = new l(), this._viewRotation3D = new l(), this._inverseViewRotation3D = new l(), this._inverseProjectionDirty = !0, this._inverseProjection = new f(), this._modelViewDirty = !0, this._modelView = new f(), this._modelView3DDirty = !0, this._modelView3D = new f(), this._modelViewRelativeToEyeDirty = !0, this._modelViewRelativeToEye = new f(), this._inverseModelViewDirty = !0, this._inverseModelView = new f(), this._inverseModelView3DDirty = !0, this._inverseModelView3D = new f(), this._viewProjectionDirty = !0, this._viewProjection = new f(), this._inverseViewProjectionDirty = !0, this._inverseViewProjection = new f(), this._modelViewProjectionDirty = !0, this._modelViewProjection = new f(), this._inverseModelViewProjectionDirty = !0, this._inverseModelViewProjection = new f(), this._modelViewProjectionRelativeToEyeDirty = !0, this._modelViewProjectionRelativeToEye = new f(), this._modelViewInfiniteProjectionDirty = !0, this._modelViewInfiniteProjection = new f(), this._normalDirty = !0, this._normal = new l(), this._normal3DDirty = !0, this._normal3D = new l(), this._inverseNormalDirty = !0, this._inverseNormal = new l(), this._inverseNormal3DDirty = !0, this._inverseNormal3D = new l(), this._encodedCameraPositionMCDirty = !0, this._encodedCameraPositionMC = new n(), this._cameraPosition = new w(), this._sunPositionWC = new w(), this._sunPositionColumbusView = new w(), this._sunDirectionWC = new w(), this._sunDirectionEC = new w(), this._sunColor = new w(), this._moonDirectionEC = new w(), this._pass = void 0, this._mode = void 0, this._mapProjection = void 0, this._cameraDirection = new w(), this._cameraRight = new w(), this._cameraUp = new w(), this._frustum2DWidth = 0, this._eyeHeight2D = new _(), this._resolutionScale = 1, this._orthographicIn3D = !1, this._backgroundColor = new h(), this._brdfLut = void 0, this._environmentMap = void 0, this._sphericalHarmonicCoefficients = void 0, this._specularEnvironmentMaps = void 0, this._specularEnvironmentMapsDimensions = new _(), this._specularEnvironmentMapsMaximumLOD = void 0, this._fogDensity = void 0, this._invertClassificationColor = void 0, this._imagerySplitPosition = 0, this._pixelSizePerMeter = void 0, this._geometricToleranceOverMeter = void 0, this._minimumDisableDepthTestDistance = void 0;
  }

  t(s.prototype, {
    frameState: {
      get: function get() {
        return this._frameState;
      }
    },
    viewport: {
      get: function get() {
        return this._viewport;
      },
      set: function set(e) {
        var i, t;
        o.equals(e, this._viewport) || (o.clone(e, this._viewport), i = this._viewport, (t = this._viewportCartesian4).x = i.x, t.y = i.y, t.z = i.width, t.w = i.height, this._viewportDirty = !0);
      }
    },
    viewportCartesian4: {
      get: function get() {
        return this._viewportCartesian4;
      }
    },
    viewportOrthographic: {
      get: function get() {
        return P(this), this._viewportOrthographicMatrix;
      }
    },
    viewportTransformation: {
      get: function get() {
        return P(this), this._viewportTransformation;
      }
    },
    model: {
      get: function get() {
        return this._model;
      },
      set: function set(e) {
        f.clone(e, this._model), this._modelView3DDirty = !0, this._inverseModelView3DDirty = !0, this._inverseModelDirty = !0, this._inverseTransposeModelDirty = !0, this._modelViewDirty = !0, this._inverseModelViewDirty = !0, this._modelViewRelativeToEyeDirty = !0, this._inverseModelViewDirty = !0, this._modelViewProjectionDirty = !0, this._inverseModelViewProjectionDirty = !0, this._modelViewProjectionRelativeToEyeDirty = !0, this._modelViewInfiniteProjectionDirty = !0, this._normalDirty = !0, this._inverseNormalDirty = !0, this._normal3DDirty = !0, this._inverseNormal3DDirty = !0, this._encodedCameraPositionMCDirty = !0;
      }
    },
    inverseModel: {
      get: function get() {
        return this._inverseModelDirty && (this._inverseModelDirty = !1, f.inverse(this._model, this._inverseModel)), this._inverseModel;
      }
    },
    inverseTransposeModel: {
      get: function get() {
        var e = this._inverseTransposeModel;
        return this._inverseTransposeModelDirty && (this._inverseTransposeModelDirty = !1, f.getRotation(this.inverseModel, e), l.transpose(e, e)), e;
      }
    },
    view: {
      get: function get() {
        return this._view;
      }
    },
    view3D: {
      get: function get() {
        return N(this), this._view3D;
      }
    },
    viewRotation: {
      get: function get() {
        return N(this), this._viewRotation;
      }
    },
    viewRotation3D: {
      get: function get() {
        return N(this), this._viewRotation3D;
      }
    },
    inverseView: {
      get: function get() {
        return this._inverseView;
      }
    },
    inverseView3D: {
      get: function get() {
        return F(this), this._inverseView3D;
      }
    },
    inverseViewRotation: {
      get: function get() {
        return this._inverseViewRotation;
      }
    },
    inverseViewRotation3D: {
      get: function get() {
        return F(this), this._inverseViewRotation3D;
      }
    },
    projection: {
      get: function get() {
        return this._projection;
      }
    },
    inverseProjection: {
      get: function get() {
        var e;
        return (e = this)._inverseProjectionDirty && (e._inverseProjectionDirty = !1, e._mode === g.SCENE2D || e._mode === g.MORPHING || e._orthographicIn3D ? f.clone(f.ZERO, e._inverseProjection) : f.inverse(e._projection, e._inverseProjection)), this._inverseProjection;
      }
    },
    infiniteProjection: {
      get: function get() {
        return this._infiniteProjection;
      }
    },
    modelView: {
      get: function get() {
        var e;
        return (e = this)._modelViewDirty && (e._modelViewDirty = !1, f.multiplyTransformation(e._view, e._model, e._modelView)), this._modelView;
      }
    },
    modelView3D: {
      get: function get() {
        var e;
        return (e = this)._modelView3DDirty && (e._modelView3DDirty = !1, f.multiplyTransformation(e.view3D, e._model, e._modelView3D)), this._modelView3D;
      }
    },
    modelViewRelativeToEye: {
      get: function get() {
        return function (e) {
          {
            var i, t;
            e._modelViewRelativeToEyeDirty && (e._modelViewRelativeToEyeDirty = !1, i = e.modelView, (t = e._modelViewRelativeToEye)[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t[4] = i[4], t[5] = i[5], t[6] = i[6], t[7] = i[7], t[8] = i[8], t[9] = i[9], t[10] = i[10], t[11] = i[11], t[12] = 0, t[13] = 0, t[14] = 0, t[15] = i[15]);
          }
        }(this), this._modelViewRelativeToEye;
      }
    },
    inverseModelView: {
      get: function get() {
        var e;
        return (e = this)._inverseModelViewDirty && (e._inverseModelViewDirty = !1, f.inverse(e.modelView, e._inverseModelView)), this._inverseModelView;
      }
    },
    inverseModelView3D: {
      get: function get() {
        var e;
        return (e = this)._inverseModelView3DDirty && (e._inverseModelView3DDirty = !1, f.inverse(e.modelView3D, e._inverseModelView3D)), this._inverseModelView3D;
      }
    },
    viewProjection: {
      get: function get() {
        var e;
        return (e = this)._viewProjectionDirty && (e._viewProjectionDirty = !1, f.multiply(e._projection, e._view, e._viewProjection)), this._viewProjection;
      }
    },
    inverseViewProjection: {
      get: function get() {
        var e;
        return (e = this)._inverseViewProjectionDirty && (e._inverseViewProjectionDirty = !1, f.inverse(e.viewProjection, e._inverseViewProjection)), this._inverseViewProjection;
      }
    },
    modelViewProjection: {
      get: function get() {
        var e;
        return (e = this)._modelViewProjectionDirty && (e._modelViewProjectionDirty = !1, f.multiply(e._projection, e.modelView, e._modelViewProjection)), this._modelViewProjection;
      }
    },
    inverseModelViewProjection: {
      get: function get() {
        var e;
        return (e = this)._inverseModelViewProjectionDirty && (e._inverseModelViewProjectionDirty = !1, f.inverse(e.modelViewProjection, e._inverseModelViewProjection)), this._inverseModelViewProjection;
      }
    },
    modelViewProjectionRelativeToEye: {
      get: function get() {
        var e;
        return (e = this)._modelViewProjectionRelativeToEyeDirty && (e._modelViewProjectionRelativeToEyeDirty = !1, f.multiply(e._projection, e.modelViewRelativeToEye, e._modelViewProjectionRelativeToEye)), this._modelViewProjectionRelativeToEye;
      }
    },
    modelViewInfiniteProjection: {
      get: function get() {
        var e;
        return (e = this)._modelViewInfiniteProjectionDirty && (e._modelViewInfiniteProjectionDirty = !1, f.multiply(e._infiniteProjection, e.modelView, e._modelViewInfiniteProjection)), this._modelViewInfiniteProjection;
      }
    },
    normal: {
      get: function get() {
        return function (e) {
          {
            var i;
            e._normalDirty && (e._normalDirty = !1, i = e._normal, f.getRotation(e.inverseModelView, i), l.transpose(i, i));
          }
        }(this), this._normal;
      }
    },
    normal3D: {
      get: function get() {
        return function (e) {
          {
            var i;
            e._normal3DDirty && (e._normal3DDirty = !1, i = e._normal3D, f.getRotation(e.inverseModelView3D, i), l.transpose(i, i));
          }
        }(this), this._normal3D;
      }
    },
    inverseNormal: {
      get: function get() {
        var e;
        return (e = this)._inverseNormalDirty && (e._inverseNormalDirty = !1, f.getRotation(e.inverseModelView, e._inverseNormal)), this._inverseNormal;
      }
    },
    inverseNormal3D: {
      get: function get() {
        var e;
        return (e = this)._inverseNormal3DDirty && (e._inverseNormal3DDirty = !1, f.getRotation(e.inverseModelView3D, e._inverseNormal3D)), this._inverseNormal3D;
      }
    },
    entireFrustum: {
      get: function get() {
        return this._entireFrustum;
      }
    },
    currentFrustum: {
      get: function get() {
        return this._currentFrustum;
      }
    },
    frustumPlanes: {
      get: function get() {
        return this._frustumPlanes;
      }
    },
    log2FarDistance: {
      get: function get() {
        return this._log2FarDistance;
      }
    },
    log2FarPlusOne: {
      get: function get() {
        return this._log2FarPlusOne;
      }
    },
    log2NearDistance: {
      get: function get() {
        return this._log2NearDistance;
      }
    },
    eyeHeight2D: {
      get: function get() {
        return this._eyeHeight2D;
      }
    },
    sunPositionWC: {
      get: function get() {
        return this._sunPositionWC;
      }
    },
    sunPositionColumbusView: {
      get: function get() {
        return this._sunPositionColumbusView;
      }
    },
    sunDirectionWC: {
      get: function get() {
        return this._sunDirectionWC;
      }
    },
    sunDirectionEC: {
      get: function get() {
        return this._sunDirectionEC;
      }
    },
    sunColor: {
      get: function get() {
        return this._sunColor;
      }
    },
    moonDirectionEC: {
      get: function get() {
        return this._moonDirectionEC;
      }
    },
    encodedCameraPositionMCHigh: {
      get: function get() {
        return C(this), this._encodedCameraPositionMC.high;
      }
    },
    encodedCameraPositionMCLow: {
      get: function get() {
        return C(this), this._encodedCameraPositionMC.low;
      }
    },
    temeToPseudoFixedMatrix: {
      get: function get() {
        return this._temeToPseudoFixed;
      }
    },
    resolutionScale: {
      get: function get() {
        return this._resolutionScale;
      }
    },
    fogDensity: {
      get: function get() {
        return this._fogDensity;
      }
    },
    geometricToleranceOverMeter: {
      get: function get() {
        return this._geometricToleranceOverMeter;
      }
    },
    pass: {
      get: function get() {
        return this._pass;
      }
    },
    backgroundColor: {
      get: function get() {
        return this._backgroundColor;
      }
    },
    brdfLut: {
      get: function get() {
        return this._brdfLut;
      }
    },
    environmentMap: {
      get: function get() {
        return this._environmentMap;
      }
    },
    sphericalHarmonicCoefficients: {
      get: function get() {
        return this._sphericalHarmonicCoefficients;
      }
    },
    specularEnvironmentMaps: {
      get: function get() {
        return this._specularEnvironmentMaps;
      }
    },
    specularEnvironmentMapsDimensions: {
      get: function get() {
        return this._specularEnvironmentMapsDimensions;
      }
    },
    specularEnvironmentMapsMaximumLOD: {
      get: function get() {
        return this._specularEnvironmentMapsMaximumLOD;
      }
    },
    imagerySplitPosition: {
      get: function get() {
        return this._imagerySplitPosition;
      }
    },
    minimumDisableDepthTestDistance: {
      get: function get() {
        return this._minimumDisableDepthTestDistance;
      }
    },
    invertClassificationColor: {
      get: function get() {
        return this._invertClassificationColor;
      }
    },
    orthographicIn3D: {
      get: function get() {
        return this._orthographicIn3D;
      }
    }
  });
  var m = new l(),
      v = new i();
  s.prototype.updateCamera = function (e) {
    var i, t, o, n, r, s;
    i = this, t = e.viewMatrix, f.clone(t, i._view), f.getRotation(t, i._viewRotation), i._view3DDirty = !0, i._inverseView3DDirty = !0, i._modelViewDirty = !0, i._modelView3DDirty = !0, i._modelViewRelativeToEyeDirty = !0, i._inverseModelViewDirty = !0, i._inverseModelView3DDirty = !0, i._viewProjectionDirty = !0, i._inverseViewProjectionDirty = !0, i._modelViewProjectionDirty = !0, i._modelViewProjectionRelativeToEyeDirty = !0, i._modelViewInfiniteProjectionDirty = !0, i._normalDirty = !0, i._inverseNormalDirty = !0, i._normal3DDirty = !0, i._inverseNormal3DDirty = !0, o = this, n = e.inverseViewMatrix, f.clone(n, o._inverseView), f.getRotation(n, o._inverseViewRotation), r = this, s = e, w.clone(s.positionWC, r._cameraPosition), w.clone(s.directionWC, r._cameraDirection), w.clone(s.rightWC, r._cameraRight), w.clone(s.upWC, r._cameraUp), r._encodedCameraPositionMCDirty = !0, this._entireFrustum.x = e.frustum.near, this._entireFrustum.y = e.frustum.far, this.updateFrustum(e.frustum), this._orthographicIn3D = this._mode !== g.SCENE2D && e.frustum instanceof a;
  }, s.prototype.updateFrustum = function (e) {
    var i, t, o, n;
    i = this, t = e.projectionMatrix, f.clone(t, i._projection), i._inverseProjectionDirty = !0, i._viewProjectionDirty = !0, i._inverseViewProjectionDirty = !0, i._modelViewProjectionDirty = !0, i._modelViewProjectionRelativeToEyeDirty = !0, d(e.infiniteProjectionMatrix) && (o = this, n = e.infiniteProjectionMatrix, f.clone(n, o._infiniteProjection), o._modelViewInfiniteProjectionDirty = !0), this._currentFrustum.x = e.near, this._currentFrustum.y = e.far, this._log2FarDistance = 2 / y.log2(e.far + 1), this._log2FarPlusOne = y.log2(e.far + 1), this._log2NearDistance = y.log2(e.near), d(e._offCenterFrustum) && (e = e._offCenterFrustum), this._frustumPlanes.x = e.top, this._frustumPlanes.y = e.bottom, this._frustumPlanes.z = e.left, this._frustumPlanes.w = e.right;
  }, s.prototype.updatePass = function (e) {
    this._pass = e;
  };
  var D = [];

  function P(e) {
    var i;
    e._viewportDirty && (i = e._viewport, f.computeOrthographicOffCenter(i.x, i.x + i.width, i.y, i.y + i.height, 0, 1, e._viewportOrthographicMatrix), f.computeViewportTransformation(i, 0, 1, e._viewportTransformation), e._viewportDirty = !1);
  }

  s.prototype.update = function (e) {
    this._mode = e.mode, this._mapProjection = e.mapProjection;
    var i = e.context._canvas;
    this._resolutionScale = i.width / i.clientWidth;
    var t = e.camera;
    this.updateCamera(t), e.mode === g.SCENE2D ? (this._frustum2DWidth = t.frustum.right - t.frustum.left, this._eyeHeight2D.x = .5 * this._frustum2DWidth, this._eyeHeight2D.y = this._eyeHeight2D.x * this._eyeHeight2D.x) : (this._frustum2DWidth = 0, this._eyeHeight2D.x = 0, this._eyeHeight2D.y = 0), function (e, i) {
      d(p.computeIcrfToFixedMatrix(i.time, m)) || (m = p.computeTemeToPseudoFixedMatrix(i.time, m));
      var t = u.computeSunPositionInEarthInertialFrame(i.time, e._sunPositionWC);
      l.multiplyByVector(m, t, t), w.normalize(t, e._sunDirectionWC), t = l.multiplyByVector(e.viewRotation3D, t, e._sunDirectionEC), w.normalize(t, t), t = u.computeMoonPositionInEarthInertialFrame(i.time, e._moonDirectionEC), l.multiplyByVector(m, t, t), l.multiplyByVector(e.viewRotation3D, t, t), w.normalize(t, t);
      var o = i.mapProjection,
          n = o.ellipsoid.cartesianToCartographic(e._sunPositionWC, v);
      o.project(n, e._sunPositionColumbusView);
    }(this, e), this._sunColor = w.clone(e.sunColor, this._sunColor);
    var o = e.brdfLutGenerator,
        n = d(o) ? o.colorTexture : void 0;
    this._brdfLut = n, this._environmentMap = c(e.environmentMap, e.context.defaultCubeMap), this._sphericalHarmonicCoefficients = c(e.sphericalHarmonicCoefficients, D), this._specularEnvironmentMaps = e.specularEnvironmentMaps, this._specularEnvironmentMapsMaximumLOD = e.specularEnvironmentMapsMaximumLOD, d(this._specularEnvironmentMaps) && _.clone(this._specularEnvironmentMaps.dimensions, this._specularEnvironmentMapsDimensions), this._fogDensity = e.fog.density, this._invertClassificationColor = e.invertClassificationColor, this._frameState = e, this._temeToPseudoFixed = p.computeTemeToPseudoFixedMatrix(e.time, this._temeToPseudoFixed), this._imagerySplitPosition = e.imagerySplitPosition * e.context.drawingBufferWidth;
    var r = t.frustum.fov,
        s = this._viewport,
        a = s.height > s.width ? 2 * Math.tan(.5 * r) / s.height : 2 * Math.tan(.5 * r) / s.width;
    this._geometricToleranceOverMeter = a * e.maximumScreenSpaceError, h.clone(e.backgroundColor, this._backgroundColor), this._minimumDisableDepthTestDistance = e.minimumDisableDepthTestDistance, this._minimumDisableDepthTestDistance *= this._minimumDisableDepthTestDistance, this._minimumDisableDepthTestDistance === Number.POSITIVE_INFINITY && (this._minimumDisableDepthTestDistance = -1);
  };

  var V = new w();

  function C(e) {
    e._encodedCameraPositionMCDirty && (e._encodedCameraPositionMCDirty = !1, f.multiplyByPoint(e.inverseModel, e._cameraPosition, V), n.fromCartesian(V, e._encodedCameraPositionMC));
  }

  var M = new w(),
      j = new w(),
      T = new w(),
      E = new w(),
      x = new i(),
      R = new w(),
      I = new f();

  function N(e) {
    e._view3DDirty && (e._mode === g.SCENE3D ? f.clone(e._view, e._view3D) : function (e, i, t, o, n, r, s, a) {
      var _ = M;
      _.x = e.y, _.y = e.z, _.z = e.x;
      var h = j;
      h.x = t.y, h.y = t.z, h.z = t.x;
      var c = T;
      c.x = o.y, c.y = o.z, c.z = o.x;
      var l = E;
      l.x = i.y, l.y = i.z, l.z = i.x, r === g.SCENE2D && (_.z = .5 * n);
      var u = s.unproject(_, x);
      u.longitude = y.clamp(u.longitude, -Math.PI, Math.PI), u.latitude = y.clamp(u.latitude, -y.PI_OVER_TWO, y.PI_OVER_TWO);
      var m = s.ellipsoid,
          v = m.cartographicToCartesian(u, R),
          D = p.eastNorthUpToFixedFrame(v, m, I);
      f.multiplyByPointAsVector(D, h, h), f.multiplyByPointAsVector(D, c, c), f.multiplyByPointAsVector(D, l, l), d(a) || (a = new f()), a[0] = h.x, a[1] = c.x, a[2] = -l.x, a[3] = 0, a[4] = h.y, a[5] = c.y, a[6] = -l.y, a[7] = 0, a[8] = h.z, a[9] = c.z, a[10] = -l.z, a[11] = 0, a[12] = -w.dot(h, v), a[13] = -w.dot(c, v), a[14] = w.dot(l, v), a[15] = 1;
    }(e._cameraPosition, e._cameraDirection, e._cameraRight, e._cameraUp, e._frustum2DWidth, e._mode, e._mapProjection, e._view3D), f.getRotation(e._view3D, e._viewRotation3D), e._view3DDirty = !1);
  }

  function F(e) {
    e._inverseView3DDirty && (f.inverseTransformation(e.view3D, e._inverseView3D), f.getRotation(e._inverseView3D, e._inverseViewRotation3D), e._inverseView3DDirty = !1);
  }

  return s;
});