"use strict";

define(["../../Core/Rectangle", "../../Core/Ellipsoid", "../../Core/GeographicTilingScheme", "../../Core/WebMercatorTilingScheme", "../../Core/defaultValue", "../../Core/defined", "../../Core/defineProperties", "../../Core/HeightmapTerrainData", "../../Core/TerrainProvider", "../../Core/getImagePixels", "../../Core/DeveloperError", "../../Core/Credit", "../../Core/Event", "../../Core/createGuid", "../../ThirdParty/when", "../../Core/Resource"], function (B, e, t, r, O, Y, n, y, o, M, V, l, h, _, s, u) {
  function z(e, t) {
    var r = Math.max(e.west, t.west),
        a = Math.min(e.east, t.east),
        i = Math.max(e.south, t.south),
        n = Math.min(e.north, t.north),
        o = a <= r || n <= i ? void 0 : new B(r, i, a, n);
    return o;
  }

  var Z = {};
  Z.CRS = [{
    name: "CRS:84",
    ellipsoid: e.WGS84,
    firstAxeIsLatitude: !1,
    tilingScheme: t,
    supportedCRS: "urn:ogc:def:crs:OGC:2:84"
  }, {
    name: "EPSG:4326",
    ellipsoid: e.WGS84,
    firstAxeIsLatitude: !0,
    tilingScheme: t,
    SupportedCRS: "urn:ogc:def:crs:EPSG::4326"
  }, {
    name: "EPSG:3857",
    ellipsoid: e.WGS84,
    firstAxeIsLatitude: !1,
    tilingScheme: r,
    SupportedCRS: "urn:ogc:def:crs:EPSG::3857"
  }, {
    name: "OSGEO:41001",
    ellipsoid: e.WGS84,
    firstAxeIsLatitude: !1,
    tilingScheme: r,
    SupportedCRS: "urn:ogc:def:crs:EPSG::3857"
  }], Z.FormatImage = [{
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
  }], Z.FormatArray = [{
    format: "image/bil",
    postProcessArray: function postProcessArray(e, t, r, a, i) {
      var n,
          o = new DataView(e),
          l = new ArrayBuffer(t.height * t.width * 2),
          h = new DataView(l);

      if (l.byteLength === e.byteLength) {
        for (var g, s, u = 0, m = 0, f = 0; f < l.byteLength; f += 2) {
          a < (s = o.getInt16(f, !1) - i) && s < r ? (h.setInt16(f, s, !0), m += s, u++) : (g = 0 === u ? 1 : m / u, h.setInt16(f, g, !0));
        }

        n = new Int16Array(l);
      }

      return n;
    }
  }], Z.WMSParser = {}, Z.TMSParser = {}, Z.WMTSParser = {}, Z.parser = function (e) {
    var t;

    switch ((e = O(e, O.EMPTY_OBJECT)).service) {
      case "TMS":
        t = Z.TMSParser.generate(e);
        break;

      case "WMTS":
        t = Z.WMTSParser.generate(e);
        break;

      default:
        t = Z.WMSParser.generate(e);
    }

    return t;
  }, Z.WMSParser.generate = function (t) {
    var e;

    if (t = O(t, O.EMPTY_OBJECT), Y(t.url)) {
      var r = t.url,
          a = r.lastIndexOf("?");
      -1 < a && (r = r.substring(0, a));
      var i = r + "?SERVICE=WMS&REQUEST=GetCapabilities";
      Y(t.proxy) && (i = t.proxy.getURL(i)), i = t.url + "/xml?serviceName=" + t.layerName, e = s(u.fetchXML({
        url: i
      }), function (e) {
        return Z.WMSParser.getMetaDatafromXML(e, t);
      });
    } else {
      if (!Y(t.xml)) throw new V("either description.url or description.xml are required.");
      e = Z.WMSParser.getMetaDatafromXML(t.xml, t);
    }

    return e;
  }, Z.WMSParser.getMetaDatafromXML = function (e, t) {
    if (!(e instanceof XMLDocument)) throw new V("xml must be a XMLDocument");
    if (!Y(t.layerName)) throw new V("description.layerName is required.");
    var o = {},
        r = t.layerName,
        l = O(t.maxLevel, 11),
        a = void 0;
    o.heightMapWidth = O(t.heightMapWidth, 65), o.heightMapHeight = O(t.heightMapHeight, o.heightMapWidth);
    var i = {
      width: 65,
      height: 65
    },
        n = void 0;
    o.formatImage = t.formatImage, o.formatArray = t.formatArray;
    var h = o.tilingScheme = void 0,
        g = void 0;
    o.ready = !1, o.levelZeroMaximumGeometricError = void 0, o.waterMask = O(t.waterMask, !1), "boolean" != typeof o.waterMask && (o.waterMask = !1), o.offset = O(t.offset, 0), o.highest = O(t.highest, 12e3), o.lowest = O(t.lowest, -500);
    var s = t.styleName;
    o.hasStyledImage = O(t.hasStyledImage, "string" == typeof t.styleName);
    var u = e.querySelector("[version]");
    null !== u && (a = u.getAttribute("version"), g = /^1\.[3-9]\./.test(a));
    var m = t.url,
        f = m.indexOf("?");
    -1 < f && (m = m.substring(0, f)), Y(t.proxy) && (m = t.proxy.getURL(m));
    var c = e.querySelectorAll("Request>GetMap>Format");
    if (!Y(o.formatImage)) for (var p = 0; p < c.length && !Y(o.formatArray); p++) {
      0 < (d = Z.FormatArray.filter(function (e) {
        return e.format === c[p].textContent;
      })).length && (o.formatArray = d[0]);
    }
    Y(o.formatArray) && "string" == typeof o.formatArray.format && "function" == typeof o.formatArray.postProcessArray ? o.formatArray.terrainDataStructure = {
      heightScale: 1,
      heightOffset: 0,
      elementsPerHeight: 1,
      stride: 1,
      elementMultiplier: 256,
      isBigEndian: !1,
      lowestEncodedHeight: 0,
      highestEncodedHeight: 1e4
    } : o.formatArray = void 0;

    for (var d, p = 0; p < c.length && !Y(o.formatImage); p++) {
      0 < (d = Z.FormatImage.filter(function (e) {
        return e.format === c[p].textContent;
      })).length && (o.formatImage = d[0]);
    }

    Y(o.formatImage) && "string" == typeof o.formatImage.format ? o.formatImage.terrainDataStructure = {
      heightScale: 1,
      heightOffset: 0,
      elementsPerHeight: 2,
      stride: 4,
      elementMultiplier: 256,
      isBigEndian: !0,
      lowestEncodedHeight: 0,
      highestEncodedHeight: 1e4
    } : o.formatImage = void 0;

    for (var y, M, S, x, v, w, T = e.querySelectorAll("Layer[queryable='1'],Layer[queryable='true']"), A = 0; A < T.length && !Y(y); A++) {
      T[A].querySelector("Name").textContent === r && (M = (y = T[A]).getAttribute("fixedHeight"), S = y.getAttribute("fixedWidth"), Y(M) && (M = parseInt(M), o.heightMapHeight = 0 < M && M < o.heightMapHeight ? M : o.heightMapHeight, i.height = 0 < M ? M : i.height), Y(S) && (S = parseInt(S), o.heightMapWidth = 0 < S && S < o.heightMapWidth ? S : o.heightMapWidth, i.width = 0 < S ? S : i.width));
    }

    if (Y(y) && Y(a)) {
      for (var I = !1, C = 0; C < Z.CRS.length && !I; C++) {
        var b,
            L,
            W,
            R,
            H,
            q = Z.CRS[C],
            D = q.name,
            P = y.querySelector("BoundingBox[SRS='" + D + "'],BoundingBox[CRS='" + D + "']");
        null !== P && (n = D, h = q.firstAxeIsLatitude, o.tilingScheme = new q.tilingScheme({
          ellipsoid: q.ellipsoid
        }), R = h && g ? (b = parseFloat(P.getAttribute("miny")), L = parseFloat(P.getAttribute("maxy")), W = parseFloat(P.getAttribute("minx")), parseFloat(P.getAttribute("maxx"))) : (b = parseFloat(P.getAttribute("minx")), L = parseFloat(P.getAttribute("maxx")), W = parseFloat(P.getAttribute("miny")), parseFloat(P.getAttribute("maxy"))), H = new B(b, W, L, R), o.getTileDataAvailable = function (e, t, r) {
          var a,
              i = !1,
              n = o.tilingScheme.tileXYToNativeRectangle(e, t, r);
          return r < l && (a = z(H, n), i = Y(a)), i;
        }, I = !0);
      }

      if (Y(s)) {
        for (var E = y.querySelectorAll("Style>Name"), k = !1, N = 0; N < E.length && !k; N++) {
          s === E[N].textContent && (k = !0);
        }

        k || (s = void 0);
      }

      for (var X = e.querySelectorAll("VendorSpecificCapabilities>TileSet"), F = !1, G = 0; G < X.length && !F; G++) {
        var U = null !== X[G].querySelector("BoundingBox[SRS='" + n + "'],BoundingBox[CRS='" + n + "']");
        X[G].querySelector("Layers").textContent === r && U && (i.width = parseInt(X[G].querySelector("Width").textContent), i.height = parseInt(X[G].querySelector("Height").textContent), F = !0);
      }

      o.ready = I && (Y(o.formatImage) || Y(o.formatArray)) && Y(a);
    }

    return o.ready && (x = m + "/" + r + "?request=GetMap&bbox=", x += g && h ? "{south},{west},{north},{east}" : "{west},{south},{east},{north}", x += "&uuid=" + _(), o.formatImage && (v = x, Y(s) && (v += "&styles=" + s + "&style=" + s), o.URLtemplateImage = function () {
      return v;
    }, o.imageSize = i), o.formatArray && (w = x + "&format=" + o.formatArray.format + "&width=" + o.heightMapWidth + "&height=" + o.heightMapHeight, o.URLtemplateArray = function () {
      return w;
    })), o;
  }, Z.TMSParser.generate = function (t) {
    var e;
    if (t = O(t, O.EMPTY_OBJECT), Y(t.url)) e = loadXML(t.url).then(function (e) {
      return Z.TMSParser.parseXML(e, t);
    });else {
      if (!Y(t.xml)) throw new V("either description.url or description.xml are required.");
      e = Z.TMSParser.parseXML(t.xml, t);
    }
    return e;
  }, Z.TMSParser.parseXML = function (e, r) {
    if (!(e instanceof XMLDocument)) throw new V("xml must be a XMLDocument");

    if (null != e.querySelector("TileMapService")) {
      if (!Y(r.layerName)) throw new V("layerName is required.");
      var t = [].slice.apply(e.querySelectorAll("TileMap[title='" + r.layerName + "']")).map(function (e) {
        var t = e.getAttribute("href");
        return Y(r.proxy) && (t = r.proxy.getURL(t)), s(loadXML(t), function (e) {
          return Z.TMSParser.getMetaDatafromXML(e, r);
        });
      }),
          a = s.all(t).then(function (e) {
        for (var t, r = 0; r < e.length && !Y(t); r++) {
          Y(e[r]) && (t = e[r]);
        }

        return t;
      }).then(function (e) {
        return e;
      });
    } else a = Z.TMSParser.getMetaDatafromXML(e, r);

    return a;
  }, Z.TMSParser.getMetaDatafromXML = function (e, t) {
    var n = {
      ready: !1
    };
    n.heightMapWidth = O(t.heightMapWidth, 65), n.heightMapHeight = O(t.heightMapHeight, n.heightMapWidth);
    var o = O(t.maxLevel, 11),
        r = t.proxy;
    n.hasStyledImage = O(t.hasStyledImage, "string" == typeof t.styleName), n.waterMask = O(t.waterMask, !1), "boolean" != typeof n.waterMask && (n.waterMask = !1), n.offset = O(t.offset, 0), n.highest = O(t.highest, 12e3), n.lowest = O(t.lowest, -500);
    var a = e.querySelector("SRS").textContent,
        i = Z.CRS.filter(function (e) {
      return e.name === a;
    });
    0 < i.length && (n.tilingScheme = new i[0].tilingScheme({
      ellipsoid: i[0].ellipsoid
    }));
    var l = e.querySelector("TileFormat"),
        h = Z.FormatImage.filter(function (e) {
      return e.extension == l.getAttribute("extension");
    });
    0 < h.length && (n.formatImage = h[0], n.imageSize = {}, n.imageSize.width = parseInt(l.getAttribute("width")), n.imageSize.height = parseInt(l.getAttribute("height")));
    var g,
        s,
        u,
        m,
        f,
        c,
        p = [].slice.call(e.querySelectorAll("TileSets>TileSet")),
        d = [];
    return Y(n.formatImage) && ((d = p.map(function (e) {
      var t = e.getAttribute("href") + "/{x}/{tmsY}." + n.formatImage.extension;
      return Y(r) && (t = r.getURL(t)), {
        url: t,
        level: parseInt(e.getAttribute("order"))
      };
    })).sort(function (e, t) {
      return e.level - t.level;
    }), 0 < d.length && (n.tileSets = d)), Y(n.tileSets) && Y(n.formatImage) && Y(n.tilingScheme) ? (n.URLtemplateImage = function (e, t, r) {
      var a = "";
      return r < d.length && (a = d[r].url), a;
    }, g = e.querySelector("BoundingBox"), s = parseFloat(g.getAttribute("miny")), u = parseFloat(g.getAttribute("maxy")), m = parseFloat(g.getAttribute("minx")), f = parseFloat(g.getAttribute("maxx")), c = new B(m, s, f, u), n.getTileDataAvailable = function (e, t, r) {
      var a = n.tilingScheme.tileXYToNativeRectangle(e, t, r),
          i = z(c, a);
      return Y(i) && r < o && r < d.length;
    }, n.ready = !0) : n = void 0, n;
  }, Z.WMTSParser.generate = function (t) {
    var e;

    if (t = O(t, O.EMPTY_OBJECT), Y(t.url)) {
      var r = t.url,
          a = r.lastIndexOf("?");
      -1 < a && (r = r.substring(0, a));
      var i = r + "?REQUEST=GetCapabilities";
      Y(t.proxy) && (i = t.proxy.getURL(i)), e = loadXML(i).then(function (e) {
        return Z.WMTSParser.getMetaDatafromXML(e, t);
      });
    } else {
      if (!Y(t.xml)) throw new V("either description.url or description.xml are required.");
      e = Z.WMTSParser.getMetaDatafromXML(t.xml, t);
    }

    return e;
  }, Z.WMTSParser.getMetaDatafromXML = function (e, t) {
    if (!(e instanceof XMLDocument)) throw new V("xml must be a XMLDocument");
    var n = {},
        r = t.layerName;
    n.ready = !1, n.heightMapWidth = O(t.heightMapWidth, 65), n.heightMapHeight = O(t.heightMapHeight, n.heightMapWidth);
    var o,
        l = O(t.maxLevel, 12),
        a = t.proxy,
        i = t.styleName;
    n.hasStyledImage = O(t.hasStyledImage, "string" == typeof t.styleName), n.waterMask = O(t.waterMask, !1), "boolean" != typeof n.waterMask && (n.waterMask = !1), n.offset = O(t.offset, 0), n.highest = O(t.highest, 12e3), n.lowest = O(t.lowest, -500);

    for (var h, g, s, u = [], m = [].slice.call(e.querySelectorAll('Operation[name="GetTile"] HTTP Get')).map(function (e) {
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
      return Y(e);
    }), f = 0; f < m.length; f++) {
      var c = m[f];
      "RESTful" !== c.type || Y(g) || (g = c.node.getAttribute("xlink:href"), Y(a) && (g = a.getURL(g))), "KVP" !== c.type || Y(h) || (h = c.node.getAttribute("xlink:href"), Y(a) && (h = a.getURL(h)));
    }

    for (var p, d = e.querySelectorAll("Contents>Layer>Identifier"), f = 0; f < d.length && !Y(p); f++) {
      r === d[f].textContent && (p = d[f].parentNode);
    }

    if (Y(p)) {
      for (var y, M, S = p.querySelectorAll("Style"), f = 0; f < S.length; f++) {
        var x = S[f].querySelector("Identifier").textContent;
        null != S[f].getAttribute("isDefault") && (y = x), x === i && (M = x);
      }

      Y(i) && i == M || (i = O(y, ""));

      for (var v = [].slice.call(p.querySelectorAll("Format")), w = 0; w < Z.FormatImage.length && !Y(s); w++) {
        0 < v.filter(function (e) {
          return e.textContent === Z.FormatImage[w].format;
        }).length && (s = Z.FormatImage[w]);
      }

      u = p.querySelectorAll("TileMatrixSetLink");
    }

    for (var T = [].slice.call(e.querySelectorAll("TileMatrixSet>Identifier")), A = 0; A < u.length && !n.ready; A++) {
      for (var I, C, b = u[A], L = b.querySelector("TileMatrixSet").textContent, f = 0; f < T.length && !Y(I); f++) {
        T[f].textContent === L && (I = T[f].parentNode);
      }

      for (var W = I.querySelector("SupportedCRS").textContent, R = 0; R < Z.CRS.length && !Y(C); R++) {
        Z.CRS[R].SupportedCRS === W && (C = Z.CRS[R]);
      }

      if (Y(C)) {
        var H = [].slice.call(I.querySelectorAll("TileMatrix")).map(function (e) {
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
        });
        H.sort(function (e, t) {
          return t.scaleDenominator - e.scaleDenominator;
        }), listTileMatrixLimits = b.querySelectorAll("TileMatrixSetLimits>TileMatrixLimits");

        for (var q, D, P = 0; P < H.length; P++) {
          for (var E = H[P], k = 0; k < listTileMatrixLimits.length; k++) {
            var N = listTileMatrixLimits[k];
            E.id === N.querySelector("TileMatrix").textContent && (E.minTileRow = parseInt(N.querySelector("MinTileRow").textContent), E.maxTileRow = parseInt(N.querySelector("MaxTileRow").textContent), E.minTileCol = parseInt(N.querySelector("MinTileCol").textContent), E.maxTileCol = parseInt(N.querySelector("MaxTileCol").textContent), E.complete = !0, H[P] = E);
          }
        }

        0 < H.length && (n.tilingScheme = new C.tilingScheme({
          ellipsoid: C.ellipsoid,
          numberOfLevelZeroTilesX: H[0].maxWidth,
          numberOfLevelZeroTilesY: H[0].maxHeight
        }), null != (q = p.querySelector("ResourceURL[format='" + s.format + "']")) ? o = q.getAttribute("template").replace("{TileRow}", "{y}").replace("{TileCol}", "{x}").replace("{Style}", i).replace("{TileMatrixSet}", L).replace("{layer}", r).replace("{infoFormatExtension}", s.extension) : Y(h) && (o = h + "service=WMTS&request=GetTile&version=1.0.0&layer=" + r + "&style=" + i + "&format=" + s.format + "&TileMatrixSet=" + L + "&TileMatrix={TileMatrix}&TileRow={y}&TileCol={x}"), Y(o) && (n.getTileDataAvailable = function (e, t, r) {
          var a,
              i = !1;
          return r < l && r < H.length && (i = (a = H[r]).complete ? t <= a.maxTileRow && t >= a.minTileRow && e <= a.maxTileCol && e >= a.minTileCol : e < a.maxWidth && t < a.maxHeight), i;
        }, n.URLtemplateImage = function (e, t, r) {
          var a,
              i = "";
          return n.getTileDataAvailable(e, t, r) && (a = H[r], i = o.replace("{TileMatrix}", a.id)), i;
        }, D = {
          width: H[0].tileWidth,
          height: H[0].tileHeight
        }, 0 == H.filter(function (e) {
          return e.tileWidth != D.width || e.tileHeight != D.height;
        }).length && (n.imageSize = D), n.ready = !0));
      }
    }

    return n;
  };

  var m = function m(e) {
    if (!Y(e)) throw new V("description is required.");
    var t = new h(),
        r = e.url.lastIndexOf("/");
    e.layerName = e.url.substr(r + 1), e.url = e.url.substr(0, r), this.id = e.id || _(), e.heightMapWidth = e.heightMapWidth || 65, e.heightMapHeight = e.heightMapHeight || 65, e.maxLevel = e.maxLevel || 13, e.formatImage = e.formatImage || {
      format: "image/png",
      extension: "png"
    }, e.styleName = e.styleName || "grayToColor", e.hasStyledImage = e.hasStyledImage || !0, e.waterMask = e.waterMask || !1;
    var a = e.credit;
    "string" == typeof a && (a = new l(a)), this.ready = !1, this._readyPromise = s.defer(), n(this, {
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
    });
    var g,
        i = Z.parser(e);
    g = this, s(i, function (h) {
      Y(h) && h.ready && (h.levelZeroMaximumGeometricError = o.getEstimatedLevelZeroGeometricErrorForAHeightmap(h.tilingScheme.ellipsoid, h.heightMapWidth, h.tilingScheme.getNumberOfXTilesAtLevel(0)), Y(h.URLtemplateImage) && (h.getHeightmapTerrainDataImage = function (e, t, r) {
        var a, i, n, o, l;
        return isNaN(e + t + r) || (i = f(h.URLtemplateImage(e, t, r), e, t, r, g), n = {
          highest: h.highest,
          lowest: h.lowest,
          offset: h.offset
        }, o = c(e, t, r, g), l = u.fetchImage({
          url: i
        }), Y(l) && (a = s(l, function (e) {
          return m.imageToHeightmapTerrainData(e, n, {
            width: h.heightMapWidth,
            height: h.heightMapHeight
          }, h.waterMask, o, h.hasStyledImage);
        }).otherwise(function () {
          return new y({
            buffer: new Uint16Array(h.heightMapWidth * h.heightMapHeight),
            width: h.heightMapWidth,
            height: h.heightMapHeight,
            childTileMask: o,
            waterMask: new Uint8Array(h.heightMapWidth * h.heightMapHeight),
            structure: h.formatImage.terrainDataStructure
          });
        }))), a;
      }), Y(h.URLtemplateArray) && (h.getHeightmapTerrainDataArray = function (e, t, r) {
        var a, i, n, o, l;
        return isNaN(e + t + r) || (i = f(h.URLtemplateArray(e, t, r), e, t, r, g), n = {
          highest: h.highest,
          lowest: h.lowest,
          offset: h.offset
        }, o = c(e, t, r, g), l = u.fetchArrayBuffer({
          url: i
        }), Y(l) && (a = s(l, function (e) {
          return m.arrayToHeightmapTerrainData(e, n, {
            width: h.heightMapWidth,
            height: h.heightMapHeight
          }, h.formatArray, h.waterMask, o);
        }).otherwise(function () {
          return Y(h.getHeightmapTerrainDataImage) ? h.getHeightmapTerrainDataImage(e, t, r) : new y({
            buffer: new Uint16Array(h.heightMapWidth * h.heightMapHeight),
            width: h.heightMapWidth,
            height: h.heightMapHeight,
            childTileMask: o,
            waterMask: new Uint8Array(h.heightMapWidth * h.heightMapHeight),
            structure: h.formatImage.terrainDataStructure
          });
        }))), a;
      }), g.getLevelMaximumGeometricError = function (e) {
        return h.levelZeroMaximumGeometricError / (1 << e);
      }, g.requestTileGeometry = function (e, t, r) {
        var a;
        return Y(h.getHeightmapTerrainDataArray) ? a = h.getHeightmapTerrainDataArray(e, t, r) : Y(h.getHeightmapTerrainDataImage) && (a = h.getHeightmapTerrainDataImage(e, t, r)), a;
      }, n(g, {
        tilingScheme: {
          get: function get() {
            return h.tilingScheme;
          }
        },
        ready: {
          get: function get() {
            return h.ready;
          }
        },
        hasWaterMask: {
          get: function get() {
            return h.waterMask;
          }
        },
        heightMapHeight: {
          get: function get() {
            return h.heightMapHeight;
          }
        },
        heightMapWidth: {
          get: function get() {
            return h.heightMapWidth;
          }
        },
        getTileDataAvailable: {
          get: function get() {
            return h.getTileDataAvailable;
          }
        }
      })), g._readyPromise.resolve(h.ready);
    });
  };

  function f(e, t, r, a, i) {
    var n = i.tilingScheme.tileXYToNativeRectangle(t, r, a),
        o = (n.east - n.west) / (i.heightMapWidth - 1),
        l = (n.north - n.south) / (i.heightMapHeight - 1);
    n.west -= .5 * o, n.east += .5 * o, n.south -= .5 * l, n.north += .5 * l;
    var h = i.tilingScheme.getNumberOfYTilesAtLevel(a) - r - 1;
    return e.replace("{south}", n.south).replace("{north}", n.north).replace("{west}", n.west).replace("{east}", n.east).replace("{x}", t).replace("{y}", r).replace("{tmsY}", h);
  }

  function c(e, t, r, a) {
    var i = 0,
        n = r + 1;
    return i |= a.getTileDataAvailable(2 * e, 2 * t, n) ? 1 : 0, i |= a.getTileDataAvailable(2 * e + 1, 2 * t, n) ? 2 : 0, i |= a.getTileDataAvailable(2 * e, 2 * t + 1, n) ? 4 : 0, i |= a.getTileDataAvailable(2 * e + 1, 2 * t + 1, n) ? 8 : 0;
  }

  return m.arrayToHeightmapTerrainData = function (e, t, r, a, i, n) {
    "number" == typeof r && (r = {
      width: r,
      height: r
    });
    var o = a.postProcessArray(e, r, t.highest, t.lowest, t.offset);
    if (!Y(o)) throw new V("no good size");
    var l = {
      buffer: o,
      width: r.width,
      height: r.height,
      childTileMask: n,
      structure: a.terrainDataStructure
    };

    if (i) {
      for (var h = new Uint8Array(o.length), g = 0; g < o.length; g++) {
        o[g] <= 0 && (h[g] = 255);
      }

      l.waterMask = h;
    }

    return new y(l);
  }, m.imageToHeightmapTerrainData = function (e, t, r, a, i, n) {
    "number" == typeof r && (r = {
      width: r,
      height: r
    });

    for (var o = M(e, r.width, r.height), l = new Uint8Array(o.length / 4), h = new Int16Array(o.length / 4), g = 0, s = 0, u = 0; u < o.length; u += 4) {
      var m = o[u],
          f = o[u + 1],
          c = 128 < o[u + 2],
          p = (m << 8 | f) - t.offset - 32768;
      p > t.lowest && p < t.highest && (c || n) ? (s += h[u / 4] = p, g++) : h[u / 4] = 0 == g ? 0 : s / g;
    }

    var d = {
      buffer: h,
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
      for (l = new Uint8Array(h.length), u = 0; u < h.length; u++) {
        h[u] <= 0 && (l[u] = 255);
      }

      d.waterMask = l;
    }

    return new y(d);
  }, m;
});