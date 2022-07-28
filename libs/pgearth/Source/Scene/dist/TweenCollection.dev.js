"use strict";

define(["../Core/clone", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/EasingFunction", "../Core/getTimestamp", "../Core/TimeConstants", "../ThirdParty/Tween"], function (c, u, p, t, d, l, i, f, h) {
  "use strict";

  function w(t, e, n, r, o, i, a, s, u, p) {
    this._tweens = t, this._tweenjs = e, this._startObject = c(n), this._stopObject = c(r), this._duration = o, this._delay = i, this._easingFunction = a, this._update = s, this._complete = u, this.cancel = p, this.needsStart = !0;
  }

  function e() {
    this._tweens = [];
  }

  return t(w.prototype, {
    startObject: {
      get: function get() {
        return this._startObject;
      }
    },
    stopObject: {
      get: function get() {
        return this._stopObject;
      }
    },
    duration: {
      get: function get() {
        return this._duration;
      }
    },
    delay: {
      get: function get() {
        return this._delay;
      }
    },
    easingFunction: {
      get: function get() {
        return this._easingFunction;
      }
    },
    update: {
      get: function get() {
        return this._update;
      }
    },
    complete: {
      get: function get() {
        return this._complete;
      }
    },
    tweenjs: {
      get: function get() {
        return this._tweenjs;
      }
    }
  }), w.prototype.cancelTween = function () {
    this._tweens.remove(this);
  }, t(e.prototype, {
    length: {
      get: function get() {
        return this._tweens.length;
      }
    }
  }), e.prototype.add = function (t) {
    if (t = u(t, u.EMPTY_OBJECT), !p(t.startObject) || !p(t.stopObject)) throw new d("options.startObject and options.stopObject are required.");
    if (!p(t.duration) || t.duration < 0) throw new d("options.duration is required and must be positive.");
    if (0 === t.duration) return p(t.complete) && t.complete(), new w(this);
    var e = t.duration / f.SECONDS_PER_MILLISECOND,
        n = u(t.delay, 0),
        r = n / f.SECONDS_PER_MILLISECOND,
        o = u(t.easingFunction, l.LINEAR_NONE),
        i = t.startObject,
        a = new h.Tween(i);
    a.to(c(t.stopObject), e), a.delay(r), a.easing(o), p(t.update) && a.onUpdate(function () {
      t.update(i);
    }), a.onComplete(u(t.complete, null)), a.repeat(u(t._repeat, 0));
    var s = new w(this, a, t.startObject, t.stopObject, t.duration, n, o, t.update, t.complete, t.cancel);
    return this._tweens.push(s), s;
  }, e.prototype.addProperty = function (t) {
    var e = (t = u(t, u.EMPTY_OBJECT)).object,
        n = t.property,
        r = t.startValue,
        o = t.stopValue;
    if (!p(e) || !p(t.property)) throw new d("options.object and options.property are required.");
    if (!p(e[n])) throw new d("options.object must have the specified property.");
    if (!p(r) || !p(o)) throw new d("options.startValue and options.stopValue are required.");
    return this.add({
      startObject: {
        value: r
      },
      stopObject: {
        value: o
      },
      duration: u(t.duration, 3),
      delay: t.delay,
      easingFunction: t.easingFunction,
      update: function update(t) {
        e[n] = t.value;
      },
      complete: t.complete,
      cancel: t.cancel,
      _repeat: t._repeat
    });
  }, e.prototype.addAlpha = function (t) {
    var r = (t = u(t, u.EMPTY_OBJECT)).material;
    if (!p(r)) throw new d("options.material is required.");
    var o = [];

    for (var e in r.uniforms) {
      r.uniforms.hasOwnProperty(e) && p(r.uniforms[e]) && p(r.uniforms[e].alpha) && o.push(e);
    }

    if (0 === o.length) throw new d("material has no properties with alpha components.");
    return this.add({
      startObject: {
        alpha: u(t.startValue, 0)
      },
      stopObject: {
        alpha: u(t.stopValue, 1)
      },
      duration: u(t.duration, 3),
      delay: t.delay,
      easingFunction: t.easingFunction,
      update: function update(t) {
        for (var e = o.length, n = 0; n < e; ++n) {
          r.uniforms[o[n]].alpha = t.alpha;
        }
      },
      complete: t.complete,
      cancel: t.cancel
    });
  }, e.prototype.addOffsetIncrement = function (t) {
    var e = (t = u(t, u.EMPTY_OBJECT)).material;
    if (!p(e)) throw new d("material is required.");
    if (!p(e.uniforms.offset)) throw new d("material.uniforms must have an offset property.");
    var n = e.uniforms;
    return this.addProperty({
      object: n,
      property: "offset",
      startValue: n.offset,
      stopValue: n.offset + 1,
      duration: t.duration,
      delay: t.delay,
      easingFunction: t.easingFunction,
      update: t.update,
      cancel: t.cancel,
      _repeat: 1 / 0
    });
  }, e.prototype.remove = function (t) {
    if (!p(t)) return !1;

    var e = this._tweens.indexOf(t);

    return -1 !== e && (t.tweenjs.stop(), p(t.cancel) && t.cancel(), this._tweens.splice(e, 1), !0);
  }, e.prototype.removeAll = function () {
    for (var t = this._tweens, e = 0; e < t.length; ++e) {
      var n = t[e];
      n.tweenjs.stop(), p(n.cancel) && n.cancel();
    }

    t.length = 0;
  }, e.prototype.contains = function (t) {
    return p(t) && -1 !== this._tweens.indexOf(t);
  }, e.prototype.get = function (t) {
    if (!p(t)) throw new d("index is required.");
    return this._tweens[t];
  }, e.prototype.update = function (t) {
    var e = this._tweens,
        n = 0;

    for (t = p(t) ? t / f.SECONDS_PER_MILLISECOND : i(); n < e.length;) {
      var r = e[n],
          o = r.tweenjs;
      r.needsStart ? (r.needsStart = !1, o.start(t)) : o.update(t) ? n++ : (o.stop(), e.splice(n, 1));
    }
  }, e;
});