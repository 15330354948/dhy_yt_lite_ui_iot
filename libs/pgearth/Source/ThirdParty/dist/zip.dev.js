"use strict";

define(["../Core/buildModuleUrl", "../Core/defineProperties"], function (B, E) {
  var e = {};
  return function (b) {
    var o,
        e,
        g = "File format is not recognized.",
        a = "File contains encrypted entry.",
        c = "File is using Zip64 (4gb+ file size).",
        w = "Error while reading zip file.",
        t = "Error while reading file data.",
        d = 524288,
        M = "inflate.js",
        z = "deflate.js",
        f = "text/plain",
        A = "message";

    try {
      o = 0 === new Blob([new DataView(new ArrayBuffer(0))]).size;
    } catch (e) {}

    function S() {
      var i = -1,
          r = this;
      r.append = function (e) {
        for (var t = r.table, n = 0; n < e.length; n++) {
          i = i >>> 8 ^ t[255 & (i ^ e[n])];
        }
      }, r.get = function () {
        return ~i;
      };
    }

    function D(e, t) {
      var n = new ArrayBuffer(e),
          i = new Uint8Array(n);
      return t && i.set(t, 0), {
        buffer: n,
        array: i,
        view: new DataView(n)
      };
    }

    function n() {}

    function i(i) {
      var r,
          o = this;
      o.size = 0, o.init = function (e, t) {
        var n = new Blob([i], {
          type: f
        });
        (r = new s(n)).init(function () {
          o.size = r.size, e();
        }, t);
      }, o.readUint8Array = function (e, t, n, i) {
        r.readUint8Array(e, t, n, i);
      };
    }

    function r(s) {
      var u,
          n = this;
      n.size = 0, n.init = function (e) {
        for (var t = s.length; "=" == s.charAt(t - 1);) {
          t--;
        }

        u = s.indexOf(",") + 1, n.size = Math.floor(.75 * (t - u)), e();
      }, n.readUint8Array = function (e, t, n) {
        for (var i = D(t), r = 4 * Math.floor(e / 3), o = 4 * Math.ceil((e + t) / 3), a = window.atob(s.substring(r + u, o + u)), c = e - 3 * Math.floor(r / 4), f = c; f < c + t; f++) {
          i.array[f - c] = a.charCodeAt(f);
        }

        n(i.array);
      };
    }

    function s(f) {
      this.size = 0, this.init = function (e) {
        this.size = f.size, e();
      }, this.readUint8Array = function (e, t, n, i) {
        var r,
            o,
            a,
            c = new FileReader();
        c.onload = function (e) {
          n(new Uint8Array(e.target.result));
        }, c.onerror = i, c.readAsArrayBuffer((o = e, a = t, (r = f).slice ? r.slice(o, o + a) : r.webkitSlice ? r.webkitSlice(o, o + a) : r.mozSlice ? r.mozSlice(o, o + a) : r.msSlice ? r.msSlice(o, o + a) : void 0));
      };
    }

    function u() {}

    function l(i) {
      var r;
      this.init = function (e) {
        r = new Blob([], {
          type: f
        }), e();
      }, this.writeUint8Array = function (e, t) {
        r = new Blob([r, o ? e : e.buffer], {
          type: f
        }), t();
      }, this.getData = function (t, e) {
        var n = new FileReader();
        n.onload = function (e) {
          t(e.target.result);
        }, n.onerror = e, n.readAsText(r, i);
      };
    }

    function h(t) {
      var o = "",
          a = "";
      this.init = function (e) {
        o += "data:" + (t || "") + ";base64,", e();
      }, this.writeUint8Array = function (e, t) {
        var n,
            i = a.length,
            r = a;

        for (a = "", n = 0; n < 3 * Math.floor((i + e.length) / 3) - i; n++) {
          r += String.fromCharCode(e[n]);
        }

        for (; n < e.length; n++) {
          a += String.fromCharCode(e[n]);
        }

        2 < r.length ? o += window.btoa(r) : a = r, t();
      }, this.getData = function (e) {
        e(o + window.btoa(a));
      };
    }

    function v(n) {
      var i;
      this.init = function (e) {
        i = new Blob([], {
          type: n
        }), e();
      }, this.writeUint8Array = function (e, t) {
        i = new Blob([i, o ? e : e.buffer], {
          type: n
        }), t();
      }, this.getData = function (e) {
        e(i);
      };
    }

    function L(t, e, i, n, r, o, a, c, f, s) {
      var u,
          l,
          g = 0;

      function w() {
        t.removeEventListener(A, h, !1), c(l);
      }

      function h(e) {
        var t = e.data,
            n = t.data;
        t.onappend && (l += n.length, i.writeUint8Array(n, function () {
          o(!1, n), v();
        }, s)), t.onflush && (n ? (l += n.length, i.writeUint8Array(n, function () {
          o(!1, n), w();
        }, s)) : w()), t.progress && a && a(u + t.current, r);
      }

      function v() {
        (u = g * d) < r ? e.readUint8Array(n + u, Math.min(d, r - u), function (e) {
          t.postMessage({
            append: !0,
            data: e
          }), g++, a && a(u, r), o(!0, e);
        }, f) : t.postMessage({
          flush: !0
        });
      }

      l = 0, t.addEventListener(A, h, !1), v();
    }

    function F(i, t, r, o, a, c, f, s, u, l) {
      var g,
          w = 0,
          h = 0;
      !function n() {
        var e;
        (g = w * d) < a ? t.readUint8Array(o + g, Math.min(d, a - g), function (e) {
          var t = i.append(e, function () {
            f && f(o + g, a);
          });
          h += t.length, c(!0, e), r.writeUint8Array(t, function () {
            c(!1, t), w++, setTimeout(n, 1);
          }, l), f && f(g, a);
        }, u) : (e = i.flush()) ? (h += e.length, r.writeUint8Array(e, function () {
          c(!1, e), s(h);
        }, l)) : s(h);
      }();
    }

    function C(e, i, r, o, a, c, f, s, u) {
      var l = 0,
          g = new S();
      !function t() {
        var n = l * d;
        n < o ? e.readUint8Array(r + n, Math.min(d, o - n), function (e) {
          a && g.append(e), f && f(n, o, e), i.writeUint8Array(e, function () {
            l++, t();
          }, u);
        }, s) : c(o, g.get());
      }();
    }

    function p(e) {
      for (var t, n = "", i = ["Ç", "ü", "é", "â", "ä", "à", "å", "ç", "ê", "ë", "è", "ï", "î", "ì", "Ä", "Å", "É", "æ", "Æ", "ô", "ö", "ò", "û", "ù", "ÿ", "Ö", "Ü", "ø", "£", "Ø", "×", "ƒ", "á", "í", "ó", "ú", "ñ", "Ñ", "ª", "º", "¿", "®", "¬", "½", "¼", "¡", "«", "»", "_", "_", "_", "¦", "¦", "Á", "Â", "À", "©", "¦", "¦", "+", "+", "¢", "¥", "+", "+", "-", "-", "+", "-", "+", "ã", "Ã", "+", "+", "-", "-", "¦", "-", "+", "¤", "ð", "Ð", "Ê", "Ë", "È", "i", "Í", "Î", "Ï", "+", "+", "_", "_", "¦", "Ì", "_", "Ó", "ß", "Ô", "Ò", "õ", "Õ", "µ", "þ", "Þ", "Ú", "Û", "Ù", "ý", "Ý", "¯", "´", "­", "±", "_", "¾", "¶", "§", "÷", "¸", "°", "¨", "·", "¹", "³", "²", "_", " "], r = 0; r < e.length; r++) {
        n += 127 < (t = 255 & e.charCodeAt(r)) ? i[t - 128] : String.fromCharCode(t);
      }

      return n;
    }

    function y(e) {
      return decodeURIComponent(escape(e));
    }

    function U(e) {
      for (var t = "", n = 0; n < e.length; n++) {
        t += String.fromCharCode(e[n]);
      }

      return t;
    }

    function W(e, t, n, i, r) {
      e.version = t.view.getUint16(n, !0), e.bitFlag = t.view.getUint16(n + 2, !0), e.compressionMethod = t.view.getUint16(n + 4, !0), e.lastModDateRaw = t.view.getUint32(n + 6, !0), e.lastModDate = function (e) {
        var t = (4294901760 & e) >> 16,
            n = 65535 & e;

        try {
          return new Date(1980 + ((65024 & t) >> 9), ((480 & t) >> 5) - 1, 31 & t, (63488 & n) >> 11, (2016 & n) >> 5, 2 * (31 & n), 0);
        } catch (e) {}
      }(e.lastModDateRaw), 1 != (1 & e.bitFlag) ? (!i && 8 == (8 & e.bitFlag) || (e.crc32 = t.view.getUint32(n + 10, !0), e.compressedSize = t.view.getUint32(n + 14, !0), e.uncompressedSize = t.view.getUint32(n + 18, !0)), 4294967295 !== e.compressedSize && 4294967295 !== e.uncompressedSize ? (e.filenameLength = t.view.getUint16(n + 22, !0), e.extraFieldLength = t.view.getUint16(n + 24, !0)) : r(c)) : r(a);
    }

    function m(A, u) {
      function l() {}

      return l.prototype.getData = function (h, r, v, d) {
        var p,
            y = this;

        function o(e, t) {
          p && p.terminate(), p = null, e && e(t);
        }

        function U(e, t) {
          var n, i;
          d && (n = t, (i = D(4)).view.setUint32(0, n), y.crc32 != i.view.getUint32(0)) ? m() : h.getData(function (e) {
            o(r, e);
          });
        }

        function m() {
          o(u, t);
        }

        function z() {
          o(u, "Error while writing file data.");
        }

        A.readUint8Array(y.offset, 30, function (e) {
          var w,
              t = D(e.length, e);
          1347093252 == t.view.getUint32(0) ? (W(y, t, 4, !1, u), w = y.offset + 30 + y.filenameLength + y.extraFieldLength, h.init(function () {
            function e(e, t) {
              a && !e && g.append(t);
            }

            function t(e) {
              c(e, g.get());
            }

            var n, i, r, o, a, c, f, s, u, l, g;
            0 === y.compressionMethod ? C(A, h, w, y.compressedSize, d, U, v, m, z) : (n = A, i = h, r = w, o = y.compressedSize, a = d, c = U, f = v, s = m, u = z, g = new S(), b.zip.useWebWorkers ? L(l = new Worker(b.zip.workerScriptsPath + M), n, i, r, o, e, f, t, s, u) : F(new b.zip.Inflater(), n, i, r, o, e, f, t, s, u), p = l);
          }, z)) : u(g);
        }, m);
      }, {
        getEntries: function getEntries(s) {
          A.size < 22 ? u(g) : function n(i, r) {
            A.readUint8Array(A.size - i, i, function (e) {
              var t = D(e.length, e).view;
              1347093766 != t.getUint32(0) ? n(i + 1, r) : r(t);
            }, function () {
              u(w);
            });
          }(22, function (e) {
            var t = e.getUint32(16, !0),
                f = e.getUint16(8, !0);
            A.readUint8Array(t, A.size - t, function (e) {
              for (var t, n, i, r = 0, o = [], a = D(e.length, e), c = 0; c < f; c++) {
                if (t = new l(), 1347092738 != a.view.getUint32(r)) return void u(g);
                W(t, a, r + 6, !0, u), t.commentLength = a.view.getUint16(r + 32, !0), t.directory = 16 == (16 & a.view.getUint8(r + 38)), t.offset = a.view.getUint32(r + 42, !0), n = U(a.array.subarray(r + 46, r + 46 + t.filenameLength)), t.filename = (2048 == (2048 & t.bitFlag) ? y : p)(n), t.directory || "/" != t.filename.charAt(t.filename.length - 1) || (t.directory = !0), i = U(a.array.subarray(r + 46 + t.filenameLength + t.extraFieldLength, r + 46 + t.filenameLength + t.extraFieldLength + t.commentLength)), t.comment = (2048 == (2048 & t.bitFlag) ? y : p)(i), o.push(t), r += 46 + t.filenameLength + t.extraFieldLength + t.commentLength;
              }

              s(o);
            }, function () {
              u(w);
            });
          });
        },
        close: function close(e) {
          e && e();
        }
      };
    }

    function R(e) {
      return unescape(encodeURIComponent(e));
    }

    function k(e) {
      for (var t = [], n = 0; n < e.length; n++) {
        t.push(e.charCodeAt(n));
      }

      return t;
    }

    function x(v, c, d) {
      var p,
          f = {},
          s = [],
          u = 0;

      function y(e, t) {
        p && p.terminate(), p = null, e && e(t);
      }

      function U() {
        y(c, "Error while writing zip file.");
      }

      function m() {
        y(c, t);
      }

      return {
        add: function add(n, l, i, g, w) {
          var r, o, a;

          function h(e, t) {
            var n = D(16);
            u += e || 0, n.view.setUint32(0, 1347094280), void 0 !== t && (r.view.setUint32(10, t, !0), n.view.setUint32(4, t, !0)), l && (n.view.setUint32(8, e, !0), r.view.setUint32(14, e, !0), n.view.setUint32(12, l.size, !0), r.view.setUint32(18, l.size, !0)), v.writeUint8Array(n.array, function () {
              u += 16, y(i);
            }, U);
          }

          function e() {
            var e, t;
            w = w || {}, n = n.trim(), w.directory && "/" != n.charAt(n.length - 1) && (n += "/"), f.hasOwnProperty(n) ? c("File already exists.") : (o = k(R(n)), s.push(n), e = function e() {
              function t(e, t) {
                e && u.append(t);
              }

              function n(e) {
                o(e, u.get());
              }

              var i, r, e, o, a, c, f, s, u;
              l ? d || 0 === w.level ? C(l, v, 0, l.size, !0, h, g, m, U) : (i = l, r = v, e = w.level, o = h, a = g, c = m, f = U, u = new S(), b.zip.useWebWorkers ? ((s = new Worker(b.zip.workerScriptsPath + z)).addEventListener(A, function e() {
                s.removeEventListener(A, e, !1), L(s, i, r, 0, i.size, t, a, n, c, f);
              }, !1), s.postMessage({
                init: !0,
                level: e
              })) : F(new b.zip.Deflater(), i, r, 0, i.size, t, a, n, c, f), p = s) : h();
            }, a = w.lastModDate || new Date(), r = D(26), f[n] = {
              headerArray: r.array,
              directory: w.directory,
              filename: o,
              offset: u,
              comment: k(R(w.comment || ""))
            }, r.view.setUint32(0, 335546376), w.version && r.view.setUint8(0, w.version), d || 0 === w.level || w.directory || r.view.setUint16(4, 2048), r.view.setUint16(6, (a.getHours() << 6 | a.getMinutes()) << 5 | a.getSeconds() / 2, !0), r.view.setUint16(8, (a.getFullYear() - 1980 << 4 | a.getMonth() + 1) << 5 | a.getDate(), !0), r.view.setUint16(22, o.length, !0), (t = D(30 + o.length)).view.setUint32(0, 1347093252), t.array.set(r.array, 4), t.array.set(o, 30), u += t.array.length, v.writeUint8Array(t.array, e, U));
          }

          l ? l.init(e, m) : e();
        },
        close: function close(e) {
          for (var t, n, i = 0, r = 0, o = 0; o < s.length; o++) {
            i += 46 + (n = f[s[o]]).filename.length + n.comment.length;
          }

          for (t = D(i + 22), o = 0; o < s.length; o++) {
            n = f[s[o]], t.view.setUint32(r, 1347092738), t.view.setUint16(r + 4, 5120), t.array.set(n.headerArray, r + 6), t.view.setUint16(r + 32, n.comment.length, !0), n.directory && t.view.setUint8(r + 38, 16), t.view.setUint32(r + 42, n.offset, !0), t.array.set(n.filename, r + 46), t.array.set(n.comment, r + 46 + n.filename.length), r += 46 + n.filename.length + n.comment.length;
          }

          t.view.setUint32(r, 1347093766), t.view.setUint16(r + 8, s.length, !0), t.view.setUint16(r + 10, s.length, !0), t.view.setUint32(r + 12, i, !0), t.view.setUint32(r + 16, u, !0), v.writeUint8Array(t.array, function () {
            y(function () {
              v.getData(e);
            });
          }, U);
        }
      };
    }

    S.prototype.table = function () {
      for (var e, t, n = [], i = 0; i < 256; i++) {
        for (t = i, e = 0; e < 8; e++) {
          1 & t ? t = t >>> 1 ^ 3988292384 : t >>>= 1;
        }

        n[i] = t;
      }

      return n;
    }(), (i.prototype = new n()).constructor = i, (r.prototype = new n()).constructor = r, (s.prototype = new n()).constructor = s, u.prototype.getData = function (e) {
      e(this.data);
    }, (l.prototype = new u()).constructor = l, (h.prototype = new u()).constructor = h, (v.prototype = new u()).constructor = v, b.zip = {
      Reader: n,
      Writer: u,
      BlobReader: s,
      Data64URIReader: r,
      TextReader: i,
      BlobWriter: v,
      Data64URIWriter: h,
      TextWriter: l,
      createReader: function createReader(e, t, n) {
        e.init(function () {
          t(m(e, n));
        }, n);
      },
      createWriter: function createWriter(e, t, n, i) {
        e.init(function () {
          t(x(e, n, i));
        }, n);
      },
      useWebWorkers: !0
    }, E(b.zip, {
      workerScriptsPath: {
        get: function get() {
          return void 0 === e && (e = B("ThirdParty/Workers/")), e;
        }
      }
    });
  }(e), e.zip;
});