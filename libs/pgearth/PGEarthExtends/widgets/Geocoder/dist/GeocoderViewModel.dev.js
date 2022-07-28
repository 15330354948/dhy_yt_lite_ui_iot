"use strict";

define(["../../../Source/Core/BingMapsGeocoderService", "../../../Source/Core/CartographicGeocoderService", "../../../Source/Core/defaultValue", "../../../Source/Core/defined", "../../../Source/Core/defineProperties", "../../../Source/Core/DeveloperError", "../../../Source/Core/Cartesian3", "../../../Source/DataSources/Entity", "../../../Source/Core/Event", "../../../Source/Core/Matrix4", "../../../Source/ThirdParty/knockout", "../../../Source/ThirdParty/when", "../../../Source/DataSources/GeoJsonDataSource", "../../../Source/Widgets/createCommand", "../../../Source/Widgets/getElement", "../../search/Query"], function (e, t, s, o, n, i, r, c, u, g, a, h, l, d, f, _) {
  "use strict";

  function S(n) {
    if (!o(n) || !o(n.scene)) throw new i("options.scene is required.");
    o(n.geocoderServices) ? this._geocoderServices = n.geocoderServices : this._geocoderServices = [new t(), new e({
      scene: n.scene
    })], this._viewContainer = n.container, this._scene = n.scene, this._flightDuration = n.flightDuration, this._searchText = "", this._isSearchInProgress = !1, this._geocodePromise = void 0, this._complete = new u(), this._suggestions = [], this._selectedSuggestion = void 0, this._showSuggestions = !0, this._updateCamera = m, this._adjustSuggestionsScroll = y, this._updateSearchSuggestions = x, this._handleArrowDown = p, this._handleArrowUp = v;
    var r = this;
    this._suggestionsVisible = a.pureComputed(function () {
      var e = a.getObservable(r, "_suggestions")().length > 0,
          t = a.getObservable(r, "_showSuggestions")();
      return e && t;
    }), this._searchCommand = d(function () {
      if (r._focusTextbox = !1, o(r._selectedSuggestion)) return r.activateSuggestion(r._selectedSuggestion), !1;
      var e;
      r.hideSuggestions(), r.isSearchInProgress ? ((e = r)._isSearchInProgress = !1, o(e._geocodePromise) && (e._geocodePromise.cancel = !0, e._geocodePromise = void 0)) : function (e, t) {
        var s = e._searchText;
        if (C(s)) return void e.showSuggestions();
        e._isSearchInProgress = !0;

        for (var n = h.resolve(), i = 0; i < t.length; i++) {
          n = w(n, t[i], s);
        }

        e._geocodePromise = n, n.then(function (t) {
          if (!n.cancel) {
            e._isSearchInProgress = !1;
            var i = t.value;
            if ("fulfilled" === t.state && o(i) && i.length > 0) return e._searchText = i[0].displayName, void m(e, i[0].destination);
            e._searchText = s + " (not found)";
          }
        });
      }(r, r._geocoderServices);
    }), this.deselectSuggestion = function () {
      r._selectedSuggestion = void 0;
    }, this.handleKeyDown = function (e, t) {
      var s = "ArrowDown" === t.key || "Down" === t.key || 40 === t.keyCode,
          o = "ArrowUp" === t.key || "Up" === t.key || 38 === t.keyCode;
      return (s || o) && t.preventDefault(), !0;
    }, this.handleKeyUp = function (e, t) {
      var s = "ArrowDown" === t.key || "Down" === t.key || 40 === t.keyCode,
          o = "ArrowUp" === t.key || "Up" === t.key || 38 === t.keyCode,
          n = "Enter" === t.key || 13 === t.keyCode;
      return o ? v(r) : s ? p(r) : n && r._searchCommand(), !0;
    }, this.activateSuggestion = function (e) {
      r.hideSuggestions(), r._searchText = e.displayName;
      var t = e.destination;
      T(r), m(r, t);
    }, this.hideSuggestions = function () {
      r._showSuggestions = !1, r._selectedSuggestion = void 0;
    }, this.showSuggestions = function () {
      r._showSuggestions = !0;
    }, this.handleMouseover = function (e, t) {
      e !== r._selectedSuggestion && (r._selectedSuggestion = e);
    }, this.keepExpanded = !1, this.autoComplete = s(n.autocomplete, !0), this._focusTextbox = !1, a.track(this, ["_searchText", "_isSearchInProgress", "keepExpanded", "_suggestions", "_selectedSuggestion", "_showSuggestions", "_focusTextbox"]);
    var c = a.getObservable(this, "_searchText");
    c.extend({
      rateLimit: {
        timeout: 500
      }
    }), this._suggestionSubscription = c.subscribe(function () {
      x(r);
    }), this.isSearchInProgress = void 0, a.defineProperty(this, "isSearchInProgress", {
      get: function get() {
        return this._isSearchInProgress;
      }
    }), this.searchText = void 0, a.defineProperty(this, "searchText", {
      get: function get() {
        return this.isSearchInProgress ? "Searching..." : this._searchText;
      },
      set: function set(e) {
        if ("string" != typeof e) throw new i("value must be a valid string.");
        this._searchText = e;
      }
    }), this.flightDuration = void 0, a.defineProperty(this, "flightDuration", {
      get: function get() {
        return this._flightDuration;
      },
      set: function set(e) {
        if (o(e) && e < 0) throw new i("value must be positive.");
        this._flightDuration = e;
      }
    });
  }

  function v(e) {
    if (0 !== e._suggestions.length) {
      var t,
          s = e._suggestions.indexOf(e._selectedSuggestion);

      -1 !== s && 0 !== s ? (t = s - 1, e._selectedSuggestion = e._suggestions[t], y(e, t)) : e._selectedSuggestion = void 0;
    }
  }

  function p(e) {
    if (0 !== e._suggestions.length) {
      var t = e._suggestions.length,
          s = (e._suggestions.indexOf(e._selectedSuggestion) + 1) % t;
      e._selectedSuggestion = e._suggestions[s], y(e, s);
    }
  }

  function m(e, t) {
    t instanceof r && (t.z = 1.01 * t.z), e._scene.camera.flyTo({
      destination: t,
      complete: function complete() {
        e._complete.raiseEvent();
      },
      duration: e._flightDuration,
      endTransform: g.IDENTITY
    });
  }

  function w(e, t, s) {
    return e.then(function (e) {
      return o(e) && "fulfilled" === e.state && e.value.length > 0 ? e : t.geocode(s).then(function (e) {
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
  }

  function y(e, t) {
    var s = f(e._viewContainer),
        o = s.getElementsByClassName("search-results")[0],
        n = s.getElementsByTagName("li")[t];

    if (0 !== t) {
      var i = n.offsetTop;
      i + n.clientHeight > o.clientHeight ? o.scrollTop = i + n.clientHeight : i < o.scrollTop && (o.scrollTop = i);
    } else o.scrollTop = 0;
  }

  function C(e) {
    return /^\s*$/.test(e);
  }

  function T(e) {
    a.getObservable(e, "_suggestions").removeAll();
  }

  function x(s) {
    if (s.autoComplete) {
      var o = s._searchText;

      if (T(s), !C(o)) {
        var n = h.resolve([]);
        s._geocoderServices.forEach(function (s) {
          if (s instanceof t || s instanceof e) n = n.then(function (e) {
            return e.length >= 5 ? e : s.geocode(o).then(function (t) {
              return e = e.concat(t);
            });
          });else {
            var i = new _({
              where: s.options.keyWord + " like '%" + o + "%'"
            }),
                r = s.execute(i);
            n = n.then(function (e) {
              return e.length >= 5 ? e : r.then(function (t) {
                return e = e.concat(t.entities.values);
              });
            });
          }
        }), n.then(function (e) {
          for (var t = s._suggestions, o = 0; o < e.length; o++) {
            e[o] instanceof c && (e[o].displayName = e[o].name, e[o].destination = e[o].position._value), t.push(e[o]);
          }
        });
      }
    }
  }

  return n(S.prototype, {
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
  }), S.prototype.destroy = function () {
    this._suggestionSubscription.dispose();
  }, S;
});