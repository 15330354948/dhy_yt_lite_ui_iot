"use strict";

define(["../../Core/BoundingRectangle", "../../Core/Color", "../../Core/Cartographic", "../../Core/Cartesian3", "../../Core/defined", "../../Core/destroyObject", "../../Core/Matrix4", "../../Core/OrthographicOffCenterFrustum", "../../Core/PixelFormat", "../../Renderer/ClearCommand", "../../Renderer/Framebuffer", "../../Renderer/PixelDatatype", "../../Renderer/PassState", "../../Renderer/RenderState", "../../Renderer/Texture"], function (n, o, t, r, p, e, i, s, l, a, d, m, _, h, C) {
  "use strict";

  function c() {
    this._colorTexture = void 0, this._depthStencilTexture = void 0, this.framebuffer = void 0, this._viewport = new n(), this._rs = void 0, this._useScissorTest = !1, this._scissorRectangle = void 0, this._flattenPolygonDrawCommonds = [], this._camera = new f(), this._passState = void 0, this.canvas = void 0, this._clearCommand = new a({
      depth: 1,
      color: new o(0, 0, 0, 1)
    }), this._clearPassState = void 0, this._width = 4096, this._height = 4096;
  }

  function x(e) {
    e._colorTexture = e._colorTexture && !e._colorTexture.isDestroyed() && e._colorTexture.destroy(), e._depthStencilTexture = e._depthStencilTexture && !e._depthStencilTexture.isDestroyed() && e._depthStencilTexture.destroy();
  }

  function T() {
    c.framebuffer = c.framebuffer && !c.framebuffer.isDestroyed() && c.framebuffer.destroy();
  }

  function u(e, t, r, i) {
    r = parseInt(r), i = parseInt(i);
    var o,
        s,
        a,
        n,
        h,
        c,
        u = e._colorTexture,
        f = !p(u) || u.width !== r || u.height !== i;
    p(e.framebuffer) && !f || (x(e), T(), n = t, h = r, c = i, (a = e)._clearPassState = new _(n), a._colorTexture = new C({
      context: n,
      width: h,
      height: c,
      pixelFormat: l.RGBA,
      pixelDatatype: m.UNSIGNED_BYTE
    }), a._depthStencilTexture = new C({
      context: n,
      width: h,
      height: c,
      pixelFormat: l.DEPTH_STENCIL,
      pixelDatatype: m.UNSIGNED_INT_24_8
    }), s = t, (o = e).framebuffer = new d({
      context: s,
      colorTextures: [o._colorTexture],
      depthStencilTexture: o._depthStencilTexture,
      destroyAttachments: !1
    }));
  }

  function f() {
    this.viewMatrix = i.IDENTITY, this.inverseViewMatrix = i.IDENTITY, this.frustum = new s(), this.positionCartographic = new t(), this.positionWC = new r(), this.directionWC = r.clone(r.UNIT_Z), this.upWC = r.clone(r.UNIT_Y), this.rightWC = r.clone(r.UNIT_X), this.viewProjectionMatrix = i.IDENTITY;
  }

  return f.prototype.clone = function (e) {
    i.clone(e.viewMatrix, this.viewMatrix), i.clone(e.inverseViewMatrix, this.inverseViewMatrix), this.frustum = e.frustum.clone(this.frustum), t.clone(e.positionCartographic, this.positionCartographic), r.clone(e.positionWC, this.positionWC), r.clone(e.directionWC, this.directionWC), r.clone(e.upWC, this.upWC), r.clone(e.rightWC, this.rightWC);
  }, c.prototype.updateFrustum = function (e, t, r, i) {
    this._camera.frustum.left = parseInt(e), this._camera.frustum.top = parseInt(t), this._camera.frustum.right = parseInt(r), this._camera.frustum.bottom = parseInt(i);
  }, c.prototype.update = function (e) {
    var t = this._width,
        r = this._height,
        i = e.context;
    u(this, i, t, r), p(this._passState) || (this._passState = new _(i), this._passState.framebuffer = this.framebuffer, this._passState.viewport = new n(0, 0, t, r));
    var o = i.uniformState;
    o.updateCamera(this._camera), this._clearCommand.framebuffer = this.framebuffer, this._clearCommand.execute(i, this._clearPassState);

    for (var s = 0; s < this._flattenPolygonDrawCommonds.length; s++) {
      var a = this._flattenPolygonDrawCommonds[s];
      o.updatePass(a.pass), a.framebuffer = this.framebuffer, a.execute(i, this._passState);
    }
  }, c.prototype.clear = function (e, t, r) {
    var i = this._clearColorCommand;
    p(i) && (o.clone(r, i.color), i.execute(e, t));
  }, c.prototype.isDestroyed = function () {
    return !1;
  }, c.prototype.destroy = function () {
    return x(this), T(), e(this);
  }, c;
});