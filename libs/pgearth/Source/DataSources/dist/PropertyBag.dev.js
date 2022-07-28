"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "./ConstantProperty", "./createPropertyDescriptor", "./Property"], function (n, h, e, f, t, r, o, p) {
  "use strict";

  function i(e, r) {
    this._propertyNames = [], this._definitionChanged = new t(), h(e) && this.merge(e, r);
  }

  function s(e) {
    return new r(e);
  }

  return e(i.prototype, {
    propertyNames: {
      get: function get() {
        return this._propertyNames;
      }
    },
    isConstant: {
      get: function get() {
        for (var e = this._propertyNames, r = 0, t = e.length; r < t; r++) {
          if (!p.isConstant(this[e[r]])) return !1;
        }

        return !0;
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    }
  }), i.prototype.hasProperty = function (e) {
    return -1 !== this._propertyNames.indexOf(e);
  }, i.prototype.addProperty = function (e, r, t) {
    var i = this._propertyNames;
    if (!h(e)) throw new f("propertyName is required.");
    if (-1 !== i.indexOf(e)) throw new f(e + " is already a registered property.");
    i.push(e), Object.defineProperty(this, e, o(e, !0, n(t, s))), h(r) && (this[e] = r), this._definitionChanged.raiseEvent(this);
  }, i.prototype.removeProperty = function (e) {
    var r = this._propertyNames.indexOf(e);

    if (!h(e)) throw new f("propertyName is required.");
    if (-1 === r) throw new f(e + " is not a registered property.");
    this._propertyNames.splice(r, 1), delete this[e], this._definitionChanged.raiseEvent(this);
  }, i.prototype.getValue = function (e, r) {
    if (!h(e)) throw new f("time is required.");
    h(r) || (r = {});

    for (var t = this._propertyNames, i = 0, n = t.length; i < n; i++) {
      var o = t[i];
      r[o] = p.getValueOrUndefined(this[o], e, r[o]);
    }

    return r;
  }, i.prototype.merge = function (e, r) {
    if (!h(e)) throw new f("source is required.");

    for (var t = this._propertyNames, i = h(e._propertyNames) ? e._propertyNames : Object.keys(e), n = 0, o = i.length; n < o; n++) {
      var s = i[n],
          p = this[s],
          a = e[s];
      void 0 === p && -1 === t.indexOf(s) && this.addProperty(s, void 0, r), void 0 !== a && (void 0 !== p ? h(p) && h(p.merge) && p.merge(a) : h(a) && h(a.merge) && h(a.clone) ? this[s] = a.clone() : this[s] = a);
    }
  }, i.prototype.equals = function (e) {
    return this === e || e instanceof i && function (e, r) {
      var t = e._propertyNames,
          i = r._propertyNames,
          n = t.length;
      if (n !== i.length) return !1;

      for (var o = 0; o < n; ++o) {
        var s = t[o];
        if (-1 === i.indexOf(s)) return !1;
        if (!p.equals(e[s], r[s])) return !1;
      }

      return !0;
    }(this, e);
  }, i;
});