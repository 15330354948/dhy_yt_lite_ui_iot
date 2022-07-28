"use strict";

define(["../ThirdParty/when", "./Check", "./CompressedTextureBuffer", "./defined", "./PixelFormat", "./Resource", "./RuntimeError", "./WebGLConstants"], function (t, n, z, C, O, i, D, E) {
  "use strict";

  var N = [171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10],
      S = 67305985,
      V = ["positiveX", "negativeX", "positiveY", "negativeY", "positiveZ", "negativeZ"],
      X = 4;
  return function (e) {
    var r;
    if (n.defined("resourceOrUrlOrBuffer", e), r = e instanceof ArrayBuffer || ArrayBuffer.isView(e) ? t.resolve(e) : i.createIfNeeded(e).fetchArrayBuffer(), C(r)) return r.then(function (e) {
      if (C(e)) return function (e) {
        var r,
            t,
            n,
            i = new Uint8Array(e),
            a = !0;

        for (r = 0; r < N.length; ++r) {
          if (N[r] !== i[r]) {
            a = !1;
            break;
          }
        }

        if (!a) throw new D("Invalid KTX file.");
        n = C(e.buffer) ? (t = new DataView(e.buffer), e.byteOffset) : (t = new DataView(e), 0);
        n += 12;
        var f = t.getUint32(n, !0);
        if (n += X, f !== S) throw new D("File is the wrong endianness.");
        var s = t.getUint32(n, !0);
        n += X;
        var o = t.getUint32(n, !0);
        n += X;
        var u = t.getUint32(n, !0);
        n += X;
        var w = t.getUint32(n, !0);
        n += X;
        var v = t.getUint32(n, !0);
        n += X;
        var h = t.getUint32(n, !0);
        n += X;
        var d = t.getUint32(n, !0);
        n += X;
        var g = t.getUint32(n, !0);
        n += X;
        var m = t.getUint32(n, !0);
        n += X;
        var U = t.getUint32(n, !0);
        n += X;
        var p = t.getUint32(n, !0);
        n += X;
        var y = t.getUint32(n, !0);
        n += X, n += y;
        var b,
            c = t.getUint32(n, !0);
        n += X, b = C(e.buffer) ? new Uint8Array(e.buffer, n, c) : new Uint8Array(e, n, c);
        w === E.RGB8 ? w = O.RGB : w === E.RGBA8 && (w = O.RGBA);
        if (!O.validate(w)) throw new D("glInternalFormat is not a valid format.");

        if (O.isCompressedFormat(w)) {
          if (0 !== s) throw new D("glType must be zero when the texture is compressed.");
          if (1 !== o) throw new D("The type size for compressed textures must be 1.");
          if (0 !== u) throw new D("glFormat must be zero when the texture is compressed.");
        } else {
          if (s !== E.UNSIGNED_BYTE) throw new D("Only unsigned byte buffers are supported.");
          if (v !== u) throw new D("The base internal format must be the same as the format for uncompressed textures.");
        }

        if (0 !== g) throw new D("3D textures are unsupported.");
        if (0 !== m) throw new D("Texture arrays are unsupported.");
        var l = b.byteOffset,
            B = new Array(p);

        for (r = 0; r < p; ++r) {
          for (var x = B[r] = {}, A = 0; A < U; ++A) {
            var T = h >> r,
                F = d >> r,
                G = O.isCompressedFormat(w) ? O.compressedTextureSizeInBytes(w, T, F) : O.textureSizeInBytes(w, s, T, F),
                I = new Uint8Array(b.buffer, l, G);
            x[V[A]] = new z(w, T, F, I), l += G;
          }

          l += 3 - (l + 3) % 4 + 4;
        }

        var R = B;
        if (1 === U) for (r = 0; r < p; ++r) {
          R[r] = R[r][V[0]];
        }
        1 === p && (R = R[0]);
        return R;
      }(e);
    });
  };
});