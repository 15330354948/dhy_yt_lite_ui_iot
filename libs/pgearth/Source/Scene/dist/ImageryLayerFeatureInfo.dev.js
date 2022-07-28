"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

define(["../Core/defined"], function (n) {
  "use strict";

  function t() {
    this.name = void 0, this.description = void 0, this.position = void 0, this.data = void 0, this.imageryLayer = void 0;
  }

  return t.prototype.configureNameFromProperties = function (t) {
    var e,
        i,
        r = 10;

    for (var o in t) {
      t.hasOwnProperty(o) && t[o] && (i = o.toLowerCase(), 1 < r && "name" === i ? (r = 1, e = o) : 2 < r && "title" === i ? (r = 2, e = o) : 3 < r && /name/i.test(o) ? (r = 3, e = o) : 4 < r && /title/i.test(o) && (r = 4, e = o));
    }

    n(e) && (this.name = t[e]);
  }, t.prototype.configureDescriptionFromProperties = function (t) {
    this.description = function t(e) {
      var i,
          r = '<table class="pgEarth-infoBox-defaultTable" cellspacing="0">';

      for (var o in e) {
        e.hasOwnProperty(o) && (i = e[o], n(i) && (r += "object" == _typeof(i) ? "<tr><td>" + o + "</td><td>" + t(i) + "</td></tr>" : "<tr><td>" + o + "</td><td>" + i + "</td></tr>"));
      }

      return r += "</table>";
    }(t);
  }, t;
});