"use strict";

define(["../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "./ShaderProgram", "./ShaderSource"], function (c, e, t, g, f) {
  "use strict";

  function r(e) {
    this._context = e, this._shaders = {}, this._numberOfShaders = 0, this._shadersToRelease = {};
  }

  function h(e, r) {
    for (var t = r.derivedKeywords, a = t.length, o = 0; o < a; ++o) {
      var d = t[o] + r.keyword;
      h(e, e._shaders[d]);
    }

    delete e._shaders[r.keyword], r.shaderProgram.finalDestroy();
  }

  return e(r.prototype, {
    numberOfShaders: {
      get: function get() {
        return this._numberOfShaders;
      }
    }
  }), r.prototype.replaceShaderProgram = function (e) {
    return c(e.shaderProgram) && e.shaderProgram.destroy(), this.getShaderProgram(e);
  }, r.prototype.getShaderProgram = function (e) {
    var r = e.vertexShaderSource,
        t = e.fragmentShaderSource,
        a = e.attributeLocations;
    "string" == typeof r && (r = new f({
      sources: [r]
    })), "string" == typeof t && (t = new f({
      sources: [t]
    }));
    var o,
        d,
        s,
        h = r.createCombinedVertexShader(this._context),
        i = t.createCombinedFragmentShader(this._context),
        n = h + i + JSON.stringify(a);
    return c(this._shaders[n]) ? (s = this._shaders[n], delete this._shadersToRelease[n]) : (o = this._context, s = {
      cache: this,
      shaderProgram: d = new g({
        gl: o._gl,
        logShaderCompilation: o.logShaderCompilation,
        debugShaders: o.debugShaders,
        vertexShaderSource: r,
        vertexShaderText: h,
        fragmentShaderSource: t,
        fragmentShaderText: i,
        attributeLocations: a
      }),
      keyword: n,
      derivedKeywords: [],
      count: 0
    }, d._cachedShader = s, this._shaders[n] = s, ++this._numberOfShaders), ++s.count, s.shaderProgram;
  }, r.prototype.replaceDerivedShaderProgram = function (e, r, t) {
    var a,
        o = e._cachedShader,
        d = r + o.keyword,
        s = this._shaders[d];
    return c(s) && (h(this, s), -1 < (a = o.derivedKeywords.indexOf(r)) && o.derivedKeywords.splice(a, 1)), this.createDerivedShaderProgram(e, r, t);
  }, r.prototype.getDerivedShaderProgram = function (e, r) {
    var t = r + e._cachedShader.keyword,
        a = this._shaders[t];
    if (c(a)) return a.shaderProgram;
  }, r.prototype.createDerivedShaderProgram = function (e, r, t) {
    var a = e._cachedShader,
        o = r + a.keyword,
        d = t.vertexShaderSource,
        s = t.fragmentShaderSource,
        h = t.attributeLocations;
    "string" == typeof d && (d = new f({
      sources: [d]
    })), "string" == typeof s && (s = new f({
      sources: [s]
    }));
    var i = this._context,
        n = d.createCombinedVertexShader(i),
        c = s.createCombinedFragmentShader(i),
        S = new g({
      gl: i._gl,
      logShaderCompilation: i.logShaderCompilation,
      debugShaders: i.debugShaders,
      vertexShaderSource: d,
      vertexShaderText: n,
      fragmentShaderSource: s,
      fragmentShaderText: c,
      attributeLocations: h
    }),
        u = {
      cache: this,
      shaderProgram: S,
      keyword: o,
      derivedKeywords: [],
      count: 0
    };
    return a.derivedKeywords.push(r), S._cachedShader = u, this._shaders[o] = u, S;
  }, r.prototype.destroyReleasedShaderPrograms = function () {
    var e = this._shadersToRelease;

    for (var r in e) {
      e.hasOwnProperty(r) && (h(this, e[r]), --this._numberOfShaders);
    }

    this._shadersToRelease = {};
  }, r.prototype.releaseShaderProgram = function (e) {
    var r;
    !c(e) || (r = e._cachedShader) && 0 == --r.count && (this._shadersToRelease[r.keyword] = r);
  }, r.prototype.isDestroyed = function () {
    return !1;
  }, r.prototype.destroy = function () {
    var e = this._shaders;

    for (var r in e) {
      e.hasOwnProperty(r) && e[r].shaderProgram.finalDestroy();
    }

    return t(this);
  }, r;
});