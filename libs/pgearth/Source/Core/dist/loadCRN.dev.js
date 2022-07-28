"use strict";

define(["../ThirdParty/when", "./CompressedTextureBuffer", "./defined", "./DeveloperError", "./Resource", "./TaskProcessor"], function (f, n, t, u, s, e) {
  "use strict";

  var i = new e("transcodeCRNToDXT", Number.POSITIVE_INFINITY);
  return function (e) {
    if (!t(e)) throw new u("resourceOrUrlOrBuffer is required.");
    var r;
    if (r = e instanceof ArrayBuffer || ArrayBuffer.isView(e) ? f.resolve(e) : s.createIfNeeded(e).fetchArrayBuffer(), t(r)) return r.then(function (e) {
      if (t(e)) {
        var r = [];
        return e instanceof ArrayBuffer ? r.push(e) : (0 === e.byteOffset && e.byteLength === e.buffer.byteLength || (e = e.slice(0, e.length)), r.push(e.buffer)), i.scheduleTask(e, r);
      }
    }).then(function (e) {
      return n.clone(e);
    });
  };
});