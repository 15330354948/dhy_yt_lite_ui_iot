define(["../Core/BoxGeometry","../Core/Cartesian3","../Core/defaultValue","../Core/defined","../Core/destroyObject","../Core/DeveloperError","../Core/GeometryPipeline","../Core/Matrix4","../Core/VertexFormat","../Renderer/BufferUsage","../Renderer/CubeMap","../Renderer/DrawCommand","../Renderer/loadCubeMap","../Renderer/RenderState","../Renderer/ShaderProgram","../Renderer/ShaderSource","../Renderer/VertexArray","../Shaders/SkyBoxFS","../Shaders/SkyBoxVS","./BlendingState","./SceneMode"],function(e,t,r,o,i,s,a,n,u,c,d,p,h,v,f,y,m,_,b,g,M){"use strict";function S(e){this.sources=e.sources,this._sources=void 0,this.show=r(e.show,!0),this._command=new p({modelMatrix:n.clone(n.IDENTITY),owner:this}),this._cubeMap=void 0,this._attributeLocations=void 0,this._useHdr=void 0}return S.prototype.update=function(r,i){var n=this;if(this.show&&(r.mode===M.SCENE3D||r.mode===M.MORPHING)&&r.passes.render){var p=r.context;if(this._sources!==this.sources){this._sources=this.sources;var S=this.sources;if(!(o(S.positiveX)&&o(S.negativeX)&&o(S.positiveY)&&o(S.negativeY)&&o(S.positiveZ)&&o(S.negativeZ)))throw new s("this.sources is required and must have positiveX, negativeX, positiveY, negativeY, positiveZ, and negativeZ properties.");if(typeof S.positiveX!=typeof S.negativeX||typeof S.positiveX!=typeof S.positiveY||typeof S.positiveX!=typeof S.negativeY||typeof S.positiveX!=typeof S.positiveZ||typeof S.positiveX!=typeof S.negativeZ)throw new s("this.sources properties must all be the same type.");"string"==typeof S.positiveX?h(p,this._sources).then(function(e){n._cubeMap=n._cubeMap&&n._cubeMap.destroy(),n._cubeMap=e}):(this._cubeMap=this._cubeMap&&this._cubeMap.destroy(),this._cubeMap=new d({context:p,source:S}))}var x=this._command;if(!o(x.vertexArray)){x.uniformMap={u_cubeMap:function(){return n._cubeMap}};var C=e.createGeometry(e.fromDimensions({dimensions:new t(2,2,2),vertexFormat:u.POSITION_ONLY})),w=this._attributeLocations=a.createAttributeLocations(C);x.vertexArray=m.fromGeometry({context:p,geometry:C,attributeLocations:w,bufferUsage:c.STATIC_DRAW}),x.renderState=v.fromCache({blending:g.ALPHA_BLEND})}if(!o(x.shaderProgram)||this._useHdr!==i){var R=new y({defines:[i?"HDR":""],sources:[_]});x.shaderProgram=f.fromCache({context:p,vertexShaderSource:b,fragmentShaderSource:R,attributeLocations:this._attributeLocations}),this._useHdr=i}if(o(this._cubeMap))return x}},S.prototype.isDestroyed=function(){return!1},S.prototype.destroy=function(){var e=this._command;return e.vertexArray=e.vertexArray&&e.vertexArray.destroy(),e.shaderProgram=e.shaderProgram&&e.shaderProgram.destroy(),this._cubeMap=this._cubeMap&&this._cubeMap.destroy(),i(this)},S});