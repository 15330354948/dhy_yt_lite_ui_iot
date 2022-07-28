define(["../../Core/AxisAlignedBoundingBox","../../Core/BoundingRectangle","../../Core/BoundingSphere","../../Core/buildModuleUrl","../../Core/Cartesian2","../../Core/Cartesian3","../../Core/Cartesian4","../../Core/Cartographic","../../Core/Check","../../Core/Color","../../Core/ComponentDatatype","../../Core/defaultValue","../../Core/defined","../../Core/defineProperties","../../Core/DeveloperError","../../Core/destroyObject","../../Core/Event","../../Core/getBaseUri","../../Core/getExtensionFromUri","../../Core/Geometry","../../Core/GeometryAttribute","../../Core/GeometryAttributes","../../Core/isArray","../../Core/isDataUri","../../Core/Intersect","../../Core/JulianDate","../../Core/Math","../../Core/Matrix4","../../Core/OrthographicOffCenterFrustum","../../Core/PerspectiveFrustum","../../Core/PixelFormat","../../Core/Plane","../../Core/PolygonGeometry","../../Core/PrimitiveType","../../Core/Rectangle","../../Core/RequestType","../../Core/Resource","../../Core/TaskProcessor","../../Core/Transforms","../../Renderer/Buffer","../../Renderer/BufferUsage","../../Renderer/ClearCommand","../../Renderer/DrawCommand","../../Renderer/Framebuffer","../../Renderer/Pass","../../Renderer/PassState","../../Renderer/PixelDatatype","../../Renderer/RenderState","../../Renderer/Sampler","../../Renderer/ShaderProgram","../../Renderer/ShaderSource","../../Renderer/Texture","../../Renderer/TextureMagnificationFilter","../../Renderer/TextureMinificationFilter","../../Renderer/TextureWrap","../../Renderer/VertexArray","../../Scene/ClippingPlaneCollection","../../Scene/CullFace","../../Scene/ShadowMode","../../Shaders/PolygonDepthFS","../../Shaders/PolygonDepthVS","../../ThirdParty/proj4","../../ThirdParty/when","./epsg2proj4","./PGELoadStatus","./PGMath","./PGPageLODNode","./PGPolygonDepth","./PGUtility","../../Core/createGuid"],function(e,t,r,o,i,n,a,s,l,u,h,m,d,c,p,y,_,f,g,v,x,w,T,b,C,P,S,B,D,F,A,R,U,L,M,E,I,V,N,O,z,G,j,W,q,k,H,X,J,Y,Z,K,Q,$,ee,te,re,oe,ie,ne,ae,se,le,ue,he,me,de,ce,pe,ye){"use strict";function _e(t){var o,n=(t=m(t,m.EMPTY_OBJECT)).url;if("json"===g(n))n,o=f(n,!0);else if(b(n))n,o="";else{o=n,I.createIfNeeded(o).getDerivedResource({url:""}).url}this._url=n,this.name=t.name,this._maximumMemoryUsage=m(t.maximumMemoryUsage,1073741824),this._readyPromise=le.defer(),this.shadows=m(t.shadows,ie.ENABLED),this.show=m(t.show,!0),this.nodes=[],this.frustum=new F,this.viewPort=new a,this.matLocal=new B,this.matLocalInvert=new B,this.matVPW=new B,this.pixelSizeVector=new a,this.lastAccessFrame=0,this.lastAccessTime=0,this.maxHttpRequestNum=2,this.curHttpRequestNum=0,this.maxTexRequestNum=2,this.curTexRequestNum=0,this.maxNodeParseThreadNum=2,this.curNodeParseThreadNum=0,this.curLoadingNode=0,this._boundingSphere=new r,this._boundingBox=new e,this._position=t.position,this._ready=!1,this._srs=void 0,this._metaOrg=void 0,this._texturesByteLength=0,this._geometryByteLength=0,this._defautTexture=void 0,this._flattenPolygons=[],this._flattenBounds=new a,this._polygonDepth=void 0,this._needUpateFlatten=!1,this._clippingPlanes=new re,this._packedClippingPlanes=[],this._clipPolygons=[],this._clipBounds=new a,this._clipDirty=!1,this._clipFramebuffer=void 0,this._pitPolygons=[],this._pitBounds=new a,this._pitDirty=!1,this._pitFramebuffer=void 0,this._colorTable=void 0,this._colorTexture=void 0,this._colorRange=new i,this._displayMode=2,this._overlayImageLayer=void 0,this._overlayBounds=void 0,this._overlayRect=void 0,this._tilesInOverlay=[],this._overlayFramebuffer=void 0,this._overlayVertShaderSource=void 0,this._overlayFragShaderSource=void 0,this._overlayShaderPrograms=[],this._overlayTileCommand=void 0,this._overlayTileUniforms=[],this._lastViewMatrix=void 0,this._lastProjectionMatrix=void 0,this._loadTimestamp=void 0,this._compress=!1,this._type="pageLOD",this._uuid=ye(),this.pageType="",this._baseUrl=null,this.NodeMesh=[],this._progressEvent=new _,this.nodeCount=0,this._distanceToCamera=0,this._tileVisibleDistance=m(t.tileVisibleDistance,2e6),this._transparency=1,this._pixelFormat="RGB",this.useStorage=!1,this._subdomains=t.subdomains,T(this._subdomains)?this._subdomains=this._subdomains.slice():d(this._subdomains)&&this._subdomains.length>0?this._subdomains=this._subdomains.split(""):this._subdomains=["a","b","c"];var s=this;le(t.url).then(function(e){var t=I.createIfNeeded(e);return t.setQueryParameters({uuid:s._uuid}),t.fetchJson()}).then(function(e){le(t.url).then(function(t){var r,o=new I({url:t,templateValues:{s:s._subdomains[0]},queryParameters:{uuid:s._uuid}});"json"===(o=o.getDerivedResource({url:e.data})).extension?r=o.getBaseUri(!0):o.isDataUri&&(r=""),s._baseUrl=r||t;var i=o.fetchJson();d(i)&&le(i,function(e){return s.isDestroyed()?le.reject("tileset is destroyed"):(s.loadNode(s._baseUrl,e),void s._readyPromise.resolve(s))},function(e){s._readyPromise.reject(e)})})})}function fe(e,t,r){var o,i=e.length,s=0;for(d(r)?(s=r.length,r.length=i):r=new Array(i),o=s;o<i;++o)r[o]=new a;var l=new B,u=B.multiply(t,e.modelMatrix,l),h=new R(n.UNIT_X,0);for(o=0;o<i;++o){var m=e.get(o),c=r[o];n.clone(m.normal,h.normal),h.distance=m.distance,R.transform(h,u,h),n.clone(h.normal,c),c.w=h.distance}return r}function ge(e,o){if(e._clipDirty&&0!=e._clipPolygons.length){var i=o.context,a=i.uniformState,s=X.fromCache({depthTest:{enabled:!1},cull:{enabled:!0,face:oe.BACK}}),l=Y.fromCache({context:i,vertexShaderSource:"attribute vec3 position;\nvoid main()\n{\n    vec4 pos = vec4(position.xy, 0.0, 1.0);\n    gl_Position = czm_projection*pos;\n\n}",fragmentShaderSource:"void main()\n{\n      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}"}),h=new B;B.inverse(e.m_matLocal,h);for(var m=[],c=[],p=0;p<e._clipPolygons.length;++p){var y=e._clipPolygons[p];if(!d(y.show)||y.show){for(var _=U.createGeometry(y),f=_.attributes.position.values,g=0,v=f.length/3;g<v;++g){var x=new n(0,0,0);x.x=f[3*g],x.y=f[3*g+1],x.z=f[3*g+2],B.multiplyByPoint(h,x,x),c.push(x),_.attributes.position.values[3*g]=x.x,_.attributes.position.values[3*g+1]=x.y,_.attributes.position.values[3*g+2]=x.z}var w=new r;w=r.transform(_.boundingSphere,h,w),_.boundingSphere=w;var T=te.fromGeometry({context:i,geometry:_,bufferUsage:z.STATIC_DRAW,interleave:!0}),b=new j({boundingVolume:w,primitiveType:L.TRIANGLES,vertexArray:T,shaderProgram:l,renderState:s,pass:q.PGEARTH_3D_TILE});m.push(b)}}var C=4096,P=4096,S=new t;if(t.fromPoints(c,S),e._clipBounds.x=S.x-S.width/C,e._clipBounds.y=S.y+S.height+S.height/P,e._clipBounds.z=S.x+S.width+S.width/C,e._clipBounds.w=S.y-S.height/P,!d(e._clipFramebuffer)){var F=new K({context:i,width:C,height:P,pixelFormat:A.RGB,pixelDatatype:H.UNSIGNED_BYTE});e._clipFramebuffer=new W({context:i,colorTextures:[F],destroyAttachments:!1})}var R=new D;R.left=e._clipBounds.x,R.top=e._clipBounds.y,R.right=e._clipBounds.z,R.bottom=e._clipBounds.w,a.updateFrustum(R);var M=new k(i);M.framebuffer=e._clipFramebuffer,M.viewport=new t(0,0,C,P),new G({color:new u(0,0,0,0)}).execute(i,M);for(p=0;p<m.length;p++){b=m[p];a.updatePass(b.pass),b.execute(i,M)}e._clipDirty=!1}}function ve(e,o){if(e._pitDirty&&0!=e._pitPolygons.length){var i=o.context,a=i.uniformState,s=X.fromCache({depthTest:{enabled:!1},cull:{enabled:!0,face:oe.BACK}}),l=Y.fromCache({context:i,vertexShaderSource:"attribute vec3 position;\nvoid main()\n{\n    vec4 pos = vec4(position.xy, 0.0, 1.0);\n    gl_Position = czm_projection*pos;\n\n}",fragmentShaderSource:"void main()\n{\n      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}"}),h=new B;B.inverse(e.m_matLocal,h);for(var m=[],c=[],p=0;p<e._pitPolygons.length;++p){var y=e._pitPolygons[p];if(!d(y.show)||y.show){for(var _=U.createGeometry(y),f=_.attributes.position.values,g=0,v=f.length/3;g<v;++g){var x=new n(0,0,0);x.x=f[3*g],x.y=f[3*g+1],x.z=f[3*g+2],B.multiplyByPoint(h,x,x),c.push(x),_.attributes.position.values[3*g]=x.x,_.attributes.position.values[3*g+1]=x.y,_.attributes.position.values[3*g+2]=x.z}var w=new r;w=r.transform(_.boundingSphere,h,w),_.boundingSphere=w;var T=te.fromGeometry({context:i,geometry:_,bufferUsage:z.STATIC_DRAW,interleave:!0}),b=new j({boundingVolume:w,primitiveType:L.TRIANGLES,vertexArray:T,shaderProgram:l,renderState:s,pass:q.PGEARTH_3D_TILE});m.push(b)}}var C=4096,P=4096,S=new t;if(t.fromPoints(c,S),e._pitBounds.x=S.x-S.width/C,e._pitBounds.y=S.y+S.height+S.height/P,e._pitBounds.z=S.x+S.width+S.width/C,e._pitBounds.w=S.y-S.height/P,!d(e._pitFramebuffer)){var F=new K({context:i,width:C,height:P,pixelFormat:A.RGB,pixelDatatype:H.UNSIGNED_BYTE});e._pitFramebuffer=new W({context:i,colorTextures:[F],destroyAttachments:!1})}var R=new D;R.left=e._pitBounds.x,R.top=e._pitBounds.y,R.right=e._pitBounds.z,R.bottom=e._pitBounds.w,a.updateFrustum(R);var M=new k(i);M.framebuffer=e._pitFramebuffer,M.viewport=new t(0,0,C,P),new G({color:new u(0,0,0,0)}).execute(i,M);for(p=0;p<m.length;p++){b=m[p];a.updatePass(b.pass),b.execute(i,M)}e._pitDirty=!1}}function xe(e,t){!d(e._overlayImageLayer)||!e._overlayImageLayer.show||e._boundingSphere.radius<=0||(we(e,t),e._overlayBounds.z-e._overlayBounds.x<=1e-6||e._overlayBounds.y-e._overlayBounds.w<=1e-6||(function(e,t,r){if(r._tilesInOverlay.length=0,d(e._levelZeroTiles)){var o=[],i=new n(r._overlayBounds.x,r._overlayBounds.w,0);B.multiplyByPoint(r.m_matLocal,i,i),o.push(s.fromCartesian(i)),n.fromElements(r._overlayBounds.x,r._overlayBounds.y,0,i),B.multiplyByPoint(r.m_matLocal,i,i),o.push(s.fromCartesian(i)),n.fromElements(r._overlayBounds.z,r._overlayBounds.w,0,i),B.multiplyByPoint(r.m_matLocal,i,i),o.push(s.fromCartesian(i)),n.fromElements(r._overlayBounds.z,r._overlayBounds.y,0,i),B.multiplyByPoint(r.m_matLocal,i,i),o.push(s.fromCartesian(i)),r._overlayRect=M.fromCartographicArray(o,r._overlayRect);for(var a,l=e._levelZeroTiles,u=0,h=l.length;u<h;++u)(a=l[u]).renderable&&d(M.intersection(r._overlayRect,a.rectangle,Pe))&&Te(e,t,a,r)}}(t.camera._scene.globe._surface,t,e),0!=e._tilesInOverlay.length&&Ce(e,t)))}function we(e,r){var o=r.camera;if(!B.equals(e._lastViewMatrix,o.viewMatrix)||!B.equals(e._lastProjectionMatrix,o.frustum.projectionMatrix)){e._lastViewMatrix=o.viewMatrix.clone(e._lastViewMatrix),e._lastProjectionMatrix=o.frustum.projectionMatrix.clone(e._lastProjectionMatrix);var s=new B;B.inverse(e.m_matLocal,s);var l=e._boundingBox.minimum.z,u=r.cullingVolume.planes,h=new R(n.UNIT_Z,0);R.fromCartesian4(u[0],h),R.transform(h,s,h);var m=[h.normal.x,h.normal.y,h.normal.z*l+h.distance];R.fromCartesian4(u[1],h),R.transform(h,s,h);var d=[h.normal.x,h.normal.y,h.normal.z*l+h.distance];R.fromCartesian4(u[2],h),R.transform(h,s,h);var c=[h.normal.x,h.normal.y,h.normal.z*l+h.distance];R.fromCartesian4(u[3],h),R.transform(h,s,h);var p=[h.normal.x,h.normal.y,h.normal.z*l+h.distance],y=[],_=c[0]*m[1]-c[1]*m[0];y[0]=new i((m[2]*c[1]-m[1]*c[2])/_,(m[0]*c[2]-m[2]*c[0])/_),_=c[0]*d[1]-c[1]*d[0],y[1]=new i((d[2]*c[1]-d[1]*c[2])/_,(d[0]*c[2]-d[2]*c[0])/_);var f=o.frustum._offCenterFrustum,g=new n(f.left,f.bottom,f.near);B.multiplyByPoint(o.inverseViewMatrix,g,g),B.multiplyByPoint(s,g,g),(y[0].x-g.x)*(y[1].y-g.y)-(y[0].y-g.y)*(y[1].x-g.x)<0&&(c[2]=-c[0]*g.x-c[1]*g.y,_=c[0]*m[1]-c[1]*m[0],y[0].x=(m[2]*c[1]-m[1]*c[2])/_,y[0].y=(m[0]*c[2]-m[2]*c[0])/_,_=c[0]*d[1]-c[1]*d[0],y[1].x=(d[2]*c[1]-d[1]*c[2])/_,y[1].y=(d[0]*c[2]-d[2]*c[0])/_);var v=!0;0==p[0]&&0==p[1]||(_=p[0]*d[1]-p[1]*d[0],y[2]=new i((d[2]*p[1]-d[1]*p[2])/_,(d[0]*p[2]-d[2]*p[0])/_),(y[0].x-y[2].x)*(y[1].y-y[2].y)-(y[0].y-y[2].y)*(y[1].x-y[2].x)>=0&&(v=!1)),v&&(R.fromCartesian4(u[5],h),R.transform(h,s,h),_=(p=[h.normal.x,h.normal.y,h.normal.z*l+h.distance])[0]*d[1]-p[1]*d[0],y[2].x=(d[2]*p[1]-d[1]*p[2])/_,y[2].y=(d[0]*p[2]-d[2]*p[0])/_),_=p[0]*m[1]-p[1]*m[0],y[3]=new i((m[2]*p[1]-m[1]*p[2])/_,(m[0]*p[2]-m[2]*p[0])/_);for(var x=[],w=[e._boundingBox.minimum.x,e._boundingBox.minimum.y,e._boundingBox.maximum.x,e._boundingBox.maximum.y],T=[w[0],w[1],w[2],w[1],w[2],w[3],w[0],w[3]],b=0;b<4;++b){for(var C=0;C<4;++C){var P=y[C],S=y[C+1<4?C+1:0];if((P.x-T[2*b])*(S.y-T[2*b+1])-(P.y-T[2*b+1])*(S.x-T[2*b])<0)break}4==C&&x.push(new i(T[2*b],T[2*b+1]))}if(4==x.length)e._overlayBounds=a.fromElements(w[0],w[3],w[2],w[1],e._overlayBounds);else{for(var D=new i,F=new i,A=[c,d,p,m],U=(b=0,y.length);b<U;++b){P=y[b],S=y[b+1<U?b+1:0];if(!(P.x>=w[0]&&P.x<=w[2]&&P.y>=w[1]&&P.y<=w[3]&&(x.push(P),S.x>=w[0]&&S.x<=w[2]&&S.y>=w[1]&&S.y<=w[3]))){var L=A[b];if(0!=L[1]){var M=new i(w[0],-(L[0]*w[0]+L[2])/L[1]);M.y>w[1]&&M.y<w[3]&&(i.subtract(M,P,D),i.subtract(M,S,F),i.dot(D,F)<=0&&x.push(M));var E=new i(w[2],-(L[0]*w[2]+L[2])/L[1]);E.y>w[1]&&E.y<w[3]&&(i.subtract(E,P,D),i.subtract(E,S,F),i.dot(D,F)<=0&&x.push(E))}if(0!=L[0]){var I=new i(-(L[1]*w[1]+L[2])/L[0],w[1]);I.x>w[0]&&I.x<w[3]&&(i.subtract(I,P,D),i.subtract(I,S,F),i.dot(D,F)<=0&&x.push(I));var V=new i(-(L[1]*w[3]+L[2])/L[0],w[3]);V.x>w[0]&&V.x<w[3]&&(i.subtract(V,P,D),i.subtract(V,S,F),i.dot(D,F)<=0&&x.push(V))}}}var N=t.fromPoints(x);e._overlayBounds=a.fromElements(N.x,N.y+N.height,N.x+N.width,N.y,e._overlayBounds)}}}function Te(e,t,r,o){if(function(e,t,r){var o=e._tileProvider.getLevelMaximumGeometricError(r.level),i=r._distance,n=t.context.drawingBufferHeight,a=t.camera.frustum.sseDenominator;return o*n/(i*a)}(e,t,r)<e.maximumScreenSpaceError)o._tilesInOverlay.push(r);else{var i=r.southwestChild,n=r.southeastChild,a=r.northwestChild,s=r.northeastChild,l=i.renderable&&n.renderable&&a.renderable&&s.renderable,u=i.upsampledFromParent&&n.upsampledFromParent&&a.upsampledFromParent&&s.upsampledFromParent;l?u?o._tilesInOverlay.push(r):function(e,t,r,o,i,n,a){var s=n.camera.positionCartographic,l=e._tileProvider;s.longitude<t.rectangle.east?s.latitude<t.rectangle.north?(be(e,t,l,n,a),be(e,r,l,n,a),be(e,o,l,n,a),be(e,i,l,n,a)):(be(e,o,l,n,a),be(e,t,l,n,a),be(e,i,l,n,a),be(e,r,l,n,a)):s.latitude<t.rectangle.north?(be(e,r,l,n,a),be(e,t,l,n,a),be(e,i,l,n,a),be(e,o,l,n,a)):(be(e,i,l,n,a),be(e,o,l,n,a),be(e,r,l,n,a),be(e,t,l,n,a))}(e,i,n,a,s,t,o):o._tilesInOverlay.push(r)}}function be(e,t,r,o,i){d(M.intersection(i._overlayRect,t.rectangle,Pe))&&Te(e,o,t,i)}function Ce(e,r){var o=r.context,i=o.uniformState,s=new D;s.left=e._overlayBounds.x,s.top=e._overlayBounds.y,s.right=e._overlayBounds.z,s.bottom=e._overlayBounds.w,i.updateFrustum(s);if(!d(e._overlayFramebuffer)){var l=new K({context:o,width:4096,height:4096,pixelFormat:A.RGBA,pixelDatatype:H.UNSIGNED_BYTE});e._overlayFramebuffer=new W({context:o,colorTextures:[l],destroyAttachments:!1})}var m=new k(o);m.framebuffer=e._overlayFramebuffer,m.viewport=new t(0,0,4096,4096);var c=X.fromCache({depthTest:{enabled:!1},cull:{enabled:!0,face:oe.BACK}});if(!d(e._overlayVertShaderSource)){var p=new Z;p.sources.push("attribute float position;\nuniform vec4 u_rectVertexes[4];\nvarying vec2 texCoord;\n\nvoid main()\n{\n    int index = int(position);\n    vec4 pos = vec4(u_rectVertexes[index].xy, 0.0, 1.0);\n    gl_Position = czm_projection*pos;\n\n    texCoord = u_rectVertexes[index].zw;\n\n}"),e._overlayVertShaderSource=p}if(!d(e._overlayFragShaderSource)){($=new Z).sources.push("uniform sampler2D u_textures[TEXTURE_UNITS];\nuniform vec4 u_texCoordRects[TEXTURE_UNITS];\nuniform vec4 u_texOffsetAndScales[TEXTURE_UNITS];\nuniform float u_texAlpha[TEXTURE_UNITS];\nvarying vec2 texCoord;\n\nvec4 sampleAndBlend(\n    vec4 previousColor,\n    sampler2D textureToSample,\n    vec2 tileTextureCoordinates,\n    vec4 textureCoordinateRectangle,\n    vec4 textureCoordinateTranslationAndScale,\n    float textureAlpha)\n{\n    // This crazy step stuff sets the alpha to 0.0 if this following condition is true:\n    //    tileTextureCoordinates.s < textureCoordinateRectangle.s ||\n    //    tileTextureCoordinates.s > textureCoordinateRectangle.p ||\n    //    tileTextureCoordinates.t < textureCoordinateRectangle.t ||\n    //    tileTextureCoordinates.t > textureCoordinateRectangle.q\n    // In other words, the alpha is zero if the fragment is outside the rectangle\n    // covered by this texture.  Would an actual 'if' yield better performance?\n    vec2 alphaMultiplier = step(textureCoordinateRectangle.st, tileTextureCoordinates);\n    textureAlpha = textureAlpha * alphaMultiplier.x * alphaMultiplier.y;\n\n    alphaMultiplier = step(vec2(0.0), textureCoordinateRectangle.pq - tileTextureCoordinates);\n    textureAlpha = textureAlpha * alphaMultiplier.x * alphaMultiplier.y;\n\n    vec2 translation = textureCoordinateTranslationAndScale.xy;\n    vec2 scale = textureCoordinateTranslationAndScale.zw;\n    vec2 textureCoordinates = tileTextureCoordinates * scale + translation;\n    vec4 value = texture2D(textureToSample, textureCoordinates);\n    vec3 color = value.rgb;\n    float alpha = value.a;\n\n    float sourceAlpha = alpha * textureAlpha;\n    float outAlpha = mix(previousColor.a, 1.0, sourceAlpha);\n    vec3 outColor = mix(previousColor.rgb * previousColor.a, color, sourceAlpha) / outAlpha;\n    return vec4(outColor, outAlpha);\n}\n\nvoid main()\n{\n    vec4 color = vec4(0.0);\n    for (int i = 0; i < TEXTURE_UNITS; ++i) {\n        color = sampleAndBlend(color, u_textures[i], texCoord,           u_texCoordRects[i], u_texOffsetAndScales[i], u_texAlpha[i]);\n    };\n    gl_FragColor = color;\n}"),e._overlayFragShaderSource=$}if(!d(e._overlayTileCommand)){d(e._overlayTileUniforms.rectVertexes)||(e._overlayTileUniforms.rectVertexes=[]);var y={u_rectVertexes:function(){return e._overlayTileUniforms.rectVertexes},u_textures:function(){return e._overlayTileUniforms.textures},u_texCoordRects:function(){return e._overlayTileUniforms.texCoordRects},u_texOffsetAndScales:function(){return e._overlayTileUniforms.texOffsetAndScales},u_texAlpha:function(){return e._overlayTileUniforms.texAlpha}},_=new x({componentDatatype:h.FLOAT,componentsPerAttribute:1,values:new Float32Array([0,1,2,0,2,3])}),f=new w({position:_}),g=new v({attributes:f}),T=te.fromGeometry({context:o,geometry:g,bufferUsage:z.STATIC_DRAW,interleave:!0});e._overlayTileCommand=new j({primitiveType:L.TRIANGLES,vertexArray:T,uniformMap:y,renderState:c,pass:q.PGEARTH_3D_TILE})}new G({color:new u(1,1,1,0)}).execute(o,m);var b=new B;B.inverse(e.m_matLocal,b);for(var C=0,P=e._tilesInOverlay.length;C<P;++C){var S=e._tilesInOverlay[C],F=S.rectangle,R=n.fromRadians(F.west,F.south,0);B.multiplyByPoint(b,R,R);var U=n.fromRadians(F.east,F.south,0);B.multiplyByPoint(b,U,U);var M=n.fromRadians(F.east,F.north,0);B.multiplyByPoint(b,M,M);var E=n.fromRadians(F.west,F.north,0);B.multiplyByPoint(b,E,E),e._overlayTileUniforms.textures=[],e._overlayTileUniforms.texCoordRects=[],e._overlayTileUniforms.texOffsetAndScales=[],e._overlayTileUniforms.texAlpha=[];for(var I=S.data.imagery,V=0,N=I.length;V<N;++V){var O=I[V],J=O.readyImagery;d(J)&&0!==J.imageryLayer.alpha&&J.imageryLayer==e._overlayImageLayer&&(e._overlayTileUniforms.textures.push(O.useWebMercatorT?J.textureWebMercator:J.texture),e._overlayTileUniforms.texCoordRects.push(O.textureCoordinateRectangle),e._overlayTileUniforms.texOffsetAndScales.push(O.textureTranslationAndScale),e._overlayTileUniforms.texAlpha.push(J.imageryLayer.alpha))}var Q=e._overlayTileUniforms.textures.length;if(0!=Q){if(e._overlayTileUniforms.rectVertexes[0]=a.fromElements(R.x,R.y,0,0,e._overlayTileUniforms.rectVertexes[0]),e._overlayTileUniforms.rectVertexes[1]=a.fromElements(U.x,U.y,1,0,e._overlayTileUniforms.rectVertexes[1]),e._overlayTileUniforms.rectVertexes[2]=a.fromElements(M.x,M.y,1,1,e._overlayTileUniforms.rectVertexes[2]),e._overlayTileUniforms.rectVertexes[3]=a.fromElements(E.x,E.y,0,1,e._overlayTileUniforms.rectVertexes[3]),!d(e._overlayShaderPrograms[Q])){var $;($=e._overlayFragShaderSource.clone()).defines.push("TEXTURE_UNITS "+Q);var ee=Y.fromCache({context:o,vertexShaderSource:e._overlayVertShaderSource,fragmentShaderSource:$});e._overlayShaderPrograms[Q]=ee}e._overlayTileCommand.shaderProgram=e._overlayShaderPrograms[Q],i.updatePass(e._overlayTileCommand.pass),e._overlayTileCommand.execute(o,m)}}}c(_e.prototype,{ready:{get:function(){return this._ready}},readyPromise:{get:function(){return this._readyPromise.promise}},url:{get:function(){return this._url}},basePath:{get:function(){return this._basePath}},progressEvent:{get:function(){return this._progressEvent}},origin:{get:function(){return this._position},set:function(e){if(this._position=e,d(this._srs)){var t=this._srs.forward([this.origin.x,this.origin.y]);this._metaOrg[0]=t[0],this._metaOrg[1]=t[1],this._metaOrg[2]=this.origin.z}var r=n.fromDegrees(this._position.x,this._position.y,this._position.z);this.m_matLocal=N.eastNorthUpToFixedFrame(r,void 0,this.m_matLocal);var o=new n;B.multiplyByPoint(this.m_matLocal,this._boundingBox.center,o),this.tileBoundingSphere.center=o;for(var i=this.nodes.length,a=0;a<i;++a){this.nodes[a].updateBoundingVolume()}}},flattenPolygons:{get:function(){return this._flattenPolygons}},pitPolygons:{get:function(){return this._pitPolygons}},maximumMemoryUsage:{get:function(){return this._maximumMemoryUsage},set:function(e){this._maximumMemoryUsage=e}},transparency:{get:function(){return this._transparency},set:function(e){this._transparency=e}},boundingSphere:{get:function(){return this._boundingSphere}},boundingBox:{get:function(){return this._boundingBox}},totalMemoryUsageInBytes:{get:function(){return this._texturesByteLength+this._geometryByteLength}}}),_e.prototype.getModelViewMatrix=function(){return this.matVPW},_e.prototype.getLocalViewMatrix=function(){return this.m_matLocal},_e.prototype.setLastAccessTime=function(e){this.lastAccessTime=e},_e.prototype.getLastAccessTime=function(){return this.lastAccessTime},_e.prototype.setLastAccessFrame=function(e){this.lastAccessFrame=e},_e.prototype.getLastAccessFrame=function(){return this.lastAccessFrame},_e.prototype.getPixelSizeVector=function(){return this.pixelSizeVector},_e.prototype.setPixelSizeVector=function(e){this.pixelSizeVector=e},_e.prototype.addNode=function(e){this.nodes.push(e),e.pageLOD=this,e.root=e},_e.prototype.addNodeCount=function(e){this.nodeCount+=e},_e.prototype.addReleaseCount=function(e){this.nodeCount-=e},_e.prototype.loadNode=function(t,o){var i=this,a=o.DataDefine;if(void 0!==a){d(i._position)||(i._position=new n,i._position.x=parseFloat(a.Position.x),i._position.y=parseFloat(a.Position.y),i._position.z=parseFloat(a.Position.z)),i._compress=Boolean(a.compress);var s=n.fromDegrees(this._position.x,this._position.y,this._position.z);if(i.m_matLocal=N.eastNorthUpToFixedFrame(s,void 0,i.m_matLocal),d(a.Range)){var l=parseFloat(a.Range.West),u=parseFloat(a.Range.East),h=parseFloat(a.Range.South),m=parseFloat(a.Range.North),c=parseFloat(a.Range.MinZ),p=parseFloat(a.Range.MaxZ),y=new n(l+(u-l)/2,h+(m-h)/2,c+(p-c)/2);B.multiplyByPoint(i.m_matLocal,y,y);var _=new n(l,h,c),f=new n(u,m,p),g=n.distance(f,_);i.tileBoundingSphere=new r(y,g);var v=new n(l,h,c),x=new n(u,m,p);i._boundingBox=new e(v,x)}for(var w=a.NodeList.Node.length,T=0;T<w;T++){var b=a.NodeList.Node[T];if(""!=b)0===T&&(i.pageType=b.substring(b.lastIndexOf(".")+1)),(z=new de).strDataPath=pe.getAbsolutePath(pe.getDir(t),b),i.addNode(z)}i._ready=!0}else if(void 0!=o.root){var C=o.root;if(void 0!==C){if(d(i._position)){if(d(i._srs)){var P=i._srs.forward([this._position.x,this._position.y]);this.pageLOD._metaOrg[0]=P[0],this.pageLOD._metaOrg[1]=P[1],this.pageLOD._metaOrg[2]=this.pageLOD.origin.z}}else if(i._position=new n,d(C.MetaData)){if(d(C.MetaData.EPSG)){var S="EPSG:"+C.MetaData.EPSG,D=ue[S];i._srs=se(D)}var F=C.MetaData.Origin;i._metaOrg=F;var A=i._srs.inverse([F[0],F[1]]);i._position.x=parseFloat(A[0]),i._position.y=parseFloat(A[1]),i._position.z=parseFloat(F[2])}else i._position.x=parseFloat(C.position.x),i._position.y=parseFloat(C.position.y),i._position.z=parseFloat(C.position.z);d(C.pixelFormat)&&(i._pixelFormat=C.pixelFormat),i._compress=Boolean(C.compress);s=n.fromDegrees(this._position.x,this._position.y,this._position.z);if(i.m_matLocal=N.eastNorthUpToFixedFrame(s,void 0,i.m_matLocal),d(C.boundingVolume)){var R=B.inverse(i.m_matLocal,new B);if(d(C.boundingVolume.sphere)){var U=C.boundingVolume.sphere,L=(y=new n(U[0],U[1],U[2]),g=U[3],y.clone());if(d(i._srs)){L.x+=i._metaOrg[0],L.y+=i._metaOrg[1],L.z+=i._metaOrg[2];var M=i._srs.inverse([L.x,L.y]),E=n.fromDegrees(M[0],M[1],L.z);B.multiplyByPoint(R,E,L)}i._boundingSphere=new r(L,g),B.multiplyByPoint(i.m_matLocal,L,L),i.tileBoundingSphere=new r(L,g)}if(d(C.boundingVolume.box)){var I=C.boundingVolume.box;y=new n(I[0],I[1],I[2]),v=new n(I[0]-I[3],I[1]-I[7],I[2]-I[11]),x=new n(I[0]+I[3],I[1]+I[7],I[2]+I[11]);i._boundingBox=new e(v,x,y);g=Math.max(I[3],Math.max(I[7],I[11]));var V=y.clone();if(d(i._srs)){V.x+=i._metaOrg[0],V.y+=i._metaOrg[1],V.z+=i._metaOrg[2];M=i._srs.inverse([V.x,V.y]),E=n.fromDegrees(M[0],M[1],V.z);B.multiplyByPoint(R,E,V)}i._boundingSphere=new r(V,g);L=new n;B.multiplyByPoint(i.m_matLocal,V,L),i.tileBoundingSphere=new r(L,g)}}for(w=C.children.length,T=0;T<w;T++){var O=C.children[T];if(void 0!=O){var z=new de;if(void 0!==O.boundingVolume){U=O.boundingVolume.sphere,y=new n(U[0],U[1],U[2]),g=U[3];z.bdSphere=new r(y,g)}0===T&&(i.pageType=O.content.url.substring(O.content.url.lastIndexOf(".")+1)),z.strDataPath=pe.getAbsolutePath(pe.getDir(t),O.content.url),z.bRootTile=!0,i.addNode(z)}}}}i._ready=!0},_e.prototype.cleanRedundantNodes=function(e,t){if(this.totalMemoryUsageInBytes<this.maximumMemoryUsage)return!1;if(null!=e){if(e.getLoadStatus()!=he.PG_LOADED)return!1;for(var r=0,o=e.children.length;r<o;r++)this.cleanRedundantNodes(e.children[r],t);if(this.totalMemoryUsageInBytes<this.maximumMemoryUsage)return!1;if(!t&&e==e.root)return!1;if(""==e.strDataPath)return!1;var i=this.getLastAccessFrame()-e.getLastAccessFrame();return this.getLastAccessTime(),e.getLastAccessTime(),!(i<1||!e.isGrandchildrenSafeDel()||(e.unloadChildren(),0))}return!1},_e.prototype.cleanNodes=function(e,t,r){if(r.totalMemoryUsageInBytes<r.maximumMemoryUsage)return!1;if(null!=e){if(e.getLoadStatus()!=he.PG_LOADED)return!1;for(var o=0,i=e.children.length;o<i;o++)this.cleanNodes(e.children[o],t,r);if(r.totalMemoryUsageInBytes<r.maximumMemoryUsage)return!1;if(!t&&e==e.root)return!1;if(""==e.strDataPath)return!1;var n=this.getLastAccessFrame()-e.getLastAccessFrame();if(this.getLastAccessTime(),e.getLastAccessTime(),n<1)return!1;if(e.isGrandchildrenSafeDel()){var a=this.totalMemoryUsageInBytes;return e.unloadChildren(),r.totalMemoryUsageInBytes-=a-this.totalMemoryUsageInBytes,!0}return!1}return!1},_e.prototype.updateMatrix=function(e){var t=e.camera,r=e.context,o=t._viewMatrix;B.multiply(o,this.m_matLocal,this.matVPW),this.viewPort.z=r.drawingBufferWidth,this.viewPort.w=r.drawingBufferHeight,this.pixelSizeVector=me.computePixelSizeVector(this.viewPort,t.frustum.projectionMatrix,this.matVPW)},_e.prototype.distanceToCamera=function(e,t){return Math.max(0,n.distance(e.center,t.camera.positionWC)-e.radius)},_e.prototype.update=function(e){if(this._frameState=e,this.show&&this.ready){if(this.curLoadingNode=0,this.updateMatrix(e),this._boundingSphere.radius>0){var t;if(t=r.transform(this._boundingSphere,this.m_matLocal,t),this._distanceToCamera=this.distanceToCamera(t,e),this._distanceToCamera>this._tileVisibleDistance)return e.totalMemoryUsageInBytes+=this.totalMemoryUsageInBytes,!1;if(e.cullingVolume.computeVisibility(t)==C.OUTSIDE)return e.totalMemoryUsageInBytes+=this.totalMemoryUsageInBytes,!1}var i=this;if(!d(this._defautTexture)){var n=document.createElement("img");n.src=o("Assets/Textures/noImage.jpg"),n.onload=function(e,t){i._defautTexture=new K({context:i._frameState.context,width:n.width,height:n.height,source:n})}}if(this._clippingPlanes.length>0){var a=e.context.uniformState.view;fe(this._clippingPlanes,a,this._packedClippingPlanes)}if(this._needUpateFlatten&&(this.initFlattenPolygon(e),this._needUpateFlatten=!1),d(this._polygonDepth)&&this._polygonDepth.update(e),ge(this,e),ve(this,e),!d(this._colorTexture)&&d(this._colorTable)){var s=this._colorTable.generateImage(1024);this._colorTexture=new K({context:e.context,source:s,width:1024,height:1,pixelFormat:A.RGBA,pixelDatatype:H.UNSIGNED_BYTE,sampler:new J({wrapS:ee.CLAMP_TO_EDGE,wrapT:ee.CLAMP_TO_EDGE,minificationFilter:$.LINEAR,magnificationFilter:Q.LINEAR})})}if(xe(this,e),this.NodeMesh=[],this.nodes,this._loadTimestamp=P.now(),this.lastAccessTime=(new Date).getTime(),++this.lastAccessFrame,e.commandList.length,this.selectTiles(e),e.totalMemoryUsageInBytes+=this.totalMemoryUsageInBytes,this.nodeCount>0){var l=1-this.curLoadingNode/this.nodeCount;l=S.clamp(l,0,1),this._progressEvent.raiseEvent(l)}}},_e.prototype.selectTiles=function(e){for(var t=0,o=this.nodes.length;t<o;t++){var i=this.nodes[t];if(i.checkInFrustum(e))if(i.bdSphere.radius>0){var n;n=r.transform(i.bdSphere,this.m_matLocal,n),e.cullingVolume.computeVisibility(n)!=C.OUTSIDE&&i._distanceToCamera<this._tileVisibleDistance&&e._selectedTiles.push(i)}else e._selectedTiles.push(i)}},_e.prototype.isDestroyed=function(){return!1},_e.prototype.initFlattenPolygon=function(e){if(0!=this._flattenPolygons.length){d(this._polygonDepth)||(this._polygonDepth=new ce),this._polygonDepth._flattenPolygonDrawCommonds=[];var o={position:0},i=new B;B.inverse(this.m_matLocal,i);for(var a=new t,s=[],l=0;l<this._flattenPolygons.length;l++){var u=this._flattenPolygons[l];if(!d(u.show)||u.show){for(var h=e.context,m=U.createGeometry(u),c=m.attributes.position.values,p=0;p<c.length/3;p++){var y=new n(0,0,0);y.x=c[3*p],y.y=c[3*p+1],y.z=c[3*p+2],new n,B.multiplyByPoint(i,y,y),s.push(y),m.attributes.position.values[3*p]=y.x,m.attributes.position.values[3*p+1]=y.y,m.attributes.position.values[3*p+2]=y.z}var _;_=r.transform(m.boundingSphere,i,_),m.boundingSphere=_;var f=te.fromGeometry({context:h,geometry:m,attributeLocations:o,bufferUsage:z.STATIC_DRAW,interleave:!0}),g=Y.fromCache({context:h,vertexShaderSource:ae,fragmentShaderSource:ne}),v=new X;v.depthTest.enabled=!0,v.cull.enabled=!0,v.cull.face=oe.BACK;var x=new j({boundingVolume:_,modelMatrix:new B,primitiveType:L.TRIANGLES,vertexArray:f,shaderProgram:g,uniformMap:{},renderState:v,pass:q.PGEARTH_3D_TILE});this._polygonDepth._flattenPolygonDrawCommonds.push(x)}}t.fromPoints(s,a),this._flattenBounds.x=a.x,this._flattenBounds.y=a.y+a.height,this._flattenBounds.z=a.x+a.width,this._flattenBounds.w=a.y,this._polygonDepth.updateFrustum(this._flattenBounds.x,this._flattenBounds.y,this._flattenBounds.z,this._flattenBounds.w)}else this._polygonDepth._flattenPolygonDrawCommonds=[]},_e.prototype.updateFlatten=function(){this._needUpateFlatten=!0},_e.prototype.cleanflattenPolygon=function(){this._polygonDepth._flattenPolygonDrawCommonds=[],this._polygonDepth.destroy(),this._polygonDepth=void 0,this._flattenPolygons=[],this._flattenBounds=new a},_e.prototype.toJSON=function(){var e={};return d(this.name)?e.name=this.name:e.name=this._url,e.position=this._position,e.type=this._type,e.url=this._url,e.subdomains=this._subdomains,e.shadows=this.shadows,e.show=m(this.show,!0),e},_e.prototype.release=function(e){for(var t=0,r=this.nodes.length;t<r;t++)this.cleanNodes(this.nodes[t],!1,e)},_e.prototype.destroy=function(){for(var e=0,t=this.nodes.length;e<t;e++)this.nodes[e].unloadChildren();return this.cleanClipPolygons(),this.cleanPitPolygons(),this.setColorTable(null),this.setOverlayImageLayer(null),y(this)},_e.prototype.setClipppingPlanes=function(e){this._clippingPlanes=e},_e.prototype.addClipPolygon=function(e){this._clipPolygons.push(e),this._clipDirty=!0},_e.prototype.updateClip=function(){this._clipDirty=!0},_e.prototype.cleanClipPolygons=function(){this._clipPolygons.length=0,this._clipDirty=!1,a.fromElements(0,0,0,0,this._clipBounds),this._clipFramebuffer=this._clipFramebuffer&&!this._clipFramebuffer.isDestroyed()&&this._clipFramebuffer.destroy()},_e.prototype.updatePit=function(){this._pitDirty=!0},_e.prototype.cleanPitPolygons=function(){this._pitPolygons.length=0,this._pitDirty=!1,a.fromElements(0,0,0,0,this._pitBounds),this._pitFramebuffer=this._pitFramebuffer&&!this._pitFramebuffer.isDestroyed()&&this._pitFramebuffer.destroy()},_e.prototype.setColorTable=function(e){d(this._colorTable)&&this._colorTable.destroy(),this._colorTable=e,d(e)&&e.length>0&&(this._colorRange.x=e._elements[0].key,this._colorRange.y=e._elements[e.length-1].key),this._colorTexture=this._colorTexture&&!this._colorTexture.isDestroyed()&&this._colorTexture.destroy()},_e.prototype.setDisplayMode=function(e){this._displayMode=e},_e.prototype.setOverlayImageLayer=function(e){this._overlayImageLayer=e,d(e)||(this._overlayBounds=void 0,this._overlayRect=void 0,this._tilesInOverlay.length=0,this._overlayFramebuffer=this._overlayFramebuffer&&!this._overlayFramebuffer.isDestroyed()&&this._overlayFramebuffer.destroy(),this._overlayVertShaderSource=void 0,this._overlayFragShaderSource=void 0,this._overlayShaderPrograms.length=0,this._overlayTileCommand=void 0,this._overlayTileUniforms.length=0,this._lastViewMatrix=void 0,this._lastProjectionMatrix=void 0)};var Pe=new M;return _e});