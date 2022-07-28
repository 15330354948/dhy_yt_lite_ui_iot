"use strict";

define(function () {
  function h(t) {
    var e;
    t instanceof h ? (this.scheme = t.scheme, this.authority = t.authority, this.path = t.path, this.query = t.query, this.fragment = t.fragment) : t && (e = r.exec(t), this.scheme = e[1], this.authority = e[2], this.path = e[3], this.query = e[4], this.fragment = e[5]);
  }

  h.prototype.scheme = null, h.prototype.authority = null, h.prototype.path = "", h.prototype.query = null, h.prototype.fragment = null;
  var r = new RegExp("^(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*)(?:\\?([^#]*))?(?:#(.*))?$");
  h.prototype.getScheme = function () {
    return this.scheme;
  }, h.prototype.getAuthority = function () {
    return this.authority;
  }, h.prototype.getPath = function () {
    return this.path;
  }, h.prototype.getQuery = function () {
    return this.query;
  }, h.prototype.getFragment = function () {
    return this.fragment;
  }, h.prototype.isAbsolute = function () {
    return !!this.scheme && !this.fragment;
  }, h.prototype.isSameDocumentAs = function (t) {
    return t.scheme == this.scheme && t.authority == this.authority && t.path == this.path && t.query == this.query;
  }, h.prototype.equals = function (t) {
    return this.isSameDocumentAs(t) && t.fragment == this.fragment;
  }, h.prototype.normalize = function () {
    this.removeDotSegments(), this.scheme && (this.scheme = this.scheme.toLowerCase()), this.authority && (this.authority = this.authority.replace(e, a).replace(t, s)), this.path && (this.path = this.path.replace(t, s)), this.query && (this.query = this.query.replace(t, s)), this.fragment && (this.fragment = this.fragment.replace(t, s));
  };
  var t = /%[0-9a-z]{2}/gi,
      i = /[a-zA-Z0-9\-\._~]/,
      e = /(.*@)?([^@:]*)(:.*)?/;

  function s(t) {
    var e = unescape(t);
    return i.test(e) ? e : t.toUpperCase();
  }

  function a(t, e, h, r) {
    return (e || "") + h.toLowerCase() + (r || "");
  }

  return h.prototype.resolve = function (t) {
    var e = new h();
    return this.scheme ? (e.scheme = this.scheme, e.authority = this.authority, e.path = this.path, e.query = this.query) : (e.scheme = t.scheme, this.authority ? (e.authority = this.authority, e.path = this.path, e.query = this.query) : (e.authority = t.authority, "" == this.path ? (e.path = t.path, e.query = this.query || t.query) : ("/" == this.path.charAt(0) ? e.path = this.path : t.authority && "" == t.path ? e.path = "/" + this.path : e.path = t.path.substring(0, t.path.lastIndexOf("/") + 1) + this.path, e.removeDotSegments(), e.query = this.query))), e.fragment = this.fragment, e;
  }, h.prototype.removeDotSegments = function () {
    var t,
        e = this.path.split("/"),
        h = [],
        r = "" == e[0];
    r && e.shift();

    for ("" == e[0] && e.shift(); e.length;) {
      ".." == (t = e.shift()) ? h.pop() : "." != t && h.push(t);
    }

    "." != t && ".." != t || h.push(""), r && h.unshift(""), this.path = h.join("/");
  }, h.prototype.toString = function () {
    var t = "";
    return this.scheme && (t += this.scheme + ":"), this.authority && (t += "//" + this.authority), t += this.path, this.query && (t += "?" + this.query), this.fragment && (t += "#" + this.fragment), t;
  }, h;
});