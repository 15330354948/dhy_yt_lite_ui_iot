"use strict";

define(function () {
  if (!function (e) {
    "use strict";

    function C(e, r) {
      var t = new Error(e + " at character " + r);
      throw t.index = r, t.description = e, t;
    }

    function r(e) {
      var r,
          t = 0;

      for (var n in e) {
        (r = n.length) > t && e.hasOwnProperty(n) && (t = r);
      }

      return t;
    }

    function w(e) {
      return L[e] || 0;
    }

    function O(e, r, t) {
      return {
        type: "||" === e || "&&" === e ? "LogicalExpression" : "BinaryExpression",
        operator: e,
        left: r,
        right: t
      };
    }

    function U(e) {
      return 48 <= e && e <= 57;
    }

    function j(e) {
      return 36 === e || 95 === e || 65 <= e && e <= 90 || 97 <= e && e <= 122 || 128 <= e && !L[String.fromCharCode(e)];
    }

    function t(o) {
      for (var e, r, s = 0, t = o.charAt, n = o.charCodeAt, i = function i(e) {
        return t.call(o, e);
      }, u = function u(e) {
        return n.call(o, e);
      }, a = o.length, p = function p() {
        for (var e = u(s); 32 === e || 9 === e;) {
          e = u(++s);
        }
      }, f = function f() {
        var e,
            r,
            t = l();
        return p(), 63 !== u(s) ? t : (s++, (e = f()) || C("Expected expression", s), p(), 58 === u(s) ? (s++, (r = f()) || C("Expected expression", s), {
          type: "ConditionalExpression",
          test: t,
          consequent: e,
          alternate: r
        }) : void C("Expected :", s));
      }, c = function c() {
        p();

        for (var e = o.substr(s, M), r = e.length; 0 < r;) {
          if (L.hasOwnProperty(e)) return s += r, e;
          e = e.substr(0, --r);
        }

        return !1;
      }, l = function l() {
        var e,
            r,
            t,
            n,
            o,
            i,
            u = d(),
            a = c();
        if (!a) return u;

        for (n = {
          value: a,
          prec: w(a)
        }, (o = d()) || C("Expected expression after " + a, s), t = [u, n, o]; (a = c()) && 0 !== (r = w(a));) {
          for (n = {
            value: a,
            prec: r
          }; 2 < t.length && r <= t[t.length - 2].prec;) {
            o = t.pop(), a = t.pop().value, u = t.pop(), e = O(a, u, o), t.push(e);
          }

          (e = d()) || C("Expected expression after " + a, s), t.push(n, e);
        }

        for (e = t[i = t.length - 1]; 1 < i;) {
          e = O(t[i - 1].value, t[i - 2], e), i -= 2;
        }

        return e;
      }, d = function d() {
        var e, r, t;
        if (p(), e = u(s), U(e) || 46 === e) return h();
        if (39 === e || 34 === e) return v();
        if (j(e) || 40 === e) return m();
        if (91 === e) return g();

        for (t = (r = o.substr(s, B)).length; 0 < t;) {
          if (S.hasOwnProperty(r)) return s += t, {
            type: "UnaryExpression",
            operator: r,
            argument: d(),
            prefix: !0
          };
          r = r.substr(0, --t);
        }

        return !1;
      }, h = function h() {
        for (var e, r, t = ""; U(u(s));) {
          t += i(s++);
        }

        if (46 === u(s)) for (t += i(s++); U(u(s));) {
          t += i(s++);
        }

        if ("e" === (e = i(s)) || "E" === e) {
          for (t += i(s++), "+" !== (e = i(s)) && "-" !== e || (t += i(s++)); U(u(s));) {
            t += i(s++);
          }

          U(u(s - 1)) || C("Expected exponent (" + t + i(s) + ")", s);
        }

        return r = u(s), j(r) ? C("Variable names cannot start with a number (" + t + i(s) + ")", s) : 46 === r && C("Unexpected period", s), {
          type: P,
          value: parseFloat(t),
          raw: t
        };
      }, v = function v() {
        for (var e, r = "", t = i(s++), n = !1; s < a;) {
          if ((e = i(s++)) === t) {
            n = !0;
            break;
          }

          if ("\\" === e) switch (e = i(s++)) {
            case "n":
              r += "\n";
              break;

            case "r":
              r += "\r";
              break;

            case "t":
              r += "\t";
              break;

            case "b":
              r += "\b";
              break;

            case "f":
              r += "\f";
              break;

            case "v":
              r += "\v";
              break;

            default:
              r += "\\" + e;
          } else r += e;
        }

        return n || C('Unclosed quote after "' + r + '"', s), {
          type: P,
          value: r,
          raw: t + r + t
        };
      }, x = function x() {
        var e,
            r,
            t = u(s),
            n = s;

        for (j(t) ? s++ : C("Unexpected " + i(s), s); s < a && (t = u(s), 36 === (r = t) || 95 === r || 65 <= r && r <= 90 || 97 <= r && r <= 122 || 48 <= r && r <= 57 || 128 <= r && !L[String.fromCharCode(r)]);) {
          s++;
        }

        return e = o.slice(n, s), q.hasOwnProperty(e) ? {
          type: P,
          value: q[e],
          raw: e
        } : "this" === e ? {
          type: "ThisExpression"
        } : {
          type: "Identifier",
          name: e
        };
      }, y = function y(e) {
        for (var r, t, n = [], o = !1; s < a;) {
          if (p(), (r = u(s)) === e) {
            o = !0, s++;
            break;
          }

          44 === r ? s++ : ((t = f()) && t.type !== k || C("Expected comma", s), n.push(t));
        }

        return o || C("Expected " + String.fromCharCode(e), s), n;
      }, m = function m() {
        var e = u(s),
            r = (40 === e ? b : x)();

        for (p(), e = u(s); 46 === e || 91 === e || 40 === e;) {
          s++, 46 === e ? (p(), r = {
            type: A,
            computed: !1,
            object: r,
            property: x()
          }) : 91 === e ? (r = {
            type: A,
            computed: !0,
            object: r,
            property: f()
          }, p(), 93 !== (e = u(s)) && C("Unclosed [", s), s++) : 40 === e && (r = {
            type: "CallExpression",
            arguments: y(41),
            callee: r
          }), p(), e = u(s);
        }

        return r;
      }, b = function b() {
        s++;
        var e = f();
        if (p(), 41 === u(s)) return s++, e;
        C("Unclosed (", s);
      }, g = function g() {
        return s++, {
          type: "ArrayExpression",
          elements: y(93)
        };
      }, E = []; s < a;) {
        59 === (e = u(s)) || 44 === e ? s++ : (r = f()) ? E.push(r) : s < a && C('Unexpected "' + i(s) + '"', s);
      }

      return 1 === E.length ? E[0] : {
        type: k,
        body: E
      };
    }

    var n,
        k = "Compound",
        A = "MemberExpression",
        P = "Literal",
        S = {
      "-": !0,
      "!": !0,
      "~": !0,
      "+": !0
    },
        L = {
      "||": 1,
      "&&": 2,
      "|": 3,
      "^": 4,
      "&": 5,
      "==": 6,
      "!=": 6,
      "===": 6,
      "!==": 6,
      "<": 7,
      ">": 7,
      "<=": 7,
      ">=": 7,
      "<<": 8,
      ">>": 8,
      ">>>": 8,
      "+": 9,
      "-": 9,
      "*": 10,
      "/": 10,
      "%": 10
    },
        B = r(S),
        M = r(L),
        q = {
      "true": !0,
      "false": !1,
      "null": null
    };
    t.version = "0.3.1", t.toString = function () {
      return "JavaScript Expression Parser (JSEP) v" + t.version;
    }, t.addUnaryOp = function (e) {
      return B = Math.max(e.length, B), S[e] = !0, this;
    }, t.addBinaryOp = function (e, r) {
      return M = Math.max(e.length, M), L[e] = r, this;
    }, t.addLiteral = function (e, r) {
      return q[e] = r, this;
    }, t.removeUnaryOp = function (e) {
      return delete S[e], e.length === B && (B = r(S)), this;
    }, t.removeAllUnaryOps = function () {
      return S = {}, B = 0, this;
    }, t.removeBinaryOp = function (e) {
      return delete L[e], e.length === M && (M = r(L)), this;
    }, t.removeAllBinaryOps = function () {
      return L = {}, M = 0, this;
    }, t.removeLiteral = function (e) {
      return delete q[e], this;
    }, t.removeAllLiterals = function () {
      return q = {}, this;
    }, "undefined" == typeof exports ? (n = e.jsep, (e.jsep = t).noConflict = function () {
      return e.jsep === t && (e.jsep = n), t;
    }) : "undefined" != typeof module && module.exports ? exports = module.exports = t : exports.parse = t;
  }(this), "undefined" != typeof jsep) return jsep.noConflict();
});