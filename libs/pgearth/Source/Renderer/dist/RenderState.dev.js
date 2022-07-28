"use strict";

define(["../Core/BoundingRectangle", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/DeveloperError", "../Core/WebGLConstants", "../Core/WindingOrder", "./ContextLimits", "./freezeRenderState", "../extends/core/ExpendUtil"], function (S, w, O, v, R, A, C, E, r, k) {
  "use strict";

  function m(e) {
    return e === A.FUNC_ADD || e === A.FUNC_SUBTRACT || e === A.FUNC_REVERSE_SUBTRACT || e === A.MIN || e === A.MAX;
  }

  function F(e) {
    return e === A.ZERO || e === A.ONE || e === A.SRC_COLOR || e === A.ONE_MINUS_SRC_COLOR || e === A.DST_COLOR || e === A.ONE_MINUS_DST_COLOR || e === A.SRC_ALPHA || e === A.ONE_MINUS_SRC_ALPHA || e === A.DST_ALPHA || e === A.ONE_MINUS_DST_ALPHA || e === A.CONSTANT_COLOR || e === A.ONE_MINUS_CONSTANT_COLOR || e === A.CONSTANT_ALPHA || e === A.ONE_MINUS_CONSTANT_ALPHA || e === A.SRC_ALPHA_SATURATE;
  }

  function N(e) {
    return e === A.NEVER || e === A.LESS || e === A.EQUAL || e === A.LEQUAL || e === A.GREATER || e === A.NOTEQUAL || e === A.GEQUAL || e === A.ALWAYS;
  }

  function _(e) {
    return e === A.ZERO || e === A.KEEP || e === A.REPLACE || e === A.INCR || e === A.DECR || e === A.INVERT || e === A.INCR_WRAP || e === A.DECR_WRAP;
  }

  function o(e) {
    var n,
        t,
        i = O(e, {}),
        a = O(i.cull, {}),
        r = O(i.polygonOffset, {}),
        o = O(i.scissorTest, {}),
        s = O(o.rectangle, {}),
        l = O(i.depthRange, {}),
        c = O(i.depthTest, {}),
        d = O(i.colorMask, {}),
        h = O(i.blending, {}),
        f = O(h.color, {}),
        u = O(i.stencilTest, {}),
        p = O(u.frontOperation, {}),
        b = O(u.backOperation, {}),
        g = O(i.sampleCoverage, {}),
        T = i.viewport;
    if (this.frontFace = O(i.frontFace, C.COUNTER_CLOCKWISE), this.cull = {
      enabled: O(k.underEarth.cullFace, O(a.enabled, !1)),
      face: O(a.face, A.BACK)
    }, this.lineWidth = O(i.lineWidth, 1), this.polygonOffset = {
      enabled: O(r.enabled, !1),
      factor: O(r.factor, 0),
      units: O(r.units, 0)
    }, this.scissorTest = {
      enabled: O(o.enabled, !1),
      rectangle: S.clone(s)
    }, this.depthRange = {
      near: O(l.near, 0),
      far: O(l.far, 1)
    }, this.depthTest = {
      enabled: O(c.enabled, !1),
      func: O(c.func, A.LESS)
    }, this.colorMask = {
      red: O(d.red, !0),
      green: O(d.green, !0),
      blue: O(d.blue, !0),
      alpha: O(d.alpha, !0)
    }, this.depthMask = O(i.depthMask, !0), this.stencilMask = O(i.stencilMask, -1), this.blending = {
      enabled: O(h.enabled, !1),
      color: new w(O(f.red, 0), O(f.green, 0), O(f.blue, 0), O(f.alpha, 0)),
      equationRgb: O(h.equationRgb, A.FUNC_ADD),
      equationAlpha: O(h.equationAlpha, A.FUNC_ADD),
      functionSourceRgb: O(h.functionSourceRgb, A.ONE),
      functionSourceAlpha: O(h.functionSourceAlpha, A.ONE),
      functionDestinationRgb: O(h.functionDestinationRgb, A.ZERO),
      functionDestinationAlpha: O(h.functionDestinationAlpha, A.ZERO)
    }, this.stencilTest = {
      enabled: O(u.enabled, !1),
      frontFunction: O(u.frontFunction, A.ALWAYS),
      backFunction: O(u.backFunction, A.ALWAYS),
      reference: O(u.reference, 0),
      mask: O(u.mask, -1),
      frontOperation: {
        fail: O(p.fail, A.KEEP),
        zFail: O(p.zFail, A.KEEP),
        zPass: O(p.zPass, A.KEEP)
      },
      backOperation: {
        fail: O(b.fail, A.KEEP),
        zFail: O(b.zFail, A.KEEP),
        zPass: O(b.zPass, A.KEEP)
      }
    }, this.sampleCoverage = {
      enabled: O(g.enabled, !1),
      value: O(g.value, 1),
      invert: O(g.invert, !1)
    }, this.viewport = v(T) ? new S(T.x, T.y, T.width, T.height) : void 0, this.lineWidth < E.minimumAliasedLineWidth || this.lineWidth > E.maximumAliasedLineWidth) throw new R("renderState.lineWidth is out of range.  Check minimumAliasedLineWidth and maximumAliasedLineWidth.");
    if (!C.validate(this.frontFace)) throw new R("Invalid renderState.frontFace.");
    if ((n = this.cull.face) !== A.FRONT && n !== A.BACK && n !== A.FRONT_AND_BACK) throw new R("Invalid renderState.cull.face.");
    if (this.scissorTest.rectangle.width < 0 || this.scissorTest.rectangle.height < 0) throw new R("renderState.scissorTest.rectangle.width and renderState.scissorTest.rectangle.height must be greater than or equal to zero.");
    if (this.depthRange.near > this.depthRange.far) throw new R("renderState.depthRange.near can not be greater than renderState.depthRange.far.");
    if (this.depthRange.near < 0) throw new R("renderState.depthRange.near must be greater than or equal to zero.");
    if (1 < this.depthRange.far) throw new R("renderState.depthRange.far must be less than or equal to one.");
    if ((t = this.depthTest.func) !== A.NEVER && t !== A.LESS && t !== A.EQUAL && t !== A.LEQUAL && t !== A.GREATER && t !== A.NOTEQUAL && t !== A.GEQUAL && t !== A.ALWAYS) throw new R("Invalid renderState.depthTest.func.");
    if (this.blending.color.red < 0 || 1 < this.blending.color.red || this.blending.color.green < 0 || 1 < this.blending.color.green || this.blending.color.blue < 0 || 1 < this.blending.color.blue || this.blending.color.alpha < 0 || 1 < this.blending.color.alpha) throw new R("renderState.blending.color components must be greater than or equal to zero and less than or equal to one.");
    if (!m(this.blending.equationRgb)) throw new R("Invalid renderState.blending.equationRgb.");
    if (!m(this.blending.equationAlpha)) throw new R("Invalid renderState.blending.equationAlpha.");
    if (!F(this.blending.functionSourceRgb)) throw new R("Invalid renderState.blending.functionSourceRgb.");
    if (!F(this.blending.functionSourceAlpha)) throw new R("Invalid renderState.blending.functionSourceAlpha.");
    if (!F(this.blending.functionDestinationRgb)) throw new R("Invalid renderState.blending.functionDestinationRgb.");
    if (!F(this.blending.functionDestinationAlpha)) throw new R("Invalid renderState.blending.functionDestinationAlpha.");
    if (!N(this.stencilTest.frontFunction)) throw new R("Invalid renderState.stencilTest.frontFunction.");
    if (!N(this.stencilTest.backFunction)) throw new R("Invalid renderState.stencilTest.backFunction.");
    if (!_(this.stencilTest.frontOperation.fail)) throw new R("Invalid renderState.stencilTest.frontOperation.fail.");
    if (!_(this.stencilTest.frontOperation.zFail)) throw new R("Invalid renderState.stencilTest.frontOperation.zFail.");
    if (!_(this.stencilTest.frontOperation.zPass)) throw new R("Invalid renderState.stencilTest.frontOperation.zPass.");
    if (!_(this.stencilTest.backOperation.fail)) throw new R("Invalid renderState.stencilTest.backOperation.fail.");
    if (!_(this.stencilTest.backOperation.zFail)) throw new R("Invalid renderState.stencilTest.backOperation.zFail.");
    if (!_(this.stencilTest.backOperation.zPass)) throw new R("Invalid renderState.stencilTest.backOperation.zPass.");

    if (v(this.viewport)) {
      if (this.viewport.width < 0) throw new R("renderState.viewport.width must be greater than or equal to zero.");
      if (this.viewport.height < 0) throw new R("renderState.viewport.height must be greater than or equal to zero.");
      if (this.viewport.width > E.maximumViewportWidth) throw new R("renderState.viewport.width must be less than or equal to the maximum viewport width (" + E.maximumViewportWidth.toString() + ").  Check maximumViewportWidth.");
      if (this.viewport.height > E.maximumViewportHeight) throw new R("renderState.viewport.height must be less than or equal to the maximum viewport height (" + E.maximumViewportHeight.toString() + ").  Check maximumViewportHeight.");
    }

    this.id = 0, this._applyFunctions = [];
  }

  var s = 0,
      l = {};

  function g(e, n, t) {
    t ? e.enable(n) : e.disable(n);
  }

  function p(e, n) {
    e.frontFace(n.frontFace);
  }

  function b(e, n) {
    var t = n.cull,
        i = t.enabled;
    g(e, e.CULL_FACE, i), i && e.cullFace(t.face);
  }

  function T(e, n) {
    e.lineWidth(n.lineWidth);
  }

  function L(e, n) {
    var t = n.polygonOffset,
        i = t.enabled;
    g(e, e.POLYGON_OFFSET_FILL, i), i && e.polygonOffset(t.factor, t.units);
  }

  function M(e, n, t) {
    var i,
        a = n.scissorTest,
        r = v(t.scissorTest) ? t.scissorTest.enabled : a.enabled;
    g(e, e.SCISSOR_TEST, r), r && (i = v(t.scissorTest) ? t.scissorTest.rectangle : a.rectangle, e.scissor(i.x, i.y, i.width, i.height));
  }

  function z(e, n) {
    var t = n.depthRange;
    e.depthRange(t.near, t.far);
  }

  function P(e, n) {
    var t = n.depthTest,
        i = t.enabled;
    g(e, e.DEPTH_TEST, i), i && e.depthFunc(t.func);
  }

  function I(e, n) {
    var t = n.colorMask;
    e.colorMask(t.red, t.green, t.blue, t.alpha);
  }

  function D(e, n) {
    e.depthMask(n.depthMask);
  }

  function W(e, n) {
    e.stencilMask(n.stencilMask);
  }

  function y(e, n, t) {
    var i,
        a,
        r = n.blending,
        o = v(t.blendingEnabled) ? t.blendingEnabled : r.enabled;
    g(e, e.BLEND, o), o && (i = e, a = r.color, i.blendColor(a.red, a.green, a.blue, a.alpha), e.blendEquationSeparate(r.equationRgb, r.equationAlpha), e.blendFuncSeparate(r.functionSourceRgb, r.functionDestinationRgb, r.functionSourceAlpha, r.functionDestinationAlpha));
  }

  function q(e, n) {
    var t,
        i,
        a,
        r,
        o,
        s,
        l,
        c,
        d,
        h,
        f,
        u,
        p = n.stencilTest,
        b = p.enabled;
    g(e, e.STENCIL_TEST, b), b && (t = p.frontFunction, i = p.backFunction, a = p.reference, r = p.mask, e.stencilFunc(t, a, r), e.stencilFuncSeparate(e.BACK, i, a, r), e.stencilFuncSeparate(e.FRONT, t, a, r), s = (o = p.frontOperation).fail, l = o.zFail, c = o.zPass, e.stencilOpSeparate(e.FRONT, s, l, c), h = (d = p.backOperation).fail, f = d.zFail, u = d.zPass, e.stencilOpSeparate(e.BACK, h, f, u));
  }

  function U(e, n) {
    var t = n.sampleCoverage,
        i = t.enabled;
    g(e, e.SAMPLE_COVERAGE, i), i && e.sampleCoverage(t.value, t.invert);
  }

  o.fromCache = function (e) {
    var n = JSON.stringify(e),
        t = l[n];
    if (v(t)) return ++t.referenceCount, t.state;
    var i = new o(e),
        a = JSON.stringify(i),
        t = l[a];
    return v(t) || (i.id = s++, t = {
      referenceCount: 0,
      state: i = r(i)
    }, l[a] = t), ++t.referenceCount, l[n] = {
      referenceCount: 1,
      state: t.state
    }, t.state;
  }, o.removeFromCache = function (e) {
    var n = new o(e),
        t = JSON.stringify(n),
        i = l[t],
        a = JSON.stringify(e),
        r = l[a];
    v(r) && (--r.referenceCount, 0 === r.referenceCount && (delete l[a], v(i) && --i.referenceCount)), v(i) && 0 === i.referenceCount && delete l[t];
  }, o.getCache = function () {
    return l;
  }, o.clearCache = function () {
    l = {};
  };
  var a = new S();

  function x(e, n, t) {
    var i = O(n.viewport, t.viewport);
    v(i) || ((i = a).width = t.context.drawingBufferWidth, i.height = t.context.drawingBufferHeight), t.context.uniformState.viewport = i, e.viewport(i.x, i.y, i.width, i.height);
  }

  return o.apply = function (e, n, t) {
    p(e, n), b(e, n), T(e, n), L(e, n), z(e, n), P(e, n), I(e, n), D(e, n), W(e, n), q(e, n), U(e, n), M(e, n, t), y(e, n, t), x(e, n, t);
  }, o.partialApply = function (e, n, t, i, a, r) {
    if (n !== t) {
      var o = t._applyFunctions[n.id];
      v(o) || (d = t, h = [], (c = n).frontFace !== d.frontFace && h.push(p), c.cull.enabled === d.cull.enabled && c.cull.face === d.cull.face || h.push(b), c.lineWidth !== d.lineWidth && h.push(T), c.polygonOffset.enabled === d.polygonOffset.enabled && c.polygonOffset.factor === d.polygonOffset.factor && c.polygonOffset.units === d.polygonOffset.units || h.push(L), c.depthRange.near === d.depthRange.near && c.depthRange.far === d.depthRange.far || h.push(z), c.depthTest.enabled === d.depthTest.enabled && c.depthTest.func === d.depthTest.func || h.push(P), c.colorMask.red === d.colorMask.red && c.colorMask.green === d.colorMask.green && c.colorMask.blue === d.colorMask.blue && c.colorMask.alpha === d.colorMask.alpha || h.push(I), c.depthMask !== d.depthMask && h.push(D), c.stencilMask !== d.stencilMask && h.push(W), c.stencilTest.enabled === d.stencilTest.enabled && c.stencilTest.frontFunction === d.stencilTest.frontFunction && c.stencilTest.backFunction === d.stencilTest.backFunction && c.stencilTest.reference === d.stencilTest.reference && c.stencilTest.mask === d.stencilTest.mask && c.stencilTest.frontOperation.fail === d.stencilTest.frontOperation.fail && c.stencilTest.frontOperation.zFail === d.stencilTest.frontOperation.zFail && c.stencilTest.backOperation.fail === d.stencilTest.backOperation.fail && c.stencilTest.backOperation.zFail === d.stencilTest.backOperation.zFail && c.stencilTest.backOperation.zPass === d.stencilTest.backOperation.zPass || h.push(q), c.sampleCoverage.enabled === d.sampleCoverage.enabled && c.sampleCoverage.value === d.sampleCoverage.value && c.sampleCoverage.invert === d.sampleCoverage.invert || h.push(U), o = h, t._applyFunctions[n.id] = o);

      for (var s = o.length, l = 0; l < s; ++l) {
        o[l](e, t);
      }
    }

    var c, d, h;
    (v(i.scissorTest) ? i.scissorTest : n.scissorTest) === (v(a.scissorTest) ? a.scissorTest : t.scissorTest) && !r || M(e, t, a);
    var f = v(i.blendingEnabled) ? i.blendingEnabled : n.blending.enabled,
        u = v(a.blendingEnabled) ? a.blendingEnabled : t.blending.enabled;
    (f !== u || u && n.blending !== t.blending) && y(e, t, a), n === t && i === a && i.context === a.context || x(e, t, a);
  }, o.getState = function (e) {
    if (!v(e)) throw new R("renderState is required.");
    return {
      frontFace: e.frontFace,
      cull: {
        enabled: e.cull.enabled,
        face: e.cull.face
      },
      lineWidth: e.lineWidth,
      polygonOffset: {
        enabled: e.polygonOffset.enabled,
        factor: e.polygonOffset.factor,
        units: e.polygonOffset.units
      },
      scissorTest: {
        enabled: e.scissorTest.enabled,
        rectangle: S.clone(e.scissorTest.rectangle)
      },
      depthRange: {
        near: e.depthRange.near,
        far: e.depthRange.far
      },
      depthTest: {
        enabled: e.depthTest.enabled,
        func: e.depthTest.func
      },
      colorMask: {
        red: e.colorMask.red,
        green: e.colorMask.green,
        blue: e.colorMask.blue,
        alpha: e.colorMask.alpha
      },
      depthMask: e.depthMask,
      stencilMask: e.stencilMask,
      blending: {
        enabled: e.blending.enabled,
        color: w.clone(e.blending.color),
        equationRgb: e.blending.equationRgb,
        equationAlpha: e.blending.equationAlpha,
        functionSourceRgb: e.blending.functionSourceRgb,
        functionSourceAlpha: e.blending.functionSourceAlpha,
        functionDestinationRgb: e.blending.functionDestinationRgb,
        functionDestinationAlpha: e.blending.functionDestinationAlpha
      },
      stencilTest: {
        enabled: e.stencilTest.enabled,
        frontFunction: e.stencilTest.frontFunction,
        backFunction: e.stencilTest.backFunction,
        reference: e.stencilTest.reference,
        mask: e.stencilTest.mask,
        frontOperation: {
          fail: e.stencilTest.frontOperation.fail,
          zFail: e.stencilTest.frontOperation.zFail,
          zPass: e.stencilTest.frontOperation.zPass
        },
        backOperation: {
          fail: e.stencilTest.backOperation.fail,
          zFail: e.stencilTest.backOperation.zFail,
          zPass: e.stencilTest.backOperation.zPass
        }
      },
      sampleCoverage: {
        enabled: e.sampleCoverage.enabled,
        value: e.sampleCoverage.value,
        invert: e.sampleCoverage.invert
      },
      viewport: v(e.viewport) ? S.clone(e.viewport) : void 0
    };
  }, o;
});