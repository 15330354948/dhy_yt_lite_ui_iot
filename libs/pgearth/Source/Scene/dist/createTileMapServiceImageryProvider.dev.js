"use strict";

define(["../Core/Cartesian2", "../Core/Cartographic", "../Core/defaultValue", "../Core/defined", "../Core/DeveloperError", "../Core/GeographicProjection", "../Core/GeographicTilingScheme", "../Core/Rectangle", "../Core/Resource", "../Core/RuntimeError", "../Core/TileProviderError", "../Core/WebMercatorTilingScheme", "../ThirdParty/when", "./UrlTemplateImageryProvider", "../Core/createGuid"], function (g, c, l, h, e, k, i, p, b, o, d, m, j, n, f) {
  function a(y) {
    y = l(y, {});

    if (!h(y.url)) {
      throw new e("options.url is required.");
    }

    var x = j.defer();
    var u = new n(x.promise);
    var s;
    var t;
    var q;
    j(y.url).then(function (z) {
      t = b.createIfNeeded(z);
      t.setQueryParameters({
        uuid: f()
      });
      t.appendForwardSlash();
      q = t.getDerivedResource({
        url: "tilemapresource.xml"
      });
      v();
    }).otherwise(function (z) {
      x.reject(z);
    });

    function w(G) {
      var ab = /tileformat/i;
      var af = /tileset/i;
      var F = /tilesets/i;
      var Q = /boundingbox/i;
      var Y, D, T;
      var N = [];
      var Z = G.childNodes[0].childNodes;

      for (var X = 0; X < Z.length; X++) {
        if (ab.test(Z.item(X).nodeName)) {
          Y = Z.item(X);
        } else {
          if (F.test(Z.item(X).nodeName)) {
            T = Z.item(X);
            var L = Z.item(X).childNodes;

            for (var U = 0; U < L.length; U++) {
              if (af.test(L.item(U).nodeName)) {
                N.push(L.item(U));
              }
            }
          } else {
            if (Q.test(Z.item(X).nodeName)) {
              D = Z.item(X);
            }
          }
        }
      }

      var M;

      if (!h(T) || !h(D)) {
        M = "Unable to find expected tilesets or bbox attributes in " + q.url + ".";
        s = d.handleError(s, u, u.errorEvent, M, undefined, undefined, undefined, v);

        if (!s.retry) {
          x.reject(new o(M));
        }

        return;
      }

      var S = l(y.fileExtension, Y.getAttribute("extension"));
      var C = l(y.tileWidth, parseInt(Y.getAttribute("width"), 10));
      var J = l(y.tileHeight, parseInt(Y.getAttribute("height"), 10));
      var K = l(y.minimumLevel, parseInt(N[0].getAttribute("order"), 10));
      var E = l(y.maximumLevel, parseInt(N[N.length - 1].getAttribute("order"), 10));
      var O = T.getAttribute("profile");
      var B = y.tilingScheme;

      if (!h(B)) {
        if (O === "geodetic" || O === "global-geodetic") {
          B = new i({
            ellipsoid: y.ellipsoid
          });
        } else {
          if (O === "mercator" || O === "global-mercator") {
            B = new m({
              ellipsoid: y.ellipsoid
            });
          } else {
            M = q.url + "specifies an unsupported profile attribute, " + O + ".";
            s = d.handleError(s, u, u.errorEvent, M, undefined, undefined, undefined, v);

            if (!s.retry) {
              x.reject(new o(M));
            }

            return;
          }
        }
      }

      var ae = p.clone(y.rectangle);

      if (!h(ae)) {
        var P;
        var H;
        var A;
        var I;
        var W = l(y.flipXY, false);

        if (W) {
          A = new g(parseFloat(D.getAttribute("miny")), parseFloat(D.getAttribute("minx")));
          I = new g(parseFloat(D.getAttribute("maxy")), parseFloat(D.getAttribute("maxx")));
        } else {
          A = new g(parseFloat(D.getAttribute("minx")), parseFloat(D.getAttribute("miny")));
          I = new g(parseFloat(D.getAttribute("maxx")), parseFloat(D.getAttribute("maxy")));
        }

        var ac = O === "geodetic" || O === "mercator";

        if (B.projection instanceof k || ac) {
          P = c.fromDegrees(A.x, A.y);
          H = c.fromDegrees(I.x, I.y);
        } else {
          var ad = B.projection;
          P = ad.unproject(A);
          H = ad.unproject(I);
        }

        ae = new p(P.longitude, P.latitude, H.longitude, H.latitude);
      }

      if (ae.west < B.rectangle.west) {
        ae.west = B.rectangle.west;
      }

      if (ae.east > B.rectangle.east) {
        ae.east = B.rectangle.east;
      }

      if (ae.south < B.rectangle.south) {
        ae.south = B.rectangle.south;
      }

      if (ae.north > B.rectangle.north) {
        ae.north = B.rectangle.north;
      }

      var V = B.positionToTileXY(p.southwest(ae), K);
      var z = B.positionToTileXY(p.northeast(ae), K);
      var R = (Math.abs(z.x - V.x) + 1) * (Math.abs(z.y - V.y) + 1);

      if (R > 4) {
        K = 0;
      }

      var aa = t.getDerivedResource({
        url: "{z}/{x}/{reverseY}." + S
      });
      x.resolve({
        url: aa,
        tilingScheme: B,
        rectangle: ae,
        tileWidth: C,
        tileHeight: J,
        minimumLevel: K,
        maximumLevel: E,
        tileDiscardPolicy: y.tileDiscardPolicy,
        credit: y.credit
      });
    }

    function r(D) {
      var B = l(y.fileExtension, "png");
      var F = l(y.tileWidth, 256);
      var C = l(y.tileHeight, 256);
      var H = l(y.minimumLevel, 0);
      var z = y.maximumLevel;
      var A = h(y.tilingScheme) ? y.tilingScheme : new m({
        ellipsoid: y.ellipsoid
      });
      var G = l(y.rectangle, A.rectangle);
      var E = t.getDerivedResource({
        url: "{z}/{x}/{reverseY}." + B
      });
      x.resolve({
        url: E,
        tilingScheme: A,
        rectangle: G,
        tileWidth: F,
        tileHeight: C,
        minimumLevel: H,
        maximumLevel: z,
        tileDiscardPolicy: y.tileDiscardPolicy,
        credit: y.credit
      });
    }

    function v() {
      q.fetchXML().then(w).otherwise(r);
    }

    return u;
  }

  return a;
});