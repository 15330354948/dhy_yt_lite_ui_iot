"use strict";

define(["../../Source/Core/defined", "../../Source/Core/DeveloperError"], function (t, e) {
  var r = function r(_r) {
    if (!t(_r.start) || !t(_r.end)) throw new e("start or end is required");
    if (!t(_r.start.x) || !t(_r.start.y)) throw new e("start must be included x and y");
    if (!t(_r.end.x) || !t(_r.end.y)) throw new e("start must be included x and y");
    this._start = _r.start, this._end = _r.end;
  };

  return r.prototype.getStart = function () {
    return this._start;
  }, r.prototype.getEnd = function () {
    return this._end;
  }, r;
});