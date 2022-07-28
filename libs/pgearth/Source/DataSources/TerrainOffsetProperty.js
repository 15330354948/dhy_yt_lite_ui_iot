define(["../Core/Cartesian3","../Core/Cartographic","../Core/Check","../Core/defined","../Core/defineProperties","../Core/destroyObject","../Core/Event","../Core/Iso8601","../Core/Math","../Scene/HeightReference","../Scene/SceneMode","./Property"],function(e,t,i,r,n,o,s,a,h,l,_,c){"use strict";var p=new e,u=new t;function d(n,o,h,l){i.defined("scene",n),i.defined("positionProperty",o),this._scene=n,this._heightReference=h,this._extrudedHeightReference=l,this._positionProperty=o,this._position=new e,this._cartographicPosition=new t,this._normal=new e,this._definitionChanged=new s,this._terrainHeight=0,this._removeCallbackFunc=void 0,this._removeEventListener=void 0,this._removeModeListener=void 0;var _=this;if(r(n.globe)&&(this._removeEventListener=n.terrainProviderChanged.addEventListener(function(){_._updateClamping()}),this._removeModeListener=n.morphComplete.addEventListener(function(){_._updateClamping()})),o.isConstant){var c=o.getValue(a.MINIMUM_VALUE,p);if(!r(c)||e.equals(c,e.ZERO)||!r(n.globe))return;this._position=e.clone(c,this._position),this._updateClamping(),this._normal=n.globe.ellipsoid.geodeticSurfaceNormal(c,this._normal)}}return n(d.prototype,{isConstant:{get:function(){return!1}},definitionChanged:{get:function(){return this._definitionChanged}}}),d.prototype._updateClamping=function(){r(this._removeCallbackFunc)&&this._removeCallbackFunc();var t=this._scene,i=t.globe,n=this._position;if(r(i)&&!e.equals(n,e.ZERO)){var o=i.ellipsoid,s=i._surface,a=this,h=o.cartesianToCartographic(n,this._cartographicPosition),l=i.getHeight(h);r(l)?this._terrainHeight=l:this._terrainHeight=0,this._removeCallbackFunc=s.updateHeight(h,function(e){if(t.mode===_.SCENE3D){var i=o.cartesianToCartographic(e,u);a._terrainHeight=i.height}else a._terrainHeight=e.x;a.definitionChanged.raiseEvent()})}else this._terrainHeight=0},d.prototype.getValue=function(t,i){var n=c.getValueOrDefault(this._heightReference,t,l.NONE),o=c.getValueOrDefault(this._extrudedHeightReference,t,l.NONE);if(n===l.NONE&&o!==l.RELATIVE_TO_GROUND)return this._position=e.clone(e.ZERO,this._position),e.clone(e.ZERO,i);if(this._positionProperty.isConstant)return e.multiplyByScalar(this._normal,this._terrainHeight,i);var s=this._scene,a=this._positionProperty.getValue(t,p);if(!r(a)||e.equals(a,e.ZERO)||!r(s.globe))return e.clone(e.ZERO,i);if(e.equalsEpsilon(this._position,a,h.EPSILON10))return e.multiplyByScalar(this._normal,this._terrainHeight,i);this._position=e.clone(a,this._position),this._updateClamping();var _=s.globe.ellipsoid.geodeticSurfaceNormal(a,this._normal);return e.multiplyByScalar(_,this._terrainHeight,i)},d.prototype.isDestroyed=function(){return!1},d.prototype.destroy=function(){return r(this._removeEventListener)&&this._removeEventListener(),r(this._removeModeListener)&&this._removeModeListener(),r(this._removeCallbackFunc)&&this._removeCallbackFunc(),o(this)},d});