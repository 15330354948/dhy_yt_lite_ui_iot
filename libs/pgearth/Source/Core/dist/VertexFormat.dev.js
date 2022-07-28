"use strict";

define(["./defaultValue", "./defined", "./DeveloperError", "./freezeObject"], function (i, e, r, n) {
  "use strict";

  function a(n) {
    n = i(n, i.EMPTY_OBJECT), this.position = i(n.position, !1), this.normal = i(n.normal, !1), this.st = i(n.st, !1), this.bitangent = i(n.bitangent, !1), this.tangent = i(n.tangent, !1), this.color = i(n.color, !1);
  }

  return a.POSITION_ONLY = n(new a({
    position: !0
  })), a.POSITION_AND_NORMAL = n(new a({
    position: !0,
    normal: !0
  })), a.POSITION_NORMAL_AND_ST = n(new a({
    position: !0,
    normal: !0,
    st: !0
  })), a.POSITION_AND_ST = n(new a({
    position: !0,
    st: !0
  })), a.POSITION_AND_COLOR = n(new a({
    position: !0,
    color: !0
  })), a.ALL = n(new a({
    position: !0,
    normal: !0,
    st: !0,
    tangent: !0,
    bitangent: !0
  })), a.DEFAULT = a.POSITION_NORMAL_AND_ST, a.packedLength = 6, a.pack = function (n, t, o) {
    if (!e(n)) throw new r("value is required");
    if (!e(t)) throw new r("array is required");
    return o = i(o, 0), t[o++] = n.position ? 1 : 0, t[o++] = n.normal ? 1 : 0, t[o++] = n.st ? 1 : 0, t[o++] = n.tangent ? 1 : 0, t[o++] = n.bitangent ? 1 : 0, t[o] = n.color ? 1 : 0, t;
  }, a.unpack = function (n, t, o) {
    if (!e(n)) throw new r("array is required");
    return t = i(t, 0), e(o) || (o = new a()), o.position = 1 === n[t++], o.normal = 1 === n[t++], o.st = 1 === n[t++], o.tangent = 1 === n[t++], o.bitangent = 1 === n[t++], o.color = 1 === n[t], o;
  }, a.clone = function (n, t) {
    if (e(n)) return e(t) || (t = new a()), t.position = n.position, t.normal = n.normal, t.st = n.st, t.tangent = n.tangent, t.bitangent = n.bitangent, t.color = n.color, t;
  }, a;
});