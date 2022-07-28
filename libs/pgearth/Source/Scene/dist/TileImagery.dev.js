"use strict";

define(["../Core/defined", "./ImageryState"], function (o, c) {
  "use strict";

  function e(e, t, a) {
    this.readyImagery = void 0, this.loadingImagery = e, this.textureCoordinateRectangle = t, this.textureTranslationAndScale = void 0, this.useWebMercatorT = a;
  }

  return e.prototype.freeResources = function () {
    o(this.readyImagery) && this.readyImagery.releaseReference(), o(this.loadingImagery) && this.loadingImagery.releaseReference();
  }, e.prototype.processStateMachine = function (e, t, a) {
    var r = this.loadingImagery,
        s = r.imageryLayer;
    if (r.processStateMachine(t, !this.useWebMercatorT, a), r.state === c.READY) return o(this.readyImagery) && this.readyImagery.releaseReference(), this.readyImagery = this.loadingImagery, this.loadingImagery = void 0, this.textureTranslationAndScale = s._calculateTextureTranslationAndScale(e, this), !0;

    for (var i, n = r.parent; o(n) && (n.state !== c.READY || !this.useWebMercatorT && !o(n.texture));) {
      n.state !== c.FAILED && n.state !== c.INVALID && (i = i || n), n = n.parent;
    }

    return this.readyImagery !== n && (o(this.readyImagery) && this.readyImagery.releaseReference(), this.readyImagery = n, o(n) && (n.addReference(), this.textureTranslationAndScale = s._calculateTextureTranslationAndScale(e, this))), (r.state === c.FAILED || r.state === c.INVALID) && (!o(i) || (i.processStateMachine(t, !this.useWebMercatorT, a), !1));
  }, e;
});