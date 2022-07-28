define(["../Core/Cartesian3","../Core/Cartesian4","../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/destroyObject","../Core/Ellipsoid","../Core/EllipsoidGeometry","../Core/GeometryPipeline","../Core/Math","../Core/VertexFormat","../Renderer/BufferUsage","../Renderer/DrawCommand","../Renderer/RenderState","../Renderer/ShaderProgram","../Renderer/ShaderSource","../Renderer/VertexArray","../Shaders/SkyAtmosphereFS","../Shaders/SkyAtmosphereVS","./BlendingState","./CullFace","./SceneMode"],function(e,r,t,o,s,i,a,n,h,m,S,c,p,d,u,y,C,_,l,A,f,F){"use strict";function k(o){o=t(o,a.WGS84),this.show=!0,this._ellipsoid=o,this._command=new p({owner:this}),this._spSkyFromSpace=void 0,this._spSkyFromAtmosphere=void 0,this._spSkyFromSpaceColorCorrect=void 0,this._spSkyFromAtmosphereColorCorrect=void 0,this.hueShift=0,this.saturationShift=0,this.brightnessShift=0,this._hueSaturationBrightness=new e;var s=new r;s.w=0,s.y=e.maximumComponent(e.multiplyByScalar(o.radii,1.025,new e)),s.z=o.maximumRadius,this._cameraAndRadiiAndDynamicAtmosphereColor=s;var i=this;this._command.uniformMap={u_cameraAndRadiiAndDynamicAtmosphereColor:function(){return i._cameraAndRadiiAndDynamicAtmosphereColor},u_hsbShift:function(){return i._hueSaturationBrightness.x=i.hueShift,i._hueSaturationBrightness.y=i.saturationShift,i._hueSaturationBrightness.z=i.brightnessShift,i._hueSaturationBrightness}}}return s(k.prototype,{ellipsoid:{get:function(){return this._ellipsoid}}}),k.prototype.setDynamicAtmosphereColor=function(e){this._cameraAndRadiiAndDynamicAtmosphereColor.w=e?1:0},k.prototype.update=function(r){if(this.show){var t=r.mode;if((t===F.SCENE3D||t===F.MORPHING)&&r.passes.render){var s=this._command;if(!o(s.vertexArray)){var i=r.context,a=n.createGeometry(new n({radii:e.multiplyByScalar(this._ellipsoid.radii,1.025,new e),slicePartitions:256,stackPartitions:256,vertexFormat:S.POSITION_ONLY}));s.vertexArray=C.fromGeometry({context:i,geometry:a,attributeLocations:h.createAttributeLocations(a),bufferUsage:c.STATIC_DRAW}),s.renderState=d.fromCache({cull:{enabled:!0,face:f.FRONT},blending:A.ALPHA_BLEND,depthMask:!1});var p=new y({defines:["SKY_FROM_SPACE"],sources:[l]});this._spSkyFromSpace=u.fromCache({context:i,vertexShaderSource:p,fragmentShaderSource:_}),p=new y({defines:["SKY_FROM_ATMOSPHERE"],sources:[l]}),this._spSkyFromAtmosphere=u.fromCache({context:i,vertexShaderSource:p,fragmentShaderSource:_})}var k,R=(k=this,!(m.equalsEpsilon(k.hueShift,0,m.EPSILON7)&&m.equalsEpsilon(k.saturationShift,0,m.EPSILON7)&&m.equalsEpsilon(k.brightnessShift,0,m.EPSILON7)));if(R&&(!o(this._spSkyFromSpaceColorCorrect)||!o(this._spSkyFromAtmosphereColorCorrect))){var v=r.context,x=new y({defines:["SKY_FROM_SPACE"],sources:[l]}),g=new y({defines:["COLOR_CORRECT"],sources:[_]});this._spSkyFromSpaceColorCorrect=u.fromCache({context:v,vertexShaderSource:x,fragmentShaderSource:g}),x=new y({defines:["SKY_FROM_ATMOSPHERE"],sources:[l]}),this._spSkyFromAtmosphereColorCorrect=u.fromCache({context:v,vertexShaderSource:x,fragmentShaderSource:g})}var E=r.camera.positionWC,O=e.magnitude(E);return this._cameraAndRadiiAndDynamicAtmosphereColor.x=O,O>this._cameraAndRadiiAndDynamicAtmosphereColor.y?s.shaderProgram=R?this._spSkyFromSpaceColorCorrect:this._spSkyFromSpace:s.shaderProgram=R?this._spSkyFromAtmosphereColorCorrect:this._spSkyFromAtmosphere,s}}},k.prototype.isDestroyed=function(){return!1},k.prototype.destroy=function(){var e=this._command;return e.vertexArray=e.vertexArray&&e.vertexArray.destroy(),this._spSkyFromSpace=this._spSkyFromSpace&&this._spSkyFromSpace.destroy(),this._spSkyFromAtmosphere=this._spSkyFromAtmosphere&&this._spSkyFromAtmosphere.destroy(),this._spSkyFromSpaceColorCorrect=this._spSkyFromSpaceColorCorrect&&this._spSkyFromSpaceColorCorrect.destroy(),this._spSkyFromAtmosphereColorCorrect=this._spSkyFromAtmosphereColorCorrect&&this._spSkyFromAtmosphereColorCorrect.destroy(),i(this)},k});