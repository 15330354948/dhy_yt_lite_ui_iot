"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/FeatureDetection", "../Core/getMagic", "../Core/RuntimeError", "../ThirdParty/when"], function (g, l, t, n, e, _, d, v) {
  "use strict";

  if (!e.supportsTypedArrays()) return {};

  function r(t, e, r, n, o, i) {
    this._tileset = t, this._tile = e, this._resource = r, this._contents = [], this._readyPromise = v.defer(), function (e, t, r, n) {
      r = g(r, 0);
      var o = new Uint8Array(t),
          i = new DataView(t);
      r += P;
      var s = i.getUint32(r, !0);
      if (1 !== s) throw new d("Only Composite Tile version 1 is supported. Version " + s + " is not.");
      r += P, r += P;
      var u = i.getUint32(r, !0);
      r += P;

      for (var a = [], c = 0; c < u; ++c) {
        var f = _(o, r),
            p = i.getUint32(r + 2 * P, !0),
            h = n[f];

        if (!l(h)) throw new d("Unknown tile content type, " + f + ", inside Composite tile");
        var y = h(e._tileset, e._tile, e._resource, t, r);
        e._contents.push(y), a.push(y.readyPromise), r += p;
      }

      v.all(a).then(function () {
        e._readyPromise.resolve(e);
      }).otherwise(function (t) {
        e._readyPromise.reject(t);
      });
    }(this, n, o, i);
  }

  t(r.prototype, {
    featurePropertiesDirty: {
      get: function get() {
        for (var t = this._contents, e = t.length, r = 0; r < e; ++r) {
          if (t[r].featurePropertiesDirty) return !0;
        }

        return !1;
      },
      set: function set(t) {
        for (var e = this._contents, r = e.length, n = 0; n < r; ++n) {
          e[n].featurePropertiesDirty = t;
        }
      }
    },
    featuresLength: {
      get: function get() {
        return 0;
      }
    },
    pointsLength: {
      get: function get() {
        return 0;
      }
    },
    trianglesLength: {
      get: function get() {
        return 0;
      }
    },
    geometryByteLength: {
      get: function get() {
        return 0;
      }
    },
    texturesByteLength: {
      get: function get() {
        return 0;
      }
    },
    batchTableByteLength: {
      get: function get() {
        return 0;
      }
    },
    innerContents: {
      get: function get() {
        return this._contents;
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise.promise;
      }
    },
    tileset: {
      get: function get() {
        return this._tileset;
      }
    },
    tile: {
      get: function get() {
        return this._tile;
      }
    },
    url: {
      get: function get() {
        return this._resource.getUrlComponent(!0);
      }
    },
    batchTable: {
      get: function get() {}
    }
  });
  var P = Uint32Array.BYTES_PER_ELEMENT;
  return r.prototype.hasProperty = function (t, e) {
    return !1;
  }, r.prototype.getFeature = function (t) {}, r.prototype.applyDebugSettings = function (t, e) {
    for (var r = this._contents, n = r.length, o = 0; o < n; ++o) {
      r[o].applyDebugSettings(t, e);
    }
  }, r.prototype.applyStyle = function (t) {
    for (var e = this._contents, r = e.length, n = 0; n < r; ++n) {
      e[n].applyStyle(t);
    }
  }, r.prototype.update = function (t, e) {
    for (var r = this._contents, n = r.length, o = 0; o < n; ++o) {
      r[o].update(t, e);
    }
  }, r.prototype.isDestroyed = function () {
    return !1;
  }, r.prototype.destroy = function () {
    for (var t = this._contents, e = t.length, r = 0; r < e; ++r) {
      t[r].destroy();
    }

    return n(this);
  }, r;
});