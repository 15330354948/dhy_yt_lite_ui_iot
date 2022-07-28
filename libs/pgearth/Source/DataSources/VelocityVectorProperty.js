define(["../Core/Cartesian3","../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/DeveloperError","../Core/Event","../Core/JulianDate","./Property"],function(i,t,e,n,o,s,r,a){"use strict";function u(i,e){this._position=void 0,this._subscription=void 0,this._definitionChanged=new s,this._normalize=t(e,!0),this.position=i}n(u.prototype,{isConstant:{get:function(){return a.isConstant(this._position)}},definitionChanged:{get:function(){return this._definitionChanged}},position:{get:function(){return this._position},set:function(i){var t=this._position;t!==i&&(e(t)&&this._subscription(),this._position=i,e(i)&&(this._subscription=i._definitionChanged.addEventListener(function(){this._definitionChanged.raiseEvent(this)},this)),this._definitionChanged.raiseEvent(this))}},normalize:{get:function(){return this._normalize},set:function(i){this._normalize!==i&&(this._normalize=i,this._definitionChanged.raiseEvent(this))}}});var h=new i,d=new i,f=new r;return u.prototype.getValue=function(i,t){return this._getValue(i,t)},u.prototype._getValue=function(t,n,s){if(!e(t))throw new o("time is required");e(n)||(n=new i);var u=this._position;if(a.isConstant(u))return this._normalize?void 0:i.clone(i.ZERO,n);var l=u.getValue(t,h),_=u.getValue(r.addSeconds(t,1/60,f),d);if(e(l)&&(e(_)||(_=l,l=u.getValue(r.addSeconds(t,-1/60,f),d),e(l)))){if(i.equals(l,_))return this._normalize?void 0:i.clone(i.ZERO,n);e(s)&&l.clone(s);var c=i.subtract(_,l,n);return this._normalize?i.normalize(c,n):i.divideByScalar(c,1/60,n)}},u.prototype.equals=function(i){return this===i||i instanceof u&&a.equals(this._position,i._position)},u});