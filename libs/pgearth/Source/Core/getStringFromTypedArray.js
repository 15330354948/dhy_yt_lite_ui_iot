define(["./defaultValue","./defined","./DeveloperError","./RuntimeError"],function(e,n,r,t){"use strict";function o(t,i,d){if(!n(t))throw new r("uint8Array is required.");if(i<0)throw new r("byteOffset cannot be negative.");if(d<0)throw new r("byteLength cannot be negative.");if(i+d>t.byteLength)throw new r("sub-region exceeds array bounds.");return i=e(i,0),d=e(d,t.byteLength-i),t=t.subarray(i,i+d),o.decode(t)}function i(e,n,r){return n<=e&&e<=r}return o.decodeWithTextDecoder=function(e){return new TextDecoder("utf-8").decode(e)},o.decodeWithFromCharCode=function(e){for(var n="",r=function(e){for(var n=0,r=0,o=0,d=128,u=191,f=[],c=e.length,a=0;a<c;++a){var h=e[a];if(0===o){if(i(h,0,127)){f.push(h);continue}if(i(h,194,223)){o=1,n=31&h;continue}if(i(h,224,239)){224===h&&(d=160),237===h&&(u=159),o=2,n=15&h;continue}if(i(h,240,244)){240===h&&(d=144),244===h&&(u=143),o=3,n=7&h;continue}throw new t("String decoding failed.")}i(h,d,u)?(d=128,u=191,n=n<<6|63&h,++r===o&&(f.push(n),n=o=r=0)):(n=o=r=0,d=128,u=191,--a)}return f}(e),o=r.length,d=0;d<o;++d){var u=r[d];u<=65535?n+=String.fromCharCode(u):(u-=65536,n+=String.fromCharCode(55296+(u>>10),56320+(1023&u)))}return n},"undefined"!=typeof TextDecoder?o.decode=o.decodeWithTextDecoder:o.decode=o.decodeWithFromCharCode,o});