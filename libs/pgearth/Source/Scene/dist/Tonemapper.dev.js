"use strict";

define(["../Core/freezeObject"], function (I) {
  "use strict";

  var e = {
    REINHARD: 0,
    MODIFIED_REINHARD: 1,
    FILMIC: 2,
    ACES: 3,
    validate: function validate(I) {
      return I === e.REINHARD || I === e.MODIFIED_REINHARD || I === e.FILMIC || I === e.ACES;
    }
  };
  return I(e);
});