"use strict";

define(["../../Core/Color", "../../Core/defined", "../../Core/DeveloperError", "../../Core/Cartesian3", "../../Core/JulianDate", "../../DataSources/Entity", "../core/Color"], function (w, g, p, y, D, E, I) {
  function e(e) {
    var t,
        i,
        o = document.createElement("canvas"),
        n = o.getContext("2d");
    o.height = 4, o.width = 4, n.fillStyle = e.pointStyle.color, n.arc(2, 2, 2, 0, 2 * Math.PI, !1), n.fill(), t = o.toDataURL(), this.entityCollection = i = e.viewer.entities.add(new E()), e.viewer.clockViewModel.shouldAnimate = !0;

    function r(e) {
      if (!g(e)) throw new p("time is required.");
      var t = D.toDate(e).getTime() / s % c + l.start,
          i = i || 10;
      return !!(t && this.nameID > t - i && this.nameID < t);
    }

    var a = e.points.map(function (e, t, i) {
      return {
        coordinates: e,
        time: t
      };
    }),
        l = {
      start: 0,
      end: a.length
    },
        s = 15,
        c = l.end - l.start,
        d = [],
        h = e.pointStyle,
        m = new w(243 / 255, 242 / 255, 249 / 255, .8),
        f = 5;
    h && (h.color && (m = I(h.color)), h.size && (f = h.size));

    for (var u = 0; u < a.length; ++u) {
      var v = a[u].coordinates[0],
          C = a[u].coordinates[1];
      d[u] = e.viewer.entities.add({
        parent: i,
        position: y.fromDegrees(v, C, e.height),
        nameID: a[u].time,
        billboard: {
          image: t,
          width: f,
          height: f,
          color: m
        }
      }), d[u].isAvailable = r;
    }
  }

  return e.prototype.destroy = function (o) {
    this.entityCollection._children.forEach(function (e, t, i) {
      o.entities.remove(e);
    }), o.entities.remove(this.entityCollection);
  }, e;
});