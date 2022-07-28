"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

define(["../Core/Cartesian2", "../Core/clone", "../Core/Color", "../Core/combine", "../Core/createGuid", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/isArray", "../Core/loadCRN", "../Core/loadKTX", "../Core/Matrix2", "../Core/Matrix3", "../Core/Matrix4", "../Core/Resource", "../Renderer/CubeMap", "../Renderer/Texture", "../Shaders/Materials/AspectRampMaterial", "../Shaders/Materials/BumpMapMaterial", "../Shaders/Materials/CheckerboardMaterial", "../Shaders/Materials/DotMaterial", "../Shaders/Materials/ElevationContourMaterial", "../Shaders/Materials/ElevationRampMaterial", "../Shaders/Materials/FadeMaterial", "../Shaders/Materials/GridMaterial", "../Shaders/Materials/NormalMapMaterial", "../Shaders/Materials/PolylineArrowMaterial", "../Shaders/Materials/PolylineDashMaterial", "../Shaders/Materials/PolylineGlowMaterial", "../Shaders/Materials/PolylineOutlineMaterial", "../Shaders/Materials/RimLightingMaterial", "../Shaders/Materials/SlopeRampMaterial", "../Shaders/Materials/StripeMaterial", "../Shaders/Materials/Water", "../ThirdParty/when"], function (e, o, a, s, l, u, _, t, n, v, c, g, M, r, i, p, C, w, T, m, f, h, d, y, b, I, x, P, D, S, E, O, R, F, A, L, k) {
  "use strict";

  function N(e) {
    this.type = void 0, this.shaderSource = void 0, this.materials = void 0, this.uniforms = void 0, this._uniforms = void 0, this.translucent = void 0, this._strict = void 0, this._template = void 0, this._count = void 0, this._texturePaths = {}, this._loadedImages = [], this._loadedCubeMaps = [], this._textures = {}, this._updateFunctions = [], this._defaultTexture = void 0, function (e, a) {
      var t;
      e = u(e, u.EMPTY_OBJECT), a._strict = u(e.strict, !1), a._count = u(e.count, 0), a._template = o(u(e.fabric, u.EMPTY_OBJECT)), a._template.uniforms = o(u(a._template.uniforms, u.EMPTY_OBJECT)), a._template.materials = o(u(a._template.materials, u.EMPTY_OBJECT)), a.type = _(a._template.type) ? a._template.type : l(), a.shaderSource = "", a.materials = {}, a.uniforms = {}, a._uniforms = {}, a._translucentFunctions = [];

      var r = N._materialCache.getMaterial(a.type);

      {
        var i;
        _(r) && (i = o(r.fabric, !0), a._template = s(a._template, i, !0), t = r.translucent);
      }
      (function (e) {
        var a = e._template,
            t = a.uniforms,
            r = a.materials,
            i = a.components;
        if (_(i) && _(a.source)) throw new v("fabric: cannot have source and components in the same template.");
        z(a, Y, G, !0), z(i, W, G, !0);
        var n = [];

        for (var o in r) {
          r.hasOwnProperty(o) && n.push(o);
        }

        z(t, n, B, !1);
      })(a), _(r) || N._materialCache.addMaterial(a.type, a);
      (function (e) {
        var a = e._template.components,
            t = e._template.source;
        if (_(t)) e.shaderSource += t + "\n";else {
          if (e.shaderSource += "czm_material czm_getMaterial(czm_materialInput materialInput)\n{\n", e.shaderSource += "czm_material material = czm_getDefaultMaterial(materialInput);\n", _(a)) for (var r in a) {
            a.hasOwnProperty(r) && (e.shaderSource += "diffuse" === r || "emission" === r ? "material." + r + " = czm_gammaCorrect(" + a[r] + "); \n" : "alpha" === r ? "material.alpha = czm_gammaCorrect(vec4(vec3(0.0), " + a.alpha + ")).a; \n" : "material." + r + " = " + a[r] + ";\n");
          }
          e.shaderSource += "return material;\n}\n";
        }
      })(a), function (e) {
        var a = e._template.uniforms;

        for (var t in a) {
          a.hasOwnProperty(t) && !function e(a, t) {
            var r = a._strict;
            var i = a._template.uniforms;
            var n = i[t];
            var o = j(n);
            if (!_(o)) throw new v("fabric: uniform '" + t + "' has invalid type.");

            if ("channels" === o) {
              if (0 === J(a, t, n, !1) && r) throw new v("strict: shader source does not use channels '" + t + "'.");
            } else {
              var s;
              "sampler2D" !== o || 0 < J(a, d = s = t + "Dimensions", d, y) && (i[s] = {
                type: "ivec3",
                x: 1,
                y: 1
              }, e(a, s));
              var l,
                  u = new RegExp("uniform\\s+" + o + "\\s+" + t + "\\s*;");
              u.test(a.shaderSource) || (l = "uniform " + o + " " + t + ";", a.shaderSource = l + a.shaderSource);
              var c,
                  p = t + "_" + a._count++;
              if (1 === J(a, t, p) && r) throw new v("strict: shader source does not use uniform '" + t + "'.");
              a.uniforms[t] = n, "sampler2D" === o ? (a._uniforms[p] = function () {
                return a._textures[t];
              }, a._updateFunctions.push((f = t, function (a, e) {
                var t = a.uniforms,
                    r = t[f],
                    i = h !== r;
                h = r;
                var n,
                    o,
                    s,
                    l,
                    u,
                    c = a._textures[f];
                if (r instanceof HTMLVideoElement) {
                  if (2 <= r.readyState) {
                    if (i && _(c) && (c !== e.defaultTexture && c.destroy(), c = void 0), !_(c) || c === e.defaultTexture) return c = new T({
                      context: e,
                      source: r
                    }), void (a._textures[f] = c);
                    c.copyFrom(r);
                  } else _(c) || (a._textures[f] = e.defaultTexture);
                } else {
                  if (r instanceof T && r !== c) {
                    a._texturePaths[f] = void 0;
                    var p = a._textures[f];
                    return p !== a._defaultTexture && p.destroy(), a._textures[f] = r, n = f + "Dimensions", void (t.hasOwnProperty(n) && ((o = t[n]).x = r._width, o.y = r._height));
                  }

                  _(c) || (a._texturePaths[f] = void 0, _(a._defaultTexture) || (a._defaultTexture = e.defaultTexture), c = a._textures[f] = a._defaultTexture, n = f + "Dimensions", t.hasOwnProperty(n) && ((o = t[n]).x = c._width, o.y = c._height)), r !== N.DefaultImageId && (s = r instanceof C, (!_(a._texturePaths[f]) || s && r.url !== a._texturePaths[f].url || !s && r !== a._texturePaths[f]) && ("string" == typeof r || s ? (l = s ? r : C.createIfNeeded(r), u = X.test(r) ? M(l) : Z.test(r) ? g(l) : l.fetchImage(), k(u, function (e) {
                    a._loadedImages.push({
                      id: f,
                      image: e
                    });
                  })) : (r instanceof HTMLCanvasElement || r instanceof HTMLImageElement) && a._loadedImages.push({
                    id: f,
                    image: r
                  }), a._texturePaths[f] = r));
                }
              }))) : "samplerCube" === o ? (a._uniforms[p] = function () {
                return a._textures[t];
              }, a._updateFunctions.push((m = t, function (a, e) {
                var t,
                    r,
                    i = a.uniforms[m];

                if (i instanceof w) {
                  var n = a._textures[m];
                  return n !== a._defaultTexture && n.destroy(), a._texturePaths[m] = void 0, void (a._textures[m] = i);
                }

                _(a._textures[m]) || (a._texturePaths[m] = void 0, a._textures[m] = e.defaultCubeMap), i === N.DefaultCubeMapId || (t = i.positiveX + i.negativeX + i.positiveY + i.negativeY + i.positiveZ + i.negativeZ) !== a._texturePaths[m] && (r = [C.createIfNeeded(i.positiveX).fetchImage(), C.createIfNeeded(i.negativeX).fetchImage(), C.createIfNeeded(i.positiveY).fetchImage(), C.createIfNeeded(i.negativeY).fetchImage(), C.createIfNeeded(i.positiveZ).fetchImage(), C.createIfNeeded(i.negativeZ).fetchImage()], k.all(r).then(function (e) {
                  a._loadedCubeMaps.push({
                    id: m,
                    images: e
                  });
                }), a._texturePaths[m] = t);
              }))) : -1 !== o.indexOf("mat") ? (c = new H[o](), a._uniforms[p] = function () {
                return H[o].fromColumnMajorArray(a.uniforms[t], c);
              }) : a._uniforms[p] = function () {
                return a.uniforms[t];
              };
            }

            var m;
            var f, h;
            var d, y;
          }(e, t);
        }
      }(a), function (e) {
        var a = e._strict,
            t = e._template.materials;

        for (var r in t) {
          if (t.hasOwnProperty(r)) {
            var i = new N({
              strict: a,
              fabric: t[r],
              count: e._count
            });
            e._count = i._count, e._uniforms = s(e._uniforms, i._uniforms, !0), e.materials[r] = i, e._translucentFunctions = e._translucentFunctions.concat(i._translucentFunctions);
            var n = "czm_getMaterial",
                o = n + "_" + e._count++;
            if (J(i, n, o), e.shaderSource = i.shaderSource + e.shaderSource, 0 === J(e, r, o + "(materialInput)") && a) throw new v("strict: shader source does not use material '" + r + "'.");
          }
        }
      }(a);
      var n = 0 === a._translucentFunctions.length || void 0;
      {
        t = u(t, n), t = u(e.translucent, t), _(t) && ("function" == typeof t ? a._translucentFunctions.push(function () {
          return t(a);
        }) : a._translucentFunctions.push(t));
      }
    }(e, this), t(this, {
      type: {
        value: this.type,
        writable: !1
      }
    }), _(N._uniformList[this.type]) || (N._uniformList[this.type] = Object.keys(this._uniforms));
  }

  function z(e, a, t, r) {
    if (_(e)) for (var i in e) {
      var n;
      e.hasOwnProperty(i) && (n = -1 !== a.indexOf(i), (r && !n || !r && n) && t(i, a));
    }
  }

  function G(e, a) {
    for (var t = "fabric: property name '" + e + "' is not valid. It should be ", r = 0; r < a.length; r++) {
      var i = "'" + a[r] + "'";
      t += r === a.length - 1 ? "or " + i + "." : i + ", ";
    }

    throw new v(t);
  }

  function B(e, a) {
    throw new v("fabric: uniforms and materials cannot share the same property '" + e + "'");
  }

  N._uniformList = {}, N.fromType = function (e, a) {
    if (!_(N._materialCache.getMaterial(e))) throw new v("material with type '" + e + "' does not exist.");
    var t = new N({
      fabric: {
        type: e
      }
    });
    if (_(a)) for (var r in a) {
      a.hasOwnProperty(r) && (t.uniforms[r] = a[r]);
    }
    return t;
  }, N.prototype.isTranslucent = function () {
    if (_(this.translucent)) return "function" == typeof this.translucent ? this.translucent() : this.translucent;

    for (var e = !0, a = this._translucentFunctions, t = a.length, r = 0; r < t; ++r) {
      var i = a[r];
      if (!(e = "function" == typeof i ? e && i() : e && i)) break;
    }

    return e;
  }, N.prototype.update = function (e) {
    for (var a = this._loadedImages, t = a.length, r = 0; r < t; ++r) {
      var i = a[r],
          n = i.id,
          o = i.image,
          s = _(o.internalFormat) ? new T({
        context: e,
        pixelFormat: o.internalFormat,
        width: o.width,
        height: o.height,
        source: {
          arrayBufferView: o.bufferView
        }
      }) : new T({
        context: e,
        source: o
      });
      this._textures[n] = s;
      var l,
          u = n + "Dimensions";
      this.uniforms.hasOwnProperty(u) && ((l = this.uniforms[u]).x = s._width, l.y = s._height);
    }

    a.length = 0;
    var c = this._loadedCubeMaps,
        t = c.length;

    for (r = 0; r < t; ++r) {
      var p = c[r];
      n = p.id;
      var m = p.images,
          f = new w({
        context: e,
        source: {
          positiveX: m[0],
          negativeX: m[1],
          positiveY: m[2],
          negativeY: m[3],
          positiveZ: m[4],
          negativeZ: m[5]
        }
      });
      this._textures[n] = f;
    }

    c.length = 0;
    var h = this._updateFunctions;

    for (t = h.length, r = 0; r < t; ++r) {
      h[r](this, e);
    }

    var d = this.materials;

    for (var y in d) {
      d.hasOwnProperty(y) && d[y].update(e);
    }
  }, N.prototype.isDestroyed = function () {
    return !1;
  }, N.prototype.destroy = function () {
    var e,
        a = this._textures;

    for (var t in a) {
      !a.hasOwnProperty(t) || (e = a[t]) !== this._defaultTexture && e.destroy();
    }

    var r = this.materials;

    for (var i in r) {
      r.hasOwnProperty(i) && r[i].destroy();
    }

    return n(this);
  };
  var Y = ["type", "materials", "uniforms", "components", "source"],
      W = ["diffuse", "specular", "shininess", "normal", "emission", "alpha"];
  var H = {
    mat2: r,
    mat3: i,
    mat4: p
  },
      X = /\.ktx$/i,
      Z = /\.crn$/i;

  function j(e) {
    var a = e.type;

    if (!_(a)) {
      var t = _typeof(e);

      if ("number" == t) a = "float";else if ("boolean" == t) a = "bool";else if ("string" == t || e instanceof C || e instanceof HTMLCanvasElement || e instanceof HTMLImageElement) a = /^([rgba]){1,4}$/i.test(e) ? "channels" : e === N.DefaultCubeMapId ? "samplerCube" : "sampler2D";else if ("object" == t) if (c(e)) 4 !== e.length && 9 !== e.length && 16 !== e.length || (a = "mat" + Math.sqrt(e.length));else {
        var r = 0;

        for (var i in e) {
          e.hasOwnProperty(i) && (r += 1);
        }

        2 <= r && r <= 4 ? a = "vec" + r : 6 === r && (a = "samplerCube");
      }
    }

    return a;
  }

  function J(e, a, r, t) {
    t = u(t, !0);
    var i = 0,
        n = new RegExp("([\\w" + (t ? "." : "") + "])?" + a + "([\\w])?", "g");
    return e.shaderSource = e.shaderSource.replace(n, function (e, a, t) {
      return a || t ? e : (i += 1, r);
    }), i;
  }

  return N._materialCache = {
    _materials: {},
    addMaterial: function addMaterial(e, a) {
      this._materials[e] = a;
    },
    getMaterial: function getMaterial(e) {
      return this._materials[e];
    }
  }, N.DefaultImageId = "czm_defaultImage", N.DefaultCubeMapId = "czm_defaultCubeMap", N.ColorType = "Color", N._materialCache.addMaterial(N.ColorType, {
    fabric: {
      type: N.ColorType,
      uniforms: {
        color: new a(1, 0, 0, .5)
      },
      components: {
        diffuse: "color.rgb",
        alpha: "color.a"
      }
    },
    translucent: function translucent(e) {
      return e.uniforms.color.alpha < 1;
    }
  }), N.ImageType = "Image", N._materialCache.addMaterial(N.ImageType, {
    fabric: {
      type: N.ImageType,
      uniforms: {
        image: N.DefaultImageId,
        repeat: new e(1, 1),
        color: new a(1, 1, 1, 1)
      },
      components: {
        diffuse: "texture2D(image, fract(repeat * materialInput.st)).rgb * color.rgb",
        alpha: "texture2D(image, fract(repeat * materialInput.st)).a * color.a"
      }
    },
    translucent: function translucent(e) {
      return e.uniforms.color.alpha < 1;
    }
  }), N.DiffuseMapType = "DiffuseMap", N._materialCache.addMaterial(N.DiffuseMapType, {
    fabric: {
      type: N.DiffuseMapType,
      uniforms: {
        image: N.DefaultImageId,
        channels: "rgb",
        repeat: new e(1, 1)
      },
      components: {
        diffuse: "texture2D(image, fract(repeat * materialInput.st)).channels"
      }
    },
    translucent: !1
  }), N.AlphaMapType = "AlphaMap", N._materialCache.addMaterial(N.AlphaMapType, {
    fabric: {
      type: N.AlphaMapType,
      uniforms: {
        image: N.DefaultImageId,
        channel: "a",
        repeat: new e(1, 1)
      },
      components: {
        alpha: "texture2D(image, fract(repeat * materialInput.st)).channel"
      }
    },
    translucent: !0
  }), N.SpecularMapType = "SpecularMap", N._materialCache.addMaterial(N.SpecularMapType, {
    fabric: {
      type: N.SpecularMapType,
      uniforms: {
        image: N.DefaultImageId,
        channel: "r",
        repeat: new e(1, 1)
      },
      components: {
        specular: "texture2D(image, fract(repeat * materialInput.st)).channel"
      }
    },
    translucent: !1
  }), N.EmissionMapType = "EmissionMap", N._materialCache.addMaterial(N.EmissionMapType, {
    fabric: {
      type: N.EmissionMapType,
      uniforms: {
        image: N.DefaultImageId,
        channels: "rgb",
        repeat: new e(1, 1)
      },
      components: {
        emission: "texture2D(image, fract(repeat * materialInput.st)).channels"
      }
    },
    translucent: !1
  }), N.BumpMapType = "BumpMap", N._materialCache.addMaterial(N.BumpMapType, {
    fabric: {
      type: N.BumpMapType,
      uniforms: {
        image: N.DefaultImageId,
        channel: "r",
        strength: .8,
        repeat: new e(1, 1)
      },
      source: f
    },
    translucent: !1
  }), N.NormalMapType = "NormalMap", N._materialCache.addMaterial(N.NormalMapType, {
    fabric: {
      type: N.NormalMapType,
      uniforms: {
        image: N.DefaultImageId,
        channels: "rgb",
        strength: .8,
        repeat: new e(1, 1)
      },
      source: P
    },
    translucent: !1
  }), N.GridType = "Grid", N._materialCache.addMaterial(N.GridType, {
    fabric: {
      type: N.GridType,
      uniforms: {
        color: new a(0, 1, 0, 1),
        cellAlpha: .1,
        lineCount: new e(8, 8),
        lineThickness: new e(1, 1),
        lineOffset: new e(0, 0)
      },
      source: x
    },
    translucent: function translucent(e) {
      var a = e.uniforms;
      return a.color.alpha < 1 || a.cellAlpha < 1;
    }
  }), N.StripeType = "Stripe", N._materialCache.addMaterial(N.StripeType, {
    fabric: {
      type: N.StripeType,
      uniforms: {
        horizontal: !0,
        evenColor: new a(1, 1, 1, .5),
        oddColor: new a(0, 0, 1, .5),
        offset: 0,
        repeat: 5
      },
      source: A
    },
    translucent: function translucent(e) {
      var a = e.uniforms;
      return a.evenColor.alpha < 1 || a.oddColor.alpha < 1;
    }
  }), N.CheckerboardType = "Checkerboard", N._materialCache.addMaterial(N.CheckerboardType, {
    fabric: {
      type: N.CheckerboardType,
      uniforms: {
        lightColor: new a(1, 1, 1, .5),
        darkColor: new a(0, 0, 0, .5),
        repeat: new e(5, 5)
      },
      source: h
    },
    translucent: function translucent(e) {
      var a = e.uniforms;
      return a.lightColor.alpha < 1 || a.darkColor.alpha < 1;
    }
  }), N.DotType = "Dot", N._materialCache.addMaterial(N.DotType, {
    fabric: {
      type: N.DotType,
      uniforms: {
        lightColor: new a(1, 1, 0, .75),
        darkColor: new a(0, 1, 1, .75),
        repeat: new e(5, 5)
      },
      source: d
    },
    translucent: function translucent(e) {
      var a = e.uniforms;
      return a.lightColor.alpha < 1 || a.darkColor.alpha < 1;
    }
  }), N.WaterType = "Water", N._materialCache.addMaterial(N.WaterType, {
    fabric: {
      type: N.WaterType,
      uniforms: {
        baseWaterColor: new a(.2, .3, .6, 1),
        blendColor: new a(0, 1, .699, 1),
        specularMap: N.DefaultImageId,
        normalMap: N.DefaultImageId,
        frequency: 10,
        animationSpeed: .01,
        amplitude: 1,
        specularIntensity: .5,
        fadeFactor: 1
      },
      source: L
    },
    translucent: function translucent(e) {
      var a = e.uniforms;
      return a.baseWaterColor.alpha < 1 || a.blendColor.alpha < 1;
    }
  }), N.RimLightingType = "RimLighting", N._materialCache.addMaterial(N.RimLightingType, {
    fabric: {
      type: N.RimLightingType,
      uniforms: {
        color: new a(1, 0, 0, .7),
        rimColor: new a(1, 1, 1, .4),
        width: .3
      },
      source: R
    },
    translucent: function translucent(e) {
      var a = e.uniforms;
      return a.color.alpha < 1 || a.rimColor.alpha < 1;
    }
  }), N.FadeType = "Fade", N._materialCache.addMaterial(N.FadeType, {
    fabric: {
      type: N.FadeType,
      uniforms: {
        fadeInColor: new a(1, 0, 0, 1),
        fadeOutColor: new a(0, 0, 0, 0),
        maximumDistance: .5,
        repeat: !0,
        fadeDirection: {
          x: !0,
          y: !0
        },
        time: new e(.5, .5)
      },
      source: I
    },
    translucent: function translucent(e) {
      var a = e.uniforms;
      return a.fadeInColor.alpha < 1 || a.fadeOutColor.alpha < 1;
    }
  }), N.PolylineArrowType = "PolylineArrow", N._materialCache.addMaterial(N.PolylineArrowType, {
    fabric: {
      type: N.PolylineArrowType,
      uniforms: {
        color: new a(1, 1, 1, 1)
      },
      source: D
    },
    translucent: !0
  }), N.PolylineDashType = "PolylineDash", N._materialCache.addMaterial(N.PolylineDashType, {
    fabric: {
      type: N.PolylineDashType,
      uniforms: {
        color: new a(1, 0, 1, 1),
        gapColor: new a(0, 0, 0, 0),
        dashLength: 16,
        dashPattern: 255
      },
      source: S
    },
    translucent: !0
  }), N.PolylineGlowType = "PolylineGlow", N._materialCache.addMaterial(N.PolylineGlowType, {
    fabric: {
      type: N.PolylineGlowType,
      uniforms: {
        color: new a(0, .5, 1, 1),
        glowPower: .25,
        taperPower: 1
      },
      source: E
    },
    translucent: !0
  }), N.PolylineOutlineType = "PolylineOutline", N._materialCache.addMaterial(N.PolylineOutlineType, {
    fabric: {
      type: N.PolylineOutlineType,
      uniforms: {
        color: new a(1, 1, 1, 1),
        outlineColor: new a(1, 0, 0, 1),
        outlineWidth: 1
      },
      source: O
    },
    translucent: function translucent(e) {
      var a = e.uniforms;
      return a.color.alpha < 1 || a.outlineColor.alpha < 1;
    }
  }), N.ElevationContourType = "ElevationContour", N._materialCache.addMaterial(N.ElevationContourType, {
    fabric: {
      type: N.ElevationContourType,
      uniforms: {
        spacing: 100,
        color: new a(1, 0, 0, 1),
        width: 1
      },
      source: y
    },
    translucent: !1
  }), N.ElevationRampType = "ElevationRamp", N._materialCache.addMaterial(N.ElevationRampType, {
    fabric: {
      type: N.ElevationRampType,
      uniforms: {
        image: N.DefaultImageId,
        minimumHeight: 0,
        maximumHeight: 1e4
      },
      source: b
    },
    translucent: !1
  }), N.SlopeRampMaterialType = "SlopeRamp", N._materialCache.addMaterial(N.SlopeRampMaterialType, {
    fabric: {
      type: N.SlopeRampMaterialType,
      uniforms: {
        image: N.DefaultImageId
      },
      source: F
    },
    translucent: !1
  }), N.AspectRampMaterialType = "AspectRamp", N._materialCache.addMaterial(N.AspectRampMaterialType, {
    fabric: {
      type: N.AspectRampMaterialType,
      uniforms: {
        image: N.DefaultImageId
      },
      source: m
    },
    translucent: !1
  }), N;
});