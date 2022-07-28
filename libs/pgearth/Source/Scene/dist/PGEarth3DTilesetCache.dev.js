"use strict";

define(["../Core/defined", "../Core/DoublyLinkedList"], function (o, t) {
  "use strict";

  function i() {
    this._list = new t(), this._sentinel = this._list.add(), this._trimTiles = !1;
  }

  return i.prototype.reset = function () {
    this._list.splice(this._list.tail, this._sentinel);
  }, i.prototype.touch = function (t) {
    var i = t.cacheNode;
    o(i) && this._list.splice(this._sentinel, i);
  }, i.prototype.add = function (t) {
    o(t.cacheNode) || (t.cacheNode = this._list.add(t));
  }, i.prototype.unloadTile = function (t, i, e) {
    var s = i.cacheNode;
    o(s) && (this._list.remove(s), i.cacheNode = void 0, e(t, i));
  }, i.prototype.unloadTiles = function (t, i) {
    var e = this._trimTiles;
    this._trimTiles = !1;

    for (var s = this._list, o = 1024 * t.maximumMemoryUsage * 1024, n = this._sentinel, l = s.head; l !== n && (t.totalMemoryUsageInBytes > o || e);) {
      var r = l.item,
          l = l.next;
      this.unloadTile(t, r, i);
    }
  }, i.prototype.trim = function () {
    this._trimTiles = !0;
  }, i;
});