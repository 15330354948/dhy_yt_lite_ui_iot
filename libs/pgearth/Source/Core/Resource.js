define(["../ThirdParty/Uri","../ThirdParty/when","./appendForwardSlash","./Check","./clone","./combine","./defaultValue","./defined","./defineProperties","./DeveloperError","./freezeObject","./getAbsoluteUri","./getBaseUri","./getExtensionFromUri","./isBlobUri","./isCrossOriginUrl","./isDataUri","./loadAndExecuteScript","./objectToQuery","./queryToObject","./Request","./RequestErrorEvent","./RequestScheduler","./RequestState","./RuntimeError","./TrustedServers"],function(e,t,r,n,o,i,s,a,u,p,c,l,f,h,m,d,y,v,g,w,A,T,_,q,b,I){"use strict";var B,U=function(){try{var e=new XMLHttpRequest;return e.open("GET","#",!0),e.responseType="blob","blob"===e.responseType}catch(e){return!1}}();function O(e,t,r,n){var o,i=e.query;if(!a(i)||0===i.length)return{};if(-1===i.indexOf("=")){var s={};s[i]=void 0,o=s}else o=w(i);t._queryParameters=r?P(o,t._queryParameters,n):o,e.query=void 0}function E(e,t){return a(e)?a(e.clone)?e.clone():o(e):t}function S(e){if(e.state===q.ISSUED||e.state===q.ACTIVE)throw new b("The Resource is already being fetched.");e.state=q.UNISSUED,e.deferred=void 0}function P(e,t,r){if(!r)return i(e,t);var n=o(e,!0);for(var s in t)if(t.hasOwnProperty(s)){var u=n[s],p=t[s];a(u)?(Array.isArray(u)||(u=n[s]=[u]),n[s]=u.concat(p)):n[s]=Array.isArray(p)?p.slice():p}return n}function R(t){"string"==typeof(t=s(t,s.EMPTY_OBJECT))&&(t={url:t}),n.typeOf.string("options.url",t.url),this._url=void 0,this._templateValues=E(t.templateValues,{}),this._queryParameters=E(t.queryParameters,{}),this.headers=E(t.headers,{}),this.request=s(t.request,new A),this.proxy=t.proxy,this.retryCallback=t.retryCallback,this.retryAttempts=s(t.retryAttempts,0),this._retryCount=0;var r=new e(t.url);O(r,this,!0,!0),r.fragment=void 0,this._url=r.toString()}function C(e){var r=e.resource,n=e.flipY,o=e.preferImageBitmap,i=r.request;i.url=r.url,i.requestFunction=function(){var e=r.url,i=!1;r.isDataUri||r.isBlobUri||(i=r.isCrossOriginUrl);var s=t.defer();return R._Implementations.createImage(e,i,s,n,o),s.promise};var s=_.request(i);if(a(s))return s.otherwise(function(e){return i.state!==q.FAILED?t.reject(e):r.retryOnError(e).then(function(s){return s?(i.state=q.UNISSUED,i.deferred=void 0,C({resource:r,flipY:n,preferImageBitmap:o})):t.reject(e)})})}R.createIfNeeded=function(e){return e instanceof R?e.getDerivedResource({request:e.request}):"string"!=typeof e?e:new R({url:e})},R.supportsImageBitmapOptions=function(){if(a(B))return B;if("function"!=typeof createImageBitmap)return B=t.resolve(!1);return B=R.fetchBlob({url:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP4////fwAJ+wP9CNHoHgAAAABJRU5ErkJggg=="}).then(function(e){return createImageBitmap(e,{imageOrientation:"flipY",premultiplyAlpha:"none"})}).then(function(e){return!0}).otherwise(function(){return!1})},u(R,{isBlobSupported:{get:function(){return U}}}),u(R.prototype,{queryParameters:{get:function(){return this._queryParameters}},templateValues:{get:function(){return this._templateValues}},url:{get:function(){return this.getUrlComponent(!0,!0)},set:function(t){var r=new e(t);O(r,this,!1),r.fragment=void 0,this._url=r.toString()}},extension:{get:function(){return h(this._url)}},isDataUri:{get:function(){return y(this._url)}},isBlobUri:{get:function(){return m(this._url)}},isCrossOriginUrl:{get:function(){return d(this._url)}},hasHeaders:{get:function(){return Object.keys(this.headers).length>0}}}),R.prototype.getUrlComponent=function(t,r){if(this.isDataUri)return this._url;var n=new e(this._url);t&&function(e,t){var r=t._queryParameters,n=Object.keys(r);1!==n.length||a(r[n[0]])?e.query=g(r):e.query=n[0]}(n,this);var o=n.toString().replace(/%7B/g,"{").replace(/%7D/g,"}"),i=this._templateValues;return o=o.replace(/{(.*?)}/g,function(e,t){var r=i[t];return a(r)?encodeURIComponent(r):e}),r&&a(this.proxy)&&(o=this.proxy.getURL(o)),o},R.prototype.setQueryParameters=function(e,t){this._queryParameters=t?P(this._queryParameters,e,!1):P(e,this._queryParameters,!1)},R.prototype.appendQueryParameters=function(e){this._queryParameters=P(e,this._queryParameters,!0)},R.prototype.setTemplateValues=function(e,t){this._templateValues=t?i(this._templateValues,e):i(e,this._templateValues)},R.prototype.getDerivedResource=function(t){var r=this.clone();if(r._retryCount=0,a(t.url)){var n=new e(t.url);O(n,r,!0,s(t.preserveQueryParameters,!1)),n.fragment=void 0,r._url=n.resolve(new e(l(this._url))).toString()}return a(t.queryParameters)&&(r._queryParameters=i(t.queryParameters,r._queryParameters)),a(t.templateValues)&&(r._templateValues=i(t.templateValues,r.templateValues)),a(t.headers)&&(r.headers=i(t.headers,r.headers)),a(t.proxy)&&(r.proxy=t.proxy),a(t.request)&&(r.request=t.request),a(t.retryCallback)&&(r.retryCallback=t.retryCallback),a(t.retryAttempts)&&(r.retryAttempts=t.retryAttempts),r},R.prototype.retryOnError=function(e){var r=this.retryCallback;if("function"!=typeof r||this._retryCount>=this.retryAttempts)return t(!1);var n=this;return t(r(this,e)).then(function(e){return++n._retryCount,e})},R.prototype.clone=function(e){return a(e)||(e=new R({url:this._url})),e._url=this._url,e._queryParameters=o(this._queryParameters),e._templateValues=o(this._templateValues),e.headers=o(this.headers),e.proxy=this.proxy,e.retryCallback=this.retryCallback,e.retryAttempts=this.retryAttempts,e._retryCount=0,e.request=this.request.clone(),e},R.prototype.getBaseUri=function(e){return f(this.getUrlComponent(e),e)},R.prototype.appendForwardSlash=function(){this._url=r(this._url)},R.prototype.fetchArrayBuffer=function(){return this.fetch({responseType:"arraybuffer"})},R.fetchArrayBuffer=function(e){return new R(e).fetchArrayBuffer()},R.prototype.fetchBlob=function(){return this.fetch({responseType:"blob"})},R.fetchBlob=function(e){return new R(e).fetchBlob()},R.prototype.fetchImage=function(e){e=s(e,s.EMPTY_OBJECT);var r=s(e.preferImageBitmap,!1),n=s(e.preferBlob,!1),o=s(e.flipY,!1);if(S(this.request),!U||this.isDataUri||this.isBlobUri||!this.hasHeaders&&!n)return C({resource:this,flipY:o,preferImageBitmap:r});var i,u,p,c=this.fetchBlob();return a(c)?R.supportsImageBitmapOptions().then(function(e){return i=e&&r,c}).then(function(e){if(a(e)){if(p=e,i)return R.createImageBitmapFromBlob(e,{flipY:o,premultiplyAlpha:!1});var t=window.URL.createObjectURL(e);return C({resource:u=new R({url:t}),flipY:o,preferImageBitmap:!1})}}).then(function(e){if(a(e))return e.blob=p,i?e:(window.URL.revokeObjectURL(u.url),e)}).otherwise(function(e){return a(u)&&window.URL.revokeObjectURL(u.url),e.blob=p,t.reject(e)}):void 0},R.fetchImage=function(e){return new R(e).fetchImage({flipY:e.flipY,preferBlob:e.preferBlob,preferImageBitmap:e.preferImageBitmap})},R.prototype.fetchText=function(){return this.fetch({responseType:"text"})},R.fetchText=function(e){return new R(e).fetchText()},R.prototype.fetchJson=function(){var e=this.fetch({responseType:"text",headers:{Accept:"application/json,*/*;q=0.01"}});if(a(e))return e.then(function(e){if(a(e))return JSON.parse(e)})},R.fetchJson=function(e){return new R(e).fetchJson()},R.prototype.fetchXML=function(){return this.fetch({responseType:"document",overrideMimeType:"text/xml"})},R.fetchXML=function(e){return new R(e).fetchXML()},R.prototype.fetchJsonp=function(e){var r;e=s(e,"callback"),S(this.request);do{r="loadJsonp"+Math.random().toString().substring(2,8)}while(a(window[r]));return function e(r,n,o){var i={};i[n]=o;r.setQueryParameters(i);var s=r.request;s.url=r.url;s.requestFunction=function(){var e=t.defer();return window[o]=function(t){e.resolve(t);try{delete window[o]}catch(e){window[o]=void 0}},R._Implementations.loadAndExecuteScript(r.url,o,e),e.promise};var u=_.request(s);if(!a(u))return;return u.otherwise(function(i){return s.state!==q.FAILED?t.reject(i):r.retryOnError(i).then(function(a){return a?(s.state=q.UNISSUED,s.deferred=void 0,e(r,n,o)):t.reject(i)})})}(this,e,r)},R.fetchJsonp=function(e){return new R(e).fetchJsonp(e.callbackParameterName)},R.prototype._makeRequest=function(e){var r=this;S(r.request);var n=r.request;n.url=r.url,n.requestFunction=function(){var o=e.responseType,s=i(e.headers,r.headers),u=e.overrideMimeType,p=e.method,c=e.data,l=t.defer(),f=R._Implementations.loadWithXhr(r.url,o,p,c,s,l,u);return a(f)&&a(f.abort)&&(n.cancelFunction=function(){f.abort()}),l.promise};var o=_.request(n);if(a(o))return o.then(function(e){return e}).otherwise(function(o){return n.state!==q.FAILED?t.reject(o):r.retryOnError(o).then(function(i){return i?(n.state=q.UNISSUED,n.deferred=void 0,r.fetch(e)):t.reject(o)})})};var j=/^data:(.*?)(;base64)?,(.*)$/;function M(e,t){var r=decodeURIComponent(t);return e?atob(r):r}function x(e,t){for(var r=M(e,t),n=new ArrayBuffer(r.length),o=new Uint8Array(n),i=0;i<r.length;i++)o[i]=r.charCodeAt(i);return n}function D(e,t){switch(t){case"text":return e.toString("utf8");case"json":return JSON.parse(e.toString("utf8"));default:return new Uint8Array(e).buffer}}R.prototype.fetch=function(e){return(e=E(e,{})).method="GET",this._makeRequest(e)},R.fetch=function(e){return new R(e).fetch({responseType:e.responseType,overrideMimeType:e.overrideMimeType})},R.prototype.delete=function(e){return(e=E(e,{})).method="DELETE",this._makeRequest(e)},R.delete=function(e){return new R(e).delete({responseType:e.responseType,overrideMimeType:e.overrideMimeType,data:e.data})},R.prototype.head=function(e){return(e=E(e,{})).method="HEAD",this._makeRequest(e)},R.head=function(e){return new R(e).head({responseType:e.responseType,overrideMimeType:e.overrideMimeType})},R.prototype.options=function(e){return(e=E(e,{})).method="OPTIONS",this._makeRequest(e)},R.options=function(e){return new R(e).options({responseType:e.responseType,overrideMimeType:e.overrideMimeType})},R.prototype.post=function(e,t){return n.defined("data",e),(t=E(t,{})).method="POST",t.data=e,this._makeRequest(t)},R.post=function(e){return new R(e).post(e.data,{responseType:e.responseType,overrideMimeType:e.overrideMimeType})},R.prototype.put=function(e,t){return n.defined("data",e),(t=E(t,{})).method="PUT",t.data=e,this._makeRequest(t)},R.put=function(e){return new R(e).put(e.data,{responseType:e.responseType,overrideMimeType:e.overrideMimeType})},R.prototype.patch=function(e,t){return n.defined("data",e),(t=E(t,{})).method="PATCH",t.data=e,this._makeRequest(t)},R.patch=function(e){return new R(e).patch(e.data,{responseType:e.responseType,overrideMimeType:e.overrideMimeType})},R._Implementations={},R._Implementations.createImage=function(e,t,r,n,o){R.supportsImageBitmapOptions().then(function(n){if(n&&o)return R.fetchBlob({url:e});!function(e,t,r){var n=new Image;n.onload=function(){r.resolve(n)},n.onerror=function(e){r.reject(e)},t&&(I.contains(e)?n.crossOrigin="use-credentials":n.crossOrigin=""),n.src=e}(e,t,r)}).then(function(e){if(a(e))return R.createImageBitmapFromBlob(e,{flipY:n,premultiplyAlpha:!1})}).then(function(e){a(e)&&r.resolve(e)}).otherwise(r.reject)},R.createImageBitmapFromBlob=function(e,t){return n.defined("options",t),n.typeOf.bool("options.flipY",t.flipY),n.typeOf.bool("options.premultiplyAlpha",t.premultiplyAlpha),createImageBitmap(e,{imageOrientation:t.flipY?"flipY":"none",premultiplyAlpha:t.premultiplyAlpha?"premultiply":"none"})};var k="undefined"==typeof XMLHttpRequest;return R._Implementations.loadWithXhr=function(e,t,r,n,o,i,u){var c=j.exec(e);if(null===c){if(!k){var l=new XMLHttpRequest;if(I.contains(e)&&(l.withCredentials=!0),l.open(r,e,!0),a(u)&&a(l.overrideMimeType)&&l.overrideMimeType(u),a(o))for(var f in o)o.hasOwnProperty(f)&&l.setRequestHeader(f,o[f]);a(t)&&(l.responseType=t);var h=!1;return"string"==typeof e&&(h=0===e.indexOf("file://")||"undefined"!=typeof window&&"file://"===window.location.origin),l.onload=function(){if(!(l.status<200||l.status>=300)||h&&0===l.status){var e=l.response,n=l.responseType;if("HEAD"===r||"OPTIONS"===r){var o={};return l.getAllResponseHeaders().trim().split(/[\r\n]+/).forEach(function(e){var t=e.split(": "),r=t.shift();o[r]=t.join(": ")}),void i.resolve(o)}if(a(e)&&"string"==typeof e)try{if(-1===JSON.parse(e).code)return void i.reject(new T(l.status,l.response,l.getAllResponseHeaders()))}catch(e){i.reject(e)}if(204===l.status)i.resolve();else if(!a(e)||a(t)&&n!==t)if("json"===t&&"string"==typeof e)try{i.resolve(JSON.parse(e))}catch(e){i.reject(e)}else(""===n||"document"===n)&&a(l.responseXML)&&l.responseXML.hasChildNodes()?i.resolve(l.responseXML):""!==n&&"text"!==n||!a(l.responseText)?i.reject(new b("Invalid XMLHttpRequest response type.")):i.resolve(l.responseText);else i.resolve(e)}else i.reject(new T(l.status,l.response,l.getAllResponseHeaders()))},l.onerror=function(e){i.reject(new T)},l.send(n),l}!function(e,t,r,n,o,i,s){var a=global.require,u=a("url").parse(e),p="https:"===u.protocol?a("https"):a("http"),c=a("zlib"),l={protocol:u.protocol,hostname:u.hostname,port:u.port,path:u.path,query:u.query,method:r,headers:o};p.request(l).on("response",function(e){if(e.statusCode<200||e.statusCode>=300)i.reject(new T(e.statusCode,e,e.headers));else{var r=[];e.on("data",function(e){r.push(e)}),e.on("end",function(){var n=Buffer.concat(r);"gzip"===e.headers["content-encoding"]?c.gunzip(n,function(e,r){e?i.reject(new b("Error decompressing response.")):i.resolve(D(r,t))}):i.resolve(D(n,t))})}}).on("error",function(e){i.reject(new T)}).end()}(e,t,r,0,o,i)}else i.resolve(function(e,t){t=s(t,"");var r=e[1],n=!!e[2],o=e[3];switch(t){case"":case"text":return M(n,o);case"arraybuffer":return x(n,o);case"blob":var i=x(n,o);return new Blob([i],{type:r});case"document":return(new DOMParser).parseFromString(M(n,o),r);case"json":return JSON.parse(M(n,o));default:throw new p("Unhandled responseType: "+t)}}(c,t))},R._Implementations.loadAndExecuteScript=function(e,t,r){return v(e,t).otherwise(r.reject)},R._DefaultImplementations={},R._DefaultImplementations.createImage=R._Implementations.createImage,R._DefaultImplementations.loadWithXhr=R._Implementations.loadWithXhr,R._DefaultImplementations.loadAndExecuteScript=R._Implementations.loadAndExecuteScript,R.DEFAULT=c(new R({url:"undefined"==typeof document?"":document.location.href.split("?")[0]})),R});