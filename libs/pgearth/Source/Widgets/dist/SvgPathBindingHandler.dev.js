"use strict";

define(function () {
  "use strict";

  var e = "http://www.w3.org/2000/svg",
      u = "pgEarth-svgPath-svg";
  return {
    register: function register(a) {
      a.bindingHandlers.pgEarthSvgPath = {
        init: function init(t, r) {
          var s = document.createElementNS(e, "svg:svg");
          s.setAttribute("class", u);
          var i = document.createElementNS(e, "path");
          return s.appendChild(i), a.virtualElements.setDomNodeChildren(t, [s]), a.computed({
            read: function read() {
              var t = a.unwrap(r());
              i.setAttribute("d", a.unwrap(t.path));
              var e = a.unwrap(t.width),
                  n = a.unwrap(t.height);
              s.setAttribute("width", e), s.setAttribute("height", n), s.setAttribute("viewBox", "0 0 " + e + " " + n), t.css && s.setAttribute("class", u + " " + a.unwrap(t.css));
            },
            disposeWhenNodeIsRemoved: t
          }), {
            controlsDescendantBindings: !0
          };
        }
      }, a.virtualElements.allowedBindings.pgEarthSvgPath = !0;
    }
  };
});