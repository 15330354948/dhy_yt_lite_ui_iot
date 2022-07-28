"use strict";

define(["../../Core/defined", "../../Core/defineProperties", "../../Core/DeveloperError", "../../ThirdParty/knockout", "../createCommand"], function (i, e, o, r, s) {
  "use strict";

  function t(e, t) {
    if (!i(e)) throw new o("scene is required.");
    this._scene = e, this._duration = t;
    var n = this;
    this._command = s(function () {
      n._scene.camera.flyHome(n._duration);
    }), this.tooltip = "View Home", r.track(this, ["tooltip"]);
  }

  return e(t.prototype, {
    scene: {
      get: function get() {
        return this._scene;
      }
    },
    command: {
      get: function get() {
        return this._command;
      }
    },
    duration: {
      get: function get() {
        return this._duration;
      },
      set: function set(e) {
        if (i(e) && e < 0) throw new o("value must be positive.");
        this._duration = e;
      }
    }
  }), t;
});