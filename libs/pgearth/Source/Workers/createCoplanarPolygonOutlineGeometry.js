define(["../Core/defined","../Core/CoplanarPolygonOutlineGeometry","../Core/Ellipsoid"],function(e,o,n){"use strict";return function(i,r){return e(r)&&(i=o.unpack(i,r)),i._ellipsoid=n.clone(i._ellipsoid),o.createGeometry(i)}});