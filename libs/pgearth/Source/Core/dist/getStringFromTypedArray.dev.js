"use strict";

define(["./defaultValue", "./defined", "./DeveloperError", "./RuntimeError"], function (t, o, i, a) {
  "use strict";

  function d(e, n, r) {
    if (!o(e)) throw new i("uint8Array is required.");
    if (n < 0) throw new i("byteOffset cannot be negative.");
    if (r < 0) throw new i("byteLength cannot be negative.");
    if (n + r > e.byteLength) throw new i("sub-region exceeds array bounds.");
    return n = t(n, 0), r = t(r, e.byteLength - n), e = e.subarray(n, n + r), d.decode(e);
  }

  function h(e, n, r) {
    return n <= e && e <= r;
  }

  return d.decodeWithTextDecoder = function (e) {
    return new TextDecoder("utf-8").decode(e);
  }, d.decodeWithFromCharCode = function (e) {
    for (var n = "", r = function (e) {
      for (var n = 0, r = 0, t = 0, o = 128, i = 191, d = [], u = e.length, f = 0; f < u; ++f) {
        var c = e[f];

        if (0 === t) {
          if (h(c, 0, 127)) {
            d.push(c);
            continue;
          }

          if (h(c, 194, 223)) {
            t = 1, n = 31 & c;
            continue;
          }

          if (h(c, 224, 239)) {
            224 === c && (o = 160), 237 === c && (i = 159), t = 2, n = 15 & c;
            continue;
          }

          if (h(c, 240, 244)) {
            240 === c && (o = 144), 244 === c && (i = 143), t = 3, n = 7 & c;
            continue;
          }

          throw new a("String decoding failed.");
        }

        h(c, o, i) ? (o = 128, i = 191, n = n << 6 | 63 & c, ++r === t && (d.push(n), n = t = r = 0)) : (n = t = r = 0, o = 128, i = 191, --f);
      }

      return d;
    }(e), t = r.length, o = 0; o < t; ++o) {
      var i = r[o];
      i <= 65535 ? n += String.fromCharCode(i) : (i -= 65536, n += String.fromCharCode(55296 + (i >> 10), 56320 + (1023 & i)));
    }

    return n;
  }, "undefined" != typeof TextDecoder ? d.decode = d.decodeWithTextDecoder : d.decode = d.decodeWithFromCharCode, d;
});