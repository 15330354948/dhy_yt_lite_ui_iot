define(["../Core/arraySlice","../Core/Cartesian3","../Core/Color","../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/destroyObject","../Core/Ellipsoid","../Core/IndexDatatype","../Core/OrientedBoundingBox","../Core/Rectangle","../Core/TaskProcessor","../ThirdParty/when","./ClassificationType","./Vector3DTileBatch","./Vector3DTilePrimitive"],function(e,i,t,o,n,s,r,a,d,c,h,_,u,f,p,m){"use strict";function l(e){this._batchTable=e.batchTable,this._batchIds=e.batchIds,this._positions=e.positions,this._counts=e.counts,this._indices=e.indices,this._indexCounts=e.indexCounts,this._indexOffsets=void 0,this._batchTableColors=void 0,this._packedBuffer=void 0,this._batchedPositions=void 0,this._transferrableBatchIds=void 0,this._vertexBatchIds=void 0,this._ellipsoid=o(e.ellipsoid,a.WGS84),this._minimumHeight=e.minimumHeight,this._maximumHeight=e.maximumHeight,this._polygonMinimumHeights=e.polygonMinimumHeights,this._polygonMaximumHeights=e.polygonMaximumHeights,this._center=o(e.center,i.ZERO),this._rectangle=e.rectangle,this._center=void 0,this._boundingVolume=e.boundingVolume,this._boundingVolumes=void 0,this._batchedIndices=void 0,this._ready=!1,this._readyPromise=u.defer(),this._verticesPromise=void 0,this._primitive=void 0,this.debugWireframe=!1,this.forceRebatch=!1,this.classificationType=f.BOTH}s(l.prototype,{trianglesLength:{get:function(){return n(this._primitive)?this._primitive.trianglesLength:0}},geometryByteLength:{get:function(){return n(this._primitive)?this._primitive.geometryByteLength:0}},readyPromise:{get:function(){return this._readyPromise.promise}}});var b=new _("createVectorTilePolygons"),v=new t;function g(o){if(!n(o._primitive)){if(!n(o._verticesPromise)){var s=o._positions,r=o._counts,_=o._indexCounts,f=o._indices,l=o._transferrableBatchIds,g=o._batchTableColors,y=o._packedBuffer;if(!n(g)){s=o._positions=e(o._positions),r=o._counts=e(o._counts),_=o._indexCounts=e(o._indexCounts),f=o._indices=e(o._indices),o._center=o._ellipsoid.cartographicToCartesian(h.center(o._rectangle)),l=o._transferrableBatchIds=new Uint32Array(o._batchIds),g=o._batchTableColors=new Uint32Array(l.length);for(var C=o._batchTable,x=g.length,I=0;I<x;++I){var T=C.getColor(I,v);g[I]=T.toRgba()}y=o._packedBuffer=function(e){var t=new Float64Array(3+i.packedLength+a.packedLength+h.packedLength),o=0;return t[o++]=e._indices.BYTES_PER_ELEMENT,t[o++]=e._minimumHeight,t[o++]=e._maximumHeight,i.pack(e._center,t,o),o+=i.packedLength,a.pack(e._ellipsoid,t,o),o+=a.packedLength,h.pack(e._rectangle,t,o),t}(o)}var B=[s.buffer,r.buffer,_.buffer,f.buffer,l.buffer,g.buffer,y.buffer],H={packedBuffer:y.buffer,positions:s.buffer,counts:r.buffer,indexCounts:_.buffer,indices:f.buffer,batchIds:l.buffer,batchTableColors:g.buffer},k=o._polygonMinimumHeights,w=o._polygonMaximumHeights;n(k)&&n(w)&&(k=e(k),w=e(w),B.push(k.buffer,w.buffer),H.minimumHeights=k,H.maximumHeights=w);var P=o._verticesPromise=b.scheduleTask(H,B);if(!n(P))return;u(P,function(e){o._positions=void 0,o._counts=void 0,o._polygonMinimumHeights=void 0,o._polygonMaximumHeights=void 0;var i=new Float64Array(e.packedBuffer),n=i[0];!function(e,i){for(var o=1,n=i[o++],s=e._boundingVolumes=new Array(n),r=0;r<n;++r)s[r]=c.unpack(i,o),o+=c.packedLength;for(var a=i[o++],d=e._batchedIndices=new Array(a),h=0;h<a;++h){var _=t.unpack(i,o);o+=t.packedLength;for(var u=i[o++],f=i[o++],m=i[o++],l=new Array(m),b=0;b<m;++b)l[b]=i[o++];d[h]=new p({color:_,offset:u,count:f,batchIds:l})}}(o,i),o._indices=2===d.getSizeInBytes(n)?new Uint16Array(e.indices):new Uint32Array(e.indices),o._indexOffsets=new Uint32Array(e.indexOffsets),o._indexCounts=new Uint32Array(e.indexCounts),o._batchedPositions=new Float32Array(e.positions),o._vertexBatchIds=new Uint16Array(e.batchIds),o._ready=!0})}o._ready&&!n(o._primitive)&&(o._primitive=new m({batchTable:o._batchTable,positions:o._batchedPositions,batchIds:o._batchIds,vertexBatchIds:o._vertexBatchIds,indices:o._indices,indexOffsets:o._indexOffsets,indexCounts:o._indexCounts,batchedIndices:o._batchedIndices,boundingVolume:o._boundingVolume,boundingVolumes:o._boundingVolumes,center:o._center}),o._batchTable=void 0,o._batchIds=void 0,o._positions=void 0,o._counts=void 0,o._indices=void 0,o._indexCounts=void 0,o._indexOffsets=void 0,o._batchTableColors=void 0,o._packedBuffer=void 0,o._batchedPositions=void 0,o._transferrableBatchIds=void 0,o._vertexBatchIds=void 0,o._ellipsoid=void 0,o._minimumHeight=void 0,o._maximumHeight=void 0,o._polygonMinimumHeights=void 0,o._polygonMaximumHeights=void 0,o._center=void 0,o._rectangle=void 0,o._boundingVolume=void 0,o._boundingVolumes=void 0,o._batchedIndices=void 0,o._verticesPromise=void 0,o._readyPromise.resolve())}}return l.prototype.createFeatures=function(e,i){this._primitive.createFeatures(e,i)},l.prototype.applyDebugSettings=function(e,i){this._primitive.applyDebugSettings(e,i)},l.prototype.applyStyle=function(e,i){this._primitive.applyStyle(e,i)},l.prototype.updateCommands=function(e,i){this._primitive.updateCommands(e,i)},l.prototype.update=function(e){g(this),this._ready&&(this._primitive.debugWireframe=this.debugWireframe,this._primitive.forceRebatch=this.forceRebatch,this._primitive.classificationType=this.classificationType,this._primitive.update(e))},l.prototype.isDestroyed=function(){return!1},l.prototype.destroy=function(){return this._primitive=this._primitive&&this._primitive.destroy(),r(this)},l});