"use strict";

define([], function () {
  "use strict";

  return function (i) {
    this.context = i, this.framebuffer = void 0, this.blendingEnabled = void 0, this.scissorTest = void 0, this.viewport = void 0;
  };
});