"use strict";

define([], function () {
  function e() {}

  return e.extractFieldNames = function (e) {
    if (!e || "string" != typeof e) return [];
    if (!(e = e.match(/{[^}]*}/g))) return [];
    var n = /\{(\w+):.+\}/;
    return (e = e.filter(function (e) {
      return !(0 === e.indexOf("{relationships/") || 0 === e.indexOf("{expression/"));
    }).map(function (e) {
      return e.replace(n, "{$1}");
    })) ? e.map(function (e) {
      return e.slice(1, -1);
    }) : [];
  }, e.Trim = function (e, n) {
    var r;
    return r = e.replace(/(^\s+)|(\s+$)/g, ""), "g" == n.toLowerCase() && (r = r.replace(/\s/g, "")), r;
  }, e;
});