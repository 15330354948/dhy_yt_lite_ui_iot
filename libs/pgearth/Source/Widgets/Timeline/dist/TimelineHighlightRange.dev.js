"use strict";

define(["../../Core/defaultValue", "../../Core/JulianDate"], function (o, n) {
  "use strict";

  function t(t, e, i) {
    this._color = t, this._height = e, this._base = o(i, 0);
  }

  return t.prototype.getHeight = function () {
    return this._height;
  }, t.prototype.getBase = function () {
    return this._base;
  }, t.prototype.getStartTime = function () {
    return this._start;
  }, t.prototype.getStopTime = function () {
    return this._stop;
  }, t.prototype.setRange = function (t, e) {
    this._start = t, this._stop = e;
  }, t.prototype.render = function (t) {
    var e,
        i,
        o,
        r,
        h = "";
    return this._start && this._stop && this._color && (e = n.secondsDifference(this._start, t.epochJulian), i = Math.round(t.timeBarWidth * t.getAlpha(e)), o = n.secondsDifference(this._stop, t.epochJulian), r = Math.round(t.timeBarWidth * t.getAlpha(o)) - i, i < 0 && (r += i, i = 0), i + r > t.timeBarWidth && (r = t.timeBarWidth - i), 0 < r && (h = '<span class="pgEarth-timeline-highlight" style="left: ' + i.toString() + "px; width: " + r.toString() + "px; bottom: " + this._base.toString() + "px; height: " + this._height + "px; background-color: " + this._color + ';"></span>')), h;
  }, t;
});