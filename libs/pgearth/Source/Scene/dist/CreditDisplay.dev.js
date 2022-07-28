"use strict";

define(["../Core/AssociativeArray", "../Core/buildModuleUrl", "../Core/Check", "../Core/Credit", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject"], function (C, e, u, x, m, c, t, i) {
  "use strict";

  var v = 100,
      E = "#ffffff",
      _ = "#48b";
  var r,
      g = "pgEarth-credit-delimiter";

  function f(t) {
    var e = document.createElement("span");
    return e.textContent = t, e.className = g, e;
  }

  function b(t, e) {
    var i;
    return c(e) && ((i = document.createElement(e))._creditId = t._creditId, i.appendChild(t), t = i), t;
  }

  function n(t, e, i, r) {
    for (var d = t.childNodes, n = -1, a = 0; a < e.length; ++a) {
      var o,
          h,
          l,
          s,
          p = e[a];
      c(p) && (n = a, c(i) && (n *= 2, 0 < a && (o = n - 1, d.length <= o ? t.appendChild(f(i)) : (h = d[o]).className !== g && t.replaceChild(f(i), h))), l = p.element, d.length <= n ? t.appendChild(b(l, r)) : (s = d[n])._creditId !== p._id && t.replaceChild(b(l, r), s));
    }

    for (++n; n < d.length;) {
      t.removeChild(d[n]);
    }
  }

  function y(t, e) {
    var i = t + " {";

    for (var r in e) {
      e.hasOwnProperty(r) && (i += r + ": " + e[r] + "; ");
    }

    return i += " }\n";
  }

  function w(t, e, i) {
    u.defined("container", t);
    var r = this;
    i = m(i, document.body);
    var d = document.createElement("div");
    d.className = "pgEarth-credit-lightbox-overlay", i.appendChild(d);
    var n = document.createElement("div");

    function a(t) {
      n.contains(t.target) || r.hideLightbox();
    }

    n.className = "pgEarth-credit-lightbox", d.appendChild(n), d.addEventListener("click", a, !1);
    var o = document.createElement("div");
    o.className = "pgEarth-credit-lightbox-title", o.textContent = "Data provided by:", n.appendChild(o);
    var h = document.createElement("a");
    h.onclick = this.hideLightbox.bind(this), h.innerHTML = "&times;", h.className = "pgEarth-credit-lightbox-close", n.appendChild(h);
    var l = document.createElement("ul");
    n.appendChild(l);
    var s = document.createElement("div");
    s.className = "pgEarth-credit-logoContainer", s.style.display = "inline", t.appendChild(s);
    var p = document.createElement("div");
    p.className = "pgEarth-credit-textContainer", p.style.display = "inline", t.appendChild(p);
    var c = document.createElement("a");
    c.className = "pgEarth-credit-expand-link", c.onclick = this.showLightbox.bind(this), c.textContent = "Data attribution", t.appendChild(c), function () {
      var t = "";
      t += y(".pgEarth-credit-lightbox-overlay", {
        display: "none",
        "z-index": "1",
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        "background-color": "rgba(80, 80, 80, 0.8)"
      }), t += y(".pgEarth-credit-lightbox", {
        "background-color": "#303336",
        color: E,
        position: "relative",
        "min-height": v + "px",
        margin: "auto"
      }), t += y(".pgEarth-credit-lightbox > ul > li a, .pgEarth-credit-lightbox > ul > li a:visited", {
        color: E
      }), t += y(".pgEarth-credit-lightbox > ul > li a:hover", {
        color: _
      }), t += y(".pgEarth-credit-lightbox.pgEarth-credit-lightbox-expanded", {
        border: "1px solid #444",
        "border-radius": "5px",
        "max-width": "370px"
      }), t += y(".pgEarth-credit-lightbox.pgEarth-credit-lightbox-mobile", {
        height: "100%",
        width: "100%"
      }), t += y(".pgEarth-credit-lightbox-title", {
        padding: "20px 20px 0 20px"
      }), t += y(".pgEarth-credit-lightbox-close", {
        "font-size": "18pt",
        cursor: "pointer",
        position: "absolute",
        top: "0",
        right: "6px",
        color: E
      }), t += y(".pgEarth-credit-lightbox-close:hover", {
        color: _
      }), t += y(".pgEarth-credit-lightbox > ul", {
        margin: "0",
        padding: "12px 20px 12px 40px",
        "font-size": "13px"
      }), t += y(".pgEarth-credit-lightbox > ul > li", {
        "padding-bottom": "6px"
      }), t += y(".pgEarth-credit-lightbox > ul > li *", {
        padding: "0",
        margin: "0"
      }), t += y(".pgEarth-credit-expand-link", {
        "padding-left": "5px",
        cursor: "pointer",
        "text-decoration": "underline",
        color: E
      }), t += y(".pgEarth-credit-expand-link:hover", {
        color: _
      }), t += y(".pgEarth-credit-text", {
        color: E
      }), t += y(".pgEarth-credit-textContainer *, .pgEarth-credit-logoContainer *", {
        display: "inline"
      });
      var e = document.head,
          i = document.createElement("style");
      i.innerHTML = t, e.insertBefore(i, e.firstChild);
    }();
    var g = x.clone(w.pgEarthCredit);
    this._delimiter = m(e, " • "), this._screenContainer = p, this._pgEarthCreditContainer = s, this._lastViewportHeight = void 0, this._lastViewportWidth = void 0, this._lightboxCredits = n, this._creditList = l, this._lightbox = d, this._hideLightbox = a, this._expandLink = c, this._expanded = !1, this._defaultCredits = [], this._pgEarthCredit = g, this._previousPGEarthCredit = void 0, this._currentPGEarthCredit = g, this._currentFrameCredits = {
      screenCredits: new C(),
      lightboxCredits: new C()
    }, this._defaultCredit = void 0, this.viewport = i, this.container = t;
  }

  function d() {
    var t;
    return c(r) || (t = e("Assets/Images/ion-credit.png"), r = new x('<a href="https://pgEarth.com/" target="_blank"><img src="' + t + '" title="PGEarth ion"/></a>', !0)), w._pgEarthCreditInitialized || (w._pgEarthCredit = r, w._pgEarthCreditInitialized = !0), r;
  }

  return w.prototype.addCredit = function (t) {
    if (u.defined("credit", t), t._isIon) return c(this._defaultCredit) || (this._defaultCredit = x.clone(d())), void (this._currentPGEarthCredit = this._defaultCredit);
    t.showOnScreen ? this._currentFrameCredits.screenCredits.set(t.id, t) : this._currentFrameCredits.lightboxCredits.set(t.id, t);
  }, w.prototype.addDefaultCredit = function (t) {
    u.defined("credit", t);
    var e = this._defaultCredits;
    !function (t, e) {
      for (var i = t.length, r = 0; r < i; r++) {
        var d = t[r];
        if (x.equals(d, e)) return 1;
      }
    }(e, t) && e.push(t);
  }, w.prototype.removeDefaultCredit = function (t) {
    u.defined("credit", t);
    var e = this._defaultCredits,
        i = e.indexOf(t);
    -1 !== i && e.splice(i, 1);
  }, w.prototype.showLightbox = function () {
    this._lightbox.style.display = "block", this._expanded = !0;
  }, w.prototype.hideLightbox = function () {
    this._lightbox.style.display = "none", this._expanded = !1;
  }, w.prototype.update = function () {
    var t, e, i, r;
    this._expanded && (e = (t = this)._lightboxCredits, i = t.viewport.clientWidth, r = t.viewport.clientHeight, i !== t._lastViewportWidth && (i < 576 ? (e.className = "pgEarth-credit-lightbox pgEarth-credit-lightbox-mobile", e.style.marginTop = "0") : (e.className = "pgEarth-credit-lightbox pgEarth-credit-lightbox-expanded", e.style.marginTop = Math.floor(.5 * (r - e.clientHeight)) + "px"), t._lastViewportWidth = i), 576 <= i && r !== t._lastViewportHeight && (e.style.marginTop = Math.floor(.5 * (r - e.clientHeight)) + "px", t._lastViewportHeight = r));
  }, w.prototype.beginFrame = function () {
    var t = this._currentFrameCredits,
        e = t.screenCredits;
    e.removeAll();

    for (var i = this._defaultCredits, r = 0; r < i.length; ++r) {
      var d = i[r];
      e.set(d.id, d);
    }

    t.lightboxCredits.removeAll(), x.equals(w.pgEarthCredit, this._pgEarthCredit) || (this._pgEarthCredit = x.clone(w.pgEarthCredit)), this._currentPGEarthCredit = this._pgEarthCredit;
  }, w.prototype.endFrame = function () {
    var t = this._currentFrameCredits.screenCredits.values;
    n(this._screenContainer, t, this._delimiter, void 0);
    var e,
        i,
        r,
        d = this._currentFrameCredits.lightboxCredits.values;
    this._expandLink.style.display = 0 < d.length ? "inline" : "none", n(this._creditList, d, void 0, "li"), i = (e = this)._previousPGEarthCredit, r = e._currentPGEarthCredit, x.equals(r, i) || (c(i) && e._pgEarthCreditContainer.removeChild(i.element), c(r) && e._pgEarthCreditContainer.appendChild(r.element), e._previousPGEarthCredit = r);
  }, w.prototype.destroy = function () {
    return this._lightbox.removeEventListener("click", this._hideLightbox, !1), this.container.removeChild(this._pgEarthCreditContainer), this.container.removeChild(this._screenContainer), this.container.removeChild(this._expandLink), this.viewport.removeChild(this._lightbox), i(this);
  }, w.prototype.isDestroyed = function () {
    return !1;
  }, w._pgEarthCredit = void 0, w._pgEarthCreditInitialized = !1, t(w, {
    pgEarthCredit: {
      get: function get() {
        return d(), w._pgEarthCredit;
      },
      set: function set(t) {
        w._pgEarthCredit = t, w._pgEarthCreditInitialized = !0;
      }
    }
  }), w;
});