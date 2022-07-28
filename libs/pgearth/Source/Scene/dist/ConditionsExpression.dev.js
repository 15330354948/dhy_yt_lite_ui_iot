"use strict";

define(["../Core/clone", "../Core/defined", "../Core/defineProperties", "./Expression"], function (t, d, n, f) {
  "use strict";

  function i(n, i) {
    this._conditionsExpression = t(n, !0), this._conditions = n.conditions, this._runtimeConditions = void 0, function (n, i) {
      var t = [],
          e = n._conditions;
      if (!d(e)) return;

      for (var o = e.length, r = 0; r < o; ++r) {
        var s = e[r],
            u = String(s[0]),
            a = String(s[1]);
        t.push(new c(new f(u, i), new f(a, i)));
      }

      n._runtimeConditions = t;
    }(this, i);
  }

  function c(n, i) {
    this.condition = n, this.expression = i;
  }

  return n(i.prototype, {
    conditionsExpression: {
      get: function get() {
        return this._conditionsExpression;
      }
    }
  }), i.prototype.evaluate = function (n, i) {
    var t = this._runtimeConditions;
    if (d(t)) for (var e = t.length, o = 0; o < e; ++o) {
      var r = t[o];
      if (r.condition.evaluate(n)) return r.expression.evaluate(n, i);
    }
  }, i.prototype.evaluateColor = function (n, i) {
    var t = this._runtimeConditions;
    if (d(t)) for (var e = t.length, o = 0; o < e; ++o) {
      var r = t[o];
      if (r.condition.evaluate(n)) return r.expression.evaluateColor(n, i);
    }
  }, i.prototype.getShaderFunction = function (n, i, t, e) {
    var o = this._runtimeConditions;

    if (d(o) && 0 !== o.length) {
      for (var r = "", s = o.length, u = 0; u < s; ++u) {
        var a = o[u];
        r += "    " + (0 === u ? "if" : "else if") + " (" + a.condition.getShaderExpression(i, t) + ") \n    { \n        return " + a.expression.getShaderExpression(i, t) + "; \n    } \n";
      }

      return r = e + " " + n + "() \n{ \n" + r + "    return " + e + "(1.0); \n} \n";
    }
  }, i;
});