define(["../../Core/createGuid","../../Core/Color","../../Core/Cartesian2","../../Core/Cartesian3","../../Core/defined","../../Core/ArcType","../../Core/Cartographic","../../Core/DeveloperError","../../Core/ScreenSpaceEventType","../../Scene/HorizontalOrigin","../../Scene/VerticalOrigin","../../Scene/PGEarth3DTileFeature","../../DataSources/PolylineArrowMaterialProperty","../../DataSources/Entity"],function(e,i,t,o,r,s,n,a,l,h,p,d,c,u){function E(o){this._that=o,this.options=o.opt,this.viewer=o._viewer,this.id=e(),this._markers=[],this._lines=[],this._pickedObjs=[],this.posArray=[],this._resultTip=this.viewer.entities.add({id:this.id,label:{fillColor:i.YELLOW,showBackground:!0,font:"14px monospace",horizontalOrigin:h.LEFT,verticalOrigin:p.BOTTOM,pixelOffset:new t(0,-10)}}),this.state=o.BEYONANALYSER_STATE.PREPARE,this.init()}return E.prototype.init=function(){var e,t=this,h=t._that;h.handler.setInputAction(function(e){let l=h.mouseManager.piTerrainToModule(e.position);if(t.posArray.push(l),0==t._markers.length){var p=t.viewer.entities.add({position:l,ellipsoid:{radii:new o(2,2,2),material:i.BLUE},label:{text:"视线起点",fillColor:i.YELLOW,pixelOffset:{x:0,y:-20},scale:.5}});t._markers.push(p),t.state=h.BEYONANALYSER_STATE.OPERATING}else if(1===t._markers.length){var d=t.viewer.entities.add({position:l,ellipsoid:{radii:new o(2,2,2),material:i.RED}});t._markers.push(d);var u=h.getIntersectObj(t.posArray[0],l,t._markers,!0);for(let e=u.length-1;e>=0;e--){const i=u[e];r(i.position)||u.splice(e,1)}if(!r(u[0].position))throw new a("position is undefined");var E=u[0].position,f=o.distance(E,l)<5,g=[t.posArray[0],u[0].position],_=t.viewer.entities.add({polyline:{positions:g,width:10,arcType:s.NONE,material:new c(i.GREEN)}});if(t._lines.push(_),!f){var w=[u[0].position,l],v=t.viewer.entities.add({polyline:{positions:w,width:10,arcType:s.NONE,material:new c(i.RED)}});t._lines.push(v)}t.showIntersections(u);var T=t.posArray[0],m=l,A=n.fromCartesian(T),O=n.fromCartesian(m),y={longitude:A.longitude/Math.PI*180,latitude:A.latitude/Math.PI*180,height:A.height},C={longitude:O.longitude/Math.PI*180,latitude:O.latitude/Math.PI*180,height:O.height},L=Math.sqrt(Math.pow(T.x-m.x,2)+Math.pow(T.y-m.y,2)+Math.pow(T.z-m.z,2)),M=Math.abs(C.height-y.height),N=Math.sqrt(Math.pow(L,2)+Math.pow(M,2)),S=f?"是":"否",k="起点坐标:    ("+y.longitude.toFixed(6)+"°,"+y.latitude.toFixed(6)+"°,"+y.height.toFixed(2)+")\n终点坐标:    ("+C.longitude.toFixed(6)+"°,"+C.latitude.toFixed(6)+"°,"+C.height.toFixed(2)+")\n垂直距离:    "+M.toFixed(2)+"m\n水平距离:    "+L.toFixed(2)+"m\n空间距离:    "+N.toFixed(2)+"m\n是否可视:    "+S;h.showTip(t._resultTip,!0,l,k,{fillColor:i.YELLOW}),t.state=h.BEYONANALYSER_STATE.END}},l.LEFT_CLICK),h.handler.setInputAction(function(i){var o=t.viewer.scene.pickPosition(i.endPosition);t.state===h.BEYONANALYSER_STATE.PREPARE?(e="点击设定起点",h.showTip(t._resultTip,!0,o,e)):t.state===h.BEYONANALYSER_STATE.OPERATING&&(e="点击分析通视情况",h.showTip(t._resultTip,!0,o,e))},l.MOUSE_MOVE)},E.prototype.showIntersections=function(e){let t=this;for(let a=0;a<e.length;++a){var r=e[a].object;if(r)if(r instanceof d)t._pickedObjs.push(r),r.oldColor=r.color.clone(),r.color=i.fromAlpha(i.YELLOW,r.color.alpha);else if(r.id instanceof u){var s=r.id,n=s.polygon.material.color.getValue();s.polygon.oldColor=n.clone(),s.polygon.material=i.fromAlpha(i.YELLOW,n.alpha)}t._markers.push(t.viewer.entities.add({position:e[a].position,ellipsoid:{radii:new o(.8,.8,.8),material:i.RED}}))}},E.prototype.remove=function(){for(let i=0;i<this._pickedObjs.length;++i){var e=this._pickedObjs[i];e instanceof d?e.color=e.oldColor.clone():e instanceof u&&(e.polygon.material=e.polygon.oldColor.clone())}this._pickedObjs.length=0;for(let e=0;e<this._markers.length;e++){var i=this._markers[e];this.viewer.entities.remove(i)}this._markers.length=0;for(let e=0;e<this._lines.length;e++){i=this._lines[e];this.viewer.entities.remove(i)}this._lines.length=0,this.viewer.entities.remove(this._resultTip),this._resultTip=void 0},E});