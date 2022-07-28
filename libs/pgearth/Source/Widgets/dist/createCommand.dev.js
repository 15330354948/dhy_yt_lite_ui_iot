"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../ThirdParty/knockout"], function (r, u, o, i, f, l) {
  "use strict";

  return function (n, e) {
    if (!u(n)) throw new i("func is required.");
    e = r(e, !0);
    var t = new f(),
        c = new f();

    function a() {
      if (!a.canExecute) throw new i("Cannot execute command, canExecute is false.");
      var e,
          r = {
        args: arguments,
        cancel: !1
      };
      return t.raiseEvent(r), r.cancel || (e = n.apply(null, arguments), c.raiseEvent(e)), e;
    }

    return a.canExecute = e, l.track(a, ["canExecute"]), o(a, {
      beforeExecute: {
        value: t
      },
      afterExecute: {
        value: c
      }
    }), a;
  };
});