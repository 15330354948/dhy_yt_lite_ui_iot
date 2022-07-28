"use strict";

define(["./defaultValue", "./defined", "./RequestState", "./RequestType"], function (r, e, n, o) {
  "use strict";

  function i(t) {
    t = r(t, r.EMPTY_OBJECT);
    var e = r(t.throttleByServer, !1),
        i = r(t.throttle, !1);
    this.url = t.url, this.requestFunction = t.requestFunction, this.cancelFunction = t.cancelFunction, this.priorityFunction = t.priorityFunction, this.priority = r(t.priority, 0), this.throttle = i, this.throttleByServer = e, this.type = r(t.type, o.OTHER), this.serverKey = void 0, this.state = n.UNISSUED, this.deferred = void 0, this.cancelled = !1;
  }

  return i.prototype.cancel = function () {
    this.cancelled = !0;
  }, i.prototype.clone = function (t) {
    return e(t) ? (t.url = this.url, t.requestFunction = this.requestFunction, t.cancelFunction = this.cancelFunction, t.priorityFunction = this.priorityFunction, t.priority = this.priority, t.throttle = this.throttle, t.throttleByServer = this.throttleByServer, t.type = this.type, t.serverKey = this.serverKey, t.state = this.RequestState.UNISSUED, t.deferred = void 0, t.cancelled = !1, t) : new i(this);
  }, i;
});