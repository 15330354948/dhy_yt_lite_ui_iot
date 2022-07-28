"use strict";

define(["./Viewshed3D", "../../../Core/ScreenSpaceEventHandler", "../../../Core/ScreenSpaceEventType", "../../../Core/Color", "../../../Core/Cartographic", "../../../Core/Math", "../../../Core/Cartesian3", "../../../Core/defineProperties", "../../../Core/HeadingPitchRoll", "../../../Core/destroyObject", "../../../ThirdParty/knockout", "../../../Widgets/createCommand"], function (c, i, p, b, a, h, f, k, e, n, g, d) {
  var j = [];

  function m(u) {
    var s = u.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(","),
        t = "#";

    for (var q = 0; q < s.length; q++) {
      var r = Number(s[q]).toString(16);
      r.length < 2 && (r = "0" + r), t += r;
    }

    return t;
  }

  function o(u) {
    var s = u.toLowerCase();

    if (s && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(s)) {
      if (4 === s.length) {
        for (var t = "#", q = 1; q < 4; q++) {
          t += s.slice(q, q + 1).concat(s.slice(q, q + 1));
        }

        s = t;
      }

      var r = [];

      for (q = 1; q < 7; q += 2) {
        r.push(parseInt("0x" + s.slice(q, q + 2)));
      }

      return r;
    }

    return s;
  }

  function l(y) {
    this._viewer = y;
    var v = this,
        t = y.scene.canvas;
    this._eventHandler = new i(t);
    this._scene = y.scene;
    this._canvas = t;
    this.viewshed3daction = false;
    this._viewshed3ding = false;
    this._viewshed3d = null;
    this.editerVisible = true;
    this.analysisTree = true;
    this.editAnalysisVisible = true;
    this.generalVisible = true;
    this.positionVisible = true;
    this.treeEntity = [];
    this.srcElementStyle = null;
    this.editInput = false;
    this.hasInput = null;
    this.count = 1;
    this.selectedName = 0;
    this.selectedDirection = 0;
    this.selectedPitch = 0;
    this.selectedDistance = 0;
    this.selectedHorizontalFov = 0;
    this.selectedVerticalFov = 0;
    this.selectedLongtitude = 0;
    this.selectedLatitude = 0;
    this.selectedHeight = 0;
    this.selectedVisibleAreaColor = null;
    this.selectedHiddenAreaColor = null;
    this.selectedIndex = null;
    this.isSelected = false;
    this._startAgain = false;
    this._drawAgain = false;
    this.initialiseHandlers();
    this._scene.globe.depthTestAgainstTerrain = true;
    this.dropDownVisible = true;
    this._toggleDropDown = d(function () {
      v["dropDownVisible"] = !v["dropDownVisible"];
    });
    var D = g.observable();
    g.defineProperty(this, "directionScreenDisplay", {
      get: function get() {
        var F = D();
        return F < 0 ? F += 360 : 360 < F && (F -= 360), parseInt(F);
      },
      set: function set(F) {
        if (F = Number(F), !isNaN(F) && (D(F), 0 < j["length"] && (F < 0 ? F += 360 : 360 < F && (F -= 360), null != v["selectedIndex"] && 0 < v["treeEntity"]["length"]))) {
          for (var G = 0; G < v["treeEntity"]["length"]; G++) {
            j[G]["Id"] === v["selectedIndex"] && (j[G]["direction"] = parseInt(F));
          }
        }
      }
    });
    this["directionScreenDisplay"] = 180;
    var r = g.observable();
    g.defineProperty(this, "pitchScreenDisplay", {
      get: function get() {
        var F = r();
        return parseInt(F);
      },
      set: function set(F) {
        if (F = Number(F), !isNaN(F) && (r(F), 0 < j["length"] && null != v["selectedIndex"] && 0 < v["treeEntity"]["length"])) {
          for (var G = 0; G < v["treeEntity"]["length"]; G++) {
            j[G]["Id"] === v["selectedIndex"] && (j[G]["pitch"] = parseInt(F));
          }
        }
      }
    });
    this["pitchScreenDisplay"] = 0;
    var u = g.observable();
    g.defineProperty(this, "distanceScreenDisplay", {
      get: function get() {
        var F = u();
        return parseInt(F);
      },
      set: function set(F) {
        if (F = Number(F), !isNaN(F) && (u(F), 0 < j["length"] && null != v["selectedIndex"] && 0 < v["treeEntity"]["length"])) {
          for (var G = 0; G < v["treeEntity"]["length"]; G++) {
            j[G]["Id"] === v["selectedIndex"] && (j[G]["distance"] = parseInt(F));
          }
        }
      }
    });
    this["distanceScreenDisplay"] = 0;
    var B = g.observable();
    g.defineProperty(this, "horizontalFovScreenDisplay", {
      get: function get() {
        var F = B();
        return parseInt(F);
      },
      set: function set(F) {
        if (F = Number(F), !isNaN(F) && (B(F), 0 < j["length"] && null != v["selectedIndex"] && 0 < v["treeEntity"]["length"])) {
          for (var G = 0; G < v["treeEntity"]["length"]; G++) {
            j[G]["Id"] === v["selectedIndex"] && (j[G]["horizontalFov"] = parseInt(F));
          }
        }
      }
    });
    this["horizontalFovScreenDisplay"] = 60;
    var z = g.observable();
    g.defineProperty(this, "verticalFovScreenDisplay", {
      get: function get() {
        var F = z();
        return parseInt(F);
      },
      set: function set(F) {
        if (F = Number(F), !isNaN(F) && (z(F), 0 < j["length"] && null != v["selectedIndex"] && 0 < v["treeEntity"]["length"])) {
          for (var G = 0; G < v["treeEntity"]["length"]; G++) {
            j[G]["Id"] === v["selectedIndex"] && (j[G]["verticalFov"] = parseInt(F));
          }
        }
      }
    });
    this["verticalFovScreenDisplay"] = 60;
    var E = g.observable();
    g.defineProperty(this, "visibleAreaColorScreenDisplay", {
      get: function get() {
        var F = E();
        void 0 !== F.alpha && void 0 !== F.blue && void 0 !== F.green && void 0 !== F.red && (F = m("(" + F.red + "," + F.green + "," + F.blue + ")"));
        return F;
      },
      set: function set(I) {
        var K = I;

        if (void 0 !== I) {
          if (void 0 !== I.alpha && void 0 !== I.blue && void 0 !== I.green && void 0 !== I.red) {
            var H = new b(I.red, I.green, I.blue);
            K = m(H.toCssColorString());

            if (0 < j.length && null != v.selectedIndex) {
              for (var J = 0; J < v.treeEntity.length; J++) {
                j[J].Id === v.selectedIndex && (j[J].visibleAreaColor = I);
              }
            }
          } else {
            if (0 < j.length && null != v.selectedIndex) {
              var F = o(I.toString()),
                  G = new b.fromBytes(F[0], F[1], F[2]).withAlpha(0.5);

              for (J = 0; J < v.treeEntity.length; J++) {
                j[J].Id === v.selectedIndex && (j[J].visibleAreaColor = G);
              }
            }
          }

          E(K);
        }
      }
    });
    this["visibleAreaColorScreenDisplay"] = "#00ff00";
    var x = g.observable();
    g.defineProperty(this, "hiddenAreaColorScreenDisplay", {
      get: function get() {
        var F = x();
        void 0 !== F["alpha"] && void 0 !== F["blue"] && void 0 !== F["green"] && void 0 !== F["red"] && (F = m("(" + F.red + "," + F.green + "," + F.blue + ")"));
        return F;
      },
      set: function set(I) {
        if (void 0 !== I) {
          var K = I;

          if (void 0 !== I.alpha && void 0 !== I.blue && void 0 !== I.green && void 0 !== I.red) {
            var H = new b(I.red, I.green, I.blue);
            K = m(H.toCssColorString());

            if (0 < j.length && null != v.selectedIndex) {
              for (var J = 0; J < v.treeEntity.length; J++) {
                j[J].Id === v.selectedIndex && (j[J].hiddenAreaColor = I);
              }
            }
          } else {
            if (0 < j.length && null != v.selectedIndex) {
              var F = o(I.toString()),
                  G = new b.fromBytes(F[0], F[1], F[2]).withAlpha(0.5);

              for (J = 0; J < v.treeEntity.length; J++) {
                j[J].Id === v.selectedIndex && (j[J].hiddenAreaColor = G);
              }
            }
          }

          x(K);
        }
      }
    });
    this["hiddenAreaColorScreenDisplay"] = "#ff0000";
    var A = g.observable();
    g.defineProperty(this, "longtitudeScreenDisplay", {
      get: function get() {
        return A()["toFixed"](7);
      },
      set: function set(I) {
        if (I = Number(I), !isNaN(I) && (A(I), 0 < j["length"] && null != v["selectedIndex"] && 0 < v["treeEntity"]["length"])) {
          for (var J = 0; J < v["treeEntity"]["length"]; J++) {
            if (j[J]["Id"] === v["selectedIndex"]) {
              var F = a.fromCartesian(j[J]["viewerPosition"]),
                  G = h.toDegrees(F["latitude"]),
                  H = F["height"],
                  K = f.fromDegrees(I, G, H);
              v["treeEntity"][J]["viewerPosition"] = K;
            }
          }
        }
      }
    }), this["longtitudeScreenDisplay"] = 0;
    var q = g.observable();
    g.defineProperty(this, "latitudeScreenDisplay", {
      get: function get() {
        return q()["toFixed"](7);
      },
      set: function set(I) {
        if (I = Number(I), !isNaN(I) && (q(I), 0 < j["length"] && null != v["selectedIndex"] && 0 < v["treeEntity"]["length"])) {
          for (var J = 0; J < v["treeEntity"]["length"]; J++) {
            if (j[J]["Id"] === v["selectedIndex"]) {
              var F = a.fromCartesian(j[J]["viewerPosition"]),
                  G = h.toDegrees(F["longitude"]),
                  H = F["height"],
                  K = f.fromDegrees(G, I, H);
              j[J]["viewerPosition"] = K;
            }
          }
        }
      }
    }), this["latitudeScreenDisplay"] = 0;
    var C = g.observable();
    g.defineProperty(this, "heightScreenDisplay", {
      get: function get() {
        return C()["toFixed"](2);
      },
      set: function set(I) {
        if (I = Number(I), !isNaN(I) && (C(I), 0 < j["length"] && null != v["selectedIndex"] && 0 < v["treeEntity"]["length"])) {
          for (var J = 0; J < v["treeEntity"]["length"]; J++) {
            if (j[J]["Id"] === v["selectedIndex"]) {
              var F = a.fromCartesian(j[J]["viewerPosition"]),
                  G = h.toDegrees(F["longitude"]),
                  H = h.toDegrees(F["latitude"]),
                  K = f.fromDegrees(G, H, I);
              j[J]["viewerPosition"] = K;
            }
          }
        }
      }
    });
    this["heightScreenDisplay"] = 0;
    g.track(this, ["tree", "treeEntity", "selectedDirection", "selectedName", "selectedPitch", "selectedDistance", "selectedHorizontalFov", "selectedVerticalFov", "selectedLongtitude", "selectedLatitude", "selectedHeight", "selectedVisibleAreaColor", "selectedHiddenAreaColor", "selectedIndex", "isSelected", "editerVisible", "dropDownVisible", "editObject", "analysisTree", "editAnalysisVisible", "generalVisible", "positionVisible", "viewshed3daction", "directionScreenDisplay", "pitchScreenDisplay", "distanceScreenDisplay", "horizontalFovScreenDisplay", "verticalFovScreenDisplay", "longtitudeScreenDisplay", "latitudeScreenDisplay", "heightScreenDisplay", "visibleAreaColorScreenDisplay", "hiddenAreaColorScreenDisplay", "_drawAgain", "_startAgain"]), this["StartViewshed"] = d(function () {
      v["viewshed3daction"] = !v["viewshed3daction"];
    });
    this["JumpToViewshed"] = d(function () {
      if (0 < j["length"]) {
        for (var F = 0; F < v["treeEntity"]["length"]; F++) {
          j[F]["Id"] === v["selectedIndex"] && j[F]["locateToViewer"]();
        }
      }
    }), this["DrawAgain"] = d(function () {
      v["_drawAgain"] = true;
    }), this["StartAgain"] = d(function () {
      v["_startAgain"] = true;
    }), this["ClearViewshed"] = d(function () {
      if (0 < j["length"]) {
        for (var F = 0; F < v["treeEntity"]["length"]; F++) {
          j[F]["Id"] === v["selectedIndex"] && (j[F]["destroy"](), j["splice"](F, 1), v["treeEntity"]["splice"](F, 1));
        }

        if (0 < j["length"]) {
          v["selectedIndex"] = v["treeEntity"][j["length"] - 1]["Id"];
          v["treeEntity"][j["length"] - 1]["lineColor"] = new b(1, 1, 1, 1);
          var G = document["getElementsByClassName"]("PowerGis-PGViewshed-LI");
          G[G["length"] - 1]["style"] = " color: #000; background: #adf; border-color: #fff; box-shadow: 0 0 8px #fff";

          for (F = 0; F < G["length"] - 1; F++) {
            G[F]["style"] = "background : none; box-shadow : none";
          }
        }
      }
    }), this["_StartViewshedSubscription"] = g.getObservable(this, "viewshed3daction")["subscribe"](function (F) {
      v["_viewshed3d"] = F ? new c(v["_viewer"]["scene"], "可视域" + v["count"]) : null;
    }), this["_selectedDirectionSubscription"] = g.getObservable(this, "selectedDirection")["subscribe"](function (F) {
      v["directionScreenDisplay"] = F;
    }), this["_selectedPitchSubscription"] = g.getObservable(this, "selectedPitch")["subscribe"](function (F) {
      v["pitchScreenDisplay"] = F;
    }), this["_selectedDistanceSubscription"] = g.getObservable(this, "selectedDistance")["subscribe"](function (F) {
      1000 < F ? (document["getElementById"]("slider")["setAttribute"]("max", F), document["getElementById"]("distance")["value"] = F) : document["getElementById"]("slider")["setAttribute"]("max", "1000"), v["distanceScreenDisplay"] = F;
    }), this["_selectedHorizontalFovSubscription"] = g.getObservable(this, "selectedHorizontalFov")["subscribe"](function (F) {
      v["horizontalFovScreenDisplay"] = F;
    }), this["_selectedVerticalFovSubscription"] = g.getObservable(this, "selectedVerticalFov")["subscribe"](function (F) {
      v["verticalFovScreenDisplay"] = F;
    }), this["_selectedVisibleAreaColorSubscription"] = g.getObservable(this, "selectedVisibleAreaColor")["subscribe"](function (F) {
      v["visibleAreaColorScreenDisplay"] = F;
    }), this["_selectedHiddenAreaColorSubscription"] = g.getObservable(this, "selectedHiddenAreaColor")["subscribe"](function (F) {
      v["hiddenAreaColorScreenDisplay"] = F;
    }), this["_selectedLongtitudeSubscription"] = g.getObservable(this, "selectedLongtitude")["subscribe"](function (F) {
      v["longtitudeScreenDisplay"] = F;
    }), this["_selectedLatitudeSubscription"] = g.getObservable(this, "selectedLatitude")["subscribe"](function (F) {
      v["latitudeScreenDisplay"] = F;
    }), this["_selectedHeightSubscription"] = g.getObservable(this, "selectedHeight")["subscribe"](function (F) {
      v["heightScreenDisplay"] = F;
    }), this["_selectedIndexSubscription"] = g.getObservable(this, "selectedIndex")["subscribe"](function (F) {
      v["isSelected"] = null != F, v["editInput"] && null != v["hasInput"] && (void 0 !== v["hasInput"]["childNodes"][0]["value"] && (v["hasInput"]["innerHTML"] = v["hasInput"]["childNodes"][0]["value"]), v["editInput"] = false), null != v["srcElementStyle"] && (v["srcElementStyle"]["style"] = defaultStatus, v["srcElementStyle"] = null);
    }), this["_toggleGeneral"] = d(function () {
      v["generalVisible"] = !v["generalVisible"];
    }), this["_toggleEditAnalysis"] = d(function () {
      v["editAnalysisVisible"] = !v["editAnalysisVisible"];
    }), this["_toggleAnalysisTree"] = d(function () {
      v["analysisTree"] = !v["analysisTree"];
    });
    var w = null;
    this["_liClickEvent"] = d(function (N, I) {
      var G = document.getElementsByClassName("LSGlobe-viewer-LI");

      for (var L = 0; L < G["length"]; L++) {
        G[L]["style"] = "background : none; box-shadow : none";
      }

      if ((I.target.style = "background: #adf; color: #000; border-color: #fff;box-shadow: 0 0 8px #fff;", w) && 500 < new Date()["getTime"]() - w) {
        if (v.selectedIndex === N.Id) {
          var F = I.target.innerHTML;
          I.target.style = "background : none; box-shadow : none", I.target.innerHTML = "<input type='text' value='" + F + "' style='width: 100%;margin-left: -13px; background:default;cursor: default;'>", v.editInput = true, v.hasInput = I.target;
        }

        null != v.srcElementStyle && (v.srcElementStyle.style = defaultStatus, v.srcElementStyle = null), v.selectedIndex = N.Id, v.selectedName = N.name, v.selectedDirection = N.direction, v.selectedPitch = N.pitch, v.selectedDistance = N.distance, v.selectedHorizontalFov = N.horizontalFov, v.selectedVerticalFov = N.verticalFov, v.selectedVisibleAreaColor = N.visibleAreaColor, v.selectedHiddenAreaColor = N.hiddenAreaColor;
        var H = a.fromCartesian(N["viewerPosition"]),
            K = h.toDegrees(H.longitude),
            J = h.toDegrees(H.latitude),
            M = H.height;
        v.selectedLongtitude = K;
        v.selectedLatitude = J;
        v.selectedHeight = M;

        v._cancelHight();

        N.lineColor = new b(1, 1, 1, 1);
        v._startAgain = false;
        v._drawAgain = false;
        I.target.style = "background: #adf; color: #000; border-color: #fff;box-shadow: 0 0 8px #fff;";
        v.srcElementStyle = I["srcElement"];
      }

      N.Id, w = new Date().getTime();
    }), this._dbClickEvent = d(function (I, K) {
      if (v.selectedIndex === I.Id) {
        var F = K.target.innerHTML;
        K.target.innerHTML = "<input type='text' value='" + F + "' style='width: 100%;margin-left: -13px; background:default;cursor: default;'>", v["editInput"] = true, v["hasInput"] = K["srcElement"];
      }

      v["editInput"] && null != v["hasInput"] && (void 0 !== v["hasInput"]["childNodes"][0]["value"] && (v["hasInput"]["innerHTML"] = v["hasInput"]["childNodes"][0]["value"]), v["editInput"] = false);
      var G = a.fromCartesian(I["viewerPosition"]),
          H = h.toDegrees(G["longitude"]),
          L = h.toDegrees(G["latitude"]),
          J = G["height"] + 100,
          M = f.fromDegrees(H, L, J);
      v["_viewer"]["camera"]["flyTo"]({
        destination: M,
        offset: new e(I["direction"], I["pitch"], I["verticalFov"])
      });
    }), this._toggleEditPosition = d(function () {
      v.positionVisible = !v.positionVisible;
    }), this.generalSwitchText = g.pureComputed(function () {
      return v.generalVisible ? "-" : "+";
    }), this.editAnalysisSwitchText = g.pureComputed(function () {
      return v.editAnalysisVisible ? "-" : "+";
    }), this.editAnalysisTreeSwitchText = g.pureComputed(function () {
      return v.analysisTree ? "-" : "+";
    }), this.editPositionSwitchText = g.pureComputed(function () {
      return v.positionVisible ? "-" : "+";
    }), this._cancelHight = function () {
      if (0 < j["length"]) {
        for (var F = 0; F < j["length"]; F++) {
          j[F]["lineColor"] = new b(1, 1, 0, 1);
        }
      }
    };
    var s = g.observable();
    g.defineProperty(this, "editerVisible", {
      get: function get() {
        return s();
      },
      set: function set(F) {
        s(F);
      }
    }), this["_removePostRenderEvent"] = y.scene.postRender.addEventListener(function () {
      v["_update"]();
    });
  }

  k(l["prototype"], {
    scene: {
      get: function get() {
        return this["_scene"];
      }
    },
    viewshed3d: {
      get: function get() {
        return this["_viewshed3d"];
      }
    },
    direction: {
      get: function get() {
        return this["_viewshed3d"]["direction"];
      },
      set: function set(q) {
        this["_viewshed3d"]["direction"] = q;
      }
    },
    distance: {
      get: function get() {
        return this["_viewshed3d"]["distance"];
      },
      set: function set(q) {
        this["_viewshed3d"]["distance"] = q;
      }
    },
    horizontalFov: {
      get: function get() {
        return this["_viewshed3d"]["horizontalFov"];
      },
      set: function set(q) {
        this["_viewshed3d"]["horizontalFov"] = q;
      }
    },
    verticalFov: {
      get: function get() {
        return this["_viewshed3d"]["verticalFov"];
      },
      set: function set(q) {
        this["_viewshed3d"]["verticalFov"] = q;
      }
    },
    viewerPosition: {
      get: function get() {
        return this["_viewshed3d"]["viewerPosition"];
      },
      set: function set(q) {
        this["_viewshed3d"]["viewerPosition"] = q;
      }
    },
    hiddenAreaColor: {
      get: function get() {
        return this["_viewshed3d"]["hiddenAreaColor"];
      },
      set: function set(q) {
        this["_viewshed3d"]["hiddenAreaColor"] = q;
      }
    },
    visibleAreaColor: {
      get: function get() {
        return this["_viewshed3d"]["visibleAreaColor"];
      },
      set: function set(q) {
        this["_viewshed3d"]["visibleAreaColor"] = q;
      }
    },
    pitch: {
      get: function get() {
        return this["_viewshed3d"]["pitch"];
      },
      set: function set(q) {
        this["_viewshed3d"]["pitch"] = q;
      }
    },
    toggleGeneral: {
      get: function get() {
        return this["_toggleGeneral"];
      }
    },
    toggleEditAnalysis: {
      get: function get() {
        return this["_toggleEditAnalysis"];
      }
    },
    toggleAnalysisTree: {
      get: function get() {
        return this["_toggleAnalysisTree"];
      }
    },
    toggleEditPosition: {
      get: function get() {
        return this["_toggleEditPosition"];
      }
    },
    liClickEvent: {
      get: function get() {
        return this["_liClickEvent"];
      }
    },
    dbClickEvent: {
      get: function get() {
        return this["_dbClickEvent"];
      }
    }
  });

  l["prototype"]["_update"] = function () {
    this["_numberOfFrustums"] = this["_scene"]["numberOfFrustums"];
    this["performance"] && this["_performanceDisplay"]["update"]();
  };

  l.prototype.initialiseHandlers = function () {
    var s = this._scene,
        q = this,
        r = new i(s.canvas);
    r.setInputAction(function (u) {
      if (q.viewshed3daction) {
        var t = q._viewer.scene.pickPosition(u.position);

        if (void 0 === t || q._viewshed3ding) {
          q._viewshed3d.setPoseByTargetPoint(t);

          q._viewshed3d.endPosition = t;
          q._viewshed3d.Id = q.count - 1;
          q.treeEntity.push(q._viewshed3d);
          q.selectedIndex = q._viewshed3d.Id;

          q._cancelHight();

          q._viewshed3d.lineColor = new b(1, 1, 1, 1);
          j.push(q._viewshed3d);
          q.directionScreenDisplay = q._viewshed3d.direction;
          q.pitchScreenDisplay = q._viewshed3d.pitch;
          1000 < q._viewshed3d.distance && (document.getElementById("slider").setAttribute("max", q._viewshed3d.distance), document.getElementById("distance").value = q._viewshed3d.distance);
          q.distanceScreenDisplay = q._viewshed3d.distance;
          q.horizontalFovScreenDisplay = q._viewshed3d.horizontalFov;
          q.verticalFovScreenDisplay = q._viewshed3d.verticalFov;
          var y = a.fromCartesian(q._viewshed3d.viewerPosition);
          q.longtitudeScreenDisplay = h.toDegrees(y.longitude);
          q.latitudeScreenDisplay = h.toDegrees(y.latitude);
          q.heightScreenDisplay = y.height;
          q.viewshed3daction = false;
          q._viewshed3ding = false;
          q._viewshed3d = null;
          q.count += 1;
          var x = document.getElementsByClassName("PowerGis-PGViewshed-LI");
          x[x.length - 1].style = " color: #000; background: #adf; border-color: #fff; box-shadow: 0 0 8px #fff";

          for (var z = 0; z < x.length - 1; z++) {
            x[z].style = "background : none; box-shadow : none";
          }
        } else {
          q._viewshed3d.viewerPosition = t;
          var w = o(q.visibleAreaColorScreenDisplay.toString());
          q._viewshed3d.visibleAreaColor = new b.fromBytes(w[0], w[1], w[2]).withAlpha(0.5);
          var v = o(q.hiddenAreaColorScreenDisplay.toString());
          q._viewshed3d.hiddenAreaColor = new b.fromBytes(v[0], v[1], v[2]).withAlpha(0.5);
          q._viewshed3ding = true;
        }
      }

      q["_drawAgain"] = false;
      q["_startAgain"] = false;
      q["editInput"] && null != q["hasInput"] && (void 0 !== q["hasInput"]["childNodes"][0]["value"] && 0 !== q["hasInput"]["value"] && (q["hasInput"]["parentElement"]["innerHTML"] = q["hasInput"]["value"]), q["editInput"] = false), null != q["srcElementStyle"] && (q["srcElementStyle"] = null);
    }, p.LEFT_CLICK);
    r.setInputAction(function (v) {
      if (q._viewshed3ding) {
        if (null != q._viewshed3d) {
          var w = q._viewer.scene.pickPosition(v.endPosition);

          q._viewshed3d.setPoseByTargetPoint(w);

          q._viewshed3d.endPosition = w;
        }
      } else {
        if (q._drawAgain) {
          w = q._viewer.scene.pickPosition(v.endPosition);
          var t = null;

          if (0 < j["length"]) {
            for (var u = 0; u < q["treeEntity"]["length"]; u++) {
              j[u]["Id"] === q["selectedIndex"] && (t = j[u]);
            }
          }

          null != t && (t["setPoseByTargetPoint"](w), t["endPosition"] = w);
        } else {
          if (q._startAgain) {
            w = q._viewer.scene.pickPosition(v.endPosition);
            t = null;

            if (0 < j.length) {
              for (u = 0; u < q["treeEntity"]["length"]; u++) {
                j[u]["Id"] === q["selectedIndex"] && (t = j[u]);
              }
            }

            null != t && (t["viewerPosition"] = w, t["setPoseByTargetPoint"](t["endPosition"]));
          }
        }
      }
    }, p.MOUSE_MOVE);
    r.setInputAction(function (t) {}, p.RIGHT_CLICK);
  };

  l["prototype"]["isDestroyed"] = function () {
    return false;
  };

  l["prototype"]["destroy"] = function () {
    this["_eventHandler"]["destroy"]();
    this["_removePostRenderEvent"]();
    this["_StartViewshedSubscription"]["dispose"]();
    this["_selectedDirectionSubscription"]["dispose"]();
    this["_selectedPitchSubscription"]["dispose"]();
    this["_selectedDistanceSubscription"]["dispose"]();
    this["_selectedHorizontalFovSubscription"]["dispose"]();
    this["_selectedVerticalFovSubscription"]["dispose"]();
    this["_selectedVisibleAreaColorSubscription"]["dispose"]();
    this["_selectedHiddenAreaColorSubscription"]["dispose"]();
    this["_selectedLongtitudeSubscription"]["dispose"]();
    this["_selectedLatitudeSubscription"]["dispose"]();
    this["_selectedHeightSubscription"]["dispose"]();
    this["_selectedIndexSubscription"]["dispose"]();
    return n(this);
  };

  return l;
});