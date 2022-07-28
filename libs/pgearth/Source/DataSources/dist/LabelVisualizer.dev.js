"use strict";

define(["../Core/AssociativeArray", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/destroyObject", "../Core/DeveloperError", "../Core/DistanceDisplayCondition", "../Core/NearFarScalar", "../Scene/HeightReference", "../Scene/HorizontalOrigin", "../Scene/LabelStyle", "../Scene/VerticalOrigin", "./BoundingSphereState", "./Property"], function (i, e, h, t, r, _, n, C, o, l, a, s, u, c, d, p) {
  "use strict";

  var O = u.FILL,
      y = t.WHITE,
      D = t.BLACK,
      w = new t(.165, .165, .165, .8),
      v = new e(7, 5),
      V = e.ZERO,
      b = h.ZERO,
      E = a.NONE,
      m = s.CENTER,
      S = c.CENTER,
      B = new h(),
      L = new t(),
      x = new t(),
      R = new t(),
      U = new e(),
      k = new h(),
      q = new e(),
      N = new l(),
      A = new l(),
      T = new l(),
      P = new o();

  function f(e) {
    this.entity = e, this.label = void 0, this.index = void 0;
  }

  function g(e, t) {
    if (!_(e)) throw new C("entityCluster is required.");
    if (!_(t)) throw new C("entityCollection is required.");
    t.collectionChanged.addEventListener(g.prototype._onCollectionChanged, this), this._cluster = e, this._entityCollection = t, this._items = new i(), this._onCollectionChanged(t, t.values, [], []);
  }

  function z(e, t, i) {
    _(e) && (e.label = void 0, i.removeLabel(t));
  }

  return g.prototype.update = function (e) {
    if (!_(e)) throw new C("time is required.");

    for (var t = this._items.values, i = this._cluster, n = 0, r = t.length; n < r; n++) {
      var o,
          l,
          a,
          s,
          u = t[n],
          c = u.entity,
          d = c._label,
          f = u.label,
          g = c.isShowing && c.isAvailable(e) && p.getValueOrDefault(d._show, e, !0);
      g && (l = p.getValueOrUndefined(c._position, e, B), o = p.getValueOrUndefined(d._text, e), g = _(l) && _(o)), g ? (p.isConstant(c._position) || (i._clusterDirty = !0), a = !1, s = p.getValueOrDefault(d._heightReference, e, E), _(f) || ((f = i.getLabel(c)).id = c, u.label = f, a = h.equals(f.position, l) && f.heightReference === s), f.show = !0, f.position = l, f.text = o, f.scale = p.getValueOrDefault(d._scale, e, 1), f.font = p.getValueOrDefault(d._font, e, "30px sans-serif"), f.style = p.getValueOrDefault(d._style, e, O), f.fillColor = p.getValueOrDefault(d._fillColor, e, y, L), f.outlineColor = p.getValueOrDefault(d._outlineColor, e, D, x), f.outlineWidth = p.getValueOrDefault(d._outlineWidth, e, 1), f.showBackground = p.getValueOrDefault(d._showBackground, e, !1), f.backgroundColor = p.getValueOrDefault(d._backgroundColor, e, w, R), f.backgroundPadding = p.getValueOrDefault(d._backgroundPadding, e, v, U), f.pixelOffset = p.getValueOrDefault(d._pixelOffset, e, V, q), f.eyeOffset = p.getValueOrDefault(d._eyeOffset, e, b, k), f.heightReference = s, f.horizontalOrigin = p.getValueOrDefault(d._horizontalOrigin, e, m), f.verticalOrigin = p.getValueOrDefault(d._verticalOrigin, e, S), f.translucencyByDistance = p.getValueOrUndefined(d._translucencyByDistance, e, N), f.pixelOffsetScaleByDistance = p.getValueOrUndefined(d._pixelOffsetScaleByDistance, e, A), f.scaleByDistance = p.getValueOrUndefined(d._scaleByDistance, e, T), f.distanceDisplayCondition = p.getValueOrUndefined(d._distanceDisplayCondition, e, P), f.disableDepthTestDistance = p.getValueOrUndefined(d._disableDepthTestDistance, e), a && f._updateClamping()) : z(u, c, i);
    }

    return !0;
  }, g.prototype.getBoundingSphere = function (e, t) {
    if (!_(e)) throw new C("entity is required.");
    if (!_(t)) throw new C("result is required.");

    var i = this._items.get(e.id);

    if (!_(i) || !_(i.label)) return d.FAILED;
    var n = i.label;
    return t.center = h.clone(r(n._clampedPosition, n.position), t.center), t.radius = 0, d.DONE;
  }, g.prototype.isDestroyed = function () {
    return !1;
  }, g.prototype.destroy = function () {
    this._entityCollection.collectionChanged.removeEventListener(g.prototype._onCollectionChanged, this);

    for (var e = this._entityCollection.values, t = 0; t < e.length; t++) {
      this._cluster.removeLabel(e[t]);
    }

    return n(this);
  }, g.prototype._onCollectionChanged = function (e, t, i, n) {
    for (var r, o = this._items, l = this._cluster, a = t.length - 1; -1 < a; a--) {
      r = t[a], _(r._label) && _(r._position) && o.set(r.id, new f(r));
    }

    for (a = n.length - 1; -1 < a; a--) {
      r = n[a], _(r._label) && _(r._position) ? o.contains(r.id) || o.set(r.id, new f(r)) : (z(o.get(r.id), r, l), o.remove(r.id));
    }

    for (a = i.length - 1; -1 < a; a--) {
      r = i[a], z(o.get(r.id), r, l), o.remove(r.id);
    }
  }, g;
});