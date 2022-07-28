"use strict";

define(["../../Core/defined", "../../Core/defineProperties", "../../Core/Event", "../../Core/Color", "../../Core/buildModuleUrl", "../../DataSources/createPropertyDescriptor", "../../DataSources/Property", "../../Scene/Material"], function (e, g, i, c, a, b, h, f) {
  function d(j, k) {
    this._definitionChanged = new i();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = j || c.BLUE;
    this.duration = k || 2000;
    this._time = new Date().getTime();
  }

  g(d.prototype, {
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

  d.prototype.getType = function (j) {
    return "PolylineTrailWall";
  };

  d.prototype.getValue = function (k, j) {
    if (!e(j)) {
      j = {};
    }

    j.color = h.getValueOrClonedDefault(this._color, k, c.WHITE, j.color);
    j.image = f.PolylineTrailWallImage;
    j.time = (new Date().getTime() - this._time) % this.duration / this.duration;
    return j;
  };

  d.prototype.equals = function (j) {
    return this === j || j instanceof d && h.equals(this._color, j._color);
  };

  f.PolylineTrailWallType = "PolylineTrailWall";
  f.PolylineTrailWallImage = a("Assets/Images/colors-blue2.png");
  f.PolylineTrailWallSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n                                                    {\n                                                        czm_material material = czm_getDefaultMaterial(materialInput);\n                                                        vec2 st = materialInput.st;\n                                                        vec4 colorImage = texture2D(image, vec2(fract(st.t - time), st.t));\n                                                        material.alpha = colorImage.a * color.a;\n                                                        material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n                                                        return material;\n                                                    }";

  f._materialCache.addMaterial(f.PolylineTrailWallType, {
    fabric: {
      type: f.PolylineTrailWallType,
      uniforms: {
        color: new c(1, 0, 0, 0.5),
        image: f.PolylineTrailWallImage,
        time: 0
      },
      source: f.PolylineTrailWallSource
    },
    translucent: function translucent(j) {
      return true;
    }
  });

  return d;
});