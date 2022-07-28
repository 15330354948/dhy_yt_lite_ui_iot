"use strict";

define(["../Core/freezeObject"], function (E) {
  "use strict";

  var r = {
    DISABLED: 0,
    ENABLED: 1,
    CAST_ONLY: 2,
    RECEIVE_ONLY: 3,
    NUMBER_OF_SHADOW_MODES: 4,
    castShadows: function castShadows(E) {
      return E === r.ENABLED || E === r.CAST_ONLY;
    },
    receiveShadows: function receiveShadows(E) {
      return E === r.ENABLED || E === r.RECEIVE_ONLY;
    },
    fromCastReceive: function fromCastReceive(E, e) {
      return E && e ? r.ENABLED : E ? r.CAST_ONLY : e ? r.RECEIVE_ONLY : r.DISABLED;
    }
  };
  return E(r);
});