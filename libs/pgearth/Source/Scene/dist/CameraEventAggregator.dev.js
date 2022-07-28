"use strict";

define(["../Core/Cartesian2", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/KeyboardEventModifier", "../Core/Math", "../Core/ScreenSpaceEventHandler", "../Core/ScreenSpaceEventType", "./CameraEventType"], function (v, h, t, e, o, i, s, r, p, c) {
  "use strict";

  function P(t, e) {
    var n = t;
    return h(e) && (n += "+" + e), n;
  }

  function a(e, t, r) {
    var a = P(c.PINCH, t),
        d = e._update,
        u = e._isDown,
        n = e._eventStartPosition,
        i = e._pressTime,
        o = e._releaseTime;
    d[a] = !0, u[a] = !1, n[a] = new v();
    var _ = e._movement[a];
    h(_) || (_ = e._movement[a] = {}), _.distance = {
      startPosition: new v(),
      endPosition: new v()
    }, _.angleAndHeight = {
      startPosition: new v(),
      endPosition: new v()
    }, _.prevAngle = 0, e._eventHandler.setInputAction(function (t) {
      e._buttonsDown++, u[a] = !0, i[a] = new Date(), v.lerp(t.position1, t.position2, .5, n[a]);
    }, p.PINCH_START, t), e._eventHandler.setInputAction(function () {
      e._buttonsDown = Math.max(e._buttonsDown - 1, 0), u[a] = !1, o[a] = new Date();
    }, p.PINCH_END, t), e._eventHandler.setInputAction(function (t) {
      if (u[a]) {
        d[a] ? (o = t, s = _, v.clone(o.distance.startPosition, s.distance.startPosition), v.clone(o.distance.endPosition, s.distance.endPosition), v.clone(o.angleAndHeight.startPosition, s.angleAndHeight.startPosition), v.clone(o.angleAndHeight.endPosition, s.angleAndHeight.endPosition), d[a] = !1, _.prevAngle = _.angleAndHeight.startPosition.x) : (v.clone(t.distance.endPosition, _.distance.endPosition), v.clone(t.angleAndHeight.endPosition, _.angleAndHeight.endPosition));

        for (var e = _.angleAndHeight.endPosition.x, n = _.prevAngle, i = 2 * Math.PI; e >= n + Math.PI;) {
          e -= i;
        }

        for (; e < n - Math.PI;) {
          e += i;
        }

        _.angleAndHeight.endPosition.x = -e * r.clientWidth / 12, _.angleAndHeight.startPosition.x = -n * r.clientWidth / 12;
      }

      var o, s;
    }, p.PINCH_MOVE, t);
  }

  function d(t, e) {
    var n = P(c.WHEEL, e),
        i = t._update;
    i[n] = !0;
    var o = t._movement[n];
    h(o) || (o = t._movement[n] = {}), o.startPosition = new v(), o.endPosition = new v(), t._eventHandler.setInputAction(function (t) {
      var e = 15 * s.toRadians(t);
      i[n] ? (v.clone(v.ZERO, o.startPosition), o.endPosition.x = 0, o.endPosition.y = e, i[n] = !1) : o.endPosition.y = o.endPosition.y + e;
    }, p.WHEEL, e);
  }

  function u(e, t, n) {
    var i = P(n, t),
        o = e._isDown,
        s = e._eventStartPosition,
        r = e._pressTime,
        a = e._releaseTime;
    o[i] = !1, s[i] = new v();
    var d,
        u,
        _ = e._lastMovement[i];
    h(_) || (_ = e._lastMovement[i] = {
      startPosition: new v(),
      endPosition: new v(),
      valid: !1
    }), n === c.LEFT_DRAG ? (d = p.LEFT_DOWN, u = p.LEFT_UP) : n === c.RIGHT_DRAG ? (d = p.RIGHT_DOWN, u = p.RIGHT_UP) : n === c.MIDDLE_DRAG && (d = p.MIDDLE_DOWN, u = p.MIDDLE_UP), e._eventHandler.setInputAction(function (t) {
      e._buttonsDown++, _.valid = !1, o[i] = !0, r[i] = new Date(), v.clone(t.position, s[i]);
    }, d, t), e._eventHandler.setInputAction(function () {
      e._buttonsDown = Math.max(e._buttonsDown - 1, 0), o[i] = !1, a[i] = new Date();
    }, u, t);
  }

  function _(t, e) {
    v.clone(t.startPosition, e.startPosition), v.clone(t.endPosition, e.endPosition);
  }

  function l(o, s) {
    var t,
        e,
        r = o._update,
        a = o._movement,
        d = o._lastMovement,
        u = o._isDown;

    for (var n in c) {
      c.hasOwnProperty(n) && (t = c[n], h(t) && (e = P(t, s), r[e] = !0, h(o._lastMovement[e]) || (o._lastMovement[e] = {
        startPosition: new v(),
        endPosition: new v(),
        valid: !1
      }), h(o._movement[e]) || (o._movement[e] = {
        startPosition: new v(),
        endPosition: new v()
      })));
    }

    o._eventHandler.setInputAction(function (t) {
      for (var e in c) {
        var n, i;
        c.hasOwnProperty(e) && (n = c[e], h(n) && (i = P(n, s), u[i] && (r[i] ? (_(a[i], d[i]), d[i].valid = !0, _(t, a[i]), r[i] = !1) : v.clone(t.endPosition, a[i].endPosition))));
      }

      v.clone(t.endPosition, o._currentMousePosition);
    }, p.MOUSE_MOVE, s);
  }

  function n(t) {
    if (!h(t)) throw new o("canvas is required.");

    for (var e in this._eventHandler = new r(t, !0), this._update = {}, this._movement = {}, this._lastMovement = {}, this._isDown = {}, this._eventStartPosition = {}, this._pressTime = {}, this._releaseTime = {}, this._buttonsDown = 0, this._currentMousePosition = new v(), d(this, void 0), a(this, void 0, t), u(this, void 0, c.LEFT_DRAG), u(this, void 0, c.RIGHT_DRAG), u(this, void 0, c.MIDDLE_DRAG), l(this, void 0), i) {
      var n;
      i.hasOwnProperty(e) && (n = i[e], h(n) && (d(this, n), a(this, n, t), u(this, n, c.LEFT_DRAG), u(this, n, c.RIGHT_DRAG), u(this, n, c.MIDDLE_DRAG), l(this, n)));
    }
  }

  return t(n.prototype, {
    currentMousePosition: {
      get: function get() {
        return this._currentMousePosition;
      }
    },
    anyButtonDown: {
      get: function get() {
        var t = !(this._update[P(c.WHEEL)] && this._update[P(c.WHEEL, i.SHIFT)] && this._update[P(c.WHEEL, i.CTRL)] && this._update[P(c.WHEEL, i.ALT)]);
        return 0 < this._buttonsDown || t;
      }
    }
  }), n.prototype.isMoving = function (t, e) {
    if (!h(t)) throw new o("type is required.");
    var n = P(t, e);
    return !this._update[n];
  }, n.prototype.getMovement = function (t, e) {
    if (!h(t)) throw new o("type is required.");
    var n = P(t, e);
    return this._movement[n];
  }, n.prototype.getLastMovement = function (t, e) {
    if (!h(t)) throw new o("type is required.");
    var n = P(t, e),
        i = this._lastMovement[n];
    if (i.valid) return i;
  }, n.prototype.isButtonDown = function (t, e) {
    if (!h(t)) throw new o("type is required.");
    var n = P(t, e);
    return this._isDown[n];
  }, n.prototype.getStartMousePosition = function (t, e) {
    if (!h(t)) throw new o("type is required.");
    if (t === c.WHEEL) return this._currentMousePosition;
    var n = P(t, e);
    return this._eventStartPosition[n];
  }, n.prototype.getButtonPressTime = function (t, e) {
    if (!h(t)) throw new o("type is required.");
    var n = P(t, e);
    return this._pressTime[n];
  }, n.prototype.getButtonReleaseTime = function (t, e) {
    if (!h(t)) throw new o("type is required.");
    var n = P(t, e);
    return this._releaseTime[n];
  }, n.prototype.reset = function () {
    for (var t in this._update) {
      this._update.hasOwnProperty(t) && (this._update[t] = !0);
    }
  }, n.prototype.isDestroyed = function () {
    return !1;
  }, n.prototype.destroy = function () {
    return this._eventHandler = this._eventHandler && this._eventHandler.destroy(), e(this);
  }, n;
});