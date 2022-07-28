define(["./ArcType","./BoundingSphere","./Cartesian3","./Color","./ComponentDatatype","./defaultValue","./defined","./deprecationWarning","./DeveloperError","./Ellipsoid","./Geometry","./GeometryAttribute","./GeometryAttributes","./IndexDatatype","./Math","./PolylinePipeline","./PrimitiveType"],function(e,r,t,o,a,n,i,l,s,p,y,c,h,f,u,g,d){"use strict";function v(e,r,t,a,n,i,l){var s,p=g.numberOfPoints(e,r,n),y=t.red,c=t.green,h=t.blue,f=t.alpha,u=a.red,d=a.green,v=a.blue,T=a.alpha;if(o.equals(t,a)){for(s=0;s<p;s++)i[l++]=o.floatToByte(y),i[l++]=o.floatToByte(c),i[l++]=o.floatToByte(h),i[l++]=o.floatToByte(f);return l}var m=(u-y)/p,B=(d-c)/p,_=(v-h)/p,w=(T-f)/p,k=l;for(s=0;s<p;s++)i[k++]=o.floatToByte(y+s*m),i[k++]=o.floatToByte(c+s*B),i[k++]=o.floatToByte(h+s*_),i[k++]=o.floatToByte(f+s*w);return k}function T(r){var a=(r=n(r,n.EMPTY_OBJECT)).positions,l=r.colors,y=n(r.colorsPerVertex,!1);if(!i(a)||a.length<2)throw new s("At least two positions are required.");if(i(l)&&(y&&l.length<a.length||!y&&l.length<a.length-1))throw new s("colors has an invalid length.");this._positions=a,this._colors=l,this._colorsPerVertex=y,this._arcType=n(r.arcType,e.GEODESIC),this._granularity=n(r.granularity,u.RADIANS_PER_DEGREE),this._ellipsoid=n(r.ellipsoid,p.WGS84),this._workerName="createSimplePolylineGeometry";var c=1+a.length*t.packedLength;c+=i(l)?1+l.length*o.packedLength:1,this.packedLength=c+p.packedLength+3}T.pack=function(e,r,a){if(!i(e))throw new s("value is required");if(!i(r))throw new s("array is required");var l;a=n(a,0);var y=e._positions,c=y.length;for(r[a++]=c,l=0;l<c;++l,a+=t.packedLength)t.pack(y[l],r,a);var h=e._colors;for(c=i(h)?h.length:0,r[a++]=c,l=0;l<c;++l,a+=o.packedLength)o.pack(h[l],r,a);return p.pack(e._ellipsoid,r,a),a+=p.packedLength,r[a++]=e._colorsPerVertex?1:0,r[a++]=e._arcType,r[a]=e._granularity,r},T.unpack=function(e,r,a){if(!i(e))throw new s("array is required");var l;r=n(r,0);var y=e[r++],c=new Array(y);for(l=0;l<y;++l,r+=t.packedLength)c[l]=t.unpack(e,r);var h=(y=e[r++])>0?new Array(y):void 0;for(l=0;l<y;++l,r+=o.packedLength)h[l]=o.unpack(e,r);var f=p.unpack(e,r);r+=p.packedLength;var u=1===e[r++],g=e[r++],d=e[r];return i(a)?(a._positions=c,a._colors=h,a._ellipsoid=f,a._colorsPerVertex=u,a._arcType=g,a._granularity=d,a):new T({positions:c,colors:h,ellipsoid:f,colorsPerVertex:u,arcType:g,granularity:d})};var m=new Array(2),B=new Array(2),_={positions:m,height:B,ellipsoid:void 0,minDistance:void 0,granularity:void 0};return T.createGeometry=function(n){var l,s,p,T,w,k=n._positions,A=n._colors,E=n._colorsPerVertex,b=n._arcType,P=n._granularity,D=n._ellipsoid,L=u.chordLength(P,D.maximumRadius),G=i(A)&&!E,S=k.length,x=0;if(b===e.GEODESIC||b===e.RHUMB){var O,C,I;b===e.GEODESIC?(O=u.chordLength(P,D.maximumRadius),C=g.numberOfPoints,I=g.generateArc):(O=P,C=g.numberOfPointsRhumbLine,I=g.generateRhumbArc);var R=g.extractHeights(k,D),V=_;if(b===e.GEODESIC?V.minDistance=L:V.granularity=P,V.ellipsoid=D,G){var U=0;for(l=0;l<S-1;l++)U+=C(k[l],k[l+1],O)+1;s=new Float64Array(3*U),T=new Uint8Array(4*U),V.positions=m,V.height=B;var q=0;for(l=0;l<S-1;++l){m[0]=k[l],m[1]=k[l+1],B[0]=R[l],B[1]=R[l+1];var N=I(V);if(i(A)){var F=N.length/3;w=A[l];for(var M=0;M<F;++M)T[q++]=o.floatToByte(w.red),T[q++]=o.floatToByte(w.green),T[q++]=o.floatToByte(w.blue),T[q++]=o.floatToByte(w.alpha)}s.set(N,x),x+=N.length}}else if(V.positions=k,V.height=R,s=new Float64Array(I(V)),i(A)){for(T=new Uint8Array(s.length/3*4),l=0;l<S-1;++l){x=v(k[l],k[l+1],A[l],A[l+1],L,T,x)}var H=A[S-1];T[x++]=o.floatToByte(H.red),T[x++]=o.floatToByte(H.green),T[x++]=o.floatToByte(H.blue),T[x++]=o.floatToByte(H.alpha)}}else{p=G?2*S-2:S,s=new Float64Array(3*p),T=i(A)?new Uint8Array(4*p):void 0;var W=0,Y=0;for(l=0;l<S;++l){var z=k[l];if(G&&l>0&&(t.pack(z,s,W),W+=3,w=A[l-1],T[Y++]=o.floatToByte(w.red),T[Y++]=o.floatToByte(w.green),T[Y++]=o.floatToByte(w.blue),T[Y++]=o.floatToByte(w.alpha)),G&&l===S-1)break;t.pack(z,s,W),W+=3,i(A)&&(w=A[l],T[Y++]=o.floatToByte(w.red),T[Y++]=o.floatToByte(w.green),T[Y++]=o.floatToByte(w.blue),T[Y++]=o.floatToByte(w.alpha))}}var J=new h;J.position=new c({componentDatatype:a.DOUBLE,componentsPerAttribute:3,values:s}),i(A)&&(J.color=new c({componentDatatype:a.UNSIGNED_BYTE,componentsPerAttribute:4,values:T,normalize:!0}));var j=2*((p=s.length/3)-1),K=f.createTypedArray(p,j),Q=0;for(l=0;l<p-1;++l)K[Q++]=l,K[Q++]=l+1;return new y({attributes:J,indices:K,primitiveType:d.LINES,boundingSphere:r.fromPoints(k)})},T});