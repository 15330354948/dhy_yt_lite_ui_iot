define(["../Core/ApproximateTerrainHeights","../Core/ArcType","../Core/Cartesian2","../Core/Cartesian3","../Core/Check","../Core/Color","../Core/ColorGeometryInstanceAttribute","../Core/CoplanarPolygonGeometry","../Core/CoplanarPolygonOutlineGeometry","../Core/defined","../Core/DeveloperError","../Core/DistanceDisplayConditionGeometryInstanceAttribute","../Core/EllipsoidTangentPlane","../Core/GeometryInstance","../Core/GeometryOffsetAttribute","../Core/isArray","../Core/Iso8601","../Core/oneTimeWarning","../Core/OffsetGeometryInstanceAttribute","../Core/PolygonGeometry","../Core/PolygonHierarchy","../Core/PolygonOutlineGeometry","../Core/Rectangle","../Core/ShowGeometryInstanceAttribute","../Scene/GroundPrimitive","../Scene/HeightReference","../Scene/MaterialAppearance","../Scene/PerInstanceColorAppearance","./ColorMaterialProperty","./DynamicGeometryUpdater","./GeometryUpdater","./GroundGeometryUpdater","./Property"],function(e,t,o,i,r,n,a,s,l,h,p,g,y,u,d,c,f,m,C,O,_,P,V,H,M,v,U,E,I,A,w,D,T){"use strict";var b=new n,G=i.ZERO,N=new i,R=new V,x=[],L=new o;function S(e,t){D.call(this,{entity:e,scene:t,geometryOptions:new function(e){this.id=e,this.vertexFormat=void 0,this.polygonHierarchy=void 0,this.perPositionHeight=void 0,this.closeTop=void 0,this.closeBottom=void 0,this.height=void 0,this.extrudedHeight=void 0,this.granularity=void 0,this.stRotation=void 0,this.offsetAttribute=void 0,this.arcType=void 0}(e),geometryPropertyName:"polygon",observedPropertyNames:["availability","polygon"]}),this._onEntityPropertyChanged(e,"polygon",e.polygon,void 0)}function B(e,t,o){A.call(this,e,t,o)}return h(Object.create)&&(S.prototype=Object.create(D.prototype),S.prototype.constructor=S),S.prototype.createFillGeometryInstance=function(e){if(r.defined("time",e),!this._fillEnabled)throw new p("This instance does not represent a filled geometry.");var t,o,i=this._entity,l=i.isAvailable(e),y=this._options,d={show:new H(l&&i.isShowing&&this._showProperty.getValue(e)&&this._fillProperty.getValue(e)),distanceDisplayCondition:g.fromDistanceDisplayCondition(this._distanceDisplayConditionProperty.getValue(e)),offset:void 0,color:void 0};this._materialProperty instanceof I&&(h(this._materialProperty.color)&&(this._materialProperty.color.isConstant||l)&&(t=this._materialProperty.color.getValue(e,b)),h(t)||(t=n.WHITE),d.color=a.fromColor(t));return h(y.offsetAttribute)&&(d.offset=C.fromCartesian3(T.getValueOrDefault(this._terrainOffsetProperty,e,G,N))),o=y.perPositionHeight&&!h(y.extrudedHeight)?new s(y):new O(y),new u({id:i,geometry:o,attributes:d})},S.prototype.createOutlineGeometryInstance=function(e){if(r.defined("time",e),!this._outlineEnabled)throw new p("This instance does not represent an outlined geometry.");var t,o=this._entity,i=o.isAvailable(e),s=this._options,y=T.getValueOrDefault(this._outlineColorProperty,e,n.BLACK,b),d=this._distanceDisplayConditionProperty.getValue(e),c={show:new H(i&&o.isShowing&&this._showProperty.getValue(e)&&this._showOutlineProperty.getValue(e)),color:a.fromColor(y),distanceDisplayCondition:g.fromDistanceDisplayCondition(d),offset:void 0};return h(s.offsetAttribute)&&(c.offset=C.fromCartesian3(T.getValueOrDefault(this._terrainOffsetProperty,e,G,N))),t=s.perPositionHeight&&!h(s.extrudedHeight)?new l(s):new P(s),new u({id:o,geometry:t,attributes:c})},S.prototype._computeCenter=function(e,t){var i=T.getValueOrUndefined(this._entity.polygon.hierarchy,e);if(h(i)&&!c(i)&&(i=i.positions),0!==i.length){for(var r=this._scene.mapProjection.ellipsoid,n=y.fromPoints(i,r),a=n.projectPointsOntoPlane(i,x),s=a.length,l=0,p=s-1,g=new o,u=0;u<s;p=u++){var d=a[u],f=a[p],m=d.x*f.y-f.x*d.y,C=o.add(d,f,L);C=o.multiplyByScalar(C,m,C),g=o.add(g,C,g),l+=m}var O=1/(3*l);return g=o.multiplyByScalar(g,O,g),n.projectPointOntoEllipsoid(g,t)}},S.prototype._isHidden=function(e,t){return!h(t.hierarchy)||w.prototype._isHidden.call(this,e,t)},S.prototype._isOnTerrain=function(e,t){var o=D.prototype._isOnTerrain.call(this,e,t),i=t.perPositionHeight,r=h(i)&&(!i.isConstant||i.getValue(f.MINIMUM_VALUE));return o&&!r},S.prototype._isDynamic=function(e,t){return!t.hierarchy.isConstant||!T.isConstant(t.height)||!T.isConstant(t.extrudedHeight)||!T.isConstant(t.granularity)||!T.isConstant(t.stRotation)||!T.isConstant(t.outlineWidth)||!T.isConstant(t.perPositionHeight)||!T.isConstant(t.closeTop)||!T.isConstant(t.closeBottom)||!T.isConstant(t.zIndex)||!T.isConstant(t.arcType)||this._onTerrain&&!T.isConstant(this._materialProperty)},S.prototype._setStaticOptions=function(o,i){var r=this._materialProperty instanceof I,n=this._options;n.vertexFormat=r?E.VERTEX_FORMAT:U.MaterialSupport.TEXTURED.vertexFormat;var a=i.hierarchy.getValue(f.MINIMUM_VALUE);c(a)&&(a=new _(a));var s,l=T.getValueOrUndefined(i.height,f.MINIMUM_VALUE),p=T.getValueOrDefault(i.heightReference,f.MINIMUM_VALUE,v.NONE),g=T.getValueOrUndefined(i.extrudedHeight,f.MINIMUM_VALUE),y=T.getValueOrDefault(i.extrudedHeightReference,f.MINIMUM_VALUE,v.NONE),u=T.getValueOrDefault(i.perPositionHeight,f.MINIMUM_VALUE,!1);l=D.getGeometryHeight(l,p),u?(h(l)&&(l=void 0,m("Entity polygons cannot have both height and perPositionHeight.  height will be ignored")),p!==v.NONE&&u&&(l=void 0,m("heightReference is not supported for entity polygons with perPositionHeight. heightReference will be ignored"))):(h(g)&&!h(l)&&(l=0),s=D.computeGeometryOffsetAttribute(l,p,g,y)),n.polygonHierarchy=a,n.granularity=T.getValueOrUndefined(i.granularity,f.MINIMUM_VALUE),n.stRotation=T.getValueOrUndefined(i.stRotation,f.MINIMUM_VALUE),n.perPositionHeight=u,n.closeTop=T.getValueOrDefault(i.closeTop,f.MINIMUM_VALUE,!0),n.closeBottom=T.getValueOrDefault(i.closeBottom,f.MINIMUM_VALUE,!0),n.offsetAttribute=s,n.height=l,n.arcType=T.getValueOrDefault(i.arcType,f.MINIMUM_VALUE,t.GEODESIC),(g=D.getGeometryExtrudedHeight(g,y))===D.CLAMP_TO_GROUND&&(g=e.getMinimumMaximumHeights(O.computeRectangle(n,R)).minimumTerrainHeight),n.extrudedHeight=g},S.prototype._getIsClosed=function(e){var t=e.height,o=e.extrudedHeight,i=h(o)&&o!==t;return!e.perPositionHeight&&(!i&&0===t||i&&e.closeTop&&e.closeBottom)},S.DynamicGeometryUpdater=B,h(Object.create)&&(B.prototype=Object.create(A.prototype),B.prototype.constructor=B),B.prototype._isHidden=function(e,t,o){return!h(this._options.polygonHierarchy)||A.prototype._isHidden.call(this,e,t,o)},B.prototype._setOptions=function(o,i,r){var n=this._options,a=T.getValueOrUndefined(i.hierarchy,r);c(a)?n.polygonHierarchy=new _(a):n.polygonHierarchy=a;var s,l=T.getValueOrUndefined(i.height,r),p=T.getValueOrDefault(i.heightReference,r,v.NONE),g=T.getValueOrDefault(i.extrudedHeightReference,r,v.NONE),y=T.getValueOrUndefined(i.extrudedHeight,r),u=T.getValueOrUndefined(i.perPositionHeight,r);l=D.getGeometryHeight(l,g),u?(h(l)&&(l=void 0,m("Entity polygons cannot have both height and perPositionHeight.  height will be ignored")),p!==v.NONE&&u&&(l=void 0,m("heightReference is not supported for entity polygons with perPositionHeight. heightReference will be ignored"))):(h(y)&&!h(l)&&(l=0),s=D.computeGeometryOffsetAttribute(l,p,y,g)),n.granularity=T.getValueOrUndefined(i.granularity,r),n.stRotation=T.getValueOrUndefined(i.stRotation,r),n.perPositionHeight=T.getValueOrUndefined(i.perPositionHeight,r),n.closeTop=T.getValueOrDefault(i.closeTop,r,!0),n.closeBottom=T.getValueOrDefault(i.closeBottom,r,!0),n.offsetAttribute=s,n.height=l,n.arcType=T.getValueOrDefault(i.arcType,r,t.GEODESIC),(y=D.getGeometryExtrudedHeight(y,g))===D.CLAMP_TO_GROUND&&(y=e.getMinimumMaximumHeights(O.computeRectangle(n,R)).minimumTerrainHeight),n.extrudedHeight=y},S});