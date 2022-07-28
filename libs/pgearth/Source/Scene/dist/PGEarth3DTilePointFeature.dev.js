"use strict";

define(["../Core/Cartographic", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "./createBillboardPointCallback"], function (t, d, f, g, i, p) {
  "use strict";

  function C(t, i, e, n, o) {
    this._content = t, this._billboard = e, this._label = n, this._polyline = o, this._batchId = i, this._billboardImage = void 0, this._billboardColor = void 0, this._billboardOutlineColor = void 0, this._billboardOutlineWidth = void 0, this._billboardSize = void 0, this._pointSize = void 0, this._color = void 0, this._pointSize = void 0, this._pointOutlineColor = void 0, this._pointOutlineWidth = void 0, this._heightOffset = void 0, this._pickIds = new Array(3), s(this);
  }

  var l = new t();

  function s(t) {
    var i,
        e,
        n,
        o,
        l,
        s,
        r,
        a,
        h,
        c,
        u,
        b,
        _ = t._billboard;
    g(t._billboardImage) && t._billboardImage !== _.image ? _.image = t._billboardImage : g(t._billboardImage) || (i = f(t._color, C.defaultColor), e = f(t._pointOutlineColor, C.defaultPointOutlineColor), n = f(t._pointOutlineWidth, C.defaultPointOutlineWidth), o = f(t._pointSize, C.defaultPointSize), l = t._billboardColor, s = t._billboardOutlineColor, r = t._billboardOutlineWidth, a = t._billboardSize, d.equals(i, l) && d.equals(e, s) && n === r && o === a || (t._billboardColor = d.clone(i, t._billboardColor), t._billboardOutlineColor = d.clone(e, t._billboardOutlineColor), t._billboardOutlineWidth = n, t._billboardSize = o, h = i.alpha, c = i.toCssColorString(), u = e.toCssColorString(), b = JSON.stringify([c, o, u, n]), _.setImage(b, p(h, c, u, n, o))));
  }

  return i(C.prototype, {
    show: {
      get: function get() {
        return this._label.show;
      },
      set: function set(t) {
        this._label.show = t, this._billboard.show = t, this._polyline.show = t;
      }
    },
    color: {
      get: function get() {
        return this._color;
      },
      set: function set(t) {
        this._color = d.clone(t, this._color), s(this);
      }
    },
    pointSize: {
      get: function get() {
        return this._pointSize;
      },
      set: function set(t) {
        this._pointSize = t, s(this);
      }
    },
    pointOutlineColor: {
      get: function get() {
        return this._pointOutlineColor;
      },
      set: function set(t) {
        this._pointOutlineColor = d.clone(t, this._pointOutlineColor), s(this);
      }
    },
    pointOutlineWidth: {
      get: function get() {
        return this._pointOutlineWidth;
      },
      set: function set(t) {
        this._pointOutlineWidth = t, s(this);
      }
    },
    labelColor: {
      get: function get() {
        return this._label.fillColor;
      },
      set: function set(t) {
        this._label.fillColor = t, this._polyline.show = this._label.show && 0 < t.alpha;
      }
    },
    labelOutlineColor: {
      get: function get() {
        return this._label.outlineColor;
      },
      set: function set(t) {
        this._label.outlineColor = t;
      }
    },
    labelOutlineWidth: {
      get: function get() {
        return this._label.outlineWidth;
      },
      set: function set(t) {
        this._label.outlineWidth = t;
      }
    },
    font: {
      get: function get() {
        return this._label.font;
      },
      set: function set(t) {
        this._label.font = t;
      }
    },
    labelStyle: {
      get: function get() {
        return this._label.style;
      },
      set: function set(t) {
        this._label.style = t;
      }
    },
    labelText: {
      get: function get() {
        return this._label.text;
      },
      set: function set(t) {
        g(t) || (t = ""), this._label.text = t;
      }
    },
    backgroundColor: {
      get: function get() {
        return this._label.backgroundColor;
      },
      set: function set(t) {
        this._label.backgroundColor = t;
      }
    },
    backgroundPadding: {
      get: function get() {
        return this._label.backgroundPadding;
      },
      set: function set(t) {
        this._label.backgroundPadding = t;
      }
    },
    backgroundEnabled: {
      get: function get() {
        return this._label.showBackground;
      },
      set: function set(t) {
        this._label.showBackground = t;
      }
    },
    scaleByDistance: {
      get: function get() {
        return this._label.scaleByDistance;
      },
      set: function set(t) {
        this._label.scaleByDistance = t, this._billboard.scaleByDistance = t;
      }
    },
    translucencyByDistance: {
      get: function get() {
        return this._label.translucencyByDistance;
      },
      set: function set(t) {
        this._label.translucencyByDistance = t, this._billboard.translucencyByDistance = t;
      }
    },
    distanceDisplayCondition: {
      get: function get() {
        return this._label.distanceDisplayCondition;
      },
      set: function set(t) {
        this._label.distanceDisplayCondition = t, this._polyline.distanceDisplayCondition = t, this._billboard.distanceDisplayCondition = t;
      }
    },
    heightOffset: {
      get: function get() {
        return this._heightOffset;
      },
      set: function set(t) {
        var i = f(this._heightOffset, 0),
            e = this._content.tileset.ellipsoid,
            n = e.cartesianToCartographic(this._billboard.position, l);
        n.height = n.height - i + t;
        var o = e.cartographicToCartesian(n);
        this._billboard.position = o, this._label.position = this._billboard.position, this._polyline.positions = [this._polyline.positions[0], o], this._heightOffset = t;
      }
    },
    anchorLineEnabled: {
      get: function get() {
        return this._polyline.show;
      },
      set: function set(t) {
        this._polyline.show = t;
      }
    },
    anchorLineColor: {
      get: function get() {
        return this._polyline.material.uniforms.color;
      },
      set: function set(t) {
        this._polyline.material.uniforms.color = d.clone(t, this._polyline.material.uniforms.color);
      }
    },
    image: {
      get: function get() {
        return this._billboardImage;
      },
      set: function set(t) {
        var i = this._billboardImage !== t;
        this._billboardImage = t, i && s(this);
      }
    },
    disableDepthTestDistance: {
      get: function get() {
        return this._label.disableDepthTestDistance;
      },
      set: function set(t) {
        this._label.disableDepthTestDistance = t, this._billboard.disableDepthTestDistance = t;
      }
    },
    horizontalOrigin: {
      get: function get() {
        return this._billboard.horizontalOrigin;
      },
      set: function set(t) {
        this._billboard.horizontalOrigin = t;
      }
    },
    verticalOrigin: {
      get: function get() {
        return this._billboard.verticalOrigin;
      },
      set: function set(t) {
        this._billboard.verticalOrigin = t;
      }
    },
    labelHorizontalOrigin: {
      get: function get() {
        return this._label.horizontalOrigin;
      },
      set: function set(t) {
        this._label.horizontalOrigin = t;
      }
    },
    labelVerticalOrigin: {
      get: function get() {
        return this._label.verticalOrigin;
      },
      set: function set(t) {
        this._label.verticalOrigin = t;
      }
    },
    content: {
      get: function get() {
        return this._content;
      }
    },
    tileset: {
      get: function get() {
        return this._content.tileset;
      }
    },
    primitive: {
      get: function get() {
        return this._content.tileset;
      }
    },
    pickIds: {
      get: function get() {
        var t = this._pickIds;
        return t[0] = this._billboard.pickId, t[1] = this._label.pickId, t[2] = this._polyline.pickId, t;
      }
    }
  }), C.defaultColor = d.WHITE, C.defaultPointOutlineColor = d.BLACK, C.defaultPointOutlineWidth = 0, C.defaultPointSize = 8, C.prototype.hasProperty = function (t) {
    return this._content.batchTable.hasProperty(this._batchId, t);
  }, C.prototype.getPropertyNames = function (t) {
    return this._content.batchTable.getPropertyNames(this._batchId, t);
  }, C.prototype.getProperty = function (t) {
    return this._content.batchTable.getProperty(this._batchId, t);
  }, C.prototype.setProperty = function (t, i) {
    this._content.batchTable.setProperty(this._batchId, t, i), this._content.featurePropertiesDirty = !0;
  }, C.prototype.isExactClass = function (t) {
    return this._content.batchTable.isExactClass(this._batchId, t);
  }, C.prototype.isClass = function (t) {
    return this._content.batchTable.isClass(this._batchId, t);
  }, C.prototype.getExactClassName = function () {
    return this._content.batchTable.getExactClassName(this._batchId);
  }, C;
});