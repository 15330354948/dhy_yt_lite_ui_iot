"use strict";

define(["./AssociativeArray", "./Cartesian2", "./defaultValue", "./defined", "./destroyObject", "./DeveloperError", "./FeatureDetection", "./getTimestamp", "./KeyboardEventModifier", "./ScreenSpaceEventType"], function (e, w, s, y, t, r, u, o, n, g) {
  "use strict";

  function l(t, o, n) {
    var i = t._element;
    if (i === document) return n.x = o.clientX, n.y = o.clientY, n;
    var e = i.getBoundingClientRect();
    return n.x = o.clientX - e.left, n.y = o.clientY - e.top, n;
  }

  function c(t, o) {
    var n = t;
    return y(o) && (n += "+" + o), n;
  }

  function L(t) {
    return t.shiftKey ? n.SHIFT : t.ctrlKey ? n.CTRL : t.altKey ? n.ALT : void 0;
  }

  var H = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
  };

  function a(o, t, n, i) {
    function e(t) {
      i(o, t);
    }

    n.addEventListener(t, e, !1), o._removalFunctions.push(function () {
      n.removeEventListener(t, e, !1);
    });
  }

  var p = {
    position: new w()
  };

  function _(t) {
    t._lastSeenTouchEvent = o();
  }

  function v(t) {
    return o() - t._lastSeenTouchEvent > k.mouseEmulationIgnoreMilliseconds;
  }

  function d(t, o, n) {
    var i = t.x - o.x,
        e = t.y - o.y;
    return Math.sqrt(i * i + e * e) < n;
  }

  function h(t, o) {
    if (v(t)) {
      var n,
          i = o.button;
      if (t._buttonDown[i] = !0, i === H.LEFT) n = g.LEFT_DOWN;else if (i === H.MIDDLE) n = g.MIDDLE_DOWN;else {
        if (i !== H.RIGHT) return;
        n = g.RIGHT_DOWN;
      }
      var e = l(t, o, t._primaryPosition);
      w.clone(e, t._primaryStartPosition), w.clone(e, t._primaryPreviousPosition);
      var s = L(o),
          r = t.getInputAction(n, s);
      y(r) && (w.clone(e, p.position), r(p), o.preventDefault());
    }
  }

  var f = {
    position: new w()
  },
      P = {
    position: new w()
  };

  function i(t, o, n, i) {
    var e,
        s = L(i),
        r = t.getInputAction(o, s),
        u = t.getInputAction(n, s);
    (y(r) || y(u)) && (e = l(t, i, t._primaryPosition), y(r) && (w.clone(e, f.position), r(f)), y(u) && d(t._primaryStartPosition, e, t._clickPixelTolerance) && (w.clone(e, P.position), u(P)));
  }

  function m(t, o) {
    var n;
    v(t) && ((n = o.button) !== H.LEFT && n !== H.MIDDLE && n !== H.RIGHT || (t._buttonDown[H.LEFT] && (i(t, g.LEFT_UP, g.LEFT_CLICK, o), t._buttonDown[H.LEFT] = !1), t._buttonDown[H.MIDDLE] && (i(t, g.MIDDLE_UP, g.MIDDLE_CLICK, o), t._buttonDown[H.MIDDLE] = !1), t._buttonDown[H.RIGHT] && (i(t, g.RIGHT_UP, g.RIGHT_CLICK, o), t._buttonDown[H.RIGHT] = !1)));
  }

  var T = {
    startPosition: new w(),
    endPosition: new w()
  };

  function E(t, o) {
    var n, i, e, s;
    v(t) && (n = L(o), i = l(t, o, t._primaryPosition), e = t._primaryPreviousPosition, s = t.getInputAction(g.MOUSE_MOVE, n), y(s) && (w.clone(e, T.startPosition), w.clone(i, T.endPosition), s(T)), w.clone(i, e), (t._buttonDown[H.LEFT] || t._buttonDown[H.MIDDLE] || t._buttonDown[H.RIGHT]) && o.preventDefault());
  }

  var D = {
    position: new w()
  };

  function I(t, o) {
    var n, i, e;
    o.button === H.LEFT && (n = g.LEFT_DOUBLE_CLICK, i = L(o), e = t.getInputAction(n, i), y(e) && (l(t, o, D.position), e(D)));
  }

  function M(t, o) {
    var n, i, e, s;
    i = y(o.deltaY) ? (n = o.deltaMode) === o.DOM_DELTA_PIXEL ? -o.deltaY : n === o.DOM_DELTA_LINE ? 40 * -o.deltaY : 120 * -o.deltaY : 0 < o.detail ? -120 * o.detail : o.wheelDelta, y(i) && (e = L(o), s = t.getInputAction(g.WHEEL, e), y(s) && (s(i), o.preventDefault()));
  }

  function A(t, o) {
    _(t);

    for (var n, i, e = o.changedTouches, s = e.length, r = t._positions, u = 0; u < s; ++u) {
      i = (n = e[u]).identifier, r.set(i, l(t, n, new w()));
    }

    x(t, o);
    var c = t._previousPositions;

    for (u = 0; u < s; ++u) {
      i = (n = e[u]).identifier, c.set(i, w.clone(r.get(i)));
    }
  }

  function F(t, o) {
    _(t);

    for (var n, i = o.changedTouches, e = i.length, s = t._positions, r = 0; r < e; ++r) {
      n = i[r].identifier, s.remove(n);
    }

    x(t, o);
    var u = t._previousPositions;

    for (r = 0; r < e; ++r) {
      n = i[r].identifier, u.remove(n);
    }
  }

  var b = {
    position: new w()
  },
      C = {
    position1: new w(),
    position2: new w()
  },
      S = {
    position: new w()
  },
      R = {
    position: new w()
  },
      O = {
    position: new w()
  };

  function x(t, o) {
    var n,
        i,
        e,
        s = L(o),
        r = t._positions,
        u = r.length,
        c = t._isPinching;
    1 !== u && t._buttonDown[H.LEFT] && (t._buttonDown[H.LEFT] = !1, y(t._touchHoldTimer) && (clearTimeout(t._touchHoldTimer), t._touchHoldTimer = void 0), n = t.getInputAction(g.LEFT_UP, s), y(n) && (w.clone(t._primaryPosition, S.position), n(S)), 0 !== u || t._isTouchHolding || (i = t.getInputAction(g.LEFT_CLICK, s), y(i) && d(t._primaryStartPosition, t._previousPositions.values[0], t._clickPixelTolerance) && (w.clone(t._primaryPosition, R.position), i(R))), t._isTouchHolding = !1), 0 === u && c && (t._isPinching = !1, n = t.getInputAction(g.PINCH_END, s), y(n) && n()), 1 !== u || c || (e = r.values[0], w.clone(e, t._primaryPosition), w.clone(e, t._primaryStartPosition), w.clone(e, t._primaryPreviousPosition), t._buttonDown[H.LEFT] = !0, n = t.getInputAction(g.LEFT_DOWN, s), y(n) && (w.clone(e, b.position), n(b)), t._touchHoldTimer = setTimeout(function () {
      t.isDestroyed() || (t._touchHoldTimer = void 0, t._isTouchHolding = !0, i = t.getInputAction(g.RIGHT_CLICK, s), y(i) && d(t._primaryStartPosition, t._previousPositions.values[0], t._holdPixelTolerance) && (w.clone(t._primaryPosition, O.position), i(O)));
    }, k.touchHoldDelayMilliseconds), o.preventDefault()), 2 !== u || c || (t._isPinching = !0, n = t.getInputAction(g.PINCH_START, s), y(n) && (w.clone(r.values[0], C.position1), w.clone(r.values[1], C.position2), n(C), o.preventDefault()));
  }

  function G(t, o) {
    _(t);

    for (var n, i, e = o.changedTouches, s = e.length, r = t._positions, u = 0; u < s; ++u) {
      i = (n = e[u]).identifier;
      var c = r.get(i);
      y(c) && l(t, n, c);
    }

    q(t, o);
    var a = t._previousPositions;

    for (u = 0; u < s; ++u) {
      i = (n = e[u]).identifier, w.clone(r.get(i), a.get(i));
    }
  }

  var K = {
    startPosition: new w(),
    endPosition: new w()
  },
      N = {
    distance: {
      startPosition: new w(),
      endPosition: new w()
    },
    angleAndHeight: {
      startPosition: new w(),
      endPosition: new w()
    }
  };

  function q(t, o) {
    var n,
        i,
        e,
        s,
        r,
        u,
        c,
        a,
        l,
        p,
        _,
        v,
        d,
        h,
        f,
        P,
        m,
        T = L(o),
        E = t._positions,
        D = t._previousPositions,
        I = E.length;

    1 === I && t._buttonDown[H.LEFT] ? (n = E.values[0], w.clone(n, t._primaryPosition), i = t._primaryPreviousPosition, e = t.getInputAction(g.MOUSE_MOVE, T), y(e) && (w.clone(i, K.startPosition), w.clone(n, K.endPosition), e(K)), w.clone(n, i), o.preventDefault()) : 2 === I && t._isPinching && (e = t.getInputAction(g.PINCH_MOVE, T), y(e) && (s = E.values[0], r = E.values[1], u = D.values[0], c = D.values[1], a = r.x - s.x, l = r.y - s.y, p = .25 * Math.sqrt(a * a + l * l), _ = c.x - u.x, v = c.y - u.y, d = .25 * Math.sqrt(_ * _ + v * v), h = .125 * (r.y + s.y), f = .125 * (c.y + u.y), P = Math.atan2(l, a), m = Math.atan2(v, _), w.fromElements(0, d, N.distance.startPosition), w.fromElements(0, p, N.distance.endPosition), w.fromElements(m, f, N.angleAndHeight.startPosition), w.fromElements(P, h, N.angleAndHeight.endPosition), e(N)));
  }

  function U(t, o) {
    var n, i;
    o.target.setPointerCapture(o.pointerId), "touch" === o.pointerType ? (n = t._positions, i = o.pointerId, n.set(i, l(t, o, new w())), x(t, o), t._previousPositions.set(i, w.clone(n.get(i)))) : h(t, o);
  }

  function Y(t, o) {
    var n, i;
    "touch" === o.pointerType ? (n = t._positions, i = o.pointerId, n.remove(i), x(t, o), t._previousPositions.remove(i)) : m(t, o);
  }

  function W(t, o) {
    if ("touch" === o.pointerType) {
      var n = t._positions,
          i = o.pointerId,
          e = n.get(i);
      if (!y(e)) return;
      l(t, o, e), q(t, o);
      var s = t._previousPositions;
      w.clone(n.get(i), s.get(i));
    } else E(t, o);
  }

  function k(t) {
    var o, n, i;
    this._inputEvents = {}, this._buttonDown = {
      LEFT: !1,
      MIDDLE: !1,
      RIGHT: !1
    }, this._isPinching = !1, this._isTouchHolding = !1, this._lastSeenTouchEvent = -k.mouseEmulationIgnoreMilliseconds, this._primaryStartPosition = new w(), this._primaryPosition = new w(), this._primaryPreviousPosition = new w(), this._positions = new e(), this._previousPositions = new e(), this._removalFunctions = [], this._touchHoldTimer = void 0, this._clickPixelTolerance = 5, this._holdPixelTolerance = 25, this._element = s(t, document), n = (o = this)._element, i = y(n.disableRootEvents) ? n : document, u.supportsPointerEvents() ? (a(o, "pointerdown", n, U), a(o, "pointerup", n, Y), a(o, "pointermove", n, W), a(o, "pointercancel", n, Y)) : (a(o, "mousedown", n, h), a(o, "mouseup", i, m), a(o, "mousemove", i, E), a(o, "touchstart", n, A), a(o, "touchend", i, F), a(o, "touchmove", i, G), a(o, "touchcancel", i, F)), a(o, "dblclick", n, I), a(o, "onwheel" in n ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll", n, M);
  }

  return k.prototype.setInputAction = function (t, o, n) {
    if (!y(t)) throw new r("action is required.");
    if (!y(o)) throw new r("type is required.");
    var i = c(o, n);
    this._inputEvents[i] = t;
  }, k.prototype.getInputAction = function (t, o) {
    if (!y(t)) throw new r("type is required.");
    var n = c(t, o);
    return this._inputEvents[n];
  }, k.prototype.removeInputAction = function (t, o) {
    if (!y(t)) throw new r("type is required.");
    var n = c(t, o);
    delete this._inputEvents[n];
  }, k.prototype.isDestroyed = function () {
    return !1;
  }, k.prototype.destroy = function () {
    return function (t) {
      for (var o = t._removalFunctions, n = 0; n < o.length; ++n) {
        o[n]();
      }
    }(this), t(this);
  }, k.mouseEmulationIgnoreMilliseconds = 800, k.touchHoldDelayMilliseconds = 1500, k;
});