define(["../ThirdParty/earcut-2.1.1","./Cartesian2","./Cartesian3","./Cartographic","./Check","./ComponentDatatype","./defaultValue","./defined","./Ellipsoid","./EllipsoidRhumbLine","./Geometry","./GeometryAttribute","./Math","./PrimitiveType","./WindingOrder"],function(e,t,a,n,i,r,o,u,s,h,p,l,d,m,c){"use strict";var g=new a,y=new a,f={computeArea2D:function(e){i.defined("positions",e),i.typeOf.number.greaterThanOrEquals("positions.length",e.length,3);for(var t=e.length,a=0,n=t-1,r=0;r<t;n=r++){var o=e[n],u=e[r];a+=o.x*u.y-u.x*o.y}return.5*a},computeWindingOrder2D:function(e){return f.computeArea2D(e)>0?c.COUNTER_CLOCKWISE:c.CLOCKWISE},triangulate:function(a,n){i.defined("positions",a);var r=t.packArray(a);return e(r,n,2)}},v=new a,E=new a,w=new a,b=new a,x=new a,A=new a,S=new a;f.computeSubdivision=function(e,t,n,s){s=o(s,d.RADIANS_PER_DEGREE),i.typeOf.object("ellipsoid",e),i.defined("positions",t),i.defined("indices",n),i.typeOf.number.greaterThanOrEquals("indices.length",n.length,3),i.typeOf.number.equals("indices.length % 3","0",n.length%3,0),i.typeOf.number.greaterThan("granularity",s,0);var h,c=n.slice(0),g=t.length,y=new Array(3*g),f=0;for(h=0;h<g;h++){var O=t[h];y[f++]=O.x,y[f++]=O.y,y[f++]=O.z}for(var T=[],R={},D=e.maximumRadius,M=d.chordLength(s,D),C=M*M;c.length>0;){var z,L,B=c.pop(),G=c.pop(),P=c.pop(),q=a.fromArray(y,3*P,v),I=a.fromArray(y,3*G,E),N=a.fromArray(y,3*B,w),U=a.multiplyByScalar(a.normalize(q,b),D,b),W=a.multiplyByScalar(a.normalize(I,x),D,x),_=a.multiplyByScalar(a.normalize(N,A),D,A),F=a.magnitudeSquared(a.subtract(U,W,S)),j=a.magnitudeSquared(a.subtract(W,_,S)),k=a.magnitudeSquared(a.subtract(_,U,S)),K=Math.max(F,j,k);K>C?F===K?(h=R[z=Math.min(P,G)+" "+Math.max(P,G)],u(h)||(L=a.add(q,I,S),a.multiplyByScalar(L,.5,L),y.push(L.x,L.y,L.z),h=y.length/3-1,R[z]=h),c.push(P,h,B),c.push(h,G,B)):j===K?(h=R[z=Math.min(G,B)+" "+Math.max(G,B)],u(h)||(L=a.add(I,N,S),a.multiplyByScalar(L,.5,L),y.push(L.x,L.y,L.z),h=y.length/3-1,R[z]=h),c.push(G,h,P),c.push(h,B,P)):k===K&&(h=R[z=Math.min(B,P)+" "+Math.max(B,P)],u(h)||(L=a.add(N,q,S),a.multiplyByScalar(L,.5,L),y.push(L.x,L.y,L.z),h=y.length/3-1,R[z]=h),c.push(B,h,G),c.push(h,P,G)):(T.push(P),T.push(G),T.push(B))}return new p({attributes:{position:new l({componentDatatype:r.DOUBLE,componentsPerAttribute:3,values:y})},indices:T,primitiveType:m.TRIANGLES})};var O=new n,T=new n,R=new n,D=new n;return f.computeRhumbLineSubdivision=function(e,t,n,s){s=o(s,d.RADIANS_PER_DEGREE),i.typeOf.object("ellipsoid",e),i.defined("positions",t),i.defined("indices",n),i.typeOf.number.greaterThanOrEquals("indices.length",n.length,3),i.typeOf.number.equals("indices.length % 3","0",n.length%3,0),i.typeOf.number.greaterThan("granularity",s,0);var c,g=n.slice(0),y=t.length,f=new Array(3*y),b=0;for(c=0;c<y;c++){var x=t[c];f[b++]=x.x,f[b++]=x.y,f[b++]=x.z}for(var A=[],M={},C=e.maximumRadius,z=d.chordLength(s,C),L=new h(void 0,void 0,e),B=new h(void 0,void 0,e),G=new h(void 0,void 0,e);g.length>0;){var P=g.pop(),q=g.pop(),I=g.pop(),N=a.fromArray(f,3*I,v),U=a.fromArray(f,3*q,E),W=a.fromArray(f,3*P,w),_=e.cartesianToCartographic(N,O),F=e.cartesianToCartographic(U,T),j=e.cartesianToCartographic(W,R);L.setEndPoints(_,F);var k=L.surfaceDistance;B.setEndPoints(F,j);var K=B.surfaceDistance;G.setEndPoints(j,_);var H,V,J,Q,X=G.surfaceDistance,Y=Math.max(k,K,X);Y>z?k===Y?(c=M[H=Math.min(I,q)+" "+Math.max(I,q)],u(c)||(V=L.interpolateUsingFraction(.5,D),J=.5*(_.height+F.height),Q=a.fromRadians(V.longitude,V.latitude,J,e,S),f.push(Q.x,Q.y,Q.z),c=f.length/3-1,M[H]=c),g.push(I,c,P),g.push(c,q,P)):K===Y?(c=M[H=Math.min(q,P)+" "+Math.max(q,P)],u(c)||(V=B.interpolateUsingFraction(.5,D),J=.5*(F.height+j.height),Q=a.fromRadians(V.longitude,V.latitude,J,e,S),f.push(Q.x,Q.y,Q.z),c=f.length/3-1,M[H]=c),g.push(q,c,I),g.push(c,P,I)):X===Y&&(c=M[H=Math.min(P,I)+" "+Math.max(P,I)],u(c)||(V=G.interpolateUsingFraction(.5,D),J=.5*(j.height+_.height),Q=a.fromRadians(V.longitude,V.latitude,J,e,S),f.push(Q.x,Q.y,Q.z),c=f.length/3-1,M[H]=c),g.push(P,c,q),g.push(c,I,q)):(A.push(I),A.push(q),A.push(P))}return new p({attributes:{position:new l({componentDatatype:r.DOUBLE,componentsPerAttribute:3,values:f})},indices:A,primitiveType:m.TRIANGLES})},f.scaleToGeodeticHeight=function(e,t,n,i){n=o(n,s.WGS84);var r=g,h=y;if(t=o(t,0),i=o(i,!0),u(e))for(var p=e.length,l=0;l<p;l+=3)a.fromArray(e,l,h),i&&(h=n.scaleToGeodeticSurface(h,h)),0!==t&&(r=n.geodeticSurfaceNormal(h,r),a.multiplyByScalar(r,t,r),a.add(h,r,h)),e[l]=h.x,e[l+1]=h.y,e[l+2]=h.z;return e},f});