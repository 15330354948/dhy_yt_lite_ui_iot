"use strict";

define(["../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/DeveloperError", "../../Core/FeatureDetection", "../../ThirdParty/knockout", "../getElement", "./GeocoderViewModel"], function (c, e, t, u, h, p, m, g) {
  "use strict";

  function n(e) {
    if (!c(e) || !c(e.container)) throw new u("options.container is required.");
    if (!c(e.scene)) throw new u("options.scene is required.");
    var t = m(e.container),
        n = new g(e);
    n._startSearchPath = "M29.772,26.433l-7.126-7.126c0.96-1.583,1.523-3.435,1.524-5.421C24.169,8.093,19.478,3.401,13.688,3.399C7.897,3.401,3.204,8.093,3.204,13.885c0,5.789,4.693,10.481,10.484,10.481c1.987,0,3.839-0.563,5.422-1.523l7.128,7.127L29.772,26.433zM7.203,13.885c0.006-3.582,2.903-6.478,6.484-6.486c3.579,0.008,6.478,2.904,6.484,6.486c-0.007,3.58-2.905,6.476-6.484,6.484C10.106,20.361,7.209,17.465,7.203,13.885z", n._stopSearchPath = "M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z";
    var o = document.createElement("form");
    o.setAttribute("data-bind", "submit: search");
    var i = document.createElement("input");
    i.type = "search", i.className = "pgEarth-geocoder-input", i.setAttribute("placeholder", "Enter an address or landmark..."), i.setAttribute("data-bind", 'textInput: searchText,disable: isSearchInProgress,event: { keyup: handleKeyUp, keydown: handleKeyDown, mouseover: deselectSuggestion },css: { "pgEarth-geocoder-input-wide" : keepExpanded || searchText.length > 0 },hasFocus: _focusTextbox'), this._onTextBoxFocus = function () {
      setTimeout(function () {
        i.select();
      }, 0);
    }, i.addEventListener("focus", this._onTextBoxFocus, !1), o.appendChild(i), this._textBox = i;
    var s = document.createElement("span");
    s.className = "pgEarth-geocoder-searchButton", s.setAttribute("data-bind", "click: search,pgEarthSvgPath: { path: isSearchInProgress ? _stopSearchPath : _startSearchPath, width: 32, height: 32 }"), o.appendChild(s), t.appendChild(o);
    var r = document.createElement("div");
    r.className = "search-results", r.setAttribute("data-bind", "visible: _suggestionsVisible");
    var a = document.createElement("ul");
    a.setAttribute("data-bind", "foreach: _suggestions");
    var d = document.createElement("li");
    a.appendChild(d), d.setAttribute("data-bind", "text: $data.displayName, click: $parent.activateSuggestion, event: { mouseover: $parent.handleMouseover}, css: { active: $data === $parent._selectedSuggestion }"), r.appendChild(a), t.appendChild(r), p.applyBindings(n, o), p.applyBindings(n, r), this._container = t, this._searchSuggestionsContainer = r, this._viewModel = n, this._form = o, this._onInputBegin = function (e) {
      t.contains(e.target) || (n._focusTextbox = !1, n.hideSuggestions());
    }, this._onInputEnd = function (e) {
      t.contains(e.target) && (n._focusTextbox = !0, n.showSuggestions());
    }, h.supportsPointerEvents() ? (document.addEventListener("pointerdown", this._onInputBegin, !0), document.addEventListener("pointerup", this._onInputEnd, !0), document.addEventListener("pointercancel", this._onInputEnd, !0)) : (document.addEventListener("mousedown", this._onInputBegin, !0), document.addEventListener("mouseup", this._onInputEnd, !0), document.addEventListener("touchstart", this._onInputBegin, !0), document.addEventListener("touchend", this._onInputEnd, !0), document.addEventListener("touchcancel", this._onInputEnd, !0));
  }

  return e(n.prototype, {
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
  }), n.prototype.isDestroyed = function () {
    return !1;
  }, n.prototype.destroy = function () {
    return h.supportsPointerEvents() ? (document.removeEventListener("pointerdown", this._onInputBegin, !0), document.removeEventListener("pointerup", this._onInputEnd, !0)) : (document.removeEventListener("mousedown", this._onInputBegin, !0), document.removeEventListener("mouseup", this._onInputEnd, !0), document.removeEventListener("touchstart", this._onInputBegin, !0), document.removeEventListener("touchend", this._onInputEnd, !0)), this._viewModel.destroy(), p.cleanNode(this._form), p.cleanNode(this._searchSuggestionsContainer), this._container.removeChild(this._form), this._container.removeChild(this._searchSuggestionsContainer), this._textBox.removeEventListener("focus", this._onTextBoxFocus, !1), t(this);
  }, n;
});