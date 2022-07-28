"use strict";

define(["../../../../Core/defined", "../../../../Core/defineProperties", "../../../../Core/DeveloperError", "../../../../ThirdParty/knockout"], function (e, t, i, s) {
  "use strict";

  function r(t) {
    if (!e(t)) throw new i("terria is required");
    this._terria = t, this.name = "Unnamed Control", this.text = void 0, this.svgIcon = void 0, this.svgHeight = void 0, this.svgWidth = void 0, this.cssClass = void 0, this.isActive = !1, s.track(this, ["name", "svgIcon", "svgHeight", "svgWidth", "cssClass", "isActive"]);
  }

  return t(r.prototype, {
    terria: {
      get: function get() {
        return this._terria;
      }
    },
    hasText: {
      get: function get() {
        return e(this.text) && "string" == typeof this.text;
      }
    }
  }), r.prototype.activate = function () {
    throw new i("activate must be implemented in the derived class.");
  }, r;
});