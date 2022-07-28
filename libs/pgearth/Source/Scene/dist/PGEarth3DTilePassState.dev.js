"use strict";

define(["../Core/Check"], function (t) {
  "use strict";

  return function (s) {
    t.typeOf.object("options", s), t.typeOf.number("options.pass", s.pass), this.pass = s.pass, this.commandList = s.commandList, this.camera = s.camera, this.cullingVolume = s.cullingVolume, this.ready = !1;
  };
});