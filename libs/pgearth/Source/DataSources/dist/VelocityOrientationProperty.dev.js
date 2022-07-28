"use strict";

define(["../Core/Cartesian3", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/Ellipsoid", "../Core/Event", "../Core/Matrix3", "../Core/Quaternion", "../Core/Transforms", "./Property", "./VelocityVectorProperty"], function (t, o, n, i, r, s, e, l, c, d, p) {
  "use strict";

  function a(t, i) {
    this._velocityVectorProperty = new p(t, !0), this._subscription = void 0, this._ellipsoid = void 0, this._definitionChanged = new s(), this.ellipsoid = o(i, r.WGS84);
    var e = this;

    this._velocityVectorProperty.definitionChanged.addEventListener(function () {
      e._definitionChanged.raiseEvent(e);
    });
  }

  i(a.prototype, {
    isConstant: {
      get: function get() {
        return d.isConstant(this._velocityVectorProperty);
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    position: {
      get: function get() {
        return this._velocityVectorProperty.position;
      },
      set: function set(t) {
        this._velocityVectorProperty.position = t;
      }
    },
    ellipsoid: {
      get: function get() {
        return this._ellipsoid;
      },
      set: function set(t) {
        this._ellipsoid !== t && (this._ellipsoid = t, this._definitionChanged.raiseEvent(this));
      }
    }
  });
  var h = new t(),
      u = new t(),
      f = new e();
  return a.prototype.getValue = function (t, i) {
    var e = this._velocityVectorProperty._getValue(t, u, h);

    if (n(e)) return c.rotationMatrixFromPositionVelocity(h, e, this._ellipsoid, f), l.fromRotationMatrix(f, i);
  }, a.prototype.equals = function (t) {
    return this === t || t instanceof a && d.equals(this._velocityVectorProperty, t._velocityVectorProperty) && (this._ellipsoid === t._ellipsoid || this._ellipsoid.equals(t._ellipsoid));
  }, a;
});