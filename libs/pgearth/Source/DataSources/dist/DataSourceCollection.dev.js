"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Event", "../Core/Math", "../ThirdParty/when"], function (i, r, t, e, a, o, n, s) {
  "use strict";

  function d() {
    this._dataSources = [], this._dataSourceAdded = new o(), this._dataSourceRemoved = new o(), this._dataSourceMoved = new o();
  }

  function u(t, e) {
    if (!r(e)) throw new a("dataSource is required.");
    var o = t.indexOf(e);
    if (-1 === o) throw new a("dataSource is not in this collection.");
    return o;
  }

  function c(t, e, o) {
    var r,
        a = t._dataSources,
        i = a.length - 1;
    (e = n.clamp(e, 0, i)) !== (o = n.clamp(o, 0, i)) && (r = a[e], a[e] = a[o], a[o] = r, t.dataSourceMoved.raiseEvent(r, o, e));
  }

  return t(d.prototype, {
    length: {
      get: function get() {
        return this._dataSources.length;
      }
    },
    dataSourceAdded: {
      get: function get() {
        return this._dataSourceAdded;
      }
    },
    dataSourceRemoved: {
      get: function get() {
        return this._dataSourceRemoved;
      }
    },
    dataSourceMoved: {
      get: function get() {
        return this._dataSourceMoved;
      }
    }
  }), d.prototype.add = function (t) {
    if (!r(t)) throw new a("dataSource is required.");
    var e = this,
        o = this._dataSources;
    return s(t, function (t) {
      return o === e._dataSources && (e._dataSources.push(t), e._dataSourceAdded.raiseEvent(e, t)), t;
    });
  }, d.prototype.remove = function (t, e) {
    e = i(e, !1);

    var o = this._dataSources.indexOf(t);

    return -1 !== o && (this._dataSources.splice(o, 1), this._dataSourceRemoved.raiseEvent(this, t), e && "function" == typeof t.destroy && t.destroy(), !0);
  }, d.prototype.removeAll = function (t) {
    t = i(t, !1);

    for (var e = this._dataSources, o = 0, r = e.length; o < r; ++o) {
      var a = e[o];
      this._dataSourceRemoved.raiseEvent(this, a), t && "function" == typeof a.destroy && a.destroy();
    }

    this._dataSources = [];
  }, d.prototype.contains = function (t) {
    return -1 !== this.indexOf(t);
  }, d.prototype.indexOf = function (t) {
    return this._dataSources.indexOf(t);
  }, d.prototype.get = function (t) {
    if (!r(t)) throw new a("index is required.");
    return this._dataSources[t];
  }, d.prototype.raise = function (t) {
    var e = u(this._dataSources, t);
    c(this, e, e + 1);
  }, d.prototype.lower = function (t) {
    var e = u(this._dataSources, t);
    c(this, e, e - 1);
  }, d.prototype.raiseToTop = function (t) {
    var e = u(this._dataSources, t);
    e !== this._dataSources.length - 1 && (this._dataSources.splice(e, 1), this._dataSources.push(t), this.dataSourceMoved.raiseEvent(t, this._dataSources.length - 1, e));
  }, d.prototype.lowerToBottom = function (t) {
    var e = u(this._dataSources, t);
    0 !== e && (this._dataSources.splice(e, 1), this._dataSources.splice(0, 0, t), this.dataSourceMoved.raiseEvent(t, 0, e));
  }, d.prototype.isDestroyed = function () {
    return !1;
  }, d.prototype.destroy = function () {
    return this.removeAll(!0), e(this);
  }, d;
});