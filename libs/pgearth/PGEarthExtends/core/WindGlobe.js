define([
    '../../Source/Core/Cartographic',
  '../../Source/Core/Math',
  '../../Source/Core/Cartesian3',
  '../../Source/Scene/SceneTransforms',
], function (Cartographic, CMath, Cartesian3 ,SceneTransforms) {
  var globe = function (viewer) {

    var G = viewer;
    function view2D() {
      for (var e, t, n, a, r = G.canvas.width / 2, o = G.canvas.height / 2, s = r, c = 0; c < G.canvas.height; c++)
        if (e = PGEarthWindowToWGS84(s, c)) {
          e = e[1];
          break
        }
      for (var s = r, c = G.canvas.height - 1; c >= 0; c--)
        if (t = PGEarthWindowToWGS84(s, c)) {
          t = t[1];
          break
        }
      for (var s = 0, c = o; s < G.canvas.width; s++)
        if (a = PGEarthWindowToWGS84(s, c)) {
          a = a[0];
          break
        }
      for (var s = G.canvas.width, c = o; s >= 0; s--)
        if (n = PGEarthWindowToWGS84(s, c)) {
          n = n[0];
          break
        }
      return {
        east: n,
        west: a,
        north: e,
        south: t
      }
    }

    function viewRect() {
      var east, west, north, south;
      var camera = G.scene.camera, r = (G.scene.mapProjection.ellipsoid, camera.computeViewRectangle(G.scene.globe.ellipsoid));
      return r ? (east = 360 * r.east / 2 / Math.PI,
          west = 360 * r.west / 2 / Math.PI,
          north = 360 * r.north / 2 / Math.PI,
          south = 360 * r.south / 2 / Math.PI) : (r = view2D(),
          east = r.east,
          west = r.west,
          north = r.north,
          south = r.south),
          {
            east: east,
            west: west,
            north: north,
            south: south
          }
    }

    function PGEarthWGS84ToWindowCoord(point) {
      var scene = G.scene;
      var lonlat = Cartesian3.fromDegrees(point[0], point[1]);
      var coord = SceneTransforms.wgs84ToWindowCoordinates(scene, lonlat);
      return [coord.x, coord.y]
    }

    function PGEarthWindowToWGS84(x, y) {
      var point = {
        x: x,
        y: y
      };
      var scene = G.scene;
      var cartesian = G.camera.pickEllipsoid(point, scene.globe.ellipsoid);
      if (cartesian) {
        var cartographic = Cartographic.fromCartesian(cartesian);
        return [CMath.toDegrees(cartographic.longitude), CMath.toDegrees(cartographic.latitude)]
      }
    }

    return {
      viewRect: viewRect,
      PGEarthWGS84ToWindowCoord: PGEarthWGS84ToWindowCoord,
      PGEarthWindowToWGS84: PGEarthWindowToWGS84
    }

  };
  return globe
})
