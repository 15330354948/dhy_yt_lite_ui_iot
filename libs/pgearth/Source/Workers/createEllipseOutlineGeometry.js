define(["../Core/Cartesian3","../Core/defined","../Core/EllipseOutlineGeometry","../Core/Ellipsoid"],function(e,n,r,i){"use strict";return function(o,t){return n(t)&&(o=r.unpack(o,t)),o._center=e.clone(o._center),o._ellipsoid=i.clone(o._ellipsoid),r.createGeometry(o)}});