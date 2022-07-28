"use strict";

define(["../layers/GraphicsLayer", "../others/EventDrive", "../symbols/TextSymbol", "../symbols/PrimitiveSymbol", "../Graphic", "../_Color", "../../Source/Core/Color", "../../Source/Core/PolygonGeometry", "../../Source/Core/PolygonHierarchy", "../../Source/Core/Cartesian3", "../../Source/Scene/LabelStyle", "../../Source/Scene/HorizontalOrigin", "../../Source/Scene/VerticalOrigin"], function (e, i, t, o, s, r, l, h, n, a, c, v, p) {
  function u(t) {
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
        fillColor: r("WHITE"),
        outlineColor: r("BACK"),
        outlineWidth: 5,
        style: c.FILL_AND_OUTLINE,
        horizontalOrigin: v.CENTER,
        verticalOrigin: p.BASELINE,
        disableDepthTestDistance: 1e4,
        scale: .5
      }
    }), this.event = new i({
      viewer: this.viewer,
      eventType: "left_click",
      callBack: function callBack(e) {
        var i = _this.path,
            t = _this.movePoint.mapPoint.longitude,
            r = _this.movePoint.mapPoint.latitude,
            l = _this.movePoint.mapPoint.height;
        if (l < -50) return;
        i.push(t, r), _this.height.push(l);
        var c = i.length,
            v = new s({
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
            latitude: r,
            height: l + 30
          }
        }),
            p = new o({
          type: "circle",
          center: [t, r],
          radius: .5,
          color: "#4af99d",
          "class": "both"
        }),
            u = new o({
          type: i.length > 4 ? "" : "line",
          ranges: i,
          color: "rgba(255, 0, 0, .8)",
          width: 1,
          "class": "both"
        });

        if (_this.layer.add(v), _this.lines && _this.viewer.map.remove(_this.lines), _this.lines = u, _this.circles.push(p), _this.viewer.map.add(u), _this.viewer.map.add(p), c >= 6) {
          var m = new h({
            polygonHierarchy: new n(a.fromDegreesArray(i)),
            perPositionHeight: !0
          }),
              y = h.createGeometry(m);

          if (void 0 != y) {
            for (var d = y.indices, w = y.attributes.position.values, g = [], b = 0, f = 0; f < w.length / 3; f++) {
              var S = new a(0, 0, 0);
              S.x = w[3 * f], S.y = w[3 * f + 1], S.z = w[3 * f + 2], g.push(S);
            }

            for (f = 0; f < d.length / 3; f++) {
              var T = [];
              T.push(g[d[3 * f]], g[d[3 * f + 1]], g[d[3 * f + 2]]);
              var C = a.distance(T[0], T[1]),
                  P = a.distance(T[0], T[2]),
                  E = a.distance(T[1], T[2]),
                  x = (C + P + E) / 2;
              b += Math.sqrt(x * (x - C) * (x - E) * (x - P));
            }

            var _e = _this.layer.items.map(function (e, i, t) {
              return e.position._value;
            });

            console.log(_e);
            var D = 0,
                z = 0,
                H = 0;

            for (f = 0; f < _e.length; f++) {
              D += _e[f].x, z += _e[f].y, H += _e[f].z;
            }

            var L = _e.length,
                _ = new a.fromDegrees(0, 0, 0);

            _.x = D / L, _.y = z / L, _.z = H / L, _this.labelTotle.position = _, _this.labelTotle.show = !0, _this.labelTotle.label.show = !0, _this.labelTotle.label.text = "总面积:" + b.toFixed(2) + "m²";
          }
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

  return u.prototype.destroy = function () {
    var _this2 = this;

    this.viewer.entities.remove(this.labelTotle), this.viewer.entities.remove(this.point), this.label.forEach(function (e) {
      return _this2.viewer.entities.remove(e);
    }), this.circles.forEach(function (e) {
      return _this2.viewer.map.remove(e);
    }), this.viewer.map.remove(this.lines), this.event.destroy(), this.mouseMove.destroy(), this.height = [], this.circles = [], this.point = null, this.path = [], this.lines = null;
  }, u;
});