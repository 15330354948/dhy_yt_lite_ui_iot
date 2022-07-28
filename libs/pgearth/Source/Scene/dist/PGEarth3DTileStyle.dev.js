"use strict";

define(["../Core/clone", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Resource", "../ThirdParty/when", "./ConditionsExpression", "./Expression"], function (s, l, a, t, e, o, r, n, h) {
  "use strict";

  function i(t) {
    var e;
    this._style = {}, this._ready = !1, this._show = void 0, this._color = void 0, this._pointSize = void 0, this._pointOutlineColor = void 0, this._pointOutlineWidth = void 0, this._labelColor = void 0, this._labelOutlineColor = void 0, this._labelOutlineWidth = void 0, this._font = void 0, this._labelStyle = void 0, this._labelText = void 0, this._backgroundColor = void 0, this._backgroundPadding = void 0, this._backgroundEnabled = void 0, this._scaleByDistance = void 0, this._translucencyByDistance = void 0, this._distanceDisplayCondition = void 0, this._heightOffset = void 0, this._anchorLineEnabled = void 0, this._anchorLineColor = void 0, this._image = void 0, this._disableDepthTestDistance = void 0, this._horizontalOrigin = void 0, this._verticalOrigin = void 0, this._labelHorizontalOrigin = void 0, this._labelVerticalOrigin = void 0, this._meta = void 0, this._colorShaderFunction = void 0, this._showShaderFunction = void 0, this._pointSizeShaderFunction = void 0, this._colorShaderFunctionReady = !1, this._showShaderFunctionReady = !1, this._pointSizeShaderFunctionReady = !1, this._colorShaderTranslucent = !1, e = "string" == typeof t || t instanceof o ? o.createIfNeeded(t).fetchJson(t) : r.resolve(t);
    var i = this;
    this._readyPromise = e.then(function (t) {
      return function (t, e) {
        e = l(s(e, !0), t._style), t._style = e, t.show = e.show, t.color = e.color, t.pointSize = e.pointSize, t.pointOutlineColor = e.pointOutlineColor, t.pointOutlineWidth = e.pointOutlineWidth, t.labelColor = e.labelColor, t.labelOutlineColor = e.labelOutlineColor, t.labelOutlineWidth = e.labelOutlineWidth, t.labelStyle = e.labelStyle, t.font = e.font, t.labelText = e.labelText, t.backgroundColor = e.backgroundColor, t.backgroundPadding = e.backgroundPadding, t.backgroundEnabled = e.backgroundEnabled, t.scaleByDistance = e.scaleByDistance, t.translucencyByDistance = e.translucencyByDistance, t.distanceDisplayCondition = e.distanceDisplayCondition, t.heightOffset = e.heightOffset, t.anchorLineEnabled = e.anchorLineEnabled, t.anchorLineColor = e.anchorLineColor, t.image = e.image, t.disableDepthTestDistance = e.disableDepthTestDistance, t.horizontalOrigin = e.horizontalOrigin, t.verticalOrigin = e.verticalOrigin, t.labelHorizontalOrigin = e.labelHorizontalOrigin, t.labelVerticalOrigin = e.labelVerticalOrigin;
        var i = {};

        if (a(e.meta)) {
          var o = e.defines,
              r = l(e.meta, l.EMPTY_OBJECT);

          for (var n in r) {
            r.hasOwnProperty(n) && (i[n] = new h(r[n], o));
          }
        }

        t._meta = i, t._ready = !0;
      }(i, t), i;
    });
  }

  function d(t, e) {
    var i = l(t._style, l.EMPTY_OBJECT).defines;
    if (a(e)) return "boolean" == typeof e || "number" == typeof e ? new h(String(e)) : "string" == typeof e ? new h(e, i) : a(e.conditions) ? new n(e, i) : e;
  }

  function y(t) {
    if (a(t)) return a(t.expression) ? t.expression : a(t.conditionsExpression) ? s(t.conditionsExpression, !0) : t;
  }

  return t(i.prototype, {
    style: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._style;
      }
    },
    ready: {
      get: function get() {
        return this._ready;
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise;
      }
    },
    show: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._show;
      },
      set: function set(t) {
        this._show = d(this, t), this._style.show = y(this._show), this._showShaderFunctionReady = !1;
      }
    },
    color: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._color;
      },
      set: function set(t) {
        this._color = d(this, t), this._style.color = y(this._color), this._colorShaderFunctionReady = !1;
      }
    },
    pointSize: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._pointSize;
      },
      set: function set(t) {
        this._pointSize = d(this, t), this._style.pointSize = y(this._pointSize), this._pointSizeShaderFunctionReady = !1;
      }
    },
    pointOutlineColor: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._pointOutlineColor;
      },
      set: function set(t) {
        this._pointOutlineColor = d(this, t), this._style.pointOutlineColor = y(this._pointOutlineColor);
      }
    },
    pointOutlineWidth: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._pointOutlineWidth;
      },
      set: function set(t) {
        this._pointOutlineWidth = d(this, t), this._style.pointOutlineWidth = y(this._pointOutlineWidth);
      }
    },
    labelColor: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._labelColor;
      },
      set: function set(t) {
        this._labelColor = d(this, t), this._style.labelColor = y(this._labelColor);
      }
    },
    labelOutlineColor: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._labelOutlineColor;
      },
      set: function set(t) {
        this._labelOutlineColor = d(this, t), this._style.labelOutlineColor = y(this._labelOutlineColor);
      }
    },
    labelOutlineWidth: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._labelOutlineWidth;
      },
      set: function set(t) {
        this._labelOutlineWidth = d(this, t), this._style.labelOutlineWidth = y(this._labelOutlineWidth);
      }
    },
    font: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._font;
      },
      set: function set(t) {
        this._font = d(this, t), this._style.font = y(this._font);
      }
    },
    labelStyle: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._labelStyle;
      },
      set: function set(t) {
        this._labelStyle = d(this, t), this._style.labelStyle = y(this._labelStyle);
      }
    },
    labelText: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._labelText;
      },
      set: function set(t) {
        this._labelText = d(this, t), this._style.labelText = y(this._labelText);
      }
    },
    backgroundColor: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._backgroundColor;
      },
      set: function set(t) {
        this._backgroundColor = d(this, t), this._style.backgroundColor = y(this._backgroundColor);
      }
    },
    backgroundPadding: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._backgroundPadding;
      },
      set: function set(t) {
        this._backgroundPadding = d(this, t), this._style.backgroundPadding = y(this._backgroundPadding);
      }
    },
    backgroundEnabled: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._backgroundEnabled;
      },
      set: function set(t) {
        this._backgroundEnabled = d(this, t), this._style.backgroundEnabled = y(this._backgroundEnabled);
      }
    },
    scaleByDistance: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._scaleByDistance;
      },
      set: function set(t) {
        this._scaleByDistance = d(this, t), this._style.scaleByDistance = y(this._scaleByDistance);
      }
    },
    translucencyByDistance: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._translucencyByDistance;
      },
      set: function set(t) {
        this._translucencyByDistance = d(this, t), this._style.translucencyByDistance = y(this._translucencyByDistance);
      }
    },
    distanceDisplayCondition: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._distanceDisplayCondition;
      },
      set: function set(t) {
        this._distanceDisplayCondition = d(this, t), this._style.distanceDisplayCondition = y(this._distanceDisplayCondition);
      }
    },
    heightOffset: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._heightOffset;
      },
      set: function set(t) {
        this._heightOffset = d(this, t), this._style.heightOffset = y(this._heightOffset);
      }
    },
    anchorLineEnabled: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._anchorLineEnabled;
      },
      set: function set(t) {
        this._anchorLineEnabled = d(this, t), this._style.anchorLineEnabled = y(this._anchorLineEnabled);
      }
    },
    anchorLineColor: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._anchorLineColor;
      },
      set: function set(t) {
        this._anchorLineColor = d(this, t), this._style.anchorLineColor = y(this._anchorLineColor);
      }
    },
    image: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._image;
      },
      set: function set(t) {
        this._image = d(this, t), this._style.image = y(this._image);
      }
    },
    disableDepthTestDistance: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._disableDepthTestDistance;
      },
      set: function set(t) {
        this._disableDepthTestDistance = d(this, t), this._style.disableDepthTestDistance = y(this._disableDepthTestDistance);
      }
    },
    horizontalOrigin: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._horizontalOrigin;
      },
      set: function set(t) {
        this._horizontalOrigin = d(this, t), this._style.horizontalOrigin = y(this._horizontalOrigin);
      }
    },
    verticalOrigin: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._verticalOrigin;
      },
      set: function set(t) {
        this._verticalOrigin = d(this, t), this._style.verticalOrigin = y(this._verticalOrigin);
      }
    },
    labelHorizontalOrigin: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._labelHorizontalOrigin;
      },
      set: function set(t) {
        this._labelHorizontalOrigin = d(this, t), this._style.labelHorizontalOrigin = y(this._labelHorizontalOrigin);
      }
    },
    labelVerticalOrigin: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._labelVerticalOrigin;
      },
      set: function set(t) {
        this._labelVerticalOrigin = d(this, t), this._style.labelVerticalOrigin = y(this._labelVerticalOrigin);
      }
    },
    meta: {
      get: function get() {
        if (!this._ready) throw new e("The style is not loaded.  Use PGEarth3DTileStyle.readyPromise or wait for PGEarth3DTileStyle.ready to be true.");
        return this._meta;
      },
      set: function set(t) {
        this._meta = t;
      }
    }
  }), i.prototype.getColorShaderFunction = function (t, e, i) {
    return this._colorShaderFunctionReady ? i.translucent = this._colorShaderTranslucent : (this._colorShaderFunctionReady = !0, this._colorShaderFunction = a(this.color) ? this.color.getShaderFunction(t, e, i, "vec4") : void 0, this._colorShaderTranslucent = i.translucent), this._colorShaderFunction;
  }, i.prototype.getShowShaderFunction = function (t, e, i) {
    return this._showShaderFunctionReady || (this._showShaderFunctionReady = !0, this._showShaderFunction = a(this.show) ? this.show.getShaderFunction(t, e, i, "bool") : void 0), this._showShaderFunction;
  }, i.prototype.getPointSizeShaderFunction = function (t, e, i) {
    return this._pointSizeShaderFunctionReady || (this._pointSizeShaderFunctionReady = !0, this._pointSizeShaderFunction = a(this.pointSize) ? this.pointSize.getShaderFunction(t, e, i, "float") : void 0), this._pointSizeShaderFunction;
  }, i;
});