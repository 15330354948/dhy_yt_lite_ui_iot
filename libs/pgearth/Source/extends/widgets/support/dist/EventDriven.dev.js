"use strict";

define(["../../../Core/ScreenSpaceEventHandler", "../../../Core/defined", "../../../Core/defaultValue", "../../../Core/ScreenSpaceEventType", "../../../Core/DeveloperError", "../../../Core/Math", "../../../Core/Ellipsoid"], function (i, r, t, n, l, s, p) {
  return function (o) {
    if (!r(o.viewer)) throw new l("viewer is required");
    o.eventType = t(o.eventType, "LEFT_CLICK").toUpperCase();
    var a = o.viewer.scene,
        c = a.globe.ellipsoid,
        e = new i(a.canvas);
    return e.setInputAction(function (e) {
      var i = e.endPosition || e.position;
      if (t = a.pickPosition(i)) n = c.cartesianToCartographic(t);else try {
        var r = o.viewer.scene.camera.getPickRay(i),
            t = o.viewer.scene.globe.pick(r, o.viewer.scene),
            n = p.WGS84.cartesianToCartographic(t);
      } catch (e) {}
      o.callBack && o.callBack({
        screenPoint: i,
        mapPoint: {
          longitude: n && n.longitude ? s.toDegrees(n.longitude) : null,
          latitude: n && n.latitude ? s.toDegrees(n.latitude) : null,
          height: n ? n.height : null
        },
        cartographic: n,
        cartesian: t
      });
    }, n[o.eventType]), e;
  };
});