"use strict";

define(["../Source/Core/AssociativeArray", "../Source/Core/Check", "../Source/Core/PGEarthTerrainProvider", "../Source/extends/layers/ElevationLayer", "./layers/ElevationLayer", "./layers/TerrainLayer"], function (e, r, i, t, n, a) {
  return function (a) {
    this.viewer = a, this.layer = new e(), this.defaultElevationLayer = a.scene.terrainProvider;
    var o = this;
    this.layer.add = function (e) {
      if (r.typeOf.object("layer", e), !(e instanceof n || e instanceof i || e instanceof t)) throw new Error("the layer type error");
      if (this.contains(e.id)) throw new Error("An Elevation with id " + e.id + " already exist in this collection");
      o.layer.set(e.id, e), a.scene.terrainProvider = e;
    }, this.layer.remove = function () {
      return o.layer.removeAll(), a.scene.terrainProvider = o.defaultElevationLayer, !0;
    };
  };
});