define(["./Check","./ComponentDatatype","./defaultValue","./defined","./defineProperties"],function(e,t,n,r,o){"use strict";function u(e,t,r){e=n(e,0),t=n(t,0),r=n(r,0),this.value=new Float32Array([e,t,r])}return o(u.prototype,{componentDatatype:{get:function(){return t.FLOAT}},componentsPerAttribute:{get:function(){return 3}},normalize:{get:function(){return!1}}}),u.fromCartesian3=function(t){return e.defined("offset",t),new u(t.x,t.y,t.z)},u.toValue=function(t,n){return e.defined("offset",t),r(n)||(n=new Float32Array([t.x,t.y,t.z])),n[0]=t.x,n[1]=t.y,n[2]=t.z,n},u});