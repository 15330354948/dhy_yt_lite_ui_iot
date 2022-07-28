"use strict";

define(["../../Source/Core/defined", "../../Source/Core/defaultValue", "../../Source/Scene/GridImageryProvider", "../../Source/Core/Color", "../../Source/Widgets/Viewer/Viewer", "../../Source/Core/EventHelper", "../../Source/Scene/UrlTemplateImageryProvider", "../../Source/Scene/CameraEventType", "../../Source/Core/ScreenSpaceEventType", "../../Source/Core/Cartesian3", "../../Source/Core/Rectangle", "../../Source/Core/Math", "../others/Graphics", "../widgets/PopupTemplate/PopupTemplate", "../_Map", "../widgets/Geocoder/Geocoder", "../layers/WMTSLayer"], function (c, n, e, r, a, i, m, q, g, k, b, o, p, j, f, l, d) {
  function h(u) {
    if (!c(u.container)) {
      new Error("container is required");
    }

    u.animation = n(u.animation, false);
    u.baseLayerPicker = n(u.baseLayerPicker, false);
    u.fullscreenButton = n(u.fullscreenButton, false);
    u.geocoder = n(false);
    u.homeButton = n(u.homeButton, false);
    u.infoBox = n(u.infoBox, false);
    u.sceneModePicker = n(u.sceneModePicker, false);
    u.selectionIndicator = n(u.selectionIndicator, false);
    u.timeline = n(u.timeline, false);
    u.navigationHelpButton = n(u.navigationHelpButton, false);
    u.navigationInstructionsInitiallyVisible = n(u.navigationInstructionsInitiallyVisible, false);
    u.showRenderLoopErrors = n(u.showRenderLoopErrors, true);
    u.scene3DOnly = n(u.scene3DOnly, true);
    u.requestRenderMode = n(u.requestRenderMode, true);
    u.fullscreenElement = n(u.fullscreenElement, document.body);
    u.imageryProvider = new e({
      cells: 14,
      glowColor: r.WHITE,
      glowWidth: 0.5,
      color: r.fromCssColorString("#fffbf4"),
      backgroundColor: r.fromCssColorString("#e5dfd3")
    });
    var t = this;
    this.__proto__ = a.prototype;
    a.call(t, u.container, u);

    this._bottomContainer.remove();

    t.scene.screenSpaceCameraController.minimumZoomDistance = 1;
    t.scene.screenSpaceCameraController.maximumZoomDistance = 22000000;
    u.geocoder = u.search;
    var y;

    if (c(u.geocoder) && u.geocoder.enabled !== false && c(u.geocoder.params) && u.geocoder.params.length > 0) {
      var w = new i();
      var x = document.createElement("div");
      x.className = "pgEarth-viewer-toolbar";

      t._element.appendChild(x);

      var s = document.createElement("div");
      s.className = "pgEarth-viewer-geocoderContainer";
      x.appendChild(s);
      y = new l({
        container: s,
        geocoderServices: u.geocoder.params,
        scene: t.scene
      });
      w.add(y.viewModel.search.beforeExecute, a.prototype._clearObjects, this);
      this._geocoder = y;
    }

    if (c(u.baseMap)) {
      this.imageryLayers.addImageryProvider(u.baseMap);
    } else {
      this.imageryLayers.addImageryProvider(new d({
        url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=1d109683f4d84198e37a38c442d68311",
        title: "tdt",
        tileMatrixSet: "tdt1",
        maximumLevel: 18
      }));
    }

    this.scene.screenSpaceCameraController.zoomEventTypes = [q.WHEEL, q.MIDDLE_DRAG, q.PINCH];
    this.scene.screenSpaceCameraController.tiltEventTypes = [q.RIGHT_DRAG];
    this.pgEarthWidget.screenSpaceEventHandler.removeInputAction(g.LEFT_DOUBLE_CLICK);
    this.graphics = new p();
    this.map = new f(t);
    this.popupTemplate = new j({
      viewer: t
    });
    this.camera.setView({
      destination: k.fromDegrees(u.center && u.center[0] || 110, u.center && u.center[1] || 33, u.center && u.center[2] || 10000000)
    });
    this.goTo = v;

    function v(z) {
      t.camera.flyTo({
        destination: k.fromDegrees(z.center[0], z.center[1], z.center[2]),
        orientation: {
          heading: o.toRadians(n(z.heading, 0)),
          pitch: o.toRadians(n(z.pitch, -90)),
          roll: o.toRadians(n(z.roll, 0))
        },
        duration: z.duration || 3
      });
    }
  }

  return h;
});