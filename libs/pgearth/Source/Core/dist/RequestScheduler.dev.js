"use strict";

define(["../ThirdParty/Uri", "../ThirdParty/when", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Event", "./Heap", "./isBlobUri", "./isDataUri", "./RequestState"], function (u, t, n, r, i, e, s, c, f, a, o) {
  "use strict";

  var l = {
    numberOfAttemptedRequests: 0,
    numberOfActiveRequests: 0,
    numberOfCancelledRequests: 0,
    numberOfCancelledActiveRequests: 0,
    numberOfFailedRequests: 0,
    numberOfActiveRequestsEver: 0,
    lastNumberOfActiveRequests: 0
  },
      m = 20,
      v = new c({
    comparator: function comparator(e, t) {
      return e.priority - t.priority;
    }
  });
  v.maximumLength = m, v.reserve(m);
  var q = [],
      d = {},
      R = "undefined" != typeof document ? new u(document.location.href) : new u(),
      b = new s();

  function O() {}

  function p(e) {
    i(e.priorityFunction) && (e.priority = e.priorityFunction());
  }

  function A(e) {
    var t = r(O.requestsByServer[e], O.maximumRequestsPerServer);
    return d[e] < t;
  }

  function h(e) {
    return e.state === o.UNISSUED && (e.state = o.ISSUED, e.deferred = t.defer()), e.deferred.promise;
  }

  function y(e) {
    var t,
        r,
        s = h(e);
    return e.state = o.ACTIVE, q.push(e), ++l.numberOfActiveRequests, ++l.numberOfActiveRequestsEver, ++d[e.serverKey], e.requestFunction().then((r = e, function (e) {
      r.state !== o.CANCELLED && (--l.numberOfActiveRequests, --d[r.serverKey], b.raiseEvent(), r.state = o.RECEIVED, r.deferred.resolve(e));
    })).otherwise((t = e, function (e) {
      t.state !== o.CANCELLED && (++l.numberOfFailedRequests, --l.numberOfActiveRequests, --d[t.serverKey], b.raiseEvent(e), t.state = o.FAILED, t.deferred.reject(e));
    })), s;
  }

  function E(e) {
    var t = e.state === o.ACTIVE;
    e.state = o.CANCELLED, ++l.numberOfCancelledRequests, e.deferred.reject(), t && (--l.numberOfActiveRequests, --d[e.serverKey], ++l.numberOfCancelledActiveRequests), i(e.cancelFunction) && e.cancelFunction();
  }

  return O.maximumRequests = 50, O.maximumRequestsPerServer = 6, O.requestsByServer = {
    "api.pgEarth.com:443": 18,
    "assets.pgEarth.com:443": 18
  }, O.throttleRequests = !0, O.debugShowStatistics = !1, O.requestCompletedEvent = b, e(O, {
    statistics: {
      get: function get() {
        return l;
      }
    },
    priorityHeapLength: {
      get: function get() {
        return m;
      },
      set: function set(e) {
        if (e < m) for (; v.length > e;) {
          E(v.pop());
        }
        m = e, v.maximumLength = e, v.reserve(e);
      }
    }
  }), O.update = function () {
    for (var e, t = 0, r = q.length, s = 0; s < r; ++s) {
      (e = q[s]).cancelled && E(e), e.state === o.ACTIVE ? 0 < t && (q[s - t] = e) : ++t;
    }

    q.length -= t;
    var u = v.internalArray,
        n = v.length;

    for (s = 0; s < n; ++s) {
      p(u[s]);
    }

    v.resort();

    for (var i = Math.max(O.maximumRequests - q.length, 0), c = 0; c < i && 0 < v.length;) {
      !(e = v.pop()).cancelled && (!e.throttleByServer || A(e.serverKey)) ? (y(e), ++c) : E(e);
    }

    !function () {
      if (!O.debugShowStatistics) return;
      0 === l.numberOfActiveRequests && 0 < l.lastNumberOfActiveRequests && (0 < l.numberOfAttemptedRequests && (console.log("Number of attempted requests: " + l.numberOfAttemptedRequests), l.numberOfAttemptedRequests = 0), 0 < l.numberOfCancelledRequests && (console.log("Number of cancelled requests: " + l.numberOfCancelledRequests), l.numberOfCancelledRequests = 0), 0 < l.numberOfCancelledActiveRequests && (console.log("Number of cancelled active requests: " + l.numberOfCancelledActiveRequests), l.numberOfCancelledActiveRequests = 0), 0 < l.numberOfFailedRequests && (console.log("Number of failed requests: " + l.numberOfFailedRequests), l.numberOfFailedRequests = 0));
      l.lastNumberOfActiveRequests = l.numberOfActiveRequests;
    }();
  }, O.getServerKey = function (e) {
    n.typeOf.string("url", e);
    var t = new u(e).resolve(R);
    t.normalize();
    var r = t.authority;
    /:/.test(r) || (r = r + ":" + ("https" === t.scheme ? "443" : "80"));
    var s = d[r];
    return i(s) || (d[r] = 0), r;
  }, O.request = function (e) {
    if (n.typeOf.object("request", e), n.typeOf.string("request.url", e.url), n.typeOf.func("request.requestFunction", e.requestFunction), a(e.url) || f(e.url)) return b.raiseEvent(), e.state = o.RECEIVED, e.requestFunction();

    if (++l.numberOfAttemptedRequests, i(e.serverKey) || (e.serverKey = O.getServerKey(e.url)), !e.throttleByServer || A(e.serverKey)) {
      if (!O.throttleRequests || !e.throttle) return y(e);

      if (!(q.length >= O.maximumRequests)) {
        p(e);
        var t = v.insert(e);

        if (i(t)) {
          if (t === e) return;
          E(t);
        }

        return h(e);
      }
    }
  }, O.clearForSpecs = function () {
    for (; 0 < v.length;) {
      E(v.pop());
    }

    for (var e = q.length, t = 0; t < e; ++t) {
      E(q[t]);
    }

    q.length = 0, d = {}, l.numberOfAttemptedRequests = 0, l.numberOfActiveRequests = 0, l.numberOfCancelledRequests = 0, l.numberOfCancelledActiveRequests = 0, l.numberOfFailedRequests = 0, l.numberOfActiveRequestsEver = 0, l.lastNumberOfActiveRequests = 0;
  }, O.numberOfActiveRequestsByServer = function (e) {
    return d[e];
  }, O.requestHeap = v, O;
});