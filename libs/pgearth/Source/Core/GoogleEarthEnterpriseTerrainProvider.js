define(["../ThirdParty/when","./Credit","./defaultValue","./defined","./defineProperties","./DeveloperError","./Event","./GeographicTilingScheme","./GoogleEarthEnterpriseMetadata","./GoogleEarthEnterpriseTerrainData","./HeightmapTerrainData","./JulianDate","./Math","./Rectangle","./Request","./RequestState","./RequestType","./Resource","./RuntimeError","./TaskProcessor","./TileProviderError"],function(e,r,t,i,n,a,o,s,u,d,l,h,f,c,v,m,g,y,T,p,E){"use strict";var _={UNKNOWN:0,NONE:1,SELF:2,PARENT:3},w=new h;function N(){this._terrainCache={},this._lastTidy=h.now()}function P(n){if(n=t(n,{}),!i(n.url)&&!i(n.metadata))throw new a("options.url or options.metadata is required.");var d;if(i(n.metadata))d=n.metadata;else{var l=y.createIfNeeded(n.url);d=new u(l)}this._metadata=d,this._tilingScheme=new s({numberOfLevelZeroTilesX:2,numberOfLevelZeroTilesY:2,rectangle:new c(-f.PI,-f.PI,f.PI,f.PI),ellipsoid:n.ellipsoid});var h=n.credit;"string"==typeof h&&(h=new r(h)),this._credit=h,this._levelZeroMaximumGeometricError=40075.16,this._terrainCache=new N,this._terrainPromises={},this._terrainRequests={},this._errorEvent=new o,this._ready=!1;var v,m=this;this._readyPromise=d.readyPromise.then(function(r){if(!d.terrainPresent){var t=new T("The server "+d.url+" doesn't have terrain");return v=E.handleError(v,m,m._errorEvent,t.message,void 0,void 0,void 0,t),e.reject(t)}return E.handleSuccess(v),m._ready=r,r}).otherwise(function(r){return v=E.handleError(v,m,m._errorEvent,r.message,void 0,void 0,void 0,r),e.reject(r)})}N.prototype.add=function(e,r){this._terrainCache[e]={buffer:r,timestamp:h.now()}},N.prototype.get=function(e){var r=this._terrainCache[e];if(i(r))return delete this._terrainCache[e],r.buffer},N.prototype.tidy=function(){if(h.now(w),h.secondsDifference(w,this._lastTidy)>10){for(var e=this._terrainCache,r=Object.keys(e),t=r.length,i=0;i<t;++i){var n=r[i],a=e[n];h.secondsDifference(w,a.timestamp)>10&&delete e[n]}h.clone(w,this._lastTidy)}},n(P.prototype,{url:{get:function(){return this._metadata.url}},proxy:{get:function(){return this._metadata.proxy}},tilingScheme:{get:function(){if(!this._ready)throw new a("tilingScheme must not be called before the imagery provider is ready.");return this._tilingScheme}},errorEvent:{get:function(){return this._errorEvent}},ready:{get:function(){return this._ready}},readyPromise:{get:function(){return this._readyPromise}},credit:{get:function(){return this._credit}},hasWaterMask:{get:function(){return!1}},hasVertexNormals:{get:function(){return!1}},availability:{get:function(){}}});var S=new p("decodeGoogleEarthEnterprisePacket",Number.POSITIVE_INFINITY);function b(e,r,t){var n=r.getChildBitmask();if(r.terrainState===_.PARENT){n=0;for(var a=0;a<4;++a){var o=t.getTileInformationFromQuadKey(e+a.toString());i(o)&&o.hasTerrain()&&(n|=1<<a)}}return n}return P.prototype.requestTileGeometry=function(r,t,n,o){if(!this._ready)throw new a("requestTileGeometry must not be called before the terrain provider is ready.");var s=u.tileXYToQuadKey(r,t,n),h=this._terrainCache,f=this._metadata,c=f.getTileInformationFromQuadKey(s);if(!i(c))return e.reject(new T("Terrain tile doesn't exist"));var v=c.terrainState;i(v)||(v=c.terrainState=_.UNKNOWN);var g,y=h.get(s);if(i(y)){var p=f.providers[c.terrainProvider];return e.resolve(new d({buffer:y,childTileMask:b(s,c,f),credits:i(p)?[p]:void 0,negativeAltitudeExponentBias:f.negativeAltitudeExponentBias,negativeElevationThreshold:f.negativeAltitudeThreshold}))}if(h.tidy(),!c.ancestorHasTerrain)return e.resolve(new l({buffer:new Uint8Array(256),width:16,height:16}));if(v===_.NONE)return e.reject(new T("Terrain tile doesn't exist"));var E=s,w=-1;switch(v){case _.SELF:w=c.terrainVersion;break;case _.PARENT:E=E.substring(0,E.length-1),w=(g=f.getTileInformationFromQuadKey(E)).terrainVersion;break;case _.UNKNOWN:c.hasTerrain()?w=c.terrainVersion:(E=E.substring(0,E.length-1),g=f.getTileInformationFromQuadKey(E),i(g)&&g.hasTerrain()&&(w=g.terrainVersion))}if(w<0)return e.reject(new T("Terrain tile doesn't exist"));var N,P,I=this._terrainPromises,A=this._terrainRequests;if(i(I[E]))N=I[E],P=A[E];else{var R=function(e,r,t,n){return t=i(t)&&t>0?t:1,e._metadata.resource.getDerivedResource({url:"flatfile?f1c-0"+r+"-t."+t.toString(),request:n})}(this,E,w,P=o).fetchArrayBuffer();if(!i(R))return;N=R.then(function(r){return i(r)?S.scheduleTask({buffer:r,type:"Terrain",key:f.key},[r]).then(function(e){var r=f.getTileInformationFromQuadKey(E);r.terrainState=_.SELF,h.add(E,e[0]);for(var t=r.terrainProvider,n=e.length-1,a=0;a<n;++a){var o=E+a.toString(),s=f.getTileInformationFromQuadKey(o);i(s)&&(h.add(o,e[a+1]),s.terrainState=_.PARENT,0===s.terrainProvider&&(s.terrainProvider=t))}}):e.reject(new T("Failed to load terrain."))}),I[E]=N,A[E]=P,N=N.always(function(){delete I[E],delete A[E]})}return N.then(function(){var r=h.get(s);if(i(r)){var t=f.providers[c.terrainProvider];return new d({buffer:r,childTileMask:b(s,c,f),credits:i(t)?[t]:void 0,negativeAltitudeExponentBias:f.negativeAltitudeExponentBias,negativeElevationThreshold:f.negativeAltitudeThreshold})}return e.reject(new T("Failed to load terrain."))}).otherwise(function(r){return P.state===m.CANCELLED?(o.state=P.state,e.reject(r)):(c.terrainState=_.NONE,e.reject(r))})},P.prototype.getLevelMaximumGeometricError=function(e){return this._levelZeroMaximumGeometricError/(1<<e)},P.prototype.getTileDataAvailable=function(e,r,t){var n=this._metadata,a=u.tileXYToQuadKey(e,r,t),o=n.getTileInformation(e,r,t);if(null===o)return!1;if(i(o)){if(!o.ancestorHasTerrain)return!0;var s=o.terrainState;if(s===_.NONE)return!1;if(!(i(s)&&s!==_.UNKNOWN||(o.terrainState=_.UNKNOWN,o.hasTerrain()))){a=a.substring(0,a.length-1);var d=n.getTileInformationFromQuadKey(a);if(!i(d)||!d.hasTerrain())return!1}return!0}if(n.isValid(a)){var l=new v({throttle:!0,throttleByServer:!0,type:g.TERRAIN});n.populateSubtree(e,r,t,l)}return!1},P.prototype.loadTileDataAvailability=function(e,r,t){},P});