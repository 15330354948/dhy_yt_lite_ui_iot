define(["../ThirdParty/when","./Cartesian2","./Cartesian3","./Cartesian4","./Cartographic","./Check","./defaultValue","./defined","./DeveloperError","./EarthOrientationParameters","./EarthOrientationParametersSample","./Ellipsoid","./HeadingPitchRoll","./Iau2006XysData","./Iau2006XysSample","./JulianDate","./Math","./Matrix3","./Matrix4","./Quaternion","./TimeConstants"],function(e,t,r,a,o,n,i,s,u,l,w,d,c,m,h,p,f,y,x,T,F){"use strict";var P={},v={up:{south:"east",north:"west",west:"south",east:"north"},down:{south:"west",north:"east",west:"north",east:"south"},south:{up:"west",down:"east",west:"down",east:"up"},north:{up:"east",down:"west",west:"up",east:"down"},west:{up:"north",down:"south",north:"down",south:"up"},east:{up:"south",down:"north",north:"up",south:"down"}},E={north:[-1,0,0],east:[0,1,0],up:[0,0,1],south:[1,0,0],west:[0,-1,0],down:[0,0,-1]},R={},O={east:new r,north:new r,up:new r,west:new r,south:new r,down:new r},S=new r,N=new r,D=new r;P.localFrameToFixedFrameGenerator=function(e,t){if(!v.hasOwnProperty(e)||!v[e].hasOwnProperty(t))throw new u("firstAxis and secondAxis must be east, north, up, west, south or down.");var a,o=v[e][t],n=e+t;return s(R[n])?a=R[n]:(a=function(a,n,l){if(!s(a))throw new u("origin is required.");if(s(l)||(l=new x),f.equalsEpsilon(a.x,0,f.EPSILON14)&&f.equalsEpsilon(a.y,0,f.EPSILON14)){var w=f.sign(a.z);r.unpack(E[e],0,S),"east"!==e&&"west"!==e&&r.multiplyByScalar(S,w,S),r.unpack(E[t],0,N),"east"!==t&&"west"!==t&&r.multiplyByScalar(N,w,N),r.unpack(E[o],0,D),"east"!==o&&"west"!==o&&r.multiplyByScalar(D,w,D)}else{(n=i(n,d.WGS84)).geodeticSurfaceNormal(a,O.up);var c=O.up,m=O.east;m.x=-a.y,m.y=a.x,m.z=0,r.normalize(m,O.east),r.cross(c,m,O.north),r.multiplyByScalar(O.up,-1,O.down),r.multiplyByScalar(O.east,-1,O.west),r.multiplyByScalar(O.north,-1,O.south),S=O[e],N=O[t],D=O[o]}return l[0]=S.x,l[1]=S.y,l[2]=S.z,l[3]=0,l[4]=N.x,l[5]=N.y,l[6]=N.z,l[7]=0,l[8]=D.x,l[9]=D.y,l[10]=D.z,l[11]=0,l[12]=a.x,l[13]=a.y,l[14]=a.z,l[15]=1,l},R[n]=a),a},P.eastNorthUpToFixedFrame=P.localFrameToFixedFrameGenerator("east","north"),P.northEastDownToFixedFrame=P.localFrameToFixedFrameGenerator("north","east"),P.northUpEastToFixedFrame=P.localFrameToFixedFrameGenerator("north","up"),P.northWestUpToFixedFrame=P.localFrameToFixedFrameGenerator("north","west");var M=new T,g=new r(1,1,1),q=new x;P.headingPitchRollToFixedFrame=function(e,t,a,o,s){n.typeOf.object("HeadingPitchRoll",t),o=i(o,P.eastNorthUpToFixedFrame);var u=T.fromHeadingPitchRoll(t,M),l=x.fromTranslationQuaternionRotationScale(r.ZERO,u,g,q);return s=o(e,a,s),x.multiply(s,l,s)};var _=new x,C=new y;P.headingPitchRollQuaternion=function(e,t,r,a,o){n.typeOf.object("HeadingPitchRoll",t);var i=P.headingPitchRollToFixedFrame(e,t,r,a,_),s=x.getRotation(i,C);return T.fromRotationMatrix(s,o)};var z=new r(1,1,1),I=new r,U=new x,W=new x,A=new y,G=new T;P.fixedFrameToHeadingPitchRoll=function(e,t,a,o){n.defined("transform",e),t=i(t,d.WGS84),a=i(a,P.eastNorthUpToFixedFrame),s(o)||(o=new c);var u=x.getTranslation(e,I);if(r.equals(u,r.ZERO))return o.heading=0,o.pitch=0,o.roll=0,o;var l=x.inverseTransformation(a(u,t,U),U),w=x.setScale(e,z,W);w=x.setTranslation(w,r.ZERO,w),l=x.multiply(l,w,l);var m=T.fromRotationMatrix(x.getRotation(l,A),G);return m=T.normalize(m,m),c.fromQuaternion(m,o)};var B=f.TWO_PI/86400,b=new p;P.computeTemeToPseudoFixedMatrix=function(e,t){if(!s(e))throw new u("date is required.");var r,a=(b=p.addSeconds(e,-p.computeTaiMinusUtc(e),b)).dayNumber,o=b.secondsOfDay,n=a-2451545,i=(24110.54841+(r=o>=43200?(n+.5)/F.DAYS_PER_JULIAN_CENTURY:(n-.5)/F.DAYS_PER_JULIAN_CENTURY)*(8640184.812866+r*(.093104+-62e-7*r)))*B%f.TWO_PI+(72921158553e-15+1.1772758384668e-19*(a-2451545.5))*((o+.5*F.SECONDS_PER_DAY)%F.SECONDS_PER_DAY),l=Math.cos(i),w=Math.sin(i);return s(t)?(t[0]=l,t[1]=-w,t[2]=0,t[3]=w,t[4]=l,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t):new y(l,w,0,-w,l,0,0,0,1)},P.iau2006XysData=new m,P.earthOrientationParameters=l.NONE;P.preloadIcrfFixed=function(t){var r=t.start.dayNumber,a=t.start.secondsOfDay+32.184,o=t.stop.dayNumber,n=t.stop.secondsOfDay+32.184,i=P.iau2006XysData.preload(r,a,o,n),s=P.earthOrientationParameters.getPromiseToLoad();return e.all([i,s])},P.computeIcrfToFixedMatrix=function(e,t){if(!s(e))throw new u("date is required.");s(t)||(t=new y);var r=P.computeFixedToIcrfMatrix(e,t);if(s(r))return y.transpose(r,t)};var L=new h(0,0,0),Y=new w(0,0,0,0,0,0),j=new y,X=new y;P.computeFixedToIcrfMatrix=function(e,t){if(!s(e))throw new u("date is required.");s(t)||(t=new y);var r=P.earthOrientationParameters.compute(e,Y);if(s(r)){var a=e.dayNumber,o=e.secondsOfDay+32.184,n=P.iau2006XysData.computeXysRadians(a,o,L);if(s(n)){var i=n.x+r.xPoleOffset,l=n.y+r.yPoleOffset,w=1/(1+Math.sqrt(1-i*i-l*l)),d=j;d[0]=1-w*i*i,d[3]=-w*i*l,d[6]=i,d[1]=-w*i*l,d[4]=1-w*l*l,d[7]=l,d[2]=-i,d[5]=-l,d[8]=1-w*(i*i+l*l);var c=y.fromRotationZ(-n.s,X),m=y.multiply(d,c,j),h=e.dayNumber-2451545,x=(e.secondsOfDay-p.computeTaiMinusUtc(e)+r.ut1MinusUtc)/F.SECONDS_PER_DAY,T=.779057273264+x+.00273781191135448*(h+x);T=T%1*f.TWO_PI;var v=y.fromRotationZ(T,X),E=y.multiply(m,v,j),R=Math.cos(r.xPoleWander),O=Math.cos(r.yPoleWander),S=Math.sin(r.xPoleWander),N=Math.sin(r.yPoleWander),D=a-2451545+o/F.SECONDS_PER_DAY,M=-47e-6*(D/=36525)*f.RADIANS_PER_DEGREE/3600,g=Math.cos(M),q=Math.sin(M),_=X;return _[0]=R*g,_[1]=R*q,_[2]=S,_[3]=-O*q+N*S*g,_[4]=O*g+N*S*q,_[5]=-N*R,_[6]=-N*q-O*S*g,_[7]=N*g-O*S*q,_[8]=O*R,y.multiply(E,_,t)}}};var Z=new a;P.pointToWindowCoordinates=function(e,t,r,a){return(a=P.pointToGLWindowCoordinates(e,t,r,a)).y=2*t[5]-a.y,a},P.pointToGLWindowCoordinates=function(e,r,o,n){if(!s(e))throw new u("modelViewProjectionMatrix is required.");if(!s(r))throw new u("viewportTransformation is required.");if(!s(o))throw new u("point is required.");s(n)||(n=new t);var i=Z;return x.multiplyByVector(e,a.fromElements(o.x,o.y,o.z,1,i),i),a.multiplyByScalar(i,1/i.w,i),x.multiplyByVector(r,i,i),t.fromCartesian4(i,n)};var H=new r,V=new r,k=new r;P.rotationMatrixFromPositionVelocity=function(e,t,a,o){if(!s(e))throw new u("position is required.");if(!s(t))throw new u("velocity is required.");var n=i(a,d.WGS84).geodeticSurfaceNormal(e,H),l=r.cross(t,n,V);r.equalsEpsilon(l,r.ZERO,f.EPSILON6)&&(l=r.clone(r.UNIT_X,l));var w=r.cross(l,t,k);return r.normalize(w,w),r.cross(t,w,l),r.negate(l,l),r.normalize(l,l),s(o)||(o=new y),o[0]=t.x,o[1]=t.y,o[2]=t.z,o[3]=l.x,o[4]=l.y,o[5]=l.z,o[6]=w.x,o[7]=w.y,o[8]=w.z,o};var Q=new x(0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1),J=new o,K=new r,$=new r,ee=new y,te=new x,re=new x;return P.basisTo2D=function(e,t,a){if(!s(e))throw new u("projection is required.");if(!s(t))throw new u("matrix is required.");if(!s(a))throw new u("result is required.");var o=x.getTranslation(t,$),n=e.ellipsoid,i=n.cartesianToCartographic(o,J),l=e.project(i,K);r.fromElements(l.z,l.x,l.y,l);var w=P.eastNorthUpToFixedFrame(o,n,te),d=x.inverseTransformation(w,re),c=x.getRotation(t,ee),m=x.multiplyByMatrix3(d,c,a);return x.multiply(Q,m,a),x.setTranslation(a,l,a),a},P.wgs84To2DModelMatrix=function(e,t,a){if(!s(e))throw new u("projection is required.");if(!s(t))throw new u("center is required.");if(!s(a))throw new u("result is required.");var o=e.ellipsoid,n=P.eastNorthUpToFixedFrame(t,o,te),i=x.inverseTransformation(n,re),l=o.cartesianToCartographic(t,J),w=e.project(l,K);r.fromElements(w.z,w.x,w.y,w);var d=x.fromTranslation(w,te);return x.multiply(Q,i,a),x.multiply(d,a,a),a},P});