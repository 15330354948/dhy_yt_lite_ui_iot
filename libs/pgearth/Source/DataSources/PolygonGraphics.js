define(["../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/DeveloperError","../Core/Event","./createMaterialPropertyDescriptor","./createPropertyDescriptor"],function(i,t,e,o,s,h,n){"use strict";function r(t){this._show=void 0,this._showSubscription=void 0,this._material=void 0,this._materialSubscription=void 0,this._hierarchy=void 0,this._hierarchySubscription=void 0,this._height=void 0,this._heightSubscription=void 0,this._heightReference=void 0,this._heightReferenceSubscription=void 0,this._extrudedHeight=void 0,this._extrudedHeightSubscription=void 0,this._extrudedHeightReference=void 0,this._extrudedHeightReferenceSubscription=void 0,this._granularity=void 0,this._granularitySubscription=void 0,this._stRotation=void 0,this._stRotationSubscription=void 0,this._perPositionHeight=void 0,this._perPositionHeightSubscription=void 0,this._outline=void 0,this._outlineSubscription=void 0,this._outlineColor=void 0,this._outlineColorSubscription=void 0,this._outlineWidth=void 0,this._outlineWidthSubscription=void 0,this._fill=void 0,this._fillSubscription=void 0,this._closeTop=void 0,this._closeTopSubscription=void 0,this._closeBottom=void 0,this._closeBottomSubscription=void 0,this._shadows=void 0,this._shadowsSubscription=void 0,this._distanceDisplayCondition=void 0,this._distanceDisplayConditionSubscription=void 0,this._classificationType=void 0,this._classificationTypeSubscription=void 0,this._arcType=void 0,this._arcTypeSubscription=void 0,this._zIndex=void 0,this._zIndexSubscription=void 0,this._definitionChanged=new s,this.merge(i(t,i.EMPTY_OBJECT))}return e(r.prototype,{definitionChanged:{get:function(){return this._definitionChanged}},show:n("show"),material:h("material"),hierarchy:n("hierarchy"),height:n("height"),heightReference:n("heightReference"),extrudedHeight:n("extrudedHeight"),extrudedHeightReference:n("extrudedHeightReference"),granularity:n("granularity"),stRotation:n("stRotation"),fill:n("fill"),outline:n("outline"),outlineColor:n("outlineColor"),outlineWidth:n("outlineWidth"),perPositionHeight:n("perPositionHeight"),closeTop:n("closeTop"),closeBottom:n("closeBottom"),shadows:n("shadows"),distanceDisplayCondition:n("distanceDisplayCondition"),classificationType:n("classificationType"),arcType:n("arcType"),zIndex:n("zIndex")}),r.prototype.clone=function(i){return t(i)?(i.show=this.show,i.material=this.material,i.hierarchy=this.hierarchy,i.height=this.height,i.heightReference=this.heightReference,i.extrudedHeight=this.extrudedHeight,i.extrudedHeightReference=this.extrudedHeightReference,i.granularity=this.granularity,i.stRotation=this.stRotation,i.fill=this.fill,i.outline=this.outline,i.outlineColor=this.outlineColor,i.outlineWidth=this.outlineWidth,i.perPositionHeight=this.perPositionHeight,i.closeTop=this.closeTop,i.closeBottom=this.closeBottom,i.shadows=this.shadows,i.distanceDisplayCondition=this.distanceDisplayCondition,i.classificationType=this.classificationType,i.arcType=this.arcType,i.zIndex=this.zIndex,i):new r(this)},r.prototype.merge=function(e){if(!t(e))throw new o("source is required.");this.show=i(this.show,e.show),this.material=i(this.material,e.material),this.hierarchy=i(this.hierarchy,e.hierarchy),this.height=i(this.height,e.height),this.heightReference=i(this.heightReference,e.heightReference),this.extrudedHeight=i(this.extrudedHeight,e.extrudedHeight),this.extrudedHeightReference=i(this.extrudedHeightReference,e.extrudedHeightReference),this.granularity=i(this.granularity,e.granularity),this.stRotation=i(this.stRotation,e.stRotation),this.fill=i(this.fill,e.fill),this.outline=i(this.outline,e.outline),this.outlineColor=i(this.outlineColor,e.outlineColor),this.outlineWidth=i(this.outlineWidth,e.outlineWidth),this.perPositionHeight=i(this.perPositionHeight,e.perPositionHeight),this.closeTop=i(this.closeTop,e.closeTop),this.closeBottom=i(this.closeBottom,e.closeBottom),this.shadows=i(this.shadows,e.shadows),this.distanceDisplayCondition=i(this.distanceDisplayCondition,e.distanceDisplayCondition),this.classificationType=i(this.classificationType,e.classificationType),this.arcType=i(this.arcType,e.arcType),this.zIndex=i(this.zIndex,e.zIndex)},r});