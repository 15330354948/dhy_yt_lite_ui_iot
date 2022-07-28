"use strict";

define(["../../Source/Core/defaultValue", "../../Source/Core/defined", "../../Source/Core/Check", "../../Source/DataSources/BillboardGraphics", "../../Source/Core/RuntimeError", "../_Color"], function (t, e, r, o, a, i) {
  return function (r) {
    if (!e(r)) throw new a("the options is required");
    r.image = r.url, r.height = t(r.height, 20), r.width = t(r.width, 20);
    var i = this;
    this.__proto__ = o.prototype;
    var h = r.style;

    if (h) {
      if ("circle" == h.type) {
        var l = new Image();
        l.src = r.url, l.onload = function () {
          r.image = function (t, e) {
            var r = document.createElement("canvas"),
                o = r.getContext("2d");
            r.width = e, r.height = e, o.strokeStyle = "#fff";
            var a = e / 2,
                i = Math.round(5 * e / 6);
            o.beginPath(), o.moveTo(a, i), o.arc(a, i, 3 * e / 20, 0, 2 * Math.PI, !1), o.fillStyle = "rgba(3, 252, 249,0.2)", o.fill(), o.beginPath(), o.arc(a, i, e / 12, 0, 2 * Math.PI, !1), o.fillStyle = "rgb(3, 252, 249)", o.lineWidth = Math.round(e / 75), o.fill(), o.stroke(), o.beginPath(), o.moveTo(Math.round(9 * e / 20), Math.round(7 * e / 12)), o.lineTo(Math.round(11 * e / 20), Math.round(7 * e / 12)), o.lineTo(Math.round(e / 2), Math.round(19 * e / 30)), o.closePath(), o.fillStyle = "#fff", o.fill();
            var h = Math.round(4 * e / 15);
            o.beginPath();
            var l,
                n,
                d = Math.round(e / 2),
                u = Math.round(e / 3);
            o.arc(d, u, h, 0, 2 * Math.PI, !1), o.clip(), t.width > t.height ? (l = 2 * h, n = t.width / t.height * l) : (n = 2 * h, l = t.height / t.width * n);
            var a = Math.round(d - n / 2),
                i = Math.round(u - l / 2);
            return o.drawImage(t, a, i, n, l), o.lineWidth = Math.round(e / 30), o.stroke(), r.toDataURL();
          }(l, 64), o.call(i, r), this.symbolKey = "billboard";
        };
      }
    } else o.call(i, r), this.symbolKey = "billboard";
  };
});