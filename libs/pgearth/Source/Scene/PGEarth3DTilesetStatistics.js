define(["../Core/defined"],function(e){"use strict";function t(){this.selected=0,this.visited=0,this.numberOfCommands=0,this.numberOfAttemptedRequests=0,this.numberOfPendingRequests=0,this.numberOfTilesProcessing=0,this.numberOfTilesWithContentReady=0,this.numberOfTilesTotal=0,this.numberOfLoadedTilesTotal=0,this.numberOfFeaturesSelected=0,this.numberOfFeaturesLoaded=0,this.numberOfPointsSelected=0,this.numberOfPointsLoaded=0,this.numberOfTrianglesSelected=0,this.numberOfTilesStyled=0,this.numberOfFeaturesStyled=0,this.numberOfTilesCulledWithChildrenUnion=0,this.geometryByteLength=0,this.texturesByteLength=0,this.batchTableByteLength=0}function n(t,s,i,r){var u=s.innerContents,d=s.pointsLength,l=s.trianglesLength,m=s.featuresLength,f=s.geometryByteLength,h=s.texturesByteLength,o=s.batchTableByteLength;if(r?(t.numberOfFeaturesLoaded+=i?-m:m,t.numberOfPointsLoaded+=i?-d:d,t.geometryByteLength+=i?-f:f,t.texturesByteLength+=i?-h:h,t.batchTableByteLength+=i?-o:o):(t.numberOfFeaturesSelected+=i?-m:m,t.numberOfPointsSelected+=i?-d:d,t.numberOfTrianglesSelected+=i?-l:l),e(u))for(var b=u.length,O=0;O<b;++O)n(t,u[O],i,r)}return t.prototype.clear=function(){this.selected=0,this.visited=0,this.numberOfCommands=0,this.numberOfAttemptedRequests=0,this.numberOfFeaturesSelected=0,this.numberOfPointsSelected=0,this.numberOfTrianglesSelected=0,this.numberOfTilesStyled=0,this.numberOfFeaturesStyled=0,this.numberOfTilesCulledWithChildrenUnion=0},t.prototype.incrementSelectionCounts=function(e){n(this,e,!1,!1)},t.prototype.incrementLoadCounts=function(e){n(this,e,!1,!0)},t.prototype.decrementLoadCounts=function(e){n(this,e,!0,!0)},t.clone=function(e,t){t.selected=e.selected,t.visited=e.visited,t.numberOfCommands=e.numberOfCommands,t.selected=e.selected,t.numberOfAttemptedRequests=e.numberOfAttemptedRequests,t.numberOfPendingRequests=e.numberOfPendingRequests,t.numberOfTilesProcessing=e.numberOfTilesProcessing,t.numberOfTilesWithContentReady=e.numberOfTilesWithContentReady,t.numberOfTilesTotal=e.numberOfTilesTotal,t.numberOfFeaturesSelected=e.numberOfFeaturesSelected,t.numberOfFeaturesLoaded=e.numberOfFeaturesLoaded,t.numberOfPointsSelected=e.numberOfPointsSelected,t.numberOfPointsLoaded=e.numberOfPointsLoaded,t.numberOfTrianglesSelected=e.numberOfTrianglesSelected,t.numberOfTilesStyled=e.numberOfTilesStyled,t.numberOfFeaturesStyled=e.numberOfFeaturesStyled,t.numberOfTilesCulledWithChildrenUnion=e.numberOfTilesCulledWithChildrenUnion,t.geometryByteLength=e.geometryByteLength,t.texturesByteLength=e.texturesByteLength,t.batchTableByteLength=e.batchTableByteLength},t});