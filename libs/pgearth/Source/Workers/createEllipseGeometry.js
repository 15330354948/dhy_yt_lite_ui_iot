define(["../Core/Cartesian3","../Core/defined","../Core/EllipseGeometry","../Core/Ellipsoid"],function(e,r,n,i){"use strict";return function(o,t){return r(t)&&(o=n.unpack(o,t)),o._center=e.clone(o._center),o._ellipsoid=i.clone(o._ellipsoid),n.createGeometry(o)}});