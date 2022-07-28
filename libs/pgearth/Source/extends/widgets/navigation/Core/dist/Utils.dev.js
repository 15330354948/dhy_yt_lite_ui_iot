"use strict";

define(["../../../../Core/defined", "../../../../Core/Ray", "../../../../Core/Cartesian3", "../../../../Core/Cartographic", "../../../../Core/ReferenceFrame", "../../../../Scene/SceneMode"], function (t, e, a, o, r, c) {
  "use strict";

  var i = {},
      C = new o(),
      d = new e();
  return i.getCameraFocus = function (e, o, r) {
    var i = e.scene,
        n = i.camera;
    if (i.mode != c.MORPHING && (t(r) || (r = new a()), r = t(e.trackedEntity) ? e.trackedEntity.position.getValue(e.clock.currentTime, r) : (d.origin = n.positionWC, d.direction = n.directionWC, i.globe.pick(d, i, r)), t(r))) return i.mode == c.SCENE2D || i.mode == c.COLUMBUS_VIEW ? (r = n.worldToCameraCoordinatesPoint(r, r), o && (r = i.globe.ellipsoid.cartographicToCartesian(i.mapProjection.unproject(r, C), r))) : o || (r = n.worldToCameraCoordinatesPoint(r, r)), r;
  }, i;
});