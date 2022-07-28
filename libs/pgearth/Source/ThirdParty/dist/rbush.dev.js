"use strict";

define(["./quickselect"], function (o) {
  "use strict";

  function n(t, i) {
    if (!(this instanceof n)) return new n(t, i);
    this._maxEntries = Math.max(4, t || 9), this._minEntries = Math.max(2, Math.ceil(.4 * this._maxEntries)), i && this._initFormat(i), this.clear();
  }

  function f(t, i) {
    M(t, 0, t.children.length, i, t);
  }

  function M(t, i, n, h, a) {
    (a = a || x(null)).minX = 1 / 0, a.minY = 1 / 0, a.maxX = -1 / 0, a.maxY = -1 / 0;

    for (var r, e = i; e < n; e++) {
      r = t.children[e], c(a, t.leaf ? h(r) : r);
    }

    return a;
  }

  function c(t, i) {
    return t.minX = Math.min(t.minX, i.minX), t.minY = Math.min(t.minY, i.minY), t.maxX = Math.max(t.maxX, i.maxX), t.maxY = Math.max(t.maxY, i.maxY), t;
  }

  function r(t, i) {
    return t.minX - i.minX;
  }

  function e(t, i) {
    return t.minY - i.minY;
  }

  function X(t) {
    return (t.maxX - t.minX) * (t.maxY - t.minY);
  }

  function m(t) {
    return t.maxX - t.minX + (t.maxY - t.minY);
  }

  function u(t, i) {
    return t.minX <= i.minX && t.minY <= i.minY && i.maxX <= t.maxX && i.maxY <= t.maxY;
  }

  function l(t, i) {
    return i.minX <= t.maxX && i.minY <= t.maxY && i.maxX >= t.minX && i.maxY >= t.minY;
  }

  function x(t) {
    return {
      children: t,
      height: 1,
      leaf: !0,
      minX: 1 / 0,
      minY: 1 / 0,
      maxX: -1 / 0,
      maxY: -1 / 0
    };
  }

  function d(t, i, n, h, a) {
    for (var r, e = [i, n]; e.length;) {
      (n = e.pop()) - (i = e.pop()) <= h || (r = i + Math.ceil((n - i) / h / 2) * h, o(t, r, i, n, a), e.push(i, r, r, n));
    }
  }

  return n.prototype = {
    all: function all() {
      return this._all(this.data, []);
    },
    search: function search(t) {
      var i = this.data,
          n = [],
          h = this.toBBox;
      if (!l(t, i)) return n;

      for (var a, r, e, o, s = []; i;) {
        for (a = 0, r = i.children.length; a < r; a++) {
          e = i.children[a], l(t, o = i.leaf ? h(e) : e) && (i.leaf ? n.push(e) : u(t, o) ? this._all(e, n) : s.push(e));
        }

        i = s.pop();
      }

      return n;
    },
    collides: function collides(t) {
      var i = this.data,
          n = this.toBBox;
      if (!l(t, i)) return !1;

      for (var h, a, r, e, o = []; i;) {
        for (h = 0, a = i.children.length; h < a; h++) {
          if (r = i.children[h], l(t, e = i.leaf ? n(r) : r)) {
            if (i.leaf || u(t, e)) return !0;
            o.push(r);
          }
        }

        i = o.pop();
      }

      return !1;
    },
    load: function load(t) {
      if (!t || !t.length) return this;

      if (t.length < this._minEntries) {
        for (var i = 0, n = t.length; i < n; i++) {
          this.insert(t[i]);
        }

        return this;
      }

      var h,
          a = this._build(t.slice(), 0, t.length - 1, 0);

      return this.data.children.length ? this.data.height === a.height ? this._splitRoot(this.data, a) : (this.data.height < a.height && (h = this.data, this.data = a, a = h), this._insert(a, this.data.height - a.height - 1, !0)) : this.data = a, this;
    },
    insert: function insert(t) {
      return t && this._insert(t, this.data.height - 1), this;
    },
    clear: function clear() {
      return this.data = x([]), this;
    },
    remove: function remove(t, i) {
      if (!t) return this;

      for (var n, h, a, r, e = this.data, o = this.toBBox(t), s = [], l = []; e || s.length;) {
        if (e || (e = s.pop(), h = s[s.length - 1], n = l.pop(), r = !0), e.leaf && -1 !== (a = function (t, i, n) {
          if (!n) return i.indexOf(t);

          for (var h = 0; h < i.length; h++) {
            if (n(t, i[h])) return h;
          }

          return -1;
        }(t, e.children, i))) return e.children.splice(a, 1), s.push(e), this._condense(s), this;
        r || e.leaf || !u(e, o) ? h ? (n++, e = h.children[n], r = !1) : e = null : (s.push(e), l.push(n), n = 0, e = (h = e).children[0]);
      }

      return this;
    },
    toBBox: function toBBox(t) {
      return t;
    },
    compareMinX: r,
    compareMinY: e,
    toJSON: function toJSON() {
      return this.data;
    },
    fromJSON: function fromJSON(t) {
      return this.data = t, this;
    },
    _all: function _all(t, i) {
      for (var n = []; t;) {
        t.leaf ? i.push.apply(i, t.children) : n.push.apply(n, t.children), t = n.pop();
      }

      return i;
    },
    _build: function _build(t, i, n, h) {
      var a,
          r = n - i + 1,
          e = this._maxEntries;
      if (r <= e) return f(a = x(t.slice(i, n + 1)), this.toBBox), a;
      h || (h = Math.ceil(Math.log(r) / Math.log(e)), e = Math.ceil(r / Math.pow(e, h - 1))), (a = x([])).leaf = !1, a.height = h;
      var o,
          s,
          l,
          c,
          m = Math.ceil(r / e),
          u = m * Math.ceil(Math.sqrt(e));

      for (d(t, i, n, u, this.compareMinX), o = i; o <= n; o += u) {
        for (d(t, o, l = Math.min(o + u - 1, n), m, this.compareMinY), s = o; s <= l; s += m) {
          c = Math.min(s + m - 1, l), a.children.push(this._build(t, s, c, h - 1));
        }
      }

      return f(a, this.toBBox), a;
    },
    _chooseSubtree: function _chooseSubtree(t, i, n, h) {
      for (var a, r, e, o, s, l, c, m, u, f; h.push(i), !i.leaf && h.length - 1 !== n;) {
        for (c = m = 1 / 0, a = 0, r = i.children.length; a < r; a++) {
          s = X(e = i.children[a]), u = t, f = e, (l = (Math.max(f.maxX, u.maxX) - Math.min(f.minX, u.minX)) * (Math.max(f.maxY, u.maxY) - Math.min(f.minY, u.minY)) - s) < m ? (m = l, c = s < c ? s : c, o = e) : l === m && s < c && (c = s, o = e);
        }

        i = o || i.children[0];
      }

      return i;
    },
    _insert: function _insert(t, i, n) {
      var h = this.toBBox,
          a = n ? t : h(t),
          r = [],
          e = this._chooseSubtree(a, this.data, i, r);

      for (e.children.push(t), c(e, a); 0 <= i && r[i].children.length > this._maxEntries;) {
        this._split(r, i), i--;
      }

      this._adjustParentBBoxes(a, r, i);
    },
    _split: function _split(t, i) {
      var n = t[i],
          h = n.children.length,
          a = this._minEntries;

      this._chooseSplitAxis(n, a, h);

      var r = this._chooseSplitIndex(n, a, h),
          e = x(n.children.splice(r, n.children.length - r));

      e.height = n.height, e.leaf = n.leaf, f(n, this.toBBox), f(e, this.toBBox), i ? t[i - 1].children.push(e) : this._splitRoot(n, e);
    },
    _splitRoot: function _splitRoot(t, i) {
      this.data = x([t, i]), this.data.height = t.height + 1, this.data.leaf = !1, f(this.data, this.toBBox);
    },
    _chooseSplitIndex: function _chooseSplitIndex(t, i, n) {
      for (var h, a, r, e, o, s, l, c, m, u, f, x, d = o = 1 / 0, p = i; p <= n - i; p++) {
        h = M(t, 0, p, this.toBBox), a = M(t, p, n, this.toBBox), l = h, c = a, 0, m = Math.max(l.minX, c.minX), u = Math.max(l.minY, c.minY), f = Math.min(l.maxX, c.maxX), x = Math.min(l.maxY, c.maxY), r = Math.max(0, f - m) * Math.max(0, x - u), e = X(h) + X(a), r < d ? (d = r, s = p, o = e < o ? e : o) : r === d && e < o && (o = e, s = p);
      }

      return s;
    },
    _chooseSplitAxis: function _chooseSplitAxis(t, i, n) {
      var h = t.leaf ? this.compareMinX : r,
          a = t.leaf ? this.compareMinY : e;
      this._allDistMargin(t, i, n, h) < this._allDistMargin(t, i, n, a) && t.children.sort(h);
    },
    _allDistMargin: function _allDistMargin(t, i, n, h) {
      t.children.sort(h);

      for (var a, r = this.toBBox, e = M(t, 0, i, r), o = M(t, n - i, n, r), s = m(e) + m(o), l = i; l < n - i; l++) {
        a = t.children[l], c(e, t.leaf ? r(a) : a), s += m(e);
      }

      for (l = n - i - 1; i <= l; l--) {
        a = t.children[l], c(o, t.leaf ? r(a) : a), s += m(o);
      }

      return s;
    },
    _adjustParentBBoxes: function _adjustParentBBoxes(t, i, n) {
      for (var h = n; 0 <= h; h--) {
        c(i[h], t);
      }
    },
    _condense: function _condense(t) {
      for (var i, n = t.length - 1; 0 <= n; n--) {
        0 === t[n].children.length ? 0 < n ? (i = t[n - 1].children).splice(i.indexOf(t[n]), 1) : this.clear() : f(t[n], this.toBBox);
      }
    },
    _initFormat: function _initFormat(t) {
      var i = ["return a", " - b", ";"];
      this.compareMinX = new Function("a", "b", i.join(t[0])), this.compareMinY = new Function("a", "b", i.join(t[1])), this.toBBox = new Function("a", "return {minX: a" + t[0] + ", minY: a" + t[1] + ", maxX: a" + t[2] + ", maxY: a" + t[3] + "};");
    }
  }, n;
});