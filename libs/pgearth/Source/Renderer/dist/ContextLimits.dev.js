"use strict";

define(["../Core/defineProperties"], function (e) {
  "use strict";

  var m = {
    _maximumCombinedTextureImageUnits: 0,
    _maximumCubeMapSize: 0,
    _maximumFragmentUniformVectors: 0,
    _maximumTextureImageUnits: 0,
    _maximumRenderbufferSize: 0,
    _maximumTextureSize: 0,
    _maximumVaryingVectors: 0,
    _maximumVertexAttributes: 0,
    _maximumVertexTextureImageUnits: 0,
    _maximumVertexUniformVectors: 0,
    _minimumAliasedLineWidth: 0,
    _maximumAliasedLineWidth: 0,
    _minimumAliasedPointSize: 0,
    _maximumAliasedPointSize: 0,
    _maximumViewportWidth: 0,
    _maximumViewportHeight: 0,
    _maximumTextureFilterAnisotropy: 0,
    _maximumDrawBuffers: 0,
    _maximumColorAttachments: 0,
    _highpFloatSupported: !1,
    _highpIntSupported: !1
  };
  return e(m, {
    maximumCombinedTextureImageUnits: {
      get: function get() {
        return m._maximumCombinedTextureImageUnits;
      }
    },
    maximumCubeMapSize: {
      get: function get() {
        return m._maximumCubeMapSize;
      }
    },
    maximumFragmentUniformVectors: {
      get: function get() {
        return m._maximumFragmentUniformVectors;
      }
    },
    maximumTextureImageUnits: {
      get: function get() {
        return m._maximumTextureImageUnits;
      }
    },
    maximumRenderbufferSize: {
      get: function get() {
        return m._maximumRenderbufferSize;
      }
    },
    maximumTextureSize: {
      get: function get() {
        return m._maximumTextureSize;
      }
    },
    maximumVaryingVectors: {
      get: function get() {
        return m._maximumVaryingVectors;
      }
    },
    maximumVertexAttributes: {
      get: function get() {
        return m._maximumVertexAttributes;
      }
    },
    maximumVertexTextureImageUnits: {
      get: function get() {
        return m._maximumVertexTextureImageUnits;
      }
    },
    maximumVertexUniformVectors: {
      get: function get() {
        return m._maximumVertexUniformVectors;
      }
    },
    minimumAliasedLineWidth: {
      get: function get() {
        return m._minimumAliasedLineWidth;
      }
    },
    maximumAliasedLineWidth: {
      get: function get() {
        return m._maximumAliasedLineWidth;
      }
    },
    minimumAliasedPointSize: {
      get: function get() {
        return m._minimumAliasedPointSize;
      }
    },
    maximumAliasedPointSize: {
      get: function get() {
        return m._maximumAliasedPointSize;
      }
    },
    maximumViewportWidth: {
      get: function get() {
        return m._maximumViewportWidth;
      }
    },
    maximumViewportHeight: {
      get: function get() {
        return m._maximumViewportHeight;
      }
    },
    maximumTextureFilterAnisotropy: {
      get: function get() {
        return m._maximumTextureFilterAnisotropy;
      }
    },
    maximumDrawBuffers: {
      get: function get() {
        return m._maximumDrawBuffers;
      }
    },
    maximumColorAttachments: {
      get: function get() {
        return m._maximumColorAttachments;
      }
    },
    highpFloatSupported: {
      get: function get() {
        return m._highpFloatSupported;
      }
    },
    highpIntSupported: {
      get: function get() {
        return m._highpIntSupported;
      }
    }
  }), m;
});