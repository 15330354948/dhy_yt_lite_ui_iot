"use strict";

define(["./Check", "./defaultValue", "./defined", "./FeatureDetection", "./freezeObject", "./Math"], function (F, S, u, r, o, A) {
  "use strict";

  function E(r, o, e) {
    return e < 0 && (e += 1), 1 < e && --e, 6 * e < 1 ? r + 6 * (o - r) * e : 2 * e < 1 ? o : 3 * e < 2 ? r + (o - r) * (2 / 3 - e) * 6 : r;
  }

  function p(r, o, e, t) {
    this.red = S(r, 1), this.green = S(o, 1), this.blue = S(e, 1), this.alpha = S(t, 1);
  }

  var e, t, s;
  p.fromCartesian4 = function (r, o) {
    return F.typeOf.object("cartesian", r), u(o) ? (o.red = r.x, o.green = r.y, o.blue = r.z, o.alpha = r.w, o) : new p(r.x, r.y, r.z, r.w);
  }, p.fromBytes = function (r, o, e, t, s) {
    return r = p.byteToFloat(S(r, 255)), o = p.byteToFloat(S(o, 255)), e = p.byteToFloat(S(e, 255)), t = p.byteToFloat(S(t, 255)), u(s) ? (s.red = r, s.green = o, s.blue = e, s.alpha = t, s) : new p(r, o, e, t);
  }, p.fromAlpha = function (r, o, e) {
    return F.typeOf.object("color", r), F.typeOf.number("alpha", o), u(e) ? (e.red = r.red, e.green = r.green, e.blue = r.blue, e.alpha = o, e) : new p(r.red, r.green, r.blue, o);
  }, r.supportsTypedArrays() && (e = new ArrayBuffer(4), t = new Uint32Array(e), s = new Uint8Array(e)), p.fromRgba = function (r, o) {
    return t[0] = r, p.fromBytes(s[0], s[1], s[2], s[3], o);
  }, p.fromHsl = function (r, o, e, t, s) {
    r = S(r, 0) % 1, o = S(o, 0), e = S(e, 0), t = S(t, 1);
    var n,
        C,
        l = e,
        i = e,
        f = e;
    return 0 !== o && (l = E(C = 2 * e - (n = e < .5 ? e * (1 + o) : e + o - e * o), n, r + 1 / 3), i = E(C, n, r), f = E(C, n, r - 1 / 3)), u(s) ? (s.red = l, s.green = i, s.blue = f, s.alpha = t, s) : new p(l, i, f, t);
  }, p.fromRandom = function (r, o) {
    var e,
        t,
        s = (r = S(r, S.EMPTY_OBJECT)).red;
    u(s) || (e = S(r.minimumRed, 0), t = S(r.maximumRed, 1), F.typeOf.number.lessThanOrEquals("minimumRed", e, t), s = e + A.nextRandomNumber() * (t - e));
    var n,
        C,
        l = r.green;
    u(l) || (n = S(r.minimumGreen, 0), C = S(r.maximumGreen, 1), F.typeOf.number.lessThanOrEquals("minimumGreen", n, C), l = n + A.nextRandomNumber() * (C - n));
    var i,
        f,
        E = r.blue;
    u(E) || (i = S(r.minimumBlue, 0), f = S(r.maximumBlue, 1), F.typeOf.number.lessThanOrEquals("minimumBlue", i, f), E = i + A.nextRandomNumber() * (f - i));
    var a,
        m,
        g = r.alpha;
    return u(g) || (a = S(r.minimumAlpha, 0), m = S(r.maximumAlpha, 1), F.typeOf.number.lessThanOrEquals("minumumAlpha", a, m), g = a + A.nextRandomNumber() * (m - a)), u(o) ? (o.red = s, o.green = l, o.blue = E, o.alpha = g, o) : new p(s, l, E, g);
  };
  var n = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i,
      C = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,
      l = /^rgba?\(\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)(?:\s*,\s*([0-9.]+))?\s*\)$/i,
      i = /^hsla?\(\s*([0-9.]+)\s*,\s*([0-9.]+%)\s*,\s*([0-9.]+%)(?:\s*,\s*([0-9.]+))?\s*\)$/i;
  return p.fromCssColorString = function (r, o) {
    F.typeOf.string("color", r), u(o) || (o = new p());
    var e = p[r.toUpperCase()];
    if (u(e)) return p.clone(e, o), o;
    var t = n.exec(r);
    return null !== t ? (o.red = parseInt(t[1], 16) / 15, o.green = parseInt(t[2], 16) / 15, o.blue = parseInt(t[3], 16) / 15, o.alpha = 1, o) : null !== (t = C.exec(r)) ? (o.red = parseInt(t[1], 16) / 255, o.green = parseInt(t[2], 16) / 255, o.blue = parseInt(t[3], 16) / 255, o.alpha = 1, o) : null !== (t = l.exec(r)) ? (o.red = parseFloat(t[1]) / ("%" === t[1].substr(-1) ? 100 : 255), o.green = parseFloat(t[2]) / ("%" === t[2].substr(-1) ? 100 : 255), o.blue = parseFloat(t[3]) / ("%" === t[3].substr(-1) ? 100 : 255), o.alpha = parseFloat(S(t[4], "1.0")), o) : null !== (t = i.exec(r)) ? p.fromHsl(parseFloat(t[1]) / 360, parseFloat(t[2]) / 100, parseFloat(t[3]) / 100, parseFloat(S(t[4], "1.0")), o) : o = void 0;
  }, p.packedLength = 4, p.pack = function (r, o, e) {
    return F.typeOf.object("value", r), F.defined("array", o), e = S(e, 0), o[e++] = r.red, o[e++] = r.green, o[e++] = r.blue, o[e] = r.alpha, o;
  }, p.unpack = function (r, o, e) {
    return F.defined("array", r), o = S(o, 0), u(e) || (e = new p()), e.red = r[o++], e.green = r[o++], e.blue = r[o++], e.alpha = r[o], e;
  }, p.byteToFloat = function (r) {
    return r / 255;
  }, p.floatToByte = function (r) {
    return 1 === r ? 255 : 256 * r | 0;
  }, p.clone = function (r, o) {
    if (u(r)) return u(o) ? (o.red = r.red, o.green = r.green, o.blue = r.blue, o.alpha = r.alpha, o) : new p(r.red, r.green, r.blue, r.alpha);
  }, p.equals = function (r, o) {
    return r === o || u(r) && u(o) && r.red === o.red && r.green === o.green && r.blue === o.blue && r.alpha === o.alpha;
  }, p.equalsArray = function (r, o, e) {
    return r.red === o[e] && r.green === o[e + 1] && r.blue === o[e + 2] && r.alpha === o[e + 3];
  }, p.prototype.clone = function (r) {
    return p.clone(this, r);
  }, p.prototype.equals = function (r) {
    return p.equals(this, r);
  }, p.prototype.equalsEpsilon = function (r, o) {
    return this === r || u(r) && Math.abs(this.red - r.red) <= o && Math.abs(this.green - r.green) <= o && Math.abs(this.blue - r.blue) <= o && Math.abs(this.alpha - r.alpha) <= o;
  }, p.prototype.toString = function () {
    return "(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
  }, p.prototype.toCssColorString = function () {
    var r = p.floatToByte(this.red),
        o = p.floatToByte(this.green),
        e = p.floatToByte(this.blue);
    return 1 === this.alpha ? "rgb(" + r + "," + o + "," + e + ")" : "rgba(" + r + "," + o + "," + e + "," + this.alpha + ")";
  }, p.prototype.toBytes = function (r) {
    var o = p.floatToByte(this.red),
        e = p.floatToByte(this.green),
        t = p.floatToByte(this.blue),
        s = p.floatToByte(this.alpha);
    return u(r) ? (r[0] = o, r[1] = e, r[2] = t, r[3] = s, r) : [o, e, t, s];
  }, p.prototype.toRgba = function () {
    return s[0] = p.floatToByte(this.red), s[1] = p.floatToByte(this.green), s[2] = p.floatToByte(this.blue), s[3] = p.floatToByte(this.alpha), t[0];
  }, p.prototype.brighten = function (r, o) {
    return F.typeOf.number("magnitude", r), F.typeOf.number.greaterThanOrEquals("magnitude", r, 0), F.typeOf.object("result", o), r = 1 - r, o.red = 1 - (1 - this.red) * r, o.green = 1 - (1 - this.green) * r, o.blue = 1 - (1 - this.blue) * r, o.alpha = this.alpha, o;
  }, p.prototype.darken = function (r, o) {
    return F.typeOf.number("magnitude", r), F.typeOf.number.greaterThanOrEquals("magnitude", r, 0), F.typeOf.object("result", o), r = 1 - r, o.red = this.red * r, o.green = this.green * r, o.blue = this.blue * r, o.alpha = this.alpha, o;
  }, p.prototype.withAlpha = function (r, o) {
    return p.fromAlpha(this, r, o);
  }, p.add = function (r, o, e) {
    return F.typeOf.object("left", r), F.typeOf.object("right", o), F.typeOf.object("result", e), e.red = r.red + o.red, e.green = r.green + o.green, e.blue = r.blue + o.blue, e.alpha = r.alpha + o.alpha, e;
  }, p.subtract = function (r, o, e) {
    return F.typeOf.object("left", r), F.typeOf.object("right", o), F.typeOf.object("result", e), e.red = r.red - o.red, e.green = r.green - o.green, e.blue = r.blue - o.blue, e.alpha = r.alpha - o.alpha, e;
  }, p.multiply = function (r, o, e) {
    return F.typeOf.object("left", r), F.typeOf.object("right", o), F.typeOf.object("result", e), e.red = r.red * o.red, e.green = r.green * o.green, e.blue = r.blue * o.blue, e.alpha = r.alpha * o.alpha, e;
  }, p.divide = function (r, o, e) {
    return F.typeOf.object("left", r), F.typeOf.object("right", o), F.typeOf.object("result", e), e.red = r.red / o.red, e.green = r.green / o.green, e.blue = r.blue / o.blue, e.alpha = r.alpha / o.alpha, e;
  }, p.mod = function (r, o, e) {
    return F.typeOf.object("left", r), F.typeOf.object("right", o), F.typeOf.object("result", e), e.red = r.red % o.red, e.green = r.green % o.green, e.blue = r.blue % o.blue, e.alpha = r.alpha % o.alpha, e;
  }, p.multiplyByScalar = function (r, o, e) {
    return F.typeOf.object("color", r), F.typeOf.number("scalar", o), F.typeOf.object("result", e), e.red = r.red * o, e.green = r.green * o, e.blue = r.blue * o, e.alpha = r.alpha * o, e;
  }, p.divideByScalar = function (r, o, e) {
    return F.typeOf.object("color", r), F.typeOf.number("scalar", o), F.typeOf.object("result", e), e.red = r.red / o, e.green = r.green / o, e.blue = r.blue / o, e.alpha = r.alpha / o, e;
  }, p.ALICEBLUE = o(p.fromCssColorString("#F0F8FF")), p.ANTIQUEWHITE = o(p.fromCssColorString("#FAEBD7")), p.AQUA = o(p.fromCssColorString("#00FFFF")), p.AQUAMARINE = o(p.fromCssColorString("#7FFFD4")), p.AZURE = o(p.fromCssColorString("#F0FFFF")), p.BEIGE = o(p.fromCssColorString("#F5F5DC")), p.BISQUE = o(p.fromCssColorString("#FFE4C4")), p.BLACK = o(p.fromCssColorString("#000000")), p.BLANCHEDALMOND = o(p.fromCssColorString("#FFEBCD")), p.BLUE = o(p.fromCssColorString("#0000FF")), p.BLUEVIOLET = o(p.fromCssColorString("#8A2BE2")), p.BROWN = o(p.fromCssColorString("#A52A2A")), p.BURLYWOOD = o(p.fromCssColorString("#DEB887")), p.CADETBLUE = o(p.fromCssColorString("#5F9EA0")), p.CHARTREUSE = o(p.fromCssColorString("#7FFF00")), p.CHOCOLATE = o(p.fromCssColorString("#D2691E")), p.CORAL = o(p.fromCssColorString("#FF7F50")), p.CORNFLOWERBLUE = o(p.fromCssColorString("#6495ED")), p.CORNSILK = o(p.fromCssColorString("#FFF8DC")), p.CRIMSON = o(p.fromCssColorString("#DC143C")), p.CYAN = o(p.fromCssColorString("#00FFFF")), p.DARKBLUE = o(p.fromCssColorString("#00008B")), p.DARKCYAN = o(p.fromCssColorString("#008B8B")), p.DARKGOLDENROD = o(p.fromCssColorString("#B8860B")), p.DARKGRAY = o(p.fromCssColorString("#A9A9A9")), p.DARKGREEN = o(p.fromCssColorString("#006400")), p.DARKGREY = p.DARKGRAY, p.DARKKHAKI = o(p.fromCssColorString("#BDB76B")), p.DARKMAGENTA = o(p.fromCssColorString("#8B008B")), p.DARKOLIVEGREEN = o(p.fromCssColorString("#556B2F")), p.DARKORANGE = o(p.fromCssColorString("#FF8C00")), p.DARKORCHID = o(p.fromCssColorString("#9932CC")), p.DARKRED = o(p.fromCssColorString("#8B0000")), p.DARKSALMON = o(p.fromCssColorString("#E9967A")), p.DARKSEAGREEN = o(p.fromCssColorString("#8FBC8F")), p.DARKSLATEBLUE = o(p.fromCssColorString("#483D8B")), p.DARKSLATEGRAY = o(p.fromCssColorString("#2F4F4F")), p.DARKSLATEGREY = p.DARKSLATEGRAY, p.DARKTURQUOISE = o(p.fromCssColorString("#00CED1")), p.DARKVIOLET = o(p.fromCssColorString("#9400D3")), p.DEEPPINK = o(p.fromCssColorString("#FF1493")), p.DEEPSKYBLUE = o(p.fromCssColorString("#00BFFF")), p.DIMGRAY = o(p.fromCssColorString("#696969")), p.DIMGREY = p.DIMGRAY, p.DODGERBLUE = o(p.fromCssColorString("#1E90FF")), p.FIREBRICK = o(p.fromCssColorString("#B22222")), p.FLORALWHITE = o(p.fromCssColorString("#FFFAF0")), p.FORESTGREEN = o(p.fromCssColorString("#228B22")), p.FUCHSIA = o(p.fromCssColorString("#FF00FF")), p.GAINSBORO = o(p.fromCssColorString("#DCDCDC")), p.GHOSTWHITE = o(p.fromCssColorString("#F8F8FF")), p.GOLD = o(p.fromCssColorString("#FFD700")), p.GOLDENROD = o(p.fromCssColorString("#DAA520")), p.GRAY = o(p.fromCssColorString("#808080")), p.GREEN = o(p.fromCssColorString("#008000")), p.GREENYELLOW = o(p.fromCssColorString("#ADFF2F")), p.GREY = p.GRAY, p.HONEYDEW = o(p.fromCssColorString("#F0FFF0")), p.HOTPINK = o(p.fromCssColorString("#FF69B4")), p.INDIANRED = o(p.fromCssColorString("#CD5C5C")), p.INDIGO = o(p.fromCssColorString("#4B0082")), p.IVORY = o(p.fromCssColorString("#FFFFF0")), p.KHAKI = o(p.fromCssColorString("#F0E68C")), p.LAVENDER = o(p.fromCssColorString("#E6E6FA")), p.LAVENDAR_BLUSH = o(p.fromCssColorString("#FFF0F5")), p.LAWNGREEN = o(p.fromCssColorString("#7CFC00")), p.LEMONCHIFFON = o(p.fromCssColorString("#FFFACD")), p.LIGHTBLUE = o(p.fromCssColorString("#ADD8E6")), p.LIGHTCORAL = o(p.fromCssColorString("#F08080")), p.LIGHTCYAN = o(p.fromCssColorString("#E0FFFF")), p.LIGHTGOLDENRODYELLOW = o(p.fromCssColorString("#FAFAD2")), p.LIGHTGRAY = o(p.fromCssColorString("#D3D3D3")), p.LIGHTGREEN = o(p.fromCssColorString("#90EE90")), p.LIGHTGREY = p.LIGHTGRAY, p.LIGHTPINK = o(p.fromCssColorString("#FFB6C1")), p.LIGHTSEAGREEN = o(p.fromCssColorString("#20B2AA")), p.LIGHTSKYBLUE = o(p.fromCssColorString("#87CEFA")), p.LIGHTSLATEGRAY = o(p.fromCssColorString("#778899")), p.LIGHTSLATEGREY = p.LIGHTSLATEGRAY, p.LIGHTSTEELBLUE = o(p.fromCssColorString("#B0C4DE")), p.LIGHTYELLOW = o(p.fromCssColorString("#FFFFE0")), p.LIME = o(p.fromCssColorString("#00FF00")), p.LIMEGREEN = o(p.fromCssColorString("#32CD32")), p.LINEN = o(p.fromCssColorString("#FAF0E6")), p.MAGENTA = o(p.fromCssColorString("#FF00FF")), p.MAROON = o(p.fromCssColorString("#800000")), p.MEDIUMAQUAMARINE = o(p.fromCssColorString("#66CDAA")), p.MEDIUMBLUE = o(p.fromCssColorString("#0000CD")), p.MEDIUMORCHID = o(p.fromCssColorString("#BA55D3")), p.MEDIUMPURPLE = o(p.fromCssColorString("#9370DB")), p.MEDIUMSEAGREEN = o(p.fromCssColorString("#3CB371")), p.MEDIUMSLATEBLUE = o(p.fromCssColorString("#7B68EE")), p.MEDIUMSPRINGGREEN = o(p.fromCssColorString("#00FA9A")), p.MEDIUMTURQUOISE = o(p.fromCssColorString("#48D1CC")), p.MEDIUMVIOLETRED = o(p.fromCssColorString("#C71585")), p.MIDNIGHTBLUE = o(p.fromCssColorString("#191970")), p.MINTCREAM = o(p.fromCssColorString("#F5FFFA")), p.MISTYROSE = o(p.fromCssColorString("#FFE4E1")), p.MOCCASIN = o(p.fromCssColorString("#FFE4B5")), p.NAVAJOWHITE = o(p.fromCssColorString("#FFDEAD")), p.NAVY = o(p.fromCssColorString("#000080")), p.OLDLACE = o(p.fromCssColorString("#FDF5E6")), p.OLIVE = o(p.fromCssColorString("#808000")), p.OLIVEDRAB = o(p.fromCssColorString("#6B8E23")), p.ORANGE = o(p.fromCssColorString("#FFA500")), p.ORANGERED = o(p.fromCssColorString("#FF4500")), p.ORCHID = o(p.fromCssColorString("#DA70D6")), p.PALEGOLDENROD = o(p.fromCssColorString("#EEE8AA")), p.PALEGREEN = o(p.fromCssColorString("#98FB98")), p.PALETURQUOISE = o(p.fromCssColorString("#AFEEEE")), p.PALEVIOLETRED = o(p.fromCssColorString("#DB7093")), p.PAPAYAWHIP = o(p.fromCssColorString("#FFEFD5")), p.PEACHPUFF = o(p.fromCssColorString("#FFDAB9")), p.PERU = o(p.fromCssColorString("#CD853F")), p.PINK = o(p.fromCssColorString("#FFC0CB")), p.PLUM = o(p.fromCssColorString("#DDA0DD")), p.POWDERBLUE = o(p.fromCssColorString("#B0E0E6")), p.PURPLE = o(p.fromCssColorString("#800080")), p.RED = o(p.fromCssColorString("#FF0000")), p.ROSYBROWN = o(p.fromCssColorString("#BC8F8F")), p.ROYALBLUE = o(p.fromCssColorString("#4169E1")), p.SADDLEBROWN = o(p.fromCssColorString("#8B4513")), p.SALMON = o(p.fromCssColorString("#FA8072")), p.SANDYBROWN = o(p.fromCssColorString("#F4A460")), p.SEAGREEN = o(p.fromCssColorString("#2E8B57")), p.SEASHELL = o(p.fromCssColorString("#FFF5EE")), p.SIENNA = o(p.fromCssColorString("#A0522D")), p.SILVER = o(p.fromCssColorString("#C0C0C0")), p.SKYBLUE = o(p.fromCssColorString("#87CEEB")), p.SLATEBLUE = o(p.fromCssColorString("#6A5ACD")), p.SLATEGRAY = o(p.fromCssColorString("#708090")), p.SLATEGREY = p.SLATEGRAY, p.SNOW = o(p.fromCssColorString("#FFFAFA")), p.SPRINGGREEN = o(p.fromCssColorString("#00FF7F")), p.STEELBLUE = o(p.fromCssColorString("#4682B4")), p.TAN = o(p.fromCssColorString("#D2B48C")), p.TEAL = o(p.fromCssColorString("#008080")), p.THISTLE = o(p.fromCssColorString("#D8BFD8")), p.TOMATO = o(p.fromCssColorString("#FF6347")), p.TURQUOISE = o(p.fromCssColorString("#40E0D0")), p.VIOLET = o(p.fromCssColorString("#EE82EE")), p.WHEAT = o(p.fromCssColorString("#F5DEB3")), p.WHITE = o(p.fromCssColorString("#FFFFFF")), p.WHITESMOKE = o(p.fromCssColorString("#F5F5F5")), p.YELLOW = o(p.fromCssColorString("#FFFF00")), p.YELLOWGREEN = o(p.fromCssColorString("#9ACD32")), p.TRANSPARENT = o(new p(0, 0, 0, 0)), p;
});