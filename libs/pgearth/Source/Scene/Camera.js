define(["../Core/BoundingSphere","../Core/Cartesian2","../Core/Cartesian3","../Core/Cartesian4","../Core/Cartographic","../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/DeveloperError","../Core/EasingFunction","../Core/Ellipsoid","../Core/EllipsoidGeodesic","../Core/Event","../Core/getTimestamp","../Core/HeadingPitchRange","../Core/HeadingPitchRoll","../Core/Intersect","../Core/IntersectionTests","../Core/Math","../Core/Matrix3","../Core/Matrix4","../Core/OrthographicFrustum","../Core/OrthographicOffCenterFrustum","../Core/PerspectiveFrustum","../Core/Quaternion","../Core/Ray","../Core/Rectangle","../Core/Transforms","./CameraFlightPath","./MapMode2D","./SceneMode","../extends/core/ExpendUtil"],function(t,i,o,e,r,n,a,s,h,u,c,d,m,l,p,f,g,_,v,C,w,T,y,E,I,W,P,O,x,M,S,N){"use strict";function D(t){if(!a(t))throw new h("scene is required.");this._scene=t,this._transform=w.clone(w.IDENTITY),this._invTransform=w.clone(w.IDENTITY),this._actualTransform=w.clone(w.IDENTITY),this._actualInvTransform=w.clone(w.IDENTITY),this._transformChanged=!1,this.position=new o,this._position=new o,this._positionWC=new o,this._positionCartographic=new r,this._oldPositionWC=void 0,this.positionWCDeltaMagnitude=0,this.positionWCDeltaMagnitudeLastFrame=0,this.timeSinceMoved=0,this._lastMovedTimestamp=0,this.direction=new o,this._direction=new o,this._directionWC=new o,this.up=new o,this._up=new o,this._upWC=new o,this.right=new o,this._right=new o,this._rightWC=new o,this.frustum=new E,this.frustum.aspectRatio=t.drawingBufferWidth/t.drawingBufferHeight,this.frustum.fov=v.toRadians(60),this.workingFrustums=[],this.defaultMoveAmount=1e5,this.defaultLookAmount=Math.PI/60,this.defaultRotateAmount=Math.PI/3600,this.defaultZoomAmount=1e5,this.constrainedAxis=void 0,this.maximumZoomFactor=1.5,this._moveStart=new m,this._moveEnd=new m,this._changed=new m,this._changedPosition=void 0,this._changedDirection=void 0,this._changedFrustum=void 0,this.percentageChanged=.5,this._viewMatrix=new w,this._invViewMatrix=new w,R(this),this._mode=S.SCENE3D,this._modeChanged=!0;var i=t.mapProjection;this._projection=i,this._maxCoord=i.project(new r(Math.PI,v.PI_OVER_TWO)),this._max2Dfrustum=void 0,this._suspendTerrainAdjustment=!1,Xt(this,D.DEFAULT_VIEW_RECTANGLE,this.position,!0);var e=o.magnitude(this.position);e+=e*D.DEFAULT_VIEW_FACTOR,o.normalize(this.position,this.position),o.multiplyByScalar(this.position,e,this.position)}function R(t){w.computeView(t._position,t._direction,t._up,t._right,t._viewMatrix),w.multiply(t._viewMatrix,t._actualInvTransform,t._viewMatrix),w.inverseTransformation(t._viewMatrix,t._invViewMatrix)}D.TRANSFORM_2D=new w(0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1),D.TRANSFORM_2D_INVERSE=w.inverseTransformation(D.TRANSFORM_2D,new w),D.DEFAULT_VIEW_RECTANGLE=P.fromDegrees(100,-20,120,90),D.DEFAULT_VIEW_FACTOR=.5,D.DEFAULT_OFFSET=new p(0,-v.PI_OVER_FOUR,0),D.prototype.hasCurrentFlight=function(){return a(this._currentFlight)&&a(this._scene.preloadFlightCamera)},D.prototype._updateCameraChanged=function(){if(function(t){if(a(t._oldPositionWC)){t.positionWCDeltaMagnitudeLastFrame=t.positionWCDeltaMagnitude;var i=o.subtract(t.positionWC,t._oldPositionWC,t._oldPositionWC);t.positionWCDeltaMagnitude=o.magnitude(i),t._oldPositionWC=o.clone(t.positionWC,t._oldPositionWC),t.positionWCDeltaMagnitude>0?(t.timeSinceMoved=0,t._lastMovedTimestamp=l()):t.timeSinceMoved=Math.max(l()-t._lastMovedTimestamp,0)/1e3}else t._oldPositionWC=o.clone(t.positionWC,t._oldPositionWC)}(this),0!==this._changed.numberOfListeners){var t=this.percentageChanged;if(this._mode!==S.SCENE2D){if(!a(this._changedDirection))return this._changedPosition=o.clone(this.positionWC,this._changedPosition),void(this._changedDirection=o.clone(this.directionWC,this._changedDirection));var i,e=v.acosClamped(o.dot(this.directionWC,this._changedDirection));i=a(this.frustum.fovy)?e/(.5*this.frustum.fovy):e;var r=o.distance(this.positionWC,this._changedPosition)/this.positionCartographic.height;(i>t||r>t)&&(this._changed.raiseEvent(Math.max(i,r)),this._changedPosition=o.clone(this.positionWC,this._changedPosition),this._changedDirection=o.clone(this.directionWC,this._changedDirection))}else{if(!a(this._changedFrustum))return this._changedPosition=o.clone(this.position,this._changedPosition),void(this._changedFrustum=this.frustum.clone());var n,s=this.position,h=this._changedPosition,u=this.frustum,c=this._changedFrustum,d=s.x+u.left,m=s.x+u.right,p=h.x+c.left,f=h.x+c.right,g=s.y+u.bottom,_=s.y+u.top,C=h.y+c.bottom,w=h.y+c.top,T=Math.max(d,p),y=Math.min(m,f),E=Math.max(g,C),I=Math.min(_,w);if(T>=y||E>=_)n=1;else{var W=c;d<p&&m>f&&g<C&&_>w&&(W=u),n=1-(y-T)*(I-E)/((W.right-W.left)*(W.top-W.bottom))}n>t&&(this._changed.raiseEvent(n),this._changedPosition=o.clone(this.position,this._changedPosition),this._changedFrustum=this.frustum.clone(this._changedFrustum))}}};var A=new w,F=new r;D.prototype._adjustHeightForTerrain=function(){var t=this._scene,i=t.screenSpaceCameraController,e=i.enableCollisionDetection,r=i.minimumCollisionTerrainHeight,n=i.minimumZoomDistance;if(!this._suspendTerrainAdjustment&&e){var s=this._mode,h=t.globe;if(a(h)&&s!==S.SCENE2D&&s!==S.MORPHING){var u,c,d=h.ellipsoid,m=t.mapProjection;w.equals(this.transform,w.IDENTITY)||(u=w.clone(this.transform,A),c=o.magnitude(this.position),this._setTransform(w.IDENTITY));var l=F;s===S.SCENE3D?d.cartesianToCartographic(this.position,l):m.unproject(this.position,l);var p=!1;if(l.height<r){var f=h.getHeight(l);if(a(f)&&(f+=n,l.height<f)){if(N.underEarth.enable&&l.height>f-N.underEarth.enableDepth)return;l.height=f,s===S.SCENE3D?d.cartographicToCartesian(l,this.position):m.project(l,this.position),p=!0}}a(u)&&(this._setTransform(u),p&&(o.normalize(this.position,this.position),o.negate(this.position,this.direction),o.multiplyByScalar(this.position,Math.max(c,n),this.position),o.normalize(this.direction,this.direction),o.cross(this.direction,this.up,this.right),o.cross(this.right,this.direction,this.up)))}}};var V=new r,B=new o,L=new o,b=new e,z=new e,U=new e,j=new e,q=new e;var H=new o;function k(t){var i=t._mode,r=!1,n=0;i===S.SCENE2D&&(r=(n=t.frustum.right-t.frustum.left)!==t._positionCartographic.height);var a=t._position,s=!o.equals(a,t.position)||r;s&&(a=o.clone(t.position,t._position));var h=t._direction,u=!o.equals(h,t.direction);u&&(o.normalize(t.direction,t.direction),h=o.clone(t.direction,t._direction));var c=t._up,d=!o.equals(c,t.up);d&&(o.normalize(t.up,t.up),c=o.clone(t.up,t._up));var m=t._right,l=!o.equals(m,t.right);l&&(o.normalize(t.right,t.right),m=o.clone(t.right,t._right));var p=t._transformChanged||t._modeChanged;t._transformChanged=!1,p&&(w.inverseTransformation(t._transform,t._invTransform),t._mode===S.COLUMBUS_VIEW||t._mode===S.SCENE2D?w.equals(w.IDENTITY,t._transform)?w.clone(D.TRANSFORM_2D,t._actualTransform):t._mode===S.COLUMBUS_VIEW?function(t){O.basisTo2D(t._projection,t._transform,t._actualTransform)}(t):function(t){var i=t._projection,r=i.ellipsoid,n=w.getColumn(t._transform,3,b),a=r.cartesianToCartographic(n,V),s=i.project(a,B),h=z;h.x=s.z,h.y=s.x,h.z=s.y,h.w=1;var u=e.clone(e.UNIT_X,q),c=e.add(w.getColumn(t._transform,0,L),n,L);r.cartesianToCartographic(c,a),i.project(a,s);var d=U;d.x=s.z,d.y=s.x,d.z=s.y,d.w=0,o.subtract(d,h,d),d.x=0;var m=j;if(o.magnitudeSquared(d)>v.EPSILON10)o.cross(u,d,m);else{var l=e.add(w.getColumn(t._transform,1,L),n,L);r.cartesianToCartographic(l,a),i.project(a,s),m.x=s.z,m.y=s.x,m.z=s.y,m.w=0,o.subtract(m,h,m),m.x=0,o.magnitudeSquared(m)<v.EPSILON10&&(e.clone(e.UNIT_Y,d),e.clone(e.UNIT_Z,m))}o.cross(m,u,d),o.normalize(d,d),o.cross(u,d,m),o.normalize(m,m),w.setColumn(t._actualTransform,0,d,t._actualTransform),w.setColumn(t._actualTransform,1,m,t._actualTransform),w.setColumn(t._actualTransform,2,u,t._actualTransform),w.setColumn(t._actualTransform,3,h,t._actualTransform)}(t):w.clone(t._transform,t._actualTransform),w.inverseTransformation(t._actualTransform,t._actualInvTransform),t._modeChanged=!1);var f=t._actualTransform;if(s||p)if(t._positionWC=w.multiplyByPoint(f,a,t._positionWC),i===S.SCENE3D||i===S.MORPHING)t._positionCartographic=t._projection.ellipsoid.cartesianToCartographic(t._positionWC,t._positionCartographic);else{var g=H;g.x=t._positionWC.y,g.y=t._positionWC.z,g.z=t._positionWC.x,i===S.SCENE2D&&(g.z=n),t._projection.unproject(g,t._positionCartographic)}if(u||d||l){var _=o.dot(h,o.cross(c,m,H));if(Math.abs(1-_)>v.EPSILON2){var C=1/o.magnitudeSquared(c),T=o.dot(c,h)*C,y=o.multiplyByScalar(h,T,H);c=o.normalize(o.subtract(c,y,t._up),t._up),o.clone(c,t.up),m=o.cross(h,c,t._right),o.clone(m,t.right)}}(u||p)&&(t._directionWC=w.multiplyByPointAsVector(f,h,t._directionWC),o.normalize(t._directionWC,t._directionWC)),(d||p)&&(t._upWC=w.multiplyByPointAsVector(f,c,t._upWC),o.normalize(t._upWC,t._upWC)),(l||p)&&(t._rightWC=w.multiplyByPointAsVector(f,m,t._rightWC),o.normalize(t._rightWC,t._rightWC)),(s||u||d||l||p)&&R(t)}function Y(t,i){var o;return o=v.equalsEpsilon(Math.abs(t.z),1,v.EPSILON3)?Math.atan2(i.y,i.x)-v.PI_OVER_TWO:Math.atan2(t.y,t.x)-v.PI_OVER_TWO,v.TWO_PI-v.zeroToTwoPi(o)}function G(t){return v.PI_OVER_TWO-v.acosClamped(t.z)}function Z(t,i,o){var e=0;return v.equalsEpsilon(Math.abs(t.z),1,v.EPSILON3)||(e=Math.atan2(-o.z,i.z),e=v.zeroToTwoPi(e+v.TWO_PI)),e}var Q=new w,X=new w;s(D.prototype,{transform:{get:function(){return this._transform}},inverseTransform:{get:function(){return k(this),this._invTransform}},viewMatrix:{get:function(){return k(this),this._viewMatrix}},inverseViewMatrix:{get:function(){return k(this),this._invViewMatrix}},positionCartographic:{get:function(){return k(this),this._positionCartographic}},positionWC:{get:function(){return k(this),this._positionWC}},directionWC:{get:function(){return k(this),this._directionWC}},upWC:{get:function(){return k(this),this._upWC}},rightWC:{get:function(){return k(this),this._rightWC}},heading:{get:function(){if(this._mode!==S.MORPHING){var t=this._projection.ellipsoid,i=w.clone(this._transform,Q),o=O.eastNorthUpToFixedFrame(this.positionWC,t,X);this._setTransform(o);var e=Y(this.direction,this.up);return this._setTransform(i),e}}},pitch:{get:function(){if(this._mode!==S.MORPHING){var t=this._projection.ellipsoid,i=w.clone(this._transform,Q),o=O.eastNorthUpToFixedFrame(this.positionWC,t,X);this._setTransform(o);var e=G(this.direction);return this._setTransform(i),e}}},roll:{get:function(){if(this._mode!==S.MORPHING){var t=this._projection.ellipsoid,i=w.clone(this._transform,Q),o=O.eastNorthUpToFixedFrame(this.positionWC,t,X);this._setTransform(o);var e=Z(this.direction,this.up,this.right);return this._setTransform(i),e}}},moveStart:{get:function(){return this._moveStart}},moveEnd:{get:function(){return this._moveEnd}},changed:{get:function(){return this._changed}}}),D.prototype.update=function(t){if(!a(t))throw new h("mode is required.");if(t===S.SCENE2D&&!(this.frustum instanceof y))throw new h("An OrthographicOffCenterFrustum is required in 2D.");if(!(t!==S.SCENE3D&&t!==S.COLUMBUS_VIEW||this.frustum instanceof E||this.frustum instanceof T))throw new h("A PerspectiveFrustum or OrthographicFrustum is required in 3D and Columbus view");var i=!1;if(t!==this._mode&&(this._mode=t,this._modeChanged=t!==S.MORPHING,i=this._mode===S.SCENE2D),i){var o=this._max2Dfrustum=this.frustum.clone();if(!(o instanceof y))throw new h("The camera frustum is expected to be orthographic for 2D camera control.");var e=o.top/o.right;o.right=2*this._maxCoord.x,o.left=-o.right,o.top=e*o.right,o.bottom=-o.top}this._mode===S.SCENE2D&&_t(this,this.position);var r=this._scene.globe,n=!a(r)||r._surface.tileProvider.ready&&0===r._surface._tileLoadQueueHigh.length&&0===r._surface._tileLoadQueueMedium.length&&0===r._surface._tileLoadQueueLow.length&&0===r._surface._debug.tilesWaitingForChildren;this._suspendTerrainAdjustment&&(this._suspendTerrainAdjustment=!n),n&&this._adjustHeightForTerrain()};var J=new o,K=new o,$=new o;D.prototype._setTransform=function(t){var i=o.clone(this.positionWC,J),e=o.clone(this.upWC,K),r=o.clone(this.directionWC,$);w.clone(t,this._transform),this._transformChanged=!0,k(this);var n=this._actualInvTransform;w.multiplyByPoint(n,i,this.position),w.multiplyByPointAsVector(n,r,this.direction),w.multiplyByPointAsVector(n,e,this.up),o.cross(this.direction,this.up,this.right),k(this)};var tt=new i,it=new W,ot=new o,et=new o;D.prototype._adjustOrthographicFrustum=function(t){if(this.frustum instanceof T&&(t||!(this._positionCartographic.height<15e4)))if(w.equals(w.IDENTITY,this.transform)){var i,e,r=this._scene,n=r.globe;if(a(n)){var s=tt;s.x=r.drawingBufferWidth/2,s.y=r.drawingBufferHeight/2;var h=this.getPickRay(s,it);if(i=n.pickWorldCoordinates(h,r,ot),r.pickPositionSupported&&(e=r.pickPositionWorldCoordinates(s,et)),a(i)&&a(e)){var u=a(e)?o.distance(e,this.positionWC):Number.POSITIVE_INFINITY,c=a(i)?o.distance(i,this.positionWC):Number.POSITIVE_INFINITY;this.frustum.width=Math.min(u,c)}else a(e)?this.frustum.width=o.distance(e,this.positionWC):a(i)&&(this.frustum.width=o.distance(i,this.positionWC))}if(!a(n)||!a(i)&&!a(e)){var d=Math.max(this.positionCartographic.height,0);this.frustum.width=d}}else this.frustum.width=o.magnitude(this.position)};var rt=new o,nt=new w,at=new w,st=new I,ht=new C,ut=new r;var ct=new o,dt=new o,mt=new o;function lt(t,i,e,r){var n=o.clone(e.direction,ct),a=o.clone(e.up,dt);if(t._scene.mode===S.SCENE3D){var s=t._projection.ellipsoid,h=O.eastNorthUpToFixedFrame(i,s,Q),u=w.inverseTransformation(h,X);w.multiplyByPointAsVector(u,n,n),w.multiplyByPointAsVector(u,a,a)}var c=o.cross(n,a,mt);return r.heading=Y(n,a),r.pitch=G(n),r.roll=Z(n,a,c),r}var pt={destination:void 0,orientation:{direction:void 0,up:void 0,heading:void 0,pitch:void 0,roll:void 0},convert:void 0,endTransform:void 0},ft=new f;D.prototype.setView=function(t){t=n(t,n.EMPTY_OBJECT);var e=n(t.orientation,n.EMPTY_OBJECT),r=this._mode;if(r!==S.MORPHING){a(t.endTransform)&&this._setTransform(t.endTransform);var s=n(t.convert,!0),h=n(t.destination,o.clone(this.positionWC,rt));a(h)&&a(h.west)&&(h=this.getRectangleCameraCoordinates(h,rt),s=!1),a(e.direction)&&(e=lt(this,h,e,pt.orientation)),ft.heading=n(e.heading,0),ft.pitch=n(e.pitch,-v.PI_OVER_TWO),ft.roll=n(e.roll,0),this._suspendTerrainAdjustment=!0,r===S.SCENE3D?function(t,i,e){var r=w.clone(t.transform,nt),n=O.eastNorthUpToFixedFrame(i,t._projection.ellipsoid,at);t._setTransform(n),o.clone(o.ZERO,t.position),e.heading=e.heading-v.PI_OVER_TWO;var a=I.fromHeadingPitchRoll(e,st),s=C.fromQuaternion(a,ht);C.getColumn(s,0,t.direction),C.getColumn(s,2,t.up),o.cross(t.direction,t.up,t.right),t._setTransform(r),t._adjustOrthographicFrustum(!0)}(this,h,ft):r===S.SCENE2D?function(t,e,r,n){var a=w.clone(t.transform,nt);if(t._setTransform(w.IDENTITY),!o.equals(e,t.positionWC)){if(n){var s=t._projection,h=s.ellipsoid.cartesianToCartographic(e,ut);e=s.project(h,rt)}i.clone(e,t.position);var u=.5*-e.z,c=-u,d=t.frustum;if(c>u){var m=d.top/d.right;d.right=c,d.left=u,d.top=d.right*m,d.bottom=-d.top}}if(t._scene.mapMode2D===M.ROTATE){r.heading=r.heading-v.PI_OVER_TWO,r.pitch=-v.PI_OVER_TWO,r.roll=0;var l=I.fromHeadingPitchRoll(r,st),p=C.fromQuaternion(l,ht);C.getColumn(p,2,t.up),o.cross(t.direction,t.up,t.right)}t._setTransform(a)}(this,h,ft,s):function(t,i,e,r){var n=w.clone(t.transform,nt);if(t._setTransform(w.IDENTITY),!o.equals(i,t.positionWC)){if(r){var a=t._projection,s=a.ellipsoid.cartesianToCartographic(i,ut);i=a.project(s,rt)}o.clone(i,t.position)}e.heading=e.heading-v.PI_OVER_TWO;var h=I.fromHeadingPitchRoll(e,st),u=C.fromQuaternion(h,ht);C.getColumn(u,0,t.direction),C.getColumn(u,2,t.up),o.cross(t.direction,t.up,t.right),t._setTransform(n),t._adjustOrthographicFrustum(!0)}(this,h,ft,s)}};var gt=new o;function _t(t,i){var o,e,r=t._scene.mapMode2D===M.ROTATE,n=t._maxCoord.x,a=t._maxCoord.y;r?o=-(e=n):(e=i.x-2*n,o=i.x+2*n),i.x>n&&(i.x=e),i.x<-n&&(i.x=o),i.y>a&&(i.y=a),i.y<-a&&(i.y=-a)}D.prototype.flyHome=function(t){var i=this._mode;if(i===S.MORPHING&&this._scene.completeMorph(),i===S.SCENE2D)this.flyTo({destination:D.DEFAULT_VIEW_RECTANGLE,duration:t,endTransform:w.IDENTITY});else if(i===S.SCENE3D){var e=this.getRectangleCameraCoordinates(D.DEFAULT_VIEW_RECTANGLE),r=o.magnitude(e);r+=r*D.DEFAULT_VIEW_FACTOR,o.normalize(e,e),o.multiplyByScalar(e,r,e),this.flyTo({destination:e,duration:t,endTransform:w.IDENTITY})}else if(i===S.COLUMBUS_VIEW){var n=this._projection.ellipsoid.maximumRadius,a=new o(0,-1,1);a=o.multiplyByScalar(o.normalize(a,a),5*n,a),this.flyTo({destination:a,duration:t,orientation:{heading:0,pitch:-Math.acos(o.normalize(a,gt).z),roll:0},endTransform:w.IDENTITY,convert:!1})}},D.prototype.worldToCameraCoordinates=function(t,i){if(!a(t))throw new h("cartesian is required.");return a(i)||(i=new e),k(this),w.multiplyByVector(this._actualInvTransform,t,i)},D.prototype.worldToCameraCoordinatesPoint=function(t,i){if(!a(t))throw new h("cartesian is required.");return a(i)||(i=new o),k(this),w.multiplyByPoint(this._actualInvTransform,t,i)},D.prototype.worldToCameraCoordinatesVector=function(t,i){if(!a(t))throw new h("cartesian is required.");return a(i)||(i=new o),k(this),w.multiplyByPointAsVector(this._actualInvTransform,t,i)},D.prototype.cameraToWorldCoordinates=function(t,i){if(!a(t))throw new h("cartesian is required.");return a(i)||(i=new e),k(this),w.multiplyByVector(this._actualTransform,t,i)},D.prototype.cameraToWorldCoordinatesPoint=function(t,i){if(!a(t))throw new h("cartesian is required.");return a(i)||(i=new o),k(this),w.multiplyByPoint(this._actualTransform,t,i)},D.prototype.cameraToWorldCoordinatesVector=function(t,i){if(!a(t))throw new h("cartesian is required.");return a(i)||(i=new o),k(this),w.multiplyByPointAsVector(this._actualTransform,t,i)};var vt=new o;D.prototype.move=function(t,i){if(!a(t))throw new h("direction is required.");var e=this.position;o.multiplyByScalar(t,i,vt),o.add(e,vt,e),this._mode===S.SCENE2D&&_t(this,e),this._adjustOrthographicFrustum(!0)},D.prototype.moveForward=function(t){t=n(t,this.defaultMoveAmount),this._mode===S.SCENE2D?Mt(this,t):this.move(this.direction,t)},D.prototype.moveBackward=function(t){t=n(t,this.defaultMoveAmount),this._mode===S.SCENE2D?Mt(this,-t):this.move(this.direction,-t)},D.prototype.moveUp=function(t){t=n(t,this.defaultMoveAmount),this.move(this.up,t)},D.prototype.moveDown=function(t){t=n(t,this.defaultMoveAmount),this.move(this.up,-t)},D.prototype.moveRight=function(t){t=n(t,this.defaultMoveAmount),this.move(this.right,t)},D.prototype.moveLeft=function(t){t=n(t,this.defaultMoveAmount),this.move(this.right,-t)},D.prototype.lookLeft=function(t){t=n(t,this.defaultLookAmount),this._mode!==S.SCENE2D&&this.look(this.up,-t)},D.prototype.lookRight=function(t){t=n(t,this.defaultLookAmount),this._mode!==S.SCENE2D&&this.look(this.up,t)},D.prototype.lookUp=function(t){t=n(t,this.defaultLookAmount),this._mode!==S.SCENE2D&&this.look(this.right,-t)},D.prototype.lookDown=function(t){t=n(t,this.defaultLookAmount),this._mode!==S.SCENE2D&&this.look(this.right,t)};var Ct=new I,wt=new C;D.prototype.look=function(t,i){if(!a(t))throw new h("axis is required.");var o=n(i,this.defaultLookAmount),e=I.fromAxisAngle(t,-o,Ct),r=C.fromQuaternion(e,wt),s=this.direction,u=this.up,c=this.right;C.multiplyByVector(r,s,s),C.multiplyByVector(r,u,u),C.multiplyByVector(r,c,c)},D.prototype.twistLeft=function(t){t=n(t,this.defaultLookAmount),this.look(this.direction,t)},D.prototype.twistRight=function(t){t=n(t,this.defaultLookAmount),this.look(this.direction,-t)};var Tt=new I,yt=new C;D.prototype.rotate=function(t,i){if(!a(t))throw new h("axis is required.");var e=n(i,this.defaultRotateAmount),r=I.fromAxisAngle(t,-e,Tt),s=C.fromQuaternion(r,yt);C.multiplyByVector(s,this.position,this.position),C.multiplyByVector(s,this.direction,this.direction),C.multiplyByVector(s,this.up,this.up),o.cross(this.direction,this.up,this.right),o.cross(this.right,this.direction,this.up),this._adjustOrthographicFrustum(!1)},D.prototype.rotateDown=function(t){Ot(this,t=n(t,this.defaultRotateAmount))},D.prototype.rotateUp=function(t){Ot(this,-(t=n(t,this.defaultRotateAmount)))};var Et=new o,It=new o,Wt=new o,Pt=new o;function Ot(t,i){var e=t.position;if(a(t.constrainedAxis)&&!o.equalsEpsilon(t.position,o.ZERO,v.EPSILON2)){var r=o.normalize(e,Et),n=o.equalsEpsilon(r,t.constrainedAxis,v.EPSILON2),s=o.equalsEpsilon(r,o.negate(t.constrainedAxis,Pt),v.EPSILON2);if(n||s)(n&&i<0||s&&i>0)&&t.rotate(t.right,i);else{var h=o.normalize(t.constrainedAxis,It),u=o.dot(r,h),c=v.acosClamped(u);i>0&&i>c&&(i=c-v.EPSILON4),u=o.dot(r,o.negate(h,Pt)),c=v.acosClamped(u),i<0&&-i>c&&(i=-c+v.EPSILON4);var d=o.cross(h,r,Wt);t.rotate(d,i)}}else t.rotate(t.right,i)}function xt(t,i){a(t.constrainedAxis)?t.rotate(t.constrainedAxis,i):t.rotate(t.up,i)}function Mt(t,i){var o,e=t.frustum;if(!(e instanceof y&&a(e.left)&&a(e.right)&&a(e.bottom)&&a(e.top)))throw new h("The camera frustum is expected to be orthographic for 2D camera control.");if(i*=.5,Math.abs(e.top)+Math.abs(e.bottom)>Math.abs(e.left)+Math.abs(e.right)){var r=e.top-i,n=e.bottom+i,s=t._maxCoord.y;t._scene.mapMode2D===M.ROTATE&&(s*=t.maximumZoomFactor),n>s&&(n=s,r=-s),r<=n&&(r=1,n=-1),o=e.right/e.top,e.top=r,e.bottom=n,e.right=e.top*o,e.left=-e.right}else{var u=e.right-i,c=e.left+i,d=t._maxCoord.x;t._scene.mapMode2D===M.ROTATE&&(d*=t.maximumZoomFactor),u>d&&(u=d,c=-d),u<=c&&(u=1,c=-1),o=e.top/e.right,e.right=u,e.left=c,e.top=e.right*o,e.bottom=-e.top}}function St(t,i){t.move(t.direction,i)}D.prototype.rotateRight=function(t){xt(this,-(t=n(t,this.defaultRotateAmount)))},D.prototype.rotateLeft=function(t){xt(this,t=n(t,this.defaultRotateAmount))},D.prototype.zoomIn=function(t){t=n(t,this.defaultZoomAmount),this._mode===S.SCENE2D?Mt(this,t):St(this,t)},D.prototype.zoomOut=function(t){t=n(t,this.defaultZoomAmount),this._mode===S.SCENE2D?Mt(this,-t):St(this,-t)},D.prototype.getMagnitude=function(){return this._mode===S.SCENE3D?o.magnitude(this.position):this._mode===S.COLUMBUS_VIEW?Math.abs(this.position.z):this._mode===S.SCENE2D?Math.max(this.frustum.right-this.frustum.left,this.frustum.top-this.frustum.bottom):void 0};var Nt=new w;D.prototype.lookAt=function(t,i){if(!a(t))throw new h("target is required");if(!a(i))throw new h("offset is required");if(this._mode===S.MORPHING)throw new h("lookAt is not supported while morphing.");var o=O.eastNorthUpToFixedFrame(t,c.WGS84,Nt);this.lookAtTransform(o,i)};var Dt=new o,Rt=new I,At=new I,Ft=new C;function Vt(t,i,e){i=v.clamp(i,-v.PI_OVER_TWO,v.PI_OVER_TWO),t=v.zeroToTwoPi(t)-v.PI_OVER_TWO;var r=I.fromAxisAngle(o.UNIT_Y,-i,Rt),n=I.fromAxisAngle(o.UNIT_Z,-t,At),a=I.multiply(n,r,n),s=C.fromQuaternion(a,Ft),h=o.clone(o.UNIT_X,Dt);return C.multiplyByVector(s,h,h),o.negate(h,h),o.multiplyByScalar(h,e,h),h}D.prototype.lookAtTransform=function(t,e){if(!a(t))throw new h("transform is required");if(this._mode===S.MORPHING)throw new h("lookAtTransform is not supported while morphing.");if(this._setTransform(t),a(e)){var r;if(r=a(e.heading)?Vt(e.heading,e.pitch,e.range):e,this._mode===S.SCENE2D){i.clone(i.ZERO,this.position),o.negate(r,this.up),this.up.z=0,o.magnitudeSquared(this.up)<v.EPSILON10&&o.clone(o.UNIT_Y,this.up),o.normalize(this.up,this.up),this._setTransform(w.IDENTITY),o.negate(o.UNIT_Z,this.direction),o.cross(this.direction,this.up,this.right),o.normalize(this.right,this.right);var n=this.frustum,s=n.top/n.right;return n.right=.5*o.magnitude(r),n.left=-n.right,n.top=s*n.right,n.bottom=-n.top,void this._setTransform(t)}o.clone(r,this.position),o.negate(this.position,this.direction),o.normalize(this.direction,this.direction),o.cross(this.direction,o.UNIT_Z,this.right),o.magnitudeSquared(this.right)<v.EPSILON10&&o.clone(o.UNIT_X,this.right),o.normalize(this.right,this.right),o.cross(this.right,this.direction,this.up),o.normalize(this.up,this.up),this._adjustOrthographicFrustum(!0)}};var Bt,Lt=new r,bt=new r,zt=new o,Ut=new o,jt=new o,qt=new o,Ht=new o,kt=new o,Yt=new o,Gt=new o,Zt={direction:new o,right:new o,up:new o};function Qt(t,i,e,r){return Math.abs(o.dot(i,e))/r-o.dot(t,e)}function Xt(t,i,e,r){var n=t._projection.ellipsoid,s=r?t:Zt,h=i.north,u=i.south,c=i.east,m=i.west;m>c&&(c+=v.TWO_PI);var l,p=.5*(m+c);if(u<-v.PI_OVER_TWO+v.RADIANS_PER_DEGREE&&h>v.PI_OVER_TWO-v.RADIANS_PER_DEGREE)l=0;else{var f=Lt;f.longitude=p,f.latitude=h,f.height=0;var g=bt;g.longitude=p,g.latitude=u,g.height=0;var _=Bt;a(_)&&_.ellipsoid===n||(Bt=_=new d(void 0,void 0,n)),_.setEndPoints(f,g),l=_.interpolateUsingFraction(.5,Lt).latitude}var C=Lt;C.longitude=p,C.latitude=l,C.height=0;var w=n.cartographicToCartesian(C,Yt),y=Lt;y.longitude=c,y.latitude=h;var E=n.cartographicToCartesian(y,zt);y.longitude=m;var I=n.cartographicToCartesian(y,jt);y.longitude=p;var W=n.cartographicToCartesian(y,Ht);y.latitude=u;var P=n.cartographicToCartesian(y,kt);y.longitude=c;var O=n.cartographicToCartesian(y,qt);y.longitude=m;var x=n.cartographicToCartesian(y,Ut);o.subtract(I,w,I),o.subtract(O,w,O),o.subtract(E,w,E),o.subtract(x,w,x),o.subtract(W,w,W),o.subtract(P,w,P);var M=n.geodeticSurfaceNormal(w,s.direction);o.negate(M,M);var S=o.cross(M,o.UNIT_Z,s.right);o.normalize(S,S);var N,D=o.cross(S,M,s.up);if(t.frustum instanceof T){var R,A,F=Math.max(o.distance(E,I),o.distance(O,x)),V=Math.max(o.distance(E,O),o.distance(I,x)),B=t.frustum._offCenterFrustum.right/t.frustum._offCenterFrustum.top,L=V*B;F>L?A=(R=F)/B:(A=V,R=L),N=Math.max(R,A)}else{var b=Math.tan(.5*t.frustum.fovy),z=t.frustum.aspectRatio*b;if(N=Math.max(Qt(M,D,I,b),Qt(M,D,O,b),Qt(M,D,E,b),Qt(M,D,x,b),Qt(M,D,W,b),Qt(M,D,P,b),Qt(M,S,I,z),Qt(M,S,O,z),Qt(M,S,E,z),Qt(M,S,x,z),Qt(M,S,W,z),Qt(M,S,P,z)),u<0&&h>0){var U=Lt;U.longitude=m,U.latitude=0,U.height=0;var j=n.cartographicToCartesian(U,Gt);o.subtract(j,w,j),N=Math.max(N,Qt(M,D,j,b),Qt(M,S,j,z)),U.longitude=c,j=n.cartographicToCartesian(U,Gt),o.subtract(j,w,j),N=Math.max(N,Qt(M,D,j,b),Qt(M,S,j,z))}}return o.add(w,o.multiplyByScalar(M,-N,Gt),e)}var Jt=new r,Kt=new o,$t=new o;var ti=new r,ii=new o,oi=new o;D.prototype.getRectangleCameraCoordinates=function(t,i){if(!a(t))throw new h("rectangle is required");var e=this._mode;return a(i)||(i=new o),e===S.SCENE3D?Xt(this,t,i):e===S.COLUMBUS_VIEW?function(t,i,o){var e=t._projection;i.west>i.east&&(i=P.MAX_VALUE);var r=t._actualTransform,n=t._actualInvTransform,s=Jt;s.longitude=i.east,s.latitude=i.north;var h=e.project(s,Kt);w.multiplyByPoint(r,h,h),w.multiplyByPoint(n,h,h),s.longitude=i.west,s.latitude=i.south;var u=e.project(s,$t);if(w.multiplyByPoint(r,u,u),w.multiplyByPoint(n,u,u),o.x=.5*(h.x-u.x)+u.x,o.y=.5*(h.y-u.y)+u.y,a(t.frustum.fovy)){var c=Math.tan(.5*t.frustum.fovy),d=t.frustum.aspectRatio*c;o.z=.5*Math.max((h.x-u.x)/d,(h.y-u.y)/c)}else{var m=h.x-u.x,l=h.y-u.y;o.z=Math.max(m,l)}return o}(this,t,i):e===S.SCENE2D?function(t,i,o){var e=t._projection;i.west>i.east&&(i=P.MAX_VALUE);var r=ti;r.longitude=i.east,r.latitude=i.north;var n=e.project(r,ii);r.longitude=i.west,r.latitude=i.south;var a,s,h=e.project(r,oi),u=.5*Math.abs(n.x-h.x),c=.5*Math.abs(n.y-h.y),d=t.frustum.right/t.frustum.top,m=c*d;return u>m?s=(a=u)/d:(s=c,a=m),c=Math.max(2*a,2*s),o.x=.5*(n.x-h.x)+h.x,o.y=.5*(n.y-h.y)+h.y,(r=e.unproject(o,r)).height=c,o=e.project(r,o)}(this,t,i):void 0};var ei=new W;var ri=new W;var ni=new W;D.prototype.pickEllipsoid=function(t,i,e){if(!a(t))throw new h("windowPosition is required.");var r=this._scene.canvas;if(0!==r.clientWidth&&0!==r.clientHeight){if(a(e)||(e=new o),i=n(i,c.WGS84),this._mode===S.SCENE3D)e=function(t,i,o,e){o=n(o,c.WGS84);var r=t.getPickRay(i,ei),a=_.rayEllipsoid(r,o);if(a){var s=a.start>0?a.start:a.stop;return W.getPoint(r,s,e)}}(this,t,i,e);else if(this._mode===S.SCENE2D)e=function(t,i,e,r){var n=t.getPickRay(i,ri).origin;n=o.fromElements(n.y,n.z,0,n);var a=e.unproject(n);if(!(a.latitude<-v.PI_OVER_TWO||a.latitude>v.PI_OVER_TWO))return e.ellipsoid.cartographicToCartesian(a,r)}(this,t,this._projection,e);else{if(this._mode!==S.COLUMBUS_VIEW)return;e=function(t,i,e,r){var n=t.getPickRay(i,ni),a=-n.origin.x/n.direction.x;W.getPoint(n,a,r);var s=e.unproject(new o(r.y,r.z,0));if(!(s.latitude<-v.PI_OVER_TWO||s.latitude>v.PI_OVER_TWO||s.longitude<-Math.PI||s.longitude>Math.PI))return e.ellipsoid.cartographicToCartesian(s,r)}(this,t,this._projection,e)}return e}};var ai=new o,si=new o,hi=new o;var ui=new o;D.prototype.getPickRay=function(t,i){if(!a(t))throw new h("windowPosition is required.");a(i)||(i=new W);var e=this.frustum;return a(e.aspectRatio)&&a(e.fov)&&a(e.near)?function(t,i,e){var r=t._scene.canvas,n=r.clientWidth,a=r.clientHeight,s=Math.tan(.5*t.frustum.fovy),h=t.frustum.aspectRatio*s,u=t.frustum.near,c=2/n*i.x-1,d=2/a*(a-i.y)-1,m=t.positionWC;o.clone(m,e.origin);var l=o.multiplyByScalar(t.directionWC,u,ai);o.add(m,l,l);var p=o.multiplyByScalar(t.rightWC,c*u*h,si),f=o.multiplyByScalar(t.upWC,d*u*s,hi),g=o.add(l,p,e.direction);return o.add(g,f,g),o.subtract(g,m,g),o.normalize(g,g),e}(this,t,i):function(t,i,e){var r=t._scene.canvas,n=r.clientWidth,s=r.clientHeight,h=t.frustum;a(h._offCenterFrustum)&&(h=h._offCenterFrustum);var u=2/n*i.x-1;u*=.5*(h.right-h.left);var c=2/s*(s-i.y)-1;c*=.5*(h.top-h.bottom);var d=e.origin;return o.clone(t.position,d),o.multiplyByScalar(t.right,u,ui),o.add(ui,d,d),o.multiplyByScalar(t.up,c,ui),o.add(ui,d,d),o.clone(t.directionWC,e.direction),t._mode!==S.COLUMBUS_VIEW&&t._mode!==S.SCENE2D||o.fromElements(e.origin.z,e.origin.x,e.origin.y,e.origin),e}(this,t,i)};var ci=new o,di=new o;D.prototype.distanceToBoundingSphere=function(t){if(!a(t))throw new h("boundingSphere is required.");var i=o.subtract(this.positionWC,t.center,ci),e=o.multiplyByScalar(this.directionWC,o.dot(i,this.directionWC),di);return Math.max(0,o.magnitude(e)-t.radius)};var mi=new i;D.prototype.getPixelSize=function(t,i,o){if(!a(t))throw new h("boundingSphere is required.");if(!a(i))throw new h("drawingBufferWidth is required.");if(!a(o))throw new h("drawingBufferHeight is required.");var e=this.distanceToBoundingSphere(t),r=this.frustum.getPixelDimensions(i,o,e,mi);return Math.max(r.x,r.y)};var li=new o,pi=new o,fi=new o,gi=new o;function _i(t,i){var e=t.position,r=t.direction,n=t.worldToCameraCoordinatesVector(o.UNIT_X,li),a=-o.dot(n,e)/o.dot(n,r),s=o.add(e,o.multiplyByScalar(r,a,pi),pi);t.cameraToWorldCoordinatesPoint(s,s),e=t.cameraToWorldCoordinatesPoint(t.position,fi);var h=Math.tan(.5*t.frustum.fovy),c=t.frustum.aspectRatio*h,d=o.magnitude(o.subtract(e,s,gi)),m=c*d,l=h*d,p=t._maxCoord.x,f=t._maxCoord.y,g=Math.max(m-p,p),_=Math.max(l-f,f);if(e.z<-g||e.z>g||e.y<-_||e.y>_){var v=s.y<-g||s.y>g,C=s.z<-_||s.z>_;if(v||C)return function(t,i,e,r,n,a){var s=o.clone(i);return e.y>r?s.y-=e.y-r:e.y<-r&&(s.y+=-r-e.y),e.z>n?s.z-=e.z-n:e.z<-n&&(s.z+=-n-e.z),{easingFunction:u.EXPONENTIAL_OUT,startObject:{time:0},stopObject:{time:1},duration:a,update:function(e){var r=o.lerp(i,s,e.time,new o);t.worldToCameraCoordinatesPoint(r,t.position)}}}(t,e,s,g,_,i)}}D.prototype.createCorrectPositionTween=function(t){if(!a(t))throw new h("duration is required.");if(this._mode===S.COLUMBUS_VIEW)return _i(this,t)};var vi=new o,Ci={destination:void 0,heading:void 0,pitch:void 0,roll:void 0,duration:void 0,complete:void 0,cancel:void 0,endTransform:void 0,maximumHeight:void 0,easingFunction:void 0};D.prototype.cancelFlight=function(){a(this._currentFlight)&&(this._currentFlight.cancelTween(),this._currentFlight=void 0)},D.prototype.flyTo=function(t){var i=(t=n(t,n.EMPTY_OBJECT)).destination;if(!a(i))throw new h("destination is required.");if(this._mode!==S.MORPHING){this.cancelFlight();var o=n(t.orientation,n.EMPTY_OBJECT);if(a(o.direction)&&(o=lt(this,i,o,pt.orientation)),a(t.duration)&&t.duration<=0){var e=pt;return e.destination=t.destination,e.orientation.heading=o.heading,e.orientation.pitch=o.pitch,e.orientation.roll=o.roll,e.convert=t.convert,e.endTransform=t.endTransform,this.setView(e),void("function"==typeof t.complete&&t.complete())}var r=a(i.west);r&&(i=this.getRectangleCameraCoordinates(i,vi));var s,u=this;Ci.destination=i,Ci.heading=o.heading,Ci.pitch=o.pitch,Ci.roll=o.roll,Ci.duration=t.duration,Ci.complete=function(){s===u._currentFlight&&(u._currentFlight=void 0),a(t.complete)&&t.complete()},Ci.cancel=t.cancel,Ci.endTransform=t.endTransform,Ci.convert=!r&&t.convert,Ci.maximumHeight=t.maximumHeight,Ci.pitchAdjustHeight=t.pitchAdjustHeight,Ci.flyOverLongitude=t.flyOverLongitude,Ci.flyOverLongitudeWeight=t.flyOverLongitudeWeight,Ci.easingFunction=t.easingFunction;var c=this._scene;s=c.tweens.add(x.createTween(c,Ci)),this._currentFlight=s;var d=this._scene.preloadFlightCamera;this._mode!==S.SCENE2D?(a(d)||(d=D.clone(this)),d.setView({destination:i,orientation:o}),this._scene.preloadFlightCullingVolume=d.frustum.computeCullingVolume(d.positionWC,d.directionWC,d.upWC)):d=void 0}};var wi=100;function Ti(t,i,o){a(o)||(o=p.clone(D.DEFAULT_OFFSET));var e=t._scene.screenSpaceCameraController.minimumZoomDistance,r=t._scene.screenSpaceCameraController.maximumZoomDistance,n=o.range;if(!a(n)||0===n){var s=i.radius;0===s?o.range=wi:t.frustum instanceof T||t._mode===S.SCENE2D?o.range=function(t,i){var o,e,r=t.frustum;a(r._offCenterFrustum)&&(r=r._offCenterFrustum);var n=r.right/r.top,s=i*n;return i>s?e=(o=i)/n:(e=i,o=s),1.5*Math.max(o,e)}(t,s):o.range=function(t,i){var o=t.frustum,e=Math.tan(.5*o.fovy),r=o.aspectRatio*e;return Math.max(i/r,i/e)}(t,s),o.range=v.clamp(o.range,e,r)}return o}D.prototype.viewBoundingSphere=function(t,i){if(!a(t))throw new h("boundingSphere is required.");if(this._mode===S.MORPHING)throw new h("viewBoundingSphere is not supported while morphing.");i=Ti(this,t,i),this.lookAt(t.center,i)};var yi=new w,Ei=new o,Ii=new o,Wi=new o,Pi=new o,Oi=new e,xi=new I,Mi=new C;D.prototype.flyToBoundingSphere=function(t,i){if(!a(t))throw new h("boundingSphere is required.");i=n(i,n.EMPTY_OBJECT);var e=this._mode===S.SCENE2D||this._mode===S.COLUMBUS_VIEW;this._setTransform(w.IDENTITY);var r,s=Ti(this,t,i.offset);r=e?o.multiplyByScalar(o.UNIT_Z,s.range,Ei):Vt(s.heading,s.pitch,s.range);var u,d,m=O.eastNorthUpToFixedFrame(t.center,c.WGS84,yi);if(w.multiplyByPoint(m,r,r),!e){if(u=o.subtract(t.center,r,Ii),o.normalize(u,u),d=w.multiplyByPointAsVector(m,o.UNIT_Z,Wi),1-Math.abs(o.dot(u,d))<v.EPSILON6){var l=I.fromAxisAngle(u,s.heading,xi),p=C.fromQuaternion(l,Mi);o.fromCartesian4(w.getColumn(m,1,Oi),d),C.multiplyByVector(p,d,d)}var f=o.cross(u,d,Pi);o.cross(f,u,d),o.normalize(d,d)}this.flyTo({destination:r,orientation:{direction:u,up:d},duration:i.duration,complete:i.complete,cancel:i.cancel,endTransform:i.endTransform,maximumHeight:i.maximumHeight,easingFunction:i.easingFunction,flyOverLongitude:i.flyOverLongitude,flyOverLongitudeWeight:i.flyOverLongitudeWeight,pitchAdjustHeight:i.pitchAdjustHeight})};var Si=new o,Ni=new o,Di=new o,Ri=new o,Ai=[new o,new o,new o,new o];var Fi=new i,Vi=new o,Bi=[new r,new r,new r,new r];function Li(t,i,o,e,r,n){Fi.x=t,Fi.y=i;var s=e.pickEllipsoid(Fi,r,Vi);return a(s)?(Bi[o]=r.cartesianToCartographic(s,Bi[o]),1):(Bi[o]=r.cartesianToCartographic(n[o],Bi[o]),0)}return D.prototype.computeViewRectangle=function(i,e){i=n(i,c.WGS84);var r=this.frustum.computeCullingVolume(this.positionWC,this.directionWC,this.upWC),a=new t(o.ZERO,i.maximumRadius);if(r.computeVisibility(a)!==g.OUTSIDE){var s=this._scene.canvas,h=s.clientWidth,u=s.clientHeight,d=0,m=function(t,i){var e,r,n=i.radii,a=t.positionWC,s=o.multiplyComponents(i.oneOverRadii,a,Si),h=o.magnitude(s),u=o.normalize(s,Ni);o.equalsEpsilon(u,o.UNIT_Z,v.EPSILON10)?(e=new o(0,1,0),r=new o(0,0,1)):(e=o.normalize(o.cross(o.UNIT_Z,u,Di),Di),r=o.normalize(o.cross(u,e,Ri),Ri));var c=Math.sqrt(o.magnitudeSquared(s)-1),d=o.multiplyByScalar(u,1/h,Si),m=c/h,l=o.multiplyByScalar(e,m,Ni),p=o.multiplyByScalar(r,m,Di),f=o.add(d,p,Ai[0]);o.subtract(f,l,f),o.multiplyComponents(n,f,f);var g=o.subtract(d,p,Ai[1]);o.subtract(g,l,g),o.multiplyComponents(n,g,g);var _=o.subtract(d,p,Ai[2]);o.add(_,l,_),o.multiplyComponents(n,_,_);var C=o.add(d,p,Ai[3]);return o.add(C,l,C),o.multiplyComponents(n,C,C),Ai}(this,i);if(d+=Li(0,0,0,this,i,m),d+=Li(0,u,1,this,i,m),d+=Li(h,u,2,this,i,m),(d+=Li(h,0,3,this,i,m))<2)return P.MAX_VALUE;e=P.fromCartographicArray(Bi,e);for(var l=0,p=Bi[3].longitude,f=0;f<4;++f){var _=Bi[f].longitude,C=Math.abs(_-p);C>v.PI?l+=v.TWO_PI-C:l+=C,p=_}return v.equalsEpsilon(Math.abs(l),v.TWO_PI,v.EPSILON9)&&(e.west=-v.PI,e.east=v.PI,Bi[0].latitude>=0?e.north=v.PI_OVER_TWO:e.south=-v.PI_OVER_TWO),e}},D.prototype.switchToPerspectiveFrustum=function(){if(!(this._mode===S.SCENE2D||this.frustum instanceof E)){var t=this._scene;this.frustum=new E,this.frustum.aspectRatio=t.drawingBufferWidth/t.drawingBufferHeight,this.frustum.fov=v.toRadians(60)}},D.prototype.switchToOrthographicFrustum=function(){if(!(this._mode===S.SCENE2D||this.frustum instanceof T)){var t=this._scene;this.frustum=new T,this.frustum.aspectRatio=t.drawingBufferWidth/t.drawingBufferHeight,this.frustum.width=o.magnitude(this.position);var i=this.frustum.projectionMatrix;a(i)&&this._adjustOrthographicFrustum(!0)}},D.clone=function(t,i){return a(i)||(i=new D(t._scene)),o.clone(t.position,i.position),o.clone(t.direction,i.direction),o.clone(t.up,i.up),o.clone(t.right,i.right),w.clone(t._transform,i.transform),i._transformChanged=!0,i.frustum=t.frustum.clone(),i},D});