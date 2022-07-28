"use strict";

define(["./IonImageryProvider", "./IonWorldImageryStyle", "../Core/defaultValue"], function (n, t, o) {
  "use strict";

  return function (e) {
    e = o(e, o.EMPTY_OBJECT);
    var r = o(e.style, t.AERIAL);
    return new n({
      assetId: r
    });
  };
});