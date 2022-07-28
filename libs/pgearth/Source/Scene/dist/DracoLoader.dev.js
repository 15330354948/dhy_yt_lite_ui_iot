"use strict";

define(["../Core/arraySlice", "../Core/ComponentDatatype", "../Core/defined", "../Core/FeatureDetection", "../Core/TaskProcessor", "../ThirdParty/GltfPipeline/ForEach", "../ThirdParty/when"], function (i, p, u, e, r, c, n) {
  "use strict";

  function f() {}

  function D(e, r) {
    var o = "runtime." + Object.keys(e.createdBufferViews).length,
        d = e.buffers,
        c = Object.keys(d).length;
    return d[c] = r, e.createdBufferViews[o] = {
      buffer: c,
      byteOffset: 0,
      byteLength: r.byteLength
    }, o;
  }

  function h(e, v, b) {
    if (f._taskProcessorReady) {
      var C = b.primitivesToDecode.peek();

      if (u(C)) {
        var r = e.scheduleTask(C, [C.array.buffer]);
        if (u(r)) return b.activeDecodingTasks++, b.primitivesToDecode.dequeue(), r.then(function (e) {
          b.activeDecodingTasks--;

          var r,
              o,
              d,
              c,
              a,
              s,
              t,
              n,
              i,
              u,
              f,
              h,
              _ = (r = e.indexArray, o = v, d = r.typedArray, c = o._loadResources, a = D(c, d), c.indexBuffersToCreate.enqueue({
            id: a,
            componentType: p.fromTypedArray(d)
          }), {
            bufferViewId: a,
            numberOfIndices: r.numberOfIndices
          }),
              l = {},
              y = e.attributeData;

          for (var m in y) {
            y.hasOwnProperty(m) && (t = (s = y[m]).array, u = t, f = void 0, f = v._loadResources, h = D(f, u), f.vertexBuffersToCreate.enqueue(h), n = h, (i = s.data).bufferView = n, l[m] = i);
          }

          v._decodedData[C.mesh + ".primitive." + C.primitive] = {
            bufferView: _.bufferViewId,
            numberOfIndices: _.numberOfIndices,
            attributes: l
          };
        });
      }
    }
  }

  return f._maxDecodingConcurrency = Math.max(e.hardwareConcurrency - 1, 1), f._decoderTaskProcessor = void 0, f._taskProcessorReady = !1, f._getDecoderTaskProcessor = function () {
    var e;
    return u(f._decoderTaskProcessor) || ((e = new r("decodeDraco", f._maxDecodingConcurrency)).initWebAssemblyModule({
      modulePath: "ThirdParty/Workers/draco_wasm_wrapper.js",
      wasmBinaryFile: "ThirdParty/draco_decoder.wasm",
      fallbackModulePath: "ThirdParty/Workers/draco_decoder.js"
    }).then(function () {
      f._taskProcessorReady = !0;
    }), f._decoderTaskProcessor = e), f._decoderTaskProcessor;
  }, f.hasExtension = function (e) {
    return u(e.extensionsRequired.KHR_draco_mesh_compression) || u(e.extensionsUsed.KHR_draco_mesh_compression);
  }, f._decodedModelResourceCache = void 0, f.parse = function (e, r) {
    if (f.hasExtension(e)) {
      var s = e._loadResources,
          o = e.cacheKey;

      if (u(o)) {
        u(f._decodedModelResourceCache) || (u(r.cache.modelDecodingCache) || (r.cache.modelDecodingCache = {}), f._decodedModelResourceCache = r.cache.modelDecodingCache);
        var d = f._decodedModelResourceCache[o];
        if (u(d)) return d.count++, void (s.pendingDecodingCache = !0);
      }

      var t = e._dequantizeInShader,
          n = e.gltf;
      c.mesh(n, function (e, a) {
        c.meshPrimitive(e, function (e, r) {
          var o, d, c;
          u(e.extensions) && (o = e.extensions.KHR_draco_mesh_compression, u(o) && (d = n.bufferViews[o.bufferView], c = i(n.buffers[d.buffer].extras._pipeline.source, d.byteOffset, d.byteOffset + d.byteLength), s.primitivesToDecode.enqueue({
            mesh: a,
            primitive: r,
            array: c,
            bufferView: d,
            compressedAttributes: o.attributes,
            dequantizeInShader: t
          })));
        });
      });
    }
  }, f.decodeModel = function (e, r) {
    if (!f.hasExtension(e)) return n.resolve();
    var o = e._loadResources,
        d = e.cacheKey;

    if (u(d) && u(f._decodedModelResourceCache)) {
      var c = f._decodedModelResourceCache[d];
      if (u(c) && o.pendingDecodingCache) return n(c.ready, function () {
        e._decodedData = c.data, o.pendingDecodingCache = !1;
      });
      f._decodedModelResourceCache[d] = {
        ready: !1,
        count: 1,
        data: void 0
      };
    }

    if (0 === o.primitivesToDecode.length) return n.resolve();

    for (var a = f._getDecoderTaskProcessor(), s = [], t = h(a, e, o); u(t);) {
      s.push(t), t = h(a, e, o);
    }

    return n.all(s);
  }, f.decodePointCloud = function (e) {
    var r = f._getDecoderTaskProcessor();

    if (f._taskProcessorReady) return r.scheduleTask(e, [e.buffer.buffer]);
  }, f.cacheDataForModel = function (e) {
    var r,
        o = e.cacheKey;
    u(o) && u(f._decodedModelResourceCache) && (r = f._decodedModelResourceCache[o], u(r) && (r.ready = !0, r.data = e._decodedData));
  }, f.destroyCachedDataForModel = function (e) {
    var r,
        o = e.cacheKey;
    u(o) && u(f._decodedModelResourceCache) && (r = f._decodedModelResourceCache[o], u(r) && 0 == --r.count && delete f._decodedModelResourceCache[o]);
  }, f;
});