"use strict";

define(["../Core/Cartesian3", "../Core/Check", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/Ellipsoid", "../Core/HeadingPitchRange", "../Core/JulianDate", "../Core/Math", "../Core/Matrix3", "../Core/Matrix4", "../Core/Transforms", "../Scene/SceneMode"], function (k, H, o, J, e, n, t, W, j, K, i, Q, X) {
  "use strict";

  var Y = new K(),
      $ = new K(),
      ee = new K(),
      te = new i(),
      ie = new k(),
      oe = new k(),
      ne = new k(),
      se = new k(),
      re = new k(),
      ae = new k(),
      le = new W();

  function de(e, t, i) {
    H.defined("entity", e), H.defined("scene", t), this.entity = e, this.scene = t, this.ellipsoid = o(i, n.WGS84), this.boundingSphere = void 0, this._lastEntity = void 0, this._mode = void 0, this._lastCartesian = new k(), this._defaultOffset3D = void 0, this._offset3D = new k();
  }

  e(de, {
    defaultOffset3D: {
      get: function get() {
        return this._defaultOffset3D;
      },
      set: function set(e) {
        this._defaultOffset3D = k.clone(e, new k());
      }
    }
  }), de.defaultOffset3D = new k(-14e3, 3500, 3500);
  var ue = new t(),
      ce = new k();
  return de.prototype.update = function (e, t) {
    H.defined("time", e);

    var i,
        o,
        n,
        s,
        r,
        a,
        l,
        d,
        u,
        c,
        f,
        m,
        h,
        p,
        y,
        _,
        g,
        E,
        w,
        C,
        x,
        S,
        D,
        O,
        T,
        z,
        V,
        M,
        R,
        v,
        I,
        N,
        P,
        F,
        B,
        A,
        b,
        L,
        q,
        G = this.scene,
        U = this.ellipsoid,
        Z = G.mode;

    Z !== X.MORPHING && (o = (i = this.entity).position, J(o) && (n = i !== this._lastEntity, s = Z !== this._mode, r = G.camera, a = n || s, l = !0, n ? (d = i.viewFrom, !(u = J(d)) && J(t) ? (ue.pitch = -j.PI_OVER_FOUR, ue.range = 0, c = o.getValue(e, ce), J(c) && (f = 2 - 1 / Math.max(1, k.magnitude(c) / U.maximumRadius), ue.pitch *= f), r.viewBoundingSphere(t, ue), this.boundingSphere = t, l = a = !1) : u && J(d.getValue(e, this._offset3D)) || k.clone(de._defaultOffset3D, this._offset3D)) : s || this._mode === X.SCENE2D || k.clone(r.position, this._offset3D), this._lastEntity = i, this._mode = Z, h = r, p = a, y = l, _ = o, g = e, E = U, L = (m = this).scene.mode, q = _.getValue(g, m._lastCartesian), J(q) && (C = w = !1, L === X.SCENE3D && (W.addSeconds(g, .001, le), O = _.getValue(le, ie), J(O) || (W.addSeconds(g, -.001, le), O = _.getValue(le, ie), C = !0), J(O) && (T = Q.computeFixedToIcrfMatrix(g, Y), z = Q.computeFixedToIcrfMatrix(le, $), J(T) && J(z) ? V = K.transpose(T, ee) : (V = Q.computeTemeToPseudoFixedMatrix(g, ee), T = K.transpose(V, Y), z = Q.computeTemeToPseudoFixedMatrix(le, $), K.transpose(z, z)), M = K.multiplyByVector(T, q, re), R = K.multiplyByVector(z, O, ae), k.subtract(M, R, se), v = 1e3 * k.magnitude(se), (N = -(I = j.GRAVITATIONALPARAMETER) / (v * v - 2 * I / k.magnitude(M))) < 0 || N > 1.25 * E.maximumRadius ? (x = oe, k.normalize(q, x), k.negate(x, x), D = k.clone(k.UNIT_Z, ne), S = k.cross(D, x, ie), k.magnitude(S) > j.EPSILON7 && (k.normalize(x, x), k.normalize(S, S), D = k.cross(x, S, ne), k.normalize(D, D), w = !0)) : k.equalsEpsilon(q, O, j.EPSILON7) || (D = oe, k.normalize(M, D), k.normalize(R, R), S = k.cross(D, R, ne), C && (S = k.multiplyByScalar(S, -1, S)), k.equalsEpsilon(S, k.ZERO, j.EPSILON7) || (x = k.cross(S, D, ie), K.multiplyByVector(V, x, x), K.multiplyByVector(V, S, S), K.multiplyByVector(V, D, D), k.normalize(x, x), k.normalize(S, S), k.normalize(D, D), w = !0)))), J(m.boundingSphere) && (q = m.boundingSphere.center), y && (P = k.clone(h.position, se), F = k.clone(h.direction, re), B = k.clone(h.up, ae)), A = te, w ? (A[0] = x.x, A[1] = x.y, A[2] = x.z, A[3] = 0, A[4] = S.x, A[5] = S.y, A[6] = S.z, A[7] = 0, A[8] = D.x, A[9] = D.y, A[10] = D.z, A[11] = 0, A[12] = q.x, A[13] = q.y, A[14] = q.z, A[15] = 0) : Q.eastNorthUpToFixedFrame(q, E, A), h._setTransform(A), y && (k.clone(P, h.position), k.clone(F, h.direction), k.clone(B, h.up), k.cross(F, B, h.right))), p && (b = L === X.SCENE2D || k.equals(m._offset3D, k.ZERO) ? void 0 : m._offset3D, h.lookAtTransform(h.transform, b))));
  }, de;
});