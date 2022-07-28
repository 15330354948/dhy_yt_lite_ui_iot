"use strict";

define(["../Core/Cartesian2", "../Core/Cartesian3", "../Core/Check", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/Event", "../Core/JulianDate", "../Core/Math", "../Core/Matrix4", "./BillboardCollection", "./CircleEmitter", "./Particle"], function (i, d, t, f, r, p, e, a, m, g, b, x, v, o, C) {
  "use strict";

  var s = new i(1, 1);

  function n(e) {
    e = r(e, r.EMPTY_OBJECT), this.show = r(e.show, !0), this.updateCallback = e.updateCallback, this.loop = r(e.loop, !0), this.image = r(e.image, void 0);
    var t = e.emitter;
    p(t) || (t = new o(.5)), this._emitter = t, this._bursts = e.bursts, this._modelMatrix = x.clone(r(e.modelMatrix, x.IDENTITY)), this._emitterModelMatrix = x.clone(r(e.emitterModelMatrix, x.IDENTITY)), this._matrixDirty = !0, this._combinedMatrix = new x(), this._startColor = f.clone(r(e.color, r(e.startColor, f.WHITE))), this._endColor = f.clone(r(e.color, r(e.endColor, f.WHITE))), this._startScale = r(e.scale, r(e.startScale, 1)), this._endScale = r(e.scale, r(e.endScale, 1)), this._emissionRate = r(e.emissionRate, 5), this._minimumSpeed = r(e.speed, r(e.minimumSpeed, 1)), this._maximumSpeed = r(e.speed, r(e.maximumSpeed, 1)), this._minimumParticleLife = r(e.particleLife, r(e.minimumParticleLife, 5)), this._maximumParticleLife = r(e.particleLife, r(e.maximumParticleLife, 5)), this._minimumMass = r(e.mass, r(e.minimumMass, 1)), this._maximumMass = r(e.mass, r(e.maximumMass, 1)), this._minimumImageSize = i.clone(r(e.imageSize, r(e.minimumImageSize, s))), this._maximumImageSize = i.clone(r(e.imageSize, r(e.maximumImageSize, s))), this._lifetime = r(e.lifetime, Number.MAX_VALUE), this._billboardCollection = void 0, this._particles = [], this._particlePool = [], this._previousTime = void 0, this._currentTime = 0, this._carryOver = 0, this._complete = new m(), this._isComplete = !1, this._updateParticlePool = !0, this._particleEstimate = 0;
  }

  function y(e, t) {
    var i = t._billboard;
    p(i) || (i = t._billboard = e._billboardCollection.add({
      image: t.image
    })), i.width = t.imageSize.x, i.height = t.imageSize.y, i.position = t.position, i.show = !0;
    var r = b.lerp(t.startColor.red, t.endColor.red, t.normalizedAge),
        a = b.lerp(t.startColor.green, t.endColor.green, t.normalizedAge),
        m = b.lerp(t.startColor.blue, t.endColor.blue, t.normalizedAge),
        o = b.lerp(t.startColor.alpha, t.endColor.alpha, t.normalizedAge);
    i.color = new f(r, a, m, o), i.scale = b.lerp(t.startScale, t.endScale, t.normalizedAge);
  }

  e(n.prototype, {
    emitter: {
      get: function get() {
        return this._emitter;
      },
      set: function set(e) {
        t.defined("value", e), this._emitter = e;
      }
    },
    bursts: {
      get: function get() {
        return this._bursts;
      },
      set: function set(e) {
        this._bursts = e, this._updateParticlePool = !0;
      }
    },
    modelMatrix: {
      get: function get() {
        return this._modelMatrix;
      },
      set: function set(e) {
        t.defined("value", e), this._matrixDirty = this._matrixDirty || !x.equals(this._modelMatrix, e), x.clone(e, this._modelMatrix);
      }
    },
    emitterModelMatrix: {
      get: function get() {
        return this._emitterModelMatrix;
      },
      set: function set(e) {
        t.defined("value", e), this._matrixDirty = this._matrixDirty || !x.equals(this._emitterModelMatrix, e), x.clone(e, this._emitterModelMatrix);
      }
    },
    startColor: {
      get: function get() {
        return this._startColor;
      },
      set: function set(e) {
        t.defined("value", e), f.clone(e, this._startColor);
      }
    },
    endColor: {
      get: function get() {
        return this._endColor;
      },
      set: function set(e) {
        t.defined("value", e), f.clone(e, this._endColor);
      }
    },
    startScale: {
      get: function get() {
        return this._startScale;
      },
      set: function set(e) {
        t.typeOf.number.greaterThanOrEquals("value", e, 0), this._startScale = e;
      }
    },
    endScale: {
      get: function get() {
        return this._endScale;
      },
      set: function set(e) {
        t.typeOf.number.greaterThanOrEquals("value", e, 0), this._endScale = e;
      }
    },
    emissionRate: {
      get: function get() {
        return this._emissionRate;
      },
      set: function set(e) {
        t.typeOf.number.greaterThanOrEquals("value", e, 0), this._emissionRate = e, this._updateParticlePool = !0;
      }
    },
    minimumSpeed: {
      get: function get() {
        return this._minimumSpeed;
      },
      set: function set(e) {
        t.typeOf.number.greaterThanOrEquals("value", e, 0), this._minimumSpeed = e;
      }
    },
    maximumSpeed: {
      get: function get() {
        return this._maximumSpeed;
      },
      set: function set(e) {
        t.typeOf.number.greaterThanOrEquals("value", e, 0), this._maximumSpeed = e;
      }
    },
    minimumParticleLife: {
      get: function get() {
        return this._minimumParticleLife;
      },
      set: function set(e) {
        t.typeOf.number.greaterThanOrEquals("value", e, 0), this._minimumParticleLife = e;
      }
    },
    maximumParticleLife: {
      get: function get() {
        return this._maximumParticleLife;
      },
      set: function set(e) {
        t.typeOf.number.greaterThanOrEquals("value", e, 0), this._maximumParticleLife = e, this._updateParticlePool = !0;
      }
    },
    minimumMass: {
      get: function get() {
        return this._minimumMass;
      },
      set: function set(e) {
        t.typeOf.number.greaterThanOrEquals("value", e, 0), this._minimumMass = e;
      }
    },
    maximumMass: {
      get: function get() {
        return this._maximumMass;
      },
      set: function set(e) {
        t.typeOf.number.greaterThanOrEquals("value", e, 0), this._maximumMass = e;
      }
    },
    minimumImageSize: {
      get: function get() {
        return this._minimumImageSize;
      },
      set: function set(e) {
        t.typeOf.object("value", e), t.typeOf.number.greaterThanOrEquals("value.x", e.x, 0), t.typeOf.number.greaterThanOrEquals("value.y", e.y, 0), this._minimumImageSize = e;
      }
    },
    maximumImageSize: {
      get: function get() {
        return this._maximumImageSize;
      },
      set: function set(e) {
        t.typeOf.object("value", e), t.typeOf.number.greaterThanOrEquals("value.x", e.x, 0), t.typeOf.number.greaterThanOrEquals("value.y", e.y, 0), this._maximumImageSize = e;
      }
    },
    lifetime: {
      get: function get() {
        return this._lifetime;
      },
      set: function set(e) {
        t.typeOf.number.greaterThanOrEquals("value", e, 0), this._lifetime = e;
      }
    },
    complete: {
      get: function get() {
        return this._complete;
      }
    },
    isComplete: {
      get: function get() {
        return this._isComplete;
      }
    }
  });
  var S = new d();
  return n.prototype.update = function (e) {
    if (this.show) {
      p(this._billboardCollection) || (this._billboardCollection = new v()), this._updateParticlePool && (function (e) {
        var t = e._emissionRate,
            i = e._maximumParticleLife,
            r = 0,
            a = e._bursts;
        if (p(a)) for (var m = a.length, o = 0; o < m; ++o) {
          r += a[o].maximum;
        }

        for (var s = e._billboardCollection, n = e.image, l = Math.ceil(t * i + r), u = e._particles, h = e._particlePool, c = Math.max(l - u.length - h.length, 0), _ = 0; _ < c; ++_) {
          var d = new C();
          d._billboard = s.add({
            image: n
          }), h.push(d);
        }

        e._particleEstimate = l;
      }(this), this._updateParticlePool = !1);
      var t = 0;
      this._previousTime && (t = g.secondsDifference(e.time, this._previousTime)), t < 0 && (t = 0);
      var i,
          r,
          a,
          m = this._particles,
          o = this._emitter,
          s = this.updateCallback,
          n = m.length;

      for (c = 0; c < n; ++c) {
        (i = m[c]).update(t, s) ? y(this, i) : (p((a = i)._billboard) && (a._billboard.show = !1), r = i, this._particlePool.push(r), m[c] = m[n - 1], --c, --n);
      }

      m.length = n;

      var l,
          u = function (e, t) {
        if (e._isComplete) return 0;

        var i = (t = b.mod(t, e._lifetime)) * e._emissionRate,
            r = Math.floor(i);

        if (e._carryOver += i - r, 1 < e._carryOver && (r++, --e._carryOver), p(e.bursts)) for (var a = e.bursts.length, m = 0; m < a; m++) {
          var o = e.bursts[m],
              s = e._currentTime;
          p(o) && !o._complete && s > o.time && (r += b.randomBetween(o.minimum, o.maximum), o._complete = !0);
        }
        return r;
      }(this, t);

      if (0 < u && p(o)) {
        this._matrixDirty && (this._combinedMatrix = x.multiply(this.modelMatrix, this.emitterModelMatrix, this._combinedMatrix), this._matrixDirty = !1);

        for (var h = this._combinedMatrix, c = 0; c < u; c++) {
          l = void 0, l = this._particlePool.pop(), p(l) || (l = new C()), i = l, this._emitter.emit(i), d.add(i.position, i.velocity, S), x.multiplyByPoint(h, S, S), i.position = x.multiplyByPoint(h, i.position, i.position), d.subtract(S, i.position, i.velocity), d.normalize(i.velocity, i.velocity), function (e, t) {
            t.startColor = f.clone(e._startColor, t.startColor), t.endColor = f.clone(e._endColor, t.endColor), t.startScale = e._startScale, t.endScale = e._endScale, t.image = e.image, t.life = b.randomBetween(e._minimumParticleLife, e._maximumParticleLife), t.mass = b.randomBetween(e._minimumMass, e._maximumMass), t.imageSize.x = b.randomBetween(e._minimumImageSize.x, e._maximumImageSize.x), t.imageSize.y = b.randomBetween(e._minimumImageSize.y, e._maximumImageSize.y), t._normalizedAge = 0, t._age = 0;
            var i = b.randomBetween(e._minimumSpeed, e._maximumSpeed);
            d.multiplyByScalar(t.velocity, i, t.velocity), e._particles.push(t);
          }(this, i), y(this, i);
        }
      }

      if (this._billboardCollection.update(e), this._previousTime = g.clone(e.time, this._previousTime), this._currentTime += t, this._lifetime !== Number.MAX_VALUE && this._currentTime > this._lifetime) if (this.loop) {
        if (this._currentTime = b.mod(this._currentTime, this._lifetime), this.bursts) {
          var _ = this.bursts.length;

          for (c = 0; c < _; c++) {
            this.bursts[c]._complete = !1;
          }
        }
      } else this._isComplete = !0, this._complete.raiseEvent(this);
      e.frameNumber % 120 == 0 && function (e) {
        for (var t = e._particles, i = e._particlePool, r = e._billboardCollection, a = t.length, m = i.length, o = e._particleEstimate, s = m - Math.max(o - a - m, 0), n = s; n < m; ++n) {
          var l = i[n];
          r.remove(l._billboard);
        }

        i.length = s;
      }(this);
    }
  }, n.prototype.isDestroyed = function () {
    return !1;
  }, n.prototype.destroy = function () {
    return this._billboardCollection = this._billboardCollection && this._billboardCollection.destroy(), a(this);
  }, n;
});