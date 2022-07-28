"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

define([], function () {
  var Module,
      Module = Module || (void 0 !== Module ? Module : null) || {},
      moduleOverrides = {};

  for (var key in Module) {
    Module.hasOwnProperty(key) && (moduleOverrides[key] = Module[key]);
  }

  var ENVIRONMENT_IS_WEB = !1,
      ENVIRONMENT_IS_WORKER = !1,
      ENVIRONMENT_IS_NODE = !1,
      ENVIRONMENT_IS_SHELL = !1,
      nodeFS,
      nodePath,
      TRY_USE_DUMP;
  if (Module.ENVIRONMENT) {
    if ("WEB" === Module.ENVIRONMENT) ENVIRONMENT_IS_WEB = !0;else if ("WORKER" === Module.ENVIRONMENT) ENVIRONMENT_IS_WORKER = !0;else if ("NODE" === Module.ENVIRONMENT) ENVIRONMENT_IS_NODE = !0;else {
      if ("SHELL" !== Module.ENVIRONMENT) throw new Error("The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.");
      ENVIRONMENT_IS_SHELL = !0;
    }
  } else ENVIRONMENT_IS_WEB = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)), ENVIRONMENT_IS_WORKER = "function" == typeof importScripts, ENVIRONMENT_IS_NODE = "object" == (typeof process === "undefined" ? "undefined" : _typeof(process)) && "function" == typeof require && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER, ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
  if (ENVIRONMENT_IS_NODE) Module.print || (Module.print = console.log), Module.printErr || (Module.printErr = console.warn), Module.read = function (e, r) {
    nodeFS = nodeFS || require("fs"), e = (nodePath = nodePath || require("path")).normalize(e);
    var i = nodeFS.readFileSync(e);
    return r ? i : i.toString();
  }, Module.readBinary = function (e) {
    var r = Module.read(e, !0);
    return r.buffer || (r = new Uint8Array(r)), assert(r.buffer), r;
  }, Module.load = function (e) {
    globalEval(read(e));
  }, Module.thisProgram || (1 < process.argv.length ? Module.thisProgram = process.argv[1].replace(/\\/g, "/") : Module.thisProgram = "unknown-program"), Module.arguments = process.argv.slice(2), "undefined" != typeof module && (module.exports = Module), process.on("uncaughtException", function (e) {
    if (!(e instanceof ExitStatus)) throw e;
  }), Module.inspect = function () {
    return "[Emscripten Module object]";
  };else if (ENVIRONMENT_IS_SHELL) Module.print || (Module.print = print), "undefined" != typeof printErr && (Module.printErr = printErr), "undefined" != typeof read ? Module.read = read : Module.read = function () {
    throw "no read() available";
  }, Module.readBinary = function (e) {
    if ("function" == typeof readbuffer) return new Uint8Array(readbuffer(e));
    var r = read(e, "binary");
    return assert("object" == _typeof(r)), r;
  }, "undefined" != typeof scriptArgs ? Module.arguments = scriptArgs : void 0 !== arguments && (Module.arguments = arguments), "function" == typeof quit && (Module.quit = function (e, r) {
    quit(e);
  });else {
    if (!ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER) throw "Unknown runtime environment. Where are we?";
    Module.read = function (e) {
      var r = new XMLHttpRequest();
      return r.open("GET", e, !1), r.send(null), r.responseText;
    }, ENVIRONMENT_IS_WORKER && (Module.readBinary = function (e) {
      var r = new XMLHttpRequest();
      return r.open("GET", e, !1), r.responseType = "arraybuffer", r.send(null), new Uint8Array(r.response);
    }), Module.readAsync = function (e, r, i) {
      var n = new XMLHttpRequest();
      n.open("GET", e, !0), n.responseType = "arraybuffer", n.onload = function () {
        200 == n.status || 0 == n.status && n.response ? r(n.response) : i();
      }, n.onerror = i, n.send(null);
    }, void 0 !== arguments && (Module.arguments = arguments), "undefined" != typeof console ? (Module.print || (Module.print = function (e) {
      console.log(e);
    }), Module.printErr || (Module.printErr = function (e) {
      console.warn(e);
    })) : (TRY_USE_DUMP = !1, Module.print || (Module.print = TRY_USE_DUMP && "undefined" != typeof dump ? function (e) {
      dump(e);
    } : function (e) {})), ENVIRONMENT_IS_WORKER && (Module.load = importScripts), void 0 === Module.setWindowTitle && (Module.setWindowTitle = function (e) {
      document.title = e;
    });
  }

  function globalEval(e) {
    eval.call(null, e);
  }

  for (var key in !Module.load && Module.read && (Module.load = function (e) {
    globalEval(Module.read(e));
  }), Module.print || (Module.print = function () {}), Module.printErr || (Module.printErr = Module.print), Module.arguments || (Module.arguments = []), Module.thisProgram || (Module.thisProgram = "./this.program"), Module.quit || (Module.quit = function (e, r) {
    throw r;
  }), Module.print = Module.print, Module.printErr = Module.printErr, Module.preRun = [], Module.postRun = [], moduleOverrides) {
    moduleOverrides.hasOwnProperty(key) && (Module[key] = moduleOverrides[key]);
  }

  moduleOverrides = void 0;
  var Runtime = {
    setTempRet0: function setTempRet0(e) {
      return tempRet0 = e;
    },
    getTempRet0: function getTempRet0() {
      return tempRet0;
    },
    stackSave: function stackSave() {
      return STACKTOP;
    },
    stackRestore: function stackRestore(e) {
      STACKTOP = e;
    },
    getNativeTypeSize: function getNativeTypeSize(e) {
      switch (e) {
        case "i1":
        case "i8":
          return 1;

        case "i16":
          return 2;

        case "i32":
          return 4;

        case "i64":
          return 8;

        case "float":
          return 4;

        case "double":
          return 8;

        default:
          if ("*" === e[e.length - 1]) return Runtime.QUANTUM_SIZE;
          if ("i" !== e[0]) return 0;
          var r = parseInt(e.substr(1));
          return assert(r % 8 == 0), r / 8;
      }
    },
    getNativeFieldSize: function getNativeFieldSize(e) {
      return Math.max(Runtime.getNativeTypeSize(e), Runtime.QUANTUM_SIZE);
    },
    STACK_ALIGN: 16,
    prepVararg: function prepVararg(e, r) {
      return "double" === r || "i64" === r ? 7 & e && (assert(4 == (7 & e)), e += 4) : assert(0 == (3 & e)), e;
    },
    getAlignSize: function getAlignSize(e, r, i) {
      return i || "i64" != e && "double" != e ? e ? Math.min(r || (e ? Runtime.getNativeFieldSize(e) : 0), Runtime.QUANTUM_SIZE) : Math.min(r, 8) : 8;
    },
    dynCall: function dynCall(e, r, i) {
      return i && i.length ? Module["dynCall_" + e].apply(null, [r].concat(i)) : Module["dynCall_" + e].call(null, r);
    },
    functionPointers: [],
    addFunction: function addFunction(e) {
      for (var r = 0; r < Runtime.functionPointers.length; r++) {
        if (!Runtime.functionPointers[r]) return Runtime.functionPointers[r] = e, 2 * (1 + r);
      }

      throw "Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.";
    },
    removeFunction: function removeFunction(e) {
      Runtime.functionPointers[(e - 2) / 2] = null;
    },
    warnOnce: function warnOnce(e) {
      Runtime.warnOnce.shown || (Runtime.warnOnce.shown = {}), Runtime.warnOnce.shown[e] || (Runtime.warnOnce.shown[e] = 1, Module.printErr(e));
    },
    funcWrappers: {},
    getFuncWrapper: function getFuncWrapper(r, i) {
      assert(i), Runtime.funcWrappers[i] || (Runtime.funcWrappers[i] = {});
      var e = Runtime.funcWrappers[i];
      return e[r] || (1 === i.length ? e[r] = function () {
        return Runtime.dynCall(i, r);
      } : 2 === i.length ? e[r] = function (e) {
        return Runtime.dynCall(i, r, [e]);
      } : e[r] = function () {
        return Runtime.dynCall(i, r, Array.prototype.slice.call(arguments));
      }), e[r];
    },
    getCompilerSetting: function getCompilerSetting(e) {
      throw "You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work";
    },
    stackAlloc: function stackAlloc(e) {
      var r = STACKTOP;
      return STACKTOP = (STACKTOP = STACKTOP + e | 0) + 15 & -16, r;
    },
    staticAlloc: function staticAlloc(e) {
      var r = STATICTOP;
      return STATICTOP = (STATICTOP = STATICTOP + e | 0) + 15 & -16, r;
    },
    dynamicAlloc: function dynamicAlloc(e) {
      var r = HEAP32[DYNAMICTOP_PTR >> 2],
          i = -16 & (r + e + 15 | 0);
      if ((HEAP32[DYNAMICTOP_PTR >> 2] = i, TOTAL_MEMORY <= i) && !enlargeMemory()) return HEAP32[DYNAMICTOP_PTR >> 2] = r, 0;
      return r;
    },
    alignMemory: function alignMemory(e, r) {
      return e = Math.ceil(e / (r || 16)) * (r || 16);
    },
    makeBigInt: function makeBigInt(e, r, i) {
      return i ? +(e >>> 0) + 4294967296 * (r >>> 0) : +(e >>> 0) + 4294967296 * (0 | r);
    },
    GLOBAL_BASE: 8,
    QUANTUM_SIZE: 4,
    __dummy__: 0
  };
  Module.Runtime = Runtime;
  var ABORT = 0,
      EXITSTATUS = 0,
      cwrap,
      ccall;

  function assert(e, r) {
    e || abort("Assertion failed: " + r);
  }

  function getCFunc(ident) {
    var func = Module["_" + ident];
    if (!func) try {
      func = eval("_" + ident);
    } catch (e) {}
    return assert(func, "Cannot call unknown function " + ident + " (perhaps LLVM optimizations or closure removed it?)"), func;
  }

  function setValue(e, r, i, n) {
    switch ("*" === (i = i || "i8").charAt(i.length - 1) && (i = "i32"), i) {
      case "i1":
      case "i8":
        HEAP8[e >> 0] = r;
        break;

      case "i16":
        HEAP16[e >> 1] = r;
        break;

      case "i32":
        HEAP32[e >> 2] = r;
        break;

      case "i64":
        tempI64 = [r >>> 0, (tempDouble = r, 1 <= +Math_abs(tempDouble) ? 0 < tempDouble ? (0 | Math_min(+Math_floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math_ceil((tempDouble - (~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[e >> 2] = tempI64[0], HEAP32[e + 4 >> 2] = tempI64[1];
        break;

      case "float":
        HEAPF32[e >> 2] = r;
        break;

      case "double":
        HEAPF64[e >> 3] = r;
        break;

      default:
        abort("invalid type for setValue: " + i);
    }
  }

  function getValue(e, r, i) {
    switch ("*" === (r = r || "i8").charAt(r.length - 1) && (r = "i32"), r) {
      case "i1":
      case "i8":
        return HEAP8[e >> 0];

      case "i16":
        return HEAP16[e >> 1];

      case "i32":
      case "i64":
        return HEAP32[e >> 2];

      case "float":
        return HEAPF32[e >> 2];

      case "double":
        return HEAPF64[e >> 3];

      default:
        abort("invalid type for setValue: " + r);
    }

    return null;
  }

  !function () {
    var JSfuncs = {
      stackSave: function stackSave() {
        Runtime.stackSave();
      },
      stackRestore: function stackRestore() {
        Runtime.stackRestore();
      },
      arrayToC: function arrayToC(e) {
        var r = Runtime.stackAlloc(e.length);
        return writeArrayToMemory(e, r), r;
      },
      stringToC: function stringToC(e) {
        var r,
            i = 0;
        return null != e && 0 !== e && (r = 1 + (e.length << 2), stringToUTF8(e, i = Runtime.stackAlloc(r), r)), i;
      }
    },
        toC = {
      string: JSfuncs.stringToC,
      array: JSfuncs.arrayToC
    };

    ccall = function ccall(e, r, i, n, t) {
      var a = getCFunc(e),
          o = [],
          u = 0;
      if (n) for (var f = 0; f < n.length; f++) {
        var l = toC[i[f]];
        l ? (0 === u && (u = Runtime.stackSave()), o[f] = l(n[f])) : o[f] = n[f];
      }
      var c = a.apply(null, o);

      if ("string" === r && (c = Pointer_stringify(c)), 0 !== u) {
        if (t && t.async) return void EmterpreterAsync.asyncFinalizers.push(function () {
          Runtime.stackRestore(u);
        });
        Runtime.stackRestore(u);
      }

      return c;
    };

    var sourceRegex = /^function\s*[a-zA-Z$_0-9]*\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;

    function parseJSFunc(e) {
      var r = e.toString().match(sourceRegex).slice(1);
      return {
        arguments: r[0],
        body: r[1],
        returnValue: r[2]
      };
    }

    var JSsource = null;

    function ensureJSsource() {
      if (!JSsource) for (var e in JSsource = {}, JSfuncs) {
        JSfuncs.hasOwnProperty(e) && (JSsource[e] = parseJSFunc(JSfuncs[e]));
      }
    }

    cwrap = function cwrap(ident, returnType, argTypes) {
      argTypes = argTypes || [];
      var cfunc = getCFunc(ident),
          numericArgs = argTypes.every(function (e) {
        return "number" === e;
      }),
          numericRet = "string" !== returnType;
      if (numericRet && numericArgs) return cfunc;
      var argNames = argTypes.map(function (e, r) {
        return "$" + r;
      }),
          funcstr = "(function(" + argNames.join(",") + ") {",
          nargs = argTypes.length;

      if (!numericArgs) {
        ensureJSsource(), funcstr += "var stack = " + JSsource.stackSave.body + ";";

        for (var i = 0; i < nargs; i++) {
          var arg = argNames[i],
              type = argTypes[i],
              convertCode;
          "number" !== type && (convertCode = JSsource[type + "ToC"], funcstr += "var " + convertCode.arguments + " = " + arg + ";", funcstr += convertCode.body + ";", funcstr += arg + "=(" + convertCode.returnValue + ");");
        }
      }

      var cfuncname = parseJSFunc(function () {
        return cfunc;
      }).returnValue,
          strgfy;
      return funcstr += "var ret = " + cfuncname + "(" + argNames.join(",") + ");", numericRet || (strgfy = parseJSFunc(function () {
        return Pointer_stringify;
      }).returnValue, funcstr += "ret = " + strgfy + "(ret);"), numericArgs || (ensureJSsource(), funcstr += JSsource.stackRestore.body.replace("()", "(stack)") + ";"), funcstr += "return ret})", eval(funcstr);
    };
  }(), Module.ccall = ccall, Module.cwrap = cwrap, Module.setValue = setValue, Module.getValue = getValue;
  var ALLOC_NORMAL = 0,
      ALLOC_STACK = 1,
      ALLOC_STATIC = 2,
      ALLOC_DYNAMIC = 3,
      ALLOC_NONE = 4;

  function allocate(e, r, i, n) {
    var t,
        a = "number" == typeof e ? (t = !0, e) : (t = !1, e.length),
        o = "string" == typeof r ? r : null,
        u = i == ALLOC_NONE ? n : ["function" == typeof _malloc ? _malloc : Runtime.staticAlloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][void 0 === i ? ALLOC_STATIC : i](Math.max(a, o ? 1 : r.length));

    if (t) {
      var f,
          n = u;

      for (assert(0 == (3 & u)), f = u + (-4 & a); n < f; n += 4) {
        HEAP32[n >> 2] = 0;
      }

      for (f = u + a; n < f;) {
        HEAP8[n++ >> 0] = 0;
      }

      return u;
    }

    if ("i8" === o) return e.subarray || e.slice ? HEAPU8.set(e, u) : HEAPU8.set(new Uint8Array(e), u), u;

    for (var l, c, s, _ = 0; _ < a;) {
      var d = e[_];
      "function" == typeof d && (d = Runtime.getFunctionIndex(d)), 0 !== (l = o || r[_]) ? ("i64" == l && (l = "i32"), setValue(u + _, d, l), s !== l && (c = Runtime.getNativeTypeSize(l), s = l), _ += c) : _++;
    }

    return u;
  }

  function getMemory(e) {
    return staticSealed ? runtimeInitialized ? _malloc(e) : Runtime.dynamicAlloc(e) : Runtime.staticAlloc(e);
  }

  function Pointer_stringify(e, r) {
    if (0 === r || !e) return "";

    for (var i, n = 0, t = 0; n |= i = HEAPU8[e + t >> 0], (0 != i || r) && (t++, !r || t != r);) {
      ;
    }

    r = r || t;
    var a = "";

    if (n < 128) {
      for (var o; 0 < r;) {
        o = String.fromCharCode.apply(String, HEAPU8.subarray(e, e + Math.min(r, 1024))), a = a ? a + o : o, e += 1024, r -= 1024;
      }

      return a;
    }

    return Module.UTF8ToString(e);
  }

  function AsciiToString(e) {
    for (var r = "";;) {
      var i = HEAP8[e++ >> 0];
      if (!i) return r;
      r += String.fromCharCode(i);
    }
  }

  function stringToAscii(e, r) {
    return writeAsciiToMemory(e, r, !1);
  }

  Module.ALLOC_NORMAL = ALLOC_NORMAL, Module.ALLOC_STACK = ALLOC_STACK, Module.ALLOC_STATIC = ALLOC_STATIC, Module.ALLOC_DYNAMIC = ALLOC_DYNAMIC, Module.ALLOC_NONE = ALLOC_NONE, Module.allocate = allocate, Module.getMemory = getMemory, Module.Pointer_stringify = Pointer_stringify, Module.AsciiToString = AsciiToString, Module.stringToAscii = stringToAscii;
  var UTF8Decoder = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;

  function UTF8ArrayToString(e, r) {
    for (var i = r; e[i];) {
      ++i;
    }

    if (16 < i - r && e.subarray && UTF8Decoder) return UTF8Decoder.decode(e.subarray(r, i));

    for (var n, t, a, o, u, f, l = "";;) {
      if (!(u = e[r++])) return l;
      128 & u ? (f = 63 & e[r++], 192 != (224 & u) ? (o = 63 & e[r++], (u = 224 == (240 & u) ? (15 & u) << 12 | f << 6 | o : (n = 63 & e[r++], 240 == (248 & u) ? (7 & u) << 18 | f << 12 | o << 6 | n : (t = 63 & e[r++], 248 == (252 & u) ? (3 & u) << 24 | f << 18 | o << 12 | n << 6 | t : (1 & u) << 30 | f << 24 | o << 18 | n << 12 | t << 6 | 63 & e[r++]))) < 65536 ? l += String.fromCharCode(u) : (a = u - 65536, l += String.fromCharCode(55296 | a >> 10, 56320 | 1023 & a))) : l += String.fromCharCode((31 & u) << 6 | f)) : l += String.fromCharCode(u);
    }
  }

  function UTF8ToString(e) {
    return UTF8ArrayToString(HEAPU8, e);
  }

  function stringToUTF8Array(e, r, i, n) {
    if (!(0 < n)) return 0;

    for (var t = i, a = i + n - 1, o = 0; o < e.length; ++o) {
      var u = e.charCodeAt(o);

      if (55296 <= u && u <= 57343 && (u = 65536 + ((1023 & u) << 10) | 1023 & e.charCodeAt(++o)), u <= 127) {
        if (a <= i) break;
        r[i++] = u;
      } else if (u <= 2047) {
        if (a <= i + 1) break;
        r[i++] = 192 | u >> 6, r[i++] = 128 | 63 & u;
      } else if (u <= 65535) {
        if (a <= i + 2) break;
        r[i++] = 224 | u >> 12, r[i++] = 128 | u >> 6 & 63, r[i++] = 128 | 63 & u;
      } else if (u <= 2097151) {
        if (a <= i + 3) break;
        r[i++] = 240 | u >> 18, r[i++] = 128 | u >> 12 & 63, r[i++] = 128 | u >> 6 & 63, r[i++] = 128 | 63 & u;
      } else if (u <= 67108863) {
        if (a <= i + 4) break;
        r[i++] = 248 | u >> 24, r[i++] = 128 | u >> 18 & 63, r[i++] = 128 | u >> 12 & 63, r[i++] = 128 | u >> 6 & 63, r[i++] = 128 | 63 & u;
      } else {
        if (a <= i + 5) break;
        r[i++] = 252 | u >> 30, r[i++] = 128 | u >> 24 & 63, r[i++] = 128 | u >> 18 & 63, r[i++] = 128 | u >> 12 & 63, r[i++] = 128 | u >> 6 & 63, r[i++] = 128 | 63 & u;
      }
    }

    return r[i] = 0, i - t;
  }

  function stringToUTF8(e, r, i) {
    return stringToUTF8Array(e, HEAPU8, r, i);
  }

  function lengthBytesUTF8(e) {
    for (var r = 0, i = 0; i < e.length; ++i) {
      var n = e.charCodeAt(i);
      55296 <= n && n <= 57343 && (n = 65536 + ((1023 & n) << 10) | 1023 & e.charCodeAt(++i)), n <= 127 ? ++r : r += n <= 2047 ? 2 : n <= 65535 ? 3 : n <= 2097151 ? 4 : n <= 67108863 ? 5 : 6;
    }

    return r;
  }

  Module.UTF8ArrayToString = UTF8ArrayToString, Module.UTF8ToString = UTF8ToString, Module.stringToUTF8Array = stringToUTF8Array, Module.stringToUTF8 = stringToUTF8, Module.lengthBytesUTF8 = lengthBytesUTF8;
  var UTF16Decoder = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0;

  function demangle(e) {
    var r = Module.___cxa_demangle || Module.__cxa_demangle;

    if (r) {
      try {
        var i = e.substr(1),
            n = lengthBytesUTF8(i) + 1,
            t = _malloc(n);

        stringToUTF8(i, t, n);

        var a = _malloc(4),
            o = r(t, 0, 0, a);

        if (0 === getValue(a, "i32") && o) return Pointer_stringify(o);
      } catch (e) {} finally {
        t && _free(t), a && _free(a), o && _free(o);
      }

      return e;
    }

    return Runtime.warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling"), e;
  }

  function demangleAll(e) {
    return e.replace(/__Z[\w\d_]+/g, function (e) {
      var r = demangle(e);
      return e === r ? e : e + " [" + r + "]";
    });
  }

  function jsStackTrace() {
    var r = new Error();

    if (!r.stack) {
      try {
        throw new Error(0);
      } catch (e) {
        r = e;
      }

      if (!r.stack) return "(no stack trace available)";
    }

    return r.stack.toString();
  }

  function stackTrace() {
    var e = jsStackTrace();
    return Module.extraStackTrace && (e += "\n" + Module.extraStackTrace()), demangleAll(e);
  }

  Module.stackTrace = stackTrace;
  var WASM_PAGE_SIZE = 65536,
      ASMJS_PAGE_SIZE = 16777216,
      MIN_TOTAL_MEMORY = 16777216,
      HEAP,
      buffer,
      HEAP8,
      HEAPU8,
      HEAP16,
      HEAPU16,
      HEAP32,
      HEAPU32,
      HEAPF32,
      HEAPF64,
      STATIC_BASE,
      STATICTOP,
      staticSealed,
      STACK_BASE,
      STACKTOP,
      STACK_MAX,
      DYNAMIC_BASE,
      DYNAMICTOP_PTR,
      byteLength;

  function alignUp(e, r) {
    return 0 < e % r && (e += r - e % r), e;
  }

  function updateGlobalBuffer(e) {
    Module.buffer = buffer = e;
  }

  function updateGlobalBufferViews() {
    Module.HEAP8 = HEAP8 = new Int8Array(buffer), Module.HEAP16 = HEAP16 = new Int16Array(buffer), Module.HEAP32 = HEAP32 = new Int32Array(buffer), Module.HEAPU8 = HEAPU8 = new Uint8Array(buffer), Module.HEAPU16 = HEAPU16 = new Uint16Array(buffer), Module.HEAPU32 = HEAPU32 = new Uint32Array(buffer), Module.HEAPF32 = HEAPF32 = new Float32Array(buffer), Module.HEAPF64 = HEAPF64 = new Float64Array(buffer);
  }

  function abortOnCannotGrowMemory() {
    abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + TOTAL_MEMORY + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or (4) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");
  }

  function enlargeMemory() {
    var e = Module.usingWasm ? WASM_PAGE_SIZE : ASMJS_PAGE_SIZE,
        r = 2147483648 - e;
    if (HEAP32[DYNAMICTOP_PTR >> 2] > r) return !1;
    var i = TOTAL_MEMORY;

    for (TOTAL_MEMORY = Math.max(TOTAL_MEMORY, MIN_TOTAL_MEMORY); TOTAL_MEMORY < HEAP32[DYNAMICTOP_PTR >> 2];) {
      TOTAL_MEMORY = TOTAL_MEMORY <= 536870912 ? alignUp(2 * TOTAL_MEMORY, e) : Math.min(alignUp((3 * TOTAL_MEMORY + 2147483648) / 4, e), r);
    }

    var n = Module.reallocBuffer(TOTAL_MEMORY);
    return n && n.byteLength == TOTAL_MEMORY ? (updateGlobalBuffer(n), updateGlobalBufferViews(), !0) : (TOTAL_MEMORY = i, !1);
  }

  STATIC_BASE = STATICTOP = STACK_BASE = STACKTOP = STACK_MAX = DYNAMIC_BASE = DYNAMICTOP_PTR = 0, staticSealed = !1, Module.reallocBuffer || (Module.reallocBuffer = function (e) {
    var r, i;

    try {
      ArrayBuffer.transfer ? i = ArrayBuffer.transfer(buffer, e) : (r = HEAP8, i = new ArrayBuffer(e), new Int8Array(i).set(r));
    } catch (e) {
      return !1;
    }

    return !!_emscripten_replace_memory(i) && i;
  });

  try {
    byteLength = Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get), byteLength(new ArrayBuffer(4));
  } catch (e) {
    byteLength = function byteLength(e) {
      return e.byteLength;
    };
  }

  var TOTAL_STACK = Module.TOTAL_STACK || 5242880,
      TOTAL_MEMORY = Module.TOTAL_MEMORY || 16777216;

  function getTotalMemory() {
    return TOTAL_MEMORY;
  }

  if (TOTAL_MEMORY < TOTAL_STACK && Module.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + TOTAL_MEMORY + "! (TOTAL_STACK=" + TOTAL_STACK + ")"), buffer = Module.buffer ? Module.buffer : new ArrayBuffer(TOTAL_MEMORY), updateGlobalBufferViews(), HEAP32[0] = 1668509029, HEAP16[1] = 25459, 115 !== HEAPU8[2] || 99 !== HEAPU8[3]) throw "Runtime error: expected the system to be little-endian!";

  function callRuntimeCallbacks(e) {
    for (; 0 < e.length;) {
      var r,
          i = e.shift();
      "function" != typeof i ? "number" == typeof (r = i.func) ? void 0 === i.arg ? Module.dynCall_v(r) : Module.dynCall_vi(r, i.arg) : r(void 0 === i.arg ? null : i.arg) : i();
    }
  }

  Module.HEAP = HEAP, Module.buffer = buffer, Module.HEAP8 = HEAP8, Module.HEAP16 = HEAP16, Module.HEAP32 = HEAP32, Module.HEAPU8 = HEAPU8, Module.HEAPU16 = HEAPU16, Module.HEAPU32 = HEAPU32, Module.HEAPF32 = HEAPF32, Module.HEAPF64 = HEAPF64;
  var __ATPRERUN__ = [],
      __ATINIT__ = [],
      __ATMAIN__ = [],
      __ATEXIT__ = [],
      __ATPOSTRUN__ = [],
      runtimeInitialized = !1,
      runtimeExited = !1;

  function preRun() {
    if (Module.preRun) for ("function" == typeof Module.preRun && (Module.preRun = [Module.preRun]); Module.preRun.length;) {
      addOnPreRun(Module.preRun.shift());
    }
    callRuntimeCallbacks(__ATPRERUN__);
  }

  function ensureInitRuntime() {
    runtimeInitialized || (runtimeInitialized = !0, callRuntimeCallbacks(__ATINIT__));
  }

  function preMain() {
    callRuntimeCallbacks(__ATMAIN__);
  }

  function exitRuntime() {
    callRuntimeCallbacks(__ATEXIT__), runtimeExited = !0;
  }

  function postRun() {
    if (Module.postRun) for ("function" == typeof Module.postRun && (Module.postRun = [Module.postRun]); Module.postRun.length;) {
      addOnPostRun(Module.postRun.shift());
    }
    callRuntimeCallbacks(__ATPOSTRUN__);
  }

  function addOnPreRun(e) {
    __ATPRERUN__.unshift(e);
  }

  function addOnInit(e) {
    __ATINIT__.unshift(e);
  }

  function addOnPreMain(e) {
    __ATMAIN__.unshift(e);
  }

  function addOnExit(e) {
    __ATEXIT__.unshift(e);
  }

  function addOnPostRun(e) {
    __ATPOSTRUN__.unshift(e);
  }

  function intArrayFromString(e, r, i) {
    var n = 0 < i ? i : lengthBytesUTF8(e) + 1,
        t = new Array(n),
        a = stringToUTF8Array(e, t, 0, t.length);
    return r && (t.length = a), t;
  }

  function intArrayToString(e) {
    for (var r = [], i = 0; i < e.length; i++) {
      var n = e[i];
      255 < n && (n &= 255), r.push(String.fromCharCode(n));
    }

    return r.join("");
  }

  function writeStringToMemory(e, r, i) {
    var n, t;
    Runtime.warnOnce("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!"), i && (t = r + lengthBytesUTF8(e), n = HEAP8[t]), stringToUTF8(e, r, 1 / 0), i && (HEAP8[t] = n);
  }

  function writeArrayToMemory(e, r) {
    HEAP8.set(e, r);
  }

  function writeAsciiToMemory(e, r, i) {
    for (var n = 0; n < e.length; ++n) {
      HEAP8[r++ >> 0] = e.charCodeAt(n);
    }

    i || (HEAP8[r >> 0] = 0);
  }

  Module.addOnPreRun = addOnPreRun, Module.addOnInit = addOnInit, Module.addOnPreMain = addOnPreMain, Module.addOnExit = addOnExit, Module.addOnPostRun = addOnPostRun, Module.intArrayFromString = intArrayFromString, Module.intArrayToString = intArrayToString, Module.writeStringToMemory = writeStringToMemory, Module.writeArrayToMemory = writeArrayToMemory, Module.writeAsciiToMemory = writeAsciiToMemory, Math.imul && -5 === Math.imul(4294967295, 5) || (Math.imul = function (e, r) {
    var i = 65535 & e,
        n = 65535 & r;
    return i * n + ((e >>> 16) * n + i * (r >>> 16) << 16) | 0;
  }), Math.imul = Math.imul, Math.clz32 || (Math.clz32 = function (e) {
    e >>>= 0;

    for (var r = 0; r < 32; r++) {
      if (e & 1 << 31 - r) return r;
    }

    return 32;
  }), Math.clz32 = Math.clz32, Math.trunc || (Math.trunc = function (e) {
    return e < 0 ? Math.ceil(e) : Math.floor(e);
  }), Math.trunc = Math.trunc;
  var Math_abs = Math.abs,
      Math_cos = Math.cos,
      Math_sin = Math.sin,
      Math_tan = Math.tan,
      Math_acos = Math.acos,
      Math_asin = Math.asin,
      Math_atan = Math.atan,
      Math_atan2 = Math.atan2,
      Math_exp = Math.exp,
      Math_log = Math.log,
      Math_sqrt = Math.sqrt,
      Math_ceil = Math.ceil,
      Math_floor = Math.floor,
      Math_pow = Math.pow,
      Math_imul = Math.imul,
      Math_fround = Math.fround,
      Math_round = Math.round,
      Math_min = Math.min,
      Math_clz32 = Math.clz32,
      Math_trunc = Math.trunc,
      runDependencies = 0,
      runDependencyWatcher = null,
      dependenciesFulfilled = null;

  function addRunDependency(e) {
    runDependencies++, Module.monitorRunDependencies && Module.monitorRunDependencies(runDependencies);
  }

  function removeRunDependency(e) {
    var r;
    runDependencies--, Module.monitorRunDependencies && Module.monitorRunDependencies(runDependencies), 0 == runDependencies && (null !== runDependencyWatcher && (clearInterval(runDependencyWatcher), runDependencyWatcher = null), dependenciesFulfilled && (r = dependenciesFulfilled, dependenciesFulfilled = null, r()));
  }

  Module.addRunDependency = addRunDependency, Module.removeRunDependency = removeRunDependency, Module.preloadedImages = {}, Module.preloadedAudios = {};
  var ASM_CONSTS = [],
      STATIC_BASE = Runtime.GLOBAL_BASE,
      STATICTOP = STATIC_BASE + 6192;
  __ATINIT__.push(), allocate([228, 2, 0, 0, 81, 16, 0, 0, 12, 3, 0, 0, 177, 16, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 12, 3, 0, 0, 94, 16, 0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 228, 2, 0, 0, 127, 16, 0, 0, 12, 3, 0, 0, 140, 16, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 12, 3, 0, 0, 183, 17, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 12, 3, 0, 0, 147, 17, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 108, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 32, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 248, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 224, 1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 40, 20, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0, 1, 0, 0, 0, 5, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 37, 115, 40, 37, 117, 41, 58, 32, 65, 115, 115, 101, 114, 116, 105, 111, 110, 32, 102, 97, 105, 108, 117, 114, 101, 58, 32, 34, 37, 115, 34, 10, 0, 109, 95, 115, 105, 122, 101, 32, 60, 61, 32, 109, 95, 99, 97, 112, 97, 99, 105, 116, 121, 0, 46, 47, 105, 110, 99, 92, 99, 114, 110, 95, 100, 101, 99, 111, 109, 112, 46, 104, 0, 109, 105, 110, 95, 110, 101, 119, 95, 99, 97, 112, 97, 99, 105, 116, 121, 32, 60, 32, 40, 48, 120, 55, 70, 70, 70, 48, 48, 48, 48, 85, 32, 47, 32, 101, 108, 101, 109, 101, 110, 116, 95, 115, 105, 122, 101, 41, 0, 110, 101, 119, 95, 99, 97, 112, 97, 99, 105, 116, 121, 32, 38, 38, 32, 40, 110, 101, 119, 95, 99, 97, 112, 97, 99, 105, 116, 121, 32, 62, 32, 109, 95, 99, 97, 112, 97, 99, 105, 116, 121, 41, 0, 110, 117, 109, 95, 99, 111, 100, 101, 115, 91, 99, 93, 0, 115, 111, 114, 116, 101, 100, 95, 112, 111, 115, 32, 60, 32, 116, 111, 116, 97, 108, 95, 117, 115, 101, 100, 95, 115, 121, 109, 115, 0, 112, 67, 111, 100, 101, 115, 105, 122, 101, 115, 91, 115, 121, 109, 95, 105, 110, 100, 101, 120, 93, 32, 61, 61, 32, 99, 111, 100, 101, 115, 105, 122, 101, 0, 116, 32, 60, 32, 40, 49, 85, 32, 60, 60, 32, 116, 97, 98, 108, 101, 95, 98, 105, 116, 115, 41, 0, 109, 95, 108, 111, 111, 107, 117, 112, 91, 116, 93, 32, 61, 61, 32, 99, 85, 73, 78, 84, 51, 50, 95, 77, 65, 88, 0, 99, 114, 110, 100, 95, 109, 97, 108, 108, 111, 99, 58, 32, 115, 105, 122, 101, 32, 116, 111, 111, 32, 98, 105, 103, 0, 99, 114, 110, 100, 95, 109, 97, 108, 108, 111, 99, 58, 32, 111, 117, 116, 32, 111, 102, 32, 109, 101, 109, 111, 114, 121, 0, 40, 40, 117, 105, 110, 116, 51, 50, 41, 112, 95, 110, 101, 119, 32, 38, 32, 40, 67, 82, 78, 68, 95, 77, 73, 78, 95, 65, 76, 76, 79, 67, 95, 65, 76, 73, 71, 78, 77, 69, 78, 84, 32, 45, 32, 49, 41, 41, 32, 61, 61, 32, 48, 0, 99, 114, 110, 100, 95, 114, 101, 97, 108, 108, 111, 99, 58, 32, 98, 97, 100, 32, 112, 116, 114, 0, 99, 114, 110, 100, 95, 102, 114, 101, 101, 58, 32, 98, 97, 100, 32, 112, 116, 114, 0, 102, 97, 108, 115, 101, 0, 40, 116, 111, 116, 97, 108, 95, 115, 121, 109, 115, 32, 62, 61, 32, 49, 41, 32, 38, 38, 32, 40, 116, 111, 116, 97, 108, 95, 115, 121, 109, 115, 32, 60, 61, 32, 112, 114, 101, 102, 105, 120, 95, 99, 111, 100, 105, 110, 103, 58, 58, 99, 77, 97, 120, 83, 117, 112, 112, 111, 114, 116, 101, 100, 83, 121, 109, 115, 41, 0, 17, 18, 19, 20, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15, 16, 48, 0, 110, 117, 109, 95, 98, 105, 116, 115, 32, 60, 61, 32, 51, 50, 85, 0, 109, 95, 98, 105, 116, 95, 99, 111, 117, 110, 116, 32, 60, 61, 32, 99, 66, 105, 116, 66, 117, 102, 83, 105, 122, 101, 0, 116, 32, 33, 61, 32, 99, 85, 73, 78, 84, 51, 50, 95, 77, 65, 88, 0, 109, 111, 100, 101, 108, 46, 109, 95, 99, 111, 100, 101, 95, 115, 105, 122, 101, 115, 91, 115, 121, 109, 93, 32, 61, 61, 32, 108, 101, 110, 0, 0, 2, 3, 1, 0, 2, 3, 4, 5, 6, 7, 1, 40, 108, 101, 110, 32, 62, 61, 32, 49, 41, 32, 38, 38, 32, 40, 108, 101, 110, 32, 60, 61, 32, 99, 77, 97, 120, 69, 120, 112, 101, 99, 116, 101, 100, 67, 111, 100, 101, 83, 105, 122, 101, 41, 0, 105, 32, 60, 32, 109, 95, 115, 105, 122, 101, 0, 110, 101, 120, 116, 95, 108, 101, 118, 101, 108, 95, 111, 102, 115, 32, 62, 32, 99, 117, 114, 95, 108, 101, 118, 101, 108, 95, 111, 102, 115, 0, 1, 2, 2, 3, 3, 3, 3, 4, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 2, 1, 2, 0, 0, 0, 1, 0, 2, 1, 0, 2, 0, 0, 1, 2, 3, 110, 117, 109, 32, 38, 38, 32, 40, 110, 117, 109, 32, 61, 61, 32, 126, 110, 117, 109, 95, 99, 104, 101, 99, 107, 41, 0, 17, 0, 10, 0, 17, 17, 17, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 15, 10, 17, 17, 17, 3, 10, 7, 0, 1, 19, 9, 11, 11, 0, 0, 9, 6, 11, 0, 0, 11, 0, 6, 17, 0, 0, 0, 17, 17, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 10, 10, 17, 17, 17, 0, 10, 0, 0, 2, 0, 9, 11, 0, 0, 0, 9, 0, 11, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 12, 0, 0, 0, 0, 9, 12, 0, 0, 0, 0, 0, 12, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 4, 13, 0, 0, 0, 0, 9, 14, 0, 0, 0, 0, 0, 14, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 15, 0, 0, 0, 0, 9, 16, 0, 0, 0, 0, 0, 16, 0, 0, 16, 0, 0, 18, 0, 0, 0, 18, 18, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 18, 18, 18, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 9, 11, 0, 0, 0, 0, 0, 11, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 12, 0, 0, 0, 0, 9, 12, 0, 0, 0, 0, 0, 12, 0, 0, 12, 0, 0, 45, 43, 32, 32, 32, 48, 88, 48, 120, 0, 40, 110, 117, 108, 108, 41, 0, 45, 48, 88, 43, 48, 88, 32, 48, 88, 45, 48, 120, 43, 48, 120, 32, 48, 120, 0, 105, 110, 102, 0, 73, 78, 70, 0, 110, 97, 110, 0, 78, 65, 78, 0, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 46, 0, 84, 33, 34, 25, 13, 1, 2, 3, 17, 75, 28, 12, 16, 4, 11, 29, 18, 30, 39, 104, 110, 111, 112, 113, 98, 32, 5, 6, 15, 19, 20, 21, 26, 8, 22, 7, 40, 36, 23, 24, 9, 10, 14, 27, 31, 37, 35, 131, 130, 125, 38, 42, 43, 60, 61, 62, 63, 67, 71, 74, 77, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102, 103, 105, 106, 107, 108, 114, 115, 116, 121, 122, 123, 124, 0, 73, 108, 108, 101, 103, 97, 108, 32, 98, 121, 116, 101, 32, 115, 101, 113, 117, 101, 110, 99, 101, 0, 68, 111, 109, 97, 105, 110, 32, 101, 114, 114, 111, 114, 0, 82, 101, 115, 117, 108, 116, 32, 110, 111, 116, 32, 114, 101, 112, 114, 101, 115, 101, 110, 116, 97, 98, 108, 101, 0, 78, 111, 116, 32, 97, 32, 116, 116, 121, 0, 80, 101, 114, 109, 105, 115, 115, 105, 111, 110, 32, 100, 101, 110, 105, 101, 100, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 110, 111, 116, 32, 112, 101, 114, 109, 105, 116, 116, 101, 100, 0, 78, 111, 32, 115, 117, 99, 104, 32, 102, 105, 108, 101, 32, 111, 114, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121, 0, 78, 111, 32, 115, 117, 99, 104, 32, 112, 114, 111, 99, 101, 115, 115, 0, 70, 105, 108, 101, 32, 101, 120, 105, 115, 116, 115, 0, 86, 97, 108, 117, 101, 32, 116, 111, 111, 32, 108, 97, 114, 103, 101, 32, 102, 111, 114, 32, 100, 97, 116, 97, 32, 116, 121, 112, 101, 0, 78, 111, 32, 115, 112, 97, 99, 101, 32, 108, 101, 102, 116, 32, 111, 110, 32, 100, 101, 118, 105, 99, 101, 0, 79, 117, 116, 32, 111, 102, 32, 109, 101, 109, 111, 114, 121, 0, 82, 101, 115, 111, 117, 114, 99, 101, 32, 98, 117, 115, 121, 0, 73, 110, 116, 101, 114, 114, 117, 112, 116, 101, 100, 32, 115, 121, 115, 116, 101, 109, 32, 99, 97, 108, 108, 0, 82, 101, 115, 111, 117, 114, 99, 101, 32, 116, 101, 109, 112, 111, 114, 97, 114, 105, 108, 121, 32, 117, 110, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 73, 110, 118, 97, 108, 105, 100, 32, 115, 101, 101, 107, 0, 67, 114, 111, 115, 115, 45, 100, 101, 118, 105, 99, 101, 32, 108, 105, 110, 107, 0, 82, 101, 97, 100, 45, 111, 110, 108, 121, 32, 102, 105, 108, 101, 32, 115, 121, 115, 116, 101, 109, 0, 68, 105, 114, 101, 99, 116, 111, 114, 121, 32, 110, 111, 116, 32, 101, 109, 112, 116, 121, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 114, 101, 115, 101, 116, 32, 98, 121, 32, 112, 101, 101, 114, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 116, 105, 109, 101, 100, 32, 111, 117, 116, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 114, 101, 102, 117, 115, 101, 100, 0, 72, 111, 115, 116, 32, 105, 115, 32, 100, 111, 119, 110, 0, 72, 111, 115, 116, 32, 105, 115, 32, 117, 110, 114, 101, 97, 99, 104, 97, 98, 108, 101, 0, 65, 100, 100, 114, 101, 115, 115, 32, 105, 110, 32, 117, 115, 101, 0, 66, 114, 111, 107, 101, 110, 32, 112, 105, 112, 101, 0, 73, 47, 79, 32, 101, 114, 114, 111, 114, 0, 78, 111, 32, 115, 117, 99, 104, 32, 100, 101, 118, 105, 99, 101, 32, 111, 114, 32, 97, 100, 100, 114, 101, 115, 115, 0, 66, 108, 111, 99, 107, 32, 100, 101, 118, 105, 99, 101, 32, 114, 101, 113, 117, 105, 114, 101, 100, 0, 78, 111, 32, 115, 117, 99, 104, 32, 100, 101, 118, 105, 99, 101, 0, 78, 111, 116, 32, 97, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121, 0, 73, 115, 32, 97, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121, 0, 84, 101, 120, 116, 32, 102, 105, 108, 101, 32, 98, 117, 115, 121, 0, 69, 120, 101, 99, 32, 102, 111, 114, 109, 97, 116, 32, 101, 114, 114, 111, 114, 0, 73, 110, 118, 97, 108, 105, 100, 32, 97, 114, 103, 117, 109, 101, 110, 116, 0, 65, 114, 103, 117, 109, 101, 110, 116, 32, 108, 105, 115, 116, 32, 116, 111, 111, 32, 108, 111, 110, 103, 0, 83, 121, 109, 98, 111, 108, 105, 99, 32, 108, 105, 110, 107, 32, 108, 111, 111, 112, 0, 70, 105, 108, 101, 110, 97, 109, 101, 32, 116, 111, 111, 32, 108, 111, 110, 103, 0, 84, 111, 111, 32, 109, 97, 110, 121, 32, 111, 112, 101, 110, 32, 102, 105, 108, 101, 115, 32, 105, 110, 32, 115, 121, 115, 116, 101, 109, 0, 78, 111, 32, 102, 105, 108, 101, 32, 100, 101, 115, 99, 114, 105, 112, 116, 111, 114, 115, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 66, 97, 100, 32, 102, 105, 108, 101, 32, 100, 101, 115, 99, 114, 105, 112, 116, 111, 114, 0, 78, 111, 32, 99, 104, 105, 108, 100, 32, 112, 114, 111, 99, 101, 115, 115, 0, 66, 97, 100, 32, 97, 100, 100, 114, 101, 115, 115, 0, 70, 105, 108, 101, 32, 116, 111, 111, 32, 108, 97, 114, 103, 101, 0, 84, 111, 111, 32, 109, 97, 110, 121, 32, 108, 105, 110, 107, 115, 0, 78, 111, 32, 108, 111, 99, 107, 115, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 82, 101, 115, 111, 117, 114, 99, 101, 32, 100, 101, 97, 100, 108, 111, 99, 107, 32, 119, 111, 117, 108, 100, 32, 111, 99, 99, 117, 114, 0, 83, 116, 97, 116, 101, 32, 110, 111, 116, 32, 114, 101, 99, 111, 118, 101, 114, 97, 98, 108, 101, 0, 80, 114, 101, 118, 105, 111, 117, 115, 32, 111, 119, 110, 101, 114, 32, 100, 105, 101, 100, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 99, 97, 110, 99, 101, 108, 101, 100, 0, 70, 117, 110, 99, 116, 105, 111, 110, 32, 110, 111, 116, 32, 105, 109, 112, 108, 101, 109, 101, 110, 116, 101, 100, 0, 78, 111, 32, 109, 101, 115, 115, 97, 103, 101, 32, 111, 102, 32, 100, 101, 115, 105, 114, 101, 100, 32, 116, 121, 112, 101, 0, 73, 100, 101, 110, 116, 105, 102, 105, 101, 114, 32, 114, 101, 109, 111, 118, 101, 100, 0, 68, 101, 118, 105, 99, 101, 32, 110, 111, 116, 32, 97, 32, 115, 116, 114, 101, 97, 109, 0, 78, 111, 32, 100, 97, 116, 97, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 68, 101, 118, 105, 99, 101, 32, 116, 105, 109, 101, 111, 117, 116, 0, 79, 117, 116, 32, 111, 102, 32, 115, 116, 114, 101, 97, 109, 115, 32, 114, 101, 115, 111, 117, 114, 99, 101, 115, 0, 76, 105, 110, 107, 32, 104, 97, 115, 32, 98, 101, 101, 110, 32, 115, 101, 118, 101, 114, 101, 100, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 101, 114, 114, 111, 114, 0, 66, 97, 100, 32, 109, 101, 115, 115, 97, 103, 101, 0, 70, 105, 108, 101, 32, 100, 101, 115, 99, 114, 105, 112, 116, 111, 114, 32, 105, 110, 32, 98, 97, 100, 32, 115, 116, 97, 116, 101, 0, 78, 111, 116, 32, 97, 32, 115, 111, 99, 107, 101, 116, 0, 68, 101, 115, 116, 105, 110, 97, 116, 105, 111, 110, 32, 97, 100, 100, 114, 101, 115, 115, 32, 114, 101, 113, 117, 105, 114, 101, 100, 0, 77, 101, 115, 115, 97, 103, 101, 32, 116, 111, 111, 32, 108, 97, 114, 103, 101, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 119, 114, 111, 110, 103, 32, 116, 121, 112, 101, 32, 102, 111, 114, 32, 115, 111, 99, 107, 101, 116, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 110, 111, 116, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 83, 111, 99, 107, 101, 116, 32, 116, 121, 112, 101, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 78, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 102, 97, 109, 105, 108, 121, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 65, 100, 100, 114, 101, 115, 115, 32, 102, 97, 109, 105, 108, 121, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 32, 98, 121, 32, 112, 114, 111, 116, 111, 99, 111, 108, 0, 65, 100, 100, 114, 101, 115, 115, 32, 110, 111, 116, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 78, 101, 116, 119, 111, 114, 107, 32, 105, 115, 32, 100, 111, 119, 110, 0, 78, 101, 116, 119, 111, 114, 107, 32, 117, 110, 114, 101, 97, 99, 104, 97, 98, 108, 101, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 114, 101, 115, 101, 116, 32, 98, 121, 32, 110, 101, 116, 119, 111, 114, 107, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110, 32, 97, 98, 111, 114, 116, 101, 100, 0, 78, 111, 32, 98, 117, 102, 102, 101, 114, 32, 115, 112, 97, 99, 101, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 83, 111, 99, 107, 101, 116, 32, 105, 115, 32, 99, 111, 110, 110, 101, 99, 116, 101, 100, 0, 83, 111, 99, 107, 101, 116, 32, 110, 111, 116, 32, 99, 111, 110, 110, 101, 99, 116, 101, 100, 0, 67, 97, 110, 110, 111, 116, 32, 115, 101, 110, 100, 32, 97, 102, 116, 101, 114, 32, 115, 111, 99, 107, 101, 116, 32, 115, 104, 117, 116, 100, 111, 119, 110, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 97, 108, 114, 101, 97, 100, 121, 32, 105, 110, 32, 112, 114, 111, 103, 114, 101, 115, 115, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 105, 110, 32, 112, 114, 111, 103, 114, 101, 115, 115, 0, 83, 116, 97, 108, 101, 32, 102, 105, 108, 101, 32, 104, 97, 110, 100, 108, 101, 0, 82, 101, 109, 111, 116, 101, 32, 73, 47, 79, 32, 101, 114, 114, 111, 114, 0, 81, 117, 111, 116, 97, 32, 101, 120, 99, 101, 101, 100, 101, 100, 0, 78, 111, 32, 109, 101, 100, 105, 117, 109, 32, 102, 111, 117, 110, 100, 0, 87, 114, 111, 110, 103, 32, 109, 101, 100, 105, 117, 109, 32, 116, 121, 112, 101, 0, 78, 111, 32, 101, 114, 114, 111, 114, 32, 105, 110, 102, 111, 114, 109, 97, 116, 105, 111, 110, 0, 0, 116, 101, 114, 109, 105, 110, 97, 116, 105, 110, 103, 32, 119, 105, 116, 104, 32, 37, 115, 32, 101, 120, 99, 101, 112, 116, 105, 111, 110, 32, 111, 102, 32, 116, 121, 112, 101, 32, 37, 115, 58, 32, 37, 115, 0, 116, 101, 114, 109, 105, 110, 97, 116, 105, 110, 103, 32, 119, 105, 116, 104, 32, 37, 115, 32, 101, 120, 99, 101, 112, 116, 105, 111, 110, 32, 111, 102, 32, 116, 121, 112, 101, 32, 37, 115, 0, 116, 101, 114, 109, 105, 110, 97, 116, 105, 110, 103, 32, 119, 105, 116, 104, 32, 37, 115, 32, 102, 111, 114, 101, 105, 103, 110, 32, 101, 120, 99, 101, 112, 116, 105, 111, 110, 0, 116, 101, 114, 109, 105, 110, 97, 116, 105, 110, 103, 0, 117, 110, 99, 97, 117, 103, 104, 116, 0, 83, 116, 57, 101, 120, 99, 101, 112, 116, 105, 111, 110, 0, 78, 49, 48, 95, 95, 99, 120, 120, 97, 98, 105, 118, 49, 49, 54, 95, 95, 115, 104, 105, 109, 95, 116, 121, 112, 101, 95, 105, 110, 102, 111, 69, 0, 83, 116, 57, 116, 121, 112, 101, 95, 105, 110, 102, 111, 0, 78, 49, 48, 95, 95, 99, 120, 120, 97, 98, 105, 118, 49, 50, 48, 95, 95, 115, 105, 95, 99, 108, 97, 115, 115, 95, 116, 121, 112, 101, 95, 105, 110, 102, 111, 69, 0, 78, 49, 48, 95, 95, 99, 120, 120, 97, 98, 105, 118, 49, 49, 55, 95, 95, 99, 108, 97, 115, 115, 95, 116, 121, 112, 101, 95, 105, 110, 102, 111, 69, 0, 112, 116, 104, 114, 101, 97, 100, 95, 111, 110, 99, 101, 32, 102, 97, 105, 108, 117, 114, 101, 32, 105, 110, 32, 95, 95, 99, 120, 97, 95, 103, 101, 116, 95, 103, 108, 111, 98, 97, 108, 115, 95, 102, 97, 115, 116, 40, 41, 0, 99, 97, 110, 110, 111, 116, 32, 99, 114, 101, 97, 116, 101, 32, 112, 116, 104, 114, 101, 97, 100, 32, 107, 101, 121, 32, 102, 111, 114, 32, 95, 95, 99, 120, 97, 95, 103, 101, 116, 95, 103, 108, 111, 98, 97, 108, 115, 40, 41, 0, 99, 97, 110, 110, 111, 116, 32, 122, 101, 114, 111, 32, 111, 117, 116, 32, 116, 104, 114, 101, 97, 100, 32, 118, 97, 108, 117, 101, 32, 102, 111, 114, 32, 95, 95, 99, 120, 97, 95, 103, 101, 116, 95, 103, 108, 111, 98, 97, 108, 115, 40, 41, 0, 116, 101, 114, 109, 105, 110, 97, 116, 101, 95, 104, 97, 110, 100, 108, 101, 114, 32, 117, 110, 101, 120, 112, 101, 99, 116, 101, 100, 108, 121, 32, 114, 101, 116, 117, 114, 110, 101, 100, 0, 78, 49, 48, 95, 95, 99, 120, 120, 97, 98, 105, 118, 49, 49, 57, 95, 95, 112, 111, 105, 110, 116, 101, 114, 95, 116, 121, 112, 101, 95, 105, 110, 102, 111, 69, 0, 78, 49, 48, 95, 95, 99, 120, 120, 97, 98, 105, 118, 49, 49, 55, 95, 95, 112, 98, 97, 115, 101, 95, 116, 121, 112, 101, 95, 105, 110, 102, 111, 69, 0], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE);
  var tempDoublePtr = STATICTOP;

  function _abort() {
    Module.abort();
  }

  function __ZSt18uncaught_exceptionv() {
    return !!__ZSt18uncaught_exceptionv.uncaught_exception;
  }

  STATICTOP += 16;
  var EXCEPTIONS = {
    last: 0,
    caught: [],
    infos: {},
    deAdjust: function deAdjust(e) {
      if (!e || EXCEPTIONS.infos[e]) return e;

      for (var r in EXCEPTIONS.infos) {
        if (EXCEPTIONS.infos[r].adjusted === e) return r;
      }

      return e;
    },
    addRef: function addRef(e) {
      e && EXCEPTIONS.infos[e].refcount++;
    },
    decRef: function decRef(e) {
      var r;
      e && (assert(0 < (r = EXCEPTIONS.infos[e]).refcount), r.refcount--, 0 !== r.refcount || r.rethrown || (r.destructor && Module.dynCall_vi(r.destructor, e), delete EXCEPTIONS.infos[e], ___cxa_free_exception(e)));
    },
    clearRef: function clearRef(e) {
      e && (EXCEPTIONS.infos[e].refcount = 0);
    }
  };

  function ___cxa_begin_catch(e) {
    var r = EXCEPTIONS.infos[e];
    return r && !r.caught && (r.caught = !0, __ZSt18uncaught_exceptionv.uncaught_exception--), r && (r.rethrown = !1), EXCEPTIONS.caught.push(e), EXCEPTIONS.addRef(EXCEPTIONS.deAdjust(e)), e;
  }

  function _pthread_once(e, r) {
    _pthread_once.seen || (_pthread_once.seen = {}), e in _pthread_once.seen || (Module.dynCall_v(r), _pthread_once.seen[e] = 1);
  }

  function _emscripten_memcpy_big(e, r, i) {
    return HEAPU8.set(HEAPU8.subarray(r, r + i), e), e;
  }

  var SYSCALLS = {
    varargs: 0,
    get: function get(e) {
      return SYSCALLS.varargs += 4, HEAP32[SYSCALLS.varargs - 4 >> 2];
    },
    getStr: function getStr() {
      return Pointer_stringify(SYSCALLS.get());
    },
    get64: function get64() {
      var e = SYSCALLS.get(),
          r = SYSCALLS.get();
      return assert(0 <= e ? 0 === r : -1 === r), e;
    },
    getZero: function getZero() {
      assert(0 === SYSCALLS.get());
    }
  };

  function ___syscall6(e, r) {
    SYSCALLS.varargs = r;

    try {
      var i = SYSCALLS.getStreamFromFD();
      return FS.close(i), 0;
    } catch (e) {
      return "undefined" != typeof FS && e instanceof FS.ErrnoError || abort(e), -e.errno;
    }
  }

  var cttz_i8 = allocate([8, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 7, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0], "i8", ALLOC_STATIC),
      PTHREAD_SPECIFIC = {};

  function _pthread_getspecific(e) {
    return PTHREAD_SPECIFIC[e] || 0;
  }

  function ___setErrNo(e) {
    return Module.___errno_location && (HEAP32[Module.___errno_location() >> 2] = e), e;
  }

  var PTHREAD_SPECIFIC_NEXT_KEY = 1,
      ERRNO_CODES = {
    EPERM: 1,
    ENOENT: 2,
    ESRCH: 3,
    EINTR: 4,
    EIO: 5,
    ENXIO: 6,
    E2BIG: 7,
    ENOEXEC: 8,
    EBADF: 9,
    ECHILD: 10,
    EAGAIN: 11,
    EWOULDBLOCK: 11,
    ENOMEM: 12,
    EACCES: 13,
    EFAULT: 14,
    ENOTBLK: 15,
    EBUSY: 16,
    EEXIST: 17,
    EXDEV: 18,
    ENODEV: 19,
    ENOTDIR: 20,
    EISDIR: 21,
    EINVAL: 22,
    ENFILE: 23,
    EMFILE: 24,
    ENOTTY: 25,
    ETXTBSY: 26,
    EFBIG: 27,
    ENOSPC: 28,
    ESPIPE: 29,
    EROFS: 30,
    EMLINK: 31,
    EPIPE: 32,
    EDOM: 33,
    ERANGE: 34,
    ENOMSG: 42,
    EIDRM: 43,
    ECHRNG: 44,
    EL2NSYNC: 45,
    EL3HLT: 46,
    EL3RST: 47,
    ELNRNG: 48,
    EUNATCH: 49,
    ENOCSI: 50,
    EL2HLT: 51,
    EDEADLK: 35,
    ENOLCK: 37,
    EBADE: 52,
    EBADR: 53,
    EXFULL: 54,
    ENOANO: 55,
    EBADRQC: 56,
    EBADSLT: 57,
    EDEADLOCK: 35,
    EBFONT: 59,
    ENOSTR: 60,
    ENODATA: 61,
    ETIME: 62,
    ENOSR: 63,
    ENONET: 64,
    ENOPKG: 65,
    EREMOTE: 66,
    ENOLINK: 67,
    EADV: 68,
    ESRMNT: 69,
    ECOMM: 70,
    EPROTO: 71,
    EMULTIHOP: 72,
    EDOTDOT: 73,
    EBADMSG: 74,
    ENOTUNIQ: 76,
    EBADFD: 77,
    EREMCHG: 78,
    ELIBACC: 79,
    ELIBBAD: 80,
    ELIBSCN: 81,
    ELIBMAX: 82,
    ELIBEXEC: 83,
    ENOSYS: 38,
    ENOTEMPTY: 39,
    ENAMETOOLONG: 36,
    ELOOP: 40,
    EOPNOTSUPP: 95,
    EPFNOSUPPORT: 96,
    ECONNRESET: 104,
    ENOBUFS: 105,
    EAFNOSUPPORT: 97,
    EPROTOTYPE: 91,
    ENOTSOCK: 88,
    ENOPROTOOPT: 92,
    ESHUTDOWN: 108,
    ECONNREFUSED: 111,
    EADDRINUSE: 98,
    ECONNABORTED: 103,
    ENETUNREACH: 101,
    ENETDOWN: 100,
    ETIMEDOUT: 110,
    EHOSTDOWN: 112,
    EHOSTUNREACH: 113,
    EINPROGRESS: 115,
    EALREADY: 114,
    EDESTADDRREQ: 89,
    EMSGSIZE: 90,
    EPROTONOSUPPORT: 93,
    ESOCKTNOSUPPORT: 94,
    EADDRNOTAVAIL: 99,
    ENETRESET: 102,
    EISCONN: 106,
    ENOTCONN: 107,
    ETOOMANYREFS: 109,
    EUSERS: 87,
    EDQUOT: 122,
    ESTALE: 116,
    ENOTSUP: 95,
    ENOMEDIUM: 123,
    EILSEQ: 84,
    EOVERFLOW: 75,
    ECANCELED: 125,
    ENOTRECOVERABLE: 131,
    EOWNERDEAD: 130,
    ESTRPIPE: 86
  };

  function _pthread_key_create(e, r) {
    return 0 == e ? ERRNO_CODES.EINVAL : (HEAP32[e >> 2] = PTHREAD_SPECIFIC_NEXT_KEY, PTHREAD_SPECIFIC[PTHREAD_SPECIFIC_NEXT_KEY] = 0, PTHREAD_SPECIFIC_NEXT_KEY++, 0);
  }

  function ___resumeException(e) {
    throw EXCEPTIONS.last || (EXCEPTIONS.last = e), e + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
  }

  function ___cxa_find_matching_catch() {
    var e = EXCEPTIONS.last;
    if (!e) return 0 | (Runtime.setTempRet0(0), 0);
    var r = EXCEPTIONS.infos[e],
        i = r.type;
    if (!i) return 0 | (Runtime.setTempRet0(0), e);
    var n = Array.prototype.slice.call(arguments);

    Module.___cxa_is_pointer_type(i);

    ___cxa_find_matching_catch.buffer || (___cxa_find_matching_catch.buffer = _malloc(4)), HEAP32[___cxa_find_matching_catch.buffer >> 2] = e, e = ___cxa_find_matching_catch.buffer;

    for (var t = 0; t < n.length; t++) {
      if (n[t] && Module.___cxa_can_catch(n[t], i, e)) return e = HEAP32[e >> 2], r.adjusted = e, 0 | (Runtime.setTempRet0(n[t]), e);
    }

    return e = HEAP32[e >> 2], 0 | (Runtime.setTempRet0(i), e);
  }

  function ___gxx_personality_v0() {}

  function _pthread_setspecific(e, r) {
    return e in PTHREAD_SPECIFIC ? (PTHREAD_SPECIFIC[e] = r, 0) : ERRNO_CODES.EINVAL;
  }

  function ___syscall140(e, r) {
    SYSCALLS.varargs = r;

    try {
      var i = SYSCALLS.getStreamFromFD(),
          n = (SYSCALLS.get(), SYSCALLS.get()),
          t = SYSCALLS.get(),
          a = SYSCALLS.get(),
          o = n;
      return FS.llseek(i, o, a), HEAP32[t >> 2] = i.position, i.getdents && 0 === o && 0 === a && (i.getdents = null), 0;
    } catch (e) {
      return "undefined" != typeof FS && e instanceof FS.ErrnoError || abort(e), -e.errno;
    }
  }

  function ___syscall146(e, r) {
    SYSCALLS.varargs = r;

    try {
      var i = SYSCALLS.get(),
          n = SYSCALLS.get(),
          t = SYSCALLS.get(),
          a = 0;
      ___syscall146.buffer || (___syscall146.buffers = [null, [], []], ___syscall146.printChar = function (e, r) {
        var i = ___syscall146.buffers[e];
        assert(i), 0 === r || 10 === r ? ((1 === e ? Module.print : Module.printErr)(UTF8ArrayToString(i, 0)), i.length = 0) : i.push(r);
      });

      for (var o = 0; o < t; o++) {
        for (var u = HEAP32[n + 8 * o >> 2], f = HEAP32[n + (8 * o + 4) >> 2], l = 0; l < f; l++) {
          ___syscall146.printChar(i, HEAPU8[u + l]);
        }

        a += f;
      }

      return a;
    } catch (e) {
      return "undefined" != typeof FS && e instanceof FS.ErrnoError || abort(e), -e.errno;
    }
  }

  function ___syscall54(e, r) {
    SYSCALLS.varargs = r;

    try {
      return 0;
    } catch (e) {
      return "undefined" != typeof FS && e instanceof FS.ErrnoError || abort(e), -e.errno;
    }
  }

  function invoke_iiii(e, r, i, n) {
    try {
      return Module.dynCall_iiii(e, r, i, n);
    } catch (e) {
      if ("number" != typeof e && "longjmp" !== e) throw e;
      Module.setThrew(1, 0);
    }
  }

  function invoke_viiiii(e, r, i, n, t, a) {
    try {
      Module.dynCall_viiiii(e, r, i, n, t, a);
    } catch (e) {
      if ("number" != typeof e && "longjmp" !== e) throw e;
      Module.setThrew(1, 0);
    }
  }

  function invoke_vi(e, r) {
    try {
      Module.dynCall_vi(e, r);
    } catch (e) {
      if ("number" != typeof e && "longjmp" !== e) throw e;
      Module.setThrew(1, 0);
    }
  }

  function invoke_ii(e, r) {
    try {
      return Module.dynCall_ii(e, r);
    } catch (e) {
      if ("number" != typeof e && "longjmp" !== e) throw e;
      Module.setThrew(1, 0);
    }
  }

  function invoke_viii(e, r, i, n) {
    try {
      Module.dynCall_viii(e, r, i, n);
    } catch (e) {
      if ("number" != typeof e && "longjmp" !== e) throw e;
      Module.setThrew(1, 0);
    }
  }

  function invoke_v(e) {
    try {
      Module.dynCall_v(e);
    } catch (e) {
      if ("number" != typeof e && "longjmp" !== e) throw e;
      Module.setThrew(1, 0);
    }
  }

  function invoke_viiiiii(e, r, i, n, t, a, o) {
    try {
      Module.dynCall_viiiiii(e, r, i, n, t, a, o);
    } catch (e) {
      if ("number" != typeof e && "longjmp" !== e) throw e;
      Module.setThrew(1, 0);
    }
  }

  function invoke_viiii(e, r, i, n, t) {
    try {
      Module.dynCall_viiii(e, r, i, n, t);
    } catch (e) {
      if ("number" != typeof e && "longjmp" !== e) throw e;
      Module.setThrew(1, 0);
    }
  }

  __ATEXIT__.push(function () {
    var e = Module._fflush;
    e && e(0);
    var r,
        i = ___syscall146.printChar;
    i && ((r = ___syscall146.buffers)[1].length && i(1, 10), r[2].length && i(2, 10));
  }), DYNAMICTOP_PTR = allocate(1, "i32", ALLOC_STATIC), STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP), STACK_MAX = STACK_BASE + TOTAL_STACK, DYNAMIC_BASE = Runtime.alignMemory(STACK_MAX), HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE, staticSealed = !0, Module.asmGlobalArg = {
    Math: Math,
    Int8Array: Int8Array,
    Int16Array: Int16Array,
    Int32Array: Int32Array,
    Uint8Array: Uint8Array,
    Uint16Array: Uint16Array,
    Uint32Array: Uint32Array,
    Float32Array: Float32Array,
    Float64Array: Float64Array,
    NaN: NaN,
    Infinity: 1 / 0,
    byteLength: byteLength
  }, Module.asmLibraryArg = {
    abort: abort,
    assert: assert,
    enlargeMemory: enlargeMemory,
    getTotalMemory: getTotalMemory,
    abortOnCannotGrowMemory: abortOnCannotGrowMemory,
    invoke_iiii: invoke_iiii,
    invoke_viiiii: invoke_viiiii,
    invoke_vi: invoke_vi,
    invoke_ii: invoke_ii,
    invoke_viii: invoke_viii,
    invoke_v: invoke_v,
    invoke_viiiiii: invoke_viiiiii,
    invoke_viiii: invoke_viiii,
    _pthread_getspecific: _pthread_getspecific,
    ___syscall54: ___syscall54,
    _pthread_setspecific: _pthread_setspecific,
    ___gxx_personality_v0: ___gxx_personality_v0,
    ___syscall6: ___syscall6,
    ___setErrNo: ___setErrNo,
    _abort: _abort,
    ___cxa_begin_catch: ___cxa_begin_catch,
    _pthread_once: _pthread_once,
    _emscripten_memcpy_big: _emscripten_memcpy_big,
    _pthread_key_create: _pthread_key_create,
    ___syscall140: ___syscall140,
    ___resumeException: ___resumeException,
    ___cxa_find_matching_catch: ___cxa_find_matching_catch,
    ___syscall146: ___syscall146,
    __ZSt18uncaught_exceptionv: __ZSt18uncaught_exceptionv,
    DYNAMICTOP_PTR: DYNAMICTOP_PTR,
    tempDoublePtr: tempDoublePtr,
    ABORT: ABORT,
    STACKTOP: STACKTOP,
    STACK_MAX: STACK_MAX,
    cttz_i8: cttz_i8
  };

  var asm = function (e, r, i) {
    var n = e.Int8Array,
        se = new n(i),
        t = e.Int16Array,
        K = new t(i),
        a = e.Int32Array,
        _e = new a(i),
        o = e.Uint8Array,
        de = new o(i),
        u = e.Uint16Array,
        Ee = new u(i),
        f = e.Uint32Array,
        l = (new f(i), e.Float32Array),
        c = (new l(i), e.Float64Array),
        N = new c(i),
        s = e.byteLength,
        _ = 0 | r.DYNAMICTOP_PTR,
        w = 0 | r.tempDoublePtr,
        Me = (r.ABORT, 0 | r.STACKTOP),
        d = (r.STACK_MAX, 0 | r.cttz_i8),
        E = 0,
        P = (e.NaN, e.Infinity, 0),
        te = (e.Math.floor, e.Math.abs, e.Math.sqrt, e.Math.pow, e.Math.cos, e.Math.sin, e.Math.tan, e.Math.acos, e.Math.asin, e.Math.atan, e.Math.atan2, e.Math.exp, e.Math.log, e.Math.ceil, e.Math.imul),
        M = (e.Math.min, e.Math.max, e.Math.clz32),
        T = r.abort,
        A = (r.assert, r.enlargeMemory),
        h = r.getTotalMemory,
        b = r.abortOnCannotGrowMemory,
        m = (r.invoke_iiii, r.invoke_viiiii, r.invoke_vi, r.invoke_ii, r.invoke_viii, r.invoke_v, r.invoke_viiiiii, r.invoke_viiii, r._pthread_getspecific),
        p = r.___syscall54,
        S = r._pthread_setspecific,
        v = (r.___gxx_personality_v0, r.___syscall6),
        k = r.___setErrNo,
        y = r._abort,
        g = (r.___cxa_begin_catch, r._pthread_once),
        O = r._emscripten_memcpy_big,
        R = r._pthread_key_create,
        C = r.___syscall140,
        I = (r.___resumeException, r.___cxa_find_matching_catch, r.___syscall146);

    r.__ZSt18uncaught_exceptionv;

    function L(e) {
      e |= 0;
      var r = 0,
          i = 0,
          n = 0,
          t = 0,
          a = 0,
          o = 0,
          u = 0,
          f = 0,
          l = 0,
          c = 0,
          s = 0,
          _ = 0,
          d = 0,
          E = 0,
          M = 0,
          T = 0,
          A = 0,
          h = 0,
          b = 0,
          m = 0,
          p = Me;
      Me = Me + 16 | 0, _ = p;

      do {
        if (e >>> 0 < 245) {
          if (e = (l = e >>> 0 < 11 ? 16 : e + 11 & -8) >>> 3, 3 & (i = (s = 0 | _e[1144]) >>> e) | 0) return n = 0 | _e[(i = (e = 4616 + ((r = (1 & i ^ 1) + e | 0) << 1 << 2) | 0) + 8 | 0) >> 2], (0 | e) == (0 | (a = 0 | _e[(t = n + 8 | 0) >> 2])) ? _e[1144] = s & ~(1 << r) : (_e[a + 12 >> 2] = e, _e[i >> 2] = a), m = r << 3, _e[n + 4 >> 2] = 3 | m, _e[(m = n + m + 4 | 0) >> 2] = 1 | _e[m >> 2], Me = p, 0 | (m = t);

          if ((c = 0 | _e[1146]) >>> 0 < l >>> 0) {
            if (0 | i) return r = ((r = i << e & ((r = 2 << e) | 0 - r)) & 0 - r) - 1 | 0, t = 0 | _e[(e = (r = 4616 + ((n = ((i = (r >>>= o = r >>> 12 & 16) >>> 5 & 8) | o | (t = (r >>>= i) >>> 2 & 4) | (e = (r >>>= t) >>> 1 & 2) | (n = (r >>>= e) >>> 1 & 1)) + (r >>> n) | 0) << 1 << 2) | 0) + 8 | 0) >> 2], (0 | r) == (0 | (i = 0 | _e[(o = t + 8 | 0) >> 2])) ? (e = s & ~(1 << n), _e[1144] = e) : (_e[i + 12 >> 2] = r, _e[e >> 2] = i, e = s), a = (n << 3) - l | 0, _e[t + 4 >> 2] = 3 | l, _e[(n = t + l | 0) + 4 >> 2] = 1 | a, _e[n + a >> 2] = a, 0 | c && (t = 0 | _e[1149], i = 4616 + ((r = c >>> 3) << 1 << 2) | 0, e & (r = 1 << r) ? r = 0 | _e[(e = i + 8 | 0) >> 2] : (_e[1144] = e | r, e = (r = i) + 8 | 0), _e[e >> 2] = t, _e[r + 12 >> 2] = t, _e[t + 8 >> 2] = r, _e[t + 12 >> 2] = i), _e[1146] = a, _e[1149] = n, Me = p, 0 | (m = o);

            if (u = 0 | _e[1145]) {
              if (i = (u & 0 - u) - 1 | 0, e = 0 | _e[4880 + (((a = (i >>>= o = i >>> 12 & 16) >>> 5 & 8) | o | (f = (i >>>= a) >>> 2 & 4) | (n = (i >>>= f) >>> 1 & 2) | (e = (i >>>= n) >>> 1 & 1)) + (i >>> e) << 2) >> 2], i = (-8 & _e[e + 4 >> 2]) - l | 0, n = 0 | _e[e + 16 + ((0 == (0 | _e[e + 16 >> 2]) & 1) << 2) >> 2]) {
                for (; i = (f = (o = (-8 & _e[n + 4 >> 2]) - l | 0) >>> 0 < i >>> 0) ? o : i, e = f ? n : e, 0 != (0 | (n = 0 | _e[n + 16 + ((0 == (0 | _e[n + 16 >> 2]) & 1) << 2) >> 2]));) {
                  ;
                }

                f = e, a = i;
              } else f = e, a = i;

              if (f >>> 0 < (o = f + l | 0) >>> 0) {
                t = 0 | _e[f + 24 >> 2], r = 0 | _e[f + 12 >> 2];

                do {
                  if ((0 | r) == (0 | f)) {
                    if (!(r = 0 | _e[(e = f + 20 | 0) >> 2]) && !(r = 0 | _e[(e = f + 16 | 0) >> 2])) {
                      i = 0;
                      break;
                    }

                    for (;;) {
                      if (0 | (n = 0 | _e[(i = r + 20 | 0) >> 2])) r = n, e = i;else {
                        if (!(n = 0 | _e[(i = r + 16 | 0) >> 2])) break;
                        r = n, e = i;
                      }
                    }

                    _e[e >> 2] = 0, i = r;
                  } else i = 0 | _e[f + 8 >> 2], _e[i + 12 >> 2] = r, _e[r + 8 >> 2] = i, i = r;
                } while (0);

                do {
                  if (0 | t) {
                    if (r = 0 | _e[f + 28 >> 2], (0 | f) == (0 | _e[(e = 4880 + (r << 2) | 0) >> 2])) {
                      if (!(_e[e >> 2] = i)) {
                        _e[1145] = u & ~(1 << r);
                        break;
                      }
                    } else if (!(_e[t + 16 + (((0 | _e[t + 16 >> 2]) != (0 | f) & 1) << 2) >> 2] = i)) break;

                    _e[i + 24 >> 2] = t, 0 | (r = 0 | _e[f + 16 >> 2]) && (_e[i + 16 >> 2] = r, _e[r + 24 >> 2] = i), 0 | (r = 0 | _e[f + 20 >> 2]) && (_e[i + 20 >> 2] = r, _e[r + 24 >> 2] = i);
                  }
                } while (0);

                return a >>> 0 < 16 ? (m = a + l | 0, _e[f + 4 >> 2] = 3 | m, _e[(m = f + m + 4 | 0) >> 2] = 1 | _e[m >> 2]) : (_e[f + 4 >> 2] = 3 | l, _e[o + 4 >> 2] = 1 | a, _e[o + a >> 2] = a, 0 | c && (n = 0 | _e[1149], i = 4616 + ((r = c >>> 3) << 1 << 2) | 0, s & (r = 1 << r) ? r = 0 | _e[(e = i + 8 | 0) >> 2] : (_e[1144] = s | r, e = (r = i) + 8 | 0), _e[e >> 2] = n, _e[r + 12 >> 2] = n, _e[n + 8 >> 2] = r, _e[n + 12 >> 2] = i), _e[1146] = a, _e[1149] = o), Me = p, 0 | (m = f + 8 | 0);
              }

              s = l;
            } else s = l;
          } else s = l;
        } else if (e >>> 0 <= 4294967231) {
          if (l = -8 & (e = e + 11 | 0), f = 0 | _e[1145]) {
            n = 0 - l | 0, u = (e >>>= 8) ? 16777215 < l >>> 0 ? 31 : l >>> ((u = 14 - ((c = ((b = e << (s = (e + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4) | s | (u = ((b <<= c) + 245760 | 0) >>> 16 & 2)) + (b << u >>> 15) | 0) + 7 | 0) & 1 | u << 1 : 0, i = 0 | _e[4880 + (u << 2) >> 2];

            e: do {
              if (i) for (o = l << (31 == ((e = 0) | u) ? 0 : 25 - (u >>> 1) | 0), a = 0;;) {
                if ((t = (-8 & _e[i + 4 >> 2]) - l | 0) >>> 0 < n >>> 0) {
                  if (!t) {
                    n = 0, t = e = i, b = 61;
                    break e;
                  }

                  e = i, n = t;
                }

                if (a = 0 == (0 | (t = 0 | _e[i + 20 >> 2])) | (0 | t) == (0 | (i = 0 | _e[i + 16 + (o >>> 31 << 2) >> 2])) ? a : t, t = 0 == (0 | i)) {
                  i = a, b = 57;
                  break;
                }

                o <<= 1 & (1 ^ t);
              } else e = i = 0, b = 57;
            } while (0);

            if (57 == (0 | b)) {
              if (0 == (0 | i) & 0 == (0 | e)) {
                if (!(e = f & ((e = 2 << u) | 0 - e))) {
                  s = l;
                  break;
                }

                s = (e & 0 - e) - 1 | 0, i = (e = 0) | _e[4880 + (((a = (s >>>= o = s >>> 12 & 16) >>> 5 & 8) | o | (u = (s >>>= a) >>> 2 & 4) | (c = (s >>>= u) >>> 1 & 2) | (i = (s >>>= c) >>> 1 & 1)) + (s >>> i) << 2) >> 2];
              }

              i ? (t = i, b = 61) : (u = e, o = n);
            }

            if (61 == (0 | b)) for (;;) {
              if (b = 0, i = (s = (i = (-8 & _e[t + 4 >> 2]) - l | 0) >>> 0 < n >>> 0) ? i : n, e = s ? t : e, !(t = 0 | _e[t + 16 + ((0 == (0 | _e[t + 16 >> 2]) & 1) << 2) >> 2])) {
                u = e, o = i;
                break;
              }

              n = i, b = 61;
            }

            if (0 != (0 | u) && o >>> 0 < ((0 | _e[1146]) - l | 0) >>> 0) {
              if ((a = u + l | 0) >>> 0 <= u >>> 0) return Me = p, (m = 0) | m;
              t = 0 | _e[u + 24 >> 2], r = 0 | _e[u + 12 >> 2];

              do {
                if ((0 | r) == (0 | u)) {
                  if (!(r = 0 | _e[(e = u + 20 | 0) >> 2]) && !(r = 0 | _e[(e = u + 16 | 0) >> 2])) {
                    r = 0;
                    break;
                  }

                  for (;;) {
                    if (0 | (n = 0 | _e[(i = r + 20 | 0) >> 2])) r = n, e = i;else {
                      if (!(n = 0 | _e[(i = r + 16 | 0) >> 2])) break;
                      r = n, e = i;
                    }
                  }

                  _e[e >> 2] = 0;
                } else m = 0 | _e[u + 8 >> 2], _e[m + 12 >> 2] = r, _e[r + 8 >> 2] = m;
              } while (0);

              do {
                if (t) {
                  if (e = 0 | _e[u + 28 >> 2], (0 | u) == (0 | _e[(i = 4880 + (e << 2) | 0) >> 2])) {
                    if (!(_e[i >> 2] = r)) {
                      n = f & ~(1 << e), _e[1145] = n;
                      break;
                    }
                  } else if (!(_e[t + 16 + (((0 | _e[t + 16 >> 2]) != (0 | u) & 1) << 2) >> 2] = r)) {
                    n = f;
                    break;
                  }

                  _e[r + 24 >> 2] = t, 0 | (e = 0 | _e[u + 16 >> 2]) && (_e[r + 16 >> 2] = e, _e[e + 24 >> 2] = r), n = ((e = 0 | _e[u + 20 >> 2]) && (_e[r + 20 >> 2] = e, _e[e + 24 >> 2] = r), f);
                } else n = f;
              } while (0);

              do {
                if (16 <= o >>> 0) {
                  if (_e[u + 4 >> 2] = 3 | l, _e[a + 4 >> 2] = 1 | o, r = (_e[a + o >> 2] = o) >>> 3, o >>> 0 < 256) {
                    i = 4616 + (r << 1 << 2) | 0, (e = 0 | _e[1144]) & (r = 1 << r) ? r = 0 | _e[(e = i + 8 | 0) >> 2] : (_e[1144] = e | r, e = (r = i) + 8 | 0), _e[e >> 2] = a, _e[r + 12 >> 2] = a, _e[a + 8 >> 2] = r, _e[a + 12 >> 2] = i;
                    break;
                  }

                  if (i = 4880 + ((r = (r = o >>> 8) ? 16777215 < o >>> 0 ? 31 : o >>> ((r = 14 - ((h = ((m = r << (b = (r + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4) | b | (r = ((m <<= h) + 245760 | 0) >>> 16 & 2)) + (m << r >>> 15) | 0) + 7 | 0) & 1 | r << 1 : 0) << 2) | 0, _e[a + 28 >> 2] = r, _e[(e = a + 16 | 0) + 4 >> 2] = 0, _e[e >> 2] = 0, !(n & (e = 1 << r))) {
                    _e[1145] = n | e, _e[i >> 2] = a, _e[a + 24 >> 2] = i, _e[a + 12 >> 2] = a, _e[a + 8 >> 2] = a;
                    break;
                  }

                  for (e = o << (31 == (0 | r) ? 0 : 25 - (r >>> 1) | 0), i = 0 | _e[i >> 2];;) {
                    if ((-8 & _e[i + 4 >> 2] | 0) == (0 | o)) {
                      b = 97;
                      break;
                    }

                    if (!(r = 0 | _e[(n = i + 16 + (e >>> 31 << 2) | 0) >> 2])) {
                      b = 96;
                      break;
                    }

                    e <<= 1, i = r;
                  }

                  if (96 == (0 | b)) {
                    _e[n >> 2] = a, _e[a + 24 >> 2] = i, _e[a + 12 >> 2] = a, _e[a + 8 >> 2] = a;
                    break;
                  }

                  if (97 == (0 | b)) {
                    m = 0 | _e[(b = i + 8 | 0) >> 2], _e[m + 12 >> 2] = a, _e[b >> 2] = a, _e[a + 8 >> 2] = m, _e[a + 12 >> 2] = i, _e[a + 24 >> 2] = 0;
                    break;
                  }
                } else m = o + l | 0, _e[u + 4 >> 2] = 3 | m, _e[(m = u + m + 4 | 0) >> 2] = 1 | _e[m >> 2];
              } while (0);

              return Me = p, 0 | (m = u + 8 | 0);
            }

            s = l;
          } else s = l;
        } else s = -1;
      } while (0);

      if (s >>> 0 <= (i = 0 | _e[1146]) >>> 0) return r = i - s | 0, e = 0 | _e[1149], 15 < r >>> 0 ? (m = e + s | 0, _e[1149] = m, _e[1146] = r, _e[m + 4 >> 2] = 1 | r, _e[m + r >> 2] = r, _e[e + 4 >> 2] = 3 | s) : (_e[1146] = 0, _e[1149] = 0, _e[e + 4 >> 2] = 3 | i, _e[(m = e + i + 4 | 0) >> 2] = 1 | _e[m >> 2]), Me = p, 0 | (m = e + 8 | 0);
      if (s >>> 0 < (o = 0 | _e[1147]) >>> 0) return h = o - s | 0, _e[1147] = h, b = (m = 0 | _e[1150]) + s | 0, _e[1150] = b, _e[b + 4 >> 2] = 1 | h, _e[m + 4 >> 2] = 3 | s, Me = p, 0 | (m = m + 8 | 0);
      if (u = s + 48 | 0, (l = (a = (e = 0 | _e[1262] ? 0 | _e[1264] : (_e[1264] = 4096, _e[1263] = 4096, _e[1265] = -1, _e[1266] = -1, _e[1267] = 0, _e[1255] = 0, e = -16 & _ ^ 1431655768, _e[_ >> 2] = e, _e[1262] = e, 4096)) + (f = s + 47 | 0) | 0) & (t = 0 - e | 0)) >>> 0 <= s >>> 0) return Me = p, (m = 0) | m;
      if (0 | (e = 0 | _e[1254]) && (_ = (c = 0 | _e[1252]) + l | 0) >>> 0 <= c >>> 0 | e >>> 0 < _ >>> 0) return Me = p, (m = 0) | m;

      e: do {
        if (4 & _e[1255]) r = 0, b = 133;else {
          i = 0 | _e[1150];

          r: do {
            if (i) {
              for (n = 5024; !((e = 0 | _e[n >> 2]) >>> 0 <= i >>> 0 && (e + (0 | _e[(M = n + 4 | 0) >> 2]) | 0) >>> 0 > i >>> 0);) {
                if (!(e = 0 | _e[n + 8 >> 2])) {
                  b = 118;
                  break r;
                }

                n = e;
              }

              if ((r = a - o & t) >>> 0 < 2147483647) {
                if ((0 | (e = 0 | me(0 | r))) == ((0 | _e[n >> 2]) + (0 | _e[M >> 2]) | 0)) {
                  if (-1 != (0 | e)) {
                    o = r, a = e, b = 135;
                    break e;
                  }
                } else n = e, b = 126;
              } else r = 0;
            } else b = 118;
          } while (0);

          do {
            if (118 == (0 | b)) if (-1 != (0 | (i = 0 | me(0))) && (r = i, E = (r = (0 == ((E = (d = 0 | _e[1263]) + -1 | 0) & r | 0) ? 0 : (E + r & 0 - d) - r | 0) + l | 0) + (d = 0 | _e[1252]) | 0, s >>> 0 < r >>> 0 & r >>> 0 < 2147483647)) {
              if (0 | (M = 0 | _e[1254]) && E >>> 0 <= d >>> 0 | M >>> 0 < E >>> 0) {
                r = 0;
                break;
              }

              if ((0 | (e = 0 | me(0 | r))) == (0 | i)) {
                o = r, a = i, b = 135;
                break e;
              }

              n = e, b = 126;
            } else r = 0;
          } while (0);

          do {
            if (126 == (0 | b)) {
              if (i = 0 - r | 0, !(r >>> 0 < u >>> 0 & r >>> 0 < 2147483647 & -1 != (0 | n))) {
                if (-1 == (0 | n)) {
                  r = 0;
                  break;
                }

                o = r, a = n, b = 135;
                break e;
              }

              if (2147483647 <= (e = f - r + (e = 0 | _e[1264]) & 0 - e) >>> 0) {
                o = r, a = n, b = 135;
                break e;
              }

              if (-1 == (0 | me(0 | e))) {
                me(0 | i), r = 0;
                break;
              }

              o = e + r | 0, a = n, b = 135;
              break e;
            }
          } while (0);

          _e[1255] = 4 | _e[1255], b = 133;
        }
      } while (0);

      if (133 == (0 | b) && l >>> 0 < 2147483647 && !(-1 == (0 | (h = 0 | me(0 | l))) | 1 ^ (A = (s + 40 | 0) >>> 0 < (T = (M = 0 | me(0)) - h | 0) >>> 0) | h >>> 0 < M >>> 0 & -1 != (0 | h) & -1 != (0 | M) ^ 1) && (o = A ? T : r, a = h, b = 135), 135 == (0 | b)) {
        r = (0 | _e[1252]) + o | 0, (_e[1252] = r) >>> 0 > (0 | _e[1253]) >>> 0 && (_e[1253] = r), f = 0 | _e[1150];

        do {
          if (f) {
            for (r = 5024;;) {
              if ((0 | a) == ((e = 0 | _e[r >> 2]) + (n = 0 | _e[(i = r + 4 | 0) >> 2]) | 0)) {
                b = 145;
                break;
              }

              if (!(t = 0 | _e[r + 8 >> 2])) break;
              r = t;
            }

            if (145 == (0 | b) && 0 == (8 & _e[r + 12 >> 2] | 0) && f >>> 0 < a >>> 0 & e >>> 0 <= f >>> 0) {
              _e[i >> 2] = n + o, b = f + (m = 0 == (7 & (m = f + 8 | 0) | 0) ? 0 : 0 - m & 7) | 0, m = (0 | _e[1147]) + (o - m) | 0, _e[1150] = b, _e[1147] = m, _e[b + 4 >> 2] = 1 | m, _e[b + m + 4 >> 2] = 40, _e[1151] = _e[1266];
              break;
            }

            for (a >>> 0 < (0 | _e[1148]) >>> 0 && (_e[1148] = a), i = a + o | 0, r = 5024;;) {
              if ((0 | _e[r >> 2]) == (0 | i)) {
                b = 153;
                break;
              }

              if (!(e = 0 | _e[r + 8 >> 2])) break;
              r = e;
            }

            if (153 == (0 | b) && 0 == (8 & _e[r + 12 >> 2] | 0)) {
              _e[r >> 2] = a, _e[(c = r + 4 | 0) >> 2] = (0 | _e[c >> 2]) + o, l = (c = a + (0 == (7 & (c = a + 8 | 0) | 0) ? 0 : 0 - c & 7) | 0) + s | 0, u = (r = i + (0 == (7 & (r = i + 8 | 0) | 0) ? 0 : 0 - r & 7) | 0) - c - s | 0, _e[c + 4 >> 2] = 3 | s;

              do {
                if ((0 | r) != (0 | f)) {
                  if ((0 | r) == (0 | _e[1149])) {
                    m = (0 | _e[1146]) + u | 0, _e[1146] = m, _e[1149] = l, _e[l + 4 >> 2] = 1 | m, _e[l + m >> 2] = m;
                    break;
                  }

                  if (1 == (3 & (e = 0 | _e[r + 4 >> 2]) | 0)) {
                    o = -8 & e, n = e >>> 3;

                    e: do {
                      if (e >>> 0 < 256) {
                        if (e = 0 | _e[r + 8 >> 2], (0 | (i = 0 | _e[r + 12 >> 2])) == (0 | e)) {
                          _e[1144] = _e[1144] & ~(1 << n);
                          break;
                        }

                        _e[e + 12 >> 2] = i, _e[i + 8 >> 2] = e;
                        break;
                      }

                      a = 0 | _e[r + 24 >> 2], e = 0 | _e[r + 12 >> 2];

                      do {
                        if ((0 | e) == (0 | r)) {
                          if (!(e = 0 | _e[(i = (n = r + 16 | 0) + 4 | 0) >> 2])) {
                            if (!(e = 0 | _e[n >> 2])) {
                              e = 0;
                              break;
                            }

                            i = n;
                          }

                          for (;;) {
                            if (0 | (t = 0 | _e[(n = e + 20 | 0) >> 2])) e = t, i = n;else {
                              if (!(t = 0 | _e[(n = e + 16 | 0) >> 2])) break;
                              e = t, i = n;
                            }
                          }

                          _e[i >> 2] = 0;
                        } else m = 0 | _e[r + 8 >> 2], _e[m + 12 >> 2] = e, _e[e + 8 >> 2] = m;
                      } while (0);

                      if (!a) break;
                      n = 4880 + ((i = 0 | _e[r + 28 >> 2]) << 2) | 0;

                      do {
                        if ((0 | r) == (0 | _e[n >> 2])) {
                          if (0 | (_e[n >> 2] = e)) break;
                          _e[1145] = _e[1145] & ~(1 << i);
                          break e;
                        }

                        if (!(_e[a + 16 + (((0 | _e[a + 16 >> 2]) != (0 | r) & 1) << 2) >> 2] = e)) break e;
                      } while (0);

                      if (_e[e + 24 >> 2] = a, 0 | (n = 0 | _e[(i = r + 16 | 0) >> 2]) && (_e[e + 16 >> 2] = n, _e[n + 24 >> 2] = e), !(i = 0 | _e[i + 4 >> 2])) break;
                      _e[e + 20 >> 2] = i, _e[i + 24 >> 2] = e;
                    } while (0);

                    r = r + o | 0, t = o + u | 0;
                  } else t = u;

                  if (_e[(r = r + 4 | 0) >> 2] = -2 & _e[r >> 2], _e[l + 4 >> 2] = 1 | t, r = (_e[l + t >> 2] = t) >>> 3, t >>> 0 < 256) {
                    i = 4616 + (r << 1 << 2) | 0, (e = 0 | _e[1144]) & (r = 1 << r) ? r = 0 | _e[(e = i + 8 | 0) >> 2] : (_e[1144] = e | r, e = (r = i) + 8 | 0), _e[e >> 2] = l, _e[r + 12 >> 2] = l, _e[l + 8 >> 2] = r, _e[l + 12 >> 2] = i;
                    break;
                  }

                  r = t >>> 8;

                  do {
                    if (r) {
                      if (16777215 < t >>> 0) {
                        r = 31;
                        break;
                      }

                      r = t >>> ((r = 14 - ((h = ((m = r << (b = (r + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4) | b | (r = ((m <<= h) + 245760 | 0) >>> 16 & 2)) + (m << r >>> 15) | 0) + 7 | 0) & 1 | r << 1;
                    } else r = 0;
                  } while (0);

                  if (n = 4880 + (r << 2) | 0, _e[l + 28 >> 2] = r, _e[(e = l + 16 | 0) + 4 >> 2] = 0, !((e = (_e[e >> 2] = 0) | _e[1145]) & (i = 1 << r))) {
                    _e[1145] = e | i, _e[n >> 2] = l, _e[l + 24 >> 2] = n, _e[l + 12 >> 2] = l, _e[l + 8 >> 2] = l;
                    break;
                  }

                  for (e = t << (31 == (0 | r) ? 0 : 25 - (r >>> 1) | 0), i = 0 | _e[n >> 2];;) {
                    if ((-8 & _e[i + 4 >> 2] | 0) == (0 | t)) {
                      b = 194;
                      break;
                    }

                    if (!(r = 0 | _e[(n = i + 16 + (e >>> 31 << 2) | 0) >> 2])) {
                      b = 193;
                      break;
                    }

                    e <<= 1, i = r;
                  }

                  if (193 == (0 | b)) {
                    _e[n >> 2] = l, _e[l + 24 >> 2] = i, _e[l + 12 >> 2] = l, _e[l + 8 >> 2] = l;
                    break;
                  }

                  if (194 == (0 | b)) {
                    m = 0 | _e[(b = i + 8 | 0) >> 2], _e[m + 12 >> 2] = l, _e[b >> 2] = l, _e[l + 8 >> 2] = m, _e[l + 12 >> 2] = i, _e[l + 24 >> 2] = 0;
                    break;
                  }
                } else m = (0 | _e[1147]) + u | 0, _e[1147] = m, _e[1150] = l, _e[l + 4 >> 2] = 1 | m;
              } while (0);

              return Me = p, 0 | (m = c + 8 | 0);
            }

            for (r = 5024; !((e = 0 | _e[r >> 2]) >>> 0 <= f >>> 0 && f >>> 0 < (m = e + (0 | _e[r + 4 >> 2]) | 0) >>> 0);) {
              r = 0 | _e[r + 8 >> 2];
            }

            for (r = (e = (e = (t = m + -47 | 0) + (0 == (7 & (e = t + 8 | 0) | 0) ? 0 : 0 - e & 7) | 0) >>> 0 < (t = f + 16 | 0) >>> 0 ? f : e) + 8 | 0, b = a + (i = 0 == (7 & (i = a + 8 | 0) | 0) ? 0 : 0 - i & 7) | 0, i = o + -40 - i | 0, _e[1150] = b, _e[1147] = i, _e[b + 4 >> 2] = 1 | i, _e[b + i + 4 >> 2] = 40, _e[1151] = _e[1266], _e[(i = e + 4 | 0) >> 2] = 27, _e[r >> 2] = _e[1256], _e[r + 4 >> 2] = _e[1257], _e[r + 8 >> 2] = _e[1258], _e[r + 12 >> 2] = _e[1259], _e[1256] = a, _e[1257] = o, _e[1259] = 0, _e[1258] = r, r = e + 24 | 0; _e[(r = (b = r) + 4 | 0) >> 2] = 7, (b + 8 | 0) >>> 0 < m >>> 0;) {
              ;
            }

            if ((0 | e) != (0 | f)) {
              if (a = e - f | 0, _e[i >> 2] = -2 & _e[i >> 2], _e[f + 4 >> 2] = 1 | a, r = (_e[e >> 2] = a) >>> 3, a >>> 0 < 256) {
                i = 4616 + (r << 1 << 2) | 0, (e = 0 | _e[1144]) & (r = 1 << r) ? r = 0 | _e[(e = i + 8 | 0) >> 2] : (_e[1144] = e | r, e = (r = i) + 8 | 0), _e[e >> 2] = f, _e[r + 12 >> 2] = f, _e[f + 8 >> 2] = r, _e[f + 12 >> 2] = i;
                break;
              }

              if (n = 4880 + ((i = (r = a >>> 8) ? 16777215 < a >>> 0 ? 31 : a >>> ((i = 14 - ((h = ((m = r << (b = (r + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4) | b | (i = ((m <<= h) + 245760 | 0) >>> 16 & 2)) + (m << i >>> 15) | 0) + 7 | 0) & 1 | i << 1 : 0) << 2) | 0, _e[f + 28 >> 2] = i, _e[f + 20 >> 2] = 0, !((r = (_e[t >> 2] = 0) | _e[1145]) & (e = 1 << i))) {
                _e[1145] = r | e, _e[n >> 2] = f, _e[f + 24 >> 2] = n, _e[f + 12 >> 2] = f, _e[f + 8 >> 2] = f;
                break;
              }

              for (e = a << (31 == (0 | i) ? 0 : 25 - (i >>> 1) | 0), i = 0 | _e[n >> 2];;) {
                if ((-8 & _e[i + 4 >> 2] | 0) == (0 | a)) {
                  b = 216;
                  break;
                }

                if (!(r = 0 | _e[(n = i + 16 + (e >>> 31 << 2) | 0) >> 2])) {
                  b = 215;
                  break;
                }

                e <<= 1, i = r;
              }

              if (215 == (0 | b)) {
                _e[n >> 2] = f, _e[f + 24 >> 2] = i, _e[f + 12 >> 2] = f, _e[f + 8 >> 2] = f;
                break;
              }

              if (216 == (0 | b)) {
                m = 0 | _e[(b = i + 8 | 0) >> 2], _e[m + 12 >> 2] = f, _e[b >> 2] = f, _e[f + 8 >> 2] = m, _e[f + 12 >> 2] = i, _e[f + 24 >> 2] = 0;
                break;
              }
            }
          } else {
            for (0 == (0 | (m = 0 | _e[1148])) | a >>> 0 < m >>> 0 && (_e[1148] = a), _e[1256] = a, _e[1257] = o, _e[1259] = 0, _e[1153] = _e[1262], _e[1152] = -1, r = 0; _e[(m = 4616 + (r << 1 << 2) | 0) + 12 >> 2] = m, _e[m + 8 >> 2] = m, 32 != (0 | (r = r + 1 | 0));) {
              ;
            }

            b = a + (m = 0 == (7 & (m = a + 8 | 0) | 0) ? 0 : 0 - m & 7) | 0, m = o + -40 - m | 0, _e[1150] = b, _e[1147] = m, _e[b + 4 >> 2] = 1 | m, _e[b + m + 4 >> 2] = 40, _e[1151] = _e[1266];
          }
        } while (0);

        if (s >>> 0 < (r = 0 | _e[1147]) >>> 0) return h = r - s | 0, _e[1147] = h, b = (m = 0 | _e[1150]) + s | 0, _e[1150] = b, _e[b + 4 >> 2] = 1 | h, _e[m + 4 >> 2] = 3 | s, Me = p, 0 | (m = m + 8 | 0);
      }

      return _e[(m = 296) >> 2] = 12, Me = p, (m = 0) | m;
    }

    function D(e, r, i, n, t, a) {
      e |= 0, r = +r, i |= 0, n |= 0, t |= 0, a |= 0;
      var o,
          u = 0,
          f = 0,
          l = 0,
          c = 0,
          s = 0,
          _ = 0,
          d = 0,
          E = 0,
          M = 0,
          T = 0,
          A = 0,
          h = 0,
          b = 0,
          m = 0,
          p = 0,
          S = 0,
          v = 0,
          k = 0,
          y = 0,
          g = 0,
          O = 0,
          R = 0,
          C = Me;
      Me = Me + 560 | 0, l = C + 8 | 0, O = R = (A = C) + 524 | 0, g = (c = C + 512 | 0) + 12 | (_e[A >> 2] = 0), Pe(r), v = (0 | P) < 0 ? (r = -r, k = 1, 2087) : (k = 0 != (2049 & t | 0) & 1, 0 == (2048 & t | 0) ? 0 == (1 & t | 0) ? 2088 : 2093 : 2090), Pe(r), y = 2146435072 & P;

      do {
        if (y >>> 0 < 2146435072 | 2146435072 == (0 | y) & !1) {
          if ((u = 0 != (E = 2 * (o = A, + + +function e(r, i) {
            r = +r, i |= 0;
            var n = 0,
                t = 0,
                a = 0;

            switch (N[w >> 3] = r, n = 0 | _e[w >> 2], t = 0 | _e[w + 4 >> 2], 2047 & (a = 0 | Ce(0 | n, 0 | t, 52))) {
              case 0:
                n = 0 != r ? (r = +e(0x10000000000000000 * r, i), (0 | _e[i >> 2]) - 64 | 0) : 0, _e[i >> 2] = n;
                break;

              case 2047:
                break;

              default:
                _e[i >> 2] = (2047 & a) - 1022, _e[w >> 2] = n, _e[w + 4 >> 2] = -2146435073 & t | 1071644672, r = +N[w >> 3];
            }

            return +r;
          }(+r, o |= 0)))) && (_e[A >> 2] = (0 | _e[A >> 2]) - 1), 97 == (0 | (b = 32 | a))) {
            d = 0 == (0 | (M = 32 & a)) ? v : v + 9 | 0, _ = 2 | k, u = 12 - n | 0;

            do {
              if (!(11 < n >>> 0 | 0 == (0 | u))) {
                for (r = 8; r *= 16, 0 != (0 | (u = u + -1 | 0));) {
                  ;
                }

                if (45 == (0 | se[d >> 0])) {
                  r = -(r + (-E - r));
                  break;
                }

                r = E + r - r;
                break;
              }

              r = E;
            } while (0);

            for ((0 | (u = 0 | le(u = (0 | (f = 0 | _e[A >> 2])) < 0 ? 0 - f | 0 : f, ((0 | u) < 0) << 31 >> 31, g))) == (0 | g) && (se[(u = c + 11 | 0) >> 0] = 48), se[u + -1 >> 0] = 43 + (f >> 31 & 2), se[(s = u + -2 | 0) >> 0] = a + 15, c = (0 | n) < 1, l = 0 == (8 & t | 0), u = R; y = ~~r, f = u + 1 | 0, se[u >> 0] = de[2122 + y >> 0] | M, r = 16 * (r - (0 | y)), u = 1 != (f - O | 0) || l & c & 0 == r ? f : (se[f >> 0] = 46, u + 2 | 0), 0 != r;) {
              ;
            }

            y = u - O | 0, he(e, 32, i, u = (O = g - s | 0) + _ + (g = 0 != (0 | n) & (y + -2 | 0) < (0 | n) ? n + 2 | 0 : y) | 0, t), De(e, d, _), he(e, 48, i, u, 65536 ^ t), De(e, R, y), he(e, 48, g - y | 0, 0, 0), De(e, s, O), he(e, 32, i, u, 8192 ^ t);
            break;
          }

          for (f = (0 | n) < 0 ? 6 : n, u ? (u = (0 | _e[A >> 2]) - 28 | 0, _e[A >> 2] = u, r = 268435456 * E) : (r = E, u = 0 | _e[A >> 2]), l = y = (0 | u) < 0 ? l : l + 288 | 0; p = ~~r >>> 0, _e[l >> 2] = p, l = l + 4 | 0, 0 != (r = 1e9 * (r - (p >>> 0)));) {
            ;
          }

          if (0 < (0 | u)) for (c = y, _ = l;;) {
            if (s = (0 | u) < 29 ? u : 29, c >>> 0 <= (u = _ + -4 | 0) >>> 0) {
              for (l = 0; h = 0 | ke(0 | (m = 0 | Ie(0 | (m = 0 | Re(0 | _e[u >> 2], 0, 0 | s)), 0 | P, 0 | l, 0)), 0 | (p = P), 1e9, 0), _e[u >> 2] = h, l = 0 | xe(0 | m, 0 | p, 1e9, 0), c >>> 0 <= (u = u + -4 | 0) >>> 0;) {
                ;
              }

              l && (_e[(c = c + -4 | 0) >> 2] = l);
            }

            for (l = _; !(l >>> 0 <= c >>> 0 || 0 | _e[(u = l + -4 | 0) >> 2]);) {
              l = u;
            }

            if (u = (0 | _e[A >> 2]) - s | 0, !(0 < (0 | (_e[A >> 2] = u)))) break;
            _ = l;
          } else c = y;

          if ((0 | u) < 0) {
            n = 1 + ((f + 25 | 0) / 9 | 0) | 0, T = 102 == (0 | b);

            do {
              if (M = (0 | (M = 0 - u | 0)) < 9 ? M : 9, c >>> 0 < l >>> 0) {
                for (s = (1 << M) - 1 | 0, _ = 1e9 >>> M, d = 0, u = c; p = 0 | _e[u >> 2], _e[u >> 2] = (p >>> M) + d, d = 0 | te(p & s, _), (u = u + 4 | 0) >>> 0 < l >>> 0;) {
                  ;
                }

                u = 0 == (0 | _e[c >> 2]) ? c + 4 | 0 : c, u = d ? (_e[l >> 2] = d, c = u, l + 4 | 0) : (c = u, l);
              } else c = 0 == (0 | _e[c >> 2]) ? c + 4 | 0 : c, u = l;

              l = (0 | n) < (u - (l = T ? y : c) >> 2 | 0) ? l + (n << 2) | 0 : u, u = (0 | _e[A >> 2]) + M | 0, _e[A >> 2] = u;
            } while ((0 | u) < 0);

            u = c, n = l;
          } else u = c, n = l;

          if (p = y, u >>> 0 < n >>> 0) {
            if (l = 9 * (p - u >> 2) | 0, 10 <= (s = 0 | _e[u >> 2]) >>> 0) for (c = 10; l = l + 1 | 0, (c = 10 * c | 0) >>> 0 <= s >>> 0;) {
              ;
            }
          } else l = 0;

          if ((0 | (c = f - (102 != (0 | b) ? l : 0) + (((h = 0 != (0 | f)) & (T = 103 == (0 | b))) << 31 >> 31) | 0)) < ((9 * (n - p >> 2) | 0) - 9 | 0)) {
            if (M = y + 4 + (((0 | (c = c + 9216 | 0)) / 9 | 0) - 1024 << 2) | 0, (0 | (c = 1 + ((0 | c) % 9 | 0) | 0)) < 9) for (s = 10; s = 10 * s | 0, 9 != (0 | (c = c + 1 | 0));) {
              ;
            } else s = 10;
            if ((c = (M + 4 | 0) == (0 | n)) & 0 == (0 | (d = ((_ = 0 | _e[M >> 2]) >>> 0) % (s >>> 0) | 0))) c = M;else if (E = 0 == (1 & ((_ >>> 0) / (s >>> 0) | 0) | 0) ? 9007199254740992 : 9007199254740994, r = d >>> 0 < (m = (0 | s) / 2 | 0) >>> 0 ? .5 : c & (0 | d) == (0 | m) ? 1 : 1.5, k && (r = (m = 45 == (0 | se[v >> 0])) ? -r : r, E = m ? -E : E), c = _ - d | 0, _e[M >> 2] = c, E + r != E) {
              if (m = c + s | 0, 999999999 < (_e[M >> 2] = m) >>> 0) for (l = M; (c = l + -4 | 0) >>> (_e[l >> 2] = 0) < u >>> 0 && (_e[(u = u + -4 | 0) >> 2] = 0), m = 1 + (0 | _e[c >> 2]) | 0, 999999999 < (_e[c >> 2] = m) >>> 0;) {
                l = c;
              } else c = M;
              if (l = 9 * (p - u >> 2) | 0, 10 <= (_ = 0 | _e[u >> 2]) >>> 0) for (s = 10; l = l + 1 | 0, (s = 10 * s | 0) >>> 0 <= _ >>> 0;) {
                ;
              }
            } else c = M;
            c = (c = c + 4 | 0) >>> 0 < n >>> 0 ? c : n, m = u;
          } else c = n, m = u;

          for (b = c;;) {
            if (b >>> 0 <= m >>> 0) {
              A = 0;
              break;
            }

            if (0 | _e[(u = b + -4 | 0) >> 2]) {
              A = 1;
              break;
            }

            b = u;
          }

          n = 0 - l | 0;

          do {
            if (T) {
              if (f = (0 | l) < (0 | (u = (1 & (1 ^ h)) + f | 0)) & -5 < (0 | l) ? (s = a + -1 | 0, u + -1 - l | 0) : (s = a + -2 | 0, u + -1 | 0), !(u = 8 & t)) {
                if (A && 0 != (0 | (S = 0 | _e[b + -4 >> 2]))) {
                  if ((S >>> 0) % 10 | 0) c = 0;else for (c = 0, u = 10; c = c + 1 | 0, !((S >>> 0) % ((u = 10 * u | 0) >>> 0) | 0);) {
                    ;
                  }
                } else c = 9;

                if (u = (9 * (b - p >> 2) | 0) - 9 | 0, 102 == (32 | s)) {
                  f = (0 | f) < (0 | (M = 0 < (0 | (M = u - c | 0)) ? M : 0)) ? f : M, M = 0;
                  break;
                }

                f = (0 | f) < (0 | (M = 0 < (0 | (M = u + l - c | 0)) ? M : 0)) ? f : M, M = 0;
                break;
              }

              M = u;
            } else s = a, M = 8 & t;
          } while (0);

          if (_ = 0 != (0 | (T = f | M)) & 1, d = 102 == (32 | s)) u = (h = 0) < (0 | l) ? l : 0;else {
            if (((c = g) - (u = 0 | le(u = (0 | l) < 0 ? n : l, ((0 | u) < 0) << 31 >> 31, g)) | 0) < 2) for (; se[(u = u + -1 | 0) >> 0] = 48, (c - u | 0) < 2;) {
              ;
            }
            se[u + -1 >> 0] = 43 + (l >> 31 & 2), se[(u = u + -2 | 0) >> 0] = s, u = c - (h = u) | 0;
          }

          if (he(e, 32, i, u = k + 1 + f + _ + u | 0, t), De(e, v, k), he(e, 48, i, u, 65536 ^ t), d) {
            _ = M = R + 9 | 0, d = R + 8 | 0, c = s = y >>> 0 < m >>> 0 ? y : m;

            do {
              if (l = 0 | le(0 | _e[c >> 2], 0, M), (0 | c) == (0 | s)) (0 | l) == (0 | M) && (se[d >> 0] = 48, l = d);else if (R >>> 0 < l >>> 0) for (ae(0 | R, 48, l - O | 0); R >>> 0 < (l = l + -1 | 0) >>> 0;) {
                ;
              }
              De(e, l, _ - l | 0), c = c + 4 | 0;
            } while (c >>> 0 <= y >>> 0);

            if (0 | T && De(e, 2138, 1), c >>> 0 < b >>> 0 & 0 < (0 | f)) for (;;) {
              if (R >>> 0 < (l = 0 | le(0 | _e[c >> 2], 0, M)) >>> 0) for (ae(0 | R, 48, l - O | 0); R >>> 0 < (l = l + -1 | 0) >>> 0;) {
                ;
              }

              if (De(e, l, (0 | f) < 9 ? f : 9), l = f + -9 | 0, !((c = c + 4 | 0) >>> 0 < b >>> 0 & 9 < (0 | f))) {
                f = l;
                break;
              }

              f = l;
            }
            he(e, 48, f + 9 | 0, 9, 0);
          } else {
            if (T = A ? b : m + 4 | 0, -1 < (0 | f)) {
              M = 0 == (0 | M), n = A = R + 9 | 0, _ = 0 - O | 0, d = R + 8 | 0, s = m;

              do {
                (0 | (l = 0 | le(0 | _e[s >> 2], 0, A))) == (0 | A) && (se[d >> 0] = 48, l = d);

                do {
                  if ((0 | s) == (0 | m)) {
                    if (c = l + 1 | 0, De(e, l, 1), M & (0 | f) < 1) {
                      l = c;
                      break;
                    }

                    De(e, 2138, 1), l = c;
                  } else {
                    if (l >>> 0 <= R >>> 0) break;

                    for (ae(0 | R, 48, l + _ | 0); R >>> 0 < (l = l + -1 | 0) >>> 0;) {
                      ;
                    }
                  }
                } while (0);

                De(e, l, (0 | (O = n - l | 0)) < (0 | f) ? O : f), f = f - O | 0, s = s + 4 | 0;
              } while (s >>> 0 < T >>> 0 & -1 < (0 | f));
            }

            he(e, 48, f + 18 | 0, 18, 0), De(e, h, g - h | 0);
          }

          he(e, 32, i, u, 8192 ^ t);
        } else R = 0 != (32 & a | 0), he(e, 32, i, u = k + 3 | 0, -65537 & t), De(e, v, k), De(e, r != r | !1 ? R ? 2114 : 2118 : R ? 2106 : 2110, 3), he(e, 32, i, u, 8192 ^ t);
      } while (0);

      return Me = C, 0 | ((0 | u) < (0 | i) ? i : u);
    }

    function U(e, r, i, n, t) {
      e |= 0, r |= 0, i |= 0, n |= 0, t |= 0;

      var a,
          o,
          u,
          f,
          l,
          c,
          s,
          _,
          d,
          E = 0,
          M = 0,
          T = 0,
          A = 0,
          h = 0,
          b = 0,
          m = 0,
          p = 0,
          S = 0,
          v = 0,
          k = 0,
          y = 0,
          g = 0,
          O = 0,
          R = Me;

      Me = Me + 64 | 0, O = (c = R) + 24 | 0, s = R + 8 | 0, _ = R + 20 | 0, _e[(l = R + 16 | 0) >> 2] = r, a = 0 != (0 | e), u = o = O + 40 | 0, O = O + 39 | 0, f = 4 + s | 0, b = E = M = 0;

      e: for (;;) {
        do {
          if (-1 < (0 | E)) {
            if ((2147483647 - E | 0) < (0 | M)) {
              _e[(E = 296) >> 2] = 75, E = -1;
              break;
            }

            E = M + E | 0;
            break;
          }
        } while (0);

        if (!((M = 0 | se[r >> 0]) << 24 >> 24)) {
          g = 87;
          break;
        }

        T = r;

        r: for (;;) {
          switch (M << 24 >> 24) {
            case 37:
              M = T, g = 9;
              break r;

            case 0:
              M = T;
              break r;
          }

          y = T + 1 | 0, _e[l >> 2] = y, M = 0 | se[y >> 0], T = y;
        }

        r: do {
          if (9 == (0 | g)) for (;;) {
            if (37 != ((g = 0) | se[T + 1 >> 0])) break r;
            if (M = M + 1 | 0, T = T + 2 | 0, _e[l >> 2] = T, 37 != (0 | se[T >> 0])) break;
            g = 9;
          }
        } while (0);

        if (M = M - r | 0, a && De(e, r, M), 0 | M) r = T;else {
          (M = (0 | se[(A = T + 1 | 0) >> 0]) - 48 | 0) >>> 0 < 10 ? (k = (y = 36 == (0 | se[T + 2 >> 0])) ? M : -1, b = y ? 1 : b, A = y ? T + 3 | 0 : A) : k = -1, _e[l >> 2] = A, T = ((M = 0 | se[A >> 0]) << 24 >> 24) - 32 | 0;

          r: do {
            if (T >>> 0 < 32) for (h = 0, m = M;;) {
              if (!(75913 & (M = 1 << T))) {
                M = m;
                break r;
              }

              if (h |= M, A = A + 1 | 0, _e[l >> 2] = A, 32 <= (T = ((M = 0 | se[A >> 0]) << 24 >> 24) - 32 | 0) >>> 0) break;
              m = M;
            } else h = 0;
          } while (0);

          if (M << 24 >> 24 == 42) {
            if ((M = (0 | se[(T = A + 1 | 0) >> 0]) - 48 | 0) >>> 0 < 10 && 36 == (0 | se[A + 2 >> 0])) _e[t + (M << 2) >> 2] = 10, M = 0 | _e[n + ((0 | se[T >> 0]) - 48 << 3) >> 2], b = 1, A = A + 3 | 0;else {
              if (0 | b) {
                E = -1;
                break;
              }

              A = (b = a ? (b = 3 + (0 | _e[i >> 2]) & -4, M = 0 | _e[b >> 2], _e[i >> 2] = b + 4, 0) : M = 0, T);
            }
            _e[l >> 2] = A, M = (y = (0 | M) < 0) ? 0 - M | 0 : M, h = y ? 8192 | h : h;
          } else {
            if ((0 | (M = 0 | pe(l))) < 0) {
              E = -1;
              break;
            }

            A = 0 | _e[l >> 2];
          }

          do {
            if (46 == (0 | se[A >> 0])) {
              if (42 != (0 | se[A + 1 >> 0])) {
                _e[l >> 2] = A + 1, T = 0 | pe(l), A = 0 | _e[l >> 2];
                break;
              }

              if ((T = (0 | se[(m = A + 2 | 0) >> 0]) - 48 | 0) >>> 0 < 10 && 36 == (0 | se[A + 3 >> 0])) {
                _e[t + (T << 2) >> 2] = 10, T = 0 | _e[n + ((0 | se[m >> 0]) - 48 << 3) >> 2], A = A + 4 | 0, _e[l >> 2] = A;
                break;
              }

              if (0 | b) {
                E = -1;
                break e;
              }

              a ? (y = 3 + (0 | _e[i >> 2]) & -4, T = 0 | _e[y >> 2], _e[i >> 2] = y + 4) : T = 0, A = _e[l >> 2] = m;
            } else T = -1;
          } while (0);

          for (v = 0;;) {
            if (57 < ((0 | se[A >> 0]) - 65 | 0) >>> 0) {
              E = -1;
              break e;
            }

            if (y = A + 1 | 0, _e[l >> 2] = y, !(((p = 255 & (m = 0 | se[(0 | se[A >> 0]) - 65 + (1606 + (58 * v | 0)) >> 0])) + -1 | 0) >>> 0 < 8)) break;
            v = p, A = y;
          }

          if (!(m << 24 >> 24)) {
            E = -1;
            break;
          }

          S = -1 < (0 | k);

          do {
            if (m << 24 >> 24 == 19) {
              if (S) {
                E = -1;
                break e;
              }

              g = 49;
            } else {
              if (S) {
                _e[t + (k << 2) >> 2] = p, k = 0 | _e[(S = n + (k << 3) | 0) + 4 >> 2], _e[(g = c) >> 2] = _e[S >> 2], _e[g + 4 >> 2] = k, g = 49;
                break;
              }

              if (!a) {
                E = 0;
                break e;
              }

              X(c, p, i);
            }
          } while (0);

          if (49 != (0 | g) || (g = 0, a)) {
            A = 0 != (0 | v) & 3 == (15 & (A = 0 | se[A >> 0]) | 0) ? -33 & A : A, S = -65537 & h, k = 0 == (8192 & h | 0) ? h : S;

            r: do {
              switch (0 | A) {
                case 110:
                  switch ((255 & v) << 24 >> 24) {
                    case 0:
                    case 1:
                      _e[_e[c >> 2] >> 2] = E, M = 0, r = y;
                      continue e;

                    case 2:
                      M = 0 | _e[c >> 2], _e[M >> 2] = E, _e[M + 4 >> 2] = ((0 | E) < 0) << 31 >> 31, M = 0, r = y;
                      continue e;

                    case 3:
                      K[_e[c >> 2] >> 1] = E, M = 0, r = y;
                      continue e;

                    case 4:
                      se[_e[c >> 2] >> 0] = E, M = 0, r = y;
                      continue e;

                    case 6:
                      _e[_e[c >> 2] >> 2] = E, M = 0, r = y;
                      continue e;

                    case 7:
                      M = 0 | _e[c >> 2], _e[M >> 2] = E, _e[M + 4 >> 2] = ((0 | E) < 0) << 31 >> 31, M = 0, r = y;
                      continue e;

                    default:
                      M = 0, r = y;
                      continue e;
                  }

                case 112:
                  A = 120, T = 8 < T >>> 0 ? T : 8, r = 8 | k, g = 61;
                  break;

                case 88:
                case 120:
                  r = k, g = 61;
                  break;

                case 111:
                  m = 2070, T = (h = 0) == (8 & k | 0) | (0 | (S = u - (p = 0 | function (e, r, i) {
                    if (i |= 0, !(0 == (0 | (e |= 0)) & 0 == (0 | (r |= 0)))) for (; se[(i = i + -1 | 0) >> 0] = 7 & e | 48, e = 0 | Ce(0 | e, 0 | r, 3), r = P, !(0 == (0 | e) & 0 == (0 | r));) {
                      ;
                    }
                    return 0 | i;
                  }(r = 0 | _e[(A = c) >> 2], A = 0 | _e[A + 4 >> 2], o)) | 0)) < (0 | T) ? T : S + 1 | 0, S = k, g = 67;
                  break;

                case 105:
                case 100:
                  if (r = 0 | _e[(A = c) >> 2], (0 | (A = 0 | _e[A + 4 >> 2])) < 0) {
                    r = 0 | we(0, 0, 0 | r, 0 | A), A = P, _e[(h = c) >> 2] = r, _e[h + 4 >> 2] = A, h = 1, m = 2070, g = 66;
                    break r;
                  }

                  h = 0 != (2049 & k | 0) & 1, m = 0 == (2048 & k | 0) ? 0 == (1 & k | 0) ? 2070 : 2072 : 2071, g = 66;
                  break r;

                case 117:
                  m = 2070, r = (h = 0) | _e[(A = c) >> 2], A = 0 | _e[A + 4 >> 2], g = 66;
                  break;

                case 99:
                  se[O >> 0] = _e[c >> 2], r = O, h = 0, m = 2070, p = o, A = 1, T = S;
                  break;

                case 109:
                  A = 0 | (d = 0 | _e[(A = 296) >> 2], 0 | function (e, r) {
                    e |= 0, r |= 0;
                    var i = 0,
                        n = 0;

                    for (n = 0;;) {
                      if ((0 | de[2140 + n >> 0]) == (0 | e)) {
                        e = 2;
                        break;
                      }

                      if (87 == (0 | (i = n + 1 | 0))) {
                        i = 2228, n = 87, e = 5;
                        break;
                      }

                      n = i;
                    }

                    if (2 == (0 | e) && (n ? (i = 2228, e = 5) : i = 2228), 5 == (0 | e)) for (;;) {
                      for (; i = (e = i) + 1 | 0, 0 != (0 | se[e >> 0]);) {
                        ;
                      }

                      if (!(n = n + -1 | 0)) break;
                      e = 5;
                    }
                    return 0 | function (e, r) {
                      return 0 | function (e, r) {
                        return e |= 0, 0 | (0 | (r = (r |= 0) ? 0 | function (e, r, i) {
                          r |= 0, i |= 0;
                          var n,
                              t = 0,
                              a = 0,
                              o = 0,
                              u = 0,
                              f = 0,
                              l = 0,
                              c = 0,
                              s = 0,
                              _ = 0;
                          n = 1794895138 + (0 | _e[(e |= 0) >> 2]) | 0, o = 0 | Fe(0 | _e[e + 8 >> 2], n), t = 0 | Fe(0 | _e[e + 12 >> 2], n), a = 0 | Fe(0 | _e[e + 16 >> 2], n);

                          i: do {
                            if (o >>> 0 < r >>> 2 >>> 0 && (_ = r - (o << 2) | 0, t >>> 0 < _ >>> 0 & a >>> 0 < _ >>> 0) && 0 == (3 & (a | t) | 0)) {
                              for (_ = t >>> 2, s = a >>> 2, c = 0;;) {
                                if (t = 0 | Fe(0 | _e[e + ((a = (u = (l = c + (f = o >>> 1) | 0) << 1) + _ | 0) << 2) >> 2], n), !((a = 0 | Fe(0 | _e[e + (a + 1 << 2) >> 2], n)) >>> 0 < r >>> 0 & t >>> 0 < (r - a | 0) >>> 0)) {
                                  t = 0;
                                  break i;
                                }

                                if (0 | se[e + (a + t) >> 0]) {
                                  t = 0;
                                  break i;
                                }

                                if (!(t = 0 | function (e, r) {
                                  r |= 0;
                                  var i = 0,
                                      n = 0;
                                  if (i = 0 | se[(e |= 0) >> 0], n = 0 | se[r >> 0], i << 24 >> 24 == 0 || i << 24 >> 24 != n << 24 >> 24) e = n;else {
                                    for (; r = r + 1 | 0, i = 0 | se[(e = e + 1 | 0) >> 0], n = 0 | se[r >> 0], i << 24 >> 24 != 0 && i << 24 >> 24 == n << 24 >> 24;) {
                                      ;
                                    }

                                    e = n;
                                  }
                                  return (255 & i) - (255 & e) | 0;
                                }(i, e + a | 0))) break;

                                if (t = (0 | t) < 0, 1 == (0 | o)) {
                                  t = 0;
                                  break i;
                                }

                                c = t ? c : l, o = t ? f : o - f | 0;
                              }

                              a = 0 | Fe(0 | _e[e + ((t = u + s | 0) << 2) >> 2], n), t = (t = 0 | Fe(0 | _e[e + (t + 1 << 2) >> 2], n)) >>> 0 < r >>> 0 & a >>> 0 < (r - t | 0) >>> 0 && 0 == (0 | se[e + (t + a) >> 0]) ? e + t | 0 : 0;
                            } else t = 0;
                          } while (0);

                          return 0 | t;
                        }(0 | _e[r >> 2], 0 | _e[r + 4 >> 2], e) : 0) ? r : e);
                      }(e |= 0, r |= 0);
                    }(i, 0 | _e[r + 20 >> 2]);
                  }(d |= 0, 0 | _e[105])), g = 71;
                  break;

                case 115:
                  A = 0 | (A = 0 | _e[c >> 2]) ? A : 2080, g = 71;
                  break;

                case 67:
                  _e[s >> 2] = _e[c >> 2], _e[f >> 2] = 0, p = -1, A = _e[c >> 2] = s, g = 75;
                  break;

                case 83:
                  r = 0 | _e[c >> 2], g = T ? (p = T, A = r, 75) : (he(e, 32, M, 0, k), r = 0, 84);
                  break;

                case 65:
                case 71:
                case 70:
                case 69:
                case 97:
                case 103:
                case 102:
                case 101:
                  M = 0 | D(e, +N[c >> 3], M, T, k, A), r = y;
                  continue e;

                default:
                  h = 0, m = 2070, p = o, A = T, T = k;
              }
            } while (0);

            r: do {
              if (61 == (0 | g)) p = 0 | function (e, r, i, n) {
                if (i |= 0, n |= 0, !(0 == (0 | (e |= 0)) & 0 == (0 | (r |= 0)))) for (; se[(i = i + -1 | 0) >> 0] = 0 | de[2122 + (15 & e) >> 0] | n, e = 0 | Ce(0 | e, 0 | r, 4), r = P, !(0 == (0 | e) & 0 == (0 | r));) {
                  ;
                }
                return 0 | i;
              }(v = 0 | _e[(k = c) >> 2], k = 0 | _e[k + 4 >> 2], o, 32 & A), h = (m = 0 == (8 & r | 0) | 0 == (0 | v) & 0 == (0 | k)) ? 0 : 2, m = m ? 2070 : 2070 + (A >> 4) | 0, S = r, r = v, A = k, g = 67;else if (66 == (0 | g)) p = 0 | le(r, A, o), S = k, g = 67;else if (71 == (0 | g)) h = g = 0, m = 2070, p = (v = 0 == (0 | (k = 0 | function (e, r, i) {
                e |= 0;
                var n = 0,
                    t = 0,
                    a = 0,
                    o = 0;
                a = 255 & (r |= 0), n = 0 != (0 | (i |= 0));

                i: do {
                  if (n & 0 != (3 & e | 0)) for (t = 255 & r;;) {
                    if ((0 | se[e >> 0]) == t << 24 >> 24) {
                      o = 6;
                      break i;
                    }

                    if (!((n = 0 != (0 | (i = i + -1 | 0))) & 0 != (3 & (e = e + 1 | 0) | 0))) {
                      o = 5;
                      break;
                    }
                  } else o = 5;
                } while (0);

                5 == (0 | o) && (n ? o = 6 : i = 0);

                i: do {
                  if (6 == (0 | o) && (t = 255 & r, (0 | se[e >> 0]) != t << 24 >> 24)) {
                    n = 0 | te(a, 16843009);

                    n: do {
                      if (3 < i >>> 0) {
                        for (; !((-2139062144 & (a = _e[e >> 2] ^ n) ^ -2139062144) & a + -16843009 | 0);) {
                          if (e = e + 4 | 0, (i = i + -4 | 0) >>> 0 <= 3) {
                            o = 11;
                            break n;
                          }
                        }
                      } else o = 11;
                    } while (0);

                    if (11 == (0 | o) && !i) {
                      i = 0;
                      break;
                    }

                    for (;;) {
                      if ((0 | se[e >> 0]) == t << 24 >> 24) break i;

                      if (e = e + 1 | 0, !(i = i + -1 | 0)) {
                        i = 0;
                        break;
                      }
                    }
                  }
                } while (0);

                return 0 | (0 | i ? e : 0);
              }(r = A, 0, T)))) ? A + T | 0 : k, A = v ? T : k - A | 0, T = S;else if (75 == (0 | g)) {
                for (m = A, T = r = g = 0; (h = 0 | _e[m >> 2]) && !((0 | (T = 0 | Ue(_, h))) < 0 | (p - r | 0) >>> 0 < T >>> 0) && (r = T + r | 0) >>> 0 < p >>> 0;) {
                  m = m + 4 | 0;
                }

                if ((0 | T) < 0) {
                  E = -1;
                  break e;
                }

                if (he(e, 32, M, r, k), r) for (h = 0;;) {
                  if (!(T = 0 | _e[A >> 2])) {
                    g = 84;
                    break r;
                  }

                  if ((0 | r) < (0 | (h = (T = 0 | Ue(_, T)) + h | 0))) {
                    g = 84;
                    break r;
                  }

                  if (De(e, _, T), r >>> 0 <= h >>> 0) {
                    g = 84;
                    break;
                  }

                  A = A + 4 | 0;
                } else r = 0, g = 84;
              }
            } while (0);

            if (67 == (0 | g)) k = (g = 0) != (0 | T) | (A = 0 != (0 | r) | 0 != (0 | A)), A = u - p + (1 & (1 ^ A)) | 0, r = k ? p : o, p = o, A = !k || (0 | A) < (0 | T) ? T : A, T = -1 < (0 | T) ? -65537 & S : S;else if (84 == (0 | g)) {
              g = 0, he(e, 32, M, r, 8192 ^ k), M = (0 | r) < (0 | M) ? M : r, r = y;
              continue;
            }
            he(e, 32, M = (0 | M) < (0 | (k = (S = (0 | A) < (0 | (v = p - r | 0)) ? v : A) + h | 0)) ? k : M, k, T), De(e, m, h), he(e, 48, M, k, 65536 ^ T), he(e, 48, S, v, 0), De(e, r, v), he(e, 32, M, k, 8192 ^ T), r = y;
          } else M = 0, r = y;
        }
      }

      e: do {
        if (87 == (0 | g) && !e) if (b) {
          for (E = 1; r = 0 | _e[t + (E << 2) >> 2];) {
            if (X(n + (E << 3) | 0, r, i), 10 <= (0 | (E = E + 1 | 0))) {
              E = 1;
              break e;
            }
          }

          for (;;) {
            if (0 | _e[t + (E << 2) >> 2]) {
              E = -1;
              break e;
            }

            if (10 <= (0 | (E = E + 1 | 0))) {
              E = 1;
              break;
            }
          }
        } else E = 0;
      } while (0);

      return Me = R, 0 | E;
    }

    function V(e, r) {
      r |= 0;

      var i,
          n,
          t,
          a,
          o,
          u,
          f,
          l,
          c,
          s,
          _,
          d,
          E,
          M,
          T = 0,
          A = 0,
          h = 0,
          b = 0,
          m = 0,
          p = 0,
          S = 0,
          v = 0,
          k = 0,
          y = 0,
          g = Me;

      if (Me = Me + 704 | 0, E = g + 144 | 0, d = g + 128 | 0, _ = g + 112 | 0, s = g + 96 | 0, c = g + 80 | 0, l = g + 64 | 0, f = g + 48 | 0, M = g + 32 | 0, i = g + 16 | 0, t = (p = g) + 184 | 0, y = g + 160 | 0, !(a = 0 | function (e, r) {
        e |= 0;
        var i,
            n,
            t,
            a,
            o = 0,
            u = 0,
            f = 0,
            l = 0;
        if (Me = (a = Me) + 528 | 0, i = (n = a) + 16 | 0, !(r |= 0)) return Me = a, (l = 0) | l;
        if (r >>> 0 <= 16) return l = 0 | ee(e, r), Me = a, 0 | l;
        if (t = 0 | ee(e, r + -16 | 0), (0 | (r = 0 | _e[(l = e + 20 | 0) >> 2])) < 16) for (u = e + 4 | 0, f = e + 8 | 0, o = e + 16 | 0; e = (0 | (e = 0 | _e[u >> 2])) == (0 | _e[f >> 2]) ? 0 : (_e[u >> 2] = e + 1, 0 | de[e >> 0]), r = r + 8 | 0, 33 <= (0 | (_e[l >> 2] = r)) && (_e[n >> 2] = 866, _e[n + 4 >> 2] = 3208, _e[n + 8 >> 2] = 1366, Oe(i, 812, n), Ae(i), r = 0 | _e[l >> 2]), e = e << 32 - r | _e[o >> 2], _e[o >> 2] = e, (0 | r) < 16;) {
          ;
        } else e = 0 | _e[(o = e = e + 16 | 0) >> 2];
        return _e[o >> 2] = e << 16, _e[l >> 2] = r + -16, Me = a, 0 | (l = e >>> 16 | t << 16);
      }(e |= 0, 14))) return function (e) {
        var r,
            i,
            n,
            t,
            a,
            o = 0;
        Me = (a = Me) + 544 | 0, t = a + 16 | 0, n = (i = a) + 32 | 0, (_e[(e |= 0) >> 2] = 0) | (r = 0 | _e[(o = e + 4 | 0) >> 2]) && (7 & r ? (_e[i >> 2] = 866, _e[i + 4 >> 2] = 2506, _e[i + 8 >> 2] = 1232, Oe(n, 812, i), Ae(n)) : fe(r, 0, 0, 1, 0), _e[o >> 2] = 0, _e[e + 8 >> 2] = 0, _e[e + 12 >> 2] = 0);
        if (se[e + 16 >> 0] = 0, !(o = 0 | _e[(e = e + 20 | 0) >> 2])) return Me = a;
        Q(o), 7 & o ? (_e[t >> 2] = 866, _e[4 + t >> 2] = 2506, _e[8 + t >> 2] = 1232, Oe(n, 812, t), Ae(n)) : fe(o, 0, 0, 1, 0);
        _e[e >> 2] = 0, Me = a;
      }(r), Me = g, 0 | (y = 1);

      if (o = r + 4 | 0, (0 | (T = 0 | _e[(u = r + 8 | 0) >> 2])) != (0 | a)) {
        if (T >>> 0 <= a >>> 0) {
          do {
            if ((0 | _e[r + 12 >> 2]) >>> 0 < a >>> 0) {
              if (0 | G(o, a, (T + 1 | 0) == (0 | a), 1, 0)) {
                T = 0 | _e[u >> 2];
                break;
              }

              return se[r + 16 >> 0] = 1, Me = g, (y = 0) | y;
            }
          } while (0);

          ae((0 | _e[o >> 2]) + T | 0, 0, a - T | 0);
        }

        _e[u >> 2] = a;
      }

      if (ae(0 | _e[o >> 2], 0, 0 | a), (0 | (T = 0 | _e[(n = e + 20 | 0) >> 2])) < 5) for (b = e + 4 | 0, m = e + 8 | 0, h = e + 16 | 0; A = (0 | (A = 0 | _e[b >> 2])) == (0 | _e[m >> 2]) ? 0 : (_e[b >> 2] = A + 1, 0 | de[A >> 0]), T = T + 8 | 0, 33 <= (0 | (_e[n >> 2] = T)) && (_e[p >> 2] = 866, _e[p + 4 >> 2] = 3208, _e[p + 8 >> 2] = 1366, Oe(t, 812, p), Ae(t), T = 0 | _e[n >> 2]), A = A << 32 - T | _e[h >> 2], _e[h >> 2] = A, (0 | T) < 5;) {
        ;
      } else A = 0 | _e[(h = A = e + 16 | 0) >> 2];
      if (v = A >>> 27, _e[h >> 2] = A << 5, _e[n >> 2] = T + -5, 20 < (v + -1 | 0) >>> 0) return Me = g, (y = 0) | y;
      _e[y + 20 >> 2] = 0, _e[y >> 2] = 0, _e[y + 4 >> 2] = 0, _e[y + 8 >> 2] = 0, _e[y + 12 >> 2] = 0, T = y + 4 | (se[y + 16 >> 0] = 0), A = y + 8 | 0;

      e: do {
        if (0 | G(T, 21, 0, 1, 0)) {
          b = 0 | _e[A >> 2], ae((S = 0 | _e[T >> 2]) + b | 0, 0, 21 - b | 0), _e[A >> 2] = 21, b = e + 4 | 0, m = e + 8 | 0, p = e + 16 | 0, h = 0;

          do {
            if ((0 | (T = 0 | _e[n >> 2])) < 3) for (; A = (0 | (A = 0 | _e[b >> 2])) == (0 | _e[m >> 2]) ? 0 : (_e[b >> 2] = A + 1, 0 | de[A >> 0]), T = T + 8 | 0, 33 <= (0 | (_e[n >> 2] = T)) && (_e[i >> 2] = 866, _e[4 + i >> 2] = 3208, _e[8 + i >> 2] = 1366, Oe(t, 812, i), Ae(t), T = 0 | _e[n >> 2]), A = A << 32 - T | _e[p >> 2], _e[p >> 2] = A, (0 | T) < 3;) {
              ;
            } else A = 0 | _e[p >> 2];
            _e[p >> 2] = A << 3, _e[n >> 2] = T + -3, se[S + (0 | de[1327 + h >> 0]) >> 0] = A >>> 29, h = h + 1 | 0;
          } while ((0 | h) != (0 | v));

          if (0 | q(y)) {
            p = e + 4 | 0, S = e + 8 | 0, v = e + 16 | 0, T = 0;

            r: do {
              m = a - T | 0, h = 0 | Te(e, y);

              i: do {
                if (h >>> 0 < 17) (0 | _e[u >> 2]) >>> 0 <= T >>> 0 && (_e[M >> 2] = 866, _e[4 + M >> 2] = 910, _e[8 + M >> 2] = 1497, Oe(t, 812, M), Ae(t)), se[(0 | _e[o >> 2]) + T >> 0] = h, T = T + 1 | 0;else switch (0 | h) {
                  case 17:
                    if ((0 | (A = 0 | _e[n >> 2])) < 3) for (; h = (0 | (h = 0 | _e[p >> 2])) == (0 | _e[S >> 2]) ? 0 : (_e[p >> 2] = h + 1, 0 | de[h >> 0]), A = A + 8 | 0, 33 <= (0 | (_e[n >> 2] = A)) && (_e[f >> 2] = 866, _e[4 + f >> 2] = 3208, _e[8 + f >> 2] = 1366, Oe(t, 812, f), Ae(t), A = 0 | _e[n >> 2]), h = h << 32 - A | _e[v >> 2], _e[v >> 2] = h, (0 | A) < 3;) {
                      ;
                    } else h = 0 | _e[v >> 2];

                    if (_e[v >> 2] = h << 3, _e[n >> 2] = A + -3, A = m >>> 0 < (h = 3 + (h >>> 29) | 0) >>> 0) {
                      T = 0;
                      break e;
                    }

                    T = (A ? 0 : h) + T | 0;
                    break i;

                  case 18:
                    if ((0 | (A = 0 | _e[n >> 2])) < 7) for (; h = (0 | (h = 0 | _e[p >> 2])) == (0 | _e[S >> 2]) ? 0 : (_e[p >> 2] = h + 1, 0 | de[h >> 0]), A = A + 8 | 0, 33 <= (0 | (_e[n >> 2] = A)) && (_e[l >> 2] = 866, _e[4 + l >> 2] = 3208, _e[8 + l >> 2] = 1366, Oe(t, 812, l), Ae(t), A = 0 | _e[n >> 2]), h = h << 32 - A | _e[v >> 2], _e[v >> 2] = h, (0 | A) < 7;) {
                      ;
                    } else h = 0 | _e[v >> 2];

                    if (_e[v >> 2] = h << 7, _e[n >> 2] = A + -7, A = m >>> 0 < (h = 11 + (h >>> 25) | 0) >>> 0) {
                      T = 0;
                      break e;
                    }

                    T = (A ? 0 : h) + T | 0;
                    break i;

                  default:
                    if (2 <= (h + -19 | 0) >>> 0) {
                      k = 81;
                      break r;
                    }

                    if (A = 0 | _e[n >> 2], 19 == (0 | h)) {
                      if ((0 | A) < 2) for (h = A; b = (0 | (A = 0 | _e[p >> 2])) == (0 | _e[S >> 2]) ? 0 : (_e[p >> 2] = A + 1, 0 | de[A >> 0]), A = h + 8 | 0, 33 <= (0 | (_e[n >> 2] = A)) && (_e[c >> 2] = 866, _e[4 + c >> 2] = 3208, _e[8 + c >> 2] = 1366, Oe(t, 812, c), Ae(t), A = 0 | _e[n >> 2]), h = b << 32 - A | _e[v >> 2], _e[v >> 2] = h, (0 | A) < 2;) {
                        h = A;
                      } else h = 0 | _e[v >> 2];
                      _e[v >> 2] = h << 2, h >>>= 30, b = 3, A = A + -2 | 0;
                    } else {
                      if ((0 | A) < 6) for (; h = (0 | (h = 0 | _e[p >> 2])) == (0 | _e[S >> 2]) ? 0 : (_e[p >> 2] = h + 1, 0 | de[h >> 0]), A = A + 8 | 0, 33 <= (0 | (_e[n >> 2] = A)) && (_e[s >> 2] = 866, _e[4 + s >> 2] = 3208, _e[8 + s >> 2] = 1366, Oe(t, 812, s), Ae(t), A = 0 | _e[n >> 2]), h = h << 32 - A | _e[v >> 2], _e[v >> 2] = h, (0 | A) < 6;) {
                        ;
                      } else h = 0 | _e[v >> 2];
                      _e[v >> 2] = h << 6, h >>>= 26, b = 7, A = A + -6 | 0;
                    }

                    if (_e[n >> 2] = A, 0 == (0 | T) | m >>> 0 < (h = h + b | 0) >>> 0) {
                      T = 0;
                      break e;
                    }

                    if (A = T + -1 | 0, (0 | _e[u >> 2]) >>> 0 <= A >>> 0 && (_e[_ >> 2] = 866, _e[4 + _ >> 2] = 910, _e[8 + _ >> 2] = 1497, Oe(t, 812, _), Ae(t)), !((b = 0 | se[(0 | _e[o >> 2]) + A >> 0]) << 24 >> 24)) {
                      T = 0;
                      break e;
                    }

                    if ((A = h + T | 0) >>> 0 <= T >>> 0) break i;

                    for (; (0 | _e[u >> 2]) >>> 0 <= T >>> 0 && (_e[d >> 2] = 866, _e[4 + d >> 2] = 910, _e[8 + d >> 2] = 1497, Oe(t, 812, d), Ae(t)), se[(0 | _e[o >> 2]) + T >> 0] = b, (0 | (T = T + 1 | 0)) != (0 | A);) {
                      ;
                    }

                    T = A;
                }
              } while (0);
            } while (T >>> 0 < a >>> 0);

            if (81 == (0 | k)) {
              _e[E >> 2] = 866, _e[4 + E >> 2] = 3149, _e[8 + E >> 2] = 1348, Oe(t, 812, E), Ae(t), T = 0;
              break;
            }

            T = (0 | a) == (0 | T) ? 0 | q(r) : 0;
          } else T = 0;
        } else se[y + 16 >> 0] = 1, T = 0;
      } while (0);

      return ie(y), Me = g, 0 | (y = T);
    }

    function H(e, r, i, n) {
      i |= 0;
      var t,
          a,
          o,
          u,
          f,
          l = 0,
          c = 0,
          s = 0,
          _ = 0,
          d = 0,
          E = 0,
          M = 0,
          T = 0,
          A = 0,
          h = 0,
          b = 0,
          m = 0,
          p = 0,
          S = 0,
          v = 0,
          k = 0,
          y = 0,
          g = 0,
          O = 0,
          R = 0,
          C = 0,
          N = 0,
          w = Me;
      if (Me = Me + 880 | 0, C = w + 144 | 0, f = w + 128 | 0, u = w + 112 | 0, o = w + 96 | 0, O = w + 80 | 0, S = w + 64 | 0, m = w + 48 | 0, p = w + 32 | 0, T = w + 16 | 0, t = (M = w) + 360 | 0, a = w + 296 | 0, N = w + 224 | 0, b = w + 156 | 0, 0 == (0 | (r |= 0)) | 11 < (n |= 0) >>> 0) return Me = w, (N = 0) | N;

      for (_e[(e |= 0) >> 2] = r, c = (l = N) + 68 | 0; (0 | (l = l + 4 | (_e[l >> 2] = 0))) < (0 | c);) {
        ;
      }

      for (l = 0; c = N + ((255 & (R = 0 | se[i + l >> 0])) << 2) | 0, R << 24 >> 24 && (_e[c >> 2] = 1 + (0 | _e[c >> 2])), (0 | (l = l + 1 | 0)) != (0 | r);) {
        ;
      }

      for (_ = s = c = 0, d = -1, E = 1; (l = 0 | _e[N + (E << 2) >> 2]) ? (c = l + (_e[a + ((A = E + -1 | 0) << 2) >> 2] = c) | 0, R = 16 - E | 0, _e[e + 28 + (A << 2) >> 2] = 1 + (c + -1 << R | (1 << R) - 1), _e[e + 96 + (A << 2) >> 2] = s, A = l + (_e[b + (E << 2) >> 2] = s) | 0, _ = E >>> 0 < _ >>> 0 ? _ : E, d = d >>> 0 < E >>> 0 ? d : E) : (_e[e + 28 + (E + -1 << 2) >> 2] = 0, A = s), 17 != (0 | (E = E + 1 | 0));) {
        c <<= 1, s = A;
      }

      _e[e + 4 >> 2] = A, c = e + 172 | 0;

      do {
        if (A >>> 0 > (0 | _e[c >> 2]) >>> 0) {
          l = (l = A + -1 | 0) & A ? (l |= l >>> 16, l |= l >>> 8, l |= l >>> 4, r >>> 0 < (l = 1 + ((l |= l >>> 2) >>> 1 | l) | 0) >>> 0 ? r : l) : A, _e[c >> 2] = l, l = 0 | _e[(s = e + 176 | 0) >> 2];

          do {
            if (0 | l) {
              if (R = 0 | _e[l + -4 >> 2], l = l + -8 | 0, 0 != (0 | R) && (0 | R) == (0 | ~_e[l >> 2]) || (_e[M >> 2] = 866, _e[M + 4 >> 2] = 651, _e[M + 8 >> 2] = 1579, Oe(t, 812, M), Ae(t)), 7 & l) {
                _e[T >> 2] = 866, _e[T + 4 >> 2] = 2506, _e[T + 8 >> 2] = 1232, Oe(t, 812, T), Ae(t);
                break;
              }

              fe(l, 0, 0, 1, 0);
              break;
            }
          } while (0);

          if (c = 0 | ne(8 + ((l = 0 | (l = 0 | _e[c >> 2]) ? l : 1) << 1) | 0, 0)) {
            _e[c + 4 >> 2] = l, _e[c >> 2] = ~l, _e[s >> 2] = c + 8, h = 24;
            break;
          }

          n = _e[s >> 2] = 0;
          break;
        }

        h = 24;
      } while (0);

      e: do {
        if (24 == (0 | h)) {
          for (se[(R = e + 24 | 0) >> 0] = d, se[e + 25 >> 0] = _, s = e + 176 | 0, c = 0; l = 255 & (g = 0 | se[i + c >> 0]), g << 24 >> 24 && (0 | _e[N + (l << 2) >> 2] || (_e[p >> 2] = 866, _e[p + 4 >> 2] = 2276, _e[p + 8 >> 2] = 977, Oe(t, 812, p), Ae(t)), l = 0 | _e[(g = b + (l << 2) | 0) >> 2], _e[g >> 2] = l + 1, A >>> 0 <= l >>> 0 && (_e[m >> 2] = 866, _e[m + 4 >> 2] = 2280, _e[m + 8 >> 2] = 990, Oe(t, 812, m), Ae(t)), K[(0 | _e[s >> 2]) + (l << 1) >> 1] = c), (0 | (c = c + 1 | 0)) != (0 | r);) {
            ;
          }

          if (y = (0 | de[R >> 0]) >>> 0 < n >>> 0 ? n : 0, k = 0 != (0 | (_e[(g = e + 8 | 0) >> 2] = y))) {
            v = 1 << y, l = e + 164 | 0;

            do {
              if (v >>> 0 > (0 | _e[l >> 2]) >>> 0) {
                _e[l >> 2] = v, l = 0 | _e[(s = e + 168 | 0) >> 2];

                do {
                  if (0 | l) {
                    if (p = 0 | _e[l + -4 >> 2], l = l + -8 | 0, 0 != (0 | p) && (0 | p) == (0 | ~_e[l >> 2]) || (_e[S >> 2] = 866, _e[S + 4 >> 2] = 651, _e[S + 8 >> 2] = 1579, Oe(t, 812, S), Ae(t)), 7 & l) {
                      _e[O >> 2] = 866, _e[O + 4 >> 2] = 2506, _e[O + 8 >> 2] = 1232, Oe(t, 812, O), Ae(t);
                      break;
                    }

                    fe(l, 0, 0, 1, 0);
                    break;
                  }
                } while (0);

                if (c = 0 | ne((l = v << 2) + 8 | 0, 0)) {
                  O = c + 8 | 0, _e[c + 4 >> 2] = v, _e[c >> 2] = ~v, c = _e[s >> 2] = O;
                  break;
                }

                n = _e[s >> 2] = 0;
                break e;
              }

              l = v << 2, c = 0 | _e[(s = c = e + 168 | 0) >> 2];
            } while (0);

            ae(0 | c, -1, 0 | l), m = e + 176 | 0, b = 1;

            do {
              if (0 | _e[N + (b << 2) >> 2] && (S = 1 << (p = y - b | 0), c = 0 | _e[a + ((l = b + -1 | 0) << 2) >> 2], 16 <= l >>> 0 && (_e[o >> 2] = 866, _e[4 + o >> 2] = 1960, _e[8 + o >> 2] = 1453, Oe(t, 812, o), Ae(t)), c >>> 0 <= (r = 0 == (0 | (r = 0 | _e[e + 28 + (l << 2) >> 2])) ? -1 : (r + -1 | 0) >>> (16 - b | 0)) >>> 0)) {
                A = (0 | _e[e + 96 + (l << 2) >> 2]) - c | 0, h = b << 16;

                do {
                  for (l = 0 | Ee[(0 | _e[m >> 2]) + (A + c << 1) >> 1], (0 | de[i + l >> 0]) != (0 | b) && (_e[u >> 2] = 866, _e[4 + u >> 2] = 2322, _e[8 + u >> 2] = 1019, Oe(t, 812, u), Ae(t)), T = c << p, E = l | h, d = 0; v >>> 0 <= (M = d + T | 0) >>> 0 && (_e[f >> 2] = 866, _e[4 + f >> 2] = 2328, _e[8 + f >> 2] = 1053, Oe(t, 812, f), Ae(t)), l = 0 | _e[s >> 2], -1 != (0 | _e[l + (M << 2) >> 2]) && (_e[C >> 2] = 866, _e[C + 4 >> 2] = 2330, _e[C + 8 >> 2] = 1076, Oe(t, 812, C), Ae(t), l = 0 | _e[s >> 2]), _e[l + (M << 2) >> 2] = E, (d = d + 1 | 0) >>> 0 < S >>> 0;) {
                    ;
                  }

                  c = c + 1 | 0;
                } while (c >>> 0 <= r >>> 0);
              }

              b = b + 1 | 0;
            } while (b >>> 0 <= y >>> 0);
          }

          _e[(l = e + 96 | 0) >> 2] = (0 | _e[l >> 2]) - (0 | _e[a >> 2]), _e[(l = e + 100 | 0) >> 2] = (0 | _e[l >> 2]) - (0 | _e[4 + a >> 2]), _e[(l = e + 104 | 0) >> 2] = (0 | _e[l >> 2]) - (0 | _e[8 + a >> 2]), _e[(l = e + 108 | 0) >> 2] = (0 | _e[l >> 2]) - (0 | _e[12 + a >> 2]), _e[(l = e + 112 | 0) >> 2] = (0 | _e[l >> 2]) - (0 | _e[16 + a >> 2]), _e[(l = e + 116 | 0) >> 2] = (0 | _e[l >> 2]) - (0 | _e[20 + a >> 2]), _e[(l = e + 120 | 0) >> 2] = (0 | _e[l >> 2]) - (0 | _e[24 + a >> 2]), _e[(l = e + 124 | 0) >> 2] = (0 | _e[l >> 2]) - (0 | _e[28 + a >> 2]), _e[(l = e + 128 | 0) >> 2] = (0 | _e[l >> 2]) - (0 | _e[32 + a >> 2]), _e[(l = e + 132 | 0) >> 2] = (0 | _e[l >> 2]) - (0 | _e[36 + a >> 2]), _e[(l = e + 136 | 0) >> 2] = (0 | _e[l >> 2]) - (0 | _e[40 + a >> 2]), _e[(l = e + 140 | 0) >> 2] = (0 | _e[l >> 2]) - (0 | _e[44 + a >> 2]), _e[(l = e + 144 | 0) >> 2] = (0 | _e[l >> 2]) - (0 | _e[48 + a >> 2]), _e[(l = e + 148 | 0) >> 2] = (0 | _e[l >> 2]) - (0 | _e[52 + a >> 2]), _e[(l = e + 152 | 0) >> 2] = (0 | _e[l >> 2]) - (0 | _e[56 + a >> 2]), _e[(l = e + 156 | 0) >> 2] = (0 | _e[l >> 2]) - (0 | _e[60 + a >> 2]), _e[(l = e + 16 | 0) >> 2] = 0, _e[(c = e + 20 | 0) >> 2] = de[R >> 0];

          r: do {
            if (k) {
              do {
                if (!n) break r;
                n = (C = n) + -1 | 0;
              } while (!(0 | _e[N + (C << 2) >> 2]));

              if (_e[l >> 2] = _e[e + 28 + (n << 2) >> 2], n = y + 1 | 0, (_e[c >> 2] = n) >>> 0 <= _ >>> 0) {
                for (; !(0 | _e[N + (n << 2) >> 2]);) {
                  if (_ >>> 0 < (n = n + 1 | 0) >>> 0) break r;
                }

                _e[c >> 2] = n;
              }
            }
          } while (0);

          _e[e + 92 >> 2] = -1, _e[e + 160 >> 2] = 1048575, _e[e + 12 >> 2] = 32 - (0 | _e[g >> 2]), n = 1;
        }
      } while (0);

      return Me = w, 0 | (N = n);
    }

    function F(e) {
      var r = 0,
          i = 0,
          n = 0,
          t = 0,
          a = 0,
          o = 0,
          u = 0,
          f = 0;

      if (e |= 0) {
        i = e + -8 | 0, t = 0 | _e[1148], f = i + (r = -8 & (e = 0 | _e[e + -4 >> 2])) | 0;

        do {
          if (1 & e) o = u = i;else {
            if (n = 0 | _e[i >> 2], !(3 & e)) return;
            if (a = n + r | 0, (o = i + (0 - n) | 0) >>> 0 < t >>> 0) return;

            if ((0 | o) == (0 | _e[1149])) {
              if (3 == (3 & (r = 0 | _e[(e = f + 4 | 0) >> 2]) | 0)) return _e[1146] = a, _e[e >> 2] = -2 & r, _e[o + 4 >> 2] = 1 | a, void (_e[o + a >> 2] = a);
              u = o, r = a;
              break;
            }

            if (i = n >>> 3, n >>> 0 < 256) {
              if (e = 0 | _e[o + 8 >> 2], (0 | (r = 0 | _e[o + 12 >> 2])) == (0 | e)) {
                _e[1144] = _e[1144] & ~(1 << i), u = o, r = a;
                break;
              }

              _e[e + 12 >> 2] = r, _e[r + 8 >> 2] = e, u = o, r = a;
              break;
            }

            t = 0 | _e[o + 24 >> 2], e = 0 | _e[o + 12 >> 2];

            do {
              if ((0 | e) == (0 | o)) {
                if (!(e = 0 | _e[(r = (i = o + 16 | 0) + 4 | 0) >> 2])) {
                  if (!(e = 0 | _e[i >> 2])) {
                    e = 0;
                    break;
                  }

                  r = i;
                }

                for (;;) {
                  if (0 | (n = 0 | _e[(i = e + 20 | 0) >> 2])) e = n, r = i;else {
                    if (!(n = 0 | _e[(i = e + 16 | 0) >> 2])) break;
                    e = n, r = i;
                  }
                }

                _e[r >> 2] = 0;
              } else u = 0 | _e[o + 8 >> 2], _e[u + 12 >> 2] = e, _e[e + 8 >> 2] = u;
            } while (0);

            if (t) {
              if (r = 0 | _e[o + 28 >> 2], (0 | o) == (0 | _e[(i = 4880 + (r << 2) | 0) >> 2])) {
                if (!(_e[i >> 2] = e)) {
                  _e[1145] = _e[1145] & ~(1 << r), u = o, r = a;
                  break;
                }
              } else if (!(_e[t + 16 + (((0 | _e[t + 16 >> 2]) != (0 | o) & 1) << 2) >> 2] = e)) {
                u = o, r = a;
                break;
              }

              _e[e + 24 >> 2] = t, 0 | (i = 0 | _e[(r = o + 16 | 0) >> 2]) && (_e[e + 16 >> 2] = i, _e[i + 24 >> 2] = e), r = (u = ((r = 0 | _e[r + 4 >> 2]) && (_e[e + 20 >> 2] = r, _e[r + 24 >> 2] = e), o), a);
            } else u = o, r = a;
          }
        } while (0);

        if (!(f >>> 0 <= o >>> 0) && 1 & (n = 0 | _e[(e = f + 4 | 0) >> 2])) {
          if (2 & n) _e[e >> 2] = -2 & n, _e[u + 4 >> 2] = 1 | r, t = _e[o + r >> 2] = r;else {
            if (e = 0 | _e[1149], (0 | f) == (0 | _e[1150])) {
              if (f = (0 | _e[1147]) + r | 0, _e[1147] = f, _e[1150] = u, _e[u + 4 >> 2] = 1 | f, (0 | u) != (0 | e)) return;
              return _e[1149] = 0, void (_e[1146] = 0);
            }

            if ((0 | f) == (0 | e)) return f = (0 | _e[1146]) + r | 0, _e[1146] = f, _e[1149] = o, _e[u + 4 >> 2] = 1 | f, void (_e[o + f >> 2] = f);
            t = (-8 & n) + r | 0, i = n >>> 3;

            do {
              if (n >>> 0 < 256) {
                if (r = 0 | _e[f + 8 >> 2], (0 | (e = 0 | _e[f + 12 >> 2])) == (0 | r)) {
                  _e[1144] = _e[1144] & ~(1 << i);
                  break;
                }

                _e[r + 12 >> 2] = e, _e[e + 8 >> 2] = r;
                break;
              }

              a = 0 | _e[f + 24 >> 2], e = 0 | _e[f + 12 >> 2];

              do {
                if ((0 | e) == (0 | f)) {
                  if (!(e = 0 | _e[(r = (i = f + 16 | 0) + 4 | 0) >> 2])) {
                    if (!(e = 0 | _e[i >> 2])) {
                      i = 0;
                      break;
                    }

                    r = i;
                  }

                  for (;;) {
                    if (0 | (n = 0 | _e[(i = e + 20 | 0) >> 2])) e = n, r = i;else {
                      if (!(n = 0 | _e[(i = e + 16 | 0) >> 2])) break;
                      e = n, r = i;
                    }
                  }

                  _e[r >> 2] = 0, i = e;
                } else i = 0 | _e[f + 8 >> 2], _e[i + 12 >> 2] = e, _e[e + 8 >> 2] = i, i = e;
              } while (0);

              if (0 | a) {
                if (e = 0 | _e[f + 28 >> 2], (0 | f) == (0 | _e[(r = 4880 + (e << 2) | 0) >> 2])) {
                  if (!(_e[r >> 2] = i)) {
                    _e[1145] = _e[1145] & ~(1 << e);
                    break;
                  }
                } else if (!(_e[a + 16 + (((0 | _e[a + 16 >> 2]) != (0 | f) & 1) << 2) >> 2] = i)) break;

                _e[i + 24 >> 2] = a, 0 | (r = 0 | _e[(e = f + 16 | 0) >> 2]) && (_e[i + 16 >> 2] = r, _e[r + 24 >> 2] = i), 0 | (e = 0 | _e[e + 4 >> 2]) && (_e[i + 20 >> 2] = e, _e[e + 24 >> 2] = i);
              }
            } while (0);

            if (_e[u + 4 >> 2] = 1 | t, _e[o + t >> 2] = t, (0 | u) == (0 | _e[1149])) return void (_e[1146] = t);
          }
          if (e = t >>> 3, t >>> 0 < 256) return i = 4616 + (e << 1 << 2) | 0, (r = 0 | _e[1144]) & (e = 1 << e) ? e = 0 | _e[(r = i + 8 | 0) >> 2] : (_e[1144] = r | e, r = (e = i) + 8 | 0), _e[r >> 2] = u, _e[e + 12 >> 2] = u, _e[u + 8 >> 2] = e, void (_e[u + 12 >> 2] = i);
          n = 4880 + ((e = (e = t >>> 8) ? 16777215 < t >>> 0 ? 31 : t >>> ((e = 14 - ((a = ((f = e << (o = (e + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4) | o | (e = ((f <<= a) + 245760 | 0) >>> 16 & 2)) + (f << e >>> 15) | 0) + 7 | 0) & 1 | e << 1 : 0) << 2) | 0, _e[u + 28 >> 2] = e, _e[u + 20 >> 2] = 0, r = (_e[u + 16 >> 2] = 0) | _e[1145], i = 1 << e;

          do {
            if (r & i) {
              for (r = t << (31 == (0 | e) ? 0 : 25 - (e >>> 1) | 0), i = 0 | _e[n >> 2];;) {
                if ((-8 & _e[i + 4 >> 2] | 0) == (0 | t)) {
                  e = 73;
                  break;
                }

                if (!(e = 0 | _e[(n = i + 16 + (r >>> 31 << 2) | 0) >> 2])) {
                  e = 72;
                  break;
                }

                r <<= 1, i = e;
              }

              if (72 == (0 | e)) {
                _e[n >> 2] = u, _e[u + 24 >> 2] = i, _e[u + 12 >> 2] = u, _e[u + 8 >> 2] = u;
                break;
              }

              if (73 == (0 | e)) {
                f = 0 | _e[(o = i + 8 | 0) >> 2], _e[f + 12 >> 2] = u, _e[o >> 2] = u, _e[u + 8 >> 2] = f, _e[u + 12 >> 2] = i, _e[u + 24 >> 2] = 0;
                break;
              }
            } else _e[1145] = r | i, _e[n >> 2] = u, _e[u + 24 >> 2] = n, _e[u + 12 >> 2] = u, _e[u + 8 >> 2] = u;
          } while (0);

          if (f = (0 | _e[1152]) - 1 | 0, !(_e[1152] = f)) {
            for (e = 5032; e = 0 | _e[e >> 2];) {
              e = e + 8 | 0;
            }

            _e[1152] = -1;
          }
        }
      }
    }

    function x(e, r) {
      var i = 0,
          n = 0,
          t = 0,
          a = 0,
          o = 0,
          u = 0,
          f = 0,
          f = (e |= 0) + (r |= 0) | 0,
          i = 0 | _e[e + 4 >> 2];

      do {
        if (1 & i) u = e, i = r;else {
          if (n = 0 | _e[e >> 2], !(3 & i)) return;

          if (o = n + r | 0, (0 | (a = e + (0 - n) | 0)) == (0 | _e[1149])) {
            if (3 == (3 & (i = 0 | _e[(e = f + 4 | 0) >> 2]) | 0)) return _e[1146] = o, _e[e >> 2] = -2 & i, _e[a + 4 >> 2] = 1 | o, void (_e[a + o >> 2] = o);
            u = a, i = o;
            break;
          }

          if (r = n >>> 3, n >>> 0 < 256) {
            if (e = 0 | _e[a + 8 >> 2], (0 | (i = 0 | _e[a + 12 >> 2])) == (0 | e)) {
              _e[1144] = _e[1144] & ~(1 << r), u = a, i = o;
              break;
            }

            _e[e + 12 >> 2] = i, _e[i + 8 >> 2] = e, u = a, i = o;
            break;
          }

          t = 0 | _e[a + 24 >> 2], e = 0 | _e[a + 12 >> 2];

          do {
            if ((0 | e) == (0 | a)) {
              if (!(e = 0 | _e[(i = (r = a + 16 | 0) + 4 | 0) >> 2])) {
                if (!(e = 0 | _e[r >> 2])) {
                  e = 0;
                  break;
                }

                i = r;
              }

              for (;;) {
                if (0 | (n = 0 | _e[(r = e + 20 | 0) >> 2])) e = n, i = r;else {
                  if (!(n = 0 | _e[(r = e + 16 | 0) >> 2])) break;
                  e = n, i = r;
                }
              }

              _e[i >> 2] = 0;
            } else u = 0 | _e[a + 8 >> 2], _e[u + 12 >> 2] = e, _e[e + 8 >> 2] = u;
          } while (0);

          if (t) {
            if (i = 0 | _e[a + 28 >> 2], (0 | a) == (0 | _e[(r = 4880 + (i << 2) | 0) >> 2])) {
              if (!(_e[r >> 2] = e)) {
                _e[1145] = _e[1145] & ~(1 << i), u = a, i = o;
                break;
              }
            } else if (!(_e[t + 16 + (((0 | _e[t + 16 >> 2]) != (0 | a) & 1) << 2) >> 2] = e)) {
              u = a, i = o;
              break;
            }

            _e[e + 24 >> 2] = t, 0 | (r = 0 | _e[(i = a + 16 | 0) >> 2]) && (_e[e + 16 >> 2] = r, _e[r + 24 >> 2] = e), i = (u = ((i = 0 | _e[i + 4 >> 2]) && (_e[e + 20 >> 2] = i, _e[i + 24 >> 2] = e), a), o);
          } else u = a, i = o;
        }
      } while (0);

      if (2 & (n = 0 | _e[(e = f + 4 | 0) >> 2])) _e[e >> 2] = -2 & n, _e[u + 4 >> 2] = 1 | i, _e[u + i >> 2] = i;else {
        if (e = 0 | _e[1149], (0 | f) == (0 | _e[1150])) return f = (0 | _e[1147]) + i | 0, _e[1147] = f, _e[1150] = u, _e[u + 4 >> 2] = 1 | f, (0 | u) == (0 | e) && (_e[1149] = 0, void (_e[1146] = 0));
        if ((0 | f) == (0 | e)) return f = (0 | _e[1146]) + i | 0, _e[1146] = f, _e[1149] = u, _e[u + 4 >> 2] = 1 | f, void (_e[u + f >> 2] = f);
        a = (-8 & n) + i | 0, r = n >>> 3;

        do {
          if (n >>> 0 < 256) {
            if (i = 0 | _e[f + 8 >> 2], (0 | (e = 0 | _e[f + 12 >> 2])) == (0 | i)) {
              _e[1144] = _e[1144] & ~(1 << r);
              break;
            }

            _e[i + 12 >> 2] = e, _e[e + 8 >> 2] = i;
            break;
          }

          t = 0 | _e[f + 24 >> 2], e = 0 | _e[f + 12 >> 2];

          do {
            if ((0 | e) == (0 | f)) {
              if (!(e = 0 | _e[(i = (r = f + 16 | 0) + 4 | 0) >> 2])) {
                if (!(e = 0 | _e[r >> 2])) {
                  r = 0;
                  break;
                }

                i = r;
              }

              for (;;) {
                if (0 | (n = 0 | _e[(r = e + 20 | 0) >> 2])) e = n, i = r;else {
                  if (!(n = 0 | _e[(r = e + 16 | 0) >> 2])) break;
                  e = n, i = r;
                }
              }

              _e[i >> 2] = 0, r = e;
            } else r = 0 | _e[f + 8 >> 2], _e[r + 12 >> 2] = e, _e[e + 8 >> 2] = r, r = e;
          } while (0);

          if (0 | t) {
            if (e = 0 | _e[f + 28 >> 2], (0 | f) == (0 | _e[(i = 4880 + (e << 2) | 0) >> 2])) {
              if (!(_e[i >> 2] = r)) {
                _e[1145] = _e[1145] & ~(1 << e);
                break;
              }
            } else if (!(_e[t + 16 + (((0 | _e[t + 16 >> 2]) != (0 | f) & 1) << 2) >> 2] = r)) break;

            _e[r + 24 >> 2] = t, 0 | (i = 0 | _e[(e = f + 16 | 0) >> 2]) && (_e[r + 16 >> 2] = i, _e[i + 24 >> 2] = r), 0 | (e = 0 | _e[e + 4 >> 2]) && (_e[r + 20 >> 2] = e, _e[e + 24 >> 2] = r);
          }
        } while (0);

        if (_e[u + 4 >> 2] = 1 | a, _e[u + a >> 2] = a, (0 | u) == (0 | _e[1149])) return void (_e[1146] = a);
        i = a;
      }
      if (e = i >>> 3, i >>> 0 < 256) return r = 4616 + (e << 1 << 2) | 0, (i = 0 | _e[1144]) & (e = 1 << e) ? e = 0 | _e[(i = r + 8 | 0) >> 2] : (_e[1144] = i | e, i = (e = r) + 8 | 0), _e[i >> 2] = u, _e[e + 12 >> 2] = u, _e[u + 8 >> 2] = e, void (_e[u + 12 >> 2] = r);
      if (t = 4880 + ((e = (e = i >>> 8) ? 16777215 < i >>> 0 ? 31 : i >>> ((e = 14 - ((a = ((f = e << (o = (e + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4) | o | (e = ((f <<= a) + 245760 | 0) >>> 16 & 2)) + (f << e >>> 15) | 0) + 7 | 0) & 1 | e << 1 : 0) << 2) | 0, _e[u + 28 >> 2] = e, _e[u + 20 >> 2] = 0, !((r = (_e[u + 16 >> 2] = 0) | _e[1145]) & (n = 1 << e))) return _e[1145] = r | n, _e[t >> 2] = u, _e[u + 24 >> 2] = t, _e[u + 12 >> 2] = u, void (_e[u + 8 >> 2] = u);

      for (r = i << (31 == (0 | e) ? 0 : 25 - (e >>> 1) | 0), n = 0 | _e[t >> 2];;) {
        if ((-8 & _e[n + 4 >> 2] | 0) == (0 | i)) {
          e = 69;
          break;
        }

        if (!(e = 0 | _e[(t = n + 16 + (r >>> 31 << 2) | 0) >> 2])) {
          e = 68;
          break;
        }

        r <<= 1, n = e;
      }

      return 68 == (0 | e) ? (_e[t >> 2] = u, _e[u + 24 >> 2] = n, _e[u + 12 >> 2] = u, void (_e[u + 8 >> 2] = u)) : 69 == (0 | e) && (f = 0 | _e[(o = n + 8 | 0) >> 2], _e[f + 12 >> 2] = u, _e[o >> 2] = u, _e[u + 8 >> 2] = f, _e[u + 12 >> 2] = n, void (_e[u + 24 >> 2] = 0));
    }

    function B(e, r, i, n, t) {
      t |= 0;
      var a = 0,
          o = 0,
          u = 0,
          f = 0,
          l = 0,
          c = 0,
          s = 0,
          _ = 0,
          d = 0,
          E = 0,
          c = e |= 0,
          o = i |= 0,
          u = _ = n |= 0;
      if (!(l = f = r |= 0)) return a = 0 != (0 | t), u ? (a && (_e[t >> 2] = 0 | e, _e[t + 4 >> 2] = 0 & r), (t = _ = 0) | (P = _, t)) : (a && (_e[t >> 2] = (c >>> 0) % (o >>> 0), _e[t + 4 >> 2] = 0), (_ = 0) | (P = _, t = (c >>> 0) / (o >>> 0) >>> 0));
      a = 0 == (0 | u);

      do {
        if (o) {
          if (!a) {
            if ((a = (0 | M(0 | u)) - (0 | M(0 | l)) | 0) >>> 0 <= 31) {
              e = c >>> ((o = s = a + 1 | 0) >>> 0) & (r = a - 31 >> 31) | l << (u = 31 - a | 0), r &= l >>> (s >>> 0), a = 0, u = c << u;
              break;
            }

            return t ? (_e[t >> 2] = 0 | e, _e[t + 4 >> 2] = f | 0 & r, (t = _ = 0) | (P = _, t)) : (t = _ = 0) | (P = _, t);
          }

          if ((a = o - 1 | 0) & o | 0) {
            e = (s = 32 - (u = 33 + (0 | M(0 | o)) - (0 | M(0 | l)) | 0) | 0) - 1 >> 31 & l >>> ((d = u - 32 | 0) >>> 0) | (l << s | c >>> ((o = u) >>> 0)) & (r = d >> 31), r &= l >>> (u >>> 0), a = c << (E = 64 - u | 0) & (f = s >> 31), u = (l << E | c >>> (d >>> 0)) & f | c << s & u - 33 >> 31;
            break;
          }

          return 0 | t && (_e[t >> 2] = a & c, _e[t + 4 >> 2] = 0), 1 == (0 | o) ? 0 | (P = d = f | 0 & r, E = 0 | e) : (E = 0 | Se(0 | o), 0 | (P = d = l >>> (E >>> 0) | 0, E = l << 32 - E | c >>> (E >>> 0) | 0));
        }

        if (a) return 0 | t && (_e[t >> 2] = (l >>> 0) % (o >>> 0), _e[t + 4 >> 2] = 0), (d = 0) | (P = d, E = (l >>> 0) / (o >>> 0) >>> 0);
        if (!c) return 0 | t && (_e[t >> 2] = 0, _e[t + 4 >> 2] = (l >>> 0) % (u >>> 0)), (d = 0) | (P = d, E = (l >>> 0) / (u >>> 0) >>> 0);
        if (!((a = u - 1 | 0) & u)) return 0 | t && (_e[t >> 2] = 0 | e, _e[t + 4 >> 2] = a & l | 0 & r), E = l >>> (((d = 0) | Se(0 | u)) >>> 0), 0 | (P = d, E);

        if ((a = (0 | M(0 | u)) - (0 | M(0 | l)) | 0) >>> 0 <= 30) {
          e = l << (u = 31 - a | 0) | c >>> ((o = r = a + 1 | 0) >>> 0), r = l >>> (r >>> 0), a = 0, u = c << u;
          break;
        }

        return t && (_e[t >> 2] = 0 | e, _e[t + 4 >> 2] = f | 0 & r), (E = d = 0) | (P = d, E);
      } while (0);

      if (o) {
        for (l = 0 | Ie(0 | (s = 0 | i), 0 | (c = _ | 0 & n), -1, -1), i = P, f = u, u = 0; f = a >>> 31 | (n = f) << 1, a = u | a << 1, we(0 | l, 0 | i, 0 | (n = e << 1 | n >>> 31 | 0), 0 | (_ = e >>> 31 | r << 1 | 0)), u = 1 & (d = (E = P) >> 31 | ((0 | E) < 0 ? -1 : 0) << 1), e = 0 | we(0 | n, 0 | _, d & s | 0, (((0 | E) < 0 ? -1 : 0) >> 31 | ((0 | E) < 0 ? -1 : 0) << 1) & c | 0), r = P, 0 != (0 | (o = o - 1 | 0));) {
          ;
        }

        l = f, f = 0;
      } else l = u, u = f = 0;

      return (o = 0) | t && (_e[t >> 2] = e, _e[t + 4 >> 2] = r), 0 | (P = d = (0 | a) >>> 31 | (l | o) << 1 | 0 & (o << 1 | a >>> 31) | f, E = -2 & (a << 1 | 0) | u);
    }

    function Te(e, r) {
      e |= 0;
      var i,
          n,
          t,
          a,
          o,
          u,
          f,
          l = 0,
          c = 0,
          s = 0,
          _ = 0,
          d = 0,
          E = 0,
          M = Me;
      Me = Me + 576 | 0, t = M + 48 | 0, o = M + 32 | 0, a = M + 16 | 0, f = (n = M) + 64 | 0, u = 0 | _e[(r |= 0) + 20 >> 2], (0 | (i = 0 | _e[(E = e + 20 | 0) >> 2])) < 24 ? (c = (l = 0 | _e[(d = e + 4 | 0) >> 2]) >>> 0 < (s = 0 | _e[e + 8 >> 2]) >>> 0, (0 | i) < 16 ? (c ? (_ = (0 | de[l >> 0]) << 8, l = l + 1 | 0) : _ = 0, l >>> 0 < s >>> 0 ? (s = 0 | de[l >> 0], l = l + 1 | 0) : s = 0, _e[d >> 2] = l, _e[E >> 2] = 16 + i, c = 16, l = s | _) : (l = c ? (_e[d >> 2] = l + 1, 0 | de[l >> 0]) : 0, _e[E >> 2] = 8 + i, c = 24), s = _e[(d = e + 16 | 0) >> 2] | l << c - i, _e[d >> 2] = s) : s = 0 | _e[(d = s = e + 16 | 0) >> 2], _ = 1 + (s >>> 16) | 0;

      do {
        if (!(_ >>> 0 <= (0 | _e[16 + u >> 2]) >>> 0)) {
          for (c = 0 | _e[20 + u >> 2]; _ >>> 0 > (0 | _e[28 + u + ((l = c + -1 | 0) << 2) >> 2]) >>> 0;) {
            c = c + 1 | 0;
          }

          if ((l = (s >>> (32 - c | 0)) + (0 | _e[96 + u + (l << 2) >> 2]) | 0) >>> 0 < (0 | _e[r >> 2]) >>> 0) {
            l = 0 | Ee[(0 | _e[176 + u >> 2]) + (l << 1) >> 1];
            break;
          }

          return _e[t >> 2] = 866, _e[4 + t >> 2] = 3275, _e[8 + t >> 2] = 1348, Oe(f, 812, t), Ae(f), Me = M, (E = 0) | E;
        }

        -1 == (0 | (c = 0 | _e[(0 | _e[168 + u >> 2]) + (s >>> (32 - (0 | _e[8 + u >> 2]) | 0) << 2) >> 2])) && (_e[n >> 2] = 866, _e[n + 4 >> 2] = 3253, _e[n + 8 >> 2] = 1393, Oe(f, 812, n), Ae(f)), l = 65535 & c, c >>>= 16, (0 | _e[r + 8 >> 2]) >>> 0 <= l >>> 0 && (_e[a >> 2] = 866, _e[4 + a >> 2] = 909, _e[8 + a >> 2] = 1497, Oe(f, 812, a), Ae(f)), (0 | de[(0 | _e[r + 4 >> 2]) + l >> 0]) != (0 | c) && (_e[o >> 2] = 866, _e[4 + o >> 2] = 3257, _e[8 + o >> 2] = 1410, Oe(f, 812, o), Ae(f));
      } while (0);

      return _e[d >> 2] = _e[d >> 2] << c, _e[E >> 2] = (0 | _e[E >> 2]) - c, Me = M, 0 | (E = l);
    }

    function Y(e) {
      var r,
          i,
          n,
          t,
          a = 0,
          o = 0,
          u = 0,
          f = Me;
      if (Me = Me + 576 | 0, u = f + 48 | 0, n = f + 32 | 0, i = f + 16 | 0, t = (r = f) + 64 | 0, (_e[(e |= 0) >> 2] = 0) | (o = 0 | _e[(a = e + 284 | 0) >> 2]) && (7 & o ? (_e[r >> 2] = 866, _e[r + 4 >> 2] = 2506, _e[r + 8 >> 2] = 1232, Oe(t, 812, r), Ae(t)) : fe(o, 0, 0, 1, 0), _e[a >> 2] = 0, _e[e + 288 >> 2] = 0, _e[e + 292 >> 2] = 0), (se[e + 296 >> 0] = 0) | (o = 0 | _e[(a = e + 268 | 0) >> 2]) && (7 & o ? (_e[i >> 2] = 866, _e[4 + i >> 2] = 2506, _e[8 + i >> 2] = 1232, Oe(t, 812, i), Ae(t)) : fe(o, 0, 0, 1, 0), _e[a >> 2] = 0, _e[e + 272 >> 2] = 0, _e[e + 276 >> 2] = 0), (se[e + 280 >> 0] = 0) | (o = 0 | _e[(a = e + 252 | 0) >> 2]) && (7 & o ? (_e[n >> 2] = 866, _e[4 + n >> 2] = 2506, _e[8 + n >> 2] = 1232, Oe(t, 812, n), Ae(t)) : fe(o, 0, 0, 1, 0), _e[a >> 2] = 0, _e[e + 256 >> 2] = 0, _e[e + 260 >> 2] = 0), !(o = (se[e + 264 >> 0] = 0) | _e[(a = e + 236 | 0) >> 2])) return ie(u = e + 212 | (se[(u = e + 248 | 0) >> 0] = 0)), ie(u = e + 188 | 0), ie(u = e + 164 | 0), ie(u = e + 140 | 0), ie(u = e + 116 | 0), void (Me = f);
      7 & o ? (_e[u >> 2] = 866, _e[u + 4 >> 2] = 2506, _e[u + 8 >> 2] = 1232, Oe(t, 812, u), Ae(t)) : fe(o, 0, 0, 1, 0), _e[a >> 2] = 0, _e[e + 240 >> 2] = 0, _e[e + 244 >> 2] = 0, ie(u = e + 212 | (se[(u = e + 248 | 0) >> 0] = 0)), ie(u = e + 188 | 0), ie(u = e + 164 | 0), ie(u = e + 140 | 0), ie(u = e + 116 | 0), Me = f;
    }

    function X(e, r, i) {
      e |= 0, r |= 0, i |= 0;
      var n = 0,
          t = 0,
          a = 0;

      e: do {
        if (r >>> 0 <= 20) {
          switch (0 | r) {
            case 9:
              n = 3 + (0 | _e[i >> 2]) & -4, r = 0 | _e[n >> 2], _e[i >> 2] = n + 4, _e[e >> 2] = r;
              break e;

            case 10:
              n = 3 + (0 | _e[i >> 2]) & -4, r = 0 | _e[n >> 2], _e[i >> 2] = n + 4, _e[(n = e) >> 2] = r, _e[n + 4 >> 2] = ((0 | r) < 0) << 31 >> 31;
              break e;

            case 11:
              n = 3 + (0 | _e[i >> 2]) & -4, r = 0 | _e[n >> 2], _e[i >> 2] = n + 4, _e[(n = e) >> 2] = r, _e[n + 4 >> 2] = 0;
              break e;

            case 12:
              n = 7 + (0 | _e[i >> 2]) & -8, t = 0 | _e[(r = n) >> 2], r = 0 | _e[r + 4 >> 2], _e[i >> 2] = n + 8, _e[(n = e) >> 2] = t, _e[n + 4 >> 2] = r;
              break e;

            case 13:
              t = 3 + (0 | _e[i >> 2]) & -4, n = 0 | _e[t >> 2], _e[i >> 2] = t + 4, n = (65535 & n) << 16 >> 16, _e[(t = e) >> 2] = n, _e[t + 4 >> 2] = ((0 | n) < 0) << 31 >> 31;
              break e;

            case 14:
              t = 3 + (0 | _e[i >> 2]) & -4, n = 0 | _e[t >> 2], _e[i >> 2] = t + 4, _e[(t = e) >> 2] = 65535 & n, _e[t + 4 >> 2] = 0;
              break e;

            case 15:
              t = 3 + (0 | _e[i >> 2]) & -4, n = 0 | _e[t >> 2], _e[i >> 2] = t + 4, n = (255 & n) << 24 >> 24, _e[(t = e) >> 2] = n, _e[t + 4 >> 2] = ((0 | n) < 0) << 31 >> 31;
              break e;

            case 16:
              t = 3 + (0 | _e[i >> 2]) & -4, n = 0 | _e[t >> 2], _e[i >> 2] = t + 4, _e[(t = e) >> 2] = 255 & n, _e[t + 4 >> 2] = 0;
              break e;

            case 17:
            case 18:
              t = 7 + (0 | _e[i >> 2]) & -8, a = +N[t >> 3], _e[i >> 2] = t + 8, N[e >> 3] = a;
              break e;

            default:
              break e;
          }
        }
      } while (0);
    }

    function G(e, r, i, n, t) {
      r |= 0, i |= 0, n |= 0, t |= 0;
      var a,
          o,
          u,
          f,
          l,
          c = 0,
          s = 0,
          _ = 0,
          d = 0,
          E = Me;
      if (Me = Me + 576 | 0, f = E + 48 | 0, a = E + 32 | 0, s = E + 16 | 0, u = (c = E) + 64 | 0, l = E + 60 | 0, d = (e |= 0) + 8 | 0, (0 | _e[(o = e + 4 | 0) >> 2]) >>> 0 > (0 | _e[d >> 2]) >>> 0 && (_e[c >> 2] = 866, _e[c + 4 >> 2] = 2123, _e[c + 8 >> 2] = 845, Oe(u, 812, c), Ae(u)), (2147418112 / (n >>> 0) | 0) >>> 0 <= r >>> 0 && (_e[s >> 2] = 866, _e[s + 4 >> 2] = 2124, _e[s + 8 >> 2] = 885, Oe(u, 812, s), Ae(u)), r >>> 0 <= (c = 0 | _e[d >> 2]) >>> 0) return Me = E, 0 | (d = 1);
      if (9 == (0 | (i = i && 0 != ((_ = r + -1 | 0) & r | 0) ? (r = _ >>> 16 | _, r |= r >>> 8, r |= r >>> 4, (r = 1 + ((r |= r >>> 2) >>> 1 | r) | 0) ? 9 : (r = 0, 10)) : 9)) && r >>> 0 <= c >>> 0 && (i = 10), 10 == (0 | i) && (_e[a >> 2] = 866, _e[4 + a >> 2] = 2133, _e[8 + a >> 2] = 933, Oe(u, 812, a), Ae(u)), _ = 0 | te(r, n), t) {
        if (s = 0 | ne(_, l)) {
          er[0 & t](s, 0 | _e[e >> 2], 0 | _e[o >> 2]), c = 0 | _e[e >> 2];

          do {
            if (0 | c) {
              if (7 & c) {
                _e[f >> 2] = 866, _e[4 + f >> 2] = 2506, _e[8 + f >> 2] = 1232, Oe(u, 812, f), Ae(u);
                break;
              }

              fe(c, 0, 0, 1, 0);
              break;
            }
          } while (0);

          _e[e >> 2] = s, i = 20;
        } else r = 0;
      } else (c = 0 | function (e, r, i, n) {
        r |= 0, i |= 0, n |= 0;
        var t,
            a,
            o,
            u,
            f,
            l = 0;
        if (Me = (f = Me) + 560 | 0, l = f + 32 | 0, a = f + 16 | 0, o = (t = f) + 48 | 0, u = f + 44 | 0, 7 & (e |= 0) | 0) return _e[t >> 2] = 866, _e[t + 4 >> 2] = 2506, _e[t + 8 >> 2] = 1210, Oe(o, 812, t), Ae(o), Me = f, (l = 0) | l;
        if (2147418112 < r >>> 0) return _e[a >> 2] = 866, _e[4 + a >> 2] = 2506, _e[8 + a >> 2] = 1103, Oe(o, 812, a), Ae(o), Me = f, (l = 0) | l;
        _e[u >> 2] = r, e = 0 | fe(e, r, u, n, 0), 0 | i && (_e[i >> 2] = _e[u >> 2]);
        7 & e | 0 && (_e[l >> 2] = 866, _e[l + 4 >> 2] = 2558, _e[l + 8 >> 2] = 1156, Oe(o, 812, l), Ae(o));
        return Me = f, 0 | (l = e);
      }(0 | _e[e >> 2], _, l, 1)) ? (_e[e >> 2] = c, i = 20) : r = 0;
      return 20 == (0 | i) && (_ >>> 0 < (c = 0 | _e[l >> 2]) >>> 0 && (r = (c >>> 0) / (n >>> 0) | 0), _e[d >> 2] = r, r = 1), Me = E, 0 | (d = r);
    }

    function W(e, r, i, n, t, a, o) {
      r |= 0, i |= 0, n |= 0, t |= 0, a |= 0, o |= 0;
      var u,
          f = 0,
          l = 0,
          c = 0,
          c = 0 | _e[(e |= 0) + 88 >> 2];

      if (f = ((1 < (f = (de[c + 12 >> 0] << 8 | de[c + 13 >> 0]) >>> o) >>> 0 ? f : 1) + 3 | 0) >>> 2, l = ((1 < (l = (de[c + 14 >> 0] << 8 | de[c + 15 >> 0]) >>> o) >>> 0 ? l : 1) + 3 | 0) >>> 2, o = 0 | se[(c = c + 18 | 0) >> 0], o = 0 | te(f, o << 24 >> 24 == 0 | o << 24 >> 24 == 9 ? 8 : 16), a) {
        if (!(0 == (3 & a | 0) & o >>> 0 <= a >>> 0)) return (t = 0) | t;
        o = a;
      }

      if ((0 | te(o, l)) >>> 0 > t >>> 0) return (t = 0) | t;
      if (a = (f + 1 | 0) >>> 1, u = (l + 1 | 0) >>> 1, !i) return (t = 0) | t;

      switch (_e[e + 92 >> 2] = r, _e[e + 96 >> 2] = r, _e[e + 104 >> 2] = i, _e[e + 100 >> 2] = r + i, _e[e + 108 >> 2] = 0, (_e[e + 112 >> 2] = 0) | se[c >> 0]) {
        case 0:
          if (!(0 | function (e, r, i, n, t, a, o, u) {
            r |= 0, i |= 0, n |= 0, t |= 0, a |= 0, o |= 0, u |= 0;

            var f,
                l,
                c,
                s,
                _,
                d,
                E,
                M,
                T,
                A,
                h,
                b,
                m,
                p,
                S,
                v,
                k,
                y,
                g,
                O,
                R,
                C,
                N,
                w,
                P,
                I,
                L,
                D,
                U,
                H,
                F,
                x = 0,
                B = 0,
                Y = 0,
                K = 0,
                V = 0,
                X = 0,
                G = 0,
                W = 0,
                z = 0,
                j = 0,
                J = 0,
                Z = 0,
                q = 0,
                Q = 0,
                $ = 0,
                ee = 0,
                re = 0,
                ie = 0,
                ne = Me;

            if (Me = Me + 656 | 0, H = ne + 112 | 0, D = ne + 96 | 0, L = ne + 80 | 0, I = ne + 64 | 0, P = ne + 48 | 0, F = ne + 32 | 0, U = ne + 16 | 0, C = (w = ne) + 144 | 0, N = ne + 128 | 0, p = 0 | _e[(m = (e |= 0) + 240 | 0) >> 2], v = 0 | _e[(S = e + 256 | 0) >> 2], k = 255 & (ee = 0 | se[17 + (0 | _e[e + 88 >> 2]) >> 0]), !(ee << 24 >> 24)) return Me = ne, 1;
            g = 0 == (0 | u), R = (O = o + -1 | 0) << 4, ee = u + -1 | 0, E = 0 != (1 & a | 0), M = n << 1, T = e + 92 | 0, A = e + 116 | 0, h = e + 140 | 0, b = e + 236 | 0, d = 0 != (1 & t | 0), _ = e + 188 | 0, f = e + 252 | 0, l = 1 + (y = n >>> 2) | 0, c = 2 + y | 0, s = 3 + y | 0, i = a = $ = 0, t = 1;

            do {
              if (!g) for (q = 0 | _e[r + ($ << 2) >> 2], Q = 0;;) {
                if (B = 0 == (0 | (J = 1 & Q)), j = (J << 5 ^ 32) - 16 | 0, J = (J << 1 ^ 2) - 1 | 0, Z = E & (e = (0 | Q) == (0 | ee)), (0 | (x = B ? 0 : O)) != (0 | (z = B ? o : -1))) for (W = E & e ^ 1, G = B ? q : q + R | 0;;) {
                  for (1 == (0 | t) && (t = 512 | Te(T, A)), X = 7 & t, t >>>= 3, B = 0 | de[1539 + X >> 0], e = 0; i = (V = (K = (Y = (0 | Te(T, h)) + i | 0) - p | 0) >> 31) & Y | K & ~V, (0 | _e[m >> 2]) >>> 0 <= i >>> 0 && (_e[w >> 2] = 866, _e[w + 4 >> 2] = 910, _e[w + 8 >> 2] = 1497, Oe(C, 812, w), Ae(C)), _e[N + (e << 2) >> 2] = _e[(0 | _e[b >> 2]) + (i << 2) >> 2], (e = e + 1 | 0) >>> 0 < B >>> 0;) {
                    ;
                  }

                  if (Z | (V = d & (0 | x) == (0 | O))) {
                    K = 0;

                    do {
                      e = G + (0 | te(K, n)) | 0, Y = 0 == (0 | K) | W, B = K << 1, a = (a = (re = (ie = (0 | Te(T, _)) + a | 0) - v | 0) >> 31) & ie | re & ~a;

                      do {
                        if (V) {
                          if (!Y) {
                            a = (a = (ie = (re = (0 | Te(T, _)) + a | 0) - v | 0) >> 31) & re | ie & ~a;
                            break;
                          }

                          _e[e >> 2] = _e[N + ((0 | de[1547 + (X << 2) + B >> 0]) << 2) >> 2], (0 | _e[S >> 2]) >>> 0 <= a >>> 0 && (_e[D >> 2] = 866, _e[4 + D >> 2] = 910, _e[8 + D >> 2] = 1497, Oe(C, 812, D), Ae(C)), _e[e + 4 >> 2] = _e[(0 | _e[f >> 2]) + (a << 2) >> 2], a = (a = (ie = (re = (0 | Te(T, _)) + a | 0) - v | 0) >> 31) & re | ie & ~a;
                        } else Y && (_e[e >> 2] = _e[N + ((0 | de[1547 + (X << 2) + B >> 0]) << 2) >> 2], (0 | _e[S >> 2]) >>> 0 <= a >>> 0 && (_e[L >> 2] = 866, _e[4 + L >> 2] = 910, _e[8 + L >> 2] = 1497, Oe(C, 812, L), Ae(C)), _e[e + 4 >> 2] = _e[(0 | _e[f >> 2]) + (a << 2) >> 2]), e = e + 8 | 0, a = (a = (ie = (re = (0 | Te(T, _)) + a | 0) - v | 0) >> 31) & re | ie & ~a, Y && (_e[e >> 2] = _e[N + ((0 | de[1547 + (X << 2) + (1 | B) >> 0]) << 2) >> 2], (0 | _e[S >> 2]) >>> 0 <= a >>> 0 && (_e[H >> 2] = 866, _e[4 + H >> 2] = 910, _e[8 + H >> 2] = 1497, Oe(C, 812, H), Ae(C)), _e[e + 4 >> 2] = _e[(0 | _e[f >> 2]) + (a << 2) >> 2]);
                      } while (0);

                      K = K + 1 | 0;
                    } while (2 != (0 | K));
                  } else _e[G >> 2] = _e[N + ((0 | de[1547 + (X << 2) >> 0]) << 2) >> 2], a = (a = (ie = (re = (0 | Te(T, _)) + a | 0) - v | 0) >> 31) & re | ie & ~a, (0 | _e[S >> 2]) >>> 0 <= a >>> 0 && (_e[U >> 2] = 866, _e[4 + U >> 2] = 910, _e[8 + U >> 2] = 1497, Oe(C, 812, U), Ae(C)), _e[G + 4 >> 2] = _e[(0 | _e[f >> 2]) + (a << 2) >> 2], _e[G + 8 >> 2] = _e[N + ((0 | de[1547 + (X << 2) + 1 >> 0]) << 2) >> 2], a = (a = (ie = (re = (0 | Te(T, _)) + a | 0) - v | 0) >> 31) & re | ie & ~a, (0 | _e[S >> 2]) >>> 0 <= a >>> 0 && (_e[F >> 2] = 866, _e[4 + F >> 2] = 910, _e[8 + F >> 2] = 1497, Oe(C, 812, F), Ae(C)), _e[G + 12 >> 2] = _e[(0 | _e[f >> 2]) + (a << 2) >> 2], _e[G + (y << 2) >> 2] = _e[N + ((0 | de[1547 + (X << 2) + 2 >> 0]) << 2) >> 2], a = (a = (ie = (re = (0 | Te(T, _)) + a | 0) - v | 0) >> 31) & re | ie & ~a, (0 | _e[S >> 2]) >>> 0 <= a >>> 0 && (_e[P >> 2] = 866, _e[4 + P >> 2] = 910, _e[8 + P >> 2] = 1497, Oe(C, 812, P), Ae(C)), _e[G + (l << 2) >> 2] = _e[(0 | _e[f >> 2]) + (a << 2) >> 2], _e[G + (c << 2) >> 2] = _e[N + ((0 | de[1547 + (X << 2) + 3 >> 0]) << 2) >> 2], a = (a = (ie = (re = (0 | Te(T, _)) + a | 0) - v | 0) >> 31) & re | ie & ~a, (0 | _e[S >> 2]) >>> 0 <= a >>> 0 && (_e[I >> 2] = 866, _e[4 + I >> 2] = 910, _e[8 + I >> 2] = 1497, Oe(C, 812, I), Ae(C)), _e[G + (s << 2) >> 2] = _e[(0 | _e[f >> 2]) + (a << 2) >> 2];

                  if ((0 | (x = J + x | 0)) == (0 | z)) break;
                  G = G + j | 0;
                }
                if ((0 | (Q = Q + 1 | 0)) == (0 | u)) break;
                q = q + M | 0;
              }
              $ = $ + 1 | 0;
            } while ((0 | $) != (0 | k));

            return Me = ne, 1;
          }(e, n, t, o, f, l, a, u))) return (t = 0) | t;
          break;

        case 4:
        case 6:
        case 5:
        case 3:
        case 2:
          if (!(0 | function (e, r, i, n, t, a, o, u) {
            r |= 0, i |= 0, n |= 0, t |= 0, a |= 0, o |= 0, u |= 0;

            var f,
                l,
                c,
                s,
                _,
                d,
                E,
                M,
                T,
                A,
                h,
                b,
                m,
                p,
                S,
                v,
                k,
                y,
                g,
                O,
                R,
                C,
                N,
                w,
                P,
                I,
                L,
                D,
                U,
                H,
                F,
                x,
                B,
                Y,
                K = 0,
                V = 0,
                X = 0,
                G = 0,
                W = 0,
                z = 0,
                j = 0,
                J = 0,
                Z = 0,
                q = 0,
                Q = 0,
                $ = 0,
                ee = 0,
                re = 0,
                ie = 0,
                ne = 0,
                te = 0,
                ae = 0,
                oe = 0,
                ue = 0,
                fe = 0,
                le = 0,
                ce = Me;

            if (Me = Me + 640 | 0, x = ce + 80 | 0, F = ce + 64 | 0, H = ce + 48 | 0, Y = ce + 32 | 0, B = ce + 16 | 0, L = (U = ce) + 128 | 0, D = ce + 112 | 0, d = ce + 96 | 0, M = 0 | _e[(E = (e |= 0) + 240 | 0) >> 2], A = 0 | _e[(T = e + 256 | 0) >> 2], b = 0 | _e[(h = e + 272 | 0) >> 2], le = 0 | _e[e + 88 >> 2], m = (0 | de[le + 63 >> 0]) << 8 | 0 | de[le + 64 >> 0], p = 255 & (le = 0 | se[le + 17 >> 0]), !(le << 24 >> 24)) return Me = ce, 1;
            S = 0 == (0 | u), k = (v = o + -1 | 0) << 5, y = u + -1 | 0, g = n << 1, O = e + 92 | 0, R = e + 116 | 0, C = e + 164 | 0, N = e + 268 | 0, w = e + 140 | 0, P = e + 236 | 0, I = e + 212 | 0, le = e + 188 | 0, _ = 0 == (1 & t | 0), s = 0 == (1 & a | 0), l = e + 288 | 0, c = e + 284 | 0, f = e + 252 | 0, i = t = a = e = fe = 0, K = 1;

            do {
              if (!S) for (oe = 0 | _e[r + (fe << 2) >> 2], ue = 0;;) {
                if (X = 0 == (0 | (ae = 1 & ue)), te = (ae << 6 ^ 64) - 32 | 0, ae = (ae << 1 ^ 2) - 1 | 0, (0 | (V = X ? 0 : v)) != (0 | (ie = X ? o : -1))) for (ne = s | (0 | ue) != (0 | y), re = X ? oe : oe + k | 0;;) {
                  for (1 == (0 | K) && (K = 512 | Te(O, R)), ee = 7 & K, K >>>= 3, G = 0 | de[1539 + ee >> 0], X = 0; a = ($ = (Q = (q = (0 | Te(O, C)) + a | 0) - b | 0) >> 31) & q | Q & ~$, (0 | _e[h >> 2]) >>> 0 <= a >>> 0 && (_e[U >> 2] = 866, _e[U + 4 >> 2] = 910, _e[U + 8 >> 2] = 1497, Oe(L, 812, U), Ae(L)), _e[d + (X << 2) >> 2] = Ee[(0 | _e[N >> 2]) + (a << 1) >> 1], (X = X + 1 | 0) >>> 0 < G >>> 0;) {
                    ;
                  }

                  for (X = 0; i = ($ = (Q = (q = (0 | Te(O, w)) + i | 0) - M | 0) >> 31) & q | Q & ~$, (0 | _e[E >> 2]) >>> 0 <= i >>> 0 && (_e[B >> 2] = 866, _e[4 + B >> 2] = 910, _e[8 + B >> 2] = 1497, Oe(L, 812, B), Ae(L)), _e[D + (X << 2) >> 2] = _e[(0 | _e[P >> 2]) + (i << 2) >> 2], (X = X + 1 | 0) >>> 0 < G >>> 0;) {
                    ;
                  }

                  for ($ = _ | (0 | V) != (0 | v), q = 0, Q = re;;) {
                    if (j = ne | 0 == (0 | q), J = q << 1, $) for (W = 0, z = Q; e = (e = (G = (Z = (0 | Te(O, I)) + e | 0) - m | 0) >> 31) & Z | G & ~e, t = (t = (Z = (G = (0 | Te(O, le)) + t | 0) - A | 0) >> 31) & G | Z & ~t, j && (X = 0 | de[W + J + (1547 + (ee << 2)) >> 0], G = 3 * e | 0, (0 | _e[l >> 2]) >>> 0 <= G >>> 0 && (_e[Y >> 2] = 866, _e[4 + Y >> 2] = 910, _e[8 + Y >> 2] = 1497, Oe(L, 812, Y), Ae(L)), Z = (0 | _e[c >> 2]) + (G << 1) | 0, _e[z >> 2] = (0 | Ee[Z >> 1]) << 16 | _e[d + (X << 2) >> 2], _e[z + 4 >> 2] = (0 | Ee[Z + 4 >> 1]) << 16 | 0 | Ee[Z + 2 >> 1], _e[z + 8 >> 2] = _e[D + (X << 2) >> 2], (0 | _e[T >> 2]) >>> 0 <= t >>> 0 && (_e[H >> 2] = 866, _e[4 + H >> 2] = 910, _e[8 + H >> 2] = 1497, Oe(L, 812, H), Ae(L)), _e[z + 12 >> 2] = _e[(0 | _e[f >> 2]) + (t << 2) >> 2]), 2 != (0 | (W = W + 1 | 0));) {
                      z = z + 16 | 0;
                    } else for (Z = 1 ^ j, j = 1547 + (ee << 2) + J | 0, W = 0, z = Q; e = (e = (G = (J = (0 | Te(O, I)) + e | 0) - m | 0) >> 31) & J | G & ~e, t = (t = (J = (G = (0 | Te(O, le)) + t | 0) - A | 0) >> 31) & G | J & ~t, 0 != (0 | W) | Z || (X = 0 | de[j >> 0], G = 3 * e | 0, (0 | _e[l >> 2]) >>> 0 <= G >>> 0 && (_e[F >> 2] = 866, _e[4 + F >> 2] = 910, _e[8 + F >> 2] = 1497, Oe(L, 812, F), Ae(L)), J = (0 | _e[c >> 2]) + (G << 1) | 0, _e[z >> 2] = (0 | Ee[J >> 1]) << 16 | _e[d + (X << 2) >> 2], _e[z + 4 >> 2] = (0 | Ee[J + 4 >> 1]) << 16 | 0 | Ee[J + 2 >> 1], _e[z + 8 >> 2] = _e[D + (X << 2) >> 2], (0 | _e[T >> 2]) >>> 0 <= t >>> 0 && (_e[x >> 2] = 866, _e[4 + x >> 2] = 910, _e[8 + x >> 2] = 1497, Oe(L, 812, x), Ae(L)), _e[z + 12 >> 2] = _e[(0 | _e[f >> 2]) + (t << 2) >> 2]), 2 != (0 | (W = W + 1 | 0));) {
                      z = z + 16 | 0;
                    }
                    if (2 == (0 | (q = q + 1 | 0))) break;
                    Q = Q + n | 0;
                  }

                  if ((0 | (V = ae + V | 0)) == (0 | ie)) break;
                  re = re + te | 0;
                }
                if ((0 | (ue = ue + 1 | 0)) == (0 | u)) break;
                oe = oe + g | 0;
              }
              fe = fe + 1 | 0;
            } while ((0 | fe) != (0 | p));

            return Me = ce, 1;
          }(e, n, t, o, f, l, a, u))) return (t = 0) | t;
          break;

        case 9:
          if (!(0 | function (e, r, i, n, t, a, o, u) {
            r |= 0, i |= 0, n |= 0, t |= 0, a |= 0, o |= 0, u |= 0;

            var f,
                l,
                c,
                s,
                _,
                d,
                E,
                M,
                T,
                A,
                h,
                b,
                m,
                p,
                S,
                v,
                k,
                y,
                g,
                O,
                R,
                C,
                N,
                w = 0,
                P = 0,
                I = 0,
                L = 0,
                D = 0,
                U = 0,
                H = 0,
                F = 0,
                x = 0,
                B = 0,
                Y = 0,
                K = 0,
                V = 0,
                X = 0,
                G = 0,
                W = 0,
                z = 0,
                j = 0,
                J = Me;

            if (Me = Me + 592 | 0, R = J + 48 | 0, N = J + 32 | 0, C = J + 16 | 0, y = (O = J) + 80 | 0, g = J + 64 | 0, d = 0 | _e[(_ = (e |= 0) + 272 | 0) >> 2], j = 0 | _e[e + 88 >> 2], E = (0 | de[j + 63 >> 0]) << 8 | 0 | de[j + 64 >> 0], M = 255 & (j = 0 | se[j + 17 >> 0]), !(j << 24 >> 24)) return Me = J, 1;
            T = 0 == (0 | u), h = (A = o + -1 | 0) << 4, b = u + -1 | 0, m = n << 1, p = e + 92 | 0, S = e + 116 | 0, v = e + 164 | 0, k = e + 268 | 0, j = e + 212 | 0, s = 0 == (1 & t | 0), c = 0 == (1 & a | 0), l = e + 288 | 0, f = e + 284 | 0, i = t = z = 0, a = 1;

            do {
              if (!T) for (G = 0 | _e[r + (z << 2) >> 2], W = 0;;) {
                if (w = 0 == (0 | (X = 1 & W)), V = (X << 5 ^ 32) - 16 | 0, X = (X << 1 ^ 2) - 1 | 0, (0 | (e = w ? 0 : A)) != (0 | (Y = w ? o : -1))) for (K = c | (0 | W) != (0 | b), B = w ? G : G + h | 0;;) {
                  for (1 == (0 | a) && (a = 512 | Te(p, S)), x = 7 & a, a >>>= 3, P = 0 | de[1539 + x >> 0], w = 0; i = (F = (H = (U = (0 | Te(p, v)) + i | 0) - d | 0) >> 31) & U | H & ~F, (0 | _e[_ >> 2]) >>> 0 <= i >>> 0 && (_e[O >> 2] = 866, _e[O + 4 >> 2] = 910, _e[O + 8 >> 2] = 1497, Oe(y, 812, O), Ae(y)), _e[g + (w << 2) >> 2] = Ee[(0 | _e[k >> 2]) + (i << 1) >> 1], (w = w + 1 | 0) >>> 0 < P >>> 0;) {
                    ;
                  }

                  for (F = s | (0 | e) != (0 | A), U = 0, H = B; D = K | 0 == (0 | U), P = U << 1, L = (L = (I = (w = (0 | Te(p, j)) + t | 0) - E | 0) >> 31) & w | I & ~L, F ? (D && (t = 0 | de[1547 + (x << 2) + P >> 0], w = 3 * L | 0, (0 | _e[l >> 2]) >>> 0 <= w >>> 0 && (_e[C >> 2] = 866, _e[4 + C >> 2] = 910, _e[8 + C >> 2] = 1497, Oe(y, 812, C), Ae(y)), I = (0 | _e[f >> 2]) + (w << 1) | 0, _e[H >> 2] = (0 | Ee[I >> 1]) << 16 | _e[g + (t << 2) >> 2], _e[H + 4 >> 2] = (0 | Ee[I + 4 >> 1]) << 16 | 0 | Ee[I + 2 >> 1]), I = H + 8 | 0, t = (t = (L = (w = (0 | Te(p, j)) + L | 0) - E | 0) >> 31) & w | L & ~t, D && (w = 0 | de[1547 + (x << 2) + (1 | P) >> 0], P = 3 * t | 0, (0 | _e[l >> 2]) >>> 0 <= P >>> 0 && (_e[R >> 2] = 866, _e[4 + R >> 2] = 910, _e[8 + R >> 2] = 1497, Oe(y, 812, R), Ae(y)), D = (0 | _e[f >> 2]) + (P << 1) | 0, _e[I >> 2] = (0 | Ee[D >> 1]) << 16 | _e[g + (w << 2) >> 2], _e[H + 12 >> 2] = (0 | Ee[D + 4 >> 1]) << 16 | 0 | Ee[D + 2 >> 1])) : (D && (t = 0 | de[1547 + (x << 2) + P >> 0], w = 3 * L | 0, (0 | _e[l >> 2]) >>> 0 <= w >>> 0 && (_e[N >> 2] = 866, _e[4 + N >> 2] = 910, _e[8 + N >> 2] = 1497, Oe(y, 812, N), Ae(y)), D = (0 | _e[f >> 2]) + (w << 1) | 0, _e[H >> 2] = (0 | Ee[D >> 1]) << 16 | _e[g + (t << 2) >> 2], _e[H + 4 >> 2] = (0 | Ee[D + 4 >> 1]) << 16 | 0 | Ee[D + 2 >> 1]), t = (t = (D = (L = (0 | Te(p, j)) + L | 0) - E | 0) >> 31) & L | D & ~t), 2 != (0 | (U = U + 1 | 0));) {
                    H = H + n | 0;
                  }

                  if ((0 | (e = X + e | 0)) == (0 | Y)) break;
                  B = B + V | 0;
                }
                if ((0 | (W = W + 1 | 0)) == (0 | u)) break;
                G = G + m | 0;
              }
              z = z + 1 | 0;
            } while ((0 | z) != (0 | M));

            return Me = J, 1;
          }(e, n, t, o, f, l, a, u))) return (t = 0) | t;
          break;

        case 8:
        case 7:
          if (!(0 | function (e, r, i, n, t, a, o, u) {
            r |= 0, i |= 0, n |= 0, t |= 0, a |= 0, o |= 0, u |= 0;

            var f,
                l,
                c,
                s,
                _,
                d,
                E,
                M,
                T,
                A,
                h,
                b,
                m,
                p,
                S,
                v,
                k,
                y,
                g,
                O,
                R,
                C,
                N,
                w,
                P,
                I,
                L = 0,
                D = 0,
                U = 0,
                H = 0,
                F = 0,
                x = 0,
                B = 0,
                Y = 0,
                K = 0,
                V = 0,
                X = 0,
                G = 0,
                W = 0,
                z = 0,
                j = 0,
                J = 0,
                Z = 0,
                q = 0,
                Q = 0,
                $ = 0,
                ee = 0,
                re = 0,
                ie = 0,
                ne = 0,
                te = 0,
                ae = Me;

            if (Me = Me + 640 | 0, w = ae + 80 | 0, N = ae + 64 | 0, C = ae + 48 | 0, I = ae + 32 | 0, P = ae + 16 | 0, g = (R = ae) + 128 | 0, O = ae + 112 | 0, _ = ae + 96 | 0, E = 0 | _e[(d = (e |= 0) + 272 | 0) >> 2], te = 0 | _e[e + 88 >> 2], M = (0 | de[te + 63 >> 0]) << 8 | 0 | de[te + 64 >> 0], T = 255 & (te = 0 | se[te + 17 >> 0]), !(te << 24 >> 24)) return Me = ae, 1;
            A = 0 == (0 | u), b = (h = o + -1 | 0) << 5, m = u + -1 | 0, p = n << 1, S = e + 92 | 0, v = e + 116 | 0, k = e + 164 | 0, y = e + 268 | 0, te = e + 212 | 0, s = 0 == (1 & t | 0), c = 0 == (1 & a | 0), l = e + 288 | 0, f = e + 284 | 0, i = t = a = e = ne = 0, L = 1;

            do {
              if (!A) for (re = 0 | _e[r + (ne << 2) >> 2], ie = 0;;) {
                if (U = 0 == (0 | (ee = 1 & ie)), $ = (ee << 6 ^ 64) - 32 | 0, ee = (ee << 1 ^ 2) - 1 | 0, (0 | (D = U ? 0 : h)) != (0 | (q = U ? o : -1))) for (Q = c | (0 | ie) != (0 | m), Z = U ? re : re + b | 0;;) {
                  for (1 == (0 | L) && (L = 512 | Te(S, v)), J = 7 & L, L >>>= 3, H = 0 | de[1539 + J >> 0], U = 0; i = (j = (z = (W = (0 | Te(S, k)) + i | 0) - E | 0) >> 31) & W | z & ~j, (0 | _e[d >> 2]) >>> 0 <= i >>> 0 && (_e[R >> 2] = 866, _e[R + 4 >> 2] = 910, _e[R + 8 >> 2] = 1497, Oe(g, 812, R), Ae(g)), _e[O + (U << 2) >> 2] = Ee[(0 | _e[y >> 2]) + (i << 1) >> 1], (U = U + 1 | 0) >>> 0 < H >>> 0;) {
                    ;
                  }

                  for (U = 0; a = (j = (z = (W = (0 | Te(S, k)) + a | 0) - E | 0) >> 31) & W | z & ~j, (0 | _e[d >> 2]) >>> 0 <= a >>> 0 && (_e[P >> 2] = 866, _e[4 + P >> 2] = 910, _e[8 + P >> 2] = 1497, Oe(g, 812, P), Ae(g)), _e[_ + (U << 2) >> 2] = Ee[(0 | _e[y >> 2]) + (a << 1) >> 1], (U = U + 1 | 0) >>> 0 < H >>> 0;) {
                    ;
                  }

                  for (j = s | (0 | D) != (0 | h), W = 0, z = Z;;) {
                    if (V = Q | 0 == (0 | W), X = W << 1, j) for (Y = 0, K = z; t = (t = (B = (G = (0 | Te(S, te)) + t | 0) - M | 0) >> 31) & G | B & ~t, e = (e = (G = (B = (0 | Te(S, te)) + e | 0) - M | 0) >> 31) & B | G & ~e, V && (B = 0 | de[Y + X + (1547 + (J << 2)) >> 0], H = 3 * t | 0, (U = 0 | _e[l >> 2]) >>> 0 <= H >>> 0 && (_e[I >> 2] = 866, _e[4 + I >> 2] = 910, _e[8 + I >> 2] = 1497, Oe(g, 812, I), Ae(g), U = 0 | _e[l >> 2]), H = (F = 0 | _e[f >> 2]) + (H << 1) | 0, G = (U = (x = 3 * e | 0) >>> 0 < U >>> 0 ? F : (_e[C >> 2] = 866, _e[4 + C >> 2] = 910, _e[8 + C >> 2] = 1497, Oe(g, 812, C), Ae(g), 0 | _e[f >> 2])) + (x << 1) | 0, _e[K >> 2] = (0 | Ee[H >> 1]) << 16 | _e[O + (B << 2) >> 2], _e[K + 4 >> 2] = (0 | Ee[H + 4 >> 1]) << 16 | 0 | Ee[H + 2 >> 1], _e[K + 8 >> 2] = (0 | Ee[G >> 1]) << 16 | _e[_ + (B << 2) >> 2], _e[K + 12 >> 2] = (0 | Ee[G + 4 >> 1]) << 16 | 0 | Ee[G + 2 >> 1]), 2 != (0 | (Y = Y + 1 | 0));) {
                      K = K + 16 | 0;
                    } else for (G = 1 ^ V, V = 1547 + (J << 2) + X | 0, Y = 0, K = z; t = (t = (B = (X = (0 | Te(S, te)) + t | 0) - M | 0) >> 31) & X | B & ~t, e = (e = (X = (B = (0 | Te(S, te)) + e | 0) - M | 0) >> 31) & B | X & ~e, 0 != (0 | Y) | G || (B = 0 | de[V >> 0], H = 3 * t | 0, (U = 0 | _e[l >> 2]) >>> 0 <= H >>> 0 && (_e[N >> 2] = 866, _e[4 + N >> 2] = 910, _e[8 + N >> 2] = 1497, Oe(g, 812, N), Ae(g), U = 0 | _e[l >> 2]), H = (F = 0 | _e[f >> 2]) + (H << 1) | 0, X = (U = (x = 3 * e | 0) >>> 0 < U >>> 0 ? F : (_e[w >> 2] = 866, _e[4 + w >> 2] = 910, _e[8 + w >> 2] = 1497, Oe(g, 812, w), Ae(g), 0 | _e[f >> 2])) + (x << 1) | 0, _e[K >> 2] = (0 | Ee[H >> 1]) << 16 | _e[O + (B << 2) >> 2], _e[K + 4 >> 2] = (0 | Ee[H + 4 >> 1]) << 16 | 0 | Ee[H + 2 >> 1], _e[K + 8 >> 2] = (0 | Ee[X >> 1]) << 16 | _e[_ + (B << 2) >> 2], _e[K + 12 >> 2] = (0 | Ee[X + 4 >> 1]) << 16 | 0 | Ee[X + 2 >> 1]), 2 != (0 | (Y = Y + 1 | 0));) {
                      K = K + 16 | 0;
                    }
                    if (2 == (0 | (W = W + 1 | 0))) break;
                    z = z + n | 0;
                  }

                  if ((0 | (D = ee + D | 0)) == (0 | q)) break;
                  Z = Z + $ | 0;
                }
                if ((0 | (ie = ie + 1 | 0)) == (0 | u)) break;
                re = re + p | 0;
              }
              ne = ne + 1 | 0;
            } while ((0 | ne) != (0 | T));

            return Me = ae, 1;
          }(e, n, t, o, f, l, a, u))) return (t = 0) | t;
          break;

        default:
          return (t = 0) | t;
      }

      return 0 | (t = 1);
    }

    function z(e, r, i) {
      e |= 0, r |= 0;
      var n,
          t,
          a = 0;
      if (8192 <= (0 | (i |= 0))) return 0 | O(0 | e, 0 | r, 0 | i);

      if (t = 0 | e, n = e + i | 0, (3 & e) == (3 & r)) {
        for (; 3 & e;) {
          if (!i) return 0 | t;
          se[e >> 0] = 0 | se[r >> 0], e = e + 1 | 0, r = r + 1 | 0, i = i - 1 | 0;
        }

        for (a = (i = -4 & n | 0) - 64 | 0; (0 | e) <= (0 | a);) {
          _e[e >> 2] = _e[r >> 2], _e[e + 4 >> 2] = _e[r + 4 >> 2], _e[e + 8 >> 2] = _e[r + 8 >> 2], _e[e + 12 >> 2] = _e[r + 12 >> 2], _e[e + 16 >> 2] = _e[r + 16 >> 2], _e[e + 20 >> 2] = _e[r + 20 >> 2], _e[e + 24 >> 2] = _e[r + 24 >> 2], _e[e + 28 >> 2] = _e[r + 28 >> 2], _e[e + 32 >> 2] = _e[r + 32 >> 2], _e[e + 36 >> 2] = _e[r + 36 >> 2], _e[e + 40 >> 2] = _e[r + 40 >> 2], _e[e + 44 >> 2] = _e[r + 44 >> 2], _e[e + 48 >> 2] = _e[r + 48 >> 2], _e[e + 52 >> 2] = _e[r + 52 >> 2], _e[e + 56 >> 2] = _e[r + 56 >> 2], _e[e + 60 >> 2] = _e[r + 60 >> 2], e = e + 64 | 0, r = r + 64 | 0;
        }

        for (; (0 | e) < (0 | i);) {
          _e[e >> 2] = _e[r >> 2], e = e + 4 | 0, r = r + 4 | 0;
        }
      } else for (i = n - 4 | 0; (0 | e) < (0 | i);) {
        se[e >> 0] = 0 | se[r >> 0], se[e + 1 >> 0] = 0 | se[r + 1 >> 0], se[e + 2 >> 0] = 0 | se[r + 2 >> 0], se[e + 3 >> 0] = 0 | se[r + 3 >> 0], e = e + 4 | 0, r = r + 4 | 0;
      }

      for (; (0 | e) < (0 | n);) {
        se[e >> 0] = 0 | se[r >> 0], e = e + 1 | 0, r = r + 1 | 0;
      }

      return 0 | t;
    }

    function j(e, r, i) {
      r |= 0, i |= 0;
      var n,
          t,
          a,
          o,
          u = 0,
          f = 0,
          l = 0,
          c = 0,
          s = 0,
          _ = 0,
          d = Me;
      Me = Me + 48 | 0, o = d + 16 | 0, f = (l = d) + 32 | 0, u = 0 | _e[(t = (e |= 0) + 28 | 0) >> 2], _e[f >> 2] = u, u = (0 | _e[(a = e + 20 | 0) >> 2]) - u | 0, _e[f + 4 >> 2] = u, _e[f + 8 >> 2] = r, u = u + (_e[f + 12 >> 2] = i) | 0, n = e + 60 | 0, _e[l >> 2] = _e[n >> 2], _e[l + 4 >> 2] = f, _e[l + 8 >> 2] = 2, l = 0 | Le(0 | I(146, 0 | l));

      e: do {
        if ((0 | u) != (0 | l)) {
          for (r = 2; !((0 | l) < 0);) {
            if (u = u - l | 0, r = ((s = (_ = 0 | _e[f + 4 >> 2]) >>> 0 < l >>> 0) << 31 >> 31) + r | 0, _ = l - (s ? _ : 0) | 0, _e[(f = s ? f + 8 | 0 : f) >> 2] = (0 | _e[f >> 2]) + _, _e[(s = f + 4 | 0) >> 2] = (0 | _e[s >> 2]) - _, _e[o >> 2] = _e[n >> 2], _e[4 + o >> 2] = f, _e[8 + o >> 2] = r, (0 | u) == (0 | (l = 0 | Le(0 | I(146, 0 | o))))) {
              c = 3;
              break e;
            }
          }

          _e[e + 16 >> 2] = 0, _e[t >> 2] = 0, _e[a >> 2] = 0, _e[e >> 2] = 32 | _e[e >> 2], i = 2 == (0 | r) ? 0 : i - (0 | _e[f + 4 >> 2]) | 0;
        } else c = 3;
      } while (0);

      return 3 == (0 | c) && (_ = 0 | _e[e + 44 >> 2], _e[e + 16 >> 2] = _ + (0 | _e[e + 48 >> 2]), _e[t >> 2] = _, _e[a >> 2] = _), Me = d, 0 | i;
    }

    function J(e, r, i) {
      e |= 0, r |= 0, i |= 0;
      var n,
          t,
          a,
          o,
          u = 0,
          f = 0,
          l = 0,
          c = 0,
          s = 0,
          _ = 0,
          d = 0,
          E = 0,
          M = Me;

      for (Me = Me + 224 | 0, n = M + 120 | 0, o = (a = M) + 136 | 0, f = (u = t = M + 80 | 0) + 40 | 0; (0 | (u = u + 4 | (_e[u >> 2] = 0))) < (0 | f);) {
        ;
      }

      return _e[n >> 2] = _e[i >> 2], i = (0 | U(0, r, n, a, t)) < 0 ? -1 : (E = -1 < (0 | _e[e + 76 >> 2]) ? 0 | ze() : 0, d = 32 & (i = 0 | _e[e >> 2]), (0 | se[e + 74 >> 0]) < 1 && (_e[e >> 2] = -33 & i), 0 | _e[(u = e + 48 | 0) >> 2] ? i = 0 | U(e, r, n, a, t) : (l = 0 | _e[(f = e + 44 | 0) >> 2], _e[f >> 2] = o, _e[(c = e + 28 | 0) >> 2] = o, _e[(s = e + 20 | 0) >> 2] = o, _e[u >> 2] = 80, _e[(_ = e + 16 | 0) >> 2] = 80 + o, i = 0 | U(e, r, n, a, t), l && (Ze[7 & _e[e + 36 >> 2]](e, 0, 0), i = 0 == (0 | _e[s >> 2]) ? -1 : i, _e[f >> 2] = l, _e[u >> 2] = 0, _e[_ >> 2] = 0, _e[c >> 2] = 0, _e[s >> 2] = 0)), u = 0 | _e[e >> 2], _e[e >> 2] = u | d, 0 | E && We(), 0 == (32 & u | 0) ? i : -1), Me = M, 0 | i;
    }

    function Z(e, r, i, n) {
      r |= 0, i |= 0, n |= 0;
      var t,
          a,
          o,
          u,
          f,
          l,
          c = 0,
          s = 0,
          _ = Me;

      for (Me = Me + 64 | 0, f = _, s = 0 | _e[(e |= 0) >> 2], l = e + (0 | _e[s + -8 >> 2]) | 0, s = 0 | _e[s + -4 >> 2], _e[f >> 2] = i, _e[f + 4 >> 2] = e, _e[f + 8 >> 2] = r, _e[f + 12 >> 2] = n, r = f + 20 | 0, n = f + 24 | 0, t = f + 28 | 0, a = f + 32 | 0, o = f + 40 | 0, u = (c = e = f + 16 | 0) + 36 | 0; (0 | (c = c + 4 | (_e[c >> 2] = 0))) < (0 | u);) {
        ;
      }

      K[e + 36 >> 1] = 0, se[e + 38 >> 0] = 0;

      e: do {
        if (0 | He(s, i)) _e[f + 48 >> 2] = 1, ir[3 & _e[20 + (0 | _e[s >> 2]) >> 2]](s, f, l, l, 1, 0), e = 1 == (0 | _e[n >> 2]) ? l : 0;else {
          switch (qe[3 & _e[24 + (0 | _e[s >> 2]) >> 2]](s, f, l, 1, 0), 0 | _e[f + 36 >> 2]) {
            case 0:
              e = 1 == (0 | _e[o >> 2]) & 1 == (0 | _e[t >> 2]) & 1 == (0 | _e[a >> 2]) ? 0 | _e[r >> 2] : 0;
              break e;

            case 1:
              break;

            default:
              e = 0;
              break e;
          }

          if (1 != (0 | _e[n >> 2]) && !(0 == (0 | _e[o >> 2]) & 1 == (0 | _e[t >> 2]) & 1 == (0 | _e[a >> 2]))) {
            e = 0;
            break;
          }

          e = 0 | _e[e >> 2];
        }
      } while (0);

      return Me = _, 0 | e;
    }

    function q(e) {
      var r = 0,
          i = 0,
          n = 0,
          t = 0,
          a = 0,
          o = 0,
          u = 0,
          f = Me;
      if (Me = Me + 544 | 0, o = f + 16 | 0, t = (r = f) + 32 | 0, 8192 <= ((i = 0 | _e[(a = (e |= 0) + 8 | 0) >> 2]) + -1 | 0) >>> 0 && (_e[r >> 2] = 866, _e[r + 4 >> 2] = 3006, _e[r + 8 >> 2] = 1257, Oe(t, 812, r), Ae(t)), _e[e >> 2] = i, u = (r = 0 | _e[(n = e + 20 | 0) >> 2]) ? i : ((r = 0 | ne(180, 0)) ? (_e[(u = r + 164 | 0) >> 2] = 0, _e[u + 4 >> 2] = 0, _e[u + 8 >> 2] = 0, _e[u + 12 >> 2] = 0) : r = 0, _e[n >> 2] = r, 0 | _e[e >> 2]), o = 0 | _e[a >> 2] ? u : (_e[o >> 2] = 866, _e[o + 4 >> 2] = 910, _e[o + 8 >> 2] = 1497, Oe(t, 812, o), Ae(t), 0 | _e[e >> 2]), t = 0 | _e[e + 4 >> 2], !(16 < o >>> 0)) return e = (e = 0) | H(r, u, t, e), Me = f, 0 | e;

      for (i = o, n = 0; a = n + 1 | 0, 3 < i >>> 0;) {
        i >>>= 1, n = a;
      }

      return e = 0 | H(r, u, t, e = 255 & ((e = n + 2 + (32 != (0 | a) & 1 << a >>> 0 < o >>> 0 & 1) | 0) >>> 0 < 11 ? e : 11)), Me = f, 0 | e;
    }

    function Q(e) {
      var r,
          i,
          n,
          t,
          a,
          o = 0,
          u = 0,
          f = Me;
      Me = Me + 576 | 0, t = f + 48 | 0, a = f + 32 | 0, i = f + 16 | 0, n = (r = f) + 64 | 0, o = 0 | _e[(e |= 0) + 168 >> 2];

      do {
        if (0 | o) {
          if (u = 0 | _e[o + -4 >> 2], o = o + -8 | 0, 0 != (0 | u) && (0 | u) == (0 | ~_e[o >> 2]) || (_e[r >> 2] = 866, _e[r + 4 >> 2] = 651, _e[r + 8 >> 2] = 1579, Oe(n, 812, r), Ae(n)), 7 & o) {
            _e[i >> 2] = 866, _e[4 + i >> 2] = 2506, _e[8 + i >> 2] = 1232, Oe(n, 812, i), Ae(n);
            break;
          }

          fe(o, 0, 0, 1, 0);
          break;
        }
      } while (0);

      if (o = 0 | _e[e + 176 >> 2]) return u = 0 | _e[o + -4 >> 2], o = o + -8 | 0, 0 != (0 | u) && (0 | u) == (0 | ~_e[o >> 2]) || (_e[a >> 2] = 866, _e[4 + a >> 2] = 651, _e[8 + a >> 2] = 1579, Oe(n, 812, a), Ae(n)), 7 & o ? (_e[t >> 2] = 866, _e[4 + t >> 2] = 2506, _e[8 + t >> 2] = 1232, Oe(n, 812, t), Ae(n)) : fe(o, 0, 0, 1, 0), void (Me = f);
      Me = f;
    }

    function $(e, r, i) {
      var n;
      return !(0 != (0 | (e |= 0)) & 73 < (r |= 0) >>> 0 & 0 != (0 | (i |= 0))) || 40 != (0 | _e[i >> 2]) || 18552 != ((0 | de[e >> 0]) << 8 | 0 | de[e + 1 >> 0] | 0) || ((0 | de[e + 2 >> 0]) << 8 | 0 | de[e + 3 >> 0]) >>> 0 < 74 || ((0 | de[e + 7 >> 0]) << 16 | (0 | de[e + 6 >> 0]) << 24 | (0 | de[e + 8 >> 0]) << 8 | 0 | de[e + 9 >> 0]) >>> 0 > r >>> 0 ? (i = 0) | i : (_e[i + 4 >> 2] = (0 | de[e + 12 >> 0]) << 8 | 0 | de[e + 13 >> 0], _e[i + 8 >> 2] = (0 | de[e + 14 >> 0]) << 8 | 0 | de[e + 15 >> 0], _e[i + 12 >> 2] = de[e + 16 >> 0], _e[i + 16 >> 2] = de[e + 17 >> 0], r = e + 18 | 0, _e[(n = i + 32 | 0) >> 2] = de[r >> 0], r = (_e[4 + n >> 2] = 0) | se[r >> 0], _e[i + 20 >> 2] = r << 24 >> 24 == 0 | r << 24 >> 24 == 9 ? 8 : 16, _e[i + 24 >> 2] = (0 | de[e + 26 >> 0]) << 16 | (0 | de[e + 25 >> 0]) << 24 | (0 | de[e + 27 >> 0]) << 8 | 0 | de[e + 28 >> 0], _e[i + 28 >> 2] = (0 | de[e + 30 >> 0]) << 16 | (0 | de[e + 29 >> 0]) << 24 | (0 | de[e + 31 >> 0]) << 8 | 0 | de[e + 32 >> 0], 0 | (i = 1));
    }

    function ee(e, r) {
      e |= 0;
      var i,
          n,
          t = 0,
          a = 0,
          o = 0,
          u = 0,
          f = 0,
          l = Me;
      if (Me = Me + 544 | 0, f = l + 16 | 0, u = (t = l) + 32 | 0, 33 <= (r |= 0) >>> 0 && (_e[t >> 2] = 866, _e[t + 4 >> 2] = 3199, _e[t + 8 >> 2] = 1350, Oe(u, 812, t), Ae(u)), (0 | r) <= (0 | (t = 0 | _e[(n = e + 20 | 0) >> 2]))) return u = t, f = (a = 0 | _e[(o = a = e + 16 | 0) >> 2]) >>> (f = 32 - r | 0), a <<= r, _e[o >> 2] = a, r = u - r | 0, _e[n >> 2] = r, Me = l, 0 | f;

      for (a = e + 4 | 0, o = e + 8 | 0, i = e + 16 | 0; e = (0 | (e = 0 | _e[a >> 2])) == (0 | _e[o >> 2]) ? 0 : (_e[a >> 2] = e + 1, 0 | de[e >> 0]), t = t + 8 | 0, 33 <= (0 | (_e[n >> 2] = t)) && (_e[f >> 2] = 866, _e[f + 4 >> 2] = 3208, _e[f + 8 >> 2] = 1366, Oe(u, 812, f), Ae(u), t = 0 | _e[n >> 2]), e = e << 32 - t | _e[i >> 2], _e[i >> 2] = e, (0 | t) < (0 | r);) {
        ;
      }

      return f = e >>> (f = 32 - r | 0), u = e << r, _e[i >> 2] = u, r = t - r | 0, _e[n >> 2] = r, Me = l, 0 | f;
    }

    function re(e, r, i) {
      e |= 0, r |= 0;
      var n = 0,
          t = 0,
          a = 0,
          o = 0,
          u = 0;
      (t = 0 | _e[(n = (i |= 0) + 16 | 0) >> 2]) ? a = 5 : 0 | be(i) ? n = 0 : (t = 0 | _e[n >> 2], a = 5);

      e: do {
        if (5 == (0 | a)) {
          if ((t - (n = o = 0 | _e[(u = i + 20 | 0) >> 2]) | 0) >>> 0 < r >>> 0) {
            n = 0 | Ze[7 & _e[i + 36 >> 2]](i, e, r);
            break;
          }

          r: do {
            if (-1 < (0 | se[i + 75 >> 0])) {
              for (o = r;;) {
                if (!o) {
                  a = 0, t = e;
                  break r;
                }

                if (10 == (0 | se[e + (t = o + -1 | 0) >> 0])) break;
                o = t;
              }

              if ((n = 0 | Ze[7 & _e[i + 36 >> 2]](i, e, o)) >>> 0 < o >>> 0) break e;
              t = e + (a = o) | 0, r = r - o | 0, n = 0 | _e[u >> 2];
            } else a = 0, t = e;
          } while (0);

          z(0 | n, 0 | t, 0 | r), _e[u >> 2] = (0 | _e[u >> 2]) + r, n = a + r | 0;
        }
      } while (0);

      return 0 | n;
    }

    function ie(e) {
      var r,
          i = 0,
          n = 0,
          t = 0,
          a = Me;
      Me = Me + 544 | 0, t = a + 16 | 0, r = (n = a) + 32 | 0, i = 0 | _e[(e |= 0) + 20 >> 2];

      do {
        if (0 | i) {
          if (Q(i), 7 & i) {
            _e[n >> 2] = 866, _e[n + 4 >> 2] = 2506, _e[n + 8 >> 2] = 1232, Oe(r, 812, n), Ae(r);
            break;
          }

          fe(i, 0, 0, 1, 0);
          break;
        }
      } while (0);

      if (!(n = 0 | _e[(i = e + 4 | 0) >> 2])) return se[(t = e + 16 | 0) >> 0] = 0, void (Me = a);
      7 & n ? (_e[t >> 2] = 866, _e[t + 4 >> 2] = 2506, _e[t + 8 >> 2] = 1232, Oe(r, 812, t), Ae(r)) : fe(n, 0, 0, 1, 0), _e[i >> 2] = 0, _e[e + 8 >> 2] = 0, _e[e + 12 >> 2] = 0, se[(t = e + 16 | 0) >> 0] = 0, Me = a;
    }

    function ne(e, r) {
      r |= 0;
      var i,
          n,
          t,
          a = 0,
          o = 0,
          u = 0,
          f = Me;
      return Me = Me + 560 | 0, u = f + 32 | 0, t = f + 16 | 0, n = (a = f) + 48 | 0, i = f + 44 | 0, 2147418112 < (o = 0 | (o = (e |= 0) + 3 & -4) ? o : 4) >>> 0 ? (_e[a >> 2] = 866, _e[a + 4 >> 2] = 2506, _e[a + 8 >> 2] = 1103, Oe(n, 812, a), Ae(n), Me = f, (u = 0) | u) : (e = 0 | fe(0, _e[i >> 2] = o, i, 1, 0), a = 0 | _e[i >> 2], 0 | r && (_e[r >> 2] = a), 0 == (0 | e) | a >>> 0 < o >>> 0 ? (_e[t >> 2] = 866, _e[4 + t >> 2] = 2506, _e[8 + t >> 2] = 1129, Oe(n, 812, t), Ae(n), e = 0) : 7 & e && (_e[u >> 2] = 866, _e[u + 4 >> 2] = 2533, _e[u + 8 >> 2] = 1156, Oe(n, 812, u), Ae(n)), Me = f, 0 | (u = e));
    }

    function ae(e, r, i) {
      r |= 0;
      var n = 0,
          t = 0,
          a = 0,
          o = (e |= 0) + (i |= 0) | 0;

      if (r &= 255, 67 <= (0 | i)) {
        for (; 3 & e;) {
          se[e >> 0] = r, e = e + 1 | 0;
        }

        for (t = (n = -4 & o | 0) - 64 | 0, a = r | r << 8 | r << 16 | r << 24; (0 | e) <= (0 | t);) {
          _e[e >> 2] = a, _e[e + 4 >> 2] = a, _e[e + 8 >> 2] = a, _e[e + 12 >> 2] = a, _e[e + 16 >> 2] = a, _e[e + 20 >> 2] = a, _e[e + 24 >> 2] = a, _e[e + 28 >> 2] = a, _e[e + 32 >> 2] = a, _e[e + 36 >> 2] = a, _e[e + 40 >> 2] = a, _e[e + 44 >> 2] = a, _e[e + 48 >> 2] = a, _e[e + 52 >> 2] = a, _e[e + 56 >> 2] = a, _e[e + 60 >> 2] = a, e = e + 64 | 0;
        }

        for (; (0 | e) < (0 | n);) {
          _e[e >> 2] = a, e = e + 4 | 0;
        }
      }

      for (; (0 | e) < (0 | o);) {
        se[e >> 0] = r, e = e + 1 | 0;
      }

      return o - i | 0;
    }

    function oe(e, r, i, n, t) {
      e |= 0, i |= 0, n |= 0, t |= 0;
      var a = 0,
          o = 0,
          u = 0,
          f = 0;
      se[(r |= 0) + 53 >> 0] = 1;

      do {
        if ((0 | _e[r + 4 >> 2]) == (0 | n)) {
          if (se[r + 52 >> 0] = 1, u = r + 54 | 0, f = r + 48 | 0, o = r + 24 | 0, e = r + 36 | 0, !(a = 0 | _e[(n = r + 16 | 0) >> 2])) {
            if (_e[n >> 2] = i, _e[o >> 2] = t, !((_e[e >> 2] = 1) == (0 | _e[f >> 2]) & 1 == (0 | t))) break;
            se[u >> 0] = 1;
            break;
          }

          if ((0 | a) != (0 | i)) {
            _e[e >> 2] = 1 + (0 | _e[e >> 2]), se[u >> 0] = 1;
            break;
          }

          2 == (0 | (e = 0 | _e[o >> 2])) && (e = _e[o >> 2] = t), 1 == (0 | _e[f >> 2]) & 1 == (0 | e) && (se[u >> 0] = 1);
        }
      } while (0);
    }

    function ue(e, r) {
      e |= 0;
      var i,
          n,
          t = 0,
          a = 0,
          o = 0,
          u = 0,
          f = Me;
      Me = Me + 16 | 0, n = 255 & (r |= 0), se[(i = f) >> 0] = n, (o = 0 | _e[(a = e + 16 | 0) >> 2]) ? u = 4 : 0 | be(e) ? t = -1 : (o = 0 | _e[a >> 2], u = 4);

      do {
        if (4 == (0 | u)) {
          if ((a = 0 | _e[(u = e + 20 | 0) >> 2]) >>> 0 < o >>> 0 && (0 | (t = 255 & r)) != (0 | se[e + 75 >> 0])) {
            _e[u >> 2] = a + 1, se[a >> 0] = n;
            break;
          }

          t = 1 == (0 | Ze[7 & _e[e + 36 >> 2]](e, i, 1)) ? 0 | de[i >> 0] : -1;
        }
      } while (0);

      return Me = f, 0 | t;
    }

    function fe(e, r, i, n, t) {
      e |= 0, r |= 0, i |= 0, n |= 0, t |= 0;

      do {
        if (e) {
          if (!r) {
            if (F(e), !i) {
              r = 0;
              break;
            }

            r = _e[i >> 2] = 0;
            break;
          }

          n ? e = 0 == (0 | (r = 0 | function (e, r) {
            r |= 0;
            var i = 0,
                n = 0;
            if (!(e |= 0)) return 0 | (r = 0 | L(r));
            if (4294967231 < r >>> 0) return _e[(r = 296) >> 2] = 12, (r = 0) | r;
            if (0 | (i = 0 | function (e, r) {
              r |= 0;
              var i,
                  n = 0,
                  t = 0,
                  a = 0,
                  o = 0,
                  u = 0,
                  f = 0,
                  l = 0,
                  c = 0,
                  s = (e |= 0) + (n = -8 & (l = 0 | _e[(c = e + 4 | 0) >> 2])) | 0;
              if (!(3 & l)) return !(r >>> 0 < 256) && (r + 4 | 0) >>> 0 <= n >>> 0 && (n - r | 0) >>> 0 <= _e[1264] << 1 >>> 0 ? 0 | e : (e = 0) | e;
              if (r >>> 0 <= n >>> 0) return (n = n - r | 0) >>> 0 <= 15 || (f = e + r | 0, _e[c >> 2] = 1 & l | r | 2, _e[f + 4 >> 2] = 3 | n, _e[(c = f + n + 4 | 0) >> 2] = 1 | _e[c >> 2], x(f, n)), 0 | e;
              if ((0 | s) == (0 | _e[1150])) return n = (f = (0 | _e[1147]) + n | 0) - r | 0, t = e + r | 0, f >>> 0 <= r >>> 0 ? (e = 0) | e : (_e[c >> 2] = 1 & l | r | 2, _e[t + 4 >> 2] = 1 | n, _e[1150] = t, _e[1147] = n, 0 | e);
              if ((0 | s) == (0 | _e[1149])) return (a = (0 | _e[1146]) + n | 0) >>> 0 < r >>> 0 ? (e = 0) | e : (t = 1 & l, 15 < (n = a - r | 0) >>> 0 ? (f = (l = e + r | 0) + n | 0, _e[c >> 2] = t | r | 2, _e[l + 4 >> 2] = 1 | n, _e[f >> 2] = n, _e[(t = f + 4 | 0) >> 2] = -2 & _e[t >> 2], t = l) : (_e[c >> 2] = t | a | 2, _e[(t = e + a + 4 | 0) >> 2] = 1 | _e[t >> 2], n = t = 0), _e[1146] = n, _e[1149] = t, 0 | e);
              if (2 & (t = 0 | _e[4 + s >> 2]) | 0) return (e = 0) | e;
              if ((i = (-8 & t) + n | 0) >>> 0 < r >>> 0) return (e = 0) | e;
              f = i - r | 0, a = t >>> 3;

              do {
                if (t >>> 0 < 256) {
                  if (t = 0 | _e[8 + s >> 2], (0 | (n = 0 | _e[12 + s >> 2])) == (0 | t)) {
                    _e[1144] = _e[1144] & ~(1 << a);
                    break;
                  }

                  _e[t + 12 >> 2] = n, _e[n + 8 >> 2] = t;
                  break;
                }

                u = 0 | _e[24 + s >> 2], n = 0 | _e[12 + s >> 2];

                do {
                  if ((0 | n) == (0 | s)) {
                    if (n = 0 | _e[(t = (a = 16 + s | 0) + 4 | 0) >> 2]) o = t;else {
                      if (!(n = 0 | _e[a >> 2])) {
                        a = 0;
                        break;
                      }

                      o = a;
                    }

                    for (;;) {
                      if (0 | (t = 0 | _e[(a = n + 20 | 0) >> 2])) n = t, o = a;else {
                        if (!(a = 0 | _e[(t = n + 16 | 0) >> 2])) break;
                        n = a, o = t;
                      }
                    }

                    _e[o >> 2] = 0, a = n;
                  } else a = 0 | _e[8 + s >> 2], _e[a + 12 >> 2] = n, _e[n + 8 >> 2] = a, a = n;
                } while (0);

                if (0 | u) {
                  if (n = 0 | _e[28 + s >> 2], (0 | s) == (0 | _e[(t = 4880 + (n << 2) | 0) >> 2])) {
                    if (!(_e[t >> 2] = a)) {
                      _e[1145] = _e[1145] & ~(1 << n);
                      break;
                    }
                  } else if (!(_e[u + 16 + (((0 | _e[u + 16 >> 2]) != (0 | s) & 1) << 2) >> 2] = a)) break;

                  _e[a + 24 >> 2] = u, 0 | (t = 0 | _e[(n = 16 + s | 0) >> 2]) && (_e[a + 16 >> 2] = t, _e[t + 24 >> 2] = a), 0 | (n = 0 | _e[n + 4 >> 2]) && (_e[a + 20 >> 2] = n, _e[n + 24 >> 2] = a);
                }
              } while (0);

              return n = 1 & l, f >>> 0 < 16 ? (_e[c >> 2] = i | n | 2, _e[(c = e + i + 4 | 0) >> 2] = 1 | _e[c >> 2]) : (l = e + r | 0, _e[c >> 2] = n | r | 2, _e[l + 4 >> 2] = 3 | f, _e[(c = l + f + 4 | 0) >> 2] = 1 | _e[c >> 2], x(l, f)), 0 | e;
            }(e + -8 | 0, r >>> 0 < 11 ? 16 : r + 11 & -8))) return 0 | (r = i + 8 | 0);
            return (i = 0 | L(r)) ? (n = 0 | _e[e + -4 >> 2], z(0 | i, 0 | e, 0 | ((n = (-8 & n) - (0 == (3 & n | 0) ? 8 : 4) | 0) >>> 0 < r >>> 0 ? n : r)), F(e), 0 | (r = i)) : (r = 0) | r;
          }(e, r))) ? e : r : r = 0, i && (t = 0 | ge(e), _e[i >> 2] = t);
        } else r = 0 | L(r), i && (e = r ? 0 | ge(r) : 0, _e[i >> 2] = e);
      } while (0);

      return 0 | r;
    }

    function le(e, r, i) {
      i |= 0;
      var n = 0;

      if (0 < (r |= 0) >>> 0 | 0 == (0 | r) & 4294967295 < (e |= 0) >>> 0) {
        for (; n = 0 | ke(0 | e, 0 | r, 10, 0), se[(i = i + -1 | 0) >> 0] = 255 & n | 48, e = 0 | xe(0 | (n = e), 0 | r, 10, 0), 9 < r >>> 0 | 9 == (0 | r) & 4294967295 < n >>> 0;) {
          r = P;
        }

        r = e;
      } else r = e;

      if (r) for (; se[(i = i + -1 | 0) >> 0] = (r >>> 0) % 10 | 48, !(r >>> 0 < 10);) {
        r = (r >>> 0) / 10 | 0;
      }
      return 0 | i;
    }

    function ce(e, r, i, n) {
      e |= 0, i |= 0, n |= 0;
      var t = 0 | _e[(e = (r |= 0) + 16 | 0) >> 2],
          a = r + 36 | 0,
          o = r + 24 | 0;

      do {
        if (t) {
          if ((0 | t) != (0 | i)) {
            _e[a >> 2] = 1 + (0 | _e[a >> 2]), _e[o >> 2] = 2, se[r + 54 >> 0] = 1;
            break;
          }

          2 == (0 | _e[o >> 2]) && (_e[o >> 2] = n);
        } else _e[e >> 2] = i, _e[o >> 2] = n, _e[a >> 2] = 1;
      } while (0);
    }

    function Ae(e) {
      e |= 0;
      var r = 0,
          i = 0,
          n = 0,
          t = 0 | _e[119],
          n = -1 < (0 | _e[76 + t >> 2]) ? 0 | ze() : 0;

      do {
        if ((0 | function (e, r) {
          r |= 0;
          var i;
          return i = 0 | function (e) {
            var r = 0,
                i = 0,
                n = 0,
                n = e |= 0;

            e: do {
              if (3 & n) for (r = n;;) {
                if (!(0 | se[e >> 0])) {
                  e = r;
                  break e;
                }

                if (!(3 & (r = e = e + 1 | 0))) {
                  i = 4;
                  break;
                }
              } else i = 4;
            } while (0);

            if (4 == (0 | i)) {
              for (; !((-2139062144 & (r = 0 | _e[e >> 2]) ^ -2139062144) & r + -16843009);) {
                e = e + 4 | 0;
              }

              if ((255 & r) << 24 >> 24) for (; 0 != (0 | se[(e = e + 1 | 0) >> 0]);) {
                ;
              }
            }

            return e - n | 0;
          }(e = e | 0), ((0 | function (e, r, i, n) {
            e |= 0, n |= 0;
            var t,
                a = 0;
            t = 0 | te(i |= 0, r |= 0), i = 0 == (0 | r) ? 0 : i, -1 < (0 | _e[n + 76 >> 2]) ? (a = 0 == (0 | ze()), e = 0 | re(e, t, n), a || We()) : e = 0 | re(e, t, n);
            (0 | e) != (0 | t) && (i = (e >>> 0) / (r >>> 0) | 0);
            return 0 | i;
          }(e, 1, i, r)) != (0 | i)) << 31 >> 31 | 0;
        }(e, t)) < 0) e = 1;else {
          if (10 != (0 | se[75 + t >> 0]) && (i = 0 | _e[(r = 20 + t | 0) >> 2]) >>> 0 < (0 | _e[16 + t >> 2]) >>> 0) {
            _e[r >> 2] = i + 1, se[i >> 0] = 10, e = 0;
            break;
          }

          e = (0 | ue(t, 10)) < 0;
        }
      } while (0);

      return 0 | n && We(), e << 31 >> 31 | 0;
    }

    function he(e, r, i, n, t) {
      e |= 0, r |= 0;
      var a,
          o = Me;

      if (Me = Me + 256 | 0, a = o, (0 | (n |= 0)) < (0 | (i |= 0)) & 0 == (73728 & (t |= 0) | 0)) {
        if (ae(0 | a, 0 | r, 0 | ((t = i - n | 0) >>> 0 < 256 ? t : 256)), 255 < t >>> 0) {
          for (r = i - n | 0; De(e, a, 256), 255 < (t = t + -256 | 0) >>> 0;) {
            ;
          }

          t = 255 & r;
        }

        De(e, a, t);
      }

      Me = o;
    }

    function be(e) {
      var r = 0,
          i = 0,
          i = 0 | se[(r = (e |= 0) + 74 | 0) >> 0];
      return se[r >> 0] = i + 255 | i, 0 | (e = 8 & (r = 0 | _e[e >> 2]) ? (_e[e >> 2] = 32 | r, -1) : (_e[e + 8 >> 2] = 0, i = (_e[e + 4 >> 2] = 0) | _e[e + 44 >> 2], _e[e + 28 >> 2] = i, _e[e + 20 >> 2] = i, _e[e + 16 >> 2] = i + (0 | _e[e + 48 >> 2]), 0));
    }

    function me(e) {
      var r, i;
      return 0 < (0 | (r = (e |= 0) + 15 & -16 | 0)) & (0 | (e = (i = 0 | _e[_ >> 2]) + r | 0)) < (0 | i) | (0 | e) < 0 ? (b(), k(12), -1) : (0 | (_e[_ >> 2] = e)) > (0 | h()) && 0 == (0 | A()) ? (_e[_ >> 2] = i, k(12), -1) : 0 | i;
    }

    function pe(e) {
      var r = 0,
          i = 0,
          n = 0,
          i = 0 | _e[(e |= 0) >> 2];
      if ((n = (0 | se[i >> 0]) - 48 | 0) >>> 0 < 10) for (r = 0; r = n + (10 * r | 0) | 0, i = i + 1 | 0, _e[e >> 2] = i, (n = (0 | se[i >> 0]) - 48 | 0) >>> 0 < 10;) {
        ;
      } else r = 0;
      return 0 | r;
    }

    function Se(e) {
      var r = 0;
      return (0 | (r = 0 | se[d + (255 & (e |= 0)) >> 0])) < 8 ? 0 | r : (0 | (r = 0 | se[d + (e >> 8 & 255) >> 0])) < 8 ? r + 8 | 0 : (0 | (r = 0 | se[d + (e >> 16 & 255) >> 0])) < 8 ? r + 16 | 0 : 24 + (0 | se[d + (e >>> 24) >> 0]) | 0;
    }

    function ve(e, r, i, n) {
      i |= 0, n |= 0;
      var t = 0;
      (0 | _e[(r |= 0) + 4 >> 2]) == (0 | i) && 1 != (0 | _e[(t = r + 28 | 0) >> 2]) && (_e[t >> 2] = n);
    }

    function ke(e, r, i, n) {
      var t,
          a = Me;
      return Me = Me + 16 | 0, B(e |= 0, r |= 0, i |= 0, n |= 0, t = 0 | a), Me = a, 0 | (P = 0 | _e[4 + t >> 2], 0 | _e[t >> 2]);
    }

    function ye() {
      var e = 0,
          r = Me;
      return Me = Me + 16 | 0, 0 | g(5136, 2) ? (Ne(4307, r), 0) : (e = 0 | m(0 | _e[1285]), Me = r, 0 | e);
    }

    function ge(e) {
      var r = 0;
      return (e |= 0) ? 0 | (1 == (0 | (e = 3 & (r = 0 | _e[e + -4 >> 2]))) ? 0 : (-8 & r) - (0 == (0 | e) ? 8 : 4) | 0) : 0;
    }

    function Oe(e, r, i) {
      e |= 0, r |= 0, i |= 0;
      var n,
          t,
          a,
          o,
          u = Me;
      return Me = Me + 16 | 0, _e[(n = u) >> 2] = i, i = 0 | (t = e, a = r, o = n, 0 | function (e, r, i, n) {
        e |= 0, r |= 0, i |= 0, n |= 0;
        var t,
            a = 0,
            o = 0,
            u = 0,
            f = 0,
            l = 0,
            c = Me;

        for (Me = Me + 128 | 0, a = c + 124 | 0, u = 604, t = (o = l = c) + 124 | 0; _e[o >> 2] = _e[u >> 2], u = u + 4 | 0, (0 | (o = o + 4 | 0)) < (0 | t);) {
          ;
        }

        return 2147483646 < (r + -1 | 0) >>> 0 ? r ? (_e[(r = 296) >> 2] = 75, r = -1) : (e = a, r = 1, f = 4) : f = 4, 4 == (0 | f) && (f = (f = -2 - e | 0) >>> 0 < r >>> 0 ? f : r, _e[l + 48 >> 2] = f, _e[(a = l + 20 | 0) >> 2] = e, r = (_e[l + 44 >> 2] = e) + f | 0, _e[(e = l + 16 | 0) >> 2] = r, _e[l + 28 >> 2] = r, r = 0 | J(l, i, n), f && (l = 0 | _e[a >> 2], se[l + (((0 | l) == (0 | _e[e >> 2])) << 31 >> 31) >> 0] = 0)), Me = c, 0 | r;
      }(t |= 0, 2147483647, a |= 0, o |= 0)), Me = u, 0 | i;
    }

    function Re(e, r, i) {
      return e |= 0, r |= 0, (0 | (i |= 0)) < 32 ? (P = r << i | (e & (1 << i) - 1 << 32 - i) >>> 32 - i, e << i) : (P = e << i - 32, 0);
    }

    function Ce(e, r, i) {
      return e |= 0, r |= 0, (0 | (i |= 0)) < 32 ? (P = r >>> i, e >>> i | (r & (1 << i) - 1) << 32 - i) : r >>> i - 32 | (P = 0);
    }

    function Ne(e, r) {
      e |= 0, r |= 0;
      var i = Me;
      Me = Me + 16 | 0, _e[i >> 2] = r, J(r = 0 | _e[26], e, i), function (e, r) {
        var i = 0,
            n = 0,
            t = 0,
            a = 0,
            o = 0,
            u = 0,
            f = 255 & (e |= 0),
            i = 255 & e;
        0 <= (0 | _e[(r |= 0) + 76 >> 2]) && 0 != (0 | ze()) ? ((0 | i) != (0 | se[r + 75 >> 0]) && (o = 0 | _e[(a = r + 20 | 0) >> 2]) >>> 0 < (0 | _e[r + 16 >> 2]) >>> 0 ? (_e[a >> 2] = o + 1, se[o >> 0] = f) : i = 0 | ue(r, e), We()) : u = 3;

        do {
          if (3 == (0 | u)) {
            if ((0 | i) != (0 | se[r + 75 >> 0]) && (t = 0 | _e[(n = r + 20 | 0) >> 2]) >>> 0 < (0 | _e[r + 16 >> 2]) >>> 0) {
              _e[n >> 2] = t + 1, se[t >> 0] = f;
              break;
            }

            i = 0 | ue(r, e);
          }
        } while (0);
      }(10, r), y();
    }

    function we(e, r, i, n) {
      return 0 | (P = n = (r |= 0) - (n |= 0) - ((e |= 0) >>> 0 < (i |= 0) >>> 0 | 0) >>> 0, e - i >>> 0 | 0);
    }

    function Pe(e) {
      e = +e;
      var r;
      return N[w >> 3] = e, r = 0 | _e[w >> 2], P = 0 | _e[w + 4 >> 2], 0 | r;
    }

    function Ie(e, r, i, n) {
      return 0 | (P = (r |= 0) + (n |= 0) + ((i = (e |= 0) + (i |= 0) >>> 0) >>> 0 < e >>> 0 | 0) >>> 0, 0 | i);
    }

    function Le(e) {
      return 4294963200 < (e |= 0) >>> 0 && (_e[296 >> 2] = 0 - e, e = -1), 0 | e;
    }

    function De(e, r, i) {
      r |= 0, i |= 0, 32 & _e[(e |= 0) >> 2] || re(r, i, e);
    }

    function Ue(e, r) {
      return r |= 0, 0 | (e = (e |= 0) ? 0 | function (e, r) {
        e |= 0, r |= 0;

        do {
          if (e) {
            if (r >>> 0 < 128) {
              se[e >> 0] = r, e = 1;
              break;
            }

            if (!(0 | _e[_e[420 >> 2] >> 2])) {
              if (57216 == (-128 & r | 0)) {
                se[e >> 0] = r, e = 1;
                break;
              }

              _e[(e = 296) >> 2] = 84, e = -1;
              break;
            }

            if (r >>> 0 < 2048) {
              se[e >> 0] = r >>> 6 | 192, se[e + 1 >> 0] = 63 & r | 128, e = 2;
              break;
            }

            if (r >>> 0 < 55296 | 57344 == (-8192 & r | 0)) {
              se[e >> 0] = r >>> 12 | 224, se[e + 1 >> 0] = r >>> 6 & 63 | 128, se[e + 2 >> 0] = 63 & r | 128, e = 3;
              break;
            }

            if ((r + -65536 | 0) >>> 0 < 1048576) {
              se[e >> 0] = r >>> 18 | 240, se[e + 1 >> 0] = r >>> 12 & 63 | 128, se[e + 2 >> 0] = r >>> 6 & 63 | 128, se[e + 3 >> 0] = 63 & r | 128, e = 4;
              break;
            }

            _e[(e = 296) >> 2] = 84, e = -1;
            break;
          }

          e = 1;
        } while (0);

        return 0 | e;
      }(e, r) : 0);
    }

    function He(e, r) {
      return (0 | (e |= 0)) == (0 | (r |= 0)) | 0;
    }

    function Fe(e, r) {
      var i = 0 | Be(0 | (e |= 0));
      return 0 | (0 == (0 | (r |= 0)) ? e : i);
    }

    function xe(e, r, i, n) {
      return 0 | B(e |= 0, r |= 0, i |= 0, n |= 0, 0);
    }

    function Be(e) {
      return (255 & (e |= 0)) << 24 | (e >> 8 & 255) << 16 | (e >> 16 & 255) << 8 | e >>> 24 | 0;
    }

    function Ye(e, r, i, n, t, a) {
      T(6);
    }

    function Ke(e, r, i, n, t) {
      T(1);
    }

    function Ve(e) {
      var r;
      We(e |= 0), r = e, F(r |= 0);
    }

    function Xe(e, r, i, n) {
      T(7);
    }

    function Ge(e, r, i) {
      return T(0), 0;
    }

    function We(e) {
      0;
    }

    function ze() {
      return 0;
    }

    function je(e) {
      T(2);
    }

    function Je() {
      T(5);
    }

    var Ze = [Ge, j, function (e, r, i) {
      e |= 0, r |= 0, i |= 0;
      var n,
          t,
          a = Me;
      return Me = Me + 32 | 0, n = (t = a) + 20 | 0, _e[t >> 2] = _e[e + 60 >> 2], _e[t + 4 >> 2] = 0, _e[t + 8 >> 2] = r, _e[t + 12 >> 2] = n, _e[t + 16 >> 2] = i, e = (0 | Le(0 | C(140, 0 | t))) < 0 ? _e[n >> 2] = -1 : 0 | _e[n >> 2], Me = a, 0 | e;
    }, function (e, r, i) {
      r |= 0, i |= 0;
      var n = 0,
          t = Me;
      return Me = Me + 32 | 0, n = t, _e[(e |= 0) + 36 >> 2] = 1, 0 == (64 & _e[e >> 2] | 0) && (_e[n >> 2] = _e[e + 60 >> 2], _e[n + 4 >> 2] = 21523, _e[n + 8 >> 2] = t + 16, 0 | p(54, 0 | n)) && (se[e + 75 >> 0] = -1), n = 0 | j(e, r, i), Me = t, 0 | n;
    }, function (e, r, i) {
      var n, t;
      return r |= 0, i |= 0, z(0 | (t = 0 | _e[(n = (e |= 0) + 20 | 0) >> 2]), 0 | r, 0 | (e = i >>> 0 < (e = (0 | _e[e + 16 >> 2]) - t | 0) >>> 0 ? i : e)), _e[n >> 2] = (0 | _e[n >> 2]) + e, 0 | i;
    }, function (e, r, i) {
      i |= 0;
      var n,
          t = 0,
          a = 0,
          o = Me;
      if (Me = Me + 64 | 0, n = o, 0 | He(e |= 0, r |= 0)) r = 1;else if (0 != (0 | r) && 0 != (0 | (a = 0 | Z(r, 32, 16, 0)))) {
        for (t = (r = n + 4 | 0) + 52 | 0; (0 | (r = r + 4 | (_e[r >> 2] = 0))) < (0 | t);) {
          ;
        }

        _e[n >> 2] = a, _e[n + 8 >> 2] = e, _e[n + 12 >> 2] = -1, _e[n + 48 >> 2] = 1, nr[3 & _e[28 + (0 | _e[a >> 2]) >> 2]](a, n, 0 | _e[i >> 2], 1), r = 1 == (0 | _e[n + 24 >> 2]) ? (_e[i >> 2] = _e[n + 16 >> 2], 1) : 0;
      } else r = 0;
      return Me = o, 0 | r;
    }, Ge, Ge],
        qe = [Ke, function (e, r, i, n, t) {
      e |= 0, r |= 0, i |= 0, n |= 0, t |= 0;
      var a = 0;

      do {
        if (0 | He(e, 0 | _e[r + 8 >> 2])) ve(0, r, i, n);else if (0 | He(e, 0 | _e[r >> 2])) {
          if (e = r + 32 | 0, (0 | _e[r + 16 >> 2]) != (0 | i) && (0 | _e[(a = r + 20 | 0) >> 2]) != (0 | i)) {
            _e[e >> 2] = n, _e[a >> 2] = i, _e[(n = r + 40 | 0) >> 2] = 1 + (0 | _e[n >> 2]), 1 == (0 | _e[r + 36 >> 2]) && 2 == (0 | _e[r + 24 >> 2]) && (se[r + 54 >> 0] = 1), _e[r + 44 >> 2] = 4;
            break;
          }

          1 == (0 | n) && (_e[e >> 2] = 1);
        }
      } while (0);
    }, function (e, r, i, n, t) {
      e |= 0, r |= 0, i |= 0, n |= 0, t |= 0;
      var a = 0,
          o = 0,
          u = 0,
          f = 0;

      do {
        if (0 | He(e, 0 | _e[r + 8 >> 2])) ve(0, r, i, n);else {
          if (a = e + 8 | 0, !(0 | He(e, 0 | _e[r >> 2]))) {
            u = 0 | _e[a >> 2], qe[3 & _e[24 + (0 | _e[u >> 2]) >> 2]](u, r, i, n, t);
            break;
          }

          if (e = r + 32 | 0, (0 | _e[r + 16 >> 2]) != (0 | i) && (0 | _e[(o = r + 20 | 0) >> 2]) != (0 | i)) {
            if (_e[e >> 2] = n, 4 == (0 | _e[(n = r + 44 | 0) >> 2])) break;
            se[(e = r + 52 | 0) >> 0] = 0, a = (se[(f = r + 53 | 0) >> 0] = 0) | _e[a >> 2], ir[3 & _e[20 + (0 | _e[a >> 2]) >> 2]](a, r, i, i, 1, t), 0 | se[f >> 0] ? 0 | se[e >> 0] ? e = 3 : (e = 3, u = 11) : (e = 4, u = 11), 11 == (0 | u) && (_e[o >> 2] = i, _e[(f = r + 40 | 0) >> 2] = 1 + (0 | _e[f >> 2]), 1 == (0 | _e[r + 36 >> 2]) && 2 == (0 | _e[r + 24 >> 2]) && (se[r + 54 >> 0] = 1)), _e[n >> 2] = e;
            break;
          }

          1 == (0 | n) && (_e[e >> 2] = 1);
        }
      } while (0);
    }, Ke],
        Qe = [je, We, Ve, We, We, Ve, function (e) {
      var r = Me;
      Me = Me + 16 | 0, F(e |= 0), 0 | S(0 | _e[1285], 0) ? Ne(4406, r) : Me = r;
    }, je],
        $e = [function (e) {
      return T(3), 0;
    }, function (e) {
      var r,
          i,
          n = Me;
      return Me = Me + 16 | 0, r = n, e = 0 | (i = 0 | _e[(e |= 0) + 60 >> 2], 0 | (i |= 0)), _e[r >> 2] = e, e = 0 | Le(0 | v(6, 0 | r)), Me = n, 0 | e;
    }],
        er = [function (e, r, i) {
      T(4);
    }],
        rr = [Je, function () {
      var e,
          r,
          i,
          n = 0,
          t = 0,
          a = 0,
          o = 0,
          u = 0,
          o = Me;
      Me = Me + 48 | 0, i = o + 32 | 0, e = o + 24 | 0, u = o + 16 | 0, o = (r = o) + 36 | 0, 0 | (n = 0 | ye()) && 0 | (a = 0 | _e[n >> 2]) && (1126902528 == (-256 & (t = 0 | _e[(n = a + 48 | 0) >> 2]) | 0) & 1129074247 == (0 | (n = 0 | _e[n + 4 >> 2])) || (_e[e >> 2] = 4168, Ne(4118, e)), n = 1126902529 == (0 | t) & 1129074247 == (0 | n) ? 0 | _e[a + 44 >> 2] : a + 80 | 0, _e[o >> 2] = n, a = 0 | _e[a >> 2], n = 0 | _e[a + 4 >> 2], 0 | Ze[7 & _e[16 + (0 | _e[2]) >> 2]](8, a, o) ? (u = 0 | _e[o >> 2], u = 0 | $e[1 & _e[8 + (0 | _e[u >> 2]) >> 2]](u), _e[r >> 2] = 4168, _e[r + 4 >> 2] = n, _e[r + 8 >> 2] = u, Ne(4032, r)) : (_e[u >> 2] = 4168, _e[u + 4 >> 2] = n, Ne(4077, u))), Ne(4156, i);
    }, function () {
      var e = Me;
      Me = Me + 16 | 0, 0 | R(5140, 6) ? Ne(4356, e) : Me = e;
    }, Je],
        ir = [Ye, function (e, r, i, n, t, a) {
      i |= 0, n |= 0, t |= 0, a |= 0, 0 | He(e |= 0, 0 | _e[(r |= 0) + 8 >> 2]) && oe(0, r, i, n, t);
    }, function (e, r, i, n, t, a) {
      i |= 0, n |= 0, t |= 0, a |= 0, 0 | He(e |= 0, 0 | _e[(r |= 0) + 8 >> 2]) ? oe(0, r, i, n, t) : (e = 0 | _e[e + 8 >> 2], ir[3 & _e[20 + (0 | _e[e >> 2]) >> 2]](e, r, i, n, t, a));
    }, Ye],
        nr = [Xe, function (e, r, i, n) {
      i |= 0, n |= 0, 0 | He(e |= 0, 0 | _e[(r |= 0) + 8 >> 2]) && ce(0, r, i, n);
    }, function (e, r, i, n) {
      i |= 0, n |= 0, 0 | He(e |= 0, 0 | _e[(r |= 0) + 8 >> 2]) ? ce(0, r, i, n) : (e = 0 | _e[e + 8 >> 2], nr[3 & _e[28 + (0 | _e[e >> 2]) >> 2]](e, r, i, n));
    }, Xe];
    return {
      stackSave: function stackSave() {
        return 0 | Me;
      },
      _i64Subtract: we,
      _crn_get_bytes_per_block: function _crn_get_bytes_per_block(e, r) {
        e |= 0, r |= 0;
        var i,
            n,
            t = 0,
            a = Me;

        switch (Me = Me + 576 | 0, n = a + 40 | 0, i = a + 56 | 0, _e[(t = a) >> 2] = 40, $(e, r, t), e = 0 | _e[(r = t + 32 | 0) + 4 >> 2], 0 | _e[r >> 2]) {
          case 0:
            if (!e) return Me = a, 0 | (t = 8);
            e = 14;
            break;

          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            e = e ? 14 : 13;
            break;

          case 9:
          case 10:
            if (!e) return Me = a, 0 | (t = 8);
            e = 14;
            break;

          default:
            e = 14;
        }

        return 13 == (0 | e) ? (Me = a, 0 | (t = 16)) : 14 == (0 | e) ? (_e[n >> 2] = 866, _e[4 + n >> 2] = 2672, _e[8 + n >> 2] = 1251, Oe(i, 812, n), Ae(i), Me = a, (t = 0) | t) : 0;
      },
      setThrew: function setThrew(e, r) {
        e |= 0, r |= 0, E || (E = e, 0);
      },
      dynCall_viii: function dynCall_viii(e, r, i, n) {
        r |= 0, i |= 0, n |= 0, er[0 & (e |= 0)](0 | r, 0 | i, 0 | n);
      },
      _bitshift64Lshr: Ce,
      _bitshift64Shl: Re,
      dynCall_viiii: function dynCall_viiii(e, r, i, n, t) {
        r |= 0, i |= 0, n |= 0, t |= 0, nr[3 & (e |= 0)](0 | r, 0 | i, 0 | n, 0 | t);
      },
      setTempRet0: function setTempRet0(e) {
        P = e |= 0;
      },
      _crn_decompress: function _crn_decompress(e, r, i, n, t, a) {
        e |= 0, r |= 0, i |= 0, n |= 0, t |= 0, a |= 0;
        var o,
            u,
            f,
            l = 0,
            c = 0,
            s = 0,
            _ = 0,
            d = 0,
            E = Me;

        switch (Me = Me + 592 | 0, f = E + 56 | 0, s = E + 40 | 0, o = E + 72 | 0, u = (d = E) + 68 | 0, _e[d >> 2] = 40, $(e, r, d), l = (0 | _e[d + 4 >> 2]) >>> t, c = (0 | _e[d + 8 >> 2]) >>> t, n = 0 | _e[(d = d + 32 | 0) + 4 >> 2], 0 | _e[d >> 2]) {
          case 0:
            n ? _ = 14 : d = 8;
            break;

          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            _ = n ? 14 : 13;
            break;

          case 9:
          case 10:
            n ? _ = 14 : d = 8;
            break;

          default:
            _ = 14;
        }

        13 == (0 | _) ? d = 16 : 14 == (0 | _) && (_e[s >> 2] = 866, _e[s + 4 >> 2] = 2672, _e[s + 8 >> 2] = 1251, Oe(o, 812, s), Ae(o), d = 0), _e[u >> 2] = i, _ = 0 | function (e, r) {
          var i,
              n,
              t,
              a,
              o,
              u,
              f,
              l,
              c,
              s,
              _ = 0,
              d = 0;
          if (Me = (s = Me) + 528 | 0, u = (c = s) + 16 | 0, 0 == (0 | (e |= 0)) | (r |= 0) >>> 0 < 62) return Me = s, (d = 0) | d;
          if (!(f = 0 | ne(300, 0))) return Me = s, (d = 0) | d;
          _e[f >> 2] = 519686845, _e[4 + f >> 2] = 0, _e[8 + f >> 2] = 0, l = 88 + f | 0, i = 136 + f | 0, n = 160 + f | 0, t = 184 + f | 0, a = 208 + f | 0, o = 232 + f | 0, _e[(_ = 252 + f | 0) >> 2] = 0, _e[_ + 4 >> 2] = 0, _e[_ + 8 >> 2] = 0, se[_ + 12 >> 0] = 0, _e[(_ = 268 + f | 0) >> 2] = 0, _e[_ + 4 >> 2] = 0, _e[_ + 8 >> 2] = 0, se[_ + 12 >> 0] = 0, _e[(_ = 284 + f | 0) >> 2] = 0, _e[_ + 4 >> 2] = 0, _e[_ + 8 >> 2] = 0, se[_ + 12 >> 0] = 0, d = 44 + (_ = l) | 0;

          for (; _e[_ >> 2] = 0, _ = _ + 4 | 0, (0 | _) < (0 | d);) {
            ;
          }

          if (se[44 + l >> 0] = 0, _e[i >> 2] = 0, _e[4 + i >> 2] = 0, _e[8 + i >> 2] = 0, _e[12 + i >> 2] = 0, _e[16 + i >> 2] = 0, se[20 + i >> 0] = 0, _e[n >> 2] = 0, _e[4 + n >> 2] = 0, _e[8 + n >> 2] = 0, _e[12 + n >> 2] = 0, _e[16 + n >> 2] = 0, se[20 + n >> 0] = 0, _e[t >> 2] = 0, _e[4 + t >> 2] = 0, _e[8 + t >> 2] = 0, _e[12 + t >> 2] = 0, _e[16 + t >> 2] = 0, se[20 + t >> 0] = 0, _e[a >> 2] = 0, _e[4 + a >> 2] = 0, _e[8 + a >> 2] = 0, _e[12 + a >> 2] = 0, _e[16 + a >> 2] = 0, se[20 + a >> 0] = 0, _e[o >> 2] = 0, _e[4 + o >> 2] = 0, _e[8 + o >> 2] = 0, _e[12 + o >> 2] = 0, se[16 + o >> 0] = 0, 0 | function (e, r, i) {
            e |= 0;
            var n = 0,
                t = 0;

            if (!(0 == (0 | (r |= 0)) | (i |= 0) >>> 0 < 74 || 18552 != ((0 | de[r >> 0]) << 8 | 0 | de[r + 1 >> 0] | 0)) && 74 <= ((0 | de[r + 2 >> 0]) << 8 | 0 | de[r + 3 >> 0]) >>> 0 && ((0 | de[r + 7 >> 0]) << 16 | (0 | de[r + 6 >> 0]) << 24 | (0 | de[r + 8 >> 0]) << 8 | 0 | de[r + 9 >> 0]) >>> 0 <= i >>> 0) {
              if (_e[(n = e + 88 | 0) >> 2] = r, _e[e + 4 >> 2] = r, _e[e + 8 >> 2] = i, !(0 | function (e) {
                var r,
                    i = 0,
                    n = 0,
                    t = 0;
                if (t = 92 + (e |= 0) | 0, n = 0 | _e[(r = e + 88 | 0) >> 2], i = (0 | _e[e + 4 >> 2]) + ((0 | de[n + 68 >> 0]) << 8 | (0 | de[n + 67 >> 0]) << 16 | 0 | de[n + 69 >> 0]) | 0, !(n = (0 | de[n + 65 >> 0]) << 8 | 0 | de[n + 66 >> 0])) return (t = 0) | t;
                if (_e[t >> 2] = i, _e[e + 96 >> 2] = i, _e[e + 104 >> 2] = n, _e[e + 100 >> 2] = i + n, _e[e + 108 >> 2] = 0, _e[e + 112 >> 2] = 0, !(0 | V(t, e + 116 | 0))) return (t = 0) | t;
                i = 0 | _e[r >> 2];

                do {
                  if ((0 | de[i + 39 >> 0]) << 8 | 0 | de[i + 40 >> 0]) {
                    if (!(0 | V(t, e + 140 | 0))) return (t = 0) | t;

                    if (0 | V(t, e + 188 | 0)) {
                      i = 0 | _e[r >> 2];
                      break;
                    }

                    return (t = 0) | t;
                  }

                  if (!((0 | de[i + 55 >> 0]) << 8 | 0 | de[i + 56 >> 0])) return (t = 0) | t;
                } while (0);

                if ((0 | de[i + 55 >> 0]) << 8 | 0 | de[i + 56 >> 0] | 0) {
                  if (!(0 | V(t, e + 164 | 0))) return (t = 0) | t;
                  if (!(0 | V(t, e + 212 | 0))) return (t = 0) | t;
                }

                return 0 | (t = 1);
              }(e))) return (t = 0) | t;

              if (r = 0 | _e[n >> 2], (0 | de[r + 39 >> 0]) << 8 | 0 | de[r + 40 >> 0] ? 0 | function (e) {
                var r,
                    i,
                    n,
                    t,
                    a,
                    o = 0,
                    u = 0,
                    f = 0,
                    l = 0,
                    c = 0,
                    s = 0,
                    _ = 0,
                    d = 0;

                if (Me = (a = Me) + 576 | 0, l = (s = a) + 64 | 0, d = a + 16 | 0, o = 0 | _e[(f = 88 + (e |= 0) | 0) >> 2], t = (0 | de[o + 39 >> 0]) << 8 | 0 | de[o + 40 >> 0], i = e + 236 | 0, (0 | (u = 0 | _e[(c = e + 240 | 0) >> 2])) != (0 | t)) {
                  if (u >>> 0 <= t >>> 0) {
                    do {
                      if ((0 | _e[e + 244 >> 2]) >>> 0 < t >>> 0) {
                        if (0 | G(i, t, (u + 1 | 0) == (0 | t), 4, 0)) {
                          o = 0 | _e[c >> 2];
                          break;
                        }

                        return se[e + 248 >> 0] = 1, Me = a, (d = 0) | d;
                      }

                      o = u;
                    } while (0);

                    ae((0 | _e[i >> 2]) + (o << 2) | 0, 0, t - o << 2 | 0), o = 0 | _e[f >> 2];
                  }

                  _e[c >> 2] = t;
                }

                if (n = e + 92 | 0, u = (0 | _e[e + 4 >> 2]) + ((0 | de[o + 34 >> 0]) << 8 | (0 | de[o + 33 >> 0]) << 16 | 0 | de[o + 35 >> 0]) | 0, !(o = (0 | de[o + 37 >> 0]) << 8 | (0 | de[o + 36 >> 0]) << 16 | 0 | de[o + 38 >> 0])) return Me = a, (d = 0) | d;
                if (_e[n >> 2] = u, _e[e + 96 >> 2] = u, _e[e + 104 >> 2] = o, _e[e + 100 >> 2] = u + o, _e[e + 108 >> 2] = 0, _e[e + 112 >> 2] = 0, _ = d + 20 | 0, _e[d >> 2] = 0, _e[d + 4 >> 2] = 0, _e[d + 8 >> 2] = 0, _e[d + 12 >> 2] = 0, se[d + 16 >> 0] = 0, r = d + 24 | 0, _e[d + 44 >> 2] = 0, _e[_ >> 2] = 0, _e[_ + 4 >> 2] = 0, _e[_ + 8 >> 2] = 0, _e[_ + 12 >> 2] = 0, _e[_ + 16 >> 2] = 0, se[_ + 20 >> 0] = 0, 0 | V(n, d) && 0 | V(n, r)) {
                  if (0 | _e[c >> 2] || (_e[s >> 2] = 866, _e[s + 4 >> 2] = 910, _e[s + 8 >> 2] = 1497, Oe(l, 812, s), Ae(l)), t) for (u = (_ = s = 0) | _e[i >> 2], c = l = o = e = f = 0;;) {
                    if (s = (0 | Te(n, d)) + s & 31, c = (0 | Te(n, r)) + c & 63, l = (0 | Te(n, d)) + l & 31, o = (0 | Te(n, d)) + o | 0, e = (0 | Te(n, r)) + e & 63, f = (0 | Te(n, d)) + f & 31, _e[u >> 2] = c << 5 | s << 11 | l | o << 27 | e << 21 | f << 16, t >>> 0 <= (_ = _ + 1 | 0) >>> 0) {
                      o = 1;
                      break;
                    }

                    u = u + 4 | 0, o &= 31;
                  } else o = 1;
                } else o = 0;
                return ie(d + 24 | 0), ie(d), Me = a, 0 | (d = o);
              }(e) && 0 | function (e) {
                var r,
                    i,
                    n,
                    t,
                    a,
                    o = 0,
                    u = 0,
                    f = 0,
                    l = 0,
                    c = 0,
                    s = 0,
                    _ = 0,
                    d = 0,
                    E = 0,
                    M = 0,
                    T = 0,
                    A = 0,
                    h = 0,
                    b = 0,
                    m = 0,
                    p = 0,
                    S = 0,
                    v = 0,
                    k = 0,
                    y = 0,
                    g = 0,
                    O = 0,
                    R = 0,
                    C = 0,
                    N = 0,
                    w = 0,
                    P = 0,
                    I = 0,
                    L = 0,
                    D = 0,
                    U = 0,
                    H = 0,
                    F = 0,
                    x = Me;
                if (Me = Me + 1008 | 0, c = (s = x) + 496 | 0, k = x + 472 | 0, n = x + 276 | 0, t = x + 80 | 0, a = x + 16 | 0, u = 0 | _e[(e |= 0) + 88 >> 2], r = (0 | de[u + 47 >> 0]) << 8 | 0 | de[u + 48 >> 0], i = e + 92 | 0, o = (0 | _e[e + 4 >> 2]) + ((0 | de[u + 42 >> 0]) << 8 | (0 | de[u + 41 >> 0]) << 16 | 0 | de[u + 43 >> 0]) | 0, !(u = (0 | de[u + 45 >> 0]) << 8 | (0 | de[u + 44 >> 0]) << 16 | 0 | de[u + 46 >> 0])) return Me = x, (k = 0) | k;

                if (_e[i >> 2] = o, _e[e + 96 >> 2] = o, _e[e + 104 >> 2] = u, _e[e + 100 >> 2] = o + u, _e[e + 108 >> 2] = 0, _e[e + 112 >> 2] = 0, _e[k + 20 >> 2] = 0, _e[k >> 2] = 0, _e[k + 4 >> 2] = 0, _e[k + 8 >> 2] = 0, _e[k + 12 >> 2] = 0, (se[k + 16 >> 0] = 0) | V(i, k)) {
                  for (o = 0, f = u = -3; _e[n + (o << 2) >> 2] = f, _e[t + (o << 2) >> 2] = u, l = 2 < (0 | f), 49 != (0 | (o = o + 1 | 0));) {
                    u = (1 & l) + u | 0, f = l ? -3 : f + 1 | 0;
                  }

                  for (u = (o = a) + 64 | 0; (0 | (o = o + 4 | (_e[o >> 2] = 0))) < (0 | u);) {
                    ;
                  }

                  f = e + 252 | 0, o = 0 | _e[(u = e + 256 | 0) >> 2];

                  e: do {
                    if ((0 | o) == (0 | r)) _ = 13;else {
                      if (o >>> 0 <= r >>> 0) {
                        do {
                          if ((0 | _e[e + 260 >> 2]) >>> 0 < r >>> 0) {
                            if (0 | G(f, r, (o + 1 | 0) == (0 | r), 4, 0)) {
                              o = 0 | _e[u >> 2];
                              break;
                            }

                            se[e + 264 >> 0] = 1, o = 0;
                            break e;
                          }
                        } while (0);

                        ae((0 | _e[f >> 2]) + (o << 2) | 0, 0, r - o << 2 | 0);
                      }

                      _e[u >> 2] = r, _ = 13;
                    }
                  } while (0);

                  do {
                    if (13 == (0 | _)) {
                      if (!r) {
                        _e[s >> 2] = 866, _e[s + 4 >> 2] = 910, _e[s + 8 >> 2] = 1497, Oe(c, 812, s), Ae(c), o = 1;
                        break;
                      }

                      for (e = 4 + a | 0, c = 8 + a | 0, s = 12 + a | 0, _ = 16 + a | 0, d = 20 + a | 0, E = 24 + a | 0, M = 28 + a | 0, T = 32 + a | 0, A = 36 + a | 0, h = 40 + a | 0, b = 44 + a | 0, m = 48 + a | 0, p = 52 + a | 0, S = 56 + a | 0, v = 60 + a | 0, o = (l = 0) | _e[f >> 2], u = 0 | _e[e >> 2], f = 0 | _e[a >> 2]; H = 0 | Te(i, k), f = f + (0 | _e[n + (H << 2) >> 2]) & 3, u = u + (0 | _e[t + (H << 2) >> 2]) & 3, H = 0 | Te(i, k), F = (0 | _e[c >> 2]) + (0 | _e[n + (H << 2) >> 2]) & 3, _e[c >> 2] = F, H = (0 | _e[s >> 2]) + (0 | _e[t + (H << 2) >> 2]) & 3, _e[s >> 2] = H, D = 0 | Te(i, k), U = (0 | _e[_ >> 2]) + (0 | _e[n + (D << 2) >> 2]) & 3, _e[_ >> 2] = U, D = (0 | _e[d >> 2]) + (0 | _e[t + (D << 2) >> 2]) & 3, _e[d >> 2] = D, I = 0 | Te(i, k), L = (0 | _e[E >> 2]) + (0 | _e[n + (I << 2) >> 2]) & 3, _e[E >> 2] = L, I = (0 | _e[M >> 2]) + (0 | _e[t + (I << 2) >> 2]) & 3, _e[M >> 2] = I, w = 0 | Te(i, k), P = (0 | _e[T >> 2]) + (0 | _e[n + (w << 2) >> 2]) & 3, _e[T >> 2] = P, w = (0 | _e[A >> 2]) + (0 | _e[t + (w << 2) >> 2]) & 3, _e[A >> 2] = w, C = 0 | Te(i, k), N = (0 | _e[h >> 2]) + (0 | _e[n + (C << 2) >> 2]) & 3, _e[h >> 2] = N, C = (0 | _e[b >> 2]) + (0 | _e[t + (C << 2) >> 2]) & 3, _e[b >> 2] = C, O = 0 | Te(i, k), R = (0 | _e[m >> 2]) + (0 | _e[n + (O << 2) >> 2]) & 3, _e[m >> 2] = R, O = (0 | _e[p >> 2]) + (0 | _e[t + (O << 2) >> 2]) & 3, _e[p >> 2] = O, y = 0 | Te(i, k), g = (0 | _e[S >> 2]) + (0 | _e[n + (y << 2) >> 2]) & 3, _e[S >> 2] = g, y = (0 | _e[v >> 2]) + (0 | _e[t + (y << 2) >> 2]) & 3, _e[v >> 2] = y, _e[o >> 2] = (0 | de[1441 + u >> 0]) << 2 | 0 | de[1441 + f >> 0] | (0 | de[1441 + F >> 0]) << 4 | (0 | de[1441 + H >> 0]) << 6 | (0 | de[1441 + U >> 0]) << 8 | (0 | de[1441 + D >> 0]) << 10 | (0 | de[1441 + L >> 0]) << 12 | (0 | de[1441 + I >> 0]) << 14 | (0 | de[1441 + P >> 0]) << 16 | (0 | de[1441 + w >> 0]) << 18 | (0 | de[1441 + N >> 0]) << 20 | (0 | de[1441 + C >> 0]) << 22 | (0 | de[1441 + R >> 0]) << 24 | (0 | de[1441 + O >> 0]) << 26 | (0 | de[1441 + g >> 0]) << 28 | (0 | de[1441 + y >> 0]) << 30, !(r >>> 0 <= (l = l + 1 | 0) >>> 0);) {
                        o = o + 4 | 0;
                      }

                      _e[a >> 2] = f, _e[e >> 2] = u, o = 1;
                    }
                  } while (0);
                } else o = 0;

                return ie(k), Me = x, 0 | (F = o);
              }(e) && (r = 0 | _e[n >> 2], t = 11) : t = 11, 11 == (0 | t)) {
                if (!((0 | de[r + 55 >> 0]) << 8 | 0 | de[r + 56 >> 0])) return 0 | (t = 1);
                if (0 | function (e) {
                  var r,
                      i,
                      n,
                      t,
                      a = 0,
                      o = 0,
                      u = 0,
                      f = 0,
                      l = 0;
                  if (Me = (t = Me) + 560 | 0, u = (r = t) + 40 | 0, l = t + 16 | 0, o = 0 | _e[88 + (e |= 0) >> 2], i = (0 | de[o + 55 >> 0]) << 8 | 0 | de[o + 56 >> 0], n = e + 92 | 0, a = (0 | _e[e + 4 >> 2]) + ((0 | de[o + 50 >> 0]) << 8 | (0 | de[o + 49 >> 0]) << 16 | 0 | de[o + 51 >> 0]) | 0, !(o = (0 | de[o + 53 >> 0]) << 8 | (0 | de[o + 52 >> 0]) << 16 | 0 | de[o + 54 >> 0])) return Me = t, (l = 0) | l;
                  _e[n >> 2] = a, _e[e + 96 >> 2] = a, _e[e + 104 >> 2] = o, _e[e + 100 >> 2] = a + o, _e[e + 108 >> 2] = 0, _e[e + 112 >> 2] = 0, _e[l + 20 >> 2] = 0, _e[l >> 2] = 0, _e[l + 4 >> 2] = 0, _e[l + 8 >> 2] = 0, _e[l + 12 >> 2] = 0, se[l + 16 >> 0] = 0;

                  e: do {
                    if (0 | V(n, l)) {
                      if (f = e + 268 | 0, (0 | (a = 0 | _e[(o = e + 272 | 0) >> 2])) != (0 | i)) {
                        if (a >>> 0 <= i >>> 0) {
                          do {
                            if ((0 | _e[e + 276 >> 2]) >>> 0 < i >>> 0) {
                              if (0 | G(f, i, (a + 1 | 0) == (0 | i), 2, 0)) {
                                a = 0 | _e[o >> 2];
                                break;
                              }

                              se[e + 280 >> 0] = 1, a = 0;
                              break e;
                            }
                          } while (0);

                          ae((0 | _e[f >> 2]) + (a << 1) | 0, 0, i - a << 1 | 0);
                        }

                        _e[o >> 2] = i;
                      }

                      if (!i) {
                        _e[r >> 2] = 866, _e[r + 4 >> 2] = 910, _e[r + 8 >> 2] = 1497, Oe(u, 812, r), Ae(u), a = 1;
                        break;
                      }

                      for (a = (u = e = o = 0) | _e[f >> 2];;) {
                        if (f = 0 | Te(n, l), u = f + u & 255, e = (0 | Te(n, l)) + e & 255, K[a >> 1] = e << 8 | u, i >>> 0 <= (o = o + 1 | 0) >>> 0) {
                          a = 1;
                          break;
                        }

                        a = a + 2 | 0;
                      }
                    } else a = 0;
                  } while (0);

                  return ie(l), Me = t, 0 | (l = a);
                }(e) && 0 | function (e) {
                  var r,
                      i,
                      n,
                      t,
                      a,
                      o = 0,
                      u = 0,
                      f = 0,
                      l = 0,
                      c = 0,
                      s = 0,
                      _ = 0,
                      d = 0,
                      E = 0,
                      M = 0,
                      T = 0,
                      A = 0,
                      h = 0,
                      b = 0,
                      m = 0,
                      p = 0,
                      S = 0,
                      v = 0,
                      k = 0,
                      y = 0,
                      g = 0,
                      O = 0,
                      R = 0,
                      C = 0,
                      N = 0,
                      w = 0,
                      P = 0,
                      I = 0,
                      L = 0,
                      D = 0,
                      U = 0,
                      H = 0,
                      F = 0,
                      x = 0,
                      B = 0,
                      Y = Me;
                  if (Me = Me + 2416 | 0, c = (s = Y) + 1904 | 0, F = Y + 1880 | 0, n = Y + 980 | 0, t = Y + 80 | 0, a = Y + 16 | 0, u = 0 | _e[(e |= 0) + 88 >> 2], r = (0 | de[u + 63 >> 0]) << 8 | 0 | de[u + 64 >> 0], i = e + 92 | 0, o = (0 | _e[e + 4 >> 2]) + ((0 | de[u + 58 >> 0]) << 8 | (0 | de[u + 57 >> 0]) << 16 | 0 | de[u + 59 >> 0]) | 0, !(u = (0 | de[u + 61 >> 0]) << 8 | (0 | de[u + 60 >> 0]) << 16 | 0 | de[u + 62 >> 0])) return Me = Y, (F = 0) | F;

                  if (_e[i >> 2] = o, _e[e + 96 >> 2] = o, _e[e + 104 >> 2] = u, _e[e + 100 >> 2] = o + u, _e[e + 108 >> 2] = 0, _e[e + 112 >> 2] = 0, _e[F + 20 >> 2] = 0, _e[F >> 2] = 0, _e[F + 4 >> 2] = 0, _e[F + 8 >> 2] = 0, _e[F + 12 >> 2] = 0, (se[F + 16 >> 0] = 0) | V(i, F)) {
                    for (o = 0, f = u = -7; _e[n + (o << 2) >> 2] = f, _e[t + (o << 2) >> 2] = u, l = 6 < (0 | f), 225 != (0 | (o = o + 1 | 0));) {
                      u = (1 & l) + u | 0, f = l ? -7 : f + 1 | 0;
                    }

                    for (u = (o = a) + 64 | 0; (0 | (o = o + 4 | (_e[o >> 2] = 0))) < (0 | u);) {
                      ;
                    }

                    l = e + 284 | 0, u = 3 * r | 0, o = 0 | _e[(f = e + 288 | 0) >> 2];

                    e: do {
                      if ((0 | o) == (0 | u)) _ = 13;else {
                        if (o >>> 0 <= u >>> 0) {
                          do {
                            if ((0 | _e[e + 292 >> 2]) >>> 0 < u >>> 0) {
                              if (0 | G(l, u, (o + 1 | 0) == (0 | u), 2, 0)) {
                                o = 0 | _e[f >> 2];
                                break;
                              }

                              se[e + 296 >> 0] = 1, o = 0;
                              break e;
                            }
                          } while (0);

                          ae((0 | _e[l >> 2]) + (o << 1) | 0, 0, u - o << 1 | 0);
                        }

                        _e[f >> 2] = u, _ = 13;
                      }
                    } while (0);

                    do {
                      if (13 == (0 | _)) {
                        if (!r) {
                          _e[s >> 2] = 866, _e[s + 4 >> 2] = 910, _e[s + 8 >> 2] = 1497, Oe(c, 812, s), Ae(c), o = 1;
                          break;
                        }

                        for (v = 4 + a | 0, k = 8 + a | 0, y = 12 + a | 0, g = 16 + a | 0, O = 20 + a | 0, R = 24 + a | 0, C = 28 + a | 0, N = 32 + a | 0, w = 36 + a | 0, P = 40 + a | 0, I = 44 + a | 0, L = 48 + a | 0, D = 52 + a | 0, U = 56 + a | 0, H = 60 + a | 0, o = (S = 0) | _e[l >> 2], u = 0 | _e[a >> 2], f = 0 | _e[v >> 2], l = 0 | _e[k >> 2], e = 0 | _e[y >> 2], c = 0 | _e[g >> 2], s = 0 | _e[O >> 2], _ = 0 | _e[R >> 2], d = 0 | _e[C >> 2], E = 0 | _e[N >> 2], M = 0 | _e[w >> 2], T = 0 | _e[P >> 2], A = 0 | _e[I >> 2], p = m = b = h = 0; B = 0 | Te(i, F), u = u + (0 | _e[n + (B << 2) >> 2]) & 7, f = f + (0 | _e[t + (B << 2) >> 2]) & 7, B = 0 | Te(i, F), l = l + (0 | _e[n + (B << 2) >> 2]) & 7, e = e + (0 | _e[t + (B << 2) >> 2]) & 7, B = 0 | Te(i, F), c = c + (0 | _e[n + (B << 2) >> 2]) & 7, s = s + (0 | _e[t + (B << 2) >> 2]) & 7, B = 0 | Te(i, F), _ = _ + (0 | _e[n + (B << 2) >> 2]) & 7, d = d + (0 | _e[t + (B << 2) >> 2]) & 7, B = 0 | Te(i, F), E = E + (0 | _e[n + (B << 2) >> 2]) & 7, M = M + (0 | _e[t + (B << 2) >> 2]) & 7, B = 0 | Te(i, F), T = T + (0 | _e[n + (B << 2) >> 2]) & 7, A = A + (0 | _e[t + (B << 2) >> 2]) & 7, B = 0 | Te(i, F), h = h + (0 | _e[n + (B << 2) >> 2]) & 7, b = b + (0 | _e[t + (B << 2) >> 2]) & 7, B = 0 | Te(i, F), m = m + (0 | _e[n + (B << 2) >> 2]) & 7, p = p + (0 | _e[t + (B << 2) >> 2]) & 7, B = 0 | de[1445 + s >> 0], K[o >> 1] = (0 | de[1445 + f >> 0]) << 3 | 0 | de[1445 + u >> 0] | (0 | de[1445 + l >> 0]) << 6 | (0 | de[1445 + e >> 0]) << 9 | (0 | de[1445 + c >> 0]) << 12 | B << 15, x = 0 | de[1445 + T >> 0], K[o + 2 >> 1] = (0 | de[1445 + _ >> 0]) << 2 | B >>> 1 | (0 | de[1445 + d >> 0]) << 5 | (0 | de[1445 + E >> 0]) << 8 | (0 | de[1445 + M >> 0]) << 11 | x << 14, K[o + 4 >> 1] = (0 | de[1445 + A >> 0]) << 1 | x >>> 2 | (0 | de[1445 + h >> 0]) << 4 | (0 | de[1445 + b >> 0]) << 7 | (0 | de[1445 + m >> 0]) << 10 | (0 | de[1445 + p >> 0]) << 13, !(r >>> 0 <= (S = S + 1 | 0) >>> 0);) {
                          o = o + 6 | 0;
                        }

                        _e[a >> 2] = u, _e[v >> 2] = f, _e[k >> 2] = l, _e[y >> 2] = e, _e[g >> 2] = c, _e[O >> 2] = s, _e[R >> 2] = _, _e[C >> 2] = d, _e[N >> 2] = E, _e[w >> 2] = M, _e[P >> 2] = T, _e[I >> 2] = A, _e[L >> 2] = h, _e[D >> 2] = b, _e[U >> 2] = m, _e[H >> 2] = p, o = 1;
                      }
                    } while (0);
                  } else o = 0;

                  return ie(F), Me = Y, 0 | (B = o);
                }(e)) return 0 | (t = 1);
              }

              return (t = 0) | t;
            }

            return _e[e + 88 >> 2] = 0, (t = 0) | t;
          }(f, e, r)) return Me = s, 0 | (d = f);
          return Y(f), Me = (7 & f ? (_e[c >> 2] = 866, _e[c + 4 >> 2] = 2506, _e[c + 8 >> 2] = 1232, Oe(u, 812, c), Ae(u)) : fe(f, 0, 0, 1, 0), s), (d = 0) | d;
        }(e, r), r = a + t | 0;

        do {
          if (t >>> 0 < r >>> 0) {
            if (!_) {
              for (n = i; n = n + (0 | te(0 | te((l + 3 | 0) >>> 2, d), (c + 3 | 0) >>> 2)) | 0, (0 | (t = t + 1 | 0)) != (0 | r);) {
                c >>>= 1, l >>>= 1;
              }

              _e[u >> 2] = n;
              break;
            }

            for (e = c, n = i; c = 0 | te((l + 3 | 0) >>> 2, d), 15 < t >>> 0 | (s = 0 | te(c, (e + 3 | 0) >>> 2)) >>> 0 < 8 || 519686845 != (0 | _e[_ >> 2]) || (function (e, r, i, n, t) {
              r |= 0, i |= 0, n |= 0, t |= 0;
              var a,
                  o,
                  u,
                  f = 0,
                  l = 0,
                  c = 0;
              Me = (u = Me) + 528 | 0, l = (c = u) + 16 | 0, a = 0 | _e[88 + (e |= 0) >> 2], o = (0 | de[70 + a + (t << 2) + 1 >> 0]) << 16 | (0 | de[70 + a + (t << 2) >> 0]) << 24 | (0 | de[70 + a + (t << 2) + 2 >> 0]) << 8 | 0 | de[70 + a + (t << 2) + 3 >> 0], f = (f = t + 1 | 0) >>> 0 < (0 | de[16 + a >> 0]) >>> 0 ? (0 | de[70 + a + (f << 2) + 1 >> 0]) << 16 | (0 | de[70 + a + (f << 2) >> 0]) << 24 | (0 | de[70 + a + (f << 2) + 2 >> 0]) << 8 | 0 | de[70 + a + (f << 2) + 3 >> 0] : 0 | _e[e + 8 >> 2];
              if (o >>> 0 < f >>> 0) return l = 0 | _e[(l = e + 4 | 0) >> 2], c = 0 | W(e, l = l + o | 0, c = f - o | 0, r, i, n, t), Me = u;
              _e[c >> 2] = 866, _e[c + 4 >> 2] = 3694, _e[c + 8 >> 2] = 1508, Oe(l, 812, c), Ae(l), l = 0 | _e[(l = e + 4 | 0) >> 2], c = 0 | W(e, l = l + o | 0, c = f - o | 0, r, i, n, t), Me = u;
            }(_, u, s, c, t), n = 0 | _e[u >> 2]), n = n + s | 0, _e[u >> 2] = n, (0 | (t = t + 1 | 0)) != (0 | r);) {
              e >>>= 1, l >>>= 1;
            }
          }
        } while (0);

        if (_) {
          if (519686845 == (0 | _e[_ >> 2])) return Y(_), 7 & _ ? (_e[f >> 2] = 866, _e[4 + f >> 2] = 2506, _e[8 + f >> 2] = 1232, Oe(o, 812, f), Ae(o)) : fe(_, 0, 0, 1, 0), void (Me = E);
          Me = E;
        } else Me = E;
      },
      _memset: ae,
      _sbrk: me,
      _memcpy: z,
      stackAlloc: function stackAlloc(e) {
        var r = Me;
        return Me = (Me = Me + (e |= 0) | 0) + 15 & -16, 0 | r;
      },
      _crn_get_height: function _crn_get_height(e, r) {
        e |= 0, r |= 0;
        var i,
            n = Me;
        return Me = Me + 48 | 0, _e[(i = n) >> 2] = 40, $(e, r, i), Me = n, 0 | _e[i + 8 >> 2];
      },
      dynCall_vi: function dynCall_vi(e, r) {
        r |= 0, Qe[7 & (e |= 0)](0 | r);
      },
      getTempRet0: function getTempRet0() {
        return 0 | P;
      },
      _crn_get_levels: function _crn_get_levels(e, r) {
        e |= 0, r |= 0;
        var i,
            n = Me;
        return Me = Me + 48 | 0, _e[(i = n) >> 2] = 40, $(e, r, i), Me = n, 0 | _e[i + 12 >> 2];
      },
      _crn_get_uncompressed_size: function _crn_get_uncompressed_size(e, r, i) {
        e |= 0, r |= 0, i |= 0;
        var n,
            t,
            a,
            o = 0,
            u = 0,
            f = Me;

        switch (Me = Me + 576 | 0, a = f + 40 | 0, t = f + 56 | 0, _e[(u = f) >> 2] = 40, $(e, r, u), n = (3 + ((0 | _e[u + 4 >> 2]) >>> i) | 0) >>> 2, r = (3 + ((0 | _e[u + 8 >> 2]) >>> i) | 0) >>> 2, e = 0 | _e[(i = u + 32 | 0) + 4 >> 2], 0 | _e[i >> 2]) {
          case 0:
            e ? o = 14 : e = 8;
            break;

          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            o = e ? 14 : 13;
            break;

          case 9:
          case 10:
            e ? o = 14 : e = 8;
            break;

          default:
            o = 14;
        }

        return 13 == (0 | o) ? e = 16 : 14 == (0 | o) && (_e[a >> 2] = 866, _e[4 + a >> 2] = 2672, _e[8 + a >> 2] = 1251, Oe(t, 812, a), Ae(t), e = 0), u = 0 | te(0 | te(r, n), e), Me = f, 0 | u;
      },
      _i64Add: Ie,
      dynCall_iiii: function dynCall_iiii(e, r, i, n) {
        return r |= 0, i |= 0, n |= 0, 0 | Ze[7 & (e |= 0)](0 | r, 0 | i, 0 | n);
      },
      _emscripten_get_global_libc: function _emscripten_get_global_libc() {
        return 5072;
      },
      dynCall_ii: function dynCall_ii(e, r) {
        return r |= 0, 0 | $e[1 & (e |= 0)](0 | r);
      },
      ___udivdi3: xe,
      _llvm_bswap_i32: Be,
      dynCall_viiiii: function dynCall_viiiii(e, r, i, n, t, a) {
        r |= 0, i |= 0, n |= 0, t |= 0, a |= 0, qe[3 & (e |= 0)](0 | r, 0 | i, 0 | n, 0 | t, 0 | a);
      },
      ___cxa_can_catch: function ___cxa_can_catch(e, r, i) {
        e |= 0, r |= 0, i |= 0;
        var n,
            t = Me;
        return Me = Me + 16 | 0, _e[(n = t) >> 2] = _e[i >> 2], (e = 0 | Ze[7 & _e[16 + (0 | _e[e >> 2]) >> 2]](e, r, n)) && (_e[i >> 2] = _e[n >> 2]), Me = t, 1 & e | 0;
      },
      _free: F,
      runPostSets: function runPostSets() {},
      dynCall_viiiiii: function dynCall_viiiiii(e, r, i, n, t, a, o) {
        r |= 0, i |= 0, n |= 0, t |= 0, a |= 0, o |= 0, ir[3 & (e |= 0)](0 | r, 0 | i, 0 | n, 0 | t, 0 | a, 0 | o);
      },
      establishStackSpace: function establishStackSpace(e, r) {
        Me = e |= 0, r |= 0;
      },
      ___uremdi3: ke,
      ___cxa_is_pointer_type: function ___cxa_is_pointer_type(e) {
        return 1 & (e = (e |= 0) ? 0 != (0 | Z(e, 32, 88, 0)) : 0) | 0;
      },
      stackRestore: function stackRestore(e) {
        Me = e |= 0;
      },
      _malloc: L,
      _emscripten_replace_memory: function _emscripten_replace_memory(e) {
        return !(16777215 & s(e) || s(e) <= 16777215 || 2147483648 < s(e)) && (se = new n(e), K = new t(e), _e = new a(e), de = new o(e), Ee = new u(e), new f(e), new l(e), N = new c(e), i = e, !0);
      },
      dynCall_v: function dynCall_v(e) {
        rr[3 & (e |= 0)]();
      },
      _crn_get_width: function _crn_get_width(e, r) {
        e |= 0, r |= 0;
        var i,
            n = Me;
        return Me = Me + 48 | 0, _e[(i = n) >> 2] = 40, $(e, r, i), Me = n, 0 | _e[i + 4 >> 2];
      },
      _crn_get_dxt_format: function _crn_get_dxt_format(e, r) {
        e |= 0, r |= 0;
        var i,
            n = Me;
        return Me = Me + 48 | 0, _e[(i = n) >> 2] = 40, $(e, r, i), Me = n, 0 | _e[i + 32 >> 2];
      }
    };
  }(Module.asmGlobalArg, Module.asmLibraryArg, buffer),
      stackSave = Module.stackSave = asm.stackSave,
      getTempRet0 = Module.getTempRet0 = asm.getTempRet0,
      _memset = Module._memset = asm._memset,
      setThrew = Module.setThrew = asm.setThrew,
      _bitshift64Lshr = Module._bitshift64Lshr = asm._bitshift64Lshr,
      _bitshift64Shl = Module._bitshift64Shl = asm._bitshift64Shl,
      setTempRet0 = Module.setTempRet0 = asm.setTempRet0,
      _crn_decompress = Module._crn_decompress = asm._crn_decompress,
      _crn_get_bytes_per_block = Module._crn_get_bytes_per_block = asm._crn_get_bytes_per_block,
      _sbrk = Module._sbrk = asm._sbrk,
      _memcpy = Module._memcpy = asm._memcpy,
      stackAlloc = Module.stackAlloc = asm.stackAlloc,
      _crn_get_height = Module._crn_get_height = asm._crn_get_height,
      _i64Subtract = Module._i64Subtract = asm._i64Subtract,
      _crn_get_levels = Module._crn_get_levels = asm._crn_get_levels,
      _crn_get_uncompressed_size = Module._crn_get_uncompressed_size = asm._crn_get_uncompressed_size,
      _i64Add = Module._i64Add = asm._i64Add,
      _emscripten_get_global_libc = Module._emscripten_get_global_libc = asm._emscripten_get_global_libc,
      ___udivdi3 = Module.___udivdi3 = asm.___udivdi3,
      _llvm_bswap_i32 = Module._llvm_bswap_i32 = asm._llvm_bswap_i32,
      ___cxa_can_catch = Module.___cxa_can_catch = asm.___cxa_can_catch,
      _free = Module._free = asm._free,
      runPostSets = Module.runPostSets = asm.runPostSets,
      establishStackSpace = Module.establishStackSpace = asm.establishStackSpace,
      ___uremdi3 = Module.___uremdi3 = asm.___uremdi3,
      ___cxa_is_pointer_type = Module.___cxa_is_pointer_type = asm.___cxa_is_pointer_type,
      stackRestore = Module.stackRestore = asm.stackRestore,
      _malloc = Module._malloc = asm._malloc,
      _emscripten_replace_memory = Module._emscripten_replace_memory = asm._emscripten_replace_memory,
      _crn_get_width = Module._crn_get_width = asm._crn_get_width,
      _crn_get_dxt_format = Module._crn_get_dxt_format = asm._crn_get_dxt_format,
      dynCall_iiii = Module.dynCall_iiii = asm.dynCall_iiii,
      dynCall_viiiii = Module.dynCall_viiiii = asm.dynCall_viiiii,
      dynCall_vi = Module.dynCall_vi = asm.dynCall_vi,
      dynCall_ii = Module.dynCall_ii = asm.dynCall_ii,
      dynCall_viii = Module.dynCall_viii = asm.dynCall_viii,
      dynCall_v = Module.dynCall_v = asm.dynCall_v,
      dynCall_viiiiii = Module.dynCall_viiiiii = asm.dynCall_viiiiii,
      dynCall_viiii = Module.dynCall_viiii = asm.dynCall_viiii,
      initialStackTop;

  function ExitStatus(e) {
    this.name = "ExitStatus", this.message = "Program terminated with exit(" + e + ")", this.status = e;
  }

  Runtime.stackAlloc = Module.stackAlloc, Runtime.stackSave = Module.stackSave, Runtime.stackRestore = Module.stackRestore, Runtime.establishStackSpace = Module.establishStackSpace, Runtime.setTempRet0 = Module.setTempRet0, Runtime.getTempRet0 = Module.getTempRet0, Module.asm = asm, ExitStatus.prototype = new Error(), ExitStatus.prototype.constructor = ExitStatus;
  var preloadStartTime = null,
      calledMain = !1;

  function run(e) {
    function r() {
      Module.calledRun || (Module.calledRun = !0, ABORT || (ensureInitRuntime(), preMain(), Module.onRuntimeInitialized && Module.onRuntimeInitialized(), Module._main && shouldRunNow && Module.callMain(e), postRun()));
    }

    e = e || Module.arguments, null === preloadStartTime && (preloadStartTime = Date.now()), 0 < runDependencies || (preRun(), 0 < runDependencies || Module.calledRun || (Module.setStatus ? (Module.setStatus("Running..."), setTimeout(function () {
      setTimeout(function () {
        Module.setStatus("");
      }, 1), r();
    }, 1)) : r()));
  }

  function exit(e, r) {
    r && Module.noExitRuntime || (Module.noExitRuntime || (ABORT = !0, EXITSTATUS = e, STACKTOP = initialStackTop, exitRuntime(), Module.onExit && Module.onExit(e)), ENVIRONMENT_IS_NODE && process.exit(e), Module.quit(e, new ExitStatus(e)));
  }

  dependenciesFulfilled = function e() {
    Module.calledRun || run(), Module.calledRun || (dependenciesFulfilled = e);
  }, Module.callMain = Module.callMain = function (e) {
    e = e || [], ensureInitRuntime();
    var r = e.length + 1;

    function i() {
      for (var e = 0; e < 3; e++) {
        n.push(0);
      }
    }

    var n = [allocate(intArrayFromString(Module.thisProgram), "i8", ALLOC_NORMAL)];
    i();

    for (var t = 0; t < r - 1; t += 1) {
      n.push(allocate(intArrayFromString(e[t]), "i8", ALLOC_NORMAL)), i();
    }

    n.push(0), n = allocate(n, "i32", ALLOC_NORMAL);

    try {
      exit(Module._main(r, n, 0), !0);
    } catch (e) {
      if (e instanceof ExitStatus) return;
      if ("SimulateInfiniteLoop" == e) return void (Module.noExitRuntime = !0);
      var a = e;
      e && "object" == _typeof(e) && e.stack && (a = [e, e.stack]), Module.printErr("exception thrown: " + a), Module.quit(1, e);
    } finally {
      calledMain = !0;
    }
  }, Module.run = Module.run = run, Module.exit = Module.exit = exit;
  var abortDecorators = [];

  function abort(r) {
    Module.onAbort && Module.onAbort(r), r = void 0 !== r ? (Module.print(r), Module.printErr(r), JSON.stringify(r)) : "", ABORT = !0, EXITSTATUS = 1;
    var i = "abort(" + r + ") at " + stackTrace() + "\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";
    throw abortDecorators && abortDecorators.forEach(function (e) {
      i = e(i, r);
    }), i;
  }

  if (Module.abort = Module.abort = abort, Module.preInit) for ("function" == typeof Module.preInit && (Module.preInit = [Module.preInit]); 0 < Module.preInit.length;) {
    Module.preInit.pop()();
  }
  var shouldRunNow = !0;
  return Module.noInitialRun && (shouldRunNow = !1), Module.noExitRuntime = !0, run(), Module;
});