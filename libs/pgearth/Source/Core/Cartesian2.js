define(["./Check","./defaultValue","./defined","./DeveloperError","./freezeObject","./Math"],function(t,e,n,r,o,a){"use strict";function u(t,n){this.x=e(t,0),this.y=e(n,0)}u.fromElements=function(t,e,r){return n(r)?(r.x=t,r.y=e,r):new u(t,e)},u.clone=function(t,e){if(n(t))return n(e)?(e.x=t.x,e.y=t.y,e):new u(t.x,t.y)},u.fromCartesian3=u.clone,u.fromCartesian4=u.clone,u.packedLength=2,u.pack=function(n,r,o){return t.typeOf.object("value",n),t.defined("array",r),o=e(o,0),r[o++]=n.x,r[o]=n.y,r},u.unpack=function(r,o,a){return t.defined("array",r),o=e(o,0),n(a)||(a=new u),a.x=r[o++],a.y=r[o],a},u.packArray=function(e,r){t.defined("array",e);var o=e.length;n(r)?r.length=2*o:r=new Array(2*o);for(var a=0;a<o;++a)u.pack(e[a],r,2*a);return r},u.unpackArray=function(e,r){t.defined("array",e);var o=e.length;n(r)?r.length=o/2:r=new Array(o/2);for(var a=0;a<o;a+=2){var c=a/2;r[c]=u.unpack(e,a,r[c])}return r},u.fromArray=u.unpack,u.maximumComponent=function(e){return t.typeOf.object("cartesian",e),Math.max(e.x,e.y)},u.minimumComponent=function(e){return t.typeOf.object("cartesian",e),Math.min(e.x,e.y)},u.minimumByComponent=function(e,n,r){return t.typeOf.object("first",e),t.typeOf.object("second",n),t.typeOf.object("result",r),r.x=Math.min(e.x,n.x),r.y=Math.min(e.y,n.y),r},u.maximumByComponent=function(e,n,r){return t.typeOf.object("first",e),t.typeOf.object("second",n),t.typeOf.object("result",r),r.x=Math.max(e.x,n.x),r.y=Math.max(e.y,n.y),r},u.magnitudeSquared=function(e){return t.typeOf.object("cartesian",e),e.x*e.x+e.y*e.y},u.magnitude=function(t){return Math.sqrt(u.magnitudeSquared(t))};var c=new u;u.distance=function(e,n){return t.typeOf.object("left",e),t.typeOf.object("right",n),u.subtract(e,n,c),u.magnitude(c)},u.distanceSquared=function(e,n){return t.typeOf.object("left",e),t.typeOf.object("right",n),u.subtract(e,n,c),u.magnitudeSquared(c)},u.normalize=function(e,n){t.typeOf.object("cartesian",e),t.typeOf.object("result",n);var o=u.magnitude(e);if(n.x=e.x/o,n.y=e.y/o,isNaN(n.x)||isNaN(n.y))throw new r("normalized result is not a number");return n},u.dot=function(e,n){return t.typeOf.object("left",e),t.typeOf.object("right",n),e.x*n.x+e.y*n.y},u.multiplyComponents=function(e,n,r){return t.typeOf.object("left",e),t.typeOf.object("right",n),t.typeOf.object("result",r),r.x=e.x*n.x,r.y=e.y*n.y,r},u.divideComponents=function(e,n,r){return t.typeOf.object("left",e),t.typeOf.object("right",n),t.typeOf.object("result",r),r.x=e.x/n.x,r.y=e.y/n.y,r},u.add=function(e,n,r){return t.typeOf.object("left",e),t.typeOf.object("right",n),t.typeOf.object("result",r),r.x=e.x+n.x,r.y=e.y+n.y,r},u.subtract=function(e,n,r){return t.typeOf.object("left",e),t.typeOf.object("right",n),t.typeOf.object("result",r),r.x=e.x-n.x,r.y=e.y-n.y,r},u.multiplyByScalar=function(e,n,r){return t.typeOf.object("cartesian",e),t.typeOf.number("scalar",n),t.typeOf.object("result",r),r.x=e.x*n,r.y=e.y*n,r},u.divideByScalar=function(e,n,r){return t.typeOf.object("cartesian",e),t.typeOf.number("scalar",n),t.typeOf.object("result",r),r.x=e.x/n,r.y=e.y/n,r},u.negate=function(e,n){return t.typeOf.object("cartesian",e),t.typeOf.object("result",n),n.x=-e.x,n.y=-e.y,n},u.abs=function(e,n){return t.typeOf.object("cartesian",e),t.typeOf.object("result",n),n.x=Math.abs(e.x),n.y=Math.abs(e.y),n};var y=new u;u.lerp=function(e,n,r,o){return t.typeOf.object("start",e),t.typeOf.object("end",n),t.typeOf.number("t",r),t.typeOf.object("result",o),u.multiplyByScalar(n,r,y),o=u.multiplyByScalar(e,1-r,o),u.add(y,o,o)};var i=new u,f=new u;u.angleBetween=function(e,n){return t.typeOf.object("left",e),t.typeOf.object("right",n),u.normalize(e,i),u.normalize(n,f),a.acosClamped(u.dot(i,f))};var p=new u;return u.mostOrthogonalAxis=function(e,n){t.typeOf.object("cartesian",e),t.typeOf.object("result",n);var r=u.normalize(e,p);return u.abs(r,r),n=r.x<=r.y?u.clone(u.UNIT_X,n):u.clone(u.UNIT_Y,n)},u.equals=function(t,e){return t===e||n(t)&&n(e)&&t.x===e.x&&t.y===e.y},u.equalsArray=function(t,e,n){return t.x===e[n]&&t.y===e[n+1]},u.equalsEpsilon=function(t,e,r,o){return t===e||n(t)&&n(e)&&a.equalsEpsilon(t.x,e.x,r,o)&&a.equalsEpsilon(t.y,e.y,r,o)},u.ZERO=o(new u(0,0)),u.UNIT_X=o(new u(1,0)),u.UNIT_Y=o(new u(0,1)),u.prototype.clone=function(t){return u.clone(this,t)},u.prototype.equals=function(t){return u.equals(this,t)},u.prototype.equalsEpsilon=function(t,e,n){return u.equalsEpsilon(this,t,e,n)},u.prototype.toString=function(){return"("+this.x+", "+this.y+")"},u});