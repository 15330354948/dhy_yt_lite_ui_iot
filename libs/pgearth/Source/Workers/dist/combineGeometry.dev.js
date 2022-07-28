"use strict";

define(["../Scene/PrimitivePipeline", "./createTaskProcessorWorker"], function (i, e) {
  "use strict";

  return e(function (e, r) {
    var n = i.unpackCombineGeometryParameters(e),
        t = i.combineGeometry(n);
    return i.packCombineGeometryResults(t, r);
  });
});