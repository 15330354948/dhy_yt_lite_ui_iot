define(["./Check","./defaultValue","./defined"],function(e,n,t){"use strict";return function(f,r,a,i){if(e.defined("array",f),e.defined("value",r),t(a)&&e.typeOf.number("start",a),t(i)&&e.typeOf.number("end",i),"function"==typeof f.fill)return f.fill(r,a,i);for(var u=f.length>>>0,d=n(a,0),l=d<0?Math.max(u+d,0):Math.min(d,u),h=n(i,u),m=h<0?Math.max(u+h,0):Math.min(h,u);l<m;)f[l]=r,l++;return f}});