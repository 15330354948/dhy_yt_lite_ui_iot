define(["../../Core/Cartesian2","../../Core/Cartesian3","../../Core/Color","../../Core/defined","../../Scene/VerticalOrigin","../../Scene/HorizontalOrigin","../../Scene/PointPrimitiveCollection","../../Scene/LabelStyle","../../Scene/LabelCollection","../../Scene/BlendOption","./support/PickGlobe","../../Core/ScreenSpaceEventHandler","../../Core/ScreenSpaceEventType","../../Core/Math","../../Core/Cartographic"],function(e,i,t,o,n,l,s,c,a,r,p,h,C,d,m){function b(i){this.viewer=i,this.scene=i.scene,this.pointTemp=[],this.labelTemp=[],this._labelCollection=new a({blendOption:r.TRANSLUCENT,depthMask:!1}),this._pointCollection=new s({blendOption:r.TRANSLUCENT}),this.scene.primitives.add(this._pointCollection),this.scene.primitives.add(this._labelCollection);var n=this;this.pickGlobe=new p(this.viewer),this.clickDraw=new h(this.scene.canvas),this.clickDraw.setInputAction(function(i){var l=i.position||i.endPosition,s=n.pickGlobe.pickGlobe(l);if(o(s)){var c=m.fromCartesian(s),a=d.toDegrees(c.longitude).toFixed(6),r=d.toDegrees(c.latitude).toFixed(6),p=c.height.toFixed(6),h=n._pointCollection.add({name:"",position:s,pixelSize:5,color:t.RED,disableDepthTestDistance:1e4});n.pointTemp.push(h);var C=n._labelCollection.add({show:!0,showBackground:!0,pixelOffset:new e(15,0),position:s,font:"28px monospace",scale:.5,text:"经度: "+("   "+a).slice(-11)+"°\n纬度: "+("   "+r).slice(-11)+"°\n高度: "+("   "+p).slice(-11)+"m"});n.labelTemp.push(C)}},C.LEFT_CLICK)}return b.prototype.clear=function(){let e=this;this.pointTemp.map(function(i){e._pointCollection.remove(i)}),this.labelTemp.map(function(i){e._labelCollection.remove(i)}),this.labelTemp=[],this.pointTemp=[],this.clickDraw&&!this.clickDraw.isDestroyed()&&this.clickDraw.destroy()},b});