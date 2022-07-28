define(["./defined","./DeveloperError"],function(e,r){"use strict";var t={type:"Linear",getRequiredDataPoints:function(e){return 2},interpolateOrderZero:function(t,n,a,i,o){if(2!==n.length)throw new r("The xTable provided to the linear interpolator must have exactly two elements.");if(i<=0)throw new r("There must be at least 1 dependent variable for each independent variable.");var l,d,u;e(o)||(o=new Array(i));var f=n[0],h=n[1];if(f===h)throw new r("Divide by zero error: xTable[0] and xTable[1] are equal");for(l=0;l<i;l++)d=a[l],u=a[l+i],o[l]=((u-d)*t+h*d-f*u)/(h-f);return o}};return t});