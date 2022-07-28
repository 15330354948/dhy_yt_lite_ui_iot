"use strict";

define(["../Core/defineProperties", "../Core/DeveloperError"], function (t, n) {
  "use strict";

  function r() {
    n.throwInstantiationError();
  }

  return t(r.prototype, {
    name: {
      get: n.throwInstantiationError
    },
    clock: {
      get: n.throwInstantiationError
    },
    entities: {
      get: n.throwInstantiationError
    },
    isLoading: {
      get: n.throwInstantiationError
    },
    changedEvent: {
      get: n.throwInstantiationError
    },
    errorEvent: {
      get: n.throwInstantiationError
    },
    loadingEvent: {
      get: n.throwInstantiationError
    },
    show: {
      get: n.throwInstantiationError
    },
    clustering: {
      get: n.throwInstantiationError
    }
  }), r.prototype.update = n.throwInstantiationError, r.setLoading = function (t, n) {
    t._isLoading !== n && (n ? t._entityCollection.suspendEvents() : t._entityCollection.resumeEvents(), t._isLoading = n, t._loading.raiseEvent(t, n));
  }, r;
});