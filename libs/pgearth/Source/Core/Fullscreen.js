define(["./defined","./defineProperties"],function(e,n){"use strict";var l,r={requestFullscreen:void 0,exitFullscreen:void 0,fullscreenEnabled:void 0,fullscreenElement:void 0,fullscreenchange:void 0,fullscreenerror:void 0},u={};return n(u,{element:{get:function(){if(u.supportsFullscreen())return document[r.fullscreenElement]}},changeEventName:{get:function(){if(u.supportsFullscreen())return r.fullscreenchange}},errorEventName:{get:function(){if(u.supportsFullscreen())return r.fullscreenerror}},enabled:{get:function(){if(u.supportsFullscreen())return document[r.fullscreenEnabled]}},fullscreen:{get:function(){if(u.supportsFullscreen())return null!==u.element}}}),u.supportsFullscreen=function(){if(e(l))return l;l=!1;var n=document.body;if("function"==typeof n.requestFullscreen)return r.requestFullscreen="requestFullscreen",r.exitFullscreen="exitFullscreen",r.fullscreenEnabled="fullscreenEnabled",r.fullscreenElement="fullscreenElement",r.fullscreenchange="fullscreenchange",r.fullscreenerror="fullscreenerror",l=!0;for(var u,c=["webkit","moz","o","ms","khtml"],t=0,s=c.length;t<s;++t){var o=c[t];"function"==typeof n[u=o+"RequestFullscreen"]?(r.requestFullscreen=u,l=!0):"function"==typeof n[u=o+"RequestFullScreen"]&&(r.requestFullscreen=u,l=!0),u=o+"ExitFullscreen","function"==typeof document[u]?r.exitFullscreen=u:(u=o+"CancelFullScreen","function"==typeof document[u]&&(r.exitFullscreen=u)),u=o+"FullscreenEnabled",void 0!==document[u]?r.fullscreenEnabled=u:(u=o+"FullScreenEnabled",void 0!==document[u]&&(r.fullscreenEnabled=u)),u=o+"FullscreenElement",void 0!==document[u]?r.fullscreenElement=u:(u=o+"FullScreenElement",void 0!==document[u]&&(r.fullscreenElement=u)),u=o+"fullscreenchange",void 0!==document["on"+u]&&("ms"===o&&(u="MSFullscreenChange"),r.fullscreenchange=u),u=o+"fullscreenerror",void 0!==document["on"+u]&&("ms"===o&&(u="MSFullscreenError"),r.fullscreenerror=u)}return l},u.requestFullscreen=function(e,n){u.supportsFullscreen()&&e[r.requestFullscreen]({vrDisplay:n})},u.exitFullscreen=function(){u.supportsFullscreen()&&document[r.exitFullscreen]()},u});