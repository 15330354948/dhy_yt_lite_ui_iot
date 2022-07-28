"use strict";

define(["../Core/Check", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Math", "./Buffer", "./BufferUsage", "./VertexArray"], function (m, d, B, l, i, x, y, c, u, p) {
  "use strict";

  function _(e, t, r, n) {
    if (m.defined("context", e), !t || 0 === t.length) throw new x("At least one attribute is required.");

    var i = _._verifyAttributes(t);

    r = B(r, 0);

    for (var o, a, s, f, u = [], v = {}, y = i.length, c = 0; c < y; ++c) {
      var p = i[c];
      p.vertexBuffer ? u.push(p) : (o = v[a = p.usage], l(o) || (o = v[a] = []), o.push(p));
    }

    function h(e, t) {
      return d.getSizeInBytes(t.componentDatatype) - d.getSizeInBytes(e.componentDatatype);
    }

    for (a in this._allBuffers = [], v) {
      v.hasOwnProperty(a) && ((o = v[a]).sort(h), f = {
        vertexSizeInBytes: s = _._vertexSizeInBytes(o),
        vertexBuffer: void 0,
        usage: o[0].usage,
        needsCommit: !1,
        arrayBuffer: void 0,
        arrayViews: _._createArrayViews(o, s)
      }, this._allBuffers.push(f));
    }

    this._size = 0, this._instanced = B(n, !1), this._precreated = u, this._context = e, this.writers = void 0, this.va = void 0, this.resize(r);
  }

  _._verifyAttributes = function (e) {
    for (var t = [], r = 0; r < e.length; ++r) {
      var n = e[r],
          i = {
        index: B(n.index, r),
        enabled: B(n.enabled, !0),
        componentsPerAttribute: n.componentsPerAttribute,
        componentDatatype: B(n.componentDatatype, d.FLOAT),
        normalize: B(n.normalize, !1),
        vertexBuffer: n.vertexBuffer,
        usage: B(n.usage, u.STATIC_DRAW)
      };
      if (t.push(i), 1 !== i.componentsPerAttribute && 2 !== i.componentsPerAttribute && 3 !== i.componentsPerAttribute && 4 !== i.componentsPerAttribute) throw new x("attribute.componentsPerAttribute must be in the range [1, 4].");
      var o = i.componentDatatype;
      if (!d.validate(o)) throw new x("Attribute must have a valid componentDatatype or not specify it.");
      if (!u.validate(i.usage)) throw new x("Attribute must have a valid usage or not specify it.");
    }

    for (var a = new Array(t.length), s = 0; s < t.length; ++s) {
      var f = t[s].index;
      if (a[f]) throw new x("Index " + f + " is used by more than one attribute.");
      a[f] = !0;
    }

    return t;
  }, _._vertexSizeInBytes = function (e) {
    for (var t = 0, r = e.length, n = 0; n < r; ++n) {
      var i = e[n];
      t += i.componentsPerAttribute * d.getSizeInBytes(i.componentDatatype);
    }

    var o = 0 < r ? d.getSizeInBytes(e[0].componentDatatype) : 0,
        a = 0 < o ? t % o : 0;
    return t += 0 == a ? 0 : o - a;
  }, _._createArrayViews = function (e, t) {
    for (var r = [], n = 0, i = e.length, o = 0; o < i; ++o) {
      var a = e[o],
          s = a.componentDatatype;
      r.push({
        index: a.index,
        enabled: a.enabled,
        componentsPerAttribute: a.componentsPerAttribute,
        componentDatatype: s,
        normalize: a.normalize,
        offsetInBytes: n,
        vertexSizeInComponentType: t / d.getSizeInBytes(s),
        view: void 0
      }), n += a.componentsPerAttribute * d.getSizeInBytes(s);
    }

    return r;
  }, _.prototype.resize = function (e) {
    this._size = e;
    var t = this._allBuffers;
    this.writers = [];

    for (var r = 0, n = t.length; r < n; ++r) {
      var i = t[r];
      _._resize(i, this._size), _._appendWriters(this.writers, i);
    }

    h(this);
  }, _._resize = function (e, t) {
    if (0 < e.vertexSizeInBytes) {
      var r = new ArrayBuffer(t * e.vertexSizeInBytes);
      if (l(e.arrayBuffer)) for (var n = new Uint8Array(r), i = new Uint8Array(e.arrayBuffer), o = i.length, a = 0; a < o; ++a) {
        n[a] = i[a];
      }

      for (var s = e.arrayViews, f = s.length, u = 0; u < f; ++u) {
        var v = s[u];
        v.view = d.createArrayBufferView(v.componentDatatype, r, v.offsetInBytes);
      }

      e.arrayBuffer = r;
    }
  };
  var a = [function (r, n, i) {
    return function (e, t) {
      n[e * i] = t, r.needsCommit = !0;
    };
  }, function (i, o, a) {
    return function (e, t, r) {
      var n = e * a;
      o[n] = t, o[1 + n] = r, i.needsCommit = !0;
    };
  }, function (o, a, s) {
    return function (e, t, r, n) {
      var i = e * s;
      a[i] = t, a[1 + i] = r, a[2 + i] = n, o.needsCommit = !0;
    };
  }, function (a, s, f) {
    return function (e, t, r, n, i) {
      var o = e * f;
      s[o] = t, s[1 + o] = r, s[2 + o] = n, s[3 + o] = i, a.needsCommit = !0;
    };
  }];

  function h(e) {
    var t = e.va;

    if (l(t)) {
      for (var r = t.length, n = 0; n < r; ++n) {
        t[n].va.destroy();
      }

      e.va = void 0;
    }
  }

  return _._appendWriters = function (e, t) {
    for (var r = t.arrayViews, n = r.length, i = 0; i < n; ++i) {
      var o = r[i];
      e[o.index] = a[o.componentsPerAttribute - 1](t, o.view, o.vertexSizeInComponentType);
    }
  }, _.prototype.commit = function (e) {
    var t,
        r = !1,
        n = this._allBuffers;

    for (f = 0, u = n.length; f < u; ++f) {
      r = function (e, t) {
        if (t.needsCommit && 0 < t.vertexSizeInBytes) {
          t.needsCommit = !1;
          var r = t.vertexBuffer,
              n = e._size * t.vertexSizeInBytes,
              i = l(r);
          if (!i || r.sizeInBytes < n) return i && r.destroy(), t.vertexBuffer = c.createVertexBuffer({
            context: e._context,
            typedArray: t.arrayBuffer,
            usage: t.usage
          }), !(t.vertexBuffer.vertexArrayDestroyable = !1);
          t.vertexBuffer.copyFromArrayView(t.arrayBuffer);
        }

        return !1;
      }(this, t = n[f]) || r;
    }

    if (r || !l(this.va)) {
      h(this);

      for (var i = this.va = [], o = l(e) ? Math.ceil(this._size / (y.SIXTY_FOUR_KILOBYTES - 1)) : 1, a = 0; a < o; ++a) {
        for (var s = [], f = 0, u = n.length; f < u; ++f) {
          var v = a * ((t = n[f]).vertexSizeInBytes * (y.SIXTY_FOUR_KILOBYTES - 1));

          _._appendAttributes(s, t, v, this._instanced);
        }

        s = s.concat(this._precreated), i.push({
          va: new p({
            context: this._context,
            attributes: s,
            indexBuffer: e
          }),
          indicesCount: 1.5 * (a !== o - 1 ? y.SIXTY_FOUR_KILOBYTES - 1 : this._size % (y.SIXTY_FOUR_KILOBYTES - 1))
        });
      }
    }
  }, _._appendAttributes = function (e, t, r, n) {
    for (var i = t.arrayViews, o = i.length, a = 0; a < o; ++a) {
      var s = i[a];
      e.push({
        index: s.index,
        enabled: s.enabled,
        componentsPerAttribute: s.componentsPerAttribute,
        componentDatatype: s.componentDatatype,
        normalize: s.normalize,
        vertexBuffer: t.vertexBuffer,
        offsetInBytes: r + s.offsetInBytes,
        strideInBytes: t.vertexSizeInBytes,
        instanceDivisor: n ? 1 : 0
      });
    }
  }, _.prototype.subCommit = function (e, t) {
    if (e < 0 || e >= this._size) throw new x("offsetInVertices must be greater than or equal to zero and less than the vertex array size.");
    if (e + t > this._size) throw new x("offsetInVertices + lengthInVertices cannot exceed the vertex array size.");

    for (var r = this._allBuffers, n = 0, i = r.length; n < i; ++n) {
      !function (e, t, r) {
        {
          var n, i;
          e.needsCommit && 0 < e.vertexSizeInBytes && (n = e.vertexSizeInBytes * t, i = e.vertexSizeInBytes * r, e.vertexBuffer.copyFromArrayView(new Uint8Array(e.arrayBuffer, n, i), n));
        }
      }(r[n], e, t);
    }
  }, _.prototype.endSubCommits = function () {
    for (var e = this._allBuffers, t = 0, r = e.length; t < r; ++t) {
      e[t].needsCommit = !1;
    }
  }, _.prototype.isDestroyed = function () {
    return !1;
  }, _.prototype.destroy = function () {
    for (var e = this._allBuffers, t = 0, r = e.length; t < r; ++t) {
      var n = e[t];
      n.vertexBuffer = n.vertexBuffer && n.vertexBuffer.destroy();
    }

    return h(this), i(this);
  }, _;
});