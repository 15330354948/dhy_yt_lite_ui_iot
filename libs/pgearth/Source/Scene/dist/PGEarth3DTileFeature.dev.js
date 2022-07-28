"use strict";

define(["../Core/Color", "../Core/defined", "../Core/defineProperties"], function (t, e, n) {
  "use strict";

  function o(t, e) {
    this._content = t, this._batchId = e, this._color = void 0;
  }

  return n(o.prototype, {
    show: {
      get: function get() {
        return this._content.batchTable.getShow(this._batchId);
      },
      set: function set(t) {
        this._content.batchTable.setShow(this._batchId, t);
      }
    },
    color: {
      get: function get() {
        return e(this._color) || (this._color = new t()), this._content.batchTable.getColor(this._batchId, this._color);
      },
      set: function set(t) {
        this._content.batchTable.setColor(this._batchId, t);
      }
    },
    content: {
      get: function get() {
        return this._content;
      }
    },
    tileset: {
      get: function get() {
        return this._content.tileset;
      }
    },
    primitive: {
      get: function get() {
        return this._content.tileset;
      }
    },
    pickId: {
      get: function get() {
        return this._content.batchTable.getPickColor(this._batchId);
      }
    }
  }), o.prototype.hasProperty = function (t) {
    return this._content.batchTable.hasProperty(this._batchId, t);
  }, o.prototype.getPropertyNames = function (t) {
    return this._content.batchTable.getPropertyNames(this._batchId, t);
  }, o.prototype.getProperty = function (t) {
    return this._content.batchTable.getProperty(this._batchId, t);
  }, o.prototype.setProperty = function (t, e) {
    this._content.batchTable.setProperty(this._batchId, t, e), this._content.featurePropertiesDirty = !0;
  }, o.prototype.isExactClass = function (t) {
    return this._content.batchTable.isExactClass(this._batchId, t);
  }, o.prototype.isClass = function (t) {
    return this._content.batchTable.isClass(this._batchId, t);
  }, o.prototype.getExactClassName = function () {
    return this._content.batchTable.getExactClassName(this._batchId);
  }, o;
});