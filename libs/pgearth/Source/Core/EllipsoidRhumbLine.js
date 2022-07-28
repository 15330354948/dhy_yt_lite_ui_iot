define(["./Cartesian3","./Cartographic","./Check","./defaultValue","./defined","./defineProperties","./DeveloperError","./Ellipsoid","./Math"],function(t,i,e,a,n,s,r,h,d){"use strict";function u(t,i,e){if(0===t)return i*e;var a=t*t,n=a*a,s=n*a,r=s*a,h=r*a,d=h*a,u=e;return i*((1-a/4-3*n/64-5*s/256-175*r/16384-441*h/65536-4851*d/1048576)*u-(3*a/8+3*n/32+45*s/1024+105*r/4096+2205*h/131072+6237*d/524288)*Math.sin(2*u)+(15*n/256+45*s/1024+525*r/16384+1575*h/65536+155925*d/8388608)*Math.sin(4*u)-(35*s/3072+175*r/12288+3675*h/262144+13475*d/1048576)*Math.sin(6*u)+(315*r/131072+2205*h/524288+43659*d/8388608)*Math.sin(8*u)-(693*h/1310720+6237*d/5242880)*Math.sin(10*u)+1001*d/8388608*Math.sin(12*u))}function o(t,i){if(0===t)return Math.log(Math.tan(.5*(d.PI_OVER_TWO+i)));var e=t*Math.sin(i);return Math.log(Math.tan(.5*(d.PI_OVER_TWO+i)))-t/2*Math.log((1+e)/(1-e))}var l=new t,c=new t;function _(a,n,s,r){var h=t.normalize(r.cartographicToCartesian(n,c),l),_=t.normalize(r.cartographicToCartesian(s,c),c);e.typeOf.number.greaterThanOrEquals("value",Math.abs(Math.abs(t.angleBetween(h,_))-Math.PI),.0125);var g=r.maximumRadius,M=r.minimumRadius,f=g*g,p=M*M;a._ellipticitySquared=(f-p)/f,a._ellipticity=Math.sqrt(a._ellipticitySquared),a._start=i.clone(n,a._start),a._start.height=0,a._end=i.clone(s,a._end),a._end.height=0,a._heading=function(t,i,e,a,n){var s=o(t._ellipticity,e),r=o(t._ellipticity,n);return Math.atan2(d.negativePiToPi(a-i),r-s)}(a,n.longitude,n.latitude,s.longitude,s.latitude),a._distance=function(t,i,e,a,n,s,r){var h=t._heading,o=s-a,l=0;if(d.equalsEpsilon(Math.abs(h),d.PI_OVER_TWO,d.EPSILON8))if(i===e)l=i*Math.cos(n)*d.negativePiToPi(o);else{var c=Math.sin(n);l=i*Math.cos(n)*d.negativePiToPi(o)/Math.sqrt(1-t._ellipticitySquared*c*c)}else{var _=u(t._ellipticity,i,n);l=(u(t._ellipticity,i,r)-_)/Math.cos(h)}return Math.abs(l)}(a,r.maximumRadius,r.minimumRadius,n.longitude,n.latitude,s.longitude,s.latitude)}function g(t,e,a,s,r,h){var l,c,_,g=r*r;if(Math.abs(d.PI_OVER_TWO-Math.abs(e))>d.EPSILON8){c=function(t,i,e){var a=t/e;if(0===i)return a;var n=a*a,s=n*a,r=s*a,h=i*i,d=h*h,u=d*h,o=u*h,l=o*h,c=l*h,_=Math.sin(2*a),g=Math.cos(2*a),M=Math.sin(4*a),f=Math.cos(4*a),p=Math.sin(6*a),P=Math.cos(6*a),v=Math.sin(8*a),m=Math.cos(8*a),O=Math.sin(10*a);return a+a*h/4+7*a*d/64+15*a*u/256+579*a*o/16384+1515*a*l/65536+16837*a*c/1048576+(3*a*d/16+45*a*u/256-a*(32*n-561)*o/4096-a*(232*n-1677)*l/16384+a*(399985-90560*n+512*r)*c/5242880)*g+(21*a*u/256+483*a*o/4096-a*(224*n-1969)*l/16384-a*(33152*n-112599)*c/1048576)*f+(151*a*o/4096+4681*a*l/65536+1479*a*c/16384-453*s*c/32768)*P+(1097*a*l/65536+42783*a*c/1048576)*m+8011*a*c/1048576*Math.cos(10*a)+(3*h/8+3*d/16+213*u/2048-3*n*u/64+255*o/4096-33*n*o/512+20861*l/524288-33*n*l/512+r*l/1024+28273*c/1048576-471*n*c/8192+9*r*c/4096)*_+(21*d/256+21*u/256+533*o/8192-21*n*o/512+197*l/4096-315*n*l/4096+584039*c/16777216-12517*n*c/131072+7*r*c/2048)*M+(151*u/6144+151*o/4096+5019*l/131072-453*n*l/16384+26965*c/786432-8607*n*c/131072)*p+(1097*o/131072+1097*l/65536+225797*c/10485760-1097*n*c/65536)*v+(8011*l/2621440+8011*c/1048576)*O+293393*c/251658240*Math.sin(12*a)}(u(r,s,t.latitude)+a*Math.cos(e),r,s);var M=o(r,t.latitude),f=o(r,c);_=Math.tan(e)*(f-M),l=d.negativePiToPi(t.longitude+_)}else{var p;if(c=t.latitude,0===r)p=s*Math.cos(t.latitude);else{var P=Math.sin(t.latitude);p=s*Math.cos(t.latitude)/Math.sqrt(1-g*P*P)}_=a/p,l=e>0?d.negativePiToPi(t.longitude+_):d.negativePiToPi(t.longitude-_)}return n(h)?(h.longitude=l,h.latitude=c,h.height=0,h):new i(l,c,0)}function M(t,e,s){var r=a(s,h.WGS84);this._ellipsoid=r,this._start=new i,this._end=new i,this._heading=void 0,this._distance=void 0,this._ellipticity=void 0,this._ellipticitySquared=void 0,n(t)&&n(e)&&_(this,t,e,r)}return s(M.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},surfaceDistance:{get:function(){return e.defined("distance",this._distance),this._distance}},start:{get:function(){return this._start}},end:{get:function(){return this._end}},heading:{get:function(){return e.defined("distance",this._distance),this._heading}}}),M.fromStartHeadingDistance=function(t,i,s,r,u){e.defined("start",t),e.defined("heading",i),e.defined("distance",s),e.typeOf.number.greaterThan("distance",s,0);var o=a(r,h.WGS84),l=o.maximumRadius,c=o.minimumRadius,_=l*l,f=c*c,p=Math.sqrt((_-f)/_),P=g(t,i=d.negativePiToPi(i),s,o.maximumRadius,p);return!n(u)||n(r)&&!r.equals(u.ellipsoid)?new M(t,P,o):(u.setEndPoints(t,P),u)},M.prototype.setEndPoints=function(t,i){e.defined("start",t),e.defined("end",i),_(this,t,i,this._ellipsoid)},M.prototype.interpolateUsingFraction=function(t,i){return this.interpolateUsingSurfaceDistance(t*this._distance,i)},M.prototype.interpolateUsingSurfaceDistance=function(t,i){if(e.typeOf.number("distance",t),!n(this._distance)||0===this._distance)throw new r("EllipsoidRhumbLine must have distinct start and end set.");return g(this._start,this._heading,t,this._ellipsoid.maximumRadius,this._ellipticity,i)},M.prototype.findIntersectionWithLongitude=function(t,a){if(e.typeOf.number("intersectionLongitude",t),!n(this._distance)||0===this._distance)throw new r("EllipsoidRhumbLine must have distinct start and end set.");var s=this._ellipticity,h=this._heading,u=Math.abs(h),o=this._start;if(t=d.negativePiToPi(t),d.equalsEpsilon(Math.abs(t),Math.PI,d.EPSILON14)&&(t=d.sign(o.longitude)*Math.PI),n(a)||(a=new i),Math.abs(d.PI_OVER_TWO-u)<=d.EPSILON8)return a.longitude=t,a.latitude=o.latitude,a.height=0,a;if(d.equalsEpsilon(Math.abs(d.PI_OVER_TWO-u),d.PI_OVER_TWO,d.EPSILON8)){if(d.equalsEpsilon(t,o.longitude,d.EPSILON12))return;return a.longitude=t,a.latitude=d.PI_OVER_TWO*d.sign(d.PI_OVER_TWO-h),a.height=0,a}var l,c=o.latitude,_=s*Math.sin(c),g=Math.tan(.5*(d.PI_OVER_TWO+c))*Math.exp((t-o.longitude)/Math.tan(h)),M=(1+_)/(1-_),f=o.latitude;do{l=f;var p=s*Math.sin(l),P=(1+p)/(1-p);f=2*Math.atan(g*Math.pow(P/M,s/2))-d.PI_OVER_TWO}while(!d.equalsEpsilon(f,l,d.EPSILON12));return a.longitude=t,a.latitude=f,a.height=0,a},M.prototype.findIntersectionWithLatitude=function(t,a){if(e.typeOf.number("intersectionLatitude",t),!n(this._distance)||0===this._distance)throw new r("EllipsoidRhumbLine must have distinct start and end set.");var s=this._ellipticity,h=this._heading,u=this._start;if(!d.equalsEpsilon(Math.abs(h),d.PI_OVER_TWO,d.EPSILON8)){var l=o(s,u.latitude),c=o(s,t),_=Math.tan(h)*(c-l),g=d.negativePiToPi(u.longitude+_);return n(a)?(a.longitude=g,a.latitude=t,a.height=0,a):new i(g,t,0)}},M});