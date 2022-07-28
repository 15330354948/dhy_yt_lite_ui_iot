"use strict";

define(["./defined", "./defineProperties"], function (e, t) {
  "use strict";

  function i() {
    this.head = void 0, this.tail = void 0, this._length = 0;
  }

  function n(t, i, e) {
    this.item = t, this.previous = i, this.next = e;
  }

  function o(t, i) {
    e(i.previous) && e(i.next) ? (i.previous.next = i.next, i.next.previous = i.previous) : e(i.previous) ? (i.previous.next = void 0, t.tail = i.previous) : e(i.next) ? (i.next.previous = void 0, t.head = i.next) : (t.head = void 0, t.tail = void 0), i.next = void 0, i.previous = void 0;
  }

  return t(i.prototype, {
    length: {
      get: function get() {
        return this._length;
      }
    }
  }), i.prototype.add = function (t) {
    var i = new n(t, this.tail, void 0);
    return e(this.tail) ? this.tail.next = i : this.head = i, this.tail = i, ++this._length, i;
  }, i.prototype.remove = function (t) {
    e(t) && (o(this, t), --this._length);
  }, i.prototype.splice = function (t, i) {
    var e;
    t !== i && (o(this, i), e = t.next, t.next = i, this.tail === t ? this.tail = i : e.previous = i, i.next = e, i.previous = t);
  }, i;
});