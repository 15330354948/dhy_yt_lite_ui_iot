"use strict";

!function () {
  !function () {
    define("Workers/LSJPNode", [], function () {
      "use strict";

      function r() {
        this.children = [], this.childRanges = [], this.strDataPath = "", this.bdSphere = [], this.enRangeMode = 0, this.arryMaterials = [], this.nodeMeshes = [];
      }

      return r;
    }), define("Workers/LSJPNodeMat", [], function () {
      "use strict";

      function r() {
        this.id = -1, this.index = -1, this.imgUrl = "", this.imgBlob = null, this.width = 0, this.height = 0, this.pixelFormat = 0, this.eftype = 0, this.bUrl = !0, this.diffuseR = 1, this.diffuseG = 1, this.diffuseB = 1;
      }

      return r;
    }), define("Workers/LSJPNodeMesh", [], function () {
      "use strict";

      function r() {
        this.matIndex = -1, this.indices = null, this.verts = null, this.normals = null, this.colors = null, this.colorPerNum = 1, this.uvs = [];
      }

      return r;
    }), define("Workers/LSJPParser", ["./LSJPNode", "./LSJPNodeMat", "./LSJPNodeMesh"], function (r, e, a) {
      "use strict";

      function t() {}

      return t.prototype.parseMaterials = function (r, a) {
        for (var t = a.readUInt32(), i = 0; i < t; i++) {
          var n = new e();
          n.index = i, n.id = i, r.arryMaterials.push(n);
          var s = (a.readUChar8Array2(4), a.readUChar8Array2(4));
          a.readUChar8Array2(4), a.readFloat(), n.diffuseR = s[0] / 255, n.diffuseG = s[1] / 255, n.diffuseB = s[2] / 255;

          for (var d = a.readUInt32(), o = 0; o < d; o++) {
            if (0 == a.readUInt32()) {
              var h = a.readString();

              if (0 == o) {
                var l,
                    f = h.substring(h.lastIndexOf("."), h.length).toLowerCase();
                if (".jpeg" == f || ".jpg" == f) l = "jpeg";else if (".png" == f) l = "png";else if (".gif" == f) l = "gif";else if (".icon" == f) l = "x-icon";else if (".dxt" == f) {
                  l = "dxt";
                  var u = a.readUInt32(),
                      U = a.readUInt32(),
                      p = a.readUInt32(),
                      c = a.readUInt32(),
                      v = a.readUChar8Array2(u - 12);
                  n.width = U, n.height = p, n.pixelFormat = c, n.imgBlob = v, n.eftype = l, n.bUrl = !1;
                  continue;
                }
                var u = a.readUInt32(),
                    v = a.readUChar8Array2(u);
                n.imgBlob = new Blob([v], {
                  type: l
                }), n.bUrl = !1;
              }
            } else {
              var I = a.readString();
              0 == o && (n.imgUrl = I, n.bUrl = !0);
            }
          }
        }
      }, t.prototype.parseNode = function (e, t) {
        for (var i = t.readUInt32(), n = 0; n < i; n++) {
          var s = t.readUInt32(),
              d = new r();
          e.children.push(d), 0 == s ? d.strDataPath = t.readString() : this.parseNode(d, t);
        }

        e.enRangeMode = t.readUInt32();
        var o = t.readUInt32(),
            n = 0,
            h = 0;

        for (n = 0; n < o; n++) {
          e.childRanges.push(t.readDouble()), e.childRanges.push(t.readDouble());
        }

        e.bdSphere.push(t.readDouble()), e.bdSphere.push(t.readDouble()), e.bdSphere.push(t.readDouble()), e.bdSphere.push(t.readDouble());
        var l = t.readUInt32();

        for (n = 0; n < l; n++) {
          var f = new a();
          e.nodeMeshes.push(f), f.matIndex = t.readUInt32();
          var u = (t.readUInt32(), t.readUInt32());

          if (u > 0) {
            var U = t.readUInt32();

            if (4 == U) {
              var p = t.readUInt32Array(u);

              for (f.indices = new Uint32Array(u), h = 0; h < u; h++) {
                f.indices[h] = p.getUint32(4 * h, !0);
              }
            } else if (2 == U) {
              var p = t.readUInt16Array(u);

              for (f.indices = new Uint16Array(u), h = 0; h < u; h++) {
                f.indices[h] = p.getUint16(2 * h, !0);
              }
            }
          }

          var c = t.readUInt32();

          if (c > 0) {
            var v = 3 * c,
                I = t.readFloat32Array(v);

            for (f.verts = new Float32Array(v), h = 0; h < v; h++) {
              f.verts[h] = I.getFloat32(4 * h, !0);
            }
          }

          var g = t.readUInt32();

          if (g > 0) {
            var v = 3 * g,
                y = t.readFloat32Array(v);

            for (f.normals = new Float32Array(v), h = 0; h < v; h++) {
              f.normals[h] = y.getFloat32(4 * h, !0);
            }
          }

          for (var b = t.readUInt32(), A = 0; A < b; A++) {
            var S = t.readUInt32();

            if (S > 0) {
              var v = 2 * S,
                  m = t.readFloat32Array(v),
                  w = new Float32Array(v);

              for (h = 0; h < v; h++) {
                w[h] = m.getFloat32(4 * h, !0);
              }

              f.uvs.push(w);
            }
          }

          var F = t.readUInt32();

          if (F > 0) {
            var v = F;

            for (f.colors = new Uint32Array(v), f.colorPerNum = 1, h = 0; h < v; h++) {
              f.colors[h] = t.readUInt32();
            }
          }

          var M = t.readUInt32();

          if (M > 0) {
            var v = M;
            t.readUInt32Array(v);
          }
        }
      }, t.prototype.parse = function (r, e) {
        e.readUInt32(), this.parseMaterials(r, e), this.parseNode(r, e);
      }, t;
    });
  }();
}();