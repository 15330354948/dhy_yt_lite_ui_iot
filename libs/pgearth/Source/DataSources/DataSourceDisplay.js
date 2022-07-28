define(["../Core/ApproximateTerrainHeights","../Core/BoundingSphere","../Core/Check","../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/destroyObject","../Core/EventHelper","../Scene/GroundPolylinePrimitive","../Scene/GroundPrimitive","../Scene/OrderedGroundPrimitiveCollection","../Scene/PrimitiveCollection","./BillboardVisualizer","./BoundingSphereState","./CustomDataSource","./GeometryVisualizer","./LabelVisualizer","./ModelVisualizer","./PathVisualizer","./PointVisualizer","./PolylineVisualizer"],function(e,i,t,r,o,a,n,s,d,u,l,c,v,h,_,p,f,m,S,g,D){"use strict";function C(e){t.typeOf.object("options",e),t.typeOf.object("options.scene",e.scene),t.typeOf.object("options.dataSourceCollection",e.dataSourceCollection),u.initializeTerrainHeights(),d.initializeTerrainHeights();var i=e.scene,o=e.dataSourceCollection;this._eventHelper=new s,this._eventHelper.add(o.dataSourceAdded,this._onDataSourceAdded,this),this._eventHelper.add(o.dataSourceRemoved,this._onDataSourceRemoved,this),this._eventHelper.add(o.dataSourceMoved,this._onDataSourceMoved,this),this._dataSourceCollection=o,this._scene=i,this._visualizersCallback=r(e.visualizersCallback,C.defaultVisualizersCallback);var a=!1,n=new c,l=new c;o.length>0&&(i.primitives.add(n),i.groundPrimitives.add(l),a=!0),this._primitives=n,this._groundPrimitives=l;for(var v=0,h=o.length;v<h;v++)this._onDataSourceAdded(o,o.get(v));var p,f,m=new _;if(this._onDataSourceAdded(void 0,m),this._defaultDataSource=m,!a){var S=this,g=function(){i.primitives.add(n),i.groundPrimitives.add(l),p(),f(),S._removeDefaultDataSoureListener=void 0,S._removeDataSourceCollectionListener=void 0};p=m.entities.collectionChanged.addEventListener(g),f=o.dataSourceAdded.addEventListener(g)}this._removeDefaultDataSoureListener=p,this._removeDataSourceCollectionListener=f,this._ready=!1}C.defaultVisualizersCallback=function(e,i,t){var r=t.entities;return[new v(i,r),new p(e,r,t._primitives,t._groundPrimitives),new f(i,r),new m(e,r),new g(i,r),new S(e,r),new D(e,r,t._primitives,t._groundPrimitives)]},a(C.prototype,{scene:{get:function(){return this._scene}},dataSources:{get:function(){return this._dataSourceCollection}},defaultDataSource:{get:function(){return this._defaultDataSource}},ready:{get:function(){return this._ready}}}),C.prototype.isDestroyed=function(){return!1},C.prototype.destroy=function(){this._eventHelper.removeAll();for(var e=this._dataSourceCollection,i=0,t=e.length;i<t;++i)this._onDataSourceRemoved(this._dataSourceCollection,e.get(i));return this._onDataSourceRemoved(void 0,this._defaultDataSource),o(this._removeDefaultDataSoureListener)?(this._removeDefaultDataSoureListener(),this._removeDataSourceCollectionListener()):(this._scene.primitives.remove(this._primitives),this._scene.groundPrimitives.remove(this._groundPrimitives)),n(this)},C.prototype.update=function(i){if(t.defined("time",i),!e.initialized)return this._ready=!1,!1;var r,a,n,s,d=!0,u=this._dataSourceCollection,l=u.length;for(r=0;r<l;r++){var c=u.get(r);for(o(c.update)&&(d=c.update(i)&&d),s=(n=c._visualizers).length,a=0;a<s;a++)d=n[a].update(i)&&d}for(s=(n=this._defaultDataSource._visualizers).length,a=0;a<s;a++)d=n[a].update(i)&&d;return this._ready=d,d};var y=[],P=new i;return C.prototype.getBoundingSphere=function(e,r,a){if(t.defined("entity",e),t.typeOf.bool("allowPartial",r),t.defined("result",a),!this._ready)return h.PENDING;var n,s,d=this._defaultDataSource;if(!d.entities.contains(e)){d=void 0;var u=this._dataSourceCollection;for(s=u.length,n=0;n<s;n++){var l=u.get(n);if(l.entities.contains(e)){d=l;break}}}if(!o(d))return h.FAILED;var c=y,v=P,_=0,p=h.DONE,f=d._visualizers,m=f.length;for(n=0;n<m;n++){var S=f[n];if(o(S.getBoundingSphere)){if(p=f[n].getBoundingSphere(e,v),!r&&p===h.PENDING)return h.PENDING;p===h.DONE&&(c[_]=i.clone(v,c[_]),_++)}}return 0===_?h.FAILED:(c.length=_,i.fromBoundingSpheres(c,a),h.DONE)},C.prototype._onDataSourceAdded=function(e,i){var t=this._scene,r=this._primitives,o=this._groundPrimitives,a=r.add(new c),n=o.add(new l);i._primitives=a,i._groundPrimitives=n;var s=i.clustering;s._initialize(t),a.add(s),i._visualizers=this._visualizersCallback(t,s,i)},C.prototype._onDataSourceRemoved=function(e,i){var t=this._primitives,r=this._groundPrimitives,o=i._primitives,a=i._groundPrimitives,n=i.clustering;o.remove(n);for(var s=i._visualizers,d=s.length,u=0;u<d;u++)s[u].destroy();t.remove(o),r.remove(a),i._visualizers=void 0},C.prototype._onDataSourceMoved=function(e,i,t){var r=this._primitives,o=this._groundPrimitives,a=e._primitives,n=e._groundPrimitives;i===t+1?(r.raise(a),o.raise(n)):i===t-1?(r.lower(a),o.lower(n)):0===i?(r.lowerToBottom(a),o.lowerToBottom(n),r.raise(a),o.raise(n)):(r.raiseToTop(a),o.raiseToTop(n))},C});