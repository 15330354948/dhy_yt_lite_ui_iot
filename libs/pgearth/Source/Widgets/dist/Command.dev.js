"use strict";

define(["../Core/DeveloperError"], function (e) {
  "use strict";

  return function () {
    this.canExecute = void 0, this.beforeExecute = void 0, this.afterExecute = void 0, e.throwInstantiationError();
  };
});