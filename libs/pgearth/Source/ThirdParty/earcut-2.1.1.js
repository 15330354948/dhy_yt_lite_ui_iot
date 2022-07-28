define([],function(){"use strict";function n(n,x,i){i=i||2;var u,v,y,p,a,h,s,c=x&&x.length,Z=c?x[0]*i:n.length,g=e(n,0,Z,i,!0),d=[];if(!g)return d;if(c&&(g=function(n,r,x,i){var u,v,y,p,a,h=[];for(u=0,v=r.length;u<v;u++)y=r[u]*i,p=u<v-1?r[u+1]*i:n.length,(a=e(n,y,p,i,!1))===a.next&&(a.steiner=!0),h.push(l(a));for(h.sort(f),u=0;u<h.length;u++)o(h[u],x),x=t(x,x.next);return x}(n,x,g,i)),n.length>80*i){u=y=n[0],v=p=n[1];for(var w=i;w<Z;w+=i)a=n[w],h=n[w+1],a<u&&(u=a),h<v&&(v=h),a>y&&(y=a),h>p&&(p=h);s=Math.max(y-u,p-v)}return r(g,d,i,u,v,s),d}function e(n,e,t,r,x){var i,u;if(x===b(n,e,t,r)>0)for(i=e;i<t;i+=r)u=d(i,n[i],n[i+1],u);else for(i=t-r;i>=e;i-=r)u=d(i,n[i],n[i+1],u);return u&&s(u,u.next)&&(w(u),u=u.next),u}function t(n,e){if(!n)return n;e||(e=n);var t,r=n;do{if(t=!1,r.steiner||!s(r,r.next)&&0!==h(r.prev,r,r.next))r=r.next;else{if(w(r),(r=e=r.prev)===r.next)return null;t=!0}}while(t||r!==e);return e}function r(n,e,f,o,l,p,a){if(n){!a&&p&&function(n,e,t,r){var x=n;do{null===x.z&&(x.z=y(x.x,x.y,e,t,r)),x.prevZ=x.prev,x.nextZ=x.next,x=x.next}while(x!==n);x.prevZ.nextZ=null,x.prevZ=null,function(n){var e,t,r,x,i,u,v,f,o=1;do{for(t=n,n=null,i=null,u=0;t;){for(u++,r=t,v=0,e=0;e<o&&(v++,r=r.nextZ);e++);for(f=o;v>0||f>0&&r;)0===v?(x=r,r=r.nextZ,f--):0!==f&&r?t.z<=r.z?(x=t,t=t.nextZ,v--):(x=r,r=r.nextZ,f--):(x=t,t=t.nextZ,v--),i?i.nextZ=x:n=x,x.prevZ=i,i=x;t=r}i.nextZ=null,o*=2}while(u>1)}(x)}(n,o,l,p);for(var h,s,c=n;n.prev!==n.next;)if(h=n.prev,s=n.next,p?i(n,o,l,p):x(n))e.push(h.i/f),e.push(n.i/f),e.push(s.i/f),w(n),n=s.next,c=s.next;else if((n=s)===c){a?1===a?r(n=u(n,e,f),e,f,o,l,p,2):2===a&&v(n,e,f,o,l,p):r(t(n),e,f,o,l,p,1);break}}}function x(n){var e=n.prev,t=n,r=n.next;if(h(e,t,r)>=0)return!1;for(var x=n.next.next;x!==n.prev;){if(p(e.x,e.y,t.x,t.y,r.x,r.y,x.x,x.y)&&h(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function i(n,e,t,r){var x=n.prev,i=n,u=n.next;if(h(x,i,u)>=0)return!1;for(var v=x.x<i.x?x.x<u.x?x.x:u.x:i.x<u.x?i.x:u.x,f=x.y<i.y?x.y<u.y?x.y:u.y:i.y<u.y?i.y:u.y,o=x.x>i.x?x.x>u.x?x.x:u.x:i.x>u.x?i.x:u.x,l=x.y>i.y?x.y>u.y?x.y:u.y:i.y>u.y?i.y:u.y,a=y(v,f,e,t,r),s=y(o,l,e,t,r),c=n.nextZ;c&&c.z<=s;){if(c!==n.prev&&c!==n.next&&p(x.x,x.y,i.x,i.y,u.x,u.y,c.x,c.y)&&h(c.prev,c,c.next)>=0)return!1;c=c.nextZ}for(c=n.prevZ;c&&c.z>=a;){if(c!==n.prev&&c!==n.next&&p(x.x,x.y,i.x,i.y,u.x,u.y,c.x,c.y)&&h(c.prev,c,c.next)>=0)return!1;c=c.prevZ}return!0}function u(n,e,t){var r=n;do{var x=r.prev,i=r.next.next;!s(x,i)&&c(x,r,r.next,i)&&Z(x,i)&&Z(i,x)&&(e.push(x.i/t),e.push(r.i/t),e.push(i.i/t),w(r),w(r.next),r=n=i),r=r.next}while(r!==n);return r}function v(n,e,x,i,u,v){var f=n;do{for(var o=f.next.next;o!==f.prev;){if(f.i!==o.i&&a(f,o)){var y=g(f,o);return f=t(f,f.next),y=t(y,y.next),r(f,e,x,i,u,v),void r(y,e,x,i,u,v)}o=o.next}f=f.next}while(f!==n)}function f(n,e){return n.x-e.x}function o(n,e){if(e=function(n,e){var t,r=e,x=n.x,i=n.y,u=-1/0;do{if(i<=r.y&&i>=r.next.y){var v=r.x+(i-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(v<=x&&v>u){if(u=v,v===x){if(i===r.y)return r;if(i===r.next.y)return r.next}t=r.x<r.next.x?r:r.next}}r=r.next}while(r!==e);if(!t)return null;if(x===u)return t.prev;var f,o=t,y=t.x,l=t.y,a=1/0;r=t.next;for(;r!==o;)x>=r.x&&r.x>=y&&p(i<l?x:u,i,y,l,i<l?u:x,i,r.x,r.y)&&((f=Math.abs(i-r.y)/(x-r.x))<a||f===a&&r.x>t.x)&&Z(r,n)&&(t=r,a=f),r=r.next;return t}(n,e)){var r=g(e,n);t(r,r.next)}}function y(n,e,t,r,x){return(n=1431655765&((n=858993459&((n=252645135&((n=16711935&((n=32767*(n-t)/x)|n<<8))|n<<4))|n<<2))|n<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=32767*(e-r)/x)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function l(n){var e=n,t=n;do{e.x<t.x&&(t=e),e=e.next}while(e!==n);return t}function p(n,e,t,r,x,i,u,v){return(x-u)*(e-v)-(n-u)*(i-v)>=0&&(n-u)*(r-v)-(t-u)*(e-v)>=0&&(t-u)*(i-v)-(x-u)*(r-v)>=0}function a(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!function(n,e){var t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&c(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}(n,e)&&Z(n,e)&&Z(e,n)&&function(n,e){var t=n,r=!1,x=(n.x+e.x)/2,i=(n.y+e.y)/2;do{t.y>i!=t.next.y>i&&x<(t.next.x-t.x)*(i-t.y)/(t.next.y-t.y)+t.x&&(r=!r),t=t.next}while(t!==n);return r}(n,e)}function h(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function s(n,e){return n.x===e.x&&n.y===e.y}function c(n,e,t,r){return!!(s(n,e)&&s(t,r)||s(n,r)&&s(t,e))||h(n,e,t)>0!=h(n,e,r)>0&&h(t,r,n)>0!=h(t,r,e)>0}function Z(n,e){return h(n.prev,n,n.next)<0?h(n,e,n.next)>=0&&h(n,n.prev,e)>=0:h(n,e,n.prev)<0||h(n,n.next,e)<0}function g(n,e){var t=new z(n.i,n.x,n.y),r=new z(e.i,e.x,e.y),x=n.next,i=e.prev;return n.next=e,e.prev=n,t.next=x,x.prev=t,r.next=t,t.prev=r,i.next=r,r.prev=i,r}function d(n,e,t,r){var x=new z(n,e,t);return r?(x.next=r.next,x.prev=r,r.next.prev=x,r.next=x):(x.prev=x,x.next=x),x}function w(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function z(n,e,t){this.i=n,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}function b(n,e,t,r){for(var x=0,i=e,u=t-r;i<t;i+=r)x+=(n[u]-n[i])*(n[i+1]+n[u+1]),u=i;return x}return n.deviation=function(n,e,t,r){var x=e&&e.length,i=x?e[0]*t:n.length,u=Math.abs(b(n,0,i,t));if(x)for(var v=0,f=e.length;v<f;v++){var o=e[v]*t,y=v<f-1?e[v+1]*t:n.length;u-=Math.abs(b(n,o,y,t))}var l=0;for(v=0;v<r.length;v+=3){var p=r[v]*t,a=r[v+1]*t,h=r[v+2]*t;l+=Math.abs((n[p]-n[h])*(n[a+1]-n[p+1])-(n[p]-n[a])*(n[h+1]-n[p+1]))}return 0===u&&0===l?0:Math.abs((l-u)/u)},n.flatten=function(n){for(var e=n[0][0].length,t={vertices:[],holes:[],dimensions:e},r=0,x=0;x<n.length;x++){for(var i=0;i<n[x].length;i++)for(var u=0;u<e;u++)t.vertices.push(n[x][i][u]);x>0&&(r+=n[x-1].length,t.holes.push(r))}return t},n});