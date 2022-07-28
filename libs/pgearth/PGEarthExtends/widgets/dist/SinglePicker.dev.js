"use strict";

define(["../../Source/Core/ColorGeometryInstanceAttribute", "../../Source/Scene/GroundPrimitive", "../others/EventDrive", "../_Color"], function (e, t, i, r) {
  function c(c) {
    this.clickFeature, this.enterFeature, this.viewer = c.viewer;
    var n = this;
    c.viewer.scene.requestRenderMode = !1, this.clickEvent = i({
      viewer: viewer,
      eventType: "left_click",
      callBack: function callBack(t) {
        var i = viewer.scene.pick(t.screenPoint);
        i && i.id ? (n.clickFeature && (n.clickFeature.id, i.id), n.clickFeature = i, c.clickPick && c.clickPick.color && i.primitive.getGeometryInstanceAttributes && (i.primitive.getGeometryInstanceAttributes(i.id).color = e.toValue(r(c.clickPick.color))), c.clickPick && c.clickPick.success && c.clickPick.success(i)) : c.clickPick && c.clickPick.error && c.clickPick.error();
      }
    }), this.enterEvent = i({
      viewer: viewer,
      eventType: "mouse_move",
      callBack: function callBack(i) {
        var o = viewer.scene.pick(i.screenPoint);

        if (o && o.primitive instanceof t) {
          if (n.enterFeature && n.enterFeature.id == o.id) return;
          n.enterFeature = o, c.enterPick && c.enterPick.color && o.primitive.getGeometryInstanceAttributes && (o.primitive.getGeometryInstanceAttributes(o.id).color = e.toValue(r(c.enterPick.color))), c.enterPick && c.enterPick.enter && c.enterPick.enter(o);
        } else c.enterPick && c.enterPick.colorOut && n.enterFeature && (n.enterFeature.primitive.getGeometryInstanceAttributes(n.enterFeature.id).color = e.toValue(r(c.enterPick.colorOut))), n.enterFeature = null, c.enterPick && c.enterPick.out && c.enterPick.out();
      }
    });
  }

  return c.prototype.destroy = function () {
    this.clickEvent.destroy(), this.enterEvent.destroy(), this.viewer.scene.requestRenderMode = !1;
  }, c;
});