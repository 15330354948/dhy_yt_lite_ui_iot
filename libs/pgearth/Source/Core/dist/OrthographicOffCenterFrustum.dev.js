"use strict";

define(["./Cartesian3", "./Cartesian4", "./CullingVolume", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Math", "./Matrix4"], function (g, w, e, r, m, t, c, i, o) {
  "use strict";

  function a(t) {
    t = r(t, r.EMPTY_OBJECT), this.left = t.left, this._left = void 0, this.right = t.right, this._right = void 0, this.top = t.top, this._top = void 0, this.bottom = t.bottom, this._bottom = void 0, this.near = r(t.near, 1), this._near = this.near, this.far = r(t.far, 5e8), this._far = this.far, this._cullingVolume = new e(), this._orthographicMatrix = new o();
  }

  function n(t) {
    if (!(m(t.right) && m(t.left) && m(t.top) && m(t.bottom) && m(t.near) && m(t.far))) throw new c("right, left, top, bottom, near, or far parameters are not set.");

    if (t.top !== t._top || t.bottom !== t._bottom || t.left !== t._left || t.right !== t._right || t.near !== t._near || t.far !== t._far) {
      if (t.left > t.right) throw new c("right must be greater than left.");
      if (t.bottom > t.top) throw new c("top must be greater than bottom.");
      if (t.near <= 0 || t.near > t.far) throw new c("near must be greater than zero and less than far.");
      t._left = t.left, t._right = t.right, t._top = t.top, t._bottom = t.bottom, t._near = t.near, t._far = t.far, t._orthographicMatrix = o.computeOrthographicOffCenter(t.left, t.right, t.bottom, t.top, t.near, t.far, t._orthographicMatrix);
    }
  }

  t(a.prototype, {
    projectionMatrix: {
      get: function get() {
        return n(this), this._orthographicMatrix;
      }
    }
  });

  var _ = new g(),
      y = new g(),
      b = new g(),
      x = new g();

  return a.prototype.computeCullingVolume = function (t, e, r) {
    if (!m(t)) throw new c("position is required.");
    if (!m(e)) throw new c("direction is required.");
    if (!m(r)) throw new c("up is required.");
    var i = this._cullingVolume.planes,
        o = this.top,
        a = this.bottom,
        n = this.right,
        h = this.left,
        s = this.near,
        f = this.far,
        l = g.cross(e, r, _);
    g.normalize(l, l);
    var u = y;
    g.multiplyByScalar(e, s, u), g.add(t, u, u);
    var p = b;
    g.multiplyByScalar(l, h, p), g.add(u, p, p);
    var d = i[0];
    return m(d) || (d = i[0] = new w()), d.x = l.x, d.y = l.y, d.z = l.z, d.w = -g.dot(l, p), g.multiplyByScalar(l, n, p), g.add(u, p, p), d = i[1], m(d) || (d = i[1] = new w()), d.x = -l.x, d.y = -l.y, d.z = -l.z, d.w = -g.dot(g.negate(l, x), p), g.multiplyByScalar(r, a, p), g.add(u, p, p), d = i[2], m(d) || (d = i[2] = new w()), d.x = r.x, d.y = r.y, d.z = r.z, d.w = -g.dot(r, p), g.multiplyByScalar(r, o, p), g.add(u, p, p), d = i[3], m(d) || (d = i[3] = new w()), d.x = -r.x, d.y = -r.y, d.z = -r.z, d.w = -g.dot(g.negate(r, x), p), d = i[4], m(d) || (d = i[4] = new w()), d.x = e.x, d.y = e.y, d.z = e.z, d.w = -g.dot(e, u), g.multiplyByScalar(e, f, p), g.add(t, p, p), d = i[5], m(d) || (d = i[5] = new w()), d.x = -e.x, d.y = -e.y, d.z = -e.z, d.w = -g.dot(g.negate(e, x), p), this._cullingVolume;
  }, a.prototype.getPixelDimensions = function (t, e, r, i) {
    if (n(this), !m(t) || !m(e)) throw new c("Both drawingBufferWidth and drawingBufferHeight are required.");
    if (t <= 0) throw new c("drawingBufferWidth must be greater than zero.");
    if (e <= 0) throw new c("drawingBufferHeight must be greater than zero.");
    if (!m(r)) throw new c("distance is required.");
    if (!m(i)) throw new c("A result object is required.");
    var o = (this.right - this.left) / t,
        a = (this.top - this.bottom) / e;
    return i.x = o, i.y = a, i;
  }, a.prototype.clone = function (t) {
    return m(t) || (t = new a()), t.left = this.left, t.right = this.right, t.top = this.top, t.bottom = this.bottom, t.near = this.near, t.far = this.far, t._left = void 0, t._right = void 0, t._top = void 0, t._bottom = void 0, t._near = void 0, t._far = void 0, t;
  }, a.prototype.equals = function (t) {
    return m(t) && t instanceof a && this.right === t.right && this.left === t.left && this.top === t.top && this.bottom === t.bottom && this.near === t.near && this.far === t.far;
  }, a.prototype.equalsEpsilon = function (t, e, r) {
    return t === this || m(t) && t instanceof a && i.equalsEpsilon(this.right, t.right, e, r) && i.equalsEpsilon(this.left, t.left, e, r) && i.equalsEpsilon(this.top, t.top, e, r) && i.equalsEpsilon(this.bottom, t.bottom, e, r) && i.equalsEpsilon(this.near, t.near, e, r) && i.equalsEpsilon(this.far, t.far, e, r);
  }, a;
});