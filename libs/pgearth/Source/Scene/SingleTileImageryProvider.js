define(["../Core/Credit","../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/DeveloperError","../Core/Event","../Core/GeographicTilingScheme","../Core/Rectangle","../Core/Resource","../Core/RuntimeError","../Core/TileProviderError","../ThirdParty/when"],function(e,r,t,i,n,o,h,s,a,d,u,l){"use strict";function c(i){if(i=r(i,{}),!t(i.url))throw new n("options.url is required.");var c=a.createIfNeeded(i.url),g=r(i.rectangle,s.MAX_VALUE),m=new h({rectangle:g,numberOfLevelZeroTilesX:1,numberOfLevelZeroTilesY:1,ellipsoid:i.ellipsoid});this._tilingScheme=m,this._resource=c,this._image=void 0,this._texture=void 0,this._tileWidth=0,this._tileHeight=0,this._errorEvent=new o,this._ready=!1,this._readyPromise=l.defer();var f=i.credit;"string"==typeof f&&(f=new e(f)),this._credit=f;var y,_=this;function v(e){_._image=e,_._tileWidth=e.width,_._tileHeight=e.height,_._ready=!0,_._readyPromise.resolve(!0),u.handleSuccess(_._errorEvent)}function p(e){var r="Failed to load image "+c.url+".";y=u.handleError(y,_,_._errorEvent,r,0,0,0,w,e),_._readyPromise.reject(new d(r))}function w(){c.fetchImage().then(v).otherwise(p)}w()}return i(c.prototype,{url:{get:function(){return this._resource.url}},proxy:{get:function(){return this._resource.proxy}},tileWidth:{get:function(){if(!this._ready)throw new n("tileWidth must not be called before the imagery provider is ready.");return this._tileWidth}},tileHeight:{get:function(){if(!this._ready)throw new n("tileHeight must not be called before the imagery provider is ready.");return this._tileHeight}},maximumLevel:{get:function(){if(!this._ready)throw new n("maximumLevel must not be called before the imagery provider is ready.");return 0}},minimumLevel:{get:function(){if(!this._ready)throw new n("minimumLevel must not be called before the imagery provider is ready.");return 0}},tilingScheme:{get:function(){if(!this._ready)throw new n("tilingScheme must not be called before the imagery provider is ready.");return this._tilingScheme}},rectangle:{get:function(){return this._tilingScheme.rectangle}},tileDiscardPolicy:{get:function(){if(!this._ready)throw new n("tileDiscardPolicy must not be called before the imagery provider is ready.")}},errorEvent:{get:function(){return this._errorEvent}},ready:{get:function(){return this._ready}},readyPromise:{get:function(){return this._readyPromise.promise}},credit:{get:function(){return this._credit}},hasAlphaChannel:{get:function(){return!0}}}),c.prototype.getTileCredits=function(e,r,t){},c.prototype.requestImage=function(e,r,t,i){if(!this._ready)throw new n("requestImage must not be called before the imagery provider is ready.");return this._image},c.prototype.pickFeatures=function(e,r,t,i,n){},c});