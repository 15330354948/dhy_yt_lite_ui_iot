"use strict";

define(["../Core/freezeObject", "../Core/Math"], function (e, t) {
  "use strict";

  var n = {
    HIGHLIGHT: 0,
    REPLACE: 1,
    MIX: 2,
    getColorBlend: function getColorBlend(e, r) {
      return e === n.HIGHLIGHT ? 0 : e === n.REPLACE ? 1 : e === n.MIX ? t.clamp(r, t.EPSILON4, 1) : void 0;
    }
  };
  return e(n);
});