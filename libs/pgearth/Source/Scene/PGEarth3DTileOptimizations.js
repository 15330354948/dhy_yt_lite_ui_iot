define(["../Core/Cartesian3","../Core/Check","./PGEarth3DTileOptimizationHint","./TileBoundingRegion","./TileOrientedBoundingBox"],function(a,e,t,n,i){"use strict";var h={},s=new a;return h.checkChildrenWithinParent=function(h){e.typeOf.object("tile",h);var r=h.children,l=r.length,f=h.boundingVolume;if(f instanceof i||f instanceof n){var o=f._orientedBoundingBox;h._optimChildrenWithinParent=t.USE_OPTIMIZATION;for(var x=0;x<l;++x){var b=r[x].boundingVolume;if(!(b instanceof i||b instanceof n)){h._optimChildrenWithinParent=t.SKIP_OPTIMIZATION;break}var A=b._orientedBoundingBox,M=a.subtract(A.center,o.center,s),d=a.magnitude(M);if(a.divideByScalar(M,d,M),Math.abs(o.halfAxes[0]*M.x)+Math.abs(o.halfAxes[1]*M.y)+Math.abs(o.halfAxes[2]*M.z)+Math.abs(o.halfAxes[3]*M.x)+Math.abs(o.halfAxes[4]*M.y)+Math.abs(o.halfAxes[5]*M.z)+Math.abs(o.halfAxes[6]*M.x)+Math.abs(o.halfAxes[7]*M.y)+Math.abs(o.halfAxes[8]*M.z)<=Math.abs(A.halfAxes[0]*M.x)+Math.abs(A.halfAxes[1]*M.y)+Math.abs(A.halfAxes[2]*M.z)+Math.abs(A.halfAxes[3]*M.x)+Math.abs(A.halfAxes[4]*M.y)+Math.abs(A.halfAxes[5]*M.z)+Math.abs(A.halfAxes[6]*M.x)+Math.abs(A.halfAxes[7]*M.y)+Math.abs(A.halfAxes[8]*M.z)+d){h._optimChildrenWithinParent=t.SKIP_OPTIMIZATION;break}}}return h._optimChildrenWithinParent===t.USE_OPTIMIZATION},h});