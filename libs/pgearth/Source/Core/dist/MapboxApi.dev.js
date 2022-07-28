"use strict";

define(["./Credit", "./defined"], function (t, o) {
  "use strict";

  var a,
      s = {
    defaultAccessToken: void 0
  },
      n = !1,
      c = "<b>This application is using PGEarth's default Mapbox access token.  Please create a new access token for the application as soon as possible and prior to deployment by visiting <a href=https://www.mapbox.com/account/apps/>https://www.mapbox.com/account/apps/</a>, and provide your token to PGEarth by setting the PGEarth.MapboxApi.defaultAccessToken property before constructing the PGEarthWidget or any other object that uses the Mapbox API.</b>";
  return s.getAccessToken = function (e) {
    return o(e) ? e : o(s.defaultAccessToken) ? s.defaultAccessToken : (n || (console.log(c), n = !0), "pk.eyJ1IjoiYW5hbHl0aWNhbGdyYXBoaWNzIiwiYSI6ImNpd204Zm4wejAwNzYyeW5uNjYyZmFwdWEifQ.7i-VIZZWX8pd1bTfxIVj9g");
  }, s.getErrorCredit = function (e) {
    if (!o(e) && !o(s.defaultAccessToken)) return o(a) || (a = new t(c, !0)), a;
  }, s;
});