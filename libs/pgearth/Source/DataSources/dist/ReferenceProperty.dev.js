"use strict";

define(["../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/RuntimeError", "./Property"], function (h, t, f, o, a, e) {
  "use strict";

  function i(t) {
    var e = t._targetProperty;

    if (t._resolveProperty) {
      for (var r = function (t) {
        var e = !0;

        if (t._resolveEntity) {
          var r = t._targetCollection.getById(t._targetId);

          if (h(r) ? (r.definitionChanged.addEventListener(l.prototype._onTargetEntityDefinitionChanged, t), t._targetEntity = r, t._resolveEntity = !1) : (r = t._targetEntity, e = !1), !h(r)) throw new a('target entity "' + t._targetId + '" could not be resolved.');
        }

        return e;
      }(t), n = t._targetPropertyNames, e = t._targetEntity, i = n.length, o = 0; o < i && h(e); o++) {
        e = e[n[o]];
      }

      if (h(e)) t._targetProperty = e, t._resolveProperty = !r;else if (!h(t._targetProperty)) throw new a('targetProperty "' + t._targetId + "." + n.join(".") + '" could not be resolved.');
    }

    return e;
  }

  function l(t, e, r) {
    if (!h(t)) throw new f("targetCollection is required.");
    if (!h(e) || "" === e) throw new f("targetId is required.");
    if (!h(r) || 0 === r.length) throw new f("targetPropertyNames is required.");

    for (var n = 0; n < r.length; n++) {
      var i = r[n];
      if (!h(i) || "" === i) throw new f("reference contains invalid properties.");
    }

    this._targetCollection = t, this._targetId = e, this._targetPropertyNames = r, this._targetProperty = void 0, this._targetEntity = void 0, this._definitionChanged = new o(), this._resolveEntity = !0, this._resolveProperty = !0, t.collectionChanged.addEventListener(l.prototype._onCollectionChanged, this);
  }

  return t(l.prototype, {
    isConstant: {
      get: function get() {
        return e.isConstant(i(this));
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    referenceFrame: {
      get: function get() {
        return i(this).referenceFrame;
      }
    },
    targetId: {
      get: function get() {
        return this._targetId;
      }
    },
    targetCollection: {
      get: function get() {
        return this._targetCollection;
      }
    },
    targetPropertyNames: {
      get: function get() {
        return this._targetPropertyNames;
      }
    },
    resolvedProperty: {
      get: function get() {
        return i(this);
      }
    }
  }), l.fromString = function (t, e) {
    if (!h(t)) throw new f("targetCollection is required.");
    if (!h(e)) throw new f("referenceString is required.");

    for (var r, n = [], i = !0, o = !1, a = "", s = 0; s < e.length; ++s) {
      var g = e.charAt(s);
      o ? (a += g, o = !1) : "\\" === g ? o = !0 : i && "#" === g ? (r = a, i = !1, a = "") : i || "." !== g ? a += g : (n.push(a), a = "");
    }

    return n.push(a), new l(t, r, n);
  }, l.prototype.getValue = function (t, e) {
    return i(this).getValue(t, e);
  }, l.prototype.getValueInReferenceFrame = function (t, e, r) {
    return i(this).getValueInReferenceFrame(t, e, r);
  }, l.prototype.getType = function (t) {
    return i(this).getType(t);
  }, l.prototype.equals = function (t) {
    if (this === t) return !0;
    var e = this._targetPropertyNames,
        r = t._targetPropertyNames;
    if (this._targetCollection !== t._targetCollection || this._targetId !== t._targetId || e.length !== r.length) return !1;

    for (var n = this._targetPropertyNames.length, i = 0; i < n; i++) {
      if (e[i] !== r[i]) return !1;
    }

    return !0;
  }, l.prototype._onTargetEntityDefinitionChanged = function (t, e, r, n) {
    this._targetPropertyNames[0] === e && (this._resolveProperty = !0, this._definitionChanged.raiseEvent(this));
  }, l.prototype._onCollectionChanged = function (t, e, r) {
    var n = this._targetEntity;
    h(n) && (-1 !== r.indexOf(n) ? (n.definitionChanged.removeEventListener(l.prototype._onTargetEntityDefinitionChanged, this), this._resolveEntity = !0, this._resolveProperty = !0) : this._resolveEntity && (i(this), this._resolveEntity || this._definitionChanged.raiseEvent(this)));
  }, l;
});