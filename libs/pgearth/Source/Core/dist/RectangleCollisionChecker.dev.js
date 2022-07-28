"use strict";

define(["../ThirdParty/rbush", "./Check"], function (t, r) {
  "use strict";

  function e() {
    this._tree = t();
  }

  function i() {
    this.minX = 0, this.minY = 0, this.maxX = 0, this.maxY = 0, this.id = "";
  }

  function o(t, e) {
    return t.id === e.id;
  }

  i.fromRectangleAndId = function (t, e, n) {
    return n.minX = e.west, n.minY = e.south, n.maxX = e.east, n.maxY = e.north, n.id = t, n;
  }, e.prototype.insert = function (t, e) {
    r.typeOf.string("id", t), r.typeOf.object("rectangle", e);
    var n = i.fromRectangleAndId(t, e, new i());

    this._tree.insert(n);
  };
  var c = new i();

  e.prototype.remove = function (t, e) {
    r.typeOf.string("id", t), r.typeOf.object("rectangle", e);
    var n = i.fromRectangleAndId(t, e, c);

    this._tree.remove(n, o);
  };

  var n = new i();
  return e.prototype.collides = function (t) {
    r.typeOf.object("rectangle", t);
    var e = i.fromRectangleAndId("", t, n);
    return this._tree.collides(e);
  }, e;
});