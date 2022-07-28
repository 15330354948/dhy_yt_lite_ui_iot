"use strict";

define(["../Core/defined"], function (b) {
  "use strict";

  function e() {
    this.selected = 0, this.visited = 0, this.numberOfCommands = 0, this.numberOfAttemptedRequests = 0, this.numberOfPendingRequests = 0, this.numberOfTilesProcessing = 0, this.numberOfTilesWithContentReady = 0, this.numberOfTilesTotal = 0, this.numberOfLoadedTilesTotal = 0, this.numberOfFeaturesSelected = 0, this.numberOfFeaturesLoaded = 0, this.numberOfPointsSelected = 0, this.numberOfPointsLoaded = 0, this.numberOfTrianglesSelected = 0, this.numberOfTilesStyled = 0, this.numberOfFeaturesStyled = 0, this.numberOfTilesCulledWithChildrenUnion = 0, this.geometryByteLength = 0, this.texturesByteLength = 0, this.batchTableByteLength = 0;
  }

  function O(e, t, n, s) {
    var i = t.innerContents,
        r = t.pointsLength,
        u = t.trianglesLength,
        d = t.featuresLength,
        l = t.geometryByteLength,
        m = t.texturesByteLength,
        f = t.batchTableByteLength;
    if (s ? (e.numberOfFeaturesLoaded += n ? -d : d, e.numberOfPointsLoaded += n ? -r : r, e.geometryByteLength += n ? -l : l, e.texturesByteLength += n ? -m : m, e.batchTableByteLength += n ? -f : f) : (e.numberOfFeaturesSelected += n ? -d : d, e.numberOfPointsSelected += n ? -r : r, e.numberOfTrianglesSelected += n ? -u : u), b(i)) for (var h = i.length, o = 0; o < h; ++o) {
      O(e, i[o], n, s);
    }
  }

  return e.prototype.clear = function () {
    this.selected = 0, this.visited = 0, this.numberOfCommands = 0, this.numberOfAttemptedRequests = 0, this.numberOfFeaturesSelected = 0, this.numberOfPointsSelected = 0, this.numberOfTrianglesSelected = 0, this.numberOfTilesStyled = 0, this.numberOfFeaturesStyled = 0, this.numberOfTilesCulledWithChildrenUnion = 0;
  }, e.prototype.incrementSelectionCounts = function (e) {
    O(this, e, !1, !1);
  }, e.prototype.incrementLoadCounts = function (e) {
    O(this, e, !1, !0);
  }, e.prototype.decrementLoadCounts = function (e) {
    O(this, e, !0, !0);
  }, e.clone = function (e, t) {
    t.selected = e.selected, t.visited = e.visited, t.numberOfCommands = e.numberOfCommands, t.selected = e.selected, t.numberOfAttemptedRequests = e.numberOfAttemptedRequests, t.numberOfPendingRequests = e.numberOfPendingRequests, t.numberOfTilesProcessing = e.numberOfTilesProcessing, t.numberOfTilesWithContentReady = e.numberOfTilesWithContentReady, t.numberOfTilesTotal = e.numberOfTilesTotal, t.numberOfFeaturesSelected = e.numberOfFeaturesSelected, t.numberOfFeaturesLoaded = e.numberOfFeaturesLoaded, t.numberOfPointsSelected = e.numberOfPointsSelected, t.numberOfPointsLoaded = e.numberOfPointsLoaded, t.numberOfTrianglesSelected = e.numberOfTrianglesSelected, t.numberOfTilesStyled = e.numberOfTilesStyled, t.numberOfFeaturesStyled = e.numberOfFeaturesStyled, t.numberOfTilesCulledWithChildrenUnion = e.numberOfTilesCulledWithChildrenUnion, t.geometryByteLength = e.geometryByteLength, t.texturesByteLength = e.texturesByteLength, t.batchTableByteLength = e.batchTableByteLength;
  }, e;
});