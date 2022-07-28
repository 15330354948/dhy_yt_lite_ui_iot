"use strict";

define(["../ThirdParty/when", "./Check", "./defined", "./defaultValue", "./FeatureDetection", "./Resource"], function (a, c, f, p, e, l) {
  "use strict";

  return function (e) {
    var t = e.uint8Array,
        r = e.format,
        n = e.request,
        i = p(e.flipY, !1);
    c.typeOf.object("uint8Array", t), c.typeOf.string("format", r);
    var u,
        o = new Blob([t], {
      type: r
    });
    return l.supportsImageBitmapOptions().then(function (e) {
      return e ? a(l.createImageBitmapFromBlob(o, {
        flipY: i,
        premultiplyAlpha: !1
      })) : (u = window.URL.createObjectURL(o), new l({
        url: u,
        request: n
      }).fetchImage({
        flipY: i
      }));
    }).then(function (e) {
      return f(u) && window.URL.revokeObjectURL(u), e;
    }).otherwise(function (e) {
      return f(u) && window.URL.revokeObjectURL(u), a.reject(e);
    });
  };
});