define(["../../Core/defaultValue","../../Core/defined","../../Core/defineProperties","../../Core/DeveloperError","../PerformanceWatchdog/PerformanceWatchdog"],function(e,r,o,n,t){"use strict";return function(a,i){if(!r(a))throw new n("viewer is required.");i=e(i,e.EMPTY_OBJECT);var c=new t({scene:a.scene,container:a.bottomContainer,lowFrameRateMessage:i.lowFrameRateMessage});o(a,{performanceWatchdog:{get:function(){return c}}})}});