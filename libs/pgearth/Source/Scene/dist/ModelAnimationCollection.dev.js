"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/deprecationWarning", "../Core/DeveloperError", "../Core/Event", "../Core/JulianDate", "../Core/Math", "./ModelAnimation", "./ModelAnimationLoop", "./ModelAnimationState"], function (A, w, e, t, r, i, R, g, a, M, O) {
  "use strict";

  function n(e) {
    this.animationAdded = new i(), this.animationRemoved = new i(), this._model = e, this._scheduledAnimations = [], this._previousTime = void 0;
  }

  function s(e, t, i) {
    var n = e._model,
        o = n._runtime.animations[t],
        r = new a(i, n, o);
    return e._scheduledAnimations.push(r), e.animationAdded.raiseEvent(n, r), r;
  }

  e(n.prototype, {
    length: {
      get: function get() {
        return this._scheduledAnimations.length;
      }
    }
  }), n.prototype.add = function (e) {
    e = A(e, A.EMPTY_OBJECT);
    var t,
        i = this._model._runtime.animations;
    if (!w(i)) throw new r("Animations are not loaded.  Wait for Model.readyPromise to resolve.");
    if (!w(e.name) && !w(e.index)) throw new r("Either options.name or options.index must be defined.");
    if (w(e.multiplier) && e.multiplier <= 0) throw new r("options.multiplier must be greater than zero.");
    if (w(e.index) && (e.index >= i.length || e.index < 0)) throw new r("options.index must be a valid animation index.");
    if (w(e.index)) return s(this, e.index, e);

    for (var n = i.length, o = 0; o < n; ++o) {
      if (i[o].name === e.name) {
        t = o;
        break;
      }
    }

    if (!w(t)) throw new r("options.name must be a valid animation name.");
    return s(this, t, e);
  }, n.prototype.addAll = function (e) {
    if (e = A(e, A.EMPTY_OBJECT), !w(this._model._runtime.animations)) throw new r("Animations are not loaded.  Wait for Model.readyPromise to resolve.");
    if (w(e.multiplier) && e.multiplier <= 0) throw new r("options.multiplier must be greater than zero.");

    for (var t = [], i = this._model._runtime.animations.length, n = 0; n < i; ++n) {
      t.push(s(this, n, e));
    }

    return t;
  }, n.prototype.remove = function (e) {
    if (w(e)) {
      var t = this._scheduledAnimations,
          i = t.indexOf(e);
      if (-1 !== i) return t.splice(i, 1), this.animationRemoved.raiseEvent(this._model, e), !0;
    }

    return !1;
  }, n.prototype.removeAll = function () {
    var e = this._model,
        t = this._scheduledAnimations,
        i = t.length;
    this._scheduledAnimations = [];

    for (var n = 0; n < i; ++n) {
      this.animationRemoved.raiseEvent(e, t[n]);
    }
  }, n.prototype.contains = function (e) {
    return !!w(e) && -1 !== this._scheduledAnimations.indexOf(e);
  }, n.prototype.get = function (e) {
    if (!w(e)) throw new r("index is required.");
    return this._scheduledAnimations[e];
  };
  var x = [];
  return n.prototype.update = function (e) {
    var t = this._scheduledAnimations,
        i = t.length;
    if (0 === i) return this._previousTime = void 0, !1;
    if (R.equals(e.time, this._previousTime)) return !1;
    this._previousTime = R.clone(e.time, this._previousTime);

    for (var n = !1, o = e.time, r = this._model, a = 0; a < i; ++a) {
      var s = t[a],
          d = s._runtimeAnimation;
      w(s._computedStartTime) || (s._computedStartTime = R.addSeconds(A(s.startTime, o), s.delay, new R())), w(s._duration) || (s._duration = d.stopTime * (1 / s.multiplier));

      var m,
          u,
          l,
          h = s._computedStartTime,
          p = s._duration,
          f = s.stopTime,
          v = 0 !== p ? R.secondsDifference(o, h) / p : 0,
          _ = 0 <= v,
          c = s.loop === M.REPEAT || s.loop === M.MIRRORED_REPEAT;

      (_ || c && !w(s.startTime)) && (v <= 1 || c) && (!w(f) || R.lessThanOrEquals(o, f)) ? (s._state === O.STOPPED && (s._state = O.ANIMATING, 0 < s.start.numberOfListeners && e.afterRender.push(s._raiseStartEvent)), s.loop === M.REPEAT ? v -= Math.floor(v) : s.loop === M.MIRRORED_REPEAT && (u = v - (m = Math.floor(v)), v = m % 2 == 1 ? 1 - u : u), s.reverse && (v = 1 - v), l = v * p * s.multiplier, function (e, t) {
        for (var i = e.channelEvaluators, n = i.length, o = 0; o < n; ++o) {
          i[o](t);
        }
      }(d, l = g.clamp(l, d.startTime, d.stopTime)), 0 < s.update.numberOfListeners && (s._updateEventTime = l, e.afterRender.push(s._raiseUpdateEvent)), n = !0) : _ && s._state === O.ANIMATING && (s._state = O.STOPPED, 0 < s.stop.numberOfListeners && e.afterRender.push(s._raiseStopEvent), s.removeOnStop && x.push(s));
    }

    i = x.length;

    for (var E = 0; E < i; ++E) {
      var T = x[E];
      t.splice(t.indexOf(T), 1), e.afterRender.push(function (e, t, i) {
        return function () {
          e.animationRemoved.raiseEvent(t, i);
        };
      }(this, r, T));
    }

    return x.length = 0, n;
  }, n;
});