"use strict";

define(function () {
  "use strict";

  return function (n) {
    return 0 !== n.length && "/" === n[n.length - 1] || (n += "/"), n;
  };
});