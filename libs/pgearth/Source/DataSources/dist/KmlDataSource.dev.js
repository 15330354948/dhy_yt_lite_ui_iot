"use strict";

define(["../Core/ArcType", "../Core/AssociativeArray", "../Core/BoundingRectangle", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartographic", "../Core/ClockRange", "../Core/ClockStep", "../Core/Color", "../Core/createGuid", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Ellipsoid", "../Core/Event", "../Core/getExtensionFromUri", "../Core/getFilenameFromUri", "../Core/HeadingPitchRange", "../Core/HeadingPitchRoll", "../Core/Iso8601", "../Core/JulianDate", "../Core/Math", "../Core/NearFarScalar", "../Core/objectToQuery", "../Core/oneTimeWarning", "../Core/PinBuilder", "../Core/PolygonHierarchy", "../Core/queryToObject", "../Core/Rectangle", "../Core/Resource", "../Core/RuntimeError", "../Core/TimeInterval", "../Core/TimeIntervalCollection", "../Scene/HeightReference", "../Scene/HorizontalOrigin", "../Scene/LabelStyle", "../Scene/SceneMode", "../ThirdParty/Autolinker", "../ThirdParty/Uri", "../ThirdParty/when", "../ThirdParty/zip", "./BillboardGraphics", "./CompositePositionProperty", "./DataSource", "./DataSourceClock", "./Entity", "./EntityCluster", "./EntityCollection", "./KmlCamera", "./KmlLookAt", "./KmlTour", "./KmlTourFlyTo", "./KmlTourWait", "./LabelGraphics", "./PathGraphics", "./PolygonGraphics", "./PolylineGraphics", "./PositionPropertyArray", "./RectangleGraphics", "./ReferenceProperty", "./SampledPositionProperty", "./ScaledPositionProperty", "./TimeIntervalCollectionProperty", "./WallGraphics"], function (k, r, M, T, b, e, m, c, L, C, E, _, t, n, u, i, o, a, p, g, S, I, N, l, w, R, s, O, P, U, v, h, y, A, d, f, x, D, W, F, K, B, G, V, H, q, z, j, X, Q, $, Y, J, Z, ee, te, oe, re, ne, ie, ae, le, se, de, me) {
  "use strict";

  if ("undefined" == typeof DOMParser) return {};
  var ce = {
    avi: "video/x-msvideo",
    bmp: "image/bmp",
    bz2: "application/x-bzip2",
    chm: "application/vnd.ms-htmlhelp",
    css: "text/css",
    csv: "text/csv",
    doc: "application/msword",
    dvi: "application/x-dvi",
    eps: "application/postscript",
    flv: "video/x-flv",
    gif: "image/gif",
    gz: "application/x-gzip",
    htm: "text/html",
    html: "text/html",
    ico: "image/vnd.microsoft.icon",
    jnlp: "application/x-java-jnlp-file",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    m3u: "audio/x-mpegurl",
    m4v: "video/mp4",
    mathml: "application/mathml+xml",
    mid: "audio/midi",
    midi: "audio/midi",
    mov: "video/quicktime",
    mp3: "audio/mpeg",
    mp4: "video/mp4",
    mp4v: "video/mp4",
    mpeg: "video/mpeg",
    mpg: "video/mpeg",
    odp: "application/vnd.oasis.opendocument.presentation",
    ods: "application/vnd.oasis.opendocument.spreadsheet",
    odt: "application/vnd.oasis.opendocument.text",
    ogg: "application/ogg",
    pdf: "application/pdf",
    png: "image/png",
    pps: "application/vnd.ms-powerpoint",
    ppt: "application/vnd.ms-powerpoint",
    ps: "application/postscript",
    qt: "video/quicktime",
    rdf: "application/rdf+xml",
    rss: "application/rss+xml",
    rtf: "application/rtf",
    svg: "image/svg+xml",
    swf: "application/x-shockwave-flash",
    text: "text/plain",
    tif: "image/tiff",
    tiff: "image/tiff",
    txt: "text/plain",
    wav: "audio/x-wav",
    wma: "audio/x-ms-wma",
    wmv: "video/x-ms-wmv",
    xml: "application/xml",
    zip: "application/zip",
    detectFromFilename: function detectFromFilename(e) {
      var t = e.toLowerCase(),
          t = o(t);
      return ce[t];
    }
  },
      ue = new DOMParser(),
      pe = new W({
    stripPrefix: !1,
    twitter: !1,
    email: !1,
    replaceFn: function replaceFn(e, t) {
      if (!t.protocolUrlMatch) return !1;
    }
  }),
      ge = 32,
      ve = 2414016,
      he = 1,
      fe = 16093e3,
      ke = .1;

  function xe(e) {
    var t,
        o,
        r,
        n = {
      xsi: "http://www.w3.org/2001/XMLSchema-instance"
    };

    for (var i in n) {
      n.hasOwnProperty(i) && (r = "xmlns:" + i + "=", RegExp("[< ]" + i + ":").test(e) && -1 === e.indexOf(r) && (_(t) || (t = e.substr(0, e.indexOf("<kml") + 4), o = e.substr(t.length)), t += " " + r + '"' + n[i] + '"'));
    }

    return _(t) && (e = t + o), e;
  }

  function we(e) {
    for (var t, o, r, n = e.indexOf("xmlns:"), i = e.indexOf(">", n); -1 !== n && n < i;) {
      t = e.slice(n, e.indexOf('"', n)), o = n, n = -1 !== (n = e.indexOf(t, n + 1)) ? (r = e.indexOf('"', e.indexOf('"', n) + 1), (e = e.slice(0, n - 1) + e.slice(r + 1, e.length)).indexOf("xmlns:", o - 1)) : e.indexOf("xmlns:", o + 1);
    }

    return e;
  }

  function ye(t, o, r) {
    var e = E(ce.detectFromFilename(t.filename), "application/octet-stream");
    t.getData(new B.Data64URIWriter(e), function (e) {
      o[t.filename] = e, r.resolve();
    });
  }

  function Me(e, t, o, r) {
    for (var n = r.keys, i = new F("."), a = e.querySelectorAll(t), l = 0; l < a.length; l++) {
      var s,
          d = a[l],
          m = d.getAttribute(o),
          c = new F(m).resolve(i).toString(),
          u = n.indexOf(c);
      -1 !== u && (s = n[u], d.setAttribute(o, r[s]), "a" === t && null === d.getAttribute("download") && d.setAttribute("download", s));
    }
  }

  function Te(e, t, o, r) {
    for (var n = e.querySelectorAll(t), i = 0; i < n.length; i++) {
      var a = n[i],
          l = Fe(a.getAttribute(o), r);
      a.setAttribute(o, l.url);
    }
  }

  function be(e, t, o) {
    var r = Re(e, "id"),
        r = _(r) && 0 !== r.length ? r : C();
    _(o) && (r = o + r);
    var n = t.getById(r);
    return _(n) && (r = C(), _(o) && (r = o + r)), n = t.add(new z({
      id: r
    })), _(n.kml) || (n.addProperty("kml"), n.kml = new Lt()), n;
  }

  function Le(e, t) {
    return "absolute" === e || "relativeToGround" === e || "relativeToSeaFloor" === t;
  }

  function Ce(e, t) {
    if (!_(e)) return b.fromDegrees(0, 0, 0, t);
    var o = e.match(/[^\s,\n]+/g);
    if (!_(o)) return b.fromDegrees(0, 0, 0, t);
    var r = parseFloat(o[0]),
        n = parseFloat(o[1]),
        i = parseFloat(o[2]),
        r = isNaN(r) ? 0 : r,
        n = isNaN(n) ? 0 : n,
        i = isNaN(i) ? 0 : i;
    return b.fromDegrees(r, n, i, t);
  }

  function Ee(e, t) {
    if (_(e)) {
      var o = e.textContent.match(/[^\s\n]+/g);

      if (_(o)) {
        for (var r = o.length, n = new Array(r), i = 0, a = 0; a < r; a++) {
          n[i++] = Ce(o[a], t);
        }

        return n;
      }
    }
  }

  var Se = [null, void 0, "http://www.opengis.net/kml/2.2", "http://earth.google.com/kml/2.2", "http://earth.google.com/kml/2.1", "http://earth.google.com/kml/2.0"],
      _e = ["http://www.google.com/kml/ext/2.2"],
      Ie = {
    kml: Se,
    gx: _e,
    atom: ["http://www.w3.org/2005/Atom"],
    kmlgx: Se.concat(_e)
  };

  function Ne(e, t) {
    if (_(e)) {
      var o = e.getAttribute(t);

      if (null !== o) {
        var r = parseFloat(o);
        return isNaN(r) ? void 0 : r;
      }
    }
  }

  function Re(e, t) {
    if (_(e)) {
      var o = e.getAttribute(t);
      return null !== o ? o : void 0;
    }
  }

  function Oe(e, t, o) {
    if (_(e)) for (var r = e.childNodes, n = r.length, i = 0; i < n; i++) {
      var a = r[i];
      if (a.localName === t && -1 !== o.indexOf(a.namespaceURI)) return a;
    }
  }

  function Pe(e, t, o) {
    if (_(e)) {
      for (var r = [], n = e.getElementsByTagNameNS("*", t), i = n.length, a = 0; a < i; a++) {
        var l = n[a];
        l.localName === t && -1 !== o.indexOf(l.namespaceURI) && r.push(l);
      }

      return r;
    }
  }

  function Ue(e, t, o) {
    if (!_(e)) return [];

    for (var r = [], n = e.childNodes, i = n.length, a = 0; a < i; a++) {
      var l = n[a];
      l.localName === t && -1 !== o.indexOf(l.namespaceURI) && r.push(l);
    }

    return r;
  }

  function Ae(e, t, o) {
    var r = Oe(e, t, o);

    if (_(r)) {
      var n = parseFloat(r.textContent);
      return isNaN(n) ? void 0 : n;
    }
  }

  function De(e, t, o) {
    var r = Oe(e, t, o);
    if (_(r)) return r.textContent.trim();
  }

  function We(e, t, o) {
    var r = Oe(e, t, o);

    if (_(r)) {
      var n = r.textContent.trim();
      return "1" === n || /^true$/i.test(n);
    }
  }

  function Fe(e, t, o) {
    var r, n, i;
    if (_(e)) return _(o) && (i = o[e], _(i) ? r = new v({
      url: i
    }) : (n = new F(t.getUrlComponent()), i = o[new F(e).resolve(n)], _(i) && (r = new v({
      url: i
    })))), _(r) || (r = t.getDerivedResource({
      url: e
    })), r;
  }

  var Ke = {
    maximumRed: void 0,
    red: void 0,
    maximumGreen: void 0,
    green: void 0,
    maximumBlue: void 0,
    blue: void 0
  };

  function Be(e, t) {
    if (_(e) && !/^\s*$/gm.test(e)) {
      "#" === e[0] && (e = e.substring(1));
      var o = parseInt(e.substring(0, 2), 16) / 255,
          r = parseInt(e.substring(2, 4), 16) / 255,
          n = parseInt(e.substring(4, 6), 16) / 255,
          i = parseInt(e.substring(6, 8), 16) / 255;
      return t ? (0 < i ? (Ke.maximumRed = i, Ke.red = void 0) : (Ke.maximumRed = void 0, Ke.red = 0), 0 < n ? (Ke.maximumGreen = n, Ke.green = void 0) : (Ke.maximumGreen = void 0, Ke.green = 0), 0 < r ? (Ke.maximumBlue = r, Ke.blue = void 0) : (Ke.maximumBlue = void 0, Ke.blue = 0), Ke.alpha = o, L.fromRandom(Ke)) : new L(i, n, r, o);
    }
  }

  function Ge(e, t, o) {
    var r = De(e, t, o);
    if (_(r)) return Be(r, "random" === De(e, "colorMode", o));
  }

  function Ve() {
    var e = new G();
    return e.width = ge, e.height = ge, e.scaleByDistance = new l(ve, he, fe, ke), e.pixelOffsetScaleByDistance = new l(ve, he, fe, ke), e;
  }

  function He() {
    var e = new oe();
    return e.outline = !0, e.outlineColor = L.WHITE, e;
  }

  function qe() {
    var e = new ee();
    return e.translucencyByDistance = new l(3e6, 1, 5e6, 0), e.pixelOffset = new T(17, 0), e.horizontalOrigin = f.LEFT, e.font = "16px sans-serif", e.style = x.FILL_AND_OUTLINE, e;
  }

  function ze(e, t, o, r, n) {
    var i,
        a,
        l,
        s = De(e, "href", Ie.kml);

    if (_(s) && 0 !== s.length) {
      0 === s.indexOf("root://icons/palette-") && (i = s.charAt(21), a = E(Ae(e, "x", Ie.gx), 0), l = E(Ae(e, "y", Ie.gx), 0), a = Math.min(a / 32, 7), s = "https://maps.google.com/mapfiles/kml/pal" + i + "/icon" + (8 * (l = 7 - Math.min(l / 32, 7)) + a) + ".png");
      var d = Fe(s, o, r);

      if (n) {
        var m = De(e, "refreshMode", Ie.kml),
            c = De(e, "viewRefreshMode", Ie.kml);
        "onInterval" === m || "onExpire" === m ? R("kml-refreshMode-" + m, "KML - Unsupported Icon refreshMode: " + m) : "onStop" !== c && "onRegion" !== c || R("kml-refreshMode-" + c, "KML - Unsupported Icon viewRefreshMode: " + c);
        var u = E(De(e, "viewBoundScale", Ie.kml), 1),
            p = "onStop" === c ? "BBOX=[bboxWest],[bboxSouth],[bboxEast],[bboxNorth]" : "",
            g = E(De(e, "viewFormat", Ie.kml), p),
            v = De(e, "httpQuery", Ie.kml);
        _(g) && d.setQueryParameters(P(ut(g))), _(v) && d.setQueryParameters(P(ut(v)));
        var h = t._ellipsoid;
        return ft(d, t._camera, t._canvas, u, t._lastCameraView.bbox, h), d;
      }

      return d;
    }
  }

  function je(e, t, o, r, n) {
    for (var i = 0, a = t.childNodes.length; i < a; i++) {
      var l,
          s,
          d,
          m,
          c,
          u,
          p,
          g = t.childNodes.item(i);
      "IconStyle" === g.localName ? function (e, t, o, r, n) {
        var i = Ae(t, "scale", Ie.kml),
            a = Ae(t, "heading", Ie.kml),
            l = Ge(t, "color", Ie.kml),
            s = Oe(t, "Icon", Ie.kml),
            d = ze(s, e, r, n, !1);
        _(s) && !_(d) && (d = !1);
        var m,
            c,
            u = Ae(s, "x", Ie.gx),
            p = Ae(s, "y", Ie.gx),
            g = Ae(s, "w", Ie.gx),
            v = Ae(s, "h", Ie.gx),
            h = Oe(t, "hotSpot", Ie.kml),
            f = Ne(h, "x"),
            k = Ne(h, "y"),
            x = Re(h, "xunits"),
            w = Re(h, "yunits"),
            y = o.billboard;
        _(y) || (y = Ve(), o.billboard = y), y.image = d, y.scale = i, y.color = l, (_(u) || _(p) || _(g) || _(v)) && (y.imageSubRegion = new M(u, p, g, v)), _(a) && 0 !== a && (y.rotation = N.toRadians(-a), y.alignedAxis = b.UNIT_Z), i = E(i, 1), _(f) && ("pixels" === x ? m = -f * i : "insetPixels" === x ? m = (f - ge) * i : "fraction" === x && (m = -f * ge * i), m += .5 * ge * i), _(k) && ("pixels" === w ? c = k * i : "insetPixels" === w ? c = (-k + ge) * i : "fraction" === w && (c = k * ge * i), c -= .5 * ge * i), (_(m) || _(c)) && (y.pixelOffset = new T(m, c));
      }(e, g, o, r, n) : "LabelStyle" === g.localName ? (l = o.label, _(l) || (l = qe(), o.label = l), l.scale = E(Ae(g, "scale", Ie.kml), l.scale), l.fillColor = E(Ge(g, "color", Ie.kml), l.fillColor), l.text = o.name) : "LineStyle" === g.localName ? (s = o.polyline, _(s) || (s = new re(), o.polyline = s), s.width = Ae(g, "width", Ie.kml), s.material = Ge(g, "color", Ie.kml), _(Ge(g, "outerColor", Ie.gx)) && R("kml-gx:outerColor", "KML - gx:outerColor is not supported in a LineStyle"), _(Ae(g, "outerWidth", Ie.gx)) && R("kml-gx:outerWidth", "KML - gx:outerWidth is not supported in a LineStyle"), _(Ae(g, "physicalWidth", Ie.gx)) && R("kml-gx:physicalWidth", "KML - gx:physicalWidth is not supported in a LineStyle"), _(We(g, "labelVisibility", Ie.gx)) && R("kml-gx:labelVisibility", "KML - gx:labelVisibility is not supported in a LineStyle")) : "PolyStyle" === g.localName ? (d = o.polygon, _(d) || (d = He(), o.polygon = d), d.material = E(Ge(g, "color", Ie.kml), d.material), d.fill = E(We(g, "fill", Ie.kml), d.fill), d.outline = E(We(g, "outline", Ie.kml), d.outline)) : "BalloonStyle" === g.localName ? (m = E(Be(De(g, "bgColor", Ie.kml)), L.WHITE), c = E(Be(De(g, "textColor", Ie.kml)), L.BLACK), u = De(g, "text", Ie.kml), o.addProperty("balloonStyle"), o.balloonStyle = {
        bgColor: m,
        textColor: c,
        text: u
      }) : "ListStyle" === g.localName && ("radioFolder" !== (p = De(g, "listItemType", Ie.kml)) && "checkOffOnly" !== p || R("kml-listStyle-" + p, "KML - Unsupported ListStyle with listItemType: " + p));
    }
  }

  function Xe(e, t, o, r, n, i) {
    var a,
        l,
        s = Pe(t, "Style", Ie.kml);
    if (_(s)) for (var d = s.length, m = 0; m < d; m++) {
      k = Re(l = s[m], "id"), _(k) && (k = "#" + k, n && _(r) && (k = r.getUrlComponent() + k), _(o.getById(k)) || (a = new z({
        id: k
      }), o.add(a), je(e, l, a, r, i)));
    }
    var c = Pe(t, "StyleMap", Ie.kml);

    if (_(c)) {
      var u = c.length;

      for (m = 0; m < u; m++) {
        var p = c[m];
        if (k = Re(p, "id"), _(k)) for (var g = Ue(p, "Pair", Ie.kml), v = 0; v < g.length; v++) {
          var h,
              f,
              k,
              x = g[v],
              w = De(x, "key", Ie.kml);
          "normal" === w ? (k = "#" + k, n && _(r) && (k = r.getUrlComponent() + k), _(o.getById(k)) || (a = o.getOrCreateEntity(k), h = De(x, "styleUrl", Ie.kml), _(h) ? ("#" !== h[0] && (h = "#" + h), n && _(r) && (h = r.getUrlComponent() + h), f = o.getById(h), _(f) && a.merge(f)) : je(e, l = Oe(x, "Style", Ie.kml), a, r, i))) : R("kml-styleMap-" + w, "KML - Unsupported StyleMap key: " + w);
        }
      }
    }

    var y = [],
        M = t.getElementsByTagName("styleUrl"),
        T = M.length;

    for (m = 0; m < T; m++) {
      var b,
          L,
          C,
          E = M[m].textContent;
      "#" === E[0] || 2 === (b = E.split("#")).length && (L = b[0], C = r.getDerivedResource({
        url: L
      }), y.push(function (t, o, r) {
        return o.fetchXML().then(function (e) {
          return Xe(t, e, r, o, !0);
        });
      }(e, C, o)));
    }

    return y;
  }

  function Qe(e, t, o) {
    var r = new ae(e, t.id, ["position"]),
        n = new se(t.position);
    t.polyline = _(o.polyline) ? o.polyline.clone() : new re(), t.polyline.positions = new ne([r, n]);
  }

  function $e(e, t) {
    return !_(e) && !_(t) || "clampToGround" === e ? d.CLAMP_TO_GROUND : "relativeToGround" === e ? d.RELATIVE_TO_GROUND : "absolute" === e ? d.NONE : "clampToSeaFloor" === t ? (R("kml-gx:altitudeMode-clampToSeaFloor", "KML - <gx:altitudeMode>:clampToSeaFloor is currently not supported, using <kml:altitudeMode>:clampToGround."), d.CLAMP_TO_GROUND) : "relativeToSeaFloor" === t ? (R("kml-gx:altitudeMode-relativeToSeaFloor", "KML - <gx:altitudeMode>:relativeToSeaFloor is currently not supported, using <kml:altitudeMode>:relativeToGround."), d.RELATIVE_TO_GROUND) : (_(e) ? R("kml-altitudeMode-unknown", "KML - Unknown <kml:altitudeMode>:" + e + ", using <kml:altitudeMode>:CLAMP_TO_GROUND.") : R("kml-gx:altitudeMode-unknown", "KML - Unknown <gx:altitudeMode>:" + t + ", using <kml:altitudeMode>:CLAMP_TO_GROUND."), d.CLAMP_TO_GROUND);
  }

  function Ye(e, t, o, r) {
    var n = t.label;
    _(n) || (n = _(o.label) ? o.label.clone() : qe(), t.label = n), n.text = t.name;
    var i = t.billboard;
    _(i) || (i = _(o.billboard) ? o.billboard.clone() : Ve(), t.billboard = i), _(i.image) ? i.image.getValue() || (i.image = void 0) : i.image = e._pinBuilder.fromColor(L.YELLOW, 64);
    var a = 1;
    _(i.scale) && (0 !== (a = i.scale.getValue()) ? n.pixelOffset = new T(16 * a + 1, 0) : (n.pixelOffset = void 0, n.horizontalOrigin = void 0)), _(r) && e._clampToGround && (i.heightReference = r, n.heightReference = r);
  }

  function Je(e, t) {
    var o = e.path;
    _(o) || ((o = new te()).leadTime = 0, e.path = o);
    var r = t.polyline;
    _(r) && (o.material = r.material, o.width = r.width);
  }

  function Ze(e, t, o, r, n) {
    var i,
        a,
        l,
        s = Oe(o, "coordinates", Ie.kml),
        d = De(o, "altitudeMode", Ie.kml),
        m = De(o, "altitudeMode", Ie.gx),
        c = We(o, "extrude", Ie.kml),
        u = We(o, "tessellate", Ie.kml),
        p = Le(d, m),
        g = Ae(o, "drawOrder", Ie.gx),
        v = e._ellipsoid,
        h = Ee(s, v),
        f = n.polyline;
    return p && c ? (i = new me(), (r.wall = i).positions = h, a = n.polygon, _(a) && (i.fill = a.fill, i.material = a.material), i.outline = !0, _(f) ? (i.outlineColor = _(f.material) ? f.material.color : L.WHITE, i.outlineWidth = f.width) : _(a) && (i.outlineColor = _(a.material) ? a.material.color : L.WHITE)) : e._clampToGround && !p && u ? ((l = new re()).clampToGround = !0, (r.polyline = l).positions = h, _(f) ? (l.material = _(f.material) ? f.material.color.getValue(S.MINIMUM_VALUE) : L.WHITE, l.width = E(f.width, 1)) : (l.material = L.WHITE, l.width = 1), l.zIndex = g) : (_(g) && R("kml-gx:drawOrder", "KML - gx:drawOrder is not supported in LineStrings when clampToGround is false"), f = _(f) ? f.clone() : new re(), (r.polyline = f).positions = function (e, t, o, r) {
      if (_(e)) {
        if ("relativeToSeaFloor" === o || "absolute" === t || "relativeToGround" === t) return e;
        (_(t) && "clampToGround" !== t || _(o) && "clampToSeaFloor" !== o) && R("kml-altitudeMode-unknown", "KML - Unknown altitudeMode: " + E(t, o));

        for (var n = e.length, i = 0; i < n; i++) {
          var a = e[i];
          r.scaleToGeodeticSurface(a, a);
        }

        return e;
      }
    }(h, d, m, v), u && !p || (f.arcType = k.NONE)), !0;
  }

  function et(e, t, o, r, n, i, a, l, s) {
    var d,
        m,
        c,
        u = e[0],
        p = e[e.length - 1],
        g = new le();
    g.addSamples(e, t), o.intervals.addInterval(new y({
      start: u,
      stop: p,
      isStartIncluded: s,
      isStopIncluded: s,
      data: (d = g, m = a, "relativeToSeaFloor" === (c = l) || "absolute" === m || "relativeToGround" === m ? d : ((_(m) && "clampToGround" !== m || _(c) && "clampToSeaFloor" !== c) && R("kml-altitudeMode-unknown", "KML - Unknown altitudeMode: " + E(m, c)), new se(d)))
    })), r.addInterval(new y({
      start: u,
      stop: p,
      isStartIncluded: s,
      isStopIncluded: s
    })), n.intervals.addInterval(new y({
      start: u,
      stop: p,
      isStartIncluded: s,
      isStopIncluded: s,
      data: i
    }));
  }

  var tt = {
    Point: function Point(e, t, o, r, n) {
      var i = De(o, "coordinates", Ie.kml),
          a = De(o, "altitudeMode", Ie.kml),
          l = De(o, "altitudeMode", Ie.gx),
          s = We(o, "extrude", Ie.kml),
          d = Ce(i, e._ellipsoid);
      return r.position = d, Ye(e, r, n, $e(a, l)), s && Le(a, l) && Qe(t, r, n), !0;
    },
    LineString: Ze,
    LinearRing: Ze,
    Polygon: function Polygon(e, t, o, r, n) {
      var i = Oe(o, "outerBoundaryIs", Ie.kml),
          a = Oe(i, "LinearRing", Ie.kml),
          l = Oe(a, "coordinates", Ie.kml),
          s = e._ellipsoid,
          d = Ee(l, s),
          m = We(o, "extrude", Ie.kml),
          c = Le(De(o, "altitudeMode", Ie.kml), De(o, "altitudeMode", Ie.gx)),
          u = _(n.polygon) ? n.polygon.clone() : He(),
          p = n.polyline;

      if (_(p) && (u.outlineColor = _(p.material) ? p.material.color : L.WHITE, u.outlineWidth = p.width), r.polygon = u, c ? (u.perPositionHeight = !0, u.extrudedHeight = m ? 0 : void 0) : e._clampToGround || (u.height = 0), _(d)) {
        for (var g = new O(d), v = Ue(o, "innerBoundaryIs", Ie.kml), h = 0; h < v.length; h++) {
          a = Ue(v[h], "LinearRing", Ie.kml);

          for (var f = 0; f < a.length; f++) {
            d = Ee(l = Oe(a[f], "coordinates", Ie.kml), s), _(d) && g.holes.push(new O(d));
          }
        }

        u.hierarchy = g;
      }

      return !0;
    },
    Track: function Track(e, t, o, r, n) {
      var i = De(o, "altitudeMode", Ie.kml),
          a = De(o, "altitudeMode", Ie.gx),
          l = Ue(o, "coord", Ie.gx),
          s = Ue(o, "angles", Ie.gx),
          d = Ue(o, "when", Ie.kml),
          m = We(o, "extrude", Ie.kml),
          c = Le(i, a),
          u = e._ellipsoid;
      0 < s.length && R("kml-gx:angles", "KML - gx:angles are not supported in gx:Tracks");

      for (var p = Math.min(l.length, d.length), g = [], v = [], h = 0; h < p; h++) {
        var f = Ce(l[h].textContent, u);
        g.push(f), v.push(I.fromIso8601(d[h].textContent));
      }

      var k = new le();
      return k.addSamples(v, g), r.position = k, Ye(e, r, n, $e(i, a)), Je(r, n), r.availability = new A(), 0 < d.length && r.availability.addInterval(new y({
        start: v[0],
        stop: v[v.length - 1]
      })), c && m && Qe(t, r, n), !0;
    },
    MultiTrack: function MultiTrack(e, t, o, r, n) {
      for (var i, a, l = We(o, "interpolate", Ie.gx), s = Ue(o, "Track", Ie.gx), d = !1, m = new de(), c = new A(), u = new V(), p = e._ellipsoid, g = 0, v = s.length; g < v; g++) {
        for (var h = s[g], f = Ue(h, "when", Ie.kml), k = Ue(h, "coord", Ie.gx), x = De(h, "altitudeMode", Ie.kml), w = De(h, "altitudeMode", Ie.gx), y = Le(x, w), M = We(h, "extrude", Ie.kml), T = Math.min(k.length, f.length), b = [], L = [], C = 0; C < T; C++) {
          var E = Ce(k[C].textContent, p);
          b.push(E), L.push(I.fromIso8601(f[C].textContent));
        }

        l && (_(i) && et([i, L[0]], [a, b[0]], u, c, m, !1, "absolute", void 0, !1), i = L[T - 1], a = b[b.length - 1]), et(L, b, u, c, m, y && M, x, w, !0), d = d || y && M;
      }

      return r.availability = c, r.position = u, Ye(e, r, n), Je(r, n), d && (Qe(t, r, n), r.polyline.show = m), !0;
    },
    MultiGeometry: function MultiGeometry(e, t, o, r, n, i) {
      for (var a = o.childNodes, l = !1, s = 0, d = a.length; s < d; s++) {
        var m,
            c = a.item(s),
            u = tt[c.localName];
        _(u) && ((m = be(c, t, i)).parent = r, m.name = r.name, m.availability = r.availability, m.description = r.description, m.kml = r.kml, u(e, t, c, m, n) && (l = !0));
      }

      return l;
    },
    Model: function Model(e, t, o, r, n) {
      return R("kml-unsupportedGeometry", "KML - Unsupported geometry: " + o.localName), !1;
    }
  };
  var ot = document.createElement("div");

  function rt(e, t, o, r, n, i, a, l, s) {
    var d = be(o, r, s),
        m = d.kml,
        c = function (e, t, o, r, n) {
      for (var i, a = new z(), l = -1, s = t.childNodes, d = s.length, m = 0; m < d; m++) {
        var c = s[m];
        "Style" !== c.localName && "StyleMap" !== c.localName || (l = m);
      }

      if (-1 !== l) {
        var u = s[l];
        if ("Style" === u.localName) je(e, u, a, r, n);else for (var p = Ue(u, "Pair", Ie.kml), g = 0; g < p.length; g++) {
          var v,
              h = p[g],
              f = De(h, "key", Ie.kml);
          "normal" === f ? (v = De(h, "styleUrl", Ie.kml), _(v) ? (i = o.getById(v), _(i) || (i = o.getById("#" + v)), _(i) && a.merge(i)) : je(e, Oe(h, "Style", Ie.kml), a, r, n)) : R("kml-styleMap-" + f, "KML - Unsupported StyleMap key: " + f);
        }
      }

      var k,
          x,
          w,
          y = De(t, "styleUrl", Ie.kml);
      return _(y) && ("#" !== (w = y)[0] && -1 !== y.indexOf("#") && (x = (k = y.split("#"))[0], w = r.getDerivedResource({
        url: x
      }).getUrlComponent() + "#" + k[1]), i = o.getById(w), _(i) || (i = o.getById("#" + w)), _(i) && a.merge(i)), a;
    }(e, o, n, i, a),
        u = De(o, "name", Ie.kml);

    d.name = u, d.parent = t;

    var p = function (e) {
      var t = Oe(e, "TimeSpan", Ie.kmlgx);

      if (_(t)) {
        var o,
            r,
            n = Oe(t, "begin", Ie.kmlgx),
            i = _(n) ? I.fromIso8601(n.textContent) : void 0,
            a = Oe(t, "end", Ie.kmlgx),
            l = _(a) ? I.fromIso8601(a.textContent) : void 0;
        return _(i) && _(l) ? (I.lessThan(l, i) && (r = i, i = l, l = r), (o = new A()).addInterval(new y({
          start: i,
          stop: l
        }))) : _(i) ? (o = new A()).addInterval(new y({
          start: i,
          stop: S.MAXIMUM_VALUE
        })) : _(l) && (o = new A()).addInterval(new y({
          start: S.MINIMUM_VALUE,
          stop: l
        })), o;
      }
    }(o);

    _(p) || (p = function (e) {
      var t = Oe(e, "TimeStamp", Ie.kmlgx),
          o = De(t, "when", Ie.kmlgx);

      if (_(t) && _(o) && 0 !== o.length) {
        var r = I.fromIso8601(o),
            n = new A();
        return n.addInterval(new y({
          start: r,
          stop: S.MAXIMUM_VALUE
        })), n;
      }
    }(o)), d.availability = p, Mt(d);
    var g = We(o, "visibility", Ie.kml);

    d.show = function e(t) {
      return !t || t.show && e(t.parent);
    }(t) && E(g, !0);

    var v = Oe(o, "author", Ie.atom),
        h = m.author;
    h.name = De(v, "name", Ie.atom), h.uri = De(v, "uri", Ie.atom), h.email = De(v, "email", Ie.atom);
    var f = Oe(o, "link", Ie.atom),
        k = m.link;
    k.href = Re(f, "href"), k.hreflang = Re(f, "hreflang"), k.rel = Re(f, "rel"), k.type = Re(f, "type"), k.title = Re(f, "title"), k.length = Re(f, "length"), m.address = De(o, "address", Ie.kml), m.phoneNumber = De(o, "phoneNumber", Ie.kml), m.snippet = De(o, "Snippet", Ie.kml), function (e, t) {
      var o = Oe(e, "ExtendedData", Ie.kml);

      if (_(o)) {
        _(Oe(o, "SchemaData", Ie.kml)) && R("kml-schemaData", "KML - SchemaData is unsupported"), _(Re(o, "xmlns:prefix")) && R("kml-extendedData", "KML - ExtendedData with xmlns:prefix is unsupported");
        var r = {},
            n = Ue(o, "Data", Ie.kml);
        if (_(n)) for (var i = n.length, a = 0; a < i; a++) {
          var l = n[a],
              s = Re(l, "name");
          _(s) && (r[s] = {
            displayName: De(l, "displayName", Ie.kml),
            value: De(l, "value", Ie.kml)
          });
        }
        t.kml.extendedData = r;
      }
    }(o, d), function (e, t, o, r, n) {
      var i,
          a,
          l = t.kml,
          s = l.extendedData,
          d = De(e, "description", Ie.kml),
          m = E(t.balloonStyle, o.balloonStyle),
          c = L.WHITE,
          u = L.BLACK,
          p = d;

      if (_(m) && (c = E(m.bgColor, L.WHITE), u = E(m.textColor, L.BLACK), p = E(m.text, d)), _(p)) {
        if (p = (p = (p = (p = (p = (p = p.replace("$[name]", E(t.name, ""))).replace("$[description]", E(d, ""))).replace("$[address]", E(l.address, ""))).replace("$[Snippet]", E(l.snippet, ""))).replace("$[id]", t.id)).replace("$[geDirections]", ""), _(s)) {
          var g = p.match(/\$\[.+?\]/g);
          if (null !== g) for (w = 0; w < g.length; w++) {
            var v = g[w],
                h = v.substr(2, v.length - 3),
                f = /\/displayName$/.test(h),
                k = s[h = h.replace(/\/displayName$/, "")];
            _(k) && (k = f ? k.displayName : k.value), _(k) && (p = p.replace(v, E(k, "")));
          }
        }
      } else if (_(s) && 0 < (a = Object.keys(s)).length) {
        for (p = '<table class="pgEarth-infoBox-defaultTable pgEarth-infoBox-defaultTable-lighter"><tbody>', w = 0; w < a.length; w++) {
          k = s[i = a[w]], p += "<tr><th>" + E(k.displayName, i) + "</th><td>" + E(k.value, "") + "</td></tr>";
        }

        p += "</tbody></table>";
      }

      if (_(p)) {
        p = pe.link(p), ot.innerHTML = p;

        for (var x = ot.querySelectorAll("a"), w = 0; w < x.length; w++) {
          x[w].setAttribute("target", "_blank");
        }

        _(r) && 1 < r.keys.length && (Me(ot, "a", "href", r), Me(ot, "img", "src", r)), Te(ot, "a", "href", n), Te(ot, "img", "src", n);
        var y = '<div class="pgEarth-infoBox-description-lighter" style="';
        y += "overflow:auto;", y += "word-wrap:break-word;", y += "background-color:" + c.toCssColorString() + ";", y += "color:" + u.toCssColorString() + ";", y += '">', y += ot.innerHTML + "</div>", ot.innerHTML = "", t.description = y;
      }
    }(o, d, c, a, i);
    var x = e._ellipsoid;
    return dt(o, d, x), st(o, d, x), _(Oe(o, "Region", Ie.kml)) && R("kml-region", "KML - Placemark Regions are unsupported"), {
      entity: d,
      styleEntity: c
    };
  }

  var nt = {
    Document: it,
    Folder: function Folder(e, t, o, r, n, i, a, l, s) {
      var d = rt(e, t, o, r, n, i, a, 0, s);
      it(e, d.entity, o, r, n, i, a, l, s);
    },
    Placemark: function Placemark(e, t, o, r, n, i, a, l, s) {
      for (var d = rt(e, t, o, r, n, i, a, 0, s), m = d.entity, c = d.styleEntity, u = !1, p = o.childNodes, g = 0, v = p.length; g < v && !u; g++) {
        var h = p.item(g),
            f = tt[h.localName];
        _(f) && (f(e, r, h, m, c, m.id), u = !0);
      }

      u || (m.merge(c), Ye(e, m, c));
    },
    NetworkLink: function NetworkLink(v, e, t, o, r, n, i, a, l) {
      var h,
          f,
          k = rt(v, e, t, o, r, n, i, 0, l).entity,
          x = Oe(t, "Link", Ie.kml);
      _(x) || (x = Oe(t, "Url", Ie.kml));
      {
        var w, s, d, m, c, u, p, y, g;
        _(x) && (w = De(x, "href", Ie.kml), _(w) && (w = Fe(s = w, n, i), /^data:/.test(w.getUrlComponent()) ? /\.kmz/i.test(n.getUrlComponent()) || (s = n.getDerivedResource({
          url: s
        })) : (s = w.clone(), h = De(x, "viewRefreshMode", Ie.kml), f = E(De(x, "viewBoundScale", Ie.kml), 1), d = "onStop" === h ? "BBOX=[bboxWest],[bboxSouth],[bboxEast],[bboxNorth]" : "", m = E(De(x, "viewFormat", Ie.kml), d), c = De(x, "httpQuery", Ie.kml), _(m) && w.setQueryParameters(P(ut(m))), _(c) && w.setQueryParameters(P(ut(c))), u = v._ellipsoid, ft(w, v._camera, v._canvas, f, v._lastCameraView.bbox, u)), p = {
          sourceUri: s,
          uriResolver: i,
          context: k.id
        }, y = new X(), g = wt(v, y, w, p).then(function (e) {
          var t = v._entityCollection,
              o = y.values;
          t.suspendEvents();

          for (var r = 0; r < o.length; r++) {
            var n = o[r];
            _(n.parent) || (n.parent = k, Mt(n)), t.add(n);
          }

          t.resumeEvents();
          var i = De(x, "refreshMode", Ie.kml),
              a = E(Ae(x, "refreshInterval", Ie.kml), 0);

          if ("onInterval" === i && 0 < a || "onExpire" === i || "onStop" === h) {
            var l,
                s = Oe(e, "NetworkLinkControl", Ie.kml),
                d = _(s),
                m = I.now(),
                c = {
              id: C(),
              href: w,
              cookie: {},
              lastUpdated: m,
              updating: !1,
              entity: k,
              viewBoundScale: f,
              needsUpdate: !1,
              cameraUpdateTime: m
            },
                u = 0;

            if (d && (c.cookie = P(E(De(s, "cookie", Ie.kml), "")), u = E(Ae(s, "minRefreshPeriod", Ie.kml), 0)), "onInterval" === i) d && (a = Math.max(u, a)), c.refreshMode = ct.INTERVAL, c.time = a;else if ("onExpire" === i) {
              if (d && (l = De(s, "expires", Ie.kml)), _(l)) try {
                var p = I.fromIso8601(l),
                    g = I.secondsDifference(p, m);
                0 < g && g < u && I.addSeconds(m, u, p), c.refreshMode = ct.EXPIRE, c.time = p;
              } catch (e) {
                R("kml-refreshMode-onInterval-onExpire", "KML - NetworkLinkControl expires is not a valid date");
              } else R("kml-refreshMode-onExpire", "KML - refreshMode of onExpire requires the NetworkLinkControl to have an expires element");
            } else v._camera ? (c.refreshMode = ct.STOP, c.time = E(Ae(x, "viewRefreshTime", Ie.kml), 0)) : R("kml-refrehMode-onStop-noCamera", "A NetworkLink with viewRefreshMode=onStop requires a camera be passed in when creating the KmlDataSource");
            _(c.refreshMode) && v._networkLinks.set(c.id, c);
          } else "onRegion" === h && R("kml-refrehMode-onRegion", "KML - Unsupported viewRefreshMode: onRegion");
        }).otherwise(function (e) {
          R("An error occured during loading " + w.url), v._error.raiseEvent(v, e);
        }), a.push(g)));
      }
    },
    GroundOverlay: function GroundOverlay(e, t, o, r, n, i, a, l, s) {
      var d,
          m = rt(e, t, o, r, n, i, a, 0, s).entity,
          c = !1,
          u = e._ellipsoid,
          p = Ee(Oe(o, "LatLonQuad", Ie.gx), u),
          g = Ae(o, "drawOrder", Ie.kml);
      {
        var v, h, f, k, x, w, y;
        _(p) ? ((d = He()).hierarchy = new O(p), d.zIndex = g, m.polygon = d, c = !0) : ((d = new ie()).zIndex = g, m.rectangle = d, v = Oe(o, "LatLonBox", Ie.kml), _(v) && (h = Ae(v, "west", Ie.kml), f = Ae(v, "south", Ie.kml), k = Ae(v, "east", Ie.kml), x = Ae(v, "north", Ie.kml), _(h) && (h = N.negativePiToPi(N.toRadians(h))), _(f) && (f = N.clampToLatitudeRange(N.toRadians(f))), _(k) && (k = N.negativePiToPi(N.toRadians(k))), _(x) && (x = N.clampToLatitudeRange(N.toRadians(x))), d.coordinates = new U(h, f, k, x), w = Ae(v, "rotation", Ie.kml), _(w) && (y = N.toRadians(w), d.rotation = y, d.stRotation = y)));
      }
      var M = Oe(o, "Icon", Ie.kml),
          T = ze(M, e, i, a, !0);
      {
        var b, L, C, E;
        _(T) ? (c && R("kml-gx:LatLonQuad", "KML - gx:LatLonQuad Icon does not support texture projection."), b = Ae(M, "x", Ie.gx), L = Ae(M, "y", Ie.gx), C = Ae(M, "w", Ie.gx), E = Ae(M, "h", Ie.gx), (_(b) || _(L) || _(C) || _(E)) && R("kml-groundOverlay-xywh", "KML - gx:x, gx:y, gx:w, gx:h aren't supported for GroundOverlays"), d.material = T, d.material.color = Ge(o, "color", Ie.kml), d.material.transparent = !0) : d.material = Ge(o, "color", Ie.kml);
      }
      var S = De(o, "altitudeMode", Ie.kml);
      _(S) ? "absolute" === S ? (d.height = Ae(o, "altitude", Ie.kml), d.zIndex = void 0) : "clampToGround" !== S && R("kml-altitudeMode-unknown", "KML - Unknown altitudeMode: " + S) : "relativeToSeaFloor" === (S = De(o, "altitudeMode", Ie.gx)) ? (R("kml-altitudeMode-relativeToSeaFloor", "KML - altitudeMode relativeToSeaFloor is currently not supported, treating as absolute."), d.height = Ae(o, "altitude", Ie.kml), d.zIndex = void 0) : "clampToSeaFloor" === S ? R("kml-altitudeMode-clampToSeaFloor", "KML - altitudeMode clampToSeaFloor is currently not supported, treating as clampToGround.") : _(S) && R("kml-altitudeMode-unknown", "KML - Unknown altitudeMode: " + S);
    },
    PhotoOverlay: mt,
    ScreenOverlay: mt,
    Tour: function Tour(e, t, o, r, n, i, a, l, s) {
      var d = De(o, "name", Ie.kml),
          m = Re(o, "id"),
          c = new Y(d, m),
          u = Oe(o, "Playlist", Ie.gx);
      if (u) for (var p = e._ellipsoid, g = u.childNodes, v = 0; v < g.length; v++) {
        var h,
            f = g[v];
        f.localName && ((h = at[f.localName]) ? h(c, f, p) : console.log("Unknown KML Tour playlist entry type " + f.localName));
      }
      _(e.kmlTours) || (e.kmlTours = []);
      e.kmlTours.push(c);
    }
  };

  function it(e, t, o, r, n, i, a, l, s) {
    for (var d = Object.keys(nt), m = d.length, c = 0; c < m; c++) {
      for (var u = d[c], p = nt[u], g = o.childNodes, v = g.length, h = 0; h < v; h++) {
        var f = g[h];
        f.localName !== u || -1 === Ie.kml.indexOf(f.namespaceURI) && -1 === Ie.gx.indexOf(f.namespaceURI) || p(e, t, f, r, n, i, a, l, s);
      }
    }
  }

  var at = {
    FlyTo: function FlyTo(e, t, o) {
      var r = Ae(t, "duration", Ie.gx),
          n = De(t, "flyToMode", Ie.gx),
          i = {
        kml: {}
      };
      dt(t, i, o), st(t, i, o);
      var a = i.kml.lookAt || i.kml.camera,
          l = new J(r, n, a);
      e.addPlaylistEntry(l);
    },
    Wait: function Wait(e, t) {
      var o = Ae(t, "duration", Ie.gx);
      e.addPlaylistEntry(new Z(o));
    },
    SoundCue: lt,
    AnimatedUpdate: lt,
    TourControl: lt
  };

  function lt(e, t) {
    R("KML Tour unsupported node " + t.localName);
  }

  function st(e, t, o) {
    var r,
        n,
        i,
        a,
        l,
        s,
        d,
        m,
        c = Oe(e, "Camera", Ie.kml);
    _(c) && (r = E(Ae(c, "longitude", Ie.kml), 0), n = E(Ae(c, "latitude", Ie.kml), 0), i = E(Ae(c, "altitude", Ie.kml), 0), a = E(Ae(c, "heading", Ie.kml), 0), l = E(Ae(c, "tilt", Ie.kml), 0), s = E(Ae(c, "roll", Ie.kml), 0), d = b.fromDegrees(r, n, i, o), m = g.fromDegrees(a, l - 90, s), t.kml.camera = new Q(d, m));
  }

  function dt(e, t, o) {
    var r,
        n,
        i,
        a,
        l,
        s,
        d,
        m,
        c = Oe(e, "LookAt", Ie.kml);
    _(c) && (r = E(Ae(c, "longitude", Ie.kml), 0), n = E(Ae(c, "latitude", Ie.kml), 0), i = E(Ae(c, "altitude", Ie.kml), 0), s = Ae(c, "heading", Ie.kml), l = Ae(c, "tilt", Ie.kml), a = E(Ae(c, "range", Ie.kml), 0), l = N.toRadians(E(l, 0)), s = N.toRadians(E(s, 0)), d = new p(s, l - N.PI_OVER_TWO, a), m = b.fromDegrees(r, n, i, o), t.kml.lookAt = new $(m, d));
  }

  function mt(e, t, o, r, n, i, a, l, s) {
    e._unsupportedNode.raiseEvent(e, t, o, r, n, i, a), R("kml-unsupportedFeature-" + o.nodeName, "KML - Unsupported feature: " + o.nodeName);
  }

  var ct = {
    INTERVAL: 0,
    EXPIRE: 1,
    STOP: 2
  };

  function ut(e) {
    if (!_(e) || 0 === e.length) return "";
    var t = e[0];
    return "&" !== t && "?" !== t || (e = e.substring(1)), e;
  }

  var pt = new U(),
      gt = new e(),
      vt = new T(),
      ht = new b();

  function ft(e, t, o, r, n, i) {
    function a(e) {
      return e < -N.PI_OVER_TWO ? -N.PI_OVER_TWO : e > N.PI_OVER_TWO ? N.PI_OVER_TWO : e;
    }

    function l(e) {
      return e > N.PI ? e - N.TWO_PI : e < -N.PI ? e + N.TWO_PI : e;
    }

    var s,
        d,
        m,
        c,
        u,
        p,
        g,
        v,
        h,
        f,
        k,
        x = w(e.queryParameters);
    x = x.replace(/%5B/g, "[").replace(/%5D/g, "]"), x = _(t) && t._mode !== D.MORPHING ? (n = E(n, pt), _(o) && (vt.x = .5 * o.clientWidth, vt.y = .5 * o.clientHeight, s = t.pickEllipsoid(vt, i, ht)), _(s) ? d = i.cartesianToCartographic(s, gt) : (d = U.center(n, gt), s = i.cartographicToCartesian(d)), _(r) && !N.equalsEpsilon(r, 1, N.EPSILON9) && (m = n.width * r * .5, c = n.height * r * .5, n = new U(l(d.longitude - m), a(d.latitude - c), l(d.longitude + m), a(d.latitude + c))), x = (x = (x = (x = x.replace("[bboxWest]", N.toDegrees(n.west).toString())).replace("[bboxSouth]", N.toDegrees(n.south).toString())).replace("[bboxEast]", N.toDegrees(n.east).toString())).replace("[bboxNorth]", N.toDegrees(n.north).toString()), u = N.toDegrees(d.longitude).toString(), p = N.toDegrees(d.latitude).toString(), x = (x = (x = (x = (x = (x = (x = (x = x.replace("[lookatLon]", u)).replace("[lookatLat]", p)).replace("[lookatTilt]", N.toDegrees(t.pitch).toString())).replace("[lookatHeading]", N.toDegrees(t.heading).toString())).replace("[lookatRange]", b.distance(t.positionWC, s))).replace("[lookatTerrainLon]", u)).replace("[lookatTerrainLat]", p)).replace("[lookatTerrainAlt]", d.height.toString()), i.cartesianToCartographic(t.positionWC, gt), x = (x = (x = x.replace("[cameraLon]", N.toDegrees(gt.longitude).toString())).replace("[cameraLat]", N.toDegrees(gt.latitude).toString())).replace("[cameraAlt]", N.toDegrees(gt.height).toString()), v = (g = t.frustum).aspectRatio, f = h = "", _(v) && (k = N.toDegrees(g.fov), 1 < v ? f = (h = k) / v : h = (f = k) * v), (x = x.replace("[horizFov]", h.toString())).replace("[vertFov]", f.toString())) : (x = (x = (x = (x = (x = (x = (x = (x = (x = (x = (x = (x = (x = (x = (x = (x = x.replace("[bboxWest]", "-180")).replace("[bboxSouth]", "-90")).replace("[bboxEast]", "180")).replace("[bboxNorth]", "90")).replace("[lookatLon]", "")).replace("[lookatLat]", "")).replace("[lookatRange]", "")).replace("[lookatTilt]", "")).replace("[lookatHeading]", "")).replace("[lookatTerrainLon]", "")).replace("[lookatTerrainLat]", "")).replace("[lookatTerrainAlt]", "")).replace("[cameraLon]", "")).replace("[cameraLat]", "")).replace("[cameraAlt]", "")).replace("[horizFov]", "")).replace("[vertFov]", ""), x = (x = (x = (x = (x = (x = _(o) ? (x = x.replace("[horizPixels]", o.clientWidth)).replace("[vertPixels]", o.clientHeight) : (x = x.replace("[horizPixels]", "")).replace("[vertPixels]", "")).replace("[terrainEnabled]", "1")).replace("[clientVersion]", "1")).replace("[kmlVersion]", "2.2")).replace("[clientName]", "PGEarth")).replace("[language]", "English"), e.setQueryParameters(P(x));
  }

  function kt(g, v, h, f, k, x) {
    v.removeAll();
    var w = [],
        e = h.documentElement,
        t = De("Document" === e.localName ? e : Oe(e, "Document", Ie.kml), "name", Ie.kml);
    _(t) || (t = a(f.getUrlComponent())), _(g._name) || (g._name = t);
    var y = new X(g);
    return K.all(Xe(g, h, y, f, !1, k)).then(function () {
      var e,
          t,
          o,
          r,
          n,
          i,
          a,
          l,
          s,
          d,
          m = h.documentElement;
      if ("kml" === m.localName) for (var c = m.childNodes, u = 0; u < c.length; u++) {
        var p = c[u];

        if (_(nt[p.localName])) {
          m = p;
          break;
        }
      }
      return v.suspendEvents(), e = g, o = void 0, r = v, n = y, i = f, a = k, l = w, s = x, d = nt[(t = m).localName], _(d) ? d(e, o, t, r, n, i, a, l, s) : mt(e, o, t, r, n, i, a), v.resumeEvents(), K.all(w).then(function () {
        return h.documentElement;
      });
    });
  }

  function xt(c, u, e, p) {
    var g = K.defer();
    return B.createReader(new B.BlobReader(e), function (m) {
      m.getEntries(function (e) {
        for (var t, o, r, n, i = [], a = {}, l = 0; l < e.length; l++) {
          var s,
              d = e[l];
          d.directory || (s = K.defer(), i.push(s.promise), !/\.kml$/i.test(d.filename) || _(t) && /\//i.test(d.filename) ? ye(d, a, s) : (_(t) && ye(t, a, o), t = d, o = s));
        }

        _(t) && (r = a, n = o, t.getData(new B.TextWriter(), function (e) {
          e = we(e = xe(e)), r.kml = ue.parseFromString(e, "application/xml"), n.resolve();
        })), K.all(i).then(function () {
          return m.close(), _(a.kml) ? (a.keys = Object.keys(a), kt(c, u, a.kml, p, a)) : void g.reject(new h("KMZ file does not contain a KML document."));
        }).then(g.resolve).otherwise(g.reject);
      });
    }, function (e) {
      g.reject(e);
    }), g.promise;
  }

  function wt(i, a, e, t) {
    var l = (t = E(t, E.EMPTY_OBJECT)).sourceUri,
        s = t.uriResolver,
        d = t.context,
        o = e,
        l = "string" == typeof e || e instanceof v ? (o = (e = v.createIfNeeded(e)).fetchBlob(), E(l, e.clone())) : E(l, v.DEFAULT.clone());
    return l = v.createIfNeeded(l), K(o).then(function (n) {
      return n instanceof Blob ? (t = (e = n).slice(0, Math.min(4, e.size)), o = K.defer(), (r = new FileReader()).addEventListener("load", function () {
        o.resolve(1347093252 === new DataView(r.result).getUint32(0, !1));
      }), r.addEventListener("error", function () {
        o.reject(r.error);
      }), r.readAsArrayBuffer(t), o.promise.then(function (e) {
        return e ? xt(i, a, n, l) : (t = n, o = K.defer(), (r = new FileReader()).addEventListener("load", function () {
          o.resolve(r.result);
        }), r.addEventListener("error", function () {
          o.reject(r.error);
        }), r.readAsText(t), o.promise.then(function (e) {
          var t, o;
          e = we(e = xe(e));

          try {
            t = ue.parseFromString(e, "application/xml");
          } catch (e) {
            o = e.toString();
          }

          if (_(o) || t.body || "parsererror" === t.documentElement.tagName) {
            var r = (r = _(o) ? o : t.documentElement.firstChild.nodeValue) || t.body.innerText;
            throw new h(r);
          }

          return kt(i, a, t, l, s, d);
        }));
        var t, o, r;
      })) : kt(i, a, n, l, s, d);
      var e, t, o, r;
    }).otherwise(function (e) {
      return i._error.raiseEvent(i, e), console.log(e), K.reject(e);
    });
  }

  function yt(e) {
    var t = (e = E(e, {})).camera,
        o = e.canvas;
    if (!_(t)) throw new n("options.camera is required.");
    if (!_(o)) throw new n("options.canvas is required.");
    this._changed = new i(), this._error = new i(), this._loading = new i(), this._refresh = new i(), this._unsupportedNode = new i(), this._clock = void 0, this._entityCollection = new X(this), this._name = void 0, this._isLoading = !1, this._pinBuilder = new s(), this._networkLinks = new r(), this._entityCluster = new j(), this._canvas = o, this._camera = t, this._lastCameraView = {
      position: _(t) ? b.clone(t.positionWC) : void 0,
      direction: _(t) ? b.clone(t.directionWC) : void 0,
      up: _(t) ? b.clone(t.upWC) : void 0,
      bbox: _(t) ? t.computeViewRectangle() : U.clone(U.MAX_VALUE)
    }, this._ellipsoid = E(e.ellipsoid, u.WGS84);
  }

  function Mt(e) {
    var t,
        o,
        r = e.parent;
    _(r) && (t = r.availability, _(t) && (o = e.availability, _(o) ? o.intersect(t) : e.availability = t));
  }

  function Tt(M, T, b, L, C) {
    return function (e) {
      if (L.contains(T.id)) {
        var t = !1,
            o = Oe(e, "NetworkLinkControl", Ie.kml),
            r = 0;

        if (_(o)) {
          if (_(Oe(o, "Update", Ie.kml))) return R("kml-networkLinkControl-update", "KML - NetworkLinkControl updates aren't supported."), T.updating = !1, void L.remove(T.id);
          T.cookie = P(E(De(o, "cookie", Ie.kml), "")), r = E(Ae(o, "minRefreshPeriod", Ie.kml), 0);
        }

        var n,
            i = I.now(),
            a = T.refreshMode;
        if (a === ct.INTERVAL) _(o) && (T.time = Math.max(r, T.time));else if (a === ct.EXPIRE) {
          if (_(o) && (n = De(o, "expires", Ie.kml)), _(n)) try {
            var l = I.fromIso8601(n),
                s = I.secondsDifference(l, i);
            0 < s && s < r && I.addSeconds(i, r, l), T.time = l;
          } catch (e) {
            R("kml-networkLinkControl-expires", "KML - NetworkLinkControl expires is not a valid date"), t = !0;
          } else R("kml-refreshMode-onExpire", "KML - refreshMode of onExpire requires the NetworkLinkControl to have an expires element"), t = !0;
        }
        var d = T.entity,
            m = M._entityCollection,
            c = b.values;
        m.suspendEvents();

        for (var u = m.values.slice(), p = 0; p < u.length; ++p) {
          var g = u[p];
          g.parent === d && (g.parent = void 0, function e(t) {
            m.remove(t);

            for (var o = t._children, r = o.length, n = 0; n < r; ++n) {
              e(o[n]);
            }
          }(g));
        }

        for (m.resumeEvents(), m.suspendEvents(), p = 0; p < c.length; p++) {
          var v = c[p];
          _(v.parent) || (v.parent = d, Mt(v)), m.add(v);
        }

        m.resumeEvents(), t ? L.remove(T.id) : T.lastUpdated = i;
        var h,
            f = m.computeAvailability(),
            k = f.start,
            x = f.stop,
            w = I.equals(k, S.MINIMUM_VALUE),
            y = I.equals(x, S.MAXIMUM_VALUE);
        w && y || (h = M._clock).startTime === k && h.stopTime === x || (h.startTime = k, h.stopTime = x, M._changed.raiseEvent(M)), T.updating = !1, T.needsUpdate = !1, M._refresh.raiseEvent(M, C.getUrlComponent(!0));
      }
    };
  }

  yt.load = function (e, t) {
    return new yt(t = E(t, E.EMPTY_OBJECT)).load(e, t);
  }, t(yt.prototype, {
    name: {
      get: function get() {
        return this._name;
      },
      set: function set(e) {
        this._name !== e && (this._name = e, this._changed.raiseEvent(this));
      }
    },
    clock: {
      get: function get() {
        return this._clock;
      }
    },
    entities: {
      get: function get() {
        return this._entityCollection;
      }
    },
    isLoading: {
      get: function get() {
        return this._isLoading;
      }
    },
    changedEvent: {
      get: function get() {
        return this._changed;
      }
    },
    errorEvent: {
      get: function get() {
        return this._error;
      }
    },
    loadingEvent: {
      get: function get() {
        return this._loading;
      }
    },
    refreshEvent: {
      get: function get() {
        return this._refresh;
      }
    },
    unsupportedNodeEvent: {
      get: function get() {
        return this._unsupportedNode;
      }
    },
    show: {
      get: function get() {
        return this._entityCollection.show;
      },
      set: function set(e) {
        this._entityCollection.show = e;
      }
    },
    clustering: {
      get: function get() {
        return this._entityCluster;
      },
      set: function set(e) {
        if (!_(e)) throw new n("value must be defined.");
        this._entityCluster = e;
      }
    }
  }), yt.prototype.load = function (e, t) {
    if (!_(e)) throw new n("data is required.");
    t = E(t, {}), H.setLoading(this, !0);
    var s = this._name;
    this._name = void 0, this._clampToGround = E(t.clampToGround, !1);
    var d = this;
    return wt(this, this._entityCollection, e, t).then(function () {
      var e,
          t,
          o = d._entityCollection.computeAvailability(),
          r = o.start,
          n = o.stop,
          i = I.equals(r, S.MINIMUM_VALUE),
          a = I.equals(n, S.MAXIMUM_VALUE);

      i && a || (i && ((t = new Date()).setHours(0, 0, 0, 0), r = I.fromDate(t)), a && ((t = new Date()).setHours(24, 0, 0, 0), n = I.fromDate(t)), (e = new q()).startTime = r, e.stopTime = n, e.currentTime = I.clone(r), e.clockRange = m.LOOP_STOP, e.clockStep = c.SYSTEM_CLOCK_MULTIPLIER, e.multiplier = Math.round(Math.min(Math.max(I.secondsDifference(n, r) / 60, 1), 31556900)));
      var l = !1;
      return e !== d._clock && (d._clock = e, l = !0), s !== d._name && (l = !0), l && d._changed.raiseEvent(d), H.setLoading(d, !1), d;
    }).otherwise(function (e) {
      return H.setLoading(d, !1), d._error.raiseEvent(d, e), console.log(e), K.reject(e);
    });
  };
  var bt = new r();

  function Lt() {
    this.author = {
      name: void 0,
      uri: void 0,
      email: void 0
    }, this.link = {
      href: void 0,
      hreflang: void 0,
      rel: void 0,
      type: void 0,
      title: void 0,
      length: void 0
    }, this.address = void 0, this.phoneNumber = void 0, this.snippet = void 0, this.extendedData = void 0;
  }

  return yt.prototype.update = function (e) {
    var t = this._networkLinks;
    if (0 === t.length) return !0;
    var a = I.now(),
        l = this;
    bt.removeAll();
    var s = !1,
        d = this._lastCameraView,
        o = this._camera;
    !_(o) || o.positionWC.equalsEpsilon(d.position, N.EPSILON7) && o.directionWC.equalsEpsilon(d.direction, N.EPSILON7) && o.upWC.equalsEpsilon(d.up, N.EPSILON7) || (d.position = b.clone(o.positionWC), d.direction = b.clone(o.directionWC), d.up = b.clone(o.upWC), d.bbox = o.computeViewRectangle(), s = !0);
    var m = new r(),
        c = !1;
    return t.values.forEach(function (o) {
      var e,
          t,
          r,
          n,
          i = o.entity;
      bt.contains(i.id) || (o.updating || (e = !1, o.refreshMode === ct.INTERVAL ? I.secondsDifference(a, o.lastUpdated) > o.time && (e = !0) : o.refreshMode === ct.EXPIRE ? I.greaterThan(a, o.time) && (e = !0) : o.refreshMode === ct.STOP && (s && (o.needsUpdate = !0, o.cameraUpdateTime = a), o.needsUpdate && I.secondsDifference(a, o.cameraUpdateTime) >= o.time && (e = !0)), e && (function e(t) {
        for (var o = t._children, r = o.length, n = 0; n < r; ++n) {
          var i = o[n];
          bt.set(i.id, i), e(i);
        }
      }(i), o.updating = !0, t = new X(), (r = o.href.clone()).setQueryParameters(o.cookie), n = E(l._ellipsoid, u.WGS84), ft(r, l._camera, l._canvas, o.viewBoundScale, d.bbox, n), wt(l, t, r, {
        context: i.id
      }).then(Tt(l, o, t, m, r)).otherwise(function (e) {
        var t = "NetworkLink " + o.href + " refresh failed: " + e;
        console.log(t), l._error.raiseEvent(l, t);
      }), c = !0)), m.set(o.id, o));
    }), c && (this._networkLinks = m, this._changed.raiseEvent(this)), !0;
  }, yt;
});