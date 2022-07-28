define(["./defined","./defineProperties","./DeveloperError"],function(e,t,r){"use strict";function n(){this._array=[],this._hash={}}return t(n.prototype,{length:{get:function(){return this._array.length}},values:{get:function(){return this._array}}}),n.prototype.contains=function(t){if("string"!=typeof t&&"number"!=typeof t)throw new r("key is required to be a string or number.");return e(this._hash[t])},n.prototype.set=function(e,t){if("string"!=typeof e&&"number"!=typeof e)throw new r("key is required to be a string or number.");t!==this._hash[e]&&(this.remove(e),this._hash[e]=t,this._array.push(t))},n.prototype.get=function(e){if("string"!=typeof e&&"number"!=typeof e)throw new r("key is required to be a string or number.");return this._hash[e]},n.prototype.remove=function(t){if(e(t)&&"string"!=typeof t&&"number"!=typeof t)throw new r("key is required to be a string or number.");var n=this._hash[t],i=e(n);if(i){var o=this._array;o.splice(o.indexOf(n),1),delete this._hash[t]}return i},n.prototype.removeAll=function(){var e=this._array;e.length>0&&(this._hash={},e.length=0)},n});