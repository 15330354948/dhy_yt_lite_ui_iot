"use strict";

define(["../ThirdParty/knockout"], function (c) {
  "use strict";

  return function (e, r, t, n, u) {
    return t.call(n, e[r]), c.getObservable(e, r).subscribe(t, n, u);
  };
});