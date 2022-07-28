"use strict";

define(["../../Source/Core/buildModuleUrl", "../../Source/Core/Color", "../../Source/Core/defined", "../../Source/Core/DeveloperError", "../../Source/Core/Resource", "../../Source/Core/writeTextToCanvas"], function (e, r, t, o, i, n) {
  "use strict";

  function a() {
    this._cache = {};
  }

  a.prototype.fromColor = function (e, r) {
    if (!t(e)) throw new o("color is required");
    if (!t(r)) throw new o("size is required");
    return d(void 0, void 0, e, r, this._cache);
  }, a.prototype.fromUrl = function (e, r, i) {
    if (!t(e)) throw new o("url is required");
    if (!t(r)) throw new o("color is required");
    if (!t(i)) throw new o("size is required");
    return d(e, void 0, r, i, this._cache);
  }, a.prototype.fromMakiIconId = function (r, i, n) {
    if (!t(r)) throw new o("id is required");
    if (!t(i)) throw new o("color is required");
    if (!t(n)) throw new o("size is required");
    return d(e("Assets/Textures/maki/" + encodeURIComponent(r) + ".png"), void 0, i, n, this._cache);
  }, a.prototype.fromText = function (e, r, i) {
    if (!t(e)) throw new o("text is required");
    if (!t(r)) throw new o("color is required");
    if (!t(i)) throw new o("size is required");
    return d(void 0, e, r, i, this._cache);
  };
  var s = new r();

  function u(e, t, o) {
    var i = o / 2,
        n = i,
        a = i;
    t.width > t.height ? a = i * (t.height / t.width) : t.width < t.height && (n = i * (t.width / t.height)), a += 5;
    var s = Math.round((o - n) / 2),
        u = Math.round(7 / 24 * o - a / 2) + 10;
    e.globalCompositeOperation = "destination-out", e.drawImage(t, s - 1, u, n, a), e.drawImage(t, s, u - 1, n, a), e.drawImage(t, s + 1, u, n, a), e.drawImage(t, s, u + 1, n, a), e.globalCompositeOperation = "destination-over", e.fillStyle = r.BLACK.toCssColorString(), e.fillRect(s - 1, u - 1, n + 2, a + 2), e.globalCompositeOperation = "destination-out", e.drawImage(t, s, u, n, a), e.globalCompositeOperation = "destination-over", e.fillStyle = r.WHITE.toCssColorString(), e.fillRect(s - 1, u - 2, n + 2, a + 2);
  }

  var h = new Array(4);

  function d(e, r, o, a, d) {
    h[0] = e, h[1] = r, h[2] = o, h[3] = a;
    var c = JSON.stringify(h),
        l = d[c];
    if (t(l)) return l;
    var f = document.createElement("canvas");
    f.width = a, f.height = a;
    var w = f.getContext("2d");

    if (function (e, r, t) {
      e.save(), e.fillStyle = r.toCssColorString(), e.strokeStyle = r.brighten(.6, s).toCssColorString();
      var o = e.canvas,
          i = o.width,
          n = o.height,
          a = Math.min(i, n);
      e.arc(i / 2, n / 2, a / 2, 0, 2 * Math.PI, !1), e.fill(), e.restore();
    }(w, o), t(e)) {
      var g = i.createIfNeeded(e).fetchImage().then(function (e) {
        return u(w, e, a), d[c] = f, f;
      });
      return d[c] = g, g;
    }

    if (t(r)) {
      var C = n(r, {
        font: a + "px Arial"
      });
      u(w, C, a);
    }

    return d[c] = f, f;
  }

  return a;
});