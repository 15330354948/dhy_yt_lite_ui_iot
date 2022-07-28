"use strict";

define(function () {
  return function () {
    function w(e, r, t, n) {
      t = t || " ";
      var a = e.length >= r ? "" : Array(1 + r - e.length >>> 0).join(t);
      return n ? e + a : a + e;
    }

    function E(e, r, t, n, a, c) {
      var i = n - e.length;
      return 0 < i && (e = t || !a ? w(e, n, c, t) : e.slice(0, r.length) + w("", i, "0", !0) + e.slice(r.length)), e;
    }

    function F(e, r, t, n, a, c, i) {
      var s = e >>> 0;
      return e = (t = t && s && {
        2: "0b",
        8: "0",
        16: "0x"
      }[r] || "") + w(s.toString(r), c || 0, "0", !1), E(e, t, n, a, i);
    }

    function k(e, r, t, n, a, c) {
      return null != n && (e = e.slice(0, n)), E(e, "", r, t, a, c);
    }

    var m = arguments,
        A = 0;
    return m[A++].replace(/%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g, function (e, r, t, n, a, c, i) {
      var s, u, o, f, d;
      if ("%%" == e) return "%";

      for (var h = !1, l = "", g = !1, b = !1, x = " ", p = t.length, v = 0; t && v < p; v++) {
        switch (t.charAt(v)) {
          case " ":
            l = " ";
            break;

          case "+":
            l = "+";
            break;

          case "-":
            h = !0;
            break;

          case "'":
            x = t.charAt(v + 1);
            break;

          case "0":
            g = !0;
            break;

          case "#":
            b = !0;
        }
      }

      if ((n = n ? "*" == n ? +m[A++] : "*" == n.charAt(0) ? +m[n.slice(1, -1)] : +n : 0) < 0 && (n = -n, h = !0), !isFinite(n)) throw new Error("sprintf: (minimum-)width must be finite");

      switch (c = c ? "*" == c ? +m[A++] : "*" == c.charAt(0) ? +m[c.slice(1, -1)] : +c : -1 < "fFeE".indexOf(i) ? 6 : "d" == i ? 0 : void 0, d = r ? m[r.slice(0, -1)] : m[A++], i) {
        case "s":
          return k(String(d), h, n, c, g, x);

        case "c":
          return k(String.fromCharCode(+d), h, n, c, g);

        case "b":
          return F(d, 2, b, h, n, c, g);

        case "o":
          return F(d, 8, b, h, n, c, g);

        case "x":
          return F(d, 16, b, h, n, c, g);

        case "X":
          return F(d, 16, b, h, n, c, g).toUpperCase();

        case "u":
          return F(d, 10, b, h, n, c, g);

        case "i":
        case "d":
          return s = +d || 0, d = (u = (s = Math.round(s - s % 1)) < 0 ? "-" : l) + w(String(Math.abs(s)), c, "0", !1), E(d, u, h, n, g);

        case "e":
        case "E":
        case "f":
        case "F":
        case "g":
        case "G":
          return u = (s = +d) < 0 ? "-" : l, o = ["toExponential", "toFixed", "toPrecision"]["efg".indexOf(i.toLowerCase())], f = ["toString", "toUpperCase"]["eEfFgG".indexOf(i) % 2], d = u + Math.abs(s)[o](c), E(d, u, h, n, g)[f]();

        default:
          return e;
      }
    });
  };
});