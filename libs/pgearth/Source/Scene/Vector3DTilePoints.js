define(["../Core/arraySlice","../Core/Cartesian2","../Core/Cartesian3","../Core/Color","../Core/defined","../Core/defineProperties","../Core/destroyObject","../Core/DistanceDisplayCondition","../Core/Ellipsoid","../Core/NearFarScalar","../Core/Rectangle","../Core/TaskProcessor","../ThirdParty/when","./BillboardCollection","./PGEarth3DTilePointFeature","./HorizontalOrigin","./LabelCollection","./LabelStyle","./PolylineCollection","./VerticalOrigin"],function(e,i,l,t,o,a,n,r,s,c,d,h,u,b,C,g,p,_,v,f){"use strict";function y(e){this._positions=e.positions,this._batchTable=e.batchTable,this._batchIds=e.batchIds,this._rectangle=e.rectangle,this._minHeight=e.minimumHeight,this._maxHeight=e.maximumHeight,this._billboardCollection=void 0,this._labelCollection=void 0,this._polylineCollection=void 0,this._verticesPromise=void 0,this._packedBuffer=void 0,this._ready=!1,this._readyPromise=u.defer(),this._resolvedPromise=!1}a(y.prototype,{pointsLength:{get:function(){return this._billboardCollection.length}},texturesByteLength:{get:function(){return this._billboardCollection.textureAtlas.texture.sizeInBytes+this._labelCollection._textureAtlas.texture.sizeInBytes}},readyPromise:{get:function(){return this._readyPromise.promise}}});var O=new h("createVectorTilePoints"),D=new l;function T(i,t){if(!o(i._billboardCollection)){var a;if(!o(i._verticesPromise)){a=i._positions;var n=i._packedBuffer;o(n)||(a=i._positions=e(a),i._batchIds=e(i._batchIds),n=i._packedBuffer=function(e,i){var l=e._rectangle,t=e._minHeight,o=e._maxHeight,a=2+d.packedLength+s.packedLength,n=new Float64Array(a),r=0;return n[r++]=t,n[r++]=o,d.pack(l,n,r),r+=d.packedLength,s.pack(i,n,r),n}(i,t));var r=[a.buffer,n.buffer],c={positions:a.buffer,packedBuffer:n.buffer},h=i._verticesPromise=O.scheduleTask(c,r);if(!o(h))return;h.then(function(e){i._positions=new Float64Array(e.positions),i._ready=!0})}if(i._ready&&!o(i._billboardCollection)){a=i._positions;var u=i._batchTable,C=i._batchIds,g=i._billboardCollection=new b({batchTable:u}),_=i._labelCollection=new p({batchTable:u}),f=i._polylineCollection=new v;f._useHighlightColor=!0;for(var y=a.length/3,T=0;T<y;++T){var m=C[T],w=l.unpack(a,3*T,D),k=g.add();k.position=w,k._batchIndex=m;var P=_.add();P.text=" ",P.position=w,P._batchIndex=m,f.add().positions=[l.clone(w),l.clone(w)]}i._positions=void 0,i._packedBuffer=void 0}}}y.prototype.createFeatures=function(e,i){for(var l=this._billboardCollection,t=this._labelCollection,o=this._polylineCollection,a=this._batchIds,n=a.length,r=0;r<n;++r){var s=a[r],c=l.get(r),d=t.get(r),h=o.get(r);i[s]=new C(e,s,c,d,h)}},y.prototype.applyDebugSettings=function(e,i){e?(t.clone(i,this._billboardCollection._highlightColor),t.clone(i,this._labelCollection._highlightColor),t.clone(i,this._polylineCollection._highlightColor)):(t.clone(t.WHITE,this._billboardCollection._highlightColor),t.clone(t.WHITE,this._labelCollection._highlightColor),t.clone(t.WHITE,this._polylineCollection._highlightColor))};var m=new t,w=new t,k=new t,P=new t,E=new t,I=new t,x=new c,B=new c,H=new r;return y.prototype.applyStyle=function(e,l){if(o(e))for(var a=this._batchIds,n=a.length,r=0;r<n;++r){var s=l[a[r]];if(o(e.show)&&(s.show=e.show.evaluate(s)),o(e.pointSize)&&(s.pointSize=e.pointSize.evaluate(s)),o(e.color)&&(s.color=e.color.evaluateColor(s,m)),o(e.pointOutlineColor)&&(s.pointOutlineColor=e.pointOutlineColor.evaluateColor(s,w)),o(e.pointOutlineWidth)&&(s.pointOutlineWidth=e.pointOutlineWidth.evaluate(s)),o(e.labelColor)&&(s.labelColor=e.labelColor.evaluateColor(s,k)),o(e.labelOutlineColor)&&(s.labelOutlineColor=e.labelOutlineColor.evaluateColor(s,P)),o(e.labelOutlineWidth)&&(s.labelOutlineWidth=e.labelOutlineWidth.evaluate(s)),o(e.font)&&(s.font=e.font.evaluate(s)),o(e.labelStyle)&&(s.labelStyle=e.labelStyle.evaluate(s)),o(e.labelText)?s.labelText=e.labelText.evaluate(s):s.labelText=void 0,o(e.backgroundColor)&&(s.backgroundColor=e.backgroundColor.evaluateColor(s,E)),o(e.backgroundPadding)&&(s.backgroundPadding=e.backgroundPadding.evaluate(s)),o(e.backgroundEnabled)&&(s.backgroundEnabled=e.backgroundEnabled.evaluate(s)),o(e.scaleByDistance)){var c=e.scaleByDistance.evaluate(s);x.near=c.x,x.nearValue=c.y,x.far=c.z,x.farValue=c.w,s.scaleByDistance=x}else s.scaleByDistance=void 0;if(o(e.translucencyByDistance)){var d=e.translucencyByDistance.evaluate(s);B.near=d.x,B.nearValue=d.y,B.far=d.z,B.farValue=d.w,s.translucencyByDistance=B}else s.translucencyByDistance=void 0;if(o(e.distanceDisplayCondition)){var h=e.distanceDisplayCondition.evaluate(s);H.near=h.x,H.far=h.y,s.distanceDisplayCondition=H}else s.distanceDisplayCondition=void 0;o(e.heightOffset)&&(s.heightOffset=e.heightOffset.evaluate(s)),o(e.anchorLineEnabled)&&(s.anchorLineEnabled=e.anchorLineEnabled.evaluate(s)),o(e.anchorLineColor)&&(s.anchorLineColor=e.anchorLineColor.evaluateColor(s,I)),o(e.image)?s.image=e.image.evaluate(s):s.image=void 0,o(e.disableDepthTestDistance)&&(s.disableDepthTestDistance=e.disableDepthTestDistance.evaluate(s)),o(e.horizontalOrigin)&&(s.horizontalOrigin=e.horizontalOrigin.evaluate(s)),o(e.verticalOrigin)&&(s.verticalOrigin=e.verticalOrigin.evaluate(s)),o(e.labelHorizontalOrigin)&&(s.labelHorizontalOrigin=e.labelHorizontalOrigin.evaluate(s)),o(e.labelVerticalOrigin)&&(s.labelVerticalOrigin=e.labelVerticalOrigin.evaluate(s))}else!function(e,l){for(var o=e._batchIds,a=o.length,n=0;n<a;++n){var r=l[o[n]];r.show=!0,r.pointSize=C.defaultPointSize,r.color=C.defaultColor,r.pointOutlineColor=C.defaultPointOutlineColor,r.pointOutlineWidth=C.defaultPointOutlineWidth,r.labelColor=t.WHITE,r.labelOutlineColor=t.WHITE,r.labelOutlineWidth=1,r.font="30px sans-serif",r.labelStyle=_.FILL,r.labelText=void 0,r.backgroundColor=new t(.165,.165,.165,.8),r.backgroundPadding=new i(7,5),r.backgroundEnabled=!1,r.scaleByDistance=void 0,r.translucencyByDistance=void 0,r.distanceDisplayCondition=void 0,r.heightOffset=0,r.anchorLineEnabled=!1,r.anchorLineColor=t.WHITE,r.image=void 0,r.disableDepthTestDistance=0,r.horizontalOrigin=g.CENTER,r.verticalOrigin=f.CENTER,r.labelHorizontalOrigin=g.RIGHT,r.labelVerticalOrigin=f.BASELINE}}(this,l)},y.prototype.update=function(e){T(this,e.mapProjection.ellipsoid),this._ready&&(this._polylineCollection.update(e),this._billboardCollection.update(e),this._labelCollection.update(e),this._resolvedPromise||(this._readyPromise.resolve(),this._resolvedPromise=!0))},y.prototype.isDestroyed=function(){return!1},y.prototype.destroy=function(){return this._billboardCollection=this._billboardCollection&&this._billboardCollection.destroy(),this._labelCollection=this._labelCollection&&this._labelCollection.destroy(),this._polylineCollection=this._polylineCollection&&this._polylineCollection.destroy(),n(this)},y});