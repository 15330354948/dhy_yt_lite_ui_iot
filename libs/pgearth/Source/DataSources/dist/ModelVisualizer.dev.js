"use strict";

define(["../Core/AssociativeArray", "../Core/BoundingSphere", "../Core/Cartesian2", "../Core/Color", "../Core/defined", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Matrix4", "../Core/Resource", "../Scene/ColorBlendMode", "../Scene/HeightReference", "../Scene/Model", "../Scene/ModelAnimationLoop", "../Scene/ShadowMode", "./BoundingSphereState", "./Property"], function (t, r, e, i, O, n, V, w, S, o, l, A, M, a, s, E) {
  "use strict";

  var x = a.ENABLED,
      P = l.NONE,
      T = i.RED,
      N = i.WHITE,
      B = o.HIGHLIGHT,
      L = new e(1, 1),
      R = new w(),
      H = new w();

  function d(e, i) {
    if (!O(e)) throw new V("scene is required.");
    if (!O(i)) throw new V("entityCollection is required.");
    i.collectionChanged.addEventListener(d.prototype._onCollectionChanged, this), this._scene = e, this._primitives = e.primitives, this._entityCollection = i, this._modelHash = {}, this._entitiesToVisualize = new t(), this._onCollectionChanged(i, i.values, [], []);
  }

  function u(e, i, t, o) {
    var r = t[i.id];
    O(r) && (o.removeAndDestroy(r.modelPrimitive), delete t[i.id]);
  }

  return d.prototype.update = function (e) {
    if (!O(e)) throw new V("time is required.");

    for (var i = this._entitiesToVisualize.values, t = this._modelHash, o = this._primitives, r = 0, n = i.length; r < n; r++) {
      var l,
          a,
          s = i[r],
          d = s._model,
          u = t[s.id],
          h = s.isShowing && s.isAvailable(e) && E.getValueOrDefault(d._show, e, !0);

      if (h && (a = s.computeModelMatrix(e, R), l = S.createIfNeeded(E.getValueOrUndefined(d._uri, e)), h = O(a) && O(l)), h) {
        var m = O(u) ? u.modelPrimitive : void 0;

        if (O(m) && l.url === u.url || (O(m) && (o.removeAndDestroy(m), delete t[s.id]), (m = A.fromGltf({
          url: l,
          incrementallyLoadTextures: E.getValueOrDefault(d._incrementallyLoadTextures, e, !0),
          scene: this._scene
        })).id = s, o.add(m), u = {
          modelPrimitive: m,
          url: l.url,
          animationsRunning: !1,
          nodeTransformationsScratch: {},
          loadFail: !1
        }, t[s.id] = u, function (e, i, t) {
          e.readyPromise.otherwise(function (e) {
            console.error(e), t[i.id].loadFail = !0;
          });
        }(m, s, t)), m.show = !0, m.scale = E.getValueOrDefault(d._scale, e, 1), m.minimumPixelSize = E.getValueOrDefault(d._minimumPixelSize, e, 0), m.maximumScale = E.getValueOrUndefined(d._maximumScale, e), m.modelMatrix = w.clone(a, m.modelMatrix), m.shadows = E.getValueOrDefault(d._shadows, e, x), m.heightReference = E.getValueOrDefault(d._heightReference, e, P), m.distanceDisplayCondition = E.getValueOrUndefined(d._distanceDisplayCondition, e), m.silhouetteColor = E.getValueOrDefault(d._silhouetteColor, e, T, m._silhouetteColor), m.silhouetteSize = E.getValueOrDefault(d._silhouetteSize, e, 0), m.color = E.getValueOrDefault(d._color, e, N, m._color), m.colorBlendMode = E.getValueOrDefault(d._colorBlendMode, e, B), m.colorBlendAmount = E.getValueOrDefault(d._colorBlendAmount, e, .5), m.clippingPlanes = E.getValueOrUndefined(d._clippingPlanes, e), m.clampAnimations = E.getValueOrDefault(d._clampAnimations, e, !0), m.imageBasedLightingFactor = E.getValueOrDefault(d._imageBasedLightingFactor, e, L), m.lightColor = E.getValueOrUndefined(d._lightColor, e), m.ready) {
          var c = E.getValueOrDefault(d._runAnimations, e, !0);
          u.animationsRunning !== c && (c ? m.activeAnimations.addAll({
            loop: M.REPEAT
          }) : m.activeAnimations.removeAll(), u.animationsRunning = c);
          var f = E.getValueOrUndefined(d._nodeTransformations, e, u.nodeTransformationsScratch);
          if (O(f)) for (var g = Object.keys(f), _ = 0, p = g.length; _ < p; ++_) {
            var v,
                C,
                y = g[_],
                D = f[y];
            O(D) && (v = m.getNode(y), O(v) && (C = w.fromTranslationRotationScale(D, H), v.matrix = w.multiply(v.originalMatrix, C, C)));
          }
        }
      } else O(u) && (u.modelPrimitive.show = !1);
    }

    return !0;
  }, d.prototype.isDestroyed = function () {
    return !1;
  }, d.prototype.destroy = function () {
    this._entityCollection.collectionChanged.removeEventListener(d.prototype._onCollectionChanged, this);

    for (var e = this._entitiesToVisualize.values, i = this._modelHash, t = this._primitives, o = e.length - 1; -1 < o; o--) {
      u(0, e[o], i, t);
    }

    return n(this);
  }, d.prototype.getBoundingSphere = function (e, i) {
    if (!O(e)) throw new V("entity is required.");
    if (!O(i)) throw new V("result is required.");
    var t = this._modelHash[e.id];
    if (!O(t) || t.loadFail) return s.FAILED;
    var o = t.modelPrimitive;
    if (!O(o) || !o.show) return s.FAILED;
    if (!o.ready) return s.PENDING;
    if (o.heightReference === l.NONE) r.transform(o.boundingSphere, o.modelMatrix, i);else {
      if (!O(o._clampedModelMatrix)) return s.PENDING;
      r.transform(o.boundingSphere, o._clampedModelMatrix, i);
    }
    return s.DONE;
  }, d.prototype._onCollectionChanged = function (e, i, t, o) {
    for (var r, n, l = this._entitiesToVisualize, a = this._modelHash, s = this._primitives, d = i.length - 1; -1 < d; d--) {
      r = i[d], O(r._model) && O(r._position) && l.set(r.id, r);
    }

    for (d = o.length - 1; -1 < d; d--) {
      r = o[d], O(r._model) && O(r._position) ? (n = void 0, n = a[r.id], O(n) && (n.nodeTransformationsScratch = {}), l.set(r.id, r)) : (u(0, r, a, s), l.remove(r.id));
    }

    for (d = t.length - 1; -1 < d; d--) {
      u(0, r = t[d], a, s), l.remove(r.id);
    }
  }, d;
});