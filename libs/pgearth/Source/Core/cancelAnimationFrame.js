define(["./defined"],function(n){"use strict";if("undefined"!=typeof window){var e=window.cancelAnimationFrame;return function(){if(!n(e))for(var i=["webkit","moz","ms","o"],o=0,t=i.length;o<t&&!n(e);)e=window[i[o]+"CancelAnimationFrame"],n(e)||(e=window[i[o]+"CancelRequestAnimationFrame"]),++o;n(e)||(e=clearTimeout)}(),function(n){e(n)}}});