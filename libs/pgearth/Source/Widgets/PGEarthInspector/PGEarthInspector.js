define(["../../Core/defined","../../Core/defineProperties","../../Core/destroyObject","../../Core/DeveloperError","../../ThirdParty/knockout","../getElement","../InspectorShared","./PGEarthInspectorViewModel"],function(e,t,a,n,i,r,p,d){"use strict";function c(t,a){if(!e(t))throw new n("container is required.");if(!e(a))throw new n("scene is required.");t=r(t);var c=document.createElement("div"),l=new d(a,c);this._viewModel=l,this._container=t;var s=document.createElement("div");this._element=s;var o=document.createElement("div");o.textContent="PGEarth Inspector",o.className="pgEarth-pgEarthInspector-button",o.setAttribute("data-bind","click: toggleDropDown"),s.appendChild(o),s.className="pgEarth-pgEarthInspector",s.setAttribute("data-bind",'css: { "pgEarth-pgEarthInspector-visible" : dropDownVisible, "pgEarth-pgEarthInspector-hidden" : !dropDownVisible }'),t.appendChild(this._element);var h=document.createElement("div");this._panel=h,h.className="pgEarth-pgEarthInspector-dropDown",s.appendChild(h);var m=p.createSection,u=p.createCheckbox,E=m(h,"General","generalVisible","toggleGeneral"),v=u("Show Frustums","frustums"),g=document.createElement("div");g.className="pgEarth-pgEarthInspector-frustumStatistics",g.setAttribute("data-bind","visible: frustums, html: frustumStatisticText"),v.appendChild(g),E.appendChild(v),E.appendChild(u("Show Frustum Planes","frustumPlanes")),E.appendChild(u("Performance Display","performance")),c.className="pgEarth-pgEarthInspector-performanceDisplay",E.appendChild(c);var b=document.createElement("div");b.className="pgEarth-pgEarthInspector-shaderCache",b.setAttribute("data-bind","html: shaderCacheText"),E.appendChild(b);var C=document.createElement("div");E.appendChild(C);var k=document.createElement("span");k.setAttribute("data-bind",'html: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Frustum:"'),C.appendChild(k);var I=document.createElement("span");I.setAttribute("data-bind","text: depthFrustumText"),C.appendChild(I);var f=document.createElement("input");f.type="button",f.value="-",f.className="pgEarth-pgEarthInspector-pickButton",f.setAttribute("data-bind","click: decrementDepthFrustum"),C.appendChild(f);var N=document.createElement("input");N.type="button",N.value="+",N.className="pgEarth-pgEarthInspector-pickButton",N.setAttribute("data-bind","click: incrementDepthFrustum"),C.appendChild(N);var P=m(h,"Primitives","primitivesVisible","togglePrimitives"),y=document.createElement("div");y.className="pgEarth-pgEarthInspector-pickSection",P.appendChild(y);var w=document.createElement("input");w.type="button",w.value="Pick a primitive",w.className="pgEarth-pgEarthInspector-pickButton",w.setAttribute("data-bind",'css: {"pgEarth-pgEarthInspector-pickButtonHighlight" : pickPrimitiveActive}, click: pickPrimitive');var S=document.createElement("div");S.className="pgEarth-pgEarthInspector-center",S.appendChild(w),y.appendChild(S),y.appendChild(u("Show bounding sphere","primitiveBoundingSphere","hasPickedPrimitive")),y.appendChild(u("Show reference frame","primitiveReferenceFrame","hasPickedPrimitive")),this._primitiveOnly=u("Show only selected","filterPrimitive","hasPickedPrimitive"),y.appendChild(this._primitiveOnly);var A=m(h,"Terrain","terrainVisible","toggleTerrain"),T=document.createElement("div");T.className="pgEarth-pgEarthInspector-pickSection",A.appendChild(T);var B=document.createElement("input");B.type="button",B.value="Pick a tile",B.className="pgEarth-pgEarthInspector-pickButton",B.setAttribute("data-bind",'css: {"pgEarth-pgEarthInspector-pickButtonHighlight" : pickTileActive}, click: pickTile'),(S=document.createElement("div")).appendChild(B),S.className="pgEarth-pgEarthInspector-center",T.appendChild(S);var _=document.createElement("div");T.appendChild(_);var D=document.createElement("input");D.type="button",D.value="Parent",D.className="pgEarth-pgEarthInspector-pickButton",D.setAttribute("data-bind","click: selectParent");var x=document.createElement("input");x.type="button",x.value="NW",x.className="pgEarth-pgEarthInspector-pickButton",x.setAttribute("data-bind","click: selectNW");var F=document.createElement("input");F.type="button",F.value="NE",F.className="pgEarth-pgEarthInspector-pickButton",F.setAttribute("data-bind","click: selectNE");var V=document.createElement("input");V.type="button",V.value="SW",V.className="pgEarth-pgEarthInspector-pickButton",V.setAttribute("data-bind","click: selectSW");var M=document.createElement("input");M.type="button",M.value="SE",M.className="pgEarth-pgEarthInspector-pickButton",M.setAttribute("data-bind","click: selectSE");var W=document.createElement("div");W.className="pgEarth-pgEarthInspector-tileText",_.className="pgEarth-pgEarthInspector-frustumStatistics",_.appendChild(W),_.setAttribute("data-bind","visible: hasPickedTile"),W.setAttribute("data-bind","html: tileText");var G=document.createElement("div");G.className="pgEarth-pgEarthInspector-relativeText",G.textContent="Select relative:",_.appendChild(G);var O=document.createElement("table"),q=document.createElement("tr"),H=document.createElement("tr"),j=document.createElement("td");j.appendChild(D);var L=document.createElement("td");L.appendChild(x);var R=document.createElement("td");R.appendChild(F),q.appendChild(j),q.appendChild(L),q.appendChild(R);var U=document.createElement("td"),z=document.createElement("td");z.appendChild(V);var J=document.createElement("td");J.appendChild(M),H.appendChild(U),H.appendChild(z),H.appendChild(J),O.appendChild(q),O.appendChild(H),_.appendChild(O),T.appendChild(u("Show bounding volume","tileBoundingSphere","hasPickedTile")),T.appendChild(u("Show only selected","filterTile","hasPickedTile")),A.appendChild(u("Wireframe","wireframe")),A.appendChild(u("Suspend LOD update","suspendUpdates")),A.appendChild(u("Show tile coordinates","tileCoordinates")),i.applyBindings(l,this._element)}return t(c.prototype,{container:{get:function(){return this._container}},viewModel:{get:function(){return this._viewModel}}}),c.prototype.isDestroyed=function(){return!1},c.prototype.destroy=function(){return i.cleanNode(this._element),this._container.removeChild(this._element),this.viewModel.destroy(),a(this)},c});