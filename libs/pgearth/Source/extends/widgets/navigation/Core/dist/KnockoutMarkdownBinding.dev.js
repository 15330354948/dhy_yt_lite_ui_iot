"use strict";

define(["./markdown-it-sanitizer", "./markdown-it"], function (n, e) {
  "use strict";

  var o = /<html(.|\s)*>(.|\s)*<\/html>/im,
      l = new e({
    html: !0,
    linkify: !0
  });
  return l.use(n, {
    imageClass: "",
    removeUnbalanced: !1,
    removeUnknown: !1
  }), {
    register: function register(d) {
      d.bindingHandlers.markdown = {
        init: function init() {
          return {
            controlsDescendantBindings: !0
          };
        },
        update: function update(n, e) {
          for (; n.firstChild;) {
            d.removeNode(n.firstChild);
          }

          var i = d.unwrap(e()),
              r = o.test(i) ? i : l.render(i),
              t = d.utils.parseHtmlFragment(r, n);
          n.className = n.className + " markdown";

          for (var a = 0; a < t.length; ++a) {
            var s = t[a];
            !function n(e) {
              e instanceof HTMLAnchorElement && (e.target = "_blank");
              if (e.childNodes && 0 < e.childNodes.length) for (var i = 0; i < e.childNodes.length; ++i) {
                n(e.childNodes[i]);
              }
            }(s), n.appendChild(s);
          }
        }
      };
    }
  };
});