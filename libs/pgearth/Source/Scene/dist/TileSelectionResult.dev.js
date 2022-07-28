"use strict";

define([], function () {
  "use strict";

  var D = {
    NONE: 0,
    CULLED: 1,
    RENDERED: 2,
    REFINED: 3,
    RENDERED_AND_KICKED: 6,
    REFINED_AND_KICKED: 7,
    CULLED_BUT_NEEDED: 9,
    wasKicked: function wasKicked(E) {
      return E >= D.RENDERED_AND_KICKED;
    },
    originalResult: function originalResult(E) {
      return 3 & E;
    },
    kick: function kick(E) {
      return 4 | E;
    }
  };
  return D;
});