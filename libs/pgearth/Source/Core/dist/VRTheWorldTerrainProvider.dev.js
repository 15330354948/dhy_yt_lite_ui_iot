"use strict";

define(["../ThirdParty/when", "./Credit", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid", "./Event", "./GeographicTilingScheme", "./getImagePixels", "./HeightmapTerrainData", "./Math", "./Rectangle", "./Resource", "./TerrainProvider", "./TileProviderError"], function (s, o, l, d, e, h, u, f, p, g, c, v, _, y, E, T) {
  "use strict";

  function w(e, t) {
    this.rectangle = e, this.maxLevel = t;
  }

  function t(e) {
    if (e = l(e, l.EMPTY_OBJECT), !d(e.url)) throw new h("options.url is required.");
    var t = y.createIfNeeded(e.url);
    this._resource = t, this._errorEvent = new f(), this._ready = !1, this._readyPromise = s.defer(), this._terrainDataStructure = {
      heightScale: .001,
      heightOffset: -1e3,
      elementsPerHeight: 3,
      stride: 4,
      elementMultiplier: 256,
      isBigEndian: !0,
      lowestEncodedHeight: 0,
      highestEncodedHeight: 16777215
    };
    var r = e.credit;
    "string" == typeof r && (r = new o(r)), this._credit = r, this._tilingScheme = void 0, this._rectangles = [];
    var i,
        g = this,
        c = l(e.ellipsoid, u.WGS84);

    function n(e) {
      var t = e.getElementsByTagName("SRS")[0].textContent;

      if ("EPSG:4326" === t) {
        g._tilingScheme = new p({
          ellipsoid: c
        });
        var r = e.getElementsByTagName("TileFormat")[0];
        g._heightmapWidth = parseInt(r.getAttribute("width"), 10), g._heightmapHeight = parseInt(r.getAttribute("height"), 10), g._levelZeroMaximumGeometricError = E.getEstimatedLevelZeroGeometricErrorForAHeightmap(c, Math.min(g._heightmapWidth, g._heightmapHeight), g._tilingScheme.getNumberOfXTilesAtLevel(0));

        for (var i = e.getElementsByTagName("DataExtent"), n = 0; n < i.length; ++n) {
          var a = i[n],
              o = v.toRadians(parseFloat(a.getAttribute("minx"))),
              s = v.toRadians(parseFloat(a.getAttribute("miny"))),
              l = v.toRadians(parseFloat(a.getAttribute("maxx"))),
              h = v.toRadians(parseFloat(a.getAttribute("maxy"))),
              u = parseInt(a.getAttribute("maxlevel"), 10);

          g._rectangles.push(new w(new _(o, s, l, h), u));
        }

        g._ready = !0, g._readyPromise.resolve(!0);
      } else m("SRS " + t + " is not supported.");
    }

    function m(e) {
      var t = l(e, "An error occurred while accessing " + g._resource.url + ".");
      i = T.handleError(i, g, g._errorEvent, t, void 0, void 0, void 0, a);
    }

    function a() {
      s(g._resource.fetchXML(), n, m);
    }

    a();
  }

  e(t.prototype, {
    errorEvent: {
      get: function get() {
        return this._errorEvent;
      }
    },
    credit: {
      get: function get() {
        return this._credit;
      }
    },
    tilingScheme: {
      get: function get() {
        if (!this.ready) throw new h("requestTileGeometry must not be called before ready returns true.");
        return this._tilingScheme;
      }
    },
    ready: {
      get: function get() {
        return this._ready;
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise.promise;
      }
    },
    hasWaterMask: {
      get: function get() {
        return !1;
      }
    },
    hasVertexNormals: {
      get: function get() {
        return !1;
      }
    }
  }), t.prototype.requestTileGeometry = function (t, r, i, e) {
    if (!this.ready) throw new h("requestTileGeometry must not be called before ready returns true.");

    var n = this._tilingScheme.getNumberOfYTilesAtLevel(i),
        a = this._resource.getDerivedResource({
      url: i + "/" + t + "/" + (n - r - 1) + ".tif",
      queryParameters: {
        pgEarth: !0
      },
      request: e
    }).fetchImage({
      preferImageBitmap: !0
    });

    if (d(a)) {
      var o = this;
      return s(a).then(function (e) {
        return new c({
          buffer: g(e),
          width: o._heightmapWidth,
          height: o._heightmapHeight,
          childTileMask: function (e, t, r, i) {
            for (var n = e._tilingScheme, a = e._rectangles, o = n.tileXYToRectangle(t, r, i), s = 0, l = 0; l < a.length && 15 !== s; ++l) {
              var h,
                  u,
                  g = a[l];
              g.maxLevel <= i || (h = g.rectangle, u = _.intersection(h, o, m), d(u) && (b(n, h, 2 * t, 2 * r, i + 1) && (s |= 4), b(n, h, 2 * t + 1, 2 * r, i + 1) && (s |= 8), b(n, h, 2 * t, 2 * r + 1, i + 1) && (s |= 1), b(n, h, 2 * t + 1, 2 * r + 1, i + 1) && (s |= 2)));
            }

            return s;
          }(o, t, r, i),
          structure: o._terrainDataStructure
        });
      });
    }
  }, t.prototype.getLevelMaximumGeometricError = function (e) {
    if (!this.ready) throw new h("requestTileGeometry must not be called before ready returns true.");
    return this._levelZeroMaximumGeometricError / (1 << e);
  };
  var m = new _();

  function b(e, t, r, i, n) {
    var a = e.tileXYToRectangle(r, i, n);
    return d(_.intersection(a, t, m));
  }

  return t.prototype.getTileDataAvailable = function (e, t, r) {}, t.prototype.loadTileDataAvailability = function (e, t, r) {}, t;
});