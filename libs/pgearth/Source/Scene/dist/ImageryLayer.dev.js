"use strict";

define(["../Core/Cartesian2", "../Core/Cartesian4", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/FeatureDetection", "../Core/GeographicProjection", "../Core/GeographicTilingScheme", "../Core/IndexDatatype", "../Core/Math", "../Core/PixelFormat", "../Core/Rectangle", "../Core/Request", "../Core/RequestState", "../Core/RequestType", "../Core/TerrainProvider", "../Core/TileProviderError", "../Core/WebMercatorProjection", "../Core/WebMercatorTilingScheme", "../Renderer/Buffer", "../Renderer/BufferUsage", "../Renderer/ComputeCommand", "../Renderer/ContextLimits", "../Renderer/MipmapHint", "../Renderer/Sampler", "../Renderer/ShaderProgram", "../Renderer/ShaderSource", "../Renderer/Texture", "../Renderer/TextureMagnificationFilter", "../Renderer/TextureMinificationFilter", "../Renderer/TextureWrap", "../Renderer/VertexArray", "../Shaders/ReprojectWebMercatorFS", "../Shaders/ReprojectWebMercatorVS", "../ThirdParty/when", "./Imagery", "./ImagerySplitDirection", "./ImageryState", "./TileImagery"], function (z, x, n, R, D, C, U, i, L, h, c, P, e, p, Z, s, Q, m, l, w, g, T, I, f, E, u, N, j, Y, o, J, M, a, k, W, O, H, X, b, q, r) {
  function v(ab, aa) {
    this._imageryProvider = ab;
    aa = n(aa, {});
    this.alpha = n(aa.alpha, n(ab.defaultAlpha, 1));
    this.brightness = n(aa.brightness, n(ab.defaultBrightness, v.DEFAULT_BRIGHTNESS));
    this.contrast = n(aa.contrast, n(ab.defaultContrast, v.DEFAULT_CONTRAST));
    this.hue = n(aa.hue, n(ab.defaultHue, v.DEFAULT_HUE));
    this.saturation = n(aa.saturation, n(ab.defaultSaturation, v.DEFAULT_SATURATION));
    this.gamma = n(aa.gamma, n(ab.defaultGamma, v.DEFAULT_GAMMA));
    this.splitDirection = n(aa.splitDirection, n(ab.defaultSplit, v.DEFAULT_SPLIT));
    this.minificationFilter = n(aa.minificationFilter, n(ab.defaultMinificationFilter, v.DEFAULT_MINIFICATION_FILTER));
    this.magnificationFilter = n(aa.magnificationFilter, n(ab.defaultMagnificationFilter, v.DEFAULT_MAGNIFICATION_FILTER));
    this.show = n(aa.show, true);
    this._minimumTerrainLevel = aa.minimumTerrainLevel;
    this._maximumTerrainLevel = aa.maximumTerrainLevel;
    this._rectangle = n(aa.rectangle, p.MAX_VALUE);
    this._maximumAnisotropy = aa.maximumAnisotropy;
    this._imageryCache = {};
    this._skeletonPlaceholder = new r(X.createPlaceholder(this));
    this._show = true;
    this._layerIndex = -1;
    this._isBaseLayer = false;
    this._requestImageError = undefined;
    this._reprojectComputeCommands = [];
    this.cutoutRectangle = aa.cutoutRectangle;
    this.colorToAlpha = aa.colorToAlpha;
    this.colorToAlphaThreshold = n(aa.colorToAlphaThreshold, v.DEFAULT_APPLY_COLOR_TO_ALPHA_THRESHOLD);
  }

  D(v.prototype, {
    imageryProvider: {
      get: function get() {
        return this._imageryProvider;
      }
    },
    rectangle: {
      get: function get() {
        return this._rectangle;
      }
    }
  });
  v.DEFAULT_BRIGHTNESS = 1;
  v.DEFAULT_CONTRAST = 1;
  v.DEFAULT_HUE = 0;
  v.DEFAULT_SATURATION = 1;
  v.DEFAULT_GAMMA = 1;
  v.DEFAULT_SPLIT = b.NONE;
  v.DEFAULT_MINIFICATION_FILTER = M.LINEAR;
  v.DEFAULT_MAGNIFICATION_FILTER = J.LINEAR;
  v.DEFAULT_APPLY_COLOR_TO_ALPHA_THRESHOLD = 0.004;

  v.prototype.isBaseLayer = function () {
    return this._isBaseLayer;
  };

  v.prototype.isDestroyed = function () {
    return false;
  };

  v.prototype.destroy = function () {
    return C(this);
  };

  var F = new p();
  var y = new p();
  var A = new p();
  var V = new p();

  v.prototype.getViewableRectangle = function () {
    var aa = this._imageryProvider;
    var ab = this._rectangle;
    return aa.readyPromise.then(function () {
      return p.intersection(aa.rectangle, ab);
    });
  };

  v.prototype._createTileImagerySkeletons = function (ag, aH, ar) {
    var aC = ag.data;

    if (R(this._minimumTerrainLevel) && ag.level < this._minimumTerrainLevel) {
      return false;
    }

    if (R(this._maximumTerrainLevel) && ag.level > this._maximumTerrainLevel) {
      return false;
    }

    var al = this._imageryProvider;

    if (!R(ar)) {
      ar = aC.imagery.length;
    }

    if (!al.ready) {
      this._skeletonPlaceholder.loadingImagery.addReference();

      aC.imagery.splice(ar, 0, this._skeletonPlaceholder);
      return true;
    }

    var aB = al.tilingScheme.projection instanceof w && ag.rectangle.north < w.MaximumLatitude && ag.rectangle.south > -w.MaximumLatitude;
    var ap = p.intersection(al.rectangle, this._rectangle, F);
    var aK = p.intersection(ag.rectangle, ap, y);

    if (!R(aK)) {
      if (!this.isBaseLayer()) {
        return false;
      }

      var ao = ap;
      var aI = ag.rectangle;
      aK = y;

      if (aI.south >= ao.north) {
        aK.north = aK.south = ao.north;
      } else {
        if (aI.north <= ao.south) {
          aK.north = aK.south = ao.south;
        } else {
          aK.south = Math.max(aI.south, ao.south);
          aK.north = Math.min(aI.north, ao.north);
        }
      }

      if (aI.west >= ao.east) {
        aK.west = aK.east = ao.east;
      } else {
        if (aI.east <= ao.west) {
          aK.west = aK.east = ao.west;
        } else {
          aK.west = Math.max(aI.west, ao.west);
          aK.east = Math.min(aI.east, ao.east);
        }
      }
    }

    var ax = 0;

    if (aK.south > 0) {
      ax = aK.south;
    } else {
      if (aK.north < 0) {
        ax = aK.north;
      }
    }

    var ab = 1;
    var af = ab * aH.getLevelMaximumGeometricError(ag.level);
    var aw = G(this, af, ax);
    aw = Math.max(0, aw);
    var av = al.maximumLevel;

    if (aw > av) {
      aw = av;
    }

    if (R(al.minimumLevel)) {
      var ae = al.minimumLevel;

      if (aw < ae) {
        aw = ae;
      }
    }

    var ay = al.tilingScheme;
    var aj = ay.positionToTileXY(p.northwest(aK), aw);
    var aq = ay.positionToTileXY(p.southeast(aK), aw);
    var ad = ag.rectangle.width / 512;
    var ac = ag.rectangle.height / 512;
    var az = ay.tileXYToRectangle(aj.x, aj.y, aw);

    if (Math.abs(az.south - ag.rectangle.north) < ac && aj.y < aq.y) {
      ++aj.y;
    }

    if (Math.abs(az.east - ag.rectangle.west) < ad && aj.x < aq.x) {
      ++aj.x;
    }

    var au = ay.tileXYToRectangle(aq.x, aq.y, aw);

    if (Math.abs(au.north - ag.rectangle.south) < ac && aq.y > aj.y) {
      --aq.y;
    }

    if (Math.abs(au.west - ag.rectangle.east) < ad && aq.x > aj.x) {
      --aq.x;
    }

    var at = p.clone(ag.rectangle, V);
    var ah = ay.tileXYToRectangle(aj.x, aj.y, aw);
    var ai = p.intersection(ah, ap, A);
    var ak;

    if (aB) {
      ay.rectangleToNativeRectangle(at, at);
      ay.rectangleToNativeRectangle(ah, ah);
      ay.rectangleToNativeRectangle(ai, ai);
      ay.rectangleToNativeRectangle(ap, ap);
      ak = ay.tileXYToNativeRectangle.bind(ay);
      ad = at.width / 512;
      ac = at.height / 512;
    } else {
      ak = ay.tileXYToRectangle.bind(ay);
    }

    var aD;
    var an = 0;
    var aA = 1;
    var am;

    if (!this.isBaseLayer() && Math.abs(ai.west - at.west) >= ad) {
      an = Math.min(1, (ai.west - at.west) / at.width);
    }

    if (!this.isBaseLayer() && Math.abs(ai.north - at.north) >= ac) {
      aA = Math.max(0, (ai.north - at.south) / at.height);
    }

    var aJ = aA;

    for (var aG = aj.x; aG <= aq.x; aG++) {
      aD = an;
      ah = ak(aG, aj.y, aw);
      ai = p.simpleIntersection(ah, ap, A);

      if (!R(ai)) {
        continue;
      }

      an = Math.min(1, (ai.east - at.west) / at.width);

      if (aG === aq.x && (this.isBaseLayer() || Math.abs(ai.east - at.east) < ad)) {
        an = 1;
      }

      aA = aJ;

      for (var aF = aj.y; aF <= aq.y; aF++) {
        am = aA;
        ah = ak(aG, aF, aw);
        ai = p.simpleIntersection(ah, ap, A);

        if (!R(ai)) {
          continue;
        }

        aA = Math.max(0, (ai.south - at.south) / at.height);

        if (aF === aq.y && (this.isBaseLayer() || Math.abs(ai.south - at.south) < ac)) {
          aA = 0;
        }

        var aE = new x(aD, aA, an, am);
        var aa = this.getImageryFromCache(aG, aF, aw);
        aC.imagery.splice(ar, 0, new r(aa, aE, aB));
        ++ar;
      }
    }

    return true;
  };

  v.prototype._calculateTextureTranslationAndScale = function (ae, ab) {
    var ah = ab.readyImagery.rectangle;
    var aa = ae.rectangle;

    if (ab.useWebMercatorT) {
      var ac = ab.readyImagery.imageryLayer.imageryProvider.tilingScheme;
      ah = ac.rectangleToNativeRectangle(ah, F);
      aa = ac.rectangleToNativeRectangle(aa, V);
    }

    var ad = aa.width;
    var af = aa.height;
    var ai = ad / ah.width;
    var ag = af / ah.height;
    return new x(ai * (aa.west - ah.west) / ad, ag * (aa.south - ah.south) / af, ai, ag);
  };

  v.prototype._requestImagery = function (af) {
    var ab = this._imageryProvider;
    var ad = this;

    function ae(ag) {
      if (!R(ag)) {
        return aa();
      }

      af.image = ag;
      af.state = q.RECEIVED;
      af.request = undefined;
      l.handleSuccess(ad._requestImageError);
    }

    function aa(ah) {
      if (af.request.state === s.CANCELLED) {
        af.state = q.UNLOADED;
        af.request = undefined;
        return;
      }

      af.state = q.FAILED;
      af.request = undefined;
      var ag = "Failed to obtain image tile X: " + af.x + " Y: " + af.y + " Level: " + af.level + ".";
      ad._requestImageError = l.handleError(ad._requestImageError, ab, ab.errorEvent, ag, af.x, af.y, af.level, ac, ah);
    }

    function ac() {
      var ah = new Z({
        throttle: false,
        throttleByServer: n(ab.throttleByServer, true),
        type: Q.IMAGERY
      });
      af.request = ah;
      af.state = q.TRANSITIONING;
      var ag = ab.requestImage(af.x, af.y, af.level, ah);

      if (!R(ag)) {
        af.state = q.UNLOADED;
        af.request = undefined;
        return;
      }

      if (R(ab.getTileCredits)) {
        af.credits = ab.getTileCredits(af.x, af.y, af.level);
      }

      H(ag, ae, aa);
    }

    ac();
  };

  v.prototype._createTextureWebGL = function (ab, ad) {
    var aa = new N({
      minificationFilter: this.minificationFilter,
      magnificationFilter: this.magnificationFilter
    });
    var ac = ad.image;

    if (R(ac.internalFormat)) {
      return new o({
        context: ab,
        pixelFormat: ac.internalFormat,
        width: ac.width,
        height: ac.height,
        source: {
          arrayBufferView: ac.bufferView
        },
        sampler: aa
      });
    }

    return new o({
      context: ab,
      source: ac,
      pixelFormat: this._imageryProvider.hasAlphaChannel ? e.RGBA : e.RGB,
      sampler: aa
    });
  };

  v.prototype._createTexture = function (ac, af) {
    var ab = this._imageryProvider;
    var ae = af.image;

    if (R(ab.tileDiscardPolicy)) {
      var aa = ab.tileDiscardPolicy;

      if (R(aa)) {
        if (!aa.isReady()) {
          af.state = q.RECEIVED;
          return;
        }

        if (aa.shouldDiscardImage(ae)) {
          af.state = q.INVALID;
          return;
        }
      }
    }

    if (this.minificationFilter !== M.NEAREST && this.minificationFilter !== M.LINEAR) {
      throw new U("ImageryLayer minification filter must be NEAREST or LINEAR");
    }

    var ad = this._createTextureWebGL(ac, af);

    if (ab.tilingScheme.projection instanceof w) {
      af.textureWebMercator = ad;
    } else {
      af.texture = ad;
    }

    af.image = undefined;
    af.state = q.TEXTURE_LOADED;
  };

  function B(aa, ab, ac) {
    return aa + ":" + ab + ":" + ac;
  }

  v.prototype._finalizeReprojectTexture = function (aa, ai) {
    var ak = this.minificationFilter;
    var ae = this.magnificationFilter;
    var ab = ak === M.LINEAR && ae === J.LINEAR;

    if (ab && !e.isCompressedFormat(ai.pixelFormat) && P.isPowerOfTwo(ai.width) && P.isPowerOfTwo(ai.height)) {
      ak = M.LINEAR_MIPMAP_LINEAR;
      var am = E.maximumTextureFilterAnisotropy;
      var af = Math.min(am, n(this._maximumAnisotropy, am));
      var ad = B(ak, ae, af);
      var ah = aa.cache.imageryLayerMipmapSamplers;

      if (!R(ah)) {
        ah = {};
        aa.cache.imageryLayerMipmapSamplers = ah;
      }

      var al = ah[ad];

      if (!R(al)) {
        al = ah[ad] = new N({
          wrapS: a.CLAMP_TO_EDGE,
          wrapT: a.CLAMP_TO_EDGE,
          minificationFilter: ak,
          magnificationFilter: ae,
          maximumAnisotropy: af
        });
      }

      ai.generateMipmap(u.NICEST);
      ai.sampler = al;
    } else {
      var ag = B(ak, ae, 0);
      var aj = aa.cache.imageryLayerNonMipmapSamplers;

      if (!R(aj)) {
        aj = {};
        aa.cache.imageryLayerNonMipmapSamplers = aj;
      }

      var ac = aj[ag];

      if (!R(ac)) {
        ac = aj[ag] = new N({
          wrapS: a.CLAMP_TO_EDGE,
          wrapT: a.CLAMP_TO_EDGE,
          minificationFilter: ak,
          magnificationFilter: ae
        });
      }

      ai.sampler = ac;
    }
  };

  v.prototype._reprojectTexture = function (ac, ah, ab) {
    var ag = ah.textureWebMercator || ah.texture;
    var ae = ah.rectangle;
    var ad = ac.context;
    ab = n(ab, true);

    if (ab && !(this._imageryProvider.tilingScheme.projection instanceof L) && ae.width / ag.width > 0.00001) {
      var af = this;
      ah.addReference();
      var aa = new f({
        persists: true,
        owner: this,
        preExecute: function preExecute(ai) {
          d(ai, ad, ag, ah.rectangle);
        },
        postExecute: function postExecute(ai) {
          ah.texture = ai;

          af._finalizeReprojectTexture(ad, ai);

          ah.state = q.READY;
          ah.releaseReference();
        }
      });

      this._reprojectComputeCommands.push(aa);
    } else {
      if (ab) {
        ah.texture = ag;
      }

      this._finalizeReprojectTexture(ad, ag);

      ah.state = q.READY;
    }
  };

  v.prototype.queueReprojectionCommands = function (aa) {
    var ac = this._reprojectComputeCommands;
    var ad = ac.length;

    for (var ab = 0; ab < ad; ++ab) {
      aa.commandList.push(ac[ab]);
    }

    ac.length = 0;
  };

  v.prototype.cancelReprojections = function () {
    this._reprojectComputeCommands.length = 0;
  };

  v.prototype.getImageryFromCache = function (aa, af, ae, ab) {
    var ac = S(aa, af, ae);
    var ad = this._imageryCache[ac];

    if (!R(ad)) {
      ad = new X(this, aa, af, ae, ab);
      this._imageryCache[ac] = ad;
    }

    ad.addReference();
    return ad;
  };

  v.prototype.removeImageryFromCache = function (ab) {
    var aa = S(ab.x, ab.y, ab.level);
    delete this._imageryCache[aa];
  };

  function S(aa, ac, ab) {
    return JSON.stringify([aa, ac, ab]);
  }

  var K = {
    u_textureDimensions: function u_textureDimensions() {
      return this.textureDimensions;
    },
    u_texture: function u_texture() {
      return this.texture;
    },
    textureDimensions: new z(),
    texture: undefined
  };
  var t = i.supportsTypedArrays() ? new Float32Array(2 * 64) : undefined;

  function d(ad, ab, aq, aD) {
    var aC = ab.cache.imageryLayer_reproject;

    if (!R(aC)) {
      aC = ab.cache.imageryLayer_reproject = {
        vertexArray: undefined,
        shaderProgram: undefined,
        sampler: undefined,
        destroy: function destroy() {
          if (R(this.framebuffer)) {
            this.framebuffer.destroy();
          }

          if (R(this.vertexArray)) {
            this.vertexArray.destroy();
          }

          if (R(this.shaderProgram)) {
            this.shaderProgram.destroy();
          }
        }
      };
      var aj = new Float32Array(2 * 64 * 2);
      var ai = 0;

      for (var aA = 0; aA < 64; ++aA) {
        var al = aA / 63;
        aj[ai++] = 0;
        aj[ai++] = al;
        aj[ai++] = 1;
        aj[ai++] = al;
      }

      var af = {
        position: 0,
        webMercatorT: 1
      };
      var ag = m.getRegularGridIndices(2, 64);
      var ac = T.createIndexBuffer({
        context: ab,
        typedArray: ag,
        usage: I.STATIC_DRAW,
        indexDatatype: c.UNSIGNED_SHORT
      });
      aC.vertexArray = new k({
        context: ab,
        attributes: [{
          index: af.position,
          vertexBuffer: T.createVertexBuffer({
            context: ab,
            typedArray: aj,
            usage: I.STATIC_DRAW
          }),
          componentsPerAttribute: 2
        }, {
          index: af.webMercatorT,
          vertexBuffer: T.createVertexBuffer({
            context: ab,
            sizeInBytes: 64 * 2 * 4,
            usage: I.STREAM_DRAW
          }),
          componentsPerAttribute: 1
        }],
        indexBuffer: ac
      });
      var ay = new Y({
        sources: [O]
      });
      aC.shaderProgram = j.fromCache({
        context: ab,
        vertexShaderSource: ay,
        fragmentShaderSource: W,
        attributeLocations: af
      });
      aC.sampler = new N({
        wrapS: a.CLAMP_TO_EDGE,
        wrapT: a.CLAMP_TO_EDGE,
        minificationFilter: M.LINEAR,
        magnificationFilter: J.LINEAR
      });
    }

    aq.sampler = aC.sampler;
    var aw = aq.width;
    var at = aq.height;
    K.textureDimensions.x = aw;
    K.textureDimensions.y = at;
    K.texture = aq;
    var ao = Math.sin(aD.south);
    var ak = 0.5 * Math.log((1 + ao) / (1 - ao));
    ao = Math.sin(aD.north);
    var aB = 0.5 * Math.log((1 + ao) / (1 - ao));
    var ae = 1 / (aB - ak);
    var aa = new o({
      context: ab,
      width: aw,
      height: at,
      pixelFormat: aq.pixelFormat,
      pixelDatatype: aq.pixelDatatype,
      preMultiplyAlpha: aq.preMultiplyAlpha
    });

    if (P.isPowerOfTwo(aw) && P.isPowerOfTwo(at)) {
      aa.generateMipmap(u.NICEST);
    }

    var am = aD.south;
    var az = aD.north;
    var ax = t;
    var av = 0;

    for (var au = 0; au < 64; ++au) {
      var ah = au / 63;
      var ar = P.lerp(am, az, ah);
      ao = Math.sin(ar);
      var ap = 0.5 * Math.log((1 + ao) / (1 - ao));
      var an = (ap - ak) * ae;
      ax[av++] = an;
      ax[av++] = an;
    }

    aC.vertexArray.getAttribute(1).vertexBuffer.copyFromArrayView(ax);
    ad.shaderProgram = aC.shaderProgram;
    ad.outputTexture = aa;
    ad.uniformMap = K;
    ad.vertexArray = aC.vertexArray;
  }

  function G(ai, al, ad) {
    var ag = ai._imageryProvider;
    var af = ag.tilingScheme;
    var aj = af.ellipsoid;
    var aa = !(ai._imageryProvider.tilingScheme.projection instanceof L) ? Math.cos(ad) : 1;
    var ak = af.rectangle;
    var ah = aj.maximumRadius * ak.width * aa / (ag.tileWidth * af.getNumberOfXTilesAtLevel(0));
    var ac = ah / al;
    var ab = Math.log(ac) / Math.log(2);
    var ae = Math.round(ab);
    return ae | 0;
  }

  return v;
});