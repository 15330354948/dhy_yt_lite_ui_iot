define(["../../DataSources/GeoJsonDataSource","../../Core/defined","../../Core/combine","../../Core/freezeObject","../../ThirdParty/Uri","../../Core/objectToQuery","../../Core/queryToObject","../../Core/defaultValue","../../Core/DeveloperError"],function(e,r,t,o,n,i,u,s,a){var c=o({service:"WFS",version:"1.0.0",request:"GetFeature"});function f(e){if(!r(e.url))throw new a("url is required");this.options=e}return f.prototype.execute=function(o){var a,f,l=new n(this.options.url),p=u(s(l.query,""));p=t(c,p),r(this.options.maxFeatures)&&(p.maxFeatures=this.options.maxFeatures),o.where&&(a="filter",f=o.where,r(p[a])||(p[a]=f)),l.query=i(p);var h=l.toString();this.getUrl=function(){return h};o.outFields;return new e.load(h,this.options)},f.prototype.insidePolygon=function(e,r){for(var t=r[0],o=r[1],n=!1,i=0,u=e.length-1;i<e.length;u=i++){var s=e[i][0],a=e[i][1],c=e[u][0],f=e[u][1];a>o!=f>o&&t<(c-s)*(o-a)/(f-a)+s&&(n=!n)}return n},f.prototype.pointInsideCircle=function(e,r,t){if(0===t)return!1;var o=r[0]-e[0],n=r[1]-e[1];return o*o+n*n<=t*t},f});