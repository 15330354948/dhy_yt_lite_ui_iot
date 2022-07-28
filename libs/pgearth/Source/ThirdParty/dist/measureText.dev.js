"use strict";

define(function () {
  function W(e, t) {
    return document.defaultView.getComputedStyle(e, null).getPropertyValue(t);
  }

  return function (e, t, n, a) {
    var i = e.measureText(t),
        l = W(e.canvas, "font-family"),
        o = W(e.canvas, "font-size").replace("px", ""),
        r = W(e.canvas, "font-style"),
        s = W(e.canvas, "font-weight"),
        d = !/\S/.test(t);
    i.fontsize = o;
    var c = document.createElement("div");
    c.style.position = "absolute", c.style.opacity = 0, c.style.font = r + " " + s + " " + o + "px " + l, c.innerHTML = t + "<br/>" + t, document.body.appendChild(c), i.leading = 1.2 * o;
    var f = W(c, "height");
    if (2 * o <= (f = f.replace("px", "")) && (i.leading = f / 2 | 0), document.body.removeChild(c), d) i.ascent = 0, i.descent = 0, i.bounds = {
      minx: 0,
      maxx: i.width,
      miny: 0,
      maxy: 0
    }, i.height = 0;else {
      var y = document.createElement("canvas"),
          h = 100;
      y.width = i.width + h, y.height = 3 * o, y.style.opacity = 1, y.style.fontFamily = l, y.style.fontSize = o, y.style.fontStyle = r, y.style.fontWeight = s;
      var m = y.getContext("2d");
      m.font = r + " " + s + " " + o + "px " + l;
      var u = y.width,
          v = y.height,
          x = v / 2;
      m.fillStyle = "white", m.fillRect(-1, -1, u + 2, v + 2), n && (m.strokeStyle = "black", m.lineWidth = e.lineWidth, m.strokeText(t, 50, x)), a && (m.fillStyle = "black", m.fillText(t, 50, x));

      for (var g = m.getImageData(0, 0, u, v).data, p = 0, b = 4 * u, w = g.length; ++p < w && 255 === g[p];) {
        ;
      }

      for (var S = p / b | 0, p = w - 1; 0 < --p && 255 === g[p];) {
        ;
      }

      var k = p / b | 0;

      for (p = 0; p < w && 255 === g[p];) {
        w <= (p += b) && (p = p - w + 4);
      }

      var C = p % b / 4 | 0,
          T = 1;

      for (p = w - 3; 0 <= p && 255 === g[p];) {
        (p -= b) < 0 && (p = w - 3 - 4 * T++);
      }

      var z = p % b / 4 + 1 | 0;
      i.ascent = x - S, i.descent = k - x, i.bounds = {
        minx: C - 50,
        maxx: z - 50,
        miny: 0,
        maxy: k - S
      }, i.height = k - S + 1;
    }
    return i;
  };
});