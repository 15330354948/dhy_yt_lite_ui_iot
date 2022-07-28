"use strict";

define(["../ThirdParty/protobuf-minimal", "../ThirdParty/when", "./buildModuleUrl", "./Check", "./Credit", "./defaultValue", "./defined", "./defineProperties", "./GoogleEarthEnterpriseTileInformation", "./isBitSet", "./loadAndExecuteScript", "./Math", "./Request", "./Resource", "./RuntimeError", "./TaskProcessor"], function (o, h, i, a, f, c, g, e, y, u, s, l, d, p, v, r) {
  "use strict";

  var b = function (e) {
    for (var r = e.length, t = new ArrayBuffer(r), n = new Uint8Array(t), o = 0; o < r; ++o) {
      n[o] = e.charCodeAt(o);
    }

    return t;
  }('Eô½\vyâjE",ÍqøIFgQ\0B%Æèa,f)\bÆ4Üjb%y\nwmiÖðk¡½NuàA[ß@V\fÙ»r|3SîOlÔq°{ÀEVZ­wUe\v3*¬l5Å0sø3>mF8J´Ýð.ÝuÚDt"úa"\f3"So¯9D\v9Ù9L¹¿«\\P_"uxéqh;ÁÄð<VqH\'UfYNeu£aF}a?A\0×´4MÎF°Õ¸\'{Ü+»Mg0ÈÑö\\Pú[/Fn5/\'C.ë\n\f^¥se4ål.jC\'c#U©?q{gC}:¯ÍâTUýKÆâ/(íË\\Æ-f§;/*"N°k.Ý\r}}GºC²²+>Mª>}æÎIÆæx\fa1-¤O¥~q ì\r1èN\v\0nPh}=\b\r¦n£h$[kó#ó¶s³\r\v@ÀØQ]ú".jßI\0¹ wUÆïj¿{GLîÜÜF©­S+S4ÿYä8è1N¹XFkË-#p\x005"Ï1²&/çÃu-6,rt°#G·ÓÑ&7râ\0DÏÚ3-Þ`i#i*|ÍKQ\rT9w.)ê¦P¢joP\\>TûïP[\vEm(w7ÛJfJo åpâ¹q~\fmI-zþrÇòY0»]såÉ êxì ðB|G`°½&·q¶ÇÑ3=Ó«îcÈ+S D\\qÆÌD2O<ÊÀ)=RÓaX©}e´ÜÏ\rô=ñ\b©BÚ#\tØ¿^PIøMÀËGLO÷{+ØÅ1;µoÜl\rÑÛ?âéÚ_ÔâFaZÞUÏ¤\0¾ýÎgñJiæ HØ]~®q N®ÀV©<rçvì)IÖ]-ãÛ6©;fjÕ¶=P^R¹KÇsWxÉô.YoÐKW>\'\'Ç`Û;íSD>?mw¢\në?R¨ÆU^1I7ôÅ&-©¿\'TÚÃj å*x°Öprªh½÷_H±~ÀXL?fù>áeÀp§Ï8i¯ðVldI\'­xtOÂÞV9\0Úw\vË-û5Oõ\bQ`Á\nZGM&30xÚÀFGâ[y`In7gS\n>éìF9²ñ4\rÆSuná\fYÙÞ){II¥wy¾IV.6ç\v:»Ob{ÒM1/½8{¨O!áìFpv})"x\nÝ\\ÚÞQÏðüYRe|3ßóHÚ»*uÛ`²Ôüíì5¨ÿ(1-ÈÜF|["');

  function P(e) {
    a.defined("resourceOrUrl", e);
    var r = e;
    "string" == typeof r || r instanceof p || (a.typeOf.string("resourceOrUrl.url", e.url), r = e.url);
    var t = p.createIfNeeded(r);
    t.appendForwardSlash(), this._resource = t, this.imageryPresent = !0, this.protoImagery = void 0, this.terrainPresent = !0, this.negativeAltitudeExponentBias = 32, this.negativeAltitudeThreshold = l.EPSILON12, this.providers = {}, this.key = void 0, this._quadPacketVersion = 1, this._tileInfo = {}, this._subtreePromises = {};
    var n = this;

    this._readyPromise = function (l) {
      var e = l._resource.getDerivedResource({
        url: "dbRoot.v5",
        queryParameters: {
          output: "proto"
        }
      });

      {
        var r, t;
        g(m) || (r = i("ThirdParty/google-earth-dbroot-parser.js"), t = window.pgEarthGoogleEarthDbRootParser, m = s(r).then(function () {
          I = window.pgEarthGoogleEarthDbRootParser(o), g(t) ? window.pgEarthGoogleEarthDbRootParser = t : delete window.pgEarthGoogleEarthDbRootParser;
        }));
      }
      return m.then(function () {
        return e.fetchArrayBuffer();
      }).then(function (e) {
        var r = I.EncryptedDbRootProto.decode(new Uint8Array(e)),
            t = r.encryptionData,
            n = t.byteOffset,
            o = n + t.byteLength,
            i = l.key = t.buffer.slice(n, o),
            o = (n = (t = r.dbrootData).byteOffset) + t.byteLength,
            a = t.buffer.slice(n, o);
        return w.scheduleTask({
          buffer: a,
          type: "DbRoot",
          key: i
        }, [a]);
      }).then(function (e) {
        var r,
            t = I.DbRootProto.decode(new Uint8Array(e.buffer));
        l.imageryPresent = c(t.imageryPresent, l.imageryPresent), l.protoImagery = t.protoImagery, l.terrainPresent = c(t.terrainPresent, l.terrainPresent), g(t.endSnippet) && g(t.endSnippet.model) && (r = t.endSnippet.model, l.negativeAltitudeExponentBias = c(r.negativeAltitudeExponentBias, l.negativeAltitudeExponentBias), l.negativeAltitudeThreshold = c(r.compressedNegativeAltitudeThreshold, l.negativeAltitudeThreshold)), g(t.databaseVersion) && (l._quadPacketVersion = c(t.databaseVersion.quadtreeVersion, l._quadPacketVersion));

        for (var n = l.providers, o = c(t.providerInfo, []), i = o.length, a = 0; a < i; ++a) {
          var u = o[a],
              s = u.copyrightString;
          g(s) && (n[u.providerId] = new f(s.value));
        }
      }).otherwise(function () {
        console.log("Failed to retrieve " + e.url + ". Using defaults."), l.key = b;
      });
    }(this).then(function () {
      return n.getQuadTreePacket("", n._quadPacketVersion);
    }).then(function () {
      return !0;
    }).otherwise(function (e) {
      var r = "An error occurred while accessing " + T(n, "", 1).url + ".";
      return h.reject(new v(r));
    });
  }

  e(P.prototype, {
    url: {
      get: function get() {
        return this._resource.url;
      }
    },
    proxy: {
      get: function get() {
        return this._resource.proxy;
      }
    },
    resource: {
      get: function get() {
        return this._resource;
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise;
      }
    }
  }), P.tileXYToQuadKey = function (e, r, t) {
    for (var n = "", o = t; 0 <= o; --o) {
      var i = 1 << o,
          a = 0;
      u(r, i) ? u(e, i) && (a |= 1) : (a |= 2, u(e, i) || (a |= 1)), n += a;
    }

    return n;
  }, P.quadKeyToTileXY = function (e) {
    for (var r = 0, t = 0, n = e.length - 1, o = n; 0 <= o; --o) {
      var i = 1 << o,
          a = +e[n - o];
      u(a, 2) ? u(a, 1) || (r |= i) : (t |= i, u(a, 1) && (r |= i));
    }

    return {
      x: r,
      y: t,
      level: n
    };
  }, P.prototype.isValid = function (e) {
    var r = this.getTileInformationFromQuadKey(e);
    if (g(r)) return null !== r;

    for (var t, n = !0, o = e; 1 < o.length;) {
      if (t = o.substring(o.length - 1), o = o.substring(0, o.length - 1), r = this.getTileInformationFromQuadKey(o), g(r)) {
        r.hasSubtree() || r.hasChild(parseInt(t)) || (n = !1);
        break;
      }

      if (null === r) {
        n = !1;
        break;
      }
    }

    return n;
  };
  var I,
      m,
      w = new r("decodeGoogleEarthEnterprisePacket", Number.POSITIVE_INFINITY);

  function T(e, r, t, n) {
    return e._resource.getDerivedResource({
      url: "flatfile?q2-0" + r + "-q." + t.toString(),
      request: n
    });
  }

  return P.prototype.getQuadTreePacket = function (f, e, r) {
    e = c(e, 1);
    var t = T(this, f = c(f, ""), e, r).fetchArrayBuffer();

    if (g(t)) {
      var d = this._tileInfo,
          n = this.key;
      return t.then(function (e) {
        return w.scheduleTask({
          buffer: e,
          quadKey: f,
          type: "Metadata",
          key: n
        }, [e]).then(function (e) {
          var r,
              t,
              n = -1;
          "" !== f && (n = f.length + 1, r = e[f], (t = d[f])._bits |= r._bits, delete e[f]);
          var o = Object.keys(e);
          o.sort(function (e, r) {
            return e.length - r.length;
          });

          for (var i = o.length, a = 0; a < i; ++a) {
            var u,
                s,
                l,
                h = o[a];
            null !== e[h] ? (u = y.clone(e[h]), (s = h.length) === n ? u.setParent(t) : 1 < s && (l = d[h.substring(0, h.length - 1)], u.setParent(l)), d[h] = u) : d[h] = null;
          }
        });
      });
    }
  }, P.prototype.populateSubtree = function (e, r, t, n) {
    return function e(r, t, n) {
      var o = r._tileInfo;
      var i = t;
      var a = o[i];
      if (g(a) && (!a.hasSubtree() || a.hasChildren())) return a;

      for (; void 0 === a && 1 < i.length;) {
        i = i.substring(0, i.length - 1), a = o[i];
      }

      var u;
      var s = r._subtreePromises;
      var l = s[i];
      if (g(l)) return l.then(function () {
        return u = new d({
          throttle: n.throttle,
          throttleByServer: n.throttleByServer,
          type: n.type,
          priorityFunction: n.priorityFunction
        }), e(r, t, u);
      });
      if (!g(a) || !a.hasSubtree()) return h.reject(new v("Couldn't load metadata for tile " + t));
      l = r.getQuadTreePacket(i, a.cnodeVersion, n);
      if (!g(l)) return;
      s[i] = l;
      return l.then(function () {
        return u = new d({
          throttle: n.throttle,
          throttleByServer: n.throttleByServer,
          type: n.type,
          priorityFunction: n.priorityFunction
        }), e(r, t, u);
      }).always(function () {
        delete s[i];
      });
    }(this, P.tileXYToQuadKey(e, r, t), n);
  }, P.prototype.getTileInformation = function (e, r, t) {
    var n = P.tileXYToQuadKey(e, r, t);
    return this._tileInfo[n];
  }, P.prototype.getTileInformationFromQuadKey = function (e) {
    return this._tileInfo[e];
  }, P;
});