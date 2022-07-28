"use strict";

define(["./ForEach", "./hasExtension", "../../Core/defined"], function (r, f, s) {
  "use strict";

  var o = {
    accessor: "accessors",
    buffer: "buffers",
    bufferView: "bufferViews"
  };

  function i(e, i) {
    var n = e[o[i]];
    if (s(n)) for (var f = 0, r = a[i](e), t = n.length, u = 0; u < t; ++u) {
      r[u] || (c[i](e, u - f), f++);
    }
  }

  function c() {}

  function a() {}

  return c.accessor = function (e, f) {
    e.accessors.splice(f, 1), r.mesh(e, function (e) {
      r.meshPrimitive(e, function (n) {
        r.meshPrimitiveAttribute(n, function (e, i) {
          f < e && n.attributes[i]--;
        }), r.meshPrimitiveTarget(n, function (n) {
          r.meshPrimitiveTargetAttribute(n, function (e, i) {
            f < e && n[i]--;
          });
        });
        var e = n.indices;
        s(e) && f < e && n.indices--;
      });
    }), r.skin(e, function (e) {
      s(e.inverseBindMatrices) && e.inverseBindMatrices > f && e.inverseBindMatrices--;
    }), r.animation(e, function (e) {
      r.animationSampler(e, function (e) {
        s(e.input) && e.input > f && e.input--, s(e.output) && e.output > f && e.output--;
      });
    });
  }, c.buffer = function (e, i) {
    e.buffers.splice(i, 1), r.bufferView(e, function (e) {
      s(e.buffer) && e.buffer > i && e.buffer--;
    });
  }, c.bufferView = function (e, n) {
    e.bufferViews.splice(n, 1), r.accessor(e, function (e) {
      s(e.bufferView) && e.bufferView > n && e.bufferView--;
    }), r.shader(e, function (e) {
      s(e.bufferView) && e.bufferView > n && e.bufferView--;
    }), r.image(e, function (e) {
      s(e.bufferView) && e.bufferView > n && e.bufferView--, r.compressedImage(e, function (e) {
        var i = e.bufferView;
        s(i) && n < i && e.bufferView--;
      });
    }), f(e, "KHR_draco_mesh_compression") && r.mesh(e, function (e) {
      r.meshPrimitive(e, function (e) {
        s(e.extensions) && s(e.extensions.KHR_draco_mesh_compression) && e.extensions.KHR_draco_mesh_compression.bufferView > n && e.extensions.KHR_draco_mesh_compression.bufferView--;
      });
    });
  }, a.accessor = function (e) {
    var n = {};
    return r.mesh(e, function (e) {
      r.meshPrimitive(e, function (e) {
        r.meshPrimitiveAttribute(e, function (e) {
          n[e] = !0;
        }), r.meshPrimitiveTarget(e, function (e) {
          r.meshPrimitiveTargetAttribute(e, function (e) {
            n[e] = !0;
          });
        });
        var i = e.indices;
        s(i) && (n[i] = !0);
      });
    }), r.skin(e, function (e) {
      s(e.inverseBindMatrices) && (n[e.inverseBindMatrices] = !0);
    }), r.animation(e, function (e) {
      r.animationSampler(e, function (e) {
        s(e.input) && (n[e.input] = !0), s(e.output) && (n[e.output] = !0);
      });
    }), n;
  }, a.buffer = function (e) {
    var i = {};
    return r.bufferView(e, function (e) {
      s(e.buffer) && (i[e.buffer] = !0);
    }), i;
  }, a.bufferView = function (e) {
    var i = {};
    return r.accessor(e, function (e) {
      s(e.bufferView) && (i[e.bufferView] = !0);
    }), r.shader(e, function (e) {
      s(e.bufferView) && (i[e.bufferView] = !0);
    }), r.image(e, function (e) {
      s(e.bufferView) && (i[e.bufferView] = !0), r.compressedImage(e, function (e) {
        s(e.bufferView) && (i[e.bufferView] = !0);
      });
    }), f(e, "KHR_draco_mesh_compression") && r.mesh(e, function (e) {
      r.meshPrimitive(e, function (e) {
        s(e.extensions) && s(e.extensions.KHR_draco_mesh_compression) && (i[e.extensions.KHR_draco_mesh_compression.bufferView] = !0);
      });
    }), i;
  }, function (e) {
    return i(e, "accessor"), i(e, "bufferView"), i(e, "buffer"), e;
  };
});