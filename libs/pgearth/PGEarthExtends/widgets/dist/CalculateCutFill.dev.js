"use strict";

define(["../../Source/Core/BoundingSphere", "../../Source/Core/Cartesian2", "../../Source/Core/Cartesian3", "../../Source/Core/Cartographic", "../../Source/Core/Color", "../../Source/Core/ComponentDatatype", "../../Source/Core/defineProperties", "../../Source/Core/Event", "../../Source/Core/Geometry", "../../Source/Core/GeometryAttribute", "../../Source/Core/GeometryInstance", "../../Source/Core/IntersectionTests", "../../Source/Core/Math", "../../Source/Core/Matrix4", "../../Source/Core/PrimitiveType", "../../Source/Core/Ray", "../../Source/Core/TaskProcessor", "../../Source/Scene/Appearance", "../../Source/Scene/BlendingState", "../../Source/Scene/HorizontalOrigin", "../../Source/Scene/Primitive", "../../Source/Scene/VerticalOrigin"], function (e, t, o, r, i, n, a, c, s, u, l, p, h, m, v, _, g, S, y, f, d, w) {
  "use strict";

  function L(e) {
    this._viewer = e, this._zFactor = 0, this._geoPolygon = void 0, this._sampleGap = 1, this._percentage = 0, this._fillVolume = 0, this._cutVolume = 0, this._vertice = void 0, this._matLocal = new m(), this._matLocalInvert = new m(), this._completeEvent = new c(), this.primitive = null, this.primitive1 = null, this.taskProcessor = new g("computeCutFill", Number.POSITIVE_INFINITY);
  }

  return a(L.prototype, {
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
  }), L.prototype.apply = function () {
    var t = this;
    return this.taskProcessor.scheduleTask({
      geoPolygon: this._geoPolygon,
      sampleGap: this._sampleGap,
      matLocalInvert: this.matLocalInvert,
      vertice: this._vertice,
      matLocal: this.matLocal,
      zFactor: this._zFactor
    }).then(function (o) {
      for (var r = o.hightFill, a = o.hightCut, c = o.pointsLine, p = o.pointsLine1, h = i.fromBytes(255, 0, 0, 255), m = i.fromBytes(0, 255, 0, 255), _ = "attribute vec3 position3DHigh;attribute vec3 position3DLow; attribute vec4 color;         attribute float batchId;      varying vec4 v_color;                                  void main()                                           {                                                        vec4 p = czm_computePosition();                       v_color =color;                                       p = czm_modelViewProjectionRelativeToEye * p;         gl_Position = p;                                      gl_PointSize=10.0;                                 } ", g = "varying vec4 v_color;     void main()               {                            gl_FragColor = v_color;}", f = [], w = [], L = [], P = [], C = [], I = [], b = 0; b < c.length; b++) {
        f.push(c[b].x, c[b].y, c[b].z), L.push(h.red, h.green, h.blue, h.alpha), w.push(b);
      }

      for (b = 0; b < p.length; b++) {
        P.push(p[b].x, p[b].y, p[b].z), I.push(m.red, m.green, m.blue, m.alpha), C.push(b);
      }

      if (f.length > 1) {
        var A = new s({
          attributes: {
            position: new u({
              componentDatatype: n.DOUBLE,
              componentsPerAttribute: 3,
              values: new Float64Array(f)
            }),
            color: new u({
              componentDatatype: n.FLOAT,
              componentsPerAttribute: 4,
              values: new Float32Array(L)
            })
          },
          indices: new Int32Array(w),
          primitiveType: v.LINES,
          boundingSphere: e.fromVertices(f)
        }),
            E = new S({
          renderState: {
            blending: y.PRE_MULTIPLIED_ALPHA_BLEND,
            depthTest: {
              enabled: !0
            },
            depthMask: !0
          },
          fragmentShaderSource: g,
          vertexShaderSource: _
        });
        t.primitive = t._viewer.scene.primitives.add(new d({
          geometryInstances: new l({
            geometry: A
          }),
          appearance: E,
          asynchronous: !1
        }));
      }

      if (P.length > 1) {
        var F = new s({
          attributes: {
            position: new u({
              componentDatatype: n.DOUBLE,
              componentsPerAttribute: 3,
              values: new Float64Array(P)
            }),
            color: new u({
              componentDatatype: n.FLOAT,
              componentsPerAttribute: 4,
              values: new Float32Array(I)
            })
          },
          indices: new Int32Array(C),
          primitiveType: v.LINES,
          boundingSphere: e.fromVertices(P)
        }),
            T = new S({
          renderState: {
            blending: y.PRE_MULTIPLIED_ALPHA_BLEND,
            depthTest: {
              enabled: !0
            },
            depthMask: !0
          },
          fragmentShaderSource: g,
          vertexShaderSource: _
        });
        t.primitive1 = t._viewer.scene.primitives.add(new d({
          geometryInstances: new l({
            geometry: F
          }),
          appearance: T,
          asynchronous: !1
        }));
      }

      var V = o.areaSample;

      for (b = 0; b < r.length; b++) {
        t._fillVolume += V * r[b];
      }

      for (b = 0; b < a.length; b++) {
        t._cutVolume += V * a[b];
      }

      t._completeEvent.raiseEvent();
    });
  }, L.prototype.clear = function () {
    this._viewer.scene.primitives.remove(this.primitive), this._viewer.scene.primitives.remove(this.primitive1), this._fillVolume = 0, this._cutVolume = 0;
  }, L;
});