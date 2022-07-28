define(["../../Core/buildModuleUrl","../../Core/Check","../../Core/Color","../../Core/defined","../../Core/defineProperties","../../Core/destroyObject","../../ThirdParty/knockout","../getElement","../subscribeAndEvaluate","./InfoBoxViewModel"],function(e,t,i,n,a,o,r,s,l,d){"use strict";function c(a,o){t.defined("container",a),a=s(a);var c=document.createElement("div"),p=document.createElement("iframe");if("lightLine"===o){c.className="light-line-pop",c.setAttribute("data-bind",'css: { "pgEarth-infoBox-visible" : showInfo, "pgEarth-infoBox-bodyless" : _bodyless }'),a.appendChild(c);var h=document.createElement("div");h.className="property-content",c.appendChild(h),(b=document.createElement("div")).className="property-title",b.setAttribute("data-bind","text: titleText"),h.appendChild(b),p.className="pgEarth-infoBox-iframe",p.setAttribute("sandbox","allow-same-origin allow-popups allow-forms"),p.setAttribute("data-bind","style : { maxHeight : maxHeightOffset(40) }"),p.setAttribute("allowfullscreen",!0),h.appendChild(p),(f=document.createElement("button")).type="button",f.className="pgEarth-infoBox-close",f.setAttribute("data-bind","click: function () { closeClicked.raiseEvent(this); }"),f.innerHTML="&times;",h.appendChild(f);var u=document.createElement("div");u.className="lead-box",c.appendChild(u);var m=document.createElement("div");m.className="arraow",u.appendChild(m)}else{var b;c.className="pgEarth-infoBox",c.setAttribute("data-bind",'css: { "pgEarth-infoBox-visible" : showInfo, "pgEarth-infoBox-bodyless" : _bodyless }'),a.appendChild(c),(b=document.createElement("div")).className="pgEarth-infoBox-title",b.setAttribute("data-bind","text: titleText"),c.appendChild(b);var f,g=document.createElement("button");g.type="button",g.className="pgEarth-button pgEarth-infoBox-camera",g.setAttribute("data-bind",'attr: { title: "Focus camera on object" },click: function () { cameraClicked.raiseEvent(this); },enable: enableCamera,pgEarthSvgPath: { path: cameraIconPath, width: 32, height: 32 }'),p.className="pgEarth-infoBox-iframe",p.setAttribute("sandbox","allow-same-origin allow-popups allow-forms"),p.setAttribute("data-bind","style : { maxHeight : maxHeightOffset(40) }"),p.setAttribute("allowfullscreen",!0),c.appendChild(p),(f=document.createElement("button")).type="button",f.className="pgEarth-infoBox-close",f.setAttribute("data-bind","click: function () { closeClicked.raiseEvent(this); }"),f.innerHTML="&times;",c.appendChild(f);var v=document.createElement("div");v.className="pgEarth-infoBox-pointer",c.appendChild(v);var E=document.createElement("div");E.className="pgEarth-infoBox-pointer-direction",v.appendChild(E)}var C=new d;r.applyBindings(C,c),this._container=a,this._element=c,this._frame=p,this._viewModel=C,this._descriptionSubscription=void 0,this._className=o;var x=this;p.addEventListener("load",function(){var t=p.contentDocument,a=t.createElement("link");a.href=e("Widgets/InfoBox/InfoBoxDescription.css"),a.rel="stylesheet",a.type="text/css";var o=t.createElement("div");o.className="pgEarth-infoBox-description",t.head.appendChild(a),t.body.appendChild(o),x._descriptionSubscription=l(C,"description",function(e){p.style.height="5px",o.innerHTML=e;var t=null,a=o.firstElementChild;if(null!==a&&1===o.childNodes.length){var r=window.getComputedStyle(a);if(null!==r){var s=r["background-color"],l=i.fromCssColorString(s);n(l)&&0!==l.alpha&&(t=r["background-color"])}}c.style["background-color"]=t;var d=o.getBoundingClientRect().height;p.style.height=d+"px"})}),p.setAttribute("src","about:blank")}return a(c.prototype,{container:{get:function(){return this._container}},viewModel:{get:function(){return this._viewModel}},frame:{get:function(){return this._frame}}}),c.prototype.isDestroyed=function(){return!1},c.prototype.destroy=function(){var e=this._container;return r.cleanNode(this._element),e.removeChild(this._element),n(this._descriptionSubscription)&&this._descriptionSubscription.dispose(),o(this)},c});