"use strict";

define(["../Core/ApproximateTerrainHeights", "../Core/BoundingSphere", "../Core/buildModuleUrl", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartographic", "../Core/Check", "../Core/ColorGeometryInstanceAttribute", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/GeographicTilingScheme", "../Core/GeometryInstance", "../Core/isArray", "../Core/Math", "../Core/OrientedBoundingBox", "../Core/Rectangle", "../Core/RectangleGeometry", "../Core/Resource", "../Renderer/DrawCommand", "../Renderer/Pass", "../ThirdParty/when", "./ClassificationPrimitive", "./ClassificationType", "./PerInstanceColorAppearance", "./SceneMode", "./ShadowVolumeAppearance"], function (x, V, e, i, H, t, r, n, a, M, o, s, O, u, E, D, G, N, A, h, m, c, d, p, k, B, l, F, R) {
  "use strict";

  var g = {
    u_globeMinimumAltitude: function u_globeMinimumAltitude() {
      return 55e3;
    }
  };

  function z(e) {
    var i = (e = a(e, a.EMPTY_OBJECT)).appearance,
        t = e.geometryInstances;
    if (!M(i) && M(t)) for (var r = D(t) ? t : [t], n = r.length, o = 0; o < n; o++) {
      var s = r[o].attributes;

      if (M(s) && M(s.color)) {
        i = new l({
          flat: !0
        });
        break;
      }
    }
    this.appearance = i, this.geometryInstances = e.geometryInstances, this.show = a(e.show, !0), this.classificationType = a(e.classificationType, B.BOTH), this.debugShowBoundingVolume = a(e.debugShowBoundingVolume, !1), this.debugShowShadowVolume = a(e.debugShowShadowVolume, !1), this._boundingVolumes = [], this._boundingVolumes2D = [], this._ready = !1, this._readyPromise = p.defer(), this._primitive = void 0, this._maxHeight = void 0, this._minHeight = void 0, this._maxTerrainHeight = x._defaultMaxTerrainHeight, this._minTerrainHeight = x._defaultMinTerrainHeight, this._boundingSpheresKeys = [], this._boundingSpheres = [], this._useFragmentCulling = !1, this._zIndex = void 0;
    this._classificationPrimitiveOptions = {
      geometryInstances: void 0,
      appearance: void 0,
      vertexCacheOptimize: a(e.vertexCacheOptimize, !1),
      interleave: a(e.interleave, !1),
      releaseGeometryInstances: a(e.releaseGeometryInstances, !0),
      allowPicking: a(e.allowPicking, !0),
      asynchronous: a(e.asynchronous, !0),
      compressVertices: a(e.compressVertices, !0),
      _createBoundingVolumeFunction: void 0,
      _updateAndQueueCommandsFunction: void 0,
      _pickPrimitive: this,
      _extruded: !0,
      _uniformMap: g
    };
  }

  function j(n) {
    return function (e, i) {
      var t = i.maximumRadius,
          r = t / Math.cos(.5 * e) - t;
      return n._maxHeight + r;
    };
  }

  function L(t) {
    return function (e, i) {
      return t._minHeight;
    };
  }

  o(z.prototype, {
    vertexCacheOptimize: {
      get: function get() {
        return this._classificationPrimitiveOptions.vertexCacheOptimize;
      }
    },
    interleave: {
      get: function get() {
        return this._classificationPrimitiveOptions.interleave;
      }
    },
    releaseGeometryInstances: {
      get: function get() {
        return this._classificationPrimitiveOptions.releaseGeometryInstances;
      }
    },
    allowPicking: {
      get: function get() {
        return this._classificationPrimitiveOptions.allowPicking;
      }
    },
    asynchronous: {
      get: function get() {
        return this._classificationPrimitiveOptions.asynchronous;
      }
    },
    compressVertices: {
      get: function get() {
        return this._classificationPrimitiveOptions.compressVertices;
      }
    },
    ready: {
      get: function get() {
        return this._ready;
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise.promise;
      }
    }
  }), z.isSupported = k.isSupported;
  var v = new H(),
      y = new H(),
      C = new H(),
      b = new t(),
      w = new A();

  function Y(e, i) {
    var t = e.mapProjection.ellipsoid;
    if (!M(i.attributes) || !M(i.attributes.position3DHigh)) return M(i.rectangle) ? i.rectangle : void 0;

    for (var r = i.attributes.position3DHigh.values, n = i.attributes.position3DLow.values, o = r.length, s = Number.POSITIVE_INFINITY, a = Number.POSITIVE_INFINITY, u = Number.NEGATIVE_INFINITY, h = Number.NEGATIVE_INFINITY, m = 0; m < o; m += 3) {
      var c = H.unpack(r, m, v),
          d = H.unpack(n, m, y),
          p = H.add(c, d, C),
          l = t.cartesianToCartographic(p, b),
          g = l.latitude,
          _ = l.longitude,
          s = Math.min(s, g),
          a = Math.min(a, _),
          u = Math.max(u, g),
          h = Math.max(h, _);
    }

    var f = w;
    return f.north = u, f.south = s, f.east = h, f.west = a, f;
  }

  function K(e, i) {
    return Math.floor(e % i / 3);
  }

  function Q(e, i, t, r, n, o, s) {
    var a = e._primitive;
    t.mode !== F.SCENE3D && i.shaderProgram === a._spColor && a._needs2DShader && (i = i.derivedCommands.appearance2D), i.owner = e, i.modelMatrix = r, i.boundingVolume = o, i.cull = n, i.debugShowBoundingVolume = s, t.commandList.push(i);
  }

  function U(e, i, t, r, n, o) {
    var s = e._primitive;
    t.mode !== F.SCENE3D && i.shaderProgram === s._spPick && s._needs2DShader && (i = i.derivedCommands.pick2D), i.owner = e, i.modelMatrix = r, i.boundingVolume = o, i.cull = n, t.commandList.push(i);
  }

  return z.initializeTerrainHeights = function () {
    return x.initialize();
  }, z.prototype.update = function (e) {
    if (M(this._primitive) || M(this.geometryInstances)) if (x.initialized) {
      var i,
          t,
          r,
          n,
          d = this,
          o = this._classificationPrimitiveOptions;

      if (!M(this._primitive)) {
        var s,
            a,
            u,
            h,
            m = e.mapProjection.ellipsoid,
            c = D(this.geometryInstances) ? this.geometryInstances : [this.geometryInstances],
            p = c.length,
            l = new Array(p);

        for (b = 0; b < p; ++b) {
          var g = Y(e, a = (s = c[b]).geometry);
          M(h) ? M(g) && A.union(h, g, h) : h = A.clone(g);

          var _,
              f = s.id;

          if (M(f) && M(g) && (_ = x.getBoundingSphere(g, m), this._boundingSpheresKeys.push(f), this._boundingSpheres.push(_)), u = a.constructor, !M(u) || !M(u.createShadowVolume)) throw new O("Not all of the geometry instances have GroundPrimitive support.");
        }

        i = this, t = h, r = m, n = x.getMinimumMaximumHeights(t, r), i._minTerrainHeight = n.minimumTerrainHeight, i._maxTerrainHeight = n.maximumTerrainHeight;
        var v = e.terrainExaggeration;
        this._minHeight = this._minTerrainHeight * v, this._maxHeight = this._maxTerrainHeight * v;

        var y = z._supportsMaterials(e.context);

        if (this._useFragmentCulling = y) {
          for (var C = !0, b = 0; b < p; ++b) {
            if (h = Y(e, a = (s = c[b]).geometry), R.shouldUseSphericalCoordinates(h)) {
              C = !1;
              break;
            }
          }

          for (b = 0; b < p; ++b) {
            u = (a = (s = c[b]).geometry).constructor;
            var w = Y(e, a),
                I = a.textureCoordinateRotationPoints,
                P = C ? R.getPlanarTextureCoordinateAttributes(w, I, m, e.mapProjection, this._maxHeight) : R.getSphericalExtentGeometryInstanceAttributes(w, I, m, e.mapProjection),
                S = s.attributes;

            for (var T in S) {
              S.hasOwnProperty(T) && (P[T] = S[T]);
            }

            l[b] = new E({
              geometry: u.createShadowVolume(a, L(this), j(this)),
              attributes: P,
              id: s.id
            });
          }
        } else for (b = 0; b < p; ++b) {
          u = (a = (s = c[b]).geometry).constructor, l[b] = new E({
            geometry: u.createShadowVolume(a, L(this), j(this)),
            attributes: s.attributes,
            id: s.id
          });
        }

        o.geometryInstances = l, o.appearance = this.appearance, o._createBoundingVolumeFunction = function (e, i) {
          var t, r, n, o, s, a, u, h, m, c;
          t = d, n = i, m = (r = e).mapProjection.ellipsoid, (c = Y(r, n)).width < G.PI ? (o = N.fromRectangle(c, t._maxHeight, t._minHeight, m), t._boundingVolumes.push(o)) : (s = n.attributes.position3DHigh.values, a = n.attributes.position3DLow.values, t._boundingVolumes.push(V.fromEncodedCartesianVertices(s, a))), r.scene3DOnly || (u = r.mapProjection, h = V.fromRectangleWithHeights2D(c, u, t._maxHeight, t._minHeight), H.fromElements(h.center.z, h.center.x, h.center.y, h.center), t._boundingVolumes2D.push(h));
        }, o._updateAndQueueCommandsFunction = function (e, i, t, r, n, o, s, a) {
          !function (e, i, t, r, n, o, s) {
            var a = i.mode === F.SCENE3D ? e._boundingVolumes : e._boundingVolumes2D,
                u = e.classificationType,
                h = u !== B.PGEARTH_3D_TILE,
                m = u !== B.TERRAIN,
                c = i.passes,
                d = e._primitive;

            if (c.render) {
              var p = t.length;

              for (_ = 0; _ < p; ++_) {
                v = a[K(_, p)], h && Q(e, t[_], i, n, o, v, s), m && Q(e, t[_].derivedCommands.tileset, i, n, o, v, s);
              }

              if (i.invertClassification) for (var l = d._commandsIgnoreShow, g = l.length, _ = 0; _ < g; ++_) {
                v = a[Math.floor(_ / 2)], Q(e, l[_], i, n, o, v, s);
              }
            }

            if (c.pick) {
              var f,
                  v,
                  y = r.length;

              for (e._useFragmentCulling || (f = d._primitive._pickOffsets), _ = 0; _ < y; ++_) {
                v = a[K(_, y)], e._useFragmentCulling || (v = a[f[K(_, y)].index]), h && U(e, r[_], i, n, o, v), m && U(e, r[_].derivedCommands.tileset, i, n, o, v);
              }
            }
          }(d, i, t, r, n, o, s);
        }, this._primitive = new k(o), this._primitive.readyPromise.then(function (e) {
          d._ready = !0, d.releaseGeometryInstances && (d.geometryInstances = void 0);
          var i = e._error;
          M(i) ? d._readyPromise.reject(i) : d._readyPromise.resolve(d);
        });
      }

      this._primitive.appearance = this.appearance, this._primitive.show = this.show, this._primitive.debugShowShadowVolume = this.debugShowShadowVolume, this._primitive.debugShowBoundingVolume = this.debugShowBoundingVolume, this._primitive.update(e);
    } else {
      if (!this.asynchronous) throw new O("For synchronous GroundPrimitives, you must call GroundPrimitive.initializeTerrainHeights() and wait for the returned promise to resolve.");
      z.initializeTerrainHeights();
    }
  }, z.prototype.getBoundingSphere = function (e) {
    var i = this._boundingSpheresKeys.indexOf(e);

    if (-1 !== i) return this._boundingSpheres[i];
  }, z.prototype.getGeometryInstanceAttributes = function (e) {
    if (!M(this._primitive)) throw new O("must call update before calling getGeometryInstanceAttributes");
    return this._primitive.getGeometryInstanceAttributes(e);
  }, z.prototype.isDestroyed = function () {
    return !1;
  }, z.prototype.destroy = function () {
    return this._primitive = this._primitive && this._primitive.destroy(), s(this);
  }, z._supportsMaterials = function (e) {
    return e.depthTexture;
  }, z.supportsMaterials = function (e) {
    return r.typeOf.object("scene", e), z._supportsMaterials(e.frameState.context);
  }, z;
});