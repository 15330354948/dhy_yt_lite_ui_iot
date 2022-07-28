"use strict";

define(["../Renderer/PixelDatatype", "./freezeObject", "./WebGLConstants"], function (e, _, P) {
  "use strict";

  var C = {
    DEPTH_COMPONENT: P.DEPTH_COMPONENT,
    DEPTH_STENCIL: P.DEPTH_STENCIL,
    ALPHA: P.ALPHA,
    RGB: P.RGB,
    RGBA: P.RGBA,
    LUMINANCE: P.LUMINANCE,
    LUMINANCE_ALPHA: P.LUMINANCE_ALPHA,
    RGB_DXT1: P.COMPRESSED_RGB_S3TC_DXT1_EXT,
    RGBA_DXT1: P.COMPRESSED_RGBA_S3TC_DXT1_EXT,
    RGBA_DXT3: P.COMPRESSED_RGBA_S3TC_DXT3_EXT,
    RGBA_DXT5: P.COMPRESSED_RGBA_S3TC_DXT5_EXT,
    RGB_PVRTC_4BPPV1: P.COMPRESSED_RGB_PVRTC_4BPPV1_IMG,
    RGB_PVRTC_2BPPV1: P.COMPRESSED_RGB_PVRTC_2BPPV1_IMG,
    RGBA_PVRTC_4BPPV1: P.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,
    RGBA_PVRTC_2BPPV1: P.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG,
    RGB_ETC1: P.COMPRESSED_RGB_ETC1_WEBGL,
    componentsLength: function componentsLength(_) {
      switch (_) {
        case C.RGB:
          return 3;

        case C.RGBA:
          return 4;

        case C.LUMINANCE_ALPHA:
          return 2;

        case C.ALPHA:
        case C.LUMINANCE:
        default:
          return 1;
      }
    },
    validate: function validate(_) {
      return _ === C.DEPTH_COMPONENT || _ === C.DEPTH_STENCIL || _ === C.ALPHA || _ === C.RGB || _ === C.RGBA || _ === C.LUMINANCE || _ === C.LUMINANCE_ALPHA || _ === C.RGB_DXT1 || _ === C.RGBA_DXT1 || _ === C.RGBA_DXT3 || _ === C.RGBA_DXT5 || _ === C.RGB_PVRTC_4BPPV1 || _ === C.RGB_PVRTC_2BPPV1 || _ === C.RGBA_PVRTC_4BPPV1 || _ === C.RGBA_PVRTC_2BPPV1 || _ === C.RGB_ETC1;
    },
    isColorFormat: function isColorFormat(_) {
      return _ === C.ALPHA || _ === C.RGB || _ === C.RGBA || _ === C.LUMINANCE || _ === C.LUMINANCE_ALPHA;
    },
    isDepthFormat: function isDepthFormat(_) {
      return _ === C.DEPTH_COMPONENT || _ === C.DEPTH_STENCIL;
    },
    isCompressedFormat: function isCompressedFormat(_) {
      return _ === C.RGB_DXT1 || _ === C.RGBA_DXT1 || _ === C.RGBA_DXT3 || _ === C.RGBA_DXT5 || _ === C.RGB_PVRTC_4BPPV1 || _ === C.RGB_PVRTC_2BPPV1 || _ === C.RGBA_PVRTC_4BPPV1 || _ === C.RGBA_PVRTC_2BPPV1 || _ === C.RGB_ETC1;
    },
    isDXTFormat: function isDXTFormat(_) {
      return _ === C.RGB_DXT1 || _ === C.RGBA_DXT1 || _ === C.RGBA_DXT3 || _ === C.RGBA_DXT5;
    },
    isPVRTCFormat: function isPVRTCFormat(_) {
      return _ === C.RGB_PVRTC_4BPPV1 || _ === C.RGB_PVRTC_2BPPV1 || _ === C.RGBA_PVRTC_4BPPV1 || _ === C.RGBA_PVRTC_2BPPV1;
    },
    isETC1Format: function isETC1Format(_) {
      return _ === C.RGB_ETC1;
    },
    compressedTextureSizeInBytes: function compressedTextureSizeInBytes(_, P, R) {
      switch (_) {
        case C.RGB_DXT1:
        case C.RGBA_DXT1:
        case C.RGB_ETC1:
          return Math.floor((P + 3) / 4) * Math.floor((R + 3) / 4) * 8;

        case C.RGBA_DXT3:
        case C.RGBA_DXT5:
          return Math.floor((P + 3) / 4) * Math.floor((R + 3) / 4) * 16;

        case C.RGB_PVRTC_4BPPV1:
        case C.RGBA_PVRTC_4BPPV1:
          return Math.floor((Math.max(P, 8) * Math.max(R, 8) * 4 + 7) / 8);

        case C.RGB_PVRTC_2BPPV1:
        case C.RGBA_PVRTC_2BPPV1:
          return Math.floor((Math.max(P, 16) * Math.max(R, 8) * 2 + 7) / 8);

        default:
          return 0;
      }
    },
    textureSizeInBytes: function textureSizeInBytes(_, P, R, B) {
      var r = C.componentsLength(_);
      return e.isPacked(P) && (r = 1), r * e.sizeInBytes(P) * R * B;
    },
    alignmentInBytes: function alignmentInBytes(_, P, R) {
      var B = C.textureSizeInBytes(_, P, R, 1) % 4;
      return 0 == B ? 4 : 2 == B ? 2 : 1;
    },
    createTypedArray: function createTypedArray(_, P, R, B) {
      var r = e.sizeInBytes(P),
          t = r === Uint8Array.BYTES_PER_ELEMENT ? Uint8Array : r === Uint16Array.BYTES_PER_ELEMENT ? Uint16Array : r === Float32Array.BYTES_PER_ELEMENT && P === e.FLOAT ? Float32Array : Uint32Array;
      return new t(C.componentsLength(_) * R * B);
    },
    flipY: function flipY(_, P, R, B, r) {
      if (1 === r) return _;

      for (var t = C.createTypedArray(P, R, B, r), e = C.componentsLength(P), T = B * e, n = 0; n < r; ++n) {
        for (var A = n * r * e, E = (r - n - 1) * r * e, G = 0; G < T; ++G) {
          t[E + G] = _[A + G];
        }
      }

      return t;
    }
  };
  return _(C);
});