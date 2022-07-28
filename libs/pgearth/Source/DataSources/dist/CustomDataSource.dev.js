"use strict";

define(["../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "./DataSource", "./EntityCluster", "./EntityCollection"], function (e, t, n, i, o, s, r) {
  "use strict";

  function c(t) {
    this._name = t, this._clock = void 0, this._changed = new i(), this._error = new i(), this._isLoading = !1, this._loading = new i(), this._entityCollection = new r(this), this._entityCluster = new s();
  }

  return t(c.prototype, {
    name: {
      get: function get() {
        return this._name;
      },
      set: function set(t) {
        this._name !== t && (this._name = t, this._changed.raiseEvent(this));
      }
    },
    clock: {
      get: function get() {
        return this._clock;
      },
      set: function set(t) {
        this._clock !== t && (this._clock = t, this._changed.raiseEvent(this));
      }
    },
    entities: {
      get: function get() {
        return this._entityCollection;
      }
    },
    isLoading: {
      get: function get() {
        return this._isLoading;
      },
      set: function set(t) {
        o.setLoading(this, t);
      }
    },
    changedEvent: {
      get: function get() {
        return this._changed;
      }
    },
    errorEvent: {
      get: function get() {
        return this._error;
      }
    },
    loadingEvent: {
      get: function get() {
        return this._loading;
      }
    },
    show: {
      get: function get() {
        return this._entityCollection.show;
      },
      set: function set(t) {
        this._entityCollection.show = t;
      }
    },
    clustering: {
      get: function get() {
        return this._entityCluster;
      },
      set: function set(t) {
        if (!e(t)) throw new n("value must be defined.");
        this._entityCluster = t;
      }
    }
  }), c;
});