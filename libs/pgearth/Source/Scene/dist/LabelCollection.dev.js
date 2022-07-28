"use strict";

define(["../Core/BoundingRectangle", "../Core/Cartesian2", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Matrix4", "../Core/writeTextToCanvas", "./BillboardCollection", "./BlendOption", "./HeightReference", "./HorizontalOrigin", "./Label", "./LabelStyle", "./TextureAtlas", "./VerticalOrigin"], function (e, N, t, i, S, l, n, o, a, R, s, b, E, L, r, P, u, M) {
  "use strict";

  function F() {
    this.textureInfo = void 0, this.dimensions = void 0, this.billboard = void 0;
  }

  function G(e, t, i) {
    this.labelCollection = e, this.index = t, this.dimensions = i;
  }

  var I = 1.2,
      U = "ID_WHITE_PIXEL",
      g = new N(4, 4),
      V = new e(1, 1, 1, 1);
  var H = {};

  function z(e, t) {
    t.textureInfo = void 0, t.dimensions = void 0;
    var i = t.billboard;
    S(i) && (i.show = !1, i.image = void 0, S(i._removeCallbackFunc) && (i._removeCallbackFunc(), i._removeCallbackFunc = void 0), e._spareBillboards.push(i), t.billboard = void 0);
  }

  function f(e, t) {
    var i,
        l,
        o = t._renderedText,
        n = o.length,
        a = t._glyphs,
        s = a.length;
    if (n < s) for (l = n; l < s; ++l) {
      z(e, a[l]);
    }
    a.length = n;
    var r = t._showBackground && 0 < o.split("\n").join("").length,
        h = t._backgroundBillboard,
        d = e._backgroundBillboardCollection;
    r ? (S(h) || (h = d.add({
      collection: e,
      image: U,
      imageSubRegion: V
    }), t._backgroundBillboard = h), h.color = t._backgroundColor, h.show = t._show, h.position = t._position, h.eyeOffset = t._eyeOffset, h.pixelOffset = t._pixelOffset, h.horizontalOrigin = L.LEFT, h.verticalOrigin = t._verticalOrigin, h.heightReference = t._heightReference, h.scale = t._scale, h.pickPrimitive = t, h.id = t._id, h.translucencyByDistance = t._translucencyByDistance, h.pixelOffsetScaleByDistance = t._pixelOffsetScaleByDistance, h.scaleByDistance = t._scaleByDistance, h.distanceDisplayCondition = t._distanceDisplayCondition, h.disableDepthTestDistance = t._disableDepthTestDistance) : S(h) && (d.remove(h), t._backgroundBillboard = h = void 0);

    for (var c, _, b, u, g, f, p, x = e._glyphTextureCache, y = 0; y < n; ++y) {
      var C,
          T,
          v,
          m = o.charAt(y),
          B = t._font,
          O = t._fillColor,
          A = t._outlineColor,
          w = t._outlineWidth,
          D = t._style,
          k = t._verticalOrigin,
          E = JSON.stringify([m, B, O.toRgba(), A.toRgba(), w, +D, +k]),
          I = x[E];
      S(I) || (c = m, _ = B, b = O, u = A, g = w, f = D, p = k, H.font = _, H.fillColor = b, H.strokeColor = u, H.strokeWidth = g, p === M.CENTER ? H.textBaseline = "middle" : p === M.TOP ? H.textBaseline = "top" : H.textBaseline = "bottom", H.fill = f === P.FILL || f === P.FILL_AND_OUTLINE, H.stroke = f === P.OUTLINE || f === P.FILL_AND_OUTLINE, I = new G(e, -1, (C = R(c, H)).dimensions), x[E] = I, 0 < C.width && 0 < C.height && function (e, t, i, l) {
        e.addImage(t, i).then(function (e) {
          l.index = e;
        });
      }(e._textureAtlas, E, C, I)), i = a[y], S(i) ? -1 === I.index ? z(e, i) : S(i.textureInfo) && (i.textureInfo = void 0) : (i = new F(), a[y] = i), i.textureInfo = I, i.dimensions = I.dimensions, -1 !== I.index && (T = i.billboard, v = e._spareBillboards, S(T) || (0 < v.length ? T = v.pop() : ((T = e._billboardCollection.add({
        collection: e
      }))._labelDimensions = new N(), T._labelTranslate = new N()), i.billboard = T), T.show = t._show, T.position = t._position, T.eyeOffset = t._eyeOffset, T.pixelOffset = t._pixelOffset, T.horizontalOrigin = L.LEFT, T.verticalOrigin = t._verticalOrigin, T.heightReference = t._heightReference, T.scale = t._scale, T.pickPrimitive = t, T.id = t._id, T.image = E, T.translucencyByDistance = t._translucencyByDistance, T.pixelOffsetScaleByDistance = t._pixelOffsetScaleByDistance, T.scaleByDistance = t._scaleByDistance, T.distanceDisplayCondition = t._distanceDisplayCondition, T.disableDepthTestDistance = t._disableDepthTestDistance, T._batchIndex = t._batchIndex);
    }

    t._repositionAllGlyphs = !0;
  }

  function W(e, t, i) {
    return t === L.CENTER ? -e / 2 : t === L.RIGHT ? -(e + i.x) : i.x;
  }

  var j = new N(),
      Y = new N();

  function h(e, t) {
    for (var i = t._glyphs, l = 0, o = i.length; l < o; ++l) {
      z(e, i[l]);
    }

    S(t._backgroundBillboard) && (e._backgroundBillboardCollection.remove(t._backgroundBillboard), t._backgroundBillboard = void 0), t._labelCollection = void 0, S(t._removeCallbackFunc) && t._removeCallbackFunc(), n(t);
  }

  function d(e) {
    e = i(e, i.EMPTY_OBJECT), this._scene = e.scene, this._batchTable = e.batchTable, this._textureAtlas = void 0, this._backgroundTextureAtlas = void 0, this._whitePixelIndex = void 0, this._backgroundBillboardCollection = new s({
      scene: this._scene
    }), this._backgroundBillboardCollection.destroyTextureAtlas = !1, this._billboardCollection = new s({
      scene: this._scene,
      batchTable: this._batchTable
    }), this._billboardCollection.destroyTextureAtlas = !1, this._spareBillboards = [], this._glyphTextureCache = {}, this._labels = [], this._labelsToUpdate = [], this._totalGlyphCount = 0, this._resolutionScale = void 0, this._highlightColor = t.clone(t.WHITE), this.modelMatrix = a.clone(i(e.modelMatrix, a.IDENTITY)), this.debugShowBoundingVolume = i(e.debugShowBoundingVolume, !1), this.blendOption = i(e.blendOption, b.OPAQUE_AND_TRANSLUCENT);
  }

  return l(d.prototype, {
    length: {
      get: function get() {
        return this._labels.length;
      }
    }
  }), d.prototype.add = function (e) {
    var t = new r(e, this);
    return this._labels.push(t), this._labelsToUpdate.push(t), t;
  }, d.prototype.remove = function (e) {
    if (S(e) && e._labelCollection === this) {
      var t = this._labels.indexOf(e);

      if (-1 !== t) return this._labels.splice(t, 1), h(this, e), !0;
    }

    return !1;
  }, d.prototype.removeAll = function () {
    for (var e = this._labels, t = 0, i = e.length; t < i; ++t) {
      h(this, e[t]);
    }

    e.length = 0;
  }, d.prototype.contains = function (e) {
    return S(e) && e._labelCollection === this;
  }, d.prototype.get = function (e) {
    if (!S(e)) throw new o("index is required.");
    return this._labels[e];
  }, d.prototype.update = function (e) {
    var t = this._billboardCollection,
        i = this._backgroundBillboardCollection;
    t.modelMatrix = this.modelMatrix, t.debugShowBoundingVolume = this.debugShowBoundingVolume, i.modelMatrix = this.modelMatrix, i.debugShowBoundingVolume = this.debugShowBoundingVolume;
    var l = e.context;
    S(this._textureAtlas) || (this._textureAtlas = new u({
      context: l
    }), t.textureAtlas = this._textureAtlas), S(this._backgroundTextureAtlas) || (this._backgroundTextureAtlas = new u({
      context: l,
      initialSize: g
    }), i.textureAtlas = this._backgroundTextureAtlas, function (e, t) {
      var i = document.createElement("canvas");
      i.width = g.x, i.height = g.y;
      var l = i.getContext("2d");
      l.fillStyle = "#fff", l.fillRect(0, 0, i.width, i.height), e.addImage(U, i).then(function (e) {
        t._whitePixelIndex = e;
      });
    }(this._backgroundTextureAtlas, this));
    var o,
        n = l.uniformState.resolutionScale,
        a = this._resolutionScale !== n;
    this._resolutionScale = n;

    for (var s = (o = a ? this._labels : this._labelsToUpdate).length, r = 0; r < s; ++r) {
      var h,
          d,
          c = o[r];
      c.isDestroyed() || (h = c._glyphs.length, c._rebindAllGlyphs && (f(this, c), c._rebindAllGlyphs = !1), (a || c._repositionAllGlyphs) && (function (e, t) {
        for (var i = e._glyphs, l = e._renderedText, o = 0, n = 0, a = [], s = Number.NEGATIVE_INFINITY, r = 0, h = 1, d = i.length, c = e._backgroundBillboard, _ = N.clone(S(c) ? e._backgroundPadding : N.ZERO, Y), b = 0; b < d; ++b) {
          "\n" === l.charAt(b) ? (a.push(o), ++h, o = 0) : (w = (A = i[b]).dimensions, r = Math.max(r, w.height - w.descent), s = Math.max(s, w.descent), o += w.width - w.bounds.minx, b < d - 1 && (o += i[b + 1].dimensions.bounds.minx), n = Math.max(n, o));
        }

        a.push(o);
        var u = r + s,
            g = e._scale,
            f = e._horizontalOrigin,
            p = e._verticalOrigin,
            x = 0,
            y = a[x],
            C = W(y, f, _),
            T = I * u,
            v = T * (h - 1),
            m = n,
            B = u + v;
        S(c) && (m += 2 * _.x, B += 2 * _.y, c._labelHorizontalOrigin = f), j.x = C * g * t;
        var O,
            A,
            w,
            D = j.y = 0;

        for (b = 0; b < d; ++b) {
          "\n" === l.charAt(b) ? (D += T, C = W(y = a[++x], f, _), j.x = C * g * t) : (w = (A = i[b]).dimensions, p === M.TOP ? j.y = w.height - r - _.y : p === M.CENTER ? j.y = (v + w.height - r) / 2 : p === M.BASELINE ? j.y = v : j.y = v + s + _.y, j.y = (j.y - w.descent - D) * g * t, S(A.billboard) && (A.billboard._setTranslate(j), A.billboard._labelDimensions.x = m, A.billboard._labelDimensions.y = B, A.billboard._labelHorizontalOrigin = f), b < d - 1 && (O = i[b + 1], j.x += (w.width - w.bounds.minx + O.dimensions.bounds.minx) * g * t));
        }

        if (S(c) && 0 < l.split("\n").join("").length && (C = f === L.CENTER ? -n / 2 - _.x : f === L.RIGHT ? -(n + 2 * _.x) : 0, j.x = C * g * t, p === M.TOP ? j.y = u - r - s : p === M.CENTER ? j.y = (u - r) / 2 - s : p === M.BASELINE ? j.y = -_.y - s : j.y = 0, j.y = j.y * g * t, c.width = m, c.height = B, c._setTranslate(j), c._labelTranslate = N.clone(j, c._labelTranslate)), e.heightReference === E.CLAMP_TO_GROUND) for (b = 0; b < d; ++b) {
          var k = (A = i[b]).billboard;
          S(k) && (k._labelTranslate = N.clone(j, k._labelTranslate));
        }
      }(c, n), c._repositionAllGlyphs = !1), d = c._glyphs.length - h, this._totalGlyphCount += d);
    }

    var _ = 0 < i.length ? b.TRANSLUCENT : this.blendOption;

    t.blendOption = _, i.blendOption = _, t._highlightColor = this._highlightColor, i._highlightColor = this._highlightColor, this._labelsToUpdate.length = 0, i.update(e), t.update(e);
  }, d.prototype.isDestroyed = function () {
    return !1;
  }, d.prototype.destroy = function () {
    return this.removeAll(), this._billboardCollection = this._billboardCollection.destroy(), this._textureAtlas = this._textureAtlas && this._textureAtlas.destroy(), this._backgroundBillboardCollection = this._backgroundBillboardCollection.destroy(), this._backgroundTextureAtlas = this._backgroundTextureAtlas && this._backgroundTextureAtlas.destroy(), n(this);
  }, d;
});