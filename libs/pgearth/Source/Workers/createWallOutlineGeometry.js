define(["../Core/defined","../Core/Ellipsoid","../Core/WallOutlineGeometry"],function(e,i,n){"use strict";return function(o,r){return e(r)&&(o=n.unpack(o,r)),o._ellipsoid=i.clone(o._ellipsoid),n.createGeometry(o)}});