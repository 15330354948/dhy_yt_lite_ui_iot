"use strict";

define(function () {
  "use strict";

  return function (l, i, n, r, c) {
    return function () {
      var t = document.createElement("canvas"),
          e = c + 2 * r;
      t.height = t.width = e;
      var a = t.getContext("2d");
      return a.clearRect(0, 0, e, e), 0 !== r && (a.beginPath(), a.arc(e / 2, e / 2, e / 2, 0, 2 * Math.PI, !0), a.closePath(), a.fillStyle = n, a.fill(), l < 1 && (a.save(), a.globalCompositeOperation = "destination-out", a.beginPath(), a.arc(e / 2, e / 2, c / 2, 0, 2 * Math.PI, !0), a.closePath(), a.fillStyle = "black", a.fill(), a.restore())), a.beginPath(), a.arc(e / 2, e / 2, c / 2, 0, 2 * Math.PI, !0), a.closePath(), a.fillStyle = i, a.fill(), t;
    };
  };
});