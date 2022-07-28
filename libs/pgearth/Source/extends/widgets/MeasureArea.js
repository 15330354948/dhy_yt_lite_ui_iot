define(["../../Core/Cartesian3","../../Core/Color","../../Core/defineProperties","../../Core/PolygonGeometry","../../Core/PolygonHierarchy","../../DataSources/CallbackProperty","../../Renderer/Pass","../../Renderer/RenderState","../../Scene/BlendingState","../../Scene/BlendOption","../../Scene/HorizontalOrigin","../../Scene/LabelCollection","../../Scene/LabelStyle","../../Scene/PointPrimitiveCollection","../../Scene/VerticalOrigin","./support/MeasureUnit","./support/EventDriven","./support/PickGlobe","../../Core/ScreenSpaceEventHandler","../../Core/ScreenSpaceEventType","../../Scene/GroundPrimitive","../../Core/GeometryInstance","../../Core/ColorGeometryInstanceAttribute","../../Scene/PerInstanceColorAppearance","../../Scene/ClassificationType"],function(n,B,y,r,m,s,j,q,e,h,o,d,l,b,i,p,z,c,v,f,k,t,A,x,a){function w(C){this.viewer=C;this.scene=C.scene;this._enable=false;this.startDraw=false;this._bAddTemp=true;this.leftpoints=[];this.poinsTemp=[];this.pointsCompare=[];this.pixelPoints=[];this._area=0;this.polygonEntity=null;this._measureUnit=p.SQUAREMETER;this._pointCollection=new b({blendOption:h.TRANSLUCENT});this._labelCollection=new d({blendOption:h.TRANSLUCENT,depthMask:false});this.areaLabel=this._labelCollection.add({show:true,showBackground:true,font:"36px KaiTi",fillColor:B.WHITE,outlineColor:B.BACK,outlineWidth:5,style:l.FILL_AND_OUTLINE,horizontalOrigin:o.CENTER,verticalOrigin:i.BASELINE,disableDepthTestDistance:10000,scale:0.5});this.endPixelPoint=this._pointCollection.add({name:"",position:n.ZERO,pixelSize:5,color:B.RED,disableDepthTestDistance:10000});var g=this;this.lineTemp=C.entities.add({name:"",polyline:{positions:new s(function(){if(!(g.poinsTemp.length<2)){return g.poinsTemp}},false),width:5,material:new B(0.5,1,1,0.7)}}),this.scene.primitives.add(this);this.pickGlobe=new c(this.viewer);this.clickDraw=new v(this.scene.canvas);this.clickDraw.setInputAction(function(D){g._enable=true;g.addPoint3D(D)},f.LEFT_CLICK);this.moveDraw=new v(this.scene.canvas);this.moveDraw.setInputAction(function(D){g.addPointTemp(D)},f.MOUSE_MOVE);this.stopDraw=new v(this.scene.canvas);this.stopDraw.setInputAction(function(D){g.clickDraw&&!g.clickDraw.isDestroyed()&&g.clickDraw.destroy();g.moveDraw&&!g.moveDraw.isDestroyed()&&g.moveDraw.destroy();g.finish()},f.RIGHT_CLICK)}function u(G){var K=new r({polygonHierarchy:new m(G.leftpoints),perPositionHeight:true}),J=r.createGeometry(K);G.polygonEntity&&G.scene.primitives.remove(G.polygonEntity);var Q=new k({geometryInstances:new t({geometry:K,attributes:{color:A.fromColor(B.CYAN.withAlpha(0.3))},id:"polygon123"}),appearance:new x({translucent:false,closed:true}),classificationType:a.BOTH});G.polygonEntity=G.scene.primitives.add(Q);if(void 0!=J){for(var U=J.indices,H=J.attributes.position.values,M=[],F=0,T=0;T<H.length/3;T++){var R=new n(0,0,0);R.x=H[3*T],R.y=H[3*T+1],R.z=H[3*T+2],M.push(R)}for(var T=0;T<U.length/3;T++){var N=[];N.push(M[U[3*T]],M[U[3*T+1]],M[U[3*T+2]]);var V=n.distance(N[0],N[1]),I=n.distance(N[0],N[2]),L=n.distance(N[1],N[2]),P=(V+I+L)/2;F+=Math.sqrt(P*(P-V)*(P-L)*(P-I))}for(var O=0,E=0,D=0,T=0;T<G.leftpoints.length;T++){O+=G.leftpoints[T].x,E+=G.leftpoints[T].y,D+=G.leftpoints[T].z}var C=new n(0,0,0);C.x=O/G.leftpoints.length,C.y=E/G.leftpoints.length,C.z=D/G.leftpoints.length,G.polygonEntity.show=true,G._area=F.toFixed(2),G.areaLabel.position=C,G.areaLabel.show=true,0==G._measureUnit?G.areaLabel.text="面积:"+F.toFixed(2)+"平方米":1==G._measureUnit&&(G.areaLabel.text="面积:"+(F/1000000).toFixed(2)+"平方千米")}}y(w.prototype,{enable:{get:function(){return this._enable},set:function(g){this._enable!==g&&(this._enable=g)}},area:{get:function(){return this._area}},unit:{get:function(){return this._measureUnit},set:function(g){switch(g){case 0:this._measureUnit=p.SQUAREMETER;break;case 1:this._measureUnit=p.SQUAREKILOMETER;break;default:this._measureUnit=p.SQUAREMETER}}}});w.prototype.addPoint3D=function(C){if(this._enable){var D=this.pickGlobe.pickGlobe(C.position);if(this.startDraw&&void 0==D&&this.leftpoints.length>0&&(D=this.leftpoints[this.leftpoints.length-1].clone(),0==this.pointsCompare.length&&this.pointsCompare.push(D),1==this.pointsCompare.length&&(this.pointsCompare.pop(),this.pointsCompare.push(D))),void 0!=D){this.startDraw||(this.pointsTemp=[],this.lineTemp.show=true,this.leftpoints.push(D),this.poinsTemp.push(D),this.endPixelPoint.show=true,this.endPixelPoint.position=D);this.startDraw=true;this._bAddTemp=true;var g=this._pointCollection.add({name:"",position:D,pixelSize:5,color:new B(1,1,1,0.01),disableDepthTestDistance:10000});this.pixelPoints.push(g)}this.leftpoints.length>2&&(this.lineTemp.show=false,u(this))}};w.prototype.addPointTemp=function(C){if(this._enable&&this.startDraw){var g=this.pickGlobe.pickGlobe(C.endPosition||C.position);void 0!=g&&(this._bAddTemp&&(this.leftpoints.push(g),this._bAddTemp=false),1==this.poinsTemp.length?this.poinsTemp.push(g):2==this.poinsTemp.length&&(this.poinsTemp[1]=g),void 0!=g&&this.startDraw&&(this.endPixelPoint.position=this.leftpoints[this.leftpoints.length-1]=g,this.leftpoints.length>2&&u(this)))}};w.prototype.finish=function(){this.leftpoints.length<3&&this.clear(),void 0!==this.pointsCompare[0]&&void 0!==this.leftpoints[this.leftpoints.length-1]&&(this.pointsCompare[0].x==this.leftpoints[this.leftpoints.length-1].x&&this.pointsCompare[0].y==this.leftpoints[this.leftpoints.length-1].y&&this.pointsCompare[0].z==this.leftpoints[this.leftpoints.length-1].z||this.leftpoints.pop()),this._enable=false,this.startDraw=false,this._bAddTemp=true,this.endPixelPoint.show=false};w.prototype.clear=function(){this.leftpoints=[];this.poinsTemp=[];this.polygonEntity&&(this.polygonEntity.show=false);this.areaLabel&&(this.areaLabel.show=false);this._enable=false;this.startDraw=false;this._bAddTemp=true;for(var C=0;C<this.pixelPoints.length;C++){var g=this.pixelPoints[C];void 0!=g&&this._pointCollection.remove(g)}this.pixelPoints=[];this.endPixelPoint.show=false;this.clickDraw&&!this.clickDraw.isDestroyed()&&this.clickDraw.destroy();this.moveDraw&&!this.moveDraw.isDestroyed()&&this.moveDraw.destroy();this.stopDraw&&!this.stopDraw.isDestroyed()&&this.stopDraw.destroy()};w.prototype.update=function(C){this._pointCollection.update(C);var g=C.commandList.length;this._labelCollection.update(C);for(var D=C.commandList.length;g<D;++g){C.commandList[g].pass=j.OVERLAY,C.commandList[g].renderState=q.fromCache({depthTest:{enabled:false},depthMask:false,blending:e.ALPHA_BLEND})}};w.prototype._destroy=function(){this._pointCollection=this._pointCollection.destroy();this._labelCollection=this._labelCollection.destroy()};return w});
