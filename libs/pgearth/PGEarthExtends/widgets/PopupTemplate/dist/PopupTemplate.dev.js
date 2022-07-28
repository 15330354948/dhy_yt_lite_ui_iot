"use strict";

define(["../../../Source/Core/Cartesian2", "../../../Source/Core/Cartesian3", "../../../Source/Core/ScreenSpaceEventHandler", "../../../Source/Core/defined", "../../../Source/Core/ScreenSpaceEventType", "../../../Source/Core/DeveloperError", "../../core/FieldUtils", "../../core/GeoUtils"], function (e, t, n, p, a, o, i, r) {
  function s(e) {
    this.viewer = e.viewer, this.scene = this.viewer.scene, this.title = e.title, this.content = e.content, this.actions = e.actions, this.id = e.id, this.createPopElements(), this.popStart();
  }

  return s.prototype.popStart = function () {
    var e = this;
    if (!p(this.viewer)) throw new o("viewer is required");
    var t = this.scene;
    new n(t.canvas).setInputAction(function (n) {
      var a = t.pick(n.position),
          o = t.globe.pick(e.viewer.camera.getPickRay(n.position), t);
      !p(a) || !a.id || a.id instanceof Array ? e.closePop() : a.id.popupEnabled && (a.id.model && a.id.position && (o = t.pickPosition(n.position)), (a.id.billboard || a.id.label || a.id.point) && a.id.position && (o = a.id.position._value), e.popOut(o, a.id), a.id.popupTemplate && (e.actions = a.id.popupTemplate.actions), setTimeout(function () {
        e.scene.requestRenderMode = !0;
      }, 500));
    }, a.LEFT_CLICK);
  }, s.prototype.popOut = function (n, a) {
    var o = this,
        i = new e(),
        s = a.popupTemplate;
    if (!s) return document.getElementById("trackPopUp").style.display = "none", void (document.getElementById("dockPopUp").style.display = "none");
    document.getElementById("trackPopUp").style.display = "";
    var l = document.getElementsByClassName("pgEarth-popup")[0],
        c = document.getElementsByClassName("pgEarth-popup-header-title")[0],
        d = document.getElementsByClassName("pgEarth-popup-content")[0],
        m = document.getElementById("trackPopUp"),
        u = document.getElementById("dockPopUp");
    c.innerHTML = s.title && this.writeContent(a, "title"), d.innerHTML = s.content && this.writeContent(a, "content");
    var h = r.cartesian2Degrees(n),
        g = h.longitude,
        E = h.latitude,
        v = document.querySelector(".pgEarth-popup"),
        y = new e(v.offsetLeft, 0),
        C = o.viewer.scene.globe.pick(o.viewer.camera.getPickRay(y), o.viewer.scene),
        f = C && r.cartesian2Degrees(C),
        b = f ? f.latitude : 0,
        N = new e(v.offsetLeft + v.clientWidth / 2, v.offsetTop + v.clientHeight / 2),
        k = o.viewer.scene.globe.pick(o.viewer.camera.getPickRay(N), o.viewer.scene),
        T = k && r.cartesian2Degrees(k),
        w = T ? T.latitude : 0;
    o.viewer.camera.flyTo({
      destination: t.fromDegrees(g, E + Math.abs(b - w), o.viewer.camera.positionCartographic.height)
    }), u && (m.style.display = "none", u.getElementsByClassName("pgEarth-popup-header-title")[0].innerHTML = s.title && this.writeContent(a, "title"), u.getElementsByClassName("pgEarth-popup-content")[0].innerHTML = s.title && this.writeContent(a, "content")), o.scene.postRender.addEventListener(function () {
      var e = o.scene.cartesianToCanvasCoordinates(n, i);
      p(e) && (m.style.top = e.y - l.clientHeight - 20 + "px", m.style.left = e.x - m.children[0].offsetWidth / 2 + "px");
    }), a.popupTemplate && o.renderActions(a.popupTemplate.actions), o.scene.requestRenderMode = !1;
  }, s.prototype.closePop = function () {
    var e = document.getElementById("trackPopUp"),
        t = document.getElementById("dockPopUp");

    if (e || t) {
      var n = document.getElementsByClassName("pgEarth-popup-header-title")[0],
          p = document.getElementsByClassName("pgEarth-popup-content")[0];
      n.innerHTML = "", p.innerHTML = "", e.style.display = "none", t && self.viewer.container.removeChild(t), t && (document.getElementsByClassName("pgEarth-popup-button")[0].innerHTML = '<span class="pgEarth-icon-dock-right"></span>'), document.getElementsByClassName("pgEarth-popup-button")[0].setAttribute("title", "停靠"), document.getElementsByClassName("pgEarth-popup-button")[0].setAttribute("aria-label", "停靠");
    }
  }, s.prototype.dockPop = function (e) {
    var t = this,
        n = document.getElementById("trackPopUp");

    if (e && "pgEarth-icon-dock-right" === e.srcElement.className) {
      document.getElementsByClassName("pgEarth-popup-button")[0].innerHTML = '<span class="pgEarth-icon-minimize"></span>', n.style.display = "none";
      var p = document.createElement("div");
      p.id = "dockPopUp", p.appendChild(n.childNodes[0].cloneNode()), p.appendChild(n.childNodes[0].childNodes[0].cloneNode(!0));
      var a = p.getElementsByClassName("pgEarth-popup-button")[0],
          o = p.getElementsByClassName("pgEarth-popup-button")[1];
      a.setAttribute("title", "未停靠"), a.setAttribute("aria-label", "未停靠"), a.onclick = function (e) {
        t.dockPop(e);
      }, o.onclick = function () {
        t.closePop();
      }, t.viewer.container.appendChild(p), t.renderActions(t.actions);
    } else e && "pgEarth-icon-minimize" === e.srcElement.className && (document.getElementsByClassName("pgEarth-popup-button")[0].innerHTML = '<span class="pgEarth-icon-dock-right"></span>', document.getElementsByClassName("pgEarth-popup-button")[0].setAttribute("title", "停靠"), document.getElementsByClassName("pgEarth-popup-button")[0].setAttribute("aria-label", "停靠"), t.viewer.container.removeChild(document.getElementById("dockPopUp")), n.style.display = "block");
  }, s.prototype.createPopElements = function () {
    var e = this;
    if (document.getElementById("trackPopUp")) document.getElementById("trackPopUp").style.display = "";else {
      var t = document.createElement("div");
      t.id = "trackPopUp", t.style.display = "none";
      var n = document.createElement("div");
      n.className = "pgEarth-popup";
      var p = document.createElement("div");
      p.className = "pgEarth-popup-content-wrapper";
      var a = document.createElement("div");
      a.className = "pgEarth-popup-header-buttons";
      var o = document.createElement("div");
      o.className = "pgEarth-popup-button", o.setAttribute("title", "停靠"), o.setAttribute("aria-label", "停靠");
      var i = document.createElement("span");
      i.className = "pgEarth-icon-dock-right", o.appendChild(i), o.onclick = function (t) {
        e.dockPop(t);
      };
      var r = document.createElement("div");
      r.className = "pgEarth-popup-button", r.setAttribute("title", "关闭"), r.setAttribute("aria-label", "关闭");
      var s = document.createElement("span");
      s.className = "pgEarth-icon-close", r.appendChild(s);
      var l = document.createElement("h2");
      l.className = "pgEarth-popup-header-title", a.appendChild(l), a.appendChild(o), a.appendChild(r);
      var c = document.createElement("div");
      c.className = "pgEarth-popup-content";
      var d = document.createElement("div");
      d.className = "pgEarth-popup-footer", p.appendChild(a), p.appendChild(c), p.appendChild(d);
      var m = document.createElement("div");
      m.className = "pgEarth-popup-tip-container";
      var u = document.createElement("div");
      u.className = "pgEarth-popup-tip", m.appendChild(u), n.appendChild(p), n.appendChild(m), r.onclick = function () {
        e.closePop();
      }, t.appendChild(n), e.viewer.container.appendChild(t);
    }
  }, s.prototype.renderActions = function (e) {
    var t = document.getElementById("trackPopUp"),
        n = document.getElementById("dockPopUp"),
        p = t && t.getElementsByClassName("pgEarth-popup-footer")[0],
        a = n && n.getElementsByClassName("pgEarth-popup-footer")[0];

    if (p && (p.innerHTML = ""), a && (a.innerHTML = ""), e instanceof Array && e.length > 0) {
      var o = e.map(l),
          i = e.map(l);

      for (var r in o) {
        p && p.appendChild(o[r]);
      }

      for (var s in i) {
        a && a.appendChild(i[s]);
      }
    }

    function l(e) {
      var t = document.createElement("div");
      t.className = "pgEarth-popup-button", t.setAttribute("title", e.title), t.setAttribute("aria-label", e.title);
      var n = document.createElement("span");
      return e.className && n.setAttribute("class", e.className), e.image && (n.style.backgroundImage = "url(" + e.image + ")"), e.image && n.setAttribute("class", "pgEarth-popup-footer-action-image"), t.appendChild(n), e.event && (t.onclick = e.event), t;
    }
  }, s.prototype.writeContent = function (e, t) {
    var n = i.Trim(e.popupTemplate[t], "g"),
        p = i.extractFieldNames(n);
    var a = "";

    if (1 === p.length && "*" === p[0] && 3 === i.Trim(e.popupTemplate[t], "g").length) {
      var o = e.properties;

      for (var t in a += "<table>", o._propertyNames) {
        a += "<tr><th>" + o._propertyNames[t] + "</th><td>".concat(o[o._propertyNames[t]], "</td></tr>");
      }

      a += "</table>";
    } else if (p.length >= 1) {
      o = e.properties;

      for (var r = e.popupTemplate[t].split(/\{[^}]*\}/), s = 0; s < r.length; s++) {
        s === r.length - 1 || "*" === p[s] ? a += r[s] : a += r[s] + "".concat(o[p[s]]);
      }
    } else a = e.popupTemplate[t];

    return a;
  }, s.prototype.autoPopOut = function (e) {
    var t = this,
        n = this.viewer.entities.values;

    for (var _a in n) {
      if (n[_a].popupTemplate && n[_a].popupTemplate.title && (n[_a].popupTemplate.title === e || n[_a].popupTemplate.id === e)) {
        var p = n[_a].position._value;
        return p && t.createPopElements(), t.popOut(p, n[_a]), void setTimeout(function () {
          t.scene.requestRenderMode = !0;
        }, 500);
      }
    }
  }, s;
});