define(["./arrayFill","./BoundingSphere","./Cartesian2","./Cartesian3","./Cartographic","./Check","./ComponentDatatype","./defaultValue","./defined","./defineProperties","./DeveloperError","./Ellipsoid","./Geometry","./GeometryAttribute","./GeometryAttributes","./GeometryInstance","./GeometryOffsetAttribute","./GeometryPipeline","./IndexDatatype","./Math","./Matrix2","./Matrix3","./PolygonPipeline","./PrimitiveType","./Quaternion","./Rectangle","./RectangleGeometryLibrary","./VertexFormat"],function(t,e,r,a,n,o,i,s,l,u,c,g,p,v,d,m,h,f,y,_,w,b,A,x,E,P,F,R){"use strict";var L=new a,T=new a,N=new a,O=new a,D=new P,k=new r,S=new e,M=new e;function G(t,e){var r=new p({attributes:new d,primitiveType:x.TRIANGLES});return r.attributes.position=new v({componentDatatype:i.DOUBLE,componentsPerAttribute:3,values:e.positions}),t.normal&&(r.attributes.normal=new v({componentDatatype:i.FLOAT,componentsPerAttribute:3,values:e.normals})),t.tangent&&(r.attributes.tangent=new v({componentDatatype:i.FLOAT,componentsPerAttribute:3,values:e.tangents})),t.bitangent&&(r.attributes.bitangent=new v({componentDatatype:i.FLOAT,componentsPerAttribute:3,values:e.bitangents})),r}var I=new a,C=new a;function H(t,e){var r=t._vertexFormat,n=t._ellipsoid,o=e.height,s=e.width,l=e.northCap,u=e.southCap,c=0,g=o,p=o,d=0;l&&(c=1,p-=1,d+=1),u&&(g-=1,p-=1,d+=1),d+=s*p;for(var m=r.position?new Float64Array(3*d):void 0,h=r.st?new Float32Array(2*d):void 0,f=0,_=0,w=L,A=k,x=Number.MAX_VALUE,E=Number.MAX_VALUE,P=-Number.MAX_VALUE,R=-Number.MAX_VALUE,D=c;D<g;++D)for(var S=0;S<s;++S)F.computePosition(e,n,r.st,D,S,w,A),m[f++]=w.x,m[f++]=w.y,m[f++]=w.z,r.st&&(h[_++]=A.x,h[_++]=A.y,x=Math.min(x,A.x),E=Math.min(E,A.y),P=Math.max(P,A.x),R=Math.max(R,A.y));if(l&&(F.computePosition(e,n,r.st,0,0,w,A),m[f++]=w.x,m[f++]=w.y,m[f++]=w.z,r.st&&(h[_++]=A.x,h[_++]=A.y,x=A.x,E=A.y,P=A.x,R=A.y)),u&&(F.computePosition(e,n,r.st,o-1,0,w,A),m[f++]=w.x,m[f++]=w.y,m[f]=w.z,r.st&&(h[_++]=A.x,h[_]=A.y,x=Math.min(x,A.x),E=Math.min(E,A.y),P=Math.max(P,A.x),R=Math.max(R,A.y))),r.st&&(x<0||E<0||P>1||R>1))for(var M=0;M<h.length;M+=2)h[M]=(h[M]-x)/(P-x),h[M+1]=(h[M+1]-E)/(R-E);var I=function(t,e,r,n){var o=t.length,i=e.normal?new Float32Array(o):void 0,s=e.tangent?new Float32Array(o):void 0,l=e.bitangent?new Float32Array(o):void 0,u=0,c=O,g=N,p=T;if(e.normal||e.tangent||e.bitangent)for(var v=0;v<o;v+=3){var d=a.fromArray(t,v,L),m=u+1,h=u+2;p=r.geodeticSurfaceNormal(d,p),(e.tangent||e.bitangent)&&(a.cross(a.UNIT_Z,p,g),b.multiplyByVector(n,g,g),a.normalize(g,g),e.bitangent&&a.normalize(a.cross(p,g,c),c)),e.normal&&(i[u]=p.x,i[m]=p.y,i[h]=p.z),e.tangent&&(s[u]=g.x,s[m]=g.y,s[h]=g.z),e.bitangent&&(l[u]=c.x,l[m]=c.y,l[h]=c.z),u+=3}return G(e,{positions:t,normals:i,tangents:s,bitangents:l})}(m,r,n,e.tangentRotationMatrix),C=6*(s-1)*(p-1);l&&(C+=3*(s-1)),u&&(C+=3*(s-1));var H,V=y.createTypedArray(d,C),z=0,U=0;for(H=0;H<p-1;++H){for(var B=0;B<s-1;++B){var q=z,Y=q+s,X=Y+1,j=q+1;V[U++]=q,V[U++]=Y,V[U++]=j,V[U++]=j,V[U++]=Y,V[U++]=X,++z}++z}if(l||u){var J,Q,W=d-1,Z=d-1;if(l&&u&&(W=d-2),z=0,l)for(H=0;H<s-1;H++)Q=(J=z)+1,V[U++]=W,V[U++]=J,V[U++]=Q,++z;if(u)for(z=(p-1)*s,H=0;H<s-1;H++)Q=(J=z)+1,V[U++]=J,V[U++]=Z,V[U++]=Q,++z}return I.indices=V,r.st&&(I.attributes.st=new v({componentDatatype:i.FLOAT,componentsPerAttribute:2,values:h})),I}function V(t,e,r,a,n){return t[e++]=a[r],t[e++]=a[r+1],t[e++]=a[r+2],t[e++]=n[r],t[e++]=n[r+1],t[e]=n[r+2],t}function z(t,e,r,a){return t[e++]=a[r],t[e++]=a[r+1],t[e++]=a[r],t[e]=a[r+1],t}var U=new R;function B(e,r){var n,o=e._shadowVolume,s=e._offsetAttribute,u=e._vertexFormat,c=e._extrudedHeight,g=e._surfaceHeight,p=e._ellipsoid,d=r.height,w=r.width;if(o){var b=R.clone(u,U);b.normal=!0,e._vertexFormat=b}var x=H(e,r);o&&(e._vertexFormat=u);var E=A.scaleToGeodeticHeight(x.attributes.position.values,g,p,!1),P=(E=new Float64Array(E)).length,F=2*P,D=new Float64Array(F);D.set(E);var k=A.scaleToGeodeticHeight(x.attributes.position.values,c,p);D.set(k,P),x.attributes.position.values=D;var S,M,B,q=u.normal?new Float32Array(F):void 0,Y=u.tangent?new Float32Array(F):void 0,X=u.bitangent?new Float32Array(F):void 0,j=u.st?new Float32Array(F/3*2):void 0;if(u.normal){for(M=x.attributes.normal.values,q.set(M),n=0;n<P;n++)M[n]=-M[n];q.set(M,P),x.attributes.normal.values=q}if(o){M=x.attributes.normal.values,u.normal||(x.attributes.normal=void 0);var J=new Float32Array(F);for(n=0;n<P;n++)M[n]=-M[n];J.set(M,P),x.attributes.extrudeDirection=new v({componentDatatype:i.FLOAT,componentsPerAttribute:3,values:J})}var Q=l(s);if(Q){var W=P/3*2,Z=new Uint8Array(W);s===h.TOP?Z=t(Z,1,0,W/2):(B=s===h.NONE?0:1,Z=t(Z,B)),x.attributes.applyOffset=new v({componentDatatype:i.UNSIGNED_BYTE,componentsPerAttribute:1,values:Z})}if(u.tangent){var K=x.attributes.tangent.values;for(Y.set(K),n=0;n<P;n++)K[n]=-K[n];Y.set(K,P),x.attributes.tangent.values=Y}if(u.bitangent){var $=x.attributes.bitangent.values;X.set($),X.set($,P),x.attributes.bitangent.values=X}u.st&&(S=x.attributes.st.values,j.set(S),j.set(S,P/3*2),x.attributes.st.values=j);var tt=x.indices,et=tt.length,rt=P/3,at=y.createTypedArray(F/3,2*et);for(at.set(tt),n=0;n<et;n+=3)at[n+et]=tt[n+2]+rt,at[n+1+et]=tt[n+1]+rt,at[n+2+et]=tt[n]+rt;x.indices=at;var nt=r.northCap,ot=r.southCap,it=d,st=2,lt=0,ut=4,ct=4;nt&&(st-=1,it-=1,lt+=1,ut-=2,ct-=1),ot&&(st-=1,it-=1,lt+=1,ut-=2,ct-=1);var gt=2*((lt+=st*w+2*it-ut)+ct),pt=new Float64Array(3*gt),vt=o?new Float32Array(3*gt):void 0,dt=Q?new Uint8Array(gt):void 0,mt=u.st?new Float32Array(2*gt):void 0,ht=s===h.TOP;Q&&!ht&&(B=s===h.ALL?1:0,dt=t(dt,B));var ft,yt=0,_t=0,wt=0,bt=0,At=w*it;for(n=0;n<At;n+=w)pt=V(pt,yt,ft=3*n,E,k),yt+=6,u.st&&(mt=z(mt,_t,2*n,S),_t+=4),o&&(wt+=3,vt[wt++]=M[ft],vt[wt++]=M[ft+1],vt[wt++]=M[ft+2]),ht&&(dt[bt++]=1,bt+=1);if(ot){var xt=nt?At+1:At;for(ft=3*xt,n=0;n<2;n++)pt=V(pt,yt,ft,E,k),yt+=6,u.st&&(mt=z(mt,_t,2*xt,S),_t+=4),o&&(wt+=3,vt[wt++]=M[ft],vt[wt++]=M[ft+1],vt[wt++]=M[ft+2]),ht&&(dt[bt++]=1,bt+=1)}else for(n=At-w;n<At;n++)pt=V(pt,yt,ft=3*n,E,k),yt+=6,u.st&&(mt=z(mt,_t,2*n,S),_t+=4),o&&(wt+=3,vt[wt++]=M[ft],vt[wt++]=M[ft+1],vt[wt++]=M[ft+2]),ht&&(dt[bt++]=1,bt+=1);for(n=At-1;n>0;n-=w)pt=V(pt,yt,ft=3*n,E,k),yt+=6,u.st&&(mt=z(mt,_t,2*n,S),_t+=4),o&&(wt+=3,vt[wt++]=M[ft],vt[wt++]=M[ft+1],vt[wt++]=M[ft+2]),ht&&(dt[bt++]=1,bt+=1);if(nt){var Et=At;for(ft=3*Et,n=0;n<2;n++)pt=V(pt,yt,ft,E,k),yt+=6,u.st&&(mt=z(mt,_t,2*Et,S),_t+=4),o&&(wt+=3,vt[wt++]=M[ft],vt[wt++]=M[ft+1],vt[wt++]=M[ft+2]),ht&&(dt[bt++]=1,bt+=1)}else for(n=w-1;n>=0;n--)pt=V(pt,yt,ft=3*n,E,k),yt+=6,u.st&&(mt=z(mt,_t,2*n,S),_t+=4),o&&(wt+=3,vt[wt++]=M[ft],vt[wt++]=M[ft+1],vt[wt++]=M[ft+2]),ht&&(dt[bt++]=1,bt+=1);var Pt=function(t,e,r){var n=t.length,o=e.normal?new Float32Array(n):void 0,i=e.tangent?new Float32Array(n):void 0,s=e.bitangent?new Float32Array(n):void 0,l=0,u=0,c=0,g=!0,p=O,v=N,d=T;if(e.normal||e.tangent||e.bitangent)for(var m=0;m<n;m+=6){var h=a.fromArray(t,m,L),f=a.fromArray(t,(m+6)%n,I);if(g){var y=a.fromArray(t,(m+3)%n,C);a.subtract(f,h,f),a.subtract(y,h,y),d=a.normalize(a.cross(y,f,d),d),g=!1}a.equalsEpsilon(f,h,_.EPSILON10)&&(g=!0),(e.tangent||e.bitangent)&&(p=r.geodeticSurfaceNormal(h,p),e.tangent&&(v=a.normalize(a.cross(p,d,v),v))),e.normal&&(o[l++]=d.x,o[l++]=d.y,o[l++]=d.z,o[l++]=d.x,o[l++]=d.y,o[l++]=d.z),e.tangent&&(i[u++]=v.x,i[u++]=v.y,i[u++]=v.z,i[u++]=v.x,i[u++]=v.y,i[u++]=v.z),e.bitangent&&(s[c++]=p.x,s[c++]=p.y,s[c++]=p.z,s[c++]=p.x,s[c++]=p.y,s[c++]=p.z)}return G(e,{positions:t,normals:o,tangents:i,bitangents:s})}(pt,u,p);u.st&&(Pt.attributes.st=new v({componentDatatype:i.FLOAT,componentsPerAttribute:2,values:mt})),o&&(Pt.attributes.extrudeDirection=new v({componentDatatype:i.FLOAT,componentsPerAttribute:3,values:vt})),Q&&(Pt.attributes.applyOffset=new v({componentDatatype:i.UNSIGNED_BYTE,componentsPerAttribute:1,values:dt}));var Ft,Rt,Lt,Tt,Nt=y.createTypedArray(gt,6*lt);P=pt.length/3;var Ot=0;for(n=0;n<P-1;n+=2){Tt=((Ft=n)+2)%P;var Dt=a.fromArray(pt,3*Ft,I),kt=a.fromArray(pt,3*Tt,C);a.equalsEpsilon(Dt,kt,_.EPSILON10)||(Lt=((Rt=(Ft+1)%P)+2)%P,Nt[Ot++]=Ft,Nt[Ot++]=Rt,Nt[Ot++]=Tt,Nt[Ot++]=Tt,Nt[Ot++]=Rt,Nt[Ot++]=Lt)}return Pt.indices=Nt,(Pt=f.combineInstances([new m({geometry:x}),new m({geometry:Pt})]))[0]}var q=[new a,new a,new a,new a],Y=new n,X=new n;function j(t,e,r,a,n){if(0===r)return P.clone(t,n);var o=F.computeOptions(t,e,r,0,D,Y),i=o.height,s=o.width,l=q;return F.computePosition(o,a,!1,0,0,l[0]),F.computePosition(o,a,!1,0,s-1,l[1]),F.computePosition(o,a,!1,i-1,0,l[2]),F.computePosition(o,a,!1,i-1,s-1,l[3]),P.fromCartesianArray(l,a,n)}function J(t){var e=(t=s(t,s.EMPTY_OBJECT)).rectangle;if(o.typeOf.object("rectangle",e),P.validate(e),e.north<e.south)throw new c("options.rectangle.north must be greater than or equal to options.rectangle.south");var r=s(t.height,0),a=s(t.extrudedHeight,r);this._rectangle=P.clone(e),this._granularity=s(t.granularity,_.RADIANS_PER_DEGREE),this._ellipsoid=g.clone(s(t.ellipsoid,g.WGS84)),this._surfaceHeight=Math.max(r,a),this._rotation=s(t.rotation,0),this._stRotation=s(t.stRotation,0),this._vertexFormat=R.clone(s(t.vertexFormat,R.DEFAULT)),this._extrudedHeight=Math.min(r,a),this._shadowVolume=s(t.shadowVolume,!1),this._workerName="createRectangleGeometry",this._offsetAttribute=t.offsetAttribute,this._rotatedRectangle=void 0,this._textureCoordinateRotationPoints=void 0}J.packedLength=P.packedLength+g.packedLength+R.packedLength+7,J.pack=function(t,e,r){return o.typeOf.object("value",t),o.defined("array",e),r=s(r,0),P.pack(t._rectangle,e,r),r+=P.packedLength,g.pack(t._ellipsoid,e,r),r+=g.packedLength,R.pack(t._vertexFormat,e,r),r+=R.packedLength,e[r++]=t._granularity,e[r++]=t._surfaceHeight,e[r++]=t._rotation,e[r++]=t._stRotation,e[r++]=t._extrudedHeight,e[r++]=t._shadowVolume?1:0,e[r]=s(t._offsetAttribute,-1),e};var Q=new P,W=g.clone(g.UNIT_SPHERE),Z={rectangle:Q,ellipsoid:W,vertexFormat:U,granularity:void 0,height:void 0,rotation:void 0,stRotation:void 0,extrudedHeight:void 0,shadowVolume:void 0,offsetAttribute:void 0};J.unpack=function(t,e,r){o.defined("array",t),e=s(e,0);var a=P.unpack(t,e,Q);e+=P.packedLength;var n=g.unpack(t,e,W);e+=g.packedLength;var i=R.unpack(t,e,U);e+=R.packedLength;var u=t[e++],c=t[e++],p=t[e++],v=t[e++],d=t[e++],m=1===t[e++],h=t[e];return l(r)?(r._rectangle=P.clone(a,r._rectangle),r._ellipsoid=g.clone(n,r._ellipsoid),r._vertexFormat=R.clone(i,r._vertexFormat),r._granularity=u,r._surfaceHeight=c,r._rotation=p,r._stRotation=v,r._extrudedHeight=d,r._shadowVolume=m,r._offsetAttribute=-1===h?void 0:h,r):(Z.granularity=u,Z.height=c,Z.rotation=p,Z.stRotation=v,Z.extrudedHeight=d,Z.shadowVolume=m,Z.offsetAttribute=-1===h?void 0:h,new J(Z))},J.computeRectangle=function(t,e){var r=(t=s(t,s.EMPTY_OBJECT)).rectangle;if(o.typeOf.object("rectangle",r),P.validate(r),r.north<r.south)throw new c("options.rectangle.north must be greater than or equal to options.rectangle.south");var a=s(t.granularity,_.RADIANS_PER_DEGREE),n=s(t.ellipsoid,g.WGS84);return j(r,a,s(t.rotation,0),n,e)};var K=new b,$=new E,tt=new n;J.createGeometry=function(r){if(!_.equalsEpsilon(r._rectangle.north,r._rectangle.south,_.EPSILON10)&&!_.equalsEpsilon(r._rectangle.east,r._rectangle.west,_.EPSILON10)){var a=r._rectangle,n=r._ellipsoid,o=r._rotation,s=r._stRotation,u=r._vertexFormat,c=F.computeOptions(a,r._granularity,o,s,D,Y,X),g=K;if(0!==s||0!==o){var d=P.center(a,tt),m=n.geodeticSurfaceNormalCartographic(d,I);E.fromAxisAngle(m,-s,$),b.fromQuaternion($,g)}else b.clone(b.IDENTITY,g);var f,y,w=r._surfaceHeight,x=r._extrudedHeight,R=!_.equalsEpsilon(w,x,0,_.EPSILON2);if(c.lonScalar=1/r._rectangle.width,c.latScalar=1/r._rectangle.height,c.tangentRotationMatrix=g,a=r._rectangle,R){f=B(r,c);var L=e.fromRectangle3D(a,n,w,M),T=e.fromRectangle3D(a,n,x,S);y=e.union(L,T)}else{if((f=H(r,c)).attributes.position.values=A.scaleToGeodeticHeight(f.attributes.position.values,w,n,!1),l(r._offsetAttribute)){var N=f.attributes.position.values.length,O=new Uint8Array(N/3),k=r._offsetAttribute===h.NONE?0:1;t(O,k),f.attributes.applyOffset=new v({componentDatatype:i.UNSIGNED_BYTE,componentsPerAttribute:1,values:O})}y=e.fromRectangle3D(a,n,w)}return u.position||delete f.attributes.position,new p({attributes:f.attributes,indices:f.indices,primitiveType:f.primitiveType,boundingSphere:y,offsetAttribute:r._offsetAttribute})}},J.createShadowVolume=function(t,e,r){var a=t._granularity,n=t._ellipsoid,o=e(a,n),i=r(a,n);return new J({rectangle:t._rectangle,rotation:t._rotation,ellipsoid:n,stRotation:t._stRotation,granularity:a,extrudedHeight:i,height:o,vertexFormat:R.POSITION_ONLY,shadowVolume:!0})};var et=new P,rt=[new r,new r,new r],at=new w,nt=new n;return u(J.prototype,{rectangle:{get:function(){return l(this._rotatedRectangle)||(this._rotatedRectangle=j(this._rectangle,this._granularity,this._rotation,this._ellipsoid)),this._rotatedRectangle}},textureCoordinateRotationPoints:{get:function(){return l(this._textureCoordinateRotationPoints)||(this._textureCoordinateRotationPoints=function(t){if(0===t._stRotation)return[0,0,0,1,1,0];var e=P.clone(t._rectangle,et),a=t._granularity,n=t._ellipsoid,o=j(e,a,t._rotation-t._stRotation,n,et),i=rt;i[0].x=o.west,i[0].y=o.south,i[1].x=o.west,i[1].y=o.north,i[2].x=o.east,i[2].y=o.south;for(var s=t.rectangle,l=w.fromRotation(t._stRotation,at),u=P.center(s,nt),c=0;c<3;++c){var g=i[c];g.x-=u.longitude,g.y-=u.latitude,w.multiplyByVector(l,g,g),g.x+=u.longitude,g.y+=u.latitude,g.x=(g.x-s.west)/s.width,g.y=(g.y-s.south)/s.height}var p=i[0],v=i[1],d=i[2],m=new Array(6);return r.pack(p,m),r.pack(v,m,2),r.pack(d,m,4),m}(this)),this._textureCoordinateRotationPoints}}}),J});