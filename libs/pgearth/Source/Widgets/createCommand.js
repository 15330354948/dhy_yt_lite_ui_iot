define(["../Core/defaultValue","../Core/defined","../Core/defineProperties","../Core/DeveloperError","../Core/Event","../ThirdParty/knockout"],function(e,r,n,t,c,a){"use strict";return function(u,o){if(!r(u))throw new t("func is required.");o=e(o,!0);var i=new c,f=new c;function l(){if(!l.canExecute)throw new t("Cannot execute command, canExecute is false.");var e,r={args:arguments,cancel:!1};return i.raiseEvent(r),r.cancel||(e=u.apply(null,arguments),f.raiseEvent(e)),e}return l.canExecute=o,a.track(l,["canExecute"]),n(l,{beforeExecute:{value:i},afterExecute:{value:f}}),l}});