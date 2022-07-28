"use strict";

define(["../../../Source/Core/defined", "../../../Source/Core/defineProperties", "../../../Source/Core/DeveloperError", "../../../Source/Core/FeatureDetection", "../../../Source/ThirdParty/knockout", "../../../Source/Widgets/getElement", "./GeocoderViewModel"], function (e, t, n, o, i, s, r) {
  "use strict";

  var d = "M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z";

  function a(t) {
    if (!e(t) || !e(t.container)) throw new n("options.container is required.");
    if (!e(t.scene)) throw new n("options.scene is required.");
    var a = s(t.container),
        u = new r(t);
    u._stopSearchPath = d;
    var c = document.createElement("form");
    c.setAttribute("data-bind", "submit: search");
    var h = document.createElement("input");
    h.type = "search", h.className = "pgEarth-geocoder-input", h.setAttribute("placeholder", "Enter an address or landmark..."), h.setAttribute("data-bind", '                          textInput: searchText,                          disable: isSearchInProgress,                          event: { keyup: handleKeyUp, keydown: handleKeyDown, mouseover: deselectSuggestion },                          css: { "pgEarth-geocoder-input-wide" : keepExpanded || searchText.length > 0 },                          hasFocus: _focusTextbox'), this._onTextBoxFocus = function () {
      setTimeout(function () {
        h.select();
      }, 0);
    }, h.addEventListener("focus", this._onTextBoxFocus, !1), c.appendChild(h), this._textBox = h;
    var p = document.createElement("span"),
        m = document.createElement("span");
    p.className = "pgEarth-geocoder-searchButton", m.className = "pgEarth-icon-search", p.append(m), p.setAttribute("data-bind", "click: search"), c.appendChild(p), a.appendChild(c);
    var l = document.createElement("div");
    l.className = "search-results", l.setAttribute("data-bind", "visible: _suggestionsVisible");
    var g = document.createElement("ul");
    g.setAttribute("data-bind", "foreach: _suggestions");
    var v = document.createElement("li");
    g.appendChild(v), v.setAttribute("data-bind", "text: $data.displayName, click: $parent.activateSuggestion, event: { mouseover: $parent.handleMouseover}, css: { active: $data === $parent._selectedSuggestion }"), l.appendChild(g), a.appendChild(l), i.applyBindings(u, c), i.applyBindings(u, l), this._container = a, this._searchSuggestionsContainer = l, this._viewModel = u, this._form = c, this._onInputBegin = function (e) {
      a.contains(e.target) || (u._focusTextbox = !1, u.hideSuggestions());
    }, this._onInputEnd = function (e) {
      a.contains(e.target) && (u._focusTextbox = !0, u.showSuggestions());
    }, o.supportsPointerEvents() ? (document.addEventListener("pointerdown", this._onInputBegin, !0), document.addEventListener("pointerup", this._onInputEnd, !0), document.addEventListener("pointercancel", this._onInputEnd, !0)) : (document.addEventListener("mousedown", this._onInputBegin, !0), document.addEventListener("mouseup", this._onInputEnd, !0), document.addEventListener("touchstart", this._onInputBegin, !0), document.addEventListener("touchend", this._onInputEnd, !0), document.addEventListener("touchcancel", this._onInputEnd, !0));
  }

  return t(a.prototype, {
    container: {
      get: function get() {
        return this._container;
      }
    },
    searchSuggestionsContainer: {
      get: function get() {
        return this._searchSuggestionsContainer;
      }
    },
    viewModel: {
      get: function get() {
        return this._viewModel;
      }
    }
  }), a.prototype.isDestroyed = function () {
    return !1;
  }, a.prototype.destroy = function () {
    return o.supportsPointerEvents() ? (document.removeEventListener("pointerdown", this._onInputBegin, !0), document.removeEventListener("pointerup", this._onInputEnd, !0)) : (document.removeEventListener("mousedown", this._onInputBegin, !0), document.removeEventListener("mouseup", this._onInputEnd, !0), document.removeEventListener("touchstart", this._onInputBegin, !0), document.removeEventListener("touchend", this._onInputEnd, !0)), this._viewModel.destroy(), i.cleanNode(this._form), i.cleanNode(this._searchSuggestionsContainer), this._container.removeChild(this._form), this._container.removeChild(this._searchSuggestionsContainer), this._textBox.removeEventListener("focus", this._onTextBoxFocus, !1), destroyObject(this);
  }, a;
});