define(["./Check","./defaultValue","./defined","./defineProperties","./DeveloperError","./Math","./PerspectiveOffCenterFrustum"],function(t,e,f,o,i,s,r){"use strict";function a(t){t=e(t,e.EMPTY_OBJECT),this._offCenterFrustum=new r,this.fov=t.fov,this._fov=void 0,this._fovy=void 0,this._sseDenominator=void 0,this.aspectRatio=t.aspectRatio,this._aspectRatio=void 0,this.near=e(t.near,1),this._near=this.near,this.far=e(t.far,5e8),this._far=this.far,this.xOffset=e(t.xOffset,0),this._xOffset=this.xOffset,this.yOffset=e(t.yOffset,0),this._yOffset=this.yOffset}function n(t){if(!(f(t.fov)&&f(t.aspectRatio)&&f(t.near)&&f(t.far)))throw new i("fov, aspectRatio, near, or far parameters are not set.");var e=t._offCenterFrustum;if(t.fov!==t._fov||t.aspectRatio!==t._aspectRatio||t.near!==t._near||t.far!==t._far||t.xOffset!==t._xOffset||t.yOffset!==t._yOffset){if(t.fov<0||t.fov>=Math.PI)throw new i("fov must be in the range [0, PI).");if(t.aspectRatio<0)throw new i("aspectRatio must be positive.");if(t.near<0||t.near>t.far)throw new i("near must be greater than zero and less than far.");t._aspectRatio=t.aspectRatio,t._fov=t.fov,t._fovy=t.aspectRatio<=1?t.fov:2*Math.atan(Math.tan(.5*t.fov)/t.aspectRatio),t._near=t.near,t._far=t.far,t._sseDenominator=2*Math.tan(.5*t._fovy),t._xOffset=t.xOffset,t._yOffset=t.yOffset,e.top=t.near*Math.tan(.5*t._fovy),e.bottom=-e.top,e.right=t.aspectRatio*e.top,e.left=-e.right,e.near=t.near,e.far=t.far,e.right+=t.xOffset,e.left+=t.xOffset,e.top+=t.yOffset,e.bottom+=t.yOffset}}return a.packedLength=6,a.pack=function(f,o,i){return t.typeOf.object("value",f),t.defined("array",o),i=e(i,0),o[i++]=f.fov,o[i++]=f.aspectRatio,o[i++]=f.near,o[i++]=f.far,o[i++]=f.xOffset,o[i]=f.yOffset,o},a.unpack=function(o,i,s){return t.defined("array",o),i=e(i,0),f(s)||(s=new a),s.fov=o[i++],s.aspectRatio=o[i++],s.near=o[i++],s.far=o[i++],s.xOffset=o[i++],s.yOffset=o[i],s},o(a.prototype,{projectionMatrix:{get:function(){return n(this),this._offCenterFrustum.projectionMatrix}},infiniteProjectionMatrix:{get:function(){return n(this),this._offCenterFrustum.infiniteProjectionMatrix}},fovy:{get:function(){return n(this),this._fovy}},sseDenominator:{get:function(){return n(this),this._sseDenominator}}}),a.prototype.computeCullingVolume=function(t,e,f){return n(this),this._offCenterFrustum.computeCullingVolume(t,e,f)},a.prototype.getPixelDimensions=function(t,e,f,o){return n(this),this._offCenterFrustum.getPixelDimensions(t,e,f,o)},a.prototype.clone=function(t){return f(t)||(t=new a),t.aspectRatio=this.aspectRatio,t.fov=this.fov,t.near=this.near,t.far=this.far,t._aspectRatio=void 0,t._fov=void 0,t._near=void 0,t._far=void 0,this._offCenterFrustum.clone(t._offCenterFrustum),t},a.prototype.equals=function(t){return!!(f(t)&&t instanceof a)&&(n(this),n(t),this.fov===t.fov&&this.aspectRatio===t.aspectRatio&&this._offCenterFrustum.equals(t._offCenterFrustum))},a.prototype.equalsEpsilon=function(t,e,o){return!!(f(t)&&t instanceof a)&&(n(this),n(t),s.equalsEpsilon(this.fov,t.fov,e,o)&&s.equalsEpsilon(this.aspectRatio,t.aspectRatio,e,o)&&this._offCenterFrustum.equalsEpsilon(t._offCenterFrustum,e,o))},a});