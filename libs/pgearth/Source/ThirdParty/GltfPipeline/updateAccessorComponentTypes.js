define(["./addBuffer","./ForEach","./readAccessorPacked","../../Core/ComponentDatatype","../../Core/WebGLConstants"],function(e,n,r,t,c){"use strict";function o(n,c,o){var a=t.createTypedArray(o,r(n,c)),s=new Uint8Array(a.buffer);c.bufferView=e(n,s),c.componentType=o,c.byteOffset=0}return function(e){var r;return n.accessorWithSemantic(e,"JOINTS_0",function(n){var a=e.accessors[n];(r=a.componentType)===c.BYTE?o(e,a,t.UNSIGNED_BYTE):r!==c.UNSIGNED_BYTE&&r!==c.UNSIGNED_SHORT&&o(e,a,t.UNSIGNED_SHORT)}),n.accessorWithSemantic(e,"WEIGHTS_0",function(n){var a=e.accessors[n];(r=a.componentType)===c.BYTE?o(e,a,t.UNSIGNED_BYTE):r===c.SHORT&&o(e,a,t.UNSIGNED_SHORT)}),e}});