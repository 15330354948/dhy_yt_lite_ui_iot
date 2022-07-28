"use strict";

define(["../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartographic", "../Core/defaultValue", "../Core/defined", "../Core/DeveloperError", "../Core/EasingFunction", "../Core/Math", "../Core/PerspectiveFrustum", "../Core/PerspectiveOffCenterFrustum", "./SceneMode"], function (_, j, V, S, x, N, W, D, m, v, b) {
  "use strict";

  var e = {};
  var P = new j(),
      E = new j();

  function R(e, t, i, n, r) {
    var o,
        a,
        u,
        l,
        c,
        p,
        s,
        g = r,
        h = Math.max(i, n);

    if (x(g) || (o = e.position, a = e.up, u = e.right, l = e.frustum, c = j.subtract(o, t, P), p = j.magnitude(j.multiplyByScalar(a, j.dot(c, a), E)), s = j.magnitude(j.multiplyByScalar(u, j.dot(c, u), E)), g = Math.min(.2 * function (e, t, i) {
      if (e instanceof m) {
        var n = Math.tan(.5 * e.fovy),
            r = e.near,
            o = e.near * n,
            a = e.aspectRatio * o;
        return Math.max(t * r / a, i * r / o);
      }

      return e instanceof v ? (r = e.near, o = e.top, a = e.right, Math.max(t * r / a, i * r / o)) : Math.max(t, i);
    }(l, p, s), 1e9)), h < g) {
      var d = -Math.pow(1e6 * (g - i), 1 / 8),
          f = Math.pow(1e6 * (g - n), 1 / 8);
      return function (e) {
        var t = e * (f - d) + d;
        return -Math.pow(t, 8) / 1e6 + g;
      };
    }

    return function (e) {
      return D.lerp(i, n, e);
    };
  }

  function U(e, t) {
    return D.equalsEpsilon(e, D.TWO_PI, D.EPSILON11) && (e = 0), t > e + Math.PI ? e += D.TWO_PI : t < e - Math.PI && (e -= D.TWO_PI), e;
  }

  var h = new j();

  function y(e, i, n, r, o, a, t) {
    var u = e.camera,
        l = j.clone(u.position, h),
        c = u.pitch,
        p = U(u.heading, r),
        s = U(u.roll, a),
        g = R(u, n, l.z, n.z, t);
    return function (e) {
      var t = e.time / i;
      u.setView({
        orientation: {
          heading: D.lerp(p, r, t),
          pitch: D.lerp(c, o, t),
          roll: D.lerp(s, a, t)
        }
      }), _.lerp(l, n, t, u.position), u.position.z = g(t);
    };
  }

  var B = new V(),
      F = new V();

  function L(e, n, t, r, i, o, a, u, l, c) {
    var p = e.camera,
        s = e.mapProjection.ellipsoid,
        g = V.clone(p.positionCartographic, B),
        h = p.pitch,
        d = U(p.heading, r),
        f = U(p.roll, o),
        m = s.cartesianToCartographic(t, F);
    g.longitude = D.zeroToTwoPi(g.longitude), m.longitude = D.zeroToTwoPi(m.longitude);

    var v,
        P,
        E,
        T,
        O,
        C,
        I,
        w,
        M,
        _,
        S,
        N = !1;

    x(u) && (v = D.zeroToTwoPi(u), P = Math.min(g.longitude, m.longitude), E = Math.max(g.longitude, m.longitude), T = P <= v && v <= E, x(l) ? (O = Math.abs(g.longitude - m.longitude), C = D.TWO_PI - O, (T ? O : C) < (T ? C : O) * l && !T && (N = !0)) : T || (N = !0)), N ? (S = m, (_ = g).longitude < S.longitude ? _.longitude += D.TWO_PI : S.longitude += D.TWO_PI) : (w = m, (M = (I = g).longitude - w.longitude) < -D.PI ? I.longitude += D.TWO_PI : M > D.PI && (w.longitude += D.TWO_PI));

    var W,
        b,
        y,
        L,
        q = R(p, t, g.height, m.height, a),
        z = function (r, o, a, e) {
      if (x(e) && a(.5) > e) {
        var u = a(0),
            l = a(1),
            t = a(.5),
            c = t - u,
            p = t - l;
        return function (e) {
          var t = a(e);

          if (e <= .5) {
            var i = (t - u) / c;
            return D.lerp(r, -D.PI_OVER_TWO, i);
          }

          var n = (t - l) / p;
          return D.lerp(-D.PI_OVER_TWO, o, 1 - n);
        };
      }

      return function (e) {
        return D.lerp(r, o, e);
      };
    }(h, i, q, c);

    return W = g.longitude, b = m.longitude, y = g.latitude, L = m.latitude, function (e) {
      var t = e.time / n,
          i = j.fromRadians(D.lerp(W, b, t), D.lerp(y, L, t), q(t));
      p.setView({
        destination: i,
        orientation: {
          heading: D.lerp(d, r, t),
          pitch: z(t),
          roll: D.lerp(f, o, t)
        }
      });
    };
  }

  function q(e, a, u, l, t, i, n) {
    var c = e.camera,
        p = j.clone(c.position, h),
        s = U(c.heading, l),
        r = c.frustum.right - c.frustum.left,
        g = R(c, u, r, u.z, n);
    return function (e) {
      var t = e.time / a;
      c.setView({
        orientation: {
          heading: D.lerp(s, l, t)
        }
      }), _.lerp(p, u, t, c.position);
      var i = g(t),
          n = c.frustum,
          r = n.top / n.right,
          o = .5 * (i - (n.right - n.left));
      n.right += o, n.left -= o, n.top = r * n.right, n.bottom = -n.top;
    };
  }

  var z = new V(),
      H = new j();

  function A(e, t) {
    return {
      startObject: {},
      stopObject: {},
      duration: 0,
      complete: e,
      cancel: t
    };
  }

  function G(e, t) {
    return function () {
      "function" == typeof t && t(), e.enableInputs = !0;
    };
  }

  return e.createTween = function (e, t) {
    var i = (t = S(t, S.EMPTY_OBJECT)).destination;
    if (!x(e)) throw new N("scene is required.");
    if (!x(i)) throw new N("destination is required.");
    var n = e.mode;
    if (n === b.MORPHING) return A();
    var r = S(t.convert, !0),
        o = e.mapProjection,
        a = o.ellipsoid,
        u = t.maximumHeight,
        l = t.flyOverLongitude,
        c = t.flyOverLongitudeWeight,
        p = t.pitchAdjustHeight,
        s = t.easingFunction;
    r && n !== b.SCENE3D && (a.cartesianToCartographic(i, z), i = o.project(z, H));
    var g = e.camera,
        h = t.endTransform;
    x(h) && g._setTransform(h);
    var d = t.duration;
    x(d) || (d = Math.ceil(j.distance(g.position, i) / 1e6) + 2, d = Math.min(d, 3));
    var f = S(t.heading, 0),
        m = S(t.pitch, -D.PI_OVER_TWO),
        v = S(t.roll, 0),
        P = e.screenSpaceCameraController;
    P.enableInputs = !1;
    var E = G(P, t.complete),
        T = G(P, t.cancel),
        O = g.frustum,
        C = e.mode === b.SCENE2D;
    if (C = (C = (C = (C = C && _.equalsEpsilon(g.position, i, D.EPSILON6)) && D.equalsEpsilon(Math.max(O.right - O.left, O.top - O.bottom), i.z, D.EPSILON6)) || e.mode !== b.SCENE2D && j.equalsEpsilon(i, g.position, D.EPSILON10)) && D.equalsEpsilon(D.negativePiToPi(f), D.negativePiToPi(g.heading), D.EPSILON10) && D.equalsEpsilon(D.negativePiToPi(m), D.negativePiToPi(g.pitch), D.EPSILON10) && D.equalsEpsilon(D.negativePiToPi(v), D.negativePiToPi(g.roll), D.EPSILON10)) return A(E, T);
    var I = new Array(4);

    if (I[b.SCENE2D] = q, I[b.SCENE3D] = L, I[b.COLUMBUS_VIEW] = y, d <= 0) {
      return A(function () {
        I[n](e, 1, i, f, m, v, u, l, c, p)({
          time: 1
        }), "function" == typeof E && E();
      }, T);
    }

    var w,
        M = I[n](e, d, i, f, m, v, u, l, c, p);
    return x(s) || (w = g.positionCartographic.height, s = (n === b.SCENE3D ? a.cartesianToCartographic(i).height : i.z) < w && 11500 < w ? W.CUBIC_OUT : W.QUINTIC_IN_OUT), {
      duration: d,
      easingFunction: s,
      startObject: {
        time: 0
      },
      stopObject: {
        time: d
      },
      update: M,
      complete: E,
      cancel: T
    };
  }, e;
});