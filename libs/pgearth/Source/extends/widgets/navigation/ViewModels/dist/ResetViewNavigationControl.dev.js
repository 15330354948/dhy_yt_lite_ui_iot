"use strict";

define(["../../../../Core/defined", "../../../../Scene/Camera", "../../../../Core/Rectangle", "../../../../Core/Cartographic", "./NavigationControl", "../SvgPaths/svgReset"], function (s, a, o, r, e, i) {
  "use strict";

  function t(t) {
    e.apply(this, arguments), this.name = "视野重置", this.svgIcon = i, this.svgHeight = 15, this.svgWidth = 15, this.cssClass = "navigation-control-icon-reset";
  }

  return (t.prototype = Object.create(e.prototype)).resetView = function () {
    var t = this.terria.scene;

    if (t.screenSpaceCameraController.enableInputs) {
      this.isActive = !0;
      var e = t.camera;

      if (s(this.terria.trackedEntity)) {
        var i = this.terria.trackedEntity;
        this.terria.trackedEntity = void 0, this.terria.trackedEntity = i;
      } else if (this.terria.options.defaultResetView) {
        if (this.terria.options.defaultResetView && this.terria.options.defaultResetView instanceof r) e.flyTo({
          destination: t.globe.ellipsoid.cartographicToCartesian(this.terria.options.defaultResetView)
        });else if (this.terria.options.defaultResetView && this.terria.options.defaultResetView instanceof o) try {
          o.validate(this.terria.options.defaultResetView), e.flyTo({
            destination: this.terria.options.defaultResetView
          });
        } catch (t) {
          console.log("PGEarth-navigation/ResetViewNavigationControl:   options.defaultResetView PGEarth rectangle is  invalid!");
        }
      } else "function" == typeof e.flyHome ? e.flyHome(1) : e.flyTo({
        destination: a.DEFAULT_VIEW_RECTANGLE,
        duration: 1
      });

      this.isActive = !1;
    }
  }, t.prototype.activate = function () {
    this.resetView();
  }, t;
});