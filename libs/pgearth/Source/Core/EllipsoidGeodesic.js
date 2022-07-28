define(["./Cartesian3","./Cartographic","./Check","./defaultValue","./defined","./defineProperties","./Ellipsoid","./Math"],function(t,a,i,n,e,s,r,h){"use strict";function d(t,a,i,n,e,s,r){var h=function(t,a){return t*a*(4+t*(4-3*a))/16}(t,i);return(1-h)*t*a*(n+h*e*(r+h*s*(2*r*r-1)))}var o=new t,u=new t;function c(n,e,s,r){var c=t.normalize(r.cartographicToCartesian(e,u),o),M=t.normalize(r.cartographicToCartesian(s,u),u);i.typeOf.number.greaterThanOrEquals("value",Math.abs(Math.abs(t.angleBetween(c,M))-Math.PI),.0125),function(t,a,i,n,e,s,r){var o,u,c,M,l,_=(a-i)/a,g=s-n,f=Math.atan((1-_)*Math.tan(e)),p=Math.atan((1-_)*Math.tan(r)),v=Math.cos(f),m=Math.sin(f),H=Math.cos(p),O=Math.sin(p),q=v*H,S=v*O,U=m*O,b=m*H,w=g,A=h.TWO_PI,R=Math.cos(w),y=Math.sin(w);do{R=Math.cos(w),y=Math.sin(w);var C,P=S-b*R;c=Math.sqrt(H*H*y*y+P*P),u=U+q*R,o=Math.atan2(c,u),0===c?(C=0,M=1):M=1-(C=q*y/c)*C,A=w,l=u-2*U/M,isNaN(l)&&(l=0),w=g+d(_,C,M,o,c,u,l)}while(Math.abs(w-A)>h.EPSILON12);var E=M*(a*a-i*i)/(i*i),T=E*(256+E*(E*(74-47*E)-128))/1024,D=l*l,I=i*(1+E*(4096+E*(E*(320-175*E)-768))/16384)*(o-T*c*(l+T*(u*(2*D-1)-T*l*(4*c*c-3)*(4*D-3)/6)/4)),N=Math.atan2(H*y,S-b*R),x=Math.atan2(v*y,S*R-b);t._distance=I,t._startHeading=N,t._endHeading=x,t._uSquared=E}(n,r.maximumRadius,r.minimumRadius,e.longitude,e.latitude,s.longitude,s.latitude),n._start=a.clone(e,n._start),n._end=a.clone(s,n._end),n._start.height=0,n._end.height=0,function(t){var a=t._uSquared,i=t._ellipsoid.maximumRadius,n=t._ellipsoid.minimumRadius,e=(i-n)/i,s=Math.cos(t._startHeading),r=Math.sin(t._startHeading),h=(1-e)*Math.tan(t._start.latitude),d=1/Math.sqrt(1+h*h),o=d*h,u=Math.atan2(h,s),c=d*r,M=c*c,l=1-M,_=Math.sqrt(l),g=a/4,f=g*g,p=f*g,v=f*f,m=1+g-3*f/4+5*p/4-175*v/64,H=1-g+15*f/8-35*p/8,O=1-3*g+35*f/4,q=1-5*g,S=m*u-H*Math.sin(2*u)*g/2-O*Math.sin(4*u)*f/16-q*Math.sin(6*u)*p/48-5*Math.sin(8*u)*v/512,U=t._constants;U.a=i,U.b=n,U.f=e,U.cosineHeading=s,U.sineHeading=r,U.tanU=h,U.cosineU=d,U.sineU=o,U.sigma=u,U.sineAlpha=c,U.sineSquaredAlpha=M,U.cosineSquaredAlpha=l,U.cosineAlpha=_,U.u2Over4=g,U.u4Over16=f,U.u6Over64=p,U.u8Over256=v,U.a0=m,U.a1=H,U.a2=O,U.a3=q,U.distanceRatio=S}(n)}function M(t,i,s){var h=n(s,r.WGS84);this._ellipsoid=h,this._start=new a,this._end=new a,this._constants={},this._startHeading=void 0,this._endHeading=void 0,this._distance=void 0,this._uSquared=void 0,e(t)&&e(i)&&c(this,t,i,h)}return s(M.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},surfaceDistance:{get:function(){return i.defined("distance",this._distance),this._distance}},start:{get:function(){return this._start}},end:{get:function(){return this._end}},startHeading:{get:function(){return i.defined("distance",this._distance),this._startHeading}},endHeading:{get:function(){return i.defined("distance",this._distance),this._endHeading}}}),M.prototype.setEndPoints=function(t,a){i.defined("start",t),i.defined("end",a),c(this,t,a,this._ellipsoid)},M.prototype.interpolateUsingFraction=function(t,a){return this.interpolateUsingSurfaceDistance(this._distance*t,a)},M.prototype.interpolateUsingSurfaceDistance=function(t,n){i.defined("distance",this._distance);var s=this._constants,r=s.distanceRatio+t/s.b,h=Math.cos(2*r),o=Math.cos(4*r),u=Math.cos(6*r),c=Math.sin(2*r),M=Math.sin(4*r),l=Math.sin(6*r),_=Math.sin(8*r),g=r*r,f=r*g,p=s.u8Over256,v=s.u2Over4,m=s.u6Over64,H=s.u4Over16,O=2*f*p*h/3+r*(1-v+7*H/4-15*m/4+579*p/64-(H-15*m/4+187*p/16)*h-(5*m/4-115*p/16)*o-29*p*u/16)+(v/2-H+71*m/32-85*p/16)*c+(5*H/16-5*m/4+383*p/96)*M-g*((m-11*p/2)*c+5*p*M/2)+(29*m/96-29*p/16)*l+539*p*_/1536,q=Math.asin(Math.sin(O)*s.cosineAlpha),S=Math.atan(s.a/s.b*Math.tan(q));O-=s.sigma;var U=Math.cos(2*s.sigma+O),b=Math.sin(O),w=Math.cos(O),A=s.cosineU*w,R=s.sineU*b,y=Math.atan2(b*s.sineHeading,A-R*s.cosineHeading)-d(s.f,s.sineAlpha,s.cosineSquaredAlpha,O,b,w,U);return e(n)?(n.longitude=this._start.longitude+y,n.latitude=S,n.height=0,n):new a(this._start.longitude+y,S,0)},M});