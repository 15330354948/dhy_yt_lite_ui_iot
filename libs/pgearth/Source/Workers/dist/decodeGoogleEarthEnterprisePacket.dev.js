"use strict";

define(["../Core/decodeGoogleEarthEnterpriseData", "../Core/GoogleEarthEnterpriseTileInformation", "../Core/RuntimeError", "../ThirdParty/pako_inflate", "./createTaskProcessorWorker"], function (o, y, k, f, r) {
  "use strict";

  var m = Uint16Array.BYTES_PER_ELEMENT,
      M = Int32Array.BYTES_PER_ELEMENT,
      O = Uint32Array.BYTES_PER_ELEMENT,
      v = {
    METADATA: 0,
    TERRAIN: 1,
    DBROOT: 2
  };

  v.fromString = function (r) {
    return "Metadata" === r ? v.METADATA : "Terrain" === r ? v.TERRAIN : "DbRoot" === r ? v.DBROOT : void 0;
  };

  var S = 32301;
  var u = 1953029805,
      s = 2917034100;
  return r(function (r, e) {
    var t = v.fromString(r.type),
        n = r.buffer;
    o(r.key, n);

    var a = function (r) {
      var e = new DataView(r),
          t = 0,
          n = e.getUint32(t, !0);
      if (t += O, n !== u && n !== s) throw new k("Invalid magic");
      var a = e.getUint32(t, n === u);
      t += O;
      var i = new Uint8Array(r, t),
          o = f.inflate(i);
      if (o.length === a) return o;
      throw new k("Size of packet doesn't match header");
    }(n),
        n = a.buffer,
        i = a.length;

    switch (t) {
      case v.METADATA:
        return function (r, e, t) {
          var n = new DataView(r),
              a = 0,
              i = n.getUint32(a, !0);
          if (a += O, i !== S) throw new k("Invalid magic");
          var o = n.getUint32(a, !0);
          if (a += O, 1 !== o) throw new k("Invalid data type. Must be 1 for QuadTreePacket");
          var f = n.getUint32(a, !0);
          if (a += O, 2 !== f) throw new k("Invalid QuadTreePacket version. Only version 2 is supported.");
          var v = n.getInt32(a, !0);
          a += M;
          var u = n.getInt32(a, !0);
          if (a += M, 32 !== u) throw new k("Invalid instance size.");
          var s = n.getInt32(a, !0);
          a += M;
          var c = n.getInt32(a, !0);
          a += M;
          var g = n.getInt32(a, !0);
          if (s !== v * u + (a += M)) throw new k("Invalid dataBufferOffset");
          if (s + c + g !== e) throw new k("Invalid packet offsets");

          for (var E = [], l = 0; l < v; ++l) {
            var w = n.getUint8(a);
            ++a, ++a;
            var T = n.getUint16(a, !0);
            a += m;
            var d = n.getUint16(a, !0);
            a += m;
            var h = n.getUint16(a, !0);
            a += m, a += m, a += m, a += M, a += M, a += 8;
            var I = n.getUint8(a++),
                A = n.getUint8(a++);
            a += m, E.push(new y(w, T, d, h, I, A));
          }

          var U = [],
              R = 0;
          var p = 0,
              D = E[R++];
          "" === t ? ++p : U[t] = D;
          return function r(e, t, n) {
            var a = !1;

            if (4 === n) {
              if (t.hasSubtree()) return;
              a = !0;
            }

            for (var i = 0; i < 4; ++i) {
              var o = e + i.toString();
              if (a) U[o] = null;else if (n < 4) if (t.hasChild(i)) {
                if (R === v) return void console.log("Incorrect number of instances");
                var f = E[R++];
                U[o] = f, r(o, f, n + 1);
              } else U[o] = null;
            }
          }(t, D, p), U;
        }(n, i, r.quadKey);

      case v.TERRAIN:
        return function (r, e, t) {
          var n = new DataView(r),
              a = 0,
              i = [];

          for (; a < e;) {
            for (var o = a, f = 0; f < 4; ++f) {
              var v = n.getUint32(a, !0);
              a += O, a += v;
            }

            var u = r.slice(o, a);
            t.push(u), i.push(u);
          }

          return i;
        }(n, i, e);

      case v.DBROOT:
        return e.push(n), {
          buffer: n
        };
    }
  });
});