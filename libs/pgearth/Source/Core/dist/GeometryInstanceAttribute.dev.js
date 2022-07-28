"use strict";

define(["./defaultValue", "./defined", "./DeveloperError"], function (t, n, o) {
  "use strict";

  return function (e) {
    if (e = t(e, t.EMPTY_OBJECT), !n(e.componentDatatype)) throw new o("options.componentDatatype is required.");
    if (!n(e.componentsPerAttribute)) throw new o("options.componentsPerAttribute is required.");
    if (e.componentsPerAttribute < 1 || 4 < e.componentsPerAttribute) throw new o("options.componentsPerAttribute must be between 1 and 4.");
    if (!n(e.value)) throw new o("options.value is required.");
    this.componentDatatype = e.componentDatatype, this.componentsPerAttribute = e.componentsPerAttribute, this.normalize = t(e.normalize, !1), this.value = e.value;
  };
});