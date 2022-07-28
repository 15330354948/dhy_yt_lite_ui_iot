"use strict";

define(["../../Source/Core/defined", "../../Source/Core/RuntimeError", "../../Source/Core/Cartesian2", "../../Source/Core/ScreenSpaceEventHandler", "../../Source/DataSources/Entity", "../../Source/DataSources/GeoJsonDataSource", "../../Source/Core/Cartographic", "../../Source/Core/Math", "../../Source/Core/Color", "../../Source/Core/Cartesian3", "../../Source/Core/ScreenSpaceEventType", "../../Source/Core/PolygonGeometry", "../../Source/Core/PolygonHierarchy"], function (i, m, g, f, j, k, b, c, a, e, n, h, l) {
  function d(o) {
    if (!i(o.viewer)) {
      throw new m("viewer is required");
    }

    this.viewer = o.viewer;
    this.PolygonPointArray_fill = null;
    this.firstPointLon = -999;
    this.firstPointLat = -999;
    this.firstPointHei = -999;
    this.lastPointLon = -999;
    this.lastPointLat = -999;
    this.lastPointHei = -999;
    this.tempDataSource = null;
    this.targetDataSource = null;
    this.poinsTemp = [];
    this.isStartDraw = false;
  }

  d.prototype.start = function (w) {
    var y = this;
    var p = y.viewer;
    var q = p.scene;
    var t = new g();
    y.poinsTemp = [];
    var x;
    var u = this.handlerPolygon = new f(p.scene.canvas);
    var v = p.entities.add(new j());
    var o = p.entities.add(new j());
    var s = p.dataSources.add(new k("tempDataSource"));
    s.then(function (z) {
      y.tempDataSource = z;
    }).otherwise(function (z) {});
    var r = p.dataSources.add(new k("targetDataSource"));
    r.then(function (z) {
      y.targetDataSource = z;
    }).otherwise(function (z) {});
    u.setInputAction(function (A) {
      var E = p.camera.pickEllipsoid(A.position, q.globe.ellipsoid);

      if (E) {
        var B = q.pickPosition(A.position);
        var D = b.fromCartesian(B);
        var G = c.toDegrees(D.longitude);
        var F = c.toDegrees(D.latitude);
        var z = D.height;

        if (!y.isStartDraw) {
          y.tempDataSource.entities.add({
            position: E,
            clampToGround: true,
            attachPolygon: true,
            point: {
              parent: v,
              pixelSize: 3,
              color: a.YELLOW,
              disableDepthTestDistance: 1000000000
            }
          });
          y.firstPointLon = G;
          y.firstPointLat = F;
          y.firstPointHei = z;
          y.PolygonPointArray_fill = null;
          y.isStartDraw = true;
          x = z;
        } else {
          y.tempDataSource.entities.add({
            position: E,
            clampToGround: true,
            attachPolygon: true,
            point: {
              parent: v,
              pixelSize: 3,
              color: a.YELLOW,
              disableDepthTestDistance: 1000000000
            }
          });
          y.tempDataSource.entities.add({
            name: "line on the surface",
            parent: o,
            clampToGround: true,
            attachPolygon: true,
            polyline: {
              positions: e.fromDegreesArrayHeights([y.lastPointLon, y.lastPointLat, y.lastPointHei, G, F, z]),
              width: 2,
              material: a.BLUE,
              clampToGround: true,
              attachPolygon: true,
              disableDepthTestDistance: 1000000000
            }
          });
          z = x;
        }

        y.lastPointLon = G;
        y.lastPointLat = F;
        y.lastPointHei = z;

        if (y.PolygonPointArray_fill == null) {
          y.PolygonPointArray_fill = new Array();
        }

        y.PolygonPointArray_fill.push(G);
        y.PolygonPointArray_fill.push(F);
        y.PolygonPointArray_fill.push(z);
        var C = p.scene.pickPosition(A.position);
        y.poinsTemp.push(C);
      }

      p.scene.requestRender();
    }, n.LEFT_CLICK);
    u.setInputAction(function (B) {
      var E = p.camera.pickEllipsoid(B.position, q.globe.ellipsoid);

      if (E && y.isStartDraw) {
        var A = q.pickPosition(B.position);

        if (A) {
          var D = b.fromCartesian(A);
          var F = c.toDegrees(D.longitude);
          var C = c.toDegrees(D.latitude);
          var G = x;

          if (y.PolygonPointArray_fill != null) {
            y.PolygonPointArray_fill.push(F);
            y.PolygonPointArray_fill.push(C);
            y.PolygonPointArray_fill.push(G);
          }

          y.poinsTemp.push(A);
        }

        var z = y.addPolygon();

        if (z) {
          w();
          u.destroy();
          y.PolygonPointArray_fill = null;
          y.isStartDraw = false;
          y.polygonObj = new h({
            polygonHierarchy: new l(y.poinsTemp),
            perPositionHeight: true
          });
          document.getElementById("trackLabel") && (document.getElementById("trackLabel").style.display = "none");
        }
      } else {
        y.PolygonPointArray_fill = null;
        y.tempDataSource.entities.removeAll();
        y.targetDataSource.entities.removeAll();
      }
    }, n.RIGHT_CLICK);
    y.createLabel();
    u.setInputAction(function (B) {
      var D = p.camera.pickEllipsoid(B.endPosition, q.globe.ellipsoid);
      var A = document.getElementById("trackLabel");
      A.style.display = "block";

      if (D) {
        var C = b.fromCartesian(D);
        var z = q.cartesianToCanvasCoordinates(D, t);

        if (i(z)) {
          A.style.top = z.y - A.clientHeight + 5 + "px";
          A.style.left = z.x + 10 + "px";
        }
      } else {}
    }, n.MOUSE_MOVE);
  };

  d.prototype.addPolygon = function (y) {
    var t = false;

    if (y) {
      var v = this.targetDataSource.entities.values;

      if (v.length === 0) {
        return;
      }

      var w = [];

      for (var u = 0; u < v.length; u++) {
        var s = v[u];

        if (s.polygon) {
          var x = s.polygon.hierarchy._value;

          for (var r = 0; r < x.length; r++) {
            var o = x[r];
            var q = b.fromCartesian(o);
            w.push(c.toDegrees(q.longitude));
            w.push(c.toDegrees(q.latitude));
            w.push(y);
          }

          s.polygon.material = a.fromRandom({
            alpha: 0.01
          });
        }
      }

      this.targetDataSource.entities.removeAll();
      this.targetDataSource.entities.add({
        name: "未命名面",
        id: "impolygon",
        polygon: {
          hierarchy: e.fromDegreesArrayHeights(w),
          material: new a(0.5, 1, 1, 0.7),
          fill: true,
          perPositionHeight: true
        }
      });
      t = true;
    } else {
      if (this.PolygonPointArray_fill.length >= 9) {
        this.targetDataSource.entities.add({
          name: "未命名面",
          id: "impolygon",
          polygon: {
            hierarchy: e.fromDegreesArrayHeights(this.PolygonPointArray_fill),
            material: new a(0.5, 1, 1, 0.7),
            fill: true,
            outline: true,
            outlineWidth: 100,
            outlineColor: a.YELLOW,
            perPositionHeight: true
          }
        });
        this.tempDataSource.entities.removeAll();
        t = true;
      } else {
        alert("绘制范围最少3个点");
      }
    }

    this.viewer.scene.requestRender();
    return t;
  };

  d.prototype.remove = function () {
    this.handlerPolygon.isDestroyed() || this.handlerPolygon.destroy();
    this.tempDataSource.entities.removeAll();
    this.targetDataSource.entities.removeAll();
    this.viewer.scene.requestRender();
  };

  d.prototype.createLabel = function () {
    var o = this,
        q = document.getElementById("trackLabel");

    if (!q) {
      var p = document.createElement("div");
      p.id = "trackLabel";
      p.style.position = "absolute";
      p.style.top = "-40px";
      p.style.left = "-40px";
      p.style.padding = "0 5px";
      p.style.height = "30px";
      p.style.top = "-40px";
      p.style.textAlign = "center";
      p.style.color = "#fff";
      p.style.backgroundColor = "rgba(0, 0, 0, .7)";
      p.style.display = "block";
      p.style.zIndex = "10000";
      p.style.verticalAlign = "middle";
      p.innerHTML = "左击绘制分析范围，右击结束";
      o.viewer.container.appendChild(p);
    }
  };

  d.prototype.createPolygon = function (o) {
    if (!o && !o.ranges.length > 2) {
      new Error("parameter error");
      return;
    }

    return new h({
      polygonHierarchy: new l(e.fromDegreesArrayHeights(o.ranges)),
      perPositionHeight: true
    });
  };

  return d;
});