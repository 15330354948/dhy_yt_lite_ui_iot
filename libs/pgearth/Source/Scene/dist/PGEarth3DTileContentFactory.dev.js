"use strict";

define(["./Batched3DModel3DTileContent", "./Composite3DTileContent", "./Geometry3DTileContent", "./Instanced3DModel3DTileContent", "./PointCloud3DTileContent", "./Tileset3DTileContent", "./Vector3DTileContent"], function (r, u, c, l, f, C, D) {
  "use strict";

  var d = {
    b3dm: function b3dm(n, e, t, o, i) {
      return new r(n, e, t, o, i);
    },
    pnts: function pnts(n, e, t, o, i) {
      return new f(n, e, t, o, i);
    },
    i3dm: function i3dm(n, e, t, o, i) {
      return new l(n, e, t, o, i);
    },
    cmpt: function cmpt(n, e, t, o, i) {
      return new u(n, e, t, o, i, d);
    },
    json: function json(n, e, t, o, i) {
      return new C(n, e, t, o, i);
    },
    geom: function geom(n, e, t, o, i) {
      return new c(n, e, t, o, i);
    },
    vctr: function vctr(n, e, t, o, i) {
      return new D(n, e, t, o, i);
    }
  };
  return d;
});