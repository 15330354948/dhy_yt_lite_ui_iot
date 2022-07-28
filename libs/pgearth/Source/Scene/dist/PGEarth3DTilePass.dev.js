"use strict";

define(["../Core/Check", "../Core/freezeObject", "./PGEarth3DTilesetMostDetailedTraversal", "./PGEarth3DTilesetTraversal"], function (e, r, s, E) {
  "use strict";

  var a = {
    RENDER: 0,
    PICK: 1,
    SHADOW: 2,
    PRELOAD: 3,
    PRELOAD_FLIGHT: 4,
    REQUEST_RENDER_MODE_DEFER_CHECK: 5,
    MOST_DETAILED_PRELOAD: 6,
    MOST_DETAILED_PICK: 7,
    NUMBER_OF_PASSES: 8
  },
      n = new Array(a.NUMBER_OF_PASSES);
  return n[a.RENDER] = r({
    traversal: E,
    isRender: !0,
    requestTiles: !0,
    ignoreCommands: !1
  }), n[a.PICK] = r({
    traversal: E,
    isRender: !1,
    requestTiles: !1,
    ignoreCommands: !1
  }), n[a.SHADOW] = r({
    traversal: E,
    isRender: !1,
    requestTiles: !0,
    ignoreCommands: !1
  }), n[a.PRELOAD] = r({
    traversal: E,
    isRender: !1,
    requestTiles: !0,
    ignoreCommands: !0
  }), n[a.PRELOAD_FLIGHT] = r({
    traversal: E,
    isRender: !1,
    requestTiles: !0,
    ignoreCommands: !0
  }), n[a.REQUEST_RENDER_MODE_DEFER_CHECK] = r({
    traversal: E,
    isRender: !1,
    requestTiles: !0,
    ignoreCommands: !0
  }), n[a.MOST_DETAILED_PRELOAD] = r({
    traversal: s,
    isRender: !1,
    requestTiles: !0,
    ignoreCommands: !0
  }), n[a.MOST_DETAILED_PICK] = r({
    traversal: s,
    isRender: !1,
    requestTiles: !1,
    ignoreCommands: !1
  }), a.getPassOptions = function (e) {
    return n[e];
  }, r(a);
});