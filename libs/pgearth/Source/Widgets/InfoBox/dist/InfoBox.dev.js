"use strict";

define(["../../Core/buildModuleUrl", "../../Core/Check", "../../Core/Color", "../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../ThirdParty/knockout", "../getElement", "../subscribeAndEvaluate", "./InfoBoxViewModel"], function (m, b, f, g, e, t, E, C, x, v) {
  "use strict";

  function i(e, t) {
    b.defined("container", e), e = C(e);
    var i,
        n,
        o,
        a,
        r,
        s,
        l,
        d,
        c = document.createElement("div"),
        p = document.createElement("iframe");
    "lightLine" === t ? (c.className = "light-line-pop", c.setAttribute("data-bind", 'css: { "pgEarth-infoBox-visible" : showInfo, "pgEarth-infoBox-bodyless" : _bodyless }'), e.appendChild(c), (i = document.createElement("div")).className = "property-content", c.appendChild(i), (a = document.createElement("div")).className = "property-title", a.setAttribute("data-bind", "text: titleText"), i.appendChild(a), p.className = "pgEarth-infoBox-iframe", p.setAttribute("sandbox", "allow-same-origin allow-popups allow-forms"), p.setAttribute("data-bind", "style : { maxHeight : maxHeightOffset(40) }"), p.setAttribute("allowfullscreen", !0), i.appendChild(p), (s = document.createElement("button")).type = "button", s.className = "pgEarth-infoBox-close", s.setAttribute("data-bind", "click: function () { closeClicked.raiseEvent(this); }"), s.innerHTML = "&times;", i.appendChild(s), (n = document.createElement("div")).className = "lead-box", c.appendChild(n), (o = document.createElement("div")).className = "arraow", n.appendChild(o)) : (c.className = "pgEarth-infoBox", c.setAttribute("data-bind", 'css: { "pgEarth-infoBox-visible" : showInfo, "pgEarth-infoBox-bodyless" : _bodyless }'), e.appendChild(c), (a = document.createElement("div")).className = "pgEarth-infoBox-title", a.setAttribute("data-bind", "text: titleText"), c.appendChild(a), (r = document.createElement("button")).type = "button", r.className = "pgEarth-button pgEarth-infoBox-camera", r.setAttribute("data-bind", 'attr: { title: "Focus camera on object" },click: function () { cameraClicked.raiseEvent(this); },enable: enableCamera,pgEarthSvgPath: { path: cameraIconPath, width: 32, height: 32 }'), p.className = "pgEarth-infoBox-iframe", p.setAttribute("sandbox", "allow-same-origin allow-popups allow-forms"), p.setAttribute("data-bind", "style : { maxHeight : maxHeightOffset(40) }"), p.setAttribute("allowfullscreen", !0), c.appendChild(p), (s = document.createElement("button")).type = "button", s.className = "pgEarth-infoBox-close", s.setAttribute("data-bind", "click: function () { closeClicked.raiseEvent(this); }"), s.innerHTML = "&times;", c.appendChild(s), (l = document.createElement("div")).className = "pgEarth-infoBox-pointer", c.appendChild(l), (d = document.createElement("div")).className = "pgEarth-infoBox-pointer-direction", l.appendChild(d));
    var h = new v();
    E.applyBindings(h, c), this._container = e, this._element = c, this._frame = p, this._viewModel = h, this._descriptionSubscription = void 0, this._className = t;
    var u = this;
    p.addEventListener("load", function () {
      var e = p.contentDocument,
          t = e.createElement("link");
      t.href = m("Widgets/InfoBox/InfoBoxDescription.css"), t.rel = "stylesheet", t.type = "text/css";
      var s = e.createElement("div");
      s.className = "pgEarth-infoBox-description", e.head.appendChild(t), e.body.appendChild(s), u._descriptionSubscription = x(h, "description", function (e) {
        p.style.height = "5px", s.innerHTML = e;
        var t,
            i,
            n,
            o = null,
            a = s.firstElementChild;
        null === a || 1 !== s.childNodes.length || null !== (t = window.getComputedStyle(a)) && (i = t["background-color"], n = f.fromCssColorString(i), g(n) && 0 !== n.alpha && (o = t["background-color"])), c.style["background-color"] = o;
        var r = s.getBoundingClientRect().height;
        p.style.height = r + "px";
      });
    }), p.setAttribute("src", "about:blank");
  }

  return e(i.prototype, {
    container: {
      get: function get() {
        return this._container;
      }
    },
    viewModel: {
      get: function get() {
        return this._viewModel;
      }
    },
    frame: {
      get: function get() {
        return this._frame;
      }
    }
  }), i.prototype.isDestroyed = function () {
    return !1;
  }, i.prototype.destroy = function () {
    var e = this._container;
    return E.cleanNode(this._element), e.removeChild(this._element), g(this._descriptionSubscription) && this._descriptionSubscription.dispose(), t(this);
  }, i;
});