define(["../../Core/defaultValue","../../Core/defineProperties","../../Core/destroyObject","../../Core/DeveloperError","../../Core/Fullscreen","../../ThirdParty/knockout","../createCommand","../getElement"],function(e,t,n,l,r,s,i,o){"use strict";function c(t){var n=this,l=s.observable(r.fullscreen),c=s.observable(r.enabled);this.isFullscreen=void 0,s.defineProperty(this,"isFullscreen",{get:function(){return l()}}),this.isFullscreenEnabled=void 0,s.defineProperty(this,"isFullscreenEnabled",{get:function(){return c()},set:function(e){c(e&&r.enabled)}}),this.tooltip=void 0,s.defineProperty(this,"tooltip",function(){return this.isFullscreenEnabled?l()?"Exit full screen":"Full screen":"Full screen unavailable"}),this._command=i(function(){r.fullscreen?r.exitFullscreen():r.requestFullscreen(n._fullscreenElement)},s.getObservable(this,"isFullscreenEnabled")),this._fullscreenElement=e(o(t),document.body),this._callback=function(){l(r.fullscreen)},document.addEventListener(r.changeEventName,this._callback)}return t(c.prototype,{fullscreenElement:{get:function(){return this._fullscreenElement},set:function(e){if(!(e instanceof Element))throw new l("value must be a valid Element.");this._fullscreenElement=e}},command:{get:function(){return this._command}}}),c.prototype.isDestroyed=function(){return!1},c.prototype.destroy=function(){document.removeEventListener(r.changeEventName,this._callback),n(this)},c});