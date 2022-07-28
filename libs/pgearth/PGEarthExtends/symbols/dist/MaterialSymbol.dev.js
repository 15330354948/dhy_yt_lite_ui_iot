"use strict";

define(["../../Source/Core/Check", "../../Source/Core/defaultValue", "../../Source/Core/RuntimeError", "../../Source/Scene/Material", "../../Source/Core/Color", "../_Color"], function (e, r, o, n, t, a) {
  return function (i) {
    if (!i) throw new o("options is required");
    if (e.typeOf.object("options", i), !i.type) throw new o("type is required");
    var s;
    return "Water" === i.type ? s = new n({
      fabric: {
        type: i.type,
        uniforms: {
          specularMap: r(i.standards.specularMap, ""),
          normalMap: r(i.standards.normalMap, require.toUrl("./Source/Assets/Textures/waterNormals.jpg")),
          frequency: r(i.standards.frequency, 1e3),
          animationSpeed: r(i.standards.animationSpeed, .01),
          amplitude: r(i.standards.amplitude, 1),
          baseWaterColor: r(a(i.standards.color), t.DARKBLUE),
          blendColor: r(a(i.standards.blendColor), t.DARKBLUE),
          specularIntensity: r(i.standards.specularIntensity, .01)
        }
      }
    }) : "Color" === i.type ? s = new n({
      fabric: {
        type: "Color",
        uniforms: {
          color: r(new a(i.color), t.WHITE)
        }
      }
    }) : "RimLighting" === i.type && (s = new n({
      fabric: {
        type: "RimLighting",
        uniforms: {
          color: r(new a(i.color), new t(1, 0, 0, .7)),
          rimColor: r(new a(i.rimColor), new t(1, 1, 1, .4)),
          width: r(i.width, 0)
        }
      }
    })), s;
  };
});