define(["../Core/Cartesian3","../Core/ComponentDatatype","../Core/defined","../Core/defineProperties","../Core/destroyObject","../Core/IndexDatatype","../Core/loadKTX","../Core/PixelFormat","../Renderer/Buffer","../Renderer/BufferUsage","../Renderer/ComputeCommand","../Renderer/CubeMap","../Renderer/PixelDatatype","../Renderer/ShaderProgram","../Renderer/Texture","../Renderer/VertexArray","../Shaders/OctahedralProjectionAtlasFS","../Shaders/OctahedralProjectionFS","../Shaders/OctahedralProjectionVS","../ThirdParty/when"],function(e,t,r,i,a,o,n,s,u,h,p,d,f,_,x,c,m,v,l,y){"use strict";function g(e){this._url=e,this._cubeMapBuffers=void 0,this._cubeMaps=void 0,this._texture=void 0,this._mipTextures=void 0,this._va=void 0,this._sp=void 0,this._maximumMipmapLevel=void 0,this._loading=!1,this._ready=!1,this._readyPromise=y.defer()}i(g.prototype,{url:{get:function(){return this._url}},texture:{get:function(){return this._texture}},maximumMipmapLevel:{get:function(){return this._maximumMipmapLevel}},ready:{get:function(){return this._ready}},readyPromise:{get:function(){return this._readyPromise.promise}}}),g.isSupported=function(e){return e.colorBufferHalfFloat&&e.halfFloatingPointTexture||e.floatingPointTexture&&e.colorBufferFloat};for(var A=new e(1,0,0),T=new e(0,0,1),w=new e(-1,0,0),M=new e(0,0,-1),S=new e(0,1,0),C=[S,w,T,new e(0,-1,0),A,S,M,S,S],P=C.length,b=new Float32Array(3*P),B=0,F=0;F<P;++F,B+=3)e.pack(C[F],b,B);var L=new Float32Array([-1,1,-1,0,0,1,0,0,1,0,1,1,0,-1,-1,-1,1,-1]),D=new Uint16Array([0,1,2,2,3,1,7,6,1,3,6,1,2,5,4,3,4,2,4,8,6,3,4,6]);function R(e){return function(){return e}}function O(e){var t,i;e._va=e._va&&e._va.destroy(),e._sp=e._sp&&e._sp.destroy();var a=e._cubeMaps;if(r(a))for(i=a.length,t=0;t<i;++t)a[t].destroy();var o=e._mipTextures;if(r(o))for(i=o.length,t=0;t<i;++t)o[t].destroy();e._va=void 0,e._sp=void 0,e._cubeMaps=void 0,e._cubeMapBuffers=void 0,e._mipTextures=void 0}return g.prototype.update=function(e){var i=e.context;if(g.isSupported(i)&&(r(this._texture)&&r(this._va)&&O(this),!r(this._texture))){if(!r(this._texture)&&!this._loading){var a=i.textureCache.getTexture(this._url);if(r(a))return O(this),this._texture=a,this._maximumMipmapLevel=this._texture.maximumMipmapLevel,this._ready=!0,void this._readyPromise.resolve()}var y=this._cubeMapBuffers;if(!r(y)&&!this._loading){var A=this;n(this._url).then(function(e){A._cubeMapBuffers=e,A._loading=!1}),this._loading=!0}if(r(this._cubeMapBuffers)){this._va=function(e){var r=u.createVertexBuffer({context:e,typedArray:L,usage:h.STATIC_DRAW}),i=u.createVertexBuffer({context:e,typedArray:b,usage:h.STATIC_DRAW}),a=u.createIndexBuffer({context:e,typedArray:D,usage:h.STATIC_DRAW,indexDatatype:o.UNSIGNED_SHORT}),n=[{index:0,vertexBuffer:r,componentsPerAttribute:2,componentDatatype:t.FLOAT},{index:1,vertexBuffer:i,componentsPerAttribute:3,componentDatatype:t.FLOAT}];return new c({context:e,attributes:n,indexBuffer:a})}(i),this._sp=_.fromCache({context:i,vertexShaderSource:l,fragmentShaderSource:v,attributeLocations:{position:0,cubeMapCoordinates:1}});var T=Math.min(y.length,6);this._maximumMipmapLevel=T-1;for(var w=this._cubeMaps=new Array(T),M=this._mipTextures=new Array(T),S=2*y[0].positiveX.width,C={originalSize:function(){return S}},P=i.halfFloatingPointTexture?f.HALF_FLOAT:f.FLOAT,B=s.RGBA,F=0;F<T;++F){var I=y[F].positiveY;y[F].positiveY=y[F].negativeY,y[F].negativeY=I;var j=w[F]=new d({context:i,source:y[F]}),V=2*w[F].width,Y=M[F]=new x({context:i,width:V,height:V,pixelDatatype:P,pixelFormat:B}),H=new p({vertexArray:this._va,shaderProgram:this._sp,uniformMap:{cubeMap:R(j)},outputTexture:Y,persists:!0,owner:this});e.commandList.push(H),C["texture"+F]=R(Y)}this._texture=new x({context:i,width:1.5*S+2,height:S,pixelDatatype:P,pixelFormat:B}),this._texture.maximumMipmapLevel=this._maximumMipmapLevel,i.textureCache.addTexture(this._url,this._texture);var U=new p({fragmentShaderSource:m,uniformMap:C,outputTexture:this._texture,persists:!1,owner:this});e.commandList.push(U),this._ready=!0,this._readyPromise.resolve()}}},g.prototype.isDestroyed=function(){return!1},g.prototype.destroy=function(){return O(this),this._texture=this._texture&&this._texture.destroy(),a(this)},g});