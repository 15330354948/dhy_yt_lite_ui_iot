"use strict";

define(function () {
  return "uniform sampler2D colorTexture;\nvarying vec2 v_textureCoordinates;\nfloat hash(float x){\nreturn fract(sin(x*133.3)*13.13);\n}\nvoid main(void){\nfloat time = czm_frameNumber / 60.0;\nvec2 resolution = czm_viewport.zw;\nvec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\nvec3 c=vec3(.6,.7,.8);\nfloat a=-.4;\nfloat si=sin(a),co=cos(a);\nuv*=mat2(co,-si,si,co);\nuv*=length(uv+vec2(0,4.9))*.3+1.;\nfloat v=1.-sin(hash(floor(uv.x*100.))*2.);\nfloat b=clamp(abs(sin(20.*time*v+uv.y*(5./(2.+v))))-.95,0.,1.)*20.;\nc*=v*b;\ngl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(c,1), 0.5);\n}\n";
});