define(["../ThirdParty/when","./defaultValue","./defined","./defineProperties","./Ellipsoid","./Event","./GeographicTilingScheme","./HeightmapTerrainData","./TerrainProvider"],function(e,t,i,r,n,o,l,a,h){"use strict";function s(r){r=t(r,{}),this._tilingScheme=r.tilingScheme,i(this._tilingScheme)||(this._tilingScheme=new l({ellipsoid:t(r.ellipsoid,n.WGS84)})),this._levelZeroMaximumGeometricError=h.getEstimatedLevelZeroGeometricErrorForAHeightmap(this._tilingScheme.ellipsoid,64,this._tilingScheme.getNumberOfXTilesAtLevel(0)),this._errorEvent=new o,this._readyPromise=e.resolve(!0)}return r(s.prototype,{errorEvent:{get:function(){return this._errorEvent}},credit:{get:function(){}},tilingScheme:{get:function(){return this._tilingScheme}},ready:{get:function(){return!0}},readyPromise:{get:function(){return this._readyPromise}},hasWaterMask:{get:function(){return!1}},hasVertexNormals:{get:function(){return!1}}}),s.prototype.requestTileGeometry=function(t,i,r,n){return e.resolve(new a({buffer:new Uint8Array(256),width:16,height:16}))},s.prototype.getLevelMaximumGeometricError=function(e){return this._levelZeroMaximumGeometricError/(1<<e)},s.prototype.getTileDataAvailable=function(e,t,i){},s.prototype.loadTileDataAvailability=function(e,t,i){},s});