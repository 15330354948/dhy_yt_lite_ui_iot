define(["../../../../Core/defined","../../../../Core/defineProperties","../../../../Core/DeveloperError","../../../../ThirdParty/knockout"],function(t,e,i,r){"use strict";var s=function(e){if(!t(e))throw new i("terria is required");this._terria=e,this.name="Unnamed Control",this.text=void 0,this.svgIcon=void 0,this.svgHeight=void 0,this.svgWidth=void 0,this.cssClass=void 0,this.isActive=!1,r.track(this,["name","svgIcon","svgHeight","svgWidth","cssClass","isActive"])};return e(s.prototype,{terria:{get:function(){return this._terria}},hasText:{get:function(){return t(this.text)&&"string"==typeof this.text}}}),s.prototype.activate=function(){throw new i("activate must be implemented in the derived class.")},s});