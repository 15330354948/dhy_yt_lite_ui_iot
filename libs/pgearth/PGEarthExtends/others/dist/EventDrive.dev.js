"use strict";

define(["../../Source/Core/ScreenSpaceEventHandler", "../../Source/Core/defined", "../../Source/Core/defaultValue", "../../Source/Core/ScreenSpaceEventType", "../../Source/Core/DeveloperError", "../../Source/Core/Math", "../../Source/Core/Ellipsoid"], function (e, r, i, t, o, n, c) {
  return function (a) {
    if (!r(a.viewer)) throw new o("viewer is required");
    a.eventType = i(a.eventType, "LEFT_CLICK").toUpperCase();
    var l = a.viewer.scene,
        u = (a.viewer.camera, l.globe.ellipsoid),
        s = new e(l.canvas);
    return s.setInputAction(function (e) {
      var r = e.endPosition || e.position;
      if (t = l.pickPosition(r)) o = u.cartesianToCartographic(t);else try {
        var i = viewer.scene.camera.getPickRay(r),
            t = viewer.scene.globe.pick(i, viewer.scene),
            o = c.WGS84.cartesianToCartographic(t);
      } catch (e) {}
      a.callBack && a.callBack({
        screenPoint: r,
        mapPoint: {
          longitude: o && o.longitude ? n.toDegrees(o.longitude) : null,
          latitude: o && o.latitude ? n.toDegrees(o.latitude) : null,
          height: o && o.height ? o.height : null
        },
        cartographic: o,
        cartesian: t
      });
    }, t[a.eventType]), s;
  };
});