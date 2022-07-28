"use strict";

define(["../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/DeveloperError", "../../Core/FeatureDetection", "../../ThirdParty/knockout", "../getElement", "./BaseLayerPickerViewModel"], function (C, e, t, k, w, D, N, _) {
  "use strict";

  function a(e, t) {
    if (!C(e)) throw new k("container is required.");
    e = N(e);
    var a = new _(t),
        r = document.createElement("button");
    r.type = "button", r.className = "pgEarth-button pgEarth-toolbar-button", r.setAttribute("data-bind", "attr: { title: buttonTooltip },click: toggleDropDown"), e.appendChild(r);
    var i = document.createElement("img");
    i.setAttribute("draggable", "false"), i.className = "pgEarth-baseLayerPicker-selected", i.setAttribute("data-bind", "attr: { src: buttonImageUrl }, visible: !!buttonImageUrl"), r.appendChild(i);
    var n = document.createElement("div");
    n.className = "pgEarth-baseLayerPicker-dropDown", n.setAttribute("data-bind", 'css: { "pgEarth-baseLayerPicker-dropDown-visible" : dropDownVisible }'), e.appendChild(n);
    var s = document.createElement("div");
    s.className = "pgEarth-baseLayerPicker-sectionTitle", s.setAttribute("data-bind", "visible: imageryProviderViewModels.length > 0"), s.innerHTML = "Imagery", n.appendChild(s);
    var d = document.createElement("div");
    d.className = "pgEarth-baseLayerPicker-section", d.setAttribute("data-bind", "foreach: _imageryProviders"), n.appendChild(d);
    var o = document.createElement("div");
    o.className = "pgEarth-baseLayerPicker-category", d.appendChild(o);
    var c = document.createElement("div");
    c.className = "pgEarth-baseLayerPicker-categoryTitle", c.setAttribute("data-bind", "text: name"), o.appendChild(c);
    var l = document.createElement("div");
    l.className = "pgEarth-baseLayerPicker-choices", l.setAttribute("data-bind", "foreach: providers"), o.appendChild(l);
    var p = document.createElement("div");
    p.className = "pgEarth-baseLayerPicker-item", p.setAttribute("data-bind", 'css: { "pgEarth-baseLayerPicker-selectedItem" : $data === $parents[1].selectedImagery },attr: { title: tooltip },visible: creationCommand.canExecute,click: function($data) { $parents[1].selectedImagery = $data; }'), l.appendChild(p);
    var m = document.createElement("img");
    m.className = "pgEarth-baseLayerPicker-itemIcon", m.setAttribute("data-bind", "attr: { src: iconUrl }"), m.setAttribute("draggable", "false"), p.appendChild(m);
    var b = document.createElement("div");
    b.className = "pgEarth-baseLayerPicker-itemLabel", b.setAttribute("data-bind", "text: name"), p.appendChild(b);
    var u = document.createElement("div");
    u.className = "pgEarth-baseLayerPicker-sectionTitle", u.setAttribute("data-bind", "visible: terrainProviderViewModels.length > 0"), u.innerHTML = "Terrain", n.appendChild(u);
    var h = document.createElement("div");
    h.className = "pgEarth-baseLayerPicker-section", h.setAttribute("data-bind", "foreach: _terrainProviders"), n.appendChild(h);
    var v = document.createElement("div");
    v.className = "pgEarth-baseLayerPicker-category", h.appendChild(v);
    var g = document.createElement("div");
    g.className = "pgEarth-baseLayerPicker-categoryTitle", g.setAttribute("data-bind", "text: name"), v.appendChild(g);
    var E = document.createElement("div");
    E.className = "pgEarth-baseLayerPicker-choices", E.setAttribute("data-bind", "foreach: providers"), v.appendChild(E);
    var y = document.createElement("div");
    y.className = "pgEarth-baseLayerPicker-item", y.setAttribute("data-bind", 'css: { "pgEarth-baseLayerPicker-selectedItem" : $data === $parents[1].selectedTerrain },attr: { title: tooltip },visible: creationCommand.canExecute,click: function($data) { $parents[1].selectedTerrain = $data; }'), E.appendChild(y);
    var P = document.createElement("img");
    P.className = "pgEarth-baseLayerPicker-itemIcon", P.setAttribute("data-bind", "attr: { src: iconUrl }"), P.setAttribute("draggable", "false"), y.appendChild(P);
    var L = document.createElement("div");
    L.className = "pgEarth-baseLayerPicker-itemLabel", L.setAttribute("data-bind", "text: name"), y.appendChild(L), D.applyBindings(a, r), D.applyBindings(a, n), this._viewModel = a, this._container = e, this._element = r, this._dropPanel = n, this._closeDropDown = function (e) {
      r.contains(e.target) || n.contains(e.target) || (a.dropDownVisible = !1);
    }, w.supportsPointerEvents() ? document.addEventListener("pointerdown", this._closeDropDown, !0) : (document.addEventListener("mousedown", this._closeDropDown, !0), document.addEventListener("touchstart", this._closeDropDown, !0));
  }

  return e(a.prototype, {
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
  }), a.prototype.isDestroyed = function () {
    return !1;
  }, a.prototype.destroy = function () {
    return w.supportsPointerEvents() ? document.removeEventListener("pointerdown", this._closeDropDown, !0) : (document.removeEventListener("mousedown", this._closeDropDown, !0), document.removeEventListener("touchstart", this._closeDropDown, !0)), D.cleanNode(this._element), D.cleanNode(this._dropPanel), this._container.removeChild(this._element), this._container.removeChild(this._dropPanel), t(this);
  }, a;
});