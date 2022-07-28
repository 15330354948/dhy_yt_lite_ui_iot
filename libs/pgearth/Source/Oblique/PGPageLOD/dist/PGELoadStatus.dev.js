"use strict";

define(["../../Core/freezeObject"], function (e) {
  "use strict";

  return e({
    PG_UNLOAD: 0,
    PG_LOADING: 1,
    PG_NET_LOADING: 2,
    PG_NET_LOADED: 3,
    PG_LOADED: 4,
    PG_FAILED: 5
  });
});