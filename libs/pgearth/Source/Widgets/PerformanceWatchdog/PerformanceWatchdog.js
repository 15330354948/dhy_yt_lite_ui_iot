define(["../../Core/defined","../../Core/defineProperties","../../Core/destroyObject","../../Core/DeveloperError","../../ThirdParty/knockout","../getElement","./PerformanceWatchdogViewModel"],function(e,t,n,r,i,o,s){"use strict";function a(t){if(!e(t)||!e(t.container))throw new r("options.container is required.");if(!e(t.scene))throw new r("options.scene is required.");var n=o(t.container),a=new s(t),d=document.createElement("div");d.className="pgEarth-performance-watchdog-message-area",d.setAttribute("data-bind","visible: showingLowFrameRateMessage");var c=document.createElement("button");c.setAttribute("type","button"),c.className="pgEarth-performance-watchdog-message-dismiss",c.innerHTML="&times;",c.setAttribute("data-bind","click: dismissMessage"),d.appendChild(c);var m=document.createElement("div");m.className="pgEarth-performance-watchdog-message",m.setAttribute("data-bind","html: lowFrameRateMessage"),d.appendChild(m),n.appendChild(d),i.applyBindings(a,d),this._container=n,this._viewModel=a,this._element=d}return t(a.prototype,{container:{get:function(){return this._container}},viewModel:{get:function(){return this._viewModel}}}),a.prototype.isDestroyed=function(){return!1},a.prototype.destroy=function(){return this._viewModel.destroy(),i.cleanNode(this._element),this._container.removeChild(this._element),n(this)},a});