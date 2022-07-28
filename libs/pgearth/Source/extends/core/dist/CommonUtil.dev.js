"use strict";

define(["../../Core/Cartesian3", "../../Core/Cartesian4", "../../Core/Matrix4"], function (i, f, h) {
  "use strict";

  function l() {}

  return l.preDealPath = function (r, t) {
    var e = r.substr(0);

    if (e.trim(), e.replace("\\", "/"), 2 <= e.length && ("//" == e.substr(0, 2) && (e[0] = "\\", e[1] = "\\"), e.replace("//", "/"), 5 < e.length && "http:" == e.substr(0, 5))) {
      for (var n = 5; n < e.length && "/" == e.charAt(n); n++) {
        ;
      }

      e = "http://" + e.substr(n, e.length - n);
    }

    if (!t) {
      for (var s = e.length - 1; 0 <= s && "/" == e.charAt(s);) {
        s--;
      }

      e = e.substr(0, s + 1), e += "/";
    }

    return e;
  }, l.getDir = function (r) {
    var t = (r.length, r.lastIndexOf("/"));
    if (t < 0 && (t = r.lastIndexOf("\\")), t < 0) return r.substr(0);
    var e = r.substr(0, t);
    return "/" != e.charAt(e.length - 1) && (e += "/"), e;
  }, l.getAbsolutePath = function (r, t) {
    var e,
        n = r.substr(0),
        s = t.substr(0);

    if (n.trim(), s.trim(), "" == n) {
      if ("./" == (e = s.substr(0, 2)) || ".\\" == e) return s.substr(2);
      if ("../" == (e = s.substr(0, 3)) || "..\\" == e) return "";
    }

    if ("" == s) return s;
    if (2 <= s.length && ":" == s.charAt(1) || 5 <= s.length && ":" == s.charAt(4)) return s;
    if ("\\\\" == (e = s.substr(0, 2)) || "//" == e) return s;
    n = l.preDealPath(n, !1), e = (s = l.preDealPath(s, !0)).substr(0, 2);
    var u = s.substr(0, 3);
    if ("./" == e) return n + (s = s.substr(2));
    if (2 <= s.length && ":" == s.charAt(1)) return s;
    if ("/" != s.charAt(0) && "../" != u) return n + s;
    if ("/" == s.charAt(0)) return s;
    if ("../" != u) return r;

    for (var a = 0; a = n.lastIndexOf("/"), n = n.substr(0, a), "../" == (s = s.substr(3)).substr(0, 3);) {
      ;
    }

    return n + "/" + s;
  }, l.project = function (r, t, e) {
    var n = new f();
    n.x = r.x, n.y = r.y, n.z = r.z, n.w = 1;
    var s = new h();
    h.multiply(t.workingFrustums[0].projectionMatrix, t.viewMatrix, s);
    var u = new f();

    if (h.multiplyByVector(s, n, u), 0 != u.w) {
      u.x /= u.w, u.y /= u.w, u.z /= u.w, u.x = .5 * u.x + .5, u.y = .5 * u.y + .5, u.z = .5 * u.z + .5;
      var a = new i();
      return a.x = u.x * e.width + e.x, a.y = u.y * e.height + e.y, a.z = u.z, a;
    }
  }, l;
});