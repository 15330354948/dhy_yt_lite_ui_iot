"use strict";

define(["../Core/BoundingRectangle", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/DistanceDisplayCondition", "../Core/Matrix4", "../Core/NearFarScalar", "./SceneMode", "./SceneTransforms"], function (l, o, r, a, c, h, u, t, _, d, p, D, n, f) {
  "use strict";

  function y(t, i) {
    if (t = h(t, h.EMPTY_OBJECT), u(t.disableDepthTestDistance) && t.disableDepthTestDistance < 0) throw new _("disableDepthTestDistance must be greater than or equal to 0.0.");
    var e = t.translucencyByDistance,
        n = t.scaleByDistance,
        s = t.distanceDisplayCondition;

    if (u(e)) {
      if (e.far <= e.near) throw new _("translucencyByDistance.far must be greater than translucencyByDistance.near.");
      e = D.clone(e);
    }

    if (u(n)) {
      if (n.far <= n.near) throw new _("scaleByDistance.far must be greater than scaleByDistance.near.");
      n = D.clone(n);
    }

    if (u(s)) {
      if (s.far <= s.near) throw new _("distanceDisplayCondition.far must be greater than distanceDisplayCondition.near.");
      s = d.clone(s);
    }

    this._show = h(t.show, !0), this._position = r.clone(h(t.position, r.ZERO)), this._actualPosition = r.clone(this._position), this._color = c.clone(h(t.color, c.WHITE)), this._outlineColor = c.clone(h(t.outlineColor, c.TRANSPARENT)), this._outlineWidth = h(t.outlineWidth, 0), this._pixelSize = h(t.pixelSize, 10), this._scaleByDistance = n, this._translucencyByDistance = e, this._distanceDisplayCondition = s, this._disableDepthTestDistance = h(t.disableDepthTestDistance, 0), this._id = t.id, this._collection = h(t.collection, i), this._clusterShow = !0, this._pickId = void 0, this._pointPrimitiveCollection = i, this._dirty = !1, this._index = -1;
  }

  y.SHOW_INDEX = 0, y.POSITION_INDEX = 1, y.COLOR_INDEX = 2, y.OUTLINE_COLOR_INDEX = 3, y.OUTLINE_WIDTH_INDEX = 4, y.PIXEL_SIZE_INDEX = 5, y.SCALE_BY_DISTANCE_INDEX = 6, y.TRANSLUCENCY_BY_DISTANCE_INDEX = 7, y.DISTANCE_DISPLAY_CONDITION_INDEX = 8, y.DISABLE_DEPTH_DISTANCE_INDEX = 9;

  function e(t, i) {
    var e = t._pointPrimitiveCollection;
    u(e) && (e._updatePointPrimitive(t, i), t._dirty = !0);
  }

  y.NUMBER_OF_PROPERTIES = 10, t(y.prototype, {
    show: {
      get: function get() {
        return this._show;
      },
      set: function set(t) {
        if (!u(t)) throw new _("value is required.");
        this._show !== t && (this._show = t, e(this, 0));
      }
    },
    position: {
      get: function get() {
        return this._position;
      },
      set: function set(t) {
        if (!u(t)) throw new _("value is required.");
        var i = this._position;
        r.equals(i, t) || (r.clone(t, i), r.clone(t, this._actualPosition), e(this, 1));
      }
    },
    scaleByDistance: {
      get: function get() {
        return this._scaleByDistance;
      },
      set: function set(t) {
        if (u(t) && t.far <= t.near) throw new _("far distance must be greater than near distance.");
        var i = this._scaleByDistance;
        D.equals(i, t) || (this._scaleByDistance = D.clone(t, i), e(this, 6));
      }
    },
    translucencyByDistance: {
      get: function get() {
        return this._translucencyByDistance;
      },
      set: function set(t) {
        if (u(t) && t.far <= t.near) throw new _("far distance must be greater than near distance.");
        var i = this._translucencyByDistance;
        D.equals(i, t) || (this._translucencyByDistance = D.clone(t, i), e(this, 7));
      }
    },
    pixelSize: {
      get: function get() {
        return this._pixelSize;
      },
      set: function set(t) {
        if (!u(t)) throw new _("value is required.");
        this._pixelSize !== t && (this._pixelSize = t, e(this, 5));
      }
    },
    color: {
      get: function get() {
        return this._color;
      },
      set: function set(t) {
        if (!u(t)) throw new _("value is required.");
        var i = this._color;
        c.equals(i, t) || (c.clone(t, i), e(this, 2));
      }
    },
    outlineColor: {
      get: function get() {
        return this._outlineColor;
      },
      set: function set(t) {
        if (!u(t)) throw new _("value is required.");
        var i = this._outlineColor;
        c.equals(i, t) || (c.clone(t, i), e(this, 3));
      }
    },
    outlineWidth: {
      get: function get() {
        return this._outlineWidth;
      },
      set: function set(t) {
        if (!u(t)) throw new _("value is required.");
        this._outlineWidth !== t && (this._outlineWidth = t, e(this, 4));
      }
    },
    distanceDisplayCondition: {
      get: function get() {
        return this._distanceDisplayCondition;
      },
      set: function set(t) {
        if (u(t) && t.far <= t.near) throw new _("far must be greater than near");
        d.equals(this._distanceDisplayCondition, t) || (this._distanceDisplayCondition = d.clone(t, this._distanceDisplayCondition), e(this, 8));
      }
    },
    disableDepthTestDistance: {
      get: function get() {
        return this._disableDepthTestDistance;
      },
      set: function set(t) {
        if (this._disableDepthTestDistance !== t) {
          if (!u(t) || t < 0) throw new _("disableDepthTestDistance must be greater than or equal to 0.0.");
          this._disableDepthTestDistance = t, e(this, 9);
        }
      }
    },
    id: {
      get: function get() {
        return this._id;
      },
      set: function set(t) {
        this._id = t, u(this._pickId) && (this._pickId.object.id = t);
      }
    },
    pickId: {
      get: function get() {
        return this._pickId;
      }
    },
    clusterShow: {
      get: function get() {
        return this._clusterShow;
      },
      set: function set(t) {
        this._clusterShow !== t && (this._clusterShow = t, e(this, 0));
      }
    }
  }), y.prototype.getPickId = function (t) {
    return u(this._pickId) || (this._pickId = t.createPickId({
      primitive: this,
      collection: this._collection,
      id: this._id
    })), this._pickId;
  }, y.prototype._getActualPosition = function () {
    return this._actualPosition;
  }, y.prototype._setActualPosition = function (t) {
    r.clone(t, this._actualPosition), e(this, 1);
  };
  var s = new a();

  y._computeActualPosition = function (t, i, e) {
    return i.mode === n.SCENE3D ? t : (p.multiplyByPoint(e, t, s), f.computeActualWgs84Position(i, s));
  };

  var w = new a();
  return y._computeScreenSpacePosition = function (t, i, e, n) {
    var s = p.multiplyByVector(t, a.fromElements(i.x, i.y, i.z, 1, w), w);
    return f.wgs84ToWindowCoordinates(e, s, n);
  }, y.prototype.computeScreenSpacePosition = function (t, i) {
    var e = this._pointPrimitiveCollection;
    if (u(i) || (i = new o()), !u(e)) throw new _("PointPrimitive must be in a collection.");
    if (!u(t)) throw new _("scene is required.");

    var n = e.modelMatrix,
        s = y._computeScreenSpacePosition(n, this._actualPosition, t, i);

    if (u(s)) return s.y = t.canvas.clientHeight - s.y, s;
  }, y.getScreenSpaceBoundingBox = function (t, i, e) {
    var n = t.pixelSize,
        s = .5 * n,
        o = i.x - s,
        r = i.y - s,
        a = n,
        c = n;
    return u(e) || (e = new l()), e.x = o, e.y = r, e.width = a, e.height = c, e;
  }, y.prototype.equals = function (t) {
    return this === t || u(t) && this._id === t._id && r.equals(this._position, t._position) && c.equals(this._color, t._color) && this._pixelSize === t._pixelSize && this._outlineWidth === t._outlineWidth && this._show === t._show && c.equals(this._outlineColor, t._outlineColor) && D.equals(this._scaleByDistance, t._scaleByDistance) && D.equals(this._translucencyByDistance, t._translucencyByDistance) && d.equals(this._distanceDisplayCondition, t._distanceDisplayCondition) && this._disableDepthTestDistance === t._disableDepthTestDistance;
  }, y.prototype._destroy = function () {
    this._pickId = this._pickId && this._pickId.destroy(), this._pointPrimitiveCollection = void 0;
  }, y;
});