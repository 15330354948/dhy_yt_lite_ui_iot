"use strict";

define(["../../../Core/defined", "../../../Core/defineProperties", "../../../Core/DeveloperError", "../../../Core/Event", "../../../ThirdParty/knockout", "./Core/registerKnockoutBindings", "./ViewModels/DistanceLegendViewModel", "./ViewModels/NavigationViewModel"], function (o, e, a, s, i, r, d, h) {
  "use strict";

  function t(e) {
    (function (e, i) {
      if (!o(e)) throw new a("PGEarthWidget or Viewer is required.");
      var t = o(e.pgEarthWidget) ? e.pgEarthWidget : e,
          n = document.createElement("div");
      n.className = "pgEarth-widget-pgEarthNavigationContainer", t.container.appendChild(n), this.terria = e, this.terria.options = o(i) ? i : {}, this.terria.afterWidgetChanged = new s(), this.terria.beforeWidgetChanged = new s(), this.container = n, r(), o(this.terria.options.enableDistanceLegend) && !this.terria.options.enableDistanceLegend || (this.distanceLegendDiv = document.createElement("div"), n.appendChild(this.distanceLegendDiv), this.distanceLegendDiv.setAttribute("id", "distanceLegendDiv"), this.distanceLegendViewModel = d.create({
        container: this.distanceLegendDiv,
        terria: this.terria,
        mapElement: n,
        enableDistanceLegend: !0
      }));
      o(this.terria.options.enableZoomControls) && !this.terria.options.enableZoomControls || o(this.terria.options.enableCompass) && !this.terria.options.enableCompass ? !o(this.terria.options.enableZoomControls) || this.terria.options.enableZoomControls || o(this.terria.options.enableCompass) && !this.terria.options.enableCompass ? o(this.terria.options.enableZoomControls) && !this.terria.options.enableZoomControls || !o(this.terria.options.enableCompass) || this.terria.options.enableCompass ? o(this.terria.options.enableZoomControls) && !this.terria.options.enableZoomControls && o(this.terria.options.enableCompass) && this.terria.options.enableCompass : (this.navigationDiv = document.createElement("div"), this.navigationDiv.setAttribute("id", "navigationDiv"), n.appendChild(this.navigationDiv), this.navigationViewModel = h.create({
        container: this.navigationDiv,
        terria: this.terria,
        enableZoomControls: !0,
        enableCompass: !1
      })) : (this.navigationDiv = document.createElement("div"), this.navigationDiv.setAttribute("id", "navigationDiv"), n.appendChild(this.navigationDiv), this.navigationViewModel = h.create({
        container: this.navigationDiv,
        terria: this.terria,
        enableZoomControls: !1,
        enableCompass: !0
      })) : (this.navigationDiv = document.createElement("div"), this.navigationDiv.setAttribute("id", "navigationDiv"), n.appendChild(this.navigationDiv), this.navigationViewModel = h.create({
        container: this.navigationDiv,
        terria: this.terria,
        enableZoomControls: !0,
        enableCompass: !0
      }));
    }).apply(this, arguments), this._onDestroyListeners = [];
  }

  return t.prototype.distanceLegendViewModel = void 0, t.prototype.navigationViewModel = void 0, t.prototype.navigationDiv = void 0, t.prototype.distanceLegendDiv = void 0, t.prototype.terria = void 0, t.prototype.container = void 0, t.prototype._onDestroyListeners = void 0, t.prototype.destroy = function () {
    o(this.navigationViewModel) && this.navigationViewModel.destroy(), o(this.distanceLegendViewModel) && this.distanceLegendViewModel.destroy(), o(this.navigationDiv) && this.navigationDiv.parentNode.removeChild(this.navigationDiv), delete this.navigationDiv, o(this.distanceLegendDiv) && this.distanceLegendDiv.parentNode.removeChild(this.distanceLegendDiv), delete this.distanceLegendDiv, o(this.container) && this.container.parentNode.removeChild(this.container), delete this.container;

    for (var e = 0; e < this._onDestroyListeners.length; e++) {
      this._onDestroyListeners[e]();
    }
  }, t.prototype.addOnDestroyListener = function (e) {
    "function" == typeof e && this._onDestroyListeners.push(e);
  }, t;
});