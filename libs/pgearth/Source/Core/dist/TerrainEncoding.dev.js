"use strict";

define(["./AttributeCompression", "./Cartesian2", "./Cartesian3", "./ComponentDatatype", "./defaultValue", "./defined", "./Math", "./Matrix4", "./TerrainQuantization"], function (x, f, N, a, g, S, y, B, E) {
  "use strict";

  var b = new N(),
      z = new N(),
      T = new f(),
      v = new B(),
      C = new B(),
      I = Math.pow(2, 12);

  function r(t, e, r, i, o, n) {
    var s,
        a,
        m,
        c,
        u,
        h,
        d,
        p,
        l,
        x,
        f,
        y,
        T = E.NONE;
    S(t) && S(e) && S(r) && S(i) && (a = t.minimum, m = t.maximum, c = N.subtract(m, a, z), u = r - e, T = Math.max(N.maximumComponent(c), u) < I - 1 ? E.BITS12 : E.NONE, h = t.center, d = B.inverseTransformation(i, new B()), p = N.negate(a, b), B.multiply(B.fromTranslation(p, v), d, d), (l = b).x = 1 / c.x, l.y = 1 / c.y, l.z = 1 / c.z, B.multiply(B.fromScale(l, v), d, d), s = B.clone(i), B.setTranslation(s, N.ZERO, s), i = B.clone(i, new B()), x = B.fromTranslation(a, v), f = B.fromScale(c, C), y = B.multiply(x, f, v), B.multiply(i, y, i), B.multiply(s, y, s)), this.quantization = T, this.minimumHeight = e, this.maximumHeight = r, this.center = h, this.toScaledENU = d, this.fromScaledENU = i, this.matrix = s, this.hasVertexNormals = o, this.hasWebMercatorT = g(n, !1);
  }

  r.prototype.encode = function (t, e, r, i, o, n, s) {
    var a,
        m,
        c,
        u,
        h,
        d,
        p = i.x,
        l = i.y;
    return this.quantization === E.BITS12 ? ((r = B.multiplyByPoint(this.toScaledENU, r, b)).x = y.clamp(r.x, 0, 1), r.y = y.clamp(r.y, 0, 1), r.z = y.clamp(r.z, 0, 1), a = this.maximumHeight - this.minimumHeight, m = y.clamp((o - this.minimumHeight) / a, 0, 1), f.fromElements(r.x, r.y, T), c = x.compressTextureCoordinates(T), f.fromElements(r.z, m, T), u = x.compressTextureCoordinates(T), f.fromElements(p, l, T), h = x.compressTextureCoordinates(T), t[e++] = c, t[e++] = u, t[e++] = h, this.hasWebMercatorT && (f.fromElements(s, 0, T), d = x.compressTextureCoordinates(T), t[e++] = d)) : (N.subtract(r, this.center, b), t[e++] = b.x, t[e++] = b.y, t[e++] = b.z, t[e++] = o, t[e++] = p, t[e++] = l, this.hasWebMercatorT && (t[e++] = s)), this.hasVertexNormals && (t[e++] = x.octPackFloat(n)), e;
  }, r.prototype.decodePosition = function (t, e, r) {
    if (S(r) || (r = new N()), e *= this.getStride(), this.quantization !== E.BITS12) return r.x = t[e], r.y = t[e + 1], r.z = t[e + 2], N.add(r, this.center, r);
    var i = x.decompressTextureCoordinates(t[e], T);
    r.x = i.x, r.y = i.y;
    var o = x.decompressTextureCoordinates(t[e + 1], T);
    return r.z = o.x, B.multiplyByPoint(this.fromScaledENU, r, r);
  }, r.prototype.decodeTextureCoordinates = function (t, e, r) {
    return S(r) || (r = new f()), e *= this.getStride(), this.quantization === E.BITS12 ? x.decompressTextureCoordinates(t[e + 2], r) : f.fromElements(t[e + 4], t[e + 5], r);
  }, r.prototype.decodeHeight = function (t, e) {
    return e *= this.getStride(), this.quantization !== E.BITS12 ? t[e + 3] : x.decompressTextureCoordinates(t[e + 1], T).y * (this.maximumHeight - this.minimumHeight) + this.minimumHeight;
  }, r.prototype.decodeWebMercatorT = function (t, e) {
    return e *= this.getStride(), this.quantization === E.BITS12 ? x.decompressTextureCoordinates(t[e + 3], T).x : t[e + 6];
  }, r.prototype.getOctEncodedNormal = function (t, e, r) {
    var i = t[e = (e + 1) * this.getStride() - 1] / 256,
        o = Math.floor(i),
        n = 256 * (i - o);
    return f.fromElements(o, n, r);
  }, r.prototype.getStride = function () {
    var t;

    switch (this.quantization) {
      case E.BITS12:
        t = 3;
        break;

      default:
        t = 6;
    }

    return this.hasWebMercatorT && ++t, this.hasVertexNormals && ++t, t;
  };
  var m = {
    position3DAndHeight: 0,
    textureCoordAndEncodedNormals: 1
  },
      c = {
    compressed0: 0,
    compressed1: 1
  };
  return r.prototype.getAttributes = function (t) {
    var e,
        r = a.FLOAT,
        i = a.getSizeInBytes(r);

    if (this.quantization === E.NONE) {
      var o = 2;
      return this.hasWebMercatorT && ++o, this.hasVertexNormals && ++o, [{
        index: m.position3DAndHeight,
        vertexBuffer: t,
        componentDatatype: r,
        componentsPerAttribute: 4,
        offsetInBytes: 0,
        strideInBytes: e = (4 + o) * i
      }, {
        index: m.textureCoordAndEncodedNormals,
        vertexBuffer: t,
        componentDatatype: r,
        componentsPerAttribute: o,
        offsetInBytes: 4 * i,
        strideInBytes: e
      }];
    }

    var n = 3,
        s = 0;
    return (this.hasWebMercatorT || this.hasVertexNormals) && ++n, this.hasWebMercatorT && this.hasVertexNormals ? [{
      index: c.compressed0,
      vertexBuffer: t,
      componentDatatype: r,
      componentsPerAttribute: n,
      offsetInBytes: 0,
      strideInBytes: e = (n + ++s) * i
    }, {
      index: c.compressed1,
      vertexBuffer: t,
      componentDatatype: r,
      componentsPerAttribute: s,
      offsetInBytes: n * i,
      strideInBytes: e
    }] : [{
      index: c.compressed0,
      vertexBuffer: t,
      componentDatatype: r,
      componentsPerAttribute: n
    }];
  }, r.prototype.getAttributeLocations = function () {
    return this.quantization === E.NONE ? m : c;
  }, r.clone = function (t, e) {
    return S(e) || (e = new r()), e.quantization = t.quantization, e.minimumHeight = t.minimumHeight, e.maximumHeight = t.maximumHeight, e.center = N.clone(t.center), e.toScaledENU = B.clone(t.toScaledENU), e.fromScaledENU = B.clone(t.fromScaledENU), e.matrix = B.clone(t.matrix), e.hasVertexNormals = t.hasVertexNormals, e.hasWebMercatorT = t.hasWebMercatorT, e;
  }, r;
});