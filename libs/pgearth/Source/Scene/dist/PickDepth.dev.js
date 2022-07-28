"use strict";

define(["../Core/Cartesian4", "../Core/defined", "../Core/destroyObject", "../Core/PixelFormat", "../Renderer/Framebuffer", "../Renderer/PixelDatatype", "../Renderer/RenderState", "../Renderer/ShaderSource", "../Renderer/Texture"], function (a, f, e, u, d, p, m, h, _) {
  "use strict";

  function t() {
    this._framebuffer = void 0, this._depthTexture = void 0, this._textureToCopy = void 0, this._copyDepthCommand = void 0, this._useLogDepth = void 0, this._debugPickDepthViewportCommand = void 0;
  }

  function c(e) {
    e._depthTexture = e._depthTexture && !e._depthTexture.isDestroyed() && e._depthTexture.destroy();
  }

  function s(e) {
    e._framebuffer = e._framebuffer && !e._framebuffer.isDestroyed() && e._framebuffer.destroy();
  }

  function x(e, t, r, o) {
    var n, a, i;
    c(e), s(e), n = t, a = r, i = o, e._depthTexture = new _({
      context: n,
      width: a,
      height: i,
      pixelFormat: u.RGBA,
      pixelDatatype: p.UNSIGNED_BYTE
    }), e._framebuffer = new d({
      context: t,
      colorTextures: [e._depthTexture],
      destroyAttachments: !1
    });
  }

  t.prototype.executeDebugPickDepth = function (e, t, r) {
    var o, n, a, i, u;
    n = e, a = t, i = r, f((o = this)._debugPickDepthViewportCommand) && i === o._useLogDepth || (u = new h({
      defines: [i ? "LOG_DEPTH" : ""],
      sources: ["uniform sampler2D u_texture;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\n    float z_window = czm_unpackDepth(texture2D(u_texture, v_textureCoordinates));\n    z_window = czm_reverseLogDepth(z_window); \n    float n_range = czm_depthRange.near;\n    float f_range = czm_depthRange.far;\n    float z_ndc = (2.0 * z_window - n_range - f_range) / (f_range - n_range);\n    float scale = pow(z_ndc * 0.5 + 0.5, 8.0);\n    gl_FragColor = vec4(mix(vec3(0.0), vec3(1.0), scale), 1.0);\n}\n"]
    }), o._debugPickDepthViewportCommand = n.createViewportQuadCommand(u, {
      uniformMap: {
        u_texture: function u_texture() {
          return o._depthTexture;
        }
      },
      owner: o
    }), o._useLogDepth = i), o._debugPickDepthViewportCommand.execute(n, a);
  }, t.prototype.update = function (e, t) {
    var r, o, n, a, i, u, d, p, h, _;

    r = this, o = e, a = (n = t).width, i = n.height, u = r._depthTexture, d = !f(u) || u.width !== a || u.height !== i, f(r._framebuffer) && !d || x(r, o, a, i), h = e, _ = t, f((p = this)._copyDepthCommand) || (p._copyDepthCommand = h.createViewportQuadCommand("uniform sampler2D u_texture;\nvarying vec2 v_textureCoordinates;\nvoid main()\n{\n    gl_FragColor = czm_packDepth(texture2D(u_texture, v_textureCoordinates).r);\n}\n", {
      renderState: m.fromCache(),
      uniformMap: {
        u_texture: function u_texture() {
          return p._textureToCopy;
        }
      },
      owner: p
    })), p._textureToCopy = _, p._copyDepthCommand.framebuffer = p._framebuffer;
  };
  var i = new a(),
      y = new a(1, 1 / 255, 1 / 65025, 1 / 16581375);
  return t.prototype.getDepth = function (e, t, r) {
    var o = e.readPixels({
      x: t,
      y: r,
      width: 1,
      height: 1,
      framebuffer: this._framebuffer
    }),
        n = a.unpack(o, 0, i);
    return a.divideByScalar(n, 255, n), a.dot(n, y);
  }, t.prototype.executeCopyDepth = function (e, t) {
    this._copyDepthCommand.execute(e, t);
  }, t.prototype.isDestroyed = function () {
    return !1;
  }, t.prototype.destroy = function () {
    return c(this), s(this), this._copyDepthCommand.shaderProgram = f(this._copyDepthCommand.shaderProgram) && this._copyDepthCommand.shaderProgram.destroy(), e(this);
  }, t;
});