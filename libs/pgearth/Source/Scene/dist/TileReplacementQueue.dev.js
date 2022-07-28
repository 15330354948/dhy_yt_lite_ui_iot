"use strict";

define(["../Core/defined"], function (i) {
  "use strict";

  function e() {
    this.head = void 0, this.tail = void 0, this.count = 0, this._lastBeforeStartOfFrame = void 0;
  }

  function o(e, t) {
    var r = t.replacementPrevious,
        a = t.replacementNext;
    t === e._lastBeforeStartOfFrame && (e._lastBeforeStartOfFrame = a), t === e.head ? e.head = a : r.replacementNext = a, t === e.tail ? e.tail = r : a.replacementPrevious = r, t.replacementPrevious = void 0, t.replacementNext = void 0, --e.count;
  }

  return e.prototype.markStartOfRenderFrame = function () {
    this._lastBeforeStartOfFrame = this.head;
  }, e.prototype.trimTiles = function (e) {
    for (var t = this.tail, r = !0; r && i(this._lastBeforeStartOfFrame) && this.count > e && i(t);) {
      r = t !== this._lastBeforeStartOfFrame;
      var a = t.replacementPrevious;
      t.eligibleForUnloading && (t.freeResources(), o(this, t)), t = a;
    }
  }, e.prototype.markTileRendered = function (e) {
    var t = this.head;

    if (t !== e) {
      if (++this.count, !i(t)) return e.replacementPrevious = void 0, e.replacementNext = void 0, this.head = e, void (this.tail = e);
      (i(e.replacementPrevious) || i(e.replacementNext)) && o(this, e), e.replacementPrevious = void 0, (e.replacementNext = t).replacementPrevious = e, this.head = e;
    } else e === this._lastBeforeStartOfFrame && (this._lastBeforeStartOfFrame = e.replacementNext);
  }, e;
});