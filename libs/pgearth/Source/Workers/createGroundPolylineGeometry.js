define(["../Core/ApproximateTerrainHeights","../Core/defined","../Core/GroundPolylineGeometry"],function(e,n,r){"use strict";return function(t,i){return e.initialize().then(function(){return n(i)&&(t=r.unpack(t,i)),r.createGeometry(t)})}});