"use strict";

define(["../Core/AssociativeArray", "../Core/BoundingRectangle", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Color", "../Core/defined", "../Core/destroyObject", "../Core/DeveloperError", "../Core/DistanceDisplayCondition", "../Core/NearFarScalar", "../Scene/HeightReference", "../Scene/HorizontalOrigin", "../Scene/VerticalOrigin", "./BoundingSphereState", "./Property"], function (i, e, t, r, n, f, o, h, l, a, s, d, u, c, _) {
  "use strict";

  var O = n.WHITE,
      p = r.ZERO,
      y = s.NONE,
      C = t.ZERO,
      D = r.ZERO,
      b = d.CENTER,
      w = u.CENTER,
      v = new r(),
      V = new n(),
      m = new r(),
      E = new t(),
      B = new a(),
      R = new a(),
      S = new a(),
      N = new e(),
      U = new l();

  function g(e) {
    this.entity = e, this.billboard = void 0, this.textureValue = void 0;
  }

  function x(e, t) {
    if (!f(e)) throw new h("entityCluster is required.");
    if (!f(t)) throw new h("entityCollection is required.");
    t.collectionChanged.addEventListener(x.prototype._onCollectionChanged, this), this._cluster = e, this._entityCollection = t, this._items = new i(), this._onCollectionChanged(t, t.values, [], []);
  }

  function I(e, t, i) {
    f(e) && (e.billboard = void 0, i.removeBillboard(t));
  }

  return x.prototype.update = function (e) {
    if (!f(e)) throw new h("time is required.");

    for (var t = this._items.values, i = this._cluster, n = 0, r = t.length; n < r; n++) {
      var o,
          l,
          a,
          s = t[n],
          d = s.entity,
          u = d._billboard,
          c = s.billboard,
          g = d.isShowing && d.isAvailable(e) && _.getValueOrDefault(u._show, e, !0);

      g && (l = _.getValueOrUndefined(d._position, e, v), o = _.getValueOrUndefined(u._image, e), g = f(l) && f(o)), g ? (_.isConstant(d._position) || (i._clusterDirty = !0), f(c) || ((c = i.getBillboard(d)).id = d, c.image = void 0, s.billboard = c), c.show = g, f(c.image) && s.textureValue === o || (c.image = o, s.textureValue = o), c.position = l, c.color = _.getValueOrDefault(u._color, e, O, V), c.eyeOffset = _.getValueOrDefault(u._eyeOffset, e, p, m), c.heightReference = _.getValueOrDefault(u._heightReference, e, y), c.pixelOffset = _.getValueOrDefault(u._pixelOffset, e, C, E), c.scale = _.getValueOrDefault(u._scale, e, 1), c.rotation = _.getValueOrDefault(u._rotation, e, 0), c.alignedAxis = _.getValueOrDefault(u._alignedAxis, e, D), c.horizontalOrigin = _.getValueOrDefault(u._horizontalOrigin, e, b), c.verticalOrigin = _.getValueOrDefault(u._verticalOrigin, e, w), c.width = _.getValueOrUndefined(u._width, e), c.height = _.getValueOrUndefined(u._height, e), c.scaleByDistance = _.getValueOrUndefined(u._scaleByDistance, e, B), c.translucencyByDistance = _.getValueOrUndefined(u._translucencyByDistance, e, R), c.pixelOffsetScaleByDistance = _.getValueOrUndefined(u._pixelOffsetScaleByDistance, e, S), c.sizeInMeters = _.getValueOrDefault(u._sizeInMeters, e, !1), c.distanceDisplayCondition = _.getValueOrUndefined(u._distanceDisplayCondition, e, U), c.disableDepthTestDistance = _.getValueOrUndefined(u._disableDepthTestDistance, e), a = _.getValueOrUndefined(u._imageSubRegion, e, N), f(a) && c.setImageSubRegion(c._imageId, a)) : I(s, d, i);
    }

    return !0;
  }, x.prototype.getBoundingSphere = function (e, t) {
    if (!f(e)) throw new h("entity is required.");
    if (!f(t)) throw new h("result is required.");

    var i = this._items.get(e.id);

    if (!f(i) || !f(i.billboard)) return c.FAILED;
    var n = i.billboard;
    if (n.heightReference === s.NONE) t.center = r.clone(n.position, t.center);else {
      if (!f(n._clampedPosition)) return c.PENDING;
      t.center = r.clone(n._clampedPosition, t.center);
    }
    return t.radius = 0, c.DONE;
  }, x.prototype.isDestroyed = function () {
    return !1;
  }, x.prototype.destroy = function () {
    this._entityCollection.collectionChanged.removeEventListener(x.prototype._onCollectionChanged, this);

    for (var e = this._entityCollection.values, t = 0; t < e.length; t++) {
      this._cluster.removeBillboard(e[t]);
    }

    return o(this);
  }, x.prototype._onCollectionChanged = function (e, t, i, n) {
    for (var r, o = this._items, l = this._cluster, a = t.length - 1; -1 < a; a--) {
      r = t[a], f(r._billboard) && f(r._position) && o.set(r.id, new g(r));
    }

    for (a = n.length - 1; -1 < a; a--) {
      r = n[a], f(r._billboard) && f(r._position) ? o.contains(r.id) || o.set(r.id, new g(r)) : (I(o.get(r.id), r, l), o.remove(r.id));
    }

    for (a = i.length - 1; -1 < a; a--) {
      r = i[a], I(o.get(r.id), r, l), o.remove(r.id);
    }
  }, x;
});