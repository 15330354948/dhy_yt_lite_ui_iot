define(["./Cartesian3","./Check","./defaultValue","./defined"],function(i,n,e,t){"use strict";function o(n,t){t=i.clone(e(t,i.ZERO)),i.equals(t,i.ZERO)||i.normalize(t,t),this.origin=i.clone(e(n,i.ZERO)),this.direction=t}return o.clone=function(n,e){if(t(n))return t(e)?(e.origin=i.clone(n.origin),e.direction=i.clone(n.direction),e):new o(n.origin,n.direction)},o.getPoint=function(e,o,r){return n.typeOf.object("ray",e),n.typeOf.number("t",o),t(r)||(r=new i),r=i.multiplyByScalar(e.direction,o,r),i.add(e.origin,r,r)},o});