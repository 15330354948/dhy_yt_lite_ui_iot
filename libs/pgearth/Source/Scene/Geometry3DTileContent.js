define(["../Core/Cartesian3","../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/destroyObject","../Core/DeveloperError","../Core/Ellipsoid","../Core/FeatureDetection","../Core/getMagic","../Core/getStringFromTypedArray","../Core/Math","../Core/Matrix4","../Core/Rectangle","../Core/RuntimeError","../ThirdParty/when","./PGEarth3DTileBatchTable","./Vector3DTileGeometry"],function(e,t,r,i,n,s,o,a,f,h,u,y,_,g,l,c,b){"use strict";if(!a.supportsTypedArrays())return{};function d(i,n,s,o,a){this._tileset=i,this._tile=n,this._resource=s,this._geometries=void 0,this._contentReadyPromise=void 0,this._readyPromise=l.defer(),this._batchTable=void 0,this._features=void 0,this.featurePropertiesDirty=!1,function(i,n,s){s=t(s,0);var o=new Uint8Array(n),a=new DataView(n);s+=p;var f=a.getUint32(s,!0);if(1!==f)throw new g("Only Geometry tile version 1 is supported.  Version "+f+" is not.");s+=p;var u=a.getUint32(s,!0);if(s+=p,0===u)return void i._readyPromise.resolve(i);var _=a.getUint32(s,!0);if(s+=p,0===_)throw new g("Feature table must have a byte length greater than zero");var l=a.getUint32(s,!0);s+=p;var d=a.getUint32(s,!0);s+=p;var m=a.getUint32(s,!0),T=h(o,s+=p,_),E=JSON.parse(T);s+=_;var L,S,v=new Uint8Array(n,s,l);if(s+=l,d>0){var C=h(o,s,d);L=JSON.parse(C),s+=d,m>0&&(S=new Uint8Array(n,s,m),S=new Uint8Array(S))}var w=t(E.BOXES_LENGTH,0),I=t(E.CYLINDERS_LENGTH,0),O=t(E.ELLIPSOIDS_LENGTH,0),A=t(E.SPHERES_LENGTH,0),D=w+I+O+A,P=new c(i,D,L,S,function(e){return function(t,i){r(e._geometries)&&e._geometries.updateCommands(t,i)}}(i));if(i._batchTable=P,0===D)return;var B,H=i.tile.computedTransform;r(E.RTC_CENTER)&&(B=e.unpack(E.RTC_CENTER),y.multiplyByPoint(H,B,B));var R=function(e,i){var n,s,o,a,f,h=t(e.BOXES_LENGTH,0),u=t(e.CYLINDERS_LENGTH,0),y=t(e.ELLIPSOIDS_LENGTH,0),_=t(e.SPHERES_LENGTH,0);if(h>0&&r(e.BOX_BATCH_IDS)){var l=i.byteOffset+e.BOX_BATCH_IDS.byteOffset;n=new Uint16Array(i.buffer,l,h)}if(u>0&&r(e.CYLINDER_BATCH_IDS)){var c=i.byteOffset+e.CYLINDER_BATCH_IDS.byteOffset;s=new Uint16Array(i.buffer,c,u)}if(y>0&&r(e.ELLIPSOID_BATCH_IDS)){var b=i.byteOffset+e.ELLIPSOID_BATCH_IDS.byteOffset;o=new Uint16Array(i.buffer,b,y)}if(_>0&&r(e.SPHERE_BATCH_IDS)){var d=i.byteOffset+e.SPHERE_BATCH_IDS.byteOffset;a=new Uint16Array(i.buffer,d,_)}var p=r(n)||r(s)||r(o)||r(a),m=h>0&&!r(n)||u>0&&!r(s)||y>0&&!r(o)||_>0&&!r(a);if(p&&m)throw new g("If one group of batch ids is defined, then all batch ids must be defined.");if(!(r(n)||r(s)||r(o)||r(a))){var T=0;if(!r(n)&&h>0)for(n=new Uint16Array(h),f=0;f<h;++f)n[f]=T++;if(!r(s)&&u>0)for(s=new Uint16Array(u),f=0;f<u;++f)s[f]=T++;if(!r(o)&&y>0)for(o=new Uint16Array(y),f=0;f<y;++f)o[f]=T++;if(!r(a)&&_>0)for(a=new Uint16Array(_),f=0;f<_;++f)a[f]=T++}return{boxes:n,cylinders:s,ellipsoids:o,spheres:a}}(E,v);if(w>0||I>0||O>0||A>0){var U,N,G,F;if(w>0){var x=v.byteOffset+E.BOXES.byteOffset;U=new Float32Array(v.buffer,x,b.packedBoxLength*w)}if(I>0){var V=v.byteOffset+E.CYLINDERS.byteOffset;N=new Float32Array(v.buffer,V,b.packedCylinderLength*I)}if(O>0){var Y=v.byteOffset+E.ELLIPSOIDS.byteOffset;G=new Float32Array(v.buffer,Y,b.packedEllipsoidLength*O)}if(A>0){var k=v.byteOffset+E.SPHERES.byteOffset;F=new Float32Array(v.buffer,k,b.packedSphereLength*A)}i._geometries=new b({boxes:U,boxBatchIds:R.boxes,cylinders:N,cylinderBatchIds:R.cylinders,ellipsoids:G,ellipsoidBatchIds:R.ellipsoids,spheres:F,sphereBatchIds:R.spheres,center:B,modelMatrix:H,batchTable:P,boundingVolume:i.tile.boundingVolume.boundingVolume})}}(this,o,a)}i(d.prototype,{featuresLength:{get:function(){return r(this._batchTable)?this._batchTable.featuresLength:0}},pointsLength:{get:function(){return 0}},trianglesLength:{get:function(){return r(this._geometries)?this._geometries.trianglesLength:0}},geometryByteLength:{get:function(){return r(this._geometries)?this._geometries.geometryByteLength:0}},texturesByteLength:{get:function(){return 0}},batchTableByteLength:{get:function(){return r(this._batchTable)?this._batchTable.memorySizeInBytes:0}},innerContents:{get:function(){}},readyPromise:{get:function(){return this._readyPromise.promise}},tileset:{get:function(){return this._tileset}},tile:{get:function(){return this._tile}},url:{get:function(){return this._resource.getUrlComponent(!0)}},batchTable:{get:function(){return this._batchTable}}});var p=Uint32Array.BYTES_PER_ELEMENT;function m(e){var t=e.featuresLength;if(!r(e._features)&&t>0){var i=new Array(t);r(e._geometries)&&e._geometries.createFeatures(e,i),e._features=i}}return d.prototype.hasProperty=function(e,t){return this._batchTable.hasProperty(e,t)},d.prototype.getFeature=function(e){var t=this.featuresLength;if(!r(e)||e<0||e>=t)throw new s("batchId is required and between zero and featuresLength - 1 ("+(t-1)+").");return m(this),this._features[e]},d.prototype.applyDebugSettings=function(e,t){r(this._geometries)&&this._geometries.applyDebugSettings(e,t)},d.prototype.applyStyle=function(e){m(this),r(this._geometries)&&this._geometries.applyStyle(e,this._features)},d.prototype.update=function(e,t){if(r(this._geometries)&&(this._geometries.classificationType=this._tileset.classificationType,this._geometries.debugWireframe=this._tileset.debugWireframe,this._geometries.update(t)),r(this._batchTable)&&this._geometries._ready&&this._batchTable.update(e,t),!r(this._contentReadyPromise)){var i=this;this._contentReadyPromise=this._geometries.readyPromise.then(function(){i._readyPromise.resolve(i)})}},d.prototype.isDestroyed=function(){return!1},d.prototype.destroy=function(){return this._geometries=this._geometries&&this._geometries.destroy(),this._batchTable=this._batchTable&&this._batchTable.destroy(),n(this)},d});