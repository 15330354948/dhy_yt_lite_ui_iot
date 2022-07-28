"use strict";

define(["../Core/arrayFill", "../Core/Cartesian2", "../Core/Cartesian4", "../Core/Check", "../Core/clone", "../Core/Color", "../Core/combine", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/deprecationWarning", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Math", "../Core/PixelFormat", "../Core/RuntimeError", "../Renderer/ContextLimits", "../Renderer/DrawCommand", "../Renderer/Pass", "../Renderer/PixelDatatype", "../Renderer/RenderState", "../Renderer/Sampler", "../Renderer/ShaderSource", "../Renderer/Texture", "../Renderer/TextureMagnificationFilter", "../Renderer/TextureMinificationFilter", "./AttributeType", "./BlendingState", "./PGEarth3DTileColorBlendMode", "./CullFace", "./getBinaryAccessor", "./StencilConstants", "./StencilFunction", "./StencilOperation"], function (b, d, v, f, A, h, g, T, x, w, e, t, n, C, i, a, p, y, P, L, s, E, o, u, l, c, _, S, k, m, R, I, O, B, H) {
  "use strict";

  var D = h.WHITE;

  function M(e, t, r, n, i) {
    var a;
    this.featuresLength = t, this._translucentFeaturesLength = 0, w(r) && (a = r.extensions), this._extensions = x(a, {});

    var s,
        o,
        l,
        c,
        u,
        f,
        h,
        p,
        _ = function (e) {
      var t = {};
      if (!w(e)) return t;

      for (var r in e) {
        e.hasOwnProperty(r) && "HIERARCHY" !== r && "extensions" !== r && "extras" !== r && (t[r] = A(e[r], !0));
      }

      return t;
    }(r);

    this._properties = _, this._batchTableHierarchy = function (e, t, r) {
      if (!w(t)) return;
      var n = e._extensions["3DTILES_batch_table_hierarchy"],
          i = t.HIERARCHY;
      w(i) && (M._deprecationWarning("batchTableHierarchyExtension", "The batch table HIERARCHY property has been moved to an extension. Use extensions.3DTILES_batch_table_hierarchy instead."), e._extensions["3DTILES_batch_table_hierarchy"] = i, n = i);
      return w(n) ? function (e, t) {
        var r,
            n,
            i,
            a,
            s = e.instancesLength,
            o = e.classes,
            l = e.classIds,
            c = e.parentCounts,
            u = e.parentIds,
            f = s;
        w(l.byteOffset) && (l.componentType = x(l.componentType, T.UNSIGNED_SHORT), l.type = S.SCALAR, i = I(l), l = i.createArrayBufferView(t.buffer, t.byteOffset + l.byteOffset, s));
        if (w(c)) for (w(c.byteOffset) && (c.componentType = x(c.componentType, T.UNSIGNED_SHORT), c.type = S.SCALAR, i = I(c), c = i.createArrayBufferView(t.buffer, t.byteOffset + c.byteOffset, s)), a = new Uint16Array(s), r = f = 0; r < s; ++r) {
          a[r] = f, f += c[r];
        }
        w(u) && w(u.byteOffset) && (u.componentType = x(u.componentType, T.UNSIGNED_SHORT), u.type = S.SCALAR, i = I(u), u = i.createArrayBufferView(t.buffer, t.byteOffset + u.byteOffset, f));
        var h = o.length;

        for (r = 0; r < h; ++r) {
          var p = o[r].length,
              _ = o[r].instances,
              d = F(p, _, t);
          o[r].instances = g(d, _);
        }

        var v = b(new Array(h), 0),
            y = new Uint16Array(s);

        for (r = 0; r < s; ++r) {
          n = l[r], y[r] = v[n], ++v[n];
        }

        var m = {
          classes: o,
          classIds: l,
          classIndexes: y,
          parentCounts: c,
          parentIndexes: a,
          parentIds: u
        };
        return function (e) {
          var t = N;
          t.length = 0;

          for (var r = e.classIds.length, n = 0; n < r; ++n) {
            !function e(t, r, n) {
              var i = t.parentCounts;
              var a = t.parentIds;
              var s = t.parentIndexes;
              var o = t.classIds;
              var l = o.length;
              if (!w(a)) return;
              if (l <= r) throw new C("Parent index " + r + " exceeds the total number of instances: " + l);
              if (-1 < n.indexOf(r)) throw new C("Circular dependency detected in the batch table hierarchy.");
              n.push(r);
              var c = w(i) ? i[r] : 1;
              var u = w(i) ? s[r] : r;

              for (var f = 0; f < c; ++f) {
                var h = a[u + f];
                h !== r && e(t, h, n);
              }

              n.pop(r);
            }(e, n, t);
          }
        }(m), m;
      }(n, r) : void 0;
    }(this, r, n), this._batchTableBinaryProperties = F(t, _, n), this._showAlphaProperties = void 0, this._batchValues = void 0, this._batchValuesDirty = !1, this._batchTexture = void 0, this._defaultTexture = void 0, this._pickTexture = void 0, this._pickIds = [], this._content = e, this._colorChangedCallback = i, 0 < t && (c = .5 * (l = 1 / (s = Math.min(t, y.maximumTextureSize))), f = .5 * (u = 1 / (o = Math.ceil(t / y.maximumTextureSize))), h = new d(s, o), p = new v(l, c, u, f)), this._textureDimensions = h, this._textureStep = p;
  }

  M._deprecationWarning = t, e(M.prototype, {
    memorySizeInBytes: {
      get: function get() {
        var e = 0;
        return w(this._pickTexture) && (e += this._pickTexture.sizeInBytes), w(this._batchTexture) && (e += this._batchTexture.sizeInBytes), e;
      }
    }
  });
  var N = [];

  function F(e, t, r) {
    var n;

    for (var i in t) {
      if (t.hasOwnProperty(i)) {
        var a = t[i],
            s = a.byteOffset;

        if (w(s)) {
          var o = a.componentType,
              l = a.type;
          if (!w(o)) throw new p("componentType is required.");
          if (!w(l)) throw new p("type is required.");
          if (!w(r)) throw new p("Property " + i + " requires a batch table binary.");
          var c = I(a),
              u = c.componentsPerAttribute,
              f = c.classType,
              h = c.createArrayBufferView(r.buffer, r.byteOffset + s, e);
          w(n) || (n = {}), n[i] = {
            typedArray: h,
            componentCount: u,
            type: f
          };
        }
      }
    }

    return n;
  }

  function V(e) {
    var t = e._textureDimensions;
    return t.x * t.y * 4;
  }

  function z(e) {
    var t, r;
    return w(e._batchValues) || (t = V(e), r = new Uint8Array(t), b(r, 255), e._batchValues = r), e._batchValues;
  }

  function U(e) {
    var t, r;
    return w(e._showAlphaProperties) || (t = 2 * e.featuresLength, r = new Uint8Array(t), b(r, 255), e._showAlphaProperties = r), e._showAlphaProperties;
  }

  function G(e, t) {
    if (!w(e) || e < 0 || t < e) throw new C("batchId is required and between zero and featuresLength - 1 (" + t - NaN);
  }

  M.getBinaryProperties = F, M.prototype.setShow = function (e, t) {
    var r, n, i;
    G(e, this.featuresLength), f.typeOf.bool("show", t), t && !w(this._showAlphaProperties) || (i = t ? 255 : 0, (r = U(this))[n = 2 * e] !== i && (r[n] = i, z(this)[4 * e + 3] = t ? r[1 + n] : 0, this._batchValuesDirty = !0));
  }, M.prototype.setAllShow = function (e) {
    f.typeOf.bool("show", e);

    for (var t = this.featuresLength, r = 0; r < t; ++r) {
      this.setShow(r, e);
    }
  }, M.prototype.getShow = function (e) {
    if (G(e, this.featuresLength), !w(this._showAlphaProperties)) return !0;
    var t = 2 * e;
    return 255 === this._showAlphaProperties[t];
  };
  var K = new Array(4);
  M.prototype.setColor = function (e, t) {
    var r, n, i, a, s, o, l, c, u;
    G(e, this.featuresLength), f.typeOf.object("color", t), h.equals(t, D) && !w(this._batchValues) || (n = (r = t.toBytes(K))[3], i = z(this), a = 4 * e, s = U(this), o = 2 * e, i[a] === r[0] && i[1 + a] === r[1] && i[2 + a] === r[2] && s[1 + o] === n || (i[a] = r[0], i[1 + a] = r[1], i[2 + a] = r[2], l = 255 !== s[1 + o], c = 0 !== s[o], i[3 + a] = c ? n : 0, (u = 255 !== (s[1 + o] = n)) && !l ? ++this._translucentFeaturesLength : !u && l && --this._translucentFeaturesLength, this._batchValuesDirty = !0, w(this._colorChangedCallback) && this._colorChangedCallback(e, t)));
  }, M.prototype.setAllColor = function (e) {
    f.typeOf.object("color", e);

    for (var t = this.featuresLength, r = 0; r < t; ++r) {
      this.setColor(r, e);
    }
  }, M.prototype.getColor = function (e, t) {
    if (G(e, this.featuresLength), f.typeOf.object("result", t), !w(this._batchValues)) return h.clone(D, t);
    var r = this._batchValues,
        n = 4 * e,
        i = this._showAlphaProperties,
        a = 2 * e;
    return h.fromBytes(r[n], r[1 + n], r[2 + n], i[1 + a], t);
  }, M.prototype.getPickColor = function (e) {
    return G(e, this.featuresLength), this._pickIds[e];
  };
  var q = new h();

  function X(e, t) {
    var r = e.typedArray,
        n = e.componentCount;
    return 1 === n ? r[t] : e.type.unpack(r, t * n);
  }

  function Y(e, t, r) {
    var n = e.typedArray,
        i = e.componentCount;
    1 === i ? n[t] = r : e.type.pack(r, n, t * i);
  }

  M.prototype.applyStyle = function (e) {
    if (!w(e)) return this.setAllColor(D), void this.setAllShow(!0);

    for (var t = this._content, r = this.featuresLength, n = 0; n < r; ++n) {
      var i = t.getFeature(n),
          a = w(e.color) ? e.color.evaluateColor(i, q) : D,
          s = !w(e.show) || e.show.evaluate(i);
      this.setColor(n, a), this.setShow(n, s);
    }
  };

  var W = [],
      j = [],
      Q = 0;

  function J(e, t, r) {
    var n = e.parentCounts,
        i = e.parentIds;
    return w(i) ? (w(n) ? function (e, t, r) {
      var n = e.classIds,
          i = e.parentCounts,
          a = e.parentIds,
          s = e.parentIndexes,
          o = n.length,
          l = W;
      l.length = Math.max(l.length, o);
      var c = ++Q,
          u = j;

      for (u.length = 0, u.push(t); 0 < u.length;) {
        if (l[t = u.pop()] !== c) {
          l[t] = c;
          var f = r(e, t);
          if (w(f)) return f;

          for (var h = i[t], p = s[t], _ = 0; _ < h; ++_) {
            var d = a[p + _];
            d !== t && u.push(d);
          }
        }
      }
    } : function (e, t, r) {
      for (var n = !0; n;) {
        var i = r(e, t);
        if (w(i)) return i;
        var a = e.parentIds[t],
            n = a !== t;
        t = a;
      }
    })(e, t, r) : r(e, t);
  }

  function Z(e, t) {
    return e = u.replaceMain(e, "tile_main"), t ? e + "uniform float tile_colorBlend; \nvoid tile_color(vec4 tile_featureColor) \n{ \n    tile_main(); \n    tile_featureColor = czm_gammaCorrect(tile_featureColor); \n    gl_FragColor.a *= tile_featureColor.a; \n    float highlight = ceil(tile_colorBlend); \n    gl_FragColor.rgb *= mix(tile_featureColor.rgb, vec3(1.0), highlight); \n} \n" : e + "void tile_color(vec4 tile_featureColor) \n{ \n    tile_main(); \n} \n";
  }

  function $(e, t, r) {
    if (!w(t)) return Z(e, r);
    var n = new RegExp("(uniform|attribute|in)\\s+(vec[34]|sampler2D)\\s+" + t + ";"),
        i = e.match(n);
    if (!w(i)) return Z(e, r);
    var a = i[0],
        s = i[2];
    e = (e = u.replaceMain(e, "tile_main")).replace(a, "");
    var o, l, c;
    return "vec3" === s || "vec4" === s ? (l = "vec3" === s ? "vec4(" + t + ", 1.0)" : t, c = "vec3" === s ? "tile_diffuse.xyz" : "tile_diffuse", n = new RegExp(t, "g"), e = e.replace(n, c), o = "    vec4 source = " + l + "; \n    tile_diffuse = tile_diffuse_final(source, tile_featureColor); \n    tile_main(); \n") : "sampler2D" === s && (e = function (e, t) {
      for (var r, n = "texture2D(" + t, i = 0, a = e.indexOf(n, i); -1 < a;) {
        for (var s = 0, o = a; o < e.length; ++o) {
          var l = e.charAt(o);
          if ("(" === l) ++s;else if (")" === l && 0 === --s) {
            r = o + 1;
            break;
          }
        }

        var c = "tile_diffuse_final(" + e.slice(a, r) + ", tile_diffuse)";
        e = e.slice(0, a) + c + e.slice(r), i = a + c.length, a = e.indexOf(n, i);
      }

      return e;
    }(e, t), o = "    tile_diffuse = tile_featureColor; \n    tile_main(); \n"), e = "uniform float tile_colorBlend; \nvec4 tile_diffuse = vec4(1.0); \nbool isWhite(vec3 color) \n{ \n    return all(greaterThan(color, vec3(1.0 - czm_epsilon3))); \n} \nvec4 tile_diffuse_final(vec4 sourceDiffuse, vec4 tileDiffuse) \n{ \n    vec4 blendDiffuse = mix(sourceDiffuse, tileDiffuse, tile_colorBlend); \n    vec4 diffuse = isWhite(tileDiffuse.rgb) ? sourceDiffuse : blendDiffuse; \n    return vec4(diffuse.rgb, sourceDiffuse.a); \n} \n" + a + "\n" + e + "\nvoid tile_color(vec4 tile_featureColor) \n{ \n" + o, r && (e += "    tile_featureColor = czm_gammaCorrect(tile_featureColor); \n    gl_FragColor.a *= tile_featureColor.a; \n    float highlight = ceil(tile_colorBlend); \n    gl_FragColor.rgb *= mix(tile_featureColor.rgb, vec3(1.0), highlight); \n"), e += "} \n";
  }

  M.prototype.isClass = function (e, n) {
    G(e, this.featuresLength), f.typeOf.string("className", n);
    var t = this._batchTableHierarchy;
    if (!w(t)) return !1;
    var r = J(t, e, function (e, t) {
      var r = e.classIds[t];
      if (e.classes[r].name === n) return !0;
    });
    return w(r);
  }, M.prototype.isExactClass = function (e, t) {
    return f.typeOf.string("className", t), this.getExactClassName(e) === t;
  }, M.prototype.getExactClassName = function (e) {
    G(e, this.featuresLength);
    var t = this._batchTableHierarchy;

    if (w(t)) {
      var r = t.classIds[e];
      return t.classes[r].name;
    }
  }, M.prototype.hasProperty = function (e, t) {
    return G(e, this.featuresLength), f.typeOf.string("name", t), w(this._properties[t]) || w(this._batchTableHierarchy) && (r = e, i = t, n = J(this._batchTableHierarchy, r, function (e, t) {
      var r = e.classIds[t],
          n = e.classes[r].instances;
      if (w(n[i])) return !0;
    }), w(n));
    var r, i, n;
  }, M.prototype.getPropertyNames = function (e, t) {
    G(e, this.featuresLength), (t = w(t) ? t : []).length = 0;
    var r,
        a,
        n = Object.keys(this._properties);
    return t.push.apply(t, n), w(this._batchTableHierarchy) && (r = e, a = t, J(this._batchTableHierarchy, r, function (e, t) {
      var r = e.classIds[t],
          n = e.classes[r].instances;

      for (var i in n) {
        n.hasOwnProperty(i) && -1 === a.indexOf(i) && a.push(i);
      }
    })), t;
  }, M.prototype.getProperty = function (e, t) {
    if (G(e, this.featuresLength), f.typeOf.string("name", t), w(this._batchTableBinaryProperties)) {
      var r = this._batchTableBinaryProperties[t];
      if (w(r)) return X(r, e);
    }

    var n,
        s,
        i = this._properties[t];
    if (w(i)) return A(i[e], !0);

    if (w(this._batchTableHierarchy)) {
      var a = (n = e, s = t, J(this._batchTableHierarchy, n, function (e, t) {
        var r = e.classIds[t],
            n = e.classes[r],
            i = e.classIndexes[t],
            a = n.instances[s];
        if (w(a)) return w(a.typedArray) ? X(a, i) : A(a[i], !0);
      }));
      if (w(a)) return a;
    }
  }, M.prototype.setProperty = function (e, t, r) {
    var s,
        o,
        l,
        n,
        i,
        a = this.featuresLength;

    if (G(e, a), f.typeOf.string("name", t), w(this._batchTableBinaryProperties)) {
      var c = this._batchTableBinaryProperties[t];
      if (w(c)) return void Y(c, e, r);
    }

    w(this._batchTableHierarchy) && (s = e, o = t, l = r, n = J(this._batchTableHierarchy, s, function (e, t) {
      var r = e.classIds[t],
          n = e.classes[r],
          i = e.classIndexes[t],
          a = n.instances[o];

      if (w(a)) {
        if (t !== s) throw new C('Inherited property "' + o + '" is read-only.');
        return w(a.typedArray) ? Y(a, i, l) : a[i] = A(l, !0), !0;
      }
    }), w(n)) || (i = this._properties[t], w(i) || (this._properties[t] = new Array(a), i = this._properties[t]), i[e] = A(r, !0));
  }, M.prototype.getVertexShaderCallback = function (n, i, a) {
    if (0 !== this.featuresLength) {
      var s = this;
      return function (e) {
        var t,
            r = $(e, a, !1);
        return 0 < y.maximumVertexTextureImageUnits ? (t = "", n && (t += "uniform bool tile_translucentCommand; \n"), t += "uniform sampler2D tile_batchTexture; \nvarying vec4 tile_featureColor; \nvarying vec2 tile_featureSt; \nvoid main() \n{ \n    vec2 st = computeSt(" + i + "); \n    vec4 featureProperties = texture2D(tile_batchTexture, st); \n    tile_color(featureProperties); \n    float show = ceil(featureProperties.a); \n    gl_Position *= show; \n", n && (t += "    bool isStyleTranslucent = (featureProperties.a != 1.0); \n    if (czm_pass == czm_passTranslucent) \n    { \n        if (!isStyleTranslucent && !tile_translucentCommand) \n        { \n            gl_Position *= 0.0; \n        } \n    } \n    else \n    { \n        if (isStyleTranslucent) \n        { \n            gl_Position *= 0.0; \n        } \n    } \n"), t += "    tile_featureColor = featureProperties; \n    tile_featureSt = st; \n}") : t = "varying vec2 tile_featureSt; \nvoid main() \n{ \n    tile_color(vec4(1.0)); \n    tile_featureSt = computeSt(" + i + "); \n}", r + "\n" + (1 === s._textureDimensions.y ? "uniform vec4 tile_textureStep; \nvec2 computeSt(float batchId) \n{ \n    float stepX = tile_textureStep.x; \n    float centerX = tile_textureStep.y; \n    return vec2(centerX + (batchId * stepX), 0.5); \n} \n" : "uniform vec4 tile_textureStep; \nuniform vec2 tile_textureDimensions; \nvec2 computeSt(float batchId) \n{ \n    float stepX = tile_textureStep.x; \n    float centerX = tile_textureStep.y; \n    float stepY = tile_textureStep.z; \n    float centerY = tile_textureStep.w; \n    float xId = mod(batchId, tile_textureDimensions.x); \n    float yId = floor(batchId / tile_textureDimensions.x); \n    return vec2(centerX + (xId * stepX), centerY + (yId * stepY)); \n} \n") + t;
      };
    }
  }, M.prototype.getFragmentShaderCallback = function (t, r) {
    if (0 !== this.featuresLength) return function (e) {
      return e = $(e, r, !0), 0 < y.maximumVertexTextureImageUnits ? e += "uniform sampler2D tile_pickTexture; \nvarying vec2 tile_featureSt; \nvarying vec4 tile_featureColor; \nvoid main() \n{ \n    tile_color(tile_featureColor); \n}" : (t && (e += "uniform bool tile_translucentCommand; \n"), e += "uniform sampler2D tile_pickTexture; \nuniform sampler2D tile_batchTexture; \nvarying vec2 tile_featureSt; \nvoid main() \n{ \n    vec4 featureProperties = texture2D(tile_batchTexture, tile_featureSt); \n    if (featureProperties.a == 0.0) { \n        discard; \n    } \n", t && (e += "    bool isStyleTranslucent = (featureProperties.a != 1.0); \n    if (czm_pass == czm_passTranslucent) \n    { \n        if (!isStyleTranslucent && !tile_translucentCommand) \n        { \n            discard; \n        } \n    } \n    else \n    { \n        if (isStyleTranslucent) \n        { \n            discard; \n        } \n    } \n"), e += "    tile_color(featureProperties); \n} \n"), e;
    };
  }, M.prototype.getClassificationFragmentShaderCallback = function () {
    if (0 !== this.featuresLength) return function (e) {
      return e = u.replaceMain(e, "tile_main"), 0 < y.maximumVertexTextureImageUnits ? e += "uniform sampler2D tile_pickTexture;\nvarying vec2 tile_featureSt; \nvarying vec4 tile_featureColor; \nvoid main() \n{ \n    tile_main(); \n    gl_FragColor = tile_featureColor; \n}" : e += "uniform sampler2D tile_batchTexture; \nuniform sampler2D tile_pickTexture;\nvarying vec2 tile_featureSt; \nvoid main() \n{ \n    tile_main(); \n    vec4 featureProperties = texture2D(tile_batchTexture, tile_featureSt); \n    if (featureProperties.a == 0.0) { \n        discard; \n    } \n    gl_FragColor = featureProperties; \n} \n", e;
    };
  }, M.prototype.getUniformMapCallback = function () {
    if (0 !== this.featuresLength) {
      var t = this;
      return function (e) {
        return g(e, {
          tile_batchTexture: function tile_batchTexture() {
            return x(t._batchTexture, t._defaultTexture);
          },
          tile_textureDimensions: function tile_textureDimensions() {
            return t._textureDimensions;
          },
          tile_textureStep: function tile_textureStep() {
            return t._textureStep;
          },
          tile_colorBlend: function tile_colorBlend() {
            return function (e) {
              var t = e._content.tileset,
                  r = t.colorBlendMode,
                  n = t.colorBlendAmount;
              if (r === m.HIGHLIGHT) return 0;
              if (r === m.REPLACE) return 1;
              if (r === m.MIX) return i.clamp(n, i.EPSILON4, 1);
              throw new C('Invalid color blend mode "' + r + '".');
            }(t);
          },
          tile_pickTexture: function tile_pickTexture() {
            return t._pickTexture;
          }
        });
      };
    }
  }, M.prototype.getPickId = function () {
    return "texture2D(tile_pickTexture, tile_featureSt)";
  };
  var ee = 0,
      te = 1,
      re = 2;

  function ne(e, t, r) {
    var n = e._textureDimensions;
    return new l({
      context: t,
      pixelFormat: a.RGBA,
      pixelDatatype: s.UNSIGNED_BYTE,
      source: {
        width: n.x,
        height: n.y,
        arrayBufferView: r
      },
      flipY: !1,
      sampler: new o({
        minificationFilter: _.NEAREST,
        magnificationFilter: c.NEAREST
      })
    });
  }

  return M.prototype.addDerivedCommands = function (e, t) {
    for (var r, n, i, a, s, o, l, c, u, f, h, p, _ = e.commandList, d = _.length, v = this._content._tile, y = v._finalResolution, m = v.tileset, b = m._skipLevelOfDetail && m._hasMixedContent && e.context.stencilBuffer, g = function (e) {
      var t = e._translucentFeaturesLength;
      {
        if (0 === t) return ee;
        if (t === e.featuresLength) return te;
      }
      return re;
    }(this), T = t; T < d; ++T) {
      var x = _[T],
          C = x.derivedCommands.tileset;
      w(C) && !x.dirty || (C = {}, (x.derivedCommands.tileset = C).originalCommand = function (e) {
        var t = P.shallowClone(e),
            r = t.pass === L.TRANSLUCENT;
        return t.uniformMap = w(t.uniformMap) ? t.uniformMap : {}, t.uniformMap.tile_translucentCommand = function () {
          return r;
        }, t;
      }(x), x.dirty = !1);
      var S = C.originalCommand;
      g !== ee && x.pass !== L.TRANSLUCENT && (w(C.translucent) || (C.translucent = (h = S, p = void 0, (p = P.shallowClone(h)).pass = L.TRANSLUCENT, p.renderState = function (e) {
        var t = A(e, !0);
        return t.cull.enabled = !1, t.depthTest.enabled = !0, t.depthMask = !1, t.blending = k.ALPHA_BLEND, E.fromCache(t);
      }(h.renderState), p))), g !== te && x.pass !== L.TRANSLUCENT && (w(C.opaque) || (C.opaque = (u = S, f = void 0, (f = P.shallowClone(u)).renderState = function (e) {
        var t = A(e, !0);
        return t.stencilTest = O.setPGEarth3DTileBit(), t.stencilMask = O.PGEARTH_3D_TILE_MASK, E.fromCache(t);
      }(u.renderState), f)), b && (y || (w(C.zback) || (C.zback = (s = e.context, o = S, c = l = void 0, l = P.shallowClone(o), (c = A(l.renderState, !0)).cull.enabled = !0, c.cull.face = R.FRONT, c.colorMask = {
        red: !1,
        green: !1,
        blue: !1,
        alpha: !1
      }, c.polygonOffset = {
        enabled: !0,
        factor: 5,
        units: 5
      }, c.stencilTest = O.setPGEarth3DTileBit(), c.stencilMask = O.PGEARTH_3D_TILE_MASK, l.renderState = E.fromCache(c), l.castShadows = !1, l.receiveShadows = !1, l.shaderProgram = function (e, t) {
        var r,
            n = e.shaderCache.getDerivedShaderProgram(t, "zBackfaceLogDepth");
        return w(n) || ((r = t.fragmentShaderSource.clone()).defines = w(r.defines) ? r.defines.slice(0) : [], r.defines.push("DISABLE_LOG_DEPTH_FRAGMENT_WRITE"), n = e.shaderCache.createDerivedShaderProgram(t, "zBackfaceLogDepth", {
          vertexShaderSource: t.vertexShaderSource,
          fragmentShaderSource: r,
          attributeLocations: t._attributeLocations
        })), n;
      }(s, o.shaderProgram), l)), m._backfaceCommands.push(C.zback)), w(C.stencil) && v._selectionDepth === (C.stencil.renderState.stencilTest.reference & O.SKIP_LOD_MASK) >>> O.SKIP_LOD_BIT_SHIFT || (x.renderState.depthMask ? C.stencil = (r = S, n = v._selectionDepth, a = i = void 0, i = P.shallowClone(r), (a = A(i.renderState, !0)).stencilTest.enabled = !0, a.stencilTest.mask = O.SKIP_LOD_MASK, a.stencilTest.reference = O.PGEARTH_3D_TILE_MASK | n << O.SKIP_LOD_BIT_SHIFT, a.stencilTest.frontFunction = B.GREATER_OR_EQUAL, a.stencilTest.frontOperation.zPass = H.REPLACE, a.stencilTest.backFunction = B.GREATER_OR_EQUAL, a.stencilTest.backOperation.zPass = H.REPLACE, a.stencilMask = O.PGEARTH_3D_TILE_MASK | O.SKIP_LOD_MASK, i.renderState = E.fromCache(a), i) : C.stencil = C.opaque)));
      var I = b ? C.stencil : C.opaque,
          D = C.translucent;
      x.pass !== L.TRANSLUCENT ? (g === ee && (_[T] = I), g === te && (_[T] = D), g === re && (_[T] = I, _.push(D))) : _[T] = S;
    }
  }, M.prototype.update = function (e, t) {
    var r = t.context;
    this._defaultTexture = r.defaultTexture;
    var n,
        i,
        a = t.passes;
    (a.pick || a.postProcess) && function (e, t) {
      var r = e.featuresLength;

      if (!w(e._pickTexture) && 0 < r) {
        for (var n = e._pickIds, i = V(e), a = new Uint8Array(i), s = e._content, o = 0; o < r; ++o) {
          var l = t.createPickId(s.getFeature(o));
          n.push(l);
          var c = l.color,
              u = 4 * o;
          a[u] = h.floatToByte(c.red), a[1 + u] = h.floatToByte(c.green), a[2 + u] = h.floatToByte(c.blue), a[3 + u] = h.floatToByte(c.alpha);
        }

        e._pickTexture = ne(e, t, a), s.tileset._statistics.batchTableByteLength += e._pickTexture.sizeInBytes;
      }
    }(this, r), this._batchValuesDirty && (this._batchValuesDirty = !1, w(this._batchTexture) || (this._batchTexture = ne(this, r, this._batchValues), e._statistics.batchTableByteLength += this._batchTexture.sizeInBytes), i = (n = this)._textureDimensions, n._batchTexture.copyFrom({
      width: i.x,
      height: i.y,
      arrayBufferView: n._batchValues
    }));
  }, M.prototype.isDestroyed = function () {
    return !1;
  }, M.prototype.destroy = function () {
    this._batchTexture = this._batchTexture && this._batchTexture.destroy(), this._pickTexture = this._pickTexture && this._pickTexture.destroy();

    for (var e = this._pickIds, t = e.length, r = 0; r < t; ++r) {
      e[r].destroy();
    }

    return n(this);
  }, M;
});