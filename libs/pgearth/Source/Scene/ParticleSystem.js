define(["../Core/Cartesian2","../Core/Cartesian3","../Core/Check","../Core/Color","../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/destroyObject","../Core/Event","../Core/JulianDate","../Core/Math","../Core/Matrix4","./BillboardCollection","./CircleEmitter","./Particle"],function(e,t,i,r,a,o,m,n,s,l,u,c,h,_,d){"use strict";var f=new e(1,1);function p(t){t=a(t,a.EMPTY_OBJECT),this.show=a(t.show,!0),this.updateCallback=t.updateCallback,this.loop=a(t.loop,!0),this.image=a(t.image,void 0);var i=t.emitter;o(i)||(i=new _(.5)),this._emitter=i,this._bursts=t.bursts,this._modelMatrix=c.clone(a(t.modelMatrix,c.IDENTITY)),this._emitterModelMatrix=c.clone(a(t.emitterModelMatrix,c.IDENTITY)),this._matrixDirty=!0,this._combinedMatrix=new c,this._startColor=r.clone(a(t.color,a(t.startColor,r.WHITE))),this._endColor=r.clone(a(t.color,a(t.endColor,r.WHITE))),this._startScale=a(t.scale,a(t.startScale,1)),this._endScale=a(t.scale,a(t.endScale,1)),this._emissionRate=a(t.emissionRate,5),this._minimumSpeed=a(t.speed,a(t.minimumSpeed,1)),this._maximumSpeed=a(t.speed,a(t.maximumSpeed,1)),this._minimumParticleLife=a(t.particleLife,a(t.minimumParticleLife,5)),this._maximumParticleLife=a(t.particleLife,a(t.maximumParticleLife,5)),this._minimumMass=a(t.mass,a(t.minimumMass,1)),this._maximumMass=a(t.mass,a(t.maximumMass,1)),this._minimumImageSize=e.clone(a(t.imageSize,a(t.minimumImageSize,f))),this._maximumImageSize=e.clone(a(t.imageSize,a(t.maximumImageSize,f))),this._lifetime=a(t.lifetime,Number.MAX_VALUE),this._billboardCollection=void 0,this._particles=[],this._particlePool=[],this._previousTime=void 0,this._currentTime=0,this._carryOver=0,this._complete=new s,this._isComplete=!1,this._updateParticlePool=!0,this._particleEstimate=0}function g(e){var t=e._particlePool.pop();return o(t)||(t=new d),t}function b(e,t){e._particlePool.push(t)}function x(e){o(e._billboard)&&(e._billboard.show=!1)}function v(e,t){var i=t._billboard;o(i)||(i=t._billboard=e._billboardCollection.add({image:t.image})),i.width=t.imageSize.x,i.height=t.imageSize.y,i.position=t.position,i.show=!0;var a=u.lerp(t.startColor.red,t.endColor.red,t.normalizedAge),m=u.lerp(t.startColor.green,t.endColor.green,t.normalizedAge),n=u.lerp(t.startColor.blue,t.endColor.blue,t.normalizedAge),s=u.lerp(t.startColor.alpha,t.endColor.alpha,t.normalizedAge);i.color=new r(a,m,n,s),i.scale=u.lerp(t.startScale,t.endScale,t.normalizedAge)}function C(e,i){i.startColor=r.clone(e._startColor,i.startColor),i.endColor=r.clone(e._endColor,i.endColor),i.startScale=e._startScale,i.endScale=e._endScale,i.image=e.image,i.life=u.randomBetween(e._minimumParticleLife,e._maximumParticleLife),i.mass=u.randomBetween(e._minimumMass,e._maximumMass),i.imageSize.x=u.randomBetween(e._minimumImageSize.x,e._maximumImageSize.x),i.imageSize.y=u.randomBetween(e._minimumImageSize.y,e._maximumImageSize.y),i._normalizedAge=0,i._age=0;var a=u.randomBetween(e._minimumSpeed,e._maximumSpeed);t.multiplyByScalar(i.velocity,a,i.velocity),e._particles.push(i)}m(p.prototype,{emitter:{get:function(){return this._emitter},set:function(e){i.defined("value",e),this._emitter=e}},bursts:{get:function(){return this._bursts},set:function(e){this._bursts=e,this._updateParticlePool=!0}},modelMatrix:{get:function(){return this._modelMatrix},set:function(e){i.defined("value",e),this._matrixDirty=this._matrixDirty||!c.equals(this._modelMatrix,e),c.clone(e,this._modelMatrix)}},emitterModelMatrix:{get:function(){return this._emitterModelMatrix},set:function(e){i.defined("value",e),this._matrixDirty=this._matrixDirty||!c.equals(this._emitterModelMatrix,e),c.clone(e,this._emitterModelMatrix)}},startColor:{get:function(){return this._startColor},set:function(e){i.defined("value",e),r.clone(e,this._startColor)}},endColor:{get:function(){return this._endColor},set:function(e){i.defined("value",e),r.clone(e,this._endColor)}},startScale:{get:function(){return this._startScale},set:function(e){i.typeOf.number.greaterThanOrEquals("value",e,0),this._startScale=e}},endScale:{get:function(){return this._endScale},set:function(e){i.typeOf.number.greaterThanOrEquals("value",e,0),this._endScale=e}},emissionRate:{get:function(){return this._emissionRate},set:function(e){i.typeOf.number.greaterThanOrEquals("value",e,0),this._emissionRate=e,this._updateParticlePool=!0}},minimumSpeed:{get:function(){return this._minimumSpeed},set:function(e){i.typeOf.number.greaterThanOrEquals("value",e,0),this._minimumSpeed=e}},maximumSpeed:{get:function(){return this._maximumSpeed},set:function(e){i.typeOf.number.greaterThanOrEquals("value",e,0),this._maximumSpeed=e}},minimumParticleLife:{get:function(){return this._minimumParticleLife},set:function(e){i.typeOf.number.greaterThanOrEquals("value",e,0),this._minimumParticleLife=e}},maximumParticleLife:{get:function(){return this._maximumParticleLife},set:function(e){i.typeOf.number.greaterThanOrEquals("value",e,0),this._maximumParticleLife=e,this._updateParticlePool=!0}},minimumMass:{get:function(){return this._minimumMass},set:function(e){i.typeOf.number.greaterThanOrEquals("value",e,0),this._minimumMass=e}},maximumMass:{get:function(){return this._maximumMass},set:function(e){i.typeOf.number.greaterThanOrEquals("value",e,0),this._maximumMass=e}},minimumImageSize:{get:function(){return this._minimumImageSize},set:function(e){i.typeOf.object("value",e),i.typeOf.number.greaterThanOrEquals("value.x",e.x,0),i.typeOf.number.greaterThanOrEquals("value.y",e.y,0),this._minimumImageSize=e}},maximumImageSize:{get:function(){return this._maximumImageSize},set:function(e){i.typeOf.object("value",e),i.typeOf.number.greaterThanOrEquals("value.x",e.x,0),i.typeOf.number.greaterThanOrEquals("value.y",e.y,0),this._maximumImageSize=e}},lifetime:{get:function(){return this._lifetime},set:function(e){i.typeOf.number.greaterThanOrEquals("value",e,0),this._lifetime=e}},complete:{get:function(){return this._complete}},isComplete:{get:function(){return this._isComplete}}});var y=new t;return p.prototype.update=function(e){if(this.show){o(this._billboardCollection)||(this._billboardCollection=new h),this._updateParticlePool&&(!function(e){var t=e._emissionRate,i=e._maximumParticleLife,r=0,a=e._bursts;if(o(a))for(var m=a.length,n=0;n<m;++n)r+=a[n].maximum;for(var s=e._billboardCollection,l=e.image,u=Math.ceil(t*i+r),c=e._particles,h=e._particlePool,_=Math.max(u-c.length-h.length,0),f=0;f<_;++f){var p=new d;p._billboard=s.add({image:l}),h.push(p)}e._particleEstimate=u}(this),this._updateParticlePool=!1);var i=0;this._previousTime&&(i=l.secondsDifference(e.time,this._previousTime)),i<0&&(i=0);var r,a,m=this._particles,n=this._emitter,s=this.updateCallback,_=m.length;for(r=0;r<_;++r)(a=m[r]).update(i,s)?v(this,a):(x(a),b(this,a),m[r]=m[_-1],--r,--_);m.length=_;var f=function(e,t){if(e._isComplete)return 0;var i=(t=u.mod(t,e._lifetime))*e._emissionRate,r=Math.floor(i);if(e._carryOver+=i-r,e._carryOver>1&&(r++,e._carryOver-=1),o(e.bursts))for(var a=e.bursts.length,m=0;m<a;m++){var n=e.bursts[m],s=e._currentTime;o(n)&&!n._complete&&s>n.time&&(r+=u.randomBetween(n.minimum,n.maximum),n._complete=!0)}return r}(this,i);if(f>0&&o(n)){this._matrixDirty&&(this._combinedMatrix=c.multiply(this.modelMatrix,this.emitterModelMatrix,this._combinedMatrix),this._matrixDirty=!1);var p=this._combinedMatrix;for(r=0;r<f;r++)a=g(this),this._emitter.emit(a),t.add(a.position,a.velocity,y),c.multiplyByPoint(p,y,y),a.position=c.multiplyByPoint(p,a.position,a.position),t.subtract(y,a.position,a.velocity),t.normalize(a.velocity,a.velocity),C(this,a),v(this,a)}if(this._billboardCollection.update(e),this._previousTime=l.clone(e.time,this._previousTime),this._currentTime+=i,this._lifetime!==Number.MAX_VALUE&&this._currentTime>this._lifetime)if(this.loop){if(this._currentTime=u.mod(this._currentTime,this._lifetime),this.bursts){var S=this.bursts.length;for(r=0;r<S;r++)this.bursts[r]._complete=!1}}else this._isComplete=!0,this._complete.raiseEvent(this);e.frameNumber%120==0&&function(e){for(var t=e._particles,i=e._particlePool,r=e._billboardCollection,a=t.length,o=i.length,m=e._particleEstimate,n=o-Math.max(m-a-o,0),s=n;s<o;++s){var l=i[s];r.remove(l._billboard)}i.length=n}(this)}},p.prototype.isDestroyed=function(){return!1},p.prototype.destroy=function(){return this._billboardCollection=this._billboardCollection&&this._billboardCollection.destroy(),n(this)},p});