define(["../Core/AssociativeArray","../Core/Color","../Core/defined","../Core/DistanceDisplayCondition","../Core/DistanceDisplayConditionGeometryInstanceAttribute","../Core/ShowGeometryInstanceAttribute","../Scene/GroundPrimitive","./BoundingSphereState","./Property"],function(t,i,e,s,r,o,n,a,h){"use strict";var l=new i,v=new s,d=new s;function u(i,e,s,r,o){this.primitives=i,this.zIndex=o,this.classificationType=e,this.color=s,this.key=r,this.createPrimitive=!1,this.waitingOnCreate=!1,this.primitive=void 0,this.oldPrimitive=void 0,this.geometry=new t,this.updaters=new t,this.updatersWithAttributes=new t,this.attributes=new t,this.subscriptions=new t,this.showsUpdated=new t,this.itemsToRemove=[],this.isDirty=!1}u.prototype.add=function(t,i){var e=t.id;if(this.createPrimitive=!0,this.geometry.set(e,i),this.updaters.set(e,t),t.hasConstantFill&&t.fillMaterialProperty.isConstant&&h.isConstant(t.distanceDisplayConditionProperty)){var s=this;this.subscriptions.set(e,t.entity.definitionChanged.addEventListener(function(i,e,r,o){"isShowing"===e&&s.showsUpdated.set(t.id,t)}))}else this.updatersWithAttributes.set(e,t)},u.prototype.remove=function(t){var i=t.id;if(this.createPrimitive=this.geometry.remove(i)||this.createPrimitive,this.updaters.remove(i)){this.updatersWithAttributes.remove(i);var s=this.subscriptions.get(i);return e(s)&&(s(),this.subscriptions.remove(i),this.showsUpdated.remove(i)),!0}return!1};var p=new Array(4);function m(i,e){this._batches=new t,this._primitives=i,this._classificationType=e}return u.prototype.update=function(t){var a,u=!0,m=0,c=this.primitive,y=this.primitives;if(this.createPrimitive){var f=this.geometry.values;if(f.length>0)e(c)&&(e(this.oldPrimitive)?y.remove(c):this.oldPrimitive=c),c=new n({show:!1,asynchronous:!0,geometryInstances:f,classificationType:this.classificationType}),y.add(c,this.zIndex),u=!1;else{e(c)&&(y.remove(c),c=void 0);var g=this.oldPrimitive;e(g)&&(y.remove(g),this.oldPrimitive=void 0)}this.attributes.removeAll(),this.primitive=c,this.createPrimitive=!1,this.waitingOnCreate=!0}else if(e(c)&&c.ready){c.show=!0,e(this.oldPrimitive)&&(y.remove(this.oldPrimitive),this.oldPrimitive=void 0);var w=this.updatersWithAttributes.values,C=w.length,b=this.waitingOnCreate;for(a=0;a<C;a++){var P=w[a],D=this.geometry.get(P.id),A=this.attributes.get(D.id.id);if(e(A)||(A=c.getGeometryInstanceAttributes(D.id),this.attributes.set(D.id.id,A)),!P.fillMaterialProperty.isConstant||b){var _=P.fillMaterialProperty.color,I=h.getValueOrDefault(_,t,i.WHITE,l);if(!i.equals(A._lastColor,I)){A._lastColor=i.clone(I,A._lastColor);var S=this.color,T=I.toBytes(p);S[0]===T[0]&&S[1]===T[1]&&S[2]===T[2]&&S[3]===T[3]||(this.itemsToRemove[m++]=P)}}var O=P.entity.isShowing&&(P.hasConstantFill||P.isFilled(t));O!==(1===A.show[0])&&(A.show=o.toValue(O,A.show));var G=P.distanceDisplayConditionProperty;if(!h.isConstant(G)){var B=h.getValueOrDefault(G,t,d,v);s.equals(B,A._lastDistanceDisplayCondition)||(A._lastDistanceDisplayCondition=s.clone(B,A._lastDistanceDisplayCondition),A.distanceDisplayCondition=r.toValue(B,A.distanceDisplayCondition))}}this.updateShows(c),this.waitingOnCreate=!1}else e(c)&&!c.ready&&(u=!1);return this.itemsToRemove.length=m,u},u.prototype.updateShows=function(t){for(var i=this.showsUpdated.values,s=i.length,r=0;r<s;r++){var n=i[r],a=this.geometry.get(n.id),h=this.attributes.get(a.id.id);e(h)||(h=t.getGeometryInstanceAttributes(a.id),this.attributes.set(a.id.id,h));var l=n.entity.isShowing;l!==(1===h.show[0])&&(h.show=o.toValue(l,h.show),a.attributes.show.value[0]=h.show[0])}this.showsUpdated.removeAll()},u.prototype.contains=function(t){return this.updaters.contains(t.id)},u.prototype.getBoundingSphere=function(t,i){var s=this.primitive;if(!s.ready)return a.PENDING;var r=s.getBoundingSphere(t.entity);return e(r)?(r.clone(i),a.DONE):a.FAILED},u.prototype.removeAllPrimitives=function(){var t=this.primitives,i=this.primitive;e(i)&&(t.remove(i),this.primitive=void 0,this.geometry.removeAll(),this.updaters.removeAll());var s=this.oldPrimitive;e(s)&&(t.remove(s),this.oldPrimitive=void 0)},m.prototype.add=function(t,i){var e,s=i.createFillGeometryInstance(t),r=this._batches,o=h.getValueOrDefault(i.zIndex,0),n=new Uint32Array(s.attributes.color.value.buffer)[0]+":"+o;return r.contains(n)?e=r.get(n):(e=new u(this._primitives,this._classificationType,s.attributes.color.value,n,o),r.set(n,e)),e.add(i,s),e},m.prototype.remove=function(t){for(var i=this._batches.values,e=i.length,s=0;s<e;++s)if(i[s].remove(t))return},m.prototype.update=function(t){var i,e,s=!0,r=this._batches,o=r.values,n=o.length;for(i=0;i<n;++i)s=o[i].update(t)&&s;for(i=0;i<n;++i)for(var a=o[i],h=a.itemsToRemove,l=h.length,v=0;v<l;v++){e=h[v],a.remove(e);var d=this.add(t,e);a.isDirty=!0,d.isDirty=!0}var u=o.slice(),p=u.length;for(i=0;i<p;++i){var m=u[i];m.isDirty&&(s=u[i].update(t)&&s,m.isDirty=!1),0===m.geometry.length&&r.remove(m.key)}return s},m.prototype.getBoundingSphere=function(t,i){for(var e=this._batches.values,s=e.length,r=0;r<s;++r){var o=e[r];if(o.contains(t))return o.getBoundingSphere(t,i)}return a.FAILED},m.prototype.removeAllPrimitives=function(){for(var t=this._batches.values,i=t.length,e=0;e<i;++e)t[e].removeAllPrimitives()},m});