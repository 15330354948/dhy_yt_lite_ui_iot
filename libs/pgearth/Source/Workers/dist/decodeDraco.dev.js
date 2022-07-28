"use strict";

define(["../Core/ComponentDatatype", "../Core/defined", "../Core/IndexDatatype", "../Core/RuntimeError", "./createTaskProcessorWorker"], function (f, A, l, w, r) {
  "use strict";

  var b;

  function m(e, r, t) {
    var n,
        o = e.num_points(),
        a = t.num_components(),
        i = new b.AttributeQuantizationTransform();

    if (i.InitFromAttribute(t)) {
      for (var s = new Array(a), u = 0; u < a; ++u) {
        s[u] = i.min_value(u);
      }

      n = {
        quantizationBits: i.quantization_bits(),
        minValues: s,
        range: i.range(),
        octEncoded: !1
      };
    }

    b.destroy(i), (i = new b.AttributeOctahedronTransform()).InitFromAttribute(t) && (n = {
      quantizationBits: i.quantization_bits(),
      octEncoded: !0
    }), b.destroy(i);
    var c = o * a,
        y = A(n) ? function (e, r, t, n, o) {
      var a, i;
      n.quantizationBits <= 8 ? (i = new b.DracoUInt8Array(), a = new Uint8Array(o), r.GetAttributeUInt8ForAllPoints(e, t, i)) : (i = new b.DracoUInt16Array(), a = new Uint16Array(o), r.GetAttributeUInt16ForAllPoints(e, t, i));

      for (var s = 0; s < o; ++s) {
        a[s] = i.GetValue(s);
      }

      return b.destroy(i), a;
    }(e, r, t, n, c) : function (e, r, t, n) {
      var o, a;

      switch (t.data_type()) {
        case 1:
        case 11:
          a = new b.DracoInt8Array(), o = new Int8Array(n), r.GetAttributeInt8ForAllPoints(e, t, a);
          break;

        case 2:
          a = new b.DracoUInt8Array(), o = new Uint8Array(n), r.GetAttributeUInt8ForAllPoints(e, t, a);
          break;

        case 3:
          a = new b.DracoInt16Array(), o = new Int16Array(n), r.GetAttributeInt16ForAllPoints(e, t, a);
          break;

        case 4:
          a = new b.DracoUInt16Array(), o = new Uint16Array(n), r.GetAttributeUInt16ForAllPoints(e, t, a);
          break;

        case 5:
        case 7:
          a = new b.DracoInt32Array(), o = new Int32Array(n), r.GetAttributeInt32ForAllPoints(e, t, a);
          break;

        case 6:
        case 8:
          a = new b.DracoUInt32Array(), o = new Uint32Array(n), r.GetAttributeUInt32ForAllPoints(e, t, a);
          break;

        case 9:
        case 10:
          a = new b.DracoFloat32Array(), o = new Float32Array(n), r.GetAttributeFloatForAllPoints(e, t, a);
      }

      for (var i = 0; i < n; ++i) {
        o[i] = a.GetValue(i);
      }

      return b.destroy(a), o;
    }(e, r, t, c),
        d = f.fromTypedArray(y);
    return {
      array: y,
      data: {
        componentsPerAttribute: a,
        componentDatatype: d,
        byteOffset: t.byte_offset(),
        byteStride: f.getSizeInBytes(d) * a,
        normalized: t.normalized(),
        quantization: n
      }
    };
  }

  function t(e) {
    var r = new b.Decoder(),
        t = ["POSITION", "NORMAL", "COLOR", "TEX_COORD"];
    if (e.dequantizeInShader) for (var n = 0; n < t.length; ++n) {
      r.SkipAttributeTransform(b[t[n]]);
    }
    var o = e.bufferView,
        a = new b.DecoderBuffer();
    if (a.Init(e.array, o.byteLength), r.GetEncodedGeometryType(a) !== b.TRIANGULAR_MESH) throw new w("Unsupported draco mesh geometry type.");
    var i = new b.Mesh(),
        s = r.DecodeBufferToMesh(a, i);
    if (!s.ok() || 0 === i.ptr) throw new w("Error decoding draco mesh geometry: " + s.error_msg());
    b.destroy(a);
    var u,
        c,
        y = {},
        d = e.compressedAttributes;

    for (var f in d) {
      d.hasOwnProperty(f) && (u = d[f], c = r.GetAttributeByUniqueId(i, u), y[f] = m(i, r, c));
    }

    var A = {
      indexArray: function (e, r) {
        for (var t = e.num_points(), n = e.num_faces(), o = new b.DracoInt32Array(), a = 3 * n, i = l.createTypedArray(t, a), s = 0, u = 0; u < n; ++u) {
          r.GetFaceFromMesh(e, u, o), i[s + 0] = o.GetValue(0), i[s + 1] = o.GetValue(1), i[s + 2] = o.GetValue(2), s += 3;
        }

        return b.destroy(o), {
          typedArray: i,
          numberOfIndices: a
        };
      }(i, r),
      attributeData: y
    };
    return b.destroy(i), b.destroy(r), A;
  }

  function n(e) {
    return (A(e.primitive) ? t : function (e) {
      var r = new b.Decoder();
      e.dequantizeInShader && (r.SkipAttributeTransform(b.POSITION), r.SkipAttributeTransform(b.NORMAL));
      var t = new b.DecoderBuffer();
      if (t.Init(e.buffer, e.buffer.length), r.GetEncodedGeometryType(t) !== b.POINT_CLOUD) throw new w("Draco geometry type must be POINT_CLOUD.");
      var n = new b.PointCloud(),
          o = r.DecodeBufferToPointCloud(t, n);
      if (!o.ok() || 0 === n.ptr) throw new w("Error decoding draco point cloud: " + o.error_msg());
      b.destroy(t);
      var a,
          i,
          s = {},
          u = e.properties;

      for (var c in u) {
        u.hasOwnProperty(c) && (a = u[c], i = r.GetAttributeByUniqueId(n, a), s[c] = m(n, r, i));
      }

      return b.destroy(n), b.destroy(r), s;
    })(e);
  }

  function o(e) {
    b = e, self.onmessage = r(n), self.postMessage(!0);
  }

  return function (e) {
    var r = e.data.webAssemblyConfig;
    if (A(r)) return require([r.modulePath], function (e) {
      A(r.wasmBinaryFile) ? (A(e) || (e = self.DracoDecoderModule), e(r).then(function (e) {
        o(e);
      })) : o(e());
    });
  };
});