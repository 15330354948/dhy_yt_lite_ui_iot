"use strict";

define(["../../../../Widgets/getElement", "../../../../ThirdParty/knockout", "./createFragmentFromTemplate"], function (a, l, p) {
  "use strict";

  return function (e, n, t) {
    n = a(n);

    for (var r = p(e), d = [], i = 0; i < r.childNodes.length; ++i) {
      d.push(r.childNodes[i]);
    }

    for (n.appendChild(r), i = 0; i < d.length; ++i) {
      var o = d[i];
      1 !== o.nodeType && 8 !== o.nodeType || l.applyBindings(t, o);
    }

    return d;
  };
});