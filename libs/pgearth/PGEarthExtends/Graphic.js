define(["../Source/Core/Check","../Source/Core/defaultValue","../Source/DataSources/Entity","../Source/Core/RuntimeError","../Source/Core/Transforms","./symbols/Symbols","./geometry/GraphicsGeometry","../Source/DataSources/SampledPositionProperty","../Source/DataSources/VelocityOrientationProperty"],function(e,o,t,p,r,i,n,a,s){return function(u){if(!u)throw new p("options is required");if(e.typeOf.object("options",u),!u)throw new p("geometry is required");if(e.typeOf.object("geometry",u.geometry),!u.symbol)throw new p("symbol is required");e.typeOf.object("symbol",u.symbol),u.popupTemplate&&e.typeOf.object("options",u.popupTemplate),o(u.geometry.longitude,0),o(u.geometry.latitude,0);var l=new i(u.symbol),y=new n(u.geometry),m={};m="point"!==y.type?Object.assign(l,y):l;var c={show:o(u.visible,!0),position:y};"web-style"===u.symbol.type&&(c.orientation=y instanceof a?new s(y):r.headingPitchRollQuaternion(y,l.hpr)),u.id&&(c.id=u.id),m.symbolKey&&(c[m.symbolKey]=m);var b=new t(c);return b.popupEnabled=u.popupEnabled,u.popupTemplate&&(b.popupTemplate={id:u.popupTemplate.id,title:u.popupTemplate.title,content:u.popupTemplate.content,actions:u.popupTemplate.actions}),b}});