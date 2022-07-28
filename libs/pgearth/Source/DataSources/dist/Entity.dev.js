"use strict";

define(["../Core/Cartesian3", "../Core/Cartographic", "../Core/Check", "../Core/createGuid", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/Math", "../Core/Matrix3", "../Core/Matrix4", "../Core/Quaternion", "../Core/Transforms", "../Scene/HeightReference", "../Scene/GroundPrimitive", "../Scene/GroundPolylinePrimitive", "./BillboardGraphics", "./BoxGraphics", "./ConstantPositionProperty", "./CorridorGraphics", "./createPropertyDescriptor", "./createRawPropertyDescriptor", "./CylinderGraphics", "./EllipseGraphics", "./EllipsoidGraphics", "./LabelGraphics", "./ModelGraphics", "./PathGraphics", "./PlaneGraphics", "./PointGraphics", "./PolygonGraphics", "./PolylineGraphics", "./PolylineVolumeGraphics", "./Property", "./PropertyBag", "./RectangleGraphics", "./WallGraphics"], function (h, i, l, t, p, d, e, c, o, u, v, _, r, y, f, n, s, a, m, b, g, w, C, S, P, O, G, N, x, E, M, T, V, F, R, U, q, D) {
  "use strict";

  var j = new i();

  function B(i) {
    return new b(i);
  }

  function L(i, e) {
    return w(i, void 0, function (i) {
      return i instanceof e ? i : new e(i);
    });
  }

  function Q(i) {
    var e = (i = p(i, p.EMPTY_OBJECT)).id;
    d(e) || (e = t()), this._availability = void 0, this._id = e, this._definitionChanged = new o(), this._name = i.name, this._show = p(i.show, !0), this._parent = void 0, this._propertyNames = ["billboard", "box", "corridor", "cylinder", "description", "ellipse", "ellipsoid", "label", "model", "orientation", "path", "plane", "point", "polygon", "polyline", "polylineVolume", "position", "properties", "rectangle", "viewFrom", "wall"], this._billboard = void 0, this._billboardSubscription = void 0, this._box = void 0, this._boxSubscription = void 0, this._corridor = void 0, this._corridorSubscription = void 0, this._cylinder = void 0, this._cylinderSubscription = void 0, this._description = void 0, this._descriptionSubscription = void 0, this._ellipse = void 0, this._ellipseSubscription = void 0, this._ellipsoid = void 0, this._ellipsoidSubscription = void 0, this._label = void 0, this._labelSubscription = void 0, this._model = void 0, this._modelSubscription = void 0, this._orientation = void 0, this._orientationSubscription = void 0, this._path = void 0, this._pathSubscription = void 0, this._plane = void 0, this._planeSubscription = void 0, this._point = void 0, this._pointSubscription = void 0, this._polygon = void 0, this._polygonSubscription = void 0, this._polyline = void 0, this._polylineSubscription = void 0, this._polylineVolume = void 0, this._polylineVolumeSubscription = void 0, this._position = void 0, this._positionSubscription = void 0, this._properties = void 0, this._propertiesSubscription = void 0, this._rectangle = void 0, this._rectangleSubscription = void 0, this._viewFrom = void 0, this._viewFromSubscription = void 0, this._wall = void 0, this._wallSubscription = void 0, this._children = [], this.entityCollection = void 0, this.parent = i.parent, this.merge(i);
  }

  function k(i, e, t) {
    for (var o = e.length, r = 0; r < o; r++) {
      var n = e[r],
          s = n._show;
      (!t && s) !== (t && s) && k(n, n._children, t);
    }

    i._definitionChanged.raiseEvent(i, "isShowing", t, !t);
  }

  e(Q.prototype, {
    availability: C("availability"),
    id: {
      get: function get() {
        return this._id;
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    name: C("name"),
    show: {
      get: function get() {
        return this._show;
      },
      set: function set(i) {
        if (!d(i)) throw new c("value is required.");
        var e, t;
        i !== this._show && (e = this.isShowing, this._show = i, e !== (t = this.isShowing) && k(this, this._children, t), this._definitionChanged.raiseEvent(this, "show", i, !i));
      }
    },
    isShowing: {
      get: function get() {
        return this._show && (!d(this.entityCollection) || this.entityCollection.show) && (!d(this._parent) || this._parent.isShowing);
      }
    },
    parent: {
      get: function get() {
        return this._parent;
      },
      set: function set(i) {
        var e,
            t,
            o,
            r = this._parent;
        r !== i && (e = this.isShowing, d(r) && (t = r._children.indexOf(this), r._children.splice(t, 1)), this._parent = i, d(i) && i._children.push(this), e !== (o = this.isShowing) && k(this, this._children, o), this._definitionChanged.raiseEvent(this, "parent", i, r));
      }
    },
    propertyNames: {
      get: function get() {
        return this._propertyNames;
      }
    },
    billboard: L("billboard", a),
    box: L("box", m),
    corridor: L("corridor", g),
    cylinder: L("cylinder", S),
    description: w("description"),
    ellipse: L("ellipse", P),
    ellipsoid: L("ellipsoid", O),
    label: L("label", G),
    model: L("model", N),
    orientation: w("orientation"),
    path: L("path", x),
    plane: L("plane", E),
    point: L("point", M),
    polygon: L("polygon", T),
    polyline: L("polyline", V),
    polylineVolume: L("polylineVolume", F),
    properties: L("properties", U),
    position: w("position", void 0, B),
    rectangle: L("rectangle", q),
    viewFrom: w("viewFrom"),
    wall: L("wall", D)
  }), Q.prototype.isAvailable = function (i) {
    if (!d(i)) throw new c("time is required.");
    var e = this._availability;
    return !d(e) || e.contains(i);
  }, Q.prototype.addProperty = function (i) {
    var e = this._propertyNames;
    if (!d(i)) throw new c("propertyName is required.");
    if (-1 !== e.indexOf(i)) throw new c(i + " is already a registered property.");
    if (i in this) throw new c(i + " is a reserved property name.");
    e.push(i), Object.defineProperty(this, i, C(i, !0));
  }, Q.prototype.removeProperty = function (i) {
    var e = this._propertyNames.indexOf(i);

    if (!d(i)) throw new c("propertyName is required.");
    if (-1 === e) throw new c(i + " is not a registered property.");
    this._propertyNames.splice(e, 1), delete this[i];
  }, Q.prototype.merge = function (i) {
    if (!d(i)) throw new c("source is required.");
    this.name = p(this.name, i.name), this.availability = p(this.availability, i.availability);

    for (var e = this._propertyNames, t = d(i._propertyNames) ? i._propertyNames : Object.keys(i), o = t.length, r = 0; r < o; r++) {
      var n,
          s,
          a = t[r];
      "parent" !== a && (n = this[a], s = i[a], d(n) || -1 !== e.indexOf(a) || this.addProperty(a), d(s) && (d(n) ? d(n.merge) && n.merge(s) : d(s.merge) && d(s.clone) ? this[a] = s.clone() : this[a] = s));
    }
  };
  var A = new v(),
      H = new h(),
      I = new r();
  return Q.prototype.computeModelMatrix = function (i, e) {
    l.typeOf.object("time", i);
    var t = R.getValueOrUndefined(this._position, i, H);

    if (d(t)) {
      var o = R.getValueOrUndefined(this._orientation, i, I);
      return e = d(o) ? _.fromRotationTranslation(v.fromQuaternion(o, A), t, e) : y.eastNorthUpToFixedFrame(t, void 0, e);
    }
  }, Q.prototype.computeModelMatrixForHeightReference = function (i, e, t, o, r) {
    l.typeOf.object("time", i);
    var n = R.getValueOrDefault(e, i, f.NONE),
        s = R.getValueOrUndefined(this._position, i, H);
    if (n === f.NONE || !d(s) || h.equalsEpsilon(s, h.ZERO, u.EPSILON8)) return this.computeModelMatrix(i, r);
    var a = o.cartesianToCartographic(s, j);
    n === f.CLAMP_TO_GROUND ? a.height = t : a.height += t, s = o.cartographicToCartesian(a, s);
    var p = R.getValueOrUndefined(this._orientation, i, I);
    return r = d(p) ? _.fromRotationTranslation(v.fromQuaternion(p, A), s, r) : y.eastNorthUpToFixedFrame(s, void 0, r);
  }, Q.supportsMaterialsforEntitiesOnTerrain = function (i) {
    return n.supportsMaterials(i);
  }, Q.supportsPolylinesOnTerrain = function (i) {
    return s.isSupported(i);
  }, Q;
});