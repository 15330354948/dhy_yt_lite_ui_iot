define(["./arrayRemoveDuplicates","./BoundingRectangle","./BoundingSphere","./Cartesian2","./Cartesian3","./ComponentDatatype","./CornerType","./defaultValue","./defined","./DeveloperError","./Ellipsoid","./Geometry","./GeometryAttribute","./GeometryAttributes","./GeometryPipeline","./IndexDatatype","./Math","./oneTimeWarning","./PolygonPipeline","./PolylineVolumeGeometryLibrary","./PrimitiveType","./VertexFormat","./WindingOrder"],function(e,t,n,r,i,o,a,p,s,l,c,u,g,h,y,d,v,m,f,_,k,w,P){"use strict";function L(e){var t=(e=p(e,p.EMPTY_OBJECT)).polylinePositions,n=e.shapePositions;if(!s(t))throw new l("options.polylinePositions is required.");if(!s(n))throw new l("options.shapePositions is required.");this._positions=t,this._shape=n,this._ellipsoid=c.clone(p(e.ellipsoid,c.WGS84)),this._cornerType=p(e.cornerType,a.ROUNDED),this._vertexFormat=w.clone(p(e.vertexFormat,w.DEFAULT)),this._granularity=p(e.granularity,v.RADIANS_PER_DEGREE),this._workerName="createPolylineVolumeGeometry";var o=1+t.length*i.packedLength;o+=1+n.length*r.packedLength,this.packedLength=o+c.packedLength+w.packedLength+2}L.pack=function(e,t,n){if(!s(e))throw new l("value is required");if(!s(t))throw new l("array is required");var o;n=p(n,0);var a=e._positions,u=a.length;for(t[n++]=u,o=0;o<u;++o,n+=i.packedLength)i.pack(a[o],t,n);var g=e._shape;for(u=g.length,t[n++]=u,o=0;o<u;++o,n+=r.packedLength)r.pack(g[o],t,n);return c.pack(e._ellipsoid,t,n),n+=c.packedLength,w.pack(e._vertexFormat,t,n),n+=w.packedLength,t[n++]=e._cornerType,t[n]=e._granularity,t};var T=c.clone(c.UNIT_SPHERE),b=new w,E={polylinePositions:void 0,shapePositions:void 0,ellipsoid:T,vertexFormat:b,cornerType:void 0,granularity:void 0};L.unpack=function(e,t,n){if(!s(e))throw new l("array is required");var o;t=p(t,0);var a=e[t++],u=new Array(a);for(o=0;o<a;++o,t+=i.packedLength)u[o]=i.unpack(e,t);a=e[t++];var g=new Array(a);for(o=0;o<a;++o,t+=r.packedLength)g[o]=r.unpack(e,t);var h=c.unpack(e,t,T);t+=c.packedLength;var y=w.unpack(e,t,b);t+=w.packedLength;var d=e[t++],v=e[t];return s(n)?(n._positions=u,n._shape=g,n._ellipsoid=c.clone(h,n._ellipsoid),n._vertexFormat=w.clone(y,n._vertexFormat),n._cornerType=d,n._granularity=v,n):(E.polylinePositions=u,E.shapePositions=g,E.cornerType=d,E.granularity=v,new L(E))};var A=new t;return L.createGeometry=function(r){var a=r._positions,p=e(a,i.equalsEpsilon),s=r._shape;if(s=_.removeDuplicatesFromShape(s),!(p.length<2||s.length<3)){f.computeWindingOrder2D(s)===P.CLOCKWISE&&s.reverse();var l=t.fromPoints(s,A);return function(e,t,r,i){var a=new h;i.position&&(a.position=new g({componentDatatype:o.DOUBLE,componentsPerAttribute:3,values:e}));var p,s,l,c,v,_,w=t.length,P=e.length/3,L=(P-2*w)/(2*w),T=f.triangulate(t),b=(L-1)*w*6+2*T.length,E=d.createTypedArray(P,b),A=2*w,D=0;for(p=0;p<L-1;p++){for(s=0;s<w-1;s++)_=(l=2*s+p*w*2)+A,v=(c=l+1)+A,E[D++]=c,E[D++]=l,E[D++]=v,E[D++]=v,E[D++]=l,E[D++]=_;v=(c=1+(l=2*w-2+p*w*2))+A,_=l+A,E[D++]=c,E[D++]=l,E[D++]=v,E[D++]=v,E[D++]=l,E[D++]=_}if(i.st||i.tangent||i.bitangent){var F,G,x=new Float32Array(2*P),R=1/(L-1),S=1/r.height,C=r.height/2,O=0;for(p=0;p<L;p++){for(F=p*R,G=S*(t[0].y+C),x[O++]=F,x[O++]=G,s=1;s<w;s++)G=S*(t[s].y+C),x[O++]=F,x[O++]=G,x[O++]=F,x[O++]=G;G=S*(t[0].y+C),x[O++]=F,x[O++]=G}for(s=0;s<w;s++)F=0,G=S*(t[s].y+C),x[O++]=F,x[O++]=G;for(s=0;s<w;s++)F=(L-1)*R,G=S*(t[s].y+C),x[O++]=F,x[O++]=G;a.st=new g({componentDatatype:o.FLOAT,componentsPerAttribute:2,values:new Float32Array(x)})}var q=P-2*w;for(p=0;p<T.length;p+=3){var N=T[p]+q,B=T[p+1]+q,I=T[p+2]+q;E[D++]=N,E[D++]=B,E[D++]=I,E[D++]=I+w,E[D++]=B+w,E[D++]=N+w}var U=new u({attributes:a,indices:E,boundingSphere:n.fromVertices(e),primitiveType:k.TRIANGLES});if(i.normal&&(U=y.computeNormal(U)),i.tangent||i.bitangent){try{U=y.computeTangentAndBitangent(U)}catch(e){m("polyline-volume-tangent-bitangent","Unable to compute tangents and bitangents for polyline volume geometry")}i.tangent||(U.attributes.tangent=void 0),i.bitangent||(U.attributes.bitangent=void 0),i.st||(U.attributes.st=void 0)}return U}(_.computePositions(p,s,l,r,!0),s,l,r._vertexFormat)}},L});