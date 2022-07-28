define(["../../Core/defaultValue","../../Core/defined","../../Core/defineProperties","../../Core/destroyObject","../../Core/DeveloperError","../../Core/EventHelper","../../Core/Fullscreen","../../Core/OrthographicFrustum","../../ThirdParty/knockout","../../ThirdParty/NoSleep","../createCommand","../getElement"],function(e,t,n,o,i,r,l,c,s,a,d,u){"use strict";function m(){var e=window.screen;t(e)&&(t(e.unlockOrientation)?e.unlockOrientation():t(e.mozUnlockOrientation)?e.mozUnlockOrientation():t(e.msUnlockOrientation)?e.msUnlockOrientation():t(e.orientation&&e.orientation.unlock)&&e.orientation.unlock())}function h(e,n,o,i){var r,c,s;i()||(o()?(n.useWebVR=!1,e._locked&&(m(),e._locked=!1),e._noSleep.disable(),l.exitFullscreen(),o(!1)):(l.fullscreen||l.requestFullscreen(e._vrElement),e._noSleep.enable(),e._locked||(e._locked=(r="landscape",c=!1,s=window.screen,t(s)&&(t(s.lockOrientation)?c=s.lockOrientation(r):t(s.mozLockOrientation)?c=s.mozLockOrientation(r):t(s.msLockOrientation)?c=s.msLockOrientation(r):t(s.orientation&&s.orientation.lock)&&(c=s.orientation.lock(r))),c)),n.useWebVR=!0,o(!0)))}function f(n,o){if(!t(n))throw new i("scene is required.");var f=this,v=s.observable(l.enabled),k=s.observable(!1);this.isVRMode=void 0,s.defineProperty(this,"isVRMode",{get:function(){return k()}}),this.isVREnabled=void 0,s.defineProperty(this,"isVREnabled",{get:function(){return v()},set:function(e){v(e&&l.enabled)}}),this.tooltip=void 0,s.defineProperty(this,"tooltip",function(){return v()?k()?"Exit VR mode":"Enter VR mode":"VR mode is unavailable"});var p=s.observable(!1);this._isOrthographic=void 0,s.defineProperty(this,"_isOrthographic",{get:function(){return p()}}),this._eventHelper=new r,this._eventHelper.add(n.preRender,function(){p(n.camera.frustum instanceof c)}),this._locked=!1,this._noSleep=new a,this._command=d(function(){h(f,n,k,p)},s.getObservable(this,"isVREnabled")),this._vrElement=e(u(o),document.body),this._callback=function(){!l.fullscreen&&k()&&(n.useWebVR=!1,f._locked&&(m(),f._locked=!1),f._noSleep.disable(),k(!1))},document.addEventListener(l.changeEventName,this._callback)}return n(f.prototype,{vrElement:{get:function(){return this._vrElement},set:function(e){if(!(e instanceof Element))throw new i("value must be a valid Element.");this._vrElement=e}},command:{get:function(){return this._command}}}),f.prototype.isDestroyed=function(){return!1},f.prototype.destroy=function(){this._eventHelper.removeAll(),document.removeEventListener(l.changeEventName,this._callback),o(this)},f});