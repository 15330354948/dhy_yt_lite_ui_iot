define(["../Core/Color","../Core/defined","../Core/defineProperties","../Core/destroyObject","../Core/PixelFormat","../Renderer/ClearCommand","../Renderer/Framebuffer","../Renderer/PixelDatatype","../Renderer/RenderState","../Renderer/Sampler","../Renderer/ShaderSource","../Renderer/Texture","../Renderer/TextureMagnificationFilter","../Renderer/TextureMinificationFilter","../Renderer/TextureWrap","../Shaders/PostProcessStages/PassThrough","./BlendingState","./StencilConstants","./StencilFunction","./StencilOperation"],function(e,t,i,r,s,n,a,o,d,f,h,u,l,c,m,_,p,C,x,T){"use strict";function b(){this.previousFramebuffer=void 0,this._previousFramebuffer=void 0,this._texture=void 0,this._classifiedTexture=void 0,this._depthStencilTexture=void 0,this._fbo=void 0,this._fboClassified=void 0,this._rsUnclassified=void 0,this._rsClassified=void 0,this._unclassifiedCommand=void 0,this._classifiedCommand=void 0,this._translucentCommand=void 0,this._clearColorCommand=new n({color:new e(0,0,0,0),owner:this}),this._clearCommand=new n({color:new e(0,0,0,0),depth:1,stencil:0});var t=this;this._uniformMap={colorTexture:function(){return t._texture},depthTexture:function(){return t._depthStencilTexture},classifiedTexture:function(){return t._classifiedTexture}}}i(b.prototype,{unclassifiedCommand:{get:function(){return this._unclassifiedCommand}}}),b.isTranslucencySupported=function(e){return e.depthTexture&&e.fragmentDepth};var v={depthMask:!1,stencilTest:{enabled:!0,frontFunction:x.EQUAL,frontOperation:{fail:T.KEEP,zFail:T.KEEP,zPass:T.KEEP},backFunction:x.NEVER,reference:0,mask:C.CLASSIFICATION_MASK},blending:p.ALPHA_BLEND},g={depthMask:!1,stencilTest:{enabled:!0,frontFunction:x.NOT_EQUAL,frontOperation:{fail:T.KEEP,zFail:T.KEEP,zPass:T.KEEP},backFunction:x.NEVER,reference:0,mask:C.CLASSIFICATION_MASK},blending:p.ALPHA_BLEND},E={depthMask:!0,depthTest:{enabled:!0},stencilTest:C.setPGEarth3DTileBit(),stencilMask:C.PGEARTH_3D_TILE_MASK,blending:p.ALPHA_BLEND};return b.prototype.update=function(e){var i=this._texture,r=!t(i)||this.previousFramebuffer!==this._previousFramebuffer;this._previousFramebuffer=this.previousFramebuffer;var n,p,C=e.drawingBufferWidth,x=e.drawingBufferHeight,T=!t(i)||i.width!==C||i.height!==x;((T||r)&&(this._texture=this._texture&&this._texture.destroy(),this._classifiedTexture=this._classifiedTexture&&this._classifiedTexture.destroy(),this._depthStencilTexture=this._depthStencilTexture&&this._depthStencilTexture.destroy(),this._texture=new u({context:e,width:C,height:x,pixelFormat:s.RGBA,pixelDatatype:o.UNSIGNED_BYTE,sampler:new f({wrapS:m.CLAMP_TO_EDGE,wrapT:m.CLAMP_TO_EDGE,minificationFilter:c.LINEAR,magnificationFilter:l.LINEAR})}),t(this._previousFramebuffer)||(this._classifiedTexture=new u({context:e,width:C,height:x,pixelFormat:s.RGBA,pixelDatatype:o.UNSIGNED_BYTE,sampler:new f({wrapS:m.CLAMP_TO_EDGE,wrapT:m.CLAMP_TO_EDGE,minificationFilter:c.LINEAR,magnificationFilter:l.LINEAR})}),this._depthStencilTexture=new u({context:e,width:C,height:x,pixelFormat:s.DEPTH_STENCIL,pixelDatatype:o.UNSIGNED_INT_24_8}))),!t(this._fbo)||T||r)&&(this._fbo=this._fbo&&this._fbo.destroy(),this._fboClassified=this._fboClassified&&this._fboClassified.destroy(),t(this._previousFramebuffer)?(n=this._previousFramebuffer.depthStencilTexture,p=this._previousFramebuffer.depthStencilRenderbuffer):n=this._depthStencilTexture,this._fbo=new a({context:e,colorTextures:[this._texture],depthStencilTexture:n,depthStencilRenderbuffer:p,destroyAttachments:!1}),t(this._previousFramebuffer)||(this._fboClassified=new a({context:e,colorTextures:[this._classifiedTexture],depthStencilTexture:n,destroyAttachments:!1})));if(t(this._rsUnclassified)||(this._rsUnclassified=d.fromCache(v),this._rsClassified=d.fromCache(g),this._rsDefault=d.fromCache(E)),!t(this._unclassifiedCommand)||r){t(this._unclassifiedCommand)&&(this._unclassifiedCommand.shaderProgram=this._unclassifiedCommand.shaderProgram&&this._unclassifiedCommand.shaderProgram.destroy(),this._classifiedCommand.shaderProgram=this._classifiedCommand.shaderProgram&&this._classifiedCommand.shaderProgram.destroy());var b=t(this._previousFramebuffer)?"uniform sampler2D colorTexture;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\n    vec4 color = texture2D(colorTexture, v_textureCoordinates);\n    if (color.a == 0.0)\n    {\n        discard;\n    }\n#ifdef UNCLASSIFIED\n    gl_FragColor = color * czm_invertClassificationColor;\n#else\n    gl_FragColor = color;\n#endif\n}\n":"#extension GL_EXT_frag_depth : enable\nuniform sampler2D colorTexture;\nuniform sampler2D depthTexture;\nuniform sampler2D classifiedTexture;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\n    vec4 color = texture2D(colorTexture, v_textureCoordinates);\n    if (color.a == 0.0)\n    {\n        discard;\n    }\n    bool isClassified = all(equal(texture2D(classifiedTexture, v_textureCoordinates), vec4(0.0)));\n#ifdef UNCLASSIFIED\n    vec4 highlightColor = czm_invertClassificationColor;\n    if (isClassified)\n    {\n        discard;\n    }\n#else\n    vec4 highlightColor = vec4(1.0);\n    if (!isClassified)\n    {\n        discard;\n    }\n#endif\n    gl_FragColor = color * highlightColor;\n    gl_FragDepthEXT = texture2D(depthTexture, v_textureCoordinates).r;\n}\n",S=new h({defines:["UNCLASSIFIED"],sources:[b]}),F=new h({sources:[b]});this._unclassifiedCommand=e.createViewportQuadCommand(S,{renderState:t(this._previousFramebuffer)?this._rsUnclassified:this._rsDefault,uniformMap:this._uniformMap,owner:this}),this._classifiedCommand=e.createViewportQuadCommand(F,{renderState:t(this._previousFramebuffer)?this._rsClassified:this._rsDefault,uniformMap:this._uniformMap,owner:this}),t(this._translucentCommand)&&(this._translucentCommand.shaderProgram=this._translucentCommand.shaderProgram&&this._translucentCommand.shaderProgram.destroy()),t(this._previousFramebuffer)||(this._translucentCommand=e.createViewportQuadCommand(_,{renderState:this._rsUnclassified,uniformMap:this._uniformMap,owner:this}))}},b.prototype.clear=function(e,i){var r=i.framebuffer;t(this._previousFramebuffer)?(i.framebuffer=this._fbo,this._clearColorCommand.execute(e,i)):(i.framebuffer=this._fbo,this._clearCommand.execute(e,i),i.framebuffer=this._fboClassified,this._clearCommand.execute(e,i)),i.framebuffer=r},b.prototype.executeClassified=function(e,i){if(!t(this._previousFramebuffer)){var r=i.framebuffer;i.framebuffer=this._fboClassified,this._translucentCommand.execute(e,i),i.framebuffer=r}this._classifiedCommand.execute(e,i)},b.prototype.executeUnclassified=function(e,t){this._unclassifiedCommand.execute(e,t)},b.prototype.isDestroyed=function(){return!1},b.prototype.destroy=function(){return this._fbo=this._fbo&&this._fbo.destroy(),this._texture=this._texture&&this._texture.destroy(),this._depthStencilTexture=this._depthStencilTexture&&this._depthStencilTexture.destroy(),t(this._unclassifiedCommand)&&(this._unclassifiedCommand.shaderProgram=this._unclassifiedCommand.shaderProgram&&this._unclassifiedCommand.shaderProgram.destroy(),this._classifiedCommand.shaderProgram=this._classifiedCommand.shaderProgram&&this._classifiedCommand.shaderProgram.destroy()),r(this)},b});