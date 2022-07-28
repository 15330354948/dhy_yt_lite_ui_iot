"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/Event", "../Core/TranslationRotationScale", "./createPropertyDescriptor", "./Property"], function (n, i, t, o, a, e, s) {
  "use strict";

  function r(t) {
    t = n(t, n.EMPTY_OBJECT), this._definitionChanged = new o(), this._translation = void 0, this._translationSubscription = void 0, this._rotation = void 0, this._rotationSubscription = void 0, this._scale = void 0, this._scaleSubscription = void 0, this.translation = t.translation, this.rotation = t.rotation, this.scale = t.scale;
  }

  var l = new a();
  return t(r.prototype, {
    isConstant: {
      get: function get() {
        return s.isConstant(this._translation) && s.isConstant(this._rotation) && s.isConstant(this._scale);
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    translation: e("translation"),
    rotation: e("rotation"),
    scale: e("scale")
  }), r.prototype.getValue = function (t, n) {
    return i(n) || (n = new a()), n.translation = s.getValueOrClonedDefault(this._translation, t, l.translation, n.translation), n.rotation = s.getValueOrClonedDefault(this._rotation, t, l.rotation, n.rotation), n.scale = s.getValueOrClonedDefault(this._scale, t, l.scale, n.scale), n;
  }, r.prototype.equals = function (t) {
    return this === t || t instanceof r && s.equals(this._translation, t._translation) && s.equals(this._rotation, t._rotation) && s.equals(this._scale, t._scale);
  }, r;
});