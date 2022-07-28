"use strict";

define(["../../Core/defined", "../../Core/defineProperties", "../../Core/Event", "../../Core/Color", "../../Core/buildModuleUrl", "../../DataSources/createPropertyDescriptor", "../../DataSources/Property", "../../Scene/Material"], function (d, f, i, c, a, b, g, e) {
  function h(j, k) {
    this._definitionChanged = new i();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = j;
    this.duration = k;
    this._time = new Date().getTime();
  }

  f(h.prototype, {
    isConstant: {
      get: function get() {
        return false;
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    color: b("color")
  });

  h.prototype.getType = function (j) {
    return "EllipsoidFade";
  };

  h.prototype.getValue = function (k, j) {
    if (!d(j)) {
      j = {};
    }

    j.color = g.getValueOrClonedDefault(this._color, k, c.WHITE, j.color);
    j.time = (new Date().getTime() - this._time) % this.duration / this.duration;
    return j;
  };

  h.prototype.equals = function (j) {
    return this === j || j instanceof h && g.equals(this._color, j._color);
  };

  e.EllipsoidFadeType = "EllipsoidFade";
  e.EllipsoidFadeSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n" + "{\n" + "czm_material material = czm_getDefaultMaterial(materialInput);\n" + "material.diffuse = 1.5 * color.rgb;\n" + "vec2 st = materialInput.st;\n" + "float dis = distance(st, vec2(0.5, 0.5));\n" + "float per = fract(time);\n" + "if(dis > per * 0.5){\n" + "material.alpha = 0.0;\n" + "discard;\n" + "}else {\n" + "material.alpha = color.a  * dis / per / 1.5;\n" + "}\n" + "return material;\n" + "}";

  e._materialCache.addMaterial(e.EllipsoidFadeType, {
    fabric: {
      type: e.EllipsoidFadeType,
      uniforms: {
        color: new c(1, 0, 0, 1),
        time: 0
      },
      source: e.EllipsoidFadeSource
    },
    translucent: function translucent(j) {
      return true;
    }
  });

  return h;
});