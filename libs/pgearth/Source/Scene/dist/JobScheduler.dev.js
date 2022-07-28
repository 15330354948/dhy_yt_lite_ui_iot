"use strict";

define(["../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/getTimestamp", "./JobType"], function (o, e, h, t, m) {
  "use strict";

  function n(e) {
    this._total = e, this.usedThisFrame = 0, this.stolenFromMeThisFrame = 0, this.starvedThisFrame = !1, this.starvedLastFrame = !1;
  }

  function d(e) {
    if (o(e) && e.length !== m.NUMBER_OF_JOB_TYPES) throw new h("A budget must be specified for each job type; budgets.length should equal JobType.NUMBER_OF_JOB_TYPES.");
    var t = new Array(m.NUMBER_OF_JOB_TYPES);
    t[m.TEXTURE] = new n(o(e) ? e[m.TEXTURE] : 10), t[m.PROGRAM] = new n(o(e) ? e[m.PROGRAM] : 10), t[m.BUFFER] = new n(o(e) ? e[m.BUFFER] : 30);

    for (var r = t.length, s = 0, a = 0; a < r; ++a) {
      s += t[a].total;
    }

    var i = new Array(r);

    for (a = 0; a < r; ++a) {
      i[a] = !1;
    }

    this._totalBudget = s, this._totalUsedThisFrame = 0, this._budgets = t, this._executedThisFrame = i;
  }

  return e(n.prototype, {
    total: {
      get: function get() {
        return this._total;
      }
    }
  }), d.getTimestamp = t, e(d.prototype, {
    totalBudget: {
      get: function get() {
        return this._totalBudget;
      }
    }
  }), d.prototype.disableThisFrame = function () {
    this._totalUsedThisFrame = this._totalBudget;
  }, d.prototype.resetBudgets = function () {
    for (var e = this._budgets, t = e.length, r = 0; r < t; ++r) {
      var s = e[r];
      s.starvedLastFrame = s.starvedThisFrame, s.starvedThisFrame = !1, s.usedThisFrame = 0, s.stolenFromMeThisFrame = 0;
    }

    this._totalUsedThisFrame = 0;
  }, d.prototype.execute = function (e, t) {
    var r,
        s = this._budgets,
        a = s[t],
        i = this._executedThisFrame[t];
    if (this._totalUsedThisFrame >= this._totalBudget && i) return !(a.starvedThisFrame = !0);

    if (a.usedThisFrame + a.stolenFromMeThisFrame >= a.total) {
      for (var o = s.length, h = 0; h < o && (!((r = s[h]).usedThisFrame + r.stolenFromMeThisFrame < r.total) || r.starvedLastFrame); ++h) {
        ;
      }

      if (h === o && i) return !1;
      i && (a.starvedThisFrame = !0);
    }

    var m = d.getTimestamp();
    e.execute();
    var n = d.getTimestamp() - m;
    return this._totalUsedThisFrame += n, r ? r.stolenFromMeThisFrame += n : a.usedThisFrame += n, this._executedThisFrame[t] = !0;
  }, d;
});