"use strict";

define(["../Core/defined", "../Core/Check"], function (d, p) {
  "use strict";

  var e = {
    createCheckbox: function createCheckbox(e, t, n) {
      p.typeOf.string("labelText", e), p.typeOf.string("checkedBinding", t);
      var a = document.createElement("div"),
          i = document.createElement("label"),
          c = document.createElement("input");
      c.type = "checkbox";
      var r = "checked: " + t;
      return d(n) && (r += ", enable: " + n), c.setAttribute("data-bind", r), i.appendChild(c), i.appendChild(document.createTextNode(e)), a.appendChild(i), a;
    },
    createSection: function createSection(e, t, n, a) {
      p.defined("panel", e), p.typeOf.string("headerText", t), p.typeOf.string("sectionVisibleBinding", n), p.typeOf.string("toggleSectionVisibilityBinding", a);
      var i = document.createElement("div");
      i.className = "pgEarth-pgEarthInspector-section", i.setAttribute("data-bind", 'css: { "pgEarth-pgEarthInspector-section-collapsed": !' + n + " }"), e.appendChild(i);
      var c = document.createElement("h3");
      c.className = "pgEarth-pgEarthInspector-sectionHeader", c.appendChild(document.createTextNode(t)), c.setAttribute("data-bind", "click: " + a), i.appendChild(c);
      var r = document.createElement("div");
      return r.className = "pgEarth-pgEarthInspector-sectionContent", i.appendChild(r), r;
    }
  };
  return e;
});