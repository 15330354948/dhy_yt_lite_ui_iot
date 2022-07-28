"use strict";

define(["../Core/BoundingRectangle", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/DistanceDisplayCondition", "../Core/freezeObject", "../Core/NearFarScalar", "./Billboard", "./HeightReference", "./HorizontalOrigin", "./LabelStyle", "./VerticalOrigin"], function (w, l, o, a, h, D, e, c, u, t, d, s, f, _, g, B) {
  "use strict";

  var p = t({
    LTR: 0,
    RTL: 1,
    WEAK: 2,
    BRACKETS: 3
  });

  function i(e) {
    e._rebindAllGlyphs || e._repositionAllGlyphs || e._labelCollection._labelsToUpdate.push(e), e._rebindAllGlyphs = !0;
  }

  function b(e) {
    e._rebindAllGlyphs || e._repositionAllGlyphs || e._labelCollection._labelsToUpdate.push(e), e._repositionAllGlyphs = !0;
  }

  function n(e, t) {
    if (e = h(e, h.EMPTY_OBJECT), D(e.disableDepthTestDistance) && e.disableDepthTestDistance < 0) throw new c("disableDepthTestDistance must be greater than 0.0.");
    var i = e.translucencyByDistance,
        n = e.pixelOffsetScaleByDistance,
        s = e.scaleByDistance,
        r = e.distanceDisplayCondition;

    if (D(i)) {
      if (i.far <= i.near) throw new c("translucencyByDistance.far must be greater than translucencyByDistance.near.");
      i = d.clone(i);
    }

    if (D(n)) {
      if (n.far <= n.near) throw new c("pixelOffsetScaleByDistance.far must be greater than pixelOffsetScaleByDistance.near.");
      n = d.clone(n);
    }

    if (D(s)) {
      if (s.far <= s.near) throw new c("scaleByDistance.far must be greater than scaleByDistance.near.");
      s = d.clone(s);
    }

    if (D(r)) {
      if (r.far <= r.near) throw new c("distanceDisplayCondition.far must be greater than distanceDisplayCondition.near.");
      r = u.clone(r);
    }

    this._renderedText = void 0, this._text = void 0, this._show = h(e.show, !0), this._font = h(e.font, "30px sans-serif"), this._fillColor = a.clone(h(e.fillColor, a.WHITE)), this._outlineColor = a.clone(h(e.outlineColor, a.BLACK)), this._outlineWidth = h(e.outlineWidth, 1), this._showBackground = h(e.showBackground, !1), this._backgroundColor = h(e.backgroundColor, new a(.165, .165, .165, .8)), this._backgroundPadding = h(e.backgroundPadding, new l(7, 5)), this._style = h(e.style, g.FILL), this._verticalOrigin = h(e.verticalOrigin, B.BASELINE), this._horizontalOrigin = h(e.horizontalOrigin, _.LEFT), this._pixelOffset = l.clone(h(e.pixelOffset, l.ZERO)), this._eyeOffset = o.clone(h(e.eyeOffset, o.ZERO)), this._position = o.clone(h(e.position, o.ZERO)), this._scale = h(e.scale, 1), this._id = e.id, this._translucencyByDistance = i, this._pixelOffsetScaleByDistance = n, this._scaleByDistance = s, this._heightReference = h(e.heightReference, f.NONE), this._distanceDisplayCondition = r, this._disableDepthTestDistance = e.disableDepthTestDistance, this._labelCollection = t, this._glyphs = [], this._backgroundBillboard = void 0, this._batchIndex = void 0, this._rebindAllGlyphs = !0, this._repositionAllGlyphs = !0, this._actualClampedPosition = void 0, this._removeCallbackFunc = void 0, this._mode = void 0, this._clusterShow = !0, this.text = h(e.text, ""), this._updateClamping();
  }

  function y(e, t, i) {
    return e.slice(0, t) + i + e.slice(t);
  }

  e(n.prototype, {
    show: {
      get: function get() {
        return this._show;
      },
      set: function set(e) {
        if (!D(e)) throw new c("value is required.");

        if (this._show !== e) {
          this._show = e;

          for (var t = this._glyphs, i = 0, n = t.length; i < n; i++) {
            var s = t[i].billboard;
            D(s) && (s.show = e);
          }

          var r = this._backgroundBillboard;
          D(r) && (r.show = e);
        }
      }
    },
    position: {
      get: function get() {
        return this._position;
      },
      set: function set(e) {
        if (!D(e)) throw new c("value is required.");
        var t = this._position;

        if (!o.equals(t, e)) {
          o.clone(e, t);

          for (var i = this._glyphs, n = 0, s = i.length; n < s; n++) {
            var r = i[n].billboard;
            D(r) && (r.position = e);
          }

          var a = this._backgroundBillboard;
          D(a) && (a.position = e), this._updateClamping();
        }
      }
    },
    heightReference: {
      get: function get() {
        return this._heightReference;
      },
      set: function set(e) {
        if (!D(e)) throw new c("value is required.");

        if (e !== this._heightReference) {
          this._heightReference = e;

          for (var t = this._glyphs, i = 0, n = t.length; i < n; i++) {
            var s = t[i].billboard;
            D(s) && (s.heightReference = e);
          }

          var r = this._backgroundBillboard;
          D(r) && (r.heightReference = e), b(this), this._updateClamping();
        }
      }
    },
    text: {
      get: function get() {
        return this._text;
      },
      set: function set(e) {
        if (!D(e)) throw new c("value is required.");
        this._text !== e && (this._text = e, this._renderedText = n.enableRightToLeftDetection ? function (e) {
          for (var t = e.split("\n"), i = "", n = 0; n < t.length; n++) {
            for (var s = t[n], r = v.test(s.charAt(0)), a = function (e, t) {
              for (var i = /[a-zA-Z0-9]/, n = /[()[\]{}<>]/, s = [], r = "", a = p.LTR, l = "", o = e.length, h = 0; h < o; ++h) {
                var c = e.charAt(h);
                l = t.test(c) ? p.RTL : i.test(c) ? p.LTR : n.test(c) ? p.BRACKETS : p.WEAK, 0 === h && (a = l), a === l && l !== p.BRACKETS ? r += c : ("" !== r && s.push({
                  Type: a,
                  Word: r
                }), a = l, r = c);
              }

              return s.push({
                Type: l,
                Word: r
              }), s;
            }(s, v), l = 0, o = "", h = 0; h < a.length; ++h) {
              var c = a[h],
                  u = (c.Type === p.BRACKETS ? function (e) {
                switch (e) {
                  case "(":
                    return ")";

                  case ")":
                    return "(";

                  case "[":
                    return "]";

                  case "]":
                    return "[";

                  case "{":
                    return "}";

                  case "}":
                    return "{";

                  case "<":
                    return ">";

                  case ">":
                    return "<";
                }
              } : function (e) {
                return e.split("").reverse().join("");
              })(c.Word);
              r ? c.Type === p.RTL ? (o = u + o, l = 0) : c.Type === p.LTR ? (o = y(o, l, c.Word), l += c.Word.length) : c.Type !== p.WEAK && c.Type !== p.BRACKETS || (c.Type === p.WEAK && a[h - 1].Type === p.BRACKETS ? o = u + o : a[h - 1].Type === p.RTL ? (o = u + o, l = 0) : a.length > h + 1 ? a[h + 1].Type === p.RTL ? (o = u + o, l = 0) : (o = y(o, l, c.Word), l += c.Word.length) : o = y(o, 0, u)) : c.Type === p.RTL ? o = y(o, l, u) : c.Type === p.LTR ? (o += c.Word, l = o.length) : c.Type !== p.WEAK && c.Type !== p.BRACKETS || (0 < h && a[h - 1].Type === p.RTL ? a.length > h + 1 ? a[h + 1].Type === p.RTL ? o = y(o, l, u) : (o += c.Word, l = o.length) : o += c.Word : (o += c.Word, l = o.length));
            }

            i += o, n < t.length - 1 && (i += "\n");
          }

          return i;
        }(e) : e, i(this));
      }
    },
    font: {
      get: function get() {
        return this._font;
      },
      set: function set(e) {
        if (!D(e)) throw new c("value is required.");
        this._font !== e && (this._font = e, i(this));
      }
    },
    fillColor: {
      get: function get() {
        return this._fillColor;
      },
      set: function set(e) {
        if (!D(e)) throw new c("value is required.");
        var t = this._fillColor;
        a.equals(t, e) || (a.clone(e, t), i(this));
      }
    },
    outlineColor: {
      get: function get() {
        return this._outlineColor;
      },
      set: function set(e) {
        if (!D(e)) throw new c("value is required.");
        var t = this._outlineColor;
        a.equals(t, e) || (a.clone(e, t), i(this));
      }
    },
    outlineWidth: {
      get: function get() {
        return this._outlineWidth;
      },
      set: function set(e) {
        if (!D(e)) throw new c("value is required.");
        this._outlineWidth !== e && (this._outlineWidth = e, i(this));
      }
    },
    showBackground: {
      get: function get() {
        return this._showBackground;
      },
      set: function set(e) {
        if (!D(e)) throw new c("value is required.");
        this._showBackground !== e && (this._showBackground = e, i(this));
      }
    },
    backgroundColor: {
      get: function get() {
        return this._backgroundColor;
      },
      set: function set(e) {
        if (!D(e)) throw new c("value is required.");
        var t,
            i = this._backgroundColor;
        a.equals(i, e) || (a.clone(e, i), t = this._backgroundBillboard, D(t) && (t.color = i));
      }
    },
    backgroundPadding: {
      get: function get() {
        return this._backgroundPadding;
      },
      set: function set(e) {
        if (!D(e)) throw new c("value is required.");
        var t = this._backgroundPadding;
        l.equals(t, e) || (l.clone(e, t), b(this));
      }
    },
    style: {
      get: function get() {
        return this._style;
      },
      set: function set(e) {
        if (!D(e)) throw new c("value is required.");
        this._style !== e && (this._style = e, i(this));
      }
    },
    pixelOffset: {
      get: function get() {
        return this._pixelOffset;
      },
      set: function set(e) {
        if (!D(e)) throw new c("value is required.");
        var t = this._pixelOffset;

        if (!l.equals(t, e)) {
          l.clone(e, t);

          for (var i = this._glyphs, n = 0, s = i.length; n < s; n++) {
            var r = i[n];
            D(r.billboard) && (r.billboard.pixelOffset = e);
          }

          var a = this._backgroundBillboard;
          D(a) && (a.pixelOffset = e);
        }
      }
    },
    translucencyByDistance: {
      get: function get() {
        return this._translucencyByDistance;
      },
      set: function set(e) {
        if (D(e) && e.far <= e.near) throw new c("far distance must be greater than near distance.");
        var t = this._translucencyByDistance;

        if (!d.equals(t, e)) {
          this._translucencyByDistance = d.clone(e, t);

          for (var i = this._glyphs, n = 0, s = i.length; n < s; n++) {
            var r = i[n];
            D(r.billboard) && (r.billboard.translucencyByDistance = e);
          }

          var a = this._backgroundBillboard;
          D(a) && (a.translucencyByDistance = e);
        }
      }
    },
    pixelOffsetScaleByDistance: {
      get: function get() {
        return this._pixelOffsetScaleByDistance;
      },
      set: function set(e) {
        if (D(e) && e.far <= e.near) throw new c("far distance must be greater than near distance.");
        var t = this._pixelOffsetScaleByDistance;

        if (!d.equals(t, e)) {
          this._pixelOffsetScaleByDistance = d.clone(e, t);

          for (var i = this._glyphs, n = 0, s = i.length; n < s; n++) {
            var r = i[n];
            D(r.billboard) && (r.billboard.pixelOffsetScaleByDistance = e);
          }

          var a = this._backgroundBillboard;
          D(a) && (a.pixelOffsetScaleByDistance = e);
        }
      }
    },
    scaleByDistance: {
      get: function get() {
        return this._scaleByDistance;
      },
      set: function set(e) {
        if (D(e) && e.far <= e.near) throw new c("far distance must be greater than near distance.");
        var t = this._scaleByDistance;

        if (!d.equals(t, e)) {
          this._scaleByDistance = d.clone(e, t);

          for (var i = this._glyphs, n = 0, s = i.length; n < s; n++) {
            var r = i[n];
            D(r.billboard) && (r.billboard.scaleByDistance = e);
          }

          var a = this._backgroundBillboard;
          D(a) && (a.scaleByDistance = e);
        }
      }
    },
    eyeOffset: {
      get: function get() {
        return this._eyeOffset;
      },
      set: function set(e) {
        if (!D(e)) throw new c("value is required.");
        var t = this._eyeOffset;

        if (!o.equals(t, e)) {
          o.clone(e, t);

          for (var i = this._glyphs, n = 0, s = i.length; n < s; n++) {
            var r = i[n];
            D(r.billboard) && (r.billboard.eyeOffset = e);
          }

          var a = this._backgroundBillboard;
          D(a) && (a.eyeOffset = e);
        }
      }
    },
    horizontalOrigin: {
      get: function get() {
        return this._horizontalOrigin;
      },
      set: function set(e) {
        if (!D(e)) throw new c("value is required.");
        this._horizontalOrigin !== e && (this._horizontalOrigin = e, b(this));
      }
    },
    verticalOrigin: {
      get: function get() {
        return this._verticalOrigin;
      },
      set: function set(e) {
        if (!D(e)) throw new c("value is required.");

        if (this._verticalOrigin !== e) {
          this._verticalOrigin = e;

          for (var t = this._glyphs, i = 0, n = t.length; i < n; i++) {
            var s = t[i];
            D(s.billboard) && (s.billboard.verticalOrigin = e);
          }

          var r = this._backgroundBillboard;
          D(r) && (r.verticalOrigin = e), b(this);
        }
      }
    },
    scale: {
      get: function get() {
        return this._scale;
      },
      set: function set(e) {
        if (!D(e)) throw new c("value is required.");

        if (this._scale !== e) {
          this._scale = e;

          for (var t = this._glyphs, i = 0, n = t.length; i < n; i++) {
            var s = t[i];
            D(s.billboard) && (s.billboard.scale = e);
          }

          var r = this._backgroundBillboard;
          D(r) && (r.scale = e), b(this);
        }
      }
    },
    distanceDisplayCondition: {
      get: function get() {
        return this._distanceDisplayCondition;
      },
      set: function set(e) {
        if (D(e) && e.far <= e.near) throw new c("far must be greater than near");

        if (!u.equals(e, this._distanceDisplayCondition)) {
          this._distanceDisplayCondition = u.clone(e, this._distanceDisplayCondition);

          for (var t = this._glyphs, i = 0, n = t.length; i < n; i++) {
            var s = t[i];
            D(s.billboard) && (s.billboard.distanceDisplayCondition = e);
          }

          var r = this._backgroundBillboard;
          D(r) && (r.distanceDisplayCondition = e);
        }
      }
    },
    disableDepthTestDistance: {
      get: function get() {
        return this._disableDepthTestDistance;
      },
      set: function set(e) {
        if (this._disableDepthTestDistance !== e) {
          if (D(e) && e < 0) throw new c("disableDepthTestDistance must be greater than 0.0.");
          this._disableDepthTestDistance = e;

          for (var t = this._glyphs, i = 0, n = t.length; i < n; i++) {
            var s = t[i];
            D(s.billboard) && (s.billboard.disableDepthTestDistance = e);
          }

          var r = this._backgroundBillboard;
          D(r) && (r.disableDepthTestDistance = e);
        }
      }
    },
    id: {
      get: function get() {
        return this._id;
      },
      set: function set(e) {
        if (this._id !== e) {
          this._id = e;

          for (var t = this._glyphs, i = 0, n = t.length; i < n; i++) {
            var s = t[i];
            D(s.billboard) && (s.billboard.id = e);
          }

          var r = this._backgroundBillboard;
          D(r) && (r.id = e);
        }
      }
    },
    pickId: {
      get: function get() {
        if (0 !== this._glyphs.length && D(this._glyphs[0].billboard)) return this._glyphs[0].billboard.pickId;
      }
    },
    _clampedPosition: {
      get: function get() {
        return this._actualClampedPosition;
      },
      set: function set(e) {
        this._actualClampedPosition = o.clone(e, this._actualClampedPosition);

        for (var t = this._glyphs, i = 0, n = t.length; i < n; i++) {
          var s = t[i];
          D(s.billboard) && (s.billboard._clampedPosition = e);
        }

        var r = this._backgroundBillboard;
        D(r) && (r._clampedPosition = e);
      }
    },
    clusterShow: {
      get: function get() {
        return this._clusterShow;
      },
      set: function set(e) {
        if (this._clusterShow !== e) {
          this._clusterShow = e;

          for (var t = this._glyphs, i = 0, n = t.length; i < n; i++) {
            var s = t[i];
            D(s.billboard) && (s.billboard.clusterShow = e);
          }

          var r = this._backgroundBillboard;
          D(r) && (r.clusterShow = e);
        }
      }
    }
  }), n.prototype._updateClamping = function () {
    s._updateClamping(this._labelCollection, this);
  }, n.prototype.computeScreenSpacePosition = function (e, t) {
    if (!D(e)) throw new c("scene is required.");
    D(t) || (t = new l());
    var i = this._labelCollection.modelMatrix,
        n = D(this._actualClampedPosition) ? this._actualClampedPosition : this._position;
    return s._computeScreenSpacePosition(i, n, this._eyeOffset, this._pixelOffset, e, t);
  }, n.getScreenSpaceBoundingBox = function (e, t, i) {
    var n = 0,
        s = 0,
        r = 0,
        a = 0,
        l = e.scale,
        o = e._labelCollection._resolutionScale,
        h = e._backgroundBillboard;
    if (D(h)) n = t.x + h._translate.x / o, s = t.y - h._translate.y / o, r = h.width * l, a = h.height * l, e.verticalOrigin === B.BOTTOM || e.verticalOrigin === B.BASELINE ? s -= a : e.verticalOrigin === B.CENTER && (s -= .5 * a);else {
      n = Number.POSITIVE_INFINITY, s = Number.POSITIVE_INFINITY;

      for (var c = 0, u = 0, d = e._glyphs, f = d.length, _ = 0; _ < f; ++_) {
        var g,
            p,
            b,
            y,
            v = d[_].billboard;
        D(v) && (g = t.x + v._translate.x / o, p = t.y - v._translate.y / o, b = v.width * l, y = v.height * l, e.verticalOrigin === B.BOTTOM || e.verticalOrigin === B.BASELINE ? p -= y : e.verticalOrigin === B.CENTER && (p -= .5 * y), n = Math.min(n, g), s = Math.min(s, p), c = Math.max(c, g + b), u = Math.max(u, p + y));
      }

      r = c - n, a = u - s;
    }
    return D(i) || (i = new w()), i.x = n, i.y = s, i.width = r, i.height = a, i;
  }, n.prototype.equals = function (e) {
    return this === e || D(e) && this._show === e._show && this._scale === e._scale && this._outlineWidth === e._outlineWidth && this._showBackground === e._showBackground && this._style === e._style && this._verticalOrigin === e._verticalOrigin && this._horizontalOrigin === e._horizontalOrigin && this._heightReference === e._heightReference && this._renderedText === e._renderedText && this._font === e._font && o.equals(this._position, e._position) && a.equals(this._fillColor, e._fillColor) && a.equals(this._outlineColor, e._outlineColor) && a.equals(this._backgroundColor, e._backgroundColor) && l.equals(this._backgroundPadding, e._backgroundPadding) && l.equals(this._pixelOffset, e._pixelOffset) && o.equals(this._eyeOffset, e._eyeOffset) && d.equals(this._translucencyByDistance, e._translucencyByDistance) && d.equals(this._pixelOffsetScaleByDistance, e._pixelOffsetScaleByDistance) && d.equals(this._scaleByDistance, e._scaleByDistance) && u.equals(this._distanceDisplayCondition, e._distanceDisplayCondition) && this._disableDepthTestDistance === e._disableDepthTestDistance && this._id === e._id;
  }, n.prototype.isDestroyed = function () {
    return !1;
  }, n.enableRightToLeftDetection = !1;
  var v = new RegExp("[א-ת؀-ۿݐ-ݿࢠ-ࣿ]");
  return n;
});