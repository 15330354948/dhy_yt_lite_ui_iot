define(["../Core/Cartesian2","../Core/Cartesian3","../Core/Check","../Core/Color","../Core/defaultValue","../Core/defined","../Core/defineProperties"],function(e,i,t,o,s,r,n){"use strict";var a=new e(1,1);function l(t){t=s(t,s.EMPTY_OBJECT),this.mass=s(t.mass,1),this.position=i.clone(s(t.position,i.ZERO)),this.velocity=i.clone(s(t.velocity,i.ZERO)),this.life=s(t.life,Number.MAX_VALUE),this.image=t.image,this.startColor=o.clone(s(t.startColor,o.WHITE)),this.endColor=o.clone(s(t.endColor,o.WHITE)),this.startScale=s(t.startScale,1),this.endScale=s(t.endScale,1),this.imageSize=e.clone(s(t.imageSize,a)),this._age=0,this._normalizedAge=0,this._billboard=void 0}n(l.prototype,{age:{get:function(){return this._age}},normalizedAge:{get:function(){return this._normalizedAge}}});var h=new i;return l.prototype.update=function(e,t){return i.multiplyByScalar(this.velocity,e,h),i.add(this.position,h,this.position),r(t)&&t(this,e),this._age+=e,this.life===Number.MAX_VALUE?this._normalizedAge=0:this._normalizedAge=this._age/this.life,this._age<=this.life},l});