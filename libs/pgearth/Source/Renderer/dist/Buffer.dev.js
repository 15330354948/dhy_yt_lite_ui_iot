"use strict";

define(["../Core/Check", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/IndexDatatype", "../Core/WebGLConstants", "./BufferUsage"], function (o, u, y, f, e, h, a, d, b) {
  "use strict";

  function B(e) {
    if (e = u(e, u.EMPTY_OBJECT), o.defined("options.context", e.context), !y(e.typedArray) && !y(e.sizeInBytes)) throw new h("Either options.sizeInBytes or options.typedArray is required.");
    if (y(e.typedArray) && y(e.sizeInBytes)) throw new h("Cannot pass in both options.sizeInBytes and options.typedArray.");
    if (y(e.typedArray) && (o.typeOf.object("options.typedArray", e.typedArray), o.typeOf.number("options.typedArray.byteLength", e.typedArray.byteLength)), !b.validate(e.usage)) throw new h("usage is invalid.");
    var t = e.context._gl,
        r = e.bufferTarget,
        n = e.typedArray,
        s = e.sizeInBytes,
        i = e.usage,
        f = y(n);
    f && (s = n.byteLength), o.typeOf.number.greaterThan("sizeInBytes", s, 0);
    var a = t.createBuffer();
    t.bindBuffer(r, a), t.bufferData(r, f ? n : s, i), t.bindBuffer(r, null), this._gl = t, this._webgl2 = e.context._webgl2, this._bufferTarget = r, this._sizeInBytes = s, this._usage = i, this._buffer = a, this.vertexArrayDestroyable = !0;
  }

  return B.createVertexBuffer = function (e) {
    return o.defined("options.context", e.context), new B({
      context: e.context,
      bufferTarget: d.ARRAY_BUFFER,
      typedArray: e.typedArray,
      sizeInBytes: e.sizeInBytes,
      usage: e.usage
    });
  }, B.createIndexBuffer = function (e) {
    if (o.defined("options.context", e.context), !a.validate(e.indexDatatype)) throw new h("Invalid indexDatatype.");
    if (e.indexDatatype === a.UNSIGNED_INT && !e.context.elementIndexUint) throw new h("IndexDatatype.UNSIGNED_INT requires OES_element_index_uint, which is not supported on this system.  Check context.elementIndexUint.");
    var t = e.context,
        r = e.indexDatatype,
        n = a.getSizeInBytes(r),
        s = new B({
      context: t,
      bufferTarget: d.ELEMENT_ARRAY_BUFFER,
      typedArray: e.typedArray,
      sizeInBytes: e.sizeInBytes,
      usage: e.usage
    }),
        i = s.sizeInBytes / n;
    return f(s, {
      indexDatatype: {
        get: function get() {
          return r;
        }
      },
      bytesPerIndex: {
        get: function get() {
          return n;
        }
      },
      numberOfIndices: {
        get: function get() {
          return i;
        }
      }
    }), s;
  }, f(B.prototype, {
    sizeInBytes: {
      get: function get() {
        return this._sizeInBytes;
      }
    },
    usage: {
      get: function get() {
        return this._usage;
      }
    }
  }), B.prototype._getBuffer = function () {
    return this._buffer;
  }, B.prototype.copyFromArrayView = function (e, t) {
    t = u(t, 0), o.defined("arrayView", e), o.typeOf.number.lessThanOrEquals("offsetInBytes + arrayView.byteLength", t + e.byteLength, this._sizeInBytes);
    var r = this._gl,
        n = this._bufferTarget;
    r.bindBuffer(n, this._buffer), r.bufferSubData(n, t, e), r.bindBuffer(n, null);
  }, B.prototype.copyFromBuffer = function (e, t, r, n) {
    if (!this._webgl2) throw new h("A WebGL 2 context is required.");
    if (!y(e)) throw new h("readBuffer must be defined.");
    if (!y(n) || n <= 0) throw new h("sizeInBytes must be defined and be greater than zero.");
    if (!y(t) || t < 0 || t + n > e._sizeInBytes) throw new h("readOffset must be greater than or equal to zero and readOffset + sizeInBytes must be less than of equal to readBuffer.sizeInBytes.");
    if (!y(r) || r < 0 || r + n > this._sizeInBytes) throw new h("writeOffset must be greater than or equal to zero and writeOffset + sizeInBytes must be less than of equal to this.sizeInBytes.");
    if (this._buffer === e._buffer && (t <= r && r < t + n || r < t && t < r + n)) throw new h("When readBuffer is equal to this, the ranges [readOffset + sizeInBytes) and [writeOffset, writeOffset + sizeInBytes) must not overlap.");
    if (this._bufferTarget === d.ELEMENT_ARRAY_BUFFER && e._bufferTarget !== d.ELEMENT_ARRAY_BUFFER || this._bufferTarget !== d.ELEMENT_ARRAY_BUFFER && e._bufferTarget === d.ELEMENT_ARRAY_BUFFER) throw new h("Can not copy an index buffer into another buffer type.");
    var s = d.COPY_READ_BUFFER,
        i = d.COPY_WRITE_BUFFER,
        f = this._gl;
    f.bindBuffer(i, this._buffer), f.bindBuffer(s, e._buffer), f.copyBufferSubData(s, i, t, r, n), f.bindBuffer(i, null), f.bindBuffer(s, null);
  }, B.prototype.getBufferData = function (e, t, r, n) {
    if (t = u(t, 0), r = u(r, 0), !this._webgl2) throw new h("A WebGL 2 context is required.");
    if (!y(e)) throw new h("arrayView is required.");
    var s,
        i = e.byteLength,
        f = y(n) ? (s = n, y(i) ? 1 : (i = e.length, e.BYTES_PER_ELEMENT)) : y(i) ? (s = i - r, 1) : (s = (i = e.length) - r, e.BYTES_PER_ELEMENT);
    if (r < 0 || i < r) throw new h("destinationOffset must be greater than zero and less than the arrayView length.");
    if (i < r + s) throw new h("destinationOffset + length must be less than or equal to the arrayViewLength.");
    if (t < 0 || t > this._sizeInBytes) throw new h("sourceOffset must be greater than zero and less than the buffers size.");
    if (t + s * f > this._sizeInBytes) throw new h("sourceOffset + length must be less than the buffers size.");
    var a = this._gl,
        o = d.COPY_READ_BUFFER;
    a.bindBuffer(o, this._buffer), a.getBufferSubData(o, t, e, r, n), a.bindBuffer(o, null);
  }, B.prototype.isDestroyed = function () {
    return !1;
  }, B.prototype.destroy = function () {
    return this._gl.deleteBuffer(this._buffer), e(this);
  }, B;
});