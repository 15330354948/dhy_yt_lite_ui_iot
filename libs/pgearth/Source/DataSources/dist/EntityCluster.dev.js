"use strict";

define(["../Core/BoundingRectangle", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/EllipsoidalOccluder", "../Core/Event", "../Core/Matrix4", "../Scene/Billboard", "../Scene/BillboardCollection", "../Scene/Label", "../Scene/LabelCollection", "../Scene/PointPrimitive", "../Scene/PointPrimitiveCollection", "../Scene/SceneMode", "../ThirdParty/kdbush"], function (Q, U, X, i, $, t, tt, e, it, et, lt, r, ot, d, nt, h, st) {
  "use strict";

  function l(t) {
    t = i(t, i.EMPTY_OBJECT), this._enabled = i(t.enabled, !1), this._pixelRange = i(t.pixelRange, 80), this._minimumClusterSize = i(t.minimumClusterSize, 2), this._clusterBillboards = i(t.clusterBillboards, !0), this._clusterLabels = i(t.clusterLabels, !0), this._clusterPoints = i(t.clusterPoints, !0), this._labelCollection = void 0, this._billboardCollection = void 0, this._pointCollection = void 0, this._clusterBillboardCollection = void 0, this._clusterLabelCollection = void 0, this._clusterPointCollection = void 0, this._collectionIndicesByEntity = {}, this._unusedLabelIndices = [], this._unusedBillboardIndices = [], this._unusedPointIndices = [], this._previousClusters = [], this._previousHeight = void 0, this._enabledDirty = !1, this._clusterDirty = !1, this._cluster = void 0, this._removeEventListener = void 0, this._clusterEvent = new e();
  }

  function ct(t) {
    return t.coord.x;
  }

  function rt(t) {
    return t.coord.y;
  }

  function u(t, i) {
    t.x -= i, t.y -= i, t.width += 2 * i, t.height += 2 * i;
  }

  var a = new Q();

  function dt(t, i, e, l, o) {
    var n, s, c;
    return $(t._labelCollection) && l._clusterLabels ? o = r.getScreenSpaceBoundingBox(t, i, o) : $(t._billboardCollection) && l._clusterBillboards ? o = et.getScreenSpaceBoundingBox(t, i, o) : $(t._pointPrimitiveCollection) && l._clusterPoints && (o = d.getScreenSpaceBoundingBox(t, i, o)), u(o, e), l._clusterLabels && !$(t._labelCollection) && $(t.id) && at(l, t.id) && $(t.id._label) && (n = l._collectionIndicesByEntity[t.id], s = l._labelCollection.get(n), u(c = r.getScreenSpaceBoundingBox(s, i, a), e), o = Q.union(o, c, o)), o;
  }

  function ut(t, i, e, l) {
    var o = {
      billboard: l._clusterBillboardCollection.add(),
      label: l._clusterLabelCollection.add(),
      point: l._clusterPointCollection.add()
    };
    o.billboard.show = !1, o.point.show = !1, o.label.show = !0, o.label.text = i.toLocaleString(), o.label.id = e, o.billboard.position = o.label.position = o.point.position = t, l._clusterEvent.raiseEvent(e, o);
  }

  function at(t, i) {
    return $(t) && $(t._collectionIndicesByEntity[i]) && $(t._collectionIndicesByEntity[i].labelIndex);
  }

  function ht(t, i, e, l, o) {
    if ($(t)) for (var n = t.length, s = 0; s < n; ++s) {
      var c,
          r,
          d,
          u,
          a = t.get(s);
      a.clusterShow = !1, a.show && (o._scene.mode !== h.SCENE3D || l.isPointVisible(a.position)) && (c = o._clusterLabels && $(a._labelCollection), r = o._clusterBillboards && $(a.id._billboard), d = o._clusterPoints && $(a.id._point), c && (d || r) || (u = a.computeScreenSpacePosition(e), $(u) && i.push({
        index: s,
        collection: t,
        clustered: !1,
        coord: u
      })));
    }
  }

  var _t = new Q(),
      bt = new Q(),
      Ct = new Q();

  function o(K) {
    return function (t) {
      if (!($(t) && t < .05) && K.enabled) {
        var i = K._scene,
            e = K._labelCollection,
            l = K._billboardCollection,
            o = K._pointCollection;

        if (($(e) || $(l) || $(o)) && (K._clusterBillboards || K._clusterLabels || K._clusterPoints)) {
          var n = K._clusterLabelCollection,
              s = K._clusterBillboardCollection,
              c = K._clusterPointCollection;
          $(n) ? n.removeAll() : n = K._clusterLabelCollection = new ot({
            scene: i
          }), $(s) ? s.removeAll() : s = K._clusterBillboardCollection = new lt({
            scene: i
          }), $(c) ? c.removeAll() : c = K._clusterPointCollection = new nt();
          var r,
              d,
              u,
              a,
              h = K._pixelRange,
              _ = K._minimumClusterSize,
              b = K._previousClusters,
              C = [],
              p = K._previousHeight,
              v = i.camera.positionCartographic.height,
              y = i.mapProjection.ellipsoid,
              g = i.camera.positionWC,
              m = new tt(y, g),
              B = [];
          K._clusterLabels && ht(e, B, i, m, K), K._clusterBillboards && ht(l, B, i, m, K), K._clusterPoints && ht(o, B, i, m, K);
          var f,
              I,
              x,
              L = st(B, ct, rt, 64, Int32Array);
          if (v < p) for (d = b.length, r = 0; r < d; ++r) {
            var P = b[r];

            if (m.isPointVisible(P.position)) {
              var E = et._computeScreenSpacePosition(it.IDENTITY, P.position, X.ZERO, U.ZERO, i);

              if ($(E)) {
                for (var S, w = 1 - v / p, D = P.width = P.width * w, R = P.height = P.height * w, D = Math.max(D, P.minimumWidth), R = Math.max(R, P.minimumHeight), z = E.x - .5 * D, H = E.y - .5 * R, M = E.x + D, T = E.y + R, A = (S = L.range(z, H, M, T)).length, O = 0, V = [], W = 0; W < A; ++W) {
                  (q = B[S[W]]).clustered || (++O, u = q.collection, a = q.index, V.push(u.get(a).id));
                }

                if (_ <= O) for (ut(P.position, O, V, K), C.push(P), W = 0; W < A; ++W) {
                  B[S[W]].clustered = !0;
                }
              }
            }
          }

          for (d = B.length, r = 0; r < d; ++r) {
            var N = B[r];

            if (!N.clustered) {
              N.clustered = !0, u = N.collection, a = N.index;
              var Y = u.get(a),
                  Z = dt(Y, N.coord, h, K, _t),
                  j = Q.clone(Z, bt);
              A = (S = L.range(Z.x, Z.y, Z.x + Z.width, Z.y + Z.height)).length;
              var k,
                  J,
                  q,
                  F = X.clone(Y.position);

              for (O = 1, V = [Y.id], W = 0; W < A; ++W) {
                (q = B[S[W]]).clustered || (J = dt(k = q.collection.get(q.index), q.coord, h, K, Ct), X.add(k.position, F, F), Q.union(j, J, j), ++O, V.push(k.id));
              }

              if (_ <= O) {
                var G = X.multiplyByScalar(F, 1 / O, F);

                for (ut(G, O, V, K), C.push({
                  position: G,
                  width: j.width,
                  height: j.height,
                  minimumWidth: Z.width,
                  minimumHeight: Z.height
                }), W = 0; W < A; ++W) {
                  B[S[W]].clustered = !0;
                }
              } else I = K, (f = Y).clusterShow = !0, !$(f._labelCollection) && $(f.id) && at(I, f.id) && $(f.id._label) && (x = I._collectionIndicesByEntity[f.id], I._labelCollection.get(x).clusterShow = !0);
            }
          }

          0 === n.length && (n.destroy(), K._clusterLabelCollection = void 0), 0 === s.length && (s.destroy(), K._clusterBillboardCollection = void 0), 0 === c.length && (c.destroy(), K._clusterPointCollection = void 0), K._previousClusters = C, K._previousHeight = v;
        }
      }
    };
  }

  function n(s, c, r, d) {
    return function (t) {
      var i = this[s];
      $(this._collectionIndicesByEntity) || (this._collectionIndicesByEntity = {});
      var e,
          l,
          o = this._collectionIndicesByEntity[t.id];
      if ($(o) || (o = this._collectionIndicesByEntity[t.id] = {
        billboardIndex: void 0,
        labelIndex: void 0,
        pointIndex: void 0
      }), $(i) && $(o[d])) return i.get(o[d]);
      $(i) || (i = this[s] = new c({
        scene: this._scene
      }));
      var n = this[r];
      return 0 < n.length ? (e = n.pop(), l = i.get(e)) : (l = i.add(), e = i.length - 1), o[d] = e, this._clusterDirty = !0, l;
    };
  }

  function s(t, i) {
    var e = t._collectionIndicesByEntity[i];
    $(e.billboardIndex) || $(e.labelIndex) || $(e.pointIndex) || delete t._collectionIndicesByEntity[i];
  }

  function c(t) {
    if ($(t)) for (var i = t.length, e = 0; e < i; ++e) {
      t.get(e).clusterShow = !0;
    }
  }

  return l.prototype._initialize = function (t) {
    this._scene = t;
    var i = o(this);
    this._cluster = i, this._removeEventListener = t.camera.changed.addEventListener(i);
  }, t(l.prototype, {
    enabled: {
      get: function get() {
        return this._enabled;
      },
      set: function set(t) {
        this._enabledDirty = t !== this._enabled, this._enabled = t;
      }
    },
    pixelRange: {
      get: function get() {
        return this._pixelRange;
      },
      set: function set(t) {
        this._clusterDirty = this._clusterDirty || t !== this._pixelRange, this._pixelRange = t;
      }
    },
    minimumClusterSize: {
      get: function get() {
        return this._minimumClusterSize;
      },
      set: function set(t) {
        this._clusterDirty = this._clusterDirty || t !== this._minimumClusterSize, this._minimumClusterSize = t;
      }
    },
    clusterEvent: {
      get: function get() {
        return this._clusterEvent;
      }
    },
    clusterBillboards: {
      get: function get() {
        return this._clusterBillboards;
      },
      set: function set(t) {
        this._clusterDirty = this._clusterDirty || t !== this._clusterBillboards, this._clusterBillboards = t;
      }
    },
    clusterLabels: {
      get: function get() {
        return this._clusterLabels;
      },
      set: function set(t) {
        this._clusterDirty = this._clusterDirty || t !== this._clusterLabels, this._clusterLabels = t;
      }
    },
    clusterPoints: {
      get: function get() {
        return this._clusterPoints;
      },
      set: function set(t) {
        this._clusterDirty = this._clusterDirty || t !== this._clusterPoints, this._clusterPoints = t;
      }
    }
  }), l.prototype.getLabel = n("_labelCollection", ot, "_unusedLabelIndices", "labelIndex"), l.prototype.removeLabel = function (t) {
    var i,
        e,
        l = this._collectionIndicesByEntity && this._collectionIndicesByEntity[t.id];
    $(this._labelCollection) && $(l) && $(l.labelIndex) && (i = l.labelIndex, l.labelIndex = void 0, s(this, t.id), (e = this._labelCollection.get(i)).show = !1, e.text = "", e.id = void 0, this._unusedLabelIndices.push(i), this._clusterDirty = !0);
  }, l.prototype.getBillboard = n("_billboardCollection", lt, "_unusedBillboardIndices", "billboardIndex"), l.prototype.removeBillboard = function (t) {
    var i,
        e,
        l = this._collectionIndicesByEntity && this._collectionIndicesByEntity[t.id];
    $(this._billboardCollection) && $(l) && $(l.billboardIndex) && (i = l.billboardIndex, l.billboardIndex = void 0, s(this, t.id), (e = this._billboardCollection.get(i)).id = void 0, e.show = !1, e.image = void 0, this._unusedBillboardIndices.push(i), this._clusterDirty = !0);
  }, l.prototype.getPoint = n("_pointCollection", nt, "_unusedPointIndices", "pointIndex"), l.prototype.removePoint = function (t) {
    var i,
        e,
        l = this._collectionIndicesByEntity && this._collectionIndicesByEntity[t.id];
    $(this._pointCollection) && $(l) && $(l.pointIndex) && (i = l.pointIndex, l.pointIndex = void 0, s(this, t.id), (e = this._pointCollection.get(i)).show = !1, e.id = void 0, this._unusedPointIndices.push(i), this._clusterDirty = !0);
  }, l.prototype.update = function (t) {
    var i, e;
    $(this._labelCollection) && 0 < this._labelCollection.length && 0 === this._labelCollection.get(0)._glyphs.length && (i = t.commandList, t.commandList = [], this._labelCollection.update(t), t.commandList = i), $(this._billboardCollection) && 0 < this._billboardCollection.length && !$(this._billboardCollection.get(0).width) && (i = t.commandList, t.commandList = [], this._billboardCollection.update(t), t.commandList = i), this._enabledDirty && (this._enabledDirty = !1, (e = this).enabled || ($(e._clusterLabelCollection) && e._clusterLabelCollection.destroy(), $(e._clusterBillboardCollection) && e._clusterBillboardCollection.destroy(), $(e._clusterPointCollection) && e._clusterPointCollection.destroy(), e._clusterLabelCollection = void 0, e._clusterBillboardCollection = void 0, e._clusterPointCollection = void 0, c(e._labelCollection), c(e._billboardCollection), c(e._pointCollection)), this._clusterDirty = !0), this._clusterDirty && (this._clusterDirty = !1, this._cluster()), $(this._clusterLabelCollection) && this._clusterLabelCollection.update(t), $(this._clusterBillboardCollection) && this._clusterBillboardCollection.update(t), $(this._clusterPointCollection) && this._clusterPointCollection.update(t), $(this._labelCollection) && this._labelCollection.update(t), $(this._billboardCollection) && this._billboardCollection.update(t), $(this._pointCollection) && this._pointCollection.update(t);
  }, l.prototype.destroy = function () {
    this._labelCollection = this._labelCollection && this._labelCollection.destroy(), this._billboardCollection = this._billboardCollection && this._billboardCollection.destroy(), this._pointCollection = this._pointCollection && this._pointCollection.destroy(), this._clusterLabelCollection = this._clusterLabelCollection && this._clusterLabelCollection.destroy(), this._clusterBillboardCollection = this._clusterBillboardCollection && this._clusterBillboardCollection.destroy(), this._clusterPointCollection = this._clusterPointCollection && this._clusterPointCollection.destroy(), $(this._removeEventListener) && (this._removeEventListener(), this._removeEventListener = void 0), this._labelCollection = void 0, this._billboardCollection = void 0, this._pointCollection = void 0, this._clusterBillboardCollection = void 0, this._clusterLabelCollection = void 0, this._clusterPointCollection = void 0, this._collectionIndicesByEntity = void 0, this._unusedLabelIndices = [], this._unusedBillboardIndices = [], this._unusedPointIndices = [], this._previousClusters = [], this._previousHeight = void 0, this._enabledDirty = !1, this._pixelRangeDirty = !1, this._minimumClusterSizeDirty = !1;
  }, l;
});