"use strict";

define(["../Core/defaultValue", "../Core/defineProperties"], function (t, e) {
  "use strict";

  function i(e) {
    e = t(e, t.EMPTY_OBJECT), this.time = t(e.time, 0), this.minimum = t(e.minimum, 0), this.maximum = t(e.maximum, 50), this._complete = !1;
  }

  return e(i.prototype, {
    complete: {
      get: function get() {
        return this._complete;
      }
    }
  }), i;
});