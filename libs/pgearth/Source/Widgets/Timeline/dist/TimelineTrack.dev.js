"use strict";

define(["../../Core/Color", "../../Core/defined", "../../Core/JulianDate"], function (a, d, u) {
  "use strict";

  function t(t, r, i, e) {
    this.interval = t, this.height = r, this.color = i || new a(.5, .5, .5, 1), this.backgroundColor = e || new a(0, 0, 0, 0);
  }

  return t.prototype.render = function (t, r) {
    var i = this.interval.start,
        e = this.interval.stop,
        a = r.startJulian,
        l = u.addSeconds(r.startJulian, r.duration, new u());
    if (u.lessThan(i, a) && u.greaterThan(e, l)) t.fillStyle = this.color.toCssColorString(), t.fillRect(0, r.y, r.timeBarWidth, this.height);else if (u.lessThanOrEquals(i, l) && u.greaterThanOrEquals(e, a)) {
      for (var o, n, s = 0; s < r.timeBarWidth; ++s) {
        var h = u.addSeconds(r.startJulian, s / r.timeBarWidth * r.duration, new u());
        !d(o) && u.greaterThanOrEquals(h, i) ? o = s : !d(n) && u.greaterThanOrEquals(h, e) && (n = s);
      }

      t.fillStyle = this.backgroundColor.toCssColorString(), t.fillRect(0, r.y, r.timeBarWidth, this.height), d(o) && (d(n) || (n = r.timeBarWidth), t.fillStyle = this.color.toCssColorString(), t.fillRect(o, r.y, Math.max(n - o, 1), this.height));
    }
  }, t;
});