"use strict";

define(["../ThirdParty/when", "./buildModuleUrl", "./defaultValue", "./defined", "./destroyObject", "./DeveloperError", "./Event", "./FeatureDetection", "./getAbsoluteUri", "./isCrossOriginUrl", "./Resource", "./RuntimeError", "require"], function (i, u, s, f, e, n, r, a, t, d, l, c, o) {
  "use strict";

  function w() {
    if (!f(y._canTransferArrayBuffer)) {
      var a = new Worker(k("Workers/transferTypedArrayTest.js"));
      a.postMessage = s(a.webkitPostMessage, a.postMessage);
      var e = new Int8Array([99]);

      try {
        a.postMessage({
          array: e
        }, [e.buffer]);
      } catch (e) {
        return y._canTransferArrayBuffer = !1;
      }

      var o = i.defer();
      a.onmessage = function (e) {
        var r = e.data.array,
            t = f(r) && 99 === r[0];
        o.resolve(t), a.terminate(), y._canTransferArrayBuffer = t;
      }, y._canTransferArrayBuffer = o.promise;
    }

    return y._canTransferArrayBuffer;
  }

  var m,
      p = new r();

  function h(e, r) {
    --e._activeTasks;
    var t,
        a,
        o,
        s = r.id;
    f(s) && (a = (t = e._deferreds)[s], f(r.error) ? ("RuntimeError" === (o = r.error).name ? (o = new c(r.error.message)).stack = r.error.stack : "DeveloperError" === o.name && ((o = new n(r.error.message)).stack = r.error.stack), p.raiseEvent(o), a.reject(o)) : (p.raiseEvent(), a.resolve(r.result)), delete t[s]);
  }

  function k(e) {
    var r = u(e);

    if (d(r)) {
      var t,
          a = 'importScripts("' + r + '");';

      try {
        t = new Blob([a], {
          type: "application/javascript"
        });
      } catch (e) {
        var o = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder)();
        o.append(a), t = o.getBlob("application/javascript");
      }

      r = (window.URL || window.webkitURL).createObjectURL(t);
    }

    return r;
  }

  function v(r) {
    var e = new Worker((f(m) || (m = k("Workers/pgEarthWorkerBootstrapper.js")), m));
    e.postMessage = s(e.webkitPostMessage, e.postMessage);
    var t = {
      loaderConfig: {},
      workerModule: y._workerModulePrefix + r._workerName
    };
    return f(y._loaderConfig) ? t.loaderConfig = y._loaderConfig : (f(define.amd) && !define.amd.toUrlUndefined && f(o.toUrl) || (t.loaderConfig.paths = {
      Workers: u("Workers")
    }), t.loaderConfig.baseUrl = u.getPGEarthBaseUrl().url), e.postMessage(t), e.onmessage = function (e) {
      h(r, e.data);
    }, e;
  }

  function y(e, r) {
    this._workerName = e, this._maximumActiveTasks = s(r, 5), this._activeTasks = 0, this._deferreds = {}, this._nextID = 0;
  }

  var _ = [];
  return y.prototype.scheduleTask = function (a, o) {
    if (f(this._worker) || (this._worker = v(this)), !(this._activeTasks >= this._maximumActiveTasks)) {
      ++this._activeTasks;
      var s = this;
      return i(w(), function (e) {
        f(o) ? e || (o.length = 0) : o = _;
        var r = s._nextID++,
            t = i.defer();
        return s._deferreds[r] = t, s._worker.postMessage({
          id: r,
          parameters: a,
          canTransferArrayBuffer: e
        }, o), t.promise;
      });
    }
  }, y.prototype.initWebAssemblyModule = function (e) {
    f(this._worker) || (this._worker = v(this));
    var o = i.defer(),
        s = this,
        n = this._worker;
    return function (e, r) {
      var t = {
        modulePath: void 0,
        wasmBinaryFile: void 0,
        wasmBinary: void 0
      };
      if (a.supportsWebAssembly()) return t.modulePath = u(r.modulePath), t.wasmBinaryFile = u(r.wasmBinaryFile), l.fetchArrayBuffer({
        url: t.wasmBinaryFile
      }).then(function (e) {
        return t.wasmBinary = e, t;
      });
      if (!f(r.fallbackModulePath)) throw new c("This browser does not support Web Assembly, and no backup module was provided for " + e._workerName);
      return t.modulePath = u(r.fallbackModulePath), i.resolve(t);
    }(this, e).then(function (a) {
      return i(w(), function (e) {
        var r,
            t = a.wasmBinary;
        f(t) && e && (r = [t]), n.onmessage = function (e) {
          n.onmessage = function (e) {
            h(s, e.data);
          }, o.resolve(e.data);
        }, n.postMessage({
          webAssemblyConfig: a
        }, r);
      });
    }), o;
  }, y.prototype.isDestroyed = function () {
    return !1;
  }, y.prototype.destroy = function () {
    return f(this._worker) && this._worker.terminate(), e(this);
  }, y.taskCompletedEvent = p, y._workerModulePrefix = y._defaultWorkerModulePrefix = "Workers/", y._loaderConfig = void 0, y._canTransferArrayBuffer = void 0, y;
});