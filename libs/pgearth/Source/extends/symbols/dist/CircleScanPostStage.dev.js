"use strict";

define(["../../Core/Cartographic", "../../Core/Cartesian3", "../../Core/Cartesian4", "../../Core/Matrix4", "../../Scene/PostProcessStage"], function (f, a, g, d, b) {
  function e() {
    var h = "\n                    uniform sampler2D colorTexture;\n                    uniform sampler2D depthTexture;\n                    varying vec2 v_textureCoordinates;\n                    uniform vec4 u_scanCenterEC;\n                    uniform vec3 u_scanPlaneNormalEC;\n                    uniform float u_radius;\n                    uniform vec4 u_scanColor;\n                    \n                    vec4 toEye(in vec2 uv,in float depth)\n                    {\n                                vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));\n                                vec4 posIncamera = czm_inverseProjection * vec4(xy,depth,1.0);\n                                posIncamera = posIncamera/posIncamera.w;\n                                return posIncamera;\n                    }\n                    \n                    vec3 pointProjectOnPlane(in vec3 planeNormal,in vec3 planeOrigin,in vec3 point)\n                    {\n                                vec3 v01 = point - planeOrigin;\n                                float d = dot(planeNormal,v01);\n                                return (point-planeNormal * d);\n                    }\n                    float getDepth(in vec4 depth)\n                    {\n                                float z_window = czm_unpackDepth(depth);\n                                z_window = czm_reverseLogDepth(z_window);\n                                float n_range = czm_depthRange.near;\n                                float f_range = czm_depthRange.far;\n                                return (2.0 * z_window - n_range - f_range)/(f_range-n_range);\n                    } \n                    void main()\n                    {\n                                gl_FragColor = texture2D(colorTexture,v_textureCoordinates);\n                                float depth = getDepth(texture2D(depthTexture,v_textureCoordinates));\n                                vec4 viewPos = toEye(v_textureCoordinates,depth);\n                                vec3 prjOnPlane = pointProjectOnPlane(u_scanPlaneNormalEC.xyz,u_scanCenterEC.xyz,viewPos.xyz);\n                                float dis = length(prjOnPlane.xyz - u_scanCenterEC.xyz);\n                                if(dis<u_radius)\n                                {\n                                    float f = 1.0-abs(u_radius - dis )/ u_radius;\n                                    f = pow(f,4.0);\n                                    gl_FragColor = mix(gl_FragColor,u_scanColor,f);\n                                }\n                    } \n ";
    return h;
  }

  function c(p, m, q, r, n) {
    var s = f.toCartesian(m);
    var j = new g(s.x, s.y, s.z, 1);
    var o = new f(m.longitude, m.latitude, m.height + 500);
    var l = f.toCartesian(o);
    var t = new g(l.x, l.y, l.z, 1);
    var v = new Date().getTime();
    var h = new g();
    var i = new g();
    var u = new a();
    var k = new b({
      fragmentShader: e(),
      uniforms: {
        u_scanCenterEC: function u_scanCenterEC() {
          var w = d.multiplyByVector(p.camera._viewMatrix, j, h);
          return w;
        },
        u_scanPlaneNormalEC: function u_scanPlaneNormalEC() {
          var w = d.multiplyByVector(p.camera._viewMatrix, j, h);
          var x = d.multiplyByVector(p.camera._viewMatrix, t, i);
          u.x = x.x - w.x;
          u.y = x.y - w.y;
          u.z = x.z - w.z;
          a.normalize(u, u);
          return u;
        },
        u_radius: function u_radius() {
          return q * ((new Date().getTime() - v) % n) / n;
        },
        u_scanColor: r
      }
    });
    p.scene.postProcessStages.add(k);
    return k;
  }

  return c;
});