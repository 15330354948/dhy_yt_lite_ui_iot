"use strict";

define(["../Core/Check", "../Core/createGuid", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject"], function (n, s, i, d, e, r) {
  "use strict";

  function t(e) {
    e = i(e, i.EMPTY_OBJECT), n.defined("options.stages", e.stages), n.typeOf.number.greaterThan("options.stages.length", e.stages.length, 0), this._stages = e.stages, this._inputPreviousStageTexture = i(e.inputPreviousStageTexture, !0);
    var t = e.name;
    d(t) || (t = s()), this._name = t, this._uniforms = e.uniforms, this._textureCache = void 0, this._index = void 0, this._selected = void 0, this._selectedShadow = void 0, this._parentSelected = void 0, this._parentSelectedShadow = void 0, this._combinedSelected = void 0, this._combinedSelectedShadow = void 0, this._selectedLength = 0, this._parentSelectedLength = 0, this._selectedDirty = !0;
  }

  return e(t.prototype, {
    ready: {
      get: function get() {
        for (var e = this._stages, t = e.length, n = 0; n < t; ++n) {
          if (!e[n].ready) return !1;
        }

        return !0;
      }
    },
    name: {
      get: function get() {
        return this._name;
      }
    },
    enabled: {
      get: function get() {
        return this._stages[0].enabled;
      },
      set: function set(e) {
        for (var t = this._stages, n = t.length, s = 0; s < n; ++s) {
          t[s].enabled = e;
        }
      }
    },
    uniforms: {
      get: function get() {
        return this._uniforms;
      }
    },
    inputPreviousStageTexture: {
      get: function get() {
        return this._inputPreviousStageTexture;
      }
    },
    length: {
      get: function get() {
        return this._stages.length;
      }
    },
    selected: {
      get: function get() {
        return this._selected;
      },
      set: function set(e) {
        this._selected = e;
      }
    },
    parentSelected: {
      get: function get() {
        return this._parentSelected;
      },
      set: function set(e) {
        this._parentSelected = e;
      }
    }
  }), t.prototype._isSupported = function (e) {
    for (var t = this._stages, n = t.length, s = 0; s < n; ++s) {
      if (!t[s]._isSupported(e)) return !1;
    }

    return !0;
  }, t.prototype.get = function (e) {
    return n.typeOf.number.greaterThanOrEquals("index", e, 0), n.typeOf.number.lessThan("index", e, this.length), this._stages[e];
  }, t.prototype.update = function (e, t) {
    this._selectedDirty = function (e) {
      var t = d(e._selected) ? e._selected.length : 0,
          n = d(e._parentSelected) ? e._parentSelected : 0,
          s = (s = e._selected !== e._selectedShadow || t !== e._selectedLength) || e._parentSelected !== e._parentSelectedShadow || n !== e._parentSelectedLength;

      if (d(e._selected) && d(e._parentSelected) ? e._combinedSelected = e._selected.concat(e._parentSelected) : d(e._parentSelected) ? e._combinedSelected = e._parentSelected : e._combinedSelected = e._selected, !s && d(e._combinedSelected)) {
        if (!d(e._combinedSelectedShadow)) return !0;
        t = e._combinedSelected.length;

        for (var i = 0; i < t; ++i) {
          if (e._combinedSelected[i] !== e._combinedSelectedShadow[i]) return !0;
        }
      }

      return s;
    }(this), this._selectedShadow = this._selected, this._parentSelectedShadow = this._parentSelected, this._combinedSelectedShadow = this._combinedSelected, this._selectedLength = d(this._selected) ? this._selected.length : 0, this._parentSelectedLength = d(this._parentSelected) ? this._parentSelected.length : 0;

    for (var n = this._stages, s = n.length, i = 0; i < s; ++i) {
      var r = n[i];
      this._selectedDirty && (r.parentSelected = this._combinedSelected), r.update(e, t);
    }
  }, t.prototype.isDestroyed = function () {
    return !1;
  }, t.prototype.destroy = function () {
    for (var e = this._stages, t = e.length, n = 0; n < t; ++n) {
      e[n].destroy();
    }

    return r(this);
  }, t;
});