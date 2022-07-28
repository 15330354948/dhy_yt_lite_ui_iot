"use strict";

define(["../Core/DeveloperError"], function (n) {
  "use strict";

  return function (e) {
    if ("string" == typeof e) {
      var t = document.getElementById(e);
      if (null === t) throw new n('Element with id "' + e + '" does not exist in the document.');
      e = t;
    }

    return e;
  };
});