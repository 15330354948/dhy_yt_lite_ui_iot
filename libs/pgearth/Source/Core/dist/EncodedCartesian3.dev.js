"use strict";

define(["./Cartesian3", "./Check", "./defined"], function (e, t, o) {
  "use strict";

  function h() {
    this.high = e.clone(e.ZERO), this.low = e.clone(e.ZERO);
  }

  h.encode = function (e, n) {
    var r;
    return t.typeOf.number("value", e), o(n) || (n = {
      high: 0,
      low: 0
    }), 0 <= e ? (r = 65536 * Math.floor(e / 65536), n.high = r, n.low = e - r) : (r = 65536 * Math.floor(-e / 65536), n.high = -r, n.low = e + r), n;
  };

  var a = {
    high: 0,
    low: 0
  };

  h.fromCartesian = function (e, n) {
    t.typeOf.object("cartesian", e), o(n) || (n = new h());
    var r = n.high,
        i = n.low;
    return h.encode(e.x, a), r.x = a.high, i.x = a.low, h.encode(e.y, a), r.y = a.high, i.y = a.low, h.encode(e.z, a), r.z = a.high, i.z = a.low, n;
  };

  var l = new h();
  return h.writeElements = function (e, n, r) {
    t.defined("cartesianArray", n), t.typeOf.number("index", r), t.typeOf.number.greaterThanOrEquals("index", r, 0), h.fromCartesian(e, l);
    var i = l.high,
        o = l.low;
    n[r] = i.x, n[r + 1] = i.y, n[r + 2] = i.z, n[r + 3] = o.x, n[r + 4] = o.y, n[r + 5] = o.z;
  }, h;
});