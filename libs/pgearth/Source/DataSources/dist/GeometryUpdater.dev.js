"use strict";

define(["../Core/Check", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/DistanceDisplayCondition", "../Core/Event", "../Core/Iso8601", "../Core/oneTimeWarning", "../Scene/ClassificationType", "../Scene/ShadowMode", "./ColorMaterialProperty", "./ConstantProperty", "./Entity", "./Property"], function (n, t, p, _, e, i, o, r, s, u, c, a, l, f, h, y, d) {
  "use strict";

  var g = new f(t.WHITE),
      C = new h(!0),
      m = new h(!0),
      P = new h(!1),
      E = new h(t.BLACK),
      b = new h(l.DISABLED),
      w = new h(new r()),
      v = new h(a.BOTH);

  function O(t) {
    n.defined("options.entity", t.entity), n.defined("options.scene", t.scene), n.defined("options.geometryOptions", t.geometryOptions), n.defined("options.geometryPropertyName", t.geometryPropertyName), n.defined("options.observedPropertyNames", t.observedPropertyNames);
    var e = t.entity,
        i = t.geometryPropertyName;
    this._entity = e, this._scene = t.scene, this._fillEnabled = !1, this._isClosed = !1, this._onTerrain = !1, this._dynamic = !1, this._outlineEnabled = !1, this._geometryChanged = new s(), this._showProperty = void 0, this._materialProperty = void 0, this._showOutlineProperty = void 0, this._outlineColorProperty = void 0, this._outlineWidth = 1, this._shadowsProperty = void 0, this._distanceDisplayConditionProperty = void 0, this._classificationTypeProperty = void 0, this._options = t.geometryOptions, this._geometryPropertyName = i, this._id = i + "-" + e.id, this._observedPropertyNames = t.observedPropertyNames, this._supportsMaterialsforEntitiesOnTerrain = y.supportsMaterialsforEntitiesOnTerrain(t.scene);
  }

  return e(O.prototype, {
    id: {
      get: function get() {
        return this._id;
      }
    },
    entity: {
      get: function get() {
        return this._entity;
      }
    },
    fillEnabled: {
      get: function get() {
        return this._fillEnabled;
      }
    },
    hasConstantFill: {
      get: function get() {
        return !this._fillEnabled || !_(this._entity.availability) && d.isConstant(this._showProperty) && d.isConstant(this._fillProperty);
      }
    },
    fillMaterialProperty: {
      get: function get() {
        return this._materialProperty;
      }
    },
    outlineEnabled: {
      get: function get() {
        return this._outlineEnabled;
      }
    },
    hasConstantOutline: {
      get: function get() {
        return !this._outlineEnabled || !_(this._entity.availability) && d.isConstant(this._showProperty) && d.isConstant(this._showOutlineProperty);
      }
    },
    outlineColorProperty: {
      get: function get() {
        return this._outlineColorProperty;
      }
    },
    outlineWidth: {
      get: function get() {
        return this._outlineWidth;
      }
    },
    shadowsProperty: {
      get: function get() {
        return this._shadowsProperty;
      }
    },
    distanceDisplayConditionProperty: {
      get: function get() {
        return this._distanceDisplayConditionProperty;
      }
    },
    classificationTypeProperty: {
      get: function get() {
        return this._classificationTypeProperty;
      }
    },
    isDynamic: {
      get: function get() {
        return this._dynamic;
      }
    },
    isClosed: {
      get: function get() {
        return this._isClosed;
      }
    },
    onTerrain: {
      get: function get() {
        return this._onTerrain;
      }
    },
    geometryChanged: {
      get: function get() {
        return this._geometryChanged;
      }
    }
  }), O.prototype.isOutlineVisible = function (t) {
    var e = this._entity,
        i = this._outlineEnabled && e.isAvailable(t) && this._showProperty.getValue(t) && this._showOutlineProperty.getValue(t);

    return p(i, !1);
  }, O.prototype.isFilled = function (t) {
    var e = this._entity,
        i = this._fillEnabled && e.isAvailable(t) && this._showProperty.getValue(t) && this._fillProperty.getValue(t);

    return p(i, !1);
  }, O.prototype.createFillGeometryInstance = o.throwInstantiationError, O.prototype.createOutlineGeometryInstance = o.throwInstantiationError, O.prototype.isDestroyed = function () {
    return !1;
  }, O.prototype.destroy = function () {
    i(this);
  }, O.prototype._isHidden = function (t, e) {
    var i = e.show;
    return _(i) && i.isConstant && !i.getValue(u.MINIMUM_VALUE);
  }, O.prototype._isOnTerrain = function (t, e) {
    return !1;
  }, O.prototype._getIsClosed = function (t) {
    return !0;
  }, O.prototype._isDynamic = o.throwInstantiationError, O.prototype._setStaticOptions = o.throwInstantiationError, O.prototype._onEntityPropertyChanged = function (t, e, i, n) {
    var o, r, s, a, l, h, y, d;
    -1 !== this._observedPropertyNames.indexOf(e) && (o = this._entity[this._geometryPropertyName], _(o) ? (r = o.fill, s = !_(r) || !r.isConstant || r.getValue(u.MINIMUM_VALUE), a = o.outline, (l = _(a)) && a.isConstant && (l = a.getValue(u.MINIMUM_VALUE)), s || l ? (h = o.show, this._isHidden(t, o) ? (this._fillEnabled || this._outlineEnabled) && (this._fillEnabled = !1, this._outlineEnabled = !1, this._geometryChanged.raiseEvent(this)) : (this._materialProperty = p(o.material, g), this._fillProperty = p(r, m), this._showProperty = p(h, C), this._showOutlineProperty = p(o.outline, P), this._outlineColorProperty = l ? p(o.outlineColor, E) : void 0, this._shadowsProperty = p(o.shadows, b), this._distanceDisplayConditionProperty = p(o.distanceDisplayCondition, w), this._classificationTypeProperty = p(o.classificationType, v), this._fillEnabled = s, y = this._isOnTerrain(t, o) && (this._supportsMaterialsforEntitiesOnTerrain || this._materialProperty instanceof f), l && y && (c(c.geometryOutlines), l = !1), this._onTerrain = y, this._outlineEnabled = l, this._isDynamic(t, o) ? this._dynamic || (this._dynamic = !0, this._geometryChanged.raiseEvent(this)) : (this._setStaticOptions(t, o), this._isClosed = this._getIsClosed(this._options), d = o.outlineWidth, this._outlineWidth = _(d) ? d.getValue(u.MINIMUM_VALUE) : 1, this._dynamic = !1, this._geometryChanged.raiseEvent(this)))) : (this._fillEnabled || this._outlineEnabled) && (this._fillEnabled = !1, this._outlineEnabled = !1, this._geometryChanged.raiseEvent(this))) : (this._fillEnabled || this._outlineEnabled) && (this._fillEnabled = !1, this._outlineEnabled = !1, this._geometryChanged.raiseEvent(this)));
  }, O.prototype.createDynamicUpdater = function (t, e) {
    if (n.defined("primitives", t), n.defined("groundPrimitives", e), !this._dynamic) throw new o("This instance does not represent dynamic geometry.");
    return new this.constructor.DynamicGeometryUpdater(this, t, e);
  }, O;
});