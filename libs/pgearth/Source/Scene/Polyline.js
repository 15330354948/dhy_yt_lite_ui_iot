define(["../Core/arrayRemoveDuplicates","../Core/BoundingSphere","../Core/Cartesian3","../Core/Color","../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/DeveloperError","../Core/DistanceDisplayCondition","../Core/Matrix4","../Core/PolylinePipeline","./Material"],function(i,t,s,o,e,n,h,l,a,r,_,u){"use strict";function d(h,l){h=e(h,e.EMPTY_OBJECT),this._show=e(h.show,!0),this._width=e(h.width,1),this._loop=e(h.loop,!1),this._distanceDisplayCondition=h.distanceDisplayCondition,this._material=h.material,n(this._material)||(this._material=u.fromType(u.ColorType,{color:new o(1,1,1,1)}));var a,d=h.positions;n(d)||(d=[]),this._positions=d,this._actualPositions=i(d,s.equalsEpsilon),this._loop&&this._actualPositions.length>2&&(this._actualPositions===this._positions&&(this._actualPositions=d.slice()),this._actualPositions.push(s.clone(this._actualPositions[0]))),this._length=this._actualPositions.length,this._id=h.id,n(l)&&(a=r.clone(l.modelMatrix)),this._modelMatrix=a,this._segments=_.wrapLongitude(this._actualPositions,a),this._actualLength=void 0,this._propertiesChanged=new Uint32Array(I),this._polylineCollection=l,this._dirty=!1,this._pickId=void 0,this._boundingVolume=t.fromPoints(this._actualPositions),this._boundingVolumeWC=t.transform(this._boundingVolume,this._modelMatrix),this._boundingVolume2D=new t}var c=d.POSITION_INDEX=0,p=d.SHOW_INDEX=1,g=d.WIDTH_INDEX=2,m=d.MATERIAL_INDEX=3,f=d.POSITION_SIZE_INDEX=4,C=d.DISTANCE_DISPLAY_CONDITION=5,I=d.NUMBER_OF_PROPERTIES=6;function y(i,t){++i._propertiesChanged[t];var s=i._polylineCollection;n(s)&&(s._updatePolyline(i,t),i._dirty=!0)}return h(d.prototype,{show:{get:function(){return this._show},set:function(i){if(!n(i))throw new l("value is required.");i!==this._show&&(this._show=i,y(this,p))}},positions:{get:function(){return this._positions},set:function(o){if(!n(o))throw new l("value is required.");var e=i(o,s.equalsEpsilon);this._loop&&e.length>2&&(e===o&&(e=o.slice()),e.push(s.clone(e[0]))),this._actualPositions.length===e.length&&this._actualPositions.length===this._length||y(this,f),this._positions=o,this._actualPositions=e,this._length=e.length,this._boundingVolume=t.fromPoints(this._actualPositions,this._boundingVolume),this._boundingVolumeWC=t.transform(this._boundingVolume,this._modelMatrix,this._boundingVolumeWC),y(this,c),this.update()}},material:{get:function(){return this._material},set:function(i){if(!n(i))throw new l("material is required.");this._material!==i&&(this._material=i,y(this,m))}},width:{get:function(){return this._width},set:function(i){if(!n(i))throw new l("value is required.");i!==this._width&&(this._width=i,y(this,g))}},loop:{get:function(){return this._loop},set:function(i){if(!n(i))throw new l("value is required.");if(i!==this._loop){var t=this._actualPositions;i?t.length>2&&!s.equals(t[0],t[t.length-1])&&(t.length===this._positions.length&&(this._actualPositions=t=this._positions.slice()),t.push(s.clone(t[0]))):t.length>2&&s.equals(t[0],t[t.length-1])&&(t.length-1===this._positions.length?this._actualPositions=this._positions:t.pop()),this._loop=i,y(this,f)}}},id:{get:function(){return this._id},set:function(i){this._id=i,n(this._pickId)&&(this._pickId.object.id=i)}},pickId:{get:function(){return this._pickId}},distanceDisplayCondition:{get:function(){return this._distanceDisplayCondition},set:function(i){if(n(i)&&i.far<=i.near)throw new l("far distance must be greater than near distance.");a.equals(i,this._distanceDisplayCondition)||(this._distanceDisplayCondition=a.clone(i,this._distanceDisplayCondition),y(this,C))}}}),d.prototype.update=function(){var i=r.IDENTITY;n(this._polylineCollection)&&(i=this._polylineCollection.modelMatrix);var s=this._segments.positions.length,o=this._segments.lengths,e=this._propertiesChanged[c]>0||this._propertiesChanged[f]>0;if(r.equals(i,this._modelMatrix)&&!e||(this._segments=_.wrapLongitude(this._actualPositions,i),this._boundingVolumeWC=t.transform(this._boundingVolume,i,this._boundingVolumeWC)),this._modelMatrix=r.clone(i,this._modelMatrix),this._segments.positions.length!==s)y(this,f);else for(var h=o.length,l=0;l<h;++l)if(o[l]!==this._segments.lengths[l]){y(this,f);break}},d.prototype.getPickId=function(i){return n(this._pickId)||(this._pickId=i.createPickId({primitive:this,collection:this._polylineCollection,id:this._id})),this._pickId},d.prototype._clean=function(){this._dirty=!1;for(var i=this._propertiesChanged,t=0;t<I-1;++t)i[t]=0},d.prototype._destroy=function(){this._pickId=this._pickId&&this._pickId.destroy(),this._material=this._material&&this._material.destroy(),this._polylineCollection=void 0},d});