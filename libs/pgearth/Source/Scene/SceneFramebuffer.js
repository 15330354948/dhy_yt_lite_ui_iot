define(["../Core/Color","../Core/defined","../Core/destroyObject","../Core/PixelFormat","../Renderer/ClearCommand","../Renderer/Framebuffer","../Renderer/PixelDatatype","../Renderer/Renderbuffer","../Renderer/RenderbufferFormat","../Renderer/RenderState","../Renderer/Sampler","../Renderer/Texture","../Renderer/TextureMagnificationFilter","../Renderer/TextureMinificationFilter","../Renderer/TextureWrap"],function(e,t,r,i,d,n,o,f,u,h,_,a,c,l,p){"use strict";function T(){this._colorTexture=void 0,this._idTexture=void 0,this._depthStencilTexture=void 0,this._depthStencilRenderbuffer=void 0,this._framebuffer=void 0,this._idFramebuffer=void 0,this._idClearColor=new e(0,0,0,0),this._useHdr=void 0,this._clearCommand=new d({color:new e(0,0,0,0),depth:1,owner:this})}function s(e){e._framebuffer=e._framebuffer&&e._framebuffer.destroy(),e._idFramebuffer=e._idFramebuffer&&e._idFramebuffer.destroy(),e._colorTexture=e._colorTexture&&e._colorTexture.destroy(),e._idTexture=e._idTexture&&e._idTexture.destroy(),e._depthStencilTexture=e._depthStencilTexture&&e._depthStencilTexture.destroy(),e._depthStencilRenderbuffer=e._depthStencilRenderbuffer&&e._depthStencilRenderbuffer.destroy(),e._depthStencilIdTexture=e._depthStencilIdTexture&&e._depthStencilIdTexture.destroy(),e._depthStencilIdRenderbuffer=e._depthStencilIdRenderbuffer&&e._depthStencilIdRenderbuffer.destroy(),e._framebuffer=void 0,e._idFramebuffer=void 0,e._colorTexture=void 0,e._idTexture=void 0,e._depthStencilTexture=void 0,e._depthStencilRenderbuffer=void 0,e._depthStencilIdTexture=void 0,e._depthStencilIdRenderbuffer=void 0}return T.prototype.update=function(e,r,d){var h=r.width,T=r.height,m=this._colorTexture;if(!t(m)||m.width!==h||m.height!==T||d!==this._useHdr){s(this),this._useHdr=d;var x=d?e.halfFloatingPointTexture?o.HALF_FLOAT:o.FLOAT:o.UNSIGNED_BYTE;this._colorTexture=new a({context:e,width:h,height:T,pixelFormat:i.RGBA,pixelDatatype:x,sampler:new _({wrapS:p.CLAMP_TO_EDGE,wrapT:p.CLAMP_TO_EDGE,minificationFilter:l.NEAREST,magnificationFilter:c.NEAREST})}),this._idTexture=new a({context:e,width:h,height:T,pixelFormat:i.RGBA,pixelDatatype:o.UNSIGNED_BYTE,sampler:new _({wrapS:p.CLAMP_TO_EDGE,wrapT:p.CLAMP_TO_EDGE,minificationFilter:l.NEAREST,magnificationFilter:c.NEAREST})}),e.depthTexture?(this._depthStencilTexture=new a({context:e,width:h,height:T,pixelFormat:i.DEPTH_STENCIL,pixelDatatype:o.UNSIGNED_INT_24_8,sampler:new _({wrapS:p.CLAMP_TO_EDGE,wrapT:p.CLAMP_TO_EDGE,minificationFilter:l.NEAREST,magnificationFilter:c.NEAREST})}),this._depthStencilIdTexture=new a({context:e,width:h,height:T,pixelFormat:i.DEPTH_STENCIL,pixelDatatype:o.UNSIGNED_INT_24_8,sampler:new _({wrapS:p.CLAMP_TO_EDGE,wrapT:p.CLAMP_TO_EDGE,minificationFilter:l.NEAREST,magnificationFilter:c.NEAREST})})):(this._depthStencilRenderbuffer=new f({context:e,width:h,height:T,format:u.DEPTH_STENCIL}),this._depthStencilIdRenderbuffer=new f({context:e,width:h,height:T,format:u.DEPTH_STENCIL})),this._framebuffer=new n({context:e,colorTextures:[this._colorTexture],depthStencilTexture:this._depthStencilTexture,depthStencilRenderbuffer:this._depthStencilRenderbuffer,destroyAttachments:!1}),this._idFramebuffer=new n({context:e,colorTextures:[this._idTexture],depthStencilTexture:this._depthStencilIdTexture,depthStencilRenderbuffer:this._depthStencilIdRenderbuffer,destroyAttachments:!1})}},T.prototype.clear=function(t,r,i){var d=r.framebuffer;r.framebuffer=this._framebuffer,e.clone(i,this._clearCommand.color),this._clearCommand.execute(t,r),r.framebuffer=this._idFramebuffer,e.clone(this._idClearColor,this._clearCommand.color),this._clearCommand.execute(t,r),r.framebuffer=d},T.prototype.getFramebuffer=function(){return this._framebuffer},T.prototype.getIdFramebuffer=function(){return this._idFramebuffer},T.prototype.isDestroyed=function(){return!1},T.prototype.destroy=function(){return s(this),r(this)},T});