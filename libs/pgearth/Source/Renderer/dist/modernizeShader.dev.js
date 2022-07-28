"use strict";

define(["../Core/defined", "../Core/DeveloperError"], function (O, T) {
  "use strict";

  function y(e, r, t) {
    for (var n = new RegExp("(^|[^\\w])(" + e + ")($|[^\\w])", "g"), o = t.length, f = 0; f < o; ++f) {
      var i = t[f];
      t[f] = i.replace(n, "$1" + r + "$3");
    }
  }

  function D(e, r) {
    -1 === r.indexOf(e) && r.push(e);
  }

  function $(e, r) {
    !function (e, r, t) {
      for (var n = t.length, o = 0; o < n; ++o) {
        var f = t[o];
        t[o] = f.replace(e, r);
      }
    }(new RegExp("#extension\\s+GL_" + e + "\\s+:\\s+[a-zA-Z0-9]+\\s*$", "g"), "", r);
  }

  return function (e, r) {
    var t = /#define OUTPUT_DECLARATION/,
        n = e.split("\n");
    if (/#version 300 es/g.test(e)) return e;

    for (var o, f = -1, i = 0; i < n.length; ++i) {
      if (o = n[i], t.test(o)) {
        f = i;
        break;
      }
    }

    if (-1 === f) throw new T("Could not find a #define OUTPUT_DECLARATION!");
    var a = [];

    for (i = 0; i < 10; i++) {
      var l = "gl_FragData\\[" + i + "\\]",
          g = "czm_out" + i;
      new RegExp(l, "g").test(e) && (D(g, a), y(l, g, n), n.splice(f, 0, "layout(location = " + i + ") out vec4 " + g + ";"), f += 1);
    }

    var s = "czm_fragColor";
    !function (e, r) {
      for (var t = new RegExp("(^|[^\\w])(" + e + ")($|[^\\w])", "g"), n = r.length, o = 0; o < n; ++o) {
        var f = r[o];
        if (t.test(f)) return !0;
      }

      return !1;
    }("gl_FragColor", n) || (D(s, a), y("gl_FragColor", s, n), n.splice(f, 0, "layout(location = 0) out vec4 czm_fragColor;"), f += 1);

    var u = function (e, r) {
      for (var t = {}, n = e.length, o = [], f = 0; f < r.length; ++f) {
        var i = r[f],
            a = /(#ifdef|#if)/g.test(i),
            l = /#else/g.test(i),
            g = /#endif/g.test(i);
        if (a) o.push(i);else if (l) {
          var s = o[o.length - 1].replace("ifdef", "ifndef");
          /if/g.test(s) && (s = s.replace(/(#if\s+)(\S*)([^]*)/, "$1!($2)$3")), o.pop(), o.push(s);
        } else if (g) o.pop();else if (!/layout/g.test(i)) for (var u = 0; u < n; ++u) {
          var v = e[u];
          -1 !== i.indexOf(v) && (O(t[v]) ? t[v] = t[v].filter(function (e) {
            return 0 <= o.indexOf(e);
          }) : t[v] = o.slice());
        }
      }

      return t;
    }(a, n),
        v = {};

    for (i = 0; i < n.length; i++) {
      for (var c in o = n[i], u) {
        u.hasOwnProperty(c) && new RegExp("(layout)[^]+(out)[^]+(" + c + ")[^]+", "g").test(o) && (v[o] = c);
      }
    }

    for (var p in v) {
      if (v.hasOwnProperty(p)) {
        for (var h = v[p], d = n.indexOf(p), x = u[h], _ = x.length, w = 0; w < _; w++) {
          n.splice(d, 0, x[w]);
        }

        for (d += _ + 1, w = _ - 1; 0 <= w; w--) {
          n.splice(d, 0, "#endif //" + x[w]);
        }
      }
    }

    var E = "#version 300 es",
        C = !1;

    for (i = 0; i < n.length; i++) {
      /#version/.test(n[i]) && (n[i] = E, C = !0);
    }

    return C || n.splice(0, 0, E), $("EXT_draw_buffers", n), $("EXT_frag_depth", n), y("texture2D", "texture", n), y("texture3D", "texture", n), y("textureCube", "texture", n), y("gl_FragDepthEXT", "gl_FragDepth", n), r ? y("varying", "in", n) : (y("attribute", "in", n), y("varying", "out", n)), function (e) {
      for (var r = "", t = e.length, n = 0; n < t; ++n) {
        r += e[n] + "\n";
      }

      return r;
    }(n);
  };
});