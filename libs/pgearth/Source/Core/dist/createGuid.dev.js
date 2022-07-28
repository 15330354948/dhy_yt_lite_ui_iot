"use strict";

define(function () {
  "use strict";

  return function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (x) {
      var n = 16 * Math.random() | 0;
      return ("x" === x ? n : 3 & n | 8).toString(16);
    });
  };
});