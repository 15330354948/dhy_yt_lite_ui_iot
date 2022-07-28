define(["../Core/Cartesian2","../Core/Cartesian3","../Core/Cartographic","../Core/Credit","../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/DeveloperError","../Core/Event","../Core/GeographicProjection","../Core/GeographicTilingScheme","../Core/Math","../Core/Rectangle","../Core/Resource","../Core/RuntimeError","../Core/TileProviderError","../Core/WebMercatorProjection","../Core/WebMercatorTilingScheme","../ThirdParty/when","./DiscardMissingTileImagePolicy","./ImageryLayerFeatureInfo","./ImageryProvider"],function(e,t,r,i,n,o,s,a,l,c,u,h,d,m,g,f,y,p,_,v,w,x){"use strict";function P(r){if(r=n(r,{}),!o(r.url))throw new a("options.url is required.");var s=m.createIfNeeded(r.url);s.appendForwardSlash(),o(r.token)&&s.setQueryParameters({token:r.token}),this._resource=s,this._tileDiscardPolicy=r.tileDiscardPolicy,this._tileWidth=n(r.tileWidth,256),this._tileHeight=n(r.tileHeight,256),this._maximumLevel=r.maximumLevel,this._tilingScheme=n(r.tilingScheme,new u({ellipsoid:r.ellipsoid})),this._useTiles=n(r.usePreCachedTilesIfAvailable,!0),this._rectangle=n(r.rectangle,this._tilingScheme.rectangle),this._layers=r.layers;var c=r.credit;"string"==typeof c&&(c=new i(c)),this._credit=c,this.enablePickFeatures=n(r.enablePickFeatures,!0),this._errorEvent=new l,this._ready=!1,this._readyPromise=_.defer();var h,w=this;function x(n){var s=n.tileInfo;if(o(s)){if(w._tileWidth=s.rows,w._tileHeight=s.cols,102100===s.spatialReference.wkid||102113===s.spatialReference.wkid)w._tilingScheme=new p({ellipsoid:r.ellipsoid});else{if(4326!==n.tileInfo.spatialReference.wkid){var a="Tile spatial reference WKID "+n.tileInfo.spatialReference.wkid+" is not supported.";return void(h=f.handleError(h,w,w._errorEvent,a,void 0,void 0,void 0,R))}w._tilingScheme=new u({ellipsoid:r.ellipsoid})}if(w._maximumLevel=n.tileInfo.lods.length-1,o(n.fullExtent)){if(o(n.fullExtent.spatialReference)&&o(n.fullExtent.spatialReference.wkid))if(102100===n.fullExtent.spatialReference.wkid||102113===n.fullExtent.spatialReference.wkid){var l=new y,c=n.fullExtent,m=l.unproject(new t(Math.max(c.xmin,-w._tilingScheme.ellipsoid.maximumRadius*Math.PI),Math.max(c.ymin,-w._tilingScheme.ellipsoid.maximumRadius*Math.PI),0)),g=l.unproject(new t(Math.min(c.xmax,w._tilingScheme.ellipsoid.maximumRadius*Math.PI),Math.min(c.ymax,w._tilingScheme.ellipsoid.maximumRadius*Math.PI),0));w._rectangle=new d(m.longitude,m.latitude,g.longitude,g.latitude)}else{if(4326!==n.fullExtent.spatialReference.wkid){var _="fullExtent.spatialReference WKID "+n.fullExtent.spatialReference.wkid+" is not supported.";return void(h=f.handleError(h,w,w._errorEvent,_,void 0,void 0,void 0,R))}w._rectangle=d.fromDegrees(n.fullExtent.xmin,n.fullExtent.ymin,n.fullExtent.xmax,n.fullExtent.ymax)}}else w._rectangle=w._tilingScheme.rectangle;o(w._tileDiscardPolicy)||(w._tileDiscardPolicy=new v({missingImageUrl:b(w,0,0,w._maximumLevel).url,pixelsToCheck:[new e(0,0),new e(200,20),new e(20,200),new e(80,110),new e(160,130)],disableCheckIfAllPixelsAreTransparent:!0})),w._useTiles=!0}else w._useTiles=!1;o(n.copyrightText)&&n.copyrightText.length>0&&(w._credit=new i(n.copyrightText)),w._ready=!0,w._readyPromise.resolve(!0),f.handleSuccess(h)}function P(e){var t="An error occurred while accessing "+w._resource.url+".";h=f.handleError(h,w,w._errorEvent,t,void 0,void 0,void 0,R),w._readyPromise.reject(new g(t))}function R(){var e=w._resource.getDerivedResource({queryParameters:{f:"json"}}).fetchJsonp();_(e,x,P)}this._useTiles?R():(this._ready=!0,this._readyPromise.resolve(!0))}function b(e,t,r,i,n){var o;if(e._useTiles)o=e._resource.getDerivedResource({url:"tile/"+i+"/"+r+"/"+t,request:n});else{var s=e._tilingScheme.tileXYToNativeRectangle(t,r,i),a={bbox:s.west+","+s.south+","+s.east+","+s.north,size:e._tileWidth+","+e._tileHeight,format:"png",transparent:!0,f:"image"};e._tilingScheme.projection instanceof c?(a.bboxSR=4326,a.imageSR=4326):(a.bboxSR=3857,a.imageSR=3857),e.layers&&(a.layers="show:"+e.layers),o=e._resource.getDerivedResource({url:"export",request:n,queryParameters:a})}return o}return s(P.prototype,{url:{get:function(){return this._resource._url}},token:{get:function(){return this._resource.queryParameters.token}},proxy:{get:function(){return this._resource.proxy}},tileWidth:{get:function(){if(!this._ready)throw new a("tileWidth must not be called before the imagery provider is ready.");return this._tileWidth}},tileHeight:{get:function(){if(!this._ready)throw new a("tileHeight must not be called before the imagery provider is ready.");return this._tileHeight}},maximumLevel:{get:function(){if(!this._ready)throw new a("maximumLevel must not be called before the imagery provider is ready.");return this._maximumLevel}},minimumLevel:{get:function(){if(!this._ready)throw new a("minimumLevel must not be called before the imagery provider is ready.");return 0}},tilingScheme:{get:function(){if(!this._ready)throw new a("tilingScheme must not be called before the imagery provider is ready.");return this._tilingScheme}},rectangle:{get:function(){if(!this._ready)throw new a("rectangle must not be called before the imagery provider is ready.");return this._rectangle}},tileDiscardPolicy:{get:function(){if(!this._ready)throw new a("tileDiscardPolicy must not be called before the imagery provider is ready.");return this._tileDiscardPolicy}},errorEvent:{get:function(){return this._errorEvent}},ready:{get:function(){return this._ready}},readyPromise:{get:function(){return this._readyPromise.promise}},credit:{get:function(){return this._credit}},usingPrecachedTiles:{get:function(){return this._useTiles}},hasAlphaChannel:{get:function(){return!0}},layers:{get:function(){return this._layers}}}),P.prototype.getTileCredits=function(e,t,r){},P.prototype.requestImage=function(e,t,r,i){if(!this._ready)throw new a("requestImage must not be called before the imagery provider is ready.");return x.loadImage(this,b(this,e,t,r,i))},P.prototype.pickFeatures=function(e,i,n,s,l){if(!this._ready)throw new a("pickFeatures must not be called before the imagery provider is ready.");if(this.enablePickFeatures){var u,d,m,g=this._tilingScheme.tileXYToNativeRectangle(e,i,n);if(this._tilingScheme.projection instanceof c)u=h.toDegrees(s),d=h.toDegrees(l),m="4326";else{var f=this._tilingScheme.projection.project(new r(s,l,0));u=f.x,d=f.y,m="3857"}var p="visible";o(this._layers)&&(p+=":"+this._layers);var _={f:"json",tolerance:2,geometryType:"esriGeometryPoint",geometry:u+","+d,mapExtent:g.west+","+g.south+","+g.east+","+g.north,imageDisplay:this._tileWidth+","+this._tileHeight+",96",sr:m,layers:p};return this._resource.getDerivedResource({url:"identify",queryParameters:_}).fetchJson().then(function(e){var i=[],n=e.results;if(!o(n))return i;for(var s=0;s<n.length;++s){var a=n[s],l=new w;if(l.data=a,l.name=a.value,l.properties=a.attributes,l.configureDescriptionFromProperties(a.attributes),"esriGeometryPoint"===a.geometryType&&a.geometry){var c=a.geometry.spatialReference&&a.geometry.spatialReference.wkid?a.geometry.spatialReference.wkid:4326;if(4326===c||4283===c)l.position=r.fromDegrees(a.geometry.x,a.geometry.y,a.geometry.z);else if(102100===c||900913===c||3857===c){var u=new y;l.position=u.unproject(new t(a.geometry.x,a.geometry.y,a.geometry.z))}}i.push(l)}return i})}},P});