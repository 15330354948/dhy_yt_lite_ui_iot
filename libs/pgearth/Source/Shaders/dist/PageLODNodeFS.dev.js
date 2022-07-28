"use strict";

define(function () {
  "use strict";

  return "uniform sampler2D u_texture;\nuniform vec4 u_bgColor;\nuniform float u_transparency;\nuniform bool u_bRGB;\nuniform bool u_useClip;\nuniform vec4 u_clipBounds;\nuniform sampler2D u_clipTexture;\nuniform bool u_usePit;\nuniform vec4 u_pitBounds;\nuniform sampler2D u_pitTexture;\nuniform bool u_useColorTable;\nuniform sampler2D u_colorTexture;\nuniform vec2 u_colorRange;\nuniform int u_displayMode;\nuniform bool u_useOverlay;\nuniform vec4 u_overlayBounds;\nuniform sampler2D u_overlayTexture;\nvarying vec2 v_textureCoordinates;\nvarying vec3 v_vertex;\nbool isPointInBound(vec2 point, vec4 bounds) {\nreturn (point.x>bounds.x&&point.x<bounds.z&&point.y<bounds.y&&point.y>bounds.w);\n}\nvoid main()\n{\nif (u_useClip && true) {\nif (!isPointInBound(v_vertex.xy, u_clipBounds)) {\ndiscard;\nreturn;\n}\nvec2 clipTexCoord = vec2((v_vertex.x-u_clipBounds.x)/(u_clipBounds.z-u_clipBounds.x),\n(v_vertex.y-u_clipBounds.w)/(u_clipBounds.y-u_clipBounds.w));\nif (texture2D(u_clipTexture, clipTexCoord).x < 0.5) {\ndiscard;\nreturn;\n}\n}\nif (u_usePit && isPointInBound(v_vertex.xy, u_pitBounds)) {\nvec2 pitTexCoord = vec2((v_vertex.x-u_pitBounds.x)/(u_pitBounds.z-u_pitBounds.x),\n(v_vertex.y-u_pitBounds.w)/(u_pitBounds.y-u_pitBounds.w));\nif (texture2D(u_pitTexture, pitTexCoord).x > 0.5) {\ndiscard;\nreturn;\n}\n}\nvec4 heightmapColor = vec4(1.0);\nif (u_useColorTable && u_displayMode > 0) {\nheightmapColor = texture2D(u_colorTexture, vec2((v_vertex.z-u_colorRange.x)/(u_colorRange.y-u_colorRange.x), 0.5));\nif (u_displayMode == 1) {\ngl_FragColor = heightmapColor;\nreturn;\n}\n}\nvec4 color = vec4(u_transparency);\nif (u_bgColor.r < 1.0 || u_bgColor.g < 1.0 || u_bgColor.b < 1.0 || u_bgColor.a < 1.0) {\ncolor.rgb = u_bgColor.rgb;\n} else {\nif (u_bRGB) {\ncolor.rgb = texture2D(u_texture, v_textureCoordinates).rgb;\n} else {\ncolor.rgb = texture2D(u_texture, v_textureCoordinates).bgr;\n}\n}\nif (u_useOverlay && isPointInBound(v_vertex.xy, u_overlayBounds)) {\nvec2 overlayTexCoord = vec2((v_vertex.x-u_overlayBounds.x)/(u_overlayBounds.z-u_overlayBounds.x),\n(v_vertex.y-u_overlayBounds.w)/(u_overlayBounds.y-u_overlayBounds.w));\nvec4 overlayColor = texture2D(u_overlayTexture, overlayTexCoord);\ncolor.rgb = overlayColor.rgb * overlayColor.a + color.rgb * (1.0-overlayColor.a);\n}\ngl_FragColor = color * heightmapColor;\n}\n";
});