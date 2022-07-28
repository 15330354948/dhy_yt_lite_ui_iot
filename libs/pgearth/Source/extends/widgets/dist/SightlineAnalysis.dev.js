"use strict";

define(["../../Core/defined", "../../Core/defaultValue", "../../Core/Cartesian3", "../../Core/Color", "../../Core/Ray", "../../Core/Math", "../../Core/DeveloperError", "../../Core/ArcType", "../../Core/Cartographic"], function (f, i, d, b, j, e, c, h, a) {
  function g(k) {
    if (!f(k.viewer)) {
      throw new c("viewer is required.");
    }

    this.viewer = k.viewer;
    this.viewPosition = k.viewPosition;
    this.targetPosition = k.targetPosition;
    this.visibleColor = i(k.visibleColor, b.GREEN);
    this.hiddenColor = i(k.hiddenColor, b.RED);
    this.allLines = [];
  }

  g.prototype.getPoints = function () {
    if (!f(this.targetPosition)) {
      throw new c("targetPosition is required.");
    }

    if (this.viewPosition && this.viewPosition) {
      var k = d.fromDegrees(this.viewPosition[0], this.viewPosition[1], this.viewPosition[2]);
      var l = d.fromDegrees(this.targetPosition[0], this.targetPosition[1], this.targetPosition[2]);
      this.pickFromRay(k, l);
    }
  };

  g.prototype.getHeightPoints = function () {
    var v = [],
        z = [],
        B = [],
        x = [],
        r = [],
        w = undefined;
    var l = d.fromDegrees(this.viewPosition[0], this.viewPosition[1], this.viewPosition[2]);
    var k = d.fromDegrees(this.targetPosition[0], this.targetPosition[1], this.targetPosition[2]);
    var p = d.distance(l, k);
    var u = Math.floor(p / (p > 1000 ? 2 : 1));
    var t = this.viewPosition[2];
    var s = this.targetPosition[2];

    for (var A = 0; A < u - 1; A++) {
      v[A] = e.lerp(this.viewPosition[0], this.targetPosition[0], 1 / u * (A + 1));
      z[A] = e.lerp(this.viewPosition[1], this.targetPosition[1], 1 / u * (A + 1));
      B[A] = t - (t - s) * (1 / u) * (A + 1);
      x[A] = this.viewer.scene.sampleHeight(a.fromDegrees(v[A], z[A]));
      r.push([v[A], z[A], B[A]]);
    }

    for (var y = 0; y < x.length; y++) {
      if (y > 0) {
        var q = B[y - 1];
        var o = x[y - 1];
        var C = x[y];
        var n = B[y];

        if (q - o >= 0) {
          if (n - C < 0) {
            w = {
              "point": r[y - 1],
              "index": y,
              type: "in"
            };
            break;
          }
        } else {
          if (n - C >= 0) {
            w = {
              "point": r[y - 1],
              "index": y,
              type: "out"
            };
            break;
          }
        }
      }
    }

    if (w) {
      this.drawLine(d.fromDegrees(w.point[0], w.point[1], w.point[2]), l, this.visibleColor);
      this.drawLine(d.fromDegrees(w.point[0], w.point[1], w.point[2]), k, this.hiddenColor);
    } else {
      this.drawLine(l, k, this.visibleColor);
    }
  };

  g.prototype.destroy = function () {
    this.removePoints();
    this.targetPosition = undefined;
    this.viewPosition = undefined;
  };

  g.prototype.removePoints = function () {
    for (var k in this.allLines) {
      this.viewer.entities.remove(this.allLines[k]);
    }

    this.allLines = [];
  };

  g.prototype.pickFromRay = function (l, n) {
    var o = d.normalize(d.subtract(n, l, new d()), new d());
    var m = new j(l, o);
    var k = this.viewer.scene.pickFromRay(m, []);
    this.showIntersection(k, n, l);
  };

  g.prototype.showIntersection = function (m, l, k) {

    if (f(m) && f(m.object)) {
      this.drawLine(m.position, k, this.visibleColor);
      this.drawLine(m.position, l, this.hiddenColor);
    } else {
      this.getHeightPoints();
    }
  };

  g.prototype.drawLine = function (l, n, k) {
    var m = this.viewer.entities.add({
      name: "sightlineAnalysis",
      polyline: {
        positions: [l, n],
        arcType: h.NONE,
        width: 3,
        material: k,
        depthFailMaterial: k
      }
    });
    this.allLines.push(m);
  };

  return g;
});