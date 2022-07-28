"use strict";

define(["../../Source/Core/Rectangle", "../../Source/Core/Ellipsoid", "../../Source/Core/GeographicTilingScheme", "../../Source/Core/WebMercatorTilingScheme", "../../Source/Core/defaultValue", "../../Source/Core/defined", "../../Source/Core/defineProperties", "../../Source/Core/HeightmapTerrainData", "../../Source/Core/TerrainProvider", "../../Source/Core/Resource", "../../Source/Core/getImagePixels", "../../Source/Core/DeveloperError", "../../Source/Core/Credit", "../../Source/Core/Event", "../../Source/Core/createGuid", "../../Source/ThirdParty/when"], function (e, t, r, a, i, n, o, l, h, g, s, u, m, f, c, p) {
  var d = g.fetchImage,
      S = g.fetchXML,
      y = g.fetchArrayBuffer,
      M = {},
      v = function v(t, r) {
    var a = Math.max(t.west, r.west),
        i = Math.min(t.east, r.east),
        n = Math.max(t.south, r.south),
        o = Math.min(t.north, r.north);
    return i <= a || n >= o ? void 0 : new e(a, n, i, o);
  };

  M.CRS = [{
    name: "CRS:84",
    ellipsoid: t.WGS84,
    firstAxeIsLatitude: !1,
    tilingScheme: r,
    supportedCRS: "urn:ogc:def:crs:OGC:2:84"
  }, {
    name: "EPSG:4326",
    ellipsoid: t.WGS84,
    firstAxeIsLatitude: !0,
    tilingScheme: r,
    SupportedCRS: "urn:ogc:def:crs:EPSG::4326"
  }, {
    name: "EPSG:3857",
    ellipsoid: t.WGS84,
    firstAxeIsLatitude: !1,
    tilingScheme: a,
    SupportedCRS: "urn:ogc:def:crs:EPSG::3857"
  }, {
    name: "OSGEO:41001",
    ellipsoid: t.WGS84,
    firstAxeIsLatitude: !1,
    tilingScheme: a,
    SupportedCRS: "urn:ogc:def:crs:EPSG::3857"
  }], M.FormatImage = [{
    format: "image/png",
    extension: "png"
  }, {
    format: "image/jpeg",
    extension: "jpg"
  }, {
    format: "image/jpeg",
    extension: "jpeg"
  }, {
    format: "image/gif",
    extension: "gif"
  }, {
    format: "image/png; mode=8bit",
    extension: "png"
  }], M.FormatArray = [{
    format: "image/bil",
    postProcessArray: function postProcessArray(e, t, r, a, i) {
      var n,
          o = new DataView(e),
          l = new ArrayBuffer(t.height * t.width * 2),
          h = new DataView(l);

      if (l.byteLength === e.byteLength) {
        for (var g, s = 0, u = 0, m = 0; m < l.byteLength; m += 2) {
          if ((g = o.getInt16(m, !1) - i) > a && g < r) h.setInt16(m, g, !0), u += g, s++;else {
            var f = 0 === s ? 1 : u / s;
            h.setInt16(m, f, !0);
          }
        }

        n = new Int16Array(l);
      }

      return n;
    }
  }], M.WMSParser = {}, M.TMSParser = {}, M.WMTSParser = {}, M.parser = function (e) {
    var t;

    switch ((e = i(e, i.EMPTY_OBJECT)).service) {
      case "TMS":
        t = M.TMSParser.generate(e);
        break;

      case "WMTS":
        t = M.WMTSParser.generate(e);
        break;

      default:
        t = M.WMSParser.generate(e);
    }

    return t;
  }, M.WMSParser.generate = function (e) {
    var t;

    if (e = i(e, i.EMPTY_OBJECT), n(e.url)) {
      var r = e.url,
          a = r.lastIndexOf("?");
      a > -1 && (r = r.substring(0, a));
      var o = r + "?SERVICE=WMS&REQUEST=GetCapabilities&tiled=true";
      n(e.proxy) && (o = e.proxy.getURL(o)), t = p(S(o), function (t) {
        return M.WMSParser.getMetaDatafromXML(t, e);
      });
    } else {
      if (!n(e.xml)) throw new u("either description.url or description.xml are required.");
      t = M.WMSParser.getMetaDatafromXML(e.xml, e);
    }

    return t;
  }, M.WMSParser.getMetaDatafromXML = function (t, r) {
    if (!(t instanceof XMLDocument)) throw new u("xml must be a XMLDocument");
    if (!n(r.layerName)) throw new u("description.layerName is required.");
    var a = {},
        o = r.layerName,
        l = i(r.maxLevel, 11),
        h = void 0;
    a.heightMapWidth = i(r.heightMapWidth, 65), a.heightMapHeight = i(r.heightMapHeight, a.heightMapWidth);
    var g = {
      width: 65,
      height: 65
    },
        s = void 0;
    a.formatImage = r.formatImage, a.formatArray = r.formatArray, a.tilingScheme = void 0;
    var m = void 0,
        f = void 0;
    a.ready = !1, a.levelZeroMaximumGeometricError = void 0, a.waterMask = i(r.waterMask, !1), "boolean" != typeof a.waterMask && (a.waterMask = !1), a.offset = i(r.offset, 0), a.highest = i(r.highest, 12e3), a.lowest = i(r.lowest, -500);
    var c = r.styleName;
    a.hasStyledImage = i(r.hasStyledImage, "string" == typeof r.styleName);
    var p = t.querySelector("[version]");
    null !== p && (h = p.getAttribute("version"), f = /^1\.[3-9]\./.test(h));
    var d = t.querySelector("Request>GetMap OnlineResource").getAttribute("xlink:href"),
        S = d.indexOf("?");
    S > -1 && (d = d.substring(0, S)), n(r.proxy) && (d = r.proxy.getURL(d));
    var y = t.querySelectorAll("Request>GetMap>Format");
    if (!n(a.formatImage)) for (var x = 0; x < y.length && !n(a.formatArray); x++) {
      (w = M.FormatArray.filter(function (e) {
        return e.format === y[x].textContent;
      })).length > 0 && (a.formatArray = w[0]);
    }
    n(a.formatArray) && "string" == typeof a.formatArray.format && "function" == typeof a.formatArray.postProcessArray ? a.formatArray.terrainDataStructure = {
      heightScale: 1,
      heightOffset: 0,
      elementsPerHeight: 1,
      stride: 1,
      elementMultiplier: 256,
      isBigEndian: !1,
      lowestEncodedHeight: 0,
      highestEncodedHeight: 1e4
    } : a.formatArray = void 0;

    for (x = 0; x < y.length && !n(a.formatImage); x++) {
      var w;
      (w = M.FormatImage.filter(function (e) {
        return e.format === y[x].textContent;
      })).length > 0 && (a.formatImage = w[0]);
    }

    n(a.formatImage) && "string" == typeof a.formatImage.format ? a.formatImage.terrainDataStructure = {
      heightScale: 1,
      heightOffset: 0,
      elementsPerHeight: 2,
      stride: 4,
      elementMultiplier: 256,
      isBigEndian: !0,
      lowestEncodedHeight: 0,
      highestEncodedHeight: 1e4
    } : a.formatImage = void 0;

    for (var T, A = t.querySelectorAll("Layer[queryable='1'],Layer[queryable='true']"), I = 0; I < A.length && !n(T); I++) {
      if (A[I].querySelector("Name").textContent === o) {
        var C = (T = A[I]).getAttribute("fixedHeight"),
            b = T.getAttribute("fixedWidth");
        n(C) && (C = parseInt(C), a.heightMapHeight = C > 0 && C < a.heightMapHeight ? C : a.heightMapHeight, g.height = C > 0 ? C : g.height), n(b) && (b = parseInt(b), a.heightMapWidth = b > 0 && b < a.heightMapWidth ? b : a.heightMapWidth, g.width = b > 0 ? b : g.width);
      }
    }

    if (n(T) && n(h)) {
      for (var L = !1, R = 0; R < M.CRS.length && !L; R++) {
        var W = M.CRS[R],
            H = W.name,
            q = T.querySelector("BoundingBox[SRS='" + H + "'],BoundingBox[CRS='" + H + "']");

        if (null !== q) {
          var D, P, E, k;
          s = H, m = W.firstAxeIsLatitude, a.tilingScheme = new W.tilingScheme({
            ellipsoid: W.ellipsoid
          }), m && f ? (D = parseFloat(q.getAttribute("miny")), P = parseFloat(q.getAttribute("maxy")), E = parseFloat(q.getAttribute("minx")), k = parseFloat(q.getAttribute("maxx"))) : (D = parseFloat(q.getAttribute("minx")), P = parseFloat(q.getAttribute("maxx")), E = parseFloat(q.getAttribute("miny")), k = parseFloat(q.getAttribute("maxy")));
          var N = new e(D, E, P, k);
          a.getTileDataAvailable = function (e, t, r) {
            var i = !1,
                o = a.tilingScheme.tileXYToNativeRectangle(e, t, r);

            if (r < l) {
              var h = v(N, o);
              i = n(h);
            }

            return i;
          }, L = !0;
        }
      }

      if (n(c)) {
        for (var G = T.querySelectorAll("Style>Name"), F = !1, U = 0; U < G.length && !F; U++) {
          c === G[U].textContent && (F = !0);
        }

        F || (c = void 0);
      }

      for (var X = t.querySelectorAll("VendorSpecificCapabilities>TileSet"), O = !1, B = 0; B < X.length && !O; B++) {
        var V = null !== X[B].querySelector("BoundingBox[SRS='" + s + "'],BoundingBox[CRS='" + s + "']");
        X[B].querySelector("Layers").textContent === o && V && (g.width = parseInt(X[B].querySelector("Width").textContent), g.height = parseInt(X[B].querySelector("Height").textContent), O = !0);
      }

      a.ready = L && (n(a.formatImage) || n(a.formatArray)) && n(h);
    }

    if (a.ready) {
      var Y = d + "?SERVICE=WMS&REQUEST=GetMap&layers=" + o + "&version=" + h + "&bbox=";

      if (Y += f && m ? "{south},{west},{north},{east}" : "{west},{south},{east},{north}", Y += "&crs=" + s + "&srs=" + s, a.formatImage) {
        var _ = Y + "&format=" + a.formatImage.format + "&width=" + g.width + "&height=" + g.height;

        n(c) && (_ += "&styles=" + c + "&style=" + c), a.URLtemplateImage = function () {
          return _;
        }, a.imageSize = g;
      }

      if (a.formatArray) {
        var z = Y + "&format=" + a.formatArray.format + "&width=" + a.heightMapWidth + "&height=" + a.heightMapHeight;

        a.URLtemplateArray = function () {
          return z;
        };
      }
    }

    return a;
  }, M.TMSParser.generate = function (e) {
    var t;
    if (e = i(e, i.EMPTY_OBJECT), n(e.url)) t = S(e.url).then(function (t) {
      return M.TMSParser.parseXML(t, e);
    });else {
      if (!n(e.xml)) throw new u("either description.url or description.xml are required.");
      t = M.TMSParser.parseXML(e.xml, e);
    }
    return t;
  }, M.TMSParser.parseXML = function (e, t) {
    if (!(e instanceof XMLDocument)) throw new u("xml must be a XMLDocument");
    var r;

    if (null != e.querySelector("TileMapService")) {
      if (!n(t.layerName)) throw new u("layerName is required.");
      var a = [].slice.apply(e.querySelectorAll("TileMap[title='" + t.layerName + "']")).map(function (e) {
        var r = e.getAttribute("href");
        return n(t.proxy) && (r = t.proxy.getURL(r)), p(S(r), function (e) {
          return M.TMSParser.getMetaDatafromXML(e, t);
        });
      });
      r = p.all(a).then(function (e) {
        for (var t, r = 0; r < e.length && !n(t); r++) {
          n(e[r]) && (t = e[r]);
        }

        return t;
      }).then(function (e) {
        return e;
      });
    } else r = M.TMSParser.getMetaDatafromXML(e, t);

    return r;
  }, M.TMSParser.getMetaDatafromXML = function (t, r) {
    var a = {
      ready: !1
    };
    a.heightMapWidth = i(r.heightMapWidth, 65), a.heightMapHeight = i(r.heightMapHeight, a.heightMapWidth);
    var o = i(r.maxLevel, 11),
        l = r.proxy;
    a.hasStyledImage = i(r.hasStyledImage, "string" == typeof r.styleName), a.waterMask = i(r.waterMask, !1), "boolean" != typeof a.waterMask && (a.waterMask = !1), a.offset = i(r.offset, 0), a.highest = i(r.highest, 12e3), a.lowest = i(r.lowest, -500);
    var h = t.querySelector("SRS").textContent,
        g = M.CRS.filter(function (e) {
      return e.name === h;
    });
    g.length > 0 && (a.tilingScheme = new g[0].tilingScheme({
      ellipsoid: g[0].ellipsoid
    }));
    var s = t.querySelector("TileFormat"),
        u = M.FormatImage.filter(function (e) {
      return e.extension == s.getAttribute("extension");
    });
    u.length > 0 && (a.formatImage = u[0], a.imageSize = {}, a.imageSize.width = parseInt(s.getAttribute("width")), a.imageSize.height = parseInt(s.getAttribute("height")));
    var m = [].slice.call(t.querySelectorAll("TileSets>TileSet")),
        f = [];

    if (n(a.formatImage) && ((f = m.map(function (e) {
      var t = e.getAttribute("href") + "/{x}/{tmsY}." + a.formatImage.extension;
      return n(l) && (t = l.getURL(t)), {
        url: t,
        level: parseInt(e.getAttribute("order"))
      };
    })).sort(function (e, t) {
      return e.level - t.level;
    }), f.length > 0 && (a.tileSets = f)), n(a.tileSets) && n(a.formatImage) && n(a.tilingScheme)) {
      a.URLtemplateImage = function (e, t, r) {
        var a = "";
        return r < f.length && (a = f[r].url), a;
      };

      var c = t.querySelector("BoundingBox"),
          p = parseFloat(c.getAttribute("miny")),
          d = parseFloat(c.getAttribute("maxy")),
          S = parseFloat(c.getAttribute("minx")),
          y = parseFloat(c.getAttribute("maxx")),
          x = new e(S, p, y, d);
      a.getTileDataAvailable = function (e, t, r) {
        var i = a.tilingScheme.tileXYToNativeRectangle(e, t, r),
            l = v(x, i);
        return n(l) && r < o && r < f.length;
      }, a.ready = !0;
    } else a = void 0;

    return a;
  }, M.WMTSParser.generate = function (e) {
    var t;

    if (e = i(e, i.EMPTY_OBJECT), n(e.url)) {
      var r = e.url,
          a = r.lastIndexOf("?");
      a > -1 && (r = r.substring(0, a));
      var o = r + "?REQUEST=GetCapabilities";
      n(e.proxy) && (o = e.proxy.getURL(o)), t = S(o).then(function (t) {
        return M.WMTSParser.getMetaDatafromXML(t, e);
      });
    } else {
      if (!n(e.xml)) throw new u("either description.url or description.xml are required.");
      t = M.WMTSParser.getMetaDatafromXML(e.xml, e);
    }

    return t;
  }, M.WMTSParser.getMetaDatafromXML = function (e, t) {
    if (!(e instanceof XMLDocument)) throw new u("xml must be a XMLDocument");
    var r = {},
        a = t.layerName;
    r.ready = !1, r.heightMapWidth = i(t.heightMapWidth, 65), r.heightMapHeight = i(t.heightMapHeight, r.heightMapWidth);
    var o,
        l = i(t.maxLevel, 12),
        h = t.proxy,
        g = t.styleName;
    r.hasStyledImage = i(t.hasStyledImage, "string" == typeof t.styleName), r.waterMask = i(t.waterMask, !1), "boolean" != typeof r.waterMask && (r.waterMask = !1), r.offset = i(t.offset, 0), r.highest = i(t.highest, 12e3), r.lowest = i(t.lowest, -500);

    for (var s, m, f, c = [], p = [].slice.call(e.querySelectorAll('Operation[name="GetTile"] HTTP Get')).map(function (e) {
      var t,
          r = e.querySelector("Value").textContent;
      return "KVP" === r && (t = {
        node: e,
        type: "KVP"
      }), "RESTful" === r && (t = {
        node: e,
        type: "RESTful"
      }), t;
    }).filter(function (e) {
      return n(e);
    }), d = 0; d < p.length; d++) {
      var S = p[d];
      "RESTful" !== S.type || n(m) || (m = S.node.getAttribute("xlink:href"), n(h) && (m = h.getURL(m))), "KVP" !== S.type || n(s) || (s = S.node.getAttribute("xlink:href"), n(h) && (s = h.getURL(s)));
    }

    var y,
        v = e.querySelectorAll("Contents>Layer>Identifier");

    for (d = 0; d < v.length && !n(y); d++) {
      a === v[d].textContent && (y = v[d].parentNode);
    }

    if (n(y)) {
      var x,
          w,
          T = y.querySelectorAll("Style");

      for (d = 0; d < T.length; d++) {
        var A = T[d].querySelector("Identifier").textContent;
        null != T[d].getAttribute("isDefault") && (x = A), A === g && (w = A);
      }

      n(g) && g == w || (g = i(x, ""));

      for (var I = [].slice.call(y.querySelectorAll("Format")), C = 0; C < M.FormatImage.length && !n(f); C++) {
        I.filter(function (e) {
          return e.textContent === M.FormatImage[C].format;
        }).length > 0 && (f = M.FormatImage[C]);
      }

      c = y.querySelectorAll("TileMatrixSetLink");
    }

    for (var b = [].slice.call(e.querySelectorAll("TileMatrixSet>Identifier")), L = 0; L < c.length && !r.ready; L++) {
      var R,
          W,
          H = c[L],
          q = H.querySelector("TileMatrixSet").textContent;

      for (d = 0; d < b.length && !n(R); d++) {
        b[d].textContent === q && (R = b[d].parentNode);
      }

      for (var D = R.querySelector("SupportedCRS").textContent, P = 0; P < M.CRS.length && !n(W); P++) {
        M.CRS[P].SupportedCRS === D && (W = M.CRS[P]);
      }

      if (n(W)) {
        var E,
            k = [].slice.call(R.querySelectorAll("TileMatrix"));
        (E = k.map(function (e) {
          var t = e.querySelector("Identifier").textContent,
              r = parseInt(e.querySelector("MatrixWidth").textContent),
              a = parseInt(e.querySelector("MatrixHeight").textContent),
              i = parseInt(e.querySelector("TileWidth").textContent),
              n = parseInt(e.querySelector("TileHeight").textContent);
          return {
            id: t,
            maxWidth: r,
            maxHeight: a,
            scaleDenominator: parseFloat(e.querySelector("ScaleDenominator").textContent),
            complete: !1,
            tileWidth: i,
            tileHeight: n
          };
        })).sort(function (e, t) {
          return t.scaleDenominator - e.scaleDenominator;
        }), listTileMatrixLimits = H.querySelectorAll("TileMatrixSetLimits>TileMatrixLimits");

        for (var N = 0; N < E.length; N++) {
          for (var G = E[N], F = 0; F < listTileMatrixLimits.length; F++) {
            var U = listTileMatrixLimits[F];
            G.id === U.querySelector("TileMatrix").textContent && (G.minTileRow = parseInt(U.querySelector("MinTileRow").textContent), G.maxTileRow = parseInt(U.querySelector("MaxTileRow").textContent), G.minTileCol = parseInt(U.querySelector("MinTileCol").textContent), G.maxTileCol = parseInt(U.querySelector("MaxTileCol").textContent), G.complete = !0, E[N] = G);
          }
        }

        if (E.length > 0) {
          r.tilingScheme = new W.tilingScheme({
            ellipsoid: W.ellipsoid,
            numberOfLevelZeroTilesX: E[0].maxWidth,
            numberOfLevelZeroTilesY: E[0].maxHeight
          });
          var X = y.querySelector("ResourceURL[format='" + f.format + "']");

          if (null != X ? o = X.getAttribute("template").replace("{TileRow}", "{y}").replace("{TileCol}", "{x}").replace("{Style}", g).replace("{TileMatrixSet}", q).replace("{layer}", a).replace("{infoFormatExtension}", f.extension) : n(s) && (o = s + "service=WMTS&request=GetTile&version=1.0.0&layer=" + a + "&style=" + g + "&format=" + f.format + "&TileMatrixSet=" + q + "&TileMatrix={TileMatrix}&TileRow={y}&TileCol={x}"), n(o)) {
            r.getTileDataAvailable = function (e, t, r) {
              var a = !1;

              if (r < l && r < E.length) {
                var i = E[r];
                a = i.complete ? t <= i.maxTileRow && t >= i.minTileRow && e <= i.maxTileCol && e >= i.minTileCol : e < i.maxWidth && t < i.maxHeight;
              }

              return a;
            }, r.URLtemplateImage = function (e, t, a) {
              var i = "";

              if (r.getTileDataAvailable(e, t, a)) {
                var n = E[a];
                i = o.replace("{TileMatrix}", n.id);
              }

              return i;
            };
            var O = {
              width: E[0].tileWidth,
              height: E[0].tileHeight
            };
            0 == E.filter(function (e) {
              return e.tileWidth != O.width || e.tileHeight != O.height;
            }).length && (r.imageSize = O), r.ready = !0;
          }
        }
      }
    }

    return r;
  };

  var x = function x(e) {
    if (!n(e)) throw new u("description is required.");
    var t = new f(),
        r = e.url.lastIndexOf("/");
    e.layerName = e.url.substr(r + 1), e.url = e.url.substr(0, r), this.id = e.id || c(), e.heightMapWidth = e.heightMapWidth || 65, e.heightMapHeight = e.heightMapHeight || 65, e.maxLevel = e.maxLevel || 13, e.formatImage = e.formatImage || {
      format: "image/png",
      extension: "png"
    }, e.styleName = e.styleName || "grayToColor", e.hasStyledImage = e.hasStyledImage || !0, e.waterMask = e.waterMask || !1;
    var a = e.credit;
    "string" == typeof a && (a = new m(a)), this.ready = !1, this._readyPromise = p.defer(), o(this, {
      errorEvent: {
        get: function get() {
          return t;
        }
      },
      credit: {
        get: function get() {
          return a;
        }
      },
      hasVertexNormals: {
        get: function get() {
          return !1;
        }
      },
      readyPromise: {
        get: function get() {
          return this._readyPromise.promise;
        }
      }
    }), w(M.parser(e), this);
  };

  function w(e, t) {
    p(e, function (e) {
      n(e) && e.ready && (e.levelZeroMaximumGeometricError = h.getEstimatedLevelZeroGeometricErrorForAHeightmap(e.tilingScheme.ellipsoid, e.heightMapWidth, e.tilingScheme.getNumberOfXTilesAtLevel(0)), n(e.URLtemplateImage) && (e.getHeightmapTerrainDataImage = function (r, a, i) {
        var o;

        if (!isNaN(r + a + i)) {
          var h = T(e.URLtemplateImage(r, a, i), r, a, i, t),
              g = {
            highest: e.highest,
            lowest: e.lowest,
            offset: e.offset
          },
              s = A(r, a, i, t),
              u = d(h);
          n(u) && (o = p(u, function (t) {
            return x.imageToHeightmapTerrainData(t, g, {
              width: e.heightMapWidth,
              height: e.heightMapHeight
            }, e.waterMask, s, e.hasStyledImage);
          }).otherwise(function () {
            return new l({
              buffer: new Uint16Array(e.heightMapWidth * e.heightMapHeight),
              width: e.heightMapWidth,
              height: e.heightMapHeight,
              childTileMask: s,
              waterMask: new Uint8Array(e.heightMapWidth * e.heightMapHeight),
              structure: e.formatImage.terrainDataStructure
            });
          }));
        }

        return o;
      }), n(e.URLtemplateArray) && (e.getHeightmapTerrainDataArray = function (r, a, i) {
        var o;

        if (!isNaN(r + a + i)) {
          var h = T(e.URLtemplateArray(r, a, i), r, a, i, t),
              g = {
            highest: e.highest,
            lowest: e.lowest,
            offset: e.offset
          },
              s = A(r, a, i, t),
              u = y(h);
          n(u) && (o = p(u, function (t) {
            return x.arrayToHeightmapTerrainData(t, g, {
              width: e.heightMapWidth,
              height: e.heightMapHeight
            }, e.formatArray, e.waterMask, s);
          }).otherwise(function () {
            return n(e.getHeightmapTerrainDataImage) ? e.getHeightmapTerrainDataImage(r, a, i) : new l({
              buffer: new Uint16Array(e.heightMapWidth * e.heightMapHeight),
              width: e.heightMapWidth,
              height: e.heightMapHeight,
              childTileMask: s,
              waterMask: new Uint8Array(e.heightMapWidth * e.heightMapHeight),
              structure: e.formatImage.terrainDataStructure
            });
          }));
        }

        return o;
      }), t.getLevelMaximumGeometricError = function (t) {
        return e.levelZeroMaximumGeometricError / (1 << t);
      }, t.requestTileGeometry = function (t, r, a) {
        var i;
        return n(e.getHeightmapTerrainDataArray) ? i = e.getHeightmapTerrainDataArray(t, r, a) : n(e.getHeightmapTerrainDataImage) && (i = e.getHeightmapTerrainDataImage(t, r, a)), i;
      }, o(t, {
        tilingScheme: {
          get: function get() {
            return e.tilingScheme;
          }
        },
        ready: {
          get: function get() {
            return e.ready;
          }
        },
        hasWaterMask: {
          get: function get() {
            return e.waterMask;
          }
        },
        heightMapHeight: {
          get: function get() {
            return e.heightMapHeight;
          }
        },
        heightMapWidth: {
          get: function get() {
            return e.heightMapWidth;
          }
        },
        getTileDataAvailable: {
          get: function get() {
            return e.getTileDataAvailable;
          }
        }
      })), t._readyPromise.resolve(e.ready);
    });
  }

  function T(e, t, r, a, i) {
    var n = i.tilingScheme.tileXYToNativeRectangle(t, r, a),
        o = (n.east - n.west) / (i.heightMapWidth - 1),
        l = (n.north - n.south) / (i.heightMapHeight - 1);
    n.west -= .5 * o, n.east += .5 * o, n.south -= .5 * l, n.north += .5 * l;
    var h = i.tilingScheme.getNumberOfYTilesAtLevel(a) - r - 1;
    return e.replace("{south}", n.south).replace("{north}", n.north).replace("{west}", n.west).replace("{east}", n.east).replace("{x}", t).replace("{y}", r).replace("{tmsY}", h);
  }

  function A(e, t, r, a) {
    var i = 0,
        n = r + 1;
    return i |= a.getTileDataAvailable(2 * e, 2 * t, n) ? 1 : 0, i |= a.getTileDataAvailable(2 * e + 1, 2 * t, n) ? 2 : 0, i |= a.getTileDataAvailable(2 * e, 2 * t + 1, n) ? 4 : 0, i |= a.getTileDataAvailable(2 * e + 1, 2 * t + 1, n) ? 8 : 0;
  }

  return x.arrayToHeightmapTerrainData = function (e, t, r, a, i, o) {
    "number" == typeof r && (r = {
      width: r,
      height: r
    });
    var h = a.postProcessArray(e, r, t.highest, t.lowest, t.offset);
    if (!n(h)) throw new u("no good size");
    var g = {
      buffer: h,
      width: r.width,
      height: r.height,
      childTileMask: o,
      structure: a.terrainDataStructure
    };

    if (i) {
      for (var s = new Uint8Array(h.length), m = 0; m < h.length; m++) {
        h[m] <= 0 && (s[m] = 255);
      }

      g.waterMask = s;
    }

    return new l(g);
  }, x.imageToHeightmapTerrainData = function (e, t, r, a, i, n) {
    "number" == typeof r && (r = {
      width: r,
      height: r
    });

    for (var o = s(e, r.width, r.height), h = new Uint8Array(o.length / 4), g = new Int16Array(o.length / 4), u = 0, m = 0, f = 0; f < o.length; f += 4) {
      var c = o[f],
          p = o[f + 1],
          d = o[f + 2] > 128,
          S = (c << 8 | p) - t.offset - 32768;
      S > t.lowest && S < t.highest && (d || n) ? (g[f / 4] = S, m += S, u++) : g[f / 4] = 0 == u ? 0 : m / u;
    }

    var y = {
      buffer: g,
      width: r.width,
      height: r.height,
      childTileMask: i,
      structure: {
        heightScale: 1,
        heightOffset: 0,
        elementsPerHeight: 1,
        stride: 1,
        elementMultiplier: 256,
        isBigEndian: !1
      }
    };

    if (a) {
      for (h = new Uint8Array(g.length), f = 0; f < g.length; f++) {
        g[f] <= 0 && (h[f] = 255);
      }

      y.waterMask = h;
    }

    return new l(y);
  }, x;
});