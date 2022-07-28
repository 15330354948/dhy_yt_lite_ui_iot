"use strict";

define(["../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/DeveloperError", "../../Core/FeatureDetection", "../../ThirdParty/knockout", "../getElement", "./ProjectionPickerViewModel"], function (c, t, e, h, a, s, d, g) {
  "use strict";

  function o(t, e) {
    if (!c(t)) throw new h("container is required.");
    if (!c(e)) throw new h("scene is required.");
    t = d(t);
    var o = new g(e);
    o._perspectivePath = "M 28.15625,10.4375 9.125,13.21875 13.75,43.25 41.75,55.09375 50.8125,37 54.5,11.9375 z m 0.125,3 19.976451,0.394265 L 43.03125,16.875 22.6875,14.28125 z M 50.971746,15.705477 47.90625,36.03125 42.53125,46 44.84375,19.3125 z M 12.625,16.03125 l 29.15625,3.6875 -2.65625,31 L 16.4375,41.125 z", o._orthographicPath = "m 31.560594,6.5254438 -20.75,12.4687502 0.1875,24.5625 22.28125,11.8125 19.5,-12 0.65625,-0.375 0,-0.75 0.0312,-23.21875 z m 0.0625,3.125 16.65625,9.5000002 -16.125,10.28125 -17.34375,-9.71875 z m 18.96875,11.1875002 0.15625,20.65625 -17.46875,10.59375 0.15625,-20.28125 z m -37.0625,1.25 17.21875,9.625 -0.15625,19.21875 -16.9375,-9 z";
    var r = document.createElement("span");
    r.className = "pgEarth-projectionPicker-wrapper pgEarth-toolbar-button", t.appendChild(r);
    var i = document.createElement("button");
    i.type = "button", i.className = "pgEarth-button pgEarth-toolbar-button", i.setAttribute("data-bind", 'css: { "pgEarth-projectionPicker-buttonPerspective": !_orthographic,       "pgEarth-projectionPicker-buttonOrthographic": _orthographic,       "pgEarth-button-disabled" : sceneMode === _sceneMode.SCENE2D || _flightInProgress,        "pgEarth-projectionPicker-selected": dropDownVisible },attr: { title: selectedTooltip },click: toggleDropDown'), i.innerHTML = '\x3c!-- ko pgEarthSvgPath: { path: _perspectivePath, width: 64, height: 64, css: "pgEarth-projectionPicker-iconPerspective" } --\x3e\x3c!-- /ko --\x3e\x3c!-- ko pgEarthSvgPath: { path: _orthographicPath, width: 64, height: 64, css: "pgEarth-projectionPicker-iconOrthographic" } --\x3e\x3c!-- /ko --\x3e', r.appendChild(i);
    var n = document.createElement("button");
    n.type = "button", n.className = "pgEarth-button pgEarth-toolbar-button pgEarth-projectionPicker-dropDown-icon", n.setAttribute("data-bind", 'css: { "pgEarth-projectionPicker-visible" : (dropDownVisible && _orthographic),       "pgEarth-projectionPicker-none" : !_orthographic,       "pgEarth-projectionPicker-hidden" : !dropDownVisible },attr: { title: tooltipPerspective },click: switchToPerspective,pgEarthSvgPath: { path: _perspectivePath, width: 64, height: 64 }'), r.appendChild(n);
    var p = document.createElement("button");
    p.type = "button", p.className = "pgEarth-button pgEarth-toolbar-button pgEarth-projectionPicker-dropDown-icon", p.setAttribute("data-bind", 'css: { "pgEarth-projectionPicker-visible" : (dropDownVisible && !_orthographic),       "pgEarth-projectionPicker-none" : _orthographic,       "pgEarth-projectionPicker-hidden" : !dropDownVisible},attr: { title: tooltipOrthographic },click: switchToOrthographic,pgEarthSvgPath: { path: _orthographicPath, width: 64, height: 64 }'), r.appendChild(p), s.applyBindings(o, r), this._viewModel = o, this._container = t, this._wrapper = r, this._closeDropDown = function (t) {
      r.contains(t.target) || (o.dropDownVisible = !1);
    }, a.supportsPointerEvents() ? document.addEventListener("pointerdown", this._closeDropDown, !0) : (document.addEventListener("mousedown", this._closeDropDown, !0), document.addEventListener("touchstart", this._closeDropDown, !0));
  }

  return t(o.prototype, {
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
  }), o.prototype.isDestroyed = function () {
    return !1;
  }, o.prototype.destroy = function () {
    return this._viewModel.destroy(), a.supportsPointerEvents() ? document.removeEventListener("pointerdown", this._closeDropDown, !0) : (document.removeEventListener("mousedown", this._closeDropDown, !0), document.removeEventListener("touchstart", this._closeDropDown, !0)), s.cleanNode(this._wrapper), this._container.removeChild(this._wrapper), e(this);
  }, o;
});