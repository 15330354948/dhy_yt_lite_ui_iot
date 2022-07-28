define(["./Cartesian3","./defined","./DeveloperError"],function(e,r,t){"use strict";var n={solve:function(n,a,l,h){if(!(r(n)&&n instanceof Array))throw new t("The array lower is required.");if(!(r(a)&&a instanceof Array))throw new t("The array diagonal is required.");if(!(r(l)&&l instanceof Array))throw new t("The array upper is required.");if(!(r(h)&&h instanceof Array))throw new t("The array right is required.");if(a.length!==h.length)throw new t("diagonal and right must have the same lengths.");if(n.length!==l.length)throw new t("lower and upper must have the same lengths.");if(n.length!==a.length-1)throw new t("lower and upper must be one less than the length of diagonal.");var i,o,s=new Array(l.length),u=new Array(h.length),y=new Array(h.length);for(i=0;i<u.length;i++)u[i]=new e,y[i]=new e;for(s[0]=l[0]/a[0],u[0]=e.multiplyByScalar(h[0],1/a[0],u[0]),i=1;i<s.length;++i)o=1/(a[i]-s[i-1]*n[i-1]),s[i]=l[i]*o,u[i]=e.subtract(h[i],e.multiplyByScalar(u[i-1],n[i-1],u[i]),u[i]),u[i]=e.multiplyByScalar(u[i],o,u[i]);for(o=1/(a[i]-s[i-1]*n[i-1]),u[i]=e.subtract(h[i],e.multiplyByScalar(u[i-1],n[i-1],u[i]),u[i]),u[i]=e.multiplyByScalar(u[i],o,u[i]),y[y.length-1]=u[u.length-1],i=y.length-2;i>=0;--i)y[i]=e.subtract(u[i],e.multiplyByScalar(y[i+1],s[i],y[i]),y[i]);return y}};return n});