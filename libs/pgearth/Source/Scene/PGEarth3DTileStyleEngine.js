define(["../Core/defined","../Core/defineProperties"],function(t,e){"use strict";function s(){this._style=void 0,this._styleDirty=!1,this._lastStyleTime=0}return e(s.prototype,{style:{get:function(){return this._style},set:function(t){this._style=t,this._styleDirty=!0}}}),s.prototype.makeDirty=function(){this._styleDirty=!0},s.prototype.applyStyle=function(e,s){if(e.ready&&(!t(this._style)||this._style.ready)){var i=this._styleDirty;s.passes.render&&(this._styleDirty=!1),i&&++this._lastStyleTime;for(var l=this._lastStyleTime,y=e._statistics,r=i?e._selectedTiles:e._selectedTilesToStyle,n=r.length,o=0;o<n;++o){var a=r[o];if(a.lastStyleTime!==l){var _=a.content;a.lastStyleTime=l,_.applyStyle(this._style),y.numberOfFeaturesStyled+=_.featuresLength,++y.numberOfTilesStyled}}}},s});