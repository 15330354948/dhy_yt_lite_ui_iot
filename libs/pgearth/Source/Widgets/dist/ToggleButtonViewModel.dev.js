"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../ThirdParty/knockout"], function (o, r, t, i, n) {
  "use strict";

  function e(t, e) {
    if (!r(t)) throw new i("command is required.");
    this._command = t, e = o(e, o.EMPTY_OBJECT), this.toggled = o(e.toggled, !1), this.tooltip = o(e.tooltip, ""), n.track(this, ["toggled", "tooltip"]);
  }

  return t(e.prototype, {
    command: {
      get: function get() {
        return this._command;
      }
    }
  }), e;
});