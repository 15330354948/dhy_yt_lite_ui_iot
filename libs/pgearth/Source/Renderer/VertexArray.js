define(["../Core/Check","../Core/ComponentDatatype","../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/destroyObject","../Core/DeveloperError","../Core/Geometry","../Core/IndexDatatype","../Core/Math","../Core/RuntimeError","./Buffer","./BufferUsage","./ContextLimits"],function(e,t,r,n,i,a,o,s,u,f,v,c,h,y){"use strict";function b(e,i,a,s){var u=n(i.vertexBuffer),f=n(i.value),v=i.value?i.value.length:i.componentsPerAttribute;if(!u&&!f)throw new o("attribute must have a vertexBuffer or a value.");if(u&&f)throw new o("attribute cannot have both a vertexBuffer and a value.  It must have either a vertexBuffer property defining per-vertex data or a value property defining data for all vertices.");if(1!==v&&2!==v&&3!==v&&4!==v){if(f)throw new o("attribute.value.length must be in the range [1, 4].");throw new o("attribute.componentsPerAttribute must be in the range [1, 4].")}if(n(i.componentDatatype)&&!t.validate(i.componentDatatype))throw new o("attribute must have a valid componentDatatype or not specify it.");if(n(i.strideInBytes)&&i.strideInBytes>255)throw new o("attribute must have a strideInBytes less than or equal to 255 or not specify it.");if(n(i.instanceDivisor)&&i.instanceDivisor>0&&!s.instancedArrays)throw new o("instanced arrays is not supported");if(n(i.instanceDivisor)&&i.instanceDivisor<0)throw new o("attribute must have an instanceDivisor greater than or equal to zero");if(n(i.instanceDivisor)&&f)throw new o("attribute cannot have have an instanceDivisor if it is not backed by a buffer");if(n(i.instanceDivisor)&&i.instanceDivisor>0&&0===i.index)throw new o("attribute zero cannot have an instanceDivisor greater than 0");var c={index:r(i.index,a),enabled:r(i.enabled,!0),vertexBuffer:i.vertexBuffer,value:f?i.value.slice(0):void 0,componentsPerAttribute:v,componentDatatype:r(i.componentDatatype,t.FLOAT),normalize:r(i.normalize,!1),offsetInBytes:r(i.offsetInBytes,0),strideInBytes:r(i.strideInBytes,0),instanceDivisor:r(i.instanceDivisor,0)};if(u)c.vertexAttrib=function(e){var t=this.index;e.bindBuffer(e.ARRAY_BUFFER,this.vertexBuffer._getBuffer()),e.vertexAttribPointer(t,this.componentsPerAttribute,this.componentDatatype,this.normalize,this.strideInBytes,this.offsetInBytes),e.enableVertexAttribArray(t),this.instanceDivisor>0&&(s.glVertexAttribDivisor(t,this.instanceDivisor),s._vertexAttribDivisors[t]=this.instanceDivisor,s._previousDrawInstanced=!0)},c.disableVertexAttribArray=function(e){e.disableVertexAttribArray(this.index),this.instanceDivisor>0&&s.glVertexAttribDivisor(a,0)};else{switch(c.componentsPerAttribute){case 1:c.vertexAttrib=function(e){e.vertexAttrib1fv(this.index,this.value)};break;case 2:c.vertexAttrib=function(e){e.vertexAttrib2fv(this.index,this.value)};break;case 3:c.vertexAttrib=function(e){e.vertexAttrib3fv(this.index,this.value)};break;case 4:c.vertexAttrib=function(e){e.vertexAttrib4fv(this.index,this.value)}}c.disableVertexAttribArray=function(e){}}e.push(c)}function d(e,t,r){for(var i=0;i<t.length;++i){var a=t[i];a.enabled&&a.vertexAttrib(e)}n(r)&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,r._getBuffer())}function p(i){i=r(i,r.EMPTY_OBJECT),e.defined("options.context",i.context),e.defined("options.attributes",i.attributes);var a,s=i.context,u=s._gl,f=i.attributes,v=i.indexBuffer,c=[],h=1,y=!1,p=!1,x=f.length;for(a=0;a<x;++a)b(c,f[a],a,s);for(x=c.length,a=0;a<x;++a){var l=c[a];if(n(l.vertexBuffer)&&0===l.instanceDivisor){var A=l.strideInBytes||l.componentsPerAttribute*t.getSizeInBytes(l.componentDatatype);h=l.vertexBuffer.sizeInBytes/A;break}}for(a=0;a<x;++a)c[a].instanceDivisor>0&&(y=!0),n(c[a].value)&&(p=!0);var m,B={};for(a=0;a<x;++a){var D=c[a].index;if(B[D])throw new o("Index "+D+" is used by more than one attribute.");B[D]=!0}s.vertexArrayObject&&(m=s.glCreateVertexArray(),s.glBindVertexArray(m),d(u,c,v),s.glBindVertexArray(null)),this._numberOfVertices=h,this._hasInstancedAttributes=y,this._hasConstantAttributes=p,this._context=s,this._gl=u,this._vao=m,this._attributes=c,this._indexBuffer=v}function x(e){return e.values.length/e.componentsPerAttribute}function l(e){return t.getSizeInBytes(e.componentDatatype)*e.componentsPerAttribute}return p.fromGeometry=function(i){i=r(i,r.EMPTY_OBJECT),e.defined("options.context",i.context);var a,o,y,b,d=i.context,A=r(i.geometry,r.EMPTY_OBJECT),m=r(i.bufferUsage,h.DYNAMIC_DRAW),B=r(i.attributeLocations,r.EMPTY_OBJECT),D=r(i.interleave,!1),_=i.vertexArrayAttributes,g=n(_)?_:[],I=A.attributes;if(D){var w=function(e){var r,i,a,o,s=[];for(i in e)e.hasOwnProperty(i)&&n(e[i])&&n(e[i].values)&&(s.push(i),e[i].componentDatatype===t.DOUBLE&&(e[i].componentDatatype=t.FLOAT,e[i].values=t.createTypedArray(t.FLOAT,e[i].values)));var u=s.length;if(u>0)for(o=x(e[s[0]]),r=1;r<u;++r){var f=x(e[s[r]]);if(f!==o)throw new v("Each attribute list must have the same number of vertices.  Attribute "+s[r]+" has a different number of vertices ("+f.toString()+") than attribute "+s[0]+" ("+o.toString()+").")}s.sort(function(r,n){return t.getSizeInBytes(e[n].componentDatatype)-t.getSizeInBytes(e[r].componentDatatype)});var c=0,h={};for(r=0;r<u;++r)i=s[r],a=e[i],h[i]=c,c+=l(a);if(c>0){var y=t.getSizeInBytes(e[s[0]].componentDatatype),b=c%y;0!==b&&(c+=y-b);var d=new ArrayBuffer(o*c),p={};for(r=0;r<u;++r){i=s[r];var A=t.getSizeInBytes(e[i].componentDatatype);p[i]={pointer:t.createTypedArray(e[i].componentDatatype,d),index:h[i]/A,strideInComponentType:c/A}}for(r=0;r<o;++r)for(var m=0;m<u;++m){i=s[m];for(var B=(a=e[i]).values,D=p[i],_=D.pointer,g=a.componentsPerAttribute,I=0;I<g;++I)_[D.index+I]=B[r*g+I];D.index+=D.strideInComponentType}return{buffer:d,offsetsInBytes:h,vertexSizeInBytes:c}}}(I);if(n(w)){y=c.createVertexBuffer({context:d,typedArray:w.buffer,usage:m});var E=w.offsetsInBytes,C=w.vertexSizeInBytes;for(a in I)I.hasOwnProperty(a)&&n(I[a])&&(o=I[a],n(o.values)?g.push({index:B[a],vertexBuffer:y,componentDatatype:o.componentDatatype,componentsPerAttribute:o.componentsPerAttribute,normalize:o.normalize,offsetInBytes:E[a],strideInBytes:C}):g.push({index:B[a],value:o.value,componentDatatype:o.componentDatatype,normalize:o.normalize}))}}else for(a in I)if(I.hasOwnProperty(a)&&n(I[a])){var O=(o=I[a]).componentDatatype;O===t.DOUBLE&&(O=t.FLOAT),y=void 0,n(o.values)&&(y=c.createVertexBuffer({context:d,typedArray:t.createTypedArray(O,o.values),usage:m})),g.push({index:B[a],vertexBuffer:y,value:o.value,componentDatatype:O,componentsPerAttribute:o.componentsPerAttribute,normalize:o.normalize})}var T=A.indices;return n(T)&&(b=s.computeNumberOfVertices(A)>=f.SIXTY_FOUR_KILOBYTES&&d.elementIndexUint?c.createIndexBuffer({context:d,typedArray:new Uint32Array(T),usage:m,indexDatatype:u.UNSIGNED_INT}):c.createIndexBuffer({context:d,typedArray:new Uint16Array(T),usage:m,indexDatatype:u.UNSIGNED_SHORT})),new p({context:d,attributes:g,indexBuffer:b})},i(p.prototype,{numberOfAttributes:{get:function(){return this._attributes.length}},numberOfVertices:{get:function(){return this._numberOfVertices}},indexBuffer:{get:function(){return this._indexBuffer}}}),p.prototype.getAttribute=function(t){return e.defined("index",t),this._attributes[t]},p.prototype._bind=function(){n(this._vao)?(this._context.glBindVertexArray(this._vao),this._context.instancedArrays&&function(e){var t=e._context,r=e._hasInstancedAttributes;if(r||t._previousDrawInstanced){t._previousDrawInstanced=r;var n,i=t._vertexAttribDivisors,a=e._attributes,o=y.maximumVertexAttributes;if(r){var s=a.length;for(n=0;n<s;++n){var u=a[n];if(u.enabled){var f=u.instanceDivisor,v=u.index;f!==i[v]&&(t.glVertexAttribDivisor(v,f),i[v]=f)}}}else for(n=0;n<o;++n)i[n]>0&&(t.glVertexAttribDivisor(n,0),i[n]=0)}}(this),this._hasConstantAttributes&&function(e,t){for(var r=e._attributes,i=r.length,a=0;a<i;++a){var o=r[a];o.enabled&&n(o.value)&&o.vertexAttrib(t)}}(this,this._gl)):d(this._gl,this._attributes,this._indexBuffer)},p.prototype._unBind=function(){if(n(this._vao))this._context.glBindVertexArray(null);else{for(var e=this._attributes,t=this._gl,r=0;r<e.length;++r){var i=e[r];i.enabled&&i.disableVertexAttribArray(t)}this._indexBuffer&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,null)}},p.prototype.isDestroyed=function(){return!1},p.prototype.destroy=function(){for(var e=this._attributes,t=0;t<e.length;++t){var r=e[t].vertexBuffer;n(r)&&!r.isDestroyed()&&r.vertexArrayDestroyable&&r.destroy()}var i=this._indexBuffer;return n(i)&&!i.isDestroyed()&&i.vertexArrayDestroyable&&i.destroy(),n(this._vao)&&this._context.glDeleteVertexArray(this._vao),a(this)},p});