"use strict";

define([], function () {
  function n() {}

  return n.handleMecToDegree = function (n, t) {
    var e = t / 20037508.34 * 180;
    return [n / 20037508.34 * 180, 180 / Math.PI * (2 * Math.atan(Math.exp(e * Math.PI / 180)) - Math.PI / 2)];
  }, n;
});