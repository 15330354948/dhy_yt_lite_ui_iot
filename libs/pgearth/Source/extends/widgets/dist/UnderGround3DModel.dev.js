"use strict";

define(["../../Core/defined", "../../Core/DeveloperError", "../../Core/Cartesian3", "./support/MapUtils"], function (q, C, L, A) {
  function e(e) {
    if (!q(e)) throw new C("viewer is required.");
    this.viewer = e, this.holeWallEntity = [], this.bottomEntity = [];
  }

  return e.prototype.create = function (e) {
    if (!q(e.points)) throw new C("points is required.");
    if (!q(e.holeHeights)) throw new C("holeHeights is required.");
    if (!q(e.materials)) throw new C("materials is required.");

    for (var t = new A(this.viewer), i = e.points, r = e.materials, o = [], n = [], a = [], h = 0; h < i.length; h++) {
      var s = h === i.length - 1 ? t.getDengLngLat(i[h], i[0], 50) : t.getDengLngLat(i[h], i[h + 1], 50);
      o.push(s);
    }

    for (var l = 0; l < o.length; l++) {
      for (var g = [], v = o[l], f = 0; f < r.length; f++) {
        var m = e.holeHeights[l][f];
        g[f] = [];

        for (var p = 0; p < v.length; p++) {
          var c = 0 === p || p === v.length - 1 ? 0 : +Math.random() + 1;
          g[f].push([v[p][0], v[p][1], v[p][2] - m - c]);
        }
      }

      n.push(g);
    }

    for (var u = n.slice(), w = 0; w < u.length; w++) {
      var y = u[w][r.length - 1].slice();
      y.shift(), a = a.concat(y);
    }

    for (var d = 0; d < o.length; d++) {
      for (var E = o[d].slice(), H = n[d], D = 0; D < r.length; D++) {
        var W = (0 === D ? E.reverse() : H[D - 1].slice().reverse()).concat(H[D]),
            b = this.viewer.entities.add({
          name: "modelWall",
          polygon: {
            hierarchy: L.fromDegreesArrayHeights(W.flat()),
            perPositionHeight: !0,
            material: r[D]
          }
        });
        this.holeWallEntity.push(b);
      }
    }

    this.bottomEntity.push(this.viewer.entities.add({
      name: "modelBottom",
      polygon: {
        hierarchy: L.fromDegreesArrayHeights(a.flat()),
        perPositionHeight: !0,
        material: r[r.length - 1]
      }
    }));
  }, e.prototype.removeAll = function () {
    var t = this;
    t.holeWallEntity.map(function (e) {
      t.viewer.entities.remove(e);
    }), this.bottomEntity.map(function (e) {
      t.viewer.entities.remove(e);
    }), t.holeWallEntity = [], t.bottomEntity = [];
  }, e;
});