define(["./AttributeCompression","./barycentricCoordinates","./BoundingSphere","./Cartesian2","./Cartesian3","./Cartesian4","./Cartographic","./ComponentDatatype","./defaultValue","./defined","./DeveloperError","./EncodedCartesian3","./GeographicProjection","./Geometry","./GeometryAttribute","./GeometryType","./IndexDatatype","./Intersect","./IntersectionTests","./Math","./Matrix3","./Matrix4","./Plane","./PrimitiveType","./Tipsify"],function(e,t,r,i,n,a,o,s,u,p,v,l,y,c,m,f,h,d,b,w,g,A,T,P,x){"use strict";var S={};function N(e,t,r,i,n){e[t++]=r,e[t++]=i,e[t++]=i,e[t++]=n,e[t++]=n,e[t]=r}function O(e){var t={};for(var r in e)if(e.hasOwnProperty(r)&&p(e[r])&&p(e[r].values)){var i=e[r];t[r]=new m({componentDatatype:i.componentDatatype,componentsPerAttribute:i.componentsPerAttribute,normalize:i.normalize,values:[]})}return t}function E(e,t,r){for(var i in t)if(t.hasOwnProperty(i)&&p(t[i])&&p(t[i].values))for(var n=t[i],a=0;a<n.componentsPerAttribute;++a)e[i].values.push(n.values[r*n.componentsPerAttribute+a])}S.toWireframe=function(e){if(!p(e))throw new v("geometry is required.");var t=e.indices;if(p(t)){switch(e.primitiveType){case P.TRIANGLES:e.indices=function(e){for(var t=e.length,r=t/3*6,i=h.createTypedArray(t,r),n=0,a=0;a<t;a+=3,n+=6)N(i,n,e[a],e[a+1],e[a+2]);return i}(t);break;case P.TRIANGLE_STRIP:e.indices=function(e){var t=e.length;if(t>=3){var r=6*(t-2),i=h.createTypedArray(t,r);N(i,0,e[0],e[1],e[2]);for(var n=6,a=3;a<t;++a,n+=6)N(i,n,e[a-1],e[a],e[a-2]);return i}return new Uint16Array}(t);break;case P.TRIANGLE_FAN:e.indices=function(e){if(e.length>0){for(var t=e.length-1,r=6*(t-1),i=h.createTypedArray(t,r),n=e[0],a=0,o=1;o<t;++o,a+=6)N(i,a,n,e[o],e[o+1]);return i}return new Uint16Array}(t);break;default:throw new v("geometry.primitiveType must be TRIANGLES, TRIANGLE_STRIP, or TRIANGLE_FAN.")}e.primitiveType=P.LINES}return e},S.createLineSegmentsForVectors=function(e,t,i){if(t=u(t,"normal"),!p(e))throw new v("geometry is required.");if(!p(e.attributes.position))throw new v("geometry.attributes.position is required.");if(!p(e.attributes[t]))throw new v("geometry.attributes must have an attribute with the same name as the attributeName parameter, "+t+".");i=u(i,1e4);for(var n,a=e.attributes.position.values,o=e.attributes[t].values,l=a.length,y=new Float64Array(2*l),f=0,h=0;h<l;h+=3)y[f++]=a[h],y[f++]=a[h+1],y[f++]=a[h+2],y[f++]=a[h]+o[h]*i,y[f++]=a[h+1]+o[h+1]*i,y[f++]=a[h+2]+o[h+2]*i;var d=e.boundingSphere;return p(d)&&(n=new r(d.center,d.radius+i)),new c({attributes:{position:new m({componentDatatype:s.DOUBLE,componentsPerAttribute:3,values:y})},primitiveType:P.LINES,boundingSphere:n})},S.createAttributeLocations=function(e){if(!p(e))throw new v("geometry is required.");var t,r=["position","positionHigh","positionLow","position3DHigh","position3DLow","position2DHigh","position2DLow","pickColor","normal","st","tangent","bitangent","extrudeDirection","compressedAttributes"],i=e.attributes,n={},a=0,o=r.length;for(t=0;t<o;++t){var s=r[t];p(i[s])&&(n[s]=a++)}for(var u in i)i.hasOwnProperty(u)&&!p(n[u])&&(n[u]=a++);return n},S.reorderForPreVertexCache=function(e){if(!p(e))throw new v("geometry is required.");var t=c.computeNumberOfVertices(e),r=e.indices;if(p(r)){for(var i=new Int32Array(t),n=0;n<t;n++)i[n]=-1;for(var a,o=r,u=o.length,l=h.createTypedArray(t,u),y=0,m=0,f=0;y<u;)-1!==(a=i[o[y]])?l[m]=a:(i[a=o[y]]=f,l[m]=f,++f),++y,++m;e.indices=l;var d=e.attributes;for(var b in d)if(d.hasOwnProperty(b)&&p(d[b])&&p(d[b].values)){for(var w=d[b],g=w.values,A=0,T=w.componentsPerAttribute,P=s.createTypedArray(w.componentDatatype,f*T);A<t;){var x=i[A];if(-1!==x)for(var S=0;S<T;S++)P[T*x+S]=g[T*A+S];++A}w.values=P}}return e},S.reorderForPostVertexCache=function(e,t){if(!p(e))throw new v("geometry is required.");var r=e.indices;if(e.primitiveType===P.TRIANGLES&&p(r)){for(var i=r.length,n=0,a=0;a<i;a++)r[a]>n&&(n=r[a]);e.indices=x.tipsify({indices:r,maximumIndex:n,cacheSize:t})}return e},S.fitToUnsignedShortIndices=function(e){if(!p(e))throw new v("geometry is required.");if(p(e.indices)&&e.primitiveType!==P.TRIANGLES&&e.primitiveType!==P.LINES&&e.primitiveType!==P.POINTS)throw new v("geometry.primitiveType must equal to PrimitiveType.TRIANGLES, PrimitiveType.LINES, or PrimitiveType.POINTS.");var t=[],r=c.computeNumberOfVertices(e);if(p(e.indices)&&r>=w.SIXTY_FOUR_KILOBYTES){var i,n=[],a=[],o=0,s=O(e.attributes),u=e.indices,l=u.length;e.primitiveType===P.TRIANGLES?i=3:e.primitiveType===P.LINES?i=2:e.primitiveType===P.POINTS&&(i=1);for(var y=0;y<l;y+=i){for(var m=0;m<i;++m){var f=u[y+m],h=n[f];p(h)||(h=o++,n[f]=h,E(s,e.attributes,f)),a.push(h)}o+i>=w.SIXTY_FOUR_KILOBYTES&&(t.push(new c({attributes:s,indices:a,primitiveType:e.primitiveType,boundingSphere:e.boundingSphere,boundingSphereCV:e.boundingSphereCV})),n=[],a=[],o=0,s=O(e.attributes))}0!==a.length&&t.push(new c({attributes:s,indices:a,primitiveType:e.primitiveType,boundingSphere:e.boundingSphere,boundingSphereCV:e.boundingSphereCV}))}else t.push(e);return t};var I=new n,L=new o;S.projectTo2D=function(e,t,r,i,a){if(!p(e))throw new v("geometry is required.");if(!p(t))throw new v("attributeName is required.");if(!p(r))throw new v("attributeName3D is required.");if(!p(i))throw new v("attributeName2D is required.");if(!p(e.attributes[t]))throw new v("geometry must have attribute matching the attributeName argument: "+t+".");if(e.attributes[t].componentDatatype!==s.DOUBLE)throw new v("The attribute componentDatatype must be ComponentDatatype.DOUBLE.");for(var o=e.attributes[t],u=(a=p(a)?a:new y).ellipsoid,l=o.values,c=new Float64Array(l.length),f=0,h=0;h<l.length;h+=3){var d=n.fromArray(l,h,I),b=u.cartesianToCartographic(d,L);if(!p(b))throw new v("Could not project point ("+d.x+", "+d.y+", "+d.z+") to 2D.");var w=a.project(b,I);c[f++]=w.x,c[f++]=w.y,c[f++]=w.z}return e.attributes[r]=o,e.attributes[i]=new m({componentDatatype:s.DOUBLE,componentsPerAttribute:3,values:c}),delete e.attributes[t],e};var z={high:0,low:0};S.encodeAttribute=function(e,t,r,i){if(!p(e))throw new v("geometry is required.");if(!p(t))throw new v("attributeName is required.");if(!p(r))throw new v("attributeHighName is required.");if(!p(i))throw new v("attributeLowName is required.");if(!p(e.attributes[t]))throw new v("geometry must have attribute matching the attributeName argument: "+t+".");if(e.attributes[t].componentDatatype!==s.DOUBLE)throw new v("The attribute componentDatatype must be ComponentDatatype.DOUBLE.");for(var n=e.attributes[t],a=n.values,o=a.length,u=new Float32Array(o),y=new Float32Array(o),c=0;c<o;++c)l.encode(a[c],z),u[c]=z.high,y[c]=z.low;var f=n.componentsPerAttribute;return e.attributes[r]=new m({componentDatatype:s.FLOAT,componentsPerAttribute:f,values:u}),e.attributes[i]=new m({componentDatatype:s.FLOAT,componentsPerAttribute:f,values:y}),delete e.attributes[t],e};var D=new n;function q(e,t){if(p(t))for(var r=t.values,i=r.length,a=0;a<i;a+=3)n.unpack(r,a,D),A.multiplyByPoint(e,D,D),n.pack(D,r,a)}function R(e,t){if(p(t))for(var r=t.values,i=r.length,a=0;a<i;a+=3)n.unpack(r,a,D),g.multiplyByVector(e,D,D),D=n.normalize(D,D),n.pack(D,r,a)}var G=new A,C=new g;S.transformToWorldCoordinates=function(e){if(!p(e))throw new v("instance is required.");var t=e.modelMatrix;if(A.equals(t,A.IDENTITY))return e;var i=e.geometry.attributes;q(t,i.position),q(t,i.prevPosition),q(t,i.nextPosition),(p(i.normal)||p(i.tangent)||p(i.bitangent))&&(A.inverse(t,G),A.transpose(G,G),A.getRotation(G,C),R(C,i.normal),R(C,i.tangent),R(C,i.bitangent));var n=e.geometry.boundingSphere;return p(n)&&(e.geometry.boundingSphere=r.transform(n,t,n)),e.modelMatrix=A.clone(A.IDENTITY),e};var F=new n;function k(e,t){var i,a,o,u,l=e.length,y=e[0].modelMatrix,f=p(e[0][t].indices),d=e[0][t].primitiveType;for(a=1;a<l;++a){if(!A.equals(e[a].modelMatrix,y))throw new v("All instances must have the same modelMatrix.");if(p(e[a][t].indices)!==f)throw new v("All instance geometries must have an indices or not have one.");if(e[a][t].primitiveType!==d)throw new v("All instance geometries must have the same primitiveType.")}var b,w,g,T,x=function(e,t){var r,i=e.length,n={},a=e[0][t].attributes;for(r in a)if(a.hasOwnProperty(r)&&p(a[r])&&p(a[r].values)){for(var o=a[r],u=o.values.length,v=!0,l=1;l<i;++l){var y=e[l][t].attributes[r];if(!p(y)||o.componentDatatype!==y.componentDatatype||o.componentsPerAttribute!==y.componentsPerAttribute||o.normalize!==y.normalize){v=!1;break}u+=y.values.length}v&&(n[r]=new m({componentDatatype:o.componentDatatype,componentsPerAttribute:o.componentsPerAttribute,normalize:o.normalize,values:s.createTypedArray(o.componentDatatype,u)}))}return n}(e,t);for(i in x)if(x.hasOwnProperty(i))for(b=x[i].values,u=0,a=0;a<l;++a)for(g=(w=e[a][t].attributes[i].values).length,o=0;o<g;++o)b[u++]=w[o];if(f){var S=0;for(a=0;a<l;++a)S+=e[a][t].indices.length;var N=c.computeNumberOfVertices(new c({attributes:x,primitiveType:P.POINTS})),O=h.createTypedArray(N,S),E=0,I=0;for(a=0;a<l;++a){var L=e[a][t].indices,z=L.length;for(u=0;u<z;++u)O[E++]=I+L[u];I+=c.computeNumberOfVertices(e[a][t])}T=O}var D,q=new n,R=0;for(a=0;a<l;++a){if(D=e[a][t].boundingSphere,!p(D)){q=void 0;break}n.add(D.center,q,q)}if(p(q))for(n.divideByScalar(q,l,q),a=0;a<l;++a){D=e[a][t].boundingSphere;var G=n.magnitude(n.subtract(D.center,q,F))+D.radius;G>R&&(R=G)}return new c({attributes:x,indices:T,primitiveType:d,boundingSphere:p(q)?new r(q,R):void 0})}S.combineInstances=function(e){if(!p(e)||e.length<1)throw new v("instances is required and must have length greater than zero.");for(var t=[],r=[],i=e.length,n=0;n<i;++n){var a=e[n];p(a.geometry)?t.push(a):p(a.westHemisphereGeometry)&&p(a.eastHemisphereGeometry)&&r.push(a)}var o=[];return t.length>0&&o.push(k(t,"geometry")),r.length>0&&(o.push(k(r,"westHemisphereGeometry")),o.push(k(r,"eastHemisphereGeometry"))),o};var B=new n,V=new n,M=new n,_=new n;S.computeNormal=function(e){if(!p(e))throw new v("geometry is required.");if(!p(e.attributes.position)||!p(e.attributes.position.values))throw new v("geometry.attributes.position.values is required.");if(!p(e.indices))throw new v("geometry.indices is required.");if(e.indices.length<2||e.indices.length%3!=0)throw new v("geometry.indices length must be greater than 0 and be a multiple of 3.");if(e.primitiveType!==P.TRIANGLES)throw new v("geometry.primitiveType must be PrimitiveType.TRIANGLES.");var t,r=e.indices,i=e.attributes,a=i.position.values,o=i.position.values.length/3,u=r.length,l=new Array(o),y=new Array(u/3),c=new Array(u);for(t=0;t<o;t++)l[t]={indexOffset:0,count:0,currentCount:0};var f=0;for(t=0;t<u;t+=3){var h=r[t],d=r[t+1],b=r[t+2],g=3*h,A=3*d,T=3*b;V.x=a[g],V.y=a[g+1],V.z=a[g+2],M.x=a[A],M.y=a[A+1],M.z=a[A+2],_.x=a[T],_.y=a[T+1],_.z=a[T+2],l[h].count++,l[d].count++,l[b].count++,n.subtract(M,V,M),n.subtract(_,V,_),y[f]=n.cross(M,_,new n),f++}var x,S=0;for(t=0;t<o;t++)l[t].indexOffset+=S,S+=l[t].count;for(f=0,t=0;t<u;t+=3){var N=(x=l[r[t]]).indexOffset+x.currentCount;c[N]=f,x.currentCount++,c[N=(x=l[r[t+1]]).indexOffset+x.currentCount]=f,x.currentCount++,c[N=(x=l[r[t+2]]).indexOffset+x.currentCount]=f,x.currentCount++,f++}var O=new Float32Array(3*o);for(t=0;t<o;t++){var E=3*t;if(x=l[t],n.clone(n.ZERO,B),x.count>0){for(f=0;f<x.count;f++)n.add(B,y[c[x.indexOffset+f]],B);n.equalsEpsilon(n.ZERO,B,w.EPSILON10)&&n.clone(y[c[x.indexOffset]],B)}n.equalsEpsilon(n.ZERO,B,w.EPSILON10)&&(B.z=1),n.normalize(B,B),O[E]=B.x,O[E+1]=B.y,O[E+2]=B.z}return e.attributes.normal=new m({componentDatatype:s.FLOAT,componentsPerAttribute:3,values:O}),e};var U=new n,H=new n,Y=new n;S.computeTangentAndBitangent=function(e){if(!p(e))throw new v("geometry is required.");var t=e.attributes,r=e.indices;if(!p(t.position)||!p(t.position.values))throw new v("geometry.attributes.position.values is required.");if(!p(t.normal)||!p(t.normal.values))throw new v("geometry.attributes.normal.values is required.");if(!p(t.st)||!p(t.st.values))throw new v("geometry.attributes.st.values is required.");if(!p(r))throw new v("geometry.indices is required.");if(r.length<2||r.length%3!=0)throw new v("geometry.indices length must be greater than 0 and be a multiple of 3.");if(e.primitiveType!==P.TRIANGLES)throw new v("geometry.primitiveType must be PrimitiveType.TRIANGLES.");var i,a,o,u,l=e.attributes.position.values,y=e.attributes.normal.values,c=e.attributes.st.values,f=e.attributes.position.values.length/3,h=r.length,d=new Array(3*f);for(i=0;i<d.length;i++)d[i]=0;for(i=0;i<h;i+=3){var b=r[i],w=r[i+1],g=r[i+2];o=3*w,u=3*g;var A=2*b,T=2*w,x=2*g,S=l[a=3*b],N=l[a+1],O=l[a+2],E=c[A],I=c[A+1],L=c[T+1]-I,z=c[x+1]-I,D=1/((c[T]-E)*z-(c[x]-E)*L),q=(z*(l[o]-S)-L*(l[u]-S))*D,R=(z*(l[o+1]-N)-L*(l[u+1]-N))*D,G=(z*(l[o+2]-O)-L*(l[u+2]-O))*D;d[a]+=q,d[a+1]+=R,d[a+2]+=G,d[o]+=q,d[o+1]+=R,d[o+2]+=G,d[u]+=q,d[u+1]+=R,d[u+2]+=G}var C=new Float32Array(3*f),F=new Float32Array(3*f);for(i=0;i<f;i++){o=(a=3*i)+1,u=a+2;var k=n.fromArray(y,a,U),B=n.fromArray(d,a,Y),V=n.dot(k,B);n.multiplyByScalar(k,V,H),n.normalize(n.subtract(B,H,B),B),C[a]=B.x,C[o]=B.y,C[u]=B.z,n.normalize(n.cross(k,B,B),B),F[a]=B.x,F[o]=B.y,F[u]=B.z}return e.attributes.tangent=new m({componentDatatype:s.FLOAT,componentsPerAttribute:3,values:C}),e.attributes.bitangent=new m({componentDatatype:s.FLOAT,componentsPerAttribute:3,values:F}),e};var Z=new i,W=new n,j=new n,X=new n,K=new i;function J(e){switch(e.primitiveType){case P.TRIANGLE_FAN:return function(e){var t=c.computeNumberOfVertices(e);if(t<3)throw new v("The number of vertices must be at least three.");var r=h.createTypedArray(t,3*(t-2));r[0]=1,r[1]=0,r[2]=2;for(var i=3,n=3;n<t;++n)r[i++]=n-1,r[i++]=0,r[i++]=n;return e.indices=r,e.primitiveType=P.TRIANGLES,e}(e);case P.TRIANGLE_STRIP:return function(e){var t=c.computeNumberOfVertices(e);if(t<3)throw new v("The number of vertices must be at least 3.");var r=h.createTypedArray(t,3*(t-2));r[0]=0,r[1]=1,r[2]=2,t>3&&(r[3]=0,r[4]=2,r[5]=3);for(var i=6,n=3;n<t-1;n+=2)r[i++]=n,r[i++]=n-1,r[i++]=n+1,n+2<t&&(r[i++]=n,r[i++]=n+1,r[i++]=n+2);return e.indices=r,e.primitiveType=P.TRIANGLES,e}(e);case P.TRIANGLES:return function(e){if(p(e.indices))return e;var t=c.computeNumberOfVertices(e);if(t<3)throw new v("The number of vertices must be at least three.");if(t%3!=0)throw new v("The number of vertices must be a multiple of three.");for(var r=h.createTypedArray(t,t),i=0;i<t;++i)r[i]=i;return e.indices=r,e}(e);case P.LINE_STRIP:return function(e){var t=c.computeNumberOfVertices(e);if(t<2)throw new v("The number of vertices must be at least two.");var r=h.createTypedArray(t,2*(t-1));r[0]=0,r[1]=1;for(var i=2,n=2;n<t;++n)r[i++]=n-1,r[i++]=n;return e.indices=r,e.primitiveType=P.LINES,e}(e);case P.LINE_LOOP:return function(e){var t=c.computeNumberOfVertices(e);if(t<2)throw new v("The number of vertices must be at least two.");var r=h.createTypedArray(t,2*t);r[0]=0,r[1]=1;for(var i=2,n=2;n<t;++n)r[i++]=n-1,r[i++]=n;return r[i++]=t-1,r[i]=0,e.indices=r,e.primitiveType=P.LINES,e}(e);case P.LINES:return function(e){if(p(e.indices))return e;var t=c.computeNumberOfVertices(e);if(t<2)throw new v("The number of vertices must be at least two.");if(t%2!=0)throw new v("The number of vertices must be a multiple of 2.");for(var r=h.createTypedArray(t,t),i=0;i<t;++i)r[i]=i;return e.indices=r,e}(e)}return e}function Q(e,t){Math.abs(e.y)<w.EPSILON6&&(e.y=t?-w.EPSILON6:w.EPSILON6)}S.compressVertices=function(t){if(!p(t))throw new v("geometry is required.");var r,a,o=t.attributes.extrudeDirection;if(p(o)){var u=o.values;a=u.length/3;var l=new Float32Array(2*a),y=0;for(r=0;r<a;++r)n.fromArray(u,3*r,W),n.equals(W,n.ZERO)?y+=2:(K=e.octEncodeInRange(W,65535,K),l[y++]=K.x,l[y++]=K.y);return t.attributes.compressedAttributes=new m({componentDatatype:s.FLOAT,componentsPerAttribute:2,values:l}),delete t.attributes.extrudeDirection,t}var c=t.attributes.normal,f=t.attributes.st,h=p(c),d=p(f);if(!h&&!d)return t;var b,w,g,A,T=t.attributes.tangent,P=t.attributes.bitangent,x=p(T),S=p(P);h&&(b=c.values),d&&(w=f.values),x&&(g=T.values),S&&(A=P.values);var N=a=(h?b.length:w.length)/(h?3:2),O=d&&h?2:1;O+=x||S?1:0;var E=new Float32Array(N*=O),I=0;for(r=0;r<a;++r){d&&(i.fromArray(w,2*r,Z),E[I++]=e.compressTextureCoordinates(Z));var L=3*r;h&&p(g)&&p(A)?(n.fromArray(b,L,W),n.fromArray(g,L,j),n.fromArray(A,L,X),e.octPack(W,j,X,Z),E[I++]=Z.x,E[I++]=Z.y):(h&&(n.fromArray(b,L,W),E[I++]=e.octEncodeFloat(W)),x&&(n.fromArray(g,L,W),E[I++]=e.octEncodeFloat(W)),S&&(n.fromArray(A,L,W),E[I++]=e.octEncodeFloat(W)))}return t.attributes.compressedAttributes=new m({componentDatatype:s.FLOAT,componentsPerAttribute:O,values:E}),h&&delete t.attributes.normal,d&&delete t.attributes.st,S&&delete t.attributes.bitangent,x&&delete t.attributes.tangent,t};var $=new n;function ee(e,t,r,i){n.add(e,n.multiplyByScalar(n.subtract(t,e,$),e.y/(e.y-t.y),$),r),n.clone(r,i),Q(r,!0),Q(i,!1)}var te=new n,re=new n,ie=new n,ne=new n,ae={positions:new Array(7),indices:new Array(9)};function oe(e,t,r){if(!(e.x>=0||t.x>=0||r.x>=0)){!function(e,t,r){if(0!==e.y&&0!==t.y&&0!==r.y)return Q(e,e.y<0),Q(t,t.y<0),void Q(r,r.y<0);var i=Math.abs(e.y),n=Math.abs(t.y),a=Math.abs(r.y),o=(i>n?i>a?w.sign(e.y):w.sign(r.y):n>a?w.sign(t.y):w.sign(r.y))<0;Q(e,o),Q(t,o),Q(r,o)}(e,t,r);var i=e.y<0,n=t.y<0,a=r.y<0,o=0;o+=i?1:0,o+=n?1:0,o+=a?1:0;var s=ae.indices;1===o?(s[1]=3,s[2]=4,s[5]=6,s[7]=6,s[8]=5,i?(ee(e,t,te,ie),ee(e,r,re,ne),s[0]=0,s[3]=1,s[4]=2,s[6]=1):n?(ee(t,r,te,ie),ee(t,e,re,ne),s[0]=1,s[3]=2,s[4]=0,s[6]=2):a&&(ee(r,e,te,ie),ee(r,t,re,ne),s[0]=2,s[3]=0,s[4]=1,s[6]=0)):2===o&&(s[2]=4,s[4]=4,s[5]=3,s[7]=5,s[8]=6,i?n?a||(ee(r,e,te,ie),ee(r,t,re,ne),s[0]=0,s[1]=1,s[3]=0,s[6]=2):(ee(t,r,te,ie),ee(t,e,re,ne),s[0]=2,s[1]=0,s[3]=2,s[6]=1):(ee(e,t,te,ie),ee(e,r,re,ne),s[0]=1,s[1]=2,s[3]=1,s[6]=0));var u=ae.positions;return u[0]=e,u[1]=t,u[2]=r,u.length=3,1!==o&&2!==o||(u[3]=te,u[4]=re,u[5]=ie,u[6]=ne,u.length=7),ae}}function se(e,t){var i=e.attributes;if(0!==i.position.values.length){for(var n in i)if(i.hasOwnProperty(n)&&p(i[n])&&p(i[n].values)){var a=i[n];a.values=s.createTypedArray(a.componentDatatype,a.values)}var o=c.computeNumberOfVertices(e);return e.indices=h.createTypedArray(o,e.indices),t&&(e.boundingSphere=r.fromVertices(i.position.values)),e}}function ue(e){var t=e.attributes,r={};for(var i in t)if(t.hasOwnProperty(i)&&p(t[i])&&p(t[i].values)){var n=t[i];r[i]=new m({componentDatatype:n.componentDatatype,componentsPerAttribute:n.componentsPerAttribute,normalize:n.normalize,values:[]})}return new c({attributes:r,indices:[],primitiveType:e.primitiveType})}function pe(e,t,r){var i=p(e.geometry.boundingSphere);t=se(t,i),r=se(r,i),p(r)&&!p(t)?e.geometry=r:!p(r)&&p(t)?e.geometry=t:(e.westHemisphereGeometry=t,e.eastHemisphereGeometry=r,e.geometry=void 0)}function ve(e,t){var r=new e,i=new e,n=new e;return function(a,o,s,u,p,v,l,y){var c=e.fromArray(p,a*t,r),m=e.fromArray(p,o*t,i),f=e.fromArray(p,s*t,n);e.multiplyByScalar(c,u.x,c),e.multiplyByScalar(m,u.y,m),e.multiplyByScalar(f,u.z,f);var h=e.add(c,m,c);e.add(h,f,h),y&&e.normalize(h,h),e.pack(h,v,l*t)}}var le=ve(a,4),ye=ve(n,3),ce=ve(i,2),me=function(e,t,r,i,n,a,o){var s=n[e]*i.x,u=n[t]*i.y,p=n[r]*i.z;a[o]=s+u+p>w.EPSILON6?1:0},fe=new n,he=new n,de=new n,be=new n;function we(e,r,i,a,o,s,u,v,l,y,c,m,f,h,d,b){if(p(s)||p(u)||p(v)||p(l)||p(y)||0!==h){var w=n.fromArray(o,3*e,fe),g=n.fromArray(o,3*r,he),A=n.fromArray(o,3*i,de),T=t(a,w,g,A,be);if(p(s)&&ye(e,r,i,T,s,m.normal.values,b,!0),p(y)){var P,x=n.fromArray(y,3*e,fe),S=n.fromArray(y,3*r,he),N=n.fromArray(y,3*i,de);n.multiplyByScalar(x,T.x,x),n.multiplyByScalar(S,T.y,S),n.multiplyByScalar(N,T.z,N),n.equals(x,n.ZERO)&&n.equals(S,n.ZERO)&&n.equals(N,n.ZERO)?((P=fe).x=0,P.y=0,P.z=0):(P=n.add(x,S,x),n.add(P,N,P),n.normalize(P,P)),n.pack(P,m.extrudeDirection.values,3*b)}if(p(c)&&me(e,r,i,T,c,m.applyOffset.values,b),p(u)&&ye(e,r,i,T,u,m.tangent.values,b,!0),p(v)&&ye(e,r,i,T,v,m.bitangent.values,b,!0),p(l)&&ce(e,r,i,T,l,m.st.values,b),h>0)for(var O=0;O<h;O++){var E=f[O];ge(e,r,i,T,b,d[E],m[E])}}}function ge(e,t,r,i,n,a,o){var s=a.componentsPerAttribute,u=a.values,p=o.values;switch(s){case 4:le(e,t,r,i,u,p,n,!1);break;case 3:ye(e,t,r,i,u,p,n,!1);break;case 2:ce(e,t,r,i,u,p,n,!1);break;default:p[n]=u[e]*i.x+u[t]*i.y+u[r]*i.z}}function Ae(e,t,r,i,n,a){var o=e.position.values.length/3;if(-1!==n){var s=i[n],u=r[s];return-1===u?(r[s]=o,e.position.values.push(a.x,a.y,a.z),t.push(o),o):(t.push(u),u)}return e.position.values.push(a.x,a.y,a.z),t.push(o),o}var Te={position:!0,normal:!0,bitangent:!0,tangent:!0,st:!0,extrudeDirection:!0,applyOffset:!0};function Pe(e){var t=e.geometry,r=t.attributes,i=r.position.values,a=p(r.normal)?r.normal.values:void 0,o=p(r.bitangent)?r.bitangent.values:void 0,s=p(r.tangent)?r.tangent.values:void 0,u=p(r.st)?r.st.values:void 0,v=p(r.extrudeDirection)?r.extrudeDirection.values:void 0,l=p(r.applyOffset)?r.applyOffset.values:void 0,y=t.indices,c=[];for(var m in r)r.hasOwnProperty(m)&&!Te[m]&&p(r[m])&&c.push(m);var f,h,d,b,w=c.length,g=ue(t),A=ue(t),T=[];T.length=i.length/3;var P=[];for(P.length=i.length/3,b=0;b<T.length;++b)T[b]=-1,P[b]=-1;var x=y.length;for(b=0;b<x;b+=3){var S=y[b],N=y[b+1],O=y[b+2],E=n.fromArray(i,3*S),I=n.fromArray(i,3*N),L=n.fromArray(i,3*O),z=oe(E,I,L);if(p(z)&&z.positions.length>3)for(var D=z.positions,q=z.indices,R=q.length,G=0;G<R;++G){var C=q[G],F=D[C];F.y<0?(f=A.attributes,h=A.indices,d=T):(f=g.attributes,h=g.indices,d=P),we(S,N,O,F,i,a,s,o,u,v,l,f,c,w,r,Ae(f,h,d,y,C<3?b+C:-1,F))}else p(z)&&(E=z.positions[0],I=z.positions[1],L=z.positions[2]),E.y<0?(f=A.attributes,h=A.indices,d=T):(f=g.attributes,h=g.indices,d=P),we(S,N,O,E,i,a,s,o,u,v,l,f,c,w,r,Ae(f,h,d,y,b,E)),we(S,N,O,I,i,a,s,o,u,v,l,f,c,w,r,Ae(f,h,d,y,b+1,I)),we(S,N,O,L,i,a,s,o,u,v,l,f,c,w,r,Ae(f,h,d,y,b+2,L))}pe(e,A,g)}var xe=T.fromPointNormal(n.ZERO,n.UNIT_Y),Se=new n,Ne=new n;function Oe(e,t,r,i,a,o,s){if(p(s)){var u=n.fromArray(i,3*e,fe);n.equalsEpsilon(u,r,w.EPSILON10)?o.applyOffset.values[a]=s[e]:o.applyOffset.values[a]=s[t]}}function Ee(e){var t,r=e.geometry,i=r.attributes,a=i.position.values,o=p(i.applyOffset)?i.applyOffset.values:void 0,s=r.indices,u=ue(r),v=ue(r),l=s.length,y=[];y.length=a.length/3;var c=[];for(c.length=a.length/3,t=0;t<y.length;++t)y[t]=-1,c[t]=-1;for(t=0;t<l;t+=2){var m=s[t],f=s[t+1],h=n.fromArray(a,3*m,fe),d=n.fromArray(a,3*f,he);Math.abs(h.y)<w.EPSILON6&&(h.y<0?h.y=-w.EPSILON6:h.y=w.EPSILON6),Math.abs(d.y)<w.EPSILON6&&(d.y<0?d.y=-w.EPSILON6:d.y=w.EPSILON6);var g=u.attributes,A=u.indices,T=c,P=v.attributes,x=v.indices,S=y,N=b.lineSegmentPlane(h,d,xe,de);if(p(N)){var O=n.multiplyByScalar(n.UNIT_Y,5*w.EPSILON9,Se);h.y<0&&(n.negate(O,O),g=v.attributes,A=v.indices,T=y,P=u.attributes,x=u.indices,S=c);var E=n.add(N,O,Ne);Oe(m,f,h,a,Ae(g,A,T,s,t,h),g,o),Oe(m,f,E,a,Ae(g,A,T,s,-1,E),g,o),n.negate(O,O),n.add(N,O,E),Oe(m,f,E,a,Ae(P,x,S,s,-1,E),P,o),Oe(m,f,d,a,Ae(P,x,S,s,t+1,d),P,o)}else{var I,L,z;h.y<0?(I=v.attributes,L=v.indices,z=y):(I=u.attributes,L=u.indices,z=c),Oe(m,f,h,a,Ae(I,L,z,s,t,h),I,o),Oe(m,f,d,a,Ae(I,L,z,s,t+1,d),I,o)}}pe(e,v,u)}var Ie=new i,Le=new i,ze=new n,De=new n,qe=new n,Re=new n,Ge=new n,Ce=new n,Fe=new a;function ke(e){for(var t=e.attributes,r=t.position.values,i=t.prevPosition.values,a=t.nextPosition.values,o=r.length,s=0;s<o;s+=3){var u=n.unpack(r,s,ze);if(!(u.x>0)){var p=n.unpack(i,s,De);(u.y<0&&p.y>0||u.y>0&&p.y<0)&&(s-3>0?(i[s]=r[s-3],i[s+1]=r[s-2],i[s+2]=r[s-1]):n.pack(u,i,s));var v=n.unpack(a,s,qe);(u.y<0&&v.y>0||u.y>0&&v.y<0)&&(s+3<o?(a[s]=r[s+3],a[s+1]=r[s+4],a[s+2]=r[s+5]):n.pack(u,a,s))}}}var Be=5*w.EPSILON9,Ve=w.EPSILON6;return S.splitLongitude=function(e){if(!p(e))throw new v("instance is required.");var t=e.geometry,o=t.boundingSphere;if(p(o)&&(o.center.x-o.radius>0||r.intersectPlane(o,T.ORIGIN_ZX_PLANE)!==d.INTERSECTING))return e;if(t.geometryType!==f.NONE)switch(t.geometryType){case f.POLYLINES:!function(e){var t,r,o,s=e.geometry,u=s.attributes,v=u.position.values,l=u.prevPosition.values,y=u.nextPosition.values,c=u.expandAndWidth.values,m=p(u.st)?u.st.values:void 0,f=p(u.color)?u.color.values:void 0,h=ue(s),d=ue(s),g=!1,A=v.length/3;for(t=0;t<A;t+=4){var T=t,P=t+2,x=n.fromArray(v,3*T,ze),S=n.fromArray(v,3*P,De);if(Math.abs(x.y)<Ve)for(x.y=Ve*(S.y<0?-1:1),v[3*t+1]=x.y,v[3*(t+1)+1]=x.y,r=3*T;r<3*T+12;r+=3)l[r]=v[3*t],l[r+1]=v[3*t+1],l[r+2]=v[3*t+2];if(Math.abs(S.y)<Ve)for(S.y=Ve*(x.y<0?-1:1),v[3*(t+2)+1]=S.y,v[3*(t+3)+1]=S.y,r=3*T;r<3*T+12;r+=3)y[r]=v[3*(t+2)],y[r+1]=v[3*(t+2)+1],y[r+2]=v[3*(t+2)+2];var N=h.attributes,O=h.indices,E=d.attributes,I=d.indices,L=b.lineSegmentPlane(x,S,xe,Re);if(p(L)){g=!0;var z=n.multiplyByScalar(n.UNIT_Y,Be,Ge);x.y<0&&(n.negate(z,z),N=d.attributes,O=d.indices,E=h.attributes,I=h.indices);var D=n.add(L,z,Ce);N.position.values.push(x.x,x.y,x.z,x.x,x.y,x.z),N.position.values.push(D.x,D.y,D.z),N.position.values.push(D.x,D.y,D.z),N.prevPosition.values.push(l[3*T],l[3*T+1],l[3*T+2]),N.prevPosition.values.push(l[3*T+3],l[3*T+4],l[3*T+5]),N.prevPosition.values.push(x.x,x.y,x.z,x.x,x.y,x.z),N.nextPosition.values.push(D.x,D.y,D.z),N.nextPosition.values.push(D.x,D.y,D.z),N.nextPosition.values.push(D.x,D.y,D.z),N.nextPosition.values.push(D.x,D.y,D.z),n.negate(z,z),n.add(L,z,D),E.position.values.push(D.x,D.y,D.z),E.position.values.push(D.x,D.y,D.z),E.position.values.push(S.x,S.y,S.z,S.x,S.y,S.z),E.prevPosition.values.push(D.x,D.y,D.z),E.prevPosition.values.push(D.x,D.y,D.z),E.prevPosition.values.push(D.x,D.y,D.z),E.prevPosition.values.push(D.x,D.y,D.z),E.nextPosition.values.push(S.x,S.y,S.z,S.x,S.y,S.z),E.nextPosition.values.push(y[3*P],y[3*P+1],y[3*P+2]),E.nextPosition.values.push(y[3*P+3],y[3*P+4],y[3*P+5]);var q=i.fromArray(c,2*T,Ie),R=Math.abs(q.y);N.expandAndWidth.values.push(-1,R,1,R),N.expandAndWidth.values.push(-1,-R,1,-R),E.expandAndWidth.values.push(-1,R,1,R),E.expandAndWidth.values.push(-1,-R,1,-R);var G=n.magnitudeSquared(n.subtract(L,x,qe));if(G/=n.magnitudeSquared(n.subtract(S,x,qe)),p(f)){var C=a.fromArray(f,4*T,Fe),F=a.fromArray(f,4*P,Fe),k=w.lerp(C.x,F.x,G),B=w.lerp(C.y,F.y,G),V=w.lerp(C.z,F.z,G),M=w.lerp(C.w,F.w,G);for(r=4*T;r<4*T+8;++r)N.color.values.push(f[r]);for(N.color.values.push(k,B,V,M),N.color.values.push(k,B,V,M),E.color.values.push(k,B,V,M),E.color.values.push(k,B,V,M),r=4*P;r<4*P+8;++r)E.color.values.push(f[r])}if(p(m)){var _=i.fromArray(m,2*T,Ie),U=i.fromArray(m,2*(t+3),Le),H=w.lerp(_.x,U.x,G);for(r=2*T;r<2*T+4;++r)N.st.values.push(m[r]);for(N.st.values.push(H,_.y),N.st.values.push(H,U.y),E.st.values.push(H,_.y),E.st.values.push(H,U.y),r=2*P;r<2*P+4;++r)E.st.values.push(m[r])}o=N.position.values.length/3-4,O.push(o,o+2,o+1),O.push(o+1,o+2,o+3),o=E.position.values.length/3-4,I.push(o,o+2,o+1),I.push(o+1,o+2,o+3)}else{var Y,Z;for(x.y<0?(Y=d.attributes,Z=d.indices):(Y=h.attributes,Z=h.indices),Y.position.values.push(x.x,x.y,x.z),Y.position.values.push(x.x,x.y,x.z),Y.position.values.push(S.x,S.y,S.z),Y.position.values.push(S.x,S.y,S.z),r=3*t;r<3*t+12;++r)Y.prevPosition.values.push(l[r]),Y.nextPosition.values.push(y[r]);for(r=2*t;r<2*t+8;++r)Y.expandAndWidth.values.push(c[r]),p(m)&&Y.st.values.push(m[r]);if(p(f))for(r=4*t;r<4*t+16;++r)Y.color.values.push(f[r]);o=Y.position.values.length/3-4,Z.push(o,o+2,o+1),Z.push(o+1,o+2,o+3)}}g&&(ke(d),ke(h)),pe(e,d,h)}(e);break;case f.TRIANGLES:Pe(e);break;case f.LINES:Ee(e)}else J(t),t.primitiveType===P.TRIANGLES?Pe(e):t.primitiveType===P.LINES&&Ee(e);return e},S});