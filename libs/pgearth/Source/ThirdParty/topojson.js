!function(){var t={version:"1.6.18",mesh:function(n){return u(n,e.apply(this,arguments))},meshArcs:e,merge:function(n){return u(n,o.apply(this,arguments))},mergeArcs:o,feature:function(n,t){return"GeometryCollection"===t.type?{type:"FeatureCollection",features:t.geometries.map(function(t){return i(n,t)})}:i(n,t)},neighbors:function(n){var t={},r=n.map(function(){return[]});function e(n,r){n.forEach(function(n){n<0&&(n=~n);var e=t[n];e?e.push(r):t[n]=[r]})}function o(n,t){n.forEach(function(n){e(n,t)})}var i={LineString:e,MultiLineString:o,Polygon:o,MultiPolygon:function(n,t){n.forEach(function(n){o(n,t)})}};for(var u in n.forEach(function n(t,r){"GeometryCollection"===t.type?t.geometries.forEach(function(t){n(t,r)}):t.type in i&&i[t.type](t.arcs,r)}),t)for(var c=t[u],a=c.length,s=0;s<a;++s)for(var l=s+1;l<a;++l){var h,p=c[s],v=c[l];(h=r[p])[u=f(h,v)]!==v&&h.splice(u,0,v),(h=r[v])[u=f(h,p)]!==p&&h.splice(u,0,p)}return r},presimplify:function(n,t){var r=s(n.transform),e=function(n){if(!n)return l;var t,r,e=n.scale[0],o=n.scale[1],i=n.translate[0],u=n.translate[1];return function(n,f){f||(t=r=0);var c=(n[0]-i)/e|0,a=(n[1]-u)/o|0;n[0]=c-t,n[1]=a-r,t=c,r=a}}(n.transform),o=function(){var n={},t=[],r=0;function e(n,r){for(;r>0;){var e=(r+1>>1)-1,o=t[e];if(a(n,o)>=0)break;t[o._=r]=o,t[n._=r=e]=n}}function o(n,e){for(;;){var o=e+1<<1,i=o-1,u=e,f=t[u];if(i<r&&a(t[i],f)<0&&(f=t[u=i]),o<r&&a(t[o],f)<0&&(f=t[u=o]),u===e)break;t[f._=e]=f,t[n._=e=u]=n}}return n.push=function(n){return e(t[n._=r]=n,r++),r},n.pop=function(){if(!(r<=0)){var n,e=t[0];return--r>0&&(n=t[r],o(t[n._=0]=n,0)),e}},n.remove=function(n){var i,u=n._;if(t[u]===n)return u!==--r&&(a(i=t[r],n)<0?e:o)(t[i._=u]=i,u),u},n}();t||(t=c);function i(n){o.remove(n),n[1][2]=t(n),o.push(n)}return n.arcs.forEach(function(n){for(var u,f,c=[],a=0,s=0,l=n.length;s<l;++s)f=n[s],r(n[s]=[f[0],f[1],1/0],s);for(s=1,l=n.length-1;s<l;++s)(u=n.slice(s-1,s+2))[1][2]=t(u),c.push(u),o.push(u);for(s=0,l=c.length;s<l;++s)(u=c[s]).previous=c[s-1],u.next=c[s+1];for(;u=o.pop();){var h=u.previous,p=u.next;u[1][2]<a?u[1][2]=a:a=u[1][2],h&&(h.next=p,h[2]=u[2],i(h)),p&&(p.previous=h,p[0]=u[0],i(p))}n.forEach(e)}),n}};function r(n,t){var r={},e={},o={},i=[],u=-1;function f(n,t){for(var e in n){var o=n[e];delete t[o.start],delete o.start,delete o.end,o.forEach(function(n){r[n<0?~n:n]=1}),i.push(o)}}return t.forEach(function(r,e){var o,i=n.arcs[r<0?~r:r];i.length<3&&!i[1][0]&&!i[1][1]&&(o=t[++u],t[u]=r,t[e]=o)}),t.forEach(function(t){var r,i,u=function(t){var r,e=n.arcs[t<0?~t:t],o=e[0];n.transform?(r=[0,0],e.forEach(function(n){r[0]+=n[0],r[1]+=n[1]})):r=e[e.length-1];return t<0?[r,o]:[o,r]}(t),f=u[0],c=u[1];if(r=o[f])if(delete o[r.end],r.push(t),r.end=c,i=e[c]){delete e[i.start];var a=i===r?r:r.concat(i);e[a.start=r.start]=o[a.end=i.end]=a}else e[r.start]=o[r.end]=r;else if(r=e[c])if(delete e[r.start],r.unshift(t),r.start=f,i=o[f]){delete o[i.end];var s=i===r?r:i.concat(r);e[s.start=i.start]=o[s.end=r.end]=s}else e[r.start]=o[r.end]=r;else e[(r=[t]).start=f]=o[r.end=c]=r}),f(o,e),f(e,o),t.forEach(function(n){r[n<0?~n:n]||i.push([n])}),i}function e(n,t,e){var o=[];if(arguments.length>1){var i,u=[];function f(n){var t=n<0?~n:n;(u[t]||(u[t]=[])).push({i:n,g:i})}function c(n){n.forEach(f)}function a(n){n.forEach(c)}var s={LineString:c,MultiLineString:a,Polygon:a,MultiPolygon:function(n){n.forEach(a)}};!function n(t){"GeometryCollection"===t.type?t.geometries.forEach(n):t.type in s&&(i=t,s[t.type](t.arcs))}(t),u.forEach(arguments.length<3?function(n){o.push(n[0].i)}:function(n){e(n[0].g,n[n.length-1].g)&&o.push(n[0].i)})}else for(var l=0,h=n.arcs.length;l<h;++l)o.push(l);return{type:"MultiLineString",arcs:r(n,o)}}function o(t,e){var o={},i=[],f=[];function c(n){n.forEach(function(t){t.forEach(function(t){(o[t=t<0?~t:t]||(o[t]=[])).push(n)})}),i.push(n)}function a(n){return function(n){var t,r=-1,e=n.length,o=n[e-1],i=0;for(;++r<e;)t=o,o=n[r],i+=t[0]*o[1]-t[1]*o[0];return.5*i}(u(t,{type:"Polygon",arcs:[n]}).coordinates[0])>0}return e.forEach(function(n){"Polygon"===n.type?c(n.arcs):"MultiPolygon"===n.type&&n.arcs.forEach(c)}),i.forEach(function(n){if(!n._){var t=[],r=[n];for(n._=1,f.push(t);n=r.pop();)t.push(n),n.forEach(function(n){n.forEach(function(n){o[n<0?~n:n].forEach(function(n){n._||(n._=1,r.push(n))})})})}}),i.forEach(function(n){delete n._}),{type:"MultiPolygon",arcs:f.map(function(e){var i=[];if(e.forEach(function(n){n.forEach(function(n){n.forEach(function(n){o[n<0?~n:n].length<2&&i.push(n)})})}),i=r(t,i),(n=i.length)>1)for(var u,f=a(e[0][0]),c=0;c<n;++c)if(f===a(i[c])){u=i[0],i[0]=i[c],i[c]=u;break}return i})}}function i(n,t){var r={type:"Feature",id:t.id,properties:t.properties||{},geometry:u(n,t)};return null==t.id&&delete r.id,r}function u(n,t){var r=s(n.transform),e=n.arcs;function o(n,t){t.length&&t.pop();for(var o,i=e[n<0?~n:n],u=0,f=i.length;u<f;++u)t.push(o=i[u].slice()),r(o,u);n<0&&function(n,t){var r,e=n.length,o=e-t;for(;o<--e;)r=n[o],n[o++]=n[e],n[e]=r}(t,f)}function i(n){return n=n.slice(),r(n,0),n}function u(n){for(var t=[],r=0,e=n.length;r<e;++r)o(n[r],t);return t.length<2&&t.push(t[0].slice()),t}function f(n){for(var t=u(n);t.length<4;)t.push(t[0].slice());return t}function c(n){return n.map(f)}var a={Point:function(n){return i(n.coordinates)},MultiPoint:function(n){return n.coordinates.map(i)},LineString:function(n){return u(n.arcs)},MultiLineString:function(n){return n.arcs.map(u)},Polygon:function(n){return c(n.arcs)},MultiPolygon:function(n){return n.arcs.map(c)}};return function n(t){var r=t.type;return"GeometryCollection"===r?{type:r,geometries:t.geometries.map(n)}:r in a?{type:r,coordinates:a[r](t)}:null}(t)}function f(n,t){for(var r=0,e=n.length;r<e;){var o=r+e>>>1;n[o]<t?r=o+1:e=o}return r}function c(n){var t=n[0],r=n[1],e=n[2];return Math.abs((t[0]-e[0])*(r[1]-t[1])-(t[0]-r[0])*(e[1]-t[1]))}function a(n,t){return n[1][2]-t[1][2]}function s(n){if(!n)return l;var t,r,e=n.scale[0],o=n.scale[1],i=n.translate[0],u=n.translate[1];return function(n,f){f||(t=r=0),n[0]=(t+=n[0])*e+i,n[1]=(r+=n[1])*o+u}}function l(){}"function"==typeof define&&define.amd?define(t):"object"==typeof module&&module.exports?module.exports=t:this.topojson=t}();