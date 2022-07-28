"use strict";

define(["../../Source/DataSources/GeoJsonDataSource", "../../Source/Core/defined", "../../Source/Core/defaultValue", "../../Source/Core/DeveloperError", "../../Source/Core/createGuid", "../_Color"], function (e, o, t, r, n, i) {
  return function (t) {
    if (!o(t.url)) throw new r("url is required");
    t.definitionExpression && (t.url += "&CQL_FILTER=" + encodeURI(t.definitionExpression)), t.fill = i(t.color || "#fff").withAlpha(t.opacity || 1), t.stroke = i(t.outline && t.outline.color || "#FF0000"), t.strokeWidth = t.outline && t.outline.width || 2;
    var p = new e.load(t.url, t);
    return p.id = t.id || n(), p.featureReduction = t.featureReduction || !1, p.popupEnabled = t.popupEnabled, t.popupTemplate && p.then(function (e) {
      var o = e.entities._entities._array;

      for (var r in o) {
        o[r].popupEnabled = t.popupEnabled, o[r].popupTemplate = {
          title: t.popupTemplate.title,
          content: t.popupTemplate.content,
          actions: t.popupTemplate.actions
        };
      }
    }), p;
  };
});