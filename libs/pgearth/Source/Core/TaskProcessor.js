define(["../ThirdParty/when","./buildModuleUrl","./defaultValue","./defined","./destroyObject","./DeveloperError","./Event","./FeatureDetection","./getAbsoluteUri","./isCrossOriginUrl","./Resource","./RuntimeError","require"],function(e,r,a,t,o,s,n,i,f,u,d,l,c){"use strict";function w(){if(!t(y._canTransferArrayBuffer)){var r=new Worker(k("Workers/transferTypedArrayTest.js"));r.postMessage=a(r.webkitPostMessage,r.postMessage);var o=new Int8Array([99]);try{r.postMessage({array:o},[o.buffer])}catch(e){return y._canTransferArrayBuffer=!1,y._canTransferArrayBuffer}var s=e.defer();r.onmessage=function(e){var a=e.data.array,o=t(a)&&99===a[0];s.resolve(o),r.terminate(),y._canTransferArrayBuffer=o},y._canTransferArrayBuffer=s.promise}return y._canTransferArrayBuffer}var m,p=new n;function v(e,r){--e._activeTasks;var a=r.id;if(t(a)){var o=e._deferreds,n=o[a];if(t(r.error)){var i=r.error;"RuntimeError"===i.name?(i=new l(r.error.message)).stack=r.error.stack:"DeveloperError"===i.name&&((i=new s(r.error.message)).stack=r.error.stack),p.raiseEvent(i),n.reject(i)}else p.raiseEvent(),n.resolve(r.result);delete o[a]}}function k(e){var a=r(e);if(u(a)){var t,o='importScripts("'+a+'");';try{t=new Blob([o],{type:"application/javascript"})}catch(e){var s=new(window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder);s.append(o),t=s.getBlob("application/javascript")}a=(window.URL||window.webkitURL).createObjectURL(t)}return a}function h(e){var o=new Worker((t(m)||(m=k("Workers/pgEarthWorkerBootstrapper.js")),m));o.postMessage=a(o.webkitPostMessage,o.postMessage);var s={loaderConfig:{},workerModule:y._workerModulePrefix+e._workerName};return t(y._loaderConfig)?s.loaderConfig=y._loaderConfig:(t(define.amd)&&!define.amd.toUrlUndefined&&t(c.toUrl)||(s.loaderConfig.paths={Workers:r("Workers")}),s.loaderConfig.baseUrl=r.getPGEarthBaseUrl().url),o.postMessage(s),o.onmessage=function(r){v(e,r.data)},o}function y(e,r){this._workerName=e,this._maximumActiveTasks=a(r,5),this._activeTasks=0,this._deferreds={},this._nextID=0}var _=[];return y.prototype.scheduleTask=function(r,a){if(t(this._worker)||(this._worker=h(this)),!(this._activeTasks>=this._maximumActiveTasks)){++this._activeTasks;var o=this;return e(w(),function(s){t(a)?s||(a.length=0):a=_;var n=o._nextID++,i=e.defer();return o._deferreds[n]=i,o._worker.postMessage({id:n,parameters:r,canTransferArrayBuffer:s},a),i.promise})}},y.prototype.initWebAssemblyModule=function(a){t(this._worker)||(this._worker=h(this));var o=e.defer(),s=this,n=this._worker;return function(a,o){var s={modulePath:void 0,wasmBinaryFile:void 0,wasmBinary:void 0};if(!i.supportsWebAssembly()){if(!t(o.fallbackModulePath))throw new l("This browser does not support Web Assembly, and no backup module was provided for "+a._workerName);return s.modulePath=r(o.fallbackModulePath),e.resolve(s)}return s.modulePath=r(o.modulePath),s.wasmBinaryFile=r(o.wasmBinaryFile),d.fetchArrayBuffer({url:s.wasmBinaryFile}).then(function(e){return s.wasmBinary=e,s})}(this,a).then(function(r){return e(w(),function(e){var a,i=r.wasmBinary;t(i)&&e&&(a=[i]),n.onmessage=function(e){n.onmessage=function(e){v(s,e.data)},o.resolve(e.data)},n.postMessage({webAssemblyConfig:r},a)})}),o},y.prototype.isDestroyed=function(){return!1},y.prototype.destroy=function(){return t(this._worker)&&this._worker.terminate(),o(this)},y.taskCompletedEvent=p,y._defaultWorkerModulePrefix="Workers/",y._workerModulePrefix=y._defaultWorkerModulePrefix,y._loaderConfig=void 0,y._canTransferArrayBuffer=void 0,y});