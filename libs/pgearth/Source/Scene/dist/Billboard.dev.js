"use strict";

define(["../Core/BoundingRectangle", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Cartographic", "../Core/Color", "../Core/createGuid", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/DistanceDisplayCondition", "../Core/Matrix4", "../Core/NearFarScalar", "../Core/Resource", "./HeightReference", "./HorizontalOrigin", "./SceneMode", "./SceneTransforms", "./VerticalOrigin"], function (h, c, _, i, u, l, d, g, f, e, p, m, D, I, t, v, C, w, y, O) {
  "use strict";

  function b(i, e) {
    if (i = g(i, g.EMPTY_OBJECT), f(i.disableDepthTestDistance) && i.disableDepthTestDistance < 0) throw new p("disableDepthTestDistance must be greater than or equal to 0.0.");
    var t = i.translucencyByDistance,
        s = i.pixelOffsetScaleByDistance,
        n = i.scaleByDistance,
        a = i.distanceDisplayCondition;

    if (f(t)) {
      if (t.far <= t.near) throw new p("translucencyByDistance.far must be greater than translucencyByDistance.near.");
      t = I.clone(t);
    }

    if (f(s)) {
      if (s.far <= s.near) throw new p("pixelOffsetScaleByDistance.far must be greater than pixelOffsetScaleByDistance.near.");
      s = I.clone(s);
    }

    if (f(n)) {
      if (n.far <= n.near) throw new p("scaleByDistance.far must be greater than scaleByDistance.near.");
      n = I.clone(n);
    }

    if (f(a)) {
      if (a.far <= a.near) throw new p("distanceDisplayCondition.far must be greater than distanceDisplayCondition.near.");
      a = m.clone(a);
    }

    this._show = g(i.show, !0), this._position = _.clone(g(i.position, _.ZERO)), this._actualPosition = _.clone(this._position), this._pixelOffset = c.clone(g(i.pixelOffset, c.ZERO)), this._translate = new c(0, 0), this._eyeOffset = _.clone(g(i.eyeOffset, _.ZERO)), this._heightReference = g(i.heightReference, v.NONE), this._verticalOrigin = g(i.verticalOrigin, O.CENTER), this._horizontalOrigin = g(i.horizontalOrigin, C.CENTER), this._scale = g(i.scale, 1), this._color = l.clone(g(i.color, l.WHITE)), this._rotation = g(i.rotation, 0), this._alignedAxis = _.clone(g(i.alignedAxis, _.ZERO)), this._width = i.width, this._height = i.height, this._scaleByDistance = n, this._translucencyByDistance = t, this._pixelOffsetScaleByDistance = s, this._sizeInMeters = g(i.sizeInMeters, !1), this._distanceDisplayCondition = a, this._disableDepthTestDistance = i.disableDepthTestDistance, this._id = i.id, this._collection = g(i.collection, e), this._pickId = void 0, this._pickPrimitive = g(i._pickPrimitive, this), this._billboardCollection = e, this._dirty = !1, this._index = -1, this._batchIndex = void 0, this._imageIndex = -1, this._imageIndexPromise = void 0, this._imageId = void 0, this._image = void 0, this._imageSubRegion = void 0, this._imageWidth = void 0, this._imageHeight = void 0, this._labelDimensions = void 0, this._labelHorizontalOrigin = void 0, this._labelTranslate = void 0;
    var o = i.image,
        r = i.imageId;
    f(o) && (f(r) || (r = "string" == typeof o ? o : f(o.src) ? o.src : d()), this._imageId = r, this._image = o), f(i.imageSubRegion) && (this._imageId = r, this._imageSubRegion = i.imageSubRegion), f(this._billboardCollection._textureAtlas) && this._loadImage(), this._actualClampedPosition = void 0, this._removeCallbackFunc = void 0, this._mode = w.SCENE3D, this._clusterShow = !0, this._updateClamping();
  }

  b.SHOW_INDEX = 0, b.POSITION_INDEX = 1, b.PIXEL_OFFSET_INDEX = 2, b.EYE_OFFSET_INDEX = 3, b.HORIZONTAL_ORIGIN_INDEX = 4, b.VERTICAL_ORIGIN_INDEX = 5, b.SCALE_INDEX = 6, b.IMAGE_INDEX_INDEX = 7, b.COLOR_INDEX = 8, b.ROTATION_INDEX = 9, b.ALIGNED_AXIS_INDEX = 10, b.SCALE_BY_DISTANCE_INDEX = 11, b.TRANSLUCENCY_BY_DISTANCE_INDEX = 12, b.PIXEL_OFFSET_SCALE_BY_DISTANCE_INDEX = 13, b.DISTANCE_DISPLAY_CONDITION = 14, b.DISABLE_DEPTH_DISTANCE = 15;

  function r(i, e) {
    var t = i._billboardCollection;
    f(t) && (t._updateBillboard(i, e), i._dirty = !0);
  }

  b.TEXTURE_COORDINATE_BOUNDS = 16, b.NUMBER_OF_PROPERTIES = 17, e(b.prototype, {
    show: {
      get: function get() {
        return this._show;
      },
      set: function set(i) {
        if (!f(i)) throw new p("value is required.");
        this._show !== i && (this._show = i, r(this, 0));
      }
    },
    position: {
      get: function get() {
        return this._position;
      },
      set: function set(i) {
        if (!f(i)) throw new p("value is required.");
        var e = this._position;
        _.equals(e, i) || (_.clone(i, e), _.clone(i, this._actualPosition), this._updateClamping(), r(this, 1));
      }
    },
    heightReference: {
      get: function get() {
        return this._heightReference;
      },
      set: function set(i) {
        if (!f(i)) throw new p("value is required.");
        i !== this._heightReference && (this._heightReference = i, this._updateClamping(), r(this, 1));
      }
    },
    pixelOffset: {
      get: function get() {
        return this._pixelOffset;
      },
      set: function set(i) {
        if (!f(i)) throw new p("value is required.");
        var e = this._pixelOffset;
        c.equals(e, i) || (c.clone(i, e), r(this, 2));
      }
    },
    scaleByDistance: {
      get: function get() {
        return this._scaleByDistance;
      },
      set: function set(i) {
        if (f(i) && i.far <= i.near) throw new p("far distance must be greater than near distance.");
        var e = this._scaleByDistance;
        I.equals(e, i) || (this._scaleByDistance = I.clone(i, e), r(this, 11));
      }
    },
    translucencyByDistance: {
      get: function get() {
        return this._translucencyByDistance;
      },
      set: function set(i) {
        if (f(i) && i.far <= i.near) throw new p("far distance must be greater than near distance.");
        var e = this._translucencyByDistance;
        I.equals(e, i) || (this._translucencyByDistance = I.clone(i, e), r(this, 12));
      }
    },
    pixelOffsetScaleByDistance: {
      get: function get() {
        return this._pixelOffsetScaleByDistance;
      },
      set: function set(i) {
        if (f(i) && i.far <= i.near) throw new p("far distance must be greater than near distance.");
        var e = this._pixelOffsetScaleByDistance;
        I.equals(e, i) || (this._pixelOffsetScaleByDistance = I.clone(i, e), r(this, 13));
      }
    },
    eyeOffset: {
      get: function get() {
        return this._eyeOffset;
      },
      set: function set(i) {
        if (!f(i)) throw new p("value is required.");
        var e = this._eyeOffset;
        _.equals(e, i) || (_.clone(i, e), r(this, 3));
      }
    },
    horizontalOrigin: {
      get: function get() {
        return this._horizontalOrigin;
      },
      set: function set(i) {
        if (!f(i)) throw new p("value is required.");
        this._horizontalOrigin !== i && (this._horizontalOrigin = i, r(this, 4));
      }
    },
    verticalOrigin: {
      get: function get() {
        return this._verticalOrigin;
      },
      set: function set(i) {
        if (!f(i)) throw new p("value is required.");
        this._verticalOrigin !== i && (this._verticalOrigin = i, r(this, 5));
      }
    },
    scale: {
      get: function get() {
        return this._scale;
      },
      set: function set(i) {
        if (!f(i)) throw new p("value is required.");
        this._scale !== i && (this._scale = i, r(this, 6));
      }
    },
    color: {
      get: function get() {
        return this._color;
      },
      set: function set(i) {
        if (!f(i)) throw new p("value is required.");
        var e = this._color;
        l.equals(e, i) || (l.clone(i, e), r(this, 8));
      }
    },
    rotation: {
      get: function get() {
        return this._rotation;
      },
      set: function set(i) {
        if (!f(i)) throw new p("value is required.");
        this._rotation !== i && (this._rotation = i, r(this, 9));
      }
    },
    alignedAxis: {
      get: function get() {
        return this._alignedAxis;
      },
      set: function set(i) {
        if (!f(i)) throw new p("value is required.");
        var e = this._alignedAxis;
        _.equals(e, i) || (_.clone(i, e), r(this, 10));
      }
    },
    width: {
      get: function get() {
        return g(this._width, this._imageWidth);
      },
      set: function set(i) {
        this._width !== i && (this._width = i, r(this, 7));
      }
    },
    height: {
      get: function get() {
        return g(this._height, this._imageHeight);
      },
      set: function set(i) {
        this._height !== i && (this._height = i, r(this, 7));
      }
    },
    sizeInMeters: {
      get: function get() {
        return this._sizeInMeters;
      },
      set: function set(i) {
        this._sizeInMeters !== i && (this._sizeInMeters = i, r(this, 8));
      }
    },
    distanceDisplayCondition: {
      get: function get() {
        return this._distanceDisplayCondition;
      },
      set: function set(i) {
        if (!m.equals(i, this._distanceDisplayCondition)) {
          if (f(i) && i.far <= i.near) throw new p("far distance must be greater than near distance.");
          this._distanceDisplayCondition = m.clone(i, this._distanceDisplayCondition), r(this, 14);
        }
      }
    },
    disableDepthTestDistance: {
      get: function get() {
        return this._disableDepthTestDistance;
      },
      set: function set(i) {
        if (this._disableDepthTestDistance !== i) {
          if (f(i) && i < 0) throw new p("disableDepthTestDistance must be greater than or equal to 0.0.");
          this._disableDepthTestDistance = i, r(this, 15);
        }
      }
    },
    id: {
      get: function get() {
        return this._id;
      },
      set: function set(i) {
        this._id = i, f(this._pickId) && (this._pickId.object.id = i);
      }
    },
    pickPrimitive: {
      get: function get() {
        return this._pickPrimitive;
      },
      set: function set(i) {
        this._pickPrimitive = i, f(this._pickId) && (this._pickId.object.primitive = i);
      }
    },
    pickId: {
      get: function get() {
        return this._pickId;
      }
    },
    image: {
      get: function get() {
        return this._imageId;
      },
      set: function set(i) {
        f(i) ? "string" == typeof i ? this.setImage(i, i) : i instanceof t ? this.setImage(i.url, i) : f(i.src) ? this.setImage(i.src, i) : this.setImage(d(), i) : (this._imageIndex = -1, this._imageSubRegion = void 0, this._imageId = void 0, this._image = void 0, this._imageIndexPromise = void 0, r(this, 7));
      }
    },
    ready: {
      get: function get() {
        return -1 !== this._imageIndex;
      }
    },
    _clampedPosition: {
      get: function get() {
        return this._actualClampedPosition;
      },
      set: function set(i) {
        this._actualClampedPosition = _.clone(i, this._actualClampedPosition), r(this, 1);
      }
    },
    clusterShow: {
      get: function get() {
        return this._clusterShow;
      },
      set: function set(i) {
        this._clusterShow !== i && (this._clusterShow = i, r(this, 0));
      }
    }
  }), b.prototype.getPickId = function (i) {
    return f(this._pickId) || (this._pickId = i.createPickId({
      primitive: this._pickPrimitive,
      collection: this._collection,
      id: this._id
    })), this._pickId;
  }, b.prototype._updateClamping = function () {
    b._updateClamping(this._billboardCollection, this);
  };
  var E = new u(),
      S = new _();
  b._updateClamping = function (i, t) {
    var e = i._scene;

    if (f(e) && f(e.globe)) {
      var s,
          n,
          a = e.globe,
          o = a.ellipsoid,
          r = a._surface,
          h = e.frameState.mode,
          c = h !== t._mode;
      t._mode = h, (t._heightReference === v.NONE || c) && f(t._removeCallbackFunc) && (t._removeCallbackFunc(), t._removeCallbackFunc = void 0, t._clampedPosition = void 0), t._heightReference !== v.NONE && f(t._position) && (s = o.cartesianToCartographic(t._position), f(s) ? (f(t._removeCallbackFunc) && t._removeCallbackFunc(), t._removeCallbackFunc = r.updateHeight(s, l), u.clone(s, E), n = a.getHeight(s), f(n) && (E.height = n), o.cartographicToCartesian(E, S), l(S)) : t._actualClampedPosition = void 0);
    } else if (t._heightReference !== v.NONE) throw new p("Height reference is not supported without a scene and globe.");

    function l(i) {
      var e;
      t._heightReference === v.RELATIVE_TO_GROUND && (t._mode === w.SCENE3D ? ((e = o.cartesianToCartographic(i, E)).height += s.height, o.cartographicToCartesian(e, i)) : i.x += s.height), t._clampedPosition = _.clone(i, t._clampedPosition);
    }
  }, b.prototype._loadImage = function () {
    var i,
        t,
        s = this._billboardCollection._textureAtlas,
        n = this._imageId,
        a = this._image,
        o = this._imageSubRegion;
    f(a) && (i = s.addImage(n, a)), f(o) && (i = s.addSubRegion(n, o)), this._imageIndexPromise = i, f(i) && (t = this, i.then(function (i) {
      var e;
      t._imageId === n && t._image === a && h.equals(t._imageSubRegion, o) && (e = s.textureCoordinates[i], t._imageWidth = s.texture.width * e.width, t._imageHeight = s.texture.height * e.height, t._imageIndex = i, t._ready = !0, t._image = void 0, t._imageIndexPromise = void 0, r(t, 7));
    }).otherwise(function (i) {
      console.error("Error loading image for billboard: " + i), t._imageIndexPromise = void 0;
    }));
  }, b.prototype.setImage = function (i, e) {
    if (!f(i)) throw new p("id is required.");
    if (!f(e)) throw new p("image is required.");
    this._imageId !== i && (this._imageIndex = -1, this._imageSubRegion = void 0, this._imageId = i, this._image = e, f(this._billboardCollection._textureAtlas) && this._loadImage());
  }, b.prototype.setImageSubRegion = function (i, e) {
    if (!f(i)) throw new p("id is required.");
    if (!f(e)) throw new p("subRegion is required.");
    this._imageId === i && h.equals(this._imageSubRegion, e) || (this._imageIndex = -1, this._imageId = i, this._imageSubRegion = h.clone(e), f(this._billboardCollection._textureAtlas) && this._loadImage());
  }, b.prototype._setTranslate = function (i) {
    if (!f(i)) throw new p("value is required.");
    var e = this._translate;
    c.equals(e, i) || (c.clone(i, e), r(this, 2));
  }, b.prototype._getActualPosition = function () {
    return f(this._clampedPosition) ? this._clampedPosition : this._actualPosition;
  }, b.prototype._setActualPosition = function (i) {
    f(this._clampedPosition) || _.clone(i, this._actualPosition), r(this, 1);
  };
  var n = new i();

  b._computeActualPosition = function (i, e, t, s) {
    return f(i._clampedPosition) ? (t.mode !== i._mode && i._updateClamping(), i._clampedPosition) : t.mode === w.SCENE3D ? e : (D.multiplyByPoint(s, e, n), y.computeActualWgs84Position(t, n));
  };

  var T = new _();

  b._computeScreenSpacePosition = function (i, e, t, s, n, a) {
    var o = D.multiplyByPoint(i, e, T),
        r = y.wgs84WithEyeOffsetToWindowCoordinates(n, o, t, a);
    if (f(r)) return c.add(r, s, r), r;
  };

  var N = new c(0, 0);
  return b.prototype.computeScreenSpacePosition = function (i, e) {
    var t = this._billboardCollection;
    if (f(e) || (e = new c()), !f(t)) throw new p("Billboard must be in a collection.  Was it removed?");
    if (!f(i)) throw new p("scene is required.");
    c.clone(this._pixelOffset, N), c.add(N, this._translate, N);
    var s,
        n,
        a,
        o = t.modelMatrix,
        r = this._position;
    return f(this._clampedPosition) && (r = this._clampedPosition, i.mode !== w.SCENE3D && (n = (s = i.mapProjection).ellipsoid, a = s.unproject(r, E), r = n.cartographicToCartesian(a, T), o = D.IDENTITY)), b._computeScreenSpacePosition(o, r, this._eyeOffset, N, i, e);
  }, b.getScreenSpaceBoundingBox = function (i, e, t) {
    var s = i.width,
        n = i.height,
        a = i.scale;
    s *= a, n *= a;
    var o = e.x;
    i.horizontalOrigin === C.RIGHT ? o -= s : i.horizontalOrigin === C.CENTER && (o -= .5 * s);
    var r = e.y;
    return i.verticalOrigin === O.BOTTOM || i.verticalOrigin === O.BASELINE ? r -= n : i.verticalOrigin === O.CENTER && (r -= .5 * n), f(t) || (t = new h()), t.x = o, t.y = r, t.width = s, t.height = n, t;
  }, b.prototype.equals = function (i) {
    return this === i || f(i) && this._id === i._id && _.equals(this._position, i._position) && this._imageId === i._imageId && this._show === i._show && this._scale === i._scale && this._verticalOrigin === i._verticalOrigin && this._horizontalOrigin === i._horizontalOrigin && this._heightReference === i._heightReference && h.equals(this._imageSubRegion, i._imageSubRegion) && l.equals(this._color, i._color) && c.equals(this._pixelOffset, i._pixelOffset) && c.equals(this._translate, i._translate) && _.equals(this._eyeOffset, i._eyeOffset) && I.equals(this._scaleByDistance, i._scaleByDistance) && I.equals(this._translucencyByDistance, i._translucencyByDistance) && I.equals(this._pixelOffsetScaleByDistance, i._pixelOffsetScaleByDistance) && m.equals(this._distanceDisplayCondition, i._distanceDisplayCondition) && this._disableDepthTestDistance === i._disableDepthTestDistance;
  }, b.prototype._destroy = function () {
    f(this._customData) && (this._billboardCollection._scene.globe._surface.removeTileCustomData(this._customData), this._customData = void 0), f(this._removeCallbackFunc) && (this._removeCallbackFunc(), this._removeCallbackFunc = void 0), this.image = void 0, this._pickId = this._pickId && this._pickId.destroy(), this._billboardCollection = void 0;
  }, b;
});