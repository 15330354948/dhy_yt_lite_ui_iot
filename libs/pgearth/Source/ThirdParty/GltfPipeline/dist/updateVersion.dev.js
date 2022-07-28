"use strict";

define(["./addExtensionsUsed", "./addToArray", "./findAccessorMinMax", "./ForEach", "./getAccessorByteStride", "./numberOfComponentsForType", "./moveTechniqueRenderStates", "./moveTechniquesToExtension", "./removeUnusedElements", "./updateAccessorComponentTypes", "../../Core/Cartesian3", "../../Core/Cartesian4", "../../Core/clone", "../../Core/ComponentDatatype", "../../Core/defaultValue", "../../Core/defined", "../../Core/isArray", "../../Core/Matrix4", "../../Core/Quaternion", "../../Core/WebGLConstants"], function (s, g, i, w, t, S, n, r, x, a, k, o, T, q, R, E, f, u, A, c) {
  "use strict";

  var m = {
    .8: function _(e) {
      E(e.asset) || (e.asset = {});
      var n = e.asset;
      {
        var t;
        n.version = "1.0", "string" == typeof n.profile ? (t = n.profile.split(" "), n.profile = {
          api: t[0],
          version: t[1]
        }) : n.profile = {};
      }
      E(e.version) && delete e.version;
      l(e), function (e) {
        var n = e.meshes;

        for (var t in n) {
          if (n.hasOwnProperty(t)) {
            var r = n[t].primitives;
            if (E(r)) for (var i = r.length, s = 0; s < i; ++s) {
              var a = r[s],
                  o = R(a.primitive, c.TRIANGLES);
              a.mode = R(a.mode, o), delete a.primitive;
            }
          }
        }
      }(e), function (e) {
        var n = e.nodes,
            t = new k(),
            r = new A();

        for (var i in n) {
          var s, a, o;
          n.hasOwnProperty(i) && (s = n[i], E(s.rotation) && (a = s.rotation, k.fromArray(a, 0, t), A.fromAxisAngle(t, a[3], r), s.rotation = [r.x, r.y, r.z, r.w]), o = s.instanceSkin, E(o) && (s.skeletons = o.skeletons, s.skin = o.skin, s.meshes = o.meshes, delete s.instanceSkin));
        }
      }(e), function (e) {
        var n = e.animations,
            t = e.accessors,
            r = e.bufferViews,
            i = e.buffers,
            s = {},
            a = new k(),
            o = new A();

        for (var f in n) {
          if (n.hasOwnProperty(f)) {
            var u = n[f],
                c = u.channels,
                m = u.parameters,
                l = u.samplers;
            if (E(c)) for (var v = c.length, d = 0; d < v; ++d) {
              var h = c[d];

              if ("rotation" === h.target.path) {
                var p = m[l[h.sampler].output];
                if (E(s[p])) continue;
                s[p] = !0;

                for (var b = t[p], y = r[b.bufferView], O = i[y.buffer].extras._pipeline.source, g = O.byteOffset + y.byteOffset + b.byteOffset, w = b.componentType, x = b.count, T = S(b.type), R = b.count * T, _ = q.createArrayBufferView(w, O.buffer, g, R), C = 0; C < x; C++) {
                  var V = C * T;
                  k.unpack(_, V, a);
                  var P = _[3 + V];
                  A.fromAxisAngle(a, P, o), A.pack(o, _, V);
                }
              }
            }
          }
        }
      }(e), function (e) {
        var n = e.techniques;

        for (var t in n) {
          var r, i, s, a, o;
          n.hasOwnProperty(t) && (r = n[t], i = r.passes, E(i) && (s = R(r.pass, "defaultPass"), i.hasOwnProperty(s) && (a = i[s], o = a.instanceProgram, r.attributes = R(r.attributes, o.attributes), r.program = R(r.program, o.program), r.uniforms = R(r.uniforms, o.uniforms), r.states = R(r.states, a.states)), delete r.passes, delete r.pass));
        }
      }(e), E(e.allExtensions) && (e.extensionsUsed = e.allExtensions, delete e.allExtensions);
      {
        var r, i;
        E(e.lights) && (r = R(e.extensions, {}), e.extensions = r, i = R(r.KHR_materials_common, {}), (r.KHR_materials_common = i).lights = e.lights, delete e.lights, s(e, "KHR_materials_common"));
      }
    },
    "1.0": function _(e) {
      e.asset = R(e.asset, {}), e.asset.version = "2.0", l(e), function (e) {
        var n = e.animations;

        for (var t in n) {
          if (n.hasOwnProperty(t)) {
            var r = n[t],
                i = r.parameters;

            if (E(i)) {
              var s,
                  a = r.samplers;

              for (var o in a) {
                a.hasOwnProperty(o) && ((s = a[o]).input = i[s.input], s.output = i[s.output]);
              }

              delete r.parameters;
            }
          }
        }
      }(e), function (t) {
        w.node(t, function (e, n) {
          b(e) && !function r(i, s) {
            w.scene(i, function (e) {
              var n = e.nodes;
              if (E(n)) for (var t = n.length, r = t; 0 <= r; --r) {
                if (n[r] === s) return void n.splice(r, 1);
              }
            });
            w.node(i, function (e, n) {
              var t;
              !E(e.children) || -1 < (t = e.children.indexOf(s)) && (e.children.splice(t, 1), b(e) && r(i, n));
            });
            delete i.nodes[s];
          }(t, n);
        });
      }(e), function (f) {
        var u,
            e,
            c = {
          accessors: {},
          animations: {},
          buffers: {},
          bufferViews: {},
          cameras: {},
          images: {},
          materials: {},
          meshes: {},
          nodes: {},
          programs: {},
          samplers: {},
          scenes: {},
          shaders: {},
          skins: {},
          textures: {},
          techniques: {}
        },
            i = {},
            n = f.nodes;

        for (var t in n) {
          n.hasOwnProperty(t) && (e = n[t].jointName, E(e) && (i[e] = t));
        }

        for (var r in f) {
          var s, a;
          f.hasOwnProperty(r) && E(c[r]) && (s = {}, a = f[r], f[r] = v(a, s), c[r] = s);
        }

        for (e in i) {
          i.hasOwnProperty(e) && (i[e] = c.nodes[i[e]]);
        }

        E(f.scene) && (f.scene = c.scenes[f.scene]);
        w.bufferView(f, function (e) {
          E(e.buffer) && (e.buffer = c.buffers[e.buffer]);
        }), w.accessor(f, function (e) {
          E(e.bufferView) && (e.bufferView = c.bufferViews[e.bufferView]);
        }), w.shader(f, function (e) {
          var n,
              t = e.extensions;
          E(t) && (n = t.KHR_binary_glTF, E(n) && (e.bufferView = c.bufferViews[n.bufferView], delete t.KHR_binary_glTF), 0 === Object.keys(t).length && delete e.extensions);
        }), w.program(f, function (e) {
          E(e.vertexShader) && (e.vertexShader = c.shaders[e.vertexShader]), E(e.fragmentShader) && (e.fragmentShader = c.shaders[e.fragmentShader]);
        }), w.technique(f, function (e) {
          E(e.program) && (e.program = c.programs[e.program]), w.techniqueParameter(e, function (e) {
            E(e.node) && (e.node = c.nodes[e.node]);
            var n = e.value;
            "string" == typeof n && (e.value = {
              index: c.textures[n]
            });
          });
        }), w.mesh(f, function (e) {
          w.meshPrimitive(e, function (t) {
            E(t.indices) && (t.indices = c.accessors[t.indices]), w.meshPrimitiveAttribute(t, function (e, n) {
              t.attributes[n] = c.accessors[e];
            }), E(t.material) && (t.material = c.materials[t.material]);
          });
        }), w.node(f, function (e) {
          var n,
              t = e.children;

          if (E(t)) {
            var r = t.length;

            for (u = 0; u < r; ++u) {
              t[u] = c.nodes[t[u]];
            }
          }

          if (E(e.meshes)) {
            var i = e.meshes,
                s = i.length;
            if (0 < s) for (e.mesh = c.meshes[i[0]], u = 1; u < s; ++u) {
              var a = {
                mesh: c.meshes[i[u]]
              },
                  o = g(f.nodes, a);
              E(t) || (t = [], e.children = t), t.push(o);
            }
            delete e.meshes;
          }

          E(e.camera) && (e.camera = c.cameras[e.camera]), E(e.skin) && (e.skin = c.skins[e.skin]), E(e.skeletons) && (0 < (n = e.skeletons).length && E(e.skin) && (f.skins[e.skin].skeleton = c.nodes[n[0]]), delete e.skeletons), E(e.jointName) && delete e.jointName;
        }), w.skin(f, function (e) {
          E(e.inverseBindMatrices) && (e.inverseBindMatrices = c.accessors[e.inverseBindMatrices]);
          var n = e.jointNames;

          if (E(n)) {
            var t = [],
                r = n.length;

            for (u = 0; u < r; ++u) {
              t[u] = i[n[u]];
            }

            e.joints = t, delete e.jointNames;
          }
        }), w.scene(f, function (e) {
          var n = e.nodes;

          if (E(n)) {
            var t = n.length;

            for (u = 0; u < t; ++u) {
              n[u] = c.nodes[n[u]];
            }
          }
        }), w.animation(f, function (e) {
          var t = {};
          e.samplers = v(e.samplers, t), w.animationSampler(e, function (e) {
            e.input = c.accessors[e.input], e.output = c.accessors[e.output];
          }), w.animationChannel(e, function (e) {
            e.sampler = t[e.sampler];
            var n = e.target;
            E(n) && (n.node = c.nodes[n.id], delete n.id);
          });
        }), w.material(f, function (t) {
          E(t.technique) && (t.technique = c.techniques[t.technique]), w.materialValue(t, function (e, n) {
            "string" == typeof e && (t.values[n] = {
              index: c.textures[e]
            });
          });
          var r,
              e = t.extensions;
          E(e) && (r = e.KHR_materials_common, E(r) && w.materialValue(r, function (e, n) {
            "string" == typeof e && (r.values[n] = {
              index: c.textures[e]
            });
          }));
        }), w.image(f, function (e) {
          var n,
              r = e.extensions;
          E(r) && (n = r.KHR_binary_glTF, E(n) && (e.bufferView = c.bufferViews[n.bufferView], e.mimeType = n.mimeType, delete r.KHR_binary_glTF), 0 === Object.keys(r).length && delete e.extensions), w.compressedImage(e, function (e) {
            var n,
                t = e.extensions;
            E(t) && (n = t.KHR_binary_glTF, E(n) && (e.bufferView = c.bufferViews[n.bufferView], e.mimeType = n.mimeType, delete t.KHR_binary_glTF), 0 === Object.keys(r).length && delete e.extensions);
          });
        }), w.texture(f, function (e) {
          E(e.sampler) && (e.sampler = c.samplers[e.sampler]), E(e.source) && (e.source = c.images[e.source]);
        });
      }(e), function (e) {
        w.animation(e, function (e) {
          w.animationSampler(e, function (e) {
            delete e.name;
          });
        });
      }(e), function (e) {
        var n = e.asset;
        delete n.profile, delete n.premultipliedAlpha;
      }(e), function (e) {
        var n = e.extensionsUsed;
        if (e.extensionsRequired = R(e.extensionsRequired, []), E(n)) for (var t = n.length, r = 0; r < t; ++r) {
          var i = n[r];
          E(d[i]) && e.extensionsRequired.push(i);
        }
      }(e), function (s) {
        w.buffer(s, function (e) {
          E(e.byteLength) || (e.byteLength = e.extras._pipeline.source.length);
        }), w.accessor(s, function (e) {
          var n,
              t,
              r,
              i = e.bufferView;
          E(i) && (n = s.bufferViews[i], t = _2(s, e), r = e.byteOffset + e.count * t, n.byteLength = Math.max(R(n.byteLength, 0), r));
        });
      }(e), function (t) {
        var e,
            n,
            r,
            i = t.bufferViews,
            s = {};
        w.accessorContainingVertexAttributeData(t, function (e) {
          var n = t.accessors[e];
          E(n.bufferView) && (s[n.bufferView] = !0);
        });
        var a = {};

        for (var o in w.accessor(t, function (e) {
          E(e.bufferView) && (a[e.bufferView] = R(a[e.bufferView], []), a[e.bufferView].push(e));
        }), a) {
          if (a.hasOwnProperty(o)) {
            r = i[o];
            var f = a[o];
            f.sort(function (e, n) {
              return e.byteOffset - n.byteOffset;
            });
            var u = 0,
                c = 0,
                m = f.length;

            for (e = 0; e < m; ++e) {
              var l = f[e],
                  v = _2(t, l),
                  d = l.byteOffset,
                  h = l.count * v;

              delete l.byteStride;
              var p = e < m - 1,
                  b = p ? _2(t, f[e + 1]) : void 0;

              if (v !== b) {
                var y = T(r, !0);
                s[o] && (y.byteStride = v), y.byteOffset += u, y.byteLength = d + h - u;
                var O = g(i, y);

                for (n = c; n <= e; ++n) {
                  (l = f[n]).bufferView = O, l.byteOffset = l.byteOffset - u;
                }

                u = p ? f[e + 1].byteOffset : void 0, c = e + 1;
              }
            }
          }
        }

        x(t);
      }(e), function (r) {
        w.accessorWithSemantic(r, "POSITION", function (e) {
          var n,
              t = r.accessors[e];
          E(t.min) && E(t.max) || (n = i(r, t), t.min = n.min, t.max = n.max);
        });
      }(e), function (r) {
        w.animation(r, function (e) {
          w.animationSampler(e, function (e) {
            var n,
                t = r.accessors[e.input];
            E(t.min) && E(t.max) || (n = i(r, t), t.min = n.min, t.max = n.max);
          });
        });
      }(e), function (e) {
        w.buffer(e, function (e) {
          delete e.type;
        });
      }(e), function (e) {
        w.texture(e, function (e) {
          delete e.format, delete e.internalFormat, delete e.target, delete e.type;
        });
      }(e), function (e) {
        w.mesh(e, function (e) {
          w.meshPrimitive(e, function (t) {
            w.meshPrimitiveAttribute(t, function (e, n) {
              "TEXCOORD" === n ? t.attributes.TEXCOORD_0 = e : "COLOR" === n && (t.attributes.COLOR_0 = e);
            }), delete t.attributes.TEXCOORD, delete t.attributes.COLOR;
          });
        }), w.technique(e, function (e) {
          w.techniqueParameter(e, function (e) {
            var n = e.semantic;
            E(n) && ("TEXCOORD" === n ? e.semantic = "TEXCOORD_0" : "COLOR" === n && (e.semantic = "COLOR_0"));
          });
        });
      }(e), function (e) {
        var o = {};
        w.mesh(e, function (e) {
          w.meshPrimitive(e, function (e) {
            for (var n in w.meshPrimitiveAttribute(e, function (e, n) {
              var t, r, i, s, a;
              "_" !== n.charAt(0) && (t = n.search(/_[0-9]+/g), r = n, i = "_0", 0 <= t && (r = n.substring(0, t), i = n.substring(t)), a = p[r], E(a) ? (s = a + i, o[n] = s) : E(h[r]) || (s = "_" + n, o[n] = s));
            }), o) {
              var t, r;
              o.hasOwnProperty(n) && (t = o[n], r = e.attributes[n], E(r) && (delete e.attributes[n], e.attributes[t] = r));
            }
          });
        }), w.technique(e, function (e) {
          w.techniqueParameter(e, function (e) {
            var n = o[e.semantic];
            E(n) && (e.semantic = n);
          });
        });
      }(e), a(e), function (e) {
        w.camera(e, function (e) {
          var n,
              t,
              r = e.perspective;
          E(r) && (n = r.aspectRatio, E(n) && 0 === n && delete r.aspectRatio, t = r.yfov, E(t) && 0 === t && (r.yfov = 1));
        });
      }(e), n(e), r(e), function (e) {
        for (var n in e) {
          var t;
          e.hasOwnProperty(n) && (t = e[n], f(t) && 0 === t.length && delete e[n]);
        }

        w.node(e, function (e) {
          E(e.children) && 0 === e.children.length && delete e.children;
        });
      }(e);
    },
    "2.0": void 0
  };

  function l(e) {
    var n,
        t,
        r = e.materials;

    for (var i in r) {
      r.hasOwnProperty(i) && (t = (n = r[i]).instanceTechnique, E(t) && (n.technique = t.technique, n.values = t.values, delete n.instanceTechnique));
    }
  }

  function v(e, n) {
    var t,
        r = [];

    for (var i in e) {
      e.hasOwnProperty(i) && (t = e[i], n[i] = r.length, r.push(t), E(t.name) || (t.name = i));
    }

    return r;
  }

  var d = {
    PGEARTH_RTC: !0,
    KHR_materials_common: !0,
    WEB3D_quantized_attributes: !0
  };
  var h = {
    POSITION: !0,
    NORMAL: !0,
    TANGENT: !0
  },
      p = {
    COLOR: "COLOR",
    JOINT: "JOINTS",
    JOINTS: "JOINTS",
    TEXCOORD: "TEXCOORD",
    WEIGHT: "WEIGHTS",
    WEIGHTS: "WEIGHTS"
  };

  function _2(e, n) {
    return E(n.byteStride) && 0 !== n.byteStride ? n.byteStride : t(e, n);
  }

  function b(e) {
    return (!E(e.children) || 0 === e.children.length) && (!E(e.meshes) || 0 === e.meshes.length) && !E(e.camera) && !E(e.skin) && !E(e.skeletons) && !E(e.jointName) && (!E(e.translation) || k.fromArray(e.translation).equals(k.ZERO)) && (!E(e.scale) || k.fromArray(e.scale).equals(new k(1, 1, 1))) && (!E(e.rotation) || o.fromArray(e.rotation).equals(new o(0, 0, 0, 1))) && (!E(e.matrix) || u.fromColumnMajorArray(e.matrix).equals(u.IDENTITY)) && !E(e.extensions) && !E(e.extras);
  }

  return function (e, n) {
    var t = (n = R(n, R.EMPTY_OBJECT)).targetVersion,
        r = e.version;
    e.asset = R(e.asset, {
      version: "1.0"
    }), e.asset.version = R(e.asset.version, "1.0"), r = R(r, e.asset.version).toString(), m.hasOwnProperty(r) || (E(r) && (r = r.substring(0, 3)), m.hasOwnProperty(r) || (r = "1.0"));

    for (var i = m[r]; E(i) && r !== t;) {
      i(e, n), r = e.asset.version, i = m[r];
    }

    return e;
  };
});