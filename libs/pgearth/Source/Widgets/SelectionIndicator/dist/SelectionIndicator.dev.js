"use strict";

define(["../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/DeveloperError", "../../ThirdParty/knockout", "../getElement", "./SelectionIndicatorViewModel"], function (d, e, t, c, l, h, p) {
  "use strict";

  function r(e, t) {
    if (!d(e)) throw new c("container is required.");
    e = h(e), this._container = e;
    var r = document.createElement("div");
    r.className = "pgEarth-selection-wrapper", r.setAttribute("data-bind", 'style: { "top" : _screenPositionY, "left" : _screenPositionX },css: { "pgEarth-selection-wrapper-visible" : isVisible }'), e.appendChild(r), this._element = r;
    var i = "http://www.w3.org/2000/svg",
        n = document.createElementNS(i, "svg:svg");
    n.setAttribute("width", 160), n.setAttribute("height", 160), n.setAttribute("viewBox", "0 0 160 160");
    var o = document.createElementNS(i, "g");
    o.setAttribute("transform", "translate(80,80)"), n.appendChild(o);
    var s = document.createElementNS(i, "path");
    s.setAttribute("data-bind", "attr: { transform: _transform }"), s.setAttribute("d", "M -34 -34 L -34 -11.25 L -30 -15.25 L -30 -30 L -15.25 -30 L -11.25 -34 L -34 -34 z M 11.25 -34 L 15.25 -30 L 30 -30 L 30 -15.25 L 34 -11.25 L 34 -34 L 11.25 -34 z M -34 11.25 L -34 34 L -11.25 34 L -15.25 30 L -30 30 L -30 15.25 L -34 11.25 z M 34 11.25 L 30 15.25 L 30 30 L 15.25 30 L 11.25 34 L 34 34 L 34 11.25 z"), o.appendChild(s), r.appendChild(n);
    var a = new p(t, this._element, this._container);
    this._viewModel = a, l.applyBindings(this._viewModel, this._element);
  }

  return e(r.prototype, {
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
  }), r.prototype.isDestroyed = function () {
    return !1;
  }, r.prototype.destroy = function () {
    var e = this._container;
    return l.cleanNode(this._element), e.removeChild(this._element), t(this);
  }, r;
});