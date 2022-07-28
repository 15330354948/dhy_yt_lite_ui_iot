"use strict";

define(["../../Core/IonGeocoderService", "../../Core/CartographicGeocoderService", "../../Core/defaultValue", "../../Core/defined", "../../Core/defineProperties", "../../Core/DeveloperError", "../../Core/Event", "../../Core/GeocodeType", "../../Core/Math", "../../Core/Matrix4", "../../Core/Rectangle", "../../Core/sampleTerrainMostDetailed", "../../Scene/computeFlyToLocationForRectangle", "../../ThirdParty/knockout", "../../ThirdParty/when", "../createCommand", "../getElement"], function (s, o, n, h, e, r, c, u, l, d, f, _, v, g, S, a, p) {
  "use strict";

  var m = 1e3;

  function y(e) {
    if (!h(e) || !h(e.scene)) throw new r("options.scene is required.");
    h(e.geocoderServices) ? this._geocoderServices = e.geocoderServices : this._geocoderServices = [new o(), new s({
      scene: e.scene
    })], this._viewContainer = e.container, this._scene = e.scene, this._flightDuration = e.flightDuration, this._searchText = "", this._isSearchInProgress = !1, this._geocodePromise = void 0, this._complete = new c(), this._suggestions = [], this._selectedSuggestion = void 0, this._showSuggestions = !0, this._handleArrowDown = w, this._handleArrowUp = T;
    var i = this;
    this._suggestionsVisible = g.pureComputed(function () {
      var e = 0 < g.getObservable(i, "_suggestions")().length,
          t = g.getObservable(i, "_showSuggestions")();
      return e && t;
    }), this._searchCommand = a(function (e) {
      return e = n(e, u.SEARCH), i._focusTextbox = !1, h(i._selectedSuggestion) ? (i.activateSuggestion(i._selectedSuggestion), !1) : (i.hideSuggestions(), void (i.isSearchInProgress ? ((t = i)._isSearchInProgress = !1, h(t._geocodePromise) && (t._geocodePromise.cancel = !0, t._geocodePromise = void 0)) : function (s, e, t) {
        var o = s._searchText;
        if (C(o)) return s.showSuggestions();
        s._isSearchInProgress = !0;

        for (var n = S.resolve(), i = 0; i < e.length; i++) {
          n = function (e, t, s, o) {
            return e.then(function (e) {
              return h(e) && "fulfilled" === e.state && 0 < e.value.length ? e : t.geocode(s, o).then(function (e) {
                return {
                  state: "fulfilled",
                  value: e
                };
              }).otherwise(function (e) {
                return {
                  state: "rejected",
                  reason: e
                };
              });
            });
          }(n, e[i], o, t);
        }

        (s._geocodePromise = n).then(function (e) {
          if (!n.cancel) {
            s._isSearchInProgress = !1;
            var t = e.value;
            if ("fulfilled" === e.state && h(t) && 0 < t.length) return s._searchText = t[0].displayName, void s.destinationFound(s, t[0].destination);
            s._searchText = o + " (not found)";
          }
        });
      }(i, i._geocoderServices, e)));
      var t;
    }), this.deselectSuggestion = function () {
      i._selectedSuggestion = void 0;
    }, this.handleKeyDown = function (e, t) {
      var s = "ArrowDown" === t.key || "Down" === t.key || 40 === t.keyCode,
          o = "ArrowUp" === t.key || "Up" === t.key || 38 === t.keyCode;
      return (s || o) && t.preventDefault(), !0;
    }, this.handleKeyUp = function (e, t) {
      var s = "ArrowDown" === t.key || "Down" === t.key || 40 === t.keyCode,
          o = "ArrowUp" === t.key || "Up" === t.key || 38 === t.keyCode,
          n = "Enter" === t.key || 13 === t.keyCode;
      return o ? T(i) : s ? w(i) : n && i._searchCommand(), !0;
    }, this.activateSuggestion = function (e) {
      i.hideSuggestions(), i._searchText = e.displayName;
      var t = e.destination;
      P(i), i.destinationFound(i, t);
    }, this.hideSuggestions = function () {
      i._showSuggestions = !1, i._selectedSuggestion = void 0;
    }, this.showSuggestions = function () {
      i._showSuggestions = !0;
    }, this.handleMouseover = function (e, t) {
      e !== i._selectedSuggestion && (i._selectedSuggestion = e);
    }, this.keepExpanded = !1, this.autoComplete = n(e.autocomplete, !0), this.destinationFound = n(e.destinationFound, y.flyToDestination), this._focusTextbox = !1, g.track(this, ["_searchText", "_isSearchInProgress", "keepExpanded", "_suggestions", "_selectedSuggestion", "_showSuggestions", "_focusTextbox"]);
    var t = g.getObservable(this, "_searchText");
    t.extend({
      rateLimit: {
        timeout: 500
      }
    }), this._suggestionSubscription = t.subscribe(function () {
      y._updateSearchSuggestions(i);
    }), this.isSearchInProgress = void 0, g.defineProperty(this, "isSearchInProgress", {
      get: function get() {
        return this._isSearchInProgress;
      }
    }), this.searchText = void 0, g.defineProperty(this, "searchText", {
      get: function get() {
        return this.isSearchInProgress ? "Searching..." : this._searchText;
      },
      set: function set(e) {
        if ("string" != typeof e) throw new r("value must be a valid string.");
        this._searchText = e;
      }
    }), this.flightDuration = void 0, g.defineProperty(this, "flightDuration", {
      get: function get() {
        return this._flightDuration;
      },
      set: function set(e) {
        if (h(e) && e < 0) throw new r("value must be positive.");
        this._flightDuration = e;
      }
    });
  }

  function T(e) {
    var t, s;
    0 !== e._suggestions.length && (-1 !== (s = e._suggestions.indexOf(e._selectedSuggestion)) && 0 !== s ? (t = s - 1, e._selectedSuggestion = e._suggestions[t], y._adjustSuggestionsScroll(e, t)) : e._selectedSuggestion = void 0);
  }

  function w(e) {
    var t, s;
    0 !== e._suggestions.length && (t = e._suggestions.length, s = (e._suggestions.indexOf(e._selectedSuggestion) + 1) % t, e._selectedSuggestion = e._suggestions[s], y._adjustSuggestionsScroll(e, s));
  }

  function C(e) {
    return /^\s*$/.test(e);
  }

  function P(e) {
    g.getObservable(e, "_suggestions").removeAll();
  }

  return e(y.prototype, {
    complete: {
      get: function get() {
        return this._complete;
      }
    },
    scene: {
      get: function get() {
        return this._scene;
      }
    },
    search: {
      get: function get() {
        return this._searchCommand;
      }
    },
    selectedSuggestion: {
      get: function get() {
        return this._selectedSuggestion;
      }
    },
    suggestions: {
      get: function get() {
        return this._suggestions;
      }
    }
  }), y.prototype.destroy = function () {
    this._suggestionSubscription.dispose();
  }, y.flyToDestination = function (e, t) {
    var s,
        o,
        n,
        i,
        r = e._scene,
        c = r.mapProjection.ellipsoid,
        u = r.camera,
        g = r.terrainProvider,
        a = t;
    t instanceof f ? l.equalsEpsilon(t.south, t.north, l.EPSILON7) && l.equalsEpsilon(t.east, t.west, l.EPSILON7) ? t = f.center(t) : s = v(t, r) : t = c.cartesianToCartographic(t), h(s) || (o = t, i = h(n = g) ? n.availability : void 0, s = h(i) ? _(n, [o]).then(function (e) {
      return (o = e[0]).height += m, o;
    }) : (o.height += m, S.resolve(o))), s.then(function (e) {
      a = c.cartographicToCartesian(e);
    }).always(function () {
      u.flyTo({
        destination: a,
        complete: function complete() {
          e._complete.raiseEvent();
        },
        duration: e._flightDuration,
        endTransform: d.IDENTITY
      });
    });
  }, y._updateSearchSuggestions = function (o) {
    var s, t;
    o.autoComplete && (s = o._searchText, P(o), C(s) || (t = S.resolve([]), o._geocoderServices.forEach(function (e) {
      t = t.then(function (t) {
        return 5 <= t.length ? t : e.geocode(s, u.AUTOCOMPLETE).then(function (e) {
          return t = t.concat(e);
        });
      });
    }), t.then(function (e) {
      for (var t = o._suggestions, s = 0; s < e.length; s++) {
        t.push(e[s]);
      }
    })));
  }, y._adjustSuggestionsScroll = function (e, t) {
    var s,
        o = p(e._viewContainer),
        n = o.getElementsByClassName("search-results")[0],
        i = o.getElementsByTagName("li")[t];
    0 !== t ? (s = i.offsetTop) + i.clientHeight > n.clientHeight ? n.scrollTop = s + i.clientHeight : s < n.scrollTop && (n.scrollTop = s) : n.scrollTop = 0;
  }, y;
});