"use strict";

define(["../Core/Cartographic", "../Core/defined", "../Core/DeveloperError", "../Core/RuntimeError", "./ImageryLayerFeatureInfo", "../extends/core/MercatorToDegree"], function (m, c, o, f, u, p) {
  "use strict";

  function n(e) {
    for (var t = [], r = e.features, o = 0; o < r.length; ++o) {
      var n,
          i,
          a,
          l = r[o],
          s = new u();
      s.data = l, s.properties = l.properties, s.configureNameFromProperties(l.properties), s.configureDescriptionFromProperties(l.properties), c(l.geometry) && "Point" === l.geometry.type && (n = l.geometry.coordinates[0], i = l.geometry.coordinates[1], -180 <= n && n <= 180 ? s.position = m.fromDegrees(n, i) : (a = p.handleMecToDegree(n, i), s.position = m.fromDegrees(a[0], a[1]))), t.push(s);
    }

    return t;
  }

  var d = "http://www.mapinfo.com/mxp",
      r = "http://www.esri.com/wms",
      i = "http://www.opengis.net/wfs",
      a = "http://www.opengis.net/gml";

  function l(e) {
    var t = e.documentElement;
    if ("MultiFeatureCollection" === t.localName && t.namespaceURI === d) return function (e) {
      for (var t = [], r = e.documentElement.getElementsByTagNameNS(d, "Feature"), o = 0; o < r.length; ++o) {
        for (var n = r[o], i = {}, a = n.getElementsByTagNameNS(d, "Val"), l = 0; l < a.length; ++l) {
          var s,
              m,
              c = a[l];
          c.hasAttribute("ref") && (s = c.getAttribute("ref"), m = c.textContent.trim(), i[s] = m);
        }

        var f = new u();
        f.data = n, f.properties = i, f.configureNameFromProperties(i), f.configureDescriptionFromProperties(i), t.push(f);
      }

      return t;
    }(e);
    if ("FeatureInfoResponse" === t.localName && t.namespaceURI === r) return function (e) {
      var t,
          r = e.documentElement,
          o = [],
          n = r.getElementsByTagNameNS("*", "FIELDS");
      if (0 < n.length) for (var i = 0; i < n.length; ++i) {
        var a = n[i];
        t = {};

        for (var l = a.attributes, s = 0; s < l.length; ++s) {
          var m = l[s];
          t[m.name] = m.value;
        }

        o.push(g(a, t));
      } else for (var c = r.getElementsByTagNameNS("*", "FeatureInfo"), f = 0; f < c.length; ++f) {
        var u = c[f];
        t = {};

        for (var p = u.childNodes, d = 0; d < p.length; ++d) {
          var h = p[d];
          h.nodeType === Node.ELEMENT_NODE && (t[h.localName] = h.textContent);
        }

        o.push(g(u, t));
      }
      return o;
    }(e);
    if ("FeatureCollection" === t.localName && t.namespaceURI === i) return function (e) {
      for (var t = [], r = e.documentElement.getElementsByTagNameNS(a, "featureMember"), o = 0; o < r.length; ++o) {
        var n = r[o],
            i = {};
        h(n, i), t.push(g(n, i));
      }

      return t;
    }(e);
    if ("ServiceExceptionReport" === t.localName) throw new f(new XMLSerializer().serializeToString(t));
    return ("msGMLOutput" === t.localName ? function (e) {
      for (var t, r = [], o = e.documentElement.childNodes, n = 0; n < o.length; n++) {
        if (o[n].nodeType === Node.ELEMENT_NODE) {
          t = o[n];
          break;
        }
      }

      if (!c(t)) throw new f("Unable to find first child of the feature info xml document");

      for (var i = t.childNodes, a = 0; a < i.length; ++a) {
        var l,
            s = i[a];
        s.nodeType === Node.ELEMENT_NODE && (h(s, l = {}), r.push(g(s, l)));
      }

      return r;
    } : function (e) {
      var t = new XMLSerializer().serializeToString(e),
          r = document.createElement("div"),
          o = document.createElement("pre");
      o.textContent = t, r.appendChild(o);
      var n = new u();
      return n.data = e, n.description = r.innerHTML, [n];
    })(e);
  }

  function h(e, t) {
    for (var r = !0, o = 0; o < e.childNodes.length; ++o) {
      var n = e.childNodes[o];
      n.nodeType === Node.ELEMENT_NODE && (r = !1), "Point" !== n.localName && "LineString" !== n.localName && "Polygon" !== n.localName && "boundedBy" !== n.localName && n.hasChildNodes() && h(n, t) && (t[n.localName] = n.textContent);
    }

    return r;
  }

  function g(e, t) {
    var r = new u();
    return r.data = e, r.properties = t, r.configureNameFromProperties(t), r.configureDescriptionFromProperties(t), r;
  }

  var s = /<body>\s*<\/body>/im,
      N = /<ServiceExceptionReport([\s\S]*)<\/ServiceExceptionReport>/im,
      v = /<title>([\s\S]*)<\/title>/im;

  function E(e) {
    if (!s.test(e) && !N.test(e)) {
      var t,
          r = v.exec(e);
      r && 1 < r.length && (t = r[1]);
      var o = new u();
      return o.name = t, o.description = e, o.data = e, [o];
    }
  }

  return function (e, t, r) {
    if (!c(e)) throw new o("type is required.");
    if (this.type = e, !c(t)) if ("json" === e) t = "application/json";else if ("xml" === e) t = "text/xml";else if ("html" === e) t = "text/html";else {
      if ("text" !== e) throw new o('format is required when type is not "json", "xml", "html", or "text".');
      t = "text/plain";
    }
    if (this.format = t, !c(r)) if ("json" === e) r = n;else if ("xml" === e) r = l;else if ("html" === e) r = E;else {
      if ("text" !== e) throw new o('callback is required when type is not "json", "xml", "html", or "text".');
      r = E;
    }
    this.callback = r;
  };
});