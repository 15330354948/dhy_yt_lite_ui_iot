"use strict";

define(["./defaultValue", "./defined", "./DeveloperError", "./Matrix4"], function (i, t, r, o) {
  "use strict";

  return function (e) {
    if (e = i(e, i.EMPTY_OBJECT), !t(e.geometry)) throw new r("options.geometry is required.");
    this.geometry = e.geometry, this.modelMatrix = o.clone(i(e.modelMatrix, o.IDENTITY)), this.id = e.id, this.pickPrimitive = e.pickPrimitive, this.attributes = i(e.attributes, {}), this.westHemisphereGeometry = void 0, this.eastHemisphereGeometry = void 0;
  };
});