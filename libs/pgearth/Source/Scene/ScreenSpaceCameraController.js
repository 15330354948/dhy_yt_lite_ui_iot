define(["../Core/Cartesian2","../Core/Cartesian3","../Core/Cartesian4","../Core/Cartographic","../Core/defaultValue","../Core/defined","../Core/destroyObject","../Core/DeveloperError","../Core/Ellipsoid","../Core/HeadingPitchRoll","../Core/IntersectionTests","../Core/isArray","../Core/KeyboardEventModifier","../Core/Math","../Core/Matrix3","../Core/Matrix4","../Core/OrthographicFrustum","../Core/Plane","../Core/Quaternion","../Core/Ray","../Core/Transforms","./CameraEventAggregator","./CameraEventType","./MapMode2D","./SceneMode","./SceneTransforms","./TweenCollection"],function(i,t,e,o,n,a,r,s,l,m,c,d,_,g,u,v,h,p,P,f,T,y,w,R,C,E,M){"use strict";function x(e){if(!a(e))throw new s("scene is required.");this.enableInputs=!0,this.enableTranslate=!0,this.enableZoom=!0,this.enableRotate=!0,this.enableTilt=!0,this.enableLook=!0,this.inertiaSpin=.9,this.inertiaTranslate=.9,this.inertiaZoom=.8,this.maximumMovementRatio=.1,this.bounceAnimationTime=3,this.minimumZoomDistance=1,this.maximumZoomDistance=Number.POSITIVE_INFINITY,this.translateEventTypes=w.LEFT_DRAG,this.zoomEventTypes=[w.WHEEL,w.MIDDLE_DRAG,w.PINCH],this.rotateEventTypes=w.LEFT_DRAG,this.tiltEventTypes=[w.RIGHT_DRAG,w.PINCH,{eventType:w.LEFT_DRAG,modifier:_.CTRL},{eventType:w.RIGHT_DRAG,modifier:_.CTRL}],this.lookEventTypes={eventType:w.LEFT_DRAG,modifier:_.SHIFT},this.minimumPickingTerrainHeight=15e4,this._minimumPickingTerrainHeight=this.minimumPickingTerrainHeight,this.minimumCollisionTerrainHeight=15e3,this._minimumCollisionTerrainHeight=this.minimumCollisionTerrainHeight,this.minimumTrackBallHeight=75e5,this._minimumTrackBallHeight=this.minimumTrackBallHeight,this.enableCollisionDetection=!0,this._scene=e,this._globe=void 0,this._ellipsoid=void 0,this._aggregator=new y(e.canvas),this._lastInertiaSpinMovement=void 0,this._lastInertiaZoomMovement=void 0,this._lastInertiaTranslateMovement=void 0,this._lastInertiaTiltMovement=void 0,this._tweens=new M,this._tween=void 0,this._horizontalRotationAxis=void 0,this._tiltCenterMousePosition=new i(-1,-1),this._tiltCenter=new t,this._rotateMousePosition=new i(-1,-1),this._rotateStartPosition=new t,this._strafeStartPosition=new t,this._zoomMouseStart=new i(-1,-1),this._zoomWorldPosition=new t,this._useZoomWorldPosition=!1,this._tiltCVOffMap=!1,this._looking=!1,this._rotating=!1,this._strafing=!1,this._zoomingOnVector=!1,this._rotatingZoom=!1;var n=e.mapProjection;this._maxCoord=n.project(new o(Math.PI,g.PI_OVER_TWO)),this._zoomFactor=5,this._rotateFactor=void 0,this._rotateRateRangeAdjustment=void 0,this._maximumRotateRate=1.77,this._minimumRotateRate=2e-4,this._minimumZoomRate=20,this._maximumZoomRate=5906376272e3}var I=.4;function z(t,e,o,n,r,s,l){var m=s[l];a(m)||(m=s[l]={startPosition:new i,endPosition:new i,motion:new i,active:!1});var c,d=t.getButtonPressTime(e,o),_=t.getButtonReleaseTime(e,o),u=d&&_&&(_.getTime()-d.getTime())/1e3,v=new Date,h=_&&(v.getTime()-_.getTime())/1e3;if(d&&_&&u<I){var p=function(i,t){if(i<0)return 0;var e=25*(1-t);return Math.exp(-e*i)}(h,n);if(m.active)m.startPosition=i.clone(m.endPosition,m.startPosition),m.endPosition=i.multiplyByScalar(m.motion,p,m.endPosition),m.endPosition=i.add(m.startPosition,m.endPosition,m.endPosition),m.motion=i.clone(i.ZERO,m.motion);else{var P=t.getLastMovement(e,o);if(!a(P)||(c=P,i.equalsEpsilon(c.startPosition,c.endPosition,g.EPSILON14)))return;m.motion.x=.5*(P.endPosition.x-P.startPosition.x),m.motion.y=.5*(P.endPosition.y-P.startPosition.y),m.startPosition=i.clone(P.startPosition,m.startPosition),m.endPosition=i.multiplyByScalar(m.motion,p,m.endPosition),m.endPosition=i.add(m.startPosition,m.endPosition,m.endPosition),m.active=!0}if(isNaN(m.endPosition.x)||isNaN(m.endPosition.y)||i.distance(m.startPosition,m.endPosition)<.5)return void(m.active=!1);if(!t.isButtonDown(e,o))r(s,t.getStartMousePosition(e,o),m)}else m.active=!1}var S=[];function k(i,t,e,o,n,r){if(a(e)){var s=i._aggregator;d(e)||(S[0]=e,e=S);for(var l=e.length,m=0;m<l;++m){var c=e[m],_=a(c.eventType)?c.eventType:c,g=c.modifier,u=s.isMoving(_,g)&&s.getMovement(_,g),v=s.getStartMousePosition(_,g);i.enableInputs&&t&&(u?o(i,v,u):n<1&&z(s,_,g,n,o,i,r))}}}var b=new f,N=new t,A=new i,H=new t,O=new i,W=new t,Z=new t,B=new t,U=new t,F=new t,D=new t,L=new t,q=new t,V=new t,j=new t,G=new t,Y=new t,X=new t,Q=new t,K=new t,J=new t,$=new t,ii=new t,ti={orientation:new m};function ei(e,o,n,r,s,l){var m=1;a(l)&&(m=g.clamp(Math.abs(l),.25,1));var c=e.minimumZoomDistance*m,d=e.maximumZoomDistance,_=r*(s-c);_=g.clamp(_,e._minimumZoomRate,e._maximumZoomRate);var u=(n.endPosition.y-n.startPosition.y)/e._scene.canvas.clientHeight,v=_*(u=Math.min(u,e.maximumMovementRatio));if(!(v>0&&Math.abs(s-c)<1||v<0&&Math.abs(s-d)<1)){s-v<c?v=s-c-1:s-v>d&&(v=s-d);var p=e._scene,P=p.camera,f=p.mode,T=ti.orientation;if(T.heading=P.heading,T.pitch=P.pitch,T.roll=P.roll,P.frustum instanceof h)Math.abs(v)>0&&(P.zoomIn(v),P._adjustOrthographicFrustum());else{var y,w=i.equals(o,e._zoomMouseStart),R=e._zoomingOnVector,M=e._rotatingZoom;if(w||(e._zoomMouseStart=i.clone(o,e._zoomMouseStart),a(e._globe)&&(f===C.SCENE2D?(y=P.getPickRay(o,b).origin,y=t.fromElements(y.y,y.z,y.x)):y=ui(e,o,N)),a(y)?(e._useZoomWorldPosition=!0,e._zoomWorldPosition=t.clone(y,e._zoomWorldPosition)):e._useZoomWorldPosition=!1,R=e._zoomingOnVector=!1,M=e._rotatingZoom=!1),e._useZoomWorldPosition){var x=f===C.COLUMBUS_VIEW;if(P.positionCartographic.height<2e6&&(M=!0),!w||M){if(f===C.SCENE2D){var I=e._zoomWorldPosition,z=P.position;if(!t.equals(I,z)&&P.positionCartographic.height<2*e._maxCoord.x){var S=P.position.x,k=t.subtract(I,z,H);t.normalize(k,k);var ei=t.distance(I,z)*v/(.5*P.getMagnitude());P.move(k,.5*ei),(P.position.x<0&&S>0||P.position.x>0&&S<0)&&(y=P.getPickRay(o,b).origin,y=t.fromElements(y.y,y.z,y.x),e._zoomWorldPosition=t.clone(y,e._zoomWorldPosition))}}else if(f===C.SCENE3D){var oi=t.normalize(P.position,F);if(P.positionCartographic.height<3e3&&Math.abs(t.dot(P.direction,oi))<.6)x=!0;else{var ni=p.canvas,ai=O;ai.x=ni.clientWidth/2,ai.y=ni.clientHeight/2;var ri=ui(e,ai,W);if(a(ri)&&P.positionCartographic.height<1e6){var si=L;t.clone(P.position,si);var li=e._zoomWorldPosition,mi=D;if(mi=t.normalize(li,mi),t.dot(mi,oi)<0)return;var ci=K,di=j;t.clone(P.direction,di),t.add(si,t.multiplyByScalar(di,1e3,J),ci);var _i=G,gi=Y;t.subtract(li,si,_i),t.normalize(_i,gi);var vi=t.dot(oi,gi);if(vi>=0)return void(e._zoomMouseStart.x=-1);var hi=Math.acos(-vi),pi=t.magnitude(si),Pi=t.magnitude(li),fi=pi-v,Ti=t.magnitude(_i),yi=Math.asin(g.clamp(Ti/Pi*Math.sin(hi),-1,1))-Math.asin(g.clamp(fi/Pi*Math.sin(hi),-1,1))+hi,wi=q;t.normalize(si,wi);var Ri=V;Ri=t.cross(gi,wi,Ri),Ri=t.normalize(Ri,Ri),t.normalize(t.cross(wi,Ri,J),di),t.multiplyByScalar(t.normalize(ci,J),t.magnitude(ci)-v,ci),t.normalize(si,si),t.multiplyByScalar(si,fi,si);var Ci=X;t.multiplyByScalar(t.add(t.multiplyByScalar(wi,Math.cos(yi)-1,$),t.multiplyByScalar(di,Math.sin(yi),ii),J),fi,Ci),t.add(si,Ci,si),t.normalize(ci,wi),t.normalize(t.cross(wi,Ri,J),di);var Ei=Q;return t.multiplyByScalar(t.add(t.multiplyByScalar(wi,Math.cos(yi)-1,$),t.multiplyByScalar(di,Math.sin(yi),ii),J),t.magnitude(ci),Ei),t.add(ci,Ei,ci),t.clone(si,P.position),t.normalize(t.subtract(ci,si,J),P.direction),t.clone(P.direction,P.direction),t.cross(P.direction,P.up,P.right),t.cross(P.right,P.direction,P.up),void P.setView(ti)}if(a(ri)){var Mi=t.normalize(ri,Z),xi=t.normalize(e._zoomWorldPosition,B),Ii=t.dot(xi,Mi);if(Ii>0&&Ii<1){var zi=g.acosClamped(Ii),Si=t.cross(xi,Mi,U),ki=v/(Math.abs(zi)>g.toRadians(20)?.75*P.positionCartographic.height:P.positionCartographic.height-v);P.rotate(Si,zi*ki)}}else x=!0}}e._rotatingZoom=!x}if(!w&&x||R){var bi=E.wgs84ToWindowCoordinates(p,e._zoomWorldPosition,A),Ni=(f!==C.COLUMBUS_VIEW&&i.equals(o,e._zoomMouseStart)&&a(bi)?P.getPickRay(bi,b):P.getPickRay(o,b)).direction;f!==C.COLUMBUS_VIEW&&f!==C.SCENE2D||t.fromElements(Ni.y,Ni.z,Ni.x,Ni),P.move(Ni,v),e._zoomingOnVector=!0}else P.zoomIn(v);P.setView(ti)}else P.zoomIn(v)}}}var oi=new f,ni=new f,ai=new t;function ri(i,e,o){var n=i._scene.camera,a=n.getPickRay(o.startPosition,oi).origin,r=n.getPickRay(o.endPosition,ni).origin;a=t.fromElements(a.y,a.z,a.x,a),r=t.fromElements(r.y,r.z,r.x,r);var s=t.subtract(a,r,ai),l=t.magnitude(s);l>0&&(t.normalize(s,s),n.move(s,l))}function si(i,t,e){a(e.distance)&&(e=e.distance);var o=i._scene.camera;ei(i,t,e,i._zoomFactor,o.getMagnitude())}var li=new i,mi=new i;function ci(t,e,o){if(a(o.angleAndHeight))!function(i,t,e){var o=i._rotateFactor*i._rotateRateRangeAdjustment;o>i._maximumRotateRate&&(o=i._maximumRotateRate);o<i._minimumRotateRate&&(o=i._minimumRotateRate);var n=i._scene,a=n.camera,r=n.canvas,s=(e.endPosition.x-e.startPosition.x)/r.clientWidth;s=Math.min(s,i.maximumMovementRatio);var l=o*s*Math.PI*4;a.twistRight(l)}(t,0,o.angleAndHeight);else{var n=t._scene,r=n.camera,s=n.canvas,l=s.clientWidth,m=s.clientHeight,c=li;c.x=2/l*o.startPosition.x-1,c.y=2/m*(m-o.startPosition.y)-1,c=i.normalize(c,c);var d=mi;d.x=2/l*o.endPosition.x-1,d.y=2/m*(m-o.endPosition.y)-1,d=i.normalize(d,d);var _=g.acosClamped(c.x);c.y<0&&(_=g.TWO_PI-_);var u=g.acosClamped(d.x);d.y<0&&(u=g.TWO_PI-u);var v=u-_;r.twistRight(v)}}var di=new f,_i=new t,gi=new t;function ui(i,e,o){var n=i._scene,r=i._globe,s=n.camera;if(a(r)){var l;n.pickPositionSupported&&(l=n.pickPositionWorldCoordinates(e,_i));var m=s.getPickRay(e,di),c=r.pickWorldCoordinates(m,n,gi);return(a(l)?t.distance(l,s.positionWC):Number.POSITIVE_INFINITY)<(a(c)?t.distance(c,s.positionWC):Number.POSITIVE_INFINITY)?t.clone(l,o):t.clone(c,o)}}var vi=new f,hi=new f,pi=new t,Pi=new t,fi=new t,Ti=new t,yi=new p(t.UNIT_X,0),wi=new i,Ri=new i;function Ci(e,o,n){if(t.equals(o,e._translateMousePosition)||(e._looking=!1),t.equals(o,e._strafeMousePosition)||(e._strafing=!1),e._looking)At(e,o,n);else if(e._strafing)Xi(e,o,n);else{var r,s=e._scene.camera,l=i.clone(n.startPosition,wi),m=i.clone(n.endPosition,Ri),d=s.getPickRay(l,vi),_=t.clone(t.ZERO,Ti),u=t.UNIT_X;if(s.position.z<e._minimumPickingTerrainHeight&&(r=ui(e,l,pi),a(r)&&(_.x=r.x)),_.x>s.position.z&&a(r))return t.clone(r,e._strafeStartPosition),e._strafing=!0,Xi(e,o,n),void(e._strafeMousePosition=i.clone(o,e._strafeMousePosition));var v=p.fromPointNormal(_,u,yi);d=s.getPickRay(l,vi);var h=c.rayPlane(d,v,pi),P=s.getPickRay(m,hi),f=c.rayPlane(P,v,Pi);if(!a(h)||!a(f))return e._looking=!0,At(e,o,n),void i.clone(o,e._translateMousePosition);var T=t.subtract(h,f,fi),y=T.x;T.x=T.y,T.y=T.z,T.z=y;var w=t.magnitude(T);w>g.EPSILON6&&(t.normalize(T,T),s.move(T,w))}}var Ei=new i,Mi=new f,xi=new t,Ii=new t,zi=new v,Si=new v,ki=new t,bi=new p(t.UNIT_X,0),Ni=new t,Ai=new o,Hi=new v,Oi=new P,Wi=new u,Zi=new t;function Bi(e,o,n){if(a(n.angleAndHeight)&&(n=n.angleAndHeight),i.equals(o,e._tiltCenterMousePosition)||(e._tiltCVOffMap=!1,e._looking=!1),e._looking)At(e,o,n);else{var r=e._scene.camera,s=e._maxCoord,m=Math.abs(r.position.x)-s.x<0&&Math.abs(r.position.y)-s.y<0;e._tiltCVOffMap||!m||r.position.z>e._minimumPickingTerrainHeight?(e._tiltCVOffMap=!0,function(e,o,n){var r=e._scene,s=r.camera,m=r.canvas,c=Ei;c.x=m.clientWidth/2,c.y=m.clientHeight/2;var d,_=s.getPickRay(c,Mi),u=t.UNIT_X,h=_.origin,p=_.direction,P=t.dot(u,p);Math.abs(P)>g.EPSILON6&&(d=-t.dot(u,h)/P);if(!a(d)||d<=0)return e._looking=!0,At(e,o,n),void i.clone(o,e._tiltCenterMousePosition);var f=t.multiplyByScalar(p,d,xi);t.add(h,f,f);var y=r.mapProjection,w=y.ellipsoid;t.fromElements(f.y,f.z,f.x,f);var R=y.unproject(f,Ai);w.cartographicToCartesian(R,f);var C=T.eastNorthUpToFixedFrame(f,w,zi),E=e._globe,M=e._ellipsoid;e._globe=void 0,e._ellipsoid=l.UNIT_SPHERE,e._rotateFactor=1,e._rotateRateRangeAdjustment=1;var x=v.clone(s.transform,Hi);s._setTransform(C),et(e,o,n,t.UNIT_Z),s._setTransform(x),e._globe=E,e._ellipsoid=M;var I=M.maximumRadius;e._rotateFactor=1/I,e._rotateRateRangeAdjustment=I}(e,o,n)):function(e,o,n){var r,s,m=e._scene,d=m.camera,_=t.UNIT_X;if(i.equals(o,e._tiltCenterMousePosition))r=t.clone(e._tiltCenter,xi);else{if(d.position.z<e._minimumPickingTerrainHeight&&(r=ui(e,o,xi)),!a(r)){var h,f=(s=d.getPickRay(o,Mi)).origin,y=s.direction,w=t.dot(_,y);if(Math.abs(w)>g.EPSILON6&&(h=-t.dot(_,f)/w),!a(h)||h<=0)return e._looking=!0,At(e,o,n),void i.clone(o,e._tiltCenterMousePosition);r=t.multiplyByScalar(y,h,xi),t.add(f,r,r)}i.clone(o,e._tiltCenterMousePosition),t.clone(r,e._tiltCenter)}var R=m.canvas,C=Ei;C.x=R.clientWidth/2,C.y=e._tiltCenterMousePosition.y,s=d.getPickRay(C,Mi);var E=t.clone(t.ZERO,ki);E.x=r.x;var M=p.fromPointNormal(E,_,bi),x=c.rayPlane(s,M,Ii),I=d._projection,z=I.ellipsoid;t.fromElements(r.y,r.z,r.x,r);var S=I.unproject(r,Ai);z.cartographicToCartesian(S,r);var k,b=T.eastNorthUpToFixedFrame(r,z,zi);a(x)?(t.fromElements(x.y,x.z,x.x,x),S=I.unproject(x,Ai),z.cartographicToCartesian(S,x),k=T.eastNorthUpToFixedFrame(x,z,Si)):k=b;var N=e._globe,A=e._ellipsoid;e._globe=void 0,e._ellipsoid=l.UNIT_SPHERE,e._rotateFactor=1,e._rotateRateRangeAdjustment=1;var H=t.UNIT_Z,O=v.clone(d.transform,Hi);d._setTransform(b);var W=t.cross(t.UNIT_Z,t.normalize(d.position,Ni),Ni),Z=t.dot(d.right,W);if(et(e,o,n,H,!1,!0),d._setTransform(k),Z<0){n.startPosition.y>n.endPosition.y&&(H=void 0);var B=d.constrainedAxis;d.constrainedAxis=void 0,et(e,o,n,H,!0,!1),d.constrainedAxis=B}else et(e,o,n,H,!0,!1);if(a(d.constrainedAxis)){var U=t.cross(d.direction,d.constrainedAxis,Zi);t.equalsEpsilon(U,t.ZERO,g.EPSILON6)||(t.dot(U,d.right)<0&&t.negate(U,U),t.cross(U,d.direction,d.up),t.cross(d.direction,d.up,d.right),t.normalize(d.up,d.up),t.normalize(d.right,d.right))}d._setTransform(O),e._globe=N,e._ellipsoid=A;var F=A.maximumRadius;e._rotateFactor=1/F,e._rotateRateRangeAdjustment=F;var D=t.clone(d.positionWC,Ni);if(d._adjustHeightForTerrain(),!t.equals(d.positionWC,D)){d._setTransform(k),d.worldToCameraCoordinatesPoint(D,D);var L=t.magnitudeSquared(D);t.magnitudeSquared(d.position)>L&&(t.normalize(d.position,d.position),t.multiplyByScalar(d.position,Math.sqrt(L),d.position));var q=t.angleBetween(D,d.position),V=t.cross(D,d.position,D);t.normalize(V,V);var j=P.fromAxisAngle(V,q,Oi),G=u.fromQuaternion(j,Wi);u.multiplyByVector(G,d.direction,d.direction),u.multiplyByVector(G,d.up,d.up),t.cross(d.direction,d.up,d.right),t.cross(d.right,d.direction,d.up),d._setTransform(O)}}(e,o,n)}}var Ui=new i,Fi=new f,Di=new t;function Li(i,e,o){a(o.distance)&&(o=o.distance);var n=i._scene,r=n.camera,s=n.canvas,l=Ui;l.x=s.clientWidth/2,l.y=s.clientHeight/2;var m,c,d=r.getPickRay(l,Fi);if(r.position.z<i._minimumPickingTerrainHeight&&(m=ui(i,l,Di)),a(m))c=t.distance(d.origin,m);else{var _=t.UNIT_X,g=d.origin,u=d.direction;c=-t.dot(_,g)/t.dot(_,u)}ei(i,e,o,i._zoomFactor,c)}var qi=new f,Vi=new p(t.UNIT_X,0),ji=new t,Gi=new t,Yi=new t;function Xi(i,e,o){var n=i._scene,r=n.camera,s=ui(i,o.startPosition,Yi);if(a(s)){var l=o.endPosition,m=r.getPickRay(l,qi),d=t.clone(r.direction,Gi);n.mode===C.COLUMBUS_VIEW&&t.fromElements(d.z,d.x,d.y,d);var _=p.fromPointNormal(s,d,Vi),g=c.rayPlane(m,_,ji);a(g)&&(d=t.subtract(s,g,d),n.mode===C.COLUMBUS_VIEW&&t.fromElements(d.y,d.z,d.x,d),t.add(r.position,d,r.position))}}var Qi=new t,Ki=new o,Ji=new t,$i=new l,it=new t;function tt(e,o,n){var r=e._scene.camera;if(v.equals(r.transform,v.IDENTITY)){var s,m,c,d=e._ellipsoid.geodeticSurfaceNormal(r.position,it),_=e._ellipsoid.cartesianToCartographic(r.positionWC,Ki).height,g=e._globe;if(a(g)&&_<e._minimumPickingTerrainHeight&&(c=ui(e,n.startPosition,Yi),a(c))){var u=r.getPickRay(n.startPosition,di),h=e._ellipsoid.geodeticSurfaceNormal(c);Math.abs(t.dot(u.direction,h))<.05&&!e._looking&&(e._rotating=!1,e._strafing=!0)}i.equals(o,e._rotateMousePosition)?e._looking?At(e,o,n,d):e._rotating?et(e,o,n):e._strafing?(t.clone(c,e._strafeStartPosition),Xi(e,0,n)):(s=t.magnitude(e._rotateStartPosition),(m=Ji).x=m.y=m.z=s,dt(e,o,n,l.fromCartesian3(m,$i))):(e._looking=!1,e._rotating=!1,e._strafing=!1,a(g)&&_<e._minimumPickingTerrainHeight?a(c)?t.magnitude(r.position)<t.magnitude(c)?(t.clone(c,e._strafeStartPosition),e._strafing=!0,Xi(e,0,n)):(s=t.magnitude(c),(m=Ji).x=m.y=m.z=s,dt(e,o,n,l.fromCartesian3(m,$i)),t.clone(c,e._rotateStartPosition)):(e._looking=!0,At(e,o,n,d)):a(r.pickEllipsoid(n.startPosition,e._ellipsoid,Qi))?(dt(e,o,n,e._ellipsoid),t.clone(Qi,e._rotateStartPosition)):_>e._minimumTrackBallHeight?(e._rotating=!0,et(e,o,n)):(e._looking=!0,At(e,o,n,d)),i.clone(o,e._rotateMousePosition))}else et(e,o,n)}function et(i,e,o,r,s,l){s=n(s,!1),l=n(l,!1);var m=i._scene,c=m.camera,d=m.canvas,_=c.constrainedAxis;a(r)&&(c.constrainedAxis=r);var g=t.magnitude(c.position),u=i._rotateFactor*(g-i._rotateRateRangeAdjustment);u>i._maximumRotateRate&&(u=i._maximumRotateRate),u<i._minimumRotateRate&&(u=i._minimumRotateRate);var v=(o.startPosition.x-o.endPosition.x)/d.clientWidth,h=(o.startPosition.y-o.endPosition.y)/d.clientHeight;v=Math.min(v,i.maximumMovementRatio),h=Math.min(h,i.maximumMovementRatio);var p=u*v*Math.PI*2,P=u*h*Math.PI;s||c.rotateRight(p),l||c.rotateUp(P),c.constrainedAxis=_}var ot=e.clone(e.UNIT_W),nt=e.clone(e.UNIT_W),at=new t,rt=new t,st=new t,lt=new t,mt=new i,ct=new i;function dt(e,o,n,r){var s=e._scene.camera,l=i.clone(n.startPosition,mt),m=i.clone(n.endPosition,ct),c=s.pickEllipsoid(l,r,ot),d=s.pickEllipsoid(m,r,nt);if(!a(c)||!a(d))return e._rotating=!0,void et(e,0,n);if(c=s.worldToCameraCoordinates(c,c),d=s.worldToCameraCoordinates(d,d),a(s.constrainedAxis)){var _=s.constrainedAxis,u=t.mostOrthogonalAxis(_,at);t.cross(u,_,u),t.normalize(u,u);var v=t.cross(_,u,rt),h=t.magnitude(c),p=t.dot(_,c),P=Math.acos(p/h),f=t.multiplyByScalar(_,p,st);t.subtract(c,f,f),t.normalize(f,f);var T=t.magnitude(d),y=t.dot(_,d),w=Math.acos(y/T),R=t.multiplyByScalar(_,y,lt);t.subtract(d,R,R),t.normalize(R,R);var C=Math.acos(t.dot(f,u));t.dot(f,v)<0&&(C=g.TWO_PI-C);var E=Math.acos(t.dot(R,u));t.dot(R,v)<0&&(E=g.TWO_PI-E);var M,x=C-E;M=t.equalsEpsilon(_,s.position,g.EPSILON2)?s.right:t.cross(_,s.position,at);var I,z=t.cross(_,M,at),S=t.dot(z,t.subtract(c,_,rt)),k=t.dot(z,t.subtract(d,_,rt));I=S>0&&k>0?w-P:S>0&&k<=0?t.dot(s.position,_)>0?-P-w:P+w:P-w,s.rotateRight(x),s.rotateUp(I)}else{t.normalize(c,c),t.normalize(d,d);var b=t.dot(c,d),N=t.cross(c,d,at);if(b<1&&!t.equalsEpsilon(N,t.ZERO,g.EPSILON14)){var A=Math.acos(b);s.rotate(N,A)}}}var _t=new t,gt=new o;function ut(i,e,o){a(o.distance)&&(o=o.distance);var n=i._ellipsoid,r=i._scene,s=r.camera,l=r.canvas,m=Ui;m.x=l.clientWidth/2,m.y=l.clientHeight/2;var c,d,_=s.getPickRay(m,Fi),g=n.cartesianToCartographic(s.position,gt).height;g<i._minimumPickingTerrainHeight&&(c=ui(i,m,Di)),d=a(c)?t.distance(_.origin,c):g;var u=t.normalize(s.position,_t);ei(i,e,o,i._zoomFactor,d,t.dot(u,s.direction))}var vt=new i,ht=new f,pt=new t,Pt=new t,ft=new v,Tt=new v,yt=new v,wt=new P,Rt=new u,Ct=new o,Et=new t;function Mt(e,o,n){var r=e._scene.camera;if(v.equals(r.transform,v.IDENTITY))if(a(n.angleAndHeight)&&(n=n.angleAndHeight),i.equals(o,e._tiltCenterMousePosition)||(e._tiltOnEllipsoid=!1,e._looking=!1),e._looking){At(e,o,n,e._ellipsoid.geodeticSurfaceNormal(r.position,Et))}else{var s=e._ellipsoid.cartesianToCartographic(r.position,Ct);e._tiltOnEllipsoid||s.height>e._minimumCollisionTerrainHeight?(e._tiltOnEllipsoid=!0,function(e,o,n){var r=e._ellipsoid,s=e._scene,m=s.camera,d=.25*e.minimumZoomDistance,_=r.cartesianToCartographic(m.positionWC,xt).height;if(_-d-1<g.EPSILON3&&n.endPosition.y-n.startPosition.y<0)return;var u=s.canvas,h=vt;h.x=u.clientWidth/2,h.y=u.clientHeight/2;var p,P=m.getPickRay(h,ht),y=c.rayEllipsoid(P,r);if(a(y))p=f.getPoint(P,y.start,pt);else{if(!(_>e._minimumTrackBallHeight)){e._looking=!0;var w=e._ellipsoid.geodeticSurfaceNormal(m.position,Et);return At(e,o,n,w),void i.clone(o,e._tiltCenterMousePosition)}var R=c.grazingAltitudeLocation(P,r);if(!a(R))return;var C=r.cartesianToCartographic(R,Ct);C.height=0,p=r.cartographicToCartesian(C,pt)}var E=T.eastNorthUpToFixedFrame(p,r,ft),M=e._globe,x=e._ellipsoid;e._globe=void 0,e._ellipsoid=l.UNIT_SPHERE,e._rotateFactor=1,e._rotateRateRangeAdjustment=1;var I=v.clone(m.transform,yt);m._setTransform(E),et(e,0,n,t.UNIT_Z),m._setTransform(I),e._globe=M,e._ellipsoid=x;var z=x.maximumRadius;e._rotateFactor=1/z,e._rotateRateRangeAdjustment=z}(e,o,n)):function(e,o,n){var r,s,m,d=e._ellipsoid,_=e._scene,h=_.camera;if(i.equals(o,e._tiltCenterMousePosition))r=t.clone(e._tiltCenter,pt);else{if(r=ui(e,o,pt),!a(r)){if(s=h.getPickRay(o,ht),m=c.rayEllipsoid(s,d),!a(m)){var p=d.cartesianToCartographic(h.position,Ct);if(p.height<=e._minimumTrackBallHeight){e._looking=!0;var y=e._ellipsoid.geodeticSurfaceNormal(h.position,Et);At(e,o,n,y),i.clone(o,e._tiltCenterMousePosition)}return}r=f.getPoint(s,m.start,pt)}i.clone(o,e._tiltCenterMousePosition),t.clone(r,e._tiltCenter)}var w=_.canvas,R=vt;R.x=w.clientWidth/2,R.y=e._tiltCenterMousePosition.y,s=h.getPickRay(R,ht);var C=t.magnitude(r),E=t.fromElements(C,C,C,Ji),M=l.fromCartesian3(E,$i);if(m=c.rayEllipsoid(s,M),!a(m))return;var x=t.magnitude(s.origin)>C?m.start:m.stop,I=f.getPoint(s,x,Pt),z=T.eastNorthUpToFixedFrame(r,d,ft),S=T.eastNorthUpToFixedFrame(I,M,Tt),k=e._globe,b=e._ellipsoid;e._globe=void 0,e._ellipsoid=l.UNIT_SPHERE,e._rotateFactor=1,e._rotateRateRangeAdjustment=1;var N=t.UNIT_Z,A=v.clone(h.transform,yt);h._setTransform(z);var H=t.cross(I,h.positionWC,Zi),O=t.dot(h.rightWC,H);if(et(e,0,n,N,!1,!0),h._setTransform(S),O<0){n.startPosition.y>n.endPosition.y&&(N=void 0);var W=h.constrainedAxis;h.constrainedAxis=void 0,et(e,0,n,N,!0,!1),h.constrainedAxis=W}else et(e,0,n,N,!0,!1);if(a(h.constrainedAxis)){var Z=t.cross(h.direction,h.constrainedAxis,Zi);t.equalsEpsilon(Z,t.ZERO,g.EPSILON6)||(t.dot(Z,h.right)<0&&t.negate(Z,Z),t.cross(Z,h.direction,h.up),t.cross(h.direction,h.up,h.right),t.normalize(h.up,h.up),t.normalize(h.right,h.right))}h._setTransform(A),e._globe=k,e._ellipsoid=b;var B=b.maximumRadius;e._rotateFactor=1/B,e._rotateRateRangeAdjustment=B;var U=t.clone(h.positionWC,Zi);if(h._adjustHeightForTerrain(),!t.equals(h.positionWC,U)){h._setTransform(S),h.worldToCameraCoordinatesPoint(U,U);var F=t.magnitudeSquared(U);t.magnitudeSquared(h.position)>F&&(t.normalize(h.position,h.position),t.multiplyByScalar(h.position,Math.sqrt(F),h.position));var D=t.angleBetween(U,h.position),L=t.cross(U,h.position,U);t.normalize(L,L);var q=P.fromAxisAngle(L,D,wt),V=u.fromQuaternion(q,Rt);u.multiplyByVector(V,h.direction,h.direction),u.multiplyByVector(V,h.up,h.up),t.cross(h.direction,h.up,h.right),t.cross(h.right,h.direction,h.up),h._setTransform(A)}}(e,o,n)}}var xt=new o;var It=new i,zt=new i,St=new f,kt=new f,bt=new t,Nt=new t;function At(i,e,o,r){var s=i._scene.camera,l=It;l.x=o.startPosition.x,l.y=0;var m=zt;m.x=o.endPosition.x,m.y=0;var c,d,_=s.getPickRay(l,St),u=s.getPickRay(m,kt),v=0;s.frustum instanceof h?(c=_.origin,d=u.origin,t.add(s.direction,c,c),t.add(s.direction,d,d),t.subtract(c,s.position,c),t.subtract(d,s.position,d),t.normalize(c,c),t.normalize(d,d)):(c=_.direction,d=u.direction);var p=t.dot(c,d);p<1&&(v=Math.acos(p)),v=o.startPosition.x>o.endPosition.x?-v:v;var P=i._horizontalRotationAxis;if(a(r)?s.look(r,-v):a(P)?s.look(P,-v):s.lookLeft(v),l.x=0,l.y=o.startPosition.y,m.x=0,m.y=o.endPosition.y,_=s.getPickRay(l,St),u=s.getPickRay(m,kt),v=0,s.frustum instanceof h?(c=_.origin,d=u.origin,t.add(s.direction,c,c),t.add(s.direction,d,d),t.subtract(c,s.position,c),t.subtract(d,s.position,d),t.normalize(c,c),t.normalize(d,d)):(c=_.direction,d=u.direction),(p=t.dot(c,d))<1&&(v=Math.acos(p)),v=o.startPosition.y>o.endPosition.y?-v:v,r=n(r,P),a(r)){var f=s.direction,T=t.negate(r,bt),y=t.equalsEpsilon(f,r,g.EPSILON2),w=t.equalsEpsilon(f,T,g.EPSILON2);if(y||w)(y&&v<0||w&&v>0)&&s.look(s.right,-v);else{p=t.dot(f,r);var R=g.acosClamped(p);v>0&&v>R&&(v=R-g.EPSILON4),p=t.dot(f,T),R=g.acosClamped(p),v<0&&-v>R&&(v=-R+g.EPSILON4);var C=t.cross(r,f,Nt);s.look(C,v)}}else s.lookUp(v)}return x.prototype.update=function(){v.equals(this._scene.camera.transform,v.IDENTITY)?(this._globe=this._scene.globe,this._ellipsoid=a(this._globe)?this._globe.ellipsoid:this._scene.mapProjection.ellipsoid):(this._globe=void 0,this._ellipsoid=l.UNIT_SPHERE),this._minimumCollisionTerrainHeight=this.minimumCollisionTerrainHeight*this._scene.terrainExaggeration,this._minimumPickingTerrainHeight=this.minimumPickingTerrainHeight*this._scene.terrainExaggeration,this._minimumTrackBallHeight=this.minimumTrackBallHeight*this._scene.terrainExaggeration;var i=this._ellipsoid.maximumRadius;this._rotateFactor=1/i,this._rotateRateRangeAdjustment=i;var e,o,n=this._scene.mode;n===C.SCENE2D?(o=(e=this)._scene.mapMode2D===R.ROTATE,v.equals(v.IDENTITY,e._scene.camera.transform)?(k(e,e.enableTranslate,e.translateEventTypes,ri,e.inertiaTranslate,"_lastInertiaTranslateMovement"),k(e,e.enableZoom,e.zoomEventTypes,si,e.inertiaZoom,"_lastInertiaZoomMovement"),o&&k(e,e.enableRotate,e.tiltEventTypes,ci,e.inertiaSpin,"_lastInertiaTiltMovement")):(k(e,e.enableZoom,e.zoomEventTypes,si,e.inertiaZoom,"_lastInertiaZoomMovement"),o&&k(e,e.enableRotate,e.translateEventTypes,ci,e.inertiaSpin,"_lastInertiaSpinMovement"))):n===C.COLUMBUS_VIEW?(this._horizontalRotationAxis=t.UNIT_Z,function(i){var t=i._scene.camera;if(v.equals(v.IDENTITY,t.transform)){var e=i._tweens;if(i._aggregator.anyButtonDown&&e.removeAll(),k(i,i.enableTilt,i.tiltEventTypes,Bi,i.inertiaSpin,"_lastInertiaTiltMovement"),k(i,i.enableTranslate,i.translateEventTypes,Ci,i.inertiaTranslate,"_lastInertiaTranslateMovement"),k(i,i.enableZoom,i.zoomEventTypes,Li,i.inertiaZoom,"_lastInertiaZoomMovement"),k(i,i.enableLook,i.lookEventTypes,At),!(i._aggregator.anyButtonDown||a(i._lastInertiaZoomMovement)&&i._lastInertiaZoomMovement.active||a(i._lastInertiaTranslateMovement)&&i._lastInertiaTranslateMovement.active||e.contains(i._tween))){var o=t.createCorrectPositionTween(i.bounceAnimationTime);a(o)&&(i._tween=e.add(o))}e.update()}else k(i,i.enableRotate,i.rotateEventTypes,et,i.inertiaSpin,"_lastInertiaSpinMovement"),k(i,i.enableZoom,i.zoomEventTypes,ut,i.inertiaZoom,"_lastInertiaZoomMovement")}(this)):n===C.SCENE3D&&(this._horizontalRotationAxis=void 0,function(i){k(i,i.enableRotate,i.rotateEventTypes,tt,i.inertiaSpin,"_lastInertiaSpinMovement"),k(i,i.enableZoom,i.zoomEventTypes,ut,i.inertiaZoom,"_lastInertiaZoomMovement"),k(i,i.enableTilt,i.tiltEventTypes,Mt,i.inertiaSpin,"_lastInertiaTiltMovement"),k(i,i.enableLook,i.lookEventTypes,At)}(this)),this._aggregator.reset()},x.prototype.isDestroyed=function(){return!1},x.prototype.destroy=function(){return this._tweens.removeAll(),this._aggregator=this._aggregator&&this._aggregator.destroy(),r(this)},x});