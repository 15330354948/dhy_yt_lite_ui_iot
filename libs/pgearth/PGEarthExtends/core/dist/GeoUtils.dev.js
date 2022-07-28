"use strict";

define(["../../Source/Core/Cartographic", "../../Source/Core/defined", "../../Source/Core/DeveloperError", "../../Source/Core/Cartesian3", "../geometry/SimplePoint", "../../Source/Core/EllipsoidGeodesic", "../../Source/Core/defaultValue", "../../Source/Scene/SceneTransforms", "../../Source/Core/Cartesian2", "../../Source/Core/Ellipsoid"], function (e, t, r, i, a, n, o, u, d, c) {
  var s = function s() {};

  s.cartesian2Degrees = function (t, r) {
    var i = {},
        a = e.fromCartesian(t, r);
    return i.longitude = s.rad2Degree(a.longitude), i.latitude = s.rad2Degree(a.latitude), i.height = a.height, i;
  }, s.distance = function (e, i) {
    if (!t(e.longitude) || !t(e.latitude)) throw new r("起始点必须包含经纬度信息");
    if (!t(i.longitude) || !t(i.latitude)) throw new r("结束点必须包含经纬度信息");
    var a, n, o, u;
    return a = s.degree2Rad(e.longitude), o = s.degree2Rad(e.latitude), n = s.degree2Rad(i.longitude), u = s.degree2Rad(i.latitude), 6378137 * Math.acos(Math.sin(o) * Math.sin(u) + Math.cos(o) * Math.cos(u) * Math.cos(n - a));
  }, s.distanceByCartesian = function (e, t) {
    if (!e instanceof a || !t instanceof a) throw new r("point must be SimplePoint.");
    var n = new i(e.longitude, e.latitude),
        o = new i(t.longitude, t.latitude);
    return i.distance(n, o);
  }, s.spaceDistance = function (t, r) {
    var i = e.fromDegrees(t.longitude, t.latitude, t.height),
        a = e.fromDegrees(r.longitude, r.latitude, r.height),
        o = new n();
    o.setEndPoints(i, a);
    var u = o.surfaceDistance;
    return (u = Math.sqrt(Math.pow(u, 2) + Math.pow(a.height - i.height, 2))) ? u.toFixed(5) : 0;
  }, s.degree2Rad = function (e) {
    if (!t(e)) throw new r("degree is required.");
    return Math.PI * e / 180;
  }, s.rad2Degree = function (e) {
    if (!t(e)) throw new r("radians is required.");
    return 180 * e / Math.PI;
  };
  Math.PI, Math.PI;
  return s.getArea = function (e, t) {
    t = o(t, 6371009);
    var r = e.length;
    if (r < 3) return 0;
    var i,
        a,
        n = 0,
        u = e[r - 1],
        d = Math.tan((Math.PI / 2 - u.latitude / 180 * Math.PI) / 2),
        c = u.longitude / 180 * Math.PI;

    for (var s in e) {
      var h = Math.tan((Math.PI / 2 - e[s].latitude / 180 * Math.PI) / 2),
          g = e[s].longitude / 180 * Math.PI;
      n += (void 0, void 0, i = g - c, a = h * d, 2 * Math.atan2(a * Math.sin(i), 1 + a * Math.cos(i))), d = h, c = g;
    }

    return Math.abs(n * (t * t));
  }, s.getHeight = function (t, r, a) {
    return t.scene.sampleHeight(e.fromDegrees(1 * r, 1 * a)) || function (e, t, r) {
      var a,
          n,
          o = u.wgs84ToWindowCoordinates(r.scene, i.fromDegrees(e, t)),
          s = new d(o.x, o.y);

      if (r.scene.pick(s)) {
        if (!(n = r.scene.pickPosition(s))) return;
        a = r.scene.globe.ellipsoid.cartesianToCartographic(n);
      } else {
        var h = r.scene.camera.getPickRay(s);
        if (!(n = r.scene.globe.pick(h, r.scene))) return;
        a = c.WGS84.cartesianToCartographic(n);
      }

      return a.height < 0 ? 0 : a.height;
    }(1 * r, 1 * a, t);
  }, s;
});