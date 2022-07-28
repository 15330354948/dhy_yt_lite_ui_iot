"use strict";

define(["../../Core/defaultValue", "../../Core/defined", "../../Core/defineProperties", "../../Core/DeveloperError", "../../ThirdParty/knockout", "../createCommand"], function (e, i, o, n, r, c) {
  "use strict";

  function t(o) {
    if (!i(o.name)) throw new n("options.name is required.");
    if (!i(o.tooltip)) throw new n("options.tooltip is required.");
    if (!i(o.iconUrl)) throw new n("options.iconUrl is required.");
    if ("function" != typeof o.creationFunction) throw new n("options.creationFunction is required.");
    var t = o.creationFunction;
    i(t.canExecute) || (t = c(t)), this._creationCommand = t, this.name = o.name, this.tooltip = o.tooltip, this.iconUrl = o.iconUrl, this._category = e(o.category, ""), r.track(this, ["name", "tooltip", "iconUrl"]);
  }

  return o(t.prototype, {
    creationCommand: {
      get: function get() {
        return this._creationCommand;
      }
    },
    category: {
      get: function get() {
        return this._category;
      }
    }
  }), t;
});