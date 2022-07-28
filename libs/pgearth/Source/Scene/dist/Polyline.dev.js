"use strict";

define(["../Core/arrayRemoveDuplicates", "../Core/BoundingSphere", "../Core/Cartesian3", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/DistanceDisplayCondition", "../Core/Matrix4", "../Core/PolylinePipeline", "./Material"], function (e, h, n, l, a, r, i, s, t, _, u, d) {
  "use strict";

  function o(i, t) {
    i = a(i, a.EMPTY_OBJECT), this._show = a(i.show, !0), this._width = a(i.width, 1), this._loop = a(i.loop, !1), this._distanceDisplayCondition = i.distanceDisplayCondition, this._material = i.material, r(this._material) || (this._material = d.fromType(d.ColorType, {
      color: new l(1, 1, 1, 1)
    }));
    var s,
        o = i.positions;
    r(o) || (o = []), this._positions = o, this._actualPositions = e(o, n.equalsEpsilon), this._loop && 2 < this._actualPositions.length && (this._actualPositions === this._positions && (this._actualPositions = o.slice()), this._actualPositions.push(n.clone(this._actualPositions[0]))), this._length = this._actualPositions.length, this._id = i.id, r(t) && (s = _.clone(t.modelMatrix)), this._modelMatrix = s, this._segments = u.wrapLongitude(this._actualPositions, s), this._actualLength = void 0, this._propertiesChanged = new Uint32Array(c), this._polylineCollection = t, this._dirty = !1, this._pickId = void 0, this._boundingVolume = h.fromPoints(this._actualPositions), this._boundingVolumeWC = h.transform(this._boundingVolume, this._modelMatrix), this._boundingVolume2D = new h();
  }

  o.POSITION_INDEX = 0, o.SHOW_INDEX = 1, o.WIDTH_INDEX = 2, o.MATERIAL_INDEX = 3, o.POSITION_SIZE_INDEX = 4, o.DISTANCE_DISPLAY_CONDITION = 5;
  var c = o.NUMBER_OF_PROPERTIES = 6;

  function p(i, t) {
    ++i._propertiesChanged[t];
    var s = i._polylineCollection;
    r(s) && (s._updatePolyline(i, t), i._dirty = !0);
  }

  return i(o.prototype, {
    show: {
      get: function get() {
        return this._show;
      },
      set: function set(i) {
        if (!r(i)) throw new s("value is required.");
        i !== this._show && (this._show = i, p(this, 1));
      }
    },
    positions: {
      get: function get() {
        return this._positions;
      },
      set: function set(i) {
        if (!r(i)) throw new s("value is required.");
        var t = e(i, n.equalsEpsilon);
        this._loop && 2 < t.length && (t === i && (t = i.slice()), t.push(n.clone(t[0]))), this._actualPositions.length === t.length && this._actualPositions.length === this._length || p(this, 4), this._positions = i, this._actualPositions = t, this._length = t.length, this._boundingVolume = h.fromPoints(this._actualPositions, this._boundingVolume), this._boundingVolumeWC = h.transform(this._boundingVolume, this._modelMatrix, this._boundingVolumeWC), p(this, 0), this.update();
      }
    },
    material: {
      get: function get() {
        return this._material;
      },
      set: function set(i) {
        if (!r(i)) throw new s("material is required.");
        this._material !== i && (this._material = i, p(this, 3));
      }
    },
    width: {
      get: function get() {
        return this._width;
      },
      set: function set(i) {
        if (!r(i)) throw new s("value is required.");
        i !== this._width && (this._width = i, p(this, 2));
      }
    },
    loop: {
      get: function get() {
        return this._loop;
      },
      set: function set(i) {
        if (!r(i)) throw new s("value is required.");
        var t;
        i !== this._loop && (t = this._actualPositions, i ? 2 < t.length && !n.equals(t[0], t[t.length - 1]) && (t.length === this._positions.length && (this._actualPositions = t = this._positions.slice()), t.push(n.clone(t[0]))) : 2 < t.length && n.equals(t[0], t[t.length - 1]) && (t.length - 1 === this._positions.length ? this._actualPositions = this._positions : t.pop()), this._loop = i, p(this, 4));
      }
    },
    id: {
      get: function get() {
        return this._id;
      },
      set: function set(i) {
        this._id = i, r(this._pickId) && (this._pickId.object.id = i);
      }
    },
    pickId: {
      get: function get() {
        return this._pickId;
      }
    },
    distanceDisplayCondition: {
      get: function get() {
        return this._distanceDisplayCondition;
      },
      set: function set(i) {
        if (r(i) && i.far <= i.near) throw new s("far distance must be greater than near distance.");
        t.equals(i, this._distanceDisplayCondition) || (this._distanceDisplayCondition = t.clone(i, this._distanceDisplayCondition), p(this, 5));
      }
    }
  }), o.prototype.update = function () {
    var i = _.IDENTITY;
    r(this._polylineCollection) && (i = this._polylineCollection.modelMatrix);
    var t = this._segments.positions.length,
        s = this._segments.lengths,
        o = 0 < this._propertiesChanged[0] || 0 < this._propertiesChanged[4];
    if (_.equals(i, this._modelMatrix) && !o || (this._segments = u.wrapLongitude(this._actualPositions, i), this._boundingVolumeWC = h.transform(this._boundingVolume, i, this._boundingVolumeWC)), this._modelMatrix = _.clone(i, this._modelMatrix), this._segments.positions.length !== t) p(this, 4);else for (var e = s.length, n = 0; n < e; ++n) {
      if (s[n] !== this._segments.lengths[n]) {
        p(this, 4);
        break;
      }
    }
  }, o.prototype.getPickId = function (i) {
    return r(this._pickId) || (this._pickId = i.createPickId({
      primitive: this,
      collection: this._polylineCollection,
      id: this._id
    })), this._pickId;
  }, o.prototype._clean = function () {
    this._dirty = !1;

    for (var i = this._propertiesChanged, t = 0; t < c - 1; ++t) {
      i[t] = 0;
    }
  }, o.prototype._destroy = function () {
    this._pickId = this._pickId && this._pickId.destroy(), this._material = this._material && this._material.destroy(), this._polylineCollection = void 0;
  }, o;
});