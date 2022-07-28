define(["../Core/arraySlice","../Core/Cartesian3","../Core/Color","../Core/ComponentDatatype","../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/destroyObject","../Core/Ellipsoid","../Core/FeatureDetection","../Core/IndexDatatype","../Core/Matrix4","../Core/Rectangle","../Core/TaskProcessor","../Renderer/Buffer","../Renderer/BufferUsage","../Renderer/DrawCommand","../Renderer/Pass","../Renderer/RenderState","../Renderer/ShaderProgram","../Renderer/ShaderSource","../Renderer/VertexArray","../Shaders/PolylineCommon","../Shaders/Vector3DTilePolylinesVS","../ThirdParty/when","./BlendingState","./PGEarth3DTileFeature"],function(e,t,r,i,o,n,s,a,d,h,c,_,u,f,p,l,v,g,m,y,b,x,P,A,C,T,I){"use strict";function B(e){this._positions=e.positions,this._widths=e.widths,this._counts=e.counts,this._batchIds=e.batchIds,this._ellipsoid=o(e.ellipsoid,d.WGS84),this._minimumHeight=e.minimumHeight,this._maximumHeight=e.maximumHeight,this._center=e.center,this._rectangle=e.rectangle,this._boundingVolume=e.boundingVolume,this._batchTable=e.batchTable,this._va=void 0,this._sp=void 0,this._rs=void 0,this._uniformMap=void 0,this._command=void 0,this._transferrableBatchIds=void 0,this._packedBuffer=void 0,this._currentPositions=void 0,this._previousPositions=void 0,this._nextPositions=void 0,this._expandAndWidth=void 0,this._vertexBatchIds=void 0,this._indices=void 0,this._constantColor=r.clone(r.WHITE),this._highlightColor=this._constantColor,this._trianglesLength=0,this._geometryByteLength=0,this._ready=!1,this._readyPromise=C.defer(),this._verticesPromise=void 0}s(B.prototype,{trianglesLength:{get:function(){return this._trianglesLength}},geometryByteLength:{get:function(){return this._geometryByteLength}},readyPromise:{get:function(){return this._readyPromise.promise}}});var S=new f("createVectorTilePolylines"),L={previousPosition:0,currentPosition:1,nextPosition:2,expandAndWidth:3,a_batchId:4};function w(r,o){if(!n(r._va)){if(!n(r._verticesPromise)){var s=r._positions,a=r._widths,h=r._counts,_=r._transferrableBatchIds,f=r._packedBuffer;n(f)||(s=r._positions=e(s),a=r._widths=e(a),h=r._counts=e(h),_=r._transferrableBatchIds=e(r._batchIds),f=r._packedBuffer=function(e){var r=e._rectangle,i=e._minimumHeight,o=e._maximumHeight,n=e._ellipsoid,s=e._center,a=2+u.packedLength+d.packedLength+t.packedLength,h=new Float64Array(a),c=0;return h[c++]=i,h[c++]=o,u.pack(r,h,c),c+=u.packedLength,d.pack(n,h,c),c+=d.packedLength,t.pack(s,h,c),h}(r));var v=[s.buffer,a.buffer,h.buffer,_.buffer,f.buffer],g={positions:s.buffer,widths:a.buffer,counts:h.buffer,batchIds:_.buffer,packedBuffer:f.buffer},m=r._verticesPromise=S.scheduleTask(g,v);if(!n(m))return;C(m,function(e){r._currentPositions=new Float32Array(e.currentPositions),r._previousPositions=new Float32Array(e.previousPositions),r._nextPositions=new Float32Array(e.nextPositions),r._expandAndWidth=new Float32Array(e.expandAndWidth),r._vertexBatchIds=new Uint16Array(e.batchIds);var t=e.indexDatatype;r._indices=t===c.UNSIGNED_SHORT?new Uint16Array(e.indices):new Uint32Array(e.indices),r._ready=!0})}if(r._ready&&!n(r._va)){var y=r._currentPositions,b=r._previousPositions,P=r._nextPositions,A=r._expandAndWidth,T=r._vertexBatchIds,I=r._indices,B=b.byteLength+y.byteLength+P.byteLength;B+=A.byteLength+T.byteLength+I.byteLength,r._trianglesLength=I.length/3,r._geometryByteLength=B;var w=p.createVertexBuffer({context:o,typedArray:b,usage:l.STATIC_DRAW}),D=p.createVertexBuffer({context:o,typedArray:y,usage:l.STATIC_DRAW}),R=p.createVertexBuffer({context:o,typedArray:P,usage:l.STATIC_DRAW}),k=p.createVertexBuffer({context:o,typedArray:A,usage:l.STATIC_DRAW}),E=p.createVertexBuffer({context:o,typedArray:T,usage:l.STATIC_DRAW}),V=p.createIndexBuffer({context:o,typedArray:I,usage:l.STATIC_DRAW,indexDatatype:2===I.BYTES_PER_ELEMENT?c.UNSIGNED_SHORT:c.UNSIGNED_INT}),W=[{index:L.previousPosition,vertexBuffer:w,componentDatatype:i.FLOAT,componentsPerAttribute:3},{index:L.currentPosition,vertexBuffer:D,componentDatatype:i.FLOAT,componentsPerAttribute:3},{index:L.nextPosition,vertexBuffer:R,componentDatatype:i.FLOAT,componentsPerAttribute:3},{index:L.expandAndWidth,vertexBuffer:k,componentDatatype:i.FLOAT,componentsPerAttribute:2},{index:L.a_batchId,vertexBuffer:E,componentDatatype:i.UNSIGNED_SHORT,componentsPerAttribute:1}];r._va=new x({context:o,attributes:W,indexBuffer:V}),r._positions=void 0,r._widths=void 0,r._counts=void 0,r._ellipsoid=void 0,r._minimumHeight=void 0,r._maximumHeight=void 0,r._rectangle=void 0,r._transferrableBatchIds=void 0,r._packedBuffer=void 0,r._currentPositions=void 0,r._previousPositions=void 0,r._nextPositions=void 0,r._expandAndWidth=void 0,r._vertexBatchIds=void 0,r._indices=void 0,r._readyPromise.resolve()}}}var D=new _,R=new t;var k="uniform vec4 u_highlightColor; \nvoid main()\n{\n    gl_FragColor = u_highlightColor;\n}\n";B.prototype.createFeatures=function(e,t){for(var r=this._batchIds,i=r.length,o=0;o<i;++o){var n=r[o];t[n]=new I(e,n)}},B.prototype.applyDebugSettings=function(e,t){this._highlightColor=e?t:this._constantColor};var E=new r,V=r.WHITE;return B.prototype.applyStyle=function(e,t){if(n(e))for(var i=this._batchIds,o=i.length,s=0;s<o;++s){var a=t[i[s]];a.color=n(e.color)?e.color.evaluateColor(a,E):V,a.show=!n(e.show)||e.show.evaluate(a)}else!function(e,t){for(var i=e._batchIds,o=i.length,n=0;n<o;++n){var s=t[i[n]];s.show=!0,s.color=r.WHITE}}(this,t)},B.prototype.update=function(e){var t,r=e.context;if(w(this,r),function(e,t){n(e._uniformMap)||(e._uniformMap={u_modifiedModelView:function(){var r=t.uniformState.view;return _.clone(r,D),_.multiplyByPoint(D,e._center,R),_.setTranslation(D,R,D),D},u_highlightColor:function(){return e._highlightColor}})}(this,r),function(e,t){if(!n(e._sp)){var r=e._batchTable,i=r.getVertexShaderCallback(!1,"a_batchId",void 0)(A),o=r.getFragmentShaderCallback()(k,!1,void 0),s=new b({defines:["VECTOR_TILE",h.isInternetExplorer()?"":"CLIP_POLYLINE"],sources:[P,i]}),a=new b({defines:["VECTOR_TILE"],sources:[o]});e._sp=y.fromCache({context:t,vertexShaderSource:s,fragmentShaderSource:a,attributeLocations:L})}}(this,r),n((t=this)._rs)||(t._rs=m.fromCache({blending:T.ALPHA_BLEND,depthMask:!1,depthTest:{enabled:!0},polygonOffset:{enabled:!0,factor:-5,units:-5}})),this._ready){var i=e.passes;(i.render||i.pick)&&function(e,t){if(!n(e._command)){var r=e._batchTable.getUniformMapCallback()(e._uniformMap);e._command=new v({owner:e,vertexArray:e._va,renderState:e._rs,shaderProgram:e._sp,uniformMap:r,boundingVolume:e._boundingVolume,pass:g.TRANSLUCENT,pickId:e._batchTable.getPickId()})}t.commandList.push(e._command)}(this,e)}},B.prototype.isDestroyed=function(){return!1},B.prototype.destroy=function(){return this._va=this._va&&this._va.destroy(),this._sp=this._sp&&this._sp.destroy(),a(this)},B});