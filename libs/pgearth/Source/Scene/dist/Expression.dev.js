"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

define(["../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Check", "../Core/Color", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/isArray", "../Core/Math", "../Core/RuntimeError", "../ThirdParty/jsep", "./ExpressionNodeType"], function (l, c, v, n, _, m, e, y, w, t, E, a, d) {
  "use strict";

  function r(e, t) {
    var r;
    n.typeOf.string("expression", e), e = function (e, t) {
      if (!m(t)) return e;

      for (var r in t) {
        var n, a;
        t.hasOwnProperty(r) && (n = new RegExp("\\$\\{" + r + "\\}", "g"), a = "(" + t[r] + ")", m(a) && (e = e.replace(n, a)));
      }

      return e;
    }(this._expression = e, t), e = function (e) {
      var t,
          r = e,
          n = "",
          a = r.indexOf("${");

      for (; 0 <= a;) {
        var i = r.indexOf("'"),
            u = r.indexOf('"');
        if (0 <= i && i < a) t = r.indexOf("'", i + 1), n += r.substr(0, t + 1), r = r.substr(t + 1), a = r.indexOf("${");else if (0 <= u && u < a) t = r.indexOf('"', u + 1), n += r.substr(0, t + 1), r = r.substr(t + 1), a = r.indexOf("${");else {
          n += r.substr(0, a);
          var o = r.indexOf("}");
          if (o < 0) throw new E("Unmatched {.");
          n += "czm_" + r.substr(a + 2, o - (a + 2)), r = r.substr(o + 1), a = r.indexOf("${");
        }
      }

      return n += r;
    }(e.replace(u, o)), a.addBinaryOp("=~", 0), a.addBinaryOp("!~", 0);

    try {
      r = a(e);
    } catch (e) {
      throw new E(e);
    }

    this._runtimeAst = M(this, r);
  }

  e(r.prototype, {
    expression: {
      get: function get() {
        return this._expression;
      }
    }
  });
  var h = {
    arrayIndex: 0,
    arrayArray: [[]],
    cartesian2Index: 0,
    cartesian3Index: 0,
    cartesian4Index: 0,
    cartesian2Array: [new l()],
    cartesian3Array: [new c()],
    cartesian4Array: [new v()],
    reset: function reset() {
      this.arrayIndex = 0, this.cartesian2Index = 0, this.cartesian3Index = 0, this.cartesian4Index = 0;
    },
    getArray: function getArray() {
      this.arrayIndex >= this.arrayArray.length && this.arrayArray.push([]);
      var e = this.arrayArray[this.arrayIndex++];
      return e.length = 0, e;
    },
    getCartesian2: function getCartesian2() {
      return this.cartesian2Index >= this.cartesian2Array.length && this.cartesian2Array.push(new l()), this.cartesian2Array[this.cartesian2Index++];
    },
    getCartesian3: function getCartesian3() {
      return this.cartesian3Index >= this.cartesian3Array.length && this.cartesian3Array.push(new c()), this.cartesian3Array[this.cartesian3Index++];
    },
    getCartesian4: function getCartesian4() {
      return this.cartesian4Index >= this.cartesian4Array.length && this.cartesian4Array.push(new v()), this.cartesian4Array[this.cartesian4Index++];
    }
  };
  r.prototype.evaluate = function (e, t) {
    h.reset();

    var r = this._runtimeAst.evaluate(e);

    return t instanceof _ && r instanceof v ? _.fromCartesian4(r, t) : r instanceof l || r instanceof c || r instanceof v ? r.clone(t) : r;
  }, r.prototype.evaluateColor = function (e, t) {
    h.reset();

    var r = this._runtimeAst.evaluate(e);

    return _.fromCartesian4(r, t);
  }, r.prototype.getShaderFunction = function (e, t, r, n) {
    return n + " " + e + "() \n{ \n    return " + this.getShaderExpression(t, r) + "; \n} \n";
  }, r.prototype.getShaderExpression = function (e, t) {
    return this._runtimeAst.getShaderExpression(e, t);
  };
  var p = ["!", "-", "+"],
      g = ["+", "-", "*", "/", "%", "===", "!==", ">", ">=", "<", "<=", "&&", "||", "!~", "=~"],
      i = /\${(.*?)}/g,
      u = /\\/g,
      o = "@#%",
      s = /@#%/g,
      x = new _(),
      A = {
    abs: f(Math.abs),
    sqrt: f(Math.sqrt),
    cos: f(Math.cos),
    sin: f(Math.sin),
    tan: f(Math.tan),
    acos: f(Math.acos),
    asin: f(Math.asin),
    atan: f(Math.atan),
    radians: f(t.toRadians),
    degrees: f(t.toDegrees),
    sign: f(t.sign),
    floor: f(Math.floor),
    ceil: f(Math.ceil),
    round: f(Math.round),
    exp: f(Math.exp),
    exp2: f(function (e) {
      return Math.pow(2, e);
    }),
    log: f(Math.log),
    log2: f(function (e) {
      return t.log2(e);
    }),
    fract: f(function (e) {
      return e - Math.floor(e);
    }),
    length: function length(e, t) {
      {
        if ("number" == typeof t) return Math.abs(t);
        if (t instanceof l) return l.magnitude(t);
        if (t instanceof c) return c.magnitude(t);
        if (t instanceof v) return v.magnitude(t);
      }
      throw new E('Function "' + e + '" requires a vector or number argument. Argument is ' + t + ".");
    },
    normalize: function normalize(e, t) {
      {
        if ("number" == typeof t) return 1;
        if (t instanceof l) return l.normalize(t, h.getCartesian2());
        if (t instanceof c) return c.normalize(t, h.getCartesian3());
        if (t instanceof v) return v.normalize(t, h.getCartesian4());
      }
      throw new E('Function "' + e + '" requires a vector or number argument. Argument is ' + t + ".");
    }
  },
      R = {
    atan2: L(Math.atan2, !1),
    pow: L(Math.pow, !1),
    min: L(Math.min, !0),
    max: L(Math.max, !0),
    distance: function distance(e, t, r) {
      {
        if ("number" == typeof t && "number" == typeof r) return Math.abs(t - r);
        if (t instanceof l && r instanceof l) return l.distance(t, r);
        if (t instanceof c && r instanceof c) return c.distance(t, r);
        if (t instanceof v && r instanceof v) return v.distance(t, r);
      }
      throw new E('Function "' + e + '" requires vector or number arguments of matching types. Arguments are ' + t + " and " + r + ".");
    },
    dot: function dot(e, t, r) {
      {
        if ("number" == typeof t && "number" == typeof r) return t * r;
        if (t instanceof l && r instanceof l) return l.dot(t, r);
        if (t instanceof c && r instanceof c) return c.dot(t, r);
        if (t instanceof v && r instanceof v) return v.dot(t, r);
      }
      throw new E('Function "' + e + '" requires vector or number arguments of matching types. Arguments are ' + t + " and " + r + ".");
    },
    cross: function cross(e, t, r) {
      if (t instanceof c && r instanceof c) return c.cross(t, r, h.getCartesian3());
      throw new E('Function "' + e + '" requires vec3 arguments. Arguments are ' + t + " and " + r + ".");
    }
  },
      b = {
    clamp: C(t.clamp, !0),
    mix: C(t.lerp, !0)
  };

  function f(r) {
    return function (e, t) {
      if ("number" == typeof t) return r(t);
      if (t instanceof l) return l.fromElements(r(t.x), r(t.y), h.getCartesian2());
      if (t instanceof c) return c.fromElements(r(t.x), r(t.y), r(t.z), h.getCartesian3());
      if (t instanceof v) return v.fromElements(r(t.x), r(t.y), r(t.z), r(t.w), h.getCartesian4());
      throw new E('Function "' + e + '" requires a vector or number argument. Argument is ' + t + ".");
    };
  }

  function L(n, a) {
    return function (e, t, r) {
      if (a && "number" == typeof r) {
        if ("number" == typeof t) return n(t, r);
        if (t instanceof l) return l.fromElements(n(t.x, r), n(t.y, r), h.getCartesian2());
        if (t instanceof c) return c.fromElements(n(t.x, r), n(t.y, r), n(t.z, r), h.getCartesian3());
        if (t instanceof v) return v.fromElements(n(t.x, r), n(t.y, r), n(t.z, r), n(t.w, r), h.getCartesian4());
      }

      if ("number" == typeof t && "number" == typeof r) return n(t, r);
      if (t instanceof l && r instanceof l) return l.fromElements(n(t.x, r.x), n(t.y, r.y), h.getCartesian2());
      if (t instanceof c && r instanceof c) return c.fromElements(n(t.x, r.x), n(t.y, r.y), n(t.z, r.z), h.getCartesian3());
      if (t instanceof v && r instanceof v) return v.fromElements(n(t.x, r.x), n(t.y, r.y), n(t.z, r.z), n(t.w, r.w), h.getCartesian4());
      throw new E('Function "' + e + '" requires vector or number arguments of matching types. Arguments are ' + t + " and " + r + ".");
    };
  }

  function C(a, i) {
    return function (e, t, r, n) {
      if (i && "number" == typeof n) {
        if ("number" == typeof t && "number" == typeof r) return a(t, r, n);
        if (t instanceof l && r instanceof l) return l.fromElements(a(t.x, r.x, n), a(t.y, r.y, n), h.getCartesian2());
        if (t instanceof c && r instanceof c) return c.fromElements(a(t.x, r.x, n), a(t.y, r.y, n), a(t.z, r.z, n), h.getCartesian3());
        if (t instanceof v && r instanceof v) return v.fromElements(a(t.x, r.x, n), a(t.y, r.y, n), a(t.z, r.z, n), a(t.w, r.w, n), h.getCartesian4());
      }

      if ("number" == typeof t && "number" == typeof r && "number" == typeof n) return a(t, r, n);
      if (t instanceof l && r instanceof l && n instanceof l) return l.fromElements(a(t.x, r.x, n.x), a(t.y, r.y, n.y), h.getCartesian2());
      if (t instanceof c && r instanceof c && n instanceof c) return c.fromElements(a(t.x, r.x, n.x), a(t.y, r.y, n.y), a(t.z, r.z, n.z), h.getCartesian3());
      if (t instanceof v && r instanceof v && n instanceof v) return v.fromElements(a(t.x, r.x, n.x), a(t.y, r.y, n.y), a(t.z, r.z, n.z), a(t.w, r.w, n.w), h.getCartesian4());
      throw new E('Function "' + e + '" requires vector or number arguments of matching types. Arguments are ' + t + ", " + r + ", and " + n + ".");
    };
  }

  function I(e, t, r, n, a) {
    var i;
    this._type = e, this._value = t, this._left = r, this._right = n, this._test = a, this.evaluate = void 0, (i = this)._type === d.CONDITIONAL ? i.evaluate = i._evaluateConditional : i._type === d.FUNCTION_CALL ? "test" === i._value ? i.evaluate = i._evaluateRegExpTest : "exec" === i._value ? i.evaluate = i._evaluateRegExpExec : "toString" === i._value && (i.evaluate = i._evaluateToString) : i._type === d.UNARY ? "!" === i._value ? i.evaluate = i._evaluateNot : "-" === i._value ? i.evaluate = i._evaluateNegative : "+" === i._value ? i.evaluate = i._evaluatePositive : "isNaN" === i._value ? i.evaluate = i._evaluateNaN : "isFinite" === i._value ? i.evaluate = i._evaluateIsFinite : "isExactClass" === i._value ? i.evaluate = i._evaluateIsExactClass : "isClass" === i._value ? i.evaluate = i._evaluateIsClass : "getExactClassName" === i._value ? i.evaluate = i._evaluateGetExactClassName : "Boolean" === i._value ? i.evaluate = i._evaluateBooleanConversion : "Number" === i._value ? i.evaluate = i._evaluateNumberConversion : "String" === i._value ? i.evaluate = i._evaluateStringConversion : m(A[i._value]) && (i.evaluate = function (r) {
      var n = A[r];
      return function (e) {
        var t = this._left.evaluate(e);

        return n(r, t);
      };
    }(i._value)) : i._type === d.BINARY ? "+" === i._value ? i.evaluate = i._evaluatePlus : "-" === i._value ? i.evaluate = i._evaluateMinus : "*" === i._value ? i.evaluate = i._evaluateTimes : "/" === i._value ? i.evaluate = i._evaluateDivide : "%" === i._value ? i.evaluate = i._evaluateMod : "===" === i._value ? i.evaluate = i._evaluateEqualsStrict : "!==" === i._value ? i.evaluate = i._evaluateNotEqualsStrict : "<" === i._value ? i.evaluate = i._evaluateLessThan : "<=" === i._value ? i.evaluate = i._evaluateLessThanOrEquals : ">" === i._value ? i.evaluate = i._evaluateGreaterThan : ">=" === i._value ? i.evaluate = i._evaluateGreaterThanOrEquals : "&&" === i._value ? i.evaluate = i._evaluateAnd : "||" === i._value ? i.evaluate = i._evaluateOr : "=~" === i._value ? i.evaluate = i._evaluateRegExpMatch : "!~" === i._value ? i.evaluate = i._evaluateRegExpNotMatch : m(R[i._value]) && (i.evaluate = function (n) {
      var a = R[n];
      return function (e) {
        var t = this._left.evaluate(e),
            r = this._right.evaluate(e);

        return a(n, t, r);
      };
    }(i._value)) : i._type === d.TERNARY ? i.evaluate = function (a) {
      var i = b[a];
      return function (e) {
        var t = this._left.evaluate(e),
            r = this._right.evaluate(e),
            n = this._test.evaluate(e);

        return i(a, t, r, n);
      };
    }(i._value) : i._type === d.MEMBER ? "brackets" === i._value ? i.evaluate = i._evaluateMemberBrackets : i.evaluate = i._evaluateMemberDot : i._type === d.ARRAY ? i.evaluate = i._evaluateArray : i._type === d.VARIABLE ? i.evaluate = i._evaluateVariable : i._type === d.VARIABLE_IN_STRING ? i.evaluate = i._evaluateVariableString : i._type === d.LITERAL_COLOR ? i.evaluate = i._evaluateLiteralColor : i._type === d.LITERAL_VECTOR ? i.evaluate = i._evaluateLiteralVector : i._type === d.LITERAL_STRING ? i.evaluate = i._evaluateLiteralString : i._type === d.REGEX ? i.evaluate = i._evaluateRegExp : i._type === d.BUILTIN_VARIABLE ? "tiles3d_tileset_time" === i._value && (i.evaluate = S) : i.evaluate = i._evaluateLiteral;
  }

  function N(e) {
    return e.replace(s, "\\");
  }

  function T(e, t) {
    var r,
        n,
        a,
        i,
        u = t.arguments,
        o = u.length;

    if ("MemberExpression" === t.callee.type) {
      r = t.callee.property.name;
      var s = t.callee.object;

      if ("test" === r || "exec" === r) {
        if ("regExp" !== s.callee.name) throw new E(r + " is not a function.");
        return 0 === o ? "test" === r ? new I(d.LITERAL_BOOLEAN, !1) : new I(d.LITERAL_NULL, null) : (a = M(e, s), i = M(e, u[0]), new I(d.FUNCTION_CALL, r, a, i));
      }

      if ("toString" === r) return n = M(e, s), new I(d.FUNCTION_CALL, r, n);
      throw new E('Unexpected function call "' + r + '".');
    }

    if ("color" === (r = t.callee.name)) {
      if (0 === o) return new I(d.LITERAL_COLOR, r);

      if (n = M(e, u[0]), m(u[1])) {
        var f = M(e, u[1]);
        return new I(d.LITERAL_COLOR, r, [n, f]);
      }

      return new I(d.LITERAL_COLOR, r, [n]);
    }

    if ("rgb" === r || "hsl" === r) {
      if (o < 3) throw new E(r + " requires three arguments.");
      return n = [M(e, u[0]), M(e, u[1]), M(e, u[2])], new I(d.LITERAL_COLOR, r, n);
    }

    if ("rgba" === r || "hsla" === r) {
      if (o < 4) throw new E(r + " requires four arguments.");
      return n = [M(e, u[0]), M(e, u[1]), M(e, u[2]), M(e, u[3])], new I(d.LITERAL_COLOR, r, n);
    }

    if ("vec2" === r || "vec3" === r || "vec4" === r) {
      n = new Array(o);

      for (var l = 0; l < o; ++l) {
        n[l] = M(e, u[l]);
      }

      return new I(d.LITERAL_VECTOR, r, n);
    }

    if ("isNaN" === r || "isFinite" === r) return 0 === o ? new I(d.LITERAL_BOOLEAN, "isNaN" === r) : (n = M(e, u[0]), new I(d.UNARY, r, n));

    if ("isExactClass" === r || "isClass" === r) {
      if (o < 1 || 1 < o) throw new E(r + " requires exactly one argument.");
      return n = M(e, u[0]), new I(d.UNARY, r, n);
    }

    if ("getExactClassName" === r) {
      if (0 < o) throw new E(r + " does not take any argument.");
      return new I(d.UNARY, r);
    }

    if (m(A[r])) {
      if (1 !== o) throw new E(r + " requires exactly one argument.");
      return n = M(e, u[0]), new I(d.UNARY, r, n);
    }

    if (m(R[r])) {
      if (2 !== o) throw new E(r + " requires exactly two arguments.");
      return a = M(e, u[0]), i = M(e, u[1]), new I(d.BINARY, r, a, i);
    }

    if (m(b[r])) {
      if (3 !== o) throw new E(r + " requires exactly three arguments.");
      a = M(e, u[0]), i = M(e, u[1]);
      var c = M(e, u[2]);
      return new I(d.TERNARY, r, a, i, c);
    }

    if ("Boolean" === r) return 0 === o ? new I(d.LITERAL_BOOLEAN, !1) : (n = M(e, u[0]), new I(d.UNARY, r, n));
    if ("Number" === r) return 0 === o ? new I(d.LITERAL_NUMBER, 0) : (n = M(e, u[0]), new I(d.UNARY, r, n));
    if ("String" === r) return 0 === o ? new I(d.LITERAL_STRING, "") : (n = M(e, u[0]), new I(d.UNARY, r, n));
    if ("regExp" === r) return function (e, t) {
      var r = t.arguments;
      if (0 === r.length) return new I(d.LITERAL_REGEX, new RegExp());
      var n,
          a = M(e, r[0]);

      if (1 < r.length) {
        var i = M(e, r[1]);

        if (B(a) && B(i)) {
          try {
            n = new RegExp(N(String(a._value)), i._value);
          } catch (e) {
            throw new E(e);
          }

          return new I(d.LITERAL_REGEX, n);
        }

        return new I(d.REGEX, a, i);
      }

      if (B(a)) {
        try {
          n = new RegExp(N(String(a._value)));
        } catch (e) {
          throw new E(e);
        }

        return new I(d.LITERAL_REGEX, n);
      }

      return new I(d.REGEX, a);
    }(e, t);
    throw new E('Unexpected function call "' + r + '".');
  }

  function O(e, t) {
    if ("Math" === t.object.name) return "PI" === (r = t.property.name) ? new I(d.LITERAL_NUMBER, Math.PI) : "E" === r ? new I(d.LITERAL_NUMBER, Math.E) : void 0;
    if ("Number" === t.object.name) return function (e) {
      if ("POSITIVE_INFINITY" === e.property.name) return new I(d.LITERAL_NUMBER, Number.POSITIVE_INFINITY);
    }(t);
    var r,
        n,
        a = M(e, t.object);
    return t.computed ? (n = M(e, t.property), new I(d.MEMBER, "brackets", a, n)) : (n = new I(d.LITERAL_STRING, t.property.name), new I(d.MEMBER, "dot", a, n));
  }

  function B(e) {
    return e._type >= d.LITERAL_NULL;
  }

  function M(e, t) {
    var r, n, a;
    if ("Literal" === t.type) a = _typeof((n = t).value), f = null === n.value ? new I(d.LITERAL_NULL, null) : "boolean" == a ? new I(d.LITERAL_BOOLEAN, n.value) : "number" == a ? new I(d.LITERAL_NUMBER, n.value) : "string" == a ? 0 <= n.value.indexOf("${") ? new I(d.VARIABLE_IN_STRING, n.value) : new I(d.LITERAL_STRING, N(n.value)) : void 0;else if ("CallExpression" === t.type) f = T(e, t);else if ("Identifier" === t.type) f = function (e) {
      if ("czm_" === e.name.substr(0, 4)) {
        var t = e.name.substr(4);
        return "tiles3d_" === t.substr(0, 8) ? new I(d.BUILTIN_VARIABLE, t) : new I(d.VARIABLE, t);
      }

      if ("NaN" === e.name) return new I(d.LITERAL_NUMBER, NaN);
      if ("Infinity" === e.name) return new I(d.LITERAL_NUMBER, 1 / 0);
      if ("undefined" === e.name) return new I(d.LITERAL_UNDEFINED, void 0);
      throw new E(e.name + " is not defined.");
    }(t);else if ("UnaryExpression" === t.type) {
      r = t.operator;
      var i = M(e, t.argument);
      if (!(-1 < p.indexOf(r))) throw new E('Unexpected operator "' + r + '".');
      f = new I(d.UNARY, r, i);
    } else if ("BinaryExpression" === t.type) {
      if (r = t.operator, o = M(e, t.left), s = M(e, t.right), !(-1 < g.indexOf(r))) throw new E('Unexpected operator "' + r + '".');
      f = new I(d.BINARY, r, o, s);
    } else if ("LogicalExpression" === t.type) r = t.operator, o = M(e, t.left), s = M(e, t.right), -1 < g.indexOf(r) && (f = new I(d.BINARY, r, o, s));else if ("ConditionalExpression" === t.type) var u = M(e, t.test),
        o = M(e, t.consequent),
        s = M(e, t.alternate),
        f = new I(d.CONDITIONAL, "?", o, s, u);else if ("MemberExpression" === t.type) f = O(e, t);else {
      if ("ArrayExpression" !== t.type) throw "Compound" === t.type ? new E("Provide exactly one expression.") : new E("Cannot parse expression.");

      for (var l = [], c = 0; c < t.elements.length; c++) {
        l[c] = M(e, t.elements[c]);
      }

      f = new I(d.ARRAY, l);
    }
    return f;
  }

  function S(e) {
    return m(e) ? e.content.tileset.timeSinceLoad : 0;
  }

  function q(e, t) {
    if (m(e)) return e.getProperty(t);
  }

  function U(e) {
    return "feature" === e._value;
  }

  function z(e) {
    for (var t = e._left, r = t.length, n = 0; n < r; ++n) {
      if (t[n]._type !== d.LITERAL_NUMBER) return;
    }

    var a = t[0]._value,
        i = t[1]._value,
        u = t[2]._value,
        o = 4 === r ? t[3]._value : 1;
    return _.fromHsl(a, i, u, o, x);
  }

  function F(e) {
    for (var t = e._left, r = t.length, n = 0; n < r; ++n) {
      if (t[n]._type !== d.LITERAL_NUMBER) return;
    }

    var a = x;
    return a.red = t[0]._value / 255, a.green = t[1]._value / 255, a.blue = t[2]._value / 255, a.alpha = 4 === r ? t[3]._value : 1, a;
  }

  function G(e) {
    return e % 1 == 0 ? e.toFixed(1) : e.toString();
  }

  function Y(e) {
    return "vec4(" + G(e.red) + ", " + G(e.green) + ", " + G(e.blue) + ", " + G(e.alpha) + ")";
  }

  function V(e, t, r, n) {
    for (var a = e.length, i = new Array(a), u = 0; u < a; ++u) {
      i[u] = e[u].getShaderExpression(t, r, n);
    }

    return i;
  }

  return I.prototype._evaluateLiteral = function () {
    return this._value;
  }, I.prototype._evaluateLiteralColor = function (e) {
    var t,
        r = x,
        n = this._left;
    return "color" === this._value ? m(n) ? 1 < n.length ? (_.fromCssColorString(n[0].evaluate(e), r), r.alpha = n[1].evaluate(e)) : _.fromCssColorString(n[0].evaluate(e), r) : _.fromBytes(255, 255, 255, 255, r) : "rgb" === this._value ? _.fromBytes(n[0].evaluate(e), n[1].evaluate(e), n[2].evaluate(e), 255, r) : "rgba" === this._value ? (t = 255 * n[3].evaluate(e), _.fromBytes(n[0].evaluate(e), n[1].evaluate(e), n[2].evaluate(e), t, r)) : "hsl" === this._value ? _.fromHsl(n[0].evaluate(e), n[1].evaluate(e), n[2].evaluate(e), 1, r) : "hsla" === this._value && _.fromHsl(n[0].evaluate(e), n[1].evaluate(e), n[2].evaluate(e), n[3].evaluate(e), r), v.fromColor(r, h.getCartesian4());
  }, I.prototype._evaluateLiteralVector = function (e) {
    for (var t = h.getArray(), r = this._value, n = this._left, a = n.length, i = 0; i < a; ++i) {
      var u = n[i].evaluate(e);
      if ("number" == typeof u) t.push(u);else if (u instanceof l) t.push(u.x, u.y);else if (u instanceof c) t.push(u.x, u.y, u.z);else {
        if (!(u instanceof v)) throw new E(r + " argument must be a vector or number. Argument is " + u + ".");
        t.push(u.x, u.y, u.z, u.w);
      }
    }

    var o,
        s = t.length,
        f = parseInt(r.charAt(3));
    if (0 === s) throw new E("Invalid " + r + " constructor. No valid arguments.");
    if (s < f && 1 < s) throw new E("Invalid " + r + " constructor. Not enough arguments.");
    if (f < s && 1 < a) throw new E("Invalid " + r + " constructor. Too many arguments.");
    return 1 === s && (o = t[0], t.push(o, o, o)), "vec2" === r ? l.fromArray(t, 0, h.getCartesian2()) : "vec3" === r ? c.fromArray(t, 0, h.getCartesian3()) : "vec4" === r ? v.fromArray(t, 0, h.getCartesian4()) : void 0;
  }, I.prototype._evaluateLiteralString = function () {
    return this._value;
  }, I.prototype._evaluateVariableString = function (e) {
    for (var t = this._value, r = i.exec(t); null !== r;) {
      var n = r[0],
          a = q(e, r[1]);
      m(a) || (a = ""), t = t.replace(n, a), r = i.exec(t);
    }

    return t;
  }, I.prototype._evaluateVariable = function (e) {
    return q(e, this._value);
  }, I.prototype._evaluateMemberDot = function (e) {
    if (U(this._left)) return q(e, this._right.evaluate(e));

    var t = this._left.evaluate(e);

    if (m(t)) {
      var r = this._right.evaluate(e);

      if (t instanceof l || t instanceof c || t instanceof v) {
        if ("r" === r) return t.x;
        if ("g" === r) return t.y;
        if ("b" === r) return t.z;
        if ("a" === r) return t.w;
      }

      return t[r];
    }
  }, I.prototype._evaluateMemberBrackets = function (e) {
    if (U(this._left)) return q(e, this._right.evaluate(e));

    var t = this._left.evaluate(e);

    if (m(t)) {
      var r = this._right.evaluate(e);

      if (t instanceof l || t instanceof c || t instanceof v) {
        if (0 === r || "r" === r) return t.x;
        if (1 === r || "g" === r) return t.y;
        if (2 === r || "b" === r) return t.z;
        if (3 === r || "a" === r) return t.w;
      }

      return t[r];
    }
  }, I.prototype._evaluateArray = function (e) {
    for (var t = [], r = 0; r < this._value.length; r++) {
      t[r] = this._value[r].evaluate(e);
    }

    return t;
  }, I.prototype._evaluateNot = function (e) {
    var t = this._left.evaluate(e);

    if ("boolean" != typeof t) throw new E('Operator "!" requires a boolean argument. Argument is ' + t + ".");
    return !t;
  }, I.prototype._evaluateNegative = function (e) {
    var t = this._left.evaluate(e);

    if (t instanceof l) return l.negate(t, h.getCartesian2());
    if (t instanceof c) return c.negate(t, h.getCartesian3());
    if (t instanceof v) return v.negate(t, h.getCartesian4());
    if ("number" == typeof t) return -t;
    throw new E('Operator "-" requires a vector or number argument. Argument is ' + t + ".");
  }, I.prototype._evaluatePositive = function (e) {
    var t = this._left.evaluate(e);

    if (!(t instanceof l || t instanceof c || t instanceof v || "number" == typeof t)) throw new E('Operator "+" requires a vector or number argument. Argument is ' + t + ".");
    return t;
  }, I.prototype._evaluateLessThan = function (e) {
    var t = this._left.evaluate(e),
        r = this._right.evaluate(e);

    if ("number" != typeof t || "number" != typeof r) throw new E('Operator "<" requires number arguments. Arguments are ' + t + " and " + r + ".");
    return t < r;
  }, I.prototype._evaluateLessThanOrEquals = function (e) {
    var t = this._left.evaluate(e),
        r = this._right.evaluate(e);

    if ("number" != typeof t || "number" != typeof r) throw new E('Operator "<=" requires number arguments. Arguments are ' + t + " and " + r + ".");
    return t <= r;
  }, I.prototype._evaluateGreaterThan = function (e) {
    var t = this._left.evaluate(e),
        r = this._right.evaluate(e);

    if ("number" != typeof t || "number" != typeof r) throw new E('Operator ">" requires number arguments. Arguments are ' + t + " and " + r + ".");
    return r < t;
  }, I.prototype._evaluateGreaterThanOrEquals = function (e) {
    var t = this._left.evaluate(e),
        r = this._right.evaluate(e);

    if ("number" != typeof t || "number" != typeof r) throw new E('Operator ">=" requires number arguments. Arguments are ' + t + " and " + r + ".");
    return r <= t;
  }, I.prototype._evaluateOr = function (e) {
    var t = this._left.evaluate(e);

    if ("boolean" != typeof t) throw new E('Operator "||" requires boolean arguments. First argument is ' + t + ".");
    if (t) return !0;

    var r = this._right.evaluate(e);

    if ("boolean" != typeof r) throw new E('Operator "||" requires boolean arguments. Second argument is ' + r + ".");
    return t || r;
  }, I.prototype._evaluateAnd = function (e) {
    var t = this._left.evaluate(e);

    if ("boolean" != typeof t) throw new E('Operator "&&" requires boolean arguments. First argument is ' + t + ".");
    if (!t) return !1;

    var r = this._right.evaluate(e);

    if ("boolean" != typeof r) throw new E('Operator "&&" requires boolean arguments. Second argument is ' + r + ".");
    return t && r;
  }, I.prototype._evaluatePlus = function (e) {
    var t = this._left.evaluate(e),
        r = this._right.evaluate(e);

    if (r instanceof l && t instanceof l) return l.add(t, r, h.getCartesian2());
    if (r instanceof c && t instanceof c) return c.add(t, r, h.getCartesian3());
    if (r instanceof v && t instanceof v) return v.add(t, r, h.getCartesian4());
    if ("string" == typeof t || "string" == typeof r) return t + r;
    if ("number" == typeof t && "number" == typeof r) return t + r;
    throw new E('Operator "+" requires vector or number arguments of matching types, or at least one string argument. Arguments are ' + t + " and " + r + ".");
  }, I.prototype._evaluateMinus = function (e) {
    var t = this._left.evaluate(e),
        r = this._right.evaluate(e);

    if (r instanceof l && t instanceof l) return l.subtract(t, r, h.getCartesian2());
    if (r instanceof c && t instanceof c) return c.subtract(t, r, h.getCartesian3());
    if (r instanceof v && t instanceof v) return v.subtract(t, r, h.getCartesian4());
    if ("number" == typeof t && "number" == typeof r) return t - r;
    throw new E('Operator "-" requires vector or number arguments of matching types. Arguments are ' + t + " and " + r + ".");
  }, I.prototype._evaluateTimes = function (e) {
    var t = this._left.evaluate(e),
        r = this._right.evaluate(e);

    if (r instanceof l && t instanceof l) return l.multiplyComponents(t, r, h.getCartesian2());
    if (r instanceof l && "number" == typeof t) return l.multiplyByScalar(r, t, h.getCartesian2());
    if (t instanceof l && "number" == typeof r) return l.multiplyByScalar(t, r, h.getCartesian2());
    if (r instanceof c && t instanceof c) return c.multiplyComponents(t, r, h.getCartesian3());
    if (r instanceof c && "number" == typeof t) return c.multiplyByScalar(r, t, h.getCartesian3());
    if (t instanceof c && "number" == typeof r) return c.multiplyByScalar(t, r, h.getCartesian3());
    if (r instanceof v && t instanceof v) return v.multiplyComponents(t, r, h.getCartesian4());
    if (r instanceof v && "number" == typeof t) return v.multiplyByScalar(r, t, h.getCartesian4());
    if (t instanceof v && "number" == typeof r) return v.multiplyByScalar(t, r, h.getCartesian4());
    if ("number" == typeof t && "number" == typeof r) return t * r;
    throw new E('Operator "*" requires vector or number arguments. If both arguments are vectors they must be matching types. Arguments are ' + t + " and " + r + ".");
  }, I.prototype._evaluateDivide = function (e) {
    var t = this._left.evaluate(e),
        r = this._right.evaluate(e);

    if (r instanceof l && t instanceof l) return l.divideComponents(t, r, h.getCartesian2());
    if (t instanceof l && "number" == typeof r) return l.divideByScalar(t, r, h.getCartesian2());
    if (r instanceof c && t instanceof c) return c.divideComponents(t, r, h.getCartesian3());
    if (t instanceof c && "number" == typeof r) return c.divideByScalar(t, r, h.getCartesian3());
    if (r instanceof v && t instanceof v) return v.divideComponents(t, r, h.getCartesian4());
    if (t instanceof v && "number" == typeof r) return v.divideByScalar(t, r, h.getCartesian4());
    if ("number" == typeof t && "number" == typeof r) return t / r;
    throw new E('Operator "/" requires vector or number arguments of matching types, or a number as the second argument. Arguments are ' + t + " and " + r + ".");
  }, I.prototype._evaluateMod = function (e) {
    var t = this._left.evaluate(e),
        r = this._right.evaluate(e);

    if (r instanceof l && t instanceof l) return l.fromElements(t.x % r.x, t.y % r.y, h.getCartesian2());
    if (r instanceof c && t instanceof c) return c.fromElements(t.x % r.x, t.y % r.y, t.z % r.z, h.getCartesian3());
    if (r instanceof v && t instanceof v) return v.fromElements(t.x % r.x, t.y % r.y, t.z % r.z, t.w % r.w, h.getCartesian4());
    if ("number" == typeof t && "number" == typeof r) return t % r;
    throw new E('Operator "%" requires vector or number arguments of matching types. Arguments are ' + t + " and " + r + ".");
  }, I.prototype._evaluateEqualsStrict = function (e) {
    var t = this._left.evaluate(e),
        r = this._right.evaluate(e);

    return r instanceof l && t instanceof l || r instanceof c && t instanceof c || r instanceof v && t instanceof v ? t.equals(r) : t === r;
  }, I.prototype._evaluateNotEqualsStrict = function (e) {
    var t = this._left.evaluate(e),
        r = this._right.evaluate(e);

    return r instanceof l && t instanceof l || r instanceof c && t instanceof c || r instanceof v && t instanceof v ? !t.equals(r) : t !== r;
  }, I.prototype._evaluateConditional = function (e) {
    var t = this._test.evaluate(e);

    if ("boolean" != typeof t) throw new E("Conditional argument of conditional expression must be a boolean. Argument is " + t + ".");
    return t ? this._left.evaluate(e) : this._right.evaluate(e);
  }, I.prototype._evaluateNaN = function (e) {
    return isNaN(this._left.evaluate(e));
  }, I.prototype._evaluateIsFinite = function (e) {
    return isFinite(this._left.evaluate(e));
  }, I.prototype._evaluateIsExactClass = function (e) {
    return !!m(e) && e.isExactClass(this._left.evaluate(e));
  }, I.prototype._evaluateIsClass = function (e) {
    return !!m(e) && e.isClass(this._left.evaluate(e));
  }, I.prototype._evaluateGetExactClassName = function (e) {
    if (m(e)) return e.getExactClassName();
  }, I.prototype._evaluateBooleanConversion = function (e) {
    return Boolean(this._left.evaluate(e));
  }, I.prototype._evaluateNumberConversion = function (e) {
    return Number(this._left.evaluate(e));
  }, I.prototype._evaluateStringConversion = function (e) {
    return String(this._left.evaluate(e));
  }, I.prototype._evaluateRegExp = function (e) {
    var t,
        r = this._value.evaluate(e),
        n = "";

    m(this._left) && (n = this._left.evaluate(e));

    try {
      t = new RegExp(r, n);
    } catch (e) {
      throw new E(e);
    }

    return t;
  }, I.prototype._evaluateRegExpTest = function (e) {
    var t = this._left.evaluate(e),
        r = this._right.evaluate(e);

    if (!(t instanceof RegExp && "string" == typeof r)) throw new E("RegExp.test requires the first argument to be a RegExp and the second argument to be a string. Arguments are " + t + " and " + r + ".");
    return t.test(r);
  }, I.prototype._evaluateRegExpMatch = function (e) {
    var t = this._left.evaluate(e),
        r = this._right.evaluate(e);

    if (t instanceof RegExp && "string" == typeof r) return t.test(r);
    if (r instanceof RegExp && "string" == typeof t) return r.test(t);
    throw new E('Operator "=~" requires one RegExp argument and one string argument. Arguments are ' + t + " and " + r + ".");
  }, I.prototype._evaluateRegExpNotMatch = function (e) {
    var t = this._left.evaluate(e),
        r = this._right.evaluate(e);

    if (t instanceof RegExp && "string" == typeof r) return !t.test(r);
    if (r instanceof RegExp && "string" == typeof t) return !r.test(t);
    throw new E('Operator "!~" requires one RegExp argument and one string argument. Arguments are ' + t + " and " + r + ".");
  }, I.prototype._evaluateRegExpExec = function (e) {
    var t = this._left.evaluate(e),
        r = this._right.evaluate(e);

    if (!(t instanceof RegExp && "string" == typeof r)) throw new E("RegExp.exec requires the first argument to be a RegExp and the second argument to be a string. Arguments are " + t + " and " + r + ".");
    var n = t.exec(r);
    return m(n) ? n[1] : null;
  }, I.prototype._evaluateToString = function (e) {
    var t = this._left.evaluate(e);

    if (t instanceof RegExp || t instanceof l || t instanceof c || t instanceof v) return String(t);
    throw new E('Unexpected function call "' + this._value + '".');
  }, I.prototype.getShaderExpression = function (e, t, r) {
    var n,
        a,
        i,
        u,
        o,
        s = this._type,
        f = this._value;

    switch (m(this._left) && (a = w(this._left) ? V(this._left, e, t, this) : this._left.getShaderExpression(e, t, this)), m(this._right) && (i = this._right.getShaderExpression(e, t, this)), m(this._test) && (u = this._test.getShaderExpression(e, t, this)), w(this._value) && (f = V(this._value, e, t, this)), s) {
      case d.VARIABLE:
        return e + f;

      case d.UNARY:
        if ("Boolean" === f) return "bool(" + a + ")";
        if ("Number" === f) return "float(" + a + ")";
        if ("round" === f) return "floor(" + a + " + 0.5)";
        if (m(A[f])) return f + "(" + a + ")";
        if ("isNaN" === f || "isFinite" === f || "String" === f || "isExactClass" === f || "isClass" === f || "getExactClassName" === f) throw new E('Error generating style shader: "' + f + '" is not supported.');
        return m(A[f]) ? f + "(" + a + ")" : f + a;

      case d.BINARY:
        return "%" === f ? "mod(" + a + ", " + i + ")" : "===" === f ? "(" + a + " == " + i + ")" : "!==" === f ? "(" + a + " != " + i + ")" : "atan2" === f ? "atan(" + a + ", " + i + ")" : m(R[f]) ? f + "(" + a + ", " + i + ")" : "(" + a + " " + f + " " + i + ")";

      case d.TERNARY:
        if (m(b[f])) return f + "(" + a + ", " + i + ", " + u + ")";
        break;

      case d.CONDITIONAL:
        return "(" + u + " ? " + a + " : " + i + ")";

      case d.MEMBER:
        return "r" === i || "x" === i || "0.0" === i ? a + "[0]" : "g" === i || "y" === i || "1.0" === i ? a + "[1]" : "b" === i || "z" === i || "2.0" === i ? a + "[2]" : "a" === i || "w" === i || "3.0" === i ? a + "[3]" : a + "[int(" + i + ")]";

      case d.FUNCTION_CALL:
        throw new E('Error generating style shader: "' + f + '" is not supported.');

      case d.ARRAY:
        if (4 === f.length) return "vec4(" + f[0] + ", " + f[1] + ", " + f[2] + ", " + f[3] + ")";
        if (3 === f.length) return "vec3(" + f[0] + ", " + f[1] + ", " + f[2] + ")";
        if (2 === f.length) return "vec2(" + f[0] + ", " + f[1] + ")";
        throw new E("Error generating style shader: Invalid array length. Array length should be 2, 3, or 4.");

      case d.REGEX:
        throw new E("Error generating style shader: Regular expressions are not supported.");

      case d.VARIABLE_IN_STRING:
        throw new E("Error generating style shader: Converting a variable to a string is not supported.");

      case d.LITERAL_NULL:
        throw new E("Error generating style shader: null is not supported.");

      case d.LITERAL_BOOLEAN:
        return f ? "true" : "false";

      case d.LITERAL_NUMBER:
        return G(f);

      case d.LITERAL_STRING:
        if (m(r) && r._type === d.MEMBER && ("r" === f || "g" === f || "b" === f || "a" === f || "x" === f || "y" === f || "z" === f || "w" === f)) return f;
        if (n = _.fromCssColorString(f, x), m(n)) return "vec3(" + G((o = n).red) + ", " + G(o.green) + ", " + G(o.blue) + ")";
        throw new E("Error generating style shader: String literals are not supported.");

      case d.LITERAL_COLOR:
        var l = a;

        if ("color" === f) {
          if (!m(l)) return "vec4(1.0)";

          if (1 < l.length) {
            var c = l[0],
                v = l[1];
            return "1.0" !== v && (t.translucent = !0), "vec4(" + c + ", " + v + ")";
          }

          return "vec4(" + l[0] + ", 1.0)";
        }

        if ("rgb" === f) return n = F(this), m(n) ? Y(n) : "vec4(" + l[0] + " / 255.0, " + l[1] + " / 255.0, " + l[2] + " / 255.0, 1.0)";
        if ("rgba" === f) return "1.0" !== l[3] && (t.translucent = !0), n = F(this), m(n) ? Y(n) : "vec4(" + l[0] + " / 255.0, " + l[1] + " / 255.0, " + l[2] + " / 255.0, " + l[3] + ")";
        if ("hsl" === f) return n = z(this), m(n) ? Y(n) : "vec4(czm_HSLToRGB(vec3(" + l[0] + ", " + l[1] + ", " + l[2] + ")), 1.0)";
        if ("hsla" === f) return n = z(this), m(n) ? (1 !== n.alpha && (t.translucent = !0), Y(n)) : ("1.0" !== l[3] && (t.translucent = !0), "vec4(czm_HSLToRGB(vec3(" + l[0] + ", " + l[1] + ", " + l[2] + ")), " + l[3] + ")");
        break;

      case d.LITERAL_VECTOR:
        if (!m(a)) throw new y("left should always be defined for type ExpressionNodeType.LITERAL_VECTOR");

        for (var h = a.length, p = f + "(", g = 0; g < h; ++g) {
          p += a[g], g < h - 1 && (p += ", ");
        }

        return p += ")";

      case d.LITERAL_REGEX:
        throw new E("Error generating style shader: Regular expressions are not supported.");

      case d.LITERAL_UNDEFINED:
        throw new E("Error generating style shader: undefined is not supported.");

      case d.BUILTIN_VARIABLE:
        if ("tiles3d_tileset_time" === f) return "u_time";
    }
  }, r;
});