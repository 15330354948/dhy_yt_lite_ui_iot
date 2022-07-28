"use strict";

define(["../../Source/Core/buildModuleUrl", "../../Source/Core/Color", "../../Source/Core/defined", "../../Source/Core/DeveloperError", "../../Source/Core/Resource", "../../Source/Core/writeTextToCanvas"], function (e, t, r, o, n, i) {
  "use strict";

  function a(e) {
    this._cache = {};
  }

  a.prototype.fromUrl = function (e, t) {
    if (!r(e)) throw new o("url is required");
    if (!r(t)) throw new o("size is required");
    return l(e, void 0, t, this._cache);
  }, a.prototype.fromText = function (e, t, n, i) {
    if (!r(e)) throw new o("text is required");
    if (!r(t)) throw new o("size is required");
    return l(void 0, e, t, this._cache, n, i);
  };
  new t();
  var h = new Array(4);

  function l(e, t, o, i, a, l) {
    h[0] = e, h[1] = t, h[2] = o;
    var u = JSON.stringify(h),
        d = i[u];
    if (r(d)) return d;
    var f = document.createElement("canvas");
    f.width = o, f.height = o;
    var c = f.getContext("2d");

    if (r(e)) {
      !function (e, t) {
        e.strokeStyle = "#fff";
        var r = t / 2,
            o = Math.round(5 * t / 6);
        e.beginPath(), e.moveTo(r, o), e.arc(r, o, 3 * t / 20, 0, 2 * Math.PI, !1), e.fillStyle = "rgba(3, 252, 249,0.2)", e.fill(), e.beginPath(), e.arc(r, o, t / 12, 0, 2 * Math.PI, !1), e.fillStyle = "rgb(3, 252, 249)", e.lineWidth = Math.round(t / 75), e.fill(), e.stroke(), e.beginPath(), e.moveTo(Math.round(9 * t / 20), Math.round(7 * t / 12)), e.lineTo(Math.round(11 * t / 20), Math.round(7 * t / 12)), e.lineTo(Math.round(t / 2), Math.round(19 * t / 30)), e.closePath(), e.fillStyle = "#fff", e.fill(), e.beginPath();
        var n = Math.round(t / 2),
            i = Math.round(t / 3);
        e.arc(n, i, Math.round(4 * t / 15), 0, 2 * Math.PI, !1), e.clip(), e.lineWidth = Math.round(t / 30), e.stroke();
      }(c, o);
      var M = new n.createIfNeeded(e).fetchImage({
        preferBlob: !0
      }).then(function (e) {
        return console.log(e), function (e, t, r) {
          var o,
              n,
              i = Math.round(4 * r / 15);
          t.width > t.height ? (o = 2 * i, n = t.width / t.height * o) : (n = 2 * i, o = t.height / t.width * n);
          var a = Math.round(r / 2),
              h = Math.round(r / 3),
              l = Math.round(a - n / 2),
              u = Math.round(h - o / 2);
          e.drawImage(t, l, u, n, o);
        }(c, e, o), i[u] = f, f;
      });
      return i[u] = M, M;
    }

    return r(t) && (console.log(arguments), l ? function (e, t, r, o) {
      r /= 2, e.fillStyle = o || "red", e.arc(r, r, r, 0, 2 * Math.PI, !1), e.fill(), e.fillStyle = "#fff", e.font = r + "px Microsoft Yahei", e.textAlign = "center", e.textBaseline = "middle", e.fillText(t, r, r);
    }(c, t, o, a) : function (e, t, r) {
      e.strokeStyle = "red", e.lineWidth = Math.round(r / 75), e.moveTo(Math.round(r / 2), Math.round(.9 * r)), e.lineTo(Math.round(r / 2), Math.round(.1 * r)), e.stroke(), e.lineTo(Math.round(r), Math.round(.4 * r)), e.lineTo(Math.round(r / 2), Math.round(.4 * r)), e.fillStyle = "red", e.fill(), e.fillStyle = "#fff", e.font = r / 10 + "px serif", e.fillText(t, Math.round(.54 * r), Math.round(.33 * r));
    }(c, t, o)), i[u] = f, f;
  }

  return a;
});