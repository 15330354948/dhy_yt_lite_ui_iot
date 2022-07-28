"use strict";

define(["../Core/BoundingRectangle", "../Core/Check", "../Core/Color", "../Core/defined", "../Core/destroyObject", "../Core/DeveloperError", "../Core/PrimitiveType", "../Shaders/ViewportQuadVS", "./ClearCommand", "./DrawCommand", "./Framebuffer", "./RenderState", "./ShaderProgram"], function (C, y, e, S, r, g, t, w, o, a, v, A, P) {
  "use strict";

  function n(e) {
    this._context = e;
  }

  var T,
      l = new a({
    primitiveType: t.TRIANGLES
  }),
      E = new o({
    color: new e(0, 0, 0, 0)
  });
  return n.prototype.execute = function (e) {
    if (y.defined("computeCommand", e), S(e.preExecute) && e.preExecute(e), !S(e.fragmentShaderSource) && !S(e.shaderProgram)) throw new g("computeCommand.fragmentShaderSource or computeCommand.shaderProgram is required.");
    y.defined("computeCommand.outputTexture", e.outputTexture);
    var r,
        t,
        o,
        a,
        n = e.outputTexture,
        u = n.width,
        d = n.height,
        i = this._context,
        m = S(e.vertexArray) ? e.vertexArray : i.getViewportQuadVertexArray(),
        c = S(e.shaderProgram) ? e.shaderProgram : (r = i, t = e.fragmentShaderSource, P.fromCache({
      context: r,
      vertexShaderSource: w,
      fragmentShaderSource: t,
      attributeLocations: {
        position: 0,
        textureCoordinates: 1
      }
    })),
        p = new v({
      context: i,
      colorTextures: [n],
      destroyAttachments: !1
    }),
        s = (o = u, a = d, S(T) && T.viewport.width === o && T.viewport.height === a || (T = A.fromCache({
      viewport: new C(0, 0, o, a)
    })), T),
        f = e.uniformMap,
        h = E;
    h.framebuffer = p, h.renderState = s, h.execute(i);
    var x = l;
    x.vertexArray = m, x.renderState = s, x.shaderProgram = c, x.uniformMap = f, x.framebuffer = p, x.execute(i), p.destroy(), e.persists || (c.destroy(), S(e.vertexArray) && m.destroy()), S(e.postExecute) && e.postExecute(n);
  }, n.prototype.isDestroyed = function () {
    return !1;
  }, n.prototype.destroy = function () {
    return r(this);
  }, n;
});