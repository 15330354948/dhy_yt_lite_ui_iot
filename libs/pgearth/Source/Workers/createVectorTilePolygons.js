define(["../Core/AttributeCompression","../Core/Cartesian3","../Core/Cartographic","../Core/Color","../Core/defined","../Core/Ellipsoid","../Core/IndexDatatype","../Core/Math","../Core/OrientedBoundingBox","../Core/Rectangle","./createTaskProcessorWorker"],function(e,r,n,a,t,o,i,f,s,c,d){"use strict";var h=new r,u=new o,l=new c,g={min:void 0,max:void 0,indexBytesPerElement:void 0};function p(e,r,n){var t=r.length,o=2+t*s.packedLength+1+function(e){for(var r=e.length,n=0,t=0;t<r;++t)n+=a.packedLength+3+e[t].batchIds.length;return n}(n),i=new Float64Array(o),f=0;i[f++]=e,i[f++]=t;for(var c=0;c<t;++c)s.pack(r[c],i,f),f+=s.packedLength;var d=n.length;i[f++]=d;for(var h=0;h<d;++h){var u=n[h];a.pack(u.color,i,f),f+=a.packedLength,i[f++]=u.offset,i[f++]=u.count;var l=u.batchIds,g=l.length;i[f++]=g;for(var p=0;p<g;++p)i[f++]=l[p]}return i}var v=32767,b=new r,w=new r,y=new r,I=new r,m=new r,x=new n,A=new c;return d(function(d,N){var k;!function(e){var n=new Float64Array(e),a=0;g.indexBytesPerElement=n[a++],g.min=n[a++],g.max=n[a++],r.unpack(n,a,h),a+=r.packedLength,o.unpack(n,a,u),a+=o.packedLength,c.unpack(n,a,l)}(d.packedBuffer),k=2===g.indexBytesPerElement?new Uint16Array(d.indices):new Uint32Array(d.indices);var C,T,E,L=new Uint16Array(d.positions),O=new Uint32Array(d.counts),U=new Uint32Array(d.indexCounts),B=new Uint32Array(d.batchIds),F=new Uint32Array(d.batchTableColors),S=new Array(O.length),P=h,_=u,M=l,R=g.min,D=g.max,G=d.minimumHeights,Y=d.maximumHeights;t(G)&&t(Y)&&(G=new Float32Array(G),Y=new Float32Array(Y));var V=L.length/2,H=L.subarray(0,V),z=L.subarray(V,2*V);e.zigZagDeltaDecode(H,z);var W=new Float32Array(3*V);for(C=0;C<V;++C){var Z=H[C],j=z[C],q=f.lerp(M.west,M.east,Z/v),J=f.lerp(M.south,M.north,j/v),K=n.fromRadians(q,J,0,x),Q=_.cartographicToCartesian(K,b);r.pack(Q,W,3*C)}var X=O.length,$=new Array(X),ee=new Array(X),re=0,ne=0;for(C=0;C<X;++C)$[C]=re,ee[C]=ne,re+=O[C],ne+=U[C];var ae,te=new Float32Array(3*V*2),oe=new Uint16Array(2*V),ie=new Uint32Array(ee.length),fe=new Uint32Array(U.length),se=[],ce={};for(C=0;C<X;++C)E=F[C],t(ce[E])?(ce[E].positionLength+=O[C],ce[E].indexLength+=U[C],ce[E].batchIds.push(C)):ce[E]={positionLength:O[C],indexLength:U[C],offset:0,indexOffset:0,batchIds:[C]};var de=0,he=0;for(E in ce)if(ce.hasOwnProperty(E)){(ae=ce[E]).offset=de,ae.indexOffset=he;var ue=2*ae.positionLength,le=2*ae.indexLength+6*ae.positionLength;de+=ue,he+=le,ae.indexLength=le}var ge=[];for(E in ce)ce.hasOwnProperty(E)&&(ae=ce[E],ge.push({color:a.fromRgba(parseInt(E)),offset:ae.indexOffset,count:ae.indexLength,batchIds:ae.batchIds}));for(C=0;C<X;++C){var pe=(ae=ce[E=F[C]]).offset,ve=3*pe,be=pe,we=$[C],ye=O[C],Ie=B[C],me=R,xe=D;t(G)&&t(Y)&&(me=G[C],xe=Y[C]);var Ae=Number.POSITIVE_INFINITY,Ne=Number.NEGATIVE_INFINITY,ke=Number.POSITIVE_INFINITY,Ce=Number.NEGATIVE_INFINITY;for(T=0;T<ye;++T){var Te=r.unpack(W,3*we+3*T,b);_.scaleToGeodeticSurface(Te,Te);var Ee=_.cartesianToCartographic(Te,x),Le=Ee.latitude,Oe=Ee.longitude;Ae=Math.min(Le,Ae),Ne=Math.max(Le,Ne),ke=Math.min(Oe,ke),Ce=Math.max(Oe,Ce);var Ue=_.geodeticSurfaceNormal(Te,w),Be=r.multiplyByScalar(Ue,me,y),Fe=r.add(Te,Be,I);Be=r.multiplyByScalar(Ue,xe,Be);var Se=r.add(Te,Be,m);r.subtract(Se,P,Se),r.subtract(Fe,P,Fe),r.pack(Se,te,ve),r.pack(Fe,te,ve+3),oe[be]=Ie,oe[be+1]=Ie,ve+=6,be+=2}(M=A).west=ke,M.east=Ce,M.south=Ae,M.north=Ne,S[C]=s.fromRectangle(M,R,D,_);var Pe=ae.indexOffset,_e=ee[C],Me=U[C];for(ie[C]=Pe,T=0;T<Me;T+=3){var Re=k[_e+T]-we,De=k[_e+T+1]-we,Ge=k[_e+T+2]-we;se[Pe++]=2*Re+pe,se[Pe++]=2*De+pe,se[Pe++]=2*Ge+pe,se[Pe++]=2*Ge+1+pe,se[Pe++]=2*De+1+pe,se[Pe++]=2*Re+1+pe}for(T=0;T<ye;++T){var Ye=T,Ve=(T+1)%ye;se[Pe++]=2*Ye+1+pe,se[Pe++]=2*Ve+pe,se[Pe++]=2*Ye+pe,se[Pe++]=2*Ye+1+pe,se[Pe++]=2*Ve+1+pe,se[Pe++]=2*Ve+pe}ae.offset+=2*ye,ae.indexOffset=Pe,fe[C]=Pe-ie[C]}se=i.createTypedArray(te.length/3,se);for(var He=ge.length,ze=0;ze<He;++ze){for(var We=ge[ze].batchIds,Ze=0,je=We.length,qe=0;qe<je;++qe)Ze+=fe[We[qe]];ge[ze].count=Ze}var Je=p(2===se.BYTES_PER_ELEMENT?i.UNSIGNED_SHORT:i.UNSIGNED_INT,S,ge);return N.push(te.buffer,se.buffer,ie.buffer,fe.buffer,oe.buffer,Je.buffer),{positions:te.buffer,indices:se.buffer,indexOffsets:ie.buffer,indexCounts:fe.buffer,batchIds:oe.buffer,packedBuffer:Je.buffer}})});