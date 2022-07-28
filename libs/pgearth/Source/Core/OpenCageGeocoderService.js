define(["./Cartesian3","./Check","./combine","./defaultValue","./defined","./defineProperties","./GeocodeType","./Rectangle","./Resource"],function(e,t,r,n,s,a,o,u,i){"use strict";function f(e,r,a){t.defined("url",e),t.defined("apiKey",r),s(a)&&t.typeOf.object("params",a),(e=i.createIfNeeded(e)).appendForwardSlash(),e.setQueryParameters({key:r}),this._url=e,this._params=n(a,{})}return a(f.prototype,{url:{get:function(){return this._url}},params:{get:function(){return this._params}}}),f.prototype.geocode=function(n){return t.typeOf.string("query",n),this._url.getDerivedResource({url:"json",queryParameters:r(this._params,{q:n})}).fetchJson().then(function(t){return t.results.map(function(t){var r,n=t.bounds;if(s(n))r=u.fromDegrees(n.southwest.lng,n.southwest.lat,n.northeast.lng,n.northeast.lat);else{var a=t.geometry.lat,o=t.geometry.lng;r=e.fromDegrees(a,o)}return{displayName:t.formatted,destination:r}})})},f});