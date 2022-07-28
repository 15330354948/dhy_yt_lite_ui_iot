define(["../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/deprecationWarning","../Core/DeveloperError","../Core/Event","../Core/JulianDate","../Core/Math","./ModelAnimation","./ModelAnimationLoop","./ModelAnimationState"],function(e,t,i,n,o,r,a,s,d,m,u){"use strict";function l(e){this.animationAdded=new r,this.animationRemoved=new r,this._model=e,this._scheduledAnimations=[],this._previousTime=void 0}function h(e,t,i){var n=e._model,o=n._runtime.animations[t],r=new d(i,n,o);return e._scheduledAnimations.push(r),e.animationAdded.raiseEvent(n,r),r}function p(e,t){for(var i=e.channelEvaluators,n=i.length,o=0;o<n;++o)i[o](t)}i(l.prototype,{length:{get:function(){return this._scheduledAnimations.length}}}),l.prototype.add=function(i){i=e(i,e.EMPTY_OBJECT);var n,r=this._model._runtime.animations;if(!t(r))throw new o("Animations are not loaded.  Wait for Model.readyPromise to resolve.");if(!t(i.name)&&!t(i.index))throw new o("Either options.name or options.index must be defined.");if(t(i.multiplier)&&i.multiplier<=0)throw new o("options.multiplier must be greater than zero.");if(t(i.index)&&(i.index>=r.length||i.index<0))throw new o("options.index must be a valid animation index.");if(t(i.index))return h(this,i.index,i);for(var a=r.length,s=0;s<a;++s)if(r[s].name===i.name){n=s;break}if(!t(n))throw new o("options.name must be a valid animation name.");return h(this,n,i)},l.prototype.addAll=function(i){if(i=e(i,e.EMPTY_OBJECT),!t(this._model._runtime.animations))throw new o("Animations are not loaded.  Wait for Model.readyPromise to resolve.");if(t(i.multiplier)&&i.multiplier<=0)throw new o("options.multiplier must be greater than zero.");for(var n=[],r=this._model._runtime.animations.length,a=0;a<r;++a)n.push(h(this,a,i));return n},l.prototype.remove=function(e){if(t(e)){var i=this._scheduledAnimations,n=i.indexOf(e);if(-1!==n)return i.splice(n,1),this.animationRemoved.raiseEvent(this._model,e),!0}return!1},l.prototype.removeAll=function(){var e=this._model,t=this._scheduledAnimations,i=t.length;this._scheduledAnimations=[];for(var n=0;n<i;++n)this.animationRemoved.raiseEvent(e,t[n])},l.prototype.contains=function(e){return!!t(e)&&-1!==this._scheduledAnimations.indexOf(e)},l.prototype.get=function(e){if(!t(e))throw new o("index is required.");return this._scheduledAnimations[e]};var f=[];function v(e,t,i){return function(){e.animationRemoved.raiseEvent(t,i)}}return l.prototype.update=function(i){var n=this._scheduledAnimations,o=n.length;if(0===o)return this._previousTime=void 0,!1;if(a.equals(i.time,this._previousTime))return!1;this._previousTime=a.clone(i.time,this._previousTime);for(var r=!1,d=i.time,l=this._model,h=0;h<o;++h){var _=n[h],c=_._runtimeAnimation;t(_._computedStartTime)||(_._computedStartTime=a.addSeconds(e(_.startTime,d),_.delay,new a)),t(_._duration)||(_._duration=c.stopTime*(1/_.multiplier));var E=_._computedStartTime,T=_._duration,A=_.stopTime,w=0!==T?a.secondsDifference(d,E)/T:0,R=w>=0,g=_.loop===m.REPEAT||_.loop===m.MIRRORED_REPEAT;if((R||g&&!t(_.startTime))&&(w<=1||g)&&(!t(A)||a.lessThanOrEquals(d,A))){if(_._state===u.STOPPED&&(_._state=u.ANIMATING,_.start.numberOfListeners>0&&i.afterRender.push(_._raiseStartEvent)),_.loop===m.REPEAT)w-=Math.floor(w);else if(_.loop===m.MIRRORED_REPEAT){var M=Math.floor(w),O=w-M;w=M%2==1?1-O:O}_.reverse&&(w=1-w);var x=w*T*_.multiplier;p(c,x=s.clamp(x,c.startTime,c.stopTime)),_.update.numberOfListeners>0&&(_._updateEventTime=x,i.afterRender.push(_._raiseUpdateEvent)),r=!0}else R&&_._state===u.ANIMATING&&(_._state=u.STOPPED,_.stop.numberOfListeners>0&&i.afterRender.push(_._raiseStopEvent),_.removeOnStop&&f.push(_))}o=f.length;for(var P=0;P<o;++P){var y=f[P];n.splice(n.indexOf(y),1),i.afterRender.push(v(this,l,y))}return f.length=0,r},l});