define(["./getAccessorByteStride","./getComponentReader","./numberOfComponentsForType","../../Core/arrayFill","../../Core/ComponentDatatype","../../Core/defined"],function(e,r,t,f,n,o){"use strict";return function(i,u){var a=e(i,u),s=n.getSizeInBytes(u.componentType),y=t(u.type),p=u.count,b=new Array(y*p);if(!o(u.bufferView))return f(b,0),b;for(var c=i.bufferViews[u.bufferView],w=i.buffers[c.buffer].extras._pipeline.source,m=u.byteOffset+c.byteOffset+w.byteOffset,C=new DataView(w.buffer),d=new Array(y),O=r(u.componentType),V=0;V<p;++V){O(C,m,y,s,d);for(var g=0;g<y;++g)b[V*y+g]=d[g];m+=a}return b}});