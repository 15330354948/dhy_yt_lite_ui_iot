"use strict";

define(["../../../../Core/defined", "../../../../Core/DeveloperError", "../../../../Core/EllipsoidGeodesic", "../../../../Core/Cartesian2", "../../../../Core/getTimestamp", "../../../../Core/EventHelper", "../../../../ThirdParty/knockout", "../Core/loadView"], function (g, t, e, u, L, n, r, a) {
  "use strict";

  function d(e) {
    if (!g(e) || !g(e.terria)) throw new t("options.terria is required.");
    this.terria = e.terria, this._removeSubscription = void 0, this._lastLegendUpdate = void 0, this.eventHelper = new n(), this.distanceLabel = void 0, this.barWidth = void 0, this.enableDistanceLegend = !g(e.enableDistanceLegend) || e.enableDistanceLegend, r.track(this, ["distanceLabel", "barWidth"]), this.eventHelper.add(this.terria.afterWidgetChanged, function () {
      g(this._removeSubscription) && (this._removeSubscription(), this._removeSubscription = void 0);
    }, this);
    var a = this;

    function i() {
      var e, i, t;
      g(a.terria) ? (e = a.terria.scene, a._removeSubscription = e.postRender.addEventListener(function () {
        !function (e, i) {
          if (!e.enableDistanceLegend) return e.barWidth = void 0, e.distanceLabel = void 0;
          var t = L();
          if (t < e._lastLegendUpdate + 250) return;
          e._lastLegendUpdate = t;
          var a = i.canvas.clientWidth,
              n = i.canvas.clientHeight,
              r = i.camera.getPickRay(new u(a / 2 | 0, n - 1)),
              d = i.camera.getPickRay(new u(1 + a / 2 | 0, n - 1)),
              s = i.globe,
              o = s.pick(r, i),
              c = s.pick(d, i);
          if (!g(o) || !g(c)) return e.barWidth = void 0, e.distanceLabel = void 0;
          var l = s.ellipsoid.cartesianToCartographic(o),
              v = s.ellipsoid.cartesianToCartographic(c);
          m.setEndPoints(l, v);

          for (var b, h, p = m.surfaceDistance, f = W.length - 1; !g(b) && 0 <= f; --f) {
            W[f] / p < 100 && (b = W[f]);
          }

          g(b) ? (h = 1e3 <= b ? (b / 1e3).toString() + " km" : b.toString() + " m", e.barWidth = b / p | 0, e.distanceLabel = h) : (e.barWidth = void 0, e.distanceLabel = void 0);
        }(this, e);
      }, a)) : g(a.terria.leaflet) && (i = a.terria.leaflet.map, t = function t() {
        s(a, i);
      }, a._removeSubscription = function () {
        i.off("zoomend", t), i.off("moveend", t);
      }, i.on("zoomend", t), i.on("moveend", t), s(a, i));
    }

    i(), this.eventHelper.add(this.terria.afterWidgetChanged, function () {
      i();
    }, this);
  }

  d.prototype.destroy = function () {
    this.eventHelper.removeAll();
  }, d.prototype.show = function (e) {
    var i = this.enableDistanceLegend ? '<div class="distance-legend" data-bind="visible: distanceLabel && barWidth"><div class="distance-legend-label" data-bind="text: distanceLabel"></div><div class="distance-legend-scale-bar" data-bind="style: { width: barWidth + \'px\', left: (5 + (125 - barWidth) / 2) + \'px\' }"></div></div>' : '<div class="distance-legend"  style="display: none;" data-bind="visible: distanceLabel && barWidth"><div class="distance-legend-label"  data-bind="text: distanceLabel"></div><div class="distance-legend-scale-bar"  data-bind="style: { width: barWidth + \'px\', left: (5 + (125 - barWidth) / 2) + \'px\' }"></div></div>';
    a(i, e, this);
  }, d.create = function (e) {
    var i = new d(e);
    return i.show(e.container), i;
  };
  var m = new e(),
      W = [1, 2, 3, 5, 10, 20, 30, 50, 100, 200, 300, 500, 1e3, 2e3, 3e3, 5e3, 1e4, 2e4, 3e4, 5e4, 1e5, 2e5, 3e5, 5e5, 1e6, 2e6, 3e6, 5e6, 1e7, 2e7, 3e7, 5e7];

  function s(e, i) {
    var t = i.getSize().y / 2;
    i.containerPointToLatLng([0, t]).distanceTo(i.containerPointToLatLng([100, t]));
    e.distanceLabel = label;
  }

  return d;
});