"use strict";

define(["../Core/defaultValue", "../Renderer/Pass"], function (a, f) {
  "use strict";

  return function (e, r) {
    this.near = a(e, 0), this.far = a(r, 0);

    for (var n = f.NUMBER_OF_PASSES, i = new Array(n), s = new Array(n), t = 0; t < n; ++t) {
      i[t] = [], s[t] = 0;
    }

    this.commands = i, this.indices = s;
  };
});