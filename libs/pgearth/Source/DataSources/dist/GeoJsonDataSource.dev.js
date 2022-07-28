"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

define(["../Core/ArcType", "../Core/Cartesian3", "../Core/Color", "../Core/createGuid", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/getFilenameFromUri", "../Core/PinBuilder", "../Core/PolygonHierarchy", "../Core/Resource", "../Core/RuntimeError", "../Scene/HeightReference", "../Scene/VerticalOrigin", "../ThirdParty/topojson", "../ThirdParty/when", "./BillboardGraphics", "./CallbackProperty", "./ColorMaterialProperty", "./ConstantPositionProperty", "./ConstantProperty", "./DataSource", "./EntityCluster", "./EntityCollection", "./PolygonGraphics", "./PolylineGraphics"], function (v, t, k, y, d, _, e, i, r, u, n, P, l, f, g, m, a, w, C, s, b, S, E, p, o, c, T, G) {
  "use strict";

  function h(e) {
    return t.fromDegrees(e[0], e[1], e[2]);
  }

  var M,
      L = {
    "urn:ogc:def:crs:OGC:1.3:CRS84": h,
    "EPSG:4326": h,
    "urn:ogc:def:crs:EPSG::4326": h
  },
      O = {},
      U = {},
      B = 48,
      R = k.ROYALBLUE,
      j = k.YELLOW,
      A = 2,
      W = k.fromBytes(255, 255, 0, 100),
      z = !1,
      H = {
    small: 24,
    medium: 48,
    large: 64
  },
      N = ["title", "description", "marker-size", "marker-symbol", "marker-color", "stroke", "stroke-opacity", "stroke-width", "fill", "fill-opacity"];

  function F(e, t) {
    var r = "";

    for (var n in e) {
      if (e.hasOwnProperty(n)) {
        if (n === t || -1 !== N.indexOf(n)) continue;
        var o = e[n];
        _(o) && (r += "object" == _typeof(o) ? "<tr><th>" + n + "</th><td>" + F(o) + "</td></tr>" : "<tr><th>" + n + "</th><td>" + o + "</td></tr>");
      }
    }

    return 0 < r.length && (r = '<table class="pgEarth-infoBox-defaultTable"><tbody>' + r + "</tbody></table>"), r;
  }

  function D(e, t) {
    return new s((r = F, n = e, o = t, function (e, t) {
      return _(i) || (i = r(n, o)), i;
    }), !0);
    var r, n, o, i;
  }

  function I(e, t, r) {
    var n = e.id;

    if (_(n) && "Feature" === e.type) {
      for (var o = 2, i = n; _(t.getById(i));) {
        i = n + "_" + o, o++;
      }

      n = i;
    } else n = y();

    var l = t.getOrCreateEntity(n),
        a = e.properties;

    if (_(a)) {
      var s,
          c = (l.properties = a).title;
      if (_(c)) l.name = c, s = "title";else {
        var u = Number.MAX_VALUE;

        for (var f in a) {
          if (a.hasOwnProperty(f) && a[f]) {
            var p = f.toLowerCase();

            if (1 < u && "title" === p) {
              u = 1, s = f;
              break;
            }

            2 < u && "name" === p ? (u = 2, s = f) : 3 < u && /title/i.test(f) ? (u = 3, s = f) : 4 < u && /name/i.test(f) && (u = 4, s = f);
          }
        }

        _(s) && (l.name = a[s]);
      }
      var h = a.description;
      null !== h && (l.description = _(h) ? new E(h) : r(a, s));
    }

    return l;
  }

  function J(e, t) {
    for (var r = new Array(e.length), n = 0; n < e.length; n++) {
      r[n] = t(e[n]);
    }

    return r;
  }

  var x = {
    Feature: Y,
    FeatureCollection: function FeatureCollection(e, t, r, n, o) {
      for (var i = t.features, l = 0, a = i.length; l < a; l++) {
        Y(e, i[l], 0, n, o);
      }
    },
    GeometryCollection: q,
    LineString: $,
    MultiLineString: ee,
    MultiPoint: Q,
    MultiPolygon: ne,
    Point: K,
    Polygon: re,
    Topology: oe
  },
      V = {
    GeometryCollection: q,
    LineString: $,
    MultiLineString: ee,
    MultiPoint: Q,
    MultiPolygon: ne,
    Point: K,
    Polygon: re,
    Topology: oe
  };

  function Y(e, t, r, n, o) {
    if (null !== t.geometry) {
      if (!_(t.geometry)) throw new f("feature.geometry is required.");
      var i = t.geometry.type,
          l = V[i];
      if (!_(l)) throw new f("Unknown geometry type: " + i);
      l(e, t, t.geometry, n, o);
    } else I(t, e._entityCollection, o.describe);
  }

  function q(e, t, r, n, o) {
    for (var i = r.geometries, l = 0, a = i.length; l < a; l++) {
      var s = i[l],
          c = s.type,
          u = V[c];
      if (!_(u)) throw new f("Unknown geometry type: " + c);
      u(e, t, s, n, o);
    }
  }

  function X(e, t, r, n, o) {
    var i,
        l,
        a,
        s = o.markerSymbol,
        c = o.markerColor,
        u = o.markerSize,
        f = t.properties;
    _(f) && (i = f["marker-color"], _(i) && (c = k.fromCssColorString(i)), u = d(H[f["marker-size"]], u), l = f["marker-symbol"], _(l) && (s = l)), a = _(s) ? 1 === s.length ? e._pinBuilder.fromText(s.toUpperCase(), c, u) : e._pinBuilder.fromMakiIconId(s, c, u) : e._pinBuilder.fromColor(c, u);
    var p = new C();
    p.verticalOrigin = new E(m.BOTTOM), 2 === n.length && o.clampToGround && (p.heightReference = g.CLAMP_TO_GROUND);
    var h = I(t, e._entityCollection, o.describe);
    h.billboard = p, h.position = new S(r(n));
    var y = w(a).then(function (e) {
      p.image = new E(e);
    }).otherwise(function () {
      p.image = new E(e._pinBuilder.fromColor(c, u));
    });

    e._promises.push(y);
  }

  function K(e, t, r, n, o) {
    X(e, t, n, r.coordinates, o);
  }

  function Q(e, t, r, n, o) {
    for (var i = r.coordinates, l = 0; l < i.length; l++) {
      X(e, t, n, i[l], o);
    }
  }

  function Z(e, t, r, n, o) {
    var i,
        l,
        a,
        s,
        c = o.strokeMaterialProperty,
        u = o.strokeWidthProperty,
        f = t.properties;
    _(f) && (i = f["stroke-width"], _(i) && (u = new E(i)), a = f.stroke, _(a) && (l = k.fromCssColorString(a)), s = f["stroke-opacity"], _(s) && 1 !== s && (_(l) || (l = c.color.clone()), l.alpha = s), _(l) && (c = new b(l)));
    var p = I(t, e._entityCollection, o.describe),
        h = new G();
    (p.polyline = h).clampToGround = o.clampToGround, h.material = c, h.width = u, h.positions = new E(J(n, r)), h.arcType = v.RHUMB;
  }

  function $(e, t, r, n, o) {
    Z(e, t, n, r.coordinates, o);
  }

  function ee(e, t, r, n, o) {
    for (var i = r.coordinates, l = 0; l < i.length; l++) {
      Z(e, t, n, i[l], o);
    }
  }

  function te(e, t, r, n, o) {
    if (0 !== n.length && 0 !== n[0].length) {
      var i,
          l,
          a,
          s,
          c,
          u,
          f = o.strokeMaterialProperty.color,
          p = o.fillMaterialProperty,
          h = o.strokeWidthProperty,
          y = t.properties;
      _(y) && (i = y["stroke-width"], _(i) && (h = new E(i)), a = y.stroke, _(a) && (l = k.fromCssColorString(a)), s = y["stroke-opacity"], _(s) && 1 !== s && (_(l) || (l = o.strokeMaterialProperty.color.clone()), l.alpha = s), _(l) && (f = new E(l)), u = y.fill, _(u) && ((c = k.fromCssColorString(u)).alpha = p.color.alpha), s = y["fill-opacity"], _(s) && s !== p.color.alpha && (_(c) || (c = p.color.clone()), c.alpha = s), _(c) && (p = new b(c)));
      var d = new T();
      d.outline = new E(!0), d.outlineColor = f, d.outlineWidth = h, d.material = p, d.arcType = v.RHUMB;

      for (var g = [], m = 1, w = n.length; m < w; m++) {
        g.push(new P(J(n[m], r)));
      }

      var C = n[0];
      d.hierarchy = new E(new P(J(C, r), g)), 2 < C[0].length ? d.perPositionHeight = new E(!0) : o.clampToGround || (d.height = 0), I(t, e._entityCollection, o.describe).polygon = d;
    }
  }

  function re(e, t, r, n, o) {
    te(e, t, n, r.coordinates, o);
  }

  function ne(e, t, r, n, o) {
    for (var i = r.coordinates, l = 0; l < i.length; l++) {
      te(e, t, n, i[l], o);
    }
  }

  function oe(e, t, r, n, o) {
    for (var i in r.objects) {
      var l;
      r.objects.hasOwnProperty(i) && (l = a.feature(r, r.objects[i]), (0, x[l.type])(e, l, l, n, o));
    }
  }

  function ie(e) {
    this._name = e, this._changed = new r(), this._error = new r(), this._isLoading = !1, this._loading = new r(), this._entityCollection = new c(this), this._promises = [], this._pinBuilder = new n(), this._entityCluster = new o();
  }

  return ie.load = function (e, t) {
    return new ie().load(e, t);
  }, e(ie, {
    markerSize: {
      get: function get() {
        return B;
      },
      set: function set(e) {
        B = e;
      }
    },
    markerSymbol: {
      get: function get() {
        return M;
      },
      set: function set(e) {
        M = e;
      }
    },
    markerColor: {
      get: function get() {
        return R;
      },
      set: function set(e) {
        R = e;
      }
    },
    stroke: {
      get: function get() {
        return j;
      },
      set: function set(e) {
        j = e;
      }
    },
    strokeWidth: {
      get: function get() {
        return A;
      },
      set: function set(e) {
        A = e;
      }
    },
    fill: {
      get: function get() {
        return W;
      },
      set: function set(e) {
        W = e;
      }
    },
    clampToGround: {
      get: function get() {
        return z;
      },
      set: function set(e) {
        z = e;
      }
    },
    crsNames: {
      get: function get() {
        return L;
      }
    },
    crsLinkHrefs: {
      get: function get() {
        return O;
      }
    },
    crsLinkTypes: {
      get: function get() {
        return U;
      }
    }
  }), e(ie.prototype, {
    name: {
      get: function get() {
        return this._name;
      },
      set: function set(e) {
        this._name !== e && (this._name = e, this._changed.raiseEvent(this));
      }
    },
    clock: {
      value: void 0,
      writable: !1
    },
    entities: {
      get: function get() {
        return this._entityCollection;
      }
    },
    isLoading: {
      get: function get() {
        return this._isLoading;
      }
    },
    changedEvent: {
      get: function get() {
        return this._changed;
      }
    },
    errorEvent: {
      get: function get() {
        return this._error;
      }
    },
    loadingEvent: {
      get: function get() {
        return this._loading;
      }
    },
    show: {
      get: function get() {
        return this._entityCollection.show;
      },
      set: function set(e) {
        this._entityCollection.show = e;
      }
    },
    clustering: {
      get: function get() {
        return this._entityCluster;
      },
      set: function set(e) {
        if (!_(e)) throw new i("value must be defined.");
        this._entityCluster = e;
      }
    }
  }), ie.prototype.load = function (e, t) {
    if (!_(e)) throw new i("data is required.");
    p.setLoading(this, !0);
    var r = e,
        n = (t = d(t, d.EMPTY_OBJECT)).sourceUri;
    ("string" == typeof e || e instanceof l) && (r = (e = l.createIfNeeded(e)).fetchJson(), n = d(n, e.getUrlComponent())), t = {
      describe: d(t.describe, D),
      markerSize: d(t.markerSize, B),
      markerSymbol: d(t.markerSymbol, M),
      markerColor: d(t.markerColor, R),
      strokeWidthProperty: new E(d(t.strokeWidth, A)),
      strokeMaterialProperty: new b(d(t.stroke, j)),
      fillMaterialProperty: new b(d(t.fill, W)),
      clampToGround: d(t.clampToGround, z)
    };
    var o = this;
    return w(r, function (e) {
      return function (t, r, n, e) {
        var o;
        _(e) && (o = u(e));
        _(o) && t._name !== o && (t._name = o, t._changed.raiseEvent(t));
        var i = x[r.type];
        if (!_(i)) throw new f("Unsupported GeoJSON object type: " + r.type);
        var l = r.crs,
            a = null !== l ? h : null;

        if (_(l)) {
          if (!_(l.properties)) throw new f("crs.properties is undefined.");
          var s = l.properties;

          if ("name" === l.type) {
            if (a = L[s.name], !_(a)) throw new f("Unknown crs name: " + s.name);
          } else if ("link" === l.type) {
            var c = O[s.href];
            if (_(c) || (c = U[s.type]), !_(c)) throw new f("Unable to resolve crs link: " + JSON.stringify(s));
            a = c(s);
          } else {
            if ("EPSG" !== l.type) throw new f("Unknown crs type: " + l.type);
            if (a = L["EPSG:" + s.code], !_(a)) throw new f("Unknown crs EPSG code: " + s.code);
          }
        }

        return w(a, function (e) {
          return t._entityCollection.removeAll(), null !== e && i(t, r, r, e, n), w.all(t._promises, function () {
            return t._promises.length = 0, p.setLoading(t, !1), t;
          });
        });
      }(o, e, t, n);
    }).otherwise(function (e) {
      return p.setLoading(o, !1), o._error.raiseEvent(o, e), console.log(e), w.reject(e);
    });
  }, ie;
});