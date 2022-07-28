"use strict";

define(["../../Core/defaultValue", "../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/DeveloperError", "../../Core/EventHelper", "../../Scene/SceneMode", "../../ThirdParty/knockout", "../createCommand"], function (t, i, o, e, n, s, u, p, h) {
  "use strict";

  function r(o, e) {
    if (!i(o)) throw new n("scene is required.");
    this._scene = o;
    var r = this;
    this._eventHelper = new s(), this._eventHelper.add(o.morphStart, function (o, e, t, i) {
      r.sceneMode = t, r.dropDownVisible = !1;
    }), this._duration = t(e, 2), this.sceneMode = o.mode, this.dropDownVisible = !1, this.tooltip2D = "2D", this.tooltip3D = "3D", this.tooltipColumbusView = "Columbus View", p.track(this, ["sceneMode", "dropDownVisible", "tooltip2D", "tooltip3D", "tooltipColumbusView"]), this.selectedTooltip = void 0, p.defineProperty(this, "selectedTooltip", function () {
      var o = r.sceneMode;
      return o === u.SCENE2D ? r.tooltip2D : o === u.SCENE3D ? r.tooltip3D : r.tooltipColumbusView;
    }), this._toggleDropDown = h(function () {
      r.dropDownVisible = !r.dropDownVisible;
    }), this._morphTo2D = h(function () {
      o.morphTo2D(r._duration);
    }), this._morphTo3D = h(function () {
      o.morphTo3D(r._duration);
    }), this._morphToColumbusView = h(function () {
      o.morphToColumbusView(r._duration);
    }), this._sceneMode = u;
  }

  return o(r.prototype, {
    scene: {
      get: function get() {
        return this._scene;
      }
    },
    duration: {
      get: function get() {
        return this._duration;
      },
      set: function set(o) {
        if (o < 0) throw new n("duration value must be positive.");
        this._duration = o;
      }
    },
    toggleDropDown: {
      get: function get() {
        return this._toggleDropDown;
      }
    },
    morphTo2D: {
      get: function get() {
        return this._morphTo2D;
      }
    },
    morphTo3D: {
      get: function get() {
        return this._morphTo3D;
      }
    },
    morphToColumbusView: {
      get: function get() {
        return this._morphToColumbusView;
      }
    }
  }), r.prototype.isDestroyed = function () {
    return !1;
  }, r.prototype.destroy = function () {
    this._eventHelper.removeAll(), e(this);
  }, r;
});