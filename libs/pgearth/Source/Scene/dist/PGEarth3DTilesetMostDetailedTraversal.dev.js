"use strict";

define(["../Core/Intersect", "../Core/ManagedArray", "./PGEarth3DTileRefine"], function (d, e, p) {
  "use strict";

  function t() {}

  var g = {
    stack: new e(),
    stackMaximumLength: 0
  };

  function _(e) {
    return e._visible && e._inRequestVolume;
  }

  function v(e) {
    return e.hasEmptyContent || e.hasTilesetContent;
  }

  return t.selectTiles = function (e, t) {
    e._selectedTiles.length = 0, e._requestedTiles.length = 0;
    var n = !(e._hasMixedContent = !1),
        i = e.root;
    if (i.updateVisibility(t), !_(i)) return n;
    var r,
        a,
        s,
        u,
        c,
        o = g.stack;

    for (o.push(e.root); 0 < o.length;) {
      g.stackMaximumLength = Math.max(g.stackMaximumLength, o.length);

      var l = o.pop(),
          h = l.refine === p.ADD,
          f = l.refine === p.REPLACE,
          m = function (e) {
        if (0 === e.children.length) return !1;
        if (e.hasTilesetContent) return !e.contentExpired;
        if (e.hasEmptyContent) return !0;
        return !0;
      }(l);

      m && function (e, t, n) {
        for (var i = e.children, r = i.length, a = 0; a < r; ++a) {
          var s = i[a];
          s.updateVisibility(n), _(s) && t.push(s);
        }
      }(l, o, t), (h || f && !m) && (u = e, (function (e) {
        return !v(e) && e.contentUnloaded;
      }(c = l) || c.contentExpired) && (c._priority = 0, u._requestedTiles.push(c)), function (e, t, n) {
        if (t._touchedFrame === n.frameNumber) return;
        e._cache.touch(t), t._touchedFrame = n.frameNumber;
      }(e, l, t), r = e, s = t, (a = l).contentAvailable && a.contentVisibility(s) !== d.OUTSIDE && r._selectedTiles.push(a), v(l) || l.contentAvailable || (n = !1)), ++e.statistics.visited;
    }

    return g.stack.trim(g.stackMaximumLength), n;
  }, t;
});