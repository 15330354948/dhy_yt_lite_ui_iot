"use strict";

define(["./defaultValue", "./defined", "./formatError"], function (u, a, h) {
  "use strict";

  function l(e, r, t, i, s, n, o) {
    this.provider = e, this.message = r, this.x = t, this.y = i, this.level = s, this.timesRetried = u(n, 0), this.retry = !1, this.error = o;
  }

  return l.handleError = function (e, r, t, i, s, n, o, u, c) {
    var d = e;
    return a(e) ? (d.provider = r, d.message = i, d.x = s, d.y = n, d.level = o, d.retry = !1, d.error = c, ++d.timesRetried) : d = new l(r, i, s, n, o, 0, c), 0 < t.numberOfListeners ? t.raiseEvent(d) : console.log('An error occurred in "' + r.constructor.name + '": ' + h(i)), d.retry && a(u) && u(), d;
  }, l.handleSuccess = function (e) {
    a(e) && (e.timesRetried = -1);
  }, l;
});