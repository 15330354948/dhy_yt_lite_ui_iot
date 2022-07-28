"use strict";

define(["../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/DeveloperError", "../../ThirdParty/knockout", "../getElement", "./PerformanceWatchdogViewModel"], function (s, e, t, a, d, c, m) {
  "use strict";

  function n(e) {
    if (!s(e) || !s(e.container)) throw new a("options.container is required.");
    if (!s(e.scene)) throw new a("options.scene is required.");
    var t = c(e.container),
        n = new m(e),
        r = document.createElement("div");
    r.className = "pgEarth-performance-watchdog-message-area", r.setAttribute("data-bind", "visible: showingLowFrameRateMessage");
    var i = document.createElement("button");
    i.setAttribute("type", "button"), i.className = "pgEarth-performance-watchdog-message-dismiss", i.innerHTML = "&times;", i.setAttribute("data-bind", "click: dismissMessage"), r.appendChild(i);
    var o = document.createElement("div");
    o.className = "pgEarth-performance-watchdog-message", o.setAttribute("data-bind", "html: lowFrameRateMessage"), r.appendChild(o), t.appendChild(r), d.applyBindings(n, r), this._container = t, this._viewModel = n, this._element = r;
  }

  return e(n.prototype, {
    container: {
      get: function get() {
        return this._container;
      }
    },
    viewModel: {
      get: function get() {
        return this._viewModel;
      }
    }
  }), n.prototype.isDestroyed = function () {
    return !1;
  }, n.prototype.destroy = function () {
    return this._viewModel.destroy(), d.cleanNode(this._element), this._container.removeChild(this._element), t(this);
  }, n;
});