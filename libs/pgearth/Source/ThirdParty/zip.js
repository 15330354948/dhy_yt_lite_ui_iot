define(["../Core/buildModuleUrl","../Core/defineProperties"],function(t,e){var n={};return function(n){var i,r,o="File format is not recognized.",a="File contains encrypted entry.",c="File is using Zip64 (4gb+ file size).",f="Error while reading zip file.",s="Error while writing zip file.",u="Error while writing file data.",l="Error while reading file data.",g="File already exists.",w=524288,h="inflate.js",v="deflate.js",d="text/plain",p="message";try{i=0===new Blob([new DataView(new ArrayBuffer(0))]).size}catch(t){}function y(){var t=-1,e=this;e.append=function(n){var i,r=e.table;for(i=0;i<n.length;i++)t=t>>>8^r[255&(t^n[i])]},e.get=function(){return~t}}function U(t,e){var n,i;return n=new ArrayBuffer(t),i=new Uint8Array(n),e&&i.set(e,0),{buffer:n,array:i,view:new DataView(n)}}function m(){}function z(t){var e,n=this;n.size=0,n.init=function(i,r){var o=new Blob([t],{type:d});(e=new b(o)).init(function(){n.size=e.size,i()},r)},n.readUint8Array=function(t,n,i,r){e.readUint8Array(t,n,i,r)}}function A(t){var e,n=this;n.size=0,n.init=function(i){for(var r=t.length;"="==t.charAt(r-1);)r--;e=t.indexOf(",")+1,n.size=Math.floor(.75*(r-e)),i()},n.readUint8Array=function(n,i,r){var o,a=U(i),c=4*Math.floor(n/3),f=4*Math.ceil((n+i)/3),s=window.atob(t.substring(c+e,f+e)),u=n-3*Math.floor(c/4);for(o=u;o<u+i;o++)a.array[o-u]=s.charCodeAt(o);r(a.array)}}function b(t){this.size=0,this.init=function(e){this.size=t.size,e()},this.readUint8Array=function(e,n,i,r){var o=new FileReader;o.onload=function(t){i(new Uint8Array(t.target.result))},o.onerror=r,o.readAsArrayBuffer(function(t,e,n){return t.slice?t.slice(e,e+n):t.webkitSlice?t.webkitSlice(e,e+n):t.mozSlice?t.mozSlice(e,e+n):t.msSlice?t.msSlice(e,e+n):void 0}(t,e,n))}}function M(){}function S(t){var e;this.init=function(t){e=new Blob([],{type:d}),t()},this.writeUint8Array=function(t,n){e=new Blob([e,i?t:t.buffer],{type:d}),n()},this.getData=function(n,i){var r=new FileReader;r.onload=function(t){n(t.target.result)},r.onerror=i,r.readAsText(e,t)}}function D(t){var e="",n="";this.init=function(n){e+="data:"+(t||"")+";base64,",n()},this.writeUint8Array=function(t,i){var r,o=n.length,a=n;for(n="",r=0;r<3*Math.floor((o+t.length)/3)-o;r++)a+=String.fromCharCode(t[r]);for(;r<t.length;r++)n+=String.fromCharCode(t[r]);a.length>2?e+=window.btoa(a):n=a,i()},this.getData=function(t){t(e+window.btoa(n))}}function L(t){var e;this.init=function(n){e=new Blob([],{type:t}),n()},this.writeUint8Array=function(n,r){e=new Blob([e,i?n:n.buffer],{type:t}),r()},this.getData=function(t){t(e)}}function F(t,e,n,i,r,o,a,c,f,s){var u,l,g=0;function h(){t.removeEventListener(p,v,!1),c(l)}function v(t){var e=t.data,i=e.data;e.onappend&&(l+=i.length,n.writeUint8Array(i,function(){o(!1,i),d()},s)),e.onflush&&(i?(l+=i.length,n.writeUint8Array(i,function(){o(!1,i),h()},s)):h()),e.progress&&a&&a(u+e.current,r)}function d(){(u=g*w)<r?e.readUint8Array(i+u,Math.min(w,r-u),function(e){t.postMessage({append:!0,data:e}),g++,a&&a(u,r),o(!0,e)},f):t.postMessage({flush:!0})}l=0,t.addEventListener(p,v,!1),d()}function C(t,e,n,i,r,o,a,c,f,s){var u,l=0,g=0;!function h(){var v;(u=l*w)<r?e.readUint8Array(i+u,Math.min(w,r-u),function(e){var c=t.append(e,function(){a&&a(i+u,r)});g+=c.length,o(!0,e),n.writeUint8Array(c,function(){o(!1,c),l++,setTimeout(h,1)},s),a&&a(u,r)},f):(v=t.flush())?(g+=v.length,n.writeUint8Array(v,function(){o(!1,v),c(g)},s)):c(g)}()}function W(t,e,n,i,r,o,a,c,f){var s=0,u=new y;!function l(){var g=s*w;g<i?t.readUint8Array(n+g,Math.min(w,i-g),function(t){r&&u.append(t),a&&a(g,i,t),e.writeUint8Array(t,function(){s++,l()},f)},c):o(i,u.get())}()}function R(t){var e,n,i="",r=["Ç","ü","é","â","ä","à","å","ç","ê","ë","è","ï","î","ì","Ä","Å","É","æ","Æ","ô","ö","ò","û","ù","ÿ","Ö","Ü","ø","£","Ø","×","ƒ","á","í","ó","ú","ñ","Ñ","ª","º","¿","®","¬","½","¼","¡","«","»","_","_","_","¦","¦","Á","Â","À","©","¦","¦","+","+","¢","¥","+","+","-","-","+","-","+","ã","Ã","+","+","-","-","¦","-","+","¤","ð","Ð","Ê","Ë","È","i","Í","Î","Ï","+","+","_","_","¦","Ì","_","Ó","ß","Ô","Ò","õ","Õ","µ","þ","Þ","Ú","Û","Ù","ý","Ý","¯","´","­","±","_","¾","¶","§","÷","¸","°","¨","·","¹","³","²","_"," "];for(e=0;e<t.length;e++)i+=(n=255&t.charCodeAt(e))>127?r[n-128]:String.fromCharCode(n);return i}function k(t){return decodeURIComponent(escape(t))}function x(t){var e,n="";for(e=0;e<t.length;e++)n+=String.fromCharCode(t[e]);return n}function B(t,e,n,i,r){t.version=e.view.getUint16(n,!0),t.bitFlag=e.view.getUint16(n+2,!0),t.compressionMethod=e.view.getUint16(n+4,!0),t.lastModDateRaw=e.view.getUint32(n+6,!0),t.lastModDate=function(t){var e=(4294901760&t)>>16,n=65535&t;try{return new Date(1980+((65024&e)>>9),((480&e)>>5)-1,31&e,(63488&n)>>11,(2016&n)>>5,2*(31&n),0)}catch(t){}}(t.lastModDateRaw),1!=(1&t.bitFlag)?((i||8!=(8&t.bitFlag))&&(t.crc32=e.view.getUint32(n+10,!0),t.compressedSize=e.view.getUint32(n+14,!0),t.uncompressedSize=e.view.getUint32(n+18,!0)),4294967295!==t.compressedSize&&4294967295!==t.uncompressedSize?(t.filenameLength=e.view.getUint16(n+22,!0),t.extraFieldLength=e.view.getUint16(n+24,!0)):r(c)):r(a)}function E(t,e){function i(){}return i.prototype.getData=function(i,r,a,c){var f,s=this;function g(t,e){f&&f.terminate(),f=null,t&&t(e)}function w(t,e){c&&!function(t){var e=U(4);return e.view.setUint32(0,t),s.crc32==e.view.getUint32(0)}(e)?v():i.getData(function(t){g(r,t)})}function v(){g(e,l)}function d(){g(e,u)}t.readUint8Array(s.offset,30,function(r){var u,l=U(r.length,r);1347093252==l.view.getUint32(0)?(B(s,l,4,!1,e),u=s.offset+30+s.filenameLength+s.extraFieldLength,i.init(function(){0===s.compressionMethod?W(t,i,u,s.compressedSize,c,w,a,v,d):f=function(t,e,i,r,o,a,c,f,s){var u,l=new y;function g(t,e){o&&!t&&l.append(e)}function w(t){a(t,l.get())}return n.zip.useWebWorkers?F(u=new Worker(n.zip.workerScriptsPath+h),t,e,i,r,g,c,w,f,s):C(new n.zip.Inflater,t,e,i,r,g,c,w,f,s),u}(t,i,u,s.compressedSize,c,w,a,v,d)},d)):e(o)},v)},{getEntries:function(n){t.size<22?e(o):function n(i,r){t.readUint8Array(t.size-i,i,function(t){var e=U(t.length,t).view;1347093766!=e.getUint32(0)?n(i+1,r):r(e)},function(){e(f)})}(22,function(r){var a,c;a=r.getUint32(16,!0),c=r.getUint16(8,!0),t.readUint8Array(a,t.size-a,function(t){var r,a,f,s,u=0,l=[],g=U(t.length,t);for(r=0;r<c;r++){if(a=new i,1347092738!=g.view.getUint32(u))return void e(o);B(a,g,u+6,!0,e),a.commentLength=g.view.getUint16(u+32,!0),a.directory=16==(16&g.view.getUint8(u+38)),a.offset=g.view.getUint32(u+42,!0),f=x(g.array.subarray(u+46,u+46+a.filenameLength)),a.filename=2048==(2048&a.bitFlag)?k(f):R(f),a.directory||"/"!=a.filename.charAt(a.filename.length-1)||(a.directory=!0),s=x(g.array.subarray(u+46+a.filenameLength+a.extraFieldLength,u+46+a.filenameLength+a.extraFieldLength+a.commentLength)),a.comment=2048==(2048&a.bitFlag)?k(s):R(s),l.push(a),u+=46+a.filenameLength+a.extraFieldLength+a.commentLength}n(l)},function(){e(f)})})},close:function(t){t&&t()}}}function _(t){return unescape(encodeURIComponent(t))}function P(t){var e,n=[];for(e=0;e<t.length;e++)n.push(t.charCodeAt(e));return n}function I(t,e,i){var r,o={},a=[],c=0;function f(t,e){r&&r.terminate(),r=null,t&&t(e)}function u(){f(e,s)}function w(){f(e,l)}return{add:function(s,l,h,d,m){var z,A,b;function M(e,n){var i=U(16);c+=e||0,i.view.setUint32(0,1347094280),void 0!==n&&(z.view.setUint32(10,n,!0),i.view.setUint32(4,n,!0)),l&&(i.view.setUint32(8,e,!0),z.view.setUint32(14,e,!0),i.view.setUint32(12,l.size,!0),z.view.setUint32(18,l.size,!0)),t.writeUint8Array(i.array,function(){c+=16,f(h)},u)}function S(){var f,h;(m=m||{},s=s.trim(),m.directory&&"/"!=s.charAt(s.length-1)&&(s+="/"),o.hasOwnProperty(s))?e(g):(A=P(_(s)),a.push(s),f=function(){l?i||0===m.level?W(l,t,0,l.size,!0,M,d,w,u):r=function(t,e,i,r,o,a,c){var f,s=new y;function u(t,e){t&&s.append(e)}function l(t){r(t,s.get())}return n.zip.useWebWorkers?((f=new Worker(n.zip.workerScriptsPath+v)).addEventListener(p,function n(){f.removeEventListener(p,n,!1),F(f,t,e,0,t.size,u,o,l,a,c)},!1),f.postMessage({init:!0,level:i})):C(new n.zip.Deflater,t,e,0,t.size,u,o,l,a,c),f}(l,t,m.level,M,d,w,u):M()},b=m.lastModDate||new Date,z=U(26),o[s]={headerArray:z.array,directory:m.directory,filename:A,offset:c,comment:P(_(m.comment||""))},z.view.setUint32(0,335546376),m.version&&z.view.setUint8(0,m.version),i||0===m.level||m.directory||z.view.setUint16(4,2048),z.view.setUint16(6,(b.getHours()<<6|b.getMinutes())<<5|b.getSeconds()/2,!0),z.view.setUint16(8,(b.getFullYear()-1980<<4|b.getMonth()+1)<<5|b.getDate(),!0),z.view.setUint16(22,A.length,!0),(h=U(30+A.length)).view.setUint32(0,1347093252),h.array.set(z.array,4),h.array.set(A,30),c+=h.array.length,t.writeUint8Array(h.array,f,u))}l?l.init(S,w):S()},close:function(e){var n,i,r,s=0,l=0;for(i=0;i<a.length;i++)s+=46+(r=o[a[i]]).filename.length+r.comment.length;for(n=U(s+22),i=0;i<a.length;i++)r=o[a[i]],n.view.setUint32(l,1347092738),n.view.setUint16(l+4,5120),n.array.set(r.headerArray,l+6),n.view.setUint16(l+32,r.comment.length,!0),r.directory&&n.view.setUint8(l+38,16),n.view.setUint32(l+42,r.offset,!0),n.array.set(r.filename,l+46),n.array.set(r.comment,l+46+r.filename.length),l+=46+r.filename.length+r.comment.length;n.view.setUint32(l,1347093766),n.view.setUint16(l+8,a.length,!0),n.view.setUint16(l+10,a.length,!0),n.view.setUint32(l+12,s,!0),n.view.setUint32(l+16,c,!0),t.writeUint8Array(n.array,function(){f(function(){t.getData(e)})},u)}}}y.prototype.table=function(){var t,e,n,i=[];for(t=0;t<256;t++){for(n=t,e=0;e<8;e++)1&n?n=n>>>1^3988292384:n>>>=1;i[t]=n}return i}(),z.prototype=new m,z.prototype.constructor=z,A.prototype=new m,A.prototype.constructor=A,b.prototype=new m,b.prototype.constructor=b,M.prototype.getData=function(t){t(this.data)},S.prototype=new M,S.prototype.constructor=S,D.prototype=new M,D.prototype.constructor=D,L.prototype=new M,L.prototype.constructor=L,n.zip={Reader:m,Writer:M,BlobReader:b,Data64URIReader:A,TextReader:z,BlobWriter:L,Data64URIWriter:D,TextWriter:S,createReader:function(t,e,n){t.init(function(){e(E(t,n))},n)},createWriter:function(t,e,n,i){t.init(function(){e(I(t,n,i))},n)},useWebWorkers:!0},e(n.zip,{workerScriptsPath:{get:function(){return void 0===r&&(r=t("ThirdParty/Workers/")),r}}})}(n),n.zip});