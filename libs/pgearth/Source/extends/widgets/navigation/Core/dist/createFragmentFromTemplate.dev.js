"use strict";

define([], function () {
  "use strict";

  return function (e) {
    var n = document.createElement("div");
    n.innerHTML = e;

    for (var t = document.createDocumentFragment(); n.firstChild;) {
      t.appendChild(n.firstChild);
    }

    return t;
  };
});