"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, t) {
  "function" == typeof define && define.amd ? define(t) : e.DOMPurify = t();
}(void 0, function () {
  "use strict";

  var fe = ["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"],
      pe = ["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "audio", "canvas", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "video", "view", "vkern"],
      he = ["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"],
      ge = ["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmuliscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mpspace", "msqrt", "mystyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover"],
      ye = ["#text"],
      ve = ["accept", "action", "align", "alt", "autocomplete", "background", "bgcolor", "border", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "coords", "crossorigin", "datetime", "default", "dir", "disabled", "download", "enctype", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "integrity", "ismap", "label", "lang", "list", "loop", "low", "max", "maxlength", "media", "method", "min", "multiple", "name", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "type", "usemap", "valign", "value", "width", "xmlns"],
      be = ["accent-height", "accumulate", "additivive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "tabindex", "targetx", "targety", "transform", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"],
      Te = ["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"],
      Ae = ["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"];

  function xe(e, t) {
    for (var n = t.length; n--;) {
      "string" == typeof t[n] && (t[n] = t[n].toLowerCase()), e[t[n]] = !0;
    }

    return e;
  }

  function Se(e) {
    var t = {},
        n = void 0;

    for (n in e) {
      Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    }

    return t;
  }

  var ke = /\{\{[\s\S]*|[\s\S]*\}\}/gm,
      we = /<%[\s\S]*|[\s\S]*%>/gm,
      Le = /^data-[\-\w.\u00B7-\uFFFF]/,
      Ee = /^aria-[\-\w]+$/,
      Ne = /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
      Oe = /^(?:\w+script|data):/i,
      Me = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g,
      _e = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
    return _typeof(e);
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
  };

  function De(e) {
    if (Array.isArray(e)) {
      for (var t = 0, n = Array(e.length); t < e.length; t++) {
        n[t] = e[t];
      }

      return n;
    }

    return Array.from(e);
  }

  var Ce = function Ce() {
    return "undefined" == typeof window ? null : window;
  };

  return function t(e) {
    function u(e) {
      return t(e);
    }

    var s = 0 < arguments.length && void 0 !== e ? e : Ce();
    if (u.version = "1.0.8", u.removed = [], !s || !s.document || 9 !== s.document.nodeType) return u.isSupported = !1, u;
    var n,
        c = s.document,
        i = !1,
        a = !1,
        l = s.document,
        d = s.DocumentFragment,
        r = s.HTMLTemplateElement,
        m = s.Node,
        o = s.NodeFilter,
        f = s.NamedNodeMap,
        p = void 0 === f ? s.NamedNodeMap || s.MozNamedAttrMap : f,
        h = s.Text,
        g = s.Comment,
        y = s.DOMParser;
    "function" != typeof r || (n = l.createElement("template")).content && n.content.ownerDocument && (l = n.content.ownerDocument);
    var v = l.implementation,
        b = l.createNodeIterator,
        T = l.getElementsByTagName,
        A = l.createDocumentFragment,
        x = c.importNode,
        S = {};
    u.isSupported = v && void 0 !== v.createHTMLDocument && 9 !== l.documentMode;

    function k(e) {
      "object" !== (void 0 === e ? "undefined" : _e(e)) && (e = {}), F = "ALLOWED_TAGS" in e ? xe({}, e.ALLOWED_TAGS) : z, H = "ALLOWED_ATTR" in e ? xe({}, e.ALLOWED_ATTR) : I, P = "FORBID_TAGS" in e ? xe({}, e.FORBID_TAGS) : {}, j = "FORBID_ATTR" in e ? xe({}, e.FORBID_ATTR) : {}, te = "USE_PROFILES" in e && e.USE_PROFILES, U = !1 !== e.ALLOW_ARIA_ATTR, W = !1 !== e.ALLOW_DATA_ATTR, B = e.ALLOW_UNKNOWN_PROTOCOLS || !1, G = e.SAFE_FOR_JQUERY || !1, q = e.SAFE_FOR_TEMPLATES || !1, V = e.WHOLE_DOCUMENT || !1, X = e.RETURN_DOM || !1, $ = e.RETURN_DOM_FRAGMENT || !1, J = e.RETURN_DOM_IMPORT || !1, K = e.FORCE_BODY || !1, Q = !1 !== e.SANITIZE_DOM, Z = !1 !== e.KEEP_CONTENT, ee = e.IN_PLACE || !1, R = e.ALLOWED_URI_REGEXP || R, q && (W = !1), $ && (X = !0), te && (F = xe({}, [].concat(De(ye))), H = [], !0 === te.html && (xe(F, fe), xe(H, ve)), !0 === te.svg && (xe(F, pe), xe(H, be), xe(H, Ae)), !0 === te.svgFilters && (xe(F, he), xe(H, be), xe(H, Ae)), !0 === te.mathMl && (xe(F, ge), xe(H, Te), xe(H, Ae))), e.ADD_TAGS && (F === z && (F = Se(F)), xe(F, e.ADD_TAGS)), e.ADD_ATTR && (H === I && (H = Se(H)), xe(H, e.ADD_ATTR)), e.ADD_URI_SAFE_ATTR && xe(oe, e.ADD_URI_SAFE_ATTR), Z && (F["#text"] = !0), V && xe(F, ["html", "head", "body"]), F.table && xe(F, ["tbody"]), Object && "freeze" in Object && Object.freeze(e), ie = e;
    }

    function w(t) {
      u.removed.push({
        element: t
      });

      try {
        t.parentNode.removeChild(t);
      } catch (e) {
        t.outerHTML = "";
      }
    }

    function L(e, t) {
      try {
        u.removed.push({
          attribute: t.getAttributeNode(e),
          from: t
        });
      } catch (e) {
        u.removed.push({
          attribute: null,
          from: t
        });
      }

      t.removeAttribute(e);
    }

    function E(e) {
      var t,
          n,
          r = void 0,
          o = void 0;
      if (K ? e = "<remove></remove>" + e : (o = (t = e.match(/^[\s]+/)) && t[0]) && (e = e.slice(o.length)), i) try {
        r = new y().parseFromString(e, "text/html");
      } catch (e) {}
      return a && xe(P, ["title"]), r && r.documentElement || ((n = (r = v.createHTMLDocument("")).body).parentNode.removeChild(n.parentNode.firstElementChild), n.outerHTML = e), o && r.body.insertBefore(l.createTextNode(o), r.body.childNodes[0] || null), T.call(r, V ? "html" : "body")[0];
    }

    var N = ke,
        O = we,
        M = Le,
        _ = Ee,
        D = Oe,
        C = Me,
        R = Ne,
        F = null,
        z = xe({}, [].concat(De(fe), De(pe), De(he), De(ge), De(ye))),
        H = null,
        I = xe({}, [].concat(De(ve), De(be), De(Te), De(Ae))),
        P = null,
        j = null,
        U = !0,
        W = !0,
        B = !1,
        G = !1,
        q = !1,
        V = !1,
        Y = !1,
        K = !1,
        X = !1,
        $ = !1,
        J = !1,
        Q = !0,
        Z = !0,
        ee = !1,
        te = {},
        ne = xe({}, ["audio", "head", "math", "script", "style", "template", "svg", "video"]),
        re = xe({}, ["audio", "video", "img", "source", "image"]),
        oe = xe({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "summary", "title", "value", "style", "xmlns"]),
        ie = null,
        ae = l.createElement("form");
    u.isSupported && (function () {
      try {
        E('<svg><p><style><img src="</style><img src=x onerror=alert(1)//">').querySelector("svg img") && (i = !0);
      } catch (e) {}
    }(), function () {
      try {
        E("<x/><title>&lt;/title&gt;&lt;img&gt;").querySelector("title").textContent.match(/<\/title/) && (a = !0);
      } catch (e) {}
    }());

    function le(e) {
      return b.call(e.ownerDocument || e, e, o.SHOW_ELEMENT | o.SHOW_COMMENT | o.SHOW_TEXT, function () {
        return o.FILTER_ACCEPT;
      }, !1);
    }

    function se(e) {
      return "object" === (void 0 === m ? "undefined" : _e(m)) ? e instanceof m : e && "object" === (void 0 === e ? "undefined" : _e(e)) && "number" == typeof e.nodeType && "string" == typeof e.nodeName;
    }

    function ce(e, t, n) {
      S[e] && S[e].forEach(function (e) {
        e.call(u, t, n, ie);
      });
    }

    function de(e) {
      var t,
          n = void 0;
      if (ce("beforeSanitizeElements", e, null), !((t = e) instanceof h || t instanceof g || "string" == typeof t.nodeName && "string" == typeof t.textContent && "function" == typeof t.removeChild && t.attributes instanceof p && "function" == typeof t.removeAttribute && "function" == typeof t.setAttribute)) return w(e), 1;
      var r = e.nodeName.toLowerCase();
      if (ce("uponSanitizeElement", e, {
        tagName: r,
        allowedTags: F
      }), F[r] && !P[r]) return !G || e.firstElementChild || e.content && e.content.firstElementChild || !/</g.test(e.textContent) || (u.removed.push({
        element: e.cloneNode()
      }), e.innerHTML ? e.innerHTML = e.innerHTML.replace(/</g, "&lt;") : e.innerHTML = e.textContent.replace(/</g, "&lt;")), q && 3 === e.nodeType && (n = (n = (n = e.textContent).replace(N, " ")).replace(O, " "), e.textContent !== n && (u.removed.push({
        element: e.cloneNode()
      }), e.textContent = n)), ce("afterSanitizeElements", e, null), 0;
      if (Z && !ne[r] && "function" == typeof e.insertAdjacentHTML) try {
        e.insertAdjacentHTML("AfterEnd", e.innerHTML);
      } catch (e) {}
      return w(e), 1;
    }

    function ue(e, t, n) {
      if (Q && ("id" === t || "name" === t) && (n in l || n in ae)) return !1;

      if (q && (n = (n = n.replace(N, " ")).replace(O, " ")), !(W && M.test(t) || U && _.test(t))) {
        if (!H[t] || j[t]) return !1;
        if (!oe[t] && !R.test(n.replace(C, "")) && ("src" !== t && "xlink:href" !== t || "script" === e || 0 !== n.indexOf("data:") || !re[e]) && (!B || D.test(n.replace(C, ""))) && n) return !1;
      }

      return !0;
    }

    function me(e) {
      var t = void 0,
          n = void 0,
          r = void 0,
          o = void 0,
          i = void 0;
      ce("beforeSanitizeAttributes", e, null);
      var a = e.attributes;

      if (a) {
        for (var l = {
          attrName: "",
          attrValue: "",
          keepAttr: !0,
          allowedAttributes: H
        }, i = a.length; i--;) {
          var s = (t = a[i]).name,
              c = t.namespaceURI,
              n = t.value.trim(),
              r = s.toLowerCase();
          if (l.attrName = r, l.attrValue = n, l.keepAttr = !0, ce("uponSanitizeAttribute", e, l), n = l.attrValue, "name" === r && "IMG" === e.nodeName && a.id) o = a.id, a = Array.prototype.slice.apply(a), L("id", e), L(s, e), a.indexOf(o) > i && e.setAttribute("id", o.value);else {
            if ("INPUT" === e.nodeName && "type" === r && "file" === n && (H[r] || !j[r])) continue;
            "id" === s && e.setAttribute(s, ""), L(s, e);
          }

          if (l.keepAttr) {
            var d = e.nodeName.toLowerCase();
            if (ue(d, r, n)) try {
              c ? e.setAttributeNS(c, s, n) : e.setAttribute(s, n), u.removed.pop();
            } catch (e) {}
          }
        }

        ce("afterSanitizeAttributes", e, null);
      }
    }

    return u.sanitize = function (e, t) {
      var n = void 0,
          r = void 0,
          o = void 0,
          i = void 0,
          a = void 0;

      if ("string" != typeof (e = e || "\x3c!--\x3e") && !se(e)) {
        if ("function" != typeof e.toString) throw new TypeError("toString is not a function");
        if ("string" != typeof (e = e.toString())) throw new TypeError("dirty is not a string, aborting");
      }

      if (!u.isSupported) {
        if ("object" === _e(s.toStaticHTML) || "function" == typeof s.toStaticHTML) {
          if ("string" == typeof e) return s.toStaticHTML(e);
          if (se(e)) return s.toStaticHTML(e.outerHTML);
        }

        return e;
      }

      if (Y || k(t), u.removed = [], !ee) if (e instanceof m) 1 === (r = (n = E("\x3c!--\x3e")).ownerDocument.importNode(e, !0)).nodeType && "BODY" === r.nodeName ? n = r : n.appendChild(r);else {
        if (!X && !V && -1 === e.indexOf("<")) return e;
        if (!(n = E(e))) return X ? null : "";
      }
      n && K && w(n.firstChild);

      for (var l = le(ee ? e : n); o = l.nextNode();) {
        3 === o.nodeType && o === i || de(o) || (o.content instanceof d && function e(t) {
          var n = void 0,
              r = le(t);

          for (ce("beforeSanitizeShadowDOM", t, null); n = r.nextNode();) {
            ce("uponSanitizeShadowNode", n, null), de(n) || (n.content instanceof d && e(n.content), me(n));
          }

          ce("afterSanitizeShadowDOM", t, null);
        }(o.content), me(o), i = o);
      }

      if (ee) return e;

      if (X) {
        if ($) for (a = A.call(n.ownerDocument); n.firstChild;) {
          a.appendChild(n.firstChild);
        } else a = n;
        return J && (a = x.call(c, a, !0)), a;
      }

      return V ? n.outerHTML : n.innerHTML;
    }, u.setConfig = function (e) {
      k(e), Y = !0;
    }, u.clearConfig = function () {
      ie = null, Y = !1;
    }, u.isValidAttribute = function (e, t, n) {
      ie || k({});
      var r = e.toLowerCase(),
          o = t.toLowerCase();
      return ue(r, o, n);
    }, u.addHook = function (e, t) {
      "function" == typeof t && (S[e] = S[e] || [], S[e].push(t));
    }, u.removeHook = function (e) {
      S[e] && S[e].pop();
    }, u.removeHooks = function (e) {
      S[e] && (S[e] = []);
    }, u.removeAllHooks = function () {
      S = {};
    }, u;
  }();
});