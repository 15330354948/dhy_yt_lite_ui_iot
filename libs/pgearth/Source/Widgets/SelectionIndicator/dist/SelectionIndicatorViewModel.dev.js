"use strict";

define(["../../Core/Cartesian2", "../../Core/defaultValue", "../../Core/defined", "../../Core/defineProperties", "../../Core/DeveloperError", "../../Core/EasingFunction", "../../Scene/SceneTransforms", "../../ThirdParty/knockout"], function (e, n, r, t, o, i, s, c) {
  "use strict";

  var a = new e(),
      h = "-1000px";

  function p(i, e, t) {
    if (!r(i)) throw new o("scene is required.");
    if (!r(e)) throw new o("selectionIndicatorElement is required.");
    if (!r(t)) throw new o("container is required.");
    this._scene = i, this._screenPositionX = h, this._screenPositionY = h, this._tweens = i.tweens, this._container = n(t, document.body), this._selectionIndicatorElement = e, this._scale = 1, this.position = void 0, this.showSelection = !1, c.track(this, ["position", "_screenPositionX", "_screenPositionY", "_scale", "showSelection"]), this.isVisible = void 0, c.defineProperty(this, "isVisible", {
      get: function get() {
        return this.showSelection && r(this.position);
      }
    }), c.defineProperty(this, "_transform", {
      get: function get() {
        return "scale(" + this._scale + ")";
      }
    }), this.computeScreenSpacePosition = function (e, t) {
      return s.wgs84ToWindowCoordinates(i, e, t);
    };
  }

  return p.prototype.update = function () {
    var e, t, i, n, o, s;
    this.showSelection && r(this.position) && (e = this.computeScreenSpacePosition(this.position, a), r(e) ? (i = (t = this._container).parentNode.clientWidth, n = t.parentNode.clientHeight, s = .5 * (o = this._selectionIndicatorElement.clientWidth), e.x = Math.min(Math.max(e.x, -o), i + o) - s, e.y = Math.min(Math.max(e.y, -o), n + o) - s, this._screenPositionX = Math.floor(e.x + .25) + "px", this._screenPositionY = Math.floor(e.y + .25) + "px") : (this._screenPositionX = h, this._screenPositionY = h));
  }, p.prototype.animateAppear = function () {
    this._tweens.addProperty({
      object: this,
      property: "_scale",
      startValue: 2,
      stopValue: 1,
      duration: .8,
      easingFunction: i.EXPONENTIAL_OUT
    });
  }, p.prototype.animateDepart = function () {
    this._tweens.addProperty({
      object: this,
      property: "_scale",
      startValue: this._scale,
      stopValue: 1.5,
      duration: .8,
      easingFunction: i.EXPONENTIAL_OUT
    });
  }, t(p.prototype, {
    container: {
      get: function get() {
        return this._container;
      }
    },
    selectionIndicatorElement: {
      get: function get() {
        return this._selectionIndicatorElement;
      }
    },
    scene: {
      get: function get() {
        return this._scene;
      }
    }
  }), p;
});