define(["../Core/BoundingRectangle","../Core/defined","../Core/defineProperties","../Core/destroyObject","../Core/PixelFormat","../Renderer/Framebuffer","../Renderer/PixelDatatype","../Renderer/RenderState","../Renderer/Sampler","../Renderer/Texture","../Renderer/TextureMagnificationFilter","../Renderer/TextureMinificationFilter","../Renderer/TextureWrap","../Shaders/BrdfLutGeneratorFS"],function(e,r,t,o,i,n,a,d,f,u,s,m,c,h){"use strict";function _(){this._framebuffer=void 0,this._colorTexture=void 0,this._drawCommand=void 0}return t(_.prototype,{colorTexture:{get:function(){return this._colorTexture}}}),_.prototype.update=function(t){if(!r(this._colorTexture)){var o=t.context;!function(e,r){var t=new u({context:r,width:256,height:256,pixelFormat:i.RGBA,pixelDatatype:a.UNSIGNED_BYTE,sampler:new f({wrapS:c.CLAMP_TO_EDGE,wrapT:c.CLAMP_TO_EDGE,minificationFilter:m.NEAREST,magnificationFilter:s.NEAREST})});e._colorTexture=t;var o=new n({context:r,colorTextures:[t],destroyAttachments:!1});e._framebuffer=o}(this,o),function(r,t){var o=r._framebuffer,i=t.createViewportQuadCommand(h,{framebuffer:o,renderState:d.fromCache({viewport:new e(0,0,256,256)})});r._drawCommand=i}(this,o),this._drawCommand.execute(o),this._framebuffer=this._framebuffer&&this._framebuffer.destroy(),this._drawCommand.shaderProgram=this._drawCommand.shaderProgram&&this._drawCommand.shaderProgram.destroy()}},_.prototype.isDestroyed=function(){return!1},_.prototype.destroy=function(){return this._colorTexture=this._colorTexture&&this._colorTexture.destroy(),o(this)},_});