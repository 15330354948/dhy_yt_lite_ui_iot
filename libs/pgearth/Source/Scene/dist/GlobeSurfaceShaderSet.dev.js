"use strict";

define(["../Core/defined", "../Core/destroyObject", "../Core/TerrainQuantization", "../Renderer/ShaderProgram", "./getClippingFunction", "./SceneMode"], function (X, s, j, k, Q, q) {
  "use strict";

  function Z(e, t, r, o, n) {
    this.numberOfDayTextures = e, this.flags = t, this.material = r, this.shaderProgram = o, this.clippingShaderState = n;
  }

  function e() {
    this.baseVertexShaderSource = void 0, this.baseFragmentShaderSource = void 0, this._shadersByTexturesFlags = [], this.material = void 0;
  }

  return e.prototype.getShaderProgram = function (e) {
    var t = e.frameState,
        r = e.surfaceTile,
        o = e.numberOfDayTextures,
        n = e.applyBrightness,
        s = e.applyContrast,
        a = e.applyHue,
        i = e.applySaturation,
        u = e.applyGamma,
        d = e.applyAlpha,
        h = e.applySplit,
        l = e.showReflectiveOcean,
        c = e.showOceanWaves,
        p = e.enableLighting,
        _ = e.showGroundAtmosphere,
        T = e.perFragmentGroundAtmosphere,
        A = e.hasVertexNormals,
        C = e.useWebMercatorProjection,
        f = e.enableFog,
        g = e.enableClippingPlanes,
        E = e.clippingPlanes,
        x = e.clippedByBoundaries,
        P = e.hasImageryLayerCutout,
        S = e.colorCorrect,
        v = e.highlightFillTile,
        y = e.colorToAlpha,
        L = 0,
        O = "",
        R = r.renderedMesh.encoding;
    R.quantization === j.BITS12 && (L = 1, O = "QUANTIZATION_BITS12");
    var m = 0,
        I = "";
    X(r.vertexArray) && X(r.terrainData) && !r.terrainData._createdByUpsampling || (m = 1, I = "DISABLE_GL_POSITION_LOG_DEPTH");
    var N = 0,
        G = "";
    x && (N = 1, G = "TILE_LIMIT_RECTANGLE");
    var D = 0,
        B = "";
    P && (D = 1, B = "APPLY_IMAGERY_CUTOUT");
    var H = t.mode,
        F = H | n << 2 | s << 3 | a << 4 | i << 5 | u << 6 | d << 7 | l << 8 | c << 9 | p << 10 | _ << 11 | T << 12 | A << 13 | C << 14 | f << 15 | L << 16 | h << 17 | g << 18 | m << 19 | N << 20 | D << 21 | S << 22 | v << 23 | y << 24,
        M = 0;
    X(E) && 0 < E.length && (M = g ? E.clippingPlanesState : 0);
    var b = r.surfaceShader;
    if (X(b) && b.numberOfDayTextures === o && b.flags === F && b.material === this.material && b.clippingShaderState === M) return b.shaderProgram;
    var U = this._shadersByTexturesFlags[o];

    if (X(U) || (U = this._shadersByTexturesFlags[o] = []), b = U[F], !X(b) || b.material !== this.material || b.clippingShaderState !== M) {
      var Y = this.baseVertexShaderSource.clone(),
          V = this.baseFragmentShaderSource.clone();
      0 !== M && V.sources.unshift(Q(E, t.context)), Y.defines.push(O, I), V.defines.push("TEXTURE_UNITS " + o, G, B), n && V.defines.push("APPLY_BRIGHTNESS"), s && V.defines.push("APPLY_CONTRAST"), a && V.defines.push("APPLY_HUE"), i && V.defines.push("APPLY_SATURATION"), u && V.defines.push("APPLY_GAMMA"), d && V.defines.push("APPLY_ALPHA"), l && (V.defines.push("SHOW_REFLECTIVE_OCEAN"), Y.defines.push("SHOW_REFLECTIVE_OCEAN")), c && V.defines.push("SHOW_OCEAN_WAVES"), y && V.defines.push("APPLY_COLOR_TO_ALPHA"), p && (A ? (Y.defines.push("ENABLE_VERTEX_LIGHTING"), V.defines.push("ENABLE_VERTEX_LIGHTING")) : (Y.defines.push("ENABLE_DAYNIGHT_SHADING"), V.defines.push("ENABLE_DAYNIGHT_SHADING"))), _ && (Y.defines.push("GROUND_ATMOSPHERE"), V.defines.push("GROUND_ATMOSPHERE"), T && V.defines.push("PER_FRAGMENT_GROUND_ATMOSPHERE")), Y.defines.push("INCLUDE_WEB_MERCATOR_Y"), V.defines.push("INCLUDE_WEB_MERCATOR_Y"), f && (Y.defines.push("FOG"), V.defines.push("FOG")), h && V.defines.push("APPLY_SPLIT"), g && V.defines.push("ENABLE_CLIPPING_PLANES"), S && V.defines.push("COLOR_CORRECT"), v && V.defines.push("HIGHLIGHT_FILL_TILE");
      var W = "    vec4 computeDayColor(vec4 initialColor, vec3 textureCoordinates)\n    {\n        vec4 color = initialColor;\n";
      P && (W += "        vec4 cutoutAndColorResult;\n        bool texelUnclipped;\n");

      for (var w = 0; w < o; ++w) {
        W += P ? "        cutoutAndColorResult = u_dayTextureCutoutRectangles[" + w + "];\n        texelUnclipped = v_textureCoordinates.x < cutoutAndColorResult.x || cutoutAndColorResult.z < v_textureCoordinates.x || v_textureCoordinates.y < cutoutAndColorResult.y || cutoutAndColorResult.w < v_textureCoordinates.y;\n        cutoutAndColorResult = sampleAndBlend(\n" : "        color = sampleAndBlend(\n", W += "            color,\n            u_dayTextures[" + w + "],\n            u_dayTextureUseWebMercatorT[" + w + "] ? textureCoordinates.xz : textureCoordinates.xy,\n            u_dayTextureTexCoordsRectangle[" + w + "],\n            u_dayTextureTranslationAndScale[" + w + "],\n            " + (d ? "u_dayTextureAlpha[" + w + "]" : "1.0") + ",\n            " + (n ? "u_dayTextureBrightness[" + w + "]" : "0.0") + ",\n            " + (s ? "u_dayTextureContrast[" + w + "]" : "0.0") + ",\n            " + (a ? "u_dayTextureHue[" + w + "]" : "0.0") + ",\n            " + (i ? "u_dayTextureSaturation[" + w + "]" : "0.0") + ",\n            " + (u ? "u_dayTextureOneOverGamma[" + w + "]" : "0.0") + ",\n            " + (h ? "u_dayTextureSplit[" + w + "]" : "0.0") + ",\n            " + (y ? "u_colorsToAlpha[" + w + "]" : "vec4(0.0)") + "\n        );\n", P && (W += "        color = czm_branchFreeTernary(texelUnclipped, cutoutAndColorResult, color);\n");
      }

      W += "        return color;\n    }", V.sources.push(W), Y.sources.push(function (e) {
        var t;

        switch (e) {
          case q.SCENE3D:
            t = "vec4 getPosition(vec3 position, float height, vec2 textureCoordinates) { return getPosition3DMode(position, height, textureCoordinates); }";
            break;

          case q.SCENE2D:
          case q.COLUMBUS_VIEW:
            t = "vec4 getPosition(vec3 position, float height, vec2 textureCoordinates) { return getPositionColumbusViewMode(position, height, textureCoordinates); }";
            break;

          case q.MORPHING:
            t = "vec4 getPosition(vec3 position, float height, vec2 textureCoordinates) { return getPositionMorphingMode(position, height, textureCoordinates); }";
        }

        return t;
      }(H)), Y.sources.push(C ? "float get2DYPositionFraction(vec2 textureCoordinates) { return get2DMercatorYPositionFraction(textureCoordinates); }" : "float get2DYPositionFraction(vec2 textureCoordinates) { return get2DGeographicYPositionFraction(textureCoordinates); }");
      var z = k.fromCache({
        context: t.context,
        vertexShaderSource: Y,
        fragmentShaderSource: V,
        attributeLocations: R.getAttributeLocations()
      }),
          b = U[F] = new Z(o, F, this.material, z, M);
    }

    return (r.surfaceShader = b).shaderProgram;
  }, e.prototype.destroy = function () {
    var e,
        t,
        r = this._shadersByTexturesFlags;

    for (var o in r) {
      if (r.hasOwnProperty(o)) {
        var n = r[o];
        if (!X(n)) continue;

        for (e in n) {
          n.hasOwnProperty(e) && (t = n[e], X(t) && t.shaderProgram.destroy());
        }
      }
    }

    return s(this);
  }, e;
});