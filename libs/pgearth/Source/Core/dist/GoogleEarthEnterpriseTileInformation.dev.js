"use strict";

define(["./defined", "./isBitSet"], function (t, i) {
  "use strict";

  var e = [1, 2, 4, 8];

  function n(r, i, t, e, n, s) {
    this._bits = r, this.cnodeVersion = i, this.imageryVersion = t, this.terrainVersion = e, this.imageryProvider = n, this.terrainProvider = s, this.ancestorHasTerrain = !1, this.terrainState = void 0;
  }

  return n.clone = function (r, i) {
    return t(i) ? (i._bits = r._bits, i.cnodeVersion = r.cnodeVersion, i.imageryVersion = r.imageryVersion, i.terrainVersion = r.terrainVersion, i.imageryProvider = r.imageryProvider, i.terrainProvider = r.terrainProvider) : i = new n(r._bits, r.cnodeVersion, r.imageryVersion, r.terrainVersion, r.imageryProvider, r.terrainProvider), i.ancestorHasTerrain = r.ancestorHasTerrain, i.terrainState = r.terrainState, i;
  }, n.prototype.setParent = function (r) {
    this.ancestorHasTerrain = r.ancestorHasTerrain || this.hasTerrain();
  }, n.prototype.hasSubtree = function () {
    return i(this._bits, 16);
  }, n.prototype.hasImagery = function () {
    return i(this._bits, 64);
  }, n.prototype.hasTerrain = function () {
    return i(this._bits, 128);
  }, n.prototype.hasChildren = function () {
    return i(this._bits, 15);
  }, n.prototype.hasChild = function (r) {
    return i(this._bits, e[r]);
  }, n.prototype.getChildBitmask = function () {
    return 15 & this._bits;
  }, n;
});