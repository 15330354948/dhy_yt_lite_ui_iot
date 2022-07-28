define(["../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/VertexFormat","../Shaders/Appearances/EllipsoidSurfaceAppearanceFS","../Shaders/Appearances/EllipsoidSurfaceAppearanceVS","./Appearance","./Material"],function(e,t,r,a,n,o,u,i){"use strict";function c(r){r=e(r,e.EMPTY_OBJECT);var a=e(r.translucent,!0),c=e(r.aboveGround,!1);this.material=t(r.material)?r.material:i.fromType(i.ColorType),this.translucent=e(r.translucent,!0),this._vertexShaderSource=e(r.vertexShaderSource,o),this._fragmentShaderSource=e(r.fragmentShaderSource,n),this._renderState=u.getDefaultRenderState(a,!c,r.renderState),this._closed=!1,this._flat=e(r.flat,!1),this._faceForward=e(r.faceForward,c),this._aboveGround=c}return r(c.prototype,{vertexShaderSource:{get:function(){return this._vertexShaderSource}},fragmentShaderSource:{get:function(){return this._fragmentShaderSource}},renderState:{get:function(){return this._renderState}},closed:{get:function(){return this._closed}},vertexFormat:{get:function(){return c.VERTEX_FORMAT}},flat:{get:function(){return this._flat}},faceForward:{get:function(){return this._faceForward}},aboveGround:{get:function(){return this._aboveGround}}}),c.VERTEX_FORMAT=a.POSITION_AND_ST,c.prototype.getFragmentShaderSource=u.prototype.getFragmentShaderSource,c.prototype.isTranslucent=u.prototype.isTranslucent,c.prototype.getRenderState=u.prototype.getRenderState,c});