"use strict";

define(["../../Core/defined", "../../Core/defineProperties", "../../Core/Event", "../../Core/Color", "../../Core/defaultValue", "../../DataSources/createPropertyDescriptor", "../../DataSources/Property", "../../Scene/Material"], function (c, e, i, b, g, a, f, d) {
  function h(j) {
    j = g(j, g.EMPTY_OBJECT);
    this._definitionChanged = new i();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = j.color || b.fromBytes(0, 255, 255, 255);
    this._duration = undefined;
    this._durationSubscription = undefined;
    this.duration = g(j.duration, 45);
  }

  e(h.prototype, {
    "isConstant": {
      "get": function get() {
        return false;
      }
    },
    "definitionChanged": {
      "get": function get() {
        return this._definitionChanged;
      }
    }
  });

  h.prototype.getType = function (j) {
    return d.PolylineFlowType;
  };

  h.prototype.getValue = function (j, k) {
    if (!k) {
      k = {};
    }

    k.color = f.getValueOrClonedDefault(this._color, j, b.WHITE, k.color);
    k.duration = this._duration;
    return k;
  };

  h.prototype.equals = function (j) {
    return this === j || j instanceof h && f.equals(this._color, j._color);
  };

  e(h.prototype, {
    "color": a("color"),
    "duration": a("duration")
  });
  d.PolylineFlowType = "PolylineFlow";

  d._materialCache.addMaterial(d.PolylineFlowType, {
    "fabric": {
      "type": d.PolylineFlowType,
      "uniforms": {
        "color": new b(1, 1, 2, 0.7),
        "duration": 45
      },
      "source": "uniform vec4 color;" + "uniform float duration;" + "czm_material czm_getMaterial(czm_materialInput materialInput){" + "czm_material material = czm_getDefaultMaterial(materialInput);" + "vec2 st = materialInput.st;" + "float t =fract(czm_frameNumber / duration);" + "t *= 1.03;" + "float alpha = smoothstep(t- 0.03, t, st.s) * step(-t, -st.s);" + "alpha += 0.1;" + "vec4 fragColor;" + "fragColor.rgb = (color.rgb) / 0.5;" + "fragColor = czm_gammaCorrect(fragColor);" + "material.diffuse = fragColor.rgb;" + "material.alpha = alpha;" + "material.emission = fragColor.rgb;" + "return material;" + "}"
    },
    "translucent": function translucent(j) {
      return true;
    }
  });

  return h;
});