"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

define(["./defined", "./DeveloperError"], function (n, o) {
  "use strict";

  var u = {};

  function f(e, t, n) {
    return "Expected " + n + " to be typeof " + t + ", actual typeof was " + e;
  }

  return u.typeOf = {}, u.defined = function (e, t) {
    if (!n(t)) throw new o(e + " is required, actual value was undefined");
  }, u.typeOf.func = function (e, t) {
    if ("function" != typeof t) throw new o(f(_typeof(t), "function", e));
  }, u.typeOf.string = function (e, t) {
    if ("string" != typeof t) throw new o(f(_typeof(t), "string", e));
  }, u.typeOf.number = function (e, t) {
    if ("number" != typeof t) throw new o(f(_typeof(t), "number", e));
  }, u.typeOf.number.lessThan = function (e, t, n) {
    if (u.typeOf.number(e, t), n <= t) throw new o("Expected " + e + " to be less than " + n + ", actual value was " + t);
  }, u.typeOf.number.lessThanOrEquals = function (e, t, n) {
    if (u.typeOf.number(e, t), n < t) throw new o("Expected " + e + " to be less than or equal to " + n + ", actual value was " + t);
  }, u.typeOf.number.greaterThan = function (e, t, n) {
    if (u.typeOf.number(e, t), t <= n) throw new o("Expected " + e + " to be greater than " + n + ", actual value was " + t);
  }, u.typeOf.number.greaterThanOrEquals = function (e, t, n) {
    if (u.typeOf.number(e, t), t < n) throw new o("Expected " + e + " to be greater than or equal to" + n + ", actual value was " + t);
  }, u.typeOf.object = function (e, t) {
    if ("object" != _typeof(t)) throw new o(f(_typeof(t), "object", e));
  }, u.typeOf.bool = function (e, t) {
    if ("boolean" != typeof t) throw new o(f(_typeof(t), "boolean", e));
  }, u.typeOf.number.equals = function (e, t, n, f) {
    if (u.typeOf.number(e, n), u.typeOf.number(t, f), n !== f) throw new o(e + " must be equal to " + t + ", the actual values are " + n + " and " + f);
  }, u;
});