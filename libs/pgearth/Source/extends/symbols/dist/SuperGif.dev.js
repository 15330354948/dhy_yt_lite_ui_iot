"use strict";

define([], function () {
  var d = function d(g) {
    return g.reduce(function (h, i) {
      return h * 2 + i;
    }, 0);
  };

  var e = function e(j) {
    var g = [];

    for (var h = 7; h >= 0; h--) {
      g.push(!!(j & 1 << h));
    }

    return g;
  };

  var f = function f(g) {
    this.data = g;
    this.len = this.data.length;
    this.pos = 0;

    this.readByte = function () {
      if (this.pos >= this.data.length) {
        throw new Error("Attempted to read past end of stream.");
      }

      if (g instanceof Uint8Array) {
        return g[this.pos++];
      } else {
        return g.charCodeAt(this.pos++) & 255;
      }
    };

    this.readBytes = function (k) {
      var h = [];

      for (var j = 0; j < k; j++) {
        h.push(this.readByte());
      }

      return h;
    };

    this.read = function (k) {
      var j = "";

      for (var h = 0; h < k; h++) {
        j += String.fromCharCode(this.readByte());
      }

      return j;
    };

    this.readUnsigned = function () {
      var h = this.readBytes(2);
      return (h[1] << 8) + h[0];
    };
  };

  var c = function c(o, k) {
    var p = 0;

    var q = function q(t) {
      var u = 0;

      for (var s = 0; s < t; s++) {
        if (k.charCodeAt(p >> 3) & 1 << (p & 7)) {
          u |= 1 << s;
        }

        p++;
      }

      return u;
    };

    var h = [];
    var m = 1 << o;
    var j = m + 1;
    var n = o + 1;
    var i = [];

    var l = function l() {
      i = [];
      n = o + 1;

      for (var s = 0; s < m; s++) {
        i[s] = [s];
      }

      i[m] = [];
      i[j] = null;
    };

    var g;
    var r;

    while (true) {
      r = g;
      g = q(n);

      if (g === m) {
        l();
        continue;
      }

      if (g === j) {
        break;
      }

      if (g < i.length) {
        if (r !== m) {
          i.push(i[r].concat(i[g][0]));
        }
      } else {
        if (g !== i.length) {
          throw new Error("Invalid LZW code.");
        }

        i.push(i[r].concat(i[r][0]));
      }

      h.push.apply(h, i[g]);

      if (i.length === 1 << n && n < 12) {
        n++;
      }
    }

    return h;
  };

  var a = function a(n, m) {
    m || (m = {});

    var i = function i(p) {
      var r = [];

      for (var q = 0; q < p; q++) {
        r.push(n.readBytes(3));
      }

      return r;
    };

    var l = function l() {
      var p, q;
      q = "";

      do {
        p = n.readByte();
        q += n.read(p);
      } while (p !== 0);

      return q;
    };

    var k = function k() {
      var q = {};
      q.sig = n.read(3);
      q.ver = n.read(3);

      if (q.sig !== "GIF") {
        throw new Error("Not a GIF file.");
      }

      q.width = n.readUnsigned();
      q.height = n.readUnsigned();
      var p = e(n.readByte());
      q.gctFlag = p.shift();
      q.colorRes = d(p.splice(0, 3));
      q.sorted = p.shift();
      q.gctSize = d(p.splice(0, 3));
      q.bgColor = n.readByte();
      q.pixelAspectRatio = n.readByte();

      if (q.gctFlag) {
        q.gct = i(1 << q.gctSize + 1);
      }

      m.hdr && m.hdr(q);
    };

    var h = function h(t) {
      var p = function p(x) {
        var v = n.readByte();
        var w = e(n.readByte());
        x.reserved = w.splice(0, 3);
        x.disposalMethod = d(w.splice(0, 3));
        x.userInput = w.shift();
        x.transparencyGiven = w.shift();
        x.delayTime = n.readUnsigned();
        x.transparencyIndex = n.readByte();
        x.terminator = n.readByte();
        m.gce && m.gce(x);
      };

      var u = function u(v) {
        v.comment = l();
        m.com && m.com(v);
      };

      var q = function q(w) {
        var v = n.readByte();
        w.ptHeader = n.readBytes(12);
        w.ptData = l();
        m.pte && m.pte(w);
      };

      var s = function s(x) {
        var y = function y(A) {
          var z = n.readByte();
          A.unknown = n.readByte();
          A.iterations = n.readUnsigned();
          A.terminator = n.readByte();
          m.app && m.app.NETSCAPE && m.app.NETSCAPE(A);
        };

        var v = function v(z) {
          z.appData = l();
          m.app && m.app[z.identifier] && m.app[z.identifier](z);
        };

        var w = n.readByte();
        x.identifier = n.read(8);
        x.authCode = n.read(3);

        switch (x.identifier) {
          case "NETSCAPE":
            y(x);
            break;

          default:
            v(x);
            break;
        }
      };

      var r = function r(v) {
        v.data = l();
        m.unknown && m.unknown(v);
      };

      t.label = n.readByte();

      switch (t.label) {
        case 249:
          t.extType = "gce";
          p(t);
          break;

        case 254:
          t.extType = "com";
          u(t);
          break;

        case 1:
          t.extType = "pte";
          q(t);
          break;

        case 255:
          t.extType = "app";
          s(t);
          break;

        default:
          t.extType = "unknown";
          r(t);
          break;
      }
    };

    var j = function j(q) {
      var r = function r(w, t) {
        var y = new Array(w.length);
        var C = w.length / t;

        var u = function u(F, D) {
          var E = w.slice(D * t, (D + 1) * t);
          y.splice.apply(y, [F * t, t].concat(E));
        };

        var x = [0, 4, 2, 1];
        var z = [8, 8, 4, 2];
        var v = 0;

        for (var A = 0; A < 4; A++) {
          for (var B = x[A]; B < C; B += z[A]) {
            u(B, v);
            v++;
          }
        }

        return y;
      };

      q.leftPos = n.readUnsigned();
      q.topPos = n.readUnsigned();
      q.width = n.readUnsigned();
      q.height = n.readUnsigned();
      var s = e(n.readByte());
      q.lctFlag = s.shift();
      q.interlaced = s.shift();
      q.sorted = s.shift();
      q.reserved = s.splice(0, 2);
      q.lctSize = d(s.splice(0, 3));

      if (q.lctFlag) {
        q.lct = i(1 << q.lctSize + 1);
      }

      q.lzwMinCodeSize = n.readByte();
      var p = l();
      q.pixels = c(q.lzwMinCodeSize, p);

      if (q.interlaced) {
        q.pixels = r(q.pixels, q.width);
      }

      m.img && m.img(q);
    };

    var o = function o() {
      var p = {};
      p.sentinel = n.readByte();

      switch (String.fromCharCode(p.sentinel)) {
        case "!":
          p.type = "ext";
          h(p);
          break;

        case ",":
          p.type = "img";
          j(p);
          break;

        case ";":
          p.type = "eof";
          m.eof && m.eof(p);
          break;

        default:
          throw new Error("Unknown block: 0x" + p.sentinel.toString(16));
      }

      if (p.type !== "eof") {
        setTimeout(o, 0);
      }
    };

    var g = function g() {
      k();
      setTimeout(o, 0);
    };

    g();
  };

  var b = function b(B) {
    var A = {
      vp_l: 0,
      vp_t: 0,
      vp_w: null,
      vp_h: null,
      c_w: null,
      c_h: null
    };

    for (var ab in B) {
      A[ab] = B[ab];
    }

    if (A.vp_w && A.vp_h) {
      A.is_vp = true;
    }

    var ad;
    var l;
    var Y = null;
    var af = false;
    var D = null;
    var K = null;
    var O = null;
    var y = null;
    var E = null;
    var g = null;
    var t = null;
    var ah = true;
    var N = true;
    var m = false;
    var z = [];
    var H = [];
    var Q = A.gif;

    if (typeof A.auto_play == "undefined") {
      A.auto_play = !Q.getAttribute("rel:auto_play") || Q.getAttribute("rel:auto_play") == "1";
    }

    var j = A.hasOwnProperty("on_end") ? A.on_end : null;
    var o = A.hasOwnProperty("loop_delay") ? A.loop_delay : 0;
    var x = A.hasOwnProperty("loop_mode") ? A.loop_mode : "auto";
    var W = A.hasOwnProperty("draw_while_loading") ? A.draw_while_loading : true;
    var P = W ? A.hasOwnProperty("show_progress_bar") ? A.show_progress_bar : true : false;
    var V = A.hasOwnProperty("progressbar_height") ? A.progressbar_height : 25;
    var U = A.hasOwnProperty("progressbar_background_color") ? A.progressbar_background_color : "rgba(255,255,255,0.4)";
    var S = A.hasOwnProperty("progressbar_foreground_color") ? A.progressbar_foreground_color : "rgba(255,0,22,.8)";

    var M = function M() {
      D = null;
      K = null;
      E = O;
      O = null;
      g = null;
    };

    var L = function L() {
      try {
        a(ad, F);
      } catch (i) {
        ae("parse");
      }
    };

    var J = function J(i) {
      s.innerHTML = i;
      s.style.display = "";
    };

    var p = function p(i, ai) {
      n.width = i * r();
      n.height = ai * r();
      s.style.minWidth = i * r() + "px";
      ac.width = i;
      ac.height = ai;
      ac.style.width = i + "px";
      ac.style.height = ai + "px";
      ac.getContext("2d").setTransform(1, 0, 0, 1, 0, 0);
    };

    var R = function R(ai, i) {
      if (!H[ai]) {
        H[ai] = i;
        return;
      }

      if (typeof i.x !== "undefined") {
        H[ai].x = i.x;
      }

      if (typeof i.y !== "undefined") {
        H[ai].y = i.y;
      }
    };

    var I = function I(am, ai, ao) {
      P = false;

      if (ao && P) {
        var ar = V;
        var aj, aq, an, i;

        if (A.is_vp) {
          if (!m) {
            an = A.vp_t + A.vp_h - ar;
            ar = ar;
            aj = A.vp_l;
            aq = aj + am / ai * A.vp_w;
            i = n.width;
          } else {
            an = (A.vp_t + A.vp_h - ar) / r();
            ar = ar / r();
            aj = A.vp_l / r();
            aq = aj + am / ai * (A.vp_w / r());
            i = n.width / r();
          }

          if (false) {
            if (!m) {
              var ak = A.vp_l,
                  at = A.vp_t;
              var ap = A.vp_w,
                  al = A.vp_h;
            } else {
              var ak = A.vp_l / r(),
                  at = A.vp_t / r();
              var ap = A.vp_w / r(),
                  al = A.vp_h / r();
            }

            w.rect(ak, at, ap, al);
            w.stroke();
          }
        } else {
          an = (n.height - ar) / (m ? r() : 1);
          aq = am / ai * n.width / (m ? r() : 1);
          i = n.width / (m ? r() : 1);
          ar /= m ? r() : 1;
        }

        w.fillStyle = U;
        w.fillRect(aq, an, i - aq, ar);
        w.fillStyle = S;
        w.fillRect(0, an, aq, ar);
      }
    };

    var ae = function ae(ai) {
      var i = function i() {
        w.fillStyle = "black";
        w.fillRect(0, 0, A.c_w ? A.c_w : l.width, A.c_h ? A.c_h : l.height);
        w.strokeStyle = "red";
        w.lineWidth = 3;
        w.moveTo(0, 0);
        w.lineTo(A.c_w ? A.c_w : l.width, A.c_h ? A.c_h : l.height);
        w.moveTo(0, A.c_h ? A.c_h : l.height);
        w.lineTo(A.c_w ? A.c_w : l.width, 0);
        w.stroke();
      };

      Y = ai;
      l = {
        width: Q.width,
        height: Q.height
      };
      z = [];
      i();
    };

    var h = function h(i) {
      l = i;
      p(l.width, l.height);
    };

    var v = function v(i) {
      G();
      M();
      D = i.transparencyGiven ? i.transparencyIndex : null;
      K = i.delayTime;
      O = i.disposalMethod;
    };

    var G = function G() {
      if (!g) {
        return;
      }

      z.push({
        data: g.getImageData(0, 0, l.width, l.height),
        delay: 2 * K
      });
      H.push({
        x: 0,
        y: 0
      });
    };

    var k = function k(i) {
      if (!g) {
        g = ac.getContext("2d");
      }

      var ak = z.length;
      var ai = i.lctFlag ? i.lct : l.gct;

      if (ak > 0) {
        if (E === 3) {
          if (y !== null) {
            g.putImageData(z[y].data, 0, 0);
          } else {
            g.clearRect(t.leftPos, t.topPos, t.width, t.height);
          }
        } else {
          y = ak - 1;
        }

        if (E === 2) {
          g.clearRect(t.leftPos, t.topPos, t.width, t.height);
        }
      }

      var aj = g.getImageData(i.leftPos, i.topPos, i.width, i.height);
      i.pixels.forEach(function (al, am) {
        if (al !== D) {
          aj.data[am * 4 + 0] = ai[al][0];
          aj.data[am * 4 + 1] = ai[al][1];
          aj.data[am * 4 + 2] = ai[al][2];
          aj.data[am * 4 + 3] = 255;
        }
      });
      g.putImageData(aj, i.leftPos, i.topPos);

      if (!m) {
        w.scale(r(), r());
        m = true;
      }

      if (W) {
        W = A.auto_play;
      }

      t = i;
    };

    var aa = function () {
      var am = -1;
      var ak = 0;
      var an = false;
      var ap = false;

      var ai = function ai() {
        var i = N ? 1 : -1;
        return (am + i + z.length) % z.length;
      };

      var ar = function ar(i) {
        am = am + i;
        ao();
      };

      var aj = function () {
        var at = false;

        var i = function i() {
          if (j !== null) {
            j(Q);
          }

          ak++;

          if (x !== false || ak < 0) {
            au();
          } else {
            at = false;
            ah = false;
          }
        };

        var au = function au() {
          at = ah;

          if (!at) {
            return;
          }

          ar(1);
          var av = z[am].delay * 10;

          if (!av) {
            av = 100;
          }

          var aw = ai();

          if (aw === 0) {
            av += o;
            setTimeout(i, av);
          } else {
            setTimeout(au, av);
          }
        };

        return function () {
          if (!at) {
            setTimeout(au, 0);
          }
        };
      }();

      var ao = function ao() {
        var i;
        am = parseInt(am, 10);

        if (am > z.length - 1) {
          am = 0;
        }

        if (am < 0) {
          am = 0;
        }

        i = H[am];
        ac.getContext("2d").putImageData(z[am].data, i.x, i.y);
        w.globalCompositeOperation = "copy";
        w.drawImage(ac, 0, 0);
      };

      var al = function al() {
        ah = true;
        aj();
      };

      var aq = function aq() {
        ah = false;
      };

      return {
        init: function init() {
          if (Y) {
            return;
          }

          if (!(A.c_w && A.c_h)) {
            w.scale(r(), r());
          }

          if (A.auto_play) {
            aj();
          } else {
            am = 0;
          }
        },
        step: aj,
        play: al,
        pause: aq,
        playing: ah,
        move_relative: ar,
        current_frame: function current_frame() {
          return am;
        },
        length: function length() {
          return z.length;
        },
        move_to: function move_to(i) {
          am = i;
          ao();
        }
      };
    }();

    var ag = function ag(i) {
      I(ad.pos, ad.data.length, i);
    };

    var C = function C() {};

    var u = function u(ai, i) {
      return function (aj) {
        ai(aj);
        ag(i);
      };
    };

    var F = {
      hdr: u(h),
      gce: u(v),
      com: u(C),
      app: {
        NETSCAPE: u(C)
      },
      img: u(k, true),
      eof: function eof(i) {
        G();
        ag(false);

        if (!(A.c_w && A.c_h)) {
          n.width = l.width * r();
          n.height = l.height * r();
        }

        aa.init();
        af = false;

        if (X) {
          X(Q);
        }
      }
    };

    var Z = function Z() {
      var i = Q.parentNode;
      var ai = document.createElement("div");
      n = document.createElement("canvas");
      w = n.getContext("2d");
      s = document.createElement("div");
      ac = document.createElement("canvas");
      ai.width = n.width = Q.width;
      ai.height = n.height = Q.height;
      s.style.minWidth = Q.width + "px";
      ai.className = "jsgif";
      s.className = "jsgif_toolbar";
      ai.appendChild(n);
      i.insertBefore(ai, Q);
      i.removeChild(Q);

      if (A.c_w && A.c_h) {
        p(A.c_w, A.c_h);
      }

      q = true;
    };

    var r = function r() {
      var i;

      if (A.max_width && l && l.width > A.max_width) {
        i = A.max_width / l.width;
      } else {
        i = 1;
      }

      return i;
    };

    var n, w, s, ac;
    var q = false;
    var X = false;

    var T = function T(i) {
      if (af) {
        return false;
      }

      if (i) {
        X = i;
      } else {
        X = false;
      }

      af = true;
      z = [];
      M();
      y = null;
      E = null;
      g = null;
      t = null;
      return true;
    };

    return {
      play: aa.play,
      pause: aa.pause,
      move_relative: aa.move_relative,
      move_to: aa.move_to,
      get_playing: function get_playing() {
        return ah;
      },
      get_canvas: function get_canvas() {
        return n;
      },
      get_canvas_scale: function get_canvas_scale() {
        return r();
      },
      get_loading: function get_loading() {
        return af;
      },
      get_auto_play: function get_auto_play() {
        return A.auto_play;
      },
      get_length: function get_length() {
        return aa.length();
      },
      get_current_frame: function get_current_frame() {
        return aa.current_frame();
      },
      load_url: function load_url(ai, aj) {
        if (!T(aj)) {
          return;
        }

        var i = new XMLHttpRequest();
        i.open("GET", ai, true);

        if ("overrideMimeType" in i) {
          i.overrideMimeType("text/plain; charset=x-user-defined");
        } else {
          if ("responseType" in i) {
            i.responseType = "arraybuffer";
          } else {
            i.setRequestHeader("Accept-Charset", "x-user-defined");
          }
        }

        i.onloadstart = function () {
          if (!q) {
            Z();
          }
        };

        i.onload = function (al) {
          if (this.status != 200) {
            ae("xhr - response");
          }

          if (!("response" in this)) {
            this.response = new VBArray(this.responseText).toArray().map(String.fromCharCode).join("");
          }

          var ak = this.response;

          if (ak.toString().indexOf("ArrayBuffer") > 0) {
            ak = new Uint8Array(ak);
          }

          ad = new f(ak);
          setTimeout(L, 0);
        };

        i.onprogress = function (ak) {
          if (ak.lengthComputable) {
            I(ak.loaded, ak.total, true);
          }
        };

        i.onerror = function () {
          ae("xhr");
        };

        i.send();
      },
      load: function load(i) {
        this.load_url(Q.getAttribute("rel:animated_src") || Q.src, i);
      },
      load_raw: function load_raw(i, ai) {
        if (!T(ai)) {
          return;
        }

        if (!q) {
          Z();
        }

        ad = new f(i);
        setTimeout(L, 0);
      },
      set_frame_offset: R
    };
  };

  return b;
});