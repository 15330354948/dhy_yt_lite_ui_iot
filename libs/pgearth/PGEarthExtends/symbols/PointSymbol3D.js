define(["../../Source/Core/defaultValue","../../Source/Core/RuntimeError","../../Source/Core/Cartesian3","../../Source/Scene/HeightReference","../_Color"],function(e,t,l,i,o){return function(n){if(!n)throw new t("the options is required");return"cylinder"===n.style.type?{length:e(n.style.height,0),topRadius:e(n.style.width,100),bottomRadius:e(n.style.width,100),material:new o(e(n.style.color,"#f00")),outline:e(n.style.outline,!1),outlineColor:new o(e(n.style.outlineColor,"#0ff")),outlineWidth:e(n.style.outlineWidth,1),heightReference:e(n.style.heightReference,i.NONE),symbolKey:"cylinder"}:"cone"===n.style.type?{length:e(n.style.height,0),topRadius:0,bottomRadius:e(n.style.width,100),material:new o(e(n.style.color,"#f00")),outline:e(n.style.outline,!1),outlineColor:new o(e(n.style.outlineColor,"#0ff")),outlineWidth:e(n.style.outlineWidth,1),heightReference:e(n.style.heightReference,i.NONE),symbolKey:"cylinder"}:"ellipsoid"===n.style.type?{radii:new l(e(n.style.radii[0],0),e(n.style.radii[1],0),e(n.style.radii[2],0)),material:new o(e(n.style.color,"#f00")),outline:e(n.style.outline,!1),outlineColor:new o(e(n.style.outlineColor,"#0ff")),outlineWidth:e(n.style.outlineWidth,1),heightReference:e(n.style.heightReference,i.NONE),symbolKey:"ellipsoid"}:void 0}});