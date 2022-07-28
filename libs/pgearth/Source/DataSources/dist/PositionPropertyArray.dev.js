"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/EventHelper", "../Core/ReferenceFrame", "./Property"], function (t, s, e, u, n, i, a, o) {
  "use strict";

  function f(e, r) {
    this._value = void 0, this._definitionChanged = new n(), this._eventHelper = new i(), this._referenceFrame = t(r, a.FIXED), this.setValue(e);
  }

  return e(f.prototype, {
    isConstant: {
      get: function get() {
        var e = this._value;
        if (!s(e)) return !0;

        for (var r = e.length, t = 0; t < r; t++) {
          if (!o.isConstant(e[t])) return !1;
        }

        return !0;
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    referenceFrame: {
      get: function get() {
        return this._referenceFrame;
      }
    }
  }), f.prototype.getValue = function (e, r) {
    return this.getValueInReferenceFrame(e, a.FIXED, r);
  }, f.prototype.getValueInReferenceFrame = function (e, r, t) {
    if (!s(e)) throw new u("time is required.");
    if (!s(r)) throw new u("referenceFrame is required.");
    var n = this._value;

    if (s(n)) {
      var i = n.length;
      s(t) || (t = new Array(i));

      for (var a = 0, o = 0; a < i;) {
        var f = n[a].getValueInReferenceFrame(e, r, t[a]);
        s(f) && (t[o] = f, o++), a++;
      }

      return t.length = o, t;
    }
  }, f.prototype.setValue = function (e) {
    var r = this._eventHelper;

    if (r.removeAll(), s(e)) {
      this._value = e.slice();

      for (var t = e.length, n = 0; n < t; n++) {
        var i = e[n];
        s(i) && r.add(i.definitionChanged, f.prototype._raiseDefinitionChanged, this);
      }
    } else this._value = void 0;

    this._definitionChanged.raiseEvent(this);
  }, f.prototype.equals = function (e) {
    return this === e || e instanceof f && this._referenceFrame === e._referenceFrame && o.arrayEquals(this._value, e._value);
  }, f.prototype._raiseDefinitionChanged = function () {
    this._definitionChanged.raiseEvent(this);
  }, f;
});