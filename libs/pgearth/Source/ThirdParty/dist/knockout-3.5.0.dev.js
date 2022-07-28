"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (_e) {
  var e,
      Ae = this || (0, eval)("this"),
      Be = Ae.document,
      je = Ae.navigator,
      Oe = Ae.jQuery,
      Me = Ae.JSON;
  Oe || "undefined" == typeof jQuery || (Oe = jQuery), e = function e(_e2, a) {
    function n(e, t) {
      return (null === e || _typeof(e) in E) && e === t;
    }

    function o(e, t) {
      var n;
      return function () {
        n = n || D.a.setTimeout(function () {
          n = _e, e();
        }, t);
      };
    }

    function i(e, t) {
      var n;
      return function () {
        clearTimeout(n), n = D.a.setTimeout(e, t);
      };
    }

    function s(e, t) {
      t && "change" !== t ? "beforeChange" === t ? this.oc(e) : this.bb(e, t) : this.pc(e);
    }

    function r(e, t) {
      null !== t && t.s && t.s();
    }

    function u(e, t) {
      var n = this.pd,
          a = n[M];
      a.qa || (this.Pb && this.kb[t] ? (n.tc(t, e, this.kb[t]), this.kb[t] = null, --this.Pb) : a.F[t] || n.tc(t, e, a.G ? {
        da: e
      } : n.Zc(e)), e.Ka && e.fd());
    }

    var c,
        t,
        l,
        f,
        d,
        p,
        h,
        b,
        v,
        g,
        m,
        y,
        w,
        D = void 0 !== _e2 ? _e2 : {};

    function x() {
      if (m) for (var e, t = m, n = 0; w < m;) {
        if (e = g[w++]) {
          if (t < w) {
            if (5e3 <= ++n) {
              w = m, D.a.Fc(Error("'Too much recursion' after processing " + n + " task groups."));
              break;
            }

            t = m;
          }

          try {
            e();
          } catch (e) {
            D.a.Fc(e);
          }
        }
      }
    }

    function C() {
      x(), w = m = g.length = 0;
    }

    D.b = function (e, t) {
      for (var n = e.split("."), a = D, r = 0; r < n.length - 1; r++) {
        a = a[n[r]];
      }

      a[n[n.length - 1]] = t;
    }, D.J = function (e, t, n) {
      e[t] = n;
    }, D.version = "3.5.0", D.b("version", D.version), D.options = {
      deferUpdates: !1,
      useOnlyNativeEvents: !1,
      foreachHidesDestroyed: !1
    }, D.a = function () {
      function f(e, t) {
        for (var n in e) {
          o.call(e, n) && t(n, e[n]);
        }
      }

      function e(e, t) {
        if (t) for (var n in t) {
          o.call(t, n) && (e[n] = t[n]);
        }
        return e;
      }

      function t(e, t) {
        return e.__proto__ = t, e;
      }

      function r(e, t, n, a) {
        var r = e[t].match(d) || [];
        D.a.C(n.match(d), function (e) {
          D.a.Oa(r, e, a);
        }), e[t] = r.join(" ");
      }

      var o = Object.prototype.hasOwnProperty,
          n = {
        __proto__: []
      } instanceof Array,
          a = "function" == typeof Symbol,
          i = {},
          u = {};
      i[je && /Firefox\/2/i.test(je.userAgent) ? "KeyboardEvent" : "UIEvents"] = ["keyup", "keydown", "keypress"], i.MouseEvents = "click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" "), f(i, function (e, t) {
        if (t.length) for (var n = 0, a = t.length; n < a; n++) {
          u[t[n]] = e;
        }
      });

      var c,
          s = {
        propertychange: !0
      },
          l = Be && function () {
        for (var e = 3, t = Be.createElement("div"), n = t.getElementsByTagName("i"); t.innerHTML = "\x3c!--[if gt IE " + ++e + "]><i></i><![endif]--\x3e", n[0];) {
          ;
        }

        return 4 < e ? e : _e;
      }(),
          d = /\S+/g;

      return {
        Ic: ["authenticity_token", /^__RequestVerificationToken(_.*)?$/],
        C: function C(e, t, n) {
          for (var a = 0, r = e.length; a < r; a++) {
            t.call(n, e[a], a, e);
          }
        },
        A: "function" == typeof Array.prototype.indexOf ? function (e, t) {
          return Array.prototype.indexOf.call(e, t);
        } : function (e, t) {
          for (var n = 0, a = e.length; n < a; n++) {
            if (e[n] === t) return n;
          }

          return -1;
        },
        Lb: function Lb(e, t, n) {
          for (var a = 0, r = e.length; a < r; a++) {
            if (t.call(n, e[a], a, e)) return e[a];
          }

          return _e;
        },
        hb: function hb(e, t) {
          var n = D.a.A(e, t);
          0 < n ? e.splice(n, 1) : 0 === n && e.shift();
        },
        vc: function vc(e) {
          var t = [];
          return e && D.a.C(e, function (e) {
            D.a.A(t, e) < 0 && t.push(e);
          }), t;
        },
        Mb: function Mb(e, t, n) {
          var a = [];
          if (e) for (var r = 0, o = e.length; r < o; r++) {
            a.push(t.call(n, e[r], r));
          }
          return a;
        },
        fb: function fb(e, t, n) {
          var a = [];
          if (e) for (var r = 0, o = e.length; r < o; r++) {
            t.call(n, e[r], r) && a.push(e[r]);
          }
          return a;
        },
        gb: function gb(e, t) {
          if (t instanceof Array) e.push.apply(e, t);else for (var n = 0, a = t.length; n < a; n++) {
            e.push(t[n]);
          }
          return e;
        },
        Oa: function Oa(e, t, n) {
          var a = D.a.A(D.a.$b(e), t);
          a < 0 ? n && e.push(t) : n || e.splice(a, 1);
        },
        Ba: n,
        extend: e,
        setPrototypeOf: t,
        zb: n ? t : e,
        O: f,
        Ha: function Ha(e, t, n) {
          if (!e) return e;
          var a,
              r = {};

          for (a in e) {
            o.call(e, a) && (r[a] = t.call(n, e[a], a, e));
          }

          return r;
        },
        Sb: function Sb(e) {
          for (; e.firstChild;) {
            D.removeNode(e.firstChild);
          }
        },
        Xb: function Xb(e) {
          for (var t = ((e = D.a.la(e))[0] && e[0].ownerDocument || Be).createElement("div"), n = 0, a = e.length; n < a; n++) {
            t.appendChild(D.na(e[n]));
          }

          return t;
        },
        Ca: function Ca(e, t) {
          for (var n = 0, a = e.length, r = []; n < a; n++) {
            var o = e[n].cloneNode(!0);
            r.push(t ? D.na(o) : o);
          }

          return r;
        },
        ua: function ua(e, t) {
          if (D.a.Sb(e), t) for (var n = 0, a = t.length; n < a; n++) {
            e.appendChild(t[n]);
          }
        },
        Wc: function Wc(e, t) {
          var n = e.nodeType ? [e] : e;

          if (0 < n.length) {
            for (var a = n[0], r = a.parentNode, o = 0, i = t.length; o < i; o++) {
              r.insertBefore(t[o], a);
            }

            for (o = 0, i = n.length; o < i; o++) {
              D.removeNode(n[o]);
            }
          }
        },
        Ua: function Ua(e, t) {
          if (e.length) {
            for (t = 8 === t.nodeType && t.parentNode || t; e.length && e[0].parentNode !== t;) {
              e.splice(0, 1);
            }

            for (; 1 < e.length && e[e.length - 1].parentNode !== t;) {
              e.length--;
            }

            if (1 < e.length) {
              var n = e[0],
                  a = e[e.length - 1];

              for (e.length = 0; n !== a;) {
                e.push(n), n = n.nextSibling;
              }

              e.push(a);
            }
          }

          return e;
        },
        Yc: function Yc(e, t) {
          l < 7 ? e.setAttribute("selected", t) : e.selected = t;
        },
        Cb: function Cb(e) {
          return null === e || e === _e ? "" : e.trim ? e.trim() : e.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
        },
        Td: function Td(e, t) {
          return e = e || "", !(t.length > e.length) && e.substring(0, t.length) === t;
        },
        ud: function ud(e, t) {
          if (e === t) return !0;
          if (11 === e.nodeType) return !1;
          if (t.contains) return t.contains(1 !== e.nodeType ? e.parentNode : e);
          if (t.compareDocumentPosition) return 16 == (16 & t.compareDocumentPosition(e));

          for (; e && e != t;) {
            e = e.parentNode;
          }

          return !!e;
        },
        Rb: function Rb(e) {
          return D.a.ud(e, e.ownerDocument.documentElement);
        },
        jd: function jd(e) {
          return !!D.a.Lb(e, D.a.Rb);
        },
        P: function P(e) {
          return e && e.tagName && e.tagName.toLowerCase();
        },
        zc: function zc(e) {
          return D.onError ? function () {
            try {
              return e.apply(this, arguments);
            } catch (e) {
              throw D.onError && D.onError(e), e;
            }
          } : e;
        },
        setTimeout: function (_setTimeout) {
          function setTimeout(_x, _x2) {
            return _setTimeout.apply(this, arguments);
          }

          setTimeout.toString = function () {
            return _setTimeout.toString();
          };

          return setTimeout;
        }(function (e, t) {
          return setTimeout(D.a.zc(e), t);
        }),
        Fc: function Fc(e) {
          setTimeout(function () {
            throw D.onError && D.onError(e), e;
          }, 0);
        },
        H: function H(t, e, n) {
          var a = D.a.zc(n);
          if (n = s[e], D.options.useOnlyNativeEvents || n || !Oe) {
            if (n || "function" != typeof t.addEventListener) {
              var _r = function _r(e) {
                a.call(t, e);
              };

              if (void 0 === t.attachEvent) throw Error("Browser doesn't support addEventListener or attachEvent");
              var o = "on" + e;
              t.attachEvent(o, _r), D.a.I.za(t, function () {
                t.detachEvent(o, _r);
              });
            } else t.addEventListener(e, a, !1);
          } else c = c || ("function" == typeof Oe(t).on ? "on" : "bind"), Oe(t)[c](e, a);
        },
        Fb: function Fb(e, t) {
          if (!e || !e.nodeType) throw Error("element must be a DOM node when calling triggerEvent");
          var n = !("input" !== D.a.P(e) || !e.type || "click" != t.toLowerCase()) && ("checkbox" == (n = e.type) || "radio" == n);
          if (D.options.useOnlyNativeEvents || !Oe || n) {
            if ("function" == typeof Be.createEvent) {
              if ("function" != typeof e.dispatchEvent) throw Error("The supplied element doesn't support dispatchEvent");
              (n = Be.createEvent(u[t] || "HTMLEvents")).initEvent(t, !0, !0, Ae, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, e), e.dispatchEvent(n);
            } else if (n && e.click) e.click();else {
              if (void 0 === e.fireEvent) throw Error("Browser doesn't support triggering events");
              e.fireEvent("on" + t);
            }
          } else Oe(e).trigger(t);
        },
        c: function c(e) {
          return D.N(e) ? e() : e;
        },
        $b: function $b(e) {
          return D.N(e) ? e.w() : e;
        },
        Eb: function Eb(t, e, n) {
          var a;
          e && ("object" == _typeof(t.classList) ? (a = t.classList[n ? "add" : "remove"], D.a.C(e.match(d), function (e) {
            a.call(t.classList, e);
          })) : "string" == typeof t.className.baseVal ? r(t.className, "baseVal", e, n) : r(t, "className", e, n));
        },
        Ab: function Ab(e, t) {
          var n = D.a.c(t);
          null !== n && n !== _e || (n = "");
          var a = D.h.firstChild(e);
          !a || 3 != a.nodeType || D.h.nextSibling(a) ? D.h.ua(e, [e.ownerDocument.createTextNode(n)]) : a.data = n, D.a.zd(e);
        },
        Xc: function Xc(e, t) {
          if (e.name = t, l <= 7) try {
            var n = e.name.replace(/[&<>'"]/g, function (e) {
              return "&#" + e.charCodeAt(0) + ";";
            });
            e.mergeAttributes(Be.createElement("<input name='" + n + "'/>"), !1);
          } catch (e) {}
        },
        zd: function zd(e) {
          9 <= l && (e = 1 == e.nodeType ? e : e.parentNode).style && (e.style.zoom = e.style.zoom);
        },
        vd: function vd(e) {
          var t;
          l && (t = e.style.width, e.style.width = 0, e.style.width = t);
        },
        Od: function Od(e, t) {
          e = D.a.c(e), t = D.a.c(t);

          for (var n = [], a = e; a <= t; a++) {
            n.push(a);
          }

          return n;
        },
        la: function la(e) {
          for (var t = [], n = 0, a = e.length; n < a; n++) {
            t.push(e[n]);
          }

          return t;
        },
        Da: function Da(e) {
          return a ? Symbol(e) : e;
        },
        Xd: 6 === l,
        Yd: 7 === l,
        W: l,
        Kc: function Kc(e, t) {
          for (var n = D.a.la(e.getElementsByTagName("input")).concat(D.a.la(e.getElementsByTagName("textarea"))), a = "string" == typeof t ? function (e) {
            return e.name === t;
          } : function (e) {
            return t.test(e.name);
          }, r = [], o = n.length - 1; 0 <= o; o--) {
            a(n[o]) && r.push(n[o]);
          }

          return r;
        },
        Md: function Md(e) {
          return "string" == typeof e && (e = D.a.Cb(e)) ? Me && Me.parse ? Me.parse(e) : new Function("return " + e)() : null;
        },
        fc: function fc(e, t, n) {
          if (!Me || !Me.stringify) throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
          return Me.stringify(D.a.c(e), t, n);
        },
        Nd: function Nd(e, t, n) {
          var a = (n = n || {}).params || {},
              r = n.includeFields || this.Ic,
              o = e;
          if ("object" == _typeof(e) && "form" === D.a.P(e)) for (var o = e.action, i = r.length - 1; 0 <= i; i--) {
            for (var u = D.a.Kc(e, r[i]), c = u.length - 1; 0 <= c; c--) {
              a[u[c].name] = u[c].value;
            }
          }
          t = D.a.c(t);
          var s = Be.createElement("form");

          for (var l in s.style.display = "none", s.action = o, s.method = "post", t) {
            (e = Be.createElement("input")).type = "hidden", e.name = l, e.value = D.a.fc(D.a.c(t[l])), s.appendChild(e);
          }

          f(a, function (e, t) {
            var n = Be.createElement("input");
            n.type = "hidden", n.name = e, n.value = t, s.appendChild(n);
          }), Be.body.appendChild(s), n.submitter ? n.submitter(s) : s.submit(), setTimeout(function () {
            s.parentNode.removeChild(s);
          }, 0);
        }
      };
    }(), D.b("utils", D.a), D.b("utils.arrayForEach", D.a.C), D.b("utils.arrayFirst", D.a.Lb), D.b("utils.arrayFilter", D.a.fb), D.b("utils.arrayGetDistinctValues", D.a.vc), D.b("utils.arrayIndexOf", D.a.A), D.b("utils.arrayMap", D.a.Mb), D.b("utils.arrayPushAll", D.a.gb), D.b("utils.arrayRemoveItem", D.a.hb), D.b("utils.cloneNodes", D.a.Ca), D.b("utils.createSymbolOrString", D.a.Da), D.b("utils.extend", D.a.extend), D.b("utils.fieldsIncludedWithJsonPost", D.a.Ic), D.b("utils.getFormFields", D.a.Kc), D.b("utils.objectMap", D.a.Ha), D.b("utils.peekObservable", D.a.$b), D.b("utils.postJson", D.a.Nd), D.b("utils.parseJson", D.a.Md), D.b("utils.registerEventHandler", D.a.H), D.b("utils.stringifyJson", D.a.fc), D.b("utils.range", D.a.Od), D.b("utils.toggleDomNodeCssClass", D.a.Eb), D.b("utils.triggerEvent", D.a.Fb), D.b("utils.unwrapObservable", D.a.c), D.b("utils.objectForEach", D.a.O), D.b("utils.addOrRemoveItem", D.a.Oa), D.b("utils.setTextContent", D.a.Ab), D.b("unwrap", D.a.c), Function.prototype.bind || (Function.prototype.bind = function (t) {
      var n = this;
      if (1 === arguments.length) return function () {
        return n.apply(t, arguments);
      };
      var a = Array.prototype.slice.call(arguments, 1);
      return function () {
        var e = a.slice(0);
        return e.push.apply(e, arguments), n.apply(t, e);
      };
    }), D.a.g = new function () {
      var a,
          r = 0,
          o = "__ko__" + new Date().getTime(),
          i = {},
          e = D.a.W ? (a = function a(e, t) {
        var n = e[o];

        if (!n || "null" === n || !i[n]) {
          if (!t) return _e;
          n = e[o] = "ko" + r++, i[n] = {};
        }

        return i[n];
      }, function (e) {
        var t = e[o];
        return !!t && (delete i[t], !(e[o] = null));
      }) : (a = function a(e, t) {
        var n = e[o];
        return !n && t && (n = e[o] = {}), n;
      }, function (e) {
        return !!e[o] && (delete e[o], !0);
      });
      return {
        get: function get(e, t) {
          var n = a(e, !1);
          return n && n[t];
        },
        set: function set(e, t, n) {
          (e = a(e, n !== _e)) && (e[t] = n);
        },
        Tb: function Tb(e, t, n) {
          return (e = a(e, !0))[t] || (e[t] = n);
        },
        clear: e,
        Z: function Z() {
          return r++ + o;
        }
      };
    }(), D.b("utils.domData", D.a.g), D.b("utils.domData.clear", D.a.g.clear), D.a.I = new function () {
      function a(e, t) {
        var n = D.a.g.get(e, i);
        return n === _e && t && (n = [], D.a.g.set(e, i, n)), n;
      }

      function o(e) {
        if (t = a(e, !1)) for (var t = t.slice(0), n = 0; n < t.length; n++) {
          t[n](e);
        }
        D.a.g.clear(e), D.a.I.cleanExternalData(e), u[e.nodeType] && r(e.childNodes, !0);
      }

      function r(e, t) {
        for (var n, a = [], r = 0; r < e.length; r++) {
          if ((!t || 8 === e[r].nodeType) && (o(a[a.length] = n = e[r]), e[r] !== n)) for (; r-- && -1 == D.a.A(a, e[r]);) {
            ;
          }
        }
      }

      var i = D.a.g.Z(),
          t = {
        1: !0,
        8: !0,
        9: !0
      },
          u = {
        1: !0,
        9: !0
      };
      return {
        za: function za(e, t) {
          if ("function" != typeof t) throw Error("Callback must be a function");
          a(e, !0).push(t);
        },
        xb: function xb(e, t) {
          var n = a(e, !1);
          n && (D.a.hb(n, t), 0 == n.length && D.a.g.set(e, i, _e));
        },
        na: function na(e) {
          return t[e.nodeType] && (o(e), u[e.nodeType] && r(e.getElementsByTagName("*"))), e;
        },
        removeNode: function removeNode(e) {
          D.na(e), e.parentNode && e.parentNode.removeChild(e);
        },
        cleanExternalData: function cleanExternalData(e) {
          Oe && "function" == typeof Oe.cleanData && Oe.cleanData([e]);
        }
      };
    }(), D.na = D.a.I.na, D.removeNode = D.a.I.removeNode, D.b("cleanNode", D.na), D.b("removeNode", D.removeNode), D.b("utils.domNodeDisposal", D.a.I), D.b("utils.domNodeDisposal.addDisposeCallback", D.a.I.za), D.b("utils.domNodeDisposal.removeDisposeCallback", D.a.I.xb), c = [0, "", ""], d = {
      thead: t = [1, "<table>", "</table>"],
      tbody: t,
      tfoot: t,
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: l = [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      th: l,
      option: f = [1, "<select multiple='multiple'>", "</select>"],
      optgroup: f
    }, p = D.a.W <= 8, D.a.ta = function (e, t) {
      var n;

      if (Oe) {
        if (Oe.parseHTML) n = Oe.parseHTML(e, t) || [];else if ((n = Oe.clean([e], t)) && n[0]) {
          for (var a = n[0]; a.parentNode && 11 !== a.parentNode.nodeType;) {
            a = a.parentNode;
          }

          a.parentNode && a.parentNode.removeChild(a);
        }
      } else {
        (n = t) || (n = Be);
        var a = n.parentWindow || n.defaultView || Ae,
            r = D.a.Cb(e).toLowerCase(),
            o = n.createElement("div"),
            i = (r = r.match(/^(?:\x3c!--.*?--\x3e\s*?)*?<([a-z]+)[\s>]/)) && d[r[1]] || c,
            r = i[0];

        for (i = "ignored<div>" + i[1] + e + i[2] + "</div>", "function" == typeof a.innerShiv ? o.appendChild(a.innerShiv(i)) : (p && n.body.appendChild(o), o.innerHTML = i, p && o.parentNode.removeChild(o)); r--;) {
          o = o.lastChild;
        }

        n = D.a.la(o.lastChild.childNodes);
      }

      return n;
    }, D.a.Ld = function (e, t) {
      var n = D.a.ta(e, t);
      return n.length && n[0].parentElement || D.a.Xb(n);
    }, D.a.dc = function (e, t) {
      if (D.a.Sb(e), null !== (t = D.a.c(t)) && t !== _e) if ("string" != typeof t && (t = t.toString()), Oe) Oe(e).html(t);else for (var n = D.a.ta(t, e.ownerDocument), a = 0; a < n.length; a++) {
        e.appendChild(n[a]);
      }
    }, D.b("utils.parseHtmlFragment", D.a.ta), D.b("utils.setHtml", D.a.dc), D.aa = (h = {}, {
      Wb: function Wb(e) {
        if ("function" != typeof e) throw Error("You can only pass a function to ko.memoization.memoize()");
        var t = (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1) + (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
        return h[t] = e, "\x3c!--[ko_memo:" + t + "]--\x3e";
      },
      ad: function ad(e, t) {
        var n = h[e];
        if (n === _e) throw Error("Couldn't find any memo with ID " + e + ". Perhaps it's already been unmemoized.");

        try {
          return n.apply(null, t || []), !0;
        } finally {
          delete h[e];
        }
      },
      bd: function bd(e, t) {
        var n = [];
        !function e(t, n) {
          if (t) if (8 == t.nodeType) null != (a = D.aa.Tc(t.nodeValue)) && n.push({
            sd: t,
            Jd: a
          });else if (1 == t.nodeType) for (var a = 0, r = t.childNodes, o = r.length; a < o; a++) {
            e(r[a], n);
          }
        }(e, n);

        for (var a = 0, r = n.length; a < r; a++) {
          var o = n[a].sd,
              i = [o];
          t && D.a.gb(i, t), D.aa.ad(n[a].Jd, i), o.nodeValue = "", o.parentNode && o.parentNode.removeChild(o);
        }
      },
      Tc: function Tc(e) {
        return (e = e.match(/^\[ko_memo\:(.*?)\]$/)) ? e[1] : null;
      }
    }), D.b("memoization", D.aa), D.b("memoization.memoize", D.aa.Wb), D.b("memoization.unmemoize", D.aa.ad), D.b("memoization.parseMemoText", D.aa.Tc), D.b("memoization.unmemoizeDomNodeAndDescendants", D.aa.bd), D.ma = (g = [], y = 1, w = m = 0, {
      scheduler: Ae.MutationObserver ? (b = C, v = Be.createElement("div"), new MutationObserver(b).observe(v, {
        attributes: !0
      }), function () {
        v.classList.toggle("foo");
      }) : Be && "onreadystatechange" in Be.createElement("script") ? function (e) {
        var t = Be.createElement("script");
        t.onreadystatechange = function () {
          t.onreadystatechange = null, Be.documentElement.removeChild(t), t = null, e();
        }, Be.documentElement.appendChild(t);
      } : function (e) {
        setTimeout(e, 0);
      },
      yb: function yb(e) {
        return m || D.ma.scheduler(C), g[m++] = e, y++;
      },
      cancel: function cancel(e) {
        w <= (e -= y - m) && e < m && (g[e] = null);
      },
      resetForTesting: function resetForTesting() {
        var e = m - w;
        return w = m = g.length = 0, e;
      },
      Rd: x
    }), D.b("tasks", D.ma), D.b("tasks.schedule", D.ma.yb), D.b("tasks.runEarly", D.ma.Rd), D.Ta = {
      throttle: function throttle(t, n) {
        t.throttleEvaluation = n;
        var a = null;
        return D.$({
          read: t,
          write: function write(e) {
            clearTimeout(a), a = D.a.setTimeout(function () {
              t(e);
            }, n);
          }
        });
      },
      rateLimit: function rateLimit(e, t) {
        var n, a, r;
        "number" == typeof t ? n = t : (n = t.timeout, a = t.method), e.Hb = !1, r = "function" == typeof a ? a : "notifyWhenChangesStop" == a ? i : o, e.tb(function (e) {
          return r(e, n, t);
        });
      },
      deferred: function deferred(a, e) {
        if (!0 !== e) throw Error("The 'deferred' extender only accepts the value 'true', because it is not supported to turn deferral off once enabled.");
        a.Hb || (a.Hb = !0, a.tb(function (e) {
          var t,
              n = !1;
          return function () {
            if (!n) {
              D.ma.cancel(t), t = D.ma.yb(e);

              try {
                n = !0, a.notifySubscribers(_e, "dirty");
              } finally {
                n = !1;
              }
            }
          };
        }));
      },
      notify: function notify(e, t) {
        e.equalityComparer = "always" == t ? null : n;
      }
    };
    var E = {
      undefined: 1,
      "boolean": 1,
      number: 1,
      string: 1
    };
    D.b("extenders", D.Ta), D.gc = function (e, t, n) {
      this.da = e, this.kc = t, this.lc = n, this.Ib = !1, this.ab = this.Jb = null, D.J(this, "dispose", this.s), D.J(this, "disposeWhenNodeIsRemoved", this.l);
    }, D.gc.prototype.s = function () {
      this.Ib || (this.ab && D.a.I.xb(this.Jb, this.ab), this.Ib = !0, this.lc(), this.da = this.kc = this.lc = this.Jb = this.ab = null);
    }, D.gc.prototype.l = function (e) {
      this.Jb = e, D.a.I.za(e, this.ab = this.s.bind(this));
    }, D.R = function () {
      D.a.zb(this, S), S.ob(this);
    };
    var k,
        T,
        N,
        S = {
      ob: function ob(e) {
        e.S = {
          change: []
        }, e.rc = 1;
      },
      subscribe: function subscribe(e, t, n) {
        var a = this;
        n = n || "change";
        var r = new D.gc(a, t ? e.bind(t) : e, function () {
          D.a.hb(a.S[n], r), a.cb && a.cb(n);
        });
        return a.Qa && a.Qa(n), a.S[n] || (a.S[n] = []), a.S[n].push(r), r;
      },
      notifySubscribers: function notifySubscribers(e, t) {
        if ("change" === (t = t || "change") && this.Gb(), this.Wa(t)) {
          var n = "change" === t && this.dd || this.S[t].slice(0);

          try {
            D.v.wc();

            for (var a, r = 0; a = n[r]; ++r) {
              a.Ib || a.kc(e);
            }
          } finally {
            D.v.end();
          }
        }
      },
      mb: function mb() {
        return this.rc;
      },
      Cd: function Cd(e) {
        return this.mb() !== e;
      },
      Gb: function Gb() {
        ++this.rc;
      },
      tb: function tb(e) {
        var n,
            t,
            a,
            r,
            o,
            i = this,
            u = D.N(i);
        i.bb || (i.bb = i.notifySubscribers, i.notifySubscribers = s);
        var c = e(function () {
          i.Ka = !1, u && r === i && (r = i.mc ? i.mc() : i());
          var e = t || o && i.qb(a, r);
          o = t = n = !1, e && i.bb(a = r);
        });
        i.pc = function (e, t) {
          t && i.Ka || (o = !t), i.dd = i.S.change.slice(0), i.Ka = n = !0, r = e, c();
        }, i.oc = function (e) {
          n || (a = e, i.bb(e, "beforeChange"));
        }, i.qc = function () {
          o = !0;
        }, i.fd = function () {
          i.qb(a, i.w(!0)) && (t = !0);
        };
      },
      Wa: function Wa(e) {
        return this.S[e] && this.S[e].length;
      },
      Ad: function Ad(e) {
        if (e) return this.S[e] && this.S[e].length || 0;
        var n = 0;
        return D.a.O(this.S, function (e, t) {
          "dirty" !== e && (n += t.length);
        }), n;
      },
      qb: function qb(e, t) {
        return !this.equalityComparer || !this.equalityComparer(e, t);
      },
      toString: function toString() {
        return "[object Object]";
      },
      extend: function extend(e) {
        var a = this;
        return e && D.a.O(e, function (e, t) {
          var n = D.Ta[e];
          "function" == typeof n && (a = n(a, t) || a);
        }), a;
      }
    };

    function _(e) {
      T.push(k), k = e;
    }

    function A() {
      k = T.pop();
    }

    D.J(S, "init", S.ob), D.J(S, "subscribe", S.subscribe), D.J(S, "extend", S.extend), D.J(S, "getSubscriptionsCount", S.Ad), D.a.Ba && D.a.setPrototypeOf(S, Function.prototype), D.R.fn = S, D.Pc = function (e) {
      return null != e && "function" == typeof e.subscribe && "function" == typeof e.notifySubscribers;
    }, D.b("subscribable", D.R), D.b("isSubscribable", D.Pc), D.U = D.v = (T = [], N = 0, {
      wc: _,
      end: A,
      ac: function ac(e) {
        if (k) {
          if (!D.Pc(e)) throw Error("Only subscribable things can act as dependencies");
          k.nd.call(k.od, e, e.ed || (e.ed = ++N));
        }
      },
      K: function K(e, t, n) {
        try {
          return _(), e.apply(t, n || []);
        } finally {
          A();
        }
      },
      pa: function pa() {
        if (k) return k.o.pa();
      },
      Va: function Va() {
        if (k) return k.o.Va();
      },
      rb: function rb() {
        if (k) return k.rb;
      },
      o: function o() {
        if (k) return k.o;
      }
    }), D.b("computedContext", D.U), D.b("computedContext.getDependenciesCount", D.U.pa), D.b("computedContext.getDependencies", D.U.Va), D.b("computedContext.isInitial", D.U.rb), D.b("computedContext.registerDependency", D.U.ac), D.b("ignoreDependencies", D.Wd = D.v.K);
    var B = D.a.Da("_latestValue");

    D.sa = function (e) {
      function t() {
        return 0 < arguments.length ? (t.qb(t[B], arguments[0]) && (t.xa(), t[B] = arguments[0], t.wa()), this) : (D.v.ac(t), t[B]);
      }

      return t[B] = e, D.a.Ba || D.a.extend(t, D.R.fn), D.R.fn.ob(t), D.a.zb(t, j), D.options.deferUpdates && D.Ta.deferred(t, !0), t;
    };

    var j = {
      equalityComparer: n,
      w: function w() {
        return this[B];
      },
      wa: function wa() {
        this.notifySubscribers(this[B], "spectate"), this.notifySubscribers(this[B]);
      },
      xa: function xa() {
        this.notifySubscribers(this[B], "beforeChange");
      }
    };
    D.a.Ba && D.a.setPrototypeOf(j, D.R.fn);
    var O = D.sa.Na = "__ko_proto__";
    j[O] = D.sa, D.N = function (e) {
      if ((e = "function" == typeof e && e[O]) && e !== j[O] && e !== D.o.fn[O]) throw Error("Invalid object that looks like an observable; possibly from another Knockout instance");
      return !!e;
    }, D.Ya = function (e) {
      return "function" == typeof e && (e[O] === j[O] || e[O] === D.o.fn[O] && e.Mc);
    }, D.b("observable", D.sa), D.b("isObservable", D.N), D.b("isWriteableObservable", D.Ya), D.b("isWritableObservable", D.Ya), D.b("observable.fn", j), D.J(j, "peek", j.w), D.J(j, "valueHasMutated", j.wa), D.J(j, "valueWillMutate", j.xa), D.Ia = function (e) {
      if ("object" != _typeof(e = e || []) || !("length" in e)) throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
      return e = D.sa(e), D.a.zb(e, D.Ia.fn), e.extend({
        trackArrayChanges: !0
      });
    }, D.Ia.fn = {
      remove: function remove(t) {
        for (var e = this.w(), n = [], a = "function" != typeof t || D.N(t) ? function (e) {
          return e === t;
        } : t, r = 0; r < e.length; r++) {
          var o = e[r];

          if (a(o)) {
            if (0 === n.length && this.xa(), e[r] !== o) throw Error("Array modified during remove; cannot remove item");
            n.push(o), e.splice(r, 1), r--;
          }
        }

        return n.length && this.wa(), n;
      },
      removeAll: function removeAll(t) {
        if (t !== _e) return t ? this.remove(function (e) {
          return 0 <= D.a.A(t, e);
        }) : [];
        var e = this.w(),
            n = e.slice(0);
        return this.xa(), e.splice(0, e.length), this.wa(), n;
      },
      destroy: function destroy(t) {
        var e = this.w(),
            n = "function" != typeof t || D.N(t) ? function (e) {
          return e === t;
        } : t;
        this.xa();

        for (var a = e.length - 1; 0 <= a; a--) {
          var r = e[a];
          n(r) && (r._destroy = !0);
        }

        this.wa();
      },
      destroyAll: function destroyAll(t) {
        return t === _e ? this.destroy(function () {
          return !0;
        }) : t ? this.destroy(function (e) {
          return 0 <= D.a.A(t, e);
        }) : [];
      },
      indexOf: function indexOf(e) {
        var t = this();
        return D.a.A(t, e);
      },
      replace: function replace(e, t) {
        var n = this.indexOf(e);
        0 <= n && (this.xa(), this.w()[n] = t, this.wa());
      },
      sorted: function sorted(e) {
        var t = this().slice(0);
        return e ? t.sort(e) : t.sort();
      },
      reversed: function reversed() {
        return this().slice(0).reverse();
      }
    }, D.a.Ba && D.a.setPrototypeOf(D.Ia.fn, D.sa.fn), D.a.C("pop push reverse shift sort splice unshift".split(" "), function (n) {
      D.Ia.fn[n] = function () {
        var e = this.w();
        this.xa(), this.yc(e, n, arguments);
        var t = e[n].apply(e, arguments);
        return this.wa(), t === e ? this : t;
      };
    }), D.a.C(["slice"], function (t) {
      D.Ia.fn[t] = function () {
        var e = this();
        return e[t].apply(e, arguments);
      };
    }), D.Oc = function (e) {
      return D.N(e) && "function" == typeof e.remove && "function" == typeof e.push;
    }, D.b("observableArray", D.Ia), D.b("isObservableArray", D.Oc), D.Ta.trackArrayChanges = function (n, e) {
      var f, d, a, p, r, o, i, t;
      n.Nb = {}, e && "object" == _typeof(e) && D.a.extend(n.Nb, e), n.Nb.sparse = !0, n.yc || (f = !1, d = null, p = 0, i = n.Qa, t = n.cb, n.Qa = function (e) {
        function t() {
          var e, t;
          p && (e = [].concat(n.w() || []), n.Wa("arrayChange") && ((!d || 1 < p) && (d = D.a.Ob(r, e, n.Nb)), t = d), r = e, d = null, p = 0, t && t.length && n.notifySubscribers(t, "arrayChange"));
        }

        i && i.call(n, e), "arrayChange" === e && (f ? t() : (f = !0, o = n.notifySubscribers, n.notifySubscribers = function (e, t) {
          return t && "change" !== t || ++p, o.apply(this, arguments);
        }, r = [].concat(n.w() || []), d = null, a = n.subscribe(t)));
      }, n.cb = function (e) {
        t && t.call(n, e), "arrayChange" !== e || n.Wa("arrayChange") || (o && (n.notifySubscribers = o, o = _e), a && a.s(), a = null, f = !1, r = _e);
      }, n.yc = function (e, t, n) {
        function a(e, t, n) {
          return r[r.length] = {
            status: e,
            value: t,
            index: n
          };
        }

        if (f && !p) {
          var r = [],
              o = e.length,
              i = n.length,
              u = 0;

          switch (t) {
            case "push":
              u = o;

            case "unshift":
              for (t = 0; t < i; t++) {
                a("added", n[t], u + t);
              }

              break;

            case "pop":
              u = o - 1;

            case "shift":
              o && a("deleted", e[u], u);
              break;

            case "splice":
              t = Math.min(Math.max(0, n[0] < 0 ? o + n[0] : n[0]), o);

              for (var o = 1 === i ? o : Math.min(t + (n[1] || 0), o), i = t + i - 2, u = Math.max(o, i), c = [], s = [], l = 2; t < u; ++t, ++l) {
                t < o && s.push(a("deleted", e[t], t)), t < i && c.push(a("added", n[l], t));
              }

              D.a.Jc(s, c);
              break;

            default:
              return;
          }

          d = r;
        }
      });
    };
    var M = D.a.Da("_state");

    D.o = D.$ = function (e, t, n) {
      function a() {
        if (0 < arguments.length) {
          if ("function" != typeof r) throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
          return r.apply(o.lb, arguments), this;
        }

        return o.qa || D.v.ac(a), (o.ka || o.G && a.Xa()) && a.ha(), o.X;
      }

      if ("object" == _typeof(e) ? n = e : (n = n || {}, e && (n.read = e)), "function" != typeof n.read) throw Error("Pass a function that returns the value of the ko.computed");
      var r = n.write,
          o = {
        X: _e,
        ra: !0,
        ka: !0,
        pb: !1,
        hc: !1,
        qa: !1,
        vb: !1,
        G: !1,
        Vc: n.read,
        lb: t || n.owner,
        l: n.disposeWhenNodeIsRemoved || n.l || null,
        Sa: n.disposeWhen || n.Sa,
        Qb: null,
        F: {},
        V: 0,
        Hc: null
      };
      return a[M] = o, a.Mc = "function" == typeof r, D.a.Ba || D.a.extend(a, D.R.fn), D.R.fn.ob(a), D.a.zb(a, $), n.pure ? (o.vb = !0, o.G = !0, D.a.extend(a, I)) : n.deferEvaluation && D.a.extend(a, R), D.options.deferUpdates && D.Ta.deferred(a, !0), o.l && (o.hc = !0, o.l.nodeType || (o.l = null)), o.G || n.deferEvaluation || a.ha(), o.l && a.ja() && D.a.I.za(o.l, o.Qb = function () {
        a.s();
      }), a;
    };

    var $ = {
      equalityComparer: n,
      pa: function pa() {
        return this[M].V;
      },
      Va: function Va() {
        var n = [];
        return D.a.O(this[M].F, function (e, t) {
          n[t.La] = t.da;
        }), n;
      },
      Ub: function Ub(t) {
        if (!this[M].V) return !1;
        var e = this.Va();
        return -1 !== D.a.A(e, t) || !!D.a.Lb(e, function (e) {
          return e.Ub && e.Ub(t);
        });
      },
      tc: function tc(e, t, n) {
        if (this[M].vb && t === this) throw Error("A 'pure' computed must not be called recursively");
        (this[M].F[e] = n).La = this[M].V++, n.Ma = t.mb();
      },
      Xa: function Xa() {
        var e,
            t,
            n = this[M].F;

        for (e in n) {
          if (Object.prototype.hasOwnProperty.call(n, e) && (t = n[e], this.Ja && t.da.Ka || t.da.Cd(t.Ma))) return !0;
        }
      },
      Id: function Id() {
        this.Ja && !this[M].pb && this.Ja(!1);
      },
      ja: function ja() {
        var e = this[M];
        return e.ka || 0 < e.V;
      },
      Qd: function Qd() {
        this.Ka ? this[M].ka && (this[M].ra = !0) : this.Gc();
      },
      Zc: function Zc(e) {
        if (e.Hb) {
          var t = e.subscribe(this.Id, this, "dirty"),
              n = e.subscribe(this.Qd, this);
          return {
            da: e,
            s: function s() {
              t.s(), n.s();
            }
          };
        }

        return e.subscribe(this.Gc, this);
      },
      Gc: function Gc() {
        var e = this,
            t = e.throttleEvaluation;
        t && 0 <= t ? (clearTimeout(this[M].Hc), this[M].Hc = D.a.setTimeout(function () {
          e.ha(!0);
        }, t)) : e.Ja ? e.Ja(!0) : e.ha(!0);
      },
      ha: function ha(e) {
        var t = this[M],
            n = t.Sa,
            a = !1;

        if (!t.pb && !t.qa) {
          if (t.l && !D.a.Rb(t.l) || n && n()) {
            if (!t.hc) return void this.s();
          } else t.hc = !1;

          t.pb = !0;

          try {
            a = this.yd(e);
          } finally {
            t.pb = !1;
          }

          return a;
        }
      },
      yd: function yd(e) {
        var t = this[M],
            n = !1,
            a = t.vb ? _e : !t.V,
            n = {
          pd: this,
          kb: t.F,
          Pb: t.V
        };
        D.v.wc({
          od: n,
          nd: u,
          o: this,
          rb: a
        }), t.F = {}, t.V = 0;
        var r = this.xd(t, n);
        return (n = t.V ? this.qb(t.X, r) : (this.s(), !0)) && (t.G ? this.Gb() : this.notifySubscribers(t.X, "beforeChange"), t.X = r, this.notifySubscribers(t.X, "spectate"), !t.G && e && this.notifySubscribers(t.X), this.qc && this.qc()), a && this.notifySubscribers(t.X, "awake"), n;
      },
      xd: function xd(e, t) {
        try {
          var n = e.Vc;
          return e.lb ? n.call(e.lb) : n();
        } finally {
          D.v.end(), t.Pb && !e.G && D.a.O(t.kb, r), e.ra = e.ka = !1;
        }
      },
      w: function w(e) {
        var t = this[M];
        return (t.ka && (e || !t.V) || t.G && this.Xa()) && this.ha(), t.X;
      },
      tb: function tb(e) {
        D.R.fn.tb.call(this, e), this.mc = function () {
          return this[M].G || (this[M].ra ? this.ha() : this[M].ka = !1), this[M].X;
        }, this.Ja = function (e) {
          this.oc(this[M].X), this[M].ka = !0, e && (this[M].ra = !0), this.pc(this, !e);
        };
      },
      s: function s() {
        var e = this[M];
        !e.G && e.F && D.a.O(e.F, function (e, t) {
          t.s && t.s();
        }), e.l && e.Qb && D.a.I.xb(e.l, e.Qb), e.F = _e, e.V = 0, e.qa = !0, e.ra = !1, e.ka = !1, e.G = !1, e.l = _e, e.Sa = _e, e.Vc = _e, this.Mc || (e.lb = _e);
      }
    },
        I = {
      Qa: function Qa(e) {
        var n,
            r = this,
            o = r[M];
        !o.qa && o.G && "change" == e && (o.G = !1, o.ra || r.Xa() ? (o.F = null, o.V = 0, r.ha() && r.Gb()) : (n = [], D.a.O(o.F, function (e, t) {
          n[t.La] = e;
        }), D.a.C(n, function (e, t) {
          var n = o.F[e],
              a = r.Zc(n.da);
          a.La = t, a.Ma = n.Ma, o.F[e] = a;
        }), r.Xa() && r.ha() && r.Gb()), o.qa || r.notifySubscribers(o.X, "awake"));
      },
      cb: function cb(e) {
        var n = this[M];
        n.qa || "change" != e || this.Wa("change") || (D.a.O(n.F, function (e, t) {
          t.s && (n.F[e] = {
            da: t.da,
            La: t.La,
            Ma: t.Ma
          }, t.s());
        }), n.G = !0, this.notifySubscribers(_e, "asleep"));
      },
      mb: function mb() {
        var e = this[M];
        return e.G && (e.ra || this.Xa()) && this.ha(), D.R.fn.mb.call(this);
      }
    },
        R = {
      Qa: function Qa(e) {
        "change" != e && "beforeChange" != e || this.w();
      }
    };
    D.a.Ba && D.a.setPrototypeOf($, D.R.fn);
    var F,
        L,
        V,
        P,
        H,
        U,
        J,
        z,
        W,
        q,
        G,
        K,
        Y,
        X,
        Z,
        Q = D.sa.Na;

    function ee(a, r, o) {
      if (o = o || new te(), "object" != _typeof(a = r(a)) || null === a || a === _e || a instanceof RegExp || a instanceof Date || a instanceof String || a instanceof Number || a instanceof Boolean) return a;
      var i = a instanceof Array ? [] : {};
      return o.save(a, i), function (e, t) {
        if (e instanceof Array) {
          for (var n = 0; n < e.length; n++) {
            t(n);
          }

          "function" == typeof e.toJSON && t("toJSON");
        } else for (n in e) {
          t(n);
        }
      }(a, function (e) {
        var t = r(a[e]);

        switch (_typeof(t)) {
          case "boolean":
          case "number":
          case "string":
          case "function":
            i[e] = t;
            break;

          case "object":
          case "undefined":
            var n = o.get(t);
            i[e] = n !== _e ? n : ee(t, r, o);
        }
      }), i;
    }

    function te() {
      this.keys = [], this.values = [];
    }

    function ne(e) {
      123 === (e = D.a.Cb(e)).charCodeAt(0) && (e = e.slice(1, -1));
      var t,
          n = [],
          a = (e += "\n,").match(V),
          r = [],
          o = 0;

      if (1 < a.length) {
        for (var i, u = 0; i = a[u]; ++u) {
          var c = i.charCodeAt(0);

          if (44 === c) {
            if (o <= 0) {
              n.push(t && r.length ? {
                key: t,
                value: r.join("")
              } : {
                unknown: t || r.join("")
              }), t = o = 0, r = [];
              continue;
            }
          } else if (58 === c) {
            if (!o && !t && 1 === r.length) {
              t = r.pop();
              continue;
            }
          } else {
            if (47 === c && 1 < i.length && (47 === i.charCodeAt(1) || 42 === i.charCodeAt(1))) continue;
            47 === c && u && 1 < i.length ? (c = a[u - 1].match(P)) && !H[c[0]] && (a = (e = e.substr(e.indexOf(i) + 1)).match(V), u = -1, i = "/") : 40 === c || 123 === c || 91 === c ? ++o : 41 === c || 125 === c || 93 === c ? --o : t || r.length || 34 !== c && 39 !== c || (i = i.slice(1, -1));
          }

          r.push(i);
        }

        if (0 < o) throw Error("Unbalanced parentheses, braces, or brackets");
      }

      return n;
    }

    function ae(e) {
      return 8 == e.nodeType && z.test(J ? e.text : e.nodeValue);
    }

    function re(e) {
      return 8 == e.nodeType && W.test(J ? e.text : e.nodeValue);
    }

    function oe(e, t) {
      for (var n = e, a = 1, r = []; n = n.nextSibling;) {
        if (re(n) && (D.a.g.set(n, G, !0), 0 === --a)) return r;
        r.push(n), ae(n) && a++;
      }

      if (!t) throw Error("Cannot find closing comment tag to match: " + e.nodeValue);
      return null;
    }

    function ie(e, t) {
      var n = oe(e, t);
      return n ? 0 < n.length ? n[n.length - 1].nextSibling : e.nextSibling : null;
    }

    function ue(a, e) {
      var r,
          n,
          o,
          i = Object.prototype.hasOwnProperty.call(Y, a) ? Y[a] : K;
      i ? i.subscribe(e) : ((i = Y[a] = new D.R()).subscribe(e), o = function o(e, t) {
        var n = !(!t || !t.synchronous);
        X[a] = {
          definition: e,
          Fd: n
        }, delete Y[a], r || n ? i.notifySubscribers(e) : D.ma.yb(function () {
          i.notifySubscribers(e);
        });
      }, ce("getConfig", [n = a], function (t) {
        t ? ce("loadComponent", [n, t], function (e) {
          o(e, t);
        }) : o(null, null);
      }), r = !0);
    }

    function ce(t, n, a, r) {
      var e = (r = r || D.i.loaders.slice(0)).shift();

      if (e) {
        var o = e[t];

        if (o) {
          var i = !1;
          if (o.apply(e, n.concat(function (e) {
            i ? a(null) : null !== e ? a(e) : ce(t, n, a, r);
          })) !== K && (i = !0, !e.suppressLoaderExceptions)) throw Error("Component loaders must supply values by invoking the callback, not by returning values synchronously.");
        } else ce(t, n, a, r);
      } else a(null);
    }

    $[Q] = D.o, D.Nc = function (e) {
      return "function" == typeof e && e[Q] === $[Q];
    }, D.Ed = function (e) {
      return D.Nc(e) && e[M] && e[M].vb;
    }, D.b("computed", D.o), D.b("dependentObservable", D.o), D.b("isComputed", D.Nc), D.b("isPureComputed", D.Ed), D.b("computed.fn", $), D.J($, "peek", $.w), D.J($, "dispose", $.s), D.J($, "isActive", $.ja), D.J($, "getDependenciesCount", $.pa), D.J($, "getDependencies", $.Va), D.wb = function (e, t) {
      return "function" == typeof e ? D.o(e, t, {
        pure: !0
      }) : ((e = D.a.extend({}, e)).pure = !0, D.o(e, t));
    }, D.b("pureComputed", D.wb), D.$c = function (e) {
      if (0 == arguments.length) throw Error("When calling ko.toJS, pass the object you want to convert.");
      return ee(e, function (e) {
        for (var t = 0; D.N(e) && t < 10; t++) {
          e = e();
        }

        return e;
      });
    }, D.toJSON = function (e, t, n) {
      return e = D.$c(e), D.a.fc(e, t, n);
    }, te.prototype = {
      constructor: te,
      save: function save(e, t) {
        var n = D.a.A(this.keys, e);
        0 <= n ? this.values[n] = t : (this.keys.push(e), this.values.push(t));
      },
      get: function get(e) {
        return 0 <= (e = D.a.A(this.keys, e)) ? this.values[e] : _e;
      }
    }, D.b("toJS", D.$c), D.b("toJSON", D.toJSON), D.Vd = function (a, e, r) {
      function t(t) {
        var e = D.wb(a, r).extend({
          Ga: "always"
        }),
            n = e.subscribe(function (e) {
          e && (n.s(), t(e));
        });
        return e.notifySubscribers(e.w()), n;
      }

      return "function" != typeof Promise || e ? t(e.bind(r)) : new Promise(t);
    }, D.b("when", D.Vd), D.u = {
      L: function L(e) {
        switch (D.a.P(e)) {
          case "option":
            return !0 === e.__ko__hasDomDataOptionValue__ ? D.a.g.get(e, D.f.options.Yb) : !(D.a.W <= 7) || e.getAttributeNode("value") && e.getAttributeNode("value").specified ? e.value : e.text;

          case "select":
            return 0 <= e.selectedIndex ? D.u.L(e.options[e.selectedIndex]) : _e;

          default:
            return e.value;
        }
      },
      ya: function ya(e, t, n) {
        switch (D.a.P(e)) {
          case "option":
            "string" == typeof t ? (D.a.g.set(e, D.f.options.Yb, _e), "__ko__hasDomDataOptionValue__" in e && delete e.__ko__hasDomDataOptionValue__, e.value = t) : (D.a.g.set(e, D.f.options.Yb, t), e.__ko__hasDomDataOptionValue__ = !0, e.value = "number" == typeof t ? t : "");
            break;

          case "select":
            "" !== t && null !== t || (t = _e);

            for (var a, r = -1, o = 0, i = e.options.length; o < i; ++o) {
              if ((a = D.u.L(e.options[o])) == t || "" === a && t === _e) {
                r = o;
                break;
              }
            }

            (n || 0 <= r || t === _e && 1 < e.size) && (e.selectedIndex = r, 6 === D.a.W && D.a.setTimeout(function () {
              e.selectedIndex = r;
            }, 0));
            break;

          default:
            null !== t && t !== _e || (t = ""), e.value = t;
        }
      }
    }, D.b("selectExtensions", D.u), D.b("selectExtensions.readValue", D.u.L), D.b("selectExtensions.writeValue", D.u.ya), D.m = (F = ["true", "false", "null", "undefined"], L = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i, V = RegExp("\"(?:\\\\.|[^\"])*\"|'(?:\\\\.|[^'])*'|`(?:\\\\.|[^`])*`|/\\*(?:[^*]|\\*+[^*/])*\\*+/|//.*\n|/(?:\\\\.|[^/])+/w*|[^\\s:,/][^,\"'`{}()/:[\\]]*[^\\s,\"'`{}()/:[\\]]|[^\\s]", "g"), P = /[\])"'A-Za-z0-9_$]+$/, H = {
      "in": 1,
      "return": 1,
      "typeof": 1
    }, {
      Ra: [],
      va: U = {},
      Zb: ne,
      ub: function ub(e, t) {
        function r(e, t) {
          var n;

          if (!c) {
            var a = D.getBindingHandler(e);
            if (a && a.preprocess && !(t = a.preprocess(t, e, r))) return;
            (a = U[e]) && (n = t, a = n = !(0 <= D.a.A(F, n)) && null !== (a = n.match(L)) && (a[1] ? "Object(" + a[1] + ")" + a[2] : n)), a && i.push("'" + ("string" == typeof U[e] ? U[e] : e) + "':function(_z){" + n + "=_z}");
          }

          u && (t = "function(){return " + t + " }"), o.push("'" + e + "':" + t);
        }

        var o = [],
            i = [],
            u = (t = t || {}).valueAccessors,
            c = t.bindingParams,
            n = "string" == typeof e ? ne(e) : e;
        return D.a.C(n, function (e) {
          r(e.key || e.unknown, e.value);
        }), i.length && r("_ko_property_writers", "{" + i.join(",") + " }"), o.join(",");
      },
      Hd: function Hd(e, t) {
        for (var n = 0; n < e.length; n++) {
          if (e[n].key == t) return !0;
        }

        return !1;
      },
      $a: function $a(e, t, n, a, r) {
        e && D.N(e) ? !D.Ya(e) || r && e.w() === a || e(a) : (e = t.get("_ko_property_writers")) && e[n] && e[n](a);
      }
    }), D.b("expressionRewriting", D.m), D.b("expressionRewriting.bindingRewriteValidators", D.m.Ra), D.b("expressionRewriting.parseObjectLiteral", D.m.Zb), D.b("expressionRewriting.preProcessBindings", D.m.ub), D.b("expressionRewriting._twoWayBindings", D.m.va), D.b("jsonExpressionRewriting", D.m), D.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson", D.m.ub), J = Be && "\x3c!--test--\x3e" === Be.createComment("test").text, z = J ? /^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/ : /^\s*ko(?:\s+([\s\S]+))?\s*$/, W = J ? /^\x3c!--\s*\/ko\s*--\x3e$/ : /^\s*\/ko\s*$/, q = {
      ul: !0,
      ol: !0
    }, G = "__ko_matchedEndComment__", D.h = {
      ea: {},
      childNodes: function childNodes(e) {
        return ae(e) ? oe(e) : e.childNodes;
      },
      Ea: function Ea(e) {
        if (ae(e)) for (var t = 0, n = (e = D.h.childNodes(e)).length; t < n; t++) {
          D.removeNode(e[t]);
        } else D.a.Sb(e);
      },
      ua: function ua(e, t) {
        if (ae(e)) {
          D.h.Ea(e);

          for (var n = e.nextSibling, a = 0, r = t.length; a < r; a++) {
            n.parentNode.insertBefore(t[a], n);
          }
        } else D.a.ua(e, t);
      },
      Uc: function Uc(e, t) {
        ae(e) ? e.parentNode.insertBefore(t, e.nextSibling) : e.firstChild ? e.insertBefore(t, e.firstChild) : e.appendChild(t);
      },
      Vb: function Vb(e, t, n) {
        n ? ae(e) ? e.parentNode.insertBefore(t, n.nextSibling) : n.nextSibling ? e.insertBefore(t, n.nextSibling) : e.appendChild(t) : D.h.Uc(e, t);
      },
      firstChild: function firstChild(e) {
        if (ae(e)) return !e.nextSibling || re(e.nextSibling) ? null : e.nextSibling;
        if (e.firstChild && re(e.firstChild)) throw Error("Found invalid end comment, as the first child of " + e);
        return e.firstChild;
      },
      nextSibling: function nextSibling(e) {
        if (ae(e) && (e = ie(e)), e.nextSibling && re(e.nextSibling)) {
          var t = e.nextSibling;
          if (re(t) && !D.a.g.get(t, G)) throw Error("Found end comment without a matching opening comment, as child of " + e);
          return null;
        }

        return e.nextSibling;
      },
      Bd: ae,
      Ud: function Ud(e) {
        return (e = (J ? e.text : e.nodeValue).match(z)) ? e[1] : null;
      },
      Rc: function Rc(e) {
        if (q[D.a.P(e)]) {
          var t = e.firstChild;
          if (t) do {
            if (1 === t.nodeType) {
              var n,
                  a = t.firstChild,
                  r = null;
              if (a) do {
                r ? r.push(a) : ae(a) ? (n = ie(a, !0)) ? a = n : r = [a] : re(a) && (r = [a]);
              } while (a = a.nextSibling);
              if (a = r) for (r = t.nextSibling, n = 0; n < a.length; n++) {
                r ? e.insertBefore(a[n], r) : e.appendChild(a[n]);
              }
            }
          } while (t = t.nextSibling);
        }
      }
    }, D.b("virtualElements", D.h), D.b("virtualElements.allowedBindings", D.h.ea), D.b("virtualElements.emptyNode", D.h.Ea), D.b("virtualElements.insertAfter", D.h.Vb), D.b("virtualElements.prepend", D.h.Uc), D.b("virtualElements.setDomNodeChildren", D.h.ua), D.ga = function () {
      this.md = {};
    }, D.a.extend(D.ga.prototype, {
      nodeHasBindings: function nodeHasBindings(e) {
        switch (e.nodeType) {
          case 1:
            return null != e.getAttribute("data-bind") || D.i.getComponentNameForNode(e);

          case 8:
            return D.h.Bd(e);

          default:
            return !1;
        }
      },
      getBindings: function getBindings(e, t) {
        var n = (n = this.getBindingsString(e, t)) ? this.parseBindingsString(n, t, e) : null;
        return D.i.sc(n, e, t, !1);
      },
      getBindingAccessors: function getBindingAccessors(e, t) {
        var n = (n = this.getBindingsString(e, t)) ? this.parseBindingsString(n, t, e, {
          valueAccessors: !0
        }) : null;
        return D.i.sc(n, e, t, !0);
      },
      getBindingsString: function getBindingsString(e) {
        switch (e.nodeType) {
          case 1:
            return e.getAttribute("data-bind");

          case 8:
            return D.h.Ud(e);

          default:
            return null;
        }
      },
      parseBindingsString: function parseBindingsString(t, e, n, a) {
        try {
          var r,
              o,
              i,
              u = this.md,
              c = t + (a && a.valueAccessors || "");
          return (i = u[c]) || (r = "with($context){with($data||{}){return{" + D.m.ub(t, a) + "}}}", o = new Function("$context", "$element", r), i = u[c] = o), i(e, n);
        } catch (e) {
          throw e.message = "Unable to parse bindings.\nBindings value: " + t + "\nMessage: " + e.message, e;
        }
      }
    }), D.ga.instance = new D.ga(), D.b("bindingProvider", D.ga), function () {
      function a(e) {
        var t = (e = D.a.g.get(e, x)) && e.M;
        t && (e.M = null, t.Sc());
      }

      function r(e, t, n) {
        this.node = e, this.xc = t, this.ib = [], this.T = !1, t.M || D.a.I.za(e, a), n && n.M && (n.M.ib.push(e), this.Kb = n);
      }

      function i(e) {
        return function () {
          return e;
        };
      }

      function g(e) {
        return e();
      }

      function u(n) {
        return D.a.Ha(D.v.K(n), function (e, t) {
          return function () {
            return n()[t];
          };
        });
      }

      function m(e, t) {
        return u(this.getBindings.bind(this, e, t));
      }

      function o(e, t) {
        var n = D.h.firstChild(t);

        if (n) {
          var a,
              r = D.ga.instance,
              o = r.preprocessNode;

          if (o) {
            for (; a = n;) {
              n = D.h.nextSibling(a), o.call(r, a);
            }

            n = D.h.firstChild(t);
          }

          for (; a = n;) {
            n = D.h.nextSibling(a), c(e, a);
          }
        }

        D.j.Ga(t, D.j.T);
      }

      function c(e, t) {
        var n = e,
            a = 1 === t.nodeType;
        a && D.h.Rc(t), (a || D.ga.instance.nodeHasBindings(t)) && (n = s(t, null, e).bindingContextForDescendants), n && !f[D.a.P(t)] && o(n, t);
      }

      function s(r, e, t) {
        var o,
            n,
            a,
            i,
            u = D.a.g.Tb(r, x, {}),
            c = u.gd;

        if (!e) {
          if (c) throw Error("You cannot apply bindings multiple times to the same element.");
          u.gd = !0;
        }

        c || (u.context = t), e && "function" != typeof e ? o = e : (n = D.ga.instance, a = n.getBindingAccessors || m, i = D.$(function () {
          return (o = e ? e(t, r) : a.call(n, r, t)) && (t[y] && t[y](), t[w] && t[w]()), o;
        }, null, {
          l: r
        }), o && i.ja() || (i = null));
        var s,
            l,
            f,
            d,
            p,
            h,
            b,
            v = t;
        return o && (l = function l() {
          return D.a.Ha(i ? i() : o, g);
        }, f = i ? function (e) {
          return function () {
            return g(i()[e]);
          };
        } : function (e) {
          return o[e];
        }, l.get = function (e) {
          return o[e] && g(f(e));
        }, l.has = function (e) {
          return e in o;
        }, D.j.T in o && D.j.subscribe(r, D.j.T, function () {
          var e,
              t = (0, o[D.j.T])();
          !t || (e = D.h.childNodes(r)).length && t(e, D.Dc(e[0]));
        }), D.j.oa in o && (v = D.j.Bb(r, t), D.j.subscribe(r, D.j.oa, function () {
          var e = (0, o[D.j.oa])();
          e && D.h.firstChild(r) && e(r);
        })), d = o, p = [], h = {}, b = [], D.a.O(d, function t(e) {
          var n;
          h[e] || ((n = D.getBindingHandler(e)) && (n.after && (b.push(e), D.a.C(n.after, function (e) {
            if (d[e]) {
              if (-1 !== D.a.A(b, e)) throw Error("Cannot combine the following bindings, because they have a cyclic dependency: " + b.join(", "));
              t(e);
            }
          }), b.length--), p.push({
            key: e,
            Lc: n
          })), h[e] = !0);
        }), u = p, D.a.C(u, function (e) {
          var t = e.Lc.init,
              n = e.Lc.update,
              a = e.key;
          if (8 === r.nodeType && !D.h.ea[a]) throw Error("The binding '" + a + "' cannot be used with virtual elements");

          try {
            "function" == typeof t && D.v.K(function () {
              var e = t(r, f(a), l, v.$data, v);

              if (e && e.controlsDescendantBindings) {
                if (s !== _e) throw Error("Multiple bindings (" + s + " and " + a + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");
                s = a;
              }
            }), "function" == typeof n && D.$(function () {
              n(r, f(a), l, v.$data, v);
            }, null, {
              l: r
            });
          } catch (e) {
            throw e.message = 'Unable to process binding "' + a + ": " + o[a] + '"\nMessage: ' + e.message, e;
          }
        })), {
          shouldBindDescendants: u = s === _e,
          bindingContextForDescendants: u && v
        };
      }

      function l(e, t) {
        return e && e instanceof D.fa ? e : new D.fa(e, _e, _e, t);
      }

      var y = D.a.Da("_subscribable"),
          d = D.a.Da("_ancestorBindingInfo"),
          w = D.a.Da("_dataDependency");
      D.f = {};
      var f = {
        script: !0,
        textarea: !0,
        template: !0
      };

      D.getBindingHandler = function (e) {
        return D.f[e];
      };

      var p = {};
      D.fa = function (e, n, a, r, t) {
        function o() {
          var e = l ? s() : s,
              t = D.a.c(e);
          return n ? (D.a.extend(u, n), d in n && (u[d] = n[d])) : (u.$parents = [], u.$root = t, u.ko = D), u[y] = i, c ? t = u.$data : (u.$rawData = e, u.$data = t), a && (u[a] = t), r && r(u, n, t), n && n[y] && !D.U.o().Ub(n[y]) && n[y](), f && (u[w] = f), u.$data;
        }

        var i,
            u = this,
            c = e === p,
            s = c ? _e : e,
            l = "function" == typeof s && !D.N(s),
            f = t && t.dataDependency;
        t && t.exportDependencies ? o() : ((i = D.wb(o)).w(), i.ja() ? i.equalityComparer = null : u[y] = _e);
      }, D.fa.prototype.createChildContext = function (t, n, a, e) {
        if (!e && n && "object" == _typeof(n) && (n = (e = n).as, a = e.extend), n && e && e.noChildContext) {
          var r = "function" == typeof t && !D.N(t);
          return new D.fa(p, this, null, function (e) {
            a && a(e), e[n] = r ? t() : t;
          }, e);
        }

        return new D.fa(t, this, n, function (e, t) {
          e.$parentContext = t, e.$parent = t.$data, e.$parents = (t.$parents || []).slice(0), e.$parents.unshift(e.$parent), a && a(e);
        }, e);
      }, D.fa.prototype.extend = function (t, e) {
        return new D.fa(p, this, null, function (e) {
          D.a.extend(e, "function" == typeof t ? t(e) : t);
        }, e);
      };
      var x = D.a.g.Z();
      r.prototype.Sc = function () {
        this.Kb && this.Kb.M && this.Kb.M.rd(this.node);
      }, r.prototype.rd = function (e) {
        D.a.hb(this.ib, e), !this.ib.length && this.T && this.Bc();
      }, r.prototype.Bc = function () {
        this.T = !0, this.xc.M && !this.ib.length && (this.xc.M = null, D.a.I.xb(this.node, a), D.j.Ga(this.node, D.j.oa), this.Sc());
      }, D.j = {
        T: "childrenComplete",
        oa: "descendantsComplete",
        subscribe: function subscribe(e, t, n, a) {
          return (e = D.a.g.Tb(e, x, {})).Fa || (e.Fa = new D.R()), e.Fa.subscribe(n, a, t);
        },
        Ga: function Ga(e, t) {
          var n = D.a.g.get(e, x);
          if (n && (n.Fa && n.Fa.notifySubscribers(e, t), t == D.j.T)) if (n.M) n.M.Bc();else if (n.M === _e && n.Fa && n.Fa.Wa(D.j.oa)) throw Error("descendantsComplete event not supported for bindings on this node");
        },
        Bb: function Bb(e, t) {
          var n = D.a.g.Tb(e, x, {});
          return n.M || (n.M = new r(e, n, t[d])), t[d] == n ? t : t.extend(function (e) {
            e[d] = n;
          });
        }
      }, D.Sd = function (e) {
        return (e = D.a.g.get(e, x)) && e.context;
      }, D.eb = function (e, t, n) {
        return 1 === e.nodeType && D.h.Rc(e), s(e, t, l(n));
      }, D.kd = function (e, t, n) {
        return n = l(n), D.eb(e, (r = n, o = e, "function" == typeof (a = t) ? u(a.bind(null, r, o)) : D.a.Ha(a, i)), n);
        var a, r, o;
      }, D.Pa = function (e, t) {
        1 !== t.nodeType && 8 !== t.nodeType || o(l(e), t);
      }, D.uc = function (e, t, n) {
        if (!Oe && Ae.jQuery && (Oe = Ae.jQuery), arguments.length < 2) {
          if (!(t = Be.body)) throw Error("ko.applyBindings: could not find document.body; has the document been loaded?");
        } else if (!t || 1 !== t.nodeType && 8 !== t.nodeType) throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");

        c(l(e, n), t);
      }, D.Cc = function (e) {
        return !e || 1 !== e.nodeType && 8 !== e.nodeType ? _e : D.Sd(e);
      }, D.Dc = function (e) {
        return (e = D.Cc(e)) ? e.$data : _e;
      }, D.b("bindingHandlers", D.f), D.b("bindingEvent", D.j), D.b("bindingEvent.subscribe", D.j.subscribe), D.b("bindingEvent.startPossiblyAsyncContentBinding", D.j.Bb), D.b("applyBindings", D.uc), D.b("applyBindingsToDescendants", D.Pa), D.b("applyBindingAccessorsToNode", D.eb), D.b("applyBindingsToNode", D.kd), D.b("contextFor", D.Cc), D.b("dataFor", D.Dc);
    }(), Y = {}, X = {}, D.i = {
      get: function get(e, t) {
        var n = Object.prototype.hasOwnProperty.call(X, e) ? X[e] : K;
        n ? n.Fd ? D.v.K(function () {
          t(n.definition);
        }) : D.ma.yb(function () {
          t(n.definition);
        }) : ue(e, t);
      },
      Ac: function Ac(e) {
        delete X[e];
      },
      nc: ce
    }, D.i.loaders = [], D.b("components", D.i), D.b("components.get", D.i.get), D.b("components.clearCachedDefinition", D.i.Ac), function () {
      function r(e) {
        switch (D.a.P(e)) {
          case "script":
            return D.a.ta(e.text);

          case "textarea":
            return D.a.ta(e.value);

          case "template":
            if (o(e.content)) return D.a.Ca(e.content.childNodes);
        }

        return D.a.Ca(e.childNodes);
      }

      function o(e) {
        return Ae.DocumentFragment ? e instanceof DocumentFragment : e && 11 === e.nodeType;
      }

      function d(e, t, n) {
        "string" == typeof t.require ? a || Ae.require ? (a || Ae.require)([t.require], n) : e("Uses require, but no AMD loader is present") : n(t);
      }

      function i(t) {
        return function (e) {
          throw Error("Component '" + t + "': " + e);
        };
      }

      var n = {};
      D.i.register = function (e, t) {
        if (!t) throw Error("Invalid configuration for " + e);
        if (D.i.sb(e)) throw Error("Component " + e + " is already registered");
        n[e] = t;
      }, D.i.sb = function (e) {
        return Object.prototype.hasOwnProperty.call(n, e);
      }, D.i.unregister = function (e) {
        delete n[e], D.i.Ac(e);
      }, D.i.Ec = {
        getConfig: function getConfig(e, t) {
          t(D.i.sb(e) ? n[e] : null);
        },
        loadComponent: function loadComponent(s, e, l) {
          var f = i(s);
          d(f, e, function (e) {
            function t() {
              0 == --u && o(i);
            }

            var n, a, r, o, i, u, c;
            n = s, a = f, o = l, i = {}, u = 2, c = (r = e).template, r = r.viewModel, c ? d(a, c, function (e) {
              D.i.nc("loadTemplate", [n, e], function (e) {
                i.template = e, t();
              });
            }) : t(), r ? d(a, r, function (e) {
              D.i.nc("loadViewModel", [n, e], function (e) {
                i[p] = e, t();
              });
            }) : t();
          });
        },
        loadTemplate: function loadTemplate(e, t, n) {
          var a;
          e = i(e), "string" == typeof t ? n(D.a.ta(t)) : t instanceof Array ? n(t) : o(t) ? n(D.a.la(t.childNodes)) : t.element ? (t = t.element, (Ae.HTMLElement ? t instanceof HTMLElement : t && t.tagName && 1 === t.nodeType) ? n(r(t)) : "string" == typeof t ? (a = Be.getElementById(t)) ? n(r(a)) : e("Cannot find element with ID " + t) : e("Unknown element type: " + t)) : e("Unknown template value: " + t);
        },
        loadViewModel: function loadViewModel(e, t, n) {
          !function e(t, n, a) {
            var r;
            "function" == typeof n ? a(function (e) {
              return new n(e);
            }) : "function" == typeof n[p] ? a(n[p]) : "instance" in n ? (r = n.instance, a(function () {
              return r;
            })) : "viewModel" in n ? e(t, n.viewModel, a) : t("Unknown viewModel value: " + n);
          }(i(e), t, n);
        }
      };
      var p = "createViewModel";
      D.b("components.register", D.i.register), D.b("components.isRegistered", D.i.sb), D.b("components.unregister", D.i.unregister), D.b("components.defaultLoader", D.i.Ec), D.i.loaders.push(D.i.Ec), D.i.cd = n;
    }(), function () {
      D.i.getComponentNameForNode = function (e) {
        var t = D.a.P(e);
        if (D.i.sb(t) && (-1 != t.indexOf("-") || "[object HTMLUnknownElement]" == "" + e || D.a.W <= 8 && e.tagName === t)) return t;
      }, D.i.sc = function (e, t, n, a) {
        if (1 === t.nodeType) {
          var r = D.i.getComponentNameForNode(t);

          if (r) {
            if ((e = e || {}).component) throw Error('Cannot use the "component" binding on a custom element matching a component');
            var o = {
              name: r,
              params: function (n, e) {
                if (t = n.getAttribute("params")) {
                  var t = i.parseBindingsString(t, e, n, {
                    valueAccessors: !0,
                    bindingParams: !0
                  }),
                      t = D.a.Ha(t, function (e) {
                    return D.o(e, null, {
                      l: n
                    });
                  }),
                      a = D.a.Ha(t, function (t) {
                    var e = t.w();
                    return t.ja() ? D.o({
                      read: function read() {
                        return D.a.c(t());
                      },
                      write: D.Ya(e) && function (e) {
                        t()(e);
                      },
                      l: n
                    }) : e;
                  });
                  return Object.prototype.hasOwnProperty.call(a, "$raw") || (a.$raw = t), a;
                }

                return {
                  $raw: {}
                };
              }(t, n)
            };
            e.component = a ? function () {
              return o;
            } : o;
          }
        }

        return e;
      };
      var a,
          t,
          i = new D.ga();
      D.a.W < 9 && (D.i.register = (t = D.i.register, function (e) {
        return t.apply(this, arguments);
      }), Be.createDocumentFragment = (a = Be.createDocumentFragment, function () {
        var e,
            t = a(),
            n = D.i.cd;

        for (e in n) {
          ;
        }

        return t;
      }));
    }(), Z = 0, D.f.component = {
      init: function init(l, t, e, n, a) {
        function f() {
          var e = d && d.dispose;
          "function" == typeof e && e.call(d), h && h.s(), p = d = h = null;
        }

        var d,
            p,
            h,
            b = D.a.la(D.h.childNodes(l));
        return D.h.Ea(l), D.a.I.za(l, f), D.o(function () {
          var i,
              u,
              e = D.a.c(t());
          if ("string" == typeof e ? i = e : (i = D.a.c(e.name), u = D.a.c(e.params)), !i) throw Error("No component name specified");
          var c = D.j.Bb(l, a),
              s = p = ++Z;
          D.i.get(i, function (e) {
            if (p === s) {
              if (f(), !e) throw Error("Unknown component '" + i + "'");
              !function (e, t, n) {
                if (!(t = t.template)) throw Error("Component '" + e + "' has no template");
                e = D.a.Ca(t), D.h.ua(n, e);
              }(i, e, l);
              var t = (a = u, r = {
                element: l,
                templateNodes: b
              }, (o = (n = e).createViewModel) ? o.call(n, a, r) : a);
              e = c.createChildContext(t, {
                extend: function extend(e) {
                  e.$component = t, e.$componentTemplateNodes = b;
                }
              }), t && t.koDescendantsComplete && (h = D.j.subscribe(l, D.j.oa, t.koDescendantsComplete, t)), d = t, D.Pa(e, l);
            }

            var n, a, r, o;
          });
        }, null, {
          l: l
        }), {
          controlsDescendantBindings: !0
        };
      }
    }, D.h.ea.component = !0;
    var se = {
      "class": "className",
      "for": "htmlFor"
    };

    function le(e, p, h) {
      D.f[e] = {
        init: function init(r, o, e, t, i) {
          var u,
              c,
              s,
              l,
              n,
              f,
              d = {};
          return p && (t = e.get("as"), n = e.get("noChildContext"), d = {
            as: t,
            noChildContext: n,
            exportDependencies: f = !(t && n)
          }), l = (s = "render" == e.get("completeOn")) || e.has(D.j.oa), D.o(function () {
            var e,
                t = D.a.c(o()),
                n = !h != !t,
                a = !c;
            !f && n === u || (l && (i = D.j.Bb(r, i)), n && (p && !f || (d.dataDependency = D.U.o()), e = p ? i.createChildContext("function" == typeof t ? t : o, d) : D.U.pa() ? i.extend(null, d) : i), a && D.U.pa() && (c = D.a.Ca(D.h.childNodes(r), !0)), n ? (a || D.h.ua(r, D.a.Ca(c)), D.Pa(e, r)) : (D.h.Ea(r), s || D.j.Ga(r, D.j.T)), u = n);
          }, null, {
            l: r
          }), {
            controlsDescendantBindings: !0
          };
        }
      }, D.m.Ra[e] = !1, D.h.ea[e] = !0;
    }

    D.f.attr = {
      update: function update(r, e) {
        var t = D.a.c(e()) || {};
        D.a.O(t, function (e, t) {
          t = D.a.c(t);
          var n = e.indexOf(":"),
              n = "lookupNamespaceURI" in r && 0 < n && r.lookupNamespaceURI(e.substr(0, n)),
              a = !1 === t || null === t || t === _e;
          a ? n ? r.removeAttributeNS(n, e) : r.removeAttribute(e) : t = t.toString(), D.a.W <= 8 && e in se ? (e = se[e], a ? r.removeAttribute(e) : r[e] = t) : a || (n ? r.setAttributeNS(n, e, t) : r.setAttribute(e, t)), "name" === e && D.a.Xc(r, a ? "" : t);
        });
      }
    }, D.f.checked = {
      after: ["value", "attr"],
      init: function init(o, i, u) {
        function e() {
          var e,
              t,
              n,
              a = o.checked,
              r = f();
          D.U.rb() || !a && (p || D.U.pa()) || (e = D.v.K(i), c ? (t = s ? e.w() : e, (n = l) !== (l = r) ? a && (D.a.Oa(t, r, !0), D.a.Oa(t, n, !1)) : D.a.Oa(t, r, a), s && D.Ya(e) && e(t)) : (d && (r === _e ? r = a : a || (r = _e)), D.m.$a(e, u, "checked", r, !0)));
        }

        var t,
            c,
            s,
            n,
            l,
            f = D.wb(function () {
          return u.has("checkedValue") ? D.a.c(u.get("checkedValue")) : n ? u.has("value") ? D.a.c(u.get("value")) : o.value : void 0;
        }),
            d = "checkbox" == o.type,
            p = "radio" == o.type;
        (d || p) && (t = i(), c = d && D.a.c(t) instanceof Array, s = !(c && t.push && t.splice), n = p || c, l = c ? f() : _e, p && !o.name && D.f.uniqueName.init(o, function () {
          return !0;
        }), D.o(e, null, {
          l: o
        }), D.a.H(o, "click", e), D.o(function () {
          var e = D.a.c(i()),
              t = f();
          c ? (o.checked = 0 <= D.a.A(e, t), l = t) : o.checked = d && t === _e ? !!e : f() === e;
        }, null, {
          l: o
        }), t = _e);
      }
    }, D.m.va.checked = !0, D.f.checkedValue = {
      update: function update(e, t) {
        e.value = D.a.c(t());
      }
    }, D.f["class"] = {
      update: function update(e, t) {
        var n = D.a.Cb(D.a.c(t()));
        D.a.Eb(e, e.__ko__cssValue, !1), e.__ko__cssValue = n, D.a.Eb(e, n, !0);
      }
    }, D.f.css = {
      update: function update(n, e) {
        var t = D.a.c(e());
        null !== t && "object" == _typeof(t) ? D.a.O(t, function (e, t) {
          t = D.a.c(t), D.a.Eb(n, e, t);
        }) : D.f["class"].update(n, e);
      }
    }, D.f.enable = {
      update: function update(e, t) {
        var n = D.a.c(t());
        n && e.disabled ? e.removeAttribute("disabled") : n || e.disabled || (e.disabled = !0);
      }
    }, D.f.disable = {
      update: function update(e, t) {
        D.f.enable.update(e, function () {
          return !D.a.c(t());
        });
      }
    }, D.f.event = {
      init: function init(e, o, i, u, c) {
        var t = o() || {};
        D.a.O(t, function (r) {
          "string" == typeof r && D.a.H(e, r, function (e) {
            var t,
                n = o()[r];

            if (n) {
              try {
                var a = D.a.la(arguments);
                u = c.$data, a.unshift(u), t = n.apply(u, a);
              } finally {
                !0 !== t && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
              }

              !1 === i.get(r + "Bubble") && (e.cancelBubble = !0, e.stopPropagation && e.stopPropagation());
            }
          });
        });
      }
    }, D.f.foreach = {
      Qc: function Qc(n) {
        return function () {
          var e = n(),
              t = D.a.$b(e);
          return t && "number" != typeof t.length ? (D.a.c(e), {
            foreach: t.data,
            as: t.as,
            noChildContext: t.noChildContext,
            includeDestroyed: t.includeDestroyed,
            afterAdd: t.afterAdd,
            beforeRemove: t.beforeRemove,
            afterRender: t.afterRender,
            beforeMove: t.beforeMove,
            afterMove: t.afterMove,
            templateEngine: D.ba.Na
          }) : {
            foreach: e,
            templateEngine: D.ba.Na
          };
        };
      },
      init: function init(e, t) {
        return D.f.template.init(e, D.f.foreach.Qc(t));
      },
      update: function update(e, t, n, a, r) {
        return D.f.template.update(e, D.f.foreach.Qc(t), n, a, r);
      }
    }, D.m.Ra.foreach = !1, D.h.ea.foreach = !0, D.f.hasfocus = {
      init: function init(a, r, o) {
        function e(e) {
          a.__ko_hasfocusUpdating = !0;
          var t,
              n = a.ownerDocument;

          if ("activeElement" in n) {
            try {
              t = n.activeElement;
            } catch (e) {
              t = n.body;
            }

            e = t === a;
          }

          n = r(), D.m.$a(n, o, "hasfocus", e, !0), a.__ko_hasfocusLastValue = e, a.__ko_hasfocusUpdating = !1;
        }

        var t = e.bind(null, !0),
            n = e.bind(null, !1);
        D.a.H(a, "focus", t), D.a.H(a, "focusin", t), D.a.H(a, "blur", n), D.a.H(a, "focusout", n), a.__ko_hasfocusLastValue = !1;
      },
      update: function update(e, t) {
        var n = !!D.a.c(t());
        e.__ko_hasfocusUpdating || e.__ko_hasfocusLastValue === n || (n ? e.focus() : e.blur(), !n && e.__ko_hasfocusLastValue && e.ownerDocument.body.focus(), D.v.K(D.a.Fb, null, [e, n ? "focusin" : "focusout"]));
      }
    }, D.m.va.hasfocus = !0, D.f.hasFocus = D.f.hasfocus, D.m.va.hasFocus = "hasfocus", D.f.html = {
      init: function init() {
        return {
          controlsDescendantBindings: !0
        };
      },
      update: function update(e, t) {
        D.a.dc(e, t());
      }
    }, le("if"), le("ifnot", !1, !0), le("with", !0), D.f["let"] = {
      init: function init(e, t, n, a, r) {
        return t = r.extend(t), D.Pa(t, e), {
          controlsDescendantBindings: !0
        };
      }
    }, D.h.ea["let"] = !0;
    var fe,
        de,
        pe,
        he,
        be,
        ve,
        ge,
        me,
        ye,
        we,
        xe,
        Ce,
        Ee,
        ke,
        Te,
        Ne = {};

    function Se(e, t, n, a) {
      e = D.m.Zb(e);

      for (var r = D.m.Ra, o = 0; o < e.length; o++) {
        var i = e[o].key;

        if (Object.prototype.hasOwnProperty.call(r, i)) {
          var u = r[i];

          if ("function" == typeof u) {
            if (i = u(e[o].value)) throw Error(i);
          } else if (!u) throw Error("This template engine does not support the '" + i + "' binding within its templates");
        }
      }

      return n = "ko.__tr_ambtns(function($context,$element){return(function(){return{ " + D.m.ub(e, {
        valueAccessors: !0
      }) + " } })()},'" + n.toLowerCase() + "')", a.createJavaScriptEvaluatorBlock(n) + t;
    }

    function De(e, t, n, a, r) {
      for (var o, i, u, c, s = Math.min, l = Math.max, f = [], d = e.length, p = t.length, h = p - d || 1, b = d + p + 1, v = 0; v <= d; v++) {
        for (u = i, f.push(i = []), c = s(p, v + h), o = l(0, v - 1); o <= c; o++) {
          i[o] = o ? v ? e[v - 1] === t[o - 1] ? u[o - 1] : s(u[o] || b, i[o - 1] || b) + 1 : o + 1 : v + 1;
        }
      }

      for (s = [], l = [], h = [], v = d, o = p; v || o;) {
        p = f[v][o] - 1, o && p === f[v][o - 1] ? l.push(s[s.length] = {
          status: n,
          value: t[--o],
          index: o
        }) : v && p === f[v - 1][o] ? h.push(s[s.length] = {
          status: a,
          value: e[--v],
          index: v
        }) : (--o, --v, r.sparse || s.push({
          status: "retained",
          value: t[o]
        }));
      }

      return D.a.Jc(h, l, !r.dontLimitMoves && 10 * d), s.reverse();
    }

    D.f.options = {
      init: function init(e) {
        if ("select" !== D.a.P(e)) throw Error("options binding applies only to SELECT elements");

        for (; 0 < e.length;) {
          e.remove(0);
        }

        return {
          controlsDescendantBindings: !0
        };
      },
      update: function update(a, e, r) {
        function t() {
          return D.a.fb(a.options, function (e) {
            return e.selected;
          });
        }

        function o(e, t, n) {
          var a = _typeof(t);

          return "function" == a ? t(e) : "string" == a ? e[t] : n;
        }

        function n(e, t) {
          var n;
          p && s ? D.u.ya(a, D.a.c(r.get("value")), !0) : d.length && (n = 0 <= D.a.A(d, D.u.L(t[0])), D.a.Yc(t[0], n), p && !n && D.v.K(D.a.Fb, null, [a, "change"]));
        }

        var i = a.multiple,
            u = 0 != a.length && i ? a.scrollTop : null,
            c = D.a.c(e()),
            s = r.get("valueAllowUnset") && r.has("value"),
            l = r.get("optionsIncludeDestroyed");
        e = {};
        var f,
            d = [];
        s || (i ? d = D.a.Mb(t(), D.u.L) : 0 <= a.selectedIndex && d.push(D.u.L(a.options[a.selectedIndex]))), c && (void 0 === c.length && (c = [c]), f = D.a.fb(c, function (e) {
          return l || e === _e || null === e || !D.a.c(e._destroy);
        }), !r.has("optionsCaption") || null !== (c = D.a.c(r.get("optionsCaption"))) && c !== _e && f.unshift(Ne));
        var p = !1;
        e.beforeRemove = function (e) {
          a.removeChild(e);
        }, c = n, r.has("optionsAfterRender") && "function" == typeof r.get("optionsAfterRender") && (c = function c(e, t) {
          n(0, t), D.v.K(r.get("optionsAfterRender"), null, [t[0], e !== Ne ? e : _e]);
        }), D.a.cc(a, f, function (e, t, n) {
          return n.length && (d = !s && n[0].selected ? [D.u.L(n[0])] : [], p = !0), t = a.ownerDocument.createElement("option"), e === Ne ? (D.a.Ab(t, r.get("optionsCaption")), D.u.ya(t, _e)) : (n = o(e, r.get("optionsValue"), e), D.u.ya(t, D.a.c(n)), e = o(e, r.get("optionsText"), n), D.a.Ab(t, e)), [t];
        }, e, c), D.v.K(function () {
          s ? D.u.ya(a, D.a.c(r.get("value")), !0) : (i ? d.length && t().length < d.length : d.length && 0 <= a.selectedIndex ? D.u.L(a.options[a.selectedIndex]) !== d[0] : d.length || 0 <= a.selectedIndex) && D.a.Fb(a, "change");
        }), D.a.vd(a), u && 20 < Math.abs(u - a.scrollTop) && (a.scrollTop = u);
      }
    }, D.f.options.Yb = D.a.g.Z(), D.f.selectedOptions = {
      after: ["options", "foreach"],
      init: function init(n, a, r) {
        D.a.H(n, "change", function () {
          var e = a(),
              t = [];
          D.a.C(n.getElementsByTagName("option"), function (e) {
            e.selected && t.push(D.u.L(e));
          }), D.m.$a(e, r, "selectedOptions", t);
        });
      },
      update: function update(e, t) {
        if ("select" != D.a.P(e)) throw Error("values binding applies only to SELECT elements");
        var n = D.a.c(t()),
            a = e.scrollTop;
        n && "number" == typeof n.length && D.a.C(e.getElementsByTagName("option"), function (e) {
          var t = 0 <= D.a.A(n, D.u.L(e));
          e.selected != t && D.a.Yc(e, t);
        }), e.scrollTop = a;
      }
    }, D.m.va.selectedOptions = !0, D.f.style = {
      update: function update(a, e) {
        var t = D.a.c(e() || {});
        D.a.O(t, function (e, t) {
          var n;
          null !== (t = D.a.c(t)) && t !== _e && !1 !== t || (t = ""), Oe ? Oe(a).css(e, t) : /^--/.test(e) ? a.style.setProperty(e, t) : (e = e.replace(/-(\w)/g, function (e, t) {
            return t.toUpperCase();
          }), n = a.style[e], (a.style[e] = t) === n || a.style[e] != n || isNaN(t) || (a.style[e] = t + "px"));
        });
      }
    }, D.f.submit = {
      init: function init(a, r, e, t, o) {
        if ("function" != typeof r()) throw Error("The value for a submit binding must be a function");
        D.a.H(a, "submit", function (e) {
          var t,
              n = r();

          try {
            t = n.call(o.$data, a);
          } finally {
            !0 !== t && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
          }
        });
      }
    }, D.f.text = {
      init: function init() {
        return {
          controlsDescendantBindings: !0
        };
      },
      update: function update(e, t) {
        D.a.Ab(e, t());
      }
    }, D.h.ea.text = !0, Ae && Ae.navigator && (fe = function fe(e) {
      if (e) return parseFloat(e[1]);
    }, de = Ae.navigator.userAgent, (pe = Ae.opera && Ae.opera.version && parseInt(Ae.opera.version())) || (ge = fe(de.match(/Edge\/([^ ]+)$/))) || fe(de.match(/Chrome\/([^ ]+)/)) || (he = fe(de.match(/Version\/([^ ]+) Safari/))) || (be = fe(de.match(/Firefox\/([^ ]+)/))) || (ve = D.a.W || fe(de.match(/MSIE ([^ ]+)/))) || (ve = fe(de.match(/rv:([^ )]+)/)))), 8 <= ve && ve < 10 && (me = D.a.g.Z(), ye = D.a.g.Z(), we = function we(e) {
      var t = this.activeElement;
      (t = t && D.a.g.get(t, ye)) && t(e);
    }, xe = function xe(e, t) {
      var n = e.ownerDocument;
      D.a.g.get(n, me) || (D.a.g.set(n, me, !0), D.a.H(n, "selectionchange", we)), D.a.g.set(e, ye, t);
    }), D.f.textInput = {
      init: function init(n, a, t) {
        function e(e, t) {
          D.a.H(n, e, t);
        }

        function r() {
          i || (u = n.value, i = D.a.setTimeout(o, 4));
        }

        function o() {
          clearTimeout(i), u = i = _e;
          var e = n.value;
          c !== e && (c = e, D.m.$a(a(), t, "textInput", e));
        }

        var i,
            u,
            c = n.value,
            s = 9 == D.a.W ? r : o,
            l = !1;
        ve && e("keypress", o), ve < 11 && e("propertychange", function (e) {
          l || "value" !== e.propertyName || s(e);
        }), 8 == ve && (e("keyup", o), e("keydown", o)), xe && (xe(n, s), e("dragend", r)), (!ve || 9 <= ve) && e("input", s), he < 5 && "textarea" === D.a.P(n) ? (e("keydown", r), e("paste", r), e("cut", r)) : pe < 11 ? e("keydown", r) : be < 4 ? (e("DOMAutoComplete", o), e("dragdrop", o), e("drop", o)) : ge && "number" === n.type && e("keydown", r), e("change", o), e("blur", o), D.o(function e() {
          var t = D.a.c(a());
          null !== t && t !== _e || (t = ""), u !== _e && t === u ? D.a.setTimeout(e, 4) : n.value !== t && (l = !0, n.value = t, l = !1, c = n.value);
        }, null, {
          l: n
        });
      }
    }, D.m.va.textInput = !0, D.f.textinput = {
      preprocess: function preprocess(e, t, n) {
        n("textInput", e);
      }
    }, D.f.uniqueName = {
      init: function init(e, t) {
        var n;
        t() && (n = "ko_unique_" + ++D.f.uniqueName.qd, D.a.Xc(e, n));
      }
    }, D.f.uniqueName.qd = 0, D.f.using = {
      init: function init(e, t, n, a, r) {
        var o;
        return n.has("as") && (o = {
          as: n.get("as"),
          noChildContext: n.get("noChildContext")
        }), t = r.createChildContext(t, o), D.Pa(t, e), {
          controlsDescendantBindings: !0
        };
      }
    }, D.h.ea.using = !0, D.f.value = {
      after: ["options", "foreach"],
      init: function init(n, a, r) {
        var e,
            t,
            o,
            i,
            u,
            c,
            s = D.a.P(n),
            l = "input" == s;
        !l || "checkbox" != n.type && "radio" != n.type ? (e = ["change"], t = r.get("valueUpdate"), o = !1, i = null, t && ("string" == typeof t && (t = [t]), D.a.gb(e, t), e = D.a.vc(e)), u = function u() {
          i = null, o = !1;
          var e = a(),
              t = D.u.L(n);
          D.m.$a(e, r, "value", t);
        }, !D.a.W || !l || "text" != n.type || "off" == n.autocomplete || n.form && "off" == n.form.autocomplete || -1 != D.a.A(e, "propertychange") || (D.a.H(n, "propertychange", function () {
          o = !0;
        }), D.a.H(n, "focus", function () {
          o = !1;
        }), D.a.H(n, "blur", function () {
          o && u();
        })), D.a.C(e, function (e) {
          var t = u;
          D.a.Td(e, "after") && (t = function t() {
            i = D.u.L(n), D.a.setTimeout(u, 0);
          }, e = e.substring(5)), D.a.H(n, e, t);
        }), c = l && "file" == n.type ? function () {
          var e = D.a.c(a());
          null === e || e === _e || "" === e ? n.value = "" : D.v.K(u);
        } : function () {
          var e = D.a.c(a()),
              t = D.u.L(n);
          null !== i && e === i ? D.a.setTimeout(c, 0) : e === t && t !== _e || ("select" === s ? (t = r.get("valueAllowUnset"), D.u.ya(n, e, t), t || e === D.u.L(n) || D.v.K(u)) : D.u.ya(n, e));
        }, D.o(c, null, {
          l: n
        })) : D.eb(n, {
          checkedValue: a
        });
      },
      update: function update() {}
    }, D.m.va.value = !0, D.f.visible = {
      update: function update(e, t) {
        var n = D.a.c(t()),
            a = "none" != e.style.display;
        n && !a ? e.style.display = "" : !n && a && (e.style.display = "none");
      }
    }, D.f.hidden = {
      update: function update(e, t) {
        D.f.visible.update(e, function () {
          return !D.a.c(t());
        });
      }
    }, D.f.click = {
      init: function init(e, t, n, a, r) {
        return D.f.event.init.call(this, e, function () {
          var e = {};
          return e.click = t(), e;
        }, n, a, r);
      }
    }, D.ca = function () {}, D.ca.prototype.renderTemplateSource = function () {
      throw Error("Override renderTemplateSource");
    }, D.ca.prototype.createJavaScriptEvaluatorBlock = function () {
      throw Error("Override createJavaScriptEvaluatorBlock");
    }, D.ca.prototype.makeTemplateSource = function (e, t) {
      if ("string" == typeof e) {
        var n = (t = t || Be).getElementById(e);
        if (!n) throw Error("Cannot find template with ID " + e);
        return new D.B.D(n);
      }

      if (1 == e.nodeType || 8 == e.nodeType) return new D.B.ia(e);
      throw Error("Unknown template type: " + e);
    }, D.ca.prototype.renderTemplate = function (e, t, n, a) {
      return e = this.makeTemplateSource(e, a), this.renderTemplateSource(e, t, n, a);
    }, D.ca.prototype.isTemplateRewritten = function (e, t) {
      return !1 === this.allowTemplateRewriting || this.makeTemplateSource(e, t).data("isRewritten");
    }, D.ca.prototype.rewriteTemplate = function (e, t, n) {
      t = t((e = this.makeTemplateSource(e, n)).text()), e.text(t), e.data("isRewritten", !0);
    }, D.b("templateEngine", D.ca), D.ic = (Ce = /(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'|[^>]*))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi, Ee = /\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g, {
      wd: function wd(e, t, n) {
        t.isTemplateRewritten(e, n) || t.rewriteTemplate(e, function (e) {
          return D.ic.Kd(e, t);
        }, n);
      },
      Kd: function Kd(e, o) {
        return e.replace(Ce, function (e, t, n, a, r) {
          return Se(r, t, n, o);
        }).replace(Ee, function (e, t) {
          return Se(t, "\x3c!-- ko --\x3e", "#comment", o);
        });
      },
      ld: function ld(a, r) {
        return D.aa.Wb(function (e, t) {
          var n = e.nextSibling;
          n && n.nodeName.toLowerCase() === r && D.eb(n, a, t);
        });
      }
    }), D.b("__tr_ambtns", D.ic.ld), function () {
      D.B = {}, D.B.D = function (e) {
        var t;
        (this.D = e) && (t = D.a.P(e), this.Db = "script" === t ? 1 : "textarea" === t ? 2 : "template" == t && e.content && 11 === e.content.nodeType ? 3 : 4);
      }, D.B.D.prototype.text = function () {
        var e = 1 === this.Db ? "text" : 2 === this.Db ? "value" : "innerHTML";
        if (0 == arguments.length) return this.D[e];
        var t = arguments[0];
        "innerHTML" == e ? D.a.dc(this.D, t) : this.D[e] = t;
      };
      var t = D.a.g.Z() + "_";

      D.B.D.prototype.data = function (e) {
        if (1 === arguments.length) return D.a.g.get(this.D, t + e);
        D.a.g.set(this.D, t + e, arguments[1]);
      };

      var a = D.a.g.Z();
      D.B.D.prototype.nodes = function () {
        var e = this.D;

        if (0 == arguments.length) {
          var t = D.a.g.get(e, a) || {},
              n = t.jb || (3 === this.Db ? e.content : 4 === this.Db ? e : _e);
          return n && !t.hd || (t = this.text()) && (n = D.a.Ld(t, e.ownerDocument), this.text(""), D.a.g.set(e, a, {
            jb: n,
            hd: !0
          })), n;
        }

        D.a.g.set(e, a, {
          jb: arguments[0]
        });
      }, D.B.ia = function (e) {
        this.D = e;
      }, D.B.ia.prototype = new D.B.D(), D.B.ia.prototype.constructor = D.B.ia, D.B.ia.prototype.text = function () {
        if (0 == arguments.length) {
          var e = D.a.g.get(this.D, a) || {};
          return e.jc === _e && e.jb && (e.jc = e.jb.innerHTML), e.jc;
        }

        D.a.g.set(this.D, a, {
          jc: arguments[0]
        });
      }, D.b("templateSources", D.B), D.b("templateSources.domElement", D.B.D), D.b("templateSources.anonymousTemplate", D.B.ia);
    }(), function () {
      function a(e, t, n) {
        var a;

        for (t = D.h.nextSibling(t); e && (a = e) !== t;) {
          n(a, e = D.h.nextSibling(a));
        }
      }

      function d(e, t) {
        if (e.length) {
          var r = e[0],
              o = e[e.length - 1],
              n = r.parentNode,
              i = D.ga.instance,
              u = i.preprocessNode;

          if (u) {
            if (a(r, o, function (e, t) {
              var n = e.previousSibling,
                  a = u.call(i, e);
              a && (e === r && (r = a[0] || t), e === o && (o = a[a.length - 1] || n));
            }), e.length = 0, !r) return;
            r === o ? e.push(r) : (e.push(r, o), D.a.Ua(e, n));
          }

          a(r, o, function (e) {
            1 !== e.nodeType && 8 !== e.nodeType || D.uc(t, e);
          }), a(r, o, function (e) {
            1 !== e.nodeType && 8 !== e.nodeType || D.aa.bd(e, [t]);
          }), D.a.Ua(e, n);
        }
      }

      function c(e) {
        return e.nodeType ? e : 0 < e.length ? e[0] : null;
      }

      function p(e, t, n, a, r) {
        r = r || {};
        var o = (e && c(e) || n || {}).ownerDocument,
            i = r.templateEngine || s;
        if (D.ic.wd(n, i, o), "number" != typeof (n = i.renderTemplate(n, a, r, o)).length || 0 < n.length && "number" != typeof n[0].nodeType) throw Error("Template engine must return an array of DOM nodes");

        switch (o = !1, t) {
          case "replaceChildren":
            D.h.ua(e, n), o = !0;
            break;

          case "replaceNode":
            D.a.Wc(e, n), o = !0;
            break;

          case "ignoreTargetNode":
            break;

          default:
            throw Error("Unknown renderMode: " + t);
        }

        return o && (d(n, a), r.afterRender && D.v.K(r.afterRender, null, [n, a[r.as || "$data"]]), "replaceChildren" == t && D.j.Ga(e, D.j.T)), n;
      }

      function h(e, t, n) {
        return D.N(e) ? e() : "function" == typeof e ? e(t, n) : e;
      }

      var s;
      D.ec = function (e) {
        if (e != _e && !(e instanceof D.ca)) throw Error("templateEngine must inherit from ko.templateEngine");
        s = e;
      }, D.bc = function (n, a, r, o, i) {
        if (((r = r || {}).templateEngine || s) == _e) throw Error("Set a template engine before calling renderTemplate");

        if (i = i || "replaceChildren", o) {
          var u = c(o);
          return D.$(function () {
            var e = a && a instanceof D.fa ? a : new D.fa(a, null, null, null, {
              exportDependencies: !0
            }),
                t = h(n, e.$data, e),
                e = p(o, i, t, e, r);
            "replaceNode" == i && (u = c(o = e));
          }, null, {
            Sa: function Sa() {
              return !u || !D.a.Rb(u);
            },
            l: u && "replaceNode" == i ? u.parentNode : u
          });
        }

        return D.aa.Wb(function (e) {
          D.bc(n, a, r, e, "replaceNode");
        });
      }, D.Pd = function (a, t, r, o, i) {
        function n(e, t) {
          D.v.K(D.a.cc, null, [o, e, c, r, u, t]), D.j.Ga(o, D.j.T);
        }

        function u(e, t) {
          d(t, s), r.afterRender && r.afterRender(t, e), s = null;
        }

        function c(e, t) {
          s = i.createChildContext(e, {
            as: l,
            noChildContext: r.noChildContext,
            extend: function extend(e) {
              e.$index = t, l && (e[l + "Index"] = t);
            }
          });
          var n = h(a, e, s);
          return p(o, "ignoreTargetNode", n, s, r);
        }

        var s,
            l = r.as,
            f = !1 === r.includeDestroyed || D.options.foreachHidesDestroyed && !r.includeDestroyed;
        if (f || r.beforeRemove || !D.Oc(t)) return D.$(function () {
          var e = D.a.c(t) || [];
          void 0 === e.length && (e = [e]), f && (e = D.a.fb(e, function (e) {
            return e === _e || null === e || !D.a.c(e._destroy);
          })), n(e);
        }, null, {
          l: o
        });
        n(t.w());
        var e = t.subscribe(function (e) {
          n(t(), e);
        }, null, "arrayChange");
        return e.l(o), e;
      };
      var i = D.a.g.Z(),
          r = D.a.g.Z();
      D.f.template = {
        init: function init(e, t) {
          var n = D.a.c(t());
          if ("string" == typeof n || n.name) D.h.Ea(e);else if ("nodes" in n) {
            if (n = n.nodes || [], D.N(n)) throw Error('The "nodes" option must be a plain, non-observable array.');
            var a = n[0] && n[0].parentNode;
            a && D.a.g.get(a, r) || (a = D.a.Xb(n), D.a.g.set(a, r, !0)), new D.B.ia(e).nodes(a);
          } else {
            if (!(0 < (n = D.h.childNodes(e)).length)) throw Error("Anonymous template defined, but no template content was provided");
            a = D.a.Xb(n), new D.B.ia(e).nodes(a);
          }
          return {
            controlsDescendantBindings: !0
          };
        },
        update: function update(e, t, n, a, r) {
          var o = t();
          n = !0, a = null, "string" == typeof (t = D.a.c(o)) ? t = {} : (o = t.name, "if" in t && (n = D.a.c(t["if"])), n && "ifnot" in t && (n = !D.a.c(t.ifnot))), "foreach" in t ? a = D.Pd(o || e, n && t.foreach || [], t, e, r) : n ? (n = r, "data" in t && (n = r.createChildContext(t.data, {
            as: t.as,
            noChildContext: t.noChildContext,
            exportDependencies: !0
          })), a = D.bc(o || e, n, t, e)) : D.h.Ea(e), r = a, (t = D.a.g.get(e, i)) && "function" == typeof t.s && t.s(), D.a.g.set(e, i, !r || r.ja && !r.ja() ? _e : r);
        }
      }, D.m.Ra.template = function (e) {
        return 1 == (e = D.m.Zb(e)).length && e[0].unknown || D.m.Hd(e, "name") ? null : "This template engine does not support anonymous templates nested within its templates";
      }, D.h.ea.template = !0;
    }(), D.b("setTemplateEngine", D.ec), D.b("renderTemplate", D.bc), D.a.Jc = function (e, t, n) {
      if (e.length && t.length) for (var a, r, o, i, u = a = 0; (!n || u < n) && (o = e[a]); ++a) {
        for (r = 0; i = t[r]; ++r) {
          if (o.value === i.value) {
            o.moved = i.index, i.moved = o.index, t.splice(r, 1), u = r = 0;
            break;
          }
        }

        u += r;
      }
    }, D.a.Ob = function (e, t, n) {
      return n = "boolean" == typeof n ? {
        dontLimitMoves: n
      } : n || {}, (e = e || []).length < (t = t || []).length ? De(e, t, "added", "deleted", n) : De(t, e, "deleted", "added", n);
    }, D.b("utils.compareArrays", D.a.Ob), ke = D.a.g.Z(), Te = D.a.g.Z(), D.a.cc = function (t, e, n, a, r, o) {
      function i(e) {
        s = {
          Aa: e,
          nb: D.sa(g++)
        }, b.push(s), h || C.push(s);
      }

      function u(e) {
        s = p[e], g !== s.nb.w() && x.push(s), s.nb(g++), D.a.Ua(s.Y, t), b.push(s);
      }

      function c(t, n) {
        if (t) for (var a = 0, e = n.length; a < e; a++) {
          D.a.C(n[a].Y, function (e) {
            t(e, a, n[a].Aa);
          });
        }
      }

      void 0 === (e = e || []).length && (e = [e]), a = a || {};
      var s,
          l,
          f,
          d,
          p = D.a.g.get(t, ke),
          h = !p,
          b = [],
          v = 0,
          g = 0,
          m = [],
          y = [],
          w = [],
          x = [],
          C = [],
          E = 0;
      if (h) D.a.C(e, i);else {
        (!o || p && p._countWaitingForRemove) && (S = D.a.Mb(p, function (e) {
          return e.Aa;
        }), o = D.a.Ob(S, e, {
          dontLimitMoves: a.dontLimitMoves,
          sparse: !0
        }));

        for (var k, T, N, S = 0; k = o[S]; S++) {
          switch (T = k.moved, N = k.index, k.status) {
            case "deleted":
              for (; v < N;) {
                u(v++);
              }

              T === _e && ((s = p[v]).$ && (s.$.s(), s.$ = _e), D.a.Ua(s.Y, t).length && (a.beforeRemove && (b.push(s), E++, s.Aa === Te ? s = null : w.push(s)), s && m.push.apply(m, s.Y))), v++;
              break;

            case "added":
              for (; g < N;) {
                u(v++);
              }

              T !== _e ? (y.push(b.length), u(T)) : i(k.value);
          }
        }

        for (; g < e.length;) {
          u(v++);
        }

        b._countWaitingForRemove = E;
      }
      D.a.g.set(t, ke, b), c(a.beforeMove, x), D.a.C(m, a.beforeRemove ? D.na : D.removeNode);

      try {
        d = t.ownerDocument.activeElement;
      } catch (e) {}

      if (y.length) for (; (S = y.shift()) != _e;) {
        for (s = b[S], l = _e; S;) {
          if ((f = b[--S].Y) && f.length) {
            l = f[f.length - 1];
            break;
          }
        }

        for (e = 0; v = s.Y[e]; l = v, e++) {
          D.h.Vb(t, v, l);
        }
      }

      for (S = 0, y = D.h.firstChild(t); s = b[S]; S++) {
        for (s.Y || D.a.extend(s, function (t, n, a, r, o) {
          var i = [],
              e = D.$(function () {
            var e = n(a, o, D.a.Ua(i, t)) || [];
            0 < i.length && (D.a.Wc(i, e), r && D.v.K(r, null, [a, e, o])), i.length = 0, D.a.gb(i, e);
          }, null, {
            l: t,
            Sa: function Sa() {
              return !D.a.jd(i);
            }
          });
          return {
            Y: i,
            $: e.ja() ? e : _e
          };
        }(t, n, s.Aa, r, s.nb)), e = 0; v = s.Y[e]; y = v.nextSibling, l = v, e++) {
          v !== y && D.h.Vb(t, v, l);
        }

        !s.Dd && r && (r(s.Aa, s.Y, s.nb), s.Dd = !0, l = s.Y[s.Y.length - 1]);
      }

      for (d && t.ownerDocument.activeElement != d && d.focus(), c(a.beforeRemove, w), S = 0; S < w.length; ++S) {
        w[S].Aa = Te;
      }

      c(a.afterMove, x), c(a.afterAdd, C);
    }, D.b("utils.setDomNodeChildrenFromArrayMapping", D.a.cc), D.ba = function () {
      this.allowTemplateRewriting = !1;
    }, D.ba.prototype = new D.ca(), D.ba.prototype.constructor = D.ba, D.ba.prototype.renderTemplateSource = function (e, t, n, a) {
      return (t = D.a.W < 9 || !e.nodes ? null : e.nodes()) ? D.a.la(t.cloneNode(!0).childNodes) : (e = e.text(), D.a.ta(e, a));
    }, D.ba.Na = new D.ba(), D.ec(D.ba.Na), D.b("nativeTemplateEngine", D.ba), function () {
      D.Za = function () {
        var o = this.Gd = function () {
          if (!Oe || !Oe.tmpl) return 0;

          try {
            if (0 <= Oe.tmpl.tag.tmpl.open.toString().indexOf("__")) return 2;
          } catch (e) {}

          return 1;
        }();

        this.renderTemplateSource = function (e, t, n, a) {
          if (a = a || Be, n = n || {}, o < 2) throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");
          var r = e.data("precompiled");
          return r || (r = e.text() || "", r = Oe.template(null, "{{ko_with $item.koBindingContext}}" + r + "{{/ko_with}}"), e.data("precompiled", r)), e = [t.$data], t = Oe.extend({
            koBindingContext: t
          }, n.templateOptions), (t = Oe.tmpl(r, e, t)).appendTo(a.createElement("div")), Oe.fragments = {}, t;
        }, this.createJavaScriptEvaluatorBlock = function (e) {
          return "{{ko_code ((function() { return " + e + " })()) }}";
        }, this.addTemplate = function (e, t) {
          Be.write("<script type='text/html' id='" + e + "'>" + t + "<\/script>");
        }, 0 < o && (Oe.tmpl.tag.ko_code = {
          open: "__.push($1 || '');"
        }, Oe.tmpl.tag.ko_with = {
          open: "with($1) {",
          close: "} "
        });
      }, D.Za.prototype = new D.ca(), D.Za.prototype.constructor = D.Za;
      var e = new D.Za();
      0 < e.Gd && D.ec(e), D.b("jqueryTmplTemplateEngine", D.Za);
    }();
  }, "function" == typeof define && define.amd ? define(["exports", "require"], e) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? e(module.exports || exports) : e(Ae.ko = {});
}();