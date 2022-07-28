"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t, e) {
  "function" == typeof define && define.amd ? define([], function () {
    return t.Autolinker = e();
  }) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = e() : t.Autolinker = e();
}(void 0, function () {
  var t,
      e,
      r,
      n,
      v = function v(t) {
    v.Util.assign(this, t);
    var e = this.hashtag;
    if (!1 !== e && "twitter" !== e && "facebook" !== e) throw new Error("invalid `hashtag` cfg - see docs");
  };

  return v.prototype = {
    constructor: v,
    urls: !0,
    email: !0,
    twitter: !0,
    phone: !0,
    hashtag: !1,
    newWindow: !0,
    stripPrefix: !0,
    truncate: void 0,
    className: "",
    htmlParser: void 0,
    matchParser: void 0,
    tagBuilder: void 0,
    link: function link(t) {
      for (var e = this.getHtmlParser().parse(t), r = 0, n = [], i = 0, s = e.length; i < s; i++) {
        var a,
            o = e[i],
            c = o.getType(),
            h = o.getText();
        "element" === c ? ("a" === o.getTagName() && (o.isClosing() ? r = Math.max(r - 1, 0) : r++), n.push(h)) : "entity" !== c && "comment" !== c && 0 === r ? (a = this.linkifyStr(h), n.push(a)) : n.push(h);
      }

      return n.join("");
    },
    linkifyStr: function linkifyStr(t) {
      return this.getMatchParser().replace(t, this.createMatchReturnVal, this);
    },
    createMatchReturnVal: function createMatchReturnVal(t) {
      var e;
      return this.replaceFn && (e = this.replaceFn.call(this, this, t)), "string" == typeof e ? e : !1 === e ? t.getMatchedText() : e instanceof v.HtmlTag ? e.toAnchorString() : this.getTagBuilder().build(t).toAnchorString();
    },
    getHtmlParser: function getHtmlParser() {
      return this.htmlParser || (this.htmlParser = new v.htmlParser.HtmlParser());
    },
    getMatchParser: function getMatchParser() {
      return this.matchParser || (this.matchParser = new v.matchParser.MatchParser({
        urls: this.urls,
        email: this.email,
        twitter: this.twitter,
        phone: this.phone,
        hashtag: this.hashtag,
        stripPrefix: this.stripPrefix
      }));
    },
    getTagBuilder: function getTagBuilder() {
      return this.tagBuilder || (this.tagBuilder = new v.AnchorTagBuilder({
        newWindow: this.newWindow,
        truncate: this.truncate,
        className: this.className
      }));
    }
  }, v.link = function (t, e) {
    return new v(e).link(t);
  }, v.match = {}, v.htmlParser = {}, v.matchParser = {}, v.Util = {
    abstractMethod: function abstractMethod() {
      throw "abstract";
    },
    trimRegex: /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    assign: function assign(t, e) {
      for (var r in e) {
        e.hasOwnProperty(r) && (t[r] = e[r]);
      }

      return t;
    },
    extend: function extend(t, e) {
      function r() {}

      var n,
          i = t.prototype;
      r.prototype = i;
      var s = (n = e.hasOwnProperty("constructor") ? e.constructor : function () {
        i.constructor.apply(this, arguments);
      }).prototype = new r();
      return s.constructor = n, s.superclass = i, delete e.constructor, v.Util.assign(s, e), n;
    },
    ellipsis: function ellipsis(t, e, r) {
      return t.length > e && (r = null == r ? ".." : r, t = t.substring(0, e - r.length) + r), t;
    },
    indexOf: function indexOf(t, e) {
      if (Array.prototype.indexOf) return t.indexOf(e);

      for (var r = 0, n = t.length; r < n; r++) {
        if (t[r] === e) return r;
      }

      return -1;
    },
    splitAndCapture: function splitAndCapture(t, e) {
      if (!e.global) throw new Error("`splitRegex` must have the 'g' flag set");

      for (var r, n = [], i = 0; r = e.exec(t);) {
        n.push(t.substring(i, r.index)), n.push(r[0]), i = r.index + r[0].length;
      }

      return n.push(t.substring(i)), n;
    },
    trim: function trim(t) {
      return t.replace(this.trimRegex, "");
    }
  }, v.HtmlTag = v.Util.extend(Object, {
    whitespaceRegex: /\s+/,
    constructor: function constructor(t) {
      v.Util.assign(this, t), this.innerHtml = this.innerHtml || this.innerHTML;
    },
    setTagName: function setTagName(t) {
      return this.tagName = t, this;
    },
    getTagName: function getTagName() {
      return this.tagName || "";
    },
    setAttr: function setAttr(t, e) {
      return this.getAttrs()[t] = e, this;
    },
    getAttr: function getAttr(t) {
      return this.getAttrs()[t];
    },
    setAttrs: function setAttrs(t) {
      var e = this.getAttrs();
      return v.Util.assign(e, t), this;
    },
    getAttrs: function getAttrs() {
      return this.attrs || (this.attrs = {});
    },
    setClass: function setClass(t) {
      return this.setAttr("class", t);
    },
    addClass: function addClass(t) {
      for (var e, r = this.getClass(), n = this.whitespaceRegex, i = v.Util.indexOf, s = r ? r.split(n) : [], a = t.split(n); e = a.shift();) {
        -1 === i(s, e) && s.push(e);
      }

      return this.getAttrs()["class"] = s.join(" "), this;
    },
    removeClass: function removeClass(t) {
      for (var e, r = this.getClass(), n = this.whitespaceRegex, i = v.Util.indexOf, s = r ? r.split(n) : [], a = t.split(n); s.length && (e = a.shift());) {
        var o = i(s, e);
        -1 !== o && s.splice(o, 1);
      }

      return this.getAttrs()["class"] = s.join(" "), this;
    },
    getClass: function getClass() {
      return this.getAttrs()["class"] || "";
    },
    hasClass: function hasClass(t) {
      return -1 !== (" " + this.getClass() + " ").indexOf(" " + t + " ");
    },
    setInnerHtml: function setInnerHtml(t) {
      return this.innerHtml = t, this;
    },
    getInnerHtml: function getInnerHtml() {
      return this.innerHtml || "";
    },
    toAnchorString: function toAnchorString() {
      var t = this.getTagName(),
          e = this.buildAttrsStr();
      return ["<", t, e = e ? " " + e : "", ">", this.getInnerHtml(), "</", t, ">"].join("");
    },
    buildAttrsStr: function buildAttrsStr() {
      if (!this.attrs) return "";
      var t = this.getAttrs(),
          e = [];

      for (var r in t) {
        t.hasOwnProperty(r) && e.push(r + '="' + t[r] + '"');
      }

      return e.join(" ");
    }
  }), v.AnchorTagBuilder = v.Util.extend(Object, {
    constructor: function constructor(t) {
      v.Util.assign(this, t);
    },
    build: function build(t) {
      return new v.HtmlTag({
        tagName: "a",
        attrs: this.createAttrs(t.getType(), t.getAnchorHref()),
        innerHtml: this.processAnchorText(t.getAnchorText())
      });
    },
    createAttrs: function createAttrs(t, e) {
      var r = {
        href: e
      },
          n = this.createCssClass(t);
      return n && (r["class"] = n), this.newWindow && (r.target = "_blank"), r;
    },
    createCssClass: function createCssClass(t) {
      var e = this.className;
      return e ? e + " " + e + "-" + t : "";
    },
    processAnchorText: function processAnchorText(t) {
      return t = this.doTruncate(t);
    },
    doTruncate: function doTruncate(t) {
      return v.Util.ellipsis(t, this.truncate || Number.POSITIVE_INFINITY);
    }
  }), v.htmlParser.HtmlParser = v.Util.extend(Object, {
    htmlRegex: (e = /[^\s\0"'>\/=\x01-\x1F\x7F]+/.source + "(?:\\s*=\\s*" + (t = /(?:"[^"]*?"|'[^']*?'|[^'"=<>`\s]+)/).source + ")?", new RegExp(["(?:", "<(!DOCTYPE)", "(?:", "\\s+", "(?:", e, "|", t.source + ")", ")*", ">", ")", "|", "(?:", "<(/)?", "(?:", /!--([\s\S]+?)--/.source, "|", "(?:", "(" + /[0-9a-zA-Z][0-9a-zA-Z:]*/.source + ")", "(?:", "\\s+", e, ")*", "\\s*/?", ")", ")", ">", ")"].join(""), "gi")),
    htmlCharacterEntitiesRegex: /(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;|&quot;|&#34;|&#39;)/gi,
    parse: function parse(t) {
      for (var e, r, n, i = this.htmlRegex, s = 0, a = []; null !== (e = i.exec(t));) {
        var o = e[0],
            c = e[3],
            h = e[1] || e[4],
            l = !!e[2],
            u = t.substring(s, e.index);
        u && (r = this.parseTextAndEntityNodes(u), a.push.apply(a, r)), c ? a.push(this.createCommentNode(o, c)) : a.push(this.createElementNode(o, h, l)), s = e.index + o.length;
      }

      return s < t.length && (n = t.substring(s)) && (r = this.parseTextAndEntityNodes(n), a.push.apply(a, r)), a;
    },
    parseTextAndEntityNodes: function parseTextAndEntityNodes(t) {
      for (var e = [], r = v.Util.splitAndCapture(t, this.htmlCharacterEntitiesRegex), n = 0, i = r.length; n < i; n += 2) {
        var s = r[n],
            a = r[n + 1];
        s && e.push(this.createTextNode(s)), a && e.push(this.createEntityNode(a));
      }

      return e;
    },
    createCommentNode: function createCommentNode(t, e) {
      return new v.htmlParser.CommentNode({
        text: t,
        comment: v.Util.trim(e)
      });
    },
    createElementNode: function createElementNode(t, e, r) {
      return new v.htmlParser.ElementNode({
        text: t,
        tagName: e.toLowerCase(),
        closing: r
      });
    },
    createEntityNode: function createEntityNode(t) {
      return new v.htmlParser.EntityNode({
        text: t
      });
    },
    createTextNode: function createTextNode(t) {
      return new v.htmlParser.TextNode({
        text: t
      });
    }
  }), v.htmlParser.HtmlNode = v.Util.extend(Object, {
    text: "",
    constructor: function constructor(t) {
      v.Util.assign(this, t);
    },
    getType: v.Util.abstractMethod,
    getText: function getText() {
      return this.text;
    }
  }), v.htmlParser.CommentNode = v.Util.extend(v.htmlParser.HtmlNode, {
    comment: "",
    getType: function getType() {
      return "comment";
    },
    getComment: function getComment() {
      return this.comment;
    }
  }), v.htmlParser.ElementNode = v.Util.extend(v.htmlParser.HtmlNode, {
    tagName: "",
    closing: !1,
    getType: function getType() {
      return "element";
    },
    getTagName: function getTagName() {
      return this.tagName;
    },
    isClosing: function isClosing() {
      return this.closing;
    }
  }), v.htmlParser.EntityNode = v.Util.extend(v.htmlParser.HtmlNode, {
    getType: function getType() {
      return "entity";
    }
  }), v.htmlParser.TextNode = v.Util.extend(v.htmlParser.HtmlNode, {
    getType: function getType() {
      return "text";
    }
  }), v.matchParser.MatchParser = v.Util.extend(Object, {
    urls: !0,
    email: !0,
    twitter: !0,
    phone: !0,
    hashtag: !1,
    stripPrefix: !0,
    matcherRegex: (r = /[A-Za-z0-9\.\-]*[A-Za-z0-9\-]/, n = /\.(?:international|construction|contractors|enterprises|photography|productions|foundation|immobilien|industries|management|properties|technology|christmas|community|directory|education|equipment|institute|marketing|solutions|vacations|bargains|boutique|builders|catering|cleaning|clothing|computer|democrat|diamonds|graphics|holdings|lighting|partners|plumbing|supplies|training|ventures|academy|careers|company|cruises|domains|exposed|flights|florist|gallery|guitars|holiday|kitchen|neustar|okinawa|recipes|rentals|reviews|shiksha|singles|support|systems|agency|berlin|camera|center|coffee|condos|dating|estate|events|expert|futbol|kaufen|luxury|maison|monash|museum|nagoya|photos|repair|report|social|supply|tattoo|tienda|travel|viajes|villas|vision|voting|voyage|actor|build|cards|cheap|codes|dance|email|glass|house|mango|ninja|parts|photo|shoes|solar|today|tokyo|tools|watch|works|aero|arpa|asia|best|bike|blue|buzz|camp|club|cool|coop|farm|fish|gift|guru|info|jobs|kiwi|kred|land|limo|link|menu|mobi|moda|name|pics|pink|post|qpon|rich|ruhr|sexy|tips|vote|voto|wang|wien|wiki|zone|bar|bid|biz|cab|cat|ceo|com|edu|gov|int|kim|mil|net|onl|org|pro|pub|red|tel|uno|wed|xxx|xyz|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)\b/, new RegExp(["(", /(^|[^\w])@(\w{1,15})/.source, ")", "|", "(", /(?:[\-;:&=\+\$,\w\.]+@)/.source, r.source, n.source, ")", "|", "(", "(?:", "(", /(?:[A-Za-z][-.+A-Za-z0-9]+:(?![A-Za-z][-.+A-Za-z0-9]+:\/\/)(?!\d+\/?)(?:\/\/)?)/.source, r.source, ")", "|", "(?:", "(.?//)?", /(?:www\.)/.source, r.source, ")", "|", "(?:", "(.?//)?", r.source, n.source, ")", ")", "(?:" + /[\-A-Za-z0-9+&@#\/%=~_()|'$*\[\]?!:,.;]*[\-A-Za-z0-9+&@#\/%=~_()|'$*\[\]]/.source + ")?", ")", "|", "(", /(?:\+?\d{1,3}[-\s.])?\(?\d{3}\)?[-\s.]?\d{3}[-\s.]\d{4}/.source, ")", "|", "(", /(^|[^\w])#(\w{1,15})/.source, ")"].join(""), "gi")),
    charBeforeProtocolRelMatchRegex: /^(.)?\/\//,
    constructor: function constructor(t) {
      v.Util.assign(this, t), this.matchValidator = new v.MatchValidator();
    },
    replace: function replace(t, p, d) {
      var x = this;
      return t.replace(this.matcherRegex, function (t, e, r, n, i, s, a, o, c, h, l, u, g) {
        var m = x.processCandidateMatch(t, e, r, n, i, s, a, o, c, h, l, u, g);

        if (m) {
          var f = p.call(d, m.match);
          return m.prefixStr + f + m.suffixStr;
        }

        return t;
      });
    },
    processCandidateMatch: function processCandidateMatch(t, e, r, n, i, s, a, o, c, h, l, u, g) {
      var m,
          f,
          p,
          d = o || c,
          x = "",
          w = "";
      return s && !this.urls || i && !this.email || h && !this.phone || e && !this.twitter || l && !this.hashtag || !this.matchValidator.isValidMatch(s, a, d) ? null : (this.matchHasUnbalancedClosingParen(t) && (t = t.substr(0, t.length - 1), w = ")"), f = i ? new v.match.Email({
        matchedText: t,
        email: i
      }) : e ? (r && (x = r, t = t.slice(1)), new v.match.Twitter({
        matchedText: t,
        twitterHandle: n
      })) : h ? (m = t.replace(/\D/g, ""), new v.match.Phone({
        matchedText: t,
        number: m
      })) : l ? (u && (x = u, t = t.slice(1)), new v.match.Hashtag({
        matchedText: t,
        serviceName: this.hashtag,
        hashtag: g
      })) : (!d || (p = d.match(this.charBeforeProtocolRelMatchRegex)[1] || "") && (x = p, t = t.slice(1)), new v.match.Url({
        matchedText: t,
        url: t,
        protocolUrlMatch: !!a,
        protocolRelativeMatch: !!d,
        stripPrefix: this.stripPrefix
      })), {
        prefixStr: x,
        suffixStr: w,
        match: f
      });
    },
    matchHasUnbalancedClosingParen: function matchHasUnbalancedClosingParen(t) {
      if (")" === t.charAt(t.length - 1)) {
        var e = t.match(/\(/g),
            r = t.match(/\)/g);
        if ((e && e.length || 0) < (r && r.length || 0)) return !0;
      }

      return !1;
    }
  }), v.MatchValidator = v.Util.extend(Object, {
    invalidProtocolRelMatchRegex: /^[\w]\/\//,
    hasFullProtocolRegex: /^[A-Za-z][-.+A-Za-z0-9]+:\/\//,
    uriSchemeRegex: /^[A-Za-z][-.+A-Za-z0-9]+:/,
    hasWordCharAfterProtocolRegex: /:[^\s]*?[A-Za-z]/,
    isValidMatch: function isValidMatch(t, e, r) {
      return !(e && !this.isValidUriScheme(e) || this.urlMatchDoesNotHaveProtocolOrDot(t, e) || this.urlMatchDoesNotHaveAtLeastOneWordChar(t, e) || this.isInvalidProtocolRelativeMatch(r));
    },
    isValidUriScheme: function isValidUriScheme(t) {
      var e = t.match(this.uriSchemeRegex)[0].toLowerCase();
      return "javascript:" !== e && "vbscript:" !== e;
    },
    urlMatchDoesNotHaveProtocolOrDot: function urlMatchDoesNotHaveProtocolOrDot(t, e) {
      return !(!t || e && this.hasFullProtocolRegex.test(e) || -1 !== t.indexOf("."));
    },
    urlMatchDoesNotHaveAtLeastOneWordChar: function urlMatchDoesNotHaveAtLeastOneWordChar(t, e) {
      return !(!t || !e) && !this.hasWordCharAfterProtocolRegex.test(t);
    },
    isInvalidProtocolRelativeMatch: function isInvalidProtocolRelativeMatch(t) {
      return !!t && this.invalidProtocolRelMatchRegex.test(t);
    }
  }), v.match.Match = v.Util.extend(Object, {
    constructor: function constructor(t) {
      v.Util.assign(this, t);
    },
    getType: v.Util.abstractMethod,
    getMatchedText: function getMatchedText() {
      return this.matchedText;
    },
    getAnchorHref: v.Util.abstractMethod,
    getAnchorText: v.Util.abstractMethod
  }), v.match.Email = v.Util.extend(v.match.Match, {
    getType: function getType() {
      return "email";
    },
    getEmail: function getEmail() {
      return this.email;
    },
    getAnchorHref: function getAnchorHref() {
      return "mailto:" + this.email;
    },
    getAnchorText: function getAnchorText() {
      return this.email;
    }
  }), v.match.Hashtag = v.Util.extend(v.match.Match, {
    getType: function getType() {
      return "hashtag";
    },
    getHashtag: function getHashtag() {
      return this.hashtag;
    },
    getAnchorHref: function getAnchorHref() {
      var t = this.serviceName,
          e = this.hashtag;

      switch (t) {
        case "twitter":
          return "https://twitter.com/hashtag/" + e;

        case "facebook":
          return "https://www.facebook.com/hashtag/" + e;

        default:
          throw new Error("Unknown service name to point hashtag to: ", t);
      }
    },
    getAnchorText: function getAnchorText() {
      return "#" + this.hashtag;
    }
  }), v.match.Phone = v.Util.extend(v.match.Match, {
    getType: function getType() {
      return "phone";
    },
    getNumber: function getNumber() {
      return this.number;
    },
    getAnchorHref: function getAnchorHref() {
      return "tel:" + this.number;
    },
    getAnchorText: function getAnchorText() {
      return this.matchedText;
    }
  }), v.match.Twitter = v.Util.extend(v.match.Match, {
    getType: function getType() {
      return "twitter";
    },
    getTwitterHandle: function getTwitterHandle() {
      return this.twitterHandle;
    },
    getAnchorHref: function getAnchorHref() {
      return "https://twitter.com/" + this.twitterHandle;
    },
    getAnchorText: function getAnchorText() {
      return "@" + this.twitterHandle;
    }
  }), v.match.Url = v.Util.extend(v.match.Match, {
    urlPrefixRegex: /^(https?:\/\/)?(www\.)?/i,
    protocolRelativeRegex: /^\/\//,
    protocolPrepended: !1,
    getType: function getType() {
      return "url";
    },
    getUrl: function getUrl() {
      var t = this.url;
      return this.protocolRelativeMatch || this.protocolUrlMatch || this.protocolPrepended || (t = this.url = "http://" + t, this.protocolPrepended = !0), t;
    },
    getAnchorHref: function getAnchorHref() {
      return this.getUrl().replace(/&amp;/g, "&");
    },
    getAnchorText: function getAnchorText() {
      var t = this.getUrl();
      return this.protocolRelativeMatch && (t = this.stripProtocolRelativePrefix(t)), this.stripPrefix && (t = this.stripUrlPrefix(t)), t = this.removeTrailingSlash(t);
    },
    stripUrlPrefix: function stripUrlPrefix(t) {
      return t.replace(this.urlPrefixRegex, "");
    },
    stripProtocolRelativePrefix: function stripProtocolRelativePrefix(t) {
      return t.replace(this.protocolRelativeRegex, "");
    },
    removeTrailingSlash: function removeTrailingSlash(t) {
      return "/" === t.charAt(t.length - 1) && (t = t.slice(0, -1)), t;
    }
  }), v;
});