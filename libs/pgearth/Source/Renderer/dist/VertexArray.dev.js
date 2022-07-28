"use strict";

define(["../Core/Check", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Geometry", "../Core/IndexDatatype", "../Core/Math", "../Core/RuntimeError", "./Buffer", "./BufferUsage", "./ContextLimits"], function (l, D, A, _, e, i, p, m, B, g, I, w, E, c) {
  "use strict";

  function x(e, t, r) {
    for (var n = 0; n < t.length; ++n) {
      var i = t[n];
      i.enabled && i.vertexAttrib(e);
    }

    _(r) && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, r._getBuffer());
  }

  function C(e) {
    e = A(e, A.EMPTY_OBJECT), l.defined("options.context", e.context), l.defined("options.attributes", e.attributes);

    for (var t = e.context, r = t._gl, n = e.attributes, i = e.indexBuffer, a = [], o = 1, s = !1, u = !1, f = n.length, v = 0; v < f; ++v) {
      !function (e, t, r, n) {
        var i = _(t.vertexBuffer),
            a = _(t.value),
            o = t.value ? t.value.length : t.componentsPerAttribute;

        if (!i && !a) throw new p("attribute must have a vertexBuffer or a value.");
        if (i && a) throw new p("attribute cannot have both a vertexBuffer and a value.  It must have either a vertexBuffer property defining per-vertex data or a value property defining data for all vertices.");

        if (1 !== o && 2 !== o && 3 !== o && 4 !== o) {
          if (a) throw new p("attribute.value.length must be in the range [1, 4].");
          throw new p("attribute.componentsPerAttribute must be in the range [1, 4].");
        }

        if (_(t.componentDatatype) && !D.validate(t.componentDatatype)) throw new p("attribute must have a valid componentDatatype or not specify it.");
        if (_(t.strideInBytes) && 255 < t.strideInBytes) throw new p("attribute must have a strideInBytes less than or equal to 255 or not specify it.");
        if (_(t.instanceDivisor) && 0 < t.instanceDivisor && !n.instancedArrays) throw new p("instanced arrays is not supported");
        if (_(t.instanceDivisor) && t.instanceDivisor < 0) throw new p("attribute must have an instanceDivisor greater than or equal to zero");
        if (_(t.instanceDivisor) && a) throw new p("attribute cannot have have an instanceDivisor if it is not backed by a buffer");
        if (_(t.instanceDivisor) && 0 < t.instanceDivisor && 0 === t.index) throw new p("attribute zero cannot have an instanceDivisor greater than 0");
        var s = {
          index: A(t.index, r),
          enabled: A(t.enabled, !0),
          vertexBuffer: t.vertexBuffer,
          value: a ? t.value.slice(0) : void 0,
          componentsPerAttribute: o,
          componentDatatype: A(t.componentDatatype, D.FLOAT),
          normalize: A(t.normalize, !1),
          offsetInBytes: A(t.offsetInBytes, 0),
          strideInBytes: A(t.strideInBytes, 0),
          instanceDivisor: A(t.instanceDivisor, 0)
        };
        if (i) s.vertexAttrib = function (e) {
          var t = this.index;
          e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer._getBuffer()), e.vertexAttribPointer(t, this.componentsPerAttribute, this.componentDatatype, this.normalize, this.strideInBytes, this.offsetInBytes), e.enableVertexAttribArray(t), 0 < this.instanceDivisor && (n.glVertexAttribDivisor(t, this.instanceDivisor), n._vertexAttribDivisors[t] = this.instanceDivisor, n._previousDrawInstanced = !0);
        }, s.disableVertexAttribArray = function (e) {
          e.disableVertexAttribArray(this.index), 0 < this.instanceDivisor && n.glVertexAttribDivisor(r, 0);
        };else {
          switch (s.componentsPerAttribute) {
            case 1:
              s.vertexAttrib = function (e) {
                e.vertexAttrib1fv(this.index, this.value);
              };

              break;

            case 2:
              s.vertexAttrib = function (e) {
                e.vertexAttrib2fv(this.index, this.value);
              };

              break;

            case 3:
              s.vertexAttrib = function (e) {
                e.vertexAttrib3fv(this.index, this.value);
              };

              break;

            case 4:
              s.vertexAttrib = function (e) {
                e.vertexAttrib4fv(this.index, this.value);
              };

          }

          s.disableVertexAttribArray = function (e) {};
        }
        e.push(s);
      }(a, n[v], v, t);
    }

    for (f = a.length, v = 0; v < f; ++v) {
      var c = a[v];

      if (_(c.vertexBuffer) && 0 === c.instanceDivisor) {
        var h = c.strideInBytes || c.componentsPerAttribute * D.getSizeInBytes(c.componentDatatype),
            o = c.vertexBuffer.sizeInBytes / h;
        break;
      }
    }

    for (v = 0; v < f; ++v) {
      0 < a[v].instanceDivisor && (s = !0), _(a[v].value) && (u = !0);
    }

    var y,
        b = {};

    for (v = 0; v < f; ++v) {
      var d = a[v].index;
      if (b[d]) throw new p("Index " + d + " is used by more than one attribute.");
      b[d] = !0;
    }

    t.vertexArrayObject && (y = t.glCreateVertexArray(), t.glBindVertexArray(y), x(r, a, i), t.glBindVertexArray(null)), this._numberOfVertices = o, this._hasInstancedAttributes = s, this._hasConstantAttributes = u, this._context = t, this._gl = r, this._vao = y, this._attributes = a, this._indexBuffer = i;
  }

  function O(e) {
    return e.values.length / e.componentsPerAttribute;
  }

  function T(r) {
    var e,
        t,
        n,
        i = [];

    for (e in r) {
      r.hasOwnProperty(e) && _(r[e]) && _(r[e].values) && (i.push(e), r[e].componentDatatype === D.DOUBLE && (r[e].componentDatatype = D.FLOAT, r[e].values = D.createTypedArray(D.FLOAT, r[e].values)));
    }

    var a = i.length;
    if (0 < a) for (n = O(r[i[0]]), b = 1; b < a; ++b) {
      var o = O(r[i[b]]);
      if (o !== n) throw new I("Each attribute list must have the same number of vertices.  Attribute " + i[b] + " has a different number of vertices (" + o.toString() + ") than attribute " + i[0] + " (" + n.toString() + ").");
    }
    i.sort(function (e, t) {
      return D.getSizeInBytes(r[t].componentDatatype) - D.getSizeInBytes(r[e].componentDatatype);
    });
    var s,
        u = 0,
        f = {};

    for (b = 0; b < a; ++b) {
      e = i[b], t = r[e], f[e] = u, u += (s = t, D.getSizeInBytes(s.componentDatatype) * s.componentsPerAttribute);
    }

    if (0 < u) {
      var v = D.getSizeInBytes(r[i[0]].componentDatatype),
          c = u % v;
      0 != c && (u += v - c);

      for (var h = new ArrayBuffer(n * u), y = {}, b = 0; b < a; ++b) {
        e = i[b];
        var d = D.getSizeInBytes(r[e].componentDatatype);
        y[e] = {
          pointer: D.createTypedArray(r[e].componentDatatype, h),
          index: f[e] / d,
          strideInComponentType: u / d
        };
      }

      for (b = 0; b < n; ++b) {
        for (var p = 0; p < a; ++p) {
          e = i[p];

          for (var x = (t = r[e]).values, l = y[e], A = l.pointer, m = t.componentsPerAttribute, B = 0; B < m; ++B) {
            A[l.index + B] = x[b * m + B];
          }

          l.index += l.strideInComponentType;
        }
      }

      return {
        buffer: h,
        offsetsInBytes: f,
        vertexSizeInBytes: u
      };
    }
  }

  return C.fromGeometry = function (e) {
    e = A(e, A.EMPTY_OBJECT), l.defined("options.context", e.context);
    var t,
        r,
        n,
        i,
        a,
        o = e.context,
        s = A(e.geometry, A.EMPTY_OBJECT),
        u = A(e.bufferUsage, E.DYNAMIC_DRAW),
        f = A(e.attributeLocations, A.EMPTY_OBJECT),
        v = A(e.interleave, !1),
        c = e.vertexArrayAttributes,
        h = _(c) ? c : [],
        y = s.attributes;

    if (v) {
      var b = T(y);

      if (_(b)) {
        n = w.createVertexBuffer({
          context: o,
          typedArray: b.buffer,
          usage: u
        });
        var d = b.offsetsInBytes,
            p = b.vertexSizeInBytes;

        for (t in y) {
          y.hasOwnProperty(t) && _(y[t]) && (r = y[t], _(r.values) ? h.push({
            index: f[t],
            vertexBuffer: n,
            componentDatatype: r.componentDatatype,
            componentsPerAttribute: r.componentsPerAttribute,
            normalize: r.normalize,
            offsetInBytes: d[t],
            strideInBytes: p
          }) : h.push({
            index: f[t],
            value: r.value,
            componentDatatype: r.componentDatatype,
            normalize: r.normalize
          }));
        }
      }
    } else for (t in y) {
      y.hasOwnProperty(t) && _(y[t]) && ((i = (r = y[t]).componentDatatype) === D.DOUBLE && (i = D.FLOAT), n = void 0, _(r.values) && (n = w.createVertexBuffer({
        context: o,
        typedArray: D.createTypedArray(i, r.values),
        usage: u
      })), h.push({
        index: f[t],
        vertexBuffer: n,
        value: r.value,
        componentDatatype: i,
        componentsPerAttribute: r.componentsPerAttribute,
        normalize: r.normalize
      }));
    }

    var x = s.indices;
    return _(x) && (a = m.computeNumberOfVertices(s) >= g.SIXTY_FOUR_KILOBYTES && o.elementIndexUint ? w.createIndexBuffer({
      context: o,
      typedArray: new Uint32Array(x),
      usage: u,
      indexDatatype: B.UNSIGNED_INT
    }) : w.createIndexBuffer({
      context: o,
      typedArray: new Uint16Array(x),
      usage: u,
      indexDatatype: B.UNSIGNED_SHORT
    })), new C({
      context: o,
      attributes: h,
      indexBuffer: a
    });
  }, e(C.prototype, {
    numberOfAttributes: {
      get: function get() {
        return this._attributes.length;
      }
    },
    numberOfVertices: {
      get: function get() {
        return this._numberOfVertices;
      }
    },
    indexBuffer: {
      get: function get() {
        return this._indexBuffer;
      }
    }
  }), C.prototype.getAttribute = function (e) {
    return l.defined("index", e), this._attributes[e];
  }, C.prototype._bind = function () {
    _(this._vao) ? (this._context.glBindVertexArray(this._vao), this._context.instancedArrays && function (e) {
      var t = e._context,
          r = e._hasInstancedAttributes;

      if (r || t._previousDrawInstanced) {
        t._previousDrawInstanced = r;
        var n = t._vertexAttribDivisors,
            i = e._attributes,
            a = c.maximumVertexAttributes;
        if (r) for (var o = i.length, s = 0; s < o; ++s) {
          var u,
              f,
              v = i[s];
          !v.enabled || (u = v.instanceDivisor) !== n[f = v.index] && (t.glVertexAttribDivisor(f, u), n[f] = u);
        } else for (s = 0; s < a; ++s) {
          0 < n[s] && (t.glVertexAttribDivisor(s, 0), n[s] = 0);
        }
      }
    }(this), this._hasConstantAttributes && function (e, t) {
      for (var r = e._attributes, n = r.length, i = 0; i < n; ++i) {
        var a = r[i];
        a.enabled && _(a.value) && a.vertexAttrib(t);
      }
    }(this, this._gl)) : x(this._gl, this._attributes, this._indexBuffer);
  }, C.prototype._unBind = function () {
    if (_(this._vao)) this._context.glBindVertexArray(null);else {
      for (var e = this._attributes, t = this._gl, r = 0; r < e.length; ++r) {
        var n = e[r];
        n.enabled && n.disableVertexAttribArray(t);
      }

      this._indexBuffer && t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null);
    }
  }, C.prototype.isDestroyed = function () {
    return !1;
  }, C.prototype.destroy = function () {
    for (var e = this._attributes, t = 0; t < e.length; ++t) {
      var r = e[t].vertexBuffer;
      _(r) && !r.isDestroyed() && r.vertexArrayDestroyable && r.destroy();
    }

    var n = this._indexBuffer;
    return _(n) && !n.isDestroyed() && n.vertexArrayDestroyable && n.destroy(), _(this._vao) && this._context.glDeleteVertexArray(this._vao), i(this);
  }, C;
});