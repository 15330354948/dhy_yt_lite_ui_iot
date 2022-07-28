"use strict";

define(["../../Core/defined", "../../Core/DeveloperError", "../../Core/defaultValue", "../../Core/buildModuleUrl", "../../Core/Cartesian3", "../../Core/Cartographic", "../../DataSources/Entity", "./support/MapUtils", "./TerrainClipping", "../../Scene/ClippingPlane", "../../Scene/ClippingPlaneCollection"], function (f, d, j, a, e, c, g, l, h, b, k) {
  function i(m) {
    if (!f(m.points) && m.points instanceof Array) {
      throw new d("options.points is required and points is Array");
    }

    if (!f(m.viewer)) {
      throw new d("options.viewer is required.");
    }

    this.points = m.points;
    this.viewer = m.viewer;
    this.isPlane = j(m.isPlane, true);
    this.isDig = j(m.isDig, true);
    this.wallImage = j(m.wallImage, a("Assets/Textures/tu.jpg"));
    this.bottomImage = j(m.bottomImage, a("Assets/Textures/tu.jpg"));
    this.pitHeight = j(m.pitHeight, this.isDig ? 50 : -50);
    this.errorRate = j(m.errorRate, 0.3);
    this.lowHeight = 0;
    this.wallPoints = [];
    this.pitWallEntities = this.viewer.entities.add(new g());
  }

  i.prototype.digHole = function () {
    if (!l.isAnticlockwise(this.points)) {
      this.points.reverse();
    }

    var p = this.points.length,
        o = this.points;
    this.lowHeight = o[0].height;

    for (var n = 0; n < p; n++) {
      if (n === p - 1) {
        this.getPitWallPoints(o[n], o[0], this.pitHeight);
      } else {
        this.getPitWallPoints(o[n], o[n + 1], this.pitHeight);
      }
    }

    this.drawPitWall(this.pitHeight);
    this.getPitBottom(this.pitHeight);
    var m = o.map(function (r) {
      return e.fromDegrees(r.longitude, r.latitude, r.height);
    });
    var q = new h({
      points: m
    });
    this.viewer.scene.globe.clippingPlanes = new k({
      planes: q.getClippingPlanes(),
      edgeWidth: 1,
      enabled: true
    });
  };

  i.prototype.destroy = function () {
    var m = this;
    this.wallPoints = [];

    if (m.pitWallEntities._children && m.pitWallEntities._children.length > 0) {
      m.pitWallEntities._children.map(function (n) {
        m.viewer.entities.remove(n);
      });
    }

    this.viewer.entities.remove(this.pitBottomEntities);
    this.viewer.scene.globe.clippingPlanes = undefined;
  };

  i.prototype.getPitWallPoints = function (p, r, u) {
    var n = new l(this.viewer);
    var t = e.fromDegrees(p.longitude, p.latitude);
    var o = e.fromDegrees(r.longitude, r.latitude);
    var m = e.distance(t, o);
    var s = n.getDengLngLat(p, r, parseInt(m / 3));
    var v = this;
    var q = [];
    s.map(function (x, w) {
      v.lowHeight = v.lowHeight > x[2] ? x[2] : v.lowHeight;
      q.push([x[0], x[1], x[2] - v.errorRate]);
    });
    this.wallPoints.push(q);
    return q;
  };

  i.prototype.drawPitWall = function (o) {
    var r = this.wallPoints.slice();

    for (var n = 0; n < r.length; n++) {
      var u = r[n].slice();

      if (this.isPlane) {
        var t = u[0],
            q = u[u.length - 1];
        u.push([q[0], q[1], q[2] - this.lowHeight - o]);
        u.push([t[0], t[1], t[2] - this.lowHeight - o]);
      } else {
        for (var p = u.length - 1; p >= 0; p--) {
          var s = u[p];
          u.push([s[0], s[1], s[2] - o]);
        }
      }

      u = u.flat();
      this.viewer.entities.add({
        name: "pitWall",
        parent: this.pitWallEntities,
        polygon: {
          hierarchy: e.fromDegreesArrayHeights(u),
          perPositionHeight: true,
          material: this.wallImage
        }
      });
    }
  };

  i.prototype.getPitBottom = function (n) {
    var m = [];

    if (this.isPlane) {
      var o = this;
      m = this.wallPoints.flat().map(function (p) {
        return [p[0], p[1], o.lowHeight - o.errorRate - n];
      });
    } else {
      m = this.wallPoints.flat().map(function (p) {
        return [p[0], p[1], p[2] - n];
      });
    }

    this.pitBottomEntities = this.viewer.entities.add({
      name: "pitBottom",
      polygon: {
        hierarchy: e.fromDegreesArrayHeights(m.flat()),
        perPositionHeight: true,
        material: this.bottomImage
      }
    });
  };

  return i;
});