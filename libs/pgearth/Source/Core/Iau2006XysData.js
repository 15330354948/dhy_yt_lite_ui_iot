define(["../ThirdParty/when","./buildModuleUrl","./defaultValue","./defined","./Iau2006XysSample","./JulianDate","./Resource","./TimeStandard"],function(e,s,t,r,a,i,l,o){"use strict";function n(e){e=t(e,t.EMPTY_OBJECT),this._xysFileUrlTemplate=l.createIfNeeded(e.xysFileUrlTemplate),this._interpolationOrder=t(e.interpolationOrder,9),this._sampleZeroJulianEphemerisDate=t(e.sampleZeroJulianEphemerisDate,2442396.5),this._sampleZeroDateTT=new i(this._sampleZeroJulianEphemerisDate,0,o.TAI),this._stepSizeDays=t(e.stepSizeDays,1),this._samplesPerXysFile=t(e.samplesPerXysFile,1e3),this._totalSamples=t(e.totalSamples,27426),this._samples=new Array(3*this._totalSamples),this._chunkDownloadsInProgress=[];for(var s=this._interpolationOrder,r=this._denominators=new Array(s+1),a=this._xTable=new Array(s+1),n=Math.pow(this._stepSizeDays,s),h=0;h<=s;++h){r[h]=n,a[h]=h*this._stepSizeDays;for(var p=0;p<=s;++p)p!==h&&(r[h]*=h-p);r[h]=1/r[h]}this._work=new Array(s+1),this._coef=new Array(s+1)}var h=new i(0,0,o.TAI);function p(e,s,t){var r=h;return r.dayNumber=s,r.secondsOfDay=t,i.daysDifference(r,e._sampleZeroDateTT)}function _(t,a){if(t._chunkDownloadsInProgress[a])return t._chunkDownloadsInProgress[a];var i,o=e.defer();t._chunkDownloadsInProgress[a]=o;var n=t._xysFileUrlTemplate;return i=r(n)?n.getDerivedResource({templateValues:{0:a}}):new l({url:s("Assets/IAU2006_XYS/IAU2006_XYS_"+a+".json")}),e(i.fetchJson(),function(e){t._chunkDownloadsInProgress[a]=!1;for(var s=t._samples,r=e.samples,i=a*t._samplesPerXysFile*3,l=0,n=r.length;l<n;++l)s[i+l]=r[l];o.resolve()}),o.promise}return n.prototype.preload=function(s,t,r,a){var i=p(this,s,t),l=p(this,r,a),o=i/this._stepSizeDays-this._interpolationOrder/2|0;o<0&&(o=0);var n=l/this._stepSizeDays-this._interpolationOrder/2|0+this._interpolationOrder;n>=this._totalSamples&&(n=this._totalSamples-1);for(var h=o/this._samplesPerXysFile|0,m=n/this._samplesPerXysFile|0,u=[],y=h;y<=m;++y)u.push(_(this,y));return e.all(u)},n.prototype.computeXysRadians=function(e,s,t){var i=p(this,e,s);if(!(i<0)){var l=i/this._stepSizeDays|0;if(!(l>=this._totalSamples)){var o=this._interpolationOrder,n=l-(o/2|0);n<0&&(n=0);var h=n+o;h>=this._totalSamples&&(n=(h=this._totalSamples-1)-o)<0&&(n=0);var m=!1,u=this._samples;if(r(u[3*n])||(_(this,n/this._samplesPerXysFile|0),m=!0),r(u[3*h])||(_(this,h/this._samplesPerXysFile|0),m=!0),!m){r(t)?(t.x=0,t.y=0,t.s=0):t=new a(0,0,0);var y,d,f=i-n*this._stepSizeDays,c=this._work,D=this._denominators,S=this._coef,v=this._xTable;for(y=0;y<=o;++y)c[y]=f-v[y];for(y=0;y<=o;++y){for(S[y]=1,d=0;d<=o;++d)d!==y&&(S[y]*=c[d]);S[y]*=D[y];var w=3*(n+y);t.x+=S[y]*u[w++],t.y+=S[y]*u[w++],t.s+=S[y]*u[w]}return t}}}},n});