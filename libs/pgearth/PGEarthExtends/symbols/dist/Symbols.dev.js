"use strict";

define(["../../Source/Core/defined", "../../Source/Core/RuntimeError", "./SimpleMarkerSymbol", "./PictureMarkerSymbol", "./WebStyleSymbol", "./BoxSymbol", "./SimpleLineSymbol", "./SimpleFillSymbol", "./TextSymbol", "./LineSymbol3D", "./PointSymbol3D", "./EllipseSymbol"], function (e, n, i, t, o, l, r, y, p, m, s, c) {
  return function (f) {
    if (!e(f)) throw new n("the options is required");
    return "simple-marker" !== f.type || f instanceof i ? "picture-marker" !== f.type || f instanceof t ? "simple-line" !== f.type || f instanceof r ? "simple-fill" !== f.type || f instanceof y ? "web-style" !== f.type || f instanceof o ? "box" !== f.type || f instanceof l ? "text" !== f.type || f instanceof p ? "line-3d" !== f.type || f instanceof m ? "point-3d" !== f.type || f instanceof s ? "ellipse" !== f.type || f instanceof c ? f : new c(f) : new s(f) : new m(f) : new p(f) : new l(f) : new o(f) : new y(f) : new r(f) : new t(f) : new i(f);
  };
});