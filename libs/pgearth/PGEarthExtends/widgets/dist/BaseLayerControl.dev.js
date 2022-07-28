"use strict";

define(["../layers/WMTSLayer", "../layers/WMSLayer", "../layers/ArcGisBaseLayer", "../../Source/extends/layers/ElevationLayer", "../layers/WebTileLayer", "../../Source/Core/defined", "../../Source/Core/DeveloperError", "../../Source/Scene/UrlTemplateImageryProvider"], function (e, r, a, i, t, s, y, l) {
  return {
    addLayer: function addLayer(l) {
      if (!s(l.viewer)) throw new y("viewer is required");
      if (!s(l.type)) throw new y("type is required");
      if (!s(l.url)) throw new y("url is required");
      this.removeLayer(l.viewer);
      var o,
          n = l.viewer.imageryLayers;
      if ("arcgis" == l.type) o = new a({
        id: "_baseLayer_516",
        url: l.url
      });else if ("wmts" == l.type) o = new e({
        id: "_baseLayer_516",
        url: l.url,
        title: l.wmtsOptions.title,
        format: l.wmtsOptions.format,
        tileMatrixSet: l.wmtsOptions.tileMatrixSet
      });else if ("google" == l.type) o = new t({
        id: "_baseLayer_516",
        url: l.url
      });else {
        if ("dem" == l.type) return o = new i({
          url: l.url
        }), viewer.map.ground.layer.add(o), o;
        o = new r({
          id: "_baseLayer_516",
          url: l.url,
          layers: "0"
        });
      }
      return n.addImageryProvider(o, 2), l.viewer.map.layers.set("_baseLayer_516", o), o;
    },
    removeLayer: function removeLayer(e, r) {
      if (r instanceof i) e.scene.terrainProvider = e.map.ground.defaultElevationLayer;else {
        var a = e.imageryLayers;
        e.map.layers.get("_baseLayer_516") && e.imageryLayers.remove(a.get(2)), e.map.layers.remove("_baseLayer_516");
      }
    }
  };
});