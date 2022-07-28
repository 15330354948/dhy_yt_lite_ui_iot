"use strict";

define(["../ThirdParty/Uri", "./defined", "./DeveloperError"], function (n, o, i) {
  "use strict";

  var e = {},
      a = {};
  return e.add = function (e, r) {
    if (!o(e)) throw new i("host is required.");
    if (!o(r) || r <= 0) throw new i("port is required to be greater than 0.");
    var t = e.toLowerCase() + ":" + r;
    o(a[t]) || (a[t] = !0);
  }, e.remove = function (e, r) {
    if (!o(e)) throw new i("host is required.");
    if (!o(r) || r <= 0) throw new i("port is required to be greater than 0.");
    var t = e.toLowerCase() + ":" + r;
    o(a[t]) && delete a[t];
  }, e.contains = function (e) {
    if (!o(e)) throw new i("url is required.");

    var r = function (e) {
      var r = new n(e);
      r.normalize();
      var t = r.getAuthority();

      if (o(t)) {
        if (-1 !== t.indexOf("@") && (t = t.split("@")[1]), -1 === t.indexOf(":")) {
          var i = r.getScheme();
          if (o(i) || (i = (i = window.location.protocol).substring(0, i.length - 1)), "http" === i) t += ":80";else {
            if ("https" !== i) return;
            t += ":443";
          }
        }

        return t;
      }
    }(e);

    return !(!o(r) || !o(a[r]));
  }, e.clear = function () {
    a = {};
  }, e;
});