"use strict";

define(["./defined", "./DeveloperError", "./getAbsoluteUri", "./Resource", "require"], function (r, t, n, u, i) {
  "use strict";

  var o,
      l,
      a,
      d = /((?:.*\/)|^)pgEarth[\w-]*\.js(?:\W|$)/i;

  function f(e) {
    return "undefined" == typeof document ? e : (r(o) || (o = document.createElement("a")), o.href = e, o.href = o.href, o.href);
  }

  function c() {
    if (r(l)) return l;
    var e = "undefined" != typeof PGEARTH_BASE_URL ? PGEARTH_BASE_URL : r(define.amd) && !define.amd.toUrlUndefined && r(i.toUrl) ? n("..", E("Core/buildModuleUrl.js")) : function () {
      for (var e = document.getElementsByTagName("script"), r = 0, t = e.length; r < t; ++r) {
        var n = e[r].getAttribute("src"),
            u = d.exec(n);
        if (null !== u) return u[1];
      }
    }();
    if (!r(e)) throw new t("Unable to determine PGEarth base URL automatically, try defining a global variable called PGEARTH_BASE_URL.");
    return (l = new u({
      url: f(e)
    })).appendForwardSlash(), l;
  }

  function s(e) {
    return f(i.toUrl("../" + e));
  }

  function U(e) {
    return c().getDerivedResource({
      url: e
    }).url;
  }

  function E(e) {
    return r(a) || (a = r(define.amd) && !define.amd.toUrlUndefined && r(i.toUrl) ? s : U), a(e);
  }

  return E._pgEarthScriptRegex = d, E._buildModuleUrlFromBaseUrl = U, E._clearBaseResource = function () {
    l = void 0;
  }, E.setBaseUrl = function (e) {
    l = u.DEFAULT.getDerivedResource({
      url: e
    });
  }, E.getPGEarthBaseUrl = c, E;
});