define(["../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/DeveloperError","../Core/freezeObject","../Core/GeographicTilingScheme","../Core/Resource","../Core/WebMercatorProjection","./GetFeatureInfoFormat","./TimeDynamicImagery","./UrlTemplateImageryProvider","../Core/createGuid"],function(e,t,r,i,n,o,a,s,u,c,l,m){"use strict";function d(r){if(r=e(r,e.EMPTY_OBJECT),!t(r.url))throw new i("options.url is required.");if(t(r.times)&&!t(r.clock))throw new i("options.times was specified, so options.clock is required.");var n=a.createIfNeeded(r.url),u=n.clone();n.setQueryParameters(d.DefaultParameters,!0),u.setQueryParameters(d.GetFeatureInfoDefaultParameters,!0),t(r.parameters)&&n.setQueryParameters(f(r.parameters)),t(r.getFeatureInfoParameters)&&u.setQueryParameters(f(r.getFeatureInfoParameters));var P=this;this._reload=void 0,t(r.times)&&(this._timeDynamicImagery=new c({clock:r.clock,times:r.times,requestImageFunction:function(e,t,r,i,n){return h(P,e,t,r,i,n)},reloadFunction:function(){t(P._reload)&&P._reload()}}));var g={bbox:"{westProjected},{southProjected},{eastProjected},{northProjected}"};g.uuid=m(),parseFloat(n.queryParameters.version)>=1.3?g.crs=e(r.crs,r.tilingScheme&&r.tilingScheme.projection instanceof s?"EPSG:3857":"CRS:84"):g.srs=e(r.srs,r.tilingScheme&&r.tilingScheme.projection instanceof s?"EPSG:3857":"EPSG:4326"),n.setQueryParameters(g,!0),u.setQueryParameters(g,!0);u.setQueryParameters({x:"{i}",y:"{j}"},!0),this._resource=n,this._pickFeaturesResource=u,this._layers=r.layers,this._tileProvider=new l({url:n,pickFeaturesUrl:u,tilingScheme:e(r.tilingScheme,new o({ellipsoid:r.ellipsoid})),rectangle:r.rectangle,tileWidth:r.tileWidth,tileHeight:r.tileHeight,minimumLevel:r.minimumLevel,maximumLevel:r.maximumLevel,subdomains:r.subdomains,tileDiscardPolicy:r.tileDiscardPolicy,credit:r.credit,getFeatureInfoFormats:e(r.getFeatureInfoFormats,d.DefaultGetFeatureInfoFormats),enablePickFeatures:r.enablePickFeatures})}function h(e,r,i,n,o,a){var s=t(a)?a.data:void 0,u=e._tileProvider;return t(s)&&u._resource.setQueryParameters(s),u.requestImage(r,i,n,o)}function f(e){var t={};for(var r in e)e.hasOwnProperty(r)&&(t[r.toLowerCase()]=e[r]);return t}return r(d.prototype,{url:{get:function(){return this._resource._url}},proxy:{get:function(){return this._resource.proxy}},layers:{get:function(){return this._layers}},tileWidth:{get:function(){return this._tileProvider.tileWidth}},tileHeight:{get:function(){return this._tileProvider.tileHeight}},maximumLevel:{get:function(){return this._tileProvider.maximumLevel}},minimumLevel:{get:function(){return this._tileProvider.minimumLevel}},tilingScheme:{get:function(){return this._tileProvider.tilingScheme}},rectangle:{get:function(){return this._tileProvider.rectangle}},tileDiscardPolicy:{get:function(){return this._tileProvider.tileDiscardPolicy}},errorEvent:{get:function(){return this._tileProvider.errorEvent}},ready:{get:function(){return this._tileProvider.ready}},readyPromise:{get:function(){return this._tileProvider.readyPromise}},credit:{get:function(){return this._tileProvider.credit}},hasAlphaChannel:{get:function(){return this._tileProvider.hasAlphaChannel}},enablePickFeatures:{get:function(){return this._tileProvider.enablePickFeatures},set:function(e){this._tileProvider.enablePickFeatures=e}},clock:{get:function(){return this._timeDynamicImagery.clock},set:function(e){this._timeDynamicImagery.clock=e}},times:{get:function(){return this._timeDynamicImagery.times},set:function(e){this._timeDynamicImagery.times=e}}}),d.prototype.getTileCredits=function(e,t,r){return this._tileProvider.getTileCredits(e,t,r)},d.prototype.requestImage=function(e,r,i,n){var o,a,s=this._timeDynamicImagery;return t(s)&&(a=s.currentInterval,o=s.getFromCache(e,r,i,n)),t(o)||(o=h(this,e,r,i,n,a)),t(o)&&t(s)&&s.checkApproachingInterval(e,r,i,n),o},d.prototype.pickFeatures=function(e,r,i,n,o){var a=this._timeDynamicImagery;return function(e,r,i,n,o,a,s){var u=t(s)?s.data:void 0,c=e._tileProvider;return t(u)&&c._pickFeaturesResource.setQueryParameters(u),c.pickFeatures(r,i,n,o,a)}(this,e,r,i,n,o,t(a)?a.currentInterval:void 0)},d.DefaultParameters=n({request:"GetMap"}),d.GetFeatureInfoDefaultParameters=n({request:"GetFeatureInfo"}),d.DefaultGetFeatureInfoFormats=n([n(new u("json","application/json")),n(new u("xml","text/xml")),n(new u("text","text/html"))]),d});