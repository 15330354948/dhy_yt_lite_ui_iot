"use strict";

define(["../../Source/Core/Color", "../../Source/Core/Cartesian3", "../../Source/Core/Cartographic", "../../Source/Core/Rectangle", "../../Source/Core/PolygonHierarchy", "../../Source/Core/PolygonGeometry", "../../Source/Core/GeometryInstance", "../../Source/Core/RectangleGeometry", "../../Source/Core/ColorGeometryInstanceAttribute", "../../Source/Scene/GroundPrimitive", "../../Source/Scene/ClassificationType", "../../Source/DataSources/PolylineDashMaterialProperty", "../others/EventDrive"], function (e, i, o, r, n, t, l, a, s, c, d, y, h) {
  return drawMap = {
    cartographics: [],
    addPoint: function addPoint(o) {
      this.viewer = o;
      var r = this;
      this.pointHandler = new h({
        viewer: r.viewer,
        callBack: function callBack(o) {
          r.removEntities(["point"]), r.viewer.entities.add({
            id: "point",
            position: i.fromDegreesArray(o)[0],
            point: {
              pixelSize: 10,
              color: e.YELLOW
            }
          });
        }
      });
    },
    destroyPointHandler: function destroyPointHandler(e) {
      this.pointHandler.destroy(), this.removEntities(["point"]);
    },
    addPolyLine: function addPolyLine(o) {
      this.viewer = o;
      var r = this,
          n = [];
      this.polyLineClickHandler = new h({
        viewer: o,
        callBack: function callBack(o) {
          n.push(o[0]), n.push(o[1]), n.length > 1 && (r.removEntities(["strockLine"]), r.viewer.entities.add({
            id: "strockLine",
            polyline: {
              positions: i.fromDegreesArray(n),
              width: 1,
              material: e.RED
            }
          }));
        },
        eventType: "LEFT_CLICK"
      }), this.polyLineMoveHandler = new h({
        viewer: o,
        callBack: function callBack(o) {
          var t = n.length;
          n.length > 1 && (r.removEntities(["dashLine"]), r.viewer.entities.add({
            id: "dashLine",
            polyline: {
              positions: i.fromDegreesArray([n[t - 2], n[t - 1], o[0], o[1]]),
              width: 1,
              material: new y({
                color: e.WHITE
              })
            }
          }));
        },
        eventType: "MOUSE_MOVE"
      });
    },
    destroyPolyLineHandler: function destroyPolyLineHandler() {
      this.polyLineClickHandler.destroy(), this.polyLineMoveHandler.destroy(), this.removEntities(["dashLine", "strockLine"]);
    },
    addPolygon: function addPolygon(o) {
      this.viewer = o;
      var r = this,
          n = [];
      this.polygonClickHandler = new h({
        viewer: o,
        callBack: function callBack(o) {
          n.push(o[0]), n.push(o[1]), r.removEntities(["polygon1"]), n.length >= 3 && r.viewer.entities.add({
            id: "polygon1",
            polygon: {
              hierarchy: i.fromDegreesArray(n),
              material: e.RED.withAlpha(.5)
            }
          });
        }
      }), this.polygonMoveHandler = new h({
        viewer: o,
        callBack: function callBack(o) {
          var t;
          r.removEntities(["polygon2"]), t = n.length ? (n.join() + "," + o.join()).split(",").map(function (e) {
            return Number(e);
          }) : o, 2 == n.length ? (r.removEntities(["polygon2"]), r.viewer.entities.add({
            id: "polygon2",
            polyline: {
              positions: i.fromDegreesArray(t),
              width: 1,
              material: new y({
                color: e.WHITE
              })
            }
          })) : n.length > 2 && r.viewer.entities.add({
            id: "polygon2",
            polygon: {
              hierarchy: i.fromDegreesArray(t),
              material: e.WHITE.withAlpha(.5)
            }
          });
        },
        eventType: "MOUSE_MOVE"
      });
    },
    destroyPolygonHandler: function destroyPolygonHandler() {
      this.polygonClickHandler.destroy(), this.polygonMoveHandler.destroy(), this.removEntities(["polygon1", "polygon2"]);
    },
    removEntities: function removEntities(e) {
      var i = this;
      e.forEach(function (e, o, r) {
        i.viewer.entities.getById(e) && i.viewer.entities.removeById(e);
      });
    },
    ElePoint: function ElePoint(o) {
      var r = this,
          a = [];
      this.viewer = o, this.eleClickHandler = new h({
        viewer: o,
        callBack: function callBack(o, y, h) {
          console.log(o), console.log(h), a.push(o[0], o[1]), console.log(a), a.length >= 6 && (r.rectanglePrimitive && r.viewer.scene.primitives.remove(r.rectanglePrimitive), r.rectanglePrimitive = r.viewer.scene.primitives.add(new c({
            geometryInstances: new l({
              geometry: new t({
                polygonHierarchy: new n(i.fromDegreesArray(a))
              }),
              attributes: {
                color: s.fromColor(new e(1, 0, 0, .5))
              }
            }),
            classificationType: d.PGEARTH_3D_TILE
          })));
        }
      });
    },
    removeElePoint: function removeElePoint(e) {
      this.eleClickHandle && this.eleClickHandler.destroy(), this.rectanglePrimitive && e.scene.primitives.remove(this.rectanglePrimitive);
    }
  }, drawMap;
});