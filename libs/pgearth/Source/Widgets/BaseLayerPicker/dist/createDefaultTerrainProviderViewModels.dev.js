"use strict";

define(["../../Core/buildModuleUrl", "../../Core/createWorldTerrain", "../../Core/EllipsoidTerrainProvider", "../BaseLayerPicker/ProviderViewModel"], function (e, i, o, n) {
  "use strict";

  return function () {
    var r = [];
    return r.push(new n({
      name: "WGS84 Ellipsoid",
      iconUrl: e("Widgets/Images/TerrainProviders/Ellipsoid.png"),
      tooltip: "WGS84 standard ellipsoid, also known as EPSG:4326",
      category: "PGEarth ion",
      creationFunction: function creationFunction() {
        return new o();
      }
    })), r.push(new n({
      name: "PGEarth World Terrain",
      iconUrl: e("Widgets/Images/TerrainProviders/PGEarthWorldTerrain.png"),
      tooltip: "High-resolution global terrain tileset curated from several datasources and hosted by PGEarth ion",
      category: "PGEarth ion",
      creationFunction: function creationFunction() {
        return i({
          requestWaterMask: !0,
          requestVertexNormals: !0
        });
      }
    })), r;
  };
});