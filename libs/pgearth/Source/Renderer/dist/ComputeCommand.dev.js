"use strict";

define(["../Core/defaultValue", "./Pass"], function (t, r) {
  "use strict";

  function e(e) {
    e = t(e, t.EMPTY_OBJECT), this.vertexArray = e.vertexArray, this.fragmentShaderSource = e.fragmentShaderSource, this.shaderProgram = e.shaderProgram, this.uniformMap = e.uniformMap, this.outputTexture = e.outputTexture, this.preExecute = e.preExecute, this.postExecute = e.postExecute, this.persists = t(e.persists, !1), this.pass = r.COMPUTE, this.owner = e.owner;
  }

  return e.prototype.execute = function (e) {
    e.execute(this);
  }, e;
});