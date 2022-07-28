"use strict";

define(["../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/DeveloperError", "../../ThirdParty/knockout", "../getElement", "../InspectorShared", "./PGEarthInspectorViewModel"], function (j, e, t, L, R, U, z, J) {
  "use strict";

  function a(e, t) {
    if (!j(e)) throw new L("container is required.");
    if (!j(t)) throw new L("scene is required.");
    e = U(e);
    var a = document.createElement("div"),
        n = new J(t, a);
    this._viewModel = n, this._container = e;
    var i = document.createElement("div");
    this._element = i;
    var r = document.createElement("div");
    r.textContent = "PGEarth Inspector", r.className = "pgEarth-pgEarthInspector-button", r.setAttribute("data-bind", "click: toggleDropDown"), i.appendChild(r), i.className = "pgEarth-pgEarthInspector", i.setAttribute("data-bind", 'css: { "pgEarth-pgEarthInspector-visible" : dropDownVisible, "pgEarth-pgEarthInspector-hidden" : !dropDownVisible }'), e.appendChild(this._element);
    var p = document.createElement("div");
    (this._panel = p).className = "pgEarth-pgEarthInspector-dropDown", i.appendChild(p);
    var d = z.createSection,
        c = z.createCheckbox,
        l = d(p, "General", "generalVisible", "toggleGeneral"),
        s = c("Show Frustums", "frustums"),
        o = document.createElement("div");
    o.className = "pgEarth-pgEarthInspector-frustumStatistics", o.setAttribute("data-bind", "visible: frustums, html: frustumStatisticText"), s.appendChild(o), l.appendChild(s), l.appendChild(c("Show Frustum Planes", "frustumPlanes")), l.appendChild(c("Performance Display", "performance")), a.className = "pgEarth-pgEarthInspector-performanceDisplay", l.appendChild(a);
    var h = document.createElement("div");
    h.className = "pgEarth-pgEarthInspector-shaderCache", h.setAttribute("data-bind", "html: shaderCacheText"), l.appendChild(h);
    var m = document.createElement("div");
    l.appendChild(m);
    var u = document.createElement("span");
    u.setAttribute("data-bind", 'html: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Frustum:"'), m.appendChild(u);
    var E = document.createElement("span");
    E.setAttribute("data-bind", "text: depthFrustumText"), m.appendChild(E);
    var v = document.createElement("input");
    v.type = "button", v.value = "-", v.className = "pgEarth-pgEarthInspector-pickButton", v.setAttribute("data-bind", "click: decrementDepthFrustum"), m.appendChild(v);
    var g = document.createElement("input");
    g.type = "button", g.value = "+", g.className = "pgEarth-pgEarthInspector-pickButton", g.setAttribute("data-bind", "click: incrementDepthFrustum"), m.appendChild(g);
    var b = d(p, "Primitives", "primitivesVisible", "togglePrimitives"),
        C = document.createElement("div");
    C.className = "pgEarth-pgEarthInspector-pickSection", b.appendChild(C);
    var k = document.createElement("input");
    k.type = "button", k.value = "Pick a primitive", k.className = "pgEarth-pgEarthInspector-pickButton", k.setAttribute("data-bind", 'css: {"pgEarth-pgEarthInspector-pickButtonHighlight" : pickPrimitiveActive}, click: pickPrimitive');
    var I = document.createElement("div");
    I.className = "pgEarth-pgEarthInspector-center", I.appendChild(k), C.appendChild(I), C.appendChild(c("Show bounding sphere", "primitiveBoundingSphere", "hasPickedPrimitive")), C.appendChild(c("Show reference frame", "primitiveReferenceFrame", "hasPickedPrimitive")), this._primitiveOnly = c("Show only selected", "filterPrimitive", "hasPickedPrimitive"), C.appendChild(this._primitiveOnly);
    var f = d(p, "Terrain", "terrainVisible", "toggleTerrain"),
        N = document.createElement("div");
    N.className = "pgEarth-pgEarthInspector-pickSection", f.appendChild(N);
    var P = document.createElement("input");
    P.type = "button", P.value = "Pick a tile", P.className = "pgEarth-pgEarthInspector-pickButton", P.setAttribute("data-bind", 'css: {"pgEarth-pgEarthInspector-pickButtonHighlight" : pickTileActive}, click: pickTile'), (I = document.createElement("div")).appendChild(P), I.className = "pgEarth-pgEarthInspector-center", N.appendChild(I);
    var y = document.createElement("div");
    N.appendChild(y);
    var w = document.createElement("input");
    w.type = "button", w.value = "Parent", w.className = "pgEarth-pgEarthInspector-pickButton", w.setAttribute("data-bind", "click: selectParent");
    var S = document.createElement("input");
    S.type = "button", S.value = "NW", S.className = "pgEarth-pgEarthInspector-pickButton", S.setAttribute("data-bind", "click: selectNW");
    var A = document.createElement("input");
    A.type = "button", A.value = "NE", A.className = "pgEarth-pgEarthInspector-pickButton", A.setAttribute("data-bind", "click: selectNE");
    var T = document.createElement("input");
    T.type = "button", T.value = "SW", T.className = "pgEarth-pgEarthInspector-pickButton", T.setAttribute("data-bind", "click: selectSW");
    var B = document.createElement("input");
    B.type = "button", B.value = "SE", B.className = "pgEarth-pgEarthInspector-pickButton", B.setAttribute("data-bind", "click: selectSE");

    var _ = document.createElement("div");

    _.className = "pgEarth-pgEarthInspector-tileText", y.className = "pgEarth-pgEarthInspector-frustumStatistics", y.appendChild(_), y.setAttribute("data-bind", "visible: hasPickedTile"), _.setAttribute("data-bind", "html: tileText");
    var D = document.createElement("div");
    D.className = "pgEarth-pgEarthInspector-relativeText", D.textContent = "Select relative:", y.appendChild(D);
    var x = document.createElement("table"),
        F = document.createElement("tr"),
        V = document.createElement("tr"),
        M = document.createElement("td");
    M.appendChild(w);
    var W = document.createElement("td");
    W.appendChild(S);
    var G = document.createElement("td");
    G.appendChild(A), F.appendChild(M), F.appendChild(W), F.appendChild(G);
    var O = document.createElement("td"),
        q = document.createElement("td");
    q.appendChild(T);
    var H = document.createElement("td");
    H.appendChild(B), V.appendChild(O), V.appendChild(q), V.appendChild(H), x.appendChild(F), x.appendChild(V), y.appendChild(x), N.appendChild(c("Show bounding volume", "tileBoundingSphere", "hasPickedTile")), N.appendChild(c("Show only selected", "filterTile", "hasPickedTile")), f.appendChild(c("Wireframe", "wireframe")), f.appendChild(c("Suspend LOD update", "suspendUpdates")), f.appendChild(c("Show tile coordinates", "tileCoordinates")), R.applyBindings(n, this._element);
  }

  return e(a.prototype, {
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
  }), a.prototype.isDestroyed = function () {
    return !1;
  }, a.prototype.destroy = function () {
    return R.cleanNode(this._element), this._container.removeChild(this._element), this.viewModel.destroy(), t(this);
  }, a;
});