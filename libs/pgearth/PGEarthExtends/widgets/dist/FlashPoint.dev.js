"use strict";

define(["../../Source/Core/Color", "../../Source/Core/Cartesian3", "../../Source/Core/defined", "../../Source/Core/DeveloperError", "../../Source/Core/JulianDate", "../../Source/DataSources/Entity", "../_Color"], function (e, t, o, i, r, n, a) {
  function l(l) {
    var c,
        s,
        d = document.createElement("canvas"),
        h = d.getContext("2d");
    d.height = 4, d.width = 4, h.fillStyle = l.pointStyle.color, h.arc(2, 2, 2, 0, 2 * Math.PI, !1), h.fill(), c = d.toDataURL(), this.entityCollection = s = l.viewer.entities.add(new n()), l.viewer.clockViewModel.shouldAnimate = !0;
    var u = l.points.map(function (e, t, o) {
      return {
        coordinates: e,
        time: t
      };
    });
    console.log(u);

    var m = {
      start: 0,
      end: u.length
    },
        f = 15,
        v = m.end - m.start,
        C = function C(e) {
      if (!o(e)) throw new i("time is required.");
      var t = r.toDate(e).getTime() / f % v + m.start,
          n = n || 10;
      return !!(t && this.nameID > t - n && this.nameID < t);
    },
        g = [],
        w = l.pointStyle,
        S = new e(243 / 255, 242 / 255, 249 / 255, .8),
        p = 5;

    w && (w.color && (S = a(w.color)), w.size && (p = w.size));

    for (var y = 0; y < u.length; ++y) {
      var D = u[y].coordinates[0],
          E = u[y].coordinates[1];
      g[y] = l.viewer.entities.add({
        parent: s,
        position: t.fromDegrees(D, E, l.height),
        nameID: u[y].time,
        billboard: {
          image: c,
          width: p,
          height: p,
          color: S
        }
      }), g[y].isAvailable = C;
    }
  }

  return l.prototype.destroy = function (e) {
    this.entityCollection._children.forEach(function (t, o, i) {
      e.entities.remove(t);
    }), e.entities.remove(this.entityCollection);
  }, l;
});