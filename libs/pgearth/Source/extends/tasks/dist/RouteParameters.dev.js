"use strict";

define(["../../Core/defined", "../../Core/DeveloperError"], function (e, n) {
  function t(t) {
    if (!e(t.start) || !e(t.end)) throw new n("start or end is required");
    if (!e(t.start.x) || !e(t.start.y)) throw new n("start must be included x and y");
    if (!e(t.end.x) || !e(t.end.y)) throw new n("end must be included x and y");
    this._start = t.start, this._end = t.end;
  }

  return t.prototype.getStart = function () {
    return this._start;
  }, t.prototype.getEnd = function () {
    return this._end;
  }, t;
});