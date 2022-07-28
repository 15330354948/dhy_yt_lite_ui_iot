"use strict";

define(["../../Core/ClockRange", "../../Core/defined", "../../Core/destroyObject", "../../Core/DeveloperError", "../../Core/JulianDate", "../getElement", "./TimelineHighlightRange", "./TimelineTrack"], function (r, u, e, d, F, _, s, o) {
  "use strict";

  var m = 1e12,
      p = {
    none: 0,
    scrub: 1,
    slide: 2,
    zoom: 3,
    touchOnly: 4
  },
      v = {
    none: 0,
    scrub: 1,
    slideZoom: 2,
    singleTap: 3,
    ignore: 4
  },
      q = [.001, .002, .005, .01, .02, .05, .1, .25, .5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600, 900, 1800, 3600, 7200, 14400, 21600, 43200, 86400, 172800, 345600, 604800, 1296e3, 2592e3, 5184e3, 7776e3, 15552e3, 31536e3, 63072e3, 126144e3, 15768e4, 31536e4, 63072e4, 126144e4, 15768e5, 31536e5, 63072e5, 126144e5, 15768e6, 31536e6],
      a = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function t(t, e) {
    if (!u(t)) throw new d("container is required.");
    if (!u(e)) throw new d("clock is required.");
    t = _(t), this.container = t;
    var i,
        n,
        s,
        o,
        a,
        c,
        h,
        r = document.createElement("div");
    r.className = "pgEarth-timeline-main", t.appendChild(r), this._topDiv = r, this._endJulian = void 0, this._epochJulian = void 0, this._lastXPos = void 0, this._scrubElement = void 0, this._startJulian = void 0, this._timeBarSecondsSpan = void 0, this._clock = e, this._scrubJulian = e.currentTime, this._mainTicSpan = -1, this._mouseMode = p.none, this._touchMode = v.none, this._touchState = {
      centerX: 0,
      spanX: 0
    }, this._mouseX = 0, this._timelineDrag = 0, this._timelineDragLocation = void 0, this._lastHeight = void 0, this._lastWidth = void 0, this._topDiv.innerHTML = '<div class="pgEarth-timeline-bar"></div><div class="pgEarth-timeline-trackContainer"><canvas class="pgEarth-timeline-tracks" width="10" height="1"></canvas></div><div class="pgEarth-timeline-needle"></div><span class="pgEarth-timeline-ruler"></span>', this._timeBarEle = this._topDiv.childNodes[0], this._trackContainer = this._topDiv.childNodes[1], this._trackListEle = this._topDiv.childNodes[1].childNodes[0], this._needleEle = this._topDiv.childNodes[2], this._rulerEle = this._topDiv.childNodes[3], this._context = this._trackListEle.getContext("2d"), this._trackList = [], this._highlightRanges = [], this.zoomTo(e.startTime, e.stopTime), this._onMouseDown = (i = this, function (t) {
      i._mouseMode !== p.touchOnly && (0 === t.button ? (i._mouseMode = p.scrub, i._scrubElement && (i._scrubElement.style.backgroundPosition = "-16px 0"), i._onMouseMove(t)) : (i._mouseX = t.clientX, 2 === t.button ? i._mouseMode = p.zoom : i._mouseMode = p.slide)), t.preventDefault();
    }), this._onMouseUp = (n = this, function (t) {
      n._mouseMode = p.none, n._scrubElement && (n._scrubElement.style.backgroundPosition = "0 0"), n._timelineDrag = 0, n._timelineDragLocation = void 0;
    }), this._onMouseMove = (s = this, function (t) {
      var e, i, n;
      s._mouseMode === p.scrub ? (t.preventDefault(), (e = t.clientX - s._topDiv.getBoundingClientRect().left) < 0 ? (s._timelineDragLocation = 0, s._timelineDrag = -.01 * s._timeBarSecondsSpan) : e > s._topDiv.clientWidth ? (s._timelineDragLocation = s._topDiv.clientWidth, s._timelineDrag = .01 * s._timeBarSecondsSpan) : (s._timelineDragLocation = void 0, s._setTimeBarTime(e, e * s._timeBarSecondsSpan / s._topDiv.clientWidth))) : s._mouseMode === p.slide ? (n = s._mouseX - t.clientX, s._mouseX = t.clientX, 0 !== n && (i = n * s._timeBarSecondsSpan / s._topDiv.clientWidth, s.zoomTo(F.addSeconds(s._startJulian, i, new F()), F.addSeconds(s._endJulian, i, new F())))) : s._mouseMode === p.zoom && (n = s._mouseX - t.clientX, s._mouseX = t.clientX, 0 !== n && s.zoomFrom(Math.pow(1.01, n)));
    }), this._onMouseWheel = (o = this, function (t) {
      var e = t.wheelDeltaY || t.wheelDelta || -t.detail;
      e /= m = Math.max(Math.min(Math.abs(e), m), 1), o.zoomFrom(Math.pow(1.05, -e));
    }), this._onTouchStart = (a = this, function (t) {
      var e,
          i,
          n = t.touches.length,
          s = a._topDiv.getBoundingClientRect().left;

      t.preventDefault(), a._mouseMode = p.touchOnly, 1 === n ? (e = F.secondsDifference(a._scrubJulian, a._startJulian), i = Math.round(e * a._topDiv.clientWidth / a._timeBarSecondsSpan + s), Math.abs(t.touches[0].clientX - i) < 50 ? (a._touchMode = v.scrub, a._scrubElement && (a._scrubElement.style.backgroundPosition = 1 === n ? "-16px 0" : "0 0")) : (a._touchMode = v.singleTap, a._touchState.centerX = t.touches[0].clientX - s)) : 2 === n ? (a._touchMode = v.slideZoom, a._touchState.centerX = .5 * (t.touches[0].clientX + t.touches[1].clientX) - s, a._touchState.spanX = Math.abs(t.touches[0].clientX - t.touches[1].clientX)) : a._touchMode = v.ignore;
    }), this._onTouchMove = (c = this, function (t) {
      var e,
          i,
          n,
          s,
          o,
          a,
          h = 1,
          r = c._topDiv.getBoundingClientRect().left;

      c._touchMode === v.singleTap && (c._touchMode = v.slideZoom), c._mouseMode = p.touchOnly, c._touchMode === v.scrub ? (t.preventDefault(), 1 === t.changedTouches.length && 0 <= (i = t.changedTouches[0].clientX - r) && i <= c._topDiv.clientWidth && c._setTimeBarTime(i, i * c._timeBarSecondsSpan / c._topDiv.clientWidth)) : c._touchMode === v.slideZoom && (2 === (n = t.touches.length) ? (s = .5 * (t.touches[0].clientX + t.touches[1].clientX) - r, o = Math.abs(t.touches[0].clientX - t.touches[1].clientX)) : 1 === n && (s = t.touches[0].clientX - r, o = 0), u(s) && (a = 0 < o && 0 < c._touchState.spanX ? (h = c._touchState.spanX / o, F.addSeconds(c._startJulian, (c._touchState.centerX * c._timeBarSecondsSpan - s * c._timeBarSecondsSpan * h) / c._topDiv.clientWidth, new F())) : (e = c._touchState.centerX - s, F.addSeconds(c._startJulian, e * c._timeBarSecondsSpan / c._topDiv.clientWidth, new F())), c.zoomTo(a, F.addSeconds(a, c._timeBarSecondsSpan * h, new F())), c._touchState.centerX = s, c._touchState.spanX = o));
    }), this._onTouchEnd = (h = this, function (t) {
      var e = t.touches.length,
          i = h._topDiv.getBoundingClientRect().left;

      h._touchMode === v.singleTap ? (h._touchMode = v.scrub, h._onTouchMove(t)) : h._touchMode === v.scrub && h._onTouchMove(t), h._mouseMode = p.touchOnly, 1 !== e ? h._touchMode = 0 < e ? v.ignore : v.none : h._touchMode === v.slideZoom && (h._touchState.centerX = t.touches[0].clientX - i), h._scrubElement && (h._scrubElement.style.backgroundPosition = "0 0");
    });
    var l = this._timeBarEle;
    document.addEventListener("mouseup", this._onMouseUp, !1), document.addEventListener("mousemove", this._onMouseMove, !1), l.addEventListener("mousedown", this._onMouseDown, !1), l.addEventListener("DOMMouseScroll", this._onMouseWheel, !1), l.addEventListener("mousewheel", this._onMouseWheel, !1), l.addEventListener("touchstart", this._onTouchStart, !1), l.addEventListener("touchmove", this._onTouchMove, !1), l.addEventListener("touchend", this._onTouchEnd, !1), l.addEventListener("touchcancel", this._onTouchEnd, !1), this._topDiv.oncontextmenu = function () {
      return !1;
    }, e.onTick.addEventListener(this.updateFromClock, this), this.updateFromClock();
  }

  function h(t) {
    return t < 10 ? "0" + t.toString() : t.toString();
  }

  return t.prototype.addEventListener = function (t, e, i) {
    this._topDiv.addEventListener(t, e, i);
  }, t.prototype.removeEventListener = function (t, e, i) {
    this._topDiv.removeEventListener(t, e, i);
  }, t.prototype.isDestroyed = function () {
    return !1;
  }, t.prototype.destroy = function () {
    this._clock.onTick.removeEventListener(this.updateFromClock, this), document.removeEventListener("mouseup", this._onMouseUp, !1), document.removeEventListener("mousemove", this._onMouseMove, !1);
    var t = this._timeBarEle;
    t.removeEventListener("mousedown", this._onMouseDown, !1), t.removeEventListener("DOMMouseScroll", this._onMouseWheel, !1), t.removeEventListener("mousewheel", this._onMouseWheel, !1), t.removeEventListener("touchstart", this._onTouchStart, !1), t.removeEventListener("touchmove", this._onTouchMove, !1), t.removeEventListener("touchend", this._onTouchEnd, !1), t.removeEventListener("touchcancel", this._onTouchEnd, !1), this.container.removeChild(this._topDiv), e(this);
  }, t.prototype.addHighlightRange = function (t, e, i) {
    var n = new s(t, e, i);
    return this._highlightRanges.push(n), this.resize(), n;
  }, t.prototype.addTrack = function (t, e, i, n) {
    var s = new o(t, e, i, n);
    return this._trackList.push(s), this._lastHeight = void 0, this.resize(), s;
  }, t.prototype.zoomTo = function (t, e) {
    if (!u(t)) throw new d("startTime is required.");
    if (!u(e)) throw new d("stopTime is required");
    if (F.lessThanOrEquals(e, t)) throw new d("Start time must come before end time.");
    var i, n, s, o, a;
    this._startJulian = t, this._endJulian = e, this._timeBarSecondsSpan = F.secondsDifference(e, t), this._clock && this._clock.clockRange !== r.UNBOUNDED && (i = this._clock.startTime, n = this._clock.stopTime, s = F.secondsDifference(n, i), o = F.secondsDifference(i, this._startJulian), a = F.secondsDifference(n, this._endJulian), this._timeBarSecondsSpan >= s ? (this._timeBarSecondsSpan = s, this._startJulian = this._clock.startTime, this._endJulian = this._clock.stopTime) : 0 < o ? (this._endJulian = F.addSeconds(this._endJulian, o, new F()), this._startJulian = i, this._timeBarSecondsSpan = F.secondsDifference(this._endJulian, this._startJulian)) : a < 0 && (this._startJulian = F.addSeconds(this._startJulian, a, new F()), this._endJulian = n, this._timeBarSecondsSpan = F.secondsDifference(this._endJulian, this._startJulian))), this._makeTics();
    var h = document.createEvent("Event");
    h.initEvent("setzoom", !0, !0), h.startJulian = this._startJulian, h.endJulian = this._endJulian, h.epochJulian = this._epochJulian, h.totalSpan = this._timeBarSecondsSpan, h.mainTicSpan = this._mainTicSpan, this._topDiv.dispatchEvent(h);
  }, t.prototype.zoomFrom = function (t) {
    var e = F.secondsDifference(this._scrubJulian, this._startJulian);
    1 < t || e < 0 || e > this._timeBarSecondsSpan ? e = .5 * this._timeBarSecondsSpan : e += e - .5 * this._timeBarSecondsSpan;
    var i = this._timeBarSecondsSpan - e;
    this.zoomTo(F.addSeconds(this._startJulian, e - e * t, new F()), F.addSeconds(this._endJulian, i * t - i, new F()));
  }, t.prototype.makeLabel = function (t) {
    var e = F.toGregorianDate(t),
        i = e.millisecond,
        n = " UTC";

    if (0 < i && this._timeBarSecondsSpan < 3600) {
      for (n = Math.floor(i).toString(); n.length < 3;) {
        n = "0" + n;
      }

      n = "." + n;
    }

    return a[e.month - 1] + " " + e.day + " " + e.year + " " + h(e.hour) + ":" + h(e.minute) + ":" + h(e.second) + n;
  }, t.prototype.smallestTicInPixels = 7, t.prototype._makeTics = function () {
    var t,
        e = this._timeBarEle,
        i = F.secondsDifference(this._scrubJulian, this._startJulian),
        n = Math.round(i * this._topDiv.clientWidth / this._timeBarSecondsSpan),
        s = n - 8,
        o = this;
    this._needleEle.style.left = n.toString() + "px";
    var a = "",
        h = 31536e6,
        r = 1e-10,
        c = 0,
        l = this._timeBarSecondsSpan;
    l < .01 ? (l = .01, this._timeBarSecondsSpan = .01, this._endJulian = F.addSeconds(this._startJulian, .01, new F())) : h < l && (l = h, this._timeBarSecondsSpan = h, this._endJulian = F.addSeconds(this._startJulian, h, new F()));
    var u = this._timeBarEle.clientWidth;
    u < 10 && (u = 10);

    var d = this._startJulian,
        _ = Math.min(l / u * 1e-5, .4),
        m = F.toGregorianDate(d),
        p = 31536e4 < l ? F.fromDate(new Date(Date.UTC(100 * Math.floor(m.year / 100), 0))) : 31536e3 < l ? F.fromDate(new Date(Date.UTC(10 * Math.floor(m.year / 10), 0))) : 86400 < l ? F.fromDate(new Date(Date.UTC(m.year, 0))) : F.fromDate(new Date(Date.UTC(m.year, m.month, m.day))),
        v = F.secondsDifference(this._startJulian, F.addSeconds(p, _, new F())),
        S = v + l;

    function f(t) {
      return Math.floor(v / t) * t;
    }

    function g(t, e) {
      return Math.ceil(t / e + .5) * e;
    }

    function E(t) {
      return (t - v) / l;
    }

    function M(t, e) {
      return t - e * Math.round(t / e);
    }

    this._epochJulian = p, this._rulerEle.innerHTML = this.makeLabel(F.addSeconds(this._endJulian, -.01, new F()));
    var D = this._rulerEle.offsetWidth + 20;
    D < 30 && (D = 180);
    var T = c;
    c -= r;
    var J = {
      startTime: v,
      startJulian: d,
      epochJulian: p,
      duration: l,
      timeBarWidth: u,
      getAlpha: E
    };

    this._highlightRanges.forEach(function (t) {
      a += t.render(J);
    });

    var b = 0,
        k = 0,
        L = 0,
        y = D / u;
    1 < y && (y = 1), y *= this._timeBarSecondsSpan;

    for (var w = -1, B = -1, X = q.length, C = 0; C < X; ++C) {
      var W = q[C];
      if (++w, y < (b = W) && c < W) break;
      B < 0 && u * (W / this._timeBarSecondsSpan) >= this.smallestTicInPixels && (B = w);
    }

    if (0 < w) {
      for (; 0 < w;) {
        if (--w, Math.abs(M(b, q[w])) < 1e-5) {
          c <= q[w] && (k = q[w]);
          break;
        }
      }

      if (0 <= B) for (; B < w;) {
        if (Math.abs(M(k, q[B])) < 1e-5 && c <= q[B]) {
          L = q[B];
          break;
        }

        ++B;
      }
    }

    r < (c = T) && L < 1e-5 && Math.abs(c - b) > r && (L = c) <= b + r && (k = 0);
    var x,
        z = -999999;
    if (3 <= u * (L / this._timeBarSecondsSpan)) for (t = f(L); t <= S; t = g(t, L)) {
      a += '<span class="pgEarth-timeline-ticTiny" style="left: ' + Math.round(u * E(t)).toString() + 'px;"></span>';
    }
    if (3 <= u * (k / this._timeBarSecondsSpan)) for (t = f(k); t <= S; t = g(t, k)) {
      a += '<span class="pgEarth-timeline-ticSub" style="left: ' + Math.round(u * E(t)).toString() + 'px;"></span>';
    }

    if (2 <= u * (b / this._timeBarSecondsSpan)) {
      S += this._mainTicSpan = b, t = f(b);

      for (var R = F.computeTaiMinusUtc(p); t <= S;) {
        var U,
            H = F.addSeconds(d, t - v, new F());
        2.1 < b && (U = F.computeTaiMinusUtc(H), .1 < Math.abs(U - R) && (t += U - R, H = F.addSeconds(d, t - v, new F())));
        var O = Math.round(u * E(t)),
            N = this.makeLabel(H);
        this._rulerEle.innerHTML = N, (x = this._rulerEle.offsetWidth) < 10 && (x = D);
        var P = O - (x / 2 - 1);
        z < P ? (z = P + x + 5, a += '<span class="pgEarth-timeline-ticMain" style="left: ' + O.toString() + 'px;"></span><span class="pgEarth-timeline-ticLabel" style="left: ' + P.toString() + 'px;">' + N + "</span>") : a += '<span class="pgEarth-timeline-ticSub" style="left: ' + O.toString() + 'px;"></span>', t = g(t, b);
      }
    } else this._mainTicSpan = -1;

    a += '<span class="pgEarth-timeline-icon16" style="left:' + s + 'px;bottom:0;background-position: 0 0;"></span>', e.innerHTML = a, this._scrubElement = e.lastChild, this._context.clearRect(0, 0, this._trackListEle.width, this._trackListEle.height), J.y = 0, this._trackList.forEach(function (t) {
      t.render(o._context, J), J.y += t.height;
    });
  }, t.prototype.updateFromClock = function () {
    this._scrubJulian = this._clock.currentTime;
    var t,
        e,
        i = this._scrubElement;
    u(this._scrubElement) && (t = F.secondsDifference(this._scrubJulian, this._startJulian), e = Math.round(t * this._topDiv.clientWidth / this._timeBarSecondsSpan), this._lastXPos !== e && (this._lastXPos = e, i.style.left = e - 8 + "px", this._needleEle.style.left = e + "px")), u(this._timelineDragLocation) && (this._setTimeBarTime(this._timelineDragLocation, this._timelineDragLocation * this._timeBarSecondsSpan / this._topDiv.clientWidth), this.zoomTo(F.addSeconds(this._startJulian, this._timelineDrag, new F()), F.addSeconds(this._endJulian, this._timelineDrag, new F())));
  }, t.prototype._setTimeBarTime = function (t, e) {
    var i;
    t = Math.round(t), this._scrubJulian = F.addSeconds(this._startJulian, e, new F()), this._scrubElement && (i = t - 8, this._scrubElement.style.left = i.toString() + "px", this._needleEle.style.left = t.toString() + "px");
    var n = document.createEvent("Event");
    n.initEvent("settime", !0, !0), n.clientX = t, n.timeSeconds = e, n.timeJulian = this._scrubJulian, n.clock = this._clock, this._topDiv.dispatchEvent(n);
  }, t.prototype.resize = function () {
    var e,
        t = this.container.clientWidth,
        i = this.container.clientHeight;
    t === this._lastWidth && i === this._lastHeight || (this._trackContainer.style.height = i + "px", e = 1, this._trackList.forEach(function (t) {
      e += t.height;
    }), this._trackListEle.style.height = e.toString() + "px", this._trackListEle.width = this._trackListEle.clientWidth, this._trackListEle.height = e, this._makeTics(), this._lastXPos = void 0, this._lastWidth = t, this._lastHeight = i);
  }, t;
});