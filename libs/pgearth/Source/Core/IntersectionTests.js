define(["./Cartesian3","./Cartographic","./defaultValue","./defined","./DeveloperError","./Interval","./Math","./Matrix3","./QuadraticRealPolynomial","./QuarticRealPolynomial","./Ray"],function(e,r,i,n,t,a,o,s,u,l,d){"use strict";var w={rayPlane:function(r,i,a){if(!n(r))throw new t("ray is required.");if(!n(i))throw new t("plane is required.");n(a)||(a=new e);var s=r.origin,u=r.direction,l=i.normal,d=e.dot(l,u);if(!(Math.abs(d)<o.EPSILON15)){var w=(-i.distance-e.dot(l,s))/d;if(!(w<0))return a=e.multiplyByScalar(u,w,a),e.add(s,a,a)}}},f=new e,c=new e,h=new e,m=new e,p=new e;w.rayTriangleParametric=function(r,a,s,u,l){if(!n(r))throw new t("ray is required.");if(!n(a))throw new t("p0 is required.");if(!n(s))throw new t("p1 is required.");if(!n(u))throw new t("p2 is required.");l=i(l,!1);var d,w,g,v,y,S=r.origin,q=r.direction,O=e.subtract(s,a,f),M=e.subtract(u,a,c),P=e.cross(q,M,h),N=e.dot(O,P);if(l){if(N<o.EPSILON6)return;if(d=e.subtract(S,a,m),(g=e.dot(d,P))<0||g>N)return;if(w=e.cross(d,O,p),(v=e.dot(q,w))<0||g+v>N)return;y=e.dot(M,w)/N}else{if(Math.abs(N)<o.EPSILON6)return;var L=1/N;if(d=e.subtract(S,a,m),(g=e.dot(d,P)*L)<0||g>1)return;if(w=e.cross(d,O,p),(v=e.dot(q,w)*L)<0||g+v>1)return;y=e.dot(M,w)*L}return y},w.rayTriangle=function(r,i,t,a,o,s){var u=w.rayTriangleParametric(r,i,t,a,o);if(n(u)&&!(u<0))return n(s)||(s=new e),e.multiplyByScalar(r.direction,u,s),e.add(r.origin,s,s)};var g=new d;w.lineSegmentTriangle=function(r,i,a,o,s,u,l){if(!n(r))throw new t("v0 is required.");if(!n(i))throw new t("v1 is required.");if(!n(a))throw new t("p0 is required.");if(!n(o))throw new t("p1 is required.");if(!n(s))throw new t("p2 is required.");var d=g;e.clone(r,d.origin),e.subtract(i,r,d.direction),e.normalize(d.direction,d.direction);var f=w.rayTriangleParametric(d,a,o,s,u);if(!(!n(f)||f<0||f>e.distance(r,i)))return n(l)||(l=new e),e.multiplyByScalar(d.direction,f,l),e.add(d.origin,l,l)};var v={root0:0,root1:0};function y(r,i,t){n(t)||(t=new a);var o=r.origin,s=r.direction,u=i.center,l=i.radius*i.radius,d=e.subtract(o,u,h),w=function(e,r,i,n){var t=r*r-4*e*i;if(!(t<0)){if(t>0){var a=1/(2*e),o=Math.sqrt(t),s=(-r+o)*a,u=(-r-o)*a;return s<u?(n.root0=s,n.root1=u):(n.root0=u,n.root1=s),n}var l=-r/(2*e);if(0!==l)return n.root0=n.root1=l,n}}(e.dot(s,s),2*e.dot(s,d),e.magnitudeSquared(d)-l,v);if(n(w))return t.start=w.root0,t.stop=w.root1,t}w.raySphere=function(e,r,i){if(!n(e))throw new t("ray is required.");if(!n(r))throw new t("sphere is required.");if(i=y(e,r,i),n(i)&&!(i.stop<0))return i.start=Math.max(i.start,0),i};var S=new d;w.lineSegmentSphere=function(r,i,a,o){if(!n(r))throw new t("p0 is required.");if(!n(i))throw new t("p1 is required.");if(!n(a))throw new t("sphere is required.");var s=S;e.clone(r,s.origin);var u=e.subtract(i,r,s.direction),l=e.magnitude(u);if(e.normalize(u,u),o=y(s,a,o),!(!n(o)||o.stop<0||o.start>l))return o.start=Math.max(o.start,0),o.stop=Math.min(o.stop,l),o};var q=new e,O=new e;function M(e,r,i){var n=e+r;return o.sign(e)!==o.sign(r)&&Math.abs(n/Math.max(Math.abs(e),Math.abs(r)))<i?0:n}w.rayEllipsoid=function(r,i){if(!n(r))throw new t("ray is required.");if(!n(i))throw new t("ellipsoid is required.");var o,s,u,l,d,w=i.oneOverRadii,f=e.multiplyComponents(w,r.origin,q),c=e.multiplyComponents(w,r.direction,O),h=e.magnitudeSquared(f),m=e.dot(f,c);if(h>1){if(m>=0)return;var p=m*m;if(o=h-1,p<(u=(s=e.magnitudeSquared(c))*o))return;if(p>u){l=m*m-u;var g=(d=-m+Math.sqrt(l))/s,v=o/d;return g<v?new a(g,v):{start:v,stop:g}}var y=Math.sqrt(o/s);return new a(y,y)}return h<1?(o=h-1,l=m*m-(u=(s=e.magnitudeSquared(c))*o),d=-m+Math.sqrt(l),new a(0,d/s)):m<0?(s=e.magnitudeSquared(c),new a(0,-m/s)):void 0};var P=new e,N=new e,L=new e,R=new e,b=new e,E=new s,C=new s,I=new s,x=new s,z=new s,T=new s,U=new s,W=new e,B=new e,V=new r;w.grazingAltitudeLocation=function(r,i){if(!n(r))throw new t("ray is required.");if(!n(i))throw new t("ellipsoid is required.");var a=r.origin,d=r.direction;if(!e.equals(a,e.ZERO)){var w=i.geodeticSurfaceNormal(a,P);if(e.dot(d,w)>=0)return a}var f=n(this.rayEllipsoid(r,i)),c=i.transformPositionToScaledSpace(d,P),h=e.normalize(c,c),m=e.mostOrthogonalAxis(c,R),p=e.normalize(e.cross(m,h,N),N),g=e.normalize(e.cross(h,p,L),L),v=E;v[0]=h.x,v[1]=h.y,v[2]=h.z,v[3]=p.x,v[4]=p.y,v[5]=p.z,v[6]=g.x,v[7]=g.y,v[8]=g.z;var y=s.transpose(v,C),S=s.fromScale(i.radii,I),q=s.fromScale(i.oneOverRadii,x),O=z;O[0]=0,O[1]=-d.z,O[2]=d.y,O[3]=d.z,O[4]=0,O[5]=-d.x,O[6]=-d.y,O[7]=d.x,O[8]=0;var A,Q,Z=s.multiply(s.multiply(y,q,T),O,T),D=s.multiply(s.multiply(Z,S,U),v,U),F=s.multiplyByVector(Z,a,b),G=function(r,i,n,t,a){var d,w=t*t,f=a*a,c=(r[s.COLUMN1ROW1]-r[s.COLUMN2ROW2])*f,h=a*(t*M(r[s.COLUMN1ROW0],r[s.COLUMN0ROW1],o.EPSILON15)+i.y),m=r[s.COLUMN0ROW0]*w+r[s.COLUMN2ROW2]*f+t*i.x+n,p=f*M(r[s.COLUMN2ROW1],r[s.COLUMN1ROW2],o.EPSILON15),g=a*(t*M(r[s.COLUMN2ROW0],r[s.COLUMN0ROW2])+i.z),v=[];if(0===g&&0===p){if(0===(d=u.computeRealRoots(c,h,m)).length)return v;var y=d[0],S=Math.sqrt(Math.max(1-y*y,0));if(v.push(new e(t,a*y,a*-S)),v.push(new e(t,a*y,a*S)),2===d.length){var q=d[1],O=Math.sqrt(Math.max(1-q*q,0));v.push(new e(t,a*q,a*-O)),v.push(new e(t,a*q,a*O))}return v}var P=g*g,N=p*p,L=g*p,R=c*c+N,b=2*(h*c+L),E=2*m*c+h*h-N+P,C=2*(m*h-L),I=m*m-P;if(0===R&&0===b&&0===E&&0===C)return v;var x=(d=l.computeRealRoots(R,b,E,C,I)).length;if(0===x)return v;for(var z=0;z<x;++z){var T=d[z],U=T*T,W=Math.max(1-U,0),B=Math.sqrt(W),V=(o.sign(c)===o.sign(m)?M(c*U+m,h*T,o.EPSILON12):o.sign(m)===o.sign(h*T)?M(c*U,h*T+m,o.EPSILON12):M(c*U+h*T,m,o.EPSILON12))*M(p*T,g,o.EPSILON15);V<0?v.push(new e(t,a*T,a*B)):V>0?v.push(new e(t,a*T,a*-B)):0!==B?(v.push(new e(t,a*T,a*-B)),v.push(new e(t,a*T,a*B)),++z):v.push(new e(t,a*T,a*B))}return v}(D,e.negate(F,P),0,0,1),Y=G.length;if(Y>0){for(var _=e.clone(e.ZERO,B),j=Number.NEGATIVE_INFINITY,k=0;k<Y;++k){A=s.multiplyByVector(S,s.multiplyByVector(v,G[k],W),W);var H=e.normalize(e.subtract(A,a,R),R),J=e.dot(H,d);J>j&&(j=J,_=e.clone(A,_))}var K=i.cartesianToCartographic(_,V);return j=o.clamp(j,0,1),Q=e.magnitude(e.subtract(_,a,R))*Math.sqrt(1-j*j),Q=f?-Q:Q,K.height=Q,i.cartographicToCartesian(K,new e)}};var A=new e;return w.lineSegmentPlane=function(r,i,a,s){if(!n(r))throw new t("endPoint0 is required.");if(!n(i))throw new t("endPoint1 is required.");if(!n(a))throw new t("plane is required.");n(s)||(s=new e);var u=e.subtract(i,r,A),l=a.normal,d=e.dot(l,u);if(!(Math.abs(d)<o.EPSILON6)){var w=e.dot(l,r),f=-(a.distance+w)/d;if(!(f<0||f>1))return e.multiplyByScalar(u,f,s),e.add(r,s,s),s}},w.trianglePlaneIntersection=function(r,i,a,o){if(!(n(r)&&n(i)&&n(a)&&n(o)))throw new t("p0, p1, p2, and plane are required.");var s,u,l=o.normal,d=o.distance,f=e.dot(l,r)+d<0,c=e.dot(l,i)+d<0,h=e.dot(l,a)+d<0,m=0;if(m+=f?1:0,m+=c?1:0,1!==(m+=h?1:0)&&2!==m||(s=new e,u=new e),1===m){if(f)return w.lineSegmentPlane(r,i,o,s),w.lineSegmentPlane(r,a,o,u),{positions:[r,i,a,s,u],indices:[0,3,4,1,2,4,1,4,3]};if(c)return w.lineSegmentPlane(i,a,o,s),w.lineSegmentPlane(i,r,o,u),{positions:[r,i,a,s,u],indices:[1,3,4,2,0,4,2,4,3]};if(h)return w.lineSegmentPlane(a,r,o,s),w.lineSegmentPlane(a,i,o,u),{positions:[r,i,a,s,u],indices:[2,3,4,0,1,4,0,4,3]}}else if(2===m){if(!f)return w.lineSegmentPlane(i,r,o,s),w.lineSegmentPlane(a,r,o,u),{positions:[r,i,a,s,u],indices:[1,2,4,1,4,3,0,3,4]};if(!c)return w.lineSegmentPlane(a,i,o,s),w.lineSegmentPlane(r,i,o,u),{positions:[r,i,a,s,u],indices:[2,0,4,2,4,3,1,3,4]};if(!h)return w.lineSegmentPlane(r,a,o,s),w.lineSegmentPlane(i,a,o,u),{positions:[r,i,a,s,u],indices:[0,1,4,0,4,3,2,3,4]}}},w});