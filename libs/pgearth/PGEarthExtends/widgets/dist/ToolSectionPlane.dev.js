"use strict";

define(["../layers/GraphicsLayer", "../others/EventDrive", "../symbols/TextSymbol", "../symbols/PrimitiveSymbol", "../Graphic", "../../Source/Core/Color", "../../Source/Core/Ellipsoid", "../../Source/Core/Cartesian2", "../../Source/Core/Cartesian3"], function (e, i, t, s, h, o, n, r, l) {
  function a(t) {
    var _this = this;

    this.viewer = t.viewer, this.layer = new e(), this.path = [], this.height = [], this.lines = null, this.label = [], this.screenPoints = [], this.point = this.viewer.entities.add({
      point: {
        color: o.RED,
        pixelSize: 10
      }
    }), this.event = new i({
      viewer: this.viewer,
      eventType: "left_click",
      callBack: function callBack(e) {
        4 == _this.path.length && (_this.path = [], _this.screenPoints = [], _this.height = [], _this.viewer.map.remove(_this.lines), _this.label.forEach(function (e) {
          return _this.viewer.map.remove(e);
        }), _this.label = []);
        var i = _this.path,
            o = _this.screenPoints,
            a = _this.movePoint.longitude,
            c = _this.movePoint.latitude,
            p = _this.movePoint.height;
        if (p < -50) return;
        i.push(a, c), _this.screenPoints.push(e.screenPoint.x, e.screenPoint.y), _this.height.push(p);
        i.length;
        var v = new h({
          symbol: {
            type: "point-3d",
            style: {
              type: "cone",
              height: 600,
              width: 300,
              color: "#4af99d"
            }
          },
          geometry: {
            type: "point",
            longitude: a,
            latitude: c,
            height: p + 300
          }
        }),
            u = new s({
          type: "circle",
          center: [a, c],
          radius: 1,
          color: "#4af99d",
          "class": "both"
        }),
            d = new s({
          type: "line",
          ranges: i,
          color: "red",
          width: 2,
          "class": "both"
        });

        if (_this.layer.add(v), _this.label.push(u), _this.lines = d, _this.viewer.map.add(d), _this.viewer.map.add(u), 4 == _this.screenPoints.length) {
          var _e = _this.viewer.scene,
              _i = o[0],
              _s = o[1],
              _h = o[2],
              _a = o[3],
              _c = 50,
              _p = Math.abs(_i - _h) / _c,
              _v = Math.abs(_s - _a) / _c,
              _u = null,
              _d = null,
              m = null,
              w = [];

          _i < _h ? (_u = _i, _d = _s, m = _a) : (_u = _h, _d = _a, m = _s);

          for (var _i2 = 1; _i2 <= _c; _i2++) {
            var _t = void 0,
                _s2 = void 0,
                _h2 = void 0,
                _o = new r(_u + _p * _i2, _d - m > 0 ? _d - _v * _i2 : _d + _v * _i2);

            if (_e.pick(_o)) {
              if (_h2 = _e.pickPosition(_o), _t = _e.pickPosition(new r(_u, _d)), !_h2) return;
              _s2 = _this.viewer.scene.globe.ellipsoid.cartesianToCartographic(_h2);
            } else {
              var _i3 = _e.camera.getPickRay(_o);

              _h2 = _e.globe.pick(_i3, _e), _t = _e.globe.pick(_e.camera.getPickRay(new r(_u, _d)), _e), _s2 = n.WGS84.cartesianToCartographic(_h2);
            }

            var _a2 = Math.sqrt(l.distanceSquared(_h2, _t));

            w.push({
              distance: _a2,
              height: _s2.height < 0 ? 0 : _s2.height
            });
          }

          t.callBack && t.callBack(w);
        }

        _this.viewer.scene.requestRenderMode = !1;
      }
    }), this.mouseMove = new i({
      eventType: "mouse_move",
      viewer: t.viewer,
      callBack: function callBack(e) {
        _this.movePoint = e.mapPoint, _this.point && (_this.point.position = e.cartesian);
      }
    });
  }

  return a.prototype.destroy = function () {
    var _this2 = this;

    this.viewer.entities.remove(this.labelTotle), this.viewer.entities.remove(this.point), this.label.forEach(function (e) {
      return _this2.viewer.map.remove(e);
    }), this.viewer.map.remove(this.lines), this.event.destroy(), this.mouseMove.destroy(), this.height = [], this.point = null, this.path = [], this.lines = null;
  }, a;
});