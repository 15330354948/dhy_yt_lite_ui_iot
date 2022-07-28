"use strict";

define(["../Core/AssociativeArray", "../Core/createGuid", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/Iso8601", "../Core/JulianDate", "../Core/RuntimeError", "../Core/TimeInterval", "./Entity"], function (t, i, a, e, h, n, d, u, s, l, o) {
  "use strict";

  var r = {
    id: void 0
  };

  function v(e) {
    if (e._firing) e._refire = !0;else if (0 === e._suspendCount) {
      var t = e._addedEntities,
          i = e._removedEntities,
          n = e._changedEntities;

      if (0 !== n.length || 0 !== t.length || 0 !== i.length) {
        e._firing = !0;

        do {
          e._refire = !1;
          var s = t.values.slice(0),
              o = i.values.slice(0),
              r = n.values.slice(0);
          t.removeAll(), i.removeAll(), n.removeAll(), e._collectionChanged.raiseEvent(e, s, o, r);
        } while (e._refire);

        e._firing = !1;
      }
    }
  }

  function _(e) {
    this._owner = e, this._entities = new t(), this._addedEntities = new t(), this._removedEntities = new t(), this._changedEntities = new t(), this._suspendCount = 0, this._collectionChanged = new n(), this._id = i(), this._show = !0, this._firing = !1, this._refire = !1;
  }

  return _.prototype.suspendEvents = function () {
    this._suspendCount++;
  }, _.prototype.resumeEvents = function () {
    if (0 === this._suspendCount) throw new h("resumeEvents can not be called before suspendEvents.");
    this._suspendCount--, v(this);
  }, _.collectionChangedEventCallback = void 0, e(_.prototype, {
    collectionChanged: {
      get: function get() {
        return this._collectionChanged;
      }
    },
    id: {
      get: function get() {
        return this._id;
      }
    },
    values: {
      get: function get() {
        return this._entities.values;
      }
    },
    show: {
      get: function get() {
        return this._show;
      },
      set: function set(e) {
        if (!a(e)) throw new h("value is required.");

        if (e !== this._show) {
          this.suspendEvents();

          for (var t = [], i = this._entities.values, n = i.length, s = 0; s < n; s++) {
            t.push(i[s].isShowing);
          }

          for (this._show = e, s = 0; s < n; s++) {
            var o = t[s],
                r = i[s];
            o !== r.isShowing && r.definitionChanged.raiseEvent(r, "isShowing", r.isShowing, o);
          }

          this.resumeEvents();
        }
      }
    },
    owner: {
      get: function get() {
        return this._owner;
      }
    }
  }), _.prototype.computeAvailability = function () {
    for (var e = d.MAXIMUM_VALUE, t = d.MINIMUM_VALUE, i = this._entities.values, n = 0, s = i.length; n < s; n++) {
      var o,
          r,
          h = i[n].availability;
      a(h) && (o = h.start, r = h.stop, u.lessThan(o, e) && !o.equals(d.MINIMUM_VALUE) && (e = o), u.greaterThan(r, t) && !r.equals(d.MAXIMUM_VALUE) && (t = r));
    }

    return d.MAXIMUM_VALUE.equals(e) && (e = d.MINIMUM_VALUE), d.MINIMUM_VALUE.equals(t) && (t = d.MAXIMUM_VALUE), new l({
      start: e,
      stop: t
    });
  }, _.prototype.add = function (e) {
    if (!a(e)) throw new h("entity is required.");
    e instanceof o || (e = new o(e));
    var t = e.id,
        i = this._entities;
    if (i.contains(t)) throw new s("An entity with id " + t + " already exists in this collection.");
    return e.entityCollection = this, i.set(t, e), this._removedEntities.remove(t) || this._addedEntities.set(t, e), e.definitionChanged.addEventListener(_.prototype._onEntityDefinitionChanged, this), v(this), e;
  }, _.prototype.remove = function (e) {
    return !!a(e) && this.removeById(e.id);
  }, _.prototype.contains = function (e) {
    if (!a(e)) throw new h("entity is required");
    return this._entities.get(e.id) === e;
  }, _.prototype.removeById = function (e) {
    if (!a(e)) return !1;

    var t = this._entities.get(e);

    return !!this._entities.remove(e) && (this._addedEntities.remove(e) || (this._removedEntities.set(e, t), this._changedEntities.remove(e)), this._entities.remove(e), t.definitionChanged.removeEventListener(_.prototype._onEntityDefinitionChanged, this), v(this), !0);
  }, _.prototype.removeAll = function () {
    for (var e = this._entities, t = e.length, i = e.values, n = this._addedEntities, s = this._removedEntities, o = 0; o < t; o++) {
      var r = i[o],
          h = r.id,
          d = n.get(h);
      a(d) || (r.definitionChanged.removeEventListener(_.prototype._onEntityDefinitionChanged, this), s.set(h, r));
    }

    e.removeAll(), n.removeAll(), this._changedEntities.removeAll(), v(this);
  }, _.prototype.getById = function (e) {
    if (!a(e)) throw new h("id is required.");
    return this._entities.get(e);
  }, _.prototype.getOrCreateEntity = function (e) {
    if (!a(e)) throw new h("id is required.");

    var t = this._entities.get(e);

    return a(t) || (r.id = e, t = new o(r), this.add(t)), t;
  }, _.prototype._onEntityDefinitionChanged = function (e) {
    var t = e.id;
    this._addedEntities.contains(t) || this._changedEntities.set(t, e), v(this);
  }, _;
});