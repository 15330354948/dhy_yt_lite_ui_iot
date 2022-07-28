"use strict";

define(["../Core/freezeObject", "./BlendEquation", "./BlendFunction"], function (n, e, t) {
  "use strict";

  var A = {
    DISABLED: n({
      enabled: !1
    }),
    ALPHA_BLEND: n({
      enabled: !0,
      equationRgb: e.ADD,
      equationAlpha: e.ADD,
      functionSourceRgb: t.SOURCE_ALPHA,
      functionSourceAlpha: t.SOURCE_ALPHA,
      functionDestinationRgb: t.ONE_MINUS_SOURCE_ALPHA,
      functionDestinationAlpha: t.ONE_MINUS_SOURCE_ALPHA
    }),
    PRE_MULTIPLIED_ALPHA_BLEND: n({
      enabled: !0,
      equationRgb: e.ADD,
      equationAlpha: e.ADD,
      functionSourceRgb: t.ONE,
      functionSourceAlpha: t.ONE,
      functionDestinationRgb: t.ONE_MINUS_SOURCE_ALPHA,
      functionDestinationAlpha: t.ONE_MINUS_SOURCE_ALPHA
    }),
    ADDITIVE_BLEND: n({
      enabled: !0,
      equationRgb: e.ADD,
      equationAlpha: e.ADD,
      functionSourceRgb: t.SOURCE_ALPHA,
      functionSourceAlpha: t.SOURCE_ALPHA,
      functionDestinationRgb: t.ONE,
      functionDestinationAlpha: t.ONE
    })
  };
  return n(A);
});