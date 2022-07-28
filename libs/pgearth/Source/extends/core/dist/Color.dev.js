"use strict";

define(["../../Core/Color", "../../Core/defaultValue", "../../Core/defined"], function (r, o, n) {
  return function (e) {
    return "string" == typeof e ? new r.fromCssColorString(e) : e instanceof Array ? new r(o(e[0], 1), o(e[1], 1), o(e[2], 1), o(e[3], 1)) : e instanceof Object ? n(e.a) ? r.fromAlpha(r.fromBytes(o(e.r, 1), o(e.g, 1), o(e.b, 1)), e.a) : r.fromBytes(o(e.r, 1), o(e.g, 1), o(e.b, 1)) : void 0;
  };
});