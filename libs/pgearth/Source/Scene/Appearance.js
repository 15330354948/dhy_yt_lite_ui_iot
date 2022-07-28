define(["../Core/clone","../Core/combine","../Core/defaultValue","../Core/defined","../Core/defineProperties","./BlendingState","./CullFace"],function(e,t,r,n,a,i,s){"use strict";function u(e){e=r(e,r.EMPTY_OBJECT),this.material=e.material,this.translucent=r(e.translucent,!0),this._vertexShaderSource=e.vertexShaderSource,this._fragmentShaderSource=e.fragmentShaderSource,this._renderState=e.renderState,this._closed=r(e.closed,!1)}return a(u.prototype,{vertexShaderSource:{get:function(){return this._vertexShaderSource}},fragmentShaderSource:{get:function(){return this._fragmentShaderSource}},renderState:{get:function(){return this._renderState}},closed:{get:function(){return this._closed}}}),u.prototype.getFragmentShaderSource=function(){var e=[];return this.flat&&e.push("#define FLAT"),this.faceForward&&e.push("#define FACE_FORWARD"),n(this.material)&&e.push(this.material.shaderSource),e.push(this.fragmentShaderSource),e.join("\n")},u.prototype.isTranslucent=function(){return n(this.material)&&this.material.isTranslucent()||!n(this.material)&&this.translucent},u.prototype.getRenderState=function(){var t=this.isTranslucent(),r=e(this.renderState,!1);return t?(r.depthMask=!1,r.blending=i.ALPHA_BLEND):r.depthMask=!0,r},u.getDefaultRenderState=function(e,r,a){var u={depthTest:{enabled:!0}};return e&&(u.depthMask=!1,u.blending=i.ALPHA_BLEND),r&&(u.cull={enabled:!0,face:s.BACK}),n(a)&&(u=t(a,u,!0)),u},u});