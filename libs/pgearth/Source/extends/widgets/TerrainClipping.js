define(["../../Core/defined","../../Core/DeveloperError","../../Core/Cartesian3","../../Core/Plane","../../Scene/ClippingPlane"],function(e,n,r,i,t){function o(r){if(!e(r.points))throw new n("points is required.");this.points=r.points||[]}return o.prototype.getClippingPlanes=function(){for(var e=this.points,n=this.points.length,o=[],a=0;a<n;++a){var s=(a+1)%n,p=r.add(e[a],e[s],new r);p=r.multiplyByScalar(p,.5,p);var l=r.normalize(p,new r),u=r.subtract(e[s],p,new r);u=r.normalize(u,u);var c=r.cross(u,l,new r);c=r.normalize(c,c);var w=new i(c,0),f=i.getPointDistance(w,p);o.push(new t(c,f))}return o},o});