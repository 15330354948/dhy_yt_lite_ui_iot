define(["../ThirdParty/Uri","./defined","./DeveloperError"],function(r,e,i){"use strict";return function(n){if(!e(n))throw new i("uri is required.");var t=new r(n);t.normalize();var u=t.path,a=u.lastIndexOf("/");return-1!==a&&(u=u.substr(a+1)),u}});