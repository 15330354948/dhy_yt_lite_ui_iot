"use strict";

define(["../layers/GraphicsLayer", "../others/EventDrive", "../symbols/TextSymbol", "../symbols/PrimitiveSymbol", "../Graphic", "../_Color", "../../Source/Scene/LabelStyle", "../../Source/Scene/HorizontalOrigin", "../../Source/Scene/VerticalOrigin", "../../Source/Core/Cartesian3"], function (e, i, t, s, o, l, h, r, n, a) {
  function c(t) {
    var _this = this;

    this.viewer = t.viewer, this.layer = new e(), this.circles = [], this.path = [], this.height = [], this.lines = null, this.label = [], this.point = this.viewer.entities.add({
      point: {
        color: l.RED,
        pixelSize: 10
      }
    }), this.labelTotle = this.viewer.entities.add({
      label: {
        show: !1,
        showBackground: !0,
        font: "36px Helvetica",
        fillColor: l("WHITE"),
        outlineColor: l("BACK"),
        outlineWidth: 5,
        style: h.FILL_AND_OUTLINE,
        horizontalOrigin: r.CENTER,
        verticalOrigin: n.BASELINE,
        disableDepthTestDistance: 1e4,
        scale: .5
      }
    }), this.event = new i({
      viewer: this.viewer,
      eventType: "left_click",
      callBack: function callBack(e) {
        var i = _this.path,
            t = _this.movePoint.mapPoint.longitude,
            c = _this.movePoint.mapPoint.latitude,
            p = _this.movePoint.mapPoint.height,
            v = 0,
            d = 0;
        if (p < -50) return;
        i.push(t, c), _this.height.push(p);
        var w = i.length,
            m = new o({
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
            longitude: t,
            latitude: c,
            height: p + 30
          }
        }),
            u = new s({
          type: "circle",
          center: [t, c],
          radius: .5,
          color: "#4af99d",
          "class": "both"
        }),
            g = new s({
          type: "line",
          ranges: i,
          color: "red",
          width: 1,
          "class": "both"
        });

        if (_this.layer.add(m), _this.viewer.map.remove(_this.lines), _this.circles.push(u), _this.lines = g, _this.viewer.map.add(g), _this.viewer.map.add(u), w >= 4) {
          for (var _e2 = w - 1; _e2 >= 3; _e2 -= 2) {
            v += Math.sqrt(a.distanceSquared(new a.fromDegrees(i[_e2 - 1], i[_e2]), new a.fromDegrees(i[_e2 - 3], i[_e2 - 2])));
          }

          d = Math.sqrt(a.distanceSquared(new a.fromDegrees(i[w - 2], i[w - 1]), new a.fromDegrees(i[w - 4], i[w - 3]))), _this.labelTotle.position = new a.fromDegrees(i[0], i[1], _this.height[0] + 10), _this.labelTotle.show = !0, _this.labelTotle.label.show = !0, _this.labelTotle.label.text = "总长:" + v.toFixed(2) + "米";

          var _e = _this.viewer.entities.add({
            show: !0,
            position: new a.fromDegrees((i[w - 2] + i[w - 4]) / 2, (i[w - 1] + i[w - 3]) / 2, _this.height[w / 2 - 1] + 10),
            label: {
              show: !0,
              text: d.toFixed(2) + "米",
              showBackground: !0,
              font: "36px Helvetica",
              fillColor: l("WHITE"),
              outlineColor: l("BACK"),
              outlineWidth: 5,
              style: h.FILL_AND_OUTLINE,
              horizontalOrigin: r.CENTER,
              verticalOrigin: n.BASELINE,
              disableDepthTestDistance: 1e4,
              scale: .5
            }
          });

          _this.label.push(_e);
        }

        _this.viewer.scene.requestRenderMode = !1;
      }
    }), this.mouseMove = new i({
      eventType: "mouse_move",
      viewer: t.viewer,
      callBack: function callBack(e) {
        _this.movePoint = e, _this.point && (_this.point.position = e.cartesian);
      }
    });
  }

  return c.prototype.destroy = function () {
    var _this2 = this;

    this.viewer.entities.remove(this.labelTotle), this.viewer.entities.remove(this.point), this.label.forEach(function (e) {
      return _this2.viewer.entities.remove(e);
    }), this.viewer.map.remove(this.lines), this.circles.forEach(function (e) {
      return _this2.viewer.map.remove(e);
    }), this.event.destroy(), this.mouseMove.destroy(), this.height = [], this.circles = [], this.point = null, this.path = [], this.lines = null;
  }, c;
});