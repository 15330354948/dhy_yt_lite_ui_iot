"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

define(["../Core/defined", "../Scene/PrimitivePipeline", "../ThirdParty/when", "./createTaskProcessorWorker", "require"], function (f, l, d, e, k) {
  "use strict";

  var m = {};
  return e(function (e, r) {
    for (var t = e.subTasks, n = t.length, o = new Array(n), i = 0; i < n; i++) {
      var u,
          a = t[i],
          s = a.geometry,
          c = a.moduleName;
      f(c) ? (u = function (e) {
        var r = m[e];
        return f(r) || ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? m[r] = r = k("Workers/" + e) : k(["./" + e], function (e) {
          m[r = e] = e;
        })), r;
      }(c), o[i] = u(s, a.offset)) : o[i] = s;
    }

    return d.all(o, function (e) {
      return l.packCreateGeometryResults(e, r);
    });
  });
});