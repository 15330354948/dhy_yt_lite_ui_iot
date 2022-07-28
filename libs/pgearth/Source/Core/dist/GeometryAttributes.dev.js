"use strict";

define(["./defaultValue"], function (n) {
  "use strict";

  return function (t) {
    t = n(t, n.EMPTY_OBJECT), this.position = t.position, this.normal = t.normal, this.st = t.st, this.bitangent = t.bitangent, this.tangent = t.tangent, this.color = t.color;
  };
});