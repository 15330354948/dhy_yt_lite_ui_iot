define(["../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/DeveloperError","../Core/Event","./createMaterialPropertyDescriptor","./createPropertyDescriptor"],function(i,t,e,o,s,n,h){"use strict";function l(t){this._heightReference=void 0,this._dimensions=void 0,this._dimensionsSubscription=void 0,this._show=void 0,this._showSubscription=void 0,this._fill=void 0,this._fillSubscription=void 0,this._material=void 0,this._materialSubscription=void 0,this._outline=void 0,this._outlineSubscription=void 0,this._outlineColor=void 0,this._outlineColorSubscription=void 0,this._outlineWidth=void 0,this._outlineWidthSubscription=void 0,this._shadows=void 0,this._shadowsSubscription=void 0,this._distanceDisplayCondition=void 0,this._distanceDisplayConditionSubscription=void 0,this._definitionChanged=new s,this.merge(i(t,i.EMPTY_OBJECT))}return e(l.prototype,{definitionChanged:{get:function(){return this._definitionChanged}},heightReference:h("heightReference"),show:h("show"),dimensions:h("dimensions"),material:n("material"),fill:h("fill"),outline:h("outline"),outlineColor:h("outlineColor"),outlineWidth:h("outlineWidth"),shadows:h("shadows"),distanceDisplayCondition:h("distanceDisplayCondition")}),l.prototype.clone=function(i){return t(i)?(i.heightReference=this.heightReference,i.dimensions=this.dimensions,i.show=this.show,i.material=this.material,i.fill=this.fill,i.outline=this.outline,i.outlineColor=this.outlineColor,i.outlineWidth=this.outlineWidth,i.shadows=this.shadows,i.distanceDisplayCondition=this.distanceDisplayCondition,i):new l(this)},l.prototype.merge=function(e){if(!t(e))throw new o("source is required.");this.heightReference=i(this.heightReference,e.heightReference),this.dimensions=i(this.dimensions,e.dimensions),this.show=i(this.show,e.show),this.material=i(this.material,e.material),this.fill=i(this.fill,e.fill),this.outline=i(this.outline,e.outline),this.outlineColor=i(this.outlineColor,e.outlineColor),this.outlineWidth=i(this.outlineWidth,e.outlineWidth),this.shadows=i(this.shadows,e.shadows),this.distanceDisplayCondition=i(this.distanceDisplayCondition,e.distanceDisplayCondition)},l});