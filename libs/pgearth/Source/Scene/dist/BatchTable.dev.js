"use strict";

define(["../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/combine", "../Core/ComponentDatatype", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/FeatureDetection", "../Core/Math", "../Core/PixelFormat", "../Renderer/ContextLimits", "../Renderer/PixelDatatype", "../Renderer/Sampler", "../Renderer/Texture", "../Renderer/TextureMagnificationFilter", "../Renderer/TextureMinificationFilter"], function (m, n, d, r, y, D, t, e, T, a, i, u, v, w, o, s, c, h) {
  "use strict";

  function p(t, e, r) {
    if (!D(t)) throw new T("context is required");
    if (!D(e)) throw new T("attributes is required");
    if (!D(r)) throw new T("numberOfInstances is required");

    var n, a, i, u, o, s, c, h, p, f, l, x, b, _;

    this._attributes = e, this._numberOfInstances = r, 0 !== e.length && (n = function (t) {
      for (var e = !1, r = t.length, n = 0; n < r; ++n) {
        if (t[n].componentDatatype !== y.UNSIGNED_BYTE) {
          e = !0;
          break;
        }
      }

      return e ? w.FLOAT : w.UNSIGNED_BYTE;
    }(e), a = t.floatingPointTexture, o = function (t, e, r) {
      var n = t.length,
          a = t[n - 1];
      if (e[n - 1].componentDatatype !== y.UNSIGNED_BYTE && r) return a + 4;
      return a + 1;
    }(u = function (t, e) {
      for (var r = new Array(t.length), n = 0, a = t.length, i = 0; i < a; ++i) {
        var u = t[i].componentDatatype;
        r[i] = n, u !== y.UNSIGNED_BYTE && e ? n += 4 : ++n;
      }

      return r;
    }(e, i = n === w.FLOAT && !a), e, i), s = Math.floor(v.maximumTextureSize / o), l = .5 * (f = 1 / (h = o * (c = Math.min(r, s)))), b = .5 * (x = 1 / (p = Math.ceil(r / c))), this._textureDimensions = new m(h, p), this._textureStep = new d(f, l, x, b), this._pixelDatatype = i ? w.UNSIGNED_BYTE : n, this._packFloats = i, this._offsets = u, this._stride = o, this._texture = void 0, _ = 4 * h * p, this._batchValues = new (n !== w.FLOAT || i ? Uint8Array : Float32Array)(_), this._batchValuesDirty = !1);
  }

  function x(t, e) {
    var r = t[e].componentsPerAttribute;
    return 2 === r ? m : 3 === r ? n : 4 === r ? d : Number;
  }

  t(p.prototype, {
    attributes: {
      get: function get() {
        return this._attributes;
      }
    },
    numberOfInstances: {
      get: function get() {
        return this._numberOfInstances;
      }
    }
  });
  var b = new d();

  if (a.supportsTypedArrays()) {
    var f = new d();

    p.prototype.getBatchedAttribute = function (t, e, r) {
      if (t < 0 || t >= this._numberOfInstances) throw new T("instanceIndex is out of range.");
      if (e < 0 || e >= this._attributes.length) throw new T("attributeIndex is out of range");
      var n = this._attributes,
          a = this._offsets[e],
          i = 4 * this._stride * t + 4 * a,
          u = this._packFloats && n[e].componentDatatype !== w.UNSIGNED_BYTE ? function (t, e, r) {
        var n = d.unpack(t, e, b),
            a = d.unpackFloat(n),
            n = d.unpack(t, e + 4, b),
            i = d.unpackFloat(n);
        n = d.unpack(t, e + 8, b);
        var u = d.unpackFloat(n);
        n = d.unpack(t, e + 12, b);
        var o = d.unpackFloat(n);
        return d.fromElements(a, i, u, o, r);
      }(this._batchValues, i, f) : d.unpack(this._batchValues, i, f),
          o = x(n, e);
      return D(o.fromCartesian4) ? o.fromCartesian4(u, r) : D(o.clone) ? o.clone(u, r) : u.x;
    };

    var _ = [void 0, void 0, new m(), new n(), new d()],
        S = new d();
    return p.prototype.setBatchedAttribute = function (t, e, r) {
      if (t < 0 || t >= this._numberOfInstances) throw new T("instanceIndex is out of range.");
      if (e < 0 || e >= this._attributes.length) throw new T("attributeIndex is out of range");
      if (!D(r)) throw new T("value is required.");
      var n,
          a,
          i,
          u,
          o,
          s,
          c,
          h = this._attributes,
          p = _[h[e].componentsPerAttribute],
          f = this.getBatchedAttribute(t, e, p),
          l = x(this._attributes, e);
      (D(l.equals) ? l.equals(f, r) : f === r) || ((n = S).x = D(r.x) ? r.x : r, n.y = D(r.y) ? r.y : 0, n.z = D(r.z) ? r.z : 0, n.w = D(r.w) ? r.w : 0, a = this._offsets[e], i = 4 * this._stride * t + 4 * a, this._packFloats && h[e].componentDatatype !== w.UNSIGNED_BYTE ? (u = n, o = this._batchValues, s = i, c = d.packFloat(u.x, b), d.pack(c, o, s), c = d.packFloat(u.y, c), d.pack(c, o, s + 4), c = d.packFloat(u.z, c), d.pack(c, o, s + 8), c = d.packFloat(u.w, c), d.pack(c, o, s + 12)) : d.pack(n, this._batchValues, i), this._batchValuesDirty = !0);
    }, p.prototype.update = function (t) {
      var e, r, n, a, i;
      D(this._texture) && !this._batchValuesDirty || 0 === this._attributes.length || (this._batchValuesDirty = !1, D(this._texture) || (e = this, r = t.context, n = e._textureDimensions, e._texture = new s({
        context: r,
        pixelFormat: u.RGBA,
        pixelDatatype: e._pixelDatatype,
        width: n.x,
        height: n.y,
        sampler: new o({
          minificationFilter: h.NEAREST,
          magnificationFilter: c.NEAREST
        }),
        flipY: !1
      })), i = (a = this)._textureDimensions, a._texture.copyFrom({
        width: i.x,
        height: i.y,
        arrayBufferView: a._batchValues
      }));
    }, p.prototype.getUniformMapCallback = function () {
      var e = this;
      return function (t) {
        return 0 === e._attributes.length ? t : r(t, {
          batchTexture: function batchTexture() {
            return e._texture;
          },
          batchTextureDimensions: function batchTextureDimensions() {
            return e._textureDimensions;
          },
          batchTextureStep: function batchTextureStep() {
            return e._textureStep;
          }
        });
      };
    }, p.prototype.getVertexShaderCallback = function () {
      var t = this._attributes;
      if (0 === t.length) return function (t) {
        return t;
      };
      var e,
          r,
          a = "uniform sampler2D batchTexture; \n";
      a += (r = (e = this)._stride, (1 === e._textureDimensions.y ? "uniform vec4 batchTextureStep; \nvec2 computeSt(float batchId) \n{ \n    float stepX = batchTextureStep.x; \n    float centerX = batchTextureStep.y; \n    float numberOfAttributes = float(" + r + "); \n    return vec2(centerX + (batchId * numberOfAttributes * stepX), 0.5); \n} \n" : "uniform vec4 batchTextureStep; \nuniform vec2 batchTextureDimensions; \nvec2 computeSt(float batchId) \n{ \n    float stepX = batchTextureStep.x; \n    float centerX = batchTextureStep.y; \n    float stepY = batchTextureStep.z; \n    float centerY = batchTextureStep.w; \n    float numberOfAttributes = float(" + r + "); \n    float xId = mod(batchId * numberOfAttributes, batchTextureDimensions.x); \n    float yId = floor(batchId * numberOfAttributes / batchTextureDimensions.x); \n    return vec2(centerX + (xId * stepX), centerY + (yId * stepY)); \n} \n") + "\n");

      for (var n, i, u, o, s, c, h, p, f, l, x = t.length, b = 0; b < x; ++b) {
        a += (i = b, l = o = u = void 0, s = (n = this)._attributes[i], c = s.componentsPerAttribute, h = s.functionName, p = 1 === (u = c) ? "float" : "vec" + u, f = 1 === (o = c) ? ".x" : 2 === o ? ".xy" : 3 === o ? ".xyz" : "", l = p + " " + h + "(float batchId) \n{ \n    vec2 st = computeSt(batchId); \n    st.x += batchTextureStep.x * float(" + n._offsets[i] + "); \n", n._packFloats && s.componentDatatype !== w.UNSIGNED_BYTE ? l += "vec4 textureValue; \ntextureValue.x = czm_unpackFloat(texture2D(batchTexture, st)); \ntextureValue.y = czm_unpackFloat(texture2D(batchTexture, st + vec2(batchTextureStep.x, 0.0))); \ntextureValue.z = czm_unpackFloat(texture2D(batchTexture, st + vec2(batchTextureStep.x * 2.0, 0.0))); \ntextureValue.w = czm_unpackFloat(texture2D(batchTexture, st + vec2(batchTextureStep.x * 3.0, 0.0))); \n" : l += "    vec4 textureValue = texture2D(batchTexture, st); \n", l += "    " + p + " value = textureValue" + f + "; \n", n._pixelDatatype !== w.UNSIGNED_BYTE || s.componentDatatype !== y.UNSIGNED_BYTE || s.normalize ? n._pixelDatatype === w.FLOAT && s.componentDatatype === y.UNSIGNED_BYTE && s.normalize && (l += "value /= 255.0; \n") : l += "value *= 255.0; \n", l += "    return value; \n} \n");
      }

      return function (t) {
        var e = t.indexOf("void main"),
            r = t.substring(0, e),
            n = t.substring(e);
        return r + "\n" + a + "\n" + n;
      };
    }, p.prototype.isDestroyed = function () {
      return !1;
    }, p.prototype.destroy = function () {
      return this._texture = this._texture && this._texture.destroy(), e(this);
    }, p;
  }
});