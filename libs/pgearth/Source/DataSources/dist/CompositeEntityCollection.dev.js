"use strict";

define(["../Core/createGuid", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Math", "./Entity", "./EntityCollection"], function (o, y, t, i, s, m, v) {
  "use strict";

  var C = {
    id: void 0
  },
      l = new Array(2);

  function w(t) {
    for (var e = t.propertyNames, o = e.length, i = 0; i < o; i++) {
      t[e[i]] = void 0;
    }

    t._name = void 0, t._availability = void 0;
  }

  function E(t, e, o, i) {
    l[0] = o, l[1] = i.id, e[JSON.stringify(l)] = i.definitionChanged.addEventListener(g.prototype._onDefinitionChanged, t);
  }

  function B(t, e, o, i) {
    l[0] = o, l[1] = i.id;
    var n = JSON.stringify(l);
    e[n](), e[n] = void 0;
  }

  function r(t) {
    if (t._shouldRecomposite = !0, 0 === t._suspendCount) {
      for (var e, o, i, n, s, l = t._collections, r = l.length, c = t._collectionsCopy, h = c.length, d = t._composite, p = new v(t), u = t._eventHash, a = 0; a < h; a++) {
        for ((n = c[a]).collectionChanged.removeEventListener(g.prototype._onCollectionChanged, t), o = n.values, s = n.id, i = o.length - 1; -1 < i; i--) {
          B(0, u, s, e = o[i]);
        }
      }

      for (a = r - 1; 0 <= a; a--) {
        for ((n = l[a]).collectionChanged.addEventListener(g.prototype._onCollectionChanged, t), o = n.values, s = n.id, i = o.length - 1; -1 < i; i--) {
          E(t, u, s, e = o[i]);
          var f = p.getById(e.id);
          y(f) || (f = d.getById(e.id), y(f) ? w(f) : (C.id = e.id, f = new m(C)), p.add(f)), f.merge(e);
        }
      }

      t._collectionsCopy = l.slice(0), d.suspendEvents(), d.removeAll();
      var _ = p.values;

      for (a = 0; a < _.length; a++) {
        d.add(_[a]);
      }

      d.resumeEvents();
    }
  }

  function g(t, e) {
    this._owner = e, this._composite = new v(this), this._suspendCount = 0, this._collections = y(t) ? t.slice() : [], this._collectionsCopy = [], this._id = o(), this._eventHash = {}, r(this), this._shouldRecomposite = !1;
  }

  function n(t, e) {
    if (!y(e)) throw new i("collection is required.");
    var o = t.indexOf(e);
    if (-1 === o) throw new i("collection is not in this composite.");
    return o;
  }

  function c(t, e, o) {
    var i,
        n = t._collections;
    (e = s.clamp(e, 0, n.length - 1)) !== (o = s.clamp(o, 0, n.length - 1)) && (i = n[e], n[e] = n[o], n[o] = i, r(t));
  }

  return t(g.prototype, {
    collectionChanged: {
      get: function get() {
        return this._composite._collectionChanged;
      }
    },
    id: {
      get: function get() {
        return this._id;
      }
    },
    values: {
      get: function get() {
        return this._composite.values;
      }
    },
    owner: {
      get: function get() {
        return this._owner;
      }
    }
  }), g.prototype.addCollection = function (t, e) {
    var o = y(e);
    if (!y(t)) throw new i("collection is required.");

    if (o) {
      if (e < 0) throw new i("index must be greater than or equal to zero.");
      if (e > this._collections.length) throw new i("index must be less than or equal to the number of collections.");
    }

    o ? this._collections.splice(e, 0, t) : (e = this._collections.length, this._collections.push(t)), r(this);
  }, g.prototype.removeCollection = function (t) {
    var e = this._collections.indexOf(t);

    return -1 !== e && (this._collections.splice(e, 1), r(this), !0);
  }, g.prototype.removeAllCollections = function () {
    this._collections.length = 0, r(this);
  }, g.prototype.containsCollection = function (t) {
    return -1 !== this._collections.indexOf(t);
  }, g.prototype.contains = function (t) {
    return this._composite.contains(t);
  }, g.prototype.indexOfCollection = function (t) {
    return this._collections.indexOf(t);
  }, g.prototype.getCollection = function (t) {
    if (!y(t)) throw new i("index is required.", "index");
    return this._collections[t];
  }, g.prototype.getCollectionsLength = function () {
    return this._collections.length;
  }, g.prototype.raiseCollection = function (t) {
    var e = n(this._collections, t);
    c(this, e, e + 1);
  }, g.prototype.lowerCollection = function (t) {
    var e = n(this._collections, t);
    c(this, e, e - 1);
  }, g.prototype.raiseCollectionToTop = function (t) {
    var e = n(this._collections, t);
    e !== this._collections.length - 1 && (this._collections.splice(e, 1), this._collections.push(t), r(this));
  }, g.prototype.lowerCollectionToBottom = function (t) {
    var e = n(this._collections, t);
    0 !== e && (this._collections.splice(e, 1), this._collections.splice(0, 0, t), r(this));
  }, g.prototype.suspendEvents = function () {
    this._suspendCount++, this._composite.suspendEvents();
  }, g.prototype.resumeEvents = function () {
    if (0 === this._suspendCount) throw new i("resumeEvents can not be called before suspendEvents.");
    this._suspendCount--, this._shouldRecomposite && 0 === this._suspendCount && (r(this), this._shouldRecomposite = !1), this._composite.resumeEvents();
  }, g.prototype.computeAvailability = function () {
    return this._composite.computeAvailability();
  }, g.prototype.getById = function (t) {
    return this._composite.getById(t);
  }, g.prototype._onCollectionChanged = function (t, e, o) {
    var i,
        n,
        s = this._collectionsCopy,
        l = s.length,
        r = this._composite;
    r.suspendEvents();

    for (var c = o.length, h = this._eventHash, d = t.id, p = 0; p < c; p++) {
      var u = o[p];
      B(0, h, d, u);

      for (var a = u.id, f = l - 1; 0 <= f; f--) {
        i = s[f].getById(a), y(i) && (y(n) || w(n = r.getById(a)), n.merge(i));
      }

      y(n) || r.removeById(a), n = void 0;
    }

    var _ = e.length;

    for (p = 0; p < _; p++) {
      var v = e[p];
      E(this, h, d, v);
      var g = v.id;

      for (f = l - 1; 0 <= f; f--) {
        i = s[f].getById(g), y(i) && (y(n) || (n = r.getById(g), y(n) ? w(n) : (C.id = g, n = new m(C), r.add(n))), n.merge(i));
      }

      n = void 0;
    }

    r.resumeEvents();
  }, g.prototype._onDefinitionChanged = function (t, e, o, i) {
    for (var n = this._collections, s = this._composite, l = n.length, r = t.id, c = s.getById(r), h = c[e], d = !y(h), p = !0, u = l - 1; 0 <= u; u--) {
      var a = n[u].getById(t.id);

      if (y(a)) {
        var f = a[e];

        if (y(f)) {
          if (p) {
            if (p = !1, !y(f.merge) || !y(f.clone)) {
              h = f;
              break;
            }

            h = f.clone(h);
          }

          h.merge(f);
        }
      }
    }

    d && -1 === c.propertyNames.indexOf(e) && c.addProperty(e), c[e] = h;
  }, g;
});