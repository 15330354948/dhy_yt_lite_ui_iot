define(["../Core/BoundingRectangle","../Core/Cartesian2","../Core/Cartesian3","../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/EllipsoidalOccluder","../Core/Event","../Core/Matrix4","../Scene/Billboard","../Scene/BillboardCollection","../Scene/Label","../Scene/LabelCollection","../Scene/PointPrimitive","../Scene/PointPrimitiveCollection","../Scene/SceneMode","../ThirdParty/kdbush"],function(t,i,e,l,o,n,s,r,c,d,a,u,h,_,b,C,v){"use strict";function p(t){t=l(t,l.EMPTY_OBJECT),this._enabled=l(t.enabled,!1),this._pixelRange=l(t.pixelRange,80),this._minimumClusterSize=l(t.minimumClusterSize,2),this._clusterBillboards=l(t.clusterBillboards,!0),this._clusterLabels=l(t.clusterLabels,!0),this._clusterPoints=l(t.clusterPoints,!0),this._labelCollection=void 0,this._billboardCollection=void 0,this._pointCollection=void 0,this._clusterBillboardCollection=void 0,this._clusterLabelCollection=void 0,this._clusterPointCollection=void 0,this._collectionIndicesByEntity={},this._unusedLabelIndices=[],this._unusedBillboardIndices=[],this._unusedPointIndices=[],this._previousClusters=[],this._previousHeight=void 0,this._enabledDirty=!1,this._clusterDirty=!1,this._cluster=void 0,this._removeEventListener=void 0,this._clusterEvent=new r}function y(t){return t.coord.x}function g(t){return t.coord.y}function m(t,i){t.x-=i,t.y-=i,t.width+=2*i,t.height+=2*i}var f=new t;function B(i,e,l,n,s){if(o(i._labelCollection)&&n._clusterLabels?s=u.getScreenSpaceBoundingBox(i,e,s):o(i._billboardCollection)&&n._clusterBillboards?s=d.getScreenSpaceBoundingBox(i,e,s):o(i._pointPrimitiveCollection)&&n._clusterPoints&&(s=_.getScreenSpaceBoundingBox(i,e,s)),m(s,l),n._clusterLabels&&!o(i._labelCollection)&&o(i.id)&&L(n,i.id)&&o(i.id._label)){var r=n._collectionIndicesByEntity[i.id],c=n._labelCollection.get(r),a=u.getScreenSpaceBoundingBox(c,e,f);m(a,l),s=t.union(s,a,s)}return s}function I(t,i){if(t.clusterShow=!0,!o(t._labelCollection)&&o(t.id)&&L(i,t.id)&&o(t.id._label)){var e=i._collectionIndicesByEntity[t.id];i._labelCollection.get(e).clusterShow=!0}}function x(t,i,e,l){var o={billboard:l._clusterBillboardCollection.add(),label:l._clusterLabelCollection.add(),point:l._clusterPointCollection.add()};o.billboard.show=!1,o.point.show=!1,o.label.show=!0,o.label.text=i.toLocaleString(),o.label.id=e,o.billboard.position=o.label.position=o.point.position=t,l._clusterEvent.raiseEvent(e,o)}function L(t,i){return o(t)&&o(t._collectionIndicesByEntity[i])&&o(t._collectionIndicesByEntity[i].labelIndex)}function P(t,i,e,l,n){if(o(t))for(var s=t.length,r=0;r<s;++r){var c=t.get(r);if(c.clusterShow=!1,c.show&&(n._scene.mode!==C.SCENE3D||l.isPointVisible(c.position))){var d=n._clusterLabels&&o(c._labelCollection),a=n._clusterBillboards&&o(c.id._billboard),u=n._clusterPoints&&o(c.id._point);if(!d||!u&&!a){var h=c.computeScreenSpacePosition(e);o(h)&&i.push({index:r,collection:t,clustered:!1,coord:h})}}}}var E=new t,S=new t,w=new t;function D(t,i,e,l){return function(n){var s=this[t];o(this._collectionIndicesByEntity)||(this._collectionIndicesByEntity={});var r,c,d=this._collectionIndicesByEntity[n.id];if(o(d)||(d=this._collectionIndicesByEntity[n.id]={billboardIndex:void 0,labelIndex:void 0,pointIndex:void 0}),o(s)&&o(d[l]))return s.get(d[l]);o(s)||(s=this[t]=new i({scene:this._scene}));var a=this[e];return a.length>0?(r=a.pop(),c=s.get(r)):(c=s.add(),r=s.length-1),d[l]=r,this._clusterDirty=!0,c}}function R(t,i){var e=t._collectionIndicesByEntity[i];o(e.billboardIndex)||o(e.labelIndex)||o(e.pointIndex)||delete t._collectionIndicesByEntity[i]}function z(t){if(o(t))for(var i=t.length,e=0;e<i;++e)t.get(e).clusterShow=!0}return p.prototype._initialize=function(l){this._scene=l;var n,r=(n=this,function(l){if(!(o(l)&&l<.05)&&n.enabled){var r=n._scene,u=n._labelCollection,_=n._billboardCollection,C=n._pointCollection;if((o(u)||o(_)||o(C))&&(n._clusterBillboards||n._clusterLabels||n._clusterPoints)){var p=n._clusterLabelCollection,m=n._clusterBillboardCollection,f=n._clusterPointCollection;o(p)?p.removeAll():p=n._clusterLabelCollection=new h({scene:r}),o(m)?m.removeAll():m=n._clusterBillboardCollection=new a({scene:r}),o(f)?f.removeAll():f=n._clusterPointCollection=new b;var L,D,R,z,H,M,T,A,O,V,W,N=n._pixelRange,Y=n._minimumClusterSize,Z=n._previousClusters,j=[],k=n._previousHeight,J=r.camera.positionCartographic.height,q=r.mapProjection.ellipsoid,F=r.camera.positionWC,G=new s(q,F),K=[];n._clusterLabels&&P(u,K,r,G,n),n._clusterBillboards&&P(_,K,r,G,n),n._clusterPoints&&P(C,K,r,G,n);var Q=v(K,y,g,64,Int32Array);if(J<k)for(R=Z.length,L=0;L<R;++L){var U=Z[L];if(G.isPointVisible(U.position)){var X=d._computeScreenSpacePosition(c.IDENTITY,U.position,e.ZERO,i.ZERO,r);if(o(X)){var $=1-J/k,tt=U.width=U.width*$,it=U.height=U.height*$;tt=Math.max(tt,U.minimumWidth),it=Math.max(it,U.minimumHeight);var et=X.x-.5*tt,lt=X.y-.5*it,ot=X.x+tt,nt=X.y+it;for(M=(H=Q.range(et,lt,ot,nt)).length,O=0,A=[],D=0;D<M;++D)(T=K[H[D]]).clustered||(++O,V=T.collection,W=T.index,A.push(V.get(W).id));if(O>=Y)for(x(U.position,O,A,n),j.push(U),D=0;D<M;++D)K[H[D]].clustered=!0}}}for(R=K.length,L=0;L<R;++L){var st=K[L];if(!st.clustered){st.clustered=!0,V=st.collection,W=st.index;var rt=V.get(W);z=B(rt,st.coord,N,n,E);var ct=t.clone(z,S);M=(H=Q.range(z.x,z.y,z.x+z.width,z.y+z.height)).length;var dt=e.clone(rt.position);for(O=1,A=[rt.id],D=0;D<M;++D)if(!(T=K[H[D]]).clustered){var at=T.collection.get(T.index),ut=B(at,T.coord,N,n,w);e.add(at.position,dt,dt),t.union(ct,ut,ct),++O,A.push(at.id)}if(O>=Y){var ht=e.multiplyByScalar(dt,1/O,dt);for(x(ht,O,A,n),j.push({position:ht,width:ct.width,height:ct.height,minimumWidth:z.width,minimumHeight:z.height}),D=0;D<M;++D)K[H[D]].clustered=!0}else I(rt,n)}}0===p.length&&(p.destroy(),n._clusterLabelCollection=void 0),0===m.length&&(m.destroy(),n._clusterBillboardCollection=void 0),0===f.length&&(f.destroy(),n._clusterPointCollection=void 0),n._previousClusters=j,n._previousHeight=J}}});this._cluster=r,this._removeEventListener=l.camera.changed.addEventListener(r)},n(p.prototype,{enabled:{get:function(){return this._enabled},set:function(t){this._enabledDirty=t!==this._enabled,this._enabled=t}},pixelRange:{get:function(){return this._pixelRange},set:function(t){this._clusterDirty=this._clusterDirty||t!==this._pixelRange,this._pixelRange=t}},minimumClusterSize:{get:function(){return this._minimumClusterSize},set:function(t){this._clusterDirty=this._clusterDirty||t!==this._minimumClusterSize,this._minimumClusterSize=t}},clusterEvent:{get:function(){return this._clusterEvent}},clusterBillboards:{get:function(){return this._clusterBillboards},set:function(t){this._clusterDirty=this._clusterDirty||t!==this._clusterBillboards,this._clusterBillboards=t}},clusterLabels:{get:function(){return this._clusterLabels},set:function(t){this._clusterDirty=this._clusterDirty||t!==this._clusterLabels,this._clusterLabels=t}},clusterPoints:{get:function(){return this._clusterPoints},set:function(t){this._clusterDirty=this._clusterDirty||t!==this._clusterPoints,this._clusterPoints=t}}}),p.prototype.getLabel=D("_labelCollection",h,"_unusedLabelIndices","labelIndex"),p.prototype.removeLabel=function(t){var i=this._collectionIndicesByEntity&&this._collectionIndicesByEntity[t.id];if(o(this._labelCollection)&&o(i)&&o(i.labelIndex)){var e=i.labelIndex;i.labelIndex=void 0,R(this,t.id);var l=this._labelCollection.get(e);l.show=!1,l.text="",l.id=void 0,this._unusedLabelIndices.push(e),this._clusterDirty=!0}},p.prototype.getBillboard=D("_billboardCollection",a,"_unusedBillboardIndices","billboardIndex"),p.prototype.removeBillboard=function(t){var i=this._collectionIndicesByEntity&&this._collectionIndicesByEntity[t.id];if(o(this._billboardCollection)&&o(i)&&o(i.billboardIndex)){var e=i.billboardIndex;i.billboardIndex=void 0,R(this,t.id);var l=this._billboardCollection.get(e);l.id=void 0,l.show=!1,l.image=void 0,this._unusedBillboardIndices.push(e),this._clusterDirty=!0}},p.prototype.getPoint=D("_pointCollection",b,"_unusedPointIndices","pointIndex"),p.prototype.removePoint=function(t){var i=this._collectionIndicesByEntity&&this._collectionIndicesByEntity[t.id];if(o(this._pointCollection)&&o(i)&&o(i.pointIndex)){var e=i.pointIndex;i.pointIndex=void 0,R(this,t.id);var l=this._pointCollection.get(e);l.show=!1,l.id=void 0,this._unusedPointIndices.push(e),this._clusterDirty=!0}},p.prototype.update=function(t){var i,e;o(this._labelCollection)&&this._labelCollection.length>0&&0===this._labelCollection.get(0)._glyphs.length&&(i=t.commandList,t.commandList=[],this._labelCollection.update(t),t.commandList=i),o(this._billboardCollection)&&this._billboardCollection.length>0&&!o(this._billboardCollection.get(0).width)&&(i=t.commandList,t.commandList=[],this._billboardCollection.update(t),t.commandList=i),this._enabledDirty&&(this._enabledDirty=!1,(e=this).enabled||(o(e._clusterLabelCollection)&&e._clusterLabelCollection.destroy(),o(e._clusterBillboardCollection)&&e._clusterBillboardCollection.destroy(),o(e._clusterPointCollection)&&e._clusterPointCollection.destroy(),e._clusterLabelCollection=void 0,e._clusterBillboardCollection=void 0,e._clusterPointCollection=void 0,z(e._labelCollection),z(e._billboardCollection),z(e._pointCollection)),this._clusterDirty=!0),this._clusterDirty&&(this._clusterDirty=!1,this._cluster()),o(this._clusterLabelCollection)&&this._clusterLabelCollection.update(t),o(this._clusterBillboardCollection)&&this._clusterBillboardCollection.update(t),o(this._clusterPointCollection)&&this._clusterPointCollection.update(t),o(this._labelCollection)&&this._labelCollection.update(t),o(this._billboardCollection)&&this._billboardCollection.update(t),o(this._pointCollection)&&this._pointCollection.update(t)},p.prototype.destroy=function(){this._labelCollection=this._labelCollection&&this._labelCollection.destroy(),this._billboardCollection=this._billboardCollection&&this._billboardCollection.destroy(),this._pointCollection=this._pointCollection&&this._pointCollection.destroy(),this._clusterLabelCollection=this._clusterLabelCollection&&this._clusterLabelCollection.destroy(),this._clusterBillboardCollection=this._clusterBillboardCollection&&this._clusterBillboardCollection.destroy(),this._clusterPointCollection=this._clusterPointCollection&&this._clusterPointCollection.destroy(),o(this._removeEventListener)&&(this._removeEventListener(),this._removeEventListener=void 0),this._labelCollection=void 0,this._billboardCollection=void 0,this._pointCollection=void 0,this._clusterBillboardCollection=void 0,this._clusterLabelCollection=void 0,this._clusterPointCollection=void 0,this._collectionIndicesByEntity=void 0,this._unusedLabelIndices=[],this._unusedBillboardIndices=[],this._unusedPointIndices=[],this._previousClusters=[],this._previousHeight=void 0,this._enabledDirty=!1,this._pixelRangeDirty=!1,this._minimumClusterSizeDirty=!1},p});