"use strict";

define(["../../Source/Core/Check", "../../Source/Core/RuntimeError"], function (e, a) {
  function b(p) {
    if (!p) {
      throw new a("options is required!");
    }

    e.typeOf.object("options", p);
    var g = p.center,
        m = p.radius,
        n = p.startAngle,
        j = p.endAngle,
        h = p.pointNum;
    var o = new Array();
    o.push(g);

    for (var l = 1; l <= h; l++) {
      var k = n + (j - n) * l / h;
      o[l] = f(g[1], g[0], m, k);
    }

    return o;
  }

  var d = 6378137;
  var c = 6356725;

  function f(n, i, g, j) {
    var p = g * 1000 * Math.sin(j * Math.PI / 180);
    var o = g * 1000 * Math.cos(j * Math.PI / 180);
    var l = c + (d - c) * (90 - n) / 90;
    var k = l * Math.cos(n * Math.PI / 180);
    var m = (p / k + i * Math.PI / 180) * 180 / Math.PI;
    var h = (o / l + n * Math.PI / 180) * 180 / Math.PI;
    return [m, h];
  }

  return b;
});