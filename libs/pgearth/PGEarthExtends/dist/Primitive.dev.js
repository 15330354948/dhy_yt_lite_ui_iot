"use strict";

define(["../Source/Core/Check", "../Source/Core/createGuid", "../Source/Core/defaultValue", "../Source/Core/RuntimeError", "../Source/Scene/Primitive", "../Source/Core/GeometryInstance", "../Source/Scene/EllipsoidSurfaceAppearance", "./geometry/PrimitiveGeometry", "./symbols/MaterialSymbol"], function (e, o, r, t, n, p, a, i, u) {
  return function (c) {
    if (!c) throw new t("options is required");
    if (e.typeOf.object("options", c), !c.geometry) throw new t("geometry is required");
    e.typeOf.object("geometry", c.geometry);
    var m = new n({
      geometryInstances: new p({
        geometry: i(c.geometry)
      }),
      appearance: new a({
        aboveGround: r(c.geometry.aboveGround, !1)
      })
    });
    return m.appearance.material = new u(c.material), m.id = c.id || o(), m.popupEnabled = c.popupEnabled, c.popupTemplate && (m.popupTemplate = {
      title: c.popupTemplate.title,
      content: c.popupTemplate.content
    }), m;
  };
});