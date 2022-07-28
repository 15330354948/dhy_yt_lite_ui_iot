"use strict";

define(["../ThirdParty/Uri", "../ThirdParty/when", "./appendForwardSlash", "./Check", "./clone", "./combine", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./getAbsoluteUri", "./getBaseUri", "./getExtensionFromUri", "./isBlobUri", "./isCrossOriginUrl", "./isDataUri", "./loadAndExecuteScript", "./objectToQuery", "./queryToObject", "./Request", "./RequestErrorEvent", "./RequestScheduler", "./RequestState", "./RuntimeError", "./TrustedServers"], function (u, c, e, r, a, l, T, q, t, _, n, o, i, s, p, f, h, d, m, y, v, b, g, w, I, B) {
  "use strict";

  var A,
      U = function () {
    try {
      var e = new XMLHttpRequest();
      return e.open("GET", "#", !0), (e.responseType = "blob") === e.responseType;
    } catch (e) {
      return !1;
    }
  }();

  function O(e, t, r, n) {
    var o,
        i,
        s = e.query;
    if (!q(s) || 0 === s.length) return 1;
    o = -1 === s.indexOf("=") ? ((i = {})[s] = void 0, i) : y(s), t._queryParameters = r ? P(o, t._queryParameters, n) : o, e.query = void 0;
  }

  function E(e, t) {
    return q(e) ? q(e.clone) ? e.clone() : a(e) : t;
  }

  function S(e) {
    if (e.state === w.ISSUED || e.state === w.ACTIVE) throw new I("The Resource is already being fetched.");
    e.state = w.UNISSUED, e.deferred = void 0;
  }

  function P(e, t, r) {
    if (!r) return l(e, t);
    var n,
        o,
        i = a(e, !0);

    for (var s in t) {
      t.hasOwnProperty(s) && (n = i[s], o = t[s], q(n) ? (Array.isArray(n) || (n = i[s] = [n]), i[s] = n.concat(o)) : i[s] = Array.isArray(o) ? o.slice() : o);
    }

    return i;
  }

  function R(e) {
    "string" == typeof (e = T(e, T.EMPTY_OBJECT)) && (e = {
      url: e
    }), r.typeOf.string("options.url", e.url), this._url = void 0, this._templateValues = E(e.templateValues, {}), this._queryParameters = E(e.queryParameters, {}), this.headers = E(e.headers, {}), this.request = T(e.request, new v()), this.proxy = e.proxy, this.retryCallback = e.retryCallback, this.retryAttempts = T(e.retryAttempts, 0), this._retryCount = 0;
    var t = new u(e.url);
    O(t, this, !0, !0), t.fragment = void 0, this._url = t.toString();
  }

  function C(e) {
    var n = e.resource,
        o = e.flipY,
        i = e.preferImageBitmap,
        r = n.request;
    r.url = n.url, r.requestFunction = function () {
      var e = n.url,
          t = !1;
      n.isDataUri || n.isBlobUri || (t = n.isCrossOriginUrl);
      var r = c.defer();
      return R._Implementations.createImage(e, t, r, o, i), r.promise;
    };
    var t = g.request(r);
    if (q(t)) return t.otherwise(function (t) {
      return r.state !== w.FAILED ? c.reject(t) : n.retryOnError(t).then(function (e) {
        return e ? (r.state = w.UNISSUED, r.deferred = void 0, C({
          resource: n,
          flipY: o,
          preferImageBitmap: i
        })) : c.reject(t);
      });
    });
  }

  R.createIfNeeded = function (e) {
    return e instanceof R ? e.getDerivedResource({
      request: e.request
    }) : "string" != typeof e ? e : new R({
      url: e
    });
  }, R.supportsImageBitmapOptions = function () {
    if (q(A)) return A;
    if ("function" != typeof createImageBitmap) return A = c.resolve(!1);
    return A = R.fetchBlob({
      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP4////fwAJ+wP9CNHoHgAAAABJRU5ErkJggg=="
    }).then(function (e) {
      return createImageBitmap(e, {
        imageOrientation: "flipY",
        premultiplyAlpha: "none"
      });
    }).then(function (e) {
      return !0;
    }).otherwise(function () {
      return !1;
    });
  }, t(R, {
    isBlobSupported: {
      get: function get() {
        return U;
      }
    }
  }), t(R.prototype, {
    queryParameters: {
      get: function get() {
        return this._queryParameters;
      }
    },
    templateValues: {
      get: function get() {
        return this._templateValues;
      }
    },
    url: {
      get: function get() {
        return this.getUrlComponent(!0, !0);
      },
      set: function set(e) {
        var t = new u(e);
        O(t, this, !1), t.fragment = void 0, this._url = t.toString();
      }
    },
    extension: {
      get: function get() {
        return s(this._url);
      }
    },
    isDataUri: {
      get: function get() {
        return h(this._url);
      }
    },
    isBlobUri: {
      get: function get() {
        return p(this._url);
      }
    },
    isCrossOriginUrl: {
      get: function get() {
        return f(this._url);
      }
    },
    hasHeaders: {
      get: function get() {
        return 0 < Object.keys(this.headers).length;
      }
    }
  }), R.prototype.getUrlComponent = function (e, t) {
    if (this.isDataUri) return this._url;
    var r,
        n,
        o,
        i = new u(this._url);
    e && (r = i, n = this._queryParameters, 1 !== (o = Object.keys(n)).length || q(n[o[0]]) ? r.query = m(n) : r.query = o[0]);
    var s = i.toString().replace(/%7B/g, "{").replace(/%7D/g, "}"),
        a = this._templateValues,
        s = s.replace(/{(.*?)}/g, function (e, t) {
      var r = a[t];
      return q(r) ? encodeURIComponent(r) : e;
    });
    return t && q(this.proxy) && (s = this.proxy.getURL(s)), s;
  }, R.prototype.setQueryParameters = function (e, t) {
    this._queryParameters = t ? P(this._queryParameters, e, !1) : P(e, this._queryParameters, !1);
  }, R.prototype.appendQueryParameters = function (e) {
    this._queryParameters = P(e, this._queryParameters, !0);
  }, R.prototype.setTemplateValues = function (e, t) {
    this._templateValues = t ? l(this._templateValues, e) : l(e, this._templateValues);
  }, R.prototype.getDerivedResource = function (e) {
    var t,
        r = this.clone();
    return r._retryCount = 0, q(e.url) && (O(t = new u(e.url), r, !0, T(e.preserveQueryParameters, !1)), t.fragment = void 0, r._url = t.resolve(new u(o(this._url))).toString()), q(e.queryParameters) && (r._queryParameters = l(e.queryParameters, r._queryParameters)), q(e.templateValues) && (r._templateValues = l(e.templateValues, r.templateValues)), q(e.headers) && (r.headers = l(e.headers, r.headers)), q(e.proxy) && (r.proxy = e.proxy), q(e.request) && (r.request = e.request), q(e.retryCallback) && (r.retryCallback = e.retryCallback), q(e.retryAttempts) && (r.retryAttempts = e.retryAttempts), r;
  }, R.prototype.retryOnError = function (e) {
    var t = this.retryCallback;
    if ("function" != typeof t || this._retryCount >= this.retryAttempts) return c(!1);
    var r = this;
    return c(t(this, e)).then(function (e) {
      return ++r._retryCount, e;
    });
  }, R.prototype.clone = function (e) {
    return q(e) || (e = new R({
      url: this._url
    })), e._url = this._url, e._queryParameters = a(this._queryParameters), e._templateValues = a(this._templateValues), e.headers = a(this.headers), e.proxy = this.proxy, e.retryCallback = this.retryCallback, e.retryAttempts = this.retryAttempts, e._retryCount = 0, e.request = this.request.clone(), e;
  }, R.prototype.getBaseUri = function (e) {
    return i(this.getUrlComponent(e), e);
  }, R.prototype.appendForwardSlash = function () {
    this._url = e(this._url);
  }, R.prototype.fetchArrayBuffer = function () {
    return this.fetch({
      responseType: "arraybuffer"
    });
  }, R.fetchArrayBuffer = function (e) {
    return new R(e).fetchArrayBuffer();
  }, R.prototype.fetchBlob = function () {
    return this.fetch({
      responseType: "blob"
    });
  }, R.fetchBlob = function (e) {
    return new R(e).fetchBlob();
  }, R.prototype.fetchImage = function (e) {
    e = T(e, T.EMPTY_OBJECT);
    var t = T(e.preferImageBitmap, !1),
        r = T(e.preferBlob, !1),
        n = T(e.flipY, !1);
    if (S(this.request), !U || this.isDataUri || this.isBlobUri || !this.hasHeaders && !r) return C({
      resource: this,
      flipY: n,
      preferImageBitmap: t
    });
    var o,
        i,
        s,
        a = this.fetchBlob();
    return q(a) ? R.supportsImageBitmapOptions().then(function (e) {
      return o = e && t, a;
    }).then(function (e) {
      if (q(e)) {
        if (s = e, o) return R.createImageBitmapFromBlob(e, {
          flipY: n,
          premultiplyAlpha: !1
        });
        var t = window.URL.createObjectURL(e);
        return C({
          resource: i = new R({
            url: t
          }),
          flipY: n,
          preferImageBitmap: !1
        });
      }
    }).then(function (e) {
      if (q(e)) return e.blob = s, o || window.URL.revokeObjectURL(i.url), e;
    }).otherwise(function (e) {
      return q(i) && window.URL.revokeObjectURL(i.url), e.blob = s, c.reject(e);
    }) : void 0;
  }, R.fetchImage = function (e) {
    return new R(e).fetchImage({
      flipY: e.flipY,
      preferBlob: e.preferBlob,
      preferImageBitmap: e.preferImageBitmap
    });
  }, R.prototype.fetchText = function () {
    return this.fetch({
      responseType: "text"
    });
  }, R.fetchText = function (e) {
    return new R(e).fetchText();
  }, R.prototype.fetchJson = function () {
    var e = this.fetch({
      responseType: "text",
      headers: {
        Accept: "application/json,*/*;q=0.01"
      }
    });
    if (q(e)) return e.then(function (e) {
      if (q(e)) return JSON.parse(e);
    });
  }, R.fetchJson = function (e) {
    return new R(e).fetchJson();
  }, R.prototype.fetchXML = function () {
    return this.fetch({
      responseType: "document",
      overrideMimeType: "text/xml"
    });
  }, R.fetchXML = function (e) {
    return new R(e).fetchXML();
  }, R.prototype.fetchJsonp = function (e) {
    var t;

    for (e = T(e, "callback"), S(this.request); t = "loadJsonp" + Math.random().toString().substring(2, 8), q(window[t]);) {
      ;
    }

    return function r(n, o, i) {
      var e = {};
      e[o] = i;
      n.setQueryParameters(e);
      var s = n.request;
      s.url = n.url;

      s.requestFunction = function () {
        var t = c.defer();
        return window[i] = function (e) {
          t.resolve(e);

          try {
            delete window[i];
          } catch (e) {
            window[i] = void 0;
          }
        }, R._Implementations.loadAndExecuteScript(n.url, i, t), t.promise;
      };

      var t = g.request(s);
      if (!q(t)) return;
      return t.otherwise(function (t) {
        return s.state !== w.FAILED ? c.reject(t) : n.retryOnError(t).then(function (e) {
          return e ? (s.state = w.UNISSUED, s.deferred = void 0, r(n, o, i)) : c.reject(t);
        });
      });
    }(this, e, t);
  }, R.fetchJsonp = function (e) {
    return new R(e).fetchJsonp(e.callbackParameterName);
  }, R.prototype._makeRequest = function (a) {
    var u = this;
    S(u.request);
    var p = u.request;
    p.url = u.url, p.requestFunction = function () {
      var e = a.responseType,
          t = l(a.headers, u.headers),
          r = a.overrideMimeType,
          n = a.method,
          o = a.data,
          i = c.defer(),
          s = R._Implementations.loadWithXhr(u.url, e, n, o, t, i, r);

      return q(s) && q(s.abort) && (p.cancelFunction = function () {
        s.abort();
      }), i.promise;
    };
    var e = g.request(p);
    if (q(e)) return e.then(function (e) {
      return e;
    }).otherwise(function (t) {
      return p.state !== w.FAILED ? c.reject(t) : u.retryOnError(t).then(function (e) {
        return e ? (p.state = w.UNISSUED, p.deferred = void 0, u.fetch(a)) : c.reject(t);
      });
    });
  };
  var j = /^data:(.*?)(;base64)?,(.*)$/;

  function M(e, t) {
    var r = decodeURIComponent(t);
    return e ? atob(r) : r;
  }

  function x(e, t) {
    for (var r = M(e, t), n = new ArrayBuffer(r.length), o = new Uint8Array(n), i = 0; i < r.length; i++) {
      o[i] = r.charCodeAt(i);
    }

    return n;
  }

  function D(e, t) {
    switch (t) {
      case "text":
        return e.toString("utf8");

      case "json":
        return JSON.parse(e.toString("utf8"));

      default:
        return new Uint8Array(e).buffer;
    }
  }

  R.prototype.fetch = function (e) {
    return (e = E(e, {})).method = "GET", this._makeRequest(e);
  }, R.fetch = function (e) {
    return new R(e).fetch({
      responseType: e.responseType,
      overrideMimeType: e.overrideMimeType
    });
  }, R.prototype["delete"] = function (e) {
    return (e = E(e, {})).method = "DELETE", this._makeRequest(e);
  }, R["delete"] = function (e) {
    return new R(e)["delete"]({
      responseType: e.responseType,
      overrideMimeType: e.overrideMimeType,
      data: e.data
    });
  }, R.prototype.head = function (e) {
    return (e = E(e, {})).method = "HEAD", this._makeRequest(e);
  }, R.head = function (e) {
    return new R(e).head({
      responseType: e.responseType,
      overrideMimeType: e.overrideMimeType
    });
  }, R.prototype.options = function (e) {
    return (e = E(e, {})).method = "OPTIONS", this._makeRequest(e);
  }, R.options = function (e) {
    return new R(e).options({
      responseType: e.responseType,
      overrideMimeType: e.overrideMimeType
    });
  }, R.prototype.post = function (e, t) {
    return r.defined("data", e), (t = E(t, {})).method = "POST", t.data = e, this._makeRequest(t);
  }, R.post = function (e) {
    return new R(e).post(e.data, {
      responseType: e.responseType,
      overrideMimeType: e.overrideMimeType
    });
  }, R.prototype.put = function (e, t) {
    return r.defined("data", e), (t = E(t, {})).method = "PUT", t.data = e, this._makeRequest(t);
  }, R.put = function (e) {
    return new R(e).put(e.data, {
      responseType: e.responseType,
      overrideMimeType: e.overrideMimeType
    });
  }, R.prototype.patch = function (e, t) {
    return r.defined("data", e), (t = E(t, {})).method = "PATCH", t.data = e, this._makeRequest(t);
  }, R.patch = function (e) {
    return new R(e).patch(e.data, {
      responseType: e.responseType,
      overrideMimeType: e.overrideMimeType
    });
  }, (R._Implementations = {}).createImage = function (i, s, a, t, u) {
    R.supportsImageBitmapOptions().then(function (e) {
      return e && u ? R.fetchBlob({
        url: i
      }) : (t = i, r = s, n = a, (o = new Image()).onload = function () {
        n.resolve(o);
      }, o.onerror = function (e) {
        n.reject(e);
      }, r && (B.contains(t) ? o.crossOrigin = "use-credentials" : o.crossOrigin = ""), void (o.src = t));
      var t, r, n, o;
    }).then(function (e) {
      if (q(e)) return R.createImageBitmapFromBlob(e, {
        flipY: t,
        premultiplyAlpha: !1
      });
    }).then(function (e) {
      q(e) && a.resolve(e);
    }).otherwise(a.reject);
  }, R.createImageBitmapFromBlob = function (e, t) {
    return r.defined("options", t), r.typeOf.bool("options.flipY", t.flipY), r.typeOf.bool("options.premultiplyAlpha", t.premultiplyAlpha), createImageBitmap(e, {
      imageOrientation: t.flipY ? "flipY" : "none",
      premultiplyAlpha: t.premultiplyAlpha ? "premultiply" : "none"
    });
  };
  var k = "undefined" == typeof XMLHttpRequest;
  return R._Implementations.loadWithXhr = function (e, o, i, t, r, s, n) {
    var a = j.exec(e);

    if (null === a) {
      if (k) return u = e, p = o, c = i, l = r, f = s, h = global.require, d = h("url").parse(u), m = "https:" === d.protocol ? h("https") : h("http"), y = h("zlib"), v = {
        protocol: d.protocol,
        hostname: d.hostname,
        port: d.port,
        path: d.path,
        query: d.query,
        method: c,
        headers: l
      }, void m.request(v).on("response", function (t) {
        var r;
        t.statusCode < 200 || 300 <= t.statusCode ? f.reject(new b(t.statusCode, t, t.headers)) : (r = [], t.on("data", function (e) {
          r.push(e);
        }), t.on("end", function () {
          var e = Buffer.concat(r);
          "gzip" === t.headers["content-encoding"] ? y.gunzip(e, function (e, t) {
            e ? f.reject(new I("Error decompressing response.")) : f.resolve(D(t, p));
          }) : f.resolve(D(e, p));
        }));
      }).on("error", function (e) {
        f.reject(new b());
      }).end();
      var u,
          p,
          c,
          l,
          f,
          h,
          d,
          m,
          y,
          v,
          g = new XMLHttpRequest();
      if (B.contains(e) && (g.withCredentials = !0), g.open(i, e, !0), q(n) && q(g.overrideMimeType) && g.overrideMimeType(n), q(r)) for (var w in r) {
        r.hasOwnProperty(w) && g.setRequestHeader(w, r[w]);
      }
      q(o) && (g.responseType = o);
      var A = !1;
      return "string" == typeof e && (A = 0 === e.indexOf("file://") || "undefined" != typeof window && "file://" === window.location.origin), g.onload = function () {
        if (!(g.status < 200 || 300 <= g.status) || A && 0 === g.status) {
          var e = g.response,
              t = g.responseType;

          if ("HEAD" === i || "OPTIONS" === i) {
            var r = g.getAllResponseHeaders().trim().split(/[\r\n]+/),
                n = {};
            return r.forEach(function (e) {
              var t = e.split(": "),
                  r = t.shift();
              n[r] = t.join(": ");
            }), void s.resolve(n);
          }

          if (q(e) && "string" == typeof e) try {
            if (-1 === JSON.parse(e).code) return void s.reject(new b(g.status, g.response, g.getAllResponseHeaders()));
          } catch (e) {
            s.reject(e);
          }
          if (204 === g.status) s.resolve();else if (!q(e) || q(o) && t !== o) {
            if ("json" === o && "string" == typeof e) try {
              s.resolve(JSON.parse(e));
            } catch (e) {
              s.reject(e);
            } else ("" === t || "document" === t) && q(g.responseXML) && g.responseXML.hasChildNodes() ? s.resolve(g.responseXML) : "" !== t && "text" !== t || !q(g.responseText) ? s.reject(new I("Invalid XMLHttpRequest response type.")) : s.resolve(g.responseText);
          } else s.resolve(e);
        } else s.reject(new b(g.status, g.response, g.getAllResponseHeaders()));
      }, g.onerror = function (e) {
        s.reject(new b());
      }, g.send(t), g;
    }

    s.resolve(function (e, t) {
      t = T(t, "");
      var r = e[1],
          n = !!e[2],
          o = e[3];

      switch (t) {
        case "":
        case "text":
          return M(n, o);

        case "arraybuffer":
          return x(n, o);

        case "blob":
          var i = x(n, o);
          return new Blob([i], {
            type: r
          });

        case "document":
          return new DOMParser().parseFromString(M(n, o), r);

        case "json":
          return JSON.parse(M(n, o));

        default:
          throw new _("Unhandled responseType: " + t);
      }
    }(a, o));
  }, R._Implementations.loadAndExecuteScript = function (e, t, r) {
    return d(e, t).otherwise(r.reject);
  }, (R._DefaultImplementations = {}).createImage = R._Implementations.createImage, R._DefaultImplementations.loadWithXhr = R._Implementations.loadWithXhr, R._DefaultImplementations.loadAndExecuteScript = R._Implementations.loadAndExecuteScript, R.DEFAULT = n(new R({
    url: "undefined" == typeof document ? "" : document.location.href.split("?")[0]
  })), R;
});