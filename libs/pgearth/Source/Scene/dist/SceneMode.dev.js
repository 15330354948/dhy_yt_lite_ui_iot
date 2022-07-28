"use strict";

define(["../Core/freezeObject"], function (e) {
  "use strict";

  var r = {
    MORPHING: 0,
    COLUMBUS_VIEW: 1,
    SCENE2D: 2,
    SCENE3D: 3,
    getMorphTime: function getMorphTime(e) {
      return e === r.SCENE3D ? 1 : e !== r.MORPHING ? 0 : void 0;
    }
  };
  return e(r);
});