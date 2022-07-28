define(["../Core/Cartesian3","../Core/Check","../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/DeveloperError","../Core/Event","../Core/ReferenceFrame","./PositionProperty","./Property","./SampledProperty"],function(e,t,r,n,o,i,a,p,s,f,u){"use strict";function d(t,n){var o;if((n=r(n,0))>0){o=new Array(n);for(var i=0;i<n;i++)o[i]=e}this._numberOfDerivatives=n,this._property=new u(e,o),this._definitionChanged=new a,this._referenceFrame=r(t,p.FIXED),this._property._definitionChanged.addEventListener(function(){this._definitionChanged.raiseEvent(this)},this)}return o(d.prototype,{isConstant:{get:function(){return this._property.isConstant}},definitionChanged:{get:function(){return this._definitionChanged}},referenceFrame:{get:function(){return this._referenceFrame}},interpolationDegree:{get:function(){return this._property.interpolationDegree}},interpolationAlgorithm:{get:function(){return this._property.interpolationAlgorithm}},numberOfDerivatives:{get:function(){return this._numberOfDerivatives}},forwardExtrapolationType:{get:function(){return this._property.forwardExtrapolationType},set:function(e){this._property.forwardExtrapolationType=e}},forwardExtrapolationDuration:{get:function(){return this._property.forwardExtrapolationDuration},set:function(e){this._property.forwardExtrapolationDuration=e}},backwardExtrapolationType:{get:function(){return this._property.backwardExtrapolationType},set:function(e){this._property.backwardExtrapolationType=e}},backwardExtrapolationDuration:{get:function(){return this._property.backwardExtrapolationDuration},set:function(e){this._property.backwardExtrapolationDuration=e}}}),d.prototype.getValue=function(e,t){return this.getValueInReferenceFrame(e,p.FIXED,t)},d.prototype.getValueInReferenceFrame=function(e,r,o){if(t.defined("time",e),t.defined("referenceFrame",r),o=this._property.getValue(e,o),n(o))return s.convertToReferenceFrame(e,o,this._referenceFrame,r,o)},d.prototype.setInterpolationOptions=function(e){this._property.setInterpolationOptions(e)},d.prototype.addSample=function(e,t,r){var o=this._numberOfDerivatives;if(o>0&&(!n(r)||r.length!==o))throw new i("derivatives length must be equal to the number of derivatives.");this._property.addSample(e,t,r)},d.prototype.addSamples=function(e,t,r){this._property.addSamples(e,t,r)},d.prototype.addSamplesPackedArray=function(e,t){this._property.addSamplesPackedArray(e,t)},d.prototype.removeSample=function(e){this._property.removeSample(e)},d.prototype.removeSamples=function(e){this._property.removeSamples(e)},d.prototype.equals=function(e){return this===e||e instanceof d&&f.equals(this._property,e._property)&&this._referenceFrame===e._referenceFrame},d});