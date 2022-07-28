define(["../Core/BoundingSphere","../Core/Cartesian3","../Core/Check","../Core/ColorGeometryInstanceAttribute","../Core/defineProperties","../Core/GeometryInstance","../Core/Matrix4","../Core/SphereOutlineGeometry","./PerInstanceColorAppearance","./Primitive"],function(e,n,t,r,o,i,u,a,s,c){"use strict";function d(n,t){this._boundingSphere=new e(n,t)}return o(d.prototype,{center:{get:function(){return this._boundingSphere.center}},radius:{get:function(){return this._boundingSphere.radius}},boundingVolume:{get:function(){return this._boundingSphere}},boundingSphere:{get:function(){return this._boundingSphere}}}),d.prototype.distanceToCamera=function(e){t.defined("frameState",e);var r=this._boundingSphere;return Math.max(0,n.distance(r.center,e.camera.positionWC)-r.radius)},d.prototype.intersectPlane=function(n){return t.defined("plane",n),e.intersectPlane(this._boundingSphere,n)},d.prototype.update=function(e,t){n.clone(e,this._boundingSphere.center),this._boundingSphere.radius=t},d.prototype.createDebugVolume=function(e){t.defined("color",e);var n=new a({radius:this.radius}),o=u.fromTranslation(this.center,new u.clone(u.IDENTITY)),d=new i({geometry:n,id:"outline",modelMatrix:o,attributes:{color:r.fromColor(e)}});return new c({geometryInstances:d,appearance:new s({translucent:!1,flat:!0}),asynchronous:!1})},d});