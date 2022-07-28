"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/getTimestamp", "../Widgets/getElement"], function (n, o, e, t, p, d, h) {
  "use strict";

  function s(e) {
    e = n(e, n.EMPTY_OBJECT);
    var t = h(e.container);
    if (!o(t)) throw new p("container is required");
    this._container = t;
    var s = document.createElement("div");
    s.className = "pgEarth-performanceDisplay";
    var r = document.createElement("div");
    r.className = "pgEarth-performanceDisplay-fps", this._fpsText = document.createTextNode(""), r.appendChild(this._fpsText);
    var a = document.createElement("div");
    a.className = "pgEarth-performanceDisplay-ms", this._msText = document.createTextNode(""), a.appendChild(this._msText), s.appendChild(a), s.appendChild(r), this._container.appendChild(s), this._lastFpsSampleTime = d(), this._lastMsSampleTime = d(), this._fpsFrameCount = 0, this._msFrameCount = 0, this._throttled = !1;
    var i = document.createElement("div");
    i.className = "pgEarth-performanceDisplay-throttled", this._throttledText = document.createTextNode(""), i.appendChild(this._throttledText), s.appendChild(i);
  }

  return e(s.prototype, {
    throttled: {
      get: function get() {
        return this._throttled;
      },
      set: function set(e) {
        this._throttled !== e && (this._throttledText.nodeValue = e ? "(throttled)" : "", this._throttled = e);
      }
    }
  }), s.prototype.update = function (e) {
    var t = d(),
        s = n(e, !0);
    this._fpsFrameCount++;
    var r,
        a = t - this._lastFpsSampleTime;
    1e3 < a && (r = "N/A", s && (r = 1e3 * this._fpsFrameCount / a | 0), this._fpsText.nodeValue = r + " FPS", this._lastFpsSampleTime = t, this._fpsFrameCount = 0), this._msFrameCount++;
    var i,
        o = t - this._lastMsSampleTime;
    200 < o && (i = "N/A", s && (i = (o / this._msFrameCount).toFixed(2)), this._msText.nodeValue = i + " MS", this._lastMsSampleTime = t, this._msFrameCount = 0);
  }, s.prototype.destroy = function () {
    return t(this);
  }, s;
});