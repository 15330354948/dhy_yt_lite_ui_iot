"use strict";

define(["./buildModuleUrl", "./Color", "./defined", "./DeveloperError", "./Resource", "./writeTextToCanvas"], function (o, l, w, t, g, v) {
  "use strict";

  function e() {
    this._cache = {};
  }

  e.prototype.fromColor = function (e, r) {
    if (!w(e)) throw new t("color is required");
    if (!w(r)) throw new t("size is required");
    return n(void 0, void 0, e, r, this._cache);
  }, e.prototype.fromUrl = function (e, r, i) {
    if (!w(e)) throw new t("url is required");
    if (!w(r)) throw new t("color is required");
    if (!w(i)) throw new t("size is required");
    return n(e, void 0, r, i, this._cache);
  }, e.prototype.fromMakiIconId = function (e, r, i) {
    if (!w(e)) throw new t("id is required");
    if (!w(r)) throw new t("color is required");
    if (!w(i)) throw new t("size is required");
    return n(o("Assets/Textures/maki/" + encodeURIComponent(e) + ".png"), void 0, r, i, this._cache);
  }, e.prototype.fromText = function (e, r, i) {
    if (!w(e)) throw new t("text is required");
    if (!w(r)) throw new t("color is required");
    if (!w(i)) throw new t("size is required");
    return n(void 0, e, r, i, this._cache);
  };
  var C = new l();

  function p(e, r, i) {
    var o = i / 2.5,
        t = o,
        n = o;
    r.width > r.height ? n = o * (r.height / r.width) : r.width < r.height && (t = o * (r.width / r.height));
    var s = Math.round((i - t) / 2),
        a = Math.round(7 / 24 * i - n / 2);
    e.globalCompositeOperation = "destination-out", e.drawImage(r, s - 1, a, t, n), e.drawImage(r, s, a - 1, t, n), e.drawImage(r, s + 1, a, t, n), e.drawImage(r, s, a + 1, t, n), e.globalCompositeOperation = "destination-over", e.fillStyle = l.BLACK.toCssColorString(), e.fillRect(s - 1, a - 1, t + 2, n + 2), e.globalCompositeOperation = "destination-out", e.drawImage(r, s, a, t, n), e.globalCompositeOperation = "destination-over", e.fillStyle = l.WHITE.toCssColorString(), e.fillRect(s - 1, a - 2, t + 2, n + 2);
  }

  var m = new Array(4);

  function n(e, r, i, o, t) {
    m[0] = e, m[1] = r, m[2] = i, m[3] = o;
    var n = JSON.stringify(m),
        s = t[n];
    if (w(s)) return s;
    var a = document.createElement("canvas");
    a.width = o, a.height = o;
    var l,
        d,
        h,
        u,
        f = a.getContext("2d");

    if (d = i, h = o, (l = f).save(), l.scale(h / 24, h / 24), l.fillStyle = d.toCssColorString(), l.strokeStyle = d.brighten(.6, C).toCssColorString(), l.lineWidth = .846, l.beginPath(), l.moveTo(6.72, .422), l.lineTo(17.28, .422), l.bezierCurveTo(18.553, .422, 19.577, 1.758, 19.577, 3.415), l.lineTo(19.577, 10.973), l.bezierCurveTo(19.577, 12.63, 18.553, 13.966, 17.282, 13.966), l.lineTo(14.386, 14.008), l.lineTo(11.826, 23.578), l.lineTo(9.614, 14.008), l.lineTo(6.719, 13.965), l.bezierCurveTo(5.446, 13.983, 4.422, 12.629, 4.422, 10.972), l.lineTo(4.422, 3.416), l.bezierCurveTo(4.423, 1.76, 5.447, .423, 6.718, .423), l.closePath(), l.fill(), l.stroke(), l.restore(), w(e)) {
      var c = g.createIfNeeded(e).fetchImage().then(function (e) {
        return p(f, e, o), t[n] = a;
      });
      return t[n] = c;
    }

    return w(r) && (u = v(r, {
      font: "bold " + o + "px sans-serif"
    }), p(f, u, o)), t[n] = a;
  }

  return e;
});