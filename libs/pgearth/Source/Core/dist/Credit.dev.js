"use strict";

define(["../ThirdParty/purify", "./defaultValue", "./defined", "./defineProperties", "./Check"], function (r, l, s, e, o) {
  "use strict";

  var u = 0,
      h = {};

  function i(e, t) {
    var n;
    o.typeOf.string("html", e);
    var i = e;
    s(h[i]) ? n = h[i] : (n = u++, h[i] = n), t = l(t, !1), this._id = n, this._html = e, this._showOnScreen = t, this._element = void 0;
  }

  return e(i.prototype, {
    html: {
      get: function get() {
        return this._html;
      }
    },
    id: {
      get: function get() {
        return this._id;
      }
    },
    showOnScreen: {
      get: function get() {
        return this._showOnScreen;
      }
    },
    element: {
      get: function get() {
        if (!s(this._element)) {
          var e = r.sanitize(this._html),
              t = document.createElement("div");
          t._creditId = this._id, t.style.display = "inline", t.innerHTML = e;

          for (var n = t.querySelectorAll("a"), i = 0; i < n.length; i++) {
            n[i].setAttribute("target", "_blank");
          }

          this._element = t;
        }

        return this._element;
      }
    }
  }), i.equals = function (e, t) {
    return e === t || s(e) && s(t) && e._id === t._id;
  }, i.prototype.equals = function (e) {
    return i.equals(this, e);
  }, i.getIonCredit = function (e) {
    var t = s(e.collapsible) && !e.collapsible,
        n = new i(e.html, t);
    return n._isIon = -1 !== n.html.indexOf("ion-credit.png"), n;
  }, i.clone = function (e) {
    if (s(e)) return new i(e.html, e.showOnScreen);
  }, i;
});