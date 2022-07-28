define(["../Core/AssociativeArray","../Core/BoundingSphere","../Core/Check","../Core/defaultValue","../Core/defined","../Core/destroyObject","../Core/Event","../Core/EventHelper","../Scene/ClassificationType","../Scene/MaterialAppearance","../Scene/PerInstanceColorAppearance","../Scene/ShadowMode","./BoundingSphereState","./BoxGeometryUpdater","./ColorMaterialProperty","./CorridorGeometryUpdater","./CylinderGeometryUpdater","./DynamicGeometryBatch","./EllipseGeometryUpdater","./EllipsoidGeometryUpdater","./Entity","./PlaneGeometryUpdater","./PolygonGeometryUpdater","./PolylineVolumeGeometryUpdater","./RectangleGeometryUpdater","./StaticGeometryColorBatch","./StaticGeometryPerMaterialBatch","./StaticGroundGeometryColorBatch","./StaticGroundGeometryPerMaterialBatch","./StaticOutlineGeometryBatch","./WallGeometryUpdater"],function(e,t,r,o,i,s,n,a,h,d,l,c,p,_,u,y,v,f,g,m,B,C,E,w,O,S,b,M,P,A,G){"use strict";var U=[],j=[_,v,y,g,m,C,E,w,O,G];function D(e,t){this.entity=e,this.scene=t;var r=new Array(j.length),o=new n;function i(e){o.raiseEvent(e)}for(var s=new a,h=0;h<r.length;h++){var d=new j[h](e,t);s.add(d.geometryChanged,i),r[h]=d}this.updaters=r,this.geometryChanged=o,this.eventHelper=s,this._removeEntitySubscription=e.definitionChanged.addEventListener(D.prototype._onEntityPropertyChanged,this)}function N(t,i,s,n){r.defined("scene",t),r.defined("entityCollection",i),s=o(s,t.primitives),n=o(n,t.groundPrimitives),this._scene=t,this._primitives=s,this._groundPrimitives=n,this._entityCollection=void 0,this._addedObjects=new e,this._removedObjects=new e,this._changedObjects=new e;var a=c.NUMBER_OF_SHADOW_MODES;this._outlineBatches=new Array(2*a),this._closedColorBatches=new Array(2*a),this._closedMaterialBatches=new Array(2*a),this._openColorBatches=new Array(2*a),this._openMaterialBatches=new Array(2*a);var p,_=B.supportsMaterialsforEntitiesOnTerrain(t);for(this._supportsMaterialsforEntitiesOnTerrain=_,p=0;p<a;++p)this._outlineBatches[p]=new A(s,t,p,!1),this._outlineBatches[a+p]=new A(s,t,p,!0),this._closedColorBatches[p]=new S(s,l,void 0,!0,p,!0),this._closedColorBatches[a+p]=new S(s,l,void 0,!0,p,!1),this._closedMaterialBatches[p]=new b(s,d,void 0,!0,p,!0),this._closedMaterialBatches[a+p]=new b(s,d,void 0,!0,p,!1),this._openColorBatches[p]=new S(s,l,void 0,!1,p,!0),this._openColorBatches[a+p]=new S(s,l,void 0,!1,p,!1),this._openMaterialBatches[p]=new b(s,d,void 0,!1,p,!0),this._openMaterialBatches[a+p]=new b(s,d,void 0,!1,p,!1);var u=h.NUMBER_OF_CLASSIFICATION_TYPES,y=new Array(u),v=[];if(_)for(p=0;p<u;++p)v.push(new P(n,p,d)),y[p]=new P(n,p,l);else for(p=0;p<u;++p)y[p]=new M(n,p);this._groundColorBatches=y,this._groundMaterialBatches=v,this._dynamicBatch=new f(s,n),this._batches=this._outlineBatches.concat(this._closedColorBatches,this._closedMaterialBatches,this._openColorBatches,this._openMaterialBatches,this._groundColorBatches,this._groundMaterialBatches,this._dynamicBatch),this._subscriptions=new e,this._updaterSets=new e,this._entityCollection=i,i.collectionChanged.addEventListener(N.prototype._onCollectionChanged,this),this._onCollectionChanged(i,i.values,U)}D.prototype._onEntityPropertyChanged=function(e,t,r,o){for(var i=this.updaters,s=0;s<i.length;s++)i[s]._onEntityPropertyChanged(e,t,r,o)},D.prototype.forEach=function(e){for(var t=this.updaters,r=0;r<t.length;r++)e(t[r])},D.prototype.destroy=function(){this.eventHelper.removeAll();for(var e=this.updaters,t=0;t<e.length;t++)e[t].destroy();this._removeEntitySubscription(),s(this)},N.prototype.update=function(e){r.defined("time",e);var t,o,i,s,n=this._addedObjects,a=n.values,h=this._removedObjects,d=h.values,l=this._changedObjects,c=l.values,p=this;for(t=c.length-1;t>-1;t--)i=(o=c[t]).id,(s=this._updaterSets.get(i)).entity===o?s.forEach(function(t){p._removeUpdater(t),p._insertUpdaterIntoBatch(e,t)}):(d.push(o),a.push(o));for(t=d.length-1;t>-1;t--)i=(o=d[t]).id,(s=this._updaterSets.get(i)).forEach(this._removeUpdater.bind(this)),s.destroy(),this._updaterSets.remove(i),this._subscriptions.get(i)(),this._subscriptions.remove(i);for(t=a.length-1;t>-1;t--)i=(o=a[t]).id,s=new D(o,this._scene),this._updaterSets.set(i,s),s.forEach(function(t){p._insertUpdaterIntoBatch(e,t)}),this._subscriptions.set(i,s.geometryChanged.addEventListener(N._onGeometryChanged,this));n.removeAll(),h.removeAll(),l.removeAll();var _=!0,u=this._batches,y=u.length;for(t=0;t<y;t++)_=u[t].update(e)&&_;return _};var I=[],T=new t;return N.prototype.getBoundingSphere=function(e,o){r.defined("entity",e),r.defined("result",o);for(var i=I,s=T,n=0,a=p.DONE,h=this._batches,d=h.length,l=e.id,c=this._updaterSets.get(l).updaters,_=0;_<c.length;_++)for(var u=c[_],y=0;y<d;y++){if((a=h[y].getBoundingSphere(u,s))===p.PENDING)return p.PENDING;a===p.DONE&&(i[n]=t.clone(s,i[n]),n++)}return 0===n?p.FAILED:(i.length=n,t.fromBoundingSpheres(i,o),p.DONE)},N.prototype.isDestroyed=function(){return!1},N.prototype.destroy=function(){var e;this._entityCollection.collectionChanged.removeEventListener(N.prototype._onCollectionChanged,this),this._addedObjects.removeAll(),this._removedObjects.removeAll();var t=this._batches,r=t.length;for(e=0;e<r;e++)t[e].removeAllPrimitives();var o=this._subscriptions.values;for(r=o.length,e=0;e<r;e++)o[e]();this._subscriptions.removeAll();var i=this._updaterSets.values;for(r=i.length,e=0;e<r;e++)i[e].destroy();return this._updaterSets.removeAll(),s(this)},N.prototype._removeUpdater=function(e){for(var t=this._batches,r=t.length,o=0;o<r;o++)t[o].remove(e)},N.prototype._insertUpdaterIntoBatch=function(e,t){if(t.isDynamic)this._dynamicBatch.add(e,t);else{var r;(t.outlineEnabled||t.fillEnabled)&&(r=t.shadowsProperty.getValue(e));var o=c.NUMBER_OF_SHADOW_MODES;if(t.outlineEnabled&&(i(t.terrainOffsetProperty)?this._outlineBatches[o+r].add(e,t):this._outlineBatches[r].add(e,t)),t.fillEnabled)if(t.onTerrain){var s=t.classificationTypeProperty.getValue(e);t.fillMaterialProperty instanceof u?this._groundColorBatches[s].add(e,t):this._groundMaterialBatches[s].add(e,t)}else t.isClosed?t.fillMaterialProperty instanceof u?i(t.terrainOffsetProperty)?this._closedColorBatches[o+r].add(e,t):this._closedColorBatches[r].add(e,t):i(t.terrainOffsetProperty)?this._closedMaterialBatches[o+r].add(e,t):this._closedMaterialBatches[r].add(e,t):t.fillMaterialProperty instanceof u?i(t.terrainOffsetProperty)?this._openColorBatches[o+r].add(e,t):this._openColorBatches[r].add(e,t):i(t.terrainOffsetProperty)?this._openMaterialBatches[o+r].add(e,t):this._openMaterialBatches[r].add(e,t)}},N._onGeometryChanged=function(e){var t=this._removedObjects,r=this._changedObjects,o=e.entity,s=o.id;i(t.get(s))||i(r.get(s))||r.set(s,o)},N.prototype._onCollectionChanged=function(e,t,r){var o,i,s,n=this._addedObjects,a=this._removedObjects,h=this._changedObjects;for(o=r.length-1;o>-1;o--)i=(s=r[o]).id,n.remove(i)||(a.set(i,s),h.remove(i));for(o=t.length-1;o>-1;o--)i=(s=t[o]).id,a.remove(i)?h.set(i,s):n.set(i,s)},N});