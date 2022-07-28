define(["../../Core/Color","../../Core/defined","../../Core/defineProperties","../../Core/destroyObject","../../Core/DeveloperError","../getElement","../subscribeAndEvaluate"],function(t,e,o,i,n,a,s){"use strict";var r,l="http://www.w3.org/2000/svg",h="http://www.w3.org/1999/xlink",m=t.fromCssColorString("rgba(247,250,255,0.384)"),c=t.fromCssColorString("rgba(143,191,255,0.216)"),d=t.fromCssColorString("rgba(153,197,255,0.098)"),g=t.fromCssColorString("rgba(255,255,255,0.086)"),p=t.fromCssColorString("rgba(255,255,255,0.267)"),u=t.fromCssColorString("rgba(255,255,255,0)"),v=t.fromCssColorString("rgba(66,67,68,0.3)"),f=t.fromCssColorString("rgba(0,0,0,0.5)");function _(e){return t.fromCssColorString(window.getComputedStyle(e).getPropertyValue("color"))}function b(t){var e=document.createElementNS(l,t.tagName);for(var o in t)if(t.hasOwnProperty(o)&&"tagName"!==o)if("children"===o){var i,n=t.children.length;for(i=0;i<n;++i)e.appendChild(b(t.children[i]))}else 0===o.indexOf("xlink:")?e.setAttributeNS(h,o.substring(6),t[o]):"textContent"===o?e.textContent=t[o]:e.setAttribute(o,t[o]);return e}function C(t,e,o){var i=document.createElementNS(l,"text");i.setAttribute("x",t),i.setAttribute("y",e),i.setAttribute("class","pgEarth-animation-svgText");var n=document.createElementNS(l,"tspan");return n.textContent=o,i.appendChild(n),i}var E=new t;function N(t,e){var o=e.alpha,i=1-o;return E.red=t.red*i+e.red*o,E.green=t.green*i+e.green*o,E.blue=t.blue*i+e.blue*o,E.toCssColorString()}function y(t,e,o){return b({tagName:"g",class:"pgEarth-animation-rectButton",transform:"translate("+t+","+e+")",children:[{tagName:"rect",class:"pgEarth-animation-buttonGlow",width:32,height:32,rx:2,ry:2},{tagName:"rect",class:"pgEarth-animation-buttonMain",width:32,height:32,rx:4,ry:4},{tagName:"use",class:"pgEarth-animation-buttonPath","xlink:href":o},{tagName:"title",textContent:""}]})}function w(t,e){this._viewModel=e,this.svgElement=t,this._enabled=void 0,this._toggled=void 0;var o=this;this._clickFunction=function(){var t=o._viewModel.command;t.canExecute&&t()},t.addEventListener("click",this._clickFunction,!0),this._subscriptions=[s(e,"toggled",this.setToggled,this),s(e,"tooltip",this.setTooltip,this),s(e.command,"canExecute",this.setEnabled,this)]}function S(t,o){if(!e(t))throw new n("container is required.");if(!e(o))throw new n("viewModel is required.");t=a(t),this._viewModel=o,this._container=t,this._centerX=0,this._centerY=0,this._defsElement=void 0,this._svgNode=void 0,this._topG=void 0,this._lastHeight=void 0,this._lastWidth=void 0;var i=document.createElement("style");i.textContent=".pgEarth-animation-rectButton .pgEarth-animation-buttonGlow { filter: url(#animation_blurred); }.pgEarth-animation-rectButton .pgEarth-animation-buttonMain { fill: url(#animation_buttonNormal); }.pgEarth-animation-buttonToggled .pgEarth-animation-buttonMain { fill: url(#animation_buttonToggled); }.pgEarth-animation-rectButton:hover .pgEarth-animation-buttonMain { fill: url(#animation_buttonHovered); }.pgEarth-animation-buttonDisabled .pgEarth-animation-buttonMain { fill: url(#animation_buttonDisabled); }.pgEarth-animation-shuttleRingG .pgEarth-animation-shuttleRingSwoosh { fill: url(#animation_shuttleRingSwooshGradient); }.pgEarth-animation-shuttleRingG:hover .pgEarth-animation-shuttleRingSwoosh { fill: url(#animation_shuttleRingSwooshHovered); }.pgEarth-animation-shuttleRingPointer { fill: url(#animation_shuttleRingPointerGradient); }.pgEarth-animation-shuttleRingPausePointer { fill: url(#animation_shuttleRingPointerPaused); }.pgEarth-animation-knobOuter { fill: url(#animation_knobOuter); }.pgEarth-animation-knobInner { fill: url(#animation_knobInner); }",document.head.insertBefore(i,document.head.childNodes[0]);var m=document.createElement("div");m.className="pgEarth-animation-theme",m.innerHTML='<div class="pgEarth-animation-themeNormal"></div><div class="pgEarth-animation-themeHover"></div><div class="pgEarth-animation-themeSelect"></div><div class="pgEarth-animation-themeDisabled"></div><div class="pgEarth-animation-themeKnob"></div><div class="pgEarth-animation-themePointer"></div><div class="pgEarth-animation-themeSwoosh"></div><div class="pgEarth-animation-themeSwooshHover"></div>',this._theme=m,this._themeNormal=m.childNodes[0],this._themeHover=m.childNodes[1],this._themeSelect=m.childNodes[2],this._themeDisabled=m.childNodes[3],this._themeKnob=m.childNodes[4],this._themePointer=m.childNodes[5],this._themeSwoosh=m.childNodes[6],this._themeSwooshHover=m.childNodes[7];var c=document.createElementNS(l,"svg:svg");this._svgNode=c,c.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink",h);var d=document.createElementNS(l,"g");this._topG=d,this._realtimeSVG=new w(b({tagName:"g",class:"pgEarth-animation-rectButton",transform:"translate("+3+","+4+")",children:[{tagName:"use",class:"pgEarth-animation-buttonGlow","xlink:href":"#animation_pathWingButton"},{tagName:"use",class:"pgEarth-animation-buttonMain","xlink:href":"#animation_pathWingButton"},{tagName:"use",class:"pgEarth-animation-buttonPath","xlink:href":"#animation_pathClock"},{tagName:"title",textContent:""}]}),o.playRealtimeViewModel),this._playReverseSVG=new w(y(44,99,"#animation_pathPlayReverse"),o.playReverseViewModel),this._playForwardSVG=new w(y(124,99,"#animation_pathPlay"),o.playForwardViewModel),this._pauseSVG=new w(y(84,99,"#animation_pathPause"),o.pauseViewModel);var g=document.createElementNS(l,"g");g.appendChild(this._realtimeSVG.svgElement),g.appendChild(this._playReverseSVG.svgElement),g.appendChild(this._playForwardSVG.svgElement),g.appendChild(this._pauseSVG.svgElement);var p=b({tagName:"circle",class:"pgEarth-animation-shuttleRingBack",cx:100,cy:100,r:99});this._shuttleRingBackPanel=p;var u=b({tagName:"g",class:"pgEarth-animation-shuttleRingSwoosh",children:[{tagName:"use",transform:"translate(100,97) scale(-1,1)","xlink:href":"#animation_pathSwooshFX"},{tagName:"use",transform:"translate(100,97)","xlink:href":"#animation_pathSwooshFX"},{tagName:"line",x1:100,y1:8,x2:100,y2:22}]});this._shuttleRingSwooshG=u,this._shuttleRingPointer=b({tagName:"use",class:"pgEarth-animation-shuttleRingPointer","xlink:href":"#animation_pathPointer"});var v=b({tagName:"g",transform:"translate(100,100)"});this._knobOuter=b({tagName:"circle",class:"pgEarth-animation-knobOuter",cx:0,cy:0,r:71});var f=b({tagName:"circle",class:"pgEarth-animation-knobInner",cx:0,cy:0,r:61});this._knobDate=C(0,-24,""),this._knobTime=C(0,-7,""),this._knobStatus=C(0,-41,"");var _=b({tagName:"circle",class:"pgEarth-animation-blank",cx:0,cy:0,r:61}),E=document.createElementNS(l,"g");E.setAttribute("class","pgEarth-animation-shuttleRingG"),t.appendChild(m),d.appendChild(E),d.appendChild(v),d.appendChild(g),E.appendChild(p),E.appendChild(u),E.appendChild(this._shuttleRingPointer),v.appendChild(this._knobOuter),v.appendChild(f),v.appendChild(this._knobDate),v.appendChild(this._knobTime),v.appendChild(this._knobStatus),v.appendChild(_),c.appendChild(d),t.appendChild(c);var N=this;function S(t){!function(t,e){var o=t._viewModel,i=o.shuttleRingDragging;if(!i||r===t)if("mousedown"===e.type||i&&"mousemove"===e.type||"touchstart"===e.type&&1===e.touches.length||i&&"touchmove"===e.type&&1===e.touches.length){var n,a,s=t._centerX,l=t._centerY,h=t._svgNode.getBoundingClientRect();if("touchstart"===e.type||"touchmove"===e.type?(n=e.touches[0].clientX,a=e.touches[0].clientY):(n=e.clientX,a=e.clientY),!i&&(n>h.right||n<h.left||a<h.top||a>h.bottom))return;var m=t._shuttleRingPointer.getBoundingClientRect(),c=n-s-h.left,d=a-l-h.top,g=180*Math.atan2(d,c)/Math.PI+90;g>180&&(g-=360);var p=o.shuttleRingAngle;i||n<m.right&&n>m.left&&a>m.top&&a<m.bottom?(r=t,o.shuttleRingDragging=!0,o.shuttleRingAngle=g):g<p?o.slower():g>p&&o.faster(),e.preventDefault()}else t===r&&(r=void 0),o.shuttleRingDragging=!1}(N,t)}this._mouseCallback=S,p.addEventListener("mousedown",S,!0),p.addEventListener("touchstart",S,!0),u.addEventListener("mousedown",S,!0),u.addEventListener("touchstart",S,!0),document.addEventListener("mousemove",S,!0),document.addEventListener("touchmove",S,!0),document.addEventListener("mouseup",S,!0),document.addEventListener("touchend",S,!0),document.addEventListener("touchcancel",S,!0),this._shuttleRingPointer.addEventListener("mousedown",S,!0),this._shuttleRingPointer.addEventListener("touchstart",S,!0),this._knobOuter.addEventListener("mousedown",S,!0),this._knobOuter.addEventListener("touchstart",S,!0);var x,R=this._knobTime.childNodes[0],k=this._knobDate.childNodes[0],M=this._knobStatus.childNodes[0];this._subscriptions=[s(o.pauseViewModel,"toggled",function(t){x!==t&&((x=t)?N._shuttleRingPointer.setAttribute("class","pgEarth-animation-shuttleRingPausePointer"):N._shuttleRingPointer.setAttribute("class","pgEarth-animation-shuttleRingPointer"))}),s(o,"shuttleRingAngle",function(t){var e,o,i;e=N._shuttleRingPointer,o=N._knobOuter,i=t,e.setAttribute("transform","translate(100,100) rotate("+i+")"),o.setAttribute("transform","rotate("+i+")")}),s(o,"dateLabel",function(t){k.textContent!==t&&(k.textContent=t)}),s(o,"timeLabel",function(t){R.textContent!==t&&(R.textContent=t)}),s(o,"multiplierLabel",function(t){M.textContent!==t&&(M.textContent=t)})],this.applyThemeChanges(),this.resize()}return w.prototype.destroy=function(){this.svgElement.removeEventListener("click",this._clickFunction,!0);for(var t=this._subscriptions,e=0,o=t.length;e<o;e++)t[e].dispose();i(this)},w.prototype.isDestroyed=function(){return!1},w.prototype.setEnabled=function(t){if(this._enabled!==t){if(this._enabled=t,!t)return void this.svgElement.setAttribute("class","pgEarth-animation-buttonDisabled");if(this._toggled)return void this.svgElement.setAttribute("class","pgEarth-animation-rectButton pgEarth-animation-buttonToggled");this.svgElement.setAttribute("class","pgEarth-animation-rectButton")}},w.prototype.setToggled=function(t){this._toggled!==t&&(this._toggled=t,this._enabled&&(t?this.svgElement.setAttribute("class","pgEarth-animation-rectButton pgEarth-animation-buttonToggled"):this.svgElement.setAttribute("class","pgEarth-animation-rectButton")))},w.prototype.setTooltip=function(t){this.svgElement.getElementsByTagName("title")[0].textContent=t},o(S.prototype,{container:{get:function(){return this._container}},viewModel:{get:function(){return this._viewModel}}}),S.prototype.isDestroyed=function(){return!1},S.prototype.destroy=function(){e(this._observer)&&(this._observer.disconnect(),this._observer=void 0);var t=this._mouseCallback;this._shuttleRingBackPanel.removeEventListener("mousedown",t,!0),this._shuttleRingBackPanel.removeEventListener("touchstart",t,!0),this._shuttleRingSwooshG.removeEventListener("mousedown",t,!0),this._shuttleRingSwooshG.removeEventListener("touchstart",t,!0),document.removeEventListener("mousemove",t,!0),document.removeEventListener("touchmove",t,!0),document.removeEventListener("mouseup",t,!0),document.removeEventListener("touchend",t,!0),document.removeEventListener("touchcancel",t,!0),this._shuttleRingPointer.removeEventListener("mousedown",t,!0),this._shuttleRingPointer.removeEventListener("touchstart",t,!0),this._knobOuter.removeEventListener("mousedown",t,!0),this._knobOuter.removeEventListener("touchstart",t,!0),this._container.removeChild(this._svgNode),this._container.removeChild(this._theme),this._realtimeSVG.destroy(),this._playReverseSVG.destroy(),this._playForwardSVG.destroy(),this._pauseSVG.destroy();for(var o=this._subscriptions,n=0,a=o.length;n<a;n++)o[n].dispose();return i(this)},S.prototype.resize=function(){var t=this._container.clientWidth,e=this._container.clientHeight;if(t!==this._lastWidth||e!==this._lastHeight){var o=this._svgNode,i=t,n=e;0===t&&0===e?(i=200,n=132):0===t?(n=e,i=e/132*200):0===e&&(i=t,n=t/200*132);var a=i/200,s=n/132;o.style.cssText="width: "+i+"px; height: "+n+"px; position: absolute; bottom: 0; left: 0; overflow: hidden;",o.setAttribute("width",i),o.setAttribute("height",n),o.setAttribute("viewBox","0 0 "+i+" "+n),this._topG.setAttribute("transform","scale("+a+","+s+")"),this._centerX=Math.max(1,100*a),this._centerY=Math.max(1,100*s),this._lastHeight=t,this._lastWidth=e}},S.prototype.applyThemeChanges=function(){if(!document.body.contains(this._container)){if(e(this._observer))return;var t=this;return t._observer=new MutationObserver(function(){document.body.contains(t._container)&&(t._observer.disconnect(),t._observer=void 0,t.applyThemeChanges())}),void t._observer.observe(document,{childList:!0,subtree:!0})}var o=_(this._themeNormal),i=_(this._themeHover),n=_(this._themeSelect),a=_(this._themeDisabled),s=_(this._themeKnob),r=_(this._themePointer),l=_(this._themeSwoosh),h=_(this._themeSwooshHover),C=b({tagName:"defs",children:[{id:"animation_buttonNormal",tagName:"linearGradient",x1:"50%",y1:"0%",x2:"50%",y2:"100%",children:[{tagName:"stop",offset:"0%","stop-color":N(o,m)},{tagName:"stop",offset:"12%","stop-color":N(o,c)},{tagName:"stop",offset:"46%","stop-color":N(o,d)},{tagName:"stop",offset:"81%","stop-color":N(o,g)}]},{id:"animation_buttonHovered",tagName:"linearGradient",x1:"50%",y1:"0%",x2:"50%",y2:"100%",children:[{tagName:"stop",offset:"0%","stop-color":N(i,m)},{tagName:"stop",offset:"12%","stop-color":N(i,c)},{tagName:"stop",offset:"46%","stop-color":N(i,d)},{tagName:"stop",offset:"81%","stop-color":N(i,g)}]},{id:"animation_buttonToggled",tagName:"linearGradient",x1:"50%",y1:"0%",x2:"50%",y2:"100%",children:[{tagName:"stop",offset:"0%","stop-color":N(n,m)},{tagName:"stop",offset:"12%","stop-color":N(n,c)},{tagName:"stop",offset:"46%","stop-color":N(n,d)},{tagName:"stop",offset:"81%","stop-color":N(n,g)}]},{id:"animation_buttonDisabled",tagName:"linearGradient",x1:"50%",y1:"0%",x2:"50%",y2:"100%",children:[{tagName:"stop",offset:"0%","stop-color":N(a,p)},{tagName:"stop",offset:"75%","stop-color":N(a,u)}]},{id:"animation_blurred",tagName:"filter",width:"200%",height:"200%",x:"-50%",y:"-50%",children:[{tagName:"feGaussianBlur",stdDeviation:4,in:"SourceGraphic"}]},{id:"animation_shuttleRingSwooshGradient",tagName:"linearGradient",x1:"50%",y1:"0%",x2:"50%",y2:"100%",children:[{tagName:"stop",offset:"0%","stop-opacity":.2,"stop-color":l.toCssColorString()},{tagName:"stop",offset:"85%","stop-opacity":.85,"stop-color":l.toCssColorString()},{tagName:"stop",offset:"95%","stop-opacity":.05,"stop-color":l.toCssColorString()}]},{id:"animation_shuttleRingSwooshHovered",tagName:"linearGradient",x1:"50%",y1:"0%",x2:"50%",y2:"100%",children:[{tagName:"stop",offset:"0%","stop-opacity":.2,"stop-color":h.toCssColorString()},{tagName:"stop",offset:"85%","stop-opacity":.85,"stop-color":h.toCssColorString()},{tagName:"stop",offset:"95%","stop-opacity":.05,"stop-color":h.toCssColorString()}]},{id:"animation_shuttleRingPointerGradient",tagName:"linearGradient",x1:"0%",y1:"50%",x2:"100%",y2:"50%",children:[{tagName:"stop",offset:"0%","stop-color":r.toCssColorString()},{tagName:"stop",offset:"40%","stop-color":r.toCssColorString()},{tagName:"stop",offset:"60%","stop-color":N(r,f)},{tagName:"stop",offset:"100%","stop-color":N(r,f)}]},{id:"animation_shuttleRingPointerPaused",tagName:"linearGradient",x1:"0%",y1:"50%",x2:"100%",y2:"50%",children:[{tagName:"stop",offset:"0%","stop-color":"#CCC"},{tagName:"stop",offset:"40%","stop-color":"#CCC"},{tagName:"stop",offset:"60%","stop-color":"#555"},{tagName:"stop",offset:"100%","stop-color":"#555"}]},{id:"animation_knobOuter",tagName:"linearGradient",x1:"20%",y1:"0%",x2:"90%",y2:"100%",children:[{tagName:"stop",offset:"5%","stop-color":N(s,m)},{tagName:"stop",offset:"60%","stop-color":N(s,v)},{tagName:"stop",offset:"85%","stop-color":N(s,c)}]},{id:"animation_knobInner",tagName:"linearGradient",x1:"20%",y1:"0%",x2:"90%",y2:"100%",children:[{tagName:"stop",offset:"5%","stop-color":N(s,v)},{tagName:"stop",offset:"60%","stop-color":N(s,m)},{tagName:"stop",offset:"85%","stop-color":N(s,g)}]},{id:"animation_pathReset",tagName:"path",transform:"translate(16,16) scale(0.85) translate(-16,-16)",d:"M24.316,5.318,9.833,13.682,9.833,5.5,5.5,5.5,5.5,25.5,9.833,25.5,9.833,17.318,24.316,25.682z"},{id:"animation_pathPause",tagName:"path",transform:"translate(16,16) scale(0.85) translate(-16,-16)",d:"M13,5.5,7.5,5.5,7.5,25.5,13,25.5zM24.5,5.5,19,5.5,19,25.5,24.5,25.5z"},{id:"animation_pathPlay",tagName:"path",transform:"translate(16,16) scale(0.85) translate(-16,-16)",d:"M6.684,25.682L24.316,15.5L6.684,5.318V25.682z"},{id:"animation_pathPlayReverse",tagName:"path",transform:"translate(16,16) scale(-0.85,0.85) translate(-16,-16)",d:"M6.684,25.682L24.316,15.5L6.684,5.318V25.682z"},{id:"animation_pathLoop",tagName:"path",transform:"translate(16,16) scale(0.85) translate(-16,-16)",d:"M24.249,15.499c-0.009,4.832-3.918,8.741-8.75,8.75c-2.515,0-4.768-1.064-6.365-2.763l2.068-1.442l-7.901-3.703l0.744,8.694l2.193-1.529c2.244,2.594,5.562,4.242,9.26,4.242c6.767,0,12.249-5.482,12.249-12.249H24.249zM15.499,6.75c2.516,0,4.769,1.065,6.367,2.764l-2.068,1.443l7.901,3.701l-0.746-8.693l-2.192,1.529c-2.245-2.594-5.562-4.245-9.262-4.245C8.734,3.25,3.25,8.734,3.249,15.499H6.75C6.758,10.668,10.668,6.758,15.499,6.75z"},{id:"animation_pathClock",tagName:"path",transform:"translate(16,16) scale(0.85) translate(-16,-15.5)",d:"M15.5,2.374C8.251,2.375,2.376,8.251,2.374,15.5C2.376,22.748,8.251,28.623,15.5,28.627c7.249-0.004,13.124-5.879,13.125-13.127C28.624,8.251,22.749,2.375,15.5,2.374zM15.5,25.623C9.909,25.615,5.385,21.09,5.375,15.5C5.385,9.909,9.909,5.384,15.5,5.374c5.59,0.01,10.115,4.535,10.124,10.125C25.615,21.09,21.091,25.615,15.5,25.623zM8.625,15.5c-0.001-0.552-0.448-0.999-1.001-1c-0.553,0-1,0.448-1,1c0,0.553,0.449,1,1,1C8.176,16.5,8.624,16.053,8.625,15.5zM8.179,18.572c-0.478,0.277-0.642,0.889-0.365,1.367c0.275,0.479,0.889,0.641,1.365,0.365c0.479-0.275,0.643-0.887,0.367-1.367C9.27,18.461,8.658,18.297,8.179,18.572zM9.18,10.696c-0.479-0.276-1.09-0.112-1.366,0.366s-0.111,1.09,0.365,1.366c0.479,0.276,1.09,0.113,1.367-0.366C9.821,11.584,9.657,10.973,9.18,10.696zM22.822,12.428c0.478-0.275,0.643-0.888,0.366-1.366c-0.275-0.478-0.89-0.642-1.366-0.366c-0.479,0.278-0.642,0.89-0.366,1.367C21.732,12.54,22.344,12.705,22.822,12.428zM12.062,21.455c-0.478-0.275-1.089-0.111-1.366,0.367c-0.275,0.479-0.111,1.09,0.366,1.365c0.478,0.277,1.091,0.111,1.365-0.365C12.704,22.344,12.54,21.732,12.062,21.455zM12.062,9.545c0.479-0.276,0.642-0.888,0.366-1.366c-0.276-0.478-0.888-0.642-1.366-0.366s-0.642,0.888-0.366,1.366C10.973,9.658,11.584,9.822,12.062,9.545zM22.823,18.572c-0.48-0.275-1.092-0.111-1.367,0.365c-0.275,0.479-0.112,1.092,0.367,1.367c0.477,0.275,1.089,0.113,1.365-0.365C23.464,19.461,23.3,18.848,22.823,18.572zM19.938,7.813c-0.477-0.276-1.091-0.111-1.365,0.366c-0.275,0.48-0.111,1.091,0.366,1.367s1.089,0.112,1.366-0.366C20.581,8.702,20.418,8.089,19.938,7.813zM23.378,14.5c-0.554,0.002-1.001,0.45-1.001,1c0.001,0.552,0.448,1,1.001,1c0.551,0,1-0.447,1-1C24.378,14.949,23.929,14.5,23.378,14.5zM15.501,6.624c-0.552,0-1,0.448-1,1l-0.466,7.343l-3.004,1.96c-0.478,0.277-0.642,0.889-0.365,1.365c0.275,0.479,0.889,0.643,1.365,0.367l3.305-1.676C15.39,16.99,15.444,17,15.501,17c0.828,0,1.5-0.671,1.5-1.5l-0.5-7.876C16.501,7.072,16.053,6.624,15.501,6.624zM15.501,22.377c-0.552,0-1,0.447-1,1s0.448,1,1,1s1-0.447,1-1S16.053,22.377,15.501,22.377zM18.939,21.455c-0.479,0.277-0.643,0.889-0.366,1.367c0.275,0.477,0.888,0.643,1.366,0.365c0.478-0.275,0.642-0.889,0.366-1.365C20.028,21.344,19.417,21.18,18.939,21.455z"},{id:"animation_pathWingButton",tagName:"path",d:"m 4.5,0.5 c -2.216,0 -4,1.784 -4,4 l 0,24 c 0,2.216 1.784,4 4,4 l 13.71875,0 C 22.478584,27.272785 27.273681,22.511272 32.5,18.25 l 0,-13.75 c 0,-2.216 -1.784,-4 -4,-4 l -24,0 z"},{id:"animation_pathPointer",tagName:"path",d:"M-15,-65,-15,-55,15,-55,15,-65,0,-95z"},{id:"animation_pathSwooshFX",tagName:"path",d:"m 85,0 c 0,16.617 -4.813944,35.356 -13.131081,48.4508 h 6.099803 c 8.317138,-13.0948 13.13322,-28.5955 13.13322,-45.2124 0,-46.94483 -38.402714,-85.00262 -85.7743869,-85.00262 -1.0218522,0 -2.0373001,0.0241 -3.0506131,0.0589 45.958443,1.59437 82.723058,35.77285 82.723058,81.70532 z"}]});e(this._defsElement)?this._svgNode.replaceChild(C,this._defsElement):this._svgNode.appendChild(C),this._defsElement=C},S});