"use strict";

define(["../Core/Cartesian2", "../Core/Check", "../Renderer/PixelDatatype", "./ClippingPlaneCollection"], function (n, r, i, m) {
  "use strict";

  var s = new n();
  return function (n, i) {
    r.typeOf.object("clippingPlaneCollection", n), r.typeOf.object("context", i);
    var e = n.unionClippingRegions,
        l = n.length,
        p = m.useFloatTexture(i),
        t = m.getTextureResolution(n, i, s),
        a = t.x,
        o = t.y,
        c = (p ? function (n, i) {
      var e = 1 / i,
          l = 1 / n + "";
      -1 === l.indexOf(".") && (l += ".0");
      var p = e + "";
      -1 === p.indexOf(".") && (p += ".0");
      return "vec4 getClippingPlane(sampler2D packedClippingPlanes, int clippingPlaneNumber, mat4 transform)\n{\n    int pixY = clippingPlaneNumber / " + n + ";\n    int pixX = clippingPlaneNumber - (pixY * " + n + ");\n    float u = (float(pixX) + 0.5) * " + l + ";\n    float v = (float(pixY) + 0.5) * " + p + ";\n    vec4 plane = texture2D(packedClippingPlanes, vec2(u, v));\n    return czm_transformPlane(plane, transform);\n}\n";
    } : function (n, i) {
      var e = 1 / i,
          l = 1 / n + "";
      -1 === l.indexOf(".") && (l += ".0");
      var p = e + "";
      -1 === p.indexOf(".") && (p += ".0");
      return "vec4 getClippingPlane(sampler2D packedClippingPlanes, int clippingPlaneNumber, mat4 transform)\n{\n    int clippingPlaneStartIndex = clippingPlaneNumber * 2;\n    int pixY = clippingPlaneStartIndex / " + n + ";\n    int pixX = clippingPlaneStartIndex - (pixY * " + n + ");\n    float u = (float(pixX) + 0.5) * " + l + ";\n    float v = (float(pixY) + 0.5) * " + p + ";\n    vec4 oct32 = texture2D(packedClippingPlanes, vec2(u, v)) * 255.0;\n    vec2 oct = vec2(oct32.x * 256.0 + oct32.y, oct32.z * 256.0 + oct32.w);\n    vec4 plane;\n    plane.xyz = czm_octDecode(oct, 65535.0);\n    plane.w = czm_unpackFloat(texture2D(packedClippingPlanes, vec2(u + " + l + ", v)));\n    return czm_transformPlane(plane, transform);\n}\n";
    })(a, o);
    return c += "\n", c += e ? "float clip(vec4 fragCoord, sampler2D clippingPlanes, mat4 clippingPlanesMatrix)\n{\n    vec4 position = czm_windowToEyeCoordinates(fragCoord);\n    vec3 clipNormal = vec3(0.0);\n    vec3 clipPosition = vec3(0.0);\n    float clipAmount;\n    float pixelWidth = czm_metersPerPixel(position);\n    bool breakAndDiscard = false;\n    for (int i = 0; i < " + l + "; ++i)\n    {\n        vec4 clippingPlane = getClippingPlane(clippingPlanes, i, clippingPlanesMatrix);\n        clipNormal = clippingPlane.xyz;\n        clipPosition = -clippingPlane.w * clipNormal;\n        float amount = dot(clipNormal, (position.xyz - clipPosition)) / pixelWidth;\n        clipAmount = czm_branchFreeTernary(i == 0, amount, min(amount, clipAmount));\n        if (amount <= 0.0)\n        {\n           breakAndDiscard = true;\n           break;\n        }\n    }\n    if (breakAndDiscard) {\n        discard;\n    }\n    return clipAmount;\n}\n" : "float clip(vec4 fragCoord, sampler2D clippingPlanes, mat4 clippingPlanesMatrix)\n{\n    bool clipped = true;\n    vec4 position = czm_windowToEyeCoordinates(fragCoord);\n    vec3 clipNormal = vec3(0.0);\n    vec3 clipPosition = vec3(0.0);\n    float clipAmount = 0.0;\n    float pixelWidth = czm_metersPerPixel(position);\n    for (int i = 0; i < " + l + "; ++i)\n    {\n        vec4 clippingPlane = getClippingPlane(clippingPlanes, i, clippingPlanesMatrix);\n        clipNormal = clippingPlane.xyz;\n        clipPosition = -clippingPlane.w * clipNormal;\n        float amount = dot(clipNormal, (position.xyz - clipPosition)) / pixelWidth;\n        clipAmount = max(amount, clipAmount);\n        clipped = clipped && (amount <= 0.0);\n    }\n    if (clipped)\n    {\n        discard;\n    }\n    return clipAmount;\n}\n";
  };
});