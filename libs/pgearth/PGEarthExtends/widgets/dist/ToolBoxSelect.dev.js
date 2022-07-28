"use strict";

define(["../layers/GraphicsLayer", "../others/EventDrive", "../symbols/TextSymbol", "../symbols/PrimitiveSymbol", "../Graphic", "../_Color", "../../Source/Core/Color", "../../Source/Core/Cartesian2", "../../Source/Core/Cartesian3"], function (e, t, i, s, r, n, o, h, l) {
  function c(i) {
    var _this = this;

    this.viewer = i.viewer, this.layer = new e(), this.circles = [], this.path = [], this.height = [], this.btn = null, this.lines = null, this.point = this.viewer.entities.add({
      point: {
        color: o.RED,
        pixelSize: 10
      }
    }), this.event = new t({
      viewer: this.viewer,
      eventType: "left_click",
      callBack: function callBack(e) {
        var t = _this.path,
            i = _this.movePoint.mapPoint.longitude,
            n = _this.movePoint.mapPoint.latitude,
            o = _this.movePoint.mapPoint.height;
        if (o < -50) return;
        t.push(i, n), _this.height.push(o);
        t.length;
        var h = new r({
          symbol: {
            type: "point-3d",
            style: {
              type: "cone",
              height: 60,
              width: 30,
              color: "#4af99d"
            }
          },
          geometry: {
            type: "point",
            longitude: i,
            latitude: n,
            height: o + 30
          }
        }),
            l = new s({
          type: "circle",
          center: [i, n],
          radius: .5,
          color: "#4af99d",
          "class": "both"
        }),
            c = new s({
          type: t.length > 4 ? "" : "line",
          ranges: t,
          color: "rgba(255, 0, 0, .8)",
          width: 1,
          "class": "both"
        });
        _this.layer.add(h), _this.lines && _this.viewer.map.remove(_this.lines), _this.circles.push(l), _this.lines = c, _this.viewer.map.add(c), _this.viewer.map.add(l), _this.viewer.scene.requestRenderMode = !1;
      }
    }), this.mouseMove = new t({
      eventType: "mouse_move",
      viewer: i.viewer,
      callBack: function callBack(e) {
        _this.movePoint = e, _this.point && (_this.point.position = e.cartesian);
      }
    }), this.rightClick = new t({
      viewer: this.viewer,
      eventType: "right_click",
      callBack: function callBack(e) {
        var t = _this.path,
            s = t.length;

        if (t.length >= 6) {
          _this.event.destroy(), _this.viewer.entities.remove(_this.point), _this.rightClick.destroy();

          var _e = _this.btn = document.getElementById("boxSelectBtn") || function () {
            var e = document.querySelector(".libras-viewer"),
                t = document.createElement("button");
            return t.style.cssText = "position:absolute;z-index:100000;padding:5px;border:1px solid #ccc;border-radius:4px;cursor:pointer", t.id = "boxSelectBtn", t.innerText = "查询", e.appendChild(t), t.addEventListener("click", function () {
              _this.btn.remove(), i.callBack && i.callBack(_this.path);
            }), t;
          }(),
              _r = _this.height,
              _n = _r.reduce(function (e, t, i) {
            return e + t;
          }) / _r.length,
              _o = 0,
              _c = 0;

          for (var _e2 = t.length - 1; _e2 >= 0; _e2 -= 2) {
            _o += t[_e2 - 1], _c += t[_e2];
          }

          _this.viewer.scene.preRender.addEventListener(function () {
            var t = l.fromDegrees(_o / (s / 2), _c / (s / 2), _n + 50),
                i = _this.viewer.scene.cartesianToCanvasCoordinates(t, new h());

            i && (_e.style.top = i.y + "px", _e.style.left = i.x + "px");
          });
        }
      }
    });
  }

  return c.prototype.destroy = function () {
    var _this2 = this;

    this.viewer.map.remove(this.lines), this.viewer.entities.remove(this.point), this.circles.forEach(function (e) {
      return _this2.viewer.map.remove(e);
    }), this.event.destroy(), this.btn && this.btn.remove(), this.rightClick.destroy(), this.mouseMove.destroy(), this.height = [], this.circles = [], this.point = null, this.path = [];
  }, c;
});