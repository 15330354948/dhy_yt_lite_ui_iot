define(["../Core/defined","../Core/defineProperties","../Core/DeveloperError","../Core/Event","../Core/RuntimeError","./Property"],function(t,e,r,n,i,o){"use strict";function a(e){var r=e._targetProperty;if(e._resolveProperty){var n=function(e){var r=!0;if(e._resolveEntity){var n=e._targetCollection.getById(e._targetId);if(t(n)?(n.definitionChanged.addEventListener(s.prototype._onTargetEntityDefinitionChanged,e),e._targetEntity=n,e._resolveEntity=!1):(n=e._targetEntity,r=!1),!t(n))throw new i('target entity "'+e._targetId+'" could not be resolved.')}return r}(e),o=e._targetPropertyNames;r=e._targetEntity;for(var a=o.length,g=0;g<a&&t(r);g++)r=r[o[g]];if(t(r))e._targetProperty=r,e._resolveProperty=!n;else if(!t(e._targetProperty))throw new i('targetProperty "'+e._targetId+"."+o.join(".")+'" could not be resolved.')}return r}function s(e,i,o){if(!t(e))throw new r("targetCollection is required.");if(!t(i)||""===i)throw new r("targetId is required.");if(!t(o)||0===o.length)throw new r("targetPropertyNames is required.");for(var a=0;a<o.length;a++){var g=o[a];if(!t(g)||""===g)throw new r("reference contains invalid properties.")}this._targetCollection=e,this._targetId=i,this._targetPropertyNames=o,this._targetProperty=void 0,this._targetEntity=void 0,this._definitionChanged=new n,this._resolveEntity=!0,this._resolveProperty=!0,e.collectionChanged.addEventListener(s.prototype._onCollectionChanged,this)}return e(s.prototype,{isConstant:{get:function(){return o.isConstant(a(this))}},definitionChanged:{get:function(){return this._definitionChanged}},referenceFrame:{get:function(){return a(this).referenceFrame}},targetId:{get:function(){return this._targetId}},targetCollection:{get:function(){return this._targetCollection}},targetPropertyNames:{get:function(){return this._targetPropertyNames}},resolvedProperty:{get:function(){return a(this)}}}),s.fromString=function(e,n){if(!t(e))throw new r("targetCollection is required.");if(!t(n))throw new r("referenceString is required.");for(var i,o=[],a=!0,g=!1,h="",f=0;f<n.length;++f){var l=n.charAt(f);g?(h+=l,g=!1):"\\"===l?g=!0:a&&"#"===l?(i=h,a=!1,h=""):a||"."!==l?h+=l:(o.push(h),h="")}return o.push(h),new s(e,i,o)},s.prototype.getValue=function(t,e){return a(this).getValue(t,e)},s.prototype.getValueInReferenceFrame=function(t,e,r){return a(this).getValueInReferenceFrame(t,e,r)},s.prototype.getType=function(t){return a(this).getType(t)},s.prototype.equals=function(t){if(this===t)return!0;var e=this._targetPropertyNames,r=t._targetPropertyNames;if(this._targetCollection!==t._targetCollection||this._targetId!==t._targetId||e.length!==r.length)return!1;for(var n=this._targetPropertyNames.length,i=0;i<n;i++)if(e[i]!==r[i])return!1;return!0},s.prototype._onTargetEntityDefinitionChanged=function(t,e,r,n){this._targetPropertyNames[0]===e&&(this._resolveProperty=!0,this._definitionChanged.raiseEvent(this))},s.prototype._onCollectionChanged=function(e,r,n){var i=this._targetEntity;t(i)&&(-1!==n.indexOf(i)?(i.definitionChanged.removeEventListener(s.prototype._onTargetEntityDefinitionChanged,this),this._resolveEntity=!0,this._resolveProperty=!0):this._resolveEntity&&(a(this),this._resolveEntity||this._definitionChanged.raiseEvent(this)))},s});