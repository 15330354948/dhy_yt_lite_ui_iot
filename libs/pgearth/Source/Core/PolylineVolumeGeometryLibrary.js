define(["./Cartesian2","./Cartesian3","./Cartesian4","./Cartographic","./CornerType","./EllipsoidTangentPlane","./Math","./Matrix3","./Matrix4","./PolylinePipeline","./Quaternion","./Transforms"],function(e,r,n,a,t,o,i,l,c,u,s,y){"use strict";var d=[new r,new r],m=new r,f=new r,w=new r,g=new r,p=new r,v=new r,h=new r,B=new r,x=new r,P=new r,S=new r,T={},z=new a;function A(e,n,a,t){var o,i=e[0],l=e[1],c=r.angleBetween(i,l),u=Math.ceil(c/t),s=new Array(u);if(n===a){for(o=0;o<u;o++)s[o]=n;return s.push(a),s}var y=(a-n)/u;for(o=1;o<u;o++){var d=n+o*y;s[o]=d}return s[0]=n,s.push(a),s}var E=new r,b=new r;var D=new r(-1,0,0),M=new c,N=new c,O=new l,C=l.IDENTITY.clone(),G=new r,V=new n,I=new r;function R(n,a,t,i,u,s,d,m){var f=G,w=V;M=y.eastNorthUpToFixedFrame(n,u,M),f=c.multiplyByPointAsVector(M,D,f);var g=function(n,a,t,i){var l=new o(t,i),c=l.projectPointOntoPlane(r.add(t,n,E),E),u=l.projectPointOntoPlane(r.add(t,a,b),b),s=e.angleBetween(c,u);return u.x*c.y-u.y*c.x>=0?-s:s}(f=r.normalize(f,f),a,n,u);O=l.fromRotationZ(g,O),I.z=s,M=c.multiplyTransformation(M,c.fromRotationTranslation(O,I,N),M);var p=C;p[0]=d;for(var v=0;v<m;v++)for(var h=0;h<t.length;h+=3)w=r.fromArray(t,h,w),w=l.multiplyByVector(p,w,w),w=c.multiplyByPoint(M,w,w),i.push(w.x,w.y,w.z);return i}var j=new r;function F(e,n,a,t,o,i,l){for(var c=0;c<e.length;c+=3){t=R(r.fromArray(e,c,j),n,a,t,o,i[c/3],l,1)}return t}function L(e,r){for(var n=e.length,a=new Array(3*n),t=0,o=r.x+r.width/2,i=r.y+r.height/2,l=0;l<n;l++)a[t++]=e[l].x-o,a[t++]=0,a[t++]=e[l].y-i;return a}var Q=new s,U=new r,_=new l;function q(e,n,a,o,c,u,y,d,m,f){var w,g,p=r.angleBetween(r.subtract(n,e,P),r.subtract(a,e,S)),v=o===t.BEVELED?0:Math.ceil(p/i.toRadians(5));if(w=c?l.fromQuaternion(s.fromAxisAngle(r.negate(e,P),p/(v+1),Q),_):l.fromQuaternion(s.fromAxisAngle(e,p/(v+1),Q),_),n=r.clone(n,U),v>0)for(var h=f?2:1,B=0;B<v;B++)n=l.multiplyByVector(w,n,n),g=r.subtract(n,e,P),g=r.normalize(g,g),c||(g=r.negate(g,g)),y=R(u.scaleToGeodeticSurface(n,S),g,d,y,u,m,1,h);else g=r.subtract(n,e,P),g=r.normalize(g,g),c||(g=r.negate(g,g)),y=R(u.scaleToGeodeticSurface(n,S),g,d,y,u,m,1,1),a=r.clone(a,U),g=r.subtract(a,e,P),g=r.normalize(g,g),c||(g=r.negate(g,g)),y=R(u.scaleToGeodeticSurface(a,S),g,d,y,u,m,1,1);return y}T.removeDuplicatesFromShape=function(r){for(var n=r.length,a=[],t=n-1,o=0;o<n;t=o++){var i=r[t],l=r[o];e.equals(i,l)||a.push(l)}return a},T.angleIsGreaterThanPi=function(e,n,a,t){var i=new o(a,t),l=i.projectPointOntoPlane(r.add(a,e,E),E),c=i.projectPointOntoPlane(r.add(a,n,b),b);return c.x*l.y-c.y*l.x>=0};var Y=new r,Z=new r;return T.computePositions=function(e,n,a,o,l){var c=o._ellipsoid,s=function(e,r){for(var n=new Array(e.length),a=0;a<e.length;a++){var t=e[a];z=r.cartesianToCartographic(t,z),n[a]=z.height,e[a]=r.scaleToGeodeticSurface(t,t)}return n}(e,c),y=o._granularity,S=o._cornerType,E=l?function(e,r){var n=e.length,a=new Array(6*n),t=0,o=r.x+r.width/2,i=r.y+r.height/2,l=e[0];a[t++]=l.x-o,a[t++]=0,a[t++]=l.y-i;for(var c=1;c<n;c++){var u=(l=e[c]).x-o,s=l.y-i;a[t++]=u,a[t++]=0,a[t++]=s,a[t++]=u,a[t++]=0,a[t++]=s}return l=e[0],a[t++]=l.x-o,a[t++]=0,a[t++]=l.y-i,a}(n,a):L(n,a),b=l?L(n,a):void 0,D=a.height/2,M=a.width/2,N=e.length,O=[],C=l?[]:void 0,G=m,V=f,I=w,j=g,Q=p,U=v,_=h,k=B,H=x,J=e[0],K=e[1];j=c.geodeticSurfaceNormal(J,j),G=r.subtract(K,J,G),G=r.normalize(G,G),k=r.cross(j,G,k),k=r.normalize(k,k);var W,X=s[0],$=s[1];l&&(C=R(J,k,b,C,c,X+D,1,1)),H=r.clone(J,H),J=K,V=r.negate(G,V);for(var ee=1;ee<N-1;ee++){var re=l?2:1;K=e[ee+1],G=r.subtract(K,J,G),G=r.normalize(G,G),I=r.add(G,V,I),I=r.normalize(I,I),j=c.geodeticSurfaceNormal(J,j);var ne=r.multiplyByScalar(j,r.dot(G,j),Y);r.subtract(G,ne,ne),r.normalize(ne,ne);var ae=r.multiplyByScalar(j,r.dot(V,j),Z);if(r.subtract(V,ae,ae),r.normalize(ae,ae),!i.equalsEpsilon(Math.abs(r.dot(ne,ae)),1,i.EPSILON7)){I=r.cross(I,j,I),I=r.cross(j,I,I),I=r.normalize(I,I);var te=1/Math.max(.25,r.magnitude(r.cross(I,V,P))),oe=T.angleIsGreaterThanPi(G,V,J,c);oe?(Q=r.add(J,r.multiplyByScalar(I,te*M,I),Q),U=r.add(Q,r.multiplyByScalar(k,M,U),U),d[0]=r.clone(H,d[0]),d[1]=r.clone(U,d[1]),W=A(d,X+D,$+D,y),O=F(u.generateArc({positions:d,granularity:y,ellipsoid:c}),k,E,O,c,W,1),k=r.cross(j,G,k),k=r.normalize(k,k),_=r.add(Q,r.multiplyByScalar(k,M,_),_),S===t.ROUNDED||S===t.BEVELED?q(Q,U,_,S,oe,c,O,E,$+D,l):O=R(J,I=r.negate(I,I),E,O,c,$+D,te,re),H=r.clone(_,H)):(Q=r.add(J,r.multiplyByScalar(I,te*M,I),Q),U=r.add(Q,r.multiplyByScalar(k,-M,U),U),d[0]=r.clone(H,d[0]),d[1]=r.clone(U,d[1]),W=A(d,X+D,$+D,y),O=F(u.generateArc({positions:d,granularity:y,ellipsoid:c}),k,E,O,c,W,1),k=r.cross(j,G,k),k=r.normalize(k,k),_=r.add(Q,r.multiplyByScalar(k,-M,_),_),S===t.ROUNDED||S===t.BEVELED?q(Q,U,_,S,oe,c,O,E,$+D,l):O=R(J,I,E,O,c,$+D,te,re),H=r.clone(_,H)),V=r.negate(G,V)}else O=R(H,k,E,O,c,X+D,1,1),H=J;X=$,$=s[ee+1],J=K}d[0]=r.clone(H,d[0]),d[1]=r.clone(J,d[1]),W=A(d,X+D,$+D,y),O=F(u.generateArc({positions:d,granularity:y,ellipsoid:c}),k,E,O,c,W,1),l&&(C=R(J,k,b,C,c,$+D,1,1)),N=O.length;var ie=l?N+C.length:N,le=new Float64Array(ie);return le.set(O),l&&le.set(C,N),le},T});