"use strict";

define(["../../../../ThirdParty/knockout", "./Hammer"], function (n, o) {
  "use strict";

  return {
    register: function register(u) {
      u.bindingHandlers.swipeLeft = {
        init: function init(n, i, t, e, r) {
          var a = u.unwrap(i());
          new o(n).on("swipeleft", function (n) {
            var i = r.$data;
            a.apply(i, arguments);
          });
        }
      }, u.bindingHandlers.swipeRight = {
        init: function init(n, i, t, e, r) {
          var a = u.unwrap(i());
          new o(n).on("swiperight", function (n) {
            var i = r.$data;
            a.apply(i, arguments);
          });
        }
      };
    }
  };
});