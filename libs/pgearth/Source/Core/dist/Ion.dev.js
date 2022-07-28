"use strict";

define(["./Credit", "./defined", "./Resource"], function (i, t, e) {
  "use strict";

  var a,
      n = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZDIzYmM0NC1kM2VmLTRjYzQtOTY2NS03MzU4YTdiMGIzNDkiLCJpZCI6MjU5LCJzY29wZXMiOlsiYXNyIiwiZ2MiXSwiaWF0IjoxNTU5NTc1NTY1fQ.kvuWBRJKCmJ8keZS1hPE7uBpCK4jS53e1GaDZ8qIXJQ",
      c = {};
  return c.defaultAccessToken = n, c.defaultServer = new e({
    url: "https://api.pgEarth.com/"
  }), c.getDefaultTokenCredit = function (e) {
    if (e === n) return t(a) || (a = new i('<b>             This application is using PGEarth\'s default ion access token. Please assign <i>PGEarth.Ion.defaultAccessToken</i>             with an access token from your ion account before making any PGEarth API calls.             You can sign up for a free ion account at <a href="https://pgEarth.com">https://pgEarth.com</a>.</b>', !0)), a;
  }, c;
});