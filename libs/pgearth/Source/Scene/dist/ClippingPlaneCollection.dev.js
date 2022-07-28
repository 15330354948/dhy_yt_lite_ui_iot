"use strict";

define(["../Core/AttributeCompression", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Check", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/deprecationWarning", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Event", "../Core/Intersect", "../Core/Matrix4", "../Core/PixelFormat", "../Core/Plane", "../Renderer/ContextLimits", "../Renderer/PixelDatatype", "../Renderer/Sampler", "../Renderer/Texture", "../Renderer/TextureMagnificationFilter", "../Renderer/TextureMinificationFilter", "../Renderer/TextureWrap", "./ClippingPlane"], function (p, e, t, u, i, o, a, d, n, r, s, l, h, c, f, g, _, y, x, w, C, v, m, T, P) {
  "use strict";

  function E(e) {
    e = a(e, a.EMPTY_OBJECT), this._planes = [], this._dirtyIndex = -1, this._multipleDirtyPlanes = !1, this._enabled = a(e.enabled, !0), this.modelMatrix = f.clone(a(e.modelMatrix, f.IDENTITY)), this.edgeColor = o.clone(a(e.edgeColor, o.WHITE)), this.edgeWidth = a(e.edgeWidth, 0), this.planeAdded = new h(), this.planeRemoved = new h(), this._owner = void 0;
    var t = a(e.unionClippingRegions, !1);
    this._unionClippingRegions = t, this._testIntersection = t ? I : R, this._uint8View = void 0, this._float32View = void 0, this._clippingPlanesTexture = void 0;
    var i = e.planes;
    if (d(i)) for (var n = i.length, r = 0; r < n; ++r) {
      this.add(i[r]);
    }
  }

  function I(e) {
    return e === c.OUTSIDE;
  }

  function R(e) {
    return e === c.INSIDE;
  }

  function D(e, t) {
    e._multipleDirtyPlanes = e._multipleDirtyPlanes || -1 !== e._dirtyIndex && e._dirtyIndex !== t, e._dirtyIndex = t;
  }

  function F(e, t) {
    for (var i = e.length, n = 0; n < i; ++n) {
      if (_.equals(e[n], t)) return n;
    }

    return -1;
  }

  n(E.prototype, {
    length: {
      get: function get() {
        return this._planes.length;
      }
    },
    unionClippingRegions: {
      get: function get() {
        return this._unionClippingRegions;
      },
      set: function set(e) {
        this._unionClippingRegions !== e && (this._unionClippingRegions = e, this._testIntersection = e ? I : R);
      }
    },
    enabled: {
      get: function get() {
        return this._enabled;
      },
      set: function set(e) {
        this._enabled !== e && (this._enabled = e);
      }
    },
    texture: {
      get: function get() {
        return this._clippingPlanesTexture;
      }
    },
    owner: {
      get: function get() {
        return this._owner;
      }
    },
    clippingPlanesState: {
      get: function get() {
        return this._unionClippingRegions ? this._planes.length : -this._planes.length;
      }
    }
  }), E.prototype.add = function (e) {
    var t = this._planes.length,
        i = this;
    e.onChangeCallback = function (e) {
      D(i, e);
    }, D(this, e.index = t), this._planes.push(e), this.planeAdded.raiseEvent(e, t);
  }, E.prototype.get = function (e) {
    return i.typeOf.number("index", e), this._planes[e];
  }, E.prototype.contains = function (e) {
    return -1 !== F(this._planes, e);
  }, E.prototype.remove = function (e) {
    var t = this._planes,
        i = F(t, e);
    if (-1 === i) return !1;
    e instanceof P && (e.onChangeCallback = void 0, e.index = -1);

    for (var n = t.length - 1, r = i; r < n; ++r) {
      var o = t[r + 1];
      (t[r] = o) instanceof P && (o.index = r);
    }

    return this._multipleDirtyPlanes = !0, t.length = n, this.planeRemoved.raiseEvent(e, i), !0;
  }, E.prototype.removeAll = function () {
    for (var e = this._planes, t = e.length, i = 0; i < t; ++i) {
      var n = e[i];
      n instanceof P && (n.onChangeCallback = void 0, n.index = -1), this.planeRemoved.raiseEvent(n, i);
    }

    this._multipleDirtyPlanes = !0, this._planes = [];
  };
  var V = new u(),
      M = new u();

  function b(e, t, i) {
    for (var n = e._uint8View, r = e._planes, o = 0, a = t; a < i; ++a) {
      var s = r[a],
          l = p.octEncodeToCartesian4(s.normal, M);
      n[o] = l.x, n[o + 1] = l.y, n[o + 2] = l.z, n[o + 3] = l.w;
      var h = u.packFloat(s.distance, V);
      n[o + 4] = h.x, n[o + 5] = h.y, n[o + 6] = h.z, n[o + 7] = h.w, o += 8;
    }
  }

  function A(e, t, i) {
    for (var n = e._float32View, r = e._planes, o = 0, a = t; a < i; ++a) {
      var s = r[a],
          l = s.normal;
      n[o] = l.x, n[o + 1] = l.y, n[o + 2] = l.z, n[o + 3] = s.distance, o += 4;
    }
  }

  function S(e, t) {
    var i = y.maximumTextureSize;
    return t.x = Math.min(e, i), t.y = Math.ceil(e / t.x), t;
  }

  var N = new e();

  E.prototype.update = function (e) {
    var t,
        i,
        n,
        r,
        o,
        a,
        s = this._clippingPlanesTexture,
        l = e.context,
        h = E.useFloatTexture(l),
        p = h ? this.length : 2 * this.length;
    !d(s) || ((t = s.width * s.height) < p || p < .25 * t) && (s.destroy(), s = void 0, this._clippingPlanesTexture = void 0), 0 !== this.length && (d(s) || ((i = S(p, N)).y *= 2, n = new w({
      wrapS: T.CLAMP_TO_EDGE,
      wrapT: T.CLAMP_TO_EDGE,
      minificationFilter: m.NEAREST,
      magnificationFilter: v.NEAREST
    }), h ? (s = new C({
      context: l,
      width: i.x,
      height: i.y,
      pixelFormat: g.RGBA,
      pixelDatatype: x.FLOAT,
      sampler: n,
      flipY: !1
    }), this._float32View = new Float32Array(i.x * i.y * 4)) : (s = new C({
      context: l,
      width: i.x,
      height: i.y,
      pixelFormat: g.RGBA,
      pixelDatatype: x.UNSIGNED_BYTE,
      sampler: n,
      flipY: !1
    }), this._uint8View = new Uint8Array(i.x * i.y * 4)), this._clippingPlanesTexture = s, this._multipleDirtyPlanes = !0), r = this._dirtyIndex, !this._multipleDirtyPlanes && -1 === r || (this._multipleDirtyPlanes ? h ? (A(this, 0, this._planes.length), s.copyFrom({
      width: s.width,
      height: s.height,
      arrayBufferView: this._float32View
    })) : (b(this, 0, this._planes.length), s.copyFrom({
      width: s.width,
      height: s.height,
      arrayBufferView: this._uint8View
    })) : (a = o = 0, h ? (a = Math.floor(r / s.width), o = Math.floor(r - a * s.width), A(this, r, r + 1), s.copyFrom({
      width: 1,
      height: 1,
      arrayBufferView: this._float32View
    }, o, a)) : (a = Math.floor(2 * r / s.width), o = Math.floor(2 * r - a * s.width), b(this, r, r + 1), s.copyFrom({
      width: 2,
      height: 1,
      arrayBufferView: this._uint8View
    }, o, a))), this._multipleDirtyPlanes = !1, this._dirtyIndex = -1));
  };

  var B = new f(),
      O = new _(t.UNIT_X, 0);
  return E.prototype.computeIntersectionWithBoundingVolume = function (e, t) {
    var i = this._planes,
        n = i.length,
        r = this.modelMatrix;
    d(t) && (r = f.multiply(t, r, B));
    var o = c.INSIDE;
    !this.unionClippingRegions && 0 < n && (o = c.OUTSIDE);

    for (var a = 0; a < n; ++a) {
      var s = i[a];

      _.transform(s, r, O);

      var l = e.intersectPlane(O);
      if (l === c.INTERSECTING) o = l;else if (this._testIntersection(l)) return l;
    }

    return o;
  }, E.setOwner = function (e, t, i) {
    if (e !== t[i] && (t[i] = t[i] && t[i].destroy(), d(e))) {
      if (d(e._owner)) throw new l("ClippingPlaneCollection should only be assigned to one object");
      (e._owner = t)[i] = e;
    }
  }, E.useFloatTexture = function (e) {
    return e.floatingPointTexture;
  }, E.getTextureResolution = function (e, t, i) {
    var n = e.texture;
    if (d(n)) return i.x = n.width, i.y = n.height, i;
    var r = S(E.useFloatTexture(t) ? e.length : 2 * e.length, i);
    return r.y *= 2, r;
  }, E.prototype.isDestroyed = function () {
    return !1;
  }, E.prototype.destroy = function () {
    return this._clippingPlanesTexture = this._clippingPlanesTexture && this._clippingPlanesTexture.destroy(), s(this);
  }, E;
});