"use strict";

define(["../Core/Check", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/JulianDate", "../Core/Request", "../Core/RequestType"], function (i, r, a, e, t, l, h, f) {
  "use strict";

  function n(e) {
    e = r(e, r.EMPTY_OBJECT), i.typeOf.object("options.clock", e.clock), i.typeOf.object("options.times", e.times), i.typeOf.func("options.requestImageFunction", e.requestImageFunction), i.typeOf.func("options.reloadFunction", e.reloadFunction), this._tileCache = {}, this._tilesRequestedForInterval = [];
    var t = this._clock = e.clock;
    this._times = e.times, this._requestImageFunction = e.requestImageFunction, this._reloadFunction = e.reloadFunction, this._currentIntervalIndex = -1, t.onTick.addEventListener(this._clockOnTick, this), this._clockOnTick(t);
  }

  function u(e, t, i) {
    return e + "-" + t + "-" + i;
  }

  function _(e) {
    var t = e._times;

    if (a(t)) {
      var i = e._clock,
          r = i.currentTime,
          n = i.canAnimate && i.shouldAnimate,
          o = i.multiplier;

      if (n || 0 === o) {
        var c,
            s = t.indexOf(r);

        if (!(s < 0)) {
          var u = t.get(s);
          return 0 < o ? (c = l.secondsDifference(u.stop, r), ++s) : (c = l.secondsDifference(u.start, r), --s), c /= o, 0 <= s && c <= 5 ? t.get(s) : void 0;
        }
      }
    }
  }

  function p(e, t, i) {
    var r = e._times.indexOf(i.start),
        n = e._tileCache,
        o = n[r];

    a(o) || (o = n[r] = {});
    var c = t.key;
    if (a(o[c])) return !0;

    var s = function (e) {
      var t = e.split("-");
      if (3 === t.length) return {
        x: Number(t[0]),
        y: Number(t[1]),
        level: Number(t[2])
      };
    }(c),
        u = new h({
      throttle: !0,
      throttleByServer: !0,
      type: f.IMAGERY,
      priorityFunction: t.priorityFunction
    }),
        l = e._requestImageFunction(s.x, s.y, s.level, u, i);

    return !!a(l) && (o[c] = {
      promise: l,
      request: u
    }, !0);
  }

  return e(n.prototype, {
    clock: {
      get: function get() {
        return this._clock;
      },
      set: function set(e) {
        if (!a(e)) throw new t("value is required.");
        this._clock !== e && (this._clock = e, this._clockOnTick(e), this._reloadFunction());
      }
    },
    times: {
      get: function get() {
        return this._times;
      },
      set: function set(e) {
        if (!a(e)) throw new t("value is required.");
        this._times !== e && (this._times = e, this._clockOnTick(this._clock), this._reloadFunction());
      }
    },
    currentInterval: {
      get: function get() {
        return this._times.get(this._currentIntervalIndex);
      }
    }
  }), n.prototype.getFromCache = function (e, t, i, r) {
    var n,
        o,
        c = u(e, t, i),
        s = this._tileCache[this._currentIntervalIndex];
    return a(s) && a(s[c]) && (o = (n = s[c]).promise.otherwise(function (e) {
      throw r.state = n.request.state, e;
    }), delete s[c]), o;
  }, n.prototype.checkApproachingInterval = function (e, t, i, r) {
    var n = u(e, t, i),
        o = this._tilesRequestedForInterval,
        c = _(this),
        s = {
      key: n,
      priorityFunction: r.priorityFunction
    };

    a(c) && p(this, s, c) || o.push(s), 512 <= o.length && o.splice(0, 256);
  }, n.prototype._clockOnTick = function (e) {
    var t = e.currentTime,
        i = this._times.indexOf(t),
        r = this._currentIntervalIndex;

    if (i !== r) {
      var n = this._tileCache[r];

      for (var o in n) {
        n.hasOwnProperty(o) && n[o].request.cancel();
      }

      return delete this._tileCache[r], this._tilesRequestedForInterval = [], this._currentIntervalIndex = i, void this._reloadFunction();
    }

    var c = _(this);

    if (a(c)) for (var s = this._tilesRequestedForInterval, u = !0; u && 0 !== s.length;) {
      var l = s.pop();
      (u = p(this, l, c)) || s.push(l);
    }
  }, n;
});