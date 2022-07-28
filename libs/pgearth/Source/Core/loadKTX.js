define(["../ThirdParty/when","./Check","./CompressedTextureBuffer","./defined","./PixelFormat","./Resource","./RuntimeError","./WebGLConstants"],function(e,r,t,n,i,a,f,s){"use strict";var o=[171,75,84,88,32,49,49,187,13,10,26,10],u=67305985,w=["positiveX","negativeX","positiveY","negativeY","positiveZ","negativeZ"],v=4;return function(h){var d;if(r.defined("resourceOrUrlOrBuffer",h),d=h instanceof ArrayBuffer||ArrayBuffer.isView(h)?e.resolve(h):a.createIfNeeded(h).fetchArrayBuffer(),n(d))return d.then(function(e){if(n(e))return function(e){var r,a,h,d=new Uint8Array(e),g=!0;for(r=0;r<o.length;++r)if(o[r]!==d[r]){g=!1;break}if(!g)throw new f("Invalid KTX file.");n(e.buffer)?(a=new DataView(e.buffer),h=e.byteOffset):(a=new DataView(e),h=0),h+=12;var m=a.getUint32(h,!0);if(h+=v,m!==u)throw new f("File is the wrong endianness.");var U=a.getUint32(h,!0);h+=v;var p=a.getUint32(h,!0);h+=v;var y=a.getUint32(h,!0);h+=v;var b=a.getUint32(h,!0);h+=v;var c=a.getUint32(h,!0);h+=v;var l=a.getUint32(h,!0);h+=v;var B=a.getUint32(h,!0);h+=v;var x=a.getUint32(h,!0);h+=v;var A=a.getUint32(h,!0);h+=v;var T=a.getUint32(h,!0);h+=v;var F=a.getUint32(h,!0);h+=v;var G=a.getUint32(h,!0);h+=v,h+=G;var I,R=a.getUint32(h,!0);if(h+=v,I=n(e.buffer)?new Uint8Array(e.buffer,h,R):new Uint8Array(e,h,R),b===s.RGB8?b=i.RGB:b===s.RGBA8&&(b=i.RGBA),!i.validate(b))throw new f("glInternalFormat is not a valid format.");if(i.isCompressedFormat(b)){if(0!==U)throw new f("glType must be zero when the texture is compressed.");if(1!==p)throw new f("The type size for compressed textures must be 1.");if(0!==y)throw new f("glFormat must be zero when the texture is compressed.")}else{if(U!==s.UNSIGNED_BYTE)throw new f("Only unsigned byte buffers are supported.");if(c!==y)throw new f("The base internal format must be the same as the format for uncompressed textures.")}if(0!==x)throw new f("3D textures are unsupported.");if(0!==A)throw new f("Texture arrays are unsupported.");var z=I.byteOffset,C=new Array(F);for(r=0;r<F;++r){for(var O=C[r]={},D=0;D<T;++D){var E=l>>r,N=B>>r,S=i.isCompressedFormat(b)?i.compressedTextureSizeInBytes(b,E,N):i.textureSizeInBytes(b,U,E,N),V=new Uint8Array(I.buffer,z,S);O[w[D]]=new t(b,E,N,V),z+=S}z+=3-(z+3)%4+4}var X=C;if(1===T)for(r=0;r<F;++r)X[r]=X[r][w[0]];return 1===F&&(X=X[0]),X}(e)})}});