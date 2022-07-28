"use strict";

define(["../../../Core/defined", "../../../Core/defineProperties", "../../../Core/DeveloperError", "./PGEarthNavigation"], function (a, o, i, g) {
  "use strict";

  function e(e, t) {
    if (!a(e)) throw new i("viewer is required.");
    var r;
    n(e, t).addOnDestroyListener((r = e, function () {
      delete r.pgEarthNavigation;
    })), o(e, {
      pgEarthNavigation: {
        configurable: !0,
        get: function get() {
          return e.pgEarthWidget.pgEarthNavigation;
        }
      }
    });
  }

  e.mixinWidget = function (e, t) {
    return n.apply(void 0, arguments);
  };

  var n = function n(e, t) {
    var r,
        i = new g(e, t),
        n = a(e.pgEarthWidget) ? e.pgEarthWidget : e;
    return o(n, {
      pgEarthNavigation: {
        configurable: !0,
        get: function get() {
          return i;
        }
      }
    }), i.addOnDestroyListener((r = n, function () {
      delete r.pgEarthNavigation;
    })), i;
  };

  return e;
});