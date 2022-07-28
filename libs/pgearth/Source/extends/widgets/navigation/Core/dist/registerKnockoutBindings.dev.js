"use strict";

define(["../../../../Widgets/SvgPathBindingHandler", "../../../../ThirdParty/knockout", "./KnockoutMarkdownBinding", "./KnockoutHammerBinding"], function (n, d, i, e) {
  "use strict";

  return function () {
    n.register(d), i.register(d), e.register(d), d.bindingHandlers.embeddedComponent = {
      init: function init(n, i, e, t, r) {
        return d.unwrap(i()).show(n), {
          controlsDescendantBindings: !0
        };
      },
      update: function update(n, i, e, t, r) {}
    };
  };
});