"use strict";

define(["../../Core/Credit", "../../Core/defaultValue", "../../Core/defined", "../../Core/defineProperties", "../../Core/DeveloperError", "../../Core/Event", "../../Core/GeographicTilingScheme", "../../Core/Rectangle", "../../Core/TileProviderError", "../../Core/WebMercatorProjection", "../../Core/WebMercatorTilingScheme", "../../Core/Cartesian2", "../../Core/Cartesian3", "../../Core/Cartographic", "../../ThirdParty/when", "../../extends/core/h337"], function (t, r, s, e, o, i, h, n, a, d, u, c, g, p, _, f) {
  function m(t) {
    var e = (t = r(t, {})).data,
        i = t.bounds || {
      north: 90,
      west: -180,
      south: -90,
      east: 180
    },
        h = t.chInstance || f;
    if (!s(i)) throw new o("options.bounds is required.");
    if (!(s(i.north) && s(i.south) && s(i.east) && s(i.west))) throw new o("options.bounds.north, options.bounds.south, options.bounds.east and options.bounds.west are required.");
    if (!s(e)) throw new o("data is required.");
    if (!s(e.min) || !s(e.max) || !s(e.points)) throw new o("options.data.min, data.max, data.points  are required.");
    this._wmp = new d(), this._mbounds = this.wgs84ToMercatorBB(i), this._options = r(t.heatmapoptions, {}), this._options.gradient = r(this._options.gradient, {
      .25: "rgb(0,0,255)",
      .55: "rgb(0,255,0)",
      .85: "yellow",
      1: "rgb(255,0,0)"
    }), this._setWidthAndHeight(this._mbounds), this._options.radius = Math.round(r(this._options.radius, this.width > this.height ? this.width / 60 : this.height / 60)), this._spacing = 1.5 * this._options.radius, this._xoffset = this._mbounds.west, this._yoffset = this._mbounds.south, this.width = Math.round(this.width + 2 * this._spacing), this.height = Math.round(this.height + 2 * this._spacing), this._mbounds.west -= this._spacing * this._factor, this._mbounds.east += this._spacing * this._factor, this._mbounds.south -= this._spacing * this._factor, this._mbounds.north += this._spacing * this._factor, this.bounds = this.mercatorToWgs84BB(this._mbounds), this._container = this._getContainer(this.width, this.height), this._options.container = this._container, this._heatmap = h.create(this._options), this._image = this._canvas = this._container.children[0], this._tilingScheme = new u({
      rectangleSouthwestInMeters: new c(this._mbounds.west, this._mbounds.south),
      rectangleNortheastInMeters: new c(this._mbounds.east, this._mbounds.north)
    }), this._texture = void 0, this._tileWidth = this.width, this._tileHeight = this.height, this._ready = !1, this.readyPromise = _.defer(), t.data && (this._ready = this.setWGS84Data(t.data.min, t.data.max, t.data.points), this.readyPromise.resolve(!0));
  }

  return e(m.prototype, {
    url: {
      get: function get() {
        return this._url;
      }
    },
    tileWidth: {
      get: function get() {
        if (!this._ready) throw new o("tileWidth must not be called before the imagery provider is ready.");
        return this._tileWidth;
      }
    },
    tileHeight: {
      get: function get() {
        if (!this._ready) throw new o("tileHeight must not be called before the imagery provider is ready.");
        return this._tileHeight;
      }
    },
    maximumLevel: {
      get: function get() {
        if (!this._ready) throw new o("maximumLevel must not be called before the imagery provider is ready.");
        return 0;
      }
    },
    minimumLevel: {
      get: function get() {
        if (!this._ready) throw new o("minimumLevel must not be called before the imagery provider is ready.");
        return 0;
      }
    },
    tilingScheme: {
      get: function get() {
        if (!this._ready) throw new o("tilingScheme must not be called before the imagery provider is ready.");
        return this._tilingScheme;
      }
    },
    rectangle: {
      get: function get() {
        return this._tilingScheme.rectangle;
      }
    },
    tileDiscardPolicy: {
      get: function get() {
        if (!this._ready) throw new o("tileDiscardPolicy must not be called before the imagery provider is ready.");
      }
    },
    errorEvent: {
      get: function get() {
        return this._errorEvent;
      }
    },
    ready: {
      get: function get() {
        return this._ready;
      }
    },
    credit: {
      get: function get() {
        return this._credit;
      }
    },
    hasAlphaChannel: {
      get: function get() {
        return !0;
      }
    }
  }), m.prototype._setWidthAndHeight = function (t) {
    var e = 2e3,
        i = 700;
    this.width = 0 < t.east && t.west < 0 ? t.east + Math.abs(t.west) : Math.abs(t.east - t.west), this.height = 0 < t.north && t.south < 0 ? t.north + Math.abs(t.south) : Math.abs(t.north - t.south), this._factor = 1, this.width > this.height && this.width > e ? (this._factor = this.width / e, this.height / this._factor < i && (this._factor = this.height / i)) : this.height > this.width && this.height > e ? (this._factor = this.height / e, this.width / this._factor < i && (this._factor = this.width / i)) : this.width < this.height && this.width < i ? (this._factor = this.width / i, this.height / this._factor > e && (this._factor = this.height / e)) : this.height < this.width && this.height < i && (this._factor = this.height / i, this.width / this._factor > e && (this._factor = this.width / e)), this.width = this.width / this._factor, this.height = this.height / this._factor;
  }, m.prototype._getContainer = function (t, e, i) {
    var h = document.createElement("div");
    return i && h.setAttribute("id", i), h.setAttribute("style", "width: " + t + "px; height: " + e + "px; margin: 0px; display: none;"), document.body.appendChild(h), h;
  }, m.prototype.wgs84ToMercator = function (t) {
    return this._wmp.project(p.fromDegrees(t.x, t.y));
  }, m.prototype.wgs84ToMercatorBB = function (t) {
    var e = this._wmp.project(p.fromDegrees(t.east, t.north)),
        i = this._wmp.project(p.fromDegrees(t.west, t.south));

    return {
      north: e.y,
      south: i.y,
      east: e.x,
      west: i.x
    };
  }, m.prototype.mercatorToWgs84 = function (t) {
    var e = this._wmp.unproject(new g(t.x, t.y));

    return {
      x: e.longitude,
      y: e.latitude
    };
  }, m.prototype.mercatorToWgs84BB = function (t) {
    var e = this._wmp.unproject(new g(t.west, t.south)),
        i = this._wmp.unproject(new g(t.east, t.north));

    return {
      north: this.rad2deg(i.latitude),
      east: this.rad2deg(i.longitude),
      south: this.rad2deg(e.latitude),
      west: this.rad2deg(e.longitude)
    };
  }, m.prototype.deg2rad = function (t) {
    return t * (Math.PI / 180);
  }, m.prototype.rad2deg = function (t) {
    return t / (Math.PI / 180);
  }, m.prototype.wgs84PointToHeatmapPoint = function (t) {
    return this.mercatorPointToHeatmapPoint(this.wgs84ToMercator(t));
  }, m.prototype.mercatorPointToHeatmapPoint = function (t) {
    var e = {};
    return e.x = Math.round((t.x - this._xoffset) / this._factor + this._spacing), e.y = Math.round((t.y - this._yoffset) / this._factor + this._spacing), e.y = this.height - e.y, e;
  }, m.prototype.setData = function (t, e, i) {
    return !!(i && 0 < i.length && null !== t && !1 !== t && null !== e && !1 !== e) && (this._heatmap.setData({
      min: t,
      max: e,
      data: i
    }), !0);
  }, m.prototype.setWGS84Data = function (t, e, i) {
    if (i && 0 < i.length && null !== t && !1 !== t && null !== e && !1 !== e) {
      for (var h = [], r = 0; r < i.length; r++) {
        var s = i[r],
            o = this.wgs84PointToHeatmapPoint(s);
        !s.value && 0 !== s.value || (o.value = s.value), h.push(o);
      }

      return this.setData(t, e, h);
    }

    return !1;
  }, m.prototype.getTileCredits = function (t, e, i) {}, m.prototype.requestImage = function (t, e, i) {
    if (!this._ready) throw new o("requestImage must not be called before the imagery provider is ready.");
    return this._image;
  }, m.prototype.pickFeatures = function () {}, m;
});