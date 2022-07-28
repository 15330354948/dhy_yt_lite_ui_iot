"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

define(["../Source/Core/AssociativeArray", "../Source/Scene/VerticalOrigin", "../Source/ThirdParty/knockout", "../Source/Core/Color", "../Source/Core/Check", "../Source/DataSources/GeoJsonDataSource", "../Source/Scene/PGEarth3DTileset", "../Source/Scene/WebMapServiceImageryProvider", "../Source/Scene/WebMapTileServiceImageryProvider", "../Source/Scene/ArcGisMapServerImageryProvider", "../Source/Core/RuntimeError", "../Source/Scene/GroundPrimitive", "../Source/Scene/ImageryLayer", "../Source/Scene/UrlTemplateImageryProvider", "../Source/Oblique/PGPageLOD/PGPageLOD", "./others/CircleBuilder", "./layers/GraphicsLayer", "./layers/ClusterLayer", "./Ground", "../Source/extends/layers/ElevationGradientImageryProvider"], function (e, i, r, t, a, n, s, o, c, d, l, v, u, f, y, m, g, h, w, S) {
  function L(i) {
    this.viewer = i, this.allLayers = new e(), this.basemap = new e(), this.ground = new w(i), this.layers = new e();
  }

  return L.prototype.add = function (e, u) {
    var w = this;
    if (a.typeOf.object("layer", e), e instanceof y && (this.viewer.scene.requestRenderMode = !1), e.id && this.layers.contains(e.id)) throw new l("A Graphic with id " + e.id + " already exist in this collection");

    if (!e.then) {
      if (e instanceof g) p = w.viewer.entities;else if (e instanceof s) w.viewer.scene.primitives.add(e);else if (e instanceof o) {
        var _i = e.id;
        (e = w.viewer.imageryLayers.addImageryProvider(e)).id = _i;
      } else if (e instanceof c) {
        var L = e.id;
        (e = w.viewer.imageryLayers.addImageryProvider(e)).id = L;
      } else if (e instanceof f) {
        L = e.id;
        (e = w.viewer.imageryLayers.addImageryProvider(e)).id = L;
      } else if (e instanceof v) e = w.viewer.scene.primitives.add(e);else if (e instanceof y) e = w.viewer.scene.pageLODLayers.add(e);else if (e instanceof d) {
        L = e.id;
        (e = w.viewer.imageryLayers.addImageryProvider(e)).id = L;
      } else if (e instanceof S) {
        L = e.id;
        (e = w.viewer.imageryLayers.addImageryProvider(e)).id = L;
      } else e instanceof h ? w.viewer.dataSources.add(e._delegate) : p = w.viewer.scene.primitives;
      w.layers.set(e.id, e), e.viewer = this.viewer;
      var p,
          b = e.items;
      return b instanceof Array && b.forEach(function (e, i, r) {
        p.add(e);
      }), this.viewer.scene.requestRender(), e;
    }

    e.then(function (a) {
      if (a instanceof n) {
        if (w.viewer.dataSources.add(a), a.entities._entities._array.forEach(function (e, i, r) {
          e.point = {
            pixelSize: 10,
            color: t.RED
          }, e.billboard = null;
        }), e.featureReduction) {
          var _h = function _h(e) {
            r.getObservable(g, e).subscribe(function (i) {
              a.clustering[e] = i;
            });
          };

          var s;
          a.clustering.enabled = !0, a.clustering.pixelRange = 15, a.clustering.minimumClusterSize = 3;

          for (var o = new m(), c = o.fromText("50+", t.RED, 48).toDataURL(), d = o.fromText("40+", t.ORANGE, 48).toDataURL(), l = o.fromText("30+", t.YELLOW, 48).toDataURL(), v = o.fromText("20+", t.GREEN, 48).toDataURL(), u = o.fromText("10+", t.BLUE, 48).toDataURL(), f = new Array(8), y = 0; y < f.length; ++y) {
            f[y] = o.fromText("" + (y + 2), t.VIOLET, 48).toDataURL();
          }

          !function () {
            s ? (s(), s = void 0) : s = a.clustering.clusterEvent.addEventListener(function (e, r) {
              r.label.show = !1, r.billboard.show = !0, r.billboard.id = r.label.id, r.billboard.verticalOrigin = i.BOTTOM, e.length >= 50 ? r.billboard.image = c : e.length >= 40 ? r.billboard.image = d : e.length >= 30 ? r.billboard.image = l : e.length >= 20 ? r.billboard.image = v : e.length >= 10 && (r.billboard.image = u);
            });
            var e = a.clustering.pixelRange;
            a.clustering.pixelRange = 0, a.clustering.pixelRange = e;
          }();
          var g = {
            pixelRange: pixelRange,
            minimumClusterSize: minimumClusterSize
          };
          r.track(g), _h("pixelRange"), _h("minimumClusterSize");
        }

        return a.id = e.id, w.layers.set(a.id, a), a.viewer = w.viewer, a;
      }
    });
  }, L.prototype.remove = function (e) {
    if (!e || "object" != _typeof(e)) return !1;
    var i;
    e instanceof g ? i = this.viewer.entities : e instanceof n ? this.viewer.dataSources.remove(e) : e instanceof s ? this.viewer.scene.primitives.remove(e) : e instanceof o ? this.viewer.imageryLayers.remove(this.findLayerById(e.id)) : e instanceof u ? this.viewer.imageryLayers.remove(this.findLayerById(e.id)) : e instanceof f ? this.viewer.imageryLayers.remove(this.findLayerById(e.id)) : e instanceof v ? this.viewer.scene.primitives.remove(e) : e instanceof y ? this.viewer.scene.pageLODLayers.remove(e) : e instanceof u ? this.viewer.imageryLayers.remove(e) : e instanceof S ? this.viewer.imageryLayers.remove(e) : e instanceof h ? (this.viewer.dataSources.remove(e._delegate), e.destroy()) : i = this.viewer.scene.primitives, i && e.items.forEach(function (e, r, t) {
      i.remove(e);
    }), this.viewer.scene.requestRender();
    var r = this.layers.remove(e.id);
    return this.viewer.scene.requestRenderMode = !this.layers._array.length || this.layers._array.some(function (e, i, r) {
      return e instanceof y;
    }), r;
  }, L.prototype.findLayerById = function (e) {
    return this.layers.get(e);
  }, L;
});