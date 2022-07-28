"use strict";

define(["../../Core/Check", "../../Core/defaultValue", "../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../ThirdParty/knockout", "../getElement", "../InspectorShared", "./PGEarth3DTilesInspectorViewModel"], function (P, s, r, e, t, M, B, O, _) {
  "use strict";

  function i(e, t) {
    P.defined("container", e), P.typeOf.object("scene", t), e = B(e);
    var i = document.createElement("div"),
        a = document.createElement("div");
    a.setAttribute("data-bind", "visible: performance");
    var n = new _(t, a);
    this._viewModel = n, this._container = e, this._element = i;
    var r = document.createElement("div");
    r.textContent = "3D Tiles Inspector", r.className = "pgEarth-pgEarthInspector-button", r.setAttribute("data-bind", "click: toggleInspector"), i.appendChild(r), i.className = "pgEarth-pgEarthInspector pgEarth-3DTilesInspector", i.setAttribute("data-bind", 'css: { "pgEarth-pgEarthInspector-visible" : inspectorVisible, "pgEarth-pgEarthInspector-hidden" : !inspectorVisible}'), e.appendChild(i);
    var d = document.createElement("div");
    (this._panel = d).className = "pgEarth-pgEarthInspector-dropDown", i.appendChild(d);
    var l = O.createSection,
        p = O.createCheckbox,
        o = l(d, "Tileset", "tilesetVisible", "toggleTileset"),
        s = l(d, "Display", "displayVisible", "toggleDisplay"),
        c = l(d, "Update", "updateVisible", "toggleUpdate"),
        h = l(d, "Logging", "loggingVisible", "toggleLogging"),
        m = l(d, "Tile Debug Labels", "tileDebugLabelsVisible", "toggleTileDebugLabels"),
        u = l(d, "Style", "styleVisible", "toggleStyle"),
        g = l(d, "Optimization", "optimizationVisible", "toggleOptimization"),
        C = document.createElement("div");
    C.className = "field-group";
    var E = document.createElement("label");
    E.className = "field-label", E.appendChild(document.createTextNode("Properties: "));
    var b = document.createElement("div");
    b.setAttribute("data-bind", "text: properties"), C.appendChild(E), C.appendChild(b), o.appendChild(C), o.appendChild(z("togglePickTileset", "Pick Tileset", "pickActive")), o.appendChild(z("trimTilesCache", "Trim Tiles Cache")), o.appendChild(p("Enable Picking", "picking")), s.appendChild(p("Colorize", "colorize")), s.appendChild(p("Wireframe", "wireframe")), s.appendChild(p("Bounding Volumes", "showBoundingVolumes")), s.appendChild(p("Content Volumes", "showContentBoundingVolumes")), s.appendChild(p("Request Volumes", "showRequestVolumes")), s.appendChild(p("Point Cloud Shading", "pointCloudShading"));
    var v = document.createElement("div");
    v.setAttribute("data-bind", "visible: pointCloudShading"), v.appendChild(R("geometricErrorScale", 0, 2, .01, "Geometric Error Scale")), v.appendChild(R("maximumAttenuation", 0, 32, 1, "Maximum Attenuation")), v.appendChild(R("baseResolution", 0, 1, .01, "Base Resolution")), v.appendChild(p("Eye Dome Lighting (EDL)", "eyeDomeLighting")), s.appendChild(v);
    var S = document.createElement("div");
    S.setAttribute("data-bind", "visible: eyeDomeLighting"), S.appendChild(R("eyeDomeLightingStrength", 0, 2, .1, "EDL Strength")), S.appendChild(R("eyeDomeLightingRadius", 0, 4, .1, "EDL Radius")), v.appendChild(S), c.appendChild(p("Freeze Frame", "freezeFrame")), c.appendChild(p("Dynamic Screen Space Error", "dynamicScreenSpaceError"));
    var y = document.createElement("div");
    y.appendChild(R("maximumScreenSpaceError", 0, 128, 1, "Maximum Screen Space Error")), c.appendChild(y);
    var D = document.createElement("div");
    D.setAttribute("data-bind", "visible: dynamicScreenSpaceError"), D.appendChild(R("dynamicScreenSpaceErrorDensitySliderValue", 0, 1, .005, "Screen Space Error Density", "dynamicScreenSpaceErrorDensity")), D.appendChild(R("dynamicScreenSpaceErrorFactor", 1, 10, .1, "Screen Space Error Factor")), c.appendChild(D), h.appendChild(p("Performance", "performance")), h.appendChild(a), h.appendChild(p("Statistics", "showStatistics"));
    var k = document.createElement("div");
    k.className = "pgEarth-3dTilesInspector-statistics", k.setAttribute("data-bind", "html: statisticsText, visible: showStatistics"), h.appendChild(k), h.appendChild(p("Pick Statistics", "showPickStatistics"));
    var f = document.createElement("div");
    f.className = "pgEarth-3dTilesInspector-statistics", f.setAttribute("data-bind", "html: pickStatisticsText, visible: showPickStatistics"), h.appendChild(f);
    var T = document.createElement("div");
    u.appendChild(T), T.appendChild(document.createTextNode("Color Blend Mode: "));
    var w = document.createElement("select");
    w.setAttribute("data-bind", 'options: colorBlendModes, optionsText: "text", optionsValue: "value", value: colorBlendMode'), T.appendChild(w);
    var L = document.createElement("textarea");
    L.setAttribute("data-bind", "textInput: styleString, event: { keydown: styleEditorKeyPress }"), T.className = "pgEarth-pgEarthInspector-styleEditor", T.appendChild(L);
    var x = z("compileStyle", "Compile (Ctrl+Enter)");
    T.appendChild(x);
    var V = document.createElement("div");
    V.className = "pgEarth-pgEarthInspector-error", V.setAttribute("data-bind", "text: editorError"), T.appendChild(V), m.appendChild(p("Show Picked Only", "showOnlyPickedTileDebugLabel")), m.appendChild(p("Geometric Error", "showGeometricError")), m.appendChild(p("Rendering Statistics", "showRenderingStatistics")), m.appendChild(p("Memory Usage (MB)", "showMemoryUsage")), m.appendChild(p("Url", "showUrl")), g.appendChild(p("Skip Tile LODs", "skipLevelOfDetail"));
    var A = document.createElement("div");
    A.appendChild(R("skipScreenSpaceErrorFactor", 1, 50, 1, "Skip SSE Factor")), g.appendChild(A);
    var I = document.createElement("div");
    I.appendChild(R("baseScreenSpaceError", 0, 4096, 1, "SSE before skipping LOD")), g.appendChild(I);
    var N = document.createElement("div");
    N.appendChild(R("skipLevels", 0, 10, 1, "Min. levels to skip")), g.appendChild(N), g.appendChild(p("Load only tiles that meet the max SSE.", "immediatelyLoadDesiredLevelOfDetail")), g.appendChild(p("Load siblings of visible tiles", "loadSiblings")), M.applyBindings(n, i);
  }

  function R(e, t, i, a, n, r) {
    r = s(r, e);
    var d = document.createElement("input");
    d.setAttribute("data-bind", "value: " + r), d.type = "number";
    var l = document.createElement("input");
    l.type = "range", l.min = t, l.max = i, l.step = a, l.setAttribute("data-bind", 'valueUpdate: "input", value: ' + e);
    var p = document.createElement("div");
    p.appendChild(l);
    var o = document.createElement("div");
    return o.className = "pgEarth-pgEarthInspector-slider", o.appendChild(document.createTextNode(n)), o.appendChild(d), o.appendChild(p), o;
  }

  function z(e, t, i) {
    var a = document.createElement("button");
    a.type = "button", a.textContent = t, a.className = "pgEarth-pgEarthInspector-pickButton";
    var n = "click: " + e;
    return r(i) && (n += ', css: {"pgEarth-pgEarthInspector-pickButtonHighlight" : ' + i + "}"), a.setAttribute("data-bind", n), a;
  }

  return e(i.prototype, {
    container: {
      get: function get() {
        return this._container;
      }
    },
    viewModel: {
      get: function get() {
        return this._viewModel;
      }
    }
  }), i.prototype.isDestroyed = function () {
    return !1;
  }, i.prototype.destroy = function () {
    return M.cleanNode(this._element), this._container.removeChild(this._element), this.viewModel.destroy(), t(this);
  }, i;
});