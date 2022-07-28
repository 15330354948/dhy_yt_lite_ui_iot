define(["./Check","./defaultValue","./defined","./defineProperties","./DeveloperError","./Spline"],function(t,e,i,n,r,s){"use strict";function h(i){var n=(i=e(i,e.EMPTY_OBJECT)).weights,s=i.times;if(t.defined("weights",n),t.defined("times",s),t.typeOf.number.greaterThanOrEquals("weights.length",n.length,3),n.length%s.length!=0)throw new r("times.length must be a factor of weights.length.");this._times=s,this._weights=n,this._count=n.length/s.length,this._lastTimeIndex=0}return n(h.prototype,{times:{get:function(){return this._times}},weights:{get:function(){return this._weights}}}),h.prototype.findTimeInterval=s.prototype.findTimeInterval,h.prototype.wrapTime=s.prototype.wrapTime,h.prototype.clampTime=s.prototype.clampTime,h.prototype.evaluate=function(t,e){var n=this.weights,r=this.times,s=this._lastTimeIndex=this.findTimeInterval(t,this._lastTimeIndex),h=(t-r[s])/(r[s+1]-r[s]);i(e)||(e=new Array(this._count));for(var o=0;o<this._count;o++){var a=s*this._count+o;e[o]=n[a]*(1-h)+n[a+this._count]*h}return e},h});