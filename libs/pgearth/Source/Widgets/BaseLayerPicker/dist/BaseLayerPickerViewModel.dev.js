"use strict";

define(["../../Core/defaultValue", "../../Core/defined", "../../Core/defineProperties", "../../Core/DeveloperError", "../../Core/EllipsoidTerrainProvider", "../../Core/isArray", "../../ThirdParty/knockout", "../createCommand"], function (v, h, e, c, u, f, m, p) {
  "use strict";

  function r(e) {
    var r = (e = v(e, v.EMPTY_OBJECT)).globe,
        i = v(e.imageryProviderViewModels, []),
        t = v(e.terrainProviderViewModels, []);
    if (!h(r)) throw new c("globe is required");
    this._globe = r, this.imageryProviderViewModels = i.slice(0), this.terrainProviderViewModels = t.slice(0), this.dropDownVisible = !1, m.track(this, ["imageryProviderViewModels", "terrainProviderViewModels", "dropDownVisible"]);
    var d = m.getObservable(this, "imageryProviderViewModels"),
        o = m.pureComputed(function () {
      for (var e = d(), r = {}, i = 0; i < e.length; i++) {
        var t = e[i],
            o = t.category;
        h(r[o]) ? r[o].push(t) : r[o] = [t];
      }

      var s = Object.keys(r),
          n = [];

      for (i = 0; i < s.length; i++) {
        var a = s[i];
        n.push({
          name: a,
          providers: r[a]
        });
      }

      return n;
    });
    this._imageryProviders = o;
    var l = m.getObservable(this, "terrainProviderViewModels"),
        s = m.pureComputed(function () {
      for (var e = l(), r = {}, i = 0; i < e.length; i++) {
        var t = e[i],
            o = t.category;
        h(r[o]) ? r[o].push(t) : r[o] = [t];
      }

      var s = Object.keys(r),
          n = [];

      for (i = 0; i < s.length; i++) {
        var a = s[i];
        n.push({
          name: a,
          providers: r[a]
        });
      }

      return n;
    });
    this._terrainProviders = s, this.buttonTooltip = void 0, m.defineProperty(this, "buttonTooltip", function () {
      var e = this.selectedImagery,
          r = this.selectedTerrain,
          i = h(e) ? e.name : void 0,
          t = h(r) ? r.name : void 0;
      return h(i) && h(t) ? i + "\n" + t : h(i) ? i : t;
    }), this.buttonImageUrl = void 0, m.defineProperty(this, "buttonImageUrl", function () {
      var e = this.selectedImagery;
      if (h(e)) return e.iconUrl;
    }), this.selectedImagery = void 0;
    var g = m.observable();
    this._currentImageryProviders = [], m.defineProperty(this, "selectedImagery", {
      get: function get() {
        return g();
      },
      set: function set(e) {
        if (g() !== e) {
          var r = this._currentImageryProviders,
              i = r.length,
              t = this._globe.imageryLayers,
              o = !1;

          for (v = 0; v < i; v++) {
            for (var s = t.length, n = 0; n < s; n++) {
              var a = t.get(n);

              if (a.imageryProvider === r[v]) {
                t.remove(a), o = !0;
                break;
              }
            }
          }

          if (h(e)) {
            var d,
                l = e.creationCommand();

            if (f(l)) {
              for (var v = l.length - 1; 0 <= v; v--) {
                t.addImageryProvider(l[v], 0);
              }

              this._currentImageryProviders = l.slice(0);
            } else {
              this._currentImageryProviders = [l], o || (d = t.get(0), h(d) && t.remove(d)), t.addImageryProvider(l, 0);
            }
          }

          g(e), this.dropDownVisible = !1;
        } else this.dropDownVisible = !1;
      }
    }), this.selectedTerrain = void 0;
    var n = m.observable();
    m.defineProperty(this, "selectedTerrain", {
      get: function get() {
        return n();
      },
      set: function set(e) {
        var r;
        n() !== e && (h(e) && (r = e.creationCommand()), this._globe.depthTestAgainstTerrain = !(r instanceof u), this._globe.terrainProvider = r, n(e)), this.dropDownVisible = !1;
      }
    });
    var a = this;
    this._toggleDropDown = p(function () {
      a.dropDownVisible = !a.dropDownVisible;
    }), this.selectedImagery = v(e.selectedImageryProviderViewModel, i[0]), this.selectedTerrain = v(e.selectedTerrainProviderViewModel, t[0]);
  }

  return e(r.prototype, {
    toggleDropDown: {
      get: function get() {
        return this._toggleDropDown;
      }
    },
    globe: {
      get: function get() {
        return this._globe;
      }
    }
  }), r;
});