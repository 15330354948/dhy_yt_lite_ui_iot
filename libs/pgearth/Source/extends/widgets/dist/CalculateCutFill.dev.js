"use strict";

define(["../../Core/BoundingSphere", "../../Core/Cartesian2", "../../Core/Cartesian3", "../../Core/Cartographic", "../../Core/Color", "../../Core/ComponentDatatype", "../../Core/defineProperties", "../../Core/Event", "../../Core/Geometry", "../../Core/GeometryAttribute", "../../Core/GeometryInstance", "../../Core/IntersectionTests", "../../Core/Math", "../../Core/Matrix4", "../../Core/PrimitiveType", "../../Core/Ray", "../../Core/TaskProcessor", "../../Scene/Appearance", "../../Scene/BlendingState", "../../Scene/HorizontalOrigin", "../../Scene/Primitive", "../../Scene/VerticalOrigin"], function (P, e, t, o, C, I, i, r, S, b, A, n, a, s, E, c, l, F, T, p, V, u) {
  "use strict";

  function h(e) {
    this._viewer = e, this._zFactor = 0, this._geoPolygon = void 0, this._sampleGap = 1, this._percentage = 0, this._fillVolume = 0, this._cutVolume = 0, this._vertice = void 0, this._matLocal = new s(), this._matLocalInvert = new s(), this._completeEvent = new r(), this.primitive = null, this.primitive1 = null, this.taskProcessor = new l("computeCutFill", Number.POSITIVE_INFINITY);
  }

  return i(h.prototype, {
    vertice: {
      get: function get() {
        return this._vertice;
      },
      set: function set(e) {
        this._vertice = e;
      }
    },
    matLocal: {
      get: function get() {
        return this._matLocal;
      },
      set: function set(e) {
        this._matLocal = e;
      }
    },
    completeEvent: {
      get: function get() {
        return this._completeEvent;
      }
    },
    matLocalInvert: {
      get: function get() {
        return this._matLocalInvert;
      },
      set: function set(e) {
        this._matLocalInvert = e;
      }
    },
    zFactor: {
      get: function get() {
        return this._zFactor;
      },
      set: function set(e) {
        this._zFactor = e;
      }
    },
    polygon: {
      get: function get() {
        return this._geoPolygon;
      },
      set: function set(e) {
        this._geoPolygon = e;
      }
    },
    sampleGap: {
      get: function get() {
        return this._sampleGap;
      },
      set: function set(e) {
        this._sampleGap = e;
      }
    },
    fillVolume: {
      get: function get() {
        return this._fillVolume;
      }
    },
    cutVolume: {
      get: function get() {
        return this._cutVolume;
      }
    }
  }), h.prototype.apply = function () {
    var L = this;
    return this.taskProcessor.scheduleTask({
      geoPolygon: this._geoPolygon,
      sampleGap: this._sampleGap,
      matLocalInvert: this.matLocalInvert,
      vertice: this._vertice,
      matLocal: this.matLocal,
      zFactor: this._zFactor
    }).then(function (e) {
      for (var t, o, i, r, n = e.hightFill, a = e.hightCut, s = e.pointsLine, c = e.pointsLine1, l = C.fromBytes(255, 0, 0, 255), p = C.fromBytes(0, 255, 0, 255), u = "attribute vec3 position3DHigh;attribute vec3 position3DLow; attribute vec4 color;         attribute float batchId;      varying vec4 v_color;                                  void main()                                           {                                                        vec4 p = czm_computePosition();                       v_color =color;                                       p = czm_modelViewProjectionRelativeToEye * p;         gl_Position = p;                                      gl_PointSize=10.0;                                 } ", h = "varying vec4 v_color;     void main()               {                            gl_FragColor = v_color;}", m = [], v = [], _ = [], g = [], y = [], f = [], d = 0; d < s.length; d++) {
        m.push(s[d].x, s[d].y, s[d].z), _.push(l.red, l.green, l.blue, l.alpha), v.push(d);
      }

      for (d = 0; d < c.length; d++) {
        g.push(c[d].x, c[d].y, c[d].z), f.push(p.red, p.green, p.blue, p.alpha), y.push(d);
      }

      1 < m.length && (t = new S({
        attributes: {
          position: new b({
            componentDatatype: I.DOUBLE,
            componentsPerAttribute: 3,
            values: new Float64Array(m)
          }),
          color: new b({
            componentDatatype: I.FLOAT,
            componentsPerAttribute: 4,
            values: new Float32Array(_)
          })
        },
        indices: new Int32Array(v),
        primitiveType: E.LINES,
        boundingSphere: P.fromVertices(m)
      }), o = new F({
        renderState: {
          blending: T.PRE_MULTIPLIED_ALPHA_BLEND,
          depthTest: {
            enabled: !0
          },
          depthMask: !0
        },
        fragmentShaderSource: h,
        vertexShaderSource: u
      }), L.primitive = L._viewer.scene.primitives.add(new V({
        geometryInstances: new A({
          geometry: t
        }),
        appearance: o,
        asynchronous: !1
      }))), 1 < g.length && (i = new S({
        attributes: {
          position: new b({
            componentDatatype: I.DOUBLE,
            componentsPerAttribute: 3,
            values: new Float64Array(g)
          }),
          color: new b({
            componentDatatype: I.FLOAT,
            componentsPerAttribute: 4,
            values: new Float32Array(f)
          })
        },
        indices: new Int32Array(y),
        primitiveType: E.LINES,
        boundingSphere: P.fromVertices(g)
      }), r = new F({
        renderState: {
          blending: T.PRE_MULTIPLIED_ALPHA_BLEND,
          depthTest: {
            enabled: !0
          },
          depthMask: !0
        },
        fragmentShaderSource: h,
        vertexShaderSource: u
      }), L.primitive1 = L._viewer.scene.primitives.add(new V({
        geometryInstances: new A({
          geometry: i
        }),
        appearance: r,
        asynchronous: !1
      })));

      for (var w = e.areaSample, d = 0; d < n.length; d++) {
        L._fillVolume += w * n[d];
      }

      for (d = 0; d < a.length; d++) {
        L._cutVolume += w * a[d];
      }

      L._completeEvent.raiseEvent();
    });
  }, h.prototype.clear = function () {
    this._viewer.scene.primitives.remove(this.primitive), this._viewer.scene.primitives.remove(this.primitive1), this._fillVolume = 0, this._cutVolume = 0;
  }, h;
});