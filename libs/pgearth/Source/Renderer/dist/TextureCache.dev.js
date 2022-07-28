"use strict";

define(["../Core/defined", "../Core/defineProperties", "../Core/destroyObject"], function (r, e, s) {
  "use strict";

  function t() {
    this._textures = {}, this._numberOfTextures = 0, this._texturesToRelease = {};
  }

  return e(t.prototype, {
    numberOfTextures: {
      get: function get() {
        return this._numberOfTextures;
      }
    }
  }), t.prototype.getTexture = function (e) {
    var t = this._textures[e];
    if (r(t)) return delete this._texturesToRelease[e], ++t.count, t.texture;
  }, t.prototype.addTexture = function (e, t) {
    var r = {
      texture: t,
      count: 1
    };
    t.finalDestroy = t.destroy;
    var s = this;
    t.destroy = function () {
      0 == --r.count && (s._texturesToRelease[e] = r);
    }, this._textures[e] = r, ++this._numberOfTextures;
  }, t.prototype.destroyReleasedTextures = function () {
    var e,
        t = this._texturesToRelease;

    for (var r in t) {
      t.hasOwnProperty(r) && (e = t[r], delete this._textures[r], e.texture.finalDestroy(), --this._numberOfTextures);
    }

    this._texturesToRelease = {};
  }, t.prototype.isDestroyed = function () {
    return !1;
  }, t.prototype.destroy = function () {
    var e = this._textures;

    for (var t in e) {
      e.hasOwnProperty(t) && e[t].texture.finalDestroy();
    }

    return s(this);
  }, t;
});