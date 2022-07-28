"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(["../../Core/Cartographic", "../../Core/Color", "../../Core/Credit", "../../Core/EllipsoidGeodesic", "../../Core/Event", "../../Core/WebMercatorTilingScheme", "../../Core/Rectangle", "../../ThirdParty/when", "../widgets/ElevationGradient/TileRenderer", "../widgets/ElevationGradient/renderContourLabels"], function (e, t, r, i, o, n, s, l, a, h) {
  var u = 256,
      c = 65,
      m = 12,
      d = 10,
      C = 1,
      g = "",
      S = 16,
      v = .05,
      p = function p(e, t, r) {
    return e * (1 - r) + t * r;
  },
      f = function f(e, r, i) {
    return new t(p(e.red, r.red, i), p(e.green, r.green, i), p(e.blue, r.blue, i), p(e.alpha, r.alpha, i));
  };

  var w = function w(t, r, i) {
    var o = r * i,
        n = new Array(o);

    for (var _s = 0; _s < o; ++_s) {
      var _o = _s % r / (r - 1),
          _l = 1 - Math.floor(_s / r) / (i - 1),
          _a = (1 - _o) * t.west + _o * t.east,
          _h = (1 - _l) * t.south + _l * t.north;

      n[_s] = new e(_a, _h);
    }

    return n;
  },
      z = function z(e, t) {
    var r = s.northeast(e),
        o = s.northwest(e),
        n = s.southwest(e),
        l = new i(o, r),
        a = new i(n, o);
    return {
      x: l.surfaceDistance / t,
      y: a.surfaceDistance / t
    };
  },
      A = function A(e) {
    var t = document.createElement("canvas");
    return t.width = e, t.height = e, t;
  };

  return (
    /*#__PURE__*/
    function () {
      function _class(_ref) {
        var _this = this;

        var e = _ref.valueSampler,
            i = _ref.maskSampler,
            s = _ref.tilingScheme,
            h = _ref.ellipsoid,
            p = _ref.providerCache,
            _ref$contourColor = _ref.contourColor,
            f = _ref$contourColor === void 0 ? t.WHITE : _ref$contourColor,
            _ref$textOutlineColor = _ref.textOutlineColor,
            w = _ref$textOutlineColor === void 0 ? t.BLACK.withAlpha(.5) : _ref$textOutlineColor,
            _ref$tileSize = _ref.tileSize,
            z = _ref$tileSize === void 0 ? u : _ref$tileSize,
            _ref$gridSize = _ref.gridSize,
            b = _ref$gridSize === void 0 ? c : _ref$gridSize,
            _ref$minimumTileLevel = _ref.minimumTileLevel,
            y = _ref$minimumTileLevel === void 0 ? m : _ref$minimumTileLevel,
            _ref$contourAmount = _ref.contourAmount,
            k = _ref$contourAmount === void 0 ? 1 : _ref$contourAmount,
            _ref$gradientAmount = _ref.gradientAmount,
            L = _ref$gradientAmount === void 0 ? 1 : _ref$gradientAmount,
            _ref$majorContour = _ref.majorContour,
            x = _ref$majorContour === void 0 ? d : _ref$majorContour,
            _ref$minorContour = _ref.minorContour,
            T = _ref$minorContour === void 0 ? C : _ref$minorContour,
            _ref$credit = _ref.credit,
            P = _ref$credit === void 0 ? g : _ref$credit,
            E = _ref.extent,
            R = _ref.gradient,
            _ref$fontSize = _ref.fontSize,
            j = _ref$fontSize === void 0 ? S : _ref$fontSize,
            _ref$hillshadeAmount = _ref.hillshadeAmount,
            O = _ref$hillshadeAmount === void 0 ? 1 : _ref$hillshadeAmount,
            _ref$formatContourLab = _ref.formatContourLabel,
            F = _ref$formatContourLab === void 0 ? function (e) {
          return "".concat(e, " m");
        } : _ref$formatContourLab,
            _ref$useSlope = _ref.useSlope,
            $ = _ref$useSlope === void 0 ? 0 : _ref$useSlope,
            _ref$readyPromise = _ref.readyPromise,
            D = _ref$readyPromise === void 0 ? l.resolve() : _ref$readyPromise,
            _ref$linearUnitFactor = _ref.linearUnitFactor,
            G = _ref$linearUnitFactor === void 0 ? 1 : _ref$linearUnitFactor;

        _classCallCheck(this, _class);

        this.valueSampler = e, this.maskSampler = i, this.cache = p, this.tilingScheme = s || new n({
          ellipsoid: h
        }), this.contourColor = f, this.textOutlineColor = w, this.errorEvent = new o(), this.tileSize = z, this.maskSize = z, this.gridSize = b, this.fontSize = j, this.minimumTileLevel = y, this.gradientAmount = L, this.contourAmount = k, this.majorContour = x, this.minorContour = T, this.formatContourLabel = F, this.gradientStops = R, this.useSlope = $, this.linearUnitFactor = G, this.credit = new r(P), this.tileRenderer = new a({
          width: this.tileSize,
          height: this.tileSize,
          gradientStops: R,
          gradientAmount: L,
          hillshadeAmount: O,
          contourAmount: k,
          majorContour: x,
          minorContour: T,
          contourOpacityThreshold: v,
          useSlope: $,
          contourColor: f
        }), this.blankCanvasPromise = l.resolve(A(this.tileSize)), this.readyPromise = D, this.extent = E, this._ready = !1, this.readyPromise.then(function () {
          _this._ready = !0;
        });
      }

      _createClass(_class, [{
        key: "getTileCredits",
        value: function getTileCredits() {
          return this.credit;
        }
      }, {
        key: "requestImage",
        value: function requestImage(e, t, r) {
          var _this2 = this;

          var i = this.gridSize,
              o = this.maskSize,
              n = this.minorContour,
              a = this.majorContour,
              u = this.fontSize,
              c = this.formatContourLabel,
              m = this.contourAmount,
              d = this.useSlope,
              C = this.linearUnitFactor,
              g = function g(e) {
            return function (e, t) {
              if (t <= e[0].value) return e[0].color;

              for (var _r = 1; _r < e.length; ++_r) {
                if (t <= e[_r].value) {
                  var _i = (t - e[_r - 1].value) / (e[_r].value - e[_r - 1].value);

                  return f(e[_r - 1].color, e[_r].color, _i);
                }
              }

              return e[e.length - 1].color;
            }(_this2.gradientStops, e).alpha;
          },
              S = function S(e) {
            return !!d || g(e) > v;
          };

          if (r < this.minimumTileLevel) return this.blankCanvasPromise;
          var p = this.tilingScheme.tileXYToRectangle(e, t, r);
          if (this.extent && !s.intersection(p, this.extent)) return this.blankCanvasPromise;

          var A = z(p, C),
              b = function b(_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                e = _ref3[0],
                t = _ref3[1];

            var r = _this2.tileRenderer.render(t, e, i, o, A);

            return m > .01 ? h({
              canvas: r,
              values: t,
              maskSamples: e,
              majorContour: a,
              minorContour: n,
              fontSize: u,
              formatLabel: c,
              shouldRenderContourLabel: S,
              textColor: _this2.contourColor,
              textOutlineColor: _this2.textOutlineColor
            }) : r;
          },
              y = "".concat(e, ":").concat(t, ":").concat(r),
              k = this.cache && this.cache.has(y) ? this.cache.get(y) : null;

          if (k) return l.resolve(b(k));
          var L = w(p, i, i),
              x = l(this.valueSampler(L, r));
          var T;

          if (this.maskSampler) {
            var _e2 = w(p, o, o);

            T = l(this.maskSampler(_e2, r));
          } else T = l.resolve(Array(o * o).fill(1));

          return l.all([T, x]).then(function (e) {
            return _this2.cache && _this2.cache.set(y, e), e;
          }).then(b).otherwise(function () {
            return _this2.blankCanvasPromise;
          });
        }
      }, {
        key: "pickFeatures",
        value: function pickFeatures() {}
      }, {
        key: "tileWidth",
        get: function get() {
          return this.tileSize;
        }
      }, {
        key: "tileHeight",
        get: function get() {
          return this.tileSize;
        }
      }, {
        key: "maximumLevel",
        get: function get() {}
      }, {
        key: "minimumLevel",
        get: function get() {}
      }, {
        key: "rectangle",
        get: function get() {
          return this.tilingScheme.rectangle;
        }
      }, {
        key: "tileDiscardPolicy",
        get: function get() {}
      }, {
        key: "ready",
        get: function get() {
          return this._ready;
        }
      }, {
        key: "hasAlphaChannel",
        get: function get() {
          return !0;
        }
      }]);

      return _class;
    }()
  );
});