define(["../Core/Check","../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/DeveloperError","../Core/JulianDate","../Core/Request","../Core/RequestType"],function(e,t,i,r,n,o,c,s){"use strict";function u(i){i=t(i,t.EMPTY_OBJECT),e.typeOf.object("options.clock",i.clock),e.typeOf.object("options.times",i.times),e.typeOf.func("options.requestImageFunction",i.requestImageFunction),e.typeOf.func("options.reloadFunction",i.reloadFunction),this._tileCache={},this._tilesRequestedForInterval=[];var r=this._clock=i.clock;this._times=i.times,this._requestImageFunction=i.requestImageFunction,this._reloadFunction=i.reloadFunction,this._currentIntervalIndex=-1,r.onTick.addEventListener(this._clockOnTick,this),this._clockOnTick(r)}function l(e,t,i){return e+"-"+t+"-"+i}function a(e){var t=e._times;if(i(t)){var r=e._clock,n=r.currentTime,c=r.canAnimate&&r.shouldAnimate,s=r.multiplier;if(c||0===s){var u,l=t.indexOf(n);if(!(l<0)){var a=t.get(l);return s>0?(u=o.secondsDifference(a.stop,n),++l):(u=o.secondsDifference(a.start,n),--l),u/=s,l>=0&&u<=5?t.get(l):void 0}}}}function h(e,t,r){var n=e._times.indexOf(r.start),o=e._tileCache,u=o[n];i(u)||(u=o[n]={});var l=t.key;if(i(u[l]))return!0;var a=function(e){var t=e.split("-");if(3===t.length)return{x:Number(t[0]),y:Number(t[1]),level:Number(t[2])}}(l),h=new c({throttle:!0,throttleByServer:!0,type:s.IMAGERY,priorityFunction:t.priorityFunction}),f=e._requestImageFunction(a.x,a.y,a.level,h,r);return!!i(f)&&(u[l]={promise:f,request:h},!0)}return r(u.prototype,{clock:{get:function(){return this._clock},set:function(e){if(!i(e))throw new n("value is required.");this._clock!==e&&(this._clock=e,this._clockOnTick(e),this._reloadFunction())}},times:{get:function(){return this._times},set:function(e){if(!i(e))throw new n("value is required.");this._times!==e&&(this._times=e,this._clockOnTick(this._clock),this._reloadFunction())}},currentInterval:{get:function(){return this._times.get(this._currentIntervalIndex)}}}),u.prototype.getFromCache=function(e,t,r,n){var o,c=l(e,t,r),s=this._tileCache[this._currentIntervalIndex];if(i(s)&&i(s[c])){var u=s[c];o=u.promise.otherwise(function(e){throw n.state=u.request.state,e}),delete s[c]}return o},u.prototype.checkApproachingInterval=function(e,t,r,n){var o=l(e,t,r),c=this._tilesRequestedForInterval,s=a(this),u={key:o,priorityFunction:n.priorityFunction};i(s)&&h(this,u,s)||c.push(u),c.length>=512&&c.splice(0,256)},u.prototype._clockOnTick=function(e){var t=e.currentTime,r=this._times.indexOf(t),n=this._currentIntervalIndex;if(r!==n){var o=this._tileCache[n];for(var c in o)o.hasOwnProperty(c)&&o[c].request.cancel();return delete this._tileCache[n],this._tilesRequestedForInterval=[],this._currentIntervalIndex=r,void this._reloadFunction()}var s=a(this);if(i(s))for(var u=this._tilesRequestedForInterval,l=!0;l&&0!==u.length;){var f=u.pop();(l=h(this,f,s))||u.push(f)}},u});