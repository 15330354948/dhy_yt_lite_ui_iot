define(["../Core/Cartesian3","../Core/Check","../Core/defaultValue","../Core/defineProperties","../Core/Math"],function(e,t,r,i,n){"use strict";function o(e){e=r(e,1),t.typeOf.number.greaterThan("radius",e,0),this._radius=r(e,1)}return i(o.prototype,{radius:{get:function(){return this._radius},set:function(e){t.typeOf.number.greaterThan("value",e,0),this._radius=e}}}),o.prototype.emit=function(t){var r=n.randomBetween(0,n.TWO_PI),i=n.randomBetween(0,this._radius),o=i*Math.cos(r),a=i*Math.sin(r);t.position=e.fromElements(o,a,0,t.position),t.velocity=e.clone(e.UNIT_Z,t.velocity)},o});