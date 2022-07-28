"use strict";

define(["../ThirdParty/when", "../Core/defaultValue", "../Core/defined", "../Core/formatError"], function (o, i, f, u) {
  "use strict";

  return function (s) {
    var a;
    return function (r) {
      var e = r.data,
          t = [],
          n = {
        id: e.id,
        result: void 0,
        error: void 0
      };
      return o(function (r, e, t) {
        try {
          return r(e, t);
        } catch (r) {
          return o.reject(r);
        }
      }(s, e.parameters, t)).then(function (r) {
        n.result = r;
      }).otherwise(function (r) {
        r instanceof Error ? n.error = {
          name: r.name,
          message: r.message,
          stack: r.stack
        } : n.error = r;
      }).always(function () {
        f(a) || (a = i(self.webkitPostMessage, self.postMessage)), e.canTransferArrayBuffer || (t.length = 0);

        try {
          a(n, t);
        } catch (r) {
          n.result = void 0, n.error = "postMessage failed with error: " + u(r) + "\n  with responseMessage: " + JSON.stringify(n), a(n);
        }
      });
    };
  };
});