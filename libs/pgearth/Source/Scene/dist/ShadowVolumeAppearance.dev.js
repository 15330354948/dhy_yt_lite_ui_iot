"use strict";

define(["../Core/Cartographic", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Math", "../Core/Check", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/EncodedCartesian3", "../Core/GeometryInstanceAttribute", "../Core/Matrix4", "../Core/Rectangle", "../Core/Transforms", "../Renderer/ShaderSource", "../Scene/PerInstanceColorAppearance", "../Shaders/ShadowVolumeAppearanceFS"], function (A, u, I, E, C, _, l, d, e, f, m, v, N, D, x, T, o) {
  "use strict";

  var g = {
    eastMostYhighDefine: "",
    eastMostYlowDefine: "",
    westMostYhighDefine: "",
    westMostYlowDefine: ""
  };

  function n(e, t, n) {
    C.typeOf.bool("extentsCulling", e), C.typeOf.bool("planarExtents", t), C.typeOf.object("appearance", n);
    var r = new s();
    r.requiresTextureCoordinates = e, r.requiresEC = !n.flat;
    var i,
        o = new s();
    o.requiresTextureCoordinates = e, n instanceof T ? r.requiresNormalEC = !n.flat : (i = n.material.shaderSource + "\n" + n.fragmentShaderSource, r.normalEC = -1 !== i.indexOf("materialInput.normalEC") || -1 !== i.indexOf("czm_getDefaultMaterial"), r.positionToEyeEC = -1 !== i.indexOf("materialInput.positionToEyeEC"), r.tangentToEyeMatrix = -1 !== i.indexOf("materialInput.tangentToEyeMatrix"), r.st = -1 !== i.indexOf("materialInput.st")), this._colorShaderDependencies = r, this._pickShaderDependencies = o, this._appearance = n, this._extentsCulling = e, this._planarExtents = t;
  }

  n.prototype.createFragmentShader = function (e) {
    C.typeOf.bool("columbusView2D", e);
    var t = this._appearance,
        n = this._colorShaderDependencies,
        r = [];
    e || this._planarExtents || r.push("SPHERICAL"), n.requiresEC && r.push("REQUIRES_EC"), n.requiresWC && r.push("REQUIRES_WC"), n.requiresTextureCoordinates && r.push("TEXTURE_COORDINATES"), this._extentsCulling && r.push("CULL_FRAGMENTS"), n.requiresNormalEC && r.push("NORMAL_EC"), t instanceof T && r.push("PER_INSTANCE_COLOR"), n.normalEC && r.push("USES_NORMAL_EC"), n.positionToEyeEC && r.push("USES_POSITION_TO_EYE_EC"), n.tangentToEyeMatrix && r.push("USES_TANGENT_TO_EYE"), n.st && r.push("USES_ST"), t.flat && r.push("FLAT");
    var i = "";
    return t instanceof T || (i = t.material.shaderSource), new x({
      defines: r,
      sources: [i, o]
    });
  }, n.prototype.createPickFragmentShader = function (e) {
    C.typeOf.bool("columbusView2D", e);
    var t = this._pickShaderDependencies,
        n = ["PICK"];
    return e || this._planarExtents || n.push("SPHERICAL"), t.requiresEC && n.push("REQUIRES_EC"), t.requiresWC && n.push("REQUIRES_WC"), t.requiresTextureCoordinates && n.push("TEXTURE_COORDINATES"), this._extentsCulling && n.push("CULL_FRAGMENTS"), new x({
      defines: n,
      sources: [o],
      pickColorQualifier: "varying"
    });
  }, n.prototype.createVertexShader = function (e, t, n, r) {
    return C.defined("defines", e), C.typeOf.string("vertexShaderSource", t), C.typeOf.bool("columbusView2D", n), C.defined("mapProjection", r), i(this._colorShaderDependencies, this._planarExtents, n, e, t, this._appearance, r);
  }, n.prototype.createPickVertexShader = function (e, t, n, r) {
    return C.defined("defines", e), C.typeOf.string("vertexShaderSource", t), C.typeOf.bool("columbusView2D", n), C.defined("mapProjection", r), i(this._pickShaderDependencies, this._planarExtents, n, e, t, void 0, r);
  };
  var w = new I(),
      y = new A(),
      S = {
    high: 0,
    low: 0
  };

  function i(e, t, n, r, i, o, s) {
    var a,
        u,
        h,
        l,
        p,
        c = r.slice();
    return "" === g.eastMostYhighDefine && ((a = y).longitude = E.PI, a.latitude = 0, a.height = 0, u = s.project(a, w), p = f.encode(u.x, S), g.eastMostYhighDefine = "EAST_MOST_X_HIGH " + p.high.toFixed((p.high + "").length + 1), g.eastMostYlowDefine = "EAST_MOST_X_LOW " + p.low.toFixed((p.low + "").length + 1), (h = y).longitude = -E.PI, h.latitude = 0, h.height = 0, l = s.project(h, w), p = f.encode(l.x, S), g.westMostYhighDefine = "WEST_MOST_X_HIGH " + p.high.toFixed((p.high + "").length + 1), g.westMostYlowDefine = "WEST_MOST_X_LOW " + p.low.toFixed((p.low + "").length + 1)), n && (c.push(g.eastMostYhighDefine), c.push(g.eastMostYlowDefine), c.push(g.westMostYhighDefine), c.push(g.westMostYlowDefine)), d(o) && o instanceof T && c.push("PER_INSTANCE_COLOR"), e.requiresTextureCoordinates && (c.push("TEXTURE_COORDINATES"), t || n || c.push("SPHERICAL"), n && c.push("COLUMBUS_VIEW_2D")), new x({
      defines: c,
      sources: [i]
    });
  }

  function s() {
    this._requiresEC = !1, this._requiresWC = !1, this._requiresNormalEC = !1, this._requiresTextureCoordinates = !1, this._usesNormalEC = !1, this._usesPositionToEyeEC = !1, this._usesTangentToEyeMat = !1, this._usesSt = !1;
  }

  function h(e, t, n) {
    return Math.abs((t.y - e.y) * n.x - (t.x - e.x) * n.y + t.x * e.y - t.y * e.x) / u.distance(t, e);
  }

  e(s.prototype, {
    requiresEC: {
      get: function get() {
        return this._requiresEC;
      },
      set: function set(e) {
        this._requiresEC = e || this._requiresEC;
      }
    },
    requiresWC: {
      get: function get() {
        return this._requiresWC;
      },
      set: function set(e) {
        this._requiresWC = e || this._requiresWC, this.requiresEC = this._requiresWC;
      }
    },
    requiresNormalEC: {
      get: function get() {
        return this._requiresNormalEC;
      },
      set: function set(e) {
        this._requiresNormalEC = e || this._requiresNormalEC, this.requiresEC = this._requiresNormalEC;
      }
    },
    requiresTextureCoordinates: {
      get: function get() {
        return this._requiresTextureCoordinates;
      },
      set: function set(e) {
        this._requiresTextureCoordinates = e || this._requiresTextureCoordinates, this.requiresWC = this._requiresTextureCoordinates;
      }
    },
    normalEC: {
      set: function set(e) {
        this.requiresNormalEC = e, this._usesNormalEC = e;
      },
      get: function get() {
        return this._usesNormalEC;
      }
    },
    tangentToEyeMatrix: {
      set: function set(e) {
        this.requiresWC = e, this.requiresNormalEC = e, this._usesTangentToEyeMat = e;
      },
      get: function get() {
        return this._usesTangentToEyeMat;
      }
    },
    positionToEyeEC: {
      set: function set(e) {
        this.requiresEC = e, this._usesPositionToEyeEC = e;
      },
      get: function get() {
        return this._usesPositionToEyeEC;
      }
    },
    st: {
      set: function set(e) {
        this.requiresTextureCoordinates = e, this._usesSt = e;
      },
      get: function get() {
        return this._usesSt;
      }
    }
  });
  var p = [new u(), new u(), new u(), new u()];

  function O(e, t) {
    var n = p,
        r = u.unpack(t, 0, n[0]),
        i = u.unpack(t, 2, n[1]),
        o = u.unpack(t, 4, n[2]);
    e.uMaxVmax = new m({
      componentDatatype: _.FLOAT,
      componentsPerAttribute: 4,
      normalize: !1,
      value: [i.x, i.y, o.x, o.y]
    });
    var s = 1 / h(r, i, o),
        a = 1 / h(r, o, i);
    e.uvMinAndExtents = new m({
      componentDatatype: _.FLOAT,
      componentsPerAttribute: 4,
      normalize: !1,
      value: [r.x, r.y, s, a]
    });
  }

  var c = new A(),
      M = new I(),
      P = new I(),
      q = new I(),
      b = {
    high: 0,
    low: 0
  };

  function R(e, t, n) {
    var r = c;
    r.height = 0, r.longitude = e.west, r.latitude = e.south;
    var i = t.project(r, M);
    r.latitude = e.north;
    var o = t.project(r, P);
    r.longitude = e.east, r.latitude = e.south;
    var s = t.project(r, q),
        a = [0, 0, 0, 0],
        u = [0, 0, 0, 0],
        h = f.encode(i.x, b);
    a[0] = h.high, u[0] = h.low, h = f.encode(i.y, b), a[1] = h.high, u[1] = h.low, h = f.encode(o.y, b), a[2] = h.high, u[2] = h.low, h = f.encode(s.x, b), a[3] = h.high, u[3] = h.low, n.planes2D_HIGH = new m({
      componentDatatype: _.FLOAT,
      componentsPerAttribute: 4,
      normalize: !1,
      value: a
    }), n.planes2D_LOW = new m({
      componentDatatype: _.FLOAT,
      componentsPerAttribute: 4,
      normalize: !1,
      value: u
    });
  }

  var L = new v(),
      F = new v(),
      W = new I(),
      H = new A(),
      Y = [new A(), new A(), new A(), new A(), new A(), new A(), new A(), new A()];
  var j = new I(),
      U = new I(),
      z = new f();

  n.getPlanarTextureCoordinateAttributes = function (e, t, n, r, i) {
    C.typeOf.object("boundingRectangle", e), C.defined("textureCoordinateRotationPoints", t), C.typeOf.object("ellipsoid", n), C.typeOf.object("projection", r);
    var o = M,
        s = j,
        a = U;
    !function (e, t, n, r, i, o) {
      var s = N.center(e, H);
      s.height = n;
      var a = A.toCartesian(s, t, W),
          u = D.eastNorthUpToFixedFrame(a, t, L),
          h = v.inverse(u, F),
          l = e.west,
          p = e.east,
          c = e.north,
          d = e.south,
          E = Y;
      E[0].latitude = d, E[0].longitude = l, E[1].latitude = c, E[1].longitude = l, E[2].latitude = c, E[2].longitude = p, E[3].latitude = d;

      var C = .5 * (l + (E[3].longitude = p)),
          _ = .5 * (c + d);

      E[4].latitude = d, E[4].longitude = C, E[5].latitude = c, E[5].longitude = C, E[6].latitude = _, E[6].longitude = l, E[7].latitude = _, E[7].longitude = p;

      for (var f = Number.POSITIVE_INFINITY, m = Number.NEGATIVE_INFINITY, x = Number.POSITIVE_INFINITY, T = Number.NEGATIVE_INFINITY, g = 0; g < 8; g++) {
        E[g].height = n;
        var w = A.toCartesian(E[g], t, W);
        v.multiplyByPoint(h, w, w), w.z = 0, f = Math.min(f, w.x), m = Math.max(m, w.x), x = Math.min(x, w.y), T = Math.max(T, w.y);
      }

      var y = r;
      y.x = f, y.y = x, y.z = 0, v.multiplyByPoint(u, y, y);
      var S = i;
      S.x = m, S.y = x, S.z = 0, v.multiplyByPoint(u, S, S), I.subtract(S, y, i);
      var O = o;
      O.x = f, O.y = T, O.z = 0, v.multiplyByPoint(u, O, O), I.subtract(O, y, o);
    }(e, n, l(i, 0), o, s, a);
    var u = {};
    O(u, t);
    var h = f.fromCartesian(o, z);
    return u.southWest_HIGH = new m({
      componentDatatype: _.FLOAT,
      componentsPerAttribute: 3,
      normalize: !1,
      value: I.pack(h.high, [0, 0, 0])
    }), u.southWest_LOW = new m({
      componentDatatype: _.FLOAT,
      componentsPerAttribute: 3,
      normalize: !1,
      value: I.pack(h.low, [0, 0, 0])
    }), u.eastward = new m({
      componentDatatype: _.FLOAT,
      componentsPerAttribute: 3,
      normalize: !1,
      value: I.pack(s, [0, 0, 0])
    }), u.northward = new m({
      componentDatatype: _.FLOAT,
      componentsPerAttribute: 3,
      normalize: !1,
      value: I.pack(a, [0, 0, 0])
    }), R(e, r, u), u;
  };

  var V = new I();

  function k(e, t, n, r) {
    var i = c;
    i.latitude = e, i.longitude = t, i.height = 0;
    var o = A.toCartesian(i, n, V),
        s = Math.sqrt(o.x * o.x + o.y * o.y),
        a = E.fastApproximateAtan2(s, o.z),
        u = E.fastApproximateAtan2(o.x, o.y);
    return r.x = a, r.y = u, r;
  }

  var G = new u();
  return n.getSphericalExtentGeometryInstanceAttributes = function (e, t, n, r) {
    C.typeOf.object("boundingRectangle", e), C.defined("textureCoordinateRotationPoints", t), C.typeOf.object("ellipsoid", n), C.typeOf.object("projection", r);
    var i = k(e.south, e.west, n, G),
        o = i.x,
        s = i.y,
        a = k(e.north, e.east, n, G),
        u = a.x,
        h = a.y,
        l = 0;
    h < s && (l = E.PI - s, s = -E.PI, h += l), o -= E.EPSILON5, s -= E.EPSILON5, u += E.EPSILON5;
    var p = 1 / ((h += E.EPSILON5) - s),
        c = 1 / (u - o),
        d = {
      sphericalExtents: new m({
        componentDatatype: _.FLOAT,
        componentsPerAttribute: 4,
        normalize: !1,
        value: [o, s, c, p]
      }),
      longitudeRotation: new m({
        componentDatatype: _.FLOAT,
        componentsPerAttribute: 1,
        normalize: !1,
        value: [l]
      })
    };
    return O(d, t), R(e, r, d), d;
  }, n.hasAttributesForTextureCoordinatePlanes = function (e) {
    return d(e.southWest_HIGH) && d(e.southWest_LOW) && d(e.northward) && d(e.eastward) && d(e.planes2D_HIGH) && d(e.planes2D_LOW) && d(e.uMaxVmax) && d(e.uvMinAndExtents);
  }, n.hasAttributesForSphericalExtents = function (e) {
    return d(e.sphericalExtents) && d(e.longitudeRotation) && d(e.planes2D_HIGH) && d(e.planes2D_LOW) && d(e.uMaxVmax) && d(e.uvMinAndExtents);
  }, n.shouldUseSphericalCoordinates = function (e) {
    return C.typeOf.object("rectangle", e), t = e, Math.max(t.width, t.height) > n.MAX_WIDTH_FOR_PLANAR_EXTENTS;
    var t;
  }, n.MAX_WIDTH_FOR_PLANAR_EXTENTS = E.toRadians(1), n;
});