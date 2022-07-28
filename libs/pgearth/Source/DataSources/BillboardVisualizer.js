define(["../Core/AssociativeArray","../Core/BoundingRectangle","../Core/Cartesian2","../Core/Cartesian3","../Core/Color","../Core/defined","../Core/destroyObject","../Core/DeveloperError","../Core/DistanceDisplayCondition","../Core/NearFarScalar","../Scene/HeightReference","../Scene/HorizontalOrigin","../Scene/VerticalOrigin","./BoundingSphereState","./Property"],function(e,t,i,n,r,o,l,a,s,d,u,c,g,f,h){"use strict";var _=r.WHITE,O=n.ZERO,p=u.NONE,y=i.ZERO,C=n.ZERO,D=c.CENTER,b=g.CENTER,v=new n,w=new r,V=new n,m=new i,E=new d,B=new d,R=new d,S=new t,N=new s;function U(e){this.entity=e,this.billboard=void 0,this.textureValue=void 0}function x(t,i){if(!o(t))throw new a("entityCluster is required.");if(!o(i))throw new a("entityCollection is required.");i.collectionChanged.addEventListener(x.prototype._onCollectionChanged,this),this._cluster=t,this._entityCollection=i,this._items=new e,this._onCollectionChanged(i,i.values,[],[])}function I(e,t,i){o(e)&&(e.billboard=void 0,i.removeBillboard(t))}return x.prototype.update=function(e){if(!o(e))throw new a("time is required.");for(var t=this._items.values,i=this._cluster,n=0,r=t.length;n<r;n++){var l,s,d=t[n],u=d.entity,c=u._billboard,g=d.billboard,f=u.isShowing&&u.isAvailable(e)&&h.getValueOrDefault(c._show,e,!0);if(f&&(s=h.getValueOrUndefined(u._position,e,v),l=h.getValueOrUndefined(c._image,e),f=o(s)&&o(l)),f){h.isConstant(u._position)||(i._clusterDirty=!0),o(g)||((g=i.getBillboard(u)).id=u,g.image=void 0,d.billboard=g),g.show=f,o(g.image)&&d.textureValue===l||(g.image=l,d.textureValue=l),g.position=s,g.color=h.getValueOrDefault(c._color,e,_,w),g.eyeOffset=h.getValueOrDefault(c._eyeOffset,e,O,V),g.heightReference=h.getValueOrDefault(c._heightReference,e,p),g.pixelOffset=h.getValueOrDefault(c._pixelOffset,e,y,m),g.scale=h.getValueOrDefault(c._scale,e,1),g.rotation=h.getValueOrDefault(c._rotation,e,0),g.alignedAxis=h.getValueOrDefault(c._alignedAxis,e,C),g.horizontalOrigin=h.getValueOrDefault(c._horizontalOrigin,e,D),g.verticalOrigin=h.getValueOrDefault(c._verticalOrigin,e,b),g.width=h.getValueOrUndefined(c._width,e),g.height=h.getValueOrUndefined(c._height,e),g.scaleByDistance=h.getValueOrUndefined(c._scaleByDistance,e,E),g.translucencyByDistance=h.getValueOrUndefined(c._translucencyByDistance,e,B),g.pixelOffsetScaleByDistance=h.getValueOrUndefined(c._pixelOffsetScaleByDistance,e,R),g.sizeInMeters=h.getValueOrDefault(c._sizeInMeters,e,!1),g.distanceDisplayCondition=h.getValueOrUndefined(c._distanceDisplayCondition,e,N),g.disableDepthTestDistance=h.getValueOrUndefined(c._disableDepthTestDistance,e);var U=h.getValueOrUndefined(c._imageSubRegion,e,S);o(U)&&g.setImageSubRegion(g._imageId,U)}else I(d,u,i)}return!0},x.prototype.getBoundingSphere=function(e,t){if(!o(e))throw new a("entity is required.");if(!o(t))throw new a("result is required.");var i=this._items.get(e.id);if(!o(i)||!o(i.billboard))return f.FAILED;var r=i.billboard;if(r.heightReference===u.NONE)t.center=n.clone(r.position,t.center);else{if(!o(r._clampedPosition))return f.PENDING;t.center=n.clone(r._clampedPosition,t.center)}return t.radius=0,f.DONE},x.prototype.isDestroyed=function(){return!1},x.prototype.destroy=function(){this._entityCollection.collectionChanged.removeEventListener(x.prototype._onCollectionChanged,this);for(var e=this._entityCollection.values,t=0;t<e.length;t++)this._cluster.removeBillboard(e[t]);return l(this)},x.prototype._onCollectionChanged=function(e,t,i,n){var r,l,a=this._items,s=this._cluster;for(r=t.length-1;r>-1;r--)l=t[r],o(l._billboard)&&o(l._position)&&a.set(l.id,new U(l));for(r=n.length-1;r>-1;r--)l=n[r],o(l._billboard)&&o(l._position)?a.contains(l.id)||a.set(l.id,new U(l)):(I(a.get(l.id),l,s),a.remove(l.id));for(r=i.length-1;r>-1;r--)l=i[r],I(a.get(l.id),l,s),a.remove(l.id)},x});