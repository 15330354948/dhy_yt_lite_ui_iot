"use strict";

define(["../Source/Core/Check", "../Source/Core/defaultValue", "../Source/DataSources/Entity", "../Source/Core/RuntimeError", "../Source/Core/Transforms", "./symbols/Symbols", "./geometry/GraphicsGeometry"], function (e, o, t, p, r, i, n) {
  return function (l) {
    if (!l) throw new p("options is required");
    if (e.typeOf.object("options", l), !l) throw new p("geometry is required");
    if (e.typeOf.object("geometry", l.geometry), !l.symbol) throw new p("symbol is required");
    e.typeOf.object("symbol", l.symbol), l.popupTemplate && e.typeOf.object("options", l.popupTemplate), o(l.geometry.longitude, 0), o(l.geometry.latitude, 0);
    var s = new i(l.symbol),
        u = new n(l.geometry),
        m = {};
    m = "point" !== u.type ? Object.assign(s, u) : s;
    var y = {
      show: o(l.visible, !0),
      position: u
    };
    "web-style" === l.symbol.type && (y.orientation = r.headingPitchRollQuaternion(u, s.hpr)), l.id && (y.id = l.id), m.symbolKey && (y[m.symbolKey] = m);
    var a = new t(y);
    return a.popupEnabled = l.popupEnabled, l.popupTemplate && (a.popupTemplate = {
      id: l.popupTemplate.id,
      title: l.popupTemplate.title,
      content: l.popupTemplate.content,
      actions: l.popupTemplate.actions
    }), a;
  };
});