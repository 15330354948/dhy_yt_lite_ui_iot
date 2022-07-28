"use strict";

define(["../Core/AssociativeArray", "../Core/Cartesian3", "../Core/defined", "../Core/destroyObject", "../Core/DeveloperError", "../Core/JulianDate", "../Core/Matrix3", "../Core/Matrix4", "../Core/ReferenceFrame", "../Core/TimeInterval", "../Core/Transforms", "../Scene/PolylineCollection", "../Scene/SceneMode", "./CompositePositionProperty", "./ConstantPositionProperty", "./MaterialProperty", "./Property", "./ReferenceProperty", "./SampledPositionProperty", "./ScaledPositionProperty", "./TimeIntervalCollectionPositionProperty"], function (n, i, T, r, p, O, e, o, u, v, a, s, h, f, y, w, x, m, _, g, C) {
  "use strict";

  var I = new v(),
      P = new v(),
      F = new v();

  function l(e) {
    this.entity = e, this.polyline = void 0, this.index = void 0, this.updater = void 0;
  }

  function E(e, t, n, i, r, o, a, s) {
    for (; e instanceof m;) {
      e = e.resolvedProperty;
    }

    var l, d, c, p, u;
    return a = e instanceof _ ? function (e, t, n, i, r, o, a, s, l) {
      var d = s,
          c = e.getValueInReferenceFrame(t, o, l[d]);
      T(c) && (l[d++] = c);

      for (var p, u, h, f, y, v = !T(r) || O.lessThanOrEquals(r, t) || O.greaterThanOrEquals(r, n), m = 0, _ = i.length, g = i[m], C = n, w = !1; m < _;) {
        if (!v && O.greaterThanOrEquals(g, r) && (c = e.getValueInReferenceFrame(r, o, l[d]), T(c) && (l[d++] = c), v = !0), O.greaterThan(g, t) && O.lessThan(g, C) && !g.equals(r) && (c = e.getValueInReferenceFrame(g, o, l[d]), T(c) && (l[d++] = c)), m < _ - 1) if (0 < a && !w && (f = i[m + 1], (w = a < (y = O.secondsDifference(f, g))) && (p = Math.ceil(y / a), u = 0, h = y / Math.max(p, 2), p = Math.max(p - 1, 1))), w && u < p) {
          g = O.addSeconds(g, h, new O()), u++;
          continue;
        }
        w = !1, g = i[++m];
      }

      return c = e.getValueInReferenceFrame(n, o, l[d]), T(c) && (l[d++] = c), d;
    }(e, t, n, e._property._times, i, r, o, a, s) : e instanceof f ? function (e, t, n, i, r, o, a, s) {
      P.start = t, P.stop = n;

      for (var l = a, d = e.intervals, c = 0; c < d.length; c++) {
        var p,
            u,
            h,
            f,
            y = d.get(c);
        v.intersect(y, P, I).isEmpty || (p = y.start, u = y.stop, h = t, O.greaterThan(p, h) && (h = p), f = n, O.lessThan(u, f) && (f = u), l = E(y.data, h, f, i, r, o, l, s));
      }

      return l;
    }(e, t, n, i, r, o, a, s) : e instanceof C ? function (e, t, n, i, r, o) {
      F.start = t, F.stop = n;

      for (var a = r, s = e.intervals, l = 0; l < s.length; l++) {
        var d,
            c,
            p = s.get(l);
        v.intersect(p, F, I).isEmpty || (d = p.start, p.isStartIncluded || (d = p.isStopIncluded ? p.stop : O.addSeconds(p.start, O.secondsDifference(p.stop, p.start) / 2, new O())), c = e.getValueInReferenceFrame(d, i, o[a]), T(c) && (o[a] = c, a++));
      }

      return a;
    }(e, t, n, r, a, s) : e instanceof y || e instanceof g && x.isConstant(e) ? (l = t, d = r, c = a, p = s, u = e.getValueInReferenceFrame(l, d, p[c]), T(u) && (p[c++] = u), c) : function (e, t, n, i, r, o, a, s) {
      for (var l, d = 0, c = a, p = t, u = Math.max(o, 60), h = !T(i) || O.lessThanOrEquals(i, t) || O.greaterThanOrEquals(i, n); O.lessThan(p, n);) {
        !h && O.greaterThanOrEquals(p, i) && (h = !0, l = e.getValueInReferenceFrame(i, r, s[c]), T(l) && (s[c] = l, c++)), l = e.getValueInReferenceFrame(p, r, s[c]), T(l) && (s[c] = l, c++), d++, p = O.addSeconds(t, u * d, new O());
      }

      return l = e.getValueInReferenceFrame(n, r, s[c]), T(l) && (s[c] = l, c++), c;
    }(e, t, n, i, r, o, a, s);
  }

  function V(e, t, n, i, r, o, a) {
    T(a) || (a = []);
    var s = E(e, t, n, i, r, o, 0, a);
    return a.length = s, a;
  }

  var d = new e();

  function S(e, t) {
    this._unusedIndexes = [], this._polylineCollection = new s(), this._scene = e, this._referenceFrame = t, e.primitives.add(this._polylineCollection);
  }

  function c(e, t) {
    if (!T(e)) throw new p("scene is required.");
    if (!T(t)) throw new p("entityCollection is required.");
    t.collectionChanged.addEventListener(c.prototype._onCollectionChanged, this), this._scene = e, this._updaters = {}, this._entityCollection = t, this._items = new n(), this._onCollectionChanged(t, t.values, [], []);
  }

  return S.prototype.update = function (e) {
    var t;
    this._referenceFrame === u.INERTIAL && (t = a.computeIcrfToFixedMatrix(e, d), T(t) || (t = a.computeTemeToPseudoFixedMatrix(e, d)), o.fromRotationTranslation(t, i.ZERO, this._polylineCollection.modelMatrix));
  }, S.prototype.updateObject = function (e, t) {
    var n,
        i,
        r,
        o,
        a,
        s,
        l,
        d,
        c,
        p,
        u,
        h,
        f,
        y = t.entity,
        v = y._path,
        m = y._position,
        _ = v._show,
        g = t.polyline,
        C = y.isShowing && (!T(_) || _.getValue(e));

    C && (r = x.getValueOrUndefined(v._leadTime, e), o = x.getValueOrUndefined(v._trailTime, e), a = y._availability, s = T(a), l = T(r), d = T(o), (C = s || l && d) && (d && (n = O.addSeconds(e, -o, new O())), l && (i = O.addSeconds(e, r, new O())), s && (c = a.start, p = a.stop, d && !O.greaterThan(c, n) || (n = c), l && !O.lessThan(p, i) || (i = p)), C = O.lessThan(n, i))), C ? (T(g) || (0 < (u = this._unusedIndexes).length ? (h = u.pop(), g = this._polylineCollection.get(h), t.index = h) : (t.index = this._polylineCollection.length, g = this._polylineCollection.add()), g.id = y, t.polyline = g), f = x.getValueOrDefault(v._resolution, e, 60), g.show = !0, g.positions = V(m, n, i, e, this._referenceFrame, f, g.positions.slice()), g.material = w.getValue(e, v._material, g.material), g.width = x.getValueOrDefault(v._width, e, 1), g.distanceDisplayCondition = x.getValueOrUndefined(v._distanceDisplayCondition, e, g.distanceDisplayCondition)) : T(g) && (this._unusedIndexes.push(t.index), t.polyline = void 0, g.show = !1, t.index = void 0);
  }, S.prototype.removeObject = function (e) {
    var t = e.polyline;
    T(t) && (this._unusedIndexes.push(e.index), e.polyline = void 0, t.show = !1, t.id = void 0, e.index = void 0);
  }, S.prototype.destroy = function () {
    return this._scene.primitives.remove(this._polylineCollection), r(this);
  }, c.prototype.update = function (e) {
    if (!T(e)) throw new p("time is required.");
    var t = this._updaters;

    for (var n in t) {
      t.hasOwnProperty(n) && t[n].update(e);
    }

    for (var i = this._items.values, r = 0, o = i.length; r < o; r++) {
      var a = i[r],
          s = a.entity._position,
          l = a.updater,
          d = u.FIXED;
      this._scene.mode === h.SCENE3D && (d = s.referenceFrame);
      var c = this._updaters[d];
      l === c && T(c) ? c.updateObject(e, a) : (T(l) && l.removeObject(a), T(c) || ((c = new S(this._scene, d)).update(e), this._updaters[d] = c), a.updater = c, T(c) && c.updateObject(e, a));
    }

    return !0;
  }, c.prototype.isDestroyed = function () {
    return !1;
  }, c.prototype.destroy = function () {
    this._entityCollection.collectionChanged.removeEventListener(c.prototype._onCollectionChanged, this);

    var e = this._updaters;

    for (var t in e) {
      e.hasOwnProperty(t) && e[t].destroy();
    }

    return r(this);
  }, c.prototype._onCollectionChanged = function (e, t, n, i) {
    for (var r, o, a = this._items, s = t.length - 1; -1 < s; s--) {
      r = t[s], T(r._path) && T(r._position) && a.set(r.id, new l(r));
    }

    for (s = i.length - 1; -1 < s; s--) {
      r = i[s], T(r._path) && T(r._position) ? a.contains(r.id) || a.set(r.id, new l(r)) : (o = a.get(r.id), T(o) && (T(o.updater) && o.updater.removeObject(o), a.remove(r.id)));
    }

    for (s = n.length - 1; -1 < s; s--) {
      r = n[s], o = a.get(r.id), T(o) && (T(o.updater) && o.updater.removeObject(o), a.remove(r.id));
    }
  }, c._subSample = V, c;
});