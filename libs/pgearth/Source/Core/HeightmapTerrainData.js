define(["../ThirdParty/when","./BoundingSphere","./Cartesian3","./defaultValue","./defined","./defineProperties","./DeveloperError","./GeographicProjection","./HeightmapTessellator","./OrientedBoundingBox","./Math","./Rectangle","./TaskProcessor","./TerrainEncoding","./TerrainMesh","./TerrainProvider","../extends/core/ExpendUtil"],function(e,t,i,r,h,s,n,o,a,d,c,u,g,l,f,w,p){"use strict";function m(e){if(!h(e)||!h(e.buffer))throw new n("options.buffer is required.");if(!h(e.width))throw new n("options.width is required.");if(!h(e.height))throw new n("options.height is required.");this._buffer=e.buffer,this._width=e.width,this._height=e.height,this._childTileMask=r(e.childTileMask,15);var t=a.DEFAULT_STRUCTURE,i=e.structure;h(i)?i!==t&&(i.heightScale=r(i.heightScale,t.heightScale),i.heightOffset=r(i.heightOffset,t.heightOffset),i.elementsPerHeight=r(i.elementsPerHeight,t.elementsPerHeight),i.stride=r(i.stride,t.stride),i.elementMultiplier=r(i.elementMultiplier,t.elementMultiplier),i.isBigEndian=r(i.isBigEndian,t.isBigEndian)):i=t,this._structure=i,this._createdByUpsampling=r(e.createdByUpsampling,!1),this._waterMask=e.waterMask,this._skirtHeight=void 0,this._bufferType=this._buffer.constructor,this._mesh=void 0}s(m.prototype,{credits:{get:function(){}},waterMask:{get:function(){return this._waterMask}},childTileMask:{get:function(){return this._childTileMask}}});var _=new g("createVerticesFromHeightmap");function v(e,t,i,r,h,s,n,o,a,d,c){var u=(a-s.west)*(n-1)/(s.east-s.west),g=(d-s.south)*(o-1)/(s.north-s.south);h>0&&(u+=1,g+=1,n+=2,o+=2);var l=0|u,f=l+1;f>=(h>0?n-1:n)&&(f=n-1,l=n-2);var w=0|g,p=w+1;p>=(h>0?o-1:o)&&(p=o-1,w=o-2);var m=g-w;return w=o-1-w,p=o-1-p,T(u-l,m,(t.decodeHeight(e,w*n+l)/c-i)/r,(t.decodeHeight(e,w*n+f)/c-i)/r,(t.decodeHeight(e,p*n+l)/c-i)/r,(t.decodeHeight(e,p*n+f)/c-i)/r)}function T(e,t,i,r,h,s){return t<e?i+e*(r-i)+t*(s-r):i+e*(s-h)+t*(h-i)}function H(e,t,i,r,h,s){s*=r;var n,o=0;if(h)for(n=0;n<t;++n)o=o*i+e[s+n];else for(n=t-1;n>=0;--n)o=o*i+e[s+n];return o}function k(e,t,i,r,h,s,n,o){var a;if(n*=h,s)for(a=0;a<t-1;++a)e[n+a]=o/r|0,o-=e[n+a]*r,r/=i;else for(a=t-1;a>0;--a)e[n+a]=o/r|0,o-=e[n+a]*r,r/=i;e[n+a]=o}return m.prototype.createMesh=function(s,a,c,g,m){if(!h(s))throw new n("tilingScheme is required.");if(!h(a))throw new n("x is required.");if(!h(c))throw new n("y is required.");if(!h(g))throw new n("level is required.");var v=s.ellipsoid,T=s.tileXYToNativeRectangle(a,c,g),H=s.tileXYToRectangle(a,c,g);m=r(m,1);var k=v.cartographicToCartesian(u.center(H)),M=this._structure,b=w.getEstimatedLevelZeroGeometricErrorForAHeightmap(v,this._width,s.getNumberOfXTilesAtLevel(0))/(1<<g);this._skirtHeight=Math.min(4*b,1e3),p.underEarth.enableSkirt&&(this._skirtHeight=0);var E=_.scheduleTask({heightmap:this._buffer,structure:M,includeWebMercatorT:!0,width:this._width,height:this._height,nativeRectangle:T,rectangle:H,relativeToCenter:k,ellipsoid:v,skirtHeight:this._skirtHeight,isGeographic:s.projection instanceof o,exaggeration:m});if(h(E)){var S=this;return e(E,function(e){return S._mesh=new f(k,new Float32Array(e.vertices),w.getRegularGridIndices(e.gridWidth,e.gridHeight),e.minimumHeight,e.maximumHeight,t.clone(e.boundingSphere3D),i.clone(e.occludeePointInScaledSpace),e.numberOfAttributes,d.clone(e.orientedBoundingBox),l.clone(e.encoding),m,e.westIndicesSouthToNorth,e.southIndicesEastToWest,e.eastIndicesNorthToSouth,e.northIndicesWestToEast),S._buffer=void 0,S._mesh})}},m.prototype._createMeshSync=function(e,t,i,s,d){if(!h(e))throw new n("tilingScheme is required.");if(!h(t))throw new n("x is required.");if(!h(i))throw new n("y is required.");if(!h(s))throw new n("level is required.");var c=e.ellipsoid,g=e.tileXYToNativeRectangle(t,i,s),l=e.tileXYToRectangle(t,i,s);d=r(d,1);var p=c.cartographicToCartesian(u.center(l)),m=this._structure,_=w.getEstimatedLevelZeroGeometricErrorForAHeightmap(c,this._width,e.getNumberOfXTilesAtLevel(0))/(1<<s);this._skirtHeight=Math.min(4*_,1e3);var v=a.computeVertices({heightmap:this._buffer,structure:m,includeWebMercatorT:!0,width:this._width,height:this._height,nativeRectangle:g,rectangle:l,relativeToCenter:p,ellipsoid:c,skirtHeight:this._skirtHeight,isGeographic:e.projection instanceof o,exaggeration:d});this._buffer=void 0;var T=this._width,H=this._height;return this._skirtHeight>0&&(T+=2,H+=2),new f(p,v.vertices,w.getRegularGridIndices(T,H),v.minimumHeight,v.maximumHeight,v.boundingSphere3D,v.occludeePointInScaledSpace,v.encoding.getStride(),v.orientedBoundingBox,v.encoding,d,v.westIndicesSouthToNorth,v.southIndicesEastToWest,v.eastIndicesNorthToSouth,v.northIndicesWestToEast)},m.prototype.interpolateHeight=function(e,t,i){var r,s=this._width,n=this._height,o=this._structure,a=o.stride,d=o.elementsPerHeight,c=o.elementMultiplier,u=o.isBigEndian,g=o.heightOffset,l=o.heightScale;h(this._mesh)?r=v(this._mesh.vertices,this._mesh.encoding,g,l,this._skirtHeight,e,s,n,t,i,this._mesh.exaggeration):r=(r=function(e,t,i,r,h,s,n,o,a,d){var c=(a-s.west)*(n-1)/(s.east-s.west),u=(d-s.south)*(o-1)/(s.north-s.south),g=0|c,l=g+1;l>=n&&(l=n-1,g=n-2);var f=0|u,w=f+1;w>=o&&(w=o-1,f=o-2);var p=c-g,m=u-f;w=o-1-w;var _=H(e,t,i,r,h,(f=o-1-f)*n+g),v=H(e,t,i,r,h,f*n+l),k=H(e,t,i,r,h,w*n+g),M=H(e,t,i,r,h,w*n+l);return T(p,m,_,v,k,M)}(this._buffer,d,c,a,u,e,s,n,t,i))*l+g;return r},m.prototype.upsample=function(e,t,i,r,s,o,a){if(!h(e))throw new n("tilingScheme is required.");if(!h(t))throw new n("thisX is required.");if(!h(i))throw new n("thisY is required.");if(!h(r))throw new n("thisLevel is required.");if(!h(s))throw new n("descendantX is required.");if(!h(o))throw new n("descendantY is required.");if(!h(a))throw new n("descendantLevel is required.");if(a-r>1)throw new n("Upsampling through more than one level at a time is not currently supported.");var d=this._mesh;if(h(d)){for(var u=this._width,g=this._height,l=this._structure,f=this._skirtHeight,w=l.stride,p=new this._bufferType(u*g*w),_=d.vertices,T=d.encoding,H=e.tileXYToRectangle(t,i,r),M=e.tileXYToRectangle(s,o,a),b=l.heightOffset,E=l.heightScale,S=d.exaggeration,q=l.elementsPerHeight,y=l.elementMultiplier,B=l.isBigEndian,x=Math.pow(y,q-1),R=0;R<g;++R)for(var I=c.lerp(M.north,M.south,R/(g-1)),P=0;P<u;++P){var X=v(_,T,b,E,f,H,u,g,c.lerp(M.west,M.east,P/(u-1)),I,S);k(p,q,y,x,w,B,R*u+P,X=(X=X<l.lowestEncodedHeight?l.lowestEncodedHeight:X)>l.highestEncodedHeight?l.highestEncodedHeight:X)}return new m({buffer:p,width:u,height:g,childTileMask:0,structure:this._structure,createdByUpsampling:!0})}},m.prototype.isChildAvailable=function(e,t,i,r){if(!h(e))throw new n("thisX is required.");if(!h(t))throw new n("thisY is required.");if(!h(i))throw new n("childX is required.");if(!h(r))throw new n("childY is required.");var s=2;return i!==2*e&&++s,r!==2*t&&(s-=2),0!=(this._childTileMask&1<<s)},m.prototype.wasCreatedByUpsampling=function(){return this._createdByUpsampling},m});