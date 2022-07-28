"use strict";

define(["../Core/Check", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/RuntimeError", "./AutomaticUniforms", "./ContextLimits", "./createUniform", "./createUniformArray"], function (r, t, p, e, o, d, g, h, f, _, v) {
  "use strict";

  var a = 0;

  function n(e) {
    var r = function (e, r) {
      var t,
          o,
          a,
          n,
          i = {};

      if (!f.highpFloatSupported || !f.highpIntSupported) {
        var s,
            m = c(e),
            h = c(r),
            u = m.length,
            l = h.length;

        for (t = 0; t < u; t++) {
          for (o = 0; o < l; o++) {
            m[t] === h[o] && (a = m[t], n = "czm_mediump_" + a, s = new RegExp(a + "\\b", "g"), r = r.replace(s, n), i[n] = a);
          }
        }
      }

      return {
        fragmentShaderText: r,
        duplicateUniformNames: i
      };
    }(e.vertexShaderText, e.fragmentShaderText);

    this._gl = e.gl, this._logShaderCompilation = e.logShaderCompilation, this._debugShaders = e.debugShaders, this._attributeLocations = e.attributeLocations, this._program = void 0, this._numberOfVertexAttributes = void 0, this._vertexAttributes = void 0, this._uniformsByName = void 0, this._uniforms = void 0, this._automaticUniforms = void 0, this._manualUniforms = void 0, this._duplicateUniformNames = r.duplicateUniformNames, this._cachedShader = void 0, this.maximumTextureUnitIndex = void 0, this._vertexShaderSource = e.vertexShaderSource, this._vertexShaderText = e.vertexShaderText, this._fragmentShaderSource = e.fragmentShaderSource, this._fragmentShaderText = r.fragmentShaderText, this.id = a++;
  }

  function c(e) {
    var r = [],
        t = e.match(/uniform.*?(?![^{]*})(?=[=\[;])/g);
    if (p(t)) for (var o = t.length, a = 0; a < o; a++) {
      var n = t[a].trim(),
          i = n.slice(n.lastIndexOf(" ") + 1);
      r.push(i);
    }
    return r;
  }

  n.fromCache = function (e) {
    return e = t(e, t.EMPTY_OBJECT), r.defined("options.context", e.context), e.context.shaderCache.getShaderProgram(e);
  }, n.replaceCache = function (e) {
    return e = t(e, t.EMPTY_OBJECT), r.defined("options.context", e.context), e.context.shaderCache.replaceShaderProgram(e);
  }, e(n.prototype, {
    vertexShaderSource: {
      get: function get() {
        return this._vertexShaderSource;
      }
    },
    fragmentShaderSource: {
      get: function get() {
        return this._fragmentShaderSource;
      }
    },
    vertexAttributes: {
      get: function get() {
        return i(this), this._vertexAttributes;
      }
    },
    numberOfVertexAttributes: {
      get: function get() {
        return i(this), this._numberOfVertexAttributes;
      }
    },
    allUniforms: {
      get: function get() {
        return i(this), this._uniformsByName;
      }
    }
  });
  var S = "[PGEarth WebGL] ";

  function i(e) {
    var r, t, o, a, n;
    p(e._program) || (t = function (e, r) {
      var t = r._vertexShaderText,
          o = r._fragmentShaderText,
          a = e.createShader(e.VERTEX_SHADER);
      e.shaderSource(a, t), e.compileShader(a);
      var n = e.createShader(e.FRAGMENT_SHADER);
      e.shaderSource(n, o), e.compileShader(n);
      var i = e.createProgram();
      e.attachShader(i, a), e.attachShader(i, n), e.deleteShader(a), e.deleteShader(n);
      var s = r._attributeLocations;
      if (p(s)) for (var m in s) {
        s.hasOwnProperty(m) && e.bindAttribLocation(i, s[m], m);
      }

      if (e.linkProgram(i), !e.getProgramParameter(i, e.LINK_STATUS)) {
        var h,
            u = r._debugShaders;

        if (!e.getShaderParameter(n, e.COMPILE_STATUS)) {
          var l,
              d = e.getShaderInfoLog(n);
          throw console.error(S + "Fragment shader compile log: " + d), p(u) && ("" !== (l = u.getTranslatedShaderSource(n)) ? console.error(S + "Translated fragment shader source:\n" + l) : console.error(S + "Fragment shader translation failed.")), e.deleteProgram(i), new g("Fragment shader failed to compile.  Compile log: " + d);
        }

        if (!e.getShaderParameter(a, e.COMPILE_STATUS)) throw d = e.getShaderInfoLog(a), console.error(S + "Vertex shader compile log: " + d), p(u) && ("" !== (h = u.getTranslatedShaderSource(a)) ? console.error(S + "Translated vertex shader source:\n" + h) : console.error(S + "Vertex shader translation failed.")), e.deleteProgram(i), new g("Vertex shader failed to compile.  Compile log: " + d);
        throw d = e.getProgramInfoLog(i), console.error(S + "Shader program link log: " + d), p(u) && (console.error(S + "Translated vertex shader source:\n" + u.getTranslatedShaderSource(a)), console.error(S + "Translated fragment shader source:\n" + u.getTranslatedShaderSource(n))), e.deleteProgram(i), new g("Program failed to link.  Link log: " + d);
      }

      var f = r._logShaderCompilation;
      return f && (d = e.getShaderInfoLog(a), p(d) && 0 < d.length && console.log(S + "Vertex shader compile log: " + d)), f && (d = e.getShaderInfoLog(n), p(d) && 0 < d.length && console.log(S + "Fragment shader compile log: " + d)), f && (d = e.getProgramInfoLog(i), p(d) && 0 < d.length && console.log(S + "Shader program link log: " + d)), i;
    }(r = e._gl, e, e._debugShaders), o = r.getProgramParameter(t, r.ACTIVE_ATTRIBUTES), n = function (e, r) {
      var t,
          o,
          a,
          n,
          i = [],
          s = [];

      for (var m in r) {
        r.hasOwnProperty(m) && (t = r[m], o = m, a = e._duplicateUniformNames[o], p(a) && (o = t.name = a), n = h[o], p(n) ? i.push({
          uniform: t,
          automaticUniform: n
        }) : s.push(t));
      }

      return {
        automaticUniforms: i,
        manualUniforms: s
      };
    }(e, (a = function (e, r) {
      for (var t = {}, o = [], a = [], n = e.getProgramParameter(r, e.ACTIVE_UNIFORMS), i = 0; i < n; ++i) {
        var s = e.getActiveUniform(r, i),
            m = -1 !== s.name.indexOf("[0]", s.name.length - "[0]".length) ? s.name.slice(0, s.name.length - 3) : s.name;
        if (0 !== m.indexOf("gl_")) if (s.name.indexOf("[") < 0) {
          var h,
              u = e.getUniformLocation(r, m);
          null !== u && (h = _(e, s, m, u), t[m] = h, o.push(h), h._setSampler && a.push(h));
        } else {
          var l,
              d,
              f,
              g,
              c = m.indexOf("[");

          if (0 <= c) {
            if (l = t[m.slice(0, c)], !p(l)) continue;
            (d = l._locations).length <= 1 && (f = l.value, null !== (g = e.getUniformLocation(r, m)) && (d.push(g), f.push(e.getUniform(r, g))));
          } else {
            d = [];

            for (var S = 0; S < s.size; ++S) {
              null !== (g = e.getUniformLocation(r, m + "[" + S + "]")) && d.push(g);
            }

            l = v(e, s, m, d), t[m] = l, o.push(l), l._setSampler && a.push(l);
          }
        }
      }

      return {
        uniformsByName: t,
        uniforms: o,
        samplerUniforms: a
      };
    }(r, t)).uniformsByName), e._program = t, e._numberOfVertexAttributes = o, e._vertexAttributes = function (e, r, t) {
      for (var o = {}, a = 0; a < t; ++a) {
        var n = e.getActiveAttrib(r, a),
            i = e.getAttribLocation(r, n.name);
        o[n.name] = {
          name: n.name,
          type: n.type,
          index: i
        };
      }

      return o;
    }(r, t, o), e._uniformsByName = a.uniformsByName, e._uniforms = a.uniforms, e._automaticUniforms = n.automaticUniforms, e._manualUniforms = n.manualUniforms, e.maximumTextureUnitIndex = function (e, r, t) {
      e.useProgram(r);

      for (var o = 0, a = t.length, n = 0; n < a; ++n) {
        o = t[n]._setSampler(o);
      }

      return e.useProgram(null), o;
    }(r, t, a.samplerUniforms));
  }

  return n.prototype._bind = function () {
    i(this), this._gl.useProgram(this._program);
  }, n.prototype._setUniforms = function (e, r, t) {
    if (p(e)) for (var o = this._manualUniforms, a = o.length, n = 0; n < a; ++n) {
      var i = o[n];
      i.value = e[i.name]();
    }
    var s = this._automaticUniforms;

    for (a = s.length, n = 0; n < a; ++n) {
      var m = s[n];
      m.uniform.value = m.automaticUniform.getValue(r);
    }

    var h = this._uniforms;

    for (a = h.length, n = 0; n < a; ++n) {
      h[n].set();
    }

    if (t) {
      var u = this._gl,
          l = this._program;
      if (u.validateProgram(l), !u.getProgramParameter(l, u.VALIDATE_STATUS)) throw new d("Program validation failed.  Program info log: " + u.getProgramInfoLog(l));
    }
  }, n.prototype.isDestroyed = function () {
    return !1;
  }, n.prototype.destroy = function () {
    this._cachedShader.cache.releaseShaderProgram(this);
  }, n.prototype.finalDestroy = function () {
    return this._gl.deleteProgram(this._program), o(this);
  }, n;
});