define(["../../Core/Cartesian2","../../Core/defaultValue","../../Core/defined","../../Core/defineProperties","../../Core/DeveloperError","../../Core/EasingFunction","../../Scene/SceneTransforms","../../ThirdParty/knockout"],function(e,t,i,n,o,s,r,c){"use strict";var a=new e,h="-1000px";function p(e,n,s){if(!i(e))throw new o("scene is required.");if(!i(n))throw new o("selectionIndicatorElement is required.");if(!i(s))throw new o("container is required.");this._scene=e,this._screenPositionX=h,this._screenPositionY=h,this._tweens=e.tweens,this._container=t(s,document.body),this._selectionIndicatorElement=n,this._scale=1,this.position=void 0,this.showSelection=!1,c.track(this,["position","_screenPositionX","_screenPositionY","_scale","showSelection"]),this.isVisible=void 0,c.defineProperty(this,"isVisible",{get:function(){return this.showSelection&&i(this.position)}}),c.defineProperty(this,"_transform",{get:function(){return"scale("+this._scale+")"}}),this.computeScreenSpacePosition=function(t,i){return r.wgs84ToWindowCoordinates(e,t,i)}}return p.prototype.update=function(){if(this.showSelection&&i(this.position)){var e=this.computeScreenSpacePosition(this.position,a);if(i(e)){var t=this._container,n=t.parentNode.clientWidth,o=t.parentNode.clientHeight,s=this._selectionIndicatorElement.clientWidth,r=.5*s;e.x=Math.min(Math.max(e.x,-s),n+s)-r,e.y=Math.min(Math.max(e.y,-s),o+s)-r,this._screenPositionX=Math.floor(e.x+.25)+"px",this._screenPositionY=Math.floor(e.y+.25)+"px"}else this._screenPositionX=h,this._screenPositionY=h}},p.prototype.animateAppear=function(){this._tweens.addProperty({object:this,property:"_scale",startValue:2,stopValue:1,duration:.8,easingFunction:s.EXPONENTIAL_OUT})},p.prototype.animateDepart=function(){this._tweens.addProperty({object:this,property:"_scale",startValue:this._scale,stopValue:1.5,duration:.8,easingFunction:s.EXPONENTIAL_OUT})},n(p.prototype,{container:{get:function(){return this._container}},selectionIndicatorElement:{get:function(){return this._selectionIndicatorElement}},scene:{get:function(){return this._scene}}}),p});