"use strict";

define(["../Core/BoundingSphere", "../Core/Cartesian3", "../Core/Cartographic", "../Core/Check", "../Core/ColorGeometryInstanceAttribute", "../Core/defaultValue", "../Core/defineProperties", "../Core/Ellipsoid", "../Core/GeometryInstance", "../Core/IntersectionTests", "../Core/Matrix4", "../Core/OrientedBoundingBox", "../Core/Plane", "../Core/Ray", "../Core/Rectangle", "../Core/RectangleOutlineGeometry", "./PerInstanceColorAppearance", "./Primitive", "./SceneMode"], function (r, T, e, v, n, o, t, a, i, f, s, h, x, c, B, m, u, l, S) {
  "use strict";

  function g(e) {
    v.typeOf.object("options", e), v.typeOf.object("options.rectangle", e.rectangle), this.rectangle = B.clone(e.rectangle), this.minimumHeight = o(e.minimumHeight, 0), this.maximumHeight = o(e.maximumHeight, 0), this.southwestCornerCartesian = new T(), this.northeastCornerCartesian = new T(), this.westNormal = new T(), this.southNormal = new T(), this.eastNormal = new T(), this.northNormal = new T();
    var t = o(e.ellipsoid, a.WGS84);
    !function (e, t, r) {
      r.cartographicToCartesian(B.southwest(t), e.southwestCornerCartesian), r.cartographicToCartesian(B.northeast(t), e.northeastCornerCartesian), z.longitude = t.west, z.latitude = .5 * (t.south + t.north), z.height = 0;
      var o = r.cartographicToCartesian(z, H),
          n = T.cross(o, T.UNIT_Z, y);
      T.normalize(n, e.westNormal), z.longitude = t.east;
      var a = r.cartographicToCartesian(z, _),
          i = T.cross(T.UNIT_Z, a, y);
      T.normalize(i, e.eastNormal);
      var s,
          h = T.subtract(o, a, y),
          c = T.normalize(h, P),
          m = t.south;
      {
        var u, l;
        s = 0 < m ? (z.longitude = .5 * (t.west + t.east), z.latitude = m, u = r.cartographicToCartesian(z, E.origin), T.clone(c, E.direction), l = x.fromPointNormal(e.southwestCornerCartesian, e.westNormal, j), f.rayPlane(E, l, e.southwestCornerCartesian), r.geodeticSurfaceNormal(u, b)) : r.geodeticSurfaceNormalCartographic(B.southeast(t), b);
      }
      var g = T.cross(s, h, I);
      T.normalize(g, e.southNormal);
      var C,
          d = t.north;
      {
        var p, w;
        C = d < 0 ? (z.longitude = .5 * (t.west + t.east), z.latitude = d, p = r.cartographicToCartesian(z, E.origin), T.negate(c, E.direction), w = x.fromPointNormal(e.northeastCornerCartesian, e.eastNormal, j), f.rayPlane(E, w, e.northeastCornerCartesian), r.geodeticSurfaceNormal(p, b)) : r.geodeticSurfaceNormalCartographic(B.northwest(t), b);
      }
      var N = T.cross(h, C, I);
      T.normalize(N, e.northNormal);
    }(this, e.rectangle, t), o(e.computeBoundingVolumes, !0) && (this._orientedBoundingBox = h.fromRectangle(this.rectangle, this.minimumHeight, this.maximumHeight, t), this._boundingSphere = r.fromOrientedBoundingBox(this._orientedBoundingBox));
  }

  t(g.prototype, {
    boundingVolume: {
      get: function get() {
        return this._orientedBoundingBox;
      }
    },
    boundingSphere: {
      get: function get() {
        return this._boundingSphere;
      }
    }
  });

  var y = new T(),
      b = new T(),
      I = new T(),
      P = new T(),
      H = new T(),
      _ = new T(),
      z = new e(),
      j = new x(T.UNIT_X, 0),
      E = new c();

  var O = new T(),
      U = new T(),
      D = new T(0, -1, 0),
      G = new T(0, 0, -1),
      M = new T();
  return g.prototype.distanceToCamera = function (e) {
    v.defined("frameState", e);
    var t,
        r,
        o,
        n,
        a,
        i,
        s,
        h,
        c,
        m,
        u,
        l,
        g,
        C,
        d,
        p,
        w,
        N = e.camera,
        f = N.positionWC,
        x = N.positionCartographic,
        y = 0;
    return B.contains(this.rectangle, x) || (t = this.southwestCornerCartesian, r = this.northeastCornerCartesian, o = this.westNormal, n = this.southNormal, a = this.eastNormal, i = this.northNormal, e.mode !== S.SCENE3D && ((t = e.mapProjection.project(B.southwest(this.rectangle), O)).z = t.y, t.y = t.x, t.x = 0, (r = e.mapProjection.project(B.northeast(this.rectangle), U)).z = r.y, r.y = r.x, r.x = 0, o = D, a = T.UNIT_Y, n = G, i = T.UNIT_Z), s = T.subtract(f, t, M), h = T.dot(s, o), c = T.dot(s, n), m = T.subtract(f, r, M), u = T.dot(m, a), l = T.dot(m, i), 0 < h ? y += h * h : 0 < u && (y += u * u), 0 < c ? y += c * c : 0 < l && (y += l * l)), (d = e.mode === S.SCENE3D ? (g = x.height, C = this.minimumHeight, this.maximumHeight) : (g = f.x, C = 0)) < g ? y += (p = g - d) * p : g < C && (y += (w = C - g) * w), Math.sqrt(y);
  }, g.prototype.intersectPlane = function (e) {
    return v.defined("plane", e), this._orientedBoundingBox.intersectPlane(e);
  }, g.prototype.createDebugVolume = function (e) {
    v.defined("color", e);
    var t = new s.clone(s.IDENTITY),
        r = new m({
      rectangle: this.rectangle,
      height: this.minimumHeight,
      extrudedHeight: this.maximumHeight
    }),
        o = new i({
      geometry: r,
      id: "outline",
      modelMatrix: t,
      attributes: {
        color: n.fromColor(e)
      }
    });
    return new l({
      geometryInstances: o,
      appearance: new u({
        translucent: !1,
        flat: !0
      }),
      asynchronous: !1
    });
  }, g;
});