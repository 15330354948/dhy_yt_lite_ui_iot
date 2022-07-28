"use strict";

define(["../Core/Color", "../Core/defaultValue", "../Core/freezeObject"], function (e, t, r) {
  "use strict";

  function o(e) {
    e = t(e, t.EMPTY_OBJECT), this.color = e.color, this.depth = e.depth, this.stencil = e.stencil, this.renderState = e.renderState, this.framebuffer = e.framebuffer, this.owner = e.owner, this.pass = e.pass;
  }

  return o.ALL = r(new o({
    color: new e(0, 0, 0, 0),
    depth: 1,
    stencil: 0
  })), o.prototype.execute = function (e, t) {
    e.clear(this, t);
  }, o;
});