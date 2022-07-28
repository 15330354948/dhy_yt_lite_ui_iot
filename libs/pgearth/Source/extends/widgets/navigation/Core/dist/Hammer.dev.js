"use strict";

define([], function () {
  function s(t, i) {
    return (i = i || {}).recognizers = l(i.recognizers, s.defaults.preset), new n(t, i);
  }

  function n(t, i) {
    this.options = la({}, s.defaults, i || {}), this.options.inputTarget = this.options.inputTarget || t, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = t, this.input = y(this), this.touchAction = new V(this, this.options.touchAction), ja(this, !0), g(this.options.recognizers, function (t) {
      var i = this.add(new t[0](t[1]));
      t[2] && i.recognizeWith(t[2]), t[3] && i.requireFailure(t[3]);
    }, this);
  }

  return s;
});