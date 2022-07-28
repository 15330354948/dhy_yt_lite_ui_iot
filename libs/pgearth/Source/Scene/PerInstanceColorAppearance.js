define(["../Core/defaultValue","../Core/defineProperties","../Core/VertexFormat","../Shaders/Appearances/PerInstanceColorAppearanceFS","../Shaders/Appearances/PerInstanceColorAppearanceVS","../Shaders/Appearances/PerInstanceFlatColorAppearanceFS","../Shaders/Appearances/PerInstanceFlatColorAppearanceVS","./Appearance"],function(e,r,t,a,n,o,c,s){"use strict";function S(r){r=e(r,e.EMPTY_OBJECT);var t=e(r.translucent,!0),u=e(r.closed,!1),d=e(r.flat,!1),i=d?c:n,p=d?o:a,h=d?S.FLAT_VERTEX_FORMAT:S.VERTEX_FORMAT;this.material=void 0,this.translucent=t,this._vertexShaderSource=e(r.vertexShaderSource,i),this._fragmentShaderSource=e(r.fragmentShaderSource,p),this._renderState=s.getDefaultRenderState(t,u,r.renderState),this._closed=u,this._vertexFormat=h,this._flat=d,this._faceForward=e(r.faceForward,!u)}return r(S.prototype,{vertexShaderSource:{get:function(){return this._vertexShaderSource}},fragmentShaderSource:{get:function(){return this._fragmentShaderSource}},renderState:{get:function(){return this._renderState}},closed:{get:function(){return this._closed}},vertexFormat:{get:function(){return this._vertexFormat}},flat:{get:function(){return this._flat}},faceForward:{get:function(){return this._faceForward}}}),S.VERTEX_FORMAT=t.POSITION_AND_NORMAL,S.FLAT_VERTEX_FORMAT=t.POSITION_ONLY,S.prototype.getFragmentShaderSource=s.prototype.getFragmentShaderSource,S.prototype.isTranslucent=s.prototype.isTranslucent,S.prototype.getRenderState=s.prototype.getRenderState,S});