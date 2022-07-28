"use strict";

define(function () {
  "use strict";

  var f = "__knockoutObservables",
      l = "__knockoutSubscribable";

  function o(u, e) {
    if (!u) throw new Error("When calling ko.track, you must pass an object as the first parameter.");
    var s = this,
        c = n(u, !0);
    return (e = e || Object.getOwnPropertyNames(u)).forEach(function (e) {
      var r, t, n, o, a, i;
      e !== f && e !== l && (e in c || (t = (r = u[e]) instanceof Array, n = s.isObservable(r) ? r : t ? s.observableArray(r) : s.observable(r), Object.defineProperty(u, e, {
        configurable: !0,
        enumerable: !0,
        get: n,
        set: s.isWriteableObservable(n) ? n : void 0
      }), c[e] = n, t && (a = n, i = null, (o = s).computed(function () {
        i && (i.dispose(), i = null);
        var e,
            r = a();
        r instanceof Array && (e = a, i = function (e, r) {
          var t,
              n = r[l];
          return n || (n = new e.subscribable(), Object.defineProperty(r, l, {
            value: n
          }), function (t, n, o) {
            ["pop", "push", "reverse", "shift", "sort", "splice", "unshift"].forEach(function (e) {
              var r = t[e];

              t[e] = function () {
                var e = r.apply(this, arguments);
                return !0 !== o.pause && n.notifySubscribers(this), e;
              };
            });
          }(r, n, t = {}), function (t, n, o, a) {
            ["remove", "removeAll", "destroy", "destroyAll", "replace"].forEach(function (r) {
              Object.defineProperty(n, r, {
                enumerable: !1,
                value: function value() {
                  var e;
                  a.pause = !0;

                  try {
                    e = t.observableArray.fn[r].apply(t.observableArray(n), arguments);
                  } finally {
                    a.pause = !1;
                  }

                  return o.notifySubscribers(n), e;
                }
              });
            });
          }(e, r, n, t)), n;
        }(o, r).subscribe(e));
      }))));
    }), u;
  }

  function n(e, r) {
    var t = e[f];
    return !t && r && (t = {}, Object.defineProperty(e, f, {
      value: t
    })), t;
  }

  function r(e, r, t) {
    var n = {
      owner: e,
      deferEvaluation: !0
    };
    if ("function" == typeof t) n.read = t;else {
      if ("value" in t) throw new Error('For ko.defineProperty, you must not specify a "value" for the property. You must provide a "get" function.');
      if ("function" != typeof t.get) throw new Error('For ko.defineProperty, the third parameter must be either an evaluator function, or an options object containing a function called "get".');
      n.read = t.get, n.write = t.set;
    }
    return e[r] = this.computed(n), o.call(this, e, [r]), e;
  }

  function a(e, r) {
    if (!e) return null;
    var t = n(e, !1);
    return t && t[r] || null;
  }

  function t(e, r) {
    var t = a(e, r);
    t && t.valueHasMutated();
  }

  return {
    attachToKo: function attachToKo(e) {
      e.track = o, e.getObservable = a, e.valueHasMutated = t, e.defineProperty = r;
    }
  };
});