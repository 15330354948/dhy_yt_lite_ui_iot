define(["../Core/Color","../Core/combine","../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/destroyObject","../Core/DeveloperError","../Core/FeatureDetection","../Core/Math","../Renderer/Pass","../Renderer/ShaderSource","./PGEarth3DTileBatchTable","./PGEarth3DTileFeature","./PGEarth3DTileRefine","./PointCloud","./PointCloudShading","./SceneMode"],function(t,e,i,n,r,o,a,u,c,h,s,l,d,p,b,_,g){"use strict";function f(t,i,r,o,a){var u;this._tileset=t,this._tile=i,this._resource=r,this._pickId=void 0,this._batchTable=void 0,this._styleDirty=!1,this._features=void 0,this.featurePropertiesDirty=!1,this._pointCloud=new b({arrayBuffer:o,byteOffset:a,cull:!1,opaquePass:h.PGEARTH_3D_TILE,vertexShaderLoaded:(u=this,function(t){return n(u._batchTable)?u._batchTable.getVertexShaderCallback(!1,"a_batchId",void 0)(t):t}),fragmentShaderLoaded:function(t){return function(e){return n(t._batchTable)?t._batchTable.getFragmentShaderCallback(!1,void 0)(e):"uniform vec4 czm_pickColor;\n"+e}}(this),uniformMapLoaded:function(t){return function(i){return n(t._batchTable)?t._batchTable.getUniformMapCallback()(i):e(i,{czm_pickColor:function(){return t._pickId.color}})}}(this),batchTableLoaded:function(t){return function(e,i,n){t._batchTable=new l(t,e,i,n)}}(this),pickIdLoaded:function(t){return function(){return n(t._batchTable)?t._batchTable.getPickId():"czm_pickColor"}}(this)})}r(f.prototype,{featuresLength:{get:function(){return n(this._batchTable)?this._batchTable.featuresLength:0}},pointsLength:{get:function(){return this._pointCloud.pointsLength}},trianglesLength:{get:function(){return 0}},geometryByteLength:{get:function(){return this._pointCloud.geometryByteLength}},texturesByteLength:{get:function(){return 0}},batchTableByteLength:{get:function(){return n(this._batchTable)?this._batchTable.memorySizeInBytes:0}},innerContents:{get:function(){}},readyPromise:{get:function(){return this._pointCloud.readyPromise}},tileset:{get:function(){return this._tileset}},tile:{get:function(){return this._tile}},url:{get:function(){return this._resource.getUrlComponent(!0)}},batchTable:{get:function(){return this._batchTable}}}),f.prototype.hasProperty=function(t,e){return!!n(this._batchTable)&&this._batchTable.hasProperty(t,e)},f.prototype.getFeature=function(t){if(n(this._batchTable)){var e=this.featuresLength;if(!n(t)||t<0||t>=e)throw new a("batchId is required and between zero and featuresLength - 1 ("+(e-1)+").");return function(t){var e=t.featuresLength;if(!n(t._features)&&e>0){for(var i=new Array(e),r=0;r<e;++r)i[r]=new d(t,r);t._features=i}}(this),this._features[t]}},f.prototype.applyDebugSettings=function(e,i){this._pointCloud.color=e?i:t.WHITE},f.prototype.applyStyle=function(t){n(this._batchTable)?this._batchTable.applyStyle(t):this._styleDirty=!0};var m=new _;return f.prototype.update=function(t,e){var r,o=this._pointCloud,a=i(t.pointCloudShading,m),u=this._tile,h=this._batchTable,s=e.mode,l=t.clippingPlanes;n(this._pickId)||n(h)||(this._pickId=e.context.createPickId({primitive:t,content:this})),n(h)&&h.update(t,e),r=n(u._contentBoundingVolume)?s===g.SCENE3D?u._contentBoundingVolume.boundingSphere:u._contentBoundingVolume2D.boundingSphere:s===g.SCENE3D?u._boundingVolume.boundingSphere:u._boundingVolume2D.boundingSphere;var d=this._styleDirty;this._styleDirty=!1,o.clippingPlanesOriginMatrix=t.clippingPlanesOriginMatrix,o.style=n(h)?void 0:t.style,o.styleDirty=d,o.modelMatrix=u.computedTransform,o.time=t.timeSinceLoad,o.shadows=t.shadows,o.boundingSphere=r,o.clippingPlanes=l,o.isClipped=n(l)&&l.enabled&&u._isClipped,o.clippingPlanesDirty=u.clippingPlanesDirty,o.attenuation=a.attenuation,o.backFaceCulling=a.backFaceCulling,o.normalShading=a.normalShading,o.geometricError=function(t){var e=t._tileset.pointCloudShading,i=t._tile.contentBoundingVolume.boundingSphere.volume(),r=c.cbrt(i/t.pointsLength),o=t._tile.geometricError;return 0===o&&(o=n(e)&&n(e.baseResolution)?e.baseResolution:r),o}(this),o.geometricErrorScale=a.geometricErrorScale,n(a)&&n(a.maximumAttenuation)?o.maximumAttenuation=a.maximumAttenuation:u.refine===p.ADD?o.maximumAttenuation=5:o.maximumAttenuation=t.maximumScreenSpaceError,o.update(e)},f.prototype.isDestroyed=function(){return!1},f.prototype.destroy=function(){return this._pickId=this._pickId&&this._pickId.destroy(),this._pointCloud=this._pointCloud&&this._pointCloud.destroy(),this._batchTable=this._batchTable&&this._batchTable.destroy(),o(this)},f});