"use strict";

define(["../../../Core/defineProperties", "../../../Core/defined", "../../../Core/DeveloperError", "./EditBoxGeometry"], function (i, n, t, d) {
  return function (e) {
    if (!n(e)) throw new t("viewer is required.");
    var r = document.createElement("div");
    r.className = "PowerGis-viewer-EditBoxGeometryContainer", e.container.appendChild(r);
    var o = new d(r, e);
    i(e, {
      boxEditBoxGeometry: {
        get: function get() {
          return o;
        }
      }
    });
  };
});