define(["./Cartesian3","./Cartesian4","./defaultValue","./defined","./DeveloperError","./Intersect","./Plane"],function(e,n,r,t,i,a,o){"use strict";function u(e){this.planes=r(e,[])}var l=[new e,new e,new e];e.clone(e.UNIT_X,l[0]),e.clone(e.UNIT_Y,l[1]),e.clone(e.UNIT_Z,l[2]);var I=new e,s=new e,S=new o(new e(1,0,0),0);return u.fromBoundingSphere=function(r,a){if(!t(r))throw new i("boundingSphere is required.");t(a)||(a=new u);var o=l.length,S=a.planes;S.length=2*o;for(var f=r.center,w=r.radius,E=0,d=0;d<o;++d){var c=l[d],T=S[E],p=S[E+1];t(T)||(T=S[E]=new n),t(p)||(p=S[E+1]=new n),e.multiplyByScalar(c,-w,I),e.add(f,I,I),T.x=c.x,T.y=c.y,T.z=c.z,T.w=-e.dot(c,I),e.multiplyByScalar(c,w,I),e.add(f,I,I),p.x=-c.x,p.y=-c.y,p.z=-c.z,p.w=-e.dot(e.negate(c,s),I),E+=2}return a},u.prototype.computeVisibility=function(e){if(!t(e))throw new i("boundingVolume is required.");for(var n=this.planes,r=!1,u=0,l=n.length;u<l;++u){var I=e.intersectPlane(o.fromCartesian4(n[u],S));if(I===a.OUTSIDE)return a.OUTSIDE;I===a.INTERSECTING&&(r=!0)}return r?a.INTERSECTING:a.INSIDE},u.prototype.computeVisibilityWithPlaneMask=function(e,n){if(!t(e))throw new i("boundingVolume is required.");if(!t(n))throw new i("parentPlaneMask is required.");if(n===u.MASK_OUTSIDE||n===u.MASK_INSIDE)return n;for(var r=u.MASK_INSIDE,l=this.planes,I=0,s=l.length;I<s;++I){var f=I<31?1<<I:0;if(!(I<31&&0==(n&f))){var w=e.intersectPlane(o.fromCartesian4(l[I],S));if(w===a.OUTSIDE)return u.MASK_OUTSIDE;w===a.INTERSECTING&&(r|=f)}}return r},u.MASK_OUTSIDE=4294967295,u.MASK_INSIDE=0,u.MASK_INDETERMINATE=2147483647,u});