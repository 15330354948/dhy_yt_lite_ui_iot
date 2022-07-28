define(["../Core/defaultValue","../Core/defineProperties","../Core/FeatureDetection","../Core/VertexFormat","../Shaders/Appearances/PerInstanceFlatColorAppearanceFS","../Shaders/Appearances/PolylineColorAppearanceVS","../Shaders/PolylineCommon","./Appearance"],function(e,t,r,n,a,o,S,c){"use strict";var i=S+"\n"+o,u=a;function s(t){t=e(t,e.EMPTY_OBJECT);var r=e(t.translucent,!0),n=s.VERTEX_FORMAT;this.material=void 0,this.translucent=r,this._vertexShaderSource=e(t.vertexShaderSource,i),this._fragmentShaderSource=e(t.fragmentShaderSource,u),this._renderState=c.getDefaultRenderState(r,!1,t.renderState),this._closed=!1,this._vertexFormat=n}return r.isInternetExplorer()||(i="#define CLIP_POLYLINE \n"+i),t(s.prototype,{vertexShaderSource:{get:function(){return this._vertexShaderSource}},fragmentShaderSource:{get:function(){return this._fragmentShaderSource}},renderState:{get:function(){return this._renderState}},closed:{get:function(){return this._closed}},vertexFormat:{get:function(){return this._vertexFormat}}}),s.VERTEX_FORMAT=n.POSITION_ONLY,s.prototype.getFragmentShaderSource=c.prototype.getFragmentShaderSource,s.prototype.isTranslucent=c.prototype.isTranslucent,s.prototype.getRenderState=c.prototype.getRenderState,s});