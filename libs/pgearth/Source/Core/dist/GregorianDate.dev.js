"use strict";

define(function () {
  "use strict";

  return function (i, t, s, n, e, h, o, c) {
    this.year = i, this.month = t, this.day = s, this.hour = n, this.minute = e, this.second = h, this.millisecond = o, this.isLeapSecond = c;
  };
});