"use strict";

define(["../../../Core/defined", "../../../Core/Cartographic", "../../../Core/DeveloperError"], function (d, n, o) {
  function u() {}

  return u.cartesian2Degrees = function (e, t) {
    var r = {},
        i = n.fromCartesian(e, t);
    return r.longitude = u.rad2Degree(i.longitude), r.latitude = u.rad2Degree(i.latitude), r.height = i.height, r;
  }, u.distance = function (e, t) {
    if (!d(e.longitude) || !d(e.latitude)) throw new o("起始点必须包含经纬度信息");
    if (!d(t.longitude) || !d(t.latitude)) throw new o("结束点必须包含经纬度信息");
    var r = u.degree2Rad(e.longitude),
        i = u.degree2Rad(e.latitude),
        n = u.degree2Rad(t.longitude),
        a = u.degree2Rad(t.latitude);
    return 6378137 * Math.acos(Math.sin(i) * Math.sin(a) + Math.cos(i) * Math.cos(a) * Math.cos(n - r));
  }, u.degree2Rad = function (e) {
    if (!d(e)) throw new o("degree is required.");
    return Math.PI * e / 180;
  }, u.rad2Degree = function (e) {
    if (!d(e)) throw new o("radians is required.");
    return 180 * e / Math.PI;
  }, u;
});