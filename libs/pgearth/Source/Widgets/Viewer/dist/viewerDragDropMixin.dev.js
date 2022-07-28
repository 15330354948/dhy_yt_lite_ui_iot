"use strict";

define(["../../Core/defaultValue", "../../Core/defined", "../../Core/defineProperties", "../../Core/DeveloperError", "../../Core/Event", "../../Core/wrapFunction", "../../DataSources/CzmlDataSource", "../../DataSources/GeoJsonDataSource", "../../DataSources/KmlDataSource", "../getElement"], function (c, f, l, p, v, E, y, g, m, w) {
  "use strict";

  function h(e) {
    e.stopPropagation(), e.preventDefault();
  }

  function D(e, r) {
    var n = e;
    f(n) && (n.removeEventListener("drop", r, !1), n.removeEventListener("dragenter", h, !1), n.removeEventListener("dragover", h, !1), n.removeEventListener("dragexit", h, !1));
  }

  function T(e, r) {
    e.addEventListener("drop", r, !1), e.addEventListener("dragenter", h, !1), e.addEventListener("dragover", h, !1), e.addEventListener("dragexit", h, !1);
  }

  return function (i, e) {
    if (!f(i)) throw new p("viewer is required.");
    if (i.hasOwnProperty("dropTarget")) throw new p("dropTarget is already defined by another mixin.");
    if (i.hasOwnProperty("dropEnabled")) throw new p("dropEnabled is already defined by another mixin.");
    if (i.hasOwnProperty("dropError")) throw new p("dropError is already defined by another mixin.");
    if (i.hasOwnProperty("clearOnDrop")) throw new p("clearOnDrop is already defined by another mixin.");
    if (i.hasOwnProperty("flyToOnDrop")) throw new p("flyToOnDrop is already defined by another mixin.");
    e = c(e, c.EMPTY_OBJECT);
    var r = !0,
        n = c(e.flyToOnDrop, !0),
        o = new v(),
        d = c(e.clearOnDrop, !0),
        t = c(e.dropTarget, i.container),
        s = c(e.clampToGround, !0),
        u = e.proxy;

    function a(e) {
      h(e), d && (i.entities.removeAll(), i.dataSources.removeAll());

      for (var r = e.dataTransfer.files, n = r.length, o = 0; o < n; o++) {
        var t = r[o],
            a = new FileReader();
        a.onload = function (o, t, a, i) {
          var d = o.scene;
          return function (e) {
            var r,
                n = t.name;

            try {
              if (/\.czml$/i.test(n)) r = y.load(JSON.parse(e.target.result), {
                sourceUri: n
              });else if (/\.geojson$/i.test(n) || /\.json$/i.test(n) || /\.topojson$/i.test(n)) r = g.load(JSON.parse(e.target.result), {
                sourceUri: n,
                clampToGround: i
              });else {
                if (!/\.(kml|kmz)$/i.test(n)) return void o.dropError.raiseEvent(o, n, "Unrecognized file: " + n);
                r = m.load(t, {
                  sourceUri: n,
                  proxy: a,
                  camera: d.camera,
                  canvas: d.canvas,
                  clampToGround: i
                });
              }
              f(r) && o.dataSources.add(r).then(function (e) {
                o.flyToOnDrop && o.flyTo(e);
              }).otherwise(function (e) {
                o.dropError.raiseEvent(o, n, e);
              });
            } catch (e) {
              o.dropError.raiseEvent(o, n, e);
            }
          };
        }(i, t, u, s), a.onerror = function (r, n) {
          return function (e) {
            r.dropError.raiseEvent(r, n.name, e.target.error);
          };
        }(i, t), a.readAsText(t);
      }
    }

    t = w(t), l(i, {
      dropTarget: {
        get: function get() {
          return t;
        },
        set: function set(e) {
          if (!f(e)) throw new p("value is required.");
          D(t, a), T(t = e, a);
        }
      },
      dropEnabled: {
        get: function get() {
          return r;
        },
        set: function set(e) {
          e !== r && ((e ? T : D)(t, a), r = e);
        }
      },
      dropError: {
        get: function get() {
          return o;
        }
      },
      clearOnDrop: {
        get: function get() {
          return d;
        },
        set: function set(e) {
          d = e;
        }
      },
      flyToOnDrop: {
        get: function get() {
          return n;
        },
        set: function set(e) {
          n = e;
        }
      },
      proxy: {
        get: function get() {
          return u;
        },
        set: function set(e) {
          u = e;
        }
      },
      clampToGround: {
        get: function get() {
          return s;
        },
        set: function set(e) {
          s = e;
        }
      }
    }), T(t, a), i.destroy = E(i, i.destroy, function () {
      i.dropEnabled = !1;
    }), i._handleDrop = a;
  };
});