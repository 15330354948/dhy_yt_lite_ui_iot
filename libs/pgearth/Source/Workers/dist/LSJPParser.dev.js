"use strict";

define("Workers/LSJPNode", [], function () {
  "use strict";

  return function () {
    this.children = [], this.childRanges = [], this.strDataPath = "", this.bdSphere = [], this.enRangeMode = 0, this.arryMaterials = [], this.nodeMeshes = [];
  };
}), define("Workers/LSJPNodeMat", [], function () {
  "use strict";

  return function () {
    this.id = -1, this.index = -1, this.imgUrl = "", this.imgBlob = null, this.width = 0, this.height = 0, this.pixelFormat = 0, this.eftype = 0, this.bUrl = !0, this.diffuseR = 1, this.diffuseG = 1, this.diffuseB = 1;
  };
}), define("Workers/LSJPNodeMesh", [], function () {
  "use strict";

  return function () {
    this.matIndex = -1, this.indices = null, this.verts = null, this.normals = null, this.colors = null, this.colorPerNum = 1, this.uvs = [];
  };
}), define("Workers/LSJPParser", ["./LSJPNode", "./LSJPNodeMat", "./LSJPNodeMesh"], function (F, v, M) {
  "use strict";

  function r() {}

  return r.prototype.parseMaterials = function (r, e) {
    for (var a = e.readUInt32(), t = 0; t < a; t++) {
      var i = new v();
      i.index = t, i.id = t, r.arryMaterials.push(i);
      var n = (e.readUChar8Array2(4), e.readUChar8Array2(4));
      e.readUChar8Array2(4), e.readFloat(), i.diffuseR = n[0] / 255, i.diffuseG = n[1] / 255, i.diffuseB = n[2] / 255;

      for (var s = e.readUInt32(), d = 0; d < s; d++) {
        if (0 == e.readUInt32()) {
          var o = e.readString();

          if (0 == d) {
            var h,
                l = o.substring(o.lastIndexOf("."), o.length).toLowerCase();
            if (".jpeg" == l || ".jpg" == l) h = "jpeg";else if (".png" == l) h = "png";else if (".gif" == l) h = "gif";else if (".icon" == l) h = "x-icon";else if (".dxt" == l) {
              h = "dxt";
              var f = e.readUInt32(),
                  u = e.readUInt32(),
                  U = e.readUInt32(),
                  p = e.readUInt32(),
                  c = e.readUChar8Array2(f - 12);
              i.width = u, i.height = U, i.pixelFormat = p, i.imgBlob = c, i.eftype = h, i.bUrl = !1;
              continue;
            }
            f = e.readUInt32(), c = e.readUChar8Array2(f);
            i.imgBlob = new Blob([c], {
              type: h
            }), i.bUrl = !1;
          }
        } else {
          var I = e.readString();
          0 == d && (i.imgUrl = I, i.bUrl = !0);
        }
      }
    }
  }, r.prototype.parseNode = function (r, e) {
    for (var a = e.readUInt32(), t = 0; t < a; t++) {
      var i = e.readUInt32(),
          n = new F();
      r.children.push(n), 0 == i ? n.strDataPath = e.readString() : this.parseNode(n, e);
    }

    r.enRangeMode = e.readUInt32();
    var s = e.readUInt32(),
        t = 0,
        d = 0;

    for (t = 0; t < s; t++) {
      r.childRanges.push(e.readDouble()), r.childRanges.push(e.readDouble());
    }

    r.bdSphere.push(e.readDouble()), r.bdSphere.push(e.readDouble()), r.bdSphere.push(e.readDouble()), r.bdSphere.push(e.readDouble());
    var o = e.readUInt32();

    for (t = 0; t < o; t++) {
      var h = new M();
      r.nodeMeshes.push(h), h.matIndex = e.readUInt32();
      var l = (e.readUInt32(), e.readUInt32());

      if (0 < l) {
        var f = e.readUInt32();

        if (4 == f) {
          var u = e.readUInt32Array(l);

          for (h.indices = new Uint32Array(l), d = 0; d < l; d++) {
            h.indices[d] = u.getUint32(4 * d, !0);
          }
        } else if (2 == f) {
          u = e.readUInt16Array(l);

          for (h.indices = new Uint16Array(l), d = 0; d < l; d++) {
            h.indices[d] = u.getUint16(2 * d, !0);
          }
        }
      }

      var U = e.readUInt32();

      if (0 < U) {
        var p = 3 * U,
            c = e.readFloat32Array(p);

        for (h.verts = new Float32Array(p), d = 0; d < p; d++) {
          h.verts[d] = c.getFloat32(4 * d, !0);
        }
      }

      var I = e.readUInt32();

      if (0 < I) {
        var p = 3 * I,
            v = e.readFloat32Array(p);

        for (h.normals = new Float32Array(p), d = 0; d < p; d++) {
          h.normals[d] = v.getFloat32(4 * d, !0);
        }
      }

      for (var g = e.readUInt32(), y = 0; y < g; y++) {
        var b = e.readUInt32();

        if (0 < b) {
          for (var p = 2 * b, A = e.readFloat32Array(p), S = new Float32Array(p), d = 0; d < p; d++) {
            S[d] = A.getFloat32(4 * d, !0);
          }

          h.uvs.push(S);
        }
      }

      var m = e.readUInt32();

      if (0 < m) {
        p = m;

        for (h.colors = new Uint32Array(p), h.colorPerNum = 1, d = 0; d < p; d++) {
          h.colors[d] = e.readUInt32();
        }
      }

      var w = e.readUInt32();
      0 < w && (p = w, e.readUInt32Array(p));
    }
  }, r.prototype.parse = function (r, e) {
    e.readUInt32(), this.parseMaterials(r, e), this.parseNode(r, e);
  }, r;
});