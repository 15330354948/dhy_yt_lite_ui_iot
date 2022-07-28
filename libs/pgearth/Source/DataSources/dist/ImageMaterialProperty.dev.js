"use strict";

define(["../Core/Cartesian2", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/Event", "./createPropertyDescriptor", "./Property"], function (e, t, r, i, o, a, n, s) {
  "use strict";

  var p = new e(1, 1),
      l = t.WHITE;

  function u(e) {
    e = r(e, r.EMPTY_OBJECT), this._definitionChanged = new a(), this._image = void 0, this._imageSubscription = void 0, this._repeat = void 0, this._repeatSubscription = void 0, this._color = void 0, this._colorSubscription = void 0, this._transparent = void 0, this._transparentSubscription = void 0, this.image = e.image, this.repeat = e.repeat, this.color = e.color, this.transparent = e.transparent;
  }

  return o(u.prototype, {
    isConstant: {
      get: function get() {
        return s.isConstant(this._image) && s.isConstant(this._repeat);
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    image: n("image"),
    repeat: n("repeat"),
    color: n("color"),
    transparent: n("transparent")
  }), u.prototype.getType = function (e) {
    return "Image";
  }, u.prototype.getValue = function (e, t) {
    return i(t) || (t = {}), t.image = s.getValueOrUndefined(this._image, e), t.repeat = s.getValueOrClonedDefault(this._repeat, e, p, t.repeat), t.color = s.getValueOrClonedDefault(this._color, e, l, t.color), s.getValueOrDefault(this._transparent, e, !1) && (t.color.alpha = Math.min(.99, t.color.alpha)), t;
  }, u.prototype.equals = function (e) {
    return this === e || e instanceof u && s.equals(this._image, e._image) && s.equals(this._color, e._color) && s.equals(this._transparent, e._transparent) && s.equals(this._repeat, e._repeat);
  }, u;
});