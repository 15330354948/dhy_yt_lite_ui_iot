"use strict";

define(["../ThirdParty/measureText", "./Color", "./defaultValue", "./defined", "./DeveloperError"], function (E, c, y, T, v) {
  "use strict";

  var x;
  return function (e, t) {
    if (!T(e)) throw new v("text is required.");

    if ("" !== e) {
      t = y(t, y.EMPTY_OBJECT);
      var i = y(t.font, "10px sans-serif"),
          o = y(t.stroke, !1),
          n = y(t.fill, !0),
          l = y(t.strokeWidth, 1),
          r = y(t.backgroundColor, c.TRANSPARENT),
          d = y(t.padding, 0),
          a = 2 * d,
          s = document.createElement("canvas");
      s.width = 1, s.height = 1, s.style.font = i;
      var h = s.getContext("2d");
      T(x) || (T(h.imageSmoothingEnabled) ? x = "imageSmoothingEnabled" : T(h.mozImageSmoothingEnabled) ? x = "mozImageSmoothingEnabled" : T(h.webkitImageSmoothingEnabled) ? x = "webkitImageSmoothingEnabled" : T(h.msImageSmoothingEnabled) && (x = "msImageSmoothingEnabled")), h.font = i, h.lineJoin = "round", h.lineWidth = l, h[x] = !1, h.textBaseline = y(t.textBaseline, "bottom"), s.style.visibility = "hidden", document.body.appendChild(s);
      var m = E(h, e, o, n);
      s.dimensions = m, document.body.removeChild(s), s.style.visibility = "";
      var g,
          f,
          b = -m.bounds.minx,
          u = Math.ceil(m.width) + b + a,
          S = m.height + a,
          C = S - (S - m.ascent + a) + a;
      return s.width = u, s.height = S, h.font = i, h.lineJoin = "round", h.lineWidth = l, h[x] = !1, r !== c.TRANSPARENT && (h.fillStyle = r.toCssColorString(), h.fillRect(0, 0, s.width, s.height)), o && (g = y(t.strokeColor, c.BLACK), h.strokeStyle = g.toCssColorString(), h.strokeText(e, b + d, C)), n && (f = y(t.fillColor, c.WHITE), h.fillStyle = f.toCssColorString(), h.fillText(e, b + d, C)), s;
    }
  };
});