"use strict";

define(["../../../Core/defined", "../../../Core/Cartographic", "../../../Core/DeveloperError"], function (e, d, c) {
  function a(f) {
    if (!e(f)) {
      throw new c("viewer is required.");
    }

    this.viewer = f;
  }

  a.prototype.getDengLngLat = function (g, m, k) {
    var h,
        q,
        f = 0,
        o = 0;
    var r = [];
    var n = this.viewer.scene.sampleHeight(d.fromDegrees(g.longitude, g.latitude));
    var j = this.viewer.scene.sampleHeight(d.fromDegrees(m.longitude, m.latitude));

    for (var l = 1; l < k + 1; l++) {
      if (g.longitude > m.longitude && g.latitude > m.latitude) {
        h = (g.longitude - m.longitude) / (k + 1);
        f = m.longitude + h * l;
        q = (g.latitude - m.latitude) / (k + 1);
        o = q * l + m.latitude;
      } else {
        if (g.longitude < m.longitude && g.latitude < m.latitude) {
          h = (m.longitude - g.longitude) / (k + 1);
          f = g.longitude + h * l;
          q = (m.latitude - g.latitude) / (k + 1);
          o = g.latitude + q * l;
        } else {
          if (g.longitude > m.longitude && g.latitude < m.latitude) {
            h = (g.longitude - m.longitude) / (k + 1);
            f = m.longitude + h * (k + 1 - l);
            q = (m.latitude - g.latitude) / (k + 1);
            o = g.latitude + q * l;
          } else {
            if (g.longitude < m.longitude && g.latitude > m.latitude) {
              h = (m.longitude - g.longitude) / (k + 1);
              f = g.longitude + h * l;
              q = (g.latitude - m.latitude) / (k + 1);
              o = g.latitude - q * l;
            }
          }
        }
      }

      var p = this.viewer.scene.sampleHeight(d.fromDegrees(f, o));
      r.push([f, o, p]);
    }

    if (g.longitude > m.longitude && g.latitude > m.latitude) {
      r.unshift([m.longitude, m.latitude, j]);
      r.push([g.longitude, g.latitude, n]);
      r.reverse();
    } else {
      if (g.longitude < m.longitude && g.latitude < m.latitude) {
        r.unshift([g.longitude, g.latitude, n]);
        r.push([m.longitude, m.latitude, j]);
      } else {
        if (g.longitude > m.longitude && g.latitude < m.latitude) {
          r.unshift([g.longitude, g.latitude, n]);
          r.push([m.longitude, m.latitude, j]);
        } else {
          if (g.longitude < m.longitude && g.latitude > m.latitude) {
            r.unshift([g.longitude, g.latitude, n]);
            r.push([m.longitude, m.latitude, j]);
          }
        }
      }
    }

    return r;
  };

  a.prototype.getDistance = function (l, g, j, f) {
    var i = g * Math.PI / 180;
    var h = f * Math.PI / 180;
    var m = i - h;
    var k = l * Math.PI / 180 - j * Math.PI / 180;
    var n = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(m / 2), 2) + Math.cos(i) * Math.cos(h) * Math.pow(Math.sin(k / 2), 2)));
    n = n * 6378.137;
    n = Math.round(n * 10000) / 10000;
    return n;
  };

  a.prototype.getAngle = function (f, m) {
    var i = b(f);
    var h = b(m);
    var n = (h.m_RadLo - i.m_RadLo) * i.Ed;
    var l = (h.m_RadLa - i.m_RadLa) * i.Ec;
    var j = 0;
    j = Math.atan(Math.abs(n / l)) * 180 / Math.PI;
    var k = h.m_Longitude - i.m_Longitude;
    var g = h.m_Latitude - i.m_Latitude;

    if (k > 0 && g <= 0) {
      j = 90 - j + 90;
    } else {
      if (k <= 0 && g < 0) {
        j = j + 180;
      } else {
        if (k < 0 && g >= 0) {
          j = 90 - j + 270;
        }
      }
    }

    return j;
  };

  function b(f, n) {
    var g = 6378137,
        p = 6356725,
        q = parseInt(f),
        h = parseInt((f - q) * 60),
        j = (f - q - h / 60) * 3600,
        k = parseInt(n),
        o = parseInt((n - k) * 60),
        s = (n - k - o / 60) * 3600,
        i = f * Math.PI / 180,
        r = n * Math.PI / 180,
        m = p + (g - p) * (90 - n) / 90,
        l = m * Math.cos(r);
    return {
      m_Longitude: f,
      m_Latitude: n,
      m_RadLo: i,
      m_RadLa: r,
      Ec: m,
      Ed: l
    };
  }

  a.isAnticlockwise = function (o) {
    if (!e(o)) {
      throw new c("points is required.");
    } else {
      if (o.length < 3) {
        throw new c("点的数量不能少于3");
      }
    }

    for (var j = 1; j < o.length - 1; j++) {
      var h = o[j - 1].longitude;
      var n = o[j - 1].latitude;
      var g = o[j].longitude;
      var m = o[j].latitude;
      var f = o[j + 1].longitude;
      var l = o[j + 1].latitude;
      var k = (g - h) * (l - m) - (m - n) * (f - g) === 0 ? undefined : (g - h) * (l - m) - (m - n) * (f - g) > 0;
      return k;
    }
  };

  return a;
});