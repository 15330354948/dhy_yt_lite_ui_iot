"use strict";

define(["../Core/BoundingRectangle", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Cartographic", "../Core/defined", "../Core/DeveloperError", "../Core/Math", "../Core/Matrix4", "../Core/OrthographicFrustum", "../Core/OrthographicOffCenterFrustum", "../Core/Transforms", "./SceneMode"], function (t, y, W, l, e, v, T, E, B, S, z, V, D) {
  "use strict";

  var M = {},
      O = new l(0, 0, 0, 1),
      L = new l(),
      P = new t(),
      j = new y(),
      _ = new y();

  M.wgs84ToWindowCoordinates = function (t, e, r) {
    return M.wgs84WithEyeOffsetToWindowCoordinates(t, e, W.ZERO, r);
  };

  var u = new l(),
      s = new W();

  function G(t, e, r, o) {
    var i = r.viewMatrix,
        n = B.multiplyByVector(i, l.fromElements(t.x, t.y, t.z, 1, u), u),
        a = W.multiplyComponents(e, W.normalize(n, s), s);
    return n.x += e.x + a.x, n.y += e.y + a.y, n.z += a.z, B.multiplyByVector(r.frustum.projectionMatrix, n, o);
  }

  var F = new e(Math.PI, E.PI_OVER_TWO),
      N = new W(),
      H = new W();
  M.wgs84WithEyeOffsetToWindowCoordinates = function (t, e, r, o) {
    if (!v(t)) throw new T("scene is required.");
    if (!v(e)) throw new T("position is required.");
    var i = t.frameState,
        n = M.computeActualWgs84Position(i, e, O);

    if (v(n)) {
      var a = t.canvas,
          u = P;
      u.x = 0, u.y = 0, u.width = a.clientWidth, u.height = a.clientHeight;
      var s,
          f,
          m,
          c,
          w,
          l,
          d,
          p,
          x,
          C,
          h = t.camera,
          g = !1;

      if (i.mode === D.SCENE2D && (s = t.mapProjection.project(F, N), f = W.clone(h.position, H), m = h.frustum.clone(), c = B.computeViewportTransformation(u, 0, 1, new B()), w = h.frustum.projectionMatrix, l = h.positionWC.y, d = W.fromElements(E.sign(l) * s.x - l, 0, -h.positionWC.x), p = V.pointToGLWindowCoordinates(w, c, d), 0 === l || p.x <= 0 || p.x >= a.clientWidth ? g = !0 : (L = (p.x > .5 * a.clientWidth ? (u.width = p.x, h.frustum.right = s.x - l, L = G(n, r, h, L), M.clipToGLWindowCoordinates(u, L, j), u.x += p.x, h.position.x = -h.position.x, x = h.frustum.right, h.frustum.right = -h.frustum.left, h.frustum.left = -x) : (u.x += p.x, u.width -= p.x, h.frustum.left = -s.x - l, L = G(n, r, h, L), M.clipToGLWindowCoordinates(u, L, j), u.x = u.x - u.width, h.position.x = -h.position.x, C = h.frustum.left, h.frustum.left = -h.frustum.right, h.frustum.right = -C), G(n, r, h, L)), M.clipToGLWindowCoordinates(u, L, _), W.clone(f, h.position), h.frustum = m.clone(), ((o = y.clone(j, o)).x < 0 || o.x > a.clientWidth) && (o.x = _.x))), i.mode !== D.SCENE2D || g) {
        if ((L = G(n, r, h, L)).z < 0 && !(h.frustum instanceof S) && !(h.frustum instanceof z)) return;
        o = M.clipToGLWindowCoordinates(u, L, o);
      }

      return o.y = a.clientHeight - o.y, o;
    }
  }, M.wgs84ToDrawingBufferCoordinates = function (t, e, r) {
    if (r = M.wgs84ToWindowCoordinates(t, e, r), v(r)) return M.transformWindowToDrawingBuffer(t, r, r);
  };
  var f = new W(),
      m = new e();

  M.computeActualWgs84Position = function (t, e, r) {
    var o = t.mode;
    if (o === D.SCENE3D) return W.clone(e, r);
    var i = t.mapProjection,
        n = i.ellipsoid.cartesianToCartographic(e, m);

    if (v(n)) {
      if (i.project(n, f), o === D.COLUMBUS_VIEW) return W.fromElements(f.z, f.x, f.y, r);
      if (o === D.SCENE2D) return W.fromElements(0, f.x, f.y, r);
      var a = t.morphTime;
      return W.fromElements(E.lerp(f.z, e.x, a), E.lerp(f.x, e.y, a), E.lerp(f.y, e.z, a), r);
    }
  };

  var o = new W(),
      i = new W(),
      n = new B();
  M.clipToGLWindowCoordinates = function (t, e, r) {
    return W.divideByScalar(e, e.w, o), B.computeViewportTransformation(t, 0, 1, n), B.multiplyByPoint(n, o, i), y.fromCartesian3(i, r);
  }, M.transformWindowToDrawingBuffer = function (t, e, r) {
    var o = t.canvas,
        i = t.drawingBufferWidth / o.clientWidth,
        n = t.drawingBufferHeight / o.clientHeight;
    return y.fromElements(e.x * i, e.y * n, r);
  };
  var d = new l(),
      p = new l();
  return M.drawingBufferToWgs84Coordinates = function (t, e, r, o) {
    var i = t.context.uniformState,
        n = i.currentFrustum,
        a = n.x,
        u = n.y;
    t.frameState.useLogDepth && (r = u * (1 - a / (r = Math.pow(2, r * E.log2(u + 1)) - 1)) / (u - a));
    var s,
        f = t._view.passState.viewport,
        m = l.clone(l.UNIT_W, d);
    m.x = (e.x - f.x) / f.width * 2 - 1, m.y = (e.y - f.y) / f.height * 2 - 1, m.z = 2 * r - 1, m.w = 1;
    var c,
        w = t.camera.frustum;
    return v(w.fovy) ? (c = 1 / (s = B.multiplyByVector(i.inverseViewProjection, m, p)).w, W.multiplyByScalar(s, c, s)) : (v(w._offCenterFrustum) && (w = w._offCenterFrustum), (s = p).x = .5 * (m.x * (w.right - w.left) + w.left + w.right), s.y = .5 * (m.y * (w.top - w.bottom) + w.bottom + w.top), s.z = .5 * (m.z * (a - u) - a - u), s.w = 1, s = B.multiplyByVector(i.inverseView, s, s)), W.fromCartesian4(s, o);
  }, M;
});