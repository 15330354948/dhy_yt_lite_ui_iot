define(["./ComponentDatatype","./defaultValue","./defined","./defineProperties","./DeveloperError"],function(e,t,n,r,o){"use strict";function u(e){e=t(e,!0),this.value=u.toValue(e)}return r(u.prototype,{componentDatatype:{get:function(){return e.UNSIGNED_BYTE}},componentsPerAttribute:{get:function(){return 1}},normalize:{get:function(){return!1}}}),u.toValue=function(e,t){if(!n(e))throw new o("show is required.");return n(t)?(t[0]=e,t):new Uint8Array([e])},u});