"use strict";

define(["../../../Source/Scene/SceneMode", "../../../Source/DataSources/GeoJsonDataSource", "../../../Source/Core/Color", "../../../Source/Core/Cartesian3", "../../../Source/DataSources/PolylineOutlineMaterialProperty", "../../../Source/Core/defined", "../../../Source/Core/DeveloperError", "../../../Source/Core/JulianDate", "../../_Color"], function (e, t, o, n, r, i, a, l, s) {
  function c(e) {
    var t,
        c,
        h = document.createElement("canvas"),
        d = h.getContext("2d");
    h.height = 4, h.width = 4, d.fillStyle = e.pointStyle.color, d.arc(2, 2, 2, 0, 2 * Math.PI, !1), d.fill(), c = h.toDataURL(), this.entityCollection = t = e.viewer.entities.add({}), e.viewer.clockViewModel.shouldAnimate = !0;

    var p = function (e, t, o, n) {
      if (e && e instanceof Array && t && t instanceof Array) {
        var r = [],
            i = [];
        return t.map(function (t) {
          for (var a = {
            lng: t[0],
            lat: t[1]
          }, l = {
            lng: e[0],
            lat: e[1]
          }, s = function (e, t) {
            t = t || {};

            for (var o = [], n = 0; n < e.length - 1; n++) {
              var r = u(e[n], e[n + 1], t.count);
              r && r.length > 0 && (o = o.concat(r));
            }

            return o;
          }([l, a]), c = [], h = 0, d = s.length; h < s.length; h++, d--) {
            r.push({
              geometry: {
                type: "Point",
                coordinates: s[h]
              },
              time: o && d || h
            }), c.push(s[h][0]), c.push(s[h][1]), c.push(n);
          }

          i.push({
            geometry: {
              type: "LineString",
              coordinates: c
            }
          });
        }), {
          point: r,
          line: i
        };
      }
    }(e.center, e.points, e.direction, e.height),
        f = p.line,
        g = p.point,
        y = [],
        v = e.lineStyle,
        S = new o(32 / 255, 228 / 255, 243 / 255, .8),
        m = 1,
        w = new o(65 / 255, 105 / 255, 225 / 255, .8);

    v && (v.color && (S = s(v.color)), v.size && (m = v.size));

    for (var C = 0; C < f.length; ++C) {
      y[C] = e.viewer.entities.add({
        parent: t,
        polyline: {
          positions: n.fromDegreesArrayHeights(f[C].geometry.coordinates),
          width: m,
          material: new r({
            color: S,
            outlineWidth: .1,
            outlineColor: w
          }),
          depthFailMaterial: new r({
            color: S,
            outlineWidth: .1,
            outlineColor: w
          })
        }
      });
    }

    var D = new o(243 / 255, 242 / 255, 249 / 255, .8),
        P = 8;
    e.endPointStyle && e.endPointStyle.color && (D = s(e.endPointStyle.color)), e.endPointStyle && e.endPointStyle.size && (P = e.endPointStyle.size);
    var M = [];

    for (C = 0; C < e.points.length; ++C) {
      M[C] = e.viewer.entities.add({
        parent: t,
        position: n.fromDegrees(e.points[C][0], e.points[C][1], e.height),
        point: {
          color: D,
          pixelSize: P
        }
      });
    }

    var z = {
      start: 0,
      end: 50
    },
        F = 85,
        A = z.end - z.start,
        I = function I(e) {
      if (!i(e)) throw new a("time is required.");
      var t = l.toDate(e).getTime() / F % A + z.start,
          o = o || 10;
      return !!(t && this.nameID > t - o && this.nameID < t);
    },
        b = [],
        x = e.pointStyle,
        E = D,
        J = 5;

    x && (x.color && (E = s(x.color)), x.size && (J = x.size));

    for (C = 0; C < g.length; ++C) {
      var L = g[C].geometry.coordinates[0],
          W = g[C].geometry.coordinates[1];
      b[C] = e.viewer.entities.add({
        parent: t,
        position: n.fromDegrees(L, W, e.height),
        nameID: g[C].time,
        billboard: {
          image: c,
          width: J,
          height: J,
          color: E
        }
      }), b[C].isAvailable = I;
    }

    var k = e.centerPointStyle,
        q = new o(192 / 255, 16 / 255, 26 / 255, .8),
        G = 24;
    k && (k.color && (q = s(k.color)), k.size && (G = k.size)), M[C] = e.viewer.entities.add({
      parent: t,
      position: n.fromDegrees(e.center[0], e.center[1], e.height),
      point: {
        show: !0,
        color: q,
        pixelSize: G
      }
    });
  }

  function u(e, t, o) {
    if (!e || !t) return null;

    var n,
        r,
        i,
        a,
        l,
        s,
        c = function c(e) {
      return 1 - 2 * e + e * e;
    },
        u = function u(e) {
      return 2 * e - 2 * e * e;
    },
        h = function h(e) {
      return e * e;
    },
        d = [],
        p = (o = o || 40, 0),
        f = 0;

    if (void 0 !== t) {
      var g = parseFloat(e.lat),
          y = parseFloat(t.lat),
          v = parseFloat(e.lng),
          S = parseFloat(t.lng);

      for (S > v && parseFloat(S - v) > 180 && v < 0 && (v = parseFloat(360 + v)), v > S && parseFloat(v - S) > 180 && S < 0 && (S = parseFloat(360 + S)), 0, s = 0, y == g ? (n = 0, r = v - S) : S == v ? (n = Math.PI / 2, r = g - y) : (n = Math.atan((y - g) / (S - v)), r = (y - g) / Math.sin(n)), 0 == s && (s = n + Math.PI / 5), l = (i = r / 2) * Math.cos(s) + v, a = i * Math.sin(s) + g, p = 0; p < o + 1; p++) {
        d.push([v * c(f) + l * u(f) + S * h(f), g * c(f) + a * u(f) + y * h(f)]), f += 1 / o;
      }

      return d;
    }

    void 0 !== d && (d = []);
  }

  return c.prototype.destroy = function (e) {
    this.entityCollection.entityCollection.removeAll(), e.entities.remove(this.entityCollection);
  }, c;
});