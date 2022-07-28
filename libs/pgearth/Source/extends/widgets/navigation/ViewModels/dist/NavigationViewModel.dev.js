"use strict";

define(["../../../../Core/defined", "../../../../Core/Math", "../../../../Core/getTimestamp", "../../../../Core/EventHelper", "../../../../Core/Transforms", "../../../../Scene/SceneMode", "../../../../Core/Cartesian2", "../../../../Core/Cartesian3", "../../../../Core/Matrix4", "../../../../Core/BoundingSphere", "../../../../Core/HeadingPitchRange", "../../../../ThirdParty/knockout", "../Core/loadView", "./ResetViewNavigationControl", "./ZoomNavigationControl", "../SvgPaths/svgCompassOuterRing", "../SvgPaths/svgCompassGyro", "../SvgPaths/svgCompassRotationMarker", "../Core/Utils"], function (u, m, l, a, g, h, b, v, p, d, C, i, e, s, r, n, c, k, f) {
  "use strict";

  function x(t) {
    this.terria = t.terria, this.eventHelper = new a(), this.enableZoomControls = !u(t.enableZoomControls) || t.enableZoomControls, this.enableCompass = !u(t.enableCompass) || t.enableCompass, this.controls = t.controls, u(this.controls) || (this.controls = [new r(this.terria, !0), new s(this.terria), new r(this.terria, !1)]), this.svgCompassOuterRing = n, this.svgCompassGyro = c, this.svgCompassRotationMarker = k, this.showCompass = u(this.terria) && this.enableCompass, this.heading = this.showCompass ? this.terria.scene.camera.heading : 0, this.isOrbiting = !1, this.orbitCursorAngle = 0, this.orbitCursorOpacity = 0, this.orbitLastTimestamp = 0, this.orbitFrame = void 0, this.orbitIsLook = !1, this.orbitMouseMoveFunction = void 0, this.orbitMouseUpFunction = void 0, this.isRotating = !1, this.rotateInitialCursorAngle = void 0, this.rotateFrame = void 0, this.rotateIsLook = !1, this.rotateMouseMoveFunction = void 0, this.rotateMouseUpFunction = void 0, this._unsubcribeFromPostRender = void 0, i.track(this, ["controls", "showCompass", "heading", "isOrbiting", "orbitCursorAngle", "isRotating"]);
    var o = this;

    function e() {
      u(o.terria) ? (o._unsubcribeFromPostRender && (o._unsubcribeFromPostRender(), o._unsubcribeFromPostRender = void 0), o.showCompass = o.enableCompass, o._unsubcribeFromPostRender = o.terria.scene.postRender.addEventListener(function () {
        o.heading = o.terria.scene.camera.heading;
      })) : (o._unsubcribeFromPostRender && (o._unsubcribeFromPostRender(), o._unsubcribeFromPostRender = void 0), o.showCompass = !1);
    }

    this.eventHelper.add(this.terria.afterWidgetChanged, e, this), e();
  }

  x.prototype.destroy = function () {
    this.eventHelper.removeAll();
  }, x.prototype.show = function (t) {
    var o;
    this.enableZoomControls && this.enableCompass ? o = '<div class="compass" title="拖动外圈：旋转视图；拖动陀螺仪：自由轨道；双击：重置视图；" data-bind="visible: showCompass, event: { mousedown: handleMouseDown, click: handleDoubleClick }"> <div class="compass-outer-ring" title="通过拖拽旋转视图" data-bind="style: { transform: \'rotate(-\' + heading + \'rad)\', \'-webkit-transform\': \'rotate(-\' + heading + \'rad)\' }"><span class=\'powergis-icon-compass\'></span></div> <div class="compass-gyro-background"></div> <div class="compass-gyro" data-bind="css: { \'compass-gyro-active\': isOrbiting }"></div></div><div class="navigation-controls">\x3c!-- ko foreach: controls --\x3e<div data-bind="click: activate, attr: { title: $data.name }, css: $root.isLastControl($data) ? \'navigation-control-last\' : \'navigation-control\' ">   \x3c!-- ko if: $data.hasText --\x3e   <div data-bind="text: $data.text, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>   \x3c!-- /ko --\x3e  \x3c!-- ko ifnot: $data.hasText --\x3e  <div data-bind="css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"><span class=\'powergis-icon-home\'></span></div>  \x3c!-- /ko --\x3e </div> \x3c!-- /ko --\x3e</div>' : !this.enableZoomControls && this.enableCompass ? o = '<div class="compass" title="拖动外圈：旋转视图；拖动陀螺仪：自由轨道；双击：重置视图" data-bind="visible: showCompass, event: { mousedown: handleMouseDown, dblclick: handleDoubleClick }"><div class="compass-outer-ring-background"></div>' + " <div class=\"compass-rotation-marker\" data-bind=\"visible: isOrbiting, style: { transform: 'rotate(-' + orbitCursorAngle + 'rad)', '-webkit-transform': 'rotate(-' + orbitCursorAngle + 'rad)', opacity: orbitCursorOpacity }, pgEarthSvgPath: { path: svgCompassRotationMarker, width: 145, height: 145 }\"></div> <div class=\"compass-outer-ring\" title=\"通过拖拽旋转视图\" data-bind=\"style: { transform: 'rotate(-' + heading + 'rad)', '-webkit-transform': 'rotate(-' + heading + 'rad)' }, pgEarthSvgPath: { path: svgCompassOuterRing, width: 145, height: 145 }\"></div> <div class=\"compass-gyro-background\"></div></div><div class=\"navigation-controls\">\x3c!-- ko foreach: controls --\x3e<div data-bind=\"click: activate, attr: { title: $data.name }, css: $root.isLastControl($data) ? 'navigation-control-last' : 'navigation-control' \">   \x3c!-- ko if: $data.hasText --\x3e   <div data-bind=\"text: $data.text, css: $data.isActive ?  'navigation-control-icon-active ' + $data.cssClass : $data.cssClass\"></div>   \x3c!-- /ko --\x3e  \x3c!-- ko ifnot: $data.hasText --\x3e  <div data-bind=\"css: $data.isActive ?  'navigation-control-icon-active ' + $data.cssClass : $data.cssClass\">&#8634</div>  \x3c!-- /ko --\x3e </div> \x3c!-- /ko --\x3e</div>" : this.enableZoomControls && !this.enableCompass ? o = '<div class="compass"  style="display: none;" title="Drag outer ring: rotate view. Drag inner gyroscope: free orbit.Double-click: reset view.TIP: You can also free orbit by holding the CTRL key and dragging the map." data-bind="visible: showCompass, event: { mousedown: handleMouseDown, dblclick: handleDoubleClick }"><div class="compass-outer-ring-background"></div>' + " <div class=\"compass-rotation-marker\" data-bind=\"visible: isOrbiting, style: { transform: 'rotate(-' + orbitCursorAngle + 'rad)', '-webkit-transform': 'rotate(-' + orbitCursorAngle + 'rad)', opacity: orbitCursorOpacity }, pgEarthSvgPath: { path: svgCompassRotationMarker, width: 145, height: 145 }\"></div> <div class=\"compass-outer-ring\" title=\"Click and drag to rotate the camera\" data-bind=\"style: { transform: 'rotate(-' + heading + 'rad)', '-webkit-transform': 'rotate(-' + heading + 'rad)' }, pgEarthSvgPath: { path: svgCompassOuterRing, width: 145, height: 145 }\"></div> <div class=\"compass-gyro-background\"></div> <div class=\"compass-gyro\" data-bind=\"pgEarthSvgPath: { path: svgCompassGyro, width: 145, height: 145 }, css: { 'compass-gyro-active': isOrbiting }\"></div></div><div class=\"navigation-controls\"    >\x3c!-- ko foreach: controls --\x3e<div data-bind=\"click: activate, attr: { title: $data.name }, css: $root.isLastControl($data) ? 'navigation-control-last' : 'navigation-control' \">   \x3c!-- ko if: $data.hasText --\x3e   <div data-bind=\"text: $data.text, css: $data.isActive ?  'navigation-control-icon-active ' + $data.cssClass : $data.cssClass\"></div>   \x3c!-- /ko --\x3e  \x3c!-- ko ifnot: $data.hasText --\x3e  <div data-bind=\"css: $data.isActive ?  'navigation-control-icon-active ' + $data.cssClass : $data.cssClass\">&#8634</div>  \x3c!-- /ko --\x3e </div> \x3c!-- /ko --\x3e</div>" : this.enableZoomControls || this.enableCompass || (o = '<div class="compass"  style="display: none;" title="Drag outer ring: rotate view. Drag inner gyroscope: free orbit.Double-click: reset view.TIP: You can also free orbit by holding the CTRL key and dragging the map." data-bind="visible: showCompass, event: { mousedown: handleMouseDown, dblclick: handleDoubleClick }"><div class="compass-outer-ring-background"></div> <div class="compass-rotation-marker" data-bind="visible: isOrbiting, style: { transform: \'rotate(-\' + orbitCursorAngle + \'rad)\', \'-webkit-transform\': \'rotate(-\' + orbitCursorAngle + \'rad)\', opacity: orbitCursorOpacity }, pgEarthSvgPath: { path: svgCompassRotationMarker, width: 145, height: 145 }"></div> <div class="compass-outer-ring" title="Click and drag to rotate the camera" data-bind="style: { transform: \'rotate(-\' + heading + \'rad)\', \'-webkit-transform\': \'rotate(-\' + heading + \'rad)\' }, pgEarthSvgPath: { path: svgCompassOuterRing, width: 145, height: 145 }"></div> <div class="compass-gyro-background"></div> <div class="compass-gyro" data-bind="pgEarthSvgPath: { path: svgCompassGyro, width: 145, height: 145 }, css: { \'compass-gyro-active\': isOrbiting }"></div></div><div class="navigation-controls"   style="display: none;" >\x3c!-- ko foreach: controls --\x3e<div data-bind="click: activate, attr: { title: $data.name }, css: $root.isLastControl($data) ? \'navigation-control-last\' : \'navigation-control\' ">   \x3c!-- ko if: $data.hasText --\x3e   <div data-bind="text: $data.text, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>   \x3c!-- /ko --\x3e  \x3c!-- ko ifnot: $data.hasText --\x3e  <div data-bind="css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass">&#8634</div>  \x3c!-- /ko --\x3e </div> \x3c!-- /ko --\x3e</div>'), e(o, t, this);
  }, x.prototype.add = function (t) {
    this.controls.push(t);
  }, x.prototype.remove = function (t) {
    this.controls.remove(t);
  }, x.prototype.isLastControl = function (t) {
    return t === this.controls[this.controls.length - 1];
  };
  var F = new b();

  x.prototype.handleMouseDown = function (t, o) {
    if (this.terria.scene.mode === h.MORPHING) return !0;
    var e = o.currentTarget,
        a = o.currentTarget.getBoundingClientRect(),
        i = a.width / 2,
        s = new b((a.right - a.left) / 2, (a.bottom - a.top) / 2),
        r = new b(o.clientX - a.left, o.clientY - a.top),
        n = b.subtract(r, s, F),
        c = b.magnitude(n) / i;
    if (c < 50 / 145) !function (n, i, t) {
      var c = n.terria.scene,
          o = c.screenSpaceCameraController;
      if (c.mode == h.MORPHING || !o.enableInputs) return;

      switch (c.mode) {
        case h.COLUMBUS_VIEW:
          if (o.enableLook) break;
          if (!o.enableTranslate || !o.enableTilt) return;
          break;

        case h.SCENE3D:
          if (o.enableLook) break;
          if (!o.enableTilt || !o.enableRotate) return;
          break;

        case h.SCENE2D:
          if (!o.enableTranslate) return;
      }

      document.removeEventListener("mousemove", n.orbitMouseMoveFunction, !1), document.removeEventListener("mouseup", n.orbitMouseUpFunction, !1), u(n.orbitTickFunction) && n.terria.clock.onTick.removeEventListener(n.orbitTickFunction);
      n.orbitMouseMoveFunction = void 0, n.orbitMouseUpFunction = void 0, n.orbitTickFunction = void 0, n.isOrbiting = !0, n.orbitLastTimestamp = l();
      var d = c.camera;
      {
        var e;
        u(n.terria.trackedEntity) ? (n.orbitFrame = void 0, n.orbitIsLook = !1) : (e = f.getCameraFocus(n.terria, !0, T), u(e) ? (n.orbitFrame = g.eastNorthUpToFixedFrame(e, c.globe.ellipsoid, w), n.orbitIsLook = !1) : (n.orbitFrame = g.eastNorthUpToFixedFrame(d.positionWC, c.globe.ellipsoid, w), n.orbitIsLook = !0));
      }

      function s(t, o) {
        var e = Math.atan2(-t.y, t.x);
        n.orbitCursorAngle = m.zeroToTwoPi(e - m.PI_OVER_TWO);
        var a = b.magnitude(t),
            i = o / 2,
            s = Math.min(a / i, 1),
            r = .5 * s * s + .5;
        n.orbitCursorOpacity = r;
      }

      n.orbitTickFunction = function (t) {
        var o,
            e = l(),
            a = (e - n.orbitLastTimestamp) * (2.5 * (n.orbitCursorOpacity - .5) / 1e3),
            i = n.orbitCursorAngle + m.PI_OVER_TWO,
            s = Math.cos(i) * a,
            r = Math.sin(i) * a;
        u(n.orbitFrame) && (o = p.clone(d.transform, M), d.lookAtTransform(n.orbitFrame)), c.mode == h.SCENE2D ? d.move(new v(s, r, 0), Math.max(c.canvas.clientWidth, c.canvas.clientHeight) / 100 * d.positionCartographic.height * a) : n.orbitIsLook ? (d.look(v.UNIT_Z, -s), d.look(d.right, -r)) : (d.rotateLeft(s), d.rotateUp(r)), u(n.orbitFrame) && d.lookAtTransform(o), n.orbitLastTimestamp = e;
      }, n.orbitMouseMoveFunction = function (t) {
        var o = i.getBoundingClientRect(),
            e = new b((o.right - o.left) / 2, (o.bottom - o.top) / 2),
            a = new b(t.clientX - o.left, t.clientY - o.top);
        s(b.subtract(a, e, F), o.width);
      }, n.orbitMouseUpFunction = function (t) {
        n.isOrbiting = !1, document.removeEventListener("mousemove", n.orbitMouseMoveFunction, !1), document.removeEventListener("mouseup", n.orbitMouseUpFunction, !1), u(n.orbitTickFunction) && n.terria.clock.onTick.removeEventListener(n.orbitTickFunction), n.orbitMouseMoveFunction = void 0, n.orbitMouseUpFunction = void 0, n.orbitTickFunction = void 0;
      }, document.addEventListener("mousemove", n.orbitMouseMoveFunction, !1), document.addEventListener("mouseup", n.orbitMouseUpFunction, !1), n.terria.clock.onTick.addEventListener(n.orbitTickFunction), s(t, i.getBoundingClientRect().width);
    }(this, e, n);else {
      if (!(c < 1)) return !0;
      !function (l, v, t) {
        if (l.terria.options.enableCompassOuterRing = !u(l.terria.options.enableCompassOuterRing) || l.terria.options.enableCompassOuterRing, l.terria.options.enableCompassOuterRing) {
          var o,
              e,
              a = l.terria.scene,
              i = a.camera,
              s = a.screenSpaceCameraController;
          if (a.mode == h.MORPHING || a.mode == h.SCENE2D || !s.enableInputs) return;
          if (!s.enableLook && (a.mode == h.COLUMBUS_VIEW || a.mode == h.SCENE3D && !s.enableRotate)) return;
          document.removeEventListener("mousemove", l.rotateMouseMoveFunction, !1), document.removeEventListener("mouseup", l.rotateMouseUpFunction, !1), l.rotateMouseMoveFunction = void 0, l.rotateMouseUpFunction = void 0, l.isRotating = !0, l.rotateInitialCursorAngle = Math.atan2(-t.y, t.x), u(l.terria.trackedEntity) ? (l.rotateFrame = void 0, l.rotateIsLook = !1) : (o = f.getCameraFocus(l.terria, !0, T), u(o) && (a.mode != h.COLUMBUS_VIEW || s.enableLook || s.enableTranslate) ? (l.rotateFrame = g.eastNorthUpToFixedFrame(o, a.globe.ellipsoid, w), l.rotateIsLook = !1) : (l.rotateFrame = g.eastNorthUpToFixedFrame(i.positionWC, a.globe.ellipsoid, w), l.rotateIsLook = !0)), u(l.rotateFrame) && (e = p.clone(i.transform, M), i.lookAtTransform(l.rotateFrame)), l.rotateInitialCameraAngle = -i.heading, u(l.rotateFrame) && i.lookAtTransform(e), l.rotateMouseMoveFunction = function (t) {
            var o,
                e = v.getBoundingClientRect(),
                a = new b((e.right - e.left) / 2, (e.bottom - e.top) / 2),
                i = new b(t.clientX - e.left, t.clientY - e.top),
                s = b.subtract(i, a, F),
                r = Math.atan2(-s.y, s.x) - l.rotateInitialCursorAngle,
                n = m.zeroToTwoPi(l.rotateInitialCameraAngle - r),
                c = l.terria.scene.camera;
            u(l.rotateFrame) && (o = p.clone(c.transform, M), c.lookAtTransform(l.rotateFrame));
            var d = -c.heading;
            c.rotateRight(n - d), u(l.rotateFrame) && c.lookAtTransform(o);
          }, l.rotateMouseUpFunction = function (t) {
            l.isRotating = !1, document.removeEventListener("mousemove", l.rotateMouseMoveFunction, !1), document.removeEventListener("mouseup", l.rotateMouseUpFunction, !1), l.rotateMouseMoveFunction = void 0, l.rotateMouseUpFunction = void 0;
          }, document.addEventListener("mousemove", l.rotateMouseMoveFunction, !1), document.addEventListener("mouseup", l.rotateMouseUpFunction, !1);
        }
      }(this, e, n);
    }
  };

  var M = new p(),
      w = new p(),
      T = new v();
  return x.prototype.handleDoubleClick = function (t, o) {
    var e = t.terria.scene,
        a = e.camera,
        i = e.screenSpaceCameraController;
    if (e.mode == h.MORPHING || !i.enableInputs) return !0;

    if (e.mode != h.COLUMBUS_VIEW || i.enableTranslate) {
      if (e.mode == h.SCENE3D || e.mode == h.COLUMBUS_VIEW) {
        if (!i.enableLook) return;
        if (e.mode == h.SCENE3D && !i.enableRotate) return;
      }

      var s,
          r,
          n,
          c = f.getCameraFocus(t.terria, !0, T);
      u(c) ? (s = e.globe.ellipsoid.cartographicToCartesian(a.positionCartographic, new v()), r = e.globe.ellipsoid.geodeticSurfaceNormal(c), n = new d(c, 0), a.flyToBoundingSphere(n, {
        offset: new C(0, m.PI_OVER_TWO - v.angleBetween(r, a.directionWC), v.distance(s, c)),
        duration: 1.5
      })) : this.controls[1].resetView();
    }
  }, x.create = function (t) {
    var o = new x(t);
    return o.show(t.container), o;
  }, x;
});