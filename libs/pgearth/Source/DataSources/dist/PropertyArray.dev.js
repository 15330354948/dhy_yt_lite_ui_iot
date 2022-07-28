"use strict";

define(["../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/EventHelper", "./Property"], function (s, e, h, t, i, n) {
  "use strict";

  function o(e) {
    this._value = void 0, this._definitionChanged = new t(), this._eventHelper = new i(), this.setValue(e);
  }

  return e(o.prototype, {
    isConstant: {
      get: function get() {
        var e = this._value;
        if (!s(e)) return !0;

        for (var t = e.length, i = 0; i < t; i++) {
          if (!n.isConstant(e[i])) return !1;
        }

        return !0;
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    }
  }), o.prototype.getValue = function (e, t) {
    if (!s(e)) throw new h("time is required.");
    var i = this._value;

    if (s(i)) {
      var n = i.length;
      s(t) || (t = new Array(n));

      for (var r = 0, o = 0; r < n;) {
        var a = this._value[r].getValue(e, t[r]);

        s(a) && (t[o] = a, o++), r++;
      }

      return t.length = o, t;
    }
  }, o.prototype.setValue = function (e) {
    var t = this._eventHelper;

    if (t.removeAll(), s(e)) {
      this._value = e.slice();

      for (var i = e.length, n = 0; n < i; n++) {
        var r = e[n];
        s(r) && t.add(r.definitionChanged, o.prototype._raiseDefinitionChanged, this);
      }
    } else this._value = void 0;

    this._definitionChanged.raiseEvent(this);
  }, o.prototype.equals = function (e) {
    return this === e || e instanceof o && n.arrayEquals(this._value, e._value);
  }, o.prototype._raiseDefinitionChanged = function () {
    this._definitionChanged.raiseEvent(this);
  }, o;
});