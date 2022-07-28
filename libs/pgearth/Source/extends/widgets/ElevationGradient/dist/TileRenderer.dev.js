"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(["../../../Shaders/elevationGradientVert", "../../../Shaders/elevationGradientFrag", "../support/lodash"], function (t, e, r) {
  var o = .75,
      n = .7857142857,
      a = 2.3571428571,
      i = 255,
      u = {},
      s = function s(t, e) {
    var r = JSON.stringify({
      width: t,
      height: e
    });

    if (!u[r]) {
      var _o = document.createElement("canvas");

      _o.width = t, _o.height = e;

      var _n = _o.getContext("webgl") || _o.getContext("experimental-webgl");

      u[r] = {
        canvas: _o,
        gl: _n
      };
    }

    return u[r];
  };

  var E = function E(t) {
    var e = document.createElement("canvas");
    return e.width = t.width, e.height = t.height, e.getContext("2d").drawImage(t, 0, 0), e;
  },
      c = function c(t, e) {
    if (!t.getShaderParameter(e, t.COMPILE_STATUS)) {
      var _r = t.getShaderInfoLog(e);

      console.error("*** Error compiling shader '".concat(e, "':").concat(_r));
    }
  },
      T = function T(t, e, r) {
    var o = t.createProgram(),
        n = t.createShader(t.VERTEX_SHADER);
    t.shaderSource(n, e), t.compileShader(n), c(t, n), t.attachShader(o, n);
    var a = t.createShader(t.FRAGMENT_SHADER);

    if (t.shaderSource(a, r), t.compileShader(a), c(t, a), t.attachShader(o, a), t.linkProgram(o), !t.getProgramParameter(o, t.LINK_STATUS)) {
      var _e = t.getProgramInfoLog(o);

      return console.error("Error in program linking:".concat(_e)), t.deleteProgram(o), null;
    }

    return o;
  },
      h = function h(t, e, r, o, n) {
    var a = e,
        i = e + o,
        u = r,
        s = r + n;
    t.bufferData(t.ARRAY_BUFFER, new Float32Array([a, u, i, u, a, s, a, s, i, u, i, s]), t.STATIC_DRAW);
  };

  return (
    /*#__PURE__*/
    function () {
      function _class(_ref) {
        var r = _ref.width,
            o = _ref.height,
            n = _ref.gradientStops,
            a = _ref.gradientAmount,
            i = _ref.hillshadeAmount,
            u = _ref.contourAmount,
            E = _ref.majorContour,
            c = _ref.minorContour,
            h = _ref.contourOpacityThreshold,
            _ = _ref.useSlope,
            m = _ref.contourColor;

        _classCallCheck(this, _class);

        var _s = s(r, o),
            g = _s.canvas,
            l = _s.gl;

        if (this.canvasElement = g, this.gl = l, !this.gl) throw Error("Failed to get WebGL context");
        this.gradientStops = n;
        var A = e.replace(/GRADIENT_STOP_COUNT/g, this.gradientStops.length.toString()).replace(/CONTOUR_OPACITY_THRESHOLD/g, h.toString());
        this.program = T(this.gl, t, A), this.hillshadeAmount = i, this.gradientAmount = a, this.contourAmount = u, this.majorContour = E, this.minorContour = c, this.useSlope = _, this.contourColor = m;
      }

      _createClass(_class, [{
        key: "render",
        value: function render(t, e, u, s, c) {
          var T = this.gl,
              _ = this.program,
              m = this.canvasElement,
              g = this.gradientStops,
              l = this.majorContour,
              A = this.minorContour,
              R = this.gradientAmount,
              d = this.contourAmount,
              f = this.contourColor,
              U = new ArrayBuffer(e.length),
              S = new Uint8Array(U);
          e.forEach(function (t, e) {
            S[e] = t * i;
          });
          var x = new ArrayBuffer(4 * t.length),
              D = new Uint8Array(x),
              P = r.min(t),
              p = r.max(t),
              L = p - P;
          t.forEach(function (t, e) {
            var r = (L < .001 ? 0 : (t - P) / (p - P)) * i,
                o = (r - Math.floor(r)) * i;
            D[4 * e] = r, D[4 * e + 1] = o, D[4 * e + 2] = r + .5, D[4 * e + 3] = r + .75;
          }), T.useProgram(_);
          var C = T.getAttribLocation(_, "a_position"),
              b = T.getAttribLocation(_, "a_texCoord"),
              X = .5 / (u - 1),
              w = X,
              I = 1 - X,
              F = T.createBuffer();
          T.bindBuffer(T.ARRAY_BUFFER, F), T.bufferData(T.ARRAY_BUFFER, new Float32Array([w, w, I, w, w, I, w, I, I, w, I, I]), T.STATIC_DRAW), T.enableVertexAttribArray(b), T.vertexAttribPointer(b, 2, T.FLOAT, !1, 0, 0);
          var N = T.createTexture();
          T.bindTexture(T.TEXTURE_2D, N), T.texParameteri(T.TEXTURE_2D, T.TEXTURE_WRAP_S, T.CLAMP_TO_EDGE), T.texParameteri(T.TEXTURE_2D, T.TEXTURE_WRAP_T, T.CLAMP_TO_EDGE), T.texParameteri(T.TEXTURE_2D, T.TEXTURE_MIN_FILTER, T.LINEAR), T.texParameteri(T.TEXTURE_2D, T.TEXTURE_MAG_FILTER, T.LINEAR), T.texImage2D(T.TEXTURE_2D, 0, T.RGBA, u, u, 0, T.RGBA, T.UNSIGNED_BYTE, D);
          var v = T.createTexture();
          T.bindTexture(T.TEXTURE_2D, v), T.texParameteri(T.TEXTURE_2D, T.TEXTURE_WRAP_S, T.CLAMP_TO_EDGE), T.texParameteri(T.TEXTURE_2D, T.TEXTURE_WRAP_T, T.CLAMP_TO_EDGE), T.texParameteri(T.TEXTURE_2D, T.TEXTURE_MIN_FILTER, T.LINEAR), T.texParameteri(T.TEXTURE_2D, T.TEXTURE_MAG_FILTER, T.LINEAR), T.texImage2D(T.TEXTURE_2D, 0, T.ALPHA, s, s, 0, T.ALPHA, T.UNSIGNED_BYTE, S);

          var G = function G() {
            var e = arguments.length - 1,
                r = T.getUniformLocation(_, arguments.length <= 0 ? undefined : arguments[0]);

            switch (e) {
              case 1:
                T.uniform1f(r, arguments.length <= 1 ? undefined : arguments[1]);
                break;

              case 2:
                T.uniform2f(r, arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);
                break;

              case 3:
                T.uniform3f(r, arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2], arguments.length <= 3 ? undefined : arguments[3]);
                break;

              case 4:
                T.uniform4f(r, arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2], arguments.length <= 3 ? undefined : arguments[3], arguments.length <= 4 ? undefined : arguments[4]);
                break;

              default:
                throw new Error("unsupported uniform");
            }
          };

          G("u_resolution", m.width, m.height), G("u_tileElevationRange", P, p), G("u_textureSize", m.width, m.height), G("u_tileDimension", c.x, c.y), G("u_zFactor", o), G("u_zenith", n), G("u_azimuth", a), G("u_majorContour", l), G("u_minorContour", A), G("u_hillshadeAmount", this.hillshadeAmount), G("u_gradientAmount", R), G("u_contourAmount", d), G("u_useSlope", this.useSlope), G("u_contourColor", f.red, f.green, f.blue, f.alpha);
          var O = [];
          g.forEach(function (_ref2) {
            var _ref2$color = _ref2.color,
                t = _ref2$color.red,
                e = _ref2$color.green,
                r = _ref2$color.blue,
                o = _ref2$color.alpha;
            O.push(t * o), O.push(e * o), O.push(r * o), O.push(o);
          });
          var y = g.map(function (_ref3) {
            var t = _ref3.value;
            return t;
          }),
              B = T.getUniformLocation(_, "u_gradientColors");
          T.uniform4fv(B, new Float32Array(O));
          var M = T.getUniformLocation(_, "u_gradientValues");
          T.uniform1fv(M, new Float32Array(y));
          var k = T.createBuffer();
          T.bindBuffer(T.ARRAY_BUFFER, k), T.enableVertexAttribArray(C), T.vertexAttribPointer(C, 2, T.FLOAT, !1, 0, 0);
          var W = T.getUniformLocation(_, "u_image"),
              Y = T.getUniformLocation(_, "u_mask");
          return T.uniform1i(W, 0), T.uniform1i(Y, 1), T.activeTexture(T.TEXTURE0), T.bindTexture(T.TEXTURE_2D, N), T.activeTexture(T.TEXTURE1), T.bindTexture(T.TEXTURE_2D, v), h(T, 0, 0, m.width, m.height), T.drawArrays(T.TRIANGLES, 0, 6), E(m);
        }
      }]);

      return _class;
    }()
  );
});