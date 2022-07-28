"use strict";

define(["./Cartesian3", "./defaultValue"], function (t, S) {
  "use strict";

  return function (t, i, e, s, n, h, o, c, d, u, r, a, g, m, I) {
    this.center = t, this.vertices = i, this.stride = S(c, 6), this.indices = e, this.minimumHeight = s, this.maximumHeight = n, this.boundingSphere3D = h, this.occludeePointInScaledSpace = o, this.orientedBoundingBox = d, this.encoding = u, this.exaggeration = r, this.westIndicesSouthToNorth = a, this.southIndicesEastToWest = g, this.eastIndicesNorthToSouth = m, this.northIndicesWestToEast = I;
  };
});