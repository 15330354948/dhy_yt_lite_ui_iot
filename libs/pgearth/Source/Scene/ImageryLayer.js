define(["../Core/Cartesian2","../Core/Cartesian4","../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/destroyObject","../Core/DeveloperError","../Core/FeatureDetection","../Core/GeographicProjection","../Core/GeographicTilingScheme","../Core/IndexDatatype","../Core/Math","../Core/PixelFormat","../Core/Rectangle","../Core/Request","../Core/RequestState","../Core/RequestType","../Core/TerrainProvider","../Core/TileProviderError","../Core/WebMercatorProjection","../Core/WebMercatorTilingScheme","../Renderer/Buffer","../Renderer/BufferUsage","../Renderer/ComputeCommand","../Renderer/ContextLimits","../Renderer/MipmapHint","../Renderer/Sampler","../Renderer/ShaderProgram","../Renderer/ShaderSource","../Renderer/Texture","../Renderer/TextureMagnificationFilter","../Renderer/TextureMinificationFilter","../Renderer/TextureWrap","../Renderer/VertexArray","../Shaders/ReprojectWebMercatorFS","../Shaders/ReprojectWebMercatorVS","../ThirdParty/when","./Imagery","./ImagerySplitDirection","./ImageryState","./TileImagery"],function(e,t,r,i,a,o,n,s,h,c,l,m,u,g,p,d,f,y,T,v,A,x,_,L,E,R,w,I,M,C,F,D,S,P,N,b,O,U,B,G,j){"use strict";function q(e,t){this._imageryProvider=e,t=r(t,{}),this.alpha=r(t.alpha,r(e.defaultAlpha,1)),this.brightness=r(t.brightness,r(e.defaultBrightness,q.DEFAULT_BRIGHTNESS)),this.contrast=r(t.contrast,r(e.defaultContrast,q.DEFAULT_CONTRAST)),this.hue=r(t.hue,r(e.defaultHue,q.DEFAULT_HUE)),this.saturation=r(t.saturation,r(e.defaultSaturation,q.DEFAULT_SATURATION)),this.gamma=r(t.gamma,r(e.defaultGamma,q.DEFAULT_GAMMA)),this.splitDirection=r(t.splitDirection,r(e.defaultSplit,q.DEFAULT_SPLIT)),this.minificationFilter=r(t.minificationFilter,r(e.defaultMinificationFilter,q.DEFAULT_MINIFICATION_FILTER)),this.magnificationFilter=r(t.magnificationFilter,r(e.defaultMagnificationFilter,q.DEFAULT_MAGNIFICATION_FILTER)),this.show=r(t.show,!0),this._minimumTerrainLevel=t.minimumTerrainLevel,this._maximumTerrainLevel=t.maximumTerrainLevel,this._rectangle=r(t.rectangle,g.MAX_VALUE),this._maximumAnisotropy=t.maximumAnisotropy,this._imageryCache={},this._skeletonPlaceholder=new j(U.createPlaceholder(this)),this._show=!0,this._layerIndex=-1,this._isBaseLayer=!1,this._requestImageError=void 0,this._reprojectComputeCommands=[],this.cutoutRectangle=t.cutoutRectangle,this.colorToAlpha=t.colorToAlpha,this.colorToAlphaThreshold=r(t.colorToAlphaThreshold,q.DEFAULT_APPLY_COLOR_TO_ALPHA_THRESHOLD)}a(q.prototype,{imageryProvider:{get:function(){return this._imageryProvider}},rectangle:{get:function(){return this._rectangle}}}),q.DEFAULT_BRIGHTNESS=1,q.DEFAULT_CONTRAST=1,q.DEFAULT_HUE=0,q.DEFAULT_SATURATION=1,q.DEFAULT_GAMMA=1,q.DEFAULT_SPLIT=B.NONE,q.DEFAULT_MINIFICATION_FILTER=D.LINEAR,q.DEFAULT_MAGNIFICATION_FILTER=F.LINEAR,q.DEFAULT_APPLY_COLOR_TO_ALPHA_THRESHOLD=.004,q.prototype.isBaseLayer=function(){return this._isBaseLayer},q.prototype.isDestroyed=function(){return!1},q.prototype.destroy=function(){return o(this)};var W=new g,H=new g,V=new g,Y=new g;function X(e,t,r){return e+":"+t+":"+r}function k(e,t,r){return JSON.stringify([e,t,r])}q.prototype.getViewableRectangle=function(){var e=this._imageryProvider,t=this._rectangle;return e.readyPromise.then(function(){return g.intersection(e.rectangle,t)})},q.prototype._createTileImagerySkeletons=function(e,r,a){var o=e.data;if(i(this._minimumTerrainLevel)&&e.level<this._minimumTerrainLevel)return!1;if(i(this._maximumTerrainLevel)&&e.level>this._maximumTerrainLevel)return!1;var n=this._imageryProvider;if(i(a)||(a=o.imagery.length),!n.ready)return this._skeletonPlaceholder.loadingImagery.addReference(),o.imagery.splice(a,0,this._skeletonPlaceholder),!0;var s=n.tilingScheme.projection instanceof v&&e.rectangle.north<v.MaximumLatitude&&e.rectangle.south>-v.MaximumLatitude,c=g.intersection(n.rectangle,this._rectangle,W),l=g.intersection(e.rectangle,c,H);if(!i(l)){if(!this.isBaseLayer())return!1;var m=c,u=e.rectangle;l=H,u.south>=m.north?l.north=l.south=m.north:u.north<=m.south?l.north=l.south=m.south:(l.south=Math.max(u.south,m.south),l.north=Math.min(u.north,m.north)),u.west>=m.east?l.west=l.east=m.east:u.east<=m.west?l.west=l.east=m.west:(l.west=Math.max(u.west,m.west),l.east=Math.min(u.east,m.east))}var p=0;l.south>0?p=l.south:l.north<0&&(p=l.north);var d=function(e,t,r){var i=e._imageryProvider,a=i.tilingScheme,o=a.ellipsoid,n=e._imageryProvider.tilingScheme.projection instanceof h?1:Math.cos(r),s=a.rectangle,c=o.maximumRadius*s.width*n/(i.tileWidth*a.getNumberOfXTilesAtLevel(0))/t,l=Math.log(c)/Math.log(2);return 0|Math.round(l)}(this,1*r.getLevelMaximumGeometricError(e.level),p);d=Math.max(0,d);var f=n.maximumLevel;if(d>f&&(d=f),i(n.minimumLevel)){var y=n.minimumLevel;d<y&&(d=y)}var T=n.tilingScheme,A=T.positionToTileXY(g.northwest(l),d),x=T.positionToTileXY(g.southeast(l),d),_=e.rectangle.width/512,L=e.rectangle.height/512,E=T.tileXYToRectangle(A.x,A.y,d);Math.abs(E.south-e.rectangle.north)<L&&A.y<x.y&&++A.y,Math.abs(E.east-e.rectangle.west)<_&&A.x<x.x&&++A.x;var R=T.tileXYToRectangle(x.x,x.y,d);Math.abs(R.north-e.rectangle.south)<L&&x.y>A.y&&--x.y,Math.abs(R.west-e.rectangle.east)<_&&x.x>A.x&&--x.x;var w,I,M=g.clone(e.rectangle,Y),C=T.tileXYToRectangle(A.x,A.y,d),F=g.intersection(C,c,V);s?(T.rectangleToNativeRectangle(M,M),T.rectangleToNativeRectangle(C,C),T.rectangleToNativeRectangle(F,F),T.rectangleToNativeRectangle(c,c),w=T.tileXYToNativeRectangle.bind(T),_=M.width/512,L=M.height/512):w=T.tileXYToRectangle.bind(T);var D,S=0,P=1;!this.isBaseLayer()&&Math.abs(F.west-M.west)>=_&&(S=Math.min(1,(F.west-M.west)/M.width)),!this.isBaseLayer()&&Math.abs(F.north-M.north)>=L&&(P=Math.max(0,(F.north-M.south)/M.height));for(var N=P,b=A.x;b<=x.x;b++)if(I=S,C=w(b,A.y,d),F=g.simpleIntersection(C,c,V),i(F)){S=Math.min(1,(F.east-M.west)/M.width),b===x.x&&(this.isBaseLayer()||Math.abs(F.east-M.east)<_)&&(S=1),P=N;for(var O=A.y;O<=x.y;O++)if(D=P,C=w(b,O,d),F=g.simpleIntersection(C,c,V),i(F)){P=Math.max(0,(F.south-M.south)/M.height),O===x.y&&(this.isBaseLayer()||Math.abs(F.south-M.south)<L)&&(P=0);var U=new t(I,P,S,D),B=this.getImageryFromCache(b,O,d);o.imagery.splice(a,0,new j(B,U,s)),++a}}return!0},q.prototype._calculateTextureTranslationAndScale=function(e,r){var i=r.readyImagery.rectangle,a=e.rectangle;if(r.useWebMercatorT){var o=r.readyImagery.imageryLayer.imageryProvider.tilingScheme;i=o.rectangleToNativeRectangle(i,W),a=o.rectangleToNativeRectangle(a,Y)}var n=a.width,s=a.height,h=n/i.width,c=s/i.height;return new t(h*(a.west-i.west)/n,c*(a.south-i.south)/s,h,c)},q.prototype._requestImagery=function(e){var t=this._imageryProvider,r=this;function a(t){if(!i(t))return o();e.image=t,e.state=G.RECEIVED,e.request=void 0,T.handleSuccess(r._requestImageError)}function o(i){if(e.request.state===d.CANCELLED)return e.state=G.UNLOADED,void(e.request=void 0);e.state=G.FAILED,e.request=void 0;var a="Failed to obtain image tile X: "+e.x+" Y: "+e.y+" Level: "+e.level+".";r._requestImageError=T.handleError(r._requestImageError,t,t.errorEvent,a,e.x,e.y,e.level,n,i)}function n(){var r=new p({throttle:!1,throttleByServer:!0,type:f.IMAGERY});e.request=r,e.state=G.TRANSITIONING;var n=t.requestImage(e.x,e.y,e.level,r);if(!i(n))return e.state=G.UNLOADED,void(e.request=void 0);i(t.getTileCredits)&&(e.credits=t.getTileCredits(e.x,e.y,e.level)),O(n,a,o)}n()},q.prototype._createTextureWebGL=function(e,t){var r=new w({minificationFilter:this.minificationFilter,magnificationFilter:this.magnificationFilter}),a=t.image;return i(a.internalFormat)?new C({context:e,pixelFormat:a.internalFormat,width:a.width,height:a.height,source:{arrayBufferView:a.bufferView},sampler:r}):new C({context:e,source:a,pixelFormat:this._imageryProvider.hasAlphaChannel?u.RGBA:u.RGB,sampler:r})},q.prototype._createTexture=function(e,t){var r=this._imageryProvider,a=t.image;if(i(r.tileDiscardPolicy)){var o=r.tileDiscardPolicy;if(i(o)){if(!o.isReady())return void(t.state=G.RECEIVED);if(o.shouldDiscardImage(a))return void(t.state=G.INVALID)}}if(this.minificationFilter!==D.NEAREST&&this.minificationFilter!==D.LINEAR)throw new n("ImageryLayer minification filter must be NEAREST or LINEAR");var s=this._createTextureWebGL(e,t);r.tilingScheme.projection instanceof v?t.textureWebMercator=s:t.texture=s,t.image=void 0,t.state=G.TEXTURE_LOADED},q.prototype._finalizeReprojectTexture=function(e,t){var a=this.minificationFilter,o=this.magnificationFilter;if(a===D.LINEAR&&o===F.LINEAR&&!u.isCompressedFormat(t.pixelFormat)&&m.isPowerOfTwo(t.width)&&m.isPowerOfTwo(t.height)){a=D.LINEAR_MIPMAP_LINEAR;var n=E.maximumTextureFilterAnisotropy,s=Math.min(n,r(this._maximumAnisotropy,n)),h=X(a,o,s),c=e.cache.imageryLayerMipmapSamplers;i(c)||(c={},e.cache.imageryLayerMipmapSamplers=c);var l=c[h];i(l)||(l=c[h]=new w({wrapS:S.CLAMP_TO_EDGE,wrapT:S.CLAMP_TO_EDGE,minificationFilter:a,magnificationFilter:o,maximumAnisotropy:s})),t.generateMipmap(R.NICEST),t.sampler=l}else{var g=X(a,o,0),p=e.cache.imageryLayerNonMipmapSamplers;i(p)||(p={},e.cache.imageryLayerNonMipmapSamplers=p);var d=p[g];i(d)||(d=p[g]=new w({wrapS:S.CLAMP_TO_EDGE,wrapT:S.CLAMP_TO_EDGE,minificationFilter:a,magnificationFilter:o})),t.sampler=d}},q.prototype._reprojectTexture=function(e,t,a){var o=t.textureWebMercator||t.texture,n=t.rectangle,s=e.context;if((a=r(a,!0))&&!(this._imageryProvider.tilingScheme.projection instanceof h)&&n.width/o.width>1e-5){var c=this;t.addReference();var u=new L({persists:!0,owner:this,preExecute:function(e){!function(e,t,r,a){var o=t.cache.imageryLayer_reproject;if(!i(o)){o=t.cache.imageryLayer_reproject={vertexArray:void 0,shaderProgram:void 0,sampler:void 0,destroy:function(){i(this.framebuffer)&&this.framebuffer.destroy(),i(this.vertexArray)&&this.vertexArray.destroy(),i(this.shaderProgram)&&this.shaderProgram.destroy()}};for(var n=new Float32Array(256),s=0,h=0;h<64;++h){var c=h/63;n[s++]=0,n[s++]=c,n[s++]=1,n[s++]=c}var u={position:0,webMercatorT:1},g=y.getRegularGridIndices(2,64),p=x.createIndexBuffer({context:t,typedArray:g,usage:_.STATIC_DRAW,indexDatatype:l.UNSIGNED_SHORT});o.vertexArray=new P({context:t,attributes:[{index:u.position,vertexBuffer:x.createVertexBuffer({context:t,typedArray:n,usage:_.STATIC_DRAW}),componentsPerAttribute:2},{index:u.webMercatorT,vertexBuffer:x.createVertexBuffer({context:t,sizeInBytes:512,usage:_.STREAM_DRAW}),componentsPerAttribute:1}],indexBuffer:p});var d=new M({sources:[b]});o.shaderProgram=I.fromCache({context:t,vertexShaderSource:d,fragmentShaderSource:N,attributeLocations:u}),o.sampler=new w({wrapS:S.CLAMP_TO_EDGE,wrapT:S.CLAMP_TO_EDGE,minificationFilter:D.LINEAR,magnificationFilter:F.LINEAR})}r.sampler=o.sampler;var f=r.width,T=r.height;z.textureDimensions.x=f,z.textureDimensions.y=T,z.texture=r;var v=Math.sin(a.south),A=.5*Math.log((1+v)/(1-v));v=Math.sin(a.north);var L=1/(.5*Math.log((1+v)/(1-v))-A),E=new C({context:t,width:f,height:T,pixelFormat:r.pixelFormat,pixelDatatype:r.pixelDatatype,preMultiplyAlpha:r.preMultiplyAlpha});m.isPowerOfTwo(f)&&m.isPowerOfTwo(T)&&E.generateMipmap(R.NICEST);for(var O=a.south,U=a.north,B=J,G=0,j=0;j<64;++j){var q=j/63,W=m.lerp(O,U,q);v=Math.sin(W);var H=.5*Math.log((1+v)/(1-v)),V=(H-A)*L;B[G++]=V,B[G++]=V}o.vertexArray.getAttribute(1).vertexBuffer.copyFromArrayView(B),e.shaderProgram=o.shaderProgram,e.outputTexture=E,e.uniformMap=z,e.vertexArray=o.vertexArray}(e,s,o,t.rectangle)},postExecute:function(e){t.texture=e,c._finalizeReprojectTexture(s,e),t.state=G.READY,t.releaseReference()}});this._reprojectComputeCommands.push(u)}else a&&(t.texture=o),this._finalizeReprojectTexture(s,o),t.state=G.READY},q.prototype.queueReprojectionCommands=function(e){for(var t=this._reprojectComputeCommands,r=t.length,i=0;i<r;++i)e.commandList.push(t[i]);t.length=0},q.prototype.cancelReprojections=function(){this._reprojectComputeCommands.length=0},q.prototype.getImageryFromCache=function(e,t,r,a){var o=k(e,t,r),n=this._imageryCache[o];return i(n)||(n=new U(this,e,t,r,a),this._imageryCache[o]=n),n.addReference(),n},q.prototype.removeImageryFromCache=function(e){var t=k(e.x,e.y,e.level);delete this._imageryCache[t]};var z={u_textureDimensions:function(){return this.textureDimensions},u_texture:function(){return this.texture},textureDimensions:new e,texture:void 0},J=s.supportsTypedArrays()?new Float32Array(128):void 0;return q});