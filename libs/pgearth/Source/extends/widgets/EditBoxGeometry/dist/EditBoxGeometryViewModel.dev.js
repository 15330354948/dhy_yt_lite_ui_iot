"use strict";

define(["../../../Core/Cartesian2", "../../../Core/Cartesian3", "../../../Core/Quaternion", "../../../Core/defined", "../../../Core/destroyObject", "../../../Core/defineProperties", "../../../Core/ScreenSpaceEventType", "../../../Core/ScreenSpaceEventHandler", "../../../Core/Ellipsoid", "../../../Core/Math", "../../../Core/Cartographic", "../../../Core/Matrix4", "../../../Core/Matrix3", "../../../Core/BoundingSphere", "../../../Core/PixelFormat", "../../../Core/Color", "../../../Core/Transforms", "../../../Core/GeometryInstance", "../../../Core/HeadingPitchRoll", "../../../Core/BoxGeometry", "../../../Core/CylinderGeometry", "../../../Core/BoundingRectangle", "../../../Renderer/Pass", "../../../Renderer/RenderState", "../../../Scene/Material", "../../../Scene/Primitive", "../../../Scene/MaterialAppearance", "../../../Scene/DebugModelMatrixPrimitive", "../../../DataSources/CallbackProperty", "../../../ThirdParty/knockout", "require", "../../core/CommonUtil"], function (re, de, O, se, e, t, o, r, d, ae, le, y, v, _, u, b, ce, h, pe, m, j, _e, g, x, f, w, D, s, l, a, c, ue) {
  "use strict";

  var p = 0,
      P = 1,
      E = 2,
      S = 3,
      be = 4,
      he = [];

  function i(e, t) {
    this._viewer = e;
    var i = this._viewer.scene.canvas;
    this._scene = e.scene, this._canvas = i, this._primitive = void 0, this._primitiveBoundingSpherePosition = void 0, this._pickObject = null, this._ellipsoid = null, this._editAction = be, this.editObject = null, this._position = null, this._rotation = null, this._scale = null, this.showTooltip = !0, this.rotateLMZ = null, this._tooltip = t.tooltip, this._axisPrimitive = new s({
      length: length
    }), this._cylinderPrimitive = void 0, this._bigBoxPrimitive = void 0, this._bigBoxEntity = {
      dimensions: de.ZERO,
      position: de.ZERO,
      orientation: O.IDENTITY
    }, this._showAxis = !1, this._showCylinder = !1, this._showBigBox = !1, this._screenSpaceEventHandler, function (ne) {
      var i = ne._scene,
          e = ne._screenSpaceEventHandler = new r(i.canvas);
      e.setInputAction(function (e) {
        if (se(ne.editObject)) {
          var t = ne._scene.pick(e.position);

          if (se(t)) {
            if (se(t.id) && ("mainBox" === t.id || "cylinder" === t.id || "littleBox" === t.id._name || "ring" === t.id._name)) return;
            if (ne._primitive = se(t.collection) ? t.collection : t.primitive, se(t.primitive) && se(t.primitive._boundingSphere)) switch (ne._editAction) {
              case p:
                z(ne), ne._showCylinder = !0, ne._showAxis = !0;
                break;

              case P:
                z(ne), T(ne), ne._showAxis = !0, ne._showCylinder = !1;
                break;

              case E:
                z(ne), L(ne), ne._showAxis = !0, ne._showCylinder = !1;
                break;

              case S:
                z(ne), L(ne), T(ne), ne._showCylinder = !0, ne._showAxis = !0;
                break;

              case be:
                z(ne), ne._showAxis = !1, ne._showCylinder = !1;
            }
          } else z(ne), ne._showAxis = !1, ne._showCylinder = !1, ne._editAction = be;
        }
      }, o.LEFT_CLICK), e.setInputAction(function (e) {
        var o;
        ne._pickObject = ne._scene.pick(e.position), se(ne.editObject) && se(ne._pickObject) && se(ne._pickObject.id) && ("mainBox" === ne._pickObject.id ? (i._screenSpaceCameraController.enableInputs = !1, o = ne._viewer.scene.pickPosition(e.position), function (e) {
          var t = de.magnitude(o),
              i = new de();
          i.x = i.y = i.z = t;
          var n = new d();
          e._ellipsoid = d.fromCartesian3(i, n);
        }(ne)) : "cylinder" !== ne._pickObject.id && "littleBox" !== ne._pickObject.id._name && "ring" !== ne._pickObject.id._name || (i._screenSpaceCameraController.enableInputs = !1));
      }, o.LEFT_DOWN), e.setInputAction(function (e) {
        if (se(ne.editObject)) {
          for (var t = 0; t < he.length; t++) {
            he[t].show = !0;
          }

          ne._pickObject = null, i._screenSpaceCameraController.enableInputs = !0;
        }
      }, o.LEFT_UP);
      var oe = 0;
      e.setInputAction(function (e) {
        if (se(ne._editObject) && ne._editAction !== be) {
          var t,
              i,
              n,
              o,
              r,
              d,
              s = ne._scene.pick(e.endPosition);

          if (ne.showTooltip && void 0 !== s ? void 0 !== s.id && ("cylinder" === s.id ? ne._tooltip.showAt(e.endPosition, "升降") : "mainBox" === s.id ? ne._tooltip.showAt(e.endPosition, "平移") : "ring" === s.id._name ? ne._tooltip.showAt(e.endPosition, "旋转") : "littleBox" === s.id._name && ne._tooltip.showAt(e.endPosition, "缩放")) : ne._tooltip.setVisible(!1), se(ne._pickObject) && se(ne._pickObject.id)) if ("mainBox" === ne._pickObject.id) {
            var a = ne._viewer.camera.pickEllipsoid(e.startPosition, ne._ellipsoid),
                l = ne._viewer.camera.pickEllipsoid(e.endPosition, ne._ellipsoid);

            if (se(l)) {
              var c,
                  p,
                  _,
                  u = (Z = l, K = (Y = ne)._ellipsoid.cartesianToCartographic(a), $ = ae.toDegrees(K.longitude), J = ae.toDegrees(K.latitude), X = Y._ellipsoid.cartesianToCartographic(Z), ee = ae.toDegrees(X.longitude) - $, te = ae.toDegrees(X.latitude) - J, (ie = []).push(ee), ie.push(te), ie);

              for (null !== ne.editObject && "modelLOD" === ne.editObject._type ? (y = parseFloat(ne.editObject._position.x), v = parseFloat(ne.editObject._position.y), j = parseFloat(ne.editObject._position.z), y += u[0], v += u[1], ne.position = new de(y, v, j), ne._axisPrimitive.modelMatrix = ne.editObject.getLocalViewMatrix(), ne.showTooltip && ne._tooltip.showAt(e.endPosition, null, "经度:" + y.toFixed(10), "纬度:" + v.toFixed(10), "高度:" + j.toFixed(2))) : null !== ne.editObject && "pageLOD" === ne.editObject._type ? (y = parseFloat(ne.editObject._position.x), v = parseFloat(ne.editObject._position.y), j = parseFloat(ne.editObject._position.z), y += u[0], v += u[1], ne.position = new de(y, v, j), ne.showTooltip && ne._tooltip.showAt(e.endPosition, null, "经度:" + y, "纬度:" + v, "高度:" + j)) : null !== ne.editObject && "PGEarth3DTileset" === ne.editObject._type ? ((h = ne.position.clone()).x += u[0], h.y += u[1], ne.position = h, ne.showTooltip && ne._tooltip.showAt(e.endPosition, null, "经度:" + h.x.toFixed(10), "纬度:" + h.y.toFixed(10), "高度:" + h.z.toFixed(2))) : (h = ne._primitive.id.position._value, c = le.fromCartesian(h), p = ae.toDegrees(c.longitude), _ = ae.toDegrees(c.latitude), ne._primitive.id.position._value = de.fromDegrees(p + u[0], _ + u[1], c.height)), d = 0; d < he.length; d++) {
                he[d].show = !1;
              }
            }
          } else if ("cylinder" === ne._pickObject.id) {
            for (d = 0; d < he.length; d++) {
              he[d].show = !1;
            }

            if (null === ne.editObject || "modelLOD" !== ne.editObject._type && "pageLOD" !== ne.editObject._type) {
              if (null !== ne.editObject && "PGEarth3DTileset" === ne.editObject._type) {
                var b = ne.editObject._root._boundingVolume.boundingVolume.center,
                    h = ne.position.clone(),
                    m = me(ne, b);
                if (h.z -= m * (e.endPosition.y - e.startPosition.y), h.z < -1e3 && (h.z = -1e3), !isFinite(h.z)) return;
                console.log(h), ne.position = h, ne.showTooltip && ne._tooltip.showAt(e.endPosition, null, "经度:" + h.x.toFixed(10), "纬度:" + h.y.toFixed(10), "高度:" + h.z.toFixed(2));
              } else {
                h = ne._primitive.id.position._value.clone();
                var O = le.fromCartesian(h),
                    y = ae.toDegrees(O.longitude),
                    v = ae.toDegrees(O.latitude),
                    j = O.height,
                    g = de.fromDegrees(y, v, j);
                m = me(ne, g), ne._primitive.id.position._value.z = ne._primitive.id.position._value.z - m * (e.endPosition.y - e.startPosition.y);
              }
            } else {
              if (y = parseFloat(ne.editObject._position.x), v = parseFloat(ne.editObject._position.y), j = parseFloat(ne.editObject._position.z), "modelLOD" === ne.editObject._type ? g = de.fromDegrees(y, v, j) : "pageLOD" === ne.editObject._type && (g = ne.editObject.tileBoundingSphere.center.clone()), (j -= (m = me(ne, g)) * (e.endPosition.y - e.startPosition.y)) < -1e3 && (j = -1e3), !isFinite(j)) return;
              ne.position = new de(y, v, j), ne.showTooltip && ne._tooltip.showAt(e.endPosition, null, "经度:" + y.toFixed(10), "纬度:" + v.toFixed(10), "高度:" + j.toFixed(2));
            }
          } else if ("ring" === ne._pickObject.id._name) {
            for (d = 0; d < he.length; d++) {
              "ring" !== he[d]._name && (he[d].show = !1);
            }

            if (null === ne.editObject || "modelLOD" !== ne.editObject._type && "PGEarth3DTileset" !== ne.editObject._type) {
              e.startPosition.x < e.endPosition.x ? --oe : e.startPosition.x > e.endPosition.x && (oe += 1), 360 <= oe ? oe -= 360 : oe < 0 && (oe += 360);
              var x = ce.headingPitchRollQuaternion(ne._primitive.id.position._value, new pe(ae.toRadians(oe), 0, 0));

              for (ne._primitive.id.orientation._value = x, d = 0; d < he.length; d++) {
                he[d].orientation = x;
              }
            } else {
              var f = je(ne._bigBoxEntity),
                  w = ye(ve(Oe(-1, -1, -1, ne, f)), ve(Oe(1, -1, -1, ne, f)), ve(Oe(1, 1, -1, ne, f)), ve(Oe(-1, 1, -1, ne, f)), ve(Oe(-1, -1, 1, ne, f)), ve(Oe(1, -1, 1, ne, f)), ve(Oe(1, 1, 1, ne, f)), ve(Oe(-1, 1, 1, ne, f))),
                  D = de.fromDegrees(w.x, w.y, w.z);
              (o = new _e()).x = 0, o.y = 0, o.width = ne._scene._context.drawingBufferWidth, o.height = ne._scene._context.drawingBufferHeight, n = ue.project(D, ne._scene.camera, o), (t = new de()).x = e.endPosition.x - n.x, t.y = document.body.clientHeight - e.endPosition.y - n.y, t.z = 0, (i = new de()).x = e.startPosition.x - n.x, i.y = document.body.clientHeight - e.startPosition.y - n.y, i.z = 0;
              var P = new de(),
                  E = de.cross(t, i, P),
                  S = de.dot(t, i),
                  T = 180 / Math.PI * Math.acos(S / Math.sqrt((t.x * t.x + t.y * t.y) * (i.x * i.x + i.y * i.y))),
                  L = ne.rotation.clone();
              "modelLOD" === ne.editObject._type ? (E.z < 0 ? L.z += T : L.z -= T, L.z < 0 ? L.z += 360 : 360 < L.z && (L.z -= 360), ne.rotation = L, ne.showTooltip && ne._tooltip.showAt(e.endPosition, "正北夹角:" + (180 * ne.editObject.getRotate().z / Math.PI).toFixed(2))) : "PGEarth3DTileset" === ne.editObject._type && (L = ne.rotation.clone(), E.z < 0 ? L.z += T : L.z -= T, L.z < 0 ? L.z += 360 : 360 < L.z && (L.z -= 360), ne.rotation = L, ne.showTooltip && ne._tooltip.showAt(e.endPosition, "正北夹角:" + ne._rotation.z.toFixed(2)));
            }
          } else if ("littleBox" === ne._pickObject.id._name) {
            for (d = 0; d < he.length; d++) {
              "littleBox" !== he[d]._name && (he[d].show = !1);
            }

            var z = ne._viewer.scene.globe.ellipsoid,
                B = ne._viewer.camera.pickEllipsoid(e.startPosition, z);

            if (void 0 === B) return;
            B.z = 0;

            var C,
                G,
                A,
                M,
                F,
                I,
                R,
                N,
                k,
                H,
                W,
                V,
                q,
                U,
                Q = ne._viewer.camera.pickEllipsoid(e.endPosition, z);

            if (void 0 === Q) return;
            Q.z = 0, null === ne.editObject || "modelLOD" !== ne.editObject._type && "PGEarth3DTileset" !== ne.editObject._type ? ((C = ne._primitive.id.position._value.clone()).z = 0, (G = de.distance(C, B)) < (A = de.distance(C, Q)) ? ne._primitive.id._model.scale += .1 : A < G && (ne._primitive.id._model.scale -= .1)) : e.endPosition.x === e.startPosition.x && e.endPosition.y === e.startPosition.y || ("modelLOD" === ne.editObject._type ? (M = ne.editObject._position.x, F = ne.editObject._position.y, I = ne.editObject._position.z, R = de.fromDegrees(M, F, I)) : "PGEarth3DTileset" === ne.editObject._type && (R = ne.editObject._root._boundingVolume.boundingVolume.center), (o = new _e()).x = 0, o.y = 0, o.width = ne._scene._context.drawingBufferWidth, o.height = ne._scene._context.drawingBufferHeight, n = ue.project(R, ne._scene.camera, o), N = ne._pickObject.id.position._callback(), k = ue.project(N, ne._scene.camera, o), H = re.distance(new re(k.x, window.screen.height - k.y), new re(n.x, window.screen.height - n.y)), V = (W = de.distance(R, N)) / H, (t = new de()).x = e.startPosition.x - n.x, t.y = e.startPosition.y - o.height + n.y, t.z = 0, q = Math.sqrt(t.x * t.x + t.y * t.y), (i = new de()).x = e.endPosition.x - n.x, i.y = e.endPosition.y - o.height + n.y, i.z = 0, U = (W + V * (Math.sqrt(i.x * i.x + i.y * i.y) - q)) / W, "modelLOD" === ne.editObject._type ? (r = ne.editObject.getScale().clone(), 0 < U && (de.multiplyByScalar(r, U, r), ne.scale = r, ne.showTooltip && ne._tooltip.showAt(e.endPosition, "缩放比:" + U.toFixed(4)))) : "PGEarth3DTileset" === ne.editObject._type && (r = ne.scale.clone(), de.multiplyByScalar(r, U, r), ne.scale = r, ne.showTooltip && ne._tooltip.showAt(e.endPosition, "缩放比:" + U.toFixed(4))));
          }
        }

        var Y, Z, K, $, J, X, ee, te, ie;
      }, o.MOUSE_MOVE);
    }(this), this._scene.globe.depthTestAgainstTerrain = !0, e.scene.primitives.add(this);
    var m = this;
    a.track(this, ["editerVisible", "editObject"]);
    var n = a.observable();
    a.defineProperty(this, "editerVisible", {
      get: function get() {
        return n();
      },
      set: function set(e) {
        n(e);
      }
    }), this._editObject = a.getObservable(this, "editObject").subscribe(function (e) {
      var t, i, n, o, r, d, s, a, l, c, p, _, u, b, h;

      m._editAction = be, z(m), m._showAxis = !1, m._showCylinder = !1, m._tooltip.setVisible(!1), se(e) && ("modelLOD" === e._type ? (m._position = e._position, m._rotation = new de(0, 0, e.getRotate().z), m._scale = new de(e.getScale().x, e.getScale().x, e.getScale().x), m.rotateLMZ = e.getRotate().z) : "pageLOD" === e._type ? (m._position = e.origin, m._rotation = new de(0, 0, 0), m._scale = new de(1, 1, 1)) : "PGEarth3DTileset" === e._type && (t = new de(), i = e._root.transform, y.getTranslation(i, t), t.equals({
        x: 0,
        y: 0,
        z: 0
      }) && (t = e._root.boundingSphere.center), n = le.fromCartesian(t), o = ae.toDegrees(n.longitude), r = ae.toDegrees(n.latitude), d = n.height, m._position = de.fromElements(o, r, d), s = new y(), y.equals(e.modelMatrix, y.IDENTITY) ? s = e.modelMatrix.clone() : -180 <= t.x && t.x <= 180 && -90 <= t.y && t.y <= 90 ? le.fromCartesian(de.fromDegrees(t.x, t.y, t.z)) : le.fromCartesian(t), a = new de(), y.getScale(e.modelMatrix, a), l = y.fromScale(a), y.inverse(l, l), y.multiply(l, s, s), c = new v(), p = new O(), _ = new pe(), y.getRotation(s, c), O.fromRotationMatrix(c, p), pe.fromQuaternion(p, _), u = -_.heading * (180 / Math.PI), u = Math.abs(u) < 1e-6 ? 0 : u, b = _.roll * (180 / Math.PI), b = Math.abs(b) < 1e-6 ? 0 : b, h = -_.pitch * (180 / Math.PI), u < 0 && (u += 360), b < 0 && (b += 360), (h = Math.abs(h) < 1e-6 ? 0 : h) < 0 && (h += 360), m._rotation = new de(b, h, u), m._scale = a));
    }), a.defineProperty(this, "moveModelTooltip", function () {
      return "移动模型";
    }), a.defineProperty(this, "rotateModelTooltip", function () {
      return "旋转模型";
    }), a.defineProperty(this, "zoomModelTooltip", function () {
      return "缩放模型";
    }), a.defineProperty(this, "allModelTooltip", function () {
      return "编辑模型";
    });
  }

  function n(e, t, i, n) {
    var o = new de(),
        o = -180 <= n.x && n.x <= 180 && -90 <= n.y && n.y <= 90 ? de.fromDegrees(n.x, n.y, n.z) : n,
        r = e.editObject.boundingSphere,
        d = -180 <= r.center.x && r.center.x <= 180 && -90 <= r.center.y && r.center.y <= 90 ? le.fromCartesian(de.fromDegrees(r.center.x, r.center.y, r.center.z)) : le.fromCartesian(r.center),
        s = de.fromRadians(d.longitude, d.latitude, d.height),
        a = de.subtract(o, s, new de());
    e.editObject.modelMatrix = y.fromTranslation(a);
  }

  function me(e, t) {
    if (t) {
      var i = new _e();
      i.x = 0, i.y = 0, i.width = e._scene._context.drawingBufferWidth, i.height = e._scene._context.drawingBufferHeight;
      var n = le.fromCartesian(t),
          o = le.fromRadians(n.longitude, n.latitude, n.height - 1),
          r = ue.project(t, e._scene.camera, i),
          d = ue.project(le.toCartesian(o), e._scene.camera, i);
      return 1 / (r.y - d.y);
    }
  }

  function T(r) {
    var e;
    if ("function" == typeof define && define.amd && !define.amd.toUrlUndefined && "function" == typeof c.toUrl) e = c.toUrl("./");else for (var t = /((?:.*\/)|^)EditBoxGeometry[\w-]*\.js(?:\W|$)/i, i = document.getElementsByTagName("script"), n = 0, o = i.length; n < o; ++n) {
      var d = i[n].getAttribute("src"),
          s = t.exec(d);

      if (null !== s) {
        e = s[1];
        break;
      }
    }

    var a = r._viewer.entities.add({
      name: "ring",
      position: new l(function () {
        if (null != r.editObject && "modelLOD" === r.editObject._type) {
          var e = parseFloat(r.editObject._position.x),
              t = parseFloat(r.editObject._position.y),
              i = parseFloat(r.editObject._position.z),
              n = r.editObject.rootNode.children[0].boundingBox.center.z * r.editObject.scale.z;
          return de.fromDegrees(e, t, i + n);
        }

        if (null == r.editObject || "pageLOD" !== r.editObject._type) {
          if (null != r.editObject && "PGEarth3DTileset" === r.editObject._type) return r.editObject.boundingSphere.center;

          if (se(r._primitive._boundingSphere)) {
            var o = A(r);
            return de.fromDegrees(o[0], o[1], o[2]);
          }
        }
      }, !1),
      orientation: new l(function () {
        return null == r.editObject || "modelLOD" !== r.editObject._type && "PGEarth3DTileset" !== r.editObject._type ? r._primitive.id.orientation._value : C(r);
      }, !1),
      model: {
        uri: e + "Ring.gltf",
        scale: new l(function () {
          if (null != r.editObject && "modelLOD" === r.editObject._type) return r.editObject.rootNode.children[0].bdSphere.radius * r.editObject.scale.x;
          if (null != r.editObject && "PGEarth3DTileset" === r.editObject._type) return r.editObject.boundingSphere.radius;

          if (se(r._primitive._boundingSphere)) {
            var e = r._primitive._boundingSphere.clone(),
                t = r._primitive.modelMatrix.clone();

            return _.transform(e, t, e), 1.4 * e.radius * r._primitive.scale;
          }
        }, !1)
      }
    });

    he.push(a);
  }

  function L(t) {
    var e = t._viewer.entities.add({
      position: new l(function () {
        var e = je(t._bigBoxEntity);
        return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? null != t.editObject && "pageLOD" === t.editObject._type || !se(t._primitive._boundingSphere) ? void 0 : G(-1, -1, -1, t, e) : Oe(-1, -1, -1, t, e);
      }, !1),
      orientation: new l(function () {
        return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? t._primitive.id.orientation._value : C(t);
      }, !1),
      name: "littleBox",
      box: {
        dimensions: new l(function () {
          return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? null != t.editObject && "pageLOD" === t.editObject._type || !se(t._primitive._boundingSphere) ? void 0 : new de(t._primitive._boundingSphere.radius * t._primitive.scale / 5, t._primitive._boundingSphere.radius * t._primitive.scale / 5, t._primitive._boundingSphere.radius * t._primitive.scale / 5) : B(t);
        }, !1),
        material: b.SPRINGGREEN.withAlpha(.8),
        outline: !1,
        outlineColor: b.WHITE
      }
    });

    he.push(e);

    var i = t._viewer.entities.add({
      position: new l(function () {
        var e = je(t._bigBoxEntity);
        return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? null != t.editObject && "pageLOD" === t.editObject._type || !se(t._primitive._boundingSphere) ? void 0 : G(1, -1, -1, t, e) : Oe(1, -1, -1, t, e);
      }, !1),
      orientation: new l(function () {
        return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? t._primitive.id.orientation._value : C(t);
      }, !1),
      name: "littleBox",
      box: {
        dimensions: new l(function () {
          return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? null != t.editObject && "pageLOD" === t.editObject._type || !se(t._primitive._boundingSphere) ? void 0 : new de(t._primitive._boundingSphere.radius * t._primitive.scale / 5, t._primitive._boundingSphere.radius * t._primitive.scale / 5, t._primitive._boundingSphere.radius * t._primitive.scale / 5) : B(t);
        }, !1),
        material: b.SPRINGGREEN.withAlpha(.8),
        outline: !1,
        outlineColor: b.WHITE
      }
    });

    he.push(i);

    var n = t._viewer.entities.add({
      position: new l(function () {
        var e = je(t._bigBoxEntity);
        return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? null != t.editObject && "pageLOD" === t.editObject._type || !se(t._primitive._boundingSphere) ? void 0 : G(1, 1, -1, t, e) : Oe(1, 1, -1, t, e);
      }, !1),
      orientation: new l(function () {
        return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? t._primitive.id.orientation._value : C(t);
      }, !1),
      name: "littleBox",
      box: {
        dimensions: new l(function () {
          return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? null != t.editObject && "pageLOD" === t.editObject._type || !se(t._primitive._boundingSphere) ? void 0 : new de(t._primitive._boundingSphere.radius * t._primitive.scale / 5, t._primitive._boundingSphere.radius * t._primitive.scale / 5, t._primitive._boundingSphere.radius * t._primitive.scale / 5) : B(t);
        }, !1),
        material: b.SPRINGGREEN.withAlpha(.8),
        outline: !1,
        outlineColor: b.WHITE
      }
    });

    he.push(n);

    var o = t._viewer.entities.add({
      position: new l(function () {
        var e = je(t._bigBoxEntity);
        return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? null != t.editObject && "pageLOD" === t.editObject._type || !se(t._primitive._boundingSphere) ? void 0 : G(-1, 1, -1, t, e) : Oe(-1, 1, -1, t, e);
      }, !1),
      orientation: new l(function () {
        return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? t._primitive.id.orientation._value : C(t);
      }, !1),
      name: "littleBox",
      box: {
        dimensions: new l(function () {
          return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? null != t.editObject && "pageLOD" === t.editObject._type || !se(t._primitive._boundingSphere) ? void 0 : new de(t._primitive._boundingSphere.radius * t._primitive.scale / 5, t._primitive._boundingSphere.radius * t._primitive.scale / 5, t._primitive._boundingSphere.radius * t._primitive.scale / 5) : B(t);
        }, !1),
        material: b.SPRINGGREEN.withAlpha(.8),
        outline: !1,
        outlineColor: b.WHITE
      }
    });

    he.push(o);

    var r = t._viewer.entities.add({
      position: new l(function () {
        var e = je(t._bigBoxEntity);
        return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? null != t.editObject && "pageLOD" === t.editObject._type || !se(t._primitive._boundingSphere) ? void 0 : G(-1, -1, 1, t, e) : Oe(-1, -1, 1, t, e);
      }, !1),
      orientation: new l(function () {
        return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? t._primitive.id.orientation._value : C(t);
      }, !1),
      name: "littleBox",
      box: {
        dimensions: new l(function () {
          return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? null != t.editObject && "pageLOD" === t.editObject._type || !se(t._primitive._boundingSphere) ? void 0 : new de(t._primitive._boundingSphere.radius * t._primitive.scale / 5, t._primitive._boundingSphere.radius * t._primitive.scale / 5, t._primitive._boundingSphere.radius * t._primitive.scale / 5) : B(t);
        }, !1),
        material: b.SPRINGGREEN.withAlpha(.8),
        outline: !1,
        outlineColor: b.WHITE
      }
    });

    he.push(r);

    var d = t._viewer.entities.add({
      position: new l(function () {
        var e = je(t._bigBoxEntity);
        return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? null != t.editObject && "pageLOD" === t.editObject._type || !se(t._primitive._boundingSphere) ? void 0 : G(1, -1, 1, t, e) : Oe(1, -1, 1, t, e);
      }, !1),
      orientation: new l(function () {
        return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? t._primitive.id.orientation._value : C(t);
      }, !1),
      name: "littleBox",
      box: {
        dimensions: new l(function () {
          return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? null != t.editObject && "pageLOD" === t.editObject._type || !se(t._primitive._boundingSphere) ? void 0 : new de(t._primitive._boundingSphere.radius * t._primitive.scale / 5, t._primitive._boundingSphere.radius * t._primitive.scale / 5, t._primitive._boundingSphere.radius * t._primitive.scale / 5) : B(t);
        }, !1),
        material: b.SPRINGGREEN.withAlpha(.8),
        outline: !1,
        outlineColor: b.WHITE
      }
    });

    he.push(d);

    var s = t._viewer.entities.add({
      position: new l(function () {
        var e = je(t._bigBoxEntity);
        return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? null != t.editObject && "pageLOD" === t.editObject._type || !se(t._primitive._boundingSphere) ? void 0 : G(1, 1, 1, t, e) : Oe(1, 1, 1, t, e);
      }, !1),
      orientation: new l(function () {
        return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? t._primitive.id.orientation._value : C(t);
      }, !1),
      name: "littleBox",
      box: {
        dimensions: new l(function () {
          return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? null != t.editObject && "pageLOD" === t.editObject._type || !se(t._primitive._boundingSphere) ? void 0 : new de(t._primitive._boundingSphere.radius * t._primitive.scale / 5, t._primitive._boundingSphere.radius * t._primitive.scale / 5, t._primitive._boundingSphere.radius * t._primitive.scale / 5) : B(t);
        }, !1),
        material: b.SPRINGGREEN.withAlpha(.8),
        outline: !1,
        outlineColor: b.WHITE
      }
    });

    he.push(s);

    var a = t._viewer.entities.add({
      position: new l(function () {
        var e = je(t._bigBoxEntity);
        return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? null != t.editObject && "pageLOD" === t.editObject._type || !se(t._primitive._boundingSphere) ? void 0 : G(-1, 1, 1, t, e) : Oe(-1, 1, 1, t, e);
      }, !1),
      orientation: new l(function () {
        return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? t._primitive.id.orientation._value : C(t);
      }, !1),
      name: "littleBox",
      box: {
        dimensions: new l(function () {
          return null == t.editObject || "modelLOD" !== t.editObject._type && "PGEarth3DTileset" !== t.editObject._type ? null != t.editObject && "pageLOD" === t.editObject._type || !se(t._primitive._boundingSphere) ? void 0 : new de(t._primitive._boundingSphere.radius * t._primitive.scale / 5, t._primitive._boundingSphere.radius * t._primitive.scale / 5, t._primitive._boundingSphere.radius * t._primitive.scale / 5) : B(t);
        }, !1),
        material: b.SPRINGGREEN.withAlpha(.8),
        outline: !1,
        outlineColor: b.WHITE
      }
    });

    he.push(a);
  }

  function z(e) {
    for (var t = he.length, i = 0; i < t; i++) {
      e._viewer.entities.removeById(he[i].id);
    }

    he = [];
  }

  function B(e) {
    var t,
        i = new de();

    if ("modelLOD" !== e.editObject._type) {
      if ("PGEarth3DTileset" !== e.editObject._type) return;
      y.getScale(e.editObject.modelMatrix, i);
      var n = e._bigBoxEntity.dimensions,
          o = F(n.x, n.y, n.z);
      return new de(.25 * o, .25 * o, .25 * o);
    }

    t = e.editObject.rootNode.children[0].boundingBox, i = de.clone(e.editObject.scale);
    var r = t.minimum,
        d = t.maximum,
        s = F((d.x - r.x) * i.x, (d.y - r.y) * i.y, (d.z - r.z) * i.z);
    return new de(s / 4, s / 4, s / 4);
  }

  function C(e) {
    var t = new de(),
        i = new pe();

    if ("modelLOD" === e.editObject._type) {
      t = de.fromDegrees(parseFloat(e.editObject._position.x), parseFloat(e.editObject._position.y), parseFloat(e.editObject._position.z));
      var n = -e.editObject.rotate.z,
          o = -e.editObject.rotate.y,
          r = e.editObject.rotate.x,
          i = new pe(n, o, r);
    } else if ("PGEarth3DTileset" === e.editObject._type) {
      var d = new v(),
          s = new O(),
          a = y.multiply(e.editObject.modelMatrix, e.editObject._root.transform, new y()),
          l = y.getScale(e.editObject.modelMatrix, new de()),
          c = y.fromScale(l);
      return y.inverse(c, c), y.multiply(c, a, a), y.getRotation(a, d), O.fromRotationMatrix(d, s), s;
    }

    return ce.headingPitchRollQuaternion(t, i);
  }

  function Oe(e, t, i, n, o) {
    var r,
        d,
        s,
        a,
        l,
        c = new _();
    return "modelLOD" === n.editObject._type ? (d = (r = n.editObject.rootNode.children[0].boundingBox).minimum, s = r.maximum, c.center.x = e * (s.x - d.x) * n.editObject.scale.x / 2, c.center.y = t * (s.y - d.y) * n.editObject.scale.y / 2, c.center.z = i * (s.z - d.z) * n.editObject.scale.z / 2, c.radius = n.editObject.rootNode.children[0].bdSphere.radius) : "pageLOD" === n.editObject._type ? (d = (r = n.editObject.boundingBox).minimum, s = r.maximum, c.center.x = e * (s.x - d.x) / 2, c.center.y = t * (s.y - d.y) / 2, c.center.z = i * (s.z - d.z) / 2, c.radius = n.editObject.boundingSphere.radius) : "PGEarth3DTileset" === n.editObject._type && (a = n._bigBoxEntity.dimensions, l = new de(), y.getScale(n.editObject.modelMatrix, l), c.center.x = e * a.x / 2, c.center.y = t * a.y / 2, c.center.z = i * a.z / 2, c.radius = n.editObject.boundingSphere.radius), _.transform(c, o, c), c.center;
  }

  function G(e, t, i, n, o) {
    var r = n._primitive._boundingSphere.clone(),
        d = n._primitive.modelMatrix.clone();

    _.transform(r, d, r);

    var s = new _();
    return s.center.x = e * r.radius * n._primitive.scale, s.center.y = t * r.radius * n._primitive.scale, s.center.z = i * r.radius * n._primitive.scale, s.radius = r.radius, _.transform(s, o, s), s.center;
  }

  function A(e) {
    var t = [],
        i = new de();
    i.x = e._primitive.id.position._value.x, i.y = e._primitive.id.position._value.y, i.z = e._primitive.id.position._value.z;
    var n = le.fromCartesian(i),
        o = ae.toDegrees(n.longitude);
    t.push(o);
    var r = ae.toDegrees(n.latitude);
    t.push(r);

    var d = e._primitive._boundingSphere.clone(),
        s = e._primitive.modelMatrix.clone();

    _.transform(d, s, d);

    var a = le.fromCartesian(d.center).height;
    return t.push(a), t.push(1.5 * d.radius * e._primitive.scale), t;
  }

  function M(e) {
    var t;
    if ("modelLOD" === e.editObject._type) t = e.editObject.rootNode.children[0].boundingBox;else if ("pageLOD" === e.editObject._type) t = e.editObject.boundingBox;else if ("PGEarth3DTileset" === e.editObject._type) {
      var i = new de(),
          n = e.editObject._root._boundingVolume.boundingVolume.radius;
      return [(i = new de(+n, +n, 800)).x, i.y, i.z];
    }
    var o = t.minimum,
        r = t.maximum,
        d = [];
    return d.push(r.x - o.x), d.push(r.y - o.y), d.push(r.z - o.z), d;
  }

  function F(e, t, i) {
    return e < t ? e < i ? e : i : t < i ? t : i;
  }

  function I(e, t, i) {
    return t < e ? i < e ? e : i : i < t ? t : i;
  }

  function ye(e, t, i, n, o, r, d, s) {
    var a = (e.x + t.x + i.x + n.x + o.x + r.x + d.x + s.x) / 8,
        l = (e.y + t.y + i.y + n.y + o.y + r.y + d.y + s.y) / 8,
        c = (e.z + t.z + i.z + n.z + o.z + r.z + d.z + s.z) / 8;
    return new de(a, l, c);
  }

  function ve(e) {
    var t = le.fromCartesian(e),
        i = ae.toDegrees(t.longitude),
        n = ae.toDegrees(t.latitude),
        o = t.height;
    return new de(i, n, o);
  }

  function je(e) {
    var t = new y(),
        i = e.position;

    if (se(i)) {
      var n,
          o = e.orientation;
      return t = se(o) && !o.equals({
        x: 0,
        y: 0,
        z: 0,
        w: 1
      }) ? (n = v.fromQuaternion(o), y.fromRotationTranslation(n, i, t)) : ce.eastNorthUpToFixedFrame(i, void 0, t);
    }
  }

  return t(i.prototype, {
    scene: {
      get: function get() {
        return this._scene;
      }
    },
    showAxis: {
      get: function get() {
        return this._axisPrimitive.show;
      },
      set: function set(e) {
        this._axisPrimitive.show = e;
      }
    },
    position: {
      get: function get() {
        return this._position;
      },
      set: function set(e) {
        var t, i;
        de.equals(this._position, e) || (i = e, null !== (t = this).editObject && ("modelLOD" === t.editObject._type ? t.editObject.setPosition(i.x, i.y, i.z) : "pageLOD" === t.editObject._type ? t.editObject.origin = i : "PGEarth3DTileset" === t.editObject._type && n(t, t._rotation, t._scale, i)), this._position = e);
      }
    },
    rotation: {
      get: function get() {
        return this._rotation;
      },
      set: function set(e) {
        var t;
        de.equals(this._rotation, e) || (null !== (t = this).editObject && ("modelLOD" === t.editObject._type ? t.editObject.setRotate(e.x, e.y, e.z) : "PGEarth3DTileset" === t.editObject._type && n(t, 0, t._scale, t._position)), this._rotation = e);
      }
    },
    scale: {
      get: function get() {
        return this._scale;
      },
      set: function set(e) {
        var t;
        de.equals(this._scale, e) || (null !== (t = this).editObject && ("modelLOD" === t.editObject._type ? t.editObject.setScale(e.x, e.y, e.z) : "PGEarth3DTileset" === t.editObject._type && n(t, t._rotation, 0, t._position)), this._scale = e);
      }
    }
  }), i.prototype.move = function () {
    null === this.editObject || "modelLOD" !== this.editObject._type && "pageLOD" !== this.editObject._type && "PGEarth3DTileset" !== this.editObject._type || (z(this), this._showCylinder = !0, this._showAxis = !0), this._editAction = p;
  }, i.prototype.rotate = function () {
    null === this.editObject || "modelLOD" !== this.editObject._type && "PGEarth3DTileset" !== this.editObject._type || (z(this), T(this), this._showAxis = !0, this._showCylinder = !1), this._editAction = P;
  }, i.prototype.zoom = function () {
    null === this.editObject || "modelLOD" !== this.editObject._type && "PGEarth3DTileset" !== this.editObject._type || (z(this), L(this), this._showAxis = !0, this._showCylinder = !1), this._editAction = E;
  }, i.prototype.all = function () {
    null !== this.editObject && (z(this), this._showCylinder = !0, this._showAxis = !0, "modelLOD" !== this.editObject._type && "PGEarth3DTileset" !== this.editObject._type || (T(this), L(this))), this._editAction = S;
  }, i.prototype.cancel = function () {
    null !== this.editObject && (z(this), this._showAxis = !1, this._showCylinder = !1, this._editAction = be);
  }, i.prototype.update = function (e) {
    if (se(this.editObject)) {
      if (e.passes.pick) return se(this._bigBoxPrimitive) && (this._bigBoxPrimitive.update(e), e.commandList[e.commandList.length - 2].pass = g.OPAQUE, e.commandList[e.commandList.length - 1].pass = g.OPAQUE), void (se(this._cylinderPrimitive) && this._cylinderPrimitive.update(e));
      this._bigBoxEntity.dimensions = function (e) {
        if (null != e.editObject && "modelLOD" === e.editObject._type) {
          if (se(e.editObject.rootNode)) {
            var t = M(e);
            return new de(t[0] * e.editObject.scale.x, t[1] * e.editObject.scale.y, t[2] * e.editObject.scale.z);
          }
        } else {
          if (null != e.editObject && "pageLOD" === e.editObject._type) {
            t = M(e);
            return new de(t[0], t[1], t[2]);
          }

          if (null != e.editObject && "PGEarth3DTileset" === e.editObject._type) {
            t = M(e);
            return new de(t[0], t[1], t[2]);
          }

          if (se(e._primitive._boundingSphere)) {
            var i = e._primitive._boundingSphere.clone(),
                n = e._primitive.modelMatrix.clone();

            return _.transform(i, n, i), new de(2 * i.radius * e._primitive.scale, 2 * i.radius * e._primitive.scale, 2 * i.radius * e._primitive.scale);
          }
        }
      }(this), this._bigBoxEntity.position = function (e) {
        if (null != e.editObject && "modelLOD" === e.editObject._type) {
          if (se(e.editObject)) {
            var t = parseFloat(e.editObject._position.x),
                i = parseFloat(e.editObject._position.y),
                n = parseFloat(e.editObject._position.z),
                o = e.editObject.rootNode.children[0].boundingBox.center.z * e.editObject.scale.z;
            return de.fromDegrees(t, i, n + o);
          }
        } else {
          if (null != e.editObject && "pageLOD" === e.editObject._type) return e.editObject.tileBoundingSphere.center.clone();
          if (null != e.editObject && "PGEarth3DTileset" === e.editObject._type) return e.editObject._root._boundingVolume.boundingVolume.center.clone();

          if (se(e._primitive._boundingSphere)) {
            var r = A(e);
            return de.fromDegrees(r[0], r[1], r[2]);
          }
        }
      }(this), this._bigBoxEntity.orientation = null == (p = this).editObject || "modelLOD" !== p.editObject._type && "PGEarth3DTileset" !== p.editObject._type ? null != p.editObject && "pageLOD" === p.editObject._type ? void 0 : p._primitive.id.orientation._value : C(p);
      var t = je(this._bigBoxEntity);
      this._bigBoxPrimitive = this._bigBoxPrimitive && this._bigBoxPrimitive.destroy();
      var i = new m.fromDimensions({
        dimensions: this._bigBoxEntity.dimensions,
        vertexFormat: u.POSITION_ONLY
      }),
          n = f.fromType(f.ColorType);
      n.uniforms.color = b.WHITE.withAlpha(.3);
      var o = new D({
        material: n,
        translucent: n.isTranslucent(),
        closed: !1
      }),
          r = f.fromType(f.ColorType);
      r.uniforms.color = b.GRAY.withAlpha(.3);
      var d,
          s,
          a,
          l,
          c = new D({
        material: r,
        translucent: r.isTranslucent(),
        closed: !1
      });
      this._bigBoxPrimitive = new w({
        geometryInstances: new h({
          geometry: i,
          modelMatrix: t,
          id: "mainBox"
        }),
        appearance: o,
        depthFailAppearance: c,
        asynchronous: !1
      }), this._bigBoxPrimitive.update(e), se(this._axisPrimitive) && this._showAxis && (d = 1.2 * I(this._bigBoxEntity.dimensions.x, this._bigBoxEntity.dimensions.y, this._bigBoxEntity.dimensions.z), this._axisPrimitive.length = d, this._axisPrimitive.modelMatrix = t, this._axisPrimitive.update(e), e.commandList[e.commandList.length - 1].renderState = x.fromCache({
        depthTest: {
          enabled: !1
        }
      })), this._showCylinder && (this._cylinderPrimitive = this._cylinderPrimitive && this._cylinderPrimitive.destroy(), s = new j({
        length: function (e) {
          if (null != e.editObject && "modelLOD" === e.editObject._type) {
            var t = e.editObject.rootNode.children[0].boundingBox,
                i = t.minimum,
                n = t.maximum;
            return I((n.x - i.x) * e.editObject.scale.x, (n.y - i.y) * e.editObject.scale.y, (n.z - i.z) * e.editObject.scale.z) / 5;
          }

          if (null != e.editObject && "PGEarth3DTileset" === e.editObject._type) {
            var o = e._bigBoxEntity.dimensions,
                r = new de();
            return y.getScale(e.editObject.modelMatrix, r), I(o.x, o.y, o.z) / 5;
          }

          if (null != e.editObject && "pageLOD" === e.editObject._type) return I((o = M(e))[0], o[1], o[2]) / 10;

          if (se(e._primitive._boundingSphere)) {
            var d = e._primitive._boundingSphere.clone(),
                s = e._primitive.modelMatrix.clone();

            return _.transform(d, s, d), .3 * d.radius * e._primitive.scale;
          }
        }(this),
        topRadius: 0,
        bottomRadius: function (e) {
          if (null != e.editObject && "modelLOD" === e.editObject._type) {
            var t = e.editObject.rootNode.children[0].boundingBox,
                i = t.minimum,
                n = t.maximum;
            return I((n.x - i.x) * e.editObject.scale.x, (n.y - i.y) * e.editObject.scale.y, (n.z - i.z) * e.editObject.scale.z) / 10;
          }

          if (null != e.editObject && "pageLOD" === e.editObject._type) return I((o = M(e))[0], o[1], o[2]) / 20;

          if (null != e.editObject && "PGEarth3DTileset" === e.editObject._type) {
            var o = e._bigBoxEntity.dimensions,
                r = new de();
            return y.getScale(e.editObject.modelMatrix, r), I(o.x, o.y, o.z) / 10;
          }

          if (se(e._primitive._boundingSphere)) {
            var d = e._primitive._boundingSphere.clone(),
                s = e._primitive.modelMatrix.clone();

            return _.transform(d, s, d), .2 * d.radius * e._primitive.scale;
          }
        }(this),
        vertexFormat: u.POSITION_ONLY
      }), (a = f.fromType(f.ColorType)).uniforms.color = b.YELLOW.withAlpha(.8), l = new D({
        material: a,
        translucent: a.isTranslucent(),
        renderState: {
          depthTest: {
            enabled: !1
          }
        },
        closed: !1
      }), this._cylinderPrimitive = new w({
        geometryInstances: new h({
          geometry: s,
          modelMatrix: ce.eastNorthUpToFixedFrame(function (e) {
            var t = je(e._bigBoxEntity);

            if (null != e.editObject && ("modelLOD" === e.editObject._type || "pageLOD" === e.editObject._type || "PGEarth3DTileset" === e.editObject._type)) {
              var i = ve(Oe(-1, -1, -1, e, t)),
                  n = ve(Oe(1, -1, -1, e, t)),
                  o = ve(Oe(1, 1, -1, e, t)),
                  r = ve(Oe(-1, 1, -1, e, t)),
                  d = ve(Oe(-1, -1, 1, e, t)),
                  s = ve(Oe(1, -1, 1, e, t)),
                  a = ve(Oe(1, 1, 1, e, t)),
                  l = ve(Oe(-1, 1, 1, e, t)),
                  c = ye(i, n, o, r, d, s, a, l);

              if ("modelLOD" === e.editObject._type) {
                var p = M(e),
                    _ = Math.sqrt(p[0] * p[0] + p[1] * p[1]) / 4;

                return de.fromDegrees(c.x, c.y, l.z + 1.5 * _ * e.editObject.scale.z);
              }

              if ("PGEarth3DTileset" === e.editObject._type) {
                p = M(e), _ = Math.sqrt(p[0] * p[0] + p[1] * p[1]) / 4;
                return de.fromDegrees(c.x, c.y, l.z + 1.5 * _);
              }

              p = M(e), _ = Math.sqrt(p[0] * p[0] + p[1] * p[1]) / 4;
              return de.fromDegrees(c.x, c.y, l.z + _);
            }

            if (se(e._primitive._boundingSphere)) {
              var u = A(e);
              return de.fromDegrees(u[0], u[1], u[2] + u[3]);
            }
          }(this)),
          id: "cylinder"
        }),
        appearance: l,
        asynchronous: !1
      }), this._cylinderPrimitive.update(e));
    }

    var p;
  }, i.prototype.isDestroyed = function () {
    return !1;
  }, i.prototype.destroy = function () {
    return this._primitive.destroy(), this._primitiveBoundingSpherePosition.destroy(), this._ellipsoid.destroy(), this._removePostRenderEvent(), this._editObject.dispose(), this._screenSpaceEventHandler.destroy(), this._axisPrimitive.destroy(), this._cylinderPrimitive = this._cylinderPrimitive && this._cylinderPrimitive.destroy(), this._bigBoxPrimitive = this._bigBoxPrimitive && this._bigBoxPrimitive.destroy(), this._scene.primitives.remove(this), e(this);
  }, i;
});