"use strict";

define(["../../Core/GeometryInstance", "../../Core/PolygonGeometry", "../../Core/PolygonHierarchy", "../../Core/Cartesian3", "../../Scene/Material", "../../Scene/Primitive", "../../Scene/EllipsoidSurfaceAppearance", "../../Core/destroyObject", "../../Core/Color"], function (b, g, j, d, f, h, c, i, a) {
  function e(k) {
    this._viewer = k.viewer;
    this._positions = k.positions;
    this._url = k.normalMapUrl || require.toUrl("./Source/Assets/Textures/waterNormals.jpg");
    this._frequency = k.frequency || 1000;
    this._animationSpeed = k.animationSpeed || 0.01;
    this._amplitude = k.amplitude || 10;
    this._extrudedHeight = k.extrudedHeight || 0;
    this._fs = this.getFS();
    this.color = k.color || a.fromCssColorString("#5cd8ec");
  }

  e.prototype.build = function () {
    this._geometry = this._createGeometry();
    this._appearance = this._createAppearence();
    this.primitive = this._viewer.scene.primitives.add(new h({
      "allowPicking": ![],
      "geometryInstances": new b({
        "geometry": this._geometry
      }),
      "appearance": this._appearance,
      "asynchronous": ![]
    }));
  };

  e.prototype._createAppearence = function () {
    return new c({
      "material": new f({
        "fabric": {
          "type": "Water",
          "uniforms": {
            "normalMap": this._url,
            "frequency": this._frequency,
            "animationSpeed": this._animationSpeed,
            "amplitude": this._amplitude,
            baseWaterColor: this.color
          }
        }
      }),
      "fragmentShaderSource": this._fs
    });
  };

  e.prototype._createGeometry = function (m, l) {
    var k = this._positions;

    if (this._positions[0] instanceof d) {} else {
      k = d.fromDegreesArrayHeights(this._positions);
    }

    return new g({
      "polygonHierarchy": new j(k),
      "extrudedHeight": this._extrudedHeight,
      "perPositionHeight": true
    });
  };

  e.prototype.getFS = function () {
    return "varying vec3 v_positionMC;\n" + "                    varying vec3 v_positionEC;\n" + "                    varying vec2 v_st;\n" + "                    \n" + "                    void main()\n" + "                    {\n" + "                        czm_materialInput materialInput;\n" + "                        vec3 normalEC = normalize(czm_normal3D * czm_geodeticSurfaceNormal(v_positionMC, vec3(0.0), vec3(1.0)));\n" + "                    #ifdef FACE_FORWARD\n" + "                        normalEC = faceforward(normalEC, vec3(0.0, 0.0, 1.0), -normalEC);\n" + "                    #endif\n" + "                        materialInput.s = v_st.s;\n" + "                        materialInput.st = v_st;\n" + "                        materialInput.str = vec3(v_st, 0.0);\n" + "                        materialInput.normalEC = normalEC;\n" + "                        materialInput.tangentToEyeMatrix = czm_eastNorthUpToEyeCoordinates(v_positionMC, materialInput.normalEC);\n" + "                        vec3 positionToEyeEC = -v_positionEC;\n" + "                        materialInput.positionToEyeEC = positionToEyeEC;\n" + "                        czm_material material = czm_getMaterial(materialInput);\n" + "                    #ifdef FLAT\n" + "                        gl_FragColor = vec4(material.diffuse + material.emission, material.alpha);\n" + "                    #else\n" + "                        gl_FragColor = czm_phong(normalize(positionToEyeEC), material);\n" + "                        gl_FragColor.a = 0.5;\n" + "                    #endif\n" + "                    }";
  };

  e.prototype.updateDegreesPosition = function (m, l) {
    if (this.primitive != null) {
      this._viewer.scene.primitives.remove(this.primitive);

      if (m && m.length < 3) {
        return;
      }

      var k = this._createGeometry(m, l ? l : 0);

      this.primitive = this._viewer.scene.primitives.add(new h({
        "allowPicking": ![],
        "geometryInstances": new b({
          "geometry": k
        }),
        "appearance": this._appearance,
        "asynchronous": ![]
      }));
    }
  };

  e.prototype.destroy = function () {
    this.primitive && this._viewer.scene.primitives.remove(this.primitive);
    return i(this);
  };

  return e;
});