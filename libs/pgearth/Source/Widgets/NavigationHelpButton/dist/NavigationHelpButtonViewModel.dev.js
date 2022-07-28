"use strict";

define(["../../Core/defineProperties", "../../ThirdParty/knockout", "../createCommand"], function (t, o, n) {
  "use strict";

  function i() {
    this.showInstructions = !1;
    var t = this;
    this._command = n(function () {
      t.showInstructions = !t.showInstructions;
    }), this._showClick = n(function () {
      t._touch = !1;
    }), this._showTouch = n(function () {
      t._touch = !0;
    }), this._touch = !1, this.tooltip = "Navigation Instructions", o.track(this, ["tooltip", "showInstructions", "_touch"]);
  }

  return t(i.prototype, {
    command: {
      get: function get() {
        return this._command;
      }
    },
    showClick: {
      get: function get() {
        return this._showClick;
      }
    },
    showTouch: {
      get: function get() {
        return this._showTouch;
      }
    }
  }), i;
});