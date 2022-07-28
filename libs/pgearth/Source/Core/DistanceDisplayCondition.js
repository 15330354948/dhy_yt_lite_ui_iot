define(["./defaultValue","./defined","./defineProperties","./DeveloperError"],function(r,e,n,t){"use strict";function i(e,n){e=r(e,0),this._near=e,n=r(n,Number.MAX_VALUE),this._far=n}return n(i.prototype,{near:{get:function(){return this._near},set:function(r){this._near=r}},far:{get:function(){return this._far},set:function(r){this._far=r}}}),i.packedLength=2,i.pack=function(n,i,a){if(!e(n))throw new t("value is required");if(!e(i))throw new t("array is required");return a=r(a,0),i[a++]=n.near,i[a]=n.far,i},i.unpack=function(n,a,u){if(!e(n))throw new t("array is required");return a=r(a,0),e(u)||(u=new i),u.near=n[a++],u.far=n[a],u},i.equals=function(r,n){return r===n||e(r)&&e(n)&&r.near===n.near&&r.far===n.far},i.clone=function(r,n){if(e(r))return e(n)||(n=new i),n.near=r.near,n.far=r.far,n},i.prototype.clone=function(r){return i.clone(this,r)},i.prototype.equals=function(r){return i.equals(this,r)},i});