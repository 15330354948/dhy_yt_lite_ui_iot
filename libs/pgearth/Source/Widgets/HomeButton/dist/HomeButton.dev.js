"use strict";

define(["../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/DeveloperError", "../../ThirdParty/knockout", "../getElement", "./HomeButtonViewModel"], function (i, t, e, h, a, d, s) {
  "use strict";

  function n(t, e, n) {
    if (!i(t)) throw new h("container is required.");
    t = d(t);
    var o = new s(e, n);
    o._svgPath = "M14,4l-10,8.75h20l-4.25-3.7188v-4.6562h-2.812v2.1875l-2.938-2.5625zm-7.0938,9.906v10.094h14.094v-10.094h-14.094zm2.1876,2.313h3.3122v4.25h-3.3122v-4.25zm5.8442,1.281h3.406v6.438h-3.406v-6.438z";
    var r = document.createElement("button");
    r.type = "button", r.className = "pgEarth-button pgEarth-toolbar-button pgEarth-home-button", r.setAttribute("data-bind", "attr: { title: tooltip },click: command,pgEarthSvgPath: { path: _svgPath, width: 28, height: 28 }"), t.appendChild(r), a.applyBindings(o, r), this._container = t, this._viewModel = o, this._element = r;
  }

  return t(n.prototype, {
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
    return a.cleanNode(this._element), this._container.removeChild(this._element), e(this);
  }, n;
});