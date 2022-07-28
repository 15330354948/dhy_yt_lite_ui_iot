"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/PrimitiveType"], function (e, i, t, n) {
  "use strict";

  function s(t) {
    t = e(t, e.EMPTY_OBJECT), this._boundingVolume = t.boundingVolume, this._orientedBoundingBox = t.orientedBoundingBox, this._cull = e(t.cull, !0), this._occlude = e(t.occlude, !0), this._modelMatrix = t.modelMatrix, this._primitiveType = e(t.primitiveType, n.TRIANGLES), this._vertexArray = t.vertexArray, this._count = t.count, this._offset = e(t.offset, 0), this._instanceCount = e(t.instanceCount, 0), this._shaderProgram = t.shaderProgram, this._uniformMap = t.uniformMap, this._renderState = t.renderState, this._framebuffer = t.framebuffer, this._pass = t.pass, this._executeInClosestFrustum = e(t.executeInClosestFrustum, !1), this._owner = t.owner, this._debugShowBoundingVolume = e(t.debugShowBoundingVolume, !1), this._debugOverlappingFrustums = 0, this._castShadows = e(t.castShadows, !1), this._receiveShadows = e(t.receiveShadows, !1), this._pickId = t.pickId, this._pickOnly = e(t.pickOnly, !1), this.dirty = !0, this.lastDirtyTime = 0, this.derivedCommands = {};
  }

  return t(s.prototype, {
    boundingVolume: {
      get: function get() {
        return this._boundingVolume;
      },
      set: function set(t) {
        this._boundingVolume !== t && (this._boundingVolume = t, this.dirty = !0);
      }
    },
    orientedBoundingBox: {
      get: function get() {
        return this._orientedBoundingBox;
      },
      set: function set(t) {
        this._orientedBoundingBox !== t && (this._orientedBoundingBox = t, this.dirty = !0);
      }
    },
    cull: {
      get: function get() {
        return this._cull;
      },
      set: function set(t) {
        this._cull !== t && (this._cull = t, this.dirty = !0);
      }
    },
    occlude: {
      get: function get() {
        return this._occlude;
      },
      set: function set(t) {
        this._occlude !== t && (this._occlude = t, this.dirty = !0);
      }
    },
    modelMatrix: {
      get: function get() {
        return this._modelMatrix;
      },
      set: function set(t) {
        this._modelMatrix !== t && (this._modelMatrix = t, this.dirty = !0);
      }
    },
    primitiveType: {
      get: function get() {
        return this._primitiveType;
      },
      set: function set(t) {
        this._primitiveType !== t && (this._primitiveType = t, this.dirty = !0);
      }
    },
    vertexArray: {
      get: function get() {
        return this._vertexArray;
      },
      set: function set(t) {
        this._vertexArray !== t && (this._vertexArray = t, this.dirty = !0);
      }
    },
    count: {
      get: function get() {
        return this._count;
      },
      set: function set(t) {
        this._count !== t && (this._count = t, this.dirty = !0);
      }
    },
    offset: {
      get: function get() {
        return this._offset;
      },
      set: function set(t) {
        this._offset !== t && (this._offset = t, this.dirty = !0);
      }
    },
    instanceCount: {
      get: function get() {
        return this._instanceCount;
      },
      set: function set(t) {
        this._instanceCount !== t && (this._instanceCount = t, this.dirty = !0);
      }
    },
    shaderProgram: {
      get: function get() {
        return this._shaderProgram;
      },
      set: function set(t) {
        this._shaderProgram !== t && (this._shaderProgram = t, this.dirty = !0);
      }
    },
    castShadows: {
      get: function get() {
        return this._castShadows;
      },
      set: function set(t) {
        this._castShadows !== t && (this._castShadows = t, this.dirty = !0);
      }
    },
    receiveShadows: {
      get: function get() {
        return this._receiveShadows;
      },
      set: function set(t) {
        this._receiveShadows !== t && (this._receiveShadows = t, this.dirty = !0);
      }
    },
    uniformMap: {
      get: function get() {
        return this._uniformMap;
      },
      set: function set(t) {
        this._uniformMap !== t && (this._uniformMap = t, this.dirty = !0);
      }
    },
    renderState: {
      get: function get() {
        return this._renderState;
      },
      set: function set(t) {
        this._renderState !== t && (this._renderState = t, this.dirty = !0);
      }
    },
    framebuffer: {
      get: function get() {
        return this._framebuffer;
      },
      set: function set(t) {
        this._framebuffer !== t && (this._framebuffer = t, this.dirty = !0);
      }
    },
    pass: {
      get: function get() {
        return this._pass;
      },
      set: function set(t) {
        this._pass !== t && (this._pass = t, this.dirty = !0);
      }
    },
    executeInClosestFrustum: {
      get: function get() {
        return this._executeInClosestFrustum;
      },
      set: function set(t) {
        this._executeInClosestFrustum !== t && (this._executeInClosestFrustum = t, this.dirty = !0);
      }
    },
    owner: {
      get: function get() {
        return this._owner;
      },
      set: function set(t) {
        this._owner !== t && (this._owner = t, this.dirty = !0);
      }
    },
    debugShowBoundingVolume: {
      get: function get() {
        return this._debugShowBoundingVolume;
      },
      set: function set(t) {
        this._debugShowBoundingVolume !== t && (this._debugShowBoundingVolume = t, this.dirty = !0);
      }
    },
    debugOverlappingFrustums: {
      get: function get() {
        return this._debugOverlappingFrustums;
      },
      set: function set(t) {
        this._debugOverlappingFrustums !== t && (this._debugOverlappingFrustums = t, this.dirty = !0);
      }
    },
    pickId: {
      get: function get() {
        return this._pickId;
      },
      set: function set(t) {
        this._pickId !== t && (this._pickId = t, this.dirty = !0);
      }
    },
    pickOnly: {
      get: function get() {
        return this._pickOnly;
      },
      set: function set(t) {
        this._pickOnly !== t && (this._pickOnly = t, this.dirty = !0);
      }
    }
  }), s.shallowClone = function (t, e) {
    if (i(t)) return i(e) || (e = new s()), e._boundingVolume = t._boundingVolume, e._orientedBoundingBox = t._orientedBoundingBox, e._cull = t._cull, e._occlude = t._occlude, e._modelMatrix = t._modelMatrix, e._primitiveType = t._primitiveType, e._vertexArray = t._vertexArray, e._count = t._count, e._offset = t._offset, e._instanceCount = t._instanceCount, e._shaderProgram = t._shaderProgram, e._uniformMap = t._uniformMap, e._renderState = t._renderState, e._framebuffer = t._framebuffer, e._pass = t._pass, e._executeInClosestFrustum = t._executeInClosestFrustum, e._owner = t._owner, e._debugShowBoundingVolume = t._debugShowBoundingVolume, e._debugOverlappingFrustums = t._debugOverlappingFrustums, e._castShadows = t._castShadows, e._receiveShadows = t._receiveShadows, e._pickId = t._pickId, e._pickOnly = t._pickOnly, e.dirty = !0, e.lastDirtyTime = 0, e;
  }, s.prototype.execute = function (t, e) {
    t.draw(this, e);
  }, s;
});