define(["../../Core/defined","../../Core/defineProperties","../../Core/destroyObject","../../Core/DeveloperError","../../Core/Rectangle","../../Core/ScreenSpaceEventHandler","../../Core/ScreenSpaceEventType","../../Scene/DebugModelMatrixPrimitive","../../Scene/PerformanceDisplay","../../Scene/TileCoordinatesImageryProvider","../../ThirdParty/knockout","../createCommand"],function(e,i,t,r,s,n,o,u,c,h,p,l){"use strict";function a(e,i,t){var r=Math.min(t,i);return r=Math.max(r,e)}function m(i,t){if(!e(i))throw new r("scene is required");if(!e(t))throw new r("performanceContainer is required");var m=this,d=i.canvas,v=new n(d);this._eventHandler=v,this._scene=i,this._canvas=d,this._primitive=void 0,this._tile=void 0,this._modelMatrixPrimitive=void 0,this._performanceDisplay=void 0,this._performanceContainer=t;var _,f=this._scene.globe;function b(i){var t=m._scene.pick({x:i.position.x,y:i.position.y});e(t)&&(m.primitive=e(t.collection)?t.collection:t.primitive),m._scene.requestRender(),m.pickPrimitiveActive=!1}function g(i){var t,r=f.ellipsoid,n=m._scene.camera.pickEllipsoid({x:i.position.x,y:i.position.y},r);if(e(n))for(var o=r.cartesianToCartographic(n),u=f._surface.tileProvider._tilesToRenderByTextureCount,c=0;!t&&c<u.length;++c){var h=u[c];if(e(h))for(var p=0;!t&&p<h.length;++p){var l=h[p];s.contains(l.rectangle,o)&&(t=l)}}m.tile=t,m.pickTileActive=!1}f.depthTestAgainstTerrain=!0,this.frustums=!1,this.frustumPlanes=!1,this.performance=!1,this.shaderCacheText="",this.primitiveBoundingSphere=!1,this.primitiveReferenceFrame=!1,this.filterPrimitive=!1,this.tileBoundingSphere=!1,this.filterTile=!1,this.wireframe=!1,this.globeDepth=!1,this.pickDepth=!1,this.depthFrustum=1,this._numberOfFrustums=1,this.suspendUpdates=!1,this.tileCoordinates=!1,this.frustumStatisticText=!1,this.tileText="",this.hasPickedPrimitive=!1,this.hasPickedTile=!1,this.pickPrimitiveActive=!1,this.pickTileActive=!1,this.dropDownVisible=!0,this.generalVisible=!0,this.primitivesVisible=!1,this.terrainVisible=!1,this.depthFrustumText="",p.track(this,["frustums","frustumPlanes","performance","shaderCacheText","primitiveBoundingSphere","primitiveReferenceFrame","filterPrimitive","tileBoundingSphere","filterTile","wireframe","globeDepth","pickDepth","depthFrustum","suspendUpdates","tileCoordinates","frustumStatisticText","tileText","hasPickedPrimitive","hasPickedTile","pickPrimitiveActive","pickTileActive","dropDownVisible","generalVisible","primitivesVisible","terrainVisible","depthFrustumText"]),this._toggleDropDown=l(function(){m.dropDownVisible=!m.dropDownVisible}),this._toggleGeneral=l(function(){m.generalVisible=!m.generalVisible}),this._togglePrimitives=l(function(){m.primitivesVisible=!m.primitivesVisible}),this._toggleTerrain=l(function(){m.terrainVisible=!m.terrainVisible}),this._frustumsSubscription=p.getObservable(this,"frustums").subscribe(function(e){m._scene.debugShowFrustums=e,m._scene.requestRender()}),this._frustumPlanesSubscription=p.getObservable(this,"frustumPlanes").subscribe(function(e){m._scene.debugShowFrustumPlanes=e,m._scene.requestRender()}),this._performanceSubscription=p.getObservable(this,"performance").subscribe(function(e){e?m._performanceDisplay=new c({container:m._performanceContainer}):m._performanceContainer.innerHTML=""}),this._showPrimitiveBoundingSphere=l(function(){return m._primitive.debugShowBoundingVolume=m.primitiveBoundingSphere,m._scene.requestRender(),!0}),this._primitiveBoundingSphereSubscription=p.getObservable(this,"primitiveBoundingSphere").subscribe(function(){m._showPrimitiveBoundingSphere()}),this._showPrimitiveReferenceFrame=l(function(){if(m.primitiveReferenceFrame){var i=m._primitive.modelMatrix;m._modelMatrixPrimitive=new u({modelMatrix:i}),m._scene.primitives.add(m._modelMatrixPrimitive)}else e(m._modelMatrixPrimitive)&&(m._scene.primitives.remove(m._modelMatrixPrimitive),m._modelMatrixPrimitive=void 0);return m._scene.requestRender(),!0}),this._primitiveReferenceFrameSubscription=p.getObservable(this,"primitiveReferenceFrame").subscribe(function(){m._showPrimitiveReferenceFrame()}),this._doFilterPrimitive=l(function(){return m.filterPrimitive?m._scene.debugCommandFilter=function(i){return!(!e(m._modelMatrixPrimitive)||i.owner!==m._modelMatrixPrimitive._primitive)||!!e(m._primitive)&&(i.owner===m._primitive||i.owner===m._primitive._billboardCollection||i.owner.primitive===m._primitive)}:m._scene.debugCommandFilter=void 0,!0}),this._filterPrimitiveSubscription=p.getObservable(this,"filterPrimitive").subscribe(function(){m._doFilterPrimitive(),m._scene.requestRender()}),this._wireframeSubscription=p.getObservable(this,"wireframe").subscribe(function(e){f._surface.tileProvider._debug.wireframe=e,m._scene.requestRender()}),this._globeDepthSubscription=p.getObservable(this,"globeDepth").subscribe(function(e){m._scene.debugShowGlobeDepth=e,m._scene.requestRender()}),this._pickDepthSubscription=p.getObservable(this,"pickDepth").subscribe(function(e){m._scene.debugShowPickDepth=e,m._scene.requestRender()}),this._depthFrustumSubscription=p.getObservable(this,"depthFrustum").subscribe(function(e){m._scene.debugShowDepthFrustum=e,m._scene.requestRender()}),this._incrementDepthFrustum=l(function(){var e=m.depthFrustum+1;return m.depthFrustum=a(1,m._numberOfFrustums,e),m._scene.requestRender(),!0}),this._decrementDepthFrustum=l(function(){var e=m.depthFrustum-1;return m.depthFrustum=a(1,m._numberOfFrustums,e),m._scene.requestRender(),!0}),this._suspendUpdatesSubscription=p.getObservable(this,"suspendUpdates").subscribe(function(e){f._surface._debug.suspendLodUpdate=e,e||(m.filterTile=!1)}),this._showTileCoordinates=l(function(){return m.tileCoordinates&&!e(_)?_=i.imageryLayers.addImageryProvider(new h({tilingScheme:i.terrainProvider.tilingScheme})):!m.tileCoordinates&&e(_)&&(i.imageryLayers.remove(_),_=void 0),!0}),this._tileCoordinatesSubscription=p.getObservable(this,"tileCoordinates").subscribe(function(){m._showTileCoordinates(),m._scene.requestRender()}),this._tileBoundingSphereSubscription=p.getObservable(this,"tileBoundingSphere").subscribe(function(){m._showTileBoundingSphere(),m._scene.requestRender()}),this._showTileBoundingSphere=l(function(){return m.tileBoundingSphere?f._surface.tileProvider._debug.boundingSphereTile=m._tile:f._surface.tileProvider._debug.boundingSphereTile=void 0,m._scene.requestRender(),!0}),this._doFilterTile=l(function(){return m.filterTile?(m.suspendUpdates=!0,f._surface._tilesToRender=[],e(m._tile)&&m._tile.renderable&&f._surface._tilesToRender.push(m._tile)):m.suspendUpdates=!1,!0}),this._filterTileSubscription=p.getObservable(this,"filterTile").subscribe(function(){m.doFilterTile(),m._scene.requestRender()}),this._pickPrimitive=l(function(){m.pickPrimitiveActive=!m.pickPrimitiveActive}),this._pickPrimitiveActiveSubscription=p.getObservable(this,"pickPrimitiveActive").subscribe(function(e){e?v.setInputAction(b,o.LEFT_CLICK):v.removeInputAction(o.LEFT_CLICK)}),this._pickTile=l(function(){m.pickTileActive=!m.pickTileActive}),this._pickTileActiveSubscription=p.getObservable(this,"pickTileActive").subscribe(function(e){e?v.setInputAction(g,o.LEFT_CLICK):v.removeInputAction(o.LEFT_CLICK)}),this._removePostRenderEvent=i.postRender.addEventListener(function(){m._update()})}return i(m.prototype,{scene:{get:function(){return this._scene}},performanceContainer:{get:function(){return this._performanceContainer}},toggleDropDown:{get:function(){return this._toggleDropDown}},showPrimitiveBoundingSphere:{get:function(){return this._showPrimitiveBoundingSphere}},showPrimitiveReferenceFrame:{get:function(){return this._showPrimitiveReferenceFrame}},doFilterPrimitive:{get:function(){return this._doFilterPrimitive}},incrementDepthFrustum:{get:function(){return this._incrementDepthFrustum}},decrementDepthFrustum:{get:function(){return this._decrementDepthFrustum}},showTileCoordinates:{get:function(){return this._showTileCoordinates}},showTileBoundingSphere:{get:function(){return this._showTileBoundingSphere}},doFilterTile:{get:function(){return this._doFilterTile}},toggleGeneral:{get:function(){return this._toggleGeneral}},togglePrimitives:{get:function(){return this._togglePrimitives}},toggleTerrain:{get:function(){return this._toggleTerrain}},pickPrimitive:{get:function(){return this._pickPrimitive}},pickTile:{get:function(){return this._pickTile}},selectParent:{get:function(){var e=this;return l(function(){e.tile=e.tile.parent})}},selectNW:{get:function(){var e=this;return l(function(){e.tile=e.tile.northwestChild})}},selectNE:{get:function(){var e=this;return l(function(){e.tile=e.tile.northeastChild})}},selectSW:{get:function(){var e=this;return l(function(){e.tile=e.tile.southwestChild})}},selectSE:{get:function(){var e=this;return l(function(){e.tile=e.tile.southeastChild})}},primitive:{get:function(){return this._primitive},set:function(i){var t=this._primitive;i!==t&&(this.hasPickedPrimitive=!0,e(t)&&(t.debugShowBoundingVolume=!1),this._scene.debugCommandFilter=void 0,e(this._modelMatrixPrimitive)&&(this._scene.primitives.remove(this._modelMatrixPrimitive),this._modelMatrixPrimitive=void 0),this._primitive=i,i.show=!1,setTimeout(function(){i.show=!0},50),this.showPrimitiveBoundingSphere(),this.showPrimitiveReferenceFrame(),this.doFilterPrimitive())}},tile:{get:function(){return this._tile},set:function(i){if(e(i)){if(this.hasPickedTile=!0,i!==this._tile){this.tileText="L: "+i.level+" X: "+i.x+" Y: "+i.y,this.tileText+="<br>SW corner: "+i.rectangle.west+", "+i.rectangle.south,this.tileText+="<br>NE corner: "+i.rectangle.east+", "+i.rectangle.north;var t=i.data;e(t)?this.tileText+="<br>Min: "+t.minimumHeight+" Max: "+t.maximumHeight:this.tileText+="<br>(Tile is not loaded)"}this._tile=i,this.showTileBoundingSphere(),this.doFilterTile()}else this.hasPickedTile=!1,this._tile=void 0}}}),m.prototype._update=function(){this.frustums&&(this.frustumStatisticText=function(i){var t;if(e(i)){t="Command Statistics";var r=i.commandsInFrustums;for(var s in r)if(r.hasOwnProperty(s)){var n,o=parseInt(s,10);if(7===o)n="1, 2 and 3";else{for(var u=[],c=2;c>=0;c--){var h=Math.pow(2,c);o>=h&&(u.push(c+1),o-=h)}n=u.reverse().join(" and ")}t+="<br>&nbsp;&nbsp;&nbsp;&nbsp;"+r[s]+" in frustum "+n}t+="<br>Total: "+i.totalCommands}return t}(this._scene.debugFrustumStatistics));var i=this._scene.numberOfFrustums;this._numberOfFrustums=i,this.depthFrustum=a(1,i,this.depthFrustum),this.depthFrustumText=this.depthFrustum+" of "+i,this.performance&&this._performanceDisplay.update(),this.primitiveReferenceFrame&&(this._modelMatrixPrimitive.modelMatrix=this._primitive.modelMatrix),this.shaderCacheText="Cached shaders: "+this._scene.context.shaderCache.numberOfShaders},m.prototype.isDestroyed=function(){return!1},m.prototype.destroy=function(){return this._eventHandler.destroy(),this._removePostRenderEvent(),this._frustumsSubscription.dispose(),this._frustumPlanesSubscription.dispose(),this._performanceSubscription.dispose(),this._primitiveBoundingSphereSubscription.dispose(),this._primitiveReferenceFrameSubscription.dispose(),this._filterPrimitiveSubscription.dispose(),this._wireframeSubscription.dispose(),this._globeDepthSubscription.dispose(),this._pickDepthSubscription.dispose(),this._depthFrustumSubscription.dispose(),this._suspendUpdatesSubscription.dispose(),this._tileCoordinatesSubscription.dispose(),this._tileBoundingSphereSubscription.dispose(),this._filterTileSubscription.dispose(),this._pickPrimitiveActiveSubscription.dispose(),this._pickTileActiveSubscription.dispose(),t(this)},m});