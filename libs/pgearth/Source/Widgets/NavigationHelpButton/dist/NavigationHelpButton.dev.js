"use strict";

define(["../../Core/buildModuleUrl", "../../Core/defaultValue", "../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/DeveloperError", "../../Core/FeatureDetection", "../../ThirdParty/knockout", "../getElement", "./NavigationHelpButtonViewModel"], function (p, v, u, t, e, m, E, b, w, C) {
  "use strict";

  function i(t) {
    if (!u(t) || !u(t.container)) throw new m("options.container is required.");
    var e = w(t.container),
        i = new C(),
        a = v(t.instructionsInitiallyVisible, !1);
    i.showInstructions = a, i._svgPath = "M16,1.466C7.973,1.466,1.466,7.973,1.466,16c0,8.027,6.507,14.534,14.534,14.534c8.027,0,14.534-6.507,14.534-14.534C30.534,7.973,24.027,1.466,16,1.466z M17.328,24.371h-2.707v-2.596h2.707V24.371zM17.328,19.003v0.858h-2.707v-1.057c0-3.19,3.63-3.696,3.63-5.963c0-1.034-0.924-1.826-2.134-1.826c-1.254,0-2.354,0.924-2.354,0.924l-1.541-1.915c0,0,1.519-1.584,4.137-1.584c2.487,0,4.796,1.54,4.796,4.136C21.156,16.208,17.328,16.627,17.328,19.003z";
    var n = document.createElement("span");
    n.className = "pgEarth-navigationHelpButton-wrapper", e.appendChild(n);
    var o = document.createElement("button");
    o.type = "button", o.className = "pgEarth-button pgEarth-toolbar-button pgEarth-navigation-help-button", o.setAttribute("data-bind", "attr: { title: tooltip },click: command,pgEarthSvgPath: { path: _svgPath, width: 32, height: 32 }"), n.appendChild(o);
    var s = document.createElement("div");
    s.className = "pgEarth-navigation-help", s.setAttribute("data-bind", 'css: { "pgEarth-navigation-help-visible" : showInstructions}'), n.appendChild(s);
    var r = document.createElement("button");
    r.type = "button", r.className = "pgEarth-navigation-button pgEarth-navigation-button-left", r.setAttribute("data-bind", 'click: showClick, css: {"pgEarth-navigation-button-selected": !_touch, "pgEarth-navigation-button-unselected": _touch}');
    var d = document.createElement("img");
    d.src = p("Widgets/Images/NavigationHelp/Mouse.svg"), d.className = "pgEarth-navigation-button-icon", d.style.width = "25px", d.style.height = "25px", r.appendChild(d), r.appendChild(document.createTextNode("Mouse"));
    var c = document.createElement("button");
    c.type = "button", c.className = "pgEarth-navigation-button pgEarth-navigation-button-right", c.setAttribute("data-bind", 'click: showTouch, css: {"pgEarth-navigation-button-selected": _touch, "pgEarth-navigation-button-unselected": !_touch}');
    var h = document.createElement("img");
    h.src = p("Widgets/Images/NavigationHelp/Touch.svg"), h.className = "pgEarth-navigation-button-icon", h.style.width = "25px", h.style.height = "25px", c.appendChild(h), c.appendChild(document.createTextNode("Touch")), s.appendChild(r), s.appendChild(c);
    var g = document.createElement("div");
    g.className = "pgEarth-click-navigation-help pgEarth-navigation-help-instructions", g.setAttribute("data-bind", 'css: { "pgEarth-click-navigation-help-visible" : !_touch}'), g.innerHTML = '            <table>                <tr>                    <td><img src="' + p("Widgets/Images/NavigationHelp/MouseLeft.svg") + '" width="48" height="48" /></td>                    <td>                        <div class="pgEarth-navigation-help-pan">Pan view</div>                        <div class="pgEarth-navigation-help-details">Left click + drag</div>                    </td>                </tr>                <tr>                    <td><img src="' + p("Widgets/Images/NavigationHelp/MouseRight.svg") + '" width="48" height="48" /></td>                    <td>                        <div class="pgEarth-navigation-help-zoom">Zoom view</div>                        <div class="pgEarth-navigation-help-details">Right click + drag, or</div>                        <div class="pgEarth-navigation-help-details">Mouse wheel scroll</div>                    </td>                </tr>                <tr>                    <td><img src="' + p("Widgets/Images/NavigationHelp/MouseMiddle.svg") + '" width="48" height="48" /></td>                    <td>                        <div class="pgEarth-navigation-help-rotate">Rotate view</div>                        <div class="pgEarth-navigation-help-details">Middle click + drag, or</div>                        <div class="pgEarth-navigation-help-details">CTRL + Left/Right click + drag</div>                    </td>                </tr>            </table>', s.appendChild(g);
    var l = document.createElement("div");
    l.className = "pgEarth-touch-navigation-help pgEarth-navigation-help-instructions", l.setAttribute("data-bind", 'css: { "pgEarth-touch-navigation-help-visible" : _touch}'), l.innerHTML = '            <table>                <tr>                    <td><img src="' + p("Widgets/Images/NavigationHelp/TouchDrag.svg") + '" width="70" height="48" /></td>                    <td>                        <div class="pgEarth-navigation-help-pan">Pan view</div>                        <div class="pgEarth-navigation-help-details">One finger drag</div>                    </td>                </tr>                <tr>                    <td><img src="' + p("Widgets/Images/NavigationHelp/TouchZoom.svg") + '" width="70" height="48" /></td>                    <td>                        <div class="pgEarth-navigation-help-zoom">Zoom view</div>                        <div class="pgEarth-navigation-help-details">Two finger pinch</div>                    </td>                </tr>                <tr>                    <td><img src="' + p("Widgets/Images/NavigationHelp/TouchTilt.svg") + '" width="70" height="48" /></td>                    <td>                        <div class="pgEarth-navigation-help-rotate">Tilt view</div>                        <div class="pgEarth-navigation-help-details">Two finger drag, same direction</div>                    </td>                </tr>                <tr>                    <td><img src="' + p("Widgets/Images/NavigationHelp/TouchRotate.svg") + '" width="70" height="48" /></td>                    <td>                        <div class="pgEarth-navigation-help-tilt">Rotate view</div>                        <div class="pgEarth-navigation-help-details">Two finger drag, opposite direction</div>                    </td>                </tr>            </table>', s.appendChild(l), b.applyBindings(i, n), this._container = e, this._viewModel = i, this._wrapper = n, this._closeInstructions = function (t) {
      n.contains(t.target) || (i.showInstructions = !1);
    }, E.supportsPointerEvents() ? document.addEventListener("pointerdown", this._closeInstructions, !0) : (document.addEventListener("mousedown", this._closeInstructions, !0), document.addEventListener("touchstart", this._closeInstructions, !0));
  }

  return t(i.prototype, {
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
  }), i.prototype.isDestroyed = function () {
    return !1;
  }, i.prototype.destroy = function () {
    return E.supportsPointerEvents() ? document.removeEventListener("pointerdown", this._closeInstructions, !0) : (document.removeEventListener("mousedown", this._closeInstructions, !0), document.removeEventListener("touchstart", this._closeInstructions, !0)), b.cleanNode(this._wrapper), this._container.removeChild(this._wrapper), e(this);
  }, i;
});