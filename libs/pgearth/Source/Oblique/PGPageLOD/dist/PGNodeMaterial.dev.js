"use strict";

define(["./PGELoadStatus", "../../Core/Color"], function (i, t) {
  "use strict";

  return function () {
    this.id = -1, this.status = i.PG_UNLOAD, this.imgUrl = "", this.bImgBlobUrl = !1, this.transparent = !1, this.imgBlob = void 0, this.width = 0, this.height = 0, this.pixelFormat = 0, this.color = new t(), this.ambient = new t(), this.specular = new t(), this.shininess = 30, this.emissive = new t(), this.emissiveIntensity = 1, this.texture = void 0, this.color = new t(1, 1, 0, 1);
  };
});