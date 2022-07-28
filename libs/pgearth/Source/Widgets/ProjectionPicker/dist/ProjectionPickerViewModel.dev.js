"use strict";

define(["../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/DeveloperError", "../../Core/EventHelper", "../../Core/OrthographicFrustum", "../../Scene/SceneMode", "../../ThirdParty/knockout", "../createCommand"], function (t, e, o, r, n, s, c, h, p) {
  "use strict";

  function i(e) {
    if (!t(e)) throw new r("scene is required.");
    this._scene = e, this._orthographic = e.camera.frustum instanceof s, this._flightInProgress = !1, this.dropDownVisible = !1, this.tooltipPerspective = "Perspective Projection", this.tooltipOrthographic = "Orthographic Projection", this.selectedTooltip = void 0, this.sceneMode = e.mode, h.track(this, ["_orthographic", "_flightInProgress", "sceneMode", "dropDownVisible", "tooltipPerspective", "tooltipOrthographic"]);
    var i = this;
    h.defineProperty(this, "selectedTooltip", function () {
      return i._orthographic ? i.tooltipOrthographic : i.tooltipPerspective;
    }), this._toggleDropDown = p(function () {
      i.sceneMode === c.SCENE2D || i._flightInProgress || (i.dropDownVisible = !i.dropDownVisible);
    }), this._eventHelper = new n(), this._eventHelper.add(e.morphComplete, function (e, t, o, r) {
      i.sceneMode = o, i._orthographic = o === c.SCENE2D || i._scene.camera.frustum instanceof s;
    }), this._eventHelper.add(e.preRender, function () {
      i._flightInProgress = t(e.camera._currentFlight);
    }), this._switchToPerspective = p(function () {
      i.sceneMode !== c.SCENE2D && (i._scene.camera.switchToPerspectiveFrustum(), i._orthographic = !1, i.dropDownVisible = !1);
    }), this._switchToOrthographic = p(function () {
      i.sceneMode !== c.SCENE2D && (i._scene.camera.switchToOrthographicFrustum(), i._orthographic = !0, i.dropDownVisible = !1);
    }), this._sceneMode = c;
  }

  return e(i.prototype, {
    scene: {
      get: function get() {
        return this._scene;
      }
    },
    toggleDropDown: {
      get: function get() {
        return this._toggleDropDown;
      }
    },
    switchToPerspective: {
      get: function get() {
        return this._switchToPerspective;
      }
    },
    switchToOrthographic: {
      get: function get() {
        return this._switchToOrthographic;
      }
    },
    isOrthographicProjection: {
      get: function get() {
        return this._orthographic;
      }
    }
  }), i.prototype.isDestroyed = function () {
    return !1;
  }, i.prototype.destroy = function () {
    this._eventHelper.removeAll(), o(this);
  }, i;
});