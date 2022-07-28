define(["./arrayRemoveDuplicates","./BoundingSphere","./Cartesian3","./Check","./ComponentDatatype","./CoplanarPolygonGeometryLibrary","./defaultValue","./defined","./Geometry","./GeometryAttribute","./GeometryAttributes","./GeometryInstance","./GeometryPipeline","./IndexDatatype","./PolygonGeometryLibrary","./PolygonPipeline","./PrimitiveType"],function(e,n,r,t,i,o,a,y,p,c,s,l,u,g,d,h,m){"use strict";function f(e){for(var n=e.length,r=new Float64Array(3*n),t=g.createTypedArray(n,2*n),o=0,a=0,y=0;y<n;y++){var l=e[y];r[o++]=l.x,r[o++]=l.y,r[o++]=l.z,t[a++]=y,t[a++]=(y+1)%n}var u=new s({position:new c({componentDatatype:i.DOUBLE,componentsPerAttribute:3,values:r})});return new p({attributes:u,indices:t,primitiveType:m.LINES})}function v(e){var n=(e=a(e,a.EMPTY_OBJECT)).polygonHierarchy;t.defined("options.polygonHierarchy",n),this._polygonHierarchy=n,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=d.computeHierarchyPackedLength(n)+1}v.fromPositions=function(e){return e=a(e,a.EMPTY_OBJECT),t.defined("options.positions",e.positions),new v({polygonHierarchy:{positions:e.positions}})},v.pack=function(e,n,r){return t.typeOf.object("value",e),t.defined("array",n),r=a(r,0),n[r=d.packPolygonHierarchy(e._polygonHierarchy,n,r)]=e.packedLength,n};var P={polygonHierarchy:{}};return v.unpack=function(e,n,r){t.defined("array",e),n=a(n,0);var i=d.unpackPolygonHierarchy(e,n);n=i.startingIndex,delete i.startingIndex;var o=e[n];return y(r)||(r=new v(P)),r._polygonHierarchy=i,r.packedLength=o,r},v.createGeometry=function(t){var i=t._polygonHierarchy,a=i.positions;if(!((a=e(a,r.equalsEpsilon,!0)).length<3)&&o.validOutline(a)){var y=d.polygonOutlinesFromHierarchy(i,!1);if(0!==y.length){for(var c=[],s=0;s<y.length;s++){var g=new l({geometry:f(y[s])});c.push(g)}var h=u.combineInstances(c)[0],m=n.fromPoints(i.positions);return new p({attributes:h.attributes,indices:h.indices,primitiveType:h.primitiveType,boundingSphere:m})}}},v});