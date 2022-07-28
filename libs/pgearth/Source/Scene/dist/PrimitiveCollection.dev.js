"use strict";

define(["../Core/createGuid", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError"], function (e, i, o, t, r, s) {
  "use strict";

  function n(t) {
    t = i(t, i.EMPTY_OBJECT), this._primitives = [], this._guid = e(), this._zIndex = void 0, this.show = i(t.show, !0), this.destroyPrimitives = i(t.destroyPrimitives, !0);
  }

  function p(t, e) {
    if (!t.contains(e)) throw new s("primitive is not in this collection.");
    return t._primitives.indexOf(e);
  }

  return t(n.prototype, {
    length: {
      get: function get() {
        return this._primitives.length;
      }
    }
  }), n.prototype.add = function (t) {
    if (!o(t)) throw new s("primitive is required.");
    var e = t._external = t._external || {};
    return (e._composites = e._composites || {})[this._guid] = {
      collection: this
    }, this._primitives.push(t), t;
  }, n.prototype.remove = function (t) {
    if (this.contains(t)) {
      var e = this._primitives.indexOf(t);

      if (-1 !== e) return this._primitives.splice(e, 1), delete t._external._composites[this._guid], this.destroyPrimitives && t.destroy(), !0;
    }

    return !1;
  }, n.prototype.removeAndDestroy = function (t) {
    var e = this.remove(t);
    return e && !this.destroyPrimitives && t.destroy(), e;
  }, n.prototype.removeAll = function () {
    for (var t = this._primitives, e = t.length, i = 0; i < e; ++i) {
      delete t[i]._external._composites[this._guid], this.destroyPrimitives && t[i].destroy();
    }

    this._primitives = [];
  }, n.prototype.contains = function (t) {
    return !!(o(t) && t._external && t._external._composites && t._external._composites[this._guid]);
  }, n.prototype.raise = function (t) {
    var e, i, r;
    !o(t) || (e = p(this, t)) !== (i = this._primitives).length - 1 && (r = i[e], i[e] = i[e + 1], i[e + 1] = r);
  }, n.prototype.raiseToTop = function (t) {
    var e, i;
    !o(t) || (e = p(this, t)) !== (i = this._primitives).length - 1 && (i.splice(e, 1), i.push(t));
  }, n.prototype.lower = function (t) {
    var e, i, r;
    o(t) && (e = p(this, t), i = this._primitives, 0 !== e && (r = i[e], i[e] = i[e - 1], i[e - 1] = r));
  }, n.prototype.lowerToBottom = function (t) {
    var e, i;
    o(t) && (e = p(this, t), i = this._primitives, 0 !== e && (i.splice(e, 1), i.unshift(t)));
  }, n.prototype.get = function (t) {
    if (!o(t)) throw new s("index is required.");
    return this._primitives[t];
  }, n.prototype.update = function (t) {
    if (this.show) for (var e = this._primitives, i = 0; i < e.length; ++i) {
      e[i].update(t);
    }
  }, n.prototype.prePassesUpdate = function (t) {
    for (var e = this._primitives, i = 0; i < e.length; ++i) {
      var r = e[i];
      o(r.prePassesUpdate) && r.prePassesUpdate(t);
    }
  }, n.prototype.updateForPass = function (t, e) {
    for (var i = this._primitives, r = 0; r < i.length; ++r) {
      var s = i[r];
      o(s.updateForPass) && s.updateForPass(t, e);
    }
  }, n.prototype.postPassesUpdate = function (t) {
    for (var e = this._primitives, i = 0; i < e.length; ++i) {
      var r = e[i];
      o(r.postPassesUpdate) && r.postPassesUpdate(t);
    }
  }, n.prototype.isDestroyed = function () {
    return !1;
  }, n.prototype.destroy = function () {
    return this.removeAll(), r(this);
  }, n;
});