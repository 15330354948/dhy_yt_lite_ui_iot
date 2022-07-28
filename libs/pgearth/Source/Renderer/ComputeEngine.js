define(["../Core/BoundingRectangle","../Core/Check","../Core/Color","../Core/defined","../Core/destroyObject","../Core/DeveloperError","../Core/PrimitiveType","../Shaders/ViewportQuadVS","./ClearCommand","./DrawCommand","./Framebuffer","./RenderState","./ShaderProgram"],function(e,r,t,o,n,a,u,i,d,c,m,p,s){"use strict";function f(e){this._context=e}var h,x=new c({primitiveType:u.TRIANGLES}),C=new d({color:new t(0,0,0,0)});return f.prototype.execute=function(t){if(r.defined("computeCommand",t),o(t.preExecute)&&t.preExecute(t),!o(t.fragmentShaderSource)&&!o(t.shaderProgram))throw new a("computeCommand.fragmentShaderSource or computeCommand.shaderProgram is required.");r.defined("computeCommand.outputTexture",t.outputTexture);var n=t.outputTexture,u=n.width,d=n.height,c=this._context,f=o(t.vertexArray)?t.vertexArray:c.getViewportQuadVertexArray(),y=o(t.shaderProgram)?t.shaderProgram:function(e,r){return s.fromCache({context:e,vertexShaderSource:i,fragmentShaderSource:r,attributeLocations:{position:0,textureCoordinates:1}})}(c,t.fragmentShaderSource),S=function(e,r){return new m({context:e,colorTextures:[r],destroyAttachments:!1})}(c,n),g=function(r,t){return o(h)&&h.viewport.width===r&&h.viewport.height===t||(h=p.fromCache({viewport:new e(0,0,r,t)})),h}(u,d),w=t.uniformMap,v=C;v.framebuffer=S,v.renderState=g,v.execute(c);var A=x;A.vertexArray=f,A.renderState=g,A.shaderProgram=y,A.uniformMap=w,A.framebuffer=S,A.execute(c),S.destroy(),t.persists||(y.destroy(),o(t.vertexArray)&&f.destroy()),o(t.postExecute)&&t.postExecute(n)},f.prototype.isDestroyed=function(){return!1},f.prototype.destroy=function(){return n(this)},f});