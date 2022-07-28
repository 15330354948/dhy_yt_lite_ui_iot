"use strict";

define(["../Core/Queue"], function (e) {
  "use strict";

  function t() {
    this.initialized = !1, this.resourcesParsed = !1, this.vertexBuffersToCreate = new e(), this.indexBuffersToCreate = new e(), this.buffers = {}, this.pendingBufferLoads = 0, this.programsToCreate = new e(), this.shaders = {}, this.pendingShaderLoads = 0, this.texturesToCreate = new e(), this.pendingTextureLoads = 0, this.texturesToCreateFromBufferView = new e(), this.pendingBufferViewToImage = 0, this.createSamplers = !0, this.createSkins = !0, this.createRuntimeAnimations = !0, this.createVertexArrays = !0, this.createRenderStates = !0, this.createUniformMaps = !0, this.createRuntimeNodes = !0, this.createdBufferViews = {}, this.primitivesToDecode = new e(), this.activeDecodingTasks = 0, this.pendingDecodingCache = !1, this.skinnedNodesIds = [];
  }

  return t.prototype.getBuffer = function (e) {
    return t = this.buffers[e.buffer], i = e.byteOffset, r = e.byteLength, t.subarray(i, i + r);
    var t, i, r;
  }, t.prototype.finishedPendingBufferLoads = function () {
    return 0 === this.pendingBufferLoads;
  }, t.prototype.finishedBuffersCreation = function () {
    return 0 === this.pendingBufferLoads && 0 === this.vertexBuffersToCreate.length && 0 === this.indexBuffersToCreate.length;
  }, t.prototype.finishedProgramCreation = function () {
    return 0 === this.pendingShaderLoads && 0 === this.programsToCreate.length;
  }, t.prototype.finishedTextureCreation = function () {
    var e = 0 === this.pendingTextureLoads,
        t = 0 === this.texturesToCreate.length && 0 === this.texturesToCreateFromBufferView.length;
    return e && t;
  }, t.prototype.finishedEverythingButTextureCreation = function () {
    var e = 0 === this.pendingBufferLoads && 0 === this.pendingShaderLoads,
        t = 0 === this.vertexBuffersToCreate.length && 0 === this.indexBuffersToCreate.length && 0 === this.programsToCreate.length && 0 === this.pendingBufferViewToImage;
    return this.finishedDecoding() && e && t;
  }, t.prototype.finishedDecoding = function () {
    return 0 === this.primitivesToDecode.length && 0 === this.activeDecodingTasks && !this.pendingDecodingCache;
  }, t.prototype.finished = function () {
    return this.finishedDecoding() && this.finishedTextureCreation() && this.finishedEverythingButTextureCreation();
  }, t;
});