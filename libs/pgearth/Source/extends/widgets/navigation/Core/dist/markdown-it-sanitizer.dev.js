"use strict";

define([], function () {
  return function o(l, a, s) {
    function c(n, e) {
      if (!a[n]) {
        if (!l[n]) {
          var t = "function" == typeof require && require;
          if (!e && t) return t(n, !0);
          if (f) return f(n, !0);
          var r = new Error("Cannot find module '" + n + "'");
          throw r.code = "MODULE_NOT_FOUND", r;
        }

        var i = a[n] = {
          exports: {}
        };
        l[n][0].call(i.exports, function (e) {
          var t = l[n][1][e];
          return c(t || e);
        }, i, i.exports, o, l, a, s);
      }

      return a[n].exports;
    }

    for (var f = "function" == typeof require && require, e = 0; e < s.length; e++) {
      c(s[e]);
    }

    return c;
  }({
    1: [function (e, t, n) {
      "use strict";

      t.exports = function (e, t) {
        function c(e) {
          var t = n.match(e);
          return t && 1 === t.length && 0 === t[0].index && t[0].lastIndex === e.length ? t[0].url : null;
        }

        function i(e) {
          var a = RegExp('<a\\shref="([^"<>]*)"(?:\\stitle="([^"<>]*)")?>', "i"),
              s = RegExp('<img\\s([^<>]*src="[^"<>]*"[^<>]*)\\s?\\/?>', "i");
          return e.replace(/<[^<>]*>?/gi, function (e) {
            var t, n, r;
            if (/(^<->|^<-\s|^<3\s)/.test(e)) return e;

            if (t = e.match(s)) {
              var i,
                  o = t[1],
                  l = c(o.match(/src="([^"<>]*)"/i)[1]);
              if (i = (i = o.match(/alt="([^"<>]*)"/i)) && void 0 !== i[1] ? i[1] : "", n = (n = o.match(/title="([^"<>]*)"/i)) && void 0 !== n[1] ? n[1] : "", l && /^https?:\/\//i.test(l)) return "" !== h ? '<img src="' + l + '" alt="' + i + '" title="' + n + '" class="' + h + '">' : '<img src="' + l + '" alt="' + i + '" title="' + n + '">';
            }

            return r = g.indexOf("a"), (t = e.match(a)) && (n = void 0 !== t[2] ? t[2] : "", (l = c(t[1])) && /^(?:https?:\/\/|ftp:\/\/|mailto:|xmpp:)/i.test(l)) ? (p = !0, m[r] += 1, '<a href="' + l + '" title="' + n + '" target="_blank">') : (t = /<\/a>/i.test(e)) ? (p = !0, --m[r], m[r] < 0 && (d[r] = !0), "</a>") : (t = e.match(/<(br|hr)\s?\/?>/i)) ? "<" + t[1].toLowerCase() + ">" : (t = e.match(/<(\/?)(b|blockquote|code|em|h[1-6]|li|ol(?: start="\d+")?|p|pre|s|sub|sup|strong|ul)>/i)) && !/<\/ol start="\d+"/i.test(e) ? (p = !0, r = g.indexOf(t[2].toLowerCase().split(" ")[0]), "/" === t[1] ? --m[r] : m[r] += 1, m[r] < 0 && (d[r] = !0), "<" + t[1] + t[2].toLowerCase() + ">") : !0 === u ? "" : f(e);
          });
        }

        for (var n = e.linkify, f = e.utils.escapeHtml, u = void 0 !== (t = t || {}).removeUnknown && t.removeUnknown, l = void 0 !== t.removeUnbalanced && t.removeUnbalanced, h = void 0 !== t.imageClass ? t.imageClass : "", p = !1, g = ["a", "b", "blockquote", "code", "em", "h1", "h2", "h3", "h4", "h5", "h6", "li", "ol", "p", "pre", "s", "sub", "sup", "strong", "ul"], m = new Array(g.length), d = new Array(g.length), o = 0; o < g.length; o++) {
          m[o] = 0;
        }

        for (o = 0; o < g.length; o++) {
          d[o] = !1;
        }

        e.core.ruler.after("linkify", "sanitize_inline", function (e) {
          var t, n, r;

          for (o = 0; o < g.length; o++) {
            m[o] = 0;
          }

          for (o = 0; o < g.length; o++) {
            d[o] = !1;
          }

          for (p = !1, n = 0; n < e.tokens.length; n++) {
            if ("html_block" === e.tokens[n].type && (e.tokens[n].content = i(e.tokens[n].content)), "inline" === e.tokens[n].type) for (r = e.tokens[n].children, t = 0; t < r.length; t++) {
              "html_inline" === r[t].type && (r[t].content = i(r[t].content));
            }
          }
        }), e.core.ruler.after("sanitize_inline", "sanitize_balance", function (e) {
          function t(e) {
            for (var t, n, r, i, o = 0; o < g.length; o++) {
              !0 === d[o] && (t = e, n = g[o], 0, r = "a" === n ? RegExp('<a href="[^"<>]*" title="[^"<>]*" target="_blank">', "g") : "ol" === n ? /<ol(?: start="\d+")?>/g : RegExp("<" + n + ">", "g"), i = RegExp("</" + n + ">", "g"), e = t = !0 === l ? (t = t.replace(r, "")).replace(i, "") : (t = t.replace(r, function (e) {
                return f(e);
              })).replace(i, function (e) {
                return f(e);
              }));
            }

            return e;
          }

          if (!1 !== p) {
            var n, r;

            for (o = 0; o < g.length; o++) {
              0 !== m[o] && (d[o] = !0);
            }

            for (n = 0; n < e.tokens.length; n++) {
              if ("html_block" !== e.tokens[n].type) {
                if ("inline" === e.tokens[n].type) for (r = e.tokens[n].children, o = 0; o < r.length; o++) {
                  "html_inline" === r[o].type && (r[o].content = t(r[o].content));
                }
              } else e.tokens[n].content = t(e.tokens[n].content);
            }
          }
        });
      };
    }, {}]
  }, {}, [1])(1);
});