"use strict";

define(["../Core/defined", "../Core/destroyObject", "./ImageryState"], function (n, e, c) {
  "use strict";

  function r(e, t, r, i, s) {
    var a, h, o;
    this.imageryLayer = e, this.x = t, this.y = r, this.level = i, this.request = void 0, 0 !== i && (a = t / 2 | 0, h = r / 2 | 0, o = i - 1, this.parent = e.getImageryFromCache(a, h, o)), this.state = c.UNLOADED, this.imageUrl = void 0, this.image = void 0, this.texture = void 0, this.textureWebMercator = void 0, this.credits = void 0, this.referenceCount = 0, !n(s) && e.imageryProvider.ready && (s = e.imageryProvider.tilingScheme.tileXYToRectangle(t, r, i)), this.rectangle = s;
  }

  return r.createPlaceholder = function (e) {
    var t = new r(e, 0, 0, 0);
    return t.addReference(), t.state = c.PLACEHOLDER, t;
  }, r.prototype.addReference = function () {
    ++this.referenceCount;
  }, r.prototype.releaseReference = function () {
    return --this.referenceCount, 0 === this.referenceCount ? (this.imageryLayer.removeImageryFromCache(this), n(this.parent) && this.parent.releaseReference(), n(this.image) && n(this.image.destroy) && this.image.destroy(), n(this.texture) && this.texture.destroy(), n(this.textureWebMercator) && this.texture !== this.textureWebMercator && this.textureWebMercator.destroy(), e(this), 0) : this.referenceCount;
  }, r.prototype.processStateMachine = function (e, t, r) {
    this.state !== c.UNLOADED || r || (this.state = c.TRANSITIONING, this.imageryLayer._requestImagery(this)), this.state === c.RECEIVED && (this.state = c.TRANSITIONING, this.imageryLayer._createTexture(e.context, this));
    var i = this.state === c.READY && t && !this.texture;
    this.state !== c.TEXTURE_LOADED && !i || (this.state = c.TRANSITIONING, this.imageryLayer._reprojectTexture(e, this, t));
  }, r;
});