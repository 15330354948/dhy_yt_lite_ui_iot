"use strict";

define(["../Core/Ellipsoid", "../Core/HeightmapTessellator", "../Core/Rectangle", "./createTaskProcessorWorker"], function (s, c, d, e) {
  "use strict";

  return e(function (e, t) {
    var i = e.width,
        o = e.height;
    0 < e.skirtHeight && (i += 2, o += 2), e.ellipsoid = s.clone(e.ellipsoid), e.rectangle = d.clone(e.rectangle);
    var n = c.computeVertices(e),
        r = n.vertices;
    return t.push(r.buffer), {
      vertices: r.buffer,
      numberOfAttributes: n.encoding.getStride(),
      minimumHeight: n.minimumHeight,
      maximumHeight: n.maximumHeight,
      gridWidth: i,
      gridHeight: o,
      boundingSphere3D: n.boundingSphere3D,
      orientedBoundingBox: n.orientedBoundingBox,
      occludeePointInScaledSpace: n.occludeePointInScaledSpace,
      encoding: n.encoding,
      westIndicesSouthToNorth: n.westIndicesSouthToNorth,
      southIndicesEastToWest: n.southIndicesEastToWest,
      eastIndicesNorthToSouth: n.eastIndicesNorthToSouth,
      northIndicesWestToEast: n.northIndicesWestToEast
    };
  });
});