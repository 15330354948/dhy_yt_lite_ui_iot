define(["../../Core/defaultValue","../../Core/JulianDate"],function(t,e){"use strict";function i(e,i,o){this._color=e,this._height=i,this._base=t(o,0)}return i.prototype.getHeight=function(){return this._height},i.prototype.getBase=function(){return this._base},i.prototype.getStartTime=function(){return this._start},i.prototype.getStopTime=function(){return this._stop},i.prototype.setRange=function(t,e){this._start=t,this._stop=e},i.prototype.render=function(t){var i="";if(this._start&&this._stop&&this._color){var o=e.secondsDifference(this._start,t.epochJulian),r=Math.round(t.timeBarWidth*t.getAlpha(o)),h=e.secondsDifference(this._stop,t.epochJulian),n=Math.round(t.timeBarWidth*t.getAlpha(h))-r;r<0&&(n+=r,r=0),r+n>t.timeBarWidth&&(n=t.timeBarWidth-r),n>0&&(i='<span class="pgEarth-timeline-highlight" style="left: '+r.toString()+"px; width: "+n.toString()+"px; bottom: "+this._base.toString()+"px; height: "+this._height+"px; background-color: "+this._color+';"></span>')}return i},i});