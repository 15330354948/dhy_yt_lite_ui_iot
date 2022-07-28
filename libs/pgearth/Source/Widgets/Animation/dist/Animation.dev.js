"use strict";

define(["../../Core/Color", "../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/DeveloperError", "../getElement", "../subscribeAndEvaluate"], function (e, b, t, n, C, E, N) {
  "use strict";

  var y,
      w = "http://www.w3.org/2000/svg",
      S = "http://www.w3.org/1999/xlink",
      m = e.fromCssColorString("rgba(247,250,255,0.384)"),
      c = e.fromCssColorString("rgba(143,191,255,0.216)"),
      d = e.fromCssColorString("rgba(153,197,255,0.098)"),
      g = e.fromCssColorString("rgba(255,255,255,0.086)"),
      p = e.fromCssColorString("rgba(255,255,255,0.267)"),
      u = e.fromCssColorString("rgba(255,255,255,0)"),
      v = e.fromCssColorString("rgba(66,67,68,0.3)"),
      f = e.fromCssColorString("rgba(0,0,0,0.5)");

  function _(t) {
    return e.fromCssColorString(window.getComputedStyle(t).getPropertyValue("color"));
  }

  function x(t) {
    var e = document.createElementNS(w, t.tagName);

    for (var o in t) {
      if (t.hasOwnProperty(o) && "tagName" !== o) if ("children" === o) for (var i = t.children.length, n = 0; n < i; ++n) {
        e.appendChild(x(t.children[n]));
      } else 0 === o.indexOf("xlink:") ? e.setAttributeNS(S, o.substring(6), t[o]) : "textContent" === o ? e.textContent = t[o] : e.setAttribute(o, t[o]);
    }

    return e;
  }

  function R(t, e, o) {
    var i = document.createElementNS(w, "text");
    i.setAttribute("x", t), i.setAttribute("y", e), i.setAttribute("class", "pgEarth-animation-svgText");
    var n = document.createElementNS(w, "tspan");
    return n.textContent = o, i.appendChild(n), i;
  }

  var a = new e();

  function k(t, e) {
    var o = e.alpha,
        i = 1 - o;
    return a.red = t.red * i + e.red * o, a.green = t.green * i + e.green * o, a.blue = t.blue * i + e.blue * o, a.toCssColorString();
  }

  function M(t, e, o) {
    return x({
      tagName: "g",
      "class": "pgEarth-animation-rectButton",
      transform: "translate(" + t + "," + e + ")",
      children: [{
        tagName: "rect",
        "class": "pgEarth-animation-buttonGlow",
        width: 32,
        height: 32,
        rx: 2,
        ry: 2
      }, {
        tagName: "rect",
        "class": "pgEarth-animation-buttonMain",
        width: 32,
        height: 32,
        rx: 4,
        ry: 4
      }, {
        tagName: "use",
        "class": "pgEarth-animation-buttonPath",
        "xlink:href": o
      }, {
        tagName: "title",
        textContent: ""
      }]
    });
  }

  function P(t, e) {
    this._viewModel = e, this.svgElement = t, this._enabled = void 0, this._toggled = void 0;
    var o = this;
    this._clickFunction = function () {
      var t = o._viewModel.command;
      t.canExecute && t();
    }, t.addEventListener("click", this._clickFunction, !0), this._subscriptions = [N(e, "toggled", this.setToggled, this), N(e, "tooltip", this.setTooltip, this), N(e.command, "canExecute", this.setEnabled, this)];
  }

  function o(t, e) {
    if (!b(t)) throw new C("container is required.");
    if (!b(e)) throw new C("viewModel is required.");
    t = E(t), this._viewModel = e, this._container = t, this._centerX = 0, this._centerY = 0, this._defsElement = void 0, this._svgNode = void 0, this._topG = void 0, this._lastHeight = void 0, this._lastWidth = void 0;
    var o = document.createElement("style");
    o.textContent = ".pgEarth-animation-rectButton .pgEarth-animation-buttonGlow { filter: url(#animation_blurred); }.pgEarth-animation-rectButton .pgEarth-animation-buttonMain { fill: url(#animation_buttonNormal); }.pgEarth-animation-buttonToggled .pgEarth-animation-buttonMain { fill: url(#animation_buttonToggled); }.pgEarth-animation-rectButton:hover .pgEarth-animation-buttonMain { fill: url(#animation_buttonHovered); }.pgEarth-animation-buttonDisabled .pgEarth-animation-buttonMain { fill: url(#animation_buttonDisabled); }.pgEarth-animation-shuttleRingG .pgEarth-animation-shuttleRingSwoosh { fill: url(#animation_shuttleRingSwooshGradient); }.pgEarth-animation-shuttleRingG:hover .pgEarth-animation-shuttleRingSwoosh { fill: url(#animation_shuttleRingSwooshHovered); }.pgEarth-animation-shuttleRingPointer { fill: url(#animation_shuttleRingPointerGradient); }.pgEarth-animation-shuttleRingPausePointer { fill: url(#animation_shuttleRingPointerPaused); }.pgEarth-animation-knobOuter { fill: url(#animation_knobOuter); }.pgEarth-animation-knobInner { fill: url(#animation_knobInner); }", document.head.insertBefore(o, document.head.childNodes[0]);
    var i = document.createElement("div");
    i.className = "pgEarth-animation-theme", i.innerHTML = '<div class="pgEarth-animation-themeNormal"></div><div class="pgEarth-animation-themeHover"></div><div class="pgEarth-animation-themeSelect"></div><div class="pgEarth-animation-themeDisabled"></div><div class="pgEarth-animation-themeKnob"></div><div class="pgEarth-animation-themePointer"></div><div class="pgEarth-animation-themeSwoosh"></div><div class="pgEarth-animation-themeSwooshHover"></div>', this._theme = i, this._themeNormal = i.childNodes[0], this._themeHover = i.childNodes[1], this._themeSelect = i.childNodes[2], this._themeDisabled = i.childNodes[3], this._themeKnob = i.childNodes[4], this._themePointer = i.childNodes[5], this._themeSwoosh = i.childNodes[6], this._themeSwooshHover = i.childNodes[7];
    var n = document.createElementNS(w, "svg:svg");
    (this._svgNode = n).setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", S);
    var a = document.createElementNS(w, "g");
    this._topG = a, this._realtimeSVG = new P(x({
      tagName: "g",
      "class": "pgEarth-animation-rectButton",
      transform: "translate(" + 3 + "," + 4 + ")",
      children: [{
        tagName: "use",
        "class": "pgEarth-animation-buttonGlow",
        "xlink:href": "#animation_pathWingButton"
      }, {
        tagName: "use",
        "class": "pgEarth-animation-buttonMain",
        "xlink:href": "#animation_pathWingButton"
      }, {
        tagName: "use",
        "class": "pgEarth-animation-buttonPath",
        "xlink:href": "#animation_pathClock"
      }, {
        tagName: "title",
        textContent: ""
      }]
    }), e.playRealtimeViewModel), this._playReverseSVG = new P(M(44, 99, "#animation_pathPlayReverse"), e.playReverseViewModel), this._playForwardSVG = new P(M(124, 99, "#animation_pathPlay"), e.playForwardViewModel), this._pauseSVG = new P(M(84, 99, "#animation_pathPause"), e.pauseViewModel);
    var s = document.createElementNS(w, "g");
    s.appendChild(this._realtimeSVG.svgElement), s.appendChild(this._playReverseSVG.svgElement), s.appendChild(this._playForwardSVG.svgElement), s.appendChild(this._pauseSVG.svgElement);
    var r = x({
      tagName: "circle",
      "class": "pgEarth-animation-shuttleRingBack",
      cx: 100,
      cy: 100,
      r: 99
    });
    this._shuttleRingBackPanel = r;
    var l = x({
      tagName: "g",
      "class": "pgEarth-animation-shuttleRingSwoosh",
      children: [{
        tagName: "use",
        transform: "translate(100,97) scale(-1,1)",
        "xlink:href": "#animation_pathSwooshFX"
      }, {
        tagName: "use",
        transform: "translate(100,97)",
        "xlink:href": "#animation_pathSwooshFX"
      }, {
        tagName: "line",
        x1: 100,
        y1: 8,
        x2: 100,
        y2: 22
      }]
    });
    this._shuttleRingSwooshG = l, this._shuttleRingPointer = x({
      tagName: "use",
      "class": "pgEarth-animation-shuttleRingPointer",
      "xlink:href": "#animation_pathPointer"
    });
    var h = x({
      tagName: "g",
      transform: "translate(100,100)"
    });
    this._knobOuter = x({
      tagName: "circle",
      "class": "pgEarth-animation-knobOuter",
      cx: 0,
      cy: 0,
      r: 71
    });
    var m = x({
      tagName: "circle",
      "class": "pgEarth-animation-knobInner",
      cx: 0,
      cy: 0,
      r: 61
    });
    this._knobDate = R(0, -24, ""), this._knobTime = R(0, -7, ""), this._knobStatus = R(0, -41, "");
    var c = x({
      tagName: "circle",
      "class": "pgEarth-animation-blank",
      cx: 0,
      cy: 0,
      r: 61
    }),
        d = document.createElementNS(w, "g");
    d.setAttribute("class", "pgEarth-animation-shuttleRingG"), t.appendChild(i), a.appendChild(d), a.appendChild(h), a.appendChild(s), d.appendChild(r), d.appendChild(l), d.appendChild(this._shuttleRingPointer), h.appendChild(this._knobOuter), h.appendChild(m), h.appendChild(this._knobDate), h.appendChild(this._knobTime), h.appendChild(this._knobStatus), h.appendChild(c), n.appendChild(a), t.appendChild(n);
    var g = this;

    function p(t) {
      !function (t, e) {
        var o = t._viewModel,
            i = o.shuttleRingDragging;
        if (!i || y === t) if ("mousedown" === e.type || i && "mousemove" === e.type || "touchstart" === e.type && 1 === e.touches.length || i && "touchmove" === e.type && 1 === e.touches.length) {
          var n,
              a = t._centerX,
              s = t._centerY,
              r = t._svgNode.getBoundingClientRect(),
              l = "touchstart" === e.type || "touchmove" === e.type ? (n = e.touches[0].clientX, e.touches[0].clientY) : (n = e.clientX, e.clientY);

          if (!i && (n > r.right || n < r.left || l < r.top || l > r.bottom)) return;

          var h = t._shuttleRingPointer.getBoundingClientRect(),
              m = n - a - r.left,
              c = l - s - r.top,
              d = 180 * Math.atan2(c, m) / Math.PI + 90;

          180 < d && (d -= 360);
          var g = o.shuttleRingAngle;
          i || n < h.right && n > h.left && l > h.top && l < h.bottom ? (y = t, o.shuttleRingDragging = !0, o.shuttleRingAngle = d) : d < g ? o.slower() : g < d && o.faster(), e.preventDefault();
        } else t === y && (y = void 0), o.shuttleRingDragging = !1;
      }(g, t);
    }

    this._mouseCallback = p, r.addEventListener("mousedown", p, !0), r.addEventListener("touchstart", p, !0), l.addEventListener("mousedown", p, !0), l.addEventListener("touchstart", p, !0), document.addEventListener("mousemove", p, !0), document.addEventListener("touchmove", p, !0), document.addEventListener("mouseup", p, !0), document.addEventListener("touchend", p, !0), document.addEventListener("touchcancel", p, !0), this._shuttleRingPointer.addEventListener("mousedown", p, !0), this._shuttleRingPointer.addEventListener("touchstart", p, !0), this._knobOuter.addEventListener("mousedown", p, !0), this._knobOuter.addEventListener("touchstart", p, !0);
    var u,
        v = this._knobTime.childNodes[0],
        f = this._knobDate.childNodes[0],
        _ = this._knobStatus.childNodes[0];
    this._subscriptions = [N(e.pauseViewModel, "toggled", function (t) {
      u !== t && ((u = t) ? g._shuttleRingPointer.setAttribute("class", "pgEarth-animation-shuttleRingPausePointer") : g._shuttleRingPointer.setAttribute("class", "pgEarth-animation-shuttleRingPointer"));
    }), N(e, "shuttleRingAngle", function (t) {
      var e, o, i;
      e = g._shuttleRingPointer, o = g._knobOuter, i = t, e.setAttribute("transform", "translate(100,100) rotate(" + i + ")"), o.setAttribute("transform", "rotate(" + i + ")");
    }), N(e, "dateLabel", function (t) {
      f.textContent !== t && (f.textContent = t);
    }), N(e, "timeLabel", function (t) {
      v.textContent !== t && (v.textContent = t);
    }), N(e, "multiplierLabel", function (t) {
      _.textContent !== t && (_.textContent = t);
    })], this.applyThemeChanges(), this.resize();
  }

  return P.prototype.destroy = function () {
    this.svgElement.removeEventListener("click", this._clickFunction, !0);

    for (var t = this._subscriptions, e = 0, o = t.length; e < o; e++) {
      t[e].dispose();
    }

    n(this);
  }, P.prototype.isDestroyed = function () {
    return !1;
  }, P.prototype.setEnabled = function (t) {
    if (this._enabled !== t) {
      if (!(this._enabled = t)) return void this.svgElement.setAttribute("class", "pgEarth-animation-buttonDisabled");
      if (this._toggled) return void this.svgElement.setAttribute("class", "pgEarth-animation-rectButton pgEarth-animation-buttonToggled");
      this.svgElement.setAttribute("class", "pgEarth-animation-rectButton");
    }
  }, P.prototype.setToggled = function (t) {
    this._toggled !== t && (this._toggled = t, this._enabled && (t ? this.svgElement.setAttribute("class", "pgEarth-animation-rectButton pgEarth-animation-buttonToggled") : this.svgElement.setAttribute("class", "pgEarth-animation-rectButton")));
  }, P.prototype.setTooltip = function (t) {
    this.svgElement.getElementsByTagName("title")[0].textContent = t;
  }, t(o.prototype, {
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
    b(this._observer) && (this._observer.disconnect(), this._observer = void 0);
    var t = this._mouseCallback;
    this._shuttleRingBackPanel.removeEventListener("mousedown", t, !0), this._shuttleRingBackPanel.removeEventListener("touchstart", t, !0), this._shuttleRingSwooshG.removeEventListener("mousedown", t, !0), this._shuttleRingSwooshG.removeEventListener("touchstart", t, !0), document.removeEventListener("mousemove", t, !0), document.removeEventListener("touchmove", t, !0), document.removeEventListener("mouseup", t, !0), document.removeEventListener("touchend", t, !0), document.removeEventListener("touchcancel", t, !0), this._shuttleRingPointer.removeEventListener("mousedown", t, !0), this._shuttleRingPointer.removeEventListener("touchstart", t, !0), this._knobOuter.removeEventListener("mousedown", t, !0), this._knobOuter.removeEventListener("touchstart", t, !0), this._container.removeChild(this._svgNode), this._container.removeChild(this._theme), this._realtimeSVG.destroy(), this._playReverseSVG.destroy(), this._playForwardSVG.destroy(), this._pauseSVG.destroy();

    for (var e = this._subscriptions, o = 0, i = e.length; o < i; o++) {
      e[o].dispose();
    }

    return n(this);
  }, o.prototype.resize = function () {
    var t,
        e,
        o,
        i,
        n,
        a = this._container.clientWidth,
        s = this._container.clientHeight;
    a === this._lastWidth && s === this._lastHeight || (o = s, 0 === (e = a) && 0 === s ? (e = 200, o = 132) : 0 === a ? e = (o = s) / 132 * 200 : 0 === s && (o = (e = a) / 200 * 132), i = e / 200, n = o / 132, (t = this._svgNode).style.cssText = "width: " + e + "px; height: " + o + "px; position: absolute; bottom: 0; left: 0; overflow: hidden;", t.setAttribute("width", e), t.setAttribute("height", o), t.setAttribute("viewBox", "0 0 " + e + " " + o), this._topG.setAttribute("transform", "scale(" + i + "," + n + ")"), this._centerX = Math.max(1, 100 * i), this._centerY = Math.max(1, 100 * n), this._lastHeight = a, this._lastWidth = s);
  }, o.prototype.applyThemeChanges = function () {
    if (!document.body.contains(this._container)) {
      if (b(this._observer)) return;
      var t = this;
      return t._observer = new MutationObserver(function () {
        document.body.contains(t._container) && (t._observer.disconnect(), t._observer = void 0, t.applyThemeChanges());
      }), void t._observer.observe(document, {
        childList: !0,
        subtree: !0
      });
    }

    var e = _(this._themeNormal),
        o = _(this._themeHover),
        i = _(this._themeSelect),
        n = _(this._themeDisabled),
        a = _(this._themeKnob),
        s = _(this._themePointer),
        r = _(this._themeSwoosh),
        l = _(this._themeSwooshHover),
        h = x({
      tagName: "defs",
      children: [{
        id: "animation_buttonNormal",
        tagName: "linearGradient",
        x1: "50%",
        y1: "0%",
        x2: "50%",
        y2: "100%",
        children: [{
          tagName: "stop",
          offset: "0%",
          "stop-color": k(e, m)
        }, {
          tagName: "stop",
          offset: "12%",
          "stop-color": k(e, c)
        }, {
          tagName: "stop",
          offset: "46%",
          "stop-color": k(e, d)
        }, {
          tagName: "stop",
          offset: "81%",
          "stop-color": k(e, g)
        }]
      }, {
        id: "animation_buttonHovered",
        tagName: "linearGradient",
        x1: "50%",
        y1: "0%",
        x2: "50%",
        y2: "100%",
        children: [{
          tagName: "stop",
          offset: "0%",
          "stop-color": k(o, m)
        }, {
          tagName: "stop",
          offset: "12%",
          "stop-color": k(o, c)
        }, {
          tagName: "stop",
          offset: "46%",
          "stop-color": k(o, d)
        }, {
          tagName: "stop",
          offset: "81%",
          "stop-color": k(o, g)
        }]
      }, {
        id: "animation_buttonToggled",
        tagName: "linearGradient",
        x1: "50%",
        y1: "0%",
        x2: "50%",
        y2: "100%",
        children: [{
          tagName: "stop",
          offset: "0%",
          "stop-color": k(i, m)
        }, {
          tagName: "stop",
          offset: "12%",
          "stop-color": k(i, c)
        }, {
          tagName: "stop",
          offset: "46%",
          "stop-color": k(i, d)
        }, {
          tagName: "stop",
          offset: "81%",
          "stop-color": k(i, g)
        }]
      }, {
        id: "animation_buttonDisabled",
        tagName: "linearGradient",
        x1: "50%",
        y1: "0%",
        x2: "50%",
        y2: "100%",
        children: [{
          tagName: "stop",
          offset: "0%",
          "stop-color": k(n, p)
        }, {
          tagName: "stop",
          offset: "75%",
          "stop-color": k(n, u)
        }]
      }, {
        id: "animation_blurred",
        tagName: "filter",
        width: "200%",
        height: "200%",
        x: "-50%",
        y: "-50%",
        children: [{
          tagName: "feGaussianBlur",
          stdDeviation: 4,
          "in": "SourceGraphic"
        }]
      }, {
        id: "animation_shuttleRingSwooshGradient",
        tagName: "linearGradient",
        x1: "50%",
        y1: "0%",
        x2: "50%",
        y2: "100%",
        children: [{
          tagName: "stop",
          offset: "0%",
          "stop-opacity": .2,
          "stop-color": r.toCssColorString()
        }, {
          tagName: "stop",
          offset: "85%",
          "stop-opacity": .85,
          "stop-color": r.toCssColorString()
        }, {
          tagName: "stop",
          offset: "95%",
          "stop-opacity": .05,
          "stop-color": r.toCssColorString()
        }]
      }, {
        id: "animation_shuttleRingSwooshHovered",
        tagName: "linearGradient",
        x1: "50%",
        y1: "0%",
        x2: "50%",
        y2: "100%",
        children: [{
          tagName: "stop",
          offset: "0%",
          "stop-opacity": .2,
          "stop-color": l.toCssColorString()
        }, {
          tagName: "stop",
          offset: "85%",
          "stop-opacity": .85,
          "stop-color": l.toCssColorString()
        }, {
          tagName: "stop",
          offset: "95%",
          "stop-opacity": .05,
          "stop-color": l.toCssColorString()
        }]
      }, {
        id: "animation_shuttleRingPointerGradient",
        tagName: "linearGradient",
        x1: "0%",
        y1: "50%",
        x2: "100%",
        y2: "50%",
        children: [{
          tagName: "stop",
          offset: "0%",
          "stop-color": s.toCssColorString()
        }, {
          tagName: "stop",
          offset: "40%",
          "stop-color": s.toCssColorString()
        }, {
          tagName: "stop",
          offset: "60%",
          "stop-color": k(s, f)
        }, {
          tagName: "stop",
          offset: "100%",
          "stop-color": k(s, f)
        }]
      }, {
        id: "animation_shuttleRingPointerPaused",
        tagName: "linearGradient",
        x1: "0%",
        y1: "50%",
        x2: "100%",
        y2: "50%",
        children: [{
          tagName: "stop",
          offset: "0%",
          "stop-color": "#CCC"
        }, {
          tagName: "stop",
          offset: "40%",
          "stop-color": "#CCC"
        }, {
          tagName: "stop",
          offset: "60%",
          "stop-color": "#555"
        }, {
          tagName: "stop",
          offset: "100%",
          "stop-color": "#555"
        }]
      }, {
        id: "animation_knobOuter",
        tagName: "linearGradient",
        x1: "20%",
        y1: "0%",
        x2: "90%",
        y2: "100%",
        children: [{
          tagName: "stop",
          offset: "5%",
          "stop-color": k(a, m)
        }, {
          tagName: "stop",
          offset: "60%",
          "stop-color": k(a, v)
        }, {
          tagName: "stop",
          offset: "85%",
          "stop-color": k(a, c)
        }]
      }, {
        id: "animation_knobInner",
        tagName: "linearGradient",
        x1: "20%",
        y1: "0%",
        x2: "90%",
        y2: "100%",
        children: [{
          tagName: "stop",
          offset: "5%",
          "stop-color": k(a, v)
        }, {
          tagName: "stop",
          offset: "60%",
          "stop-color": k(a, m)
        }, {
          tagName: "stop",
          offset: "85%",
          "stop-color": k(a, g)
        }]
      }, {
        id: "animation_pathReset",
        tagName: "path",
        transform: "translate(16,16) scale(0.85) translate(-16,-16)",
        d: "M24.316,5.318,9.833,13.682,9.833,5.5,5.5,5.5,5.5,25.5,9.833,25.5,9.833,17.318,24.316,25.682z"
      }, {
        id: "animation_pathPause",
        tagName: "path",
        transform: "translate(16,16) scale(0.85) translate(-16,-16)",
        d: "M13,5.5,7.5,5.5,7.5,25.5,13,25.5zM24.5,5.5,19,5.5,19,25.5,24.5,25.5z"
      }, {
        id: "animation_pathPlay",
        tagName: "path",
        transform: "translate(16,16) scale(0.85) translate(-16,-16)",
        d: "M6.684,25.682L24.316,15.5L6.684,5.318V25.682z"
      }, {
        id: "animation_pathPlayReverse",
        tagName: "path",
        transform: "translate(16,16) scale(-0.85,0.85) translate(-16,-16)",
        d: "M6.684,25.682L24.316,15.5L6.684,5.318V25.682z"
      }, {
        id: "animation_pathLoop",
        tagName: "path",
        transform: "translate(16,16) scale(0.85) translate(-16,-16)",
        d: "M24.249,15.499c-0.009,4.832-3.918,8.741-8.75,8.75c-2.515,0-4.768-1.064-6.365-2.763l2.068-1.442l-7.901-3.703l0.744,8.694l2.193-1.529c2.244,2.594,5.562,4.242,9.26,4.242c6.767,0,12.249-5.482,12.249-12.249H24.249zM15.499,6.75c2.516,0,4.769,1.065,6.367,2.764l-2.068,1.443l7.901,3.701l-0.746-8.693l-2.192,1.529c-2.245-2.594-5.562-4.245-9.262-4.245C8.734,3.25,3.25,8.734,3.249,15.499H6.75C6.758,10.668,10.668,6.758,15.499,6.75z"
      }, {
        id: "animation_pathClock",
        tagName: "path",
        transform: "translate(16,16) scale(0.85) translate(-16,-15.5)",
        d: "M15.5,2.374C8.251,2.375,2.376,8.251,2.374,15.5C2.376,22.748,8.251,28.623,15.5,28.627c7.249-0.004,13.124-5.879,13.125-13.127C28.624,8.251,22.749,2.375,15.5,2.374zM15.5,25.623C9.909,25.615,5.385,21.09,5.375,15.5C5.385,9.909,9.909,5.384,15.5,5.374c5.59,0.01,10.115,4.535,10.124,10.125C25.615,21.09,21.091,25.615,15.5,25.623zM8.625,15.5c-0.001-0.552-0.448-0.999-1.001-1c-0.553,0-1,0.448-1,1c0,0.553,0.449,1,1,1C8.176,16.5,8.624,16.053,8.625,15.5zM8.179,18.572c-0.478,0.277-0.642,0.889-0.365,1.367c0.275,0.479,0.889,0.641,1.365,0.365c0.479-0.275,0.643-0.887,0.367-1.367C9.27,18.461,8.658,18.297,8.179,18.572zM9.18,10.696c-0.479-0.276-1.09-0.112-1.366,0.366s-0.111,1.09,0.365,1.366c0.479,0.276,1.09,0.113,1.367-0.366C9.821,11.584,9.657,10.973,9.18,10.696zM22.822,12.428c0.478-0.275,0.643-0.888,0.366-1.366c-0.275-0.478-0.89-0.642-1.366-0.366c-0.479,0.278-0.642,0.89-0.366,1.367C21.732,12.54,22.344,12.705,22.822,12.428zM12.062,21.455c-0.478-0.275-1.089-0.111-1.366,0.367c-0.275,0.479-0.111,1.09,0.366,1.365c0.478,0.277,1.091,0.111,1.365-0.365C12.704,22.344,12.54,21.732,12.062,21.455zM12.062,9.545c0.479-0.276,0.642-0.888,0.366-1.366c-0.276-0.478-0.888-0.642-1.366-0.366s-0.642,0.888-0.366,1.366C10.973,9.658,11.584,9.822,12.062,9.545zM22.823,18.572c-0.48-0.275-1.092-0.111-1.367,0.365c-0.275,0.479-0.112,1.092,0.367,1.367c0.477,0.275,1.089,0.113,1.365-0.365C23.464,19.461,23.3,18.848,22.823,18.572zM19.938,7.813c-0.477-0.276-1.091-0.111-1.365,0.366c-0.275,0.48-0.111,1.091,0.366,1.367s1.089,0.112,1.366-0.366C20.581,8.702,20.418,8.089,19.938,7.813zM23.378,14.5c-0.554,0.002-1.001,0.45-1.001,1c0.001,0.552,0.448,1,1.001,1c0.551,0,1-0.447,1-1C24.378,14.949,23.929,14.5,23.378,14.5zM15.501,6.624c-0.552,0-1,0.448-1,1l-0.466,7.343l-3.004,1.96c-0.478,0.277-0.642,0.889-0.365,1.365c0.275,0.479,0.889,0.643,1.365,0.367l3.305-1.676C15.39,16.99,15.444,17,15.501,17c0.828,0,1.5-0.671,1.5-1.5l-0.5-7.876C16.501,7.072,16.053,6.624,15.501,6.624zM15.501,22.377c-0.552,0-1,0.447-1,1s0.448,1,1,1s1-0.447,1-1S16.053,22.377,15.501,22.377zM18.939,21.455c-0.479,0.277-0.643,0.889-0.366,1.367c0.275,0.477,0.888,0.643,1.366,0.365c0.478-0.275,0.642-0.889,0.366-1.365C20.028,21.344,19.417,21.18,18.939,21.455z"
      }, {
        id: "animation_pathWingButton",
        tagName: "path",
        d: "m 4.5,0.5 c -2.216,0 -4,1.784 -4,4 l 0,24 c 0,2.216 1.784,4 4,4 l 13.71875,0 C 22.478584,27.272785 27.273681,22.511272 32.5,18.25 l 0,-13.75 c 0,-2.216 -1.784,-4 -4,-4 l -24,0 z"
      }, {
        id: "animation_pathPointer",
        tagName: "path",
        d: "M-15,-65,-15,-55,15,-55,15,-65,0,-95z"
      }, {
        id: "animation_pathSwooshFX",
        tagName: "path",
        d: "m 85,0 c 0,16.617 -4.813944,35.356 -13.131081,48.4508 h 6.099803 c 8.317138,-13.0948 13.13322,-28.5955 13.13322,-45.2124 0,-46.94483 -38.402714,-85.00262 -85.7743869,-85.00262 -1.0218522,0 -2.0373001,0.0241 -3.0506131,0.0589 45.958443,1.59437 82.723058,35.77285 82.723058,81.70532 z"
      }]
    });

    b(this._defsElement) ? this._svgNode.replaceChild(h, this._defsElement) : this._svgNode.appendChild(h), this._defsElement = h;
  }, o;
});