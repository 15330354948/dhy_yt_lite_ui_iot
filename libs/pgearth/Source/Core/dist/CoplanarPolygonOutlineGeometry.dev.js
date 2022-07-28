"use strict";

define(["./arrayRemoveDuplicates", "./BoundingSphere", "./Cartesian3", "./Check", "./ComponentDatatype", "./CoplanarPolygonGeometryLibrary", "./defaultValue", "./defined", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryInstance", "./GeometryPipeline", "./IndexDatatype", "./PolygonGeometryLibrary", "./PolygonPipeline", "./PrimitiveType"], function (c, s, l, o, u, g, a, y, d, h, m, f, v, P, H, e, b) {
  "use strict";

  function p(e) {
    var n = (e = a(e, a.EMPTY_OBJECT)).polygonHierarchy;
    o.defined("options.polygonHierarchy", n), this._polygonHierarchy = n, this._workerName = "createCoplanarPolygonOutlineGeometry", this.packedLength = H.computeHierarchyPackedLength(n) + 1;
  }

  p.fromPositions = function (e) {
    return e = a(e, a.EMPTY_OBJECT), o.defined("options.positions", e.positions), new p({
      polygonHierarchy: {
        positions: e.positions
      }
    });
  }, p.pack = function (e, n, r) {
    return o.typeOf.object("value", e), o.defined("array", n), r = a(r, 0), n[r = H.packPolygonHierarchy(e._polygonHierarchy, n, r)] = e.packedLength, n;
  };
  var k = {
    polygonHierarchy: {}
  };
  return p.unpack = function (e, n, r) {
    o.defined("array", e), n = a(n, 0);
    var t = H.unpackPolygonHierarchy(e, n);
    n = t.startingIndex, delete t.startingIndex;
    var i = e[n];
    return y(r) || (r = new p(k)), r._polygonHierarchy = t, r.packedLength = i, r;
  }, p.createGeometry = function (e) {
    var n = e._polygonHierarchy,
        r = n.positions;

    if (!((r = c(r, l.equalsEpsilon, !0)).length < 3) && g.validOutline(r)) {
      var t = H.polygonOutlinesFromHierarchy(n, !1);

      if (0 !== t.length) {
        for (var i = [], o = 0; o < t.length; o++) {
          var a = new f({
            geometry: function (e) {
              for (var n = e.length, r = new Float64Array(3 * n), t = P.createTypedArray(n, 2 * n), i = 0, o = 0, a = 0; a < n; a++) {
                var y = e[a];
                r[i++] = y.x, r[i++] = y.y, r[i++] = y.z, t[o++] = a, t[o++] = (a + 1) % n;
              }

              var p = new m({
                position: new h({
                  componentDatatype: u.DOUBLE,
                  componentsPerAttribute: 3,
                  values: r
                })
              });
              return new d({
                attributes: p,
                indices: t,
                primitiveType: b.LINES
              });
            }(t[o])
          });
          i.push(a);
        }

        var y = v.combineInstances(i)[0],
            p = s.fromPoints(n.positions);
        return new d({
          attributes: y.attributes,
          indices: y.indices,
          primitiveType: y.primitiveType,
          boundingSphere: p
        });
      }
    }
  }, p;
});