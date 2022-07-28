"use strict";

define(["./Cartesian3", "./Cartesian4", "./CullingVolume", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Math", "./Matrix4"], function (w, m, e, i, _, t, g, r, s) {
  "use strict";

  function o(t) {
    t = i(t, i.EMPTY_OBJECT), this.left = t.left, this._left = void 0, this.right = t.right, this._right = void 0, this.top = t.top, this._top = void 0, this.bottom = t.bottom, this._bottom = void 0, this.near = i(t.near, 1), this._near = this.near, this.far = i(t.far, 5e8), this._far = this.far, this._cullingVolume = new e(), this._perspectiveMatrix = new s(), this._infinitePerspective = new s();
  }

  function h(t) {
    if (!(_(t.right) && _(t.left) && _(t.top) && _(t.bottom) && _(t.near) && _(t.far))) throw new g("right, left, top, bottom, near, or far parameters are not set.");
    var e = t.top,
        i = t.bottom,
        r = t.right,
        o = t.left,
        n = t.near,
        a = t.far;

    if (e !== t._top || i !== t._bottom || o !== t._left || r !== t._right || n !== t._near || a !== t._far) {
      if (t.near <= 0 || t.near > t.far) throw new g("near must be greater than zero and less than far.");
      t._left = o, t._right = r, t._top = e, t._bottom = i, t._near = n, t._far = a, t._perspectiveMatrix = s.computePerspectiveOffCenter(o, r, i, e, n, a, t._perspectiveMatrix), t._infinitePerspective = s.computeInfinitePerspectiveOffCenter(o, r, i, e, n, t._infinitePerspective);
    }
  }

  t(o.prototype, {
    projectionMatrix: {
      get: function get() {
        return h(this), this._perspectiveMatrix;
      }
    },
    infiniteProjectionMatrix: {
      get: function get() {
        return h(this), this._infinitePerspective;
      }
    }
  });
  var y = new w(),
      v = new w(),
      b = new w(),
      x = new w();
  return o.prototype.computeCullingVolume = function (t, e, i) {
    if (!_(t)) throw new g("position is required.");
    if (!_(e)) throw new g("direction is required.");
    if (!_(i)) throw new g("up is required.");
    var r = this._cullingVolume.planes,
        o = this.top,
        n = this.bottom,
        a = this.right,
        s = this.left,
        h = this.near,
        f = this.far,
        l = w.cross(e, i, y),
        u = v;
    w.multiplyByScalar(e, h, u), w.add(t, u, u);
    var p = b;
    w.multiplyByScalar(e, f, p), w.add(t, p, p);
    var c = x;
    w.multiplyByScalar(l, s, c), w.add(u, c, c), w.subtract(c, t, c), w.normalize(c, c), w.cross(c, i, c), w.normalize(c, c);
    var d = r[0];
    return _(d) || (d = r[0] = new m()), d.x = c.x, d.y = c.y, d.z = c.z, d.w = -w.dot(c, t), w.multiplyByScalar(l, a, c), w.add(u, c, c), w.subtract(c, t, c), w.cross(i, c, c), w.normalize(c, c), d = r[1], _(d) || (d = r[1] = new m()), d.x = c.x, d.y = c.y, d.z = c.z, d.w = -w.dot(c, t), w.multiplyByScalar(i, n, c), w.add(u, c, c), w.subtract(c, t, c), w.cross(l, c, c), w.normalize(c, c), d = r[2], _(d) || (d = r[2] = new m()), d.x = c.x, d.y = c.y, d.z = c.z, d.w = -w.dot(c, t), w.multiplyByScalar(i, o, c), w.add(u, c, c), w.subtract(c, t, c), w.cross(c, l, c), w.normalize(c, c), d = r[3], _(d) || (d = r[3] = new m()), d.x = c.x, d.y = c.y, d.z = c.z, d.w = -w.dot(c, t), d = r[4], _(d) || (d = r[4] = new m()), d.x = e.x, d.y = e.y, d.z = e.z, d.w = -w.dot(e, u), w.negate(e, c), d = r[5], _(d) || (d = r[5] = new m()), d.x = c.x, d.y = c.y, d.z = c.z, d.w = -w.dot(c, p), this._cullingVolume;
  }, o.prototype.getPixelDimensions = function (t, e, i, r) {
    if (h(this), !_(t) || !_(e)) throw new g("Both drawingBufferWidth and drawingBufferHeight are required.");
    if (t <= 0) throw new g("drawingBufferWidth must be greater than zero.");
    if (e <= 0) throw new g("drawingBufferHeight must be greater than zero.");
    if (!_(i)) throw new g("distance is required.");
    if (!_(r)) throw new g("A result object is required.");
    var o = 1 / this.near,
        n = 2 * i * (this.top * o) / e,
        a = 2 * i * (this.right * o) / t;
    return r.x = a, r.y = n, r;
  }, o.prototype.clone = function (t) {
    return _(t) || (t = new o()), t.right = this.right, t.left = this.left, t.top = this.top, t.bottom = this.bottom, t.near = this.near, t.far = this.far, t._left = void 0, t._right = void 0, t._top = void 0, t._bottom = void 0, t._near = void 0, t._far = void 0, t;
  }, o.prototype.equals = function (t) {
    return _(t) && t instanceof o && this.right === t.right && this.left === t.left && this.top === t.top && this.bottom === t.bottom && this.near === t.near && this.far === t.far;
  }, o.prototype.equalsEpsilon = function (t, e, i) {
    return t === this || _(t) && t instanceof o && r.equalsEpsilon(this.right, t.right, e, i) && r.equalsEpsilon(this.left, t.left, e, i) && r.equalsEpsilon(this.top, t.top, e, i) && r.equalsEpsilon(this.bottom, t.bottom, e, i) && r.equalsEpsilon(this.near, t.near, e, i) && r.equalsEpsilon(this.far, t.far, e, i);
  }, o;
});